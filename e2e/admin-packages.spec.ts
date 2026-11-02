import { type Locator, type Page } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

import { TIER_LABEL } from "../src/features/admin-listings/tier-reasons";
import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";
import { expect, test } from "./fixtures";
import { inBrowserClient } from "./helpers/browser-client";
import { destroyCountry } from "./helpers/countries";
import { seedActiveListing } from "./helpers/categories";
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
 * P-1 (D280, D281, D283) — ADMIN › LISTINGS › PACKAGES (PKG-1..PKG-9): the
 * promotions a seller may apply to an ad, and their prices.
 *
 * Identity: the pooled job super admin for consumers (J9); staff of narrower
 * rights through a scratch role. Truth: the service client, never a rendered
 * summary (J4); a price's answer through `package_price_for`, read as the ad's
 * owner. Anchors: structure and testids, never English text (J5); the English
 * and Amharic catalogues are read by key when a word is asserted.
 *
 * FIXTURES (J1 / J3) — `featured_45` and `premium_60` are REAL seeded rows
 * (M1b), so no test mutates them: PKG-1 and PKG-9 only READ them. Every other
 * test seeds its OWN package under the `e2e_pkg_` prefix, namespaced run ×
 * worker × project × test, and removes it (prices first) in `afterEach`; its
 * audit rows outlive it, so an audit read is bounded by the test's own start.
 */

const TWIN_BOUNDARY = 1024;
const SCRATCH_PREFIX = "e2e_pkg_";

function isCardTwin(page: Page) {
  return (page.viewportSize()?.width ?? TWIN_BOUNDARY) < TWIN_BOUNDARY;
}

/** The one table of a block: its rows on the table twin, its cards on the card twin. */
function tableOf(block: Locator, page: Page): Locator {
  return isCardTwin(page) ? block.getByTestId("data-table-cards") : block.getByRole("table");
}

/** A row: the table row, or on the card twin the card's body. */
function rowOf(page: Page, table: Locator, id: string): Locator {
  return table.getByTestId(isCardTwin(page) ? `${id}-card` : id);
}

/** The whole of a row — on the card twin the card's surface, which holds the footer and the actions. */
function wholeOf(page: Page, table: Locator, id: string): Locator {
  return table.getByTestId(isCardTwin(page) ? `${id}-actions` : id);
}

function actionsOf(page: Page, table: Locator, id: string): Locator {
  return table.getByTestId(isCardTwin(page) ? `${id}-actions` : `${id}-actions-cell`);
}

function packagesSection(page: Page): Locator {
  return page.getByTestId("admin-section-packages");
}

function packagesRoster(page: Page): Locator {
  return page.getByTestId("packages-roster");
}

function pricesSection(page: Page): Locator {
  return page.getByTestId("packages-prices");
}

/** The packages table, in its own block (the prices table sits under it, in its own). */
function packagesTable(page: Page): Locator {
  return tableOf(packagesRoster(page), page);
}

function pricesTable(page: Page): Locator {
  return tableOf(pricesSection(page), page);
}

function packageRow(page: Page, key: string): Locator {
  return rowOf(page, packagesTable(page), `package-${key}`);
}

function packageWhole(page: Page, key: string): Locator {
  return wholeOf(page, packagesTable(page), `package-${key}`);
}

function priceRow(page: Page, id: string): Locator {
  return rowOf(page, pricesTable(page), `price-${id}`);
}

async function openEditor(page: Page, key: string) {
  await actionsOf(page, packagesTable(page), `package-${key}`)
    .getByTestId(`package-actions-${key}-edit`)
    .click();
  await expect(page.getByTestId("packages-editor")).toBeVisible({ timeout: 20000 });
  await settled(page);
}

/** Bundle 11 V2 (INC-543) — the package is chosen in Filters; a chip names it. */
async function choosePackage(page: Page, key: string) {
  await page.getByTestId("packages-prices-filters").click();
  await page.getByTestId(`packages-prices-package-${key}`).click();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("packages-prices-filters-panel")).toHaveCount(0);
  await expect(page.getByTestId("packages-prices-chips-chip-package")).toContainText(key);
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

/** DB truth (J4): the package row read through the service client. */
async function readPackage(key: string) {
  const { data, error } = await adminClient()
    .from("listing_packages")
    .select("key, tier, days, enabled, self_serve, extends_lifetime, label_key, sort")
    .eq("key", key)
    .maybeSingle();
  if (error) throw new Error(`[e2e:pkg] reading the package ${key} failed: ${error.message}`);
  return data;
}

/** DB truth (J4): a package's price rows, oldest first. */
async function readPrices(key: string) {
  const { data, error } = await adminClient()
    .from("package_prices")
    .select("id, country_code, category_id, amount, currency, valid_from, valid_to")
    .eq("package_key", key)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`[e2e:pkg] reading the prices of ${key} failed: ${error.message}`);
  return data ?? [];
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
  if (error) throw new Error(`[e2e:pkg] reading the audit of ${entityId} failed: ${error.message}`);
  return data ?? [];
}

async function destroyPackage(key: string) {
  if (!key.startsWith(SCRATCH_PREFIX)) throw new Error(`[e2e:pkg] refusing to delete ${key}`);
  const supabase = adminClient();
  const prices = await supabase.from("package_prices").delete().eq("package_key", key);
  if (prices.error) throw new Error(`[e2e:pkg] price reap failed: ${prices.error.message}`);
  const row = await supabase.from("listing_packages").delete().eq("key", key);
  if (row.error) throw new Error(`[e2e:pkg] package reap failed: ${row.error.message}`);
}

/** The first curated currency: the create dialog's default (orderCurrencies, home unknown). */
async function firstCurrency(): Promise<string> {
  const { data, error } = await adminClient()
    .from("currencies")
    .select("code")
    .order("display_order", { ascending: true })
    .order("code", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error || !data) throw new Error(`[e2e:pkg] no currency row: ${error?.message ?? "none"}`);
  return data.code as string;
}

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

function restBase(): { url: string; key: string } {
  const url = process.env["E2E_SUPABASE_URL"];
  const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    throw new Error("[e2e:pkg] E2E_SUPABASE_URL and E2E_SUPABASE_PUBLISHABLE_KEY must be set.");
  }
  return { url: url.replace(/\/+$/, ""), key };
}

/** The price the resolver answers for an ad, read as the ad's owner (SECURITY INVOKER). */
async function priceFor(
  owner: { email: string; password: string },
  listingId: string,
  packageKey: string,
) {
  const { url, key } = restBase();
  const client = createClient(url, key, { auth: { persistSession: false } });
  const { error: signInError } = await client.auth.signInWithPassword({
    email: owner.email,
    password: owner.password,
  });
  if (signInError) throw new Error(`[e2e:pkg] the owner did not sign in: ${signInError.message}`);
  const { data, error } = await client.rpc("package_price_for", {
    p_listing_id: listingId,
    p_package_key: packageKey,
  });
  if (error) throw new Error(`[e2e:pkg] package_price_for failed: ${error.message}`);
  await client.auth.signOut();
  return data as { price_id: string; amount: number } | null;
}

test.describe("P-1 Admin › Packages", () => {
  const packages: string[] = [];
  const roles: string[] = [];
  const listings: string[] = [];
  const branches: string[][] = [];
  const countries: string[] = [];

  test.afterEach(async () => {
    const supabase = adminClient();
    for (const id of listings.splice(0)) {
      const removed = await supabase.from("listings").delete().eq("id", id);
      if (removed.error) throw new Error(`[e2e:pkg] listing reap failed: ${removed.error.message}`);
    }
    for (const key of packages.splice(0)) await destroyPackage(key);
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
    for (const code of countries.splice(0)) await destroyCountry(code);
    for (const roleId of roles.splice(0)) {
      const a = await supabase.from("role_permissions").delete().eq("role_id", roleId);
      if (a.error) throw new Error(`[e2e:pkg] role_permissions reap failed: ${a.error.message}`);
      const b = await supabase.from("user_roles").delete().eq("role_id", roleId);
      if (b.error) throw new Error(`[e2e:pkg] user_roles reap failed: ${b.error.message}`);
      const c = await supabase.from("roles").delete().eq("id", roleId);
      if (c.error) throw new Error(`[e2e:pkg] roles reap failed: ${c.error.message}`);
    }
  });

  /** Seeds the test's own package through the service client (seed before navigate, J7). */
  async function seedPackage(
    key: string,
    dials: { enabled?: boolean; tier?: string; days?: number } = {},
  ) {
    await destroyPackage(key);
    const { error } = await adminClient()
      .from("listing_packages")
      .insert({
        key,
        tier: dials.tier ?? "featured",
        days: dials.days ?? 7,
        enabled: dials.enabled ?? true,
        self_serve: true,
        extends_lifetime: true,
        label_key: `package.${key}`,
        sort: 90,
      });
    if (error) throw new Error(`[e2e:pkg] seeding ${key} failed: ${error.message}`);
    packages.push(key);
  }

  /** A price written directly (the doors are what the tests prove; this is a fixture). */
  async function seedPrice(
    key: string,
    row: {
      countryCode?: string | null;
      categoryId?: string | null;
      amount: number;
      currency: string;
      validFrom?: string;
      validTo?: string | null;
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
        valid_from: row.validFrom ?? new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        valid_to: row.validTo ?? null,
      })
      .select("id")
      .single();
    if (error || !data) throw new Error(`[e2e:pkg] seeding a price failed: ${error?.message}`);
    return data.id as string;
  }

  /** A pooled account holding exactly the named permissions through a scratch role. */
  async function scratchHolder(wanted: Array<[resource: string, action: string]>) {
    const supabase = adminClient();
    const roleName = `e2e_pkg_role_${token()}`;
    const { data: role, error: roleError } = await supabase
      .from("roles")
      .insert({ name: roleName, display_name: roleName, priority: 1 })
      .select("id")
      .single();
    if (roleError || !role) throw new Error(`[e2e:pkg] scratch role failed: ${roleError?.message}`);
    roles.push(role.id as string);
    const { data: perms } = await supabase
      .from("permissions")
      .select("id, action, resources!inner(name)")
      .in("resources.name", [...new Set(wanted.map(([resource]) => resource))]);
    const picked = (perms ?? []).filter((p) =>
      wanted.some(
        ([resource, action]) =>
          (p as unknown as { resources: { name: string } }).resources.name === resource &&
          p.action === action,
      ),
    );
    expect(
      picked,
      `[e2e:pkg] expected exactly ${wanted.map((pair) => pair.join(":")).join(", ")}`,
    ).toHaveLength(wanted.length);
    const granted = await supabase
      .from("role_permissions")
      .insert(picked.map((p) => ({ role_id: role.id, permission_id: p.id })));
    if (granted.error) throw new Error(`[e2e:pkg] grant failed: ${granted.error.message}`);
    const holder = await leaseUser();
    const assigned = await supabase
      .from("user_roles")
      .insert({ user_id: holder.id, role_id: role.id, scope_type: "global" });
    if (assigned.error) throw new Error(`[e2e:pkg] assignment failed: ${assigned.error.message}`);
    return holder;
  }

  /** A live ad of a leaf category in a given place, owned by a pooled seller. */
  async function seedListing(seller: { id: string }, categoryId: string, locationId: string) {
    const { data: place, error: placeError } = await adminClient()
      .from("locations")
      .select("country_code")
      .eq("id", locationId)
      .single();
    if (placeError || !place) throw new Error(`[e2e:pkg] no place: ${placeError?.message}`);
    const now = new Date().toISOString();
    const { data, error } = await adminClient()
      .from("listings")
      .insert({
        seller_id: seller.id,
        category_id: categoryId,
        location_id: locationId,
        home_country_code: place.country_code,
        title: `e2e-pkg-listing-${token()}`,
        description: "e2e scratch listing for the packages console",
        status: "active",
        published_at: now,
        published_first_at: now,
        expires_at: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .select("id")
      .single();
    if (error || !data) throw new Error(`[e2e:pkg] seeding the ad failed: ${error?.message}`);
    listings.push(data.id as string);
    return data.id as string;
  }

  test("PKG-1 gating: a super admin sees the two seeded packages with their tier words; a plain user is refused and has no entry", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/packages");
    await expect(packagesSection(page)).toBeVisible({ timeout: 20000 });
    for (const key of ["featured_45", "premium_60"]) {
      const stored = await readPackage(key);
      expect(stored, `PKG-1 the seed ${key} is missing`).not.toBeNull();
      const row = packageRow(page, key);
      await expect(row).toBeVisible({ timeout: 20000 });
      await expect(row.getByTestId(`package-${key}-days`)).toHaveText(String(stored?.days));
      await expect(row.getByTestId(`package-${key}-tier`)).toHaveText(
        en[TIER_LABEL[stored?.tier === "premium" ? "premium" : "featured"]],
      );
    }
    // The agreed toolbar: search, then Columns; the header holds Add package.
    const toolbar = page.getByTestId("packages-toolbar");
    await expect(toolbar.getByTestId("packages-search")).toBeVisible();
    await expect(toolbar.getByTestId("packages-columns")).toBeVisible();
    await expect(page.getByTestId("packages-create-open")).toBeVisible();
    await gotoReady(page, "/admin");
    await expect(page.getByTestId("admin-section-link-packages")).toBeVisible({ timeout: 20000 });

    const plain = await leaseUser();
    await switchUser(page, plain.email, plain.password);
    await page.goto("/admin/packages");
    await waitForHydration(page);
    await expect(packagesSection(page)).toHaveCount(0);
    await expect(page.getByTestId("packages-create-open")).toHaveCount(0);
    await page.goto("/admin");
    await waitForHydration(page);
    await expect(page.getByTestId("admin-section-link-packages")).toHaveCount(0);
  });

  test("PKG-2 lifecycle: a package is created, edited (days, label), switched off and on through the door; the key is fixed on edit; each save is audited", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const key = scratchKey("life", testInfo.project.name);
    await destroyPackage(key);
    packages.push(key);
    const since = new Date().toISOString();
    await gotoReady(page, "/admin/packages");
    await expect(packagesSection(page)).toBeVisible({ timeout: 20000 });

    // Create: the key is typed (lower-cased), the label follows it until typed.
    await page.getByTestId("packages-create-open").click();
    const create = page.getByTestId("packages-create");
    await expect(create).toBeVisible({ timeout: 20000 });
    await create.getByTestId("packages-create-key").fill(key.toUpperCase());
    await expect(create.getByTestId("packages-create-key")).toHaveValue(key);
    await expect(create.getByTestId("packages-create-label")).toHaveValue(`package.${key}`);
    await create.getByTestId("packages-create-tier").selectOption("premium");
    await create.getByTestId("packages-create-days").fill("7");
    await create.getByTestId("packages-create-sort").fill("77");
    await create.getByTestId("packages-create-save").click();
    await awaitGuardedOutcome(page, secret, packageRow(page, key));
    await expect(create).toHaveCount(0);

    let stored = await readPackage(key);
    expect(stored).toMatchObject({
      key,
      tier: "premium",
      days: 7,
      enabled: true,
      self_serve: true,
      extends_lifetime: true,
      label_key: `package.${key}`,
      sort: 77,
    });
    const row = packageRow(page, key);
    await expect(row.getByTestId(`package-${key}-tier`)).toHaveText(en[TIER_LABEL.premium]);
    await expect(row.getByTestId(`package-${key}-days`)).toHaveText("7");
    await expect(row.getByTestId(`package-${key}-enabled`)).toHaveText(en["admin.packages.on"]);
    await expect(packageWhole(page, key).getByTestId(`package-${key}-sort`)).toHaveText("77");

    // Edit: the key is shown, never a field; days and label change; the package is switched off.
    await openEditor(page, key);
    const editor = page.getByTestId("packages-editor");
    await expect(editor.getByTestId("packages-editor-key")).toHaveText(key);
    await expect(editor.locator("input[data-testid='packages-editor-key']")).toHaveCount(0);
    await expect(editor.getByTestId("packages-editor-days")).toHaveValue("7");
    await expect(editor.getByTestId("packages-editor-label")).toHaveValue(`package.${key}`);
    await expect(editor.getByTestId("packages-editor-enabled")).toBeChecked();
    await editor.getByTestId("packages-editor-days").fill("14");
    await editor.getByTestId("packages-editor-label").fill(`package.${key}.two`);
    await editor.getByTestId("packages-editor-enabled").uncheck();
    await editor.getByTestId("packages-editor-save").click();
    await awaitGuardedOutcome(page, secret, {
      poll: async () => (await readPackage(key))?.days === 14,
      describe: `the package ${key} with 14 days`,
    });
    await expect(editor).toHaveCount(0);
    stored = await readPackage(key);
    expect(stored).toMatchObject({
      days: 14,
      enabled: false,
      label_key: `package.${key}.two`,
      tier: "premium",
      sort: 77,
    });
    await expect(row.getByTestId(`package-${key}-days`)).toHaveText("14", { timeout: 20000 });
    await expect(row.getByTestId(`package-${key}-enabled`)).toHaveText(en["admin.packages.off"]);

    // Switched on again.
    await openEditor(page, key);
    await expect(editor.getByTestId("packages-editor-enabled")).not.toBeChecked();
    await editor.getByTestId("packages-editor-enabled").check();
    await editor.getByTestId("packages-editor-save").click();
    await awaitGuardedOutcome(page, secret, {
      poll: async () => (await readPackage(key))?.enabled === true,
      describe: `the package ${key} switched on`,
    });
    await expect(row.getByTestId(`package-${key}-enabled`)).toHaveText(en["admin.packages.on"], {
      timeout: 20000,
    });

    // Three saves, three audit rows: old → new each time (the first has no old).
    const trail = await audits("listing_package", key, "package.saved", since);
    expect(trail).toHaveLength(3);
    const metaOf = (index: number): { old: unknown; new: unknown } => {
      const meta: unknown = trail[index]?.meta;
      if (meta === null || typeof meta !== "object" || !("new" in meta)) {
        throw new Error(`[e2e:pkg] audit row ${index} of ${key} has no old/new`);
      }
      return { old: (meta as { old?: unknown }).old ?? null, new: meta.new };
    };
    expect(metaOf(0).old).toBeNull();
    expect(metaOf(0).new).toMatchObject({ key, days: 7, enabled: true });
    expect(metaOf(1).old).toMatchObject({ days: 7, enabled: true });
    expect(metaOf(1).new).toMatchObject({ days: 14, enabled: false });
    expect(metaOf(2).old).toMatchObject({ enabled: false });
    expect(metaOf(2).new).toMatchObject({ enabled: true });
  });

  test("PKG-3 refusal: a reviewer and a coverage editor have no Packages entry, the screen refuses them, and the doors refuse them by name; nothing is written", async ({
    page,
  }, testInfo) => {
    const key = scratchKey("deny", testInfo.project.name);
    await destroyPackage(key);
    const since = new Date().toISOString();
    const reviewer = await scratchHolder([
      ["admin_panel", "access"],
      ["listings", "view"],
      ["listings", "review"],
    ]);
    const coverageEditor = await scratchHolder([
      ["admin_panel", "access"],
      ["coverage", "view"],
      ["coverage", "update"],
    ]);
    for (const [who, person] of [
      ["reviewer", reviewer],
      ["coverage editor", coverageEditor],
    ] as const) {
      await signInViaSession(page, person.email, person.password);
      await gotoReady(page, "/admin");
      await expect(page.getByTestId("admin-nav-cards")).toBeVisible({ timeout: 20000 });
      await expect(
        page.getByTestId("admin-section-link-packages"),
        `PKG-3 the ${who} saw the Packages entry`,
      ).toHaveCount(0);
      await page.goto("/admin/packages");
      await waitForHydration(page);
      await expect(packagesSection(page), `PKG-3 the ${who} saw the screen`).toHaveCount(0);

      expect(
        await doorError(page, "admin_save_listing_package", {
          p_key: key,
          p_tier: "featured",
          p_days: 7,
          p_enabled: true,
          p_self_serve: true,
          p_extends_lifetime: true,
        }),
        `PKG-3 the package door did not refuse the ${who}`,
      ).toBe("permission denied");
      expect(
        await doorError(page, "admin_save_package_price", {
          p_package_key: "featured_45",
          p_amount: 1,
          p_currency: await firstCurrency(),
        }),
        `PKG-3 the price door did not refuse the ${who}`,
      ).toBe("permission denied");
    }
    expect(await readPackage(key)).toBeNull();
    expect(await audits("listing_package", key, "package.saved", since)).toHaveLength(0);
    const sinceRows = await adminClient()
      .from("audit_log")
      .select("id")
      .eq("action", "package_price.saved")
      .gte("created_at", since)
      .eq("meta->>package", "featured_45");
    expect(sinceRows.error).toBeNull();
    expect(sinceRows.data ?? []).toHaveLength(0);
  });

  test("PKG-4 prices: a free price for every market and three narrower rows are saved through the door; the resolver answers by precedence and NULL where nothing covers", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const key = scratchKey("price", testInfo.project.name);
    await seedPackage(key);
    const currency = await firstCurrency();
    const since = new Date().toISOString();

    // The fixtures: a scratch market with one city; two scratch branches; an ad in the
    // scratch city under the first leaf, another in a real market under the second leaf.
    const market = await seedSingleOptionMarket();
    countries.push(market.code);
    const first = await seedCategoryBranch();
    branches.push([first.parent.slug as string, first.leaf.slug as string]);
    const second = await seedCategoryBranch();
    branches.push([second.parent.slug as string, second.leaf.slug as string]);
    const seller = await leaseUser();
    const inMarket = await seedListing(seller, first.leaf.id as string, market.city.id as string);
    const elsewhere = await seedActiveListing(second.leaf.id as string, seller.id);
    listings.push(elsewhere);
    // INC-218 — the open-market list is served from a cache: wait on the ROUTE from the
    // request context (never from a loaded page), and only then open the console.
    await waitForOpenMarket(page, market.code, OPEN_MARKET_LS11_MS);

    await gotoReady(page, "/admin/packages");
    await expect(packageRow(page, key)).toBeVisible({ timeout: 20000 });
    // Before a package is chosen, the prices table asks for one; Add price waits.
    await expect(pricesSection(page).getByTestId("packages-prices-empty")).toHaveText(
      en["admin.packages.prices.filter"],
    );
    await expect(page.getByTestId("packages-price-create-open")).toHaveCount(0);
    await choosePackage(page, key);
    await expect(pricesSection(page).getByTestId("packages-prices-empty")).toHaveText(
      en["admin.packages.prices.empty"],
    );

    const addPrice = async (
      scope: { market: string; category: string },
      amount: string,
      expectedRows: number,
    ) => {
      await page.getByTestId("packages-price-create-open").click();
      const dialog = page.getByTestId("packages-price-create");
      await expect(dialog).toBeVisible({ timeout: 20000 });
      await expect(dialog.getByTestId("packages-price-create-package")).toHaveText(key);
      await dialog.getByTestId("packages-price-create-market").selectOption(scope.market);
      await dialog.getByTestId("packages-price-create-category").selectOption(scope.category);
      await dialog.getByTestId("packages-price-create-amount").fill(amount);
      await expect(dialog.getByTestId("packages-price-create-currency")).toHaveValue(currency);
      await dialog.getByTestId("packages-price-create-save").click();
      await awaitGuardedOutcome(page, secret, {
        poll: async () => (await readPrices(key)).length === expectedRows,
        describe: `${expectedRows} price rows of ${key}`,
      });
      await expect(dialog).toHaveCount(0);
    };

    await addPrice({ market: "", category: "" }, "0", 1);
    await addPrice({ market: market.code, category: "" }, "2", 2);
    await addPrice({ market: "", category: first.leaf.id as string }, "3", 3);
    await addPrice({ market: market.code, category: first.leaf.id as string }, "1", 4);

    const [free, byMarket, byCategory, both] = await readPrices(key);
    expect(free).toMatchObject({ country_code: null, category_id: null, currency });
    expect(Number(free?.amount)).toBe(0);
    expect(byMarket).toMatchObject({ country_code: market.code, category_id: null });
    expect(Number(byMarket?.amount)).toBe(2);
    expect(byCategory).toMatchObject({ country_code: null, category_id: first.leaf.id });
    expect(Number(byCategory?.amount)).toBe(3);
    expect(both).toMatchObject({ country_code: market.code, category_id: first.leaf.id });
    expect(Number(both?.amount)).toBe(1);
    for (const row of [free, byMarket, byCategory, both]) {
      expect(row?.valid_to).toBeNull();
      expect(
        await audits("package_price", row?.id as string, "package_price.saved", since),
      ).toHaveLength(1);
    }

    // The rows as data: the free row's scope words and amount word; every row open-ended.
    const freeRow = priceRow(page, free?.id as string);
    await expect(freeRow).toBeVisible({ timeout: 20000 });
    await expect(freeRow.getByTestId(`price-${free?.id}-market`)).toHaveText(
      en["admin.packages.prices.everyMarket"],
    );
    await expect(freeRow.getByTestId(`price-${free?.id}-category`)).toHaveText(
      en["admin.packages.prices.everyCategory"],
    );
    await expect(freeRow.getByTestId(`price-${free?.id}-amount`)).toHaveText(
      en["admin.packages.prices.free"],
    );
    await expect(freeRow.getByTestId(`price-${free?.id}-to`)).toHaveText(
      en["admin.packages.prices.open"],
    );
    await expect(
      priceRow(page, both?.id as string).getByTestId(`price-${both?.id}-amount`),
    ).toContainText(currency);

    // Precedence, read as the ad's owner: market × category, then market, then
    // category, then every; the ad elsewhere takes the free row; an ended free row
    // leaves it with nothing, while the ad in the market still has its category row.
    const end = async (id: string) => {
      const ended = await adminClient()
        .from("package_prices")
        .update({ valid_to: new Date().toISOString() })
        .eq("id", id);
      if (ended.error) throw new Error(`[e2e:pkg] ending ${id} failed: ${ended.error.message}`);
    };
    expect((await priceFor(seller, inMarket, key))?.price_id).toBe(both?.id);
    expect((await priceFor(seller, elsewhere, key))?.price_id).toBe(free?.id);
    await end(both?.id as string);
    expect((await priceFor(seller, inMarket, key))?.price_id).toBe(byMarket?.id);
    await end(byMarket?.id as string);
    expect((await priceFor(seller, inMarket, key))?.price_id).toBe(byCategory?.id);
    await end(free?.id as string);
    expect(await priceFor(seller, elsewhere, key)).toBeNull();
    expect((await priceFor(seller, inMarket, key))?.price_id).toBe(byCategory?.id);
    expect(await priceFor(seller, inMarket, `${SCRATCH_PREFIX}none`)).toBeNull();
  });

  test("PKG-5 windows: a price whose dates overlap another of the same scope is refused by name and nothing is written; an adjacent window saves", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const key = scratchKey("win", testInfo.project.name);
    await seedPackage(key);
    const since = new Date().toISOString();
    await gotoReady(page, "/admin/packages");
    await expect(packageRow(page, key)).toBeVisible({ timeout: 20000 });
    await choosePackage(page, key);

    const tomorrow = await browserDay(page, 1);
    const afterTomorrow = await browserDay(page, 2);
    const open = async () => {
      await page.getByTestId("packages-price-create-open").click();
      const dialog = page.getByTestId("packages-price-create");
      await expect(dialog).toBeVisible({ timeout: 20000 });
      return dialog;
    };

    // A: every market, every category, from now until the end of tomorrow.
    let dialog = await open();
    await dialog.getByTestId("packages-price-create-amount").fill("5");
    await pickDay(page, "packages-price-create-to", tomorrow);
    await dialog.getByTestId("packages-price-create-save").click();
    await awaitGuardedOutcome(page, secret, {
      poll: async () => (await readPrices(key)).length === 1,
      describe: `the first price of ${key}`,
    });
    await expect(dialog).toHaveCount(0);
    const [first] = await readPrices(key);
    expect(first?.valid_to).not.toBeNull();

    // B: the same scope from tomorrow, open-ended — it overlaps A and is refused by name.
    dialog = await open();
    await dialog.getByTestId("packages-price-create-amount").fill("6");
    await pickDay(page, "packages-price-create-from", tomorrow);
    await dialog.getByTestId("packages-price-create-save").click();
    await awaitGuardedOutcome(page, secret, dialog.getByTestId("packages-price-create-error"));
    await expect(dialog.getByTestId("packages-price-create-error")).toHaveText(
      en["admin.packages.error.overlap"],
    );
    expect(await readPrices(key)).toHaveLength(1);
    await dialog.getByTestId("packages-price-create-cancel").click();
    await expect(dialog).toHaveCount(0);

    // C: the same scope from the day after tomorrow — it starts where A ends, and saves.
    dialog = await open();
    await dialog.getByTestId("packages-price-create-amount").fill("7");
    await pickDay(page, "packages-price-create-from", afterTomorrow);
    await dialog.getByTestId("packages-price-create-save").click();
    await awaitGuardedOutcome(page, secret, {
      poll: async () => (await readPrices(key)).length === 2,
      describe: `the second price of ${key}`,
    });
    await expect(dialog).toHaveCount(0);
    const rows = await readPrices(key);
    expect(rows).toHaveLength(2);
    expect(new Date(rows[1]?.valid_from ?? "").getTime()).toBe(
      new Date(rows[0]?.valid_to ?? "").getTime(),
    );
    expect(rows[1]?.valid_to).toBeNull();
    expect(Number(rows[1]?.amount)).toBe(7);
    // Two saves audited, the refused attempt none.
    const saved = await adminClient()
      .from("audit_log")
      .select("id")
      .eq("action", "package_price.saved")
      .eq("meta->>package", key)
      .gte("created_at", since);
    expect(saved.error).toBeNull();
    expect(saved.data ?? []).toHaveLength(2);
  });

  test("PKG-6 end: End price sets the end to now; the row stays in the console, the public read no longer lists it, and the resolver answers NULL", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const key = scratchKey("end", testInfo.project.name);
    await seedPackage(key);
    const currency = await firstCurrency();
    const since = new Date().toISOString();
    const branch = await seedCategoryBranch();
    branches.push([branch.parent.slug as string, branch.leaf.slug as string]);
    const seller = await leaseUser();
    const ad = await seedActiveListing(branch.leaf.id as string, seller.id);
    listings.push(ad);
    const priceId = await seedPrice(key, { amount: 4, currency });

    const { url, key: anonKey } = restBase();
    const anon = createClient(url, anonKey, { auth: { persistSession: false } });
    const publicRows = async () => {
      const { data, error } = await anon.from("package_prices").select("id").eq("package_key", key);
      if (error) throw new Error(`[e2e:pkg] the public read failed: ${error.message}`);
      return (data ?? []).map((row) => row.id);
    };
    expect(await publicRows()).toEqual([priceId]);
    expect((await priceFor(seller, ad, key))?.price_id).toBe(priceId);

    await gotoReady(page, "/admin/packages");
    await expect(packageRow(page, key)).toBeVisible({ timeout: 20000 });
    await choosePackage(page, key);
    const row = priceRow(page, priceId);
    await expect(row).toBeVisible({ timeout: 20000 });
    await expect(row.getByTestId(`price-${priceId}-to`)).toHaveText(
      en["admin.packages.prices.open"],
    );
    await actionsOf(page, pricesTable(page), `price-${priceId}`)
      .getByTestId(`price-actions-${priceId}-more`)
      .click();
    await page.getByTestId(`price-actions-${priceId}-more-end`).click();
    const dialog = page.getByTestId("packages-price-end");
    await expect(dialog).toBeVisible({ timeout: 20000 });
    await dialog.getByTestId("packages-price-end-confirm").click();
    await awaitGuardedOutcome(page, secret, {
      poll: async () => (await readPrices(key))[0]?.valid_to !== null,
      describe: `the price ${priceId} ended`,
    });
    await expect(dialog).toHaveCount(0);

    const [ended] = await readPrices(key);
    expect(ended?.id).toBe(priceId);
    expect(new Date(ended?.valid_to ?? "").getTime()).toBeLessThanOrEqual(Date.now());
    // The row stays, says when it ended, and offers no End any more.
    await expect(row).toBeVisible();
    await expect(row.getByTestId(`price-${priceId}-to`)).not.toHaveText(
      en["admin.packages.prices.open"],
      { timeout: 20000 },
    );
    await expect(page.getByTestId(`price-actions-${priceId}-more`)).toHaveCount(0);
    expect(await publicRows()).toEqual([]);
    expect(await priceFor(seller, ad, key)).toBeNull();
    expect(await audits("package_price", priceId, "package_price.ended", since)).toHaveLength(1);
  });

  test("PKG-7 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given", async ({
    page,
  }, testInfo) => {
    const { secret } = await useJobSuperAdmin(page);
    const spentStep = totpStep();
    const key = scratchKey("aal", testInfo.project.name);
    await destroyPackage(key);
    packages.push(key);
    await gotoReady(page, "/admin/packages");
    await expect(packagesSection(page)).toBeVisible({ timeout: 20000 });

    await page.getByTestId("packages-create-open").click();
    const create = page.getByTestId("packages-create");
    await expect(create).toBeVisible({ timeout: 20000 });
    await create.getByTestId("packages-create-key").fill(key);
    await create.getByTestId("packages-create-days").fill("3");
    // INC-620 — the client is told its step-up is stale; the next guarded action asks.
    await staleStepUpOnClient(page);
    await create.getByTestId("packages-create-save").click();
    await expect(page.getByTestId("step-up-modal")).toBeVisible({ timeout: 20000 });
    // Nothing was written while the gate stands.
    expect(await readPackage(key)).toBeNull();
    await afterTotpStep(spentStep);
    await stepUpIfPrompted(page, secret, { typed: true });
    await expect(packageRow(page, key)).toBeVisible({ timeout: 20000 });
    await expect(create).toHaveCount(0);
    expect(await readPackage(key)).toMatchObject({ key, days: 3, tier: "featured" });
  });

  test("PKG-8 geometry: the screen, its dialogs and the prices table hold at 360 and in Amharic", async ({
    page,
  }, testInfo) => {
    await useJobSuperAdmin(page);
    const key = scratchKey("geo", testInfo.project.name);
    await seedPackage(key);
    await seedPrice(key, { amount: 0, currency: await firstCurrency() });
    await gotoReady(page, "/admin/packages");
    await expect(packageRow(page, key)).toBeVisible({ timeout: 20000 });
    await expectNoHorizontalOverflow(page);
    await choosePackage(page, key);
    await expectNoHorizontalOverflow(page);

    await switchLanguage(page, "am");
    await expect(page.getByTestId("packages-header")).toContainText(
      am["admin.section.packages.title"],
    );
    await expect(page.getByTestId("packages-create-open")).toContainText(
      am["admin.packages.create.open"],
    );
    await expect(page.getByTestId("packages-prices-header")).toContainText(
      am["admin.packages.prices.title"],
    );
    await expect(packageRow(page, key).getByTestId(`package-${key}-enabled`)).toHaveText(
      am["admin.packages.on"],
    );
    await expectNoHorizontalOverflow(page);

    await page.getByTestId("packages-create-open").click();
    const create = page.getByTestId("packages-create");
    await expect(create).toBeVisible({ timeout: 20000 });
    await expect(create).toContainText(am["admin.packages.create.title"]);
    await expect(create).toContainText(am["admin.packages.noDelete"]);
    await expectNoHorizontalOverflow(page);
    await create.getByTestId("packages-create-cancel").click();
    await expect(create).toHaveCount(0);

    await page.getByTestId("packages-price-create-open").click();
    const price = page.getByTestId("packages-price-create");
    await expect(price).toBeVisible({ timeout: 20000 });
    await expect(price).toContainText(am["admin.packages.prices.create.title"]);
    await expectNoHorizontalOverflow(page);
    await price.getByTestId("packages-price-create-cancel").click();
    await expect(price).toHaveCount(0);
  });

  test("PKG-9 the browser roles read enabled packages and valid prices only, by their own columns, never updated_by", async () => {
    const project = test.info().project.name;
    const { url, key: anonKey } = restBase();
    const currency = await firstCurrency();
    const shown = scratchKey("pubon", project);
    const hidden = scratchKey("puboff", project);
    await seedPackage(shown);
    await seedPackage(hidden, { enabled: false });
    const live = await seedPrice(shown, { amount: 1, currency });
    const ended = await seedPrice(shown, {
      amount: 2,
      currency,
      validFrom: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      validTo: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    });
    const later = await seedPrice(shown, {
      amount: 3,
      currency,
      validFrom: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
    const ownPackage =
      "key, tier, days, enabled, self_serve, extends_lifetime, label_key, sort, updated_at";
    const ownPrice =
      "id, package_key, country_code, category_id, amount, currency, valid_from, valid_to, updated_at";

    const anon = createClient(url, anonKey, { auth: { persistSession: false } });
    const plain = await leaseUser();
    const signedIn = createClient(url, anonKey, { auth: { persistSession: false } });
    const { error: signInError } = await signedIn.auth.signInWithPassword({
      email: plain.email,
      password: plain.password,
    });
    expect(
      signInError,
      `PKG-9 the account did not sign in: ${signInError?.message ?? ""}`,
    ).toBeNull();

    for (const [who, client] of [
      ["anon", anon],
      ["signed-in", signedIn],
    ] as const) {
      const packagesRead = await client
        .from("listing_packages")
        .select(ownPackage)
        .in("key", [shown, hidden])
        .order("key");
      expect(packagesRead.error, `PKG-9 ${who}: the package's own columns were refused`).toBeNull();
      expect(
        (packagesRead.data ?? []).map((row) => row.key),
        `PKG-9 ${who}: a disabled package was listed`,
      ).toEqual([shown]);
      const pricesRead = await client
        .from("package_prices")
        .select(ownPrice)
        .eq("package_key", shown);
      expect(pricesRead.error, `PKG-9 ${who}: the price's own columns were refused`).toBeNull();
      expect(
        (pricesRead.data ?? []).map((row) => row.id),
        `PKG-9 ${who}: an ended or future price was listed (${ended}, ${later})`,
      ).toEqual([live]);
      for (const table of ["listing_packages", "package_prices"] as const) {
        const hiddenColumn = await client.from(table).select("updated_by").limit(1);
        expect(hiddenColumn.error?.code, `PKG-9 ${who}: ${table}.updated_by was readable`).toBe(
          "42501",
        );
        const every = await client.from(table).select("*").limit(1);
        expect(every.error?.code, `PKG-9 ${who}: every column of ${table} was readable`).toBe(
          "42501",
        );
      }
    }
    await signedIn.auth.signOut();
  });
});
