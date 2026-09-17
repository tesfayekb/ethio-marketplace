import { createFileRoute } from "@tanstack/react-router";

import type { Database } from "@/integrations/supabase/types";
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
 * U6-A2-C — THE POSTING IDENTITY ROUTE (D17).
 *
 *   POST /api/listings/identity
 *     { alias, sellerType, businessName, contactPref, homeCountryCode }
 *
 * Every field is optional: the door treats a missing one as "leave it alone", so
 * the same route serves the first save and a later partial edit. The alias rule
 * (shape, reserved words, case-insensitive uniqueness) and the declared home
 * country belong to `save_posting_identity` — the route only translates names.
 *
 * The DECLARED home country is the seller's own claim and never touches the
 * OBSERVED fact the draft route writes from the edge (DEC-068).
 *
 * DEC-071 — the dial is `RATE_LIMIT_IDENTITY_PER_DAY` (default 20, one day).
 */

const PATH = "/api/listings/identity";

type IdentityArgs = Database["public"]["Functions"]["save_posting_identity"]["Args"];

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

async function handlePost(request: Request): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;
  const supabase = caller.supabase!;
  const userId = caller.userId!;

  const rate = await consumeRate(
    supabase,
    "identity",
    userId,
    envDial("RATE_LIMIT_IDENTITY_PER_DAY", 20),
    "1 day",
  );
  if (!rate.allowed) return refusal("rate", "rateLimited", rate.resetsAt ?? undefined);

  const body = await readJsonBody(request);
  const args = {
    p_alias: text(body["alias"]),
    p_seller_type: text(body["sellerType"]),
    p_business_name: text(body["businessName"]),
    p_contact_pref: body["contactPref"] === undefined ? null : body["contactPref"],
    p_home_country_code: text(body["homeCountryCode"]),
  } as unknown as IdentityArgs;

  const { data, error } = await supabase.rpc("save_posting_identity", args);
  if (error) {
    logRouteError(PATH, error.message);
    return routeJson({ ok: false, refusals: [{ field: "door", reason: error.message }] }, 200);
  }
  return routeJson(data, 200);
}

export const Route = createFileRoute("/api/listings/identity")({
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
