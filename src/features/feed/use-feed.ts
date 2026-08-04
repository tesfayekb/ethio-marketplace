import { useCallback, useEffect, useState } from "react";

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
  locationNameEn: string | null;
  locationNameAm: string | null;
  categoryId: string;
}

export interface UseFeedOptions {
  /** Narrow to one category (set by the rail). */
  categoryId?: string | null;
  /** SEAM: accepted, not yet applied — see ranking.ts. */
  locationScope?: LocationScope;
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
  locations: { name_en: string | null; name_am: string | null } | null;
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
export function useFeed({ categoryId = null, locationScope = "all-active" }: UseFeedOptions = {}) {
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
        "id,title,price_amount,price_currency,price_mode,tier,published_at,category_id,locations(name_en,name_am)",
      )
      .eq("status", "active");

    if (categoryId) query = query.eq("category_id", categoryId);

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
  }, [categoryId, locationScope, reloadToken]);

  return { listings, isLoading, error, retry };
}

export interface FeedCategory {
  id: string;
  nameEn: string;
  nameAm: string | null;
  slug: string;
}

/**
 * Live top-level categories for the Marketplace rail.
 * Top level = a category that is not the child of any tree pointer.
 */
export function useCategories() {
  const [categories, setCategories] = useState<FeedCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    void (async () => {
      const [{ data: cats }, { data: pointers }] = await Promise.all([
        supabase
          .from("categories")
          .select("id,name_en,name_am,slug,display_order")
          .eq("is_active", true)
          .order("display_order", { ascending: true }),
        supabase.from("category_tree_pointers").select("child_id,parent_id"),
      ]);
      if (cancelled) return;

      const childOfSomething = new Set(
        (pointers ?? []).filter((p) => p.parent_id !== null).map((p) => p.child_id),
      );
      setCategories(
        (cats ?? [])
          .filter((c) => !childOfSomething.has(c.id))
          .map((c) => ({ id: c.id, nameEn: c.name_en, nameAm: c.name_am, slug: c.slug })),
      );
      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, isLoading };
}
