import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { destroyCategoryBranch, seedScratchBranch } from "./helpers/posting";
import { grantRole } from "./helpers/categories";
import { gotoReady, openRailScope, signIn } from "./helpers/ui";
import { leaseUser } from "./helpers/users";

/**
 * ROWS-E3, ROWS-E4 (D247, INC-1009; Foundations turn R1c) — a menu list fits before it
 * scrolls. A list of 16 items or fewer shares its region's height down to 32 px; when even
 * 32 px rows do not fit, the region scrolls and its scrollbar takes width. Playwright's
 * `--hide-scrollbars` takes every scrollbar's width to 0, so this file drops only that flag
 * (as overlay-shift.spec.ts does) and the scrollbar is measured, never assumed.
 * Measured before the rule: the rail at 1280×600 held 568 px of rows in 488.
 */
test.use({
  launchOptions: {
    ...(process.env["E2E_CHROMIUM_PATH"]
      ? { executablePath: process.env["E2E_CHROMIUM_PATH"] }
      : {}),
    ignoreDefaultArgs: ["--hide-scrollbars"],
  },
});

async function railList(page: Page) {
  const rail = await openRailScope(page);
  await expect(rail.getByTestId("rail-category-skeleton")).toHaveCount(0);
  const region = rail.getByTestId("rail-scroll");
  const rows = region.locator("nav > ul.menu-fit > li:not([aria-hidden])");
  return { rail, region, rows };
}

const scrollOf = (page: Page) =>
  page
    .getByTestId("app-rail")
    .getByTestId("rail-scroll")
    .evaluate((el) => ({
      overflow: el.scrollHeight - el.clientHeight,
      bar: (el as HTMLElement).offsetWidth - el.clientWidth,
      client: el.clientHeight,
    }));

test.describe("D247 the rail's list", () => {
  const SEEDED = 12;
  let branch: { root: string; kids: string[] } | null = null;
  test.afterEach(async () => {
    if (branch) await destroyCategoryBranch([...branch.kids, branch.root]);
    branch = null;
  });

  const judge = async (page: Page, label: string) => {
    const { region, rows } = await railList(page);
    const count = await rows.count();
    const many = await region.locator("nav > ul.menu-fit").getAttribute("data-many");
    // G38 — D248 replaces the ">16 keeps full-size rows" branch from 768 px: there is no
    // item limit; a list fits while its rows stay at 32 px or more, and only then scrolls.
    // `data-many` still marks the count (the phone's rule) and changes nothing here.
    expect(many, `${label}: data-many marks more than 16`).toBe(count > 16 ? "" : null);
    const { client } = await scrollOf(page);
    if (count * 32 <= client) {
      await expect.poll(async () => (await scrollOf(page)).overflow).toBeLessThanOrEqual(0);
      for (const height of await rows.evaluateAll((els) =>
        els.map((el) => el.getBoundingClientRect().height),
      )) {
        expect(height, `${label}: a row is 32–48 px`).toBeGreaterThanOrEqual(31.5);
        expect(height, `${label}: a row is 32–48 px`).toBeLessThanOrEqual(48);
      }
      return count;
    }
    // INC-1011, D248: too tall even at 32 px (any count) — rows at the floor, the region
    // scrolls, its bar takes width.
    for (const height of await rows.evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().height),
    ))
      expect(height, `${label}: a row keeps the 32 px floor`).toBeGreaterThanOrEqual(31.5);
    await expect.poll(async () => (await scrollOf(page)).overflow).toBeGreaterThan(0);
    expect((await scrollOf(page)).bar, `${label}: the scrollbar takes width`).toBeGreaterThan(0);
    return count;
  };

  test("ROWS-E3 the rail at 1280×600 follows the 16-item rule; a seeded list of 12 fits without scrolling", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "the persistent rail is from 768 px");
    branch = await seedScratchBranch(SEEDED, "rows-e3");
    await page.setViewportSize({ width: 1280, height: 600 });
    await gotoReady(page, "/");
    // The main list, judged for the count this backend holds at run time (G27, G28).
    await judge(page, "ROWS-E3 the main list");
    // The test's own list: its side panel's 12 rows. G38 — D248 bounds a panel by the rail's
    // height (was the window's): it fits when 12 rows of at least 32 px fit the rail, and
    // otherwise its rows hold the 32 px floor and it scrolls with a visible scrollbar.
    const { rail } = await railList(page);
    const opener = rail.getByTestId(`rail-category-${branch.root}`);
    await opener.scrollIntoViewIfNeeded();
    await opener.hover();
    const panel = page.getByTestId("submenu-panel");
    await expect(panel).toBeVisible();
    const rows = panel.locator("[data-submenu-row]");
    await expect(rows).toHaveCount(SEEDED);
    const { client: railRoom } = await scrollOf(page);
    // G38 — replaced by D254 (Foundations turn R1d-b): a panel row equals a rail row; it
    // never compacts. D252: the rail no longer yields height to the footer.
    const railRow = await rail
      .locator("[data-testid='rail-scroll'] nav > ul.menu-fit > li:not([aria-hidden])")
      .evaluateAll((els) => Math.max(0, ...els.map((el) => el.getBoundingClientRect().height)));
    const heights = await rows.evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().height),
    );
    for (const height of heights)
      expect(
        Math.abs(height - railRow),
        "ROWS-E3 a seeded row equals a rail row",
      ).toBeLessThanOrEqual(1);
    const state = await panel.evaluate((el) => ({
      overflow: el.scrollHeight - el.clientHeight,
      bar: (el as HTMLElement).offsetWidth - el.clientWidth,
    }));
    if (SEEDED * railRow <= railRoom + 1) {
      expect(state.overflow, "ROWS-E3 the seeded panel fits").toBeLessThanOrEqual(1);
    } else {
      expect(state.overflow, "ROWS-E3 the seeded panel scrolls").toBeGreaterThan(0);
      expect(state.bar, "ROWS-E3 its scrollbar takes width").toBeGreaterThan(0);
    }
  });
});

test("ROWS-E4 with the favourite the rail is too short even at 32 px: it scrolls with a visible scrollbar", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1280", "the persistent rail is from 768 px");
  await page.setViewportSize({ width: 1280, height: 600 });
  await gotoReady(page, "/c/electronics");
  await page.getByTestId("category-favourite").click();
  await expect(page.getByTestId("category-favourite")).toHaveAttribute("aria-pressed", "true");
  const { rail, rows } = await railList(page);
  await expect(rail.getByTestId("rail-favourite")).toBeVisible();
  const count = await rows.count();
  let { client } = await scrollOf(page);
  // At 600 px the operator's 16 rows (15 roots and the favourite) need 512 px against
  // 488; on another tree the window is made short enough that 32 px rows cannot fit.
  if (count * 32 <= client) {
    await page.setViewportSize({ width: 1280, height: 600 - (client - count * 32) - 40 });
    await expect.poll(async () => (await scrollOf(page)).client).toBeLessThan(client);
    client = (await scrollOf(page)).client;
  }
  expect(count * 32, "ROWS-E4 the rows cannot fit at 32 px").toBeGreaterThan(client);
  await expect.poll(async () => (await scrollOf(page)).overflow).toBeGreaterThan(0);
  expect((await scrollOf(page)).bar, "ROWS-E4 the scrollbar takes width").toBeGreaterThan(0);
  for (const height of await rows.evaluateAll((els) =>
    els.map((el) => el.getBoundingClientRect().height),
  ))
    expect(height, "ROWS-E4 a row keeps the 32 px floor").toBeGreaterThanOrEqual(31.5);
});

/**
 * ROWS-E2 (D247, D248, D240; Foundations turn R1d-c) — the admin menu from 768 px has no
 * item limit: its rows hold 32 px or more and fit, or the region scrolls with a visible
 * scrollbar. Its groups open side panels on the same mechanism, whose rows equal a rail row.
 * Judged at 1280×600 and 1280×400 for the menu this backend's admin role draws (G27, G28).
 */
test("ROWS-E2 the admin menu from 768 px fits at 32 px or more, or scrolls with a visible scrollbar", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1280", "the persistent rail is from 768 px");
  const staff = await leaseUser();
  await grantRole(staff.id, "admin");
  await signIn(page, staff.email, staff.password);
  for (const height of [600, 400]) {
    await page.setViewportSize({ width: 1280, height });
    await gotoReady(page, "/admin");
    const region = page.getByTestId("app-rail").getByTestId("rail-scroll");
    const rows = region.locator("nav ul > li");
    await expect(rows.first()).toBeVisible({ timeout: 15000 });
    for (const box of await rows.evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().height),
    ))
      expect(box, `ROWS-E2 at ${height}: a row keeps the 32 px floor`).toBeGreaterThanOrEqual(31.5);
    const state = await scrollOf(page);
    if (state.overflow > 0)
      expect(state.bar, `ROWS-E2 at ${height}: the scrollbar takes width`).toBeGreaterThan(0);
    // The groups: each opens a side panel whose rows equal a rail row.
    const openers = region.locator("[data-submenu]");
    const groups = await openers.count();
    expect(groups, "ROWS-E2 the admin menu has groups").toBeGreaterThan(0);
    const railRow = await region
      .locator("nav ul > li > a:not([data-submenu])")
      .evaluateAll((els) => Math.max(0, ...els.map((el) => el.getBoundingClientRect().height)));
    for (let index = 0; index < groups; index++) {
      const opener = openers.nth(index);
      await opener.scrollIntoViewIfNeeded();
      await opener.hover();
      const panel = page.getByTestId("submenu-panel");
      await expect(panel).toBeVisible();
      for (const row of await panel
        .locator("[data-submenu-row]")
        .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height)))
        expect(Math.abs(row - railRow), "ROWS-E2 a panel row equals a rail row").toBeLessThanOrEqual(1);
      await page.mouse.move(900, height - 20);
      await expect(page.getByTestId("submenu-panel")).toHaveCount(0);
    }
  }
});
