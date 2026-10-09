/**
 * Bundle 10 E3c — THE FEED ENGINE'S SPEED JUDGE (D101 §5, DEC-166).
 *
 * Seeds 100,500 scratch active listings on ethio-staging, times six page
 * shapes inside the database through public.feed_bench (service role only),
 * removes everything, and writes docs/tracking/feed-bench-status.md.
 * Exit 0 on a pass, 1 otherwise. Refuses any project but ethio-staging.
 * Numbers and shape names only reach the log: never a row, an id, a slug or
 * an e-mail address.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { chunkByLength } from "../e2e/helpers/chunk-by-length";
import { describeRuns, gateEnv, waitForQuiet, yieldWatcher, YieldError } from "./staging-gate";

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

export function verdict(
  shapes: ShapeResult[],
  bytes: number,
  leftovers: number,
): { pass: boolean; lines: string[] } {
  const lines: string[] = [];
  for (const s of shapes) {
    if (s.p95 > TARGET_P95_MS) {
      lines.push(`MISS: "${s.name}" p95 ${s.p95.toFixed(2)} ms > ${TARGET_P95_MS} ms`);
    }
    if (s.cards < 20) lines.push(`MISS: "${s.name}" returned ${s.cards} cards (< 20)`);
  }
  if (bytes > TARGET_BYTES) lines.push(`MISS: page size ${bytes} bytes > ${TARGET_BYTES} bytes`);
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
  cleanupSeconds: number;
  leftovers: number;
  shapes: ShapeResult[];
  bytes: number;
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
    `- Listings seeded: ${input.seeded} · seed ${input.seedSeconds.toFixed(1)} s · cleanup ${input.cleanupSeconds.toFixed(1)} s · leftovers ${input.leftovers}`,
    "",
    "| Shape | Runs | p50 ms | p95 ms | Max ms | Cards |",
    "| --- | --- | --- | --- | --- | --- |",
    ...rows,
    "",
    `- Page size (all categories, everywhere): ${input.bytes} bytes (target ≤ 30720)`,
    "- Targets (D101 §5, DEC-166): p95 ≤ 50 ms per shape; one page ≤ 30,720 bytes.",
    "- Not measured here: the cached first page's time to first byte (≤ 100 ms) needs the published site; the first page on slow 3G (≤ 1.5 s) needs a browser.",
    "",
  ].join("\n");
}

// ---------------------------------------------------------------- runtime

type Db = SupabaseClient;

function randomLetters(n: number): string {
  const a = "abcdefghijklmnopqrstuvwxyz";
  let s = "";
  for (let i = 0; i < n; i++) s += a[Math.floor(Math.random() * a.length)];
  return s;
}

function randomPassword(n: number): string {
  const a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < n; i++) s += a[Math.floor(Math.random() * a.length)];
  return s;
}

function must<T>(res: { data: T; error: { message: string } | null }, what: string): T {
  if (res.error) throw new Error(`${what}: ${res.error.message}`);
  return res.data;
}

type ListingFilter = { column: "title"; prefix: string } | { column: "seller_id"; equals: string };

async function deleteListingsWhere(db: Db, filter: ListingFilter): Promise<void> {
  for (;;) {
    const base = db.from("listings").select("id");
    const query =
      filter.column === "title"
        ? base.like("title", `${filter.prefix}%`)
        : base.eq("seller_id", filter.equals);
    const rows = must(await query.limit(1000), "read scratch listings") as { id: string }[];
    if (rows.length === 0) return;
    const ids = rows.map((r) => r.id);
    for (const part of chunkByLength(ids)) {
      must(await db.from("listings").delete().in("id", part), "delete scratch listings");
    }
  }
}

async function deleteSeller(db: Db, sellerId: string): Promise<void> {
  const del = await db.auth.admin.deleteUser(sellerId);
  if (del.error) throw new Error(`delete seller: ${del.error.message}`);
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
        country_code: "ET",
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
    const found = await countLeftovers(cleaner, "e2e-bench-");
    await deleteListingsWhere(cleaner, { column: "title", prefix: "e2e-bench-" });
    await deleteCategoriesLike(cleaner, "e2e-bench-");
    await deleteLocationsLike(cleaner, "e2e-bench-");
    const left = await countLeftovers(cleaner, "e2e-bench-");
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
      skipped = `gate unreadable: ${error instanceof Error ? error.message : String(error)}`;
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
          cleanupSeconds: 0,
          leftovers: 0,
          shapes: [],
          bytes: 0,
        }),
      );
      console.log(`::error::feed-bench SKIPPED: ${skipped}`);
      return 1;
    }
    checkGate = yieldWatcher(gate);
  }

  const P = `e2e-bench-${process.env["GITHUB_RUN_ID"] ?? "local"}-${randomLetters(6)}`;
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

  let seeded = 0;
  let seedSeconds = 0;
  let cleanupSeconds = 0;
  let leftovers = 0;
  let bytes = 0;
  const shapes: ShapeResult[] = [];
  let sellerId: string | null = null;
  let failure: string | undefined;
  let yielded: string | undefined;
  let seedStart = 0;

  try {
    // 3. Pre-clean an earlier run.
    await deleteListingsWhere(db, { column: "title", prefix: "e2e-bench-" });
    await deleteCategoriesLike(db, "e2e-bench-");
    await deleteLocationsLike(db, "e2e-bench-");

    // 4. Seed.
    seedStart = Date.now();
    const created = await db.auth.admin.createUser({
      email: `${P}@ethio-e2e.invalid`,
      password: randomPassword(24),
      email_confirm: true,
    });
    if (created.error || !created.data.user) {
      throw new Error(`create seller: ${created.error?.message ?? "no user"}`);
    }
    sellerId = created.data.user.id;

    const et = must(
      await db
        .from("locations")
        .select("id")
        .eq("level", "country")
        .eq("country_code", "ET")
        .single(),
      "read Ethiopia",
    ) as { id: string };

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
      const r = await insertPlace(db, `${P}-r${i}`, "region", et.id, null);
      for (let j = 1; j <= 10; j++) {
        cities.push(await insertPlace(db, `${P}-c${i}-${j}`, "city", r, r));
      }
      if (i === 1) emptyCity = await insertPlace(db, `${P}-cempty`, "city", r, r);
    }

    const now = Date.now();
    const row = (g: number, cat: string, loc: string, tier: string, minutesAgo: number) => ({
      seller_id: sellerId,
      category_id: cat,
      location_id: loc,
      tier,
      published_at: new Date(now - minutesAgo * 60000).toISOString(),
      title: `${P}-${g}`,
      description: "e2e bench listing",
      status: "active",
      home_country_code: "ET",
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
    for (let g = 1; g <= LISTINGS; g++) {
      const tier = g % 100 === 0 ? "premium" : g % 25 === 0 ? "featured" : "regular";
      batch.push(row(g, leaves[(g * 7919) % 156]!, cities[(g * 104729) % 100]!, tier, g % 86400));
      if (batch.length === BATCH) await flush();
    }
    await flush();
    for (let g = 1; g <= HOT; g++) {
      batch.push(row(LISTINGS + g, leaves[0]!, cities[0]!, "regular", g));
      if (batch.length === BATCH) await flush();
    }
    await flush();
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
    const plan: [string, string | null, string | null, unknown][] = [
      ["all, everywhere", null, null, null],
      ["top, country", tops[4]!, et.id, null],
      ["leaf, city", leaves[0]!, cities[0]!, null],
      ["top, city, widening", tops[4]!, emptyCity, null],
      ["page 50 by cursor", null, null, after],
      ["guest host, country", tops[2]!, et.id, null],
    ];
    for (const [name, cat, loc, cursor] of plan) {
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
      if (shapes.length === 0) bytes = answer.bytes;
      shapes.push({ name, ...summarise(answer.ms.slice(WARMUP)), cards: answer.cards });
    }
  } catch (error) {
    if (error instanceof YieldError) yielded = error.message;
    else failure = error instanceof Error ? error.message : String(error);
    if (seedStart > 0 && seedSeconds === 0) seedSeconds = (Date.now() - seedStart) / 1000;
  } finally {
    // 6. Clean up, whatever happened.
    const cleanStart = Date.now();
    try {
      if (sellerId) await deleteListingsWhere(db, { column: "seller_id", equals: sellerId });
      await deleteListingsWhere(db, { column: "title", prefix: P });
      await deleteCategoriesLike(db, P);
      await deleteLocationsLike(db, P);
      if (sellerId) await deleteSeller(db, sellerId);
      leftovers = await countLeftovers(db, P);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      failure = failure ?? `cleanup: ${msg}`;
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
      cleanupSeconds,
      leftovers,
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
      console.log(`::error::feed-bench: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    },
  );
}
