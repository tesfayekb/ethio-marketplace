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
import { switchUser, useJobSuperAdmin } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * Bundle 11, the Listings console, turn L1 (D134, D136, D137) — THE CONSOLE'S DOORS (AL-1..AL-9).
 *
 * The doors are proven as the signed-in browser calls them (law F3: the server is
 * the authority): admin_list_listings (listings:view; drafts never), admin_edit_listing
 * and admin_move_listing (listings:enforce with a fresh second factor), the state
 * door's Restore (REQ-022 as amended by D137) and the seller's notices (the seller
 * reads only their own). Every listing, place, category and role is a scratch row of
 * this file, removed in afterEach (J3, G27); every row is found by its own id or its
 * own seller (G28); DB truth through the service client.
 */

type RpcClient = {
  rpc: (
    fn: string,
    args?: Record<string, unknown>,
  ) => Promise<{ data: unknown; error: { message: string } | null }>;
  from: (table: string) => {
    select: (columns: string) => {
      eq: (
        column: string,
        value: string,
      ) => Promise<{ data: unknown; error: { message: string } | null }>;
    };
    insert: (row: Record<string, unknown>) => Promise<{ error: { message: string } | null }>;
  };
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

/** The seller's notices for one listing, read as the page's signed-in person (RLS decides). */
async function noticesAsBrowser(page: Page, listingId: string) {
  await clientReady(page);
  return page.evaluate(async (id) => {
    const client = (window as unknown as { __ethioSupabase: RpcClient }).__ethioSupabase;
    const result = await client.from("seller_notices").select("kind,reason").eq("listing_id", id);
    return { data: result.data, error: result.error?.message ?? null };
  }, listingId);
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

  test.afterEach(async () => {
    const supabase = adminClient();
    for (const id of listingIds.splice(0)) {
      const removed = await supabase.from("listings").delete().eq("id", id);
      if (removed.error) throw new Error(`[e2e:al] listing reap failed: ${removed.error.message}`);
    }
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
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
    options: { publishedAt?: string; tier?: string; screening?: Row; own?: boolean } = {},
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
        attributes: {},
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

    const plain = await leaseUser();
    await switchUser(page, plain.email, plain.password);
    expect((await list(page, { p_search: live.id })).error).toBe("permission denied");

    const viewer = await scratchHolder([["listings", "view"]]);
    await switchUser(page, viewer.email, viewer.password);
    const byId = await list(page, { p_search: live.id });
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
    expect((await list(page, { p_search: draft.id })).data).toEqual([]);
    const bySeller = (await list(page, { p_seller: seller.alias })).data as Row[];
    expect(bySeller.map((row) => row.id)).toEqual([live.id]);
    // An e-mail is not a key for someone who may not read it.
    expect((await list(page, { p_seller: seller.email })).data).toEqual([]);

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

  test("AL-3 Edit refuses: no permission, a reviewer, no second factor, the admin's own, a draft, a removed listing", async ({
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

    const plain = await leaseUser();
    await switchUser(page, plain.email, plain.password);
    expect((await edit(target.id, { title: "Changed by nobody" })).error).toBe("permission denied");
    const reviewer = await scratchHolder([
      ["listings", "view"],
      ["listings", "review"],
    ]);
    await switchUser(page, reviewer.email, reviewer.password);
    expect((await edit(target.id, { title: "Changed by a reviewer" })).error).toBe(
      "permission denied",
    );
    const enforcer = await scratchHolder([["listings", "enforce"]]);
    await switchUser(page, enforcer.email, enforcer.password);
    expect((await edit(target.id, { title: "Changed with no factor" })).error).toBe(
      "step-up required: no verified factor",
    );

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

    await switchUser(page, seller.email, seller.password);
    const asSeller = await rpcResult(page, "edit_listing", {
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

    await switchUser(page, seller.email, seller.password);
    expect(
      (
        await rpcResult(page, "transition_listing", {
          p_listing_id: plainRemoved.id,
          p_new_status: "screening",
        })
      ).error,
    ).toBe("enforcement only: removed -> screening");

    const enforcer = await scratchHolder([["listings", "enforce"]]);
    await switchUser(page, enforcer.email, enforcer.password);
    expect((await restore(plainRemoved.id)).error).toBe("step-up required: no verified factor");
    expect((await restore(severe.id)).error).toBe(
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

    await switchUser(page, seller.email, seller.password);
    expect(await noticesAsBrowser(page, live.id)).toEqual({
      data: [{ kind: "admin_send_back", reason: "wrong_category" }],
      error: null,
    });
    const forged = await page.evaluate(
      async ([listingId, sellerId]) => {
        const client = (window as unknown as { __ethioSupabase: RpcClient }).__ethioSupabase;
        const result = await client.from("seller_notices").insert({
          seller_id: sellerId,
          listing_id: listingId,
          kind: "admin_edit",
          reason: "other",
          note: "forged",
        });
        return result.error?.message ?? null;
      },
      [live.id, seller.id] as const,
    );
    expect(forged).not.toBeNull();

    const other = await leaseUser();
    await switchUser(page, other.email, other.password);
    expect(await noticesAsBrowser(page, live.id)).toEqual({ data: [], error: null });
    expect(await noticeRows(live.id)).toHaveLength(1);
  });
});
