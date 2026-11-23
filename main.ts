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

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Integrity check: the copy must be byte-identical to the source,
// otherwise fail loudly instead of shipping a corrupt image.
const a = readFileSync(source);
const b = readFileSync(target);
if (!a.equals(b)) {
  throw new Error('entry.png copy mismatch');
}
