import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    publicationDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
    author: z.string(),
    category: z.enum([
      "AI Without the Hype",
      "Systems Thinking",
      "Small Business Tools",
      "Builder Notes",
      "Architect's Notebook",
    ]),
    tags: z.array(z.string()).default([]),
    featuredImage: z.string().optional(),
    imageAlt: z.string().default(""),
    draft: z.boolean().default(true),
    featured: z.boolean().default(false),
    seoTitle: z.string(),
    seoDescription: z.string(),
    canonicalOverride: z.string().optional(),
    // Optional second button in the closing "Work with me" band. Without it, the band links to /blog/.
    secondaryCta: z
      .object({
        label: z.string(),
        href: z.string(),
      })
      .optional(),
    relatedArticles: z.array(z.string()).default([]),
    // The service the closing "Work with me" band offers (2026-11-05). Slugs from src/data/services.ts;
    // each must also be an option in the contact form's Inquiry type. Leave it out to link to /services/.
    service: z
      .enum([
        "business-systems-clarity-session",
        "ai-workflow-assessment",
        "low-code-solution-design",
        "technical-mentoring",
        "systems-clarity-sprint",
      ])
      .optional(),
    // Reading sequence (2026-11-05): articles with the same `series` name are chained in `seriesOrder`,
    // and each shows "Step N of M" and a "Next:" link. Both are optional; most articles have neither.
    series: z.string().optional(),
    seriesOrder: z.number().int().positive().optional(),
  }),
});

// Code559 course pages, copied from the Code559 repository by scripts/sync-code559.mjs
const code559 = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/code559" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    module: z.number().optional(),
    series: z.string(),
    estimated_time: z.string().optional(),
  }),
});

export const collections = { articles, code559 };
