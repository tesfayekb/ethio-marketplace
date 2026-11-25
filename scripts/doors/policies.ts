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
 * policy's text, `DROP POLICY [IF EXISTS] <name> ON <table>;` removes it, and (cursor-bundle-7a
 * Part 3, ruling 1 decision 7) `ALTER POLICY <name> ON <table> [TO …] [USING (…)] [WITH CHECK (…)];`
 * replaces the clauses it names and keeps the rest, `ALTER POLICY … RENAME TO <new>;` renames. The
 * last statement wins. An `ALTER POLICY` the reader cannot take apart, or that names a policy not
 * standing, throws: a policy is never judged by a text its last statement has replaced. A policy
 * built by dynamic SQL (`EXECUTE format(…)`) is not read. `DROP TABLE` takes the table's policies
 * with it (cursor bundle 1: coverage_plans' open rule stood in the reader after its table was
 * dropped).
 */

const STATEMENT =
  /\b(CREATE|DROP|ALTER)\s+POLICY\s+(?:IF\s+EXISTS\s+)?("[^"]+"|[A-Za-z_][A-Za-z0-9_]*)\s+ON\s+([A-Za-z0-9_."]+)[^;]*;/gi;

/** Every `ALTER POLICY` the code holds, to prove each one was read by STATEMENT. */
const ALTER_ANY = /\bALTER\s+POLICY\b/gi;

/** The index just past the parenthesised group that opens at `open`, or -1 when it never closes. */
function groupEnd(text: string, open: number): number {
  let depth = 0;
  for (let at = open; at < text.length; at++) {
    const ch = text.charAt(at);
    if (ch === "'") {
      // A string literal: skip to its closing quote (`''` is an escaped quote).
      at++;
      while (at < text.length && !(text.charAt(at) === "'" && text.charAt(at + 1) !== "'"))
        at += text.charAt(at) === "'" ? 2 : 1;
    } else if (ch === "(") depth++;
    else if (ch === ")" && --depth === 0) return at + 1;
  }
  return -1;
}

/** A policy statement taken apart: everything before its clauses, then USING and WITH CHECK. */
type Clauses = { head: string; using: string | null; check: string | null };

/** `head [USING (…)] [WITH CHECK (…)]` (an optional closing `;`), or null when it does not read so. */
function clausesOf(text: string): Clauses | null {
  const first = /\b(?:USING|WITH\s+CHECK)\s*\(/i.exec(text);
  const start = first?.index ?? text.replace(/;\s*$/, "").length;
  const out: Clauses = { head: text.slice(0, start).trimEnd(), using: null, check: null };
  let rest = text.slice(start);
  for (;;) {
    const clause = /^\s*(USING|WITH\s+CHECK)\s*\(/i.exec(rest);
    if (clause === null) break;
    const open = clause[0].length - 1;
    const end = groupEnd(rest, open);
    if (end < 0) return null;
    const body = rest.slice(open + 1, end - 1).trim();
    if (clause[1]?.toUpperCase() === "USING") {
      if (out.using !== null) return null;
      out.using = body;
    } else {
      if (out.check !== null) return null;
      out.check = body;
    }
    rest = rest.slice(end);
  }
  return /^\s*;?\s*$/.test(rest) ? out : null;
}

/** The statement a set of clauses stands for. */
function textOf({ head, using, check }: Clauses): string {
  return `${head}${using === null ? "" : ` USING (${using})`}${check === null ? "" : ` WITH CHECK (${check})`};`;
}

/**
 * The policy after an `ALTER POLICY` whose text after `ON <table>` is `rest`: the clauses it names
 * replace the standing ones, the others stay; null when `rest` is not `[TO roles] [USING (…)]
 * [WITH CHECK (…)]`. (`RENAME TO` is read by the caller.)
 */
function alteredText(standing: string, rest: string): string | null {
  const old = clausesOf(standing);
  const named = /^\s*(?:TO\s+([A-Za-z_"][A-Za-z0-9_", ]*?)\s*(?=USING\b|WITH\b|;|$))?/i.exec(rest);
  if (old === null || named === null) return null;
  const clauses = clausesOf(rest.slice(named[0].length));
  if (clauses === null || clauses.head !== "") return null;
  if (named[1] === undefined && clauses.using === null && clauses.check === null) return null;
  const head =
    named[1] === undefined
      ? old.head
      : `${old.head.replace(/\s+TO\s+[A-Za-z_"][A-Za-z0-9_", ]*$/i, "")} TO ${named[1].trim()}`;
  return textOf({
    head,
    using: clauses.using ?? old.using,
    check: clauses.check ?? old.check,
  });
}

/** A policy standing after the migrations: the table and name it stands under, its statement, its file. */
type Standing = { table: string; policy: string; text: string; file: string };

/** `DROP TABLE [IF EXISTS] a, b` — a table's policies go with it. */
const DROP_TABLE =
  /\bDROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?([A-Za-z0-9_."]+(?:\s*,\s*[A-Za-z0-9_."]+)*)/gi;

/** Apply one `ALTER POLICY` statement to the standing map; throws when it cannot be read or applied. */
function alterOne(standing: Map<string, Standing>, key: string, statement: string, what: string) {
  const prior = standing.get(key);
  if (prior === undefined) throw new Error(`${what}: no standing policy of that name to alter`);
  const after = /^ALTER\s+POLICY\s+(?:"[^"]+"|[A-Za-z_][A-Za-z0-9_]*)\s+ON\s+[A-Za-z0-9_."]+/i.exec(
    statement,
  );
  const rest = statement.slice(after?.[0].length ?? 0).replace(/;\s*$/, "");
  const rename = /^\s*RENAME\s+TO\s+("[^"]+"|[A-Za-z_][A-Za-z0-9_]*)\s*$/i.exec(rest);
  if (rename !== null) {
    const policy = (rename[1] ?? "").replace(/"/g, "");
    standing.delete(key);
    standing.set(`${prior.table} ${policy}`, {
      ...prior,
      policy,
      text: prior.text.replace(
        /^(CREATE\s+POLICY\s+)(?:"[^"]+"|[A-Za-z_][A-Za-z0-9_]*)/i,
        `$1${rename[1] ?? ""}`,
      ),
    });
    return;
  }
  const text = after === null ? null : alteredText(prior.text, rest);
  if (text === null) throw new Error(`${what}: the statement cannot be read`);
  standing.set(key, { ...prior, text });
}

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
          const verb = (match[1] ?? "").toUpperCase();
          if (verb === "DROP") standing.delete(key);
          else if (verb === "CREATE") standing.set(key, { table, policy, text: match[0], file });
          else alterOne(standing, key, match[0], `${file}: ALTER POLICY ${policy} ON ${table}`);
        },
      });
    // Every `ALTER POLICY` is a statement STATEMENT read; one it did not (no closing `;`) fails.
    const read = new Set(
      [...code.matchAll(STATEMENT)]
        .filter((match) => (match[1] ?? "").toUpperCase() === "ALTER")
        .map((match) => match.index),
    );
    for (const alter of code.matchAll(ALTER_ANY)) {
      if (read.has(alter.index)) continue;
      // Built by dynamic SQL (`EXECUTE format('ALTER POLICY %I ON public.%I …')`): not read, as a CREATE is not.
      const head = code.slice(alter.index ?? 0).split(/[;\n]/)[0] ?? "";
      if (/%[IsL]/.test(head)) continue;
      throw new Error(`${file}: an ALTER POLICY statement the policy reader cannot take apart`);
    }
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
const POLICY_ANY = /\b(?:CREATE|ALTER)\s+POLICY\b[^;]*;/gi;
const POLICY_ONE =
  /^(CREATE|ALTER)\s+POLICY\s+(?:IF\s+EXISTS\s+)?("[^"]+"|[A-Za-z_][A-Za-z0-9_]*)\s+ON\s+([A-Za-z0-9_."]+)[^;]*;$/i;

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

/**
 * Cursor bundle 4 (INC-1242) — THE ROLE RULES. A role rule is a standing policy whose text asks who the caller is
 * by a role helper: `has_permission(`, `has_permission_scoped(` or `is_super_admin(`. Staff reads and writes go
 * through doors (the gate's caller check, deactivation test and country reach); a role rule on a table lets a
 * holder past all three, so none stands on a public table and each other one is a line of
 * scripts/doors/staff-rules.txt (staff-rules.ts judges). Read through the same standing reader as `policiesOf`.
 */
const ROLE_CALL = /\b(?:has_permission|has_permission_scoped|is_super_admin)\s*\(/i;

export type RoleRule = {
  /** The table as the migrations name it: bare for schema public, `schema.table` otherwise. */
  table: string;
  policy: string;
  /** SELECT, INSERT, UPDATE, DELETE or ALL (the policy's FOR; ALL when it names none). */
  command: string;
  /** The roles the policy names, lower-case, sorted, comma-joined (`public` when it names none). */
  roles: string;
  file: string;
};

/** The role rules standing after `files`, by table then name. */
export function roleRulesOf(files: Array<{ file: string; sql: string }>): RoleRule[] {
  return standingPolicies(files)
    .filter((policy) => ROLE_CALL.test(policy.text))
    .map(({ table, policy, text, file }) => ({
      table,
      policy,
      command: (POLICY_COMMAND.exec(text)?.[1] ?? "ALL").toUpperCase(),
      roles: rolesOf(text),
      file,
    }))
    .sort((a, b) => `${a.table} ${a.policy}`.localeCompare(`${b.table} ${b.policy}`));
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

/** The repository's role rules, read once per root (once.ts). */
export function declaredRoleRules(root: string, options?: OnceOptions): RoleRule[] {
  return readOnce("role-rules", root, () => roleRulesOf(migrationFiles(root)), options);
}

/** The repository's migrations, read once per root (once.ts). */
export function declaredPolicyCalls(
  root: string,
  options?: OnceOptions,
): (policy: string, fn: string) => boolean {
  return readOnce("policies", root, () => policyCallsOf(migrationFiles(root)), options);
}
