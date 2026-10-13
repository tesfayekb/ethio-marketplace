import { describe, expect, it } from "vitest";

import { PHOTO_POLICY_INSTRUCTION, POLICY_CODES } from "./policy";

/**
 * INC-584 / D148 — the policy pass's instruction. A business card passes with
 * everything on it; any other printed item photographed is a photograph, its
 * print judged by the other codes; `not_a_photo` keeps its four kinds.
 */
describe("the photo policy instruction (INC-584)", () => {
  it("PPOL-1 allows a business card with everything on it (D148)", () => {
    expect(PHOTO_POLICY_INSTRUCTION).toContain(
      "A business card is allowed with everything printed on it, its phone numbers, email addresses and handles included: never refuse a business card as contact_in_image or not_a_photo.",
    );
  });

  it("PPOL-4 allows a logo, or a graphic a business designed for itself, like a business card (D153)", () => {
    expect(PHOTO_POLICY_INSTRUCTION).toContain(
      "A logo, or another graphic a business designed for itself, is allowed with everything on it, like a business card: never refuse one as not_a_photo or contact_in_image.",
    );
  });

  it("PPOL-3 names any other printed item photographed as a photograph", () => {
    expect(PHOTO_POLICY_INSTRUCTION).toContain(
      "A photograph of another printed item, such as a flyer, a label, a menu or a price list, is a photograph and is never not_a_photo; judge what is printed on it by the other codes.",
    );
  });

  it("PPOL-2 keeps not_a_photo's four kinds and every refusal code", () => {
    expect(PHOTO_POLICY_INSTRUCTION).toContain(
      "not_a_photo covers a screenshot, a drawing, a blank frame or a test pattern.",
    );
    expect(PHOTO_POLICY_INSTRUCTION).toContain(
      `The only refusal codes are: ${POLICY_CODES.join(", ")}.`,
    );
    expect(PHOTO_POLICY_INSTRUCTION).toContain(
      "contact_in_image covers a phone number, email address or messaging handle printed on the image.",
    );
  });
});
