import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { gotoReady, waitForHydration } from "./helpers/ui";

/**
 * U1c — THE PRIMITIVES LAW (DEC-015).
 *
 * Responsiveness is designed once and tested ONCE, here, on /dev/primitives
 * with hostile fixture data. Feature screens inherit the guarantee instead of
 * re-proving it.
 */

const VIEWPORTS = [
  { name: "360", width: 360, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
] as const;

const PRIMITIVES = [
  "prim-page-card",
  "prim-stat-grid",
  "prim-chart-frame",
  "prim-form-section",
  "prim-detail-panel",
  "prim-data-table",
] as const;

/** L1 — the page itself never scrolls horizontally. */
async function expectNoPageOverflow(page: Page) {
  const measured = await page.evaluate(() => ({
    scrollWidth: (document.scrollingElement ?? document.documentElement).scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(
    measured.scrollWidth,
    `page scrolls horizontally at ${measured.innerWidth}px`,
  ).toBeLessThanOrEqual(measured.innerWidth);
}

test.describe("display primitives law (test-once responsiveness)", () => {
  for (const viewport of VIEWPORTS) {
    test(`primitives fit and adapt at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoReady(page, "/dev/primitives");
      await expect(page.getByTestId("prim-fixture")).toBeVisible({ timeout: 15000 });

      // L1
      await expectNoPageOverflow(page);

      // L2 — no primitive has an inner horizontal scroll, including the
      // DataTable's declared last-resort scroller (must stay inactive).
      for (const testid of PRIMITIVES) {
        const measured = await page.getByTestId(testid).evaluate((el) => ({
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
        }));
        expect(measured.scrollWidth, `${testid} scrolls horizontally`).toBeLessThanOrEqual(
          measured.clientWidth + 1,
        );
      }
      const table = await page.getByTestId("data-table").evaluate((el) => ({
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
      }));
      expect(table.scrollWidth, "data-table last-resort scroller is active").toBeLessThanOrEqual(
        table.clientWidth + 1,
      );

      // L3 — cards at 360, table from 768, detail columns only at 1280.
      if (viewport.width < 768) {
        await expect(page.getByTestId("data-table-cards")).toBeVisible();
        await expect(page.locator("table")).toBeHidden();
      } else {
        await expect(page.locator("table")).toBeVisible();
      }
      const joinedVisible = await page.getByTestId("data-table-col-joined").isVisible();
      expect(joinedVisible, "detail columns must only show at 1280").toBe(viewport.width >= 1280);

      // L4 — StatGrid column count: 2 / 3 / 4.
      const tileXs = await page
        .getByTestId("prim-stat-grid")
        .locator("[data-testid^='prim-stat-tile-']")
        .evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().x)));
      const columns = new Set(tileXs).size;
      const expected = viewport.width >= 1280 ? 4 : viewport.width >= 768 ? 3 : 2;
      expect(columns, "StatGrid column count").toBe(expected);

      // L5 — FormSection actions bar: sticky at 360, static from md.
      const position = await page
        .getByTestId("form-section-actions")
        .evaluate((el) => getComputedStyle(el).position);
      expect(position).toBe(viewport.width < 768 ? "sticky" : "static");

      // L6 — DetailPanel long value is fully visible (no silent truncation).
      const longValue = page
        .getByTestId("prim-detail-panel")
        .locator("dd")
        .filter({ hasText: "three hundred characters long" });
      await expect(longValue).toBeVisible();
      const clipped = await longValue.evaluate((el) => el.scrollHeight > el.clientHeight + 1);
      expect(clipped, "detail value is clipped").toBe(false);
    });
  }

  /**
   * L8 (INC-077) — the rowHref INTERACTION contract: the whole desktop row is
   * a link (click anywhere, keyboard Enter), and the 360 card still is one.
   */
  test("L8 rowHref navigates from the table row, the card and the keyboard", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await gotoReady(page, "/dev/primitives");
    await expect(page.getByTestId("prim-fixture")).toBeVisible({ timeout: 15000 });

    // Click a NON-primary cell of row 1 — the row itself navigates.
    await page.getByTestId("prim-row-row-1").locator("td").nth(5).click();
    await expect(page).toHaveURL(/\/c\/row-1$/);

    // Keyboard: focus the row and press Enter.
    await gotoReady(page, "/dev/primitives");
    await page.getByTestId("prim-row-row-2").focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/c\/row-2$/);

    // 360: the card is still a whole-card link.
    await page.setViewportSize({ width: 360, height: 800 });
    await gotoReady(page, "/dev/primitives");
    await page.getByTestId("prim-row-row-3-card").click();
    await expect(page).toHaveURL(/\/c\/row-3$/);
  });

  // L7 — every primitive renders its empty / loading / error state on demand.
  for (const state of ["empty", "loading", "error"] as const) {
    test(`primitives render their ${state} state`, async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 800 });
      await gotoReady(page, `/dev/primitives?state=${state}`);
      await waitForHydration(page);
      await expect(page.getByTestId("prim-fixture")).toBeVisible({ timeout: 15000 });

      if (state === "loading") {
        await expect(page.getByTestId("data-table-loading")).toBeVisible();
        await expect(page.getByTestId("detail-panel-loading")).toBeVisible();
        await expect(page.getByTestId("chart-frame-loading")).toBeVisible();
      } else if (state === "error") {
        await expect(page.getByTestId("data-table-error")).toBeVisible();
        await expect(page.getByTestId("detail-panel-error")).toBeVisible();
        await expect(page.getByTestId("chart-frame-error")).toBeVisible();
      } else {
        await expect(page.getByTestId("data-table-empty")).toBeVisible();
        await expect(page.getByTestId("detail-panel-empty")).toBeVisible();
        await expect(page.getByTestId("chart-frame-empty")).toBeVisible();
      }

      await expectNoPageOverflow(page);
    });
  }
});
