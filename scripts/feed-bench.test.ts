import { describe, expect, it } from "vitest";

import {
  BATCH,
  GATE_WAIT_MINUTES,
  isStatementTimeout,
  nearestRank,
  renderStatus,
  summarise,
  verdict,
  type ShapeResult,
} from "./feed-bench";

function six(): ShapeResult[] {
  return ["a", "b", "c", "d", "e", "f"].map((name) => ({
    name,
    runs: 30,
    p50: 5,
    p95: 10,
    max: 12,
    cards: 20,
  }));
}

describe("feed-bench", () => {
  it("FB-1 nearestRank", () => {
    expect(nearestRank([5, 1, 3, 2, 4], 0.95)).toBe(5);
    expect(nearestRank([5, 1, 3, 2, 4], 0.5)).toBe(3);
    expect(
      nearestRank(
        Array.from({ length: 30 }, (_, i) => i + 1),
        0.95,
      ),
    ).toBe(29);
    expect(() => nearestRank([], 0.95)).toThrow();
  });

  it("FB-2 summarise", () => {
    expect(summarise([1, 2, 3, 4])).toEqual({ runs: 4, p50: 2, p95: 4, max: 4 });
  });

  it("FB-3 verdict", () => {
    expect(verdict(six(), 10000, 0).pass).toBe(true);
    const slow = six();
    slow[2] = { ...slow[2]!, p95: 50.01 };
    const v = verdict(slow, 10000, 0);
    expect(v.pass).toBe(false);
    expect(v.lines.some((l) => l.includes('"c"'))).toBe(true);
    const few = six();
    few[0] = { ...few[0]!, cards: 19 };
    expect(verdict(few, 10000, 0).pass).toBe(false);
    expect(verdict(six(), 30721, 0).pass).toBe(false);
    expect(verdict(six(), 10000, 1).pass).toBe(false);
  });

  it("FB-4 renderStatus", () => {
    const text = renderStatus({
      runUrl: "local",
      runSha: "local",
      timestamp: "2026-10-09T00:00:00.000Z",
      outcome: "PASS",
      seeded: 100500,
      seedSeconds: 1,
      cleanupSeconds: 1,
      leftovers: 0,
      shapes: six(),
      bytes: 10000,
    });
    expect(text).toContain("Verdict: PASS");
    for (const s of six()) expect(text).toContain(`| ${s.name} | 30 |`);
    expect(text).toContain("- Not measured here:");
  });

  it("FB-5 isStatementTimeout and BATCH", () => {
    expect(isStatementTimeout("canceling statement due to statement timeout")).toBe(true);
    expect(isStatementTimeout("duplicate key value")).toBe(false);
    expect(BATCH).toBe(250);
  });

  it("FB-6 a skipped or yielded run names its reason (DEC-168)", () => {
    const base = {
      runUrl: "local",
      runSha: "local",
      timestamp: "2026-10-09T00:00:00.000Z",
      seeded: 0,
      seedSeconds: 0,
      cleanupSeconds: 0,
      leftovers: 0,
      shapes: [],
      bytes: 0,
    };
    expect(
      renderStatus({
        ...base,
        outcome: "SKIPPED",
        error: "staging busy for 40 min: CI run 1 (in_progress, abcdef01)",
      }),
    ).toContain("Verdict: SKIPPED (staging busy for 40 min: CI run 1 (in_progress, abcdef01))");
    expect(
      renderStatus({ ...base, outcome: "YIELDED", error: "CI run 2 (queued, abcdef01) started" }),
    ).toContain("Verdict: YIELDED (CI run 2 (queued, abcdef01) started)");
    expect(renderStatus({ ...base, outcome: "PASS" })).toContain("Verdict: PASS");
    expect(GATE_WAIT_MINUTES).toBe(40);
  });
});
