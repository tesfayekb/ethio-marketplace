import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
// @ts-expect-error — plain Node module (it must run before the install), no declaration file.
import { failedStepLines, TAIL_LINES } from "./step-failures.mjs";

/**
 * INC-992 (Foundations turn N1b-3, C3) — every lane step's failure reaches the evidence by one
 * mechanism: the lane job's run shell keeps each step's output, and "Name failed steps" names each
 * failed step by id and outcome with its last lines in local-backend-failure.txt.
 */

const WORKFLOW = readFileSync(".github/workflows/local-backend-proof.yml", "utf8");
const PROOF_JOB = WORKFLOW.slice(WORKFLOW.indexOf("\n  proof:\n"), WORKFLOW.indexOf("\n  summary:\n"));

function stepsOf(job: string): string[] {
  return job.split(/\n(?= {6}- )/).filter((block) => block.startsWith("      - "));
}

describe("a lane step's failure reaches the evidence (INC-992)", () => {
  it("SFE-1 every lane step has a unique id, run steps use the keeping shell, and the naming step runs always", () => {
    const steps = stepsOf(PROOF_JOB);
    const ids = steps.map((step) => /\n {8}id: (\S+)/.exec(step)?.[1] ?? `(none) ${step.slice(0, 60)}`);
    expect(ids.filter((id) => id.startsWith("(none)"))).toEqual([]);
    expect(new Set(ids).size).toBe(ids.length);
    expect(PROOF_JOB).toContain("        shell: bash scripts/ci/step-shell.sh {0}");
    const naming = steps.findIndex((step) => step.includes("- name: Name failed steps (INC-992)"));
    const evidence = steps.findIndex((step) => step.includes("- name: Write lane evidence"));
    expect(naming).toBeGreaterThan(-1);
    expect(naming).toBe(evidence - 1);
    expect(steps[naming]).toContain("if: always()");
    expect(steps[naming]).toContain("STEPS_JSON: ${{ toJSON(steps) }}");
    // Steps before the checkout cannot reach the keeping shell; they say bash themselves.
    const checkout = steps.findIndex((step) => step.includes("uses: actions/checkout@"));
    for (const step of steps.slice(0, checkout)) expect(step).toContain("shell: bash\n");
  });

  it("SFE-2 a planted failing step is named with its outcome and last lines; success and skipped are not", () => {
    const dir = mkdtempSync(join(tmpdir(), "sfe-"));
    try {
      const logs = join(dir, "step-logs");
      mkdirSync(logs);
      // The run shell keeps the planted step's output, as it does on the runner.
      const script = join(dir, "planted.sh");
      writeFileSync(script, 'for i in $(seq 1 30); do echo "line $i"; done\necho "boom" >&2\nexit 3\n');
      const shell = spawnSync("bash", ["scripts/ci/step-shell.sh", script], {
        encoding: "utf8",
        env: { PATH: process.env["PATH"] ?? "", RUNNER_TEMP: dir, GITHUB_ACTION: "run-proof-lane" },
      });
      expect(shell.status).toBe(3);
      const steps = JSON.stringify({
        "install-dependencies": { outcome: "success", conclusion: "success" },
        "run-proof-lane": { outcome: "failure", conclusion: "failure" },
        "cache-playwright-browsers": { outcome: "failure", conclusion: "success" },
        build: { outcome: "skipped", conclusion: "skipped" },
      });
      const failure = join(dir, "local-backend-failure.txt");
      const run = spawnSync("node", ["scripts/ci/step-failures.mjs"], {
        encoding: "utf8",
        env: { PATH: process.env["PATH"] ?? "", RUNNER_TEMP: dir, STEPS_JSON: steps, FAILURE_FILE: failure },
      });
      expect(run.status, run.stderr).toBe(0);
      const lines = readFileSync(failure, "utf8").trimEnd().split("\n");
      expect(lines[0]).toBe("Step run-proof-lane: outcome failure");
      expect(lines.slice(1, 1 + TAIL_LINES)).toEqual([
        ...Array.from({ length: TAIL_LINES - 1 }, (_, i) => `  line ${i + 12}`),
        "  boom",
      ]);
      expect(lines.slice(1 + TAIL_LINES)).toEqual([
        "Step cache-playwright-browsers: outcome failure",
        "  (no log kept by step cache-playwright-browsers)",
      ]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("SFE-3 nothing failed writes nothing; unreadable steps say so", () => {
    expect(failedStepLines(JSON.stringify({ a: { outcome: "success" } }), "/nonexistent")).toEqual([]);
    expect(failedStepLines("{", "/nonexistent")).toEqual(["Name failed steps: STEPS_JSON unreadable"]);
  });
});
