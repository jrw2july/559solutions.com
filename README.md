# 559 Solutions Website

A fast, accessible, static marketing site for 559 Solutions. It is built with Astro and designed to deploy directly to an Apache/cPanel `public_html` directory with no server runtime, database, or build step on the host.

## What is included

- Home, resources, services, blog, about, contact, legal, accessibility, and custom 404 pages
- Five resource detail pages with safe availability states
- Two migrated production articles and eight unpublished draft outlines
- RSS, XML sitemap, robots rules, social metadata, structured data, and a generated social card
- Contact and newsletter forms that remain safely disabled until real endpoints are configured
- Apache redirects, HTTPS/canonical-host rules, security headers, compression, and cache policy
- A cPanel deployment archive and a separate source archive

## Requirements

- Node.js 22.14 or newer
- pnpm 11.9 or newer

On a clean machine:

```powershell
corepack enable
pnpm install --frozen-lockfile
```

On Windows, the included Astro wrapper locates the Microsoft Visual C++ runtime from Windows or a current Microsoft Edge installation. If neither location is available, install the official Microsoft Visual C++ 2015-2022 Redistributable (x64).

## Common commands

```powershell
pnpm dev
pnpm build
pnpm preview
pnpm check
pnpm lint
pnpm test
pnpm validate
pnpm browser:qa
pnpm lighthouse
pnpm audit
pnpm package
```

`pnpm validate` runs Astro diagnostics, content checks, a production build, Node tests, HTML validation, and internal-link validation.

## Project map

```text
src/
  components/        Reusable Astro components
  config/site.ts     Owner-controlled URLs, forms, analytics, and features
  content/           Articles and resources
  data/              Navigation and service data
  layouts/           Shared document layout
  page-templates/    Prepared, unpublished Courses and Case Studies pages
  pages/             Published routes
  styles/            Global design system
public/               Static images, scripts, robots, manifest, and .htaccess
docs/                 Content, deployment, setup, SEO, accessibility, and maintenance guides
scripts/              Build checks, browser QA, Lighthouse, and packaging
tests/                Production-output tests
release/              Owner handoff notes and generated ZIP archives
```

## Configure the site

Most owner-controlled values live in [`src/config/site.ts`](src/config/site.ts):

- Public email address
- Contact and newsletter form endpoints
- Scheduling, LinkedIn, and social links
- Lead-magnet delivery URL
- Analytics provider and site ID
- Checkout provider/origin
- Optional Courses and Case Studies feature flags

Products/resources are Markdown files in `src/content/resources/`. Blog content is in `src/content/articles/`; drafts are excluded when `draft: true`.

After any change, run:

```powershell
pnpm validate
pnpm browser:qa
pnpm package
```

## Release artifacts

- `release/559solutions-cpanel-deploy.zip`: upload and extract directly inside `public_html`
- `release/559solutions-source.zip`: editable project source, documentation, and lockfile
- `release/OWNER_ACTIONS.md`: values and assets the owner still needs to supply
- `release/TEST_REPORT.md`: completed verification and known limits
- `release/DEVIATIONS.md`: implementation decisions and unavailable live-service tests

See `docs/CPANEL_DEPLOYMENT.md` before replacing the live site.
