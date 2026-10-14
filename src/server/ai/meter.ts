/**
 * Bundle 13, turn 1 — THE AI METER AND SWITCHES (D158, INC-600).
 *
 * Every paid AI call the server makes asks `aiGate` first and, once the
 * provider has answered, tells `recordAiSpend` what it used. Both go through
 * the service role to two service-only doors (no browser role can call them):
 *
 *   ai_feature_gate(feature)        — on, or off with its reason ('staff' |
 *                                      'budget'); a feature switched off by
 *                                      last month's budget reads as on again
 *   ai_record_spend(feature, units) — adds one call and its units to today's
 *                                      row, at the feature's unit price; at 80 %
 *                                      and 100 % of a monthly budget it writes an
 *                                      audit row, and at 100 % it switches the
 *                                      feature off — every feature except photo
 *                                      screening, which only alerts (D158)
 *
 * THE GATE FAILS CLOSED (F4): a gate that cannot be read answers off with the
 * reason 'unavailable', never on — a meter that cannot be read must not become
 * an unmetered call. Each route turns 'off' into its own answer.
 *
 * THE METER NEVER FAILS THE CALLER: the provider has already answered (and
 * billed) when it is written, so a failed write is logged through the route's
 * own logger — the server-error channel (`[ssr-error]`), which the E2E
 * server-error census reads — and the caller still gets the answer it paid
 * for. It is never silent. A gate that could not be read is logged the same way.
 *
 * Fake mode is metered like the provider (units, calls, price): a switch and a
 * budget behave the same on ethio-staging as on ethio-prod.
 */

export const AI_FEATURES = [
  "photo_screen",
  "writing_helper",
  "name_check",
  "category_images",
  "category_icons",
  "translations",
  // Bundle 13 turn 12 — D155b / D159: the cover photo's background, removed by Photoroom.
  "background_removal",
] as const;

export type AiFeature = (typeof AI_FEATURES)[number];

export type AiGate = { on: true } | { on: false; reason: "staff" | "budget" | "unavailable" };

type Log = (message: string) => void;

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

/** Is this AI feature switched on? Off when the gate cannot be read (fails closed). */
export async function aiGate(feature: AiFeature, log: Log): Promise<AiGate> {
  try {
    const client = await admin();
    const { data, error } = await client.rpc("ai_feature_gate", { p_feature: feature });
    if (error) {
      log(`ai gate ${feature}: ${error.message}`);
      return { on: false, reason: "unavailable" };
    }
    const answer = (data ?? {}) as { on?: unknown; off_reason?: unknown };
    if (answer.on === true) return { on: true };
    if (answer.on === false) {
      return {
        on: false,
        reason: answer.off_reason === "budget" ? "budget" : "staff",
      };
    }
    log(`ai gate ${feature}: unreadable answer`);
    return { on: false, reason: "unavailable" };
  } catch (error) {
    log(`ai gate ${feature}: ${error instanceof Error ? error.message : String(error)}`);
    return { on: false, reason: "unavailable" };
  }
}

/** Records one call of a feature and its units (characters for translations, else 1). */
export async function recordAiSpend(feature: AiFeature, units: number, log: Log): Promise<void> {
  const whole = Number.isFinite(units) && units > 0 ? Math.floor(units) : 0;
  try {
    const client = await admin();
    const { error } = await client.rpc("ai_record_spend", {
      p_feature: feature,
      p_units: whole,
    });
    if (error) log(`ai meter ${feature}: ${error.message}`);
  } catch (error) {
    log(`ai meter ${feature}: ${error instanceof Error ? error.message : String(error)}`);
  }
}
