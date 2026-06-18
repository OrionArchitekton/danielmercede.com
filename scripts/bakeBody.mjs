// Build-time body-bake (W1) — browserless, no-React, no-SSR.
//
// Why this exists: danielmercede.com is a client-rendered React SPA. The built
// <body> is an empty `<div id="root"></div>`. Non-Google answer engines
// (ChatGPT/GPTBot, Perplexity, Claude) fetch raw HTML and do NOT execute JS, so
// they see nothing — the entire biography is invisible to the exact crawlers the
// brand targets. This postbuild step bakes the real heading + standfirst + body
// prose (from the shared bioContent.mjs, the same copy the React component
// renders) into the served `dist/index.html` so the crawlable <body> carries
// real text, not just an empty mount node.
//
// No framework, no SSR runtime, no React executed in Node. The committed source
// is untouched; this runs against Vite's build output only. Because
// `ReactDOM.createRoot(root).render(...)` replaces the children of #root on
// hydration, the baked content is what no-JS crawlers read and what JS users see
// replaced by the live app — standard prerender-for-crawlers, zero visual change
// for human visitors.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { HEADING, STANDFIRST, BODY_BLOCKS } from '../bioContent.mjs';

// Resolve relative to this script (scripts/), not the caller's cwd, so the bake
// works regardless of where `npm run build` is invoked from. (Node 22+.)
const DIST_INDEX = path.resolve(import.meta.dirname, '..', 'dist', 'index.html');

// Minimal HTML-escape for text interpolated into the baked markup.
// Exported so tests/bodyBake.test.mjs can reuse the exact escape (no drift).
export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderBlocks() {
  return BODY_BLOCKS.map((block) => {
    if (block.type === 'quote') {
      return (
        '<div class="my-12 pl-6 border-l-2 border-neutral-200 md:pl-8 md:-ml-8 py-2">' +
        '<blockquote class="text-xl md:text-2xl font-serif text-neutral-700 italic leading-relaxed">' +
        esc(block.text) +
        '</blockquote></div>'
      );
    }
    if (block.type === 'p') {
      return `<p class="mb-8">${esc(block.text)}</p>`;
    }
    // Fail the build on an unknown block type rather than silently degrading a
    // new type to a paragraph (keeps the bake and Biography.tsx render honest).
    throw new Error(
      `Unknown BODY_BLOCKS type '${block.type}' in bioContent.mjs — add a renderer in scripts/bakeBody.mjs (and components/Biography.tsx).`,
    );
  }).join('\n        ');
}

// The baked markup mirrors components/Biography.tsx structure/classes closely
// enough to read identically pre-hydration, with no fade-in opacity:0 (so no-JS
// crawlers and readers always see content, never a blank animated-out body).
// Exported so tests/bodyBake.test.mjs can assert render parity without invoking
// the file-writing build step.
export function renderBakedBody() {
  return (
    '<div class="min-h-screen w-full flex justify-center py-12 px-6 sm:px-8 md:py-24">' +
    '<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white focus:rounded">Skip to content</a>' +
    '<main id="main-content" tabindex="-1" class="w-full max-w-2xl mx-auto outline-none">' +
    '<article class="max-w-none">' +
    '<header class="mb-12 md:mb-20 flex flex-col gap-6">' +
    `<h1 class="text-2xl font-medium tracking-wide text-neutral-900 font-sans">${esc(HEADING)}</h1>` +
    `<p class="font-serif text-lg text-neutral-600 italic leading-relaxed pl-1">${esc(STANDFIRST)}</p>` +
    '</header>' +
    '<div class="prose prose-lg prose-neutral max-w-none font-serif text-neutral-800 leading-relaxed md:leading-loose">\n        ' +
    renderBlocks() +
    '\n      </div>' +
    '</article></main></div>'
  );
}

async function main() {
  const html = await fs.readFile(DIST_INDEX, 'utf8').catch(() => {
    throw new Error(`${DIST_INDEX} not found — run \`vite build\` first.`);
  });

  // Match the empty mount tolerantly: minifiers/formatters may alter quote style
  // or whitespace (e.g. id=root, single quotes, a space between the tags).
  const rootRegex = /<div\s+id=["']?root["']?>\s*<\/div>/i;
  if (!rootRegex.test(html)) {
    throw new Error(
      'Empty root mount (<div id="root"></div>) not found in dist/index.html — body-bake anchor missing (did the React mount node change?).',
    );
  }

  const baked = `<div id="root">${renderBakedBody()}</div>`;
  const out = html.replace(rootRegex, baked);

  // Guard: prove the served body now carries real crawlable content.
  const bodyMatch = out.match(/<body[^>]*>/i);
  if (!bodyMatch) {
    throw new Error('<body> tag not found in dist/index.html — cannot verify the bake.');
  }
  const body = out.slice(bodyMatch.index);
  const h1Count = (body.match(/<h1[ >]/g) || []).length;
  const pCount = (body.match(/<p[ >]/g) || []).length;
  if (h1Count < 1 || pCount < 1) {
    throw new Error(
      `body-bake produced empty body (h1=${h1Count}, p=${pCount}) — refusing to write.`,
    );
  }

  await fs.writeFile(DIST_INDEX, out, 'utf8');
  console.log(
    `[bakeBody] baked crawlable <body> into dist/index.html ` +
      `(h1=${h1Count}, p=${pCount}, blocks=${BODY_BLOCKS.length}).`,
  );
}

// Run the bake only when executed directly (`node scripts/bakeBody.mjs` in the
// build step), not when imported by tests/bodyBake.test.mjs.
// Compare case-insensitively: on some platforms (notably Windows) the cwd-based
// argv[1] path and the import.meta.url path can differ only in casing (e.g. drive
// letters), which would make isMain false and silently skip the bake.
const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]).toLowerCase() === fileURLToPath(import.meta.url).toLowerCase();
if (isMain) {
  main().catch((err) => {
    console.error('[bakeBody] FAILED:', err instanceof Error ? err.message : err);
    process.exit(1);
  });
}
