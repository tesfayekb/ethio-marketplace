import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { DraftPhotoRow } from "@/features/posting/posting-service";
import { supabase } from "@/integrations/supabase/client";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

/**
 * Bundle 10 E3a — THE SCREENING QUEUE READ (D109).
 *
 * Read with the signed-in session: RLS `listings_admin_read` and
 * `listing_photos_admin_read` (both `listings:view`) decide what comes back
 * (F3). Oldest first by updated_at, then id; one page of the server's own range;
 * the title search runs in the query so a row is found whatever page it sits on.
 */
export const ADMIN_SCREENING_KEY = [AUTH_DERIVED_ROOT, "admin", "screening"] as const;
export const SCREENING_PAGE_SIZE = 25;

type Named = { name_en: string; name_am: string | null } | null;

export interface ScreeningRow {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  locationId: string | null;
  priceMode: string;
  priceAmount: number | null;
  priceCurrency: string | null;
  pricePeriod: string | null;
  priceBp: number | null;
  priceNegotiable: boolean;
  attributes: Record<string, unknown>;
  photosSoon: boolean;
  updatedAt: string;
  category: Named;
  place: Named;
}

/** LIKE wildcards in the reviewer's words are matched as themselves. */
function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`);
}

export async function listScreening(
  page: number,
  search: string,
): Promise<{ rows: ScreeningRow[]; total: number }> {
  const from = page * SCREENING_PAGE_SIZE;
  let query = supabase
    .from("listings")
    .select(
      "id,title,description,category_id,location_id,price_mode,price_amount,price_currency,price_period,price_bp,price_negotiable,attributes,photos_soon,updated_at,category:categories(name_en,name_am),place:locations(name_en,name_am)",
      { count: "exact" },
    )
    .eq("status", "screening");
  const term = search.trim();
  if (term !== "") query = query.ilike("title", `%${escapeLike(term)}%`);
  const { data, error, count } = await query
    .order("updated_at", { ascending: true })
    .order("id", { ascending: true })
    .range(from, from + SCREENING_PAGE_SIZE - 1);
  // F4 — a failed read is an error, never an empty queue.
  if (error) throw new Error(error.message);
  if (!data || count === null) throw new Error("screening read returned no data");
  const rows = data.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    categoryId: row.category_id,
    locationId: row.location_id,
    priceMode: row.price_mode,
    priceAmount: row.price_amount === null ? null : Number(row.price_amount),
    priceCurrency: row.price_currency,
    pricePeriod: row.price_period,
    priceBp: typeof row.price_bp === "number" ? row.price_bp : null,
    priceNegotiable: row.price_negotiable,
    attributes:
      row.attributes !== null && typeof row.attributes === "object"
        ? (row.attributes as Record<string, unknown>)
        : {},
    photosSoon: row.photos_soon,
    updatedAt: row.updated_at,
    category: (row.category as Named) ?? null,
    place: (row.place as Named) ?? null,
  }));
  return { rows, total: count };
}

export function useScreeningQueue(page: number, search: string) {
  return useQuery({
    queryKey: [...ADMIN_SCREENING_KEY, "list", page, search],
    queryFn: () => listScreening(page, search),
    placeholderData: keepPreviousData,
    staleTime: 10_000,
  });
}

export async function listScreeningPhotos(listingId: string): Promise<DraftPhotoRow[]> {
  const { data, error } = await supabase
    .from("listing_photos")
    .select("id,display_order,paths,storage_path")
    .eq("listing_id", listingId)
    .order("display_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: row.id,
    displayOrder: row.display_order,
    paths:
      row.paths !== null && typeof row.paths === "object"
        ? (row.paths as Record<string, unknown>)
        : null,
    storagePath: row.storage_path,
  }));
}

export function useScreeningPhotos(listingId: string | null) {
  return useQuery({
    queryKey: [...ADMIN_SCREENING_KEY, "photos", listingId],
    queryFn: () => listScreeningPhotos(listingId as string),
    enabled: listingId !== null,
  });
}

/** The door, as the signed-in reviewer (F3: it re-checks everything). */
export async function decideListing(listingId: string, next: "active" | "rejected") {
  const { error } = await supabase.rpc("transition_listing", {
    p_listing_id: listingId,
    p_new_status: next,
  });
  if (error) throw error;
}
