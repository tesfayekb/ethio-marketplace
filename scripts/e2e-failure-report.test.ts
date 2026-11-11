import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

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
});
