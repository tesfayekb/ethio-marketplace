// INC-536 — a test id is assigned once.
//
// A test id is the record of a test: the flake ledger, the incident ledger and
// the docs name tests by it, so an id on two tests makes a record ambiguous
// (G41). This check reads every `it(` / `test(` title in src/, e2e/ and
// scripts/ that opens with an id ("PW-58 …", "C-1: …", "A-1+A-2: …") and
// refuses:
// - an id that appears in two files;
// - an id on two tests of one file, unless the file declares it a case group
//   below (several cases of one rule, each titled with the same id).
// Titles that open with a record number (DEC-, INC-, REQ-, ACT-, MIG-) are not
// test ids. Run by the unit tests (scripts/test-ids.test.ts).

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, posix, sep } from "node:path";

/** Declared case groups: one rule proven by several cases under one id, in one file. */
export const CASE_GROUPS: Record<string, string> = {
  "PW-61": "e2e/post-wizard-resets.spec.ts",
  "PW-110": "src/features/posting/step-where.test.tsx",
  "PW-162": "e2e/post-wizard-pricing.spec.ts",
};

const RECORD_PREFIXES = new Set(["DEC", "INC", "REQ", "ACT", "MIG"]);
const ROOTS = ["src", "e2e", "scripts"];
const SKIP_DIRS = new Set(["node_modules", "fixtures", "dist", ".output"]);
/** This check's own unit tests hold planted titles as text. */
const SKIP_FILES = new Set(["scripts/test-ids.test.ts"]);
const TITLE =
  /\b(?:it|test)(?:\.(?:skip|only|fixme|fail))?\(\s*["'`]((?:[A-Z][A-Za-z0-9]*-\d+[a-z]?)(?:\+[A-Z][A-Za-z0-9]*-\d+[a-z]?)*)(?=[\s:"'`)]|$)/g;

export interface IdUse {
  id: string;
  file: string;
  line: number;
}

/** Every test id used in one file's text. */
export function idsIn(file: string, text: string): IdUse[] {
  const uses: IdUse[] = [];
  const lines = text.split("\n");
  lines.forEach((content, index) => {
    for (const match of content.matchAll(TITLE)) {
      for (const id of match[1]!.split("+")) {
        if (RECORD_PREFIXES.has(id.split("-")[0]!)) continue;
        uses.push({ id, file, line: index + 1 });
      }
    }
  });
  return uses;
}

/** The ids used more than once, each with every place it is used. */
export function collisions(uses: IdUse[]): Map<string, IdUse[]> {
  const byId = new Map<string, IdUse[]>();
  for (const use of uses) byId.set(use.id, [...(byId.get(use.id) ?? []), use]);
  const out = new Map<string, IdUse[]>();
  for (const [id, places] of byId) {
    if (places.length < 2) continue;
    const files = new Set(places.map((p) => p.file));
    if (files.size === 1 && CASE_GROUPS[id] === places[0]!.file) continue;
    out.set(id, places);
  }
  return out;
}

function walk(dir: string, out: string[]): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(ts|tsx)$/.test(entry)) out.push(full);
  }
  return out;
}

/** Every test id in the repository at `root`. */
export function repositoryIds(root: string): IdUse[] {
  const uses: IdUse[] = [];
  for (const base of ROOTS) {
    for (const full of walk(join(root, base), [])) {
      const file = full
        .slice(root.length + 1)
        .split(sep)
        .join(posix.sep);
      if (SKIP_FILES.has(file)) continue;
      uses.push(...idsIn(file, readFileSync(full, "utf8")));
    }
  }
  return uses;
}
