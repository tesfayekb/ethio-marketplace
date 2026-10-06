import { describe, expect, it } from "vitest";

import { chunkByLength } from "../../e2e/helpers/chunk-by-length";

describe("chunkByLength (DEC-138, INC-454)", () => {
  const keys = Array.from({ length: 500 }, (_, i) => `k${String(i).padStart(35, "0")}`);

  it("keeps every batch's joined length at or under 4,000", () => {
    expect(keys[0]).toHaveLength(36);
    const batches = chunkByLength(keys);
    expect(batches.length).toBeGreaterThan(1);
    for (const batch of batches) expect(batch.join(",").length).toBeLessThanOrEqual(4000);
  });

  it("loses nothing and keeps order", () => {
    expect(chunkByLength(keys).flat()).toEqual(keys);
  });

  it("puts a value longer than the cap in its own batch", () => {
    const long = "x".repeat(50);
    expect(chunkByLength(["a", long, "b"], 10)).toEqual([["a"], [long], ["b"]]);
  });

  it("answers no batch for no values", () => {
    expect(chunkByLength([])).toEqual([]);
  });
});
