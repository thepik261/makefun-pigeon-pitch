// Pigeon Pitch, One Line — make.fun bounty entry.
// Writes one line, in English: the elevator pitch a city pigeon gives
// to investors for its startup, to /output/entry.txt. The sealed gate
// requires 1-200 UTF-8 characters, not only whitespace; pure Node
// stdlib, deterministic, no network.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

const LINE =
  "We're disrupting urban logistics: 40 million pigeons, zero salaries, and a same-day delivery network your drones can only dream of. Seed round: breadcrumbs.";

if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(`LINE must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("LINE must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("LINE must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
try {
  chmodSync(outPath, 0o644);
} catch {
  // best effort
}
