import { createFileRoute } from "@tanstack/react-router";
import { doorRefusal } from "@/features/posting/door-error";

import {
  doorAnswer,
  logRouteError,
  readJsonBody,
  refusal,
  refuseUserClient,
  routeJson,
  upstreamFailed,
  upstreamUnavailable,
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
 * INC-396 — the dial is the door's own: `publish_listing` calls `rate_gate('post')`.
 */

const PATH = "/api/listings/publish";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Bundle 22 turn 4 — the certification a publish carries: `certified`, at most 20 version ids of the uuid
 * shape, and `language`, at most 10 characters. Each is passed on only when sent; a wrong shape is a refusal.
 */
export function readCertification(
  body: Record<string, unknown>,
):
  | { ok: true; args: { p_certified?: string[]; p_language?: string } }
  | { ok: false; field: string } {
  const args: { p_certified?: string[]; p_language?: string } = {};
  const certified = body["certified"];
  if (certified !== undefined) {
    if (
      !Array.isArray(certified) ||
      certified.length > 20 ||
      !certified.every((id) => typeof id === "string" && UUID.test(id))
    )
      return { ok: false, field: "certified" };
    args.p_certified = certified as string[];
  }
  const language = body["language"];
  if (language !== undefined) {
    if (typeof language !== "string" || language.length > 10)
      return { ok: false, field: "language" };
    args.p_language = language;
  }
  return { ok: true, args };
}

async function handlePost(request: Request): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;
  const supabase = caller.supabase!;

  const body = await readJsonBody(request);
  const listingId = typeof body["listingId"] === "string" ? body["listingId"] : "";
  if (listingId === "") return refusal("listingId", "required");
  const certification = readCertification(body);
  if (!certification.ok) return refusal(certification.field, "invalid");

  const { data, error, status } = await supabase.rpc("publish_listing", {
    p_listing_id: listingId,
    ...certification.args,
  });
  // INC-574 — the door was never reached: 503, not a refusal.
  if (upstreamFailed(error, status)) return upstreamUnavailable(PATH, "publish_listing", status);
  if (error) {
    logRouteError(PATH, error.message);
    return routeJson({ ok: false, refusals: [doorRefusal(error.message)] }, 200);
  }

  // D1 GATEWAY HOOK (named deferral): the moderation gateway will be called
  // here, on a listing that is already in `screening`. It alone may promote to
  // `active`; this route never will.

  return routeJson(doorAnswer(data), 200);
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
