// Guard for the build-time body-bake (scripts/bakeBody.mjs). The bake injects
// crawler-visible <body> content into dist/index.html after `vite build`; this
// is the only automated protection against drift (a renderer dropped, a new
// BODY_BLOCKS type unhandled, a blank/heading-less body, the skip-link/landmark
// lost). Plain node:test — no extra deps. Run via `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderBakedBody, esc } from '../scripts/bakeBody.mjs';
import { HEADING, STANDFIRST, BODY_BLOCKS } from '../bioContent.mjs';

const baked = renderBakedBody();

// Independent escape oracle: assert esc() against hard-coded expected output so a
// regression in the production escape logic is caught here, even though the parity
// assertions below reuse esc() (which alone would track a broken implementation).
test('esc escapes &, <, > to entities', () => {
  assert.equal(esc('a & b'), 'a &amp; b');
  assert.equal(esc('<script>'), '&lt;script&gt;');
  assert.equal(esc('Tom & Jerry <3 > 2'), 'Tom &amp; Jerry &lt;3 &gt; 2');
  assert.equal(esc('plain text'), 'plain text');
});

test('baked body is a non-empty string', () => {
  assert.equal(typeof baked, 'string');
  assert.ok(baked.length > 0);
});

test('exactly one <h1> carrying the heading', () => {
  const h1s = baked.match(/<h1[ >]/g) || [];
  assert.equal(h1s.length, 1, `expected one <h1>, found ${h1s.length}`);
  assert.ok(baked.includes(esc(HEADING)), 'baked <h1> must contain HEADING');
});

test('standfirst is present', () => {
  assert.ok(baked.includes(esc(STANDFIRST)), 'baked body must contain STANDFIRST');
});

test('keeps the <main> landmark and skip link', () => {
  assert.match(baked, /<main id="main-content"/, 'baked body must keep the main landmark');
  assert.match(baked, /href="#main-content"/, 'baked body must keep the skip link');
});

test('every BODY_BLOCKS entry is rendered (no dropped/unhandled block)', () => {
  const pCount = (baked.match(/<p[ >]/g) || []).length;
  const pBlocks = BODY_BLOCKS.filter((b) => b.type === 'p').length;
  assert.ok(pCount >= pBlocks, `expected >= ${pBlocks} <p>, found ${pCount}`);
  for (const block of BODY_BLOCKS) {
    assert.ok(
      baked.includes(esc(block.text)),
      `baked body is missing a ${block.type} block: "${String(block.text).slice(0, 40)}…"`,
    );
  }
});
