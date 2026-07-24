import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://559solutions.com",
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
