import { createFileRoute } from "@tanstack/react-router";

import { photoIdsOf, PHOTO_LINK_SECONDS, signPhotoRows } from "@/server/media/links";
import {
  logRouteError,
  readJsonBody,
  refusal,
  refuseUserClient,
  routeJson,
  userClientFromRequest,
} from "@/server/supabase/user-client";

/**
 * INC-588 / D151 — LINKS TO STORED PHOTOS.
 *
 *   POST /api/media/photo-links   { photoIds: string[] }   (signed in)
 *     →  { ok: true, links: { [photoId]: { card?, thumb?, cover? } }, expiresIn }
 *
 * The photo rows are read as the CALLER, so `listing_photos`' own policies
 * decide which come back (the seller's own, staff who may view listings, an
 * active listing's stripped photos for anyone); only those rows are signed, by
 * the service client, for one hour (src/server/media/links.ts). A photo the
 * caller may not read is simply absent from `links` — the same answer as a
 * photo that does not exist, so the route tells nobody what exists. A failed
 * read or signature is a 503 the client retries, never an empty success (F4).
 */

const PATH = "/api/media/photo-links";

async function handlePost(request: Request): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;
  const supabase = caller.supabase!;

  const body = await readJsonBody(request);
  const photoIds = photoIdsOf(body["photoIds"]);
  if (photoIds === null) return refusal("photoIds", "badShape");

  const { data: rows, error } = await supabase
    .from("listing_photos")
    .select("id, paths, exif_stripped")
    .in("id", photoIds);
  if (error) {
    logRouteError(PATH, error.message);
    return routeJson({ error: "upstream unavailable" }, 503);
  }

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  try {
    const links = await signPhotoRows(supabaseAdmin, rows ?? []);
    return routeJson({ ok: true, links, expiresIn: PHOTO_LINK_SECONDS }, 200);
  } catch (signError) {
    logRouteError(PATH, signError);
    return routeJson({ error: "upstream unavailable" }, 503);
  }
}

export const Route = createFileRoute("/api/media/photo-links")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          return await handlePost(request);
        } catch (error) {
          logRouteError(PATH, error);
          return routeJson({ error: "server error" }, 500);
        }
      },
    },
  },
});
