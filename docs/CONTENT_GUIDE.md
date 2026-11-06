# Content Guide

## Site-wide settings

Edit `src/config/site.ts` for owner-controlled contact information, service URLs, analytics, form endpoints, checkout details, and feature flags. Leave unavailable values as empty strings. The UI is designed to show a safe fallback rather than emit a broken or invented link.

After editing configuration, run `pnpm validate`.

## Blog articles

The blog is called **The Curious Architect**. Its address stays `/blog/`.

Production articles live in `src/content/articles/`. Unpublished drafts live in `src/content/articles/drafts/`. Name each file after its slug (`the-hero-trap.md` for slug `the-hero-trap`); the site test compares the two.

Use this frontmatter (the full schema is in `src/content.config.ts`):

```yaml
title: "Article title"
slug: "article-title"
summary: "Unique article summary."
publicationDate: "2026-10-14"
updatedDate: "2026-10-14"
author: "Joel Wells"
category: "Systems Thinking"
service: "business-systems-clarity-session"
tags:
  - "process"
imageAlt: ""
draft: true
featured: false
seoTitle: "Article title | 559 Solutions"
seoDescription: "A unique search description."
relatedArticles:
  - "the-hero-trap"
```

`category` must be one of: AI Without the Hype, Systems Thinking, Small Business Tools, Builder Notes, Architect's Notebook. Optional fields: `featuredImage`, `canonicalOverride`, `secondaryCta` (`label` and `href`).

`service` (optional) picks the service the closing "Work with me" band offers. It must be one of: business-systems-clarity-session, ai-workflow-assessment, low-code-solution-design, technical-mentoring, systems-clarity-sprint. The band's button opens the contact form with that Inquiry type chosen. Leave it out and the band links to `/services/`. `secondaryCta`, when set, becomes the band's second button. Without it, the second button links to `/blog/`.

`series` and `seriesOrder` (optional, 2026-11-05) chain articles into a reading sequence. Give each article in the sequence the same `series` name and a `seriesOrder` starting at 1. Each then shows "Step N of M" under its byline and a "Next:" link after the text; the last links back to step 1. The format label on article cards (Worksheet, Self-check, Scenario) is not a frontmatter field: it comes from the article's exercise in `src/data/exercises.ts`, so it appears only when the exercise exists.

To publish a reviewed draft:

1. Fact-check and edit the article. Every factual claim is listed in a "Sources" section at the end.
2. Confirm the title, summary, category, tags, and dates.
3. Change `draft` to `false`.
4. Move the file out of `articles/drafts/` into `articles/`.
5. Add a redirect if the article replaces an older URL.
6. Run `pnpm validate` and `pnpm browser:qa`.

Use one H1 only; the layout supplies it from the title. Start article content at H2. Write link text that describes the destination. Add image alt text that conveys the same meaning as the image in context; use an empty alt value only for decorative images.

## Services

Service copy and deliverables live in `src/data/services.ts`. Keep offers in `by inquiry` status until scope, price, availability, terms, and scheduling are confirmed.

## Navigation

Edit `src/data/navigation.ts`. Keep the primary navigation short and use only published routes. Update both navigation arrays if a new page should also appear in the footer.

## Prepared pages

`src/page-templates/Courses.astro` and `src/page-templates/CaseStudies.astro` are unpublished templates. To publish one:

1. Review and complete the page content.
2. Move it into the matching path under `src/pages/`.
3. Turn on the corresponding feature in `src/config/site.ts`.
4. Add navigation only after the route has been tested.

## Images

Place public images in `public/images/`. Use lowercase, descriptive filenames with hyphens. Compress images before committing them. Prefer SVG for simple graphics and WebP/AVIF for photography when practical. The production logo and favicon should be supplied as separate, transparent, properly cropped files.

## SEO checks for every new page

- Unique title and meta description
- One descriptive H1
- Logical H2/H3 hierarchy
- Canonical URL on `https://559solutions.com`
- Useful internal links
- Image dimensions and alt text
- Structured data only when it accurately describes visible content
- Sitemap inclusion for public pages

## Editorial workflow

Keep a draft in source control, review it for accuracy and accessibility, preview locally, run the full validation suite, then rebuild the release archives. Do not edit generated files in `dist/`; they are replaced on every build.
