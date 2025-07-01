import { ZodType } from "zod/v4";
import * as Schemas from "./zod";

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

export function validate(content: any) {
  // Check if content has a component property
  if (!content || typeof content !== 'object' || !content.component) {
    return {
      success: false,
      error: "Content must be an object with a 'component' property"
    };
  }

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
  const result = schema.safeParse(content);
  
  if (!result.success) {
    const errorMessage = result.error.issues
      .map((issue: any) => `${issue.path.join('.')}: ${issue.message}`)
      .join(', ');
    
    return {
      success: false,
      error: errorMessage
    };
  }
  
  return { 
    success: true, 
    data: result.data 
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