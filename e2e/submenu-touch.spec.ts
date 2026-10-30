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

test("SMN-E3 a tap opens the page and the panel; rows fit between 32 and 48 px, panel rows the rail's", async ({
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
  // G38 — D248 replaces "a panel row is at least 44 px": a panel row is the rail's row (its
  // height at that moment), shrinking toward 32 px only when the panel outgrows the menu.
  const railRow = await rail
    .getByTestId("rail-category-electronics")
    .evaluate((el) => (el.closest("li") ?? el).getBoundingClientRect().height);
  for (const height of panelRows) {
    expect(height, "SMN-E3 a panel row is at most the rail's (D248)").toBeLessThanOrEqual(
      railRow + 1,
    );
    expect(height, "SMN-E3 a panel row keeps the 32 px floor (D248)").toBeGreaterThanOrEqual(31.5);
  }
  await page.locator("main").tap({ position: { x: 4, y: 4 } });
  await expect(panel).toHaveCount(0);
});

/**
 * ROWS-E1 (D247, INC-1009; Foundations turn R1c) — a touch phone at 360×640: the menu's
 * main list and a subcategory list of the real tree fit with no scroll (16 items or
 * fewer), every row 32–40 px (INC-1010: phones stay compact). Measured before the rule:
 * 688 px of rows in 528.
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
      )) {
        expect(height, `${label}: a phone row is 32–40 px`).toBeGreaterThanOrEqual(31.5);
        expect(height, `${label}: a phone row is 32–40 px (INC-1010)`).toBeLessThanOrEqual(40.5);
      }
      return count;
    };
    await judge("ROWS-E1 the main list");
    // The 16-or-fewer branch on a list this test seeded itself: the back row and the opened
    // root's row head its 12 subcategories, 14 rows.
    await menu.getByTestId(`rail-category-${branch.root}`).tap();
    await expect(menu.getByTestId("rail-menu-back")).toBeVisible();
    expect(await judge("ROWS-E1 the seeded list", SEEDED + 2)).toBe(SEEDED + 2);
  });
});

/**
 * ROWS-E5 (INC-1010; Foundations turn R1c-fix) — at 360×740 a seeded list of 15 rows (the
 * back row, the opened root and 13 subcategories) fills the menu's height with rows of at
 * most 40 px: the share of the height, capped at 40 (DEC-288). Removed in afterEach (J3).
 */
test.describe("INC-1010 phone rows stay compact", () => {
  let branch: { root: string; kids: string[] } | null = null;
  test.afterEach(async () => {
    if (branch) await destroyCategoryBranch([...branch.kids, branch.root]);
    branch = null;
  });

  test("ROWS-E5 a seeded 15-row list at 360×740 fills the height with rows of at most 40 px", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "one run of the touch context");
    const seeded = await seedScratchBranch(13, "rows-e5");
    branch = seeded;
    await page.setViewportSize({ width: 360, height: 740 });
    await gotoReady(page, "/");
    const menu = await openRailScope(page);
    await expect(menu.getByTestId("rail-category-skeleton")).toHaveCount(0);
    await menu.getByTestId(`rail-category-${seeded.root}`).tap();
    await expect(menu.getByTestId("rail-menu-back")).toBeVisible();
    const region = menu.getByTestId("rail-scroll");
    const rows = region.locator("nav > ul.menu-fit > li:not([aria-hidden])");
    await expect(rows).toHaveCount(15);
    const client = await region.evaluate((el) => el.clientHeight);
    const share = Math.min(40, client / 15);
    await expect
      .poll(() => region.evaluate((el) => el.scrollHeight - el.clientHeight))
      .toBeLessThanOrEqual(0);
    for (const height of await rows.evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().height),
    )) {
      expect(height, "ROWS-E5 a row is at most 40 px").toBeLessThanOrEqual(40.5);
      expect(height, "ROWS-E5 a row takes its share of the height").toBeGreaterThanOrEqual(
        share - 1,
      );
    }
  });
});

/**
 * SMN-E6 (DEC-288 item 5; Foundations turn R1c) — the folded rail (64 px) on a touch screen
 * at 1024: a tap on a folded icon opens its page and its side panel, headed by its name on
 * the panel's own surface (D245).
 */
test("SMN-E6 a tap on the folded rail opens the page and the panel headed by its name", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1280", "one run of the touch context");
  await gotoReady(page, "/");
  const rail = await openRailScope(page);
  await expect(rail.getByTestId("rail-category-skeleton")).toHaveCount(0);
  const html = page.locator("html");
  await page.getByTestId("shell-logo-cell").getByTestId("rail-collapse-toggle").tap();
  await expect(html).toHaveAttribute("data-rail", "collapsed");
  const electronics = rail.getByTestId("rail-category-electronics");
  const name = await electronics.getAttribute("aria-label");
  if (name === null) throw new Error("SMN-E6 the folded Electronics row has no aria-label");
  await electronics.tap();
  await expect(page).toHaveURL(/\/c\/electronics$/);
  const panel = page.getByTestId("submenu-panel");
  await expect(panel).toBeVisible();
  await expect(panel.getByTestId("submenu-header")).toContainText(name);
  const surface = await panel.evaluate((el) => {
    const style = getComputedStyle(el);
    return { rounded: parseFloat(style.borderTopLeftRadius) > 0, border: style.borderTopWidth };
  });
  // G38 — D248 withdraws D245's surface (square, 1 px border): the rail's, rounded, no border.
  expect(surface, "SMN-E6 the folded header's panel takes the rail's surface (D248)").toEqual({
    rounded: true,
    border: "0px",
  });
});
