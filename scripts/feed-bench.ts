/**
 * Bundle 10 E3c — THE FEED ENGINE'S SPEED JUDGE (D101 §5, DEC-166).
 *
 * Seeds 100,500 scratch active listings on ethio-staging in a scratch market of
 * its own (scripts/feed-bench-market.ts, INC-1169), times six page shapes
 * inside the database through public.feed_bench (service role only), removes
 * everything, and writes docs/tracking/feed-bench-status.md.
 * Exit 0 on a pass, 1 otherwise. Refuses any project but ethio-staging.
 * Numbers, shape names and the scratch market's code only reach the log: never
 * a row, an id, a slug or an e-mail address.
 */

import { randomBytes } from "node:crypto";
import { writeFileSync, mkdirSync } from "node:fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { chunkByLength } from "../e2e/helpers/chunk-by-length";
import {
  BENCH_PREFIX,
  SELLERS,
  SELLER_BATCH,
  benchCountryCodes,
  benchCountryName,
  benchSellerEmail,
  createMarket,
  deleteMarketRows,
  deletePlacesAndCountries,
  freeScratchCode,
  isBenchSellerEmail,
  must,
  runSellerStart,
  seedPlan,
} from "./feed-bench-market";
import { describeRuns, gateEnv, waitForQuiet, yieldWatcher, YieldError } from "./staging-gate";
import { errorText } from "../src/lib/error-text";

export const TARGET_P95_MS = 50;
export const TARGET_BYTES = 30720;
export const RUNS = 33;
export const WARMUP = 3;
export const LISTINGS = 100000;
export const HOT = 500;
export const BATCH = 250;
export const STAGING_REF = "jatpuhfdjfzctjipklmk";
/** DEC-168 — the longest the bench waits for a quiet staging before it skips. */
export const GATE_WAIT_MINUTES = 40;

const STATUS_PATH = "docs/tracking/feed-bench-status.md";

export interface ShapeResult {
  name: string;
  runs: number;
  p50: number;
  p95: number;
  max: number;
  cards: number;
}

export function nearestRank(ms: number[], q: number): number {
  if (ms.length === 0) throw new Error("nearestRank: empty list");
  const sorted = [...ms].sort((a, b) => a - b);
  const index = Math.max(0, Math.ceil(q * sorted.length) - 1);
  return sorted[index] as number;
}

export function isStatementTimeout(message: string): boolean {
  return message.includes("statement timeout");
}

export function summarise(ms: number[]): { runs: number; p50: number; p95: number; max: number } {
  return {
    runs: ms.length,
    p50: nearestRank(ms, 0.5),
    p95: nearestRank(ms, 0.95),
    max: nearestRank(ms, 1),
  };
}

/** The six page shapes the bench times, in the order it times them; the measure step reads this list. */
export const SHAPE_NAMES = [
  "all, everywhere",
  "top, country",
  "leaf, city",
  "top, city, widening",
  "page 50 by cursor",
  "guest host, country",
] as const;
export type ShapeName = (typeof SHAPE_NAMES)[number];

/** INC-1228 — the shapes of SHAPE_NAMES a run did not measure. */
function unmeasured(shapes: ShapeResult[]): string[] {
  return SHAPE_NAMES.filter((name) => !shapes.some((s) => s.name === name));
}

/**
 * INC-1228 — PASS only when every shape of SHAPE_NAMES and the page size were measured and met their
 * targets; each value not measured gets its own line, and an unmeasured page size is null, never 0.
 */
export function verdict(
  shapes: ShapeResult[],
  bytes: number | null,
  leftovers: number,
): { pass: boolean; lines: string[] } {
  const lines: string[] = unmeasured(shapes).map((name) => `NOT MEASURED: "${name}"`);
  if (bytes === null) lines.push("NOT MEASURED: page size");
  for (const s of shapes) {
    if (s.p95 > TARGET_P95_MS) {
      lines.push(`MISS: "${s.name}" p95 ${s.p95.toFixed(2)} ms > ${TARGET_P95_MS} ms`);
    }
    if (s.cards < 20) lines.push(`MISS: "${s.name}" returned ${s.cards} cards (< 20)`);
  }
  if (bytes !== null && bytes > TARGET_BYTES)
    lines.push(`MISS: page size ${bytes} bytes > ${TARGET_BYTES} bytes`);
  if (leftovers > 0) lines.push(`MISS: ${leftovers} scratch rows left after cleanup`);
  const pass = lines.length === 0;
  if (pass) lines.push("PASS: every target met");
  return { pass, lines };
}

export interface StatusInput {
  runUrl: string;
  runSha: string;
  timestamp: string;
  outcome: "PASS" | "MISS" | "FAILED" | "SKIPPED" | "YIELDED";
  error?: string;
  seeded: number;
  seedSeconds: number;
  /** INC-1181 — the seed's two costs apart: the sellers' creation and the listings' insert. */
  sellerSeconds: number;
  insertSeconds: number;
  cleanupSeconds: number;
  leftovers: number;
  /** The scratch market (INC-1169): its sellers, its code and its free number. */
  sellers: number;
  market: string;
  free: number;
  shapes: ShapeResult[];
  /** The first shape's page size; null when it was not measured (INC-1228). */
  bytes: number | null;
}

export function renderStatus(input: StatusInput): string {
  const firstLine = (input.error ?? "").split("\n")[0]?.slice(0, 200) ?? "";
  const shown =
    input.outcome === "PASS" || input.outcome === "MISS"
      ? input.outcome
      : `${input.outcome} (${firstLine})`;
  const rows = input.shapes.map(
    (s) =>
      `| ${s.name} | ${s.runs} | ${s.p50.toFixed(2)} | ${s.p95.toFixed(2)} | ${s.max.toFixed(2)} | ${s.cards} |`,
  );
  return [
    "# Feed bench (auto-generated — do not edit by hand)",
    "",
    `- Run: ${input.runUrl}`,
    `- Commit: ${input.runSha}`,
    `- Timestamp (UTC): ${input.timestamp}`,
    `- Verdict: ${shown}`,
    `- Listings seeded: ${input.seeded} · seed ${input.seedSeconds.toFixed(1)} s (sellers ${input.sellerSeconds.toFixed(1)} s, listings ${input.insertSeconds.toFixed(1)} s) · cleanup ${input.cleanupSeconds.toFixed(1)} s · leftovers ${input.leftovers} · sellers ${input.sellers} · market ${input.market} free ${input.free}`,
    "",
    "| Shape | Runs | p50 ms | p95 ms | Max ms | Cards |",
    "| --- | --- | --- | --- | --- | --- |",
    ...rows,
    "",
    ...unmeasured(input.shapes).map((name) => `- Not measured: "${name}"`),
    `- Page size (all categories, everywhere): ${input.bytes === null ? "not measured" : `${input.bytes} bytes`} (target ≤ 30720)`,
    "- Targets (D101 §5, DEC-166): p95 ≤ 50 ms per shape; one page ≤ 30,720 bytes.",
    "- Not measured here: the cached first page's time to first byte (≤ 100 ms) needs the published site; the first page on slow 3G (≤ 1.5 s) needs a browser.",
    "",
  ].join("\n");
}

// ---------------------------------------------------------------- runtime

export type Db = SupabaseClient;

function randomLetters(n: number): string {
  const a = "abcdefghijklmnopqrstuvwxyz";
  let s = "";
  for (let i = 0; i < n; i++) s += a[Math.floor(Math.random() * a.length)];
  return s;
}

/**
 * INC-529 — the scratch seller's password comes from the system's secure
 * generator, as every E2E account's does (e2e/helpers/users.ts :60).
 */
function randomPassword(): string {
  return `Pw-${randomBytes(18).toString("base64url")}`;
}

/**
 * P-2 (c) c2a (DEC-351 §8) — the bench's level mix, from a feed answer's `levels` dictionary (the
 * enabled level rows: key, sort, is_baseline), never a level by name: one ad in a hundred takes
 * the highest level, one in twenty-five the next (the highest again when it is alone), the rest
 * the baseline. A dictionary without a baseline row, or a malformed one, is refused.
 */
export function levelMix(levels: unknown): (g: number) => string {
  const { rows, baseline } = levelRows(levels);
  const above = rows.filter((row) => !row.isBaseline).sort((a, b) => b.sort - a.sort);
  const top = above[0]?.key ?? baseline;
  const next = above[1]?.key ?? top;
  return (g) => (g % 100 === 0 ? top : g % 25 === 0 ? next : baseline);
}

/** The baseline level's key in a feed answer's `levels` dictionary (the free-slot law counts it). */
export function baselineLevel(levels: unknown): string {
  return levelRows(levels).baseline;
}

function levelRows(levels: unknown): {
  rows: { key: string; sort: number; isBaseline: boolean }[];
  baseline: string;
} {
  if (!Array.isArray(levels)) throw new Error("feed_page: no levels dictionary");
  const rows = levels.map((row: unknown) => {
    if (row === null || typeof row !== "object")
      throw new Error("feed_page: a malformed level row");
    const key: unknown = Reflect.get(row, "key");
    const sort: unknown = Reflect.get(row, "sort");
    const is_baseline: unknown = Reflect.get(row, "is_baseline");
    if (typeof key !== "string" || typeof sort !== "number" || typeof is_baseline !== "boolean") {
      throw new Error("feed_page: a malformed level row");
    }
    return { key, sort, isBaseline: is_baseline };
  });
  const baseline = rows.find((row) => row.isBaseline);
  if (baseline === undefined) throw new Error("feed_page: no baseline level");
  return { rows, baseline: baseline.key };
}

/** Row `g`'s level: the mix over the seed's rows, the baseline for the hot rows after them. */
export function benchTier(mix: (g: number) => string, g: number): string {
  return g <= LISTINGS ? mix(g) : mix(1);
}

async function deleteListingsLike(db: Db, prefix: string): Promise<void> {
  for (;;) {
    const query = db.from("listings").select("id").like("title", `${prefix}%`);
    const rows = must(await query.limit(1000), "read scratch listings") as { id: string }[];
    if (rows.length === 0) return;
    const ids = rows.map((r) => r.id);
    for (const part of chunkByLength(ids)) {
      must(await db.from("listings").delete().in("id", part), "delete scratch listings");
    }
  }
}

async function deleteCategoriesLike(db: Db, prefix: string): Promise<void> {
  const cats = must(
    await db.from("categories").select("id").like("slug", `${prefix}%`),
    "read scratch categories",
  ) as { id: string }[];
  const ids = cats.map((c) => c.id);
  for (const part of chunkByLength(ids)) {
    must(
      await db.from("category_tree_pointers").delete().in("child_id", part),
      "delete pointers (child)",
    );
    must(
      await db.from("category_tree_pointers").delete().in("parent_id", part),
      "delete pointers (parent)",
    );
  }
  for (const part of chunkByLength(ids)) {
    must(await db.from("categories").delete().in("id", part), "delete categories");
  }
}

async function deleteLocationsLike(db: Db, prefix: string): Promise<void> {
  for (const level of ["city", "region"]) {
    must(
      await db.from("locations").delete().eq("level", level).like("slug", `${prefix}%`),
      `delete scratch ${level}s`,
    );
  }
}

/** The bench sellers (scripts/feed-bench-market.ts) whose address starts with `start`. */
async function benchSellerIds(db: Db, start: string): Promise<string[]> {
  const ids: string[] = [];
  for (let page = 1; ; page++) {
    if (page > 500) throw new Error("list users: more than 500 pages");
    const res = await db.auth.admin.listUsers({ page, perPage: 200 });
    if (res.error) throw new Error(`list users: ${res.error.message}`);
    const users = res.data.users;
    for (const user of users) {
      if (isBenchSellerEmail(user.email) && user.email?.startsWith(start)) ids.push(user.id);
    }
    if (users.length < 200) return ids;
  }
}

/** The run's sellers, SELLER_BATCH at a time; `created` holds each id as it lands. */
async function createSellers(db: Db, run: string, created: string[]): Promise<void> {
  for (let first = 1; first <= SELLERS; first += SELLER_BATCH) {
    const indexes = Array.from(
      { length: Math.min(SELLER_BATCH, SELLERS - first + 1) },
      (_, k) => first + k,
    );
    const answers = await Promise.all(
      indexes.map((i) =>
        db.auth.admin.createUser({
          email: benchSellerEmail(run, i),
          password: randomPassword(),
          email_confirm: true,
        }),
      ),
    );
    for (const answer of answers) if (answer.data.user) created.push(answer.data.user.id);
    const refused = answers.find((answer) => answer.error !== null || answer.data.user === null);
    if (refused) throw new Error(`create seller: ${refused.error?.message ?? "no user"}`);
  }
}

async function deleteSellers(db: Db, ids: string[]): Promise<void> {
  for (let first = 0; first < ids.length; first += SELLER_BATCH) {
    const answers = await Promise.all(
      ids.slice(first, first + SELLER_BATCH).map((id) => db.auth.admin.deleteUser(id)),
    );
    const refused = answers.find((answer) => answer.error !== null);
    if (refused?.error) throw new Error(`delete seller: ${refused.error.message}`);
  }
}

/**
 * Every bench row under `prefix` (INC-1174; ruling 1 §2.2's order): the listings, the categories,
 * the sellers (`run`'s own, or with no run every bench seller under both prefixes), the market
 * rows, the places (the slug-named cities and regions, then each market's places and anchor), the
 * countries. The pre-clean passes the bench's prefix; a run's cleanup passes its own.
 */
async function removeBench(db: Db, prefix: string, run?: string): Promise<void> {
  await deleteListingsLike(db, prefix);
  await deleteCategoriesLike(db, prefix);
  await deleteSellers(db, await benchSellerIds(db, run === undefined ? "" : runSellerStart(run)));
  const codes = await benchCountryCodes(db, prefix);
  await deleteMarketRows(db, codes);
  await deleteLocationsLike(db, prefix);
  await deletePlacesAndCountries(db, codes);
}

/** Bench sellers and countries left under `prefix` (a country's market row and places count with it). */
async function countSellersAndMarkets(db: Db, prefix: string, run?: string): Promise<number> {
  const sellers = await benchSellerIds(db, run === undefined ? "" : runSellerStart(run));
  return sellers.length + (await benchCountryCodes(db, prefix)).length;
}

async function countLeftovers(db: Db, prefix: string): Promise<number> {
  let total = 0;
  for (const [table, column] of [
    ["listings", "title"],
    ["categories", "slug"],
    ["locations", "slug"],
  ] as const) {
    const res = await db
      .from(table)
      .select("*", { count: "exact", head: true })
      .like(column, `${prefix}%`);
    if (res.error) throw new Error(`count ${table}: ${res.error.message}`);
    total += res.count ?? 0;
  }
  return total;
}

async function insertCategory(db: Db, slug: string, allow: boolean): Promise<string> {
  const row = must(
    await db
      .from("categories")
      .insert({
        slug,
        name_en: slug,
        is_active: true,
        is_catchall: false,
        display_order: 9200,
        allow_listings: allow,
      })
      .select("id")
      .single(),
    "insert category",
  ) as { id: string };
  return row.id;
}

async function insertPointer(
  db: Db,
  parent: string | null,
  child: string,
  primary: boolean,
): Promise<void> {
  must(
    await db
      .from("category_tree_pointers")
      .insert({ parent_id: parent, child_id: child, is_primary: primary }),
    "insert pointer",
  );
}

async function insertPlace(
  db: Db,
  slug: string,
  level: "region" | "city",
  parent: string,
  regionId: string | null,
  countryCode: string,
): Promise<string> {
  const row = must(
    await db
      .from("locations")
      .insert({
        slug,
        name_en: slug,
        level,
        parent_id: parent,
        region_id: regionId,
        country_code: countryCode,
        is_active: true,
        source: "admin",
        ...(level === "city" ? { center_lat: 9.03, center_lng: 38.74 } : {}),
      })
      .select("id")
      .single(),
    `insert ${level}`,
  ) as { id: string };
  return row.id;
}

interface BenchAnswer {
  ms: number[];
  bytes: number;
  cards: number;
}

async function main(): Promise<number> {
  const url = process.env["E2E_SUPABASE_URL"] ?? "";
  const key = process.env["E2E_SUPABASE_SERVICE_ROLE_KEY"] ?? "";
  if (url === "" || key === "") {
    console.log("::error::feed-bench: E2E_SUPABASE_URL or E2E_SUPABASE_SERVICE_ROLE_KEY is empty");
    return 1;
  }
  if (!url.includes(STAGING_REF)) {
    console.log("::error::feed-bench: the target is not ethio-staging; refused");
    return 1;
  }

  if (process.argv.includes("--clean")) {
    const cleaner = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const count = async () =>
      (await countLeftovers(cleaner, BENCH_PREFIX)) +
      (await countSellersAndMarkets(cleaner, BENCH_PREFIX));
    const found = await count();
    await removeBench(cleaner, BENCH_PREFIX);
    const left = await count();
    console.log(`feed-bench --clean: found ${found} scratch rows; left ${left}`);
    return left === 0 ? 0 : 1;
  }

  // DEC-168 — THE STAGING GATE: CI has priority. Wait for a quiet staging
  // before writing anything; yield the moment another staging run starts.
  const gate = gateEnv();
  let checkGate: () => Promise<void> = async () => {};
  if (gate === null) {
    console.log("staging gate: not on GitHub Actions — not checked");
  } else {
    let skipped: string | undefined;
    try {
      const waited = await waitForQuiet(gate, GATE_WAIT_MINUTES);
      if (waited.quiet) console.log(`staging gate: staging quiet after ${waited.waitedSeconds} s`);
      else skipped = `staging busy for ${GATE_WAIT_MINUTES} min: ${describeRuns(waited.busy)}`;
    } catch (error) {
      skipped = `gate unreadable: ${errorText(error)}`;
    }
    if (skipped !== undefined) {
      mkdirSync("docs/tracking", { recursive: true });
      writeFileSync(
        STATUS_PATH,
        renderStatus({
          runUrl: process.env["RUN_URL"] || "local",
          runSha: process.env["RUN_SHA"] || "local",
          timestamp: new Date().toISOString(),
          outcome: "SKIPPED",
          error: skipped,
          seeded: 0,
          seedSeconds: 0,
          sellerSeconds: 0,
          insertSeconds: 0,
          cleanupSeconds: 0,
          leftovers: 0,
          sellers: 0,
          market: "none",
          free: 0,
          shapes: [],
          bytes: null,
        }),
      );
      console.log(`::error::feed-bench SKIPPED: ${skipped}`);
      return 1;
    }
    checkGate = yieldWatcher(gate);
  }

  const run = process.env["GITHUB_RUN_ID"] ?? "local";
  const P = `${BENCH_PREFIX}${run}-${randomLetters(6)}`;
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

  let seeded = 0;
  let seedSeconds = 0;
  let sellerSeconds = 0;
  let insertSeconds = 0;
  let insertStart = 0;
  let cleanupSeconds = 0;
  let leftovers = 0;
  let bytes: number | null = null;
  const shapes: ShapeResult[] = [];
  const sellerIds: string[] = [];
  let market = "none";
  let free = 0;
  let failure: string | undefined;
  let yielded: string | undefined;
  let seedStart = 0;

  try {
    // 3. Pre-clean every earlier run (INC-1174).
    await removeBench(db, BENCH_PREFIX);

    // 4. Seed: the plan, the scratch market, its sellers, the tree and the rows.
    seedStart = Date.now();
    const levels = (
      must(
        await db.rpc("feed_page", {
          p_category_id: null,
          p_location_id: null,
          p_after: null,
          p_size: 1,
        }),
        "the level dictionary",
      ) as { levels?: unknown }
    ).levels;
    const mix = levelMix(levels);
    const tierOf = (g: number) => benchTier(mix, g);
    const seeding = seedPlan(LISTINGS + HOT, SELLERS, tierOf, baselineLevel(levels));
    free = seeding.free;
    market = await freeScratchCode(db);
    const anchor = await createMarket(db, market, benchCountryName(P), free);
    const sellersStart = Date.now();
    try {
      await createSellers(db, run, sellerIds);
    } finally {
      sellerSeconds = (Date.now() - sellersStart) / 1000;
    }
    const sellerOf = (g: number): string => {
      const id = sellerIds[seeding.sellerOf(g)];
      if (id === undefined) throw new Error(`no seller for row ${g}`);
      return id;
    };

    const tops: string[] = [];
    const seconds: string[][] = [];
    for (let i = 1; i <= 15; i++) {
      const t = await insertCategory(db, `${P}-t${i}`, false);
      await insertPointer(db, null, t, true);
      tops.push(t);
      const row: string[] = [];
      for (let j = 1; j <= 10; j++) {
        const folder = i === 1 && j <= 3;
        const s = await insertCategory(db, `${P}-s${i}-${j}`, !folder);
        await insertPointer(db, t, s, true);
        row.push(s);
      }
      seconds.push(row);
    }
    const thirds: string[] = [];
    for (let j = 1; j <= 3; j++) {
      for (let k = 1; k <= 3; k++) {
        const x = await insertCategory(db, `${P}-x${j}-${k}`, true);
        await insertPointer(db, seconds[0]![j - 1]!, x, true);
        thirds.push(x);
      }
    }
    for (let j = 0; j < 4; j++) await insertPointer(db, tops[2]!, seconds[1]![j]!, false);
    const leaves: string[] = [];
    seconds.forEach((row, i) =>
      row.forEach((s, j) => {
        if (!(i === 0 && j < 3)) leaves.push(s);
      }),
    );
    leaves.push(...thirds);
    if (leaves.length !== 156) throw new Error(`leaves: ${leaves.length}, expected 156`);

    const cities: string[] = [];
    let emptyCity = "";
    for (let i = 1; i <= 10; i++) {
      const r = await insertPlace(db, `${P}-r${i}`, "region", anchor, null, market);
      for (let j = 1; j <= 10; j++) {
        cities.push(await insertPlace(db, `${P}-c${i}-${j}`, "city", r, r, market));
      }
      if (i === 1) emptyCity = await insertPlace(db, `${P}-cempty`, "city", r, r, market);
    }

    const now = Date.now();
    const row = (g: number, cat: string, loc: string, minutesAgo: number) => ({
      seller_id: sellerOf(g),
      category_id: cat,
      location_id: loc,
      tier: tierOf(g),
      published_at: new Date(now - minutesAgo * 60000).toISOString(),
      title: `${P}-${g}`,
      description: "e2e bench listing",
      status: "active",
      home_country_code: market,
    });
    let batch: ReturnType<typeof row>[] = [];
    const flush = async () => {
      if (batch.length === 0) return;
      await checkGate();
      for (let attempt = 1; ; attempt++) {
        const res = await db.from("listings").insert(batch);
        if (!res.error) break;
        if (attempt < 3 && isStatementTimeout(res.error.message)) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          continue;
        }
        throw new Error(`insert listings: ${res.error.message}`);
      }
      seeded += batch.length;
      batch = [];
    };
    insertStart = Date.now();
    for (let g = 1; g <= LISTINGS; g++) {
      batch.push(row(g, leaves[(g * 7919) % 156]!, cities[(g * 104729) % 100]!, g % 86400));
      if (batch.length === BATCH) await flush();
    }
    await flush();
    for (let g = 1; g <= HOT; g++) {
      batch.push(row(LISTINGS + g, leaves[0]!, cities[0]!, g));
      if (batch.length === BATCH) await flush();
    }
    await flush();
    insertSeconds = (Date.now() - insertStart) / 1000;
    seedSeconds = (Date.now() - seedStart) / 1000;

    // 5. Measure.
    await checkGate();
    let after: unknown = null;
    for (let n = 1; n <= 49; n++) {
      const page = must(
        await db.rpc("feed_page", {
          p_category_id: null,
          p_location_id: null,
          p_after: after,
          p_size: 20,
        }),
        "walk feed_page",
      ) as { next: unknown };
      after = page.next;
    }
    const plan: Record<ShapeName, [string | null, string | null, unknown]> = {
      "all, everywhere": [null, null, null],
      "top, country": [tops[4]!, anchor, null],
      "leaf, city": [leaves[0]!, cities[0]!, null],
      "top, city, widening": [tops[4]!, emptyCity, null],
      "page 50 by cursor": [null, null, after],
      "guest host, country": [tops[2]!, anchor, null],
    };
    for (const name of SHAPE_NAMES) {
      const [cat, loc, cursor] = plan[name];
      await checkGate();
      const answer = must(
        await db.rpc("feed_bench", {
          p_category_id: cat,
          p_location_id: loc,
          p_after: cursor,
          p_runs: RUNS,
        }),
        `feed_bench ${name}`,
      ) as BenchAnswer;
      if (name === SHAPE_NAMES[0]) bytes = answer.bytes;
      shapes.push({ name, ...summarise(answer.ms.slice(WARMUP)), cards: answer.cards });
    }
  } catch (error) {
    if (error instanceof YieldError) yielded = error.message;
    else failure = errorText(error);
    if (seedStart > 0 && seedSeconds === 0) seedSeconds = (Date.now() - seedStart) / 1000;
    if (insertStart > 0 && insertSeconds === 0) insertSeconds = (Date.now() - insertStart) / 1000;
  } finally {
    // 6. Clean up, whatever happened.
    const cleanStart = Date.now();
    try {
      await removeBench(db, P, run);
      leftovers = (await countLeftovers(db, P)) + (await countSellersAndMarkets(db, P, run));
    } catch (error) {
      const cleanup = `cleanup: ${errorText(error)}`;
      failure = failure === undefined ? cleanup : `${failure} — and ${cleanup}`;
      leftovers = Math.max(leftovers, 1);
    }
    cleanupSeconds = (Date.now() - cleanStart) / 1000;
  }

  // 7. Status.
  const judged = verdict(shapes, bytes, leftovers);
  const outcome =
    failure !== undefined
      ? "FAILED"
      : yielded !== undefined
        ? "YIELDED"
        : judged.pass
          ? "PASS"
          : "MISS";
  mkdirSync("docs/tracking", { recursive: true });
  writeFileSync(
    STATUS_PATH,
    renderStatus({
      runUrl: process.env["RUN_URL"] || "local",
      runSha: process.env["RUN_SHA"] || "local",
      timestamp: new Date().toISOString(),
      outcome,
      error: failure ?? yielded,
      seeded,
      seedSeconds,
      sellerSeconds,
      insertSeconds,
      cleanupSeconds,
      leftovers,
      sellers: sellerIds.length,
      market,
      free,
      shapes,
      bytes,
    }),
  );
  if (failure !== undefined) console.log(`::error::feed-bench FAILED: ${failure.split("\n")[0]}`);
  if (yielded !== undefined) console.log(`::error::feed-bench YIELDED: ${yielded}`);
  for (const line of judged.lines) console.log(line);
  return outcome === "PASS" ? 0 : 1;
}

if (process.argv[1]?.includes("feed-bench")) {
  main().then(
    (code) => process.exit(code),
    (error) => {
      console.log(`::error::feed-bench: ${errorText(error)}`);
      process.exit(1);
    },
  );
}
