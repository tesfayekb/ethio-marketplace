import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { loadAttributeOptions, type AttrOption } from "@/features/posting/attribute-options";
import {
  PHOTO_ROW_SELECT,
  photoReviewOf,
  photoWarningsOf,
  readPostingSchema,
  type AttrDef,
  type DraftPhotoRow,
} from "@/features/posting/posting-service";
import { supabase } from "@/integrations/supabase/client";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";
import { ReaderError } from "@/lib/reader-failure";

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
  /** Bundle 16 turn E3 (D188) — the market of the ad's place (`locations.country_code`), for the edit boxes' price money. */
  countryCode: string | null;
  priceMode: string;
  priceAmount: number | null;
  priceCurrency: string | null;
  pricePeriod: string | null;
  priceBp: number | null;
  priceNegotiable: boolean;
  /** INC-553 — the price's unit (a token, or `other` with the seller's own word). */
  priceUnit: string | null;
  priceUnitText: string | null;
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

/** The queue's columns: the ad's public row with its category and its place embedded. */
const SCREENING_SELECT =
  "id,title,description,category_id,location_id,price_mode,price_amount,price_currency,price_period,price_bp,price_negotiable,price_unit,price_unit_text,attributes,photos_soon,updated_at,category:categories(name_en,name_am),place:locations(name_en,name_am,country_code)";

type ScreeningSelected = {
  id: string;
  title: string;
  description: string;
  category_id: string;
  location_id: string | null;
  price_mode: string;
  price_amount: number | string | null;
  price_currency: string | null;
  price_period: string | null;
  price_bp: number | null;
  price_negotiable: boolean;
  price_unit: string | null;
  price_unit_text: string | null;
  attributes: unknown;
  photos_soon: boolean;
  updated_at: string;
  category: unknown;
  place: unknown;
};

/** One selected row as the page reads it (shared by the queue and the one-row read). */
function screeningRowOf(row: ScreeningSelected): ScreeningRow {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    categoryId: row.category_id,
    locationId: row.location_id,
    countryCode:
      row.place !== null &&
      typeof (row.place as { country_code?: unknown }).country_code === "string"
        ? ((row.place as { country_code: string }).country_code ?? null)
        : null,
    priceMode: row.price_mode,
    priceAmount: row.price_amount === null ? null : Number(row.price_amount),
    priceCurrency: row.price_currency,
    pricePeriod: row.price_period,
    priceBp: typeof row.price_bp === "number" ? row.price_bp : null,
    priceNegotiable: row.price_negotiable,
    priceUnit: row.price_unit,
    priceUnitText: row.price_unit_text,
    attributes:
      row.attributes !== null && typeof row.attributes === "object"
        ? (row.attributes as Record<string, unknown>)
        : {},
    photosSoon: row.photos_soon,
    updatedAt: row.updated_at,
    category: (row.category as Named) ?? null,
    place: (row.place as Named) ?? null,
  };
}

/**
 * Bundle 17 turn 2 (D194) — one ad of the queue by its id, for the preview that
 * re-opens when the reviewer comes back from the ad's Edit (`?open=<id>`): read
 * fresh, so the preview shows the ad as the edit left it. Null when the ad is
 * no longer in screening (decided, or moved on meanwhile).
 */
export async function readScreeningRow(listingId: string): Promise<ScreeningRow | null> {
  const { data, error } = await supabase
    .from("listings")
    .select(SCREENING_SELECT)
    .eq("status", "screening")
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data === null ? null : screeningRowOf(data as unknown as ScreeningSelected);
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
    .select(SCREENING_SELECT, { count: "exact" })
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
  const rows = data.map((row) => screeningRowOf(row as unknown as ScreeningSelected));
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
    .select(PHOTO_ROW_SELECT)
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
    // D158 — held while photo screening was off; approving the ad approves it.
    unscreened: row.unscreened === true,
    // D154 B3 — the screen's warnings: staff see the photo marked.
    warnings: photoWarningsOf(row.warning),
    // Bundle 16 turn 4b (D178) — why it is hidden, while no person has decided.
    review: photoReviewOf(row.review),
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

/**
 * N1a (INC-977) — THE NAMES WAITING FOR THE SELLER-NAME CHECK. The door
 * `admin_name_check_summary()` (listings:view, the page's own gate) answers the
 * count and the oldest `since`, nothing else. A failed or out-of-shape read is a
 * thrown typed failure (INC-885), never shown as 0.
 */
export interface NameCheckSummary {
  unchecked: number;
  oldestSince: string | null;
}

export function nameCheckSummaryOf(raw: unknown): NameCheckSummary {
  const malformed = () =>
    new ReaderError({ class: "malformed", message: "admin_name_check_summary: answer out of shape" });
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) throw malformed();
  const { unchecked, oldest_since: oldest } = raw as { unchecked?: unknown; oldest_since?: unknown };
  if (typeof unchecked !== "number" || !Number.isInteger(unchecked) || unchecked < 0) throw malformed();
  if (oldest !== null && typeof oldest !== "string") throw malformed();
  if (unchecked > 0 && oldest === null) throw malformed();
  return { unchecked, oldestSince: oldest };
}

export async function readNameCheckSummary(): Promise<NameCheckSummary> {
  const { data, error } = await supabase.rpc("admin_name_check_summary");
  if (error) throw error;
  return nameCheckSummaryOf(data);
}

export function useNameCheckSummary() {
  return useQuery({
    queryKey: [...ADMIN_SCREENING_KEY, "nameChecks"],
    queryFn: readNameCheckSummary,
  });
}
