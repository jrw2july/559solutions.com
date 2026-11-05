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
  const articles = await getCollection("articles", ({ data }) => !data.draft);
  const course = await getCollection("code559");
  const staticPaths = [
    "/",
    "/services/",
    "/blog/",
    "/subscribe/",
    "/about/",
    "/contact/",
    "/privacy/",
    "/terms/",
    "/accessibility/",
    "/code559/",
    "/code559/choose-the-right-ai-tool/",
  ];

  const urls = [
    ...staticPaths.map((path) => ({ loc: absoluteUrl(path), lastmod: "2026-07-23" })),
    ...articles.map((article) => ({
      loc: absoluteUrl(`/blog/${article.data.slug}/`),
      lastmod: article.data.updatedDate.toISOString().slice(0, 10),
    })),
    ...course.map((page) => ({
      loc: absoluteUrl(page.id === "index" ? "/code559/front-end-developer/" : `/code559/${page.id}/`),
      lastmod: "2026-10-12",
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
