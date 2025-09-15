// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Vendor dependencies
            if (id.includes("node_modules")) {
              if (id.includes("astro")) return "astro";
              if (id.includes("tailwindcss")) return "tailwind";
              return "vendor";
            }

            // Component groups
            if (id.includes("src/components/")) {
              if (id.includes("navbar") || id.includes("footer")) return "layout";
              if (id.includes("hero") || id.includes("highlight")) return "hero";
              if (id.includes("department") || id.includes("contest")) return "content";
              return "components";
            }

            // Page and utility chunks
            if (id.includes("src/pages/")) return "pages";
            if (id.includes("src/i18n/") || id.includes("src/types/")) return "common";

            return "main";
          },
        },
      },
    },

    optimizeDeps: {
      include: ["sharp"],
    },
  },

  server: {
    port: 4321,
    host: true,
  },

  prefetch: {
    defaultStrategy: "hover",
  },

  i18n: {
    defaultLocale: "th",
    locales: ["th", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  outDir: "./dist",
  publicDir: "./public",
});
