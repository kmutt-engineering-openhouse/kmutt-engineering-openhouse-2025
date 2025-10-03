import { defineCollection, z } from "astro:content";

const chipItemSchema = z.object({
  title: z.string(),
  link: z.string(),
});

const contractItemSchema = z.object({
  type: z.enum(["facebook", "instagram", "website", "email", "tiktok"]),
  title: z.string(),
  link: z.string().url(),
});

const galleryItemSchema = z.object({
  image: z.string(),
  alt: z.string(),
  title: z.string(),
});

const sectionSchema = z.union([
  z.object({
    heading: z.string(),
    body: z.string(),
    list: z.undefined().optional(),
    contract: z.undefined().optional(),
    chips: z.undefined().optional(),
  }),
  z.object({
    heading: z.string(),
    body: z.undefined().optional(),
    list: z.array(z.string()),
    contract: z.undefined().optional(),
    chips: z.array(chipItemSchema).optional(),
  }),
  z.object({
    heading: z.string(),
    body: z.undefined().optional(),
    list: z.undefined().optional(),
    contract: z.array(contractItemSchema),
    chips: z.undefined().optional(),
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

const workshops = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    gallery: z.array(galleryItemSchema).optional(),
    sections: z.array(sectionSchema),
  }),
});

export const collections = { departments, workshops };
