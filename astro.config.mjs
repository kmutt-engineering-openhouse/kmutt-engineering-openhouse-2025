// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://bangmod.engineer",

  // Performance optimizations
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },

  // Image optimization with Sharp
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: 268402689, // ~16K x 16K pixels
      },
    },
  },

  // Build optimizations
  build: {
    inlineStylesheets: "auto",
    assetsPrefix: "/assets",
  },

  // Vite configuration for better performance
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["astro"],
          },
        },
      },
    },
    ssr: {
      noExternal: ["@motionone/dom"],
    },
  },

  // Integrations
  integrations: [
    mdx({
      syntaxHighlight: false, // Disable if not using code blocks
      gfm: true,
    }),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],

  trailingSlash: "always",

  // Security headers
  output: "static",

  // Experimental features for better performance
  experimental: {
    clientPrerender: true,
  },
});
