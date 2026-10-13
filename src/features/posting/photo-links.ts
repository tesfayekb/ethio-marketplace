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
