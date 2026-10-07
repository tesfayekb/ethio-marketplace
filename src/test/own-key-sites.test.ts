import { Package, Tag } from "lucide-react";
import { describe, expect, it } from "vitest";

import { categoryGlyph, categoryGlyphOrNull } from "@/components/shell/category-glyphs";
import { categoryIcon } from "@/config/panels";
import { compiledCatalogLoader } from "@/i18n/compiled-catalog";
import { colourSwatch } from "@/features/posting/colour-swatches";
import { stepOfField, summaryLabel } from "@/features/posting/field";
import { priceLine } from "@/features/posting/price-line";
import { draftRefusalKey, photoRefusalKey } from "@/features/posting/refusal-text";
import { familyOf } from "@/server/imports/registry";

/**
 * Part H1 — every lookup whose key arrives from outside reads the map's own
 * keys only: a key naming an inherited member answers as an unlisted key does.
 */
const INHERITED = ["constructor", "toString", "__proto__", "hasOwnProperty"];

describe("own-key lookups (Part H1)", () => {
  it("the compiled catalog: a listed code answers its loader, others undefined", () => {
    expect(typeof compiledCatalogLoader("am")).toBe("function");
    expect(compiledCatalogLoader("om")).toBeUndefined();
    for (const k of INHERITED) expect(compiledCatalogLoader(k)).toBeUndefined();
  });
  it("the import registry answers null for an inherited name", () => {
    for (const k of INHERITED) expect(familyOf(k)).toBeNull();
  });
  it("category icons fall back for an inherited name", () => {
    for (const k of INHERITED) {
      expect(categoryIcon(k)).toBe(Tag);
      expect(categoryGlyph(k)).toBe(Package);
      expect(categoryGlyphOrNull(k)).toBeNull();
    }
  });
  it("the field label, step and refusal keys fall back for an inherited name", () => {
    const t = (key: string) => `t:${key}`;
    for (const k of INHERITED) {
      expect(summaryLabel(k, t as never)).toBe(k);
      expect(stepOfField(k)).toBeNull();
      expect(draftRefusalKey(k)).toBe("post.refusal.unknown");
      expect(photoRefusalKey(k)).toBe("post.photo.refusal.unknown");
      expect(colourSwatch(k)).toBeNull();
    }
  });
  it("a price period naming an inherited member prints the plain amount", () => {
    const t = (key: string) => `t:${key}`;
    const line = priceLine(
      { mode: "fixed", amount: 5, currency: "ETB", period: "constructor", unit: null } as never,
      t as never,
      "-",
    );
    expect(line).toBe("t:post.review.priceLine");
  });
});
