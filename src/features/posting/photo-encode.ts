/**
 * U6-C1a — THE ON-DEVICE HALF OF THE PHOTO PIPELINE (spec §2 law 8, B2).
 *
 * THE ORIGINAL FILE NEVER LEAVES THE PHONE. A modern camera photo is 4–12 MB;
 * on an expensive-data Android connection uploading it would be the single most
 * costly act in the whole product. So the device does the expensive work:
 *
 *   1 DECODE with `imageOrientation: 'from-image'` — the EXIF rotation flag is
 *     APPLIED to the pixels here, which is the only place it can be: the server
 *     strip deletes EXIF wholesale (DEC-069), so a photo that arrived sideways
 *     with a rotation flag would stay sideways forever.
 *   2 RESIZE to four variants (D162 added the middle size), never UPSCALING (a small photo stays small —
 *     which is also why the 13-px policy fixture survives the pipeline intact),
 *     with the canvas's HIGH-QUALITY filter (INC-599): the default filter
 *     aliases a large downscale — thumbs measured at SSIM 0.70 against 0.95 —
 *     and the sharper picture is also the SMALLER file.
 *   3 ENCODE to WebP where the canvas supports it, at the qualities D157's judge
 *     chose (cover 0.82, card 0.84, thumb 0.82; the middle size, which the judge
 *     did not measure, at the cover's 0.82), else JPEG at 0.82.
 *
 * The four long edges sit UNDER the route's own caps (2000 / 1200 / 640 / 240),
 * so the device's output can never be refused for size by the server it is
 * aimed at. D162 (the operator, 2026-10-13): the gallery's photo is drawn from
 * the middle size (960 px), so the full size is fetched only for the
 * full-screen viewer.
 * Measured (D157, 15 photos of 1448 px): a photo came to about 236 KB in the
 * three sizes before the middle size, so ten photos came to about 2.4 MB; the
 * middle size adds ESTIMATE 50–120 KB a photo (not yet measured).
 *
 * This module is pure browser work: no dependency, no image library, and no
 * knowledge of the routes.
 */

export const EDGES = { cover: 1600, mid: 960, card: 480, thumb: 160 } as const;
const JPEG_QUALITY = 0.82;
/** D157 — the judge's verdict: the smallest quality with SSIM ≥ 0.95 on every photo. */
export const WEBP_QUALITY = { cover: 0.82, mid: 0.82, card: 0.84, thumb: 0.82 } as const;

export interface EncodedVariants {
  cover: Blob;
  /** D162 — the middle size, drawn in the gallery. */
  mid: Blob;
  card: Blob;
  thumb: Blob;
  /** The file extension the variants carry, for the multipart file names. */
  extension: "webp" | "jpg";
  /** The cover's dimensions after orientation and resize. */
  width: number;
  height: number;
}

/** Raised when the device cannot decode or encode the picked file. */
export class EncodeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EncodeError";
  }
}

let webpSupport: boolean | null = null;

/** Whether `canvas.toBlob('image/webp')` really produces WebP on this device. */
async function supportsWebp(): Promise<boolean> {
  if (webpSupport !== null) return webpSupport;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/webp", WEBP_QUALITY.cover);
    });
    // A browser that does not know WebP silently answers PNG, so the TYPE is
    // the only honest test — asking for the format is not getting it.
    webpSupport = blob !== null && blob.type === "image/webp";
  } catch {
    webpSupport = false;
  }
  return webpSupport;
}

function scaleTo(width: number, height: number, edge: number): { w: number; h: number } {
  const longest = Math.max(width, height);
  // NEVER upscale: a 13-px fixture and a genuinely tiny photo both pass through
  // unchanged rather than being invented into something larger.
  const scale = longest <= edge ? 1 : edge / longest;
  return {
    w: Math.max(1, Math.round(width * scale)),
    h: Math.max(1, Math.round(height * scale)),
  };
}

async function draw(
  bitmap: ImageBitmap,
  edge: number,
  mime: string,
  quality: number,
): Promise<{ blob: Blob; width: number; height: number }> {
  const { w, h } = scaleTo(bitmap.width, bitmap.height, edge);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const context = canvas.getContext("2d");
  if (!context) throw new EncodeError("no 2d context");
  // INC-599 — the high-quality filter: sharper and smaller than the default.
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, 0, 0, w, h);
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, mime, quality);
  });
  if (blob === null) throw new EncodeError(`the canvas produced no ${mime}`);
  return { blob, width: w, height: h };
}

/** The four variants the upload route takes, encoded on the device. */
export async function encodeVariants(file: File): Promise<EncodedVariants> {
  let bitmap: ImageBitmap;
  try {
    // The orientation flag is applied to the PIXELS here — see the header.
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch (error) {
    throw new EncodeError(
      `the device could not decode this file: ${error instanceof Error ? error.message : ""}`,
    );
  }
  return encodeBitmap(bitmap);
}
  return encodeBitmap(bitmap);
/**
 * D154 B2 — the four variants of a picture already decoded: a picked file's
 * (above), or a photo turned and cropped in the editor (photo-editor.tsx). The
 * same sizes and qualities either way, and the bitmap is closed when done.
 */
export async function encodeBitmap(bitmap: ImageBitmap): Promise<EncodedVariants> {
}

/**
 * D154 B2 — the four variants of a picture already decoded: a picked file's
 * (above), or a photo turned and cropped in the editor (photo-editor.tsx). The
 * same sizes and qualities either way, and the bitmap is closed when done.
 */
export async function encodeBitmap(bitmap: ImageBitmap): Promise<EncodedVariants> {
  try {
    const webp = await supportsWebp();
    const mime = webp ? "image/webp" : "image/jpeg";
    const quality = (variant: keyof typeof WEBP_QUALITY) =>
      webp ? WEBP_QUALITY[variant] : JPEG_QUALITY;

    const cover = await draw(bitmap, EDGES.cover, mime, quality("cover"));
    const mid = await draw(bitmap, EDGES.mid, mime, quality("mid"));
    const card = await draw(bitmap, EDGES.card, mime, quality("card"));
    const thumb = await draw(bitmap, EDGES.thumb, mime, quality("thumb"));

    return {
      cover: cover.blob,
      mid: mid.blob,
      card: card.blob,
      thumb: thumb.blob,
      extension: webp ? "webp" : "jpg",
      width: cover.width,
      height: cover.height,
    };
  } finally {
    // A bitmap holds decoded pixels; on a low-memory Android that matters.
    bitmap.close();
  }
}
