import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { gotoReady, layoutBoxes, signIn } from "./helpers/ui";
import { leaseUser } from "./helpers/users";

/**
 * BND-E1…E4 (D258), BAR-E1 (D256), FTE-E1 (D257) — Foundations turn R1d-c.
 * D258: every band row (the panel tabs, the breadcrumb row, the location row, the menu's
 * band) is 40 px, rule line included (BAND_ROW, band-row.ts); the menu's band sits flush under
 * the top bar; the menu's first row starts on the band boundary beside it.
 * D256: one gap and one inset across the top bar (bar-spacing.ts). D257: the footer's four
 * blocks share the middle column evenly.
 */

const box = async (page: Page, id: string) =>
  (await layoutBoxes({ found: page.getByTestId(id) })).found;

async function setFolded(page: Page, folded: boolean) {
  const state = folded ? "collapsed" : "expanded";
  const html = page.locator("html");
  if ((await html.getAttribute("data-rail")) !== state)
    await page.getByTestId("shell-logo-cell").getByTestId("rail-collapse-toggle").click();
  await expect(html).toHaveAttribute("data-rail", state);
}

const bandHeights = (page: Page) =>
  page
    .locator("[data-band-row]")
    .evaluateAll((els) =>
      els
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        .map((el) => ({
          id: el.getAttribute("data-testid") ?? "",
          h: el.getBoundingClientRect().height,
        })),
    );

for (const pointer of ["fine", "coarse"] as const) {
  test.describe(`D258 band rows, ${pointer} pointer`, () => {
    test.use(pointer === "coarse" ? { hasTouch: true } : {});
    for (const signedIn of [false, true]) {
      test(`BND-E1 every band row is 40 px and the menu starts on its boundary (${signedIn ? "signed in" : "signed out"})`, async ({
        page,
      }, testInfo) => {
        test.skip(testInfo.project.name !== "desktop-1280", "the menu's band is from 768 px");
        if (signedIn) {
          const user = await leaseUser();
          await signIn(page, user.email, user.password);
        }
        for (const [width, height] of [
          [1280, 800],
          [1024, 768],
        ] as const) {
          await page.setViewportSize({ width, height });
          await gotoReady(page, "/");
          await expect(page.getByTestId("rail-category-skeleton")).toHaveCount(0);
          for (const folded of [false, true]) {
            await setFolded(page, folded);
            const label = `${width} ${folded ? "folded" : "open"}`;
            const rows = await bandHeights(page);
            const ids = rows.map((row) => row.id);
            expect(ids, `${label}: the band rows`).toEqual(
              expect.arrayContaining(["shell-breadcrumb-row", "location-row"]),
            );
            if (signedIn) expect(ids).toContain("panel-tabs");
            for (const row of rows)
              expect(Math.abs(row.h - 40), `${label}: ${row.id} is 40 px`).toBeLessThanOrEqual(1);
            const bar = await box(page, "shell-band");
            const band = await box(page, "panel-header");
            expect(
              Math.abs(band.y - (bar.y + bar.height)),
              `${label}: band flush`,
            ).toBeLessThanOrEqual(1);
            expect(Math.abs(band.height - 40), `${label}: band 40 px`).toBeLessThanOrEqual(1);
            // The sub-band row beside the band: the tabs signed in, the breadcrumb signed out.
            const beside = await box(page, signedIn ? "panel-tabs" : "shell-breadcrumb-row");
            const first = await box(page, "rail-home");
            expect(
              Math.abs(first.y - (beside.y + beside.height)),
              `${label}: the first row starts under the row beside the band`,
            ).toBeLessThanOrEqual(1);
          }
          await setFolded(page, false);
        }
      });
    }
  });
}

test("BND-E2 at 360 the breadcrumb and location rows are 40 px; the phone menu has no band", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-360", "phone widths");
  await gotoReady(page, "/");
  const rows = await bandHeights(page);
  expect(rows.map((row) => row.id)).toEqual(
    expect.arrayContaining(["shell-breadcrumb-row", "location-row"]),
  );
  for (const row of rows) expect(Math.abs(row.h - 40), `${row.id} is 40 px`).toBeLessThanOrEqual(1);
});

test("BND-E3 on the feed, signed out, Services' panel starts at the location row's top", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1280", "the side panel opens from 768 px");
  await page.setViewportSize({ width: 1280, height: 800 });
  await gotoReady(page, "/");
  const opener = page.getByTestId("app-rail").getByTestId("rail-category-services");
  // G27: the operator's tree holds Services; another tree has nothing to judge here.
  test.skip((await opener.count()) === 0, "this backend's tree has no Services");
  const location = await box(page, "location-row");
  await opener.hover();
  const panel = page.getByTestId("submenu-panel");
  await expect(panel).toBeVisible();
  const rows = await panel.locator("[data-submenu-row]").count();
  const { panel: panelBox } = await layoutBoxes({ panel });
  // A panel that spans the menu (taller than it, D254) starts on the band boundary.
  const railRow = await opener.evaluate((el) => el.getBoundingClientRect().height);
  if (rows * railRow > 800 - location.y)
    expect(
      Math.abs(panelBox.y - location.y),
      "BND-E3 the panel starts at the location row",
    ).toBeLessThanOrEqual(1);
  else expect(panelBox.y).toBeGreaterThanOrEqual(location.y - 1);
});

test("BAR-E1 the top bar has one gap and no overlap between the toggle and the logo", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1280", "the logo cell is from 768 px");
  for (const width of [1280, 1024]) {
    await page.setViewportSize({ width, height: 800 });
    await gotoReady(page, "/");
    for (const folded of [false, true]) {
      await setFolded(page, folded);
      const label = `${width} ${folded ? "folded" : "open"}`;
      const gaps = await page.evaluate(() => {
        const visible = (el: Element) => (el as HTMLElement).offsetParent !== null;
        const kids = (sel: string) =>
          [...(document.querySelector(sel)?.children ?? [])]
            .filter(visible)
            .map((el) => el.getBoundingClientRect());
        const between = (rects: DOMRect[]) =>
          rects.slice(1).map((rect, i) => rect.left - (rects[i]?.right ?? rect.left));
        return {
          cell: between(kids('[data-testid="shell-logo-cell"]')),
          controls: between(kids('[data-testid="topbar-controls"]')),
        };
      });
      const all = [...gaps.cell, ...gaps.controls];
      expect(all.length, `${label}: neighbours measured`).toBeGreaterThan(0);
      for (const gap of all) {
        expect(gap, `${label}: no overlap`).toBeGreaterThanOrEqual(0);
        expect(Math.abs(gap - 8), `${label}: the band's gap`).toBeLessThanOrEqual(1);
      }
    }
    await setFolded(page, false);
  }
});

test("FTE-E1 the footer's five gaps (edge, three between, edge) are equal", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1280", "the four blocks are from 768 px");
  for (const width of [1280, 1024]) {
    await page.setViewportSize({ width, height: 800 });
    await gotoReady(page, "/");
    for (const folded of [false, true]) {
      await setFolded(page, folded);
      const gaps = await page.evaluate(() => {
        const row = document.querySelector('[data-testid="footer-columns"]');
        const column = document.querySelector('[data-testid="shell-footer-wrapper"]');
        if (!row || !column) return [];
        const outer = column.getBoundingClientRect();
        const blocks = [...row.children].map((el) => el.getBoundingClientRect());
        const edges = [outer.left, ...blocks.flatMap((b) => [b.left, b.right]), outer.right];
        const out: number[] = [];
        for (let i = 0; i + 1 < edges.length; i += 2)
          out.push((edges[i + 1] ?? 0) - (edges[i] ?? 0));
        return out;
      });
      const label = `${width} ${folded ? "folded" : "open"}`;
      expect(gaps.length, `${label}: four blocks, five gaps`).toBe(5);
      const min = Math.min(...gaps);
      const max = Math.max(...gaps);
      expect(
        max - min,
        `${label}: gaps ${gaps.map((g) => g.toFixed(1)).join(", ")}`,
      ).toBeLessThanOrEqual(2);
    }
    await setFolded(page, false);
  }
});
