import { createFileRoute } from "@tanstack/react-router";
import { doorErrorDetail } from "@/features/posting/door-error";

import type { Database } from "@/integrations/supabase/types";
import { geoGuess } from "@/server/geo/guess";
import {
  doorAnswer,
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
 *   1 the DIAL is the door's own (INC-396): `submit_listing` calls
 *     `rate_gate('draft')` first; the dial lives in `rate_dials`.
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

/** DEC-079 — a whole number (basis points), or null; never coerced to 0. */
function int(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) ? value : null;
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

  const body = await readJsonBody(request);

  // 1 — the residency fact, from the edge, written once (DEC-068).
  // INC-399 — closed to the browser roles; the server-only client writes it with
  // the VERIFIED caller's id, never an id from the body.
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error: residencyError } = await supabaseAdmin.rpc("residency_country_for", {
    p_user_id: userId,
    p_request_country: geoGuess(request).country as unknown as string,
  });
  if (residencyError) {
    // The fact could not be recorded; the door still decides. A silent continue
    // would be a phantom (F4), so the failure is logged and named.
    logRouteError(PATH, `residency: ${residencyError.message}`);
  }

  // 2 — the door (it counts the draft dial itself, INC-396).
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
    p_price_bp: int(body["priceBp"]),
    // DEC-081 — Negotiable is a flag; only a literal true sets it.
    p_price_negotiable: body["priceNegotiable"] === true,
  } as unknown as SubmitArgs;

  const { data, error } = await supabase.rpc("submit_listing", args);
  if (error) {
    // INC-368 — a seller's mistake is not a server error: the two constraint
    // translations below are expected refusals and are NOT logged as [ssr-error].
    // INC-301 — the commission range constraint is a seller's mistake, in words.
    if (error.message.includes("listings_price_bp_check")) {
      return routeJson(
        { ok: false, refusals: [{ field: "price_bp", reason: "commissionRange" }] },
        200,
      );
    }
    // INC-309 — a stored price type the door refuses is a bad value, in words.
    if (error.message.includes("listings_price_mode_check")) {
      return routeJson({ ok: false, refusals: [{ field: "price_mode", reason: "badValue" }] }, 200);
    }
    // The unexpected branch — the only one that is a server error (I4).
    logRouteError(PATH, error.message);
    // INC-309 — every other door exception carries a reason the wizard can put
    // into words; the constraint (or message) travels as detail, never as text.
    // INC-447 — the detail is the constraint's name or nothing; the raw message
    // stays in the log line above.
    const constraint = doorErrorDetail(error.message);
    return routeJson(
      {
        ok: false,
        refusals: [
          { field: "door", reason: "doorError", ...(constraint ? { detail: constraint } : {}) },
        ],
      },
      200,
    );
  }
  return routeJson(doorAnswer(data), 200);
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
