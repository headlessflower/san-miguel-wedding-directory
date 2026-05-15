// content.config.ts
import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/**", // reads from /content/blog/**
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string().optional(),
        locale: z.enum(["en", "es"]),
        tags: z.array(z.string()).optional(),
        translationKey: z.string().optional(),
        heroImage: z.string().optional(),
        heroImageAlt: z.string().optional(),
        articleImages: z
          .array(
            z.object({
              src: z.string(),
              alt: z.string().optional(),
              caption: z.string().optional(),
            })
          )
          .optional(),
        image: z.string().optional(),
        canonical: z.string().optional(),
        relatedVenues: z.array(z.string()).optional(), // venue slugs
        relatedVendorCategories: z.array(z.string()).optional(), // category keys
      }),
    }),
  },
});
