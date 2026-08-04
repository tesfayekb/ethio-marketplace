/**
 * Feed ordering — the pure, testable heart of the Marketplace feed.
 *
 * v1 order:
 *   1. tier_rank ASC   — premium < featured < regular   (LIVE, real column)
 *   2. view_count ASC  — least-viewed first, for fair reach  (SEAM, see below)
 *   3. published_at DESC — newest wins the tiebreak
 *
 * SEAM 1 — view_count:
 *   public.listings has no view_count column yet; view tracking is a separate
 *   pre-launch backend feature. Every listing therefore reports 0 here and the
 *   ascending-view sort, while LIVE in this function, is presently a no-op.
 *   When the column lands, populate `viewCount` in the fetch layer and this
 *   function starts discriminating with no change to its logic.
 *
 * SEAM 2 — location scope:
 *   `ctx.locationScope` is presently the placeholder 'all-active'. The
 *   city -> region -> country -> world auto-widening is a separate pre-launch
 *   backend feature. This function ACCEPTS the scope but does not narrow by it.
 *
 * Tier is NOT a seam: listings.tier is a real column (premium = admin-granted
 * promo, featured = user self-serve, regular = default; all free in v1).
 */

export type ListingTier = "premium" | "featured" | "regular";

/** Lower sorts first. */
export const TIER_RANK: Record<ListingTier, number> = {
  premium: 0,
  featured: 1,
  regular: 2,
};

export interface RankableListing {
  id: string;
  tier: ListingTier;
  /** SEAM 1: always 0 until view tracking ships. */
  viewCount: number;
  publishedAt: string | null;
}

/** SEAM 2: widening scopes land with the location-scoping feature. */
export type LocationScope = "all-active" | "city" | "region" | "country" | "world";

export interface RankingContext {
  locationScope: LocationScope;
}

export function rankListings<T extends RankableListing>(
  listings: readonly T[],
  _ctx: RankingContext,
): T[] {
  // SEAM 2: _ctx.locationScope is accepted and deliberately not applied yet.
  return [...listings].sort((a, b) => {
    const byTier = TIER_RANK[a.tier] - TIER_RANK[b.tier];
    if (byTier !== 0) return byTier;

    const byViews = a.viewCount - b.viewCount; // SEAM 1: 0 - 0 today.
    if (byViews !== 0) return byViews;

    const at = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bt = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bt - at;
  });
}
