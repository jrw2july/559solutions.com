// Copy the Code559 course posts into this site (2026-10-12).
// Source of truth: the Code559 repository's blog folder (default: the sibling folder ../Code559/blog).
// Usage: node scripts/sync-code559.mjs [path-to-Code559/blog]
// Writes src/content/code559/*.md and public/code559/images/**. Run it, then pnpm build.
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = path.resolve(process.argv[2] || path.join(root, "..", "Code559", "blog"));
const contentDir = path.join(root, "src", "content", "code559");
const imageDir = path.join(root, "public", "code559", "images");

// Apply fn only to text outside fenced code blocks and inline code spans, so lesson code stays exactly as written.
function outsideCode(text, fn) {
  return text.split(/(^[ \t]*```[\s\S]*?^[ \t]*```[ \t]*$)/m).map((block, i) =>
    i % 2 ? block : block.split(/(`+[^`]*?`+)/).map((piece, j) => (j % 2 ? piece : fn(piece))).join("")).join("");
}

const STYLE_CLASSES = [
  ["vertical-align:-0.35em;", "c559-badge"],
  ["display:flex;align-items:flex-end;margin:1.5em 0;", "c559-divider"],
  ["flex:1;min-width:0;height:34px;", "c559-wall-1"],
  ["flex:3;min-width:0;height:34px;", "c559-wall-3"],
  ["width:70px;height:34px;", "c559-window"],
  ["width:46px;height:34px;", "c559-door"],
];

function fixPart(text, file) {
  // Relative addresses, so the pages work at any base path:
  // the course home is /code559/ and each module is /code559/module-NN-slug/; pictures are /code559/images/.
  const up = file === "index.md" ? "" : "../";
  // Markdown pictures become plain <img> tags so the build serves the original files unchanged (real captures stay exact).
  text = text.replace(/!\[(.*?)\]\(images\/([^)\s]+)\)/g,
    (_, alt, file) => `<img src="${up}images/${file}" alt="${alt.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}" loading="lazy">`);
  text = text.replace(/src="images\//g, `src="${up}images/`);
  // A picture alone on its line must be followed by a blank line, or Markdown would treat its caption as raw HTML.
  text = text.replace(/^([ \t]*<img [^>\n]*loading="lazy">)\n(?=[ \t]*\S)/gm, (_, img) => `${img}\n${img.match(/^[ \t]*/)[0]}\n`);
  // The site does not allow inline styles: swap the badge and divider styles for classes (styled in global.css).
  for (const [style, cls] of STYLE_CLASSES) text = text.split(`style="${style}"`).join(`class="${cls}"`);
  // Links between pages: module-NN-slug.md -> module-NN-slug/
  text = text.replace(/\]\((module-\d\d-[a-z0-9-]+)\.md\)/g, `](${up}$1/)`);
  // Packet links open in a new tab (decided 2026-10-12), and say so to screen readers.
  text = text.replace(/\[([^\]]+)\]\((https:\/\/code559\.gumroad\.com[^)]*)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1<span class="visually-hidden"> (opens in a new tab)</span></a>');
  return text;
}

const files = (await readdir(source)).filter((f) => /^(module-\d\d-[a-z0-9-]+|index)\.md$/.test(f));
if (!files.includes("index.md") || files.length < 2) throw new Error(`No Code559 posts found in ${source}`);

await rm(contentDir, { recursive: true, force: true });
await mkdir(contentDir, { recursive: true });
for (const file of files) {
  let text = (await readFile(path.join(source, file), "utf8")).replace(/\r\n/g, "\n");
  text = outsideCode(text, (part) => fixPart(part, file));
  await writeFile(path.join(contentDir, file), text, "utf8");
}
await rm(imageDir, { recursive: true, force: true });
await mkdir(path.dirname(imageDir), { recursive: true });
await cp(path.join(source, "images"), imageDir, { recursive: true });
console.log(`Synced ${files.length} Code559 pages and their images from ${source}`);
