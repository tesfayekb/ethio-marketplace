/**
 * U6-B1 — THE STRIP (DEC-069, spec §2 law 8).
 *
 * A photo that reaches storage carries IMAGE DATA AND NOTHING ELSE. This module
 * is an ALLOWLIST RE-WRITER, not a sanitiser: it does not look for EXIF and
 * remove it, it rebuilds the file from the segments/chunks an image decoder
 * actually needs and discards everything else by construction. A metadata form
 * nobody has thought of yet is therefore already dropped.
 *
 * PURE, AND NO IMAGE LIBRARY (anti-pattern: no server-side encoder). The bytes
 * are copied, never re-encoded, so the image is bit-identical apart from the
 * removed containers — no quality loss, no CPU cost, no native dependency in a
 * Worker runtime.
 *
 * `assertStripped` is the module's own self-check: the law the strip claims,
 * asserted against the bytes it produced. REQ-036's deny-proof calls it, and
 * calls its own independent scan beside it.
 */

export type ImageFormat = "jpeg" | "png" | "webp";

export type StripFailure = "unsupportedFormat" | "corruptImage";

export class StripError extends Error {
  constructor(public readonly code: StripFailure) {
    super(code);
    this.name = "StripError";
  }
}

export interface StrippedImage {
  bytes: Uint8Array;
  format: ImageFormat;
  width: number;
  height: number;
}

/* --------------------------------- helpers -------------------------------- */

function ascii(bytes: Uint8Array, at: number, length: number): string {
  let out = "";
  for (let i = at; i < at + length && i < bytes.length; i += 1) {
    out += String.fromCharCode(bytes[i]!);
  }
  return out;
}

function startsWith(bytes: Uint8Array, values: number[]): boolean {
  if (bytes.length < values.length) return false;
  return values.every((value, index) => bytes[index] === value);
}

function concat(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let at = 0;
  for (const part of parts) {
    out.set(part, at);
    at += part.length;
  }
  return out;
}

export function detectFormat(bytes: Uint8Array): ImageFormat | null {
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return "jpeg";
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "png";
  if (bytes.length >= 12 && ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 4) === "WEBP") {
    return "webp";
  }
  return null;
}

/* ---------------------------------- JPEG ---------------------------------- */

/**
 * KEPT: SOI, APP0 when it is a real JFIF header, DQT, SOF0/1/2, DHT, DRI,
 * SOS + its entropy-coded data, EOI. DROPPED: every other APPn (APP1 Exif and
 * XMP, APP2 ICC, APP13 Photoshop/IPTC, APP14 Adobe), COM, and anything after
 * the final EOI (a favourite place to hide a payload).
 */
const JPEG_KEEP = new Set([0xdb, 0xc0, 0xc1, 0xc2, 0xc4, 0xdd]);

function stripJpeg(bytes: Uint8Array): StrippedImage {
  const parts: Uint8Array[] = [new Uint8Array([0xff, 0xd8])];
  let width = 0;
  let height = 0;
  let sawScan = false;
  let i = 2;

  while (i < bytes.length - 1) {
    if (bytes[i] !== 0xff) throw new StripError("corruptImage");
    let marker = bytes[i + 1]!;
    // Fill bytes: any number of 0xFF may pad a marker.
    while (marker === 0xff && i + 2 < bytes.length) {
      i += 1;
      marker = bytes[i + 1]!;
    }
    if (marker === 0xd9) break; // EOI — the rest of the file is not image data.
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2; // standalone marker, no payload
      continue;
    }
    if (i + 4 > bytes.length) throw new StripError("corruptImage");
    const segmentLength = (bytes[i + 2]! << 8) | bytes[i + 3]!;
    if (segmentLength < 2 || i + 2 + segmentLength > bytes.length) {
      throw new StripError("corruptImage");
    }
    const payloadAt = i + 4;
    const payloadLength = segmentLength - 2;

    if (marker >= 0xc0 && marker <= 0xc2) {
      if (payloadLength < 5) throw new StripError("corruptImage");
      height = (bytes[payloadAt + 1]! << 8) | bytes[payloadAt + 2]!;
      width = (bytes[payloadAt + 3]! << 8) | bytes[payloadAt + 4]!;
    }

    const isJfifApp0 = marker === 0xe0 && ascii(bytes, payloadAt, 5) === "JFIF\u0000";
    const keep = marker === 0xda || JPEG_KEEP.has(marker) || isJfifApp0;

    if (marker === 0xda) {
      sawScan = true;
      parts.push(bytes.subarray(i, i + 2 + segmentLength));
      // The entropy-coded data runs until a real marker: 0xFF00 is a stuffed
      // byte and 0xFFD0..D7 are restart markers, both part of the scan.
      let j = i + 2 + segmentLength;
      while (j < bytes.length - 1) {
        if (bytes[j] === 0xff) {
          const next = bytes[j + 1]!;
          if (next === 0x00 || next === 0xff || (next >= 0xd0 && next <= 0xd7)) {
            j += 2;
            continue;
          }
          break;
        }
        j += 1;
      }
      parts.push(bytes.subarray(i + 2 + segmentLength, j));
      i = j;
      continue;
    }

    if (keep) parts.push(bytes.subarray(i, i + 2 + segmentLength));
    i += 2 + segmentLength;
  }

  if (!sawScan || width === 0 || height === 0) throw new StripError("corruptImage");
  parts.push(new Uint8Array([0xff, 0xd9]));
  return { bytes: concat(parts), format: "jpeg", width, height };
}

/* ----------------------------------- PNG ---------------------------------- */

/**
 * KEPT: IHDR, PLTE, tRNS, gAMA, sRGB, IDAT, IEND — copied WHOLE, so every CRC
 * stays the one the encoder computed. DROPPED: tEXt, zTXt, iTXt, tIME, eXIf,
 * iCCP, pHYs and every other ancillary chunk, known or not.
 */
const PNG_KEEP = new Set(["IHDR", "PLTE", "tRNS", "gAMA", "sRGB", "IDAT", "IEND"]);

function stripPng(bytes: Uint8Array): StrippedImage {
  const parts: Uint8Array[] = [bytes.subarray(0, 8)];
  let width = 0;
  let height = 0;
  let i = 8;

  while (i + 8 <= bytes.length) {
    const length = (bytes[i]! << 24) | (bytes[i + 1]! << 16) | (bytes[i + 2]! << 8) | bytes[i + 3]!;
    if (length < 0 || i + 12 + length > bytes.length) throw new StripError("corruptImage");
    const type = ascii(bytes, i + 4, 4);
    if (type === "IHDR") {
      const at = i + 8;
      width = (bytes[at]! << 24) | (bytes[at + 1]! << 16) | (bytes[at + 2]! << 8) | bytes[at + 3]!;
      height =
        (bytes[at + 4]! << 24) | (bytes[at + 5]! << 16) | (bytes[at + 6]! << 8) | bytes[at + 7]!;
    }
    if (PNG_KEEP.has(type)) parts.push(bytes.subarray(i, i + 12 + length));
    i += 12 + length;
    if (type === "IEND") break;
  }

  if (width === 0 || height === 0) throw new StripError("corruptImage");
  return { bytes: concat(parts), format: "png", width, height };
}

/* ---------------------------------- WebP ---------------------------------- */

/**
 * KEPT: VP8 , VP8L, ALPH, and VP8X with its ICC/EXIF/XMP flag bits CLEARED (a
 * flag left standing would point a decoder at a chunk that is no longer there).
 * DROPPED: EXIF, XMP , ICCP. REFUSED: ANIM/ANMF — an animation is not a photo.
 */
const WEBP_KEEP = new Set(["VP8 ", "VP8L", "ALPH", "VP8X"]);
const VP8X_ICC = 0x20;
const VP8X_EXIF = 0x08;
const VP8X_XMP = 0x04;

function stripWebp(bytes: Uint8Array): StrippedImage {
  const chunks: Uint8Array[] = [];
  let width = 0;
  let height = 0;
  let i = 12;

  while (i + 8 <= bytes.length) {
    const type = ascii(bytes, i, 4);
    const size =
      bytes[i + 4]! | (bytes[i + 5]! << 8) | (bytes[i + 6]! << 16) | (bytes[i + 7]! << 24);
    if (size < 0 || i + 8 + size > bytes.length) throw new StripError("corruptImage");
    const payloadAt = i + 8;

    if (type === "ANIM" || type === "ANMF") throw new StripError("unsupportedFormat");

    if (type === "VP8X" && size >= 10) {
      const copy = bytes.slice(i, i + 8 + size + (size % 2));
      copy[8] = copy[8]! & ~(VP8X_ICC | VP8X_EXIF | VP8X_XMP);
      // Canvas size: 24-bit little-endian (value - 1), at payload offset 4/7.
      width =
        1 + (bytes[payloadAt + 4]! | (bytes[payloadAt + 5]! << 8) | (bytes[payloadAt + 6]! << 16));
      height =
        1 + (bytes[payloadAt + 7]! | (bytes[payloadAt + 8]! << 8) | (bytes[payloadAt + 9]! << 16));
      chunks.push(copy);
      i += 8 + size + (size % 2);
      continue;
    }

    if (type === "VP8 " && size >= 10 && width === 0) {
      // Lossy keyframe header: 3-byte frame tag, the 0x9D012A sync code, then
      // 14-bit width and height.
      width = (bytes[payloadAt + 6]! | (bytes[payloadAt + 7]! << 8)) & 0x3fff;
      height = (bytes[payloadAt + 8]! | (bytes[payloadAt + 9]! << 8)) & 0x3fff;
    }

    if (type === "VP8L" && size >= 5 && width === 0) {
      const b = bytes;
      const bits =
        b[payloadAt + 1]! |
        (b[payloadAt + 2]! << 8) |
        (b[payloadAt + 3]! << 16) |
        (b[payloadAt + 4]! << 24);
      width = (bits & 0x3fff) + 1;
      height = ((bits >>> 14) & 0x3fff) + 1;
    }

    if (WEBP_KEEP.has(type)) chunks.push(bytes.subarray(i, i + 8 + size + (size % 2)));
    i += 8 + size + (size % 2);
  }

  if (chunks.length === 0 || width === 0 || height === 0) throw new StripError("corruptImage");
  const body = concat(chunks);
  const header = new Uint8Array(12);
  header.set([0x52, 0x49, 0x46, 0x46], 0); // "RIFF"
  const riffSize = body.length + 4;
  header[4] = riffSize & 0xff;
  header[5] = (riffSize >>> 8) & 0xff;
  header[6] = (riffSize >>> 16) & 0xff;
  header[7] = (riffSize >>> 24) & 0xff;
  header.set([0x57, 0x45, 0x42, 0x50], 8); // "WEBP"
  return { bytes: concat([header, body]), format: "webp", width, height };
}

/* ---------------------------------- entry --------------------------------- */

export function stripImage(bytes: Uint8Array): StrippedImage {
  const format = detectFormat(bytes);
  if (format === null) throw new StripError("unsupportedFormat");
  if (format === "jpeg") return stripJpeg(bytes);
  if (format === "png") return stripPng(bytes);
  return stripWebp(bytes);
}

/* ------------------------------- self-check ------------------------------- */

/** The metadata containers that must not survive, by their on-the-wire names. */
const FORBIDDEN_NAMES = [
  "Exif\u0000\u0000",
  "http://ns.adobe.com/xap/1.0/",
  "ICC_PROFILE",
  "Photoshop 3.0",
  "tEXt",
  "zTXt",
  "iTXt",
  "iCCP",
  "eXIf",
  "tIME",
  "pHYs",
  "EXIF",
  "XMP ",
  "ICCP",
];

function indexOfAscii(bytes: Uint8Array, needle: string): number {
  const first = needle.charCodeAt(0);
  outer: for (let i = 0; i + needle.length <= bytes.length; i += 1) {
    if (bytes[i] !== first) continue;
    for (let j = 1; j < needle.length; j += 1) {
      if (bytes[i + j] !== needle.charCodeAt(j)) continue outer;
    }
    return i;
  }
  return -1;
}

export interface StripAudit {
  clean: boolean;
  /** The marker names actually found — empty when the strip held. */
  found: string[];
}

/**
 * THE LAW, ASSERTED. Walks the JPEG segment chain for a surviving APPn other
 * than a JFIF APP0, and scans the whole buffer for the container names above.
 * The route calls it before it stores a byte; PP-1/PP-2 call it again on what
 * came back out of storage.
 */
export function assertStripped(bytes: Uint8Array): StripAudit {
  const found: string[] = [];

  if (detectFormat(bytes) === "jpeg") {
    let i = 2;
    while (i < bytes.length - 1 && bytes[i] === 0xff) {
      const marker = bytes[i + 1]!;
      if (marker === 0xd9 || marker === 0xda) break;
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        i += 2;
        continue;
      }
      const segmentLength = (bytes[i + 2]! << 8) | bytes[i + 3]!;
      const isJfifApp0 = marker === 0xe0 && ascii(bytes, i + 4, 5) === "JFIF\u0000";
      if (marker >= 0xe0 && marker <= 0xef && !isJfifApp0) found.push(`APP${marker - 0xe0}`);
      if (marker === 0xfe) found.push("COM");
      i += 2 + segmentLength;
    }
  }

  for (const name of FORBIDDEN_NAMES) {
    if (indexOfAscii(bytes, name) !== -1) found.push(name.replace(/\u0000/g, ""));
  }

  return { clean: found.length === 0, found };
}

/** The names `assertStripped` looks for, so a test can report what it searched. */
export const STRIP_MARKER_NAMES: readonly string[] = FORBIDDEN_NAMES.map((name) =>
  name.replace(/\u0000/g, ""),
);
