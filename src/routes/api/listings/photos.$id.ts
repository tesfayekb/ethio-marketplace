import { createFileRoute } from "@tanstack/react-router";
import { doorRefusal } from "@/features/posting/door-error";

import { deleteObject, objectRefsOf } from "@/server/media/storage";
import {
  consumeRate,
  envDial,
  logRouteError,
  readJsonBody,
  refusal,
  refuseUserClient,
  routeJson,
  upstreamFailed,
  upstreamUnavailable,
  userClientFromRequest,
} from "@/server/supabase/user-client";
import { errorText } from "@/lib/error-text";

/**
 * U6-B1 — THE PHOTO'S OWN ROUTE.
 *
 *   DELETE /api/listings/photos/$id            — remove the photo
 *   POST   /api/listings/photos/$id  { action: 'cover' }  — make it the cover
 *   POST   /api/listings/photos/$id  { action: 'move', position }  — D154: put it
 *          at that place in the order (0 = first, the cover; past the end = last)
 *
 * SCOPE NOTE (A1): the brief names ONE file for both verbs, so the cover action
 * is the POST on this same path rather than a `…/cover` child route, which would
 * be a second route file outside the named scope. The body names the action, so
 * a later child route can be added without changing the contract.
 *
 * The doors (`remove_listing_photo`, `set_cover_photo`, `move_listing_photo`) are
 * the authority: each checks `seller_id = auth.uid()` itself, and each is called
 * AS THE CALLER.
 * Storage cleanup runs only after the caller-scoped door has answered ok.
 */

const PATH = "/api/listings/photos/$id";

async function ownedPhoto(
  supabase: NonNullable<Awaited<ReturnType<typeof userClientFromRequest>>["supabase"]>,
  photoId: string,
  userId: string,
) {
  // Read both rows AS THE CALLER and explicitly compare the listing's owner:
  // public photo visibility is not ownership, regardless of the policy used.
  const { data, error } = await supabase
    .from("listing_photos")
    .select("id, listing_id, paths, storage_path")
    .eq("id", photoId)
    .maybeSingle();
  if (error) throw new Error(`photo read: ${error.message}`);
  if (!data) return null;
  const { data: listing, error: listingError } = await supabase
    .from("listings")
    .select("seller_id")
    .eq("id", data.listing_id)
    .maybeSingle();
  if (listingError) throw new Error(`listing read: ${listingError.message}`);
  if (listing?.seller_id !== userId) return null;
  return data;
}

async function handleDelete(request: Request, photoId: string): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;
  const supabase = caller.supabase;
  const userId = caller.userId;
  if (!supabase || !userId) return refusal("id", "notYourListing");

  // Bundle 16 turn S1 (the operator, 2026-10-15) — removals have their own limit per
  // seller across every ad, an hour and a day, as uploads do: an add-and-remove loop
  // is bounded on both sides.
  const rate = await consumeRate(
    "photo-remove",
    userId,
    envDial("RATE_LIMIT_PHOTO_REMOVE_PER_HOUR", 30),
    "1 hour",
  );
  if (!rate.allowed) return refusal("photos", "rateLimited", rate.resetsAt ?? undefined);
  const daily = await consumeRate(
    "photo-remove:day",
    userId,
    envDial("RATE_LIMIT_PHOTO_REMOVE_PER_DAY", 100),
    "1 day",
  );
  if (!daily.allowed) return refusal("photos", "rateLimited", daily.resetsAt ?? undefined);

  const photo = await ownedPhoto(supabase, photoId, userId);
  if (!photo) {
    return routeJson({ ok: false, refusals: [{ field: "id", reason: "notYourListing" }] }, 403);
  }

  const { data, error, status } = await supabase.rpc("remove_listing_photo", {
    p_listing_id: photo.listing_id,
    p_photo_id: photoId,
  });
  // INC-574 — the door was never reached: 503, not a refusal.
  if (upstreamFailed(error, status)) {
    return upstreamUnavailable(PATH, "remove_listing_photo", status);
  }
  if (error) {
    logRouteError(PATH, `remove: ${error.message}`);
    return routeJson({ ok: false, refusals: [doorRefusal(error.message)] }, 200);
  }
  if (data && typeof data === "object" && !Array.isArray(data) && data["ok"] === true) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    for (const ref of objectRefsOf(photo.paths, photo.storage_path)) {
      try {
        await deleteObject(supabaseAdmin, ref.partition, ref.key);
      } catch (error) {
        // The door has completed the removal; log each cleanup failure without
        // turning that completed action into a refusal (the upload replace order).
        logRouteError(PATH, `object delete ${ref.key}: ${errorText(error)}`);
      }
    }
  }
  return routeJson(data, 200);
}

async function handlePost(request: Request, photoId: string): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;
  const supabase = caller.supabase;
  const userId = caller.userId;
  if (!supabase || !userId) return refusal("id", "notYourListing");

  const body = await readJsonBody(request);
  const action = body["action"] ?? "cover";
  if (action !== "cover" && action !== "move") {
    return refusal("action", "badValue");
  }
  // D154 — a place is a whole number from 0; the door closes a place past the end to the last.
  const position = body["position"];
  if (
    action === "move" &&
    (typeof position !== "number" || !Number.isInteger(position) || position < 0 || position > 999)
  ) {
    return refusal("position", "badValue");
  }

  const photo = await ownedPhoto(supabase, photoId, userId);
  if (!photo) {
    return routeJson({ ok: false, refusals: [{ field: "id", reason: "notYourListing" }] }, 403);
  }

  const door = action === "move" ? "move_listing_photo" : "set_cover_photo";
  const { data, error, status } =
    action === "move"
      ? await supabase.rpc("move_listing_photo", {
          p_listing_id: photo.listing_id,
          p_photo_id: photoId,
          p_position: position as number,
        })
      : await supabase.rpc("set_cover_photo", {
          p_listing_id: photo.listing_id,
          p_photo_id: photoId,
        });
  // INC-574 — the door was never reached: 503, not a refusal.
  if (upstreamFailed(error, status)) return upstreamUnavailable(PATH, door, status);
  if (error) {
    logRouteError(PATH, `${action}: ${error.message}`);
    return routeJson({ ok: false, refusals: [doorRefusal(error.message)] }, 200);
  }
  return routeJson(data, 200);
}

export const Route = createFileRoute("/api/listings/photos/$id")({
  server: {
    handlers: {
      DELETE: async ({ request, params }) => {
        try {
          return await handleDelete(request, params.id);
        } catch (error) {
          logRouteError(PATH, error);
          return routeJson({ error: "server error" }, 500);
        }
      },
      POST: async ({ request, params }) => {
        try {
          return await handlePost(request, params.id);
        } catch (error) {
          logRouteError(PATH, error);
          return routeJson({ error: "server error" }, 500);
        }
      },
    },
  },
});
