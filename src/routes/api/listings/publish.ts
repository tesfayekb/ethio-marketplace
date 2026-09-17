import { createFileRoute } from "@tanstack/react-router";

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
 * U6-A2-C — THE PUBLISH ROUTE.
 *
 *   POST /api/listings/publish  { listingId }  →  the door's own JSON
 *
 * `publish_listing` validates every step and moves the listing to SCREENING.
 * NOTHING here can make a listing live: the moderation gateway (D1) is the only
 * path to `active`, and until it lands a published listing waits in screening.
 * That is a NAMED DEFERRAL, stated in docs/features/listings.md.
 *
 * DEC-071 — the dial is `RATE_LIMIT_POST_PER_DAY` (default 10, window one day).
 */

const PATH = "/api/listings/publish";

async function handlePost(request: Request): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;
  const supabase = caller.supabase!;
  const userId = caller.userId!;

  const rate = await consumeRate(
    supabase,
    "post",
    userId,
    envDial("RATE_LIMIT_POST_PER_DAY", 10),
    "1 day",
  );
  if (!rate.allowed) return refusal("rate", "rateLimited", rate.resetsAt ?? undefined);

  const body = await readJsonBody(request);
  const listingId = typeof body["listingId"] === "string" ? body["listingId"] : "";
  if (listingId === "") return refusal("listingId", "required");

  const { data, error } = await supabase.rpc("publish_listing", { p_listing_id: listingId });
  if (error) {
    logRouteError(PATH, error.message);
    return routeJson({ ok: false, refusals: [{ field: "door", reason: error.message }] }, 200);
  }

  // D1 GATEWAY HOOK (named deferral): the moderation gateway will be called
  // here, on a listing that is already in `screening`. It alone may promote to
  // `active`; this route never will.

  return routeJson(data, 200);
}

export const Route = createFileRoute("/api/listings/publish")({
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
