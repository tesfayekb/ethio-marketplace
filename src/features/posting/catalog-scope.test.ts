import { describe, expect, it } from "vitest";

import { tokenCountryCode } from "./catalog-scope";

describe("which country {country} names (DEC-094)", () => {
  const none = { placeCountry: null, areaCountry: null, homeCountry: null, homeConfirmed: false };
  it("prefers the ad's first place, then the browsed market, then the confirmed home", () => {
    expect(tokenCountryCode({ ...none, placeCountry: "ET", areaCountry: "ER" })).toBe("ET");
    expect(
      tokenCountryCode({ ...none, areaCountry: "ER", homeCountry: "US", homeConfirmed: true }),
    ).toBe("ER");
    expect(tokenCountryCode({ ...none, homeCountry: "US", homeConfirmed: true })).toBe("US");
  });
  it("names none when the home country is not confirmed, or nothing is known", () => {
    expect(tokenCountryCode({ ...none, homeCountry: "US", homeConfirmed: false })).toBeNull();
    expect(tokenCountryCode(none)).toBeNull();
  });
});
