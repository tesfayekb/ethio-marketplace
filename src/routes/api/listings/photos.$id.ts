import { createFileRoute } from "@tanstack/react-router";

import { deleteObject, type Partition } from "@/server/media/storage";
import {
  logRouteError,
  readJsonBody,
  refusal,
  refuseUserClient,
  routeJson,
  userClientFromRequest,
} from "@/server/supabase/user-client";

/**
 * U6-B1 — THE PHOTO'S OWN ROUTE.
 *
 *   DELETE /api/listings/photos/$id            — remove the photo
 *   POST   /api/listings/photos/$id  { action: 'cover' }  — make it the cover
 *
 * SCOPE NOTE (A1): the brief names ONE file for both verbs, so the cover action
 * is the POST on this same path rather than a `…/cover` child route, which would
 * be a second route file outside the named scope. The body names the action, so
 * a later child route can be added without changing the contract.
 *
 * The doors (`remove_listing_photo`, `set_cover_photo`) are the authority: both
 * check `seller_id = auth.uid()` themselves, and both are called AS THE CALLER.
 * The route's only extra work is the storage objects, deleted BEFORE the row so
 * a failure leaves a row pointing at nothing rather than an unreachable object.
 */

const PATH = "/api/listings/photos/$id";

interface StoredRef {
  partition: Partition;
  key: string;
}

/** Every `{ partition, key }` a row's `paths` carries, deduplicated. */
function refsOf(paths: unknown, storagePath: unknown): StoredRef[] {
  const refs = new Map<string, StoredRef>();
  if (paths !== null && typeof paths === "object" && !Array.isArray(paths)) {
    for (const value of Object.values(paths as Record<string, unknown>)) {
      if (value === null || typeof value !== "object") continue;
      const row = value as Record<string, unknown>;
      const key = typeof row["key"] === "string" ? row["key"] : "";
      if (key === "") continue;
      const partition = (
        typeof row["partition"] === "string" ? row["partition"] : "default"
      ) as Partition;
      refs.set(key, { partition, key });
    }
  }
  if (typeof storagePath === "string" && storagePath !== "" && !refs.has(storagePath)) {
    refs.set(storagePath, { partition: "default", key: storagePath });
  }
  return [...refs.values()];
}

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
  for (const ref of refsOf(photo.paths, photo.storage_path)) {
    try {
      await deleteObject(supabaseAdmin, ref.partition, ref.key);
    } catch (error) {
      // The object is gone or unreachable; the row must still go, so the failure
      // is named rather than swallowed (F4) and the removal continues.
      logRouteError(PATH, `object delete ${ref.key}: ${String(error)}`);
    }
  }

  const { data, error } = await supabase.rpc("remove_listing_photo", {
    p_listing_id: photo.listing_id,
    p_photo_id: photoId,
  });
  if (error) {
    logRouteError(PATH, `remove: ${error.message}`);
    return routeJson({ ok: false, refusals: [{ field: "door", reason: error.message }] }, 200);
  }
  return routeJson(data, 200);
}

async function handlePost(request: Request, photoId: string): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;
  const supabase = caller.supabase!;

  const body = await readJsonBody(request);
  if (body["action"] !== undefined && body["action"] !== "cover") {
    return refusal("action", "badValue");
  }

  const photo = await ownedPhoto(supabase, photoId);
  if (!photo) {
    return routeJson({ ok: false, refusals: [{ field: "id", reason: "notYourListing" }] }, 403);
  }

  const { data, error } = await supabase.rpc("set_cover_photo", {
    p_listing_id: photo.listing_id,
    p_photo_id: photoId,
  });
  if (error) {
    logRouteError(PATH, `cover: ${error.message}`);
    return routeJson({ ok: false, refusals: [{ field: "door", reason: error.message }] }, 200);
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
