import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { lanesSkippedReason } from "../e2e-failure-report";
import {
  decide,
  isRecord,
  lanesGreen,
  MAX_CANDIDATES,
  parseCandidates,
  parseJobs,
  parseRun,
  readCodeTreeId,
  skippedLine,
  SKIPPED_PREFIX,
  VERDICT_JOB,
  type Candidate,
  type JobView,
  type Probe,
  type RunView,
} from "./docs-only";

// DEC-375 (a), the speed turn (ruling 1 Q2) — a proven code tree is not proven again. The fixtures
// are the Actions API's answers through the file's own `--jq` filters: the artifacts named
// e2e-results-smoke (the index's shape; no code-tree index existed before this turn), runs
// 43426917119 (a green pull-request run), 43431755160 (a green dev push), 43319295611 (failed),
// 41974149932 (cancelled) and 43435542489 (another workflow), with the jobs of 43426917119,
// 43103925609 (every lane green) and 43033934604 (every lane lost before any test).
const FIXTURES = "scripts/fixtures/docs-only";
const read = (name: string) => readFileSync(`${FIXTURES}/${name}`, "utf8");

function jobsOf(name: string): JobView[] {
  const jobs = parseJobs(read(name));
  if (jobs === null) throw new Error(`${name}: not the jobs shape`);
  return jobs;
}

function runOf(id: number): RunView {
  const run = parseRun(read(`run-${String(id)}.json`));
  if (run === null) throw new Error(`run-${String(id)}.json: not the run shape`);
  return run;
}

function candidatesOf(): Candidate[] {
  const candidates = parseCandidates(read("artifacts-e2e-results-smoke.json"));
  if (candidates === null) throw new Error("artifacts: not the artifacts shape");
  return candidates;
}

const PR_GREEN = runOf(43426917119);
const DEV_GREEN = runOf(43431755160);
const FAILED = runOf(43319295611);
const CANCELLED = runOf(41974149932);
const OTHER_WORKFLOW = runOf(43435542489);
const GREEN = jobsOf("jobs-green-43103925609.json");
const PR_JOBS = jobsOf("jobs-green-43426917119.json");
const RED = jobsOf("jobs-red-43033934604.json");
/** The green run as a proven-tree push leaves it: the lanes call skipped, its jobs never started. */
const SKIPPED: JobView[] = [
  ...GREEN.filter((job) => !job.name.startsWith("E2E lanes")),
  { name: "E2E lanes", conclusion: "skipped" },
];
const ALL = candidatesOf();

function candidate(runId: number): Candidate {
  const found = ALL.find((item) => item.runId === runId);
  if (found !== undefined) return found;
  const [first] = ALL;
  if (first === undefined) throw new Error("artifacts: empty");
  return { ...first, runId };
}

/** A probe over captured runs and jobs; `index` answers the artifacts read for each tree id. */
function probeOf(
  index: Record<string, Candidate[] | "unreadable">,
  runs: RunView[],
  jobs: Record<number, JobView[] | "unreadable">,
  unreadableRuns: number[] = [],
): Probe & { reads: string[] } {
  const reads: string[] = [];
  return {
    reads,
    candidates: (treeId) => {
      reads.push(`artifacts ${treeId.slice(0, 8)}`);
      return index[treeId] ?? [];
    },
    run: (runId) => {
      reads.push(`run ${String(runId)}`);
      if (unreadableRuns.includes(runId)) return "unreadable";
      return runs.find((run) => run.id === runId) ?? "unreadable";
    },
    jobs: (runId) => {
      reads.push(`jobs ${String(runId)}`);
      return jobs[runId] ?? "unreadable";
    },
  };
}

/** A tree in a scratch repository built from `[path, content, mode]` entries; real git output. */
function scratchTrees(): {
  dir: string;
  tree: (files: Array<[string, string, string?]>) => string;
} {
  const dir = mkdtempSync(join(tmpdir(), "docs-only-"));
  const git = (args: string[], input?: string, index?: string) => {
    const env = index === undefined ? process.env : { ...process.env, GIT_INDEX_FILE: index };
    const result = spawnSync("git", args, { cwd: dir, encoding: "utf8", input, env });
    if (result.status !== 0) throw new Error(`git ${args.join(" ")}: ${result.stderr}`);
    return result.stdout.trim();
  };
  git(["init", "-q"]);
  let count = 0;
  return {
    dir,
    tree: (files) => {
      count += 1;
      const index = join(dir, `index-${String(count)}`);
      for (const [path, content, mode = "100644"] of files) {
        const blob = git(["hash-object", "-w", "--stdin"], content);
        git(["update-index", "--add", "--cacheinfo", `${mode},${blob},${path}`], undefined, index);
      }
      return git(["write-tree"], undefined, index);
    },
  };
}

const TREE = "c".repeat(64);
const SELF = 43500000000;

describe("a proven code tree is not proven again (DEC-375 a)", () => {
  it("CF-DOCS-1 every record shape passes; generated files, code and config never do", () => {
    for (const path of [
      "docs/features/ci-guards.md",
      "docs/governance/briefs/housekeeping-3.md",
      "docs/tracking/intentional-deletions.txt",
      "roadmap.md",
      "README.md",
      "AGENTS.md",
      "CLAUDE.md",
      ".cursor/rules/00-protocol.mdc",
    ])
      expect(isRecord(path), path).toBe(true);
    for (const path of [
      "docs/generated/i18n-usage.json",
      "public/i18n-usage.json",
      "src/README.md",
      "src/routes/index.tsx",
      "e2e/specs/a.spec.ts",
      "scripts/ci/docs-only.ts",
      ".github/workflows/ci.yml",
      "supabase/migrations/1_a.sql",
      ".claude/settings.md",
      "package.json",
      "bun.lock",
    ])
      expect(isRecord(path), path).toBe(false);
  });

  it("CF-DOCS-2 one source file among twenty records changes the id, and its lanes run", () => {
    const scratch = scratchTrees();
    const docs = Array.from({ length: 20 }, (_, i): [string, string] => [
      `docs/features/page-${String(i)}.md`,
      `page ${String(i)}\n`,
    ]);
    const proven = readCodeTreeId(scratch.tree([...docs, ["src/lib/a.ts", "a\n"]]), scratch.dir);
    const changed = readCodeTreeId(scratch.tree([...docs, ["src/lib/a.ts", "b\n"]]), scratch.dir);
    if (proven === null || changed === null) throw new Error("ls-tree failed");
    expect(changed).not.toBe(proven);
    const probe = probeOf({ [proven]: [candidate(PR_GREEN.id)] }, [PR_GREEN], {
      [PR_GREEN.id]: PR_JOBS,
    });
    expect(decide(proven, SELF, probe).docsOnly).toBe(true);
    expect(decide(changed, SELF, probe)).toEqual({
      docsOnly: false,
      lanes: `ran — no proven code tree: no green ci.yml run of this repository holds code-tree-${changed.slice(0, 12)}… (0 read)`,
    });
  });

  it("CF-DOCS-3 a tree git cannot read runs the lanes and reads nothing", () => {
    const scratch = scratchTrees();
    expect(readCodeTreeId("f".repeat(40), scratch.dir)).toBeNull();
    for (const treeId of [null, "", "abc", "C".repeat(64)]) {
      const probe = probeOf({}, [], {});
      expect(decide(treeId, SELF, probe)).toEqual({
        docsOnly: false,
        lanes: "ran — no proven code tree: this commit's tree could not be read",
      });
      expect(probe.reads).toEqual([]);
    }
  });

  it("CF-DOCS-4 a run whose lanes were not green, or whose read failed, proves nothing", () => {
    expect(lanesGreen(PR_GREEN, PR_JOBS)).toBe(true);
    expect(lanesGreen(PR_GREEN, GREEN)).toBe(true);
    expect(lanesGreen(FAILED, RED)).toBe(false);
    expect(lanesGreen(PR_GREEN, SKIPPED)).toBe(false);
    const verdictRed = GREEN.map((job) =>
      job.name === VERDICT_JOB ? { ...job, conclusion: "failure" } : job,
    );
    expect(lanesGreen(PR_GREEN, verdictRed)).toBe(false);
    expect(lanesGreen({ ...PR_GREEN, conclusion: "failure" }, GREEN)).toBe(false);
    expect(parseJobs('{"jobs": []}')).toBeNull();
    expect(parseRun('[{"id": 1}]')).toBeNull();
    expect(parseCandidates('{"artifacts": []}')).toBeNull();
  });

  it("CF-DOCS-5 a docs-only push reuses the proof: the line names the run, never this run", () => {
    const probe = probeOf(
      { [TREE]: [candidate(PR_GREEN.id), { ...candidate(PR_GREEN.id), runId: SELF }] },
      [PR_GREEN],
      { [PR_GREEN.id]: PR_JOBS },
    );
    expect(decide(TREE, SELF, probe)).toEqual({
      docsOnly: true,
      runId: 43426917119,
      lanes:
        "skipped — the code tree was proven by run 43426917119 (pull_request, cursor/pictures, head e61da5b)",
    });
    expect(probe.reads).toEqual(["artifacts cccccccc", "run 43426917119", "jobs 43426917119"]);
  });

  it("CF-DOCS-6 at most five indexed runs are read, newest first; past them the lanes run", () => {
    // Seven failed runs, all newer than the green one the bound keeps out of reach.
    const failedIds = Array.from({ length: MAX_CANDIDATES + 2 }, (_, i) => PR_GREEN.id + 1 + i);
    const failedRuns = failedIds.map((id) => ({ ...FAILED, id }));
    const index = { [TREE]: [...failedIds.map(candidate), candidate(PR_GREEN.id)] };
    const probe = probeOf(index, [...failedRuns, PR_GREEN], { [PR_GREEN.id]: PR_JOBS });
    expect(decide(TREE, SELF, probe)).toEqual({
      docsOnly: false,
      lanes: `ran — no proven code tree: no green ci.yml run of this repository holds code-tree-${TREE.slice(0, 12)}… (5 read)`,
    });
    expect(probe.reads).toEqual([
      "artifacts cccccccc",
      ...[...failedIds]
        .reverse()
        .slice(0, MAX_CANDIDATES)
        .map((id) => `run ${String(id)}`),
    ]);
    const newest = probeOf(
      { [TREE]: ALL.filter((item) => item.runId !== 43434492441) },
      [DEV_GREEN, PR_GREEN],
      { [DEV_GREEN.id]: GREEN },
    );
    expect(decide(TREE, SELF, newest)).toMatchObject({ docsOnly: true, runId: DEV_GREEN.id });
  });

  it("CF-DOCS-7 a merge commit whose id equals a green pull-request run's is reused", () => {
    const scratch = scratchTrees();
    const code: Array<[string, string]> = [
      ["src/lib/a.ts", "export const a = 1;\n"],
      [".github/workflows/ci.yml", "name: CI\n"],
    ];
    const tested = scratch.tree([...code, ["docs/a.md", "pull request\n"]]);
    const merged = scratch.tree([...code, ["docs/a.md", "merge\n"], ["roadmap.md", "r\n"]]);
    const id = readCodeTreeId(tested, scratch.dir);
    expect(id).not.toBeNull();
    expect(readCodeTreeId(merged, scratch.dir)).toBe(id);
    const probe = probeOf({ [id ?? ""]: [candidate(PR_GREEN.id)] }, [PR_GREEN], {
      [PR_GREEN.id]: PR_JOBS,
    });
    expect(decide(id, DEV_GREEN.id, probe)).toMatchObject({
      docsOnly: true,
      runId: PR_GREEN.id,
    });
  });

  it("CF-DOCS-8 a cancelled, failed, running, lanes-skipped, fork or other workflow's run proves nothing", () => {
    const running: RunView = {
      ...PR_GREEN,
      id: PR_GREEN.id + 1,
      status: "in_progress",
      conclusion: null,
    };
    const skippedRun: RunView = { ...PR_GREEN, id: PR_GREEN.id + 2 };
    const fork: Candidate = {
      ...candidate(PR_GREEN.id + 3),
      headRepositoryId: candidate(PR_GREEN.id).repositoryId + 1,
    };
    const forkRun: RunView = { ...PR_GREEN, id: PR_GREEN.id + 3 };
    const cases: Array<[string, Candidate, RunView, JobView[]]> = [
      ["cancelled", candidate(CANCELLED.id), CANCELLED, GREEN],
      ["failed", candidate(FAILED.id), FAILED, RED],
      ["running", candidate(running.id), running, GREEN],
      ["lanes skipped", candidate(skippedRun.id), skippedRun, SKIPPED],
      ["fork", fork, forkRun, GREEN],
      ["other workflow", candidate(OTHER_WORKFLOW.id), OTHER_WORKFLOW, GREEN],
    ];
    for (const [name, held, run, jobs] of cases) {
      const probe = probeOf({ [TREE]: [held] }, [run], { [run.id]: jobs });
      expect(decide(TREE, SELF, probe).docsOnly, name).toBe(false);
    }
    const fromFork = probeOf({ [TREE]: [fork] }, [forkRun], { [forkRun.id]: GREEN });
    decide(TREE, SELF, fromFork);
    expect(fromFork.reads).toEqual(["artifacts cccccccc"]);
  });

  it("CF-DOCS-9 every read failure runs the lanes", () => {
    const held = { [TREE]: [candidate(PR_GREEN.id)] };
    const short = TREE.slice(0, 12);
    expect(decide(TREE, SELF, probeOf({ [TREE]: "unreadable" }, [], {}))).toEqual({
      docsOnly: false,
      lanes: `ran — no proven code tree: the Actions API read of code-tree-${short}… failed`,
    });
    expect(decide(TREE, SELF, probeOf(held, [PR_GREEN], {}, [PR_GREEN.id]))).toEqual({
      docsOnly: false,
      lanes: "ran — no proven code tree: the Actions API read of run 43426917119 failed",
    });
    expect(decide(TREE, SELF, probeOf(held, [PR_GREEN], { [PR_GREEN.id]: "unreadable" }))).toEqual({
      docsOnly: false,
      lanes: "ran — no proven code tree: the Actions API read of run 43426917119's jobs failed",
    });
    for (const text of [
      "",
      "not json",
      "{}",
      '[{"expired": false}]',
      '[{"expired": false, "workflow_run": {"id": "1"}}]',
    ])
      expect(parseCandidates(text), text).toBeNull();
    for (const text of [
      "",
      "[]",
      '{"id": 1}',
      JSON.stringify({ ...JSON.parse(read("run-43426917119.json")), head_sha: "x" }),
    ])
      expect(parseRun(text), text).toBeNull();
  });

  it("CF-DOCS-10 the id ignores records only; the skipped line is the one both readers accept", () => {
    const scratch = scratchTrees();
    const base: Array<[string, string, string?]> = [
      ["src/a.ts", "a\n"],
      ["scripts/b.sh", "b\n", "100644"],
      ["docs/c.md", "c\n"],
    ];
    const id = (files: Array<[string, string, string?]>) =>
      readCodeTreeId(scratch.tree(files), scratch.dir);
    const original = id(base);
    expect(original).toMatch(/^[0-9a-f]{64}$/);
    expect(id([...base, ["AGENTS.md", "x\n"], [".cursor/rules/a.mdc", "y\n"]])).toBe(original);
    expect(id([["src/a.ts", "a!\n"], ...base.slice(1)])).not.toBe(original);
    expect(id([["src/a2.ts", "a\n"], ...base.slice(1)])).not.toBe(original);
    const executable: Array<[string, string, string?]> = [
      ["src/a.ts", "a\n"],
      ["scripts/b.sh", "b\n", "100755"],
      ["docs/c.md", "c\n"],
    ];
    expect(id(executable)).not.toBe(original);
    expect(id([...base, ["docs/generated/i18n-usage.json", "{}\n"]])).not.toBe(original);

    const status = readFileSync(".github/workflows/ci-status-report.yml", "utf8");
    const match = /lanesLine\.startsWith\('([^']+)'\)/.exec(status);
    expect(match?.[1]).toBe(SKIPPED_PREFIX);
    const accepts = (line: string) =>
      line.startsWith(match?.[1] ?? "\u0000") && lanesSkippedReason(line) !== null;
    const line = skippedLine(PR_GREEN);
    expect(accepts(line)).toBe(true);
    expect(lanesSkippedReason(line)).toBe("the code tree was proven by run 43426917119");
    for (const planted of [
      "Skipped — the code tree was proven by run 1 (push, dev, head abcdef1)",
      "skipped: the code tree was proven by run 1",
      "skipped — ",
      "ran — no proven code tree: this commit's tree could not be read",
    ])
      expect(accepts(planted), planted).toBe(false);
  });
});
