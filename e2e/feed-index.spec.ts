import { createClient } from "@supabase/supabase-js";

import { expect, test } from "./fixtures";
import { adminClient } from "./helpers/users";
import { destroyLocation, scratchSlug, seedScratchChain } from "./helpers/locations";
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
 * Bundle 10 E1 + E2a — THE FEED INDEX (FE-1..FE-14). API only: the service client
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
    if (placeError)
      throw new Error(`[e2e:fe] adding the extra place failed: ${placeError.message}`);

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

  async function sweepUntil(
    listingId: string,
    predicate: (rows: IndexRow[]) => boolean,
  ): Promise<void> {
    await expect
      .poll(async () => {
        const { error } = await adminClient().rpc("feed_reindex_sweep", { p_limit: 500 });
        expect(error).toBeNull();
        return predicate(await rowsOf(listingId));
      })
      .toBe(true);
  }

  async function setListing(listingId: string, patch: Record<string, unknown>): Promise<void> {
    const { error } = await adminClient().from("listings").update(patch).eq("id", listingId);
    expect(error).toBeNull();
  }

  function pairs(categories: string[], places: string[]): string[] {
    return categories.flatMap((c) => places.map((p) => `${c}|${p}`)).sort();
  }

  function pairsOf(rows: IndexRow[]): string[] {
    return rows.map((r) => `${r.category_key}|${r.place_key}`).sort();
  }

  function expectedSets(s: Awaited<ReturnType<typeof seedIndexedListing>>) {
    return {
      categories: [s.leaf.id, s.parent.id, s.guest.id, NIL],
      places: [s.chain.subCity.id, s.chain.city.id, s.chain.region.id, s.chain.anchor.id, NIL],
    };
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

  test("FE-6 a listing written active is indexed by itself", async () => {
    const s = await seedIndexedListing();
    const { categories, places } = expectedSets(s);
    expect(pairsOf(await rowsOf(s.listingId))).toEqual(pairs(categories, places));
    const result = await check(s.listingId);
    expect(result["active_without_rows"]).toBe(0);
    expect(result["listings_with_wrong_rows"]).toBe(0);
  });

  test("FE-7 leaving active removes the rows and returning restores them", async () => {
    const s = await seedIndexedListing();
    const { categories, places } = expectedSets(s);
    await setListing(s.listingId, { status: "expired" });
    expect(await rowsOf(s.listingId)).toEqual([]);
    await setListing(s.listingId, { status: "active" });
    expect(pairsOf(await rowsOf(s.listingId))).toEqual(pairs(categories, places));
    const earlier = new Date(Date.now() - 60_000).toISOString();
    await setListing(s.listingId, { published_at: earlier });
    const rows = await rowsOf(s.listingId);
    expect(rows.length).toBe(categories.length * places.length);
    for (const row of rows) expect(Date.parse(row.published_at)).toBe(Date.parse(earlier));
  });

  test("FE-8 the tier sets the rank", async () => {
    const s = await seedIndexedListing();
    const { categories, places } = expectedSets(s);
    for (const [tier, rank] of [
      ["premium", 2],
      ["featured", 1],
      ["regular", 0],
    ] as const) {
      await setListing(s.listingId, { tier });
      const rows = await rowsOf(s.listingId);
      expect(pairsOf(rows)).toEqual(pairs(categories, places));
      for (const row of rows) expect(row.tier_rank).toBe(rank);
    }
  });

  test("FE-9 an extra place removed or added changes the rows", async () => {
    const s = await seedIndexedListing();
    const { categories, places } = expectedSets(s);
    const removed = await adminClient()
      .from("listing_locations")
      .delete()
      .eq("listing_id", s.listingId)
      .eq("location_id", s.chain.subCity.id);
    expect(removed.error).toBeNull();
    expect(pairsOf(await rowsOf(s.listingId))).toEqual(
      pairs(categories, [s.chain.city.id, s.chain.region.id, s.chain.anchor.id, NIL]),
    );
    const added = await adminClient()
      .from("listing_locations")
      .insert({ listing_id: s.listingId, location_id: s.chain.subCity.id });
    expect(added.error).toBeNull();
    expect(pairsOf(await rowsOf(s.listingId))).toEqual(pairs(categories, places));
  });

  test("FE-10 a category surfaced under a new parent is re-indexed by the sweep", async () => {
    const s = await seedIndexedListing();
    const { places } = expectedSets(s);
    const supabase = adminClient();
    const xSlug = scratchCategorySlug();
    branches[branches.length - 1]!.push(xSlug);
    const { data: x, error: xError } = await supabase
      .from("categories")
      .insert({
        slug: xSlug,
        name_en: xSlug,
        is_active: true,
        allow_listings: false,
        is_catchall: false,
        display_order: 9103,
      })
      .select("id")
      .single();
    if (xError || !x)
      throw new Error(`[e2e:fe-10] seeding X failed: ${xError?.message ?? "no row"}`);
    const before = await supabase
      .from("feed_reindex_runs")
      .select("id")
      .order("id", { ascending: false })
      .limit(1);
    expect(before.error).toBeNull();
    const { error: pointerError } = await supabase
      .from("category_tree_pointers")
      .insert({ parent_id: x.id, child_id: s.leaf.id, display_order: 3 });
    expect(pointerError).toBeNull();

    await sweepUntil(s.listingId, (rows) => {
      const have = new Set(pairsOf(rows));
      return places.every((p) => have.has(`${x.id}|${p}`));
    });
    const { data: runs, error: runsError } = await supabase
      .from("feed_reindex_runs")
      .select("id")
      .gt("id", before.data?.[0]?.id ?? 0)
      .limit(1);
    expect(runsError).toBeNull();
    expect((runs ?? []).length).toBe(1);
  });

  test("FE-11 a city moved to another region is re-indexed by the sweep", async () => {
    const s = await seedIndexedListing();
    const { categories } = expectedSets(s);
    const supabase = adminClient();
    const r2Slug = scratchSlug("fe-region");
    regions.push(r2Slug);
    const { data: r2, error: r2Error } = await supabase
      .from("locations")
      .insert({
        parent_id: s.chain.anchor.id,
        level: "region",
        country_code: "ET",
        slug: r2Slug,
        name_en: r2Slug,
        is_active: true,
        source: "admin",
      })
      .select("id")
      .single();
    if (r2Error || !r2)
      throw new Error(`[e2e:fe-11] seeding R2 failed: ${r2Error?.message ?? "no row"}`);
    const moved = await supabase
      .from("locations")
      .update({ parent_id: r2.id })
      .eq("id", s.chain.city.id);
    expect(moved.error).toBeNull();

    await sweepUntil(s.listingId, (rows) => {
      const have = new Set(rows.filter((r) => r.place_key === r2.id).map((r) => r.category_key));
      return (
        categories.every((c) => have.has(c)) && !rows.some((r) => r.place_key === s.chain.region.id)
      );
    });
  });

  test("FE-12 the reviewer's door to active indexes the listing", async () => {
    const s = await seedIndexedListing();
    const { categories } = expectedSets(s);
    const id = await insertListing(s.seller.id, s.leaf.id, s.chain.city.id, "screening", null);
    expect(await rowsOf(id)).toEqual([]);
    const opened = await adminClient().rpc("transition_listing", {
      p_listing_id: id,
      p_new_status: "active",
    });
    expect(opened.error, JSON.stringify(opened.error)).toBeNull();
    const rows = await rowsOf(id);
    expect(pairsOf(rows)).toEqual(
      pairs(categories, [s.chain.city.id, s.chain.region.id, s.chain.anchor.id, NIL]),
    );
    const { data: stored, error } = await adminClient()
      .from("listings")
      .select("published_at")
      .eq("id", id)
      .single();
    if (error || !stored?.published_at) throw new Error("[e2e:fe-12] no stored publish time");
    for (const row of rows)
      expect(Date.parse(row.published_at)).toBe(Date.parse(stored.published_at));
  });

  test("FE-13 the daily check writes its counts", async () => {
    const before = await adminClient()
      .from("feed_index_check_runs")
      .select("id")
      .order("id", { ascending: false })
      .limit(1);
    expect(before.error).toBeNull();
    const { data, error } = await adminClient().rpc("feed_index_check_sweep");
    expect(error).toBeNull();
    const result = data as Record<string, number>;
    for (const key of [
      "active_listings",
      "active_without_published_at",
      "active_without_rows",
      "rows_for_inactive",
      "listings_with_wrong_rows",
      "queued",
    ])
      expect(result).toHaveProperty(key);
    const { data: runs, error: runsError } = await adminClient()
      .from("feed_index_check_runs")
      .select("id")
      .gt("id", before.data?.[0]?.id ?? 0)
      .limit(1);
    expect(runsError).toBeNull();
    expect((runs ?? []).length).toBe(1);
  });

  test("FE-14 browsers cannot read the queue, the heartbeats or call the new functions", async () => {
    const anon = createClient(
      process.env["E2E_SUPABASE_URL"]!,
      process.env["E2E_SUPABASE_PUBLISHABLE_KEY"]!,
      { auth: { persistSession: false } },
    );
    for (const table of ["feed_reindex_queue", "feed_reindex_runs", "feed_index_check_runs"]) {
      const read = await anon.from(table).select("*").limit(1);
      expect(read.error, table).not.toBeNull();
    }
    const swept = await anon.rpc("feed_reindex_sweep", { p_limit: 1 });
    expect(swept.error).not.toBeNull();
    const checked = await anon.rpc("feed_index_check_sweep");
    expect(checked.error).not.toBeNull();
    const ranked = await anon.rpc("feed_tier_rank", { p_tier: "regular" });
    expect(ranked.error).not.toBeNull();
  });
});
