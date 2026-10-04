import { join } from "node:path";
import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { purgeListingObjects } from "./helpers/photos";
import { gotoReady, signInViaSession, switchLanguage } from "./helpers/ui";
import { destroyLocation } from "./helpers/locations";
import { adminClient } from "./helpers/users";
import {
  leaseSeller,
  seedPhoneSet,
  seedConditionalPair,
  attributesOf,
  postRoute,
  rand,
  destroyCategoryBranch,
  destroyListingsOf,
  destroyPostableCategory,
  draftsOf,
  seedAllowedSet,
  seedCategoryBranch,
  seedConditionalSet,
  seedUnhideFactSet,
  seedColourSet,
  seedSwatchSet,
  seedDeepFoldSet,
  seedFoldSet,
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

  test("PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const spec = await seedSpecSet(category.id);
    specs.push(
      spec.text.attrKey,
      spec.number.attrKey,
      spec.bool.attrKey,
      spec.select.attrKey,
      spec.multi.attrKey,
    );
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
    const multiChecks = page.locator(
      `[data-testid="post-attr-checks"][data-attr="${spec.multi.attrKey}"]`,
    );
    if (!(await multiChecks.isVisible())) {
      await expect(
        page.locator(`[data-testid="post-attr-open"][data-attr="${spec.multi.attrKey}"]`),
        `PW-5: no lazy multi-select control was generated for ${spec.multi.attrKey}`,
      ).toBeVisible();
    }
    // DEC-050 bounds travel as a HINT beside the number, never as the verdict.
    await expect(page.getByTestId("post-attr-bounds")).toBeVisible();

    // DEC-053 — THE OPTIONS ARE NOT SHIPPED WITH THE FORM: the picker is idle until
    // it is opened, and its list arrives on that first tap.
    const picker = page.locator(
      `[data-testid="post-attr-control"][data-attr="${spec.select.attrKey}"]`,
    );
    if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
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
    expect((await draftsOf(user.id))[0]?.draft_step, "PW-5: a refusal advanced the draft").toBe(1);

    // Answered, the same step is accepted, and the door stores the normalised answers.
    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${spec.text.attrKey}"]`)
      .fill("e2e text answer");
    await picker.selectOption(spec.optionValues[0] ?? "");
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-5")).toBeVisible();
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
    specs.push(
      spec.text.attrKey,
      spec.number.attrKey,
      spec.bool.attrKey,
      spec.select.attrKey,
      spec.multi.attrKey,
    );
    const listingId = await reachStep3(page, user.id, category);

    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${spec.text.attrKey}"]`)
      .fill("e2e assist facts");
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-5")).toBeVisible();

    // Nothing is written until the seller asks; Next now sends and the door
    // refuses the empty title, which the summary names (U6-C1-R1).
    await expect(page.getByTestId("post-next")).toBeEnabled();
    await page.getByTestId("post-assist").click();
    await expect(page.getByTestId("post-assist-done")).toBeVisible();

    const title = page.getByTestId("post-title");
    // U6-C1-R2 — A SUGGESTION, NEVER AN AUTHOR: the answer arrives BESIDE the
    // fields; the seller's own boxes are not written until they say so.
    await expect(page.getByTestId("post-assist-history")).toBeVisible();
    await expect(title, "PW-6: the assist wrote into the seller's title itself").toHaveValue("");

    // U6-C1-R2 — EACH TRY IS A DIFFERENT ANGLE, AND THE BUDGET IS VISIBLE: the
    // history keeps every suggestion, a second try differs from the first, and
    // the counter says how many tries are left (DEC-072).
    const firstSuggestion = await page
      .locator(
        '[data-testid="post-assist-suggestion"][data-index="0"] [data-testid="post-assist-suggestion-title"]',
      )
      .innerText();
    await expect(page.getByTestId("post-assist-tries")).toBeVisible();
    const afterOne = await page.getByTestId("post-assist-tries").getAttribute("data-left");
    await page.getByTestId("post-assist").click();
    await expect(page.locator('[data-testid="post-assist-suggestion"]')).toHaveCount(2, {
      timeout: 30_000,
    });
    const secondSuggestion = await page
      .locator(
        '[data-testid="post-assist-suggestion"][data-index="1"] [data-testid="post-assist-suggestion-title"]',
      )
      .innerText();
    expect(secondSuggestion, "PW-6: the second try repeated the first").not.toBe(firstSuggestion);
    const afterTwo = await page.getByTestId("post-assist-tries").getAttribute("data-left");
    expect(Number(afterTwo), "PW-6: the try counter did not decrement").toBeLessThan(
      Number(afterOne),
    );
    // "Use this one" puts a kept suggestion into the seller's own fields.
    await page.locator('[data-testid="post-assist-use"][data-index="0"]').click();
    await expect(title).toHaveValue(firstSuggestion);
    // A SUGGESTION, NEVER AN AUTHOR: the seller can overwrite both.
    await title.fill("e2e seller's own title");
    await expect(title).toHaveValue("e2e seller's own title");

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
   * INC-320 — a BIG list (over the eager limit) stays lazy, but a select that
   * mounts with a stored answer reads its list up front so the answer shows.
   * Scratch definitions only (G27), reaped by the afterEach (J3).
   */
  /**
   * PW-101 (free text) — Part D. A phone number typed into a scratch free-text
   * answer is flagged at its own field before Next (the client mirror), and the
   * door refuses it on Next: DB truth, the number never reaches the draft.
   */
  test("PW-101 a phone number in a free-text answer is refused at its field", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    const spec = await seedSpecSet(category.id);
    specs.push(
      spec.text.attrKey,
      spec.number.attrKey,
      spec.bool.attrKey,
      spec.select.attrKey,
      spec.multi.attrKey,
    );
    const listingId = await reachStep3(page, user.id, category);
    const phone = "+251 911 234 567";
    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${spec.text.attrKey}"]`)
      .fill(phone);
    const refusal = page.locator(
      `[data-testid="post-attr-refusal"][data-attr="${spec.text.attrKey}"]`,
    );
    await expect(refusal, "PW-101: the phone number was not flagged as typed").toBeVisible();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    await expect(refusal, "PW-101: the door's refusal left the field").toBeVisible();
    expect(
      (await attributesOf(listingId))[spec.text.attrKey],
      "PW-101: the phone number reached the draft",
    ).not.toBe(phone);
  });

  /**
   * PW-93 — Part A. A number outside its definition's range turns red at its own
   * field as it is typed, before Next; back inside the range, the refusal goes.
   */
  test("PW-93 a number outside its range is refused as it is typed", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    const spec = await seedSpecSet(category.id);
    specs.push(
      spec.text.attrKey,
      spec.number.attrKey,
      spec.bool.attrKey,
      spec.select.attrKey,
      spec.multi.attrKey,
    );
    await reachStep3(page, user.id, category);
    const control = page.locator(
      `[data-testid="post-attr-control"][data-attr="${spec.number.attrKey}"]`,
    );
    const refusal = page.locator(
      `[data-testid="post-attr-refusal"][data-attr="${spec.number.attrKey}"]`,
    );
    // The scratch number's range is 1–9.
    await control.fill("12");
    await expect(refusal, "PW-93: 12 was not refused as typed").toBeVisible();
    await control.fill("0");
    await expect(refusal, "PW-93: 0 was not refused as typed").toBeVisible();
    await control.fill("5");
    await expect(refusal, "PW-93: 5 is inside the range").toHaveCount(0);
  });

  /** Part O — a scratch single and multi choice, each offering an Other option. */
  async function seedOtherPair(categoryId: string) {
    const info = test.info();
    const stem = `e2e_oth_${info.project.name.replace(/\W/g, "")}_${info.workerIndex}_${Date.now()}`;
    const options = [`${stem}_a`, "other"].map((value) => ({
      value,
      label_en: `${value} label`,
      label_am: `${value} ምልክት`,
      active: true,
    }));
    const supabase = adminClient();
    const keys = { single: `${stem}_one`, multi: `${stem}_many` };
    const { data, error } = await supabase
      .from("attributes")
      .insert([
        { attr_key: keys.single, name_en: `${stem} one`, attr_type: "single_select", options },
        { attr_key: keys.multi, name_en: `${stem} many`, attr_type: "multi_select", options },
      ])
      .select("id, attr_key");
    if (error || !data) throw new Error(`Part O: seeding failed: ${error?.message ?? "no rows"}`);
    specs.push(keys.single, keys.multi);
    const idOf = (key: string) => data.find((row) => row.attr_key === key)!.id;
    const { error: linkError } = await supabase.from("category_attribute_links").insert([
      { category_id: categoryId, attribute_id: idOf(keys.single), display_order: 1 },
      { category_id: categoryId, attribute_id: idOf(keys.multi), display_order: 2 },
    ]);
    if (linkError) throw new Error(`Part O: linking failed: ${linkError.message}`);
    return keys;
  }

  const otherBox = (page: Page, attrKey: string) =>
    page.locator(`[data-testid="post-attr-other"][data-attr="${attrKey}"]`);

  /**
   * PW-120 — bundle 2 step 3. A phone number typed into an Other write-in, single
   * and multi, is flagged at its own field as typed (the client mirror); a plain
   * word clears it.
   */
  test("PW-120 a phone number in an Other write-in is flagged as typed, single and multi", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const keys = await seedOtherPair(category.id);
    await reachStep3(page, user.id, category);
    const refusalOf = (key: string) =>
      page.locator(`[data-testid="post-attr-refusal"][data-attr="${key}"]`);
    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${keys.single}"]`)
      .selectOption("other");
    await otherBox(page, keys.single).fill("+251 911 234 567");
    await expect(refusalOf(keys.single), "PW-120: single Other not flagged").toBeVisible();
    await otherBox(page, keys.single).fill("teff");
    await expect(refusalOf(keys.single), "PW-120: a plain word stayed flagged").toHaveCount(0);

    await page
      .locator(
        `[data-testid="post-attr-checks"][data-attr="${keys.multi}"] [data-testid="post-attr-check"][data-value="other"]`,
      )
      .check();
    await otherBox(page, keys.multi).fill("0911 234 567");
    await expect(refusalOf(keys.multi), "PW-120: multi Other not flagged").toBeVisible();
    await otherBox(page, keys.multi).fill("barley");
    await expect(refusalOf(keys.multi), "PW-120: a plain word stayed flagged").toHaveCount(0);
  });

  /** INC-369 — an empty Other write-in is red and takes focus on Next, single and multi. */
  test("PW-106 an empty Other write-in is refused and focused on Next (INC-369)", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const keys = await seedOtherPair(category.id);
    await reachStep3(page, user.id, category);
    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${keys.single}"]`)
      .selectOption("other");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    await expect(otherBox(page, keys.single), "PW-106: single Other not focused").toBeFocused();
    await expect(otherBox(page, keys.single)).toHaveAttribute("aria-invalid", "true");

    await otherBox(page, keys.single).fill("teff");
    const checks = page.locator(`[data-testid="post-attr-checks"][data-attr="${keys.multi}"]`);
    await checks.locator('[data-testid="post-attr-check"][data-value="other"]').check();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    await expect(otherBox(page, keys.multi), "PW-106: multi Other not focused").toBeFocused();
    await expect(otherBox(page, keys.multi)).toHaveAttribute("aria-invalid", "true");
  });

  /** INC-370 — a multi-choice Other gets a write-in box and its text reaches the draft. */
  test("PW-107 a multi-choice Other carries its write-in to the draft (INC-370)", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const keys = await seedOtherPair(category.id);
    const listingId = await reachStep3(page, user.id, category);
    const checks = page.locator(`[data-testid="post-attr-checks"][data-attr="${keys.multi}"]`);
    await checks
      .locator(`[data-testid="post-attr-check"][data-value="${keys.single.replace("_one", "_a")}"]`)
      .check();
    await expect(otherBox(page, keys.multi)).toHaveCount(0);
    await checks.locator('[data-testid="post-attr-check"][data-value="other"]').check();
    await otherBox(page, keys.multi).fill("barley");
    await expect
      .poll(async () => (await attributesOf(listingId))[keys.multi], {
        message: "PW-107: the write-in never reached the draft",
      })
      .toEqual([keys.single.replace("_one", "_a"), { value: "other", text: "barley" }]);
  });

  test("PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320)", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const info = test.info();
    const stem = `e2e_lazy_${info.project.name.replace(/\W/g, "")}_${info.workerIndex}_${Date.now()}`;
    const makes = [`${stem}_mk1`, `${stem}_mk2`];
    const option = (value: string, parent?: string) => ({
      value,
      label_en: `${value} label`,
      label_am: `${value} ምልክት`,
      active: true,
      ...(parent === undefined ? {} : { parent }),
    });
    // 210 models: past EAGER_OPTION_LIMIT (200), so the list is lazy (DEC-053).
    const models = Array.from({ length: 210 }, (_, index) =>
      option(`${stem}_md${index}`, makes[index % 2]),
    );
    const supabase = adminClient();
    const { data, error } = await supabase
      .from("attributes")
      .insert([
        {
          attr_key: `${stem}_make`,
          name_en: `${stem} make`,
          attr_type: "single_select",
          options: makes.map((value) => option(value)),
        },
        {
          attr_key: `${stem}_model`,
          name_en: `${stem} model`,
          attr_type: "single_select",
          options: models,
        },
      ])
      .select("id, attr_key");
    if (error || !data) throw new Error(`PW-69: seeding failed: ${error?.message ?? "no rows"}`);
    specs.push(`${stem}_make`, `${stem}_model`);
    const idOf = (key: string) => data.find((row) => row.attr_key === key)!.id;
    const { error: linkError } = await supabase.from("category_attribute_links").insert([
      { category_id: category.id, attribute_id: idOf(`${stem}_make`), display_order: 1 },
      { category_id: category.id, attribute_id: idOf(`${stem}_model`), display_order: 2 },
    ]);
    if (linkError) throw new Error(`PW-69: linking failed: ${linkError.message}`);

    await reachStep3(page, user.id, category);
    const make = page.locator(`[data-testid="post-attr-control"][data-attr="${stem}_make"]`);
    const model = page.locator(`[data-testid="post-attr-control"][data-attr="${stem}_model"]`);
    const chosen = `${stem}_md0`;
    await make.selectOption(makes[0]);
    await expect(model).toBeEnabled();
    await model.focus();
    await expect(model).toHaveAttribute("data-options", "ready");
    await model.selectOption(chosen);
    await expect(model).toHaveValue(chosen);

    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-4")).toBeVisible();

    // D39 — Back walks 5 → 4 → 2 → 3.
    for (const step of [4, 2, 3]) {
      await page.getByTestId("post-back").click();
      await expect(page.getByTestId(`post-step-${step}`)).toBeVisible();
    }
    // No tap on the model: the answered list was read up front.
    await expect(model, "PW-69: the list was not read for the stored answer").toHaveAttribute(
      "data-options",
      "ready",
      { timeout: 20_000 },
    );
    await expect(model, "PW-69: the stored model shows the placeholder").toHaveValue(chosen);
    await expect(model.locator("option:checked")).toHaveText(`${chosen} label`);
  });

  /** D70 — the first refused control of this step takes focus after Next. */
  test("PW-70 a strict refusal focuses the first refused field (D70)", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    await reachStep3(page, user.id, category);
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    const title = page.getByTestId("post-title");
    await title.fill("");
    // The on-blur judgement lands first, so the layout is settled before Next.
    await title.blur();
    await expect(
      page.locator('[data-testid="post-field-refusal"][data-field="post-title"]'),
    ).toBeVisible();
    await page.getByTestId("post-next").click();
    // The door's strict refusal is what moves the focus (the summary shows it).
    await expect(page.getByTestId("post-refusal-summary")).toBeVisible({ timeout: 20_000 });
    await expect(title, "PW-70: the refused title did not take focus").toBeFocused();
    await expect(title, "PW-70: the refused title is off screen").toBeInViewport();
  });

  /**
   * W4 D2 — THE REFUSED FIELD ARRIVES WHOLE. After Next, the first refused field
   * is scrolled so its LABEL sits fully below the sticky header (the container's
   * scroll margin), then the control takes focus. Run with and without reduced
   * motion; the check polls until the scroll has settled.
   */
  for (const motion of ["no-preference", "reduce"] as const) {
    test(`PW-77 the first refused field's label lands below the header (D2, ${motion})`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: motion });
      const user = await seller(page);
      const category = await leaf();
      await reachStep3(page, user.id, category);
      await nextThroughPhotos(page);
      await expect(page.getByTestId("post-step-5")).toBeVisible();
      const title = page.getByTestId("post-title");
      // The typing autosave (INC-228) is let finish first, as a seller pausing
      // would: PW-77's subject is where the refused field lands, not the queue.
      const autosaved = page.waitForResponse(
        (response) => response.url().includes("/api/listings/draft"),
        { timeout: 20_000 },
      );
      await page.getByTestId("post-description").fill("e2e d2 description");
      await title.fill("");
      await autosaved;
      // As PW-70: the on-blur judgement lands first, so the layout is settled
      // before Next (a message appearing under the press moves the button).
      await title.blur();
      await expect(
        page.locator('[data-testid="post-field-refusal"][data-field="post-title"]'),
      ).toBeVisible();
      await page.evaluate(() =>
        window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
      );
      await page.getByTestId("post-next").click();
      await expect(page.getByTestId("post-refusal-summary")).toBeVisible({ timeout: 20_000 });
      await expect(title, "PW-77: the refused title did not take focus").toBeFocused();
      await expect
        .poll(
          () =>
            page.evaluate(() => {
              const label = document.querySelector(
                '[data-testid="post-field"][data-field="post-title"] label',
              );
              if (label === null) return "no label";
              let headerBottom = 0;
              for (const node of Array.from(document.querySelectorAll("header"))) {
                const style = getComputedStyle(node);
                if (style.position !== "sticky" && style.position !== "fixed") continue;
                const box = node.getBoundingClientRect();
                if (box.top <= 0 && box.bottom > headerBottom) headerBottom = box.bottom;
              }
              const top = label.getBoundingClientRect().top;
              return top >= headerBottom && top < window.innerHeight
                ? "below"
                : `${top}/${headerBottom}`;
            }),
          { message: "PW-77: the label is under the header or off screen", timeout: 5_000 },
        )
        .toBe("below");
    });
  }

  /**
   * INC-329 — THE ROUND-TRIP LAW. Every answer the seller gave on step 3 is still
   * there after Next to the price and Back, and a tap on the model that changes
   * nothing changes nothing. Scratch leaf and scratch definitions only (G27),
   * reaped by the afterEach (J3). Two variants: the model list small (eager) and
   * past the eager limit (lazy, INC-320).
   */
  for (const variant of [
    { name: "small", models: 3 },
    { name: "big", models: 210 },
  ]) {
    test(`PW-74 a step-3 round trip keeps every answer (INC-329, ${variant.name} model list)`, async ({
      page,
    }) => {
      const user = await seller(page);
      const category = await leaf();
      const info = test.info();
      const stem = `e2e_trip_${info.project.name.replace(/\W/g, "")}_${info.workerIndex}_${Date.now()}`;
      const k = (name: string) => `${stem}_${name}`;
      const option = (value: string, extra: Record<string, unknown> = {}) => ({
        value,
        label_en: `${value} label`,
        label_am: `${value} ምልክት`,
        active: true,
        ...extra,
      });
      const make = k("mk1");
      const models = Array.from({ length: variant.models }, (_, index) =>
        option(`${stem}_md${index}`, {
          parent: index % 2 === 0 ? make : k("mk2"),
          bounds: { [k("year")]: { min: 2000 } },
          facts: { [k("doors")]: 3, [k("seats")]: 5 },
        }),
      );
      const chosenModel = `${stem}_md0`;
      const rows = [
        {
          attr_key: k("identity"),
          name_en: `${stem} identity`,
          attr_type: "single_select",
          options: [option(k("id1")), option(k("id2"))],
        },
        {
          attr_key: k("make"),
          name_en: `${stem} make`,
          attr_type: "single_select",
          options: [option(make), option(k("mk2"))],
        },
        {
          attr_key: k("model"),
          name_en: `${stem} model`,
          attr_type: "single_select",
          options: models,
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
          attr_key: k("doors"),
          name_en: `${stem} doors`,
          attr_type: "number",
          min_bound: "1",
          max_bound: "9",
          decimals: 0,
        },
        // INC-331 — a second prefilled fact the seller never touches and no
        // bound pins (1–9 stays open): it must survive the round trip as-is.
        {
          attr_key: k("seats"),
          name_en: `${stem} seats`,
          attr_type: "number",
          min_bound: "1",
          max_bound: "9",
          decimals: 0,
        },
        {
          attr_key: k("kind"),
          name_en: `${stem} kind`,
          attr_type: "single_select",
          options: [
            option(k("tread"), { facts: { [k("power")]: k("electric") } }),
            option(k("bike")),
          ],
        },
        {
          attr_key: k("power"),
          name_en: `${stem} power`,
          attr_type: "single_select",
          options: [option(k("electric")), option(k("manual"))],
        },
        {
          attr_key: k("colour"),
          name_en: `${stem} colour`,
          attr_type: "single_select",
          options: [
            option(k("red"), { swatch: "#cc0000" }),
            option(k("blue"), { swatch: "#0000cc" }),
          ],
        },
        {
          attr_key: k("multi"),
          name_en: `${stem} multi`,
          attr_type: "multi_select",
          options: [option(k("ma")), option(k("mb"))],
        },
        { attr_key: k("bool"), name_en: `${stem} bool`, attr_type: "boolean" },
        {
          attr_key: k("number"),
          name_en: `${stem} number`,
          attr_type: "number",
          min_bound: "0",
          max_bound: "999999",
          decimals: 0,
        },
        { attr_key: k("text"), name_en: `${stem} text`, attr_type: "text", max_length: 40 },
        {
          attr_key: k("other"),
          name_en: `${stem} other`,
          attr_type: "single_select",
          options: [option(k("oa")), option("other")],
        },
      ];
      const supabase = adminClient();
      const { data, error } = await supabase.from("attributes").insert(rows).select("id, attr_key");
      if (error || !data) throw new Error(`PW-74: seeding failed: ${error?.message ?? "no rows"}`);
      specs.push(...rows.map((row) => row.attr_key));
      const idOf = (key: string) => data.find((row) => row.attr_key === key)!.id;
      const { error: linkError } = await supabase.from("category_attribute_links").insert(
        rows.map((row, index) => ({
          category_id: category.id,
          attribute_id: idOf(row.attr_key),
          display_order: index + 1,
          is_required: row.attr_key === k("identity") || row.attr_key === k("year"),
          ...(row.attr_key === k("identity") ? { card_rank: 1 } : {}),
        })),
      );
      if (linkError) throw new Error(`PW-74: linking failed: ${linkError.message}`);

      const listingId = await reachStep3(page, user.id, category);
      const control = (key: string) =>
        page.locator(`[data-testid="post-attr-control"][data-attr="${k(key)}"]`);
      const model = control("model");

      await control("identity").selectOption(k("id1"));
      // D25 — a parent change resets every detail a parent speaks about, so the
      // small fact picker is answered before the model and the year it bounds.
      await control("kind").selectOption(k("tread"));
      await expect(control("power")).toHaveValue(k("electric"), { timeout: 20_000 });
      await control("make").selectOption(make);
      await expect(model).toBeEnabled();
      await model.focus();
      await expect(model).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
      await model.selectOption(chosenModel);
      await expect(control("doors")).toHaveValue("3", { timeout: 20_000 });
      await control("year").selectOption("2015");
      await control("colour").selectOption(k("red"));
      await page
        .locator(
          `[data-testid="post-attr-checks"][data-attr="${k("multi")}"] [data-value="${k("ma")}"]`,
        )
        .check();
      await control("bool").check();
      await control("number").fill("120");
      await control("number").blur();
      await control("text").fill("e2e trip text");
      await control("other").selectOption("other");
      await page
        .locator(`[data-testid="post-attr-other"][data-attr="${k("other")}"]`)
        .fill("e2e own");

      const filled: Record<string, unknown> = {
        [k("identity")]: k("id1"),
        [k("make")]: make,
        [k("model")]: chosenModel,
        [k("year")]: 2015,
        [k("doors")]: 3,
        [k("seats")]: 5,
        [k("kind")]: k("tread"),
        [k("power")]: k("electric"),
        [k("colour")]: k("red"),
        [k("multi")]: [k("ma")],
        [k("bool")]: true,
        [k("number")]: 120,
        [k("text")]: "e2e trip text",
        [k("other")]: { value: "other", text: "e2e own" },
      };

      const assertKept = async (phase: string) => {
        for (const [key, value] of [
          ["identity", k("id1")],
          ["make", make],
          ["model", chosenModel],
          ["year", "2015"],
          ["doors", "3"],
          ["seats", "5"],
          ["kind", k("tread")],
          ["power", k("electric")],
          ["colour", k("red")],
          ["number", "120"],
          ["text", "e2e trip text"],
          ["other", "other"],
        ] as const) {
          await expect(control(key), `PW-74 ${phase}: ${key} lost its answer`).toHaveValue(value, {
            timeout: 20_000,
          });
        }
        await expect(control("bool"), `PW-74 ${phase}: bool unticked`).toBeChecked();
        await expect(
          page.locator(
            `[data-testid="post-attr-checks"][data-attr="${k("multi")}"] [data-value="${k("ma")}"]`,
          ),
          `PW-74 ${phase}: multi lost its chip`,
        ).toBeChecked();
        await expect(
          page.locator(`[data-testid="post-attr-other"][data-attr="${k("other")}"]`),
          `PW-74 ${phase}: other lost its text`,
        ).toHaveValue("e2e own");
        await expect(
          page.getByTestId("post-category-reset-undo"),
          `PW-74 ${phase}: a reset was offered`,
        ).toHaveCount(0);
        await expect(
          page.getByTestId("post-specs-reset"),
          `PW-74 ${phase}: a reset fired`,
        ).toHaveCount(0);
        await expect
          .poll(async () => attributesOf(listingId), {
            message: `PW-74 ${phase}: the stored answers differ from the filled set`,
            timeout: 20_000,
          })
          .toEqual(filled);
      };

      await assertKept("before");
      await nextThroughPhotos(page);
      await expect(page.getByTestId("post-step-4")).toBeVisible();
      for (const step of [4, 2, 3]) {
        await page.getByTestId("post-back").click();
        await expect(page.getByTestId(`post-step-${step}`)).toBeVisible();
      }
      await expect(model).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
      await assertKept("after Back");
      await model.focus();
      await model.click();
      await page.keyboard.press("Escape");
      await assertKept("after a tap on the model");
    });
  }

  /** D72 — one required mark: step-1 heading and title carry it; an optional detail does not. */
  test("PW-75 the required mark is uniform across steps (D72)", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    const spec = await seedSpecSet(category.id);
    specs.push(
      spec.text.attrKey,
      spec.number.attrKey,
      spec.bool.attrKey,
      spec.select.attrKey,
      spec.multi.attrKey,
    );
    await gotoReady(page, "/post");
    await expect(
      page.getByTestId("post-category-list-heading").getByTestId("post-required-mark"),
      "PW-75: the category list heading carries no mark",
    ).toBeVisible();
    // W4 D1 — the optional search is unmarked.
    await expect(
      page.locator('label[for="post-category-search"]').getByTestId("post-required-mark"),
      "PW-75: the optional search carries the mark",
    ).toHaveCount(0);
    await reachStep3(page, user.id, category);
    // W4 D1 — once a leaf is chosen, Back finds the list heading unmarked and unbordered.
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-1")).toBeVisible();
    await expect(
      page.getByTestId("post-category-list-heading").getByTestId("post-required-mark"),
      "PW-75: the mark outlived the chosen leaf",
    ).toHaveCount(0);
    await expect(page.getByTestId("post-category-group")).toHaveAttribute("data-empty", "0");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    await specsSettled(page);
    await expect(
      page
        .locator(`[data-testid="post-field"][data-field="post-attr-${spec.number.attrKey}"]`)
        .getByTestId("post-required-mark"),
      "PW-75: an optional detail carries the mark",
    ).toHaveCount(0);
    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${spec.text.attrKey}"]`)
      .fill("x");
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-5")).toBeVisible({ timeout: 20_000 });
    await expect(
      page
        .locator('[data-testid="post-field"][data-field="post-title"]')
        .getByTestId("post-required-mark"),
      "PW-75: the title carries no mark",
    ).toBeVisible();
  });

  /**
   * INC-228 — AUTOSAVE IS NOT AN EXAM. The wizard saves at the LAST COMPLETED
   * step while the seller is still typing, so a half-filled step is never thrown
   * back at them mid-sentence; only `Next` names the current step and only then
   * does the door judge it strictly.
   */
  test("PW-16 typing is saved without judgement; only Next asks the door to judge the step", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const spec = await seedSpecSet(category.id);
    specs.push(
      spec.text.attrKey,
      spec.number.attrKey,
      spec.bool.attrKey,
      spec.select.attrKey,
      spec.multi.attrKey,
    );
    await reachStep3(page, user.id, category);

    // One detail answered, the required text left alone: the autosave that follows
    // must not refuse anything.
    const picker = page.locator(
      `[data-testid="post-attr-control"][data-attr="${spec.select.attrKey}"]`,
    );
    await picker.focus();
    await picker.selectOption(spec.optionValues[0] ?? "");
    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${spec.number.attrKey}"]`)
      .fill("7");
    await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved", {
      timeout: 20_000,
    });
    // J7 — the truth the autosave leaves behind, not a sleep: the answer reached
    // the draft row, so whatever the door had to say about this step it has said.
    await expect
      .poll(async () => JSON.stringify((await draftsOf(user.id))[0]?.attributes ?? {}), {
        timeout: 20_000,
        intervals: [500],
        message: "PW-16: the typed detail never reached the draft row",
      })
      .toContain("7");
    await expect(
      page.getByTestId("post-refusal-summary"),
      "PW-16: autosave judged a step the seller is still filling in",
    ).toHaveCount(0);
    await expect(page.locator('[data-testid="post-attr-refusal"]')).toHaveCount(0);
    // DB TRUTH: the recorded step is still the last COMPLETED one (D39: step 1).
    expect(
      (await draftsOf(user.id))[0]?.draft_step,
      "PW-16: autosave advanced the recorded step",
    ).toBe(1);

    // Next asks for the verdict, and now the untouched required detail is refused.
    await page.getByTestId("post-next").click();
    await expect(
      page.locator(`[data-testid="post-attr-refusal"][data-attr="${spec.text.attrKey}"]`),
      "PW-16: Next did not ask the door to judge the step",
    ).toBeVisible();
    await expect(page.getByTestId("post-refusal-summary")).toBeVisible();
    await expect(page.getByTestId("post-step-3")).toBeVisible();
  });

  /**
   * INC-229 — THE WIZARD STATE IS THE DRAFT. A step's answers live in the draft,
   * never in a state that dies when the step unmounts, so going Back shows what
   * was typed rather than an empty form.
   */
  test("PW-18 specifications survive a step Back", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    const spec = await seedSpecSet(category.id);
    specs.push(
      spec.text.attrKey,
      spec.number.attrKey,
      spec.bool.attrKey,
      spec.select.attrKey,
      spec.multi.attrKey,
    );
    await reachStep3(page, user.id, category);

    const text = page.locator(
      `[data-testid="post-attr-control"][data-attr="${spec.text.attrKey}"]`,
    );
    const number = page.locator(
      `[data-testid="post-attr-control"][data-attr="${spec.number.attrKey}"]`,
    );
    await text.fill("e2e back text");
    await number.fill("7");
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-5")).toBeVisible();

    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    await expect(
      page.locator(`[data-testid="post-attr-control"][data-attr="${spec.text.attrKey}"]`),
      "PW-18: the typed detail was lost on Back",
    ).toHaveValue("e2e back text");
    await expect(
      page.locator(`[data-testid="post-attr-control"][data-attr="${spec.number.attrKey}"]`),
      "PW-18: the typed number was lost on Back",
    ).toHaveValue("7");
    // An EMPTY required detail wears a soft border from the start (U6-C1-R2).
    await expect(
      page.locator(`[data-testid="post-field"][data-field="post-attr-${spec.text.attrKey}"]`),
      "PW-18: the details do not render through the field primitive",
    ).toBeVisible();
  });

  /**
   * DEC-072 — THE SELLER'S WORDS WIN. The assistant is given the draft to build
   * on, so a phrase the seller wrote survives into the suggestion. Fake mode
   * makes that provable without a provider call.
   */
  test("PW-19 the seller's own phrase survives into the suggestion", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    await reachStep3(page, user.id, category);
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-5")).toBeVisible();

    const phrase = "gray and very strong";
    await page.getByTestId("post-description").fill(`${phrase} steel door`);
    await page.getByTestId("post-assist").click();
    await expect(page.getByTestId("post-assist-done")).toBeVisible({ timeout: 30_000 });
    await expect(
      page.locator(
        '[data-testid="post-assist-suggestion"][data-index="0"] [data-testid="post-assist-suggestion-description"]',
      ),
      "PW-19: the seller's own phrase did not survive into the suggestion",
    ).toContainText(phrase);
  });

  /* ------------- U6-C1-R3a-2 — folds, per-link narrowing, facts ------------- */

  /**
   * DEC-050 `parent` — A CHILD SHOWS ONLY WHAT HANGS UNDER THE PARENT'S ANSWER.
   * The pair is scratch (a make with two models under it and one under another),
   * so no real catalogue row is read or written (J3).
   */
  test("PW-21 a child detail shows only the chosen parent's options and clears on change", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const fold = await seedFoldSet(category.id);
    specs.push(...fold.attrKeys);
    await reachStep3(page, user.id, category);

    const make = page.locator(
      `[data-testid="post-attr-control"][data-attr="${fold.make.attrKey}"]`,
    );
    const model = page.locator(
      `[data-testid="post-attr-control"][data-attr="${fold.model.attrKey}"]`,
    );

    // WITH NO PARENT ANSWER the child is closed and says which answer it waits for.
    await expect(model, "PW-21: the child was open with no parent chosen").toBeDisabled();
    await expect(
      page.locator(`[data-testid="post-attr-parent-first"][data-attr="${fold.model.attrKey}"]`),
    ).toBeVisible();

    await make.selectOption(fold.makeValues[0]);
    await expect(model).toBeEnabled();
    await expect(
      model.locator("option"),
      "PW-21: the child did not narrow to the chosen make's models",
    ).toHaveCount(3); // the empty row + two models
    await expect(model.locator(`option[value="${fold.modelValues[0]}"]`)).toHaveCount(1);
    await expect(
      model.locator(`option[value="${fold.modelValues[2]}"]`),
      "PW-21: a model of the other make was offered",
    ).toHaveCount(0);

    await model.selectOption(fold.modelValues[0]);
    await expect(model).toHaveValue(fold.modelValues[0]);

    // THE PARENT CHANGES — the answer that no longer fits is cleared, not kept.
    await make.selectOption(fold.makeValues[1]);
    await expect(model, "PW-21: a model that no longer fits survived the make change").toHaveValue(
      "",
    );
    await expect(model.locator(`option[value="${fold.modelValues[2]}"]`)).toHaveCount(1);
  });

  /**
   * M-MAINT-2 §12 — the LINK narrows the shortlist and opens on a default. The
   * door refuses anything outside `allowed_options` (`optionNotAllowed`); this is
   * the seam's half of that law.
   */
  test("PW-22 a link's allowed options narrow the picker and its default prefills", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const fold = await seedFoldSet(category.id);
    specs.push(...fold.attrKeys);
    const listingId = await reachStep3(page, user.id, category);

    const unit = page.locator(
      `[data-testid="post-attr-control"][data-attr="${fold.unit.attrKey}"]`,
    );
    await expect(unit, "PW-22: the link's default did not prefill").toHaveValue(
      fold.unitValues[0],
      { timeout: 20_000 },
    );
    await expect(unit.locator(`option[value="${fold.unitValues[1]}"]`)).toHaveCount(1);
    await expect(
      unit.locator(`option[value="${fold.unitValues[2]}"]`),
      "PW-22: an option outside the link's shortlist was offered",
    ).toHaveCount(0);

    /**
     * INC-245 — A DEFAULT IS WHAT AN EMPTY FIELD STARTS FROM, not a one-off. A make
     * change empties every detail (D25b), so the link's default fills the unit again
     * rather than leaving a field the category says has an opening answer.
     */
    await unit.selectOption(fold.unitValues[1]);
    await expect(unit).toHaveValue(fold.unitValues[1]);
    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${fold.make.attrKey}"]`)
      .selectOption(fold.makeValues[1]);
    await expect(unit, "PW-22: the link's default did not return after a make reset").toHaveValue(
      fold.unitValues[0],
      { timeout: 20_000 },
    );

    // J4 — DB truth: the default the screen showed is what the door recorded.
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    await expect
      .poll(async () => (await attributesOf(listingId))[fold.unit.attrKey], {
        message: "PW-22: the prefilled default never reached the draft",
      })
      .toBe(fold.unitValues[0]);
  });

  /**
   * D24 — A CONDITIONAL DETAIL. The charging question is asked ONLY when the fuel
   * is electric; while it is not asked it is absent — not on screen, not required,
   * and never sent, whatever a seller answered before changing the fuel.
   */
  test("PW-28 a conditional detail appears only when its condition is met", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    const set = await seedConditionalSet(category.id);
    specs.push(...set.attrKeys);
    const listingId = await reachStep3(page, user.id, category);

    const fuel = page.locator(`[data-testid="post-attr-control"][data-attr="${set.fuel.attrKey}"]`);
    const charging = page.locator(
      `[data-testid="post-attr-control"][data-attr="${set.charging.attrKey}"]`,
    );
    await expect(fuel, "PW-28: the fuel detail never rendered").toBeVisible({ timeout: 20_000 });
    await expect(
      charging,
      "PW-28: the conditional detail was on screen with no fuel chosen",
    ).toHaveCount(0);

    await fuel.selectOption(set.fuelValues.petrol);
    await expect(charging, "PW-28: petrol asked for a charging type").toHaveCount(0);

    await fuel.selectOption(set.fuelValues.electric);
    await expect(charging, "PW-28: electric did not ask for a charging type").toBeVisible({
      timeout: 20_000,
    });
    await charging.selectOption(set.chargingValue);

    // THE CONDITION FALLS AWAY — the answer goes with it, on screen and in the row.
    await fuel.selectOption(set.fuelValues.petrol);
    await expect(charging).toHaveCount(0);
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-5")).toBeVisible({ timeout: 20_000 });
    await expect
      .poll(async () => Object.keys(await attributesOf(listingId)).includes(set.charging.attrKey), {
        message: "PW-28: an unasked answer reached the draft",
        timeout: 20_000,
      })
      .toBe(false);
  });

  /**
   * D18 — THE MODEL ALREADY KNOWS THINGS. Choosing an option whose `facts` name a
   * sibling fills that sibling in and says where the answer came from.
   */
  test("PW-9 an option's facts prefill the siblings they name", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    const fold = await seedFoldSet(category.id);
    specs.push(...fold.attrKeys);
    const listingId = await reachStep3(page, user.id, category);

    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${fold.make.attrKey}"]`)
      .selectOption(fold.makeValues[0]);
    await page
      .locator(`[data-testid="post-attr-control"][data-attr="${fold.model.attrKey}"]`)
      .selectOption(fold.modelValues[1]);

    const year = page.locator(
      `[data-testid="post-attr-control"][data-attr="${fold.year.attrKey}"]`,
    );
    await expect(year, "PW-9: the model's known year did not prefill").toHaveValue(
      String(fold.modelYearValue),
      { timeout: 20_000 },
    );
    await expect(
      page.locator(`[data-testid="post-attr-from-model"][data-attr="${fold.year.attrKey}"]`),
      "PW-9: the prefilled field did not say where the answer came from",
    ).toBeVisible();

    /**
     * D27 — AN ATTESTATION IS NOT PREFILLED. The same model's facts also speak
     * about a boolean detail: the box stays UNTICKED and the fact appears beside
     * it as a hint, because only the seller may state what is true of their item.
     */
    const dual = page.locator(
      `[data-testid="post-attr-control"][data-attr="${fold.dual.attrKey}"]`,
    );
    await expect(
      page.locator(`[data-testid="post-attr-fact-hint"][data-attr="${fold.dual.attrKey}"]`),
      "PW-9: the model's boolean fact was not shown as a hint",
    ).toBeVisible({ timeout: 20_000 });
    await expect(dual, "PW-9: a fact ticked the attestation for the seller").not.toBeChecked();

    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    await expect
      .poll(async () => (await attributesOf(listingId))[fold.year.attrKey], {
        message: "PW-9: the prefilled year never reached the draft",
      })
      .toBe(fold.modelYearValue);
    // The unticked attestation reached nothing: an absent answer is absent.
    expect(
      (await attributesOf(listingId))[fold.dual.attrKey],
      "PW-9: an unticked attestation was stored anyway",
    ).toBeUndefined();
  });

  /**
   * U6-C1-R3b-3c STEP 1 (INC-242) — A BOUND COMES FROM WHATEVER OPTION CARRIES IT.
   *
   * The year picker used to read only the bound of the option it HANGS UNDER, so a
   * floor written on any other answer was quietly ignored — a listing could be
   * offered a year the catalogue had already ruled out. The effective bounds are
   * now the definition's own narrowed by EVERY chosen option; here the floor sits
   * on the unit picker's opening option, and the year hangs under nothing at all.
   * The door's bounds remain the authority (F3); this proves the control can never
   * reach them.
   */
  test("PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288)", async ({
    page,
  }) => {
    // INC-247 — THE CATALOGUE'S OWN SHAPE: the year is linked at the SECTION and
    // only inherited by the leaf, the fold is three levels deep, and the bound is
    // written as the attributes FILE writes it (text).
    const { parent, leaf: child } = await seedCategoryBranch();
    branches.push(parent.slug, child.slug);
    const user = await seller(page);
    const deep = await seedDeepFoldSet({ leafId: child.id, sectionId: parent.id });
    specs.push(...deep.attrKeys);
    const [ahead, behind] = await seedYearDefs(child.id, [
      { min: "year-1", max: "year+5" },
      { min: "year-3", max: "year" },
    ]);
    const listingId = await reachStep3(page, user.id, child);

    const control = (attrKey: string) =>
      page.locator(`[data-testid="post-attr-control"][data-attr="${attrKey}"]`);
    const year = control(deep.year.attrKey);
    await expect(year, "PW-25: the inherited year field never rendered").toBeVisible({
      timeout: 20_000,
    });
    await expect(year, "PW-25: the inherited year field carries no picker mark").toHaveAttribute(
      "data-year",
      "1",
      { timeout: 20_000 },
    );

    const offered = async () =>
      (await year.locator("option").allTextContents())
        .map((text) => Number(text.trim()))
        .filter((value) => Number.isFinite(value) && value > 0);

    // DEC-053 — an option list is read on the first tap, so each level of the fold
    // is focused and awaited before it is answered.
    const answer = async (attrKey: string, value: string) => {
      const picker = control(attrKey);
      await picker.focus();
      await expect(picker, `PW-25: ${attrKey} never loaded its options`).toHaveAttribute(
        "data-options",
        "ready",
        { timeout: 20_000 },
      );
      await picker.selectOption(value);
    };

    // THE FOLD, three answers deep.
    await answer(deep.brand.attrKey, deep.brandValue);
    await answer(deep.series.attrKey, deep.seriesValue);
    await answer(deep.model.attrKey, deep.floorModel);

    // CASE 1 — A FLOOR ALONE.
    await expect
      .poll(async () => Math.min(...(await offered())), {
        message: "PW-25: the model's floor never reached the inherited picker",
        timeout: 20_000,
      })
      .toBe(deep.floorYear);
    const years = await offered();
    expect(years[0], "PW-25: the picker is not newest-first").toBe(Math.max(...years));
    expect(
      years.filter((value) => value < deep.floorYear),
      "PW-25: the picker offered years below the model's floor",
    ).toHaveLength(0);

    // CASE 2 — ONE YEAR ONLY (min = max). DEC-085 (W4) supersedes the old
    // "offers exactly that year": the one admissible year IS the answer, so the
    // form stores it and hides the row (DB truth, J4).
    await answer(deep.model.attrKey, deep.pinModel);
    await expect(
      page.locator(`[data-testid="post-spec"][data-attr="${deep.year.attrKey}"]`),
      "PW-25: a single-year model left the picker asking",
    ).toHaveCount(0, { timeout: 20_000 });
    await expect
      .poll(async () => (await attributesOf(listingId))[deep.year.attrKey], {
        message: "PW-25: a single-year model did not store its year",
        timeout: 20_000,
      })
      .toBe(deep.pinnedYear);

    // INC-288 — RELATIVE BOUNDS, the door's vocabulary (scratch definitions,
    // reaped by the afterEach through `specs` — J3).
    const now = new Date().getUTCFullYear();
    const valuesOf = (attrKey: string) =>
      control(attrKey)
        .locator("option")
        .evaluateAll((nodes) =>
          nodes.map((node) => (node as HTMLOptionElement).value).filter(Boolean),
        );
    const span = (from: number, to: number) =>
      Array.from({ length: to - from + 1 }, (_, index) => String(to - index));
    await expect
      .poll(() => valuesOf(ahead!.attrKey), {
        message: "PW-25: year-1 … year+5 did not offer seven years, newest first",
        timeout: 20_000,
      })
      .toEqual(span(now - 1, now + 5));
    await expect
      .poll(() => valuesOf(behind!.attrKey), {
        message: "PW-25: year-3 … year did not offer four years, newest first",
        timeout: 20_000,
      })
      .toEqual(span(now - 3, now));
    await control(ahead!.attrKey).selectOption(String(now + 5));
    await expect(
      page.locator(`[data-testid="post-attr-refusal"][data-attr="${ahead!.attrKey}"]`),
      "PW-25: year+5 was refused on the form",
    ).toHaveCount(0);
    await expect
      .poll(async () => (await attributesOf(listingId))[ahead!.attrKey], {
        message: "PW-25: the door did not accept year+5",
        timeout: 20_000,
      })
      .toBe(now + 5);
  });

  /**
   * INC-288 / D45 — scratch year definitions (G27: scratch only, reaped by the
   * afterEach through `specs`, which survives a body timeout — J3).
   */
  async function seedYearDefs(
    categoryId: string,
    bounds: { min: string; max: string }[],
  ): Promise<{ id: string; attrKey: string }[]> {
    const supabase = adminClient();
    const stem = `e2e_yr_${Date.now()}_${rand()}`;
    const rows = bounds.map((bound, index) => ({
      attr_key: `${stem}_${index}`,
      name_en: `${stem} year ${index}`,
      attr_type: "number",
      min_bound: bound.min,
      max_bound: bound.max,
      decimals: 0,
      format: "year",
    }));
    const { data, error } = await supabase.from("attributes").insert(rows).select("id, attr_key");
    if (error || !data) throw new Error(`[e2e:yr] seeding failed: ${error?.message ?? "no rows"}`);
    specs.push(...data.map((row) => row.attr_key));
    const ordered = rows.map((row) => {
      const found = data.find((entry) => entry.attr_key === row.attr_key);
      if (!found) throw new Error(`[e2e:yr] ${row.attr_key} missing`);
      return { id: found.id, attrKey: found.attr_key };
    });
    const { error: linkError } = await supabase.from("category_attribute_links").insert(
      ordered.map((def, index) => ({
        category_id: categoryId,
        attribute_id: def.id,
        is_required: false,
        display_order: 100 + index,
      })),
    );
    if (linkError) throw new Error(`[e2e:yr] linking failed: ${linkError.message}`);
    return ordered;
  }

  /** Record a scratch draft as past contact (service client, this row only) and open it. */
  async function openAtReview(page: Page, listingId: string, userId: string, tag: string) {
    const { error } = await adminClient()
      .from("listings")
      .update({ draft_step: 7 })
      .eq("id", listingId)
      .eq("seller_id", userId);
    if (error) throw new Error(`[e2e:${tag}] seeding draft_step failed: ${error.message}`);
    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-8"), `${tag}: the review never opened`).toBeVisible({
      timeout: 20_000,
    });
  }

  test("PW-58 under Amharic a year reads with its Ethiopian years, the same on the picker and the review (D45)", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const [def] = await seedYearDefs(category.id, [{ min: "2000", max: "2030" }]);
    const listingId = await reachStep3(page, user.id, category);
    const picker = page.locator(`[data-testid="post-attr-control"][data-attr="${def!.attrKey}"]`);
    const option = (year: number) => picker.locator(`option[value="${year}"]`);

    await expect(option(2027), "PW-58: the English picker is not the bare year").toHaveText(
      "2027",
      { timeout: 20_000 },
    );
    await switchLanguage(page, "am");
    await expect(option(2027), "PW-58: 2027 did not read 2019/20 ዓ.ም").toHaveText(
      "2027 · 2019/20 ዓ.ም",
      { timeout: 20_000 },
    );
    await expect(option(2000), "PW-58: 2000 did not read 1992/93 ዓ.ም").toHaveText(
      "2000 · 1992/93 ዓ.ም",
    );
    await picker.selectOption("2027");
    await expect
      .poll(async () => (await attributesOf(listingId))[def!.attrKey], {
        message: "PW-58: the Gregorian year was not stored",
        timeout: 20_000,
      })
      .toBe(2027);
    await openAtReview(page, listingId, user.id, "PW-58");
    await expect(
      page.getByTestId("post-review-preview").locator(`[data-key="${def!.attrKey}"]`),
      "PW-58: the Amharic review did not match the picker's label",
    ).toHaveText("2027 · 2019/20 ዓ.ም", { timeout: 20_000 });
    // D45 part 2 — the buyer sheet reads the same label (the seventh argument).
    await page.getByTestId("post-preview-open").click();
    const sheet = page.getByTestId("post-preview-sheet");
    await expect(sheet, "PW-58: the buyer preview never opened").toBeVisible();
    await expect(
      sheet.locator(`[data-testid="listing-detail-spec"][data-key="${def!.attrKey}"]`),
      "PW-58: the buyer sheet did not read the Ethiopian years",
    ).toHaveText("2027 · 2019/20 ዓ.ም", { timeout: 20_000 });
    await page.getByTestId("post-preview-close").click();
  });

  /**
   * U6-C1-R3b-3c STEP 3 (D26) — A COLOUR IS SEEN.
   *
   * "black" is a word in a list; a colour is a colour. A parent-prefixed value
   * (`dog_black`) resolves through its stem, and a patterned colour (`cat_tabby`)
   * renders a neutral patterned chip. If no option resolves to a visual colour the
   * tray is absent rather than a row of empty circles (F4).
   */
  test("PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const set = await seedColourSet(category.id);
    specs.push(...set.attrKeys);
    await reachStep3(page, user.id, category);

    const swatch = (value: string) =>
      page.locator(
        `[data-testid="post-attr-swatch"][data-attr="${set.colour.attrKey}"][data-value="${value}"]`,
      );
    await expect(swatch(set.inked), "PW-34: the colour option carries no swatch").toBeVisible({
      timeout: 20_000,
    });
    // THE INK IS THE OPTION'S OWN, not a theme colour.
    await expect
      .poll(
        async () =>
          swatch(set.inked)
            .getByTestId("post-attr-swatch-ink")
            .evaluate((node) => getComputedStyle(node).backgroundColor),
        { message: "PW-34: the swatch was never painted", timeout: 20_000 },
      )
      .toBe("rgb(17, 17, 17)");

    // A PARENT-PREFIXED VALUE paints from its colour stem.
    await expect(
      swatch(set.prefixed),
      "PW-34: a prefixed colour value has no swatch",
    ).toBeVisible();
    await expect
      .poll(
        async () =>
          swatch(set.prefixed)
            .getByTestId("post-attr-swatch-ink")
            .evaluate((node) => getComputedStyle(node).backgroundColor),
        { message: "PW-34: the prefixed swatch was never painted", timeout: 20_000 },
      )
      .toBe("rgb(17, 17, 17)");

    // A PATTERN STEM renders as the neutral patterned chip, not an empty circle.
    await expect(
      swatch(set.pattern),
      "PW-34: a patterned colour value has no swatch",
    ).toHaveAttribute("data-swatch", "pattern");

    // AN UNRELATED COLOUR-LIKE FIELD with no resolvable option gets no tray at all.
    await expect(
      page.locator(`[data-testid="post-attr-swatches"][data-attr="${set.plain.attrKey}"]`),
      "PW-34: an unresolved colour list rendered empty swatches",
    ).toHaveCount(0);

    // AND THE SWATCH ANSWERS THE QUESTION the picker beside it asks.
    await swatch(set.inked).click();
    await expect(
      page.locator(`[data-testid="post-attr-control"][data-attr="${set.colour.attrKey}"]`),
      "PW-34: tapping a swatch did not answer the detail",
    ).toHaveValue(set.inked, { timeout: 20_000 });
  });

  /**
   * D28 / M-SWATCH — THE CATALOGUE SAYS THE COLOUR.
   *
   * None of these option values is a colour word, so a name lookup can paint
   * nothing: the three tiles can only come from the option's own declared
   * `swatch` cell — one hex, two hexes for a two-tone, and `pattern:tabby`. An
   * option with no cell and no colour word resolves to nothing, so the tray
   * carries three tiles and not four (never an empty circle, INC-259).
   */
  test("PW-45 a declared swatch renders one ink, a two-tone and a pattern tile", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const set = await seedSwatchSet(category.id);
    specs.push(...set.attrKeys);
    await reachStep3(page, user.id, category);

    const tray = page.locator(
      `[data-testid="post-attr-swatches"][data-attr="${set.colour.attrKey}"]`,
    );
    const swatch = (value: string) =>
      tray.locator(`[data-testid="post-attr-swatch"][data-value="${value}"]`);

    await expect(tray, "PW-45: the declared swatch tray never rendered").toBeVisible({
      timeout: 20_000,
    });

    // ONE HEX — the declared ink, not a theme colour.
    await expect(swatch(set.solid)).toHaveAttribute("data-swatch", "solid");
    await expect
      .poll(
        async () =>
          swatch(set.solid)
            .getByTestId("post-attr-swatch-ink")
            .evaluate((node) => getComputedStyle(node).backgroundColor),
        { message: "PW-45: the declared ink was never painted", timeout: 20_000 },
      )
      .toBe("rgb(17, 17, 17)");

    // TWO HEXES — a diagonal half and half, so both inks are in the tile.
    await expect(swatch(set.duo)).toHaveAttribute("data-swatch", "duo");
    await expect
      .poll(
        async () =>
          swatch(set.duo)
            .getByTestId("post-attr-swatch-ink")
            .evaluate((node) => getComputedStyle(node).backgroundImage),
        { message: "PW-45: the two-tone tile was never painted", timeout: 20_000 },
      )
      .toMatch(/rgb\(17, 17, 17\).*rgb\(255, 255, 255\)/);

    // A PATTERN — the patterned tile, by name.
    await expect(swatch(set.patterned)).toHaveAttribute("data-swatch", "pattern");

    // AND AN OPTION THAT SAYS NOTHING gets no tile at all.
    await expect(
      swatch(set.bare),
      "PW-45: an option with no swatch rendered an empty circle",
    ).toHaveCount(0);

    // THE TILE STILL ANSWERS the question beside it.
    await swatch(set.duo).click();
    await expect(
      page.locator(`[data-testid="post-attr-control"][data-attr="${set.colour.attrKey}"]`),
      "PW-45: tapping a declared swatch did not answer the detail",
    ).toHaveValue(set.duo, { timeout: 20_000 });
  });

  /**
   * U6-C1-R3b-3d STEP 2 (INC-244) — WHAT THE MODEL RULES OUT.
   *
   * An option's `allowed` names a sibling picker and the only answers it admits.
   * The picker offers those and nothing else; a single admissible answer is written
   * and the control says whose answer it is and takes no taps. A model that allows
   * everything leaves the same picker open. The door narrows too; this is the
   * mirror (F3).
   */
  test("PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44)", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const set = await seedAllowedSet(category.id);
    specs.push(...set.attrKeys);
    const listingId = await reachStep3(page, user.id, category);

    const model = page.locator(
      `[data-testid="post-attr-control"][data-attr="${set.model.attrKey}"]`,
    );
    const fuel = page.locator(`[data-testid="post-attr-control"][data-attr="${set.fuel.attrKey}"]`);
    await expect(fuel, "PW-35: the fuel picker never rendered").toBeVisible({ timeout: 20_000 });
    // BEFORE a model is chosen the picker offers its whole list.
    await expect(fuel.locator(`option[value="${set.fuelPetrol}"]`)).toHaveCount(1);

    await model.selectOption(set.strictModel);
    /**
     * D44 — A SETTLED ANSWER IS STORED, NOT SHOWN. One answer admitted: the row
     * spends nothing on the form (no control, no strip), and the draft still
     * carries the only allowed value (J4 — DB truth).
     */
    await expect
      .poll(async () => (await attributesOf(listingId))[set.fuel.attrKey], {
        message: "PW-35: the settled answer never reached the draft",
        timeout: 20_000,
      })
      .toBe(set.fuelElectric);
    const fuelRow = page.locator(`[data-testid="post-spec"][data-attr="${set.fuel.attrKey}"]`);
    await expect(fuelRow, "PW-35: a settled answer still rendered a row").toHaveCount(0, {
      timeout: 20_000,
    });
    await expect(fuel, "PW-35: a settled answer still spent an input on the form").toHaveCount(0);

    // A MODEL THAT RULES NOTHING OUT leaves the picker open again.
    await model.selectOption(set.openModel);
    await expect(
      fuel.locator(`option[value="${set.fuelPetrol}"]`),
      "PW-35: the picker stayed narrowed under a model with no allowed set",
    ).toHaveCount(1, { timeout: 20_000 });
    await expect(fuel, "PW-35: the picker stayed locked").toHaveAttribute("data-locked", "0");

    // THE REVIEW STILL SHOWS IT: settle again, then open the draft at review.
    await model.selectOption(set.strictModel);
    await expect(fuelRow, "PW-35: the re-settled row still rendered").toHaveCount(0, {
      timeout: 20_000,
    });
    await expect
      .poll(async () => (await attributesOf(listingId))[set.fuel.attrKey], {
        message: "PW-35: the re-settled answer never reached the draft",
        timeout: 20_000,
      })
      .toBe(set.fuelElectric);
    await openAtReview(page, listingId, user.id, "PW-35");
    await expect(
      page.getByTestId("post-review-preview").locator(`[data-key="${set.fuel.attrKey}"]`),
      "PW-35: the review never showed the settled answer",
    ).toHaveText(`${set.fuelElectric} label`, { timeout: 20_000 });
  });

  test("PW-42 Amharic catalog text falls back field by field", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    const spec = await seedSpecSet(category.id);
    specs.push(
      spec.text.attrKey,
      spec.number.attrKey,
      spec.bool.attrKey,
      spec.select.attrKey,
      spec.multi.attrKey,
    );
    const helpAm = `${spec.text.attrKey} የአማርኛ እገዛ`;
    const helpEn = `${spec.number.attrKey} English help`;
    const { error } = await adminClient()
      .from("attributes")
      .upsert([
        {
          id: spec.text.id,
          attr_key: spec.text.attrKey,
          name_en: spec.text.nameEn,
          name_am: `${spec.text.attrKey} የአማርኛ መለያ`,
          attr_type: "text",
          max_length: 40,
          help_text_en: `${spec.text.attrKey} English help`,
          help_text_am: helpAm,
        },
        {
          id: spec.number.id,
          attr_key: spec.number.attrKey,
          name_en: spec.number.nameEn,
          attr_type: "number",
          min_bound: "1",
          max_bound: "9",
          decimals: 0,
          unit: "km",
          help_text_en: helpEn,
          help_text_am: null,
        },
      ]);
    if (error) throw new Error(`[e2e:pw42] seeding localized help failed: ${error.message}`);

    await switchLanguage(page, "am");
    await reachStep3(page, user.id, category);

    await expect(
      page.locator(`[data-testid="post-spec"][data-attr="${spec.text.attrKey}"]`),
      "PW-42: the definition's Amharic label did not render",
    ).toContainText(`${spec.text.attrKey} የአማርኛ መለያ`);
    await expect(
      page.locator(`[data-testid="post-spec"][data-attr="${spec.text.attrKey}"]`),
      "PW-42: Amharic help did not outrank English help",
    ).toContainText(helpAm);
    await expect(
      page.locator(`[data-testid="post-spec"][data-attr="${spec.number.attrKey}"]`),
      "PW-42: missing Amharic help did not fall back to English",
    ).toContainText(helpEn);

    const picker = page.locator(
      `[data-testid="post-attr-control"][data-attr="${spec.select.attrKey}"]`,
    );
    if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
    await expect(picker).toHaveAttribute("data-options", "ready");
    await expect(
      picker.locator(`option[value="${spec.optionValues[0]}"]`),
      "PW-42: the option's Amharic label did not render",
    ).toHaveText(`${spec.optionValues[0]} ምልክት`);
  });

  /**
   * INC-257 — A FACT REACHES A SIBLING THE SAME CHOICE UNHID. Selecting the type
   * both puts the power detail on screen and says what it is, so the prefill must
   * land on a detail that was hidden a moment earlier; the voltage default, asked
   * for only once the power is electric, must arrive too instead of erasing it.
   * Choosing the other type takes the whole branch away, on screen and in the row.
   */
  test("PW-43 a fact prefills a sibling the same selection unhides", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    const set = await seedUnhideFactSet(category.id);
    specs.push(...set.attrKeys);
    const listingId = await reachStep3(page, user.id, category);

    const type = page.locator(`[data-testid="post-attr-control"][data-attr="${set.type.attrKey}"]`);
    const power = page.locator(
      `[data-testid="post-attr-control"][data-attr="${set.power.attrKey}"]`,
    );
    const volt = page.locator(`[data-testid="post-attr-control"][data-attr="${set.volt.attrKey}"]`);
    await expect(type, "PW-43: the type detail never rendered").toBeVisible({ timeout: 20_000 });
    await expect(
      power,
      "PW-43: the conditional sibling was on screen with no type chosen",
    ).toHaveCount(0);

    await type.selectOption(set.typeValues.treadmill);
    await expect(power, "PW-43: the type did not unhide its sibling").toBeVisible({
      timeout: 20_000,
    });
    await expect(power, "PW-43: the fact did not prefill the unhidden sibling").toHaveValue(
      set.powerValues.electric,
      { timeout: 20_000 },
    );
    await expect(volt, "PW-43: the deeper conditional never followed the prefill").toHaveValue(
      set.voltDefault,
      { timeout: 20_000 },
    );

    await expect
      .poll(async () => (await attributesOf(listingId))[set.power.attrKey], {
        message: "PW-43: the prefilled answer never reached the draft",
        timeout: 20_000,
      })
      .toBe(set.powerValues.electric);

    // THE OTHER TYPE ASKS FOR NEITHER — both answers go, on screen and in the row.
    await type.selectOption(set.typeValues.mat);
    await expect(power, "PW-43: a hidden sibling stayed on screen").toHaveCount(0);
    await expect(volt, "PW-43: a hidden deeper detail stayed on screen").toHaveCount(0);
    await nextThroughPhotos(page);
    await expect(page.getByTestId("post-step-5")).toBeVisible({ timeout: 20_000 });
    await expect
      .poll(
        async () => {
          const held = Object.keys(await attributesOf(listingId));
          return held.includes(set.power.attrKey) || held.includes(set.volt.attrKey);
        },
        { message: "PW-43: an unasked answer stayed in the draft", timeout: 20_000 },
      )
      .toBe(false);
  });

  /**
   * D35 — A PREFILL IS AN INPUT; ONLY A SETTLED ANSWER IS A STRIP.
   *
   * The locked half is PW-35's. Here the model's fact PREFILLS the year and leaves
   * the field open, so the seller keeps a real input with a real choice: no strip,
   * the value filled in, and the line saying where it came from.
   */
  test("PW-49 a prefill-only fact keeps its input while a settled one does not", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const fold = await seedFoldSet(category.id);
    specs.push(...fold.attrKeys);
    await reachStep3(page, user.id, category);

    const make = page.locator(
      `[data-testid="post-attr-control"][data-attr="${fold.make.attrKey}"]`,
    );
    const model = page.locator(
      `[data-testid="post-attr-control"][data-attr="${fold.model.attrKey}"]`,
    );
    const year = page.locator(
      `[data-testid="post-attr-control"][data-attr="${fold.year.attrKey}"]`,
    );

    await make.selectOption(fold.makeValues[0]);
    await expect(model, "PW-49: the model picker never opened under its make").toBeEnabled({
      timeout: 20_000,
    });
    await model.selectOption(fold.modelValues[1]);

    await expect(year, "PW-49: the model's prefilled year never reached its input").toHaveValue(
      String(fold.modelYearValue),
      { timeout: 20_000 },
    );
    await expect(
      page.locator(`[data-testid="post-attr-locked-strip"][data-attr="${fold.year.attrKey}"]`),
      "PW-49: an open prefill was collapsed into a strip",
    ).toHaveCount(0);
    await expect(
      page.locator(`[data-testid="post-attr-from-model"][data-attr="${fold.year.attrKey}"]`),
      "PW-49: a prefilled answer never said where it came from",
    ).toBeVisible();
  });

  /** A walk to step 3 through the category search, waiting for the form to settle. */
  const walkToSpecs = async (
    page: Page,
    userId: string,
    category: { id: string; slug: string },
    tag: string,
  ): Promise<void> => {
    await gotoReady(page, "/post");
    await chooseBySearch(page, category.slug, category.id);
    const [draft] = await draftsOf(userId);
    const listingId = String(draft?.id ?? "");
    expect(listingId, `${tag}: step 1 created no draft`).not.toBe("");
    objects.push({ userId, listingId });
    // D39 — the category lands on specifications directly; no photos leg.
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    await expect(page.getByTestId("post-specs"), `${tag}: the form never answered`).toBeVisible({
      timeout: 20_000,
    });
    /** INC-271 — the order is read only once the form says its lists have settled. */
    await expect(
      page.getByTestId("post-specs"),
      `${tag}: the option lists never settled`,
    ).toHaveAttribute("data-options", "1", { timeout: 20_000 });
  };

  /** The details on screen, in the order the form drew them. */
  const shownKeys = async (page: Page): Promise<string[]> =>
    page
      .getByTestId("post-spec")
      .evaluateAll((nodes: Element[]) => nodes.map((node) => node.getAttribute("data-attr") ?? ""));

  /**
   * D41 — EVERY ROW OPEN, IN DISPLAY ORDER. A Smartphones-shaped leaf: brand →
   * series → model → storage, then six plain seller-side extras. All ten are on
   * screen in `display_order` with no expander at all.
   */
  test("PW-50 the specifications show every row open in display order (D41)", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-360", "mobile-360 only");
    const user = await seller(page);
    const category = await leaf();
    const phone = await seedPhoneSet(category.id);
    specs.push(...phone.attrKeys);

    await walkToSpecs(page, user.id, category, "PW-50");

    await expect(
      page.getByTestId("post-specs-more"),
      "PW-50: an expander still hides rows",
    ).toHaveCount(0);
    expect(await shownKeys(page), "PW-50: the details were not all shown in display order").toEqual(
      phone.orderedKeys,
    );

    // THE FOLD STILL WORKS where it stands, and the model's fact reaches the storage.
    const control = (key: string) =>
      page.locator(`[data-testid="post-attr-control"][data-attr="${key}"]`);
    await control(phone.brandKey).selectOption(phone.brandValues[0]);
    await expect(control(phone.seriesKey), "PW-50: the series never opened").toBeEnabled({
      timeout: 20_000,
    });
    await control(phone.seriesKey).selectOption(phone.seriesValues[0]);
    await expect(control(phone.modelKey), "PW-50: the model never opened").toBeEnabled({
      timeout: 20_000,
    });
    await control(phone.modelKey).selectOption(phone.modelValues[0]);
    await expect(
      control(phone.storageKey),
      "PW-50: the model's storage fact never reached its field",
    ).toHaveValue(phone.modelStorageValue, { timeout: 20_000 });
  });

  /**
   * INC-269 — A DEPENDENT LIST NEVER RENDERS ABOVE ITS PARENT.
   *
   * Traditional Wear's shape: an OPTIONAL region at `display_order` 1 and a garment
   * list that hangs on it at 2. The first cut of D36 put the dependent first and its
   * parent behind the expander, so the list stood above the answer it waits for and
   * could not open at all.
   */
  test("PW-51 a dependent detail never renders above the answer it hangs on", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    const pair = await seedConditionalPair(category.id);
    specs.push(...pair.attrKeys);

    await walkToSpecs(page, user.id, category, "PW-51");

    const control = (key: string) =>
      page.locator(`[data-testid="post-attr-control"][data-attr="${key}"]`);
    await expect(control(pair.parentKey), "PW-51: the parent answer was not on screen").toBeVisible(
      { timeout: 20_000 },
    );

    await control(pair.parentKey).selectOption(pair.parentValues[0]);
    await expect(control(pair.childKey), "PW-51: the dependent never appeared").toBeVisible({
      timeout: 20_000,
    });
    const keys = await shownKeys(page);
    expect(
      keys.indexOf(pair.parentKey),
      "PW-51: the dependent rendered above its parent",
    ).toBeLessThan(keys.indexOf(pair.childKey));
    await control(pair.childKey).selectOption(pair.childValues[0]);
    await expect(control(pair.childKey), "PW-51: the dependent list could not be set").toHaveValue(
      pair.childValues[0],
    );
  });
});
