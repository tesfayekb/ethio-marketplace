import { join } from "node:path";
import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { purgeListingObjects, photoRowsOf } from "./helpers/photos";
import { gotoReady, openRailScope, signInViaSession } from "./helpers/ui";
import {
  destroyLocation,
  readServedTree,
  waitForServedTree,
  waitForTreeSlug,
} from "./helpers/locations";
import { adminClient, createUser } from "./helpers/users";
import {
  leaseSeller,
  seedCatchAllLeaf,
  activeCityOf,
  attributesOf,
  bearerOf,
  postRoute,
  rand,
  statusOf,
  destroyCategoryBranch,
  destroyListingsOf,
  destroyPostableCategory,
  draftsOf,
  seedCategoryBranch,
  scratchCategorySlug,
  seedSurfacedLevel,
  anyCatchAllLevel,
  surfaceCategoryUnder,
  seedSurfacedDependentSet,
  destroySpecSet,
  seedPostableCategory,
  seedSpecSet,
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

  async function seller(
    page: import("@playwright/test").Page,
    options: { homeConfirmed?: boolean; named?: boolean; alias?: boolean } = {},
  ) {
    const user = await leaseSeller(options);
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

  test("PW-52 a category with an icon name shows its glyph; one without shows none (D38)", async ({
    page,
  }) => {
    const { parent, leaf: child } = await seedCategoryBranch({ parentIcon: "Smartphone" });
    branches.push(parent.slug, child.slug);
    await seller(page);
    await gotoReady(page, "/post");

    const folder = page.locator(`[data-testid="post-browse-folder"][data-category="${parent.id}"]`);
    await expect(folder, "PW-52: the scratch folder is missing").toBeVisible({ timeout: 20_000 });
    await expect(
      folder.getByTestId("post-category-icon"),
      "PW-52: the folder's stored icon did not render",
    ).toHaveCount(1);
    const box = await folder.boundingBox();
    expect(box?.height ?? 0, "PW-52: the tile is below 44 px").toBeGreaterThanOrEqual(44);

    await folder.click();
    const leafRow = page.locator(`[data-testid="post-browse-leaf"][data-category="${child.id}"]`);
    await expect(leafRow).toBeVisible();
    await expect(
      leafRow.getByTestId("post-category-icon"),
      "PW-52: a category with no icon name rendered a glyph",
    ).toHaveCount(0);
    await expect(leafRow.locator("svg"), "PW-52: a fallback glyph took the empty slot").toHaveCount(
      0,
    );

    // D40 — keyboard focus is visible on a tile.
    await leafRow.focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(leafRow).toBeFocused();
    const ring = await leafRow.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(ring, "PW-52: no visible focus ring on a tile").not.toBe("none");
  });

  test("PW-53 Back responds after typing in Find a category (INC-277)", async ({ page }) => {
    const { parent, leaf: child } = await seedCategoryBranch();
    branches.push(parent.slug, child.slug);
    await seller(page);
    await gotoReady(page, "/post");

    const folder = page.locator(`[data-testid="post-browse-folder"][data-category="${parent.id}"]`);
    await expect(folder).toBeVisible({ timeout: 20_000 });
    const back = page.getByTestId("post-back");

    // At the roots, a typed term opens Back; Back clears the filter and the level returns.
    await page.getByTestId("post-category-search").fill(child.slug);
    await expect(page.getByTestId("post-category-hits")).toBeVisible();
    await expect(back, "PW-53: Back stayed closed while the filter held a term").toBeEnabled();
    await back.click();
    await expect(page.getByTestId("post-category-search")).toHaveValue("");
    await expect(folder, "PW-53: Back did not bring the level back").toBeVisible();
    await expect(back).toBeDisabled();

    // Inside a folder, Back first clears the filter, then climbs.
    await folder.click();
    await page.getByTestId("post-category-search").fill(child.slug);
    await back.click();
    await expect(page.getByTestId("post-category-search")).toHaveValue("");
    await expect(
      page.locator(`[data-testid="post-browse-leaf"][data-category="${child.id}"]`),
      "PW-53: Back moved an invisible cursor instead of clearing the filter",
    ).toBeVisible();
    await back.click();
    await expect(folder).toBeVisible();
    await expect(page.getByTestId("post-step-1")).toBeVisible();
  });

  /**
   * PW-62 (DEC-080) — POINTER ORDER AND THE FLAGGED HOME REACH THE WIZARD.
   * Scratch root A holds L1 (pointer 1, row 9301) and L2 (pointer 2, row 9300):
   * the ROW order disagrees with the pointer order, and the pointer must win.
   * Scratch root B holds its own L3 (pointer 5) and L1 as a GUEST at pointer 0:
   * the guest still follows the own child, and L1's home stays A.
   */
  test("PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080)", async ({
    page,
  }) => {
    const supabase = adminClient();
    const slugs = {
      a: scratchCategorySlug(),
      b: scratchCategorySlug(),
      l1: scratchCategorySlug(),
      l2: scratchCategorySlug(),
      l3: scratchCategorySlug(),
    };
    branches.push(...Object.values(slugs));
    const { data: rows, error } = await supabase
      .from("categories")
      .insert([
        {
          slug: slugs.a,
          name_en: slugs.a,
          is_active: true,
          allow_listings: false,
          is_catchall: false,
          display_order: 9100,
        },
        {
          slug: slugs.b,
          name_en: slugs.b,
          is_active: true,
          allow_listings: false,
          is_catchall: false,
          display_order: 9101,
        },
        {
          slug: slugs.l1,
          name_en: slugs.l1,
          is_active: true,
          allow_listings: true,
          is_catchall: false,
          display_order: 9301,
        },
        {
          slug: slugs.l2,
          name_en: slugs.l2,
          is_active: true,
          allow_listings: true,
          is_catchall: false,
          display_order: 9300,
        },
        {
          slug: slugs.l3,
          name_en: slugs.l3,
          is_active: true,
          allow_listings: true,
          is_catchall: false,
          display_order: 9302,
        },
      ])
      .select("id, slug");
    if (error || !rows) throw new Error(`[e2e:pw-62] seeding the rows failed: ${error?.message}`);
    const id = (slug: string) => rows.find((row) => row.slug === slug)!.id;
    // Inserted one at a time so the home (A) is L1's FIRST pointer (DEC-080 trigger).
    for (const pointer of [
      { parent_id: id(slugs.a), child_id: id(slugs.l1), display_order: 1 },
      { parent_id: id(slugs.a), child_id: id(slugs.l2), display_order: 2 },
      { parent_id: id(slugs.b), child_id: id(slugs.l3), display_order: 5 },
      { parent_id: id(slugs.b), child_id: id(slugs.l1), display_order: 0 },
    ]) {
      const { error: pointerError } = await supabase.from("category_tree_pointers").insert(pointer);
      if (pointerError) throw new Error(`[e2e:pw-62] linking failed: ${pointerError.message}`);
    }

    await seller(page);
    await gotoReady(page, "/post");
    const leafIds = async () =>
      page
        .locator('[data-testid="post-browse-leaf"]')
        .evaluateAll((els) => els.map((el) => el.getAttribute("data-category")));

    const folderA = page.locator(
      `[data-testid="post-browse-folder"][data-category="${id(slugs.a)}"]`,
    );
    await expect(folderA, "PW-62: scratch root A is missing").toBeVisible({ timeout: 20_000 });
    await folderA.click();
    await expect(
      page.locator(`[data-testid="post-browse-leaf"][data-category="${id(slugs.l2)}"]`),
    ).toBeVisible();
    const underA = await leafIds();
    expect(
      underA.indexOf(id(slugs.l1)),
      `PW-62: under A, L1 (pointer 1) must precede L2 (pointer 2): ${underA.join(",")}`,
    ).toBeLessThan(underA.indexOf(id(slugs.l2)));

    await page.locator('[data-testid="post-browse-crumb"][data-category=""]').click();
    const folderB = page.locator(
      `[data-testid="post-browse-folder"][data-category="${id(slugs.b)}"]`,
    );
    await folderB.click();
    await expect(
      page.locator(`[data-testid="post-browse-leaf"][data-category="${id(slugs.l1)}"]`),
    ).toBeVisible();
    const underB = await leafIds();
    expect(
      underB.indexOf(id(slugs.l3)),
      `PW-62: under B, the own child L3 must precede the guest L1: ${underB.join(",")}`,
    ).toBeLessThan(underB.indexOf(id(slugs.l1)));
    await page.locator('[data-testid="post-browse-crumb"][data-category=""]').click();

    await chooseBySearch(page, slugs.l1, id(slugs.l1));
    await expect(
      page.getByTestId("post-category-chip-path"),
      "PW-62: the chip path does not name the flagged home A",
    ).toContainText(slugs.a);
    await expect(page.getByTestId("post-category-chip-path")).not.toContainText(slugs.b);
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
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    await expect(page.getByTestId("post-category-chip-path")).toContainText(parent.slug);
    await expect(page.getByTestId("post-category-chip-path")).toContainText(child.slug);
    // D39 — the stand-in lives on the photos step, which follows specifications.
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
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

    // D39 — photos come AFTER specifications: the scratch leaf's empty form passes.
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    await page.getByTestId("post-next").click();
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

  test("PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15)", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    await gotoReady(page, "/post");
    await chooseBySearch(page, category.slug, category.id);
    const [draft] = await draftsOf(user.id);
    const listingId = String(draft?.id ?? "");
    expect(listingId, "PW-141: step 1 created no draft").not.toBe("");
    objects.push({ userId: user.id, listingId });
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });

    const tick = page.getByTestId("post-photos-soon");
    await expect(tick, "PW-141: no tick on a photo-less ad").toBeVisible({ timeout: 20_000 });
    await tick.check();
    const soonOf = async () => {
      const { data } = await adminClient()
        .from("listings")
        .select("photos_soon")
        .eq("id", listingId)
        .single();
      return data?.photos_soon;
    };
    await expect
      .poll(soonOf, { message: "PW-141: the flag was not saved", timeout: 20_000 })
      .toBe(true);

    // The ribbon on the picture; sized by container units (A7 smoke proof):
    // the letters are 5.5 % of the picture's width at every screen size.
    const box = page.getByTestId("post-photos-illustration-box");
    const ribbon = box.getByTestId("listing-photos-soon-ribbon");
    await expect(ribbon, "PW-141: no ribbon on the picture").toBeVisible();
    const boxWidth = (await box.boundingBox())?.width ?? 0;
    const fontPx = Number.parseFloat(
      await ribbon.evaluate((node) => getComputedStyle(node).fontSize),
    );
    expect(
      Math.abs(fontPx / boxWidth - 0.055),
      `PW-141: letters ${fontPx}px on a ${boxWidth}px picture are not container-sized`,
    ).toBeLessThan(0.005);

    // The review card (the wizard's side preview from the price page on).
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible({ timeout: 20_000 });
    await expect(
      page.getByTestId("post-review-preview").getByTestId("listing-photos-soon-ribbon"),
      "PW-141: no ribbon on the review card",
    ).toHaveCount(1);
    // The buyer's detail (turn 6 item 6).
    await page.getByTestId("post-preview-open").click();
    await expect(
      page.getByTestId("post-preview-sheet").getByTestId("listing-photos-soon-ribbon"),
      "PW-141: no ribbon on the buyer's detail",
    ).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-preview-close").click();


    // A photo is added: the tick and the ribbon go, and nothing is written.
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-photos-input").setInputFiles(FIXTURE);
    await expect(page.getByTestId("post-photo-tile")).toHaveAttribute("data-state", "stored", {
      timeout: 45_000,
    });
    await expect(tick, "PW-141: the tick stayed with a photo").toHaveCount(0);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible({ timeout: 20_000 });
    await expect(
      page.getByTestId("post-review-preview").getByTestId("listing-photos-soon-ribbon"),
      "PW-141: the ribbon stayed over a photo",
    ).toHaveCount(0);
    expect(await soonOf(), "PW-141: adding a photo rewrote the flag").toBe(true);
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

    // D39 — a fresh visit opens at the FIRST UNFINISHED step of the walk
    // (category done → specifications) and still knows the category.
    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    await expect(page.getByTestId("post-category-chip-path")).toContainText(category.slug);

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

  /**
   * D39 — SPECIFICATIONS BEFORE PHOTOS. The door's numbers do not move (1 category
   * · 2 photos · 3 specifications · 4 details …); the WALK does. (a) the seller's
   * path and its "Step N of 8" header; (b) the resume matrix over scratch drafts
   * seeded through the service client, including the old order's shape.
   */
  test("PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    const header = page.getByTestId("post-step-header");

    // (a) THE WALK — positions, not door numbers, in the header (J5: digits only).
    await gotoReady(page, "/post");
    await chooseBySearch(page, category.slug, category.id);
    const [walked] = await draftsOf(user.id);
    const walkedId = String(walked?.id ?? "");
    expect(walkedId, "PW-54: step 1 created no draft").not.toBe("");
    objects.push({ userId: user.id, listingId: walkedId });
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    await expect(header, "PW-54: specifications are not position 2").toContainText(
      /\b2\b[^0-9]*\b8\b/,
    );
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2"), "PW-54: photos did not follow").toBeVisible();
    await expect(header, "PW-54: photos are not position 3").toContainText(/\b3\b[^0-9]*\b8\b/);
    await page.getByTestId("post-photos-input").setInputFiles(FIXTURE);
    await expect(page.getByTestId("post-photo-tile")).toHaveAttribute("data-state", "stored", {
      timeout: 45_000,
    });
    await page.getByTestId("post-next").click();
    await expect(
      page.getByTestId("post-step-4"),
      "PW-54: the price page did not follow",
    ).toBeVisible();

    // (b) THE RESUME MATRIX — scratch drafts of this scratch seller only.
    const token = await bearerOf(page);
    const seedDraft = async (draftStep: number): Promise<string> => {
      const answer = await postRoute(
        page,
        "/api/listings/draft",
        { step: 1, categoryId: category.id },
        { token, country: "ET" },
      );
      expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
      const id = String(answer.payload["listing_id"] ?? "");
      expect(id, "PW-54: the draft route returned no listing").not.toBe("");
      objects.push({ userId: user.id, listingId: id });
      const { error } = await adminClient()
        .from("listings")
        .update({ draft_step: draftStep })
        .eq("id", id)
        .eq("seller_id", user.id);
      if (error) throw new Error(`[e2e:d39] seeding draft_step failed: ${error.message}`);
      return id;
    };
    const opensAt = async (id: string, testId: string, why: string) => {
      await gotoReady(page, `/post/${id}`);
      await expect(page.getByTestId(testId), why).toBeVisible({ timeout: 20_000 });
    };

    await opensAt(
      await seedDraft(1),
      "post-step-3",
      "PW-54: draft_step 1 must open specifications",
    );

    const oldShape = await seedDraft(2);
    const before = await attributesOf(oldShape);
    await opensAt(
      oldShape,
      "post-step-3",
      "PW-54: an old-order draft_step 2 must open specifications",
    );
    await expect(page.getByTestId("post-category-chip-path")).toContainText(category.slug);
    expect(await attributesOf(oldShape), "PW-54: resuming changed the saved answers").toEqual(
      before,
    );

    await opensAt(
      await seedDraft(3),
      "post-step-2",
      "PW-54: draft_step 3 without photos must open photos",
    );
    // The walked draft: specifications recorded, one registered photo.
    expect(await photoRowsOf(walkedId), "PW-54: the walked draft has no photo row").toHaveLength(1);
    await opensAt(walkedId, "post-step-4", "PW-54: draft_step 3 with a photo must open price");
    await opensAt(
      await seedDraft(4),
      "post-step-5",
      "PW-54: draft_step 4 must open the title page",
    );
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

    // D58 — a Next that cannot reach the door says so beside Next.
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-1")).toBeVisible();
    await expect(page.getByTestId("post-next-unreachable")).toHaveText(
      "Not saved yet — we keep trying.",
    );

    await page.unroute("**/api/listings/draft");
    await page.getByTestId("post-save-retry").click();

    await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
    await expect(page.getByTestId("post-next-unreachable")).toHaveCount(0);
    await expect
      .poll(async () => (await draftsOf(user.id)).map((row) => row.category_id), {
        message: "PW-8: the retry did not save the draft",
      })
      .toEqual([category.id]);
    // The choice survived the outage: the seller is still on step 1 (a retry is
    // not a forward move), and Next now carries them on with the chip in place.
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-3")).toBeVisible();
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

  /** D71 — the step-1 group wears the soft required border until a leaf is chosen. */
  test("PW-71 the category group wears the soft border until a leaf is chosen (D71)", async ({
    page,
  }) => {
    const user = await seller(page);
    const category = await leaf();
    await gotoReady(page, "/post");
    const group = page.getByTestId("post-category-group");
    await expect(group).toHaveAttribute("data-empty", "1");
    // INC-355 — required + empty wears the FULL destructive border.
    await expect(group).toHaveClass(/(^|\s)border-destructive(\s|$)/);
    await chooseBySearch(page, category.slug, category.id);
    const [draft] = await draftsOf(user.id);
    objects.push({ userId: user.id, listingId: String(draft?.id ?? "") });
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-1")).toBeVisible();
    await expect(group, "PW-71: a chosen leaf still reads empty").toHaveAttribute(
      "data-empty",
      "0",
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
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    await page.getByTestId("post-title").fill("e2e c2a listing title");
    await page.getByTestId("post-description").fill("e2e c2a listing description");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-6")).toBeVisible();

    await chooseOneCity(page);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-7")).toBeVisible();
    return listingId;
  }

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

    // INC-359 (restored from 6fea44fd, operator walk 2026-09-18): /post belongs
    // to My Listings — the panel stays active and its menu stays visible.
    // A fresh load, so the tab is derived from the route, not the click above.
    await gotoReady(page, "/post");
    await expect(page.getByTestId("post-step-1")).toBeVisible();
    await expect(
      page.getByTestId("panel-tab-my-listings"),
      "PW-15: /post fell back to another panel; My Listings must own the posting pages",
    ).toHaveAttribute("aria-selected", "true");
    await expect(
      (await openRailScope(page)).getByTestId("post-entry"),
      "PW-15: the My Listings menu is not visible while posting",
    ).toBeVisible();
    // Close the drawer before switching panels (it overlays the band on mobile).
    await page.keyboard.press("Escape");

    await page.getByTestId("panel-tab-account").click();
    await expect(
      (await openRailScope(page)).getByTestId("post-entry"),
      "PW-15: the posting entry is still in Account",
    ).toHaveCount(0);
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
    // D39 — photos follow specifications.
    await page.getByTestId("post-next").click();
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
   * INC-263 — A CURATOR'S CHANGE REACHES THE TREE WITHIN THE CACHE WINDOW.
   *
   * The wizard's tree was read once per visit and kept for the whole session, so a
   * categories import was invisible until the tab was closed: the console showed
   * baby-food under food-drink while the published wizard had neither the row nor
   * the re-parenting, an hour later. This test opens the wizard FIRST — so the old
   * tree is genuinely held — and only then creates the category, with a secondary
   * parent (INC-246), asserting it reaches BOTH roots without a new tab.
   */
  test("PW-46 a category created with a secondary parent reaches the tree inside the cache window", async ({
    page,
  }) => {
    await seller(page);
    // THE STALE SEAM: the tree is read and held before anything is created.
    await gotoReady(page, "/post");
    await expect(
      page.getByTestId("post-browse-level"),
      "PW-46: the tree never rendered before the change",
    ).toBeVisible({ timeout: 20_000 });

    const { parent, leaf: child } = await seedCategoryBranch();
    branches.push(parent.slug, child.slug);
    const second = await seedPostableCategory();
    categories.push(second.slug);
    await surfaceCategoryUnder(second.id, child.id);

    /**
     * INC-265 — ONE RETURN IS ENOUGH. The seller leaves the wizard and comes back
     * ONCE: no polling over repeated visits, because the tree read no longer holds
     * a stale answer on either side of the wire. The level list is CLIENT-fed, so
     * the rows must be on screen before anything is asserted about them (J7).
     */
    await gotoReady(page, "/");
    await gotoReady(page, "/post");
    await expect
      .poll(() => page.locator('[data-testid="post-browse-level"] [data-category]').count(), {
        message: "PW-46: the level list never rendered a category",
        timeout: 30_000,
      })
      .toBeGreaterThan(0);
    await expect(
      page.locator(`[data-testid="post-browse-folder"][data-category="${parent.id}"]`),
      "PW-46: the new branch never reached the wizard's tree on the next visit",
    ).toBeVisible({ timeout: 20_000 });
    await expect(
      page.locator(`[data-testid="post-browse-folder"][data-category="${second.id}"]`),
      "PW-46: the host root never reached the wizard's tree on the next visit",
    ).toBeVisible({ timeout: 20_000 });

    // UNDER ITS OWN PARENT.
    await page.locator(`[data-testid="post-browse-folder"][data-category="${parent.id}"]`).click();
    await expect(
      page.locator(`[data-testid="post-browse-leaf"][data-category="${child.id}"]`),
      "PW-46: the new leaf is missing under its own parent",
    ).toBeVisible({ timeout: 20_000 });

    // AND UNDER THE ROOT IT WAS SURFACED INTO, in the same window (INC-246).
    await page.locator('[data-testid="post-browse-crumb"][data-category=""]').click();
    await page.locator(`[data-testid="post-browse-folder"][data-category="${second.id}"]`).click();
    await expect(
      page.locator(`[data-testid="post-browse-leaf"][data-category="${child.id}"]`),
      "PW-46: the surfaced leaf is missing under its host root",
    ).toBeVisible({ timeout: 20_000 });
  });

  /**
   * D30 / D33 — THE ORDER OF A LEVEL: HOST'S OWN CHILDREN, THEN GUESTS, THEN "other-".
   *
   * A guest (a category surfaced by a secondary pointer) used to sort by its own
   * display order and could therefore open a level ahead of the host's own
   * children. The level now reads: primaries by pointer order, then the surfaced
   * children by pointer order, and any catch-all (`other-…`) last of all. The
   * catch-all half is asserted READ-ONLY against the real catalog, because a
   * scratch slug may never carry the `other-` prefix (J1).
   */
  test("PW-47 a level lists the host's own children first, guests next and other- last", async ({
    page,
  }) => {
    const level = await seedSurfacedLevel();
    branches.push(...level.slugs);

    await seller(page);
    await gotoReady(page, "/post");
    const host = page.locator(
      `[data-testid="post-browse-folder"][data-category="${level.host.id}"]`,
    );
    await expect(host, "PW-47: the host never reached the tree").toBeVisible({ timeout: 20_000 });
    await host.click();

    // J7 — the rows are on screen before anything is asserted about their order.
    const entries = page.locator('[data-testid="post-browse-level"] [data-category]');
    await expect
      .poll(() => entries.count(), {
        message: "PW-47: the host's level never rendered its children",
        timeout: 20_000,
      })
      .toBe(3);
    const order = await entries.evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("data-category") ?? ""),
    );
    expect(order, "PW-47: the surfaced guest did not follow the host's own children").toEqual([
      level.own[0]!.id,
      level.own[1]!.id,
      level.guest.id,
    ]);

    // THE CATCH-ALL, read-only: the last child of a real host is its `other-` row.
    const anchor = await anyCatchAllLevel();
    if (anchor === null) {
      // A project whose catalog carries no catch-all has nothing to assert here.
      return;
    }
    await page.locator('[data-testid="post-browse-crumb"][data-category=""]').click();
    const realHost = page.locator(
      `[data-testid="post-browse-folder"][data-category="${anchor.hostId}"]`,
    );
    await expect(realHost, "PW-47: the catch-all's host is not on the root level").toBeVisible({
      timeout: 20_000,
    });
    await realHost.click();
    await expect
      .poll(() => entries.count(), {
        message: "PW-47: the real host's level never rendered",
        timeout: 20_000,
      })
      .toBeGreaterThan(1);
    const realOrder = await entries.evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("data-category") ?? ""),
    );
    expect(realOrder.at(-1), "PW-47: the catch-all is not last on the level").toBe(anchor.otherId);
  });

  /**
   * INC-260 — A DEPENDENT LIST ON A SURFACED LEAF STILL FOLLOWS ITS PARENT.
   * Vehicle Hire is visible under a second branch, but its make and model controls
   * are linked directly to that leaf. The fold must therefore be resolved from the
   * leaf's own option relationships, not from the category path the seller used.
   */
  test("PW-44 a dependent list on a surfaced leaf narrows by its parent", async ({ page }) => {
    const { parent, leaf: child } = await seedCategoryBranch();
    branches.push(parent.slug, child.slug);
    const second = await seedPostableCategory();
    categories.push(second.slug);
    await surfaceCategoryUnder(second.id, child.id);
    const set = await seedSurfacedDependentSet(child.id);
    specs.push(...set.attrKeys);

    const user = await seller(page);
    /**
     * INC-265 — THE FIRST LOAD CARRIES IT. A category surfaced a moment ago is on
     * the FIRST visit, because neither the route nor the client holds an answer
     * without asking the tree's stamp. No re-entry, no polling over visits.
     */
    await gotoReady(page, "/post");
    const host = page.locator(`[data-testid="post-browse-folder"][data-category="${second.id}"]`);
    await expect(host, "PW-44: the surfaced host root was absent from the first load").toBeVisible({
      timeout: 20_000,
    });
    await host.click();

    await page.locator(`[data-testid="post-browse-leaf"][data-category="${child.id}"]`).click();
    // D39 — the surfaced leaf lands on specifications directly.
    await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    const [draft] = await draftsOf(user.id);
    const listingId = String(draft?.id ?? "");
    expect(listingId, "PW-44: choosing the surfaced leaf created no draft").not.toBe("");
    objects.push({ userId: user.id, listingId });
    // D41 — every row is open; the walk waits only for the form to settle.
    await specsSettled(page);

    const decoy = page.locator(
      `[data-testid="post-attr-control"][data-attr="${set.decoy.attrKey}"]`,
    );
    const make = page.locator(`[data-testid="post-attr-control"][data-attr="${set.make.attrKey}"]`);
    const model = page.locator(
      `[data-testid="post-attr-control"][data-attr="${set.model.attrKey}"]`,
    );
    await expect(model, "PW-44: the child picker was open before its parent").toBeDisabled();

    /**
     * THE LIVE SHAPE (INC-260 follow-up). The published leaf asks its vehicle-type
     * question FIRST and offers `other`, and one model in the library is filed
     * under a parent called `other` too. Answering that first question must NOT
     * make it the model's parent: the make covers the model list, the type
     * question covers one stray value.
     */
    await decoy.selectOption(set.decoyOther);
    await expect(
      model,
      "PW-44: a type question that shares one value took ownership of the model list",
    ).toBeDisabled({ timeout: 20_000 });

    await make.selectOption(set.makeValues.byd);
    await expect(model, "PW-44: the model picker did not open under its parent").toBeEnabled({
      timeout: 20_000,
    });
    await expect(
      model.locator(`option[value="${set.modelValues.byd}"]`),
      "PW-44: the BYD model was not offered on the surfaced leaf",
    ).toHaveCount(1);
    await expect(
      model.locator(`option[value="${set.modelValues.toyota}"]`),
      "PW-44: the other make's model was offered on the surfaced leaf",
    ).toHaveCount(0);
    await expect(
      model.locator(`option[value="${set.modelValues.orphan}"]`),
      "PW-44: the model filed under `other` leaked into the chosen make's list",
    ).toHaveCount(0);

    await model.selectOption(set.modelValues.byd);
    await expect(model, "PW-44: the BYD model did not stay selected").toHaveValue(
      set.modelValues.byd,
    );

    await make.selectOption(set.makeValues.toyota);
    await expect(model, "PW-44: a model from the previous parent survived").toHaveValue("", {
      timeout: 20_000,
    });
    await expect(model.locator(`option[value="${set.modelValues.toyota}"]`)).toHaveCount(1);
  });

  /**
   * D34 — AN "OTHER" LEAF IS A POSTING TARGET.
   *
   * The catch-all is the answer a seller reaches for when no named leaf fits, and
   * it used to be refused twice: the tree would not let it be chosen and the door
   * refused the save under it. Both dropped the exclusion in one landing, so this
   * walks the whole flow on a catch-all leaf and asserts the listing reaches
   * screening — never live (the owner's door can only ever hand it to review).
   */
  test("PW-48 a catch-all leaf can be chosen and its listing lands in review", async ({ page }) => {
    // M5 — publishing needs a named seller; the alias is typed on screen.
    const user = await seller(page, { named: true });
    const { parent, leaf: other } = await seedCatchAllLeaf();
    branches.push(parent.slug, other.slug);

    await gotoReady(page, "/post");
    // BROWSED, TOO: the catch-all sits under its host and is pressable there.
    await page.locator(`[data-testid="post-browse-folder"][data-category="${parent.id}"]`).click();
    await expect(
      page.locator(`[data-testid="post-browse-leaf"][data-category="${other.id}"]`),
      "PW-48: the catch-all leaf was not selectable on its level",
    ).toBeEnabled({ timeout: 20_000 });

    const listingId = await reachStep7(page, user.id, other);
    await page.getByTestId("post-who-alias").fill(`e2e_${rand()}`.slice(0, 30).toLowerCase());
    await expect(page.getByTestId("post-who-alias-ok")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-8")).toBeVisible();
    await page.getByTestId("post-publish").click();
    await expect(
      page.getByTestId("post-in-review"),
      "PW-48: publishing into a catch-all leaf did not land on the in-review screen",
    ).toBeVisible({ timeout: 20_000 });

    // J4 — DB truth: the door accepted the catch-all category and screened the row.
    await expect
      .poll(async () => await statusOf(listingId), {
        message: "PW-48: the catch-all listing never entered screening",
        timeout: 20_000,
      })
      .toBe("screening");
  });
});
