/**
 * INC-588 / D151 — A STORED PHOTO'S LINK.
 *
 * The upload route stores every variant as `{ partition, key }` (never a URL),
 * and the photo bucket is private, so the readers kept a variant only when it
 * was a string and every stored photo read as "no photo". A reader now asks
 * /api/media/photo-links for links that expire (the operator's choice of
 * 2026-10-13, D151) and draws the first variant of its own order that came
 * back. No link — not loaded yet, not readable, not signed — is null: the
 * category's picture, never a broken image.
 */

/** `{ [photoId]: { [variant]: link } }`, as the route answers. */
export type PhotoLinks = Readonly<Record<string, Readonly<Record<string, string>>>>;

/** The variants each reader prefers, in order. */
export const CARD_FIRST = ["card", "cover", "thumb"] as const;
export const CARD_THEN_THUMB = ["card", "thumb", "cover"] as const;

export function photoUrl(
  row: { id: string },
  order: readonly string[],
  links: PhotoLinks | undefined,
): string | null {
  const variants = links?.[row.id];
  if (variants === undefined) return null;
  for (const variant of order) {
    const link = variants[variant];
    if (typeof link === "string" && link.startsWith("https://")) return link;
  }
  return null;
}

/** The route's `links`, kept only where every level has the shape it promises. */
export function linksOf(payload: Record<string, unknown>): PhotoLinks {
  const raw = payload["links"];
  const out: Record<string, Record<string, string>> = {};
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return out;
  for (const [photoId, variants] of Object.entries(raw as Record<string, unknown>)) {
    if (variants === null || typeof variants !== "object" || Array.isArray(variants)) continue;
    const kept: Record<string, string> = {};
    for (const [variant, link] of Object.entries(variants as Record<string, unknown>)) {
      if (typeof link === "string" && link.startsWith("https://")) kept[variant] = link;
    }
    if (Object.keys(kept).length > 0) out[photoId] = kept;
  }
  return out;
}

/**
 * D161 — a gallery photo: the card size drawn in the page, the cover size for
 * a sharp page on a dense screen and for the full-screen viewer, and the thumb
 * size for the thumbnails. Every link passes `photoUrl`, so a photo with no
 * https link at any size is left out — never a broken image.
 */
export interface GalleryPhoto {
  id: string;
  /** The card size (480 px), drawn in the page; the cover or the thumb when it is missing. */
  main: string;
  /** The cover size (up to 1600 px); null when absent. */
  large: string | null;
  /** The thumb size (160 px); the main link when it is missing. */
  thumb: string;
}

export function galleryPhotos(
  rows: readonly { id: string }[],
  links: PhotoLinks | undefined,
): GalleryPhoto[] {
  return rows.flatMap((row) => {
    const main = photoUrl(row, CARD_FIRST, links);
    if (main === null) return [];
    return [
      {
        id: row.id,
        main,
        large: photoUrl(row, ["cover"], links),
        thumb: photoUrl(row, ["thumb"], links) ?? main,
      },
    ];
  });
}
