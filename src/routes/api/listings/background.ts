import { createFileRoute } from "@tanstack/react-router";

import { aiGate, recordAiSpend } from "@/server/ai/meter";
import {
  BACKGROUND_TRIES,
  BACKGROUND_WINDOW,
  backgroundKey,
  cutOut,
  fakeCutout,
  isBackgroundFake,
  readSource,
  type Cutout,
} from "@/server/media/background";
import { PHOTO_OPEN_STATUSES } from "@/server/media/hold";
import { signPhotoRows } from "@/server/media/links";
import {
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
 * Bundle 13 turn 12 — D155b / D159: REMOVE THE COVER PHOTO'S BACKGROUND.
 *
 *   POST /api/listings/background   { listingId, photoId }
 *     → 200, the cut-out image itself (`x-tries-left`: the ad's tries left), or
 *       a refusal by name: `{ ok: false, refusals: [{ field, reason }] }`
 *
 * THE ORDER IS THE LAW (F5 — gates, then work):
 *
 *   1 the caller        — the bearer, or 401
 *   2 the switch        — background removal's own AI switch (D158); off, or no
 *                         provider key, is `featureOff`, before any dial, so a
 *                         switched-off tool spends none of the seller's tries
 *   3 the daily dial    — `background:day` per seller (RATE_LIMIT_BACKGROUND_PER_DAY, 10)
 *   4 the ids           — two UUIDs, else `badValue`
 *   5 ownership         — the listing read AS THE CALLER: another seller's is a
 *                         403 `notYourListing`; a closed status a 409 by name
 *   6 the cover         — the listing's photos read AS THE CALLER, in their own
 *                         order: a photo not on the listing is `photoGone`; any
 *                         photo but the first (the cover) is `notCover` (D159)
 *   7 the ad's tries    — `background:listing`, two per ad for good (D159: once,
 *                         plus one retry), spent before the provider is called;
 *                         a spent budget is `backgroundSpent`
 *   8 the provider      — the stored cover, read through a link the server signs,
 *                         goes to Photoroom (src/server/media/background.ts);
 *                         a failure is `providerUnavailable`, never a picture
 *   9 the meter         — one call recorded (fake mode too, as every AI route)
 *
 * Nothing is stored here. The seller's device puts the house colour under the
 * cut-out and, on Keep, sends the picture through the upload route in the
 * cover's place (`replaces`): the four sizes, the strip and the AI screen, as
 * any edit.
 */

const PATH = "/api/listings/background";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function refusedWith(status: number, field: string, reason: string): Response {
  return routeJson({ ok: false, refusals: [{ field, reason }] }, status);
}

async function handlePost(request: Request): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;
  const supabase = caller.supabase!;
  const userId = caller.userId!;
  const log = (message: string) => logRouteError(PATH, message);

  // 2 — the switch first, and the provider's key: without either the tool is off.
  const gate = await aiGate("background_removal", log);
  if (!gate.on) {
    return refusal(
      "background",
      gate.reason === "unavailable" ? "providerUnavailable" : "featureOff",
    );
  }
  const fake = isBackgroundFake();
  const key = fake ? "" : backgroundKey();
  if (!fake && key === "") {
    log("no PHOTOROOM_API_KEY: background removal answers switched off");
    return refusal("background", "featureOff");
  }

  // 3 — the seller's daily dial (D158).
  const daily = await consumeRate(
    "background:day",
    userId,
    envDial("RATE_LIMIT_BACKGROUND_PER_DAY", 10),
    "1 day",
  );
  if (!daily.allowed) return refusal("rate", "rateLimited", daily.resetsAt ?? undefined);

  // 4 — the ids.
  const body = await readJsonBody(request);
  const listingId = typeof body["listingId"] === "string" ? body["listingId"].trim() : "";
  const photoId = typeof body["photoId"] === "string" ? body["photoId"].trim() : "";
  if (!UUID.test(listingId)) return refusal("listingId", "badValue");
  if (!UUID.test(photoId)) return refusal("photoId", "badValue");

  // 5 — ownership, as the caller (`listings_seller_read` is the authority, F3).
  const { data: listing, error: listingError } = await supabase
    .from("listings")
    .select("id, status, seller_id")
    .eq("id", listingId)
    .maybeSingle();
  if (listingError) {
    log(`listing read: ${listingError.message}`);
    return routeJson({ error: "server error" }, 500);
  }
  if (!listing || listing.seller_id !== userId) {
    return refusedWith(403, "listingId", "notYourListing");
  }
  if (!PHOTO_OPEN_STATUSES.has(String(listing.status))) {
    return refusedWith(409, "status", "listingNotOpenForPhotos");
  }

  // 6 — the cover: the first photo in the listing's own order, read as the caller.
  const { data: rows, error: rowsError } = await supabase
    .from("listing_photos")
    .select("id, paths, exif_stripped")
    .eq("listing_id", listingId)
    .order("display_order", { ascending: true });
  if (rowsError) {
    log(`photo rows: ${rowsError.message}`);
    return routeJson({ error: "server error" }, 500);
  }
  const photos = rows ?? [];
  const photo = photos.find((row) => row.id === photoId);
  if (!photo) return refusedWith(409, "photoId", "photoGone");
  if (photos[0]?.id !== photoId) return refusedWith(409, "photoId", "notCover");

  // 7 — the ad's tries, spent before the provider is asked (F5).
  const budget = await consumeRate(
    "background:listing",
    listingId,
    BACKGROUND_TRIES,
    BACKGROUND_WINDOW,
  );
  if (!budget.allowed) return refusal("background", "backgroundSpent");
  const triesLeft = budget.remaining ?? 0;

  // 8 — the provider (or fake mode's fixed cut-out).
  let cutout: Cutout | null;
  if (fake) {
    cutout = fakeCutout();
  } else {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let links: Record<string, Record<string, string>>;
    try {
      links = await signPhotoRows(supabaseAdmin, [photo], ["cover"]);
    } catch (error) {
      logRouteError(PATH, error);
      return refusal("background", "providerUnavailable");
    }
    const url = links[photoId]?.["cover"] ?? null;
    if (url === null) {
      log("cover link: none signed");
      return refusal("background", "providerUnavailable");
    }
    const source = await readSource(url, log);
    cutout = source === null ? null : await cutOut(source, key, log);
  }
  if (cutout === null) return refusal("background", "providerUnavailable");

  // 9 — the meter: the provider has answered.
  await recordAiSpend("background_removal", 1, log);
  return new Response(cutout.bytes as BodyInit, {
    status: 200,
    headers: {
      "content-type": cutout.type,
      "cache-control": "no-store",
      "x-tries-left": String(triesLeft),
    },
  });
}

export const Route = createFileRoute("/api/listings/background")({
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
