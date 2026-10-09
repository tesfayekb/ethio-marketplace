/**
 * DEC-168 — THE STAGING GATE. Four workflows use ethio-staging: CI, Nightly E2E,
 * Guard Proof and Feed bench. CI has priority and never waits. The bench waits
 * for a quiet staging before it writes and yields when a run starts; the
 * nightly waits before it starts and records every run that overlapped it.
 * Read through the Actions API with the workflow's own token (actions: read).
 */

export const STAGING_WORKFLOWS = ["CI", "Nightly E2E", "Guard Proof", "Feed bench"] as const;

export interface RunInfo {
  id: number;
  name: string;
  status: string;
  headSha: string;
  startedAt: string;
  updatedAt: string;
}

/**
 * The runs of the OTHER staging workflows that have not completed (queued,
 * waiting or running). A run of the caller's own workflow is left to that
 * workflow's concurrency group.
 */
export function busyRuns(runs: RunInfo[], selfRunId: number, selfName: string): RunInfo[] {
  const names: readonly string[] = STAGING_WORKFLOWS;
  return runs.filter(
    (r) =>
      r.id !== selfRunId &&
      r.name !== selfName &&
      r.status !== "completed" &&
      names.includes(r.name),
  );
}

/** The other staging runs that were running at some moment after `since`. */
export function overlapping(runs: RunInfo[], selfRunId: number, since: string): RunInfo[] {
  const names: readonly string[] = STAGING_WORKFLOWS;
  const from = Date.parse(since);
  return runs.filter(
    (r) =>
      r.id !== selfRunId &&
      names.includes(r.name) &&
      (r.status !== "completed" || Date.parse(r.updatedAt) > from),
  );
}

export function describeRuns(runs: RunInfo[]): string {
  return runs
    .map((r) => `${r.name} run ${r.id} (${r.status}, ${r.headSha.slice(0, 8)})`)
    .join("; ");
}

interface ApiRun {
  id: number;
  name: string | null;
  status: string | null;
  head_sha: string;
  run_started_at?: string | null;
  created_at: string;
  updated_at: string;
}

function toRun(r: ApiRun): RunInfo {
  return {
    id: r.id,
    name: r.name ?? "",
    status: r.status ?? "",
    headSha: r.head_sha,
    startedAt: r.run_started_at ?? r.created_at,
    updatedAt: r.updated_at,
  };
}

export interface GateEnv {
  repo: string;
  token: string;
  selfRunId: number;
  selfName: string;
}

/** The gate's settings from GitHub Actions' own variables; null outside Actions. */
export function gateEnv(): GateEnv | null {
  const repo = process.env["GITHUB_REPOSITORY"] ?? "";
  const token = process.env["GH_TOKEN"] ?? "";
  const selfRunId = Number(process.env["GITHUB_RUN_ID"] ?? "");
  const selfName = process.env["GITHUB_WORKFLOW"] ?? "";
  if (repo === "" || token === "" || !Number.isFinite(selfRunId) || selfRunId <= 0) return null;
  return { repo, token, selfRunId, selfName };
}

async function api<T>(env: GateEnv, path: string): Promise<T> {
  const res = await fetch(`https://api.github.com/repos/${env.repo}${path}`, {
    headers: {
      Authorization: `Bearer ${env.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!res.ok) throw new Error(`staging gate: GitHub API ${path} answered HTTP ${res.status}`);
  return (await res.json()) as T;
}

/** The 100 newest runs of every workflow in the repository. */
export async function recentRuns(env: GateEnv): Promise<RunInfo[]> {
  const body = await api<{ workflow_runs?: ApiRun[] }>(env, "/actions/runs?per_page=100");
  return (body.workflow_runs ?? []).map(toRun);
}

export async function selfRun(env: GateEnv): Promise<RunInfo> {
  return toRun(await api<ApiRun>(env, `/actions/runs/${env.selfRunId}`));
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Waits until no other staging run is busy, up to `maxMinutes`. */
export async function waitForQuiet(
  env: GateEnv,
  maxMinutes: number,
  pollSeconds = 30,
): Promise<{ quiet: boolean; waitedSeconds: number; busy: RunInfo[] }> {
  const start = Date.now();
  for (;;) {
    const busy = busyRuns(await recentRuns(env), env.selfRunId, env.selfName);
    const waitedSeconds = Math.round((Date.now() - start) / 1000);
    if (busy.length === 0) return { quiet: true, waitedSeconds, busy };
    if (Date.now() - start >= maxMinutes * 60_000) return { quiet: false, waitedSeconds, busy };
    console.log(`staging gate: waiting — ${describeRuns(busy)}`);
    await sleep(pollSeconds * 1000);
  }
}

/** Throws a YieldError when another staging run has started; asks at most every `everySeconds`. */
export class YieldError extends Error {}

export function yieldWatcher(env: GateEnv, everySeconds = 15): () => Promise<void> {
  let last = 0;
  return async () => {
    if (Date.now() - last < everySeconds * 1000) return;
    last = Date.now();
    let runs: RunInfo[];
    try {
      runs = await recentRuns(env);
    } catch (error) {
      // An unreadable answer mid-run is a warning, never a reason to stop.
      console.log(`::warning::${error instanceof Error ? error.message : String(error)}`);
      return;
    }
    const busy = busyRuns(runs, env.selfRunId, env.selfName);
    if (busy.length > 0) throw new YieldError(`${describeRuns(busy)} started`);
  };
}

// ------------------------------------------------- the nightly's command line

async function cli(): Promise<number> {
  const env = gateEnv();
  const mode = process.argv[2] ?? "";
  if (env === null) {
    console.log("::notice::staging gate: not on GitHub Actions with a token — not checked");
    return 0;
  }
  if (mode === "wait") {
    const minutes = Number(process.argv[3] ?? "60");
    const result = await waitForQuiet(env, minutes);
    if (result.quiet) {
      console.log(`::notice::staging gate: staging quiet after ${result.waitedSeconds} s`);
    } else {
      console.log(
        `::warning::staging gate: still busy after ${minutes} min — running anyway: ${describeRuns(result.busy)}`,
      );
    }
    return 0;
  }
  if (mode === "overlaps") {
    const me = await selfRun(env);
    const others = overlapping(await recentRuns(env), env.selfRunId, me.startedAt);
    if (others.length === 0) {
      console.log("::notice::staging gate: no other staging run overlapped this run");
    } else {
      for (const r of others) {
        console.log(`::notice::staging gate: overlapped by ${describeRuns([r])}`);
      }
    }
    return 0;
  }
  console.log("::error::staging gate: usage — staging-gate.ts wait <minutes> | overlaps");
  return 1;
}

if (import.meta.main) {
  cli().then(
    (code) => process.exit(code),
    (error: unknown) => {
      // The nightly runs anyway: an unreadable gate is a warning, never a stop.
      console.log(
        `::warning::staging gate: ${error instanceof Error ? error.message : String(error)}`,
      );
      process.exit(0);
    },
  );
}
