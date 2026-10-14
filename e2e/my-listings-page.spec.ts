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
import { expectActivePanel, gotoReady, isMobile, openPanel, signInViaSession } from "./helpers/ui";
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

const TRUTH = "status,title,expires_at,reserved_at,price_amount,price_was";

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
      cityId: chain.city.id as string,
    };
  }

  type Seller = Awaited<ReturnType<typeof scratchSeller>>;

  /**
   * A complete scratch listing: published and first published 20 days ago, 100 ETB
   * fixed once set 20 days ago, ending in 10 days minus one hour unless told otherwise.
   */
  async function seed(seller: Seller, status: string, options: { expiresInMs?: number } = {}) {
    const live = ["active", "reduced", "expired", "sold", "removed", "closed"].includes(status);
    const { data, error } = await adminClient()
      .from("listings")
      .insert({
        category_id: seller.leafId,
        seller_id: seller.id,
        location_id: seller.cityId,
        home_country_code: "ET",
        title: `E2E my listings page ${RUN.replace(/[0-9]/g, "x")} ${token()}`,
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
    await expect(page.getByText(en["shell.placeholderTitle"])).toHaveCount(0);

    const item = page.getByTestId(
      isMobile(page) ? "strip-item-ml-listings" : "rail-item-ml-listings",
    );
    await expect(item).toHaveAttribute("href", /\/my-listings$/);

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
});
