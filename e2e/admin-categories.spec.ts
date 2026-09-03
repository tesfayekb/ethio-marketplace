import { type Locator, type Page } from "@playwright/test";
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

/**
 * C2-UI — THE CATEGORIES CONSOLE (CT-1..CT-7).
 *
 * TWIN LAW (J5): C2-UI-FIX-5 put this console back on the primitive's default
 * breakpoint, so its twin boundary is 768 like every other console table. The
 * helpers below stay local and breakpoint-explicit so a shape assertion can
 * never resolve the HIDDEN twin.
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

/**
 * The twin boundary for THIS console. C2-UI-FIX-5 dropped the `cardUntil`
 * override, so the roster uses the primitive's DEFAULT (cards below md) — the
 * same boundary every other console table uses.
 */
const TWIN_BOUNDARY = 768;

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

/**
 * C2k / INC-147 — SEARCH IS THE ANCHOR, PAGE POSITION NEVER WAS.
 *
 * A freshly created or edited scratch row lands wherever the roster's order
 * puts it — which is a server invariant about the TREE, not about page one.
 * Every site that expects such a row narrows the roster with the roster
 * search first (the proven anchor, CT-2) and then asserts the twin row.
 */
async function findRow(page: Page, slug: string): Promise<Locator> {
  await page.getByTestId("category-search").fill(slug);
  const row = categoryRow(page, slug);
  await expect(row).toBeVisible({ timeout: 20000 });
  return row;
}

/** The actions REGION differs per twin (INC-106c): card sibling vs table cell. */
function actionsOf(page: Page, slug: string): Locator {
  return surface(page).getByTestId(
    isCardTwin(page) ? `category-row-${slug}-actions` : `category-row-${slug}-actions-cell`,
  );
}

/**
 * UI-FIX-4 — THE ROLES INTERACTION MODEL. The row carries exactly one verb
 * (Edit); every other verb lives in the editor's verb bar. `action()` keeps
 * its name and its canonical testid, but resolves `edit` in the row's actions
 * region and every other verb inside the open editor dialog — still exactly
 * one match per verb (J5).
 */
function action(page: Page, slug: string, verb: string): Locator {
  if (verb === "edit") return actionsOf(page, slug).getByTestId(`category-edit-${slug}`);
  return page.getByTestId("category-edit-dialog").getByTestId(`category-${verb}-${slug}`);
}

/** Opens a row's editor — the single door to every non-edit verb. */
async function openEditor(page: Page, slug: string) {
  await action(page, slug, "edit").click();
  await expect(page.getByTestId("category-edit-dialog")).toBeVisible({ timeout: 20000 });
  await expect(page.getByTestId("category-verb-bar")).toBeVisible();
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
  await findRow(page, slug);
  return slug;
}

/**
 * C2-UI-FIX-5 (D3) — SELF-DIAGNOSING GEOMETRY. A width failure must name its
 * cause, so every geometry assertion carries this dump: the scroller, the
 * table, the last cell and each ancestor's overflow/max-width. The assertions
 * themselves are unchanged — only their failure message got honest.
 */
async function geometryDump(page: Page, label: string): Promise<string> {
  const data = await page.evaluate(() => {
    const scroller = document.querySelector('[data-testid="data-table-scroller"]');
    const table = document.querySelector("table");
    const cells = table ? table.querySelectorAll("tbody tr:first-child td") : [];
    const last = cells[cells.length - 1] as HTMLElement | undefined;
    const chain: unknown[] = [];
    let node: HTMLElement | null = (scroller as HTMLElement | null) ?? null;
    while (node && node !== document.documentElement) {
      const style = getComputedStyle(node);
      chain.push({
        tag: node.tagName,
        cls: String(node.className).slice(0, 80),
        overflowX: style.overflowX,
        maxWidth: style.maxWidth,
        width: Math.round(node.getBoundingClientRect().width),
        scrollWidth: node.scrollWidth,
      });
      node = node.parentElement;
    }
    return {
      doc: {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      },
      scroller: scroller
        ? { scrollWidth: scroller.scrollWidth, clientWidth: scroller.clientWidth }
        : null,
      table: table ? table.scrollWidth : null,
      lastCell: last ? last.getBoundingClientRect().toJSON() : null,
      chain,
    };
  });
  return `[e2e:c2] geometry @ ${label}: ${JSON.stringify(data)}`;
}

/**
 * C2-UI-FIX-5 (D1) — the lifecycle dump. When a verb does not land, the
 * failure must say WHY: which dialogs are mounted, whether the step-up modal
 * is on screen, what DB truth says about the row, and every client error the
 * page logged. The assertion keeps its meaning; only its evidence grew.
 */
async function lifecycleDump(page: Page, slug: string, errors: string[]): Promise<string> {
  const dom = await page.evaluate(() => ({
    dialogs: Array.from(document.querySelectorAll("[data-testid]"))
      .map((el) => el.getAttribute("data-testid") ?? "")
      .filter((id) => id.includes("dialog") || id.includes("step-up") || id.includes("verb-bar")),
    openDialogs: document.querySelectorAll('[role="dialog"]').length,
  }));
  const row = await adminClient()
    .from("categories")
    .select("id, slug, is_active")
    .eq("slug", slug)
    .maybeSingle();
  return `[e2e:c2] lifecycle ${slug}: dom=${JSON.stringify(dom)} db=${JSON.stringify(row.data)} clientErrors=${JSON.stringify(errors.slice(-5))}`;
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
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    try {
      slug = await createViaUi(page, secret);
      await openEditor(page, slug);
      await action(page, slug, "retire").click();
      await page.getByTestId("category-retire-target").selectOption({ index: 1 });
      await page.getByTestId("category-retire-submit").click();
      await stepUpIfPrompted(page, secret);

      await expect
        .poll(async () => (await readCategory(slug))?.is_active, { timeout: 20000 })
        .toBe(false);
      // The row stays in the console (retired ≠ deleted) but reads as retired.
      await findRow(page, slug);
      await openEditor(page, slug);
      await expect(action(page, slug, "reactivate")).toBeVisible({ timeout: 20000 });
      await expect(action(page, slug, "retire")).toHaveCount(0);
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
   * CT-12 (C2d, re-armed by UI-FIX-7) — the reactivate walk. A retired scratch
   * node comes back to life through step-up and is active again in DB truth
   * and in the roster.
   *
   * J7 — EVERY wait here is a BOUNDED poll (≤15s) whose failure carries the
   * standing dump computed AT FAILURE TIME (mounted dialog/step-up testids,
   * is_active from the service client, the page's [client-error] lines), so a
   * red CT-12 says why instead of expiring on a default timeout.
   */
  test("CT-12 lifecycle: a retired category is reactivated through step-up", async ({ page }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    let slug = "";
    const clientErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") clientErrors.push(`[client-error] ${message.text()}`);
    });
    try {
      slug = await createViaUi(page, secret);
      const scratch = await readCategory(slug);
      await adminClient().from("categories").update({ is_active: false }).eq("id", scratch!.id);
      await page.reload();
      await waitForHydration(page);
      await findRow(page, slug);

      const step = async (label: string, read: () => Promise<unknown>, expected: unknown) => {
        try {
          await expect.poll(read, { timeout: 15000, message: label }).toEqual(expected);
        } catch {
          throw new Error(`${label} — ${await lifecycleDump(page, slug, clientErrors)}`);
        }
      };

      await step(
        "CT-12 the retired row is on the roster",
        () => categoryRow(page, slug).count(),
        1,
      );
      await step(
        "CT-12 the row's Edit verb is clickable",
        () => action(page, slug, "edit").isVisible(),
        true,
      );
      await action(page, slug, "edit").click({ timeout: 15000 });
      await step(
        "CT-12 the editor's verb bar is open",
        () => page.getByTestId("category-verb-bar").isVisible(),
        true,
      );
      await step(
        "CT-12 a retired row offers Reactivate",
        () => action(page, slug, "reactivate").isVisible(),
        true,
      );

      await action(page, slug, "reactivate").click({ timeout: 15000 });
      await stepUpIfPrompted(page, secret);

      // DB truth, not the rendered badge (J4).
      await step(
        "CT-12 the row is active again in DB truth",
        async () => (await readCategory(slug))?.is_active,
        true,
      );

      /**
       * C2-CLOSE Part A — THE CLOSING TRUTH, SEARCH-ANCHORED. The editor is
       * dismissed so the roster search (the only proven anchor, CT-2/INC-147)
       * can narrow to the scratch row; the row IS on the roster, carries the
       * Active badge — resolved through its accessible description, never raw
       * English (J5) — and its editor offers Retire with Reactivate gone.
       */
      await page.keyboard.press("Escape");
      await step(
        "CT-12 the editor is dismissed before the roster search",
        () => page.getByTestId("category-edit-dialog").count(),
        0,
      );
      await findRow(page, slug);
      const activeBadge = categoryRow(page, slug).locator(
        `[aria-label="${en["admin.categories.badge.active"]}: ${en["admin.categories.tip.active"]}"]`,
      );
      await step("CT-12 the roster shows the row as Active", () => activeBadge.count(), 1);
      await openEditor(page, slug);
      await step(
        "CT-12 an active row offers Retire",
        () => action(page, slug, "retire").isVisible(),
        true,
      );
      await step(
        "CT-12 an active row no longer offers Reactivate",
        () => action(page, slug, "reactivate").count(),
        0,
      );

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
      await findRow(page, slug);

      // Wrong slug: refused, nothing deleted.
      await openEditor(page, slug);
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

  /**
   * CT-14 (C2g) — THE CATCH-ALL PARENT LAW. A catch-all is a terminal posting
   * bucket: it is never offered as a parent, the SERVER refuses it whatever
   * the client sends, and it carries no Move verbs because its order is not
   * the operator's to choose.
   */
  test("CT-14 catch-all law: never a parent, refused server-side, no move verbs", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const supabase = adminClient();
    const { data: catchall, error } = await supabase
      .from("categories")
      .select("id, slug, name_en")
      .eq("is_catchall", true)
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(`[e2e:c2] reading a catch-all failed: ${error.message}`);
    expect(catchall, "the ratified tree ships catch-alls").toBeTruthy();

    // (a) the server refuses the law's target directly — the console cannot
    //     talk it out of the refusal (F3).
    const refusal = await supabase.rpc("assert_parent_not_catchall", {
      p_parent_id: catchall!.id,
    });
    expect(refusal.error?.message ?? "").toContain("admin.categories.error.catchallParent");

    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/categories");
    await expect(categoryRow(page, "vehicles")).toBeVisible({ timeout: 20000 });

    // (b) the create dialog's parent picker never offers it.
    await page.getByTestId("category-create-open").click();
    const options = page.getByTestId("category-create-parent").locator("option");
    await expect(options.filter({ hasText: catchall!.name_en })).toHaveCount(0);
    await page.getByTestId("category-dialog-cancel").click();

    // (c) the catch-all row's editor exposes no Move verbs.
    // J5 — the row, its actions region and its verbs all resolve through the
    // twin helpers, exactly as CT-9b resolves a card row: never a bare prefix.
    await page.getByTestId("category-search").fill(catchall!.slug);
    await expect(categoryRow(page, catchall!.slug)).toBeVisible({ timeout: 20000 });
    await expect(actionsOf(page, catchall!.slug)).toBeVisible({ timeout: 20000 });
    await openEditor(page, catchall!.slug);
    await expect(action(page, catchall!.slug, "up")).toHaveCount(0);
    await expect(action(page, catchall!.slug, "down")).toHaveCount(0);
  });

  /**
   * CT-15 (C2h) — REORDER IS A PLAIN UPDATE. Two scratch siblings under a
   * scratch parent: Move up on the second flips the roster order, no step-up
   * modal ever appears (its ABSENCE is asserted, not merely unobserved), and
   * the sibling catch-all stays last. J1/J3 — every row here is scratch and
   * destroyed in `finally`; the ratified tree is read-only to this spec.
   */
  test("CT-15 reorder: Move up flips the order with no step-up, catch-all last", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const supabase = adminClient();
    const parentSlug = scratchSlug();
    const aSlug = `${scratchSlug()}-a`;
    const bSlug = `${scratchSlug()}-b`;
    const otherSlug = `${scratchSlug()}-other`;
    const slugs = [parentSlug, aSlug, bSlug, otherSlug];
    const clientErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") clientErrors.push(`[client-error] ${message.text()}`);
    });

    try {
      /**
       * C2j / DEC-034 — FIXTURE INVARIANT: a seeded category ALWAYS gets its
       * pointer edge in the same step. A row without an edge is an orphan by
       * construction, and an orphan is not the thing these specs are about.
       * The edge's order is the next free slot under the given parent.
       */
      const seed = async (slug: string, catchall: boolean, parent: string | null) => {
        const { data, error } = await supabase
          .from("categories")
          .insert({ slug, name_en: slug, is_active: true, is_catchall: catchall })
          .select("id")
          .single();
        if (error) throw new Error(`[e2e:c2] seeding ${slug} failed: ${error.message}`);
        const id = data.id as string;

        let nextOrder = 900000;
        if (parent !== null) {
          const existing = await supabase
            .from("category_tree_pointers")
            .select("display_order")
            .eq("parent_id", parent)
            .order("display_order", { ascending: false })
            .limit(1);
          if (existing.error)
            throw new Error(`[e2e:c2] reading sibling order failed: ${existing.error.message}`);
          nextOrder = (existing.data?.[0]?.display_order ?? -1) + 1;
        }

        const { error: pointerError } = await supabase
          .from("category_tree_pointers")
          .insert({ parent_id: parent, child_id: id, display_order: nextOrder });
        if (pointerError)
          throw new Error(`[e2e:c2] seeding pointer for ${slug} failed: ${pointerError.message}`);
        return id;
      };
      const parentId = await seed(parentSlug, false, null);
      const aId = await seed(aSlug, false, parentId);
      const bId = await seed(bSlug, false, parentId);
      const otherId = await seed(otherSlug, true, parentId);

      // J7 — seed BEFORE navigate, and assert the seeded rows rendered before
      // acting on any of them.
      const { secret } = await signInAsSuperAdmin(page);
      expect(secret, "the walk owns a proven factor").toBeTruthy();
      await gotoReady(page, "/admin/categories");
      await page.getByTestId("category-search").fill(parentSlug.slice(0, 18));
      await expect(categoryRow(page, aSlug)).toBeVisible({ timeout: 20000 });
      await expect(categoryRow(page, bSlug)).toBeVisible({ timeout: 20000 });

      const orderOf = async (childId: string) => {
        const { data, error } = await supabase
          .from("category_tree_pointers")
          .select("display_order")
          .eq("parent_id", parentId)
          .eq("child_id", childId)
          .single();
        if (error) throw new Error(`[e2e:c2] reading order failed: ${error.message}`);
        return data.display_order as number;
      };
      expect(await orderOf(aId)).toBeLessThan(await orderOf(bId));

      await openEditor(page, bSlug);
      await action(page, bSlug, "up").click({ timeout: 15000 });

      // The ABSENCE of the gate is the assertion: reorder is a plain update.
      await expect(page.getByTestId("step-up-modal")).toHaveCount(0);

      const dump = async (label: string) =>
        `${label} — ${await lifecycleDump(page, bSlug, clientErrors)} orders=${JSON.stringify({
          a: await orderOf(aId),
          b: await orderOf(bId),
          other: await orderOf(otherId),
        })}`;

      try {
        await expect
          .poll(async () => (await orderOf(bId)) < (await orderOf(aId)), {
            timeout: 15000,
            message: "CT-15 the order flipped",
          })
          .toBe(true);
      } catch {
        throw new Error(await dump("CT-15 the order did not flip"));
      }

      // The catch-all is pinned last by the server, whatever the operator sent.
      expect(await orderOf(otherId)).toBeGreaterThan(await orderOf(aId));
      expect(await orderOf(otherId)).toBeGreaterThan(await orderOf(bId));

      // The step-up gate never opened at any point in the walk.
      await expect(page.getByTestId("step-up-modal")).toHaveCount(0);
      await expect(page.getByTestId("category-verb-error")).toHaveCount(0);
    } finally {
      for (const slug of slugs) await destroyCategory(slug);
    }
  });
});
