import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { destroyCategoryBranch, seedScratchBranch } from "./helpers/posting";
import { gotoReady, openRailScope } from "./helpers/ui";

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
    if (count > 16) {
      expect(many, `${label}: a list of more than 16 is marked data-many`).toBe("");
      await expect.poll(async () => (await scrollOf(page)).overflow).toBeGreaterThan(0);
      expect((await scrollOf(page)).bar, `${label}: the scrollbar takes width`).toBeGreaterThan(0);
      return count;
    }
    expect(many, `${label}: a list of 16 or fewer is not data-many`).toBeNull();
    const { client } = await scrollOf(page);
    if (count * 32 <= client) {
      await expect.poll(async () => (await scrollOf(page)).overflow).toBeLessThanOrEqual(0);
      for (const height of await rows.evaluateAll((els) =>
        els.map((el) => el.getBoundingClientRect().height),
      )) {
        expect(height, `${label}: a row is 32–48 px`).toBeGreaterThanOrEqual(31.5);
        expect(height, `${label}: a row is 32–48 px`).toBeLessThanOrEqual(48);
      }
    }
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
    // The 16-or-fewer branch on the test's own list: its page shows its subcategories.
    await gotoReady(page, `/c/${branch.root}`);
    const { rows } = await railList(page);
    await expect(rows).toHaveCount(SEEDED);
    const { client } = await scrollOf(page);
    expect(SEEDED * 32, "ROWS-E3 12 rows fit at 32 px").toBeLessThanOrEqual(client);
    expect(await judge(page, "ROWS-E3 the seeded list")).toBe(SEEDED);
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
