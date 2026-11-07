import { type Page } from "@playwright/test";

import { en } from "../src/i18n/locales/en";
import { formatDate } from "../src/lib/format";
import { ownValue } from "../src/lib/own-key";
import { expect, test } from "./fixtures";
import { destroyCountry } from "./helpers/countries";
import { baselineLevelKey, seedListingRow, updateListingRow } from "./helpers/listing-seed";
import { seedSingleOptionMarket } from "./helpers/locations";
import {
  destroyCategoryBranch,
  destroyListingsOf,
  leaseSeller,
  RUN,
  seedCategoryBranch,
} from "./helpers/posting";
import { gotoReady, signInViaSession, stepUpIfPrompted, useJobSuperAdmin } from "./helpers/ui";
import { adminClient } from "./helpers/users";

/**
 * P-2 turn (b) (DEC-349) — PROMOTE: THE SELLER'S LEVEL SHEET AND THE STAFF DAYS
 * FIELD, as a person uses them (LVP-1…4).
 *
 * The seller's row menu and ad page open the one Promote sheet, which shows what
 * `promote_options` answers: while the market's paid levels are off a level is set
 * free (the launch line), the row then shows the level's end and the sheet names
 * the level current with its end; a level set meanwhile makes the sheet's choice
 * a refusal by name (sameLevel with its end, lowerLevel) and nothing is written.
 * Staff's Set tier takes Days on the ad page and on the roster (one dialog, one
 * door): days set source staff and an end, blank is open-ended, days on the
 * baseline are refused at the field; the ad page's level line shows the level,
 * its source and its end.
 *
 * FIXTURES (J1, J3) — every test runs in a scratch market of its own
 * (seedSingleOptionMarket) whose market_settings row it writes (paid levels off)
 * and a scratch price row for the level it promotes to; real level rows are read
 * (keys and order only), never written. Every row is removed in afterEach.
 * Truth through the service client (J4); anchors are test ids, words by key (J5).
 */

type Row = Record<string, unknown>;

const TAG = "[e2e:lvp]";
const DAY = 86_400_000;
const MINUTE = 60_000;
const at = (offsetMs: number) => new Date(Date.now() + offsetMs).toISOString();
const day = (iso: unknown) => formatDate("day", String(iso), "en");

/** Letters only: a scratch title the contact-in-text rule never reads as a number. */
function token(): string {
  return Math.random()
    .toString(36)
    .slice(2, 10)
    .replace(/[0-9]/g, (digit) => "abcdefghij"[Number(digit)] ?? "x");
}

function expectAbout(value: unknown, expected: number, label: string) {
  expect(value, label).not.toBeNull();
  const diff = Math.abs(new Date(String(value)).getTime() - expected);
  expect(diff, label).toBeLessThanOrEqual(2 * MINUTE);
}

const DESIGNATION = "status,tier,tier_until,tier_source,expires_at";

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

async function counted(table: "listing_revisions" | "audit_log", listingId: string) {
  const query =
    table === "audit_log"
      ? adminClient()
          .from("audit_log")
          .select("id", { count: "exact", head: true })
          .eq("entity_type", "listing")
          .eq("entity_id", listingId)
      : adminClient()
          .from("listing_revisions")
          .select("id", { count: "exact", head: true })
          .eq("listing_id", listingId);
  const { count, error } = await query;
  if (error) throw new Error(`${TAG} ${table} count failed: ${error.message}`);
  return count ?? 0;
}

/** What "nothing written" compares: the ad's designation, its revisions and its audit rows. */
async function trace(listingId: string) {
  return {
    row: await truth(listingId),
    revisions: await counted("listing_revisions", listingId),
    audits: await counted("audit_log", listingId),
  };
}

/** The enabled levels in the catalog's own order (keys and sort only; the spec's read). */
async function levelLadder(): Promise<Array<{ key: string; sort: number; selfServe: boolean }>> {
  const { data, error } = await adminClient()
    .from("listing_packages")
    .select("key,sort,self_serve")
    .eq("kind", "level")
    .eq("enabled", true)
    .order("sort", { ascending: true });
  if (error || !data) throw new Error(`${TAG} the level ladder: ${error?.message ?? "no rows"}`);
  return data.map((row) => ({
    key: String(row.key),
    sort: Number(row.sort),
    selfServe: row.self_serve === true,
  }));
}

/** The first self-serve level above the baseline, and the next enabled level above it (or null). */
async function levelsAbove(): Promise<{ baseline: string; level: string; higher: string | null }> {
  const baseline = await baselineLevelKey();
  const ladder = await levelLadder();
  const base = ladder.find((entry) => entry.key === baseline);
  if (base === undefined) throw new Error(`${TAG} the baseline ${baseline} is not on the ladder`);
  const level = ladder.find((entry) => entry.sort > base.sort && entry.selfServe);
  if (level === undefined) throw new Error(`${TAG} no self-serve level above ${baseline}`);
  const higher = ladder.find((entry) => entry.sort > level.sort) ?? null;
  return { baseline, level: level.key, higher: higher?.key ?? null };
}

/** The P-1 tier word the staff dialog draws for a level key (its pick testid and its label). */
const TIER_WORD: Record<string, string> = {
  premium: en["tier.premium"],
  featured: en["tier.featured"],
  regular: en["admin.listings.tier.regular"],
};
function tierWord(key: string): string {
  const word = ownValue(TIER_WORD, key);
  if (word === undefined) throw new Error(`${TAG} the staff dialog draws no pick for ${key}`);
  return word;
}

/** The visible twin of a My listings row: the table row from 1280 px, the card below it. */
function rowBox(page: Page, id: string) {
  const width = page.viewportSize()?.width ?? 0;
  return page.getByTestId(width >= 1280 ? `my-listing-${id}` : `my-listing-${id}-actions`);
}
function rowTwin(page: Page, id: string) {
  const width = page.viewportSize()?.width ?? 0;
  return page.getByTestId(width >= 1280 ? `my-listing-${id}` : `my-listing-${id}-card`);
}

test.describe("MY LISTINGS — Promote: the level sheet and the staff Days field (P-2 (b))", () => {
  const sellers: string[] = [];
  const listingIds: string[] = [];
  const prices: string[] = [];
  const markets: string[] = [];
  const branches: string[][] = [];

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
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
    if (failures.length > 0) throw new Error(`${TAG} cleanup failed: ${failures.join("; ")}`);
  });

  /** A scratch market with two free baseline ads and the paid switch off, and a scratch leaf. */
  async function scratchMarket() {
    const market = await seedSingleOptionMarket();
    markets.push(market.code);
    const country = await adminClient()
      .from("countries")
      .select("currency_code")
      .eq("code", market.code)
      .single();
    if (country.error || !country.data)
      throw new Error(`${TAG} reading ${market.code}: ${country.error?.message}`);
    const reach = await adminClient()
      .from("market_settings")
      .select("included_reach")
      .is("country_code", null)
      .single();
    if (reach.error || !reach.data)
      throw new Error(`${TAG} default market: ${reach.error?.message ?? "no row"}`);
    const settings = await adminClient()
      .from("market_settings")
      .insert({
        country_code: market.code,
        free_regular_ads: 2,
        included_reach: String(reach.data.included_reach),
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

  async function scratchSeller() {
    const seller = await leaseSeller({ named: true, alias: true });
    sellers.push(seller.id);
    return seller;
  }

  /** The market's price for `key`: one scratch row, free, valid from an hour ago. */
  async function priced(market: Market, key: string) {
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
  }

  /** A complete live scratch ad in the market at the baseline: published 20 days ago, ending in 10. */
  async function seed(seller: { id: string }, market: Market): Promise<string> {
    const row = await seedListingRow(
      {
        category_id: market.leafId,
        seller_id: seller.id,
        location_id: market.cityId,
        home_country_code: market.code,
        title: `E2E promote ${RUN.replace(/[0-9]/g, "x")} ${token()}`,
        description: "e2e scratch listing for the promote sheet",
        attributes: {},
        price_mode: "fixed",
        price_amount: 100,
        price_currency: market.currency,
        price_period: "once",
        price_set_at: at(-20 * DAY),
        contact_pref: { messages: true },
        status: "active",
        tier: await baselineLevelKey(),
        published_at: at(-20 * DAY),
        published_first_at: at(-20 * DAY),
        expires_at: at(10 * DAY),
      },
      { tag: "lvp" },
    );
    listingIds.push(row.id);
    const located = await adminClient()
      .from("listing_locations")
      .insert({ listing_id: row.id, location_id: market.cityId, position: 1 });
    if (located.error) throw new Error(`${TAG} coverage failed: ${located.error.message}`);
    return row.id;
  }

  async function openAdSheet(page: Page, id: string) {
    await gotoReady(page, `/my-listings/${id}`);
    await expect(page.getByTestId("my-listing-promote")).toHaveText(
      en["myListings.action.promote"],
      { timeout: 15000 },
    );
    await page.getByTestId("my-listing-promote").click();
    await expect(page.getByTestId("promote-sheet")).toBeVisible({ timeout: 15000 });
  }

  // ─────────────── the seller's sheet (LVP-1, LVP-2) ───────────────

  test("LVP-1 the row menu's Promote: while paid levels are off a level is set free; the row shows its end; the ad page's sheet names it current with its end", async ({
    page,
  }) => {
    const market = await scratchMarket();
    const seller = await scratchSeller();
    const ad = await seed(seller, market);
    const { baseline, level } = await levelsAbove();
    await priced(market, level);
    await signInViaSession(page, seller.email, seller.password);

    await gotoReady(page, "/my-listings");
    await expect(rowTwin(page, ad)).toBeVisible({ timeout: 15000 });
    await rowBox(page, ad).getByTestId(`my-listing-${ad}-more`).click();
    await expect(page.getByTestId(`my-listing-${ad}-more-promote`)).toHaveText(
      en["myListings.action.promote"],
    );
    await page.getByTestId(`my-listing-${ad}-more-promote`).click();
    const sheet = page.getByTestId("promote-sheet");
    await expect(sheet).toBeVisible({ timeout: 15000 });
    await expect(sheet.getByTestId(`promote-current-${baseline}`)).toHaveText(
      en["myListings.promote.current"],
      { timeout: 15000 },
    );
    const offered = sheet.getByTestId(`promote-level-${level}`);
    await expect(offered).toContainText(en["myListings.promote.freeLaunch"]);
    const before = await truth(ad);
    expect(before["tier"]).toBe(baseline);

    await sheet.getByTestId(`promote-choose-${level}`).click();
    await expect(page.getByTestId("promote-sheet")).toHaveCount(0, { timeout: 15000 });
    const row = await truth(ad);
    expect(row).toMatchObject({ tier: level, tier_source: "launch", status: "active" });
    expect(row["tier_until"]).not.toBeNull();
    await expect(page.getByTestId("my-listings-notice")).toHaveText(
      en["myListings.promote.done"].replace("{date}", day(row["tier_until"])),
      { timeout: 15000 },
    );
    await expect(rowTwin(page, ad).getByTestId(`my-listing-${ad}-state`)).toContainText(
      en["myListings.levelEnding"].replace("{date}", day(row["tier_until"])),
      { timeout: 15000 },
    );

    await openAdSheet(page, ad);
    await expect(sheet.getByTestId(`promote-current-${level}`)).toHaveText(
      en["myListings.promote.current"],
      { timeout: 15000 },
    );
    await expect(sheet.getByTestId("promote-until")).toHaveText(
      en["myListings.promote.until"].replace("{date}", day(row["tier_until"])),
    );
    await expect(sheet.getByTestId(`promote-reason-${baseline}`)).toHaveText(
      en["myListings.promote.notAvailable"],
    );
    await expect(sheet.getByTestId(`promote-choose-${level}`)).toHaveCount(0);
  });

  test("LVP-2 a level set meanwhile: the sheet's choice is refused by name — sameLevel with its end, lowerLevel — and nothing is written", async ({
    page,
  }) => {
    const market = await scratchMarket();
    const seller = await scratchSeller();
    const ad = await seed(seller, market);
    const { baseline, level, higher } = await levelsAbove();
    if (higher === null) throw new Error(`${TAG} the ladder has no level above ${level}`);
    await priced(market, level);
    await signInViaSession(page, seller.email, seller.password);
    const sheet = page.getByTestId("promote-sheet");

    // The same level, set while the sheet was open: sameLevel, named with the ad's end.
    await openAdSheet(page, ad);
    await expect(sheet.getByTestId(`promote-choose-${level}`)).toBeVisible({ timeout: 15000 });
    const until = at(5 * DAY);
    const same = await updateListingRow(
      ad,
      { tier: level, tier_until: until, tier_source: "launch" },
      { tag: "lvp" },
    );
    expect(same, `${TAG} the ad moved to ${level}`).not.toBeNull();
    const sameBefore = await trace(ad);
    await sheet.getByTestId(`promote-choose-${level}`).click();
    await expect(sheet.getByTestId("promote-problem")).toHaveText(
      en["myListings.promote.error.sameLevel"].replace("{date}", day(sameBefore.row["tier_until"])),
      { timeout: 15000 },
    );
    expect(await trace(ad), "sameLevel left a trace").toEqual(sameBefore);

    // A higher level, set while the sheet was open: lowerLevel.
    const back = await updateListingRow(
      ad,
      { tier: baseline, tier_until: null, tier_source: null },
      { tag: "lvp" },
    );
    expect(back, `${TAG} the ad back at ${baseline}`).not.toBeNull();
    await openAdSheet(page, ad);
    await expect(sheet.getByTestId(`promote-choose-${level}`)).toBeVisible({ timeout: 15000 });
    const raised = await updateListingRow(
      ad,
      { tier: higher, tier_until: at(5 * DAY), tier_source: "staff" },
      { tag: "lvp" },
    );
    expect(raised, `${TAG} the ad moved to ${higher}`).not.toBeNull();
    const lowerBefore = await trace(ad);
    await sheet.getByTestId(`promote-choose-${level}`).click();
    await expect(sheet.getByTestId("promote-problem")).toHaveText(
      en["myListings.promote.error.lowerLevel"],
      { timeout: 15000 },
    );
    expect(await trace(ad), "lowerLevel left a trace").toEqual(lowerBefore);
  });

  // ─────────────── staff: Days and the level line (LVP-3, LVP-4) ───────────────

  async function setTier(
    page: Page,
    secret: string,
    tier: string,
    reason: string,
    days: string | null,
  ) {
    await expect(page.getByTestId("listings-tier-dialog")).toBeVisible({ timeout: 15000 });
    await page.getByTestId(`listings-tier-pick-${tier}`).click();
    await page.getByTestId(`listings-tier-reason-${reason}`).click();
    if (days !== null) {
      await page.getByTestId("listings-tier-days").click();
      await page.keyboard.type(days);
    }
    await page.getByTestId("listings-tier-confirm").click();
    await stepUpIfPrompted(page, secret);
  }

  test("LVP-3 staff Days: seven days on the ad page set source staff and an end; blank on the roster is open-ended; days on the baseline are refused at the field and nothing is sent", async ({
    page,
  }) => {
    const market = await scratchMarket();
    const seller = await scratchSeller();
    const timed = await seed(seller, market);
    const open = await seed(seller, market);
    const { baseline, level } = await levelsAbove();
    const admin = await useJobSuperAdmin(page);

    await gotoReady(page, `/admin/listings/${timed}`);
    await expect(page.getByTestId("listing-set-tier")).toBeVisible({ timeout: 20000 });
    await page.getByTestId("listing-set-tier").click();
    await expect(page.getByTestId("listings-tier-days-field")).toContainText(
      en["admin.listings.level.days"],
    );
    await setTier(page, admin.secret, level, "promotion", "7");
    await expect(page.getByTestId("listing-notice")).toHaveText(
      en["admin.listings.tier.done"].replace("{tier}", tierWord(level)),
      { timeout: 20000 },
    );
    const timedRow = await truth(timed);
    expect(timedRow).toMatchObject({ tier: level, tier_source: "staff" });
    expectAbout(timedRow["tier_until"], Date.now() + 7 * DAY, "seven days");

    // The baseline takes no days: refused at the field, the door never asked.
    const before = await trace(timed);
    await page.getByTestId("listing-set-tier").click();
    await expect(page.getByTestId("listings-tier-dialog")).toBeVisible({ timeout: 15000 });
    await page.getByTestId(`listings-tier-pick-${baseline}`).click();
    await page.getByTestId("listings-tier-reason-promotion_ended").click();
    await page.getByTestId("listings-tier-days").click();
    await page.keyboard.type("3");
    await page.getByTestId("listings-tier-confirm").click();
    await expect(page.getByTestId("listings-tier-problem")).toHaveText(
      en["admin.listings.level.error.baselineDays"],
    );
    await expect(page.getByTestId("listings-tier-days")).toHaveAttribute("aria-invalid", "true");
    expect(await trace(timed), "the refused days left a trace").toEqual(before);
    await page.getByTestId("listings-tier-cancel").click();
    await expect(page.getByTestId("listings-tier-dialog")).toHaveCount(0);

    // The roster's row menu opens the same dialog; blank Days is open-ended.
    await gotoReady(page, "/admin/listings");
    await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
    await page.getByTestId("listings-search").click();
    await page.keyboard.type(open);
    const card = (page.viewportSize()?.width ?? 1280) < 1280;
    await expect(page.getByTestId(`listing-row-${open}${card ? "-card" : ""}`)).toBeVisible({
      timeout: 20000,
    });
    await page
      .getByTestId(card ? `listing-row-${open}-actions` : `listing-row-${open}-actions-cell`)
      .getByTestId(`listing-actions-${open}-more`)
      .click();
    await page.getByTestId(`listing-actions-${open}-more-tier`).click();
    await setTier(page, admin.secret, level, "promotion", null);
    await expect(page.getByTestId("listings-notice")).toHaveText(
      en["admin.listings.tier.done"].replace("{tier}", tierWord(level)),
      { timeout: 20000 },
    );
    const openRow = await truth(open);
    expect(openRow).toMatchObject({ tier: level, tier_source: "staff", tier_until: null });
  });

  test("LVP-4 the staff ad page's level line: the level, its source and its end — staff with an end, staff open-ended, the launch offer, the baseline alone", async ({
    page,
  }) => {
    const market = await scratchMarket();
    const seller = await scratchSeller();
    const ad = await seed(seller, market);
    const { baseline, level } = await levelsAbove();
    await useJobSuperAdmin(page);
    const line = () => page.getByTestId("listing-fact-tier").locator("dd");
    const show = async (expected: string) => {
      await gotoReady(page, `/admin/listings/${ad}`);
      await expect(line()).toHaveText(expected, { timeout: 20000 });
    };

    await show(tierWord(baseline));

    const until = at(9 * DAY);
    expect(
      await updateListingRow(
        ad,
        { tier: level, tier_until: until, tier_source: "staff" },
        { tag: "lvp" },
      ),
    ).not.toBeNull();
    const staffUntil = (await truth(ad))["tier_until"];
    await show(
      [
        tierWord(level),
        en["admin.listings.level.source.staff"],
        en["admin.listings.level.until"].replace("{date}", day(staffUntil)),
      ].join(" · "),
    );

    expect(
      await updateListingRow(ad, { tier_until: null, tier_source: "staff" }, { tag: "lvp" }),
    ).not.toBeNull();
    await show(
      [
        tierWord(level),
        en["admin.listings.level.source.staff"],
        en["admin.listings.level.noEnd"],
      ].join(" · "),
    );

    expect(
      await updateListingRow(ad, { tier_until: until, tier_source: "launch" }, { tag: "lvp" }),
    ).not.toBeNull();
    const launchUntil = (await truth(ad))["tier_until"];
    await show(
      [
        tierWord(level),
        en["admin.listings.level.source.launch"],
        en["admin.listings.level.until"].replace("{date}", day(launchUntil)),
      ].join(" · "),
    );
  });
});
