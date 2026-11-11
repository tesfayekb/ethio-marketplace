import { expect, test } from "./fixtures";
import { type DoorCall, pageDoor } from "./helpers/door-callers";

import { gotoReady, signInViaSession } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import { inOneWindow } from "./helpers/rate-window";
import {
  leaseSeller,
  destroyListingsOf,
  destroyPostableCategory,
  postRoute,
  seedPostableCategory,
  bearerOf,
} from "./helpers/posting";

/**
 * Bundle 6 Part A — THE WRITING DOORS' DIAL (INC-444, PR-27..PR-32).
 *
 * The six seller doors that write a listing revision count against the
 * `revise` dial and refuse it the way they already refuse: an exception
 * naming `rateLimited` (no return type changes). Each test lowers that dial for its OWN leased seller through
 * `rate_overrides` (max_count 1, removed in finally — G38: no dial is raised),
 * calls the door twice on its own scratch draft through the browser's own
 * client (the doors are reached by RPC, not a route), and asserts the second
 * answer is the rate refusal by name.
 *
 * J-laws: a leased seller and a scratch category; cleanup in afterEach (J3).
 *
 * Bundle 16 turn 1 — PR-45, PR-46: the two new seller doors count against the same dial before they read the listing.
 *
 * F1-1 (DEC-335) — edit_listing, relist_listing and set_listing_price are retired: PR-27 now
 * proves edit_my_listing; PR-32 and PR-46 are withdrawn with their doors.
 */

const DRAFT = "/api/listings/draft";

/** The refusal of the `revise` dial: the door's exception names rateLimited. */
function isRateRefusal(answer: DoorCall): boolean {
  return answer.error !== null && answer.error.includes("rateLimited");
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

  /**
   * The first call spends the seller's one allowed `revise` count through a
   * door that COMMITS on a draft (set_listing_pin clearing the pin). A door
   * that refuses a draft by exception rolls its own count back with it, so
   * priming through that door would never spend the count. The second call is
   * the door under test and must be refused by the dial before its own checks.
   */
  async function twice(
    page: import("@playwright/test").Page,
    fn: string,
    args: Record<string, unknown>,
  ) {
    const listingId = String(args["p_listing_id"]);
    // INC-617 — the revise dial counts in clock-hour windows: both calls in one.
    await inOneWindow(3600, 20_000, fn);
    const first = await pageDoor(page, "set_listing_pin", { p_listing_id: listingId });
    const second = await pageDoor(page, fn, args);
    expect(first.error, `first set_listing_pin: ${JSON.stringify(first)}`).toBeNull();
    expect(isRateRefusal(second), `second ${fn}: ${JSON.stringify(second)}`).toBe(true);
  }

  // F1-1 (DEC-335, INC-836 part 2): edit_listing, relist_listing and set_listing_price are
  // retired — PR-27 moves onto edit_my_listing, the seller's one edit door (its dial is read
  // before the ad, so a draft still proves the count); PR-32 and PR-46 are withdrawn with
  // their doors (edit_my_listing's price keys are the same door PR-27 proves).
  test("PR-27 edit_my_listing counts against the revise dial", async ({ page }) => {
    const { user, listingId } = await sellerWithDraft(page);
    try {
      await twice(page, "edit_my_listing", {
        p_listing_id: listingId,
        p_changes: { title: "e2e dials title" },
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

  test("PR-31 mark_sold counts against the revise dial", async ({ page }) => {
    const { user, listingId } = await sellerWithDraft(page);
    try {
      await twice(page, "mark_sold", { p_listing_id: listingId });
    } finally {
      await removeOverride(user.id, "PR-31");
    }
  });

  test("PR-45 set_listing_reserved counts against the revise dial", async ({ page }) => {
    const { user, listingId } = await sellerWithDraft(page);
    try {
      await twice(page, "set_listing_reserved", { p_listing_id: listingId, p_reserved: true });
    } finally {
      await removeOverride(user.id, "PR-45");
    }
  });

  test("PR-33 the map fallback report is capped at 60 an hour per address", async ({ page }) => {
    // INC-446 — one fresh address per run (J1), so no other run's count is read.
    const address = `198.51.100.${Math.floor(Math.random() * 250) + 1}-${Date.now()}`;
    // INC-572 — the count lives in clock-hour windows (consume_rate_limit floors
    // the time to the hour), so the 61 reports must fall in one window: within
    // the last 30 s of an hour, the test waits until the next hour has begun
    // (the shared helper since INC-617).
    await inOneWindow(3600, 30_000, "PR-33");
    const report = async (): Promise<boolean> => {
      const response = await page.request.post("/api/map/tiles", {
        data: { reason: "e2e" },
        headers: { "x-forwarded-for": address },
      });
      const body = (await response.json()) as { ok?: unknown };
      return body.ok === true;
    };
    // INC-572 — sixty sequential round trips ran past the 60 s test budget on a
    // slow staging. The door counts with one atomic INSERT … ON CONFLICT DO
    // UPDATE … RETURNING, so the first sixty go ten at a time; the 61st goes
    // only after all sixty have answered.
    const answers: boolean[] = [];
    for (let batch = 0; batch < 6; batch += 1) {
      answers.push(...(await Promise.all(Array.from({ length: 10 }, () => report()))));
    }
    answers.push(await report());
    expect(answers, "PR-33: not 61 answers").toHaveLength(61);
    expect(answers.slice(0, 60).every(Boolean), JSON.stringify(answers)).toBe(true);
    expect(answers[60]).toBe(false);
  });
});
