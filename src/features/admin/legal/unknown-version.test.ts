import { describe, expect, it } from "vitest";

import { isUnknownVersion } from "./unknown-version";

describe("the legal version view's unknown version (INC-1189)", () => {
  it("RTW-9 unknownVersion is read by its code, with or without a detail; another code is not", () => {
    expect(isUnknownVersion({ message: "unknownVersion", code: "P0D01" })).toBe(true);
    expect(isUnknownVersion({ message: " unknownVersion:abc ", code: "P0D01" })).toBe(true);
    expect(isUnknownVersion({ message: "unknownVersionX", code: "P0D01" })).toBe(false);
    expect(isUnknownVersion(null)).toBe(false);
  });
});
