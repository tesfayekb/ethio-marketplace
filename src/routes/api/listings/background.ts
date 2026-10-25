import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { uuid } from "@/lib/schemas/primitives";
import { bytes, serverError, verdict } from "@/server/answer";
import { ownListing } from "@/server/listings/own-listing";
import { DIALS } from "@/lib/dials";
import { spend } from "@/server/dials";
import { defineRoute, type RouteContext } from "@/server/route";

import { aiCall } from "@/server/ai/gateway";
import { readSource } from "@/server/media/background";
import { PHOTO_OPEN_STATUSES } from "@/server/media/hold";
import { signPhotoRows, type PhotoRowForLinks } from "@/server/media/links";
import { logRouteError } from "@/server/supabase/user-client";

/**
 * Bundle 13 turn 12 — D155b / D159: REMOVE THE COVER PHOTO'S BACKGROUND.
 *
 *   POST /api/listings/background   { listingId, photoId }
 *     → 200, the cut-out image itself (`x-tries-left`: the ad's tries left), or
 *       a refusal by name: `{ ok: false, refusals: [{ field, reason }] }`
 *
 * THE ORDER IS THE LAW (F5 — gates, then work). Since Foundations turn 17 the
 * provider call is the AI gateway's `background_removal` task, and the order is
 * the gateway's (turn 17, CHANGE 1):
 *
 *   1 the caller        — the bearer, or 401
 *   2 the switch        — background removal's own AI switch (D158), then the
 *                         provider's key: off, unreadable or keyless is
 *                         `featureOff` / `providerUnavailable`, before any dial,
 *                         so a switched-off tool spends none of the seller's tries
 *   3 the daily dial    — `background:day` per seller (RATE_LIMIT_BACKGROUND_PER_DAY, 10)
 *   4 the ids           — two UUIDs (the one `uuid`), else `badValue`
 *   5 ownership         — the listing read AS THE CALLER: another seller's is a
 *                         403 `notYourListing`; a closed status a 409 by name
 *   6 the cover         — the listing's photos read AS THE CALLER, in their own
 *                         order: a photo not on the listing is `photoGone`; any
 *                         photo but the first (the cover) is `notCover` (D159)
 *   7 the ad's tries    — `background:listing`, two per ad for good (D159: once,
 *                         plus one retry), spent before the provider is called;
 *                         a spent budget is `backgroundSpent`
 *   8 the provider      — the stored cover, read through a link the server signs
 *                         (the image supplier, only for a real call), goes to
 *                         Photoroom through the gateway's adapter; a failure is
 *                         `providerUnavailable`, never a picture
 *   9 the meter         — one call recorded by the gateway (fake mode too, as
 *                         every AI route; an unusable answer is metered since
 *                         turn 17 — the provider charged for it)
 *
 * Steps 3–7 are the call's reservation, in today's order, each refusal held in
 * the route's closure and answered as today's Response (the writing helper's
 * pattern). Nothing is stored here. The seller's device puts the house colour
 * under the cut-out and, on Keep, sends the picture through the upload route in
 * the cover's place (`replaces`): the four sizes, the strip and the AI screen,
 * as any edit.
 */

const PATH = "/api/listings/background";

/**
 * The body the client sends (posting-service.ts `removeBackground`): exactly two
 * keys. Their values are judged in the reservation after the switch and the key,
 * by the one `uuid`, so a malformed id stays `badValue` (PP-31 :1922 pins it).
 */
export const BackgroundBody = z
  .object({ listingId: z.unknown().optional(), photoId: z.unknown().optional() })
  .strict();
type Body = z.infer<typeof BackgroundBody>;

const refusal = (field: string, reason: string, detail?: string, status = 200) =>
  verdict([{ field, reason, ...(detail === undefined ? {} : { detail }) }], status);
const refusedWith = (status: number, field: string, reason: string) =>
  refusal(field, reason, undefined, status);

async function handlePost(ctx: RouteContext<Body>): Promise<Response> {
  const supabase = ctx.supabase!;
  const userId = ctx.userId!;
  const log = (message: string) => logRouteError(PATH, message);

  const listingId = typeof ctx.body.listingId === "string" ? ctx.body.listingId.trim() : "";
  const photoId = typeof ctx.body.photoId === "string" ? ctx.body.photoId.trim() : "";

  // Steps 3–7, in today's order; each refusal is held here and answered as
  // today's Response when the gateway hands the refused reservation back.
  let refused: Response | null = null;
  let triesLeft = 0;
  let coverRow: PhotoRowForLinks | null = null;
  const reserve = async (): Promise<{ ok: true } | { ok: false; refusal: unknown }> => {
    // 3 — the seller's daily dial (D158).
    // dial in the handler: after the switch, so a switched-off tool spends none — INC-859
    const daily = await spend(DIALS.backgroundDay, userId);
    if (!daily.allowed) {
      refused = refusal("rate", "rateLimited", daily.resetsAt ?? undefined);
      return { ok: false, refusal: null };
    }

    // 4 — the ids.
    if (!uuid.safeParse(listingId).success) {
      refused = refusal("listingId", "badValue");
      return { ok: false, refusal: null };
    }
    if (!uuid.safeParse(photoId).success) {
      refused = refusal("photoId", "badValue");
      return { ok: false, refusal: null };
    }

    // 5 — ownership, as the caller: the id AND the seller in one read (ownListing).
    const own = await ownListing(supabase, userId, listingId, "id, status");
    if ("error" in own) {
      refused = serverError(PATH, `listing read: ${own.error.message}`);
      return { ok: false, refusal: null };
    }
    if (own.row === null) {
      refused = refusedWith(403, "listingId", "notYourListing");
      return { ok: false, refusal: null };
    }
    if (!PHOTO_OPEN_STATUSES.has(String(own.row["status"]))) {
      refused = refusedWith(409, "status", "listingNotOpenForPhotos");
      return { ok: false, refusal: null };
    }

    // 6 — the cover: the first photo in the listing's own order, read as the caller.
    const { data: rows, error: rowsError } = await supabase
      .from("listing_photos")
      .select("id, paths, exif_stripped")
      .eq("listing_id", listingId)
      .order("display_order", { ascending: true });
    if (rowsError) {
      refused = serverError(PATH, `photo rows: ${rowsError.message}`);
      return { ok: false, refusal: null };
    }
    const photos: PhotoRowForLinks[] = rows ?? [];
    const photo = photos.find((row) => row.id === photoId);
    if (!photo) {
      refused = refusedWith(409, "photoId", "photoGone");
      return { ok: false, refusal: null };
    }
    if (photos[0]?.id !== photoId) {
      refused = refusedWith(409, "photoId", "notCover");
      return { ok: false, refusal: null };
    }
    coverRow = photo;

    // 7 — the ad's tries, spent before the provider is asked (F5).
    // dial in the handler: keyed by the listing — INC-859
    const budget = await spend(DIALS.backgroundListing, listingId);
    if (!budget.allowed) {
      refused = refusal("background", "backgroundSpent");
      return { ok: false, refusal: null };
    }
    triesLeft = budget.remaining ?? 0;
    return { ok: true };
  };

  const answer = await aiCall(
    "background_removal",
    {},
    { actorId: userId, path: PATH, reserve },
    // 8 — the image supplier, called only for a real call: the cover's link is
    // signed by the service role AFTER ownership was asserted as the caller
    // (G54 a), and the read types the blob as jpeg/png/webp or drops it — the
    // task's `all` then answers `unavailable` before the provider is asked.
    async () => {
      const row = coverRow;
      if (row === null) return [];
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      let links: Record<string, Record<string, string>>;
      try {
        links = await signPhotoRows(supabaseAdmin, [row], ["cover"]);
      } catch (error) {
        logRouteError(PATH, error);
        return [];
      }
      const url = links[photoId]?.["cover"] ?? null;
      if (url === null) {
        log("cover link: none signed");
        return [];
      }
      const source = await readSource(url, log);
      if (source === null) return [];
      const mime = source.type;
      if (mime !== "image/jpeg" && mime !== "image/png" && mime !== "image/webp") return [];
      return [{ bytes: new Uint8Array(await source.arrayBuffer()), mime }];
    },
  );
  if (!answer.ok) {
    if (answer.reason === "reserved") return refused ?? refusal("background", "backgroundSpent");
    if (answer.reason === "featureOff" || answer.reason === "budget") {
      return refusal("background", "featureOff");
    }
    return refusal("background", "providerUnavailable");
  }
  // bytes() answers no-store unless told otherwise (ANS-5).
  return bytes(answer.value.bytes, answer.value.mime, {
    headers: { "x-tries-left": String(triesLeft) },
  });
}

export const Route = createFileRoute("/api/listings/background")({
  server: {
    handlers: {
      POST: defineRoute({
        path: PATH,
        auth: "user",
        body: BackgroundBody,
        handler: handlePost,
      }),
    },
  },
});
