import { describe, expect, it } from "vitest";

import { readAttributeNumbers, readLinkDefault } from "./attribute-form-values";

describe("the attribute editor's typed numbers (DEC-339, wave 3)", () => {
  it("KFA-1 a blank decimals or longest length is null to the door; a whole number is read", () => {
    expect(readAttributeNumbers({ decimals: "", maxLength: "  " })).toEqual({
      ok: true,
      decimals: null,
      maxLength: null,
    });
    expect(readAttributeNumbers({ decimals: "2", maxLength: " 40 " })).toEqual({
      ok: true,
      decimals: 2,
      maxLength: 40,
    });
    expect(readAttributeNumbers({ decimals: "0", maxLength: "0" })).toEqual({
      ok: true,
      decimals: 0,
      maxLength: 0,
    });
  });

  it("KFA-2 an unreadable longest length is refused under its field, never a silent null", () => {
    for (const raw of ["abc", "1.5", "-1", "12x"]) {
      expect(readAttributeNumbers({ decimals: "", maxLength: raw })).toEqual({
        ok: false,
        refusals: { maxLength: { field: "maxLength", reason: "badType" } },
      });
    }
    expect(readAttributeNumbers({ decimals: "1.2", maxLength: "x" })).toEqual({
      ok: false,
      refusals: {
        decimals: { field: "decimals", reason: "badType" },
        maxLength: { field: "maxLength", reason: "badType" },
      },
    });
  });

  it("KFA-3 a number default goes through the one parser: a number, or refused (never NaN)", () => {
    expect(readLinkDefault("number", "12.5")).toEqual({ ok: true, value: 12.5 });
    expect(readLinkDefault("number", "1e5")).toEqual({
      ok: false,
      refusal: { field: "defaultValue", reason: "badType" },
    });
    expect(readLinkDefault("number", "abc")).toEqual({
      ok: false,
      refusal: { field: "defaultValue", reason: "badType" },
    });
    expect(readLinkDefault("boolean", "true")).toEqual({ ok: true, value: true });
    expect(readLinkDefault("multi_select", "a||b")).toEqual({ ok: true, value: ["a", "b"] });
    expect(readLinkDefault("text", "x")).toEqual({ ok: true, value: "x" });
  });
});
