import ts from "typescript";

import { visitTs } from "./kit";
import { lastDeclarations, type LastDeclaration } from "./plan-seam";
import { blankLiterals, tokensOf, type Token } from "./proof-readers";

/**
 * P-2 (a) ruling 14 item 4 (CF-TIER-5, the plan's Part 8) — AN AD'S DESIGNATION
 * IS WRITTEN BY ITS OWN DOORS ONLY. The five designation columns of
 * `public.listings` — `tier_until`, `tier_source` (the level's end and source),
 * `reach`, `reach_until`, `reach_source` (the reach and its end and source) —
 * are written by exactly these bodies: the level and reach doors
 * (`set_listing_level`, `set_listing_reach`), staff's `admin_set_listing_tier`,
 * `transition_listing` (a removal clears them) and the sweep
 * (`designation_sweep_core`, an end's fall back). Every function's LAST
 * declaration (plan-seam's reader, the one sql-writes.ts reads; comments and
 * literals blanked, the DO-block tokenizer reused) is read for an
 * `UPDATE public.listings … SET <column> =` or an `INSERT INTO public.listings
 * (<columns>)` naming one of the five; a body outside the admitted five is the
 * finding `<fn>:<file>:<line>`. In src/, a data-API write (`.update(` /
 * `.upsert(` / `.insert(`) whose payload names one of the five is the finding
 * `<file>:<line>` — the browser reaches a designation through its doors only.
 * Allowances in listing-designation-allowlist.txt (`key | reason | until`).
 */

export const DESIGNATION_COLUMNS: readonly string[] = [
  "tier_until",
  "tier_source",
  "reach",
  "reach_until",
  "reach_source",
];

export const ADMITTED_WRITERS: readonly string[] = [
  "set_listing_level",
  "set_listing_reach",
  "admin_set_listing_tier",
  "transition_listing",
  "designation_sweep_core",
];

export type DesignationFinding = { fn: string; file: string; line: number; columns: string[] };

const COLUMNS = new Set(DESIGNATION_COLUMNS);
/** The words that end an UPDATE's SET list at its own depth. */
const SET_END = new Set(["WHERE", "RETURNING", "FROM", ";"]);

function upper(token: Token | undefined): string {
  return (token?.text ?? "").toUpperCase();
}

/** Whether `tokens[at]` (and the next, for `public . listings`) names the listings table; the index after it. */
function listingsAt(tokens: readonly Token[], at: number): number | null {
  const first = (tokens[at]?.text ?? "").toLowerCase();
  if (first === "listings") return at + 1;
  if (
    first === "public" &&
    tokens[at + 1]?.text === "." &&
    tokens[at + 2]?.text.toLowerCase() === "listings"
  )
    return at + 3;
  if (first === "public.listings") return at + 1;
  return null;
}

/** The designation columns an UPDATE's SET list assigns, from its SET word on. */
function assignedFrom(tokens: readonly Token[], set: number): string[] {
  const found: string[] = [];
  let depth = 0;
  for (let at = set + 1; at < tokens.length; at += 1) {
    const text = tokens[at]?.text ?? "";
    if (text === "(") depth += 1;
    else if (text === ")") {
      if (depth === 0) break;
      depth -= 1;
    } else if (depth === 0) {
      if (SET_END.has(text.toUpperCase())) break;
      const name = text.toLowerCase();
      if (COLUMNS.has(name) && tokens[at + 1]?.text === "=" && tokens[at - 1]?.text !== ".")
        found.push(name);
    }
  }
  return found;
}

/** The designation columns an INSERT's column list names, from its first `(` on. */
function insertedFrom(tokens: readonly Token[], open: number): string[] {
  const found: string[] = [];
  for (let at = open + 1; at < tokens.length && tokens[at]?.text !== ")"; at += 1) {
    const name = (tokens[at]?.text ?? "").toLowerCase();
    if (COLUMNS.has(name)) found.push(name);
  }
  return found;
}

/** Each statement of a body that writes a designation column: its offset and the columns. */
export function designationWritesOf(body: string): Array<{ at: number; columns: string[] }> {
  const tokens = tokensOf(blankLiterals(body));
  const writes: Array<{ at: number; columns: string[] }> = [];
  tokens.forEach((token, index) => {
    const word = token.text.toUpperCase();
    if (
      word === "UPDATE" &&
      upper(tokens[index - 1]) !== "DO" &&
      upper(tokens[index - 1]) !== "FOR"
    ) {
      const after = listingsAt(tokens, index + 1);
      if (after === null) return;
      let set = after;
      while (set < tokens.length && upper(tokens[set]) !== "SET" && tokens[set]?.text !== ";")
        set += 1;
      if (upper(tokens[set]) !== "SET") return;
      const columns = assignedFrom(tokens, set);
      if (columns.length > 0) writes.push({ at: token.at, columns });
    }
    if (word === "INSERT" && upper(tokens[index + 1]) === "INTO") {
      const after = listingsAt(tokens, index + 2);
      if (after === null || tokens[after]?.text !== "(") return;
      const columns = insertedFrom(tokens, after);
      if (columns.length > 0) writes.push({ at: token.at, columns });
    }
  });
  return writes;
}

/** Every write of a designation column by a body outside the admitted five. */
export function designationFindings(
  last: Map<string, LastDeclaration>,
  admitted: readonly string[] = ADMITTED_WRITERS,
): DesignationFinding[] {
  const allowed = new Set(admitted);
  const findings: DesignationFinding[] = [];
  for (const [fn, declaration] of last) {
    if (allowed.has(fn)) continue;
    for (const write of designationWritesOf(declaration.body)) {
      const line =
        declaration.bodyLine + declaration.body.slice(0, write.at).split("\n").length - 1;
      findings.push({ fn, file: declaration.file, line, columns: write.columns });
    }
  }
  return findings.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
}

/** The admitted bodies that write a designation column (the census is not blind). */
export function admittedWriters(last: Map<string, LastDeclaration>): string[] {
  return ADMITTED_WRITERS.filter((fn) => {
    const declaration = last.get(fn);
    return declaration !== undefined && designationWritesOf(declaration.body).length > 0;
  });
}

export function designationFindingsOf(root: string): DesignationFinding[] {
  return designationFindings(lastDeclarations(root));
}

const WRITE_VERBS = new Set(["update", "upsert", "insert"]);

/** Every data-API write in the files whose payload names a designation column, by file and line. */
export function srcDesignationWrites(
  files: string[],
): Array<{ file: string; line: number; what: string }> {
  const sites: Array<{ file: string; line: number; what: string }> = [];
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (
        !ts.isCallExpression(node) ||
        !ts.isPropertyAccessExpression(node.expression) ||
        !WRITE_VERBS.has(node.expression.name.text)
      )
        return;
      const named = new Set<string>();
      const visit = (child: ts.Node) => {
        if (
          (ts.isPropertyAssignment(child) || ts.isShorthandPropertyAssignment(child)) &&
          (ts.isIdentifier(child.name) || ts.isStringLiteral(child.name)) &&
          COLUMNS.has(child.name.text)
        )
          named.add(child.name.text);
        ts.forEachChild(child, visit);
      };
      node.arguments.forEach(visit);
      if (named.size === 0) return;
      sites.push({
        file,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: `a data-API ${node.expression.name.text} of ${[...named].join(", ")}: a designation is written by its doors only (CF-TIER-5)`,
      });
    });
  }
  return sites;
}
