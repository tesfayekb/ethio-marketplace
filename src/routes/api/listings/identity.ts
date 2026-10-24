import { createFileRoute } from "@tanstack/react-router";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import { doorRefusal } from "@/features/posting/door-error";
import type { Database } from "@/integrations/supabase/types";
import { ok, upstreamFailed, upstreamUnavailable, verdict } from "@/server/answer";
import { doorCall, type DoorResult } from "@/server/door";
import { DIALS } from "@/lib/dials";
import { spend } from "@/server/dials";
import { defineRoute } from "@/server/route";
import { logRouteError } from "@/server/supabase/user-client";
import { upstream } from "@/server/upstream";
import { aiFakeMode, aiGate, recordAiSpend } from "@/server/ai/meter";
import { untrustedText, withUntrustedRule } from "@/lib/untrusted-text";
import { errorText } from "@/lib/error-text";

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
 * Bundle 3 rulings 4 item 5 — the DOOR alone counts the `identity` bucket
 * (M1b dial, `save_posting_identity`); the route no longer consumes a second
 * count from the same bucket, which made the effective limit half the dial.
 *
 * Bundle 5 Part F — INC-442: the route DOES count one bucket of its own,
 * `identity:imitation`, and only in front of the paid imitation model call. It
 * is not "the second count" of the door's `identity` bucket and must not be
 * removed as one: without it a signed-in account can buy unbounded model calls
 * with names the door never sees (an imitating name returns before the door).
 * Foundations turn 3: on defineRoute.
 */

const PATH = "/api/listings/identity";

type IdentityArgs = Database["public"]["Functions"]["save_posting_identity"]["Args"];

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}


const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

/** D166 — the shared rule about a person's words closes the instruction. */
const IMITATION_PROMPT = withUntrustedRule(
  [
    "Does this marketplace seller name imitate or impersonate a well-known company,",
    "brand, bank, government body or public figure?",
    'Answer JSON only: {"imitates": boolean, "of": string}.',
    "Answer false for ordinary personal names, generic words and small local shops.",
  ].join(" "),
);

/**
 * U6-C1-R2 — THE IMITATION CHECK (Tier A rigor, F3).
 *
 * A seller name that passes the door's shape and uniqueness rules can still be
 * theft: `commercialbankofethiopia` is free and well formed. One model call is
 * asked ONLY that question, and its answer is used ONLY to refuse — never to
 * accept, never to rename. A provider that cannot answer does NOT block a seller:
 * the alias goes to the door as before, because a broken checker must not become
 * an accidental ban list (F4).
 *
 * FAKE MODE (`E2E_FAKE_ASSIST=1` / `E2E_FAKE_TRANSLATE=1`): an alias containing
 * "cocacola" imitates, everything else does not — no provider call, no spend.
 */
/** `checked: false` — the provider could not answer (bundle 3 step 19 audits it). */
interface Imitation {
  of: string | null;
  checked: boolean;
}

async function imitationOf(alias: string): Promise<Imitation> {
  const fake = aiFakeMode("E2E_FAKE_ASSIST");
  if (fake) return { of: alias.includes("cocacola") ? "Coca-Cola" : null, checked: true };

  const key = process.env["GEMINI_API_KEY"] ?? "";
  if (key.trim() === "") return { of: null, checked: false };
  const model = (process.env["GEMINI_TEXT_MODEL"] ?? "").trim() || "gemini-3.5-flash-lite";
  try {
    // Foundations turn 3 — the transport takes a deadline; a timeout is caught
    // below as any provider failure is (the name goes on unchecked).
    const response = await upstream(
      `${GEMINI_BASE}/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: IMITATION_PROMPT }] },
          // D166 — the seller's name enters as one quoted string.
          contents: [{ role: "user", parts: [{ text: untrustedText("Seller name", alias, 120) }] }],
          generationConfig: { responseMimeType: "application/json", temperature: 0 },
        }),
      },
      { timeoutMs: 15_000, label: "gemini name_check" },
    );
    if (!response.ok) {
      logRouteError(PATH, `imitation check ${response.status}`);
      return { of: null, checked: false };
    }
    const parsed = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const answer = JSON.parse(parsed.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}") as {
      imitates?: unknown;
      of?: unknown;
    };
    if (answer.imitates !== true) return { of: null, checked: true };
    const of = typeof answer.of === "string" && answer.of.trim() !== "" ? answer.of.trim() : alias;
    return { of, checked: true };
  } catch (error) {
    logRouteError(PATH, `imitation check unusable: ${errorText(error)}`);
    return { of: null, checked: false };
  }
}

/**
 * Bundle 3 step 19 — a name accepted while the imitation check could not answer
 * is recorded as `alias.unchecked` in `audit_log`, the table the admin paths
 * write (`admin_update_profile` → `user.alias_assigned`). Clients cannot insert
 * there (deny-all), so the server's own client writes it after the door saved.
 * A failed audit write is logged, never silent, and does not undo the save.
 */
async function auditUnchecked(userId: string, alias: string): Promise<void> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("audit_log").insert({
      actor_id: userId,
      action: "alias.unchecked",
      entity_type: "profile",
      entity_id: userId,
      meta: { alias },
    });
    if (error) logRouteError(PATH, `alias.unchecked audit: ${error.message}`);
  } catch (error) {
    logRouteError(PATH, error);
  }
}

/**
 * The bodies step-who.tsx sends (subsets of these keys; `{homeCountryChange}`
 * alone) and e2e/helpers/posting.ts confirmHomeCountry's `homeCountryCode`.
 */
export const IdentityBody = z
  .object({
    homeCountryChange: z.string().max(8).optional(),
    alias: z.string().max(200).nullable().optional(),
    sellerType: z.string().max(32).nullable().optional(),
    businessName: z.string().max(200).nullable().optional(),
    firstName: z.string().max(200).nullable().optional(),
    lastName: z.string().max(200).nullable().optional(),
    homeCountryCode: z.string().max(8).nullable().optional(),
    contactPref: z.unknown().optional(),
  })
  .strict();

type IdentityInput = z.infer<typeof IdentityBody>;

async function handle(
  supabase: SupabaseClient<Database>,
  userId: string,
  body: IdentityInput,
): Promise<Response> {
  /**
   * Walk fix 5 (M4) — THE COUNTRY CHANGE IS ITS OWN DOOR. A first country
   * confirms (stamping nothing); a confirmed one changes inside the 30-day
   * rule, else the door refuses `countryTooSoon` with the next date. The
   * observed country is never touched by this route (DEC-068).
   */
  const countryChange = text(body.homeCountryChange);
  if (countryChange !== null) {
    // INC-574 / INC-578 inside doorCall.
    return doorCall(PATH, () => supabase.rpc("change_home_country", { p_country: countryChange }));
  }

  const alias = text(body.alias);
  let unchecked = false;
  if (alias !== null) {
    // dial in the handler: spent on one branch only — INC-859
    // INC-442 — counted BEFORE the paid model call; a refused verdict never asks it.
    const rate = await spend(DIALS.identityImitation, userId);
    if (!rate.allowed) {
      return verdict([
        { field: "rate", reason: "rateLimited", detail: rate.resetsAt ?? undefined },
      ]);
    }
    // D158 — the check is a paid call behind its switch. Switched off (or a gate
    // that could not be read), the name is not asked about: it goes to the door
    // unchecked and is audited `alias.unchecked`, exactly as when the provider
    // cannot answer — a switch never becomes a ban list. An answer is metered.
    const log = (message: string) => logRouteError(PATH, message);
    const gate = await aiGate("name_check", log);
    const imitated: Imitation = gate.on
      ? await imitationOf(alias.toLowerCase())
      : { of: null, checked: false };
    if (gate.on && imitated.checked) await recordAiSpend("name_check", 1, log);
    if (imitated.of !== null) {
      // INC-866 — the model's free text reaches the client bounded.
      return verdict([
        { field: "alias", reason: "aliasImitatesBrand", detail: imitated.of.trim().slice(0, 200) },
      ]);
    }
    unchecked = !imitated.checked;
  }
  /**
   * U6-C1-R3a / STEP 8 — THE CONTACT SHAPE IS JUDGED BEFORE THE PROFILE IS
   * TOUCHED. `listing_contact_refusals` is the same validator the door and the
   * draft use (F3: one authority, asked earlier); its answer is a refusal list.
   */
  const pref = body.contactPref;
  if (pref !== undefined && pref !== null) {
    const {
      data: found,
      error: checkError,
      status: checkStatus,
    } = await supabase.rpc("listing_contact_refusals", { p_pref: pref as never });
    // INC-574 — the validator was never reached: 503, not a refusal.
    if (upstreamFailed(checkError, checkStatus)) {
      return upstreamUnavailable(PATH, "listing_contact_refusals", checkStatus);
    }
    if (checkError) {
      logRouteError(PATH, checkError.message);
      // INC-578 — never the raw sentence (INC-447).
      return verdict([doorRefusal(checkError.message)]);
    }
    const refusals = Array.isArray(found) ? found : [];
    if (refusals.length > 0) return ok({ ok: false, refusals });
  }

  const args = {
    p_alias: text(body.alias),
    p_seller_type: text(body.sellerType),
    p_business_name: text(body.businessName),
    // D17 (M-MAINT-2 A) — the door owns both rules: a person must be named
    // (`nameRequired`) and 60 characters is the ceiling. The route only carries.
    p_first_name: text(body.firstName),
    p_last_name: text(body.lastName),
    p_contact_pref: body.contactPref === undefined ? null : body.contactPref,
    p_home_country_code: text(body.homeCountryCode),
  } as unknown as IdentityArgs;

  let saved: DoorResult | null = null;
  // Rulings 5 item 2 — the door's rate refusal carries `resets_at`; the client reads `detail`.
  const answer = await doorCall(PATH, async () => {
    saved = await supabase.rpc("save_posting_identity", args);
    return saved;
  });
  const result = saved as DoorResult | null;
  if (
    unchecked &&
    alias !== null &&
    result !== null &&
    result.error === null &&
    (result.data as { ok?: unknown } | null)?.ok === true
  ) {
    await auditUnchecked(userId, alias.toLowerCase());
  }
  return answer;
}

export const Route = createFileRoute("/api/listings/identity")({
  server: {
    handlers: {
      POST: defineRoute({
        path: PATH,
        auth: "user",
        body: IdentityBody,
        handler: async ({ supabase, userId, body }) => handle(supabase!, userId!, body),
      }),
    },
  },
});
