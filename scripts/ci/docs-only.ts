/**
 * DEC-375 (a), the speed turn — A PROVEN CODE TREE IS NOT PROVEN AGAIN (DEC-365's first-parent walk
 * retired into this rule). A push's code tree is its commit's tree with every record (docs, the
 * roadmap, the rules, the agent file, the brief allowlist) set aside; `codeTreeId` names it.
 * ci.yml's first job `scope` runs this file: when the lanes RUN it uploads the artifact
 * `code-tree-<id>` (the commit, the event, the ref), and before that it looks its own id up. `e2e-lanes`, `bundle-budget`, the E2E verdict
 * and `promote` read its outputs (`docs_only` keeps its name: "the code tree is proven"), and the
 * status reporter reads its `DEC-365 lanes:` log line.
 *
 * The lookup (ruling 1, Q2): one read of `actions/artifacts?name=code-tree-<id>` under
 * scripts/ci/with-deadline.sh; its runs newest first, at most MAX_CANDIDATES, never this run. A run
 * counts only when it is this repository's (not a fork's), its workflow is ci.yml, and its lanes ran
 * green (`lanesGreen`: the run succeeded, a lane job succeeded, the verdict succeeded). The first
 * that counts is reused. A failed read, a shape the parser does not know, or no run that counts:
 * the lanes run.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** How many indexed runs the lookup reads, newest first. */
export const MAX_CANDIDATES = 5;
/** The workflow whose runs prove a tree. */
export const CI_WORKFLOW = ".github/workflows/ci.yml";
/** The index artifact's name before the id. */
export const INDEX_PREFIX = "code-tree-";
/** The stable start of the skipped line; the status reporter and the failure reporter match it. */
export const SKIPPED_PREFIX = "skipped — ";
/** A lane job's name in the Actions API (the reusable workflow's jobs, `E2E lanes / Lane 4 …`). */
export const LANE_JOB = "E2E lanes / Lane ";
/** The merged verdict's job name (ci.yml `e2e`). */
export const VERDICT_JOB = "E2E (Playwright, ethio-staging)";
/** The `--jq` filters the API reads use; the fixtures under scripts/fixtures/docs-only/ are their output. */
export const ARTIFACTS_JQ = "[.artifacts[] | {id, expired, workflow_run}]";
export const RUN_JQ = "{id, status, conclusion, path, event, head_branch, head_sha}";
export const JOBS_JQ = "[.jobs[] | {name, conclusion}]";

const SHA = /^[0-9a-f]{40}$/;
const TREE_ID = /^[0-9a-f]{64}$/;

/**
 * DEC-378 (b), the CI turn — files set aside exactly like a record: no lane and no first-download
 * step reads them, and their one CI reader (`scripts/conformance/briefs.test.ts`) runs in Component
 * tests, which a proven tree still runs.
 */
export const SET_ASIDE: readonly string[] = ["scripts/conformance/briefs-allowlist.txt"];

/**
 * A record: `docs/**` but never `docs/generated/**`, `.cursor/**`, a `*.md` at the root, or a
 * SET_ASIDE path.
 */
export function isRecord(path: string): boolean {
  if (SET_ASIDE.includes(path)) return true;
  if (path.startsWith("docs/generated/")) return false;
  if (path.startsWith("docs/") || path.startsWith(".cursor/")) return true;
  return !path.includes("/") && path.endsWith(".md");
}

/**
 * The code tree's id from `git ls-tree -r -z <commit>`: the sha256 of its entries (mode, type,
 * object, path) with every record set aside, one per line in git's order.
 */
export function codeTreeId(lsTree: string): string {
  const code = lsTree
    .split("\0")
    .filter((entry) => entry !== "")
    .filter((entry) => !isRecord(entry.slice(entry.indexOf("\t") + 1)));
  return createHash("sha256").update(code.join("\n")).digest("hex");
}

/** The id of a commit's (or a tree's) code tree, or null when git does not hold it. */
export function readCodeTreeId(treeish: string, cwd = process.cwd()): string | null {
  const read = spawnSync("git", ["ls-tree", "-r", "-z", treeish], {
    cwd,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return read.status === 0 ? codeTreeId(read.stdout) : null;
}

/** An indexed run, as the artifacts read names it. */
export type Candidate = {
  runId: number;
  expired: boolean;
  repositoryId: number;
  headRepositoryId: number;
};
export type RunView = {
  id: number;
  status: string;
  conclusion: string | null;
  path: string;
  event: string;
  headBranch: string;
  headSha: string;
};
export type JobView = { name: string; conclusion: string | null };

function isRecordObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function conclusionOf(value: unknown): string | null | undefined {
  if (value === null) return null;
  return typeof value === "string" ? value : undefined;
}

function parseJson(text: string): unknown {
  try {
    const value: unknown = JSON.parse(text);
    return value;
  } catch {
    return undefined;
  }
}

/** The indexed runs read by ARTIFACTS_JQ, or null when the answer has another shape. */
export function parseCandidates(text: string): Candidate[] | null {
  const list = parseJson(text);
  if (!Array.isArray(list)) return null;
  const candidates: Candidate[] = [];
  for (const item of list) {
    if (!isRecordObject(item)) return null;
    const { expired, workflow_run: run } = item;
    if (typeof expired !== "boolean" || !isRecordObject(run)) return null;
    const { id, repository_id: repositoryId, head_repository_id: headRepositoryId } = run;
    if (
      typeof id !== "number" ||
      typeof repositoryId !== "number" ||
      typeof headRepositoryId !== "number"
    )
      return null;
    candidates.push({ runId: id, expired, repositoryId, headRepositoryId });
  }
  return candidates;
}

/** The run read by RUN_JQ, or null when the answer has another shape. */
export function parseRun(text: string): RunView | null {
  const item = parseJson(text);
  if (!isRecordObject(item)) return null;
  const { id, status, path, event, head_branch: headBranch, head_sha: headSha } = item;
  const conclusion = conclusionOf(item["conclusion"]);
  if (
    typeof id !== "number" ||
    typeof status !== "string" ||
    conclusion === undefined ||
    typeof path !== "string" ||
    typeof event !== "string" ||
    typeof headBranch !== "string" ||
    typeof headSha !== "string" ||
    !SHA.test(headSha)
  )
    return null;
  return { id, status, conclusion, path, event, headBranch, headSha };
}

/** The jobs read by JOBS_JQ, or null when the answer has another shape. */
export function parseJobs(text: string): JobView[] | null {
  const list = parseJson(text);
  if (!Array.isArray(list)) return null;
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
export function lanesGreen(run: { conclusion: string | null }, jobs: JobView[]): boolean {
  return (
    run.conclusion === "success" &&
    jobs.some((job) => job.name.startsWith(LANE_JOB) && job.conclusion === "success") &&
    jobs.some((job) => job.name === VERDICT_JOB && job.conclusion === "success")
  );
}

/** What the decision reads from the Actions API; "unreadable" when a read or its shape failed. */
export type Probe = {
  candidates: (treeId: string) => Candidate[] | "unreadable";
  run: (runId: number) => RunView | "unreadable";
  jobs: (runId: number) => JobView[] | "unreadable";
};

export type Decision =
  | { docsOnly: true; runId: number; lanes: string }
  | { docsOnly: false; lanes: string };

/** A ref as the evidence line may print it: one line, no Markdown, at most 120 characters. */
function shown(ref: string): string {
  return ref.replace(/[^A-Za-z0-9._/@+-]/g, "?").slice(0, 120);
}

function ran(reason: string): Decision {
  return { docsOnly: false, lanes: `ran — ${reason}` };
}

/** The skipped line, read by the status reporter (`skipped — `) and the failure reporter. */
export function skippedLine(run: RunView): string {
  return `${SKIPPED_PREFIX}the code tree was proven by run ${String(run.id)} (${shown(run.event)}, ${shown(run.headBranch)}, head ${run.headSha.slice(0, 7)})`;
}

export function decide(treeId: string | null, selfRunId: number, probe: Probe): Decision {
  if (treeId === null || !TREE_ID.test(treeId))
    return ran("no proven code tree: this commit's tree could not be read");
  const short = treeId.slice(0, 12);
  const indexed = probe.candidates(treeId);
  if (indexed === "unreadable")
    return ran(`no proven code tree: the Actions API read of ${INDEX_PREFIX}${short}… failed`);
  const runIds = [
    ...new Set(
      indexed
        .filter((candidate) => !candidate.expired && candidate.runId !== selfRunId)
        .filter((candidate) => candidate.headRepositoryId === candidate.repositoryId)
        .map((candidate) => candidate.runId),
    ),
  ]
    .sort((a, b) => b - a)
    .slice(0, MAX_CANDIDATES);
  for (const runId of runIds) {
    const view = probe.run(runId);
    if (view === "unreadable")
      return ran(`no proven code tree: the Actions API read of run ${String(runId)} failed`);
    if (view.path !== CI_WORKFLOW || view.status !== "completed" || view.conclusion !== "success")
      continue;
    const jobs = probe.jobs(runId);
    if (jobs === "unreadable")
      return ran(`no proven code tree: the Actions API read of run ${String(runId)}'s jobs failed`);
    if (lanesGreen(view, jobs)) return { docsOnly: true, runId, lanes: skippedLine(view) };
  }
  return ran(
    `no proven code tree: no green ci.yml run of this repository holds ${INDEX_PREFIX}${short}… (${String(runIds.length)} read)`,
  );
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

function parsed<T>(text: string | null, parse: (text: string) => T | null): T | "unreadable" {
  const value = text === null ? null : parse(text);
  return value === null ? "unreadable" : value;
}

function liveProbe(repo: string): Probe {
  return {
    candidates: (treeId) =>
      parsed(
        api(
          `repos/${repo}/actions/artifacts?name=${INDEX_PREFIX}${treeId}&per_page=100`,
          ARTIFACTS_JQ,
        ),
        parseCandidates,
      ),
    run: (runId) => parsed(api(`repos/${repo}/actions/runs/${String(runId)}`, RUN_JQ), parseRun),
    jobs: (runId) =>
      parsed(
        api(`repos/${repo}/actions/runs/${String(runId)}/jobs?per_page=100`, JOBS_JQ),
        parseJobs,
      ),
  };
}

if (import.meta.main) {
  const sha = process.env["GITHUB_SHA"] ?? "";
  const ref = process.env["DOCS_ONLY_REF"] ?? "";
  const repo = process.env["GITHUB_REPOSITORY"] ?? "";
  const event = process.env["GITHUB_EVENT_NAME"] ?? "";
  const selfRunId = Number(process.env["GITHUB_RUN_ID"] ?? "");
  const temp = process.env["RUNNER_TEMP"] ?? "";
  const output = process.env["GITHUB_OUTPUT"];
  if (
    !SHA.test(sha) ||
    ref === "" ||
    repo === "" ||
    event === "" ||
    !Number.isInteger(selfRunId) ||
    temp === "" ||
    !output
  ) {
    console.error(
      "docs-only: GITHUB_SHA, DOCS_ONLY_REF, GITHUB_REPOSITORY, GITHUB_EVENT_NAME, GITHUB_RUN_ID, RUNNER_TEMP and GITHUB_OUTPUT are required",
    );
    process.exit(2);
  }
  const treeId = readCodeTreeId(sha);
  const decision = decide(treeId, selfRunId, liveProbe(repo));
  console.log(`DEC-365 lanes: ${decision.lanes}`);
  // The index carries no claim about the run's results: the lookup asks the API how the run ended.
  const indexed = !decision.docsOnly && treeId !== null ? treeId : "";
  if (indexed !== "") {
    const dir = join(temp, "code-tree");
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, "code-tree.txt"),
      `commit ${sha}\nevent ${event}\nref ${ref}\ntree ${indexed}\n`,
    );
  }
  appendFileSync(
    output,
    `docs_only=${decision.docsOnly ? "true" : "false"}\nlanes=${decision.lanes}\ntree=${indexed}\n`,
  );
}
