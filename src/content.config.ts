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
      "The Curious Architect",
    ]),
    tags: z.array(z.string()).default([]),
    featuredImage: z.string().optional(),
    imageAlt: z.string().default(""),
    draft: z.boolean().default(true),
    featured: z.boolean().default(false),
    seoTitle: z.string(),
    seoDescription: z.string(),
    canonicalOverride: z.string().optional(),
    relatedResourceCta: z
      .object({
        label: z.string(),
        href: z.string(),
      })
      .optional(),
    relatedArticles: z.array(z.string()).default([]),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/resources" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    shortDescription: z.string(),
    intendedAudience: z.array(z.string()),
    problemSolved: z.string(),
    category: z.enum([
      "Free",
      "Templates",
      "Guides and Workbooks",
      "Starter Kits",
      "Courses and Walkthroughs",
      "Tools",
      "Coming Soon",
    ]),
    topics: z.array(z.string()),
    format: z.string(),
    priceDisplay: z.string().default(""),
    currency: z.string().default("USD"),
    availability: z.enum([
      "available",
      "free",
      "coming soon",
      "early access",
      "by inquiry",
      "unavailable",
      "draft",
    ]),
    checkoutUrl: z.string().default(""),
    downloadUrl: z.string().default(""),
    earlyAccessUrl: z.string().default(""),
    image: z.string().optional(),
    imageAlt: z.string().default(""),
    includedFiles: z.array(z.string()).default([]),
    lastUpdated: z.coerce.date(),
    version: z.string(),
    relatedArticles: z.array(z.string()).default([]),
    relatedResources: z.array(z.string()).default([]),
    supportExpectations: z.string(),
    licenseSummary: z.string(),
    refundPolicyLink: z.string().default(""),
    requirements: z.array(z.string()).default([]),
    faqs: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, resources };
