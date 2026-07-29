import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
await stat(dist);
await mkdir(dist, { recursive: true });
await copyFile(path.join(root, "public", ".htaccess"), path.join(dist, ".htaccess"));

console.log("Post-build checks: .htaccess copied to dist root.");
