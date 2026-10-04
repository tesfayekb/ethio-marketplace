import { createFileRoute } from "@tanstack/react-router";

import {
  doorAnswer,
  logRouteError,
  readJsonBody,
  refuseUserClient,
  routeJson,
  userClientFromRequest,
} from "@/server/supabase/user-client";

/**
 * BUNDLE 3 STEPS 19 AND 21 — CHECKING IS NOT CLAIMING.
 *
 *   POST /api/listings/alias  { alias }                              → check_seller_alias
 *   POST /api/listings/alias  { suggest: true, businessName?, firstName?, lastName? }
 *                                                                    → suggest_seller_aliases
 *
 * Both doors write nothing to the profile and count `alias_check` themselves
 * (`rate_gate`); the name is claimed only when the contact step is saved, by
 * `save_posting_identity`. The route translates names and passes the door's
 * answer through `doorAnswer`, so a rate refusal reaches the client as `detail`.
 */
const PATH = "/api/listings/alias";

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

async function handlePost(request: Request): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;
  const supabase = caller.supabase!;
  const body = await readJsonBody(request);

  const { data, error } =
    body["suggest"] === true
      ? await supabase.rpc("suggest_seller_aliases", {
          p_business_name: text(body["businessName"]) ?? undefined,
          p_first_name: text(body["firstName"]) ?? undefined,
          p_last_name: text(body["lastName"]) ?? undefined,
          // Walk fix 2 (M4) — the draft's category, for the category word.
          p_category_id: text(body["categoryId"]) ?? undefined,
        })
      : await supabase.rpc("check_seller_alias", { p_alias: text(body["alias"]) ?? "" });
  if (error) {
    logRouteError(PATH, error.message);
    return routeJson({ ok: false, refusals: [{ field: "door", reason: error.message }] }, 200);
  }
  return routeJson(doorAnswer(asRefusals(data)), 200);
}

/** The doors answer one refusal flat (`{ok:false, field, reason}`); the client reads `refusals`. */
function asRefusals(data: unknown): unknown {
  if (data === null || typeof data !== "object") return data;
  const row = data as Record<string, unknown>;
  if (row["ok"] !== false || Array.isArray(row["refusals"])) return data;
  const { ok: _ok, ...refusal } = row;
  return { ok: false, refusals: [refusal] };
}

export const Route = createFileRoute("/api/listings/alias")({
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
