import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { doorCall } from "@/server/door";
import { defineRoute } from "@/server/route";

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
 * Foundations turn 3: on defineRoute.
 */
const PATH = "/api/listings/alias";

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

/** The two bodies step-who.tsx sends: `{alias}` and `{...names, categoryId, suggest: true}`. */
export const AliasBody = z
  .object({
    alias: z.string().max(200).optional(),
    suggest: z.literal(true).optional(),
    businessName: z.string().max(200).nullable().optional(),
    firstName: z.string().max(200).nullable().optional(),
    lastName: z.string().max(200).nullable().optional(),
    categoryId: z.string().max(64).nullable().optional(),
  })
  .strict();

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
      POST: defineRoute({
        path: PATH,
        auth: "user",
        body: AliasBody,
        handler: async ({ supabase, body }) =>
          // INC-574 / INC-578 inside doorCall: 503 when never reached; a door's
          // own sentence never travels raw (INC-447).
          doorCall(
            PATH,
            async () => {
              const answer =
                body.suggest === true
                  ? await supabase!.rpc("suggest_seller_aliases", {
                      p_business_name: text(body.businessName) ?? undefined,
                      p_first_name: text(body.firstName) ?? undefined,
                      p_last_name: text(body.lastName) ?? undefined,
                      // Walk fix 2 (M4) — the draft's category, for the category word.
                      p_category_id: text(body.categoryId) ?? undefined,
                    })
                  : await supabase!.rpc("check_seller_alias", { p_alias: text(body.alias) ?? "" });
              return { ...answer, data: asRefusals(answer.data) };
            },
            { raw: false },
          ),
      }),
    },
  },
});
