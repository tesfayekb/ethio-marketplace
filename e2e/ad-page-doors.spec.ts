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
import { adminClient, leaseUser } from "./helpers/users";

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

test.describe("AD PAGE DOORS — M1 (bundle 19 turn 4)", () => {
  const sellers: string[] = [];
  const listingIds: string[] = [];
  const regions: string[] = [];
  const branches: string[][] = [];
  const rateTokens: string[] = [];

  test.afterEach(async () => {
    const supabase = adminClient();
    for (const id of listingIds.splice(0)) {
      const removed = await supabase.from("listings").delete().eq("id", id);
      if (removed.error) throw new Error(`[e2e:ap] listing reap failed: ${removed.error.message}`);
    }
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const slug of regions.splice(0)) await destroyLocation(slug);
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
    for (const key of rateTokens.splice(0)) {
      const swept = await supabase.from("rate_limits").delete().like("key", `%${key}%`);
      if (swept.error) throw new Error(`[e2e:ap] rate row reap failed: ${swept.error.message}`);
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
    if (error || !profile) throw new Error(`[e2e:ap] reading the alias failed: ${error?.message}`);
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
   * A scratch ad in the shape of my-listings-doors' seed, with the extra columns
   * each test names. Times are days from now. Unless told otherwise: active,
   * published 2 days ago, expiring in 28, contact { messages: true }.
   */
  async function seed(
    seller: Pick<Seller, "id" | "leafId" | "cityId">,
    status = "active",
    options: {
      publishedAt?: number;
      expiresAt?: number;
      soldAt?: number;
      contactPref?: Row;
      pin?: boolean;
    } = {},
  ) {
    const live = ["active", "reduced", "expired", "sold", "removed", "closed"].includes(status);
    const published = options.publishedAt ?? -2;
    const { data, error } = await adminClient()
      .from("listings")
      .insert({
        category_id: seller.leafId,
        seller_id: seller.id,
        location_id: seller.cityId,
        home_country_code: "ET",
        title: `E2E ad page ${RUN.replace(/[0-9]/g, "x")} ${token()}`,
        description: "e2e scratch listing for the ad page's doors",
        attributes: {},
        price_mode: "fixed",
        price_amount: 100,
        price_currency: "ETB",
        price_period: "once",
        price_set_at: days(published),
        contact_pref: options.contactPref ?? { messages: true },
        status,
        tier: "regular",
        published_at: live ? days(published) : null,
        published_first_at: live ? days(published) : null,
        expires_at: live ? days(options.expiresAt ?? 28) : null,
        sold_at: status === "sold" ? days(options.soldAt ?? -1) : null,
        ...(options.pin === true
          ? {
              pin_lat: 8.9876543,
              pin_lng: 38.7612345,
              pin_precision: "approx",
              pin_show_lat: 8.99,
              pin_show_lng: 38.76,
              pin_zoom: 14,
              street_address: "E2E street",
            }
          : {}),
      })
      .select("id,title,status")
      .single();
    if (error || !data) throw new Error(`[e2e:ap] seeding failed: ${error?.message ?? "no row"}`);
    const row = data as unknown as Row & { id: string; title: string };
    listingIds.push(row.id);
    const located = await adminClient()
      .from("listing_locations")
      .insert({ listing_id: row.id, location_id: seller.cityId, position: 1 });
    if (located.error) throw new Error(`[e2e:ap] coverage failed: ${located.error.message}`);
    return row;
  }

  /** The ad's public id, read as DB truth through the service client. */
  async function publicIdOf(listingId: string): Promise<string> {
    const { data, error } = await adminClient()
      .from("listings")
      .select("public_id")
      .eq("id", listingId)
      .single();
    if (error || !data) throw new Error(`[e2e:ap] public id read failed: ${error?.message}`);
    return data.public_id as string;
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
    expect(unsigned.error).toBe("not authenticated");
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
});
