import { supabase } from "@/integrations/supabase/client";

import type { CategoryFacts, DoorAnswer, Refusal } from "./types";

/**
 * U6-C1a — THE WIZARD'S ONLY WAY TO THE SERVER.
 *
 * THE CLIENT NEVER WRITES A TABLE. Every mutation goes through an A2/B1 route,
 * which goes through a Tier-A door, which is the authority (F3). The client
 * mirrors validation only to keep `Next` from being pointless — the verdict that
 * counts always comes back from here.
 *
 * READS are a different matter: a seller's own draft and its photos are read
 * straight through the browser client, because `listings_seller_read` and
 * `listing_photos_seller_read` already scope them to `auth.uid()`. That is RLS
 * doing its job, not a bypass, and it costs no route.
 */

/** The bearer the routes demand; absent means "not signed in" and the route 401s. */
async function bearer(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

function refusalsOf(payload: Record<string, unknown>): Refusal[] {
  const list = Array.isArray(payload["refusals"]) ? payload["refusals"] : [];
  return list.map((entry) => {
    const row = (entry ?? {}) as Record<string, unknown>;
    return {
      // The attribute authority names the offending definition in `attr_key`
      // rather than `field` (A1's own vocabulary), and the form's controls are
      // keyed by exactly that — so both spellings resolve to one `field` here
      // and a refused detail can never end up without a message under it.
      field: String(row["field"] ?? row["attr_key"] ?? ""),
      reason: String(row["reason"] ?? ""),
      ...(typeof row["detail"] === "string" ? { detail: row["detail"] } : {}),
    };
  });
}

async function readAnswer(response: Response): Promise<DoorAnswer> {
  let payload: Record<string, unknown> = {};
  try {
    payload = (await response.json()) as Record<string, unknown>;
  } catch {
    payload = {};
  }
  const refusals = refusalsOf(payload);
  return {
    status: response.status,
    ok: payload["ok"] === true,
    refusals,
    payload,
    // A 5xx is not a verdict, it is a failure to reach one — the caller retries
    // rather than showing a refusal that nobody made. A 200 with `ok:false` IS a
    // verdict, refusals and all, and a 401/403/409 is one too (the route names
    // the field), so only the server's own breakage counts as unreachable.
    unreachable: response.status >= 500,
  };
}

const UNREACHABLE: DoorAnswer = {
  status: 0,
  ok: false,
  refusals: [],
  payload: {},
  unreachable: true,
};

async function call(path: string, body: BodyInit, headers: HeadersInit): Promise<DoorAnswer> {
  const token = await bearer();
  if (token === null) return { ...UNREACHABLE, status: 401 };
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: { ...headers, Authorization: `Bearer ${token}` },
      body,
    });
    return await readAnswer(response);
  } catch {
    // Offline, blocked, aborted: NOT a refusal. The caller keeps the form state
    // in memory and retries (C4 — never a blank screen, never a phantom).
    return UNREACHABLE;
  }
}

export interface DraftBody {
  listingId: string | null;
  step: number;
  categoryId?: string | null;
  title?: string | null;
  description?: string | null;
  videoUrl?: string | null;
  attributes?: unknown;
  priceMode?: string | null;
  priceAmount?: number | null;
  priceCurrency?: string | null;
  pricePeriod?: string | null;
  /** DEC-079 — a commission in basis points (1250 = 12.5 %); null otherwise. */
  priceBp?: number | null;
  /** DEC-081 — the negotiable flag; the route sends only a literal true as true. */
  priceNegotiable?: boolean;
  posterExpiresAt?: string | null;
  coverage?: string[] | null;
  contactPref?: unknown;
}

/** `POST /api/listings/draft` — creates at step 1, updates at every later step. */
export function saveDraft(body: DraftBody): Promise<DoorAnswer> {
  return call("/api/listings/draft", JSON.stringify(body), {
    "Content-Type": "application/json",
  });
}

/**
 * `POST /api/upload/photo` — the three device-encoded variants, multipart.
 *
 * XHR rather than `fetch`, for ONE reason: `fetch` cannot report upload
 * progress, and on a slow Ethiopian mobile connection a photo tile that sits at
 * "Sending…" with no number is indistinguishable from a stuck one. The progress
 * here is the browser's real byte count, not an animation.
 */
export async function uploadPhoto(
  listingId: string,
  variants: { cover: Blob; card: Blob; thumb: Blob },
  extension: string,
  onProgress?: (percent: number) => void,
): Promise<DoorAnswer> {
  const token = await bearer();
  if (token === null) return { ...UNREACHABLE, status: 401 };

  const form = new FormData();
  form.set("listingId", listingId);
  for (const variant of ["cover", "card", "thumb"] as const) {
    // No Content-Type header: the browser sets the multipart boundary itself.
    form.set(variant, variants[variant], `${variant}.${extension}`);
  }

  return new Promise<DoorAnswer>((resolve) => {
    const request = new XMLHttpRequest();
    request.open("POST", "/api/upload/photo");
    request.setRequestHeader("Authorization", `Bearer ${token}`);
    request.upload.onprogress = (event) => {
      if (!event.lengthComputable || !onProgress) return;
      onProgress(Math.min(99, Math.round((event.loaded / event.total) * 100)));
    };
    request.onerror = () => resolve(UNREACHABLE);
    request.ontimeout = () => resolve(UNREACHABLE);
    request.onload = () => {
      let payload: Record<string, unknown> = {};
      try {
        payload = JSON.parse(request.responseText) as Record<string, unknown>;
      } catch {
        payload = {};
      }
      resolve({
        status: request.status,
        ok: payload["ok"] === true,
        refusals: refusalsOf(payload),
        payload,
        unreachable: request.status >= 500 || request.status === 0,
      });
    };
    request.send(form);
  });
}

/** `POST /api/listings/photos/$id { action: 'cover' }`. */
export function setCoverPhoto(photoId: string): Promise<DoorAnswer> {
  return call(`/api/listings/photos/${photoId}`, JSON.stringify({ action: "cover" }), {
    "Content-Type": "application/json",
  });
}

/** `DELETE /api/listings/photos/$id`. */
export async function deletePhoto(photoId: string): Promise<DoorAnswer> {
  const token = await bearer();
  if (token === null) return { ...UNREACHABLE, status: 401 };
  try {
    const response = await fetch(`/api/listings/photos/${photoId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await readAnswer(response);
  } catch {
    return UNREACHABLE;
  }
}

export interface DraftRow {
  id: string;
  categoryId: string | null;
  draftStep: number;
  status: string;
  title: string | null;
  description: string | null;
  videoUrl: string | null;
  attributes: Record<string, unknown>;
  /** U6-C2a — the price step (4)'s stored answers, so a resume opens on what was saved. */
  priceMode: string | null;
  priceAmount: number | null;
  priceCurrency: string | null;
  pricePeriod: string | null;
  /** DEC-079 — the stored commission in basis points, null for every other mode. */
  priceBp: number | null;
  /** DEC-081 — the stored `price_negotiable` flag. */
  priceNegotiable: boolean;
  /** The stored timestamptz, trimmed to the `YYYY-MM-DD` the date field holds. */
  posterExpiresAt: string | null;
  /** U6-C2b — step 7's stored channels, in `listing_contact_refusals` shape. */
  contactPref: Record<string, unknown>;
  /**
   * U6-C1-R3b-4 — the map pin as the door stores it. The four columns travel
   * together: `set_listing_pin` writes all four or clears all four, so a resume
   * and the buyer preview read ONE source and cannot disagree about a pin.
   */
  pinLat: number | null;
  pinLng: number | null;
  pinPrecision: string | null;
  /** Part L — the zoom the pin was saved at (3–20), or null. */
  pinZoom: number | null;
  streetAddress: string | null;
  /** Bundle 2 step 10 (P4) — the seller's directions line, kept with or without a pin. */
  directions: string | null;
  /** Bundle 4 step 15 — "Photos coming soon" as the door stores it. */
  photosSoon: boolean;
}

export interface DraftPhotoRow {
  id: string;
  displayOrder: number;
  paths: Record<string, unknown> | null;
  storagePath: string | null;
}

function numOrNull(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * INC-389 — the owner-only read of a listing's private columns. `null` when the
 * listing is not the caller's (the door's refusal); any other failure throws (F4).
 */
async function readOwnPrivate(listingId: string): Promise<Record<string, unknown> | null> {
  const { data, error } = await supabase.rpc("my_listing_private", { p_listing_id: listingId });
  if (error) {
    if (error.message.includes("not your listing")) return null;
    throw new Error(error.message);
  }
  return data !== null && typeof data === "object" && !Array.isArray(data)
    ? (data as Record<string, unknown>)
    : null;
}

/**
 * The owner's own draft, read as the owner (RLS). `null` means the row is not
 * this account's — which the surface says in words, never as a blank screen.
 */
export async function readDraft(
  listingId: string,
): Promise<{ draft: DraftRow; photos: DraftPhotoRow[]; coverage: string[] } | null> {
  const { data, error } = await supabase
    .from("listings")
    .select(
      "id,category_id,draft_step,status,title,description,video_url,attributes,price_mode,price_amount,price_currency,price_period,price_bp,price_negotiable,poster_expires_at,pin_precision,pin_zoom,street_address,directions,photos_soon",
    )
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;

  // INC-389 — contact_pref and the true pin are private columns: the owner reads
  // them through the owner-only door; a row that is not this account's is null.
  const own = await readOwnPrivate(listingId);
  if (own === null) return null;

  const { data: photos, error: photoError } = await supabase
    .from("listing_photos")
    .select("id,display_order,paths,storage_path")
    .eq("listing_id", listingId)
    .order("display_order", { ascending: true });
  if (photoError) throw new Error(photoError.message);

  // The coverage rows are the seller's own (`listing_locations` is scoped by the
  // listing's owner), read in the order the door wrote them: the FIRST row is the
  // item's own place.
  const { data: places, error: placeError } = await supabase
    .from("listing_locations")
    .select("location_id,created_at")
    .eq("listing_id", listingId)
    .order("created_at", { ascending: true });
  if (placeError) throw new Error(placeError.message);

  return {
    coverage: (places ?? []).map((row) => row.location_id),
    draft: {
      id: data.id,
      categoryId: data.category_id,
      draftStep: data.draft_step ?? 1,
      status: data.status,
      title: data.title,
      description: data.description,
      videoUrl: data.video_url,
      attributes:
        data.attributes !== null && typeof data.attributes === "object"
          ? (data.attributes as Record<string, unknown>)
          : {},
      priceMode: data.price_mode,
      priceAmount: data.price_amount === null ? null : Number(data.price_amount),
      priceCurrency: data.price_currency,
      pricePeriod: data.price_period,
      priceBp: typeof data.price_bp === "number" ? data.price_bp : null,
      priceNegotiable: data.price_negotiable,
      posterExpiresAt:
        typeof data.poster_expires_at === "string" ? data.poster_expires_at.slice(0, 10) : null,
      contactPref:
        own["contact_pref"] !== null &&
        typeof own["contact_pref"] === "object" &&
        !Array.isArray(own["contact_pref"])
          ? (own["contact_pref"] as Record<string, unknown>)
          : { messages: true },
      pinLat: numOrNull(own["pin_lat"]),
      pinLng: numOrNull(own["pin_lng"]),
      pinPrecision: data.pin_precision,
      pinZoom: typeof data.pin_zoom === "number" ? data.pin_zoom : null,
      streetAddress: data.street_address,
      directions: typeof data.directions === "string" ? data.directions : null,
      photosSoon: data.photos_soon === true,
    },
    photos: (photos ?? []).map((row) => ({
      id: row.id,
      displayOrder: row.display_order,
      paths: (row.paths ?? null) as Record<string, unknown> | null,
      storagePath: row.storage_path,
    })),
  };
}

/** W6b-1 R4 — the places of the seller's most recent OTHER listing. */
export interface LastPlaces {
  /** The market the item place sits in. */
  country: string;
  /** The item place (`listings.location_id`) — a city or a sub-city. */
  itemId: string;
  /** Every place it showed in, item place first, in the item place's market only. */
  placeIds: string[];
  /** Bundle 2 Q4 — the last post's pin and its two text lines; null when it had no pin. */
  pin: LastPin | null;
}

export interface LastPin {
  lat: number;
  lng: number;
  precision: string;
  zoom: number | null;
  street: string | null;
  directions: string | null;
}

/**
 * B3 — the country of one place (the item's own, `coverage[0]`), from the same
 * public `locations` read the last-places prefill uses. `null` when unknown;
 * a failed read is logged and the contact step falls back to home ▸ market.
 */
export async function readPlaceCountry(placeId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("locations")
    .select("country_code")
    .eq("id", placeId)
    .maybeSingle();
  if (error) {
    console.error("[posting] reading the item place's country failed", error.message);
    return null;
  }
  return typeof data?.country_code === "string" ? data.country_code : null;
}

/**
 * W6b-1 R4 — THE LAST POST'S PLACES, for a NEW post's prefill. Filtered by
 * `seller_id` explicitly (INC-330): RLS also shows every ACTIVE listing, so the
 * filter — not the policy — keeps another seller's places out. A draft is not a
 * post yet, so only listings past the draft stage count; `excludeId` keeps the
 * draft on screen out. Only the place's `country_code` is read from
 * `locations` (the public read), so the step can open the right market; names
 * still come from the cached tree. A failure is simply no prefill (`null`).
 */
export async function readLastListingPlaces(excludeId: string | null): Promise<LastPlaces | null> {
  try {
    const { data: session } = await supabase.auth.getSession();
    const userId = session.session?.user.id ?? null;
    if (userId === null) return null;
    let query = supabase
      .from("listings")
      .select("id,location_id,created_at,pin_precision,pin_zoom,street_address,directions")
      .eq("seller_id", userId)
      .neq("status", "draft")
      .not("location_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(1);
    if (excludeId !== null) query = query.neq("id", excludeId);
    const { data: last, error } = await query.maybeSingle();
    if (error || last === null || last.location_id === null) return null;
    const { data: rows, error: rowError } = await supabase
      .from("listing_locations")
      .select("location_id,created_at,locations(country_code)")
      .eq("listing_id", last.id)
      .order("created_at", { ascending: true });
    if (rowError) return null;
    const countryOf = (row: { locations: unknown }) => {
      const place = row.locations as { country_code?: unknown } | null;
      return typeof place?.country_code === "string" ? place.country_code : null;
    };
    const item = (rows ?? []).find((row) => row.location_id === last.location_id);
    const country = item === undefined ? null : countryOf(item);
    if (country === null) return null;
    const others = (rows ?? [])
      .filter((row) => row.location_id !== last.location_id && countryOf(row) === country)
      .map((row) => row.location_id);
    const own = last.pin_precision === null ? null : await readOwnPrivate(last.id);
    const lat = own === null ? null : numOrNull(own["pin_lat"]);
    const lng = own === null ? null : numOrNull(own["pin_lng"]);
    const pin: LastPin | null =
      lat === null || lng === null || last.pin_precision === null
        ? null
        : {
            lat,
            lng,
            precision: last.pin_precision,
            zoom: last.pin_zoom ?? null,
            street: last.street_address ?? null,
            directions: last.directions ?? null,
          };
    return { country, itemId: last.location_id, placeIds: [last.location_id, ...others], pin };
  } catch {
    return null;
  }
}

/**
 * Bundle 2 step 15 (Q3) — the contact channels of the seller's last post, read
 * as `readLastListingPlaces` reads it: the seller's own, past the draft stage
 * (INC-330), newest first, this draft excluded. `null` when there is none;
 * a failed read throws (F4), the caller logs it.
 */
export async function readLastListingContact(
  excludeId: string | null,
): Promise<Record<string, unknown> | null> {
  const { data: session } = await supabase.auth.getSession();
  if ((session.session?.user.id ?? null) === null) return null;
  // INC-389 — contact_pref is private; the owner-only door reads the last post.
  const { data, error } = await supabase.rpc("my_last_listing_private", {
    p_exclude: excludeId ?? undefined,
  });
  if (error) throw new Error(error.message);
  const row = data !== null && typeof data === "object" && !Array.isArray(data) ? data : null;
  const pref = (row as Record<string, unknown> | null)?.["contact_pref"];
  if (pref === null || pref === undefined || typeof pref !== "object" || Array.isArray(pref)) {
    return null;
  }
  return pref as Record<string, unknown>;
}

/**
 * U6-C1b — ONE DEFINITION AS THE FORM NEEDS IT.
 *
 * The names are the door's own (`attr_key`, `attr_type`, `min_bound`), carried
 * across into camelCase ONCE here, so no control reads a snake_case key and no
 * control invents a field the read does not carry.
 */
export interface AttrDef {
  attributeId: string;
  attrKey: string;
  attrType: string;
  nameEn: string;
  nameAm: string | null;
  helpTextEn: string | null;
  helpTextAm: string | null;
  isRequired: boolean;
  unit: string | null;
  minBound: string | null;
  maxBound: string | null;
  decimals: number | null;
  format: string | null;
  preset: string | null;
  maxLength: number | null;
  optionCount: number;
  allowOther: boolean;
  /**
   * M-MAINT-2 §12 — the LINK's own narrowing and default: `allowedOptions` is the
   * subset of the definition's option values this category accepts (`null` = all),
   * and `defaultValue` prefills an empty field. The door narrows too
   * (`optionNotAllowed`), so this is a mirror (F3).
   */
  allowedOptions: string[] | null;
  defaultValue: unknown;
  /**
   * D24 (M-MAINT-3) — THE CONDITION THIS DETAIL HANGS ON: `{ key, in }` names a
   * SIBLING detail in the same category and the answers that make this one apply.
   * `null` = always asked. `validate_listing_attributes` treats an unmet link as
   * absent for `required` and DROPS any value sent for it, so the form's hiding
   * is a mirror of the door, never the authority (F3).
   */
  visibleWhen: { key: string; in: string[] } | null;
  /**
   * D46 — the link's card rank as `get_posting_schema` serves it (`card_rank`);
   * rank 1 is the leaf's identity. `null` = not a card.
   */
  cardRank: number | null;
}

/**
 * D22 (M-MAINT-3) — THE SELLER'S PLAN CAPS, as `get_posting_schema` reports them
 * through `seller_plan()`. `maxPhotos` is the ONE dial the photos step obeys; the
 * upload door counts for itself, so this is a mirror (F3).
 */
export interface PlanCaps {
  plan: string;
  maxCities: number | null;
  maxRegions: number | null;
  maxCountries: number | null;
  maxPhotos: number | null;
}

export interface PostingSchema {
  /** How many details this category asks for, and how many of them are required. */
  details: number;
  required: number;
  attributes: AttrDef[];
  /**
   * U6-C2a — the `category` block the read already carried and step 1 never used:
   * what the CATEGORY decides about price, period, poster window and
   * capabilities. The price step (4) mirrors every one of them (the door still decides).
   */
  category: CategoryFacts | null;
  /** D22 — the caller's own plan caps; `null` when the read carries no block. */
  plan: PlanCaps | null;
}

function str(row: Record<string, unknown>, key: string): string | null {
  const value = row[key];
  return typeof value === "string" && value !== "" ? value : null;
}

function int(row: Record<string, unknown>, key: string): number | null {
  const value = row[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function shapeDefinition(row: Record<string, unknown>): AttrDef {
  return {
    attributeId: str(row, "attribute_id") ?? "",
    attrKey: str(row, "attr_key") ?? "",
    attrType: str(row, "attr_type") ?? "text",
    nameEn: str(row, "name_en") ?? str(row, "attr_key") ?? "",
    nameAm: str(row, "name_am"),
    helpTextEn: str(row, "help_text_en"),
    helpTextAm: str(row, "help_text_am"),
    isRequired: row["is_required"] === true,
    unit: str(row, "unit"),
    minBound: str(row, "min_bound"),
    maxBound: str(row, "max_bound"),
    decimals: int(row, "decimals"),
    format: str(row, "format"),
    preset: str(row, "preset"),
    maxLength: int(row, "max_length"),
    optionCount: int(row, "option_count") ?? 0,
    allowOther: row["allow_other"] === true,
    allowedOptions: Array.isArray(row["allowed_options"])
      ? (row["allowed_options"] as unknown[]).filter(
          (entry): entry is string => typeof entry === "string",
        )
      : null,
    defaultValue: row["default_value"] ?? null,
    visibleWhen: shapeCondition(row["visible_when"]),
    cardRank: int(row, "card_rank"),
  };
}

/** DEC-109 — the door's `deal` block; a missing or malformed list reads as empty. */
function shapeDeal(raw: unknown): CategoryFacts["deal"] {
  const row =
    raw !== null && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {};
  const list = (key: string): string[] =>
    Array.isArray(row[key])
      ? (row[key] as unknown[]).filter((entry): entry is string => typeof entry === "string")
      : [];
  return {
    basis: list("basis"),
    size: list("size"),
    quantity: list("quantity"),
    terms: list("terms"),
  };
}

/** D24 — a condition is used ONLY when it carries both halves; anything else is
 * "always asked", so a malformed row can never hide a question silently. */
function shapeCondition(raw: unknown): { key: string; in: string[] } | null {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return null;
  const row = raw as Record<string, unknown>;
  const key = typeof row["key"] === "string" ? row["key"] : "";
  const values = Array.isArray(row["in"])
    ? (row["in"] as unknown[]).filter((entry): entry is string => typeof entry === "string")
    : [];
  if (key === "" || values.length === 0) return null;
  return { key, in: values };
}

/**
 * D11 — the posting schema for a leaf: the anon-callable public read. Step 1 uses
 * the counts to say what the form will ask for before the seller commits to the
 * category; step 3 builds every control from the definitions.
 * A failure is `null`; the caller shows its own caption rather than a stack.
 */
export async function readPostingSchema(categoryId: string): Promise<PostingSchema | null> {
  return (await readPostingSchemaAnswer(categoryId)).schema;
}

/**
 * INC-397 — the door counts schema reads (`rate_gate('schema_read')`) and raises
 * `rateLimited` past the dial; the details step says so in plain words instead
 * of "could not be loaded". `schema` is null on any failure.
 */
export async function readPostingSchemaAnswer(
  categoryId: string,
): Promise<{ schema: PostingSchema | null; rateLimited: boolean }> {
  const { data, error } = await supabase.rpc("get_posting_schema", {
    p_category_id: categoryId,
  });
  if (error) {
    const rateLimited = error.message.includes("rateLimited");
    if (!rateLimited) console.error("[posting] schema read failed:", error.message);
    return { schema: null, rateLimited };
  }
  return { schema: shapePostingSchema(data), rateLimited: false };
}

function shapePostingSchema(data: unknown): PostingSchema | null {
  if (data === null) return null;
  const payload = data as Record<string, unknown>;
  const definitions = Array.isArray(payload["attributes"])
    ? (payload["attributes"] as Record<string, unknown>[])
    : [];
  const attributes = definitions.map(shapeDefinition).filter((row) => row.attrKey !== "");
  const block = (payload["category"] ?? null) as Record<string, unknown> | null;
  const capabilities = Array.isArray(block?.["capabilities"])
    ? (block["capabilities"] as unknown[]).filter(
        (entry): entry is string => typeof entry === "string",
      )
    : [];
  const planBlock = (payload["plan"] ?? null) as Record<string, unknown> | null;
  return {
    details: attributes.length,
    required: attributes.filter((row) => row.isRequired).length,
    attributes,
    plan:
      planBlock === null
        ? null
        : {
            plan: str(planBlock, "plan") ?? "",
            maxCities: int(planBlock, "max_cities"),
            maxRegions: int(planBlock, "max_regions"),
            maxCountries: int(planBlock, "max_countries"),
            maxPhotos: int(planBlock, "max_photos"),
          },
    category:
      block === null
        ? null
        : {
            id: str(block, "id") ?? "",
            slug: str(block, "slug") ?? "",
            nameEn: str(block, "name_en") ?? "",
            priceEnabled: block["price_enabled"] !== false,
            defaultPricePeriod: str(block, "default_price_period") ?? "once",
            pricePeriodLocked: block["price_period_locked"] === true,
            expiryDays: int(block, "expiry_days"),
            capabilities,
            priceBasisKey: str(block, "price_basis_key"),
            deal: shapeDeal(block["deal"]),
          },
  };
}

/**
 * `POST /api/listings/assist` (DEC-072) — the writing assistant.
 *
 * GROUNDED-ONLY: the body carries the facts the seller already gave and nothing
 * else, and the answer is a SUGGESTION the seller may edit or discard. A provider
 * failure comes back as a refusal, so nothing is ever written from a guess (F4).
 */
export function requestAssist(body: {
  /** The draft, so the door can count this listing's five tries (U6-C1-R2). */
  listingId: string | null;
  categoryId: string;
  /** The chosen category's full path, in the seller's language. */
  categoryPath: string;
  attrs: Record<string, unknown>;
  /** Step 13 — deal facts only; the amount and the currency are never sent. */
  negotiable: boolean;
  period: string | null;
  locale: string;
  /** The first three stored photos (card variant) — the model may look at them. */
  photoUrls: string[];
  /** The seller's own draft; their words win over the model's phrasing. */
  title: string;
  description: string;
  /** Every suggestion already shown, so the next one takes a different angle. */
  previous: { title: string; description: string }[];
}): Promise<DoorAnswer> {
  return call("/api/listings/assist", JSON.stringify(body), {
    "Content-Type": "application/json",
  });
}

/**
 * U6-C2b — STEP 7's IDENTITY, read as the owner (`profiles_owner_read`).
 *
 * A seller who has posted before must not be asked again: the stored alias,
 * seller type, business name, channels and home country come back here so the
 * screen can CONFIRM them instead of demanding them (spec §4 B2 step 7).
 * `null` means the read itself failed — the screen says so rather than pretending
 * this is a first posting (F4).
 */
export interface SellerIdentity {
  alias: string | null;
  sellerType: string | null;
  businessName: string | null;
  /** D17 (M-MAINT-2 A) — the account's own name, never the public one. */
  firstName: string | null;
  lastName: string | null;
  contactPrefs: Record<string, unknown>;
  homeCountryCode: string | null;
  /** Bundle 3 step 12 — the seller confirmed it; publishing requires this. */
  homeCountryConfirmed: boolean;
  /** U6-C1-R2 — the account's own name, the source of the SUGGESTED alias. */
  displayName: string | null;
}

/** Bundle 3 step 20 — the seller line's facts, as `my_seller_line()` holds them. */
export interface SellerLineFacts {
  alias: string | null;
  previousAlias: string | null;
  memberSince: string | null;
  /**
   * Walk fix 3 (M4) — the change rule's two dates: the next allowed change,
   * and the end of the 24-hour correction window after a change. Both are
   * null before M4 and for a seller who has never named themselves.
   */
  nextChangeAt: string | null;
  correctionUntil: string | null;
}

/**
 * The signed-in seller's own line. `null` when nobody is signed in; a failed
 * read throws (F4) and the caller logs it.
 */
export async function readSellerLine(): Promise<SellerLineFacts | null> {
  const { data: session } = await supabase.auth.getSession();
  if ((session.session?.user.id ?? null) === null) return null;
  const { data, error } = await supabase.rpc("my_seller_line");
  if (error) throw new Error(error.message);
  const row =
    data !== null && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : {};
  const text = (key: string) => (typeof row[key] === "string" ? (row[key] as string) : null);
  return {
    alias: text("alias"),
    previousAlias: text("previous_alias"),
    memberSince: text("member_since"),
    nextChangeAt: text("next_change_at"),
    correctionUntil: text("correction_until"),
  };
}

export async function readSellerIdentity(): Promise<SellerIdentity | null> {
  const { data: session } = await supabase.auth.getUser();
  const userId = session.user?.id ?? null;
  if (userId === null) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "seller_alias,seller_type,business_name,first_name,last_name,contact_prefs,home_country_code,country_source,display_name",
    )
    .eq("user_id", userId)
    .maybeSingle();
  if (error) return null;
  if (!data) {
    return {
      alias: null,
      sellerType: null,
      businessName: null,
      firstName: null,
      lastName: null,
      contactPrefs: {},
      homeCountryCode: null,
      homeCountryConfirmed: false,
      displayName: null,
    };
  }
  return {
    alias: data.seller_alias ?? null,
    sellerType: data.seller_type ?? null,
    businessName: data.business_name ?? null,
    firstName: data.first_name ?? null,
    lastName: data.last_name ?? null,
    contactPrefs:
      data.contact_prefs !== null && typeof data.contact_prefs === "object"
        ? (data.contact_prefs as Record<string, unknown>)
        : {},
    homeCountryCode: data.home_country_code ?? null,
    homeCountryConfirmed: data.country_source === "user_confirmed",
    displayName: data.display_name ?? null,
  };
}

/**
 * `POST /api/listings/identity` — `save_posting_identity`, which is the only
 * authority on an alias (case-insensitive uniqueness AND the reserved list). The
 * screen mirrors the SHAPE so a plainly wrong alias costs no round trip; whether
 * an alias is FREE is a question only this door can answer (F3).
 *
 * Every field is optional and a missing one leaves the stored value alone, so the
 * availability check sends the alias alone and changes nothing else.
 */
export function saveIdentity(body: {
  alias?: string;
  sellerType?: string;
  businessName?: string | null;
  /** D17 — both travel to `p_first_name`/`p_last_name`; a missing one is silence. */
  firstName?: string | null;
  lastName?: string | null;
  contactPref?: unknown;
  homeCountryCode?: string;
}): Promise<DoorAnswer> {
  return call("/api/listings/identity", JSON.stringify(body), {
    "Content-Type": "application/json",
  });
}

/**
 * Bundle 3 step 19 — `POST /api/listings/alias`: `check_seller_alias` answers ok
 * or the refusal and writes nothing; the name is claimed by `saveIdentity` when
 * the contact step is saved.
 */
export function checkAlias(alias: string): Promise<DoorAnswer> {
  return call("/api/listings/alias", JSON.stringify({ alias }), {
    "Content-Type": "application/json",
  });
}

/**
 * Bundle 3 step 21 — three free names from the business name, else first and
 * last name. Walk fix 2 (M4) — the draft's category travels too, so a seller
 * without a Latin name is offered the category word instead of nothing.
 */
export async function suggestAliases(body: {
  businessName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  categoryId?: string | null;
}): Promise<string[]> {
  const answer = await call("/api/listings/alias", JSON.stringify({ ...body, suggest: true }), {
    "Content-Type": "application/json",
  });
  const list = answer.ok ? answer.payload["suggestions"] : null;
  return Array.isArray(list) ? list.filter((x): x is string => typeof x === "string") : [];
}

/**
 * Walk fix 5 (M4) — `change_home_country`: confirms a first country (stamping
 * nothing) or changes a confirmed one inside the 30-day rule; a change too
 * soon is refused `countryTooSoon` with the next allowed date as the detail.
 */
export function changeHomeCountry(code: string): Promise<DoorAnswer> {
  return call("/api/listings/identity", JSON.stringify({ homeCountryChange: code }), {
    "Content-Type": "application/json",
  });
}

/**
 * Walk fix 6 — every row of the countries table, for the home-country list.
 * The screen orders them: open markets first, then A–Z by the shown name.
 */
export interface CountryRow {
  code: string;
  nameEn: string;
  isActive: boolean;
}

export async function readCountries(): Promise<CountryRow[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("code,name_en,is_active")
    .order("name_en");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    code: row.code,
    nameEn: row.name_en,
    isActive: row.is_active,
  }));
}

/**
 * `POST /api/listings/publish` — `publish_listing`, which moves a complete draft
 * to SCREENING. Nothing goes live from here: D1 is the gateway that decides, and
 * "in review" is the honest word for what the seller has just done (DEC-065).
 */
export function publishListing(listingId: string): Promise<DoorAnswer> {
  return call("/api/listings/publish", JSON.stringify({ listingId }), {
    "Content-Type": "application/json",
  });
}

/**
 * Bundle 2 step 10 — THE TWO TEXT LINES the pin's door also writes. A call that
 * leaves out `p_street` or `p_directions` CLEARS that column (7423f49a), so every
 * call of `set_listing_pin` below states both from the draft's current values.
 */
export interface PlaceText {
  street: string | null;
  directions: string | null;
}

function textArgs(text: PlaceText) {
  return {
    p_street: text.street ?? undefined,
    p_directions: text.directions ?? undefined,
  };
}

/**
 * Bundle 4 step 15 — "PHOTOS COMING SOON": the owner-only door
 * `set_listing_photos_soon` (rate-gated, one revision row). The screen only
 * reflects what the door wrote; a failure is logged and returned (F4).
 */
export async function savePhotosSoon(listingId: string, on: boolean): Promise<boolean> {
  const { error } = await supabase.rpc("set_listing_photos_soon", {
    p_listing_id: listingId,
    p_on: on,
  });
  if (error !== null) {
    console.error("[photos-soon] set_listing_photos_soon refused:", error.message);
    return false;
  }
  return true;
}

/** The door's reason in the screen's words; anything else is a plain failure (F4). */
function pinAnswer(message: string): "contactInNote" | "failed" {
  console.error("[pin] set_listing_pin refused:", message);
  return message.includes("contactInNote") ? "contactInNote" : "failed";
}

/**
 * U6-C1-R3b-4 — THE PIN'S OWN DOOR: `set_listing_pin`.
 *
 * SECURITY DEFINER, owner-gated, and the only way the pin columns change. The
 * call carries the caller's own session, so a listing that is not this account's
 * is refused by the function, not by the screen.
 */
export async function savePin(
  listingId: string,
  lat: number,
  lng: number,
  precision: string,
  text: PlaceText,
  zoom: number | null = null,
): Promise<boolean> {
  // Part L — an omitted zoom keeps the zoom the pin was saved at.
  const { error } = await supabase.rpc("set_listing_pin", {
    p_listing_id: listingId,
    p_lat: lat,
    p_lng: lng,
    p_precision: precision,
    p_zoom: zoom ?? undefined,
    ...textArgs(text),
  });
  if (error !== null) {
    pinAnswer(error.message);
    return false;
  }
  return true;
}

/**
 * "Remove the pin": the coordinates are omitted (the door's DEFAULT NULL spells
 * "clear"); the text lines the caller wants kept are restated.
 */
export async function clearPin(listingId: string, text: PlaceText): Promise<boolean> {
  const { error } = await supabase.rpc("set_listing_pin", {
    p_listing_id: listingId,
    ...textArgs(text),
  });
  if (error !== null) {
    pinAnswer(error.message);
    return false;
  }
  return true;
}

/** W6b-2 B3 / step 10 — the draft's own location details and directions. */
export async function readPlaceText(listingId: string): Promise<PlaceText> {
  const { data, error } = await supabase
    .from("listings")
    .select("street_address,directions")
    .eq("id", listingId)
    .maybeSingle();
  if (error !== null) {
    console.error("[pin] place text read failed:", error.message);
    throw new Error(error.message);
  }
  return {
    street: typeof data?.street_address === "string" ? data.street_address : null,
    directions: typeof data?.directions === "string" ? data.directions : null,
  };
}

/**
 * W6b-2 B3 / step 10 — THE TEXT LINES THROUGH THE PIN'S OWN DOOR. With a pin,
 * the pin is re-sent unchanged beside them (zoom omitted, so it is kept);
 * without one, the coordinates are omitted and the door keeps the text alone.
 */
export async function savePlaceText(
  listingId: string,
  text: PlaceText,
  pin: { lat: number; lng: number; precision: string } | null,
): Promise<"saved" | "contactInNote" | "failed"> {
  const { error } = await supabase.rpc("set_listing_pin", {
    p_listing_id: listingId,
    ...(pin === null ? {} : { p_lat: pin.lat, p_lng: pin.lng, p_precision: pin.precision }),
    ...textArgs(text),
  });
  if (error !== null) return pinAnswer(error.message);
  return "saved";
}
