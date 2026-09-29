import type { Browser, Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { purgeListingObjects } from "./helpers/photos";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { destroyLocation, seedScratchChain, waitForTreeSlug } from "./helpers/locations";
import { adminClient, createUser } from "./helpers/users";
import {
  bearerOf,
  completeDraft,
  coverageOf,
  destroyListingsOf,
  destroyPostableCategory,
  postRoute,
  rand,
  seedPostableCategory,
  stopPageBeforePurge,
} from "./helpers/posting";

/**
 * W6b-1 — THE PLACE STEP IS WHERE THE AD IS SHOWN (PW-83, PW-84).
 *
 * One tick, "Item or service is here", across every city box; the ticked place
 * is the door's item place (`p_coverage[1]` → `listings.location_id`). A NEW
 * post opens on the seller's most recent OTHER listing's places, filtered to
 * the signed-in seller (INC-330), before the saved area and the guess.
 *
 * J-laws: every seller is minted by `createUser`, every place and category is
 * scratch (G27) and reaped in an afterEach that first stops the page
 * (`stopPageBeforePurge`, INC-323). No row is found by its position (G28): each
 * is addressed by its own id.
 */

const DRAFT = "/api/listings/draft";
const PUBLISH = "/api/listings/publish";

test.describe("POSTING WIZARD — where the ad is shown (W6b-1)", () => {
  const categories: string[] = [];
  const sellers: string[] = [];
  const objects: { userId: string; listingId: string }[] = [];
  const places: string[] = [];

  test.afterEach(async ({ page }) => {
    await stopPageBeforePurge(page);
    for (const ref of objects.splice(0)) await purgeListingObjects(ref.userId, ref.listingId);
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
    // A coverage row must be gone before its place.
    for (const slug of places.splice(0)) await destroyLocation(slug);
  });

  /** DEC-068 — the posting routes and the guess hear the edge's country. */
  async function asEdge(page: Page) {
    for (const glob of ["**/api/listings/**", "**/api/geo"]) {
      await page.route(glob, async (route) => {
        await route.continue({ headers: { ...route.request().headers(), "cf-ipcountry": "ET" } });
      });
    }
  }

  async function signedInSeller(page: Page) {
    const user = await createUser({ confirmed: true });
    sellers.push(user.id);
    await asEdge(page);
    await signInViaSession(page, user.email, user.password);
    return user;
  }

  /** A step-5 draft made through the seller's own door, then opened on screen. */
  async function openAtStep6(page: Page, userId: string, categoryId: string) {
    const token = await bearerOf(page);
    const draft = await postRoute(
      page,
      DRAFT,
      {
        listingId: null,
        step: 5,
        categoryId,
        title: `e2e where ${rand()}`,
        description: "e2e where listing description",
        attributes: {},
        priceMode: "free",
      },
      { token, country: "ET" },
    );
    expect(draft.payload["ok"], `step-5 draft refused: ${JSON.stringify(draft.payload)}`).toBe(
      true,
    );
    const listingId = String(draft.payload["listing_id"] ?? "");
    expect(listingId, "no draft id").not.toBe("");
    objects.push({ userId, listingId });
    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-5")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 20_000 });
    return listingId;
  }

  /** A published (screening) listing of the signed-in seller covering one place. */
  async function publishedAt(page: Page, categoryId: string, placeId: string) {
    const token = await bearerOf(page);
    const draft = await postRoute(
      page,
      DRAFT,
      completeDraft({ categoryId, cityId: placeId, title: `e2e where prior ${rand()}` }),
      { token, country: "ET" },
    );
    expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
    const listingId = String(draft.payload["listing_id"] ?? "");
    const published = await postRoute(page, PUBLISH, { listingId }, { token, country: "ET" });
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    return listingId;
  }

  function tickOf(page: Page, key: string) {
    return page.locator(
      `[data-testid="post-where-row"][data-key="${key}"] [data-testid="post-where-item-tick"]`,
    );
  }

  /**
   * PW-83 — R1/R3 on the free plan: the new heading, the single city box ticked,
   * and DB truth — `location_id` is the ticked node (the sub-city once chosen)
   * and `listing_locations` holds exactly the chosen nodes.
   */
  test("PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place", async ({
    page,
  }) => {
    const user = await signedInSeller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const chain = await seedScratchChain("ET");
    places.push(chain.region.slug);
    await waitForTreeSlug(page, "ET", chain.city.slug);
    const listingId = await openAtStep6(page, user.id, category.id);

    await expect(page.getByTestId("post-where-heading"), "PW-83: no heading").toBeVisible();
    await expect(
      page.getByTestId("post-where-intro"),
      "PW-83: the intro never rendered",
    ).toBeVisible();

    const region = page.getByTestId("post-where-region");
    await expect(region.locator(`option[value="${chain.region.id}"]`)).toHaveCount(1, {
      timeout: 20_000,
    });
    await region.selectOption(chain.region.id);
    await page.getByTestId("post-where-city").selectOption(chain.city.id);
    await page.getByTestId("post-where-subcity").selectOption(chain.subCity.id);

    await expect(page.getByTestId("post-where-item-tick"), "PW-83: not one tick").toHaveCount(1);
    await expect(tickOf(page, "primary"), "PW-83: the single city box is not ticked").toBeChecked();
    await expect(
      page.getByTestId("post-where-remove"),
      "PW-83: a lone city offered Remove",
    ).toHaveCount(0);

    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-7")).toBeVisible({ timeout: 20_000 });
    await expect
      .poll(async () => (await coverageOf(listingId)).locationId, {
        message: "PW-83: location_id is not the ticked sub-city",
        timeout: 20_000,
      })
      .toBe(chain.subCity.id);
    expect((await coverageOf(listingId)).placeIds, "PW-83: listing_locations differ").toEqual([
      chain.subCity.id,
    ]);
  });

  /**
   * PW-84 — R4 and the INC-330 class. Seller A's previous listing shows in city X
   * with sub-city Y as its item place; seller B's listing (active, so RLS shows
   * it to A, and made LATER) sits in another city. A's new post opens on X / Y
   * with the tick on Y, no mark, and Next passes untouched; B's city is never used.
   */
  test("PW-84 a new post opens on the seller's own last post, never another seller's", async ({
    page,
    browser,
  }) => {
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const mine = await seedScratchChain("ET");
    places.push(mine.region.slug);
    const theirs = await seedScratchChain("ET");
    places.push(theirs.region.slug);
    await waitForTreeSlug(page, "ET", mine.subCity.slug);
    await waitForTreeSlug(page, "ET", theirs.city.slug);

    const user = await signedInSeller(page);
    const prior = await publishedAt(page, category.id, mine.subCity.id);
    objects.push({ userId: user.id, listingId: prior });

    await otherSellersActiveListing(browser, category.id, theirs.city.id);

    const listingId = await openAtStep6(page, user.id, category.id);
    await expect(
      page.getByTestId("post-where-city"),
      "PW-84: the last post's city was not prefilled",
    ).toHaveValue(mine.city.id, { timeout: 20_000 });
    await expect(page.getByTestId("post-where-subcity")).toHaveValue(mine.subCity.id);
    await expect(tickOf(page, "primary"), "PW-84: the tick is not on the item place").toBeChecked();
    await expect(
      page.getByTestId("post-where-heading").getByTestId("post-required-mark"),
      "PW-84: a prefilled place still shows the required mark",
    ).toHaveCount(0);
    await expect(
      page.locator(`[data-testid="post-where-chosen-row"][data-id="${theirs.city.id}"]`),
      "PW-84: another seller's city was used (INC-330)",
    ).toHaveCount(0);

    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-7"), "PW-84: Next refused the prefill").toBeVisible({
      timeout: 20_000,
    });
    await expect
      .poll(async () => (await coverageOf(listingId)).locationId, {
        message: "PW-84: the item place is not the last post's sub-city",
        timeout: 20_000,
      })
      .toBe(mine.subCity.id);
    expect((await coverageOf(listingId)).placeIds).not.toContain(theirs.city.id);
  });

  /** Seller B, in a context of their own: a LATER listing made visible as active. */
  async function otherSellersActiveListing(browser: Browser, categoryId: string, cityId: string) {
    const context = await browser.newContext();
    const other = await context.newPage();
    try {
      const user = await createUser({ confirmed: true });
      sellers.push(user.id);
      await asEdge(other);
      await signInViaSession(other, user.email, user.password);
      const listingId = await publishedAt(other, categoryId, cityId);
      objects.push({ userId: user.id, listingId });
      // Scratch row only (G27): made ACTIVE so RLS shows it to seller A.
      const now = new Date();
      const { error } = await adminClient()
        .from("listings")
        .update({
          status: "active",
          published_at: now.toISOString(),
          expires_at: new Date(now.getTime() + 7 * 86_400_000).toISOString(),
        })
        .eq("id", listingId);
      if (error)
        throw new Error(`PW-84: activating the other seller's listing failed: ${error.message}`);
    } finally {
      await stopPageBeforePurge(other);
      await context.close();
    }
  }
});
