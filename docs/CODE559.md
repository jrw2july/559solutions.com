# Code559 course pages

`/code559/` introduces Code559, the initiative to help regular people use coding and AI tools to get results, and lists its courses (`src/pages/code559/index.astro`, with the course list in `src/data/code559-offerings.ts`). The free Front-End Developer Course lives at `/code559/front-end-developer/` (course home) and `/code559/module-NN-slug/` (one page per module). To open a new course, give its entry `status: "Available"` and an `href`.

## Where the content comes from

The Markdown source of truth is the **Code559** repository (`blog/` folder), not this site. This site keeps a copy:

- `src/content/code559/*.md`: the course home (`index.md`) and the 14 module posts
- `public/code559/images/`: every picture, badge and divider

Do not edit those copies by hand. Change the post in the Code559 repository, then copy it over.

## Updating the pages

From this repository's folder, with the Code559 repository next to it (both inside `Documents\GitHub`):

```powershell
pnpm sync:code559
pnpm validate
```

`pnpm sync:code559` reads `..\Code559\blog` by default. To use another folder: `node scripts/sync-code559.mjs C:\path\to\Code559\blog`.

The sync step:

- turns Markdown pictures into plain `<img>` tags, so pictures are served exactly as captured
- makes picture and page addresses relative, so the pages work at any base path (including the GitHub Pages preview)
- swaps the badge and divider inline styles for classes (`c559-*` in `src/styles/global.css`), because this site does not allow inline styles
- makes "Get the packet" links (code559.gumroad.com) open in a new tab, with "(opens in a new tab)" for screen readers
- never changes anything inside code blocks or inline code

## Site settings added for the course (2026-10-12)

- `src/content.config.ts`: the `code559` collection
- `src/pages/code559/index.astro` and `src/pages/code559/[slug].astro`: the pages, with Previous / All modules / Next links
- `src/data/navigation.ts`: "Code559" in the main menu
- `src/pages/sitemap.xml.ts`: the course pages
- `public/.htaccess`: old `.html` addresses redirect to the folder addresses
- `astro.config.mjs`: `markdown.syntaxHighlight: false` (a highlighter adds inline colors, which the HTML check rejects)
- `.htmlvalidate.json`: `valid-id` is relaxed, because the course's contents links point at headings such as `#1-what-is-a-function` (HTML allows ids that start with a digit)
