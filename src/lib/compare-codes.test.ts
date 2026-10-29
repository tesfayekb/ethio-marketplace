import { describe, expect, it } from "vitest";
import { compareCodes } from "./reader-locale";

describe("compareCodes (L-2 Part A2)", () => {
  it("FMT-11 machine order is code-point order, never a locale's", () => {
    expect(["b-1", "a_2", "a-2", "ab"].sort(compareCodes)).toEqual(["a-2", "a_2", "ab", "b-1"]);
    expect(compareCodes("ET", "ET")).toBe(0);
    expect(compareCodes("2026-10-01T00:00:00Z", "2026-09-30T23:59:59Z")).toBe(1);
  });
});