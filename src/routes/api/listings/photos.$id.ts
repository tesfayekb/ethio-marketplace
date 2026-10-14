import { createFileRoute } from "@tanstack/react-router";
import { doorRefusal } from "@/features/posting/door-error";

import { deleteObject, objectRefsOf } from "@/server/media/storage";
import {
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
 * The route's only extra work is the storage objects, deleted BEFORE the row so
 * a failure leaves a row pointing at nothing rather than an unreachable object.
 */

const PATH = "/api/listings/photos/$id";

async function ownedPhoto(
  supabase: NonNullable<Awaited<ReturnType<typeof userClientFromRequest>>["supabase"]>,
  photoId: string,
) {
  // Read AS THE CALLER: `listing_photos_seller_read` means a photo that is not
  // the caller's simply is not there (F3).
  const { data, error } = await supabase
    .from("listing_photos")
    .select("id, listing_id, paths, storage_path")
    .eq("id", photoId)
    .maybeSingle();
  if (error) throw new Error(`photo read: ${error.message}`);
  return data;
}

async function handleDelete(request: Request, photoId: string): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;
  const supabase = caller.supabase!;

  const photo = await ownedPhoto(supabase, photoId);
  if (!photo) {
    return routeJson({ ok: false, refusals: [{ field: "id", reason: "notYourListing" }] }, 403);
  }

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  for (const ref of objectRefsOf(photo.paths, photo.storage_path)) {
    try {
      await deleteObject(supabaseAdmin, ref.partition, ref.key);
    } catch (error) {
      // The object is gone or unreachable; the row must still go, so the failure
      // is named rather than swallowed (F4) and the removal continues.
      logRouteError(PATH, `object delete ${ref.key}: ${errorText(error)}`);
    }
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
  return routeJson(data, 200);
}

async function handlePost(request: Request, photoId: string): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;
  const supabase = caller.supabase!;

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

  const photo = await ownedPhoto(supabase, photoId);
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
