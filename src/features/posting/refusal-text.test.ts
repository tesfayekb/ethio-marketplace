import { describe, expect, expectTypeOf, it } from "vitest";

import {
  draftRateText,
  draftRefusalKey,
  draftRefusalText,
  isRateRefusal,
  photoRateText,
  photoRefusalKey,
  rateUntilOf,
  specsRateText,
} from "./refusal-text";

/** L22 — the words as keys, so a test reads which sentence was chosen and how it was filled. */
const words = (key: string) => (key.endsWith("When") ? `${key} {when}` : key);
const inAnHour = () => new Date(Date.now() + 60 * 60 * 1000 + 30_000).toISOString();
const anHourAgo = () => new Date(Date.now() - 60 * 60 * 1000).toISOString();

describe("the doors' vocabulary, in words (refusal-text)", () => {
  it("RRD-4 a reason's code is the text before its first colon (the one reader's cut)", () => {
    expect(draftRefusalKey("noFreeSlot:3:4")).toBe("post.refusal.noFreeSlot");
    expect(draftRefusalKey("noFreeSlot")).toBe("post.refusal.noFreeSlot");
  });

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

  it("RTW-18 a draft refusal from the dial that names an instant to come says when; no instant, a past one or another reason keeps today's words", () => {
    const until = inAnHour();
    expect(draftRefusalText({ field: "", reason: `rateLimited:${until}` }, words, "en")).toBe(
      "post.refusal.rateLimitedWhen in 1 hour",
    );
    expect(draftRefusalText(`rateLimited:${until}`, words, "en")).toBe(
      "post.refusal.rateLimitedWhen in 1 hour",
    );
    expect(draftRefusalText("rateLimited", words, "en")).toBe("post.refusal.rateLimited");
    expect(draftRefusalText(`rateLimited:${anHourAgo()}`, words, "en")).toBe(
      "post.refusal.rateLimited",
    );
    expect(draftRefusalText("rateLimited:soon", words, "en")).toBe("post.refusal.rateLimited");
    expect(draftRefusalText("noFreeSlot:3", words, "en")).toBe("post.refusal.noFreeSlot");
    expect(draftRefusalKey(`rateLimited:${until}`)).toBe("post.refusal.rateLimited");
  });

  it("RTW-19 the photo route's dial names its instant in the refusal's detail; the photo words say when, and the key reader is unchanged", () => {
    const until = inAnHour();
    const refusal = { field: "rate", reason: "rateLimited", detail: until };
    expect(rateUntilOf(refusal)).toBe(until);
    expect(photoRateText(rateUntilOf(refusal), words, "en")).toBe(
      "post.photo.refusal.rateLimitedWhen in 1 hour",
    );
    expect(photoRateText(undefined, words, "en")).toBe("post.photo.refusal.rateLimited");
    expect(photoRateText(anHourAgo(), words, "en")).toBe("post.photo.refusal.rateLimited");
    expect(rateUntilOf({ field: "rate", reason: "rateLimited" })).toBeUndefined();
    expect(rateUntilOf({ field: "rate", reason: "rateLimited", detail: " " })).toBeUndefined();
    expect(rateUntilOf({ field: "x", reason: "tooLarge", detail: until })).toBeUndefined();
    expect(photoRefusalKey("rateLimited")).toBe("post.photo.refusal.rateLimited");
    expectTypeOf(rateUntilOf).returns.toEqualTypeOf<string | undefined>();
  });

  it("RTW-21 the pin's lines and the details step say when in their own family's words; without an instant, today's words", () => {
    const until = inAnHour();
    expect(draftRateText(until, words, "en")).toBe("post.refusal.rateLimitedWhen in 1 hour");
    expect(draftRateText(undefined, words, "en")).toBe("post.refusal.rateLimited");
    expect(specsRateText(until, words, "en")).toBe("post.specs.rateLimitedWhen in 1 hour");
    expect(specsRateText(undefined, words, "en")).toBe("post.specs.rateLimited");
    expect(specsRateText(anHourAgo(), words, "en")).toBe("post.specs.rateLimited");
  });
});
