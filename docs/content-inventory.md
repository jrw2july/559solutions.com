# Existing-Site Content Inventory

Inventory date: July 23, 2026  
Public host reviewed: `https://559solutions.com`

The rebuild uses original Astro templates and styles. Public copy and owner-owned assets were migrated selectively; no Squarespace template code, bundled scripts, or platform styles were carried into production.

## Public routes found

| Existing path | Content/use | Rebuild treatment |
| --- | --- | --- |
| `/home` | Alternate home route | Confirmed 301 to `/` |
| `/559-blog` | Blog index | Confirmed 301 to `/blog/` |
| `/559-blog/the-hero-trap-tht2p` | “The Hero Trap” article | Edited migration to `/blog/the-hero-trap/` |
| `/559-blog/weekend-cto-how-to-choose-ai` | AI tool-selection article | Edited migration to `/blog/how-to-choose-and-actually-use-ai-tools/` |
| `/about` | About page | Rebuilt at `/about/` |
| `/appointments` | Scheduling/contact page | Confirmed 301 to `/contact/` |
| `/contact` | Contact page | Rebuilt at `/contact/` |
| `/downloads` | Download listing | Confirmed 301 to `/resources/`; files require owner review |
| `/email-move-guide` | Standalone guide | Migration/redirect decision pending |
| `/heic-converter` | Standalone converter utility | Migration/redirect decision pending |
| `/services-store` | Services storefront | Confirmed 301 to `/services/` |
| `/services-store/p/ai-coaching-for-you-11` | Store product | Final destination/offer status pending |
| `/services-store/p/9amt6rc6hi9w1prz8wgctezjs8s3ks` | Store product | Final destination/offer status pending |

## Assets

- The current public 559 Solutions logo was retained as `public/images/559-solutions-logo.png`.
- A new site-specific social-sharing card was generated for `public/images/og.png`.
- A transparent production logo, compact mobile mark, and dedicated favicon remain owner actions.
- Public files attached to the old Downloads, email guide, HEIC converter, and store flows were not assumed to be reusable or complete. They require owner inventory, rights confirmation, malware scanning, and destination decisions.

## Content migrated into production

- The Hero Trap
- How to Choose and Actually Use AI Tools

Both articles were adapted into local Markdown and given clean canonical paths. Eight additional topic outlines are retained as `draft: true` and are not included in the production blog, sitemap, or RSS feed.

## Rebuilt content

- Home value proposition and product-first path
- Resources listing and five resource detail pages
- Services listing with inquiry-safe status
- About, Contact, Privacy, Terms, Accessibility, and 404 pages
- Footer, navigation, form fallbacks, SEO metadata, structured data, sitemap, and RSS

## Follow-up inventory

Before the old platform is canceled, export or otherwise preserve:

- Original editable logo and brand files
- Every downloadable file and its public URL
- Form submissions and mailing-list data, following privacy requirements
- Commerce records, product descriptions, prices, tax/refund settings, and fulfillment files
- Analytics and search-console history
- DNS, domain, and SSL configuration
- Any content visible only to logged-in users

No separate former-domain URL was confirmed in the public crawl. Add former-domain redirects only after the owner supplies verified paths and destination decisions.
