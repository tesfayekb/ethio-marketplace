import { describe, expect, it } from "vitest";

import { checkChannel, normalizeTelegram } from "./validate";

/**
 * Walk fix 7 — ONE TELEGRAM SHAPE, "@handle". A pasted link, a bare handle and
 * an @handle normalize to the same value; the door's own rule (5–32 of
 * a–z 0–9 _ after the @) judges the result.
 */
describe("normalizeTelegram (walk fix 7)", () => {
  it.each([
    ["abebe_shop", "@abebe_shop"],
    ["@abebe_shop", "@abebe_shop"],
    ["t.me/abebe_shop", "@abebe_shop"],
    ["https://t.me/abebe_shop", "@abebe_shop"],
    ["http://www.t.me/abebe_shop", "@abebe_shop"],
    ["  @abebe_shop  ", "@abebe_shop"],
    ["", ""],
    ["@", ""],
  ])("%s → %s", (typed, expected) => {
    expect(normalizeTelegram(typed)).toBe(expected);
  });

  it("a normalized handle passes the door's shape; a short or long one does not", () => {
    expect(checkChannel("telegram", normalizeTelegram("abebe_shop"), false)).toBeNull();
    expect(checkChannel("telegram", normalizeTelegram("ab"), false)?.reason).toBe("badHandle");
    expect(checkChannel("telegram", normalizeTelegram(`a`.repeat(40)), false)?.reason).toBe(
      "badHandle",
    );
  });
});
