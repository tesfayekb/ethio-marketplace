import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
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
  page.getByTestId("app-rail").getByTestId("rail-scroll").evaluate((el) => ({
    overflow: el.scrollHeight - el.clientHeight,
    bar: (el as HTMLElement).offsetWidth - el.clientWidth,
    client: el.clientHeight,
  }));

test("ROWS-E3 the rail's list fits at 1280×600 when its rows fit at 32 px; it does not scroll", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1280", "the persistent rail is from 768 px");
  await page.setViewportSize({ width: 1280, height: 600 });
  await gotoReady(page, "/");
  const { rows } = await railList(page);
  const count = await rows.count();
  const { client } = await scrollOf(page);
  expect(count, "ROWS-E3 the rail holds 16 items or fewer").toBeLessThanOrEqual(16);
  // The real tree (15 roots, no favourite) fits; a tree whose 32 px rows exceed the region
  // belongs to ROWS-E4's branch, and this run says so instead of passing on it.
  expect(count * 32, "ROWS-E3 the tree's rows fit at 32 px in this region").toBeLessThanOrEqual(
    client,
  );
  await expect.poll(async () => (await scrollOf(page)).overflow).toBeLessThanOrEqual(0);
  for (const height of await rows.evaluateAll((els) =>
    els.map((el) => el.getBoundingClientRect().height),
  )) {
    expect(height, "ROWS-E3 a row is 32–48 px").toBeGreaterThanOrEqual(31.5);
    expect(height, "ROWS-E3 a row is 32–48 px").toBeLessThanOrEqual(48);
  }
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
