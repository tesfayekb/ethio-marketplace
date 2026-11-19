import { describe, expect, it } from "vitest";

import { badValueWords } from "./bad-value-words";

describe("badValueWords", () => {
  const words = { reason: "admin.listings.move.pickReason" } as const;

  it("words a mapped field by the detail after badValue", () => {
    expect(badValueWords("badValue:reason", words)).toBe("admin.listings.move.pickReason");
    expect(badValueWords(new Error("  badValue:reason "), words)).toBe(
      "admin.listings.move.pickReason",
    );
    expect(badValueWords({ message: "badValue:reason", code: "P0D01" }, words)).toBe(
      "admin.listings.move.pickReason",
    );
  });

  it("answers null for a field with no words of its own", () => {
    expect(badValueWords("badValue:note", words)).toBeNull();
  });

  it("answers null for a badValue with no detail", () => {
    expect(badValueWords("badValue", words)).toBeNull();
  });

  it("answers null for any other code and for nothing", () => {
    expect(badValueWords("permissionDenied:reason", words)).toBeNull();
    expect(badValueWords(null, words)).toBeNull();
    expect(badValueWords(undefined, words)).toBeNull();
  });

  it("never reads a field off the map's prototype", () => {
    expect(badValueWords("badValue:constructor", words)).toBeNull();
  });
});
