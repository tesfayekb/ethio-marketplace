import { describe, expect, it } from "vitest";

import { sortPlacesByName } from "./place-order";

/** Bundle 3 Part D — place lists are ordered by the shown name, never by display_order. */
describe("sortPlacesByName", () => {
  const rows = [
    { name: "Mekelle", order: 1 },
    { name: "Adama", order: 3 },
    { name: "bahir Dar", order: 2 },
  ];

  it("orders by the shown name, ignoring display order and case", () => {
    expect(sortPlacesByName(rows, (row) => row.name, "en").map((row) => row.name)).toEqual([
      "Adama",
      "bahir Dar",
      "Mekelle",
    ]);
  });

  it("orders Amharic names by the Amharic collation", () => {
    const am = ["መቀሌ", "አዳማ", "ባሕር ዳር"].map((name) => ({ name }));
    const expected = [...am.map((row) => row.name)].sort(new Intl.Collator("am").compare);
    expect(sortPlacesByName(am, (row) => row.name, "am").map((row) => row.name)).toEqual(expected);
  });

  it("does not change the list it is given", () => {
    const copy = [...rows];
    sortPlacesByName(rows, (row) => row.name, "en");
    expect(rows).toEqual(copy);
  });
});
