/**
 * INC-910 — the E2E colour reader (e2e/helpers/colors.ts). A browser reports a
 * colour Tailwind mixes (`bg-destructive/90` on hover, every `/NN` opacity) as
 * oklab(); the reader takes oklch(), oklab() and rgb() alike, and a fill a
 * person sees as a colour is at least half opaque.
 */
import { describe, expect, it } from "vitest";

import { isGoldFill, isRedFill, okLchOf, rgbOf } from "../../e2e/helpers/colors";

describe("the E2E colour reader (INC-910)", () => {
  it("EC-1 the red tokens, light and dark, and their hovered 90% mix as Chromium reports it, are red", () => {
    expect(isRedFill("oklch(0.5 0.182 29.5)")).toBe(true);
    expect(isRedFill("oklch(0.704 0.191 22.216)")).toBe(true);
    expect(isRedFill("oklab(0.5 0.158405 0.0896211 / 0.9)")).toBe(true);
  });

  it("EC-2 the gold tokens and their hovered mix are gold, and not red", () => {
    expect(isGoldFill("oklch(0.681 0.13 72.5)")).toBe(true);
    expect(isGoldFill("oklch(0.769 0.128 78.3)")).toBe(true);
    expect(isGoldFill("oklab(0.681 0.039091 0.123986 / 0.9)")).toBe(true);
    expect(isRedFill("oklch(0.681 0.13 72.5)")).toBe(false);
  });

  it("EC-3 a pale wash (10%), the primary green, a grey and an unknown form are no red fill", () => {
    expect(isRedFill("oklab(0.5 0.158405 0.0896211 / 0.1)")).toBe(false);
    expect(isRedFill("oklch(0.52 0.11 163)")).toBe(false);
    expect(isRedFill("oklab(0.52 -0.105 0.032 / 0.9)")).toBe(false);
    expect(isRedFill("oklch(0.97 0 0)")).toBe(false);
    expect(isRedFill("color(srgb 1 0 0)")).toBe(false);
  });

  it("EC-4 rgb() keeps its reading", () => {
    expect(isRedFill("rgb(180, 35, 24)")).toBe(true);
    expect(isGoldFill("rgb(201, 138, 43)")).toBe(true);
    expect(isRedFill("rgb(255, 255, 255)")).toBe(false);
  });

  it("EC-5 oklab's a and b become chroma and hue, a percentage alpha is read", () => {
    const lch = okLchOf("oklab(0.5 0.158405 0.0896211 / 90%)");
    expect(lch?.chroma).toBeCloseTo(0.182, 3);
    expect(lch?.hue).toBeCloseTo(29.5, 1);
    expect(lch?.alpha).toBeCloseTo(0.9, 5);
    expect(okLchOf("oklab(0.52 -0.105 -0.032)")?.hue).toBeGreaterThan(180);
    expect(okLchOf("rgb(1, 2, 3)")).toBeNull();
  });

  it("EC-6 rgb()'s alpha is read as oklab()'s is: a 10% wash is no fill, comma or space form (turn 32b's reviewer)", () => {
    expect(isRedFill("rgba(180, 35, 24, 0.1)")).toBe(false);
    expect(isRedFill("rgb(180 35 24 / 10%)")).toBe(false);
    expect(isRedFill("rgba(180, 35, 24, 0.9)")).toBe(true);
    expect(isGoldFill("rgba(201, 138, 43, 0.1)")).toBe(false);
    expect(isGoldFill("rgb(201 138 43 / 90%)")).toBe(true);
    expect(rgbOf("rgba(1, 2, 3, 0.5)")).toEqual({ red: 1, green: 2, blue: 3, alpha: 0.5 });
    expect(rgbOf("rgb(1, 2, 3)")?.alpha).toBe(1);
    expect(rgbOf("oklch(0.5 0.1 30)")).toBeNull();
  });
});
