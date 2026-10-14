import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { createZip } from "./lib/zip.mjs";

const root = process.cwd();
const release = path.join(root, "release");
await mkdir(release, { recursive: true });

// Each deploy zip gets its own name, so an old one can't be uploaded by mistake:
// <prefix>-559solutions-cpanel-deploy-<local date><a, b, c...>.zip (2026-10-14).
// The owner asked for the "claude-code" prefix; set RELEASE_PREFIX to use another.
const prefix = process.env.RELEASE_PREFIX || "claude-code";
const today = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const letter = [..."abcdefghijklmnopqrstuvwxyz"].find(
  (l) => !existsSync(path.join(release, `${prefix}-559solutions-cpanel-deploy-${today}${l}.zip`)),
);
if (!letter) throw new Error(`More than 26 deploy zips for ${today}. Clear out release/ first.`);
const deployName = `${prefix}-559solutions-cpanel-deploy-${today}${letter}.zip`;

const deployResult = await createZip({
  root: path.join(root, "dist"),
  destination: path.join(release, deployName),
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
    if (/^release\/(?:[\w-]+-)?559solutions-cpanel-deploy[\w-]*\.zip$/.test(relative)) return false;
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
        file: `release/${deployName}`,
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
