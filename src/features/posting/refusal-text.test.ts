import { describe, expect, it } from "vitest";

import { draftRefusalKey } from "./refusal-text";

describe("the doors' vocabulary, in words (refusal-text)", () => {
  it("PRT-1 publish's slots refusal (noFreeSlot, with its count) has its own words; an unknown reason the fallback", () => {
    expect(draftRefusalKey("noFreeSlot")).toBe("post.refusal.noFreeSlot");
    expect(draftRefusalKey("noFreeSlot:3")).toBe("post.refusal.noFreeSlot");
    expect(draftRefusalKey("somethingNew")).toBe("post.refusal.unknown");
  });
});
