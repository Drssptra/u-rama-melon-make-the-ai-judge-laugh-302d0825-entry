// Make the AI Judge Laugh — make.fun bounty entry (program/v1), v2 resubmission.
//
// The joke is assembled from parts, validated against the 1–200 character
// single-line gate, then written byte-exact to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt) with no trailing newline. Stdout gets the
// same text plus a newline. Node 22, stdlib only, no network, deterministic.

import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const PARTS: readonly string[] = [
  "The office plant has outlasted ",
  "three managers and two layoff rounds ",
  "— it's the only employee here ",
  "with job security.",
];

const GATE = { min: 1, max: 200 } as const;

function assemble(parts: readonly string[]): string {
  return parts.reduce((acc, part) => acc + part, "");
}

function gateCheck(text: string): void {
  const chars = [...text];
  const problems: string[] = [];
  if (chars.length < GATE.min || chars.length > GATE.max) {
    problems.push(`length ${chars.length} outside ${GATE.min}-${GATE.max}`);
  }
  if (/[\r\n]/.test(text)) problems.push("must be a single line");
  if (text !== text.trim()) problems.push("leading/trailing whitespace");
  if (problems.length > 0) {
    throw new Error(`entry failed gate: ${problems.join("; ")}`);
  }
}

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv !== undefined && fromEnv !== "" ? fromEnv : "/output";
}

async function main(): Promise<void> {
  const entry = assemble(PARTS);
  gateCheck(entry);

  const dir = outputDir();
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, "entry.txt"), entry, {
    encoding: "utf8",
    flag: "w",
  });

  process.stdout.write(entry + "\n");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
