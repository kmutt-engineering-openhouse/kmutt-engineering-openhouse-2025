# KMUTT Engineering Open House 2025 Website

This is the bilingual (TH/EN) website for **KMUTT Engineering Open House 2025**, built with [Astro](https://astro.build), [TailwindCSS](https://tailwindcss.com/).
It includes i18n support with a language switcher, browser-language detection, and cookie-based language preference.

## 🚀 Tech Stack

- **Framework**: [Astro 5](https://docs.astro.build)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com)
- **Language**: TypeScript
- **i18n**: Custom dictionary in `src/i18n/`
- **Deployment**: Cloudflare Pages + Edge Functions
- **Package Manager**: pnpm

## 📂 Project Structure

```text
/
├── functions/            # Cloudflare Pages Functions (edge redirects, i18n cookies)
│   └── [[path]].js
├── public/               # Static assets (served as-is)
├── src/
│   ├── i18n/             # Dictionaries and helpers for translations
│   ├── layouts/          # Shared layouts
│   ├── pages/
│   │   ├── [lang]/       # Dynamic routes for /th/ and /en/
│   │   │   └── index.astro
│   │   └── index.astro   # Dev-only redirect (optional)
│   └── styles/           # Global CSS (Tailwind entrypoint)
├── package.json
├── astro.config.mjs
└── tsconfig.json
```

## 💻 Commands

All commands are run from the root of the project:

| Command          | Action                                                                   |
| ---------------- | ------------------------------------------------------------------------ |
| `pnpm install`   | Install dependencies                                                     |
| `pnpm dev`       | Start local dev server at [http://localhost:4321](http://localhost:4321) |
| `pnpm build`     | Build for production into `./dist/`                                      |
| `pnpm preview`   | Preview the production build locally                                     |
| `pnpm astro ...` | Run Astro CLI commands (e.g. `astro add`, `astro check`)                 |

## 🤝 Contributing

1. Fork this repo
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: describe your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Create a Pull Request

Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) style (`feat:`, `fix:`, `chore:`, etc.).
