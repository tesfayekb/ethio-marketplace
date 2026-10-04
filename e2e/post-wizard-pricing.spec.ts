import { join } from "node:path";
import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { purgeListingObjects } from "./helpers/photos";
import { gotoReady, signInViaSession, switchLanguage } from "./helpers/ui";
import {
  destroyLocation,
  readServedTree,
  waitForServedTree,
  waitForTreeSlug,
} from "./helpers/locations";
import { adminClient } from "./helpers/users";
import { seedActiveListing } from "./helpers/categories";
import {
  leaseSeller,
  activeCityOf,
  postRoute,
  pricingOf,
  destroyCategoryBranch,
  destroyListingsOf,
  destroyPostableCategory,
  draftsOf,
  destroySpecSet,
  seedPostableCategory,
  seedSpecSet,
  seedBasisSet,
  priceBpOf,
  type BasisSet,
  stopPageBeforePurge,
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

test.describe("POSTING WIZARD", () => {
  const categories: string[] = [];
  const branches: string[] = [];
  const sellers: string[] = [];
  const specs: string[] = [];
  const objects: { userId: string; listingId: string }[] = [];
  /** L4b scratch geography (region → city → sub-city); destroyed child-first. */
  const places: string[] = [];

  /**
   * R-EVID STEP 1 — TIMINGS THAT SURVIVE A HARD TEST TIMEOUT. A full-walk test's
   * per-step ladder used to live in a local array printed by `why()` (an expect
   * message) and by a trailing `console.log`. Run 35501302989 lost BOTH: the
   * budget itself expired, so no expect ever refused and the trailing log never
   * ran — the report carried a footer snapshot and nothing else.
   *
   * The ladder is therefore written into a DESCRIBE-scoped array and attached
   * from the `afterEach`, which runs after a body timeout (J3, same reason the
   * cleanup lives there). Every full-walk test pushes into `walkMarks`; the
   * attachment is unconditional, so a green run carries its measurement too.
   */
  const walkMarks: string[] = [];

  test.afterEach(async ({ page }) => {
    // INC-323 — stop the page first, and wait out a save in flight, so none lands after the purge.
    await stopPageBeforePurge(page);
    const ladder = walkMarks.splice(0);
    if (ladder.length > 0) {
      await test
        .info()
        .attach("step-timings", { body: ladder.join("\n"), contentType: "text/plain" });
    }
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
    // U6-C1-R3a-2 — `/api/geo` is in the scope too: the residency guess feeds the
    // market and currency prefills, and without the header the guess is null and
    // the screen falls back to the first open market (the PW-11/PW-20 reds).
    await page.route("**/api/listings/**", async (route) => {
      await route.continue({
        headers: { ...route.request().headers(), "cf-ipcountry": "ET" },
      });
    });
    await page.route("**/api/geo", async (route) => {
      await route.continue({
        headers: { ...route.request().headers(), "cf-ipcountry": "ET" },
      });
    });
  }

  async function seller(page: import("@playwright/test").Page) {
    const user = await leaseSeller();
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

  /**
   * U6-C1-R1 — STEP 1 IS ONE CONTROL. The filter narrows the tree in place and
   * choosing a LEAF is the answer: the wizard saves it and advances to step 2 by
   * itself, so there is no confirmation screen to click through. `expectSaved` is
   * false only where the save is deliberately unreachable (PW-8); everywhere
   * else the caller must not read DB truth before the door answered (J7).
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
    if (expectSaved) {
      await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      // AUTO-ADVANCE: the leaf IS the answer; D39 — specifications open next.
      await expect(page.getByTestId("post-step-3")).toBeVisible();
      await expect(page.getByTestId("post-category-chip-path")).toContainText(slug);
    }
  }

  /**
   * U6-C1b — STEPS 3 AND 4.
   *
   * Reaching step 3 means walking the seller's real path: a category, then a
   * photo, then Next — the same door answers the test relies on later. The
   * definitions are SCRATCH (`seedSpecSet`): a real one could change its options
   * under the test, and J3 forbids writing one.
   */
  /**
   * D41 / INC-271 — the specifications form answers (rows or "asks nothing") and,
   * when it has rows, says its option lists have settled. No tap: every row is open.
   */
  async function specsSettled(page: import("@playwright/test").Page) {
    await expect(
      page.getByTestId("post-specs").or(page.getByTestId("post-specs-none")),
      "[e2e:d41] the specifications form never answered",
    ).toBeVisible({ timeout: 20_000 });
    const form = page.getByTestId("post-specs");
    if ((await form.count()) > 0) {
      await expect(form, "[e2e:inc271] the option lists never settled").toHaveAttribute(
        "data-options",
        "1",
        { timeout: 20_000 },
      );
    }
  }

  /** D39 — from specifications, Next opens photos; a second Next opens details. */
  async function nextThroughPhotos(page: import("@playwright/test").Page) {
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-next").click();
  }

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

    // D39 — the category lands on specifications directly; no photos leg.
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    // D41 — every row is open; the walk waits only for the form to settle.
    await specsSettled(page);
    return listingId;
  }
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
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    return listingId;
  }

  test("PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount", async ({
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

    // U6-C1-R1 — A LOCKED PERIOD IS NOT A LINE ON THIS STEP: the buyer reads it
    // on the card, so nothing here asks about it and no picker exists.
    await expect(page.getByTestId("post-price-period")).toHaveCount(0);
    await expect(page.getByTestId("post-price-period-fixed")).toHaveAttribute(
      "data-period",
      "month",
    );
    // The take-down date has left this step for the review step's active window.
    await expect(page.getByTestId("post-price-expiry")).toHaveCount(0);

    // THE ORDER: mode → currency → amount. Read the DOM's own sequence, not a
    // screenshot: the currency field must precede the amount field.
    const order = await page.evaluate(() => {
      const nodes = Array.from(
        document.querySelectorAll('[data-testid="post-pricing"] [data-testid="post-field"]'),
      );
      return nodes.map((node) => node.getAttribute("data-field"));
    });
    expect(
      order.indexOf("post-price-currency-search"),
      "PW-10: the currency is not asked before the amount",
    ).toBeLessThan(order.indexOf("post-price-amount"));

    // ONE CURRENCY CONTROL, preselected — never two boxes for one answer.
    await expect(page.getByTestId("post-price-currency-search")).toHaveCount(1);
    await expect(page.getByTestId("post-price-currency")).not.toHaveAttribute("data-code", "");

    // `free` HIDES the amount — the door refuses an amount sent with it.
    await page.getByTestId("post-price-mode-free").click();
    await expect(
      page.getByTestId("post-price-amount"),
      "PW-10: free still offered an amount",
    ).toHaveCount(0);

    // A priced mode brings it back, and the door stores what was sent.
    await page.getByTestId("post-price-mode-fixed").click();
    await expect(page.getByTestId("post-price-amount")).toBeVisible();
    await page.getByTestId("post-price-amount").fill("25000");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    await page.getByTestId("post-title").fill("e2e c2a listing title");
    await page.getByTestId("post-description").fill("e2e c2a listing description");
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

  /**
   * D31-C (DEC-079) — A PRICING BASIS DECIDES THE PRICE'S SHAPE. Scratch leaf and
   * scratch definitions only (G27), reaped by the afterEach (J3).
   */
  async function basisLeaf() {
    const category = await leaf();
    const basis = await seedBasisSet(category.id);
    specs.push(basis.basisKey, basis.identityKey);
    return { category, basis };
  }

  const specControl = (page: Page, attrKey: string) =>
    page.locator(`[data-testid="post-attr-control"][data-attr="${attrKey}"]`);

  /**
   * Specifications answered (identity), then details, landing on step 5 — where
   * D62-2 asks the basis, first, through the same control (`token` null = unanswered).
   */
  async function reachPricingWithBasis(
    page: Page,
    userId: string,
    category: { id: string; slug: string },
    basis: BasisSet,
    token: string | null,
  ) {
    const listingId = await reachStep3(page, userId, category);
    await specControl(page, basis.identityKey).selectOption(basis.identityValue);
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await expect(page.getByTestId("post-price-basis")).toHaveAttribute("data-options", "1", {
      timeout: 20_000,
    });
    if (token !== null) await specControl(page, basis.basisKey).selectOption(token);
    return listingId;
  }

  /** From step 5 (Next already valid) through place and contact to review. */
  async function pricingToReview(page: Page) {
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    await page.getByTestId("post-title").fill("e2e d31c listing title");
    await page.getByTestId("post-description").fill("e2e d31c listing description");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();
    await chooseOneCity(page);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-7")).toBeVisible();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-8")).toBeVisible();
  }

  const reviewPrice = (page: Page) =>
    page.locator(
      '[data-testid="post-review-section"][data-step="4"] [data-testid="post-review-value"]',
    );

  test("PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages", async ({
    page,
  }) => {
    const user = await seller(page);
    const { category, basis } = await basisLeaf();
    const listingId = await reachPricingWithBasis(page, user.id, category, basis, "commission");

    await expect(page.getByTestId("post-price-commission")).toBeVisible();
    await expect(page.getByTestId("post-price-currency-search")).toHaveCount(0);
    await expect(page.getByTestId("post-price-amount")).toHaveCount(0);
    await expect(page.getByTestId("post-price-period")).toHaveCount(0);
    await page.getByTestId("post-price-commission").fill("12.5");
    await pricingToReview(page);

    await expect
      .poll(() => priceBpOf(listingId), { message: "PW-55: the bp never reached the draft" })
      .toBe(1250);
    const stored = await pricingOf(listingId);
    expect(stored.mode, "PW-55: the mode is not commission").toBe("commission");
    expect(stored.amount, "PW-55: a commission carries an amount").toBe(null);
    expect(stored.currency, "PW-55: a commission carries a currency").toBe(null);

    await expect(reviewPrice(page)).toHaveText("12.5% commission");
    await page.getByTestId("post-preview-open").click();
    await expect(page.getByTestId("listing-detail-price")).toHaveText("12.5% commission");
    await page.getByTestId("post-preview-close").click();

    await switchLanguage(page, "am");
    await expect(reviewPrice(page)).toHaveText("12.5% ኮሚሽን");
  });

  test("PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it", async ({
    page,
  }) => {
    const user = await seller(page);
    const { category, basis } = await basisLeaf();
    await reachPricingWithBasis(page, user.id, category, basis, "hourly");

    const amountLabel = page.locator('label[for="post-price-amount"]');
    await expect(amountLabel).toContainText("Price per Hour");
    await expect(page.getByTestId("post-price-period")).toHaveCount(0);
    await expect(page.getByTestId("post-price-period-fixed")).toHaveAttribute(
      "data-period",
      "hour",
    );

    // D62-2 — the basis lives on this step now: change it here.
    await specControl(page, basis.basisKey).selectOption("per_month");

    await expect(page.getByTestId("post-price-period-fixed")).toHaveAttribute(
      "data-period",
      "month",
    );
    await expect(amountLabel).toContainText("Price per Month");
  });

  /** INC-375 — a Contact forced by a basis is released when the basis stops forcing it. */
  test("PW-109 a quote basis forces contact, and a changed basis releases it (INC-375)", async ({
    page,
  }) => {
    const user = await seller(page);
    const { category, basis } = await basisLeaf();
    await reachPricingWithBasis(page, user.id, category, basis, "quote");
    await expect(page.getByTestId("post-price-amount")).toHaveCount(0);
    await specControl(page, basis.basisKey).selectOption("hourly");
    await expect(
      page.getByTestId("post-price-amount"),
      "PW-109: the forced contact was not released",
    ).toBeVisible();
  });

  /** INC-371 — an Other unit is named by the seller's written unit, never "per other". */
  test("PW-108 an Other basis names the seller's written unit (INC-371)", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    const basis = await seedBasisSet(category.id, { withOther: true });
    specs.push(basis.basisKey, basis.identityKey);
    await reachPricingWithBasis(page, user.id, category, basis, "other");
    await page
      .locator(`[data-testid="post-attr-other"][data-attr="${basis.basisKey}"]`)
      .fill("Tray");
    await expect(page.locator('label[for="post-price-amount"]')).toContainText("Price per Tray");
    await expect(page.getByTestId("post-step-4")).not.toContainText(/per other/i);
  });

  /** B — a card prints what its price runs per (the listing's own period). */
  test("PW-94 a listing card prints its price period", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    const listingId = await seedActiveListing(category.id, user.id);
    const { error } = await adminClient()
      .from("listings")
      .update({
        price_mode: "fixed",
        price_amount: 500,
        price_currency: "ETB",
        price_period: "day",
      })
      .eq("id", listingId);
    if (error) throw new Error(`PW-94: pricing the listing failed: ${error.message}`);
    await gotoReady(page, `/c/${category.slug}`);
    const price = page.locator(
      `[data-testid="listing-card"][data-listing="${listingId}"] [data-testid="listing-card-price"]`,
    );
    await expect(price).toHaveAttribute("data-period", "day");
    await expect(price).toContainText("Per day");
  });

  test("PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal", async ({
    page,
  }) => {
    const user = await seller(page);
    const { category, basis } = await basisLeaf();
    const listingId = await reachPricingWithBasis(page, user.id, category, basis, "per_quintal");

    await expect(page.getByTestId("post-price-period-fixed")).toHaveAttribute(
      "data-period",
      "once",
    );
    await page.getByTestId("post-price-amount").fill("3200");
    await expect(page.getByTestId("post-step-4")).not.toContainText(/per Per/i);
    await pricingToReview(page);
    await expect
      .poll(async () => (await pricingOf(listingId)).amount, {
        message: "PW-57: the amount never reached the draft",
      })
      .toBe(3200);
    expect((await pricingOf(listingId)).period, "PW-57: the period is not once").toBe("once");
    await expect(reviewPrice(page)).toContainText("per Quintal");
    await expect(page.getByTestId("post-step-8")).not.toContainText(/per Per/i);
  });

  test("PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301)", async ({
    page,
  }) => {
    const user = await seller(page);
    const { category, basis } = await basisLeaf();
    await reachPricingWithBasis(page, user.id, category, basis, "commission");
    const box = page.getByTestId("post-price-commission");
    const said = page.locator('[role="alert"][data-field="post-price-commission"]');

    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await expect(said).toHaveText("Enter your commission percentage.");

    for (const typed of ["0", "150"]) {
      await box.fill(typed);
      await expect(said, `PW-58: ${typed} is not refused in words`).toHaveText(
        "Enter a commission between 0.01% and 100%.",
      );
    }

    await box.fill("2.5");
    await expect(said).toHaveCount(0);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();
  });

  /** DEC-081 — the stored flag, DB truth (J4). */
  async function negotiableOf(listingId: string): Promise<boolean | null> {
    const { data, error } = await adminClient()
      .from("listings")
      .select("price_negotiable,draft_step")
      .eq("id", listingId)
      .maybeSingle();
    if (error) throw new Error(`[e2e:d62] reading the flag failed: ${error.message}`);
    return data?.price_negotiable ?? null;
  }

  async function draftStepOf(listingId: string): Promise<number | null> {
    const { data, error } = await adminClient()
      .from("listings")
      .select("draft_step")
      .eq("id", listingId)
      .maybeSingle();
    if (error) throw new Error(`[e2e:d62] reading the step failed: ${error.message}`);
    return data?.draft_step ?? null;
  }

  test("PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2)", async ({
    page,
  }) => {
    const user = await seller(page);
    const { category, basis } = await basisLeaf();
    const listingId = await reachStep3(page, user.id, category);
    await expect(specControl(page, basis.identityKey)).toBeVisible();
    await expect(
      specControl(page, basis.basisKey),
      "PW-63: the basis is still asked on specifications",
    ).toHaveCount(0);
    await specControl(page, basis.identityKey).selectOption(basis.identityValue);
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await expect(
      specControl(page, basis.basisKey),
      "PW-63: no basis on the price step",
    ).toBeVisible({ timeout: 20_000 });

    await page.getByTestId("post-next").click();
    await expect(
      page.locator(`[data-testid="post-attr-refusal"][data-attr="${basis.basisKey}"]`),
      "PW-63: the required basis was not refused under its control",
    ).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    expect(await draftStepOf(listingId), "PW-63: the draft moved past pricing").toBeLessThan(6);

    await specControl(page, basis.basisKey).selectOption("hourly");
    await expect(page.getByTestId("post-price-period-fixed")).toHaveAttribute(
      "data-period",
      "hour",
    );
  });

  test("PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081)", async ({
    page,
  }) => {
    const user = await seller(page);
    const { category, basis } = await basisLeaf();
    const listingId = await reachPricingWithBasis(page, user.id, category, basis, "per_quintal");
    await expect(page.getByTestId("post-price-mode-negotiable")).toHaveCount(0);
    await page.getByTestId("post-price-amount").fill("3200");
    await page.getByTestId("post-price-negotiable").check();
    await pricingToReview(page);
    await expect
      .poll(() => negotiableOf(listingId), { message: "PW-64: the flag never reached the draft" })
      .toBe(true);
    await expect(
      page
        .locator('[data-testid="post-review-section"][data-step="4"]')
        .getByTestId("price-negotiable-badge"),
      "PW-64: review shows no Negotiable badge",
    ).toBeVisible();

    await page.locator('[data-testid="post-review-edit"][data-step="4"]').click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-price-mode-contact").click();
    await expect(
      page.getByTestId("post-price-negotiable"),
      "PW-64: a contact price still offers the toggle",
    ).toHaveCount(0);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-8")).toBeVisible();
    await expect
      .poll(() => negotiableOf(listingId), { message: "PW-64: contact kept the flag" })
      .toBe(false);
  });

  test("PW-65 the currency list opens home first and USD second, with symbols (D62-2)", async ({
    page,
  }) => {
    const user = await seller(page);
    const { data: profile, error } = await adminClient()
      .from("profiles")
      .select("home_country_code")
      .eq("user_id", user.id)
      .maybeSingle();
    if (error) throw new Error(`[e2e:d62] reading the profile failed: ${error.message}`);
    expect(profile?.home_country_code, "PW-65: the seller's home is not ET").toBe("ET");

    const category = await leaf();
    await reachStep3(page, user.id, category);
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-4")).toBeVisible();

    await expect(page.getByTestId("post-price-currency")).toHaveAttribute("data-code", "ETB", {
      timeout: 20_000,
    });
    const search = page.getByTestId("post-price-currency-search");
    await expect(search, "PW-65: the chosen value shows no symbol").toHaveValue(/^ETB · Br — /);
    await search.click();
    const options = page.getByTestId("post-price-currency-option");
    await expect(options.nth(0)).toHaveAttribute("data-code", "ETB");
    await expect(options.nth(1), "PW-65: USD is not second").toHaveAttribute("data-code", "USD");
    await expect(options.nth(0)).toHaveText(/^ETB · Br — /);
    await expect(options.nth(1)).toHaveText(/^USD · \$ — /);
  });

  test("PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309)", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    // The retired mode can no longer be STORED (listings_price_mode_check), so
    // the pre-D62-2 client is reproduced at the wire: every draft save carries
    // priceMode "negotiable", exactly what the old bundle sends.
    // INC-311: a test-level handler on a path asEdge covers must FALL BACK, never
    // continue — continue() skips asEdge and the cf-ipcountry header is lost.
    await page.route("**/api/listings/draft", async (route) => {
      const request = route.request();
      if (request.method() !== "POST") return route.fallback();
      const body = JSON.parse(request.postData() ?? "{}") as Record<string, unknown>;
      await route.fallback({ postData: JSON.stringify({ ...body, priceMode: "negotiable" }) });
    });

    const listingId = await reachStep3(page, user.id, category);
    await expect(page.getByTestId("post-refusal")).toHaveCount(0);
    await expect(page.getByTestId("post-refusal-summary")).toHaveCount(0);

    const { data, error } = await adminClient()
      .from("listings")
      .select("price_mode, price_negotiable")
      .eq("id", listingId)
      .maybeSingle();
    if (error) throw new Error(`[e2e:pw-66] reading the draft failed: ${error.message}`);
    expect(data, "PW-66: the alias was not stored as fixed + flag").toEqual({
      price_mode: "fixed",
      price_negotiable: true,
    });
  });

  test("PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312)", async ({
    page,
  }) => {
    const user = await seller(page);
    const { category, basis } = await basisLeaf();
    const listingId = await reachPricingWithBasis(page, user.id, category, basis, "commission");

    await expect
      .poll(async () => (await pricingOf(listingId)).mode, {
        message: "PW-67: the commission mode never reached the draft",
      })
      .toBe("commission");
    expect(await priceBpOf(listingId), "PW-67: a bp was stored before one was typed").toBe(null);
    await expect(page.getByTestId("post-refusal")).toHaveCount(0);

    await page.getByTestId("post-price-commission").fill("12.5");
    await expect
      .poll(() => priceBpOf(listingId), { message: "PW-67: the bp never reached the draft" })
      .toBe(1250);
  });

  test("PW-68 a Next refused on details does not pin the claim: Back then Next from price reopens details (INC-315)", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    await reachStep3(page, user.id, category);
    await nextThroughPhotos(page);
    // DEC-109 — photos lead to the price; details follow it.
    await expect(page.getByTestId("post-step-4")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-5")).toBeVisible({ timeout: 20_000 });

    await page.getByTestId("post-next").click();
    const summary = page.getByTestId("post-refusal-summary");
    await expect(summary).toBeVisible();
    await expect(summary).toContainText("Title");

    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-5")).toBeVisible({ timeout: 20_000 });
  });

  test("LY-6 at 360 the open currency list is above the sticky action bar", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-360", "mobile-360 only");
    const user = await seller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    await reachStep5(page, user.id, category);

    // INC-280 — the proof is what the FINGER would hit, read in ONE frame: the
    // element at the ETB option's own centre must be that option, inside the
    // viewport, once its box has stopped moving.
    await page.getByTestId("post-price-mode-fixed").click();
    const input = page.getByTestId("post-price-currency-search");
    const list = page.getByTestId("post-price-currency-list");
    const probe = async (label: string) => {
      const etb = list.locator('[data-testid="post-price-currency-option"][data-code="ETB"]');
      await expect(etb, `LY-6 ${label}: the currency list never opened`).toBeVisible();
      return page.evaluate(async () => {
        const sel = '[data-testid="post-price-currency-option"][data-code="ETB"]';
        const frame = () => new Promise<void>((done) => requestAnimationFrame(() => done()));
        const rectOf = () => document.querySelector(sel)?.getBoundingClientRect() ?? null;
        let prev = rectOf();
        for (let i = 0; i < 60; i += 1) {
          await frame();
          await frame();
          const now = rectOf();
          if (
            prev !== null &&
            now !== null &&
            now.top === prev.top &&
            now.left === prev.left &&
            now.height === prev.height
          )
            break;
          prev = now;
        }
        const rect = rectOf();
        const listNode = document.querySelector('[data-testid="post-price-currency-list"]');
        if (rect === null) return { hit: "", inViewport: false, placement: "" };
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const node = document.elementFromPoint(x, y);
        return {
          hit: node?.closest("[data-testid]")?.getAttribute("data-testid") ?? "",
          inViewport: x >= 0 && y >= 0 && x <= window.innerWidth && y <= window.innerHeight,
          placement: listNode?.getAttribute("data-placement") ?? "",
        };
      });
    };

    // Scenario 1 — the list as the seller first meets it.
    await input.focus();
    const first = await probe("open");
    expect(first.inViewport, "LY-6: the ETB option is outside the viewport").toBe(true);
    expect(first.hit, "LY-6: the sticky action bar covers the open currency list").toBe(
      "post-price-currency-option",
    );

    // Scenario 2 — the input at the bottom edge: the list must flip upward.
    await input.press("Escape");
    await input.blur();
    await expect(list).toHaveCount(0);
    await input.evaluate((node) => node.scrollIntoView({ block: "end" }));
    await input.focus();
    await expect(list, "LY-6: at the bottom edge the list did not open upward").toHaveAttribute(
      "data-placement",
      "up",
    );
    const edge = await probe("bottom edge");
    expect(edge.placement).toBe("up");
    expect(edge.inViewport, "LY-6: the flipped ETB option is outside the viewport").toBe(true);
    expect(edge.hit, "LY-6: the flipped currency list is covered").toBe(
      "post-price-currency-option",
    );
  });

  /**
   * U6-C2b — STEPS 7 AND 8. The walk goes through steps 5 and 6 the way a seller
   * does (free price, one real active city), because a step entered any other way
   * proves nothing about the wizard.
   */
  /**
   * ONE REAL CITY, walked the way a seller walks it — extracted so the pin tests
   * can reach step 7 through the SAME cascade `reachStep7` uses, rather than a
   * second copy that could drift from it (B1).
   */
  async function chooseOneCity(page: import("@playwright/test").Page) {
    const city = await activeCityOf("ET");
    /**
     * INC-235 — THE ROUTE FIRST, THE SCREEN SECOND. Under four workers the where
     * step used to open before `/api/locations/ET` had served the city, and the
     * cascade then had nothing to offer. The node-side wait (`cache: "no-store"`)
     * proves the ROUTE is ready without priming the browser's own read, and the
     * browser wait below still proves the APP received it.
     */
    const startedAt = Date.now();
    const served = await waitForServedTree("ET", city.slug);
    await waitForTreeSlug(page, "ET", city.slug);
    const region = page.getByTestId("post-where-region");
    await expect(region, "reachStep7: the region level never rendered").toBeVisible();
    // The city's own region is whichever one carries it: the cascade is walked,
    // not guessed, by selecting each region until the city appears.
    const values = await region
      .locator("option")
      .evaluateAll((nodes) =>
        nodes.map((node) => (node as HTMLOptionElement).value).filter((value) => value !== ""),
      );
    let picked = false;
    for (const value of values) {
      await region.selectOption(value);
      const cityPicker = page.getByTestId("post-where-city");
      if ((await cityPicker.locator(`option[value="${city.id}"]`).count()) === 1) {
        await cityPicker.selectOption(city.id);
        picked = true;
        break;
      }
    }
    if (!picked) {
      // INC-235 — THE REFUSAL SAYS WHAT IT SAW: the market on screen, every region
      // the cascade offered, what the route served then and now, and how long the
      // walk had taken. A bare "no region carried the city" is not evidence.
      const market = await page.getByTestId("post-where-market").inputValue();
      const slugs = await region
        .locator("option")
        .evaluateAll((nodes) => nodes.map((node) => node.textContent ?? ""));
      const now = await readServedTree("ET");
      expect(
        picked,
        [
          `reachStep7: no region carried the city ${city.slug}.`,
          `the market select's value: ${market || "(empty)"}`,
          `regions offered (${values.length}): ${slugs.join(" | ") || "(none)"}`,
          `the tree route when the step opened: status ${served.status}, ${served.slugs.length} slugs`,
          `the tree route now: status ${now.status}, ${now.slugs.length} slugs, markets ${now.codes.join(",") || "(none)"}`,
          `the city ${city.slug} in that read: ${now.slugs.includes(city.slug) ? "yes" : "NO"}`,
          `elapsed since the tree wait: ${Date.now() - startedAt} ms`,
        ].join("\n"),
      ).toBe(true);
    }
    // The chosen place shows itself into the list (U6-C1-R2) — no tap needed.
    await expect(page.getByTestId("post-where-chosen")).toHaveAttribute("data-count", "1", {
      timeout: 20_000,
    });
  }

  async function reachStep7(
    page: import("@playwright/test").Page,
    userId: string,
    category: { id: string; slug: string },
  ) {
    const listingId = await reachStep5(page, userId, category);
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-5")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-refusal-summary")).toHaveCount(0);
    await page.getByTestId("post-title").fill("e2e w1 listing title");
    await page.getByTestId("post-description").fill("e2e w1 listing description");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();

    await chooseOneCity(page);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-7")).toBeVisible();
    return listingId;
  }

  /**
   * U6-C1-R1 — ONE searchable currency control, already carrying an answer.
   *
   * Honest limit: a signed-in seller's SAVED home market outranks the edge guess
   * (D13), and `asEdge` speaks as Ethiopia, so what this asserts is the
   * preselection itself plus the search: the guess branch is proven by
   * `readGuessCurrency`'s own order, not through this door.
   */
  test("PW-17 the currency is preselected and searchable by name in one control", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    await reachStep5(page, user.id, category);

    const search = page.getByTestId("post-price-currency-search");
    await expect(search, "PW-17: the currency is not one control").toHaveCount(1);
    /**
     * U6-C1-R3a-2 — THE CURRENCY LAW: this seller has no earlier listing, so the
     * default falls to the GUESS MARKET, which `asEdge` states as ET → ETB.
     */
    await expect(
      page.getByTestId("post-price-currency"),
      "PW-17: the guess market's currency was not preselected",
    ).toHaveAttribute("data-code", "ETB");

    // THE LIST OPENS SHORT: the open markets' currencies, not 156 rows.
    await search.click();
    const options = page.getByTestId("post-price-currency-option");
    const shortCount = await options.count();
    expect(shortCount, "PW-17: the picker opened on the full ISO list").toBeLessThanOrEqual(15);
    expect(shortCount, "PW-17: the picker opened on nothing").toBeGreaterThan(0);
    const codes = await options.evaluateAll((nodes) =>
      nodes.map((node) => (node as HTMLElement).dataset["code"] ?? ""),
    );
    expect(codes[0], "PW-17: the seller's own market's currency is not first").toBe("ETB");

    // …and the way to every other currency is one row, said in words.
    const more = page.getByTestId("post-price-currency-more");
    await expect(more, "PW-17: the short list offered no way to more currencies").toBeVisible();
    await more.click();
    expect(
      await options.count(),
      "PW-17: More currencies did not reveal a longer list",
    ).toBeGreaterThan(shortCount);

    // Typed by NAME, not by code: "birr" is how a seller says ETB.
    await search.fill("birr");
    const option = page.locator('[data-testid="post-price-currency-option"][data-code="ETB"]');
    await expect(option, "PW-17: searching by name found no currency").toBeVisible();
    await option.click();
    await expect(page.getByTestId("post-price-currency")).toHaveAttribute("data-code", "ETB");
    await expect(page.getByTestId("post-price-currency-list")).toHaveCount(0);
  });
});
