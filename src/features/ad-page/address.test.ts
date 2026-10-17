/**
 * D201 §2 — THE AD'S PUBLIC ADDRESS: the words from the title, the canonical
 * path, the short form, and the parse that finds the id at the end.
 */
import { describe, expect, it } from "vitest";

import {
  ADDRESS_WORDS_MAX,
  addressWords,
  canonicalSegment,
  isPublicId,
  listingPath,
  listingUrl,
  parseAddressSegment,
  shortListingPath,
} from "./address";

const ID = "abcdefghjk";
const ID2 = "23456789ab";

describe("the ad's public address (D201 §2)", () => {
  it("LA-1 a public id is ten characters of the approved alphabet", () => {
    expect(isPublicId(ID)).toBe(true);
    expect(isPublicId(ID2)).toBe(true);
    expect(isPublicId("abcdefghj")).toBe(false);
    expect(isPublicId("abcdefghjkm")).toBe(false);
    expect(isPublicId("ABCDEFGHJK")).toBe(false);
    for (const excluded of ["0", "1", "i", "l", "o"]) {
      expect(isPublicId(`abcdefghj${excluded}`)).toBe(false);
    }
  });

  it("LA-2 the words are the title's ASCII fold, lower case, one dash between words", () => {
    expect(addressWords("Toyota Corolla 2015, clean!")).toBe("toyota-corolla-2015-clean");
    expect(addressWords("  Café   Résumé — 3 BHK ")).toBe("cafe-resume-3-bhk");
    expect(addressWords("iPhone_13 (128GB) / blue")).toBe("iphone-13-128gb-blue");
    expect(addressWords("ቤት ለሽያጭ")).toBe("");
    expect(addressWords("ቤት 3 bedroom ጎተራ")).toBe("3-bedroom");
    expect(addressWords("---")).toBe("");
    expect(addressWords("")).toBe("");
  });

  it("LA-3 the words are cut at 60 characters on a word boundary, never inside a word", () => {
    const title = "alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi";
    const words = addressWords(title);
    expect(words).toBe("alpha-beta-gamma-delta-epsilon-zeta-eta-theta-iota-kappa");
    expect(words.length).toBeLessThanOrEqual(ADDRESS_WORDS_MAX);
    expect(words.endsWith("-")).toBe(false);
    // A cut that falls exactly on a dash keeps the whole word before it.
    const exact = "abcdefghij klmnopqrst uvwxyzabcd efghijklmn opqrstuvwx yzabcdefg";
    expect(addressWords(exact)).toBe("abcdefghij-klmnopqrst-uvwxyzabcd-efghijklmn-opqrstuvwx");
    // One word longer than the cap has no boundary: it is cut at 60.
    expect(addressWords("x".repeat(70))).toBe("x".repeat(60));
  });

  it("LA-4 the canonical path carries the words and the id, or the id alone", () => {
    expect(canonicalSegment("Toyota Corolla", ID)).toBe(`toyota-corolla-${ID}`);
    expect(listingPath("Toyota Corolla", ID)).toBe(`/l/toyota-corolla-${ID}`);
    expect(listingPath("ቤት ለሽያጭ", ID)).toBe(`/l/${ID}`);
    expect(shortListingPath(ID)).toBe(`/l/${ID}`);
    expect(listingUrl("https://ethio.com", "Toyota Corolla", ID)).toBe(
      `https://ethio.com/l/toyota-corolla-${ID}`,
    );
    expect(listingUrl("https://ethio.com/", "ቤት", ID)).toBe(`https://ethio.com/l/${ID}`);
  });

  it("LA-5 a segment is parsed by the id at its end; anything else is null", () => {
    expect(parseAddressSegment(`toyota-corolla-${ID}`)).toEqual({
      publicId: ID,
      words: "toyota-corolla",
    });
    expect(parseAddressSegment(ID)).toEqual({ publicId: ID, words: "" });
    expect(parseAddressSegment(`old-title-${ID}`)).toEqual({ publicId: ID, words: "old-title" });
    expect(parseAddressSegment(`-${ID}`)).toEqual({ publicId: ID, words: "" });
    for (const bad of [
      "",
      "toyota-corolla",
      "abcdefghj",
      "abcdefghjkm",
      `toyota-${ID.toUpperCase()}`,
      "toyota-abcdefghj0",
      `${ID}-`,
      "qr.svg",
    ]) {
      expect(parseAddressSegment(bad)).toBeNull();
    }
  });

  it("LA-6 every canonical path parses back to its id and words", () => {
    for (const title of [
      "Toyota Corolla 2015",
      "ቤት ለሽያጭ",
      "Café Résumé",
      "x".repeat(70),
      "alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi",
    ]) {
      const segment = canonicalSegment(title, ID2);
      const parsed = parseAddressSegment(segment);
      expect(parsed?.publicId).toBe(ID2);
      expect(parsed?.words).toBe(addressWords(title));
      expect(canonicalSegment(title, ID2)).toBe(segment);
    }
  });
});
