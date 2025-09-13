import { defineCollection, z } from "astro:content";

const contractItemSchema = z.object({
  type: z.enum(["facebook", "instagram", "website", "email", "tiktok"]),
  title: z.string(),
  link: z.string().url(),
});

const sectionSchema = z.union([
  z.object({
    heading: z.string(),
    body: z.string(),
    list: z.undefined().optional(),
    contract: z.undefined().optional(),
  }),
  z.object({
    heading: z.string(),
    body: z.undefined().optional(),
    list: z.array(z.string()),
    contract: z.undefined().optional(),
  }),
  z.object({
    heading: z.string(),
    body: z.undefined().optional(),
    list: z.undefined().optional(),
    contract: z.array(contractItemSchema),
  }),
]);

const departments = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    sections: z.array(sectionSchema),
  }),
});

export const collections = { departments };
