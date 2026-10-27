import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * INC-935 (Foundations turn 34e, DEC-275) — scripts/ci/with-deadline.sh: a CI install runs under a
 * deadline, a failed or overdue try is retried out loud, and the last try's exit code is the step's.
 */

const SCRIPT = "scripts/ci/with-deadline.sh";

function run(args: string[]) {
  const result = spawnSync("bash", [SCRIPT, ...args], {
    encoding: "utf8",
    env: { ...process.env, WITH_DEADLINE_PAUSE: "0" },
    timeout: 20_000,
  });
  return { code: result.status, out: `${result.stdout}${result.stderr}` };
}

describe("every outside call in CI carries a deadline (INC-935)", () => {
  it("WDL-1 a command that succeeds runs once and says nothing", () => {
    const result = run(["5", "2", "--", "bash", "-c", "echo once"]);
    expect(result.code).toBe(0);
    expect(result.out).toBe("once\n");
  });

  it("WDL-2 a failed try is retried out loud and the second try's success is the step's", () => {
    const dir = mkdtempSync(join(tmpdir(), "wdl-"));
    try {
      const mark = join(dir, "tried");
      const result = run([
        "5",
        "2",
        "--",
        "bash",
        "-c",
        `if [ -e "${mark}" ]; then echo second; exit 0; fi; touch "${mark}"; exit 3`,
      ]);
      expect(result.code).toBe(0);
      expect(result.out).toContain("::warning title=ci-retry::");
      expect(result.out).toContain("failed with exit 3 on try 1 of 2; trying again");
      expect(result.out).toContain("second\n");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("WDL-3 a command past its deadline is stopped on every try and the step fails with the deadline's code", () => {
    const begun = Date.now();
    const result = run(["1", "2", "--", "sleep", "30"]);
    expect(Date.now() - begun).toBeLessThan(15_000);
    expect(result.code).toBe(124);
    expect(result.out).toContain("ran past its 1s deadline on try 1 of 2; trying again");
    expect(result.out).toContain(
      "::error title=ci-deadline::sleep 30 ran past its 1s deadline on try 2 of 2",
    );
  });

  it("WDL-4 a call without its deadline, its tries or the separator is refused before anything runs", () => {
    expect(run(["5", "--", "true"]).code).toBe(2);
    expect(run(["5", "2", "true"]).code).toBe(2);
    expect(run(["0", "2", "--", "true"]).code).toBe(2);
    expect(run(["five", "2", "--", "true"]).code).toBe(2);
  });
});
