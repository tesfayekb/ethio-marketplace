import { readFileSync } from "node:fs";
import { basename, join } from "node:path";

import { walkFiles } from "./kit";
import { sqlCodeOf } from "./perm-vocabulary";
import { lastDeclarations, type LastDeclaration } from "./plan-seam";

/**
 * P-2 (a) (CF-PROOF-1, INC-1052, DEC-340) — A PROOF READS A STABLE READER INTO
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
 */

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
