import { type Page } from "@playwright/test";

import { expect, test } from "./fixtures";
import { en } from "../src/i18n/locales/en";
import { destroyLocation, seedScratchChain } from "./helpers/locations";
import {
  destroyCategoryBranch,
  destroyListingsOf,
  leaseSeller,
  rand,
  RUN,
  seedCategoryBranch,
} from "./helpers/posting";
import { gotoReady, stepUpIfPrompted, switchUser, useJobSuperAdmin } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * Bundle 10 E3a — ADMIN › SCREENING (SC-1..SC-6). Seeded as feed-route seeds;
 * every row is found by its unique title in the page's search (G28); DB truth
 * through the service client; cleanup in afterEach (J3).
 */

type RpcClient = {
  rpc: (
    fn: string,
    args?: Record<string, unknown>,
  ) => Promise<{ error: { message: string } | null }>;
};

async function rpcFromBrowser(page: Page, fn: string, args: Record<string, unknown>) {
  await page.waitForFunction(
    () => Boolean((window as unknown as { __ethioSupabase?: unknown }).__ethioSupabase),
    undefined,
    { timeout: 15000 },
  );
  return page.evaluate(
    async ([name, payload]) => {
      const client = (window as unknown as { __ethioSupabase: RpcClient }).__ethioSupabase;
      const result = await client.rpc(name as string, payload as Record<string, unknown>);
      return result.error?.message ?? null;
    },
    [fn, args] as const,
  );
}

async function listingTruth(id: string) {
  const { data, error } = await adminClient()
    .from("listings")
    .select("status, published_at")
    .eq("id", id)
    .single();
  if (error || !data) throw new Error(`[e2e:sc] reading the listing failed: ${error?.message}`);
  return data as { status: string; published_at: string | null };
}

async function feedRowsOf(id: string): Promise<number> {
  const { count, error } = await adminClient()
    .from("feed_index")
    .select("listing_id", { count: "exact", head: true })
    .eq("listing_id", id);
  if (error || count === null)
    throw new Error(`[e2e:sc] reading feed_index failed: ${error?.message}`);
  return count;
}

/** The page passes cardUntil="lg": below 1024 px each row is a card, from 1024 px a table row. */
const TWIN_BOUNDARY = 1024;

function isCardTwin(page: Page): boolean {
  return (page.viewportSize()?.width ?? TWIN_BOUNDARY) < TWIN_BOUNDARY;
}

function surface(page: Page) {
  return isCardTwin(page) ? page.getByTestId("data-table-cards") : page.getByRole("table");
}

function rowOf(page: Page, id: string) {
  return surface(page).getByTestId(
    isCardTwin(page) ? `admin-screening-row-${id}-card` : `admin-screening-row-${id}`,
  );
}

function actionsOf(page: Page, id: string) {
  return surface(page).getByTestId(
    isCardTwin(page)
      ? `admin-screening-row-${id}-actions`
      : `admin-screening-row-${id}-actions-cell`,
  );
}

test.describe("ADMIN SCREENING", () => {
  const sellers: string[] = [];
  const regions: string[] = [];
  const branches: string[][] = [];
  const roles: string[] = [];

  test.afterEach(async () => {
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const slug of regions.splice(0)) await destroyLocation(slug);
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
    const supabase = adminClient();
    for (const roleId of roles.splice(0)) {
      const a = await supabase.from("role_permissions").delete().eq("role_id", roleId);
      if (a.error) throw new Error(`[e2e:sc] role_permissions reap failed: ${a.error.message}`);
      const b = await supabase.from("user_roles").delete().eq("role_id", roleId);
      if (b.error) throw new Error(`[e2e:sc] user_roles reap failed: ${b.error.message}`);
      const c = await supabase.from("roles").delete().eq("id", roleId);
      if (c.error) throw new Error(`[e2e:sc] role reap failed: ${c.error.message}`);
    }
  });

  async function seedWaiting(options: { parentImageUrl?: string } = {}) {
    const seller = await leaseSeller();
    sellers.push(seller.id);
    const { parent, leaf } = await seedCategoryBranch(options);
    branches.push([parent.slug, leaf.slug]);
    const chain = await seedScratchChain("ET");
    regions.push(chain.region.slug);
    const title = `e2e-screen-${RUN}-${rand()}`;
    const { data, error } = await adminClient()
      .from("listings")
      .insert({
        category_id: leaf.id,
        seller_id: seller.id,
        location_id: chain.city.id,
        home_country_code: "ET",
        title,
        description: "e2e scratch listing for the screening queue",
        status: "screening",
        published_at: null,
      })
      .select("id")
      .single();
    if (error || !data) throw new Error(`[e2e:sc] seeding failed: ${error?.message ?? "no row"}`);
    return {
      id: data.id as string,
      title,
      categoryName: leaf.slug as string,
      cityName: chain.city.name_en as string,
    };
  }

  async function findRow(page: Page, title: string, id: string) {
    await gotoReady(page, "/admin/screening");
    await page.getByTestId("admin-screening-search").fill(title);
    const row = rowOf(page, id);
    await expect(row).toBeVisible({ timeout: 20000 });
    return row;
  }

  test("SC-1 the queue lists an ad waiting for review", async ({ page }) => {
    const ad = await seedWaiting();
    await useJobSuperAdmin(page);
    const row = await findRow(page, ad.title, ad.id);
    await expect(row).toContainText(ad.title);
    await expect(row).toContainText(ad.categoryName);
    await expect(row).toContainText(ad.cityName);
  });

  test("SC-2 Approve puts the ad on the site", async ({ page }) => {
    const ad = await seedWaiting();
    const { secret } = await useJobSuperAdmin(page);
    await findRow(page, ad.title, ad.id);
    await actionsOf(page, ad.id).getByTestId(`admin-screening-approve-${ad.id}`).click();
    await expect(page.getByTestId("admin-screening-confirm")).toBeVisible();
    await page.getByTestId("admin-screening-confirm-go").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      en["admin.screening.approved"],
      { timeout: 20000 },
    );
    const truth = await listingTruth(ad.id);
    expect(truth.status).toBe("active");
    expect(truth.published_at).not.toBeNull();
    expect(await feedRowsOf(ad.id)).toBeGreaterThanOrEqual(1);
    await expect(page.locator(`[data-testid^="admin-screening-row-${ad.id}"]`)).toHaveCount(0);
  });

  test("SC-3 Reject keeps the ad off", async ({ page }) => {
    const ad = await seedWaiting();
    const { secret } = await useJobSuperAdmin(page);
    await findRow(page, ad.title, ad.id);
    await actionsOf(page, ad.id).getByTestId(`admin-screening-reject-${ad.id}`).click();
    await expect(page.getByTestId("admin-screening-confirm")).toBeVisible();
    await page.getByTestId("admin-screening-confirm-go").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      en["admin.screening.rejected"],
      { timeout: 20000 },
    );
    expect((await listingTruth(ad.id)).status).toBe("rejected");
    expect(await feedRowsOf(ad.id)).toBe(0);
    await expect(page.locator(`[data-testid^="admin-screening-row-${ad.id}"]`)).toHaveCount(0);
  });

  test("SC-4 only a reviewer with a fresh second factor decides", async ({ page }) => {
    test.setTimeout(180_000);
    const ad = await seedWaiting();
    const supabase = adminClient();

    // (a) a pool user with no role.
    const plain = await leaseUser();
    await switchUser(page, plain.email, plain.password);
    await gotoReady(page, "/");
    const deniedPlain = await rpcFromBrowser(page, "transition_listing", {
      p_listing_id: ad.id,
      p_new_status: "active",
    });
    expect(deniedPlain).not.toBeNull();
    expect((await listingTruth(ad.id)).status).toBe("screening");

    // (b) a scratch role holding listings:review only, no second factor.
    const roleName = `e2e_screen_reviewer_${rand()}`;
    const { data: role, error: roleError } = await supabase
      .from("roles")
      .insert({ name: roleName, display_name: roleName, priority: 1 })
      .select("id")
      .single();
    if (roleError || !role) throw new Error(`SC-4 scratch role failed: ${roleError?.message}`);
    roles.push(role.id as string);
    const { data: perms } = await supabase
      .from("permissions")
      .select("id, action, resources!inner(name)")
      .in("resources.name", ["listings"]);
    const wanted = (perms ?? []).filter((p) => p.action === "review");
    expect(wanted, "SC-4 expected exactly listings:review").toHaveLength(1);
    const granted = await supabase
      .from("role_permissions")
      .insert(wanted.map((p) => ({ role_id: role.id, permission_id: p.id })));
    if (granted.error) throw new Error(`SC-4 grant failed: ${granted.error.message}`);
    const reviewer = await leaseUser();
    const assigned = await supabase
      .from("user_roles")
      .insert({ user_id: reviewer.id, role_id: role.id, scope_type: "global" });
    if (assigned.error) throw new Error(`SC-4 assignment failed: ${assigned.error.message}`);
    await switchUser(page, reviewer.email, reviewer.password);
    await gotoReady(page, "/");
    const deniedReviewer = await rpcFromBrowser(page, "transition_listing", {
      p_listing_id: ad.id,
      p_new_status: "active",
    });
    expect(deniedReviewer).toMatch(/no verified factor|step-up required/i);
    expect((await listingTruth(ad.id)).status).toBe("screening");
  });

  test("SC-5 an empty search shows the empty message", async ({ page }) => {
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/screening");
    await page.getByTestId("admin-screening-search").fill(`e2e-none-${rand()}`);
    await expect(page.getByTestId("admin-screening-empty")).toHaveText(
      en["admin.screening.empty"],
      { timeout: 20000 },
    );
  });

  /** SC-6 (INC-525) — the preview draws the nearest category picture, as the card does. */
  test("SC-6 Preview as buyer draws the ad's category picture", async ({ page }) => {
    const picture = "https://example.invalid/e2e-screen-picture.jpg";
    const ad = await seedWaiting({ parentImageUrl: picture });
    await useJobSuperAdmin(page);
    await findRow(page, ad.title, ad.id);
    await actionsOf(page, ad.id).getByTestId(`admin-screening-open-${ad.id}`).click();
    await expect(page.getByTestId("post-preview-sheet")).toBeVisible({ timeout: 20000 });
    const box = page.getByTestId("listing-detail-illustration");
    await expect(box, "SC-6: the preview did not draw the category picture").toBeVisible({
      timeout: 20000,
    });
    await expect(box).toHaveAttribute("data-picture", "category");
    await expect(box.locator("img")).toHaveAttribute("src", picture);
    await expect(page.getByTestId("listing-detail-nophoto")).toHaveCount(0);
  });
});
