import { adminClient } from "./users";
import { destroyLocation, seedScratchChain, waitForServedTree } from "./locations";
import {
  destroyCategoryBranch,
  destroyListingsOf,
  leaseSeller,
  RUN,
  seedCategoryBranch,
} from "./posting";
import jpeg from "jpeg-js";
import { fixture, BUCKET } from "./photos";

type Row = Record<string, unknown>;

/** Letters only: never mistaken for a contact number. */
export function token(): string {
  return Math.random()
    .toString(36)
    .slice(2, 10)
    .replace(/[0-9]/g, (digit) => "abcdefghij"[Number(digit)] ?? "x");
}
const DAY = 86_400_000;
const days = (n: number) => new Date(Date.now() + n * DAY).toISOString();

/** Per-test scratch ownership; callers install cleanup in afterEach (including timeouts). */
export function adPageFixtures() {
  const sellers: string[] = [];
  const listingIds: string[] = [];
  const regions: string[] = [];
  const branches: string[][] = [];
  const rateTokens: string[] = [];

  const storageKeys: string[] = [];

  async function cleanup() {
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
    if (storageKeys.length) {
      const removed = await supabase.storage.from(BUCKET).remove(storageKeys.splice(0));
      if (removed.error)
        throw new Error(`[e2e:ap] photo object reap failed: ${removed.error.message}`);
    }
  }

  /** A scratch seller with a public name and its own category branch and place. */
  async function scratchSeller() {
    const seller = await leaseSeller({ alias: true, named: true });
    sellers.push(seller.id);
    const { parent, leaf } = await seedCategoryBranch();
    branches.push([parent.slug as string, leaf.slug as string]);
    const chain = await seedScratchChain("ET");
    regions.push(chain.region.slug as string);
    // INC-797 — the route serves its tree from a 15-second copy: wait until it carries this chain (J7)
    await waitForServedTree("ET", chain.subCity.slug as string);
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
      attributes?: Row;
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
        attributes: options.attributes ?? {},
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

  /** Two actual stored images, readable through the unchanged public photo-links route. */
  async function seedPhotos(listingId: string, count = 2) {
    const supabase = adminClient();
    /* Census (bundle 19 turn 25): listing_photos' only uniqueness is
      (listing_id, display_order) — storage_path is not unique, so the rows of
      one ad may share one uploaded image; upload once. */
    const key = `e2e-${RUN}/ad-page-${token()}.jpg`;
    const uploaded = await supabase.storage
      .from(BUCKET)
      .upload(key, jpeg.encode(jpeg.decode(fixture("gps.jpg")), 80).data, {
        contentType: "image/jpeg",
      });
    if (uploaded.error) throw new Error(`[e2e:ap] photo upload failed: ${uploaded.error.message}`);
    storageKeys.push(key);
    const path = { partition: "default", key };
    for (let displayOrder = 0; displayOrder < count; displayOrder++) {
      const inserted = await supabase.from("listing_photos").insert({
        listing_id: listingId,
        storage_path: key,
        display_order: displayOrder,
        exif_stripped: true,
        unscreened: false,
        paths: { card: path, thumb: path, cover: path },
      });
      if (inserted.error) throw new Error(`[e2e:ap] photo seed failed: ${inserted.error.message}`);
    }
  }
  return { scratchSeller, seed, publicIdOf, seedPhotos, cleanup, listingIds, rateTokens };
}
