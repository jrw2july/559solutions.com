import { getCollection } from "astro:content";
import { absoluteUrl, site } from "@/config/site";

export const prerender = true;

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export async function GET() {
  const articles = (await getCollection("articles", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publicationDate.valueOf() - a.data.publicationDate.valueOf(),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.siteName)} Articles</title>
    <link>${escapeXml(absoluteUrl("/blog/"))}</link>
    <description>Practical articles about AI, systems thinking, architecture, and clearer work.</description>
    <language>en-us</language>
${articles
  .map(
    (article) => `    <item>
      <title>${escapeXml(article.data.title)}</title>
      <link>${escapeXml(absoluteUrl(`/blog/${article.data.slug}/`))}</link>
      <guid>${escapeXml(absoluteUrl(`/blog/${article.data.slug}/`))}</guid>
      <pubDate>${article.data.publicationDate.toUTCString()}</pubDate>
      <description>${escapeXml(article.data.summary)}</description>
      <category>${escapeXml(article.data.category)}</category>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
