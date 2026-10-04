import { describe, expect, it } from "vitest";

import { conditionMet, shapeCondition } from "./visible-when";

const two = shapeCondition({ key: "k1", in: ["a", "b"], and: { key: "k2", in: ["c", "d"] } });
const met = (values: Record<string, unknown>) => conditionMet({ visibleWhen: two }, values);

describe("conditionMet with an and pair (INC-381)", () => {
  it("is shown only when both pairs hold", () => {
    expect(met({ k1: "a", k2: "c" })).toBe(true);
    expect(met({ k1: "a" })).toBe(false);
    expect(met({ k2: "d" })).toBe(false);
    expect(met({})).toBe(false);
    expect(met({ k1: "x", k2: "c" })).toBe(false);
  });
  it("counts a multi-select answer and an other answer as a single pair does", () => {
    expect(met({ k1: ["z", "b"], k2: { value: "d", text: "" } })).toBe(true);
    expect(met({ k1: [{ value: "a", text: "" }], k2: ["c"] })).toBe(true);
  });
});

describe("shapeCondition", () => {
  it("reads one pair and two pairs", () => {
    expect(shapeCondition({ key: "k1", in: ["a"] })).toEqual({ key: "k1", in: ["a"] });
    expect(two).toEqual({ key: "k1", in: ["a", "b"], and: { key: "k2", in: ["c", "d"] } });
  });
  it("treats a malformed or self-referencing and pair as no condition", () => {
    expect(shapeCondition({ key: "k1", in: ["a"], and: { key: "k1", in: ["b"] } })).toBeNull();
    expect(shapeCondition({ key: "k1", in: ["a"], and: { key: "k2", in: [] } })).toBeNull();
  });
});
