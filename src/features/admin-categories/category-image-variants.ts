/**
 * DEC-082 (INC-308) — CATEGORY IMAGE VARIANTS, CUT IN THE ADMIN'S BROWSER.
 *
 * A faithful port of the retired C5a server pipeline onto canvas, same
 * constants, same order:
 *   decode -> white-to-transparent (>= 244 on R,G,B) -> content-bounds crop
 *   (alpha > 16) -> scale to 85% of the height on a 640x480 (4:3) white canvas
 *   with the three diagonal "ethio.com" watermarks drawn BEHIND the icon -> a
 *   160x120 thumb derived from the card -> 1200x630 OG on the same brand canvas
 *   at 88% of its height. D122 (2026-10-10): the card was 512 square and the
 *   thumb 128 square; at 4:3 the card fills the listing card's picture frame.
 *
 * The pure geometry (bounds, fill, centring, watermark placement, glyph blocks)
 * lives in small exported functions with unit tests; the pixel work is proven
 * by CI-4, which reads the uploaded PNGs' dimensions back in a page.
 */

/** D122 — the card fills the 4:3 picture frame (it was 512 square). */
export const CARD_WIDTH = 640;
export const CARD_HEIGHT = 480;
export const THUMB_WIDTH = 160;
export const THUMB_HEIGHT = 120;
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
export const FILL_RATIO = 0.85;
export const OG_FILL_RATIO = 0.88;
export const WHITE_THRESHOLD = 244;
export const ALPHA_FLOOR = 16;

export const WATERMARK_TEXT = "ethio.com";
export const WATERMARK_OPACITY = 0.1;
import { WATERMARK_ANGLE, WATERMARK_COLOR } from "@/lib/brand-mark";
export { WATERMARK_ANGLE, WATERMARK_COLOR };
const BRAND_BACKGROUND = "#FFFFFF";
/** Three marks on the leading diagonal, evenly spread. */
export const WATERMARK_SPOTS: readonly (readonly [number, number])[] = [
  [0.22, 0.22],
  [0.5, 0.5],
  [0.78, 0.78],
];
/** Glyph-cell scale per canvas: 3 on the card, 5 on the OG (as C5a). */
export const CARD_WATERMARK_SCALE = 3;
export const OG_WATERMARK_SCALE = 5;

// The 5x7 bitmap font the C5a watermark was drawn with (MSB-left rows).
const GLYPH_WIDTH = 5;
const GLYPH_HEIGHT = 7;
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

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Near-white pixels become fully transparent (in place). */
export function keyWhite(data: Uint8ClampedArray, threshold = WHITE_THRESHOLD): void {
  for (let i = 0; i < data.length; i += 4) {
    if (data[i]! >= threshold && data[i + 1]! >= threshold && data[i + 2]! >= threshold) {
      data[i + 3] = 0;
    }
  }
}

/** Tightest box holding every pixel with alpha above `alphaFloor`; whole image if none. */
export function contentBounds(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  alphaFloor = ALPHA_FLOOR,
): Bounds {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3]! > alphaFloor) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return { x: 0, y: 0, width, height };
  return { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

/** Scales (w,h) so its longest side is `box * ratio`; never below 1px. */
export function fitSize(
  width: number,
  height: number,
  box: number,
  ratio = FILL_RATIO,
): { width: number; height: number } {
  const factor = (box * ratio) / Math.max(width, height);
  return {
    width: Math.max(1, Math.round(width * factor)),
    height: Math.max(1, Math.round(height * factor)),
  };
}

/** Top-left offset that centres `inner` inside `outer`. */
export function centredOffset(outer: number, inner: number): number {
  return Math.round((outer - inner) / 2);
}

/** Watermark centres for a canvas, in pixels. */
export function watermarkCentres(width: number, height: number): { cx: number; cy: number }[] {
  return WATERMARK_SPOTS.map(([fx, fy]) => ({ cx: fx * width, cy: fy * height }));
}

/**
 * Centres of every filled glyph block of `text`, rotated about the string's own
 * centre, relative to that centre. Each block is then filled as a square of
 * `scale + 1` px, so the stroke stays continuous at any angle (as C5a).
 */
export function glyphBlockCentres(
  text: string,
  scale: number,
  angleDeg: number,
): { x: number; y: number }[] {
  const advance = GLYPH_WIDTH + 1;
  const totalWidth = text.length * advance * scale;
  const totalHeight = GLYPH_HEIGHT * scale;
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i < text.length; i += 1) {
    const rows = GLYPHS[text[i]!.toLowerCase()];
    if (!rows) continue;
    for (let gy = 0; gy < GLYPH_HEIGHT; gy += 1) {
      const row = rows[gy]!;
      for (let gx = 0; gx < GLYPH_WIDTH; gx += 1) {
        if ((row & (1 << (GLYPH_WIDTH - 1 - gx))) === 0) continue;
        const lx = i * advance * scale + gx * scale - totalWidth / 2;
        const ly = gy * scale - totalHeight / 2;
        out.push({ x: lx * cos - ly * sin, y: lx * sin + ly * cos });
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------- pixel work

function makeCanvas(width: number, height: number): HTMLCanvasElement {
  const el = document.createElement("canvas");
  el.width = width;
  el.height = height;
  return el;
}

function context2d(el: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = el.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("canvas 2d context unavailable");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  return ctx;
}

function toPng(el: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    el.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("canvas png encode failed"));
    }, "image/png");
  });
}

function drawWatermarks(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  scale: number,
) {
  const blocks = glyphBlockCentres(WATERMARK_TEXT, scale, WATERMARK_ANGLE);
  const size = scale + 1;
  const half = size / 2;
  ctx.save();
  ctx.fillStyle = WATERMARK_COLOR;
  ctx.globalAlpha = WATERMARK_OPACITY;
  for (const { cx, cy } of watermarkCentres(width, height)) {
    for (const block of blocks) {
      ctx.fillRect(cx + block.x - half, cy + block.y - half, size, size);
    }
  }
  ctx.restore();
}

/** A white brand canvas, watermarks BEHIND, the icon centred at `ratio` fill. */
function brandCanvas(
  icon: HTMLCanvasElement,
  width: number,
  height: number,
  ratio: number,
  scale: number,
): HTMLCanvasElement {
  const el = makeCanvas(width, height);
  const ctx = context2d(el);
  ctx.fillStyle = BRAND_BACKGROUND;
  ctx.fillRect(0, 0, width, height);
  drawWatermarks(ctx, width, height, scale);
  const fit = fitSize(icon.width, icon.height, Math.min(width, height), ratio);
  ctx.drawImage(
    icon,
    centredOffset(width, fit.width),
    centredOffset(height, fit.height),
    fit.width,
    fit.height,
  );
  return el;
}

export interface Variants {
  card: Blob;
  thumb: Blob;
  og: Blob;
}

/** Decodes the provider image and cuts the three PNG variants. */
export async function makeVariants(source: Blob): Promise<Variants> {
  const bitmap = await createImageBitmap(source);
  const full = makeCanvas(bitmap.width, bitmap.height);
  const fullCtx = context2d(full);
  fullCtx.drawImage(bitmap, 0, 0);
  bitmap.close();

  // process — alpha keying, content crop.
  const pixels = fullCtx.getImageData(0, 0, full.width, full.height);
  keyWhite(pixels.data);
  const box = contentBounds(pixels.data, full.width, full.height);
  const icon = makeCanvas(box.width, box.height);
  context2d(icon).putImageData(pixels, -box.x, -box.y, box.x, box.y, box.width, box.height);

  // watermark — brand canvases with the marks BEHIND the icon.
  const card = brandCanvas(icon, CARD_WIDTH, CARD_HEIGHT, FILL_RATIO, CARD_WATERMARK_SCALE);
  const og = brandCanvas(icon, OG_WIDTH, OG_HEIGHT, OG_FILL_RATIO, OG_WATERMARK_SCALE);

  // encode — the thumb is derived from the card so they can never disagree.
  const thumb = makeCanvas(THUMB_WIDTH, THUMB_HEIGHT);
  context2d(thumb).drawImage(card, 0, 0, THUMB_WIDTH, THUMB_HEIGHT);

  const [cardPng, thumbPng, ogPng] = await Promise.all([toPng(card), toPng(thumb), toPng(og)]);
  return { card: cardPng, thumb: thumbPng, og: ogPng };
}
