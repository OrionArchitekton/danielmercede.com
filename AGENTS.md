# AGENTS.md — danielmercede-com

## Repo Role

Source for **www.danielmercede.com** — a long-form biographical and contextual
site for Dan Mercede under the dan-mercede personal-brand lane. It is a static
React 19 + Vite 6 + TypeScript single-page site; one component
(`components/Biography.tsx`) renders the entire page. Per README: context, not
promotion — explicitly not a portfolio, product site, or marketing surface.

## Repo Identity

- **GitHub:** `OrionArchitekton/danielmercede.com`
- **Registry row:** `personal-brand-dan-mercede-danielmercede-com`
  (entity_kind `personal_authority`, repo_role `web`)
- **Deploy:** static `dist/` build; no deploy provider, CI, or build hook is
  configured in this repo — the live deployment to www.danielmercede.com is
  managed outside the repo (README "Deploy")

## Boundaries

- Owns: the biography page (components, content, SEO scaffolding in
  `index.html`, assets under `public/`)
- Does not own: `danmercede.com` (related identity hub), or the affiliated
  product/platform surfaces referenced for context in the README (Cosmocrat,
  Orion Intelligence Agency, ReplyBy, Apex Trading Systems)
- `vite.config.ts`'s `GEMINI_API_KEY` define is inert template leftover;
  no source reads it (README "Configuration")

## Start Here

- [README.md](README.md) — purpose, stack, structure, deploy notes
- [components/Biography.tsx](components/Biography.tsx) — the entire page (renders
  copy from `bioContent.mjs`)
- [bioContent.mjs](bioContent.mjs) — canonical bio copy shared by the React
  render and the build-time body-bake emitter
- [scripts/bakeBody.mjs](scripts/bakeBody.mjs) — postbuild body-bake: injects the
  real crawlable `<body>` (h1 + prose) into `dist/index.html` for no-JS answer
  engines; runs after `vite build` (no SSR, no framework)
- [index.html](index.html) — SEO meta, JSON-LD (ProfilePage), Tailwind CDN
- [vercel.json](vercel.json) — immutable cache headers for hashed `/assets/*`;
  no SPA rewrite (1-route bio keeps real-404 on unknown paths)
- [constants.ts](constants.ts) — image metadata map
- [vite.config.ts](vite.config.ts) — build config

## Validation

Verified in this change:

```bash
git diff --check
```

Declared by `package.json` — not verified in this change (no test or lint
scripts exist; no committed lockfile, so dependencies were not installed):

```bash
npm run build      # production build to dist/
npm run dev        # Vite dev server on http://0.0.0.0:3000
npm run preview    # serve built dist/ locally
```

## Estate Authority

All three references below live in the `orion-estate-audit` repo (sibling
estate repo, not in this checkout):

- Estate doctrine: `orion-estate-audit/AGENTS.md`
- Repo contract:
  `orion-estate-audit/architecture/repo_contracts/dan_mercede_personal_brand_repo_contract_20260318.md`
- Canonical home + placement: `orion-estate-audit/estate_home_registry.yaml`,
  logical_id `personal-brand-dan-mercede-danielmercede-com`
