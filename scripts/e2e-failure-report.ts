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
          step: innermostFailedStep(result?.steps) ? redact(innermostFailedStep(result.steps)!) : null,
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

export function render(json: PwJson, meta: { runId: string; runUrl: string; sha: string }): string {
  const { failures, passed, skipped } = collect(json);
  const lines = [
    "# Last E2E failure (auto-generated — do not edit by hand)",
    "",
    `- Run: ${meta.runUrl || meta.runId}`,
    `- Commit: \`${meta.sha}\``,
    `- Written (UTC): ${new Date().toISOString()}`,
    `- Passed: ${passed} · Skipped: ${skipped} · Failed: ${failures.length}`,
    "",
  ];

  if (failures.length === 0) {
    lines.push("No failed tests were recorded in the JSON reporter output.", "");
    return lines.join("\n");
  }

  for (const f of failures) {
    lines.push(
      `## ${f.title}`,
      "",
      `- Project: \`${f.project}\``,
      `- Failed step: ${f.step ? `\`${f.step}\`` : "(none recorded)"}`,
      "",
      "```text",
      f.message,
      "```",
      "",
    );
  }

  return lines.join("\n");
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

async function main() {
  const meta = {
    runId: process.env["GITHUB_RUN_ID"] ?? "local",
    runUrl: process.env["E2E_RUN_URL"] ?? "",
    sha: process.env["GITHUB_SHA"] ?? "local",
  };

  if (process.env["SELF_TEST"] === "1") {
    const fixture = (await Bun.file(FIXTURE).json()) as PwJson;
    const out = render(fixture, { runId: "self-test", runUrl: "", sha: "self-test" });
    const required = [
      "SO-2 settings: confirmed sign-out empties the gated surface",
      "AU-3 admin can deactivate a user",
      "waitForURL(/\\/$/)",
      "expect.toBeVisible",
    ];
    const missing = required.filter((needle) => !out.includes(needle));
    if (missing.length > 0) {
      console.error("SELF-TEST FAILED — missing from rendered report:", missing);
      process.exit(1);
    }
    if (out.includes("eyJhbGciOi") || /sb-[a-z]+-auth-token/.test(out)) {
      console.error("SELF-TEST FAILED — secret-shaped text survived redaction.");
      process.exit(1);
    }
    console.log("Self-test OK: both failures, their steps, and redaction verified.");
    return;
  }

  if (process.env["E2E_GREEN"] === "1") {
    await Bun.write(OUT, renderGreen(meta));
    console.log(`Wrote ${OUT} (green run ${meta.runId}).`);
    return;
  }

  const resultsPath = process.env["E2E_RESULTS_JSON"] ?? "test-results/results.json";
  const file = Bun.file(resultsPath);
  if (!(await file.exists())) {
    // Law F4: a missing results file is reported as itself, never as "green".
    await Bun.write(
      OUT,
      [
        "# Last E2E failure (auto-generated — do not edit by hand)",
        "",
        `- Run: ${meta.runUrl || meta.runId}`,
        `- Commit: \`${meta.sha}\``,
        "",
        `No JSON reporter output was found at \`${resultsPath}\`; the E2E job failed`,
        "before Playwright wrote results (setup, build, or preflight).",
        "",
      ].join("\n"),
    );
    console.log(`Wrote ${OUT} (no results file).`);
    return;
  }

  const json = (await file.json()) as PwJson;
  await Bun.write(OUT, render(json, meta));
  console.log(`Wrote ${OUT}.`);
}

if (import.meta.main) await main();
