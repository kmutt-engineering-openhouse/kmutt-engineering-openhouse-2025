// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://bangmod.engineer",
  compressHTML: true,
  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx(), sitemap()],
  trailingSlash: "always",
});
