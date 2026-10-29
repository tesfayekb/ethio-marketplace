import { describe, expect, it } from "vitest";
import { formatCountryName } from "./reader-locale";

describe("formatCountryName (L-2 Part A)", () => {
  it("FMT-9 a country in the reader's language; an unknown or malformed code is the code", () => {
    expect(formatCountryName("ET", "en")).toBe("Ethiopia");
    expect(formatCountryName("ET", "am")).toBe("ኢትዮጵያ");
    expect(formatCountryName("ET", "xx")).toBe("Ethiopia");
    expect(formatCountryName("QQ", "en")).toBe("QQ");
    expect(formatCountryName("not-a-code", "en")).toBe("not-a-code");
  });
});