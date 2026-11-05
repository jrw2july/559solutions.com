import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const dist = path.join(root, "dist");

test("required routes exist", async () => {
  const routes = [
    "index.html",
    "resources/index.html",
    "resources/ai-tool-selection-workbook/index.html",
    "services/index.html",
    "code559/index.html",
    "blog/index.html",
    "blog/the-hero-trap/index.html",
    "about/index.html",
    "contact/index.html",
    "privacy/index.html",
    "terms/index.html",
    "accessibility/index.html",
    "404.html",
  ];
  for (const route of routes) {
    await assert.doesNotReject(access(path.join(dist, route)), route);
  }
});

test("homepage communicates the core promise and the floor plan of the site", async () => {
  const html = await readFile(path.join(dist, "index.html"), "utf8");
  assert.match(html, /aria-label="Site map"/);
  for (const room of ["The Library", "The Study", "The Classroom"]) {
    assert.match(html, new RegExp(room), room);
  }
  assert.match(html, /C’mon in\./);
});

test("the free checklist is no longer promoted anywhere", async () => {
  const pages = ["index.html", "about/index.html", "resources/index.html", "blog/the-hero-trap/index.html"];
  for (const page of pages) {
    const html = await readFile(path.join(dist, page), "utf8");
    assert.doesNotMatch(html, /Free Checklist/i, page);
    assert.doesNotMatch(html, /ai-project-readiness-checklist/, page);
  }
  await assert.rejects(access(path.join(dist, "resources", "ai-project-readiness-checklist")));
});

test("forms post to the configured endpoint and never to an empty address", async () => {
  const contact = await readFile(path.join(dist, "contact", "index.html"), "utf8");
  const code559 = await readFile(path.join(dist, "code559", "index.html"), "utf8");
  const endpoint = /action="https:\/\/script\.google\.com\/[^"]+\/exec"/;
  assert.match(contact, endpoint);
  assert.match(contact, /data-ajax-form="contact-form"/);
  assert.match(code559, endpoint);
  assert.match(code559, /data-ajax-form="code559-coming-soon"/);
  assert.doesNotMatch(contact, /The online form is not active/);
  assert.doesNotMatch(contact, /action=""/);
});

test("only published articles (draft: false) are in the production blog", async () => {
  const blogRoot = path.join(dist, "blog");
  const entries = await readdir(blogRoot, { withFileTypes: true });
  const names = entries.map((entry) => entry.name);
  const articleRoot = path.join(dist, "..", "src", "content", "articles");
  const published = [];
  for (const entry of await readdir(articleRoot, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const source = await readFile(path.join(articleRoot, entry.name), "utf8");
    if (/^draft:\s*false\s*$/m.test(source)) published.push(entry.name.replace(/\.md$/, ""));
  }
  // blog/category/ holds the category pages (2026-11-05), so no article may use the slug "category".
  assert.deepEqual(names.filter((name) => name !== "index.html" && name !== "category").sort(), published.sort());
});

test("sitemap, RSS, robots, and Apache configuration use the canonical host", async () => {
  const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
  const rss = await readFile(path.join(dist, "rss.xml"), "utf8");
  const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
  const htaccess = await readFile(path.join(dist, ".htaccess"), "utf8");
  for (const content of [sitemap, rss, robots, htaccess]) {
    assert.match(content, /559solutions\.com/);
  }
  assert.match(htaccess, /RewriteCond %\{HTTPS\} !=on/);
  assert.match(htaccess, /Options -Indexes/);
  assert.match(htaccess, /Content-Security-Policy/);
});

test("blog categories are real links to static, noindex category pages", async () => {
  const blog = await readFile(path.join(dist, "blog", "index.html"), "utf8");
  const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
  const slugs = ["ai-without-the-hype", "systems-thinking", "small-business-tools", "builder-notes", "architects-notebook"];
  for (const slug of slugs) {
    assert.match(blog, new RegExp(`href="/blog/category/${slug}/"`), slug);
    const page = await readFile(path.join(dist, "blog", "category", slug, "index.html"), "utf8");
    assert.match(page, /<meta name="robots" content="noindex, nofollow">/, slug);
    assert.match(page, /aria-current="page"/, slug);
    assert.doesNotMatch(sitemap, new RegExp(`/blog/category/${slug}/`), slug);
  }
});

test("blog filters run live: no Apply button, results announced, problem links present", async () => {
  const blog = await readFile(path.join(dist, "blog", "index.html"), "utf8");
  assert.doesNotMatch(blog, /Apply filters/);
  assert.match(blog, /role="search"[^>]*hidden|hidden[^>]*role="search"/);
  assert.match(blog, /data-filter-status[^>]*role="status"|role="status"[^>]*data-filter-status/);
  assert.match(blog, /What are you trying to work through\?/);
  const resources = await readFile(path.join(dist, "resources", "index.html"), "utf8");
  assert.match(resources, /Apply filters/, "resources keeps its own filter form");
});
