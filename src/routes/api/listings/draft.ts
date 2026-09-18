import { createFileRoute } from "@tanstack/react-router";

import type { Database } from "@/integrations/supabase/types";
import { isE2E } from "@/lib/env-flags";
import { geoGuess } from "@/server/geo/guess";
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
 * U6-A2-C — THE DRAFT DOOR'S ROUTE.
 *
 *   POST /api/listings/draft  →  the door's own JSON
 *
 * THE ROUTE OWNS THREE THINGS AND NOTHING ELSE (F3 — the door is the authority):
 *
 *   1 the DIAL (DEC-071): `consume_rate_limit('draft', <user>, …)` runs FIRST,
 *     before a byte of the body is judged, so a flood costs one counter row and
 *     never a validation pass. `RATE_LIMIT_DRAFT_PER_HOUR` (default 30).
 *   2 the RESIDENCY FACT (DEC-068): the country comes from the EDGE
 *     (`geoGuess(request)`), never from the body, and `residency_country_for`
 *     writes it once — a later call from another country cannot move it. A null
 *     answer leaves the fact unset and `submit_listing` refuses
 *     `residencyUnknown` by itself; the route does not pre-empt that verdict.
 *   3 the TRANSLATION of the body's camelCase into the door's `p_*` names.
 *
 * Everything else — step validation, price, coverage, contact, revisions — is
 * `submit_listing`'s and is returned verbatim: a refusal is `ok:false` with the
 * door's vocabulary at status 200 (F4), never HTML and never a 500.
 */

const PATH = "/api/listings/draft";

type SubmitArgs = Database["public"]["Functions"]["submit_listing"]["Args"];

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function step(value: unknown): number {
  const parsed = typeof value === "number" ? Math.floor(value) : Number.NaN;
  return Number.isFinite(parsed) && parsed >= 0 && parsed <= 8 ? parsed : 0;
}

function idList(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const ids = value.filter((entry): entry is string => typeof entry === "string" && entry !== "");
  return ids.length === 0 ? null : ids;
}

function json(value: unknown): unknown {
  return value === undefined ? null : value;
}

async function handlePost(request: Request): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;
  const supabase = caller.supabase!;
  const userId = caller.userId!;

  // 1 — the dial, before any work.
  const rate = await consumeRate(
    supabase,
    "draft",
    userId,
    // INC-227 — 600/h: a wizard that autosaves every couple of seconds for an
    // hour of honest work must not be throttled into a dead end. The E2E
    // environment keeps its own low dial, which is what PR-7 proves.
    // INC-227 — 600 an hour for a real seller (an autosave every few seconds must
    // never become a dead end). The E2E build keeps the LOW dial so PR-7 can reach
    // the ceiling in one test instead of six hundred calls.
    envDial("RATE_LIMIT_DRAFT_PER_HOUR", isE2E ? 30 : 600),
    "1 hour",
  );
  if (!rate.allowed) return refusal("rate", "rateLimited", rate.resetsAt ?? undefined);

  const body = await readJsonBody(request);

  // 2 — the residency fact, from the edge, written once (DEC-068).
  const { error: residencyError } = await supabase.rpc("residency_country_for", {
    p_user_id: userId,
    p_request_country: geoGuess(request).country as unknown as string,
  });
  if (residencyError) {
    // The fact could not be recorded; the door still decides. A silent continue
    // would be a phantom (F4), so the failure is logged and named.
    logRouteError(PATH, `residency: ${residencyError.message}`);
  }

  // 3 — the door.
  const args = {
    p_listing_id: text(body["listingId"]),
    p_step: step(body["step"]),
    p_category_id: text(body["categoryId"]),
    p_title: text(body["title"]),
    p_description: text(body["description"]),
    p_video_url: text(body["videoUrl"]),
    p_attributes: json(body["attributes"]),
    p_price_mode: text(body["priceMode"]),
    p_price_amount: num(body["priceAmount"]),
    p_price_currency: text(body["priceCurrency"]),
    p_price_period: text(body["pricePeriod"]),
    p_poster_expires_at: text(body["posterExpiresAt"]),
    p_coverage: idList(body["coverage"]),
    p_contact_pref: json(body["contactPref"]),
  } as unknown as SubmitArgs;

  const { data, error } = await supabase.rpc("submit_listing", args);
  if (error) {
    logRouteError(PATH, error.message);
    return routeJson({ ok: false, refusals: [{ field: "door", reason: error.message }] }, 200);
  }
  return routeJson(data, 200);
}

export const Route = createFileRoute("/api/listings/draft")({
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
