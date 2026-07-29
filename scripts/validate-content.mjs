import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const scanRoots = [
  path.join(root, "src", "pages"),
  path.join(root, "src", "components"),
  path.join(root, "src", "content", "resources"),
  path.join(root, "src", "content", "articles"),
];
const errors = [];
const forbiddenProductionTerms = [
  /\bFiveFive9\b/i,
  /\bfivefive9\.com\b/i,
  /\bJ\.R\.W\. Lakeside\b/i,
  /\bpseudonym\b/i,
  /\bfiction[- ]writing\b/i,
  /\blorem ipsum\b/i,
];

const walk = async (directory) => {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await walk(absolute)));
    else result.push(absolute);
  }
  return result;
};

for (const scanRoot of scanRoots) {
  for (const file of await walk(scanRoot)) {
    const normalized = file.replaceAll("\\", "/");
    const content = await readFile(file, "utf8");
    const isDraft = normalized.includes("/articles/drafts/") && /draft:\s*true/.test(content);
    if (!isDraft) {
      for (const pattern of forbiddenProductionTerms) {
        if (pattern.test(content)) errors.push(`${normalized}: contains ${pattern}`);
      }
    }
    if (/href=["']#["']/.test(content)) errors.push(`${normalized}: contains a placeholder href`);
    if (/https?:\/\/example\.(?:com|org)/i.test(content)) {
      errors.push(`${normalized}: contains an example-domain URL`);
    }
  }
}

const config = await readFile(path.join(root, "src", "config", "site.ts"), "utf8");
if (
  !config.includes(
    'const configuredSite = import.meta.env.SITE || "https://559solutions.com"',
  ) ||
  !config.includes("siteDomain: configuredSite")
) {
  errors.push("src/config/site.ts: canonical site domain is incorrect");
}
if (!config.includes("enabled: false")) {
  errors.push("src/config/site.ts: analytics must be disabled by default");
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Source content validation passed.");
