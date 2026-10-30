import { expect, test } from "./fixtures";
import { catalogueRows } from "./helpers/category-menu";
import { gotoReady, openRailScope } from "./helpers/ui";

/**
 * SMN-E3 (DEC-288 items 7–8, turn R1b) — touch at 1024 px: a context with hasTouch and a
 * coarse pointer without hover. Its own file because a launch option forces a new worker.
 */
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
  await page.locator("main").tap({ position: { x: 4, y: 4 } });
  await expect(panel).toHaveCount(0);
});
