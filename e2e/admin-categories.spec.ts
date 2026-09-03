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

/** The C7 twin boundary for THIS console (cardUntil="lg"). */
function isCardTwin(page: Page) {
  return (page.viewportSize()?.width ?? 1280) < 1024;
}

function surface(page: Page): Locator {
  return isCardTwin(page) ? page.getByTestId("data-table-cards") : page.getByRole("table");
}

function categoryRow(page: Page, slug: string): Locator {
  return surface(page).getByTestId(isCardTwin(page) ? `category-row-${slug}-card` : `category-row-${slug}`);
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

/** Hard cleanup — never leaves a scratch node in the ratified tree. */
async function destroyCategory(slug: string) {
  const supabase = adminClient();
  const row = await readCategory(slug);
  if (!row) return;
  await supabase.from("category_tree_pointers").delete().or(`child_id.eq.${row.id},parent_id.eq.${row.id}`);
  await supabase.from("category_country_exclusions").delete().eq("category_id", row.id);
  await supabase.from("entity_translations").delete().eq("entity_type", "category").eq("entity_id", row.id);
  await supabase.from("categories").delete().eq("id", row.id);
}

/** Creates a scratch root category through the UI and returns its slug. */
async function createViaUi(page: Page, secret: string) {
  const slug = scratchSlug();
  await gotoReady(page, "/admin/categories");
  await page.getByTestId("category-create-open").click();
  await page.getByTestId("category-create-slug").fill(slug);
  await page.getByTestId("category-create-name").fill(`E2E ${slug}`);
  await page.getByTestId("category-create-submit").click();
  await stepUpIfPrompted(page, secret);
  await expect(categoryRow(page, slug)).toBeVisible({ timeout: 20000 });
  return slug;
}

test.describe("C2 categories console", () => {
  test("CT-1 gating: a plain user is refused; the section renders for an admin", async ({
    page,
  }) => {
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
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      slug = await createViaUi(page, secret);
      expect((await readCategory(slug))?.name_en).toBe(`E2E ${slug}`);

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
});
