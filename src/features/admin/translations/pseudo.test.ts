import { describe, expect, it } from "vitest";

import {
  LENGTH_WARN_RATIO,
  PSEUDO_LANG,
  isOverlong,
  isPseudo,
  lengthRatio,
  pseudoize,
  textLength,
} from "./pseudo";

/**
 * DEC-026 seed coverage for U4i ③ (length warnings) and ⑦ (pseudo generator).
 * These are the two pure rules the console renders and the writer validates.
 */

describe("③ length warning", () => {
  it("stays silent while a translation is within the ratio", () => {
    expect(isOverlong("Save changes", "Sauvegarder")).toBe(false);
  });

  it("warns once a translation exceeds 150% of its source", () => {
    const source = "Save";
    const long = "Sauvegarder les modifications";
    expect(textLength(long) > textLength(source) * LENGTH_WARN_RATIO).toBe(true);
    expect(isOverlong(source, long)).toBe(true);
  });

  it("never warns on an empty source or an empty translation", () => {
    expect(isOverlong("", "anything at all")).toBe(false);
    expect(isOverlong("Save", "")).toBe(false);
    expect(isOverlong(null, null)).toBe(false);
  });

  it("counts Ge'ez syllables as single units", () => {
    // Amharic is compact: "አስቀምጥ" must not read as over-long against "Save".
    expect(textLength("አስቀምጥ")).toBe(5);
    expect(isOverlong("Save", "አስቀምጥ")).toBe(false);
  });

  it("reports the measured ratio for the chip", () => {
    expect(lengthRatio("abcd", "abcdef")).toBe(1.5);
    expect(lengthRatio("", "abc")).toBe(0);
  });
});

describe("⑦ pseudo generator", () => {
  it("brackets and stretches the source by at least 40%", () => {
    const out = pseudoize("Settings");
    expect(out.startsWith("⟪")).toBe(true);
    expect(out.endsWith("⟫")).toBe(true);
    expect(isPseudo(out)).toBe(true);
    // brackets excluded from the growth check
    const body = out.slice(1, -1);
    expect(textLength(body)).toBeGreaterThanOrEqual(Math.ceil(textLength("Settings") * 1.4));
  });

  it("accents latin letters so untranslated text is obvious", () => {
    expect(pseudoize("Example")).toContain("Ḗẋȧḿṗŀḗ");
  });

  it("preserves every {placeholder} verbatim", () => {
    const out = pseudoize("Showing {count} of {total} listings");
    expect(out).toContain("{count}");
    expect(out).toContain("{total}");
    const tokens = out.match(/\{[^{}]*\}/g) ?? [];
    expect(tokens).toEqual(["{count}", "{total}"]);
  });

  it("is deterministic and never empty", () => {
    expect(pseudoize("a")).toBe(pseudoize("a"));
    expect(pseudoize("").length).toBeGreaterThan(2);
  });

  it("targets the reserved never-publishable code", () => {
    expect(PSEUDO_LANG).toBe("zxa");
  });
});
