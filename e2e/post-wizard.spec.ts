import { join } from "node:path";

import { expect, test } from "./fixtures";

import { purgeListingObjects, photoRowsOf } from "./helpers/photos";
import { gotoReady, openRailScope, signInViaSession } from "./helpers/ui";
import { destroyLocation, seedScratchChain } from "./helpers/locations";
import { createUser } from "./helpers/users";
import {
  attributesOf,
  coverageOf,
  pricingOf,
  destroyCategoryBranch,
  destroyListingsOf,
  destroyPostableCategory,
  draftsOf,
  seedCategoryBranch,
  destroySpecSet,
  seedPostableCategory,
  seedSpecSet,
  textOf,
} from "./helpers/posting";

/**
 * U6-C1a — THE POSTING WIZARD, STEPS 1–2 (PW-1..PW-4, PW-7, PW-8).
 *
 * The subject is the SELLER'S SEAM: what a 360-pixel screen renders, what it
 * sends, and what survives a dropped connection. The doors' semantics are proved
 * in the A2/B1 migrations and route specs; here every assertion pairs a visible
 * fact with DB TRUTH read through the service client (J4).
 *
 * J-laws: the categories are namespaced scratch (`e2e-post-…`) minted per test,
 * the sellers come from `createUser` (each test owns its identity), no reference
 * row is written, and cleanup runs in an `afterEach` that survives a body
 * timeout — the INC-218 law, applied to listings, photo objects and branches.
 *
 * Anchors are structural: `data-testid` plus `data-state` / `data-category`,
 * never English text (J5).
 */

const FIXTURE = join(
  import.meta.dirname ?? new URL(".", import.meta.url).pathname,
  "../scripts/fixtures/photos/gps.jpg",
);

test.describe("POSTING WIZARD", () => {
  const categories: string[] = [];
  const branches: string[] = [];
  const sellers: string[] = [];
  const specs: string[] = [];
  const objects: { userId: string; listingId: string }[] = [];
  /** L4b scratch geography (region → city → sub-city); destroyed child-first. */
  const places: string[] = [];

  test.afterEach(async () => {
    // J3 — an afterEach survives a body timeout; a `finally` in the body does not.
    for (const ref of objects.splice(0)) await purgeListingObjects(ref.userId, ref.listingId);
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    // Links first: a category cannot be deleted while a definition link points at it.
    await destroySpecSet(specs.splice(0));
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
    const branchSlugs = branches.splice(0);
    if (branchSlugs.length > 0) await destroyCategoryBranch(branchSlugs);
    // The scratch chain goes last: a coverage row must be gone before its place.
    for (const slug of places.splice(0)) await destroyLocation(slug);
  });

  /**
   * DEC-068 — the residency fact comes from the EDGE, never from the body, so a
   * browser test must speak as the edge speaks. Locally and in CI there is no
   * Cloudflare in front of the app, so the header is supplied here exactly as
   * `postRoute` supplies it in the route spec; without it the door correctly
   * refuses every save with `residencyUnknown`.
   */
  async function asEdge(page: import("@playwright/test").Page) {
    // Scoped to the posting routes on purpose: a blanket extra header would also
    // ride along to the font CDN and be rejected by its CORS preflight.
    await page.route("**/api/listings/**", async (route) => {
      await route.continue({
        headers: { ...route.request().headers(), "cf-ipcountry": "ET" },
      });
    });
  }

  async function seller(page: import("@playwright/test").Page) {
    const user = await createUser({ confirmed: true });
    sellers.push(user.id);
    await asEdge(page);
    await signInViaSession(page, user.email, user.password);
    return user;
  }

  async function leaf() {
    const row = await seedPostableCategory();
    categories.push(row.slug);
    return row;
  }

  /** Step 1 through the seller's own eyes: search, then choose the leaf. */
  /**
   * Pick a leaf through the search box. `expectSaved` is false only where the
   * save is deliberately made unreachable (PW-8); everywhere else the caller
   * must not read DB truth before the door has answered (J7).
   */
  async function chooseBySearch(
    page: import("@playwright/test").Page,
    slug: string,
    categoryId: string,
    expectSaved = true,
  ) {
    await page.getByTestId("post-category-search").fill(slug);
    const hit = page.locator(`[data-testid="post-category-hit"][data-category="${categoryId}"]`);
    await expect(hit).toBeVisible();
    await hit.click();
    await expect(page.getByTestId("post-category-chosen")).toBeVisible();
    if (expectSaved) {
      await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
    }
  }

  test("PW-1 the shell renders one step of eight, Back and Next both closed", async ({ page }) => {
    await seller(page);
    await gotoReady(page, "/post");

    await expect(page.getByTestId("post-step-1")).toBeVisible();
    // Eight steps, always visible: the seller can see how long this will take.
    await expect(page.getByTestId("post-progress").locator("li")).toHaveCount(8);
    await expect(page.getByTestId("post-back")).toBeDisabled();
    // The step's own rule, mirrored: no category, no Next (the door still decides).
    await expect(page.getByTestId("post-next")).toBeDisabled();
  });

  test("PW-2 search-to-leaf chooses a category and creates the draft at once", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    await gotoReady(page, "/post");

    await chooseBySearch(page, category.slug, category.id);

    // The caption says saved, and DB truth agrees: the draft exists from the
    // moment the category is chosen, which is what makes the work recoverable.
    await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
    await expect
      .poll(async () => (await draftsOf(user.id)).map((row) => row.category_id), {
        message: "PW-2: no draft was created for the chosen category",
      })
      .toEqual([category.id]);
    const [draft] = await draftsOf(user.id);
    expect(draft?.status, "PW-2: a new draft must be a draft").toBe("draft");
    expect(draft?.draft_step, "PW-2: the door records step 1").toBe(1);
    await expect(page.getByTestId("post-next")).toBeEnabled();
  });

  test("PW-3 a folder is browsable and never selectable; its leaf is (D11)", async ({ page }) => {
    const { parent, leaf: child } = await seedCategoryBranch();
    branches.push(parent.slug, child.slug);
    await seller(page);
    await gotoReady(page, "/post");

    // The folder is present as a FOLDER, not as a choice.
    const folder = page.locator(`[data-testid="post-browse-folder"][data-category="${parent.id}"]`);
    await expect(folder, "PW-3: the scratch folder is missing from the browse level").toBeVisible();
    // A folder is never a search answer either: search-to-leaf means leaves only.
    await page.getByTestId("post-category-search").fill(parent.slug);
    await expect(
      page.locator(`[data-testid="post-category-hit"][data-category="${parent.id}"]`),
    ).toHaveCount(0);
    await page.getByTestId("post-category-search").fill("");

    await folder.click();
    const leafRow = page.locator(`[data-testid="post-browse-leaf"][data-category="${child.id}"]`);
    await expect(leafRow).toBeVisible();
    await leafRow.click();
    await expect(page.getByTestId("post-category-chosen")).toBeVisible();
    await expect(page.getByTestId("post-category-name")).toContainText(child.slug);
  });

  test("PW-4 a photo is prepared on the device, stored stripped, and removable", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    await gotoReady(page, "/post");
    await chooseBySearch(page, category.slug, category.id);

    const [draft] = await draftsOf(user.id);
    const listingId = String(draft?.id ?? "");
    expect(listingId, "PW-4: step 1 created no draft to hang photos on").not.toBe("");
    objects.push({ userId: user.id, listingId });

    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible();

    await page.getByTestId("post-photos-input").setInputFiles(FIXTURE);
    // Exactly one photo was picked, so the locator is strict by construction (J5).
    const tile = page.getByTestId("post-photo-tile");
    // The device encodes, then sends; the tile reaches `stored` on its own.
    await expect(tile, "PW-4: the tile never reached the stored state").toHaveAttribute(
      "data-state",
      "stored",
      { timeout: 45_000 },
    );

    // DB TRUTH: one registered photo, all three variants, and the strip flagged —
    // the wizard's own encode never smuggles metadata past the server (DEC-069).
    await expect
      .poll(async () => (await photoRowsOf(listingId)).length, {
        message: "PW-4: the photo was not registered",
      })
      .toBe(1);
    const rows = await photoRowsOf(listingId);
    const row = rows[0];
    expect(row?.exif_stripped, "PW-4: the stored photo is not marked stripped").toBe(true);
    // Each variant is an object reference (`partition` + `key`), the B1 shape.
    for (const variant of ["cover", "card", "thumb"] as const) {
      const ref = (row?.paths as Record<string, unknown>)[variant] as
        | { partition?: unknown; key?: unknown }
        | undefined;
      expect(typeof ref?.partition, `PW-4: the ${variant} variant has no partition`).toBe("string");
      expect(typeof ref?.key, `PW-4: the ${variant} variant has no stored key`).toBe("string");
    }

    await page.getByTestId("post-photo-remove").click();
    await expect
      .poll(async () => (await photoRowsOf(listingId)).length, {
        message: "PW-4: removing the photo left the row behind",
      })
      .toBe(0);
  });

  test("PW-7 a draft resumes at the next step, and only for its owner", async ({
    page,
    browser,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    await gotoReady(page, "/post");
    await chooseBySearch(page, category.slug, category.id);

    const [draft] = await draftsOf(user.id);
    const listingId = String(draft?.id ?? "");
    expect(listingId).not.toBe("");

    // A fresh visit to the draft's own address opens AFTER the recorded step and
    // still knows the category — nothing was carried in the URL.
    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    await expect(page.getByTestId("post-photos-add")).toBeEnabled();

    // Another account is told whose draft it is, not shown an empty form (F4).
    const other = await browser.newContext();
    const otherPage = await other.newPage();
    try {
      const stranger = await createUser({ confirmed: true });
      sellers.push(stranger.id);
      await asEdge(otherPage);
      await signInViaSession(otherPage, stranger.email, stranger.password);
      await gotoReady(otherPage, `/post/${listingId}`);
      await expect(otherPage.getByTestId("post-load-error")).toBeVisible();
      await expect(otherPage.getByTestId("post-step-1")).toHaveCount(0);
    } finally {
      await other.close();
    }
  });

  test("PW-8 an unreachable save keeps the answers, says so, and retries", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    await gotoReady(page, "/post");

    // The draft route is unreachable — offline, in effect.
    await page.route("**/api/listings/draft", (route) => route.abort());
    await chooseBySearch(page, category.slug, category.id, false);

    await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "unsaved");
    // NOTHING WAS LOST: the chosen category is still on screen, and nothing was
    // written, so the caption is not a lie in either direction.
    await expect(page.getByTestId("post-category-name")).toContainText(category.slug);
    expect(await draftsOf(user.id), "PW-8: an aborted save must write nothing").toEqual([]);

    await page.unroute("**/api/listings/draft");
    await page.getByTestId("post-save-retry").click();

    await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
    await expect
      .poll(async () => (await draftsOf(user.id)).map((row) => row.category_id), {
        message: "PW-8: the retry did not save the draft",
      })
      .toEqual([category.id]);
  });

  /**
   * U6-C1b — STEPS 3 AND 4.
   *
   * Reaching step 3 means walking the seller's real path: a category, then a
   * photo, then Next — the same door answers the test relies on later. The
   * definitions are SCRATCH (`seedSpecSet`): a real one could change its options
   * under the test, and J3 forbids writing one.
   */
  async function reachStep3(
    page: import("@playwright/test").Page,
    userId: string,
    category: { id: string; slug: string },
  ) {
    await gotoReady(page, "/post");
    await chooseBySearch(page, category.slug, category.id);
    const [draft] = await draftsOf(userId);
    const listingId = String(draft?.id ?? "");
    expect(listingId, "step 1 created no draft").not.toBe("");
    objects.push({ userId, listingId });

    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    await page.getByTestId("post-photos-input").setInputFiles(FIXTURE);
    await expect(page.getByTestId("post-photo-tile")).toHaveAttribute("data-state", "stored", {
      timeout: 45_000,
    });
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    return listingId;
  }

  test("PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const spec = await seedSpecSet(category.id);
    specs.push(spec.text.attrKey, spec.number.attrKey, spec.bool.attrKey, spec.select.attrKey);
    const listingId = await reachStep3(page, user.id, category);

    // GENERATED, NOT AUTHORED: one control per linked definition, each shape its own.
    for (const attrKey of [
      spec.text.attrKey,
      spec.number.attrKey,
      spec.bool.attrKey,
      spec.select.attrKey,
    ]) {
      await expect(
        page.locator(`[data-testid="post-attr-control"][data-attr="${attrKey}"]`),
        `PW-5: no control was generated for ${attrKey}`,
      ).toBeVisible();
    }
    // DEC-050 bounds travel as a HINT beside the number, never as the verdict.
    await expect(page.getByTestId("post-attr-bounds")).toBeVisible();

    // DEC-053 — THE OPTIONS ARE NOT SHIPPED WITH THE FORM: the picker is idle until
    // it is opened, and its list arrives on that first tap.
    const picker = page.locator(
      `[data-testid="post-attr-control"][data-attr="${spec.select.attrKey}"]`,
    );
    await expect(picker).toHaveAttribute("data-options", "idle");
    await picker.focus();
    await expect(picker).toHaveAttribute("data-options", "ready");
    // Two scratch options plus the "choose" placeholder.
    await expect(picker.locator("option")).toHaveCount(3);

    // THE DOOR IS THE AUTHORITY: Next sends with the required detail empty, and the
    // refusal lands beneath that detail's own control.
    await page.getByTestId("post-next").click();
    await expect(
      page.locator(`[data-testid="post-attr-refusal"][data-attr="${spec.text.attrKey}"]`),
      "PW-5: the empty required detail was not refused under its own control",
    ).toBeVisible();
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    // DB TRUTH: a refused step never advances what the server recorded.
    expect((await draftsOf(user.id))[0]?.draft_step, "PW-5: a refusal advanced the draft").toBe(2);

    // Answered, the same step is accepted, and the door stores the normalised answers.
    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${spec.text.attrKey}"]`)
      .fill("e2e text answer");
    await picker.selectOption(spec.optionValues[0] ?? "");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await expect
      .poll(async () => (await attributesOf(listingId))[spec.text.attrKey], {
        message: "PW-5: the answers never reached the draft",
      })
      .toBe("e2e text answer");
    expect(
      (await attributesOf(listingId))[spec.select.attrKey],
      "PW-5: the chosen option was not recorded",
    ).toBe(spec.optionValues[0]);
  });

  test("PW-6 the AI assist fills the title and description from the entered details, and both stay editable", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const spec = await seedSpecSet(category.id);
    specs.push(spec.text.attrKey, spec.number.attrKey, spec.bool.attrKey, spec.select.attrKey);
    const listingId = await reachStep3(page, user.id, category);

    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${spec.text.attrKey}"]`)
      .fill("e2e assist facts");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();

    // Nothing is written until the seller asks: Next stays closed on empty text.
    await expect(page.getByTestId("post-next")).toBeDisabled();
    await page.getByTestId("post-assist").click();
    await expect(page.getByTestId("post-assist-done")).toBeVisible();

    const title = page.getByTestId("post-title");
    const description = page.getByTestId("post-description");
    await expect(title).not.toHaveValue("");
    await expect(description).not.toHaveValue("");
    // A SUGGESTION, NEVER AN AUTHOR: the seller can overwrite both.
    await title.fill("e2e seller's own title");
    await expect(title).toHaveValue("e2e seller's own title");
    await expect(page.getByTestId("post-next")).toBeEnabled();

    await page.getByTestId("post-next").click();
    await expect
      .poll(async () => (await textOf(listingId)).title, {
        message: "PW-6: the seller's title never reached the draft",
      })
      .toBe("e2e seller's own title");
    const stored = await textOf(listingId);
    expect(stored.description, "PW-6: the description was not saved").not.toBe(null);
    expect(stored.description, "PW-6: the description was saved empty").not.toBe("");
  });
  /**
   * U6-C2a — STEPS 5 AND 6. `reachStep5` walks the seller through 1–4 the way a
   * seller walks them (J7: seeded rows are asserted visible before they are
   * acted on), because a wizard step that is entered any other way proves
   * nothing about the wizard.
   */
  async function reachStep5(
    page: import("@playwright/test").Page,
    userId: string,
    category: { id: string; slug: string },
  ) {
    const listingId = await reachStep3(page, userId, category);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-title").fill("e2e c2a listing title");
    await page.getByTestId("post-description").fill("e2e c2a listing description");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    return listingId;
  }

  test("PW-10 pricing: a locked period is shown fixed, free hides the amount, and a wrong expiry is refused under its field", async ({
    page,
  }) => {
    const user = await seller(page);
    // DEC-067 — a category that charges by the month, locked, with a short window.
    const category = await seedPostableCategory({
      defaultPricePeriod: "month",
      pricePeriodLocked: true,
      expiryDays: 3,
    });
    categories.push(category.slug);
    const listingId = await reachStep5(page, user.id, category);

    // A LOCKED PERIOD IS A FACT, NOT A CHOICE: shown fixed, with no picker at all.
    const fixed = page.getByTestId("post-price-period-fixed");
    await expect(fixed, "PW-10: the locked period was not shown as a fact").toBeVisible();
    await expect(fixed).toHaveAttribute("data-period", "month");
    await expect(page.getByTestId("post-price-period")).toHaveCount(0);

    // `free` HIDES the amount — the door refuses an amount sent with it.
    await page.getByTestId("post-price-mode-free").click();
    await expect(
      page.getByTestId("post-price-amount-block"),
      "PW-10: free still offered an amount",
    ).toHaveCount(0);

    // A priced mode brings it back, and the door stores what was sent.
    await page.getByTestId("post-price-mode-fixed").click();
    await expect(page.getByTestId("post-price-amount-block")).toBeVisible();
    await page.getByTestId("post-price-amount").fill("25000");

    // THE DOOR IS THE AUTHORITY: an expiry beyond the category's own window is
    // refused, and the refusal lands beneath the date field (F4).
    const beyond = new Date(Date.now() + 30 * 86_400_000).toISOString().slice(0, 10);
    await page.getByTestId("post-price-expiry").fill(beyond);
    await page.getByTestId("post-next").click();
    await expect(
      page.getByTestId("post-price-expiry-refusal"),
      "PW-10: the out-of-window expiry was not refused under its own field",
    ).toBeVisible();
    await expect(page.getByTestId("post-step-5")).toBeVisible();

    // Cleared, the same step is accepted and the price reaches the draft.
    await page.getByTestId("post-price-expiry").fill("");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();
    await expect
      .poll(async () => (await pricingOf(listingId)).amount, {
        message: "PW-10: the amount never reached the draft",
      })
      .toBe(25000);
    const stored = await pricingOf(listingId);
    expect(stored.mode, "PW-10: the mode was not stored").toBe("fixed");
    expect(stored.period, "PW-10: the locked period was not stored").toBe("month");
    expect(stored.currency, "PW-10: no currency was stored for a priced listing").not.toBe(null);
  });

  test("PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    /**
     * D19 — the sub-city case needs a city that HAS sub-cities. Ethiopia's real
     * catalogue carries one in production and not in staging, and J3 forbids
     * writing a reference row in either, so the case stands on its own SCRATCH
     * chain under ET's anchor: region → city → sub-city, reaped in the afterEach.
     */
    const chain = await seedScratchChain("ET");
    places.push(chain.region.slug);

    const listingId = await reachStep5(page, user.id, category);
    // Step 5 is not this test's subject: `free` is the one mode that asks for
    // nothing, so the price step is answered honestly and left behind.
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();

    // DEC-068 — the edge said ET (asEdge), so the market picker stands on ET.
    await expect(
      page.getByTestId("post-where-market"),
      "PW-11: the market was not prefilled from the edge",
    ).toHaveValue("ET");

    // J7 — the seeded rows must be on screen before they are acted on.
    const region = page.getByTestId("post-where-region");
    await expect(
      region.locator(`option[value="${chain.region.id}"]`),
      "PW-11: the scratch region never reached the picker",
    ).toHaveCount(1, { timeout: 20_000 });
    await region.selectOption(chain.region.id);
    await page.getByTestId("post-where-city").selectOption(chain.city.id);

    // D19 — the sub-city level, with WHOLE-CITY coverage offered first.
    const subCity = page.getByTestId("post-where-subcity");
    await expect(subCity, "PW-11: the sub-city level never rendered").toBeVisible();
    await expect(
      subCity.locator('option[value=""]'),
      "PW-11: no whole-city option was offered",
    ).toHaveCount(1);
    await expect(subCity.locator(`option[value="${chain.subCity.id}"]`)).toHaveCount(1);

    // "All of <city>" adds ONE place: the city node itself.
    await page.getByTestId("post-where-add").click();
    await expect(page.getByTestId("post-where-chosen")).toHaveAttribute("data-count", "1");
    await expect(
      page.locator(`[data-testid="post-where-chosen-row"][data-id="${chain.city.id}"]`),
      "PW-11: the whole-city choice did not record the city node",
    ).toBeVisible();

    // THE PLAN: one city. A second place is refused before a round trip is spent.
    await subCity.selectOption(chain.subCity.id);
    await page.getByTestId("post-where-add").click();
    await expect(
      page.getByTestId("post-where-plan-full"),
      "PW-11: a second place was accepted past the plan",
    ).toBeVisible();
    await expect(page.getByTestId("post-where-chosen")).toHaveAttribute("data-count", "1");

    // DB TRUTH: one coverage row, and it is the item's own place (J4).
    await page.getByTestId("post-next").click();
    await expect
      .poll(async () => (await coverageOf(listingId)).placeIds.length, {
        message: "PW-11: the coverage never reached the draft",
        timeout: 20_000,
      })
      .toBe(1);
    const stored = await coverageOf(listingId);
    expect(stored.placeIds[0], "PW-11: the stored place is not the chosen city").toBe(
      chain.city.id,
    );
    expect(stored.locationId, "PW-11: the item's own place is not the first coverage row").toBe(
      chain.city.id,
    );
  });

  test("PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes back, and a foreign return is ignored", async ({
    page,
  }) => {
    // NO session: the guard, not a card, decides what happens (D20).
    await page.goto("/post");
    await expect(page, "PW-14: /post did not send a signed-out visitor to sign in").toHaveURL(
      /\/auth\?.*return=%2Fpost/,
    );

    // An OFF-SITE return is not a destination: the standard accepts only a
    // same-origin relative path, so this one is dropped in favour of "/".
    await page.goto("/auth?return=https%3A%2F%2Fevil.example%2Fsteal");
    const user = await seller(page);
    await expect(page).not.toHaveURL(/evil\.example/);

    // And the real thing: signed in, the return path is honoured.
    await gotoReady(page, "/post");
    await expect(page.getByTestId("post-step-1")).toBeVisible();
    expect(user.id, "PW-14: no seller identity was minted").not.toBe("");
  });

  test("PW-15 the posting entry lives in My Listings, not in Account", async ({ page }) => {
    await seller(page);
    await gotoReady(page, "/");

    // U0e — the panel band activates the panel; the drawer then lists ONLY that
    // panel's items (J5: openRailScope resolves the right viewport twin).
    await page.getByTestId("panel-tab-my-listings").click();
    const entry = (await openRailScope(page)).getByTestId("post-entry");
    await expect(entry, "PW-15: My Listings does not carry the posting entry").toBeVisible();

    // It is the WIZARD's entry, not a placeholder.
    await entry.click();
    await expect(page.getByTestId("post-step-1")).toBeVisible();
    await expect(page).toHaveURL(/\/post$/);

    // C2 addendum (operator walk 2026-09-18): /post belongs to My Listings —
    // the panel stays active and its menu stays visible while posting.
    await expect(
      page.getByTestId("panel-tab-my-listings"),
      "PW-15: /post fell back to another panel; My Listings must own the posting pages",
    ).toHaveAttribute("aria-selected", "true");
    await expect(
      (await openRailScope(page)).getByTestId("post-entry"),
      "PW-15: the My Listings menu is not visible while posting",
    ).toBeVisible();

    await page.getByTestId("panel-tab-account").click();
    await expect(
      (await openRailScope(page)).getByTestId("post-entry"),
      "PW-15: the posting entry is still in Account",
    ).toHaveCount(0);
  });
});
