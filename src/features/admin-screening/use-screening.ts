import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { loadAttributeOptions, type AttrOption } from "@/features/posting/attribute-options";
import {
  readPostingSchema,
  type AttrDef,
  type DraftPhotoRow,
} from "@/features/posting/posting-service";
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
/** Bundle 11 A2 — the footer's rows-per-page choices. */
export const SCREENING_PAGE_SIZES = [25, 50, 100];

/** Bundle 11 A2 — the toolbar's filters; null means every value. */
export interface ScreeningFilters {
  /**
   * The market of the ad's place (`locations.country_code`, the market
   * admin_screening_facts reports). A3, INC-537 — never `home_country_code`:
   * that column is outside the signed-in role's grant on listings, so a filter
   * on it is refused and every filtered read failed.
   */
  country: string | null;
}

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
  pageSize: number = SCREENING_PAGE_SIZE,
  filters: ScreeningFilters = { country: null },
): Promise<{ rows: ScreeningRow[]; total: number }> {
  const from = page * pageSize;
  let query = supabase
    .from("listings")
    .select(
      "id,title,description,category_id,location_id,price_mode,price_amount,price_currency,price_period,price_bp,price_negotiable,attributes,photos_soon,updated_at,category:categories(name_en,name_am),place:locations(name_en,name_am)",
      { count: "exact" },
    )
    .eq("status", "screening");
  const term = search.trim();
  if (term !== "") query = query.ilike("title", `%${escapeLike(term)}%`);
  // INC-537 — through the embedded place; `place=not.is.null` keeps only the
  // ads whose place is in the market (the place's columns are granted).
  if (filters.country !== null) {
    query = query.eq("place.country_code", filters.country).not("place", "is", null);
  }
  const { data, error, count } = await query
    .order("updated_at", { ascending: true })
    .order("id", { ascending: true })
    .range(from, from + pageSize - 1);
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

export function useScreeningQueue(
  page: number,
  search: string,
  pageSize: number = SCREENING_PAGE_SIZE,
  filters: ScreeningFilters = { country: null },
) {
  return useQuery({
    queryKey: [...ADMIN_SCREENING_KEY, "list", page, search, pageSize, filters.country],
    queryFn: () => listScreening(page, search, pageSize, filters),
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

/**
 * Bundle 11 A2 (D120) — what the reviewer's preview may show beyond the row:
 * the ad's country, which contact methods the seller shows (never a value) and
 * the seller's public name, from `admin_screening_facts` (listings:review).
 */
export interface ScreeningFacts {
  country: string | null;
  channels: Record<"phone" | "phone2" | "telegram" | "whatsapp", boolean>;
  alias: string | null;
  businessName: string | null;
}

const CHANNELS = ["phone", "phone2", "telegram", "whatsapp"] as const;

export function parseScreeningFacts(data: unknown): ScreeningFacts | null {
  if (data === null || typeof data !== "object" || Array.isArray(data)) return null;
  const payload = data as Record<string, unknown>;
  const rawChannels = payload["channels"];
  const rawSeller = payload["seller"];
  if (rawChannels === null || typeof rawChannels !== "object" || Array.isArray(rawChannels)) {
    return null;
  }
  if (rawSeller === null || typeof rawSeller !== "object" || Array.isArray(rawSeller)) return null;
  const channelMap = rawChannels as Record<string, unknown>;
  const seller = rawSeller as Record<string, unknown>;
  const text = (value: unknown) => (typeof value === "string" && value !== "" ? value : null);
  const channels = Object.fromEntries(
    CHANNELS.map((channel) => [channel, channelMap[channel] === true]),
  ) as ScreeningFacts["channels"];
  return {
    country: text(payload["country"]),
    channels,
    alias: text(seller["alias"]),
    businessName: text(seller["business_name"]),
  };
}

export async function readScreeningFacts(listingId: string): Promise<ScreeningFacts> {
  const { data, error } = await supabase.rpc("admin_screening_facts", {
    p_listing_id: listingId,
  });
  if (error) throw new Error(error.message);
  const facts = parseScreeningFacts(data);
  if (facts === null) throw new Error("screening facts returned no data");
  return facts;
}

export function useScreeningFacts(listingId: string | null) {
  return useQuery({
    queryKey: [...ADMIN_SCREENING_KEY, "facts", listingId],
    queryFn: () => readScreeningFacts(listingId as string),
    enabled: listingId !== null,
  });
}

/**
 * Bundle 11 A2 — the questions and their options for the preview's facts table,
 * read as the posting form reads them (`get_posting_schema`, the options route).
 */
export function useScreeningSchema(categoryId: string | null) {
  return useQuery({
    queryKey: [...ADMIN_SCREENING_KEY, "schema", categoryId],
    enabled: categoryId !== null,
    queryFn: async (): Promise<{
      definitions: AttrDef[];
      attributeOptions: Record<string, AttrOption[]>;
    }> => {
      const schema = await readPostingSchema(categoryId as string);
      const definitions = schema?.attributes ?? [];
      const entries = await Promise.all(
        definitions
          .filter((definition) => ["single_select", "multi_select"].includes(definition.attrType))
          .map(
            async (definition) =>
              [
                definition.attrKey,
                (await loadAttributeOptions(definition.attributeId)) ?? [],
              ] as const,
          ),
      );
      return { definitions, attributeOptions: Object.fromEntries(entries) };
    },
  });
}

/**
 * Bundle 11 A2 (D120) — "Show number": the door logs every reveal (Admin ›
 * Audit). A3 (D129) — it asks for no second factor; listings:review, the
 * review_reveal dial (60 an hour) and the log stand.
 */
export type RevealAnswer =
  | { ok: true; value: string }
  | { ok: false; reason: "notShown" | "rateLimited" };

/** Bundle 11 A3 — the words drawn under a channel's row when a reveal is refused. */
export function revealProblemKey(reason: "notShown" | "rateLimited") {
  return reason === "rateLimited"
    ? ("admin.screening.revealLimited" as const)
    : ("admin.screening.revealNotShown" as const);
}

export async function revealContact(
  listingId: string,
  channel: "phone" | "phone2" | "whatsapp",
): Promise<RevealAnswer> {
  const { data, error } = await supabase.rpc("admin_reveal_listing_contact", {
    p_listing_id: listingId,
    p_channel: channel,
  });
  if (error) throw error;
  const payload = (data ?? {}) as Record<string, unknown>;
  if (payload["ok"] === true && typeof payload["value"] === "string") {
    return { ok: true, value: payload["value"] };
  }
  if (payload["reason"] === "notShown" || payload["reason"] === "rateLimited") {
    return { ok: false, reason: payload["reason"] };
  }
  throw new Error("reveal returned no answer");
}
