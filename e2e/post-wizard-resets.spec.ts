import { join } from "node:path";
import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { purgeListingObjects } from "./helpers/photos";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { destroyLocation } from "./helpers/locations";
import { adminClient } from "./helpers/users";
import {
  leaseSeller,
  attributesOf,
  postRoute,
  pricingOf,
  rand,
  destroyCategoryBranch,
  destroyListingsOf,
  destroyPostableCategory,
  draftsOf,
  seedFactShiftSet,
  linkSpecToCategory,
  destroySpecSet,
  seedPostableCategory,
  seedSpecSet,
  textOf,
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

  test("PW-26 a category change drops the details the new category never asks, by name", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    // BOTH leaves are seeded BEFORE the page reads the catalogue: the category
    // search answers from the version-cached bundle, so a leaf born after the
    // first read is invisible to it.
    const other = await leaf();
    const spec = await seedSpecSet(category.id);
    specs.push(
      spec.text.attrKey,
      spec.number.attrKey,
      spec.bool.attrKey,
      spec.select.attrKey,
      spec.multi.attrKey,
    );
    // INC-248 — the SECOND leaf asks the SAME picker, so a chosen option could
    // travel across the change on screen while the door had already cleared it.
    await linkSpecToCategory(other.id, spec.select.id);
    const listingId = await reachStep3(page, user.id, category);

    // An ANSWERED draft: the text detail is stored under the first category.
    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${spec.text.attrKey}"]`)
      .fill("e2e answer to be dropped");
    // DEC-053: an option list is read on the first tap, so the picker is focused
    // before it is answered (the law PW-5 states).
    const pw26Picker = page.locator(
      `[data-testid="post-attr-control"][data-attr="${spec.select.attrKey}"]`,
    );
    await pw26Picker.focus();
    await expect(pw26Picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
    await pw26Picker.selectOption(spec.optionValues[0] ?? "");
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    await expect
      .poll(async () => Object.keys(await attributesOf(listingId)).length, {
        message: "PW-26: the answers never reached the draft",
        timeout: 20_000,
      })
      .toBeGreaterThan(0);

    // THE CHANGE: the second leaf, which asks NOTHING, chosen from step 1.
    for (let hop = 0; hop < 3; hop += 1) await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-1")).toBeVisible();
    await chooseBySearch(page, other.slug, other.id, false);

    // U6-C1-R3b-1 STEP 2b — the orphans are named, the photos are flagged, and the
    // specifications step is reopened.
    const notice = page.getByTestId("post-category-changed");
    await expect(notice, "PW-26: a category change said nothing").toBeVisible({ timeout: 20_000 });
    // D59 — the change resets every category-shaped answer and says so in one line.
    await expect(
      page.getByTestId("post-category-dropped"),
      "PW-26: the reset was not said",
    ).toContainText("details, title, description and price were cleared");
    // D39 — the jump lands on SPECIFICATIONS; the photos notice (none here)
    // belongs to the photos step.
    await expect(
      page.getByTestId("post-step-3"),
      "PW-26: the jump missed specifications",
    ).toBeVisible();
    // D41 — every row is open; the walk waits only for the form to settle.
    await specsSettled(page);

    // INC-248 — ON SCREEN AS WELL AS IN STATE: the picker the new category still
    // asks shows "Choose", not the option chosen under the previous category.
    await expect(
      page.locator(`[data-testid="post-attr-control"][data-attr="${spec.select.attrKey}"]`),
      "PW-26: the fold picker kept the previous category's option on screen",
    ).toHaveValue("", { timeout: 20_000 });

    // The notice can be put away once read (R-YEAR STEP 5).
    await page.getByTestId("post-category-changed-dismiss").click();
    await expect(
      page.getByTestId("post-category-changed"),
      "PW-26: the notice could not be dismissed",
    ).toHaveCount(0);

    // DB TRUTH (J4): nothing the new category cannot ask survived.
    await expect
      .poll(async () => Object.keys(await attributesOf(listingId)).length, {
        message: "PW-26: an orphan detail survived the category change",
        timeout: 20_000,
      })
      .toBe(0);
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
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    return listingId;
  }

  const specControl = (page: Page, attrKey: string) =>
    page.locator(`[data-testid="post-attr-control"][data-attr="${attrKey}"]`);

  test("PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317)", async ({
    page,
  }) => {
    const user = await seller(page);
    // Both leaves exist before the catalogue is read (see PW-26).
    const first = await leaf();
    const second = await leaf();
    // The seller-home read is the late writer: GATED, released by the test.
    const homeRead = "**/rest/v1/profiles?select=home_country_code*";
    let release: () => void = () => {};
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route(homeRead, async (route) => {
      await gate;
      await route.fallback();
    });
    await reachStep5(page, user.id, first);

    // Back to step 1 (5 → 4 → 2 → 3 → 1), then leaf B: the D59 reset.
    for (let hop = 0; hop < 4; hop += 1) await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-1")).toBeVisible();
    await chooseBySearch(page, second.slug, second.id, false);
    await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-category-reset-undo")).toBeVisible();

    const sent: { step: number; phase: string }[] = [];
    let phase = "released";
    page.on("request", (request) => {
      if (request.method() !== "POST" || !request.url().includes("/api/listings/draft")) return;
      const body = request.postDataJSON() as { step?: unknown } | null;
      if (typeof body?.step === "number") sent.push({ step: body.step, phase });
    });

    const lateAnswer = page.waitForResponse(homeRead, { timeout: 20_000 });
    release();
    await lateAnswer;
    const landedAt = Date.now();
    // Past the autosave debounce, so a late write's save has already gone out.
    await expect
      .poll(() => Date.now() - landedAt, { timeout: 6_000, intervals: [500] })
      .toBeGreaterThan(3_000);

    // (a) nothing claimed details or price after the reset.
    console.log(`PW-72 bodies: ${JSON.stringify(sent)}`);
    expect(
      Math.max(0, ...sent.map((entry) => entry.step)),
      `PW-72: a late write claimed a step not re-completed: ${JSON.stringify(sent)}`,
    ).toBeLessThanOrEqual(3);

    phase = "next";
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-refusal-summary")).toHaveCount(0);
  });

  test("PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321)", async ({
    page,
  }) => {
    const user = await seller(page);
    // Both leaves exist before the catalogue is read (see PW-26).
    const first = await leaf();
    const second = await leaf();
    // The seller-home read stays GATED for the whole test: any currency the
    // wizard shows can only be the door's answer, mirrored.
    const homeRead = "**/rest/v1/profiles?select=home_country_code*";
    let release: () => void = () => {};
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route(homeRead, async (route) => {
      await gate;
      await route.fallback();
    });
    try {
      const listingId = await reachStep5(page, user.id, first);
      await page.getByTestId("post-price-mode-fixed").click();
      await page.getByTestId("post-price-amount").fill("4100");
      await page.getByTestId("post-next").click();
      await expect(page.getByTestId("post-step-5")).toBeVisible();
      await page.getByTestId("post-title").fill("e2e c2a listing title");
      await page.getByTestId("post-description").fill("e2e c2a listing description");
      await page.getByTestId("post-next").click();
      await expect(page.getByTestId("post-step-6")).toBeVisible();
      await page.getByTestId("post-back").click();
      await expect(page.getByTestId("post-step-5")).toBeVisible();
      await page.getByTestId("post-back").click();
      await expect(page.getByTestId("post-step-4")).toBeVisible();
      const currency = page.getByTestId("post-price-currency");
      await expect(currency, "PW-73: the door's currency was not mirrored").not.toHaveAttribute(
        "data-code",
        "",
      );
      const code = (await currency.getAttribute("data-code")) ?? "";
      expect(code, "PW-73: no mirrored code").toMatch(/^[A-Z]{3}$/);
      await expect
        .poll(async () => await pricingOf(listingId), {
          message: "PW-73: the draft does not hold the amount with that currency",
        })
        .toMatchObject({ amount: 4100, currency: code });

      // Back to step 1 (5 → 4 → 2 → 3 → 1), then leaf B, then Undo.
      for (let hop = 0; hop < 4; hop += 1) await page.getByTestId("post-back").click();
      await expect(page.getByTestId("post-step-1")).toBeVisible();
      await chooseBySearch(page, second.slug, second.id, false);
      await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
      await page.getByTestId("post-category-reset-undo").click();
      await expect(page.getByTestId("post-category-chip-path")).toContainText(first.slug, {
        timeout: 20_000,
      });
      await expect
        .poll(async () => (await pricingOf(listingId)).amount, {
          message: "PW-73: Undo did not restore the amount",
        })
        .toBe(4100);
      expect((await pricingOf(listingId)).currency, "PW-73: Undo moved the currency").toBe(code);
      await nextThroughPhotos(page);
      await expect(page.getByTestId("post-step-5")).toBeVisible();
      await expect(page.getByTestId("post-title"), "PW-73: Undo lost the title").toHaveValue(
        "e2e c2a listing title",
      );
    } finally {
      release();
    }
  });

  /** D59 — leaf A answered through the price, then moved to leaf B from step 1. */
  async function answeredThenMoved(page: Page) {
    const user = await seller(page);
    const first = await leaf();
    // Both leaves exist before the catalogue is read (see PW-26).
    const second = await leaf();
    const spec = await seedSpecSet(first.id);
    specs.push(
      spec.text.attrKey,
      spec.number.attrKey,
      spec.bool.attrKey,
      spec.select.attrKey,
      spec.multi.attrKey,
    );
    const listingId = await reachStep3(page, user.id, first);
    const typed = specControl(page, spec.text.attrKey);
    await typed.fill("e2e d59 typed detail");
    const picker = specControl(page, spec.select.attrKey);
    await picker.focus();
    await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
    await picker.selectOption(spec.optionValues[0] ?? "");
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-price-mode-fixed").click();
    await page.getByTestId("post-price-amount").fill("4100");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    await page.getByTestId("post-title").fill("e2e d59 title");
    await page.getByTestId("post-description").fill("e2e d59 description");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();
    await expect
      .poll(async () => (await pricingOf(listingId)).amount, {
        message: "PW-61: the amount never reached the draft",
      })
      .toBe(4100);

    // Back to step 1 (6 → 5 → 4 → 2 → 3 → 1), then leaf B.
    for (let hop = 0; hop < 5; hop += 1) await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-1")).toBeVisible();
    await chooseBySearch(page, second.slug, second.id, false);
    await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    await expect(
      page.getByTestId("post-category-reset-undo"),
      "PW-61: the reset offered no Undo",
    ).toBeVisible();
    await expect(page.getByTestId("post-category-dropped")).toContainText(
      "details, title, description and price were cleared",
    );
    // DB TRUTH (J4): the reset reached the draft — no detail, title, description or amount.
    await expect
      .poll(async () => Object.keys(await attributesOf(listingId)).length, {
        message: "PW-61: a detail survived the reset",
      })
      .toBe(0);
    return { listingId, first, spec, typedValue: "e2e d59 typed detail" };
  }

  test("PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)", async ({
    page,
  }) => {
    const { listingId, first, spec, typedValue } = await answeredThenMoved(page);

    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    await expect(page.getByTestId("post-title"), "PW-61: the title survived").toHaveValue("");
    await expect(
      page.getByTestId("post-description"),
      "PW-61: the description survived",
    ).toHaveValue("");
    await expect
      .poll(async () => (await pricingOf(listingId)).amount, {
        message: "PW-61: the amount survived the reset",
      })
      .toBe(null);

    // Back to specifications within the ten seconds, then Undo.
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    await page.getByTestId("post-category-reset-undo").click();

    await expect(page.getByTestId("post-category-chip-path")).toContainText(first.slug, {
      timeout: 20_000,
    });
    await specsSettled(page);
    await expect(specControl(page, spec.text.attrKey), "PW-61: Undo lost the detail").toHaveValue(
      typedValue,
    );
    await expect
      .poll(async () => (await textOf(listingId)).title, {
        message: "PW-61: Undo did not restore the title",
      })
      .toBe("e2e d59 title");
    expect((await textOf(listingId)).description, "PW-61: Undo lost the description").toBe(
      "e2e d59 description",
    );
    await expect
      .poll(async () => (await pricingOf(listingId)).amount, {
        message: "PW-61: Undo did not restore the amount",
      })
      .toBe(4100);
    expect((await attributesOf(listingId))[spec.text.attrKey]).toBe(typedValue);
  });

  test("PW-61 after ten seconds the Undo is gone and the reset stands (D59)", async ({ page }) => {
    const { listingId } = await answeredThenMoved(page);
    await expect(
      page.getByTestId("post-category-reset-undo"),
      "PW-61: the Undo outlived ten seconds",
    ).toHaveCount(0, { timeout: 15_000 });
    const text = await textOf(listingId);
    expect(text.title ?? "", "PW-61: the title came back").toBe("");
    expect((await pricingOf(listingId)).amount, "PW-61: the amount came back").toBe(null);
  });

  /**
   * D46 (PW-59) — THE IDENTITY STARTS THE FORM OVER. A card-1 select is a root
   * (D25b): switching it restarts every other detail, the seller's own included,
   * and Undo takes it all back; a card-2 change keeps D25's narrower scope.
   * Scratch category and definitions only (G27), reaped by the afterEach (J3).
   */
  test("PW-59 a card-1 identity change restarts the form, Undo restores it, a card-2 change does not", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const supabase = adminClient();
    const stem = `e2e_idn_${Date.now()}_${rand()}`;
    const option = (value: string) => ({
      value,
      label_en: `${value} label`,
      label_am: `${value} ምልክት`,
    });
    const a = `${stem}_a`;
    const b = `${stem}_b`;
    const { data, error } = await supabase
      .from("attributes")
      .insert([
        {
          attr_key: `${stem}_idn`,
          name_en: `${stem} idn`,
          attr_type: "single_select",
          options: [option(a), option(b)],
        },
        { attr_key: `${stem}_n`, name_en: `${stem} n`, attr_type: "number", decimals: 0 },
        { attr_key: `${stem}_c`, name_en: `${stem} c`, attr_type: "number", decimals: 0 },
        {
          attr_key: `${stem}_k`,
          name_en: `${stem} k`,
          attr_type: "single_select",
          options: [option(`${stem}_k1`), option(`${stem}_k2`)],
        },
      ])
      .select("id, attr_key");
    if (error || !data) throw new Error(`[e2e:PW-59] seeding failed: ${error?.message}`);
    specs.push(...data.map((row) => row.attr_key));
    const id = (suffix: string) => {
      const found = data.find((row) => row.attr_key === `${stem}_${suffix}`);
      if (!found) throw new Error(`[e2e:PW-59] ${suffix} missing`);
      return found;
    };
    const idn = id("idn");
    const n = id("n");
    const c = id("c");
    const k = id("k");
    const { error: linkError } = await supabase.from("category_attribute_links").insert([
      {
        category_id: category.id,
        attribute_id: idn.id,
        is_required: true,
        card_rank: 1,
        display_order: 100,
      },
      { category_id: category.id, attribute_id: n.id, is_required: false, display_order: 101 },
      {
        category_id: category.id,
        attribute_id: c.id,
        is_required: false,
        display_order: 102,
        visible_when: { key: idn.attr_key, in: [a] },
      },
      {
        category_id: category.id,
        attribute_id: k.id,
        is_required: false,
        card_rank: 2,
        display_order: 103,
      },
    ]);
    if (linkError) throw new Error(`[e2e:PW-59] linking failed: ${linkError.message}`);

    const listingId = await reachStep3(page, user.id, category);
    const control = (attrKey: string) =>
      page.locator(`[data-testid="post-attr-control"][data-attr="${attrKey}"]`);
    const stored = () => attributesOf(listingId);

    await control(idn.attr_key).selectOption(a);
    await control(n.attr_key).fill("5");
    await control(n.attr_key).blur();
    await control(c.attr_key).fill("7");
    await control(c.attr_key).blur();
    await expect
      .poll(
        async () => {
          const row = await stored();
          return `${String(row[n.attr_key])}|${String(row[c.attr_key])}`;
        },
        { message: "PW-59: n and c never landed", timeout: 20_000 },
      )
      .toBe("5|7");

    // 1 — A DIFFERENT IDENTITY: every other detail starts over.
    await control(idn.attr_key).selectOption(b);
    await expect(control(n.attr_key), "PW-59: n survived the identity change").toHaveValue("", {
      timeout: 20_000,
    });
    await expect
      .poll(
        async () => {
          const row = await stored();
          return `${n.attr_key in row}|${c.attr_key in row}`;
        },
        { message: "PW-59: the draft kept n or c after the identity change", timeout: 20_000 },
      )
      .toBe("false|false");
    const offer = page.getByTestId("post-specs-reset");
    await expect(offer, "PW-59: the reset offer did not name B").toContainText(`${b} label`, {
      timeout: 20_000,
    });

    // 2 — UNDO TAKES IT ALL BACK.
    await page.getByTestId("post-specs-reset-undo").click();
    await expect(control(idn.attr_key), "PW-59: Undo did not restore A").toHaveValue(a, {
      timeout: 20_000,
    });
    await expect(control(n.attr_key)).toHaveValue("5", { timeout: 20_000 });
    await expect(control(c.attr_key)).toHaveValue("7", { timeout: 20_000 });
    await expect
      .poll(
        async () => {
          const row = await stored();
          return `${String(row[idn.attr_key])}|${String(row[n.attr_key])}|${String(row[c.attr_key])}`;
        },
        { message: "PW-59: Undo did not reach the draft", timeout: 20_000 },
      )
      .toBe(`${a}|5|7`);

    // 3 — THE D25 BOUNDARY: a card-2 change is not a root.
    await control(k.attr_key).selectOption(`${stem}_k2`);
    await expect
      .poll(async () => (await stored())[k.attr_key], { timeout: 20_000 })
      .toBe(`${stem}_k2`);
    await expect(control(n.attr_key), "PW-59: a card-2 change reset n").toHaveValue("5");
    expect((await stored())[n.attr_key], "PW-59: a card-2 change dropped n").toBe(5);
  });

  /**
   * D47 (PW-60, INC-291) — ONLY THE IDENTITY RESTARTS THE FORM. A fold owner that
   * is not card 1 (a size system) gets D25's narrow reset: its fold child empties,
   * the identity and the seller's own number stand. A card-1 change still restarts
   * everything (PW-59). Scratch category and definitions only (G27), reaped by the
   * afterEach (J3).
   */
  test("PW-60 a non-identity fold owner change clears only its fold child; the identity still restarts", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const supabase = adminClient();
    const stem = `e2e_sys_${Date.now()}_${rand()}`;
    const option = (value: string, parent?: string) => ({
      value,
      label_en: `${value} label`,
      label_am: `${value} ምልክት`,
      ...(parent === undefined ? {} : { parent }),
    });
    const a = `${stem}_a`;
    const b = `${stem}_b`;
    const eu = `${stem}_eu`;
    const us = `${stem}_us`;
    const { data, error } = await supabase
      .from("attributes")
      .insert([
        {
          attr_key: `${stem}_idn`,
          name_en: `${stem} idn`,
          attr_type: "single_select",
          options: [option(a), option(b)],
        },
        {
          attr_key: `${stem}_sys`,
          name_en: `${stem} sys`,
          attr_type: "single_select",
          options: [option(eu), option(us)],
        },
        {
          attr_key: `${stem}_sz`,
          name_en: `${stem} sz`,
          attr_type: "single_select",
          options: [
            option(`${stem}_eu40`, eu),
            option(`${stem}_eu42`, eu),
            option(`${stem}_us8`, us),
            option(`${stem}_us9`, us),
          ],
        },
        { attr_key: `${stem}_n`, name_en: `${stem} n`, attr_type: "number", decimals: 0 },
      ])
      .select("id, attr_key");
    if (error || !data) throw new Error(`[e2e:PW-60] seeding failed: ${error?.message}`);
    specs.push(...data.map((row) => row.attr_key));
    const id = (suffix: string) => {
      const found = data.find((row) => row.attr_key === `${stem}_${suffix}`);
      if (!found) throw new Error(`[e2e:PW-60] ${suffix} missing`);
      return found;
    };
    const idn = id("idn");
    const sys = id("sys");
    const sz = id("sz");
    const n = id("n");
    const { error: linkError } = await supabase.from("category_attribute_links").insert([
      {
        category_id: category.id,
        attribute_id: idn.id,
        is_required: true,
        card_rank: 1,
        display_order: 100,
      },
      { category_id: category.id, attribute_id: sys.id, is_required: false, display_order: 101 },
      { category_id: category.id, attribute_id: sz.id, is_required: false, display_order: 102 },
      { category_id: category.id, attribute_id: n.id, is_required: false, display_order: 103 },
    ]);
    if (linkError) throw new Error(`[e2e:PW-60] linking failed: ${linkError.message}`);

    const listingId = await reachStep3(page, user.id, category);
    const control = (attrKey: string) =>
      page.locator(`[data-testid="post-attr-control"][data-attr="${attrKey}"]`);
    const stored = () => attributesOf(listingId);

    await control(idn.attr_key).selectOption(a);
    await control(sys.attr_key).selectOption(eu);
    await control(sz.attr_key).selectOption(`${stem}_eu40`);
    await control(n.attr_key).fill("5");
    await control(n.attr_key).blur();
    await expect
      .poll(
        async () => {
          const row = await stored();
          return [idn, sys, sz, n].map((d) => String(row[d.attr_key])).join("|");
        },
        { message: "PW-60: the first answers never landed", timeout: 20_000 },
      )
      .toBe(`${a}|${eu}|${stem}_eu40|5`);

    // 1 — A FOLD OWNER THAT IS NOT THE IDENTITY: only its fold child empties.
    await control(sys.attr_key).selectOption(us);
    await expect(control(sz.attr_key), "PW-60: sz survived the system change").toHaveValue("", {
      timeout: 20_000,
    });
    await expect(control(n.attr_key), "PW-60: n was wiped by a system change").toHaveValue("5");
    await expect(control(idn.attr_key), "PW-60: idn was wiped by a system change").toHaveValue(a);
    await expect
      .poll(
        async () => {
          const row = await stored();
          return `${sz.attr_key in row}|${String(row[n.attr_key])}|${String(row[idn.attr_key])}|${String(row[sys.attr_key])}`;
        },
        { message: "PW-60: the draft after the system change is wrong", timeout: 20_000 },
      )
      .toBe(`false|5|${a}|${us}`);

    // 2 — THE IDENTITY STILL RESTARTS EVERYTHING (as PW-59 proves).
    await control(idn.attr_key).selectOption(b);
    await expect(control(n.attr_key), "PW-60: n survived the identity change").toHaveValue("", {
      timeout: 20_000,
    });
    await expect(page.getByTestId("post-specs-reset"), "PW-60: no reset offer").toBeVisible({
      timeout: 20_000,
    });
  });

  /**
   * D25 (PW-32) — A MODEL CHANGE RESETS EVERYTHING THE MODEL SPEAKS ABOUT.
   *
   * R3b-3a let a seller's own edit survive a model change; the walk showed why
   * that is wrong for a model-dependent detail — a Golf's doors left standing
   * under a Corolla is a listing that lies. So EVERY detail a model names (a
   * fact it fills, a year it bounds, a condition it decides) is re-derived or
   * emptied on a make/model change, a detail NO model names (the mileage) keeps
   * the seller's answer, and the reset is reversible for ten seconds.
   */
  test("PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const shift = await seedFactShiftSet(category.id);
    specs.push(...shift.attrKeys);
    await reachStep3(page, user.id, category);

    const control = (attrKey: string) =>
      page.locator(`[data-testid="post-attr-control"][data-attr="${attrKey}"]`);
    const body = control(shift.body.attrKey);
    const battery = control(shift.battery.attrKey);
    const doors = control(shift.doors.attrKey);
    const year = control(shift.year.attrKey);
    const mileage = control(shift.mileage.attrKey);

    await control(shift.make.attrKey).selectOption(shift.makeValue);
    await control(shift.model.attrKey).selectOption(shift.golf);
    await expect(body, "PW-32: the first model's body did not prefill").toHaveValue(
      shift.bodyHatch,
      { timeout: 20_000 },
    );
    await expect(doors, "PW-32: the first model's door count did not prefill").toHaveValue(
      String(shift.golfDoors),
      { timeout: 20_000 },
    );

    // The seller's own answers: a year INSIDE this model's floor, and a mileage
    // no option anywhere names.
    await year.selectOption(String(shift.golfYear));
    await mileage.fill("120000");
    await mileage.blur();
    await expect(year, "PW-32: the typed year did not stand").toHaveValue(String(shift.golfYear), {
      timeout: 20_000,
    });

    // 1 — A DIFFERENT MODEL: its own body, its own doors.
    await control(shift.model.attrKey).selectOption(shift.corolla);
    await expect(body, "PW-32: the body did not re-derive from the new model").toHaveValue(
      shift.bodySedan,
      { timeout: 20_000 },
    );
    await expect(doors, "PW-32: the door count did not re-derive").toHaveValue(
      String(shift.corollaDoors),
      { timeout: 20_000 },
    );
    // 2 — A DETAIL THE NEW MODEL SAYS NOTHING ABOUT IS EMPTY, even though the
    // seller chose it: the year belonged to the old model's bound.
    await expect(year, "PW-32: a model-dependent year survived the model change").toHaveValue("", {
      timeout: 20_000,
    });
    // 3 — A DETAIL NO MODEL NAMES IS THE SELLER'S, always.
    await expect(mileage, "PW-32: the seller's own mileage was reset").toHaveValue("120000");

    // 4 — THE RESET IS SAID, AND TAKEN BACK.
    const offer = page.getByTestId("post-specs-reset");
    await expect(offer, "PW-32: the reset was never announced").toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-specs-reset-undo").click();
    await expect(year, "PW-32: Undo did not restore the previous year").toHaveValue(
      String(shift.golfYear),
      { timeout: 20_000 },
    );
    await expect(body, "PW-32: Undo did not restore the previous body").toHaveValue(
      shift.bodyHatch,
      { timeout: 20_000 },
    );
    await expect(mileage, "PW-32: Undo disturbed the seller's own mileage").toHaveValue("120000");

    // A model carrying a battery still fills it, and losing it still empties it.
    await control(shift.model.attrKey).selectOption(shift.byd);
    await expect(battery, "PW-32: the battery fact did not prefill").toHaveValue(
      String(shift.bydBattery),
      { timeout: 20_000 },
    );
    await control(shift.model.attrKey).selectOption(shift.corolla);
    await expect(
      battery,
      "PW-32: a model with no battery fact kept the previous model's battery",
    ).toHaveValue("", { timeout: 20_000 });

    /**
     * D25b — A MAKE CHANGE IS A DIFFERENT CAR. The mileage the seller typed
     * belonged to the Corolla; under another make it is not "kept", it is wrong.
     * So the whole form starts over — the seller's own answers included — and the
     * offer takes it all back.
     */
    await mileage.fill("120000");
    await mileage.blur();
    await expect(mileage, "PW-32: the mileage did not stand before the make change").toHaveValue(
      "120000",
      { timeout: 20_000 },
    );
    await control(shift.make.attrKey).selectOption(shift.otherMake);
    await expect(
      control(shift.model.attrKey),
      "PW-32: a model from the previous make survived the make change",
    ).toHaveValue("", { timeout: 20_000 });
    await expect(body, "PW-32: the body survived the make change").toHaveValue("", {
      timeout: 20_000,
    });
    await expect(
      mileage,
      "PW-32: the seller's own mileage survived a make change (D25b: a different car)",
    ).toHaveValue("", { timeout: 20_000 });

    // AND IT IS REVERSIBLE. The model cannot come back — it hangs under the
    // previous make, and the narrowing clears what the new make cannot hold — but
    // everything the new make does not decide is restored.
    const rootOffer = page.getByTestId("post-specs-reset");
    await expect(rootOffer, "PW-32: the make reset was never announced").toBeVisible({
      timeout: 20_000,
    });
    await page.getByTestId("post-specs-reset-undo").click();
    await expect(mileage, "PW-32: Undo did not restore the seller's mileage").toHaveValue(
      "120000",
      {
        timeout: 20_000,
      },
    );
  });

  /**
   * INC-332 — A TAP ON NEXT IS NEVER LOST. The title is cleared and Next is
   * pressed at once: no blur wait, no wait for the on-blur message. The press is
   * a raw pointer down/up at the button's centre as measured BEFORE the press,
   * so a message that moves the button under the finger loses the click.
   */
  test("PW-79 clearing the title and tapping Next at once still registers the tap (INC-332)", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    await reachStep3(page, user.id, category);
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    await page.getByTestId("post-title").fill("e2e inc332 listing title");
    await page.getByTestId("post-description").fill("e2e inc332 listing description");
    await page.getByTestId("post-title").fill("");
    await expect(page.getByTestId("post-title")).toBeFocused();
    const next = page.getByTestId("post-next");
    await next.scrollIntoViewIfNeeded();
    const box = await next.boundingBox();
    if (box === null) throw new Error("PW-79: Next has no box");
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.up();
    await expect(
      page.getByTestId("post-refusal-summary"),
      "PW-79: the tap on Next was lost — no refusal summary",
    ).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    await expect(
      page.getByTestId("post-title"),
      "PW-79: the title did not take focus",
    ).toBeFocused();
    await expect(
      page.getByTestId("post-title"),
      "PW-79: the page did not scroll to the title",
    ).toBeInViewport();
  });
});
