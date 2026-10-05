import { describe, expect, it } from "vitest";

import { attributeDisplayValue, rangeDisplayValue } from "./attribute-display";
import type { AttrDef } from "./posting-service";

/** Bundle 5 C7 — the Amharic unit prints under "am"; empty falls back to English. */
const base = {
  attrKey: "seats",
  attrType: "number",
  unit: "people",
  unitAm: "ሰዎች",
  decimals: 0,
  format: null,
} as unknown as AttrDef;
const tokens = {} as never;

describe("unit language", () => {
  it("prints the Amharic unit under Amharic", () => {
    expect(attributeDisplayValue(base, 4, [], "am", "", "", "", tokens)).toBe("4 ሰዎች");
    expect(rangeDisplayValue(base, { min: 2, max: 5 }, "am", tokens)).toBe("2–5 ሰዎች");
  });
  it("prints the English unit under English", () => {
    expect(rangeDisplayValue(base, { min: 2, max: 5 }, "en", tokens)).toBe("2–5 people");
  });
  it("falls back to English when the Amharic unit is empty", () => {
    const bare = { ...base, unitAm: "" } as AttrDef;
    expect(rangeDisplayValue(bare, { min: 2, max: 5 }, "am", tokens)).toBe("2–5 people");
    expect(attributeDisplayValue(bare, 4, [], "am", "", "", "", tokens)).toBe("4 people");
  });
});
