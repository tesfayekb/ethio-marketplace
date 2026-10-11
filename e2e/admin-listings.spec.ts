import { type Page } from "@playwright/test";

import { en } from "../src/i18n/locales/en";

import { expect, test } from "./fixtures";
import { destroyLocation, seedScratchChain } from "./helpers/locations";
import {
  destroyCategoryBranch,
  destroyListingsOf,
  destroySpecSet,
  leaseSeller,
  RUN,
  seedCategoryBranch,
  seedSpecSet,
} from "./helpers/posting";
import { passwordGrant } from "./helpers/session";
import {
  expectNoHorizontalOverflow,
  gotoReady,
  signInViaSession,
  useJobSuperAdmin,
} from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * Bundle 11, the Listings console, turn L1 (D134, D136, D137) — THE CONSOLE'S DOORS (AL-1..AL-9).
 *
 * The doors are proven as signed-in people call them (law F3: the server is the
 * authority): admin_list_listings (listings:view; drafts never), admin_edit_listing
 * and admin_move_listing (listings:enforce with a fresh second factor), the state
 * door's Restore (REQ-022 as amended by D137) and the seller's notices (the seller
 * reads only their own). Every listing, place, category and role is a scratch row of
 * this file, removed in afterEach (J3, G27); every row is found by its own id or its
 * own seller (G28); DB truth through the service client.
 *
 * Turn L1b (the fast lane's AL-3, 2026-10-11): each test signs ONE person into the
 * browser — the super admin, whose fresh second factor the doors require. Every
 * other person calls the door from node with a password grant and the same REST
 * request the browser client sends (DEC-029: sign-in is not this file's subject).
 * AL-3 signed four people into the browser, ran past its 60 s budget, and its
 * afterEach reaped the rows the abandoned body was still using.
 */

type RpcClient = {
  rpc: (
    fn: string,
    args?: Record<string, unknown>,
  ) => Promise<{ data: unknown; error: { message: string } | null }>;
};

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
    throw new Error("[e2e:al] E2E_SUPABASE_URL and E2E_SUPABASE_PUBLISHABLE_KEY must be set.");
  }
  return { url: url.replace(/\/+$/, ""), key };
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
  const answer = async (response: Response) => {
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
  };
  return {
    rpc: async (fn: string, args: Record<string, unknown>) =>
      answer(
        await fetch(`${url}/rest/v1/rpc/${fn}`, {
          method: "POST",
          headers,
          body: JSON.stringify(args),
        }),
      ),
    notices: async (listingId: string) =>
      answer(
        await fetch(`${url}/rest/v1/seller_notices?select=kind,reason&listing_id=eq.${listingId}`, {
          headers,
        }),
      ),
    insertNotice: async (row: Record<string, unknown>) =>
      answer(
        await fetch(`${url}/rest/v1/seller_notices`, {
          method: "POST",
          headers,
          body: JSON.stringify(row),
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

type Row = Record<string, unknown>;

async function auditRows(listingId: string) {
  const { data, error } = await adminClient()
    .from("audit_log")
    .select("actor_id,action,meta")
    .eq("entity_type", "listing")
    .eq("entity_id", listingId)
    .like("action", "listing.admin_%");
  if (error) throw new Error(`[e2e:al] audit read failed: ${error.message}`);
  return (data ?? []) as Row[];
}

async function noticeRows(listingId: string) {
  const { data, error } = await adminClient()
    .from("seller_notices")
    .select("seller_id,kind,fields,reason,note")
    .eq("listing_id", listingId);
  if (error) throw new Error(`[e2e:al] notices read failed: ${error.message}`);
  return (data ?? []) as Row[];
}

async function revisionRows(listingId: string, kind: string) {
  const { data, error } = await adminClient()
    .from("listing_revisions")
    .select("kind,actor,before,after")
    .eq("listing_id", listingId)
    .eq("kind", kind)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`[e2e:al] revisions read failed: ${error.message}`);
  return (data ?? []) as Row[];
}

async function listingTruth(listingId: string) {
  const { data, error } = await adminClient()
    .from("listings")
    .select("status,title,cover_photo_id,published_at")
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:al] listing read failed: ${error.message}`);
  return data as Row | null;
}

test.describe("ADMIN LISTINGS — the console's doors", () => {
  const sellers: string[] = [];
  const listingIds: string[] = [];
  const regions: string[] = [];
  const branches: string[][] = [];
  const roles: string[] = [];
  /** Turn L4b — scratch specification sets (attribute keys), reaped before their branch. */
  const specSets: string[][] = [];

  test.afterEach(async () => {
    const supabase = adminClient();
    for (const id of listingIds.splice(0)) {
      const removed = await supabase.from("listings").delete().eq("id", id);
      if (removed.error) throw new Error(`[e2e:al] listing reap failed: ${removed.error.message}`);
    }
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const keys of specSets.splice(0)) await destroySpecSet(keys);
    for (const slug of regions.splice(0)) await destroyLocation(slug);
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
    for (const roleId of roles.splice(0)) {
      const a = await supabase.from("role_permissions").delete().eq("role_id", roleId);
      if (a.error) throw new Error(`[e2e:al] role_permissions reap failed: ${a.error.message}`);
      const b = await supabase.from("user_roles").delete().eq("role_id", roleId);
      if (b.error) throw new Error(`[e2e:al] user_roles reap failed: ${b.error.message}`);
      const c = await supabase.from("roles").delete().eq("id", roleId);
      if (c.error) throw new Error(`[e2e:al] roles reap failed: ${c.error.message}`);
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
    if (error || !profile) throw new Error(`[e2e:al] reading the alias failed: ${error?.message}`);
    return {
      ...seller,
      alias: profile.seller_alias as string,
      parentId: parent.id as string,
      leafId: leaf.id as string,
      cityId: chain.city.id as string,
    };
  }

  type Seller = Awaited<ReturnType<typeof scratchSeller>>;

  /** A complete scratch listing in the given state (the shape the seller's doors accept). */
  async function seed(
    seller: Pick<Seller, "id" | "leafId" | "cityId">,
    status: string,
    options: {
      publishedAt?: string;
      tier?: string;
      screening?: Row;
      own?: boolean;
      /** Turn L4b — the listing's specifications (empty unless given). */
      attributes?: Row;
    } = {},
  ) {
    const live = ["active", "reduced", "expired", "sold", "removed"].includes(status);
    const { data, error } = await adminClient()
      .from("listings")
      .insert({
        category_id: seller.leafId,
        seller_id: seller.id,
        location_id: seller.cityId,
        home_country_code: "ET",
        title: `E2E admin listing ${RUN.replace(/[0-9]/g, "x")} ${token()}`,
        description: "e2e scratch listing for the admin console",
        attributes: options.attributes ?? {},
        price_mode: "fixed",
        price_amount: 100,
        price_currency: "ETB",
        price_period: "once",
        contact_pref: { messages: true },
        status,
        tier: options.tier ?? "regular",
        published_at: live ? (options.publishedAt ?? new Date().toISOString()) : null,
        published_first_at: live ? (options.publishedAt ?? new Date().toISOString()) : null,
        ...(options.screening === undefined ? {} : { screening: options.screening }),
      })
      .select("id,title")
      .single();
    if (error || !data) throw new Error(`[e2e:al] seeding failed: ${error?.message ?? "no row"}`);
    const located = await adminClient()
      .from("listing_locations")
      .insert({ listing_id: data.id, location_id: seller.cityId, position: 1 });
    if (located.error) throw new Error(`[e2e:al] coverage failed: ${located.error.message}`);
    if (options.own === true) listingIds.push(data.id as string);
    return { id: data.id as string, title: data.title as string };
  }

  /** A pooled account holding exactly the named permissions through a scratch role. */
  async function scratchHolder(wanted: Array<[resource: string, action: string]>) {
    const supabase = adminClient();
    const roleName = `e2e_listings_role_${token()}`;
    const { data: role, error: roleError } = await supabase
      .from("roles")
      .insert({ name: roleName, display_name: roleName, priority: 1 })
      .select("id")
      .single();
    if (roleError || !role) throw new Error(`[e2e:al] scratch role failed: ${roleError?.message}`);
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
      `[e2e:al] expected exactly ${wanted.map((pair) => pair.join(":")).join(", ")}`,
    ).toHaveLength(wanted.length);
    const granted = await supabase
      .from("role_permissions")
      .insert(picked.map((p) => ({ role_id: role.id, permission_id: p.id })));
    if (granted.error) throw new Error(`[e2e:al] grant failed: ${granted.error.message}`);
    const holder = await leaseUser();
    const assigned = await supabase
      .from("user_roles")
      .insert({ user_id: holder.id, role_id: role.id, scope_type: "global" });
    if (assigned.error) throw new Error(`[e2e:al] assignment failed: ${assigned.error.message}`);
    return holder;
  }

  const list = (page: Page, args: Record<string, unknown>) =>
    rpcResult(page, "admin_list_listings", args);

  test("AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const live = await seed(seller, "active");
    const draft = await seed(seller, "draft");
    // INC-555 — the account with no listing right is AL-3's (one leased account fewer here).

    const viewer = await asPerson(await scratchHolder([["listings", "view"]]));
    const byId = await viewer.rpc("admin_list_listings", { p_search: live.id });
    expect(byId.error).toBeNull();
    const rows = byId.data as Row[];
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      id: live.id,
      title: live.title,
      status: "active",
      seller_alias: seller.alias,
      seller_email: null,
      country_code: "ET",
      total_count: 1,
    });
    expect((await viewer.rpc("admin_list_listings", { p_search: draft.id })).data).toEqual([]);
    const bySeller = (await viewer.rpc("admin_list_listings", { p_seller: seller.alias }))
      .data as Row[];
    expect(bySeller.map((row) => row.id)).toEqual([live.id]);
    // An e-mail is not a key for someone who may not read it.
    expect((await viewer.rpc("admin_list_listings", { p_seller: seller.email })).data).toEqual([]);

    await useJobSuperAdmin(page);
    const full = (await list(page, { p_search: live.id })).data as Row[];
    expect(full[0]?.["seller_email"]).toBe(seller.email);
    const byEmail = (await list(page, { p_seller: seller.email })).data as Row[];
    expect(byEmail.map((row) => row.id)).toEqual([live.id]);
  });

  test("AL-2 All listings: the views, the filters and newest first", async ({ page }) => {
    const seller = await scratchSeller();
    const hour = 3_600_000;
    const older = await seed(seller, "active", {
      publishedAt: new Date(Date.now() - 3 * hour).toISOString(),
    });
    const newer = await seed(seller, "active", {
      publishedAt: new Date(Date.now() - hour).toISOString(),
      tier: "featured",
    });
    const waiting = await seed(seller, "screening");
    const sold = await seed(seller, "sold");
    const removed = await seed(seller, "removed");
    await seed(seller, "draft");

    await useJobSuperAdmin(page);
    const ids = async (args: Record<string, unknown>) => {
      const result = await list(page, { p_seller: seller.alias, ...args });
      expect(result.error).toBeNull();
      return (result.data as Row[]).map((row) => row.id);
    };
    expect(await ids({ p_view: "live" })).toEqual([newer.id, older.id]);
    expect(await ids({ p_view: "waiting" })).toEqual([waiting.id]);
    expect(await ids({ p_view: "ended" })).toEqual([sold.id]);
    expect(await ids({ p_view: "removed" })).toEqual([removed.id]);
    expect(await ids({ p_view: "all" })).toHaveLength(5);
    expect(await ids({ p_category: seller.parentId })).toHaveLength(5);
    expect(await ids({ p_country: "ET" })).toHaveLength(5);
    expect(await ids({ p_country: "KE" })).toEqual([]);
    expect(await ids({ p_tier: "featured" })).toEqual([newer.id]);
    const tomorrow = new Date(Date.now() + 24 * hour).toISOString().slice(0, 10);
    expect(await ids({ p_from: tomorrow })).toEqual([]);
    const page1 = await list(page, { p_seller: seller.alias, p_limit: 2, p_offset: 0 });
    expect((page1.data as Row[]).map((row) => row.total_count)).toEqual([5, 5]);
    expect((await list(page, { p_view: "bogus" })).error).toBe("unknown view");
  });

  /**
   * Turn L2 (the fast lane on cf7187ab): AL-3 was split in two. With four
   * pooled accounts, a scratch seller and the super admin's session in one
   * test it ran past its 60 s budget on the phone project under the matrix's
   * load (its afterEach then reaped the rows the abandoned body still used).
   * AL-3 keeps the people who may not edit; AL-12 the super admin's refusals.
   * Every assertion is kept (G38).
   *
   * Turn L4b (INC-555, CI on dfd6555a): AL-3 still leased three accounts one
   * after another besides the scratch seller, and ran past 60 s on shard 6 and
   * in the fast lane (63–66 s already on 88c6ed8c); AL-1 and AL-16 (three
   * leased accounts each) ran 56–59 s. Each refused person now has a test of
   * their own — AL-3 an account with no listing right (All listings and the
   * listing's page refuse it too: the plain account AL-1 and AL-16 leased),
   * AL-24 a reviewer, AL-25 an enforcer without a second factor — at most two
   * leased accounts in any of these tests; every assertion is kept, and each
   * checks that nothing was written.
   */
  async function refusedEdit(
    holder: { email: string; password: string },
    expected: string,
    also?: (person: Awaited<ReturnType<typeof asPerson>>, listingId: string) => Promise<void>,
  ) {
    const seller = await scratchSeller();
    const target = await seed(seller, "active");
    const person = await asPerson(holder);
    if (also !== undefined) await also(person, target.id);
    const answer = await person.rpc("admin_edit_listing", {
      p_listing_id: target.id,
      p_changes: { title: "Changed by someone who may not" },
      p_reason: "misleading",
    });
    expect(answer.error).toBe(expected);
    expect(await auditRows(target.id)).toEqual([]);
    expect(await noticeRows(target.id)).toEqual([]);
    expect(await revisionRows(target.id, "edit")).toEqual([]);
    expect((await listingTruth(target.id))?.["title"]).toBe(target.title);
  }

  test("AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written", async () => {
    await refusedEdit(await leaseUser(), "permission denied", async (person, listingId) => {
      expect((await person.rpc("admin_list_listings", { p_search: listingId })).error).toBe(
        "permission denied",
      );
      expect((await person.rpc("admin_listing_detail", { p_listing_id: listingId })).error).toBe(
        "permission denied",
      );
    });
  });

  test("AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing", async () => {
    await refusedEdit(
      await scratchHolder([
        ["listings", "view"],
        ["listings", "review"],
      ]),
      "permission denied",
    );
  });

  test("AL-25 Edit refuses an enforcer without a second factor, and writes nothing", async () => {
    await refusedEdit(
      await scratchHolder([["listings", "enforce"]]),
      "step-up required: no verified factor",
    );
  });

  test("AL-12 Edit refuses as the super admin: the admin's own, a draft, a removed listing, a key not editable, a reason without its note", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const target = await seed(seller, "active");
    const draft = await seed(seller, "draft");
    const removed = await seed(seller, "removed");
    const edit = (id: string, changes: Row, reason = "misleading", note?: string) =>
      rpcResult(page, "admin_edit_listing", {
        p_listing_id: id,
        p_changes: changes,
        p_reason: reason,
        ...(note === undefined ? {} : { p_note: note }),
      });

    const { user } = await useJobSuperAdmin(page);
    const own = await seed({ ...seller, id: user.id }, "active", { own: true });
    expect((await edit(own.id, { title: "My own" })).error).toBe(
      "your own listing is edited the seller's way",
    );
    expect((await edit(draft.id, { title: "A draft" })).error).toBe("listing not found");
    expect((await edit(removed.id, { title: "Removed" })).error).toBe(
      "a removed listing is not edited",
    );
    expect((await edit(target.id, { seller_id: user.id })).error).toBe("not editable: seller_id");
    expect((await edit(target.id, { title: "Other" }, "other")).error).toBe("a note is required");

    for (const id of [target.id, draft.id, removed.id, own.id]) {
      expect(await auditRows(id)).toEqual([]);
      expect(await noticeRows(id)).toEqual([]);
      expect(await revisionRows(id, "edit")).toEqual([]);
    }
    expect((await listingTruth(target.id))?.["title"]).toBe(target.title);
  });

  test("AL-4 Edit: the change, one revision, one audit row and one notice; a live listing stays live", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const target = await seed(seller, "active");
    const { user } = await useJobSuperAdmin(page);
    const title = `Corrected listing ${token()}`;
    const result = await rpcResult(page, "admin_edit_listing", {
      p_listing_id: target.id,
      p_changes: { title },
      p_reason: "misleading",
      p_note: "The title named the wrong item.",
    });
    expect(result.error).toBeNull();
    expect(result.data).toEqual({ ok: true, status: "active", fields: ["title"] });

    expect(await listingTruth(target.id)).toMatchObject({ status: "active", title });
    const revisions = await revisionRows(target.id, "edit");
    expect(revisions).toHaveLength(1);
    expect(revisions[0]).toMatchObject({
      actor: user.id,
      before: { title: target.title },
      after: { title },
    });
    const audits = await auditRows(target.id);
    expect(audits).toHaveLength(1);
    expect(audits[0]).toMatchObject({
      actor_id: user.id,
      action: "listing.admin_edit",
      meta: { fields: ["title"], reason: "misleading", note: "The title named the wrong item." },
    });
    expect(await noticeRows(target.id)).toEqual([
      {
        seller_id: seller.id,
        kind: "admin_edit",
        fields: ["title"],
        reason: "misleading",
        note: "The title named the wrong item.",
      },
    ]);
    // The same values again change nothing and write nothing.
    const again = await rpcResult(page, "admin_edit_listing", {
      p_listing_id: target.id,
      p_changes: { title },
      p_reason: "misleading",
    });
    expect(again.error).toBe("nothing changed");
    expect(await revisionRows(target.id, "edit")).toHaveLength(1);
  });

  test("AL-5 Edit keeps the seller's rules: a refusal is the seller's refusal, and nothing is written", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const target = await seed(seller, "active");
    const title = "Call me on 0911 223 344";

    const asSeller = await (
      await asPerson(seller)
    ).rpc("edit_listing", {
      p_listing_id: target.id,
      p_category_id: seller.leafId,
      p_title: title,
      p_description: "e2e scratch listing for the admin console",
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
    expect(asSeller.error).toBeNull();
    const sellerRefusals = (asSeller.data as { ok: boolean; refusals: Row[] }).refusals;
    expect(sellerRefusals).toContainEqual({ field: "title", reason: "contactInText" });

    await useJobSuperAdmin(page);
    const asAdmin = await rpcResult(page, "admin_edit_listing", {
      p_listing_id: target.id,
      p_changes: { title },
      p_reason: "misleading",
    });
    expect(asAdmin.error).toBeNull();
    expect(asAdmin.data).toEqual({ ok: false, refusals: sellerRefusals });
    expect(await listingTruth(target.id)).toMatchObject({ status: "active", title: target.title });
    expect(await auditRows(target.id)).toEqual([]);
    expect(await noticeRows(target.id)).toEqual([]);
  });

  test("AL-6 Edit removes a photo: the row goes, the next becomes the cover, the revision keeps the file", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const target = await seed(seller, "active");
    const supabase = adminClient();
    const { data: photos, error } = await supabase
      .from("listing_photos")
      .insert([
        { listing_id: target.id, storage_path: `e2e-al/${token()}-a.webp`, display_order: 0 },
        { listing_id: target.id, storage_path: `e2e-al/${token()}-b.webp`, display_order: 1 },
      ])
      .select("id,storage_path,display_order");
    if (error || !photos || photos.length !== 2) {
      throw new Error(`[e2e:al] seeding photos failed: ${error?.message ?? "no rows"}`);
    }
    const [first, second] = [...photos].sort((a, b) => a.display_order - b.display_order) as Array<{
      id: string;
      storage_path: string;
    }>;
    const covered = await supabase
      .from("listings")
      .update({ cover_photo_id: first!.id })
      .eq("id", target.id);
    if (covered.error) throw new Error(`[e2e:al] cover failed: ${covered.error.message}`);

    await useJobSuperAdmin(page);
    const result = await rpcResult(page, "admin_edit_listing", {
      p_listing_id: target.id,
      p_changes: { remove_photos: [first!.id] },
      p_reason: "photo",
    });
    expect(result.error).toBeNull();
    expect(result.data).toEqual({ ok: true, status: "active", fields: ["photos"] });

    const { data: left } = await supabase
      .from("listing_photos")
      .select("id")
      .eq("listing_id", target.id);
    expect((left ?? []).map((row) => row.id)).toEqual([second!.id]);
    expect((await listingTruth(target.id))?.["cover_photo_id"]).toBe(second!.id);
    const revisions = await revisionRows(target.id, "edit");
    expect(revisions).toHaveLength(1);
    const kept = (revisions[0]?.["before"] as { photos_removed: Row[] }).photos_removed;
    expect(kept.map((row) => [row["id"], row["storage_path"]])).toEqual([
      [first!.id, first!.storage_path],
    ]);
    expect(
      await rpcResult(page, "admin_edit_listing", {
        p_listing_id: target.id,
        p_changes: { remove_photos: [first!.id] },
        p_reason: "photo",
      }),
    ).toMatchObject({ error: "photo not found on this listing" });
  });

  test("AL-7 Remove, then Restore: back to Waiting, never straight to live; each move logged and told", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const target = await seed(seller, "active");
    const { user } = await useJobSuperAdmin(page);
    const move = (to: string, reason: string) =>
      rpcResult(page, "admin_move_listing", {
        p_listing_id: target.id,
        p_to: to,
        p_reason: reason,
      });

    expect((await move("removed", "removed_in_error")).error).toBe("unknown reason");
    expect((await move("removed", "prohibited")).data).toEqual({
      ok: true,
      kind: "admin_remove",
      status: "removed",
    });
    expect((await listingTruth(target.id))?.["status"]).toBe("removed");
    expect((await move("removed", "rules")).error).toBe("illegal move: removed -> removed");
    expect((await move("screening", "removed_in_error")).data).toEqual({
      ok: true,
      kind: "admin_restore",
      status: "screening",
    });
    expect((await listingTruth(target.id))?.["status"]).toBe("screening");

    const states = await revisionRows(target.id, "state");
    expect(states.map((row) => [row["before"], row["after"], row["actor"]])).toEqual([
      [{ status: "active" }, { status: "removed" }, user.id],
      [{ status: "removed" }, { status: "screening" }, user.id],
    ]);
    const audits = await auditRows(target.id);
    expect(audits.map((row) => row["action"]).sort()).toEqual([
      "listing.admin_remove",
      "listing.admin_restore",
    ]);
    const notices = await noticeRows(target.id);
    expect(notices.map((row) => [row["kind"], row["reason"], row["fields"]]).sort()).toEqual([
      ["admin_remove", "prohibited", ["status"]],
      ["admin_restore", "removed_in_error", ["status"]],
    ]);
  });

  test("AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const plainRemoved = await seed(seller, "removed");
    const severe = await seed(seller, "removed", { screening: { severe: true } });
    const restore = (id: string) =>
      rpcResult(page, "admin_move_listing", {
        p_listing_id: id,
        p_to: "screening",
        p_reason: "appeal_accepted",
      });

    const owner = await asPerson(seller);
    expect(
      (
        await owner.rpc("transition_listing", {
          p_listing_id: plainRemoved.id,
          p_new_status: "screening",
        })
      ).error,
    ).toBe("enforcement only: removed -> screening");

    const enforcer = await asPerson(await scratchHolder([["listings", "enforce"]]));
    const restoreAs = (id: string) =>
      enforcer.rpc("admin_move_listing", {
        p_listing_id: id,
        p_to: "screening",
        p_reason: "appeal_accepted",
      });
    expect((await restoreAs(plainRemoved.id)).error).toBe("step-up required: no verified factor");
    expect((await restoreAs(severe.id)).error).toBe(
      "a listing removed for a severe reason is restored by a super admin only",
    );

    await useJobSuperAdmin(page);
    expect((await restore(severe.id)).data).toMatchObject({ ok: true, status: "screening" });
    expect((await listingTruth(severe.id))?.["status"]).toBe("screening");
    expect((await listingTruth(plainRemoved.id))?.["status"]).toBe("removed");
    expect(await auditRows(plainRemoved.id)).toEqual([]);
  });

  test("AL-9 Send back to review; the seller reads their own notices and no one else's", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const live = await seed(seller, "active");
    const sold = await seed(seller, "sold");

    await useJobSuperAdmin(page);
    const sendBack = (id: string) =>
      rpcResult(page, "admin_move_listing", {
        p_listing_id: id,
        p_to: "screening",
        p_reason: "wrong_category",
      });
    expect((await sendBack(live.id)).data).toEqual({
      ok: true,
      kind: "admin_send_back",
      status: "screening",
    });
    expect((await sendBack(sold.id)).error).toBe("illegal move: sold -> screening");

    const owner = await asPerson(seller);
    expect(await owner.notices(live.id)).toEqual({
      data: [{ kind: "admin_send_back", reason: "wrong_category" }],
      error: null,
    });
    const forged = await owner.insertNotice({
      seller_id: seller.id,
      listing_id: live.id,
      kind: "admin_edit",
      reason: "other",
      note: "forged",
    });
    expect(forged.error).not.toBeNull();

    const other = await asPerson(await leaseUser());
    expect(await other.notices(live.id)).toEqual({ data: [], error: null });
    expect(await noticeRows(live.id)).toHaveLength(1);
  });

  /**
   * Turn L2b — the page passes cardUntil="xl": below 1280 px each listing is a
   * card, from 1280 px a table row (L2 had lg, 1024 px). A listing's row at THIS
   * viewport.
   */
  const isCardTwin = (page: Page) => (page.viewportSize()?.width ?? 1280) < 1280;
  const listingRow = (page: Page, id: string) =>
    page.getByTestId(`listing-row-${id}${isCardTwin(page) ? "-card" : ""}`);

  /**
   * Bundle 11, turn L2 (D134, D136) — ADMIN › LISTINGS › ALL LISTINGS on the
   * agreed blocks (D118, D128, D132): the page's heading in the header; the views
   * above the toolbar, All first; the toolbar's order (search, Filters, Columns);
   * the seller filter inside Filters, shown as a chip; one row per listing (a card
   * below md), newest first, a draft never; the views narrow the list; the title
   * locked in Columns; the footer's range. The list is narrowed to this test's own
   * seller before any row is read (G28).
   */
  test("AL-10 All listings page: the blocks, the views, the seller filter, newest first, drafts never", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const hour = 3_600_000;
    const live = await seed(seller, "active", {
      publishedAt: new Date(Date.now() - hour).toISOString(),
    });
    const removed = await seed(seller, "removed", {
      publishedAt: new Date(Date.now() - 2 * hour).toISOString(),
    });
    const draft = await seed(seller, "draft");

    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/listings");
    await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("listings-header").getByRole("heading", { level: 1 })).toHaveText(
      en["admin.section.listings.title"],
    );
    await expect(page.getByTestId("listings-view-all")).toHaveAttribute("aria-pressed", "true");
    const toolbarOrder = await page.getByTestId("listings-toolbar").evaluate((node) =>
      Array.from(node.querySelectorAll("[data-testid]"))
        .map((child) => child.getAttribute("data-testid"))
        .filter((id) =>
          ["listings-search", "listings-filters", "listings-columns"].includes(id ?? ""),
        ),
    );
    expect(toolbarOrder, "AL-10 the toolbar's order").toEqual([
      "listings-search",
      "listings-filters",
      "listings-columns",
    ]);

    await page.getByTestId("listings-filters").click();
    const panel = page.getByTestId("listings-filters-panel");
    await panel.getByTestId("listings-filter-seller").fill(seller.alias);
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await expect(page.getByTestId("listings-chips-chip-seller")).toContainText(seller.alias);

    await expect(listingRow(page, live.id)).toBeVisible({ timeout: 20000 });
    await expect(listingRow(page, removed.id)).toBeVisible();
    await expect(page.getByTestId("listings-pagination-range")).toHaveText("1–2 of 2");
    for (const twin of ["", "-card"]) {
      await expect(page.getByTestId(`listing-row-${draft.id}${twin}`)).toHaveCount(0);
    }
    const suffix = isCardTwin(page) ? "-card" : "";
    const own = [`listing-row-${live.id}${suffix}`, `listing-row-${removed.id}${suffix}`];
    const order = await page.evaluate(
      (wanted: string[]) =>
        Array.from(document.querySelectorAll("[data-testid^='listing-row-']"))
          .map((node) => node.getAttribute("data-testid") ?? "")
          .filter((id) => wanted.includes(id)),
      own,
    );
    expect(order, "AL-10 newest first").toEqual(own);
    await expect(listingRow(page, live.id).getByTestId(`listing-row-${live.id}-status`)).toHaveText(
      en["admin.listings.status.active"],
    );
    // The super admin holds profiles:view: the seller's e-mail is on the row.
    await expect(listingRow(page, live.id)).toContainText(seller.email);

    await page.getByTestId("listings-view-live").click();
    await expect(listingRow(page, removed.id)).toHaveCount(0);
    await expect(listingRow(page, live.id)).toBeVisible();
    await page.getByTestId("listings-view-removed").click();
    await expect(listingRow(page, live.id)).toHaveCount(0);
    await expect(listingRow(page, removed.id)).toBeVisible();
    await expect(
      listingRow(page, removed.id).getByTestId(`listing-row-${removed.id}-status`),
    ).toHaveText(en["admin.listings.status.removed"]);
    await expect(page.getByTestId("listings-pagination-range")).toHaveText("1–1 of 1");

    await page.getByTestId("listings-columns").click();
    await expect(page.getByTestId("listings-columns-title")).toBeDisabled();
    await page.keyboard.press("Escape");
    await expectNoHorizontalOverflow(page);
  });

  /**
   * Turn L2 — the page read by someone who holds listings:view and nothing else:
   * the admin menu lets them in, the row names the seller by their public name,
   * and the e-mail is never on the page (the door decides — F3); the seller
   * filter's hint offers no e-mail.
   */
  test("AL-11 All listings page with listings:view and no other listing right: the public name, never the e-mail, no moves", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const live = await seed(seller, "active");
    // INC-550 — the admin shell opens only for admin_panel:access (as in
    // admin-screening.spec.ts); L2's AL-11 held listings:view alone and never
    // reached the page.
    const viewer = await scratchHolder([
      ["admin_panel", "access"],
      ["listings", "view"],
    ]);

    await signInViaSession(page, viewer.email, viewer.password);
    await gotoReady(page, "/admin/listings");
    await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
    await page.getByTestId("listings-search").fill(live.id);
    await expect(listingRow(page, live.id)).toBeVisible({ timeout: 20000 });
    await expect(listingRow(page, live.id)).toContainText(seller.alias);
    await expect(listingRow(page, live.id)).not.toContainText(seller.email);
    await expect(page.getByTestId("admin-section-listings")).not.toContainText(seller.email);
    // Turn L2b — no move without listings:enforce, and no View as seller without
    // impersonation:use: no tick-boxes, and (turn L3) the row's three-dots holds
    // Open alone.
    await expect(page.getByTestId("data-table-select-all")).toHaveCount(0);
    await page
      .getByTestId(
        isCardTwin(page) ? `listing-row-${live.id}-actions` : `listing-row-${live.id}-actions-cell`,
      )
      .getByTestId(`listing-actions-${live.id}-more`)
      .click();
    await expect(page.getByTestId(`listing-actions-${live.id}-more-open`)).toBeVisible();
    for (const item of ["send_back", "remove", "restore", "view_as"]) {
      await expect(page.getByTestId(`listing-actions-${live.id}-more-${item}`)).toHaveCount(0);
    }
    await page.keyboard.press("Escape");
    for (const tick of ["select", "select-cell"]) {
      await expect(page.getByTestId(`listing-row-${live.id}-${tick}`)).toHaveCount(0);
    }

    await page.getByTestId("listings-filters").click();
    await expect(
      page.getByTestId("listings-filters-panel").getByTestId("listings-filter-seller"),
    ).toHaveAttribute("placeholder", en["admin.listings.filter.sellerPlaceholder"]);
    await page.keyboard.press("Escape");
    await expectNoHorizontalOverflow(page);
  });

  /** Turn L2b — a row's three-dots item, in whichever twin the width draws. */
  async function rowMenu(page: Page, id: string, item: "remove" | "restore" | "send_back") {
    const actions = page.getByTestId(
      isCardTwin(page) ? `listing-row-${id}-actions` : `listing-row-${id}-actions-cell`,
    );
    await actions.getByTestId(`listing-actions-${id}-more`).click();
    await page.getByTestId(`listing-actions-${id}-more-${item}`).click();
  }

  /** Turn L2b — a row's tick-box, in whichever twin the width draws. */
  const tickOf = (page: Page, id: string) =>
    page.getByTestId(
      isCardTwin(page) ? `listing-row-${id}-select` : `listing-row-${id}-select-cell`,
    );

  /** Turn L2b — the move dialog: a reason, a note when given, the move; the dialog closes. */
  async function confirmMove(page: Page, reason: string, note?: string) {
    const dialog = page.getByTestId("listings-move-dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByTestId(`listings-move-reason-${reason}`).click();
    if (note !== undefined) await dialog.getByTestId("listings-move-note").fill(note);
    await dialog.getByTestId("listings-move-confirm").click();
    await expect(dialog).toHaveCount(0, { timeout: 20000 });
  }

  const moveAudits = async (listingId: string, action: string) =>
    (await auditRows(listingId)).filter((row) => row["action"] === action);

  /**
   * Bundle 11, turn L2b (D136 4, D137) — Remove then Restore from the row's
   * three-dots, as the super admin: the dialog sends nothing without a reason;
   * Remove takes the listing to Removed, Restore to Waiting for review (never
   * straight to live); each move one audit row and one notice to the seller.
   */
  test("AL-13 Remove then Restore from the row: a reason first, then Removed, then Waiting for review", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const live = await seed(seller, "active");

    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/listings");
    await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
    await page.getByTestId("listings-search").fill(live.id);
    await expect(listingRow(page, live.id)).toBeVisible({ timeout: 20000 });

    await rowMenu(page, live.id, "remove");
    const dialog = page.getByTestId("listings-move-dialog");
    await dialog.getByTestId("listings-move-confirm").click();
    await expect(dialog.getByTestId("listings-move-problem")).toHaveText(
      en["admin.listings.move.pickReason"],
    );
    await confirmMove(page, "misleading");
    await expect(page.getByTestId("listings-notice")).toHaveText(
      en["admin.listings.move.done.remove"].replace("{count}", "1"),
    );
    await expect(listingRow(page, live.id).getByTestId(`listing-row-${live.id}-status`)).toHaveText(
      en["admin.listings.status.removed"],
      { timeout: 20000 },
    );
    expect((await listingTruth(live.id))?.["status"]).toBe("removed");
    expect(await moveAudits(live.id, "listing.admin_remove")).toHaveLength(1);
    expect((await moveAudits(live.id, "listing.admin_remove"))[0]?.["meta"]).toMatchObject({
      from: "active",
      to: "removed",
      reason: "misleading",
    });

    await rowMenu(page, live.id, "restore");
    await confirmMove(page, "removed_in_error");
    await expect(listingRow(page, live.id).getByTestId(`listing-row-${live.id}-status`)).toHaveText(
      en["admin.listings.status.screening"],
      { timeout: 20000 },
    );
    expect((await listingTruth(live.id))?.["status"]).toBe("screening");
    expect(await moveAudits(live.id, "listing.admin_restore")).toHaveLength(1);
    expect((await noticeRows(live.id)).map((row) => [row["kind"], row["reason"]])).toEqual(
      expect.arrayContaining([
        ["admin_remove", "misleading"],
        ["admin_restore", "removed_in_error"],
      ]),
    );
    await expectNoHorizontalOverflow(page);
  });

  /**
   * Turn L2b — Send back to review with the reason Other: the dialog asks for
   * the note, and the note reaches the audit row and the seller's notice.
   */
  test("AL-14 Send back to review: Other needs a note, and the note reaches the audit and the seller", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const live = await seed(seller, "active");
    const note = "The price is per day, not per month.";

    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/listings");
    await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
    await page.getByTestId("listings-search").fill(live.id);
    await expect(listingRow(page, live.id)).toBeVisible({ timeout: 20000 });

    await rowMenu(page, live.id, "send_back");
    const dialog = page.getByTestId("listings-move-dialog");
    await dialog.getByTestId("listings-move-reason-other").click();
    await dialog.getByTestId("listings-move-confirm").click();
    await expect(dialog.getByTestId("listings-move-problem")).toHaveText(
      en["admin.listings.move.noteRequired"],
    );
    await dialog.getByTestId("listings-move-note").fill(note);
    await dialog.getByTestId("listings-move-confirm").click();
    await expect(dialog).toHaveCount(0, { timeout: 20000 });
    await expect(page.getByTestId("listings-notice")).toHaveText(
      en["admin.listings.move.done.send_back"],
    );
    expect((await listingTruth(live.id))?.["status"]).toBe("screening");
    const audits = await moveAudits(live.id, "listing.admin_send_back");
    expect(audits).toHaveLength(1);
    expect(audits[0]?.["meta"]).toMatchObject({ reason: "other", note });
    expect(await noticeRows(live.id)).toEqual([
      expect.objectContaining({ kind: "admin_send_back", reason: "other", note }),
    ]);
  });

  /**
   * Turn L2b (D136 4) — tick-boxes: two ticked listings removed with one
   * dialog, the door called once for each (two audit rows); then, in the
   * Removed view, both ticked and restored to Waiting for review.
   */
  test("AL-15 Tick-boxes: Remove two listings at once, then Restore both from the Removed view", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const first = await seed(seller, "active");
    const second = await seed(seller, "active");

    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/listings");
    await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
    await page.getByTestId("listings-filters").click();
    await page
      .getByTestId("listings-filters-panel")
      .getByTestId("listings-filter-seller")
      .fill(seller.alias);
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("listings-pagination-range")).toHaveText("1–2 of 2", {
      timeout: 20000,
    });

    for (const listing of [first, second]) await tickOf(page, listing.id).click();
    await expect(page.getByTestId("listings-bulk-restore")).toHaveCount(0);
    await page.getByTestId("listings-bulk-remove").click();
    await expect(page.getByTestId("listings-move-dialog")).toContainText(
      en["admin.listings.move.remove.titleMany"].replace("{count}", "2"),
    );
    await confirmMove(page, "duplicate");
    await expect(page.getByTestId("listings-notice")).toHaveText(
      en["admin.listings.move.done.remove"].replace("{count}", "2"),
    );
    for (const listing of [first, second]) {
      expect((await listingTruth(listing.id))?.["status"]).toBe("removed");
      expect(await moveAudits(listing.id, "listing.admin_remove")).toHaveLength(1);
    }

    await page.getByTestId("listings-view-removed").click();
    await expect(page.getByTestId("listings-pagination-range")).toHaveText("1–2 of 2", {
      timeout: 20000,
    });
    for (const listing of [first, second]) await tickOf(page, listing.id).click();
    await expect(page.getByTestId("listings-bulk-remove")).toHaveCount(0);
    await page.getByTestId("listings-bulk-restore").click();
    await confirmMove(page, "appeal_accepted");
    await expect(page.getByTestId("listings-notice")).toHaveText(
      en["admin.listings.move.done.restore"].replace("{count}", "2"),
    );
    for (const listing of [first, second]) {
      expect((await listingTruth(listing.id))?.["status"]).toBe("screening");
      expect(await moveAudits(listing.id, "listing.admin_restore")).toHaveLength(1);
    }
    await expect(page.getByTestId("listings-empty")).toBeVisible({ timeout: 20000 });
  });

  /**
   * Bundle 11, turn L3 (D138, D139) — the listing page's door,
   * `admin_listing_detail`: listings:view reads a listing, never a draft; the
   * seller's e-mail only for profiles:view and a staff member's name in the
   * history only for audit_logs:view; a history value is shown for the content,
   * price, status and dates, while a pin and an address are named, never shown;
   * an admin's reason travels with the revision it explains.
   */
  test("AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const live = await seed(seller, "active");
    const draft = await seed(seller, "draft");
    // A seller's edit that touched the pin and the address: a scratch revision of this listing.
    const revision = await adminClient()
      .from("listing_revisions")
      .insert({
        listing_id: live.id,
        seller_id: seller.id,
        kind: "edit",
        actor: seller.id,
        before: { title: "Before the edit", pin_lat: 8.9, street_address: "Old street one" },
        after: { title: live.title, pin_lat: 9.01, street_address: "New street two" },
      });
    if (revision.error) throw new Error(`[e2e:al] revision seed failed: ${revision.error.message}`);

    // INC-555 — the account with no listing right is AL-3's (one leased account fewer here).
    const viewer = await asPerson(await scratchHolder([["listings", "view"]]));
    expect((await viewer.rpc("admin_listing_detail", { p_listing_id: draft.id })).error).toBe(
      "listing not found",
    );
    const seen = await viewer.rpc("admin_listing_detail", { p_listing_id: live.id });
    expect(seen.error).toBeNull();
    const body = seen.data as Row;
    expect(body["listing"]).toMatchObject({
      id: live.id,
      title: live.title,
      status: "active",
      country_code: "ET",
    });
    expect(body["seller"]).toMatchObject({ id: seller.id, alias: seller.alias, email: null });
    expect(body["channels"]).toEqual({
      phone: false,
      phone2: false,
      telegram: false,
      whatsapp: false,
    });
    const edit = (body["history"] as Row[]).find((entry) => entry["kind"] === "edit");
    expect(edit).toMatchObject({
      by: "seller",
      by_name: null,
      before: { title: "Before the edit" },
      after: { title: live.title },
    });
    expect(edit?.["fields"]).toEqual(
      expect.arrayContaining(["pin_lat", "street_address", "title"]),
    );
    const text = JSON.stringify(body);
    for (const hidden of ["Old street one", "New street two", "8.9", "9.01"]) {
      expect(text, `AL-16 the door showed ${hidden}`).not.toContain(hidden);
    }

    await useJobSuperAdmin(page);
    const removed = await rpcResult(page, "admin_move_listing", {
      p_listing_id: live.id,
      p_to: "removed",
      p_reason: "misleading",
    });
    expect(removed.error).toBeNull();
    const full = (await rpcResult(page, "admin_listing_detail", { p_listing_id: live.id }))
      .data as Row;
    expect((full["seller"] as Row)["email"]).toBe(seller.email);
    const latest = (full["history"] as Row[])[0];
    expect(latest).toMatchObject({
      kind: "state",
      by: "staff",
      reason: "misleading",
      note: null,
      before: { status: "active" },
      after: { status: "removed" },
    });
    expect(typeof latest?.["by_name"]).toBe("string");
    const again = (await viewer.rpc("admin_listing_detail", { p_listing_id: live.id })).data as Row;
    expect((again["history"] as Row[])[0]).toMatchObject({
      by: "staff",
      by_name: null,
      reason: "misleading",
    });
  });

  /**
   * Turn L3 — the listing's page as the super admin: opened from its title in
   * All listings; the heading and the status pill; the seller with the e-mail and
   * the link to the account; Remove from the page with a reason, then the pill,
   * the line above and the history's newest entry; the buyer's view; back to All
   * listings.
   */
  test("AL-17 The listing's page: opened from All listings, Remove with a reason, the history's newest line, the buyer's view", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const live = await seed(seller, "active");

    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/listings");
    await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
    await page.getByTestId("listings-search").fill(live.id);
    await listingRow(page, live.id).getByTestId(`listing-row-${live.id}-open`).click();
    await expect(page).toHaveURL(new RegExp(`/admin/listings/${live.id}$`), { timeout: 20000 });
    await expect(page.getByTestId("listing-title")).toHaveText(live.title, { timeout: 20000 });
    await expect(page.getByTestId("listing-status")).toHaveText(en["admin.listings.status.active"]);
    await expect(page.getByTestId("listing-fact-seller")).toContainText(seller.alias);
    await expect(page.getByTestId("listing-fact-seller")).toContainText(seller.email);
    await expect(page.getByTestId("listing-open-seller")).toBeVisible();

    await page.getByTestId("listing-move-remove").click();
    await confirmMove(page, "misleading");
    await expect(page.getByTestId("listing-notice")).toHaveText(
      en["admin.listings.move.done.remove"].replace("{count}", "1"),
    );
    await expect(page.getByTestId("listing-status")).toHaveText(
      en["admin.listings.status.removed"],
      {
        timeout: 20000,
      },
    );
    const newest = page.getByTestId("listing-history-entry-0");
    await expect(newest.getByTestId("listing-history-what")).toHaveText(
      en["admin.listings.history.status"]
        .replace("{from}", en["admin.listings.status.active"])
        .replace("{to}", en["admin.listings.status.removed"]),
    );
    await expect(newest.getByTestId("listing-history-reason")).toHaveText(
      en["admin.listings.history.reason"].replace(
        "{reason}",
        en["admin.listings.reason.misleading"],
      ),
    );
    await expect(newest.getByTestId("listing-history-who")).toContainText(
      en["admin.listings.history.by.staff"],
    );
    await expect(page.getByTestId("listing-move-restore")).toBeVisible();
    // Turn L4a — a removed listing is not edited (the door's rule): no Edit.
    await expect(page.getByTestId("listing-edit")).toHaveCount(0);
    expect((await listingTruth(live.id))?.["status"]).toBe("removed");

    await page.getByTestId("listing-buyer-view").click();
    await expect(page.getByTestId("post-preview-sheet")).toContainText(live.title);
    await page.getByTestId("post-preview-close").click();
    await expect(page.getByTestId("post-preview-sheet")).toHaveCount(0);
    await expectNoHorizontalOverflow(page);

    await page.getByTestId("listing-back").click();
    await expect(page).toHaveURL(/\/admin\/listings$/, { timeout: 20000 });
  });

  /**
   * Turn L3 — the page for someone who holds listings:view and no other listing
   * right: the facts without the e-mail and without the account link, no move
   * and no View as seller, a staff line without the staff member's name; a
   * draft's address answers "not found".
   */
  test("AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const live = await seed(seller, "active");
    const draft = await seed(seller, "draft");
    const viewer = await scratchHolder([
      ["admin_panel", "access"],
      ["listings", "view"],
    ]);
    // A staff member's status change: a scratch revision of this listing.
    const revision = await adminClient()
      .from("listing_revisions")
      .insert({
        listing_id: live.id,
        seller_id: seller.id,
        kind: "state",
        actor: viewer.id,
        before: { status: "active" },
        after: { status: "reduced" },
      });
    if (revision.error) throw new Error(`[e2e:al] revision seed failed: ${revision.error.message}`);

    await signInViaSession(page, viewer.email, viewer.password);
    await gotoReady(page, `/admin/listings/${live.id}`);
    await expect(page.getByTestId("listing-title")).toHaveText(live.title, { timeout: 20000 });
    await expect(page.getByTestId("listing-fact-seller")).toContainText(seller.alias);
    await expect(page.getByTestId("admin-listing-detail")).not.toContainText(seller.email);
    await expect(page.getByTestId("listing-open-seller")).toHaveCount(0);
    for (const control of [
      "listing-edit",
      "listing-move-remove",
      "listing-move-send_back",
      "listing-view-as",
    ]) {
      await expect(page.getByTestId(control)).toHaveCount(0);
    }
    await expect(page.getByTestId("listing-buyer-view")).toBeVisible();
    await expect(
      page.getByTestId("listing-history-entry-0").getByTestId("listing-history-who"),
    ).toHaveText(en["admin.listings.history.by.staff"]);
    await expectNoHorizontalOverflow(page);

    await gotoReady(page, `/admin/listings/${draft.id}`);
    await expect(page.getByTestId("listing-error")).toHaveText(
      en["admin.listings.detail.notFound"],
      { timeout: 20000 },
    );
  });

  /**
   * Turn L4a — INC-552 (DEC-173): an admin's edit is judged by the seller's
   * content rules for what an admin can change, never by the seller's own end
   * date or places. Red against the door of 20261011085637 (posterExpiryTooSoon,
   * then unknownPlace); the seller's rules still refuse a phone number.
   */
  test("AL-19 Edit is judged on what an admin can change: the seller's end date within a day and a switched-off place do not block it", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const soon = await seed(seller, "active");
    const placed = await seed(seller, "active");
    const ends = await adminClient()
      .from("listings")
      .update({ poster_expires_at: new Date(Date.now() + 2 * 3600 * 1000).toISOString() })
      .eq("id", soon.id);
    if (ends.error) throw new Error(`[e2e:al] end date failed: ${ends.error.message}`);

    await useJobSuperAdmin(page);
    const title = `Corrected listing ${token()}`;
    const first = await rpcResult(page, "admin_edit_listing", {
      p_listing_id: soon.id,
      p_changes: { title },
      p_reason: "misleading",
    });
    expect(first.error).toBeNull();
    expect(first.data).toEqual({ ok: true, status: "active", fields: ["title"] });

    // The listing's only place is switched off (this test's own scratch city).
    const off = await adminClient()
      .from("locations")
      .update({ is_active: false })
      .eq("id", seller.cityId);
    if (off.error) throw new Error(`[e2e:al] switching the place off failed: ${off.error.message}`);
    const second = await rpcResult(page, "admin_edit_listing", {
      p_listing_id: placed.id,
      p_changes: { description: "Corrected by the console" },
      p_reason: "rules",
    });
    expect(second.error).toBeNull();
    expect(second.data).toEqual({ ok: true, status: "active", fields: ["description"] });

    // The seller's content rules still judge what the admin changes.
    const third = await rpcResult(page, "admin_edit_listing", {
      p_listing_id: soon.id,
      p_changes: { title: "Call me on 0911 223 344" },
      p_reason: "misleading",
    });
    expect(third.error).toBeNull();
    expect((third.data as { ok: boolean; refusals: Row[] }).refusals).toContainEqual({
      field: "title",
      reason: "contactInText",
    });
    expect(await listingTruth(soon.id)).toMatchObject({ status: "active", title });
    expect(await noticeRows(soon.id)).toHaveLength(1);
  });

  /**
   * Turn L4a (D140) — Edit on the listing's page: the title and the price, a
   * reason first, a note; the seller is told; the history's newest line names
   * what changed. INC-553 — a price prints with its unit on the page and in All
   * listings ("per bag": the seller's own word), as the card does.
   */
  test("AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const live = await seed(seller, "active");
    const unit = await adminClient()
      .from("listings")
      .update({ price_unit: "other", price_unit_text: "bag" })
      .eq("id", live.id);
    if (unit.error) throw new Error(`[e2e:al] unit failed: ${unit.error.message}`);
    const perBag = en["post.review.pricePer"]
      .replace("{amount}", "100")
      .replace("{currency}", "ETB")
      .replace("{basis}", "bag");

    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/listings");
    await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
    await page.getByTestId("listings-search").fill(live.id);
    await expect(listingRow(page, live.id)).toContainText(perBag, { timeout: 20000 });
    await listingRow(page, live.id).getByTestId(`listing-row-${live.id}-open`).click();
    await expect(page.getByTestId("listing-title")).toHaveText(live.title, { timeout: 20000 });
    await expect(page.getByTestId("listing-fact-price")).toContainText(perBag);

    await page.getByTestId("listing-edit").click();
    const form = page.getByTestId("listing-edit-form");
    await expect(form.getByTestId("post-price-amount")).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("listing-details")).toHaveCount(0);
    await expectNoHorizontalOverflow(page);

    const title = `Corrected listing ${token()}`;
    const note = "The title named the wrong model.";
    await form.getByTestId("listing-edit-title").fill(title);
    await form.getByTestId("post-price-amount").fill("120");
    // A reason first.
    await form.getByTestId("listing-edit-save").click();
    await expect(form.getByTestId("listing-edit-problem")).toHaveText(
      en["admin.listings.move.pickReason"],
    );
    await form.getByTestId("listing-edit-reason-misleading").click();
    await form.getByTestId("listing-edit-note").fill(note);
    await form.getByTestId("listing-edit-save").click();

    await expect(page.getByTestId("listing-notice")).toHaveText(
      en["admin.listings.edit.done"].replace(
        "{fields}",
        `${en["admin.listings.col.price"]}, ${en["admin.listings.col.title"]}`,
      ),
      { timeout: 20000 },
    );
    await expect(page.getByTestId("listing-edit")).toBeVisible();
    await expect(page.getByTestId("listing-title")).toHaveText(title, { timeout: 20000 });
    await expect(page.getByTestId("listing-fact-price").locator("dd")).toHaveText("120 ETB");
    const newest = page.getByTestId("listing-history-entry-0");
    await expect(newest.getByTestId("listing-history-what")).toHaveText(
      en["admin.listings.history.edited"].replace(
        "{fields}",
        `${en["admin.listings.col.title"]}, ${en["admin.listings.col.price"]}`,
      ),
    );
    await expect(newest.getByTestId("listing-history-reason")).toHaveText(
      en["admin.listings.history.reason"].replace(
        "{reason}",
        en["admin.listings.reason.misleading"],
      ),
    );
    await expect(newest.getByTestId("listing-history-note")).toHaveText(
      en["admin.listings.history.note"].replace("{note}", note),
    );

    expect(await noticeRows(live.id)).toEqual([
      {
        seller_id: seller.id,
        kind: "admin_edit",
        fields: ["price", "title"],
        reason: "misleading",
        note,
      },
    ]);
    const { data: stored, error } = await adminClient()
      .from("listings")
      .select("status,title,price_amount,price_unit")
      .eq("id", live.id)
      .single();
    if (error) throw new Error(`[e2e:al] listing read failed: ${error.message}`);
    expect(stored).toMatchObject({ status: "active", title, price_amount: 120, price_unit: null });
  });

  /**
   * Turn L4a — the seller's refusal lands under its field and nothing is
   * written; Cancel closes the form; Save with nothing changed says so and
   * calls no door.
   */
  test("AL-21 Edit: a refusal under its field and nothing written; Cancel; nothing changed says so", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const live = await seed(seller, "active");

    await useJobSuperAdmin(page);
    await gotoReady(page, `/admin/listings/${live.id}`);
    await expect(page.getByTestId("listing-title")).toHaveText(live.title, { timeout: 20000 });
    // INC-554 (turn L4b) — the breadcrumb names the listing last.
    await expect(page.getByTestId("breadcrumb-admin-listing")).toHaveText(live.title);
    // INC-557 — the Listings group (no page of its own) is a plain name; the listing is the current segment.
    const group = page.getByTestId("breadcrumbs").getByTestId("breadcrumb-admin-group");
    await expect(group).toHaveText(en["admin.nav.group.listings"]);
    await expect(group).not.toHaveAttribute("aria-current");
    await expect(group).not.toHaveClass(/underline/);
    await page.getByTestId("listing-edit").click();
    const form = page.getByTestId("listing-edit-form");
    await expect(form.getByTestId("post-price-amount")).toBeVisible({ timeout: 20000 });

    // Nothing changed: said here, before any door.
    await form.getByTestId("listing-edit-save").click();
    await expect(form.getByTestId("listing-edit-problem")).toHaveText(
      en["admin.listings.edit.nothing"],
    );

    await form.getByTestId("listing-edit-title").fill("Call me on 0911 223 344");
    await form.getByTestId("listing-edit-reason-contact_in_text").click();
    await form.getByTestId("listing-edit-save").click();
    await expect(form.getByTestId("listing-edit-title-field")).toContainText(
      en["post.refusal.contactInText"],
      { timeout: 20000 },
    );
    await expect(form).toBeVisible();
    expect(await listingTruth(live.id)).toMatchObject({ status: "active", title: live.title });
    expect(await noticeRows(live.id)).toEqual([]);

    await form.getByTestId("listing-edit-cancel").click();
    await expect(page.getByTestId("listing-edit")).toBeVisible();
    await expect(page.getByTestId("listing-details")).toBeVisible();
    await expect(page.getByTestId("listing-title")).toHaveText(live.title);

    // INC-554 (turn L4b) — the breadcrumb's section leads back to All listings.
    await page.getByTestId("breadcrumb-admin-section").click();
    await expect(page).toHaveURL(/\/admin\/listings$/, { timeout: 20000 });
  });

  /**
   * Turn L4b (D140) — Edit moves a listing to another category: the tree behind
   * "Change category" (filtered by the leaf's name), Wrong category as the
   * reason; the seller is told "Category"; the history says so. The listing's
   * answers stay (the scratch leaves ask nothing).
   */
  test("AL-22 Edit moves a listing to another category with Wrong category; the seller is told", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const live = await seed(seller, "active");
    const other = await seedCategoryBranch();
    branches.push([other.parent.slug as string, other.leaf.slug as string]);

    await useJobSuperAdmin(page);
    await gotoReady(page, `/admin/listings/${live.id}`);
    await expect(page.getByTestId("listing-title")).toHaveText(live.title, { timeout: 20000 });
    await page.getByTestId("listing-edit").click();
    const form = page.getByTestId("listing-edit-form");
    await expect(form.getByTestId("post-price-amount")).toBeVisible({ timeout: 20000 });

    await form.getByTestId("listing-edit-category-change").click();
    await form.getByTestId("post-category-search").fill(other.leaf.slug as string);
    const hit = form.locator(`[data-testid="post-category-hit"][data-category="${other.leaf.id}"]`);
    await expect(hit).toBeVisible({ timeout: 20000 });
    await hit.click();
    await expect(form.getByTestId("listing-edit-category-path")).toContainText(
      other.leaf.slug as string,
    );
    await expect(form.getByTestId("post-category-search")).toHaveCount(0);
    await expectNoHorizontalOverflow(page);

    await form.getByTestId("listing-edit-reason-wrong_category").click();
    await form.getByTestId("listing-edit-save").click();
    await expect(page.getByTestId("listing-notice")).toHaveText(
      en["admin.listings.edit.done"].replace("{fields}", en["admin.listings.col.category"]),
      { timeout: 20000 },
    );
    await expect(
      page.getByTestId("listing-history-entry-0").getByTestId("listing-history-what"),
    ).toHaveText(
      en["admin.listings.history.edited"].replace("{fields}", en["admin.listings.col.category"]),
    );
    const { data: stored, error } = await adminClient()
      .from("listings")
      .select("status,category_id")
      .eq("id", live.id)
      .single();
    if (error) throw new Error(`[e2e:al] listing read failed: ${error.message}`);
    expect(stored).toEqual({ status: "active", category_id: other.leaf.id });
    expect(await noticeRows(live.id)).toEqual([
      {
        seller_id: seller.id,
        kind: "admin_edit",
        fields: ["category"],
        reason: "wrong_category",
        note: null,
      },
    ]);
  });

  /**
   * Turn L4b (D140) — Edit changes a specification with the seller's own form:
   * a required answer emptied is refused under its own control and nothing is
   * written; a new answer is saved, the seller is told "Specifications". An
   * edit of the title alone sends no specifications.
   */
  test("AL-23 Edit changes a specification: a refusal under its control, then the answer saved", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const spec = await seedSpecSet(seller.leafId);
    specSets.push([
      spec.text.attrKey,
      spec.number.attrKey,
      spec.bool.attrKey,
      spec.select.attrKey,
      spec.multi.attrKey,
    ]);
    const live = await seed(seller, "active", {
      attributes: { [spec.text.attrKey]: "first answer" },
    });
    const control = (key: string) =>
      page.locator(`[data-testid="post-attr-control"][data-attr="${key}"]`);

    await useJobSuperAdmin(page);
    await gotoReady(page, `/admin/listings/${live.id}`);
    await expect(page.getByTestId("listing-title")).toHaveText(live.title, { timeout: 20000 });

    // The title alone: the specifications do not travel.
    await page.getByTestId("listing-edit").click();
    const form = page.getByTestId("listing-edit-form");
    await expect(control(spec.text.attrKey)).toHaveValue("first answer", { timeout: 20000 });
    const title = `Corrected listing ${token()}`;
    await form.getByTestId("listing-edit-title").fill(title);
    await form.getByTestId("listing-edit-reason-misleading").click();
    await form.getByTestId("listing-edit-save").click();
    await expect(page.getByTestId("listing-notice")).toHaveText(
      en["admin.listings.edit.done"].replace("{fields}", en["admin.listings.col.title"]),
      { timeout: 20000 },
    );

    // The required answer emptied: refused under its own control, nothing written.
    await page.getByTestId("listing-edit").click();
    await expect(control(spec.text.attrKey)).toHaveValue("first answer", { timeout: 20000 });
    await control(spec.text.attrKey).fill("");
    await form.getByTestId("listing-edit-reason-misleading").click();
    await form.getByTestId("listing-edit-save").click();
    await expect(
      form.locator(`[data-testid="post-attr-refusal"][data-attr="${spec.text.attrKey}"]`),
    ).toBeVisible({ timeout: 20000 });
    expect((await noticeRows(live.id)).map((row) => String(row["fields"]))).toEqual(["title"]);

    await control(spec.text.attrKey).fill("second answer");
    await form.getByTestId("listing-edit-save").click();
    await expect(page.getByTestId("listing-notice")).toHaveText(
      en["admin.listings.edit.done"].replace("{fields}", en["admin.listings.history.field.specs"]),
      { timeout: 20000 },
    );
    const { data: stored, error } = await adminClient()
      .from("listings")
      .select("title,attributes")
      .eq("id", live.id)
      .single();
    if (error) throw new Error(`[e2e:al] listing read failed: ${error.message}`);
    expect(stored?.["title"]).toBe(title);
    expect((stored?.["attributes"] as Row)[spec.text.attrKey]).toBe("second answer");
    // Two edits, two notices (read in any order).
    expect((await noticeRows(live.id)).map((row) => String(row["fields"])).sort()).toEqual([
      "specs",
      "title",
    ]);
  });
});
