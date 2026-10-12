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
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const HELPER = "e2e/helpers/category-menu.ts";

const HAND_BUILT = [
  { pattern: /\^=\s*\\?["']?rail-category-/g, what: "a prefix selector on rail-category-" },
  { pattern: /\/\^rail-category-\//g, what: "a pattern that strips rail-category-" },
  { pattern: /\.replace\(\s*["'`]rail-category-["'`]/g, what: "a replace of rail-category-" },
];

export type Source = { file: string; text: string };

/** The text with its comments blanked (lines kept): a comment that names a selector is not one. */
export function codeOf(text: string): string {
  const blank = (s: string) => s.replace(/[^\n]/g, " ");
  return text
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/(^|[^:"'`\\])(\/\/.*)$/gm, (_m, lead: string, rest: string) => lead + blank(rest));
}

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
  const out: Source[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name.endsWith(".ts")) {
        out.push({
          file: relative(root, full).split("\\").join("/"),
          text: readFileSync(full, "utf8"),
        });
      }
    }
  };
  walk(join(root, "e2e"));
  return out;
}

export function check(sources: Source[]): string[] {
  return sources.flatMap((source) => readersIn(source.file, source.text));
}
