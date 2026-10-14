import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { readLinks, type Partition } from "./storage";

/**
 * INC-588 / D151 — WHO GETS A PHOTO'S LINK, AND FOR HOW LONG.
 *
 * The upload route stores every variant as `{ partition, key }` in
 * `listing_photos.paths`, never a URL, and the `listing-photos` bucket is
 * private (the operator's choice of 2026-10-13: links that expire, D151). A
 * reader therefore asks for links: the CALLER's own client reads the photo
 * rows first, so `listing_photos`' policies decide whose rows come back — the
 * seller's own (`listing_photos_seller_read`), staff who may view listings
 * (`listing_photos_admin_read`), and anyone for an active listing's stripped
 * photos (`listing_photos_public_read`) — and only then does the service
 * client sign the keys of the rows that came back. Nobody is shown a photo
 * they could not already read; only stripped rows are signed, as the
 * bucket's own public rule requires.
 */

/** One hour: a page left open longer asks again (the client refreshes at 45 minutes). */
export const PHOTO_LINK_SECONDS = 3600;

/**
 * The variants a reader may draw. `original` is the cover's key under its legacy name.
 * D162 adds the middle size (`mid`, 960 px), which photos stored before it lack.
 */
export const READ_VARIANTS = ["card", "thumb", "mid", "cover"] as const;

/** A request names at most this many photos (a listing holds at most ten). */
export const MAX_LINK_PHOTOS = 30;

const PARTITIONS: readonly Partition[] = ["default"];

export interface PhotoRowForLinks {
  id: string;
  paths: unknown;
  exif_stripped: boolean | null;
}

export interface VariantRef {
  variant: string;
  partition: Partition;
  key: string;
}

/** The signable variants of one stored photo; a bare string or an unknown partition is skipped. */
export function variantRefs(paths: unknown): VariantRef[] {
  if (paths === null || typeof paths !== "object" || Array.isArray(paths)) return [];
  const record = paths as Record<string, unknown>;
  const refs: VariantRef[] = [];
  for (const variant of READ_VARIANTS) {
    const ref = record[variant];
    if (ref === null || typeof ref !== "object") continue;
    const { partition, key } = ref as { partition?: unknown; key?: unknown };
    if (typeof key !== "string" || key === "") continue;
    const known = PARTITIONS.find((name) => name === partition);
    if (known === undefined) continue;
    refs.push({ variant, partition: known, key });
  }
  return refs;
}

/**
 * INC-606 — the variants a request asks for (`["card", "thumb"]` for a listing
 * card), or every readable variant when it names none. Null for a malformed list.
 */
export function variantsOf(raw: unknown): readonly string[] | null {
  if (raw === undefined) return READ_VARIANTS;
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const known = new Set<string>(READ_VARIANTS);
  if (!raw.every((variant) => typeof variant === "string" && known.has(variant))) return null;
  return [...new Set(raw as string[])];
}

/** The photo ids of a request body: strings only, each once, at most MAX_LINK_PHOTOS. */
export function photoIdsOf(raw: unknown): string[] | null {
  if (!Array.isArray(raw)) return null;
  const ids = [...new Set(raw.filter((id): id is string => typeof id === "string" && id !== ""))];
  if (ids.length === 0 || ids.length > MAX_LINK_PHOTOS) return null;
  return ids;
}

/**
 * Signs every readable variant of the given rows: `{ [photoId]: { [variant]: link } }`.
 * Rows not stripped are left out; a photo with no signable variant is absent.
 */
export async function signPhotoRows(
  service: SupabaseClient<Database>,
  rows: PhotoRowForLinks[],
  variants: readonly string[] = READ_VARIANTS,
): Promise<Record<string, Record<string, string>>> {
  const wanted = rows
    .filter((row) => row.exif_stripped === true)
    .map((row) => ({
      id: row.id,
      refs: variantRefs(row.paths).filter((ref) => variants.includes(ref.variant)),
    }));
  const out: Record<string, Record<string, string>> = {};
  for (const partition of PARTITIONS) {
    const keys = wanted.flatMap((row) =>
      row.refs.filter((ref) => ref.partition === partition).map((ref) => ref.key),
    );
    const links = await readLinks(service, partition, [...new Set(keys)], PHOTO_LINK_SECONDS);
    for (const row of wanted) {
      for (const ref of row.refs) {
        const link = ref.partition === partition ? links.get(ref.key) : undefined;
        if (link === undefined) continue;
        out[row.id] = { ...(out[row.id] ?? {}), [ref.variant]: link };
      }
    }
  }
  return out;
}
