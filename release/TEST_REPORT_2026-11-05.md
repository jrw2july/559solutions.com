# Test Report: Curious Architect lessons, signup and hiring path

Test date: November 5, 2026
Target: the static Astro production build (`dist/`) at commit series `ffe09df`..`HEAD` on branch `claude/dazzling-volta-2whpee`
Scope: everything added for the Curious Architect plan (lesson components and exercises on all 10 articles, blog discovery, reading sequence and format labels, email signup and `/subscribe/`, waitlists, "Work with me" bands, measurement stub)

## How the tests were run

- `pnpm validate` (lint, build, Node tests, html-validate, required-route and internal-link check).
- A Playwright script driving the bundled headless Chromium against `dist/` served locally, one run per page with JavaScript on at 1280 px, JavaScript off, 640 px (the width of 1280 at 200% zoom) and 390 px. The repository's `pnpm browser:qa` is written for a Windows Chrome path and `pnpm lighthouse` needs Chrome; neither was run in this environment.
- Every request to the Google Apps Script form endpoint was intercepted, so no test submission reached the owner's Google Sheet.
- Contrast was computed per visible text node in `main` against its nearest opaque background (WCAG 2.2 AA thresholds). This is a computed check, not a second tool; `docs/ACCESSIBILITY_CHECKLIST.md` still asks for an axe, WAVE or Accessibility Insights scan before launch.

## Automated results

| Check | Result |
| --- | --- |
| Astro diagnostics and content validation | Pass: 0 errors; 2 pre-existing warnings (`scripts/sync-code559.mjs`, `SectionHeading.astro`) |
| Production static build | Pass: 48 HTML pages plus sitemap, RSS and robots |
| Node production-output tests | Pass: 18 of 18 |
| HTML validation (`html-validate`) | Pass |
| Required routes and internal links | Pass: zero broken internal links |
| Inline `style=` attributes in any page | None |
| "Free Checklist" or `ai-project-readiness-checklist` in any page | None (the `.htaccess` redirect for old links stays) |
| Analytics scripts in any page | None |
| `role="alert"` or `aria-live="assertive"` in any page | None |

## Browser QA, per page

24 pages, 17 items each, 0 failures.

| Page | Loads | No console errors | Usable, JS off | Keyboard, no trap | Focus visible, not hidden | Names, legends, polite status | No motion (reduced) | 200% zoom | 390 px | Targets ≥24 px | Targets ≥24 px (390) | Not color alone | Contrast AA | Copy | Print | No reader text sent | No checklist |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/blog/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass ² | Pass ² | Pass | Pass |
| `/blog/how-to-choose-and-actually-use-ai-tools/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| `/blog/how-to-run-a-better-discovery-meeting/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| `/blog/science-fiction-and-architecture-of-consequences/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| `/blog/start-with-the-decision-not-the-ai-tool/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| `/blog/the-hero-trap/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| `/blog/the-simplest-useful-architecture-diagram/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| `/blog/what-architects-should-document/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| `/blog/what-chess-teaches-about-technology-decisions/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| `/blog/when-a-process-depends-on-one-person/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| `/blog/why-good-processes-fail/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| `/subscribe/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass ² | Pass ² | Pass | Pass |
| `/services/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass ² | Pass ² | Pass | Pass |
| `/contact/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass ² | Pass ² | Pass | Pass |
| `/resources/solution-architect-starter-kit/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass ² | Pass ² | Pass | Pass |
| `/resources/ai-tool-selection-workbook/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass ² | Pass ² | Pass | Pass |
| `/blog/category/ai-without-the-hype/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass ² | Pass ² | Pass | Pass |
| `/blog/category/architects-notebook/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass ² | Pass ² | Pass | Pass |
| `/blog/category/builder-notes/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass ² | Pass ² | Pass | Pass |
| `/blog/category/small-business-tools/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass ² | Pass ² | Pass | Pass |
| `/blog/category/systems-thinking/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass ² | Pass ² | Pass | Pass |
| `/blog/format/scenario/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass ² | Pass ² | Pass | Pass |
| `/blog/format/self-check/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass ² | Pass ² | Pass | Pass |
| `/blog/format/worksheet/` | Pass | Pass | Pass | Pass | Pass¹ | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass ² | Pass ² | Pass | Pass |

¹ Form fields (text boxes, email inputs, selects) show focus with a blue border and a pale glow, the site's existing field style, rather than an outline. Buttons, links and summaries show the site's outline. See "Not fixed" below.
² Not applicable on that page: no worksheet to copy or print.

What each column checked:

- **Loads**: HTTP 200.
- **No console errors**: no page errors or console errors with JavaScript on.
- **Usable, JS off**: JavaScript-only buttons hidden; the exercise's first control accepts input and every answer `<details>` opens; category links navigate; signup and waitlist forms post to the configured endpoint; list pages show cards.
- **Keyboard, no trap**: Tab from the top reaches the footer (44 to 46 controls in `main` on an article page).
- **Focus visible, not hidden**: every focused control in `main` is on screen, below the sticky header, with an outline or focus shadow.
- **Names, legends, polite status**: every input, button and link has an accessible name; every fieldset has a legend; every live region is `polite`; no `role="alert"`; every image has `alt`.
- **No motion (reduced)**: with `prefers-reduced-motion: reduce`, nothing in `main` has a transition or animation longer than 0.01 s.
- **200% zoom** and **390 px**: no horizontal scrolling.
- **Targets ≥24 px** (both widths): buttons, summaries, standalone links, form controls, and each checkbox or radio with its label are at least 24×24 CSS px. Inline links inside sentences are exempt (WCAG 2.5.8).
- **Not color alone**: the selected category has a solid border and a check mark; right and wrong are written ("Correct:", "Not quite:"); the self-check result is a worded list.
- **Contrast AA**: no visible text in `main` below 4.5:1 (3:1 for large text).
- **Copy** and **Print**: Copy announces "Copied." and the clipboard holds the typed text; the worksheet's Print shows only the worksheet with the article title and address.
- **No reader text sent**: a marker string typed into every worksheet, self-check and the blog search never appeared in any request URL or body.
- **No checklist**: the page text never mentions the free checklist.

## Measurement stub: proof of payload shape

`track()` in `public/scripts/site.js` is a no-op on the live site. On localhost it logs each payload. During this run 51 payloads were logged across the 10 articles. Every payload had only the keys `event`, `slug` and (where an exercise exists) `module`. Events seen: `article_open`, `exercise_start`, `exercise_complete`, `output_copy`, `next_step_click`. Example from one article:

```
{event: article_open, slug: when-a-process-depends-on-one-person}
{event: exercise_start, slug: when-a-process-depends-on-one-person, module: dependency-check}
{event: output_copy, slug: when-a-process-depends-on-one-person, module: dependency-check}
{event: exercise_complete, slug: when-a-process-depends-on-one-person, module: dependency-check}
{event: next_step_click, slug: when-a-process-depends-on-one-person}
```

With `navigator.doNotTrack` set to `"1"`, the same actions logged nothing.

## Not fixed, and why

- **Filtering by search text or tag without JavaScript.** A static page cannot read the address. Category and format filtering work without JavaScript through static list pages; search and tag need JavaScript, and the form is hidden without it.
- **Contact-form pre-selection without JavaScript.** `?inquiry=` is read by `site.js`. Without it the form opens on "Choose one". Same cause.
- **Signups posted without JavaScript are rejected until the owner redeploys the Apps Script** from `docs/apps-script-form-handler.gs` (see `release/OWNER_ACTIONS.md`). This also affects the contact and Code559 forms and predates this work.
- **Field focus style.** The glow on focused fields (`--color-sky` on white) is about 1.2:1; the border change to brand blue is what makes focus visible. This is the site's existing style and was left as is. Changing it to the site's amber outline is a one-line owner decision.
- **Not tested here:** a real screen reader, Windows forced-colors mode, text-spacing overrides, and a second automated accessibility tool. `docs/ACCESSIBILITY_CHECKLIST.md` lists these as release-gate items.

## Pages tested

`/blog/`; the 10 articles; `/subscribe/`; `/services/`; `/contact/`; `/resources/solution-architect-starter-kit/`; `/resources/ai-tool-selection-workbook/`; the 5 `/blog/category/…/` pages; the 3 `/blog/format/…/` pages.
