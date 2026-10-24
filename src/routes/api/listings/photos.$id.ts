import { createFileRoute } from "@tanstack/react-router";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import type { Database } from "@/integrations/supabase/types";
import { uuid } from "@/lib/schemas/primitives";
import { verdict } from "@/server/answer";
import { doorCall } from "@/server/door";
import { ownListing } from "@/server/listings/own-listing";
import { deleteObject, objectRefsOf } from "@/server/media/storage";
import { defineRoute, type RateSpec } from "@/server/route";
import { logRouteError } from "@/server/supabase/user-client";
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
 * Storage cleanup runs only after the caller-scoped door has answered ok.
 * Foundations turn 3: on defineRoute.
 */

const PATH = "/api/listings/photos/$id";

export const PhotoParams = z.object({ id: uuid });

/** The POST bodies: `{action:"cover"}` and `{action:"move", position}`. */
export const PhotoActionBody = z
  .object({
    action: z.enum(["cover", "move"]).optional(),
    position: z.number().int().min(0).max(999).optional(),
  })
  .strict();

async function ownedPhoto(supabase: SupabaseClient<Database>, photoId: string, userId: string) {
  // The photo AS THE CALLER, then its listing through ownListing (the id AND the
  // seller): public photo visibility is not ownership.
  const { data, error } = await supabase
    .from("listing_photos")
    .select("id, listing_id, paths, storage_path")
    .eq("id", photoId)
    .maybeSingle();
  if (error) throw new Error(`photo read: ${error.message}`);
  if (!data) return null;
  const own = await ownListing(supabase, userId, data.listing_id, "id");
  if ("error" in own) throw new Error(`listing read: ${own.error.message}`);
  if (own.row === null) return null;
  return data;
}

const notYours = () => verdict([{ field: "id", reason: "notYourListing" }], 403);

/**
 * Bundle 16 turn S1 (the operator, 2026-10-15) — removals have their own limit per
 * seller across every ad, an hour and a day, as uploads do: an add-and-remove loop
 * is bounded on both sides.
 */
const REMOVE_DIALS: RateSpec[] = [
  {
    action: "photo-remove",
    key: "user",
    limit: { env: "RATE_LIMIT_PHOTO_REMOVE_PER_HOUR", fallback: 30 },
    windowSeconds: 3600,
    refuseAs: { verdict: { field: "photos" } },
  },
  {
    action: "photo-remove:day",
    key: "user",
    limit: { env: "RATE_LIMIT_PHOTO_REMOVE_PER_DAY", fallback: 100 },
    windowSeconds: 86400,
    refuseAs: { verdict: { field: "photos" } },
  },
];

export const Route = createFileRoute("/api/listings/photos/$id")({
  server: {
    handlers: {
      DELETE: defineRoute<unknown, z.infer<typeof PhotoParams>>({
        path: PATH,
        auth: "user",
        params: PhotoParams,
        rate: REMOVE_DIALS,
        handler: async ({ supabase, userId, params }) => {
          const photoId = params.id;
          const photo = await ownedPhoto(supabase!, photoId, userId!);
          if (!photo) return notYours();
          let removed = false;
          const answer = await doorCall(
            PATH,
            async () => {
              const result = await supabase!.rpc("remove_listing_photo", {
                p_listing_id: photo.listing_id,
                p_photo_id: photoId,
              });
              const data = result.data as unknown;
              removed =
                result.error === null &&
                data !== null &&
                typeof data === "object" &&
                !Array.isArray(data) &&
                (data as Record<string, unknown>)["ok"] === true;
              return result;
            },
            { raw: true },
          );
          // INC-830 — storage cleanup only after the door's ok.
          if (removed) {
            const supabaseAdmin = await import("@/integrations/supabase/client.server").then(
              (module) => module.supabaseAdmin,
            );
            for (const ref of objectRefsOf(photo.paths, photo.storage_path)) {
              try {
                await deleteObject(supabaseAdmin, ref.partition, ref.key);
              } catch (error) {
                // The door has completed the removal; log each cleanup failure without
                // turning that completed action into a refusal (the upload replace order).
                logRouteError(PATH, `object delete ${ref.key}: ${errorText(error)}`);
              }
            }
          }
          return answer;
        },
      }),
      POST: defineRoute<z.infer<typeof PhotoActionBody>, z.infer<typeof PhotoParams>>({
        path: PATH,
        auth: "user",
        params: PhotoParams,
        body: PhotoActionBody,
        handler: async ({ supabase, userId, params, body }) => {
          const photoId = params.id;
          const action = body.action ?? "cover";
          // D154 — a place is a whole number from 0; the door closes a place past the end to the last.
          const position = body.position;
          if (action === "move" && position === undefined) {
            return verdict([{ field: "position", reason: "badValue" }]);
          }
          const photo = await ownedPhoto(supabase!, photoId, userId!);
          if (!photo) return notYours();
          return doorCall(
            PATH,
            () =>
              action === "move"
                ? supabase!.rpc("move_listing_photo", {
                    p_listing_id: photo.listing_id,
                    p_photo_id: photoId,
                    p_position: position as number,
                  })
                : supabase!.rpc("set_cover_photo", {
                    p_listing_id: photo.listing_id,
                    p_photo_id: photoId,
                  }),
            { raw: true },
          );
        },
      }),
    },
  },
});
