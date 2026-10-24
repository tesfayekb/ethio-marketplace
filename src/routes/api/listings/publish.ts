import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { idList, optionalText, uuid } from "@/lib/schemas/primitives";
import { doorCall } from "@/server/door";
import { defineRoute } from "@/server/route";

/**
 * U6-A2-C — THE PUBLISH ROUTE.
 *
 *   POST /api/listings/publish  { listingId }  →  the door's own JSON
 *
 * `publish_listing` validates every step and moves the listing to SCREENING.
 * NOTHING here can make a listing live: the moderation gateway (D1) is the only
 * path to `active`, and until it lands a published listing waits in screening.
 * That is a NAMED DEFERRAL, stated in docs/features/listings.md.
 *
 * INC-396 — the dial is the door's own: `publish_listing` calls `rate_gate('post')`.
 * Foundations turn 2: the first route on defineRoute.
 */

const PATH = "/api/listings/publish";

/**
 * Bundle 22 turn 4 — the certification a publish carries: `certified`, at most
 * 20 version ids of the uuid shape, and `language`, at most 10 characters. Each
 * is passed on only when sent; a wrong shape is a refusal. The client sends
 * exactly these keys (posting-service.ts publishListing), so the object is
 * strict. Foundations turn 2: the schema is the rule (readCertification is gone).
 */
export const PublishBody = z
  .object({
    listingId: uuid,
    certified: idList(20).optional(),
    language: optionalText(10).optional(),
  })
  .strict();

export const Route = createFileRoute("/api/listings/publish")({
  server: {
    handlers: {
      POST: defineRoute({
        path: PATH,
        auth: "user",
        body: PublishBody,
        handler: async ({ supabase, body }) => {
          // D1 GATEWAY HOOK (named deferral): the moderation gateway will be
          // called after the door, on a listing that is already in `screening`.
          // It alone may promote to `active`; this route never will.
          // Foundations turn 3: the door envelope is doorCall's (INC-574 inside).
          return doorCall(PATH, () =>
            supabase!.rpc("publish_listing", {
              p_listing_id: body.listingId,
              ...(body.certified !== undefined ? { p_certified: body.certified } : {}),
              ...(body.language !== undefined ? { p_language: body.language } : {}),
            }),
          );
        },
      }),
    },
  },
});
