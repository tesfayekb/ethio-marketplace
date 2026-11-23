import type { MessageKey } from "@/i18n";
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
import { tierOf } from "@/components/marketplace/card-tier";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";
import { ReaderError, readFailed } from "@/lib/reader-failure";
import { readRefusal, refusalText, type RefusalFamily } from "@/lib/refusal";
import { SHARED_REFUSAL_WORDS } from "@/features/admin-listings/listing-refusals";

/**
 * Bundle 10 E3a — THE SCREENING QUEUE READ (D109).
 *
 * DEC-422 (ACT-022) — the queue is read through its own staff door,
 * `admin_screening_queue` (listings:review, the caller's country reach): it
 * answers `{ total, rows }`, oldest change first by updated_at then id, one page
 * of the server's own offset; the title search (or an ad's id) and the filters
 * run in the door, so a row is found whatever page it sits on. The photos' read
 * is `listing_photos_admin_read` (listings:view, RLS, F3).
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
   * the door reads the ad's place for this filter and the ad's home country
   * for the caller's reach. The door takes a list; one market is a list of one.
   */
  country: readonly string[];
  /** P-1 W4 — the ad's tier (`listings.tier`, the listings table's own filter). */
  tier: string | null;
  /**
   * DEC-422 — the seller, by public name or business name (and by e-mail for a
   * holder of profiles:view); the door's `p_seller`. Left out, the filter is off.
   */
  seller?: string;
}

/** The toolbar with no filter set. */
export const NO_SCREENING_FILTERS: ScreeningFilters = { country: [], tier: null };

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
  /** Turn T1 — the ad's level key, for the preview's level look; null = not known. */
  tier: string | null;
  updatedAt: string;
  category: Named;
  place: Named;
  /** DEC-422 — the seller as the queue's door names them: the public name, the business name and, for a holder of profiles:view only, the e-mail (null otherwise). */
  sellerAlias: string | null;
  sellerBusinessName: string | null;
  sellerEmail: string | null;
}

type DoorRow = Record<string, unknown>;

/** A plain JSON object (never null, never an array) — the one shape guard of this file's answers. */
function isDoorRow(value: unknown): value is DoorRow {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

const textOrNull = (value: unknown): string | null => (typeof value === "string" ? value : null);

/** A number the door sent as a JSON number or as numeric text; anything else is not a number. */
function numberOrNull(value: unknown): number | null {
  const n = typeof value === "string" && value !== "" ? Number(value) : value;
  return typeof n === "number" && Number.isFinite(n) ? n : null;
}

/** A category's or a place's names as the row's flat keys carry them; null when the row names none. */
function namedOf(en: unknown, am: unknown): Named {
  return typeof en === "string" ? { name_en: en, name_am: textOrNull(am) } : null;
}

/**
 * One row of the door's answer as the page reads it (the queue and the one-row
 * read share it), or null when the row is out of shape — a row the page cannot
 * draw is a malformed answer, never a row with invented values (F4).
 */
export function parseScreeningRow(value: unknown): ScreeningRow | null {
  if (!isDoorRow(value)) return null;
  const row = value;
  if (
    typeof row["id"] !== "string" ||
    typeof row["title"] !== "string" ||
    typeof row["description"] !== "string" ||
    typeof row["category_id"] !== "string" ||
    typeof row["price_mode"] !== "string" ||
    typeof row["price_negotiable"] !== "boolean" ||
    typeof row["photos_soon"] !== "boolean" ||
    typeof row["updated_at"] !== "string"
  ) {
    return null;
  }
  const amount = row["price_amount"];
  if (amount !== null && numberOrNull(amount) === null) return null;
  return {
    id: row["id"],
    title: row["title"],
    description: row["description"],
    categoryId: row["category_id"],
    locationId: textOrNull(row["location_id"]),
    countryCode: textOrNull(row["country_code"]),
    priceMode: row["price_mode"],
    priceAmount: numberOrNull(amount),
    priceCurrency: textOrNull(row["price_currency"]),
    pricePeriod: textOrNull(row["price_period"]),
    priceBp: typeof row["price_bp"] === "number" ? row["price_bp"] : null,
    priceNegotiable: row["price_negotiable"],
    priceUnit: textOrNull(row["price_unit"]),
    priceUnitText: textOrNull(row["price_unit_text"]),
    attributes: isDoorRow(row["attributes"]) ? row["attributes"] : {},
    photosSoon: row["photos_soon"],
    tier: tierOf(row["tier"]),
    updatedAt: row["updated_at"],
    category: namedOf(row["category_name_en"], row["category_name_am"]),
    place: namedOf(row["place_name_en"], row["place_name_am"]),
    sellerAlias: textOrNull(row["seller_alias"]),
    sellerBusinessName: textOrNull(row["seller_business_name"]),
    sellerEmail: textOrNull(row["seller_email"]),
  };
}

/**
 * The door's answer `{ total, rows }`, or null when it is out of shape: a
 * total that is not a whole number, rows that are not a list, or one row the
 * page cannot draw.
 */
export function parseScreeningQueue(
  value: unknown,
): { rows: ScreeningRow[]; total: number } | null {
  if (!isDoorRow(value)) return null;
  const total = value["total"];
  const raw = value["rows"];
  if (typeof total !== "number" || !Number.isInteger(total) || total < 0) return null;
  if (!Array.isArray(raw)) return null;
  const rows: ScreeningRow[] = [];
  for (const item of raw) {
    const row = parseScreeningRow(item);
    if (row === null) return null;
    rows.push(row);
  }
  return { rows, total };
}

/** The door's arguments for a page: only what is asked is sent, the market as a list of one (DEC-420). */
export function screeningQueueArgs(
  page: number,
  search: string,
  pageSize: number,
  filters: ScreeningFilters,
) {
  const term = search.trim();
  const seller = (filters.seller ?? "").trim();
  return {
    ...(term === "" ? {} : { p_search: term }),
    ...(filters.country.length === 0 ? {} : { p_country: filters.country.slice(0, 20) }),
    ...(filters.tier === null ? {} : { p_tier: filters.tier }),
    ...(seller === "" ? {} : { p_seller: seller }),
    p_limit: pageSize,
    p_offset: page * pageSize,
  };
}

/** One page of the queue through its door; a typed failure on a refusal or an answer out of shape (F4). */
async function readQueue(args: ReturnType<typeof screeningQueueArgs>) {
  const { data, error } = await supabase.rpc("admin_screening_queue", args);
  if (error) throw readFailed(error);
  const answer = parseScreeningQueue(data);
  if (answer === null) {
    throw new ReaderError({ class: "malformed", message: "admin_screening_queue malformed" });
  }
  return answer;
}

/**
 * Bundle 17 turn 2 (D194) — one ad of the queue by its id, for the preview that
 * re-opens when the reviewer comes back from the ad's Edit (`?open=<id>`): read
 * fresh, so the preview shows the ad as the edit left it. The door matches a
 * search term shaped like an id against the ad's id. Null when the ad is no
 * longer in screening (decided, or moved on meanwhile) or is outside the
 * caller's reach.
 */
export async function readScreeningRow(listingId: string): Promise<ScreeningRow | null> {
  const { rows } = await readQueue({ p_search: listingId, p_limit: 1, p_offset: 0 });
  return rows.find((row) => row.id === listingId) ?? null;
}

export async function listScreening(
  page: number,
  search: string,
  pageSize: number = SCREENING_PAGE_SIZE,
  filters: ScreeningFilters = NO_SCREENING_FILTERS,
): Promise<{ rows: ScreeningRow[]; total: number }> {
  return readQueue(screeningQueueArgs(page, search, pageSize, filters));
}

export function useScreeningQueue(
  page: number,
  search: string,
  pageSize: number = SCREENING_PAGE_SIZE,
  filters: ScreeningFilters = NO_SCREENING_FILTERS,
  /** INC-1238 (ruling 1 decision 5) — no read before the kept view is known. */
  ready: boolean,
) {
  return useQuery({
    enabled: ready,
    queryKey: [
      ...ADMIN_SCREENING_KEY,
      "list",
      page,
      search,
      pageSize,
      filters.country,
      filters.tier,
      filters.seller ?? null,
    ],
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
  if (error) throw readFailed(error);
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

/**
 * The reviewer's decision: the staff door `admin_review_listing` (DEC-402;
 * listings:review with a fresh second factor, the staff dial, the ad's own
 * country). `transition_listing` is the seller's and the service's alone.
 */
export async function decideListing(listingId: string, next: "active" | "rejected") {
  const { error } = await supabase.rpc("admin_review_listing", {
    p_listing_id: listingId,
    p_new_status: next,
  });
  if (error) throw error;
}

const DECISION_REFUSALS = {
  words: {
    ...SHARED_REFUSAL_WORDS,
    ownListing: "admin.screening.error.ownListing",
  },
  generic: "common.error",
} as const satisfies RefusalFamily;

/** Both review surfaces use the listings family's one refusal reader. */
export function decisionRefusalKey(error: unknown) {
  return readRefusal(error, DECISION_REFUSALS).key;
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
  if (error) throw readFailed(error);
  const facts = parseScreeningFacts(data);
  if (facts === null) {
    throw new ReaderError({ class: "malformed", message: "admin_screening_facts malformed" });
  }
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
  | { ok: false; reason: "notShown" }
  | { ok: false; reason: "rateLimited"; until?: string };

/** Bundle 11 A3 — the words drawn under a channel's row when a reveal is refused. */
export function revealProblemKey(reason: "notShown" | "rateLimited") {
  return reason === "rateLimited"
    ? ("admin.screening.revealLimited" as const)
    : ("admin.screening.revealNotShown" as const);
}

/** L22b — a reveal's problem under its row: the key (state) and, for the dial, its reset instant. */
export type RevealProblem = { key: MessageKey; until?: string };

/** L22b — the reveal's problem as words, saying when the dial resets. */
export function revealProblemText(
  problem: RevealProblem,
  t: (key: MessageKey) => string,
  language: string,
): string {
  if (problem.until === undefined || problem.key !== revealProblemKey("rateLimited"))
    return t(problem.key);
  return refusalText(
    readRefusal(`rateLimited:${problem.until}`, REVEAL_REFUSALS),
    t,
    undefined,
    language,
  );
}

/** The reveal's one refusal with a line of its own: the dial. The gate raises it as a code. */
const REVEAL_REFUSALS = {
  words: { rateLimited: "admin.screening.revealLimited" },
  // L22b — the dial's words that say WHEN, for a reset instant still to come.
  when: { rateLimited: "admin.screening.revealLimitedWhen" },
  generic: "common.error",
} as const satisfies RefusalFamily;

export async function revealContact(
  listingId: string,
  channel: "phone" | "phone2" | "whatsapp",
): Promise<RevealAnswer> {
  const { data, error } = await supabase.rpc("admin_reveal_listing_contact", {
    p_listing_id: listingId,
    p_channel: channel,
  });
  if (error) {
    // INC-1170 (F1-7a): the gate raises the dial's refusal as `rateLimited:<instant>`, the code with
    // the reset time after its first colon; the one reader reads the code, and the screen's line for
    // it is the one the returned answer drew before (the words that draw the time are F1-7c's).
    const read = readRefusal(error, REVEAL_REFUSALS);
    if (read.key === revealProblemKey("rateLimited")) {
      return read.tail === undefined
        ? { ok: false, reason: "rateLimited" }
        : { ok: false, reason: "rateLimited", until: read.tail };
    }
    throw error;
  }
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
    new ReaderError({
      class: "malformed",
      message: "admin_name_check_summary: answer out of shape",
    });
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) throw malformed();
  const { unchecked, oldest_since: oldest } = raw as {
    unchecked?: unknown;
    oldest_since?: unknown;
  };
  if (typeof unchecked !== "number" || !Number.isInteger(unchecked) || unchecked < 0)
    throw malformed();
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
