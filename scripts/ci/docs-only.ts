/**
 * DEC-365 (housekeeping turn 3) — A PUSH'S LANES BY WHAT IT CHANGED. A push whose every changed file
 * is a record (docs, the roadmap, the rules, the agent file) runs no browser lane and no bundle
 * budget when the code tree it stands on was tested green. ci.yml's first job `scope` runs this file;
 * `e2e-lanes`, `bundle-budget`, the E2E verdict and `promote` read its two outputs, and the status
 * reporter reads its `DEC-365 lanes:` log line.
 *
 * The decision (ruling 1, Q9/Q10): the push's base is `before` (the push's, or the pull request's on
 * `synchronize`; anything else is unknown → the lanes run). From `before`, at most WALK_BOUND commits
 * along the first parents (`before` itself first) are read from the Actions API, each under
 * scripts/ci/with-deadline.sh, to the newest whose own CI run on this ref concluded success with its
 * lanes run and green (a lane job `success`, not a skipped lanes call) and the E2E verdict `success`.
 * The push is docs-only only when every path of `git diff <that commit> <sha>` is a record. A failed
 * read, a missing commit or a walk past the bound is not docs-only: the lanes run.
 */
import { spawnSync } from "node:child_process";
import { appendFileSync } from "node:fs";

/** How many commits the walk reads, `before` included. */
export const WALK_BOUND = 10;
/** A lane job's name in the Actions API (the reusable workflow's jobs, `E2E lanes / Lane 4 …`). */
export const LANE_JOB = "E2E lanes / Lane ";
/** The merged verdict's job name (ci.yml `e2e`). */
export const VERDICT_JOB = "E2E (Playwright, ethio-staging)";
/** The `--jq` filters the API reads use; the fixtures under scripts/fixtures/docs-only/ are their output. */
export const RUNS_JQ = "[.workflow_runs[] | {id, conclusion}]";
export const JOBS_JQ = "[.jobs[] | {name, conclusion}]";

const SHA = /^[0-9a-f]{40}$/;

/** A record: `docs/**` but never `docs/generated/**`, `.cursor/**`, or a `*.md` at the root. */
export function isRecord(path: string): boolean {
  if (path.startsWith("docs/generated/")) return false;
  if (path.startsWith("docs/") || path.startsWith(".cursor/")) return true;
  return !path.includes("/") && path.endsWith(".md");
}

export type RunView = { id: number; conclusion: string | null };
export type JobView = { name: string; conclusion: string | null };

function isRecordObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function conclusionOf(value: unknown): string | null | undefined {
  if (value === null) return null;
  return typeof value === "string" ? value : undefined;
}

function parseList(text: string): unknown[] | null {
  try {
    const value: unknown = JSON.parse(text);
    return Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}

/** The runs read by RUNS_JQ, newest first, or null when the answer has another shape. */
export function parseRuns(text: string): RunView[] | null {
  const list = parseList(text);
  if (list === null) return null;
  const runs: RunView[] = [];
  for (const item of list) {
    if (!isRecordObject(item)) return null;
    const { id } = item;
    const conclusion = conclusionOf(item["conclusion"]);
    if (typeof id !== "number" || conclusion === undefined) return null;
    runs.push({ id, conclusion });
  }
  return runs;
}

/** The jobs read by JOBS_JQ, or null when the answer has another shape. */
export function parseJobs(text: string): JobView[] | null {
  const list = parseList(text);
  if (list === null) return null;
  const jobs: JobView[] = [];
  for (const item of list) {
    if (!isRecordObject(item)) return null;
    const { name } = item;
    const conclusion = conclusionOf(item["conclusion"]);
    if (typeof name !== "string" || conclusion === undefined) return null;
    jobs.push({ name, conclusion });
  }
  return jobs;
}

/** A run whose lanes ran green: the run succeeded, a lane job succeeded, the verdict succeeded. */
export function lanesGreen(run: RunView, jobs: JobView[]): boolean {
  return (
    run.conclusion === "success" &&
    jobs.some((job) => job.name.startsWith(LANE_JOB) && job.conclusion === "success") &&
    jobs.some((job) => job.name === VERDICT_JOB && job.conclusion === "success")
  );
}

/** What the decision reads from git and the Actions API. */
export type Probe = {
  /** The commit's first parent, or null when it has none or git does not hold it. */
  parent: (commit: string) => string | null;
  /** The id of the commit's newest completed run on this ref when its lanes ran green; null when
   * they did not (or it has no run); "unreadable" when the API read failed. */
  greenRun: (commit: string) => number | null | "unreadable";
  /** `git diff --name-only <base> <sha>`, or null when git fails. */
  changed: (base: string, sha: string) => string[] | null;
};

export type Decision =
  | { docsOnly: true; base: string; runId: number; lanes: string }
  | { docsOnly: false; lanes: string };

/** A path as the evidence line may print it: one line, no Markdown, at most 120 characters. */
function shown(path: string): string {
  return path.replace(/[^A-Za-z0-9._/@+-]/g, "?").slice(0, 120);
}

function ran(reason: string): Decision {
  return { docsOnly: false, lanes: `ran — ${reason}` };
}

export function decide(
  before: string | null,
  sha: string,
  probe: Probe,
  bound = WALK_BOUND,
): Decision {
  if (before === null || !SHA.test(before) || /^0+$/.test(before))
    return ran("not docs-only: the push's base is unknown");
  let commit: string | null = before;
  let base: { commit: string; runId: number } | null = null;
  for (let hop = 0; hop < bound && commit !== null; hop += 1) {
    const run = probe.greenRun(commit);
    if (run === "unreadable")
      return ran(`not docs-only: the Actions API read for ${commit} failed (push base ${before})`);
    if (run !== null) {
      base = { commit, runId: run };
      break;
    }
    commit = probe.parent(commit);
  }
  if (base === null)
    return ran(
      `not docs-only: no commit within ${String(bound)} first-parent commits of ${before} ran its lanes green`,
    );
  const paths = probe.changed(base.commit, sha);
  if (paths === null)
    return ran(`not docs-only: git diff ${base.commit} ${sha} failed (push base ${before})`);
  const code = paths.filter((path) => !isRecord(path));
  const first = code[0];
  if (first !== undefined)
    return ran(
      `not docs-only: ${shown(first)} is not a record (${String(code.length)} of ${String(paths.length)} paths; diff base ${base.commit}, push base ${before})`,
    );
  return {
    docsOnly: true,
    base: base.commit,
    runId: base.runId,
    lanes: `skipped — docs-only push; the code tree equals ${base.commit}, whose lanes were green in run ${String(base.runId)}`,
  };
}

function run(command: string, args: string[]): { ok: boolean; out: string } {
  const result = spawnSync(command, args, { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  if (result.status !== 0 && result.stderr) process.stderr.write(result.stderr);
  return { ok: result.status === 0, out: result.stdout ?? "" };
}

/** One Actions API read under the deadline wrapper (30 s, two tries); null when it failed. */
function api(path: string, jq: string): string | null {
  const read = run("bash", [
    "scripts/ci/with-deadline.sh",
    "30",
    "2",
    "--",
    "gh",
    "api",
    path,
    "--jq",
    jq,
  ]);
  return read.ok ? read.out : null;
}

function liveProbe(repo: string, ref: string): Probe {
  return {
    parent: (commit) => {
      const read = run("git", ["rev-parse", "--verify", "--quiet", `${commit}^1`]);
      const parent = read.out.trim();
      return read.ok && SHA.test(parent) ? parent : null;
    },
    greenRun: (commit) => {
      const query = `head_sha=${commit}&branch=${encodeURIComponent(ref)}&status=completed&per_page=20`;
      const runsText = api(`repos/${repo}/actions/workflows/ci.yml/runs?${query}`, RUNS_JQ);
      const runs = runsText === null ? null : parseRuns(runsText);
      if (runs === null) return "unreadable";
      const newest = runs[0];
      if (newest === undefined || newest.conclusion !== "success") return null;
      const jobsText = api(
        `repos/${repo}/actions/runs/${String(newest.id)}/jobs?per_page=100`,
        JOBS_JQ,
      );
      const jobs = jobsText === null ? null : parseJobs(jobsText);
      if (jobs === null) return "unreadable";
      return lanesGreen(newest, jobs) ? newest.id : null;
    },
    changed: (base, sha) => {
      const read = run("git", ["diff", "--name-only", base, sha]);
      return read.ok ? read.out.split("\n").filter((line) => line !== "") : null;
    },
  };
}

if (import.meta.main) {
  const before = process.env["DOCS_ONLY_BEFORE"] || null;
  const sha = process.env["GITHUB_SHA"] ?? "";
  const ref = process.env["DOCS_ONLY_REF"] ?? "";
  const repo = process.env["GITHUB_REPOSITORY"] ?? "";
  const output = process.env["GITHUB_OUTPUT"];
  if (!SHA.test(sha) || ref === "" || repo === "" || !output) {
    console.error(
      "docs-only: GITHUB_SHA, DOCS_ONLY_REF, GITHUB_REPOSITORY and GITHUB_OUTPUT are required",
    );
    process.exit(2);
  }
  const decision = decide(before, sha, liveProbe(repo, ref));
  console.log(`DEC-365 lanes: ${decision.lanes}`);
  appendFileSync(
    output,
    `docs_only=${decision.docsOnly ? "true" : "false"}\nlanes=${decision.lanes}\n`,
  );
}
