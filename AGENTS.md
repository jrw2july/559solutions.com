# Instructions for coding agents (559solutions.com)

A static Astro site for 559 Solutions. It ships to Apache/cPanel (`docs/CPANEL_DEPLOYMENT.md`) and has a GitHub Pages workflow (`.github/workflows/deploy-pages.yml`). No server runtime, no database.

## Owner rules (always)

- Do not commit, push, tag, open pull requests, or deploy. The owner reviews the diff and does those himself.
- Do not run `gh auth`, and do not read or print credentials, tokens, or `.env` files.
- Keep each change to the task you were given. No "while I'm here" edits.
- Plain, short sentences in any page text. No profanity.

## Commands

Use Node 22.14 or newer and pnpm 11.9 (`corepack pnpm ...` if pnpm is not on the PATH).

```
pnpm install --frozen-lockfile
pnpm dev                  # local preview
pnpm validate             # lint + build + tests + html-validate + link check
```

A task is not done until `pnpm validate` passes. Report what it printed and list the files you changed.

## Site rules the checks enforce

- No inline `style="..."` attributes. Add a class in `src/styles/global.css`.
- Markdown syntax highlighting stays off (`astro.config.mjs`), because highlighters add inline colors.
- `trailingSlash: "always"`: internal links end in `/`.
- Links that open a new tab carry `rel="noopener"` and visually hidden "(opens in a new tab)" text.
- Images need real `alt` text (or `alt=""` for decoration).
- Content and page rules: `docs/CONTENT_GUIDE.md`, `docs/ACCESSIBILITY_CHECKLIST.md`, `docs/SEO_CHECKLIST.md`.

## Code559 course pages (`/code559/`): copies, not sources

- `src/content/code559/` and `public/code559/` are generated copies of the **Code559** repository's `blog/` folder. Never edit them by hand; the next sync overwrites them.
- To change a lesson: edit `../Code559/blog/...`, then run `pnpm sync:code559` and `pnpm validate`. Details: `docs/CODE559.md`.
- The sync script needs the Code559 repository beside this one (`../Code559`). If it is missing, say so and stop; do not recreate the content.
- Course wording, structure and the "About this module" / "Contents" blocks belong to the Code559 repository's rules (`Code559/AGENTS.md`, `Code559/blog/STYLE-GUIDE.md`).

## Release

When the owner asks for a release package: `pnpm validate`, then `pnpm package` (see `docs/MAINTENANCE.md`). Uploading is the owner's job.
