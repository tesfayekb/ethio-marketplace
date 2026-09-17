import { join } from "node:path";

import { expect, test } from "./fixtures";

import { purgeListingObjects, photoRowsOf } from "./helpers/photos";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { createUser } from "./helpers/users";
import {
  attributesOf,
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

  test.afterEach(async () => {
    // J3 — an afterEach survives a body timeout; a `finally` in the body does not.
    for (const ref of objects.splice(0)) await purgeListingObjects(ref.userId, ref.listingId);
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    // Links first: a category cannot be deleted while a definition link points at it.
    await destroySpecSet(specs.splice(0));
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
    const branchSlugs = branches.splice(0);
    if (branchSlugs.length > 0) await destroyCategoryBranch(branchSlugs);
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
});
