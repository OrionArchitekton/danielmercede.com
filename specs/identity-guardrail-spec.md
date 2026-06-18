# Spec — Spoke-side identity guardrail for danielmercede.com (R12 / O7)

## Problem

danielmercede.com is a **spoke** in the Dan Mercede brand hub-spoke identity
graph. The hub (danmercede.com) owns the single canonical Person entity at
`https://www.danmercede.com/#person`. Spokes must reference that hub Person by
`@id` and must **not** declare their own local `Person` node — a competing
Person node fragments the entity graph and dilutes the hub's authority for
answer engines and search.

This rule was enforced **hub-side only** (O7 hub-side guard). The spokes are
correct live (each references the hub `#person` and declares no local Person),
but nothing on the spoke side guarded against regression: a future edit that
adds a `"@type": "Person"` node to this spoke would ship green.

## Decision (from round-2 MAP R12)

Add the **spoke-side** guard as a test, gating via the merged R8 CI
(`npm test --if-present`). No JSON-LD change — the spoke is already correct; this
codifies and enforces the existing contract so a regression fails CI.

## Scope

- New `tests/identityGuard.test.mjs`: reads `index.html` (the sole JSON-LD
  source; `scripts/bakeBody.mjs` rewrites only the `<body>` mount, never the
  `<head>` JSON-LD), parses every `application/ld+json` block, and asserts the
  contract below.
- `package.json` `test` script broadened to `node --test tests/*.test.mjs` so the
  new test runs alongside the existing bake test under the same CI step.

## Constraints

- Deterministic, self-contained, no network — reads the committed `index.html`.
- No new dependency; plain `node:test` (matches `tests/bodyBake.test.mjs`).
- A bare `@id` reference to the hub `#person` is **allowed**; a self-defined
  `Person` node (anchored to this spoke's domain, unscoped, or any `@type:Person`
  other than the hub's canonical `@id`) is the **violation**.

## Acceptance criteria

1. `index.html` ships at least one `<script type="application/ld+json">` block.
2. The JSON-LD references the hub Person by `"@id":"https://www.danmercede.com/#person"`
   (the hub backlink is present).
3. The JSON-LD declares **no local Person node**: no JSON-LD object with
   `"@type": "Person"` (string or in an `@type` array) anchored to this spoke's
   own domain or otherwise self-defining a Person — the hub `#person` reference
   by `@id` is the only Person linkage permitted.
4. The guard trips on a regression (negative self-checks): a synthetic local
   Person node anchored to this spoke (with `@id`, in a `@type` array, or
   unscoped) is detected as a violation, while a bare hub `@id` reference and
   non-Person nodes are not.

## Verification

```bash
npm install   # no lockfile staged
npm test      # runs tests/*.test.mjs — identityGuard + bodyBake
# Expect: identity guardrail tests PASS against current index.html.
```
