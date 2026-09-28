import { describe, expect, it } from "vitest";

import {
  CARD_SIZE,
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

  it("fills the card to 85% on the longest side, centred", () => {
    const fit = fitSize(700, 350, CARD_SIZE, FILL_RATIO);
    expect(fit).toEqual({ width: 435, height: 218 });
    expect(centredOffset(CARD_SIZE, fit.width)).toBe(39);
  });

  it("scales the OG icon against the canvas height at 88%", () => {
    const fit = fitSize(700, 700, Math.min(OG_WIDTH, OG_HEIGHT), OG_FILL_RATIO);
    expect(fit).toEqual({ width: 554, height: 554 });
    expect(centredOffset(OG_WIDTH, fit.width)).toBe(323);
  });

  it("places three watermarks on the leading diagonal", () => {
    expect(watermarkCentres(CARD_SIZE, CARD_SIZE)).toEqual([
      { cx: 0.22 * 512, cy: 0.22 * 512 },
      { cx: 256, cy: 256 },
      { cx: 0.78 * 512, cy: 0.78 * 512 },
    ]);
  });

  it("rotates the watermark glyphs about the string centre", () => {
    const flat = glyphBlockCentres(WATERMARK_TEXT, 3, 0);
    const tilted = glyphBlockCentres(WATERMARK_TEXT, 3, -30);
    expect(flat.length).toBeGreaterThan(50);
    expect(tilted).toHaveLength(flat.length);
    // Rotation preserves each block's distance from the centre.
    for (let i = 0; i < flat.length; i += 1) {
      expect(Math.hypot(tilted[i]!.x, tilted[i]!.y)).toBeCloseTo(
        Math.hypot(flat[i]!.x, flat[i]!.y),
        6,
      );
    }
    // −30°: the string's right end rises (negative y on screen).
    const rightmost = tilted.reduce((a, b) => (b.x > a.x ? b : a));
    expect(rightmost.y).toBeLessThan(0);
  });
});
