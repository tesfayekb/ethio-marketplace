import { describe, expect, it } from "vitest";
import { formatLocale } from "./format-locale";
import { isCountryCode, isCurrencyCode, localeTagOf } from "./locale";

/** INC-985 / INC-954 (Foundations turn L-1, B1/B4/B5) — the one locale constants module. */
describe("locale constants (K4)", () => {
  it("LCL-1 a country code is two capital letters, nothing else", () => {
    expect(isCountryCode("ET")).toBe(true);
    for (const bad of ["et", "ETH", "E", "", " ET", 12, null, undefined])
      expect(isCountryCode(bad)).toBe(false);
  });

  it("LCL-2 a currency code is three capital letters, nothing else", () => {
    expect(isCurrencyCode("ETB")).toBe(true);
    for (const bad of ["etb", "ET", "ETBB", "", 1]) expect(isCurrencyCode(bad)).toBe(false);
  });

  it("LCL-3 known languages map to their tags; others format as themselves or in English", () => {
    expect(localeTagOf("am")).toBe("am-ET");
    expect(localeTagOf("en")).toBe("en-GB");
    expect(localeTagOf("constructor")).toBeUndefined();
    expect(formatLocale("am")).toBe("am-ET");
    expect(formatLocale("fr")).toBe("fr");
    expect(formatLocale("not a tag")).toBe("en-GB");
  });
});
