import { describe, expect, it } from "vitest";

import {
  baseTotalOf,
  coverageAgainstBase,
  type LanguageRow,
  type TranslationStats,
} from "./translations-service";

function language(code: string, isBase: boolean): LanguageRow {
  return {
    code,
    nameEn: code,
    nameNative: code,
    rtl: false,
    isBase,
    enabledAdmin: true,
    enabledPublic: isBase,
    sort: 0,
  };
}

function stats(langCode: string, total: number, approved: number): TranslationStats {
  return {
    langCode,
    total,
    untranslated: total - approved,
    machineCount: 0,
    edited: 0,
    approved,
    flagged: 0,
    orphaned: 0,
    reviewable: 0,
  };
}

describe("INC-790 — coverageAgainstBase", () => {
  it("a language with no rows under a base of 5 reads 5 remaining", () => {
    expect(coverageAgainstBase(undefined, 5, false)).toEqual({
      total: 5,
      approved: 0,
      remaining: 5,
    });
  });

  it("5 approved under a base of 5 leaves nothing remaining", () => {
    expect(coverageAgainstBase(stats("om", 5, 5), 5, false)).toEqual({
      total: 5,
      approved: 5,
      remaining: 0,
    });
  });

  it("the base language keeps its own counts", () => {
    expect(coverageAgainstBase(stats("en", 7, 4), 5, true)).toEqual({
      total: 7,
      approved: 4,
      remaining: 3,
    });
  });

  it("an empty base reads 0 total and 0 remaining for every language", () => {
    expect(coverageAgainstBase(undefined, 0, false)).toEqual({
      total: 0,
      approved: 0,
      remaining: 0,
    });
    expect(coverageAgainstBase(stats("am", 0, 0), 0, false)).toEqual({
      total: 0,
      approved: 0,
      remaining: 0,
    });
    expect(coverageAgainstBase(undefined, 0, true)).toEqual({
      total: 0,
      approved: 0,
      remaining: 0,
    });
  });
});

describe("INC-1143 — baseTotalOf: the base catalogue is the roster's isBase row", () => {
  const byLang = new Map([
    ["xb", stats("xb", 7, 7)],
    ["en", stats("en", 99, 99)],
  ]);

  it("BTO-1 the roster's base language names the total, not a code written in the code", () => {
    // Positive control: an "en" row is present with another total, so a literal read is seen.
    expect(baseTotalOf([language("en", false), language("xb", true)], byLang)).toBe(7);
  });

  it("BTO-2 no single base row reads an empty catalogue", () => {
    expect(baseTotalOf(undefined, byLang)).toBe(0);
    expect(baseTotalOf([language("en", false)], byLang)).toBe(0);
    expect(baseTotalOf([language("en", true), language("xb", true)], byLang)).toBe(0);
  });
});
