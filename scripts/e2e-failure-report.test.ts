import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { selfTestFailureLines } from "./e2e-failure-report";

/**
 * INC-1101 (housekeeping turn 3) — the E2E evidence writer's in-file self-test (SELF_TEST=1, its
 * real captured fixtures under scripts/fixtures/) runs inside `bunx vitest run scripts`, so a
 * fixture failure is seen before the push, not only in ci.yml's verdict job.
 */

describe("the E2E failure reporter's self-test runs in the unit suite (INC-1101)", () => {
  it("EFR-1 SELF_TEST=1 passes on every captured fixture, the INC-1101 step classes included", () => {
    const result = spawnSync("bun", ["scripts/e2e-failure-report.ts"], {
      encoding: "utf8",
      env: { ...process.env, SELF_TEST: "1" },
      timeout: 60_000,
    });
    const out = `${result.stdout}${result.stderr}`;
    expect(out).not.toContain("SELF-TEST FAILED");
    expect(result.status).toBe(0);
    expect(out).toContain("Self-test OK:");
  });

  it("EFR-2 a failed check prints under its own record; a name with none under the block's", () => {
    expect(
      selfTestFailureLines(
        [
          "INC-1101 an install death is INFRA",
          "54 [ssr-error] lines counted",
          "R1a census names the missing log",
          "INC-1101 the verdict class",
          "DEC-340 the server record's frames",
          "R1b a11y: all N logs read",
          "27 rows",
        ],
        "DEC-083/084 census",
      ),
    ).toEqual([
      "SELF-TEST FAILED — INC-1101: INC-1101 an install death is INFRA; INC-1101 the verdict class",
      "SELF-TEST FAILED — DEC-083/084 census: 54 [ssr-error] lines counted; 27 rows",
      "SELF-TEST FAILED — R1a: R1a census names the missing log",
      "SELF-TEST FAILED — DEC-340: DEC-340 the server record's frames",
      "SELF-TEST FAILED — R1b: R1b a11y: all N logs read",
    ]);
    expect(selfTestFailureLines([], "DEC-083/084 census")).toEqual([]);
  });
});
