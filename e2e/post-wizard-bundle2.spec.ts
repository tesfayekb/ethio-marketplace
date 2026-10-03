import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { purgeListingObjects } from "./helpers/photos";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { destroyLocation, seedScratchChain, waitForTreeSlug } from "./helpers/locations";
import { adminClient, leaseUser } from "./helpers/users";
import {
  activeCityOf,
  bearerOf,
  completeDraft,
  contactPrefOf,
  coverageOf,
  destroyListingsOf,
  destroyPostableCategory,
  pinOf,
  postRoute,
  rand,
  seedPostableCategory,
  stopPageBeforePurge,
} from "./helpers/posting";

/**
 * Bundle 2 — the owed screen proofs for steps 5, 10, 11, 14 and 16 (PW-113..PW-118).
 *
 * Scratch categories and places only (J3); DB truth through the service client
 * (J4); cleanup in an afterEach that first stops the page (INC-323).
 */

const DRAFT = "/api/listings/draft";
const PUBLISH = "/api/listings/publish";

async function placeTextOf(listingId: string) {
  const { data, error } = await adminClient()
    .from("listings")
    .select("street_address,directions")
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:b2] reading the place text failed: ${error.message}`);
  return { street: data?.street_address ?? null, directions: data?.directions ?? null };
}

test.describe("POSTING WIZARD — bundle 2 place and contact", () => {
  const categories: string[] = [];
  const sellers: string[] = [];
  const objects: { userId: string; listingId: string }[] = [];
  const places: string[] = [];

  test.afterEach(async ({ page }) => {
    await stopPageBeforePurge(page);
    for (const ref of objects.splice(0)) await purgeListingObjects(ref.userId, ref.listingId);
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
    for (const slug of places.splice(0)) await destroyLocation(slug);
  });

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

  async function category(capabilities: string[] = []) {
    const row = await seedPostableCategory({ capabilities });
    categories.push(row.slug);
    return row;
  }

  /** A draft saved through the seller's own door up to `step`, then opened on screen. */
  async function openDraft(
    page: Page,
    userId: string,
    categoryId: string,
    step: 5 | 6,
    coverage: string[] = [],
  ) {
    const token = await bearerOf(page);
    const draft = await postRoute(
      page,
      DRAFT,
      {
        listingId: null,
        step,
        categoryId,
        title: `e2e bundle2 ${rand()}`,
        description: "e2e bundle2 listing description",
        attributes: {},
        priceMode: "free",
        ...(step === 6 ? { coverage } : {}),
      },
      { token, country: "ET" },
    );
    expect(draft.payload["ok"], `draft refused: ${JSON.stringify(draft.payload)}`).toBe(true);
    const listingId = String(draft.payload["listing_id"] ?? "");
    expect(listingId, "no draft id").not.toBe("");
    objects.push({ userId, listingId });
    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId(`post-step-${step + 1}`)).toBeVisible({ timeout: 20_000 });
    return listingId;
  }

  /** The seller's last post, past the draft stage, at one place. */
  async function lastPostAt(page: Page, userId: string, categoryId: string, placeId: string) {
    const token = await bearerOf(page);
    const draft = await postRoute(
      page,
      DRAFT,
      completeDraft({ categoryId, cityId: placeId, title: `e2e bundle2 prior ${rand()}` }),
      { token, country: "ET" },
    );
    expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
    const listingId = String(draft.payload["listing_id"] ?? "");
    const published = await postRoute(page, PUBLISH, { listingId }, { token, country: "ET" });
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    objects.push({ userId, listingId });
    return listingId;
  }

  async function savePinOnMap(page: Page, x: number, y: number) {
    await page.getByTestId("post-where-pin-open").click();
    const map = page.getByTestId("post-pin-map");
    await expect(map).toHaveAttribute("data-ready", "1", { timeout: 20_000 });
    await map.click({ position: { x, y } });
    await expect(page.getByTestId("post-pin-position")).not.toHaveAttribute("data-lat", "");
    await page.getByTestId("post-pin-save").click();
    await expect(page.getByTestId("post-pin-saved")).toBeVisible({ timeout: 20_000 });
  }

  test("PW-113 directions are saved, survive a pin move, and refuse a phone number", async ({
    page,
  }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    const listingId = await openDraft(page, user.id, leaf.id, 5);

    const directions = page.getByTestId("post-where-directions");
    // Step 5 — the directions line keeps contactInNote, flagged as typed.
    await directions.fill("call 0911-234567");
    await expect(
      page.getByTestId("post-where-directions-contact"),
      "PW-113: a phone number in the directions was not flagged",
    ).toBeVisible();
    await directions.blur();
    await expect(page.getByTestId("post-where-directions-saved")).toHaveCount(0);

    await directions.fill("Behind the blue gate, 2nd floor");
    await directions.blur();
    await expect(page.getByTestId("post-where-directions-saved")).toBeVisible({ timeout: 20_000 });
    await expect
      .poll(async () => (await placeTextOf(listingId)).directions, { timeout: 10_000 })
      .toBe("Behind the blue gate, 2nd floor");

    await savePinOnMap(page, 120, 90);
    const first = await pinOf(listingId);
    await savePinOnMap(page, 200, 140);
    await expect
      .poll(async () => (await pinOf(listingId)).lat, { timeout: 10_000 })
      .not.toBe(first.lat);
    expect(
      (await placeTextOf(listingId)).directions,
      "PW-113: moving the pin cleared the directions",
    ).toBe("Behind the blue gate, 2nd floor");
  });

  test("PW-114 a second phone appears on request and is stored as phone2", async ({ page }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    const city = await activeCityOf("ET");
    const listingId = await openDraft(page, user.id, leaf.id, 6, [city.id]);

    await expect(page.getByTestId("post-who-channel-phone2")).toHaveCount(0);
    await page.getByTestId("post-who-add-phone2").click();
    await expect(page.getByTestId("post-who-channel-phone2")).toBeVisible();
    await page.getByTestId("post-who-value-phone2").fill("922345678");
    await page.getByTestId("post-who-value-phone2").blur();
    await page.getByTestId("post-who-show-phone2").check();
    await expect
      .poll(
        async () => {
          const entry = (await contactPrefOf(listingId))["phone2"] as
            | { show?: boolean; value?: string }
            | undefined;
          return `${entry?.show === true}:${entry?.value ?? ""}`;
        },
        { message: "PW-114: the second phone never reached the draft", timeout: 20_000 },
      )
      .toBe("true:+251922345678");
  });

  async function seedLastPin(lastId: string) {
    const { error } = await adminClient()
      .from("listings")
      .update({
        pin_lat: 9.0301,
        pin_lng: 38.7401,
        pin_precision: "exact",
        pin_zoom: 15,
        street_address: "e2e carried details",
        directions: "e2e carried directions",
      })
      .eq("id", lastId);
    if (error) throw new Error(`[e2e:b2] seeding the last pin failed: ${error.message}`);
  }

  test("PW-115 without own_place the last post's pin, directions and details carry over", async ({
    page,
  }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    const city = await activeCityOf("ET");
    const lastId = await lastPostAt(page, user.id, leaf.id, city.id);
    await seedLastPin(lastId);

    const listingId = await openDraft(page, user.id, leaf.id, 5);
    await expect(
      page.getByTestId("post-where-pin-carried"),
      "PW-115: no 'From your last post' line",
    ).toBeVisible({ timeout: 20_000 });
    await expect
      .poll(async () => (await pinOf(listingId)).zoom, {
        message: "PW-115: the pin never reached the draft",
        timeout: 20_000,
      })
      .toBe(15);
    expect(await placeTextOf(listingId)).toEqual({
      street: "e2e carried details",
      directions: "e2e carried directions",
    });
  });

  test("PW-116 an own_place category never carries the last post's pin", async ({ page }) => {
    const user = await signedInSeller(page);
    const plain = await category();
    const own = await category(["map_pin", "own_place"]);
    const city = await activeCityOf("ET");
    const lastId = await lastPostAt(page, user.id, plain.id, city.id);
    await seedLastPin(lastId);

    const listingId = await openDraft(page, user.id, own.id, 5);
    await expect(page.getByTestId("post-where-prefilled")).toBeVisible({ timeout: 20_000 });
    // Give the carry every chance to run, then read DB truth.
    await page.waitForTimeout(3_000);
    await expect(page.getByTestId("post-where-pin-carried")).toHaveCount(0);
    expect((await pinOf(listingId)).lat, "PW-116: an own_place leaf carried the pin").toBeNull();
    expect(await placeTextOf(listingId)).toEqual({ street: null, directions: null });
  });

  test("PW-117 two sub-cities of one city both save and count as that one city", async ({
    page,
  }) => {
    const chain = await seedScratchChain("ET");
    places.push(chain.region.slug);
    const { data: second, error } = await adminClient()
      .from("locations")
      .insert({
        parent_id: chain.city.id,
        level: "sub_city",
        country_code: "ET",
        slug: `e2e-scratch-b2sub-${rand()}`.toLowerCase(),
        name_en: `e2e-scratch-b2sub-${rand()}`.toLowerCase(),
        is_active: true,
        source: "admin",
        center_lat: 9.03,
        center_lng: 38.74,
      })
      .select("id, slug")
      .single();
    if (error || !second) throw new Error(`[e2e:b2] second sub-city failed: ${error?.message}`);
    const user = await signedInSeller(page);
    await waitForTreeSlug(page, "ET", second.slug);
    const leaf = await category();
    const listingId = await openDraft(page, user.id, leaf.id, 5);

    await page.getByTestId("post-where-region").selectOption(chain.region.id);
    await page.getByTestId("post-where-city").selectOption(chain.city.id);
    await expect(page.getByTestId("post-where-subcity-box")).toBeVisible();
    await page.getByTestId("post-where-subcity").selectOption(chain.subCity.id);
    await page.getByTestId("post-where-add-subcity").click();
    await page.getByTestId("post-where-row-subcity").selectOption(second.id);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-7"), "PW-117: Next did not pass").toBeVisible({
      timeout: 20_000,
    });
    const saved = await coverageOf(listingId);
    expect([...saved.placeIds].sort()).toEqual([chain.subCity.id, second.id].sort());
  });
});
