import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { catalogueRows } from "./helpers/category-menu";
import { destroyCategoryBranch, seedScratchBranch } from "./helpers/posting";
import { gotoReady, layoutBoxes, openRailScope } from "./helpers/ui";

/**
 * SMN-E1, SMN-E2 (SMN-E3, the touch context, is submenu-touch.spec.ts) (DEC-288, turn R1b) — the marketplace tree on the sub-menu mechanism,
 * from 768 px. Catalogue rows are read only (J3); the three-level shape is SC-2's
 * (shell.spec.ts), on its scratch branch.
 */
test.describe("DEC-288 side panel, fine pointer", () => {
  test("SMN-E1 rows spread between 32 and 48 px; a hover opens the panel, a click opens the page", async ({
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
      // G38 — D247: rows share the height between 32 and 48 px (was 36–48, R1b-2).
      expect(height, "SMN-E1 a row is 32–48 px (D247)").toBeGreaterThanOrEqual(32);
      expect(height, "SMN-E1 a row is 32–48 px (D247)").toBeLessThanOrEqual(48);
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
 * SMN-E5 (D245, D248; Foundations turns R1c, R1d-a) — the panel fades 300 ms in and out by
 * opacity alone; under prefers-reduced-motion, none. G38 — D248 withdraws D245's surface
 * (a 1 px border, square corners, no shadow, 1 px over the rail): the panel takes the
 * rail's surface — no border, rounded, the rail's shadow — and sits flush beside it.
 */
test("SMN-E5 the panel takes the rail's surface, flush beside it, and fades 300 ms in and out", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1280", "the side panel opens from 768 px");
  await gotoReady(page, "/");
  const rail = await openRailScope(page);
  const opener = rail.getByTestId("rail-category-electronics");
  await opener.hover();
  const panel = page.getByTestId("submenu-panel");
  await expect(panel).toBeVisible();
  const railLook = await page.getByTestId("app-rail").evaluate((el) => {
    const style = getComputedStyle(el);
    return { background: style.backgroundColor, shadow: style.boxShadow };
  });
  const look = await panel.evaluate((el) => {
    const style = getComputedStyle(el);
    return {
      border: style.borderTopWidth,
      rounded: parseFloat(style.borderTopLeftRadius) > 0,
      background: style.backgroundColor,
      shadow: style.boxShadow,
      property: style.transitionProperty,
      duration: style.transitionDuration,
    };
  });
  expect(look).toEqual({
    border: "0px",
    rounded: true,
    background: railLook.background,
    shadow: railLook.shadow,
    property: "opacity",
    duration: "0.3s",
  });
  const { rail: railBox, panel: panelBox } = await layoutBoxes({
    rail: page.getByTestId("app-rail"),
    panel,
  });
  expect(Math.abs(panelBox.x - (railBox.x + railBox.width)), "flush").toBeLessThanOrEqual(1);
  await page.mouse.move(900, 700);
  // The closing panel stays 300 ms, aria-hidden, then goes.
  await expect(page.getByTestId("submenu-panel-closing")).toHaveAttribute("aria-hidden", "true");
  await expect(page.getByTestId("submenu-panel-closing")).toHaveCount(0);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await opener.hover();
  await expect(panel).toBeVisible();
  // The site-wide reduced-motion rule leaves 0.01 ms: no visible fade.
  expect(
    parseFloat(await panel.evaluate((el) => getComputedStyle(el).transitionDuration)),
  ).toBeLessThanOrEqual(0.001);
  await page.mouse.move(900, 700);
  await expect(panel).toHaveCount(0);
  await expect(page.getByTestId("submenu-panel-closing")).toHaveCount(0);
});

/**
 * SMN-E4 (D244, INC-1008; Foundations turn R1c) — every panel is wholly on screen when it
 * opens and after the window is resized. A SCRATCH root, last in the rail, carries 14
 * subcategories (J3: real rows are read only): at 600 px its panel was clamped and
 * scrolled inside itself, its last rows clipped (cause 2), and a panel opened at 900 px
 * was never placed again when the window shrank (cause 1). Removed in afterEach (J3).
 */
test.describe("D244 every panel on screen", () => {
  const CHILDREN = 14;
  let branch: { root: string; kids: string[] } | null = null;
  test.afterEach(async () => {
    if (branch) await destroyCategoryBranch([...branch.kids, branch.root]);
    branch = null;
  });

  // G38 — D248 bounds a panel by the rail's height (was the window's): the panel is wholly
  // on screen and never below the rail's last row; its rows fit when they can at 32 px or
  // more, and otherwise hold the floor and the panel scrolls (no row clipped off screen).
  async function everyRowOnScreen(page: Page, label: string) {
    const panel = page.getByTestId("submenu-panel");
    await expect(panel).toBeVisible();
    const rows = panel.locator("[data-submenu-row]");
    await expect(rows).toHaveCount(CHILDREN);
    await expect(panel, `${label}: the panel is wholly on screen`).toBeInViewport({ ratio: 1 });
    await expect
      .poll(
        async () => {
          const railBottom = await page
            .getByTestId("app-rail")
            .getByTestId("rail-scroll")
            .evaluate((el) => el.getBoundingClientRect().bottom);
          const bottom = await panel.evaluate((el) => el.getBoundingClientRect().bottom);
          return bottom <= railBottom + 1;
        },
        { message: `${label}: never below the rail's last row` },
      )
      .toBe(true);
    const state = await panel.evaluate((el) => ({
      overflow: el.scrollHeight - el.clientHeight,
      rows: Array.from(el.querySelectorAll("[data-submenu-row]")).map(
        (row) => row.getBoundingClientRect().height,
      ),
    }));
    if (state.overflow > 1) {
      for (const height of state.rows)
        expect(
          Math.abs(height - 32),
          `${label}: a scrolled panel's rows hold 32 px`,
        ).toBeLessThanOrEqual(0.5);
    } else {
      for (let index = 0; index < CHILDREN; index += 1) {
        await expect(rows.nth(index), `${label}: row ${index + 1} of ${CHILDREN}`).toBeInViewport({
          ratio: 1,
        });
      }
    }
  }

  for (const width of [1280, 1024]) {
    test(`SMN-E4 a 14-row panel fits at ${width}×600 and follows a resize`, async ({
      page,
    }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-1280", "the side panel opens from 768 px");
      const seeded = await seedScratchBranch(CHILDREN, "smn-e4");
      branch = seeded;
      await page.setViewportSize({ width, height: 600 });
      await gotoReady(page, "/");
      const rail = await openRailScope(page);
      const opener = rail.getByTestId(`rail-category-${seeded.root}`);
      await opener.scrollIntoViewIfNeeded();
      await opener.hover();
      await everyRowOnScreen(page, `SMN-E4 ${width}×600`);
      await page.mouse.move(width - 20, 20);
      await expect(page.getByTestId("submenu-panel")).toHaveCount(0);

      await page.setViewportSize({ width, height: 900 });
      // Opened by the keys, so no pointer leaves its row while the rows move with the window.
      await opener.focus();
      await page.keyboard.press("ArrowRight");
      await expect(page.getByTestId("submenu-panel")).toBeVisible();
      await page.setViewportSize({ width, height: 600 });
      await everyRowOnScreen(page, `SMN-E4 ${width} resized 900→600`);
    });
  }
});
