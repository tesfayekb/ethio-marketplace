import { expect, test } from "./fixtures";
import { catalogueRows } from "./helpers/category-menu";
import { gotoReady, openRailScope } from "./helpers/ui";

/**
 * SMN-E1…SMN-E3 (DEC-288, turn R1b) — the marketplace tree on the sub-menu mechanism,
 * from 768 px. Catalogue rows are read only (J3); the three-level shape is SC-2's
 * (shell.spec.ts), on its scratch branch.
 */
test.describe("DEC-288 side panel, fine pointer", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "the side panel opens from 768 px");
  });

  test("SMN-E1 rows spread between 36 and 48 px; a hover opens the panel, a click opens the page", async ({
    page,
  }) => {
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
  }) => {
    await gotoReady(page, "/");
    const rail = await openRailScope(page);
    const opener = rail.getByTestId("rail-category-electronics");
    await opener.focus();
    await page.keyboard.press("ArrowRight");
    const panel = page.getByTestId("submenu-panel");
    await expect(panel).toBeVisible();
    await expect(panel.locator("[data-submenu-row]").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await expect(opener).toBeFocused();
  });
});

test.describe("DEC-288 side panel, coarse pointer (touch at 1024 px)", () => {
  test.use({
    hasTouch: true,
    viewport: { width: 1024, height: 768 },
    launchOptions: {
      ...(process.env["E2E_CHROMIUM_PATH"]
        ? { executablePath: process.env["E2E_CHROMIUM_PATH"] }
        : {}),
      // Headless Chromium claims a fine pointer with hover (chromium.js, the blink-settings
      // line); this context claims a touch screen's coarse pointer without hover.
      ignoreDefaultArgs: [
        "--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4",
      ],
      args: [
        "--blink-settings=primaryHoverType=1,availableHoverTypes=1,primaryPointerType=2,availablePointerTypes=2",
      ],
    },
  });

  test("SMN-E3 a tap opens the page and the panel; every row is at least 44 px", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "one run of the touch context");
    await gotoReady(page, "/");
    expect(
      await page.evaluate(() => matchMedia("(pointer: coarse)").matches),
      "SMN-E3 the context claims no coarse pointer; the test proves nothing",
    ).toBe(true);
    const rail = await openRailScope(page);
    await expect(rail.getByTestId("rail-category-skeleton")).toHaveCount(0);
    const heights = await catalogueRows(rail, "nav li > ").evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().height),
    );
    for (const height of heights)
      expect(height, "SMN-E3 a coarse-pointer row is at least 44 px").toBeGreaterThanOrEqual(44);
    await rail.getByTestId("rail-category-electronics").tap();
    await expect(page).toHaveURL(/\/c\/electronics$/);
    const panel = page.getByTestId("submenu-panel");
    await expect(panel).toBeVisible();
    for (const height of await panel
      .locator("[data-submenu-row]")
      .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height)))
      expect(height, "SMN-E3 a panel row is at least 44 px").toBeGreaterThanOrEqual(44);
    await page.locator("main").tap({ position: { x: 600, y: 400 } });
    await expect(panel).toHaveCount(0);
  });
});
