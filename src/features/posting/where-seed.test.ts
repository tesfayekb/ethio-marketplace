import { describe, expect, it } from "vitest";

import { whereSeed, type PlaceFact } from "./where-seed";

const fact = (id: string, country: string, extra: Partial<PlaceFact> = {}): PlaceFact => ({
  id,
  country,
  level: "city",
  regionId: `${id}-region`,
  cityId: null,
  parentId: `${id}-region`,
  active: true,
  ...extra,
});

/** Bundle 7 D3 — the place step's seeding from the ad's own places. */
describe("whereSeed", () => {
  it("the market is the FIRST place's country, whatever the saved area", () => {
    const seed = whereSeed(["b-city"], [fact("b-city", "KE")]);
    expect(seed).toEqual({
      country: "KE",
      rows: [{ country: "KE", region: "b-city-region", city: "b-city", subCity: null }],
      complete: true,
    });
  });
  it("a place in another country keeps its own country, in saved order", () => {
    const seed = whereSeed(["a", "b"], [fact("b", "KE"), fact("a", "ET")]);
    expect(seed!.country).toBe("ET");
    expect(seed!.rows.map((row) => [row.country, row.city])).toEqual([
      ["ET", "a"],
      ["KE", "b"],
    ]);
  });
  it("a sub-city names its city and region", () => {
    const seed = whereSeed(
      ["s"],
      [fact("s", "ET", { level: "sub_city", regionId: "r", cityId: "c", parentId: "c" })],
    );
    expect(seed!.rows).toEqual([{ country: "ET", region: "r", city: "c", subCity: "s" }]);
  });
  it("a saved place the read did not return gets no made-up row", () => {
    const seed = whereSeed(["a", "gone", "off"], [fact("a", "ET"), fact("off", "ET", { active: false })]);
    expect(seed!.rows).toHaveLength(1);
    expect(seed!.complete).toBe(false);
  });
  it("no place, or no row for the first place: no seed (today's behaviour)", () => {
    expect(whereSeed([], [])).toBeNull();
    expect(whereSeed(["gone", "a"], [fact("a", "ET")])).toBeNull();
  });
});
