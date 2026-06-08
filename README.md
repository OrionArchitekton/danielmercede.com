# Daniel Mercede

A single-page biographical site providing long-form professional context, not promotion.

**Live:** https://www.danielmercede.com

This repository is the source for **www.danielmercede.com** (the canonical, live domain — see `index.html`, `public/sitemap.xml`, and `public/robots.txt`). It is a static single-page site that presents a long-form, first-person biography intended to give narrative depth and operational grounding beyond a résumé or profile summary.

---

## Purpose

This site exists to offer **context**, not promotion.

It documents the experiences, environments, and perspectives that inform the systems I build today — with an emphasis on operational realism, governance, and long-term system integrity.

This is not a portfolio, product site, or marketing surface.

---

## What this is

A single React component (`components/Biography.tsx`) renders the entire page:

- First-person long-form prose with serif typography and inline pull-quotes (`components/PullQuote.tsx`).
- One portrait image (grayscale, color on hover) with a staggered fade-in animation.
- A **Print / PDF** button (`window.print()`) with print-specific styles that flatten animations and switch to black-on-white.
- A footer call-to-action linking to https://www.orionintelligenceagency.com/book ("Book a Runtime Governance Readiness Scan").

The site is heavily SEO-scaffolded: canonical link, Open Graph and Twitter meta, JSON-LD schema, `robots.txt`, `sitemap.xml`, and a full favicon / `site.webmanifest` set.

---

## Stack

- **React 19** (`react` / `react-dom` `^19.2.3`)
- **Vite 6** (`^6.2.0`) — dev server and build
- **TypeScript** `~5.8.2`
- **Tailwind CSS** — loaded from the CDN (`cdn.tailwindcss.com`), not an npm dependency
- **Google Fonts** — Inter (sans) and Lora (serif)
- React itself is resolved at runtime via an **esm.sh importmap** declared in `index.html`

No backend, no API, no router, no test suite. The build output is plain static files.

---

## Local development

```bash
git clone https://github.com/OrionArchitekton/danielmercede.com.git
cd danielmercede.com
npm install
npm run dev        # Vite dev server on http://0.0.0.0:3000
```

Other scripts:

```bash
npm run build      # production build to dist/
npm run preview    # serve the built dist/ locally
```

Requires Node (a current LTS works with Vite 6 / React 19).

---

## Configuration

There are no required environment variables to run the site.

`vite.config.ts` defines `process.env.API_KEY` and `process.env.GEMINI_API_KEY` from a `GEMINI_API_KEY` env var, but **no source code reads either value** — this is leftover scaffolding from an AI Studio template and is inert. Setting `GEMINI_API_KEY` has no effect on the site. The define block can be removed; it is documented here only so the dead wiring is not mistaken for an active integration.

---

## Deploy

The site is a static Vite build: `npm run build` emits `dist/`, which can be served by any static host. No deploy provider, CI workflow, or build hook is configured in this repository; the live deployment to www.danielmercede.com is managed outside the repo.

---

## Project structure

| Path | Purpose |
|------|---------|
| `index.html` | HTML shell: SEO meta, JSON-LD, Tailwind CDN, fonts, esm.sh importmap |
| `index.tsx` | React mount point |
| `App.tsx` | Root layout wrapper |
| `components/Biography.tsx` | The entire page content |
| `components/PullQuote.tsx` | Pull-quote block used inside the biography |
| `constants.ts` | `IMAGE_METADATA` alt/description map + `getImageMeta` helper (fails loud in dev, falls back safely in prod) |
| `public/` | Portrait images, favicons, `site.webmanifest`, `robots.txt`, `sitemap.xml` |
| `vite.config.ts`, `tsconfig.json` | Build and TypeScript config |

---

## Scope

The content focuses on:

- Personal and professional background
- Geographic and cultural context
- Career arc and operational experience
- Philosophy around systems, governance, and responsibility

It intentionally avoids overlap with product, platform, or commercial messaging found on affiliated sites.

---

## Related and external links

Referenced for context only. These are external identity and project surfaces, not artifacts built or deployed from this repository:

- `danmercede.com` — related identity hub (linked from the site footer as "Context")
- **Orion Intelligence Agency** — the booking CTA target (https://www.orionintelligenceagency.com/book), one of the external links wired into the page code
- **Cosmocrat**, **ReplyBy**, **Apex Trading Systems** — affiliated systems maintained in separate repositories and domains

---

## Notes

This repository is intentionally minimal. No issues, feature requests, or pull requests are expected or accepted unless explicitly coordinated.

---

## License

No license file is present; `package.json` sets `"private": true`. All rights reserved unless a license is added.

© 2026 Daniel Mercede · United States
