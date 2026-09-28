import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { scratchSlug, destroyCategory } from "./helpers/categories";
import { gotoReady, openRailScope } from "./helpers/ui";
import { adminClient } from "./helpers/users";

/**
 * U0l (INC-073) — CATEGORY SELECTION IS NAVIGATION.
 *
 * A category is a URL (/c/<slug>), never private client state: the rail
 * highlight, the breadcrumb chain and the feed all read the SAME address, so
 * a category page is shareable, reloadable and back-button correct.
 */
test.describe("category selection navigates", () => {
  /**
   * First real category row in the rail (row 0 is "All categories").
   *
   * INC-170 (amended by INC-170b) — RATIFIED ANCHORS ONLY, ONE PREFIX:
   * every scratch slug this suite creates begins with `e2e-` (the categories
   * helper's `e2e-cat-`, the listing helper's `e2e-cat-listing-`; INC-153 /
   * DEC-031 lineage, INC-165's listing prefix is the same law). The anchor
   * therefore excludes the WHOLE `e2e-` family, not one sub-prefix, so a new
   * scratch family can never become "the first category". C2-SETTLE renders them
   * invisible on public surfaces — but a mid-test graveyard row can still
   * leak into the rail. The anchor is STRUCTURAL (testid prefix), never
   * text (J5), so a scratch row can never become "the first category".
   */
  async function firstCategory(page: import("@playwright/test").Page) {
    const scope = await openRailScope(page);
    const rows = scope.locator(
      "nav li > a[data-testid^='rail-category-']:not([data-testid^='rail-category-e2e-'])",
    );
    // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: locator is already scoped to a single viewport twin (or a non-twin surface); grandfathered pending the twin-helper sweep
    await expect(rows.first()).toBeVisible();
    /**
     * INC-171 — the guard must be the SAME for C-1..C-3, or one test runs
     * while its siblings self-skip on a half-rendered rail. The count is
     * POLLED to its settled value (the rail hydrates row by row), so all
     * three tests read one verdict.
     */
    await expect
      .poll(async () => await rows.count(), { timeout: 10000 })
      .toBeGreaterThan(1)
      .catch(() => undefined);
    const count = await rows.count();
    if (count < 2) return null;
    const row = rows.nth(1);
    const label = (await row.textContent())!.trim();
    const href = (await row.getAttribute("href"))!;
    return { scope, row, label, href };
  }

  test("C-1: clicking a category changes the URL and survives reload", async ({ page }) => {
    await gotoReady(page, "/");
    const first = await firstCategory(page);
    test.skip(first === null, "needs at least one seeded category");

    await first!.row.click();
    await expect(page).toHaveURL(new RegExp(`${first!.href}$`));
    await expect(page.getByTestId("breadcrumb-category")).toHaveText(first!.label);

    // Reload: the same page comes back from the URL alone.
    await page.reload();
    await expect(page.getByTestId("breadcrumb-category")).toHaveText(first!.label);
  });

  test("C-2: the rail highlight follows the URL", async ({ page }) => {
    await gotoReady(page, "/");
    const first = await firstCategory(page);
    test.skip(first === null, "needs at least one seeded category");

    await gotoReady(page, first!.href);
    const scope = await openRailScope(page);
    await expect(scope.locator("a[aria-current='page']")).toHaveText(first!.label);
  });

  test("C-3: Home clears the category", async ({ page }) => {
    await gotoReady(page, "/");
    const first = await firstCategory(page);
    test.skip(first === null, "needs at least one seeded category");

    await gotoReady(page, first!.href);
    await page.getByTestId("breadcrumb-home").click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId("breadcrumb-category")).toHaveCount(0);
    const scope = await openRailScope(page);
    await expect(scope.getByTestId("rail-category-all")).toHaveAttribute("aria-current", "page");
  });

  test("C-4: /auth is a page — Home > Sign in, no category selected", async ({ page }) => {
    await gotoReady(page, "/auth");
    await expect(page.getByTestId("breadcrumb-home")).toBeVisible();
    await expect(page.getByTestId("breadcrumb-auth")).toHaveText(en["auth.signIn"]);
    await expect(page.getByTestId("breadcrumb-category")).toHaveCount(0);
  });

  /**
   * C-5 (DEC-080) — THE RAIL FOLLOWS THE ROOT POINTERS. Two scratch roots whose
   * ROW order (9200 / 9199) is reversed against their parent-NULL pointers
   * (9100 / 9101): the rail lists them in pointer order. Swapping the two
   * pointers' order moves the tree version, and a reload flips the rail.
   * Located by scratch slug, never by position (G28).
   */
  test("C-5: the rail follows root pointer order, and a pointer reorder reaches it", async ({
    page,
  }) => {
    const supabase = adminClient();
    const first = `${scratchSlug()}-r1`;
    const second = `${scratchSlug()}-r2`;
    try {
      const { data: rows, error } = await supabase
        .from("categories")
        .insert([
          { slug: first, name_en: first, is_active: true, allow_listings: true, display_order: 9200 },
          { slug: second, name_en: second, is_active: true, allow_listings: true, display_order: 9199 },
        ])
        .select("id, slug");
      if (error || !rows) throw new Error(`[e2e:c-5] seeding failed: ${error?.message}`);
      const id = (slug: string) => rows.find((row) => row.slug === slug)!.id;
      const { data: pointers, error: pointerError } = await supabase
        .from("category_tree_pointers")
        .insert([
          { parent_id: null, child_id: id(first), display_order: 9100 },
          { parent_id: null, child_id: id(second), display_order: 9101 },
        ])
        .select("id, child_id");
      if (pointerError || !pointers) {
        throw new Error(`[e2e:c-5] linking failed: ${pointerError?.message}`);
      }

      const railOrder = async () => {
        const scope = await openRailScope(page);
        const a = scope.getByTestId(`rail-category-${first}`);
        const b = scope.getByTestId(`rail-category-${second}`);
        await expect(a, "C-5 the first scratch root is not in the rail").toHaveCount(1, {
          timeout: 20_000,
        });
        await expect(b, "C-5 the second scratch root is not in the rail").toHaveCount(1);
        const testids = await scope
          .locator("[data-testid^='rail-category-']")
          .evaluateAll((els) => els.map((el) => el.getAttribute("data-testid")));
        return {
          first: testids.indexOf(`rail-category-${first}`),
          second: testids.indexOf(`rail-category-${second}`),
        };
      };

      await gotoReady(page, "/");
      const before = await railOrder();
      expect(before.first, "C-5 the rail did not follow the root pointers").toBeLessThan(
        before.second,
      );

      const pointerOf = (slug: string) => pointers.find((row) => row.child_id === id(slug))!.id;
      for (const [slug, order] of [
        [first, 9101],
        [second, 9100],
      ] as const) {
        const { error: swapError } = await supabase
          .from("category_tree_pointers")
          .update({ display_order: order })
          .eq("id", pointerOf(slug));
        if (swapError) throw new Error(`[e2e:c-5] swapping failed: ${swapError.message}`);
      }

      await expect
        .poll(
          async () => {
            await page.reload();
            await gotoReady(page, "/");
            const after = await railOrder();
            return after.second < after.first;
          },
          { timeout: 30_000, message: "C-5 the rail did not flip after the pointer swap" },
        )
        .toBe(true);
    } finally {
      await destroyCategory(first);
      await destroyCategory(second);
    }
  });
});
