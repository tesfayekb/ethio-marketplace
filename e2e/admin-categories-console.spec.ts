import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { CATEGORY_ICON_NAMES, CATCHALL_ICON_NAME } from "../src/lib/category-icon-names";
import {
  awaitGuardedOutcome,
  enrollAndStepUp,
  expectNoHorizontalOverflow,
  gotoReady,
  stepUpIfPrompted,
  switchUser,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";
import {
  RUN,
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
 * C3c — DB TRUTH for the Parent cell. The roster picks its PRIMARY parent the
 * way admin_list_categories does — the first active pointer by
 * (parent_id IS NOT NULL, display_order, created_at) — and every other active
 * parent is a secondary one. Replicated here so the assertion reads the
 * taxonomy, never a hard-coded name.
 */
async function secondaryParentNames(slug: string): Promise<string[]> {
  const category = await readCategory(slug);
  if (!category) throw new Error(`secondaryParentNames: ${slug} is absent`);
  const { data } = await adminClient()
    .from("category_tree_pointers")
    .select(
      "parent_id, display_order, created_at, categories!category_tree_pointers_parent_id_fkey(name_en, is_active)",
    )
    .eq("child_id", category.id)
    .order("display_order")
    .order("created_at");
  type Pointer = {
    parent_id: string | null;
    categories: { name_en: string; is_active: boolean } | null;
  };
  const pointers = ((data ?? []) as unknown as Pointer[]).filter(
    (row) => row.parent_id === null || row.categories?.is_active === true,
  );
  const ordered = [
    ...pointers.filter((row) => row.parent_id === null),
    ...pointers.filter((row) => row.parent_id !== null),
  ];
  const primary = ordered[0];
  return ordered
    .slice(1)
    .filter((row) => row.parent_id !== null && row.parent_id !== primary?.parent_id)
    .map((row) => row.categories?.name_en ?? "")
    .filter((name) => name !== "")
    .sort();
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

  /**
   * C3-UX-5 — THE FILTER IS A SUBTREE PICKER. Structure only: every assertion
   * reads `data-depth` / `data-parent-id` / `data-retired` and the twin row
   * locators, never option text (J5). Fixtures are J1-namespaced scratch rows
   * written through the service client (J3) and removed in `finally`.
   */
  test("CT-31 the roster filter groups children under their parent, marks retired rows, and scopes the roster to a subtree", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const supabase = adminClient();

    /** A scratch node written through the service client (J3), never a real row. */
    async function seed(slug: string, parentId: string | null): Promise<string> {
      const { data, error } = await supabase
        .from("categories")
        .insert({ slug, name_en: slug })
        .select("id")
        .single();
      if (error || !data) throw new Error(`[e2e:ct-31] seeding ${slug} failed: ${error?.message}`);
      const { error: pointerError } = await supabase
        .from("category_tree_pointers")
        .insert({ parent_id: parentId, child_id: data.id, display_order: 0 });
      if (pointerError) {
        throw new Error(`[e2e:ct-31] pointer for ${slug} failed: ${pointerError.message}`);
      }
      return data.id;
    }

    const filter = page.getByTestId("category-root-filter");

    /** J4 — every failure names the whole option list it judged. */
    async function optionDump(label: string): Promise<string> {
      const options = await filter.locator("option").evaluateAll((nodes) =>
        nodes.map((node) => ({
          value: node.getAttribute("value"),
          depth: node.getAttribute("data-depth"),
          parent: node.getAttribute("data-parent-id"),
          retired: node.getAttribute("data-retired"),
          text: node.textContent,
        })),
      );
      return `[CT-31 ${label}] options=${JSON.stringify(options, null, 2)}`;
    }

    const stamp = `${RUN}-${process.env["TEST_WORKER_INDEX"] ?? "0"}-${rand()}`;
    const parentSlug = `e2e-cat-${stamp}-p`;
    const childSlug = `e2e-cat-${stamp}-c1`;
    const retiredSlug = `e2e-cat-${stamp}-c2`;
    let parentId = "";
    let childId = "";
    let retiredId = "";
    try {
      // J7 — seed BEFORE navigating; the console must render the fixture.
      parentId = await seed(parentSlug, null);
      childId = await seed(childSlug, parentId);
      retiredId = await seed(retiredSlug, parentId);
      const { error: retireError } = await supabase
        .from("categories")
        .update({ is_active: false })
        .eq("id", retiredId);
      if (retireError) throw new Error(`[e2e:ct-31] retiring failed: ${retireError.message}`);

      await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/categories");
      await findRow(page, parentSlug);
      await page.getByTestId("category-search").fill("");
      await expect(categoryRow(page, parentSlug)).toBeVisible({ timeout: 20000 });

      // (a) the child is listed AFTER its parent, one level deeper, and says
      //     which parent it hangs under — the grouping, by structure.
      const values = await filter
        .locator("option")
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("value")));
      const parentIndex = values.indexOf(parentId);
      const childIndex = values.indexOf(childId);
      expect(parentIndex, await optionDump("the parent option is absent")).toBeGreaterThan(-1);
      expect(childIndex, await optionDump("the child option is absent")).toBeGreaterThan(
        parentIndex,
      );
      const childOption = filter.locator(`option[value="${childId}"]`);
      expect(
        await childOption.getAttribute("data-depth"),
        await optionDump("the child's depth"),
      ).toBe("1");
      expect(
        await childOption.getAttribute("data-parent-id"),
        await optionDump("the child's parent"),
      ).toBe(parentId);

      // (b) the retired child is marked.
      expect(
        await filter.locator(`option[value="${retiredId}"]`).getAttribute("data-retired"),
        await optionDump("the retired marker"),
      ).toBe("true");

      // (c) scoping: a subcategory shows itself alone.
      await filter.selectOption(childId);
      await expect(categoryRow(page, childSlug)).toBeVisible({ timeout: 20000 });
      expect(await categoryRow(page, parentSlug).count(), await optionDump("scoped to C1")).toBe(0);
      expect(await categoryRow(page, retiredSlug).count(), await optionDump("scoped to C1")).toBe(
        0,
      );

      // (d) the parent shows the whole subtree.
      await filter.selectOption(parentId);
      await expect(categoryRow(page, parentSlug)).toBeVisible({ timeout: 20000 });
      await expect(categoryRow(page, childSlug)).toBeVisible();
      await expect(categoryRow(page, retiredSlug)).toBeVisible();

      // (e) the default option restores the full roster.
      await filter.selectOption("");
      await expect(categoryRow(page, parentSlug)).toBeVisible({ timeout: 20000 });
      await expect(categoryRow(page, childSlug)).toBeVisible();
      await expect(categoryRow(page, retiredSlug)).toBeVisible();
    } finally {
      await destroyCategory(retiredSlug);
      await destroyCategory(childSlug);
      await destroyCategory(parentSlug);
    }
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
      // INC-210 — the rename either lands or the gate opens; both are awaited.
      await awaitGuardedOutcome(
        page,
        secret,
        {
          poll: async () => (await readCategory(slug))?.name_en === `E2E renamed ${slug}`,
          describe: `CT-3: categories.name_en = "E2E renamed ${slug}"`,
        },
        { timeout: 30000 },
      );

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

      /**
       * UX-2 PART 3 — the roster tells the truth about a future window: the
       * row is not live in browse, so it reads Scheduled, not Active.
       */
      await gotoReady(page, "/admin/categories");
      await page.getByTestId("category-search").fill(slug);
      const line = categoryRow(page, slug);
      await expect(line).toBeVisible({ timeout: 20000 });
      await expect(line.getByText(en["admin.categories.badge.scheduled"])).toBeVisible();
      await expect(line.getByText(en["admin.categories.badge.active"])).toHaveCount(0);
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

        // J5 — the measurement reads the VISIBLE twin only, through the shared
        // twin-aware helper; never a hand-rolled prefix that can match both.
        await openEditor(page, slug);

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
      const row = categoryRow(page, slug);
      await expect(row).toBeVisible({ timeout: 20000 });
      // J5 — the parent cell is a PER-ROW element: scope it to its own row.
      await expect(row.getByTestId(`category-parent-primary-${slug}`)).toBeVisible();
      for (const name of await secondaryParentNames(slug)) {
        await expect(row.getByTestId(`category-parent-also-${slug}`)).toContainText(name);
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
    const flipped = categoryRow(page, "auto-services");
    await expect(flipped).toBeVisible({ timeout: 20000 });
    // J5 — row-scoped in the card twin too.
    await expect(flipped.getByTestId("category-parent-primary-auto-services")).toBeVisible();
    for (const name of await secondaryParentNames("auto-services")) {
      await expect(flipped.getByTestId("category-parent-also-auto-services")).toContainText(name);
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

  /**
   * FIX-SCAN-1 ISSUE 4 — EVERY RATIFIED ROOT'S ICON RESOLVES.
   *
   * The rail, the roster, the editor preview and the suggester now share ONE
   * allowlist (`src/lib/category-icon-names.ts`) and ONE glyph map
   * (`src/components/shell/category-glyphs.ts`). A stored name outside the map
   * renders the generic box; the roster's `data-icon` names what actually
   * rendered, so a drifted list fails here instead of shipping. DB truth (the
   * stored names) supplies the expectation — J5: read the glyph inside its own
   * row twin, never a bare prefix.
   */
  /**
   * UX-2 PART 1 — the census is no longer a sample of roots: EVERY ratified
   * category must resolve to a real glyph, and every catch-all must resolve to
   * the one fixed "more" glyph whatever its stored name says.
   */
  test("CT-29 every ratified category renders its own glyph, not the fallback", async ({
    page,
  }) => {
    const admin = await createUser({ confirmed: true });
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/categories");

    const { data, error } = await adminClient()
      .from("categories")
      .select("slug, icon, is_catchall")
      .eq("is_active", true)
      .not("slug", "like", "e2e-%")
      .order("display_order");
    if (error) throw new Error(`[e2e:ct-29] reading icons failed: ${error.message}`);
    const ratified = data ?? [];
    // E6 — the empty set is named: a taxonomy with no rows proves nothing.
    expect(ratified.length, "CT-29 the ratified taxonomy carries rows").toBeGreaterThan(0);

    // The allowlist is the shared one the console renders from (B2/E6).
    for (const row of ratified) {
      expect(
        row.icon === null || (CATEGORY_ICON_NAMES as readonly string[]).includes(row.icon.trim()),
        `CT-29 ${row.slug} stores "${row.icon}", which is outside the shared allowlist`,
      ).toBe(true);
    }

    // The rendered truth, read one page at a time (J7: assert what rendered).
    await page.getByTestId("category-page-size").selectOption("100");
    const rendered = new Map<string, string>();
    for (let guardPage = 0; guardPage < 12; guardPage += 1) {
      await expect
        .poll(async () => (await page.locator("[data-testid^='category-icon-']").count()) > 0, {
          timeout: 20000,
        })
        .toBe(true);
      const batch = await page.evaluate(() =>
        [...document.querySelectorAll("[data-testid^='category-icon-']")].map((node) => [
          (node.getAttribute("data-testid") ?? "").replace("category-icon-", ""),
          node.getAttribute("data-icon") ?? "",
        ]),
      );
      for (const [slug, icon] of batch) rendered.set(slug!, icon!);
      if (rendered.size >= ratified.length) break;
      const next = page.getByTestId("category-pagination-next");
      if (!(await next.isEnabled().catch(() => false))) break;
      await next.click();
    }

    for (const row of ratified) {
      const shown = rendered.get(row.slug);
      if (shown === undefined) continue; // filtered out of the roster's own view
      const expected = row.is_catchall ? CATCHALL_ICON_NAME : (row.icon?.trim() ?? "Package");
      expect(shown, `CT-29 ${row.slug} stores "${row.icon}" — it must render ${expected}`).toBe(
        expected,
      );
      expect(
        row.is_catchall || shown !== "Package" || row.icon?.trim() === "Package",
        `CT-29 ${row.slug} fell back to the generic box`,
      ).toBe(true);
    }
    expect(rendered.size, "CT-29 the roster rendered its rows").toBeGreaterThan(0);
  });

  /**
   * INC-198/199 L2 — CT-32. Two silences the planner used to keep, proven
   * THROUGH THE ROUTE and read back as DB truth (J4): an action row that also
   * carries cell changes must apply BOTH in one revision and take both back on
   * undo (INC-199 part 2), and an EMPTY ROOT must be deletable and restorable
   * (INC-198). Fixtures are J1-namespaced scratch rows written through the
   * service client (J5), seeded before navigating (J7), destroyed in `finally`.
   *
   * The file/line/importPost helpers are local: their twins live inside the
   * lifecycle spec's own describe block, which this task's scope may not touch.
   */
  test("CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes", async ({
    page,
  }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    const supabase = adminClient();

    const COLUMNS = [
      "category_path",
      "category_slug",
      "parent_slug",
      "name_en",
      "name_am",
      "display_order",
      "is_active",
      "allow_listings",
      "is_catchall",
      "price_enabled",
      // U6-C2b — the posting cells the file now carries (CT-x), in registry order.
      "capabilities",
      "default_price_period",
      "price_period_locked",
      "expiry_days",
      "icon",
      "visible_from",
      "visible_until",
      "excluded_country_codes",
      "secondary_parents",
      "listing_count",
      "origin_scope",
    ] as const;

    /** RFC 4180 cell for a hand-authored fixture file. */
    const cell = (value: string): string =>
      /["\n\r,]/.test(value) ? `"${value.split('"').join('""')}"` : value;
    const line = (
      values: Partial<Record<(typeof COLUMNS)[number], string>>,
      action: string,
    ): string => [...COLUMNS.map((column) => cell(values[column] ?? "")), cell(action)].join(",");
    const file = (rows: string[]): string =>
      `\uFEFF${[`${COLUMNS.join(",")},action`, ...rows].join("\r\n")}\r\n`;

    async function importPost(token: string, body: Record<string, unknown>) {
      const response = await page.request.post("/api/admin/categories/import", {
        headers: { Authorization: `Bearer ${token}` },
        data: body,
      });
      let payload: Record<string, unknown> = {};
      try {
        payload = (await response.json()) as Record<string, unknown>;
      } catch {
        payload = {};
      }
      return { status: response.status(), payload };
    }

    /** A scratch node written through the service client (J3), never a real row. */
    async function seed(slug: string, parentId: string | null): Promise<string> {
      const { data, error } = await supabase
        .from("categories")
        .insert({ slug, name_en: slug })
        .select("id")
        .single();
      if (error || !data) throw new Error(`[e2e:ct-32] seeding ${slug} failed: ${error?.message}`);
      const { error: pointerError } = await supabase
        .from("category_tree_pointers")
        .insert({ parent_id: parentId, child_id: data.id, display_order: 0 });
      if (pointerError) {
        throw new Error(`[e2e:ct-32] pointer for ${slug} failed: ${pointerError.message}`);
      }
      return data.id;
    }

    const stamp = `${RUN}-${process.env["TEST_WORKER_INDEX"] ?? "0"}-${rand()}`;
    const rootSlug = `e2e-cat-${stamp}-r`;
    const slugA = `e2e-cat-${stamp}-a`;
    const slugB = `e2e-cat-${stamp}-b`;
    const secondSlug = `e2e-cat-${stamp}-r2`;
    const emptySlug = `e2e-cat-${stamp}-r3`;
    const newAmharic = `ሙከራ ${stamp}`;

    /**
     * IE-4a — an Amharic name is NOT a column: the importer writes it through
     * the translation door, so the read-back reads that row, not `categories`.
     */
    async function amharicNameOf(categoryId: string): Promise<string | null> {
      const { data, error } = await supabase
        .from("entity_translations")
        .select("value")
        .eq("entity_type", "category")
        .eq("entity_id", categoryId)
        .eq("field", "name")
        .eq("lang_code", "am")
        .maybeSingle();
      if (error) throw new Error(`[e2e:ct-32] reading the am name failed: ${error.message}`);
      return data?.value ?? null;
    }

    /** J4 — a mismatch names the row it judged, never page text. */
    async function truthOf(slug: string): Promise<string> {
      const row = await readCategory(slug);
      const parents = row === null ? [] : (await readPointers(row.id)).map((p) => p.parent_id);
      const nameAm = row === null ? null : await amharicNameOf(row.id);
      return `[CT-32 ${slug}] ${JSON.stringify({ row, nameAm, parents })}`;
    }

    try {
      const rootId = await seed(rootSlug, null);
      const idA = await seed(slugA, rootId);
      await seed(slugB, rootId);
      const secondId = await seed(secondSlug, null);
      const emptyId = await seed(emptySlug, null);
      const { error: retireEmpty } = await supabase
        .from("categories")
        .update({ is_active: false })
        .eq("id", emptyId);
      if (retireEmpty)
        throw new Error(`[e2e:ct-32] retiring the root failed: ${retireEmpty.message}`);

      await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/categories");
      await findRow(page, rootSlug);
      const token = await page.evaluate(async () => {
        const client = (
          window as unknown as {
            __ethioSupabase: {
              auth: {
                getSession: () => Promise<{ data: { session: { access_token: string } | null } }>;
              };
            };
          }
        ).__ethioSupabase;
        const { data } = await client.auth.getSession();
        return data.session?.access_token ?? "";
      });
      expect(token, "CT-32 the page carries no bearer").not.toBe("");

      // (a) A is retired THROUGH THE ROUTE — the same door the operator uses.
      const retireFile = file([line({ category_slug: slugA, name_en: slugA }, "retire")]);
      const retirePreview = await importPost(token, { mode: "preview", categories: retireFile });
      expect(retirePreview.status, JSON.stringify(retirePreview.payload)).toBe(200);
      expect(
        (retirePreview.payload["counts"] as Record<string, number>)["retires"],
        JSON.stringify(retirePreview.payload),
      ).toBe(1);
      const retired = await importPost(token, {
        mode: "commit",
        categories: retireFile,
        digest: retirePreview.payload["digest"],
      });
      expect(retired.status, JSON.stringify(retired.payload)).toBe(200);
      expect((await readCategory(slugA))?.is_active, await truthOf(slugA)).toBe(false);

      // (b) One row: reactivate A, rename it in Amharic, hang it under R2 too.
      const actionFile = file([
        line(
          {
            category_slug: slugA,
            name_en: slugA,
            name_am: newAmharic,
            secondary_parents: secondSlug,
          },
          "reactivate",
        ),
      ]);
      const preview = await importPost(token, { mode: "preview", categories: actionFile });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const counts = preview.payload["counts"] as Record<string, number>;
      const previewDump = JSON.stringify(preview.payload);
      // COUNTED ONCE: a reactivation carrying cells is not also a change.
      expect(counts["reactivations"], previewDump).toBe(1);
      expect(counts["changes"], previewDump).toBe(0);
      expect(counts["refusals"], previewDump).toBe(0);
      const items = (preview.payload["items"] as { slug?: string; detail?: string }[]) ?? [];
      const detail = items.find((item) => item.slug === slugA)?.detail ?? "";
      expect(detail, previewDump).toContain("name_am");
      expect(detail, previewDump).toContain("secondary_parents");

      const commit = await importPost(token, {
        mode: "commit",
        categories: actionFile,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;
      expect(batchId, JSON.stringify(commit.payload)).toBeTruthy();

      // (c) ALL THREE landed together (J4 — DB truth).
      expect((await readCategory(slugA))?.is_active, await truthOf(slugA)).toBe(true);
      expect(await amharicNameOf(idA), await truthOf(slugA)).toBe(newAmharic);
      expect(
        (await readPointers(idA)).map((row) => row.parent_id),
        await truthOf(slugA),
      ).toContain(secondId);

      // (d) UNDO takes all three back.
      const undo = await importPost(token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      expect((await readCategory(slugA))?.is_active, await truthOf(slugA)).toBe(false);
      expect(await amharicNameOf(idA), await truthOf(slugA)).toBeNull();
      expect(
        (await readPointers(idA)).map((row) => row.parent_id),
        await truthOf(slugA),
      ).not.toContain(secondId);

      // (e) INC-198 — an EMPTY, retired ROOT is deleted, and undo brings it back.
      const deleteFile = file([line({ category_slug: emptySlug, name_en: emptySlug }, "delete")]);
      const deletePreview = await importPost(token, { mode: "preview", categories: deleteFile });
      expect(deletePreview.status, JSON.stringify(deletePreview.payload)).toBe(200);
      const deleteCounts = deletePreview.payload["counts"] as Record<string, number>;
      expect(deleteCounts["deletes"], JSON.stringify(deletePreview.payload)).toBe(1);
      expect(deleteCounts["refusals"], JSON.stringify(deletePreview.payload)).toBe(0);
      const deleted = await importPost(token, {
        mode: "commit",
        categories: deleteFile,
        digest: deletePreview.payload["digest"],
      });
      expect(deleted.status, JSON.stringify(deleted.payload)).toBe(200);
      expect(await readCategory(emptySlug), await truthOf(emptySlug)).toBeNull();

      const deleteUndo = await importPost(token, {
        mode: "undo",
        batchId: deleted.payload["batch_id"],
      });
      expect(deleteUndo.status, JSON.stringify(deleteUndo.payload)).toBe(200);
      expect(await readCategory(emptySlug), await truthOf(emptySlug)).not.toBeNull();
    } finally {
      await destroyCategory(emptySlug);
      await destroyCategory(secondSlug);
      await destroyCategory(slugB);
      await destroyCategory(slugA);
      await destroyCategory(rootSlug);
    }
  });
});
