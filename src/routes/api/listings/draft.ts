import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { doorErrorDetail } from "@/features/posting/door-error";
import type { Database } from "@/integrations/supabase/types";
import type { Refusal } from "@/server/answer";
import { doorCall } from "@/server/door";
import { geoGuess } from "@/server/geo/guess";
import { defineRoute } from "@/server/route";
import { logRouteError } from "@/server/supabase/user-client";

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
 * Foundations turn 3: on defineRoute.
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

/**
 * The body the wizard sends (posting-service.ts DraftBody; use-draft.ts bodyFor
 * sends every key). The bounds are coarse shapes ABOVE the door's own:
 * submit_listing is the authority on lengths and values.
 */
export const DraftBody = z
  .object({
    listingId: z.string().nullable(),
    step: z.number().int().min(0).max(8),
    categoryId: z.string().max(64).nullable().optional(),
    title: z.string().max(2000).nullable().optional(),
    description: z.string().max(20000).nullable().optional(),
    videoUrl: z.string().max(2048).nullable().optional(),
    attributes: z.unknown().optional(),
    priceMode: z.string().max(32).nullable().optional(),
    priceAmount: z.number().nullable().optional(),
    priceCurrency: z.string().max(8).nullable().optional(),
    pricePeriod: z.string().max(16).nullable().optional(),
    priceBp: z.number().nullable().optional(),
    priceNegotiable: z.boolean().optional(),
    posterExpiresAt: z.string().max(64).nullable().optional(),
    coverage: z.array(z.string().max(64)).nullable().optional(),
    contactPref: z.unknown().optional(),
  })
  .strict();

/**
 * The door's exceptions in the wizard's words. INC-301 — the commission range
 * constraint is a seller's mistake; INC-309 — a stored price type the door
 * refuses is a bad value; every other exception carries the constraint's name
 * as detail or nothing (INC-447 — the raw message stays in the log line).
 */
function translate(message: string): Refusal {
  if (message.includes("listings_price_bp_check")) {
    return { field: "price_bp", reason: "commissionRange" };
  }
  if (message.includes("listings_price_mode_check")) {
    return { field: "price_mode", reason: "badValue" };
  }
  const constraint = doorErrorDetail(message);
  return { field: "door", reason: "doorError", ...(constraint ? { detail: constraint } : {}) };
}

export const Route = createFileRoute("/api/listings/draft")({
  server: {
    handlers: {
      POST: defineRoute({
        path: PATH,
        auth: "user",
        body: DraftBody,
        handler: async ({ request, supabase, userId, service, body }) => {
          // 1 — the residency fact, from the edge, written once (DEC-068).
          // INC-399 — closed to the browser roles; the server-only client writes it
          // with the VERIFIED caller's id, never an id from the body.
          const supabaseAdmin = await service();
          const { error: residencyError } = await supabaseAdmin.rpc("residency_country_for", {
            p_user_id: userId!,
            p_request_country: geoGuess(request).country as unknown as string,
          });
          if (residencyError) {
            // The fact could not be recorded; the door still decides. A silent
            // continue would be a phantom (F4), so the failure is logged and named.
            logRouteError(PATH, `residency: ${residencyError.message}`);
          }

          // 2 — the door (it counts the draft dial itself, INC-396).
          const args = {
            p_listing_id: text(body.listingId),
            p_step: step(body.step),
            p_category_id: text(body.categoryId),
            p_title: text(body.title),
            p_description: text(body.description),
            p_video_url: text(body.videoUrl),
            p_attributes: json(body.attributes),
            p_price_mode: text(body.priceMode),
            p_price_amount: num(body.priceAmount),
            p_price_currency: text(body.priceCurrency),
            p_price_period: text(body.pricePeriod),
            p_poster_expires_at: text(body.posterExpiresAt),
            p_coverage: idList(body.coverage),
            p_contact_pref: json(body.contactPref),
            p_price_bp: int(body.priceBp),
            // DEC-081 — Negotiable is a flag; only a literal true sets it.
            p_price_negotiable: body.priceNegotiable === true,
          } as unknown as SubmitArgs;

          // INC-574 inside doorCall — the door never reached is a 503.
          return doorCall(PATH, () => supabase!.rpc("submit_listing", args), { translate });
        },
      }),
    },
  },
});
