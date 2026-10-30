import { expect, test } from "./fixtures";
import { catalogueRows } from "./helpers/category-menu";
import { destroyCategoryBranch, seedScratchBranch } from "./helpers/posting";
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
    // ROWS-E1 measures the scrollbar, so `--hide-scrollbars` is dropped too (as OVS does).
    ignoreDefaultArgs: [
      "--hide-scrollbars",
      "--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4",
    ],
    args: [
      "--blink-settings=primaryHoverType=1,availableHoverTypes=1,primaryPointerType=2,availablePointerTypes=2",
    ],
  },
});

test("SMN-E3 a tap opens the page and the panel; rows fit between 32 and 48 px, panel rows 44 px", async ({
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
  expect(heights.length, "SMN-E3 the rail has no rows").toBeGreaterThan(0);
  // G38 — D247 replaces R1b-2's "at least 44 px with a coarse pointer" for menu rows: a
  // list of 16 or fewer shares its region's height, between 32 and 48 px, on every pointer.
  for (const height of heights) {
    expect(height, "SMN-E3 a rail row is 32–48 px (D247)").toBeGreaterThanOrEqual(32);
    expect(height, "SMN-E3 a rail row is 32–48 px (D247)").toBeLessThanOrEqual(48);
  }
  await rail.getByTestId("rail-category-electronics").tap();
  await expect(page).toHaveURL(/\/c\/electronics$/);
  const panel = page.getByTestId("submenu-panel");
  await expect(panel).toBeVisible();
  const panelRows = await panel
    .locator("[data-submenu-row]")
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));
  expect(panelRows.length, "SMN-E3 the panel has no rows").toBeGreaterThan(0);
  for (const height of panelRows)
    expect(height, "SMN-E3 a panel row is at least 44 px").toBeGreaterThanOrEqual(44);
  await page.locator("main").tap({ position: { x: 4, y: 4 } });
  await expect(panel).toHaveCount(0);
});

/**
 * ROWS-E1 (D247, INC-1009; Foundations turn R1c) — a touch phone at 360×640: the menu's
 * main list and a subcategory list of the real tree fit with no scroll (16 items or
 * fewer), every row at least 32 px. Measured before the rule: 688 px of rows in 528.
 */
test.describe("D247 a touch phone's lists", () => {
  const SEEDED = 12;
  let branch: { root: string; kids: string[] } | null = null;
  test.afterEach(async () => {
    if (branch) await destroyCategoryBranch([...branch.kids, branch.root]);
    branch = null;
  });

  test("ROWS-E1 a touch phone's menu lists follow the 16-item rule at 360×640", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "one run of the touch context");
    branch = await seedScratchBranch(SEEDED, "rows-e1");
    await page.setViewportSize({ width: 360, height: 640 });
    await gotoReady(page, "/");
    expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);
    const menu = await openRailScope(page);
    await expect(menu.getByTestId("rail-category-skeleton")).toHaveCount(0);
    const region = menu.getByTestId("rail-scroll");
    const list = region.locator("nav > ul.menu-fit");
    const rows = list.locator(":scope > li:not([aria-hidden])");
    const scroll = () =>
      region.evaluate((el) => ({
        overflow: el.scrollHeight - el.clientHeight,
        bar: (el as HTMLElement).offsetWidth - el.clientWidth,
      }));
    // The rule for the count this backend holds at run time (G27, G28: lanes add roots).
    const judge = async (label: string, expected?: number) => {
      if (expected !== undefined) await expect(rows).toHaveCount(expected);
      const count = await rows.count();
      if (count > 16) {
        expect(await list.getAttribute("data-many"), `${label}: data-many`).toBe("");
        await expect.poll(async () => (await scroll()).overflow).toBeGreaterThan(0);
        expect((await scroll()).bar, `${label}: the scrollbar takes width`).toBeGreaterThan(0);
        return count;
      }
      expect(await list.getAttribute("data-many"), `${label}: not data-many`).toBeNull();
      await expect
        .poll(async () => (await scroll()).overflow, { message: `${label}: the list scrolls` })
        .toBeLessThanOrEqual(0);
      for (const height of await rows.evaluateAll((els) =>
        els.map((el) => el.getBoundingClientRect().height),
      ))
        expect(height, `${label}: a row is at least 32 px`).toBeGreaterThanOrEqual(31.5);
      return count;
    };
    await judge("ROWS-E1 the main list");
    // The 16-or-fewer branch on a list this test seeded itself.
    await menu.getByTestId(`rail-category-${branch.root}`).tap();
    await expect(menu.getByTestId("rail-menu-back")).toBeVisible();
    expect(await judge("ROWS-E1 the seeded list", SEEDED)).toBe(SEEDED);
  });
});
