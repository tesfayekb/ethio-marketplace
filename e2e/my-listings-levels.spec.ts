import { type Browser, type Page } from "@playwright/test";

import { en } from "../src/i18n/locales/en";
import { expect, test } from "./fixtures";
import { inBrowserClient } from "./helpers/browser-client";
import { destroyCountry } from "./helpers/countries";
import { doorAnswer, type DoorResult } from "./helpers/door-answer";
import {
  baselineLevelKey,
  freeSlotRoom,
  seedListingRow,
  seedListingRows,
} from "./helpers/listing-seed";
import { destroyLocation, seedScratchChain, seedSingleOptionMarket } from "./helpers/locations";
import {
  activeCityOf,
  bearerOf,
  completeDraft,
  destroyCategoryBranch,
  destroyListingsOf,
  destroyPostableCategory,
  leaseSeller,
  postRoute,
  reasonsOf,
  RUN,
  seedCategoryBranch,
  seedPostableCategory,
  statusOf,
} from "./helpers/posting";
import { destroyScratchReaches, seedScratchReaches } from "./helpers/reach-rows";
import { anonRpc } from "./helpers/session";
import { gotoReady, signInViaSession, useJobSuperAdmin } from "./helpers/ui";
import { adminClient } from "./helpers/users";

/**
 * P-2 (a) ruling 14 item 5 — AN AD'S LEVEL AND ITS CLOCKS (LDR-1…7, SWP-1…4, FSL-1…3).
 *
 * The level doors as signed-in people call them — the seller's set_listing_level
 * (the launch season sets it free with source launch; every refusal by name with
 * nothing written; the market's paid switch ON answers creditsNotAvailable), the
 * staff door admin_set_listing_tier with days and open-ended, the removal that
 * clears all five designation columns — the sweep's core designation_sweep_core
 * on the test's own ads (p_only): a level's end with a free slot falls to the
 * baseline, without one it pauses with the seller's notice and keeps the clock,
 * a reach's end goes back to the included reach, the reminder fires once — and
 * the free-slot law (D318, DEC-342): the N+1th baseline publish is refused naming
 * the slots, a sold ad frees one, a paused ad resumes through its Resume button,
 * and two tabs taking the seller's last free slot at once leave exactly one winner.
 *
 * FIXTURES (J1, J3) — every door and sweep test runs in a scratch market of its
 * own (a user-assigned code, seedSingleOptionMarket) whose market_settings row the
 * test writes and removes, so the free slots and the paid switch are the test's;
 * a level is priced there by a scratch package_prices row. The publish tests run
 * in ET as every posting spec does, the seller's ads beyond the drafts placed in a
 * scratch chain. Real level, reach and market rows are read, never written; LDR-7's
 * reach rows are its own scratch rows (P-2 (c), helpers/reach-rows.ts), named by its market as its included
 * reach. Every row is removed in afterEach (prices, listings, markets, reach rows,
 * places, categories).
 * Truth through the service client (J4); anchors are test ids, words by key (J5).
 */

type Row = Record<string, unknown>;

const TAG = "[e2e:lvl]";
const DAY = 86_400_000;
const MINUTE = 60_000;
const at = (offsetMs: number) => new Date(Date.now() + offsetMs).toISOString();
const ms = (value: unknown) => new Date(String(value)).getTime();

/** Letters only: a scratch title the contact-in-text rule never reads as a number. */
function token(): string {
  return Math.random()
    .toString(36)
    .slice(2, 10)
    .replace(/[0-9]/g, (digit) => "abcdefghij"[Number(digit)] ?? "x");
}

/** "About `expected`": within two minutes of it. */
function expectAbout(value: unknown, expected: number, label: string) {
  expect(value, label).not.toBeNull();
  expect(Math.abs(ms(value) - expected), label).toBeLessThanOrEqual(2 * MINUTE);
}

const DESIGNATION =
  "status,tier,tier_until,tier_source,reach,reach_until,reach_source,expires_at,clock_kept,kept_remaining,resume_status,tier_reminded_for";

async function truth(listingId: string): Promise<Row> {
  const { data, error } = await adminClient()
    .from("listings")
    .select(DESIGNATION)
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(`${TAG} listing read failed: ${error.message}`);
  if (!data) throw new Error(`${TAG} listing ${listingId} not found`);
  return { ...data };
}

async function revisions(listingId: string): Promise<Row[]> {
  const { data, error } = await adminClient()
    .from("listing_revisions")
    .select("kind,actor,before,after")
    .eq("listing_id", listingId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`${TAG} revisions read failed: ${error.message}`);
  return (data ?? []).map((row) => ({ ...row }));
}

async function audits(listingId: string): Promise<Row[]> {
  const { data, error } = await adminClient()
    .from("audit_log")
    .select("action,actor_id,meta")
    .eq("entity_type", "listing")
    .eq("entity_id", listingId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`${TAG} audit read failed: ${error.message}`);
  return (data ?? []).map((row) => ({ ...row }));
}

async function notices(listingId: string): Promise<Row[]> {
  const { data, error } = await adminClient()
    .from("seller_notices")
    .select("kind,seller_id")
    .eq("listing_id", listingId);
  if (error) throw new Error(`${TAG} notices read failed: ${error.message}`);
  return (data ?? []).map((row) => ({ ...row }));
}

async function usedCount(priceId: string): Promise<number> {
  const { data, error } = await adminClient()
    .from("package_prices")
    .select("used_count")
    .eq("id", priceId)
    .single();
  if (error || !data) throw new Error(`${TAG} price read failed: ${error?.message ?? "no row"}`);
  return Number(data.used_count);
}

/** What "nothing written" compares: the ad's designation, its revisions and its audit rows. */
async function trace(listingId: string) {
  return {
    row: await truth(listingId),
    revisions: (await revisions(listingId)).length,
    audits: (await audits(listingId)).length,
  };
}

/** A door called through the page's own client as its signed-in person: data and error text. */
async function door(page: Page, fn: string, args: Record<string, unknown>): Promise<DoorResult> {
  return inBrowserClient(
    page,
    async (client, call) => {
      const result = await client.rpc(call.fn, call.args);
      return { data: result.data, error: result.error?.message ?? null };
    },
    { fn, args },
  );
}

/** The sweep's core on the test's own ads (service only). */
async function sweep(ids: string[]) {
  const { error } = await adminClient().rpc("designation_sweep_core", { p_only: ids });
  if (error) throw new Error(`${TAG} designation_sweep_core failed: ${error.message}`);
}

/** The first enabled self-serve package of `kind` above `key` in the catalog's own order. */
async function selfServeAbove(kind: "level" | "reach", key: string): Promise<string> {
  const client = adminClient();
  const base = await client.from("listing_packages").select("sort").eq("key", key).single();
  if (base.error || !base.data) throw new Error(`${TAG} package ${key}: ${base.error?.message}`);
  const { data, error } = await client
    .from("listing_packages")
    .select("key")
    .eq("kind", kind)
    .eq("enabled", true)
    .eq("self_serve", true)
    .gt("sort", base.data.sort)
    .order("sort")
    .limit(1)
    .maybeSingle();
  if (error || !data)
    throw new Error(`${TAG} no ${kind} above ${key}: ${error?.message ?? "none"}`);
  return String(data.key);
}

/** The default market's included reach (the real row, read only). */
async function includedReach(): Promise<string> {
  const { data, error } = await adminClient()
    .from("market_settings")
    .select("included_reach")
    .is("country_code", null)
    .single();
  if (error || !data) throw new Error(`${TAG} default market: ${error?.message ?? "no row"}`);
  return String(data.included_reach);
}

test.describe("MY LISTINGS — an ad's level and its clocks (P-2 (a))", () => {
  const sellers: string[] = [];
  const listingIds: string[] = [];
  const prices: string[] = [];
  const markets: string[] = [];
  const regions: string[] = [];
  const branches: string[][] = [];
  const categories: string[] = [];
  /** P-2 (c) — scratch reach rows (LDR-7), removed after the market that names one. */
  const reachRows: string[] = [];

  test.afterEach(async () => {
    const supabase = adminClient();
    const failures: string[] = [];
    const step = (label: string, error: { message: string } | null) => {
      if (error) failures.push(`${label}: ${error.message}`);
    };
    const priced = prices.splice(0);
    if (priced.length > 0)
      step("prices", (await supabase.from("package_prices").delete().in("id", priced)).error);
    const owned = listingIds.splice(0);
    if (owned.length > 0)
      step("listings", (await supabase.from("listings").delete().in("id", owned)).error);
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const code of markets.splice(0)) {
      step(
        `market ${code}`,
        (await supabase.from("market_settings").delete().eq("country_code", code)).error,
      );
      await destroyCountry(code);
    }
    const reachFailure = await destroyScratchReaches(reachRows.splice(0));
    if (reachFailure !== null) failures.push(`reach rows: ${reachFailure}`);
    for (const slug of regions.splice(0)) await destroyLocation(slug);
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
    if (failures.length > 0) throw new Error(`${TAG} cleanup failed: ${failures.join("; ")}`);
  });

  /** A scratch market with `free` free baseline ads and the paid switch off, and a scratch leaf. */
  async function scratchMarket(free: number) {
    const market = await seedSingleOptionMarket();
    markets.push(market.code);
    const country = await adminClient()
      .from("countries")
      .select("currency_code")
      .eq("code", market.code)
      .single();
    if (country.error || !country.data)
      throw new Error(`${TAG} reading ${market.code}: ${country.error?.message}`);
    const settings = await adminClient()
      .from("market_settings")
      .insert({
        country_code: market.code,
        free_regular_ads: free,
        included_reach: await includedReach(),
        paid_levels: false,
      });
    if (settings.error) throw new Error(`${TAG} market settings seed: ${settings.error.message}`);
    const { parent, leaf } = await seedCategoryBranch();
    branches.push([String(parent.slug), String(leaf.slug)]);
    return {
      code: market.code,
      cityId: String(market.city.id),
      currency: String(country.data.currency_code),
      leafId: String(leaf.id),
    };
  }

  type Market = Awaited<ReturnType<typeof scratchMarket>>;

  /** A scratch seller of this file (a pooled lease, its ads removed in afterEach). */
  async function scratchSeller() {
    const seller = await leaseSeller({ named: true, alias: true });
    sellers.push(seller.id);
    return seller;
  }

  /** The market's price for `key`: one scratch row, free, valid from an hour ago. */
  async function priced(market: Market, key: string): Promise<string> {
    const { data, error } = await adminClient()
      .from("package_prices")
      .insert({
        package_key: key,
        country_code: market.code,
        amount: 0,
        currency: market.currency,
        credit_cost: 0,
        valid_from: at(-60 * MINUTE),
      })
      .select("id")
      .single();
    if (error || !data) throw new Error(`${TAG} price seed: ${error?.message ?? "no row"}`);
    prices.push(String(data.id));
    return String(data.id);
  }

  /**
   * A complete scratch ad in the market: active and published 20 days ago, ending in
   * 10 days, at the baseline level unless told otherwise; `extra` columns as given.
   */
  async function seed(
    seller: { id: string },
    market: Market,
    options: { status?: string; tier?: string; extra?: Row } = {},
  ): Promise<string> {
    const status = options.status ?? "active";
    const live = status !== "draft";
    const row = await seedListingRow(
      {
        category_id: market.leafId,
        seller_id: seller.id,
        location_id: market.cityId,
        home_country_code: market.code,
        title: `E2E level ${RUN.replace(/[0-9]/g, "x")} ${token()}`,
        description: "e2e scratch listing for the level doors",
        attributes: {},
        price_mode: "fixed",
        price_amount: 100,
        price_currency: market.currency,
        price_period: "once",
        price_set_at: at(-20 * DAY),
        contact_pref: { messages: true },
        status,
        tier: options.tier ?? (await baselineLevelKey()),
        published_at: live ? at(-20 * DAY) : null,
        published_first_at: live ? at(-20 * DAY) : null,
        expires_at: live ? at(10 * DAY) : null,
        ...options.extra,
      },
      { tag: "lvl" },
    );
    listingIds.push(row.id);
    const located = await adminClient()
      .from("listing_locations")
      .insert({ listing_id: row.id, location_id: market.cityId, position: 1 });
    if (located.error) throw new Error(`${TAG} coverage failed: ${located.error.message}`);
    return row.id;
  }

  /** A paused baseline ad, as the sweep leaves one: five days kept, back to active on resume. */
  const PAUSED: Row = {
    status: "paused",
    resume_status: "active",
    clock_kept: true,
    kept_remaining: "5 days",
    expires_at: null,
  };

  // ─────────────── the level doors (LDR-1…5) and the Promote sheet's reach read (LDR-7) ───────────────

  test("LDR-1 while the paid switch is off the seller's level is set free: the level, its end, source launch, one revision, one audit row, the price's use counted", async ({
    page,
  }) => {
    const market = await scratchMarket(1);
    const seller = await scratchSeller();
    const ad = await seed(seller, market);
    const level = await selfServeAbove("level", await baselineLevelKey());
    const price = await priced(market, level);
    const perks = await adminClient().rpc("level_perks_for", {
      p_level_key: level,
      p_category_id: market.leafId,
      p_country_code: market.code,
    });
    const answered = perks.data;
    const days =
      typeof answered === "object" && answered !== null && !Array.isArray(answered)
        ? Number(answered["days"])
        : Number.NaN;
    expect(days, `${TAG} the level's days: ${JSON.stringify(perks)}`).toBeGreaterThan(0);
    await signInViaSession(page, seller.email, seller.password);

    const answer = doorAnswer(
      await door(page, "set_listing_level", { p_listing_id: ad, p_level_key: level }),
      "set_listing_level",
    );
    expect(answer["level"]).toBe(level);
    expect(answer["source"]).toBe("launch");
    expect(answer["status"]).toBe("active");

    const row = await truth(ad);
    expect(row["tier"]).toBe(level);
    expect(row["tier_source"]).toBe("launch");
    expectAbout(row["tier_until"], Date.now() + days * DAY, "tier_until");
    expect(await usedCount(price)).toBe(1);
    const edits = await revisions(ad);
    expect(edits).toHaveLength(1);
    expect(edits[0]?.["kind"]).toBe("edit");
    expect(edits[0]?.["actor"]).toBe(seller.id);
    expect(edits[0]?.["after"]).toMatchObject({ tier: level, tier_source: "launch" });
    const rows = await audits(ad);
    expect(rows.map((r) => r["action"])).toEqual(["listing.level_set"]);
    expect(rows[0]?.["actor_id"]).toBe(seller.id);
    expect(rows[0]?.["meta"]).toMatchObject({
      from: await baselineLevelKey(),
      to: level,
      source: "launch",
      price_id: price,
    });
  });

  test("LDR-2 each refusal of the seller's level door by name, and nothing written", async ({
    page,
  }) => {
    const market = await scratchMarket(1);
    const seller = await scratchSeller();
    const other = await scratchSeller();
    const baseline = await baselineLevelKey();
    const level = await selfServeAbove("level", baseline);
    await priced(market, level);
    const raised = await seed(seller, market, {
      tier: level,
      extra: { tier_until: at(5 * DAY), tier_source: "launch" },
    });
    const draft = await seed(seller, market, { status: "draft" });
    const theirs = await seed(other, market);
    await signInViaSession(page, seller.email, seller.password);
    const reach = await includedReach();

    // The door is closed to the anonymous role (born closed): its notSignedIn is the in-body
    // guard the migration's proof reaches; through the API the anonymous call is refused first.
    const untouched = await trace(raised);
    const anonymous = await anonRpc("set_listing_level", {
      p_listing_id: raised,
      p_level_key: level,
    });
    expect(anonymous.status, JSON.stringify(anonymous.body)).toBeGreaterThanOrEqual(400);
    expect(JSON.stringify(anonymous.body), "anonymous").toMatch(/notSignedIn|permission denied/);
    expect(await trace(raised), "the anonymous call left a trace").toEqual(untouched);

    const cases: Array<{ reason: string; id: string; key: string }> = [
      { reason: "listingNotFound", id: theirs, key: level },
      { reason: "notLive", id: draft, key: level },
      { reason: "unknownLevel", id: raised, key: reach },
      { reason: "sameLevel", id: raised, key: level },
      { reason: "lowerLevel", id: raised, key: baseline },
    ];
    for (const refusal of cases) {
      const before = await trace(refusal.id);
      const answer = await door(page, "set_listing_level", {
        p_listing_id: refusal.id,
        p_level_key: refusal.key,
      });
      expect(answer.data, refusal.reason).toBeNull();
      expect(String(answer.error), refusal.reason).toContain(refusal.reason);
      expect(await trace(refusal.id), `${refusal.reason} left a trace`).toEqual(before);
    }
  });

  test("LDR-3 with the market's paid switch on the seller's level door answers creditsNotAvailable and writes nothing", async ({
    page,
  }) => {
    const market = await scratchMarket(1);
    const seller = await scratchSeller();
    const ad = await seed(seller, market);
    const level = await selfServeAbove("level", await baselineLevelKey());
    const price = await priced(market, level);
    const on = await adminClient()
      .from("market_settings")
      .update({ paid_levels: true, paid_levels_since: at(0), launch_credits: 10, launch_days: 30 })
      .eq("country_code", market.code);
    if (on.error) throw new Error(`${TAG} turning the scratch market on: ${on.error.message}`);
    await signInViaSession(page, seller.email, seller.password);

    const before = await trace(ad);
    const answer = await door(page, "set_listing_level", { p_listing_id: ad, p_level_key: level });
    expect(answer.data).toBeNull();
    expect(String(answer.error)).toContain("creditsNotAvailable");
    expect(await trace(ad)).toEqual(before);
    expect(await usedCount(price)).toBe(0);
  });

  test("LDR-4 staff set a level for some days and open-ended; days on the baseline are refused badDays", async ({
    page,
  }) => {
    const market = await scratchMarket(2);
    const seller = await scratchSeller();
    const timed = await seed(seller, market);
    const open = await seed(seller, market);
    const level = await selfServeAbove("level", await baselineLevelKey());
    await useJobSuperAdmin(page);

    const days = doorAnswer(
      await door(page, "admin_set_listing_tier", {
        p_listing_id: timed,
        p_tier: level,
        p_reason: "promotion",
        p_days: 7,
      }),
      "admin_set_listing_tier",
    );
    expect(days).toMatchObject({ to: level, source: "staff", status: "active" });
    const timedRow = await truth(timed);
    expect(timedRow["tier"]).toBe(level);
    expect(timedRow["tier_source"]).toBe("staff");
    expectAbout(timedRow["tier_until"], Date.now() + 7 * DAY, "tier_until");

    const openEnded = doorAnswer(
      await door(page, "admin_set_listing_tier", {
        p_listing_id: open,
        p_tier: level,
        p_reason: "promotion",
      }),
      "admin_set_listing_tier",
    );
    expect(openEnded).toMatchObject({ to: level, source: "staff", until: null });
    const openRow = await truth(open);
    expect(openRow["tier"]).toBe(level);
    expect(openRow["tier_source"]).toBe("staff");
    expect(openRow["tier_until"]).toBeNull();

    const before = await trace(timed);
    const refused = await door(page, "admin_set_listing_tier", {
      p_listing_id: timed,
      p_tier: await baselineLevelKey(),
      p_reason: "promotion_ended",
      p_days: 3,
    });
    expect(refused.data).toBeNull();
    expect(String(refused.error)).toContain("badDays");
    expect(await trace(timed)).toEqual(before);
  });

  test("LDR-5 the seller's removal clears all five designation columns and the level", async ({
    page,
  }) => {
    const market = await scratchMarket(1);
    const seller = await scratchSeller();
    const baseline = await baselineLevelKey();
    const level = await selfServeAbove("level", baseline);
    const reach = await selfServeAbove("reach", await includedReach());
    const ad = await seed(seller, market, {
      tier: level,
      extra: {
        tier_until: at(5 * DAY),
        tier_source: "launch",
        reach,
        reach_until: at(5 * DAY),
        reach_source: "launch",
      },
    });
    await signInViaSession(page, seller.email, seller.password);

    const removed = await door(page, "transition_listing", {
      p_listing_id: ad,
      p_new_status: "removed",
    });
    expect(removed.error).toBeNull();
    expect(await truth(ad)).toMatchObject({
      status: "removed",
      tier: baseline,
      tier_until: null,
      tier_source: null,
      reach: null,
      reach_until: null,
      reach_source: null,
    });
  });

  test("LDR-7 promote_options answers the ad's reach and each reach row by set_listing_reach's refusal: the included row includedReach, a lower row lowerReach, an unpriced row notOffered; nothing written", async ({
    page,
  }) => {
    const market = await scratchMarket(1);
    const rows = await seedScratchReaches(market.code, reachRows);
    const seller = await scratchSeller();
    const ad = await seed(seller, market);
    const before = await trace(ad);
    await signInViaSession(page, seller.email, seller.password);

    const answer = doorAnswer(
      await door(page, "promote_options", { p_listing_id: ad }),
      "promote_options",
    );
    expect(answer["reach"]).toEqual({
      key: rows.included.key,
      until: null,
      source: null,
      included: rows.included.key,
    });
    const listed = answer["reaches"];
    if (!Array.isArray(listed))
      throw new Error(`${TAG} promote_options: no reaches: ${JSON.stringify(answer)}`);
    const keys = new Set(Object.values(rows).map((row) => row.key));
    const mine = listed
      .filter(
        (row: unknown): row is Row =>
          typeof row === "object" && row !== null && !Array.isArray(row),
      )
      .filter((row) => keys.has(String(row["key"])));
    const expected = (
      row: { key: string; sort: number; days: number },
      current: boolean,
      below: boolean,
      availability: string,
    ) => ({
      key: row.key,
      name_en: `E2E reach ${row.key}`,
      name_am: null,
      sort: row.sort,
      current,
      below,
      days: row.days,
      amount: null,
      currency: null,
      availability,
    });
    expect(mine, "LDR-7: the scratch reach rows in the catalog's order").toEqual([
      expected(rows.low, false, true, "lowerReach"),
      expected(rows.included, true, false, "includedReach"),
      expected(rows.unpriced, false, false, "notOffered"),
    ]);
    expect(await trace(ad), "LDR-7: a read writes nothing").toEqual(before);
  });

  // ─────────────── the sweep (SWP-1…4) ───────────────

  test("SWP-1 an ended level with a free slot falls to the baseline and stays live: one edit revision, listing.level_ended, no notice", async () => {
    const market = await scratchMarket(1);
    const seller = await scratchSeller();
    const baseline = await baselineLevelKey();
    const level = await selfServeAbove("level", baseline);
    const ad = await seed(seller, market, {
      tier: level,
      extra: { tier_until: at(-60 * MINUTE), tier_source: "launch" },
    });

    await sweep([ad]);
    expect(await truth(ad)).toMatchObject({
      status: "active",
      tier: baseline,
      tier_until: null,
      tier_source: null,
    });
    const edits = await revisions(ad);
    expect(edits.map((r) => [r["kind"], r["actor"]])).toEqual([["edit", null]]);
    expect(edits[0]?.["after"]).toEqual({ tier: baseline, tier_until: null, tier_source: null });
    const rows = await audits(ad);
    expect(rows.map((r) => [r["action"], r["actor_id"]])).toEqual([["listing.level_ended", null]]);
    expect(rows[0]?.["meta"]).toMatchObject({ from: level, to: baseline, source: "launch" });
    expect(await notices(ad)).toEqual([]);
  });

  test("SWP-2 an ended level without a free slot pauses with the seller's notice and keeps its clock", async () => {
    const market = await scratchMarket(1);
    const seller = await scratchSeller();
    const baseline = await baselineLevelKey();
    const level = await selfServeAbove("level", baseline);
    await seed(seller, market);
    const ad = await seed(seller, market, {
      tier: level,
      extra: { tier_until: at(-60 * MINUTE), tier_source: "launch" },
    });

    await sweep([ad]);
    const row = await truth(ad);
    expect(row).toMatchObject({
      status: "paused",
      tier: baseline,
      tier_until: null,
      tier_source: null,
      clock_kept: true,
      resume_status: "active",
    });
    expect(String(row["kept_remaining"]), "the ten days kept").toMatch(/^(9 days 23:|10 days)/);
    // One transaction writes both revisions and both audit rows: one moment, so no order between them.
    const kinds = (await revisions(ad)).map((r) => `${String(r["kind"])}:${String(r["actor"])}`);
    expect(kinds.sort()).toEqual(["edit:null", "state:null"]);
    const rows = await audits(ad);
    expect(rows.map((r) => String(r["action"])).sort()).toEqual([
      "listing.level_ended",
      "listing.level_paused",
    ]);
    const paused = rows.find((r) => r["action"] === "listing.level_paused");
    expect(paused?.["actor_id"]).toBeNull();
    expect(paused?.["meta"]).toEqual({ from: level, live: 1, slots: 1 });
    expect(await notices(ad)).toEqual([{ kind: "level_paused", seller_id: seller.id }]);
  });

  test("SWP-3 an ended reach goes back to the market's included reach: the three reach columns cleared, listing.reach_ended", async () => {
    const market = await scratchMarket(1);
    const seller = await scratchSeller();
    const reach = await selfServeAbove("reach", await includedReach());
    const ad = await seed(seller, market, {
      extra: { reach, reach_until: at(-60 * MINUTE), reach_source: "launch" },
    });

    await sweep([ad]);
    expect(await truth(ad)).toMatchObject({
      status: "active",
      reach: null,
      reach_until: null,
      reach_source: null,
    });
    const edits = await revisions(ad);
    expect(edits.map((r) => [r["kind"], r["actor"]])).toEqual([["edit", null]]);
    expect(edits[0]?.["after"]).toMatchObject({
      reach: null,
      reach_until: null,
      reach_source: null,
      coverage: [market.cityId],
    });
    const rows = await audits(ad);
    expect(rows.map((r) => [r["action"], r["actor_id"]])).toEqual([["listing.reach_ended", null]]);
    expect(rows[0]?.["meta"]).toMatchObject({ from: reach, source: "launch" });
    // P-2 (c) — with its reach column cleared, the ad resolves to its market's included reach.
    const own = await adminClient()
      .from("market_settings")
      .select("included_reach")
      .eq("country_code", market.code)
      .single();
    if (own.error || !own.data) throw new Error(`${TAG} scratch market: ${own.error?.message}`);
    const resolved = await adminClient().rpc("listing_effective_reach", { p_listing: ad });
    if (resolved.error)
      throw new Error(`${TAG} listing_effective_reach: ${resolved.error.message}`);
    expect(resolved.data, "SWP-3: the ad resolves to its market's included reach").toBe(
      own.data.included_reach,
    );
  });

  test("SWP-4 a level ending within three days reminds the seller once; a second sweep adds nothing", async () => {
    const market = await scratchMarket(1);
    const seller = await scratchSeller();
    const level = await selfServeAbove("level", await baselineLevelKey());
    const until = at(2 * DAY);
    const ad = await seed(seller, market, {
      tier: level,
      extra: { tier_until: until, tier_source: "launch" },
    });

    await sweep([ad]);
    const first = await truth(ad);
    expect(ms(first["tier_reminded_for"])).toBe(ms(until));
    expect(first["tier"]).toBe(level);
    expect(await notices(ad)).toEqual([{ kind: "level_ending", seller_id: seller.id }]);
    await sweep([ad]);
    expect(await notices(ad)).toEqual([{ kind: "level_ending", seller_id: seller.id }]);
    expect(await truth(ad)).toEqual(first);
  });

  // ─────────────── the free slots (FSL-1…3) and the two-tab race (LDR-6) ───────────────

  /** A posting seller signed in on the page in ET, with a postable category and its bearer. */
  async function postingSeller(page: Page) {
    const seller = await scratchSeller();
    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, "/");
    const category = await seedPostableCategory();
    categories.push(String(category.slug));
    const city = await activeCityOf("ET");
    const chain = await seedScratchChain("ET");
    regions.push(String(chain.region.slug));
    return {
      seller,
      token: await bearerOf(page),
      categoryId: String(category.id),
      cityId: String(city.id),
      chainCityId: String(chain.city.id),
    };
  }

  /** The seller's ET free slots filled by live baseline ads in the scratch chain; their ids. */
  async function fillFreeSlots(sellerId: string, categoryId: string, cityId: string) {
    const room = await freeSlotRoom(sellerId, "ET", "lvl");
    const baseline = await baselineLevelKey();
    const rows = await seedListingRows(
      Array.from({ length: room.free - room.used }, () => ({
        category_id: categoryId,
        seller_id: sellerId,
        location_id: cityId,
        home_country_code: "ET",
        title: `E2E slot ${RUN.replace(/[0-9]/g, "x")} ${token()}`,
        description: "e2e scratch listing holding a free slot",
        attributes: {},
        price_mode: "fixed",
        price_amount: 100,
        price_currency: "ETB",
        price_period: "once",
        price_set_at: at(-DAY),
        contact_pref: { messages: true },
        status: "active",
        tier: baseline,
        published_at: at(-DAY),
        published_first_at: at(-DAY),
        expires_at: at(10 * DAY),
      })),
      { tag: "lvl" },
    );
    for (const row of rows) listingIds.push(row.id);
    return { free: room.free, ids: rows.map((row) => row.id) };
  }

  async function draftIn(
    page: Page,
    posting: Awaited<ReturnType<typeof postingSeller>>,
  ): Promise<string> {
    const draft = await postRoute(
      page,
      "/api/listings/draft",
      completeDraft({
        categoryId: posting.categoryId,
        cityId: posting.cityId,
        title: `e2e level slot ${token()}`,
      }),
      { token: posting.token, country: "ET" },
    );
    expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
    const id = String(draft.payload["listing_id"] ?? "");
    expect(id, "no draft id").not.toBe("");
    listingIds.push(id);
    return id;
  }

  const publish = (page: Page, token: string, listingId: string) =>
    postRoute(page, "/api/listings/publish", { listingId }, { token, country: "ET" });

  test("FSL-1 with every free slot in use the next baseline publish is refused naming the slots, and the draft stays a draft", async ({
    page,
  }) => {
    const posting = await postingSeller(page);
    const filled = await fillFreeSlots(posting.seller.id, posting.categoryId, posting.chainCityId);
    const draft = await draftIn(page, posting);

    const refused = await publish(page, posting.token, draft);
    expect(refused.payload["ok"], JSON.stringify(refused.payload)).toBe(false);
    expect(reasonsOf(refused.payload)).toEqual([{ field: "slots", reason: "noFreeSlot" }]);
    const listed = Array.isArray(refused.payload["refusals"]) ? refused.payload["refusals"] : [];
    expect(listed[0]).toMatchObject({ detail: filled.free });
    expect(await statusOf(draft)).toBe("draft");
  });

  test("FSL-2 an ad marked sold frees its slot: the same publish then goes to screening", async ({
    page,
  }) => {
    const posting = await postingSeller(page);
    const filled = await fillFreeSlots(posting.seller.id, posting.categoryId, posting.chainCityId);
    const draft = await draftIn(page, posting);
    const refused = await publish(page, posting.token, draft);
    expect(reasonsOf(refused.payload)).toEqual([{ field: "slots", reason: "noFreeSlot" }]);

    const [first] = filled.ids;
    if (first === undefined) throw new Error(`${TAG} the market holds no free slot to fill`);
    doorAnswer(await door(page, "mark_sold", { p_listing_id: first }), "mark_sold");
    const published = await publish(page, posting.token, draft);
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    expect(await statusOf(draft)).toBe("screening");
  });

  async function openPaused(page: Page, id: string) {
    await gotoReady(page, `/my-listings/${id}`);
    await expect(page.getByTestId("my-listing-page")).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId("my-listing-paused-help")).toHaveText(
      en["myListings.pausedHelp"],
      {
        timeout: 15000,
      },
    );
    await expect(page.getByTestId("my-listing-action-resume")).toHaveText(
      en["myListings.ad.resume"],
    );
  }

  test("FSL-3 the Resume button: refused with the no-free-slot words while the slot is taken, then live with its kept days once the other ad is sold", async ({
    page,
  }) => {
    const market = await scratchMarket(1);
    const seller = await scratchSeller();
    const live = await seed(seller, market);
    const paused = await seed(seller, market, { extra: PAUSED, status: "paused" });
    await signInViaSession(page, seller.email, seller.password);
    await openPaused(page, paused);

    const before = await trace(paused);
    await page.getByTestId("my-listing-action-resume").click();
    await expect(page.getByTestId("my-listing-problem")).toHaveText(en["post.refusal.noFreeSlot"], {
      timeout: 15000,
    });
    expect(await trace(paused)).toEqual(before);

    doorAnswer(await door(page, "mark_sold", { p_listing_id: live }), "mark_sold");
    await openPaused(page, paused);
    await page.getByTestId("my-listing-action-resume").click();
    await expect(page.getByTestId("my-listing-notice")).toHaveText(en["myListings.done.reopen"], {
      timeout: 15000,
    });
    const row = await truth(paused);
    expect(row).toMatchObject({ status: "active", clock_kept: false, kept_remaining: null });
    expectAbout(row["expires_at"], Date.now() + 5 * DAY, "the kept five days");
  });

  /** A second tab of the same seller, signed in on its own context. */
  async function secondTab(browser: Browser, page: Page, email: string, password: string) {
    const context = await browser.newContext({ viewport: page.viewportSize() ?? undefined });
    const tab = await context.newPage();
    await signInViaSession(tab, email, password);
    return { context, tab };
  }

  test("LDR-6 two tabs resume two paused ads onto the seller's last free slot at once: exactly one wins, the other shows the no-free-slot words, nothing half-written", async ({
    page,
    browser,
  }) => {
    const market = await scratchMarket(1);
    const seller = await scratchSeller();
    const a = await seed(seller, market, { extra: PAUSED, status: "paused" });
    const b = await seed(seller, market, { extra: PAUSED, status: "paused" });
    await signInViaSession(page, seller.email, seller.password);
    const { context, tab } = await secondTab(browser, page, seller.email, seller.password);
    try {
      await openPaused(page, a);
      await openPaused(tab, b);
      const before = { [a]: await trace(a), [b]: await trace(b) };

      await Promise.all([
        page.getByTestId("my-listing-action-resume").click(),
        tab.getByTestId("my-listing-action-resume").click(),
      ]);
      const outcome = async (where: Page) => {
        // The notice's line is always drawn; it holds words only while shown.
        const settled = where.locator(
          '[data-testid="my-listing-notice"][data-shown="true"], [data-testid="my-listing-problem"]',
        );
        await expect(settled).toHaveCount(1, { timeout: 15000 });
        const problem = where.getByTestId("my-listing-problem");
        if ((await problem.count()) > 0) return await problem.textContent();
        await expect(where.getByTestId("my-listing-notice")).toHaveText(
          en["myListings.done.reopen"],
        );
        return "won";
      };
      const answers = [await outcome(page), await outcome(tab)];
      expect([...answers].sort()).toEqual([en["post.refusal.noFreeSlot"], "won"].sort());

      const winner = answers[0] === "won" ? a : b;
      const loser = winner === a ? b : a;
      expect((await truth(winner))["status"]).toBe("active");
      expect(await trace(loser), "the losing tab's ad").toEqual(before[loser]);
    } finally {
      await context.close();
    }
  });
});
