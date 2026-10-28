import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { repeatPlan } from "../e2e-select";
import { walkFiles } from "./kit";

/**
 * DEC-283 (Foundations turn K4) — EVERY CHANGED BROWSER TEST IS REPEATED INSIDE THE NORMAL CI RUN.
 * The repeat lane of .github/workflows/local-backend-proof.yml runs the specs the one selector
 * (`scripts/e2e-select.ts --repeat`) chooses, several times on both projects, with no retries and
 * under one time cap; with nothing selected it starts no backend. This guard reads the workflow and
 * names every rule a change breaks: the lane in the matrix, in the summary's lane list, in its
 * evidence pattern and in the reporter's expected sources; the run's `--retries 0`, its repeat count
 * from the selection and its global time cap; the skip condition on every step that installs, starts
 * or uses the temporary backend, builds or runs tests; and the selection before the first such step.
 * Turn K5 (INC-966, INC-967): the selection reads the ranks (`--repeat --ranks`); the merged E2E
 * report in ci.yml names `repeat?` among its expected sources; the cap is read by
 * scripts/ci/repeat-cap.ts, and no workflow reads Playwright's 'Timed out waiting' text inline.
 */

const WORKFLOW = ".github/workflows/local-backend-proof.yml";
const CI = ".github/workflows/ci.yml";
const WORKFLOWS = ".github/workflows";
const MERGED = "name: Publish merged E2E report";
const SKIP = "env.REPEAT_SPECS != ''";
const SELECT = "Select the specs to repeat (DEC-283)";
/** A step that installs the CLI or the browsers, starts or uses the backend, builds or runs tests. */
const HEAVY =
  /supabase\/setup-cli|supabase start|\.ci-local|DATABASE_CONTAINER|build:e2e|playwright install|playwright test|ms-playwright|@playwright\/test\/package\.json/;

type Step = { line: number; text: string };

/** The proof job's steps, read by indentation (two spaces a level, as the workflow is written). */
function proofSteps(text: string): Step[] {
  const lines = text.split("\n");
  const steps: Step[] = [];
  let inProof = false;
  let current: Step | null = null;
  lines.forEach((line, index) => {
    const job = /^ {2}([A-Za-z0-9_-]+):\s*$/.exec(line);
    if (job) {
      inProof = job[1] === "proof";
      current = null;
      return;
    }
    if (!inProof) return;
    if (/^ {6}- /.test(line)) {
      current = { line: index + 1, text: `${line}\n` };
      steps.push(current);
      return;
    }
    if (/^ {0,5}\S/.test(line)) {
      current = null;
      return;
    }
    if (current !== null) current.text += `${line}\n`;
  });
  return steps;
}

function ifLine(step: Step): string {
  return /^\s*if:\s*(.*)$/m.exec(step.text)?.[1] ?? "";
}

/** Every rule of the repeat lane the workflow text breaks, by name. */
export function repeatLaneFindings(text: string): string[] {
  const findings: string[] = [];
  const matrix = /lane:\s*\[([\s\S]*?)\]/.exec(text)?.[1] ?? "";
  if (!/^\s*"?repeat"?,?\s*$/m.test(matrix)) findings.push("the matrix has no repeat lane");
  const lanes = /^\s*lanes = \[(.*)\]\s*$/m.exec(text)?.[1] ?? "";
  if (!lanes.includes("'repeat'")) findings.push("the summary's lane list leaves repeat out");
  const evidence = /- Lane: \(([^)]*)\)/.exec(text)?.[1] ?? "";
  if (!evidence.split("|").includes("repeat"))
    findings.push("the summary's evidence pattern leaves repeat out");
  const expected = /E2E_EXPECTED_SOURCES:\s*(\S+)/.exec(text)?.[1] ?? "";
  if (!expected.split(",").some((id) => id.replace(/\?$/, "") === "repeat"))
    findings.push("the reporter's expected sources leave repeat out");

  const run = text.split("\n").find((line) => /playwright test\b.*--repeat-each/.test(line));
  if (run === undefined) findings.push("the repeat lane runs no repeated tests");
  else {
    if (!/--retries 0\b/.test(run)) findings.push("the repeat lane's run lacks --retries 0");
    if (!run.includes('--repeat-each "$REPEAT_EACH"'))
      findings.push("the repeat lane's count does not come from the selection");
    if (!/--global-timeout "?\$REPEAT_GLOBAL_TIMEOUT_MS"?/.test(run))
      findings.push("the repeat lane's run lacks the global time cap");
  }

  const steps = proofSteps(text);
  const select = steps.findIndex((step) => step.text.includes(`name: ${SELECT}`));
  if (select < 0) findings.push("the repeat lane has no selection step");
  steps.forEach((step, index) => {
    if (index === select || !HEAVY.test(step.text)) return;
    if (select >= 0 && index < select)
      findings.push(`the selection comes after a step that needs it (line ${step.line})`);
    const condition = ifLine(step);
    if (condition.includes("always()")) return;
    if (!condition.includes(SKIP))
      findings.push(`a step lacks the empty-selection skip condition (line ${step.line})`);
  });
  if (!/scripts\/e2e-select\.ts --repeat --ranks\b/.test(text))
    findings.push("the selection does not read the selector's ranks");
  if (!/bun run scripts\/ci\/repeat-cap\.ts\b/.test(text))
    findings.push("the cap is not read by scripts/ci/repeat-cap.ts");
  return findings;
}

/** INC-966: the merged E2E report (ci.yml) expects the repeat lane, in its optional form. */
export function mergedReportFindings(ciText: string): string[] {
  const at = ciText.indexOf(MERGED);
  const step = at < 0 ? "" : ciText.slice(at, ciText.indexOf("\n      - name:", at + 1) >>> 0);
  const expected = /E2E_EXPECTED_SOURCES:\s*(\S+)/.exec(step)?.[1] ?? "";
  if (!expected.split(",").includes("repeat?"))
    return ["the merged report's expected sources leave repeat? out"];
  return [];
}

/** INC-966: no workflow reads Playwright's global-timeout text inline. */
export function inlineCapFindings(files: Record<string, string>): string[] {
  return Object.entries(files)
    .filter(([, text]) => text.includes("Timed out waiting"))
    .map(([name]) => `an inline 'Timed out waiting' reading in ${name}`);
}

const real = readFileSync(WORKFLOW, "utf8");
const realCi = readFileSync(CI, "utf8");
const allWorkflows = Object.fromEntries(
  walkFiles([WORKFLOWS], { ext: ["yml", "yaml"] }).map((f) => [f, readFileSync(f, "utf8")]),
);

function plant(from: string, to: string): string {
  expect(real.split(from).length - 1, `anchor found once: ${from}`).toBe(1);
  return real.replace(from, to);
}

describe("the repeat lane (DEC-283)", () => {
  it("RPL-1 the real workflow keeps every rule of the repeat lane", () => {
    expect(repeatLaneFindings(real)).toEqual([]);
    expect(mergedReportFindings(realCi)).toEqual([]);
    expect(inlineCapFindings(allWorkflows)).toEqual([]);
  });

  it("RPL-2 a planted copy breaking each rule is named", () => {
    const cases: Array<[string, string, string]> = [
      ["            repeat,\n", "", "the matrix has no repeat lane"],
      [", 'repeat']", "]", "the summary's lane list leaves repeat out"],
      ["(smoke|email|repeat|", "(smoke|email|", "the summary's evidence pattern leaves repeat out"],
      ["14,15,16,repeat?\n", "14,15,16\n", "the reporter's expected sources leave repeat out"],
      [
        '--repeat-each "$REPEAT_EACH" --retries 0',
        '--repeat-each "$REPEAT_EACH" --retries 2',
        "the repeat lane's run lacks --retries 0",
      ],
      [
        ' --global-timeout "$REPEAT_GLOBAL_TIMEOUT_MS"',
        "",
        "the repeat lane's run lacks the global time cap",
      ],
      [
        "      - name: Start backend and apply all migrations\n        if: matrix.lane != 'repeat' || env.REPEAT_SPECS != ''\n",
        "      - name: Start backend and apply all migrations\n",
        "a step lacks the empty-selection skip condition",
      ],
    ];
    for (const [from, to, named] of cases) {
      const findings = repeatLaneFindings(plant(from, to));
      expect(
        findings.some((f) => f.startsWith(named)),
        `${named}: ${findings.join("; ")}`,
      ).toBe(true);
    }
    // INC-966: the merged report without repeat?, and an inline cap reading planted back.
    const ciFrom = "16,repeat?\n";
    expect(realCi.split(ciFrom).length - 1, "merged sources anchor found once").toBe(1);
    expect(mergedReportFindings(realCi.replace(ciFrom, "16\n"))).toEqual([
      "the merged report's expected sources leave repeat? out",
    ]);
    expect(mergedReportFindings(realCi.replace(ciFrom, "16,repeat\n"))).toHaveLength(1);
    const inline = {
      ...allWorkflows,
      [WORKFLOW]: `${real}\n# all('Timed out waiting' in e for e in errors)\n`,
    };
    expect(inlineCapFindings(inline)).toEqual([
      `an inline 'Timed out waiting' reading in ${WORKFLOW}`,
    ]);
    expect(
      repeatLaneFindings(real.replace("bun run scripts/ci/repeat-cap.ts", "python3 cap.py")),
    ).toContain("the cap is not read by scripts/ci/repeat-cap.ts");
    expect(
      repeatLaneFindings(
        real.replace("scripts/e2e-select.ts --repeat --ranks", "scripts/e2e-select.ts --repeat"),
      ),
    ).toContain("the selection does not read the selector's ranks");
    // The selection moved after the backend's start.
    const steps = proofSteps(real);
    const select = steps.find((step) => step.text.includes(`name: ${SELECT}`));
    const start = steps.find((step) => step.text.includes("name: Start backend"));
    expect(select).toBeDefined();
    expect(start).toBeDefined();
    if (select === undefined || start === undefined) return;
    const moved = real.replace(select.text, "").replace(start.text, `${start.text}${select.text}`);
    expect(
      repeatLaneFindings(moved).some((f) => f.startsWith("the selection comes after a step")),
    ).toBe(true);
  });

  it("RPL-3 the repeat count fits the budget: six at most, never below two, the rest left out", () => {
    // REPEAT_BUDGET_SECONDS=720, REPEAT_SECONDS_PER_TEST=4.7 (C4).
    expect(repeatPlan(1, 720, 4.7)).toEqual({ each: 6, take: 1 });
    expect(repeatPlan(13, 720, 4.7)).toEqual({ each: 5, take: 13 });
    expect(repeatPlan(39, 720, 4.7)).toEqual({ each: 2, take: 38 });
    expect(repeatPlan(200, 720, 4.7)).toEqual({ each: 2, take: 38 });
  });
});
