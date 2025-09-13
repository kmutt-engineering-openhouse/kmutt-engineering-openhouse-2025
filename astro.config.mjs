// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://bangmod.engineer",
  compressHTML: true,
  prefetch: true,
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "th",
        locales: {
          th: "th-TH",
          en: "en-US",
        },
      },
      customPages: ["https://bangmod.engineer/"],
    }),
  ],
  trailingSlash: "always",
});
