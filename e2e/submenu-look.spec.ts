import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { adminClient } from "./global-setup";
import { destroyCategoryBranch, seedScratchBranch } from "./helpers/posting";
import { gotoReady, openRailScope } from "./helpers/ui";

/**
 * SMN-E7 … SMN-E10 (D248; Foundations turn R1d-a) — a side panel is the main menu: the
 * rail's surface and rows, each row level with a rail row at the rail's row height, one
 * line per name with an ellipsis, never below the rail's last row, and from 768 px no
 * item limit (fit at 32 px, then scroll with a visible scrollbar). Scratch branches only
 * (J3), removed in afterEach. The scrollbar is measured, so `--hide-scrollbars` is dropped
 * (as overlay-shift.spec.ts does).
 */
test.use({
  launchOptions: {
    ...(process.env["E2E_CHROMIUM_PATH"]
      ? { executablePath: process.env["E2E_CHROMIUM_PATH"] }
      : {}),
    ignoreDefaultArgs: ["--hide-scrollbars"],
  },
});

const RAIL_ROWS = "[data-testid='rail-scroll'] nav > ul.menu-fit > li:not([aria-hidden])";

async function openPanel(page: Page, slug: string) {
  const rail = await openRailScope(page);
  await expect(rail.getByTestId("rail-category-skeleton")).toHaveCount(0);
  const opener = rail.getByTestId(`rail-category-${slug}`);
  await opener.scrollIntoViewIfNeeded();
  await opener.hover();
  const panel = page.getByTestId("submenu-panel");
  await expect(panel).toBeVisible();
  // The fade ends at full opacity; boxes are read once the panel is placed.
  await expect.poll(() => panel.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
  return panel;
}

const railGrid = (page: Page) =>
  page.locator(RAIL_ROWS).evaluateAll((els) => {
    const region = document
      .querySelector("[data-testid='app-rail'] [data-testid='rail-scroll']")
      ?.getBoundingClientRect();
    const boxes = els.map((el) => el.getBoundingClientRect());
    return {
      tops: boxes.map((box) => box.top),
      height: boxes[0]?.height ?? 0,
      bottom: Math.min(region?.bottom ?? Infinity, boxes[boxes.length - 1]?.bottom ?? 0),
    };
  });

test.describe("D248 a side panel is the main menu", () => {
  let branch: { root: string; kids: string[] } | null = null;
  test.afterEach(async () => {
    if (branch) await destroyCategoryBranch([...branch.kids, branch.root]);
    branch = null;
  });

  for (const height of [800, 600]) {
    test(`SMN-E7 at 1280×${height} panel rows are the rail's rows: height, level, look and icon`, async ({
      page,
    }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-1280", "the side panel opens from 768 px");
      const seeded = await seedScratchBranch(4, "smn-e7");
      branch = seeded;
      await page.setViewportSize({ width: 1280, height });
      await gotoReady(page, "/");
      const panel = await openPanel(page, seeded.root);
      const grid = await railGrid(page);
      const look = await panel.evaluate((el) => {
        const style = getComputedStyle(el);
        const rows = Array.from(el.querySelectorAll<HTMLElement>("[data-submenu-row]"));
        return {
          border: style.borderTopWidth,
          radius: parseFloat(style.borderTopLeftRadius),
          rows: rows.map((row) => {
            const box = row.parentElement?.getBoundingClientRect();
            const own = getComputedStyle(row);
            return {
              top: box?.top ?? 0,
              height: box?.height ?? 0,
              separator: own.borderBottomWidth,
              classes: row.className,
              icon: row.querySelector("svg") !== null,
            };
          }),
        };
      });
      expect(look.border, "SMN-E7 the panel has no border").toBe("0px");
      expect(look.radius, "SMN-E7 the panel's corners are rounded").toBeGreaterThan(0);
      expect(look.rows).toHaveLength(4);
      for (const row of look.rows) {
        expect(Math.abs(row.height - grid.height), "SMN-E7 a row is the rail's height").toBeLessThanOrEqual(1);
        expect(
          Math.min(...grid.tops.map((top) => Math.abs(top - row.top))),
          "SMN-E7 a row is level with a rail row",
        ).toBeLessThanOrEqual(1);
        expect(row.separator, "SMN-E7 no separator line").toBe("0px");
        expect(row.classes, "SMN-E7 the shared row classes").toContain("rounded-md");
        expect(row.classes, "SMN-E7 the sidebar hover (INC-042)").toContain(
          "hover:bg-sidebar-accent/60",
        );
        expect(row.classes, "SMN-E7 never bg-muted").not.toContain("bg-muted");
        expect(row.icon, "SMN-E7 each row shows an icon").toBe(true);
      }
    });
  }

  test("SMN-E8 a 60-character name stays on one line, cut with an ellipsis, its full name kept", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "the side panel opens from 768 px");
    const seeded = await seedScratchBranch(2, "smn-e8");
    branch = seeded;
    const long = `${"Long name ".repeat(6)}`.slice(0, 60);
    const kid = seeded.kids[0] as string;
    const { error } = await adminClient()
      .from("categories")
      .update({ name_en: long })
      .eq("slug", kid);
    expect(error, "SMN-E8 the long name was written").toBeNull();
    await page.setViewportSize({ width: 1280, height: 800 });
    await gotoReady(page, "/");
    const panel = await openPanel(page, seeded.root);
    const row = panel.getByTestId(`rail-category-${kid}`);
    await expect(row).toHaveAttribute("title", long);
    await expect(row).toHaveAttribute("aria-label", long);
    const cut = await row.evaluate((el) => {
      const text = el.querySelector<HTMLElement>("[data-cut] > :first-child");
      const style = text ? getComputedStyle(text) : null;
      return {
        over: text ? text.scrollWidth > text.clientWidth : false,
        ellipsis: style?.textOverflow,
        wrap: style?.whiteSpace,
        lines: text ? Math.round(text.getBoundingClientRect().height / parseFloat(style?.lineHeight || "20")) : 0,
      };
    });
    expect(cut).toEqual({ over: true, ellipsis: "ellipsis", wrap: "nowrap", lines: 1 });
  });

  test("SMN-E9 a panel opened from the last root ends level with the rail's last row", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "the side panel opens from 768 px");
    const seeded = await seedScratchBranch(6, "smn-e9");
    branch = seeded;
    await page.setViewportSize({ width: 1280, height: 800 });
    await gotoReady(page, "/");
    const panel = await openPanel(page, seeded.root);
    const grid = await railGrid(page);
    const box = await panel.evaluate((el) => el.getBoundingClientRect().bottom);
    expect(Math.abs(box - grid.bottom), "SMN-E9 the panel ends at the rail's last row").toBeLessThanOrEqual(1);
  });

  test("SMN-E10 a 20-row panel fits at 1280×1000; at 1280×600 its rows reach 32 px, then it scrolls", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280", "the side panel opens from 768 px");
    const seeded = await seedScratchBranch(20, "smn-e10");
    branch = seeded;
    await page.setViewportSize({ width: 1280, height: 1000 });
    await gotoReady(page, "/");
    let panel = await openPanel(page, seeded.root);
    await expect(panel.locator("[data-submenu-row]")).toHaveCount(20);
    expect(
      await panel.evaluate((el) => el.scrollHeight - el.clientHeight),
      "SMN-E10 no scroll at 1000 px",
    ).toBeLessThanOrEqual(1);
    await page.mouse.move(1200, 900);
    await expect(page.getByTestId("submenu-panel")).toHaveCount(0);

    await page.setViewportSize({ width: 1280, height: 600 });
    panel = await openPanel(page, seeded.root);
    const state = await panel.evaluate((el) => ({
      overflow: el.scrollHeight - el.clientHeight,
      bar: el.offsetWidth - el.clientWidth,
      rows: Array.from(el.querySelectorAll("[data-submenu-row]")).map(
        (row) => row.parentElement?.getBoundingClientRect().height ?? 0,
      ),
    }));
    for (const height of state.rows)
      expect(Math.abs(height - 32), "SMN-E10 a row at the 32 px floor").toBeLessThanOrEqual(0.5);
    expect(state.overflow, "SMN-E10 the panel scrolls").toBeGreaterThan(0);
    expect(state.bar, "SMN-E10 its scrollbar takes width").toBeGreaterThan(0);
  });
});
