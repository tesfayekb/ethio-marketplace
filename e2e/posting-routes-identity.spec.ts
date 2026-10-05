import { expect, test } from "./fixtures";

import { gotoReady, signInViaSession } from "./helpers/ui";
import { leaseSeller, bearerOf, destroyListingsOf, postRoute, reasonsOf } from "./helpers/posting";

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
 * alias rules refuse digit runs), so every one of them is SAVED by the door —
 * a door refusal would be a different field from the gate's ("rate").
 *
 * Fake mode judges any name containing "cocacola" as imitating, so the 21st call
 * would answer `aliasImitatesBrand` if the judge ran; it answers the rate refusal.
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
      expect(answer.payload["ok"], `call ${call + 1}: ${JSON.stringify(answer.payload)}`).toBe(
        true,
      );
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
});
