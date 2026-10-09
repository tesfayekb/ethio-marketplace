import { createClient } from "@supabase/supabase-js";
import type { APIRequestContext } from "@playwright/test";

import { expect, test } from "./fixtures";
import { adminClient } from "./helpers/users";
import { destroyLocation, scratchSlug, seedScratchChain } from "./helpers/locations";
import {
  leaseSeller,
  seedCategoryBranch,
  destroyCategoryBranch,
  destroyListingsOf,
  rand,
  RUN,
} from "./helpers/posting";

/**
 * Bundle 10 E2b — THE READ DOOR /api/feed (FR-1..FR-8). The route is called with
 * Playwright's `request` fixture; the service client seeds scratch rows; one
 * anonymous client proves a browser may call feed_page but not read the index.
 * Cleanup in afterEach (J3).
 */

type Tier = "premium" | "featured" | "regular";
const RANK: Record<Tier, number> = { premium: 2, featured: 1, regular: 0 };

type Seeded = { id: string; tier: Tier; minutesAgo: number };
type Card = Record<string, unknown> & { id: string; step: number };
type FeedBody = {
  cards: Card[];
  ladder: string[];
  steps: { step: number; placeId: string; shown: number }[];
  next: string | null;
  error?: string;
};

/** Tier first, then newest — built from what the test seeded. */
function ordered(rows: Seeded[]): string[] {
  return [...rows]
    .sort((a, b) => RANK[b.tier] - RANK[a.tier] || a.minutesAgo - b.minutesAgo)
    .map((r) => r.id);
}

test.describe("FEED ROUTE", () => {
  const sellers: string[] = [];
  const regions: string[] = [];
  const branches: string[][] = [];

  test.afterEach(async () => {
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const slug of regions.splice(0)) await destroyLocation(slug);
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
  });

  async function seedPage() {
    const seller = await leaseSeller();
    sellers.push(seller.id);
    const { parent, leaf } = await seedCategoryBranch();
    branches.push([parent.slug, leaf.slug]);
    const chain = await seedScratchChain("ET");
    regions.push(chain.region.slug);

    const slug = scratchSlug("fr-city");
    const { data: c2, error } = await adminClient()
      .from("locations")
      .insert({
        parent_id: chain.region.id,
        level: "city",
        country_code: "ET",
        slug,
        name_en: slug,
        is_active: true,
        source: "admin",
        center_lat: 9.04,
        center_lng: 38.75,
      })
      .select("id")
      .single();
    if (error || !c2) throw new Error(`[e2e:fr] seeding C2 failed: ${error?.message ?? "no row"}`);
    return { seller, parent, leaf, chain, c2: { id: c2.id as string } };
  }

  type Seed = Awaited<ReturnType<typeof seedPage>>;

  async function addListing(
    seed: Seed,
    { place, tier, minutesAgo }: { place: string; tier: Tier; minutesAgo: number },
  ): Promise<Seeded> {
    const { data, error } = await adminClient()
      .from("listings")
      .insert({
        category_id: seed.leaf.id,
        seller_id: seed.seller.id,
        location_id: place,
        home_country_code: "ET",
        title: `e2e-feed-${RUN}-${rand()}`,
        description: "e2e scratch listing for the feed route",
        status: "active",
        tier,
        published_at: new Date(Date.now() - minutesAgo * 60_000).toISOString(),
      })
      .select("id")
      .single();
    if (error || !data) {
      throw new Error(`[e2e:fr] seeding the listing failed: ${error?.message ?? "no row"}`);
    }
    return { id: data.id as string, tier, minutesAgo };
  }

  async function getFeed(
    request: APIRequestContext,
    params: { category?: string; place?: string; size?: string; after?: string },
  ) {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v !== undefined) q.set(k, v);
    const response = await request.get(`/api/feed?${q.toString()}`);
    return {
      status: response.status(),
      cacheControl: response.headers()["cache-control"] ?? "",
      body: (await response.json()) as FeedBody,
    };
  }

  async function seedCityFive(seed: Seed): Promise<Seeded[]> {
    const city = seed.chain.city.id;
    const rows: Seeded[] = [];
    for (const [tier, minutesAgo] of [
      ["regular", 60],
      ["regular", 300],
      ["featured", 540],
      ["premium", 1200],
      ["premium", 600],
    ] as [Tier, number][]) {
      rows.push(await addListing(seed, { place: city, tier, minutesAgo }));
    }
    return rows;
  }

  test("FR-1 a page lists premium, then featured, then regular, newest first in each", async ({
    request,
  }) => {
    const seed = await seedPage();
    const five = await seedCityFive(seed);
    const r = await getFeed(request, { category: seed.leaf.id, place: seed.chain.city.id });
    expect(r.status).toBe(200);
    expect(r.body.cards.map((c) => c.id)).toEqual(ordered(five));
  });

  test("FR-2 a category's page holds its whole branch", async ({ request }) => {
    const seed = await seedPage();
    const five = await seedCityFive(seed);
    const r = await getFeed(request, { category: seed.parent.id, place: seed.chain.city.id });
    expect(r.status).toBe(200);
    expect(r.body.cards.map((c) => c.id)).toEqual(ordered(five));
  });

  test("FR-3 the chosen place comes first, then the wider place", async ({ request }) => {
    const seed = await seedPage();
    const five = await seedCityFive(seed);
    const far = await addListing(seed, { place: seed.c2.id, tier: "premium", minutesAgo: 30 });
    const r = await getFeed(request, { category: seed.leaf.id, place: seed.chain.city.id });
    expect(r.status).toBe(200);
    expect(r.body.cards.map((c) => c.id)).toEqual([...ordered(five), far.id]);
    expect(r.body.ladder.slice(0, 2)).toEqual([seed.chain.city.id, seed.chain.region.id]);
    expect(r.body.steps.map((s) => ({ step: s.step, shown: s.shown }))).toEqual([
      { step: 1, shown: 5 },
      { step: 2, shown: 1 },
    ]);
    const steps = r.body.cards.map((c) => c.step);
    expect(steps).toEqual([...five.map(() => 1), 2]);
  });

  test("FR-4 a place with 8 listings does not widen", async ({ request }) => {
    const seed = await seedPage();
    const city = seed.chain.city.id;
    const five = await seedCityFive(seed);
    const far = await addListing(seed, { place: seed.c2.id, tier: "premium", minutesAgo: 30 });
    const three: Seeded[] = [];
    for (const minutesAgo of [120, 180, 240]) {
      three.push(await addListing(seed, { place: city, tier: "regular", minutesAgo }));
    }
    const r = await getFeed(request, { category: seed.leaf.id, place: city });
    expect(r.status).toBe(200);
    const ids = r.body.cards.map((c) => c.id);
    expect(ids).toEqual(ordered([...five, ...three]));
    expect(r.body.ladder).toHaveLength(1);
    expect(ids).not.toContain(far.id);
  });

  test("FR-5 paging continues after the last card without repeats", async ({ request }) => {
    const seed = await seedPage();
    const five = await seedCityFive(seed);
    const far = await addListing(seed, { place: seed.c2.id, tier: "premium", minutesAgo: 30 });
    const seen: string[] = [];
    let after: string | undefined;
    for (let call = 0; call < 10; call += 1) {
      const r = await getFeed(request, {
        category: seed.leaf.id,
        place: seed.chain.city.id,
        size: "2",
        after,
      });
      expect(r.status).toBe(200);
      seen.push(...r.body.cards.map((c) => c.id));
      if (r.body.next === null) break;
      after = r.body.next;
    }
    expect(seen).toEqual([...ordered(five), far.id]);
    expect(new Set(seen).size).toBe(seen.length);
  });

  test("FR-6 the answer is public and carries no seller", async ({ request }) => {
    const seed = await seedPage();
    await seedCityFive(seed);
    const r = await getFeed(request, { category: seed.leaf.id, place: seed.chain.city.id });
    expect(r.status).toBe(200);
    expect(r.cacheControl).toBe("public, max-age=60, stale-while-revalidate=300");
    const keys = [
      "id",
      "title",
      "priceAmount",
      "priceCurrency",
      "priceMode",
      "priceBp",
      "priceNegotiable",
      "pricePeriod",
      "priceUnit",
      "priceUnitText",
      "photosSoon",
      "tier",
      "publishedAt",
      "categoryId",
      "locationId",
      "locationNameEn",
      "locationNameAm",
      "step",
    ].sort();
    expect(r.body.cards.length).toBeGreaterThan(0);
    for (const card of r.body.cards) expect(Object.keys(card).sort()).toEqual(keys);
  });

  test("FR-7 bad input is refused honestly", async ({ request }) => {
    const cases: [Record<string, string>, number][] = [
      [{ category: "not-a-uuid" }, 400],
      [{ size: "0" }, 400],
      [{ size: "51" }, 400],
      [{ after: "garbage" }, 400],
      [{ category: crypto.randomUUID() }, 404],
      [{ place: crypto.randomUUID() }, 404],
    ];
    for (const [params, status] of cases) {
      const r = await getFeed(request, params);
      expect(r.status, JSON.stringify(params)).toBe(status);
      expect(r.cacheControl, JSON.stringify(params)).toBe("no-store");
    }
  });

  test("FR-8 a browser may call the read door but not read the index", async () => {
    const seed = await seedPage();
    const anon = createClient(
      process.env["E2E_SUPABASE_URL"]!,
      process.env["E2E_SUPABASE_PUBLISHABLE_KEY"]!,
      { auth: { persistSession: false } },
    );
    const page = await anon.rpc("feed_page", {
      p_category_id: seed.leaf.id,
      p_location_id: seed.chain.city.id,
    });
    expect(page.error).toBeNull();
    const read = await anon.from("feed_index").select("listing_id").limit(1);
    expect(read.error).not.toBeNull();
  });
});
