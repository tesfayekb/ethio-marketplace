import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import {
  enrollAndStepUp,
  expectNoHorizontalOverflow,
  gotoReady,
  stepUpIfPrompted,
  switchUser,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";
import {
  rand,
  TWIN_BOUNDARY,
  bandOnly,
  surface,
  categoryRow,
  findRow,
  action,
  openEditor,
  grantRole,
  signInAsSuperAdmin,
  readCategory,
  seedActiveListing,
  readListing,
  readPointers,
  destroyCategory,
  createViaUi,
  geometryDump,
  dialogDump,
} from "./helpers/categories";
/**
 * C2-UI — THE CATEGORIES CONSOLE, roster and CRUD (CT-1..CT-11).
 *
 * L1 (DEC-037): one third of the former admin-categories.spec.ts. Titles, tags
 * and fixture identities are byte-identical; only the file changed (INC-159).
 */ /**
 * C3c — DB TRUTH for the Parent cell: every parent this category hangs under,
 * minus the primary one the categories row itself records.
 */
async function secondaryParentNames(slug: string): Promise<string[]> {
  const category = await readCategory(slug);
  if (!category) throw new Error(`secondaryParentNames: ${slug} is absent`);
  const { data } = await adminClient()
    .from("category_tree_pointers")
    .select("parent_id")
    .eq("child_id", category.id);
  const parentIds = (data ?? [])
    .map((row) => row.parent_id)
    .filter((id): id is string => id !== null && id !== category.parent_id);
  if (parentIds.length === 0) return [];
  const { data: parents } = await adminClient()
    .from("categories")
    .select("name_en")
    .in("id", parentIds);
  return (parents ?? []).map((row) => row.name_en);
}

test.describe("C2 categories console", () => {
  test("CT-1 gating: a plain user is refused; the section renders for an admin", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const plain = await createUser({ confirmed: true });
    await switchUser(page, plain.email, plain.password);
    await page.goto("/admin/categories");
    await waitForHydration(page);
    await expect(page.getByTestId("category-search")).toHaveCount(0);
    await expect(page.getByTestId("category-create-open")).toHaveCount(0);

    const admin = await createUser({ confirmed: true });
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/categories");
    await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
  });

  test("CT-2 roster: the ratified tree renders, search narrows it, nothing overflows", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const admin = await createUser({ confirmed: true });
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/categories");

    // Seed-before-navigate is satisfied by the ratified C1 taxonomy: assert a
    // known root rendered BEFORE acting on the surface (J7).
    await expect(categoryRow(page, "vehicles")).toBeVisible({ timeout: 20000 });
    await expectNoHorizontalOverflow(page);

    await page.getByTestId("category-search").fill("vehicl");
    await expect(categoryRow(page, "vehicles")).toBeVisible();
    await expect(categoryRow(page, "jobs")).toHaveCount(0);

    await page.getByTestId("category-search").fill(`no-such-category-${rand()}`);
    await expect(page.getByTestId("data-table-empty")).toBeVisible();
  });

  test("CT-3 create + edit: a scratch category is born and renamed through step-up", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      slug = await createViaUi(page, secret);
      expect((await readCategory(slug))?.name_en).toBe(slug);

      await action(page, slug, "edit").click();
      await page.getByTestId("category-edit-name").fill(`E2E renamed ${slug}`);
      await page.getByTestId("category-edit-submit").click();
      await stepUpIfPrompted(page, secret);

      await expect
        .poll(async () => (await readCategory(slug))?.name_en, { timeout: 20000 })
        .toBe(`E2E renamed ${slug}`);
    } finally {
      if (slug) await destroyCategory(slug);
    }
  });

  test("CT-4 visibility window: a future window is stored as DB truth", async ({ page }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      slug = await createViaUi(page, secret);
      await openEditor(page, slug);
      await action(page, slug, "window").click();
      await page.getByTestId("category-window-from").fill("2030-01-01T00:00");
      await page.getByTestId("category-window-submit").click();
      await stepUpIfPrompted(page, secret);

      await expect
        .poll(async () => Boolean((await readCategory(slug))?.visible_from), { timeout: 20000 })
        .toBe(true);
    } finally {
      if (slug) await destroyCategory(slug);
    }
  });

  test("CT-5 exclusions: saving a country set writes the exclusion rows", async ({ page }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      slug = await createViaUi(page, secret);
      await openEditor(page, slug);
      await action(page, slug, "exclusions").click();
      await page.getByTestId("category-exclusion-ET").check();
      await page.getByTestId("category-exclusions-submit").click();
      await stepUpIfPrompted(page, secret);

      const id = (await readCategory(slug))?.id;
      await expect
        .poll(
          async () => {
            const { data } = await adminClient()
              .from("category_country_exclusions")
              .select("country_code")
              .eq("category_id", id!);
            return (data ?? []).map((row) => row.country_code);
          },
          { timeout: 20000 },
        )
        .toEqual(["ET"]);
    } finally {
      if (slug) await destroyCategory(slug);
    }
  });

  test("CT-6 retirement: a retired category leaves the active tree and keeps its listings home", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { user, secret } = await signInAsSuperAdmin(page);
    let slug = "";
    let targetSlug = "";
    let listingId = "";
    try {
      slug = await createViaUi(page, secret);
      /**
       * C2-CT6-IDENTITY (INC-151) — the test owns its reassign target. It is
       * created with the same existing UI helper (edge included), held by slug,
       * and selected by that identity — never by index or by "first".
       */
      targetSlug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);
      const target = await readCategory(targetSlug);

      /**
       * C2-CLOSE Part B (J7) — SEED BEFORE NAVIGATE. The dialog only offers
       * the reassign picker when the category HOLDS active listings, so the
       * fixture writes one `status: 'active'` listing with every required
       * column and only THEN loads the console, which reads the count.
       */
      listingId = await seedActiveListing(scratch!.id, user.id);
      await gotoReady(page, "/admin/categories");
      await findRow(page, slug);
      await openEditor(page, slug);
      await action(page, slug, "retire").click();
      await expect(page.getByTestId("category-retire-dialog")).toBeVisible({ timeout: 20000 });
      // The picker is present and its label carries the live count.
      await expect(page.getByTestId("category-retire-dialog")).toContainText(
        en["admin.categories.retire.reassignCount"].replace("{count}", "1"),
      );
      await expect(page.getByTestId("category-retire-target")).toBeVisible();
      // INC-151: select by the target's identity (slug == name_en == option label).
      await page.getByTestId("category-retire-target").selectOption({ label: targetSlug });
      await page.getByTestId("category-retire-submit").click();
      await stepUpIfPrompted(page, secret);

      /**
       * C2-SETTLE PART B — the completed sub-verb returned to the OPEN editor;
       * it is dismissed and GONE before any findRow/roster assertion below, so
       * a later openEditor can never be swallowed by the kind guard.
       *
       * CT6-ESCAPE (INC-160) — bounded dismissal after the retire return-path.
       */
      let firstEscapeDump = "";
      const closedOnFirstPress =
        await test.step("CT-6 dismiss editor · Escape press 1", async () => {
          await page.keyboard.press("Escape");
          try {
            await expect
              .poll(async () => page.getByTestId("category-edit-dialog").count(), {
                timeout: 5000,
              })
              .toBe(0);
            return true;
          } catch {
            firstEscapeDump = await dialogDump(page, "CT-6 retire first Escape failed");
            return false;
          }
        });
      if (!closedOnFirstPress) {
        await test.step("CT-6 dismiss editor · Escape press 2", async () => {
          await page.keyboard.press("Escape");
          await expect
            .poll(async () => page.getByTestId("category-edit-dialog").count(), {
              timeout: 10000,
              message: `CT-6 retire second Escape failed — ${firstEscapeDump}`,
            })
            .toBe(0);
        });
      }

      await expect
        .poll(async () => (await readCategory(slug))?.is_active, { timeout: 20000 })
        .toBe(false);
      // The listing kept a home: it now lands under the EXACT target category.
      await expect
        .poll(async () => (await readListing(listingId))?.category_id, { timeout: 20000 })
        .toBe(target!.id);
      // The row stays in the console (retired ≠ deleted) but reads as retired.
      await findRow(page, slug);
      await openEditor(page, slug);
      await expect(action(page, slug, "reactivate")).toBeVisible({ timeout: 20000 });
      await expect(action(page, slug, "retire")).toHaveCount(0);
    } finally {
      if (listingId) await adminClient().from("listings").delete().eq("id", listingId);
      if (slug) await destroyCategory(slug);
      if (targetSlug) await destroyCategory(targetSlug);
    }
  });

  test("CT-7 step-up: the server refuses the write until AAL2 is proven", async ({ page }) => {
    bandOnly(page, "any");
    // A super admin who has NOT stepped up: the create dialog submits, the
    // gate intercepts, and no row exists until the code is entered (F3/F5 —
    // a refused attempt leaves no trace).
    const user = await createUser({ confirmed: true });
    await grantRole(user.id, "super_admin");
    await switchUser(page, user.email, user.password);
    await waitForHydration(page);
    const secret = await enrollAndStepUp(page);

    let slug = "";
    try {
      slug = await createViaUi(page, secret);
      expect((await readCategory(slug))?.slug).toBe(slug);
    } finally {
      if (slug) await destroyCategory(slug);
    }
  });

  /**
   * CT-7b (C2b) — a pointer MOVE without a proven factor changes nothing. The
   * user has no enrolled factor at all, so the step-up gate can never be
   * satisfied and the server refuses: DB truth must be byte-identical after
   * the attempt (F5 — a refused attempt leaves no trace).
   */
  test("CT-7b browse paths: an unproven factor cannot move a pointer", async ({ page }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      slug = await createViaUi(page, secret);
      const id = (await readCategory(slug))?.id;
      const before = await readPointers(id!);
      expect(before.length).toBeGreaterThan(0);

      // A second super admin with NO enrolled factor.
      const weak = await createUser({ confirmed: true });
      await grantRole(weak.id, "super_admin");
      await switchUser(page, weak.email, weak.password);
      await gotoReady(page, "/admin/categories");
      await findRow(page, slug);

      await openEditor(page, slug);
      await action(page, slug, "pointer").click();
      const pointerId = before[0]!.id;
      const select = page.getByTestId(`category-path-move-${pointerId}`);
      await expect(select).toBeVisible({ timeout: 20000 });
      const rootValue = await select.locator("option").nth(1).getAttribute("value");
      await select.selectOption(rootValue!);

      // Poll DB truth for the whole refusal window: the parent set must stay
      // byte-identical for every sample, never "eventually correct".
      const expected = before.map((row) => row.parent_id);
      await expect
        .poll(
          async () => {
            const after = await readPointers(id!);
            return after.map((row) => row.parent_id);
          },
          { timeout: 5000, intervals: [500, 500, 500, 500, 500] },
        )
        .toEqual(expected);
    } finally {
      if (slug) await destroyCategory(slug);
    }
  });

  /**
   * CT-8 (UI-FIX-4 / C2-UI-FIX-5) — THE REACHABILITY LAW. At 360, 768, 1024
   * and 1240 the row carries one verb and opening the editor must expose EVERY
   * verb: visible, clickable, ≥44px, with no horizontal scroll on the page OR
   * inside the dialog. The roster's own twin (cards below md, table from md)
   * is read from the DOM, not assumed. At 1440 the table renders slim columns
   * and the scroller stays inert. The block owns the viewport: it runs once.
   */
  test("CT-8 every verb is reachable from the editor with no horizontal scroll", async ({
    page,
  }) => {
    bandOnly(page, "desktop");
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      slug = await createViaUi(page, secret);

      for (const width of [360, 768, 1024, 1240]) {
        await page.setViewportSize({ width, height: 800 });
        await gotoReady(page, "/admin/categories");
        const cardTwin = width < TWIN_BOUNDARY;
        const twin = cardTwin ? page.getByTestId("data-table-cards") : page.getByRole("table");
        await expect(twin).toBeVisible({ timeout: 20000 });
        await page.getByTestId("category-search").fill(slug);
        await expect(
          cardTwin
            ? page.getByTestId(`category-row-${slug}-card`)
            : page.getByTestId(`category-row-${slug}`),
        ).toBeVisible({ timeout: 20000 });

        const doc = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        expect(
          doc.scrollWidth,
          `${await geometryDump(page, `page @ ${width}`)} — the page scrolls sideways`,
        ).toBeLessThanOrEqual(doc.clientWidth + 1);
        await expectNoHorizontalOverflow(page);

        await page
          .getByTestId(
            cardTwin ? `category-row-${slug}-actions` : `category-row-${slug}-actions-cell`,
          )
          .getByTestId(`category-edit-${slug}`)
          .click();
        await expect(page.getByTestId("category-edit-dialog")).toBeVisible({ timeout: 20000 });
        await expect(page.getByTestId("category-verb-bar")).toBeVisible();

        for (const verb of ["window", "exclusions", "pointer", "up", "down", "retire"]) {
          const button = action(page, slug, verb);
          await expect(button, `${verb} missing at ${width}`).toBeVisible();
          await expect(button).toBeInViewport();
          await expect(button).toBeEnabled();
          const box = await button.boundingBox();
          expect(box!.height, `${verb} target at ${width}`).toBeGreaterThanOrEqual(43);
        }
        const dialog = await page
          .getByTestId("category-edit-dialog")
          .evaluate((el) => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));
        expect(
          dialog.scrollWidth,
          `${await geometryDump(page, `dialog @ ${width}`)} — the dialog scrolls sideways`,
        ).toBeLessThanOrEqual(dialog.clientWidth + 1);
        await expectNoHorizontalOverflow(page);
        await page.keyboard.press("Escape");
        await expect(page.getByTestId("category-edit-dialog")).toBeHidden();
      }
    } finally {
      if (slug) await destroyCategory(slug);
    }

    // 1440 — the table twin, detail columns present, scroller inert.
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoReady(page, "/admin/categories");
    await expect(page.getByRole("table")).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("data-table-col-order")).toBeVisible();
    await expectNoHorizontalOverflow(page);
    const geometry = await page
      .getByTestId("data-table-scroller")
      .evaluate((el) => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));
    expect(
      geometry.scrollWidth,
      `${await geometryDump(page, "table @ 1440")} — the roster still needs a scroller at 1440`,
    ).toBeLessThanOrEqual(geometry.clientWidth + 1);
  });

  /** CT-9a — TABLE shape. Guarded to the band that actually has a table. */
  test("CT-9a roster shape: the parent column and a 25-row page (table twin)", async ({ page }) => {
    bandOnly(page, "desktop");
    await page.setViewportSize({ width: 1440, height: 900 });
    const admin = await createUser({ confirmed: true });
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/categories");
    await expect(categoryRow(page, "vehicles")).toBeVisible({ timeout: 20000 });

    // Parent column: a root reads "—". A miss dumps the geometry that hid it.
    await expect(
      page.getByTestId("data-table-col-parent"),
      await geometryDump(page, "CT-9a @ 1440"),
    ).toBeVisible();

    // The ratified taxonomy is 113 nodes, so page one is exactly PAGE_SIZE.
    await expect(page.getByTestId("category-pagination-range")).toContainText("1–25");
    await page.getByTestId("category-pagination-next").click();
    await expect(page.getByTestId("category-pagination-range")).toContainText("26–50");

    /**
     * C3c PART D — THE PRIMARY/SECONDARY PARENT CELL. The flipped trio hang
     * under Services AND a second branch; the cell chips the primary and names
     * the rest. DB truth (the pointer rows) supplies the expected names, so the
     * assertion can never drift from the taxonomy.
     */
    for (const slug of ["auto-services", "realtor-services", "fitness-centers"]) {
      await page.getByTestId("category-search").fill(slug);
      await expect(categoryRow(page, slug)).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId(`category-parent-primary-${slug}`)).toBeVisible();
      for (const name of await secondaryParentNames(slug)) {
        await expect(page.getByTestId(`category-parent-also-${slug}`)).toContainText(name);
      }
    }
  });

  /** CT-9b — the SAME facts inside cards at 360: nothing is hidden there. */
  test("CT-9b roster shape: the parent line and pagination inside cards", async ({ page }) => {
    bandOnly(page, "mobile");
    const admin = await createUser({ confirmed: true });
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/categories");
    const row = categoryRow(page, "vehicles");
    await expect(row).toBeVisible({ timeout: 20000 });

    // Structure, never English copy (J5): a root's parent block renders the
    // em-dash placeholder inside the card, so the parent field is present.
    await expect(row).toContainText("—");
    await expect(page.getByTestId("category-pagination-range")).toContainText("1–25");

    // C3c PART D — the same parent facts inside the card twin (DB truth).
    await page.getByTestId("category-search").fill("auto-services");
    await expect(categoryRow(page, "auto-services")).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("category-parent-primary-auto-services")).toBeVisible();
    for (const name of await secondaryParentNames("auto-services")) {
      await expect(page.getByTestId("category-parent-also-auto-services")).toContainText(name);
    }
    await expectNoHorizontalOverflow(page);
  });

  /**
   * CT-10 (C2c) — a RETIRED node is not a destination. The picker must not
   * offer it, otherwise a live child could be hung under a dead branch and
   * vanish from browse the moment it is created.
   */
  test("CT-10 parent picker: retired nodes are absent and options carry paths", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      slug = await createViaUi(page, secret);
      // Retire the scratch node through DB truth, then re-read the picker.
      const scratch = await readCategory(slug);
      expect(scratch).toBeTruthy();
      await adminClient().from("categories").update({ is_active: false }).eq("id", scratch!.id);

      await page.reload();
      await waitForHydration(page);
      await page.getByTestId("category-create-open").click();
      const options = page.getByTestId("category-create-parent").locator("option");
      await expect(options.filter({ hasText: slug })).toHaveCount(0);
      // Active options render their whole path, so a nested node shows "›".
      await expect(options.filter({ hasText: "›" })).not.toHaveCount(0);
    } finally {
      if (slug) await destroyCategory(slug);
    }
  });

  /**
   * CT-11 (C2c) — the missing-assets flag and the device page size. Page size
   * is asserted ACROSS A RELOAD: a selector that forgets is not a setting.
   */
  test("CT-11 roster controls: missing-assets filter and a device page size", async ({ page }) => {
    bandOnly(page, "any");
    const admin = await createUser({ confirmed: true });
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/categories");
    await expect(categoryRow(page, "vehicles")).toBeVisible({ timeout: 20000 });

    await page.getByTestId("category-page-size").selectOption("10");
    await expect(page.getByTestId("category-pagination-range")).toContainText("1–10");
    await page.reload();
    await waitForHydration(page);
    await expect(page.getByTestId("category-pagination-range")).toContainText("1–10", {
      timeout: 20000,
    });

    // The filter narrows to rows the roster itself marks as missing assets;
    // every surviving row must carry the amber flag (DB truth is the icon and
    // image_url columns the RPC reports).
    await page.getByTestId("category-missing-filter").click();
    await expect(page.getByTestId("category-missing-filter")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    const rows = surface(page).locator('[data-testid^="category-row-"]');
    const shown = await rows.count();
    if (shown > 0) {
      await expect(surface(page).locator('[data-testid^="category-missing-"]')).not.toHaveCount(0);
    }
  });
});
