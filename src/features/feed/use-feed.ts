import { useCallback, useEffect, useMemo, useState } from "react";

import { rootsOf, useCategoryTree } from "@/features/categories/category-tree";
import { supabase } from "@/integrations/supabase/client";

import {
  rankListings,
  type ListingTier,
  type LocationScope,
  type RankableListing,
} from "./ranking";

/** One card's worth of listing data. READ ONLY — this feature never writes. */
export interface FeedListing extends RankableListing {
  title: string;
  priceAmount: number | null;
  priceCurrency: string | null;
  priceMode: string;
  /** U4d: the id is what the entity bundle is keyed by. */
  locationId: string | null;
  locationNameEn: string | null;
  locationNameAm: string | null;
  categoryId: string;
}

export interface UseFeedOptions {
  /** Narrow to one category (set by the rail). */
  categoryId?: string | null;
  /** SEAM: accepted, not yet applied — see ranking.ts. */
  locationScope?: LocationScope;
  /**
   * SEAM: the concrete area chosen in the shell's location row
   * (public.locations.id). Accepted and threaded through the same query pass
   * as categoryId — so the two-dimensional filter (area x category) is
   * structurally ready — but deliberately NOT applied: narrowing by location
   * is the pre-launch location-scoping feature
   * (docs/features/location-scoping.md).
   */
  locationNodeId?: string | null;
}

type ListingRow = {
  id: string;
  title: string;
  price_amount: number | null;
  price_currency: string | null;
  price_mode: string;
  tier: string;
  published_at: string | null;
  category_id: string;
  locations: { id: string; name_en: string | null; name_am: string | null } | null;
};

function toFeedListing(row: ListingRow): FeedListing {
  return {
    id: row.id,
    title: row.title,
    tier: (["premium", "featured", "regular"].includes(row.tier)
      ? row.tier
      : "regular") as ListingTier,
    // SEAM: view tracking is a separate pre-launch feature; no column yet.
    viewCount: 0,
    publishedAt: row.published_at,
    priceAmount: row.price_amount,
    priceCurrency: row.price_currency,
    priceMode: row.price_mode,
    locationId: row.locations?.id ?? null,
    locationNameEn: row.locations?.name_en ?? null,
    locationNameAm: row.locations?.name_am ?? null,
    categoryId: row.category_id,
  };
}

/**
 * Active listings for the Marketplace feed, ranked by the v1 ordering.
 * RLS already restricts the public read to status = 'active'; the explicit
 * filter here keeps the intent visible and lets the feed index be used.
 */
export function useFeed({
  categoryId = null,
  locationScope = "all-active",
  locationNodeId = null,
}: UseFeedOptions = {}) {
  const [listings, setListings] = useState<FeedListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [reloadToken, setReloadToken] = useState(0);

  const retry = useCallback(() => setReloadToken((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    // INC-017 discipline: the busy state engages on initiation, not on response.
    setIsLoading(true);
    setError(false);

    let query = supabase
      .from("listings")
      .select(
        "id,title,price_amount,price_currency,price_mode,tier,published_at,category_id,locations(id,name_en,name_am)",
      )
      .eq("status", "active");

    // AXIS 1 — category: LIVE.
    if (categoryId) query = query.eq("category_id", categoryId);
    // AXIS 2 — location: STUBBED. The .eq("location_id", locationNodeId) that
    // belongs here (plus the city -> region -> country -> world widening ladder)
    // lands with the location-scoping feature. Referenced so the seam is real
    // and the hook re-runs when the area changes.
    void locationNodeId;

    // CONTAINMENT (INC-031): this feature's data errors — a missing column on a
    // database that has not yet received a migration, a network failure, an RLS
    // refusal — resolve to a VISIBLE in-panel error state. Nothing throws past
    // this hook, so a feed-level backend gap can never again cascade through the
    // shell-wrapped root and take down unrelated routes (auth, settings).
    // This is containment, NOT catch-and-hide (law F4): `error` is surfaced.
    void Promise.resolve(query)
      .then(({ data, error: queryError }) => {
        if (cancelled) return;
        if (queryError) {
          // Law F4: no phantom success — a failed read surfaces as an error state.
          setError(true);
          setListings([]);
          setIsLoading(false);
          return;
        }
        const rows = (data ?? []) as unknown as ListingRow[];
        setListings(rankListings(rows.map(toFeedListing), { locationScope }));
        setIsLoading(false);
      })
      .catch(() => {
        // A rejected promise (transport-level) is the same honest failure.
        if (cancelled) return;
        setError(true);
        setListings([]);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categoryId, locationScope, locationNodeId, reloadToken]);

  return { listings, isLoading, error, retry };
}

export interface FeedCategory {
  id: string;
  nameEn: string;
  nameAm: string | null;
  slug: string;
  /** C5i — the stored lucide glyph name; the rail renders it. */
  icon: string | null;
}

/**
 * Live top-level categories for the Marketplace rail.
 * Top level = a category that is not the child of any tree pointer.
 *
 * U6-C1a — THE READ MOVED, THE BEHAVIOUR DID NOT. The `categories` +
 * `category_tree_pointers` pair (and its process-lifetime cache, INC-050) now
 * lives in `@/features/categories/category-tree`, because the posting wizard
 * reads the same two tables and a second copy would be two sources of truth
 * (B1/B2). This hook keeps its name, its shape and its containment law
 * (INC-031: a failed read degrades to "no categories", it never throws through
 * the shell); it now derives the roots from the shared tree instead of
 * filtering the pointer set itself.
 */
export function useCategories() {
  const { tree, isLoading } = useCategoryTree();
  const categories = useMemo<FeedCategory[]>(
    () =>
      rootsOf(tree).map((node) => ({
        id: node.id,
        nameEn: node.nameEn,
        nameAm: node.nameAm,
        slug: node.slug,
        icon: node.icon,
      })),
    [tree],
  );
  return { categories, isLoading };
}
