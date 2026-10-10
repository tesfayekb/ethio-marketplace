import { createClient } from "@supabase/supabase-js";

import { expect, test } from "./fixtures";

import { gotoReady, signInViaSession } from "./helpers/ui";
import { leaseSeller, bearerOf, destroyListingsOf, postRoute, reasonsOf } from "./helpers/posting";
import { adminClient } from "./helpers/users";

/**
 * Bundle 5 Part F — INC-442: THE IMITATION CHECK IS GATED BEFORE THE MODEL.
 *
 * The identity route asks a paid model whether a seller name imitates a brand.
 * That call is counted in its own bucket (`identity:imitation`, 20 per 24 hours,
 * the live `rate_dials` row for `identity`) BEFORE the model runs, so a signed-in
 * account cannot buy unbounded model calls with names the door never sees.
 *
 * The pool reset deletes the leased user's `rate_limits` rows (pool-reset-map),
 * so the count starts at zero. The 20 honest names are letters only (the door's
 * alias rules refuse digit runs). The door saves the first few and then answers
 * its own change rule (`aliasTooSoon`, field "alias") — a door refusal, told
 * apart from the gate's (field "rate"); every one of the 20 reaches the door.
 *
 * Fake mode judges any name containing "cocacola" as imitating, so the 21st call
 * would answer `aliasImitatesBrand` if the judge ran; it answers the rate refusal.
 *
 * PR-43 — INC-535: the profile is written through its doors only. The owner's
 * own client is refused on every column it could once write; the identity route
 * still saves the same name.
 */

const IDENTITY = "/api/listings/identity";
const LIMIT = 20;

function letters(length: number): string {
  let out = "";
  while (out.length < length) out += Math.random().toString(36).slice(2).replace(/[0-9]/g, "");
  return out.slice(0, length);
}

test.describe("POSTING ROUTES — IDENTITY GATE", () => {
  const sellers: string[] = [];

  test.afterEach(async () => {
    while (sellers.length > 0) await destroyListingsOf(sellers.pop()!);
  });

  test("PR-26 the imitation check is rate-gated before the model is asked", async ({ page }) => {
    test.setTimeout(120_000);
    const user = await leaseSeller({ named: true });
    sellers.push(user.id);
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    const token = await bearerOf(page);

    const stem = `eimit${letters(6)}`;
    for (let call = 0; call < LIMIT; call++) {
      const alias = `${stem}${letters(4)}`;
      const answer = await postRoute(page, IDENTITY, { alias }, { token, country: "ET" });
      expect(answer.status).toBe(200);
      const reasons = reasonsOf(answer.payload);
      expect(
        reasons.filter((r) => r.field === "rate"),
        `call ${call + 1}: ${JSON.stringify(answer.payload)}`,
      ).toEqual([]);
      // The door answers every one of the 20: the first few are saved, later ones
      // meet the door's own change rule (`aliasTooSoon`) — a door refusal, never
      // the gate's, and never an imitation verdict.
      expect(reasons.map((r) => r.reason)).not.toContain("aliasImitatesBrand");
      if (answer.payload["ok"] !== true) {
        expect(
          reasons.map((r) => r.field),
          JSON.stringify(answer.payload),
        ).toEqual(["alias"]);
      }
    }

    const over = await postRoute(
      page,
      IDENTITY,
      { alias: `${stem}cocacola` },
      { token, country: "ET" },
    );
    expect(over.status).toBe(200);
    expect(over.payload["ok"]).toBe(false);
    const reasons = reasonsOf(over.payload);
    expect(reasons, JSON.stringify(over.payload)).toContainEqual({
      field: "rate",
      reason: "rateLimited",
    });
    // The judge never ran: no imitation verdict travels with the refusal.
    expect(reasons.map((r) => r.reason)).not.toContain("aliasImitatesBrand");
  });

  test("PR-43 the owner's own client cannot write the profile; the identity route still can", async ({
    page,
  }) => {
    const user = await leaseSeller({ named: true });
    sellers.push(user.id);
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    const token = await bearerOf(page);
    const stored = async () => {
      const { data, error } = await adminClient()
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      expect(error).toBeNull();
      return data;
    };
    const before = await stored();
    const own = createClient(
      process.env["E2E_SUPABASE_URL"]!,
      process.env["E2E_SUPABASE_PUBLISHABLE_KEY"]!,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
        auth: { persistSession: false },
      },
    );
    const alias = `eown${letters(8)}`;
    // Every column the owner's client could once write (INC-535), one attempt each.
    const attempts: Record<string, unknown>[] = [
      { seller_alias: alias },
      { display_name: alias },
      { avatar_url: "https://example.invalid/e2e-avatar.png" },
      { contact_prefs: { e2e: true } },
      { notification_prefs: { e2e: true } },
      { viewing_location: { e2e: true } },
      { contact_phone: "e2e" },
      { show_phone: true },
      { contact_telegram: "e2e" },
      { show_telegram: true },
      { contact_whatsapp: true },
      { default_post_location_id: null },
      { updated_at: new Date().toISOString() },
    ];
    for (const patch of attempts) {
      const result = await own
        .from("profiles")
        .update(patch)
        .eq("user_id", user.id)
        .select("user_id");
      expect(result.error, `PR-43: ${Object.keys(patch)[0]} was written directly`).not.toBeNull();
    }
    expect(await stored()).toEqual(before);

    const saved = await postRoute(page, IDENTITY, { alias }, { token, country: "ET" });
    expect(saved.status).toBe(200);
    expect(saved.payload["ok"], JSON.stringify(saved.payload)).toBe(true);
    expect((await stored())?.["seller_alias"]).toBe(alias);
  });
});