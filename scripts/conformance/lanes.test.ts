import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  LANE_WORKERS,
  laneFilesOf,
  laneLine,
  listedTests,
  NIGHTLY_TAGS,
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
import { readAllowlist, report } from "./kit";

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
 * LANE_WORKERS in every lane (DEC-376's count restarted at one on the speed turn's first run).
 */
type Finding = { file: string; line: number; what: string };
/** A coverage finding's allowlist key: `@<tag>` for a test every lane leaves out, else the test. */
type CoverageFinding = Finding & { key: string };

const ROOT = process.cwd();
const WORKFLOW = ".github/workflows/local-backend-proof.yml";
const ALLOWLIST = "scripts/conformance/lanes-allowlist.txt";
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

/** Each lane's workers: the job's E2E_WORKERS for that lane, then a `--workers=` in its branch. */
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
    const flag = branch === undefined ? null : /--workers=(\d+)/.exec(branch.text);
    if (flag) value = Number(flag[1]);
    workers.set(lane, value);
  }
  return workers;
}

export function workerFindings(yml: string, expected: number = LANE_WORKERS): Finding[] {
  const findings: Finding[] = [];
  for (const [lane, value] of workersByLane(yml)) {
    if (value !== expected)
      findings.push({
        file: WORKFLOW,
        line: 0,
        what: `lane ${lane} runs ${value === null ? "an unread number of" : String(value)} worker(s); expected ${String(expected)}`,
      });
  }
  return findings;
}

function laneLists(plan: Plan): string[][] {
  return plan.lanes.map((lane) => lane.files);
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
    expect([...allowed.keys()]).toEqual(["@global-state"]);
    expect(found.length).toBeGreaterThan(0);
    expect(found.every((finding) => finding.what.includes("runs in 0 lanes"))).toBe(true);

    // Planted: a file in no list, a file in two, an @a11y test in none, an email file in a lane.
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
    const a11y = noSerial.filter((finding) => finding.key === "@a11y");
    expect(a11y.length).toBeGreaterThan(0);
    expect(a11y.every((finding) => finding.what.includes("runs in 0 lanes"))).toBe(true);
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

  it("CF-LANES-3 every lane runs LANE_WORKERS workers (one: DEC-376's count restarted)", () => {
    const workers = workersByLane(yml);
    expect(LANE_WORKERS).toBe(1);
    expect(report(workerFindings(yml))).toBe("");
    expect(workers.size).toBe(20);

    // Planted: DEC-376's two workers job-wide; a `--workers=2` on the numbered lanes.
    const twoWorkers = yml.replace(/\n(\s*)E2E_WORKERS: "1"/, '\n$1E2E_WORKERS: "2"');
    expect(twoWorkers).not.toBe(yml);
    expect(workerFindings(twoWorkers)).toHaveLength(18);
    const flagged = yml.replace(
      '--grep-invert "@global-state|@a11y" --test-list',
      '--grep-invert "@global-state|@a11y" --workers=2 --test-list',
    );
    expect(workerFindings(flagged)).toHaveLength(16);
  });
});
