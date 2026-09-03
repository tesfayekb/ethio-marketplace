/**
 * C5a — pure-JS RGBA raster operations (decode, crop, scale, composite, text).
 *
 * DEPENDENCY VERDICT (G2): `@cf-wasm/photon` installs, but it is a 6.1 MB wasm
 * payload whose asset resolution differs per runtime entry (node / workerd /
 * edge-light) — the app is served BOTH ways (CI runs the node-server build,
 * production runs workerd). `pngjs` is pure JS, uses only `zlib`/`Buffer`
 * (both Worker-safe with nodejs_compat) and is ~90 KB. Photon was installed,
 * measured and REMOVED; `pngjs` is the landed choice.
 */
import { PNG } from "pngjs";

import { GLYPH_HEIGHT, GLYPH_WIDTH, glyphRows } from "./font";

export interface Raster {
  width: number;
  height: number;
  /** RGBA, 4 bytes per pixel, row-major. */
  data: Uint8Array;
}

export type Rgba = [number, number, number, number];

export function decodePng(bytes: Uint8Array): Raster {
  const png = PNG.sync.read(Buffer.from(bytes));
  return { width: png.width, height: png.height, data: new Uint8Array(png.data) };
}

export function encodePng(img: Raster): Uint8Array {
  const png = new PNG({ width: img.width, height: img.height });
  png.data = Buffer.from(img.data);
  return new Uint8Array(PNG.sync.write(png));
}

export function canvas(width: number, height: number, fill: Rgba): Raster {
  const data = new Uint8Array(width * height * 4);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = fill[0];
    data[i + 1] = fill[1];
    data[i + 2] = fill[2];
    data[i + 3] = fill[3];
  }
  return { width, height, data };
}

/** Near-white pixels become fully transparent so the watermark reads THROUGH. */
export function whiteToTransparent(img: Raster, threshold = 244): Raster {
  const data = new Uint8Array(img.data);
  for (let i = 0; i < data.length; i += 4) {
    if (data[i]! >= threshold && data[i + 1]! >= threshold && data[i + 2]! >= threshold) {
      data[i + 3] = 0;
    }
  }
  return { width: img.width, height: img.height, data };
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Tightest box holding every pixel with alpha above `alphaFloor`. */
export function contentBounds(img: Raster, alphaFloor = 16): Bounds {
  let minX = img.width;
  let minY = img.height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < img.height; y += 1) {
    for (let x = 0; x < img.width; x += 1) {
      if (img.data[(y * img.width + x) * 4 + 3]! > alphaFloor) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return { x: 0, y: 0, width: img.width, height: img.height };
  return { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

export function crop(img: Raster, box: Bounds): Raster {
  const out = new Uint8Array(box.width * box.height * 4);
  for (let y = 0; y < box.height; y += 1) {
    const src = ((box.y + y) * img.width + box.x) * 4;
    out.set(img.data.subarray(src, src + box.width * 4), y * box.width * 4);
  }
  return { width: box.width, height: box.height, data: out };
}

/** Bilinear resample. Deterministic, no dependencies, alpha-aware. */
export function resize(img: Raster, width: number, height: number): Raster {
  const out = new Uint8Array(width * height * 4);
  const sx = img.width / width;
  const sy = img.height / height;
  for (let y = 0; y < height; y += 1) {
    const fy = Math.min(img.height - 1, (y + 0.5) * sy - 0.5);
    const y0 = Math.max(0, Math.floor(fy));
    const y1 = Math.min(img.height - 1, y0 + 1);
    const wy = fy - y0;
    for (let x = 0; x < width; x += 1) {
      const fx = Math.min(img.width - 1, (x + 0.5) * sx - 0.5);
      const x0 = Math.max(0, Math.floor(fx));
      const x1 = Math.min(img.width - 1, x0 + 1);
      const wx = fx - x0;
      const o = (y * width + x) * 4;
      for (let c = 0; c < 4; c += 1) {
        const p00 = img.data[(y0 * img.width + x0) * 4 + c]!;
        const p10 = img.data[(y0 * img.width + x1) * 4 + c]!;
        const p01 = img.data[(y1 * img.width + x0) * 4 + c]!;
        const p11 = img.data[(y1 * img.width + x1) * 4 + c]!;
        const top = p00 + (p10 - p00) * wx;
        const bottom = p01 + (p11 - p01) * wx;
        out[o + c] = Math.round(top + (bottom - top) * wy);
      }
    }
  }
  return { width, height, data: out };
}

/** Standard source-over composite of `src` onto `dst` at (dx, dy). */
export function compositeOver(dst: Raster, src: Raster, dx: number, dy: number, opacity = 1): void {
  for (let y = 0; y < src.height; y += 1) {
    const ty = dy + y;
    if (ty < 0 || ty >= dst.height) continue;
    for (let x = 0; x < src.width; x += 1) {
      const tx = dx + x;
      if (tx < 0 || tx >= dst.width) continue;
      const s = (y * src.width + x) * 4;
      const d = (ty * dst.width + tx) * 4;
      const sa = (src.data[s + 3]! / 255) * opacity;
      if (sa <= 0) continue;
      const da = dst.data[d + 3]! / 255;
      const oa = sa + da * (1 - sa);
      for (let c = 0; c < 3; c += 1) {
        const sc = src.data[s + c]!;
        const dc = dst.data[d + c]!;
        dst.data[d + c] = Math.round((sc * sa + dc * da * (1 - sa)) / (oa || 1));
      }
      dst.data[d + 3] = Math.round(oa * 255);
    }
  }
}

function putBlock(
  img: Raster,
  cx: number,
  cy: number,
  size: number,
  color: Rgba,
  opacity: number,
): void {
  const half = size / 2;
  for (let y = Math.floor(cy - half); y <= Math.ceil(cy + half); y += 1) {
    for (let x = Math.floor(cx - half); x <= Math.ceil(cx + half); x += 1) {
      if (x < 0 || y < 0 || x >= img.width || y >= img.height) continue;
      const d = (y * img.width + x) * 4;
      const sa = (color[3] / 255) * opacity;
      const da = img.data[d + 3]! / 255;
      const oa = sa + da * (1 - sa);
      for (let c = 0; c < 3; c += 1) {
        const dc = img.data[d + c]!;
        img.data[d + c] = Math.round((color[c]! * sa + dc * da * (1 - sa)) / (oa || 1));
      }
      img.data[d + 3] = Math.round(oa * 255);
    }
  }
}

export interface RotatedTextOptions {
  text: string;
  /** Centre of the drawn string, in destination pixels. */
  cx: number;
  cy: number;
  /** Pixel size of one glyph cell unit. */
  scale: number;
  /** Degrees, negative = counter-clockwise on screen. */
  angleDeg: number;
  color: Rgba;
  opacity: number;
}

/**
 * Draws `text` rotated about its own centre using the 5x7 bitmap font.
 * Each set glyph pixel becomes a rotated filled block, so the stroke stays
 * continuous at any angle.
 */
export function drawRotatedText(img: Raster, opts: RotatedTextOptions): void {
  const advance = GLYPH_WIDTH + 1;
  const totalWidth = opts.text.length * advance * opts.scale;
  const totalHeight = GLYPH_HEIGHT * opts.scale;
  const rad = (opts.angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  for (let i = 0; i < opts.text.length; i += 1) {
    const rows = glyphRows(opts.text[i]!);
    if (!rows) continue;
    for (let gy = 0; gy < GLYPH_HEIGHT; gy += 1) {
      const row = rows[gy]!;
      for (let gx = 0; gx < GLYPH_WIDTH; gx += 1) {
        if ((row & (1 << (GLYPH_WIDTH - 1 - gx))) === 0) continue;
        // Local (unrotated) position relative to the string centre.
        const lx = i * advance * opts.scale + gx * opts.scale - totalWidth / 2;
        const ly = gy * opts.scale - totalHeight / 2;
        const rx = lx * cos - ly * sin;
        const ry = lx * sin + ly * cos;
        putBlock(img, opts.cx + rx, opts.cy + ry, opts.scale + 1, opts.color, opts.opacity);
      }
    }
  }
}

/**
 * C5a-3 PART C — FORMAT TOLERANCE.
 *
 * Providers may answer with PNG, JPEG or WebP `inlineData`. The mime the
 * provider declares is advisory; the MAGIC BYTES are the truth, so the format
 * is sniffed from the payload itself.
 *
 * DEPENDENCY VERDICT (G2): `pngjs` (PNG) and `jpeg-js` (JPEG, pure JS, ~120 KB,
 * zero native bindings) are both Worker-safe. NO pure-JS WebP decoder exists at
 * a comparable weight (every candidate ships a wasm/native payload — the same
 * class G2 already rejected for Photon), so WebP is NOT guessed at: it is
 * reported honestly with its sniffed mime so the caller can re-request.
 */
export type SniffedImageMime = "image/png" | "image/jpeg" | "image/webp" | "unknown";

export function sniffImageMime(bytes: Uint8Array): SniffedImageMime {
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  return "unknown";
}

export class UnsupportedImageFormatError extends Error {
  readonly mimeType: SniffedImageMime;
  constructor(mimeType: SniffedImageMime) {
    super(`unsupported image format from provider: ${mimeType}`);
    this.name = "UnsupportedImageFormatError";
    this.mimeType = mimeType;
  }
}

function decodeJpeg(bytes: Uint8Array): Raster {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const jpeg = require("jpeg-js") as {
    decode: (b: Buffer, o?: { useTArray?: boolean }) => {
      width: number;
      height: number;
      data: Uint8Array;
    };
  };
  const out = jpeg.decode(Buffer.from(bytes), { useTArray: true });
  return { width: out.width, height: out.height, data: new Uint8Array(out.data) };
}

/** Decodes by SNIFFED magic bytes; never by the provider's declared mime. */
export function decodeImage(bytes: Uint8Array): Raster {
  const mime = sniffImageMime(bytes);
  if (mime === "image/png") return decodePng(bytes);
  if (mime === "image/jpeg") return decodeJpeg(bytes);
  throw new UnsupportedImageFormatError(mime);
}
