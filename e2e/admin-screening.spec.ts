import { type Page } from "@playwright/test";

import { expect, test } from "./fixtures";
import { en } from "../src/i18n/locales/en";
import { fillOf, isRedFill } from "./helpers/colors";
import { destroyLocation, seedScratchChain } from "./helpers/locations";
import {
  destroyCategoryBranch,
  destroyListingsOf,
  leaseSeller,
  rand,
  RUN,
  seedCategoryBranch,
} from "./helpers/posting";
import { gotoReady, stepUpIfPrompted, switchUser, useJobSuperAdmin } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * Bundle 10 E3a — ADMIN › SCREENING (SC-1..SC-6); bundle 11 A1 — the preview's doors (SC-7..SC-10);
 * bundle 11 A2 — the page on the agreed blocks (SC-11..SC-14; SC-2, SC-3, SC-6 open the row's menu);
 * bundle 11 A3 — the market filter settles (SC-11, INC-537/538), every Reject is red (SC-12, SC-14),
 * "Show number" asks for no second factor (SC-8, SC-13, SC-15 — D129), the seller box in rows (SC-13, D130). Seeded as feed-route seeds;
 * every row is found by its unique title in the page's search (G28); DB truth
 * through the service client; cleanup in afterEach (J3).
 */

type RpcClient = {
  rpc: (
    fn: string,
    args?: Record<string, unknown>,
  ) => Promise<{ error: { message: string } | null }>;
};

async function rpcFromBrowser(page: Page, fn: string, args: Record<string, unknown>) {
  await page.waitForFunction(
    () => Boolean((window as unknown as { __ethioSupabase?: unknown }).__ethioSupabase),
    undefined,
    { timeout: 15000 },
  );
  return page.evaluate(
    async ([name, payload]) => {
      const client = (window as unknown as { __ethioSupabase: RpcClient }).__ethioSupabase;
      const result = await client.rpc(name as string, payload as Record<string, unknown>);
      return result.error?.message ?? null;
    },
    [fn, args] as const,
  );
}

type RpcDataClient = {
  rpc: (
    fn: string,
    args?: Record<string, unknown>,
  ) => Promise<{ data: unknown; error: { message: string } | null }>;
};

/** Bundle 11 A1 — a door called as the page's signed-in person: its data and its error. */
async function rpcResult(page: Page, fn: string, args: Record<string, unknown>) {
  await page.waitForFunction(
    () => Boolean((window as unknown as { __ethioSupabase?: unknown }).__ethioSupabase),
    undefined,
    { timeout: 15000 },
  );
  return page.evaluate(
    async ([name, payload]) => {
      const client = (window as unknown as { __ethioSupabase: RpcDataClient }).__ethioSupabase;
      const result = await client.rpc(name as string, payload as Record<string, unknown>);
      return { data: result.data, error: result.error?.message ?? null };
    },
    [fn, args] as const,
  );
}

/** Bundle 11 A1 — the audit rows a reveal wrote for one listing (audit_log is append-only). */
async function revealRows(id: string) {
  const { data, error } = await adminClient()
    .from("audit_log")
    .select("actor_id, action, meta")
    .eq("entity_type", "listing")
    .eq("entity_id", id)
    .eq("action", "listing.contact_revealed");
  if (error || !data) throw new Error(`[e2e:sc] reading audit_log failed: ${error?.message}`);
  return data as Array<{ actor_id: string | null; action: string; meta: Record<string, unknown> }>;
}

async function listingTruth(id: string) {
  const { data, error } = await adminClient()
    .from("listings")
    .select("status, published_at")
    .eq("id", id)
    .single();
  if (error || !data) throw new Error(`[e2e:sc] reading the listing failed: ${error?.message}`);
  return data as { status: string; published_at: string | null };
}

async function feedRowsOf(id: string): Promise<number> {
  const { count, error } = await adminClient()
    .from("feed_index")
    .select("listing_id", { count: "exact", head: true })
    .eq("listing_id", id);
  if (error || count === null)
    throw new Error(`[e2e:sc] reading feed_index failed: ${error?.message}`);
  return count;
}

/** The page passes cardUntil="lg": below 1024 px each row is a card, from 1024 px a table row. */
const TWIN_BOUNDARY = 1024;

function isCardTwin(page: Page): boolean {
  return (page.viewportSize()?.width ?? TWIN_BOUNDARY) < TWIN_BOUNDARY;
}

function surface(page: Page) {
  return isCardTwin(page) ? page.getByTestId("data-table-cards") : page.getByRole("table");
}

function rowOf(page: Page, id: string) {
  return surface(page).getByTestId(
    isCardTwin(page) ? `admin-screening-row-${id}-card` : `admin-screening-row-${id}`,
  );
}

function actionsOf(page: Page, id: string) {
  return surface(page).getByTestId(
    isCardTwin(page)
      ? `admin-screening-row-${id}-actions`
      : `admin-screening-row-${id}-actions-cell`,
  );
}

/** Bundle 11 A2 — the row's actions live in its three-dots menu (RowActions). */
async function rowMenu(page: Page, id: string, item: "open" | "approve" | "reject") {
  await actionsOf(page, id).getByTestId(`admin-screening-actions-${id}-more`).click();
  await page.getByTestId(`admin-screening-actions-${id}-more-${item}`).click();
}

/** Bundle 11 A2 — a row's tick-box, in whichever twin the width draws. */
function tickOf(page: Page, id: string) {
  return surface(page).getByTestId(
    isCardTwin(page) ? `admin-screening-row-${id}-select` : `admin-screening-row-${id}-select-cell`,
  );
}

test.describe("ADMIN SCREENING", () => {
  const sellers: string[] = [];
  const regions: string[] = [];
  const branches: string[][] = [];
  const roles: string[] = [];

  test.afterEach(async () => {
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const slug of regions.splice(0)) await destroyLocation(slug);
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
    const supabase = adminClient();
    for (const roleId of roles.splice(0)) {
      const a = await supabase.from("role_permissions").delete().eq("role_id", roleId);
      if (a.error) throw new Error(`[e2e:sc] role_permissions reap failed: ${a.error.message}`);
      const b = await supabase.from("user_roles").delete().eq("role_id", roleId);
      if (b.error) throw new Error(`[e2e:sc] user_roles reap failed: ${b.error.message}`);
      const c = await supabase.from("roles").delete().eq("id", roleId);
      if (c.error) throw new Error(`[e2e:sc] role reap failed: ${c.error.message}`);
    }
  });

  async function seedWaiting(
    options: {
      parentImageUrl?: string;
      contactPref?: Record<string, unknown>;
      business?: string;
      status?: "screening" | "active";
      title?: string;
    } = {},
  ) {
    const seller = await leaseSeller({ alias: true });
    sellers.push(seller.id);
    if (options.business !== undefined) {
      // The pool reset restores seller_type and business_name.
      const named = await adminClient()
        .from("profiles")
        .update({ seller_type: "business", business_name: options.business })
        .eq("user_id", seller.id);
      if (named.error)
        throw new Error(`[e2e:sc] naming the business failed: ${named.error.message}`);
    }
    const { parent, leaf } = await seedCategoryBranch(options);
    branches.push([parent.slug, leaf.slug]);
    const chain = await seedScratchChain("ET");
    regions.push(chain.region.slug);
    const title = options.title ?? `e2e-screen-${RUN}-${rand()}`;
    const { data, error } = await adminClient()
      .from("listings")
      .insert({
        category_id: leaf.id,
        seller_id: seller.id,
        location_id: chain.city.id,
        home_country_code: "ET",
        title,
        description: "e2e scratch listing for the screening queue",
        status: options.status ?? "screening",
        published_at: options.status === "active" ? new Date().toISOString() : null,
        ...(options.contactPref === undefined ? {} : { contact_pref: options.contactPref }),
      })
      .select("id")
      .single();
    if (error || !data) throw new Error(`[e2e:sc] seeding failed: ${error?.message ?? "no row"}`);
    return {
      id: data.id as string,
      sellerId: seller.id,
      title,
      categoryName: leaf.slug as string,
      cityName: chain.city.name_en as string,
    };
  }

  async function findRow(page: Page, title: string, id: string) {
    await gotoReady(page, "/admin/screening");
    await page.getByTestId("admin-screening-search").fill(title);
    const row = rowOf(page, id);
    await expect(row).toBeVisible({ timeout: 20000 });
    return row;
  }

  /**
   * Bundle 11 A3 — a pool user holding exactly these permissions through a
   * scratch role, with no second factor (a pool user enrols none). The role is
   * reaped in afterEach.
   */
  async function scratchHolder(wanted: Array<[resource: string, action: string]>) {
    const supabase = adminClient();
    const roleName = `e2e_screen_role_${rand()}`;
    const { data: role, error: roleError } = await supabase
      .from("roles")
      .insert({ name: roleName, display_name: roleName, priority: 1 })
      .select("id")
      .single();
    if (roleError || !role) throw new Error(`[e2e:sc] scratch role failed: ${roleError?.message}`);
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
      `[e2e:sc] expected exactly ${wanted.map((pair) => pair.join(":")).join(", ")}`,
    ).toHaveLength(wanted.length);
    const granted = await supabase
      .from("role_permissions")
      .insert(picked.map((p) => ({ role_id: role.id, permission_id: p.id })));
    if (granted.error) throw new Error(`[e2e:sc] grant failed: ${granted.error.message}`);
    const holder = await leaseUser();
    const assigned = await supabase
      .from("user_roles")
      .insert({ user_id: holder.id, role_id: role.id, scope_type: "global" });
    if (assigned.error) throw new Error(`[e2e:sc] assignment failed: ${assigned.error.message}`);
    return holder;
  }

  test("SC-1 the queue lists an ad waiting for review", async ({ page }) => {
    const ad = await seedWaiting();
    await useJobSuperAdmin(page);
    const row = await findRow(page, ad.title, ad.id);
    await expect(row).toContainText(ad.title);
    await expect(row).toContainText(ad.categoryName);
    await expect(row).toContainText(ad.cityName);
  });

  test("SC-2 Approve puts the ad on the site", async ({ page }) => {
    const ad = await seedWaiting();
    const { secret } = await useJobSuperAdmin(page);
    await findRow(page, ad.title, ad.id);
    await rowMenu(page, ad.id, "approve");
    await expect(page.getByTestId("admin-screening-confirm")).toBeVisible();
    await page.getByTestId("admin-screening-confirm-go").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      en["admin.screening.approved"],
      { timeout: 20000 },
    );
    const truth = await listingTruth(ad.id);
    expect(truth.status).toBe("active");
    expect(truth.published_at).not.toBeNull();
    expect(await feedRowsOf(ad.id)).toBeGreaterThanOrEqual(1);
    await expect(page.locator(`[data-testid^="admin-screening-row-${ad.id}"]`)).toHaveCount(0);
  });

  test("SC-3 Reject keeps the ad off", async ({ page }) => {
    const ad = await seedWaiting();
    const { secret } = await useJobSuperAdmin(page);
    await findRow(page, ad.title, ad.id);
    await rowMenu(page, ad.id, "reject");
    await expect(page.getByTestId("admin-screening-confirm")).toBeVisible();
    await page.getByTestId("admin-screening-confirm-go").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      en["admin.screening.rejected"],
      { timeout: 20000 },
    );
    expect((await listingTruth(ad.id)).status).toBe("rejected");
    expect(await feedRowsOf(ad.id)).toBe(0);
    await expect(page.locator(`[data-testid^="admin-screening-row-${ad.id}"]`)).toHaveCount(0);
  });

  test("SC-4 only a reviewer with a fresh second factor decides", async ({ page }) => {
    test.setTimeout(180_000);
    const ad = await seedWaiting();
    const supabase = adminClient();

    // (a) a pool user with no role.
    const plain = await leaseUser();
    await switchUser(page, plain.email, plain.password);
    await gotoReady(page, "/");
    const deniedPlain = await rpcFromBrowser(page, "transition_listing", {
      p_listing_id: ad.id,
      p_new_status: "active",
    });
    expect(deniedPlain).not.toBeNull();
    expect((await listingTruth(ad.id)).status).toBe("screening");

    // (b) a scratch role holding listings:review only, no second factor.
    const roleName = `e2e_screen_reviewer_${rand()}`;
    const { data: role, error: roleError } = await supabase
      .from("roles")
      .insert({ name: roleName, display_name: roleName, priority: 1 })
      .select("id")
      .single();
    if (roleError || !role) throw new Error(`SC-4 scratch role failed: ${roleError?.message}`);
    roles.push(role.id as string);
    const { data: perms } = await supabase
      .from("permissions")
      .select("id, action, resources!inner(name)")
      .in("resources.name", ["listings"]);
    const wanted = (perms ?? []).filter((p) => p.action === "review");
    expect(wanted, "SC-4 expected exactly listings:review").toHaveLength(1);
    const granted = await supabase
      .from("role_permissions")
      .insert(wanted.map((p) => ({ role_id: role.id, permission_id: p.id })));
    if (granted.error) throw new Error(`SC-4 grant failed: ${granted.error.message}`);
    const reviewer = await leaseUser();
    const assigned = await supabase
      .from("user_roles")
      .insert({ user_id: reviewer.id, role_id: role.id, scope_type: "global" });
    if (assigned.error) throw new Error(`SC-4 assignment failed: ${assigned.error.message}`);
    await switchUser(page, reviewer.email, reviewer.password);
    await gotoReady(page, "/");
    const deniedReviewer = await rpcFromBrowser(page, "transition_listing", {
      p_listing_id: ad.id,
      p_new_status: "active",
    });
    expect(deniedReviewer).toMatch(/no verified factor|step-up required/i);
    expect((await listingTruth(ad.id)).status).toBe("screening");
  });

  test("SC-5 an empty search shows the empty message", async ({ page }) => {
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/screening");
    await page.getByTestId("admin-screening-search").fill(`e2e-none-${rand()}`);
    await expect(page.getByTestId("admin-screening-empty")).toHaveText(
      en["admin.screening.empty"],
      { timeout: 20000 },
    );
  });

  /** SC-6 (INC-525) — the preview draws the nearest category picture, as the card does. */
  test("SC-6 Preview as buyer draws the ad's category picture", async ({ page }) => {
    const picture = "https://example.invalid/e2e-screen-picture.jpg";
    const ad = await seedWaiting({ parentImageUrl: picture });
    await useJobSuperAdmin(page);
    await findRow(page, ad.title, ad.id);
    await rowMenu(page, ad.id, "open");
    await expect(page.getByTestId("post-preview-sheet")).toBeVisible({ timeout: 20000 });
    const box = page.getByTestId("listing-detail-illustration");
    await expect(box, "SC-6: the preview did not draw the category picture").toBeVisible({
      timeout: 20000,
    });
    await expect(box).toHaveAttribute("data-picture", "category");
    await expect(box.locator("img")).toHaveAttribute("src", picture);
    await expect(page.getByTestId("listing-detail-nophoto")).toHaveCount(0);
  });

  /** Bundle 11 A1 (D120, D128) — the contact the scratch seller chose: two numbers shown, one hidden. */
  const PREF = {
    messages: true,
    phone: { show: true, value: "+251911000101" },
    phone2: { show: false, value: "+251911000202" },
    telegram: { show: true, value: "@escreen_handle" },
    whatsapp: { show: true, value: "+251911000303" },
  };

  test("SC-7 a reviewer reads the preview's facts: the ad's country, the methods shown and the public name, never a value", async ({
    page,
  }) => {
    const ad = await seedWaiting({ contactPref: PREF, business: "Escreen Trading" });
    await useJobSuperAdmin(page);
    const { data, error } = await rpcResult(page, "admin_screening_facts", {
      p_listing_id: ad.id,
    });
    expect(error, "SC-7: the reviewer was refused").toBeNull();
    const { data: profile } = await adminClient()
      .from("profiles")
      .select("seller_alias, display_name")
      .eq("user_id", ad.sellerId)
      .single();
    expect(profile?.seller_alias, "SC-7: the scratch seller has no public name").toBeTruthy();
    expect(data).toEqual({
      country: "ET",
      channels: { phone: true, phone2: false, telegram: true, whatsapp: true },
      seller: { alias: profile?.seller_alias, business_name: "Escreen Trading" },
    });
    const text = JSON.stringify(data);
    for (const secret of ["+251911000101", "+251911000202", "+251911000303", "@escreen_handle"]) {
      expect(text, `SC-7: a contact value left the door (${secret})`).not.toContain(secret);
    }
    if (profile?.display_name) expect(text).not.toContain(profile.display_name);
  });

  test("SC-8 a person who is not a reviewer reads nothing; a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129)", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    const ad = await seedWaiting({ contactPref: PREF });

    const plain = await leaseUser();
    await switchUser(page, plain.email, plain.password);
    await gotoReady(page, "/");
    const facts = await rpcResult(page, "admin_screening_facts", { p_listing_id: ad.id });
    expect(facts.error).toBe("permission denied");
    const shown = await rpcResult(page, "admin_reveal_listing_contact", {
      p_listing_id: ad.id,
      p_channel: "phone",
    });
    expect(shown.error).toBe("permission denied");
    expect(await revealRows(ad.id), "SC-8: a refused reveal wrote a row").toHaveLength(0);

    const reviewer = await scratchHolder([["listings", "review"]]);
    await switchUser(page, reviewer.email, reviewer.password);
    await gotoReady(page, "/");
    const read = await rpcResult(page, "admin_screening_facts", { p_listing_id: ad.id });
    expect(read.error, "SC-8: a reviewer reads the facts without a second factor").toBeNull();
    const revealed = await rpcResult(page, "admin_reveal_listing_contact", {
      p_listing_id: ad.id,
      p_channel: "phone",
    });
    expect(revealed.error, "SC-8: the reveal asked for a second factor (D129)").toBeNull();
    expect(revealed.data).toEqual({ ok: true, channel: "phone", value: "+251911000101" });
    expect(await revealRows(ad.id)).toEqual([
      { actor_id: reviewer.id, action: "listing.contact_revealed", meta: { channel: "phone" } },
    ]);
  });

  test("SC-9 Show number: a reviewer with a fresh second factor gets the number, and one audit row names the channel and never the number", async ({
    page,
  }) => {
    const ad = await seedWaiting({ contactPref: PREF });
    const { user } = await useJobSuperAdmin(page);
    const shown = await rpcResult(page, "admin_reveal_listing_contact", {
      p_listing_id: ad.id,
      p_channel: "whatsapp",
    });
    expect(shown.error).toBeNull();
    expect(shown.data).toEqual({ ok: true, channel: "whatsapp", value: "+251911000303" });
    const rows = await revealRows(ad.id);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toEqual({
      actor_id: user.id,
      action: "listing.contact_revealed",
      meta: { channel: "whatsapp" },
    });

    const hidden = await rpcResult(page, "admin_reveal_listing_contact", {
      p_listing_id: ad.id,
      p_channel: "phone2",
    });
    expect(hidden.error).toBeNull();
    expect(hidden.data).toEqual({ ok: false, reason: "notShown" });
    const handle = await rpcResult(page, "admin_reveal_listing_contact", {
      p_listing_id: ad.id,
      p_channel: "telegram",
    });
    expect(handle.error).toBe("unknown channel");
    expect(await revealRows(ad.id), "SC-9: a refused reveal wrote a row").toHaveLength(1);
  });

  test("SC-10 an ad that is not waiting for review answers neither door", async ({ page }) => {
    const ad = await seedWaiting({ contactPref: PREF, status: "active" });
    await useJobSuperAdmin(page);
    const facts = await rpcResult(page, "admin_screening_facts", { p_listing_id: ad.id });
    expect(facts.error).toBe("listing not found");
    const shown = await rpcResult(page, "admin_reveal_listing_contact", {
      p_listing_id: ad.id,
      p_channel: "phone",
    });
    expect(shown.error).toBe("listing not found");
    expect(await revealRows(ad.id)).toHaveLength(0);
  });

  test("SC-11 the toolbar: Columns hides a column and remembers it; Filters settles on the ad's market — another market lists none, its own lists it, never an error — and its chip clears", async ({
    page,
  }) => {
    const ad = await seedWaiting();
    await useJobSuperAdmin(page);
    await findRow(page, ad.title, ad.id);
    await expect(rowOf(page, ad.id)).toContainText(ad.cityName);

    await page.getByTestId("admin-screening-columns").click();
    await expect(page.getByTestId("admin-screening-columns-title")).toBeDisabled();
    await page.getByTestId("admin-screening-columns-place").click();
    await page.keyboard.press("Escape");
    await expect(rowOf(page, ad.id)).not.toContainText(ad.cityName);
    await findRow(page, ad.title, ad.id);
    await expect(
      rowOf(page, ad.id),
      "SC-11: the hidden column came back after a reload",
    ).not.toContainText(ad.cityName);
    await page.getByTestId("admin-screening-columns").click();
    await page.getByTestId("admin-screening-columns-place").click();
    await page.keyboard.press("Escape");
    await expect(rowOf(page, ad.id)).toContainText(ad.cityName);

    // INC-537, INC-538 — a filter is proven by a result the unfiltered list
    // cannot give, read once the filtered read has settled: the page keeps the
    // previous rows on screen while a read is retried.
    const country = page.getByTestId("admin-screening-filter-country");
    await page.getByTestId("admin-screening-filters").click();
    await expect(country.locator('option[value="US"]')).toHaveCount(1);
    await country.selectOption("US");
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("admin-screening-filters-count")).toHaveText("1");
    await expect(
      page.getByTestId("admin-screening-empty"),
      "SC-11: another market did not settle on the empty message",
    ).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("data-table-error")).toHaveCount(0);
    await expect(rowOf(page, ad.id)).toHaveCount(0);

    await page.getByTestId("admin-screening-filters").click();
    await country.selectOption("ET");
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("admin-screening-chips-chip-country")).toBeVisible();
    await expect(rowOf(page, ad.id), "SC-11: the ad's own market did not list it").toBeVisible({
      timeout: 20000,
    });
    await expect(page.getByTestId("admin-screening-empty")).toHaveCount(0);
    await expect(page.getByTestId("data-table-error")).toHaveCount(0);
    await page.getByTestId("admin-screening-chips-clear").click();
    await expect(page.getByTestId("admin-screening-chips-chip-country")).toHaveCount(0);
    await expect(page.getByTestId("admin-screening-filters-count")).toHaveCount(0);
    await expect(rowOf(page, ad.id)).toBeVisible();
  });

  test("SC-12 two ticked ads are approved together, after one confirmation that counts them", async ({
    page,
  }) => {
    const stem = `e2e-screen-${RUN}-${rand()}`;
    const first = await seedWaiting({ title: `${stem}-a` });
    const second = await seedWaiting({ title: `${stem}-b` });
    const { secret } = await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/screening");
    await page.getByTestId("admin-screening-search").fill(stem);
    await expect(rowOf(page, first.id)).toBeVisible({ timeout: 20000 });
    await expect(rowOf(page, second.id)).toBeVisible();
    await tickOf(page, first.id).click();
    await tickOf(page, second.id).click();
    await expect(page.getByTestId("data-table-selection")).toContainText("2");
    // Bundle 11 A3 — Reject is red on the bar, Approve is not.
    await expect
      .poll(async () => isRedFill(await fillOf(page.getByTestId("admin-screening-bulk-reject"))), {
        message: "SC-12: the bar's Reject is not red",
      })
      .toBe(true);
    expect(isRedFill(await fillOf(page.getByTestId("admin-screening-bulk-approve")))).toBe(false);
    await page.getByTestId("admin-screening-bulk-approve").click();
    await expect(page.getByTestId("admin-screening-confirm")).toContainText(
      en["admin.screening.confirmApproveMany"].replace("{count}", "2"),
    );
    expect(
      isRedFill(await fillOf(page.getByTestId("admin-screening-confirm-go"))),
      "SC-12: an Approve confirmation drawn red",
    ).toBe(false);
    await page.getByTestId("admin-screening-confirm-go").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      en["admin.screening.approved"],
      { timeout: 20000 },
    );
    expect((await listingTruth(first.id)).status).toBe("active");
    expect((await listingTruth(second.id)).status).toBe("active");
    await expect(page.getByTestId("data-table-selection")).toHaveCount(0);
  });

  test("SC-13 Preview as buyer shows the public name, then the methods shown one per row; Show number puts the number in its row with no second factor and logs it", async ({
    page,
  }) => {
    const ad = await seedWaiting({ contactPref: PREF, business: "Escreen Trading" });
    const { user } = await useJobSuperAdmin(page);
    const { data: profile } = await adminClient()
      .from("profiles")
      .select("seller_alias")
      .eq("user_id", ad.sellerId)
      .single();
    await findRow(page, ad.title, ad.id);
    await rowMenu(page, ad.id, "open");
    const sheet = page.getByTestId("post-preview-sheet");
    await expect(sheet).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("listing-detail-seller-name")).toHaveText("Escreen Trading", {
      timeout: 20000,
    });
    await expect(page.getByTestId("listing-detail-seller-alias")).toHaveText(
      profile?.seller_alias as string,
    );
    await expect(page.getByTestId("listing-detail-contact")).toContainText(
      en["post.preview.contactLabel"],
    );
    const channel = (name: string) =>
      sheet.locator(`[data-testid="listing-detail-channel"][data-channel="${name}"]`);
    await expect(channel("phone")).toBeVisible();
    await expect(channel("telegram")).toBeVisible();
    await expect(channel("whatsapp")).toBeVisible();
    await expect(channel("phone2")).toHaveCount(0);
    await expect(page.getByTestId("admin-screening-show-telegram")).toHaveCount(0);
    await expect(sheet).not.toContainText("+251911000101");
    await expect(sheet).not.toContainText("+251911000303");

    // D130 — one method per row, top to bottom; each Show number inside its own
    // method's row, after the method's name. Measured in one frame.
    await expect(page.getByTestId("admin-screening-show-whatsapp")).toBeVisible();
    const layout = await sheet.evaluate((root) => {
      const box = (element: Element | null) => {
        if (element === null) return null;
        const rect = element.getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom, left: rect.left };
      };
      return Array.from(root.querySelectorAll('[data-testid="listing-detail-channel"]')).map(
        (row) => ({
          channel: row.getAttribute("data-channel"),
          row: box(row),
          label: box(row.querySelector('[data-testid="listing-detail-channel-label"]')),
          button: box(row.querySelector('[data-testid^="admin-screening-show-"]')),
        }),
      );
    });
    expect(layout.map((entry) => entry.channel)).toEqual([
      "messages",
      "phone",
      "telegram",
      "whatsapp",
    ]);
    for (let index = 1; index < layout.length; index += 1) {
      expect(
        layout[index]!.row!.top,
        `SC-13: the ${layout[index]!.channel} row is not under the one before it`,
      ).toBeGreaterThanOrEqual(layout[index - 1]!.row!.bottom - 1);
    }
    for (const entry of layout.filter(
      (item) => item.channel === "phone" || item.channel === "whatsapp",
    )) {
      expect(entry.button, `SC-13: ${entry.channel} has no Show number in its row`).not.toBeNull();
      expect(entry.button!.top).toBeGreaterThanOrEqual(entry.row!.top - 1);
      expect(entry.button!.bottom).toBeLessThanOrEqual(entry.row!.bottom + 1);
      expect(
        entry.button!.left,
        `SC-13: ${entry.channel}'s Show number is not after its name`,
      ).toBeGreaterThan(entry.label!.left);
    }

    await page.getByTestId("admin-screening-show-phone").click();
    const number = channel("phone").getByTestId("admin-screening-number-phone");
    await expect(number).toHaveText("+251911000101", { timeout: 20000 });
    await expect(
      page.getByTestId("step-up-modal"),
      "SC-13: Show number asked for a code",
    ).toHaveCount(0);
    await expect(sheet, "SC-13: a number not asked for was shown").not.toContainText(
      "+251911000303",
    );
    const logged = await revealRows(ad.id);
    expect(logged).toEqual([
      { actor_id: user.id, action: "listing.contact_revealed", meta: { channel: "phone" } },
    ]);
  });

  test("SC-14 Reject at the foot of the preview closes it and keeps the ad off", async ({
    page,
  }) => {
    const ad = await seedWaiting();
    const { secret } = await useJobSuperAdmin(page);
    await findRow(page, ad.title, ad.id);
    await rowMenu(page, ad.id, "open");
    await expect(page.getByTestId("post-preview-sheet")).toBeVisible({ timeout: 20000 });
    const footReject = page.getByTestId("admin-screening-preview-reject");
    await expect
      .poll(async () => isRedFill(await fillOf(footReject)), {
        message: "SC-14: the preview's Reject is not red",
      })
      .toBe(true);
    await footReject.click();
    await expect(page.getByTestId("post-preview-sheet")).toHaveCount(0);
    await expect(page.getByTestId("admin-screening-confirm")).toContainText(
      en["admin.screening.confirmReject"],
    );
    await expect
      .poll(async () => isRedFill(await fillOf(page.getByTestId("admin-screening-confirm-go"))), {
        message: "SC-14: the confirmation's Reject is not red",
      })
      .toBe(true);
    await page.getByTestId("admin-screening-confirm-go").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      en["admin.screening.rejected"],
      { timeout: 20000 },
    );
    expect((await listingTruth(ad.id)).status).toBe("rejected");
  });

  test("SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129)", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    const ad = await seedWaiting({ contactPref: PREF });
    const reviewer = await scratchHolder([
      ["admin_panel", "access"],
      ["listings", "view"],
      ["listings", "review"],
    ]);
    await switchUser(page, reviewer.email, reviewer.password);
    await findRow(page, ad.title, ad.id);
    await rowMenu(page, ad.id, "open");
    const sheet = page.getByTestId("post-preview-sheet");
    await expect(sheet).toBeVisible({ timeout: 20000 });
    await page.getByTestId("admin-screening-show-whatsapp").click();
    await expect(
      sheet
        .locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]')
        .getByTestId("admin-screening-number-whatsapp"),
    ).toHaveText("+251911000303", { timeout: 20000 });
    await expect(
      page.getByTestId("step-up-modal"),
      "SC-15: Show number asked for a code",
    ).toHaveCount(0);
    expect(await revealRows(ad.id)).toEqual([
      { actor_id: reviewer.id, action: "listing.contact_revealed", meta: { channel: "whatsapp" } },
    ]);
  });
});
