/**
 * INC-1169 (the tests and CI turn, Part A; ruling 1 §2) — THE FEED BENCH'S SCRATCH MARKET.
 *
 * The bench seeds under the free-slot law (`listings_free_slot_guard`, register rows 113 and 114)
 * the way the browser tests do: a market of its own, never a bypass. A country from the
 * user-assigned pool (closed, so no picker shows it), its anchor place opened for `feed_page`,
 * a `market_settings` row whose free number sits above the largest seller's baseline rows, and
 * the rows spread round-robin over scratch sellers so each seller's count stays in the hundreds.
 *
 * Names: the sellers live in the scratch users' namespace (`e2e+bench-…@ethio-e2e.invalid`), so
 * the 24-hour sweep (e2e/global-teardown.ts) reaps a crashed run's sellers and, by cascade, their
 * listings; the country carries the bench's own prefix, outside the country reaper's predicate
 * (e2e/global-setup.ts), and goes at the next run's pre-clean. The pool and the prefixes are read
 * from the pure e2e helpers (`country-slot.ts`, `scratch.ts`); `e2e/helpers/countries.ts` is not
 * imported because it loads Playwright. The sellers' auth calls stay in scripts/feed-bench.ts,
 * the bench's one vendor reach (vendor-seams-allowlist.txt).
 */

import { userAssignedCodes } from "../e2e/helpers/country-slot";
import { chunkByLength } from "../e2e/helpers/chunk-by-length";
import { SCRATCH_PREFIXES, SCRATCH_USER_DOMAIN } from "../e2e/helpers/scratch";
import type { Db } from "./feed-bench";

/** The bench's own prefix: listing titles, category and place slugs, the country's name. */
export const BENCH_PREFIX = "e2e-bench-";
/** The bench's sellers: inside the scratch users' namespace (ruling 1 §2.2). */
export const BENCH_SELLER_PREFIX = `${SCRATCH_PREFIXES.user}bench-`;
/** Scratch sellers per run: 376–378 baseline rows each over the seed (the census's table). */
export const SELLERS = 256;
/** Sellers created (and deleted) in parallel per round. */
export const SELLER_BATCH = 16;

export function must<T>(res: { data: T; error: { message: string } | null }, what: string): T {
  if (res.error) throw new Error(`${what}: ${res.error.message}`);
  return res.data;
}

export function benchSellerEmail(run: string, index: number): string {
  return `${runSellerStart(run)}${index}${SCRATCH_USER_DOMAIN}`;
}

/** What every address of one run's sellers starts with. */
export function runSellerStart(run: string): string {
  return `${BENCH_SELLER_PREFIX}${run}-s`;
}

/** A bench seller of any run: today's namespace, or the address used before ruling 1. */
export function isBenchSellerEmail(email: string | undefined): boolean {
  if (email === undefined || !email.endsWith(SCRATCH_USER_DOMAIN)) return false;
  return email.startsWith(BENCH_SELLER_PREFIX) || email.startsWith(BENCH_PREFIX);
}

export function benchCountryName(prefix: string): string {
  return `${prefix}-market`;
}

/** A bench country: the bench's prefix on a user-assigned code, never a real market. */
export function isBenchCountry(code: string, name: string): boolean {
  return userAssignedCodes().includes(code) && name.startsWith(BENCH_PREFIX);
}

export interface SeedPlan {
  /** The seller (0-based) row `g` (1-based) belongs to. */
  sellerOf: (g: number) => number;
  /** Each seller's baseline rows over the whole seed. */
  baselineRows: number[];
  /** The market's free number: one above the largest seller's baseline rows. */
  free: number;
}

/**
 * The seed's plan, a pure function of the row count, the row's level and the seller count:
 * rows go round-robin, and the free number is set above the largest seller's baseline count,
 * so the guard (others ≥ free refuses) never refuses a bench row.
 */
export function seedPlan(
  rows: number,
  sellers: number,
  tierOf: (g: number) => string,
  baseline: string,
): SeedPlan {
  if (sellers < 1) throw new Error("seedPlan: no sellers");
  const sellerOf = (g: number) => (g - 1) % sellers;
  const baselineRows = new Array<number>(sellers).fill(0);
  for (let g = 1; g <= rows; g++) {
    if (tierOf(g) === baseline) baselineRows[sellerOf(g)] = (baselineRows[sellerOf(g)] ?? 0) + 1;
  }
  return { sellerOf, baselineRows, free: Math.max(...baselineRows) + 1 };
}

// ---------------------------------------------------------------- runtime

/** The first user-assigned code no `countries` row holds; a later conflict fails loudly. */
export async function freeScratchCode(db: Db): Promise<string> {
  const pool = userAssignedCodes();
  const taken = must(
    await db.from("countries").select("code").in("code", pool),
    "read the scratch pool",
  ) as { code: string }[];
  const held = new Set(taken.map((row) => row.code));
  const code = pool.find((candidate) => !held.has(candidate));
  if (code === undefined) throw new Error("every user-assigned country code is taken");
  return code;
}

/**
 * The scratch market: the country (closed), its anchor (made by `countries_anchor_on_insert`,
 * born closed, opened here for `feed_page`), and its `market_settings` row — the free number
 * from the plan, the included reach copied from the default row, no paid levels.
 */
export async function createMarket(
  db: Db,
  code: string,
  name: string,
  free: number,
): Promise<string> {
  must(
    await db.from("countries").insert({ code, name_en: name, is_active: false }),
    `insert scratch country ${code}`,
  );
  const anchor = must(
    await db
      .from("locations")
      .select("id")
      .eq("level", "country")
      .eq("country_code", code)
      .single(),
    "read the scratch anchor",
  ) as { id: string };
  must(
    await db.from("locations").update({ is_active: true }).eq("id", anchor.id),
    "open the scratch anchor",
  );
  const fallback = must(
    await db.from("market_settings").select("included_reach").is("country_code", null).single(),
    "read the default market",
  ) as { included_reach: string };
  must(
    await db.from("market_settings").insert({
      country_code: code,
      free_regular_ads: free,
      included_reach: fallback.included_reach,
      paid_levels: false,
    }),
    "insert the scratch market",
  );
  return anchor.id;
}

/**
 * The codes of the bench's countries named under `prefix` — a market is found by its country's
 * name, never by the code a run picked (a code whose insert conflicted belongs to another market).
 */
export async function benchCountryCodes(db: Db, prefix: string): Promise<string[]> {
  const rows = must(
    await db.from("countries").select("code, name_en").like("name_en", `${prefix}%`),
    "read scratch countries",
  ) as { code: string; name_en: string }[];
  return rows.filter((row) => isBenchCountry(row.code, row.name_en)).map((row) => row.code);
}

export async function deleteMarketRows(db: Db, codes: string[]): Promise<void> {
  for (const part of chunkByLength(codes)) {
    must(
      await db.from("market_settings").delete().in("country_code", part),
      "delete scratch markets",
    );
  }
}

/** Each market's cities, regions and anchor, then its country row. */
export async function deletePlacesAndCountries(db: Db, codes: string[]): Promise<void> {
  for (const part of chunkByLength(codes)) {
    for (const level of ["city", "region", "country"]) {
      must(
        await db.from("locations").delete().eq("level", level).in("country_code", part),
        `delete scratch ${level} places`,
      );
    }
    must(await db.from("countries").delete().in("code", part), "delete scratch countries");
  }
}
