import { describe, expect, it } from "vitest";

import { ownValue } from "./own-key";

const MAP: Record<string, number> = { country: 0, region: 1 };

describe("ownValue", () => {
  it("answers a listed key's value", () => {
    expect(ownValue(MAP, "region")).toBe(1);
    expect(ownValue(MAP, "country")).toBe(0);
  });
  it("answers undefined for an unlisted key", () => {
    expect(ownValue(MAP, "city")).toBeUndefined();
  });
  it("answers undefined for a member every object inherits", () => {
    for (const key of ["constructor", "toString", "__proto__", "hasOwnProperty", "valueOf"]) {
      expect(ownValue(MAP, key)).toBeUndefined();
    }
  });
});
