import { describe, expect, it } from "vitest";

import { numberOf, parseNumber, parseText, PARSE_INVALID_KEY } from "./parse-input";

describe("the one parser (DEC-339)", () => {
  it("PIP-1 a blank is blank — empty or white space — never 0", () => {
    for (const raw of ["", " ", "\t\n"]) {
      expect(parseNumber(raw)).toEqual({ kind: "blank" });
      expect(numberOf(parseNumber(raw))).toBeNull();
    }
  });

  it("PIP-2 a number is read as typed, around its white space", () => {
    expect(parseNumber(" 12 ")).toEqual({ kind: "number", value: 12 });
    expect(parseNumber("0")).toEqual({ kind: "number", value: 0 });
    expect(parseNumber("-3")).toEqual({ kind: "number", value: -3 });
    expect(parseNumber("5.25")).toEqual({ kind: "number", value: 5.25 });
    expect(parseNumber(".5")).toEqual({ kind: "number", value: 0.5 });
  });

  it("PIP-3 text that is not a number is invalid, never NaN", () => {
    for (const raw of ["ten", "1,000", "1e3", "12abc", "--1", ".", "Infinity", "0x10"]) {
      expect(parseNumber(raw)).toEqual({ kind: "invalid" });
    }
  });

  it("PIP-4 the rules: a whole number, its decimals, its bounds", () => {
    expect(parseNumber("1.5", { integer: true })).toEqual({ kind: "invalid" });
    expect(parseNumber("5.", { integer: true })).toEqual({ kind: "invalid" });
    expect(parseNumber("7", { integer: true })).toEqual({ kind: "number", value: 7 });
    expect(parseNumber("1.234", { decimals: 2 })).toEqual({ kind: "invalid" });
    expect(parseNumber("1.23", { decimals: 2 })).toEqual({ kind: "number", value: 1.23 });
    expect(parseNumber("0", { min: 1 })).toEqual({ kind: "invalid" });
    expect(parseNumber("101", { max: 100 })).toEqual({ kind: "invalid" });
    expect(parseNumber("100", { min: 1, max: 100 })).toEqual({ kind: "number", value: 100 });
  });

  it("PIP-5 text is trimmed, its runs of space made one, composed; a blank is blank", () => {
    expect(parseText("  two   words \n")).toEqual({ kind: "text", value: "two words" });
    expect(parseText("e\u0301")).toEqual({ kind: "text", value: "\u00e9" });
    expect(parseText("   ")).toEqual({ kind: "blank" });
    expect(parseText("abcd", { maxLength: 3 })).toEqual({ kind: "invalid" });
    expect(parseText("\u{1F600}\u{1F600}\u{1F600}", { maxLength: 3 })).toEqual({
      kind: "text",
      value: "\u{1F600}\u{1F600}\u{1F600}",
    });
  });

  it("PIP-6 an unreadable answer has words of its own in the catalogue", () => {
    expect(PARSE_INVALID_KEY).toBe("post.refusal.badType");
  });
});
