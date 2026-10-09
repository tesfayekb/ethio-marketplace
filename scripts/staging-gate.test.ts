import { afterEach, describe, expect, it } from "vitest";

import {
  busyRuns,
  describeRuns,
  gateEnv,
  overlapping,
  STAGING_WORKFLOWS,
  type RunInfo,
} from "./staging-gate";

/** DEC-168 — the staging gate's pure parts (SG-1..SG-4). */
function run(
  id: number,
  name: string,
  status: string,
  updatedAt = "2026-10-09T06:30:00Z",
): RunInfo {
  return {
    id,
    name,
    status,
    headSha: "abcdef0123456789",
    startedAt: "2026-10-09T06:00:00Z",
    updatedAt,
  };
}

describe("staging gate (DEC-168)", () => {
  const saved = { ...process.env };
  afterEach(() => {
    process.env = { ...saved };
  });

  it("SG-1 busyRuns counts only the other staging workflows' runs that have not completed", () => {
    expect(STAGING_WORKFLOWS).toEqual(["CI", "Nightly E2E", "Guard Proof", "Feed bench"]);
    const runs = [
      run(1, "CI", "in_progress"),
      run(2, "CI", "queued"),
      run(3, "Nightly E2E", "waiting"),
      run(4, "CI", "completed"),
      run(5, "CI Status Report", "in_progress"),
      run(6, "Feed bench", "in_progress"),
      run(7, "Scheduled", "in_progress"),
    ];
    expect(busyRuns(runs, 6, "Feed bench").map((r) => r.id)).toEqual([1, 2, 3]);
    // A second run of the caller's own workflow is its concurrency group's business.
    expect(busyRuns([run(8, "Feed bench", "queued")], 6, "Feed bench")).toEqual([]);
    expect(busyRuns([run(8, "Feed bench", "queued")], 9, "Nightly E2E").map((r) => r.id)).toEqual([
      8,
    ]);
  });

  it("SG-2 overlapping keeps runs still going or updated after the start", () => {
    const runs = [
      run(1, "CI", "completed", "2026-10-09T05:59:00Z"),
      run(2, "CI", "completed", "2026-10-09T06:10:00Z"),
      run(3, "CI", "in_progress"),
      run(4, "Push on dev", "completed", "2026-10-09T06:10:00Z"),
      run(9, "Nightly E2E", "in_progress"),
    ];
    expect(overlapping(runs, 9, "2026-10-09T06:00:00Z").map((r) => r.id)).toEqual([2, 3]);
  });

  it("SG-3 describeRuns names the workflow, the run, its state and the commit", () => {
    expect(describeRuns([run(42, "CI", "in_progress")])).toBe("CI run 42 (in_progress, abcdef01)");
    expect(describeRuns([])).toBe("");
  });

  it("SG-4 gateEnv is null outside GitHub Actions or without a token", () => {
    process.env["GITHUB_REPOSITORY"] = "o/r";
    process.env["GITHUB_RUN_ID"] = "123";
    process.env["GITHUB_WORKFLOW"] = "Feed bench";
    delete process.env["GH_TOKEN"];
    expect(gateEnv()).toBeNull();
    process.env["GH_TOKEN"] = "t";
    expect(gateEnv()).toEqual({ repo: "o/r", token: "t", selfRunId: 123, selfName: "Feed bench" });
    delete process.env["GITHUB_RUN_ID"];
    expect(gateEnv()).toBeNull();
  });
});
