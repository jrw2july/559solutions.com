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
    "resources/ai-project-readiness-checklist/index.html",
    "services/index.html",
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

test("homepage communicates the core promise and product-first path", async () => {
  const html = await readFile(path.join(dist, "index.html"), "utf8");
  assert.match(html, /Turn messy work into clear systems\./);
  assert.match(html, /Product-led by design/);
  assert.match(html, /AI Project Readiness Checklist/);
  assert.match(html, /Business Systems Clarity Session/);
});

test("forms fail safely when endpoints are not configured", async () => {
  const contact = await readFile(path.join(dist, "contact", "index.html"), "utf8");
  const checklist = await readFile(
    path.join(dist, "resources", "ai-project-readiness-checklist", "index.html"),
    "utf8",
  );
  assert.match(contact, /The online form is not active/);
  assert.doesNotMatch(contact, /action=""/);
  assert.doesNotMatch(checklist, /href=""/);
});

test("draft article outlines are excluded from the production blog", async () => {
  const blogRoot = path.join(dist, "blog");
  const entries = await readdir(blogRoot, { withFileTypes: true });
  const names = entries.map((entry) => entry.name);
  assert.deepEqual(
    names.filter((name) => name !== "index.html").sort(),
    ["how-to-choose-and-actually-use-ai-tools", "the-hero-trap"],
  );
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
