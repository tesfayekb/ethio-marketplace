import { readFileSync } from "node:fs";
import { join } from "node:path";

import { walkFiles } from "./kit";
import { sqlCodeOf } from "./perm-vocabulary";

/**
 * P-1b (CF-PLAN-1, INC-1034) — A SELLER'S PLAN IS READ THROUGH THE ONE SEAM.
 * `coverage_plans` holds the plans' caps; which plan a seller is on is the
 * seam's answer (`seller_plan(uuid)`, with `plan_caps` and `plan_photo_cap`
 * over it, 20260919054044). A function that reads `coverage_plans` by a
 * literal plan name (`WHERE plan = 'free'`) decides the seller's plan itself,
 * and silently stays on the free plan the day plans become per-seller
 * (INC-1034: validate_listing_draft did, until P-1b M-d).
 *
 * The census reads every migration in order (SQL comments blanked, `DO`
 * blocks — the proofs — removed: they are append-only history, never a
 * function's body) and keeps each function's LAST declaration, forgetting a
 * function a later `DROP FUNCTION` removes without redeclaring. A last body
 * that reads `FROM`/`JOIN … coverage_plans` without calling `seller_plan(` is
 * the finding `reads:<fn>`; one that compares `plan = 'free'` is the finding
 * `literal:<fn>`. The seam's own three functions are the mechanism and are
 * never findings. The staff door that edits a plan by its argument sits in
 * plan-seam-allowlist.txt (`key | reason | until`).
 */

export const PLAN_SEAM_FUNCTIONS = ["seller_plan", "plan_caps", "plan_photo_cap"] as const;

export type PlanSeamFinding = {
  kind: "reads" | "literal";
  fn: string;
  /** The migration (root-relative) holding the function's last declaration. */
  file: string;
  /** The line of that declaration's `CREATE … FUNCTION`. */
  line: number;
};

export function findingKey(finding: PlanSeamFinding): string {
  return `${finding.kind}:${finding.fn}`;
}

const DO_BLOCK = /\bDO\s+(\$[A-Za-z_][A-Za-z0-9_]*\$|\$\$)[\s\S]*?\1\s*;/gi;
const CREATE_FUNCTION =
  /\bCREATE\s+(?:OR\s+REPLACE\s+)?FUNCTION\s+(?:public\.)?"?([A-Za-z_][A-Za-z0-9_]*)"?\s*\(/gi;
const DROP_FUNCTION =
  /\bDROP\s+FUNCTION\s+(?:IF\s+EXISTS\s+)?(?:public\.)?"?([A-Za-z_][A-Za-z0-9_]*)"?\b/gi;
const BODY_OPENER = /\bAS\s+(\$[A-Za-z_][A-Za-z0-9_]*\$|\$\$)/iy;

const READS_PLANS = /\b(?:FROM|JOIN)\s+(?:public\.)?coverage_plans\b/i;
const CALLS_SEAM = /\bseller_plan\s*\(/i;
const LITERAL_FREE = /\bplan\s*=\s*'free'/i;

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
        break;
      }
      if (code[probe] === ";") break;
    }
    const line = code.slice(0, start).split("\n").length;
    found.push({ fn, header, body, line, offset: start });
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

/** The findings of a set of last declarations. */
export function judgeDeclarations(last: Map<string, LastDeclaration>): PlanSeamFinding[] {
  const findings: PlanSeamFinding[] = [];
  const seam: readonly string[] = PLAN_SEAM_FUNCTIONS;
  for (const [fn, declaration] of last) {
    if (seam.includes(fn)) continue;
    const { body, file, line } = declaration;
    if (READS_PLANS.test(body) && !CALLS_SEAM.test(body))
      findings.push({ kind: "reads", fn, file, line });
    if (LITERAL_FREE.test(body)) findings.push({ kind: "literal", fn, file, line });
  }
  return findings.sort((a, b) => findingKey(a).localeCompare(findingKey(b)));
}

/** Every function whose last declaration reads a seller's plan beside the seam. */
export function planSeamFindings(root: string): PlanSeamFinding[] {
  return judgeDeclarations(lastDeclarations(root));
}
