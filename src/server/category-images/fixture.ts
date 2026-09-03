/**
 * C5a — GEMINI_FAKE=1 fixture.
 *
 * The model call is short-circuited with this deterministic 1024x1024 PNG
 * (white background, a #1E5A43 rounded square with a #C98A2B disc, ~70% fill so
 * the crop/scale stages have real work to do). It is generated from the same
 * raster primitives rather than checked in as a binary blob: identical bytes on
 * every run, no asset to drift, and the WHOLE pipeline still executes.
 */
import { canvas, encodePng, type Raster } from "./raster";

const PRIMARY: [number, number, number, number] = [0x1e, 0x5a, 0x43, 255];
const ACCENT: [number, number, number, number] = [0xc9, 0x8a, 0x2b, 255];

function fill(img: Raster, test: (x: number, y: number) => boolean, rgba: number[]): void {
  for (let y = 0; y < img.height; y += 1) {
    for (let x = 0; x < img.width; x += 1) {
      if (!test(x, y)) continue;
      const d = (y * img.width + x) * 4;
      img.data[d] = rgba[0]!;
      img.data[d + 1] = rgba[1]!;
      img.data[d + 2] = rgba[2]!;
      img.data[d + 3] = rgba[3]!;
    }
  }
}

export function fakeGeneratedPng(size = 1024): Uint8Array {
  const img = canvas(size, size, [255, 255, 255, 255]);
  const inset = Math.round(size * 0.15);
  const radius = Math.round(size * 0.08);
  const min = inset;
  const max = size - inset;
  fill(
    img,
    (x, y) => {
      if (x < min || y < min || x > max || y > max) return false;
      const dx = Math.min(x - min, max - x);
      const dy = Math.min(y - min, max - y);
      if (dx >= radius || dy >= radius) return true;
      const ox = radius - dx;
      const oy = radius - dy;
      return ox * ox + oy * oy <= radius * radius;
    },
    PRIMARY,
  );
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.16;
  fill(img, (x, y) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r, ACCENT);
  return encodePng(img);
}
