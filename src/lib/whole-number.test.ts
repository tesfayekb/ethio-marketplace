import { describe, expect, it } from "vitest";

import { wholeNumber } from "./whole-number";

describe("the one whole-number read (P-2 (b), ruling 4)", () => {
  it("WN-1 a whole number is read as typed; a blank, a decimal or a word is an absence, never 0", () => {
    expect(wholeNumber(" 12 ")).toBe(12);
    expect(wholeNumber("0")).toBe(0);
    expect(wholeNumber("")).toBeNull();
    expect(wholeNumber("1.5")).toBeNull();
    expect(wholeNumber("ten")).toBeNull();
  });
});
