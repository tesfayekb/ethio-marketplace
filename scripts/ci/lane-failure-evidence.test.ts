import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * INC-984 (Foundations turn N1b-2, C3 i) — a lane's failing guard lines reach the ci-evidence
 * branch. The outbound-calls step appends each FAIL line to local-backend-failure.txt; "Write lane
 * evidence" carries that file as the fragment's "- Step failure:" section; "Write proof summary
 * and notice" publishes it under "## Lane <lane>" in docs/tracking/local-backend-proof.md. This
 * test runs the workflow's own merge program over a smoke fragment fixture.
 */

const WORKFLOW = readFileSync(".github/workflows/local-backend-proof.yml", "utf8");

function heredoc(step: string): string {
  const at = WORKFLOW.indexOf(`- name: ${step}`);
  const start = WORKFLOW.indexOf("<<'PY'\n", at) + "<<'PY'\n".length;
  const end = WORKFLOW.indexOf("\n          PY\n", start);
  return WORKFLOW.slice(start, end)
    .split("\n")
    .map((line) => line.slice(10))
    .join("\n");
}

describe("a lane's step failure is published (INC-984)", () => {
  it("LFE-1 the outbound-calls step writes its FAIL and S5 lines to local-backend-failure.txt", () => {
    const at = WORKFLOW.indexOf("- name: Outbound-calls guard (INC-981)");
    const step = WORKFLOW.slice(at, WORKFLOW.indexOf("- name: ", at + 10));
    expect(step).toContain("grep '^Outbound-calls guard FAIL:'");
    expect(step).toContain("S5 live FAIL: %s answered HTTP %s");
    expect(step.match(/>> local-backend-failure\.txt/g)?.length).toBe(3);
    expect(heredoc("Write lane evidence")).toContain(
      "'- Step failure:', *[redact(line) for line in failure_lines]",
    );
  });

  it("LFE-2 the merge publishes the smoke fragment's step failure, redacted, in local-backend-proof.md", () => {
    const dir = mkdtempSync(join(tmpdir(), "lfe-"));
    try {
      mkdirSync(join(dir, "local-proof-artifacts", "local-proof-smoke"), { recursive: true });
      copyFileSync(
        "scripts/fixtures/lane-smoke-step-failure.md",
        join(dir, "local-proof-artifacts", "local-proof-smoke", "local-backend-proof-smoke.md"),
      );
      const result = spawnSync("python3", ["-c", heredoc("Write proof summary and notice")], {
        cwd: dir,
        encoding: "utf8",
        env: {
          PATH: process.env["PATH"] ?? "",
          GITHUB_SHA: "f".repeat(40),
          GITHUB_REPOSITORY: "o/r",
          GITHUB_RUN_ID: "1",
        },
        timeout: 20_000,
      });
      expect(result.status, result.stderr).toBe(0);
      const proof = readFileSync(join(dir, "docs/tracking/local-backend-proof.md"), "utf8");
      const lane = proof.slice(proof.indexOf("## Lane smoke"));
      expect(lane).toContain(
        "Outbound-calls guard FAIL: supabase_functions.e2e_planted_caller(): calls net.* outside job_call",
      );
      expect(lane).toContain(
        "S5 live FAIL: Accept-Profile: net answered HTTP 200: [] apikey [masked JWT]",
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
