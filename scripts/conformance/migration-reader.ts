import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

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
 * string literal that spans a line break (`spanningLiterals`, for the
 * migration guard, INC-1089).
 *
 * What it cannot see (INC-1083): text a statement computes at run time — a
 * `format(…)` or an `EXECUTE` of a built string — is a literal to it, never a
 * declaration or an insertion. A census over its answer judges the files as
 * written.
 */

/**
 * A string literal on one line: a doubled quote is a quote, and a backslash
 * pair is one character pair (an `E'\n'` escape, or a standard literal's `\`).
 */
const ONE_LINE_LITERAL = String.raw`'(?:[^'\\\n]|''|\\[^\n])*'`;
const COMMENT_OR_LITERAL = new RegExp(
  String.raw`\/\*[\s\S]*?\*\/|--[^\n]*|` + ONE_LINE_LITERAL,
  "g",
);

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
  const code = sqlCodeOf(sql).replace(new RegExp(ONE_LINE_LITERAL, "g"), blank);
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

/** Every function name a file drops, in order, with the offset of the DROP. */
export function dropsOf(sql: string): Array<{ fn: string; offset: number }> {
  const code = functionCodeOf(sql);
  return Array.from(code.matchAll(DROP_FUNCTION), (match) => ({
    fn: (match[1] ?? "").toLowerCase(),
    offset: match.index ?? 0,
  }));
}

export type LastDeclaration = Declaration & { file: string };

/** Each function's last declaration across the migrations (file order), minus the dropped. */
export function lastDeclarations(root: string): Map<string, LastDeclaration> {
  const last = new Map<string, LastDeclaration>();
  const files = walkFiles([join(root, "supabase", "migrations")], { ext: ["sql"] });
  for (const file of files) {
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
    for (const drop of dropsOf(sql)) {
      events.push({ offset: drop.offset, apply: () => last.delete(drop.fn) });
    }
    events.sort((a, b) => a.offset - b.offset).forEach((event) => event.apply());
  }
  return last;
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
