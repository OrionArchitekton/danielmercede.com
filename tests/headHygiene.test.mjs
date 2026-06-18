import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const html = readFileSync(path.resolve(import.meta.dirname, '..', 'index.html'), 'utf8');

test('root head declares indexable robots policy', () => {
  const robots = html.match(/<meta name="robots" content="([^"]+)" \/>/);
  assert.ok(robots, 'robots meta must be present');
  assert.equal(robots[1], 'index, follow, max-image-preview:large');
  assert.doesNotMatch(robots[1], /noindex/i);
});
