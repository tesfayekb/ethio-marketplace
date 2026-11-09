import { basename } from "node:path";

import { lastDeclarations, type LastDeclaration } from "./migration-reader";
import { blankLiterals, tokensOf, type Token } from "./proof-readers";

/**
 * P-2 (a) (CF-SQL-1, INC-1055, ruling 7) — A FUNCTION THE APP'S CONNECTION
 * CAN REACH NEVER ISSUES A DELETE OR UPDATE WITHOUT A WHERE CLAUSE (rule 30;
 * INC-432's class, second occurrence). PostgREST's session runs pg-safeupdate:
 * a statement without a WHERE is refused there, however deep it sits — the
 * levels' rank trigger fired under the monetisation console's write and its
 * `DELETE FROM public.level_ranks;` fell with "DELETE requires a WHERE clause",
 * and every MON test after it. The law is applied to the text, not the caller:
 * every function's LAST declaration (the migration reader, minus the dropped),
 * its body with comments and literals blanked (the DO-block tokenizer reused),
 * and every `DELETE FROM` or `UPDATE <table>` statement in it that reaches its
 * end — `;`, `LOOP`, or the parenthesis that closes a CTE it sits in — without a
 * `WHERE` at its own parenthesis depth is the finding `<fn>:<file>:<line>`.
 * `FOR UPDATE`, `ON CONFLICT DO UPDATE`, `ON DELETE CASCADE`, a trigger event
 * list, a GRANT list and a literal (`TG_OP = 'DELETE'`, dynamic SQL) are not
 * statements. A statement issued through `EXECUTE '…'` is text the guard cannot
 * read; it stays a reviewer's law. Allowances in sql-writes-allowlist.txt
 * (`key | reason | until`); the census found none at landing.
 */

export type SqlWriteFinding = {
  fn: string;
  /** The migration (root-relative) holding the last declaration. */
  file: string;
  /** The line of the DELETE / UPDATE keyword. */
  line: number;
  verb: "DELETE" | "UPDATE";
};

export function findingKey(finding: SqlWriteFinding): string {
  return `${finding.fn}:${basename(finding.file)}:${finding.line}`;
}

/** A DELETE / UPDATE word after one of these is not a statement of its own. */
const NOT_A_STATEMENT = new Set([
  "FOR", // SELECT … FOR UPDATE
  "KEY", // FOR NO KEY UPDATE
  "DO", // ON CONFLICT … DO UPDATE
  "ON", // ON DELETE / ON UPDATE (a key's action; a trigger's table)
  "OR", // INSERT OR UPDATE OR DELETE (a trigger's events)
  "BEFORE",
  "AFTER",
  "INSTEAD",
  "OF",
  ",", // GRANT SELECT, UPDATE, DELETE ON …
  "GRANT",
  "REVOKE",
]);

/** The words that end a statement at its own depth. */
const STATEMENT_END = new Set([";", "LOOP"]);

/** Whether the statement whose verb is `tokens[index]` carries a WHERE at its own depth. */
function hasWhere(tokens: readonly Token[], index: number): boolean {
  let depth = 0;
  for (let at = index + 1; at < tokens.length; at += 1) {
    const text = tokens[at]?.text ?? "";
    if (text === "(") {
      depth += 1;
      continue;
    }
    if (text === ")") {
      if (depth === 0) return false;
      depth -= 1;
      continue;
    }
    if (depth > 0) continue;
    const upper = text.toUpperCase();
    if (upper === "WHERE") return true;
    if (STATEMENT_END.has(upper)) return false;
  }
  return false;
}

/** The offsets (into the blanked body) and verbs of every DELETE / UPDATE statement with no WHERE. */
export function unguardedWritesOf(body: string): Array<{ at: number; verb: "DELETE" | "UPDATE" }> {
  const tokens = tokensOf(blankLiterals(body));
  const found: Array<{ at: number; verb: "DELETE" | "UPDATE" }> = [];
  tokens.forEach((token, index) => {
    const upper = token.text.toUpperCase();
    if (upper !== "DELETE" && upper !== "UPDATE") return;
    const previous = (tokens[index - 1]?.text ?? "").toUpperCase();
    if (NOT_A_STATEMENT.has(previous)) return;
    const next = (tokens[index + 1]?.text ?? "").toUpperCase();
    if (upper === "DELETE" && next !== "FROM") return;
    if (upper === "UPDATE" && !/^[A-Z_]/.test(next)) return;
    if (!hasWhere(tokens, index)) found.push({ at: token.at, verb: upper });
  });
  return found;
}

/** Every unguarded DELETE / UPDATE in the body of every function's last declaration. */
export function sqlWriteFindings(
  root: string,
  last: Map<string, LastDeclaration> = lastDeclarations(root),
): SqlWriteFinding[] {
  const findings: SqlWriteFinding[] = [];
  for (const [fn, declaration] of last) {
    for (const hit of unguardedWritesOf(declaration.body)) {
      const line = declaration.bodyLine + declaration.body.slice(0, hit.at).split("\n").length - 1;
      findings.push({ fn, file: declaration.file, line, verb: hit.verb });
    }
  }
  return findings.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
}
