/**
 * DEC-283 / INC-966 (Foundations turn K5) — the one reader of the repeat lane's time cap.
 *
 * The repeat lane runs Playwright with --global-timeout. When the run exits non-zero, this script
 * reads the JSON report and answers:
 *   - "capped": every top-level error is Playwright's global-timeout message and no repetition
 *     failed; the tests the cap left unrun are appended to the lane's evidence file; exit 0.
 *   - "failed": anything else — another error, a mix, no error at all, a failed repetition, or a
 *     report it cannot read; exit 1. A message it cannot read is never "capped".
 *
 * The template is Playwright's own (playwright 1.58.1, lib/runner/taskRunner.js:91):
 *   colors.red(`Timed out waiting ${this._globalTimeoutForError / 1e3}s for the ${currentTaskName} to run`)
 * and colors.red is applyStyle(31, 39, text) = `\x1B[31m${text}\x1B[39m`
 * (playwright-core lib/utils/isomorphic/colors.js:36, :67); with colours off the text is plain.
 *
 * Usage: bun run scripts/ci/repeat-cap.ts <results.json> <evidence-file>
 *
 * DEC-415 (the tests and CI turn 2, ruling 3) — the lane runs two passes, the parallel one and then
 * the selected specs' `@global-state` tests serially, and Playwright empties `test-results/` before
 * each run. The workflow sets the parallel pass's directory aside; this script joins it back, so the
 * one results file the cap and the failure reporter read holds both passes:
 *   bun run scripts/ci/repeat-cap.ts --merge <aside-dir> <results-dir> <evidence-file>
 * A serial pass the cap stopped before any test loaded is named on the evidence file, never silent.
 */
import { appendFileSync, cpSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { errorText } from "../../src/lib/error-text";

const RED_OPEN = "\x1B[31m";
const RED_CLOSE = "\x1B[39m";
const ESC = "\x1B";
const TEMPLATE = /^Timed out waiting \d+(?:\.\d+)?s for the [^\n]+ to run$/;

/** True only for Playwright's global-timeout message, coloured red or plain. */
export function isGlobalTimeout(message: unknown): boolean {
  if (typeof message !== "string") return false;
  let text = message;
  if (text.startsWith(RED_OPEN) && text.endsWith(RED_CLOSE))
    text = text.slice(RED_OPEN.length, text.length - RED_CLOSE.length);
  return !text.includes(ESC) && TEMPLATE.test(text);
}

export type CapVerdict = { verdict: "capped"; left: string[] } | { verdict: "failed" };

type Json = Record<string, unknown>;
const isObject = (v: unknown): v is Json =>
  typeof v === "object" && v !== null && !Array.isArray(v);
class Unreadable extends Error {}
const TEST_STATUSES = new Set<unknown>(["expected", "unexpected", "flaky", "skipped"]);
/** An absent list is empty; a present list that is not an array of objects is unreadable. */
const list = (owner: Json, key: string): Json[] => {
  const v = owner[key];
  if (v === undefined) return [];
  if (!Array.isArray(v) || !v.every(isObject)) throw new Unreadable(key);
  return v;
};

/** The verdict on a parsed Playwright JSON report. */
export function capVerdict(report: unknown): CapVerdict {
  if (!isObject(report) || !Array.isArray(report["errors"])) return { verdict: "failed" };
  const errors = report["errors"];
  if (errors.length === 0) return { verdict: "failed" };
  if (!errors.every((e) => isObject(e) && isGlobalTimeout(e["message"])))
    return { verdict: "failed" };

  const left = new Set<string>();
  let failed = false;
  const walk = (suite: Json, parents: string[]): void => {
    const title = typeof suite["title"] === "string" ? suite["title"] : "";
    const context = title ? [...parents, title] : parents;
    for (const spec of list(suite, "specs")) {
      for (const test of list(spec, "tests")) {
        // Playwright's four test outcomes; anything else is unreadable, never a pass.
        if (!TEST_STATUSES.has(test["status"])) throw new Unreadable("test.status");
        if (test["status"] === "unexpected") failed = true;
        const runs = list(test, "results");
        const interrupted = runs.some((r) => r["status"] === "interrupted");
        if (runs.length === 0 || interrupted) {
          const specTitle = typeof spec["title"] === "string" ? spec["title"] : "";
          const project = typeof test["projectName"] === "string" ? test["projectName"] : "";
          left.add([...context, specTitle, project].join(" / "));
        }
      }
    }
    for (const child of list(suite, "suites")) walk(child, context);
  };
  try {
    for (const suite of list(report, "suites")) walk(suite, []);
  } catch (error) {
    if (error instanceof Unreadable) return { verdict: "failed" };
    throw error;
  }
  if (failed) return { verdict: "failed" };
  return { verdict: "capped", left: [...left].sort() };
}

/** Reads the report file; an absent or unreadable file is "failed". */
export function capVerdictOfFile(path: string): CapVerdict {
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    console.error(`repeat-cap: cannot read ${path}: ${errorText(error)}`);
    return { verdict: "failed" };
  }
  return capVerdict(parsed);
}

const STAT_COUNTS = ["expected", "skipped", "unexpected", "flaky"] as const;

/** DEC-415 — two Playwright JSON reports as one: suites and errors in pass order, stats summed. */
export function mergedReport(first: unknown, second: unknown): Json | null {
  if (!isObject(first) || !isObject(second)) return null;
  const lists = [first, second].map((r) => [r["suites"], r["errors"]]);
  if (!lists.every((pair) => pair.every(Array.isArray))) return null;
  const join2 = (key: string): unknown[] =>
    [first[key], second[key]].flatMap((v) => (Array.isArray(v) ? v : []));
  const merged: Json = { ...second, ...first, suites: join2("suites"), errors: join2("errors") };
  const a = first["stats"];
  const b = second["stats"];
  if (!isObject(a) && isObject(b)) merged["stats"] = b;
  if (isObject(a) && isObject(b)) {
    const sum = (key: string): number | undefined => {
      const x = a[key];
      const y = b[key];
      return typeof x === "number" && typeof y === "number" ? x + y : undefined;
    };
    const stats: Json = { ...a, duration: sum("duration") };
    for (const key of STAT_COUNTS) stats[key] = sum(key);
    merged["stats"] = stats;
  }
  return merged;
}

/** True when the report holds no test at all and every top-level error is the cap. */
export function cappedBeforeLoad(report: unknown): boolean {
  if (!isObject(report) || !Array.isArray(report["errors"])) return false;
  const errors = report["errors"];
  if (errors.length === 0 || !errors.every((e) => isObject(e) && isGlobalTimeout(e["message"])))
    return false;
  let tests = 0;
  const walk = (suite: Json): void => {
    for (const spec of list(suite, "specs")) tests += list(spec, "tests").length;
    for (const child of list(suite, "suites")) walk(child);
  };
  try {
    for (const suite of list(report, "suites")) walk(suite);
  } catch (error) {
    if (error instanceof Unreadable) return false;
    throw error;
  }
  return tests === 0;
}

/** The line a serial pass gets when the cap left it no test run. */
export const SERIAL_CAP_LINE =
  "- Not repeated (time cap): the serial pass's @global-state tests (DEC-415)\n";

function readJson(path: string): unknown {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    console.error(`repeat-cap: cannot read ${path}: ${errorText(error)}`);
    return undefined;
  }
}

/** DEC-415 — joins the set-aside parallel pass into the serial pass's directory; false when it cannot. */
export function mergeDirs(aside: string, dir: string, evidence: string): boolean {
  const results = join(dir, "results.json");
  const second = existsSync(results) ? readJson(results) : undefined;
  const merged = mergedReport(readJson(join(aside, "results.json")), second);
  cpSync(aside, dir, { recursive: true, force: false });
  if (merged === null) {
    console.error("repeat-cap: the two passes' reports could not be joined");
    return false;
  }
  writeFileSync(results, JSON.stringify(merged));
  if (cappedBeforeLoad(second)) appendFileSync(evidence, SERIAL_CAP_LINE);
  return true;
}

function main(): void {
  const args = process.argv.slice(2);
  if (args[0] === "--merge") {
    const [, aside, dir, evidence] = args;
    if (!aside || !dir || !evidence) {
      console.error("usage: repeat-cap.ts --merge <aside-dir> <results-dir> <evidence-file>");
      process.exit(1);
    }
    process.exit(mergeDirs(aside, dir, evidence) ? 0 : 1);
  }
  const [results, evidence] = args;
  if (!results || !evidence) {
    console.error("usage: repeat-cap.ts <results.json> <evidence-file>");
    process.exit(1);
  }
  const answer = capVerdictOfFile(results);
  console.log(`repeat-cap: ${answer.verdict}`);
  if (answer.verdict === "failed") process.exit(1);
  appendFileSync(
    evidence,
    answer.left.map((title) => `- Not repeated (time cap): ${title}\n`).join(""),
  );
}

if (import.meta.main) main();
