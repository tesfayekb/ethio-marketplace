/**
 * U6-B1 — THE PHOTO FIXTURE GENERATOR (I1: produced by a real encoder).
 *
 *   bun run scripts/fixtures/photos/make.ts
 *
 * The IMAGE DATA in every fixture comes from a real encoder — `jpeg-js` for
 * JPEG, `pngjs` for PNG, `libwebp` through the installed `ffmpeg` for WebP — and
 * never from hand-authored pixel bytes. Only the METADATA CONTAINERS the strip
 * must remove are constructed here, programmatically and reproducibly, because
 * that is exactly what the deny-proof needs to see disappear.
 *
 * OUTPUTS (committed next to this file):
 *   gps.jpg          a real JPEG carrying an APP1 Exif block with GPS tags,
 *                    a second APP1 holding XMP, and an APP2 ICC_PROFILE
 *   meta.png         a real PNG carrying tEXt, eXIf and iCCP chunks
 *   meta.webp        a real WebP carrying EXIF and XMP chunks
 *   marker-13px.jpg  a real JPEG exactly 13 px wide — the policy fake's marker
 *   notimage.pdf     a real one-page PDF, for the format refusal
 *
 * No fixture is an animation and none is larger than the route's caps, so each
 * one exercises exactly the law its test names.
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";

import jpeg from "jpeg-js";
import { PNG } from "pngjs";

const OUT = dirname(new URL(import.meta.url).pathname);
mkdirSync(OUT, { recursive: true });

/* ------------------------------- raw pixels ------------------------------- */

/** A deterministic gradient — real pixels, so a real encoder has real work. */
function pixels(width: number, height: number): Buffer {
  const data = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const at = (y * width + x) * 4;
      data[at] = (x * 7) % 256;
      data[at + 1] = (y * 11) % 256;
      data[at + 2] = ((x + y) * 3) % 256;
      data[at + 3] = 255;
    }
  }
  return data;
}

/* --------------------------- JPEG metadata blocks -------------------------- */

function app(marker: number, payload: Buffer): Buffer {
  const length = payload.length + 2;
  return Buffer.concat([Buffer.from([0xff, marker, (length >> 8) & 0xff, length & 0xff]), payload]);
}

/** A little-endian TIFF holding an IFD0 with a GPS IFD carrying real GPS tags. */
function exifPayload(): Buffer {
  const tiff = Buffer.alloc(0x100);
  let at = 0;
  const u16 = (v: number) => {
    tiff.writeUInt16LE(v, at);
    at += 2;
  };
  const u32 = (v: number) => {
    tiff.writeUInt32LE(v, at);
    at += 4;
  };
  u16(0x4949); // "II"
  u16(0x002a);
  u32(8); // IFD0 offset
  // IFD0: one entry, the GPS IFD pointer.
  u16(1);
  u16(0x8825); // GPSInfo
  u16(4); // LONG
  u32(1);
  u32(26); // GPS IFD offset
  u32(0); // no next IFD
  // GPS IFD at 26: three entries.
  at = 26;
  u16(3);
  u16(0x0001); // GPSLatitudeRef
  u16(2); // ASCII
  u32(2);
  tiff.write("N\u0000", at, "latin1");
  at += 4;
  u16(0x0002); // GPSLatitude (3 rationals)
  u16(5);
  u32(3);
  u32(80); // offset of the rationals
  u16(0x0003); // GPSLongitudeRef
  u16(2);
  u32(2);
  tiff.write("E\u0000", at, "latin1");
  at += 4;
  u32(0); // no next IFD
  // 9°1'48" — Addis Ababa, which is precisely the fact that must not survive.
  at = 80;
  for (const [num, den] of [
    [9, 1],
    [1, 1],
    [48, 1],
  ]) {
    u32(num!);
    u32(den!);
  }
  return Buffer.concat([Buffer.from("Exif\u0000\u0000", "latin1"), tiff.subarray(0, 104)]);
}

const XMP_PAYLOAD = Buffer.from(
  `http://ns.adobe.com/xap/1.0/\u0000<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?><x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/" dc:creator="e2e fixture"/></rdf:RDF></x:xmpmeta><?xpacket end="w"?>`,
  "latin1",
);

/** An ICC_PROFILE APP2 with a real 128-byte profile header shape. */
function iccPayload(): Buffer {
  const profile = Buffer.alloc(132);
  profile.writeUInt32BE(profile.length, 0);
  profile.write("ADBE", 4, "latin1");
  profile.write("mntrRGB XYZ ", 12, "latin1");
  profile.write("acsp", 36, "latin1");
  return Buffer.concat([Buffer.from("ICC_PROFILE\u0000", "latin1"), Buffer.from([1, 1]), profile]);
}

/** Insert the metadata segments straight after the encoder's SOI + APP0. */
function injectJpegMetadata(encoded: Buffer): Buffer {
  // The encoder emits SOI then APP0 (JFIF); the new segments go after it, which
  // is exactly where a camera puts them.
  const app0Length = encoded.readUInt16BE(4);
  const head = encoded.subarray(0, 4 + app0Length - 2 + 2);
  const tail = encoded.subarray(head.length);
  return Buffer.concat([
    head,
    app(0xe1, exifPayload()),
    app(0xe1, XMP_PAYLOAD),
    app(0xe2, iccPayload()),
    app(0xfe, Buffer.from("e2e fixture comment", "latin1")),
    tail,
  ]);
}

function writeJpeg(name: string, width: number, height: number, withMetadata: boolean): void {
  const encoded = Buffer.from(jpeg.encode({ data: pixels(width, height), width, height }, 82).data);
  const out = withMetadata ? injectJpegMetadata(encoded) : encoded;
  writeFileSync(join(OUT, name), out);
  console.log(`${name}: ${out.length} bytes, ${width}x${height}`);
}

/* ---------------------------- PNG metadata chunks -------------------------- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(bytes: Buffer): number {
  let c = 0xffffffff;
  for (const byte of bytes) c = CRC_TABLE[(c ^ byte) & 0xff]! ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type: string, data: Buffer): Buffer {
  const head = Buffer.alloc(4);
  head.writeUInt32BE(data.length, 0);
  const typed = Buffer.concat([Buffer.from(type, "latin1"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typed), 0);
  return Buffer.concat([head, typed, crc]);
}

function writePng(name: string, width: number, height: number): void {
  const png = new PNG({ width, height });
  pixels(width, height).copy(png.data);
  const encoded = PNG.sync.write(png);
  // The encoder emits signature + IHDR first; the ancillary chunks follow it.
  const ihdrEnd = 8 + 12 + encoded.readUInt32BE(8);
  const extras = Buffer.concat([
    pngChunk("tEXt", Buffer.from("Comment\u0000e2e fixture", "latin1")),
    pngChunk("eXIf", exifPayload().subarray(6)),
    pngChunk("iCCP", Buffer.concat([Buffer.from("e2e\u0000\u0000", "latin1"), iccPayload()])),
  ]);
  const out = Buffer.concat([encoded.subarray(0, ihdrEnd), extras, encoded.subarray(ihdrEnd)]);
  writeFileSync(join(OUT, name), out);
  console.log(`${name}: ${out.length} bytes, ${width}x${height}`);
}

/* --------------------------- WebP metadata chunks -------------------------- */

function riffChunk(type: string, data: Buffer): Buffer {
  const head = Buffer.alloc(8);
  head.write(type, 0, "latin1");
  head.writeUInt32LE(data.length, 4);
  const pad = data.length % 2 === 1 ? Buffer.from([0]) : Buffer.alloc(0);
  return Buffer.concat([head, data, pad]);
}

function writeWebp(name: string, width: number, height: number): void {
  // libwebp through the installed ffmpeg — a real encoder, never authored bytes.
  const source = join(OUT, ".tmp-source.png");
  const encodedPath = join(OUT, ".tmp-encoded.webp");
  const png = new PNG({ width, height });
  pixels(width, height).copy(png.data);
  writeFileSync(source, PNG.sync.write(png));
  execFileSync("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    "-i",
    source,
    "-c:v",
    "libwebp",
    encodedPath,
  ]);
  const encoded = readFileSync(encodedPath);
  rmSync(source);
  rmSync(encodedPath);

  const body = Buffer.concat([
    encoded.subarray(12),
    riffChunk("EXIF", exifPayload().subarray(6)),
    riffChunk("XMP ", XMP_PAYLOAD.subarray(29)),
    riffChunk("ICCP", iccPayload().subarray(14)),
  ]);
  const header = Buffer.alloc(12);
  header.write("RIFF", 0, "latin1");
  header.writeUInt32LE(body.length + 4, 4);
  header.write("WEBP", 8, "latin1");
  const out = Buffer.concat([header, body]);
  writeFileSync(join(OUT, name), out);
  console.log(`${name}: ${out.length} bytes, ${width}x${height}`);
}

/* ----------------------------------- PDF ---------------------------------- */

function writePdf(name: string): void {
  const body = [
    "%PDF-1.4",
    "1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj",
    "2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj",
    "3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 99 99]>>endobj",
    "trailer<</Root 1 0 R>>",
    "%%EOF",
    "",
  ].join("\n");
  writeFileSync(join(OUT, name), Buffer.from(body, "latin1"));
  console.log(`${name}: ${body.length} bytes`);
}

/* ---------------------------------- build --------------------------------- */

writeJpeg("gps.jpg", 800, 600, true);
writeJpeg("marker-13px.jpg", 13, 13, false);
writePng("meta.png", 320, 240);
writeWebp("meta.webp", 320, 240);
writePdf("notimage.pdf");
