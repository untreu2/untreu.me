# untreu.me

Personal site of Emir Yorulmaz (untreu) — bitcoin & nostr developer.

Built with **React + Vite + TypeScript + Tailwind CSS**. The visual system is
monochrome, with Libertinus Serif used for selected display titles. Posts and
project notes are authored as Markdown and rendered client-side.

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  components/    reusable UI (layout, header, footer, markdown, lists)
  content/       markdown sources + registry (posts, things)
  data/          profile info and social links
  pages/         route components (home, posts, things, article, 404)
```

### Adding a post

1. Create `src/content/posts/<slug>.md` (body only — no title heading).
2. Register it in `src/content/index.ts` with a `slug`, `title` and
   `description`.

## Deployment

Pushes to `main` are built and published to GitHub Pages via
`.github/workflows/deploy.yml`. The custom domain lives in `public/CNAME`, and
`404.html` is emitted as an SPA fallback so deep links resolve correctly.

> One-time setup: in the repository settings, set **Pages → Build and
> deployment → Source** to **GitHub Actions**.
