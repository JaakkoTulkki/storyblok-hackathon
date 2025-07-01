import { z } from 'zod';


// feature content type
export const FeatureSchema = z.object({
  _uid: z.string(),
  component: z.literal("feature"),
  name: z.string(),
});

// grid content type
export const GridSchema = z.object({
  _uid: z.string(),
  component: z.literal("grid"),
  columns: z.array(z.object({
        component: z.string(),
        _uid: z.string(),
        _editable: z.string().optional()
      }).and(z.record(z.any()))).optional(),
});

// page content type
export const PageSchema = z.object({
  _uid: z.string(),
  component: z.literal("page"),
  body: z.array(z.object({
        component: z.string(),
        _uid: z.string(),
        _editable: z.string().optional()
      }).and(z.record(z.any()))).optional(),
});

// teaser content type
export const TeaserSchema = z.object({
  _uid: z.string(),
  component: z.literal("teaser"),
  headline: z.string(),
});
