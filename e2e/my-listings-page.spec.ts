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
import {
  expectActivePanel,
  expectNoHorizontalOverflow,
  gotoReady,
  isMobile,
  openPanel,
  signInViaSession,
} from "./helpers/ui";
import { adminClient } from "./helpers/users";

/**
 * Bundle 16 (My listings), turn 2 — THE LIST PAGE (MLP-1..MLP-4).
 *
 * Proves D138, the seller's own page of his ads: the `my_listings` door answers
 * the caller's own ads only, in six groups with their counts, newest change
 * first, with the days left or kept, the Reserved and "Price reduced" marks and a
 * removed ad's staff reason; the page shows them with Continue on a draft; the
 * My Listings panel opens /my-listings; and the Account overview counts the six
 * groups with the page's words, never a status of its own (INC-469: no "Paused").
 *
 * Every seller is a scratch seller; every listing and notice is a scratch row of
 * this file, removed in afterEach (J3, G27); every row is found by its own id (G28).
 */

type Row = Record<string, unknown>;

function restBase(): { url: string; key: string } {
  const url = process.env["E2E_SUPABASE_URL"];
  const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    throw new Error("[e2e:mlp] E2E_SUPABASE_URL and E2E_SUPABASE_PUBLISHABLE_KEY must be set.");
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
  };
}

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

const TRUTH = "status,title,expires_at,reserved_at,price_amount,price_was,deleted_at";

async function listingTruth(listingId: string) {
  const { data, error } = await adminClient()
    .from("listings")
    .select(TRUTH)
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:mlp] listing read failed: ${error.message}`);
  if (!data) throw new Error(`[e2e:mlp] listing ${listingId} not found`);
  return data as unknown as Row;
}

type Counts = Record<"live" | "review" | "attention" | "closed" | "sold" | "drafts", number>;
type Answer = { counts: Counts; rows: Row[] };
type Person = Awaited<ReturnType<typeof asPerson>>;

async function myListings(person: Person, group: string, limit = 50, offset = 0) {
  return person.rpc("my_listings", { p_group: group, p_limit: limit, p_offset: offset });
}

async function groupOf(person: Person, group: string, limit = 50, offset = 0) {
  const result = await myListings(person, group, limit, offset);
  expect(result.error, `[e2e:mlp] my_listings ${group}`).toBeNull();
  return result.data as Answer;
}

const ids = (answer: Answer) => answer.rows.map((row) => row["id"] as string);
const rowOf = (answer: Answer, id: string) => {
  const row = answer.rows.find((entry) => entry["id"] === id);
  if (!row) throw new Error(`[e2e:mlp] row ${id} missing`);
  return row;
};

/** The visible twin of a row: the table row from 1280 px, the card below it. */
function twin(page: Page, id: string) {
  const width = page.viewportSize()?.width ?? 0;
  return page.getByTestId(width >= 1280 ? `my-listing-${id}` : `my-listing-${id}-card`);
}

/**
 * Turn 2b — the box holding a row's actions: the table row from 1280 px; below
 * it the card's box (`my-listing-<id>-actions`), whose foot carries the actions
 * beside the card's body (`twin`).
 */
function box(page: Page, id: string) {
  const width = page.viewportSize()?.width ?? 0;
  return page.getByTestId(width >= 1280 ? `my-listing-${id}` : `my-listing-${id}-actions`);
}

test.describe("MY LISTINGS — the list page (bundle 16 turn 2)", () => {
  const sellers: string[] = [];
  const listingIds: string[] = [];
  const regions: string[] = [];
  const branches: string[][] = [];

  test.afterEach(async () => {
    const supabase = adminClient();
    const owned = listingIds.splice(0);
    if (owned.length > 0) {
      const notices = await supabase.from("seller_notices").delete().in("listing_id", owned);
      if (notices.error) throw new Error(`[e2e:mlp] notice reap failed: ${notices.error.message}`);
    }
    for (const id of owned) {
      const removed = await supabase.from("listings").delete().eq("id", id);
      if (removed.error) throw new Error(`[e2e:mlp] listing reap failed: ${removed.error.message}`);
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
      parentId: parent.id as string,
      cityId: chain.city.id as string,
    };
  }

  type Seller = Awaited<ReturnType<typeof scratchSeller>>;

  /**
   * A complete scratch listing: published and first published 20 days ago, 100 ETB
   * fixed once set 20 days ago, ending in 10 days minus one hour unless told otherwise.
   */
  async function seed(
    seller: Seller,
    status: string,
    options: { expiresInMs?: number; title?: string } = {},
  ) {
    const live = ["active", "reduced", "expired", "sold", "removed", "closed"].includes(status);
    const { data, error } = await adminClient()
      .from("listings")
      .insert({
        category_id: seller.leafId,
        seller_id: seller.id,
        location_id: seller.cityId,
        home_country_code: "ET",
        title: options.title ?? `E2E my listings page ${RUN.replace(/[0-9]/g, "x")} ${token()}`,
        description: "e2e scratch listing for the my listings page",
        attributes: {},
        price_mode: "fixed",
        price_amount: 100,
        price_currency: "ETB",
        price_period: "once",
        price_set_at: at(-20 * DAY),
        contact_pref: { messages: true },
        status,
        tier: "regular",
        published_at: live ? at(-20 * DAY) : null,
        published_first_at: live ? at(-20 * DAY) : null,
        expires_at: live ? at(options.expiresInMs ?? 10 * DAY - HOUR) : null,
      })
      .select("id")
      .single();
    if (error || !data) throw new Error(`[e2e:mlp] seeding failed: ${error?.message ?? "no row"}`);
    const id = data.id as string;
    listingIds.push(id);
    const located = await adminClient()
      .from("listing_locations")
      .insert({ listing_id: id, location_id: seller.cityId, position: 1 });
    if (located.error) throw new Error(`[e2e:mlp] coverage failed: ${located.error.message}`);
    return id;
  }

  /** The one seeding of MLP-1 and MLP-2: seller A's ten ads and seller B's one. */
  async function seedBoth() {
    const sellerA = await scratchSeller();
    const sellerB = await scratchSeller();
    const a = await asPerson(sellerA);
    const X = await seed(sellerA, "active");
    const R = await seed(sellerA, "reduced");
    const C = await seed(sellerA, "active");
    const closed = await a.rpc("transition_listing", { p_listing_id: C, p_new_status: "closed" });
    expect(closed.error, "[e2e:mlp] closing C").toBeNull();
    const S = await seed(sellerA, "screening");
    const H = await seed(sellerA, "held");
    const J = await seed(sellerA, "rejected");
    const M = await seed(sellerA, "removed");
    const E = await seed(sellerA, "expired", { expiresInMs: -3 * DAY });
    const P = await seed(sellerA, "sold");
    const D = await seed(sellerA, "draft");
    const notice = await adminClient().from("seller_notices").insert({
      seller_id: sellerA.id,
      listing_id: M,
      kind: "admin_remove",
      fields: [],
      reason: "photo",
    });
    if (notice.error) throw new Error(`[e2e:mlp] notice failed: ${notice.error.message}`);
    const reserved = await a.rpc("set_listing_reserved", { p_listing_id: X, p_reserved: true });
    expect(reserved.error, "[e2e:mlp] reserving X").toBeNull();
    const priced = await a.rpc("set_listing_price", {
      p_listing_id: X,
      p_price_mode: "fixed",
      p_price_amount: 90,
      p_price_currency: "ETB",
      p_price_period: "once",
    });
    expect(priced.error, "[e2e:mlp] pricing X").toBeNull();
    const truth = await listingTruth(X);
    expect(truth["reserved_at"], "[e2e:mlp] X reserved").not.toBeNull();
    const B1 = await seed(sellerB, "active");
    return { sellerA, sellerB, a, b: await asPerson(sellerB), X, R, C, S, H, J, M, E, P, D, B1 };
  }

  test("MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's", async () => {
    const s = await seedBoth();
    const mine = new Set([s.X, s.R, s.C, s.S, s.H, s.J, s.M, s.E, s.P, s.D]);

    const live = await groupOf(s.a, "live");
    expect(live.counts).toEqual({
      live: 2,
      review: 2,
      attention: 2,
      closed: 2,
      sold: 1,
      drafts: 1,
    });
    expect(ids(live)).toEqual([s.X, s.R]);
    const x = rowOf(live, s.X);
    expect(x["reserved"]).toBe(true);
    expect(x["priceWas"]).toBe(100);
    expect(x["priceAmount"]).toBe(90);
    expect(x["daysLeft"]).toBe(10);
    const r = rowOf(live, s.R);
    expect(r["reserved"]).toBe(false);
    expect(r["priceWas"]).toBeNull();

    const closed = await groupOf(s.a, "closed");
    expect([...ids(closed)].sort()).toEqual([s.C, s.E].sort());
    expect(rowOf(closed, s.C)["daysKept"]).toBe(10);
    expect(rowOf(closed, s.E)["daysKept"]).toBeNull();
    expect(rowOf(closed, s.E)["expiresAt"]).not.toBeNull();

    const attention = await groupOf(s.a, "attention");
    expect(rowOf(attention, s.M)["removedReason"]).toBe("photo");
    expect(rowOf(attention, s.J)["removedReason"]).toBeNull();

    const review = await groupOf(s.a, "review");
    expect([...ids(review)].sort()).toEqual([s.S, s.H].sort());
    expect(ids(await groupOf(s.a, "sold"))).toEqual([s.P]);
    expect(ids(await groupOf(s.a, "drafts"))).toEqual([s.D]);

    const second = await groupOf(s.a, "live", 1, 1);
    expect(ids(second)).toEqual([s.R]);

    for (const group of ["live", "review", "attention", "closed", "sold", "drafts"]) {
      for (const id of ids(await groupOf(s.a, group))) {
        expect(mine.has(id), `[e2e:mlp] ${group} row ${id} is seller A's`).toBe(true);
      }
    }

    const bLive = await groupOf(s.b, "live");
    expect(bLive.counts).toEqual({
      live: 1,
      review: 0,
      attention: 0,
      closed: 0,
      sold: 0,
      drafts: 0,
    });
    expect(ids(bLive)).toEqual([s.B1]);
    for (const group of ["live", "review", "attention", "closed", "sold", "drafts"]) {
      for (const id of ids(await groupOf(s.b, group))) {
        expect(mine.has(id), `[e2e:mlp] seller B's ${group} holds A's ${id}`).toBe(false);
      }
    }

    const unknown = await myListings(s.a, "paused");
    expect(unknown.error).toBe("unknown group");
    const badPage = await myListings(s.a, "live", 101, 0);
    expect(badPage.error).toBe("bad page");

    const { url, key } = restBase();
    const anonymous = await answerOf(
      await fetch(`${url}/rest/v1/rpc/my_listings`, {
        method: "POST",
        headers: { apikey: key, "Content-Type": "application/json" },
        body: JSON.stringify({ p_group: "live", p_limit: 50, p_offset: 0 }),
      }),
    );
    expect(anonymous.error).not.toBeNull();
    expect(anonymous.data).toBeNull();
  });

  test("MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138)", async ({
    page,
  }) => {
    const s = await seedBoth();
    await signInViaSession(page, s.sellerA.email, s.sellerA.password);
    await gotoReady(page, "/my-listings");
    await expect(page.getByTestId("my-listings-page")).toBeVisible({ timeout: 15000 });

    const groups = page.getByTestId("my-listings-group");
    const words: Array<[string, string]> = [
      ["live", `${en["myListings.group.live"]} (2)`],
      ["review", `${en["myListings.group.review"]} (2)`],
      ["attention", `${en["myListings.group.attention"]} (2)`],
      ["closed", `${en["myListings.group.closed"]} (2)`],
      ["sold", `${en["myListings.group.sold"]} (1)`],
      ["drafts", `${en["myListings.group.drafts"]} (1)`],
    ];
    await expect(groups.getByRole("button")).toHaveCount(6);
    for (const [group, text] of words) {
      await expect(groups.getByTestId(`my-listings-group-${group}`)).toHaveText(text, {
        timeout: 15000,
      });
    }
    await expect(groups.getByTestId("my-listings-group-live")).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    const x = twin(page, s.X);
    await expect(x).toBeVisible({ timeout: 15000 });
    await expect(twin(page, s.R)).toBeVisible();
    for (const other of [s.C, s.S, s.H, s.J, s.M, s.E, s.P, s.D, s.B1]) {
      await expect(page.getByTestId(`my-listing-${other}`)).toHaveCount(0);
      await expect(page.getByTestId(`my-listing-${other}-card`)).toHaveCount(0);
    }
    await expect(x.getByTestId(`my-listing-${s.X}-reserved`)).toHaveText(en["myListings.reserved"]);
    await expect(x.getByTestId(`my-listing-${s.X}-price-reduced`)).toHaveText(
      en["myListings.priceReduced"],
    );
    await expect(x.getByTestId(`my-listing-${s.X}-state`)).toHaveText(
      en["myListings.daysLeft"].replace("{count}", "10"),
    );
    const r = twin(page, s.R);
    await expect(r.getByTestId(`my-listing-${s.R}-reserved`)).toHaveCount(0);
    await expect(r.getByTestId(`my-listing-${s.R}-price-reduced`)).toHaveCount(0);

    await groups.getByTestId("my-listings-group-closed").click();
    const c = twin(page, s.C);
    await expect(c.getByTestId(`my-listing-${s.C}-state`)).toHaveText(
      `${en["myListings.closedLine"]} · ${en["myListings.daysKept"].replace("{count}", "10")}`,
      { timeout: 15000 },
    );
    const expiredWord = en["myListings.expiredOn"].replace("{date}", "");
    await expect(twin(page, s.E).getByTestId(`my-listing-${s.E}-state`)).toHaveText(
      new RegExp(`^${expiredWord}`),
    );

    await groups.getByTestId("my-listings-group-attention").click();
    await expect(twin(page, s.M).getByTestId(`my-listing-${s.M}-state`)).toHaveText(
      en["myListings.removedBecause"].replace("{reason}", en["admin.listings.reason.photo"]),
      { timeout: 15000 },
    );
    await expect(twin(page, s.J).getByTestId(`my-listing-${s.J}-state`)).toHaveText(
      en["myListings.notApproved"],
    );

    for (const group of ["review", "sold", "drafts"]) {
      await groups.getByTestId(`my-listings-group-${group}`).click();
      await expect(groups.getByTestId(`my-listings-group-${group}`)).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      await expect(page.getByTestId(`my-listing-${s.B1}`)).toHaveCount(0);
      await expect(page.getByTestId(`my-listing-${s.B1}-card`)).toHaveCount(0);
    }

    const cont = box(page, s.D).getByTestId(`my-listing-${s.D}-continue`);
    await expect(cont).toBeVisible({ timeout: 15000 });
    await cont.click();
    await expect(page).toHaveURL(new RegExp(`/post/${s.D}(?:[?#].*)?$`), { timeout: 15000 });
  });

  test("MLP-3 My Listings opens its own page; signed out, the page asks to sign in", async ({
    page,
    browser,
  }) => {
    const seller = await scratchSeller();
    await signInViaSession(page, seller.email, seller.password);
    await openPanel(page, "my-listings");
    await expect(page).toHaveURL(/\/my-listings(?:[?#].*)?$/, { timeout: 15000 });
    await expect(page.getByTestId("my-listings-page")).toBeVisible({ timeout: 15000 });
    await expectActivePanel(page, "my-listings");
    await expect(
      page.getByTestId(isMobile(page) ? "bottom-bar-my-listings" : "panel-tab-my-listings"),
    ).toContainText(en["panel.myListings"]);
    await expect(page.getByText(en["shell.placeholderTitle"])).toHaveCount(0);

    const item = page.getByTestId(
      isMobile(page) ? "strip-item-ml-listings" : "rail-item-ml-listings",
    );
    await expect(item).toHaveAttribute("href", /\/my-listings$/);
    await expect(item).toContainText(en["nav.myListings"]);

    const fresh = await browser.newContext();
    try {
      const anonymous = await fresh.newPage();
      await anonymous.goto("/my-listings");
      await expect(anonymous).toHaveURL(/\/auth\?return=(?:%2F|\/)my-listings/, {
        timeout: 15000,
      });
      const account = await fresh.newPage();
      await account.goto("/account");
      await expect(account).toHaveURL(/\/auth\?return=(?:%2F|\/)account/, {
        timeout: 15000,
      });
    } finally {
      await fresh.close();
    }

    // INC-627 — a sign-out in this tab still leaves for the marketplace.
    await page.evaluate(async () => {
      await window.__ethioSupabase!.auth.signOut({ scope: "local" });
    });
    await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
    await expect(page.getByTestId("my-listings-page")).toHaveCount(0);

    // INC-628 — the session helper keeps a same-user injection a no-op after a sign-out,
    // so the /account leg signs in a second scratch seller (a different user).
    const second = await scratchSeller();
    await signInViaSession(page, second.email, second.password);
    await gotoReady(page, "/account");
    await expect(page).toHaveURL(/\/account(?:[?#].*)?$/, { timeout: 15000 });
    await page.evaluate(async () => {
      await window.__ethioSupabase!.auth.signOut({ scope: "local" });
    });
    await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
  });

  test("MLP-4 The Account overview counts the six groups with the page's words and opens My listings (INC-469)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    await seed(seller, "active");
    await seed(seller, "draft");
    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, "/account");

    const counts = page.getByTestId("account-listings-counts");
    await expect(counts).toBeVisible({ timeout: 15000 });
    await expect(counts.locator("[data-group]")).toHaveCount(2);
    const live = counts.locator('[data-group="live"]');
    await expect(live).toContainText(en["myListings.group.live"]);
    await expect(live).toContainText("1");
    const drafts = counts.locator('[data-group="drafts"]');
    await expect(drafts).toContainText(en["myListings.group.drafts"]);
    await expect(drafts).toContainText("1");
    await expect(page.getByText("Paused")).toHaveCount(0);

    await page.getByTestId("account-open-listings").click();
    await expect(page).toHaveURL(/\/my-listings(?:[?#].*)?$/, { timeout: 15000 });
  });

  test("MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181)", async () => {
    const sellerA = await scratchSeller();
    const second = await seedCategoryBranch();
    branches.push([second.parent.slug as string, second.leaf.slug as string]);
    const onSecond = { ...sellerA, leafId: second.leaf.id as string };
    const a = await asPerson(sellerA);
    const dropPrice = async (id: string) => {
      const priced = await a.rpc("set_listing_price", {
        p_listing_id: id,
        p_price_mode: "fixed",
        p_price_amount: 90,
        p_price_currency: "ETB",
        p_price_period: "once",
      });
      expect(priced.error, `[e2e:mlp] pricing ${id}`).toBeNull();
    };
    const X1 = await seed(sellerA, "active", { title: "Red phone" });
    const X2 = await seed(sellerA, "active", { title: "RED PHONE case" });
    const reserved = await a.rpc("set_listing_reserved", { p_listing_id: X2, p_reserved: true });
    expect(reserved.error, "[e2e:mlp] reserving X2").toBeNull();
    const X3 = await seed(onSecond, "active", { title: "Blue chair" });
    await dropPrice(X3);
    const X4 = await seed(sellerA, "active", { title: "Old phone" });
    await dropPrice(X4);
    const sold = await adminClient().from("listings").update({ status: "sold" }).eq("id", X4);
    if (sold.error) throw new Error(`[e2e:mlp] selling X4 failed: ${sold.error.message}`);
    const sellerB = await scratchSeller();
    const B1 = await seed(sellerB, "active", { title: "Red phone" });
    const b = await asPerson(sellerB);

    const zero: Counts = { live: 0, review: 0, attention: 0, closed: 0, sold: 0, drafts: 0 };
    const ask = async (person: Person, args: Record<string, unknown>) => {
      const result = await person.rpc("my_listings", {
        p_group: "live",
        p_limit: 50,
        p_offset: 0,
        ...args,
      });
      expect(result.error, `[e2e:mlp] my_listings ${JSON.stringify(args)}`).toBeNull();
      const answer = result.data as Answer & { renewAllowed: unknown; renewDays: unknown };
      expect(ids(answer), "[e2e:mlp] B1 is seller B's").not.toContain(person === a ? B1 : X1);
      return answer;
    };
    const sorted = (list: string[]) => [...list].sort();

    const red = await ask(a, { p_search: "red phone" });
    expect(sorted(ids(red))).toEqual(sorted([X1, X2]));
    expect(red.counts).toEqual({ ...zero, live: 2 });

    const spaced = await ask(a, { p_search: "  PHONE " });
    expect(sorted(ids(spaced))).toEqual(sorted([X1, X2]));
    expect(spaced.counts).toEqual({ ...zero, live: 2, sold: 1 });

    const first = await ask(a, { p_category: sellerA.parentId });
    expect(sorted(ids(first))).toEqual(sorted([X1, X2]));
    expect(first.counts.live).toBe(2);
    expect(first.counts.sold).toBe(1);
    const other = await ask(a, { p_category: second.parent.id as string });
    expect(ids(other)).toEqual([X3]);
    expect(other.counts.live).toBe(1);
    expect(other.counts.sold).toBe(0);

    expect(ids(await ask(a, { p_mark: "reserved" }))).toEqual([X2]);
    expect(ids(await ask(a, { p_mark: "reduced" }))).toEqual([X3]);
    const soldReduced = await ask(a, { p_group: "sold", p_mark: "reduced" });
    expect(ids(soldReduced)).toEqual([]);
    expect(soldReduced.counts.sold).toBe(0);

    const together = await ask(a, {
      p_search: "phone",
      p_category: sellerA.parentId,
      p_mark: "reserved",
    });
    expect(ids(together)).toEqual([X2]);

    for (const group of ["live", "review", "attention", "closed", "sold", "drafts"]) {
      expect(ids(await ask(a, { p_group: group })), `[e2e:mlp] A's ${group}`).not.toContain(B1);
    }
    const bRed = await ask(b, { p_search: "red phone" });
    expect(ids(bRed)).toEqual([B1]);
    expect(bRed.counts.live).toBe(1);

    const one = await a.rpc("my_listing", { p_listing_id: X1 });
    expect(one.error, "[e2e:mlp] my_listing X1").toBeNull();
    const ad = one.data as Row;
    expect(red.renewAllowed).toBe(ad["renewAllowed"]);
    expect(red.renewDays).toBe(ad["renewDays"]);

    const long = await a.rpc("my_listings", {
      p_group: "live",
      p_limit: 50,
      p_offset: 0,
      p_search: "a".repeat(101),
    });
    expect(long.error).toBe("bad search");
    const gone = await a.rpc("my_listings", {
      p_group: "live",
      p_limit: 50,
      p_offset: 0,
      p_mark: "gone",
    });
    expect(gone.error).toBe("unknown mark");
  });

  test("MLP-6 My listings on the table blocks: the header, the search, Filters with chips, Columns and each row's actions (D181)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const k = token();
    const X = await seed(seller, "active", { title: `${k} Red phone` });
    const Y = await seed(seller, "active", { title: `${k} Blue chair` });
    const D = await seed(seller, "draft");
    const width = page.viewportSize()?.width ?? 0;
    const yGone = async () => {
      await expect(page.getByTestId(`my-listing-${Y}`)).toHaveCount(0, { timeout: 15000 });
      await expect(page.getByTestId(`my-listing-${Y}-card`)).toHaveCount(0);
    };

    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, "/my-listings");
    const header = page.getByTestId("my-listings-header");
    await expect(header.getByRole("heading", { level: 1 })).toHaveText(en["nav.myListings"], {
      timeout: 15000,
    });
    const post = page.getByTestId("my-listings-post");
    await expect(post).toBeVisible();
    await post.click();
    await expect(page).toHaveURL(/\/post(?:[?#].*)?$/, { timeout: 15000 });
    await gotoReady(page, "/my-listings");
    await expect(twin(page, X)).toBeVisible({ timeout: 15000 });

    const order = await page
      .getByTestId("my-listings-toolbar")
      .locator(
        '[data-testid="my-listings-search"], [data-testid="my-listings-filters"], [data-testid="my-listings-columns"]',
      )
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-testid")));
    expect(order).toEqual(["my-listings-search", "my-listings-filters", "my-listings-columns"]);
    await expectNoHorizontalOverflow(page);

    const search = page.getByTestId("my-listings-search");
    await search.click();
    await page.keyboard.type(`${k} red`);
    await expect(twin(page, X)).toBeVisible({ timeout: 15000 });
    await yGone();
    await expect(page.getByTestId("my-listings-group-live")).toHaveText(
      `${en["myListings.group.live"]} (1)`,
      { timeout: 15000 },
    );
    await search.click();
    await page.keyboard.press("Control+A");
    await page.keyboard.press("Backspace");
    await expect(twin(page, Y)).toBeVisible({ timeout: 15000 });
    await expect(twin(page, X)).toBeVisible();
    await expect(page.getByTestId("my-listings-group-live")).toHaveText(
      `${en["myListings.group.live"]} (2)`,
      { timeout: 15000 },
    );

    const xBox = box(page, X);
    await expect(xBox.getByTestId(`my-listing-${X}-delete`)).toBeVisible();
    const xEdit = xBox.getByTestId(`my-listing-${X}-edit`);
    await expect(xEdit).toBeVisible();
    await xEdit.click();
    await expect(page).toHaveURL(new RegExp(`/my-listings/${X}\\?edit=1$`), { timeout: 15000 });
    await expect(page.getByTestId("my-listing-edit-heading")).toBeVisible({ timeout: 15000 });
    await gotoReady(page, "/my-listings");
    await expect(twin(page, X)).toBeVisible({ timeout: 15000 });
    await box(page, X).getByTestId(`my-listing-${X}-more`).click();
    const menuItems = await page
      .getByTestId(`my-listing-${X}-menu`)
      .locator(`[data-testid^="my-listing-${X}-more-"]`)
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-testid")));
    expect(menuItems).toEqual([
      `my-listing-${X}-more-open`,
      `my-listing-${X}-more-reserve`,
      `my-listing-${X}-more-sell`,
      `my-listing-${X}-more-close`,
      `my-listing-${X}-more-copy`,
    ]);
    await page.getByTestId(`my-listing-${X}-more-reserve`).click();
    await expect(page.getByTestId("my-listings-notice")).toHaveText(en["myListings.done.reserve"], {
      timeout: 15000,
    });
    await expect(twin(page, X).getByTestId(`my-listing-${X}-reserved`)).toBeVisible({
      timeout: 15000,
    });
    expect((await listingTruth(X))["reserved_at"], "[e2e:mlp] X reserved").not.toBeNull();

    await page.getByTestId("my-listings-filters").click();
    await page
      .getByTestId("my-listings-filters-panel")
      .getByTestId("my-listings-filter-mark-reserved")
      .click();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("my-listings-chips-chip-mark")).toContainText(
      en["myListings.reserved"],
      { timeout: 15000 },
    );
    await expect(twin(page, X)).toBeVisible({ timeout: 15000 });
    await yGone();
    await page.getByTestId("my-listings-chips-clear").click();
    await expect(twin(page, Y)).toBeVisible({ timeout: 15000 });

    if (width >= 1280) {
      await page.getByTestId("my-listings-columns").click();
      await expect(page.getByTestId("my-listings-columns-title")).toBeDisabled();
      await page.getByTestId("my-listings-columns-price").click();
      await page.keyboard.press("Escape");
      await expect(page.getByTestId("data-table-col-price")).toHaveCount(0);
      await gotoReady(page, "/my-listings");
      await expect(twin(page, X)).toBeVisible({ timeout: 15000 });
      await expect(page.getByTestId("data-table-col-price")).toHaveCount(0);
      await page.getByTestId("my-listings-columns").click();
      await page.getByTestId("my-listings-columns-price").click();
      await page.keyboard.press("Escape");
      await expect(page.getByTestId("data-table-col-price")).toHaveCount(1);
    }

    if (width < 768) {
      await expect(
        box(page, X).getByTestId(`my-listing-${X}-lead`).getByTestId(`my-listing-${X}-picture`),
      ).toHaveCount(1);
    }

    await page.getByTestId("my-listings-group-drafts").click();
    const dBox = box(page, D);
    await expect(dBox.getByTestId(`my-listing-${D}-edit`)).toBeVisible({ timeout: 15000 });
    await expect(dBox.getByTestId(`my-listing-${D}-delete`)).toBeVisible();
    await expect(dBox.getByTestId(`my-listing-${D}-more`)).toHaveCount(0);
    await dBox.getByTestId(`my-listing-${D}-edit`).click();
    await expect(page).toHaveURL(new RegExp(`/post/${D}(?:[?#].*)?$`), { timeout: 15000 });

    await gotoReady(page, "/my-listings");
    await box(page, Y).getByTestId(`my-listing-${Y}-delete`).click({ timeout: 15000 });
    await expect(page.getByTestId("my-listings-confirm")).toContainText(
      en["myListings.confirm.deleteTitle"],
      { timeout: 15000 },
    );
    await page.getByTestId("my-listings-confirm-yes").click();
    await expect(page.getByTestId("my-listings-notice")).toHaveText(en["myListings.done.delete"], {
      timeout: 15000,
    });
    await yGone();
    expect((await listingTruth(Y))["deleted_at"], "[e2e:mlp] Y deleted").not.toBeNull();
  });

  test("MLP-7 several ads at once from tablet width up; a phone acts one ad at a time (D182 2)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const X = await seed(seller, "active");
    const Y = await seed(seller, "active");
    const S = await seed(seller, "sold");
    const width = page.viewportSize()?.width ?? 0;
    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, "/my-listings");
    await expect(twin(page, X)).toBeVisible({ timeout: 15000 });

    if (width < 768) {
      const select = box(page, X).getByTestId(`my-listing-${X}-select`);
      await expect(select).toHaveCount(1);
      await expect(select).toBeHidden();
      await expect(page.getByTestId("data-table-selection")).toHaveCount(0);
      return;
    }

    const tick = async (id: string) => {
      await page
        .getByTestId(width >= 1280 ? `my-listing-${id}-select-cell` : `my-listing-${id}-select`)
        .click();
    };
    await tick(X);
    await tick(Y);
    const bar = page.getByTestId("data-table-selection");
    await expect(bar.getByTestId("my-listings-bulk-sell")).toHaveText(
      en["myListings.action.sell"],
      {
        timeout: 15000,
      },
    );
    await expect(bar.getByTestId("my-listings-bulk-close")).toBeVisible();
    await expect(bar.getByTestId("my-listings-bulk-delete")).toBeVisible();
    await expect(bar.getByTestId("my-listings-bulk-renew")).toHaveCount(0);

    await bar.getByTestId("my-listings-bulk-close").click();
    const confirm = page.getByTestId("my-listings-confirm");
    await expect(confirm).toContainText(en["myListings.bulk.title"].replace("{count}", "2"), {
      timeout: 15000,
    });
    await expect(confirm).toContainText(en["myListings.bulk.closeBody"]);
    await page.getByTestId("my-listings-confirm-yes").click();
    const done = en["myListings.bulk.done"].replace("{count}", "2");
    await expect(page.getByTestId("my-listings-notice")).toHaveText(done, { timeout: 15000 });
    expect((await listingTruth(X))["status"], "[e2e:mlp] X closed").toBe("closed");
    expect((await listingTruth(Y))["status"], "[e2e:mlp] Y closed").toBe("closed");
    await expect(page.getByTestId("my-listings-group-closed")).toHaveText(
      `${en["myListings.group.closed"]} (2)`,
      { timeout: 15000 },
    );

    await page.getByTestId("my-listings-group-closed").click();
    await expect(twin(page, X)).toBeVisible({ timeout: 15000 });
    await tick(X);
    await tick(Y);
    await page.getByTestId("data-table-selection").getByTestId("my-listings-bulk-delete").click();
    await page.getByTestId("my-listings-confirm-yes").click();
    await expect(page.getByTestId("my-listings-notice")).toHaveText(done, { timeout: 15000 });
    expect((await listingTruth(X))["deleted_at"], "[e2e:mlp] X deleted").not.toBeNull();
    expect((await listingTruth(Y))["deleted_at"], "[e2e:mlp] Y deleted").not.toBeNull();
    const s = await listingTruth(S);
    expect(s["status"], "[e2e:mlp] S still sold").toBe("sold");
    expect(s["deleted_at"], "[e2e:mlp] S not deleted").toBeNull();
  });
});
