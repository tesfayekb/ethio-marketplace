import { describe, expect, it } from "vitest";
import { shapePostingSchema, type AttrDef } from "./posting-service";
import { keyFacts, isKeyFactType, KEY_FACTS_MAXIMUM } from "./key-facts";

const fact = (key: string, extra: Partial<AttrDef> = {}): AttrDef => {
  const definition = shapePostingSchema({
    attributes: [{ attr_key: key, attr_type: "single_select", is_filterable: true }],
  })?.attributes[0];
  if (!definition) throw new Error("missing scratch definition");
  return { ...definition, ...extra };
};
const keys = (facts: AttrDef[]) => facts.map((f) => f.attrKey);
describe("keyFacts", () => {
  it("KF-1 ranked facts come first, by rank, four at most", () => {
    expect(KEY_FACTS_MAXIMUM).toBe(4);
    expect(
      keys(
        keyFacts([
          fact("three", { factRank: 3 }),
          fact("none"),
          fact("one", { factRank: 1 }),
          fact("two", { factRank: 2 }),
          fact("four", { factRank: 4 }),
          fact("last"),
        ]),
      ),
    ).toEqual(["one", "two", "three", "four"]);
    expect(
      keys(keyFacts([fact("first", { factRank: 1 }), fact("second", { factRank: 1 })])),
    ).toEqual(["first", "second"]);
  });
  it("KF-2 with no rank the fallback is the first four filterable choice or number facts in form order", () => {
    expect(
      keys(
        keyFacts([
          fact("text", { attrType: "text" }),
          fact("bool", { attrType: "boolean" }),
          fact("choice"),
          fact("notfilter", { attrType: "number", isFilterable: false }),
          fact("number", { attrType: "number" }),
          fact("multi", { attrType: "multi_select" }),
          fact("year", { attrType: "year" }),
          fact("fifth"),
        ]),
      ),
    ).toEqual(["choice", "number", "multi", "year"]);
    expect(["single_select", "multi_select", "select", "number", "year"].every(isKeyFactType)).toBe(
      true,
    );
    expect(isKeyFactType("text")).toBe(false);
    expect(isKeyFactType("boolean")).toBe(false);
  });
  it("KF-3 a card fact never enters the fallback", () => {
    expect(keys(keyFacts([fact("card", { cardRank: 1 }), fact("next")]))).toEqual(["next"]);
  });
  it("KF-4 one rank beats the fallback", () => {
    expect(
      keys(keyFacts([fact("a"), fact("rank", { factRank: 3 }), fact("b"), fact("c")])),
    ).toEqual(["rank"]);
  });
  it("KF-5 an empty answer", () => {
    expect(keyFacts([])).toEqual([]);
  });
});
