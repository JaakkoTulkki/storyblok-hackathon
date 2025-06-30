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

export async function fetchStoryblokContentTypes(config: StoryblokConfig): Promise<ContentType[]> {
  const { apiKey, spaceId, region = 'us', version = 'published', language = 'en' } = config;
  
  // Initialize Storyblok client
  if (!StoryblokClient) {
    const storyblokModule = await import('storyblok-js-client');
    StoryblokClient = storyblokModule.default;
  }
  
  const Storyblok = new StoryblokClient({
    accessToken: apiKey,
    region: region,
  });

  try {
    console.log(`Fetching content types from Storyblok space...`);
    
    // Fetch content types using the Storyblok Management API
    const response = await Storyblok.get('cdn/stories', {
      version: version,
      language: language,
      by_folders: '0', // Get root level content types
      per_page: 100,
    });

    if (!response.data || !response.data.stories) {
      throw new Error('No content types found or invalid response from Storyblok');
    }

    // Extract content types from the response
    const contentTypes: ContentType[] = [];
    
    for (const story of response.data.stories) {
      if (story.content && story.content.component) {
        contentTypes.push({
          name: story.content.component,
          schema: story.content,
        });
      }
    }

    console.log(`Found ${contentTypes.length} content types`);
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
    const schemaName = `${contentType.name.charAt(0).toUpperCase() + contentType.name.slice(1)}Schema`;
    zodSchemas += `\n// ${contentType.name} content type\n`;
    zodSchemas += `export const ${schemaName} = z.object({\n`;
    
    // Convert Storyblok schema to Zod
    for (const [key, value] of Object.entries(contentType.schema)) {
      if (key === 'component' || key === '_uid' || key === '_editable') continue;
      
      const fieldName = key;
      let zodType = 'z.any()'; // Default fallback
      
      if (typeof value === 'string') {
        zodType = 'z.string()';
      } else if (typeof value === 'number') {
        zodType = 'z.number()';
      } else if (typeof value === 'boolean') {
        zodType = 'z.boolean()';
      } else if (Array.isArray(value)) {
        zodType = 'z.array(z.any())';
      } else if (value && typeof value === 'object') {
        zodType = 'z.record(z.any())';
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
    
    if (options.output) {
      // Write to file
      const fs = await import('fs/promises');
      await fs.writeFile(options.output, fullOutput, 'utf-8');
      console.log(`Zod schemas written to ${options.output}`);
    } else {
      // Output to console
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
if (process.argv[1] && process.argv[1].endsWith('index.js')) {
  main();
}