import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

import { flaggedPattern } from "../lib/pattern";
import { doBlocksOf, sqlCodeOf } from "./migration-reader";

/**
 * THE MIGRATION GUARD'S PROOF RULES ON THE READER (the tests and CI turn 2, INC-1207) — the three
 * rules scripts/check-migrations.sh judged with perl of its own, now over the one reading of a
 * migration (scripts/conformance/migration-reader.ts, register row 125: comments blanked, a proof
 * is a `DO $tag$ … $tag$;` block). The shell calls them through the reader's CLI and checks its
 * exit, so a reader that fails fails the guard.
 *
 * - DEC-151, the scratch table: a CREATE TABLE inside a proof that creates and drops its tables
 *   equally often (at least once) in the scratch namespace `e2e_mig_` is the proof's own; any
 *   other CREATE TABLE is the file's, and the file owes RLS, a policy and a grant
 *   (`tableCreatesOutsideProofs`).
 * - INC-445, the real row: a proof statement that SELECTs FROM, or UPDATEs/DELETEs … WHERE on, an
 *   identity or reference table, without the scratch key `e2e-mig-` (`realRowHeads`).
 * - INC-1040, the real pick: a proof statement that picks a country, language or currency by
 *   ORDER BY … LIMIT 1 without a scratch key `e2e-mig-` / `e2e_mig_` (`realPickHeads`).
 *
 * The rules read a file's bytes, one character per byte (`readMigrationBytes`), and fold only
 * ASCII whitespace: a refused statement is named by its head — whitespace runs made one space,
 * leading space dropped, cut at 120 bytes, trailing spaces trimmed (INC-760) — and the allowlist
 * (scripts/migration-real-row-allowlist.txt) names a head as written, or as `sha256:` and the
 * first 16 hex of the sha256 of the head's bytes (D1 stop-12). Its keys were written by that
 * reading, so they still match byte for byte.
 */

const WS = /[ \t\n\r\f\v]/;
const SCRATCH_CREATE = /create[ \t\n\r\f\v]+table/gi;
const SCRATCH_DROP = /drop[ \t\n\r\f\v]+table/gi;
const REAL_ROW_TABLE =
  /(?:auth\.users|public\.(?:user_roles|profiles|user_directory|locations|categories|attributes))\b/;
const byCase = flaggedPattern("i");
const REAL_ROW = [
  byCase`\\bSELECT\\b[\\s\\S]*?\\bFROM${WS}+${REAL_ROW_TABLE}`,
  byCase`\\bUPDATE${WS}+${REAL_ROW_TABLE}[\\s\\S]*?\\bWHERE\\b`,
  byCase`\\bDELETE${WS}+FROM${WS}+${REAL_ROW_TABLE}[\\s\\S]*?\\bWHERE\\b`,
];
const REAL_PICK = byCase`\\bSELECT\\b[\\s\\S]*?\\bFROM${WS}+public\\.(?:countries|languages|currencies)\\b[\\s\\S]*?\\bORDER${WS}+BY\\b[\\s\\S]*?\\bLIMIT${WS}+1\\b`;

const countOf = (text: string, pattern: RegExp) => Array.from(text.matchAll(pattern)).length;
const lineAt = (text: string, offset: number) => text.slice(0, offset).split("\n").length;
const trimAscii = (text: string) =>
  text.replace(/^[ \t\n\r\f\v]+/, "").replace(/[ \t\n\r\f\v]+$/, "");
const blankLine = /^[ \t\n\r\f\v]*$/;
const commentLine = /^[ \t\n\r\f\v]*#/;

/** A migration's bytes as text, one character per byte (the proof rules read this). */
export function readMigrationBytes(path: string): string {
  return readFileSync(path, "latin1");
}

/** Every CREATE TABLE of a file outside a proof's scratch tables, by line (DEC-151). */
export function tableCreatesOutsideProofs(sql: string): Array<{ line: number }> {
  const blank = (s: string) => s.replace(/[^\n]/g, " ");
  let code = sqlCodeOf(sql);
  for (const block of doBlocksOf(sql)) {
    const creates = countOf(block.body, SCRATCH_CREATE);
    const scratch =
      creates >= 1 &&
      creates === countOf(block.body, SCRATCH_DROP) &&
      block.body.includes("e2e_mig_");
    if (scratch)
      code =
        code.slice(0, block.offset) +
        blank(block.text) +
        code.slice(block.offset + block.text.length);
  }
  return Array.from(code.matchAll(SCRATCH_CREATE), (match) => ({
    line: lineAt(code, match.index ?? 0),
  }));
}

/** A statement's head as the allowlist names it (INC-760). */
export function statementHead(statement: string): string {
  return statement
    .replace(/[ \t\n\r\f\v]+/g, " ")
    .replace(/^ /, "")
    .slice(0, 120)
    .replace(/ +$/, "");
}

/**
 * A file's proof statements: each block's body cut at every `;`, as its text
 * (comments kept: the head, the allowlist's key) and its code (comments
 * blanked: what the rules judge).
 */
function proofStatements(sql: string): Array<{ text: string; code: string }> {
  return doBlocksOf(sql).flatMap((block) => {
    const text = sql.slice(block.bodyOffset, block.bodyOffset + block.body.length);
    const statements: Array<{ text: string; code: string }> = [];
    let start = 0;
    for (const cut of [...text.matchAll(/;/g), { index: text.length }]) {
      const end = cut.index ?? text.length;
      statements.push({ text: text.slice(start, end), code: block.body.slice(start, end) });
      start = end + 1;
    }
    return statements;
  });
}

/**
 * The heads of a file's proof statements that read a real identity or
 * reference row (INC-445). A scratch key named anywhere in the statement, a
 * comment included, sets it aside, as the rule was written.
 */
export function realRowHeads(sql: string): string[] {
  return proofStatements(sql)
    .filter(({ text }) => !text.includes("e2e-mig-"))
    .filter(({ code }) => REAL_ROW.some((pattern) => pattern.test(code)))
    .map(({ text }) => statementHead(text));
}

/** The heads of a file's proof statements that pick a real reference row (INC-1040). */
export function realPickHeads(sql: string): string[] {
  return proofStatements(sql)
    .filter(({ text }) => !/e2e[-_]mig[-_]/i.test(text))
    .filter(({ code }) => REAL_PICK.test(code))
    .map(({ text }) => statementHead(text));
}

/** The allowlist key of a head that holds `|` (which a line cannot): its sha256's first 16 hex. */
export function headSha(head: string): string {
  return createHash("sha256").update(head, "latin1").digest("hex").slice(0, 16);
}

/**
 * Offender lines (`<path>: <head>`) split by the allowlist's text (`<file> | <head or sha256:…>
 * | <reason>`, `#` comments and blank lines skipped), both read as bytes: the refused lines as
 * given, and each allowlisted one as `<file> | <head or sha256:…> | <reason>`.
 */
export function splitByAllowlist(
  offenders: string[],
  allowlist: string,
): { refused: string[]; allowed: string[] } {
  const byHead = new Map<string, string>();
  const bySha = new Map<string, string>();
  for (const text of allowlist.split("\n")) {
    if (commentLine.test(text) || blankLine.test(text)) continue;
    const cells = text.split("|");
    while (cells.length > 0 && cells[cells.length - 1] === "") cells.pop();
    if (cells.length < 3) continue;
    const [file = "", head = "", reason = ""] = cells.slice(0, 3).map(trimAscii);
    const sha = /^sha256:([0-9a-f]{16})$/.exec(head);
    if (sha) bySha.set(`${file}\u001c${sha[1] ?? ""}`, reason);
    else byHead.set(`${file}\u001c${head}`, reason);
  }
  const refused: string[] = [];
  const allowed: string[] = [];
  for (const line of offenders) {
    if (blankLine.test(line)) continue;
    const at = line.indexOf(": ");
    const path = line.slice(0, at);
    const head = line.slice(at + 2);
    const base = path.replace(/^.*\//, "");
    const sha = headSha(head);
    const plain = byHead.get(`${base}\u001c${head}`);
    const hashed = bySha.get(`${base}\u001c${sha}`);
    if (plain !== undefined) allowed.push(`${base} | ${head} | ${plain}`);
    else if (hashed !== undefined) allowed.push(`${base} | sha256:${sha} | ${hashed}`);
    else refused.push(line);
  }
  return { refused, allowed };
}
