import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import { destroyListingsOf, destroyPostableCategory, leaseSeller, seedPostableCategory } from "./helpers/posting";

/**
 * Bundle 7 D2 — TWO "USED BEFORE" CHIPS (PW-171). Scratch leaves and a leased
 * seller whose earlier scratch ads are removed first (as PR-39); cleanup in an
 * afterEach that survives a body timeout (J3).
 */
test.describe("POSTING WIZARD — USED BEFORE", () => {
  const sellers: string[] = [];
  const categories: string[] = [];
  test.afterEach(async () => {
    for (const id of sellers.splice(0)) await destroyListingsOf(id);
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
  });

  async function seed(categoryId: string, sellerId: string, published: string | null) {
    const result = await adminClient().from("listings").insert({
      seller_id: sellerId,
      category_id: categoryId,
      title: "e2e recent chip",
      description: "e2e scratch ad",
      status: "draft",
      location_id: null,
      attributes: {},
      published_first_at: published,
      home_country_code: "ET",
    });
    expect(result.error).toBeNull();
  }
  async function asEdge(page: Page) {
    for (const glob of ["**/api/listings/**", "**/api/geo"]) {
      await page.route(glob, async (route) => {
        await route.continue({ headers: { ...route.request().headers(), "cf-ipcountry": "ET" } });
      });
    }
  }
  const chip = (page: Page, id: string) =>
    page.locator(`[data-testid="post-category-recent"][data-category="${id}"]`);

  test("PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none", async ({
    page,
  }) => {
    const user = await leaseSeller();
    sellers.push(user.id);
    await destroyListingsOf(user.id);
    const x = await seedPostableCategory();
    const y = await seedPostableCategory();
    categories.push(x.slug, y.slug);
    const time = "2026-10-06T12:00:00Z";
    await seed(x.id, user.id, time);
    await seed(x.id, user.id, time);
    await seed(y.id, user.id, time);
    await asEdge(page);
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/post");

    const chips = page.getByTestId("post-category-recent");
    await expect(chips).toHaveCount(2, { timeout: 20_000 });
    await expect(chips.nth(0), "PW-171: X is not first").toHaveAttribute("data-category", x.id);
    await expect(chips.nth(1)).toHaveAttribute("data-category", y.id);
    await chip(page, y.id).click();
    await expect(page.getByTestId("post-step-3"), "PW-171: Y's details did not open").toBeVisible(
      { timeout: 20_000 },
    );
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-1")).toBeVisible({ timeout: 20_000 });
    await expect(chip(page, y.id), "PW-171: Y's chip is not pressed").toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(
      page.locator(`[data-testid="post-browse-leaf"][data-category="${y.id}"]`),
      "PW-171: the list does not show Y chosen",
    ).toHaveAttribute("aria-current", "true");

    const other = await leaseSeller();
    sellers.push(other.id);
    await destroyListingsOf(other.id);
    await seed(x.id, other.id, null);
    await signInViaSession(page, other.email, other.password);
    await gotoReady(page, "/post");
    await expect(page.getByTestId("post-category-search")).toBeVisible({ timeout: 20_000 });
    // The reader has answered once the tree is drawn plus a settle; no row is drawn.
    await page.waitForTimeout(2_000);
    await expect(page.getByTestId("post-category-recent-row"), "PW-171: drafts drew chips").toHaveCount(0);
  });
});
