import { expect, test } from "./fixtures";
import { en } from "../src/i18n/locales/en";
import { destroyLocation, seedScratchChain, waitForServedTree } from "./helpers/locations";
import {
  destroyCategoryBranch,
  destroyListingsOf,
  leaseSeller,
  RUN,
  seedCategoryBranch,
} from "./helpers/posting";
import { gotoReady, signInViaSession, useJobSuperAdmin } from "./helpers/ui";
import { adminClient } from "./helpers/users";

/**
 * Bundle 18 turn 1 (D198) — the seller's and the account's pages carry a
 * route-derived trail: Home › <panel> › <page> [› <ad> [› Edit]], every
 * segment but the current one a link; the admin's listing Edit gains its own
 * "Edit" segment. Fixtures modelled on e2e/my-listings-ad.spec.ts
 * (scratchSeller :209, seed :229, afterEach :184); every row scratch (G27);
 * every crumb found by its test id inside the trail (G28).
 */

const DAY = 86_400_000;

/** Letters only: a scratch name the contact-in-text rule never reads as a number. */
function token(): string {
  return Math.random()
    .toString(36)
    .slice(2, 10)
    .replace(/[0-9]/g, (digit) => "abcdefghij"[Number(digit)] ?? "x");
}

test.describe("breadcrumbs — the seller's and the account's pages (D198)", () => {
  const sellers: string[] = [];
  const listingIds: string[] = [];
  const regions: string[] = [];
  const branches: string[][] = [];

  test.afterEach(async () => {
    const supabase = adminClient();
    const owned = listingIds.splice(0);
    if (owned.length > 0) {
      const notices = await supabase.from("seller_notices").delete().in("listing_id", owned);
      if (notices.error) throw new Error(`[e2e:bc] notice reap failed: ${notices.error.message}`);
    }
    for (const id of owned) {
      const removed = await supabase.from("listings").delete().eq("id", id);
      if (removed.error) throw new Error(`[e2e:bc] listing reap failed: ${removed.error.message}`);
    }
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const slug of regions.splice(0)) await destroyLocation(slug);
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
  });

  /** A scratch seller with a public name and its own category branch and place. */
  async function scratchSeller() {
    const seller = await leaseSeller({ alias: true, named: true });
    sellers.push(seller.id);
    const { parent, leaf } = await seedCategoryBranch();
    branches.push([parent.slug as string, leaf.slug as string]);
    const chain = await seedScratchChain("ET");
    regions.push(chain.region.slug as string);
    // INC-797 — the route serves its tree from a 15-second copy: wait until it carries this chain (J7)
    await waitForServedTree("ET", chain.subCity.slug as string);
    return {
      ...seller,
      leafId: leaf.id as string,
      cityId: chain.city.id as string,
    };
  }

  type Seller = Awaited<ReturnType<typeof scratchSeller>>;

  /** A complete scratch active listing; its title is returned for the crumbs. */
  async function seed(seller: Seller, status: string) {
    const live = ["active", "reduced", "expired", "sold", "removed", "closed"].includes(status);
    const ago = 20 * DAY;
    const at = (offsetMs: number) => new Date(Date.now() + offsetMs).toISOString();
    const title = `E2E breadcrumbs ad ${RUN.replace(/[0-9]/g, "x")} ${token()}`;
    const { data, error } = await adminClient()
      .from("listings")
      .insert({
        category_id: seller.leafId,
        seller_id: seller.id,
        location_id: seller.cityId,
        home_country_code: "ET",
        title,
        description: "e2e scratch listing for the breadcrumbs",
        attributes: {},
        price_mode: "fixed",
        price_amount: 100,
        price_currency: "ETB",
        price_period: "once",
        price_set_at: at(-ago),
        contact_pref: { messages: true },
        status,
        tier: "regular",
        published_at: live ? at(-ago) : null,
        published_first_at: live ? at(-ago) : null,
        expires_at: live ? at(10 * DAY - 3_600_000) : null,
      })
      .select("id")
      .single();
    if (error || !data) throw new Error(`[e2e:bc] seeding failed: ${error?.message ?? "no row"}`);
    const id = data.id as string;
    listingIds.push(id);
    const located = await adminClient()
      .from("listing_locations")
      .insert({ listing_id: id, location_id: seller.cityId, position: 1 });
    if (located.error) throw new Error(`[e2e:bc] coverage failed: ${located.error.message}`);
    return { id, title };
  }

  test("BR-1 the ad's page and its Edit: Home › Seller Centre › My listings › <title> › Edit, every segment but the current a link", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active");
    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, `/my-listings/${ad.id}`);
    const trail = page.getByTestId("breadcrumbs");

    // Home is a link to the feed.
    const home = trail.getByTestId("breadcrumb-home");
    await expect(home).toBeVisible();
    expect(await home.evaluate((node) => node.tagName)).toBe("A");
    await expect(home).toHaveAttribute("href", /\/$/);

    // The panel and the page are links to /my-listings.
    const panel = trail.getByTestId("breadcrumb-panel");
    await expect(panel).toHaveText(en["panel.myListings"]);
    expect(await panel.evaluate((node) => node.tagName)).toBe("A");
    await expect(panel).toHaveAttribute("href", /\/my-listings$/);
    const pageCrumb = trail.getByTestId("breadcrumb-page");
    await expect(pageCrumb).toHaveText(en["nav.myListings"]);
    expect(await pageCrumb.evaluate((node) => node.tagName)).toBe("A");
    await expect(pageCrumb).toHaveAttribute("href", /\/my-listings$/);

    // The ad is the current segment: its title, no link, no Edit yet.
    const adCrumb = trail.getByTestId("breadcrumb-my-listing");
    await expect(adCrumb).toHaveText(ad.title, { timeout: 15000 });
    expect(await adCrumb.evaluate((node) => node.tagName)).not.toBe("A");
    await expect(adCrumb).toHaveAttribute("aria-current", "page");
    await expect(trail.getByTestId("breadcrumb-edit")).toHaveCount(0);

    // The Edit: the ad becomes a link back, "Edit" is the current segment.
    await gotoReady(page, `/my-listings/${ad.id}/edit`);
    await expect(adCrumb).toHaveText(ad.title, { timeout: 15000 });
    expect(await adCrumb.evaluate((node) => node.tagName)).toBe("A");
    await expect(adCrumb).toHaveAttribute("href", new RegExp(`/my-listings/${ad.id}$`));
    const edit = trail.getByTestId("breadcrumb-edit");
    await expect(edit).toHaveText(en["myListings.edit"]);
    await expect(edit).toHaveAttribute("aria-current", "page");

    // Every segment but the current one navigates.
    await adCrumb.click();
    await expect(page).toHaveURL(new RegExp(`/my-listings/${ad.id}$`), { timeout: 15000 });
    await pageCrumb.click();
    await expect(page).toHaveURL(/\/my-listings$/, { timeout: 15000 });
  });

  test("BR-2 the panel's home, Post listing and Settings: Home › Seller Centre › My listings; Home › Seller Centre › Post listing; Home › Account › Settings", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    await signInViaSession(page, seller.email, seller.password);
    const trail = page.getByTestId("breadcrumbs");

    // The panel's home: the panel is a plain name, the page is current.
    await gotoReady(page, "/my-listings");
    const panelHome = trail.getByTestId("breadcrumb-panel");
    await expect(panelHome).toHaveText(en["panel.myListings"]);
    expect(await panelHome.evaluate((node) => node.tagName)).toBe("SPAN");
    const homePage = trail.getByTestId("breadcrumb-page");
    await expect(homePage).toHaveText(en["nav.myListings"]);
    expect(await homePage.evaluate((node) => node.tagName)).not.toBe("A");
    await expect(homePage).toHaveAttribute("aria-current", "page");
    await expect(trail.getByTestId("breadcrumb-my-listing")).toHaveCount(0);

    // Post listing: the panel links to /my-listings, the page is current.
    await gotoReady(page, "/post");
    await expect(page.getByTestId("post-step-1")).toBeVisible({ timeout: 15000 });
    const postPanel = trail.getByTestId("breadcrumb-panel");
    await expect(postPanel).toHaveText(en["panel.myListings"]);
    expect(await postPanel.evaluate((node) => node.tagName)).toBe("A");
    await expect(postPanel).toHaveAttribute("href", /\/my-listings$/);
    const postPage = trail.getByTestId("breadcrumb-page");
    await expect(postPage).toHaveText(en["nav.postListing"]);
    await expect(postPage).toHaveAttribute("aria-current", "page");

    // Settings: the panel is Account, a link to /account; the page is current.
    await gotoReady(page, "/settings");
    const settingsPanel = trail.getByTestId("breadcrumb-panel");
    await expect(settingsPanel).toHaveText(en["panel.account"]);
    expect(await settingsPanel.evaluate((node) => node.tagName)).toBe("A");
    await expect(settingsPanel).toHaveAttribute("href", /\/account$/);
    const settingsPage = trail.getByTestId("breadcrumb-page");
    await expect(settingsPage).toHaveText(en["settings.navLabel"]);
    await expect(settingsPage).toHaveAttribute("aria-current", "page");

    // The panel segment navigates to its home.
    await settingsPanel.click();
    await expect(page).toHaveURL(/\/account$/, { timeout: 15000 });
  });

  test("BR-3 the admin's listing Edit: … › All listings › <title> › Edit", async ({ page }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active");
    await useJobSuperAdmin(page);
    await gotoReady(page, `/admin/listings/${ad.id}/edit`);
    const trail = page.getByTestId("breadcrumbs");

    // The step-up gate may hold the page's body: the trail is read regardless.
    const adCrumb = trail.getByTestId("breadcrumb-admin-listing");
    await expect(adCrumb).toHaveText(ad.title, { timeout: 20000 });
    expect(await adCrumb.evaluate((node) => node.tagName)).toBe("A");
    await expect(adCrumb).toHaveAttribute("href", new RegExp(`/admin/listings/${ad.id}$`));
    const edit = trail.getByTestId("breadcrumb-edit");
    await expect(edit).toHaveText(en["myListings.edit"]);
    await expect(edit).toHaveAttribute("aria-current", "page");
    const section = trail.getByTestId("breadcrumb-admin-section");
    expect(await section.evaluate((node) => node.tagName)).toBe("A");
    await expect(section).toHaveAttribute("href", /\/admin\/listings$/);

    // The ad's own admin page: the ad is the current segment, no Edit.
    await gotoReady(page, `/admin/listings/${ad.id}`);
    await expect(adCrumb).toHaveText(ad.title, { timeout: 20000 });
    expect(await adCrumb.evaluate((node) => node.tagName)).not.toBe("A");
    await expect(adCrumb).toHaveAttribute("aria-current", "page");
    await expect(trail.getByTestId("breadcrumb-edit")).toHaveCount(0);
  });
});
