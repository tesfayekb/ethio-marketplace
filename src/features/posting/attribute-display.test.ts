import { describe, expect, it } from "vitest";

import { attributeDisplayValue, choiceHeldKnown, rangeDisplayValue } from "./attribute-display";
import type { AttrOption } from "./attribute-options";
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

describe("number format (INC-451)", () => {
  it("groups a number answer, keeps a year as written", () => {
    const km = { ...base, unit: "km", unitAm: "" } as AttrDef;
    expect(attributeDisplayValue(km, 45000, [], "en", "", "", "", tokens)).toBe("45,000 km");
    const year = { ...base, unit: null, format: "year" } as unknown as AttrDef;
    expect(attributeDisplayValue(year, 2019, [], "en", "", "", "", tokens)).toBe("2019");
  });
});

/**
 * INC-587 — a held choice is shown only when it has words: an offered option,
 * a switched-off one (its label kept), or `other` with its text. A deleted
 * option's raw value is never printed; any other type is always shown.
 */
describe("a held choice with no words left (INC-587)", () => {
  const brand = {
    attrKey: "brand",
    attributeId: "00000000-0000-4000-8000-0000000005a7",
    attrType: "single_select",
  } as unknown as AttrDef;
  const offered = [
    { value: "toyota", label_en: "Toyota" },
    { value: "other", label_en: "Other" },
  ] as unknown as AttrOption[];

  it("DSP-1 shows an offered value and an other with its text", () => {
    expect(choiceHeldKnown(brand, "toyota", offered)).toBe(true);
    expect(choiceHeldKnown(brand, { value: "other", text: "Lada" }, offered)).toBe(true);
    expect(
      choiceHeldKnown(
        { ...brand, attrType: "multi_select" } as AttrDef,
        ["toyota", "other"],
        offered,
      ),
    ).toBe(true);
  });

  it("DSP-2 leaves out a value no option holds any more", () => {
    expect(choiceHeldKnown(brand, "toyota_other", offered)).toBe(false);
    expect(
      choiceHeldKnown(
        { ...brand, attrType: "multi_select" } as AttrDef,
        ["toyota", "gone"],
        offered,
      ),
    ).toBe(false);
  });

  it("DSP-3 always shows a non-choice answer", () => {
    expect(choiceHeldKnown(base, 4, [])).toBe(true);
  });
});
