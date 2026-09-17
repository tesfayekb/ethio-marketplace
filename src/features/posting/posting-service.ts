import { supabase } from "@/integrations/supabase/client";

import type { DoorAnswer, Refusal } from "./types";

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
): Promise<{ draft: DraftRow; photos: DraftPhotoRow[] } | null> {
  const { data, error } = await supabase
    .from("listings")
    .select("id,category_id,draft_step,status,title,description,video_url,attributes")
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

  return {
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
 * D11 — the posting schema for a leaf: the anon-callable public read, so step 1
 * can say what the form will ask for before the seller commits to the category.
 * A failure is `null`; the caller shows its own caption rather than a stack.
 */
export async function readPostingSchema(categoryId: string): Promise<{
  details: number;
  required: number;
  raw: unknown;
} | null> {
  const { data, error } = await supabase.rpc("get_posting_schema", {
    p_category_id: categoryId,
  });
  if (error || data === null) return null;
  const payload = data as Record<string, unknown>;
  const definitions = Array.isArray(payload["attributes"])
    ? (payload["attributes"] as Record<string, unknown>[])
    : [];
  return {
    details: definitions.length,
    required: definitions.filter((row) => row["is_required"] === true).length,
    raw: data,
  };
}
