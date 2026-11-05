import { readFileSync } from "node:fs";
import { basename, join } from "node:path";

import { walkFiles } from "./kit";
import { sqlCodeOf } from "./perm-vocabulary";
import { lastDeclarations, type LastDeclaration } from "./plan-seam";

/**
 * P-2 (a) (CF-PROOF-1, INC-1052, DEC-341) — A PROOF READS A STABLE READER INTO
 * A VARIABLE, NEVER BESIDE A COLUMN IN A WHERE. Inside a `DO` block, a STABLE
 * function called with constant arguments and compared to a column in a WHERE
 * clause is pre-evaluated by the planner for its selectivity estimate, under
 * the DO statement's snapshot — taken before the proof's own scratch rows
 * existed. A reader that RAISEs on a missing row then raises there, not in the
 * proof's logic (INC-1052: `tier_rank <> public.feed_tier_rank(v_l1)` raised
 * "unknown tier" for a level the proof had just inserted). The law
 * (docs/governance/migrations.md 11): read the answer INTO a variable first and
 * compare the variable.
 *
 * The census: every function whose LAST declaration (plan-seam's reading of
 * the migrations in order, minus the dropped) is STABLE and whose body holds
 * `RAISE EXCEPTION`; then every `DO` block of every migration (comments and
 * string literals blanked, so a `regprocedure` literal or a quoted fragment is
 * never a call) in which one of those functions is called inside a WHERE
 * clause — the call's clause is the nearest clause keyword before it outside
 * any parenthesis it is nested in; `WHERE` is the finding
 * `<fn>:<file>:<line>`. `SELECT fn() INTO v`, `v := fn()`, `PERFORM fn()`,
 * `IF fn() <> 1`, a scalar `(SELECT fn())` and a call in a function body are
 * not findings. Allowances in proof-readers-allowlist.txt (`key | reason |
 * until`); it is empty at landing and stays so.
 *
 * CF-PROOF-2 (INC-1054, ruling 6) — A PROOF ASSERTS CATALOG FACTS FROM CATALOG
 * COLUMNS, NEVER BY LIKE ON A DEPARSED DEFINITION. `pg_get_triggerdef` /
 * `pg_get_indexdef` / `pg_get_constraintdef` spell a definition as the session
 * sees it — the function unqualified when its schema is on the search_path,
 * the server version's own keywords — so a LIKE on that text asserts the
 * spelling, not the fact (run 41969678989: the trigger was right, the check
 * expected `public.level_ranks_rebuild()`). The law
 * (docs/governance/migrations.md 12): read `pg_trigger.tgtype` bits, `tgattr`
 * → attnames, `tgfoid::regprocedure`, `tgenabled`, `pg_proc`, `pg_constraint`,
 * `pg_policies`. The census: in every DO block of every migration stamped
 * `DEPARSE_FLOOR` or later (comments and literals blanked), a
 * `pg_get_(trigger|index|constraint)def(` followed by `LIKE` / `NOT LIKE` —
 * right after its closing parenthesis, or on the variable it was read `INTO`
 * (`:=`) later in the block — is the finding `<file>:<line>`. The two
 * older sites (20261014022725 :427, 20261014194317 :932) are applied history
 * below the floor; no allowlist line exists for this rule.
 */

/** The first migration stamp CF-PROOF-2 judges (ruling 6, 2026-11-04). */
export const DEPARSE_FLOOR = "20261104000000";

const DEPARSE_CALL = /\bpg_get_(?:trigger|index|constraint)def\s*\(/gi;

export type DeparseLikeFinding = {
  /** The migration (root-relative) holding the DO block. */
  file: string;
  /** The line of the `pg_get_*def(` call. */
  line: number;
};

export function deparseFindingKey(finding: DeparseLikeFinding): string {
  return `${basename(finding.file)}:${finding.line}`;
}

/** The index just past the parenthesis that closes the one opened at `open`, or -1. */
function closeOf(text: string, open: number): number {
  let depth = 0;
  for (let at = open; at < text.length; at += 1) {
    const ch = text[at];
    if (ch === "(") depth += 1;
    else if (ch === ")") {
      depth -= 1;
      if (depth === 0) return at + 1;
    }
  }
  return -1;
}

const LIKE_NEXT = /^\s*(?:NOT\s+)?LIKE\b/i;

/** Whether `[NOT] LIKE` follows position `from`, or follows a parenthesis that encloses it (a scalar subquery). */
function likeFollows(body: string, from: number): boolean {
  if (LIKE_NEXT.test(body.slice(from))) return true;
  let depth = 0;
  for (let at = from; at < body.length; at += 1) {
    const ch = body[at];
    if (ch === "(") depth += 1;
    else if (ch === ")") {
      if (depth === 0) {
        if (LIKE_NEXT.test(body.slice(at + 1))) return true;
        continue;
      }
      depth -= 1;
    } else if (ch === ";" && depth === 0) return false;
  }
  return false;
}

/**
 * The offsets (into a blanked DO body) of every `pg_get_*def(…)` whose text is
 * LIKE-matched: `[NOT] LIKE` after the call or after a parenthesis enclosing it
 * (`(SELECT pg_get_constraintdef(c.oid) FROM … ) NOT LIKE`), or the call read
 * `INTO v` / `v := …` and `v [NOT] LIKE` later in the block (the fold's shape).
 */
export function deparseLikesOf(body: string): number[] {
  const hits: number[] = [];
  for (const match of body.matchAll(DEPARSE_CALL)) {
    const at = match.index ?? 0;
    const close = closeOf(body, at + match[0].length - 1);
    if (close < 0) continue;
    if (likeFollows(body, close)) {
      hits.push(at);
      continue;
    }
    const after = body.slice(close);
    const variable =
      /^\s*INTO\s+(?:STRICT\s+)?([A-Za-z_][A-Za-z0-9_]*)/i.exec(after)?.[1] ??
      /([A-Za-z_][A-Za-z0-9_]*)\s*:=\s*$/.exec(body.slice(0, at))?.[1];
    if (variable === undefined) continue;
    if (new RegExp(`\\b${variable}\\s+(?:NOT\\s+)?LIKE\\b`, "i").test(after)) hits.push(at);
  }
  return hits;
}

/** Whether a migration file's 14-digit stamp is at or past `DEPARSE_FLOOR`. */
export function pastDeparseFloor(file: string): boolean {
  const stamp = /^(\d{14})_/.exec(basename(file))?.[1];
  return stamp !== undefined && stamp >= DEPARSE_FLOOR;
}

/** Every `pg_get_*def(…) [NOT] LIKE` inside a DO block of a migration at or past the floor. */
export function deparseLikeFindings(root: string): DeparseLikeFinding[] {
  const findings: DeparseLikeFinding[] = [];
  const files = walkFiles([join(root, "supabase", "migrations")], { ext: ["sql"] });
  for (const file of files) {
    if (!pastDeparseFloor(file)) continue;
    const rel = file
      .slice(root.length + 1)
      .split("\\")
      .join("/");
    const sql = readFileSync(file, "utf8");
    for (const block of doBlocksOf(sql)) {
      for (const at of deparseLikesOf(block.body)) {
        const line = sql.slice(0, block.offset + at).split("\n").length;
        findings.push({ file: rel, line });
      }
    }
  }
  return findings.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
}

export type ProofReaderFinding = {
  fn: string;
  /** The migration (root-relative) holding the DO block. */
  file: string;
  /** The line of the call. */
  line: number;
};

export function findingKey(finding: ProofReaderFinding): string {
  return `${finding.fn}:${basename(finding.file)}:${finding.line}`;
}

const DO_BLOCK = /\bDO\s+(\$[A-Za-z_][A-Za-z0-9_]*\$|\$\$)([\s\S]*?)\1\s*;/gi;
const RAISES = /\bRAISE\s+EXCEPTION\b/i;
const STABLE = /\bSTABLE\b/i;
const TOKEN = /[A-Za-z_][A-Za-z0-9_]*|:=|<>|<=|>=|[();,.]|[^\sA-Za-z_();,.]/g;

/** The clause keywords that end the walk back from a call; only WHERE is a finding. */
const CLAUSE_STOPS = new Set([
  "WHERE",
  "SELECT",
  "FROM",
  "INTO",
  "SET",
  "VALUES",
  "HAVING",
  "GROUP",
  "ORDER",
  "PERFORM",
  "RETURN",
  "IF",
  "ELSIF",
  "WHILE",
  "FOREACH",
  "FOR",
  "ON",
  "JOIN",
  "USING",
  "RETURNING",
  "LIMIT",
  "OFFSET",
  "RAISE",
  "EXECUTE",
  "INSERT",
  "UPDATE",
  "DELETE",
  "WITH",
  "DECLARE",
  "BEGIN",
  ";",
  ":=",
]);

/** The STABLE functions whose last declaration RAISEs, by name. */
export function stableRaisers(last: Map<string, LastDeclaration>): string[] {
  const names: string[] = [];
  for (const [fn, declaration] of last) {
    if (STABLE.test(declaration.header) && RAISES.test(declaration.body)) names.push(fn);
  }
  return names.sort();
}

/** `'…'` literals blanked (their `''` escapes and newlines included); positions kept. */
export function blankLiterals(text: string): string {
  let out = "";
  let at = 0;
  while (at < text.length) {
    const ch = text[at] ?? "";
    if (ch !== "'") {
      out += ch;
      at += 1;
      continue;
    }
    out += "'";
    at += 1;
    while (at < text.length) {
      const inner = text[at] ?? "";
      if (inner === "'" && text[at + 1] === "'") {
        out += "  ";
        at += 2;
        continue;
      }
      if (inner === "'") break;
      out += inner === "\n" ? "\n" : " ";
      at += 1;
    }
    out += "'";
    at += 1;
  }
  return out;
}

export type DoBlock = { body: string; offset: number };

/** Every `DO $tag$ … $tag$;` body of a file, comments and literals blanked, with its offset. */
export function doBlocksOf(sql: string): DoBlock[] {
  const code = sqlCodeOf(sql);
  const blocks: DoBlock[] = [];
  for (const match of code.matchAll(DO_BLOCK)) {
    const body = match[2] ?? "";
    const offset = (match.index ?? 0) + match[0].indexOf(body);
    blocks.push({ body: blankLiterals(body), offset });
  }
  return blocks;
}

type Token = { text: string; at: number };

function tokensOf(text: string): Token[] {
  return Array.from(text.matchAll(TOKEN), (match) => ({
    text: match[0],
    at: match.index ?? 0,
  }));
}

/** Whether the call at token `index` sits inside a WHERE clause (outside any parenthesis around it). */
function inWhereClause(tokens: Token[], index: number): boolean {
  let depth = 0;
  for (let back = index - 1; back >= 0; back -= 1) {
    const text = tokens[back]?.text ?? "";
    if (text === ")") {
      depth += 1;
      continue;
    }
    if (text === "(") {
      if (depth > 0) depth -= 1;
      continue;
    }
    if (depth > 0) continue;
    const upper = text.toUpperCase();
    if (upper === "WHERE") return true;
    // `IS [NOT] DISTINCT FROM` is an operator, not the FROM clause.
    if (upper === "FROM" && (tokens[back - 1]?.text ?? "").toUpperCase() === "DISTINCT") continue;
    if (CLAUSE_STOPS.has(upper)) return false;
  }
  return false;
}

/** The offsets (into the body) of every call of one of `names` inside a WHERE clause. */
export function whereCallsOf(
  body: string,
  names: readonly string[],
): Array<{ fn: string; at: number }> {
  const wanted = new Set(names.map((name) => name.toLowerCase()));
  const tokens = tokensOf(body);
  const calls: Array<{ fn: string; at: number }> = [];
  tokens.forEach((token, index) => {
    const fn = token.text.toLowerCase();
    if (!wanted.has(fn) || tokens[index + 1]?.text !== "(") return;
    if (inWhereClause(tokens, index)) calls.push({ fn, at: token.at });
  });
  return calls;
}

/** Every call of a STABLE RAISE-ing function inside a WHERE clause of a DO block, across the migrations. */
export function proofReaderFindings(root: string): ProofReaderFinding[] {
  const names = stableRaisers(lastDeclarations(root));
  const findings: ProofReaderFinding[] = [];
  const files = walkFiles([join(root, "supabase", "migrations")], { ext: ["sql"] });
  for (const file of files) {
    const rel = file
      .slice(root.length + 1)
      .split("\\")
      .join("/");
    const sql = readFileSync(file, "utf8");
    for (const block of doBlocksOf(sql)) {
      for (const call of whereCallsOf(block.body, names)) {
        const line = sql.slice(0, block.offset + call.at).split("\n").length;
        findings.push({ fn: call.fn, file: rel, line });
      }
    }
  }
  return findings.sort((a, b) => findingKey(a).localeCompare(findingKey(b)));
}
