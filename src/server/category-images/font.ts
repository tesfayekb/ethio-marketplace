/**
 * C5a — a tiny 5x7 bitmap font, sufficient for the watermark word "ethio.com".
 *
 * WHY A HAND-ROLLED FONT (G2, dependency rule): the watermark is the only text
 * the pipeline ever draws and it draws exactly one string. Shipping a font
 * rasteriser (or the 6.1 MB `@cf-wasm/photon` wasm bundle) to buy nine glyphs
 * would fail the "no new dependency unless named" law far more expensively than
 * 60 lines of pixel data. Every glyph is 5 columns x 7 rows, MSB-left.
 */

export const GLYPH_WIDTH = 5;
export const GLYPH_HEIGHT = 7;

/** Each entry: 7 rows, each row a 5-bit mask (bit 4 = leftmost column). */
const GLYPHS: Record<string, number[]> = {
  e: [0b00000, 0b00000, 0b01110, 0b10001, 0b11111, 0b10000, 0b01110],
  t: [0b00100, 0b00100, 0b11111, 0b00100, 0b00100, 0b00101, 0b00010],
  h: [0b10000, 0b10000, 0b10110, 0b11001, 0b10001, 0b10001, 0b10001],
  i: [0b00100, 0b00000, 0b01100, 0b00100, 0b00100, 0b00100, 0b01110],
  o: [0b00000, 0b00000, 0b01110, 0b10001, 0b10001, 0b10001, 0b01110],
  c: [0b00000, 0b00000, 0b01110, 0b10001, 0b10000, 0b10001, 0b01110],
  m: [0b00000, 0b00000, 0b11010, 0b10101, 0b10101, 0b10101, 0b10101],
  ".": [0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b01100, 0b01100],
};

export function glyphRows(ch: string): number[] | null {
  return GLYPHS[ch.toLowerCase()] ?? null;
}
