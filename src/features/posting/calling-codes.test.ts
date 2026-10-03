import { describe, expect, it } from "vitest";

import {
  flagOf,
  joinPhone,
  matchCountry,
  orderCountries,
  readInternational,
  searchCountries,
  splitPhone,
} from "./calling-codes";

describe("calling codes (bundle 2 Q1)", () => {
  it("saves + code digits, separators and leading zeros removed", () => {
    expect(joinPhone("ET", "0911 23-45.67")).toBe("+251911234567");
    expect(joinPhone("ET", "(0)91 123 4567")).toBe("+251911234567");
    expect(joinPhone("ET", "")).toBe("");
  });
  it("+ or 00 moves the picker to the longest matching code", () => {
    expect(readInternational("+251 911 234 567", "US")).toEqual({ iso: "ET", rest: "911234567" });
    expect(readInternational("00291 7 123456", "ET")).toEqual({ iso: "ER", rest: "7123456" });
    expect(readInternational("0911234567", "ET")).toBeNull();
  });
  it("a shared code keeps the seller's current country", () => {
    expect(matchCountry("14165550000", "CA")?.iso).toBe("CA");
    expect(matchCountry("447700900000", "JE")?.iso).toBe("JE");
    expect(matchCountry("447700900000", "ET")?.iso).toBe("GB");
  });
  it("a saved value reopens split the same way", () => {
    expect(splitPhone("+251911234567", "US")).toEqual({ iso: "ET", national: "911234567" });
    expect(splitPhone("", "ET")).toEqual({ iso: "ET", national: "" });
  });
  it("orders open markets first, then the rest A to Z by shown name", () => {
    const order = orderCountries(["ET", "ER"], (iso) => iso, "en");
    expect(order.slice(0, 3)).toEqual(["ET", "ER", "AD"]);
    expect(order.filter((iso) => iso === "ET")).toHaveLength(1);
  });
  it("the flag is the emoji of the ISO code, none for a malformed code", () => {
    expect(flagOf("ET")).toBe("\u{1F1EA}\u{1F1F9}");
    expect(flagOf("e")).toBe("");
  });
  it("search matches the shown name or the calling code, keeping the order", () => {
    const order = ["ET", "ER", "GB", "US"];
    const names: Record<string, string> = { ET: "Ethiopia", ER: "Eritrea", GB: "United Kingdom", US: "United States" };
    const nameOf = (iso: string) => names[iso] ?? iso;
    expect(searchCountries(order, "+251", nameOf)).toEqual(["ET"]);
    expect(searchCountries(order, "00291", nameOf)).toEqual(["ER"]);
    expect(searchCountries(order, "united", nameOf)).toEqual(["GB", "US"]);
    expect(searchCountries(order, "", nameOf)).toEqual(order);
  });
});
