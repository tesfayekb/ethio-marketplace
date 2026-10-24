import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { uuid } from "@/lib/schemas/primitives";
import { bytes, serverError, verdict } from "@/server/answer";
import { ownListing } from "@/server/listings/own-listing";
import { defineRoute, type RouteContext } from "@/server/route";

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
import { consumeRate, envDial, logRouteError } from "@/server/supabase/user-client";

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
 *   4 the ids           — two UUIDs (the one `uuid`), else `badValue`
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

/**
 * The body the client sends (posting-service.ts `removeBackground`): exactly two
 * keys. Their values are judged in the handler after the switch and the daily
 * dial, by the one `uuid`, so a malformed id stays `badValue` (PP-31 :1922 pins it).
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
  // dial in the handler: after the switch, so a switched-off tool spends none — INC-859
  const daily = await consumeRate(
    "background:day",
    userId,
    envDial("RATE_LIMIT_BACKGROUND_PER_DAY", 10),
    "1 day",
  );
  if (!daily.allowed) return refusal("rate", "rateLimited", daily.resetsAt ?? undefined);

  // 4 — the ids.
  const listingId = typeof ctx.body.listingId === "string" ? ctx.body.listingId.trim() : "";
  const photoId = typeof ctx.body.photoId === "string" ? ctx.body.photoId.trim() : "";
  if (!uuid.safeParse(listingId).success) return refusal("listingId", "badValue");
  if (!uuid.safeParse(photoId).success) return refusal("photoId", "badValue");

  // 5 — ownership, as the caller: the id AND the seller in one read (ownListing).
  const own = await ownListing(supabase, userId, listingId, "id, status");
  if ("error" in own) return serverError(PATH, `listing read: ${own.error.message}`);
  if (own.row === null) return refusedWith(403, "listingId", "notYourListing");
  if (!PHOTO_OPEN_STATUSES.has(String(own.row["status"]))) {
    return refusedWith(409, "status", "listingNotOpenForPhotos");
  }

  // 6 — the cover: the first photo in the listing's own order, read as the caller.
  const { data: rows, error: rowsError } = await supabase
    .from("listing_photos")
    .select("id, paths, exif_stripped")
    .eq("listing_id", listingId)
    .order("display_order", { ascending: true });
  if (rowsError) {
    return serverError(PATH, `photo rows: ${rowsError.message}`);
  }
  const photos = rows ?? [];
  const photo = photos.find((row) => row.id === photoId);
  if (!photo) return refusedWith(409, "photoId", "photoGone");
  if (photos[0]?.id !== photoId) return refusedWith(409, "photoId", "notCover");

  // 7 — the ad's tries, spent before the provider is asked (F5).
  // dial in the handler: keyed by the listing — INC-859
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
  // bytes() answers no-store unless told otherwise (ANS-5).
  return bytes(cutout.bytes, cutout.type, { headers: { "x-tries-left": String(triesLeft) } });
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
