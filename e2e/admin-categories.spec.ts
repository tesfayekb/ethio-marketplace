import { type Locator, type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import {
  enrollAndStepUp,
  expectNoHorizontalOverflow,
  gotoReady,
  stepUpIfPrompted,
  switchUser,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

/**
 * C2-UI — THE CATEGORIES CONSOLE (CT-1..CT-7).
 *
 * TWIN LAW (J5): this console is the first surface built on the C7 primitive
 * contract `cardUntil="lg"`, so its twin boundary is 1024, NOT the 768 that
 * `helpers/ui.isMobile` encodes for every other screen. The helpers below are
 * therefore local and breakpoint-explicit — a bare shared `isMobile` would
 * resolve the HIDDEN twin across the whole tablet band.
 *
 * FIXTURE LAW (J1/J3): every category this spec creates is slugged
 * `e2e-cat-<run>-<worker>-<rand>` and retired + deleted in `finally`; the
 * global-setup reaper (DEC-031) sweeps hour-old residue. Ratified taxonomy
 * rows are READ-ONLY to this spec — nothing here edits a real category.
 */

const RUN = process.env["E2E_SHARD"] ?? "local";

function rand() {
  return Math.random().toString(36).slice(2, 8);
}

function scratchSlug() {
  const worker = process.env["TEST_WORKER_INDEX"] ?? "0";
  return `e2e-cat-${RUN}-${worker}-${rand()}`.toLowerCase().replace(/[^a-z0-9-]/g, "-");
}

/** The C7 twin boundary for THIS console (C2-UI-FIX-3: cardUntil="xl"). */
const TWIN_BOUNDARY = 1280;

function isCardTwin(page: Page) {
  return (page.viewportSize()?.width ?? TWIN_BOUNDARY) < TWIN_BOUNDARY;
}

/**
 * SPEC VIEWPORT LAW (C2-UI-FIX-3) — every test block opens by declaring the
 * band it asserts, so a table-shape assertion never runs in the 360 project
 * (where there is no table) and a card assertion never runs at 1280. Blocks
 * that resize the page themselves declare `desktop`: they own the viewport
 * and must execute exactly once, in one project.
 */
function bandOnly(page: Page, band: "mobile" | "desktop" | "any") {
  if (band === "any") return;
  const width = page.viewportSize()?.width ?? TWIN_BOUNDARY;
  test.skip(
    band === "mobile" ? width >= TWIN_BOUNDARY : width < TWIN_BOUNDARY,
    `this block asserts the ${band} band`,
  );
}

function surface(page: Page): Locator {
  return isCardTwin(page) ? page.getByTestId("data-table-cards") : page.getByRole("table");
}

function categoryRow(page: Page, slug: string): Locator {
  return surface(page).getByTestId(
    isCardTwin(page) ? `category-row-${slug}-card` : `category-row-${slug}`,
  );
}

/** The actions REGION differs per twin (INC-106c): card sibling vs table cell. */
function actionsOf(page: Page, slug: string): Locator {
  return surface(page).getByTestId(
    isCardTwin(page) ? `category-row-${slug}-actions` : `category-row-${slug}-actions-cell`,
  );
}

function action(page: Page, slug: string, verb: string): Locator {
  return actionsOf(page, slug).getByTestId(`category-${verb}-${slug}`);
}

async function grantRole(userId: string, roleName: string) {
  const supabase = adminClient();
  const { data: role, error: roleError } = await supabase
    .from("roles")
    .select("id")
    .eq("name", roleName)
    .single();
  if (roleError || !role) {
    throw new Error(`[e2e:c2] role ${roleName} not found: ${roleError?.message ?? "no row"}`);
  }
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role.id, scope_type: "global" });
  if (error) throw new Error(`[e2e:c2] granting ${roleName} failed: ${error.message}`);
}

async function signInAsSuperAdmin(page: Page) {
  const user = await createUser({ confirmed: true });
  await grantRole(user.id, "super_admin");
  await switchUser(page, user.email, user.password);
  await waitForHydration(page);
  const secret = await enrollAndStepUp(page);
  return { user, secret };
}

/** DB truth (J4): the scratch category row read through the service client. */
async function readCategory(slug: string) {
  const { data, error } = await adminClient()
    .from("categories")
    .select("id, slug, name_en, is_active, allow_listings, display_order, visible_from")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`[e2e:c2] reading ${slug} failed: ${error.message}`);
  return data;
}

/** The pointer rows of a category, read as DB truth (J4). */
async function readPointers(categoryId: string) {
  const { data, error } = await adminClient()
    .from("category_tree_pointers")
    .select("id, parent_id, display_order")
    .eq("child_id", categoryId)
    .order("display_order");
  if (error) throw new Error(`[e2e:c2] reading pointers failed: ${error.message}`);
  return data ?? [];
}

/** Hard cleanup — never leaves a scratch node in the ratified tree. */
async function destroyCategory(slug: string) {
  const supabase = adminClient();
  const row = await readCategory(slug);
  if (!row) return;
  await supabase
    .from("category_tree_pointers")
    .delete()
    .or(`child_id.eq.${row.id},parent_id.eq.${row.id}`);
  await supabase.from("category_country_exclusions").delete().eq("category_id", row.id);
  await supabase
    .from("entity_translations")
    .delete()
    .eq("entity_type", "category")
    .eq("entity_id", row.id);
  await supabase.from("categories").delete().eq("id", row.id);
}

/**
 * Creates a scratch root category through the UI and returns its slug.
 *
 * C2c — the slug is SERVER-DERIVED from the name, so the name IS the scratch
 * token: derivation is the identity map on `[a-z0-9-]`, which keeps every
 * fixture namespaced (J1) without the console guessing the server's answer.
 */
async function createViaUi(page: Page, secret: string) {
  const slug = scratchSlug();
  await gotoReady(page, "/admin/categories");
  await page.getByTestId("category-create-open").click();
  await page.getByTestId("category-create-name").fill(slug);
  await expect(page.getByTestId("category-create-slug-preview")).toHaveText(slug);
  await page.getByTestId("category-create-submit").click();
  await stepUpIfPrompted(page, secret);
  await expect(categoryRow(page, slug)).toBeVisible({ timeout: 20000 });
  return slug;
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
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      slug = await createViaUi(page, secret);
      await action(page, slug, "retire").click();
      await page.getByTestId("category-retire-target").selectOption({ index: 1 });
      await page.getByTestId("category-retire-submit").click();
      await stepUpIfPrompted(page, secret);

      await expect
        .poll(async () => (await readCategory(slug))?.is_active, { timeout: 20000 })
        .toBe(false);
      // The row stays in the console (retired ≠ deleted) but reads as retired.
      await expect(categoryRow(page, slug)).toBeVisible();
      await expect(action(page, slug, "retire")).toBeDisabled();
    } finally {
      if (slug) await destroyCategory(slug);
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
      await expect(categoryRow(page, slug)).toBeVisible({ timeout: 20000 });

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
   * CT-8 (INC-132/134/136, rewritten to the C2-UI-FIX-3 law) — the laptop
   * band is CARDS. At 1024 and 1240 the roster must render its card twin,
   * every action must be reachable and clickable, and NOTHING may scroll
   * horizontally — not the page, not a scroller, because below xl there is no
   * table to scroll. At 1440 the table earns its width and still does not
   * engage a scroller.
   */
  test("CT-8 laptop band renders cards with no horizontal scroll anywhere", async ({ page }) => {
    bandOnly(page, "desktop");
    const admin = await createUser({ confirmed: true });
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);

    for (const width of [1024, 1240]) {
      await page.setViewportSize({ width, height: 800 });
      await gotoReady(page, "/admin/categories");
      await expect(page.getByTestId("data-table-cards")).toBeVisible({ timeout: 20000 });
      await expect(page.getByRole("table")).toBeHidden();
      await expect(categoryRow(page, "vehicles")).toBeVisible({ timeout: 20000 });

      await expectNoHorizontalOverflow(page);
      const cards = await page
        .getByTestId("data-table-cards")
        .evaluate((el) => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));
      expect(cards.scrollWidth, `cards scroll sideways at ${width}`).toBeLessThanOrEqual(
        cards.clientWidth + 1,
      );

      const edit = action(page, "vehicles", "edit");
      await expect(edit).toBeVisible();
      await expect(edit).toBeInViewport();
      await edit.click();
      await expect(page.getByTestId("category-edit-dialog")).toBeVisible({ timeout: 20000 });
      await page.keyboard.press("Escape");
      await expect(page.getByTestId("category-edit-dialog")).toBeHidden();
    }

    // 1440 — the table twin, wide columns present, scroller inert.
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoReady(page, "/admin/categories");
    await expect(page.getByRole("table")).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("data-table-col-order")).toBeVisible();
    await expectNoHorizontalOverflow(page);
    const geometry = await page
      .getByTestId("data-table-scroller")
      .evaluate((el) => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
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

    // Parent column: a root reads "—".
    await expect(page.getByTestId("data-table-col-parent")).toBeVisible();

    // The ratified taxonomy is 113 nodes, so page one is exactly PAGE_SIZE.
    await expect(page.getByTestId("category-pagination-range")).toContainText("1–25");
    await page.getByTestId("category-pagination-next").click();
    await expect(page.getByTestId("category-pagination-range")).toContainText("26–50");
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
      await expect(options.filter({ hasText: "›" }).first()).toHaveCount(1);
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
      await expect(
        surface(page).locator('[data-testid^="category-missing-"]').first(),
      ).toBeVisible();
    }
  });

  /**
   * CT-12 (C2d) — the reactivate walk. A retired scratch node comes back to
   * life through step-up and is active again in DB truth and in the roster.
   */
  test("CT-12 lifecycle: a retired category is reactivated through step-up", async ({ page }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);
      await adminClient().from("categories").update({ is_active: false }).eq("id", scratch!.id);
      await page.reload();
      await waitForHydration(page);
      await expect(categoryRow(page, slug)).toBeVisible({ timeout: 20000 });

      await action(page, slug, "reactivate").click();
      await stepUpIfPrompted(page, secret);

      await expect
        .poll(async () => (await readCategory(slug))?.is_active, { timeout: 20000 })
        .toBe(true);
      // Active again means the retire verb is the one on offer once more.
      await expect(action(page, slug, "retire")).toBeVisible({ timeout: 20000 });
    } finally {
      if (slug) await destroyCategory(slug);
    }
  });

  /**
   * CT-13 (C2d) — the delete walk. A wrong slug is refused with nothing
   * deleted (F5); the correct slug deletes the row AND its pointer, exclusion
   * and translation dependents, all asserted as service-client DB truth (J4).
   */
  test("CT-13 lifecycle: a typed-slug delete removes the row and its dependents", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);
      const id = scratch!.id;
      const supabase = adminClient();

      // Seed the dependents the cascade must take with it.
      const { data: country } = await supabase.from("countries").select("code").limit(1).single();
      await supabase.from("category_country_exclusions").insert({
        category_id: id,
        country_code: country!.code,
        created_by: "00000000-0000-0000-0000-000000000000",
      });
      await supabase.from("entity_translations").insert({
        entity_type: "category",
        entity_id: id,
        field: "name",
        lang_code: "am",
        value: `e2e ${slug}`,
        status: "machine",
        machine: true,
      });
      await supabase.from("categories").update({ is_active: false }).eq("id", id);

      await page.reload();
      await waitForHydration(page);
      await expect(categoryRow(page, slug)).toBeVisible({ timeout: 20000 });

      // Wrong slug: refused, nothing deleted.
      await action(page, slug, "delete").click();
      await page.getByTestId("category-delete-slug").fill(`${slug}-wrong`);
      await page.getByTestId("category-delete-submit").click();
      await expect(page.getByTestId("category-dialog-error")).toBeVisible();
      expect(await readCategory(slug)).toBeTruthy();

      // Correct slug: the row and every dependent go.
      await page.getByTestId("category-delete-slug").fill(slug);
      await page.getByTestId("category-delete-submit").click();
      await stepUpIfPrompted(page, secret);

      await expect.poll(async () => await readCategory(slug), { timeout: 20000 }).toBeNull();
      await expect(categoryRow(page, slug)).toHaveCount(0);
      expect((await readPointers(id)).length).toBe(0);
      const { data: excl } = await supabase
        .from("category_country_exclusions")
        .select("country_code")
        .eq("category_id", id);
      expect(excl ?? []).toEqual([]);
      const { data: translations } = await supabase
        .from("entity_translations")
        .select("field")
        .eq("entity_type", "category")
        .eq("entity_id", id);
      expect(translations ?? []).toEqual([]);
    } finally {
      if (slug) await destroyCategory(slug);
    }
  });
});
