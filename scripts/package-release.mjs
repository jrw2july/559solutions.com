import { mkdir } from "node:fs/promises";
import path from "node:path";
import { createZip } from "./lib/zip.mjs";

const root = process.cwd();
const release = path.join(root, "release");
await mkdir(release, { recursive: true });

const deployResult = await createZip({
  root: path.join(root, "dist"),
  destination: path.join(release, "559solutions-cpanel-deploy.zip"),
  shouldInclude: () => true,
});

const excludedTopLevel = new Set([
  ".agents",
  ".astro",
  ".git",
  ".pnpm-store",
  ".tmp",
  ".vercel",
  ".wrangler",
  "dist",
  "node_modules",
  "outputs",
  "work",
]);

const sourceResult = await createZip({
  root,
  destination: path.join(release, "559solutions-source.zip"),
  shouldInclude: (relative) => {
    const parts = relative.split("/");
    if (excludedTopLevel.has(parts[0])) return false;
    if (relative === "release/559solutions-cpanel-deploy.zip") return false;
    if (relative === "release/559solutions-source.zip") return false;
    if (relative.startsWith("release/559solutions-source/")) return false;
    if (/^release\/lighthouse-.*\.(?:json|html)$/.test(relative)) return false;
    if (parts.some((part) => part.startsWith(".env"))) return false;
    if (relative.endsWith(".log")) return false;
    return true;
  },
});

console.log(
  JSON.stringify(
    {
      deploy: {
        files: deployResult.files.length,
        bytes: deployResult.bytes,
        sha256: deployResult.sha256,
      },
      source: {
        files: sourceResult.files.length,
        bytes: sourceResult.bytes,
        sha256: sourceResult.sha256,
      },
    },
    null,
    2,
  ),
);
