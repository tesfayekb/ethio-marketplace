import { describe, expect, it } from "vitest";

import { SCRATCH_USER_DOMAIN } from "../e2e/helpers/scratch";
import {
  BATCH,
  GATE_WAIT_MINUTES,
  HOT,
  LISTINGS,
  baselineLevel,
  benchTier,
  isStatementTimeout,
  levelMix,
  nearestRank,
  renderStatus,
  SHAPE_NAMES,
  summarise,
  verdict,
  type ShapeResult,
} from "./feed-bench";
import {
  SELLERS,
  benchCountryName,
  benchSellerEmail,
  isBenchCountry,
  isBenchSellerEmail,
  seedPlan,
} from "./feed-bench-market";

function six(): ShapeResult[] {
  return SHAPE_NAMES.map((name) => ({
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
    expect(v.lines.some((l) => l.includes(`"${SHAPE_NAMES[2]}"`))).toBe(true);
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
      seedSeconds: 300,
      sellerSeconds: 120.5,
      insertSeconds: 170.4,
      cleanupSeconds: 1,
      leftovers: 0,
      sellers: 2048,
      market: "QM",
      free: 50,
      shapes: six(),
      bytes: 10000,
    });
    expect(text).toContain("Verdict: PASS");
    expect(text).toContain("seed 300.0 s (sellers 120.5 s, listings 170.4 s) · cleanup 1.0 s");
    expect(text).toContain("leftovers 0 · sellers 2048 · market QM free 50");
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
      sellerSeconds: 0,
      insertSeconds: 0,
      cleanupSeconds: 0,
      leftovers: 0,
      sellers: 0,
      market: "none",
      free: 0,
      shapes: [],
      bytes: null,
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

  it("FB-10 a yielded run (no shape, no page size) prints no PASS line and names each value it did not measure (INC-1228)", () => {
    const judged = verdict([], null, 0);
    expect(judged.pass).toBe(false);
    expect(judged.lines.some((line) => line.startsWith("PASS"))).toBe(false);
    for (const shape of six()) expect(judged.lines).toContain(`NOT MEASURED: "${shape.name}"`);
    expect(judged.lines).toContain("NOT MEASURED: page size");
    const text = renderStatus({
      runUrl: "local",
      runSha: "local",
      timestamp: "2026-11-21T10:04:39.660Z",
      outcome: "YIELDED",
      error: "CI run 44892432414 (in_progress, 37b62562) started",
      seeded: 0,
      seedSeconds: 154.6,
      sellerSeconds: 124.9,
      insertSeconds: 1.4,
      cleanupSeconds: 13.4,
      leftovers: 0,
      sellers: 2048,
      market: "QM",
      free: 50,
      shapes: [],
      bytes: null,
    });
    expect(text).toContain("Verdict: YIELDED (CI run 44892432414 (in_progress, 37b62562) started)");
    expect(text).not.toContain("everywhere): 0 bytes");
    expect(text).toContain(
      "- Page size (all categories, everywhere): not measured (target ≤ 30720)",
    );
    for (const shape of six()) expect(text).toContain(`- Not measured: "${shape.name}"`);
  });

  it("FB-11 a run that failed after some shapes prints no PASS line; everything measured and met prints PASS", () => {
    const some = verdict(six().slice(0, 3), 10000, 0);
    expect(some.pass).toBe(false);
    expect(some.lines.some((line) => line.startsWith("PASS"))).toBe(false);
    expect(some.lines).toEqual(
      six()
        .slice(3)
        .map((shape) => `NOT MEASURED: "${shape.name}"`),
    );
    const all = verdict(six(), 10000, 0);
    expect(all).toEqual({ pass: true, lines: ["PASS: every target met"] });
  });

  it("FB-7 the level mix comes from the answer's dictionary, never a level by name", () => {
    const row = (key: string, sort: number, is_baseline = false) => ({ key, sort, is_baseline });
    const mix = levelMix([row("lvl-c", 30), row("lvl-base", 0, true), row("lvl-b", 20)]);
    expect([mix(1), mix(25), mix(100)]).toEqual(["lvl-base", "lvl-b", "lvl-c"]);
    const alone = levelMix([row("lvl-base", 0, true), row("lvl-a", 10)]);
    expect([alone(1), alone(25), alone(100)]).toEqual(["lvl-base", "lvl-a", "lvl-a"]);
    const flat = levelMix([row("lvl-base", 0, true)]);
    expect([flat(25), flat(100)]).toEqual(["lvl-base", "lvl-base"]);
    expect(() => levelMix([row("lvl-a", 10)])).toThrow("no baseline level");
    expect(() => levelMix([{ key: "lvl-a" }])).toThrow("malformed");
    expect(() => levelMix(undefined)).toThrow("no levels dictionary");
  });

  it("FB-8 the seed's plan keeps every seller under the scratch market's free number", () => {
    const row = (key: string, sort: number, is_baseline = false) => ({ key, sort, is_baseline });
    const levels = [row("lvl-c", 30), row("lvl-base", 0, true), row("lvl-b", 20)];
    const mix = levelMix(levels);
    const tierOf = (g: number) => benchTier(mix, g);
    const baseline = baselineLevel(levels);
    expect(baseline).toBe("lvl-base");
    expect([tierOf(LISTINGS), tierOf(LISTINGS + 1), tierOf(LISTINGS + HOT)]).toEqual([
      "lvl-c",
      "lvl-base",
      "lvl-base",
    ]);
    const plan = seedPlan(LISTINGS + HOT, SELLERS, tierOf, baseline);
    expect(SELLERS).toBe(2048);
    expect([Math.min(...plan.baselineRows), Math.max(...plan.baselineRows)]).toEqual([47, 49]);
    expect(plan.free).toBe(50);

    // The guard, replayed in insert order: a baseline row is refused when the seller's other
    // live baseline rows already reach the free number.
    const refusals = (free: number) => {
      const live = new Array<number>(SELLERS).fill(0);
      let refused = 0;
      for (let g = 1; g <= LISTINGS + HOT; g++) {
        if (tierOf(g) !== baseline) continue;
        const seller = plan.sellerOf(g);
        const others = live[seller] ?? 0;
        if (others >= free) refused++;
        else live[seller] = others + 1;
      }
      return refused;
    };
    expect(refusals(plan.free)).toBe(0);
    // Planted: the default market's free number of three refuses the fourth row of every seller.
    expect(refusals(3)).toBeGreaterThan(0);
    // Planted: one seller holds every baseline row, so its free number is the whole seed's.
    expect(seedPlan(LISTINGS + HOT, 1, tierOf, baseline).free).toBe(
      plan.baselineRows.reduce((sum, rows) => sum + rows, 0) + 1,
    );
    expect(() => seedPlan(10, 0, tierOf, baseline)).toThrow("no sellers");
  });

  it("FB-9 the pre-clean's predicates match the bench's sellers and countries and no neighbour", () => {
    expect(isBenchSellerEmail(benchSellerEmail("123", 7))).toBe(true);
    expect(isBenchSellerEmail(`e2e-bench-123-abcdef${SCRATCH_USER_DOMAIN}`)).toBe(true);
    for (const neighbour of [
      `e2e+bench-123-s7@example.invalid`,
      `e2e+benchmark${SCRATCH_USER_DOMAIN}`,
      `e2e+abc-123-bench${SCRATCH_USER_DOMAIN}`,
      `e2e-pool-3-1${SCRATCH_USER_DOMAIN}`,
      `bench-123-s7${SCRATCH_USER_DOMAIN}`,
      undefined,
    ])
      expect(isBenchSellerEmail(neighbour), String(neighbour)).toBe(false);

    const name = benchCountryName("e2e-bench-123-abcdef");
    expect(isBenchCountry("QM", name)).toBe(true);
    expect(isBenchCountry("XZ", name)).toBe(true);
    expect(isBenchCountry("ET", name)).toBe(false);
    expect(isBenchCountry("QM", "E2E-Scratch-QM-local-0")).toBe(false);
    expect(isBenchCountry("QN", "e2e-benchmark")).toBe(false);
    expect(isBenchCountry("QL", name)).toBe(false);
  });
});
