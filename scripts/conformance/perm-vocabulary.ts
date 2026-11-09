import { readFileSync } from "node:fs";
import { join } from "node:path";

import { walkFiles } from "./kit";
import { sqlCodeOf } from "./migration-reader";

/**
 * P-1 (CF-PERM-1) — THE PERMISSION MATRIX'S VOCABULARY IS COMPLETE. The roles
 * console draws every resource and action the database seeds through
 * `admin.roles.perm.resource.<name>` / `admin.roles.perm.action.<name>`
 * (src/features/admin/roles/permission-matrix.tsx); a missing key falls back
 * to the raw English value behind a dev-console warning, so a migration that
 * seeds a resource or an action without its keys leaks untranslated text.
 *
 * The census reads every `INSERT INTO public.resources …;` and
 * `INSERT INTO public.permissions …;` statement in supabase/migrations/ (SQL
 * comments blanked): a resource is a `'snake_case'` literal in a resources
 * statement; an action is a `'snake_case'` literal in a permissions statement
 * that is not a resource name (the statements filter by `r.name = '…'`).
 * Display names and descriptions carry capitals or spaces and never match.
 * Each name needs its key in BOTH en-admin.ts and am-admin.ts (DEC-258: the
 * matrix is an admin-layer screen).
 *
 * P-2 (c) c2b — a `DELETE FROM public.resources …;` statement (top level or
 * inside a DO block) retires the names it quotes: the files are read in apply
 * order and each file's statements in their own order, so a retired resource
 * leaves the vocabulary, and its `admin.roles.perm.resource.<name>` key still
 * in either locale file is a finding (a retired key left behind). A permission
 * row has no name of its own (its action word is shared by every resource), so
 * only a resource's retirement is read.
 */

export type VocabularyKind = "resource" | "action";
export type VocabularyFinding = {
  kind: VocabularyKind;
  name: string;
  /** The migration file (root-relative) that seeds it, or that retires it. */
  file: string;
  /** The locale files missing the key. */
  missing: string[];
  /** For a retired resource, the locale files that still declare its key. */
  lingering?: string[];
};

const LOCALES = ["src/i18n/locales/en-admin.ts", "src/i18n/locales/am-admin.ts"] as const;

/** Every statement of a file that opens with `opener`, with its offset. */
function statementsAt(sql: string, opener: RegExp): { at: number; text: string }[] {
  const code = sqlCodeOf(sql);
  const found: { at: number; text: string }[] = [];
  for (const match of code.matchAll(opener)) {
    const start = match.index ?? 0;
    const end = code.indexOf(";", start);
    found.push({ at: start, text: code.slice(start, end === -1 ? code.length : end) });
  }
  return found;
}

/** The tables whose INSERT statements the vocabulary reads, each by its own literal opener. */
const INSERT_OPENER = {
  resources: /insert\s+into\s+public\.resources\b/gi,
  permissions: /insert\s+into\s+public\.permissions\b/gi,
} as const;
export type VocabularyTable = keyof typeof INSERT_OPENER;
const DELETE_RESOURCES = /delete\s+from\s+public\.resources\b/gi;

/** Every `INSERT INTO public.<table> …;` statement of a file, as text. */
export function insertStatements(sql: string, table: VocabularyTable): string[] {
  return statementsAt(sql, INSERT_OPENER[table]).map(({ text }) => text);
}

/** Every `DELETE FROM public.resources …;` statement of a file, as text. */
export function resourceDeletes(sql: string): string[] {
  return statementsAt(sql, DELETE_RESOURCES).map(({ text }) => text);
}

/** The `'snake_case'` literals of a statement, in order, once each. */
export function snakeLiterals(statement: string): string[] {
  const names: string[] = [];
  for (const match of statement.matchAll(/'([a-z][a-z0-9_]*)'/g)) {
    const name = match[1] ?? "";
    if (name !== "" && !names.includes(name)) names.push(name);
  }
  return names;
}

export type SeededVocabulary = {
  resources: Map<string, string>;
  actions: Map<string, string>;
  /** Resources a later statement retired, each with the file that did. */
  retired: Map<string, string>;
};

/** Every resource and action the migrations seed, each with the first file that does. */
export function seededVocabulary(root: string): SeededVocabulary {
  const resources = new Map<string, string>();
  const actions = new Map<string, string>();
  const retired = new Map<string, string>();
  const everResource = new Set<string>();
  const files = walkFiles([join(root, "supabase", "migrations")], { ext: ["sql"] });
  const texts = files
    .map((file) => ({
      rel: file
        .slice(root.length + 1)
        .split("\\")
        .join("/"),
      sql: readFileSync(file, "utf8"),
    }))
    .sort((a, b) => a.rel.localeCompare(b.rel));
  for (const { rel, sql } of texts) {
    const steps = [
      ...statementsAt(sql, INSERT_OPENER.resources).map((step) => ({ ...step, retires: false })),
      ...statementsAt(sql, DELETE_RESOURCES).map((step) => ({ ...step, retires: true })),
    ].sort((a, b) => a.at - b.at);
    for (const { text, retires } of steps) {
      for (const name of snakeLiterals(text)) {
        if (retires) {
          if (resources.delete(name)) retired.set(name, rel);
        } else {
          everResource.add(name);
          retired.delete(name);
          if (!resources.has(name)) resources.set(name, rel);
        }
      }
    }
  }
  for (const { rel, sql } of texts) {
    for (const statement of insertStatements(sql, "permissions")) {
      for (const name of snakeLiterals(statement)) {
        if (everResource.has(name)) continue;
        if (!actions.has(name)) actions.set(name, rel);
      }
    }
  }
  return { resources, actions, retired };
}

/** Whether a locale file declares the key (as a JSON-quoted property). */
function declares(text: string, key: string): boolean {
  return text.includes(`"${key}":`);
}

/** Every seeded name whose key is missing from a locale file. */
export function vocabularyFindings(root: string): VocabularyFinding[] {
  const seeded = seededVocabulary(root);
  const locales = LOCALES.map((rel) => ({ rel, text: readFileSync(join(root, rel), "utf8") }));
  const findings: VocabularyFinding[] = [];
  const judge = (kind: VocabularyKind, names: Map<string, string>) => {
    for (const [name, file] of names) {
      const key = `admin.roles.perm.${kind}.${name}`;
      const missing = locales.filter(({ text }) => !declares(text, key)).map(({ rel }) => rel);
      if (missing.length > 0) findings.push({ kind, name, file, missing });
    }
  };
  judge("resource", seeded.resources);
  judge("action", seeded.actions);
  for (const [name, file] of seeded.retired) {
    const key = `admin.roles.perm.resource.${name}`;
    const lingering = locales.filter(({ text }) => declares(text, key)).map(({ rel }) => rel);
    if (lingering.length > 0)
      findings.push({ kind: "resource", name, file, missing: [], lingering });
  }
  return findings.sort((a, b) => findingKey(a).localeCompare(findingKey(b)));
}

/** The allowlist key of a finding. */
export function findingKey(finding: VocabularyFinding): string {
  return `${finding.lingering === undefined ? "" : "retired:"}${finding.kind}:${finding.name}`;
}
