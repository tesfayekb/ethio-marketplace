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
  "status,title,expires_at,reserved_at,resume_status,sold_at,renewed_at,published_first_at,directions";

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

/**
 * B1 (walk defect) — what the walk saw: the number box sits inside the viewport
 * and is at least 160 px wide, the picker no wider than 120 px.
 */
async function expectPhoneRowUsable(page: Page, testId: string) {
  const viewport = page.viewportSize();
  const box = await page.getByTestId(testId).boundingBox();
  const picker = await page.getByTestId(`${testId}-country`).boundingBox();
  const shown = `number=${JSON.stringify(box)} picker=${JSON.stringify(picker)} viewport=${viewport?.width}`;
  expect(box, `${testId}: the number box is not rendered (${shown})`).not.toBeNull();
  expect(picker, `${testId}: the picker is not rendered (${shown})`).not.toBeNull();
  if (box === null || picker === null || viewport === null) return;
  expect(box.x, `${testId}: the number box starts off screen (${shown})`).toBeGreaterThanOrEqual(0);
  expect(
    box.x + box.width,
    `${testId}: the number box ends off screen (${shown})`,
  ).toBeLessThanOrEqual(viewport.width);
  expect(box.width, `${testId}: the number box is under 160 px (${shown})`).toBeGreaterThanOrEqual(
    160,
  );
  expect(picker.width, `${testId}: the picker is over 120 px (${shown})`).toBeLessThanOrEqual(120);
}

/** B1 — the number is entered as a person does: click the box, type on the keyboard. */
async function typePhone(page: Page, testId: string, text: string) {
  await page.getByTestId(testId).click();
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.press("Backspace");
  await page.keyboard.type(text);
}

/** B2 — the country is picked from the searchable list, by its calling code. */
async function pickPhoneCountry(page: Page, testId: string, iso: string, code: string) {
  await page.getByTestId(`${testId}-country`).click();
  await page.getByTestId(`${testId}-country-search`).fill(code);
  await page.locator(`[data-testid="${testId}-country-option"][data-iso="${iso}"]`).click();
  await expect(page.getByTestId(`${testId}-country`)).toHaveAttribute("data-iso", iso);
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

  test("MLA-12 the ad's actions are one bar under the title, its main next step filled (D181)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const X = await seed(seller, "active");
    await signInViaSession(page, seller.email, seller.password);
    await openAd(page, X);
    const bar = page.getByTestId("my-listing-actions");
    await expect(bar).toBeVisible({ timeout: 15000 });
    await expect(bar.getByRole("heading")).toHaveCount(0);
    const heading = await page.getByRole("heading", { level: 1 }).boundingBox();
    const barBox = await bar.boundingBox();
    const status = await page.getByTestId("my-listing-status").boundingBox();
    if (!heading || !barBox || !status) throw new Error("[e2e:mla] a box is missing");
    expect(barBox.y).toBeGreaterThan(heading.y);
    expect(barBox.y).toBeLessThan(status.y);

    const background = (testid: string) =>
      page.getByTestId(testid).evaluate((node) => getComputedStyle(node).backgroundColor);
    const sellBackground = await background("my-listing-action-sell");
    expect(sellBackground).not.toBe(await background("my-listing-action-close"));

    const width = page.viewportSize()?.width ?? 0;
    const buttons = await actionButtons(page).evaluateAll((nodes) =>
      nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { top: Math.round(rect.top), width: rect.width };
      }),
    );
    expect(buttons.length).toBeGreaterThan(0);
    if (width < 768) {
      for (const button of buttons) {
        expect(Math.abs(button.width - barBox.width)).toBeLessThanOrEqual(1);
      }
    }
    if (width >= 1280) {
      for (const button of buttons) expect(button.top).toBe(buttons[0]!.top);
    }

    await page.getByTestId("my-listing-action-close").click();
    await expect(page.getByTestId("my-listing-action-reopen")).toBeVisible({ timeout: 15000 });
    expect(await background("my-listing-action-reopen")).not.toBe(
      await background("my-listing-action-sell"),
    );
  });

  test("MLA-13 Edit on the ad's page: a price at once, new words to review, a refusal under its field (D172, D177)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const X = await seed(seller, "active");
    const Y = await seed(seller, "active");
    const priceOf = async (id: string) => {
      const { data, error } = await adminClient()
        .from("listings")
        .select("price_amount")
        .eq("id", id)
        .single();
      if (error || !data) throw new Error(`[e2e:mla] price read failed: ${error?.message}`);
      return Number(data.price_amount);
    };
    const clearAndType = async (testid: string, text: string) => {
      await page.getByTestId(testid).click();
      await page.keyboard.press("Control+A");
      await page.keyboard.press("Backspace");
      if (text !== "") await page.keyboard.type(text);
    };

    await signInViaSession(page, seller.email, seller.password);
    await openAd(page, X);
    const edit = page.getByTestId("my-listing-edit");
    await expect(edit).toBeVisible({ timeout: 15000 });
    const order = await page
      .getByTestId("my-listing-actions")
      .locator('[data-testid="my-listing-edit"], [data-testid="my-listing-action-sell"]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-testid")));
    expect(order).toEqual(["my-listing-edit", "my-listing-action-sell"]);
    await edit.click();
    await expect(page.getByTestId("my-listing-edit-heading")).toHaveText(
      en["myListings.editBox.title"],
      { timeout: 15000 },
    );
    // D187 — the boxes in the posting form's order.
    const boxes = await page
      .getByTestId("listing-edit-form")
      .locator(":scope > [data-testid]")
      .evaluateAll((nodes) =>
        nodes
          .map((node) => node.getAttribute("data-testid") ?? "")
          .filter((id) => id.endsWith("-box") || id === "listing-edit-text"),
      );
    expect(boxes).toEqual([
      "listing-edit-specs-box",
      "listing-edit-photos-box",
      "listing-edit-text",
      "listing-edit-price-box",
      "listing-edit-place-box",
      "listing-edit-contact-box",
      "listing-edit-save-box",
    ]);
    await expect(page.getByTestId("listing-edit-text").getByTestId("post-assist")).toBeVisible();
    await expect(
      page.getByTestId("listing-edit-photos-box").getByTestId("post-video"),
    ).toBeVisible();
    await expect(page.getByTestId("my-listing-as-seen")).toHaveCount(0);
    await expect(page.getByTestId("my-listing-action-sell")).toHaveCount(0);

    await page.getByTestId("listing-edit-save").click();
    await expect(page.getByTestId("listing-edit-problem")).toHaveText(
      en["myListings.editBox.nothing"],
      { timeout: 15000 },
    );

    await clearAndType("post-price-amount", "90");
    await page.getByTestId("listing-edit-save").click();
    await expect(page.getByTestId("my-listing-notice")).toHaveText(en["myListings.editBox.done"], {
      timeout: 15000,
    });
    await expect(page.getByTestId("my-listing-edit-panel")).toHaveCount(0);
    expect((await listingTruth(X))["status"]).toBe("active");
    expect(await priceOf(X)).toBe(90);

    await page.getByTestId("my-listing-edit").click();
    await expect(page.getByTestId("my-listing-edit-heading")).toBeVisible({ timeout: 15000 });
    await clearAndType("post-title", `E2E new words ${token()}`);
    await page.getByTestId("listing-edit-save").click();
    await expect(page.getByTestId("my-listing-notice")).toHaveText(
      en["myListings.editBox.doneReview"],
      { timeout: 15000 },
    );
    expect((await listingTruth(X))["status"]).toBe("screening");
    await expect(page.getByTestId("my-listing-info")).toHaveText(en["myListings.ad.waiting"], {
      timeout: 15000,
    });
    await expect(page.getByTestId("my-listing-edit")).toHaveCount(0);

    const yTitle = (await listingTruth(Y))["title"];
    await openAd(page, Y);
    await page.getByTestId("my-listing-edit").click();
    await expect(page.getByTestId("my-listing-edit-heading")).toBeVisible({ timeout: 15000 });
    await clearAndType("post-title", "");
    await page.getByTestId("listing-edit-save").click();
    await expect(
      page
        .getByTestId("listing-edit-text")
        .locator('[data-testid="post-field"][data-field="post-title"] [role="alert"]'),
    ).toHaveText(en["post.refusal.required"], { timeout: 15000 });
    await expect(page.getByTestId("my-listing-edit-panel")).toBeVisible();
    expect((await listingTruth(Y))["title"]).toBe(yTitle);
  });

  test("MLA-14 Edit from the list's row opens the boxes; Post similar opens a new draft (D172, D182 4)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const X = await seed(seller, "active");
    const S = await seed(seller, "sold");
    // INC-634 — a seller who copies an ad has posted before: the draft route has
    // set the residency fact (DEC-068) that the pool reset clears.
    const resident = await adminClient()
      .from("user_directory")
      .update({ observed_country_code: "ET", observed_at: new Date().toISOString() })
      .eq("user_id", seller.id);
    if (resident.error)
      throw new Error(`[e2e:mla] residency seed failed: ${resident.error.message}`);

    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, "/my-listings");
    await expect(twin(page, X)).toBeVisible({ timeout: 15000 });
    await box(page, X).getByTestId(`my-listing-${X}-edit`).click();
    await expect(page).toHaveURL(new RegExp(`/my-listings/${X}\\?edit=1$`), { timeout: 15000 });
    await expect(page.getByTestId("my-listing-edit-heading")).toBeVisible({ timeout: 15000 });

    await openAd(page, S);
    await expect(page.getByTestId("my-listing-edit")).toHaveCount(0);
    const copy = page.getByTestId("my-listing-copy");
    await expect(copy).toHaveText(en["myListings.action.copy"], { timeout: 15000 });
    await copy.click();
    await expect(page).toHaveURL(/\/post\/[0-9a-f-]{36}(?:[?#].*)?$/, { timeout: 15000 });
    const N = new URL(page.url()).pathname.split("/")[2]!;
    expect(N).not.toBe(S);
    listingIds.push(N);
    const { data, error } = await adminClient()
      .from("listings")
      .select("status,seller_id,title")
      .eq("id", N)
      .single();
    if (error || !data) throw new Error(`[e2e:mla] copy read failed: ${error?.message}`);
    expect(data).toEqual({
      status: "draft",
      seller_id: seller.id,
      title: (await listingTruth(S))["title"],
    });
  });

  test("MLA-15 Edit, complete: a second city and a channel apply at once; typed directions go to review; the boxes in the posting form's order (D187)", async ({
    page,
  }) => {
    const A = await scratchSeller();
    const second = await seedScratchChain("ET");
    // Reaped in afterEach after the listings, so no place row still points at it.
    regions.push(second.region.slug as string);
    {
      const X = await seed(A, "active");
      const C1 = await adminClient()
        .from("locations")
        .select("name_en")
        .eq("id", A.cityId)
        .single();
      if (C1.error || !C1.data) throw new Error(`[e2e:mla] city read failed: ${C1.error?.message}`);
      const c1Name = C1.data.name_en as string;
      const c2Name = second.city.name_en as string;

      await signInViaSession(page, A.email, A.password);
      await openAd(page, X);
      await page.getByTestId("my-listing-edit").click();
      await expect(page.getByTestId("my-listing-edit-heading")).toBeVisible({ timeout: 15000 });

      const place = page.getByTestId("listing-edit-place-box");
      await expect(place.getByTestId("post-where-city")).toHaveValue(A.cityId, { timeout: 15000 });
      // The free plan allows one city: the seller changes the ad's place (INC-642).
      await place.getByTestId("post-where-region").selectOption(second.region.id as string);
      await place.getByTestId("post-where-city").selectOption(second.city.id as string);
      await expect(place.getByTestId("post-where-city")).toHaveValue(second.city.id as string);

      const contact = page.getByTestId("listing-edit-contact-box");
      await expect(contact).toBeVisible();
      await expectPhoneRowUsable(page, "post-who-value-phone");
      await pickPhoneCountry(page, "post-who-value-phone", "ET", "+251");
      await typePhone(page, "post-who-value-phone", "911234567");
      await page.getByTestId("post-who-value-phone").blur();
      await contact.getByTestId("post-who-show-phone").check();

      await page.getByTestId("listing-edit-save").click();
      await expect(page.getByTestId("my-listing-notice")).toHaveText(
        en["myListings.editBox.done"],
        { timeout: 15000 },
      );
      await expect(page.getByTestId("my-listing-edit-panel")).toHaveCount(0);
      const seen = page.getByTestId("my-listing-as-seen");
      await expect(seen.getByTestId("listing-detail-places")).toContainText(c2Name);
      await expect(seen.getByTestId("listing-detail-places")).not.toContainText(c1Name);
      await expect(
        seen.getByTestId("listing-detail-contact").locator('[data-channel="phone"]'),
      ).toHaveCount(1);

      const supabase = adminClient();
      const located = await supabase
        .from("listing_locations")
        .select("location_id")
        .eq("listing_id", X)
        .order("position");
      if (located.error)
        throw new Error(`[e2e:mla] coverage read failed: ${located.error.message}`);
      expect(located.data.map((row) => row.location_id)).toEqual([second.city.id]);
      const row = await supabase
        .from("listings")
        .select("location_id,status,contact_pref")
        .eq("id", X)
        .single();
      if (row.error || !row.data)
        throw new Error(`[e2e:mla] listing read failed: ${row.error?.message}`);
      expect(row.data.location_id).toBe(second.city.id);
      expect(row.data.status).toBe("active");
      expect(
        ((row.data.contact_pref as Row)["phone"] as { show?: boolean } | undefined)?.show,
      ).toBe(true);

      await page.getByTestId("my-listing-edit").click();
      await expect(page.getByTestId("my-listing-edit-heading")).toBeVisible({ timeout: 15000 });
      await page.getByTestId("listing-edit-place-box").getByTestId("post-where-directions").click();
      await page.keyboard.type("Behind the church");
      await page.keyboard.press("Tab");
      await expect(page.getByTestId("post-where-directions-saved")).toHaveCount(0);
      await page.getByTestId("listing-edit-save").click();
      await expect(page.getByTestId("my-listing-notice")).toHaveText(
        en["myListings.editBox.doneReview"],
        { timeout: 15000 },
      );
      const truth = await listingTruth(X);
      expect(truth["status"]).toBe("screening");
      expect(truth["directions"]).toBe("Behind the church");
    }
  });
});
