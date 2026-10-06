import { describe, expect, it } from "vitest";

import { summaryLabel, summaryRefusals } from "./field";

describe("summaryRefusals (INC-313)", () => {
  it("drops control-less refusals and keeps field refusals", () => {
    const out = summaryRefusals([
      { field: "door", reason: "doorError" },
      { field: "residency", reason: "residencyUnknown" },
      { field: "title", reason: "required" },
    ]);
    expect(out.map((r) => r.field)).toEqual(["title"]);
  });

  it("returns an empty list when only door refusals remain", () => {
    expect(summaryRefusals([{ field: "door", reason: "doorError" }])).toEqual([]);
  });
});

describe("summaryLabel (INC-455)", () => {
  const t = (key: string) => `T:${key}`;

  it("names an attribute refusal by the definition's drawn name, never its key", () => {
    expect(summaryLabel("unit_of_sale-food", t, { "unit_of_sale-food": "Unit of Sale" })).toBe(
      "Unit of Sale",
    );
    expect(summaryLabel("unit_of_sale-food", t, { "unit_of_sale-food": "የሽያጭ መለኪያ" })).toBe(
      "የሽያጭ መለኪያ",
    );
  });

  it("keeps the translated label of a form field", () => {
    expect(summaryLabel("title", t, { title: "ignored" })).toBe("T:post.details.titleLabel");
  });

  it("falls back to the key only when no name was handed down", () => {
    expect(summaryLabel("unknown-attr", t)).toBe("unknown-attr");
    expect(summaryLabel("unknown-attr", t, { "unknown-attr": "" })).toBe("unknown-attr");
  });
});
