import { createClient } from "@supabase/supabase-js";
import { expect, test } from "./fixtures";
import { adPageFixtures } from "./helpers/ad-page";
import { passwordGrant } from "./helpers/session";
import { adminClient, leaseUser } from "./helpers/users";
import { expectNoHorizontalOverflow, gotoReady, signInViaSession } from "./helpers/ui";
import { listingPath } from "../src/features/ad-page/address";
import en from "../src/i18n/locales/en";

test.describe("Account saved", () => {
  const { scratchSeller, seed, publicIdOf, cleanup } = adPageFixtures();
  test.afterEach(cleanup);

  test("SAVED-1 (AS-1) saved ads newest first, sold ribbon, unavailable card, Remove and sign-in return", async ({
    page,
    browser,
  }) => {
    const seller = await scratchSeller();
    const A = await seed(seller);
    const B = await seed(seller);
    const C = await seed(seller);
    const buyer = await leaseUser();
    const url = process.env["E2E_SUPABASE_URL"];
    const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("AS-1 staging configuration missing");
    const session = await passwordGrant(buyer.email, buyer.password);
    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${session.access_token}` } },
    });
    const ids: string[] = [];
    for (const ad of [A, B, C]) {
      const publicId = await publicIdOf(ad.id);
      ids.push(publicId);
      const answer = await client.rpc("save_listing", { p_public_id: publicId });
      expect(answer.error).toBeNull();
      expect(answer.data).toMatchObject({ ok: true, saved: true, count: 1 });
    }
    const [aId, bId, cId] = ids;
    if (!aId || !bId || !cId) throw new Error("AS-1 missing seeded public ids");
    const sold = await adminClient()
      .from("listings")
      .update({ status: "sold", sold_at: new Date().toISOString() })
      .eq("id", B.id);
    if (sold.error) throw new Error(`AS-1 sold: ${sold.error.message}`);
    const removed = await adminClient()
      .from("listings")
      .update({ status: "removed" })
      .eq("id", C.id);
    if (removed.error) throw new Error(`AS-1 removed: ${removed.error.message}`);
    await signInViaSession(page, buyer.email, buyer.password);
    await gotoReady(page, "/account/saved");
    const items = page.getByTestId("saved-item");
    await expect(items).toHaveCount(3);
    expect(
      await items.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-public-id"))),
    ).toEqual([cId, bId, aId]);
    const c = page.locator(`[data-testid="saved-item"][data-public-id="${cId}"]`);
    await expect(c.getByTestId("saved-unavailable")).toHaveText(en["account.saved.unavailable"]);
    await expect(c.getByTestId("listing-card")).toHaveCount(0);
    const b = page.locator(`[data-testid="saved-item"][data-public-id="${bId}"]`);
    await expect(b.getByTestId("listing-card").getByTestId("listing-ribbon-text")).toHaveText(
      en["feed.ribbon.sold"],
    );
    const a = page.locator(`[data-testid="saved-item"][data-public-id="${aId}"]`);
    await expect(a.getByTestId("listing-card-link")).toHaveAttribute(
      "href",
      listingPath(A.title, aId),
    );
    await c.getByTestId("saved-remove").click();
    await expect(items).toHaveCount(2);
    const truth = await adminClient()
      .from("saved_listings")
      .select("listing_id")
      .eq("user_id", buyer.id)
      .eq("listing_id", C.id);
    if (truth.error) throw new Error(`AS-1 removal read: ${truth.error.message}`);
    expect(truth.data).toEqual([]);
    const nav = page.getByTestId(
      (page.viewportSize()?.width ?? 0) < 768 ? "strip-item-ac-saved" : "rail-item-ac-saved",
    );
    await expect(nav).toHaveAttribute("href", "/account/saved");
    await nav.click();
    await expect(page).toHaveURL(/\/account\/saved$/);
    await expectNoHorizontalOverflow(page);
    const context = await browser.newContext({ viewport: page.viewportSize() ?? undefined });
    try {
      const visitor = await context.newPage();
      await gotoReady(visitor, "/account/saved");
      await expect(visitor).toHaveURL(/\/auth\?return=%2Faccount%2Fsaved$/);
    } finally {
      await context.close();
    }
  });

  test("SAVED-2 (AS-2) an empty saved list says so", async ({ page }) => {
    const buyer = await leaseUser();
    await signInViaSession(page, buyer.email, buyer.password);
    await gotoReady(page, "/account/saved");
    await expect(page.getByTestId("saved-empty")).toHaveText(en["account.saved.empty"]);
    await expect(page.getByTestId("saved-item")).toHaveCount(0);
  });
});
