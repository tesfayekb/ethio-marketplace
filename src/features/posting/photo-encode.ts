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
 *   2 RESIZE to three variants, never UPSCALING (a small photo stays small —
 *     which is also why the 13-px policy fixture survives the pipeline intact).
 *   3 ENCODE to WebP where the canvas supports it, else JPEG at 0.82.
 *
 * The three long edges sit UNDER the route's own caps (2000 / 640 / 240), so the
 * device's output can never be refused for size by the server it is aimed at.
 * Ten photos come to roughly 2–3 MB in total.
 *
 * This module is pure browser work: no dependency, no image library, and no
 * knowledge of the routes.
 */

export const EDGES = { cover: 1600, card: 480, thumb: 160 } as const;
const JPEG_QUALITY = 0.82;
const WEBP_QUALITY = 0.82;

export interface EncodedVariants {
  cover: Blob;
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
      canvas.toBlob(resolve, "image/webp", WEBP_QUALITY);
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
  context.drawImage(bitmap, 0, 0, w, h);
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, mime, quality);
  });
  if (blob === null) throw new EncodeError(`the canvas produced no ${mime}`);
  return { blob, width: w, height: h };
}

/** The three variants the upload route expects, encoded on the device. */
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

  try {
    const webp = await supportsWebp();
    const mime = webp ? "image/webp" : "image/jpeg";
    const quality = webp ? WEBP_QUALITY : JPEG_QUALITY;

    const cover = await draw(bitmap, EDGES.cover, mime, quality);
    const card = await draw(bitmap, EDGES.card, mime, quality);
    const thumb = await draw(bitmap, EDGES.thumb, mime, quality);

    return {
      cover: cover.blob,
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
