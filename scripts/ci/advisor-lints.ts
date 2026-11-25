/**
 * CF-ADVISOR-1 (cursor-bundle-7a, ruling 1 decision 9, DEC-472) — THE PLATFORM'S OWN PERFORMANCE
 * LINTS, JUDGED ON CI'S TEMPORARY BACKEND. The smoke lane runs the pinned CLI's
 * `supabase db advisors --local --workdir .ci-local --type performance --level info --output-format json`
 * once the migrations are applied, writes its stdout to a file and hands that file to this module.
 * The answer's shape is the CLI 2.120.0's own (`readFindings` names the two expressions that write it). Two lints gate, by name: `auth_rls_initplan` (a policy that asks who is signed in
 * once per row) and `duplicate_index` (an identical second index). Every other lint's count is
 * printed to the log and never fails the step.
 *
 * What it will not do: read an answer it cannot understand as "no findings". An empty text, text
 * that is not JSON, or JSON that is not the CLI's `results` list of findings each carrying a `name`
 * fails the step (the same law as a reader's door error: a failed read is a failure, never a clean state). It
 * prints counts only: a finding's `detail` and `metadata` name live objects and never reach the log
 * (DEC-310's form; AGENTS.md "scanner output: counts only").
 *
 * The self-test runs first, in the same process: a planted finding of each gated name must fail and
 * a planted finding of another name must pass, or the step judges nothing and fails.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { errorText } from "../../src/lib/error-text";

/** The two lints that fail the step; every other name is counted in the log only. */
export const GATED_LINTS = ["auth_rls_initplan", "duplicate_index"] as const;

/** One finding of the advisor, reduced to what the judge reads: its lint's name. */
export interface Finding {
  name: string;
}

export interface AdvisorVerdict {
  /** Counts only: one line per lint name, then the gate's line. */
  lines: string[];
  failed: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** A finding's `name`, or null when the entry is not an object carrying a non-empty string name. */
function nameOf(entry: unknown): string | null {
  if (!isRecord(entry)) return null;
  const name = entry["name"];
  return typeof name === "string" && name !== "" ? name : null;
}

/**
 * The findings an advisor answer holds, in exactly the shape the pinned CLI writes (CLI 2.120.0,
 * `SUPABASE_CLI_VERSION` in local-backend-proof.yml; ruling 2 of cursor-bundle-7a read it from the
 * release's bundled code): with `--output-format json` stdout is one line,
 * `{"results":[<finding>…],"message":"db advisors"}`, from `success("db advisors",{results:e})` and
 * the writer `success:(l,H)=>i({...H,message:l})`; with nothing to report `results` is `[]`
 * (the text "No issues found" goes to stderr). Each finding carries `name`, `title`, `level`,
 * `facing`, `categories`, `description`, `detail`, `remediation`, `metadata` and `cacheKey`; only
 * `name` is read. Anything else — empty text, text that is not JSON, no `results` list, an entry
 * with no name (a bare list, or the hosted API's `lints` object, included) — throws: a change of
 * the pinned version re-reads this shape, and the fail-closed reader says so on its first run.
 */
export function readFindings(text: string): Finding[] {
  if (text.trim() === "") throw new Error("advisors: the answer is empty (never read as clean)");
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("advisors: the answer is not JSON");
  }
  const list = isRecord(parsed) ? parsed["results"] : undefined;
  if (!Array.isArray(list)) throw new Error("advisors: the answer has no results list");
  return list.map((entry): Finding => {
    const name = nameOf(entry);
    if (name === null) throw new Error("advisors: a finding carries no lint name");
    return { name };
  });
}

/** The pure judge (unit-tested): counts per lint name, failing on a gated name. */
export function judgeFindings(findings: Finding[]): AdvisorVerdict {
  const counts = new Map<string, number>();
  for (const finding of findings) counts.set(finding.name, (counts.get(finding.name) ?? 0) + 1);
  const lines = [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, count]) => `advisors: ${name} ${count}`);
  let failed = false;
  for (const gated of GATED_LINTS) {
    const count = counts.get(gated) ?? 0;
    lines.push(`advisors: ${gated} gate ${count === 0 ? "clear" : "FAILED"} (${count})`);
    if (count > 0) {
      failed = true;
      lines.push(`::error::advisors: ${count} finding(s) of ${gated}`);
    }
  }
  return { lines, failed };
}

/** The self-test: each gated name fails when planted, another name passes. Returns the problems. */
export function selfTest(): string[] {
  const problems: string[] = [];
  for (const gated of GATED_LINTS)
    if (!judgeFindings([{ name: gated }]).failed) problems.push(`a planted ${gated} passed`);
  if (judgeFindings([{ name: "unindexed_foreign_keys" }, { name: "unused_index" }]).failed)
    problems.push("a planted finding of another name failed");
  if (judgeFindings([]).failed) problems.push("an answer of no findings failed");
  return problems;
}

function main(path: string | undefined): number {
  const problems = selfTest();
  if (problems.length > 0) {
    for (const problem of problems) console.error(`::error::advisors self-test: ${problem}`);
    return 1;
  }
  console.log("advisors self-test OK: each gated name fails planted, another name passes");
  if (path === undefined) {
    console.error("::error::advisors: no answer file given");
    return 1;
  }
  const verdict = judgeFindings(readFindings(readFileSync(path, "utf8")));
  for (const line of verdict.lines) console.log(line);
  return verdict.failed ? 1 : 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    process.exit(main(process.argv[2]));
  } catch (error) {
    console.error(`::error::${errorText(error)}`);
    process.exit(1);
  }
}
