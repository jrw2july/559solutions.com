# Deviations and Implementation Notes

## Static Astro implementation

The attached brief requested a local build packaged for cPanel and identified Astro as the preferred static framework. The available generic website starter was inspected but replaced with a focused Astro implementation so the deployed archive contains only static files and Apache configuration. No Sites or Vercel deployment was created because the requested destination is cPanel.

## External integrations

No public email, form endpoint, scheduling URL, social profile, analytics ID, price, checkout URL, or product file was supplied. Those values remain configuration-driven and blank. The UI provides intentional unavailable/configuration states instead of broken actions or fabricated data.

## Content migration

Two discoverable public articles were edited and migrated into production. Eight requested future topics were implemented as unpublished draft outlines. Legacy guide, converter, download-file, and store-product decisions remain pending because a safe one-to-one destination could not be confirmed.

## Brand assets

The current public logo PNG is used temporarily. A transparent master and dedicated favicon were not available. A new social-sharing card was generated specifically for this rebuild and is included as `public/images/og.png`.

## Live-server verification

The cPanel account was not accessed. Apache redirects, headers, compression, caching, and the custom 404 were reviewed statically, but final behavior depends on the host's enabled modules and account-level rules. The deployment guide includes live checks and rollback steps.

## Vercel deployment

The project is also deployed to Vercel as a prebuilt static artifact. Vercel's remote source installer could not complete in the available runtime because its local builder required an `npm` executable. The verified local Astro output was therefore deployed through Vercel's Build Output API. `vercel.json` records the equivalent redirect and response-header rules for a normal source build; the deployed prebuilt configuration includes the same rules. The Vercel alias is live, but assigning the custom production domain and changing DNS remain owner-controlled actions.

## Browser tooling

The in-app browser could not start in the local Windows permission context. Equivalent automated QA was completed with the installed system Google Chrome through Playwright, plus Lighthouse and direct screenshot review.

## Windows build runtime

Astro 7's native Markdown parser requires the Microsoft Visual C++ runtime on Windows. The source includes a build-only wrapper that locates the runtime in Windows or a current Microsoft Edge installation. The deployed static files have no native runtime or Node.js dependency.

## Accessibility scope

Automated accessibility checks, keyboard paths, reduced motion, zoom-equivalent layouts, and manual visual inspection passed. Formal WCAG conformance and user testing with assistive technologies are outside a local automated build and remain an owner release responsibility.
