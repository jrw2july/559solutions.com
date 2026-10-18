import { copyFile, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
await stat(dist);
await mkdir(dist, { recursive: true });
await copyFile(path.join(root, "public", ".htaccess"), path.join(dist, ".htaccess"));

console.log("Post-build checks: .htaccess copied to dist root.");

// Markdown links such as [x](/contact/) skip sitePath(), so on the GitHub Pages build
// they miss the base. Add it to any root-relative href or src that lacks it.
if (process.env.GITHUB_PAGES === "true") {
  const base = "/559solutions.com";
  const walk = async (directory) => {
    const result = [];
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) result.push(...(await walk(absolute)));
      else if (entry.name.endsWith(".html")) result.push(absolute);
    }
    return result;
  };
  let fixed = 0;
  for (const file of await walk(dist)) {
    const html = await readFile(file, "utf8");
    const updated = html.replace(/((?:href|src)=")(\/(?!\/)[^"]*)"/g, (match, attr, url) => {
      if (url === base || url.startsWith(`${base}/`)) return match;
      fixed += 1;
      return `${attr}${base}${url}"`;
    });
    if (updated !== html) await writeFile(file, updated);
  }
  console.log(`Post-build checks: added the GitHub Pages base to ${fixed} root-relative URLs.`);
}
