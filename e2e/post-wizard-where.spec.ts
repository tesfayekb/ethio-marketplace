import type { Browser, Locator, Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { purgeListingObjects } from "./helpers/photos";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { destroyLocation, seedScratchChain, waitForTreeSlug } from "./helpers/locations";
import { adminClient, leaseUser } from "./helpers/users";
import {
  bearerOf,
  completeDraft,
  coverageOf,
  destroyListingsOf,
  destroyPostableCategory,
  attributesOf,
  destroySpecSet,
  draftsOf,
  pinOf,
  pricingOf,
  confirmHomeCountry,
  postRoute,
  rand,
  seedPostableCategory,
  seedUnitFactSet,
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

/** INC-355 — the computed destructive token colour, for border comparisons. */
async function destructiveOf(page: Page): Promise<string> {
  return page.evaluate(() => {
    const probe = document.createElement("span");
    probe.style.color = "var(--destructive)";
    document.body.append(probe);
    const colour = getComputedStyle(probe).color;
    probe.remove();
    return colour;
  });
}

async function borderOf(box: Locator): Promise<string> {
  return box.evaluate((el) => getComputedStyle(el).borderTopColor);
}

test.describe("POSTING WIZARD — where the ad is shown (W6b-1)", () => {
  const categories: string[] = [];
  const sellers: string[] = [];
  const objects: { userId: string; listingId: string }[] = [];
  const places: string[] = [];
  const specs: string[] = [];

  test.afterEach(async ({ page }) => {
    await stopPageBeforePurge(page);
    for (const ref of objects.splice(0)) await purgeListingObjects(ref.userId, ref.listingId);
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
    if (specs.length > 0) await destroySpecSet(specs.splice(0));
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
    const user = await leaseUser();
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
    // D39 — a fresh visit opens at the first unfinished step: 5 is saved, so 6.
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
    await confirmHomeCountry(page, token);
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
      const user = await leaseUser();
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

  /* ============================ W6b-2 — walks ============================ */

  const control = (page: Page, attrKey: string) =>
    page.locator(`[data-testid="post-attr-control"][data-attr="${attrKey}"]`);

  /** Step 1 by search → step 3 (D39), as a seller walks it. */
  async function walkToStep3(page: Page, userId: string, category: { id: string; slug: string }) {
    await gotoReady(page, "/post");
    await page.getByTestId("post-category-search").fill(category.slug);
    const hit = page.locator(`[data-testid="post-category-hit"][data-category="${category.id}"]`);
    await expect(hit).toBeVisible({ timeout: 20_000 });
    await hit.click();
    await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    const [draft] = await draftsOf(userId);
    const listingId = String(draft?.id ?? "");
    expect(listingId, "step 1 created no draft").not.toBe("");
    objects.push({ userId, listingId });
    return listingId;
  }

  /** Step 3 → photos → details → step 5. */
  async function walkOnToStep5(page: Page) {
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-title").fill("e2e w6b2 listing title");
    await page.getByTestId("post-description").fill("e2e w6b2 listing description");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-5")).toBeVisible({ timeout: 20_000 });
  }

  /**
   * PW-88 — INC-347, re-expressed for N2: a goods unit (`unit_of_sale-`) is asked
   * on step 3. After the type is chosen, "How it's sold" shows the type's fact
   * (per_litre) and offers no per_kg; step 5 names the chosen unit read-only.
   */
  test("PW-88 a step-3 answer's fact and narrowing reach the unit asked on step 3", async ({
    page,
  }) => {
    const user = await signedInSeller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const set = await seedUnitFactSet(category.id);
    specs.push(...set.attrKeys);
    const listingId = await walkToStep3(page, user.id, category);
    const type = control(page, set.typeKey);
    await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
      timeout: 20_000,
    });
    await type.selectOption(set.typeValue);
    const basis = control(page, set.basisKey);
    await expect(basis, "PW-88: the unit does not show the type's fact").toHaveValue("per_litre", {
      timeout: 20_000,
    });
    await expect(
      basis.locator('option[value="per_kg"]'),
      "PW-88: the unit still offers per_kg",
    ).toHaveCount(0);
    // N2-a — the unit is asked before quantity: "How it's sold" renders above
    // the later-ordered row on step 3.
    await expect(control(page, set.quantityKey)).toBeVisible({ timeout: 20_000 });
    const unitBox = await basis.boundingBox();
    const quantityBox = await control(page, set.quantityKey).boundingBox();
    expect(unitBox && quantityBox, "PW-88: unit or quantity row not rendered").toBeTruthy();
    expect(unitBox!.y, "PW-88: the unit is not asked above quantity").toBeLessThan(quantityBox!.y);
    await walkOnToStep5(page);
    await expect(page.getByTestId("post-price-basis")).toHaveCount(0);
    await expect(page.getByTestId("post-price-unit-chosen")).toHaveAttribute(
      "data-basis",
      "per_litre",
      { timeout: 20_000 },
    );
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 20_000 });
    await expect
      .poll(async () => (await attributesOf(listingId))[set.basisKey], {
        message: "PW-88: the stored unit is not per_litre",
        timeout: 20_000,
      })
      .toBe("per_litre");
  });

  /**
   * PW-104 — N2: a goods unit settled by the type (Gesho → Per Kg) is filled on
   * step 3, and step 5 names it read-only with a way back to step 3.
   */
  test("PW-104 a unit settled by the type is named on step 5 and changed on step 3", async ({
    page,
  }) => {
    const user = await signedInSeller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const set = await seedUnitFactSet(category.id, { settled: true });
    specs.push(...set.attrKeys);
    const listingId = await walkToStep3(page, user.id, category);
    const type = control(page, set.typeKey);
    await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
      timeout: 20_000,
    });
    await type.selectOption(set.typeValue);
    await walkOnToStep5(page);
    await expect(page.getByTestId("post-price-basis")).toHaveCount(0);
    await expect(
      page.getByTestId("post-price-unit-chosen"),
      "PW-104: step 5 does not name the settled unit",
    ).toHaveAttribute("data-basis", "per_kg", { timeout: 20_000 });
    await page.getByTestId("post-price-unit-change").click();
    await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    await expect
      .poll(async () => (await attributesOf(listingId))[set.basisKey], {
        message: "PW-104: the settled unit was not stored",
        timeout: 20_000,
      })
      .toBe("per_kg");
  });

  /** PW-89 — A2: 5.25 × million is stored as 5250000; a reopen shows it as typed. */
  test("PW-89 thousand / million: the full amount is stored and shown", async ({ page }) => {
    const user = await signedInSeller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const listingId = await walkToStep3(page, user.id, category);
    await walkOnToStep5(page);
    await page.getByTestId("post-price-mode-fixed").click();
    const amount = page.getByTestId("post-price-amount");
    await expect(amount, "PW-89: an example number is still the placeholder").not.toHaveAttribute(
      "placeholder",
      /\d/,
    );
    await amount.fill("5.25");
    await page.getByTestId("post-price-scale").selectOption("6");
    await expect(page.getByTestId("post-price-amount-shown")).toContainText("5,250,000");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 20_000 });
    await expect
      .poll(async () => (await pricingOf(listingId)).amount, {
        message: "PW-89: the door did not store 5250000",
        timeout: 20_000,
      })
      .toBe(5_250_000);
    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-6")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    await expect(page.getByTestId("post-price-amount")).toHaveValue("5250000");
    await expect(page.getByTestId("post-price-scale")).toHaveValue("0");
  });

  /**
   * PW-90 — B1/B2/B4. Two boxes; each level's box is red until its own level is
   * chosen and clears at once; the plan reads as one line with a details toggle.
   */
  test("PW-90 two boxes, a red border per unfilled level, the plan in one line", async ({
    page,
  }) => {
    const user = await signedInSeller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const chain = await seedScratchChain("ET");
    places.push(chain.region.slug);
    await waitForTreeSlug(page, "ET", chain.city.slug);
    await openAtStep6(page, user.id, category.id);

    await expect(page.getByTestId("post-where-shown-box"), "PW-90: no Box 1").toBeVisible();
    await expect(page.getByTestId("post-where-item-box"), "PW-90: no Box 2").toBeVisible();
    await expect(page.getByTestId("post-where-plan-line"), "PW-90: no plan line").toBeVisible();
    await expect(page.getByTestId("post-where-plan")).toHaveCount(0);
    await page.getByTestId("post-where-plan-toggle").click();
    await expect(page.getByTestId("post-where-plan-details")).toBeVisible();

    const countryBox = page.locator('[data-testid="post-where-country-box"][data-primary="1"]');
    await expect(countryBox, "PW-90: a chosen country stays red").toHaveAttribute("data-red", "0");
    const region = page.getByTestId("post-where-region");
    await expect(region.locator(`option[value="${chain.region.id}"]`)).toHaveCount(1, {
      timeout: 20_000,
    });
    await region.selectOption("");
    const regionBox = page.getByTestId("post-where-region-box");
    await expect(regionBox, "PW-90: an empty region box is not red").toHaveAttribute(
      "data-red",
      "1",
    );
    expect(
      await borderOf(regionBox),
      "PW-90: the empty region border is not full destructive",
    ).toEqual(await destructiveOf(page));
    await expect(
      regionBox.locator('label[for="post-where-region"]').getByTestId("post-required-mark"),
      "PW-90: the empty region box has no asterisk",
    ).toHaveCount(1);
    await region.selectOption(chain.region.id);
    await expect(regionBox, "PW-90: a chosen region stays red").toHaveAttribute("data-red", "0");
    await expect(
      regionBox.locator('label[for="post-where-region"]').getByTestId("post-required-mark"),
      "PW-90: a chosen region keeps its asterisk",
    ).toHaveCount(0);
    const cityBox = page.getByTestId("post-where-row");
    await page.getByTestId("post-where-city").selectOption("");
    await expect(cityBox, "PW-90: an empty city box is not red").toHaveAttribute("data-red", "1");
    // INC-355 — required + empty reads as the FULL destructive border, not a 40% tint.
    const alpha = await cityBox.evaluate((el) => {
      const probe = document.createElement("span");
      probe.style.color = "var(--destructive)";
      document.body.append(probe);
      const want = getComputedStyle(probe).color;
      probe.remove();
      return { got: getComputedStyle(el).borderTopColor, want };
    });
    expect(alpha.got, "PW-90: the empty city border is not full destructive").toBe(alpha.want);
    await expect(
      cityBox.locator('label[for="post-where-city"]').getByTestId("post-required-mark"),
      "PW-90: the empty city box has no asterisk",
    ).toHaveCount(1);
    await page.getByTestId("post-where-city").selectOption(chain.city.id);
    await expect(cityBox, "PW-90: a chosen city stays red").toHaveAttribute("data-red", "0");
    await expect(
      cityBox.locator('label[for="post-where-city"]').getByTestId("post-required-mark"),
      "PW-90: a chosen city keeps its asterisk",
    ).toHaveCount(0);
  });

  /**
   * PW-91 — B1/B3. A category without `map_pin` shows no map; the location
   * details are offered anyway and stored without a pin.
   */
  test("PW-91 location details without a pin are stored in a category without map_pin", async ({
    page,
  }) => {
    const user = await signedInSeller(page);
    const category = await seedPostableCategory({ capabilities: [] });
    categories.push(category.slug);
    const listingId = await openAtStep6(page, user.id, category.id);

    await expect(page.getByTestId("post-where-item-box")).toBeVisible();
    // W6d K — the map_pin gate is gone: every category offers the map.
    await expect(page.getByTestId("post-where-pin-open")).toBeVisible();
    const details = page.getByTestId("post-where-details");
    await details.fill("  3rd floor,\tSuite <5>  ");
    await details.blur();
    await expect(page.getByTestId("post-where-details-saved")).toBeVisible({ timeout: 20_000 });
    await expect
      .poll(async () => (await pinOf(listingId)).street, {
        message: "PW-91: the details were not stored as sanitised text",
        timeout: 20_000,
      })
      .toBe("3rd floor, Suite 5");
    expect((await pinOf(listingId)).lat, "PW-91: a pin appeared from nowhere").toBeNull();
  });

  /**
   * PW-92 — C2/C4. The tile plan answers 403: the map falls back to OSM with a
   * note, a tap still drops a pin, and "Save location" is on screen at once.
   */
  test("PW-92 a refused tile plan falls back to OSM; the pin still drops and Save stays on screen", async ({
    page,
  }) => {
    const user = await signedInSeller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const listingId = await openAtStep6(page, user.id, category.id);
    await page.route("**/api/map/tiles", (route) =>
      route.request().method() === "GET"
        ? route.fulfill({ status: 403, body: "{}" })
        : route.fulfill({ status: 200, body: '{"ok":true}' }),
    );
    await page.getByTestId("post-where-pin-open").click();
    const map = page.getByTestId("post-pin-map");
    await expect(map).toHaveAttribute("data-ready", "1", { timeout: 20_000 });
    await expect(page.getByTestId("post-pin-fallback"), "PW-92: no backup-map note").toBeVisible();
    await expect(map).toHaveAttribute("data-provider", "osm");
    await map.click({ position: { x: 120, y: 90 } });
    await expect(page.getByTestId("post-pin-position")).not.toHaveAttribute("data-lat", "");
    // INC-353 — the pin and the place shape paint a real colour, never an
    // unresolved hsl(var(--…)) that the browser drops as invisible.
    const paint = await map.evaluate((el) => {
      const pin = el.querySelector(".leaflet-marker-pane span");
      const shape = el.querySelector(".leaflet-overlay-pane path");
      return {
        pin: pin === null ? null : getComputedStyle(pin).backgroundColor,
        shape: shape === null ? null : shape.getAttribute("stroke"),
      };
    });
    expect(paint.pin, "PW-92: the pin paints no colour").not.toBeNull();
    expect(paint.pin, "PW-92: the pin is transparent").not.toMatch(
      /^(rgba\(0, 0, 0, 0\)|transparent)$/,
    );
    if (paint.shape !== null) {
      expect(paint.shape, "PW-92: the place shape stroke is unresolved").not.toMatch(/var\(|hsl\(/);
    }
    await expect(
      page.getByTestId("post-pin-save"),
      "PW-92: Save location is below the fold",
    ).toBeInViewport();
    await page.getByTestId("post-pin-save").click();
    await expect(page.getByTestId("post-pin-saved")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-pin-sheet")).toHaveCount(0);
    expect((await pinOf(listingId)).lat, "PW-92: no pin reached the row").not.toBeNull();
  });
  /**
   * PW-97 — G (INC-354). The map credit is on screen and on top at every
   * width: Esri on the Esri plan (mocked), OpenStreetMap on the backup.
   */
  test("PW-97 the map credit is visible and uncovered on both plans", async ({ page }) => {
    const user = await signedInSeller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    await openAtStep6(page, user.id, category.id);
    const png = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",
      "base64",
    );
    await page.route("https://e2e-tiles.invalid/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "image/png",
        headers: { "access-control-allow-origin": "*" },
        body: png,
      }),
    );
    const plan = {
      provider: "esri",
      street: [
        { url: "https://e2e-tiles.invalid/{z}/{x}/{y}.png", attribution: "Powered by <a>Esri</a>" },
      ],
    };
    await page.route("**/api/map/tiles", (route) =>
      route.request().method() === "GET"
        ? route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(plan),
          })
        : route.fulfill({ status: 200, body: '{"ok":true}' }),
    );
    const uncovered = async (label: string) => {
      const credit = page.getByTestId("post-pin-credit");
      await credit.scrollIntoViewIfNeeded();
      await expect(credit, `PW-97: the ${label} credit is off screen`).toBeInViewport();
      const onTop = await credit.evaluate((el) => {
        const box = el.getBoundingClientRect();
        const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
        return hit !== null && (hit === el || el.contains(hit));
      });
      expect(onTop, `PW-97: the ${label} credit is covered`).toBe(true);
      return credit;
    };
    await page.getByTestId("post-where-pin-open").click();
    const map = page.getByTestId("post-pin-map");
    await expect(map).toHaveAttribute("data-ready", "1", { timeout: 20_000 });
    await expect(map).toHaveAttribute("data-provider", "esri");
    await expect(await uncovered("Esri")).toContainText("Esri");
    await page.getByTestId("post-pin-cancel").click();
    await expect(page.getByTestId("post-pin-sheet")).toHaveCount(0);

    await page.evaluate(() => sessionStorage.clear());
    await page.reload();
    await page.route("**/api/map/tiles", (route) =>
      route.request().method() === "GET"
        ? route.fulfill({ status: 403, body: "{}" })
        : route.fulfill({ status: 200, body: '{"ok":true}' }),
    );
    await page.getByTestId("post-where-pin-open").click();
    await expect(map).toHaveAttribute("data-provider", "osm", { timeout: 20_000 });
    await expect(await uncovered("OpenStreetMap")).toContainText("OpenStreetMap");
  });
  /**
   * PW-98 — the tick under the city. Bundle 2 P3 (supersedes the 2026-09-30
   * "right of the city at ≥ 768" line): at every width the marker is on its own
   * lower line of the city box.
   */
  async function tickOnCityLine(page: Page, label: string) {
    const tick = tickOf(page, "primary");
    await tick.scrollIntoViewIfNeeded();
    await expect(tick, `PW-98 ${label}: the tick is not visible`).toBeVisible();
    await expect(tick, `PW-98 ${label}: the tick is not checked`).toBeChecked();
    await expect(tick, `PW-98 ${label}: the tick is off screen`).toBeInViewport();
    const city = await page.getByTestId("post-where-city").boundingBox();
    const box = await tick.boundingBox();
    expect(city && box, `PW-98 ${label}: no geometry`).toBeTruthy();
    if (city === null || box === null) return;
    // I — the DOM evidence the report pastes: geometry and the rendered line.
    console.log(
      `[PW-98 ${label}] city=${JSON.stringify(city)} tick=${JSON.stringify(box)} line=${await page
        .locator('[data-testid="post-where-row"][data-key="primary"]')
        .evaluate((el) => el.outerHTML.replace(/\s+/g, " ").slice(0, 600))}`,
    );
    expect(box.y, `PW-98 ${label}: the tick is not under the city`).toBeGreaterThanOrEqual(
      city.y + city.height - 1,
    );
  }

  /**
   * PW-98 — I (INC-356). The "item or service is here" tick is seen and
   * checked on the city line, on a fresh post and on a prefilled one.
   */
  test("PW-98 the item tick sits on the city line, fresh and prefilled", async ({ page }) => {
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const chain = await seedScratchChain("ET");
    places.push(chain.region.slug);
    await waitForTreeSlug(page, "ET", chain.city.slug);
    const user = await signedInSeller(page);

    await openAtStep6(page, user.id, category.id);
    const region = page.getByTestId("post-where-region");
    await expect(region.locator(`option[value="${chain.region.id}"]`)).toHaveCount(1, {
      timeout: 20_000,
    });
    await region.selectOption(chain.region.id);
    await page.getByTestId("post-where-city").selectOption(chain.city.id);
    await tickOnCityLine(page, "fresh");

    const prior = await publishedAt(page, category.id, chain.city.id);
    objects.push({ userId: user.id, listingId: prior });
    await openAtStep6(page, user.id, category.id);
    await expect(page.getByTestId("post-where-city")).toHaveValue(chain.city.id, {
      timeout: 20_000,
    });
    await tickOnCityLine(page, "prefilled");
  });

  /**
   * PW-99 — J. The staircase. Bundle 2 P3 (supersedes "narrower and right-aligned"):
   * country, region, city step in by the same amount; at 360 a left rule only,
   * every select ≥ 200 px, no sideways scroll.
   */
  test("PW-99 the place boxes step in; every select stays at least 200 px", async ({ page }) => {
    const user = await signedInSeller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const chain = await seedScratchChain("ET");
    places.push(chain.region.slug);
    await waitForTreeSlug(page, "ET", chain.city.slug);
    await openAtStep6(page, user.id, category.id);
    const region = page.getByTestId("post-where-region");
    await expect(region.locator(`option[value="${chain.region.id}"]`)).toHaveCount(1, {
      timeout: 20_000,
    });
    await region.selectOption(chain.region.id);
    await page.getByTestId("post-where-city").selectOption(chain.city.id);
    const country = await page
      .locator('[data-testid="post-where-country-box"][data-primary="1"]')
      .boundingBox();
    const regionBox = await page
      .locator('[data-testid="post-where-region-box"]:has(#post-where-region)')
      .boundingBox();
    const cityRow = await page
      .locator('[data-testid="post-where-row"][data-key="primary"]')
      .boundingBox();
    expect(country && regionBox && cityRow, "PW-99: no geometry").toBeTruthy();
    if (country === null || regionBox === null || cityRow === null) return;
    expect(regionBox.x, "PW-99: the region box is not indented").toBeGreaterThan(country.x);
    expect(cityRow.x, "PW-99: the city line is not indented past the region").toBeGreaterThan(
      regionBox.x,
    );
    const firstStep = regionBox.x - country.x;
    const secondStep = cityRow.x - regionBox.x;
    expect(
      Math.abs(firstStep - secondStep),
      `PW-99: the indent does not step evenly (${firstStep} vs ${secondStep})`,
    ).toBeLessThanOrEqual(2);
    const widths = await page
      .getByTestId("post-where-shown-box")
      .locator("select")
      .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width));
    expect(widths.length, "PW-99: no selects").toBeGreaterThan(0);
    if ((page.viewportSize()?.width ?? 0) >= 768) return;
    // Ruling 2026-09-30: at 360 a nested level is a left rule only, every select
    // is at least 200 px, and the page never scrolls sideways.
    for (const width of widths) {
      expect(
        width,
        `PW-99: a select is narrower than 200 px (${widths.join(", ")})`,
      ).toBeGreaterThanOrEqual(200);
    }
    const nested = await page
      .locator(
        '[data-testid="post-where-region-box"]:has(#post-where-region), [data-testid="post-where-row"][data-key="primary"]',
      )
      .evaluateAll((els) =>
        els.map((el) => {
          const s = getComputedStyle(el);
          return [s.borderInlineEndWidth, s.borderTopWidth, s.borderInlineStartWidth];
        }),
      );
    for (const [end, top, start] of nested) {
      expect(end, "PW-99: a nested box has a side border at 360").toBe("0px");
      expect(top, "PW-99: a nested box has a top border at 360").toBe("0px");
      expect(start, "PW-99: a nested level has no left rule").not.toBe("0px");
    }
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, "PW-99: the page scrolls sideways at 360").toBeLessThanOrEqual(0);
  });

  /**
   * PW-100 — K. A category WITHOUT map_pin offers the map; the explanation line
   * and the "Show on my ad as" choice show; after Save the preview shows the pin.
   */
  test("PW-100 every category offers the map; after Save the preview shows the pin", async ({
    page,
  }) => {
    const user = await signedInSeller(page);
    const category = await seedPostableCategory({ capabilities: [] });
    categories.push(category.slug);
    const listingId = await openAtStep6(page, user.id, category.id);
    await expect(
      page.getByTestId("post-where-item-help"),
      "PW-100: no explanation line",
    ).toBeVisible();
    await expect(
      page.getByTestId("post-where-pin-open"),
      "PW-100: a category without map_pin offered no map",
    ).toBeVisible();
    await page.getByTestId("post-where-pin-open").click();
    const map = page.getByTestId("post-pin-map");
    await expect(map).toHaveAttribute("data-ready", "1", { timeout: 20_000 });
    await expect(
      page.getByTestId("post-pin-precision-label"),
      "PW-100: no Show-on-my-ad label",
    ).toBeVisible();
    await map.click({ position: { x: 120, y: 90 } });
    await expect(page.getByTestId("post-pin-position")).not.toHaveAttribute("data-lat", "");
    await page.getByTestId("post-pin-save").click();
    await expect(page.getByTestId("post-pin-saved")).toBeVisible({ timeout: 20_000 });
    await expect(
      page.getByTestId("post-where-pin-preview"),
      "PW-100: no preview after Save",
    ).toBeVisible({
      timeout: 20_000,
    });
    await expect(page.getByTestId("post-where-pin-open")).toBeVisible();
    await expect(page.getByTestId("post-pin-remove")).toBeVisible();
    expect((await pinOf(listingId)).lat, "PW-100: no pin reached the row").not.toBeNull();
  });
  /**
   * PW-96 — Part L. The zoom the seller leaves the dropper at is the zoom stored
   * (DB truth), and reopening the dropper opens at it.
   */
  test("PW-96 the saved pin keeps its zoom; the dropper reopens at it", async ({ page }) => {
    const user = await signedInSeller(page);
    const category = await seedPostableCategory({ capabilities: [] });
    categories.push(category.slug);
    const listingId = await openAtStep6(page, user.id, category.id);
    await page.getByTestId("post-where-pin-open").click();
    const map = page.getByTestId("post-pin-map");
    await expect(map).toHaveAttribute("data-ready", "1", { timeout: 20_000 });
    await map.click({ position: { x: 120, y: 90 } });
    await expect(page.getByTestId("post-pin-position")).not.toHaveAttribute("data-lat", "");
    const before = Number(await map.getAttribute("data-zoom"));
    await map.locator(".leaflet-control-zoom-out").click();
    await expect(map).toHaveAttribute("data-zoom", String(before - 1));
    await map.locator(".leaflet-control-zoom-out").click();
    await expect(map).toHaveAttribute("data-zoom", String(before - 2));
    const left = before - 2;
    await page.getByTestId("post-pin-save").click();
    await expect(page.getByTestId("post-pin-saved")).toBeVisible({ timeout: 20_000 });
    await expect.poll(async () => (await pinOf(listingId)).zoom, { timeout: 10_000 }).toBe(left);
    // The Where step's own preview map opens at the saved zoom too (exact pin).
    const preview = page.getByTestId("listing-map-pin");
    await expect(preview, "PW-96: the preview map did not open at the saved zoom").toHaveAttribute(
      "data-zoom",
      String(left),
      { timeout: 20_000 },
    );
    await page.getByTestId("post-where-pin-open").click();
    const reopened = page.getByTestId("post-pin-map");
    await expect(reopened).toHaveAttribute("data-ready", "1", { timeout: 20_000 });
    await expect(reopened, "PW-96: the dropper did not reopen at the saved zoom").toHaveAttribute(
      "data-zoom",
      String(left),
    );
  });

  /**
   * PW-101 (note) — Part D. A phone number in the location details is flagged at
   * the field as it is typed and never saved; a street note with a house number
   * is saved (DB truth).
   */
  test("PW-101 the location details refuse a phone number and keep a street note", async ({
    page,
  }) => {
    const user = await signedInSeller(page);
    const category = await seedPostableCategory({ capabilities: [] });
    categories.push(category.slug);
    const listingId = await openAtStep6(page, user.id, category.id);
    const details = page.getByTestId("post-where-details");
    await details.fill("+251 911 234 567");
    await expect(
      page.getByTestId("post-where-details-contact"),
      "PW-101: the phone number was not flagged as typed",
    ).toBeVisible();
    await expect(details).toHaveAttribute("aria-invalid", "true");
    await details.blur();
    await expect(page.getByTestId("post-where-details-saved")).toHaveCount(0);

    const street = "Bole Road, House 1234, 3rd floor";
    await details.fill(street);
    await expect(page.getByTestId("post-where-details-contact")).toHaveCount(0);
    await details.blur();
    await expect(page.getByTestId("post-where-details-saved")).toBeVisible({ timeout: 20_000 });
    await expect
      .poll(async () => (await pinOf(listingId)).street, { timeout: 10_000 })
      .toBe(street);
  });
});
