import { type Locator, type Page } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";
import { expect, test } from "./fixtures";
import { inBrowserClient } from "./helpers/browser-client";
import { destroyCountry } from "./helpers/countries";
import {
  OPEN_MARKET_LS11_MS,
  seedSingleOptionMarket,
  waitForOpenMarket,
} from "./helpers/locations";
import { destroyCategoryBranch, seedCategoryBranch } from "./helpers/posting";
import { totpStep } from "./helpers/totp";
import {
  afterTotpStep,
  awaitGuardedOutcome,
  expectNoHorizontalOverflow,
  gotoReady,
  settled,
  signInViaSession,
  staleStepUpOnClient,
  stepUpIfPrompted,
  switchLanguage,
  switchUser,
  useJobSuperAdmin,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * P-1b (D290, D295, D303, D304, D311, D312) — ADMIN › MONETISATION (MON-1..MON-15):
 * the credits model's products and their console — Markets · Levels ·
 * Per-category perks · Reach · Prices.
 *
 * Identity: the pooled job super admin for consumers (J9); staff of narrower
 * rights through a scratch role. Truth: the service client, never a rendered
 * summary (J4); a level's perks through `level_perks_for` as the service
 * client reads it (MON-6, MON-7). Anchors: structure and testids, never English
 * text (J5); the English and Amharic catalogues are read by key when a word is
 * asserted.
 *
 * FIXTURES (J1 / J3) — the three levels, the three reach rows and the default
 * market are REAL rows (M-a, M-c), so no test mutates them: they are only READ.
 * Every other test seeds its OWN rows under the `e2e_mon_` prefix, namespaced
 * run × worker × project × test, and removes them (overrides and prices first)
 * in `afterEach`; audit rows outlive them, so an audit read is bounded by the
 * test's own start.
 */

const TWIN_BOUNDARY = 1024;
const SCRATCH_PREFIX = "e2e_mon_";
const TAG = "[e2e:mon]";

function isCardTwin(page: Page) {
  return (page.viewportSize()?.width ?? TWIN_BOUNDARY) < TWIN_BOUNDARY;
}

/**
 * The block's OWN table (the first in its frame: a product's open row holds inner
 * tables, P-1c): its rows on the table twin, its cards on the card twin.
 */
function tableOf(block: Locator, page: Page): Locator {
  return isCardTwin(page)
    ? block.locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)')
    : block.locator("table:not(table *)");
}

/** A row: the table row, or on the card twin the card's body. */
function rowOf(page: Page, table: Locator, id: string): Locator {
  return table.getByTestId(isCardTwin(page) ? `${id}-card` : id);
}

/** The row's actions: the actions cell, or on the card twin the card's actions slot. */
function actionsOf(page: Page, table: Locator, id: string): Locator {
  return table.getByTestId(isCardTwin(page) ? `${id}-actions` : `${id}-actions-cell`);
}

function section(page: Page): Locator {
  return page.getByTestId("admin-section-monetisation");
}

function block(page: Page, id: string): Locator {
  return page.getByTestId(`monetisation-${id}`);
}

function blockTable(page: Page, id: string): Locator {
  return tableOf(block(page, id), page);
}

function productRow(page: Page, kind: "levels" | "reach", key: string): Locator {
  return rowOf(page, blockTable(page, kind), `product-${key}`);
}

/** P-1c (D313) — a product's inner frame (its per-category perks or its prices), once its row is open. */
function productFrame(page: Page, key: string, part: "perks" | "prices"): Locator {
  return page.getByTestId(`product-${key}-${part}`);
}

/** Opens a product's row by its name toggle (idempotent) and waits for its prices frame. */
async function openProduct(page: Page, kind: "levels" | "reach", key: string) {
  const toggle = productRow(page, kind, key).getByTestId(`product-${key}-open`);
  if ((await toggle.getAttribute("aria-expanded")) !== "true") await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(productFrame(page, key, "prices")).toBeVisible();
}

function priceRow(page: Page, productKey: string, id: string): Locator {
  return rowOf(page, tableOf(productFrame(page, productKey, "prices"), page), `price-${id}`);
}

function overrideRow(page: Page, levelKey: string, id: string): Locator {
  return rowOf(page, tableOf(productFrame(page, levelKey, "perks"), page), `override-${id}`);
}

function marketRow(page: Page, code: string): Locator {
  return rowOf(page, blockTable(page, "markets"), `market-${code}`);
}

async function openProductEditor(page: Page, kind: "levels" | "reach", key: string) {
  await actionsOf(page, blockTable(page, kind), `product-${key}`)
    .getByTestId(`product-actions-${key}-edit`)
    .click();
  const prefix = `monetisation-${kind === "levels" ? "level" : "reach"}-edit`;
  await expect(page.getByTestId(prefix)).toBeVisible({ timeout: 20000 });
  await settled(page);
  return page.getByTestId(prefix);
}

/**
 * The app's own calendar (L1b): a day is chosen by its button; a day in a later
 * month is reached through Next (at most two months on, for the fixtures here).
 */
async function pickDay(page: Page, testid: string, day: string) {
  await page.getByTestId(testid).click();
  const calendar = page.getByTestId(`${testid}-calendar`);
  await expect(calendar).toBeVisible({ timeout: 20000 });
  for (let hop = 0; hop < 2; hop += 1) {
    if ((await page.getByTestId(`${testid}-day-${day}`).count()) > 0) break;
    await calendar.getByRole("button", { name: en["prim.date.next"] }).click();
  }
  await page.getByTestId(`${testid}-day-${day}`).click();
  await expect(calendar).toHaveCount(0);
}

/** A day as the browser spells it (its own clock and zone, as the dialog's `todayIso`). */
async function browserDay(page: Page, shift: number): Promise<string> {
  return page.evaluate((by) => {
    const date = new Date();
    date.setDate(date.getDate() + by);
    const pad = (value: number) => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }, shift);
}

/**
 * The door's shape is `^[a-z][a-z0-9_]{1,31}$`: every axis is spelled in that
 * alphabet, and the project's first letter keeps both twins on their own rows.
 */
function scratchKey(tag: string, project: string): string {
  const clean = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const run = clean(process.env["E2E_SHARD"] ?? "local");
  const worker = clean(process.env["TEST_WORKER_INDEX"] ?? "0");
  const twin = clean(project).slice(0, 1) || "x";
  return `${SCRATCH_PREFIX}${tag}_${run}_${worker}_${twin}`.replace(/_+$/, "").slice(0, 32);
}

function token(): string {
  return Math.random().toString(36).slice(2, 10);
}

/** DB truth (J4): the product row read through the service client. */
async function readProduct(key: string) {
  const { data, error } = await adminClient()
    .from("listing_packages")
    .select(
      "key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort, created_by, updated_by",
    )
    .eq("key", key)
    .maybeSingle();
  if (error) throw new Error(`${TAG} reading the product ${key} failed: ${error.message}`);
  return data;
}

/** DB truth (J4): a level's override rows, oldest first. */
async function readOverrides(levelKey: string) {
  const { data, error } = await adminClient()
    .from("level_overrides")
    .select("id, category_id, country_code, days, max_photos, placement, badge")
    .eq("level_key", levelKey)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`${TAG} reading the overrides of ${levelKey}: ${error.message}`);
  return data ?? [];
}

/** DB truth (J4): a product's price rows, oldest first. */
async function readPrices(key: string) {
  const { data, error } = await adminClient()
    .from("package_prices")
    .select(
      "id, country_code, category_id, amount, currency, credit_cost, valid_from, valid_to, used_count",
    )
    .eq("package_key", key)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`${TAG} reading the prices of ${key} failed: ${error.message}`);
  return data ?? [];
}

/** DB truth (J4): a market's settings row (null = the default row). */
async function readMarket(code: string | null) {
  let query = adminClient()
    .from("market_settings")
    .select(
      "id, country_code, free_regular_ads, included_reach, paid_levels, launch_credits, launch_days, paid_levels_since",
    );
  query = code === null ? query.is("country_code", null) : query.eq("country_code", code);
  const { data, error } = await query.maybeSingle();
  if (error) throw new Error(`${TAG} reading the market ${code ?? "default"}: ${error.message}`);
  return data;
}

/**
 * P-1c (D313) — the strip's Prices rule as the service client reads it: the
 * (product, market) pairs a seller could buy but cannot pay for NOW. The page
 * computes the same from its one read; the test's expectation comes from the
 * rows, never from a guess about the backend's real products.
 */
async function unpricedPairs(
  nowIso: string,
): Promise<Array<{ key: string; market: string | null }>> {
  const supabase = adminClient();
  const markets = await supabase
    .from("market_settings")
    .select("country_code")
    .eq("paid_levels", true);
  if (markets.error) throw new Error(`${TAG} reading the markets on: ${markets.error.message}`);
  const products = await supabase
    .from("listing_packages")
    .select("key")
    .eq("enabled", true)
    .eq("self_serve", true);
  if (products.error)
    throw new Error(`${TAG} reading the sellable products: ${products.error.message}`);
  const prices = await supabase
    .from("package_prices")
    .select("package_key, country_code, valid_from, valid_to")
    .lte("valid_from", nowIso);
  if (prices.error) throw new Error(`${TAG} reading the prices: ${prices.error.message}`);
  const pairs: Array<{ key: string; market: string | null }> = [];
  for (const market of markets.data ?? []) {
    for (const product of products.data ?? []) {
      const priced = (prices.data ?? []).some(
        (price) =>
          price.package_key === product.key &&
          (price.country_code === null || price.country_code === market.country_code) &&
          (price.valid_to === null || price.valid_to > nowIso),
      );
      if (!priced)
        pairs.push({ key: product.key as string, market: market.country_code as string | null });
    }
  }
  return pairs;
}

/** This run's audit rows for an entity (the rows of an earlier run's same key are left out). */
async function audits(entityType: string, entityId: string, action: string, since: string) {
  const { data, error } = await adminClient()
    .from("audit_log")
    .select("action, meta")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .eq("action", action)
    .gte("created_at", since)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`${TAG} reading the audit of ${entityId} failed: ${error.message}`);
  return data ?? [];
}

/** The staff name the console shows for an actor (profiles.display_name). */
async function displayNameOf(userId: string): Promise<string> {
  const { data, error } = await adminClient()
    .from("profiles")
    .select("display_name")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) throw new Error(`${TAG} no profile for ${userId}: ${error?.message}`);
  return String(data.display_name ?? "");
}

async function destroyProduct(key: string) {
  if (!key.startsWith(SCRATCH_PREFIX)) throw new Error(`${TAG} refusing to delete ${key}`);
  const supabase = adminClient();
  const overrides = await supabase.from("level_overrides").delete().eq("level_key", key);
  if (overrides.error) throw new Error(`${TAG} override reap failed: ${overrides.error.message}`);
  const prices = await supabase.from("package_prices").delete().eq("package_key", key);
  if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  const row = await supabase.from("listing_packages").delete().eq("key", key);
  if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
}

/** The rows a scratch market or category still anchors (FK), before the fixture goes. */
async function destroyScoped(column: "country_code" | "category_id", value: string) {
  const supabase = adminClient();
  for (const table of ["level_overrides", "package_prices", "market_settings"] as const) {
    if (table === "market_settings" && column === "category_id") continue;
    const removed = await supabase.from(table).delete().eq(column, value);
    if (removed.error) throw new Error(`${TAG} ${table} reap failed: ${removed.error.message}`);
  }
}

/** The first curated currency: the price dialog's default (orderCurrencies, home unknown). */
async function firstCurrency(): Promise<string> {
  const { data, error } = await adminClient()
    .from("currencies")
    .select("code")
    .order("display_order", { ascending: true })
    .order("code", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error || !data) throw new Error(`${TAG} no currency row: ${error?.message ?? "none"}`);
  return data.code as string;
}

/** The first enabled product of a kind (a REAL row, read only). */
async function firstProduct(kind: "reach" | "level"): Promise<string> {
  const { data, error } = await adminClient()
    .from("listing_packages")
    .select("key")
    .eq("kind", kind)
    .eq("enabled", true)
    .order("sort", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error || !data) throw new Error(`${TAG} no ${kind} row: ${error?.message ?? "none"}`);
  return data.key as string;
}

/** The first enabled reach row: the markets' included reach. */
const firstReach = () => firstProduct("reach");
/** The first enabled level: the row a read-only test opens (P-1c). */
const firstLevel = () => firstProduct("level");

/** A door's refusal as the page's own client reads it (the UI entirely bypassed, F3). */
async function doorError(page: Page, fn: string, args: Record<string, unknown>) {
  return inBrowserClient(
    page,
    async (client, call) => {
      const result = await client.rpc(call.fn, call.args);
      return result.error?.message ?? null;
    },
    { fn, args },
  );
}

/** The resolver's answer as the service client reads it (MON-6, MON-7). */
async function perksFor(levelKey: string, categoryId: string, countryCode: string | null) {
  const { data, error } = await adminClient().rpc("level_perks_for", {
    p_level_key: levelKey,
    p_category_id: categoryId,
    // The resolver's "any market" is a NULL code.
    p_country_code: countryCode,
  });
  if (error) throw new Error(`${TAG} level_perks_for failed: ${error.message}`);
  if (data === null) return null;
  if (typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`${TAG} level_perks_for answered a non-object`);
  }
  const read = (name: string): unknown => Reflect.get(data, name);
  return {
    days: read("days"),
    maxPhotos: read("max_photos"),
    placement: read("placement"),
    badge: read("badge"),
    seasonUntil: read("season_until"),
  };
}

function restBase(): { url: string; key: string } {
  const url = process.env["E2E_SUPABASE_URL"];
  const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    throw new Error(`${TAG} E2E_SUPABASE_URL and E2E_SUPABASE_PUBLISHABLE_KEY must be set.`);
  }
  return { url: url.replace(/\/+$/, ""), key };
}

test.describe("P-1b Admin › Monetisation", () => {
  const products: string[] = [];
  const roles: string[] = [];
  const branches: string[][] = [];
  const categoryIds: string[] = [];
  const countries: string[] = [];

  test.afterEach(async () => {
    const supabase = adminClient();
    for (const key of products.splice(0)) await destroyProduct(key);
    for (const id of categoryIds.splice(0)) await destroyScoped("category_id", id);
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
    for (const code of countries.splice(0)) {
      await destroyScoped("country_code", code);
      await destroyCountry(code);
    }
    for (const roleId of roles.splice(0)) {
      const a = await supabase.from("role_permissions").delete().eq("role_id", roleId);
      if (a.error) throw new Error(`${TAG} role_permissions reap failed: ${a.error.message}`);
      const b = await supabase.from("user_roles").delete().eq("role_id", roleId);
      if (b.error) throw new Error(`${TAG} user_roles reap failed: ${b.error.message}`);
      const c = await supabase.from("roles").delete().eq("id", roleId);
      if (c.error) throw new Error(`${TAG} roles reap failed: ${c.error.message}`);
    }
  });

  /** Seeds the test's own product through the service client (seed before navigate, J7). */
  async function seedProduct(
    key: string,
    dials: {
      kind?: "level" | "reach";
      enabled?: boolean;
      days?: number;
      maxPhotos?: number;
      placement?: string;
      badge?: boolean;
      sort?: number;
    } = {},
  ) {
    await destroyProduct(key);
    const kind = dials.kind ?? "level";
    const { error } = await adminClient()
      .from("listing_packages")
      .insert({
        key,
        kind,
        name_en: `Scratch ${key}`,
        days: dials.days ?? 7,
        enabled: dials.enabled ?? true,
        self_serve: true,
        extends_lifetime: true,
        sort: dials.sort ?? 90,
        ...(kind === "level"
          ? {
              max_photos: dials.maxPhotos ?? 10,
              placement: dials.placement ?? "standard",
              badge: dials.badge ?? false,
            }
          : {}),
      });
    if (error) throw new Error(`${TAG} seeding ${key} failed: ${error.message}`);
    products.push(key);
  }

  /** A price written directly (the doors are what the tests prove; this is a fixture). */
  async function seedPrice(
    key: string,
    row: {
      countryCode?: string | null;
      categoryId?: string | null;
      amount: number;
      currency: string;
      creditCost?: number;
      validFrom?: string;
      validTo?: string | null;
      usedCount?: number;
    },
  ): Promise<string> {
    const { data, error } = await adminClient()
      .from("package_prices")
      .insert({
        package_key: key,
        country_code: row.countryCode ?? null,
        category_id: row.categoryId ?? null,
        amount: row.amount,
        currency: row.currency,
        credit_cost: row.creditCost ?? 1,
        valid_from: row.validFrom ?? new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        valid_to: row.validTo ?? null,
        used_count: row.usedCount ?? 0,
      })
      .select("id")
      .single();
    if (error || !data) throw new Error(`${TAG} seeding a price failed: ${error?.message}`);
    return data.id as string;
  }

  /** The joined resource's name on a permissions row, narrowed by shape (no cast). */
  function resourceNameOf(row: unknown): string | null {
    if (typeof row !== "object" || row === null || !("resources" in row)) return null;
    const joined = row.resources;
    if (typeof joined !== "object" || joined === null || !("name" in joined)) return null;
    return typeof joined.name === "string" ? joined.name : null;
  }

  /** A pooled account holding exactly the named permissions through a scratch role. */
  async function scratchHolder(wanted: Array<[resource: string, action: string]>) {
    const supabase = adminClient();
    const roleName = `e2e_mon_role_${token()}`;
    const { data: role, error: roleError } = await supabase
      .from("roles")
      .insert({ name: roleName, display_name: roleName, priority: 1 })
      .select("id")
      .single();
    if (roleError || !role) throw new Error(`${TAG} scratch role failed: ${roleError?.message}`);
    roles.push(role.id as string);
    const { data: perms } = await supabase
      .from("permissions")
      .select("id, action, resources!inner(name)")
      .in("resources.name", [...new Set(wanted.map(([resource]) => resource))]);
    const picked = (perms ?? []).filter((p) =>
      wanted.some(([resource, action]) => resourceNameOf(p) === resource && p.action === action),
    );
    expect(
      picked,
      `${TAG} expected exactly ${wanted.map((pair) => pair.join(":")).join(", ")}`,
    ).toHaveLength(wanted.length);
    const granted = await supabase
      .from("role_permissions")
      .insert(picked.map((p) => ({ role_id: role.id, permission_id: p.id })));
    if (granted.error) throw new Error(`${TAG} grant failed: ${granted.error.message}`);
    const holder = await leaseUser();
    const assigned = await supabase
      .from("user_roles")
      .insert({ user_id: holder.id, role_id: role.id, scope_type: "global" });
    if (assigned.error) throw new Error(`${TAG} assignment failed: ${assigned.error.message}`);
    return holder;
  }

  /** A scratch root with a leaf; the root is what an override and a season bind to. */
  async function seedRoot() {
    const branch = await seedCategoryBranch();
    branches.push([branch.parent.slug as string, branch.leaf.slug as string]);
    categoryIds.push(branch.parent.id as string, branch.leaf.id as string);
    return { rootId: branch.parent.id as string, leafId: branch.leaf.id as string };
  }

  async function openConsole(page: Page) {
    await gotoReady(page, "/admin/monetisation");
    await expect(section(page)).toBeVisible({ timeout: 20000 });
  }

  test("MON-1 the menu entry, the order strip and the three blocks on both twins, no horizontal overflow; a level opens to its perks and prices; the real rows are read", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin");
    await expect(page.getByTestId("admin-section-link-monetisation")).toBeVisible({
      timeout: 20000,
    });
    await openConsole(page);
    // P-1c (D313) — the strip first: three numbered steps, each a link into the page.
    const strip = page.getByTestId("monetisation-order");
    await expect(strip).toBeVisible();
    for (const step of ["markets", "products", "prices"]) {
      await expect(strip.getByTestId(`monetisation-order-${step}`)).toBeVisible();
      await expect(strip.getByTestId(`monetisation-order-${step}-state`)).toBeVisible();
    }
    await expect(strip.locator("li")).toHaveCount(3);
    for (const id of ["markets", "levels", "reach"]) {
      await expect(block(page, id), `MON-1 the ${id} block`).toBeVisible();
      await expect(block(page, id).getByTestId(`monetisation-${id}-header`)).toBeVisible();
      await expect(block(page, id).getByTestId(`monetisation-${id}-columns`)).toBeVisible();
    }
    // Regrouped by product: no page-wide perks or prices block; the page keeps one h1.
    await expect(block(page, "overrides")).toHaveCount(0);
    await expect(block(page, "prices")).toHaveCount(0);
    await expect(section(page).locator("h1")).toHaveCount(1);
    // The real rows, read: a level's days and the default market's free ads.
    const { data: levels, error } = await adminClient()
      .from("listing_packages")
      .select("key, days")
      .eq("kind", "level")
      .eq("enabled", true)
      .order("sort")
      .limit(1);
    if (error) throw new Error(`${TAG} reading the levels failed: ${error.message}`);
    const level = levels?.[0];
    expect(level, "MON-1 a seeded level is missing").toBeTruthy();
    const row = productRow(page, "levels", String(level?.key));
    await expect(row).toBeVisible({ timeout: 20000 });
    await expect(row.getByTestId(`product-${level?.key}-days`)).toHaveText(String(level?.days));
    // A level opens to its own perks table and prices table (each with Add, search on prices).
    const levelKey = String(level?.key);
    await openProduct(page, "levels", levelKey);
    await expect(productFrame(page, levelKey, "perks")).toBeVisible();
    await expect(page.getByTestId(`product-${levelKey}-override-add`)).toBeVisible();
    await expect(page.getByTestId(`product-${levelKey}-price-add`)).toBeVisible();
    await expect(page.getByTestId(`product-${levelKey}-prices-search`)).toBeVisible();
    await expect(section(page).locator("h1")).toHaveCount(1);
    await expectNoHorizontalOverflow(page);
    const stored = await readMarket(null);
    expect(stored, "MON-1 the default market row is missing").not.toBeNull();
    await expect(marketRow(page, "default").getByTestId("market-default-free-ads")).toHaveText(
      String(stored?.free_regular_ads),
    );
    await expectNoHorizontalOverflow(page);
    await switchLanguage(page, "am");
    await expect(page.getByTestId("monetisation-header")).toContainText(
      am["admin.section.monetisation.title"],
    );
    await expect(page.getByTestId("monetisation-levels-header")).toContainText(
      am["admin.monetisation.levels.title"],
    );
    await expectNoHorizontalOverflow(page);
  });

  test("MON-2 gating: a reviewer has no entry and a deep link is turned away; a packages:view-only staff sees the blocks without a verb; the doors refuse both by name", async ({
    page,
  }, testInfo) => {
    const key = scratchKey("deny", testInfo.project.name);
    await destroyProduct(key);
    const since = new Date().toISOString();
    const reviewer = await scratchHolder([
      ["admin_panel", "access"],
      ["listings", "view"],
      ["listings", "review"],
    ]);
    await signInViaSession(page, reviewer.email, reviewer.password);
    await gotoReady(page, "/admin");
    await expect(page.getByTestId("admin-nav-cards")).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("admin-section-link-monetisation")).toHaveCount(0);
    await page.goto("/admin/monetisation");
    await waitForHydration(page);
    await expect(section(page), "MON-2 the reviewer saw the screen").toHaveCount(0);
    expect(
      await doorError(page, "admin_save_listing_package", {
        p_key: key,
        p_kind: "level",
        p_name_en: "Scratch",
        p_days: 7,
        p_enabled: true,
        p_self_serve: true,
        p_extends_lifetime: true,
      }),
    ).toBe("permission denied");
    expect(await doorError(page, "admin_list_monetisation", {})).toBe("denied");

    const viewer = await scratchHolder([
      ["admin_panel", "access"],
      ["packages", "view"],
    ]);
    await signInViaSession(page, viewer.email, viewer.password);
    await openConsole(page);
    for (const id of ["markets", "levels", "reach"]) {
      await expect(block(page, id), `MON-2 the viewer's ${id} block`).toBeVisible();
    }
    // A product's open row shows its perks and prices without a verb either.
    const viewed = await firstLevel();
    await openProduct(page, "levels", viewed);
    for (const verb of [
      "monetisation-market-add",
      "monetisation-level-add",
      "monetisation-reach-add",
      `product-${viewed}-override-add`,
      `product-${viewed}-price-add`,
    ]) {
      await expect(page.getByTestId(verb), `MON-2 the viewer saw ${verb}`).toHaveCount(0);
    }
    await expect(section(page).locator("[data-testid$='-edit']")).toHaveCount(0);
    await expect(section(page).locator("[data-testid$='-more']")).toHaveCount(0);
    expect(
      await doorError(page, "admin_save_market_settings", {
        p_free_regular_ads: 1,
        p_included_reach: await firstReach(),
        p_paid_levels: false,
      }),
    ).toBe("permission denied");
    expect(await readProduct(key)).toBeNull();
    expect(await audits("listing_package", key, "package.saved", since)).toHaveLength(0);
  });

  test("MON-3 /admin/packages and /admin/coverage send their reader to the console", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    for (const old of ["/admin/packages", "/admin/coverage"]) {
      await page.goto(old);
      await waitForHydration(page);
      await expect(page).toHaveURL(/\/admin\/monetisation$/, { timeout: 20000 });
      await expect(section(page)).toBeVisible({ timeout: 20000 });
    }
  });

  test("MON-4 a level is created with its perks and both names, shown under the language switch, edited, and attributed to its author and editor by name", async ({
    page,
  }, testInfo) => {
    const { secret, user } = await useJobSuperAdmin(page);
    const key = scratchKey("lvl", testInfo.project.name);
    await destroyProduct(key);
    products.push(key);
    const since = new Date().toISOString();
    const nameEn = `Scratch level ${token()}`;
    // A Latin placeholder stands in for the Amharic name: the field, not the word, is proven.
    const nameAm = `${nameEn} (am)`;
    await openConsole(page);

    await page.getByTestId("monetisation-level-add").click();
    const create = page.getByTestId("monetisation-level-create");
    await expect(create).toBeVisible({ timeout: 20000 });
    await create.getByTestId("monetisation-level-create-key").fill(key.toUpperCase());
    await expect(create.getByTestId("monetisation-level-create-key")).toHaveValue(key);
    await create.getByTestId("monetisation-level-create-name-en").fill(nameEn);
    await create.getByTestId("monetisation-level-create-name-am").fill(nameAm);
    await create.getByTestId("monetisation-level-create-days").fill("45");
    await create.getByTestId("monetisation-level-create-photos").fill("12");
    await create.getByTestId("monetisation-level-create-placement").selectOption("boost");
    await create.getByTestId("monetisation-level-create-badge").check();
    await create.getByTestId("monetisation-level-create-sort").fill("77");
    await create.getByTestId("monetisation-level-create-save").click();
    await awaitGuardedOutcome(page, secret, productRow(page, "levels", key));
    await expect(create).toHaveCount(0);

    let stored = await readProduct(key);
    expect(stored).toMatchObject({
      key,
      kind: "level",
      name_en: nameEn,
      name_am: nameAm,
      days: 45,
      max_photos: 12,
      placement: "boost",
      badge: true,
      enabled: true,
      self_serve: true,
      extends_lifetime: true,
      sort: 77,
      created_by: user.id,
      updated_by: user.id,
    });
    const row = productRow(page, "levels", key);
    await expect(row.getByTestId(`product-${key}-name`)).toHaveText(nameEn);
    await expect(row.getByTestId(`product-${key}-days`)).toHaveText("45");
    // P-1c: the new level opens to its own (empty) perks and prices, and closes again.
    await openProduct(page, "levels", key);
    await expect(
      productFrame(page, key, "perks").getByTestId(`product-${key}-perks-empty`),
    ).toBeVisible();
    await expect(
      productFrame(page, key, "prices").getByTestId(`product-${key}-prices-empty`),
    ).toBeVisible();
    await row.getByTestId(`product-${key}-open`).click();
    await expect(productFrame(page, key, "prices")).toHaveCount(0);
    await expect(row.getByTestId(`product-${key}-placement`)).toHaveText(
      en["admin.monetisation.placement.boost"],
    );
    // The author and the editor by name, never an id (the detail tier: shown in the row or its card).
    const author = await displayNameOf(user.id);
    expect(author).not.toBe("");
    await expect(blockTable(page, "levels").getByTestId(`product-${key}-created-by`)).toHaveText(
      author,
    );
    await expect(blockTable(page, "levels").getByTestId(`product-${key}-updated-by`)).toHaveText(
      author,
    );

    // The language switch shows the Amharic name.
    await switchLanguage(page, "am");
    await expect(row.getByTestId(`product-${key}-name`)).toHaveText(nameAm, { timeout: 20000 });
    await switchLanguage(page, "en");
    await expect(row.getByTestId(`product-${key}-name`)).toHaveText(nameEn, { timeout: 20000 });

    // Edit: the key is shown, never a field; the days change and the level is switched off.
    const editor = await openProductEditor(page, "levels", key);
    await expect(editor.getByTestId("monetisation-level-edit-key")).toHaveText(key);
    await expect(editor.locator("input[data-testid='monetisation-level-edit-key']")).toHaveCount(0);
    await expect(editor.getByTestId("monetisation-level-edit-days")).toHaveValue("45");
    await expect(editor.getByTestId("monetisation-level-edit-name-am")).toHaveValue(nameAm);
    await editor.getByTestId("monetisation-level-edit-days").fill("60");
    await editor.getByTestId("monetisation-level-edit-enabled").uncheck();
    await editor.getByTestId("monetisation-level-edit-save").click();
    await awaitGuardedOutcome(page, secret, {
      poll: async () => (await readProduct(key))?.days === 60,
      describe: `the level ${key} with 60 days`,
    });
    await expect(editor).toHaveCount(0);
    stored = await readProduct(key);
    expect(stored).toMatchObject({
      days: 60,
      enabled: false,
      name_am: nameAm,
      max_photos: 12,
      placement: "boost",
      badge: true,
      sort: 77,
    });
    await expect(row.getByTestId(`product-${key}-days`)).toHaveText("60", { timeout: 20000 });
    await expect(row.getByTestId(`product-${key}-enabled`)).toHaveText(en["admin.packages.off"]);

    // Two saves, two audit rows: old → new each time (the first has no old).
    const trail = await audits("listing_package", key, "package.saved", since);
    expect(trail).toHaveLength(2);
    const metaOf = (index: number): { old: unknown; new: unknown } => {
      const meta: unknown = trail[index]?.meta;
      if (meta === null || typeof meta !== "object" || !("new" in meta)) {
        throw new Error(`${TAG} audit row ${index} of ${key} has no old/new`);
      }
      return { old: "old" in meta ? (meta.old ?? null) : null, new: meta.new };
    };
    expect(metaOf(0).old).toBeNull();
    expect(metaOf(0).new).toMatchObject({ key, days: 45, enabled: true });
    expect(metaOf(1).old).toMatchObject({ days: 45, enabled: true });
    expect(metaOf(1).new).toMatchObject({ days: 60, enabled: false });
  });

  test("MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const key = scratchKey("reach", testInfo.project.name);
    await destroyProduct(key);
    products.push(key);
    await openConsole(page);

    await page.getByTestId("monetisation-reach-add").click();
    const create = page.getByTestId("monetisation-reach-create");
    await expect(create).toBeVisible({ timeout: 20000 });
    // A reach product has no perks: the editor shows none of the level fields.
    await expect(create.getByTestId("monetisation-reach-create-photos")).toHaveCount(0);
    await expect(create.getByTestId("monetisation-reach-create-placement")).toHaveCount(0);
    await create.getByTestId("monetisation-reach-create-key").fill(key);
    await create.getByTestId("monetisation-reach-create-name-en").fill(`Scratch reach ${key}`);
    await create.getByTestId("monetisation-reach-create-days").fill("30");
    await create.getByTestId("monetisation-reach-create-save").click();
    await awaitGuardedOutcome(page, secret, productRow(page, "reach", key));
    await expect(create).toHaveCount(0);
    expect(await readProduct(key)).toMatchObject({
      key,
      kind: "reach",
      days: 30,
      max_photos: null,
      placement: null,
      badge: false,
    });
    await expect(productRow(page, "levels", key)).toHaveCount(0);
    // P-1c: a reach row opens to its prices only — no per-category perks table.
    await openProduct(page, "reach", key);
    await expect(productFrame(page, key, "perks")).toHaveCount(0);
    await expect(page.getByTestId(`product-${key}-override-add`)).toHaveCount(0);
    // The door refuses perks on a reach row by name (the UI never offers them).
    expect(
      await doorError(page, "admin_save_listing_package", {
        p_key: key,
        p_kind: "reach",
        p_name_en: `Scratch reach ${key}`,
        p_days: 30,
        p_enabled: true,
        p_self_serve: true,
        p_extends_lifetime: true,
        p_max_photos: 5,
      }),
    ).toBe("perks on reach");
    expect((await readProduct(key))?.max_photos).toBeNull();
  });

  test("MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const key = scratchKey("perk", testInfo.project.name);
    await seedProduct(key, { days: 7, maxPhotos: 10, placement: "standard" });
    const since = new Date().toISOString();
    const { rootId, leafId } = await seedRoot();
    const market = await seedSingleOptionMarket();
    countries.push(market.code);
    await waitForOpenMarket(page, market.code, OPEN_MARKET_LS11_MS);

    // The level's own values before any cell.
    expect(await perksFor(key, leafId, market.code)).toMatchObject({ days: 7, maxPhotos: 10 });

    await openConsole(page);
    await openProduct(page, "levels", key);
    const addOverride = async (
      scope: { category: string; country: string },
      cells: { days?: string; photos?: string },
      expectedRows: number,
    ) => {
      await page.getByTestId(`product-${key}-override-add`).click();
      const dialog = page.getByTestId("monetisation-override-create");
      await expect(dialog).toBeVisible({ timeout: 20000 });
      // The level is given by the row: a line, never a pick (P-1c).
      await expect(dialog.getByTestId("monetisation-override-create-level")).toHaveText(
        (await readProduct(key))?.name_en as string,
      );
      await expect(
        dialog.locator("select[data-testid='monetisation-override-create-level']"),
      ).toHaveCount(0);
      await dialog
        .getByTestId("monetisation-override-create-category")
        .selectOption(scope.category);
      await dialog.getByTestId("monetisation-override-create-country").selectOption(scope.country);
      if (cells.days !== undefined) {
        await dialog.getByTestId("monetisation-override-create-days").fill(cells.days);
      }
      if (cells.photos !== undefined) {
        await dialog.getByTestId("monetisation-override-create-photos").fill(cells.photos);
      }
      await dialog.getByTestId("monetisation-override-create-save").click();
      await awaitGuardedOutcome(page, secret, {
        poll: async () => (await readOverrides(key)).length === expectedRows,
        describe: `${expectedRows} override rows of ${key}`,
      });
      await expect(dialog).toHaveCount(0);
    };

    // An empty cell is refused before the round trip, by name.
    await page.getByTestId(`product-${key}-override-add`).click();
    const empty = page.getByTestId("monetisation-override-create");
    await expect(empty).toBeVisible({ timeout: 20000 });
    await empty.getByTestId("monetisation-override-create-save").click();
    await expect(empty.getByTestId("monetisation-override-create-error")).toHaveText(
      en["admin.monetisation.error.emptyOverride"],
    );
    expect(await readOverrides(key)).toHaveLength(0);
    await empty.getByTestId("monetisation-override-create-cancel").click();
    await expect(empty).toHaveCount(0);

    // (root, any) days 45; (any, market) days 20 and photos 7.
    await addOverride({ category: rootId, country: "" }, { days: "45" }, 1);
    await addOverride({ category: "", country: market.code }, { days: "20", photos: "7" }, 2);
    const [byRoot, byMarket] = await readOverrides(key);
    expect(byRoot).toMatchObject({ category_id: rootId, country_code: null, days: 45 });
    expect(byMarket).toMatchObject({
      category_id: null,
      country_code: market.code,
      days: 20,
      max_photos: 7,
    });
    for (const row of [byRoot, byMarket]) {
      expect(
        await audits("level_override", row?.id as string, "level_override.saved", since),
      ).toHaveLength(1);
    }
    // The rows as data: the root's name and the "every country" word; a blank photos cell.
    const rootRow = overrideRow(page, key, byRoot?.id as string);
    await expect(rootRow).toBeVisible({ timeout: 20000 });
    await expect(rootRow.getByTestId(`override-${byRoot?.id}-days`)).toHaveText("45");
    await expect(rootRow.getByTestId(`override-${byRoot?.id}-photos`)).toHaveText("");
    await expect(rootRow.getByTestId(`override-${byRoot?.id}-country`)).toHaveText(
      en["admin.monetisation.countryAny"],
    );

    // Precedence per column, as the service client reads it: the leaf inherits the
    // root's cell; the market's cell beats it for days and photos; elsewhere the
    // root's days with the level's photos.
    expect(await perksFor(key, leafId, market.code)).toMatchObject({ days: 20, maxPhotos: 7 });
    expect(await perksFor(key, leafId, null)).toMatchObject({ days: 45, maxPhotos: 10 });
    expect(await perksFor(key, rootId, null)).toMatchObject({ days: 45, maxPhotos: 10 });

    // Edit the market's cell: photos cleared (blank = the level's own), days kept.
    const perksTable = tableOf(productFrame(page, key, "perks"), page);
    await actionsOf(page, perksTable, `override-${byMarket?.id}`)
      .getByTestId(`override-actions-${byMarket?.id}-edit`)
      .click();
    const edit = page.getByTestId("monetisation-override-edit");
    await expect(edit).toBeVisible({ timeout: 20000 });
    await expect(edit.getByTestId("monetisation-override-edit-photos")).toHaveValue("7");
    await edit.getByTestId("monetisation-override-edit-photos").fill("");
    await edit.getByTestId("monetisation-override-edit-save").click();
    await awaitGuardedOutcome(page, secret, {
      poll: async () => (await readOverrides(key))[1]?.max_photos === null,
      describe: `the market cell of ${key} without photos`,
    });
    await expect(edit).toHaveCount(0);
    expect(await perksFor(key, leafId, market.code)).toMatchObject({ days: 20, maxPhotos: 10 });

    // Clear the market's cell (a red verb, confirmed): the leaf in the market falls to the root's days.
    await actionsOf(page, perksTable, `override-${byMarket?.id}`)
      .getByTestId(`override-actions-${byMarket?.id}-more`)
      .click();
    await page.getByTestId(`override-actions-${byMarket?.id}-more-clear`).click();
    const clear = page.getByTestId("monetisation-override-clear");
    await expect(clear).toBeVisible({ timeout: 20000 });
    await clear.getByTestId("monetisation-override-clear-confirm").click();
    await awaitGuardedOutcome(page, secret, {
      poll: async () => (await readOverrides(key)).length === 1,
      describe: `the market cell of ${key} cleared`,
    });
    await expect(clear).toHaveCount(0);
    await expect(overrideRow(page, key, byMarket?.id as string)).toHaveCount(0);
    expect(await perksFor(key, leafId, market.code)).toMatchObject({ days: 45, maxPhotos: 10 });
    expect(
      await audits("level_override", byMarket?.id as string, "level_override.cleared", since),
    ).toHaveLength(1);
  });

  test("MON-7 a season: a root ending in ten days caps the level's days and names season_until; an ended season answers 0", async ({
    page,
  }, testInfo) => {
    await useJobSuperAdmin(page);
    const key = scratchKey("season", testInfo.project.name);
    await seedProduct(key, { days: 60 });
    const { rootId, leafId } = await seedRoot();
    const until = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString();
    const season = await adminClient()
      .from("categories")
      .update({ visible_until: until })
      .eq("id", rootId);
    if (season.error) throw new Error(`${TAG} the season failed: ${season.error.message}`);

    const capped = await perksFor(key, leafId, null);
    expect(capped).not.toBeNull();
    expect(Number(capped?.days)).toBeLessThanOrEqual(10);
    expect(Number(capped?.days)).toBeGreaterThanOrEqual(9);
    expect(capped?.seasonUntil).not.toBeNull();
    // The level's own row still says 60: the console shows the product, the resolver the ad's truth.
    await openConsole(page);
    await expect(productRow(page, "levels", key).getByTestId(`product-${key}-days`)).toHaveText(
      "60",
      { timeout: 20000 },
    );
    const ended = await adminClient()
      .from("categories")
      .update({ visible_until: new Date(Date.now() - 60 * 1000).toISOString() })
      .eq("id", rootId);
    if (ended.error) throw new Error(`${TAG} ending the season failed: ${ended.error.message}`);
    expect(await perksFor(key, leafId, null)).toMatchObject({ days: 0 });
  });

  test("MON-8 Add price inside the product's row names the product; the saved row reads Market · Category with its credit cost; a price for every market and a narrower one; the row's search narrows", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const key = scratchKey("price", testInfo.project.name);
    await seedProduct(key);
    const currency = await firstCurrency();
    const since = new Date().toISOString();
    const { rootId } = await seedRoot();
    const stored = await readProduct(key);
    await openConsole(page);
    await openProduct(page, "levels", key);

    const addPrice = async (
      scope: { market: string; category: string },
      amount: string,
      credits: string,
      expectedRows: number,
    ) => {
      await page.getByTestId(`product-${key}-price-add`).click();
      const dialog = page.getByTestId("monetisation-price-create");
      await expect(dialog).toBeVisible({ timeout: 20000 });
      // The product is given by the row (D287 "product first" → P-1c "product given"): a line, never a pick.
      await expect(dialog.getByTestId("monetisation-price-create-product")).toHaveText(
        stored?.name_en as string,
      );
      await expect(
        dialog.locator("select[data-testid='monetisation-price-create-product']"),
      ).toHaveCount(0);
      await dialog.getByTestId("monetisation-price-create-market").selectOption(scope.market);
      await dialog.getByTestId("monetisation-price-create-category").selectOption(scope.category);
      await dialog.getByTestId("monetisation-price-create-amount").fill(amount);
      await dialog.getByTestId("monetisation-price-create-credit-cost").fill(credits);
      await expect(dialog.getByTestId("monetisation-price-create-currency")).toHaveValue(currency);
      await dialog.getByTestId("monetisation-price-create-save").click();
      await awaitGuardedOutcome(page, secret, {
        poll: async () => (await readPrices(key)).length === expectedRows,
        describe: `${expectedRows} price rows of ${key}`,
      });
      await expect(dialog).toHaveCount(0);
    };

    await addPrice({ market: "", category: "" }, "0", "0", 1);
    await addPrice({ market: "", category: rootId }, "150", "4", 2);
    const [free, byCategory] = await readPrices(key);
    expect(free).toMatchObject({ country_code: null, category_id: null, currency, credit_cost: 0 });
    expect(Number(free?.amount)).toBe(0);
    expect(byCategory).toMatchObject({ country_code: null, category_id: rootId, credit_cost: 4 });
    expect(Number(byCategory?.amount)).toBe(150);
    for (const row of [free, byCategory]) {
      expect(row?.valid_to).toBeNull();
      expect(row?.used_count).toBe(0);
      expect(
        await audits("package_price", row?.id as string, "package_price.saved", since),
      ).toHaveLength(1);
    }

    // The rows as data: "<Market> · <Category>" (the product is the row's frame), the free word, the credit cost.
    const freeRow = priceRow(page, key, free?.id as string);
    await expect(freeRow).toBeVisible({ timeout: 20000 });
    await expect(freeRow.getByTestId(`price-${free?.id}-title`)).toHaveText(
      `${en["admin.packages.prices.everyMarket"]} · ${en["admin.packages.prices.everyCategory"]}`,
    );
    await expect(freeRow.getByTestId(`price-${free?.id}-amount`)).toHaveText(
      en["admin.packages.prices.free"],
    );
    await expect(freeRow.getByTestId(`price-${free?.id}-credits`)).toHaveText("0");
    const narrowRow = priceRow(page, key, byCategory?.id as string);
    await expect(narrowRow.getByTestId(`price-${byCategory?.id}-amount`)).toContainText(currency);
    await expect(narrowRow.getByTestId(`price-${byCategory?.id}-credits`)).toHaveText("4");
    await expect(narrowRow.getByTestId(`price-${byCategory?.id}-to`)).toHaveText(
      en["admin.packages.prices.open"],
    );
    // The product's own search narrows its rows by market or category.
    const search = page.getByTestId(`product-${key}-prices-search`);
    await search.fill(en["admin.packages.prices.everyMarket"]);
    await expect(freeRow).toBeVisible();
    await search.fill(`${key}-nothing`);
    await expect(
      productFrame(page, key, "prices").getByTestId(`product-${key}-prices-empty`),
    ).toBeVisible();
  });

  test("MON-9 Edit while unused: the amount, the credit cost and the end change through the door; the start is kept; the row and the audit follow", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const key = scratchKey("edit", testInfo.project.name);
    await seedProduct(key);
    const currency = await firstCurrency();
    const since = new Date().toISOString();
    const from = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
    const priceId = await seedPrice(key, { amount: 5, currency, creditCost: 2, validFrom: from });
    await openConsole(page);
    await openProduct(page, "levels", key);
    const pricesTable = tableOf(productFrame(page, key, "prices"), page);
    const row = priceRow(page, key, priceId);
    await expect(row).toBeVisible({ timeout: 20000 });

    await actionsOf(page, pricesTable, `price-${priceId}`)
      .getByTestId(`price-actions-${priceId}-edit`)
      .click();
    const edit = page.getByTestId("monetisation-price-edit");
    await expect(edit).toBeVisible({ timeout: 20000 });
    await expect(edit.getByTestId("monetisation-price-edit-product")).toHaveText(
      (await readProduct(key))?.name_en as string,
    );
    await expect(edit.getByTestId("monetisation-price-edit-amount")).toHaveValue("5");
    await expect(edit.getByTestId("monetisation-price-edit-credit-cost")).toHaveValue("2");
    await edit.getByTestId("monetisation-price-edit-amount").fill("8");
    await edit.getByTestId("monetisation-price-edit-credit-cost").fill("3");
    const tomorrow = await browserDay(page, 1);
    await pickDay(page, "monetisation-price-edit-to", tomorrow);
    await edit.getByTestId("monetisation-price-edit-save").click();
    await awaitGuardedOutcome(page, secret, {
      poll: async () => Number((await readPrices(key))[0]?.amount) === 8,
      describe: `the price ${priceId} edited`,
    });
    await expect(edit).toHaveCount(0);

    const [edited] = await readPrices(key);
    expect(edited?.id).toBe(priceId);
    expect(Number(edited?.amount)).toBe(8);
    expect(edited).toMatchObject({ credit_cost: 3, currency, used_count: 0 });
    // The stored start was left alone and kept by the door; the end is the end of tomorrow.
    expect(new Date(edited?.valid_from ?? "").getTime()).toBe(new Date(from).getTime());
    expect(edited?.valid_to).not.toBeNull();
    await expect(row.getByTestId(`price-${priceId}-credits`)).toHaveText("3", { timeout: 20000 });
    await expect(row.getByTestId(`price-${priceId}-to`)).not.toHaveText(
      en["admin.packages.prices.open"],
    );
    const trail = await audits("package_price", priceId, "package_price.edited", since);
    expect(trail).toHaveLength(1);
    expect(trail[0]?.meta).toMatchObject({ old: { credit_cost: 2 }, new: { credit_cost: 3 } });
  });

  test("MON-10 a used price: the service client marks it used, the door refuses Edit by name and nothing changes; after a refresh the verb is gone while End stays", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const key = scratchKey("used", testInfo.project.name);
    await seedProduct(key);
    const currency = await firstCurrency();
    const priceId = await seedPrice(key, { amount: 5, currency, creditCost: 2 });
    await openConsole(page);
    await openProduct(page, "levels", key);
    await expect(priceRow(page, key, priceId)).toBeVisible({ timeout: 20000 });
    const pricesTable = () => tableOf(productFrame(page, key, "prices"), page);
    const actions = actionsOf(page, pricesTable(), `price-${priceId}`);
    await expect(actions.getByTestId(`price-actions-${priceId}-edit`)).toBeVisible();

    // The apply door of P-2 will do this; today the service client stands in for it.
    const used = await adminClient()
      .from("package_prices")
      .update({ used_count: 1 })
      .eq("id", priceId);
    if (used.error) throw new Error(`${TAG} marking ${priceId} used failed: ${used.error.message}`);

    await actions.getByTestId(`price-actions-${priceId}-edit`).click();
    const edit = page.getByTestId("monetisation-price-edit");
    await expect(edit).toBeVisible({ timeout: 20000 });
    await edit.getByTestId("monetisation-price-edit-amount").fill("9");
    await edit.getByTestId("monetisation-price-edit-save").click();
    await awaitGuardedOutcome(page, secret, edit.getByTestId("monetisation-price-edit-error"));
    await expect(edit.getByTestId("monetisation-price-edit-error")).toHaveText(
      en["admin.monetisation.error.priceInUse"],
    );
    const [stored] = await readPrices(key);
    expect(Number(stored?.amount)).toBe(5);
    expect(stored?.used_count).toBe(1);
    await edit.getByTestId("monetisation-price-edit-cancel").click();
    await expect(edit).toHaveCount(0);

    await openConsole(page);
    await openProduct(page, "levels", key);
    await expect(priceRow(page, key, priceId).getByTestId(`price-${priceId}-used`)).toHaveText(
      "1",
      { timeout: 20000 },
    );
    const after = actionsOf(page, pricesTable(), `price-${priceId}`);
    await expect(after.getByTestId(`price-actions-${priceId}-edit`)).toHaveCount(0);
    await expect(after.getByTestId(`price-actions-${priceId}-more`)).toBeVisible();
  });

  test("MON-11 End price sets the end to now; the row stays, says so, offers no verb any more, and the public read no longer lists it", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const key = scratchKey("end", testInfo.project.name);
    await seedProduct(key);
    const currency = await firstCurrency();
    const since = new Date().toISOString();
    const priceId = await seedPrice(key, { amount: 4, currency });

    const { url, key: anonKey } = restBase();
    const anon = createClient(url, anonKey, { auth: { persistSession: false } });
    const publicRows = async () => {
      const { data, error } = await anon.from("package_prices").select("id").eq("package_key", key);
      if (error) throw new Error(`${TAG} the public read failed: ${error.message}`);
      return (data ?? []).map((row) => row.id);
    };
    expect(await publicRows()).toEqual([priceId]);

    await openConsole(page);
    await openProduct(page, "levels", key);
    const row = priceRow(page, key, priceId);
    await expect(row).toBeVisible({ timeout: 20000 });
    await actionsOf(page, tableOf(productFrame(page, key, "prices"), page), `price-${priceId}`)
      .getByTestId(`price-actions-${priceId}-more`)
      .click();
    await page.getByTestId(`price-actions-${priceId}-more-end`).click();
    const dialog = page.getByTestId("monetisation-price-end");
    await expect(dialog).toBeVisible({ timeout: 20000 });
    await dialog.getByTestId("monetisation-price-end-confirm").click();
    await awaitGuardedOutcome(page, secret, {
      poll: async () => (await readPrices(key))[0]?.valid_to !== null,
      describe: `the price ${priceId} ended`,
    });
    await expect(dialog).toHaveCount(0);

    const [ended] = await readPrices(key);
    expect(ended?.id).toBe(priceId);
    expect(new Date(ended?.valid_to ?? "").getTime()).toBeLessThanOrEqual(Date.now());
    await expect(row).toBeVisible();
    await expect(row.getByTestId(`price-${priceId}-to`)).not.toHaveText(
      en["admin.packages.prices.open"],
      { timeout: 20000 },
    );
    await expect(page.getByTestId(`price-actions-${priceId}-more`)).toHaveCount(0);
    await expect(page.getByTestId(`price-actions-${priceId}-edit`)).toHaveCount(0);
    expect(await publicRows()).toEqual([]);
    expect(await audits("package_price", priceId, "package_price.ended", since)).toHaveLength(1);
  });

  test("MON-12 a scratch market: paid levels ON without a bundle is refused by name; ON with 10/30 writes the bundle, paid_levels_since and the audit row; OFF clears the mark", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const since = new Date().toISOString();
    const reach = await firstReach();
    const market = await seedSingleOptionMarket();
    countries.push(market.code);
    await waitForOpenMarket(page, market.code, OPEN_MARKET_LS11_MS);
    await openConsole(page);

    await page.getByTestId("monetisation-market-add").click();
    const create = page.getByTestId("monetisation-market-create");
    await expect(create).toBeVisible({ timeout: 20000 });
    await create.getByTestId("monetisation-market-create-market").selectOption(market.code);
    await create.getByTestId("monetisation-market-create-free-ads").fill("2");
    await create.getByTestId("monetisation-market-create-reach").selectOption(reach);
    await create.getByTestId("monetisation-market-create-paid-levels").check();
    await create.getByTestId("monetisation-market-create-save").click();
    await expect(create.getByTestId("monetisation-market-create-error")).toHaveText(
      en["admin.monetisation.error.launchRequired"],
    );
    expect(await readMarket(market.code)).toBeNull();
    // The door itself refuses the same by name (the UI bypassed, F3).
    expect(
      await doorError(page, "admin_save_market_settings", {
        p_free_regular_ads: 2,
        p_included_reach: reach,
        p_paid_levels: true,
        p_country_code: market.code,
      }),
    ).toBe("launch bundle required");
    expect(await readMarket(market.code)).toBeNull();

    await create.getByTestId("monetisation-market-create-launch-credits").fill("10");
    await create.getByTestId("monetisation-market-create-launch-days").fill("30");
    await create.getByTestId("monetisation-market-create-save").click();
    await awaitGuardedOutcome(page, secret, marketRow(page, market.code));
    await expect(create).toHaveCount(0);
    let stored = await readMarket(market.code);
    expect(stored).toMatchObject({
      country_code: market.code,
      free_regular_ads: 2,
      included_reach: reach,
      paid_levels: true,
      launch_credits: 10,
      launch_days: 30,
    });
    expect(stored?.paid_levels_since).not.toBeNull();
    const row = marketRow(page, market.code);
    await expect(row.getByTestId(`market-${market.code}-free-ads`)).toHaveText("2");
    await expect(row.getByTestId(`market-${market.code}-paid-levels`)).toHaveText(
      en["admin.packages.on"],
    );
    await expect(row.getByTestId(`market-${market.code}-launch`)).toContainText("10");
    expect(
      await audits("market_settings", stored?.id as string, "market.saved", since),
    ).toHaveLength(1);

    // OFF: the mark clears; the bundle is kept as typed.
    await actionsOf(page, blockTable(page, "markets"), `market-${market.code}`)
      .getByTestId(`market-actions-${market.code}-edit`)
      .click();
    const edit = page.getByTestId("monetisation-market-edit");
    await expect(edit).toBeVisible({ timeout: 20000 });
    // The market is shown, never re-chosen (a text, not a select).
    await expect(edit.getByTestId("monetisation-market-edit-market")).toBeVisible();
    await expect(edit.locator("select[data-testid='monetisation-market-edit-market']")).toHaveCount(
      0,
    );
    await edit.getByTestId("monetisation-market-edit-paid-levels").uncheck();
    await edit.getByTestId("monetisation-market-edit-save").click();
    await awaitGuardedOutcome(page, secret, {
      poll: async () => (await readMarket(market.code))?.paid_levels === false,
      describe: `the market ${market.code} switched off`,
    });
    await expect(edit).toHaveCount(0);
    stored = await readMarket(market.code);
    expect(stored).toMatchObject({ paid_levels: false, launch_credits: 10, launch_days: 30 });
    expect(stored?.paid_levels_since).toBeNull();
    await expect(row.getByTestId(`market-${market.code}-paid-levels`)).toHaveText(
      en["admin.packages.off"],
      { timeout: 20000 },
    );
    expect(
      await audits("market_settings", stored?.id as string, "market.saved", since),
    ).toHaveLength(2);
  });

  test("MON-13 the browser roles read enabled products and valid prices by their own columns, never created_by or updated_by; the console rpc refuses them", async () => {
    const project = test.info().project.name;
    const { url, key: anonKey } = restBase();
    const currency = await firstCurrency();
    const shown = scratchKey("pubon", project);
    const hidden = scratchKey("puboff", project);
    await seedProduct(shown);
    await seedProduct(hidden, { enabled: false });
    const live = await seedPrice(shown, { amount: 1, currency });
    const ended = await seedPrice(shown, {
      amount: 2,
      currency,
      validFrom: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      validTo: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    });
    const ownProduct =
      "key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort, created_at, updated_at";
    const ownPrice =
      "id, package_key, country_code, category_id, amount, currency, credit_cost, used_count, valid_from, valid_to, created_at, updated_at";

    const anon = createClient(url, anonKey, { auth: { persistSession: false } });
    const plain = await leaseUser();
    const signedIn = createClient(url, anonKey, { auth: { persistSession: false } });
    const { error: signInError } = await signedIn.auth.signInWithPassword({
      email: plain.email,
      password: plain.password,
    });
    expect(
      signInError,
      `MON-13 the account did not sign in: ${signInError?.message ?? ""}`,
    ).toBeNull();

    for (const [who, client] of [
      ["anon", anon],
      ["signed-in", signedIn],
    ] as const) {
      const productsRead = await client
        .from("listing_packages")
        .select(ownProduct)
        .in("key", [shown, hidden])
        .order("key");
      expect(
        productsRead.error,
        `MON-13 ${who}: the product's own columns were refused`,
      ).toBeNull();
      expect(
        (productsRead.data ?? []).map((row) => row.key),
        `MON-13 ${who}: a disabled product was listed`,
      ).toEqual([shown]);
      const pricesRead = await client
        .from("package_prices")
        .select(ownPrice)
        .eq("package_key", shown);
      expect(pricesRead.error, `MON-13 ${who}: the price's own columns were refused`).toBeNull();
      expect(
        (pricesRead.data ?? []).map((row) => row.id),
        `MON-13 ${who}: an ended price was listed (${ended})`,
      ).toEqual([live]);
      for (const table of ["listing_packages", "package_prices", "level_overrides"] as const) {
        for (const column of ["created_by", "updated_by"] as const) {
          const hiddenColumn = await client.from(table).select(column).limit(1);
          expect(hiddenColumn.error?.code, `MON-13 ${who}: ${table}.${column} was readable`).toBe(
            "42501",
          );
        }
        const every = await client.from(table).select("*").limit(1);
        expect(every.error?.code, `MON-13 ${who}: every column of ${table} was readable`).toBe(
          "42501",
        );
      }
      // A market's dials are public (the wizard reads them); its authors are not.
      const market = await client
        .from("market_settings")
        .select("id, free_regular_ads, included_reach, paid_levels")
        .limit(1);
      expect(market.error, `MON-13 ${who}: the market's own columns were refused`).toBeNull();
      const marketAuthor = await client.from("market_settings").select("created_by").limit(1);
      expect(
        marketAuthor.error?.code,
        `MON-13 ${who}: market_settings.created_by was readable`,
      ).toBe("42501");
      const console = await client.rpc("admin_list_monetisation");
      expect(console.error?.message, `MON-13 ${who}: the console rpc answered`).toMatch(
        /denied|not signed in|permission denied/,
      );
    }
    await signedIn.auth.signOut();
  });

  test("MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const spentStep = totpStep();
    const key = scratchKey("aal", testInfo.project.name);
    await destroyProduct(key);
    products.push(key);
    await openConsole(page);

    await page.getByTestId("monetisation-level-add").click();
    const create = page.getByTestId("monetisation-level-create");
    await expect(create).toBeVisible({ timeout: 20000 });
    await create.getByTestId("monetisation-level-create-key").fill(key);
    await create.getByTestId("monetisation-level-create-name-en").fill(`Scratch ${key}`);
    await create.getByTestId("monetisation-level-create-days").fill("3");
    await create.getByTestId("monetisation-level-create-photos").fill("5");
    // INC-620 — the client is told its step-up is stale; the next guarded action asks.
    await staleStepUpOnClient(page);
    await create.getByTestId("monetisation-level-create-save").click();
    await expect(page.getByTestId("step-up-modal")).toBeVisible({ timeout: 20000 });
    // Nothing was written while the gate stands.
    expect(await readProduct(key)).toBeNull();
    await afterTotpStep(spentStep);
    await stepUpIfPrompted(page, secret, { typed: true });
    // The outcome is reported after the round trip: the row appears and the dialog closes.
    await expect(productRow(page, "levels", key)).toBeVisible({ timeout: 20000 });
    await expect(create).toHaveCount(0);
    expect(await readProduct(key)).toMatchObject({ key, kind: "level", days: 3, max_photos: 5 });
  });

  /** A scratch market with paid levels ON, written as a fixture (MON-12 proves the door). */
  async function seedMarketOn(code: string) {
    const { error } = await adminClient()
      .from("market_settings")
      .insert({
        country_code: code,
        free_regular_ads: 1,
        included_reach: await firstReach(),
        paid_levels: true,
        launch_credits: 10,
        launch_days: 30,
        paid_levels_since: new Date().toISOString(),
      });
    if (error) throw new Error(`${TAG} seeding the market ${code} on failed: ${error.message}`);
  }

  test("MON-16 the order strip: a market switched on with a sellable product that has no price reads Needs a row, names a product and its market, and its link opens that product's prices", async ({
    page,
  }, testInfo) => {
    await useJobSuperAdmin(page);
    const key = scratchKey("strip", testInfo.project.name);
    await seedProduct(key, { sort: 0 });
    const market = await seedSingleOptionMarket();
    countries.push(market.code);
    await seedMarketOn(market.code);
    await waitForOpenMarket(page, market.code, OPEN_MARKET_LS11_MS);
    const pairs = await unpricedPairs(new Date().toISOString());
    expect(pairs, "MON-16 the scratch pair is missing from the rows").toContainEqual({
      key,
      market: market.code,
    });
    await openConsole(page);

    const step = page.getByTestId("monetisation-order-prices");
    await expect(step).toHaveAttribute("data-state", "needsRow");
    await expect(step.getByTestId("monetisation-order-prices-state")).toHaveText(
      en["prim.orderStrip.needsRow"],
    );
    // The detail names the first such product and market: one of the pairs the rows hold.
    const detail = await step.getByTestId("monetisation-order-prices-detail").textContent();
    const namedPairs = await Promise.all(
      pairs.map(async (pair) => {
        const product = await readProduct(pair.key);
        return { pair, name: product?.name_en ?? "", kind: product?.kind ?? "" };
      }),
    );
    const named = namedPairs.find(({ name }) => name !== "" && (detail ?? "").includes(name));
    expect(named, `MON-16 the detail "${detail}" names no unpriced product`).toBeTruthy();
    const namedKey = named?.pair.key as string;
    // The link opens that product's row (on the drawn twin) on its prices table.
    await step.click();
    await expect(page).toHaveURL(new RegExp(`#product-${namedKey}-prices$`));
    await expect(productFrame(page, namedKey, "prices")).toBeVisible({ timeout: 20000 });
    await expect(
      productRow(page, named?.kind === "reach" ? "reach" : "levels", namedKey).getByTestId(
        `product-${namedKey}-open`,
      ),
    ).toHaveAttribute("aria-expanded", "true");
    // Markets names the switched-on market; Products is Set (the real level and reach rows).
    await expect(page.getByTestId("monetisation-order-markets-detail")).toContainText(
      market.anchor.name_en as string,
    );
    await expect(page.getByTestId("monetisation-order-products")).toHaveAttribute(
      "data-state",
      "set",
    );
  });

  test("MON-17 the order strip: a price added for every market clears the product from Needs a row; the strip reads Set once no pair is left", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const key = scratchKey("set", testInfo.project.name);
    await seedProduct(key, { sort: 0 });
    const currency = await firstCurrency();
    const market = await seedSingleOptionMarket();
    countries.push(market.code);
    await seedMarketOn(market.code);
    await waitForOpenMarket(page, market.code, OPEN_MARKET_LS11_MS);
    await openConsole(page);
    const step = page.getByTestId("monetisation-order-prices");
    await expect(step).toHaveAttribute("data-state", "needsRow");

    // Add price inside the product's row, for every market and every category.
    await openProduct(page, "levels", key);
    await page.getByTestId(`product-${key}-price-add`).click();
    const dialog = page.getByTestId("monetisation-price-create");
    await expect(dialog).toBeVisible({ timeout: 20000 });
    await dialog.getByTestId("monetisation-price-create-amount").fill("12");
    await dialog.getByTestId("monetisation-price-create-credit-cost").fill("2");
    await expect(dialog.getByTestId("monetisation-price-create-currency")).toHaveValue(currency);
    await dialog.getByTestId("monetisation-price-create-save").click();
    await awaitGuardedOutcome(page, secret, {
      poll: async () => (await readPrices(key)).length === 1,
      describe: `the price of ${key}`,
    });
    await expect(dialog).toHaveCount(0);

    // The strip follows the page's read: the product is priced everywhere now.
    const name = (await readProduct(key))?.name_en ?? key;
    const left = await unpricedPairs(new Date().toISOString());
    expect(left.some((pair) => pair.key === key)).toBe(false);
    if (left.length === 0) {
      await expect(step).toHaveAttribute("data-state", "set", { timeout: 20000 });
      await expect(step.getByTestId("monetisation-order-prices-state")).toHaveText(
        en["prim.orderStrip.set"],
      );
      await expect(step.getByTestId("monetisation-order-prices-detail")).toHaveCount(0);
    } else {
      // Another product of the backend's own rows is still unpriced: the row names it, never ours.
      await expect(step).toHaveAttribute("data-state", "needsRow");
      await expect(step.getByTestId("monetisation-order-prices-detail")).not.toContainText(name, {
        timeout: 20000,
      });
    }
    // Reloaded, the strip reads the same from the server's rows.
    await openConsole(page);
    await expect(step).toHaveAttribute("data-state", left.length === 0 ? "set" : "needsRow");
  });
});
