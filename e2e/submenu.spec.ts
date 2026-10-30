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
