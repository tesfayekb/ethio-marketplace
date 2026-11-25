import { describe, expect, it } from "vitest";

import { draftRefusalKey, photoRefusalKey } from "./refusal-text";

/** INC-1280 (10a-2) — every code the posting doors can send has words (D17, D21, D22). */
describe("posting refusal words (INC-1280)", () => {
  it("RWP-U1 the photo route's levelNotAvailable (D17)", () => {
    expect(photoRefusalKey("levelNotAvailable")).toBe("post.refusal.levelNotAvailable");
  });
  it("RWP-U2 the pin's place codes share one line (D21)", () => {
    for (const code of ["badLatitude", "badLongitude", "badZoom"])
      expect(draftRefusalKey(code)).toBe("post.refusal.badPinPlace");
  });
  it("RWP-U3 the pin's precision reads the existing choose-show words", () => {
    expect(draftRefusalKey("badPrecision")).toBe("post.pin.chooseShow");
    expect(draftRefusalKey("badPrecision:missing")).toBe("post.pin.chooseShow");
  });
  it("RWP-U4 the pin's lengths and lock", () => {
    expect(draftRefusalKey("directionsTooLong")).toBe("post.refusal.directionsTooLong");
    expect(draftRefusalKey("streetTooLong")).toBe("post.refusal.streetTooLong");
    expect(draftRefusalKey("pinNotEditable")).toBe("post.refusal.pinNotEditable");
  });
  it("RWP-U5 publish's and submit's codes (D22)", () => {
    expect(draftRefusalKey("illegalTransition")).toBe("post.refusal.alreadySubmitted");
    expect(draftRefusalKey("notADraft")).toBe("post.refusal.alreadySubmitted");
    expect(draftRefusalKey("listingNotPlaced")).toBe("post.refusal.listingNotPlaced");
    expect(draftRefusalKey("listingNotFound")).toBe("post.refusal.listingNotFound");
  });
  it("RWP-U6 the photos-soon lock and a closed category", () => {
    expect(draftRefusalKey("photosSoonNotEditable")).toBe("post.refusal.photosSoonNotEditable");
    expect(draftRefusalKey("categoryNotFound")).toBe("post.refusal.categoryClosed");
    expect(draftRefusalKey("categoryInactive")).toBe("post.refusal.categoryClosed");
  });
  it("RWP-U7 a code with no line still draws the family's generic", () => {
    expect(draftRefusalKey("noSuchCode")).toBe("post.refusal.unknown");
    expect(photoRefusalKey("noSuchCode")).toBe("post.photo.refusal.unknown");
  });
});
