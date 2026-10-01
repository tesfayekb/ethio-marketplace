import { join } from "node:path";
import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { purgeListingObjects } from "./helpers/photos";
import { gotoReady, signInViaSession, switchLanguage } from "./helpers/ui";
import {
  destroyLocation,
  readServedTree,
  seedScratchChain,
  waitForServedTree,
  waitForTreeSlug,
} from "./helpers/locations";
import { adminClient, createUser } from "./helpers/users";
import {
  activeCityOf,
  attributesOf,
  bearerOf,
  pinOf,
  postRoute,
  reasonsOf,
  contactPrefOf,
  coverageOf,
  identityOf,
  rand,
  statusOf,
  destroyCategoryBranch,
  destroyListingsOf,
  destroyPostableCategory,
  draftsOf,
  destroySpecSet,
  seedPostableCategory,
  seedSpecSet,
  textOf,
  mapReady,
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
    await page.getByTestId("post-title").fill("e2e c2a listing title");
    await page.getByTestId("post-description").fill("e2e c2a listing description");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    return listingId;
  }

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
    /**
     * J7 — SEED, THEN WAIT FOR THE SERVED TREE, THEN NAVIGATE. The market tree is
     * a cached public read: a wizard opened before the cache carries the scratch
     * chain shows a picker without it, and the test fails on a stale copy rather
     * than on the behaviour. The wait uses a plain no-store fetch (I6).
     */
    await waitForTreeSlug(page, "ET", chain.city.slug);

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

    // "All of <city>" is the explicit whole-city pick.
    await subCity.selectOption("");

    // U6-C1-R2 — THE ITEM'S PLACE IS ALSO WHERE IT SHOWS: "All of <city>" needs
    // no "Add this place" tap, the city node lands in the list by itself.
    await expect(page.getByTestId("post-where-chosen")).toHaveAttribute("data-count", "1");
    await expect(
      page.locator(`[data-testid="post-where-chosen-row"][data-id="${chain.city.id}"]`),
      "PW-11: the whole-city choice did not record the city node by itself",
    ).toBeVisible();

    // W6 R5 (census item 5) — the second cascade is gone: on the free plan's
    // 1/1/1 no add button shows at all, so a second place cannot be started.
    await expect(page.getByTestId("post-where-add-city")).toHaveCount(0);
    await expect(page.getByTestId("post-where-add-region")).toHaveCount(0);
    await expect(page.getByTestId("post-where-add-country")).toHaveCount(0);
    await expect(page.getByTestId("post-where-chosen")).toHaveAttribute("data-count", "1");
    await expect(page.getByTestId("post-where-plan-count")).toHaveAttribute("data-used", "1");

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
    await expect(page.getByTestId("post-step-6")).toBeVisible();

    await chooseOneCity(page);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-7")).toBeVisible();
    return listingId;
  }

  test("PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const listingId = await reachStep7(page, user.id, category);

    // MESSAGES IS A FACT, NOT A CHOICE (`listing_contact_refusals`).
    const messages = page.getByTestId("post-who-channel-messages");
    await expect(messages, "PW-12: messages was switched off").toBeChecked();
    await expect(messages, "PW-12: messages could be changed").toBeDisabled();

    // A PLAINLY WRONG ALIAS COSTS NO ROUND TRIP: the shape is mirrored.
    const alias = page.getByTestId("post-who-alias");
    await alias.fill("no");
    await expect(
      page.getByTestId("post-who-alias-refusal"),
      "PW-12: a too-short alias was accepted on screen",
    ).toBeVisible();

    // A GOOD ONE IS THE DOOR'S ANSWER, and the door's answer is a claim.
    const wanted = `e2e_${rand()}`.slice(0, 30).toLowerCase();
    await alias.fill(wanted);
    await expect(
      page.getByTestId("post-who-alias-ok"),
      "PW-12: the alias was never confirmed by the door",
    ).toBeVisible({ timeout: 20_000 });
    await expect
      .poll(async () => (await identityOf(user.id)).alias, {
        message: "PW-12: the alias never reached the profile",
        timeout: 20_000,
      })
      .toBe(wanted);

    // U6-C1-R2 — AN IMITATION IS REFUSED BY THE DOOR, NAMING WHAT IT RESEMBLES.
    // Fake mode makes the verdict deterministic: an alias carrying "cocacola"
    // imitates, and no provider is called.
    await alias.fill("e2e_cocacola_shop");
    await expect(
      page.getByTestId("post-who-alias-refusal"),
      "PW-12: an imitating alias was accepted",
    ).toBeVisible({ timeout: 20_000 });
    await expect
      .poll(async () => (await identityOf(user.id)).alias, {
        message: "PW-12: a refused alias must not reach the profile",
        timeout: 20_000,
      })
      .toBe(wanted);
    await alias.fill(wanted);
    await expect(page.getByTestId("post-who-alias-ok")).toBeVisible({ timeout: 20_000 });

    // U6-C1-R3b-1 STEP 5 (D17) — A PERSON IS NAMED. The names are the profile's,
    // not the listing's, and reach it through the same identity door.
    await page.getByTestId("post-who-first").fill("Abebe");
    await page.getByTestId("post-who-last").fill("Bekele");
    await page.getByTestId("post-who-alias").click();
    await expect
      .poll(
        async () => {
          const row = await identityOf(user.id);
          return `${row.firstName ?? ""}|${row.lastName ?? ""}`;
        },
        { message: "PW-12: the seller's names never reached the profile", timeout: 20_000 },
      )
      .toBe("Abebe|Bekele");

    // THE SUGGESTION and the show-switch live on the channel's own row.
    await expect(page.getByTestId("post-who-show-phone")).toBeVisible();

    // A CHANNEL IS TWO ANSWERS: a value AND a switch.
    await page.getByTestId("post-who-value-phone").fill("+251911234567");
    await page.getByTestId("post-who-show-phone").check();
    await page.getByTestId("post-next").click();
    await expect
      .poll(
        async () => {
          const pref = await contactPrefOf(listingId);
          const phone = pref["phone"] as { show?: boolean; value?: string } | undefined;
          return `${phone?.show === true}:${phone?.value ?? ""}`;
        },
        { message: "PW-12: the shown phone never reached the draft", timeout: 20_000 },
      )
      .toBe("true:+251911234567");
    expect(
      (await contactPrefOf(listingId))["messages"],
      "PW-12: messages was not stored true",
    ).toBe(true);
  });

  test("PW-13 review: the preview shows what was answered, and Publish lands in review — never live", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const listingId = await reachStep7(page, user.id, category);

    await page.getByTestId("post-who-alias").fill(`e2e_${rand()}`.slice(0, 30).toLowerCase());
    await expect(page.getByTestId("post-who-alias-ok")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-8")).toBeVisible();

    // U6-C1-R2 — A REAL REVIEW PAGE: one section per step, each with its own Edit.
    await expect(page.locator('[data-testid="post-review-section"]')).toHaveCount(7);
    await page.locator('[data-testid="post-review-edit"][data-step="4"]').click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-title").fill("e2e r2 edited title");
    // Next from an EDIT returns to review, never onward into the wizard.
    await page.getByTestId("post-next").click();
    await expect(
      page.getByTestId("post-step-8"),
      "PW-13: Next after an edit did not come back to review",
    ).toBeVisible();
    await expect
      .poll(async () => (await textOf(listingId)).title, {
        message: "PW-13: the edited title never reached the draft",
        timeout: 20_000,
      })
      .toBe("e2e r2 edited title");

    // U6-C1-R3b-1 STEP 2a — BACK TO REVIEW WITHOUT A JUDGEMENT: the edit step
    // offers its own way home, and it does not go through the door.
    await page.locator('[data-testid="post-review-edit"][data-step="4"]').click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    const back = page.getByTestId("post-back-to-review");
    await expect(back, "PW-13: an edit offered no way back to review").toBeVisible();
    await back.click();
    await expect(
      page.getByTestId("post-step-8"),
      "PW-13: Back to review did not return to review",
    ).toBeVisible();

    // STEP 2c — THE BUYER'S EYE: the sheet renders the DETAIL, above everything.
    await page.getByTestId("post-preview-open").click();
    const sheet = page.getByTestId("post-preview-sheet");
    await expect(sheet, "PW-13: the buyer preview never opened").toBeVisible();
    await expect(sheet.getByTestId("listing-detail-title")).toHaveText("e2e r2 edited title");
    await expect(
      sheet.getByTestId("listing-detail-seller"),
      "PW-13: the buyer preview shows no seller block",
    ).toBeVisible();
    await expect(
      sheet.getByTestId("listing-detail-map"),
      "PW-13: the buyer preview shows no map area",
    ).toBeVisible();
    await page.getByTestId("post-preview-close").click();
    await expect(sheet, "PW-13: the preview sheet would not close").toHaveCount(0);

    // THE PREVIEW IS THE DRAFT: the title and the free price the walk answered.
    await expect(page.getByTestId("post-review-title")).toHaveText("e2e r2 edited title");
    await expect(
      page.getByTestId("post-review-price"),
      "PW-13: the free price is not shown in the preview",
    ).not.toHaveText("");
    // The last step has NO Next — Publish is its only forward action.
    await expect(page.getByTestId("post-next"), "PW-13: step 8 still offers Next").toHaveCount(0);

    await page.getByTestId("post-publish").click();
    await expect(
      page.getByTestId("post-in-review"),
      "PW-13: publishing did not land on the in-review screen",
    ).toBeVisible({ timeout: 20_000 });

    // DB TRUTH (J4): SCREENING. No owner door may ever make a listing live.
    await expect
      .poll(async () => await statusOf(listingId), {
        message: "PW-13: the listing never entered screening",
        timeout: 20_000,
      })
      .toBe("screening");
  });

  /**
   * R-CLEAN STEP 4 — AN EVIDENCED BUDGET, NOT A BLIND RAISE. The full walk was
   * measured on mobile-360 under E2E_WORKERS=4 (the shard-3 shape): the eight
   * steps plus the review, buyer-preview and Amharic reads took 86 s from the
   * first click to the last assertion. The budget is TWICE that measurement, so a
   * slow run finishes and a genuinely stuck wait still fails — inside the test,
   * with the per-step timings printed by `why()` below, never as a bare timeout.
   */
  const PW30_MEASURED_WALK_MS = 86_000;

  test("PW-30 review and buyer preview render option labels, units, multi-values and booleans", async ({
    page,
  }) => {
    test.setTimeout(PW30_MEASURED_WALK_MS * 2);
    /**
     * The walk RECORDS ITSELF: every phase stamps its elapsed time, and every
     * bounded read below reports the whole ladder when it loses, so a red names
     * which step was slow instead of leaving the budget to be guessed at.
     */
    const startedAt = Date.now();
    // R-EVID — the ladder is the DESCRIBE-scoped array, so the `afterEach`
    // attaches it even when the budget itself expires (no expect refuses then).
    const marks = walkMarks;
    const mark = (label: string) => {
      marks.push(`${label} @ ${Date.now() - startedAt} ms`);
    };
    const why = (message: string) =>
      [message, `PW-30 step timings: ${marks.join(" | ") || "(none)"}`].join("\n");

    const user = await seller(page);
    mark("signed in");
    const category = await leaf();
    const spec = await seedSpecSet(category.id);
    specs.push(
      spec.text.attrKey,
      spec.number.attrKey,
      spec.bool.attrKey,
      spec.select.attrKey,
      spec.multi.attrKey,
    );
    mark("category and specifications seeded");
    await reachStep3(page, user.id, category);
    mark("step 3 reached");

    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${spec.text.attrKey}"]`)
      .fill("e2e labelled review");
    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${spec.number.attrKey}"]`)
      .fill("5");
    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${spec.bool.attrKey}"]`)
      .check();
    const select = page.locator(
      `[data-testid="post-attr-control"][data-attr="${spec.select.attrKey}"]`,
    );
    await select.focus();
    await select.selectOption(spec.optionValues[0] ?? "");
    const checks = page.locator(
      `[data-testid="post-attr-checks"][data-attr="${spec.multi.attrKey}"]`,
    );
    if (!(await checks.isVisible())) {
      await page
        .locator(`[data-testid="post-attr-open"][data-attr="${spec.multi.attrKey}"]`)
        .click();
    }
    await expect(checks, why("PW-30: the multi-select options never opened")).toBeVisible({
      timeout: 20_000,
    });
    for (const value of spec.optionValues) {
      await checks.locator(`[data-testid="post-attr-check"][data-value="${value}"]`).check();
    }
    mark("specifications answered");
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-title").fill("e2e labelled title");
    await page.getByTestId("post-description").fill("e2e labelled description");
    await page.getByTestId("post-next").click();
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();
    mark("step 6 open");
    const city = await activeCityOf("ET");
    await waitForServedTree("ET", city.slug);
    await waitForTreeSlug(page, "ET", city.slug);
    mark("tree served");
    const region = page.getByTestId("post-where-region");
    const regions = await region
      .locator("option")
      .evaluateAll((nodes) =>
        nodes.map((node) => (node as HTMLOptionElement).value).filter(Boolean),
      );
    for (const value of regions) {
      await region.selectOption(value);
      const cityPicker = page.getByTestId("post-where-city");
      if ((await cityPicker.locator(`option[value="${city.id}"]`).count()) === 1) {
        await cityPicker.selectOption(city.id);
        break;
      }
    }
    await expect(
      page.getByTestId("post-where-chosen"),
      why("PW-30: no place was chosen"),
    ).toHaveAttribute("data-count", "1", {
      timeout: 20_000,
    });
    mark("place chosen");
    await page.getByTestId("post-next").click();
    await page.getByTestId("post-who-alias").fill(`e2e_${rand()}`.slice(0, 30).toLowerCase());
    await expect(
      page.getByTestId("post-who-alias-ok"),
      why("PW-30: the alias never cleared"),
    ).toBeVisible({
      timeout: 20_000,
    });
    await page.getByTestId("post-next").click();
    await expect(
      page.getByTestId("post-step-8"),
      why("PW-30: the review step never opened"),
    ).toBeVisible({ timeout: 20_000 });
    mark("review open");

    // Every read below is BOUNDED and NAMED: the review's labels come from the
    // options read, which under load resolves after the default expect budget,
    // and a bare 60 s test timeout names no wait at all (shard-3 red).
    const summary = page.getByTestId("post-review-preview");
    await expect(
      summary.locator(`[data-key="${spec.select.attrKey}"]`),
      why("PW-30: the review summary never rendered the select option's label"),
    ).toHaveText(`${spec.optionValues[0]} label`, { timeout: 20_000 });
    await expect(
      summary.locator(`[data-key="${spec.multi.attrKey}"]`),
      why("PW-30: the review summary never joined the multi-select labels"),
    ).toHaveText(spec.optionValues.map((value) => `${value} label`).join(", "), {
      timeout: 20_000,
    });
    await expect(
      summary.locator(`[data-key="${spec.number.attrKey}"]`),
      why("PW-30: the review summary never carried the number's unit"),
    ).toHaveText("5 km", { timeout: 20_000 });
    await expect(
      summary.locator(`[data-key="${spec.bool.attrKey}"]`),
      why("PW-30: the review summary never rendered the boolean as a word"),
    ).toHaveText("Yes", { timeout: 20_000 });
    mark("review labels read");
    await page.getByTestId("post-preview-open").click();
    const buyer = page.getByTestId("post-preview-sheet");
    await expect(buyer, why("PW-30: the buyer preview sheet never opened")).toBeVisible({
      timeout: 20_000,
    });
    await expect(
      buyer.locator(`[data-key="${spec.select.attrKey}"]`),
      why("PW-30: the buyer preview never rendered the select option's label"),
    ).toHaveText(`${spec.optionValues[0]} label`, { timeout: 20_000 });
    await expect(
      buyer.locator(`[data-key="${spec.number.attrKey}"]`),
      why("PW-30: the buyer preview never carried the number's unit"),
    ).toHaveText("5 km", { timeout: 20_000 });
    await page.getByTestId("post-preview-close").click();
    mark("buyer preview read");

    /**
     * R-EVID STEP 1 — WHICH LABEL SOURCE THE AMHARIC BRANCH READS (censused).
     *
     *   `src/features/posting/step-specifications.tsx` (lines 596, 660) renders
     *   `optionLabel(option, entities.lang)`, and `step-review.tsx` (line 181)
     *   goes through `attributeDisplayValue`, which maps every value through the
     *   SAME `optionLabel`. That resolver (`attribute-options.ts`) is the option
     *   RECORD's own overlay: `label_am` when the language is `am`, else
     *   `label_en`. Option records are NOT entities in the translation bundle —
     *   they live inside the definition's `options` array — so the entity bundle
     *   (`entityName`) never sees them; the bundle resolves the DEFINITION's name
     *   only.
     *
     * The option-record branch therefore applies: the scratch definition carries
     * `label_am` on each option (`seedSpecSet`), and this read asserts it. No
     * approval through the service client is needed and no D3 overlay assertion
     * would be meaningful here, because there is no DB tier above the record.
     */
    await switchLanguage(page, "am");
    await expect(
      summary.locator(`[data-key="${spec.select.attrKey}"]`),
      why("PW-30: the Amharic review never rendered the option's Amharic label"),
    ).toHaveText(`${spec.optionValues[0]} ምልክት`, { timeout: 20_000 });
    await expect(
      summary.locator(`[data-key="${spec.bool.attrKey}"]`),
      why("PW-30: the Amharic review never rendered the boolean in Amharic"),
    ).toHaveText("አዎ", { timeout: 20_000 });
    mark("Amharic review read");
    /**
     * R-EVID STEP 1 — THE CAUSE THE LADDER NAMED. Both Amharic reads PASSED
     * (`Amharic review read` is the last stamp in the attachment) and the walk
     * was 17 s of a 172 s budget; the 155 s that followed were spent inside the
     * trailing `switchLanguage(page, "en")` restore. The trace names the exact
     * call: `click internal:testid=[data-testid="language-option-en"] timeout: 0`
     * — an UNBOUNDED click, so on mobile-360 the `en` item never became
     * actionable after the Amharic switch and `.catch(() => undefined)` could
     * never fire, because an unbounded click does not reject.
     *
     * The restore is DELETED rather than bounded: it asserted nothing (hence the
     * swallowed catch) and Playwright gives every test its own context, so the
     * device language cannot leak into the next test. Nothing is hidden — the
     * two Amharic assertions above are untouched, and they are the coverage.
     */
    // The measurement that set the budget above, printed on every run.
    console.log(`PW-30 walk: ${marks.join(" | ")}`);
  });

  /**
   * R-CLEAN STEP 3 (INC-237) — THE MARKET IS NEVER GUESSED FOR THE SELLER. The
   * edge's guess is delayed by three seconds on purpose: for those seconds the
   * prefill chain (saved area → the edge's guess) has resolved NOTHING, so the
   * select must stand EMPTY. The first open market in the list is AE, so a
   * fallback to "the first option" would be caught here; only when the chain
   * resolves does ET appear.
   */
  test("PW-31 the market select waits for the prefill chain and never preselects", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    await page.route("**/api/geo", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 3_000));
      await route.continue({
        headers: { ...route.request().headers(), "cf-ipcountry": "ET" },
      });
    });
    await reachStep5(page, user.id, category);
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();

    const market = page.getByTestId("post-where-market");
    await expect(market, "PW-31: the market control never rendered").toBeVisible({
      timeout: 20_000,
    });
    await expect(
      market,
      "PW-31: a market was preselected before the prefill chain resolved",
    ).toHaveValue("");
    await expect(
      market,
      "PW-31: the chain resolved but the market never became the edge's ET",
    ).toHaveValue("ET", { timeout: 20_000 });
  });

  /**
   * U6-C1-R2 — WHERE IT SHOWS. The item's own place is the default showing place:
   * it lists itself, it can be taken out and put back, and the plan's count is a
   * fact on screen rather than a surprise at the end.
   */
  test("PW-20 where: the default place lists itself, is ticked, and a lone city box offers no Remove", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const city = await activeCityOf("ET");
    /**
     * U6-C1-R3a-2 — THE SAVED AREA IS ESTABLISHED BY THIS TEST (J7): the where
     * step seeds its market from the `ethio_area` cookie, so ET is stated here
     * rather than inherited from whatever the edge or a sibling test left behind.
     */
    await page.context().addCookies([
      {
        name: "ethio_area",
        value: `ET:${city.id}`,
        url: page.url() === "about:blank" ? "http://127.0.0.1:4173" : new URL(page.url()).origin,
      },
    ]);
    const listingId = await reachStep5(page, user.id, category);
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();

    const region = page.getByTestId("post-where-region");
    await expect(region, "PW-20: the region level never rendered").toBeVisible();
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
    expect(picked, `PW-20: no region carried the city ${city.slug}`).toBe(true);
    const subCity = page.getByTestId("post-where-subcity");
    if ((await subCity.count()) === 1) await subCity.selectOption("");

    // NO TAP: the chosen place is where the listing shows.
    await expect(page.getByTestId("post-where-chosen")).toHaveAttribute("data-count", "1", {
      timeout: 20_000,
    });
    await expect(
      page.locator(`[data-testid="post-where-chosen-row"][data-id="${city.id}"]`),
      "PW-20: the item's own place did not list itself",
    ).toBeVisible();

    // W6b-1 R3 (updated 2026-09-30) — any city box may be removed while another
    // remains; a LONE box (the free plan's 1/1/1) is the ticked item place and
    // offers no Remove, so the step can never be left without a city.
    await expect(
      page.locator(
        '[data-testid="post-where-row"][data-key="primary"] [data-testid="post-where-item-tick"]',
      ),
      "PW-20: the lone city box is not ticked as the item place",
    ).toBeChecked();
    await expect(
      page.locator(
        '[data-testid="post-where-row"][data-key="primary"] [data-testid="post-where-remove"]',
      ),
      "PW-20: a lone city box offered a Remove",
    ).toHaveCount(0);
    await expect(page.getByTestId("post-where-plan-count")).toHaveAttribute("data-used", "1");

    // DB TRUTH (J4): exactly the one place the screen shows.
    await page.getByTestId("post-next").click();
    await expect
      .poll(async () => (await coverageOf(listingId)).placeIds.length, {
        message: "PW-20: the coverage never reached the draft",
        timeout: 20_000,
      })
      .toBe(1);
  });

  /**
   * PW-33 — W6 R2 (updated 2026-09-29, census item 5). It used to prove that a
   * listed REGION offered its cities beneath it; under INC-337 a region is never
   * a place, so the test now proves the region alone lists nothing and its city does.
   */
  test("PW-33 a region alone never lists itself; its city does (W6 R2)", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    const chain = await seedScratchChain("ET");
    places.push(chain.region.slug);
    await waitForTreeSlug(page, "ET", chain.city.slug);

    await reachStep5(page, user.id, category);
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();

    const region = page.getByTestId("post-where-region");
    await expect(
      region.locator(`option[value="${chain.region.id}"]`),
      "PW-33: the scratch region never reached the picker",
    ).toHaveCount(1, { timeout: 20_000 });
    await region.selectOption(chain.region.id);
    // W6 R2 (census item 5, was "the region lists itself"): a region is only
    // the way to a city, so nothing is listed until the city is chosen.
    await expect(page.getByTestId("post-where-chosen")).toHaveAttribute("data-count", "0");
    await expect(
      page.locator(`[data-testid="post-where-chosen-row"][data-id="${chain.region.id}"]`),
      "PW-33: a region listed itself",
    ).toHaveCount(0);
    await page.getByTestId("post-where-city").selectOption(chain.city.id);
    await expect(
      page.locator(`[data-testid="post-where-chosen-row"][data-id="${chain.city.id}"]`),
      "PW-33: the city did not list itself",
    ).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-where-chosen")).toHaveAttribute("data-count", "1");
  });

  /* ================ W6 — A CITY IS REQUIRED (INC-337, R1–R5) ================ */

  /** The item's own place box and its heading's required mark (R1). */
  function placeBox(page: Page) {
    return page.locator('[data-testid="post-where-country-box"][data-primary="1"]');
  }

  /**
   * PW-80 — R1/R2. Neither a market alone nor a region alone is a place: the mark
   * and the soft border stand before Next, Next refuses in words and scrolls to
   * the place (label below the header), and a city clears both. DB truth: every
   * coverage row is a city or a sub-city.
   */
  test("PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const chain = await seedScratchChain("ET");
    places.push(chain.region.slug);
    await waitForTreeSlug(page, "ET", chain.city.slug);
    const listingId = await reachStep5(page, user.id, category);
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();

    const region = page.getByTestId("post-where-region");
    await expect(region.locator(`option[value="${chain.region.id}"]`)).toHaveCount(1, {
      timeout: 20_000,
    });
    // The market alone: no region, no city.
    await region.selectOption("");
    const city = page.getByTestId("post-where-city");
    if ((await city.count()) === 1) await city.selectOption("");
    await expect(placeBox(page), "PW-80: the market alone shows no soft border").toHaveAttribute(
      "data-empty",
      "1",
    );
    await expect(
      page.getByTestId("post-where-heading").getByTestId("post-required-mark"),
      "PW-80: the market alone shows no required mark",
    ).toHaveCount(1);
    // A region alone.
    await region.selectOption(chain.region.id);
    await expect(placeBox(page), "PW-80: a region alone shows no soft border").toHaveAttribute(
      "data-empty",
      "1",
    );
    await expect(
      page.getByTestId("post-where-heading").getByTestId("post-required-mark"),
    ).toHaveCount(1);

    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-refusal-summary")).toBeVisible({ timeout: 20_000 });
    await expect(
      page.locator('[data-testid="post-where-refusal"][data-choose-city="1"]'),
      "PW-80: Next did not say Choose a city",
    ).toBeVisible();
    await expect(page.getByTestId("post-step-6")).toBeVisible();
    // D70/D2 — the whole box, heading included, lands below the header.
    await expect
      .poll(
        async () => {
          // The app shell's own header (the document's first <header>), read in-page.
          const headerBottom = await page.evaluate(
            () => document.querySelector("header")?.getBoundingClientRect().bottom ?? null,
          );
          const box = await page.getByTestId("post-where-place").boundingBox();
          return headerBottom !== null && box !== null && box.y >= headerBottom - 1 && box.y < 740;
        },
        { message: "PW-80: the place was not scrolled below the header", timeout: 5_000 },
      )
      .toBe(true);

    await page.getByTestId("post-where-city").selectOption(chain.city.id);
    await expect(placeBox(page), "PW-80: a city did not clear the soft border").toHaveAttribute(
      "data-empty",
      "0",
    );
    await expect(
      page.getByTestId("post-where-heading").getByTestId("post-required-mark"),
    ).toHaveCount(0);
    await page.getByTestId("post-next").click();
    await expect(
      page.getByTestId("post-step-7"),
      "PW-80: Next did not pass with a city",
    ).toBeVisible({
      timeout: 20_000,
    });

    // DB TRUTH (J4): every coverage row is a city or a sub-city.
    const { placeIds } = await coverageOf(listingId);
    expect(placeIds.length, "PW-80: no coverage row was written").toBeGreaterThan(0);
    const { data } = await adminClient().from("locations").select("level").in("id", placeIds);
    expect(
      (data ?? []).every((row) => row.level === "city" || row.level === "sub_city"),
      `PW-80: a coverage row is not a city: ${JSON.stringify(data)}`,
    ).toBe(true);
  });

  /**
   * PW-81 — R3 as corrected by the 2026-09-29 ruling: the EXISTING prefill (the
   * saved-area cookie) fills a scratch city; it carries no mark and Next passes
   * without touching the step. (The last-listing prefill is W6b.)
   */
  test("PW-81 a prefilled city counts as chosen: no mark, Next passes untouched", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const chain = await seedScratchChain("ET");
    places.push(chain.region.slug);
    await waitForTreeSlug(page, "ET", chain.city.slug);
    await page
      .context()
      .addCookies([
        { name: "ethio_area", value: `ET:${chain.city.id}`, url: "http://127.0.0.1:4173" },
      ]);
    const listingId = await reachStep5(page, user.id, category);
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();
    await expect(
      page.getByTestId("post-where-city"),
      "PW-81: the city was not prefilled",
    ).toHaveValue(chain.city.id, { timeout: 20_000 });
    await expect(placeBox(page)).toHaveAttribute("data-empty", "0");
    await expect(
      page.getByTestId("post-where-heading").getByTestId("post-required-mark"),
    ).toHaveCount(0);
    await page.getByTestId("post-next").click();
    await expect(
      page.getByTestId("post-step-7"),
      "PW-81: Next refused a prefilled city",
    ).toBeVisible({
      timeout: 20_000,
    });
    expect((await coverageOf(listingId)).placeIds).toContain(chain.city.id);
  });

  /**
   * PW-82 — R5. The add buttons follow the plan, read from the DB (the 'free'
   * row is read, never written — G27): each shows only while its level has room.
   */
  test("PW-82 the add buttons follow the plan's own limits", async ({ page }) => {
    const { data: plan, error } = await adminClient()
      .from("coverage_plans")
      .select("max_cities, max_regions, max_countries")
      .eq("plan", "free")
      .single();
    if (error || !plan)
      throw new Error(`PW-82: the free plan could not be read: ${error?.message}`);
    const user = await seller(page);
    const category = await leaf();
    const chain = await seedScratchChain("ET");
    places.push(chain.region.slug);
    await waitForTreeSlug(page, "ET", chain.city.slug);
    await reachStep5(page, user.id, category);
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();
    const region = page.getByTestId("post-where-region");
    await expect(region.locator(`option[value="${chain.region.id}"]`)).toHaveCount(1, {
      timeout: 20_000,
    });
    await region.selectOption(chain.region.id);
    await page.getByTestId("post-where-city").selectOption(chain.city.id);
    await expect(placeBox(page)).toHaveAttribute("data-empty", "0");
    const cityRoom = plan.max_cities > 1;
    const regionRoom = cityRoom && plan.max_regions > 1;
    const countryRoom = regionRoom && plan.max_countries > 1;
    await expect(page.getByTestId("post-where-add-city")).toHaveCount(cityRoom ? 1 : 0);
    await expect(page.getByTestId("post-where-add-region")).toHaveCount(regionRoom ? 1 : 0);
    await expect(page.getByTestId("post-where-add-country")).toHaveCount(countryRoom ? 1 : 0);
    await expect(page.getByTestId("post-where-plan-count")).toHaveAttribute(
      "data-max",
      String(plan.max_cities),
    );
  });

  /* ======================= U6-C1-R3b-4 — THE MAP PIN ======================= */

  /**
   * THE PIN'S OWN DOOR, NOT THE DRAFT'S. Every assertion below pairs what the
   * screen says with the FOUR COLUMNS `set_listing_pin` owns, read through the
   * service client (J4) — because "saved" on screen must mean the row moved.
   *
   * The geocoder is the fake table (`E2E_FAKE_GEOCODE=1`): the suite proves our
   * routes, the dial and the wiring, never OpenStreetMap's uptime.
   */
  async function openPinAt6(
    page: import("@playwright/test").Page,
    userId: string,
    category: { id: string; slug: string },
    withCoverage = false,
  ) {
    const listingId = await reachStep5(page, userId, category);
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();
    // A pin is not coverage: only the tests that walk ON to step 7 need a place,
    // because the door refuses a step 6 with none.
    if (withCoverage) await chooseOneCity(page);
    await page.getByTestId("post-where-pin-open").click();
    // The map is a lazy chunk: the box appears when the chunk has landed.
    await expect(page.getByTestId("post-pin-map"), "the map chunk never mounted").toBeVisible({
      timeout: 20_000,
    });
    return listingId;
  }

  test("PW-37 a tap on the map places a pin and the door stores it as exact", async ({ page }) => {
    const user = await seller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const listingId = await openPinAt6(page, user.id, category);

    const position = page.getByTestId("post-pin-position");
    await expect(position, "PW-37: a pin existed before the seller placed one").toHaveAttribute(
      "data-lat",
      "",
    );
    await mapReady(page);
    await page.getByTestId("post-pin-map").click({ position: { x: 120, y: 90 } });
    await expect(position, "PW-37: the tap placed no pin").not.toHaveAttribute("data-lat", "", {
      timeout: 20_000,
    });

    await page.getByTestId("post-pin-save").click();
    await expect(page.getByTestId("post-pin-saved")).toBeVisible({ timeout: 20_000 });

    // DB TRUTH: the coordinates the screen shows are the coordinates the row holds.
    const shown = {
      lat: await position.getAttribute("data-lat"),
      lng: await position.getAttribute("data-lng"),
    };
    const row = await pinOf(listingId);
    expect(row.precision, "PW-37: the door stored another precision").toBe("exact");
    expect(row.lat, "PW-37: no latitude reached the row").not.toBeNull();
    expect(row.lng, "PW-37: no longitude reached the row").not.toBeNull();
    expect(row.lat!.toFixed(5), "PW-37: the row disagrees with the screen").toBe(shown.lat);
    expect(row.lng!.toFixed(5), "PW-37: the row disagrees with the screen").toBe(shown.lng);
  });

  test("PW-38 a place search moves the pin and fills the street line", async ({ page }) => {
    const user = await seller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const listingId = await openPinAt6(page, user.id, category);

    await page.getByTestId("post-pin-search").fill("Bole");
    // The fake table answers with exactly one place, so the count is the anchor
    // and no positional `.first()` is needed (J5).
    const result = page.getByTestId("post-pin-result");
    await expect(result, "PW-38: the search offered no place").toHaveCount(1, { timeout: 20_000 });
    await result.click();

    const position = page.getByTestId("post-pin-position");
    await expect(position, "PW-38: choosing a result placed no pin").not.toHaveAttribute(
      "data-lat",
      "",
      { timeout: 20_000 },
    );
    // The street line is FILLED, not asserted: the seller may still edit it, and
    // what they type is what the door stores.
    const street = page.getByTestId("post-pin-street");
    await expect(street).not.toHaveValue("");
    await street.fill("e2e pin street");
    await page.getByTestId("post-pin-save").click();
    await expect(page.getByTestId("post-pin-saved")).toBeVisible({ timeout: 20_000 });

    const row = await pinOf(listingId);
    expect(row.street, "PW-38: the seller's own street line did not reach the row").toBe(
      "e2e pin street",
    );
    expect(row.lat, "PW-38: the searched place left no latitude").not.toBeNull();
  });

  test("PW-39 an approximate pin is stored as approx and drawn as an area, never a point", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const listingId = await openPinAt6(page, user.id, category, true);

    await mapReady(page);
    await page.getByTestId("post-pin-map").click({ position: { x: 140, y: 110 } });
    await page.getByTestId("post-pin-precision-approx").click();
    await page.getByTestId("post-pin-save").click();
    await expect(page.getByTestId("post-pin-saved")).toBeVisible({ timeout: 20_000 });
    expect((await pinOf(listingId)).precision, "PW-39: the door stored the exact point").toBe(
      "approx",
    );

    // THE BUYER'S EYE: the still map is the circle, and the exact marker is absent.
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-7")).toBeVisible();
    await page.getByTestId("post-who-alias").fill(`e2e_${rand()}`.slice(0, 30).toLowerCase());
    await expect(page.getByTestId("post-who-alias-ok")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-8")).toBeVisible();
    await page.getByTestId("post-preview-open").click();
    await expect(page.getByTestId("post-preview-sheet")).toBeVisible();
    const drawn = page.getByTestId("listing-map-circle");
    await expect(drawn, "PW-39: the preview drew no area for an approximate pin").toBeVisible({
      timeout: 20_000,
    });
    await expect(drawn).toHaveAttribute("data-precision", "approx");
    await expect(
      page.getByTestId("listing-map-pin"),
      "PW-39: the preview showed the exact point of a hidden pin",
    ).toHaveCount(0);
  });

  test("PW-40 removing the pin clears all four columns", async ({ page }) => {
    const user = await seller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const listingId = await openPinAt6(page, user.id, category);

    await mapReady(page);
    await page.getByTestId("post-pin-map").click({ position: { x: 100, y: 80 } });
    await page.getByTestId("post-pin-street").fill("e2e pin to remove");
    await page.getByTestId("post-pin-save").click();
    await expect(page.getByTestId("post-pin-saved")).toBeVisible({ timeout: 20_000 });
    expect((await pinOf(listingId)).lat, "PW-40: nothing was saved to remove").not.toBeNull();

    await page.getByTestId("post-pin-remove").click();
    await expect(page.getByTestId("post-pin-removed")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-pin-position")).toHaveAttribute("data-lat", "");

    const row = await pinOf(listingId);
    expect(
      [row.lat, row.lng, row.precision, row.street],
      "PW-40: a removed pin left a column behind",
    ).toEqual([null, null, null, null]);
  });

  test("PW-41 the geocode route spends a dial and refuses the call past its ceiling", async ({
    page,
  }) => {
    const user = await seller(page);
    const bearer = await bearerOf(page);
    const ceiling = 60;

    let refusedAt = 0;
    let refusal: { field: string; reason: string } | null = null;
    for (let attempt = 1; attempt <= ceiling + 2; attempt += 1) {
      // A DISTINCT QUERY EVERY TIME, so the cache can never stand in for the dial.
      const response = await page.request.get(
        `/api/geo/search?q=${encodeURIComponent(`bole-${user.id.slice(0, 8)}-${attempt}`)}`,
        { headers: { Authorization: `Bearer ${bearer}` } },
      );
      expect(response.status(), `PW-41: call ${attempt} was not answered`).toBe(200);
      const payload = (await response.json()) as Record<string, unknown>;
      if (payload["ok"] !== true) {
        refusedAt = attempt;
        refusal = reasonsOf(payload)[0] ?? null;
        break;
      }
    }

    expect(refusedAt, `PW-41: the dial never closed within ${ceiling + 2} calls`).toBeGreaterThan(
      ceiling - 1,
    );
    expect(refusal?.field, "PW-41: the refusal named another field").toBe("geocode");
    expect(refusal?.reason, "PW-41: the refusal used another word").toBe("rateLimited");
  });
  /**
   * DEC-085 — KNOWN PRODUCTS ASK ONLY WHAT VARIES. brand → series → model; the
   * model pins a pick-list (allowed: one value), a number (fact + min = max) and a
   * year (min = max), and narrows a variant (storage: 3 allowed, one prefilled).
   * The pinned rows are filled and hidden; the draft (DB truth) and the review
   * hold them; Back and forward change nothing. Scratch catalogue only (G27),
   * reaped by the afterEach (J3).
   */
  test("PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const info = test.info();
    const stem = `e2e_pin_${info.project.name.replace(/\W/g, "")}_${info.workerIndex}_${Date.now()}`;
    const k = (name: string) => `${stem}_${name}`;
    const option = (value: string, extra: Record<string, unknown> = {}) => ({
      value,
      label_en: `${value} label`,
      label_am: `${value} ምልክት`,
      active: true,
      ...extra,
    });
    const supabase = adminClient();
    const insert = async (rows: Record<string, unknown>[]) => {
      const { data, error } = await supabase.from("attributes").insert(rows).select("id, attr_key");
      if (error || !data) throw new Error(`PW-76: seeding failed: ${error?.message ?? "no rows"}`);
      specs.push(...rows.map((row) => String(row["attr_key"])));
      return data;
    };
    const brandRows = await insert([
      {
        attr_key: k("brand"),
        name_en: `${stem} brand`,
        attr_type: "single_select",
        options: [option(k("b1")), option(k("b2"))],
      },
    ]);
    const seriesRows = await insert([
      {
        attr_key: k("series"),
        name_en: `${stem} series`,
        attr_type: "single_select",
        options: [option(k("s1"), { parent: k("b1") }), option(k("s2"), { parent: k("b1") })],
        depends_on: brandRows[0]!.id,
      },
    ]);
    const rest = await insert([
      {
        attr_key: k("model"),
        name_en: `${stem} model`,
        attr_type: "single_select",
        options: [
          option(k("m1"), {
            parent: k("s1"),
            allowed: {
              [k("finish")]: [k("f1")],
              [k("storage")]: [k("g1"), k("g2"), k("g3")],
            },
            facts: { [k("weight")]: 5, [k("storage")]: k("g2") },
            bounds: { [k("weight")]: { min: 5, max: 5 }, [k("year")]: { min: 2020, max: 2020 } },
          }),
          option(k("m2"), { parent: k("s1"), facts: { [k("weight")]: 7 } }),
        ],
        depends_on: seriesRows[0]!.id,
      },
      {
        attr_key: k("finish"),
        name_en: `${stem} finish`,
        attr_type: "single_select",
        options: [option(k("f1")), option(k("f2"))],
      },
      {
        attr_key: k("weight"),
        name_en: `${stem} weight`,
        attr_type: "number",
        min_bound: "1",
        max_bound: "99",
        decimals: 0,
      },
      {
        attr_key: k("year"),
        name_en: `${stem} year`,
        attr_type: "number",
        min_bound: "1900",
        max_bound: "2030",
        decimals: 0,
        format: "year",
      },
      {
        attr_key: k("storage"),
        name_en: `${stem} storage`,
        attr_type: "single_select",
        options: [option(k("g1")), option(k("g2")), option(k("g3")), option(k("g4"))],
      },
      { attr_key: k("note"), name_en: `${stem} note`, attr_type: "text", max_length: 40 },
    ]);
    const all = [...brandRows, ...seriesRows, ...rest];
    const order = ["brand", "series", "model", "finish", "weight", "year", "storage", "note"];
    const { error: linkError } = await supabase.from("category_attribute_links").insert(
      order.map((name, index) => ({
        category_id: category.id,
        attribute_id: all.find((row) => row.attr_key === k(name))!.id,
        display_order: index + 1,
        is_required: name === "brand",
        ...(name === "brand" ? { card_rank: 1 } : {}),
      })),
    );
    if (linkError) throw new Error(`PW-76: linking failed: ${linkError.message}`);

    const listingId = await reachStep3(page, user.id, category);
    const row = (name: string) => page.locator(`[data-testid="post-spec"][data-attr="${k(name)}"]`);
    const control = (name: string) =>
      page.locator(`[data-testid="post-attr-control"][data-attr="${k(name)}"]`);

    await control("brand").selectOption(k("b1"));
    await expect(control("series")).toBeEnabled();
    await control("series").selectOption(k("s1"));
    await expect(control("model")).toBeEnabled();
    await control("model").selectOption(k("m1"));

    const pinned = {
      [k("brand")]: k("b1"),
      [k("series")]: k("s1"),
      [k("model")]: k("m1"),
      [k("finish")]: k("f1"),
      [k("weight")]: 5,
      [k("year")]: 2020,
      [k("storage")]: k("g2"),
    };
    const assertPinned = async (phase: string) => {
      for (const name of ["finish", "weight", "year"]) {
        await expect(row(name), `PW-76 ${phase}: pinned ${name} is still asked`).toHaveCount(0, {
          timeout: 20_000,
        });
      }
      await expect(control("storage"), `PW-76 ${phase}: the variant lost its prefill`).toHaveValue(
        k("g2"),
      );
      await expect(
        control("storage").locator("option:not([value=''])"),
        `PW-76 ${phase}: the variant is not narrowed to three`,
      ).toHaveCount(3);
      await expect(row("note"), `PW-76 ${phase}: the seller's own row is gone`).toBeVisible();
      await expect
        .poll(async () => attributesOf(listingId), {
          message: `PW-76 ${phase}: the draft does not hold the pinned values`,
          timeout: 20_000,
        })
        .toEqual(pinned);
    };
    await assertPinned("chosen");

    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    for (const step of [2, 3]) {
      await page.getByTestId("post-back").click();
      await expect(page.getByTestId(`post-step-${step}`)).toBeVisible();
    }
    await specsSettled(page);
    await assertPinned("after Back");

    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-title").fill("e2e pin listing title");
    await page.getByTestId("post-description").fill("e2e pin listing description");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();
    await chooseOneCity(page);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-7")).toBeVisible();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-8")).toBeVisible();
    const review = page.locator(
      '[data-testid="post-review-section"][data-step="3"] [data-testid="post-review-value"]',
    );
    for (const shown of [`${k("f1")} label`, "2020", "5"]) {
      await expect(review, `PW-76: the review does not show ${shown}`).toContainText(shown);
    }
    expect(await attributesOf(listingId), "PW-76: the review walk moved an answer").toEqual(pinned);
  });

  /**
   * INC-336 — THE DEC-086 MARK ON A BIG LIST. The model list carries 205 options
   * (> EAGER_OPTION_LIMIT, so it is not read up front). After the brand is
   * chosen and BEFORE any Next, the model question wears the required mark and
   * the soft border; a brand with one model does not; the model's `allowed`
   * still fills and hides its sibling on the big list (G29). Scratch only (G27).
   */
  test("PW-78 a big model list shows its required mark once the brand is chosen (INC-336)", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const info = test.info();
    const stem = `e2e_big_${info.project.name.replace(/\W/g, "")}_${info.workerIndex}_${Date.now()}`;
    const k = (name: string) => `${stem}_${name}`;
    const option = (value: string, extra: Record<string, unknown> = {}) => ({
      value,
      label_en: `${value} label`,
      label_am: `${value} ምልክት`,
      active: true,
      ...extra,
    });
    const supabase = adminClient();
    const insert = async (rows: Record<string, unknown>[]) => {
      const { data, error } = await supabase.from("attributes").insert(rows).select("id, attr_key");
      if (error || !data) throw new Error(`PW-78: seeding failed: ${error?.message ?? "no rows"}`);
      specs.push(...rows.map((row) => String(row["attr_key"])));
      return data;
    };
    const brandRows = await insert([
      {
        attr_key: k("brand"),
        name_en: `${stem} brand`,
        attr_type: "single_select",
        options: [option(k("b1")), option(k("b2"))],
      },
    ]);
    const models = [
      option(k("m1"), { parent: k("b1"), allowed: { [k("finish")]: [k("f1")] } }),
      option(k("solo"), { parent: k("b2"), facts: { [k("finish")]: k("f2") } }),
      ...Array.from({ length: 203 }, (_, index) =>
        option(k(`m${index + 2}`), { parent: k("b1"), facts: { [k("finish")]: k("f2") } }),
      ),
    ];
    const rest = await insert([
      {
        attr_key: k("model"),
        name_en: `${stem} model`,
        attr_type: "single_select",
        options: models,
        depends_on: brandRows[0]!.id,
      },
      {
        attr_key: k("finish"),
        name_en: `${stem} finish`,
        attr_type: "single_select",
        options: [option(k("f1")), option(k("f2"))],
      },
    ]);
    const all = [...brandRows, ...rest];
    const { error: linkError } = await supabase.from("category_attribute_links").insert(
      ["brand", "model", "finish"].map((name, index) => ({
        category_id: category.id,
        attribute_id: all.find((row) => row.attr_key === k(name))!.id,
        display_order: index + 1,
        is_required: name === "brand",
        ...(name === "brand" ? { card_rank: 1 } : {}),
      })),
    );
    if (linkError) throw new Error(`PW-78: linking failed: ${linkError.message}`);

    await reachStep3(page, user.id, category);
    const row = (name: string) => page.locator(`[data-testid="post-spec"][data-attr="${k(name)}"]`);
    const control = (name: string) =>
      page.locator(`[data-testid="post-attr-control"][data-attr="${k(name)}"]`);

    await expect(
      row("model").getByTestId("post-required-mark"),
      "PW-78: the model is marked before the brand is answered",
    ).toHaveCount(0);

    await control("brand").selectOption(k("b1"));
    await expect(
      row("model").getByTestId("post-required-mark"),
      "PW-78: the big model list shows no required mark after the brand",
    ).toHaveCount(1, { timeout: 20_000 });
    // INC-355 — required + empty wears the FULL destructive border.
    await expect(control("model"), "PW-78: no full red border on the big model list").toHaveClass(
      /(^|\s)border-destructive(\s|$)/,
    );
    await expect(page.getByTestId("post-refusal-summary")).toHaveCount(0);

    await control("model").selectOption(k("m1"));
    await expect(row("finish"), "PW-78: the big list's allowed did not fill-and-hide").toHaveCount(
      0,
      { timeout: 20_000 },
    );

    await control("brand").selectOption(k("b2"));
    await expect(
      row("model").getByTestId("post-required-mark"),
      "PW-78: a brand with one model still marks the model required",
    ).toHaveCount(0, { timeout: 20_000 });
  });
});
