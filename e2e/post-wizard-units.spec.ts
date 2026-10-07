import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { purgeListingObjects } from "./helpers/photos";
import { gotoReady, signInViaSession, switchLanguage } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import {
  leaseSeller,
  destroyListingsOf,
  destroyPostableCategory,
  destroySpecSet,
  draftsOf,
  seedPostableCategory,
  seedSpecSet,
  seedUnitFactSet,
  stopPageBeforePurge,
} from "./helpers/posting";

/**
 * BUNDLE 5 C7 — THE AMHARIC UNIT ON THE SPECIFICATIONS STEP (PW-161).
 *
 * A number definition carries `unit` and `unit_am`; the wizard prints the
 * English unit under English and the Amharic one under Amharic. Scratch leaf
 * and scratch definitions only (J3); cleanup in an afterEach (INC-218).
 */
test.describe("POSTING WIZARD — UNITS", () => {
  const categories: string[] = [];
  const sellers: string[] = [];
  const specs: string[] = [];
  const objects: { userId: string; listingId: string }[] = [];

  test.afterEach(async ({ page }) => {
    await stopPageBeforePurge(page);
    for (const ref of objects.splice(0)) await purgeListingObjects(ref.userId, ref.listingId);
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    await destroySpecSet(specs.splice(0));
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
  });

  async function asEdge(page: Page) {
    for (const glob of ["**/api/listings/**", "**/api/geo"]) {
      await page.route(glob, async (route) => {
        await route.continue({ headers: { ...route.request().headers(), "cf-ipcountry": "ET" } });
      });
    }
  }

  async function reachStep3(page: Page, userId: string, category: { id: string; slug: string }) {
    await gotoReady(page, "/post");
    await page.getByTestId("post-category-search").fill(category.slug);
    const hit = page.locator(`[data-testid="post-category-hit"][data-category="${category.id}"]`);
    await expect(hit).toBeVisible();
    await hit.click();
    await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    const [draft] = await draftsOf(userId);
    const listingId = String(draft?.id ?? "");
    expect(listingId, "step 1 created no draft").not.toBe("");
    objects.push({ userId, listingId });
    await expect(page.getByTestId("post-specs")).toBeVisible({ timeout: 20_000 });
  }

  test("PW-161 a number's unit reads in English, and in Amharic under Amharic", async ({
    page,
  }) => {
    const user = await leaseSeller();
    sellers.push(user.id);
    await asEdge(page);
    await signInViaSession(page, user.email, user.password);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const spec = await seedSpecSet(category.id);
    specs.push(
      spec.text.attrKey,
      spec.number.attrKey,
      spec.bool.attrKey,
      spec.select.attrKey,
      spec.multi.attrKey,
    );
    const { error } = await adminClient()
      .from("attributes")
      .update({ unit: "people", unit_am: "ሰዎች" })
      .eq("id", spec.number.id);
    if (error) throw new Error(`[e2e:pw161] seeding the units failed: ${error.message}`);

    const unit = page.locator(
      `[data-testid="post-spec"][data-attr="${spec.number.attrKey}"] [data-testid="post-attr-unit"]`,
    );

    await reachStep3(page, user.id, category);
    await expect(unit, "PW-161: English did not print the English unit").toHaveText("people");

    // The same screen, switched in place: catalog text redraws under the new language.
    await switchLanguage(page, "am");
    await expect(unit, "PW-161: Amharic did not print the Amharic unit").toHaveText("ሰዎች");
  });

  /**
   * PW-175 — Bundle 7 F3 (promised 2026-10-01): UNIT OF SALE IS ASKED BEFORE
   * QUANTITY. The quantity's link is ordered FIRST on purpose, so the price page
   * must still draw the unit of sale above it. Positive control: both rows'
   * positions are read, and a missing row fails the test.
   */
  test("PW-175 the price page asks the unit of sale above the quantity", async ({ page }) => {
    const user = await leaseSeller();
    sellers.push(user.id);
    await asEdge(page);
    await signInViaSession(page, user.email, user.password);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const set = await seedUnitFactSet(category.id);
    specs.push(...set.attrKeys);
    const { data: quantityRow, error: readError } = await adminClient()
      .from("attributes")
      .select("id")
      .eq("attr_key", set.quantityKey)
      .single();
    if (readError) throw new Error(`[e2e:pw175] reading the quantity failed: ${readError.message}`);
    const reordered = await adminClient()
      .from("category_attribute_links")
      .update({ display_order: 99 })
      .eq("category_id", category.id)
      .eq("attribute_id", quantityRow.id);
    if (reordered.error) {
      throw new Error(`[e2e:pw175] ordering the quantity first failed: ${reordered.error.message}`);
    }

    const control = (attrKey: string) =>
      page.locator(`[data-testid="post-attr-control"][data-attr="${attrKey}"]`);
    await reachStep3(page, user.id, category);
    const type = control(set.typeKey);
    await expect(type.locator(`option[value="${set.typeValue}"]`)).toHaveCount(1, {
      timeout: 20_000,
    });
    await type.selectOption(set.typeValue);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible({ timeout: 20_000 });

    const unit = control(set.basisKey);
    const quantity = control(set.quantityKey);
    await expect(unit, "PW-175: the unit of sale is not drawn").toBeVisible({ timeout: 20_000 });
    await expect(quantity, "PW-175: the quantity is not drawn").toBeVisible({ timeout: 20_000 });
    const unitBox = await unit.boundingBox();
    const quantityBox = await quantity.boundingBox();
    if (unitBox === null) throw new Error("PW-175: the unit of sale has no position");
    if (quantityBox === null) throw new Error("PW-175: the quantity has no position");
    expect(unitBox.y, "PW-175: the unit of sale is not above the quantity").toBeLessThan(
      quantityBox.y,
    );
  });
});
