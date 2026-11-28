import { spawnSync } from "node:child_process";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  chooseWeights,
  costPerTest,
  measuredSpreadLine,
  medianCost,
  readWeights,
} from "./lane-plan";
import {
  laneSeconds,
  NUMBERED_LANES,
  parseWeights,
  runWeights,
  weightsFrom,
  WEIGHTS_EVIDENCE,
  WEIGHTS_FILE,
} from "./lane-weights";

// DEC-375 (b), the speed turn — the lane plan's weights. The fixtures are two suites each of lanes
// 3 and 11's results.json from run 43431755160 (dev 203907b3d, every lane green), cut by script.
// cursor-ci-speed (LWM-3 → LWM-9): the run's own weights (the reporter), their measured spread, the
// backend-images job's read (scripts/ci/lane-weights-read.sh against a fake `gh`) and the lane's
// choice between that copy and the committed file.
const FIXTURES = "scripts/fixtures/lane-plan";
const read = (name: string): unknown => JSON.parse(readFileSync(`${FIXTURES}/${name}`, "utf8"));

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** The seconds and count the fixture holds for a file and project, read by a plain walk. */
function expected(results: unknown[], file: string, project: string) {
  let ms = 0;
  let tests = 0;
  const walk = (node: unknown, inFile: boolean): void => {
    if (Array.isArray(node)) {
      for (const item of node) walk(item, inFile);
      return;
    }
    if (!isObject(node)) return;
    const here = typeof node["file"] === "string" ? node["file"] === file : inFile;
    if (here && node["projectName"] === project && Array.isArray(node["results"])) {
      tests += 1;
      for (const attempt of node["results"])
        if (isObject(attempt) && typeof attempt["duration"] === "number") ms += attempt["duration"];
      return;
    }
    for (const value of Object.values(node)) walk(value, here);
  };
  walk(results, false);
  return { seconds: Math.round((ms / 1000) * 10) / 10, tests };
}

describe("the lane plan's weights (DEC-375 b)", () => {
  const results = [read("results-lane-3.json"), read("results-lane-11.json")];

  it("LWM-1 seconds and counts per spec file and Chromium project, with the run and its date", () => {
    const weights = weightsFrom(results, 43431755160);
    expect(weights.source).toEqual({ run: 43431755160, date: "2026-11-13", lanes: "1-16" });
    expect(Object.keys(weights.files)).toEqual([
      "admin-shell.spec.ts",
      "admin-translations-console.spec.ts",
      "admin-translations-data.spec.ts",
      "admin-translations-governance.spec.ts",
    ]);
    for (const [file, byProject] of Object.entries(weights.files))
      for (const project of ["mobile-360", "desktop-1280"]) {
        const want = expected(results, file, project);
        expect(byProject[project], `${file} ${project}`).toEqual(want.tests > 0 ? want : undefined);
      }
  });

  it("LWM-2 another project's tests are left out; the committed weights parse", () => {
    const planted = JSON.parse(
      JSON.stringify(results[0]).replaceAll(
        '"projectName":"desktop-1280"',
        '"projectName":"email-serial"',
      ),
    );
    const weights = weightsFrom([planted], 1);
    for (const byProject of Object.values(weights.files))
      expect(Object.keys(byProject)).toEqual(["mobile-360"]);
    const committed = parseWeights(readFileSync(WEIGHTS_FILE, "utf8"));
    expect(committed?.source).toEqual({ run: 43431755160, date: "2026-11-13", lanes: "1-16" });
    expect(Object.keys(committed?.files ?? {}).length).toBeGreaterThan(100);
    expect(parseWeights('{"source": {}, "files": {}}')).toBeNull();
  });
});

const roots: string[] = [];
afterEach(() => {
  for (const dir of roots.splice(0)) rmSync(dir, { recursive: true, force: true });
});
function scratch(name: string): string {
  const dir = mkdtempSync(join(tmpdir(), `${name}-`));
  roots.push(dir);
  return dir;
}

/**
 * Sixteen lanes' results: lane 1 the fixture's lane 11 (724 s), the rest its lane 3 (521 s), or with
 * `odd` every odd lane lane 11's.
 */
function sixteen(odd: boolean): Map<number, unknown> {
  const [slow, fast] = [read("results-lane-11.json"), read("results-lane-3.json")];
  const lanes = new Map<number, unknown>();
  for (let lane = 1; lane <= NUMBERED_LANES; lane += 1)
    lanes.set(lane, lane === 1 || (odd && lane % 2 === 1) ? slow : fast);
  return lanes;
}

describe("the lane weights a run reads and writes (cursor-ci-speed, DEC-375 b)", () => {
  const committed = readWeights();

  it("LWM-3 a lane plans from the run's evidence copy when it parses, otherwise from the committed file, and says which and why", () => {
    const copy = JSON.stringify(weightsFrom([read("results-lane-3.json")], 46000329861));
    const used = chooseWeights(
      copy,
      "docs/tracking/lane-weights.json at evidence abc123456 (run 46000329861; 0 of 2 files unread)",
    );
    expect(used.weights.source.run).toBe(46000329861);
    expect(used.source).toBe(
      "docs/tracking/lane-weights.json at evidence abc123456 (run 46000329861; 0 of 2 files unread)",
    );
    expect(chooseWeights("", "no weights file at evidence abc123456")).toEqual({
      weights: committed,
      source: `the committed ${WEIGHTS_FILE} — no weights file at evidence abc123456`,
    });
    expect(chooseWeights("", "").source).toBe(
      `the committed ${WEIGHTS_FILE} — the evidence read named no source`,
    );
    expect(chooseWeights('{"source": {}}', "x at evidence 1").source).toBe(
      `the committed ${WEIGHTS_FILE} — the evidence copy is not the weights shape (x at evidence 1)`,
    );
    expect(chooseWeights(null, "").source).toBe(
      `the committed ${WEIGHTS_FILE} — no evidence copy was given`,
    );
  });

  it("LWM-4 a run writes its weights only when its merged verdict is green and all sixteen lanes recorded results", () => {
    const lanes = sixteen(true);
    const written = runWeights(lanes, 46000329861, true);
    expect(written).toEqual({ weights: weightsFrom([...lanes.values()], 46000329861) });
    expect(runWeights(lanes, 46000329861, false)).toEqual({
      reason: "the merged verdict is not green",
    });
    expect(runWeights(lanes, Number.NaN, true)).toEqual({ reason: "the run has no id" });
    const holes = new Map(lanes);
    holes.delete(7);
    holes.set(12, { suites: [], stats: { duration: 1000 } });
    expect(runWeights(holes, 46000329861, true)).toEqual({
      reason: "lane(s) 7, 12 recorded no results",
    });
  });

  it("LWM-5 the measured spread is a finding line over the limit, a plain line within it, and names lanes with no results", () => {
    const seconds = (lanes: Map<number, unknown>) => {
      const out = new Map<number, number>();
      for (const [lane, results] of lanes) {
        const value = laneSeconds(results);
        if (value !== null) out.set(lane, value);
      }
      return out;
    };
    expect(measuredSpreadLine(seconds(sixteen(true)))).toBe(
      "- Measured lane spread (DEC-375 b): mean 622 s, largest 724 s (lane 1, +16 %); within the 25 % limit",
    );
    expect(measuredSpreadLine(seconds(sixteen(false)))).toBe(
      "- Measured lane spread (DEC-375 b): mean 533 s, largest 724 s (lane 1, +36 %); finding: over the 25 % limit — the lanes' measured times no longer match the plan's weights",
    );
    const some = seconds(sixteen(true));
    some.delete(4);
    expect(measuredSpreadLine(some)).toBe(
      "- Measured lane spread (DEC-375 b): not measured — lane(s) 4 recorded no results",
    );
  });

  it("LWM-6 the reporter writes the spread line into the evidence and the summary, and the weights only on a green run", () => {
    const report = (green: boolean, missing?: number) => {
      const dir = scratch("lwm-report");
      for (const [lane, results] of sixteen(false)) {
        if (lane === missing) continue;
        mkdirSync(join(dir, "results", `e2e-results-${String(lane)}`), { recursive: true });
        writeFileSync(
          join(dir, "results", `e2e-results-${String(lane)}`, "results.json"),
          JSON.stringify(results),
        );
      }
      writeFileSync(join(dir, "summary.md"), "");
      const env: Record<string, string> = {};
      for (const [key, value] of Object.entries(process.env))
        if (
          value !== undefined &&
          !key.startsWith("E2E_") &&
          !key.startsWith("GITHUB_") &&
          key !== "SELF_TEST"
        )
          env[key] = value;
      const run = spawnSync("bun", ["scripts/e2e-failure-report.ts"], {
        encoding: "utf8",
        env: {
          ...env,
          GITHUB_RUN_ID: "46000329861",
          GITHUB_STEP_SUMMARY: join(dir, "summary.md"),
          E2E_GREEN: green ? "1" : "0",
          E2E_RESULTS_DIR: join(dir, "results"),
          E2E_EXPECTED_SOURCES: Array.from({ length: 16 }, (_, i) => String(i + 1)).join(","),
          E2E_OUT_PATH: join(dir, "out.md"),
          E2E_LANE_WEIGHTS_PATH: join(dir, "lane-weights.json"),
          E2E_VERDICT_PATH: join(dir, "verdict.txt"),
          E2E_FLAKE_LEDGER: join(dir, "ledger.md"),
        },
        timeout: 60_000,
      });
      const text = (name: string) => {
        try {
          return readFileSync(join(dir, name), "utf8");
        } catch {
          return null;
        }
      };
      return {
        status: run.status,
        stdout: run.stdout,
        out: text("out.md") ?? "",
        summary: text("summary.md") ?? "",
        weights: text("lane-weights.json"),
      };
    };
    const over =
      "- Measured lane spread (DEC-375 b): mean 533 s, largest 724 s (lane 1, +36 %); finding: over the 25 % limit — the lanes' measured times no longer match the plan's weights";
    const green = report(true);
    expect(green.status).toBe(0);
    expect(green.out).toContain(`\n${over}\n`);
    expect(green.summary).toBe(`${over}\n`);
    expect(parseWeights(green.weights ?? "")?.source).toEqual({
      run: 46000329861,
      date: "2026-11-13",
      lanes: "1-16",
    });
    expect(green.stdout).toContain("Lane weights: run 46000329861's written to");

    const red = report(false);
    expect(red.out).toContain(`\n${over}\n`);
    expect(red.weights).toBeNull();

    const short = report(true, 9);
    expect(short.weights).toBeNull();
    expect(short.stdout).toContain("Lane weights: none written (lane(s) 9 recorded no results).");
    expect(short.out).toContain(
      "- Measured lane spread (DEC-375 b): not measured — lane(s) 9 recorded no results",
    );
    expect(WEIGHTS_EVIDENCE).toBe("docs/tracking/lane-weights.json");
  });
});

type Evidence = {
  /** The answer to the branch read; absent, the call fails. */
  sha?: string;
  /** The tree's blob paths; `truncated` true cuts it. */
  paths?: string[];
  truncated?: boolean;
  /** Each path's text; a path not named here fails its read. */
  files?: Record<string, string>;
};

/** scripts/ci/lane-weights-read.sh against a fake `gh` that answers from `evidence`. */
function readEvidence(evidence: Evidence, repo = "tesfayekb/ethio-marketplace") {
  const dir = scratch("lwm-read");
  const bin = join(dir, "bin");
  const fake = join(dir, "fake");
  mkdirSync(bin);
  mkdirSync(join(fake, "files"), { recursive: true });
  if (evidence.sha !== undefined) writeFileSync(join(fake, "sha"), `${evidence.sha}\n`);
  if (evidence.paths !== undefined)
    writeFileSync(
      join(fake, "tree.json"),
      JSON.stringify({
        sha: evidence.sha,
        truncated: evidence.truncated ?? false,
        tree: [
          { path: "docs/tracking", type: "tree" },
          ...evidence.paths.map((path) => ({ path, type: "blob" })),
        ],
      }),
    );
  for (const [path, text] of Object.entries(evidence.files ?? {})) {
    mkdirSync(dirname(join(fake, "files", path)), { recursive: true });
    writeFileSync(join(fake, "files", path), text);
  }
  writeFileSync(
    join(bin, "gh"),
    [
      "#!/usr/bin/env bash",
      `fake="${fake}"`,
      'args="$*"',
      'echo "$args" >> "$fake/calls"',
      'case "$args" in',
      '  *"commits/ci-evidence"*) [ -f "$fake/sha" ] && cat "$fake/sha" || { echo "HTTP 502" >&2; exit 1; } ;;',
      '  *"git/trees/"*) [ -f "$fake/tree.json" ] && cat "$fake/tree.json" || { echo "HTTP 502" >&2; exit 1; } ;;',
      '  *"contents/"*) p=${args#*contents/}; p=${p%%\\?ref=*}; [ -f "$fake/files/$p" ] && cat "$fake/files/$p" || { echo "HTTP 404" >&2; exit 1; } ;;',
      "  *) exit 9 ;;",
      "esac",
      "",
    ].join("\n"),
  );
  chmodSync(join(bin, "gh"), 0o755);
  const output = join(dir, "output");
  writeFileSync(output, "");
  const run = spawnSync("bash", ["scripts/ci/lane-weights-read.sh"], {
    encoding: "utf8",
    env: {
      PATH: `${bin}:${process.env["PATH"] ?? ""}`,
      HOME: dir,
      REPO: repo,
      GITHUB_OUTPUT: output,
      WITH_DEADLINE_PAUSE: "0",
    },
    timeout: 60_000,
  });
  const outputs = new Map<string, string>();
  for (const line of readFileSync(output, "utf8").split("\n")) {
    const at = line.indexOf("=");
    if (at > 0) outputs.set(line.slice(0, at), line.slice(at + 1));
  }
  let calls = "";
  try {
    calls = readFileSync(join(fake, "calls"), "utf8");
  } catch {
    calls = "";
  }
  return { status: run.status, out: `${run.stdout}${run.stderr}`, outputs, calls };
}

describe("the backend-images job's read of the lane weights (cursor-ci-speed)", () => {
  const sha = "0123456789abcdef0123456789abcdef01234567";
  const weightsOf = (run: number) =>
    JSON.stringify(weightsFrom([read("results-lane-3.json")], run), null, 2);
  const ROOT = "docs/tracking/lane-weights.json";
  const BRANCH = "docs/tracking/branches/cursor/ci-speed/lane-weights.json";

  it("LWM-7 the newest run's file at one evidence commit, the root's or a branch's, on one line with its source", () => {
    const read7 = readEvidence({
      sha,
      paths: [ROOT, BRANCH, "docs/tracking/ci-status.md"],
      files: { [ROOT]: weightsOf(45929211475), [BRANCH]: weightsOf(46000329861) },
    });
    expect(read7.status).toBe(0);
    expect(read7.outputs.get("weights_source")).toBe(
      `${BRANCH} at evidence 012345678 (run 46000329861; 0 of 2 files unread)`,
    );
    expect(JSON.parse(read7.outputs.get("weights") ?? "")).toEqual(
      JSON.parse(weightsOf(46000329861)),
    );
    expect(read7.outputs.get("weights")).not.toContain("\n");
    // Every read names the one commit.
    expect(read7.calls.match(/\?ref=0123456789abcdef0123456789abcdef01234567/g)).toHaveLength(2);
    expect(read7.calls).toContain("git/trees/0123456789abcdef0123456789abcdef01234567?recursive=1");

    const unreadable = readEvidence({
      sha,
      paths: [ROOT, BRANCH],
      files: { [ROOT]: weightsOf(45929211475), [BRANCH]: "not json" },
    });
    expect(unreadable.outputs.get("weights_source")).toBe(
      `${ROOT} at evidence 012345678 (run 45929211475; 1 of 2 files unread)`,
    );
  });

  it("LWM-8 the read never fails: each failure answers an empty copy and its reason, with no error annotation", () => {
    const cases: Array<[Evidence, string]> = [
      [{}, "the evidence branch could not be read"],
      [{ sha: "not-a-sha" }, "the evidence branch answered no commit"],
      [{ sha }, "the evidence tree at 012345678 could not be read"],
      [
        { sha, paths: [ROOT], truncated: true },
        "the evidence tree at 012345678 came back cut or unreadable",
      ],
      [{ sha, paths: ["docs/tracking/ci-status.md"] }, "no weights file at evidence 012345678"],
      [{ sha, paths: [ROOT], files: {} }, "no readable weights file at evidence 012345678"],
    ];
    for (const [evidence, reason] of cases) {
      const run = readEvidence(evidence);
      expect(run.status, reason).toBe(0);
      expect(run.outputs.get("weights"), reason).toBe("");
      expect(run.outputs.get("weights_source"), reason).toBe(reason);
      expect(run.out, reason).not.toMatch(/^::error/m);
    }
    expect(readEvidence({ sha }, "").outputs.get("weights_source")).toBe("no repository named");
  });

  it("LWM-9 the lane's plan names its weights' source, and falls back to the committed file on an empty copy", () => {
    const dir = scratch("lwm-plan");
    const list = join(dir, "list.json");
    const tests = Object.keys(readWeights().files).map((file) => ({
      file,
      tests: [{ projectName: "mobile-360" }],
    }));
    writeFileSync(list, JSON.stringify({ suites: [{ specs: tests }] }));
    const plan = (weights: string, source: string) => {
      writeFileSync(join(dir, "weights.json"), weights);
      return spawnSync(
        "bun",
        [
          "scripts/ci/lane-plan.ts",
          "--list",
          list,
          "--weights",
          join(dir, "weights.json"),
          "--weights-source",
          source,
          "--lane",
          "1",
          "--out",
          join(dir, "lane.txt"),
        ],
        { encoding: "utf8", timeout: 60_000 },
      );
    };
    const fresh = plan(weightsOf(46000329861), "the fresh copy");
    expect(fresh.status).toBe(0);
    expect(fresh.stdout).toContain("weights from run 46000329861 (2026-11-13), the fresh copy;");
    const empty = plan("", "no weights file at evidence 012345678");
    expect(empty.status).toBe(0);
    expect(empty.stdout).toContain(
      `weights from run 43431755160 (2026-11-13), the committed ${WEIGHTS_FILE} — no weights file at evidence 012345678;`,
    );
  });

  it("LWM-10 a test costs its file's seconds in a project over its tests there; the weights' median costs what they hold no measure of (INC-1333)", () => {
    const weights = {
      source: { run: 1, date: "2026-11-27", lanes: "1-16" },
      files: {
        "a.spec.ts": {
          "mobile-360": { seconds: 60, tests: 4 },
          "desktop-1280": { seconds: 0.4, tests: 4 },
        },
        "b.spec.ts": { "mobile-360": { seconds: 9, tests: 3 } },
        "c.spec.ts": { "mobile-360": { seconds: 0, tests: 0 } },
      },
    };
    expect(costPerTest(weights, "a.spec.ts", "mobile-360")).toBe(15);
    expect(costPerTest(weights, "a.spec.ts", "desktop-1280")).toBeCloseTo(0.1, 10);
    expect(costPerTest(weights, "b.spec.ts", "desktop-1280")).toBeNull();
    expect(costPerTest(weights, "missing.spec.ts", "mobile-360")).toBeNull();
    expect(costPerTest(weights, "c.spec.ts", "mobile-360")).toBeNull();
    // 15, 0.1 and 3 s a test: the median is 3 s; weights with no measure answer zero.
    expect(medianCost(weights)).toBe(3);
    expect(medianCost({ source: weights.source, files: {} })).toBe(0);
    // The committed weights hold a measure for every file they list.
    const committed = readWeights();
    expect(medianCost(committed)).toBeGreaterThan(0);
  });
});
