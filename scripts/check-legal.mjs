// Legal placeholder check (2026-11-05). Runs at the end of `pnpm build`. It lists every owner-only
// placeholder value (the "TODO-JR-" prefix) still in src/, with its file and line, as a warning.
// It never fails the build: the Terms and Privacy pages show the review banner until every value in
// site.legal (src/config/site.ts) is set.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const pattern = /TODO-JR-[A-Z0-9][A-Z0-9-]*/g;

const walk = async (directory) => {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolute)));
    else if (/\.(astro|ts|mjs|js|md|mdx|json)$/.test(entry.name)) files.push(absolute);
  }
  return files;
};

const found = [];
for (const file of await walk(path.join(root, "src"))) {
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, index) => {
    for (const match of line.matchAll(pattern)) {
      found.push(`  ${path.relative(root, file).split(path.sep).join("/")}:${index + 1}  ${match[0]}`);
    }
  });
}

if (found.length === 0) {
  console.log("Legal check: every owner value is set. Terms and Privacy show their effective date.");
} else {
  console.warn(
    `WARNING: ${found.length} legal placeholder value(s) are not set. Terms and Privacy show the review banner until all are set:`,
  );
  console.warn(found.join("\n"));
}
