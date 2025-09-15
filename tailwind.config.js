/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#3a3e94",
        "primary-hover": "#69357c",
        "sub-dark": "#2c2f70",
        "sub-light": "#e7cce9",
      },
      fontFamily: {
        sans: [
          "Prompt",
          "Bai Jamjuree",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans Thai",
          "sans-serif",
        ],
        prompt: ["Prompt", "sans-serif"],
        jamjuree: ["Bai Jamjuree", "sans-serif"],
      },
    },
  },
  plugins: [],
};
