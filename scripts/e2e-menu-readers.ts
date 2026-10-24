/**
 * INC-170's class at its third occurrence (INC-170, INC-170b, INC-561; bundle 11
 * turn C3) — every e2e reader of the public category menu's rows goes through
 * e2e/helpers/category-menu.ts, which keeps other tests' scratch roots out of a
 * reader that judges the catalogue. This check reads every .ts file under e2e/
 * (the helper excepted) and refuses a row selector or slug read built by hand:
 * a prefix selector on `rail-category-` (`^="rail-category-`), a pattern that
 * strips it (`/^rail-category-/`) or a replace of it. An exact testid
 * (`rail-category-${slug}`, `rail-category-all`) is not a prefix and is
 * allowed. Run by the unit tests (scripts/e2e-menu-readers.test.ts).
 *
 * Foundations turn 1 (DEC-244): the walker and the comment blanking are the
 * conformance kit's (scripts/conformance/kit.ts); no behaviour change.
 */
import { readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { codeOf, walkFiles } from "./conformance/kit";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const HELPER = "e2e/helpers/category-menu.ts";

const HAND_BUILT = [
  { pattern: /\^=\s*\\?["']?rail-category-/g, what: "a prefix selector on rail-category-" },
  { pattern: /\/\^rail-category-\//g, what: "a pattern that strips rail-category-" },
  { pattern: /\.replace\(\s*["'`]rail-category-["'`]/g, what: "a replace of rail-category-" },
];

export type Source = { file: string; text: string };

/** The text with its comments blanked (lines kept): a comment that names a selector is not one. */
export { codeOf };

/** Every hand-built menu row reader in one file: "<file>:<line> <what>". */
export function readersIn(file: string, text: string): string[] {
  if (file === HELPER) return [];
  const code = codeOf(text);
  const out: string[] = [];
  for (const { pattern, what } of HAND_BUILT) {
    for (const m of code.matchAll(pattern)) {
      out.push(`${file}:${code.slice(0, m.index).split("\n").length} ${what}`);
    }
  }
  return out.sort();
}

export function readE2e(root = ROOT): Source[] {
  return walkFiles([join(root, "e2e")], { ext: ["ts"] }).map((full) => ({
    file: relative(root, full).split("\\").join("/"),
    text: readFileSync(full, "utf8"),
  }));
}

export function check(sources: Source[]): string[] {
  return sources.flatMap((source) => readersIn(source.file, source.text));
}
