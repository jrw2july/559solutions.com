import { defineConfig } from "astro/config";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  site: isGitHubPages ? "https://jrw2july.github.io" : "https://559solutions.com",
  base: isGitHubPages ? "/559solutions.com" : undefined,
  output: "static",
  trailingSlash: "always",
  build: {
    assets: "_assets",
    inlineStylesheets: "auto",
  },
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
