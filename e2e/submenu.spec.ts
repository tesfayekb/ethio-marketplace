import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { scratchSlug } from "./helpers/categories";
import { catalogueRows } from "./helpers/category-menu";
import { destroyCategoryBranch } from "./helpers/posting";
import { gotoReady, openRailScope } from "./helpers/ui";
import { adminClient } from "./helpers/users";

/**
 * SMN-E1, SMN-E2 (SMN-E3, the touch context, is submenu-touch.spec.ts) (DEC-288, turn R1b) — the marketplace tree on the sub-menu mechanism,
 * from 768 px. Catalogue rows are read only (J3); the three-level shape is SC-2's
 * (shell.spec.ts), on its scratch branch.
 */
test.describe("DEC-288 side panel, fine pointer", () => {
  test("SMN-E1 rows spread between 36 and 48 px; a hover opens the panel, a click opens the page", async ({
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
 * SMN-E4 (D244, INC-1008; Foundations turn R1c) — every panel is wholly on screen when it
 * opens and after the window is resized. A SCRATCH root, last in the rail, carries 14
 * subcategories (J3: real rows are read only): at 600 px its panel was clamped and
 * scrolled inside itself, its last rows clipped (cause 2), and a panel opened at 900 px
 * was never placed again when the window shrank (cause 1). Removed in finally.
 */
test.describe("D244 every panel on screen", () => {
  const CHILDREN = 14;

  async function seedTallBranch() {
    const supabase = adminClient();
    const base = scratchSlug();
    const root = `${base}-r`;
    const kids = Array.from({ length: CHILDREN }, (_, index) => `${base}-k${index + 1}`);
    const { data: rows, error } = await supabase
      .from("categories")
      .insert(
        [root, ...kids].map((slug) => ({
          slug,
          name_en: slug,
          is_active: true,
          allow_listings: true,
        })),
      )
      .select("id, slug");
    if (error || !rows) throw new Error(`[e2e:smn-e4] seeding failed: ${error?.message}`);
    const id = (slug: string) => {
      const row = rows.find((candidate) => candidate.slug === slug);
      if (!row) throw new Error(`[e2e:smn-e4] ${slug} was not inserted`);
      return row.id as string;
    };
    const { error: pointerError } = await supabase.from("category_tree_pointers").insert([
      { parent_id: null, child_id: id(root), display_order: 2_009_400 },
      ...kids.map((slug, index) => ({
        parent_id: id(root),
        child_id: id(slug),
        display_order: index + 1,
      })),
    ]);
    if (pointerError) throw new Error(`[e2e:smn-e4] linking failed: ${pointerError.message}`);
    return { root, kids };
  }

  async function everyRowOnScreen(page: Page, label: string) {
    const panel = page.getByTestId("submenu-panel").first();
    await expect(panel).toBeVisible();
    const rows = panel.locator("[data-submenu-row]");
    await expect(rows).toHaveCount(CHILDREN);
    await expect
      .poll(() => panel.evaluate((el) => el.scrollHeight <= el.clientHeight + 1), {
        message: `${label}: the panel does not scroll inside itself`,
      })
      .toBe(true);
    for (let index = 0; index < CHILDREN; index += 1) {
      await expect(rows.nth(index), `${label}: row ${index + 1} of ${CHILDREN}`).toBeInViewport({
        ratio: 1,
      });
    }
  }

  for (const width of [1280, 1024]) {
    test(`SMN-E4 a 14-row panel fits at ${width}×600 and follows a resize`, async ({
      page,
    }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-1280", "the side panel opens from 768 px");
      const branch = await seedTallBranch();
      try {
        await page.setViewportSize({ width, height: 600 });
        await gotoReady(page, "/");
        const rail = await openRailScope(page);
        const opener = rail.getByTestId(`rail-category-${branch.root}`);
        await opener.scrollIntoViewIfNeeded();
        await opener.hover();
        await everyRowOnScreen(page, `SMN-E4 ${width}×600`);
        await page.mouse.move(width - 20, 20);
        await expect(page.getByTestId("submenu-panel")).toHaveCount(0);

        await page.setViewportSize({ width, height: 900 });
        await opener.scrollIntoViewIfNeeded();
        await opener.hover();
        await expect(page.getByTestId("submenu-panel")).toBeVisible();
        // The pointer stays on the opener while the window shrinks.
        await page.setViewportSize({ width, height: 600 });
        await everyRowOnScreen(page, `SMN-E4 ${width} resized 900→600`);
      } finally {
        await destroyCategoryBranch([...branch.kids, branch.root]);
      }
    });
  }
});
