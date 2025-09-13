import { defineCollection, z } from "astro:content";
import { SOCIAL_TYPES } from "../constants";

// Schema for social contact items
const contractItemSchema = z.object({
  type: z.enum(SOCIAL_TYPES),
  title: z.string().min(1),
  link: z.string().url(),
});

// Union schema for different section types
const sectionSchema = z
  .discriminatedUnion("type", [
    // Text section with body content
    z.object({
      type: z.literal("text").optional(),
      heading: z.string().min(1),
      body: z.string().min(1),
    }),

    // List section with bullet points
    z.object({
      type: z.literal("list"),
      heading: z.string().min(1),
      list: z.array(z.string().min(1)).min(1),
    }),

    // Contact section with social links
    z.object({
      type: z.literal("contact"),
      heading: z.string().min(1),
      contract: z.array(contractItemSchema).min(1),
    }),
  ])
  .or(
    // Backward compatibility - will be transformed to discriminated union
    z.object({
      heading: z.string().min(1),
      body: z.string().optional(),
      list: z.array(z.string()).optional(),
      contract: z.array(contractItemSchema).optional(),
    })
  );

// Department collection schema
const departments = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    image: z.string().optional(),
    sections: z.array(sectionSchema).optional(),
  }),
});

export const collections = {
  departments,
} as const;
