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

## Altair legal pages

Altair uses `/altair/privacy`, `/altair/health-privacy`, and
`/altair/health-notice`. The privacy pages describe the device-local health profile,
account-restored display name and profile photo, optional transient AI/voice
processing, explicit server notes, and retention/deletion limits. Local health
profile fields and private history cannot be restored on a fresh installation
or another device. Privacy requests use `contact@dame.dev`. Keep provider
arrangements and production behavior aligned with these disclosures. The footer
provides separate links, including a distinct consumer-health-policy link.
Floyd’s `/floyd/privacy` remains separate. Altair uses Apple’s standard EULA for
Terms of Use.

See the companion altairapp repository’s `docs/PrivacyLaunchReview.md` for the
code audit, official sources, and remaining release requirements. Verify all
three public URLs after deployment before distributing the app’s legal links.

## Deployment

Pushes to `main` are built and published to GitHub Pages via
`.github/workflows/deploy.yml`. The custom domain lives in `public/CNAME`, and
`404.html` is emitted as an SPA fallback so deep links resolve correctly.
Legal routes also emit their own `index.html` entrypoints so direct policy links
return successful HTTP responses instead of relying on the 404 fallback.

> One-time setup: in the repository settings, set **Pages → Build and
> deployment → Source** to **GitHub Actions**.
