import { describe, expect, it } from "vitest";

import { draftRefusalKey, isRateRefusal, photoRefusalKey } from "./refusal-text";

describe("the doors' vocabulary, in words (refusal-text)", () => {
  it("PRT-1 publish's slots refusal (noFreeSlot, with its count) has its own words; an unknown reason the fallback", () => {
    expect(draftRefusalKey("noFreeSlot")).toBe("post.refusal.noFreeSlot");
    expect(draftRefusalKey("noFreeSlot:3")).toBe("post.refusal.noFreeSlot");
    expect(draftRefusalKey("somethingNew")).toBe("post.refusal.unknown");
  });

  it("PRT-2 the codes the posting doors answer on the shell have their words; a code no screen reads is the fallback (F1-5a)", () => {
    expect(draftRefusalKey("notYourListing")).toBe("post.refusal.notYourListing");
    expect(draftRefusalKey("badValue:step")).toBe("post.refusal.badValue");
    expect(draftRefusalKey("badShape:coverage")).toBe("post.refusal.badShape");
    expect(draftRefusalKey("rateLimited")).toBe("post.refusal.rateLimited");
    expect(photoRefusalKey("notYourListing")).toBe("post.photo.refusal.notYourListing");
    expect(photoRefusalKey("photoGone")).toBe("post.photo.refusal.photoGone");
    expect(photoRefusalKey("rateLimited")).toBe("post.photo.refusal.rateLimited");
    for (const code of ["notADraft", "listingNotFound", "photosSoonNotEditable:sold", "toString"]) {
      expect(draftRefusalKey(code), code).toBe("post.refusal.unknown");
      expect(photoRefusalKey(code), code).toBe("post.photo.refusal.unknown");
    }
  });

  it("PRT-3 a refusal is the dial's by the one reader, in any shape a door's answer takes", () => {
    expect(isRateRefusal("rateLimited")).toBe(true);
    expect(isRateRefusal({ message: "rateLimited", code: "P0D01" })).toBe(true);
    expect(isRateRefusal({ field: "door", reason: "rateLimited" })).toBe(true);
    expect(isRateRefusal({ message: "categoryNotFound" })).toBe(false);
    expect(isRateRefusal({ message: "a sentence that names rateLimited" })).toBe(false);
    expect(isRateRefusal(null)).toBe(false);
  });
});
