import { describe, expect, it } from "vitest";

import {
  CARD_HEIGHT,
  CARD_WIDTH,
  centredOffset,
  contentBounds,
  fitSize,
  FILL_RATIO,
  glyphBlockCentres,
  keyWhite,
  OG_FILL_RATIO,
  OG_HEIGHT,
  OG_WIDTH,
  watermarkCentres,
  WATERMARK_ANGLE,
  WATERMARK_TEXT,
} from "./category-image-variants";

function rgba(width: number, height: number, fill: [number, number, number, number]) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < data.length; i += 4) data.set(fill, i);
  return data;
}

describe("category image variants — geometry", () => {
  it("keys near-white to transparent at the C5a threshold only", () => {
    const data = new Uint8ClampedArray([244, 244, 244, 255, 243, 255, 255, 255]);
    keyWhite(data);
    expect(data[3]).toBe(0);
    expect(data[7]).toBe(255);
  });

  it("finds the tightest opaque box, and the whole image when empty", () => {
    const data = rgba(10, 8, [0, 0, 0, 0]);
    for (const [x, y] of [
      [2, 3],
      [6, 5],
    ]) {
      data[(y! * 10 + x!) * 4 + 3] = 255;
    }
    expect(contentBounds(data, 10, 8)).toEqual({ x: 2, y: 3, width: 5, height: 3 });
    expect(contentBounds(rgba(4, 4, [0, 0, 0, 16]), 4, 4)).toEqual({
      x: 0,
      y: 0,
      width: 4,
      height: 4,
    });
  });

  it("fills the 4:3 card to 85% of its height on the longest side, centred (D122)", () => {
    const fit = fitSize(700, 350, Math.min(CARD_WIDTH, CARD_HEIGHT), FILL_RATIO);
    expect(fit).toEqual({ width: 408, height: 204 });
    expect(centredOffset(CARD_WIDTH, fit.width)).toBe(116);
    expect(centredOffset(CARD_HEIGHT, fit.height)).toBe(138);
  });

  it("scales the OG icon against the canvas height at 88%", () => {
    const fit = fitSize(700, 700, Math.min(OG_WIDTH, OG_HEIGHT), OG_FILL_RATIO);
    expect(fit).toEqual({ width: 554, height: 554 });
    expect(centredOffset(OG_WIDTH, fit.width)).toBe(323);
  });

  it("places three watermarks on the leading diagonal", () => {
    expect(watermarkCentres(CARD_WIDTH, CARD_HEIGHT)).toEqual([
      { cx: 0.22 * 640, cy: 0.22 * 480 },
      { cx: 320, cy: 240 },
      { cx: 0.78 * 640, cy: 0.78 * 480 },
    ]);
  });

  it("rotates the watermark glyphs about the string centre", () => {
    const flat = glyphBlockCentres(WATERMARK_TEXT, 3, 0);
    const tilted = glyphBlockCentres(WATERMARK_TEXT, 3, WATERMARK_ANGLE);
    expect(flat.length).toBeGreaterThan(50);
    expect(tilted).toHaveLength(flat.length);
    // Rotation preserves each block's distance from the centre.
    for (let i = 0; i < flat.length; i += 1) {
      expect(Math.hypot(tilted[i]!.x, tilted[i]!.y)).toBeCloseTo(
        Math.hypot(flat[i]!.x, flat[i]!.y),
        6,
      );
    }
    // The brand angle (−30°, D122): the string's right end rises (negative y on screen).
    const rightmost = tilted.reduce((a, b) => (b.x > a.x ? b : a));
    expect(rightmost.y).toBeLessThan(0);
  });
});

describe("D122 — one angle", () => {
  it("draws the watermark and every ribbon at −30°", () => {
    expect(WATERMARK_ANGLE).toBe(-30);
  });
});
