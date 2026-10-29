import { describe, expect, it } from "vitest";
import { collatorFor } from "./reader-locale";

describe("collatorFor (L-2 Part A)", () => {
  it("FMT-10 one collator per locale, base sensitivity and numeric order", () => {
    expect(collatorFor("en")).toBe(collatorFor("en"));
    expect(collatorFor("xx")).toBe(collatorFor("en"));
    expect(["b", "A", "a2", "a10"].sort(collatorFor("en").compare)).toEqual([
      "A",
      "a2",
      "a10",
      "b",
    ]);
    expect(collatorFor("en").compare("é", "e")).toBe(0);
    expect(["ሐ", "ሀ"].sort(collatorFor("am").compare)).toEqual(["ሀ", "ሐ"]);
  });
});
