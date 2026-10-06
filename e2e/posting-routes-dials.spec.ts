import { expect, test } from "./fixtures";

import { gotoReady, signInViaSession } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import {
  leaseSeller,
  destroyListingsOf,
  destroyPostableCategory,
  postRoute,
  seedPostableCategory,
  bearerOf,
} from "./helpers/posting";

/**
 * Bundle 6 Part A — THE WRITING DOORS' DIAL (INC-444, PR-27..PR-30).
 *
 * The four seller doors that write a listing revision count against the
 * `revise` dial. Each test lowers that dial for its OWN leased seller through
 * `rate_overrides` (max_count 1, removed in finally — G38: no dial is raised),
 * calls the door twice on its own scratch draft through the browser's own
 * client (the doors are reached by RPC, not a route), and asserts the second
 * answer is the rate refusal by name.
 *
 * J-laws: a leased seller and a scratch category; cleanup in afterEach (J3).
 */

const DRAFT = "/api/listings/draft";

interface RpcAnswer {
  data: unknown;
  error: string | null;
}

/** Calls an RPC as the signed-in page's own user (the browser's seam). */
async function rpcAsPage(
  page: import("@playwright/test").Page,
  fn: string,
  args: Record<string, unknown>,
): Promise<RpcAnswer> {
  return page.evaluate(
    async ({ fn, args }) => {
      const client = (
        window as unknown as {
          __ethioSupabase: {
            rpc: (
              name: string,
              params: Record<string, unknown>,
            ) => Promise<{ data: unknown; error: { message: string } | null }>;
          };
        }
      ).__ethioSupabase;
      const { data, error } = await client.rpc(fn, args);
      return { data, error: error ? error.message : null };
    },
    { fn, args },
  );
}

/** The refusal of the `revise` dial: the door's own JSON, field rate. */
function isRateRefusal(answer: RpcAnswer): boolean {
  if (answer.error !== null) return answer.error.includes("rateLimited");
  const payload = (answer.data ?? {}) as Record<string, unknown>;
  const list = Array.isArray(payload["refusals"]) ? payload["refusals"] : [];
  return (
    payload["ok"] === false &&
    list.some((entry) => {
      const row = (entry ?? {}) as Record<string, unknown>;
      return row["field"] === "rate" && row["reason"] === "rateLimited";
    })
  );
}

test.describe("POSTING DOOR DIALS", () => {
  const categories: string[] = [];
  const sellers: string[] = [];

  test.afterEach(async () => {
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
  });

  /** A leased seller, signed in, with one scratch draft and a lowered dial. */
  async function sellerWithDraft(page: import("@playwright/test").Page) {
    const user = await leaseSeller();
    sellers.push(user.id);
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    const token = await bearerOf(page);
    const cat = await seedPostableCategory();
    categories.push(cat.slug);
    const draft = await postRoute(
      page,
      DRAFT,
      { step: 1, categoryId: cat.id },
      { token, country: "ET" },
    );
    expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
    const listingId = String(draft.payload["listing_id"] ?? "");
    expect(listingId).not.toBe("");
    const lowered = await adminClient()
      .from("rate_overrides")
      .upsert({ user_id: user.id, action: "revise", max_count: 1 });
    if (lowered.error) throw new Error(`[e2e:dials] override: ${lowered.error.message}`);
    return { user, listingId, categoryId: cat.id };
  }

  async function removeOverride(userId: string, tag: string) {
    const removed = await adminClient()
      .from("rate_overrides")
      .delete()
      .eq("user_id", userId)
      .eq("action", "revise");
    // J3 — a failed cleanup is loud, never silent.
    expect(removed.error, `${tag} override cleanup`).toBeNull();
  }

  async function twice(
    page: import("@playwright/test").Page,
    fn: string,
    args: Record<string, unknown>,
  ) {
    const first = await rpcAsPage(page, fn, args);
    const second = await rpcAsPage(page, fn, args);
    expect(isRateRefusal(first), `first ${fn}: ${JSON.stringify(first)}`).toBe(false);
    expect(isRateRefusal(second), `second ${fn}: ${JSON.stringify(second)}`).toBe(true);
  }

  test("PR-27 edit_listing counts against the revise dial", async ({ page }) => {
    const { user, listingId, categoryId } = await sellerWithDraft(page);
    try {
      await twice(page, "edit_listing", {
        p_listing_id: listingId,
        p_category_id: categoryId,
        p_title: "e2e dials title",
        p_description: "e2e dials body",
        p_video_url: null,
        p_attributes: {},
        p_price_mode: "fixed",
        p_price_amount: null,
        p_price_currency: "ETB",
        p_price_period: "once",
        p_poster_expires_at: null,
        p_coverage: [],
        p_contact_pref: { messages: true },
      });
    } finally {
      await removeOverride(user.id, "PR-27");
    }
  });

  test("PR-28 transition_listing counts against the revise dial", async ({ page }) => {
    const { user, listingId } = await sellerWithDraft(page);
    try {
      await twice(page, "transition_listing", {
        p_listing_id: listingId,
        p_new_status: "screening",
      });
    } finally {
      await removeOverride(user.id, "PR-28");
    }
  });

  test("PR-29 renew_listing counts against the revise dial", async ({ page }) => {
    const { user, listingId } = await sellerWithDraft(page);
    try {
      await twice(page, "renew_listing", { p_listing_id: listingId });
    } finally {
      await removeOverride(user.id, "PR-29");
    }
  });

  test("PR-30 set_listing_pin counts against the revise dial", async ({ page }) => {
    const { user, listingId } = await sellerWithDraft(page);
    try {
      await twice(page, "set_listing_pin", { p_listing_id: listingId });
    } finally {
      await removeOverride(user.id, "PR-30");
    }
  });
});
