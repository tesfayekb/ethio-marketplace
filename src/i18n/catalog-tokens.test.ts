import { describe, expect, it } from "vitest";

import { catalogPieces, catalogWords, drawCatalog, type CatalogTokens } from "./catalog-tokens";

const paths: Record<string, string> = { "phone-cases": "Phones › Accessories › Cases" };
const tokens: CatalogTokens = {
  country: "Ethiopia",
  categoryPath: (slug) => paths[slug] ?? null,
};

describe("catalogue tokens (steps 28–29, DEC-094/095)", () => {
  it("draws {country} in label, help and option text, en and am", () => {
    expect(catalogWords("Made in {country}", "በ{country} የተሠራ", "en", tokens)).toBe(
      "Made in Ethiopia",
    );
    expect(
      catalogWords("Made in {country}", "በ{country} የተሠራ", "am", { ...tokens, country: "ኢትዮጵያ" }),
    ).toBe("በኢትዮጵያ የተሠራ");
    expect(drawCatalog("{country} plug", { ...tokens, country: "your country" })).toBe(
      "your country plug",
    );
  });

  it("draws a category pointer as its full path, as its own piece", () => {
    expect(catalogPieces("Cases go under {category:phone-cases}.", tokens)).toEqual([
      { kind: "text", text: "Cases go under " },
      { kind: "category", slug: "phone-cases", path: "Phones › Accessories › Cases" },
      { kind: "text", text: "." },
    ]);
  });

  it("draws a gone category as nothing — never raw braces", () => {
    const out = drawCatalog("Cases go under {category:gone-slug}. Ask first.", tokens);
    expect(out).toBe("Cases go under. Ask first.");
    expect(out).not.toContain("{");
    expect(drawCatalog("{category:gone-slug}", tokens)).toBe("");
  });

  it("leaves text without tokens unchanged", () => {
    expect(drawCatalog("Battery health, e.g. 89.", tokens)).toBe("Battery health, e.g. 89.");
  });
});
