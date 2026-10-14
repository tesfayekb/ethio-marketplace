import { type Page } from "@playwright/test";

import { expect, test } from "./fixtures";
import { destroyLocation, seedScratchChain } from "./helpers/locations";
import {
  destroyCategoryBranch,
  destroyListingsOf,
  leaseSeller,
  RUN,
  seedCategoryBranch,
} from "./helpers/posting";
import { passwordGrant } from "./helpers/session";
import { useJobSuperAdmin } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * Bundle 16 (My listings), turn 1 — THE SELLER'S DOORS (ML-1..ML-10).
 *
 * Proves, as signed-in people call them, the doors the My listings page needs:
 * close and reopen with the days kept (D174), Reserved on a live ad (D173), sold
 * with its contact closed and the seller's choice kept, relist of a sold ad only
 * (D175), the price at once with the "Price reduced" record (D173, D174, D177),
 * an edit's review giving back the ad's time and an expired ad renewed before it
 * is edited, renewal live at once under the admin's setting (D174, D175, D176),
 * the expiry sweep through the state machine for full and reduced reach
 * (INC-470, INC-626), the seller's history and the renew setting. D178 (photo
 * labels) has no door in this turn.
 *
 * Every person but the super admin calls the doors from node (DEC-029). Every
 * listing, place, category and role is a scratch row of this file, removed in
 * afterEach (J3, G27); every row is found by its own id (G28); DB truth through
 * the service client. No test writes the global listing_policy row.
 */

type RpcClient = {
  rpc: (
    fn: string,
    args?: Record<string, unknown>,
  ) => Promise<{ data: unknown; error: { message: string } | null }>;
};

type Row = Record<string, unknown>;

async function clientReady(page: Page) {
  await page.waitForFunction(
    () => Boolean((window as unknown as { __ethioSupabase?: unknown }).__ethioSupabase),
    undefined,
    { timeout: 15000 },
  );
}

/** A door called as the page's signed-in person: its data and its error. */
async function rpcResult(page: Page, fn: string, args: Record<string, unknown>) {
  await clientReady(page);
  return page.evaluate(
    async ([name, payload]) => {
      const client = (window as unknown as { __ethioSupabase: RpcClient }).__ethioSupabase;
      const result = await client.rpc(name as string, payload as Record<string, unknown>);
      return { data: result.data, error: result.error?.message ?? null };
    },
    [fn, args] as const,
  );
}

function restBase(): { url: string; key: string } {
  const url = process.env["E2E_SUPABASE_URL"];
  const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    throw new Error("[e2e:ml] E2E_SUPABASE_URL and E2E_SUPABASE_PUBLISHABLE_KEY must be set.");
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
    rest: async (path: string, init: { method?: string; body?: unknown } = {}) =>
      answerOf(
        await fetch(`${url}/rest/v1/${path}`, {
          method: init.method ?? "GET",
          headers,
          ...(init.body === undefined ? {} : { body: JSON.stringify(init.body) }),
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
const days = (n: number) => new Date(Date.now() + n * DAY).toISOString();
const ms = (value: unknown) => new Date(String(value)).getTime();

/** "About now": within 60 seconds of the test's clock. */
function expectAboutNow(value: unknown, label: string) {
  expect(value, label).not.toBeNull();
  expect(Math.abs(ms(value) - Date.now()), label).toBeLessThanOrEqual(60_000);
}

/** "Its days kept": not earlier than the seeded end, not later than it by more than 2 minutes. */
function expectDaysKept(value: unknown, seeded: unknown, label: string) {
  const delta = ms(value) - ms(seeded);
  expect(delta, label).toBeGreaterThanOrEqual(0);
  expect(delta, label).toBeLessThanOrEqual(120_000);
}

async function revisionRows(listingId: string, kind: string) {
  const { data, error } = await adminClient()
    .from("listing_revisions")
    .select("kind,actor,before,after")
    .eq("listing_id", listingId)
    .eq("kind", kind)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`[e2e:ml] revisions read failed: ${error.message}`);
  return (data ?? []) as Row[];
}

async function revisionCount(listingId: string) {
  const { count, error } = await adminClient()
    .from("listing_revisions")
    .select("id", { count: "exact", head: true })
    .eq("listing_id", listingId);
  if (error) throw new Error(`[e2e:ml] revision count failed: ${error.message}`);
  return count ?? 0;
}

const TRUTH =
  "status,title,expires_at,published_at,published_first_at,renewed_at,renewed_count,reserved_at,sold_at," +
  "clock_kept,kept_remaining,resume_status,price_amount,price_was,price_drop_at,contact_pref";

async function listingTruth(listingId: string) {
  const { data, error } = await adminClient()
    .from("listings")
    .select(TRUTH)
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:ml] listing read failed: ${error.message}`);
  if (!data) throw new Error(`[e2e:ml] listing ${listingId} not found`);
  return data as unknown as Row;
}

/** What "nothing written" compares: the named columns and the revision count. */
async function snapshot(listingId: string) {
  const row = await listingTruth(listingId);
  return {
    status: row["status"],
    expires_at: row["expires_at"],
    reserved_at: row["reserved_at"],
    price_amount: row["price_amount"],
    price_was: row["price_was"],
    revisions: await revisionCount(listingId),
  };
}

test.describe("MY LISTINGS — the seller's doors (bundle 16 turn 1)", () => {
  const sellers: string[] = [];
  const listingIds: string[] = [];
  const regions: string[] = [];
  const branches: string[][] = [];
  const roles: string[] = [];

  test.afterEach(async () => {
    const supabase = adminClient();
    for (const id of listingIds.splice(0)) {
      const removed = await supabase.from("listings").delete().eq("id", id);
      if (removed.error) throw new Error(`[e2e:ml] listing reap failed: ${removed.error.message}`);
    }
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const slug of regions.splice(0)) await destroyLocation(slug);
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
    for (const roleId of roles.splice(0)) {
      const a = await supabase.from("role_permissions").delete().eq("role_id", roleId);
      if (a.error) throw new Error(`[e2e:ml] role_permissions reap failed: ${a.error.message}`);
      const b = await supabase.from("user_roles").delete().eq("role_id", roleId);
      if (b.error) throw new Error(`[e2e:ml] user_roles reap failed: ${b.error.message}`);
      const c = await supabase.from("roles").delete().eq("id", roleId);
      if (c.error) throw new Error(`[e2e:ml] roles reap failed: ${c.error.message}`);
    }
  });

  /** A scratch seller with a public name and its own category branch and place. */
  async function scratchSeller() {
    const seller = await leaseSeller({ alias: true, named: true });
    sellers.push(seller.id);
    const { parent, leaf } = await seedCategoryBranch();
    branches.push([parent.slug as string, leaf.slug as string]);
    const chain = await seedScratchChain("ET");
    regions.push(chain.region.slug as string);
    const { data: profile, error } = await adminClient()
      .from("profiles")
      .select("seller_alias")
      .eq("user_id", seller.id)
      .single();
    if (error || !profile) throw new Error(`[e2e:ml] reading the alias failed: ${error?.message}`);
    return {
      ...seller,
      alias: profile.seller_alias as string,
      parentId: parent.id as string,
      leafId: leaf.id as string,
      leafSlug: leaf.slug as string,
      cityId: chain.city.id as string,
    };
  }

  type Seller = Awaited<ReturnType<typeof scratchSeller>>;

  /**
   * A complete scratch listing. Unless told otherwise: active, published and first
   * published 20 days ago, 100 ETB fixed once set 20 days ago, ending in 10 days,
   * contact { messages: true }. Times are days from now.
   */
  async function seed(
    seller: Pick<Seller, "id" | "leafId" | "cityId">,
    status = "active",
    options: {
      expiresAt?: number | null;
      publishedAt?: number;
      publishedFirstAt?: number;
      priceSetAt?: number;
      priceAmount?: number;
      contactPref?: Row;
      tier?: string;
    } = {},
  ) {
    const live = ["active", "reduced", "expired", "sold", "removed", "closed"].includes(status);
    const published = options.publishedAt ?? -20;
    const { data, error } = await adminClient()
      .from("listings")
      .insert({
        category_id: seller.leafId,
        seller_id: seller.id,
        location_id: seller.cityId,
        home_country_code: "ET",
        title: `E2E my listing ${RUN.replace(/[0-9]/g, "x")} ${token()}`,
        description: "e2e scratch listing for the seller's doors",
        attributes: {},
        price_mode: "fixed",
        price_amount: options.priceAmount ?? 100,
        price_currency: "ETB",
        price_period: "once",
        price_set_at: days(options.priceSetAt ?? -20),
        contact_pref: options.contactPref ?? { messages: true },
        status,
        tier: options.tier ?? "regular",
        published_at: live ? days(published) : null,
        published_first_at: live ? days(options.publishedFirstAt ?? published) : null,
        expires_at: options.expiresAt === null ? null : live ? days(options.expiresAt ?? 10) : null,
      })
      .select(`id,${TRUTH}`)
      .single();
    if (error || !data) throw new Error(`[e2e:ml] seeding failed: ${error?.message ?? "no row"}`);
    const row = data as unknown as Row;
    listingIds.push(row["id"] as string);
    const located = await adminClient()
      .from("listing_locations")
      .insert({ listing_id: row["id"], location_id: seller.cityId, position: 1 });
    if (located.error) throw new Error(`[e2e:ml] coverage failed: ${located.error.message}`);
    return row as Row & { id: string; title: string };
  }

  /** Gives an account the test already holds exactly the named permissions through a scratch role. */
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
    if (roleError || !role) throw new Error(`[e2e:ml] scratch role failed: ${roleError?.message}`);
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
      `[e2e:ml] expected exactly ${wanted.map((pair) => pair.join(":")).join(", ")}`,
    ).toHaveLength(wanted.length);
    const granted = await supabase
      .from("role_permissions")
      .insert(picked.map((p) => ({ role_id: role.id, permission_id: p.id })));
    if (granted.error) throw new Error(`[e2e:ml] grant failed: ${granted.error.message}`);
    const assigned = await supabase
      .from("user_roles")
      .insert({ user_id: person.id, role_id: role.id, scope_type: "global" });
    if (assigned.error) throw new Error(`[e2e:ml] assignment failed: ${assigned.error.message}`);
    return person;
  }

  /** A pooled account holding exactly the named permissions through a scratch role. */
  async function scratchHolder(wanted: Array<[resource: string, action: string]>) {
    return grantRole(wanted, await leaseUser());
  }

  type Person = Awaited<ReturnType<typeof asPerson>>;

  const close = (person: Person, id: string) =>
    person.rpc("transition_listing", { p_listing_id: id, p_new_status: "closed" });
  const reopen = (person: Person, id: string, to = "active") =>
    person.rpc("transition_listing", { p_listing_id: id, p_new_status: to });
  const reserve = (person: Person, id: string, on: boolean) =>
    person.rpc("set_listing_reserved", { p_listing_id: id, p_reserved: on });
  const price = (person: Person, id: string, amount: number) =>
    person.rpc("set_listing_price", {
      p_listing_id: id,
      p_price_mode: "fixed",
      p_price_amount: amount,
      p_price_currency: "ETB",
      p_price_period: "once",
    });

  /** The seller's edit with every field as the ad stands but a new letters-only title. */
  const editTitle = (person: Person, seller: Seller, id: string) =>
    person.rpc("edit_listing", {
      p_listing_id: id,
      p_category_id: seller.leafId,
      p_title: `E2E edited listing ${token()}`,
      p_description: "e2e scratch listing for the seller's doors",
      p_video_url: null,
      p_attributes: {},
      p_price_mode: "fixed",
      p_price_amount: 100,
      p_price_currency: "ETB",
      p_price_period: "once",
      p_poster_expires_at: null,
      p_coverage: [seller.cityId],
      p_contact_pref: { messages: true },
    });

  async function policyTruth() {
    const { data, error } = await adminClient()
      .from("listing_policy")
      .select("renew_allowed,renew_days,updated_at,updated_by")
      .single();
    if (error || !data) throw new Error(`[e2e:ml] policy read failed: ${error?.message}`);
    return data as unknown as Row;
  }

  const listedIds = (data: unknown) => ((data as Row[] | null) ?? []).map((row) => row["id"]);

  test("ML-1 Close and reopen keep the days left; Reserved goes on close; a closed ad shows in Admin's Ended (D174)", async () => {
    const seller = await scratchSeller();
    const me = await asPerson(seller);
    const ad = await seed(seller);

    expect((await reserve(me, ad.id, true)).error).toBeNull();
    expect((await close(me, ad.id)).error).toBeNull();
    const closed = await listingTruth(ad.id);
    expect(closed).toMatchObject({
      status: "closed",
      clock_kept: true,
      resume_status: "active",
      reserved_at: null,
    });
    expect(closed["kept_remaining"]).not.toBeNull();

    expect((await reserve(me, ad.id, true)).error).toBe("only a live listing is reserved");
    expect((await reopen(me, ad.id, "reduced")).error).toBe(
      "illegal transition: closed -> reduced",
    );

    const viewer = await asPerson(await scratchHolder([["listings", "view"]]));
    const view = async (p_view: string) => {
      const answer = await viewer.rpc("admin_list_listings", {
        p_seller: seller.alias,
        p_view,
      });
      expect(answer.error, `admin_list_listings ${p_view}`).toBeNull();
      return answer.data as Row[];
    };
    const ended = await view("ended");
    expect(ended.find((row) => row["id"] === ad.id)?.["status"]).toBe("closed");
    expect(listedIds(await view("all"))).toContain(ad.id);
    expect(listedIds(await view("live"))).not.toContain(ad.id);

    expect((await reopen(me, ad.id)).error).toBeNull();
    const back = await listingTruth(ad.id);
    expect(back).toMatchObject({
      status: "active",
      clock_kept: false,
      resume_status: null,
      kept_remaining: null,
    });
    expectDaysKept(back["expires_at"], ad["expires_at"], "ML-1 days kept");
    expect(ms(back["published_at"])).toBe(ms(ad["published_at"]));
    expect(ms(back["published_first_at"])).toBe(ms(ad["published_first_at"]));
    expect(listedIds(await view("live"))).toContain(ad.id);
    expect(listedIds(await view("ended"))).not.toContain(ad.id);

    const states = await revisionRows(ad.id, "state");
    expect(states.map((row) => [row["before"], row["after"]])).toEqual([
      [{ reserved: false }, { reserved: true }],
      [{ status: "active" }, { status: "closed" }],
      [{ status: "closed" }, { status: "active" }],
    ]);

    const open = await seed(seller, "active", { expiresAt: null });
    expect((await close(me, open.id)).error).toBeNull();
    expect((await reopen(me, open.id)).error).toBeNull();
    expect((await listingTruth(open.id))["expires_at"]).toBeNull();
  });

  test("ML-2 Nobody else moves a seller's ad, and a refused call writes nothing", async () => {
    const sellerA = await scratchSeller();
    const sellerB = await scratchSeller();
    const a = await asPerson(sellerA);
    const b = await asPerson(sellerB);
    const x = await seed(sellerA);
    const y = await seed(sellerA, "screening");
    const yBefore = await snapshot(y.id);

    expect((await close(b, x.id)).error).toBe("not your listing");
    expect((await reserve(b, x.id, true)).error).toBe("not your listing");
    expect((await price(b, x.id, 90)).error).toBe("not your listing");
    expect((await b.rpc("listing_history", { p_listing_id: x.id })).error).toBe("not your listing");
    expect((await b.rpc("listing_history", { p_listing_id: crypto.randomUUID() })).error).toBe(
      "not your listing",
    );

    expect((await close(a, y.id)).error).toBe("illegal transition: screening -> closed");
    expect((await price(a, y.id, 90)).error).toBe(
      "the price of this listing is changed through its edit",
    );
    expect((await reserve(a, y.id, true)).error).toBe("only a live listing is reserved");

    expect((await close(a, x.id)).error).toBeNull();
    const kept = (await listingTruth(x.id))["kept_remaining"];
    // Seller B, refused above as a stranger, now holds listings:view and listings:review (DEC-174).
    await grantRole(
      [
        ["listings", "view"],
        ["listings", "review"],
      ],
      sellerB,
    );
    expect((await reopen(b, x.id)).error).toBe("owner only: closed -> active");
    const service = await adminClient().rpc("transition_listing", {
      p_listing_id: x.id,
      p_new_status: "active",
    });
    expect(service.error?.message ?? null).toBe("owner only: closed -> active");

    expect(await listingTruth(x.id)).toMatchObject({
      status: "closed",
      kept_remaining: kept,
      reserved_at: null,
      price_amount: 100,
    });
    expect(await revisionRows(x.id, "state")).toHaveLength(1);
    expect(await revisionRows(x.id, "edit")).toEqual([]);
    expect(await snapshot(y.id)).toEqual(yBefore);
  });

  test("ML-3 Reserved on and off, on a live ad only (D173)", async () => {
    const seller = await scratchSeller();
    const me = await asPerson(seller);
    const ad = await seed(seller);

    const on = await reserve(me, ad.id, true);
    expect(on.error).toBeNull();
    expect(on.data).toEqual({ ok: true, reserved: true });
    const marked = await listingTruth(ad.id);
    expectAboutNow(marked["reserved_at"], "ML-3 reserved_at");
    expect(marked["status"]).toBe("active");
    expect(ms(marked["expires_at"])).toBe(ms(ad["expires_at"]));
    let states = await revisionRows(ad.id, "state");
    expect(states.map((row) => [row["before"], row["after"]])).toEqual([
      [{ reserved: false }, { reserved: true }],
    ]);

    const again = await reserve(me, ad.id, true);
    expect(again.data).toEqual({ ok: true, reserved: true });
    expect(ms((await listingTruth(ad.id))["reserved_at"])).toBe(ms(marked["reserved_at"]));
    expect(await revisionRows(ad.id, "state")).toHaveLength(1);

    const off = await reserve(me, ad.id, false);
    expect(off.data).toEqual({ ok: true, reserved: false });
    expect((await listingTruth(ad.id))["reserved_at"]).toBeNull();
    states = await revisionRows(ad.id, "state");
    expect(states.map((row) => [row["before"], row["after"]])).toEqual([
      [{ reserved: false }, { reserved: true }],
      [{ reserved: true }, { reserved: false }],
    ]);

    const review = await seed(seller, "screening");
    const before = await snapshot(review.id);
    expect((await reserve(me, review.id, true)).error).toBe("only a live listing is reserved");
    expect(await snapshot(review.id)).toEqual(before);
  });

  test("ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175)", async () => {
    const seller = await scratchSeller();
    const me = await asPerson(seller);
    const contact = { messages: true, phone: { show: true } };
    const p = await seed(seller, "active", { contactPref: contact });
    const buyer = await asPerson(await leaseUser());

    const reached = await buyer.rpc("reveal_listing_contact", { p_listing_id: p.id });
    expect(reached.error).toBeNull();
    expect((reached.data as Row)["ok"]).toBe(true);

    const sold = await me.rpc("mark_sold", { p_listing_id: p.id });
    expect(sold.error).toBeNull();
    expect(sold.data).toEqual({ ok: true, status: "sold" });
    const soldRow = await listingTruth(p.id);
    expect(soldRow["status"]).toBe("sold");
    expectAboutNow(soldRow["sold_at"], "ML-4 sold_at");
    expect(soldRow["contact_pref"]).toEqual(contact);
    expect(ms(soldRow["expires_at"])).toBe(ms(p["expires_at"]));

    expect((await buyer.rpc("reveal_listing_contact", { p_listing_id: p.id })).error).toBe(
      "listingNotAvailable",
    );

    const q = await seed(seller);
    expect((await close(me, q.id)).error).toBeNull();
    const soldQ = await me.rpc("mark_sold", { p_listing_id: q.id });
    expect(soldQ.data).toEqual({ ok: true, status: "sold" });
    const qRow = await listingTruth(q.id);
    expect(qRow).toMatchObject({
      status: "sold",
      clock_kept: false,
      kept_remaining: null,
      resume_status: null,
    });
    expect(qRow["sold_at"]).not.toBeNull();

    const live = await seed(seller);
    expect((await me.rpc("relist_listing", { p_listing_id: live.id })).error).toBe(
      "illegal transition: active -> screening",
    );
    const expired = await seed(seller, "expired", { expiresAt: -10, publishedAt: -40 });
    expect((await me.rpc("relist_listing", { p_listing_id: expired.id })).error).toBe(
      "illegal transition: expired -> screening",
    );

    const relisted = await me.rpc("relist_listing", { p_listing_id: p.id });
    expect(relisted.error).toBeNull();
    expect(relisted.data).toEqual({ ok: true, status: "screening" });
    expect(await listingTruth(p.id)).toMatchObject({ status: "screening", sold_at: null });
  });

  test("ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177)", async () => {
    const seller = await scratchSeller();
    const me = await asPerson(seller);

    const a = await seed(seller, "active", { priceAmount: 1000 });
    const first = await price(me, a.id, 900);
    expect(first.error).toBeNull();
    const firstData = first.data as Row;
    expect(firstData).toMatchObject({ ok: true, status: "active", price_was: 1000 });
    expectAboutNow(firstData["price_drop_at"], "ML-5 price_drop_at");
    const aRow = await listingTruth(a.id);
    expect(aRow).toMatchObject({ price_amount: 900, price_was: 1000, status: "active" });
    expect(ms(aRow["expires_at"])).toBe(ms(a["expires_at"]));
    const edits = await revisionRows(a.id, "edit");
    expect(edits).toHaveLength(1);
    expect(edits[0]?.["before"]).toMatchObject({ price_amount: 1000, price_was: null });
    expect(edits[0]?.["after"]).toMatchObject({ price_amount: 900, price_was: 1000 });

    expect((await price(me, a.id, 850)).error).toBeNull();
    const further = await listingTruth(a.id);
    expect(further["price_was"]).toBe(1000);
    expect(ms(further["price_drop_at"])).toBe(ms(aRow["price_drop_at"]));
    expect((await price(me, a.id, 1200)).error).toBeNull();
    expect(await listingTruth(a.id)).toMatchObject({ price_was: null, price_drop_at: null });

    const b = await seed(seller, "active", {
      publishedAt: -2,
      publishedFirstAt: -2,
      priceSetAt: -2,
      priceAmount: 500,
    });
    const young = await price(me, b.id, 400);
    expect(young.error).toBeNull();
    expect(young.data).toMatchObject({ ok: true, price_was: null });

    const c = await seed(seller, "active", { priceAmount: 1000 });
    const small = await price(me, c.id, 980);
    expect(small.error).toBeNull();
    expect(small.data).toMatchObject({ ok: true, price_was: null });

    const bBefore = await snapshot(b.id);
    const zero = await price(me, b.id, 0);
    expect(zero.error).toBeNull();
    const zeroData = zero.data as Row;
    expect(zeroData["ok"]).toBe(false);
    expect(
      ((zeroData["refusals"] as Row[] | undefined) ?? []).map((refusal) => refusal["field"]),
    ).toContain("price_amount");
    expect(await snapshot(b.id)).toEqual(bBefore);
    expect(bBefore.price_amount).toBe(400);

    expect((await close(me, c.id)).error).toBeNull();
    const closedPrice = await price(me, c.id, 900);
    expect(closedPrice.error).toBeNull();
    expect(closedPrice.data).toMatchObject({ ok: true, status: "closed" });
    expect(await listingTruth(c.id)).toMatchObject({
      status: "closed",
      price_amount: 900,
      price_was: null,
    });
  });

  test("ML-6 An edit's review gives back the days the ad had; an expired ad is renewed before it is edited (D174)", async () => {
    const seller = await scratchSeller();
    const me = await asPerson(seller);
    const service = adminClient();

    const e = await seed(seller);
    const edited = await editTitle(me, seller, e.id);
    expect(edited.error).toBeNull();
    expect(edited.data).toEqual({ ok: true, status: "screening" });
    expect(await listingTruth(e.id)).toMatchObject({ status: "screening", clock_kept: true });
    const moved = await service.rpc("transition_listing", {
      p_listing_id: e.id,
      p_new_status: "active",
    });
    expect(moved.error).toBeNull();
    const eRow = await listingTruth(e.id);
    expect(eRow).toMatchObject({ status: "active", clock_kept: false });
    expectDaysKept(eRow["expires_at"], e["expires_at"], "ML-6 E days kept");
    expect(ms(eRow["published_at"])).toBe(ms(e["published_at"]));
    expect(ms(eRow["published_first_at"])).toBe(ms(e["published_first_at"]));

    const f = await seed(seller);
    expect((await close(me, f.id)).error).toBeNull();
    const fEdited = await editTitle(me, seller, f.id);
    expect(fEdited.data).toEqual({ ok: true, status: "screening" });
    const fMoved = await service.rpc("transition_listing", {
      p_listing_id: f.id,
      p_new_status: "active",
    });
    expect(fMoved.error).toBeNull();
    const fRow = await listingTruth(f.id);
    expect(fRow["status"]).toBe("active");
    expectDaysKept(fRow["expires_at"], f["expires_at"], "ML-6 F days kept");

    const g = await seed(seller, "expired", { expiresAt: -10, publishedAt: -40 });
    const gBefore = await snapshot(g.id);
    expect((await editTitle(me, seller, g.id)).error).toBe(
      "an expired listing is renewed before it is edited",
    );
    expect(await snapshot(g.id)).toEqual(gBefore);
  });

  test("ML-7 Renew takes an expired ad only, live at once for the admin's days, with a fresh posting date and the first kept (D174, D175, D176)", async () => {
    const policy = await policyTruth();
    if (policy["renew_allowed"] !== true) {
      throw new Error("staging's renew setting is off — this test never writes it");
    }
    const n = Number(policy["renew_days"]);
    const seller = await scratchSeller();
    const me = await asPerson(seller);
    const needsExpired = {
      ok: false,
      refusals: [{ field: "status", reason: "renewNeedsExpired" }],
    };

    const live = await seed(seller);
    const liveBefore = await snapshot(live.id);
    const refused = await me.rpc("renew_listing", { p_listing_id: live.id });
    expect(refused.error).toBeNull();
    expect(refused.data).toEqual(needsExpired);
    expect(await snapshot(live.id)).toEqual(liveBefore);

    const x = await seed(seller, "expired", { expiresAt: -10, publishedAt: -40 });
    const renewed = await me.rpc("renew_listing", { p_listing_id: x.id });
    expect(renewed.error).toBeNull();
    expect(renewed.data).toEqual({ ok: true, status: "active", renewed_count: 1 });
    const row = await listingTruth(x.id);
    expect(row["status"]).toBe("active");
    expect(Math.abs(ms(row["expires_at"]) - (Date.now() + n * DAY))).toBeLessThanOrEqual(60_000);
    expectAboutNow(row["published_at"], "ML-7 published_at");
    expectAboutNow(row["renewed_at"], "ML-7 renewed_at");
    expect(ms(row["published_first_at"])).toBe(ms(x["published_first_at"]));
    expect(row["renewed_count"]).toBe(1);

    const twice = await me.rpc("renew_listing", { p_listing_id: x.id });
    expect(twice.data).toEqual(needsExpired);
  });

  test("ML-8 The expiry sweep expires full and reduced reach through the state machine, with the system's revision (INC-470, INC-626)", async () => {
    const seller = await scratchSeller();
    const me = await asPerson(seller);
    const minuteAgo = -1 / 1440;
    const m = await seed(seller, "active", { publishedAt: -31, expiresAt: minuteAgo });
    const r = await seed(seller, "reduced", { publishedAt: -31, expiresAt: minuteAgo });

    const swept = await adminClient().rpc("expire_stale_listings");
    expect(swept.error).toBeNull();

    expect(await listingTruth(m.id)).toMatchObject({ status: "expired", resume_status: "active" });
    expect(await listingTruth(r.id)).toMatchObject({
      status: "expired",
      resume_status: "reduced",
    });
    for (const [id, from] of [
      [m.id, "active"],
      [r.id, "reduced"],
    ] as const) {
      const states = await revisionRows(id, "state");
      expect(states).toContainEqual(
        expect.objectContaining({
          actor: null,
          before: { status: from },
          after: { status: "expired" },
        }),
      );
    }

    const history = await me.rpc("listing_history", { p_listing_id: m.id });
    expect(history.error).toBeNull();
    expect(history.data as Row[]).toContainEqual(
      expect.objectContaining({ by: "system", kind: "state", from: "active", to: "expired" }),
    );

    const renewDays = Number((await policyTruth())["renew_days"]);
    const renewed = await me.rpc("renew_listing", { p_listing_id: r.id });
    expect(renewed.data).toMatchObject({ ok: true, status: "reduced" });
    const row = await listingTruth(r.id);
    expect(row["status"]).toBe("reduced");
    expect(Math.abs(ms(row["expires_at"]) - (Date.now() + renewDays * DAY))).toBeLessThanOrEqual(
      60_000,
    );
  });

  test("ML-9 The seller's history: each change, by you, staff or the system, never a name", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const me = await asPerson(seller);
    const h = await seed(seller);

    expect((await close(me, h.id)).error).toBeNull();
    expect((await reopen(me, h.id)).error).toBeNull();
    expect((await reserve(me, h.id, true)).error).toBeNull();
    expect((await price(me, h.id, 95)).error).toBeNull();

    const { user } = await useJobSuperAdmin(page);
    const note = "The title named the wrong item.";
    const staffEdit = await rpcResult(page, "admin_edit_listing", {
      p_listing_id: h.id,
      p_changes: { title: `Corrected listing ${token()}` },
      p_reason: "misleading",
      p_note: note,
    });
    expect(staffEdit.error).toBeNull();

    const answer = await me.rpc("listing_history", { p_listing_id: h.id });
    expect(answer.error).toBeNull();
    const entries = answer.data as Row[];
    expect(Array.isArray(entries)).toBe(true);
    for (const entry of entries) {
      expect(Object.keys(entry).sort()).toEqual(
        ["at", "by", "fields", "from", "kind", "note", "reason", "to"].sort(),
      );
    }
    expect(entries).toHaveLength(5);
    expect(entries[0]).toMatchObject({
      by: "staff",
      kind: "edit",
      fields: ["title"],
      reason: "misleading",
      note,
    });
    expect(entries[1]).toMatchObject({ by: "you", kind: "edit" });
    expect(entries[1]?.["fields"]).toContain("price_amount");
    expect(entries[2]).toMatchObject({
      by: "you",
      kind: "state",
      fields: ["reserved"],
      from: null,
      to: null,
    });
    expect(entries[3]).toMatchObject({ by: "you", from: "closed", to: "active", fields: [] });
    expect(entries[4]).toMatchObject({ by: "you", from: "active", to: "closed", fields: [] });

    const text = JSON.stringify(entries);
    for (const secret of [user.id, user.email, seller.id, seller.email]) {
      expect(text.includes(String(secret)), "ML-9 the history names nobody").toBe(false);
    }
  });

  test("ML-10 The renew setting: signed-in users read its two values; only listings:enforce with a fresh second factor may change it (D175)", async ({
    page,
  }) => {
    const before = await policyTruth();
    const seller = await scratchSeller();
    const me = await asPerson(seller);

    const read = await me.rest("listing_policy?select=renew_allowed,renew_days");
    expect(read.error).toBeNull();
    expect(read.data).toEqual([
      { renew_allowed: before["renew_allowed"], renew_days: before["renew_days"] },
    ]);
    const hidden = await me.rest("listing_policy?select=updated_by");
    expect(hidden.error).not.toBeNull();
    expect(hidden.data).toBeNull();
    const patched = await me.rest("listing_policy?id=eq.true", {
      method: "PATCH",
      body: { renew_days: 31 },
    });
    expect(patched.error).not.toBeNull();

    const { url, key } = restBase();
    const anonymous = await answerOf(
      await fetch(`${url}/rest/v1/listing_policy?select=renew_allowed,renew_days`, {
        headers: { apikey: key },
      }),
    );
    expect(anonymous.error).not.toBeNull();
    expect(anonymous.data).toBeNull();

    const set = (person: Person, allowed: boolean | null, n: number) =>
      person.rpc("admin_set_listing_policy", { p_renew_allowed: allowed, p_renew_days: n });
    expect((await set(me, true, 30)).error).toBe("permission denied");
    // The same seller, now holding listings:view and listings:review (DEC-174).
    await grantRole(
      [
        ["listings", "view"],
        ["listings", "review"],
      ],
      seller,
    );
    expect((await set(me, true, 30)).error).toBe("permission denied");
    const enforcer = await asPerson(await scratchHolder([["listings", "enforce"]]));
    expect((await set(enforcer, true, 30)).error).toBe("step-up required: no verified factor");

    await useJobSuperAdmin(page);
    for (const [allowed, n] of [
      [true, 0],
      [true, 366],
      [null, 30],
    ] as const) {
      const refused = await rpcResult(page, "admin_set_listing_policy", {
        p_renew_allowed: allowed,
        p_renew_days: n,
      });
      expect(refused.error, `admin_set_listing_policy(${allowed}, ${n})`).toBe(
        "renew days are 1 to 365",
      );
    }

    const after = await policyTruth();
    expect(after["updated_at"]).toBe(before["updated_at"]);
    expect(after["updated_by"]).toBe(before["updated_by"]);
  });
});
