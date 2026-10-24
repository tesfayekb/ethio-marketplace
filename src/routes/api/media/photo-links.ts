import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { uuid } from "@/lib/schemas/primitives";
import { ok, serverError, upstreamUnavailable, verdict } from "@/server/answer";
import { clientAddress, hashAddress } from "@/server/catalog-find.server";
import { DIALS } from "@/lib/dials";
import { spend } from "@/server/dials";
import { defineRoute, type RouteContext } from "@/server/route";
import {
  photoIdsOf,
  PHOTO_LINK_SECONDS,
  readAndSignPhotoLinks,
  variantsOf,
} from "@/server/media/links";
import { logRouteError } from "@/server/supabase/user-client";

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
 *
 * Foundations turn 4 — on defineRoute (`auth: "optional"`): a bearer is read as
 * the caller (refused 401/403 as before), none is the anonymous client. The two
 * keys are judged by links.ts's own readers so the answers keep their field
 * names (`photoIds`, `variants`); every id is a UUID by the one shape.
 */

const PATH = "/api/media/photo-links";

/**
 * The body every caller sends (use-photo-links.ts `{photoIds}`, use-card-photos.ts
 * `{photoIds, variants}`, the e2e posts): two keys, judged in the handler by
 * photoIdsOf / variantsOf so a refusal names the key, never `photoIds.0`.
 */
export const PhotoLinksBody = z
  .object({ photoIds: z.unknown(), variants: z.unknown().optional() })
  .strict();
type Body = z.infer<typeof PhotoLinksBody>;

const refusal = (field: string, reason: string, detail?: string) =>
  verdict([{ field, reason, ...(detail === undefined ? {} : { detail }) }]);

async function handlePost(ctx: RouteContext<Body>): Promise<Response> {
  const photoIds = photoIdsOf(ctx.body.photoIds);
  // CHANGE (Foundations turn 4): a non-UUID id is the badShape verdict, not a 503.
  if (photoIds === null || photoIds.some((id) => !uuid.safeParse(id).success)) {
    return refusal("photoIds", "badShape");
  }
  const variants = variantsOf(ctx.body.variants);
  if (variants === null) return refusal("variants", "badShape");

  if (ctx.userId === null) {
    // dial in the handler: anonymous callers only — INC-859
    const rate = await spend(DIALS.photoLinksAddress, hashAddress(clientAddress(ctx.request)));
    if (!rate.allowed) return refusal("rate", "rateLimited", rate.resetsAt ?? undefined);
  }
  const supabase = ctx.supabase;
  if (supabase === null) return serverError(PATH, "supabase server env missing");

  // DEC-195 — the read-and-sign moved to src/server/media/links.ts whole
  // (G1: moved code, not behaviour); the feed route signs through the same door.
  try {
    const links = await readAndSignPhotoLinks(supabase, photoIds, variants);
    return ok({ ok: true, links, expiresIn: PHOTO_LINK_SECONDS });
  } catch (signError) {
    logRouteError(PATH, signError);
    return upstreamUnavailable(PATH, "photo links", 503);
  }
}

export const Route = createFileRoute("/api/media/photo-links")({
  server: {
    handlers: {
      POST: defineRoute({
        path: PATH,
        auth: "optional",
        body: PhotoLinksBody,
        handler: handlePost,
      }),
    },
  },
});
