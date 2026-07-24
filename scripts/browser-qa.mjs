import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";
import { runtimeEnv } from "./lib/runtime-env.mjs";

const root = process.cwd();
const baseUrl = "http://127.0.0.1:4321";
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const screenshotDir = path.join(root, ".tmp", "qa");
await mkdir(screenshotDir, { recursive: true });

let server;
const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/`);
      if (response.ok) return;
    } catch {
      // The preview is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("The local production preview did not start.");
};

try {
  await waitForServer();
} catch {
  const astroCli = path.join(root, "node_modules", "astro", "bin", "astro.mjs");
  server = spawn(
    process.execPath,
    [astroCli, "preview", "--host", "127.0.0.1", "--port", "4321"],
    { cwd: root, env: runtimeEnv(), stdio: "ignore", windowsHide: true },
  );
  await waitForServer();
}

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

const consoleErrors = [];
const results = {
  routes: [],
  viewports: [],
  interactions: [],
  screenshots: [],
};

try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  const routes = [
    "/",
    "/resources/",
    "/resources/ai-project-readiness-checklist/",
    "/services/",
    "/blog/",
    "/blog/the-hero-trap/",
    "/about/",
    "/contact/",
  ];

  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 200, `${route} should return 200`);
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
      true,
      `${route} should not overflow horizontally`,
    );
    results.routes.push(route);
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(screenshotDir, "home-desktop.png"), fullPage: true });
  results.screenshots.push("home-desktop.png");

  await page.keyboard.press("Tab");
  assert.match(await page.locator(":focus").textContent(), /Skip to main content/);
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => window.location.hash), "#main-content");
  results.interactions.push("keyboard skip link");

  await page.getByRole("link", { name: "Resources", exact: true }).first().click();
  await page.waitForURL("**/resources/");
  assert.equal(await page.locator('[aria-current="page"]').count() > 0, true);
  results.interactions.push("desktop navigation");

  await page.getByLabel("Search").fill("workbook");
  await page.getByRole("button", { name: "Apply filters" }).click();
  assert.equal(await page.locator("[data-filter-card]:visible").count(), 1);
  assert.match(await page.locator("[data-filter-status]").textContent(), /1 item shown/);
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.locator("[data-filter-status]").filter({ hasText: "5 items shown" }).waitFor();
  assert.equal(await page.locator("[data-filter-card]:visible").count(), 5);
  await page.screenshot({ path: path.join(screenshotDir, "resources-desktop.png"), fullPage: true });
  results.screenshots.push("resources-desktop.png");
  results.interactions.push("resource search and reset");

  await page.goto(`${baseUrl}/blog/`, { waitUntil: "networkidle" });
  await page.getByLabel("Category").selectOption("systems thinking");
  assert.equal(await page.locator("[data-filter-card]:visible").count(), 1);
  results.interactions.push("blog category filter");

  await page.goto(`${baseUrl}/contact/`, { waitUntil: "networkidle" });
  assert.equal(await page.getByRole("button", { name: "Send inquiry" }).isDisabled(), true);
  assert.match(await page.locator(".form-notice").textContent(), /online form is not active/i);
  await page.screenshot({ path: path.join(screenshotDir, "contact-desktop.png"), fullPage: true });
  results.screenshots.push("contact-desktop.png");
  results.interactions.push("safe form fallback");

  for (const viewport of [
    { name: "mobile", width: 375, height: 812 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 900 },
    { name: "200-percent-zoom-equivalent", width: 720, height: 450 },
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
      true,
      `${viewport.name} should not overflow horizontally`,
    );
    results.viewports.push(viewport.name);
  }

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  const mobileMenu = page.locator("details.mobile-nav");
  await mobileMenu.locator("summary").click();
  assert.equal(await mobileMenu.getAttribute("open"), "");
  assert.equal(await mobileMenu.getByRole("link", { name: "Resources", exact: true }).isVisible(), true);
  await page.screenshot({ path: path.join(screenshotDir, "home-mobile.png"), fullPage: true });
  results.screenshots.push("home-mobile.png");
  results.interactions.push("mobile navigation");
  await context.close();

  const reducedContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  const transitionDuration = await reducedPage
    .locator(".button")
    .first()
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  assert.match(transitionDuration, /0\.00001s|1e-05s|0s/);
  results.interactions.push("reduced motion");
  await reducedContext.close();

  assert.deepEqual(consoleErrors, [], `Browser console errors: ${consoleErrors.join("; ")}`);
  await writeFile(
    path.join(root, ".tmp", "browser-qa.json"),
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
  if (server) server.kill();
}
