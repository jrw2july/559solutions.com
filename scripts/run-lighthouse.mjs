import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import { runtimeEnv } from "./lib/runtime-env.mjs";

const root = process.cwd();
const url = "http://127.0.0.1:4321/";
const profileDir = path.join(root, ".tmp", "lighthouse-profile");
await mkdir(profileDir, { recursive: true });
const astroCli = path.join(root, "node_modules", "astro", "bin", "astro.mjs");
const server = spawn(
  process.execPath,
  [astroCli, "preview", "--host", "127.0.0.1", "--port", "4321"],
  {
    cwd: root,
    env: runtimeEnv(),
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  },
);

let serverOutput = "";
server.stdout.on("data", (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk.toString();
});

const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The preview is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Astro preview did not start.\n${serverOutput}`);
};

let chrome;
try {
  await waitForServer();
  chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless", "--disable-gpu", "--no-sandbox"],
    userDataDir: profileDir,
  });
  const result = await lighthouse(url, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  if (!result) throw new Error("Lighthouse returned no result.");

  const scores = Object.fromEntries(
    Object.entries(result.lhr.categories).map(([key, category]) => [
      key,
      Math.round((category.score || 0) * 100),
    ]),
  );
  await mkdir(path.join(root, ".tmp"), { recursive: true });
  await writeFile(
    path.join(root, ".tmp", "lighthouse-home.json"),
    JSON.stringify({ scores, finalUrl: result.lhr.finalDisplayedUrl }, null, 2),
  );
  console.log(JSON.stringify(scores, null, 2));

  const belowTarget = Object.entries(scores).filter(([, score]) => score < 95);
  if (belowTarget.length > 0) {
    console.error(`Below target: ${belowTarget.map(([key, score]) => `${key} ${score}`).join(", ")}`);
    process.exitCode = 1;
  }
} finally {
  if (chrome) chrome.kill();
  server.kill();
}
