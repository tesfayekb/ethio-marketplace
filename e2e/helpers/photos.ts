import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";

import type { Page } from "@playwright/test";
import jpeg from "jpeg-js";
import { PNG } from "pngjs";

import { RUN, rand } from "./posting";
import { SCRATCH_PREFIXES } from "./scratch";
import { adminClient } from "./users";

/**
 * U6-B1 — THE PHOTO PIPELINE'S FIXTURES AND DB TRUTH (J1–J9).
 *
 * Every fixture is a committed file produced by a real encoder
 * (`scripts/fixtures/photos/make.ts`, I1) and is READ-ONLY here. Every assertion
 * about what was stored reads DB truth or the object itself through the service
 * client (J4) — never the page.
 *
 * The marker scan below is written INDEPENDENTLY of
 * `src/server/media/strip.ts`: REQ-036's deny-proof must not be able to pass by
 * agreeing with the implementation it is testing, so PP-1/PP-2 run both.
 */

export const BUCKET = "listing-photos";

const FIXTURES = join(dirname(new URL(import.meta.url).pathname), "../../scripts/fixtures/photos");

export type FixtureName = "gps.jpg" | "meta.png" | "meta.webp" | "marker-13px.jpg" | "notimage.pdf";

export function fixture(name: FixtureName): Buffer {
  return readFileSync(join(FIXTURES, name));
}

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  pdf: "application/pdf",
};

function part(name: FixtureName, as?: string) {
  const filename = as ?? name;
  const ext = filename.split(".").pop() ?? "jpg";
  return {
    name: filename,
    mimeType: MIME[ext] ?? "application/octet-stream",
    buffer: fixture(name),
  };
}

/**
 * D154 B3 — a plain JPEG of any size, made in memory by the fixture generator's
 * own encoder (`jpeg-js`, I1): fake mode warns `not_relevant` on a cover exactly
 * 17 px wide, which no committed fixture is.
 */
export function madeJpeg(width: number, height: number): Buffer {
  const data = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const at = (y * width + x) * 4;
      data[at] = Math.round((x / width) * 255);
      data[at + 1] = Math.round((y / height) * 255);
      data[at + 2] = 96;
      data[at + 3] = 255;
    }
  }
  return Buffer.from(jpeg.encode({ data, width, height }, 85).data);
}

/**
 * The pictures turn (INC-1121) — a category picture made in memory: a centred square motif at 85 %
 * of the height on white, as the category-image cutter draws one (category-image-variants.ts).
 */
export function madePng(width: number, height: number): Buffer {
  const png = new PNG({ width, height });
  const side = Math.round(height * 0.85);
  const left = Math.round((width - side) / 2);
  const top = Math.round((height - side) / 2);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const at = (y * width + x) * 4;
      const inside = x >= left && x < left + side && y >= top && y < top + side;
      png.data[at] = inside ? Math.round(((x - left) / side) * 255) : 255;
      png.data[at + 1] = inside ? 96 : 255;
      png.data[at + 2] = inside ? Math.round(((y - top) / side) * 255) : 255;
      png.data[at + 3] = 255;
    }
  }
  return PNG.sync.write(png);
}

export const CATEGORY_BUCKET = "category-assets";

/**
 * The pictures turn (INC-1121) — the stored variants of a photo of each shape, at the photo
 * encoder's sizes (the cover's long edge 1600, the middle 960, the card 480, the thumb 160), so a
 * ratio defect cannot hide behind uniform 4:3 photos.
 */
export const PHOTO_SHAPES = {
  portrait: { cover: [1200, 1600], mid: [720, 960], card: [360, 480], thumb: [120, 160] },
  landscape: { cover: [1600, 1200], mid: [960, 720], card: [480, 360], thumb: [160, 120] },
  square: { cover: [1600, 1600], mid: [960, 960], card: [480, 480], thumb: [160, 160] },
} as const;
export type PhotoShape = keyof typeof PHOTO_SHAPES;

/** The category pictures the scratch categories carry: the cutter's 4:3 card and a square (D122's old card). */
export const CATEGORY_PICTURE_SHAPES = {
  card: [640, 480],
  square: [512, 512],
} as const;
export type CategoryPictureShape = keyof typeof CATEGORY_PICTURE_SHAPES;

/**
 * Real stored pictures for the picture specs (J3: the caller's afterEach runs `cleanup`, which
 * removes every object this set uploaded): a photo row of a shape on an ad, a category picture of
 * a shape on a category.
 */
export function scratchPictures() {
  const uploaded: Array<{ bucket: string; key: string }> = [];

  async function upload(bucket: string, width: number, height: number, kind: "jpg" | "png") {
    const key = `${SCRATCH_PREFIXES.dash}${RUN}/pictures-${rand()}-${width}x${height}.${kind}`;
    const body = kind === "png" ? madePng(width, height) : madeJpeg(width, height);
    const answer = await adminClient()
      .storage.from(bucket)
      .upload(key, body, { contentType: kind === "png" ? "image/png" : "image/jpeg" });
    if (answer.error) throw new Error(`[e2e:pictures] upload failed: ${answer.error.message}`);
    uploaded.push({ bucket, key });
    return key;
  }

  /** A stored photo of `shape` on the ad at `displayOrder`, every variant its own object. */
  async function seedShapedPhoto(listingId: string, shape: PhotoShape, displayOrder = 0) {
    const sizes = PHOTO_SHAPES[shape];
    const paths: Record<string, { partition: string; key: string }> = {};
    for (const [variant, [width, height]] of Object.entries(sizes)) {
      paths[variant] = { partition: "default", key: await upload(BUCKET, width, height, "jpg") };
    }
    const inserted = await adminClient()
      .from("listing_photos")
      .insert({
        listing_id: listingId,
        storage_path: paths["cover"]?.key ?? "",
        display_order: displayOrder,
        exif_stripped: true,
        unscreened: false,
        width: sizes.cover[0],
        height: sizes.cover[1],
        paths,
      })
      .select("id")
      .single();
    if (inserted.error)
      throw new Error(`[e2e:pictures] photo row failed: ${inserted.error.message}`);
    return inserted.data.id as string;
  }

  /** A category picture of `shape`, stored publicly; answers its address. */
  async function categoryPicture(shape: CategoryPictureShape): Promise<string> {
    const [width, height] = CATEGORY_PICTURE_SHAPES[shape];
    const key = await upload(CATEGORY_BUCKET, width, height, "png");
    return adminClient().storage.from(CATEGORY_BUCKET).getPublicUrl(key).data.publicUrl;
  }

  /** Gives the category a picture of `shape` (`categories.image_url`); answers its address. */
  async function giveCategoryPicture(categoryId: string, shape: CategoryPictureShape) {
    const url = await categoryPicture(shape);
    const updated = await adminClient()
      .from("categories")
      .update({ image_url: url })
      .eq("id", categoryId);
    if (updated.error)
      throw new Error(`[e2e:pictures] picture link failed: ${updated.error.message}`);
    return url;
  }

  async function cleanup() {
    const byBucket = new Map<string, string[]>();
    for (const { bucket, key } of uploaded.splice(0))
      byBucket.set(bucket, [...(byBucket.get(bucket) ?? []), key]);
    for (const [bucket, keys] of byBucket) {
      const removed = await adminClient().storage.from(bucket).remove(keys);
      if (removed.error)
        throw new Error(`[e2e:pictures] picture reap failed: ${removed.error.message}`);
    }
  }

  return { seedShapedPhoto, categoryPicture, giveCategoryPicture, cleanup };
}

/** A cover named by its fixture, or made in memory at `made` = [width, height] (D154 B3). */
export type CoverSpec = { name: FixtureName; as?: string } | { made: [number, number] };

function coverPart(cover: CoverSpec) {
  return "made" in cover
    ? { name: "made.jpg", mimeType: "image/jpeg", buffer: madeJpeg(cover.made[0], cover.made[1]) }
    : part(cover.name, cover.as);
}

export interface UploadAnswer {
  status: number;
  payload: Record<string, unknown>;
}

/**
 * One multipart upload. A7 — this is the smoke proof for multipart through a
 * Start server route: Playwright sends a real `multipart/form-data` body and the
 * handler reads it with `request.formData()`.
 */
export async function uploadPhoto(
  page: Page,
  options: {
    listingId: string;
    token: string | null;
    cover: CoverSpec;
    card?: { name: FixtureName; as?: string };
    thumb?: { name: FixtureName; as?: string };
    /** D154 B2 — the stored photo this upload replaces (an edit); absent, a new photo. */
    replaces?: string;
    certified?: string[];
    language?: string;
  },
): Promise<UploadAnswer> {
  const headers: Record<string, string> = {};
  if (options.token) headers["Authorization"] = `Bearer ${options.token}`;
  const small: { name: FixtureName; as?: string } = { name: "marker-13px.jpg" };
  const response = await page.request.post("/api/upload/photo", {
    headers,
    multipart: {
      listingId: options.listingId,
      cover: coverPart(options.cover),
      card: part((options.card ?? small).name, (options.card ?? small).as),
      thumb: part((options.thumb ?? small).name, (options.thumb ?? small).as),
      ...(options.replaces === undefined ? {} : { replaces: options.replaces }),
      ...(options.certified === undefined ? {} : { certified: options.certified.join(",") }),
      ...(options.language === undefined ? {} : { language: options.language }),
    },
  });
  let payload: Record<string, unknown> = {};
  try {
    payload = (await response.json()) as Record<string, unknown>;
  } catch {
    payload = {};
  }
  return { status: response.status(), payload };
}

/** DELETE or cover, through the photo's own route. */
export async function photoAction(
  page: Page,
  photoId: string,
  verb: "delete" | "cover" | "move",
  token: string | null,
  /** D154 — `move` only: the place sent as `position` (any value, so a bad one can be tried). */
  position?: unknown,
): Promise<UploadAnswer> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const url = `/api/listings/photos/${photoId}`;
  const response =
    verb === "delete"
      ? await page.request.delete(url, { headers })
      : await page.request.post(url, {
          headers,
          data: verb === "move" ? { action: "move", position } : { action: "cover" },
        });
  let payload: Record<string, unknown> = {};
  try {
    payload = (await response.json()) as Record<string, unknown>;
  } catch {
    payload = {};
  }
  return { status: response.status(), payload };
}

/** The refusal reasons an answer carries, in order (structure, never English). */
export function reasons(payload: Record<string, unknown>): { field: string; reason: string }[] {
  const list = Array.isArray(payload["refusals"]) ? payload["refusals"] : [];
  return list.map((entry) => {
    const row = (entry ?? {}) as Record<string, unknown>;
    return { field: String(row["field"] ?? ""), reason: String(row["reason"] ?? "") };
  });
}

/* -------------------------------- DB truth -------------------------------- */

export interface PhotoRow {
  id: string;
  listing_id: string;
  storage_path: string;
  exif_stripped: boolean;
  width: number | null;
  height: number | null;
  bytes: number | null;
  paths: Record<string, unknown>;
}

export async function photoRowsOf(listingId: string): Promise<PhotoRow[]> {
  const { data, error } = await adminClient()
    .from("listing_photos")
    .select("id, listing_id, storage_path, exif_stripped, width, height, bytes, paths")
    .eq("listing_id", listingId)
    .order("display_order");
  if (error) throw new Error(`[e2e:b1] reading listing_photos failed: ${error.message}`);
  return (data ?? []) as unknown as PhotoRow[];
}

/** The stored key of one variant, out of the row's `paths` map. */
export function keyOf(row: PhotoRow, variant: "cover" | "card" | "thumb"): string {
  const entry = row.paths[variant];
  if (entry === null || typeof entry !== "object") {
    throw new Error(`[e2e:b1] the row carries no ${variant} path: ${JSON.stringify(row.paths)}`);
  }
  const key = (entry as Record<string, unknown>)["key"];
  if (typeof key !== "string" || key === "") {
    throw new Error(`[e2e:b1] the ${variant} path carries no key: ${JSON.stringify(entry)}`);
  }
  return key;
}

/** The object itself, pulled back out of storage as the service role. */
export async function downloadObject(key: string): Promise<Uint8Array> {
  const { data, error } = await adminClient().storage.from(BUCKET).download(key);
  if (error || !data) {
    throw new Error(`[e2e:b1] downloading ${key} failed: ${error?.message ?? "no body"}`);
  }
  return new Uint8Array(await data.arrayBuffer());
}

export async function objectExists(key: string): Promise<boolean> {
  const { error } = await adminClient().storage.from(BUCKET).download(key);
  return !error;
}

/* --------------------------- the independent scan -------------------------- */

/**
 * REQ-036's own eyes. Written from the FORMAT SPECIFICATIONS, not from the
 * strip module: the container names a camera or an editor writes, plus every
 * JPEG APPn marker other than a JFIF APP0.
 */
export const MARKER_NAMES = [
  "Exif",
  "http://ns.adobe.com/xap/1.0/",
  "ICC_PROFILE",
  "Photoshop 3.0",
  "XMP",
  "tEXt",
  "zTXt",
  "iTXt",
  "eXIf",
  "iCCP",
  "tIME",
  "EXIF",
  "ICCP",
] as const;

export interface ScanResult {
  found: string[];
  searched: readonly string[];
}

export function scanForMetadata(bytes: Uint8Array): ScanResult {
  const found: string[] = [];
  const haystack = Buffer.from(bytes).toString("latin1");
  for (const name of MARKER_NAMES) {
    if (haystack.includes(name)) found.push(name);
  }
  // JPEG: any surviving APPn segment other than a real JFIF APP0, and any COM.
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    let i = 2;
    while (i < bytes.length - 1 && bytes[i] === 0xff) {
      const marker = bytes[i + 1]!;
      if (marker === 0xd9 || marker === 0xda) break;
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        i += 2;
        continue;
      }
      const length = (bytes[i + 2]! << 8) | bytes[i + 3]!;
      const isJfif = marker === 0xe0 && haystack.slice(i + 4, i + 8) === "JFIF";
      if (marker >= 0xe0 && marker <= 0xef && !isJfif) found.push(`APP${marker - 0xe0}`);
      if (marker === 0xfe) found.push("COM");
      i += 2 + length;
    }
  }
  return { found, searched: MARKER_NAMES };
}

/* ------------------------------ the rate dial ----------------------------- */

/**
 * PP-9 — the ceiling, reached without a per-spec server env. The harness cannot
 * set `RATE_LIMIT_UPLOAD_PER_HOUR` for one spec without changing the runner's
 * own environment (out of this task's scope), so the seller's OWN counter is
 * driven to the default limit through the service client and the next upload is
 * the one that must be refused. Same law, same refusal, no shared state: the
 * counter's key is the scratch seller's id.
 */
export async function fillUploadCounter(userId: string, limit = 60): Promise<void> {
  const windowStart = new Date(Math.floor(Date.now() / 3_600_000) * 3_600_000).toISOString();
  const { error } = await adminClient()
    .from("rate_limits")
    .upsert(
      { key: userId, action: "upload", window_start: windowStart, count: limit },
      { onConflict: "key,action,window_start" },
    );
  if (error) throw new Error(`[e2e:b1] seeding the upload counter failed: ${error.message}`);
}

export async function clearUploadCounter(userId: string): Promise<void> {
  await adminClient().from("rate_limits").delete().eq("key", userId);
}

/** Every object key left under a listing's prefix — the orphan check. */
export async function objectsUnder(userId: string, listingId: string): Promise<string[]> {
  const prefix = `default/${userId}/${listingId}`;
  const supabase = adminClient();
  const { data: photoDirs, error } = await supabase.storage.from(BUCKET).list(prefix, {
    limit: 100,
  });
  if (error) throw new Error(`[e2e:b1] listing ${prefix} failed: ${error.message}`);
  const keys: string[] = [];
  for (const dir of photoDirs ?? []) {
    const { data: files } = await supabase.storage.from(BUCKET).list(`${prefix}/${dir.name}`, {
      limit: 100,
    });
    for (const file of files ?? []) keys.push(`${prefix}/${dir.name}/${file.name}`);
  }
  return keys;
}

/**
 * J3 — the scratch listing's objects, destroyed in the hook that survives a
 * timeout. Deleting the listing row cascades the photo rows; the objects are the
 * route's, so the fixture removes them itself.
 */
export async function purgeListingObjects(userId: string, listingId: string): Promise<void> {
  const keys = await objectsUnder(userId, listingId).catch(() => [] as string[]);
  if (keys.length === 0) return;
  await adminClient().storage.from(BUCKET).remove(keys);
}
