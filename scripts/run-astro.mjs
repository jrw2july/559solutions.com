import { spawnSync } from "node:child_process";
import path from "node:path";
import { runtimeEnv } from "./lib/runtime-env.mjs";

const astroCli = path.join(process.cwd(), "node_modules", "astro", "bin", "astro.mjs");
const result = spawnSync(process.execPath, [astroCli, ...process.argv.slice(2)], {
  cwd: process.cwd(),
  env: runtimeEnv(),
  stdio: "inherit",
  windowsHide: true,
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
