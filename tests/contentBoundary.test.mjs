// Round-2 R10 — content-boundary guard for the identity-only surface.
//
// Per AGENTS.md/README this repo is "context, not promotion — explicitly NOT a
// portfolio, product site, or marketing surface." It is a long-form BIOGRAPHY.
// Product NAMES (Cosmocrat, Orion Intelligence Agency, ReplyBy, Apex Trading
// Systems) are referenced for context and are allowed. What is NOT allowed is
// promotional / booking / CTA copy leaking into the baked biography body — the
// danielmercede-info CTA-leak finding class, ported to this repo's body-bake
// adapter (scripts/bakeBody.mjs renderBakedBody()).
//
// This asserts against renderBakedBody() — importable without a build, the same
// idiom tests/bodyBake.test.mjs uses — so the guard runs in plain `node --test`
// with no network and no extra deps. A NEGATIVE CONTROL proves the detector
// actually fires (the guard cannot silently degrade into a no-op).
//
// Distinct from tests/identityGuard.test.mjs (the JSON-LD Person-node guard) —
// this guards the BODY PROSE for promotional/CTA verbs, not the structured data.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderBakedBody } from '../scripts/bakeBody.mjs';

// Forbidden CTA / booking / promotional needles. These are booking/marketing
// VERBS and phrases that signal promotion — NOT product names (which AGENTS.md
// allows as contextual references). All needles were checked against the
// biography prose (bioContent.mjs HEADING/STANDFIRST/BODY_BLOCKS) and none
// legitimately appear, so nothing was dropped.
const FORBIDDEN = [
  'book a',
  '/book',
  'readiness scan',
  'buy now',
  'sign up',
  'get started',
  'schedule a call',
  'contact us',
  'hire me',
  'book a call',
  'request a demo',
  'subscribe',
  'pricing',
  'free trial',
];

// Pure detector: which forbidden needles leak into the given lowercased text.
function leakedNeedles(lowerText) {
  return FORBIDDEN.filter((needle) => lowerText.includes(needle));
}

test('baked biography body carries no promotional / CTA copy', () => {
  const baked = renderBakedBody().toLowerCase();
  const leaked = leakedNeedles(baked);
  assert.deepEqual(
    leaked,
    [],
    `identity-only content boundary tripped — baked body leaked promotional/CTA copy: ${leaked.join(', ')}`,
  );
});

// Negative control: prove the detector actually fires. If the baked body ever
// contained one of these needles, leakedNeedles MUST flag it — this runs against
// a synthetic string only, never the real baked body, so the guard above cannot
// silently degrade into a no-op that always passes.
test('detector flags a synthetic promotional needle (negative control)', () => {
  const synthetic = 'biography prose ... book a call with me today ...'.toLowerCase();
  const leaked = leakedNeedles(synthetic);
  assert.ok(
    leaked.includes('book a call'),
    'detector failed to flag a synthetic "book a call" CTA — the guard is inert',
  );
  // Clean control: prose with no CTA must NOT be flagged (no false positives).
  assert.deepEqual(
    leakedNeedles('a purely biographical sentence about systems and people.'),
    [],
    'detector wrongly flagged clean biographical prose',
  );
});
