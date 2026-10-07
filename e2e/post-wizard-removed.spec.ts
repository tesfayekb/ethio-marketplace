import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import { destroyLocation, seedScratchChain } from "./helpers/locations";
import {
  attributesOf,
  bearerOf,
  completeDraft,
  destroyListingsOf,
  destroyPostableCategory,
  destroySpecSet,
  leaseSeller,
  postRoute,
  seedPostableCategory,
  seedSpecSet,
  stopPageBeforePurge,
} from "./helpers/posting";

/**
 * Bundle 7 D5 (INC-479) — A QUESTION OR AN ANSWER REMOVED FROM THE CATALOGUE
 * NEVER BLOCKS A LATER SAVE. Scratch leaf and definitions only, leased sellers,
 * DB truth through the service client; cleanup in an afterEach (J3).
 */
test.describe("POSTING WIZARD — removed catalogue answers", () => {
  const sellers: string[] = [];
  const categories: string[] = [];
  const definitions: string[] = [];
  const places: string[] = [];

  test.afterEach(async ({ page }) => {
    await stopPageBeforePurge(page);
    const leased = sellers.splice(0);
    for (const id of leased) await destroyListingsOf(id);
    for (const id of leased) {
      const gone = await adminClient().from("seller_places").delete().eq("user_id", id);
      if (gone.error) throw new Error(`seller_places cleanup ${id}: ${gone.error.message}`);
    }
    await destroySpecSet(definitions.splice(0));
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

  /** A leased seller's step-7 draft on a scratch leaf holding `attributes`. */
  async function seededDraft(
    page: Page,
    pick: (specs: Awaited<ReturnType<typeof seedSpecSet>>) => Record<string, unknown>,
  ) {
    const user = await leaseSeller({ named: true });
    sellers.push(user.id);
    await destroyListingsOf(user.id);
    const cat = await seedPostableCategory();
    categories.push(cat.slug);
    const specs = await seedSpecSet(cat.id);
    definitions.push(
      specs.text.attrKey,
      specs.number.attrKey,
      specs.bool.attrKey,
      specs.select.attrKey,
      specs.multi.attrKey,
    );
    const chain = await seedScratchChain("ET");
    places.push(chain.region.slug);
    await asEdge(page);
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    const token = await bearerOf(page);
    const answer = await postRoute(
      page,
      "/api/listings/draft",
      {
        ...completeDraft({
          categoryId: cat.id,
          cityId: chain.city.id,
          title: "e2e removed answers",
          step: 7,
        }),
        attributes: pick(specs),
      },
      { token, country: "ET" },
    );
    expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
    expect(answer.payload["ok"], JSON.stringify(answer.payload)).toBe(true);
    return { id: String(answer.payload["listing_id"]), cat, specs };
  }

  async function typeAndSave(page: Page, value: string, label: string) {
    await page.getByTestId("post-title").fill(value);
    await expect(
      page.getByTestId("post-save-state"),
      `${label}: the edit did not end "Saved"`,
    ).toHaveAttribute("data-state", "saved", { timeout: 20_000 });
  }

  test("PW-176 removed question, option and list entry never block the draft's later saves", async ({
    page,
  }) => {
    const { id, cat, specs } = await seededDraft(page, (s) => ({
      [s.text.attrKey]: "held text",
      [s.select.attrKey]: s.optionValues[0],
      [s.multi.attrKey]: [s.optionValues[0], s.optionValues[1]],
    }));
    const kept = specs.optionValues[1];
    const unlinked = await adminClient()
      .from("category_attribute_links")
      .delete()
      .eq("category_id", cat.id)
      .eq("attribute_id", specs.text.id);
    expect(unlinked.error).toBeNull();
    for (const attr of [specs.select, specs.multi]) {
      const narrowed = await adminClient()
        .from("attributes")
        .update({ options: [{ value: kept, label_en: "Kept", active: true }] })
        .eq("id", attr.id);
      expect(narrowed.error).toBeNull();
    }

    await gotoReady(page, `/post/${id}`);
    await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
    const summary = page.getByTestId("post-review-summary");
    for (const key of [specs.text.attrKey, specs.select.attrKey, specs.multi.attrKey]) {
      await expect(summary, `PW-176: Review printed the raw key ${key}`).not.toContainText(key);
    }
    await page.locator('[data-testid="post-review-edit"][data-step="5"]').click();
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    await typeAndSave(page, "e2e removed answers one", "PW-176 first edit");
    await typeAndSave(page, "e2e removed answers two", "PW-176 second edit");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-8"), "PW-176: Next did not pass").toBeVisible({
      timeout: 20_000,
    });
    await expect(page.getByTestId("post-refusal")).toHaveCount(0);
    await expect(page.getByTestId("post-attr-refusal")).toHaveCount(0);
    await expect
      .poll(async () => JSON.stringify(await attributesOf(id)), {
        message: "PW-176: the stored row still held a removed answer",
        timeout: 20_000,
      })
      .toBe(JSON.stringify({ [specs.multi.attrKey]: [kept] }));
  });

  test("PW-177 a question removed while the form is open never blocks the next edits", async ({
    page,
  }) => {
    const { id, cat, specs } = await seededDraft(page, (s) => ({ [s.text.attrKey]: "seeded" }));
    await gotoReady(page, `/post/${id}`);
    await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
    await page.locator('[data-testid="post-review-edit"][data-step="3"]').click();
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    await page.locator(`#post-attr-${specs.text.attrKey}`).fill("typed while open");
    await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved", {
      timeout: 20_000,
    });
    await expect
      .poll(async () => (await attributesOf(id))[specs.text.attrKey], { timeout: 20_000 })
      .toBe("typed while open");
    const unlinked = await adminClient()
      .from("category_attribute_links")
      .delete()
      .eq("category_id", cat.id)
      .eq("attribute_id", specs.text.id);
    expect(unlinked.error).toBeNull();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
    await page.locator('[data-testid="post-review-edit"][data-step="5"]').click();
    await expect(page.getByTestId("post-step-5")).toBeVisible();
    await typeAndSave(page, "e2e open removal one", "PW-177 first edit");
    await typeAndSave(page, "e2e open removal two", "PW-177 second edit");
    await expect(page.getByTestId("post-refusal")).toHaveCount(0);
    await expect
      .poll(async () => Object.keys(await attributesOf(id)), { timeout: 20_000 })
      .not.toContain(specs.text.attrKey);
  });
});
