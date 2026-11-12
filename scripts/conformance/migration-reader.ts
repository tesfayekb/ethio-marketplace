import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { flaggedPattern } from "../lib/pattern";
import { walkFiles } from "./kit";

/**
 * THE MIGRATION READER (P-2 (c) c2b, ruling 1 Q9) — the one reading of
 * supabase/migrations/ the SQL censuses share (door answers, proof readers,
 * SQL writes, the status map, the listing designation, the door catalogue).
 *
 * It reads every migration in file order (SQL comments blanked, `DO` blocks —
 * the proofs — removed: they are append-only history, never a function's
 * body) and keeps each function's LAST declaration, forgetting a function a
 * later `DROP FUNCTION` removes without redeclaring. It also answers every
 * function or table whose last event is a drop (`droppedObjects`, for the
 * public-surface judge, DEC-357) and every string literal that spans a line
 * break (`spanningLiterals`, for the migration guard, INC-1089).
 *
 * What it reads of computed text (INC-1083): a `DO` block's `format('CREATE …
 * FUNCTION public.<fn>(…', …)` — or `public.%I(` with the name as its first
 * literal argument — is that function's last event, `computed: true` with an
 * empty body (the body is built at run time; a census reads nothing it cannot
 * see). An `EXECUTE` of a string built any other way names no function: the
 * one record of those is `COMPUTED_BY_HAND` below, each name with the file
 * from which its body is built and why. A census over the answer judges the
 * files as written, minus the computed bodies.
 */

/**
 * The functions whose live body is built by an `EXECUTE` no template names,
 * each with the stamp of the file that builds it and why. A name the files no
 * longer declare, or whose last event the reader reads (a declaration or a
 * template after `since`), is a stale line (`staleComputedByHand`, MGR-6).
 */
export const COMPUTED_BY_HAND: Readonly<Record<string, { since: string; reason: string }>> = {
  attr_import_plan: {
    since: "20261017093039",
    reason:
      "assembled from the chunks stored in migration_text_parts and run as EXECUTE v_text (20261017093039); four earlier files patch the live text through pg_get_functiondef",
  },
};

/**
 * A string literal on one line: a doubled quote is a quote, and a backslash
 * pair is one character pair (an `E'\n'` escape, or a standard literal's `\`).
 */
const ONE_LINE_LITERAL = /'(?:[^'\\\n]|''|\\[^\n])*'/;
const EVERY_ONE_LINE_LITERAL = flaggedPattern("g")`${ONE_LINE_LITERAL}`;
const COMMENT_OR_LITERAL = flaggedPattern(
  "g",
)`\\/\\*[\\s\\S]*?\\*\\/|--[^\\n]*|${ONE_LINE_LITERAL}`;

/** SQL text with every `--` and `/* … *\/` comment blanked (positions kept). */
export function sqlCodeOf(text: string): string {
  const blank = (s: string) => s.replace(/[^\n]/g, " ");
  return text.replace(COMMENT_OR_LITERAL, (match) =>
    match.startsWith("'") ? match : blank(match),
  );
}

/**
 * Every line holding a quote that opens or closes a string literal spanning a
 * line break (INC-1089): with comments and one-line literals blanked, any `'`
 * left is one. Dollar-quoted text is read as code, so a `DO` block's literals
 * are judged too.
 */
export function spanningLiterals(sql: string): Array<{ line: number }> {
  const blank = (s: string) => s.replace(/[^\n]/g, " ");
  const code = sqlCodeOf(sql).replace(EVERY_ONE_LINE_LITERAL, blank);
  const lines = new Set<number>();
  for (const match of code.matchAll(/'/g))
    lines.add(code.slice(0, match.index ?? 0).split("\n").length);
  return [...lines].map((line) => ({ line }));
}

const DO_BLOCK = /\bDO\s+(\$[A-Za-z_][A-Za-z0-9_]*\$|\$\$)[\s\S]*?\1\s*;/gi;
const CREATE_FUNCTION =
  /\bCREATE\s+(?:OR\s+REPLACE\s+)?FUNCTION\s+(?:public\.)?"?([A-Za-z_][A-Za-z0-9_]*)"?\s*\(/gi;
const DROP_FUNCTION =
  /\bDROP\s+FUNCTION\s+(?:IF\s+EXISTS\s+)?(?:public\.)?"?([A-Za-z_][A-Za-z0-9_]*)"?\b/gi;
const BODY_OPENER = /\bAS\s+(\$[A-Za-z_][A-Za-z0-9_]*\$|\$\$)/iy;
const CREATE_TABLE =
  /\bCREATE\s+(?:UNLOGGED\s+)?TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:public\.)?"?([A-Za-z_][A-Za-z0-9_]*)"?(?![.\w])/gi;
const DROP_TABLE = /\bDROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?([^;]*?)(?:\s+(?:CASCADE|RESTRICT))?\s*;/gi;
const TABLE_NAME = /^(?:public\.)?"?([A-Za-z_][A-Za-z0-9_]*)"?$/i;

/** SQL text with comments blanked and every `DO $tag$ … $tag$;` block blanked (positions kept). */
export function functionCodeOf(sql: string): string {
  const blank = (s: string) => s.replace(/[^\n]/g, " ");
  return sqlCodeOf(sql).replace(DO_BLOCK, blank);
}

export type Declaration = {
  fn: string;
  /** From `CREATE` to the body's opener: the arguments, RETURNS, LANGUAGE, volatility, SECURITY, SET. */
  header: string;
  body: string;
  line: number;
  offset: number;
  /** The 1-based line the body's text starts on (the CREATE's line when there is no body). */
  bodyLine: number;
};

/** Every function declaration of a file (comments and DO blocks removed), in order, with its body. */
export function declarationsOf(sql: string): Declaration[] {
  const code = functionCodeOf(sql);
  const found: Declaration[] = [];
  for (const match of code.matchAll(CREATE_FUNCTION)) {
    const start = match.index ?? 0;
    const fn = (match[1] ?? "").toLowerCase();
    // The argument list: from its `(` to the matching `)`.
    let depth = 0;
    let at = start + match[0].length - 1;
    for (; at < code.length; at += 1) {
      const ch = code[at];
      if (ch === "(") depth += 1;
      else if (ch === ")") {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    // The body: the first `AS $tag$` after the arguments, to its closing tag.
    let body = "";
    let bodyFrom = start;
    let header = code.slice(start, at + 1);
    for (let probe = at + 1; probe < code.length; probe += 1) {
      BODY_OPENER.lastIndex = probe;
      const opener = BODY_OPENER.exec(code);
      if (opener !== null) {
        const tag = opener[1] ?? "$$";
        const from = probe + opener[0].length;
        const to = code.indexOf(tag, from);
        header = code.slice(start, probe);
        body = code.slice(from, to === -1 ? code.length : to);
        bodyFrom = from;
        break;
      }
      if (code[probe] === ";") break;
    }
    const line = code.slice(0, start).split("\n").length;
    const bodyLine = code.slice(0, bodyFrom).split("\n").length;
    found.push({ fn, header, body, line, offset: start, bodyLine });
  }
  return found;
}

export type ObjectKind = "function" | "table";
export type Drop = { name: string; kind: ObjectKind; offset: number };

/** Every function and table a file drops (outside DO blocks), with the offset of the DROP. */
export function dropsOf(sql: string): Drop[] {
  const code = functionCodeOf(sql);
  const drops: Drop[] = Array.from(code.matchAll(DROP_FUNCTION), (match) => ({
    name: (match[1] ?? "").toLowerCase(),
    kind: "function",
    offset: match.index ?? 0,
  }));
  for (const match of code.matchAll(DROP_TABLE))
    for (const name of (match[1] ?? "").split(",")) {
      const table = TABLE_NAME.exec(name.trim());
      if (table?.[1])
        drops.push({ name: table[1].toLowerCase(), kind: "table", offset: match.index ?? 0 });
    }
  return drops.sort((a, b) => a.offset - b.offset);
}

/** Every table a file creates (outside DO blocks), with the offset of the CREATE. */
export function tableCreatesOf(sql: string): Array<{ name: string; offset: number }> {
  return Array.from(functionCodeOf(sql).matchAll(CREATE_TABLE), (match) => ({
    name: (match[1] ?? "").toLowerCase(),
    offset: match.index ?? 0,
  }));
}

/** The migrations' file paths, in file order. */
function migrationFiles(root: string): string[] {
  return walkFiles([join(root, "supabase", "migrations")], { ext: ["sql"] }).sort();
}

/**
 * Every public function or table name whose last event across the migrations
 * (file order) is a drop: no CREATE of the same kind after it, and no live
 * object of the other kind by that name (DEC-357).
 */
export function droppedObjects(root: string): Set<string> {
  const state = new Map<string, "live" | "dropped">();
  for (const file of migrationFiles(root)) {
    const sql = readFileSync(file, "utf8");
    const events: Array<{ key: string; offset: number; to: "live" | "dropped" }> = [
      ...declarationsOf(sql).map((d) => ({
        key: `function:${d.fn}`,
        offset: d.offset,
        to: "live" as const,
      })),
      ...tableCreatesOf(sql).map((t) => ({
        key: `table:${t.name}`,
        offset: t.offset,
        to: "live" as const,
      })),
      ...dropsOf(sql).map((d) => ({
        key: `${d.kind}:${d.name}`,
        offset: d.offset,
        to: "dropped" as const,
      })),
    ];
    events.sort((a, b) => a.offset - b.offset).forEach((event) => state.set(event.key, event.to));
  }
  const name = (key: string) => key.slice(key.indexOf(":") + 1);
  const live = new Set([...state].filter(([, to]) => to === "live").map(([key]) => name(key)));
  return new Set(
    [...state]
      .filter(([key, to]) => to === "dropped" && !live.has(name(key)))
      .map(([key]) => name(key)),
  );
}

/** `computed`: the body is built at run time (a template or COMPUTED_BY_HAND); `body` is then "". */
export type LastDeclaration = Declaration & { file: string; computed?: boolean };

const FORMAT_OPENER = /\bformat\s*\(\s*'/gi;
const TEMPLATE_CREATE =
  /^\s*CREATE\s+(?:OR\s+REPLACE\s+)?FUNCTION\s+(?:public\.)?(?:"?([A-Za-z_][A-Za-z0-9_]*)"?|(%I))\s*\(/i;
const FIRST_LITERAL_ARGUMENT = /^\s*,\s*'([A-Za-z_][A-Za-z0-9_]*)'/;

/** The text of the literal opening at `from` (its `''` read as `'`), and the offset after it. */
function literalAt(code: string, from: number): { text: string; end: number } {
  let text = "";
  let at = from;
  while (at < code.length) {
    if (code[at] === "'") {
      if (code[at + 1] !== "'") return { text, end: at + 1 };
      text += "'";
      at += 2;
    } else {
      text += code[at];
      at += 1;
    }
  }
  return { text, end: at };
}

/** Every function a file's `DO` blocks declare through a `format()` template, with its offset. */
export function templateDeclarationsOf(sql: string): Array<{ fn: string; offset: number }> {
  const code = sqlCodeOf(sql);
  const found: Array<{ fn: string; offset: number }> = [];
  for (const block of code.matchAll(DO_BLOCK)) {
    const text = block[0];
    for (const opener of text.matchAll(FORMAT_OPENER)) {
      const start = (opener.index ?? 0) + opener[0].length;
      const { text: template, end } = literalAt(text, start);
      const create = TEMPLATE_CREATE.exec(template);
      if (create === null) continue;
      const fn = create[1] ?? FIRST_LITERAL_ARGUMENT.exec(text.slice(end))?.[1];
      if (fn !== undefined)
        found.push({ fn: fn.toLowerCase(), offset: (block.index ?? 0) + start });
    }
  }
  return found;
}

/** Each function's last event across the migrations (file order): a declaration or a template. */
function readLastEvents(root: string): Map<string, LastDeclaration> {
  const last = new Map<string, LastDeclaration>();
  for (const file of migrationFiles(root)) {
    const rel = file
      .slice(root.length + 1)
      .split("\\")
      .join("/");
    const sql = readFileSync(file, "utf8");
    const events: Array<{ offset: number; apply: () => void }> = [];
    for (const declaration of declarationsOf(sql)) {
      events.push({
        offset: declaration.offset,
        apply: () => last.set(declaration.fn, { ...declaration, file: rel }),
      });
    }
    for (const { fn, offset } of templateDeclarationsOf(sql)) {
      const line = sql.slice(0, offset).split("\n").length;
      events.push({
        offset,
        apply: () =>
          last.set(fn, {
            fn,
            header: "",
            body: "",
            line,
            offset,
            bodyLine: line,
            file: rel,
            computed: true,
          }),
      });
    }
    for (const drop of dropsOf(sql)) {
      if (drop.kind === "function")
        events.push({ offset: drop.offset, apply: () => last.delete(drop.name) });
    }
    events.sort((a, b) => a.offset - b.offset).forEach((event) => event.apply());
  }
  return last;
}

const stampOf = (file: string) => (file.split("/").pop() ?? "").slice(0, 14);

/** Whether the reader's last event for a hand-listed name is the one the list stands for. */
function standsFor(event: LastDeclaration, since: string): boolean {
  return event.computed !== true && stampOf(event.file) < since;
}

/**
 * Each function's last declaration across the migrations (file order), minus the
 * dropped; a function whose body is built at run time is `computed` with an
 * empty body.
 */
export function lastDeclarations(
  root: string,
  byHand: Readonly<Record<string, { since: string }>> = COMPUTED_BY_HAND,
): Map<string, LastDeclaration> {
  const last = readLastEvents(root);
  for (const [fn, { since }] of Object.entries(byHand)) {
    const event = last.get(fn);
    if (event !== undefined && standsFor(event, since))
      last.set(fn, { ...event, header: "", body: "", computed: true });
  }
  return last;
}

/** COMPUTED_BY_HAND's stale lines: a name no file declares, or whose last event the reader reads. */
export function staleComputedByHand(
  root: string,
  byHand: Readonly<Record<string, { since: string }>> = COMPUTED_BY_HAND,
): string[] {
  const last = readLastEvents(root);
  const stale: string[] = [];
  for (const [fn, { since }] of Object.entries(byHand)) {
    const event = last.get(fn);
    if (event === undefined) stale.push(`${fn}: no migration declares it`);
    else if (!standsFor(event, since))
      stale.push(`${fn}: its last event (${event.file}) is one the reader reads`);
  }
  return stale;
}

/** `--spanning <file>…`: one line per spanning literal, for scripts/check-migrations.sh. */
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [mode, ...files] = process.argv.slice(2);
  if (mode !== "--spanning" || files.length === 0)
    throw new Error("migration reader: use --spanning <file>…");
  for (const file of files)
    for (const { line } of spanningLiterals(readFileSync(file, "utf8")))
      console.log(
        `${file}:${line}: a string literal spans a line break — write chr(10) or E'\\n' (INC-1089)`,
      );
}
