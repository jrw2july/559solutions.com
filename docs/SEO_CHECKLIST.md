# SEO Checklist

## Before publishing a page

- Use a unique, descriptive page title.
- Write a unique meta description that matches visible content.
- Use one H1 and a logical H2/H3 hierarchy.
- Confirm the canonical URL uses `https://559solutions.com`.
- Add descriptive internal links from relevant pages.
- Use human-readable, lowercase path segments.
- Add useful alt text and explicit dimensions to meaningful images.
- Exclude drafts, private content, thin utility pages, and duplicate URLs from the sitemap.
- Use structured data only when it matches visible, accurate information.
- Check social title, description, and image.
- Avoid fabricated reviews, ratings, dates, prices, availability, or author claims.

## Site-wide checks

- HTTPS and non-`www` canonical redirect work in one hop.
- `robots.txt` points to the production sitemap.
- `sitemap.xml` contains every indexable production page and no draft routes.
- `rss.xml` contains published articles only.
- The custom 404 returns a real HTTP 404 response on Apache.
- Old confirmed URLs redirect to the closest useful replacement.
- Pending redirects in `docs/redirect-map.csv` are resolved before the old platform is removed.
- Page content works without JavaScript; JavaScript adds only progressive enhancement.
- No broken internal links, mixed content, or unintended indexable staging URLs exist.

## After deployment

1. Crawl the public site with a trusted crawler or search-console URL inspector.
2. Verify live status codes, canonicals, titles, descriptions, headings, structured data, and image URLs.
3. Submit the sitemap to the selected webmaster/search-console tools.
4. Monitor indexing, coverage, Core Web Vitals, crawl errors, and redirect hits.
5. Keep redirects for at least 12 months and longer when old URLs continue receiving links or traffic.
6. Review search snippets after major content changes.

## Content quality

Write for the visitor's decision, not for a keyword count. Each page should have a clear audience, purpose, answer, and next step. Update or remove obsolete claims and visibly date content when recency matters.
