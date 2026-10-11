import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

/**
 * Bundle 11, the Listings console, turn L2 (D134) — All listings' read, through
 * the one door `admin_list_listings` (L1): listings:view; drafts never; the
 * seller's e-mail only for profiles:view holders (the door decides, F3).
 */

export const ADMIN_LISTINGS_KEY = ["admin", "listings"] as const;

export const LISTING_VIEWS = ["all", "live", "waiting", "ended", "removed"] as const;
export type ListingView = (typeof LISTING_VIEWS)[number];

export const LISTING_TIERS = ["premium", "featured", "regular"] as const;

export interface AdminListingFilters {
  view: ListingView;
  search: string;
  country: string | null;
  category: string | null;
  seller: string;
  from: string;
  to: string;
  tier: string | null;
  limit: number;
  offset: number;
}

export interface AdminListingRow {
  id: string;
  title: string;
  status: string;
  tier: string;
  severe: boolean;
  sellerId: string;
  sellerAlias: string | null;
  sellerBusinessName: string | null;
  sellerEmail: string | null;
  categoryId: string | null;
  categoryNameEn: string | null;
  categoryNameAm: string | null;
  placeNameEn: string | null;
  placeNameAm: string | null;
  countryCode: string | null;
  priceMode: string;
  priceAmount: number | null;
  priceCurrency: string | null;
  pricePeriod: string | null;
  priceBp: number | null;
  /** INC-553 — the price's unit (a token, or `other` with the seller's own word). */
  priceUnit: string | null;
  priceUnitText: string | null;
  photoCount: number;
  createdAt: string;
  publishedAt: string | null;
  expiresAt: string | null;
}

const text = (value: unknown): string | null =>
  typeof value === "string" && value !== "" ? value : null;
const number = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

export async function listAdminListings(
  filters: AdminListingFilters,
): Promise<{ rows: AdminListingRow[]; total: number }> {
  const { data, error } = await supabase.rpc("admin_list_listings", {
    p_view: filters.view,
    ...(filters.search.trim() === "" ? {} : { p_search: filters.search.trim() }),
    ...(filters.country === null ? {} : { p_country: filters.country }),
    ...(filters.category === null ? {} : { p_category: filters.category }),
    ...(filters.seller.trim() === "" ? {} : { p_seller: filters.seller.trim() }),
    ...(filters.from === "" ? {} : { p_from: filters.from }),
    ...(filters.to === "" ? {} : { p_to: filters.to }),
    ...(filters.tier === null ? {} : { p_tier: filters.tier }),
    p_limit: filters.limit,
    p_offset: filters.offset,
  });
  // F4 — a failed read is an error, never an empty table.
  if (error) throw new Error(error.message);
  const raw = (data ?? []) as Array<Record<string, unknown>>;
  const rows = raw.map((row) => ({
    id: String(row["id"]),
    title: String(row["title"] ?? ""),
    status: String(row["status"]),
    tier: String(row["tier"] ?? "regular"),
    severe: row["severe"] === true,
    sellerId: String(row["seller_id"]),
    sellerAlias: text(row["seller_alias"]),
    sellerBusinessName: text(row["seller_business_name"]),
    sellerEmail: text(row["seller_email"]),
    categoryId: text(row["category_id"]),
    categoryNameEn: text(row["category_name_en"]),
    categoryNameAm: text(row["category_name_am"]),
    placeNameEn: text(row["place_name_en"]),
    placeNameAm: text(row["place_name_am"]),
    countryCode: text(row["country_code"]),
    priceMode: String(row["price_mode"] ?? "fixed"),
    priceAmount: number(row["price_amount"]),
    priceCurrency: text(row["price_currency"]),
    pricePeriod: text(row["price_period"]),
    priceBp: number(row["price_bp"]),
    priceUnit: text(row["price_unit"]),
    priceUnitText: text(row["price_unit_text"]),
    photoCount: number(row["photo_count"]) ?? 0,
    createdAt: String(row["created_at"]),
    publishedAt: text(row["published_at"]),
    expiresAt: text(row["expires_at"]),
  }));
  const total = number(raw[0]?.["total_count"]) ?? 0;
  return { rows, total };
}

export function useAdminListings(filters: AdminListingFilters) {
  return useQuery({
    queryKey: [...ADMIN_LISTINGS_KEY, "list", filters],
    queryFn: () => listAdminListings(filters),
    placeholderData: keepPreviousData,
    staleTime: 10_000,
  });
}

/**
 * Turn L2b (D136 4, D137) — Remove, Restore or Send back one listing through
 * the door `admin_move_listing` (listings:enforce with a fresh second factor;
 * the door writes the state revision, the audit row and the seller's notice).
 * The door's error is thrown as it came, so the step-up guard can read it.
 */
export async function moveAdminListing(
  listingId: string,
  to: "removed" | "screening",
  reason: string,
  note: string,
): Promise<void> {
  const { error } = await supabase.rpc("admin_move_listing", {
    p_listing_id: listingId,
    p_to: to,
    p_reason: reason,
    ...(note.trim() === "" ? {} : { p_note: note.trim() }),
  });
  if (error) throw error;
}
