# Content Guide

## Site-wide settings

Edit `src/config/site.ts` for owner-controlled contact information, service URLs, analytics, form endpoints, checkout details, and feature flags. Leave unavailable values as empty strings. The UI is designed to show a safe fallback rather than emit a broken or invented link.

After editing configuration, run `pnpm validate`.

## Resources and products

Each resource is a Markdown file in `src/content/resources/`. Copy an existing file to preserve the required frontmatter shape.

Required fields:

```yaml
title: "Resource title"
summary: "One concise customer-facing summary."
description: "A fuller description for the detail page."
status: "coming soon"
priceLabel: ""
deliveryType: "PDF download"
featured: false
order: 10
seoTitle: "Resource title | 559 Solutions"
seoDescription: "A unique search description."
```

Optional fields include `downloadUrl`, `checkoutUrl`, `image`, `tags`, and `updatedDate`. Use only a URL that has been verified in production. Valid statuses are `available`, `free`, `coming soon`, `early access`, `by inquiry`, `unavailable`, and `draft`.

- `free`: requires a working delivery path before showing a download action.
- `available`: requires a valid download or checkout URL.
- `coming soon` and `early access`: do not publish a purchase or download action.
- `by inquiry`: directs visitors to contact only when the contact path is configured.
- `draft`: excluded from production listings.

Do not publish a price unless the owner has confirmed the amount, currency, taxes, refund terms, and checkout destination.

## Blog articles

Production articles live in `src/content/articles/`. Unpublished outlines live in `src/content/articles/drafts/`.

Use this frontmatter:

```yaml
title: "Article title"
description: "Unique article summary."
publishDate: 2026-07-23
updatedDate: 2026-07-23
author: "Joel Wells"
category: "Systems"
tags:
  - "Process"
featured: false
draft: true
legacyPath: ""
seoTitle: "Article title | 559 Solutions"
seoDescription: "A unique search description."
```

To publish a reviewed draft:

1. Fact-check and edit the article.
2. Confirm the title, description, category, tags, and dates.
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
