import { type Locator, type Page } from "@playwright/test";

import { expect, test } from "../fixtures";
import { enrollAndStepUp, gotoReady, stepUpIfPrompted, switchUser, waitForHydration } from "./ui";
import { adminClient, createUser } from "./users";

/**
 * L1 (DEC-037) — SHARED CATEGORIES-CONSOLE HELPERS.
 *
 * Extracted verbatim from e2e/admin-categories.spec.ts when that file was split
 * three ways for shard balance (INC-159). The twin locators, the fixture law
 * (scratch slug → destroyCategory), the dumps and createViaUi are byte-identical
 * to the originals; only their home moved.
 */

export const RUN = process.env["E2E_SHARD"] ?? "local";

export function rand() {
  return Math.random().toString(36).slice(2, 8);
}

/** The literal prefix every seeded slug shares (derived, never reconstructed). */
export function sharedPrefix(values: string[]): string {
  if (values.length === 0) return "";
  let prefix = values[0] ?? "";
  for (const value of values.slice(1)) {
    let index = 0;
    while (index < prefix.length && prefix[index] === value[index]) index += 1;
    prefix = prefix.slice(0, index);
  }
  return prefix;
}

export function scratchSlug() {
  const worker = process.env["TEST_WORKER_INDEX"] ?? "0";
  return `e2e-cat-${RUN}-${worker}-${rand()}`.toLowerCase().replace(/[^a-z0-9-]/g, "-");
}

/**
 * The twin boundary for THIS console. C2-UI-FIX-5 dropped the `cardUntil`
 * override, so the roster uses the primitive's DEFAULT (cards below md) — the
 * same boundary every other console table uses.
 */
export const TWIN_BOUNDARY = 768;

export function isCardTwin(page: Page) {
  return (page.viewportSize()?.width ?? TWIN_BOUNDARY) < TWIN_BOUNDARY;
}

/**
 * SPEC VIEWPORT LAW (C2-UI-FIX-3) — every test block opens by declaring the
 * band it asserts, so a table-shape assertion never runs in the 360 project
 * (where there is no table) and a card assertion never runs at 1280. Blocks
 * that resize the page themselves declare `desktop`: they own the viewport
 * and must execute exactly once, in one project.
 */
export function bandOnly(page: Page, band: "mobile" | "desktop" | "any") {
  if (band === "any") return;
  const width = page.viewportSize()?.width ?? TWIN_BOUNDARY;
  test.skip(
    band === "mobile" ? width >= TWIN_BOUNDARY : width < TWIN_BOUNDARY,
    `this block asserts the ${band} band`,
  );
}

export function surface(page: Page): Locator {
  return isCardTwin(page) ? page.getByTestId("data-table-cards") : page.getByRole("table");
}

export function categoryRow(page: Page, slug: string): Locator {
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
export async function findRow(page: Page, slug: string): Promise<Locator> {
  await page.getByTestId("category-search").fill(slug);
  const row = categoryRow(page, slug);
  try {
    await expect(row).toBeVisible({ timeout: 20000 });
  } catch (error) {
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}\n${await dialogDump(page, `findRow(${slug})`)}`,
    );
  }
  return row;
}

/**
 * C2-GHOST PART B (INC-152) — THE CONFESSION CHANNEL. A row that never appears
 * is usually a GHOST DIALOG covering the roster, so every failure path names
 * each open dialog together with the opener that put it there
 * (`data-opened-by`, stamped by the page's single edit-opener and each verb).
 */
export async function dialogDump(page: Page, label: string): Promise<string> {
  const open = await page.evaluate(() =>
    [...document.querySelectorAll('[data-testid$="-dialog"]')].map((node) => ({
      testid: node.getAttribute("data-testid"),
      openedBy: node.getAttribute("data-opened-by"),
    })),
  );
  const rendered =
    open.length === 0
      ? "none"
      : open.map((entry) => `${entry.testid} opened-by=${entry.openedBy ?? "?"}`).join(" | ");
  return `[dialog-dump ${label}] open dialogs: ${rendered}`;
}

/** The actions REGION differs per twin (INC-106c): card sibling vs table cell. */
export function actionsOf(page: Page, slug: string): Locator {
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
export function action(page: Page, slug: string, verb: string): Locator {
  if (verb === "edit") return actionsOf(page, slug).getByTestId(`category-edit-${slug}`);
  return page.getByTestId("category-edit-dialog").getByTestId(`category-${verb}-${slug}`);
}

/** Opens a row's editor — the single door to every non-edit verb. */
export async function openEditor(page: Page, slug: string) {
  await action(page, slug, "edit").click();
  await expect(page.getByTestId("category-edit-dialog")).toBeVisible({ timeout: 20000 });
  await expect(page.getByTestId("category-verb-bar")).toBeVisible();
}

export async function grantRole(userId: string, roleName: string) {
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

export async function signInAsSuperAdmin(page: Page) {
  const user = await createUser({ confirmed: true });
  await grantRole(user.id, "super_admin");
  await switchUser(page, user.email, user.password);
  await waitForHydration(page);
  const secret = await enrollAndStepUp(page);
  return { user, secret };
}

/** DB truth (J4): the scratch category row read through the service client. */
export async function readCategory(slug: string) {
  const { data, error } = await adminClient()
    .from("categories")
    .select(
      "id, slug, name_en, is_active, allow_listings, display_order, visible_from, visible_until, price_enabled, expiry_days",
    )

    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`[e2e:c2] reading ${slug} failed: ${error.message}`);
  return data;
}

/**
 * C2-CLOSE Part B — THE LISTING FIXTURE (J1/J3/J7). One `status: 'active'`
 * listing under a scratch category, written with every REQUIRED column
 * (seller, location, home country, title, description) through the service
 * client, before the console is ever navigated. Deleted in the test's
 * `finally`; it never touches a ratified row.
 */
export async function seedActiveListing(categoryId: string, sellerId: string): Promise<string> {
  const supabase = adminClient();
  const { data: location, error: locationError } = await supabase
    .from("locations")
    .select("id, country_code")
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();
  if (locationError || !location) {
    throw new Error(`[e2e:c2] no active location: ${locationError?.message ?? "no row"}`);
  }
  const { data, error } = await supabase
    .from("listings")
    .insert({
      category_id: categoryId,
      seller_id: sellerId,
      location_id: location.id,
      home_country_code: location.country_code,
      title: `e2e-cat listing ${RUN}-${rand()}`,
      description: "e2e scratch listing for the retire walk",
      status: "active",
    })
    .select("id")
    .single();
  if (error || !data) {
    throw new Error(`[e2e:c2] seeding the listing failed: ${error?.message ?? "no row"}`);
  }
  return data.id;
}

/** DB truth (J4): where a seeded listing now lives. */
export async function readListing(listingId: string) {
  const { data, error } = await adminClient()
    .from("listings")
    .select("id, category_id, status")
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:c2] reading listing failed: ${error.message}`);
  return data;
}

/** The pointer rows of a category, read as DB truth (J4). */
export async function readPointers(categoryId: string) {
  const { data, error } = await adminClient()
    .from("category_tree_pointers")
    .select("id, parent_id, display_order")
    .eq("child_id", categoryId)
    .order("display_order");
  if (error) throw new Error(`[e2e:c2] reading pointers failed: ${error.message}`);
  return data ?? [];
}

/** Hard cleanup — never leaves a scratch node in the ratified tree. */
export async function destroyCategory(slug: string) {
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
export async function createViaUi(page: Page, secret: string) {
  const slug = scratchSlug();
  await gotoReady(page, "/admin/categories");
  await page.getByTestId("category-create-open").click();
  await page.getByTestId("category-create-name").fill(slug);
  await expect(page.getByTestId("category-create-slug-preview")).toHaveText(slug);
  await page.getByTestId("category-create-submit").click();
  await stepUpIfPrompted(page, secret);
  // C5m — ONE dialog: the SAME testid persists and now shows the Image
  // surface; Escape leaves it, and the roster is asserted after it is gone.
  await expect(page.getByTestId("category-editor-image")).toBeVisible({ timeout: 20000 });
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("category-edit-dialog")).toHaveCount(0, { timeout: 20000 });
  // C2-GHOST PART B — the state right after the create dialog closes is the
  // ghost's birthplace; the dump names any dialog still open.
  const afterCreate = await dialogDump(page, `createViaUi(${slug}) after create`);
  try {
    await findRow(page, slug);
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
  }
  return slug;
}

/**
 * C2-UI-FIX-5 (D3) — SELF-DIAGNOSING GEOMETRY. A width failure must name its
 * cause, so every geometry assertion carries this dump: the scroller, the
 * table, the last cell and each ancestor's overflow/max-width. The assertions
 * themselves are unchanged — only their failure message got honest.
 */
export async function geometryDump(page: Page, label: string): Promise<string> {
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
export async function lifecycleDump(page: Page, slug: string, errors: string[]): Promise<string> {
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
