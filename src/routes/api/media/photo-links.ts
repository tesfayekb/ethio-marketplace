import { createFileRoute } from "@tanstack/react-router";
import { type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { photoIdsOf, PHOTO_LINK_SECONDS, readAndSignPhotoLinks, variantsOf } from "@/server/media/links";
import {
  anonymousClient,
  consumeRate,
  envDial,
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
 *   POST /api/media/photo-links   { photoIds: string[], variants?: string[] }
 *     →  { ok: true, links: { [photoId]: { card?, thumb?, cover? } }, expiresIn }
 *
 * The photo rows are read as the CALLER, so `listing_photos`' own policies
 * decide which come back (the seller's own, staff who may view listings, an
 * active listing's stripped photos for anyone, and a sold one's for 30 days after
 * it sold — bundle 16 turn 3c); only those rows are signed, by
 * the service client, for one hour (src/server/media/links.ts). A photo the
 * caller may not read is simply absent from `links` — the same answer as a
 * photo that does not exist, so the route tells nobody what exists. A failed
 * read or signature is a 503 the client retries, never an empty success (F4).
 *
 * INC-606 — A BUYER WITHOUT A SESSION. A request with no bearer is read as the
 * ANONYMOUS role (the publishable key, no session), so `listing_photos_public_read`
 * alone decides: only an active listing's stripped photos come back (and a sold
 * one's for its 30 days). Each
 * address may ask `RATE_LIMIT_PHOTO_LINKS_PER_HOUR` (600) times an hour. A
 * listing card asks for `["card", "thumb"]` only; a request that names no
 * variant gets every readable one.
 */

const PATH = "/api/media/photo-links";

/** The caller's address as the edge names it; one shared key when none is named. */
function addressOf(request: Request): string {
  const named =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "";
  return named === "" ? "unknown" : named;
}

async function readerOf(
  request: Request,
): Promise<{ supabase: SupabaseClient<Database> } | { refused: Response }> {
  const signedIn = (request.headers.get("Authorization") ?? "").toLowerCase().startsWith("bearer ");
  if (signedIn) {
    const caller = await userClientFromRequest(request);
    const refused = refuseUserClient(PATH, caller);
    if (refused !== null) return { refused };
    return { supabase: caller.supabase! };
  }
  const rate = await consumeRate(
    "photo-links:address",
    addressOf(request),
    envDial("RATE_LIMIT_PHOTO_LINKS_PER_HOUR", 600),
    "1 hour",
  );
  if (!rate.allowed) {
    return { refused: refusal("rate", "rateLimited", rate.resetsAt ?? undefined) };
  }
  const supabase = anonymousClient();
  if (supabase === null) {
    logRouteError(PATH, "supabase server env missing");
    return { refused: routeJson({ error: "server error" }, 500) };
  }
  return { supabase };
}

async function handlePost(request: Request): Promise<Response> {
  const reader = await readerOf(request);
  if ("refused" in reader) return reader.refused;
  const supabase = reader.supabase;

  const body = await readJsonBody(request);
  const photoIds = photoIdsOf(body["photoIds"]);
  if (photoIds === null) return refusal("photoIds", "badShape");
  const variants = variantsOf(body["variants"]);
  if (variants === null) return refusal("variants", "badShape");

  // DEC-195 — the read-and-sign moved to src/server/media/links.ts whole
  // (G1: moved code, not behaviour); the feed route signs through the same door.
  try {
    const links = await readAndSignPhotoLinks(supabase, photoIds, variants);
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
