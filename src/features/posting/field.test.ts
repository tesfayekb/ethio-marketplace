import { describe, expect, it } from "vitest";

import { summaryRefusals } from "./field";

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
