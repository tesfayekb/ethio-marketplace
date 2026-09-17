import { createFileRoute } from "@tanstack/react-router";

import { screenPhotoPolicy } from "@/server/media/policy";
import {
  deleteObject,
  objectKey,
  putObject,
  type ObjectRef,
  type Partition,
} from "@/server/media/storage";
import { assertStripped, StripError, stripImage, type StrippedImage } from "@/server/media/strip";
import {
  consumeRate,
  envDial,
  logRouteError,
  refusal,
  refuseUserClient,
  routeJson,
  userClientFromRequest,
} from "@/server/supabase/user-client";

/**
 * U6-B1 — THE STRIP ROUTE.
 *
 *   POST /api/upload/photo   multipart: listingId, cover, card, thumb
 *
 * THE ORDER IS THE LAW (F5 — gates, then capture, then mutate):
 *
 *   1 the caller           — the bearer, or 401
 *   2 the dial (DEC-071)   — `consume_rate_limit('upload', …)` before any work
 *   3 ownership            — the listing is read AS THE CALLER, so RLS is the
 *                            authority; a listing that is not the caller's is a
 *                            403 by name, and a wrong status a 409 by name
 *   4 the cap              — 10 photos per listing (dial) → `tooManyPhotos`
 *   5 per file             — size cap, THE STRIP (allowlist re-writer, DEC-069),
 *                            dimension cap; the strip's own self-check runs on
 *                            what it produced before a byte can be stored
 *   6 the policy pass      — the COVER only (D15); the card and thumb are derived
 *   7 the objects          — three puts through the partition-keyed adapter
 *   8 the door             — `register_listing_photo` (service-only), which is
 *                            the ONE place `exif_stripped = true` is ever written
 *
 * NO ORPHANS. Every put is recorded, and any failure after the first put deletes
 * what was put before the refusal is returned.
 */

const PATH = "/api/upload/photo";
const PARTITION: Partition = "default";

const VARIANTS = ["cover", "card", "thumb"] as const;
type Variant = (typeof VARIANTS)[number];

/** The statuses that may still gain a photo. */
const OPEN_STATUSES = new Set(["draft", "active", "reduced", "rejected", "held", "expired"]);

const SIZE_DIALS: Record<Variant, { env: string; bytes: number }> = {
  cover: { env: "MAX_COVER_BYTES", bytes: 6 * 1024 * 1024 },
  card: { env: "MAX_CARD_BYTES", bytes: 600 * 1024 },
  thumb: { env: "MAX_THUMB_BYTES", bytes: 120 * 1024 },
};

const EDGE_DIALS: Record<Variant, { env: string; px: number }> = {
  cover: { env: "MAX_COVER_EDGE", px: 2000 },
  card: { env: "MAX_CARD_EDGE", px: 640 },
  thumb: { env: "MAX_THUMB_EDGE", px: 240 },
};

const EXTENSION = { jpeg: "jpg", png: "png", webp: "webp" } as const;
const CONTENT_TYPE = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
} as const;

async function handlePost(request: Request): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;
  const supabase = caller.supabase!;
  const userId = caller.userId!;

  // 2 — the dial, before a byte of the body is read.
  const rate = await consumeRate(
    supabase,
    "upload",
    userId,
    envDial("RATE_LIMIT_UPLOAD_PER_HOUR", 60),
    "1 hour",
  );
  if (!rate.allowed) return refusal("rate", "rateLimited", rate.resetsAt ?? undefined);

  // A7 — the Start primitive hands the handler a web `Request`, so the multipart
  // body is `request.formData()`; nothing else is needed for an upload.
  let form: FormData;
  try {
    form = await request.formData();
  } catch (error) {
    logRouteError(
      PATH,
      `unreadable multipart body: ${error instanceof Error ? error.message : ""}`,
    );
    return refusal("body", "badShape");
  }

  const listingId = String(form.get("listingId") ?? "");
  if (listingId === "") return refusal("listingId", "required");

  // 3 — ownership, as the caller: `listings_seller_read` is the authority (F3).
  const { data: listing, error: listingError } = await supabase
    .from("listings")
    .select("id, status, seller_id")
    .eq("id", listingId)
    .maybeSingle();
  if (listingError) {
    logRouteError(PATH, `listing read: ${listingError.message}`);
    return routeJson({ error: "server error" }, 500);
  }
  if (!listing || listing.seller_id !== userId) {
    return routeJson(
      { ok: false, refusals: [{ field: "listingId", reason: "notYourListing" }] },
      403,
    );
  }
  if (!OPEN_STATUSES.has(String(listing.status))) {
    return routeJson(
      { ok: false, refusals: [{ field: "status", reason: "listingNotOpenForPhotos" }] },
      409,
    );
  }

  // 4 — the cap.
  const { count, error: countError } = await supabase
    .from("listing_photos")
    .select("id", { count: "exact", head: true })
    .eq("listing_id", listingId);
  if (countError) {
    logRouteError(PATH, `photo count: ${countError.message}`);
    return routeJson({ error: "server error" }, 500);
  }
  if ((count ?? 0) >= envDial("MAX_PHOTOS_PER_LISTING", 10)) {
    return refusal("photos", "tooManyPhotos");
  }

  // 5 — every variant: size, strip, dimensions.
  const stripped: Record<Variant, StrippedImage> = {} as Record<Variant, StrippedImage>;
  for (const variant of VARIANTS) {
    const file = form.get(variant);
    if (!(file instanceof File)) return refusal(variant, "required");
    const limit = envDial(SIZE_DIALS[variant].env, SIZE_DIALS[variant].bytes);
    if (file.size > limit) return refusal(variant, "tooLarge", String(limit));

    const raw = new Uint8Array(await file.arrayBuffer());
    let result: StrippedImage;
    try {
      result = stripImage(raw);
    } catch (error) {
      if (error instanceof StripError) return refusal(variant, error.code);
      throw error;
    }

    const audit = assertStripped(result.bytes);
    if (!audit.clean) {
      // The strip claims a law; if its own output fails that law nothing is
      // stored and the failure is named (F4), never worked around.
      logRouteError(PATH, `strip self-check failed on ${variant}: ${audit.found.join(", ")}`);
      return refusal(variant, "stripFailed", audit.found.join(","));
    }

    const edge = envDial(EDGE_DIALS[variant].env, EDGE_DIALS[variant].px);
    if (Math.max(result.width, result.height) > edge) {
      return refusal(variant, "tooLarge", `${edge}px`);
    }
    stripped[variant] = result;
  }

  // 6 — the policy pass, on the cover only (D15).
  const cover = stripped.cover;
  const verdict = await screenPhotoPolicy(cover.bytes, cover.format, cover.width, (message) =>
    logRouteError(PATH, message),
  );
  if (!verdict.ok) {
    return routeJson(
      {
        ok: false,
        refusals: [
          {
            field: "cover",
            reason: verdict.code,
            detail: verdict.evidence,
            ...(verdict.code === "providerUnavailable" ? { retry: true } : {}),
          },
        ],
      },
      200,
    );
  }

  // 7 — the objects, then 8 — the door. Both need the service role: the bucket's
  // key law no longer matches the owner-prefix policy, and the registration door
  // is service-only because only this route can attest the strip.
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const photoId = crypto.randomUUID();
  const put: ObjectRef[] = [];
  const paths: Record<string, ObjectRef> = {};

  const rollback = async () => {
    for (const ref of put) {
      try {
        await deleteObject(supabaseAdmin, ref.partition, ref.key);
      } catch (error) {
        logRouteError(PATH, `rollback of ${ref.key} failed: ${String(error)}`);
      }
    }
  };

  try {
    for (const variant of VARIANTS) {
      const image = stripped[variant];
      const key = objectKey(
        PARTITION,
        userId,
        listingId,
        photoId,
        variant,
        EXTENSION[image.format],
      );
      await putObject(supabaseAdmin, PARTITION, key, image.bytes, CONTENT_TYPE[image.format]);
      put.push({ partition: PARTITION, key });
      paths[variant] = { partition: PARTITION, key };
    }
    // `original` is what the row's legacy `storage_path` column carries; the
    // cover IS the original here, because the strip never re-encodes.
    paths["original"] = paths["cover"]!;

    const { data, error } = await supabaseAdmin.rpc("register_listing_photo", {
      p_listing_id: listingId,
      p_photo_id: photoId,
      p_paths: {
        ...Object.fromEntries(
          Object.entries(paths).map(([variant, ref]) => [
            variant,
            variant === "original" ? ref.key : { partition: ref.partition, key: ref.key },
          ]),
        ),
      },
      p_width: cover.width,
      p_height: cover.height,
      p_bytes: cover.bytes.length,
    });
    if (error) {
      await rollback();
      logRouteError(PATH, `register: ${error.message}`);
      return routeJson({ ok: false, refusals: [{ field: "door", reason: error.message }] }, 200);
    }

    return routeJson(
      {
        ok: true,
        photoId,
        paths,
        width: cover.width,
        height: cover.height,
        bytes: cover.bytes.length,
        ...(data && typeof data === "object" ? { door: data } : {}),
      },
      200,
    );
  } catch (error) {
    await rollback();
    throw error;
  }
}

export const Route = createFileRoute("/api/upload/photo")({
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
