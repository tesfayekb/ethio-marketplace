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
 */
import { appendFileSync, readFileSync } from "node:fs";

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
    console.error(`repeat-cap: cannot read ${path}: ${String(error)}`);
    return { verdict: "failed" };
  }
  return capVerdict(parsed);
}

function main(): void {
  const [results, evidence] = process.argv.slice(2);
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
