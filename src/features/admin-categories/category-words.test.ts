import { describe, expect, it } from "vitest";

import { readRefusal } from "@/lib/refusal";

import { CATEGORY_REFUSALS } from "./category-refusals";

const key = (code: string) => readRefusal(code, CATEGORY_REFUSALS).key;

/** INC-1280 (10a-2, D50 categories part) — the category doors' codes have words. */
describe("category words (INC-1280)", () => {
  it("RWC-U1 an unknown category", () => {
    expect(key("unknownCategory")).toBe("admin.categories.error.unknownCategory");
  });
  it("RWC-U2 an unknown link and a switched-off parent", () => {
    expect(key("unknownPointer")).toBe("admin.categories.error.unknownPointer");
    expect(key("parentInactive")).toBe("admin.categories.error.parentInactive");
  });
  it("RWC-U3 a code with no line still draws the family's generic", () => {
    expect(key("noSuchCode")).toBe("admin.categories.error.saveFailed");
  });
});
