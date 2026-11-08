import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

import { codeOf, walkFiles } from "./kit";

/**
 * P-1b (CF-LEVEL-1, D290, D295) — ONE LEVEL RESOLVER, NO BAKED-IN TIER. The
 * ad's levels are rows of `listing_packages` (kind `level`), their perks per
 * main category and market rows of `level_overrides`, and the effective perks
 * of a level for an ad are only ever the SQL `level_perks_for(level, category,
 * market)`. The browser never reads those two tables to pick a perk, never
 * calls the resolver outside the one console reader, and never names a level
 * by a literal word: `'regular' | 'featured' | 'premium'` are rows staff may
 * rename, end or add to, not a type. The census, over `src/`, `e2e/helpers/`
 * and `scripts/` (specs are the harness's own reads, excepted by rule; tests
 * beside a file are not consumers):
 *
 *  - `reader`: a `listing_packages` or `level_overrides` table read
 *    (`.from("…")`) or a `level_perks_for` call anywhere but the one admin
 *    reader (`src/features/admin-monetisation/monetisation-service.ts`, which
 *    lists the console's rows through `admin_list_monetisation` and picks none);
 *  - `tier`: a quoted `featured` or `premium` anywhere, or a quoted `regular`
 *    on a line that also names `tier` (the session's `regular` tier is another
 *    concern and not read). A key of the catalog (`tier.premium`) is not a
 *    quoted word.
 *
 * DEC-331 (P-2 (c) c2a) — the tier-word fold: the P-1 tier consumers (the
 * feed's ranking, the card, the flag, the admin listings' tier verbs, the
 * style page, the bench, the ad-page helper) read the level rows, so the
 * allowlist (listing-levels-allowlist.txt, `key | reason | until`) holds no
 * `tier:` line; the column keeps its name `tier`. The generated client types
 * (src/integrations/supabase/**) name every table and are not a consumer.
 *
 * The level rows' homes: the console's one reader, and the levels store's
 * table read (use-level-rows.ts, DEC-351 §8), which reads the enabled rows'
 * names, order and base look for a screen that has no card answer — never an
 * override, never the resolver.
 */

export const LEVEL_READER_HOMES: readonly string[] = [
  "src/features/admin-monetisation/monetisation-service.ts",
  "src/features/levels/use-level-rows.ts",
];

export type LevelFinding = {
  file: string;
  line: number;
  kind: "reader" | "tier";
  what: string;
};

export const READ_FORMS = [
  /\.from\(\s*["'`]listing_packages["'`]\s*\)/,
  /\.from\(\s*["'`]level_overrides["'`]\s*\)/,
  /\blevel_perks_for\b/,
] as const;

/** A quoted level word: `"featured"`, `'premium'`, `` `featured` ``. */
const PAID_WORD = /["'`](?:featured|premium)["'`]/;
/** `"regular"` counts only on a line that also names a tier (the word itself, not `SessionTier`). */
const REGULAR_WORD = /["'`]regular["'`]/;
const NAMES_TIER = /\btier\b/i;

export function levelFindingsIn(root: string, file: string): LevelFinding[] {
  const rel = relative(root, file).split("\\").join("/");
  const code = codeOf(readFileSync(file, "utf8"));
  const lines = code.split("\n");
  const findings: LevelFinding[] = [];
  lines.forEach((text, index) => {
    const line = index + 1;
    if (!LEVEL_READER_HOMES.includes(rel) && READ_FORMS.some((form) => form.test(text))) {
      findings.push({
        file: rel,
        line,
        kind: "reader",
        what: "reads the level tables or calls level_perks_for outside the one reader",
      });
    }
    if (PAID_WORD.test(text) || (REGULAR_WORD.test(text) && NAMES_TIER.test(text))) {
      findings.push({
        file: rel,
        line,
        kind: "tier",
        what: "names a level by a literal tier word; levels are rows, not a type",
      });
    }
  });
  return findings;
}

export function levelFindings(root: string): LevelFinding[] {
  const roots = [join(root, "src"), join(root, "e2e", "helpers"), join(root, "scripts")].filter(
    (dir) => existsSync(dir),
  );
  const files = walkFiles(roots, {
    ext: ["ts", "tsx", "mjs"],
    skipTests: true,
    skip: /scripts[\\/]conformance[\\/]listing-levels|src[\\/]integrations[\\/]supabase[\\/]/,
  });
  return files.flatMap((file) => levelFindingsIn(root, file));
}

export function findingKey(finding: LevelFinding): string {
  return `${finding.kind}:${finding.file}`;
}
