import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  LANE_WORKERS,
  laneFilesOf,
  laneLine,
  listedTests,
  NIGHTLY_TAGS,
  ONE_WORKER_LANES,
  planLanes,
  planLine,
  readWeights,
  repeatBudget,
  SERIAL_GREP,
  SERIAL_TAGS,
  SPREAD_LIMIT,
  type ListedTest,
  type Plan,
} from "../ci/lane-plan";
import { LANE_PROJECTS, type Weights } from "../ci/lane-weights";
import { readAllowlist, report, walkFiles } from "./kit";
import {
  readerFindings,
  readManifest,
  sharedValueFindings,
  triggerFindings,
} from "./shared-values";

/**
 * The speed turn (DEC-375 b, DEC-376) — EVERY CHROMIUM TEST IN EXACTLY ONE LANE, SPLIT BY MEASURED
 * TIME. The mechanism is scripts/ci/lane-plan.ts over scripts/ci/lane-weights.json;
 * local-backend-proof.yml's "Run proof lane" step runs it.
 *
 * CF-LANES-1 lists every test (`playwright test --list --reporter=json` over mobile-360,
 * desktop-1280 and email-serial: it collects, it starts no browser, server or backend) and reads
 * the step's commands: each Chromium test runs in exactly one of lanes 1 → 16 (its file in one
 * lane's plan, outside the lanes' `--grep-invert` tags) or the serial lane (`smoke`, its `--grep`
 * tags); the email project's file runs in the email lane and in no numbered lane. A tag whose
 * tests run in no per-push lane is a line `@<tag> | reason | until` in lanes-allowlist.txt.
 * CF-LANES-2: the plan is deterministic, holds every file once, and its largest lane is within
 * SPREAD_LIMIT of the mean unless a file has that lane to itself (the plan's line names it).
 * CF-LANES-3: each lane's workers, read from the job's E2E_WORKERS and the step's `--workers=`:
 * LANE_WORKERS (two, DEC-378 a) in lanes 1 → 16, one in ONE_WORKER_LANES (smoke, email, webkit,
 * repeat).
 * CF-LANES-4 (the CI turn, DEC-378 a, INC-1136): no scratch row moves a shared value in a split
 * lane — every write site on a table of shared-value-tables.txt sits in a `@global-state` test or
 * a sanctioned helper, or is a line of shared-values-allowlist.txt; every table a migration gives a
 * statement-level trigger is on the manifest (shared-values.ts); every reader a "shared with its
 * readers" row names is a `@global-state` test of its file (the tests and CI turn 2, INC-1015).
 * CF-LANES-5 (DEC-415): the repeat lane's serial pass repeats the selected specs' `@global-state`
 * tests at one worker with the lane's own `--repeat-each`, and the planner's two lists keep out
 * the same tags as the two commands they count for.
 * CF-LANES-6 (INC-1231): the statement-trigger reader reads SQL as the migration reader does, so a
 * `--` inside a quoted literal hides no trigger and a comment after one still hides its own.
 * CF-LANES-7 (cursor-ci-speed): every lane and the repeat budget plan from the run's one copy of
 * the weights (backend-images reads it with scripts/ci/lane-weights-read.sh, installs nothing for
 * it, and cannot fail on it), and ci.yml publishes the run's own weights (weightsWiringFindings);
 * the repeat plan (`scripts/e2e-select.ts --repeat-plan`) reads the same copy.
 * CF-LANES-8 (cursor-bundle-8c-2a, INC-1333): the repeat lane's select step holds no literal seconds
 * a test: the plan costs every test in the run's measured seconds (literalSecondsFindings).
 */
type Finding = { file: string; line: number; what: string };
/** A coverage finding's allowlist key: `@<tag>` for a test every lane leaves out, else the test. */
type CoverageFinding = Finding & { key: string };

const ROOT = process.cwd();
const WORKFLOW = ".github/workflows/local-backend-proof.yml";
const ALLOWLIST = "scripts/conformance/lanes-allowlist.txt";
const MANIFEST = "scripts/conformance/shared-value-tables.txt";
const SHARED_ALLOWLIST = "scripts/conformance/shared-values-allowlist.txt";
const NUMBERED = Array.from({ length: 16 }, (_, i) => String(i + 1));

function listAll(): ListedTest[] {
  const run = spawnSync(
    "bunx",
    [
      "playwright",
      "test",
      "--list",
      "--reporter=json",
      "--project=mobile-360",
      "--project=desktop-1280",
      "--project=email-serial",
    ],
    { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
  const tests = run.status === 0 ? listedTests(run.stdout) : null;
  if (tests === null) throw new Error(`playwright --list failed: ${run.stderr.slice(0, 2000)}`);
  return tests;
}

/** The "Run proof lane" step's branches: `smoke`, `repeat`, `webkit`, `email` and `numbered`. */
export function laneBranches(yml: string): Map<string, { text: string; line: number }> {
  const lines = yml.split("\n");
  const start = lines.findIndex((line) => /^\s*- name: Run proof lane\s*$/.test(line));
  const branches = new Map<string, { text: string; line: number }>();
  if (start < 0) return branches;
  let indent: string | null = null;
  let current: string | null = null;
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i] ?? "";
    if (/^\s*- name: /.test(line)) break;
    const opened = /^(\s*)(?:if|elif) \[ "\$PROOF_LANE" = (\w+) \]; then\s*$/.exec(line);
    if (opened && (indent === null || opened[1] === indent)) {
      indent = opened[1] ?? "";
      current = opened[2] ?? null;
      if (current !== null) branches.set(current, { text: "", line: i + 1 });
      continue;
    }
    if (indent !== null && line === `${indent}else`) {
      current = "numbered";
      branches.set(current, { text: "", line: i + 1 });
      continue;
    }
    if (indent !== null && line === `${indent}fi`) break;
    const branch = current === null ? undefined : branches.get(current);
    if (branch !== undefined) branch.text += `${line}\n`;
  }
  return branches;
}

function tagsOf(argument: string | undefined): string[] {
  return (argument ?? "")
    .split("|")
    .map((tag) => tag.trim().replace(/^@/, ""))
    .filter((tag) => tag !== "")
    .sort();
}

/** Which tests each lane runs, as the step's commands select them. */
export function coverageFindings(
  tests: ListedTest[],
  laneLists: string[][],
  serialTags: string[],
  invertTags: string[],
  emailRuns: boolean,
): CoverageFinding[] {
  const findings: CoverageFinding[] = [];
  const seen = new Set<string>();
  for (const test of tests) {
    const key = `${test.file} › ${test.title} [${test.project}]`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (test.project === "email-serial") {
      const numbered = laneLists.filter((files) => files.includes(test.file)).length;
      if (!emailRuns || numbered > 0)
        findings.push({
          key,
          file: test.file,
          line: 0,
          what: `${key} runs in ${emailRuns ? "the email lane and " : ""}${String(numbered)} numbered lane(s); the email lane alone must run it`,
        });
      continue;
    }
    if (!LANE_PROJECTS.some((project) => project === test.project)) continue;
    const serial = test.tags.some((tag) => serialTags.includes(tag)) ? 1 : 0;
    const inverted = test.tags.some((tag) => invertTags.includes(tag));
    const numbered = inverted ? 0 : laneLists.filter((files) => files.includes(test.file)).length;
    const leftOut = test.tags.find((tag) => invertTags.includes(tag) && !serialTags.includes(tag));
    if (serial + numbered !== 1)
      findings.push({
        key: serial + numbered === 0 && leftOut !== undefined ? `@${leftOut}` : key,
        file: test.file,
        line: 0,
        what: `${key} runs in ${String(serial + numbered)} lanes (serial ${String(serial)}, numbered ${String(numbered)})`,
      });
  }
  return findings;
}

/** The plan's spread: a lane over the mean by more than SPREAD_LIMIT with no file alone in it. */
export function spreadFindings(plan: Plan): Finding[] {
  return plan.lanes
    .filter((lane) => lane.seconds > plan.mean * (1 + SPREAD_LIMIT))
    .filter((lane) => !lane.files.some((file) => plan.alone.includes(file)))
    .map((lane) => ({
      file: "scripts/ci/lane-plan.ts",
      line: lane.lane,
      what: `lane ${String(lane.lane)} plans ${String(lane.seconds)} s, over the mean ${String(plan.mean)} s by more than ${String(SPREAD_LIMIT * 100)} %`,
    }));
}

/** The matrix's lanes, in order. */
function matrixLanes(yml: string): string[] {
  const match = /\n\s*lane:\s*\n\s*\[([^\]]*)\]/.exec(yml);
  return (match?.[1] ?? "")
    .split(",")
    .map((lane) => lane.trim().replace(/^"|"$/g, ""))
    .filter((lane) => lane !== "");
}

/** Each lane's workers: the job's E2E_WORKERS for that lane, or a run's `--workers=` in its branch. */
export function workersByLane(yml: string): Map<string, number | null> {
  const lanes = matrixLanes(yml);
  const plain = /\n\s*E2E_WORKERS:\s*"(\d+)"/.exec(yml);
  const chosen =
    /\n\s*E2E_WORKERS:\s*\$\{\{\s*\(([^)]*)\)\s*&&\s*'(\d+)'\s*\|\|\s*'(\d+)'\s*\}\}/.exec(yml);
  const named = chosen
    ? [...(chosen[1] ?? "").matchAll(/matrix\.lane == '([^']+)'/g)].map((m) => m[1])
    : [];
  const branches = laneBranches(yml);
  const workers = new Map<string, number | null>();
  for (const lane of lanes) {
    let value: number | null = null;
    if (plain) value = Number(plain[1]);
    else if (chosen) value = Number(named.includes(lane) ? chosen[2] : chosen[3]);
    const branch = branches.get(NUMBERED.includes(lane) ? "numbered" : lane);
    // DEC-415: a branch may run twice (the repeat lane's two passes); the lane runs the most
    // workers any of its runs takes, each run's own `--workers=` or else the job's.
    const runs = (branch?.text ?? "")
      .split("\n")
      .filter((line) => /playwright test\b/.test(line) && !line.includes("--list"))
      .map((line) => {
        const flag = /--workers=(\d+)/.exec(line);
        return flag ? Number(flag[1]) : value;
      });
    const read = runs.filter((run): run is number => run !== null);
    if (runs.length > 0) value = read.length === runs.length ? Math.max(...read) : null;
    workers.set(lane, value);
  }
  return workers;
}

/** The workers a lane must run: one in ONE_WORKER_LANES, LANE_WORKERS in every lane the plan splits. */
function expectedWorkers(lane: string): number {
  return ONE_WORKER_LANES.some((name) => name === lane) ? 1 : LANE_WORKERS;
}

export function workerFindings(yml: string): Finding[] {
  const findings: Finding[] = [];
  for (const [lane, value] of workersByLane(yml)) {
    const expected = expectedWorkers(lane);
    if (value !== expected)
      findings.push({
        file: WORKFLOW,
        line: 0,
        what: `lane ${lane} runs ${value === null ? "an unread number of" : String(value)} worker(s); expected ${String(expected)}`,
      });
  }
  return findings;
}

const SELECT_STEP = "- name: Select the specs to repeat (DEC-283)";
const CHROMIUM_PAIR = "--project=mobile-360 --project=desktop-1280";

function argOf(command: string, flag: "--grep" | "--grep-invert"): string[] {
  return tagsOf(new RegExp(`${flag} "([^"]+)"`).exec(command)?.[1]);
}

/** The repeat lane's planner: the select step's `playwright test --list` lines over `$specs`. */
function plannerLists(yml: string): string[] {
  const at = yml.indexOf(SELECT_STEP);
  if (at < 0) return [];
  const end = yml.indexOf("\n      - name: ", at + SELECT_STEP.length);
  return yml
    .slice(at, end < 0 ? undefined : end)
    .split("\n")
    .filter((line) => /playwright test --list\b/.test(line) && line.includes("$specs"));
}

/**
 * DEC-415 — the repeat lane's two passes: the parallel pass, then a serial pass for `@global-state`
 * at one worker with the lane's own `--repeat-each`; the planner counts what each pass runs, its
 * filters keeping out the same tags as the commands they count for.
 */
export function repeatPassFindings(yml: string): string[] {
  const findings: string[] = [];
  const branch = laneBranches(yml).get("repeat")?.text ?? "";
  const commands = branch
    .split("\n")
    .filter((line) => /playwright test\b/.test(line) && !line.includes("--list"));
  const serial = commands.find((line) => argOf(line, "--grep").includes("global-state"));
  const parallel = commands.find((line) => line !== serial);
  if (parallel === undefined) findings.push("the repeat lane has no parallel pass");
  else if (!parallel.includes('--grep "$REPEAT_GREP"'))
    findings.push('the parallel pass does not run the plan\'s tests (--grep "$REPEAT_GREP")');
  if (serial === undefined) findings.push("the repeat lane has no serial pass for @global-state");
  else {
    if (argOf(serial, "--grep").join("|") !== "global-state")
      findings.push("the serial pass runs more than the @global-state tests");
    if (!serial.includes(CHROMIUM_PAIR)) findings.push("the serial pass is not the Chromium pair");
    if (!/--workers=1\b/.test(serial)) findings.push("the serial pass is not at one worker");
    if (!serial.includes('--repeat-each "$REPEAT_EACH"'))
      findings.push("the serial pass's count is not the lane's --repeat-each");
    if (!/--retries 0\b/.test(serial)) findings.push("the serial pass lacks --retries 0");
    if (!/--global-timeout\b/.test(serial)) findings.push("the serial pass has no time cap");
    if (!serial.includes("$REPEAT_SERIAL_SPECS"))
      findings.push("the serial pass is not on the selected specs");
    if (!/bun run scripts\/ci\/repeat-cap\.ts --merge\b/.test(branch))
      findings.push("the serial pass's results are not joined to the parallel pass's");
  }
  const lists = plannerLists(yml);
  const parallelList = lists.find((line) => !/--grep "/.test(line));
  const serialList = lists.find((line) => argOf(line, "--grep").includes("global-state"));
  const agree = (pass: string, list: string | undefined, command: string | undefined) => {
    if (command === undefined) return;
    if (list === undefined) {
      findings.push(`the planner counts without the ${pass} pass`);
      return;
    }
    // The parallel pass's `--grep` is the plan's own (the ids and files it chose, INC-1311).
    for (const flag of ["--grep", "--grep-invert"] as const)
      if (
        !(pass === "parallel" && flag === "--grep") &&
        argOf(list, flag).join("|") !== argOf(command, flag).join("|")
      )
        findings.push(`the planner's ${flag} for the ${pass} pass differs from its command's`);
  };
  agree("parallel", parallelList, parallel);
  agree("serial", serialList, serial);
  if (parallel !== undefined && serial !== undefined) {
    const out = argOf(parallel, "--grep-invert").filter((tag) => tag !== "global-state");
    if (argOf(serial, "--grep-invert").join("|") !== out.join("|"))
      findings.push("the two passes do not keep out the same tags besides @global-state");
  }
  return findings;
}

/**
 * CF-LANES-8 (cursor-bundle-8c-2a, INC-1333) — the repeat lane's select step plans in measured
 * seconds: it holds no assignment of a number to a seconds-a-test variable and no number written
 * before `s a test`, and it plans with `scripts/e2e-select.ts --repeat-plan` (the weights'
 * costs, scripts/ci/lane-plan.ts), never with a figure of its own.
 */
export function literalSecondsFindings(yml: string): string[] {
  const at = yml.indexOf(SELECT_STEP);
  if (at < 0) return ["the workflow has no select step"];
  const end = yml.indexOf("\n      - name: ", at + SELECT_STEP.length);
  const step = yml.slice(at, end < 0 ? undefined : end);
  const findings: string[] = [];
  for (const line of step.split("\n")) {
    const code = line.replace(/^\s*#.*$/, "");
    const assigned = /\b(\w*(?:SECONDS|SECS)_(?:PER|A)_\w*)=(\d[\d.]*)/.exec(code);
    if (assigned !== null)
      findings.push(
        `the select step sets a literal seconds a test: \`${assigned[1] ?? ""}=${assigned[2] ?? ""}\``,
      );
    const written = /(\d[\d.]*) s a test/.exec(code);
    if (written !== null)
      findings.push(`the select step names a literal \`${written[1] ?? ""} s a test\``);
  }
  if (!/\bbun scripts\/e2e-select\.ts --repeat-plan\b/.test(step))
    findings.push("the select step does not plan with `scripts/e2e-select.ts --repeat-plan`");
  return findings;
}

function laneLists(plan: Plan): string[][] {
  return plan.lanes.map((lane) => lane.files);
}

const CI_WORKFLOW = ".github/workflows/ci.yml";
const WEIGHTS_COPY = '"$RUNNER_TEMP/lane-weights.json"';
const WEIGHTS_WRITE = `printf '%s' "$LANE_WEIGHTS" > ${WEIGHTS_COPY}`;
const WEIGHTS_ARGS = `--weights ${WEIGHTS_COPY} --weights-source "$LANE_WEIGHTS_SOURCE"`;
/** The lines CF-LANES-7 requires, each once, in local-backend-proof.yml. */
export const WEIGHTS_WIRING = [
  "      weights: ${{ steps.weights.outputs.weights }}",
  "      weights_source: ${{ steps.weights.outputs.weights_source }}",
  "      LANE_WEIGHTS: ${{ needs.backend-images.outputs.weights }}",
  "      LANE_WEIGHTS_SOURCE: ${{ needs.backend-images.outputs.weights_source }}",
];
/** The read step's own lines: it cannot fail the job, and reads with the run's token. */
export const WEIGHTS_STEP = [
  "        id: weights",
  "        continue-on-error: true",
  "          GH_TOKEN: ${{ github.token }}",
  "        run: bash scripts/ci/lane-weights-read.sh",
];

/**
 * CF-LANES-7 (cursor-ci-speed, ruling 1 decision 3) — every lane plans from the run's one copy of
 * the weights: the backend-images job reads it (a step that cannot fail the job) and hands it out,
 * every `lane-plan.ts` call takes it by `--weights` after writing it, and the merged job publishes
 * the run's own weights for the next run to read.
 */
export function weightsWiringFindings(proof: string, ci: string): string[] {
  const findings: string[] = [];
  const lines = proof.split("\n");
  for (const wanted of WEIGHTS_WIRING)
    if (lines.filter((line) => line === wanted).length !== 1)
      findings.push(
        `${WORKFLOW} holds \`${wanted.trim()}\` ${String(lines.filter((line) => line === wanted).length)} times, not once`,
      );
  const job = /\n {2}backend-images:\n([\s\S]*?)\n {2}\S/.exec(proof)?.[1] ?? "";
  const step =
    /\n( {6}- name: Read the lane weights[^\n]*\n(?: {8}[^\n]*\n)*)/.exec(job)?.[1] ?? "";
  if (step === "") findings.push("the weights are not read in the backend-images job");
  for (const wanted of WEIGHTS_STEP)
    if (step !== "" && !step.split("\n").includes(wanted))
      findings.push(`the weights' read step lacks \`${wanted.trim()}\``);
  if (/\n\s+- (?:uses: oven-sh\/setup-bun|name: Install)/.test(job))
    findings.push("the backend-images job installs something for the read");
  lines.forEach((line, i) => {
    if (!/\bbun scripts\/ci\/lane-plan\.ts\b/.test(line)) return;
    if (!line.includes(WEIGHTS_ARGS))
      findings.push(
        `${WORKFLOW}:${String(i + 1)} plans without the run's copy of the weights (${WEIGHTS_ARGS})`,
      );
    if (!lines.slice(Math.max(0, i - 3), i).some((before) => before.trim() === WEIGHTS_WRITE))
      findings.push(
        `${WORKFLOW}:${String(i + 1)} plans before writing the copy (${WEIGHTS_WRITE})`,
      );
  });
  if (!lines.some((line) => /\bbun scripts\/ci\/lane-plan\.ts\b/.test(line)))
    findings.push(`${WORKFLOW} calls no lane plan`);
  // The repeat plan (INC-1333) reads the same copy: after it was written, with the same arguments.
  const written = lines.findIndex((line) => line.trim() === WEIGHTS_WRITE);
  lines.forEach((line, i) => {
    if (!/\bbun scripts\/e2e-select\.ts --repeat-plan\b/.test(line)) return;
    if (!line.includes(WEIGHTS_ARGS))
      findings.push(
        `${WORKFLOW}:${String(i + 1)} plans the repeat without the run's copy of the weights (${WEIGHTS_ARGS})`,
      );
    if (written < 0 || written > i)
      findings.push(`${WORKFLOW}:${String(i + 1)} plans the repeat before writing the copy`);
  });
  if (
    !/publish-evidence\.sh "ci: e2e failure report[^\n]*\n[^\n]*docs\/tracking\/lane-weights\.json/.test(
      ci,
    )
  )
    findings.push(
      `${CI_WORKFLOW} does not publish docs/tracking/lane-weights.json with the E2E evidence`,
    );
  return findings;
}

const yml = readFileSync(join(ROOT, WORKFLOW), "utf8");

describe("every Chromium test in exactly one lane, by measured time (DEC-375 b, DEC-376)", () => {
  const tests = listAll();
  const weights = readWeights();
  const plan = planLanes(laneFilesOf(tests), weights);
  const branches = laneBranches(yml);
  const serialArg = /--grep "([^"]+)"/.exec(branches.get("smoke")?.text ?? "")?.[1];
  const invertArg = /--grep-invert "([^"]+)"/.exec(branches.get("numbered")?.text ?? "")?.[1];

  it("CF-LANES-1 every Chromium test runs in exactly one of lanes 1 → 16 and the serial lane", () => {
    expect([...branches.keys()].sort()).toEqual(["email", "numbered", "repeat", "smoke", "webkit"]);
    const smoke = branches.get("smoke")?.text ?? "";
    const numbered = branches.get("numbered")?.text ?? "";
    expect(serialArg).toBe(SERIAL_GREP);
    expect(tagsOf(invertArg)).toEqual([...SERIAL_TAGS, ...NIGHTLY_TAGS].sort());
    for (const text of [smoke, numbered])
      expect(text).toContain("--project=mobile-360 --project=desktop-1280");
    expect(numbered).toContain("--test-list");
    expect(numbered).not.toContain("--shard");
    expect(smoke).not.toMatch(/\.spec\.ts/);
    const emailRuns = /--project=email-serial/.test(branches.get("email")?.text ?? "");
    expect(tests.some((test) => test.project === "email-serial")).toBe(true);
    const found = coverageFindings(
      tests,
      laneLists(plan),
      tagsOf(serialArg),
      tagsOf(invertArg),
      emailRuns,
    );
    const allowed = readAllowlist(
      join(ROOT, ALLOWLIST),
      found.map((finding) => finding.key),
    );
    expect(report(found.filter((finding) => !allowed.has(finding.key)))).toBe("");
    expect([...allowed.keys()]).toEqual([]);
    expect(found).toEqual([]);

    // Planted: a file in no list, a file in two, an @a11y or @global-state test in none, an email
    // file in a lane.
    const [first, second] = plan.lanes;
    const moved = first?.files[0] ?? "";
    const dropped = laneLists(plan).map((files) => files.filter((file) => file !== moved));
    expect(
      report(coverageFindings(tests, dropped, tagsOf(serialArg), tagsOf(invertArg), emailRuns)),
    ).toContain(`${moved} › `);
    const twice = laneLists(plan).map((files, i) => (i === 1 ? [...files, moved] : files));
    expect(second).toBeDefined();
    expect(
      report(coverageFindings(tests, twice, tagsOf(serialArg), tagsOf(invertArg), emailRuns)),
    ).toContain("runs in 2 lanes (serial 0, numbered 2)");
    const noSerial = coverageFindings(tests, laneLists(plan), [], tagsOf(invertArg), emailRuns);
    for (const tag of ["@a11y", "@global-state"]) {
      const inNone = noSerial.filter((finding) => finding.key === tag);
      expect(inNone.length, `${tag}: a test in no lane is found`).toBeGreaterThan(0);
      expect(inNone.every((finding) => finding.what.includes("runs in 0 lanes"))).toBe(true);
    }
    const emailFile = tests.find((test) => test.project === "email-serial")?.file ?? "";
    const withEmail = laneLists(plan).map((files, i) => (i === 0 ? [...files, emailFile] : files));
    expect(
      report(coverageFindings(tests, withEmail, tagsOf(serialArg), tagsOf(invertArg), emailRuns)),
    ).toContain("the email lane alone must run it");
  });

  it("CF-LANES-2 the plan is deterministic, holds every file once and keeps the spread", () => {
    const files = laneFilesOf(tests);
    expect(planLanes([...files].reverse(), weights)).toEqual(plan);
    const planned = plan.lanes.flatMap((lane) => lane.files);
    expect([...planned].sort()).toEqual(files);
    expect(new Set(planned).size).toBe(planned.length);
    expect(plan.lanes.every((lane) => lane.files.length > 0)).toBe(true);
    expect(report(spreadFindings(plan))).toBe("");
    expect(repeatBudget(plan)).toBeGreaterThan(0);
    expect(laneLine(plan, 1)).toMatch(/^- Plan \(DEC-375 b\): lane 1 — \d+ files, \d+ s planned/);

    // Planted: a file three times the mean gets a lane to itself and is named; a skewed plan fails;
    // a file the weights do not hold is weighed by the median file.
    const heavy: Weights = {
      ...weights,
      files: {
        ...weights.files,
        "planted-heavy.spec.ts": { "mobile-360": { seconds: plan.mean * 48, tests: 1 } },
      },
    };
    const alone = planLanes([...files, "planted-heavy.spec.ts"], heavy);
    expect(alone.alone).toEqual(["planted-heavy.spec.ts"]);
    expect(alone.lanes.find((lane) => lane.files.includes("planted-heavy.spec.ts"))?.files).toEqual(
      ["planted-heavy.spec.ts"],
    );
    expect(planLine(alone)).toContain("alone: planted-heavy.spec.ts;");
    expect(report(spreadFindings(alone))).toBe("");
    const [one, two] = plan.lanes;
    if (one === undefined || two === undefined)
      throw new Error("the plan has fewer than two lanes");
    const skewed: Plan = {
      ...plan,
      lanes: [
        { ...one, files: [...one.files, ...two.files], seconds: one.seconds + two.seconds },
        ...plan.lanes.slice(2),
      ],
    };
    expect(report(spreadFindings(skewed))).toContain("lane 1 plans");
    const unweighed = planLanes([...files, "planted-new.spec.ts"], weights);
    expect(unweighed.unweighed).toEqual(["planted-new.spec.ts"]);
    expect(planLine(unweighed)).toContain("planted-new.spec.ts");
  });

  it("CF-LANES-3 lanes 1 → 16 run LANE_WORKERS (two, DEC-378 a); smoke, email, webkit and repeat run one", () => {
    const workers = workersByLane(yml);
    expect(LANE_WORKERS).toBe(2);
    expect([...ONE_WORKER_LANES]).toEqual(["smoke", "email", "webkit", "repeat"]);
    expect(report(workerFindings(yml))).toBe("");
    expect(workers.size).toBe(20);
    expect([...workers.values()].filter((value) => value === 2)).toHaveLength(16);

    // Planted: one worker job-wide (the knob before DEC-378 a); two job-wide (the smoke and email
    // branches keep their `--workers=1`, webkit and repeat do not); `--workers=1` on lanes 1 → 16.
    const chosen = /E2E_WORKERS: \$\{\{[^}]*\}\}/;
    expect(chosen.test(yml)).toBe(true);
    expect(workerFindings(yml.replace(chosen, 'E2E_WORKERS: "1"'))).toHaveLength(16);
    expect(
      workerFindings(yml.replace(chosen, 'E2E_WORKERS: "2"')).map((finding) => finding.what),
    ).toEqual([
      "lane webkit runs 2 worker(s); expected 1",
      "lane repeat runs 2 worker(s); expected 1",
    ]);
    const flagged = yml.replace(
      '--grep-invert "@global-state|@a11y" --test-list',
      '--grep-invert "@global-state|@a11y" --workers=1 --test-list',
    );
    expect(flagged).not.toBe(yml);
    expect(workerFindings(flagged)).toHaveLength(16);
  });

  it("CF-LANES-7 every lane and the repeat budget plan from the run's one copy of the weights, read in backend-images; the merged job publishes the run's own", () => {
    const ci = readFileSync(join(ROOT, CI_WORKFLOW), "utf8");
    expect(weightsWiringFindings(yml, ci)).toEqual([]);
    // Planted: the workflow as it stood at 5cfe8b0c2 (each lane read the committed file), a read
    // that can fail the job, a lane that plans before writing the copy, an unpublished copy.
    const base = yml.replaceAll(` ${WEIGHTS_ARGS}`, "").replaceAll(`${WEIGHTS_WRITE}\n`, "");
    const planted = weightsWiringFindings(base, ci);
    expect(planted.filter((line) => line.includes("plans without the run's copy"))).toHaveLength(2);
    expect(planted.filter((line) => line.includes("plans before writing the copy"))).toHaveLength(
      2,
    );
    expect(
      weightsWiringFindings(
        yml.replace(
          "        continue-on-error: true\n        env:\n          GH_TOKEN",
          "        env:\n          GH_TOKEN",
        ),
        ci,
      ),
    ).toEqual(["the weights' read step lacks `continue-on-error: true`"]);
    // The repeat plan reads the same copy (INC-1333): planted without it.
    const plan =
      '--weights "$RUNNER_TEMP/lane-weights.json" --weights-source "$LANE_WEIGHTS_SOURCE" --budget';
    expect(yml.split(plan).length - 1, "plan anchor found once").toBe(1);
    expect(
      weightsWiringFindings(yml.replace(plan, "--budget"), ci).map((line) =>
        line.replace(/^.*?:\d+ /, ""),
      ),
    ).toEqual([`plans the repeat without the run's copy of the weights (${WEIGHTS_ARGS})`]);
    expect(weightsWiringFindings(yml, ci.replace(" docs/tracking/lane-weights.json", ""))).toEqual([
      `${CI_WORKFLOW} does not publish docs/tracking/lane-weights.json with the E2E evidence`,
    ]);
  });

  it("CF-LANES-5 the repeat lane repeats the selected specs' @global-state tests in a serial pass the planner counts (DEC-415)", () => {
    expect(repeatPassFindings(yml)).toEqual([]);
    expect(plannerLists(yml)).toHaveLength(2);
    const commandLines = yml.split("\n").filter((line) => line.includes("--repeat-each"));
    const serialLine = commandLines.find((line) => line.includes('--grep "@global-state"'));
    const serialList = plannerLists(yml).find((line) => line.includes('--grep "@global-state"'));
    if (serialLine === undefined || serialList === undefined)
      throw new Error("the serial pass or its count is not in the workflow");
    const without = (line: string) => {
      expect(yml.split(line).length - 1, `anchor found once: ${line.trim()}`).toBe(1);
      return yml.replace(`${line}\n`, "");
    };

    // Planted: the serial pass removed; the planner counting without it; the pass at two workers
    // or with its own count; the planner keeping out another tag than the command.
    expect(repeatPassFindings(without(serialLine))).toEqual([
      "the repeat lane has no serial pass for @global-state",
    ]);
    expect(repeatPassFindings(without(serialList))).toEqual([
      "the planner counts without the serial pass",
    ]);
    const swap = (from: string, to: string) => {
      expect(serialLine.includes(from), from).toBe(true);
      return yml.replace(serialLine, serialLine.replace(from, to));
    };
    expect(repeatPassFindings(swap("--workers=1", "--workers=2"))).toEqual([
      "the serial pass is not at one worker",
    ]);
    expect(
      repeatPassFindings(
        yml.replace("scripts/ci/repeat-cap.ts --merge", "scripts/ci/repeat-cap.ts"),
      ),
    ).toEqual(["the serial pass's results are not joined to the parallel pass's"]);
    expect(repeatPassFindings(swap('--repeat-each "$REPEAT_EACH"', "--repeat-each 1"))).toEqual([
      "the serial pass's count is not the lane's --repeat-each",
    ]);
    expect(
      repeatPassFindings(swap('--grep-invert "@a11y"', '--grep-invert "@a11y|@webkit"')),
    ).toEqual([
      "the planner's --grep-invert for the serial pass differs from its command's",
      "the two passes do not keep out the same tags besides @global-state",
    ]);
    // INC-1311: the parallel pass runs the plan's own grep, and keeps out the planner's tags.
    const parallelLine = commandLines.find((line) => line.includes('--grep "$REPEAT_GREP"'));
    if (parallelLine === undefined) throw new Error("the parallel pass is not in the workflow");
    expect(
      repeatPassFindings(
        yml.replace(parallelLine, parallelLine.replace('--grep "$REPEAT_GREP" ', "")),
      ),
    ).toEqual(['the parallel pass does not run the plan\'s tests (--grep "$REPEAT_GREP")']);
    expect(
      repeatPassFindings(
        yml.replace(
          parallelLine,
          parallelLine.replace('--grep-invert "@global-state|@a11y"', '--grep-invert "@a11y"'),
        ),
      ),
    ).toEqual(["the planner's --grep-invert for the parallel pass differs from its command's"]);
  });

  it("CF-LANES-8 the repeat lane's select step holds no literal seconds a test: the plan costs every test in the run's measured seconds (INC-1333)", () => {
    expect(literalSecondsFindings(yml)).toEqual([]);
    // Planted: the select step at 3c9086dc0, which held `REPEAT_SECONDS_PER_TEST=4.7` (line 265) and
    // named it in the summary; and the plan's call taken out.
    const anchor = "          REPEAT_BUDGET_SECONDS=$(bun scripts/ci/lane-plan.ts";
    expect(yml.split(anchor).length - 1, "anchor found once").toBe(1);
    const base = yml.replace(anchor, `          REPEAT_SECONDS_PER_TEST=4.7\n${anchor}`);
    expect(literalSecondsFindings(base)).toEqual([
      "the select step sets a literal seconds a test: `REPEAT_SECONDS_PER_TEST=4.7`",
    ]);
    expect(
      literalSecondsFindings(yml.replace("--repeat-plan --ranks", "--repeat --ranks")),
    ).toEqual(["the select step does not plan with `scripts/e2e-select.ts --repeat-plan`"]);
    expect(
      literalSecondsFindings(
        yml.replace('--budget "$REPEAT_BUDGET_SECONDS"', "--budget 841 # at 4.7 s a test"),
      ),
    ).toEqual(["the select step names a literal `4.7 s a test`"]);
  });
});

describe("no scratch row moves a shared value in a split lane (DEC-378 a, INC-1136)", () => {
  const read = (path: string) => ({ path, text: readFileSync(join(ROOT, path), "utf8") });
  const manifest = readManifest(read(MANIFEST).text, MANIFEST);

  it("CF-LANES-4 every write to a shared-value table is serial, a sanctioned helper's or allowlisted; every statement trigger's table is on the manifest", () => {
    const specs = walkFiles(["e2e"], { ext: ["ts"] }).map(read);
    const found = sharedValueFindings(specs, manifest.shared);
    const allowed = readAllowlist(
      join(ROOT, SHARED_ALLOWLIST),
      found.map((finding) => finding.key),
    );
    expect(report(found.filter((finding) => !allowed.has(finding.key)))).toBe("");
    expect(manifest.shared.map((row) => row.table)).toEqual([
      "listing_packages",
      "languages",
      "job_pauses",
    ]);
    const defined = (name: string) =>
      specs.some(
        ({ text }) => text.includes(`function ${name}(`) || text.includes(`const ${name} =`),
      );
    const missing = manifest.shared.flatMap((row) =>
      row.helpers.filter((name) => !defined(name)).map((name) => `${row.table}: ${name}`),
    );
    expect(missing, "a sanctioned helper no file under e2e/ defines").toEqual([]);
    const migrations = walkFiles(["supabase/migrations"], { ext: ["sql"] }).map(read);
    expect(report(triggerFindings(migrations, manifest, MANIFEST))).toBe("");

    // INC-1015: a value shared with its readers — every named reader is a test there, serial.
    expect(manifest.readers.map((row) => row.table)).toEqual(["category_tree_pointers"]);
    expect(report(readerFindings(specs, manifest.readers, MANIFEST))).toBe("");
    const readersRow = (readers: string) =>
      readManifest(
        `category_tree_pointers | shared with its readers | why | ${readers}\n`,
        MANIFEST,
      ).readers;
    const readerSpec = {
      path: "e2e/planted-reader.spec.ts",
      text: [
        'test("RDP-1 measures the rail", async () => {});',
        'test("RDP-2 tagged", { tag: "@global-state" }, async () => {});',
        'test.describe("RDP serial @global-state", () => { test("RDP-3 in a tagged describe", async () => {}); });',
        "for (const h of [600, 800]) test(`RDP-4 at ${h}`, async () => {});",
        'for (const h of [600, 800]) test(`RDP-5 at ${h}`, { tag: "@global-state" }, async () => {});',
      ].join("\n"),
    };
    expect(
      report(
        readerFindings(
          [readerSpec],
          readersRow(
            ["RDP-1", "RDP-2", "RDP-3", "RDP-4", "RDP-5", "RDP-9"]
              .map((id) => `${readerSpec.path}::${id}`)
              .join(", "),
          ),
          MANIFEST,
        ),
      ).split("\n"),
    ).toEqual(
      [
        `${MANIFEST}:1 category_tree_pointers names e2e/planted-reader.spec.ts::RDP-9 as a reader, but no test of that id is there (stale)`,
        `e2e/planted-reader.spec.ts:1 RDP-1 reads category_tree_pointers's shared value (${MANIFEST}:1) outside @global-state`,
        `e2e/planted-reader.spec.ts:4 RDP-4 reads category_tree_pointers's shared value (${MANIFEST}:1) outside @global-state`,
      ].sort(),
    );
    expect(() => readersRow("SMN-E13")).toThrow(/a reader line is not "file::test id"/);
    expect(() => readersRow("e2e/submenu-look.spec.ts::SMN-E13,")).toThrow(
      /a reader line is not "file::test id"/,
    );

    // Planted: an untagged writer, a helper's caller and a door's caller are found; a tagged test,
    // a tagged describe and a sanctioned helper's caller are not.
    const planted = [
      {
        path: "e2e/helpers/planted-writer.ts",
        text: [
          'export async function seedLevel() { await adminClient().from("listing_packages").update({ sort: 0 }).eq("key", "k"); }',
          'export async function ensureFenceLanguage(code: string) { await adminClient().from("languages").upsert({ code }); }',
        ].join("\n"),
      },
      {
        path: "e2e/planted-writer.spec.ts",
        text: [
          'import { ensureFenceLanguage, seedLevel } from "./helpers/planted-writer";',
          'test("SVP-1 writes a level", async () => { await adminClient().from("listing_packages").insert({ key: "k" }); });',
          'test("SVP-2 tagged", { tag: "@global-state" }, async () => { await adminClient().from("languages").update({}).eq("code", "x"); });',
          'test("SVP-3 through a helper", async () => { await seedLevel(); });',
          'test("SVP-4 a sanctioned helper", async () => { await ensureFenceLanguage("zxx1"); });',
          'test("SVP-5 a door", async () => { await adminClient().rpc("job_pause_set", {}); });',
          'test.describe("SVP serial @global-state", () => { test("SVP-6 in a tagged describe", async () => { await seedLevel(); }); });',
          "function seedLevelHere() { return 0; }",
          'test("SVP-7 a same-named function elsewhere", async () => { seedLevelHere(); });',
        ].join("\n"),
      },
      {
        path: "e2e/unrelated.spec.ts",
        text: 'function seedLevel() { return 1; }\ntest("SVU-1 its own seedLevel", async () => { seedLevel(); });',
      },
    ];
    expect(
      sharedValueFindings(planted, manifest.shared)
        .map((finding) => finding.key)
        .sort(),
    ).toEqual([
      "e2e/planted-writer.spec.ts::SVP-1::listing_packages",
      "e2e/planted-writer.spec.ts::SVP-3::listing_packages",
      "e2e/planted-writer.spec.ts::SVP-5::job_pauses",
    ]);

    // Planted: a stale allowlist line fails.
    const scratch = mkdtempSync(join(tmpdir(), "cf-lanes-4-"));
    const stale = join(scratch, "shared-values-allowlist.txt");
    writeFileSync(stale, "e2e/gone.spec.ts::GONE-1::languages | planted | INC-1136\n");
    expect(() =>
      readAllowlist(
        stale,
        found.map((finding) => finding.key),
      ),
    ).toThrow(/stale allowance/);
    rmSync(scratch, { recursive: true, force: true });

    // Planted: a statement trigger on an unlisted table is found, a commented one is not; a
    // "read, not shared" line with no trigger is stale; a malformed line throws.
    const trigger = {
      path: "supabase/migrations/planted.sql",
      text: [
        "-- CREATE TRIGGER t0 AFTER INSERT ON public.commented FOR EACH STATEMENT EXECUTE FUNCTION f();",
        "CREATE TRIGGER t1",
        "  AFTER INSERT OR DELETE ON public.planted_counts",
        "  FOR EACH STATEMENT EXECUTE FUNCTION public.f();",
      ].join("\n"),
    };
    expect(report(triggerFindings([trigger], manifest, MANIFEST)).split("\n")).toEqual(
      [
        ...manifest.readOnly.map(
          (row) =>
            `${MANIFEST}:${String(row.line)} ${row.table} is "read, not shared" but carries no statement-level trigger (stale)`,
        ),
        'supabase/migrations/planted.sql:2 public.planted_counts carries a statement-level trigger; the manifest names it neither shared nor "read, not shared"',
      ].sort(),
    );
    expect(() => readManifest("languages | why | -\n", "planted.txt")).toThrow(/planted.txt:1/);
  });

  it("CF-LANES-6 a `--` inside a literal hides no statement trigger; a comment after one hides its own (INC-1231)", () => {
    const planted = {
      path: "supabase/migrations/planted-literal.sql",
      text: [
        "INSERT INTO public.notes (body) VALUES ('--'); CREATE TRIGGER t2 AFTER INSERT ON public.planted_literal FOR EACH STATEMENT EXECUTE FUNCTION public.f();",
        "INSERT INTO public.notes (body) VALUES ('x'); -- CREATE TRIGGER t3 AFTER INSERT ON public.planted_comment FOR EACH STATEMENT EXECUTE FUNCTION public.f();",
      ].join("\n"),
    };
    const found = triggerFindings([planted], manifest, MANIFEST)
      .filter((finding) => finding.file === planted.path)
      .map((finding) => `${finding.file}:${String(finding.line)} ${finding.what}`);
    expect(found).toEqual([
      'supabase/migrations/planted-literal.sql:1 public.planted_literal carries a statement-level trigger; the manifest names it neither shared nor "read, not shared"',
    ]);
  });
});
