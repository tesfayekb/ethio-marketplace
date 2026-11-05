import { adminClient } from "./users";

/**
 * P-2 (a) ruling 13 item 4 (D318, CF-SLOT-1) — THE ONE SERVICE-ROLE SEEDER OF
 * LISTING ROWS. The free-slot law lives at the table (`listings_free_slot_guard`,
 * 20261105080111): a row entering the counted baseline set — status screening,
 * held, active or reduced at the baseline level, placed in a market — is refused
 * `noFreeSlot` once the seller's OTHER counted baseline ads in that market reach
 * `market_settings_for(country).free_regular_ads`. A spec's scratch rows obey
 * the same law (§7: no test-only switch on a production path), so this helper
 * reads the seller's room BEFORE the INSERT, through the same readers the guard
 * uses (`baseline_level_key`, `market_settings_for`, `seller_regular_live`), and
 * either seeds an ad beyond the free slots at the first level ABOVE the baseline
 * (`beyondFreeSlots: "level"` — a seller with more live ads than free slots holds
 * levels, the realistic state) or fails at the seeding line with the law's
 * words, so the spec spreads its ads over more scratch sellers or seeds them in
 * a status that does not count. The pre-read makes a spec's rows the same
 * whether or not the guard is applied where it runs; the guard then agrees.
 *
 * Every service-role INSERT into `listings` in e2e goes through `seedListingRow`
 * or `seedListingRows`; a spec never writes the table's INSERT itself.
 *
 * Ruling 14 item 1 (INC-1061) — the law fires on INSERT OR UPDATE OF status, tier,
 * so the same holds for a write on an existing row: `updateListingRow` is the ONE
 * service-role UPDATE of `listings` in e2e. It reads the row first; a patch that
 * brings it INTO the counted baseline set beyond the seller's free slots is
 * refused at the line or moved to the level above the baseline, by the same rule;
 * a patch into a status that does not count, or one that leaves the row where it
 * was, is written as given. CF-SEED-1 (scripts/conformance/listing-seed.test.ts)
 * judges both writers.
 */

/** The statuses the free-slot law counts (listings_free_slot_guard). */
export const COUNTED_STATUSES: readonly string[] = ["screening", "held", "active", "reduced"];

type Row = Record<string, unknown>;

export type SeedListingOptions = {
  /** The spec's tag in error messages (`[e2e:<tag>]`). */
  tag: string;
  /** Columns read back besides `id` and `tier`. */
  select?: string;
  /**
   * A counted baseline ad beyond the seller's free slots in its market:
   * `"level"` seeds it at the first enabled level above the baseline;
   * `"refuse"` (the default) throws at the seeding line.
   */
  beyondFreeSlots?: "level" | "refuse";
};

export type SeededListing = Row & { id: string; tier: string };

let baselinePromise: Promise<string> | undefined;
let abovePromise: Promise<string> | undefined;

/** The baseline level's key, read once per process through the guard's own reader. */
export async function baselineLevelKey(): Promise<string> {
  baselinePromise ??= (async () => {
    const { data, error } = await adminClient().rpc("baseline_level_key");
    if (error || typeof data !== "string" || data === "") {
      baselinePromise = undefined;
      throw new Error(`[e2e:seed] baseline_level_key failed: ${error?.message ?? String(data)}`);
    }
    return data;
  })();
  return baselinePromise;
}

/** The first enabled level above the baseline, in the catalog's own order (`sort`). */
export async function levelAboveBaseline(): Promise<string> {
  abovePromise ??= (async () => {
    const { data, error } = await adminClient()
      .from("listing_packages")
      .select("key")
      .eq("kind", "level")
      .eq("enabled", true)
      .eq("is_baseline", false)
      .order("sort", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (error || !data) {
      abovePromise = undefined;
      throw new Error(`[e2e:seed] no level above the baseline: ${error?.message ?? "no row"}`);
    }
    return data.key as string;
  })();
  return abovePromise;
}

/** The market of a placed row: the location's country code. */
async function countryOf(locationId: string, tag: string): Promise<string> {
  const { data, error } = await adminClient()
    .from("locations")
    .select("country_code")
    .eq("id", locationId)
    .single();
  if (error || !data) {
    throw new Error(`[e2e:${tag}] the seeded place's country: ${error?.message ?? "no row"}`);
  }
  return data.country_code as string;
}

/** The seller's room in a market: its free slots and the counted baseline ads already there. */
export async function freeSlotRoom(
  sellerId: string,
  countryCode: string,
  tag: string,
  exclude?: string,
): Promise<{ free: number; used: number }> {
  const supabase = adminClient();
  const market = await supabase.rpc("market_settings_for", { p_country_code: countryCode });
  const row = (market.data ?? null) as { free_regular_ads?: unknown } | null;
  if (market.error || typeof row?.free_regular_ads !== "number") {
    throw new Error(
      `[e2e:${tag}] market_settings_for failed: ${market.error?.message ?? "no row"}`,
    );
  }
  const live = await supabase.rpc(
    "seller_regular_live",
    exclude === undefined
      ? { p_seller: sellerId, p_country_code: countryCode }
      : { p_seller: sellerId, p_country_code: countryCode, p_exclude: exclude },
  );
  if (live.error || typeof live.data !== "number") {
    throw new Error(`[e2e:${tag}] seller_regular_live failed: ${live.error?.message ?? "no row"}`);
  }
  return { free: row.free_regular_ads, used: live.data };
}

function text(value: unknown): string | null {
  return typeof value === "string" && value !== "" ? value : null;
}

/** A row read back: an object with a string `id` and `tier` (a shape guard, never a cast). */
function seededOf(value: unknown, tag: string): SeededListing {
  if (typeof value !== "object" || value === null) {
    throw new Error(`[e2e:${tag}] the listing read back is not a row`);
  }
  const row: Row = { ...value };
  const id = text(row["id"]);
  const tier = text(row["tier"]);
  if (id === null || tier === null)
    throw new Error(`[e2e:${tag}] the listing read back has no id or tier`);
  return { ...row, id, tier };
}

/**
 * Seeds rows in one INSERT, each counted baseline row taking one of its seller's
 * free slots in its market (the rows of this batch counted with the table's).
 */
export async function seedListingRows(
  rows: Row[],
  options: SeedListingOptions,
): Promise<SeededListing[]> {
  const baseline = await baselineLevelKey();
  const way = options.beyondFreeSlots ?? "refuse";
  const rooms = new Map<string, { free: number; used: number }>();
  const placed: Row[] = [];
  for (const row of rows) {
    const status = text(row["status"]);
    const tier = text(row["tier"]) ?? baseline;
    const seller = text(row["seller_id"]);
    const location = text(row["location_id"]);
    const counted =
      status !== null && COUNTED_STATUSES.includes(status) && tier === baseline && seller !== null;
    if (!counted || location === null) {
      placed.push({ ...row, tier });
      continue;
    }
    const country = await countryOf(location, options.tag);
    const key = `${seller}:${country}`;
    let room = rooms.get(key);
    if (!room) {
      room = await freeSlotRoom(seller, country, options.tag);
      rooms.set(key, room);
    }
    if (room.used < room.free) {
      room.used += 1;
      placed.push({ ...row, tier });
      continue;
    }
    if (way === "level") {
      placed.push({ ...row, tier: await levelAboveBaseline() });
      continue;
    }
    throw new Error(
      `[e2e:${options.tag}] seeding a ${status} ${tier} ad: the seller's ${room.free} free slot(s) in ${country} are taken (D318) — seed it at a level, in a status that does not count, or on another scratch seller`,
    );
  }
  const columns = options.select ? `id,tier,${options.select}` : "id,tier";
  const { data, error } = await adminClient().from("listings").insert(placed).select(columns);
  if (error || !data || data.length !== placed.length) {
    throw new Error(
      `[e2e:${options.tag}] seeding ${placed.length} listing(s) failed: ${error?.message ?? "no row"}`,
    );
  }
  return data.map((row) => seededOf(row, options.tag));
}

/** One row through `seedListingRows`. */
export async function seedListingRow(
  row: Row,
  options: SeedListingOptions,
): Promise<SeededListing> {
  const [seeded] = await seedListingRows([row], options);
  if (!seeded) throw new Error(`[e2e:${options.tag}] seeding a listing returned no row`);
  return seeded;
}

export type UpdateListingOptions = SeedListingOptions & {
  /** Further column filters the row must match (`.eq(column, value)` each). */
  where?: Record<string, string>;
};

/** The market a placed row counts in: its `location_id`, else its first coverage place. */
async function marketOf(listingId: string, locationId: string | null, tag: string) {
  if (locationId !== null) return countryOf(locationId, tag);
  const { data, error } = await adminClient()
    .from("listing_locations")
    .select("location_id")
    .eq("listing_id", listingId)
    .order("position")
    .order("location_id")
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(`[e2e:${tag}] the listing's places: ${error.message}`);
  const place = text(data?.location_id);
  return place === null ? null : countryOf(place, tag);
}

/**
 * Writes `patch` to one listing (by id, and `where` when given) under the free-slot
 * law; answers the row as written, or null when no row matched.
 */
export async function updateListingRow(
  listingId: string,
  patch: Row,
  options: UpdateListingOptions,
): Promise<SeededListing | null> {
  const baseline = await baselineLevelKey();
  const where = Object.entries(options.where ?? {});
  let read = adminClient()
    .from("listings")
    .select("id,seller_id,status,tier,location_id")
    .eq("id", listingId);
  for (const [column, value] of where) read = read.eq(column, value);
  const current = await read.maybeSingle();
  if (current.error) {
    throw new Error(`[e2e:${options.tag}] reading the listing: ${current.error.message}`);
  }
  if (!current.data) return null;
  const was = current.data;
  const status = text(patch["status"]) ?? was.status;
  const tier = text(patch["tier"]) ?? was.tier;
  const counted = (s: string, t: string) => COUNTED_STATUSES.includes(s) && t === baseline;
  const written: Row = { ...patch };
  if (counted(status, tier) && !counted(was.status, was.tier)) {
    const country = await marketOf(listingId, text(was.location_id), options.tag);
    if (country !== null) {
      const room = await freeSlotRoom(was.seller_id, country, options.tag, listingId);
      if (room.used >= room.free) {
        if ((options.beyondFreeSlots ?? "refuse") === "refuse") {
          throw new Error(
            `[e2e:${options.tag}] moving a ${was.status} ad to ${status} ${tier}: the seller's ${room.free} free slot(s) in ${country} are taken (D318) — give it a level first, move it to a status that does not count, or use another scratch seller`,
          );
        }
        written["tier"] = await levelAboveBaseline();
      }
    }
  }
  let write = adminClient().from("listings").update(written).eq("id", listingId);
  for (const [column, value] of where) write = write.eq(column, value);
  const columns = options.select ? `id,tier,${options.select}` : "id,tier";
  const { data, error } = await write.select(columns).maybeSingle();
  if (error) throw new Error(`[e2e:${options.tag}] updating the listing failed: ${error.message}`);
  return data === null ? null : seededOf(data, options.tag);
}
