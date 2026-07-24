import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const errors = [];

const walk = async (directory) => {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await walk(absolute)));
    else result.push(absolute);
  }
  return result;
};

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const forbidden = [
  /\bFiveFive9\b/i,
  /\bfivefive9\.com\b/i,
  /\bJ\.R\.W\. Lakeside\b/i,
  /\bpseudonym\b/i,
  /\bfiction[- ]writing\b/i,
  /\blorem ipsum\b/i,
];

const targetFor = (href) => {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return path.join(dist, "index.html");
  if (clean.endsWith("/")) return path.join(dist, clean.slice(1), "index.html");
  return path.join(dist, clean.slice(1));
};

for (const file of htmlFiles) {
  const relative = path.relative(dist, file).replaceAll("\\", "/");
  const html = await readFile(file, "utf8");

  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${relative}: missing title`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) {
    errors.push(`${relative}: missing meta description`);
  }
  if (!/<link rel="canonical" href="https:\/\/559solutions\.com\//.test(html)) {
    errors.push(`${relative}: missing canonical URL`);
  }
  if (!/<html lang="en">/.test(html)) errors.push(`${relative}: missing English language`);
  if (!/href="#main-content"/.test(html)) errors.push(`${relative}: missing skip link`);

  for (const pattern of forbidden) {
    if (pattern.test(html)) errors.push(`${relative}: contains forbidden production term ${pattern}`);
  }

  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (
      !href.startsWith("/") ||
      href.startsWith("//") ||
      href.startsWith("/#") ||
      href === "/404.html"
    ) {
      continue;
    }
    try {
      await access(targetFor(href));
    } catch {
      errors.push(`${relative}: broken internal link ${href}`);
    }
  }
}

for (const required of [
  "index.html",
  "resources/index.html",
  "services/index.html",
  "blog/index.html",
  "about/index.html",
  "contact/index.html",
  "privacy/index.html",
  "terms/index.html",
  "accessibility/index.html",
  "404.html",
  "sitemap.xml",
  "rss.xml",
  "robots.txt",
  ".htaccess",
]) {
  try {
    await access(path.join(dist, required));
  } catch {
    errors.push(`Missing required build file: ${required}`);
  }
}

if (files.some((file) => file.endsWith(".map"))) {
  errors.push("Production source maps were found in dist.");
}

const draftSlugs = [
  "start-with-the-decision-not-the-ai-tool",
  "the-simplest-useful-architecture-diagram",
  "when-a-process-depends-on-one-person",
  "what-chess-teaches-about-technology-decisions",
  "how-to-run-a-better-discovery-meeting",
  "why-good-processes-fail",
  "science-fiction-and-architecture-of-consequences",
  "what-architects-should-document",
];
for (const slug of draftSlugs) {
  if (files.some((file) => file.replaceAll("\\", "/").includes(`/blog/${slug}/`))) {
    errors.push(`Draft article shipped: ${slug}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Build validation passed for ${htmlFiles.length} HTML pages.`);
