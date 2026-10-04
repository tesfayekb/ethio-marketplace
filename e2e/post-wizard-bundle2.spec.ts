import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { purgeListingObjects } from "./helpers/photos";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { destroyLocation, seedScratchChain, waitForTreeSlug } from "./helpers/locations";
import { adminClient } from "./helpers/users";
import { seedActiveListing } from "./helpers/categories";
import {
  leaseSeller,
  activeCityOf,
  bearerOf,
  completeDraft,
  contactPrefOf,
  coverageOf,
  destroyListingsOf,
  destroyPostableCategory,
  identityOf,
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

/**
 * B1 (walk defect) — what the walk saw: the number box sits inside the viewport
 * and is at least 160 px wide, the picker no wider than 120 px.
 */
async function expectPhoneRowUsable(page: Page, testId: string) {
  const viewport = page.viewportSize();
  const box = await page.getByTestId(testId).boundingBox();
  const picker = await page.getByTestId(`${testId}-country`).boundingBox();
  const shown = `number=${JSON.stringify(box)} picker=${JSON.stringify(picker)} viewport=${viewport?.width}`;
  expect(box, `${testId}: the number box is not rendered (${shown})`).not.toBeNull();
  expect(picker, `${testId}: the picker is not rendered (${shown})`).not.toBeNull();
  if (box === null || picker === null || viewport === null) return;
  expect(box.x, `${testId}: the number box starts off screen (${shown})`).toBeGreaterThanOrEqual(0);
  expect(
    box.x + box.width,
    `${testId}: the number box ends off screen (${shown})`,
  ).toBeLessThanOrEqual(viewport.width);
  expect(box.width, `${testId}: the number box is under 160 px (${shown})`).toBeGreaterThanOrEqual(
    160,
  );
  expect(picker.width, `${testId}: the picker is over 120 px (${shown})`).toBeLessThanOrEqual(120);
}

/** B1 — the number is entered as a person does: click the box, type on the keyboard. */
async function typePhone(page: Page, testId: string, text: string) {
  await page.getByTestId(testId).click();
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.press("Backspace");
  await page.keyboard.type(text);
}

/** B2 — the country is picked from the searchable list, by its calling code. */
async function pickPhoneCountry(page: Page, testId: string, iso: string, code: string) {
  await page.getByTestId(`${testId}-country`).click();
  await page.getByTestId(`${testId}-country-search`).fill(code);
  await page.locator(`[data-testid="${testId}-country-option"][data-iso="${iso}"]`).click();
  await expect(page.getByTestId(`${testId}-country`)).toHaveAttribute("data-iso", iso);
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

  async function signedInSeller(page: Page, options: { homeConfirmed?: boolean } = {}) {
    const user = await leaseSeller(options);
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
    step: 3 | 5 | 6,
    coverage: string[] = [],
    prepare?: (listingId: string) => Promise<void>,
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
    if (prepare) await prepare(listingId);
    await gotoReady(page, `/post/${listingId}`);
    // A step-3 draft reopens on its photos, whatever number that screen carries.
    const opened =
      step === 3
        ? page.locator('section[data-testid^="post-step-"]')
        : page.getByTestId(`post-step-${step + 1}`);
    await expect(opened).toBeVisible({ timeout: 20_000 });
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

  /**
   * PW-129 (bundle 3 rulings 4 item 4) — Next on the contact step never judges
   * before the seller's identity has been read: the read is held back, Next is
   * pressed, nothing is refused; the read is released and Next moves on.
   */
  test("PW-129 Next waits for the identity read instead of refusing", async ({ page }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    const city = await activeCityOf("ET");
    let release: () => void = () => {};
    const released = new Promise<void>((resolve) => {
      release = resolve;
    });
    let held = 0;
    await page.route("**/rest/v1/profiles?*", async (route) => {
      const url = route.request().url();
      if (route.request().method() === "GET" && url.includes("seller_alias")) {
        held += 1;
        await released;
      }
      await route.continue();
    });
    await openDraft(page, user.id, leaf.id, 6, [city.id]);
    await expect.poll(() => held, { message: "PW-129: the identity read was never held" }).toBe(1);

    await page.getByTestId("post-next").click();
    await expect(
      page.getByTestId("post-who-country-refusal"),
      "PW-129: Next refused a confirmed seller before the identity was read",
    ).toHaveCount(0);
    await expect(page.getByTestId("post-step-7")).toBeVisible();

    release();
    await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-who-country-refusal")).toHaveCount(0);
  });

  /**
   * PW-130 (bundle 3 steps 18, 19, 21) — a refused name says why and offers three
   * free names built from the seller's own Latin names; checking claims nothing,
   * and the tapped name is claimed when the step is saved.
   */
  test("PW-130 a refused seller name offers three free names, claimed on save", async ({
    page,
  }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    const city = await activeCityOf("ET");
    await openDraft(page, user.id, leaf.id, 6, [city.id]);
    const before = (await identityOf(user.id)).alias;
    const last = `zq${rand().replace(/[0-9]/g, "x")}`;
    await page.getByTestId("post-who-first").fill("Abebe");
    await page.getByTestId("post-who-last").fill(last);
    await page.getByTestId("post-who-alias").fill("abebe_support");
    await expect(
      page.getByTestId("post-who-alias-refusal"),
      "PW-130: a role word was not refused on screen",
    ).toBeVisible();
    const offered = page.getByTestId("post-who-alias-suggestion");
    await expect(offered, "PW-130: the refusal did not offer three names").toHaveCount(3, {
      timeout: 20_000,
    });
    const names = (await offered.allTextContents()).map((name) => name.trim());
    const picked = names[0] ?? "";
    expect(picked, "PW-130: the first suggestion is not built from the names").toContain("abebe");
    await page.locator(`[data-testid="post-who-alias-suggestion"][data-name="${picked}"]`).click();
    await expect(page.getByTestId("post-who-alias-ok")).toBeVisible({ timeout: 20_000 });
    expect((await identityOf(user.id)).alias, "PW-130: checking claimed the name").toBe(before);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
    expect((await identityOf(user.id)).alias, "PW-130: saving did not claim the name").toBe(picked);
  });

  /**
   * PW-131 (bundle 3 step 19) — the imitation check is the identity route's second
   * layer: a name the check door answers free is still refused when the step is
   * saved if it imitates a brand (fake mode: "cocacola"), and the step stays.
   */
  test("PW-131 an imitating name is refused when the step is saved", async ({ page }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    const city = await activeCityOf("ET");
    await openDraft(page, user.id, leaf.id, 6, [city.id]);
    const before = (await identityOf(user.id)).alias;
    await page.getByTestId("post-who-alias").fill(`cocacola_${rand()}`.slice(0, 30));
    await expect(page.getByTestId("post-who-alias-ok")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-next").click();
    await expect(
      page.getByTestId("post-who-alias-refusal"),
      "PW-131: the imitation was not refused on save",
    ).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-step-7")).toBeVisible();
    expect((await identityOf(user.id)).alias, "PW-131: a refused name reached the profile").toBe(
      before,
    );
  });

  /**
   * PW-132 (walk fix 4) — a non-Latin name typed BY KEYBOARD shows the Latin
   * line AS the refusal at the box, in place of the general shape message, and
   * no suggestions are asked for such a name.
   */
  test("PW-132 a non-Latin seller name shows the Latin line as the refusal", async ({ page }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    const city = await activeCityOf("ET");
    await openDraft(page, user.id, leaf.id, 6, [city.id]);
    // Ruling 1 — no sleep: record every alias-door call, then prove by truth
    // that none carried the non-Latin text once a Latin name is confirmed ok.
    const aliasCalls: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/api/listings/alias")) {
        aliasCalls.push(request.postData() ?? "");
      }
    });
    const box = page.getByTestId("post-who-alias");
    await box.pressSequentially("ፊደል", { delay: 40 });
    const latin = page.getByTestId("post-who-alias-latin");
    await expect(latin, "PW-132: no Latin line for a non-Latin name").toBeVisible();
    await expect(latin, "PW-132: the Latin line is not the refusal").toHaveClass(
      /text-destructive/,
    );
    await expect(
      page.getByTestId("post-who-alias-refusal"),
      "PW-132: the general shape message shows beside the Latin line",
    ).toHaveCount(0);
    await box.clear();
    const freeName = `selam${Math.random().toString(36).slice(2, 8).replace(/[^a-z]/g, "q")}`;
    await box.pressSequentially(freeName, { delay: 40 });
    await expect(
      page.getByTestId("post-who-alias-ok"),
      "PW-132: a free Latin name was not confirmed",
    ).toBeVisible();
    expect(
      aliasCalls.some((body) => body.includes("ፊደል")),
      "PW-132: a door call carried the non-Latin name",
    ).toBe(false);
  });

  test("PW-114 a second phone appears on request and is stored as phone2", async ({ page }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    const city = await activeCityOf("ET");
    const listingId = await openDraft(page, user.id, leaf.id, 6, [city.id]);

    await expect(page.getByTestId("post-who-channel-phone2")).toHaveCount(0);
    // B4 — the second phone opens on the first phone's country.
    await expectPhoneRowUsable(page, "post-who-value-phone");
    await pickPhoneCountry(page, "post-who-value-phone", "ER", "+291");
    await typePhone(page, "post-who-value-phone", "7123456");
    await page.getByTestId("post-who-add-phone2").click();
    await expect(page.getByTestId("post-who-channel-phone2")).toBeVisible();
    await expect(
      page.getByTestId("post-who-value-phone2-country"),
      "PW-114: the second phone did not open on the first phone's country",
    ).toHaveAttribute("data-iso", "ER");
    await expectPhoneRowUsable(page, "post-who-value-phone2");
    await pickPhoneCountry(page, "post-who-value-phone2", "ET", "+251");
    await typePhone(page, "post-who-value-phone2", "922345678");
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

  test("PW-122 an empty phone box opens on the country of the item's place", async ({ page }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    // The door accepts places in open markets only, so the item's place is an
    // Ethiopian city and the seller's home country is moved away from it; the
    // lease resets it (users.ts).
    const { error } = await adminClient()
      .from("profiles")
      .update({ home_country_code: "US" })
      .eq("user_id", user.id);
    if (error) throw new Error(`[e2e:pw122] moving the home country failed: ${error.message}`);
    const city = await activeCityOf("ET");
    await openDraft(page, user.id, leaf.id, 6, [city.id]);
    await expectPhoneRowUsable(page, "post-who-value-phone");
    await expect(
      page.getByTestId("post-who-value-phone-country"),
      "PW-122: the empty phone did not open on the item place's country",
    ).toHaveAttribute("data-iso", "ET", { timeout: 20_000 });
  });

  test("PW-123 Post another ad opens step 1 with no draft carried", async ({ page }) => {
    // Exercises the country control, so its seller's home country is unconfirmed.
    const user = await signedInSeller(page, { homeConfirmed: false });
    const leaf = await category();
    const city = await activeCityOf("ET");
    await openDraft(page, user.id, leaf.id, 6, [city.id]);
    await page.getByTestId("post-who-alias").fill(`e2e_${rand()}`.slice(0, 30).toLowerCase());
    await expect(page.getByTestId("post-who-alias-ok")).toBeVisible({ timeout: 20_000 });
    // Bundle 3 step 12 — the guessed home country is confirmed on the contact step.
    await expect(page.getByTestId("post-who-country-required")).toBeVisible();
    await page.getByTestId("post-who-country-confirm").click();
    // Walk fix 5 — the confirm button opens the dialog; only its Yes confirms.
    await page.getByTestId("post-who-country-yes").click();
    await expect(page.getByTestId("post-who-country")).toBeDisabled({ timeout: 20_000 });
    await expect(page.getByTestId("post-who-country-required")).toHaveCount(0);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-publish").click();
    await expect(page.getByTestId("post-in-review")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-review-mylistings")).toBeVisible();
    await page.getByTestId("post-review-another").click();
    await expect(page.getByTestId("post-step-1"), "PW-123: not on step 1").toBeVisible({
      timeout: 20_000,
    });
    expect(new URL(page.url()).pathname, "PW-123: a draft address was carried").toBe("/post");
  });

  test("PW-124 the phone box shows an example and a length hint per country", async ({ page }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    const city = await activeCityOf("ET");
    await openDraft(page, user.id, leaf.id, 6, [city.id]);
    const box = page.getByTestId("post-who-value-phone");
    const hint = page.getByTestId("post-who-value-phone-length-hint");
    await expect(page.getByTestId("post-who-value-phone-country")).toHaveAttribute(
      "data-iso",
      "ET",
      { timeout: 20_000 },
    );
    await expect(box, "PW-124: no Ethiopian example").toHaveAttribute("placeholder", "911234567");
    await pickPhoneCountry(page, "post-who-value-phone", "KE", "254");
    await expect(box, "PW-124: the example did not follow the country").toHaveAttribute(
      "placeholder",
      "712123456",
    );
    await typePhone(page, "post-who-value-phone", "7121");
    await expect(hint, "PW-124: no hint for a short number").toHaveAttribute("data-hint", "short");
    await typePhone(page, "post-who-value-phone", "712123456");
    await expect(hint, "PW-124: the hint stayed for a full number").toHaveCount(0);
  });

  test("PW-125 the phone box keeps digits only and saves the number as read", async ({ page }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    const city = await activeCityOf("ET");
    const listingId = await openDraft(page, user.id, leaf.id, 6, [city.id]);
    const box = page.getByTestId("post-who-value-phone");
    await expect(page.getByTestId("post-who-value-phone-country")).toHaveAttribute(
      "data-iso",
      "ET",
      { timeout: 20_000 },
    );
    // Bundle 3 step 11 — letters typed on the keyboard never appear.
    await typePhone(page, "post-who-value-phone", "09ab11-23c4567");
    await expect(box, "PW-125: a letter stayed in the box").toHaveValue("0911-234567");
    await box.blur();
    // The judge row ET "0911234567": saved +251911234567, shown "91 123 4567".
    await expect(box, "PW-125: the number was not shown grouped").toHaveValue("91 123 4567");
    await page.getByTestId("post-who-show-phone").check();
    await expect
      .poll(
        async () => ((await contactPrefOf(listingId))["phone"] as { value?: string })?.value ?? "",
        { message: "PW-125: the read number never reached the draft", timeout: 20_000 },
      )
      .toBe("+251911234567");
  });

  test("PW-127 picking a home country only selects; Next refuses until it is confirmed", async ({
    page,
  }) => {
    const user = await signedInSeller(page, { homeConfirmed: false });
    const leaf = await category();
    const city = await activeCityOf("ET");
    await openDraft(page, user.id, leaf.id, 6, [city.id]);
    const select = page.getByTestId("post-who-country");
    await expect(select).toBeEnabled({ timeout: 20_000 });
    // Every identity save the screen sends from here on (the old screen sent one per pick).
    const identitySaves: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/api/listings/identity") && request.method() === "POST") {
        identitySaves.push(request.postData() ?? "");
      }
    });
    await select.selectOption("");
    await select.selectOption("ET");
    // Rulings 3 item 3 — choosing from the list never confirms.
    await expect(
      page.getByTestId("post-who-country-confirm"),
      "PW-127: picking from the list confirmed the country",
    ).toBeVisible();
    const { data: before, error } = await adminClient()
      .from("user_directory")
      .select("country_source")
      .eq("user_id", user.id)
      .single();
    if (error) throw new Error(`[e2e:pw127] reading the directory failed: ${error.message}`);
    expect(before.country_source, "PW-127: the pick was saved as confirmed").not.toBe(
      "user_confirmed",
    );
    await page.getByTestId("post-next").click();
    await expect(
      page.getByTestId("post-who-country-refusal"),
      "PW-127: Next did not refuse at the country",
    ).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("post-step-7")).toBeVisible();
    expect(identitySaves, "PW-127: picking from the list sent a confirm").toEqual([]);
    await page.getByTestId("post-who-country-confirm").click();
    // Walk fix 5 — the confirm button opens the dialog; only its Yes confirms.
    await page.getByTestId("post-who-country-yes").click();
    await expect(select).toBeDisabled({ timeout: 20_000 });
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-8"), "PW-127: confirmed, still held").toBeVisible({
      timeout: 20_000,
    });
  });

  test("PW-128 a number typed before the phone library arrives is saved only once read", async ({
    page,
  }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    const city = await activeCityOf("ET");
    // INC-407 — hold the library back until the seller has typed and left the box.
    let release: () => void = () => undefined;
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    // Dev serves it as libphonenumber-js_min.js; the built app as its own min-<hash>.js chunk.
    await page.route(/(libphonenumber|\/assets\/min-[\w-]+\.js$)/, async (route) => {
      await held;
      await route.continue();
    });
    const listingId = await openDraft(page, user.id, leaf.id, 6, [city.id]);
    await expect(page.getByTestId("post-who-value-phone-country")).toHaveAttribute(
      "data-iso",
      "ET",
      { timeout: 20_000 },
    );
    await typePhone(page, "post-who-value-phone", "0911234567");
    await page.getByTestId("post-who-value-phone").blur();
    // A tap on the switch saves the step at once: that save must carry no number.
    const saved = page.waitForResponse(
      (response) => response.url().includes(DRAFT) && response.request().method() === "POST",
    );
    await page.getByTestId("post-who-show-phone").check();
    await saved;
    const phoneOf = async () =>
      ((await contactPrefOf(listingId))["phone"] as { value?: string } | undefined)?.value ?? "";
    expect(await phoneOf(), "PW-128: a number was saved before the library read it").toBe("");
    release();
    await expect
      .poll(phoneOf, {
        message: "PW-128: the read number never reached the draft",
        timeout: 20_000,
      })
      .toBe("+251911234567");
    await expect(page.getByTestId("post-who-value-phone")).toHaveValue("91 123 4567");
  });

  test("PW-126 a carried number reopens grouped", async ({ page }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    const city = await activeCityOf("ET");
    await openDraft(page, user.id, leaf.id, 6, [city.id], async (listingId) => {
      const { error } = await adminClient()
        .from("listings")
        .update({ contact_pref: { messages: true, phone: { value: "+447400123456", show: true } } })
        .eq("id", listingId);
      if (error) throw new Error(`[e2e:pw126] seeding the phone failed: ${error.message}`);
    });
    await expect(page.getByTestId("post-who-value-phone-country")).toHaveAttribute(
      "data-iso",
      "GB",
      { timeout: 20_000 },
    );
    await expect(
      page.getByTestId("post-who-value-phone"),
      "PW-126: the carried number did not reopen grouped",
    ).toHaveValue("7400 123456", { timeout: 20_000 });
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
    // The draft's own text read settles before any carry could run (the line shows).
    await expect(page.getByTestId("post-where-directions")).toBeEditable();
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
    // W1 — one city box holds both sub-city boxes.
    const region = page.locator(
      `[data-testid="post-where-region-box"][data-region="${chain.region.id}"]`,
    );
    await expect(region.getByTestId("post-where-row"), "PW-117: not one city box").toHaveCount(1);
    const subBoxes = region.getByTestId("post-where-row").getByTestId("post-where-subcity-box");
    await expect(subBoxes, "PW-117: not two sub-city boxes in the city box").toHaveCount(2);
    // W2 — the second sub-city picker leaves out the first one's choice.
    const secondPicker = subBoxes.nth(1).getByTestId("post-where-row-subcity");
    await expect(
      secondPicker.locator(`option[value="${chain.subCity.id}"]`),
      "PW-117: the second picker offered the first sub-city again",
    ).toHaveCount(0);
    await secondPicker.selectOption(second.id);
    await expect(
      page.getByTestId("post-where-add-subcity"),
      "PW-117: Add sub-city still drawn with nothing left",
    ).toHaveCount(0);
    // The tick can sit on either sub-city box.
    await subBoxes.nth(1).getByTestId("post-where-item-tick").check();
    await expect(subBoxes.nth(1)).toHaveAttribute("data-item", "1");
    await expect
      .poll(async () => [...(await coverageOf(listingId)).placeIds].sort(), { timeout: 15_000 })
      .toEqual([chain.subCity.id, second.id].sort());
    // R3 — Remove on one sub-city box removes that place; the other stays saved.
    await subBoxes.nth(0).getByTestId("post-where-remove").click();
    await expect(subBoxes, "PW-117: Remove did not remove one sub-city box").toHaveCount(1);
    await expect
      .poll(async () => [...(await coverageOf(listingId)).placeIds], { timeout: 15_000 })
      .toEqual([second.id]);
    // R3 — with one place, no Remove is drawn.
    await expect(
      page.getByTestId("post-where-remove"),
      "PW-117: a lone place offered Remove",
    ).toHaveCount(0);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-7"), "PW-117: Next did not pass").toBeVisible({
      timeout: 20_000,
    });
    const saved = await coverageOf(listingId);
    expect([...saved.placeIds]).toEqual([second.id]);
  });

  /** Step 15 — the browser's read of the seller's last post's channels. */
  function lastContactRead(page: Page) {
    return page.waitForResponse(
      (response) =>
        // INC-389 — contact_pref is private; the owner-only door reads it.
        response.url().includes("/rest/v1/rpc/my_last_listing_private"),
      { timeout: 30_000 },
    );
  }

  test("PW-118 a draft's own channel is never overwritten by the last post's", async ({ page }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    const city = await activeCityOf("ET");
    const lastId = await lastPostAt(page, user.id, leaf.id, city.id);
    const carried = { messages: true, phone: { show: true, value: "+251911234567" } };
    const own = { messages: true, whatsapp: { show: true, value: "+251933456789" } };
    const { error } = await adminClient()
      .from("listings")
      .update({ contact_pref: carried })
      .eq("id", lastId);
    if (error) throw new Error(`[e2e:pw118] seeding the last post failed: ${error.message}`);

    const listingId = await openDraft(page, user.id, leaf.id, 6, [city.id], async (id) => {
      const { error: ownError } = await adminClient()
        .from("listings")
        .update({ contact_pref: own })
        .eq("id", id);
      if (ownError) throw new Error(`[e2e:pw118] seeding the draft failed: ${ownError.message}`);
    });
    await expect(page.getByTestId("post-who-value-whatsapp")).toHaveValue(/^93 ?345 ?6789$/);
    await expect(page.getByTestId("post-who-contact-carried")).toHaveCount(0);
    await expect(page.getByTestId("post-who-value-phone")).toHaveValue("");
    const pref = await contactPrefOf(listingId);
    expect(pref["whatsapp"], "PW-118: the draft's own channel changed").toEqual(own.whatsapp);
    expect(pref["phone"] ?? null, "PW-118: the last post's phone was written").toBeNull();
  });

  test("PW-119 another seller's visible phone is never carried", async ({ page }) => {
    const other = await leaseSeller();
    sellers.push(other.id);
    const leaf = await category();
    const otherId = await seedActiveListing(leaf.id, other.id);
    const { error } = await adminClient()
      .from("listings")
      .update({ contact_pref: { messages: true, phone: { show: true, value: "+251944567890" } } })
      .eq("id", otherId);
    if (error) throw new Error(`[e2e:pw119] seeding the other seller failed: ${error.message}`);
    const user = await signedInSeller(page);
    const city = await activeCityOf("ET");
    const read = lastContactRead(page);
    const listingId = await openDraft(page, user.id, leaf.id, 6, [city.id]);
    expect((await read).ok(), "PW-119: the last post's read failed").toBe(true);
    await expect(page.getByTestId("post-who-contact-carried")).toHaveCount(0);
    await expect(page.getByTestId("post-who-value-phone")).toHaveValue("");
    const pref = await contactPrefOf(listingId);
    expect(pref["phone"] ?? null, "PW-119: another seller's phone was carried").toBeNull();
  });

  test("PW-121 a phone number in the title or description is flagged at its field", async ({
    page,
  }) => {
    const user = await signedInSeller(page);
    const leaf = await category();
    await openDraft(page, user.id, leaf.id, 3);
    // The step-3 draft reopens on its photos; Next leads to the title and description.
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-title")).toBeVisible({ timeout: 20_000 });
    for (const id of ["post-title", "post-description"]) {
      const box = page.getByTestId(id);
      const refusal = page
        .locator('[data-testid="post-field"]')
        .filter({ has: box })
        .getByTestId("post-field-refusal");
      await box.fill("call me on 0911 234 567");
      await expect(refusal, `PW-121: ${id} did not flag the phone number`).toBeVisible();
      await box.fill("Toyota Corolla 2008 1300 in very good condition");
      await box.blur();
      await expect(refusal, `PW-121: ${id} flagged a car's year and engine`).toHaveCount(0);
    }
  });
});
