import { expect, test } from "./fixtures";
import { catalogueRows } from "./helpers/category-menu";
import { gotoReady, openRailScope } from "./helpers/ui";

/**
 * SMN-E1, SMN-E2 (SMN-E3, the touch context, is submenu-touch.spec.ts) (DEC-288, turn R1b) — the marketplace tree on the sub-menu mechanism,
 * from 768 px. Catalogue rows are read only (J3); the three-level shape is SC-2's
 * (shell.spec.ts), on its scratch branch.
 */
test.describe("DEC-288 side panel, fine pointer", () => {
  test("SMN-E1 rows spread between 36 and 48 px; a hover opens the panel, a click opens the page", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "the side panel opens from 768 px");
    await gotoReady(page, "/");
    const rail = await openRailScope(page);
    await expect(rail.getByTestId("rail-category-skeleton")).toHaveCount(0);
    const heights = await catalogueRows(rail, "nav li > ").evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().height),
    );
    expect(heights.length).toBeGreaterThan(0);
    for (const height of heights) {
      expect(height, "SMN-E1 a fine-pointer row is 36–48 px").toBeGreaterThanOrEqual(36);
      expect(height, "SMN-E1 a fine-pointer row is 36–48 px").toBeLessThanOrEqual(48);
    }
    const opener = rail.getByTestId("rail-category-electronics");
    await opener.hover();
    const panel = page.getByTestId("submenu-panel");
    await expect(panel).toBeVisible();
    await expect(panel).toHaveAttribute("id", (await opener.getAttribute("aria-controls")) ?? "");
    await page.mouse.move(900, 700);
    await expect(panel).toHaveCount(0);
    await opener.click();
    await expect(page).toHaveURL(/\/c\/electronics$/);
    await expect(page.getByTestId("submenu-panel")).toHaveCount(0);
  });

  test("SMN-E2 the keys: the arrow enters the panel, Escape returns to the opener", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "the side panel opens from 768 px");
    await gotoReady(page, "/");
    const rail = await openRailScope(page);
    const opener = rail.getByTestId("rail-category-electronics");
    await opener.focus();
    await page.keyboard.press("ArrowRight");
    const panel = page.getByTestId("submenu-panel");
    await expect(panel).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            document.activeElement ===
            document.querySelector('[data-testid="submenu-panel"] [data-submenu-row]'),
        ),
      )
      .toBe(true);
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await expect(opener).toBeFocused();
  });
});

/**
 * SMN-E4 (D244, INC-1008; Foundations turn R1c) — every panel is wholly on screen when it
 * opens and after the window is resized. The tallest second level of the real tree is
 * opened at 600 px (cause 2: it was clamped and scrolled inside itself, its last rows
 * clipped) and a panel opened at 900 px is followed down to 600 px (cause 1: it was
 * placed once and never again). Catalogue rows are read only (J3).
 */
test.describe("D244 every panel on screen", () => {
  async function tallestRoot(page: import("@playwright/test").Page) {
    const rail = await openRailScope(page);
    const openers = rail.locator("[data-submenu]");
    const count = await openers.count();
    let best = { index: -1, rows: 0 };
    for (let index = 0; index < count; index += 1) {
      await openers.nth(index).hover();
      const panel = page.getByTestId("submenu-panel").first();
      await expect(panel).toBeVisible();
      const rows = await panel.locator("[data-submenu-row]").count();
      if (rows > best.rows) best = { index, rows };
    }
    await page.mouse.move(1000, 20);
    await expect(page.getByTestId("submenu-panel")).toHaveCount(0);
    return { opener: openers.nth(best.index), rows: best.rows };
  }

  async function everyRowOnScreen(page: import("@playwright/test").Page, label: string) {
    const panel = page.getByTestId("submenu-panel").first();
    await expect(panel).toBeVisible();
    const rows = panel.locator("[data-submenu-row]");
    const count = await rows.count();
    expect(count, `${label}: the panel has rows`).toBeGreaterThan(0);
    const fit = await panel.evaluate((el) => el.scrollHeight <= el.clientHeight + 1);
    expect(fit, `${label}: the panel does not scroll inside itself`).toBe(true);
    for (let index = 0; index < count; index += 1) {
      await expect(rows.nth(index), `${label}: row ${index + 1} of ${count}`).toBeInViewport({
        ratio: 1,
      });
    }
  }

  for (const width of [1280, 1024]) {
    test(`SMN-E4 the tallest panel fits at ${width}×600 and follows a resize`, async ({
      page,
    }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-1280", "the side panel opens from 768 px");
      await page.setViewportSize({ width, height: 600 });
      await gotoReady(page, "/");
      const tall = await tallestRoot(page);
      expect(tall.rows, "SMN-E4 the tree has a panel of more than ten rows").toBeGreaterThan(10);
      await tall.opener.hover();
      await everyRowOnScreen(page, `SMN-E4 ${width}×600`);
      await page.mouse.move(1000, 20);
      await expect(page.getByTestId("submenu-panel")).toHaveCount(0);

      await page.setViewportSize({ width, height: 900 });
      await tall.opener.hover();
      await expect(page.getByTestId("submenu-panel")).toBeVisible();
      // The pointer stays on the opener while the window shrinks.
      await page.setViewportSize({ width, height: 600 });
      await everyRowOnScreen(page, `SMN-E4 ${width} resized 900→600`);
    });
  }
});
