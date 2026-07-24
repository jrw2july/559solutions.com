import { getCollection } from "astro:content";
import { absoluteUrl } from "@/config/site";

export const prerender = true;

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export async function GET() {
  const resources = await getCollection("resources", ({ data }) => !data.draft);
  const articles = await getCollection("articles", ({ data }) => !data.draft);
  const staticPaths = [
    "/",
    "/resources/",
    "/services/",
    "/blog/",
    "/about/",
    "/contact/",
    "/privacy/",
    "/terms/",
    "/accessibility/",
  ];

  const urls = [
    ...staticPaths.map((path) => ({ loc: absoluteUrl(path), lastmod: "2026-07-23" })),
    ...resources.map((resource) => ({
      loc: absoluteUrl(`/resources/${resource.data.slug}/`),
      lastmod: resource.data.lastUpdated.toISOString().slice(0, 10),
    })),
    ...articles.map((article) => ({
      loc: absoluteUrl(`/blog/${article.data.slug}/`),
      lastmod: article.data.updatedDate.toISOString().slice(0, 10),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod }) =>
      `  <url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod></url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
