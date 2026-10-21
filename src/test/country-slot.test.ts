import { describe, expect, it } from "vitest";

import { countrySlotCodes, userAssignedCodes } from "../../e2e/helpers/country-slot";

describe("INC-817 — scratch market worker slots", () => {
  it("partitions all 40 codes into eight disjoint slots of five and wraps index 8 to slot 0", () => {
    const slots = Array.from({ length: 8 }, (_, index) => countrySlotCodes(index));
    for (const [index, codes] of slots.entries()) {
      expect(codes).toHaveLength(5);
      expect(codes).toEqual(userAssignedCodes().filter((_, position) => position % 8 === index));
      for (const other of slots.slice(index + 1)) {
        expect(codes.filter((code) => other.includes(code))).toEqual([]);
      }
    }
    const union = slots.flat();
    expect(union).toHaveLength(40);
    expect(new Set(union).size).toBe(40);
    expect([...union].sort()).toEqual(userAssignedCodes().sort());
    expect(countrySlotCodes(8)).toEqual(countrySlotCodes(0));
  });
});