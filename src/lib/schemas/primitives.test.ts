import { describe, expect, it } from "vitest";

import {
  boundedText,
  countryCode,
  idList,
  langCode,
  optionalText,
  positiveInt,
  publicId,
  uuid,
} from "@/lib/schemas/primitives";

/**
 * Foundations turn 2 (DEC-237) — SCH-1: each shared shape accepts its
 * canonical value and refuses one malformed value.
 */
describe("route schema primitives (SCH-1)", () => {
  it("uuid accepts the canonical and upper-case forms, refuses a non-uuid", () => {
    expect(uuid.safeParse("11111111-1111-4111-8111-111111111111").success).toBe(true);
    expect(uuid.safeParse("11111111-1111-4111-8111-111111111111".toUpperCase()).success).toBe(true);
    expect(uuid.safeParse("not-a-uuid").success).toBe(false);
  });

  it("publicId accepts a ten-letter address id and refuses a uuid", () => {
    expect(publicId.safeParse("23456789ab").success).toBe(true);
    expect(publicId.safeParse("11111111-1111-4111-8111-111111111111").success).toBe(false);
  });

  it("langCode accepts the i18n route's shape and refuses an upper-case code", () => {
    expect(langCode.safeParse("am").success).toBe(true);
    expect(langCode.safeParse("pt-br").success).toBe(true);
    expect(langCode.safeParse("EN").success).toBe(false);
  });

  it("countryCode accepts two letters and upper-cases them", () => {
    const parsed = countryCode.safeParse("et");
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data).toBe("ET");
    expect(countryCode.safeParse("eth").success).toBe(false);
  });

  it("boundedText trims, refuses empty and over-long", () => {
    const name = boundedText(10);
    const parsed = name.safeParse("  hi  ");
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data).toBe("hi");
    expect(name.safeParse("   ").success).toBe(false);
    expect(name.safeParse("01234567890").success).toBe(false);
  });

  it("optionalText trims and allows empty, refuses over-long", () => {
    const note = optionalText(10);
    expect(note.safeParse("").success).toBe(true);
    expect(note.safeParse("01234567890").success).toBe(false);
  });

  it("idList bounds the list and the ids", () => {
    const ids = idList(2);
    expect(ids.safeParse(["11111111-1111-4111-8111-111111111111"]).success).toBe(true);
    expect(
      ids.safeParse([
        "11111111-1111-4111-8111-111111111111",
        "22222222-2222-4222-8222-222222222222",
        "33333333-3333-4333-8333-333333333333",
      ]).success,
    ).toBe(false);
    expect(ids.safeParse(["x"]).success).toBe(false);
  });

  it("positiveInt bounds a non-negative integer", () => {
    const count = positiveInt(10);
    expect(count.safeParse(0).success).toBe(true);
    expect(count.safeParse(10).success).toBe(true);
    expect(count.safeParse(-1).success).toBe(false);
    expect(count.safeParse(11).success).toBe(false);
    expect(count.safeParse(1.5).success).toBe(false);
  });
});
