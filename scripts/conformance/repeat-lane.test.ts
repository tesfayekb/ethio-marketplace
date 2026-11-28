import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { listedTests } from "../ci/lane-plan";
import { parseWeights } from "../ci/lane-weights";
import {
  changedIds,
  planRepeat,
  repeatEvidence,
  repeatGrep,
  repeatUnits,
  type RankedSpec,
  type RepeatUnit,
} from "../e2e-select";
import { repeatLines } from "../e2e-failure-report";
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
 * Cursor bundle 8c-2a (INC-1333, INC-1311): the plan costs every test in the run's measured seconds
 * (RPL-3 the count's bounds, RPL-4 the plan on a captured list and the run's weights).
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

/**
 * INC-1124 (the pictures turn, ruling 2) — THE LANE MATRIX IS THE ONE LIST. The second lane a list that
 * reads lanes missed (INC-966: `repeat`; then `webkit`). Every reader equals the matrix of
 * local-backend-proof.yml in order: the summary's `lanes = [...]`, the lane reporter's
 * `E2E_EXPECTED_SOURCES` and the merged report's in ci.yml (both write the repeat lane `repeat?`).
 * The summary's evidence pattern is a regular expression, whose alternation order means nothing (and
 * RPL-2 anchors its `(smoke|email|repeat|`), so it holds the same lanes in any order.
 */
function matrixLanes(text: string): string[] {
  const matrix = /lane:\s*\[([\s\S]*?)\]/.exec(text)?.[1] ?? "";
  return matrix
    .split(",")
    .map((item) => item.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
}

function summaryLanes(text: string): string[] {
  const list = /^\s*lanes = \[(.*)\]\s*$/m.exec(text)?.[1] ?? "";
  const items: string[] = [];
  let depth = 0;
  let item = "";
  for (const ch of list) {
    if (ch === "," && depth === 0) {
      items.push(item);
      item = "";
      continue;
    }
    if (ch === "(") depth += 1;
    if (ch === ")") depth -= 1;
    item += ch;
  }
  items.push(item);
  return items.flatMap((entry) => {
    const range = /^\*map\(str, range\((\d+), (\d+)\)\)$/.exec(entry.trim());
    if (range === null) return [entry.trim().replace(/^'|'$/g, "")];
    const from = Number(range[1]);
    return Array.from({ length: Number(range[2]) - from }, (_, i) => String(from + i));
  });
}

function evidenceLanes(text: string): string[] {
  const group = /- Lane: \(([^)]*)\)/.exec(text)?.[1] ?? "";
  return group.split("|").flatMap((alt) => {
    const digits = /^(\d*)\[(\d)-(\d)\]$/.exec(alt);
    if (digits === null) return [alt];
    const [, head = "", low = "0", high = "0"] = digits;
    return Array.from(
      { length: Number(high) - Number(low) + 1 },
      (_, i) => `${head}${Number(low) + i}`,
    );
  });
}

function mergedStep(ciText: string): string {
  const at = ciText.indexOf(MERGED);
  return at < 0 ? "" : ciText.slice(at, ciText.indexOf("\n      - name:", at + 1) >>> 0);
}

function sourcesOf(text: string): string[] {
  return (/E2E_EXPECTED_SOURCES:\s*(\S+)/.exec(text)?.[1] ?? "").split(",").filter(Boolean);
}

export function laneListFindings(text: string, ciText: string): string[] {
  const lanes = matrixLanes(text);
  if (lanes.length === 0) return ["the workflow has no lane matrix"];
  const findings: string[] = [];
  const judge = (reader: string, got: string[], ordered: boolean) => {
    for (const lane of lanes)
      if (!got.includes(lane)) findings.push(`${reader} leaves out the lane ${lane}`);
    for (const lane of got)
      if (!lanes.includes(lane)) findings.push(`${reader} names ${lane}, no lane of the matrix`);
    const same = got.length === lanes.length && got.every((lane) => lanes.includes(lane));
    if (ordered && same && got.some((lane, i) => lane !== lanes[i]))
      findings.push(`${reader} lists the lanes out of the matrix's order`);
  };
  const asSources = (reader: string, sources: string[]) => {
    for (const source of sources)
      if (source.replace(/\?$/, "") === "repeat" && source !== "repeat?")
        findings.push(`${reader} writes the repeat lane as ${source}, not repeat?`);
    judge(
      reader,
      sources.map((s) => s.replace(/\?$/, "")),
      true,
    );
  };
  judge("the summary's lane list", summaryLanes(text), true);
  judge("the summary's evidence pattern", evidenceLanes(text), false);
  asSources("the lane reporter's expected sources", sourcesOf(text));
  asSources("the merged report's expected sources (ci.yml)", sourcesOf(mergedStep(ciText)));
  return findings;
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
        '--grep-invert "@global-state|@a11y" --repeat-each "$REPEAT_EACH" --retries 0',
        '--grep-invert "@global-state|@a11y" --repeat-each "$REPEAT_EACH" --retries 2',
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
      repeatLaneFindings(real.replaceAll("bun run scripts/ci/repeat-cap.ts", "python3 cap.py")),
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

  it("CF-CID-10 every list that reads lanes equals the lane matrix (INC-1124); a lane planted out of each of the four is named", () => {
    expect(matrixLanes(real)).toEqual([
      "smoke",
      "email",
      "webkit",
      ...Array.from({ length: 16 }, (_, i) => String(i + 1)),
      "repeat",
    ]);
    expect(laneListFindings(real, realCi)).toEqual([]);
    const cases: Array<[string, string, string]> = [
      [
        "'email', 'webkit', *map",
        "'email', *map",
        "the summary's lane list leaves out the lane webkit",
      ],
      [
        "|repeat|webkit|[1-9]",
        "|repeat|[1-9]",
        "the summary's evidence pattern leaves out the lane webkit",
      ],
      [
        "E2E_EXPECTED_SOURCES: smoke,email,webkit,1,",
        "E2E_EXPECTED_SOURCES: smoke,email,1,",
        "the lane reporter's expected sources leaves out the lane webkit",
      ],
    ];
    for (const [from, to, named] of cases)
      expect(laneListFindings(plant(from, to), realCi)).toEqual([named]);
    const ciFrom = "E2E_EXPECTED_SOURCES: smoke,email,webkit,1,";
    expect(realCi.split(ciFrom).length - 1, "merged sources anchor found once").toBe(1);
    expect(
      laneListFindings(real, realCi.replace(ciFrom, "E2E_EXPECTED_SOURCES: smoke,email,1,")),
    ).toEqual(["the merged report's expected sources (ci.yml) leaves out the lane webkit"]);
    expect(
      laneListFindings(real, realCi.replace(ciFrom, "E2E_EXPECTED_SOURCES: email,smoke,webkit,1,")),
    ).toEqual([
      "the merged report's expected sources (ci.yml) lists the lanes out of the matrix's order",
    ]);
    expect(laneListFindings(plant("            webkit,\n", ""), realCi)).toEqual([
      "the summary's lane list names webkit, no lane of the matrix",
      "the summary's evidence pattern names webkit, no lane of the matrix",
      "the lane reporter's expected sources names webkit, no lane of the matrix",
      "the merged report's expected sources (ci.yml) names webkit, no lane of the matrix",
    ]);
  });

  /** One test of its own spec, costed `seconds` for a repetition on both projects. */
  const flat = (count: number, seconds: number): RepeatUnit[] =>
    Array.from({ length: count }, (_, i) => ({
      spec: `e2e/t${i}.spec.ts`,
      title: `T-${i} a test`,
      ids: [`T-${i}`],
      serial: false,
      webkit: false,
      seconds,
      atMedian: 0,
    }));
  const planFlat = (count: number, budget: number) => {
    const units = flat(count, 9.4);
    const ranked = units.map((unit): RankedSpec => ({ spec: unit.spec, rank: 1 }));
    const choice = planRepeat({ ranked, units, budget, changedIds: new Set() });
    return { each: choice.each, take: choice.repeated };
  };

  it("RPL-3 the repeat count fits the budget: six at most, never below two, the rest left out", () => {
    // The count's bounds (C4) as the plan now computes them: a budget of 720 s and every test costing
    // 4.7 s on each of the two projects (9.4 s a repetition), the figure the lane used to assume.
    expect(planFlat(1, 720)).toEqual({ each: 6, take: 1 });
    expect(planFlat(13, 720)).toEqual({ each: 5, take: 13 });
    expect(planFlat(39, 720)).toEqual({ each: 2, take: 38 });
    expect(planFlat(200, 720)).toEqual({ each: 2, take: 38 });
    // Nothing selected plans nothing.
    expect(planFlat(0, 720)).toEqual({ each: 0, take: 0 });
  });

  const FIXTURES = "scripts/fixtures/repeat-lane";
  const fixture = (name: string) => readFileSync(`${FIXTURES}/${name}`, "utf8");
  /** The newest weights copy on the evidence branch when the brief was written (run 46081846257). */
  const WEIGHTS_SHA = "539169ec7171a7d794a675ce4501c5cbfe89f84622bb121eae19601339db8212";

  it("RPL-4 the plan fits its tests, at each repetitions, within the budget on measured seconds; a spec too large repeats the ids the push changed and names the rest (INC-1333, INC-1311)", () => {
    // I1: the 8c-1 merge's changed specs, listed at 3c9086dc0 (`playwright test --list
    // --reporter=json`, the lane's two lists), the merge's changed lines (`git diff -U0`), the
    // selector's ranks, and the run's weights, each copied by script.
    expect(
      createHash("sha256").update(fixture("lane-weights.46081846257.json")).digest("hex"),
    ).toBe(WEIGHTS_SHA);
    const weights = parseWeights(fixture("lane-weights.46081846257.json"));
    const parallel = listedTests(fixture("list.3c9086dc0.json"));
    const serial = listedTests(fixture("serial-list.3c9086dc0.json"));
    expect(weights).not.toBeNull();
    expect(parallel).not.toBeNull();
    expect(serial).not.toBeNull();
    if (weights === null || parallel === null || serial === null) return;
    const ranked = fixture("ranks.3c9086dc0.txt")
      .split("\n")
      .filter((line) => line !== "")
      .map((line): RankedSpec => {
        const [rank = "", spec = ""] = line.split(" ");
        return { spec, rank: rank === "1" ? 1 : 2 };
      });
    const units = repeatUnits(parallel, serial, weights);
    const ids = changedIds(fixture("changed-lines.3c9086dc0.diff"));
    expect(units).toHaveLength(62);
    // The merge's added lines name the two Errors tests' ids and the two crawl rows it added.
    expect(["ERB-1", "ERB-2", "FCR-79", "FCR-80"].filter((id) => ids.has(id))).toEqual([
      "ERB-1",
      "ERB-2",
      "FCR-79",
      "FCR-80",
    ]);
    expect(ids.has("FCR-78"), "FCR-78's row was not on a changed line").toBe(false);

    // The control: the base's plan took every selected test at two repetitions (its flat 4.7 s a
    // test); on the measured seconds that is 4528 s against a budget of 841 s — the run INC-1333
    // read was cut by Playwright's global timeout.
    const budget = 841;
    const everyTestTwice = units.reduce((sum, unit) => sum + unit.seconds, 0) * 2;
    expect(everyTestTwice).toBeGreaterThan(budget * 5);

    const choice = planRepeat({ ranked, units, budget, changedIds: ids });
    expect(choice.seconds * choice.each).toBeLessThanOrEqual(budget);
    expect(choice.each).toBeGreaterThanOrEqual(2);
    // Whole when it fits what is left, in the selector's order; the large crawl spec by its changed ids.
    expect(choice.whole).toEqual([
      "e2e/admin-errors.spec.ts",
      "e2e/failure-crawl-member-account.spec.ts",
      "e2e/failure-crawl-member-public.spec.ts",
    ]);
    expect(choice.byId).toEqual([
      {
        spec: "e2e/failure-crawl-admin-content.spec.ts",
        ids: ["FCR-79", "FCR-80"],
        taken: 2,
        of: 11,
      },
    ]);
    expect(choice.left).toEqual([
      { spec: "e2e/failure-crawl-admin-catalog.spec.ts", tests: 9 },
      { spec: "e2e/failure-crawl-admin-content.spec.ts", tests: 9 },
      { spec: "e2e/failure-crawl-admin-people.spec.ts", tests: 7 },
      { spec: "e2e/failure-crawl-member-listings.spec.ts", tests: 5 },
      { spec: "e2e/failure-crawl-public.spec.ts", tests: 13 },
    ]);
    expect([choice.selected, choice.repeated]).toEqual([62, 19]);
    // The changed crawl rows run without their whole spec: the plan's `--grep` names them by id.
    const grep = new RegExp(repeatGrep(choice));
    const text = (file: string, title: string) => `mobile-360 ${file} FAILURE CRAWL › ${title}`;
    expect(grep.test(text("failure-crawl-admin-content.spec.ts", "FCR-79 /admin/errors"))).toBe(
      true,
    );
    expect(grep.test(text("failure-crawl-admin-content.spec.ts", "FCR-78 /admin/x"))).toBe(false);
    expect(grep.test(text("failure-crawl-admin-content.spec.ts", "FCR-790 /admin/x"))).toBe(false);
    expect(grep.test(text("failure-crawl-member-account.spec.ts", "FCR-30 /account"))).toBe(true);
    expect(grep.test(text("x-failure-crawl-member-account.spec.ts", "FCR-30 /account"))).toBe(
      false,
    );

    // The evidence: each spec left out is a line, the by-id repeat and the cost are new lines, and the
    // summary keeps the grammar the evidence reader parses (REPEAT_SUMMARY).
    const lines = repeatEvidence(choice, { budget, weights, source: "the run's evidence copy" });
    expect(lines.filter((line) => line.startsWith("- Not repeated: "))).toEqual(
      choice.left.map((item) => `- Not repeated: ${item.spec} (${item.tests} tests)`),
    );
    expect(lines.filter((line) => line.startsWith("- Repeat by id: "))).toHaveLength(1);
    expect(lines.filter((line) => line.startsWith("- Repeat cost: "))).toHaveLength(1);
    expect(lines.at(-1)).toMatch(
      /^- Repeat: each 2 on both projects; 62 tests selected, 19 repeated; budget 841 s at 18\.6 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 3 of 7$/,
    );
    expect(
      repeatLines({ runId: "rpl-4", runUrl: "", sha: "rpl-4", repeatSelection: lines.join("\n") }),
    ).toEqual([
      "- Repeat: 19 of 62 tests repeated — specs directly changed 1/1, importers of a changed helper 3/7; budget 841 s",
    ]);

    // Every budget keeps the plan inside it, down to one that holds a single test: the changed ids
    // of a spec that does not fit are taken one by one while they fit.
    for (const tight of [841, 600, 300, 150, 100, 14, 7]) {
      const plan = planRepeat({ ranked, units, budget: tight, changedIds: ids });
      expect(plan.seconds * plan.each, `budget ${tight}`).toBeLessThanOrEqual(tight);
    }
    const one = planRepeat({ ranked, units, budget: 14, changedIds: ids });
    expect(one.byId).toEqual([
      { spec: "e2e/admin-errors.spec.ts", ids: ["ERB-1"], taken: 1, of: 2 },
    ]);
    expect(one.left.find((item) => item.spec === "e2e/admin-errors.spec.ts")).toEqual({
      spec: "e2e/admin-errors.spec.ts",
      tests: 1,
    });
  });
});
