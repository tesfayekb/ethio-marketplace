import { join } from "node:path";

import { expect, test } from "./fixtures";

import { purgeListingObjects, photoRowsOf } from "./helpers/photos";
import { gotoReady, openRailScope, signInViaSession, switchLanguage } from "./helpers/ui";
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
  contactPrefOf,
  coverageOf,
  identityOf,
  pricingOf,
  rand,
  statusOf,
  destroyCategoryBranch,
  destroyListingsOf,
  destroyPostableCategory,
  draftsOf,
  seedAllowedSet,
  seedCategoryBranch,
  surfaceCategoryUnder,
  seedConditionalSet,
  seedColourSet,
  seedFactShiftSet,
  linkSpecToCategory,
  seedDeepFoldSet,
  seedFoldSet,
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

  test.afterEach(async () => {
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
      // AUTO-ADVANCE: the leaf IS the answer, so step 2 opens with the chip.
      await expect(page.getByTestId("post-step-2")).toBeVisible();
      await expect(page.getByTestId("post-category-chip-path")).toContainText(slug);
    }
  }

  test("PW-1 the shell renders one step of eight, Back and Next both closed", async ({ page }) => {
    await seller(page);
    await gotoReady(page, "/post");

    await expect(page.getByTestId("post-step-1")).toBeVisible();
    // Eight steps, always visible: the seller can see how long this will take.
    await expect(page.getByTestId("post-progress").locator("li")).toHaveCount(8);
    await expect(page.getByTestId("post-back")).toBeDisabled();
    // U6-C1-R3a-2 — STEP 1 HAS ONE ANSWER: with no leaf there is nothing to send,
    // so Next is closed and the caption says what is missing.
    await expect(
      page.getByTestId("post-next"),
      "PW-1: Next was pressable with no category chosen",
    ).toBeDisabled();
    await expect(page.getByTestId("post-next-blocked")).toBeVisible();
    // A keyboard seller pressing Enter gets the choice group outlined, not silence.
    await page.getByTestId("post-category-search").press("Enter");
    await expect(
      page.getByTestId("post-category-group"),
      "PW-1: Enter with no leaf left the choice group unmarked",
    ).toHaveAttribute("data-invalid", "1");
    await expect(page.getByTestId("post-category-refusal")).toBeVisible();
    await expect(page.getByTestId("post-step-1")).toBeVisible();
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
    // The chip carries the PATH, and its Change link returns to the one control.
    await expect(page.getByTestId("post-category-chip")).toBeVisible();
    await page.getByTestId("post-category-chip-change").click();
    await expect(page.getByTestId("post-step-1")).toBeVisible();
  });

  test("PW-3 a folder is browsable and never selectable; its leaf is (D11)", async ({ page }) => {
    // U6-C1-R2 — the folder carries an illustration and the LEAF has none, so the
    // stand-in on step 2 can only come from the ancestor walk.
    const { parent, leaf: child } = await seedCategoryBranch({
      parentImageUrl: "https://example.invalid/e2e-standin.jpg",
    });
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

    /**
     * U6-C1-R3b-3d STEP 5 — THE CRUMBS SAY WHERE YOU ARE, AND BACK CLIMBS.
     * Inside the folder the trail names the level and BACK leaves the level, not the
     * step; at the roots Back is closed because there is nothing above them, and the
     * crumb for "all categories" returns in one tap.
     */
    await expect(
      page.locator(`[data-testid="post-browse-crumb"][data-category="${parent.id}"]`),
      "PW-3: the level is not named by a crumb",
    ).toBeVisible();
    await page.getByTestId("post-back").click();
    await expect(folder, "PW-3: Back inside the tree did not climb to the roots").toBeVisible();
    await expect(page.getByTestId("post-step-1")).toBeVisible();
    await expect(
      page.getByTestId("post-back"),
      "PW-3: Back is still offered at the roots of step 1",
    ).toBeDisabled();

    await folder.click();
    await page.locator('[data-testid="post-browse-crumb"][data-category=""]').click();
    await expect(
      folder,
      "PW-3: the all-categories crumb did not return to the roots",
    ).toBeVisible();
    await folder.click();
    await expect(leafRow).toBeVisible();
    await leafRow.click();
    // The leaf advances by itself; the chip names the whole path, parent first.
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    await expect(page.getByTestId("post-category-chip-path")).toContainText(parent.slug);
    await expect(page.getByTestId("post-category-chip-path")).toContainText(child.slug);
    // The leaf has no picture of its own: the stand-in is the FOLDER's.
    await expect(
      page.getByTestId("post-photos-illustration"),
      "PW-3: a leaf without its own illustration showed no ancestor stand-in",
    ).toHaveAttribute("src", "https://example.invalid/e2e-standin.jpg");
    /**
     * U6-C1-R3a-2 (the PW-4 illustration law, proved where the stand-in actually
     * renders): a FIXED 4:3 box, never taller than 240 px, the picture CONTAINED
     * inside it — so a tall or wide stand-in is neither stretched nor cropped.
     */
    const box = await page.getByTestId("post-photos-illustration-box").boundingBox();
    expect(box, "PW-3: the illustration box was not laid out").not.toBeNull();
    const ratio = (box?.width ?? 0) / (box?.height ?? 1);
    expect(
      Math.abs(ratio - 4 / 3),
      `PW-3: the illustration box is ${ratio}:1, not 4:3`,
    ).toBeLessThan(0.05);
    expect(
      box?.height ?? 0,
      "PW-3: the illustration box is taller than 240 px",
    ).toBeLessThanOrEqual(241);
    await expect(page.getByTestId("post-photos-illustration")).toHaveCSS("object-fit", "contain");
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

    await expect(page.getByTestId("post-step-2")).toBeVisible();
    // U6-C1-R2 — PHOTOS ARE OPTIONAL and the step opens with a STAND-IN: the
    // helper line states the rules once and nothing offers to skip, because Next
    // already carries a seller who has no photo to give.
    await expect(page.getByTestId("post-photos-helper")).toBeVisible();
    await expect(page.getByTestId("post-photos-standin")).toBeVisible();
    await expect(
      page.getByTestId("post-photos-skip"),
      "PW-4: the removed skip button is still on screen",
    ).toHaveCount(0);
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
    // NOTHING WAS LOST AND NOTHING WAS WRITTEN: the seller is still on the one
    // control (an unsaved choice never advances), so the caption lies in neither
    // direction.
    await expect(page.getByTestId("post-step-1")).toBeVisible();
    expect(await draftsOf(user.id), "PW-8: an aborted save must write nothing").toEqual([]);

    await page.unroute("**/api/listings/draft");
    await page.getByTestId("post-save-retry").click();

    await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
    await expect
      .poll(async () => (await draftsOf(user.id)).map((row) => row.category_id), {
        message: "PW-8: the retry did not save the draft",
      })
      .toEqual([category.id]);
    // The choice survived the outage: the seller is still on step 1 (a retry is
    // not a forward move), and Next now carries them on with the chip in place.
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    await expect(page.getByTestId("post-category-chip-path")).toContainText(category.slug);
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
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();
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
    await expect(
      page.getByTestId("post-category-dropped"),
      "PW-26: the dropped detail was not named",
    ).toContainText(spec.text.nameEn);
    await expect(
      page.getByTestId("post-category-photos-recheck"),
      "PW-26: the photos were not flagged for the new category",
    ).toBeVisible();
    await expect(page.getByTestId("post-step-3")).toBeVisible();

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
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();

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

  test("LY-6 at 360 the open currency list is above the sticky action bar", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-360", "mobile-360 only");
    const user = await seller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    await reachStep5(page, user.id, category);

    // U6-C1-R3b-1 STEP 3 — the list opens UPWARDS into the bar's space. The proof
    // is what the FINGER would hit, not what the DOM contains: the element at the
    // first option's own centre must be that option.
    await page.getByTestId("post-price-mode-fixed").click();
    await page.getByTestId("post-price-currency-search").focus();
    // J5 — the row is named, never taken by position: ETB is the Ethiopian
    // market's own currency and the one the list opens on.
    const first = page
      .getByTestId("post-price-currency-list")
      .locator('[data-testid="post-price-currency-option"][data-code="ETB"]');
    await expect(first, "LY-6: the currency list never opened").toBeVisible();
    const box = await first.boundingBox();
    expect(box, "LY-6: the first currency option has no box").not.toBe(null);
    const hit = await page.evaluate(
      ({ x, y }) => {
        const node = document.elementFromPoint(x, y);
        return node?.closest("[data-testid]")?.getAttribute("data-testid") ?? "";
      },
      { x: (box?.x ?? 0) + (box?.width ?? 0) / 2, y: (box?.y ?? 0) + (box?.height ?? 0) / 2 },
    );
    expect(hit, "LY-6: the sticky action bar covers the open currency list").toBe(
      "post-price-currency-option",
    );
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

    // THE PLAN: one city. A second place is refused before a round trip is spent.
    await page.getByTestId("post-where-extra-region").selectOption(chain.region.id);
    await page.getByTestId("post-where-extra-city").selectOption(chain.city.id);
    // A DIFFERENT place from the default (the whole city), so the plan — not a
    // duplicate — is what refuses it.
    await page.getByTestId("post-where-extra-subcity").selectOption(chain.subCity.id);
    await page.getByTestId("post-where-add").click();
    await expect(
      page.getByTestId("post-where-plan-full"),
      "PW-11: a second place was accepted past the plan",
    ).toBeVisible();
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
  async function reachStep7(
    page: import("@playwright/test").Page,
    userId: string,
    category: { id: string; slug: string },
  ) {
    const listingId = await reachStep5(page, userId, category);
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();

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
    await page.getByTestId("post-next").click();
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

  test("PW-27 the mobile strip walks back to a step already done, and no further", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-360", "mobile-360 only");
    const user = await seller(page);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    await reachStep7(page, user.id, category);
    await page.getByTestId("post-who-alias").fill(`e2e_${rand()}`.slice(0, 30).toLowerCase());
    await expect(page.getByTestId("post-who-alias-ok")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-8")).toBeVisible();

    // U6-C1-R3b-1 STEP 4 — eight numbers, and the one the seller is on is named.
    const strip = page.getByTestId("post-step-strip");
    await expect(strip, "PW-27: the mobile step strip never rendered").toBeVisible();
    await expect(strip.locator('[data-testid="post-step-strip-item"]')).toHaveCount(8);
    await expect(
      strip.locator('[data-testid="post-step-strip-item"]').filter({ hasText: /\S+/ }),
      "LY-7: every mobile pill must name its step",
    ).toHaveCount(8);
    await expect(strip.locator('[data-step="8"]')).toHaveAttribute("data-state", "current");
    await expect(strip.locator('[data-step="7"]')).toHaveAttribute("data-state", "completed");
    await expect(strip.locator('[data-step="7"]')).toContainText("✓");

    // BACK to a step already answered, then forward again to review — both taps.
    await strip.getByTestId("post-step-strip-go-5").click();
    await expect(
      page.getByTestId("post-step-5"),
      "PW-27: the strip would not go back to a step already done",
    ).toBeVisible();
    await page.getByTestId("post-step-strip-go-8").click();
    await expect(
      page.getByTestId("post-step-8"),
      "PW-27: the strip would not return to review",
    ).toBeVisible();
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

    await page.getByTestId("panel-tab-account").click();
    await expect(
      (await openRailScope(page)).getByTestId("post-entry"),
      "PW-15: the posting entry is still in Account",
    ).toHaveCount(0);
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
    // DB TRUTH: the recorded step is still the last COMPLETED one (step 2).
    expect(
      (await draftsOf(user.id))[0]?.draft_step,
      "PW-16: autosave advanced the recorded step",
    ).toBe(2);

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
   * U6-C1-R2 — WHERE IT SHOWS. The item's own place is the default showing place:
   * it lists itself, it can be taken out and put back, and the plan's count is a
   * fact on screen rather than a surprise at the end.
   */
  test("PW-20 where: the default place lists itself, comes back, and the plan bounds the rest", async ({
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

    // REMOVED — and offered back, so the automatic rule is never a trap.
    await page.locator(`[data-testid="post-where-remove"][data-id="${city.id}"]`).click();
    await expect(page.getByTestId("post-where-chosen")).toHaveAttribute("data-count", "0");
    await page.getByTestId("post-where-add-back").click();
    await expect(page.getByTestId("post-where-chosen")).toHaveAttribute("data-count", "1");
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
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();

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
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();

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
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();
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
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible({ timeout: 20_000 });
    await expect
      .poll(async () => Object.keys(await attributesOf(listingId)).includes(set.charging.attrKey), {
        message: "PW-28: an unasked answer reached the draft",
        timeout: 20_000,
      })
      .toBe(false);
  });

  /**
   * D22 — THE PHOTO CAP IS THE PLAN'S. Plans are NOT per-seller yet (there is no
   * seller→plan column), so `seller_plan()` hands every seller the same row: this
   * test asserts the caption FOLLOWS THE DOCUMENT, reading the same cap from the
   * plans table it was served from.
   */
  test("PW-29 the photos caption counts against the plan's cap", async ({ page }) => {
    const user = await seller(page);
    const category = await leaf();
    await gotoReady(page, "/post");
    await chooseBySearch(page, category.slug, category.id);
    const [draft] = await draftsOf(user.id);
    objects.push({ userId: user.id, listingId: String(draft?.id ?? "") });
    await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });

    const { data, error } = await adminClient()
      .from("coverage_plans")
      .select("plan, max_photos")
      .eq("plan", "free")
      .maybeSingle();
    if (error) throw new Error(`[e2e:r3b2] reading the plan failed: ${error.message}`);
    const cap = Number(data?.max_photos ?? 0);
    expect(cap, "PW-29: the plan served no photo cap").toBeGreaterThan(0);

    const caption = page.getByTestId("post-photos-count");
    await expect(caption, "PW-29: the caption never rendered the plan's cap").toContainText(
      String(cap),
      { timeout: 20_000 },
    );
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

    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible();
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
  test("PW-25 an inherited year picker is bounded by the model chosen three levels down", async ({
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
    await reachStep3(page, user.id, child);

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

    // THE FOLD, three answers deep.
    await control(deep.brand.attrKey).selectOption(deep.brandValue);
    await control(deep.series.attrKey).selectOption(deep.seriesValue);
    await control(deep.model.attrKey).selectOption(deep.floorModel);

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

    // CASE 2 — ONE YEAR ONLY (min = max): the picker offers exactly that year.
    await control(deep.model.attrKey).selectOption(deep.pinModel);
    await expect
      .poll(offered, {
        message: "PW-25: a single-year model did not pin the picker",
        timeout: 20_000,
      })
      .toEqual([deep.pinnedYear]);
    await year.selectOption(String(deep.pinnedYear));
    await expect(
      page.locator(`[data-testid="post-attr-refusal"][data-attr="${deep.year.attrKey}"]`),
      "PW-25: the model's only year was refused",
    ).toHaveCount(0);
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
   * U6-C1-R3b-3c STEP 3 (D26) — A COLOUR IS SEEN.
   *
   * "black" is a word in a list; a colour is a colour. Every option of a colour
   * detail carries a swatch beside its own label, and a value the map says nothing
   * about renders a NEUTRAL RING rather than an invented colour (F4).
   */
  test("PW-34 a colour detail offers swatches, and an unmapped value stays neutral", async ({
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

    // A VALUE WITH NO INK IS STILL OFFERED, as a neutral ring.
    await expect(
      swatch(set.neutral),
      "PW-34: an unmapped colour value lost its swatch",
    ).toBeVisible();

    // AND THE SWATCH ANSWERS THE QUESTION the picker beside it asks.
    await swatch(set.inked).click();
    await expect(
      page.locator(`[data-testid="post-attr-control"][data-attr="${set.colour.attrKey}"]`),
      "PW-34: tapping a swatch did not answer the detail",
    ).toHaveValue(set.inked, { timeout: 20_000 });
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
  test("PW-35 a model's allowed set narrows and locks a sibling picker", async ({ page }) => {
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
    // ONE ANSWER ADMITTED: it is written, said, and the control is closed.
    await expect(fuel, "PW-35: the only allowed fuel was not written").toHaveValue(
      set.fuelElectric,
      { timeout: 20_000 },
    );
    await expect(
      fuel.locator(`option[value="${set.fuelPetrol}"]`),
      "PW-35: a fuel the model rules out was still offered",
    ).toHaveCount(0);
    await expect(fuel, "PW-35: the narrowed picker was not locked").toHaveAttribute(
      "data-locked",
      "1",
    );
    await expect(
      page.locator(`[data-testid="post-attr-set-by-model"][data-attr="${set.fuel.attrKey}"]`),
      "PW-35: a locked answer never said where it came from",
    ).toBeVisible();

    // J4 — DB truth: what the narrowing wrote is what the door recorded.
    await expect
      .poll(async () => (await attributesOf(listingId))[set.fuel.attrKey], {
        message: "PW-35: the narrowed answer never reached the draft",
        timeout: 20_000,
      })
      .toBe(set.fuelElectric);

    // A MODEL THAT RULES NOTHING OUT leaves the picker open again.
    await model.selectOption(set.openModel);
    await expect(
      fuel.locator(`option[value="${set.fuelPetrol}"]`),
      "PW-35: the picker stayed narrowed under a model with no allowed set",
    ).toHaveCount(1, { timeout: 20_000 });
    await expect(fuel, "PW-35: the picker stayed locked").toHaveAttribute("data-locked", "0");
  });

  /**
   * U6-C1-R3b-3d STEP 4 (INC-246) — A SURFACED CATEGORY IS IN THE TREE.
   *
   * Surfacing a category under a second root is a POINTER, and the wizard's tree
   * used to remember only one parent per category — so a leaf the marketplace rail
   * showed under two roots could be reached under one of them only. Both places now
   * carry it.
   */
  test("PW-36 a category surfaced under a second root appears under it in the tree", async ({
    page,
  }) => {
    const { parent, leaf: child } = await seedCategoryBranch();
    branches.push(parent.slug, child.slug);
    const second = await seedPostableCategory();
    categories.push(second.slug);
    await surfaceCategoryUnder(second.id, child.id);

    await seller(page);
    await gotoReady(page, "/post");

    // UNDER THE FIRST PARENT, as before.
    await page.locator(`[data-testid="post-browse-folder"][data-category="${parent.id}"]`).click();
    await expect(
      page.locator(`[data-testid="post-browse-leaf"][data-category="${child.id}"]`),
      "PW-36: the leaf is missing under its first parent",
    ).toBeVisible();

    // AND UNDER THE SECOND, which the second surfacing turned into a folder.
    await page.locator('[data-testid="post-browse-crumb"][data-category=""]').click();
    await page.locator(`[data-testid="post-browse-folder"][data-category="${second.id}"]`).click();
    await expect(
      page.locator(`[data-testid="post-browse-leaf"][data-category="${child.id}"]`),
      "PW-36: the surfaced leaf is missing under the root it was surfaced under",
    ).toBeVisible({ timeout: 20_000 });
  });

  /**
   * U6-C1-R3b-3b STEP 4 (PW-33) — A PLACE IS ADDED UNDER A PLACE ALREADY LISTED.
   *
   * The walk's complaint: adding a second city meant answering the market and the
   * region again in a second cascade. Each listed place now opens its OWN next
   * level — a region offers its cities, a city its sub-cities — and nothing above
   * it is re-asked. The free plan carries ONE city and plans are not per-seller,
   * so the second place is refused by the plan in words (F3: the door repeats it).
   */
  test("PW-33 a further place is added under a place already listed, and the plan refuses the second", async ({
    page,
  }) => {
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
    // The REGION alone is the item's place, so the listed row is the region and
    // its own next level (its cities) is what may be added under it.
    await expect(
      page.locator(`[data-testid="post-where-chosen-row"][data-id="${chain.region.id}"]`),
      "PW-33: the region did not list itself",
    ).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-where-plan-levels")).toBeVisible();

    const under = page.locator(
      `[data-testid="post-where-add-under"][data-id="${chain.region.id}"]`,
    );
    await expect(under, "PW-33: the listed region offered no place beneath it").toBeVisible({
      timeout: 20_000,
    });
    await under.click();
    const picker = page.locator(
      `[data-testid="post-where-under-select"][data-id="${chain.region.id}"]`,
    );
    // THE NEXT LEVEL ONLY: the region's own city, with no market or region re-asked.
    await expect(
      picker.locator(`option[value="${chain.city.id}"]`),
      "PW-33: the nested picker did not offer the region's city",
    ).toHaveCount(1, { timeout: 20_000 });
    await picker.selectOption(chain.city.id);
    await page
      .locator(`[data-testid="post-where-under-add"][data-id="${chain.region.id}"]`)
      .click();

    // THE PLAN: one place. The refusal is the plan's, said before a round trip.
    await expect(
      page.getByTestId("post-where-plan-full"),
      "PW-33: a second place was accepted past the plan",
    ).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-where-chosen")).toHaveAttribute("data-count", "1");
  });
});
