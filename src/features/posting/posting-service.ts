import { ReaderError, readerFailure } from "@/lib/reader-failure";
import { callRoute, uploadRoute, type RouteAnswer, type RoutePath } from "@/lib/route-client";
import { supabase } from "@/integrations/supabase/client";
import type { Certification } from "@/features/my-listings/my-listing";

import { createDoorQueue, type DoorQueue } from "./door-queue";
import type { CategoryFacts, DoorAnswer, Refusal } from "./types";
import { shapeCondition, type VisibleWhen } from "./visible-when";
import type { PlaceFact } from "./where-seed";

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
export function mayResumePosting(status: string): boolean {
  return status === "draft";
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

const UNREACHABLE: DoorAnswer = {
  status: 0,
  ok: false,
  refusals: [],
  payload: {},
  unreachable: true,
};

/**
 * THE ONE ADAPTER from the route client's answer to a door's. A 5xx is not a
 * verdict, it is a failure to reach one — the caller retries rather than
 * showing a refusal that nobody made. A 200 with `ok:false` IS a verdict,
 * refusals and all, and a 401/403/409 is one too (the route names the field),
 * so only the server's own breakage counts as unreachable.
 */
function doorAnswerOf(answer: RouteAnswer): DoorAnswer {
  // Today's no-token answer: the route would have 401'd, so the call never left.
  if (answer.kind === "signedOut") return { ...UNREACHABLE, status: 401 };
  // Offline, blocked, aborted: NOT a refusal. The caller keeps the form state
  // in memory and retries (C4 — never a blank screen, never a phantom).
  if (answer.kind === "unreachable") return UNREACHABLE;
  const payload = answer.payload ?? {};
  return {
    status: answer.status,
    ok: payload["ok"] === true,
    refusals: refusalsOf(payload),
    payload,
    unreachable: answer.status >= 500,
  };
}

/**
 * DEC-135 / INC-439 — a save that hangs is a transport failure, not a wait
 * without end: after this many milliseconds the fetch is aborted and the call
 * answers UNREACHABLE ("unsaved"), retried by the next edit.
 */
export const SAVE_TIMEOUT_MS = 30_000;

export async function call(
  path: string,
  body: BodyInit,
  headers: HeadersInit,
): Promise<DoorAnswer> {
  // Every caller posts a JSON string; the route client sets its Content-Type.
  void headers;
  const answer = await callRoute(path as RoutePath, {
    json: JSON.parse(String(body)) as unknown,
    timeoutMs: SAVE_TIMEOUT_MS,
  });
  return doorAnswerOf(answer);
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
 * `POST /api/upload/photo` — the four device-encoded variants, multipart (D162
 * added the middle size, `mid`).
 *
 * XHR rather than `fetch`, for ONE reason: `fetch` cannot report upload
 * progress, and on a slow Ethiopian mobile connection a photo tile that sits at
 * "Sending…" with no number is indistinguishable from a stuck one. The progress
 * here is the browser's real byte count, not an animation.
 *
 * D154 B2 — `replaces` names a stored photo of this listing: the upload is that
 * photo turned or cropped in the editor, and takes its place in the order once
 * it passes every check; a refusal leaves the old photo as it was.
 */
export async function uploadPhoto(
  listingId: string,
  variants: { cover: Blob; mid: Blob; card: Blob; thumb: Blob },
  extension: string,
  onProgress?: (percent: number) => void,
  replaces?: string,
  certification?: Certification,
): Promise<DoorAnswer> {
  const form = new FormData();
  form.set("listingId", listingId);
  if (replaces !== undefined) form.set("replaces", replaces);
  if (certification !== undefined) {
    form.set("certified", certification.certified.join(","));
    form.set("language", certification.language);
  }
  for (const variant of ["cover", "mid", "card", "thumb"] as const) {
    // No Content-Type header: the browser sets the multipart boundary itself.
    form.set(variant, variants[variant], `${variant}.${extension}`);
  }

  const answer = await uploadRoute("/api/upload/photo", form, {
    onProgress: onProgress
      ? (loaded, total) => onProgress(Math.min(99, Math.round((loaded / total) * 100)))
      : undefined,
  });
  return doorAnswerOf(answer);
}

/** Bundle 13 turn 12 (D155b / D159) — the background tool's answer. */
export type BackgroundAnswer =
  | { ok: true; picture: Blob; triesLeft: number | null }
  | { ok: false; reason: string; unreachable: boolean };

/** The provider can take a few seconds; past this the call is a transport failure. */
export const BACKGROUND_TIMEOUT_MS = 60_000;

/**
 * `POST /api/listings/background { listingId, photoId }` — the cover's cut-out as
 * an image, with the ad's tries left (`x-tries-left`), or a refusal by name.
 * Nothing is stored by this call: Keep sends the picture through `uploadPhoto`
 * with `replaces`.
 */
export async function removeBackground(
  listingId: string,
  photoId: string,
): Promise<BackgroundAnswer> {
  const answer = await callRoute("/api/listings/background", {
    json: { listingId, photoId },
    timeoutMs: BACKGROUND_TIMEOUT_MS,
    expect: "bytes",
  });
  if (answer.kind !== "answered") return { ok: false, reason: "", unreachable: true };
  const type = answer.headers.get("content-type") ?? "";
  if (answer.ok && type.startsWith("image/") && answer.bytes !== null) {
    const left = Number(answer.headers.get("x-tries-left"));
    return {
      ok: true,
      picture: answer.bytes,
      triesLeft: Number.isInteger(left) && left >= 0 ? left : null,
    };
  }
  const reason = refusalsOf(answer.payload ?? {})[0]?.reason ?? "";
  return { ok: false, reason, unreachable: reason === "" || answer.status >= 500 };
}

/** `POST /api/listings/photos/$id { action: 'cover' }`. */
export function setCoverPhoto(photoId: string): Promise<DoorAnswer> {
  return call(`/api/listings/photos/${photoId}`, JSON.stringify({ action: "cover" }), {
    "Content-Type": "application/json",
  });
}

/**
 * D154 — `POST /api/listings/photos/$id { action: 'move', position }`: the photo to
 * that place in the order (0 = first, the cover; a place past the end means last).
 */
export function movePhoto(photoId: string, position: number): Promise<DoorAnswer> {
  return call(`/api/listings/photos/${photoId}`, JSON.stringify({ action: "move", position }), {
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
  /** D158 — stored while photo screening was off: shown to no buyer until staff approve the ad. */
  unscreened?: boolean;
  /** D154 B3 — the screen's warnings (`not_relevant`), read by the seller and staff only. */
  warnings?: string[];
  /**
   * Bundle 16 turn 4a/4b (D178) — why the photo is hidden from buyers, while a
   * person has not decided (`listing_photo_reviews`, read by the seller and staff
   * only); null once decided or when the photo was never held back.
   */
  review?: PhotoReviewMark | null;
}

/** D178 — the labels of a photo kept hidden for a person. */
export const PHOTO_REVIEW_LABELS = ["unsure", "not_right", "fail", "held"] as const;

export type PhotoReviewLabel = (typeof PHOTO_REVIEW_LABELS)[number];

export interface PhotoReviewMark {
  label: PhotoReviewLabel;
  /** A fail's code (the screen's refusal code); null for every other label. */
  code: string | null;
  /** The screen's short phrase (English, the model's words): staff read it as text only. */
  evidence: string | null;
}

/**
 * D154 B3 — the photo row's selected columns, with its warnings embedded.
 * Bundle 16 turn 4b — and its review (D178).
 */
export const PHOTO_ROW_SELECT =
  "id,display_order,paths,storage_path,unscreened,warning:listing_photo_warnings(codes),review:listing_photo_reviews(label,code,evidence,decided_at)";

/**
 * Bundle 16 turn 4b (D178) — an embedded `listing_photo_reviews` row, read as an
 * object or a one-item list: an open review with a known label, or null (none,
 * decided, or unreadable).
 */
export function photoReviewOf(embedded: unknown): PhotoReviewMark | null {
  const row = Array.isArray(embedded) ? embedded[0] : embedded;
  if (row === null || typeof row !== "object") return null;
  const raw = row as Record<string, unknown>;
  const label = raw["label"];
  if (typeof label !== "string" || !(PHOTO_REVIEW_LABELS as readonly string[]).includes(label)) {
    return null;
  }
  if (raw["decided_at"] !== null && raw["decided_at"] !== undefined) return null;
  return {
    label: label as PhotoReviewLabel,
    code: typeof raw["code"] === "string" ? raw["code"] : null,
    evidence: typeof raw["evidence"] === "string" ? raw["evidence"] : null,
  };
}

/**
 * Bundle 16 turn 4b (D158, D178) — a photo held while photo checking was off: it
 * is approved with the ad. A hidden photo with no review row was held before
 * turn 4a; a photo the check judged waits for its own decision.
 */
export function heldWithAd(row: Pick<DraftPhotoRow, "unscreened" | "review">): boolean {
  return row.unscreened === true && (row.review == null || row.review.label === "held");
}

/**
 * D154 B3 — the codes of an embedded `listing_photo_warnings` row: one row per
 * photo (or none), read as an object or a one-item list; anything else is none.
 */
export function photoWarningsOf(embedded: unknown): string[] {
  const row = Array.isArray(embedded) ? embedded[0] : embedded;
  if (row === null || typeof row !== "object") return [];
  const codes = (row as Record<string, unknown>)["codes"];
  return Array.isArray(codes)
    ? codes.filter((code): code is string => typeof code === "string")
    : [];
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
    .select(PHOTO_ROW_SELECT)
    .eq("listing_id", listingId)
    .order("display_order", { ascending: true });
  if (photoError) throw new Error(photoError.message);

  // The coverage rows are the seller's own (`listing_locations` is scoped by the
  // listing's owner), read by the door's own `position` (M10), then created_at,
  // then id: the FIRST row is the item's own place — position 1, by the column.
  const { data: places, error: placeError } = await supabase
    .from("listing_locations")
    .select("location_id,created_at")
    .eq("listing_id", listingId)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });
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
    photos: (photos ?? []).map(photoRowOf),
  };
}

/**
 * Bundle 17 turn 2 — one `listing_photos` row as the grid reads it (the columns
 * of `PHOTO_ROW_SELECT`), shared by the owner's read above and the staff's
 * edit read (use-edit-draft.ts), so the two cannot disagree about a photo.
 */
export function photoRowOf(row: {
  id: string;
  display_order: number;
  paths: unknown;
  storage_path: string | null;
  unscreened: boolean | null;
  warning: unknown;
  review: unknown;
}): DraftPhotoRow {
  return {
    id: row.id,
    displayOrder: row.display_order,
    paths: (row.paths ?? null) as Record<string, unknown> | null,
    storagePath: row.storage_path,
    unscreened: row.unscreened === true,
    warnings: photoWarningsOf(row.warning),
    review: photoReviewOf(row.review),
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
  /**
   * Bundle 4 step 18 (turn 6 item 5) — a saved place's street line and
   * directions when it holds no pin; absent for a last post.
   */
  lines?: { street: string | null; directions: string | null };
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
      .order("position", { ascending: true })
      .order("created_at", { ascending: true })
      .order("id", { ascending: true });
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
 * Bundle 4 step 18 — "This is also my shop or office": the seller's saved place,
 * through the owner-only doors (the table has no client access). `null` = none.
 * A failed read throws (F4); the caller logs it and falls back to the last post.
 */
export interface SellerPlace {
  locationId: string;
  pin: { lat: number; lng: number; precision: string; zoom: number | null } | null;
  street: string | null;
  directions: string | null;
}

/**
 * Bundle 7 D2 — THE CALLER'S RECENT CATEGORIES (my_recent_categories, M10): the
 * ordered ids of the leaves the seller published in, or null on any failure.
 */
export async function readRecentCategories(): Promise<string[] | null> {
  try {
    const { data, error } = await supabase.rpc("my_recent_categories");
    if (error) {
      console.error("[recent-categories] read refused", error.message);
      return null;
    }
    const list =
      data !== null && typeof data === "object" && !Array.isArray(data)
        ? (data as Record<string, unknown>)["categories"]
        : null;
    if (!Array.isArray(list)) return null;
    return list.flatMap((entry) => {
      const id = (entry as Record<string, unknown> | null)?.["id"];
      return typeof id === "string" ? [id] : [];
    });
  } catch (cause) {
    console.error("[recent-categories] read threw", cause);
    return null;
  }
}

/**
 * Bundle 7 D3 — the facts of the draft's own saved places (country, level and
 * chain), so the place step can seed from them whatever market is on screen.
 * `null` on any failure (logged): the step then behaves as it did before.
 */
export async function readPlaceFacts(ids: string[]): Promise<PlaceFact[] | null> {
  if (ids.length === 0) return [];
  try {
    const { data, error } = await supabase
      .from("locations")
      .select("id,country_code,level,region_id,city_id,parent_id,is_active")
      .in("id", ids)
      .order("id", { ascending: true });
    if (error) {
      console.error("[place-facts] read refused", error.message);
      return null;
    }
    return (data ?? []).map((row) => ({
      id: row.id,
      country: row.country_code,
      level: row.level,
      regionId: row.region_id,
      cityId: row.city_id,
      parentId: row.parent_id,
      active: row.is_active,
    }));
  } catch (error) {
    console.error("[place-facts] read failed", error);
    return null;
  }
}

export async function readSellerPlace(): Promise<SellerPlace | null> {
  const { data, error } = await supabase.rpc("my_seller_place");
  if (error) throw new Error(error.message);
  const row =
    data !== null && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : null;
  if (row === null || typeof row["location_id"] !== "string") return null;
  const lat = numOrNull(row["pin_lat"]);
  const lng = numOrNull(row["pin_lng"]);
  const precision = typeof row["pin_precision"] === "string" ? row["pin_precision"] : null;
  const text = (key: string) => (typeof row[key] === "string" ? (row[key] as string) : null);
  return {
    locationId: row["location_id"],
    pin:
      lat === null || lng === null || precision === null
        ? null
        : { lat, lng, precision, zoom: numOrNull(row["pin_zoom"]) },
    street: text("street_address"),
    directions: text("directions"),
  };
}

/** The saved place as the prefill reads a last post: one place, its pin and lines. */
export async function sellerPlaceAsLast(place: SellerPlace): Promise<LastPlaces | null> {
  const country = await readPlaceCountry(place.locationId);
  if (country === null) return null;
  return {
    country,
    itemId: place.locationId,
    placeIds: [place.locationId],
    pin:
      place.pin === null
        ? null
        : { ...place.pin, street: place.street, directions: place.directions },
    ...(place.pin === null && (place.street !== null || place.directions !== null)
      ? { lines: { street: place.street, directions: place.directions } }
      : {}),
  };
}

/** Ticking saves the listing's first place, pin and lines; `false` = refused (logged). */
export async function saveSellerPlace(listingId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("save_seller_place", { p_listing_id: listingId });
  const ok =
    error === null &&
    data !== null &&
    typeof data === "object" &&
    (data as Record<string, unknown>)["ok"] === true;
  if (!ok) console.error("[seller-place] save refused:", error?.message ?? JSON.stringify(data));
  return ok;
}

/** Unticking clears the saved place; `false` = refused (logged). */
export async function clearSellerPlace(): Promise<boolean> {
  const { error } = await supabase.rpc("clear_seller_place");
  if (error !== null) console.error("[seller-place] clear refused:", error.message);
  return error === null;
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
  /** B19 M2 — the link's filter flag, which the key-facts fallback needs (`is_filterable`). */
  isFilterable: boolean;
  unit: string | null;
  /** Bundle 5 C6 — the Amharic unit; empty or absent prints the English one. */
  unitAm?: string | null;
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
   * D24 (M-MAINT-3, INC-381) — THE CONDITION THIS DETAIL HANGS ON: `{ key, in }`
   * (with an optional `and` pair) names a
   * SIBLING detail in the same category and the answers that make this one apply.
   * `null` = always asked. `validate_listing_attributes` treats an unmet link as
   * absent for `required` and DROPS any value sent for it, so the form's hiding
   * is a mirror of the door, never the authority (F3).
   */
  visibleWhen: VisibleWhen | null;
  /**
   * D46 — the link's card rank as `get_posting_schema` serves it (`card_rank`);
   * rank 1 is the leaf's identity. `null` = not a card.
   */
  cardRank: number | null;
  /** D201 §4 (B19 M2) — the link's key-facts rank 1–4, as `get_posting_schema` and `public_listing_json` serve it (`fact_rank`); null when none. */
  factRank: number | null;
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
    isFilterable: row["is_filterable"] === true,
    unit: str(row, "unit"),
    unitAm: str(row, "unit_am"),
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
    factRank: int(row, "fact_rank"),
  };
}

/** DEC-109 — the door's `deal` block; a missing or malformed list reads as empty. */
export function shapeDeal(raw: unknown): CategoryFacts["deal"] {
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

/**
 * K5 — a payload without its question list is a FAILED read (`null`), never an
 * empty list: under rule 1 an empty list would drop every answer the draft holds.
 * An empty ARRAY stays an empty list (a category with no questions).
 */
export function shapePostingSchema(data: unknown): PostingSchema | null {
  if (data === null || typeof data !== "object") return null;
  const payload = data as Record<string, unknown>;
  if (!Array.isArray(payload["attributes"])) return null;
  const definitions = payload["attributes"] as Record<string, unknown>[];
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
  /** The first three stored photos, by id: the server reads and signs them (INC-588, D151). */
  photoIds: string[];
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
 * Bundle 18 turn 1 (INC-669) — `GET /api/listings/assist?listingId=<id>`: the
 * writing budget's true remaining for the seller's own ad, nothing spent. Null
 * when the route could not say (offline, a refusal, no session): the screen then
 * keeps its own count, as before.
 */
export async function peekAssist(listingId: string): Promise<number | null> {
  const token = await bearer();
  if (token === null) return null;
  try {
    const response = await fetch(
      `/api/listings/assist?listingId=${encodeURIComponent(listingId)}`,
      { method: "GET", headers: { Authorization: `Bearer ${token}` } },
    );
    const answer = await readAnswer(response);
    const left = answer.ok ? answer.payload["triesLeft"] : null;
    return typeof left === "number" && Number.isInteger(left) && left >= 0 ? left : null;
  } catch {
    return null;
  }
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
  if (error) throw new ReaderError(readerFailure(error));
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
export function publishListing(
  listingId: string,
  certification?: { certified: string[]; language: string },
): Promise<DoorAnswer> {
  const body =
    certification === undefined
      ? { listingId }
      : { listingId, certified: certification.certified, language: certification.language };
  return call("/api/listings/publish", JSON.stringify(body), {
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
function pinAnswer(message: string): "contactInNote" | "rateLimited" | "failed" {
  console.error("[pin] set_listing_pin refused:", message);
  if (message.includes("contactInNote")) return "contactInNote";
  // M9b / INC-444 — the revise dial refuses by exception naming rateLimited.
  return message.includes("rateLimited") ? "rateLimited" : "failed";
}

const pinQueues = new Map<string, DoorQueue>();

/**
 * INC-526 (bundle 11 turn C9) — A DRAFT'S PIN-DOOR CALLS RUN ONE AT A TIME, through
 * one queue per draft shared by the place step and the wizard. Every call below
 * restates the lines it does not change, so a caller builds what it restates
 * inside its queued job, when the job runs (src/features/posting/door-queue.ts).
 */
export function pinDoorQueue(listingId: string): DoorQueue {
  let queue = pinQueues.get(listingId);
  if (queue === undefined) {
    queue = createDoorQueue();
    pinQueues.set(listingId, queue);
  }
  return queue;
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
): Promise<"saved" | "contactInNote" | "rateLimited" | "failed"> {
  const { error } = await supabase.rpc("set_listing_pin", {
    p_listing_id: listingId,
    ...(pin === null ? {} : { p_lat: pin.lat, p_lng: pin.lng, p_precision: pin.precision }),
    ...textArgs(text),
  });
  if (error !== null) return pinAnswer(error.message);
  return "saved";
}
