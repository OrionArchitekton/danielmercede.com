# Spec — Build-time body-bake for danielmercede.com (W1)

## Problem

danielmercede.com is a client-rendered React + Vite SPA. The built and served
`dist/index.html` `<body>` is an empty `<div id="root"></div>` (h1=0, p=0, no
`<noscript>`). Non-Google answer engines — ChatGPT/GPTBot, Perplexity/PerplexityBot,
Claude/ClaudeBot — fetch raw HTML and do **not** execute JavaScript, so they see no
biography content at all. The entire long-form bio is invisible to the exact crawlers
the brand targets.

## Decision (from the approved MAP)

No-SSR, **build-time body-bake** only. Extend the build to emit a static
`dist/index.html` whose `<body>` carries real crawlable content (h1 + standfirst +
prose). NOT a framework/SSR migration. The committed source stays as-is; the bake
runs against Vite's build output. Vercel builds on deploy (no committed `dist/`), so a
source change is sufficient to fix the live site.

## Scope

- New `bioContent.mjs`: single source of truth for the heading, standfirst, and
  ordered body blocks (paragraphs + pull-quotes).
- `components/Biography.tsx` renders from `bioContent.mjs` (no duplicated copy).
- New `scripts/bakeBody.mjs`: postbuild, browserless, no-React emitter that replaces
  `<div id="root"></div>` in `dist/index.html` with `<div id="root">…real body…</div>`.
- `package.json` `build` = `vite build && node scripts/bakeBody.mjs`.

## Constraints

- No SSR runtime, no framework, no new runtime dependency. The emitter is plain Node
  (`.mjs`), run after `vite build`.
- No React executed in Node.
- Zero visual change for human (JS-enabled) visitors: `ReactDOM.createRoot(root)
  .render(...)` clears `#root`'s children on mount, so the baked content is what no-JS
  crawlers read and is replaced by the live app for JS users.
- The baked copy must not drift from the React render — both consume `bioContent.mjs`.
- `dist/` is gitignored; the bake regenerates it on every build (no artifact committed).

## Acceptance criteria

1. After `npm run build`, `dist/index.html` `<body>` contains **at least one `<h1>`**
   and **multiple `<p>`** with real biography text (not just `<div id="root">`).
   The h1 text is "Daniel Mercede"; the standfirst and all body paragraphs from
   `bioContent.mjs` appear verbatim in the served HTML.
2. The empty `#root` mount node is preserved (React still hydrates; JS users see the
   normal animated render with no duplication).
3. The baked body content is byte-equivalent in copy to what `Biography.tsx` renders
   (shared `bioContent.mjs`; no second copy of the prose).
4. The bake fails the build (non-zero exit) if the `#root` anchor is missing or if the
   produced body has zero `<h1>`/`<p>` — it never writes an empty body.
5. No SSR/framework dependency added; `package.json` dependencies unchanged except the
   build script wiring; no committed lockfile.

## Verification

```bash
npm install            # no lockfile staged
npm run build          # vite build && node scripts/bakeBody.mjs
# Count real body content in the DEPLOY artifact:
node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); \
  const b=h.slice(h.indexOf('<body')); \
  console.log('h1',(b.match(/<h1[ >]/g)||[]).length,'p',(b.match(/<p[ >]/g)||[]).length);"
# Expect h1 >= 1 and p >= 1 (real text).
```
