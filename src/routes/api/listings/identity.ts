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

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

const IMITATION_PROMPT = [
  "Does this marketplace seller name imitate or impersonate a well-known company,",
  "brand, bank, government body or public figure?",
  'Answer JSON only: {"imitates": boolean, "of": string}.',
  "Answer false for ordinary personal names, generic words and small local shops.",
].join(" ");

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
async function imitationOf(alias: string): Promise<string | null> {
  const fake =
    (process.env["E2E_FAKE_ASSIST"] ?? "") === "1" ||
    (process.env["E2E_FAKE_TRANSLATE"] ?? "") === "1";
  if (fake) return alias.includes("cocacola") ? "Coca-Cola" : null;

  const key = process.env["GEMINI_API_KEY"] ?? "";
  if (key.trim() === "") return null;
  const model = (process.env["GEMINI_TEXT_MODEL"] ?? "").trim() || "gemini-3.5-flash-lite";
  try {
    const response = await fetch(`${GEMINI_BASE}/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: IMITATION_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: `Seller name: ${alias}` }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0 },
      }),
    });
    if (!response.ok) {
      logRouteError(PATH, `imitation check ${response.status}`);
      return null;
    }
    const parsed = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const answer = JSON.parse(parsed.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}") as {
      imitates?: unknown;
      of?: unknown;
    };
    if (answer.imitates !== true) return null;
    return typeof answer.of === "string" && answer.of.trim() !== "" ? answer.of.trim() : alias;
  } catch (error) {
    logRouteError(PATH, `imitation check unusable: ${error instanceof Error ? error.message : ""}`);
    return null;
  }
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
  const alias = text(body["alias"]);
  if (alias !== null) {
    const imitated = await imitationOf(alias.toLowerCase());
    if (imitated !== null) return refusal("alias", "aliasImitatesBrand", imitated);
  }
  /**
   * U6-C1-R3a / STEP 8 — THE CONTACT SHAPE IS JUDGED BEFORE THE PROFILE IS
   * TOUCHED. The alias, the seller type and the business name are saved by the
   * same door as the channels, so a badly shaped channel must refuse BEFORE
   * anything is written — a phone of "number" used to travel unexamined when the
   * object never reached the door. `listing_contact_refusals` is the same
   * validator the door and the draft use (F3: one authority, asked earlier).
   */
  const pref = body["contactPref"];
  if (pref !== undefined && pref !== null) {
    const { data: found, error: checkError } = await supabase.rpc("listing_contact_refusals", {
      p_pref: pref as never,
    });
    if (checkError) {
      logRouteError(PATH, checkError.message);
      return routeJson(
        { ok: false, refusals: [{ field: "door", reason: checkError.message }] },
        200,
      );
    }
    const refusals = Array.isArray(found) ? found : [];
    if (refusals.length > 0) return routeJson({ ok: false, refusals }, 200);
  }

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
