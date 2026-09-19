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
  /** U6-C2a — step 5's stored answers, so a resume opens on what was saved. */
  priceMode: string | null;
  priceAmount: number | null;
  priceCurrency: string | null;
  pricePeriod: string | null;
  /** The stored timestamptz, trimmed to the `YYYY-MM-DD` the date field holds. */
  posterExpiresAt: string | null;
  /** U6-C2b — step 7's stored channels, in `listing_contact_refusals` shape. */
  contactPref: Record<string, unknown>;
}

export interface DraftPhotoRow {
  id: string;
  displayOrder: number;
  paths: Record<string, unknown> | null;
  storagePath: string | null;
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
      "id,category_id,draft_step,status,title,description,video_url,attributes,price_mode,price_amount,price_currency,price_period,poster_expires_at,contact_pref",
    )
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;

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
      posterExpiresAt:
        typeof data.poster_expires_at === "string" ? data.poster_expires_at.slice(0, 10) : null,
      contactPref:
        data.contact_pref !== null && typeof data.contact_pref === "object"
          ? (data.contact_pref as Record<string, unknown>)
          : { messages: true },
    },
    photos: (photos ?? []).map((row) => ({
      id: row.id,
      displayOrder: row.display_order,
      paths: (row.paths ?? null) as Record<string, unknown> | null,
      storagePath: row.storage_path,
    })),
  };
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
  helpTextEn: string | null;
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
}

export interface PostingSchema {
  /** How many details this category asks for, and how many of them are required. */
  details: number;
  required: number;
  attributes: AttrDef[];
  /**
   * U6-C2a — the `category` block the read already carried and step 1 never used:
   * what the CATEGORY decides about price, period, poster window and
   * capabilities. Step 5 mirrors every one of them (the door still decides).
   */
  category: CategoryFacts | null;
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
    helpTextEn: str(row, "help_text_en"),
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
  };
}

/**
 * D11 — the posting schema for a leaf: the anon-callable public read. Step 1 uses
 * the counts to say what the form will ask for before the seller commits to the
 * category; step 3 builds every control from the definitions.
 * A failure is `null`; the caller shows its own caption rather than a stack.
 */
export async function readPostingSchema(categoryId: string): Promise<PostingSchema | null> {
  const { data, error } = await supabase.rpc("get_posting_schema", {
    p_category_id: categoryId,
  });
  if (error || data === null) return null;
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
  return {
    details: attributes.length,
    required: attributes.filter((row) => row.isRequired).length,
    attributes,
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
  /** U6-C1-R2 — the account's own name, the source of the SUGGESTED alias. */
  displayName: string | null;
}

export async function readSellerIdentity(): Promise<SellerIdentity | null> {
  const { data: session } = await supabase.auth.getUser();
  const userId = session.user?.id ?? null;
  if (userId === null) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "seller_alias,seller_type,business_name,first_name,last_name,contact_prefs,home_country_code,display_name",
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
 * `POST /api/listings/publish` — `publish_listing`, which moves a complete draft
 * to SCREENING. Nothing goes live from here: D1 is the gateway that decides, and
 * "in review" is the honest word for what the seller has just done (DEC-065).
 */
export function publishListing(listingId: string): Promise<DoorAnswer> {
  return call("/api/listings/publish", JSON.stringify({ listingId }), {
    "Content-Type": "application/json",
  });
}
