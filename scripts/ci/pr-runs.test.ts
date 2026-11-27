import { spawnSync } from "node:child_process";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { lanesSkippedReason, renderLanesSkipped } from "../e2e-failure-report";
import { draftDecision, DRAFT_LINE, SKIPPED_PREFIX } from "./docs-only";

// cursor-ci-speed (ruling 1, decision 4 a and b) — a pull request's newer push cancels its run in
// progress while dev's runs queue (DEC-181); a draft pull request's run skips the lanes and the
// bundle budget, and marking it ready runs them. The draft answer exists only for a pull_request
// event: a push never takes it, whatever the environment holds.
const CI = readFileSync(".github/workflows/ci.yml", "utf8");

/** The text of one top-level job (`  <name>:` up to the next job), or "" when it is absent. */
function jobBlock(name: string): string {
  const start = CI.indexOf(`\n  ${name}:\n`);
  if (start < 0) return "";
  const rest = CI.slice(start + 1);
  const next = rest.slice(1).search(/\n {2}[a-z][\w-]*:\n/);
  return next < 0 ? rest : rest.slice(0, next + 1);
}

/** docs-only.ts run as the scope job runs it, with a fake `gh` that logs its calls. */
function scope(
  event: string,
  draft: string | undefined,
): {
  log: string;
  output: string;
  calls: string;
} {
  const dir = mkdtempSync(join(tmpdir(), "pr-runs-"));
  const bin = join(dir, "bin");
  mkdirSync(bin);
  const calls = join(dir, "gh-calls.txt");
  const gh = join(bin, "gh");
  writeFileSync(gh, `#!/usr/bin/env bash\necho "$*" >> "${calls}"\necho '[]'\n`);
  chmodSync(gh, 0o755);
  const output = join(dir, "output.txt");
  writeFileSync(output, "");
  const head = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).stdout.trim();
  const env: Record<string, string> = {
    PATH: `${bin}:${process.env["PATH"] ?? ""}`,
    HOME: process.env["HOME"] ?? "",
    GITHUB_SHA: head,
    DOCS_ONLY_REF: "cursor/planted",
    GITHUB_REPOSITORY: "planted/repository",
    GITHUB_EVENT_NAME: event,
    GITHUB_RUN_ID: "1",
    RUNNER_TEMP: dir,
    GITHUB_OUTPUT: output,
  };
  if (draft !== undefined) env["DOCS_ONLY_DRAFT"] = draft;
  const run = spawnSync("bun", ["scripts/ci/docs-only.ts"], { encoding: "utf8", env });
  if (run.status !== 0) throw new Error(`docs-only.ts exited ${String(run.status)}: ${run.stderr}`);
  return {
    log: run.stdout,
    output: readFileSync(output, "utf8"),
    calls: existsSync(calls) ? readFileSync(calls, "utf8") : "",
  };
}

describe("full runs only where a verdict is due (cursor-ci-speed part C)", () => {
  it("CF-PRRUN-1 a pull request's newer push cancels its run; dev's runs queue", () => {
    expect(CI).toMatch(/\nconcurrency:\n {2}group: ci-\$\{\{ github\.ref \}\}\n/);
    expect(CI).toContain("\n  cancel-in-progress: ${{ github.event_name == 'pull_request' }}\n");
    expect(CI).not.toContain("cancel-in-progress: true");
    expect(CI).toMatch(/\non:\n {2}push:\n {4}branches: \[dev\]\n/);
  });

  it("CF-PRRUN-2 marking a draft ready starts a run, and the scope job reads the draft flag", () => {
    const trigger =
      /\n {2}pull_request:\n {4}branches: \[dev\]\n(?: {4}#.*\n)* {4}types: \[([^\]]*)\]\n/.exec(
        CI,
      );
    expect(trigger?.[1]?.split(", ").sort()).toEqual([
      "opened",
      "ready_for_review",
      "reopened",
      "synchronize",
    ]);
    expect(jobBlock("scope")).toContain("DOCS_ONLY_DRAFT: ${{ github.event.pull_request.draft }}");
    for (const job of ["bundle-budget", "e2e-lanes"])
      expect(jobBlock(job), job).toContain("needs.scope.outputs.docs_only != 'true'");
  });

  it("CF-PRRUN-3 the draft answer exists only for a pull_request event", () => {
    expect(draftDecision("pull_request", "true")).toEqual({
      docsOnly: true,
      runId: null,
      lanes: "skipped: draft pull request",
    });
    expect(draftDecision("pull_request", "false")).toBeNull();
    expect(draftDecision("pull_request", "")).toBeNull();
    for (const event of ["push", "workflow_dispatch", "pull_request_target", ""])
      expect(draftDecision(event, "true"), event).toBeNull();
  });

  it("CF-PRRUN-4 a draft's scope reads nothing and skips; a push holding the flag runs the lanes", () => {
    const draft = scope("pull_request", "true");
    expect(draft.log).toContain(`DEC-365 lanes: ${DRAFT_LINE}\n`);
    expect(draft.output).toBe(`docs_only=true\nlanes=${DRAFT_LINE}\ntree=\n`);
    expect(draft.calls).toBe("");
    const ready = scope("pull_request", "false");
    expect(ready.output).toMatch(/^docs_only=false\nlanes=ran — .*\ntree=[0-9a-f]{64}\n$/);
    expect(ready.calls).toContain("actions/artifacts?name=code-tree-");
    const push = scope("push", "true");
    expect(push.output).toMatch(/^docs_only=false\nlanes=ran — .*\(0 read\)\ntree=[0-9a-f]{64}\n$/);
    expect(push.calls).toContain("actions/artifacts?name=code-tree-");
  });

  it("CF-PRRUN-5 the draft line is never a proven tree; the failure file names the draft", () => {
    expect(DRAFT_LINE.startsWith(SKIPPED_PREFIX)).toBe(false);
    const status = readFileSync(".github/workflows/ci-status-report.yml", "utf8");
    expect(status).toContain(`lanesLine.startsWith('${SKIPPED_PREFIX}')`);
    expect(lanesSkippedReason(DRAFT_LINE)).toBe("a draft pull request");
    const file = renderLanesSkipped({
      runId: "1",
      runUrl: "",
      sha: "0".repeat(40),
      attempt: "1",
      lanes: DRAFT_LINE,
    });
    expect(file).toContain("last E2E run 1 ran no lanes — a draft pull request");
    expect(file).toContain(`- Lanes: ${DRAFT_LINE}`);
  });
});
