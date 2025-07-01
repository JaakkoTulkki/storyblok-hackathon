#!/usr/bin/env node

// Dynamic import for StoryblokClient (ES module compatible)
let StoryblokClient: any;

interface StoryblokConfig {
  apiKey: string;
  spaceId?: string;
  region?: string;
  version?: 'published' | 'draft';
  language?: string;
}

interface ContentType {
  name: string;
  schema: Record<string, any>;
}

// Helper function to convert Storyblok field schema to Zod type
function convertFieldToZod(fieldName: string, fieldSchema: any): string | null {
  const fieldType = fieldSchema.type;
  
  switch (fieldType) {
    case 'text':
    case 'textarea':
    case 'markdown':
    case 'richtext':
      return 'z.string()';
      
    case 'number':
      return 'z.number()';
      
    case 'boolean':
      return 'z.boolean()';
      
    case 'option':
      if (fieldSchema.options && Array.isArray(fieldSchema.options)) {
        const values = fieldSchema.options
          .map((opt: any) => opt.value)
          .filter((v: any) => v !== undefined && v !== null && v !== '');
        
        if (values.length > 0) {
          // Check if any values contain special characters that would break enum syntax
          const hasComplexValues = values.some((v: any) => 
            typeof v === 'string' && (v.includes('[') || v.includes('"') || v.includes('#'))
          );
          
          if (hasComplexValues) {
            return 'z.string()';
          }
          
          // Handle different value types
          const stringValues = values.filter((v: any) => typeof v === 'string');
          const numberValues = values.filter((v: any) => typeof v === 'number');
          
          if (stringValues.length > 0 && numberValues.length === 0) {
            return `z.enum([${stringValues.map((v: any) => `"${v}"`).join(', ')}])`;
          } else if (numberValues.length > 0 && stringValues.length === 0) {
            return `z.enum([${numberValues.join(', ')}])`;
          } else {
            // Mixed types or complex values, fall back to string
            return 'z.string()';
          }
        }
      }
      return 'z.string()';
      
    case 'asset':
      return `z.object({
        id: z.number().optional(),
        alt: z.string().optional(),
        name: z.string().optional(),
        focus: z.string().optional(),
        title: z.string().optional(),
        filename: z.string().optional(),
        copyright: z.string().optional(),
        fieldtype: z.string().optional()
      }).optional()`;
      
    case 'bloks':
      if (fieldSchema.component_whitelist && fieldSchema.component_whitelist.length > 0) {
        const componentTypes = fieldSchema.component_whitelist.map((comp: string) => `"${comp}"`).join(' | ');
        return `z.array(z.object({
          component: z.literal(${componentTypes}),
          _uid: z.string(),
          _editable: z.string().optional()
        }).and(z.record(z.any()))).optional()`;
      }
      return `z.array(z.object({
        component: z.string(),
        _uid: z.string(),
        _editable: z.string().optional()
      }).and(z.record(z.any()))).optional()`;
      
    case 'multilink':
      return `z.object({
        id: z.string().optional(),
        url: z.string().optional(),
        linktype: z.string().optional(),
        fieldtype: z.string().optional(),
        cached_url: z.string().optional()
      }).optional()`;
      
    case 'datetime':
      return 'z.string().datetime().optional()';
      
    case 'date':
      return 'z.string().optional()';
      
    case 'table':
      return 'z.array(z.array(z.string())).optional()';
      
    case 'custom':
      return 'z.any()';
      
    case 'tab':
      // Tabs are UI elements, not data fields
      return null;
      
    default:
      console.warn(`Unknown field type: ${fieldType} for field: ${fieldName}`);
      return 'z.any()';
  }
}

export async function fetchStoryblokContentTypes(config: StoryblokConfig): Promise<ContentType[]> {
  const { apiKey, spaceId, region = 'us', version = 'published', language = 'en' } = config;
  const SPACE_ID = 285464212182782;
  
  
  // Initialize Storyblok client
  if (!StoryblokClient) {
    const storyblokModule = await import('storyblok-js-client');
    StoryblokClient = storyblokModule.default;
  }
  
  const Storyblok = new StoryblokClient({
    oauthToken: apiKey,
    // region: region,
  });

  try {
    console.log(`Fetching component list from Storyblok space...`);
    
    // First, get the list of all components
    const componentsResponse = await Storyblok.get(`spaces/${SPACE_ID}/components`);
    if (!componentsResponse.data || !componentsResponse.data.components) {
      throw new Error('No components found or invalid response from Storyblok');
    }
    
    const componentIds = componentsResponse.data.components.map((component: any) => component.id);
    console.log(`Found ${componentIds.length} components. Fetching schemas for all components...`);
    
    // Extract content types from the response
    const contentTypes: ContentType[] = [];
    
    for (const componentId of componentIds) {
      console.log(`Fetching schema for component ID: ${componentId}`);
      const componentResponse = await Storyblok.get(`spaces/${SPACE_ID}/components/${componentId}`);
      
      if (componentResponse.data && componentResponse.data.component && componentResponse.data.component.schema) {
        contentTypes.push({
          name: componentResponse.data.component.name,
          schema: componentResponse.data.component.schema,
        });
        console.log(`✓ Added schema for component: ${componentResponse.data.component.name}`);
      } else {
        console.warn(`⚠ No schema found for component ID: ${componentId}`);
      }
    }

    console.log(`Successfully fetched ${contentTypes.length} content types`);
    return contentTypes;
    
  } catch (error) {
    console.error('Error fetching content types from Storyblok:', error);
    throw error;
  }
}

export function schemaToZod(contentTypes: ContentType[]): string {
  console.log("Converting Storyblok content types to Zod schemas...");
  
  let zodSchemas = '';
  
  for (const contentType of contentTypes) {
    // Convert kebab-case to PascalCase for schema name
    const schemaName = contentType.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('') + 'Schema';
    
    zodSchemas += `\n// ${contentType.name} content type\n`;
    zodSchemas += `export const ${schemaName} = z.object({\n`;
    
    // Add required Storyblok fields
    zodSchemas += `  _uid: z.string(),\n`;
    zodSchemas += `  component: z.literal("${contentType.name}"),\n`;
    
    // Convert Storyblok schema to Zod
    for (const [key, value] of Object.entries(contentType.schema)) {
      // Skip internal fields and UI elements
      if (key === 'component' || key === '_uid' || key === '_editable' || key.startsWith('tab-')) {
        continue;
      }
      
      const fieldName = key;
      const zodType = convertFieldToZod(fieldName, value);
      
      // Skip fields that don't generate Zod types (like tabs)
      if (zodType === null) {
        continue;
      }
      
      zodSchemas += `  ${fieldName}: ${zodType},\n`;
    }
    
    zodSchemas += `});\n`;
  }
  
  return zodSchemas;
}

// CLI entry point
async function main() {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  const options: StoryblokConfig & { output?: string } = {
    apiKey: '',
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--api-key':
      case '-k':
        const apiKey = args[++i];
        if (apiKey) {
          options.apiKey = apiKey;
        }
        break;
      case '--space-id':
      case '-s':
        const spaceId = args[++i];
        if (spaceId) {
          options.spaceId = spaceId;
        }
        break;
      case '--region':
      case '-r':
        const region = args[++i];
        if (region) {
          options.region = region;
        }
        break;
      case '--version':
      case '-v':
        const version = args[++i];
        if (version) {
          options.version = version as 'published' | 'draft';
        }
        break;
      case '--language':
      case '-l':
        const language = args[++i];
        if (language) {
          options.language = language;
        }
        break;
      case '--output':
      case '-o':
        const output = args[++i];
        if (output) {
          options.output = output;
        }
        break;
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
        break;
      default:
        if (arg && !arg.startsWith('-')) {
          console.error(`Unknown argument: ${arg}`);
          showHelp();
          process.exit(1);
        }
    }
  }
  
  // Validate required arguments
  if (!options.apiKey) {
    console.error('Error: API key is required');
    showHelp();
    process.exit(1);
  }
  
  try {
    console.log('Fetching content types from Storyblok...');
    const contentTypes = await fetchStoryblokContentTypes(options);
    
    if (contentTypes.length === 0) {
      console.log('No content types found');
      process.exit(0);
    }
    
    const zodSchemas = schemaToZod(contentTypes);
    
    // Add imports at the top
    const fullOutput = `import { z } from 'zod';\n\n${zodSchemas}`;
    
    // Default output path to validate package's zod directory
    const defaultOutput = '../validate/src/zod/index.ts';
    const outputPath = options.output || defaultOutput;
    
    // Write to file
    const fs = await import('fs/promises');
    const path = await import('path');
    
    // Create directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    try {
      await fs.access(outputDir);
    } catch {
      console.log(`Creating directory: ${outputDir}`);
      await fs.mkdir(outputDir, { recursive: true });
    }
    
    await fs.writeFile(outputPath, fullOutput, 'utf-8');
    console.log(`Zod schemas written to ${outputPath}`);
    
    // Also output to console if no specific output was requested
    if (!options.output) {
      console.log('\n--- Generated Zod Schemas ---\n');
      console.log(fullOutput);
    }
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
Usage: schema-to-zod [options]

Options:
  -k, --api-key <key>        Storyblok API key (required)
  -s, --space-id <id>        Storyblok space ID
  -r, --region <region>      Storyblok region (default: us)
  -v, --version <version>    API version: published or draft (default: published)
  -l, --language <lang>      Language code (default: en)
  -o, --output <file>        Output file path (default: stdout)
  -h, --help                 Show this help message

Examples:
  schema-to-zod --api-key YOUR_API_KEY
  schema-to-zod --api-key YOUR_API_KEY --output schemas.ts
  schema-to-zod --api-key YOUR_API_KEY --region eu --version draft
`);
}

// Only run if this file is executed directly
if (process.argv[1] && (process.argv[1].endsWith('index.js') || process.argv[1].endsWith('index.ts'))) {
  main();
}