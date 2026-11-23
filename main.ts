// news-image-20261122 — "The World in One Day"
// One image summing up Sunday 22 November 2026, copied to the
// grader's output directory. Node 22, standard library only.
// No network, no randomness, no clocks: the output bytes are exactly
// the bytes of entry.png beside this file, so repeated runs are
// byte-identical by construction.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(here, 'entry.png');
const target = join(outDir, 'entry.png');

// Fail fast on a corrupt or empty source: entry.png must be a real PNG.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const bytes = readFileSync(source);
if (bytes.length === 0 || !bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error('entry.png is not a valid PNG');
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Integrity check: the copy must be byte-identical to the source,
// otherwise fail loudly instead of shipping a corrupt image.
const a = readFileSync(source);
const b = readFileSync(target);
if (!a.equals(b)) {
  throw new Error('entry.png copy mismatch');
}
