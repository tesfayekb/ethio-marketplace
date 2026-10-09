import { createClient } from "@supabase/supabase-js";

import { expect, test } from "./fixtures";
import { adminClient } from "./helpers/users";
import { destroyLocation, seedScratchChain } from "./helpers/locations";
import {
  leaseSeller,
  seedCategoryBranch,
  destroyCategoryBranch,
  destroyListingsOf,
  scratchCategorySlug,
  rand,
  RUN,
} from "./helpers/posting";

/**
 * Bundle 10 E1 — THE FEED INDEX (FE-1..FE-5). API only: the service client
 * seeds scratch rows and calls the service-role functions; one anonymous
 * client proves the browser roles are refused. Cleanup in afterEach (J3).
 */

const NIL = "00000000-0000-0000-0000-000000000000";

type IndexRow = {
  category_key: string;
  place_key: string;
  tier_rank: number;
  published_at: string;
};

test.describe("FEED INDEX", () => {
  const sellers: string[] = [];
  const regions: string[] = [];
  const branches: string[][] = [];

  test.afterEach(async () => {
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const slug of regions.splice(0)) await destroyLocation(slug);
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
  });

  async function insertListing(
    sellerId: string,
    categoryId: string,
    locationId: string,
    status: string,
    publishedAt: string | null,
  ): Promise<string> {
    const { data, error } = await adminClient()
      .from("listings")
      .insert({
        category_id: categoryId,
        seller_id: sellerId,
        location_id: locationId,
        home_country_code: "ET",
        title: `e2e-feed-${RUN}-${rand()}`,
        description: "e2e scratch listing for the feed index",
        status,
        published_at: publishedAt,
      })
      .select("id")
      .single();
    if (error || !data) {
      throw new Error(`[e2e:fe] seeding the listing failed: ${error?.message ?? "no row"}`);
    }
    return data.id;
  }

  async function seedIndexedListing() {
    const supabase = adminClient();
    const seller = await leaseSeller();
    sellers.push(seller.id);

    const { parent, leaf } = await seedCategoryBranch();
    const branch = [parent.slug, leaf.slug];
    branches.push(branch);

    const guestSlug = scratchCategorySlug();
    branch.push(guestSlug);
    const { data: guest, error: guestError } = await supabase
      .from("categories")
      .insert({
        slug: guestSlug,
        name_en: guestSlug,
        is_active: true,
        allow_listings: false,
        is_catchall: false,
        display_order: 9102,
      })
      .select("id, slug")
      .single();
    if (guestError || !guest) {
      throw new Error(`[e2e:fe] seeding the guest failed: ${guestError?.message ?? "no row"}`);
    }
    const { error: pointerError } = await supabase
      .from("category_tree_pointers")
      .insert({ parent_id: guest.id, child_id: leaf.id, display_order: 2 });
    if (pointerError) throw new Error(`[e2e:fe] linking the guest failed: ${pointerError.message}`);

    const chain = await seedScratchChain("ET");
    regions.push(chain.region.slug);

    const listingId = await insertListing(
      seller.id,
      leaf.id,
      chain.city.id,
      "active",
      new Date().toISOString(),
    );
    const { error: placeError } = await supabase
      .from("listing_locations")
      .insert({ listing_id: listingId, location_id: chain.subCity.id });
    if (placeError) throw new Error(`[e2e:fe] adding the extra place failed: ${placeError.message}`);

    return { seller, parent, leaf, guest, chain, listingId };
  }

  async function refresh(listingId: string): Promise<number> {
    const { data, error } = await adminClient().rpc("feed_index_refresh", {
      p_listing_id: listingId,
    });
    expect(error).toBeNull();
    return data as number;
  }

  async function rowsOf(listingId: string): Promise<IndexRow[]> {
    const { data, error } = await adminClient()
      .from("feed_index")
      .select("category_key, place_key, tier_rank, published_at")
      .eq("listing_id", listingId);
    if (error) throw new Error(`[e2e:fe] reading the index failed: ${error.message}`);
    return (data ?? []) as IndexRow[];
  }

  async function check(listingId: string): Promise<Record<string, number>> {
    const { data, error } = await adminClient().rpc("feed_index_check", {
      p_listing_id: listingId,
    });
    expect(error).toBeNull();
    return data as Record<string, number>;
  }

  test("FE-1 the refresh writes one row per category key and place key", async () => {
    const s = await seedIndexedListing();
    const categories = [s.leaf.id, s.parent.id, s.guest.id, NIL];
    const places = [s.chain.subCity.id, s.chain.city.id, s.chain.region.id, s.chain.anchor.id, NIL];

    expect(await refresh(s.listingId)).toBe(categories.length * places.length);

    const rows = await rowsOf(s.listingId);
    const expected = categories.flatMap((c) => places.map((p) => `${c}|${p}`)).sort();
    expect(rows.map((r) => `${r.category_key}|${r.place_key}`).sort()).toEqual(expected);
    for (const row of rows) expect(row.tier_rank).toBe(0);

    const { data: stored, error } = await adminClient()
      .from("listings")
      .select("published_at")
      .eq("id", s.listingId)
      .single();
    if (error || !stored?.published_at) throw new Error("[e2e:fe-1] no stored publish time");
    const at = Date.parse(stored.published_at);
    for (const row of rows) expect(Date.parse(row.published_at)).toBe(at);
  });

  test("FE-2 a listing that is not active gets no rows", async () => {
    const s = await seedIndexedListing();
    const draftId = await insertListing(s.seller.id, s.leaf.id, s.chain.city.id, "draft", null);
    expect(await refresh(draftId)).toBe(0);
    expect(await rowsOf(draftId)).toEqual([]);
  });

  test("FE-3 deleting a listing removes its rows", async () => {
    const s = await seedIndexedListing();
    expect(await refresh(s.listingId)).toBeGreaterThan(0);
    await destroyListingsOf(s.seller.id);
    expect(await rowsOf(s.listingId)).toEqual([]);
  });

  test("FE-4 the check reads one listing's rows", async () => {
    const s = await seedIndexedListing();
    await refresh(s.listingId);
    let result = await check(s.listingId);
    expect(result["active_listings"]).toBe(1);
    expect(result["active_without_rows"]).toBe(0);
    expect(result["listings_with_wrong_rows"]).toBe(0);

    const one = await adminClient()
      .from("feed_index")
      .delete()
      .eq("listing_id", s.listingId)
      .eq("category_key", s.guest.id)
      .eq("place_key", s.chain.city.id);
    expect(one.error).toBeNull();
    result = await check(s.listingId);
    expect(result["listings_with_wrong_rows"]).toBe(1);

    await refresh(s.listingId);
    result = await check(s.listingId);
    expect(result["listings_with_wrong_rows"]).toBe(0);

    const all = await adminClient().from("feed_index").delete().eq("listing_id", s.listingId);
    expect(all.error).toBeNull();
    result = await check(s.listingId);
    expect(result["active_without_rows"]).toBe(1);
    expect(result["listings_with_wrong_rows"]).toBe(0);
  });

  test("FE-5 browsers cannot read the index or call its functions", async () => {
    const anon = createClient(
      process.env["E2E_SUPABASE_URL"]!,
      process.env["E2E_SUPABASE_PUBLISHABLE_KEY"]!,
      { auth: { persistSession: false } },
    );
    const read = await anon.from("feed_index").select("listing_id").limit(1);
    expect(read.error).not.toBeNull();

    const keys = await anon.rpc("feed_keys", { p_category_id: NIL, p_location_ids: [NIL] });
    expect(keys.error).not.toBeNull();
    const refreshed = await anon.rpc("feed_index_refresh", { p_listing_id: NIL });
    expect(refreshed.error).not.toBeNull();
    const checked = await anon.rpc("feed_index_check", { p_listing_id: NIL });
    expect(checked.error).not.toBeNull();
  });
});
