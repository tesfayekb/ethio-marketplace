import { expect, test } from "@playwright/test";

import { en } from "../src/i18n/locales/en";

/**
 * Shell smoke — the design foundation.
 * Assertions read from the en catalog; no literals (law D1).
 */
test.describe("app shell", () => {
  test("mounts with header, rail slot and footer, logged out", async ({ page }, testInfo) => {
    await page.goto("/");

    // Header: the brand link is present.
    await expect(page.getByRole("link", { name: en["app.name"], exact: true })).toBeVisible();

    // Footer: a known column heading.
    await expect(
      page.getByRole("heading", { name: en["footer.sectionLegal"], exact: true }),
    ).toBeVisible();

    // Logged out: a Sign in control, and no panel beyond Marketplace.
    await expect(page.getByRole("link", { name: en["auth.signIn"], exact: true })).toBeVisible();
    await expect(page.getByText(en["panel.myListings"], { exact: true })).toHaveCount(0);
    await expect(page.getByText(en["panel.account"], { exact: true })).toHaveCount(0);
    await expect(page.getByText(en["panel.admin"], { exact: true })).toHaveCount(0);

    if (testInfo.project.name === "desktop-1280") {
      // Desktop: the rail is persistent and the switcher shows Marketplace.
      await expect(page.getByTestId("app-rail")).toBeVisible();
      await expect(page.getByRole("button", { name: en["panel.marketplace"] })).toBeVisible();
    }
  });

  test("feed renders its empty state", async ({ page }) => {
    await page.goto("/");
    const empty = page.getByTestId("feed-empty");
    await expect(empty).toBeVisible();
    await expect(empty.getByText(en["feed.emptyTitle"], { exact: true })).toBeVisible();
    await expect(empty.getByText(en["feed.emptyBody"], { exact: true })).toBeVisible();
  });

  test("language toggle renders Amharic (Ge'ez path)", async ({ page }) => {
    await page.goto("/");
    // The switcher lives in the footer at every breakpoint.
    await page.getByRole("button", { name: en["language.amharic"] }).first().click();

    const amharicHeading = page.getByRole("heading", { level: 1 });
    await expect(amharicHeading).toBeVisible();
    const text = (await amharicHeading.textContent())?.trim() ?? "";
    expect(text.length).toBeGreaterThan(0);
    // Ge'ez block U+1200–U+137F must actually be rendered.
    expect(/[\u1200-\u137F]/.test(text)).toBe(true);
    await expect(page.locator("html")).toHaveAttribute("lang", "am");
  });
});

test.describe("mobile chrome", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) > 400, "mobile-360 only");

  test("rail is a drawer behind the hamburger", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("app-rail")).toBeHidden();

    await page.getByRole("button", { name: en["shell.openMenu"] }).click();

    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();
    await expect(drawer.getByText(en["shell.allCategories"], { exact: true })).toBeVisible();
    await expect(drawer.getByText(en["panel.marketplace"], { exact: true })).toBeVisible();
  });
});
