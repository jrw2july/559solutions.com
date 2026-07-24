# Test Report

Test date: July 23, 2026  
Target: static Astro production build for Apache/cPanel

## Automated results

| Check | Result |
| --- | --- |
| Dependency install and lockfile resolution | Pass |
| Astro diagnostics across 61 files | Pass: 0 errors, 0 warnings, 0 hints |
| Source content validation | Pass |
| Production static build | Pass: 17 HTML pages plus sitemap and RSS endpoints |
| Node production-output tests | Pass: 5 of 5 |
| HTML validation | Pass |
| Required-route and internal-link validation | Pass |
| Draft exclusion from blog, sitemap, and RSS | Pass |
| Form fallback behavior with no endpoint | Pass |
| Package security audit | Pass: no known vulnerabilities |
| Release archive structure | Pass: required roots present; no build/source crossover or local Vercel metadata |
| Vercel production deployment | Pass: static prebuilt artifact deployed and public alias verified |

## Browser QA

Headless Google Chrome was used with Playwright against a local production preview.

- Representative routes: Home, Resources, a resource detail, Services, Blog, an article, About, and Contact
- Viewports: desktop, tablet, mobile, and a narrow 720-pixel 200%-zoom equivalent
- Keyboard: skip link, desktop navigation, mobile menu, forms, and filters
- Progressive enhancement: resource search/reset and blog category filtering
- Safe fallbacks: contact/newsletter behavior without configured endpoints
- Preferences: reduced-motion rendering
- Console: no unexpected page errors

Result: pass.

## Lighthouse

Local production preview, desktop configuration:

| Category | Score |
| --- | --- |
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

These automated scores are a regression baseline, not a guarantee of WCAG conformance or real-user field performance.

## Manual inspection

- Home, Resources, and Contact pages reviewed visually at desktop size.
- Home reviewed at mobile size.
- Header, footer, typography, cards, calls to action, empty states, form fallback, spacing, and responsive reflow reviewed.
- Generated social card reviewed at full resolution.
- Apache configuration reviewed for canonical HTTPS redirects, custom 404, directory-index protection, security headers, compression, and caching.

Result: no release-blocking visual issue found.

## Live Vercel verification

- Production alias: `https://559solutionscom.vercel.app`
- Home, Resources, and Contact: HTTP 200
- Confirmed legacy `/home` and article redirect: HTTP 301 to their intended new paths
- Nonexistent route: HTTP 404
- Content and error responses: Content-Security-Policy header present

## Not testable without owner/external configuration

- Live cPanel/Apache module behavior and hosting-account interactions
- DNS, SSL issuance, CDN, and cache purging
- Real contact/newsletter delivery
- Paid checkout, fulfillment, refunds, and gated downloads
- Final public email, schedule, social, and analytics integrations
- Pending legacy URL destinations
- Assistive-technology testing by users with disabilities

These are documented in `release/OWNER_ACTIONS.md` and the deployment/accessibility guides.
