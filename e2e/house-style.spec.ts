import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

import en from "../src/i18n/locales/en";
import { expect, test } from "./fixtures";
import { gotoReady, settled } from "./helpers/ui";

/**
 * BUNDLE 9 A4 — THE HOUSE-STYLE FIXTURE (/dev/style), both projects.
 * HS-1: no horizontal overflow and the five new badge variants render.
 * HS-2: axe finds no serious or critical violation, light then dark.
 * HS-3: row actions — names, tooltip, menu order, Escape, sizes (B2).
 * HS-4: the pager's page run and rows per page (B3).
 * HS-5: the filters button, its count and chips (B5).
 * No account, no seeded row.
 */

const NEW_BADGES = ["success", "warning", "info", "danger", "neutral"] as const;

async function seriousOrCritical(page: Page, mode: string): Promise<void> {
  const result = await new AxeBuilder({ page }).analyze();
  const rules = result.violations
    .filter((v) => v.impact === "serious" || v.impact === "critical")
    .map((v) => `${v.impact}:${v.id}×${v.nodes.length}`);
  console.log(`[a11y] dev-style ${mode} ${test.info().project.name} ${rules.join(" ") || "clean"}`);
  expect(rules, `dev-style ${mode}`).toEqual([]);
}

test.describe("house style fixture", () => {
  test("HS-1 no horizontal overflow and the new badges render", async ({ page }) => {
    await gotoReady(page, "/dev/style");
    await expect(page.getByTestId("dev-style")).toBeVisible();
    for (const v of NEW_BADGES) await expect(page.getByTestId(`style-badge-${v}`)).toBeVisible();
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.scrollingElement!.scrollWidth,
      clientWidth: document.scrollingElement!.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });

  test("HS-2 axe is clean in light and in dark mode", async ({ page }) => {
    await gotoReady(page, "/dev/style");
    await expect(page.getByTestId("dev-style")).toBeVisible();
    const html = page.locator("html");
    const before = await html.getAttribute("data-mode");
    await seriousOrCritical(page, before ?? "light");
    await page.getByRole("button", { name: en["shell.themeToggle"] }).click();
    const after = before === "dark" ? "light" : "dark";
    await expect(html).toHaveAttribute("data-mode", after);
    await settled(page);
    await seriousOrCritical(page, after);
  });

  test("HS-3 row actions are named, sized and keyboard-safe", async ({ page }) => {
    await gotoReady(page, "/dev/style");
    const edit = page.getByRole("button", { name: "Edit — Alpha", exact: true });
    const remove = page.getByRole("button", { name: "Delete — Alpha", exact: true });
    const more = page.getByTestId("style-row-1-more");
    await expect(edit).toBeVisible();
    await expect(remove).toBeVisible();
    await expect(more).toHaveAccessibleName(`${en["prim.table.actions"]} — Alpha`);

    await edit.focus();
    await expect(page.getByRole("tooltip")).toHaveText("Edit");

    await more.click();
    const menu = page.getByTestId("style-row-1-menu");
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("menuitem").last()).toHaveAttribute(
      "data-testid",
      "style-row-1-more-erase",
    );
    await page.getByTestId("style-row-1-more-copy").click();
    await expect(page.getByTestId("style-row-last")).toHaveText("copy Alpha");
    // A choice closes the menu and gives focus back to the three-dots.
    await expect(menu).toBeHidden();
    await expect(more).toBeFocused();

    await more.click();
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(more).toBeFocused();

    const mobile = test.info().project.name === "mobile-360";
    for (const control of [edit, remove, more]) {
      const box = (await control.boundingBox())!;
      if (mobile) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      } else {
        expect(box.width).toBe(36);
        expect(box.height).toBe(36);
      }
    }
  });

  test("HS-4 the pager moves by page and by rows per page", async ({ page }) => {
    await gotoReady(page, "/dev/style");
    const range = page.getByTestId("style-pager-range");
    const pageButtons = page.locator('[data-testid^="style-pager-page-"]');
    await expect(range).toContainText("1–25");
    await expect(pageButtons).toHaveText(["1", "2", "12"]);
    await expect(page.getByTestId("style-pager-prev")).toBeDisabled();

    await page.getByTestId("style-pager-page-2").click();
    await expect(page.getByTestId("style-pager-page-2")).toHaveAttribute("aria-current", "page");
    await expect(page.getByTestId("style-pager-page-1")).not.toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(range).toContainText("26–50");

    await page.getByTestId("style-pager-size").selectOption("50");
    await expect(range).toContainText("1–50");
    await expect(pageButtons).toHaveText(["1", "2", "3", "4", "5", "6"]);
    await expect(page.getByTestId("style-pager-page-1")).toHaveAttribute("aria-current", "page");
    await expect(page.getByTestId("style-pager-prev")).toBeDisabled();
  });

  test("HS-5 the filters button counts and its chips clear", async ({ page }) => {
    await gotoReady(page, "/dev/style");
    const button = page.getByTestId("style-filters");
    const count = page.getByTestId("style-filters-count");
    const chips = page.locator(
      '[data-testid^="style-filters-chips-chip-"][data-testid$="-remove"]',
    );
    await expect(button).toBeVisible();
    await expect(count).toHaveCount(0);

    await button.click();
    await page.getByTestId("style-filters-colour").selectOption("Red");
    await page.keyboard.press("Escape");
    await expect(count).toHaveText("1");
    await expect(chips).toHaveCount(1);

    await page.getByTestId("style-filters-chips-chip-colour-remove").click();
    await expect(chips).toHaveCount(0);
    await expect(count).toHaveCount(0);

    await button.click();
    await page.getByTestId("style-filters-colour").selectOption("Blue");
    await page.getByTestId("style-filters-size").selectOption("Large");
    await page.keyboard.press("Escape");
    await expect(count).toHaveText("2");
    await expect(chips).toHaveCount(2);
    await page.getByTestId("style-filters-chips-clear").click();
    await expect(chips).toHaveCount(0);
    await expect(count).toHaveCount(0);
  });
});
