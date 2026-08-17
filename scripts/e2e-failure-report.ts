#!/usr/bin/env bun
/**
 * U1e PART 1 — E2E FAILURE REPORTER.
 *
 * CI red on E2E used to mean a courier trip: download the Playwright artifact,
 * unzip it, read the HTML report. This script turns the machine-readable JSON
 * reporter output into ONE committed markdown file the supervisor reads by
 * clone: docs/tracking/e2e-last-failure.md.
 *
 * Laws it honours:
 *  - F1/F4: nothing secret is ever written. Anything shaped like an auth-token
 *    storage key or a JWT is redacted before it reaches the file.
 *  - Guard self-test (docs/features/ci-guards.md): SELF_TEST=1 renders a
 *    bundled fixture with two failures and asserts both are present — a
 *    reporter that only ever prints "no failures" proves nothing.
 */

const OUT = "docs/tracking/e2e-last-failure.md";
const FIXTURE = "scripts/fixtures/e2e-results-sample.json";

type PwStep = { title?: string; error?: unknown; steps?: PwStep[]; duration?: number };
type PwResult = { status?: string; error?: { message?: string }; steps?: PwStep[] };
type PwTest = { projectName?: string; status?: string; results?: PwResult[] };
type PwSpec = { title?: string; ok?: boolean; tests?: PwTest[] };
type PwSuite = { title?: string; specs?: PwSpec[]; suites?: PwSuite[] };
type PwJson = { suites?: PwSuite[]; stats?: { expected?: number; skipped?: number } };

// eslint-disable-next-line no-control-regex -- stripping real ANSI colour codes is the point
const ANSI = /\u001b\[[0-9;]*m/g;
const JWT = /\beyJ[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{5,}\b/g;
const STORAGE_KEY = /sb-[A-Za-z0-9-]+-auth-token/g;

export function redact(input: string): string {
  return input.replace(ANSI, "").replace(JWT, "[redacted-jwt]").replace(STORAGE_KEY, "[redacted]");
}

/** The innermost step that carries an error (or the last one attempted). */
function innermostFailedStep(steps: PwStep[] | undefined): string | null {
  if (!steps || steps.length === 0) return null;
  const failed = steps.filter((s) => s.error !== undefined);
  const pool = failed.length > 0 ? failed : [steps[steps.length - 1]!];
  const candidate = pool[pool.length - 1]!;
  return innermostFailedStep(candidate.steps) ?? candidate.title ?? null;
}

type Failure = { project: string; title: string; message: string; step: string | null };

export function collect(json: PwJson): { failures: Failure[]; passed: number; skipped: number } {
  const failures: Failure[] = [];

  const walk = (suite: PwSuite, trail: string[]) => {
    const path = suite.title ? [...trail, suite.title] : trail;
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests ?? []) {
        const status = test.status ?? "";
        if (status === "expected" || status === "skipped") continue;
        const result = (test.results ?? []).find((r) => r.status && r.status !== "passed");
        const raw = result?.error?.message ?? "(no error message captured)";
        const message = redact(raw).split("\n").slice(0, 40).join("\n");
        failures.push({
          project: test.projectName ?? "unknown",
          title: redact([...path, spec.title ?? "(untitled)"].join(" › ")),
          message,
          step: innermostFailedStep(result?.steps)
            ? redact(innermostFailedStep(result.steps)!)
            : null,
        });
      }
    }
    for (const child of suite.suites ?? []) walk(child, path);
  };

  for (const suite of json.suites ?? []) walk(suite, []);

  return {
    failures,
    passed: json.stats?.expected ?? 0,
    skipped: json.stats?.skipped ?? 0,
  };
}

/**
 * One CI job that produced (or failed to produce) test results. INC-081: the
 * merged report must name WHICH job a failure came from, and must quote a red
 * job that produced no results at all instead of silently counting it as zero.
 */
export type Source = {
  /** Human label: "smoke" or "shard 3". */
  label: string;
  json: PwJson | null;
  /** Last lines of the job log, already redacted, when results are missing. */
  logTail: string | null;
};

/** `e2e-results-smoke` → `smoke`; `e2e-results-3` → `shard 3`. */
export function sourceLabel(artifactDir: string): string {
  const id = artifactDir.replace(/^e2e-results-/, "");
  return /^\d+$/.test(id) ? `shard ${id}` : id;
}

export function renderSources(
  sources: Source[],
  meta: { runId: string; runUrl: string; sha: string },
): string {
  let passed = 0;
  let skipped = 0;
  const failures: (Failure & { source: string })[] = [];
  const silent: Source[] = [];

  for (const source of sources) {
    if (!source.json) {
      silent.push(source);
      continue;
    }
    const collected = collect(source.json);
    passed += collected.passed;
    skipped += collected.skipped;
    for (const f of collected.failures) failures.push({ ...f, source: source.label });
  }

  const lines = [
    "# Last E2E failure (auto-generated — do not edit by hand)",
    "",
    `- Run: ${meta.runUrl || meta.runId}`,
    `- Commit: \`${meta.sha}\``,
    `- Written (UTC): ${new Date().toISOString()}`,
    `- Passed: ${passed} · Skipped: ${skipped} · Failed: ${failures.length}`,
    `- Sources without results: ${silent.length === 0 ? "none" : silent.map((s) => s.label).join(", ")}`,
    "",
  ];

  if (failures.length === 0 && silent.length === 0) {
    lines.push("No failed tests were recorded in the JSON reporter output.", "");
    return lines.join("\n");
  }

  for (const f of failures) {
    lines.push(
      `## ${f.title}`,
      "",
      `- Source: \`${f.source}\``,
      `- Project: \`${f.project}\``,
      `- Failed step: ${f.step ? `\`${f.step}\`` : "(none recorded)"}`,
      "",
      "```text",
      f.message,
      "```",
      "",
    );
  }

  // Law F4: a red job that wrote no results is quoted, never counted as zero.
  for (const s of silent) {
    lines.push(
      `## ${s.label}: no results file`,
      "",
      `${s.label}: no results file — the process failed outside test results (setup/teardown/preflight).`,
      "",
      "```text",
      s.logTail ?? "(no log tail was uploaded for this source)",
      "```",
      "",
    );
  }

  return lines.join("\n");
}

export function render(json: PwJson, meta: { runId: string; runUrl: string; sha: string }): string {
  return renderSources([{ label: "all", json, logTail: null }], meta);
}

export function renderGreen(meta: { runId: string; runUrl: string; sha: string }): string {
  return [
    "# Last E2E failure (auto-generated — do not edit by hand)",
    "",
    `last E2E run ${meta.runId} passed`,
    "",
    `- Run: ${meta.runUrl || meta.runId}`,
    `- Commit: \`${meta.sha}\``,
    `- Written (UTC): ${new Date().toISOString()}`,
    "",
  ].join("\n");
}

/** Last `count` lines of a job log, redacted. */
async function logTail(path: string, count = 40): Promise<string | null> {
  const file = Bun.file(path);
  if (!(await file.exists())) return null;
  const text = redact(await file.text());
  return text.split("\n").slice(-count).join("\n").trim() || null;
}

async function main() {
  const meta = {
    runId: process.env["GITHUB_RUN_ID"] ?? "local",
    runUrl: process.env["E2E_RUN_URL"] ?? "",
    sha: process.env["GITHUB_SHA"] ?? "local",
  };

  if (process.env["SELF_TEST"] === "1") {
    const fixture = (await Bun.file(FIXTURE).json()) as PwJson;
    const out = renderSources(
      [
        { label: "shard 2", json: fixture, logTail: null },
        { label: "smoke", json: null, logTail: "Error: browserType.launch failed\nexit code 1" },
      ],
      { runId: "self-test", runUrl: "", sha: "self-test" },
    );
    const required = [
      "SO-2 settings: confirmed sign-out empties the gated surface",
      "AU-3 admin can deactivate a user",
      "waitForURL(/\\/$/)",
      "expect.toBeVisible",
      "- Source: `shard 2`",
      "smoke: no results file — the process failed outside test results (setup/teardown/preflight).",
      "browserType.launch failed",
    ];
    const missing = required.filter((needle) => !out.includes(needle));
    if (missing.length > 0) {
      console.error("SELF-TEST FAILED — missing from rendered report:", missing);
      process.exit(1);
    }
    if (sourceLabel("e2e-results-3") !== "shard 3" || sourceLabel("e2e-results-smoke") !== "smoke") {
      console.error("SELF-TEST FAILED — source labelling is wrong.");
      process.exit(1);
    }
    if (out.includes("eyJhbGciOi") || /sb-[a-z]+-auth-token/.test(out)) {
      console.error("SELF-TEST FAILED — secret-shaped text survived redaction.");
      process.exit(1);
    }
    console.log("Self-test OK: failures, steps, source labels, crash quoting and redaction verified.");
    return;
  }

  if (process.env["E2E_GREEN"] === "1") {
    await Bun.write(OUT, renderGreen(meta));
    console.log(`Wrote ${OUT} (green run ${meta.runId}).`);
    return;
  }

  // SHARDED RUNS: every source (smoke tier + four shards) uploads its own
  // results.json, so the reporter reads them ALL, labels each failure with its
  // source, and quotes the log tail of any source that produced no results.
  const dir = process.env["E2E_RESULTS_DIR"];
  const logsDir = process.env["E2E_LOGS_DIR"];
  const expected = (process.env["E2E_EXPECTED_SOURCES"] ?? "smoke,1,2,3,4")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const sources: Source[] = [];
  let found = 0;

  if (dir) {
    for (const id of expected) {
      const path = `${dir}/e2e-results-${id}/results.json`;
      const file = Bun.file(path);
      const json = (await file.exists()) ? ((await file.json()) as PwJson) : null;
      if (json) found += 1;
      sources.push({
        label: sourceLabel(`e2e-results-${id}`),
        json,
        logTail: json ? null : logsDir ? await logTail(`${logsDir}/e2e-log-${id}/${id}.log`) : null,
      });
    }
  } else {
    const path = process.env["E2E_RESULTS_JSON"] ?? "test-results/results.json";
    const file = Bun.file(path);
    const json = (await file.exists()) ? ((await file.json()) as PwJson) : null;
    if (json) found += 1;
    sources.push({ label: "all", json, logTail: null });
  }

  await Bun.write(OUT, renderSources(sources, meta));
  console.log(`Wrote ${OUT} (${found}/${sources.length} source result file(s) found).`);
}

if (import.meta.main) await main();

