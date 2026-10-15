import { type Page } from "@playwright/test";

import { expect, test } from "./fixtures";
import { en } from "../src/i18n/locales/en";
import { destroyLocation, seedScratchChain } from "./helpers/locations";
import {
  destroyCategoryBranch,
  destroyListingsOf,
  leaseSeller,
  RUN,
  seedCategoryBranch,
} from "./helpers/posting";
import { passwordGrant } from "./helpers/session";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { adminClient } from "./helpers/users";

/**
 * Bundle 16 (My listings), turn 3 — ONE AD'S PAGE (MLA-1..MLA-6).
 *
 * Proves D138, D173 and D174 (and D175, D176): the `my_listing` door answers the
 * caller's own ad only — the list's row, its group, the status a closed ad reopens
 * to and the admin's renew setting — with one refusal for anything else;
 * `listing_history` says which way a Reserved change went; and the page at
 * /my-listings/<id> shows the status and dates and runs Reserved on and off, No
 * longer available and Reopen, Mark as sold (behind a confirm) and Renew, with
 * Continue on a draft, words for an ad in review, another seller's ad refused and
 * a signed-out visit sent to sign in.
 *
 * Every seller is a scratch seller; every listing is a scratch row of this file,
 * removed in afterEach (J3, G27); every row is found by its own id (G28). No test
 * writes listing_policy: the renew days are read, never set.
 */

type Row = Record<string, unknown>;

function restBase(): { url: string; key: string } {
  const url = process.env["E2E_SUPABASE_URL"];
  const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    throw new Error("[e2e:mla] E2E_SUPABASE_URL and E2E_SUPABASE_PUBLISHABLE_KEY must be set.");
  }
  return { url: url.replace(/\/+$/, ""), key };
}

async function answerOf(response: Response) {
  const text = await response.text();
  const body: unknown = text === "" ? null : JSON.parse(text);
  if (!response.ok) {
    const message =
      body !== null && typeof body === "object" && "message" in body
        ? String((body as { message: unknown }).message)
        : `HTTP ${response.status}`;
    return { data: null as unknown, error: message as string | null };
  }
  return { data: body, error: null as string | null };
}

/** A signed-in person from node: the door's data and its error, as the browser client reads them. */
async function asPerson(person: { email: string; password: string }) {
  const { url, key } = restBase();
  const session = await passwordGrant(person.email, person.password);
  const headers = {
    apikey: key,
    Authorization: `Bearer ${session.access_token}`,
    "Content-Type": "application/json",
  };
  return {
    rpc: async (fn: string, args: Record<string, unknown>) =>
      answerOf(
        await fetch(`${url}/rest/v1/rpc/${fn}`, {
          method: "POST",
          headers,
          body: JSON.stringify(args),
        }),
      ),
    select: async (table: string, query: string) =>
      answerOf(await fetch(`${url}/rest/v1/${table}?${query}`, { headers })),
  };
}

type Person = Awaited<ReturnType<typeof asPerson>>;

/** Letters only: a scratch name the contact-in-text rule never reads as a number. */
function token(): string {
  return Math.random()
    .toString(36)
    .slice(2, 10)
    .replace(/[0-9]/g, (digit) => "abcdefghij"[Number(digit)] ?? "x");
}

const DAY = 86_400_000;
const HOUR = 3_600_000;
const at = (offsetMs: number) => new Date(Date.now() + offsetMs).toISOString();

const TRUTH =
  "status,title,expires_at,reserved_at,resume_status,sold_at,renewed_at,published_first_at";

async function listingTruth(listingId: string) {
  const { data, error } = await adminClient()
    .from("listings")
    .select(TRUTH)
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:mla] listing read failed: ${error.message}`);
  if (!data) throw new Error(`[e2e:mla] listing ${listingId} not found`);
  return data as unknown as Row;
}

/** The renew days the seller reads from listing_policy (read, never set). */
async function renewDays(person: Person): Promise<number> {
  const result = await person.select("listing_policy", "select=renew_days");
  expect(result.error, "[e2e:mla] listing_policy read").toBeNull();
  const rows = result.data as Row[];
  expect(rows.length, "[e2e:mla] listing_policy rows").toBe(1);
  return rows[0]!["renew_days"] as number;
}

/** The visible twin of a row: the table row from 1280 px, the card below it. */
function twin(page: Page, id: string) {
  const width = page.viewportSize()?.width ?? 0;
  return page.getByTestId(width >= 1280 ? `my-listing-${id}` : `my-listing-${id}-card`);
}

/** The box holding a row's actions: the table row from 1280 px; below it the card's box. */
function box(page: Page, id: string) {
  const width = page.viewportSize()?.width ?? 0;
  return page.getByTestId(width >= 1280 ? `my-listing-${id}` : `my-listing-${id}-actions`);
}

const randomId = () => crypto.randomUUID();
const startsWith = (text: string) => new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);

async function openAd(page: Page, id: string) {
  await gotoReady(page, `/my-listings/${id}`);
  await expect(page.getByTestId("my-listing-page")).toBeVisible({ timeout: 15000 });
}

test.describe("MY LISTINGS — one ad's page (bundle 16 turn 3)", () => {
  const sellers: string[] = [];
  const listingIds: string[] = [];
  const regions: string[] = [];
  const branches: string[][] = [];
  const roles: string[] = [];

  test.afterEach(async () => {
    const supabase = adminClient();
    for (const roleId of roles.splice(0)) {
      const a = await supabase.from("role_permissions").delete().eq("role_id", roleId);
      if (a.error) throw new Error(`[e2e:mla] role_permissions reap failed: ${a.error.message}`);
      const b = await supabase.from("user_roles").delete().eq("role_id", roleId);
      if (b.error) throw new Error(`[e2e:mla] user_roles reap failed: ${b.error.message}`);
      const c = await supabase.from("roles").delete().eq("id", roleId);
      if (c.error) throw new Error(`[e2e:mla] roles reap failed: ${c.error.message}`);
    }
    const owned = listingIds.splice(0);
    if (owned.length > 0) {
      const notices = await supabase.from("seller_notices").delete().in("listing_id", owned);
      if (notices.error) throw new Error(`[e2e:mla] notice reap failed: ${notices.error.message}`);
    }
    for (const id of owned) {
      const removed = await supabase.from("listings").delete().eq("id", id);
      if (removed.error) throw new Error(`[e2e:mla] listing reap failed: ${removed.error.message}`);
    }
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const slug of regions.splice(0)) await destroyLocation(slug);
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
  });

  /** A scratch seller with a public name and its own category branch and place. */
  async function scratchSeller() {
    const seller = await leaseSeller({ alias: true, named: true });
    sellers.push(seller.id);
    const { parent, leaf } = await seedCategoryBranch();
    branches.push([parent.slug as string, leaf.slug as string]);
    const chain = await seedScratchChain("ET");
    regions.push(chain.region.slug as string);
    return {
      ...seller,
      leafId: leaf.id as string,
      cityId: chain.city.id as string,
    };
  }

  type Seller = Awaited<ReturnType<typeof scratchSeller>>;

  /**
   * A complete scratch listing: published and first published 20 days ago (or as
   * told), 100 ETB fixed once, ending in 10 days minus one hour unless told otherwise.
   */
  async function seed(
    seller: Seller,
    status: string,
    options: { expiresInMs?: number; publishedAgoMs?: number } = {},
  ) {
    const live = ["active", "reduced", "expired", "sold", "removed", "closed"].includes(status);
    const ago = options.publishedAgoMs ?? 20 * DAY;
    const { data, error } = await adminClient()
      .from("listings")
      .insert({
        category_id: seller.leafId,
        seller_id: seller.id,
        location_id: seller.cityId,
        home_country_code: "ET",
        title: `E2E my listings ad ${RUN.replace(/[0-9]/g, "x")} ${token()}`,
        description: "e2e scratch listing for one ad's page",
        attributes: {},
        price_mode: "fixed",
        price_amount: 100,
        price_currency: "ETB",
        price_period: "once",
        price_set_at: at(-ago),
        contact_pref: { messages: true },
        status,
        tier: "regular",
        published_at: live ? at(-ago) : null,
        published_first_at: live ? at(-ago) : null,
        expires_at: live ? at(options.expiresInMs ?? 10 * DAY - HOUR) : null,
      })
      .select("id")
      .single();
    if (error || !data) throw new Error(`[e2e:mla] seeding failed: ${error?.message ?? "no row"}`);
    const id = data.id as string;
    listingIds.push(id);
    const located = await adminClient()
      .from("listing_locations")
      .insert({ listing_id: id, location_id: seller.cityId, position: 1 });
    if (located.error) throw new Error(`[e2e:mla] coverage failed: ${located.error.message}`);
    return id;
  }

  /** Gives an account the test already holds exactly the named permissions through a scratch role (DEC-174). */
  async function grantRole(
    wanted: Array<[resource: string, action: string]>,
    person: { id: string; email: string; password: string },
  ) {
    const supabase = adminClient();
    const roleName = `e2e_mylistings_role_${token()}`;
    const { data: role, error: roleError } = await supabase
      .from("roles")
      .insert({ name: roleName, display_name: roleName, priority: 1 })
      .select("id")
      .single();
    if (roleError || !role) throw new Error(`[e2e:mla] scratch role failed: ${roleError?.message}`);
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
      `[e2e:mla] expected exactly ${wanted.map((pair) => pair.join(":")).join(", ")}`,
    ).toHaveLength(wanted.length);
    const granted = await supabase
      .from("role_permissions")
      .insert(picked.map((p) => ({ role_id: role.id, permission_id: p.id })));
    if (granted.error) throw new Error(`[e2e:mla] grant failed: ${granted.error.message}`);
    const assigned = await supabase
      .from("user_roles")
      .insert({ user_id: person.id, role_id: role.id, scope_type: "global" });
    if (assigned.error) throw new Error(`[e2e:mla] assignment failed: ${assigned.error.message}`);
    return person;
  }

  /** Sets the scratch leaf's own capability words (never a real category's). */
  async function setCapabilities(leafId: string, capabilities: string[]) {
    const { error } = await adminClient()
      .from("categories")
      .update({ capabilities })
      .eq("id", leafId);
    if (error) throw new Error(`[e2e:mla] capabilities failed: ${error.message}`);
  }

  /** The deletion columns, read by the service client. */
  async function deletionTruth(listingId: string) {
    const { data, error } = await adminClient()
      .from("listings")
      .select("status,deleted_at")
      .eq("id", listingId)
      .maybeSingle();
    if (error) throw new Error(`[e2e:mla] deletion read failed: ${error.message}`);
    if (!data) throw new Error(`[e2e:mla] listing ${listingId} not found`);
    return data as unknown as Row;
  }

  async function confirmDelete(page: Page) {
    await page.getByTestId("my-listing-action-delete").click();
    await expect(page.getByTestId("my-listing-confirm")).toContainText(
      en["myListings.confirm.deleteTitle"],
      { timeout: 15000 },
    );
    await page.getByTestId("my-listing-confirm-yes").click();
  }

  const actionButtons = (page: Page) =>
    page.getByTestId("my-listing-actions").locator('[data-testid^="my-listing-action-"]');
  /** The newest history line: the history's one list is single (no twin), its first item by structure. */
  const firstHistory = (page: Page) =>
    page
      .getByTestId("my-listing-history")
      .locator('ol > li[data-testid="my-listing-history-line"]:first-child');

  test("MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's", async () => {
    const sellerA = await scratchSeller();
    const sellerB = await scratchSeller();
    const a = await asPerson(sellerA);
    const b = await asPerson(sellerB);
    const X = await seed(sellerA, "active");
    const C = await seed(sellerA, "active");
    const closed = await a.rpc("transition_listing", { p_listing_id: C, p_new_status: "closed" });
    expect(closed.error, "[e2e:mla] closing C").toBeNull();
    const Y = await seed(sellerB, "active");

    const list = await a.rpc("my_listings", { p_group: "live", p_limit: 50, p_offset: 0 });
    expect(list.error, "[e2e:mla] my_listings live").toBeNull();
    const listRow = (list.data as { rows: Row[] }).rows.find((row) => row["id"] === X);
    expect(listRow, "[e2e:mla] X in the list").toBeDefined();

    const x = await a.rpc("my_listing", { p_listing_id: X });
    expect(x.error, "[e2e:mla] my_listing X").toBeNull();
    const xa = x.data as Row;
    expect(xa["listing"]).toEqual(listRow);
    expect(xa["group"]).toBe("live");
    expect(xa["resumeStatus"]).toBeNull();
    expect(xa["renewAllowed"]).toBe(true);
    expect(xa["renewDays"]).toBe(await renewDays(a));
    expect(String(xa["countryCode"])).toMatch(/^[A-Z]{2}$/);

    const c = await a.rpc("my_listing", { p_listing_id: C });
    expect(c.error, "[e2e:mla] my_listing C").toBeNull();
    const ca = c.data as Row;
    expect(ca["group"]).toBe("closed");
    expect(ca["resumeStatus"]).toBe("active");
    expect((ca["listing"] as Row)["daysKept"]).toBe(10);
    expect((ca["listing"] as Row)["status"]).toBe("closed");

    for (const [person, id] of [
      [a, Y],
      [a, randomId()],
      [b, X],
    ] as const) {
      const refused = await person.rpc("my_listing", { p_listing_id: id });
      expect(refused.error).toBe("not your listing");
      expect(refused.data).toBeNull();
    }

    const { url, key } = restBase();
    const anonymous = await answerOf(
      await fetch(`${url}/rest/v1/rpc/my_listing`, {
        method: "POST",
        headers: { apikey: key, "Content-Type": "application/json" },
        body: JSON.stringify({ p_listing_id: X }),
      }),
    );
    expect(anonymous.error).not.toBeNull();
    expect(anonymous.data).toBeNull();
  });

  test("MLA-2 listing_history says which way a Reserved change went", async () => {
    const seller = await scratchSeller();
    const s = await asPerson(seller);
    const X = await seed(seller, "active");
    const on = await s.rpc("set_listing_reserved", { p_listing_id: X, p_reserved: true });
    expect(on.error, "[e2e:mla] reserve on").toBeNull();
    const off = await s.rpc("set_listing_reserved", { p_listing_id: X, p_reserved: false });
    expect(off.error, "[e2e:mla] reserve off").toBeNull();

    const history = await s.rpc("listing_history", { p_listing_id: X });
    expect(history.error, "[e2e:mla] listing_history").toBeNull();
    const lines = history.data as Row[];
    expect(lines.length).toBeGreaterThanOrEqual(2);
    expect(lines[0]!["reserved"]).toBe(false);
    expect(lines[1]!["reserved"]).toBe(true);
    for (const line of [lines[0]!, lines[1]!]) {
      expect(line["by"]).toBe("you");
      expect(line["fields"]).toEqual(["reserved"]);
      expect(line["from"]).toBeNull();
      expect(line["to"]).toBeNull();
    }

    const refused = await s.rpc("listing_history", { p_listing_id: randomId() });
    expect(refused.error).toBe("not your listing");
  });

  test("MLA-3 The ad's page: Open from the list, the status and dates, Reserved on and off (D173)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const X = await seed(seller, "active");
    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, "/my-listings");
    const open = box(page, X).getByTestId(`my-listing-${X}-open`);
    await expect(open).toBeVisible({ timeout: 15000 });
    await open.click();
    await expect(page).toHaveURL(new RegExp(`/my-listings/${X}(?:[?#].*)?$`), { timeout: 15000 });
    await expect(page.getByTestId("my-listing-page")).toBeVisible({ timeout: 15000 });

    await expect(page.getByTestId("my-listing-group")).toHaveText(en["myListings.group.live"], {
      timeout: 15000,
    });
    await expect(page.getByTestId("my-listing-state")).toHaveText(
      en["myListings.daysLeft"].replace("{count}", "10"),
    );
    await expect(page.getByTestId("my-listing-first-posted")).toHaveText(
      startsWith(en["myListings.ad.firstPosted"].replace("{date}", "")),
    );
    await expect(page.getByTestId("my-listing-ends")).toHaveText(
      startsWith(en["myListings.ad.ends"].replace("{date}", "")),
    );
    await expect(page.getByTestId("my-listing-renewed")).toHaveCount(0);
    await expect(page.getByTestId("my-listing-sold")).toHaveCount(0);

    await expect(actionButtons(page)).toHaveCount(4);
    await expect(page.getByTestId("my-listing-action-reserve")).toHaveText(
      en["myListings.action.reserve"],
    );
    await expect(page.getByTestId("my-listing-action-sell")).toHaveText(
      en["myListings.action.sell"],
    );
    await expect(page.getByTestId("my-listing-action-close")).toHaveText(
      en["myListings.action.close"],
    );
    await expect(page.getByTestId("my-listing-action-delete")).toHaveText(
      en["myListings.action.delete"],
    );

    await page.getByTestId("my-listing-action-reserve").click();
    await expect(page.getByTestId("my-listing-notice")).toHaveText(en["myListings.done.reserve"], {
      timeout: 15000,
    });
    await expect(page.getByTestId("my-listing-reserved")).toHaveText(en["myListings.reserved"], {
      timeout: 15000,
    });
    await expect(page.getByTestId("my-listing-action-unreserve")).toHaveText(
      en["myListings.action.unreserve"],
    );
    await expect(firstHistory(page)).toContainText(en["myListings.history.you"], {
      timeout: 15000,
    });
    await expect(firstHistory(page)).toContainText(en["myListings.history.reserved"]);
    expect((await listingTruth(X))["reserved_at"]).not.toBeNull();

    await page.getByTestId("my-listing-action-unreserve").click();
    await expect(page.getByTestId("my-listing-notice")).toHaveText(
      en["myListings.done.unreserve"],
      { timeout: 15000 },
    );
    await expect(page.getByTestId("my-listing-reserved")).toHaveCount(0, { timeout: 15000 });
    await expect(firstHistory(page)).toContainText(en["myListings.history.unreserved"], {
      timeout: 15000,
    });
    expect((await listingTruth(X))["reserved_at"]).toBeNull();

    const title = (await listingTruth(X))["title"] as string;
    await expect(page.getByTestId("my-listing-as-seen")).toContainText(title, { timeout: 15000 });
    await page.getByTestId("my-listing-back").click();
    await expect(page).toHaveURL(/\/my-listings(?:[?#].*)?$/, { timeout: 15000 });
  });

  test("MLA-4 No longer available keeps the days left; Reopen gives them back (D174 2)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const X = await seed(seller, "active");
    await signInViaSession(page, seller.email, seller.password);
    await openAd(page, X);

    await page.getByTestId("my-listing-action-close").click();
    await expect(page.getByTestId("my-listing-notice")).toHaveText(en["myListings.done.close"], {
      timeout: 15000,
    });
    await expect(page.getByTestId("my-listing-group")).toHaveText(en["myListings.group.closed"], {
      timeout: 15000,
    });
    await expect(page.getByTestId("my-listing-state")).toHaveText(
      `${en["myListings.closedLine"]} · ${en["myListings.daysKept"].replace("{count}", "10")}`,
    );
    await expect(actionButtons(page)).toHaveCount(3);
    await expect(page.getByTestId("my-listing-action-reopen")).toHaveText(
      en["myListings.action.reopen"],
    );
    await expect(page.getByTestId("my-listing-action-sell")).toBeVisible();
    await expect(page.getByTestId("my-listing-action-delete")).toBeVisible();
    await expect(firstHistory(page)).toContainText(
      en["admin.listings.history.status"]
        .replace("{from}", en["myListings.group.live"])
        .replace("{to}", en["myListings.closedLine"]),
      { timeout: 15000 },
    );
    const closed = await listingTruth(X);
    expect(closed["status"]).toBe("closed");
    expect(closed["resume_status"]).toBe("active");

    await page.getByTestId("my-listing-action-reopen").click();
    await expect(page.getByTestId("my-listing-notice")).toHaveText(en["myListings.done.reopen"], {
      timeout: 15000,
    });
    await expect(page.getByTestId("my-listing-group")).toHaveText(en["myListings.group.live"], {
      timeout: 15000,
    });
    await expect(page.getByTestId("my-listing-state")).toHaveText(
      en["myListings.daysLeft"].replace("{count}", "10"),
    );
    const reopened = await listingTruth(X);
    expect(reopened["status"]).toBe("active");
    expect(reopened["resume_status"]).toBeNull();
  });

  test("MLA-5 Mark as sold asks first; then the ad is sold for good (D175 1)", async ({ page }) => {
    const seller = await scratchSeller();
    const X = await seed(seller, "active");
    await signInViaSession(page, seller.email, seller.password);
    await openAd(page, X);

    await page.getByTestId("my-listing-action-sell").click();
    const confirm = page.getByTestId("my-listing-confirm");
    await expect(confirm).toBeVisible({ timeout: 15000 });
    await expect(confirm).toContainText(en["myListings.confirm.sellTitle"]);
    await page.getByTestId("my-listing-confirm-cancel").click();
    await expect(confirm).toHaveCount(0, { timeout: 15000 });
    await expect(page.getByTestId("my-listing-group")).toHaveText(en["myListings.group.live"]);
    expect((await listingTruth(X))["status"]).toBe("active");

    await page.getByTestId("my-listing-action-sell").click();
    await page.getByTestId("my-listing-confirm-yes").click();
    await expect(page.getByTestId("my-listing-notice")).toHaveText(en["myListings.done.sell"], {
      timeout: 15000,
    });
    await expect(page.getByTestId("my-listing-group")).toHaveText(en["myListings.group.sold"], {
      timeout: 15000,
    });
    await expect(page.getByTestId("my-listing-sold")).toHaveText(
      startsWith(en["myListings.soldOn"].replace("{date}", "")),
    );
    await expect(page.getByTestId("my-listing-no-action")).toHaveCount(0);
    await expect(actionButtons(page)).toHaveCount(1);
    await expect(page.getByTestId("my-listing-action-delete")).toHaveText(
      en["myListings.action.delete"],
    );
    await expect(firstHistory(page)).toContainText(
      en["admin.listings.history.status"]
        .replace("{from}", en["myListings.group.live"])
        .replace("{to}", en["myListings.group.sold"]),
      { timeout: 15000 },
    );
    const sold = await listingTruth(X);
    expect(sold["status"]).toBe("sold");
    expect(sold["sold_at"]).not.toBeNull();

    await gotoReady(page, "/my-listings");
    await page.getByTestId("my-listings-group-sold").click();
    await expect(twin(page, X)).toBeVisible({ timeout: 15000 });
  });

  test("MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit", async ({
    page,
    browser,
  }) => {
    const sellerA = await scratchSeller();
    const sellerB = await scratchSeller();
    const days = await renewDays(await asPerson(sellerA));
    const E = await seed(sellerA, "expired", { expiresInMs: -3 * DAY, publishedAgoMs: 40 * DAY });
    const D = await seed(sellerA, "draft");
    const S = await seed(sellerA, "screening");
    const Y = await seed(sellerB, "active");
    const firstPosted = (await listingTruth(E))["published_first_at"];

    await signInViaSession(page, sellerA.email, sellerA.password);
    await openAd(page, E);
    await expect(page.getByTestId("my-listing-group")).toHaveText(en["myListings.group.closed"], {
      timeout: 15000,
    });
    await expect(page.getByTestId("my-listing-state")).toHaveText(
      startsWith(en["myListings.expiredOn"].replace("{date}", "")),
    );
    await expect(page.getByTestId("my-listing-action-renew")).toHaveText(
      en["myListings.action.renew"].replace("{days}", String(days)),
    );
    await page.getByTestId("my-listing-action-renew").click();
    await expect(page.getByTestId("my-listing-notice")).toHaveText(en["myListings.done.renew"], {
      timeout: 15000,
    });
    await expect(page.getByTestId("my-listing-group")).toHaveText(en["myListings.group.live"], {
      timeout: 15000,
    });
    await expect(page.getByTestId("my-listing-renewed")).toHaveText(
      startsWith(en["myListings.ad.renewed"].replace("{date}", "")),
    );
    await expect(page.getByTestId("my-listing-first-posted")).toBeVisible();
    const renewed = await listingTruth(E);
    expect(renewed["status"]).toBe("active");
    expect(renewed["renewed_at"]).not.toBeNull();
    expect(renewed["published_first_at"]).toBe(firstPosted);

    await openAd(page, D);
    const cont = page.getByTestId("my-listing-continue");
    await expect(cont).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId("my-listing-action-delete")).toBeVisible();
    await cont.click();
    await expect(page).toHaveURL(new RegExp(`/post/${D}(?:[?#].*)?$`), { timeout: 15000 });

    await openAd(page, S);
    await expect(page.getByTestId("my-listing-info")).toHaveText(en["myListings.ad.waiting"], {
      timeout: 15000,
    });
    await expect(actionButtons(page)).toHaveCount(1);
    await expect(page.getByTestId("my-listing-action-delete")).toBeVisible();
    await expect(page.getByTestId("my-listing-no-action")).toHaveCount(0);

    await openAd(page, Y);
    await expect(page.getByTestId("my-listing-not-found")).toHaveText(
      en["myListings.ad.notFound"],
      { timeout: 15000 },
    );

    const fresh = await browser.newContext();
    try {
      const anonymous = await fresh.newPage();
      await anonymous.goto(`/my-listings/${E}`);
      await expect(anonymous).toHaveURL(
        new RegExp(`/auth\\?return=(?:%2F|/)my-listings(?:%2F|/)${E}`),
        { timeout: 15000 },
      );
    } finally {
      await fresh.close();
    }
  });

  test("MLA-7 Delete asks first; the deleted ad leaves My listings for good (call F)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const s = await asPerson(seller);
    const X = await seed(seller, "active");
    const D = await seed(seller, "draft");
    await signInViaSession(page, seller.email, seller.password);
    await openAd(page, X);

    await page.getByTestId("my-listing-action-delete").click();
    const confirm = page.getByTestId("my-listing-confirm");
    await expect(confirm).toContainText(en["myListings.confirm.deleteTitle"], { timeout: 15000 });
    await page.getByTestId("my-listing-confirm-cancel").click();
    await expect(confirm).toHaveCount(0, { timeout: 15000 });
    expect((await listingTruth(X))["status"]).toBe("active");

    await confirmDelete(page);
    await expect(page).toHaveURL(/\/my-listings(?:[?#].*)?$/, { timeout: 15000 });

    for (const group of ["live", "review", "attention", "closed", "sold", "drafts"]) {
      const list = await s.rpc("my_listings", { p_group: group, p_limit: 50, p_offset: 0 });
      expect(list.error, `[e2e:mla] my_listings ${group}`).toBeNull();
      const answer = list.data as { counts: Record<string, number>; rows: Row[] };
      expect(
        answer.rows.some((row) => row["id"] === X),
        `[e2e:mla] X in ${group}`,
      ).toBe(false);
      if (group === "live") expect(answer.counts["live"]).toBe(0);
    }
    const gone = await s.rpc("my_listing", { p_listing_id: X });
    expect(gone.error).toBe("not your listing");
    await openAd(page, X);
    await expect(page.getByTestId("my-listing-not-found")).toHaveText(
      en["myListings.ad.notFound"],
      { timeout: 15000 },
    );

    const truth = await deletionTruth(X);
    expect(truth["status"]).toBe("removed");
    expect(truth["deleted_at"]).not.toBeNull();
    const { data: revisions, error } = await adminClient()
      .from("listing_revisions")
      .select("kind,after,actor")
      .eq("listing_id", X);
    if (error) throw new Error(`[e2e:mla] revisions read failed: ${error.message}`);
    const deletion = (revisions ?? []).filter(
      (line) =>
        line.kind === "state" &&
        (line.after as Row | null)?.["status"] === "removed" &&
        line.actor === seller.id,
    );
    expect(deletion, JSON.stringify(revisions)).toHaveLength(1);

    await openAd(page, D);
    await expect(page.getByTestId("my-listing-continue")).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId("my-listing-action-delete")).toBeVisible();
    await confirmDelete(page);
    await expect(page).toHaveURL(/\/my-listings(?:[?#].*)?$/, { timeout: 15000 });
    const drafts = await s.rpc("my_listings", { p_group: "drafts", p_limit: 50, p_offset: 0 });
    expect(drafts.error, "[e2e:mla] my_listings drafts").toBeNull();
    const draftAnswer = drafts.data as { counts: Record<string, number>; rows: Row[] };
    expect(draftAnswer.rows.some((row) => row["id"] === D)).toBe(false);
    expect(draftAnswer.counts["drafts"]).toBe(0);
  });

  test("MLA-8 A seller who also holds listings:enforce deletes his own ad as its owner; a deleted ad is never restored", async () => {
    const seller = await scratchSeller();
    await grantRole([["listings", "enforce"]], seller);
    const s = await asPerson(seller);
    const X = await seed(seller, "active");

    const deleted = await s.rpc("transition_listing", { p_listing_id: X, p_new_status: "removed" });
    expect(deleted.error, "[e2e:mla] owner delete with listings:enforce").toBeNull();
    expect((await deletionTruth(X))["deleted_at"]).not.toBeNull();

    const restore = await adminClient().rpc("transition_listing", {
      p_listing_id: X,
      p_new_status: "screening",
    });
    expect(restore.error?.message ?? null).toBe("a listing its owner deleted is not restored");
    expect((await deletionTruth(X))["status"]).toBe("removed");
  });

  test("MLA-9 Rented and Filled: a sold ad takes its category's word (call H)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const s = await asPerson(seller);
    const X = await seed(seller, "active");
    try {
      const before = await s.rpc("my_listing", { p_listing_id: X });
      expect(before.error, "[e2e:mla] my_listing X").toBeNull();
      expect(((before.data as Row)["listing"] as Row)["soldWord"]).toBe("sold");

      await setCapabilities(seller.leafId, ["rented"]);
      await signInViaSession(page, seller.email, seller.password);
      await openAd(page, X);
      await expect(page.getByTestId("my-listing-action-sell")).toHaveText(
        en["myListings.action.rent"],
        { timeout: 15000 },
      );
      await page.getByTestId("my-listing-action-sell").click();
      await expect(page.getByTestId("my-listing-confirm")).toContainText(
        en["myListings.confirm.rentTitle"],
        { timeout: 15000 },
      );
      await page.getByTestId("my-listing-confirm-yes").click();
      await expect(page.getByTestId("my-listing-notice")).toHaveText(en["myListings.done.rent"], {
        timeout: 15000,
      });
      await expect(page.getByTestId("my-listing-sold")).toHaveText(
        startsWith(en["myListings.rentedOn"].replace("{date}", "")),
      );
      const after = await s.rpc("my_listing", { p_listing_id: X });
      expect(after.error, "[e2e:mla] my_listing X after").toBeNull();
      expect(((after.data as Row)["listing"] as Row)["soldWord"]).toBe("rented");
      const sold = await s.rpc("my_listings", { p_group: "sold", p_limit: 50, p_offset: 0 });
      expect(sold.error, "[e2e:mla] my_listings sold").toBeNull();
      const soldRow = (sold.data as { rows: Row[] }).rows.find((row) => row["id"] === X);
      expect(soldRow?.["soldWord"]).toBe("rented");
      await gotoReady(page, "/my-listings");
      await page.getByTestId("my-listings-group-sold").click();
      await expect(twin(page, X).getByTestId(`my-listing-${X}-state`)).toHaveText(
        startsWith(en["myListings.rentedOn"].replace("{date}", "")),
        { timeout: 15000 },
      );

      await setCapabilities(seller.leafId, ["filled"]);
      const Y = await seed(seller, "active");
      await openAd(page, Y);
      await expect(page.getByTestId("my-listing-action-sell")).toHaveText(
        en["myListings.action.fill"],
        { timeout: 15000 },
      );
      await page.getByTestId("my-listing-action-sell").click();
      await expect(page.getByTestId("my-listing-confirm")).toContainText(
        en["myListings.confirm.fillTitle"],
        { timeout: 15000 },
      );
      await page.getByTestId("my-listing-confirm-yes").click();
      await expect(page.getByTestId("my-listing-notice")).toHaveText(en["myListings.done.fill"], {
        timeout: 15000,
      });
      await expect(page.getByTestId("my-listing-sold")).toHaveText(
        startsWith(en["myListings.filledOn"].replace("{date}", "")),
      );
    } finally {
      await setCapabilities(seller.leafId, []);
    }
  });

  test("MLA-10 A refused ad's Delete is answered in words when it was refused for a severe reason", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const R = await seed(seller, "rejected");
    const marked = await adminClient()
      .from("listings")
      .update({ screening: { severe: true } })
      .eq("id", R);
    if (marked.error) throw new Error(`[e2e:mla] screening mark failed: ${marked.error.message}`);
    await signInViaSession(page, seller.email, seller.password);
    await openAd(page, R);
    await expect(page.getByTestId("my-listing-action-delete")).toBeVisible({ timeout: 15000 });
    await confirmDelete(page);
    await expect(page.getByTestId("my-listing-problem")).toHaveText(en["myListings.error.severe"], {
      timeout: 15000,
    });
    const truth = await deletionTruth(R);
    expect(truth["status"]).toBe("rejected");
    expect(truth["deleted_at"]).toBeNull();
  });

  test("MLA-11 the ad's page says what buyers see; its marks and its picture's ribbon (D180)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const X = await seed(seller, "active");
    await signInViaSession(page, seller.email, seller.password);
    await openAd(page, X);
    const line = page.getByTestId("my-listing-visibility");
    const seen = page.getByTestId("my-listing-as-seen");
    await expect(line).toHaveAttribute("data-visible", "seen", { timeout: 15000 });
    await expect(line).toHaveText(en["myListings.ad.seen"]);
    await expect(seen.getByTestId("listing-ribbon")).toHaveCount(0);

    await page.getByTestId("my-listing-action-reserve").click();
    await expect(page.getByTestId("my-listing-reserved")).toBeVisible({ timeout: 15000 });
    await expect(seen.getByTestId("listing-ribbon-text")).toHaveText(en["feed.reserved"]);

    await page.getByTestId("my-listing-action-close").click();
    await expect(line).toHaveAttribute("data-visible", "hidden", { timeout: 15000 });
    await expect(line).toHaveText(en["myListings.ad.hidden"]);
    await expect(page.getByTestId("my-listing-closed-mark")).toHaveText(en["feed.ribbon.closed"]);
    await expect(seen.getByTestId("listing-ribbon-text")).toHaveText(en["feed.ribbon.closed"]);
    await gotoReady(page, "/my-listings");
    await page.getByTestId("my-listings-group-closed").click();
    await expect(twin(page, X).getByTestId(`my-listing-${X}-closed-mark`)).toBeVisible({
      timeout: 15000,
    });

    await openAd(page, X);
    await page.getByTestId("my-listing-action-reopen").click();
    await expect(line).toHaveAttribute("data-visible", "seen", { timeout: 15000 });
    await page.getByTestId("my-listing-action-sell").click();
    await page.getByTestId("my-listing-confirm-yes").click();
    await expect(line).toHaveAttribute("data-visible", "soldSeen", { timeout: 15000 });
    await expect(line).toHaveText(
      en["myListings.ad.soldSeen"].replace("{word}", en["feed.ribbon.sold"]),
    );
    await expect(page.getByTestId("my-listing-sold-mark")).toHaveText(en["feed.ribbon.sold"]);
    await expect(seen.getByTestId("listing-ribbon-text")).toHaveText(en["feed.ribbon.sold"]);
    await gotoReady(page, "/my-listings");
    await page.getByTestId("my-listings-group-sold").click();
    await expect(twin(page, X).getByTestId(`my-listing-${X}-sold-mark`)).toBeVisible({
      timeout: 15000,
    });
  });
});
