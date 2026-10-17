import { expect, test } from "./fixtures";
import { RUN } from "./helpers/posting";
import { adPageFixtures, token } from "./helpers/ad-page";
import { passwordGrant } from "./helpers/session";
import { adminClient, createUser, leaseUser } from "./helpers/users";
import { gotoReady, signInViaSession } from "./helpers/ui";

/**
 * Bundle 19, turn 4 (M1) — THE AD PAGE'S DOORS (AP-3..AP-8).
 *
 * Proves, through the REST API alone (no browser page), the doors M1 landed:
 * `public_listing` — the one public read by public id, carrying the public
 * document and never a contact value, a seller id or an exact coordinate of an
 * approximate pin; `listing_counts` — the owner's sums, refused to everyone
 * else; `count_listing_view` / `count_listing_share` — service-role only, one
 * count per address, ad and channel an hour, the owner's view never counted;
 * and the id's shape and uniqueness. Which ads have a page at all: a live one,
 * or one sold within 30 days.
 *
 * Every ad is a scratch row of this file's own leased seller, removed in
 * afterEach with the seller's drafts, the scratch category branch and the
 * scratch place chain (J3, G27); the rate rows this file makes under keys
 * beginning `e2e-<RUN token>` are deleted from `rate_limits` in the same
 * afterEach. DB truth through the service client. The patterns follow
 * e2e/my-listings-doors.spec.ts.
 */

type Row = Record<string, unknown>;

function restBase(): { url: string; key: string } {
  const url = process.env["E2E_SUPABASE_URL"];
  const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    throw new Error("[e2e:ap] E2E_SUPABASE_URL and E2E_SUPABASE_PUBLISHABLE_KEY must be set.");
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
    rest: async (path: string) => answerOf(await fetch(`${url}/rest/v1/${path}`, { headers })),
    insert: async (path: string, body: Record<string, unknown>) =>
      answerOf(
        await fetch(`${url}/rest/v1/${path}`, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        }),
      ),
  };
}

/** An anonymous caller: the publishable key and no bearer. */
async function asAnonymous() {
  const { url, key } = restBase();
  const headers = { apikey: key, "Content-Type": "application/json" };
  return {
    rpc: async (fn: string, args: Record<string, unknown>) =>
      answerOf(
        await fetch(`${url}/rest/v1/rpc/${fn}`, {
          method: "POST",
          headers,
          body: JSON.stringify(args),
        }),
      ),
    rest: async (path: string) => answerOf(await fetch(`${url}/rest/v1/${path}`, { headers })),
    insert: async (path: string, body: Record<string, unknown>) =>
      answerOf(
        await fetch(`${url}/rest/v1/${path}`, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        }),
      ),
  };
}

test.describe("AD PAGE DOORS — M1 (bundle 19 turn 4)", () => {
  const { scratchSeller, seed, publicIdOf, cleanup, listingIds, rateTokens } = adPageFixtures();
  test.afterEach(cleanup);
  const reportRoles: string[] = [];
  const reportPeople: string[] = [];
  test.afterEach(async () => {
    const supabase = adminClient();
    for (const id of reportPeople.splice(0)) {
      for (const [table, column] of [
        ["listing_reports", "reporter_id"],
        ["rate_overrides", "user_id"],
        ["rate_limits", "key"],
      ] as const) {
        const removed = await supabase.from(table).delete().eq(column, id);
        if (removed.error)
          throw new Error(`[e2e:ap] ${table} reap failed: ${removed.error.message}`);
      }
    }
    for (const id of reportRoles.splice(0)) {
      const assignments = await supabase.from("user_roles").delete().eq("role_id", id);
      if (assignments.error)
        throw new Error(`[e2e:ap] assignment reap failed: ${assignments.error.message}`);
      const permissions = await supabase.from("role_permissions").delete().eq("role_id", id);
      if (permissions.error)
        throw new Error(`[e2e:ap] permission reap failed: ${permissions.error.message}`);
      const role = await supabase.from("roles").delete().eq("id", id);
      if (role.error) throw new Error(`[e2e:ap] role reap failed: ${role.error.message}`);
    }
  });

  /** The my-listings door spec's file-local grant, on an account already held. */
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
    if (roleError || !role) throw new Error(`[e2e:ap] scratch role failed: ${roleError?.message}`);
    reportRoles.push(role.id as string);
    const { data: perms, error: permsError } = await supabase
      .from("permissions")
      .select("id, action, resources!inner(name)")
      .in("resources.name", [...new Set(wanted.map(([resource]) => resource))]);
    if (permsError) throw new Error(`[e2e:ap] permission read failed: ${permsError.message}`);
    const picked = (perms ?? []).filter((p) =>
      wanted.some(
        ([resource, action]) =>
          (p as unknown as { resources: { name: string } }).resources.name === resource &&
          p.action === action,
      ),
    );
    expect(
      picked,
      `[e2e:ap] expected exactly ${wanted.map((pair) => pair.join(":")).join(", ")}`,
    ).toHaveLength(wanted.length);
    const granted = await supabase
      .from("role_permissions")
      .insert(picked.map((p) => ({ role_id: role.id, permission_id: p.id })));
    if (granted.error) throw new Error(`[e2e:ap] grant failed: ${granted.error.message}`);
    const assigned = await supabase
      .from("user_roles")
      .insert({ user_id: person.id, role_id: role.id, scope_type: "global" });
    if (assigned.error) throw new Error(`[e2e:ap] assignment failed: ${assigned.error.message}`);
    return person;
  }

  /** File-local scratchHolder; reuse a held account for AP-28's two-lease ceiling. */
  async function scratchHolder(
    wanted: Array<[resource: string, action: string]>,
    person: { id: string; email: string; password: string },
  ) {
    return grantRole(wanted, person);
  }

  /** A rate key of this file, reaped in afterEach: `e2e-<RUN><token>-<name>`. */
  function rateKey(name: string): string {
    const key = `e2e-${RUN}${token()}-${name}`;
    rateTokens.push(key);
    return key;
  }

  test("AP-3 public_listing answers the public document of a live ad and nothing private", async () => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active", {
      contactPref: {
        phone: { show: true, value: "+251911000001" },
        telegram: { show: true, value: "e2ehandle" },
        messages: true,
      },
      pin: true,
    });
    const photos = [
      { display_order: 0, exif_stripped: true, unscreened: true },
      { display_order: 1, exif_stripped: true, unscreened: false },
      { display_order: 2, exif_stripped: true, unscreened: false },
    ];
    const photoIds: Record<number, string> = {};
    for (const photo of photos) {
      const { data, error } = await adminClient()
        .from("listing_photos")
        .insert({
          listing_id: ad.id,
          storage_path: `e2e/${photo.display_order}.jpg`,
          display_order: photo.display_order,
          exif_stripped: photo.exif_stripped,
          unscreened: photo.unscreened,
          paths: { card: `e2e/${photo.display_order}.jpg` },
        })
        .select("id")
        .single();
      if (error || !data) throw new Error(`[e2e:ap] photo seed failed: ${error?.message}`);
      photoIds[photo.display_order] = data.id as string;
    }

    const publicId = await publicIdOf(ad.id);
    const anonymous = await asAnonymous();
    const answer = await anonymous.rpc("public_listing", { p_public_id: publicId });
    expect(answer.error).toBeNull();
    const doc = answer.data as Row;

    expect(doc["public_id"]).toBe(publicId);
    expect(doc["title"]).toBe(ad.title);
    expect(doc["status"]).toBe("active");
    expect(doc["is_sold"]).toBe(false);
    expect((doc["photos"] as Row[]).map((p) => p["id"])).toEqual([photoIds[1], photoIds[2]]);
    expect(doc["cover_photo_id"]).toBe(photoIds[1]);
    expect(doc["contact_channels"]).toEqual(["phone", "telegram"]);
    expect((doc["seller"] as Row)["alias"]).toBe(seller.alias);
    expect((doc["viewer"] as Row)["owner"]).toBe(false);
    expect((doc["places"] as Row)["pin"]).toEqual({
      lat: 8.99,
      lng: 38.76,
      precision: "approx",
      zoom: null,
    });
    expect((doc["places"] as Row)["street_address"]).toBe("E2E street");
    expect(doc["counts"]).toEqual({ views: 0, shares: 0 });
    const path = (doc["category"] as Row)["path"] as Row[];
    expect(Array.isArray(path)).toBe(true);
    expect(path.length).toBeGreaterThan(0);
    expect(path[path.length - 1]?.["id"]).toBe(seller.leafId);

    const whole = JSON.stringify(doc);
    for (const forbidden of [
      "+251911000001",
      "e2ehandle",
      seller.id,
      "8.9876543",
      "38.7612345",
      '"home_country_code"',
      '"seller_id"',
      '"contact_pref"',
    ]) {
      expect(whole).not.toContain(forbidden);
    }
  });

  test("AP-4 the owner reads his own flag and counts; another person is refused", async () => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    const publicId = await publicIdOf(ad.id);

    const owner = await asPerson(seller);
    const read = await owner.rpc("public_listing", { p_public_id: publicId });
    expect(read.error).toBeNull();
    expect(((read.data as Row)["viewer"] as Row)["owner"]).toBe(true);

    const counts = await owner.rpc("listing_counts", { p_listing_id: ad.id });
    expect(counts.error).toBeNull();
    const own = counts.data as Row;
    expect(own["views"]).toBe(0);
    expect(own["shares"]).toBe(0);
    expect(own["contacts"]).toBe(0);
    expect(own["shares_by_channel"]).toEqual({
      telegram: 0,
      whatsapp: 0,
      facebook: 0,
      copy: 0,
      qr: 0,
    });

    const other = await asPerson(await leaseUser());
    const refused = await other.rpc("listing_counts", { p_listing_id: ad.id });
    expect(refused.error).toBe("not your listing");

    const anonymous = await asAnonymous();
    const unsigned = await anonymous.rpc("listing_counts", { p_listing_id: ad.id });
    expect(unsigned.error).not.toBeNull();
    expect(unsigned.error).toContain("permission denied");
  });

  test("AP-5 only a live ad, or one sold within 30 days, has a page", async () => {
    const seller = await scratchSeller();
    const draft = await seed(seller, "draft");
    const removed = await seed(seller, "removed");
    const soldLongAgo = await seed(seller, "sold", { soldAt: -40 });
    const soldYesterday = await seed(seller, "sold", { soldAt: -1 });

    const anonymous = await asAnonymous();
    for (const ad of [draft, removed, soldLongAgo]) {
      const answer = await anonymous.rpc("public_listing", {
        p_public_id: await publicIdOf(ad.id),
      });
      expect(answer.error).toBeNull();
      expect(answer.data).toBeNull();
    }

    const recent = await anonymous.rpc("public_listing", {
      p_public_id: await publicIdOf(soldYesterday.id),
    });
    expect(recent.error).toBeNull();
    const doc = recent.data as Row;
    expect(doc["is_sold"]).toBe(true);
    expect(doc["sold_word"]).toBe("sold");
    expect(doc["sold_at"]).not.toBeNull();

    for (const bad of ["ABCDEFGHJK", "abcdefghj"]) {
      const answer = await anonymous.rpc("public_listing", { p_public_id: bad });
      expect(answer.error).toBeNull();
      expect(answer.data).toBeNull();
    }
  });

  test("AP-6 views count once per address and never for the owner; shares count by channel", async () => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    const soldLongAgo = await seed(seller, "sold", { soldAt: -40 });
    const publicId = await publicIdOf(ad.id);
    const supabase = adminClient();

    const view = (key: string, viewer: string | null) =>
      supabase.rpc("count_listing_view", {
        p_public_id: publicId,
        p_rate_key: key,
        p_viewer: viewer,
      });
    const k1 = rateKey("k1");
    const k2 = rateKey("k2");
    const k3 = rateKey("k3");
    expect((await view(k1, null)).data).toBe(true);
    expect((await view(k1, null)).data).toBe(false);
    expect((await view(k2, null)).data).toBe(true);
    expect((await view(k3, seller.id)).data).toBe(false);

    const share = (channel: string, key: string) =>
      supabase.rpc("count_listing_share", {
        p_public_id: publicId,
        p_channel: channel,
        p_rate_key: key,
        p_viewer: null,
      });
    expect((await share("copy", k1)).data).toBe(true);
    expect((await share("copy", k1)).data).toBe(false);
    expect((await share("telegram", k1)).data).toBe(true);
    const unknown = await share("email", k1);
    expect(unknown.error?.message).toContain("unknown share channel");

    const anonymous = await asAnonymous();
    const read = await anonymous.rpc("public_listing", { p_public_id: publicId });
    expect(read.error).toBeNull();
    expect((read.data as Row)["counts"]).toEqual({ views: 2, shares: 2 });

    const owner = await asPerson(seller);
    const counts = await owner.rpc("listing_counts", { p_listing_id: ad.id });
    expect(counts.error).toBeNull();
    const own = counts.data as Row;
    expect(own["views"]).toBe(2);
    expect(own["shares"]).toBe(2);
    expect((own["shares_by_channel"] as Row)["copy"]).toBe(1);
    expect((own["shares_by_channel"] as Row)["telegram"]).toBe(1);

    const stale = await supabase.rpc("count_listing_view", {
      p_public_id: await publicIdOf(soldLongAgo.id),
      p_rate_key: rateKey("stale"),
      p_viewer: null,
    });
    expect(stale.data).toBe(false);
    const malformed = await supabase.rpc("count_listing_view", {
      p_public_id: "zzzzzzzzzz",
      p_rate_key: rateKey("bad"),
      p_viewer: null,
    });
    expect(malformed.data).toBe(false);
  });

  test("AP-7 no client reads the buckets or calls the counting doors", async () => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    const publicId = await publicIdOf(ad.id);
    const counted = await adminClient().rpc("count_listing_view", {
      p_public_id: publicId,
      p_rate_key: rateKey("seed"),
      p_viewer: null,
    });
    expect(counted.data).toBe(true);

    const anonymous = await asAnonymous();
    const owner = await asPerson(seller);
    for (const reader of [anonymous, owner]) {
      const rows = await reader.rest(`listing_counters?listing_id=eq.${ad.id}`);
      const seesRows = rows.error === null && Array.isArray(rows.data) && rows.data.length > 0;
      expect(seesRows).toBe(false);
      const called = await reader.rpc("count_listing_view", {
        p_public_id: publicId,
        p_rate_key: rateKey("denied"),
        p_viewer: null,
      });
      expect(called.error).not.toBeNull();
      expect(called.data).toBeNull();
    }
  });

  test("AP-8 every ad has a well-formed id of its own", async () => {
    const seller = await scratchSeller();
    const first = await seed(seller);
    const second = await seed(seller);
    const ids = await Promise.all(listingIds.map((id) => publicIdOf(id)));
    const shape = /^[23456789abcdefghjkmnpqrstuvwxyz]{10}$/;
    for (const id of ids) expect(id).toMatch(shape);
    expect(new Set(ids).size).toBe(ids.length);

    const base = {
      category_id: seller.leafId,
      seller_id: seller.id,
      location_id: seller.cityId,
      home_country_code: "ET",
      title: `E2E ad page ${RUN.replace(/[0-9]/g, "x")} ${token()}`,
      description: "e2e scratch listing for the id door",
      attributes: {},
      price_mode: "fixed",
      price_amount: 100,
      price_currency: "ETB",
      price_period: "once",
      contact_pref: { messages: true },
      status: "draft",
      tier: "regular",
    };
    const badShape = await adminClient()
      .from("listings")
      .insert({ ...base, public_id: "ABCDEFGHJK" })
      .select("id");
    expect(badShape.error).not.toBeNull();
    const duplicate = await adminClient()
      .from("listings")
      .insert({ ...base, public_id: await publicIdOf(first.id) })
      .select("id");
    expect(duplicate.error).not.toBeNull();
    expect(second.id).not.toBe(first.id);
  });
  test("AP-16 the three reads carry the public id", async () => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    const publicId = await publicIdOf(ad.id);
    const anonymous = await asAnonymous();
    const feed = await anonymous.rpc("feed_page", {
      p_category_id: seller.leafId,
      p_location_id: seller.cityId,
      p_after: null,
      p_size: 20,
    });
    expect(feed.error).toBeNull();
    const card = ((feed.data as Row)["cards"] as Row[]).find((entry) => entry["id"] === ad.id);
    expect(card?.["publicId"]).toBe(publicId);
    const owner = await asPerson(seller);
    const single = await owner.rpc("my_listing", { p_listing_id: ad.id });
    expect(single.error).toBeNull();
    expect(((single.data as Row)["listing"] as Row)["publicId"]).toBe(publicId);
    const list = await owner.rpc("my_listings", {
      p_group: "live",
      p_limit: 50,
      p_offset: 0,
      p_search: ad.title,
      p_category: seller.leafId,
      p_mark: null,
    });
    expect(list.error).toBeNull();
    const row = ((list.data as Row)["rows"] as Row[]).find((entry) => entry["id"] === ad.id);
    expect(row?.["publicId"]).toBe(publicId);
  });

  test("AP-20 the reveal by public id: the owner gets his channels with no row; a buyer gets them with one row a day; a sold or unknown ad is not available; the row carries its instant (D201 §6)", async () => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active", {
      contactPref: {
        phone: { show: true, value: "+251911000001" },
        telegram: { show: true, value: "@scratch_seller" },
        phone2: { show: false, value: "+251911000002" },
      },
    });
    const publicId = await publicIdOf(ad.id);
    const revealRows = async () =>
      (
        await adminClient()
          .from("contact_reveals")
          .select("listing_id,viewer_id,day,created_at")
          .eq("listing_id", ad.id)
      ).data ?? [];

    // The owner always reaches his own ad's channels and leaves no row, no count.
    const owner = await asPerson(seller);
    const own = await owner.rpc("reveal_listing_contact", { p_public_id: publicId });
    expect(own.error).toBeNull();
    const ownChannels = (own.data as Row)["channels"] as Row;
    expect((ownChannels["phone"] as Row)["value"]).toBe("+251911000001");
    expect((ownChannels["telegram"] as Row)["value"]).toBe("@scratch_seller");
    expect(ownChannels["phone2"]).toBeUndefined();
    expect(ownChannels["messages"]).toBeUndefined();
    expect(await revealRows()).toHaveLength(0);

    // The buyer: one row the first time, none the second time the same day; the row carries its instant.
    const buyer = await asPerson(await leaseUser());
    const before = Date.now() - 60_000;
    const first = await buyer.rpc("reveal_listing_contact", { p_public_id: publicId });
    expect(first.error).toBeNull();
    expect((first.data as Row)["ok"]).toBe(true);
    const rows = await revealRows();
    expect(rows).toHaveLength(1);
    const instant = new Date(String(rows[0]!["created_at"])).getTime();
    expect(instant).toBeGreaterThan(before);
    expect(instant).toBeLessThan(Date.now() + 60_000);
    const again = await buyer.rpc("reveal_listing_contact", { p_public_id: publicId });
    expect(again.error).toBeNull();
    expect((again.data as Row)["ok"]).toBe(true);
    expect(await revealRows()).toHaveLength(1);

    // A sold ad and an unknown or malformed id are "listingNotAvailable", as before.
    const sold = await seed(seller, "sold", { soldAt: -1 });
    expect(
      (await buyer.rpc("reveal_listing_contact", { p_public_id: await publicIdOf(sold.id) })).error,
    ).toBe("listingNotAvailable");
    for (const bad of ["2345678923", "nope"]) {
      expect((await buyer.rpc("reveal_listing_contact", { p_public_id: bad })).error).toBe(
        "listingNotAvailable",
      );
    }
    // Signed out: the grant refuses first.
    const anonymous = await asAnonymous();
    const refused = await anonymous.rpc("reveal_listing_contact", { p_public_id: publicId });
    expect(refused.error).toMatch(/permission denied|not authenticated/);
  });

  test("AP-21 the sellers cap: ten distinct sellers a day, flagged for staff (D201 §6a)", async () => {
    // EL-4's two-lease limit: one leased seller; B and C are fresh accounts whose
    // ads share A's branch and place (the cap counts distinct sellers only).
    const sellerA = await scratchSeller();
    const sellerB = await createUser({ confirmed: true });
    const sellerC = await createUser({ confirmed: true });
    const adA = await seed(sellerA);
    const adB = await seed({ id: sellerB.id, leafId: sellerA.leafId, cityId: sellerA.cityId });
    const adC = await seed({ id: sellerC.id, leafId: sellerA.leafId, cityId: sellerA.cityId });
    const buyerPerson = await leaseUser();
    const buyer = await asPerson(buyerPerson);
    // A lowered dial so the test reaches the cap with three sellers; removed in finally.
    const override = await adminClient().from("rate_overrides").insert({
      user_id: buyerPerson.id,
      action: "contact_reveal_sellers",
      max_count: 2,
    });
    expect(override.error).toBeNull();
    try {
      expect(
        (await buyer.rpc("reveal_listing_contact", { p_public_id: await publicIdOf(adA.id) }))
          .error,
      ).toBeNull();
      expect(
        (await buyer.rpc("reveal_listing_contact", { p_public_id: await publicIdOf(adB.id) }))
          .error,
      ).toBeNull();
      const capped = await buyer.rpc("reveal_listing_contact", {
        p_public_id: await publicIdOf(adC.id),
      });
      expect(capped.error).toBeNull();
      expect(capped.data).toMatchObject({ ok: false, reason: "sellersCapReached" });
      expect(typeof (capped.data as Row)["resets_at"]).toBe("string");
      const flags = async () =>
        (
          await adminClient()
            .from("reveal_flags")
            .select("viewer_id,sellers,hits")
            .eq("viewer_id", buyerPerson.id)
        ).data ?? [];
      expect(await flags()).toEqual([{ viewer_id: buyerPerson.id, sellers: 2, hits: 1 }]);
      const again = await buyer.rpc("reveal_listing_contact", {
        p_public_id: await publicIdOf(adC.id),
      });
      expect((again.data as Row)["reason"]).toBe("sellersCapReached");
      expect((await flags())[0]!["hits"]).toBe(2);
      // A seller already reached never counts against the cap.
      const backToA = await buyer.rpc("reveal_listing_contact", {
        p_public_id: await publicIdOf(adA.id),
      });
      expect(backToA.error).toBeNull();
      expect((backToA.data as Row)["ok"]).toBe(true);
    } finally {
      const removed = await adminClient()
        .from("rate_overrides")
        .delete()
        .eq("user_id", buyerPerson.id)
        .eq("action", "contact_reveal_sellers");
      expect(removed.error).toBeNull();
      const flagsGone = await adminClient()
        .from("reveal_flags")
        .delete()
        .eq("viewer_id", buyerPerson.id);
      expect(flagsGone.error).toBeNull();
      const revealsGone = await adminClient()
        .from("contact_reveals")
        .delete()
        .eq("viewer_id", buyerPerson.id);
      expect(revealsGone.error).toBeNull();
    }
  });

  test("AP-22 a new account is held to five reveals its first day (D201 §6b)", async ({ page }) => {
    const seller = await scratchSeller();
    const buyer = await scratchSeller();
    const asBuyer = await asPerson(buyer);
    const ads = [];
    for (let i = 0; i < 6; i += 1) ads.push(await seed(seller));
    for (let i = 0; i < 5; i += 1) {
      const reached = await asBuyer.rpc("reveal_listing_contact", {
        p_public_id: await publicIdOf(ads[i]!.id),
      });
      expect(reached.error).toBeNull();
      expect((reached.data as Row)["ok"]).toBe(true);
    }
    const sixth = await asBuyer.rpc("reveal_listing_contact", {
      p_public_id: await publicIdOf(ads[5]!.id),
    });
    expect(sixth.error).toBeNull();
    expect(sixth.data).toMatchObject({ ok: false, reason: "rateLimited" });
    const resetsAt = new Date(String((sixth.data as Row)["resets_at"])).getTime();
    const midnight = new Date();
    midnight.setUTCHours(24, 0, 0, 0);
    expect(resetsAt).toBe(midnight.getTime());
    // The seller's page shows the count the buyer's reveals made.
    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, `/my-listings/${ads[0]!.id}`);
    await expect(page.getByTestId("listing-detail-counts")).toContainText("1 contacts");
  });

  test("AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8)", async () => {
    const seller = await scratchSeller();
    const adA = await seed(seller);
    const adB = await seed(seller);
    const adC = await seed(seller);
    const idA = await publicIdOf(adA.id);
    const idB = await publicIdOf(adB.id);
    const idC = await publicIdOf(adC.id);
    const buyerPerson = await leaseUser();
    const buyer = await asPerson(buyerPerson);

    const once = await buyer.rpc("save_listing", { p_public_id: idA });
    expect(once.error).toBeNull();
    expect(once.data).toMatchObject({ ok: true, saved: true, count: 1 });
    const again = await buyer.rpc("save_listing", { p_public_id: idA });
    expect(again.error).toBeNull();
    expect(again.data).toMatchObject({ ok: true, saved: true, count: 1 });
    const rows = await adminClient()
      .from("saved_listings")
      .select("listing_id")
      .eq("user_id", buyerPerson.id)
      .eq("listing_id", adA.id);
    expect(rows.error).toBeNull();
    expect(rows.data).toHaveLength(1);

    const savedA = await buyer.rpc("listing_saved", { p_public_id: idA });
    expect(savedA.error).toBeNull();
    expect(savedA.data).toBe(true);
    const savedB = await buyer.rpc("listing_saved", { p_public_id: idB });
    expect(savedB.error).toBeNull();
    expect(savedB.data).toBe(false);

    const owner = await asPerson(seller);
    const own = await owner.rpc("save_listing", { p_public_id: idA });
    expect(own.error).toBeNull();
    expect(own.data).toMatchObject({ ok: false, reason: "ownListing" });

    for (const id of [idB, idC]) {
      const saved = await buyer.rpc("save_listing", { p_public_id: id });
      expect(saved.error).toBeNull();
      expect(saved.data).toMatchObject({ ok: true, saved: true });
    }
    const page1 = await buyer.rpc("my_saved_listings", { p_after: null, p_size: 2 });
    expect(page1.error).toBeNull();
    const cards1 = (page1.data as Row)["cards"] as Row[];
    expect(cards1).toHaveLength(2);
    expect(cards1.map((card) => card["publicId"])).toEqual([idC, idB]);
    for (const card of cards1) {
      expect(card["title"]).toBeTruthy();
      expect(card["savedAt"]).toBeTruthy();
      expect(card["available"]).toBe(true);
    }
    expect((page1.data as Row)["next"]).not.toBeNull();
    const page2 = await buyer.rpc("my_saved_listings", {
      p_after: (page1.data as Row)["next"],
      p_size: 2,
    });
    expect(page2.error).toBeNull();
    const cards2 = (page2.data as Row)["cards"] as Row[];
    expect(cards2).toHaveLength(1);
    expect(cards2[0]!["publicId"]).toBe(idA);
    expect((page2.data as Row)["next"]).toBeNull();

    const removed = await adminClient()
      .from("listings")
      .update({ status: "removed" })
      .eq("id", adB.id);
    expect(removed.error).toBeNull();
    const grey = await buyer.rpc("my_saved_listings", { p_after: null, p_size: 50 });
    expect(grey.error).toBeNull();
    const greyCard = ((grey.data as Row)["cards"] as Row[]).find(
      (card) => card["publicId"] === idB,
    );
    expect(greyCard).toMatchObject({ id: adB.id, publicId: idB, available: false });
    expect(greyCard!["savedAt"]).toBeTruthy();
    expect("title" in greyCard!).toBe(false);

    const unsaved = await buyer.rpc("unsave_listing", { p_public_id: idB });
    expect(unsaved.error).toBeNull();
    expect(unsaved.data).toMatchObject({ ok: true, saved: false, count: 0 });
    const afterUnsave = await buyer.rpc("my_saved_listings", { p_after: null, p_size: 50 });
    expect(
      ((afterUnsave.data as Row)["cards"] as Row[]).some((card) => card["publicId"] === idB),
    ).toBe(false);

    const sold = await adminClient()
      .from("listings")
      .update({ status: "sold", sold_at: new Date().toISOString() })
      .eq("id", adA.id);
    expect(sold.error).toBeNull();
    const saveSold = await buyer.rpc("save_listing", { p_public_id: idA });
    expect(saveSold.error).toBeNull();
    expect(saveSold.data).toMatchObject({ ok: true, saved: true });

    const draft = await seed(seller, "draft");
    const notPublic = await buyer.rpc("save_listing", {
      p_public_id: await publicIdOf(draft.id),
    });
    expect(notPublic.error).toContain("listingNotAvailable");
    for (const bad of ["2345678923", "nope"]) {
      const answer = await buyer.rpc("save_listing", { p_public_id: bad });
      expect(answer.error).toContain("listingNotAvailable");
    }
    for (const size of [0, 51]) {
      const answer = await buyer.rpc("my_saved_listings", { p_after: null, p_size: size });
      expect(answer.error).toContain("badSize");
    }

    const anonymous = await asAnonymous();
    const doc = await anonymous.rpc("public_listing", { p_public_id: idC });
    expect(doc.error).toBeNull();
    expect(((doc.data as Row)["counts"] as Row)["saves"]).toBe(1);
    expect(((doc.data as Row)["viewer"] as Row)["saved"]).toBe(false);
    const ownerCounts = await owner.rpc("listing_counts", { p_listing_id: adC.id });
    expect(ownerCounts.error).toBeNull();
    expect((ownerCounts.data as Row)["saves"]).toBe(1);
  });

  test("AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8)", async () => {
    const seller = await scratchSeller();
    const adA = await seed(seller);
    const adB = await seed(seller);
    const idA = await publicIdOf(adA.id);
    const idB = await publicIdOf(adB.id);
    const buyerPerson = await leaseUser();
    const buyer = await asPerson(buyerPerson);
    const anonymous = await asAnonymous();

    const seeded = await buyer.rpc("save_listing", { p_public_id: idA });
    expect(seeded.error).toBeNull();
    expect(seeded.data).toMatchObject({ ok: true, saved: true });

    const anonSelect = await anonymous.rest("saved_listings?select=*");
    expect(anonSelect.error !== null || (anonSelect.data as unknown[]).length === 0).toBe(true);
    const buyerSelect = await buyer.rest("saved_listings?select=*");
    expect(buyerSelect.error !== null || (buyerSelect.data as unknown[]).length === 0).toBe(true);
    const truth = await adminClient()
      .from("saved_listings")
      .select("listing_id")
      .eq("user_id", buyerPerson.id);
    expect(truth.error).toBeNull();
    expect(truth.data!.length).toBeGreaterThan(0);
    const anonInsert = await anonymous.insert("saved_listings", {
      user_id: buyerPerson.id,
      listing_id: adA.id,
    });
    expect(anonInsert.error).not.toBeNull();
    const buyerInsert = await buyer.insert("saved_listings", {
      user_id: buyerPerson.id,
      listing_id: adB.id,
    });
    expect(buyerInsert.error).not.toBeNull();

    for (const fn of ["save_listing", "unsave_listing", "listing_saved", "my_saved_listings"]) {
      const answer = await anonymous.rpc(fn, { p_public_id: idA });
      expect(answer.error).toContain("permission denied");
    }

    const dialed = await adminClient().from("rate_overrides").insert({
      user_id: buyerPerson.id,
      action: "save",
      max_count: 1,
    });
    expect(dialed.error).toBeNull();
    try {
      const secondAd = await buyer.rpc("save_listing", { p_public_id: idB });
      expect(secondAd.error).toBeNull();
      expect(secondAd.data).toMatchObject({ ok: true, saved: true });
      const repeat = await buyer.rpc("save_listing", { p_public_id: idB });
      expect(repeat.error).toBeNull();
      expect(repeat.data).toMatchObject({ ok: true, saved: true });
      const adC = await seed(seller);
      const third = await buyer.rpc("save_listing", { p_public_id: await publicIdOf(adC.id) });
      expect(third.error).toBeNull();
      expect((third.data as Row)["ok"]).toBe(false);
      expect((third.data as Row)["reason"]).toBe("rateLimited");
      expect(Number.isNaN(Date.parse(String((third.data as Row)["resets_at"])))).toBe(false);
    } finally {
      const overrideGone = await adminClient()
        .from("rate_overrides")
        .delete()
        .eq("user_id", buyerPerson.id)
        .eq("action", "save");
      expect(overrideGone.error).toBeNull();
      const metersGone = await adminClient().from("rate_limits").delete().eq("key", buyerPerson.id);
      expect(metersGone.error).toBeNull();
      const savesGone = await adminClient()
        .from("saved_listings")
        .delete()
        .eq("user_id", buyerPerson.id);
      expect(savesGone.error).toBeNull();
    }
  });

  test("AP-27 Report by public id: a buyer reports once with a reason and a note; the owner cannot report his own ad; a reason outside the list and a note over 500 characters are refused; a second open report by the same buyer is alreadyReported; a sold ad within its 30 days can be reported; a draft, an unknown or a malformed id cannot; the report dial counts written rows only", async () => {
    const seller = await scratchSeller();
    const adA = await seed(seller);
    const adB = await seed(seller);
    const adC = await seed(seller);
    const draft = await seed(seller, "draft");
    const idA = await publicIdOf(adA.id);
    const idB = await publicIdOf(adB.id);
    const idC = await publicIdOf(adC.id);
    const buyerPerson = await leaseUser();
    reportPeople.push(buyerPerson.id);
    const buyer = await asPerson(buyerPerson);
    const report = (id: string, reason = "scam", note: string | null = null) =>
      buyer.rpc("report_listing", { p_public_id: id, p_reason: reason, p_note: note });
    const truth = async () => {
      const rows = await adminClient()
        .from("listing_reports")
        .select("*")
        .eq("reporter_id", buyerPerson.id)
        .order("id");
      expect(rows.error).toBeNull();
      return rows.data ?? [];
    };
    try {
      const first = await report(idA, "scam", "  looks fake  ");
      expect(first.error).toBeNull();
      expect(first.data).toEqual({ ok: true });
      const home = await adminClient()
        .from("user_directory")
        .select("home_country_code")
        .eq("user_id", buyerPerson.id)
        .single();
      expect(home.error).toBeNull();
      expect(home.data).not.toBeNull();
      const rows = await truth();
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({
        listing_id: adA.id,
        reason: "scam",
        note: "looks fake",
        status: "open",
        home_country_code: home.data?.home_country_code,
      });
      const repeat = await report(idA);
      expect(repeat.error).toBeNull();
      expect(repeat.data).toEqual({ ok: false, reason: "alreadyReported" });
      expect(await truth()).toHaveLength(1);
      const owner = await asPerson(seller);
      const own = await owner.rpc("report_listing", { p_public_id: idA, p_reason: "scam" });
      expect(own.error).toBeNull();
      expect(own.data).toEqual({ ok: false, reason: "ownListing" });
      const badReason = await report(idC, "nonsense");
      expect(badReason.error).toBeNull();
      expect(badReason.data).toEqual({ ok: false, reason: "badReason" });
      const longNote = await report(idC, "other", "x".repeat(501));
      expect(longNote.error).toBeNull();
      expect(longNote.data).toEqual({ ok: false, reason: "noteTooLong" });
      const sold = await adminClient()
        .from("listings")
        .update({ status: "sold", sold_at: new Date().toISOString() })
        .eq("id", adB.id);
      expect(sold.error).toBeNull();
      const soldReport = await report(idB, "alreadySold");
      expect(soldReport.error).toBeNull();
      expect(soldReport.data).toEqual({ ok: true });
      for (const id of [await publicIdOf(draft.id), "2345678923", "nope"]) {
        expect((await report(id)).error).toContain("listingNotAvailable");
      }
      const anonymous = await asAnonymous();
      expect(
        (await anonymous.rpc("report_listing", { p_public_id: idA, p_reason: "spam" })).error,
      ).toContain("permission denied");
      expect(await truth()).toHaveLength(2);
      const override = await adminClient()
        .from("rate_overrides")
        .insert({ user_id: buyerPerson.id, action: "report", max_count: 2 });
      expect(override.error).toBeNull();
      const limited = await report(idC);
      expect(limited.error).toBeNull();
      expect(limited.data).toMatchObject({ ok: false, reason: "rateLimited" });
      const reset = (limited.data as Row)["resets_at"];
      expect(typeof reset).toBe("string");
      expect(String(reset)).toMatch(/^\d{4}-\d{2}-\d{2}T/);
      expect(Number.isNaN(Date.parse(String(reset)))).toBe(false);
      const duplicate = await report(idA);
      expect(duplicate.error).toBeNull();
      expect(duplicate.data).toEqual({ ok: false, reason: "alreadyReported" });
      expect(await truth()).toHaveLength(2);
      const meters = await adminClient()
        .from("rate_limits")
        .select("count")
        .eq("key", buyerPerson.id)
        .eq("action", "report");
      expect(meters.error).toBeNull();
      // rate_gate meters the third (rate-limited) attempt; duplicate and validation refusals never reach it.
      expect(meters.data).toEqual([{ count: 3 }]);
    } finally {
      const removed = await adminClient()
        .from("rate_overrides")
        .delete()
        .eq("user_id", buyerPerson.id)
        .eq("action", "report");
      expect(removed.error).toBeNull();
      const meters = await adminClient().from("rate_limits").delete().eq("key", buyerPerson.id);
      expect(meters.error).toBeNull();
      const reports = await adminClient()
        .from("listing_reports")
        .delete()
        .eq("reporter_id", buyerPerson.id);
      expect(reports.error).toBeNull();
    }
  });

  test("AP-28 who reads the reports: the reporter his own rows, nobody else's; staff with listings:review through the two admin doors; a plain account is refused", async () => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    const publicId = await publicIdOf(ad.id);
    const xPerson = await leaseUser();
    reportPeople.push(xPerson.id);
    const yPerson = await createUser({ confirmed: true });
    reportPeople.push(yPerson.id);
    const x = await asPerson(xPerson);
    const y = await asPerson(yPerson);
    try {
      for (const [person, reason, note] of [
        [x, "spam", "scratch spam"],
        [y, "duplicate", "scratch duplicate"],
      ] as const) {
        const reported = await person.rpc("report_listing", {
          p_public_id: publicId,
          p_reason: reason,
          p_note: note,
        });
        expect(reported.error).toBeNull();
        expect(reported.data).toEqual({ ok: true });
      }
      for (const [person, id, reason] of [
        [x, xPerson.id, "spam"],
        [y, yPerson.id, "duplicate"],
      ] as const) {
        const rows = await person.rest("listing_reports?select=*&order=id");
        expect(rows.error).toBeNull();
        expect(rows.data).toHaveLength(1);
        expect((rows.data as Row[])[0]).toMatchObject({
          reporter_id: id,
          listing_id: ad.id,
          reason,
          status: "open",
        });
      }
      const anonymous = await asAnonymous();
      const anonRows = await anonymous.rest("listing_reports?select=*&order=id");
      expect(
        anonRows.error !== null || (Array.isArray(anonRows.data) && anonRows.data.length === 0),
      ).toBe(true);
      const insert = await x.insert("listing_reports", {
        reporter_id: xPerson.id,
        listing_id: ad.id,
        reason: "other",
      });
      expect(insert.error).toContain("permission denied");
      expect((await x.rpc("admin_listing_reports", { p_listing_id: ad.id })).error).toContain(
        "permission denied",
      );
      expect((await x.rpc("admin_open_report_counts", { p_listing_ids: [ad.id] })).error).toContain(
        "permission denied",
      );
      // X's plain-account checks finish before this held account gains the staff role.
      const holder = await scratchHolder(
        [
          ["listings", "view"],
          ["listings", "review"],
        ],
        xPerson,
      );
      const staff = await asPerson(holder);
      const reports = await staff.rpc("admin_listing_reports", { p_listing_id: ad.id });
      expect(reports.error).toBeNull();
      expect(reports.data).toHaveLength(2);
      const rows = reports.data as Row[];
      expect(rows.map((row) => row["reason"]).sort()).toEqual(["duplicate", "spam"]);
      expect(rows.map((row) => row["note"]).sort()).toEqual(["scratch duplicate", "scratch spam"]);
      for (const row of rows) {
        expect(row["status"]).toBe("open");
        expect(typeof row["createdAt"]).toBe("string");
        expect(Number.isNaN(Date.parse(String(row["createdAt"])))).toBe(false);
        expect(Object.keys(row).sort()).toEqual([
          "closedAt",
          "createdAt",
          "id",
          "note",
          "outcome",
          "reason",
          "status",
        ]);
        expect(Object.prototype.hasOwnProperty.call(row, "reporter_id")).toBe(false);
        expect(Object.prototype.hasOwnProperty.call(row, "reporterId")).toBe(false);
      }
      const counts = await staff.rpc("admin_open_report_counts", { p_listing_ids: [ad.id] });
      expect(counts.error).toBeNull();
      expect(counts.data).toEqual({ [ad.id]: 2 });
      expect(
        (
          await staff.rpc("admin_open_report_counts", {
            p_listing_ids: Array.from({ length: 101 }, () => ad.id),
          })
        ).error,
      ).toContain("badSize");
      const truth = await adminClient()
        .from("listing_reports")
        .select("reporter_id")
        .eq("listing_id", ad.id)
        .order("reporter_id");
      expect(truth.error).toBeNull();
      expect(truth.data?.map((row) => row.reporter_id).sort()).toEqual(
        [xPerson.id, yPerson.id].sort(),
      );
    } finally {
      for (const person of [xPerson, yPerson]) {
        const reports = await adminClient()
          .from("listing_reports")
          .delete()
          .eq("reporter_id", person.id);
        expect(reports.error).toBeNull();
        const meters = await adminClient().from("rate_limits").delete().eq("key", person.id);
        expect(meters.error).toBeNull();
      }
    }
  });
});
