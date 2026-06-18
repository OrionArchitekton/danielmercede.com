// Spoke-side identity guardrail (round-2 R12 / O7). The hub-spoke identity rule:
// a spoke must reference the hub Person entity by @id
// (https://www.danmercede.com/#person) and must NOT declare its OWN local Person
// node (a `"@type": "Person"` object anchored to this spoke's own domain). The
// hub owns the single Person entity; spokes only point at it. This was enforced
// HUB-side only — this is the SPOKE-side guard so a future regression (a
// competing Person node added to this spoke) fails CI instead of silently
// fragmenting the identity graph and diluting the hub's entity authority.
//
// Source of truth: index.html. The JSON-LD lives in a static
// `<script type="application/ld+json">` in <head>; scripts/bakeBody.mjs only
// rewrites the <body> #root mount, never the JSON-LD, so the committed
// index.html is exactly what is served to crawlers. Deterministic, no network,
// no extra deps — plain node:test. Run via `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const HUB_PERSON_ID = 'https://www.danmercede.com/#person';
// This spoke's own domain. A Person node anchored here (or with no @id at all,
// i.e. an unscoped/self-implied Person on this page) is the violation; a bare
// @id *reference* to the hub #person is allowed.
const SPOKE_HOST = 'danielmercede.com';

const INDEX_HTML = path.resolve(import.meta.dirname, '..', 'index.html');

// Extract every <script type="application/ld+json"> payload from the HTML.
function extractJsonLdBlocks(html) {
  const re =
    /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const blocks = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    blocks.push(m[1].trim());
  }
  return blocks;
}

// Flatten a parsed JSON-LD document into a flat list of node objects, descending
// through @graph and arrays so a Person nested anywhere is still inspected.
function collectNodes(value, out = []) {
  if (Array.isArray(value)) {
    for (const v of value) collectNodes(v, out);
    return out;
  }
  if (value && typeof value === 'object') {
    out.push(value);
    if (Array.isArray(value['@graph'])) collectNodes(value['@graph'], out);
    return out;
  }
  return out;
}

// Does a node declare @type "Person" (string or inside an @type array)?
function isPersonNode(node) {
  const t = node['@type'];
  if (typeof t === 'string') return t === 'Person';
  if (Array.isArray(t)) return t.includes('Person');
  return false;
}

// Is a Person node a LOCAL self-definition (the violation) rather than a bare
// reference to the hub? A node anchored to the hub #person @id is the hub entity
// itself (allowed, though spokes don't normally restate it); anything else that
// declares @type Person — anchored to this spoke's domain, or unscoped, or
// carrying defining properties like name/url/sameAs — is a competing local
// Person node and is forbidden.
function isLocalPersonViolation(node) {
  if (!isPersonNode(node)) return false;
  const id = typeof node['@id'] === 'string' ? node['@id'] : '';
  if (id === HUB_PERSON_ID) return false; // the hub entity by its canonical @id — not a local node
  return true; // any other @type:Person on this spoke = self-defined local Person
}

// Walk the whole JSON-LD doc and report whether the hub #person @id is referenced
// anywhere (as a value of @id on a reference object, or mainEntity/about/etc.).
function referencesHubPerson(value) {
  if (Array.isArray(value)) return value.some(referencesHubPerson);
  if (value && typeof value === 'object') {
    if (value['@id'] === HUB_PERSON_ID) return true;
    return Object.values(value).some(referencesHubPerson);
  }
  return false;
}

const html = await fs.readFile(INDEX_HTML, 'utf8');
const blocks = extractJsonLdBlocks(html);
const docs = blocks.map((b, i) => {
  try {
    return JSON.parse(b);
  } catch (err) {
    throw new Error(
      `JSON-LD block #${i} in index.html is not valid JSON: ${err.message}`,
    );
  }
});
const nodes = docs.flatMap((d) => collectNodes(d));

test('index.html ships at least one JSON-LD block', () => {
  assert.ok(blocks.length >= 1, 'expected a <script type="application/ld+json"> block in index.html');
});

test('JSON-LD references the hub Person by @id (hub backlink present)', () => {
  assert.ok(
    docs.some(referencesHubPerson),
    `expected a reference to the hub Person "@id":"${HUB_PERSON_ID}" somewhere in the JSON-LD`,
  );
});

test('JSON-LD declares NO local Person node (no self-defined Person on this spoke)', () => {
  const violations = nodes.filter(isLocalPersonViolation);
  assert.equal(
    violations.length,
    0,
    `spoke must not declare its own Person node — found ${violations.length}: ` +
      JSON.stringify(violations.map((n) => ({ '@type': n['@type'], '@id': n['@id'] ?? '(no @id)' }))) +
      `. Reference the hub Person by "@id":"${HUB_PERSON_ID}" instead.`,
  );
});

// Negative self-checks: prove the guard actually trips on a regression, so a
// future weakening of the assertions can't pass silently. These exercise the
// detection logic against synthetic bad nodes (no file mutation, no network).
test('NEGATIVE: detector catches a local Person node anchored to this spoke', () => {
  const localPerson = {
    '@type': 'Person',
    '@id': `https://www.${SPOKE_HOST}/#person`,
    name: 'Daniel Mercede',
    url: `https://www.${SPOKE_HOST}/`,
  };
  assert.equal(isLocalPersonViolation(localPerson), true);
  // And the same Person inside a @type array form.
  assert.equal(
    isLocalPersonViolation({ '@type': ['Person', 'ProfilePage'], '@id': `https://www.${SPOKE_HOST}/#x` }),
    true,
  );
  // An unscoped self-implied Person (no @id) is also a local definition.
  assert.equal(isLocalPersonViolation({ '@type': 'Person', name: 'Daniel Mercede' }), true);
});

test('NEGATIVE: detector does NOT flag a bare @id reference to the hub Person', () => {
  // A reference object that merely points at the hub by @id is allowed.
  assert.equal(isLocalPersonViolation({ '@id': HUB_PERSON_ID }), false);
  // The hub Person entity restated by its canonical hub @id is not a *local* node.
  assert.equal(
    isLocalPersonViolation({ '@type': 'Person', '@id': HUB_PERSON_ID }),
    false,
  );
  // Non-Person nodes on this spoke (WebSite/ProfilePage) are fine.
  assert.equal(isLocalPersonViolation({ '@type': 'WebSite', '@id': `https://www.${SPOKE_HOST}/#website` }), false);
});
