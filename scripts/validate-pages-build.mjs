import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const base = "/559solutions.com";
const origin = "https://jrw2july.github.io";
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

const targetFor = (url) => {
  const clean = url.split("#")[0].split("?")[0];
  const relative = clean.slice(base.length).replace(/^\//, "");
  if (!relative) return path.join(dist, "index.html");
  if (relative.endsWith("/")) return path.join(dist, relative, "index.html");
  return path.join(dist, relative);
};

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  const relative = path.relative(dist, file).replaceAll("\\", "/");
  const html = await readFile(file, "utf8");

  if (!html.includes(`rel="canonical" href="${origin}${base}/`)) {
    errors.push(`${relative}: canonical URL does not use the GitHub Pages base`);
  }

  const urls = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(
    (match) => match[1],
  );
  for (const url of urls) {
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    if (url === "/404.html") continue;
    if (!(url === base || url.startsWith(`${base}/`))) {
      errors.push(`${relative}: root-relative URL is missing ${base}: ${url}`);
      continue;
    }

    try {
      await access(targetFor(url));
    } catch {
      errors.push(`${relative}: broken internal URL ${url}`);
    }
  }
}

const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${origin}${base}/sitemap.xml`)) {
  errors.push("robots.txt does not reference the GitHub Pages sitemap.");
}

const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
if (!sitemap.includes(`<loc>${origin}${base}/</loc>`)) {
  errors.push("sitemap.xml does not use the GitHub Pages site URL.");
}

const manifest = JSON.parse(
  await readFile(path.join(dist, "site.webmanifest"), "utf8"),
);
if (manifest.start_url !== `${base}/`) {
  errors.push("site.webmanifest has an incorrect start_url.");
}
if (manifest.icons?.[0]?.src !== `${base}/images/559-solutions-logo.png`) {
  errors.push("site.webmanifest has an incorrect icon URL.");
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `GitHub Pages validation passed for ${htmlFiles.length} HTML pages at ${origin}${base}/.`,
);
