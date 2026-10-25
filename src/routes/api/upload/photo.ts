import { createFileRoute } from "@tanstack/react-router";

import { uuid } from "@/lib/schemas/primitives";
import {
  ok,
  serverError,
  upstreamFailed,
  upstreamUnavailable,
  verdict as answerVerdict,
} from "@/server/answer";
import { doorCall } from "@/server/door";
import { ownListing } from "@/server/listings/own-listing";
import { DIALS } from "@/lib/dials";
import { spend } from "@/server/dials";
import { defineRoute, type RouteContext } from "@/server/route";

import { PHOTO_OPEN_STATUSES, photoOutcome, type PhotoReview } from "@/server/media/hold";
import { screenPhotoPolicy, type PolicyVerdict } from "@/server/media/policy";
import {
  deleteObject,
  objectKey,
  objectRefsOf,
  putObject,
  type ObjectRef,
  type Partition,
} from "@/server/media/storage";
import { assertStripped, StripError, stripImage, type StrippedImage } from "@/server/media/strip";
import { envDial, logRouteError } from "@/server/supabase/user-client";
import { errorText } from "@/lib/error-text";

/**
 * U6-B1 — THE STRIP ROUTE.
 *
 *   POST /api/upload/photo   multipart: listingId, cover, mid, card, thumb
 *                            (`mid`, the middle size of D162, may be absent:
 *                            a page loaded before it sends three sizes),
 *                            and `replaces` (D154 B2, optional): a stored photo
 *                            of this listing that the upload, the same photo
 *                            turned or cropped on the device, takes the place of
 *
 * THE ORDER IS THE LAW (F5 — gates, then capture, then mutate):
 *
 *   1 the caller           — the bearer, or 401
 *   2 the dials (DEC-071)  — `consume_rate_limit('upload', …)` an hour and
 *                            `('upload:day', …)` a day (D158), before any work
 *   3 ownership            — the listing is read AS THE CALLER, so RLS is the
 *                            authority; a listing that is not the caller's is a
 *                            403 by name, and a wrong status a 409 by name
 *   4 the cap              — 10 photos per listing (dial) → `tooManyPhotos`;
 *                            an upload that `replaces` a photo adds none, so
 *                            it is not counted, and the photo it replaces must
 *                            be on this listing, read AS THE CALLER (else
 *                            `photoGone`)
 *   5 per file             — size cap, THE STRIP (allowlist re-writer, DEC-069),
 *                            dimension cap; the strip's own self-check runs on
 *                            what it produced before a byte can be stored
 *   6 the policy pass      — the cover, the middle size, the card and the thumb,
 *                            in ONE call (D15, INC-601, D162): every size that
 *                            will be stored is screened; with the ad's category
 *                            and title, so the screen may warn `not_relevant`
 *                            (D154 B3: stored, and handed to the door);
 *                            behind its switch, and metered (D158). With the switch
 *                            off (bundle 13 turn 6), a draft's photo is HELD —
 *                            stored `unscreened`, shown to no buyer until staff
 *                            approve the ad — and a live ad's is refused
 *                            (`photoScreenPlan`, src/server/media/hold.ts).
 *                            Bundle 16 turn 4a (D178, D183): with the switch off
 *                            a photo on any ad is held for staff; the verdict
 *                            decides the rest (`photoOutcome`): a clean pass is
 *                            shown, an unsure, not-right or failed photo is
 *                            stored hidden with its review for a person, and
 *                            nudity and a mismatched copy are refused unstored
 *   7 the objects          — a put per size through the partition-keyed adapter
 *   8 the door             — `register_listing_photo` (service-only), which is
 *                            the ONE place `exif_stripped = true` is ever written
 *                            for a new photo; for `replaces`, its sibling
 *                            `replace_listing_photo` (service-only), which puts
 *                            the new photo at the old one's place and deletes
 *                            the old row in one transaction; the old photo's
 *                            objects are deleted after it (a failure there is
 *                            logged by name: the row is already gone)
 *
 * NO ORPHANS. Every put is recorded, and any failure after the first put deletes
 * what was put before the refusal is returned.
 */

const PATH = "/api/upload/photo";
const PARTITION: Partition = "default";

const VARIANTS = ["cover", "mid", "card", "thumb"] as const;
type Variant = (typeof VARIANTS)[number];

/**
 * D162 — the middle size (960 px) is taken when it is sent and stored like the
 * others; a request without it stores three sizes, and every reader falls back
 * to the cover for that photo. The other three are required.
 */
const OPTIONAL: ReadonlySet<Variant> = new Set<Variant>(["mid"]);

/**
 * D157 — the size dials sit over the measured encoder (the operator's 15 photos,
 * 2026-10-13: largest cover 333 KB at 1448 px, card 45 KB, thumb 6 KB) with a
 * margin for a phone's full 1600-px cover and the JPEG fallback. A variant over
 * its dial is refused by name; no hand-made request stores a 6 MB cover.
 * D162 — the middle size was not measured: its dial is ESTIMATE ×3 over the
 * largest cover scaled to 960 px (333 KB × (960/1448)² ≈ 146 KB).
 */
const SIZE_DIALS: Record<Variant, { env: string; bytes: number }> = {
  cover: { env: "MAX_COVER_BYTES", bytes: 1024 * 1024 },
  mid: { env: "MAX_MID_BYTES", bytes: 450 * 1024 },
  card: { env: "MAX_CARD_BYTES", bytes: 150 * 1024 },
  thumb: { env: "MAX_THUMB_BYTES", bytes: 30 * 1024 },
};

const EDGE_DIALS: Record<Variant, { env: string; px: number }> = {
  cover: { env: "MAX_COVER_EDGE", px: 2000 },
  mid: { env: "MAX_MID_EDGE", px: 1200 },
  card: { env: "MAX_CARD_EDGE", px: 640 },
  thumb: { env: "MAX_THUMB_EDGE", px: 240 },
};

const EXTENSION = { jpeg: "jpg", png: "png", webp: "webp" } as const;

const CONTENT_TYPE = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
} as const;

/**
 * Bundle 16 turn S1 — the seller's photo cap by plan, as the door reads it
 * (`plan_photo_cap(seller_plan(uid))`, both service-only), so the route refuses
 * an extra photo before the paid screen rather than after it.
 */
async function planPhotoCap(userId: string): Promise<number> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const plan = await supabaseAdmin.rpc("seller_plan", { p_user_id: userId });
  if (plan.error || typeof plan.data !== "string") {
    throw new Error(`seller_plan: ${plan.error?.message ?? "no plan"}`);
  }
  const cap = await supabaseAdmin.rpc("plan_photo_cap", { p_plan: plan.data });
  if (cap.error || typeof cap.data !== "number") {
    throw new Error(`plan_photo_cap: ${cap.error?.message ?? "no cap"}`);
  }
  return cap.data;
}

/** One refusal in the posting verdict (the shape `refusal()` answered before). */
const refusal = (field: string, reason: string, detail?: string) =>
  answerVerdict([{ field, reason, ...(detail === undefined ? {} : { detail }) }]);
/** The same refusal at a status other than 200 (403 / 409, as before). */
const refusalAt = (field: string, reason: string, status: number) =>
  answerVerdict([{ field, reason }], status);

async function handlePost(ctx: RouteContext): Promise<Response> {
  // 1 the caller and 2 the hourly and daily dials ran in defineRoute (beforeParse),
  // before a byte of the body was read (INC-865); the form is the bounded read's.
  const supabase = ctx.supabase!;
  const userId = ctx.userId!;
  const form = ctx.form!;

  const listingId = String(form.get("listingId") ?? "");
  if (listingId === "") return refusal("listingId", "required");
  // D154 B2 — the stored photo this upload replaces, when it is an edit.
  const replacesField = form.get("replaces");
  const replaces = typeof replacesField === "string" ? replacesField.trim() : "";
  if (replacesField !== null && !uuid.safeParse(replaces).success)
    return refusal("replaces", "badValue");
  const certifiedField = form.get("certified");
  const certified =
    typeof certifiedField === "string" && certifiedField !== "" ? certifiedField.split(",") : [];
  if (
    certifiedField !== null &&
    (typeof certifiedField !== "string" ||
      certified.length > 20 ||
      certified.some((id) => !uuid.safeParse(id).success))
  ) {
    return refusal("certified", "badValue");
  }
  const languageField = form.get("language");
  if (languageField !== null && (typeof languageField !== "string" || languageField.length > 10)) {
    return refusal("language", "badValue");
  }
  const language = typeof languageField === "string" ? languageField : undefined;

  // 3 — ownership, as the caller: `listings_seller_read` is the authority (F3).
  const own = await ownListing(supabase, userId, listingId, "id, status, title, category_id");
  if ("error" in own) return serverError(PATH, `listing read: ${own.error.message}`);
  const listing = own.row;
  if (listing === null) return refusalAt("listingId", "notYourListing", 403);
  if (!PHOTO_OPEN_STATUSES.has(String(listing["status"]))) {
    return refusalAt("status", "listingNotOpenForPhotos", 409);
  }

  if (listing["status"] !== "draft") {
    const { data, error, status } = await supabase.rpc("my_listing_certification", {
      p_listing_id: listingId,
    });
    if (error) {
      if (upstreamFailed(error, status))
        return upstreamUnavailable(PATH, "my_listing_certification", status);
      return serverError(PATH, `my_listing_certification: ${error.message}`);
    }
    if (data === null || typeof data !== "object" || Array.isArray(data)) {
      return serverError(PATH, "my_listing_certification: invalid answer");
    }
    const answer = data as Record<string, unknown>;
    if (answer["acceptance_pending"] === true) {
      return refusalAt("legal", "acceptanceRequired", 409);
    }
    const statements = answer["statements"];
    if (
      !Array.isArray(statements) ||
      statements.some(
        (row) => row === null || typeof row !== "object" || typeof row["version_id"] !== "string",
      )
    ) {
      return serverError(PATH, "my_listing_certification: invalid statements");
    }
    const expected = statements.map((row) => row["version_id"] as string).sort();
    if (JSON.stringify(expected) !== JSON.stringify([...certified].sort())) {
      return refusalAt("legal", "certificationRequired", 409);
    }
  }

  // Bundle 16 turn S2 (D185, the operator 2026-10-15) — photos added to drafts by a
  // seller who submits no ad: past 50 in a 7-day window (DRAFT_UPLOADS_PER_WEEK_WITHOUT_AD)
  // with no ad submitted in the last 7 days, a draft takes no more photos until the
  // seller submits an ad (`publish_listing` sets `published_first_at`). A live, closed
  // or refused ad's photos are not counted here.
  if (String(listing["status"]) === "draft") {
    // dial in the handler: drafts only — INC-859
    const week = await spend(DIALS.uploadDraftWeek, userId);
    if (!week.allowed) {
      const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data: submitted, error: submittedError } = await supabase
        .from("listings")
        .select("id")
        .eq("seller_id", userId)
        .gte("published_first_at", since)
        .limit(1);
      if (submittedError) {
        return serverError(PATH, `submitted ads: ${submittedError.message}`);
      }
      if ((submitted ?? []).length === 0) return refusal("photos", "publishFirst");
    }
  }

  // 4 — the cap; or, for an edit (D154 B2), the photo it replaces, read AS THE
  // CALLER: a photo that is not on this listing, or not the caller's, is gone.
  let replaced: { paths: unknown; storage_path: unknown } | null = null;
  if (replaces !== "") {
    const { data: old, error: oldError } = await supabase
      .from("listing_photos")
      .select("id, listing_id, paths, storage_path")
      .eq("id", replaces)
      .maybeSingle();
    if (oldError) {
      return serverError(PATH, `replaced photo read: ${oldError.message}`);
    }
    if (!old || old.listing_id !== listingId) {
      return refusalAt("replaces", "photoGone", 409);
    }
    replaced = { paths: old.paths, storage_path: old.storage_path };
  } else {
    const { count, error: countError } = await supabase
      .from("listing_photos")
      .select("id", { count: "exact", head: true })
      .eq("listing_id", listingId);
    if (countError) {
      return serverError(PATH, `photo count: ${countError.message}`);
    }
    // Bundle 16 turn S1 — the seller's plan cap is read here too, before the paid
    // screen, so a photo the door would refuse (`tooManyPhotos`) costs nothing.
    let planCap: number;
    try {
      planCap = await planPhotoCap(userId);
    } catch (error) {
      return serverError(PATH, `plan cap: ${errorText(error)}`);
    }
    if ((count ?? 0) >= Math.min(envDial("MAX_PHOTOS_PER_LISTING", 10), planCap)) {
      return refusal("photos", "tooManyPhotos");
    }
  }

  // 5 — every variant: size, strip, dimensions.
  const stripped: Partial<Record<Variant, StrippedImage>> = {};
  for (const variant of VARIANTS) {
    const file = form.get(variant);
    if (!(file instanceof File)) {
      if (OPTIONAL.has(variant) && file === null) continue;
      return refusal(variant, "required");
    }
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

  // 6 — the policy pass: every size that will be stored, in one call (D15, INC-601),
  // through the AI gateway (Foundations turn 17): the switch, the provider key,
  // the site's day cap on paid screens (the call's reservation, D184 — fake mode
  // spends nothing and is not counted), the stand-in or the provider, the meter
  // and the audit row are the gateway's order. With the switch off (by staff or
  // by budget) or the day cap spent, a photo is HELD: stored `unscreened` with a
  // `held` review, with no pass, and shown to no buyer until staff approve the
  // ad or the photo (bundle 16 turn 4a: on a live ad too, since staff now see
  // every held photo). A switch that could not be read or any provider failure
  // is `providerUnavailable` with a retry (F4).
  const log = (message: string) => logRouteError(PATH, message);
  const cover = stripped.cover!;
  const screened = await screenPhotoPolicy(
    {
      cover,
      ...(stripped.mid === undefined ? {} : { mid: stripped.mid }),
      card: stripped.card!,
      thumb: stripped.thumb!,
    },
    log,
    {
      actorId: userId,
      path: PATH,
      supabase,
      categoryId: typeof listing["category_id"] === "string" ? listing["category_id"] : null,
      title: typeof listing["title"] === "string" ? listing["title"] : null,
    },
  );
  const held = screened.kind === "held";
  const verdict: PolicyVerdict = held ? { ok: true } : screened.verdict;
  // D154 B3 — the screen's warnings: stored with the photo, never a refusal.
  const warnings = verdict.ok ? (verdict.warnings ?? []) : [];
  // Bundle 16 turn 4a (D178, D183) — what the verdict does: shown, kept hidden for a
  // person with its review, or refused unstored (nudity, a mismatched copy, the
  // provider's own failure). A held photo's review is `held`, written by the door.
  const outcome = held ? null : photoOutcome(verdict);
  const review: PhotoReview | null = outcome?.kind === "review" ? outcome.review : null;
  const unscreened = held || review !== null;
  if (!verdict.ok && outcome?.kind === "refuse") {
    return answerVerdict([
      {
        field: "cover",
        reason: verdict.code,
        detail: verdict.evidence,
        ...(verdict.code === "providerUnavailable" ? { retry: true } : {}),
      },
    ]);
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
        logRouteError(PATH, `rollback of ${ref.key} failed: ${errorText(error)}`);
      }
    }
  };

  try {
    for (const variant of VARIANTS) {
      const image = stripped[variant];
      if (image === undefined) continue;
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

    const stored = {
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
      // D158 — held for staff: shown to no buyer until the ad is approved.
      p_unscreened: unscreened,
      // D154 B3 — seen by the seller and staff only (listing_photo_warnings).
      p_warnings: warnings,
      // Bundle 16 turn 4a (D178) — why the photo is hidden, for a person to decide.
      ...(review === null ? {} : { p_review: review }),
      ...(listing["status"] === "draft"
        ? {}
        : {
            ...(certifiedField === null ? {} : { p_certified: certified }),
            ...(language === undefined ? {} : { p_language: language }),
          }),
    };
    // D154 B2 — an edit takes the old photo's place in one transaction.
    const door = replaced === null ? "register_listing_photo" : "replace_listing_photo";
    const result =
      replaced === null
        ? await supabaseAdmin.rpc("register_listing_photo", stored)
        : await supabaseAdmin.rpc("replace_listing_photo", {
            ...stored,
            p_old_photo_id: replaces,
          });
    const { data, error, status } = result;
    if (error) {
      // The objects just written go BEFORE the answer: doorCall answers, it never throws.
      await rollback();
      // INC-574 — the door was never reached: 503 after the rollback, not a refusal.
      if (upstreamFailed(error, status)) {
        return upstreamUnavailable(PATH, door, status);
      }
      return doorCall(PATH, async () => result, { raw: true });
    }

    // D154 B2 — the old photo's row is gone; its objects go now. A failure is
    // named in the log (F4) and does not undo the edit: the new photo is stored.
    if (replaced !== null) {
      for (const ref of objectRefsOf(replaced.paths, replaced.storage_path)) {
        try {
          await deleteObject(supabaseAdmin, ref.partition, ref.key);
        } catch (deleteError) {
          logRouteError(PATH, `replaced object delete ${ref.key}: ${String(deleteError)}`);
        }
      }
    }

    return ok({
      ok: true,
      photoId,
      paths,
      width: cover.width,
      height: cover.height,
      bytes: cover.bytes.length,
      unscreened,
      warnings,
      // Bundle 16 turn 4a — the seller is told why the photo waits (the code, never the phrase).
      ...(held
        ? { review: { label: "held" } }
        : review === null
          ? {}
          : {
              review: {
                label: review.label,
                ...(review.code === undefined ? {} : { code: review.code }),
              },
            }),
      ...(replaced === null ? {} : { replaced: replaces }),
      ...(data && typeof data === "object" ? { door: data } : {}),
    });
  } catch (error) {
    await rollback();
    throw error;
  }
}

export const Route = createFileRoute("/api/upload/photo")({
  server: {
    handlers: {
      POST: defineRoute({
        path: PATH,
        auth: "user",
        // Foundations turn 4 — one byte ceiling, over the sum of the four size dials
        // (1.63 MiB, SIZE_DIALS): an honest upload passes it; an abusive body is 413.
        form: { maxBytes: 2 * 1024 * 1024 },
        rate: [
          {
            dial: DIALS.uploadHour,
            key: "user",
            when: "beforeParse",
            refuseAs: { verdict: { field: "rate" } },
          },
          {
            // D158 — a seller's daily limit, over the hourly one.
            dial: DIALS.uploadDay,
            key: "user",
            when: "beforeParse",
            refuseAs: { verdict: { field: "rate" } },
          },
        ],
        handler: handlePost,
      }),
    },
  },
});
