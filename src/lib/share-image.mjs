// Page share images (2026-11-05). At build time, a page can get its own 1200x630 PNG: the page title, a
// small blueprint drawing and the 559 Solutions logo. src/pages/share/[slug].png.ts writes the files;
// a page calls shareImageFor(slug) for its og:image. If drawing fails (for example, sharp cannot load),
// the page falls back to the site-wide /images/og.png and no share file is written.
// To add a page (for example a blog article): add an entry to shareImages below.
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { site } from "@/config/site";

// Plain JavaScript (not TypeScript): sharp's package does not expose its type declarations to this
// project's module resolution, and a .mjs module is not type-checked.

/**
 * @typedef {object} ShareImage
 * @property {string} slug
 * @property {string} eyebrow
 * @property {string[]} titleLines
 * @property {string} alt Accurate description of what the image shows, for og:image:alt.
 * @property {"playbook"} drawing
 */

/** @type {ShareImage[]} */
export const shareImages = [
  {
    slug: "choose-the-right-ai-tool",
    eyebrow: "CODE559 · FREE GUIDE",
    titleLines: ["How to Choose the", "Right AI Tool"],
    alt: "How to Choose the Right AI Tool, a Code559 free guide from 559 Solutions. The 559 Solutions logo and a blueprint drawing of a playbook: trigger, input, prompt, who approves, where it is saved, then keep, adjust or stop.",
    drawing: "playbook",
  },
];

const W = 1200;
const H = 630;
const INK = "#082455";
const BLUE = "#104dc9";
/** @param {string} text */
const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// The simplified playbook: five boxes joined by arrows, then the three outcomes in dashed boxes.
/** @param {number} top */
const playbook = (top) => {
  const parts = [["Trigger"], ["Input"], ["Prompt"], ["Who", "approves"], ["Where it", "is saved"]];
  const boxW = 190;
  const boxH = 84;
  const step = 214;
  const left = 70;
  const boxes = parts
    .map((lines, i) => {
      const x = left + i * step;
      const arrow = i < parts.length - 1
        ? `<line x1="${x + boxW + 2}" y1="${top + boxH / 2}" x2="${x + step - 6}" y2="${top + boxH / 2}" stroke="${INK}" stroke-width="3" marker-end="url(#a)"/>`
        : "";
      const first = top + boxH / 2 - ((lines.length - 1) * 28) / 2 + 9;
      const text = lines
        .map((line, n) => `<text x="${x + boxW / 2}" y="${first + n * 28}" text-anchor="middle" font-size="25" font-weight="700" fill="${INK}">${line}</text>`)
        .join("");
      return `<rect x="${x}" y="${top}" width="${boxW}" height="${boxH}" rx="6" fill="#fff" stroke="${INK}" stroke-width="3"/>${text}${arrow}`;
    })
    .join("\n");
  const right = left + 4 * step + boxW;
  const outTop = top + boxH + 40;
  const outcomes = ["Keep", "Adjust", "Stop"]
    .map((label, i) => {
      const x = right - 3 * 150 - 2 * 20 + i * 170;
      return `<rect x="${x}" y="${outTop}" width="150" height="54" rx="6" fill="#fff1cc" stroke="${INK}" stroke-width="3" stroke-dasharray="10 7"/>
<text x="${x + 75}" y="${outTop + 36}" text-anchor="middle" font-size="25" font-weight="700" fill="${INK}">${label}</text>`;
    })
    .join("\n");
  const firstOut = right - 3 * 150 - 2 * 20;
  return `${boxes}
<path d="M${left} ${top + boxH + 10} v10 H${right} v-10" fill="none" stroke="${INK}" stroke-width="3"/>
<text x="${left}" y="${outTop + 36}" font-size="24" fill="${INK}">Run it enough times to see a pattern</text>
<line x1="${firstOut - 60}" y1="${outTop + 27}" x2="${firstOut - 8}" y2="${outTop + 27}" stroke="${INK}" stroke-width="3" marker-end="url(#a)"/>
${outcomes}`;
};

/** @param {ShareImage} image */
const svgFor = (image) => {
  const grid = [];
  for (let x = 0; x <= W; x += 30) grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${BLUE}" stroke-opacity="${x % 150 === 0 ? 0.14 : 0.07}"/>`);
  for (let y = 0; y <= H; y += 30) grid.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${BLUE}" stroke-opacity="${y % 150 === 0 ? 0.14 : 0.07}"/>`);
  const title = image.titleLines
    .map((line, i) => `<text x="70" y="${178 + i * 74}" font-size="66" font-weight="800" fill="${INK}">${escape(line)}</text>`)
    .join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Inter, 'DejaVu Sans', Arial, sans-serif">
<defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker></defs>
<rect width="${W}" height="${H}" fill="#fff"/>
${grid.join("\n")}
<rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="${BLUE}" stroke-width="4"/>
<rect x="34" y="34" width="${W - 68}" height="${H - 68}" fill="none" stroke="${BLUE}" stroke-width="1.5"/>
<text x="70" y="98" font-family="'DejaVu Sans Mono', Consolas, monospace" font-size="24" font-weight="700" letter-spacing="3" fill="${BLUE}">${escape(image.eyebrow)}</text>
${title}
${image.drawing === "playbook" ? playbook(330) : ""}
</svg>`;
};

/** @param {ShareImage} image */
const render = async (image) => {
  const logo = await sharp(await readFile(path.join(process.cwd(), "public", site.logoPath)))
    .resize({ width: 300 })
    .png()
    .toBuffer();
  return sharp(Buffer.from(svgFor(image)))
    .composite([{ input: logo, top: 52, left: W - 300 - 60 }])
    .png()
    .toBuffer();
};

// One drawing per slug per build, shared by the page and the endpoint. null means "use the fallback".
/** @type {Map<string, Promise<Buffer | null>>} */
const cache = new Map();
/**
 * @param {string} slug
 * @returns {Promise<Buffer | null>}
 */
export const renderShareImage = (slug) => {
  if (!cache.has(slug)) {
    const image = shareImages.find((item) => item.slug === slug);
    cache.set(
      slug,
      image
        ? render(image).catch((error) => {
            console.warn(`Share image "${slug}" could not be drawn; using ${site.defaultSocialImage}. ${error}`);
            return null;
          })
        : Promise.resolve(null),
    );
  }
  return /** @type {Promise<Buffer | null>} */ (cache.get(slug));
};

/** The share image and its alt text for a page, or the site-wide image if drawing failed. */
/**
 * @param {string} slug
 * @returns {Promise<{ image: string; alt?: string }>}
 */
export const shareImageFor = async (slug) => {
  const image = shareImages.find((item) => item.slug === slug);
  if (image && (await renderShareImage(slug))) return { image: `/share/${slug}.png`, alt: image.alt };
  return { image: site.defaultSocialImage };
};
