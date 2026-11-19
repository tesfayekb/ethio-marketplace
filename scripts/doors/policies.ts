import { readFileSync } from "node:fs";
import { join } from "node:path";

import { walkFiles } from "../conformance/kit";
import { sqlCodeOf } from "../conformance/migration-reader";
import { pattern } from "../lib/pattern";
import { readOnce, type OnceOptions } from "./once";

/**
 * F1-7a (ruling 1, decision 7; INC-1212) — THE POLICIES A HELPER'S REASON NAMES. A `helper` line
 * whose reason is `policy <name>, <name>, …` keeps its browser grant for those row policies: each
 * named policy must stand after the migrations and its text must call the function, or the judge
 * fires `helper-reason-unproven`.
 *
 * Static, in both modes: the migrations read in apply order (file names, then each file's
 * statements in their own order, comments blanked) — `CREATE POLICY <name> ON <table> …;` sets the
 * policy's text, `DROP POLICY [IF EXISTS] <name> ON <table>;` removes it. No migration of the tree
 * alters a policy (`ALTER POLICY`); a policy built by dynamic SQL (`EXECUTE format(…)`) is not read.
 */

const STATEMENT =
  /\b(CREATE|DROP)\s+POLICY\s+(?:IF\s+EXISTS\s+)?("[^"]+"|[A-Za-z_][A-Za-z0-9_]*)\s+ON\s+([A-Za-z0-9_."]+)[^;]*;/gi;

/** The policies standing after `files`, by name: the text of each (one per table that holds the name). */
export function policiesOf(files: Array<{ file: string; sql: string }>): Map<string, string[]> {
  const standing = new Map<string, string>();
  for (const { sql } of [...files].sort((a, b) => a.file.localeCompare(b.file)))
    for (const match of sqlCodeOf(sql).matchAll(STATEMENT)) {
      const name = (match[2] ?? "").replace(/"/g, "");
      const table = (match[3] ?? "").replace(/"/g, "").replace(/^public\./, "");
      const key = `${table} ${name}`;
      if ((match[1] ?? "").toUpperCase() === "DROP") standing.delete(key);
      else standing.set(key, match[0]);
    }
  const byName = new Map<string, string[]>();
  for (const [key, text] of standing) {
    const name = key.slice(key.indexOf(" ") + 1);
    byName.set(name, [...(byName.get(name) ?? []), text]);
  }
  return byName;
}

/** Whether a standing policy named `policy` calls `fn` in its text. */
export function policyCallsOf(
  files: Array<{ file: string; sql: string }>,
): (policy: string, fn: string) => boolean {
  const byName = policiesOf(files);
  return (policy, fn) => {
    const called = pattern`\\b${fn}\\s*\\(`;
    return (byName.get(policy) ?? []).some((text) => called.test(text));
  };
}

/** The repository's migrations, read once per root (once.ts). */
export function declaredPolicyCalls(
  root: string,
  options?: OnceOptions,
): (policy: string, fn: string) => boolean {
  return readOnce(
    "policies",
    root,
    () =>
      policyCallsOf(
        walkFiles([join(root, "supabase", "migrations")], { ext: ["sql"] }).map((file) => ({
          file: file.slice(root.length + 1),
          sql: readFileSync(file, "utf8"),
        })),
      ),
    options,
  );
}
