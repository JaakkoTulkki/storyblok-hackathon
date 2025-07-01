import { ZodType } from "zod/v4";
import * as Schemas from "./zod";
import { fi } from "zod/v4/locales";

function toPascalCase(str: string): string {
    return str
      .split(/[-_\s]+/) // Split by hyphens, underscores, or spaces
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }
  
  // Function to get component name in PascalCase
  function getComponentName(componentName: string): string {
    return toPascalCase(componentName);
  }
  
  // Function to get schema name in PascalCase with "Schema" suffix
  function getSchemaName(componentName: string): string {
    return `${toPascalCase(componentName)}Schema`;
  }

// Helper function to recursively validate objects inside arrays
function validateRecursively(obj: any): { success: boolean; error?: string; data?: any } {
  // If it's an array, validate each item that has a component property
  if (Array.isArray(obj)) {
    const validationResults = [];
    
    for (let i = 0; i < obj.length; i++) {
      const item = obj[i];
      
      // If the item is an object with a component property, validate it
      if (item && typeof item === 'object' && item.component) {
        const itemValidation = validate(item);
        if (!itemValidation.success) {
          return {
            success: false,
            error: `Array item at index ${i}: ${itemValidation.error}`
          };
        }
        validationResults.push(itemValidation.data);
      } else {
        // If it doesn't have a component property, keep it as is
        validationResults.push(item);
      }
    }
    
    return { success: true, data: validationResults };
  }
  
  // If it's an object (but not an array), check if it has a component property
  if (obj && typeof obj === 'object' && !Array.isArray(obj) && obj.component) {
    return validate(obj);
  }
  
  // If it's not an object with component property, return as is
  return { success: true, data: obj };
}

export function validate(content: any) {
  // Check if content has a component property
  if (!content || typeof content !== 'object' || !content.component) {
    return {
      success: false,
      error: "Content must be an object with a 'component' property"
    };
  }

  // Filter out properties starting with underscore, but keep _uid
  const filteredContent = Object.fromEntries(
    Object.entries(content).filter(([key]) => key === '_uid' || !key.startsWith('_'))
  );

  // Get the schema name based on the component
  const schemaName = getSchemaName(content.component);
  
  // Check if the schema exists
  if (!(schemaName in Schemas)) {
    return {
      success: false,
      error: `Schema not found for component: ${content.component} (looking for ${schemaName})`
    };
  }

  // Get the schema and validate
  const schema = (Schemas as any)[schemaName].strict();
  const result = schema.safeParse(filteredContent);
  
  if (!result.success) {
    const errorMessage = result.error.issues
      .map((issue: any) => `${issue.path.join('.')}: ${issue.message}`)
      .join(', ');
    
    return {
      success: false,
      error: errorMessage
    };
  }

  // Recursively validate arrays and objects with component properties
  const validatedData = { ...result.data };
  
  for (const [key, value] of Object.entries(validatedData)) {
    if (value && typeof value === 'object') {
      const recursiveValidation = validateRecursively(value);
      if (!recursiveValidation.success) {
        return {
          success: false,
          error: `${key}: ${recursiveValidation.error}`
        };
      }
      validatedData[key] = recursiveValidation.data;
    }
  }
  
  return { 
    success: true, 
    data: validatedData 
  };
}

// Keep the original validate function for backward compatibility
export function validateWithSchema(schema: ZodType, data: any) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errorMessage = result.error.issues
      .map((issue: any) => `${issue.path.join('.')}: ${issue.message}`)
      .join(', ');
    
    return {
      success: false,
      error: errorMessage
    };
  }
  return { success: true, data: result.data };
}