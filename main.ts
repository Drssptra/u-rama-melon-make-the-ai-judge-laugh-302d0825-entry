// Make the AI Judge Laugh — make.fun bounty entry (program/v1).
//
// A single original joke about office life: one line, well under the
// 200-character gate. The program writes the exact entry text to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt) with no trailing
// newline, and prints it to stdout with a newline. Node 22, stdlib only,
// no network access, same output on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Our printer only jams when a deadline is five minutes away — it can smell fear.";

const MAX_CHARS = 200;

if (
  ENTRY.length === 0 ||
  ENTRY.length > MAX_CHARS ||
  ENTRY.trim().length === 0 ||
  ENTRY.includes("\n")
) {
  throw new Error(
    `entry must be one line of 1-${MAX_CHARS} characters, got ${ENTRY.length}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

console.log(ENTRY);
