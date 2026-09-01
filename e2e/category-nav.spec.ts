import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { gotoReady, openRailScope } from "./helpers/ui";

/**
 * U0l (INC-073) — CATEGORY SELECTION IS NAVIGATION.
 *
 * A category is a URL (/c/<slug>), never private client state: the rail
 * highlight, the breadcrumb chain and the feed all read the SAME address, so
 * a category page is shareable, reloadable and back-button correct.
 */
test.describe("category selection navigates", () => {
  /** First real category row in the rail (row 0 is "All categories"). */
  async function firstCategory(page: import("@playwright/test").Page) {
    const scope = await openRailScope(page);
    const rows = scope.locator("nav li > a[data-testid^='rail-category-']");
    // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: locator is already scoped to a single viewport twin (or a non-twin surface); grandfathered pending the twin-helper sweep
    await expect(rows.first()).toBeVisible();
    const count = await rows.count();
    if (count < 2) return null;
    const row = rows.nth(1);
    const label = (await row.textContent())!.trim();
    const href = (await row.getAttribute("href"))!;
    return { scope, row, label, href };
  }

  test("C-1: clicking a category changes the URL and survives reload", async ({ page }) => {
    await gotoReady(page, "/");
    const first = await firstCategory(page);
    test.skip(first === null, "needs at least one seeded category");

    await first!.row.click();
    await expect(page).toHaveURL(new RegExp(`${first!.href}$`));
    await expect(page.getByTestId("breadcrumb-category")).toHaveText(first!.label);

    // Reload: the same page comes back from the URL alone.
    await page.reload();
    await expect(page.getByTestId("breadcrumb-category")).toHaveText(first!.label);
  });

  test("C-2: the rail highlight follows the URL", async ({ page }) => {
    await gotoReady(page, "/");
    const first = await firstCategory(page);
    test.skip(first === null, "needs at least one seeded category");

    await gotoReady(page, first!.href);
    const scope = await openRailScope(page);
    await expect(scope.locator("a[aria-current='page']")).toHaveText(first!.label);
  });

  test("C-3: Home clears the category", async ({ page }) => {
    await gotoReady(page, "/");
    const first = await firstCategory(page);
    test.skip(first === null, "needs at least one seeded category");

    await gotoReady(page, first!.href);
    await page.getByTestId("breadcrumb-home").click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId("breadcrumb-category")).toHaveCount(0);
    const scope = await openRailScope(page);
    await expect(scope.getByTestId("rail-category-all")).toHaveAttribute("aria-current", "page");
  });

  test("C-4: /auth is a page — Home > Sign in, no category selected", async ({ page }) => {
    await gotoReady(page, "/auth");
    await expect(page.getByTestId("breadcrumb-home")).toBeVisible();
    await expect(page.getByTestId("breadcrumb-auth")).toHaveText(en["auth.signIn"]);
    await expect(page.getByTestId("breadcrumb-category")).toHaveCount(0);
  });
});
