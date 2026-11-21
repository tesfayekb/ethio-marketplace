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
 * `DROP TABLE` takes the table's policies with it (cursor bundle 1: coverage_plans' open rule
 * stood in the reader after its table was dropped).
 */

const STATEMENT =
  /\b(CREATE|DROP)\s+POLICY\s+(?:IF\s+EXISTS\s+)?("[^"]+"|[A-Za-z_][A-Za-z0-9_]*)\s+ON\s+([A-Za-z0-9_."]+)[^;]*;/gi;

/** A policy standing after the migrations: the table and name it stands under, its statement, its file. */
type Standing = { table: string; policy: string; text: string; file: string };

/** `DROP TABLE [IF EXISTS] a, b` — a table's policies go with it. */
const DROP_TABLE =
  /\bDROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?([A-Za-z0-9_."]+(?:\s*,\s*[A-Za-z0-9_."]+)*)/gi;

/** The policies standing after `files`, in apply order (file names, then each file's statements). */
function standingPolicies(files: Array<{ file: string; sql: string }>): Standing[] {
  const standing = new Map<string, Standing>();
  for (const { file, sql } of [...files].sort((a, b) => a.file.localeCompare(b.file))) {
    const code = sqlCodeOf(sql);
    const events: Array<{ at: number; apply: () => void }> = [];
    for (const match of code.matchAll(STATEMENT))
      events.push({
        at: match.index ?? 0,
        apply: () => {
          const policy = (match[2] ?? "").replace(/"/g, "");
          const table = (match[3] ?? "").replace(/"/g, "").replace(/^public\./, "");
          // A name or a table with a placeholder in it (`public.%I`) is built by dynamic SQL: not read here.
          if (policy === "" || table === "" || table.endsWith(".")) return;
          const key = `${table} ${policy}`;
          if ((match[1] ?? "").toUpperCase() === "DROP") standing.delete(key);
          else standing.set(key, { table, policy, text: match[0], file });
        },
      });
    for (const match of code.matchAll(DROP_TABLE))
      events.push({
        at: match.index ?? 0,
        apply: () => {
          const dropped = (match[1] ?? "").split(",").map((name) =>
            name
              .replace(/"/g, "")
              .trim()
              .replace(/^public\./, ""),
          );
          for (const [key, policy] of standing)
            if (dropped.includes(policy.table)) standing.delete(key);
        },
      });
    for (const event of events.sort((a, b) => a.at - b.at)) event.apply();
  }
  return [...standing.values()];
}

/** The policies standing after `files`, by name: the text of each (one per table that holds the name). */
export function policiesOf(files: Array<{ file: string; sql: string }>): Map<string, string[]> {
  const byName = new Map<string, string[]>();
  for (const { policy, text } of standingPolicies(files))
    byName.set(policy, [...(byName.get(policy) ?? []), text]);
  return byName;
}

/**
 * Cursor bundle 1, item 6 (INC-1166, second half) — THE READ RULES THAT ADMIT EVERYONE. An open rule is
 * a standing policy whose text holds `USING (true)` or `WITH CHECK (true)`; each is a decision somebody
 * writes down in scripts/doors/open-rules.txt (open-rules.ts judges). Read through the same standing
 * reader as `policiesOf`, never a pattern of its own over the files.
 */
const OPEN_TEXT = /\b(?:USING|WITH\s+CHECK)\s*\(\s*true\s*\)/i;
const POLICY_COMMAND = /\bFOR\s+(ALL|SELECT|INSERT|UPDATE|DELETE)\b/i;
const POLICY_ROLES = /\bTO\s+([A-Za-z_"][A-Za-z0-9_", ]*?)\s*(?:USING|WITH\s+CHECK|;)/i;
const POLICY_ANY = /\bCREATE\s+POLICY\b[^;]*;/gi;
const POLICY_ONE =
  /^(CREATE)\s+POLICY\s+(?:IF\s+EXISTS\s+)?("[^"]+"|[A-Za-z_][A-Za-z0-9_]*)\s+ON\s+([A-Za-z0-9_."]+)[^;]*;$/i;

export type OpenRule = {
  table: string;
  policy: string;
  /** SELECT, INSERT, UPDATE, DELETE or ALL (the policy's FOR; ALL when it names none). */
  command: string;
  /** The roles the policy names, lower-case, sorted, comma-joined (`public` when it names none). */
  roles: string;
  file: string;
};
/** A policy statement the reader cannot name (built by dynamic SQL) whose text is open. */
export type ComputedOpenRule = { file: string; line: number; text: string };

function rolesOf(text: string): string {
  const named = POLICY_ROLES.exec(text)?.[1];
  if (named === undefined) return "public";
  return [
    ...new Set(
      named
        .split(",")
        .map((role) => role.replace(/"/g, "").trim().toLowerCase())
        .filter((role) => role !== ""),
    ),
  ]
    .sort()
    .join(",");
}

/** The open rules standing after `files`, and the open policy statements built by dynamic SQL. */
export function openRulesOf(files: Array<{ file: string; sql: string }>): {
  standing: OpenRule[];
  computed: ComputedOpenRule[];
} {
  const standing = standingPolicies(files)
    .filter((policy) => OPEN_TEXT.test(policy.text))
    .map(({ table, policy, text, file }) => ({
      table,
      policy,
      command: (POLICY_COMMAND.exec(text)?.[1] ?? "ALL").toUpperCase(),
      roles: rolesOf(text),
      file,
    }))
    .sort((a, b) => `${a.table} ${a.policy}`.localeCompare(`${b.table} ${b.policy}`));
  const computed: ComputedOpenRule[] = [];
  for (const { file, sql } of [...files].sort((a, b) => a.file.localeCompare(b.file))) {
    const code = sqlCodeOf(sql);
    for (const match of code.matchAll(POLICY_ANY)) {
      const named = POLICY_ONE.exec(match[0]);
      const table = (named?.[3] ?? "").replace(/"/g, "");
      if (named !== null && table !== "" && !table.endsWith(".")) continue;
      if (!OPEN_TEXT.test(match[0])) continue;
      computed.push({
        file,
        line: code.slice(0, match.index ?? 0).split("\n").length,
        text: match[0].replace(/\s+/g, " "),
      });
    }
  }
  return { standing, computed };
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

/** The repository's migration files, as the policy readers take them. */
function migrationFiles(root: string): Array<{ file: string; sql: string }> {
  return walkFiles([join(root, "supabase", "migrations")], { ext: ["sql"] }).map((file) => ({
    file: file.slice(root.length + 1),
    sql: readFileSync(file, "utf8"),
  }));
}

/** The repository's open rules, read once per root (once.ts). */
export function declaredOpenRules(
  root: string,
  options?: OnceOptions,
): ReturnType<typeof openRulesOf> {
  return readOnce("open-rules", root, () => openRulesOf(migrationFiles(root)), options);
}

/** The repository's migrations, read once per root (once.ts). */
export function declaredPolicyCalls(
  root: string,
  options?: OnceOptions,
): (policy: string, fn: string) => boolean {
  return readOnce("policies", root, () => policyCallsOf(migrationFiles(root)), options);
}
