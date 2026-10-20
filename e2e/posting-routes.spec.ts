import { createClient } from "@supabase/supabase-js";

import { expect, test } from "./fixtures";

import { gotoReady, signInViaSession, useJobSuperAdmin } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import { passwordGrant } from "./helpers/session";
import { inOneWindow, withinPreviewBudget } from "./helpers/rate-window";
import { purgeListingObjects, reasons, uploadPhoto } from "./helpers/photos";
import { destroyLocation, seedScratchChain } from "./helpers/locations";
import {
  leaseSeller,
  activeCityOf,
  anyAttributeId,
  bearerOf,
  completeDraft,
  destroyCategoryBranch,
  destroyListingsOf,
  destroyPostableCategory,
  observedCountryOf,
  confirmHomeCountry,
  postRoute,
  rand,
  reasonsOf,
  seedFinderLeaf,
  seedPostableCategory,
  seedBasisSet,
  destroySpecSet,
  statusOf,
} from "./helpers/posting";

/**
 * U6-A2-C — THE POSTING ROUTES (PR-1..PR-8).
 *
 * The subject is the ROUTE seam, never the door's semantics (those are proved in
 * the migration's own proof block): the bearer is the only authority, the
 * residency fact comes from the EDGE and is written once, a refusal is the door's
 * JSON at status 200, and nothing an owner can call reaches `active`.
 *
 * J-laws: every fixture is a namespaced scratch category or a pool-minted seller,
 * assertions read DB truth through the service client, and cleanup runs in an
 * `afterEach` that survives a timeout (J3).
 */

const DRAFT = "/api/listings/draft";
const PUBLISH = "/api/listings/publish";
const IDENTITY = "/api/listings/identity";
const ASSIST = "/api/listings/assist";
const CATALOG_FIND = "/api/catalog/find";

/** DB truth (J4): the stored DEC-081 flag. */
async function negotiableOf(listingId: string): Promise<boolean | null> {
  const { data, error } = await adminClient()
    .from("listings")
    .select("price_negotiable")
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:pr-11] reading the flag failed: ${error.message}`);
  return data?.price_negotiable ?? null;
}

test.describe("POSTING ROUTES", () => {
  const categories: string[] = [];
  const sellers: string[] = [];
  const specs: string[] = [];
  const places: string[] = [];
  const branches: string[][] = [];

  test.afterEach(async () => {
    // J3 — an afterEach hook survives a body timeout; a `finally` inside the body
    // does not, and that is how markets leaked in INC-218.
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    // Listings first: their place rows point at the scratch chain.
    for (const slug of places.splice(0)) await destroyLocation(slug);
    // Links first: a category cannot be deleted while a definition link points at it.
    await destroySpecSet(specs.splice(0));
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
  });

  async function seller(
    page: import("@playwright/test").Page,
    options: { homeConfirmed?: boolean; named?: boolean; alias?: boolean } = {},
  ) {
    const user = await leaseSeller(options);
    sellers.push(user.id);
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    return { user, token: await bearerOf(page) };
  }

  async function category() {
    const row = await seedPostableCategory();
    categories.push(row.slug);
    return row;
  }

  test("PR-1 the draft route sets the observed residency from the edge exactly once", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const cat = await category();

    const first = await postRoute(
      page,
      DRAFT,
      { step: 1, categoryId: cat.id },
      { token, country: "ET" },
    );
    expect(first.status, JSON.stringify(first.payload)).toBe(200);
    expect(first.payload["ok"], JSON.stringify(first.payload)).toBe(true);
    expect(String(first.payload["listing_id"] ?? "")).not.toBe("");
    // DB truth (J4): the fact the door will read, written by the route.
    expect(await observedCountryOf(user.id)).toBe("ET");

    // DEC-068 — the fact is granted ONCE: a later call from another country
    // cannot move it, and the route never takes the country from a body.
    const second = await postRoute(
      page,
      DRAFT,
      { listingId: first.payload["listing_id"], step: 1, categoryId: cat.id },
      { token, country: "US" },
    );
    expect(second.status).toBe(200);
    expect(await observedCountryOf(user.id)).toBe("ET");
  });

  test("PR-2 an incomplete step is the door's own refusal, at status 200", async ({ page }) => {
    const { token } = await seller(page);
    const cat = await category();

    const answer = await postRoute(
      page,
      DRAFT,
      {
        step: 5,
        categoryId: cat.id,
        title: `e2e posting ${rand()}`,
        description: "e2e posting body",
        attributes: {},
        priceMode: "fixed",
        priceCurrency: "ETB",
        pricePeriod: "once",
      },
      { token, country: "ET" },
    );
    // A refusal is an ANSWER (F4): 200, `ok:false`, the door's own vocabulary.
    expect(answer.status).toBe(200);
    expect(answer.payload["ok"]).toBe(false);
    expect(
      reasonsOf(answer.payload).map((entry) => entry.field),
      JSON.stringify(answer.payload),
    ).toContain("price_amount");
  });

  test("PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079)", async ({
    page,
  }) => {
    const { token } = await seller(page);
    const cat = await category();
    const basis = await seedBasisSet(cat.id);
    specs.push(basis.basisKey, basis.identityKey);

    const ask = async (token_: string, price: Record<string, unknown>) => {
      const answer = await postRoute(
        page,
        DRAFT,
        {
          step: 5,
          categoryId: cat.id,
          title: `e2e posting ${rand()}`,
          description: "e2e posting body",
          attributes: { [basis.identityKey]: basis.identityValue, [basis.basisKey]: token_ },
          ...price,
        },
        { token, country: "ET" },
      );
      expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
      expect(answer.payload["ok"], JSON.stringify(answer.payload)).toBe(false);
      return reasonsOf(answer.payload);
    };

    expect(
      await ask("hourly", {
        priceMode: "fixed",
        priceAmount: 100,
        priceCurrency: "ETB",
        pricePeriod: "once",
      }),
    ).toContainEqual({ field: "price_period", reason: "periodFollowsBasis" });
    expect(
      await ask("quote", { priceMode: "fixed", priceAmount: 100, priceCurrency: "ETB" }),
    ).toContainEqual({ field: "price_mode", reason: "modeFollowsBasis" });
    expect(await ask("hourly", { priceMode: "commission", priceBp: 1000 })).toContainEqual({
      field: "price_mode",
      reason: "commissionNotOffered",
    });
    // 20000 bp (200 %) — the CHECK is the ceiling; INC-301 maps its violation to
    // the seller's own refusal, named (never the raw constraint text).
    const over = await postRoute(
      page,
      DRAFT,
      {
        step: 5,
        categoryId: cat.id,
        title: `e2e posting ${rand()}`,
        description: "e2e posting body",
        attributes: { [basis.identityKey]: basis.identityValue, [basis.basisKey]: "commission" },
        priceMode: "commission",
        priceBp: 20000,
      },
      { token, country: "ET" },
    );
    expect(over.status, JSON.stringify(over.payload)).toBe(200);
    expect(over.payload["ok"], JSON.stringify(over.payload)).toBe(false);
    expect(reasonsOf(over.payload), JSON.stringify(over.payload)).toContainEqual({
      field: "price_bp",
      reason: "commissionRange",
    });
    expect(JSON.stringify(over.payload)).not.toContain("listings_price_bp_check");
  });

  test("PR-11 negotiable is a flag: stored on a price, forced off on contact (DEC-081)", async ({
    page,
  }) => {
    const { token } = await seller(page);
    const cat = await category();
    const base = {
      step: 5,
      categoryId: cat.id,
      title: `e2e posting ${rand()}`,
      description: "e2e posting body",
      attributes: {},
      pricePeriod: "once",
      priceNegotiable: true,
    };

    const fixed = await postRoute(
      page,
      DRAFT,
      { ...base, priceMode: "fixed", priceAmount: 100, priceCurrency: "ETB" },
      { token, country: "ET" },
    );
    expect(fixed.status, JSON.stringify(fixed.payload)).toBe(200);
    expect(fixed.payload["ok"], JSON.stringify(fixed.payload)).toBe(true);
    const listingId = String(fixed.payload["listing_id"] ?? "");
    expect(listingId).not.toBe("");
    expect(await negotiableOf(listingId)).toBe(true);

    const contact = await postRoute(
      page,
      DRAFT,
      { ...base, listingId, priceMode: "contact" },
      { token, country: "ET" },
    );
    expect(contact.payload["ok"], JSON.stringify(contact.payload)).toBe(true);
    expect(await negotiableOf(listingId)).toBe(false);
  });

  test("PR-12 the draft door at step 1 takes 'negotiable' as an alias: fixed + flag (INC-309)", async ({
    page,
  }) => {
    const { token } = await seller(page);
    const cat = await category();
    const draft = await postRoute(
      page,
      DRAFT,
      { step: 1, categoryId: cat.id, priceMode: "negotiable" },
      { token, country: "ET" },
    );
    expect(draft.status, JSON.stringify(draft.payload)).toBe(200);
    expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
    const listingId = String(draft.payload["listing_id"] ?? "");
    expect(listingId).not.toBe("");
    const { data, error } = await adminClient()
      .from("listings")
      .select("price_mode, price_negotiable")
      .eq("id", listingId)
      .maybeSingle();
    if (error) throw new Error(`[e2e:pr-12] reading the draft failed: ${error.message}`);
    expect(data).toEqual({ price_mode: "fixed", price_negotiable: true });
  });

  test("PR-13 a draft may carry a commission before its percentage (INC-312)", async ({ page }) => {
    const { token } = await seller(page);
    const cat = await category();
    const draft = await postRoute(
      page,
      DRAFT,
      { step: 1, categoryId: cat.id, priceMode: "commission" },
      { token, country: "ET" },
    );
    expect(draft.status, JSON.stringify(draft.payload)).toBe(200);
    expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
    const listingId = String(draft.payload["listing_id"] ?? "");
    expect(listingId).not.toBe("");
    const { data, error } = await adminClient()
      .from("listings")
      .select("price_mode, price_bp, price_amount, price_currency")
      .eq("id", listingId)
      .maybeSingle();
    if (error) throw new Error(`[e2e:pr-13] reading the draft failed: ${error.message}`);
    expect(data).toEqual({
      price_mode: "commission",
      price_bp: null,
      price_amount: null,
      price_currency: null,
    });
  });

  test("PR-14 the draft door's answer names the currency it stored (INC-321)", async ({ page }) => {
    const { token } = await seller(page);
    const cat = await category();
    const answer = await postRoute(
      page,
      DRAFT,
      {
        step: 5,
        categoryId: cat.id,
        title: `e2e posting ${rand()}`,
        description: "e2e posting body",
        attributes: {},
        priceMode: "fixed",
        priceAmount: 100,
        pricePeriod: "once",
      },
      { token, country: "ET" },
    );
    console.log(`PR-14 answer: ${JSON.stringify(answer.payload)}`);
    expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
    expect(answer.payload["ok"], JSON.stringify(answer.payload)).toBe(true);
    const code = String(answer.payload["price_currency"] ?? "");
    expect(code).toMatch(/^[A-Z]{3}$/);
    const { data, error } = await adminClient()
      .from("listings")
      .select("price_currency")
      .eq("id", String(answer.payload["listing_id"] ?? ""))
      .maybeSingle();
    if (error) throw new Error(`[e2e:pr-14] reading the draft failed: ${error.message}`);
    expect(data?.price_currency).toBe(code);
  });

  test("PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (INC-324)", async ({
    page,
  }) => {
    const { token } = await seller(page);
    const cat = await category();
    const first = await postRoute(
      page,
      DRAFT,
      { step: 1, categoryId: cat.id },
      { token, country: "ET" },
    );
    expect(first.status, JSON.stringify(first.payload)).toBe(200);
    expect(first.payload["ok"], JSON.stringify(first.payload)).toBe(true);
    const listingId = String(first.payload["listing_id"] ?? "");
    expect(listingId).not.toBe("");

    const admin = adminClient();
    const { error: revError } = await admin
      .from("listing_revisions")
      .delete()
      .eq("listing_id", listingId);
    if (revError) throw new Error(`[e2e:pr-15] clearing revisions failed: ${revError.message}`);
    const { error: delError } = await admin.from("listings").delete().eq("id", listingId);
    if (delError) throw new Error(`[e2e:pr-15] deleting the draft failed: ${delError.message}`);

    const again = await postRoute(
      page,
      DRAFT,
      { listingId, step: 1, categoryId: cat.id },
      { token, country: "ET" },
    );
    expect(again.status, JSON.stringify(again.payload)).toBe(200);
    expect(again.payload["ok"], JSON.stringify(again.payload)).toBe(false);

    const { count, error } = await admin
      .from("listing_revisions")
      .select("id", { count: "exact", head: true })
      .is("listing_id", null);
    if (error) throw new Error(`[e2e:pr-15] reading revisions failed: ${error.message}`);
    expect(count).toBe(0);
  });

  test("PR-3 a complete draft publishes to screening and never to active", async ({ page }) => {
    // Proves the home-country refusal first, so its seller starts unconfirmed;
    // M5 refuses a step-8 save for that seller, so the draft is saved at step 7.
    const { token } = await seller(page, { homeConfirmed: false, alias: true });
    const cat = await category();
    const city = await activeCityOf("ET");

    const draft = await postRoute(
      page,
      DRAFT,
      completeDraft({
        categoryId: cat.id,
        cityId: city.id,
        title: `e2e posting ${rand()}`,
        step: 7,
      }),
      { token, country: "ET" },
    );
    expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
    const listingId = String(draft.payload["listing_id"] ?? "");
    expect(listingId).not.toBe("");

    // Bundle 3 step 12 — refused at home_country_code until the seller confirms
    // it; the positive control is the same publish after confirming.
    const unconfirmed = await postRoute(page, PUBLISH, { listingId }, { token, country: "ET" });
    expect(reasonsOf(unconfirmed.payload), JSON.stringify(unconfirmed.payload)).toContainEqual({
      field: "home_country_code",
      reason: "required",
    });
    expect(await statusOf(listingId)).toBe("draft");
    await confirmHomeCountry(page, token);
    const published = await postRoute(page, PUBLISH, { listingId }, { token, country: "ET" });
    expect(published.status).toBe(200);
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    // DB truth: the moderation gateway (D1) is the ONLY path to `active`.
    expect(await statusOf(listingId)).toBe("screening");
  });

  test("PR-4 identity: the alias is saved, and a second seller cannot take it", async ({
    page,
  }) => {
    const alias = `e2epost${rand()}`;
    const first = await seller(page);
    const saved = await postRoute(
      page,
      IDENTITY,
      { alias, sellerType: "person", contactPref: { messages: true } },
      { token: first.token, country: "ET" },
    );
    expect(saved.status).toBe(200);
    expect(saved.payload["ok"], JSON.stringify(saved.payload)).toBe(true);

    const second = await seller(page);
    const taken = await postRoute(
      page,
      IDENTITY,
      { alias: alias.toUpperCase(), sellerType: "person" },
      { token: second.token, country: "ET" },
    );
    expect(taken.status).toBe(200);
    expect(taken.payload["ok"]).toBe(false);
    // Case-insensitive uniqueness is the door's law (D17); the route only carries it.
    expect(reasonsOf(taken.payload).map((entry) => entry.reason)).toContain("aliasTaken");
  });

  test("PR-5 assist answers from the facts alone, within the field caps", async ({ page }) => {
    const { token } = await seller(page);
    const cat = await category();

    // INC-299 — tries-left comes from the rate-limit answer. A draft gives the
    // assist call a listing, so the per-listing budget is spent and counted.
    const draft = await postRoute(
      page,
      DRAFT,
      { step: 1, categoryId: cat.id },
      { token, country: "ET" },
    );
    const listingId = String(draft.payload["listing_id"] ?? "");
    expect(listingId, "PR-5: the draft door made no listing").not.toBe("");

    const answer = await postRoute(
      page,
      ASSIST,
      {
        categoryId: cat.id,
        locale: "en",
        attrs: { colour: "blue", size: "42" },
        listingId,
      },
      { token, country: "ET" },
    );
    expect(answer.status).toBe(200);
    if (answer.payload["ok"] !== true) {
      // No key and no fake flag in this environment: the route must still refuse
      // by NAME rather than invent copy (F4).
      expect(reasonsOf(answer.payload).map((entry) => entry.reason)).toContain(
        "providerUnavailable",
      );
      return;
    }
    const title = String(answer.payload["title"] ?? "");
    const description = String(answer.payload["description"] ?? "");
    expect(title).toContain(cat.slug);
    expect(title.length).toBeLessThanOrEqual(120);
    expect(description.length).toBeGreaterThan(0);
    expect(description.length).toBeLessThanOrEqual(1200);
    expect(answer.payload["triesLeft"], "PR-5: the first try did not leave four").toBe(4);
  });

  test("PR-6 the options route is ETag'd: a conditional repeat costs a 304", async ({ page }) => {
    const attributeId = await anyAttributeId();
    const path = `/api/attributes/${attributeId}/options`;

    // INC-397 — signed-in callers only; no bearer is a 401.
    const anonymous = await page.request.get(path);
    expect(anonymous.status(), "PR-6: the options route answered without a bearer").toBe(401);
    const { token } = await seller(page);
    const auth = { Authorization: `Bearer ${token}` };

    const first = await page.request.get(path, { headers: auth });
    expect(first.status()).toBe(200);
    const etag = first.headers()["etag"] ?? "";
    expect(etag, "the options route published no ETag").not.toBe("");
    // INC-243 — the list is held for ONE minute, with five of stale-while-revalidate,
    // so a curator's file commit reaches an open form within the minute.
    expect(first.headers()["cache-control"] ?? "").toContain("private");
    expect(first.headers()["cache-control"] ?? "").toContain("max-age=60");
    expect(first.headers()["cache-control"] ?? "").toContain("stale-while-revalidate=300");

    const repeat = await page.request.get(path, { headers: { ...auth, "If-None-Match": etag } });
    expect(repeat.status()).toBe(304);

    // An id no attribute has is a 404, never an empty 200.
    const missing = await page.request.get(
      "/api/attributes/00000000-0000-0000-0000-000000000000/options",
      { headers: auth },
    );
    expect(missing.status()).toBe(404);
  });

  test("PR-7 the draft dial refuses by name once the ceiling is reached", async ({ page }) => {
    test.setTimeout(120_000);
    const { user, token } = await seller(page);
    const cat = await category();
    // INC-396 — the dial lives in `rate_dials` and the door counts for itself.
    // The test lowers it for its OWN scratch user through `rate_overrides`,
    // removed in finally, and walks the ceiling with a BOUND.
    const ceiling = 3;
    const admin = adminClient();
    const lowered = await admin
      .from("rate_overrides")
      .upsert({ user_id: user.id, action: "draft", max_count: ceiling });
    if (lowered.error) throw new Error(`PR-7 override: ${lowered.error.message}`);
    try {
      // INC-617 — the draft dial counts in clock-hour windows.
      await inOneWindow(3600, 30_000, "PR-7");
      let refusal: Record<string, unknown> | null = null;
      for (let attempt = 0; attempt < ceiling + 2; attempt += 1) {
        const answer = await postRoute(
          page,
          DRAFT,
          { step: 1, categoryId: cat.id },
          { token, country: "ET" },
        );
        expect(answer.status).toBe(200);
        const rate = reasonsOf(answer.payload).find((entry) => entry.reason === "rateLimited");
        if (rate) {
          refusal = answer.payload;
          break;
        }
      }
      expect(refusal, `the dial never refused within ${ceiling + 2} calls`).not.toBeNull();
      const entry = (Array.isArray(refusal!["refusals"]) ? refusal!["refusals"][0] : {}) as Record<
        string,
        unknown
      >;
      expect(entry["field"]).toBe("rate");
      // The refusal names WHEN it lifts, so a client can say so (C4/F4).
      expect(String(entry["detail"] ?? ""), JSON.stringify(refusal)).not.toBe("");
    } finally {
      const removed = await admin
        .from("rate_overrides")
        .delete()
        .eq("user_id", user.id)
        .eq("action", "draft");
      // J3 — a failed cleanup is loud, never silent.
      expect(removed.error, "PR-7 override cleanup").toBeNull();
    }
  });

  test("PR-8 no bearer is 401 on every posting route", async ({ page }) => {
    await gotoReady(page, "/");
    for (const path of [DRAFT, PUBLISH, IDENTITY, ASSIST]) {
      const answer = await postRoute(page, path, {}, { token: null });
      expect(answer.status, `${path} answered ${answer.status} without a bearer`).toBe(401);
    }
  });

  test("PR-9 catalog finder is bounded, multilingual and rate-limited", async ({ page }) => {
    const leaf = await seedFinderLeaf();
    categories.push(leaf.slug);
    const key = `e2e-${rand()}`;
    const headers = { "x-e2e-catalog-find-key": key };
    // INC-617 — the finder counts in clock-hour windows: the three counted calls
    // below are made in one window.
    await inOneWindow(3600, 20_000, "PR-9");
    const english = await page.request.get(`${CATALOG_FIND}?q=${leaf.english}&lang=en`, {
      headers,
    });
    expect(english.status()).toBe(200);
    const englishBody = (await english.json()) as { results?: Array<{ slug?: string }> };
    expect(Array.isArray(englishBody.results)).toBe(true);
    expect(englishBody.results?.length ?? 0).toBeLessThanOrEqual(8);
    expect(englishBody.results?.some((row) => row.slug === leaf.slug)).toBe(true);
    expect(Buffer.byteLength(JSON.stringify(englishBody))).toBeLessThanOrEqual(2048);

    const amharic = await page.request.get(
      `${CATALOG_FIND}?q=${encodeURIComponent(leaf.amharic)}&lang=am`,
      { headers },
    );
    expect(amharic.status()).toBe(200);
    const amharicBody = (await amharic.json()) as {
      results?: Array<{ slug?: string; path?: string[] }>;
    };
    expect(amharicBody.results?.length ?? 0).toBeGreaterThan(0);
    expect(
      amharicBody.results?.some(
        (row) => row.slug === leaf.slug && (row.path ?? []).some((p) => /[\u1200-\u137f]/.test(p)),
      ),
    ).toBe(true);

    const limited = await page.request.get(`${CATALOG_FIND}?q=${leaf.english}&lang=en`, {
      headers,
    });
    expect(limited.status()).toBe(429);

    const short = await page.request.get(`${CATALOG_FIND}?q=a&lang=en`, {
      headers: { "x-e2e-catalog-find-key": `${key}-short` },
    });
    expect(short.status()).toBe(400);
  });
  /**
   * PR-19 — S2. A catalogue change committed through a server path (the category
   * import route) refreshes the finder index after its commit returns: DB truth,
   * before any search is made, the index already holds the scratch leaf.
   */
  test("PR-19 a category import commit refreshes the finder index before any search", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/categories");
    const token = await bearerOf(page);
    const headers = { Authorization: `Bearer ${token}` };
    const exported = await page.request.get("/api/admin/categories/export", { headers });
    expect(exported.status()).toBe(200);
    const header = ((await exported.text()).replace(/^\uFEFF/, "").split(/\r?\n/)[0] ?? "").split(
      ",",
    );
    // A new leaf under a scratch parent (an import never creates a root, CT-19).
    const parentSlug = `e2e-pr19-${rand()}`;
    const slug = `e2e-pr19-${rand()}`;
    // INC-383 — reaped as one branch (pointers first, then rows) in afterEach.
    branches.push([slug, parentSlug]);
    const { data: parent, error: parentError } = await adminClient()
      .from("categories")
      .insert({ slug: parentSlug, name_en: parentSlug })
      .select("id")
      .single();
    if (parentError || !parent) throw new Error(`[e2e:pr-19] parent: ${parentError?.message}`);
    // INC-383 — a scratch root sorts after every real root (≥ 2,000,000).
    const { error: pointerError } = await adminClient()
      .from("category_tree_pointers")
      .insert({ parent_id: null, child_id: parent.id, display_order: 2_000_000 });
    if (pointerError) throw new Error(`[e2e:pr-19] parent pointer: ${pointerError.message}`);
    const values: Record<string, string> = {
      parent_slug: parentSlug,
      category_slug: slug,
      name_en: slug,
      display_order: "0",
      is_active: "true",
      allow_listings: "true",
    };
    const file = `\uFEFF${header.join(",")}\r\n${header.map((c) => values[c] ?? "").join(",")}\r\n`;
    const post = (body: Record<string, unknown>) =>
      withinPreviewBudget(async () => {
        const response = await page.request.post("/api/admin/categories/import", {
          headers,
          data: body,
        });
        return {
          status: response.status(),
          payload: (await response.json()) as Record<string, unknown>,
        };
      }, "PR categories import");
    const preview = await post({ mode: "preview", categories: file });
    expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
    const commit = await post({
      mode: "commit",
      categories: file,
      digest: preview.payload["digest"],
    });
    expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
    expect(
      (commit.payload["counts"] as Record<string, number>).adds,
      JSON.stringify(commit.payload),
    ).toBe(1);

    const supabase = adminClient();
    const { data: row, error } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (error || !row)
      throw new Error(`[e2e:pr-19] the committed leaf is missing: ${error?.message}`);
    // No search has been made: only the post-commit refresh can have indexed it.
    const { data: indexed, error: indexError } = await supabase
      .from("catalog_find_index")
      .select("catalog_version")
      .eq("category_id", row.id)
      .limit(1);
    if (indexError) throw new Error(`[e2e:pr-19] reading the index failed: ${indexError.message}`);
    expect(indexed ?? [], "PR-19: the commit did not refresh the finder index").toHaveLength(1);
  });

  /**
   * PR-17 — W6 INC-337 AT THE ROUTE. The draft door refuses region-only coverage
   * with `cityRequired` (even below step 6 — ruling 2026-09-29) and accepts a city
   * and a sub-city. INC-340 / G27: the places are a SCRATCH chain under the ET
   * anchor (staging carries no sub-city), reaped by the afterEach (J3).
   */
  test("PR-17 the draft route refuses a region-only place and accepts a city and a sub-city", async ({
    page,
  }) => {
    const { token } = await seller(page);
    const cat = await category();
    const chain = await seedScratchChain("ET");
    places.push(chain.region.slug);
    const [region, city, subCity] = [chain.region.id, chain.city.id, chain.subCity.id];
    const save = (coverage: string[], step: number) =>
      postRoute(
        page,
        DRAFT,
        { step, categoryId: cat.id, title: "e2e pr17", priceMode: "free", coverage },
        { token, country: "ET" },
      );
    for (const step of [3, 6]) {
      const refused = await save([region], step);
      expect(refused.status, JSON.stringify(refused.payload)).toBe(200);
      expect(refused.payload["ok"], JSON.stringify(refused.payload)).toBe(false);
      expect(reasonsOf(refused.payload), `step ${step}`).toContainEqual({
        field: "coverage",
        reason: "cityRequired",
      });
    }
    for (const place of [city, subCity]) {
      const accepted = await save([place], 6);
      expect(
        reasonsOf(accepted.payload).filter((row) => row.field === "coverage"),
        JSON.stringify(accepted.payload),
      ).toEqual([]);
    }
  });

  /**
   * PR-18 — INC-342 THE DESCRIPTION LIMIT IS THE DOOR'S. 5000 characters are
   * accepted at step 4; 5001 are refused `tooLong`. The form's cap follows it.
   */
  test("PR-18 the draft route accepts a 5000-character description and refuses 5001", async ({
    page,
  }) => {
    const { token } = await seller(page);
    const cat = await category();
    const save = (description: string) =>
      postRoute(
        page,
        DRAFT,
        // DEC-109 — the description is judged at step 5, after the price page (4),
        // so the body carries a price the door accepts (free).
        {
          step: 5,
          categoryId: cat.id,
          title: "e2e pr18",
          description,
          attributes: {},
          priceMode: "free",
        },
        { token, country: "ET" },
      );
    const accepted = await save("a".repeat(5000));
    expect(accepted.status, JSON.stringify(accepted.payload)).toBe(200);
    expect(
      reasonsOf(accepted.payload).filter((row) => row.field === "description"),
      JSON.stringify(accepted.payload),
    ).toEqual([]);
    const refused = await save("a".repeat(5001));
    expect(refused.status).toBe(200);
    expect(refused.payload["ok"], JSON.stringify(refused.payload)).toBe(false);
    expect(reasonsOf(refused.payload)).toContainEqual({
      field: "description",
      reason: "tooLong",
    });
  });

  /**
   * DEC-086 — THE MODEL QUESTION IS REQUIRED WHEN IT MATTERS, AT THE ROUTE. A
   * dependent pick-list whose options carry facts: missing under an answered
   * parent with two children → refused `{attr_key, required}`; answered (or
   * 'other') → accepted. Scratch definitions only, reaped by the afterEach (J3).
   */
  test("PR-16 a model question that matters is required by the draft route (DEC-086)", async ({
    page,
  }) => {
    const { token } = await seller(page);
    const cat = await category();
    const stem = `e2e_pr16_${test.info().workerIndex}_${rand()}`;
    const option = (value: string, extra: Record<string, unknown> = {}) => ({
      value,
      label_en: `${value} label`,
      label_am: `${value} ምልክት`,
      active: true,
      ...extra,
    });
    const admin = adminClient();
    const brandKey = `${stem}_brand`;
    const modelKey = `${stem}_model`;
    const { data: brand, error: brandError } = await admin
      .from("attributes")
      .insert({
        attr_key: brandKey,
        name_en: `${stem} brand`,
        attr_type: "single_select",
        options: [option(`${stem}_b1`), option(`${stem}_b2`)],
      })
      .select("id")
      .single();
    if (brandError) throw new Error(`[e2e:pr-16] seeding the brand failed: ${brandError.message}`);
    specs.push(brandKey);
    const { data: model, error: modelError } = await admin
      .from("attributes")
      .insert({
        attr_key: modelKey,
        name_en: `${stem} model`,
        attr_type: "single_select",
        depends_on: brand.id,
        options: [
          option(`${stem}_m1`, { parent: `${stem}_b1`, facts: { [brandKey]: `${stem}_b1` } }),
          option(`${stem}_m2`, { parent: `${stem}_b1` }),
          option(`${stem}_m3`, { parent: `${stem}_b2` }),
        ],
      })
      .select("id")
      .single();
    if (modelError) throw new Error(`[e2e:pr-16] seeding the model failed: ${modelError.message}`);
    specs.push(modelKey);
    const { error: linkError } = await admin.from("category_attribute_links").insert([
      { category_id: cat.id, attribute_id: brand.id, is_required: false, display_order: 1 },
      { category_id: cat.id, attribute_id: model.id, is_required: false, display_order: 2 },
    ]);
    if (linkError) throw new Error(`[e2e:pr-16] linking failed: ${linkError.message}`);

    const save = (attributes: Record<string, unknown>) =>
      postRoute(page, DRAFT, { step: 3, categoryId: cat.id, attributes }, { token, country: "ET" });
    const refusalsOf = (payload: Record<string, unknown>) =>
      ((payload["refusals"] ?? []) as Array<Record<string, unknown>>).map((row) => ({
        attr_key: row["attr_key"],
        reason: row["reason"],
      }));

    const missing = await save({ [brandKey]: `${stem}_b1` });
    expect(missing.status, JSON.stringify(missing.payload)).toBe(200);
    expect(missing.payload["ok"], JSON.stringify(missing.payload)).toBe(false);
    expect(refusalsOf(missing.payload), JSON.stringify(missing.payload)).toContainEqual({
      attr_key: modelKey,
      reason: "required",
    });

    // One child under the parent: the rule does not apply.
    const single = await save({ [brandKey]: `${stem}_b2` });
    expect(single.payload["ok"], JSON.stringify(single.payload)).toBe(true);

    const answered = await save({ [brandKey]: `${stem}_b1`, [modelKey]: `${stem}_m1` });
    expect(answered.status, JSON.stringify(answered.payload)).toBe(200);
    expect(answered.payload["ok"], JSON.stringify(answered.payload)).toBe(true);
  });

  /** A PostgREST call as the browser would make it (publishable key, optional bearer). */
  async function rest(
    page: import("@playwright/test").Page,
    path: string,
    options: { token?: string; body?: Record<string, unknown> } = {},
  ): Promise<{ status: number; code: string; body: unknown }> {
    const url = process.env["E2E_SUPABASE_URL"] ?? "";
    const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"] ?? "";
    const headers: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
    if (options.token) headers["Authorization"] = `Bearer ${options.token}`;
    const response =
      options.body === undefined
        ? await page.request.get(`${url}/rest/v1/${path}`, { headers })
        : await page.request.post(`${url}/rest/v1/${path}`, { headers, data: options.body });
    const body: unknown = await response.json().catch(() => null);
    const code =
      body !== null && typeof body === "object" && "code" in body ? String(body.code) : "";
    return { status: response.status(), code, body };
  }

  test("PR-20 step 5: the counters are server-only; the server path still counts", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const denied = [
      ["consume_rate_limit", { p_action: "draft", p_key: user.id, p_limit: 1, p_window: "1 hour" }],
      ["rate_gate", { p_action: "draft" }],
      ["residency_country_for", { p_user_id: user.id, p_request_country: "ET" }],
    ] as const;
    for (const [fn, body] of denied) {
      const answer = await rest(page, `rpc/${fn}`, { token, body: { ...body } });
      expect(answer.code, `PR-20: a seller called ${fn}: ${JSON.stringify(answer.body)}`).toBe(
        "42501",
      );
    }
    // Positive control: the server-only client reaches the same counter.
    const admin = adminClient();
    const key = `e2e-pr20-${rand()}`;
    try {
      const counted = await admin.rpc("consume_rate_limit", {
        p_action: "e2e-pr20",
        p_key: key,
        p_limit: 1,
        p_window: "1 hour",
      });
      expect(counted.error, "PR-20: the server could not count").toBeNull();
    } finally {
      const removed = await admin.from("rate_limits").delete().eq("key", key);
      expect(removed.error, "PR-20 cleanup").toBeNull();
    }
  });

  test("PR-21 step 7: private columns are owner-only, through my_listing_private", async ({
    page,
  }) => {
    const { token } = await seller(page);
    const cat = await category();
    const draft = await postRoute(
      page,
      DRAFT,
      { step: 1, categoryId: cat.id },
      { token, country: "ET" },
    );
    expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
    const listingId = String(draft.payload["listing_id"] ?? "");

    for (const column of ["contact_pref", "pin_lat", "pin_lng", "home_country_code"]) {
      const asOwner = await rest(page, `listings?select=${column}&id=eq.${listingId}`, { token });
      expect(asOwner.code, `PR-21: the owner read ${column} from the table`).toBe("42501");
      const asAnon = await rest(page, `listings?select=${column}&limit=1`);
      expect(asAnon.code, `PR-21: anon read ${column}`).toBe("42501");
    }
    // Positive controls: public columns still read; the owner RPC answers.
    const open = await rest(page, `listings?select=id,status&id=eq.${listingId}`, { token });
    expect(open.status, JSON.stringify(open.body)).toBe(200);
    const own = await rest(page, "rpc/my_listing_private", {
      token,
      body: { p_listing_id: listingId },
    });
    expect(own.status, JSON.stringify(own.body)).toBe(200);
    expect(own.body as Record<string, unknown>).toHaveProperty("contact_pref");
    expect(own.body as Record<string, unknown>).not.toHaveProperty("home_country_code");

    // Another seller is refused by the same RPC.
    const other = await page.context().browser()!.newPage();
    try {
      const second = await seller(other);
      const foreign = await rest(other, "rpc/my_listing_private", {
        token: second.token,
        body: { p_listing_id: listingId },
      });
      expect(JSON.stringify(foreign.body)).toContain("not your listing");
    } finally {
      await other.close();
    }
  });

  test("PR-22 step 8: attribute tables leave the browser; categories still read", async ({
    page,
  }) => {
    const { token } = await seller(page);
    for (const table of ["attributes", "category_attribute_links"]) {
      const anon = await rest(page, `${table}?select=id&limit=1`);
      expect(anon.code, `PR-22: anon read ${table}`).toBe("42501");
      const signed = await rest(page, `${table}?select=id&limit=1`, { token });
      expect(signed.code, `PR-22: a seller read ${table}`).toBe("42501");
    }
    const categoriesRead = await rest(page, "categories?select=id,slug,is_active&limit=1");
    expect(categoriesRead.status, JSON.stringify(categoriesRead.body)).toBe(200);
  });

  /** Bundle 4 step 22 — names a seller as the contact step does, through the identity route. */
  async function nameSeller(
    page: import("@playwright/test").Page,
    token: string,
    names: {
      alias?: string;
      sellerType?: string;
      firstName?: string;
      businessName?: string;
      lastName?: string;
    },
  ) {
    const answer = await postRoute(page, IDENTITY, names, { token, country: "ET" });
    expect(answer.payload["ok"], `naming refused: ${JSON.stringify(answer.payload)}`).toBe(true);
  }

  /** A letters-only free public name (the alias shape refuses long digit runs). */
  function freeAlias(): string {
    return `eseller_${rand().replace(/[0-9]/g, "q")}`;
  }

  async function listingTimes(listingId: string) {
    const { data, error } = await adminClient()
      .from("listings")
      .select("expires_at,poster_expires_at,status")
      .eq("id", listingId)
      .maybeSingle();
    if (error) throw new Error(`[e2e:pr-23] reading the listing failed: ${error.message}`);
    return data;
  }

  async function publishedDraft(
    page: import("@playwright/test").Page,
    token: string,
    categoryId: string,
    cityId: string,
    extra: Record<string, unknown> = {},
  ) {
    const draft = await postRoute(
      page,
      DRAFT,
      { ...completeDraft({ categoryId, cityId, title: `e2e posting ${rand()}` }), ...extra },
      { token, country: "ET" },
    );
    expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
    const listingId = String(draft.payload["listing_id"] ?? "");
    const published = await postRoute(page, PUBLISH, { listingId }, { token, country: "ET" });
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    return listingId;
  }

  test("PR-23 an ad has no end unless the seller sets a date or the category holds a limit (DEC-117)", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    await nameSeller(page, token, {
      alias: freeAlias(),
      sellerType: "person",
      firstName: "Abebe",
      lastName: "Kebede",
    });
    const cat = await category();
    const city = await activeCityOf("ET");

    // (a) no limit, no date → activated with no end.
    const open = await publishedDraft(page, token, cat.id, city.id);
    const opened = await adminClient().rpc("transition_listing", {
      p_listing_id: open,
      p_new_status: "active",
    });
    expect(opened.error, JSON.stringify(opened.error)).toBeNull();
    expect(
      (await listingTimes(open))?.expires_at,
      "PR-23: an ad with no limit got an end",
    ).toBeNull();

    // (b) the seller's own date is the end; (c) 90 days ahead is accepted.
    const date = new Date(Date.now() + 90 * 86_400_000).toISOString();
    const dated = await publishedDraft(page, token, cat.id, city.id, { posterExpiresAt: date });
    const activated = await adminClient().rpc("transition_listing", {
      p_listing_id: dated,
      p_new_status: "active",
    });
    expect(activated.error, JSON.stringify(activated.error)).toBeNull();
    const times = await listingTimes(dated);
    expect(
      new Date(String(times?.expires_at)).getTime(),
      "PR-23: the seller's date did not decide the end",
    ).toBe(new Date(date).getTime());

    // (d) one sweep run writes its row and expires an ad whose date has passed.
    const passed = await adminClient()
      .from("listings")
      .update({ expires_at: new Date(Date.now() - 60_000).toISOString() })
      .eq("id", dated)
      .eq("seller_id", user.id);
    expect(passed.error).toBeNull();
    const before = await adminClient()
      .from("listing_expiry_sweep_runs")
      .select("id")
      .order("id", { ascending: false })
      .limit(1);
    expect(before.error, `PR-23: no sweep ledger: ${before.error?.message}`).toBeNull();
    const swept = await adminClient().rpc("expire_stale_listings");
    expect(swept.error, JSON.stringify(swept.error)).toBeNull();
    const after = await adminClient()
      .from("listing_expiry_sweep_runs")
      .select("id")
      .gt("id", before.data?.[0]?.id ?? 0)
      .limit(1);
    expect(after.error, `PR-23: no sweep ledger: ${after.error?.message}`).toBeNull();
    expect((after.data ?? []).length, "PR-23: the sweep wrote no run row").toBe(1);
    expect(await statusOf(dated)).toBe("expired");
  });

  test("PR-24 a seller without a public name, or a person without a first name, is refused at publish (INC-423)", async ({
    page,
  }) => {
    const cat = await category();
    const city = await activeCityOf("ET");

    // No public name → refused at alias.
    const unnamed = await seller(page);
    await nameSeller(page, unnamed.token, {
      sellerType: "person",
      firstName: "Abebe",
      lastName: "Kebede",
    });
    const draftA = await postRoute(
      page,
      DRAFT,
      completeDraft({
        categoryId: cat.id,
        cityId: city.id,
        title: `e2e posting ${rand()}`,
        step: 7,
      }),
      { token: unnamed.token, country: "ET" },
    );
    const listingA = String(draftA.payload["listing_id"] ?? "");
    const refusedA = await postRoute(
      page,
      PUBLISH,
      { listingId: listingA },
      { token: unnamed.token, country: "ET" },
    );
    expect(reasonsOf(refusedA.payload), JSON.stringify(refusedA.payload)).toContainEqual({
      field: "alias",
      reason: "required",
    });
    expect(await statusOf(listingA)).toBe("draft");

    // A person with no first name → refused at first_name.
    const person = await seller(page);
    await nameSeller(page, person.token, {
      alias: freeAlias(),
      sellerType: "person",
      lastName: "Kebede",
    });
    const draftB = await postRoute(
      page,
      DRAFT,
      completeDraft({
        categoryId: cat.id,
        cityId: city.id,
        title: `e2e posting ${rand()}`,
        step: 7,
      }),
      { token: person.token, country: "ET" },
    );
    const listingB = String(draftB.payload["listing_id"] ?? "");
    const refusedB = await postRoute(
      page,
      PUBLISH,
      { listingId: listingB },
      { token: person.token, country: "ET" },
    );
    expect(reasonsOf(refusedB.payload), JSON.stringify(refusedB.payload)).toContainEqual({
      field: "first_name",
      reason: "required",
    });
    expect(await statusOf(listingB)).toBe("draft");
  });

  /**
   * Turn C5 (INC-555, DEC-174) — PR-24 leased three sellers; the business that
   * publishes is its own test now, so each leases at most two.
   */
  test("PR-44 a business with its name and no first or last name publishes (INC-423)", async ({
    page,
  }) => {
    const cat = await category();
    const city = await activeCityOf("ET");
    const business = await seller(page);
    await nameSeller(page, business.token, {
      alias: freeAlias(),
      sellerType: "business",
      businessName: `Selam Coffee ${rand().replace(/[0-9]/g, "q")}`,
    });
    await publishedDraft(page, business.token, cat.id, city.id);
  });

  test("PR-25 a successful publish stamps the seller's statement (bundle 4 step 19)", async ({
    page,
  }) => {
    const cat = await category();
    const city = await activeCityOf("ET");
    const named = await seller(page, { named: true, alias: true });
    const draft = await postRoute(
      page,
      DRAFT,
      completeDraft({ categoryId: cat.id, cityId: city.id, title: `e2e posting ${rand()}` }),
      { token: named.token, country: "ET" },
    );
    const listingId = String(draft.payload["listing_id"] ?? "");
    const stamp = async () => {
      const { data, error } = await adminClient()
        .from("listings")
        .select("attested_at")
        .eq("id", listingId)
        .maybeSingle();
      if (error) throw new Error(`[e2e:pr25] reading attested_at failed: ${error.message}`);
      return data?.attested_at ?? null;
    };
    expect(await stamp(), "PR-25: a draft already carried the stamp").toBeNull();
    const published = await postRoute(
      page,
      PUBLISH,
      { listingId },
      { token: named.token, country: "ET" },
    );
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    expect(await stamp(), "PR-25: publish left no stamp").not.toBeNull();
  });

  test("PR-47 the photo storage takes nothing from a seller's own client; only the server stores photos", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const url = process.env["E2E_SUPABASE_URL"] ?? "";
    const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"] ?? "";
    const asSeller = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const name = `pr47-${rand()}.webp`;
    const folder = `e2e/${user.id}`;
    const admin = adminClient();
    try {
      const uploaded = await asSeller.storage
        .from("listing-photos")
        .upload(`${folder}/${name}`, new Uint8Array([82, 73, 70, 70, 0, 0, 0, 0]), {
          contentType: "image/webp",
        });
      expect(uploaded.error, "PR-47: a seller's own client stored a photo").not.toBeNull();
      const listed = await admin.storage.from("listing-photos").list(folder);
      expect(listed.error, "PR-47: listing the folder failed").toBeNull();
      expect((listed.data ?? []).map((entry) => entry.name)).not.toContain(name);
    } finally {
      const listed = await admin.storage.from("listing-photos").list(folder);
      if ((listed.data ?? []).some((entry) => entry.name === name)) {
        await admin.storage.from("listing-photos").remove([`${folder}/${name}`]);
      }
    }
  });

  test("PR-48 the writing helper spends only its caller's own listing's tries", async ({
    page,
  }) => {
    const cat = await category();
    const owner = await seller(page);
    const draft = await postRoute(
      page,
      DRAFT,
      { step: 1, categoryId: cat.id },
      { token: owner.token, country: "ET" },
    );
    const listingId = String(draft.payload["listing_id"] ?? "");
    expect(listingId, "PR-48: the draft door made no listing").not.toBe("");
    const other = await seller(page);
    const body = { categoryId: cat.id, locale: "en", attrs: {}, listingId };

    const foreign = await postRoute(page, ASSIST, body, { token: other.token, country: "ET" });
    expect(reasonsOf(foreign.payload), JSON.stringify(foreign.payload)).toContainEqual({
      field: "listingId",
      reason: "notYourListing",
    });

    const own = await postRoute(page, ASSIST, body, { token: owner.token, country: "ET" });
    expect(
      reasonsOf(own.payload).map((entry) => entry.reason),
      JSON.stringify(own.payload),
    ).not.toContain("notYourListing");
  });

  test("PR-49 photo removals have their own limit per seller, before anything else is read", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const admin = adminClient();
    const target = `/api/listings/photos/${crypto.randomUUID()}`;
    const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
    await inOneWindow(3600, 30_000, "PR-49");
    try {
      const first = await page.request.delete(target, { headers });
      const firstBody = (await first.json().catch(() => ({}))) as Record<string, unknown>;
      expect(first.status(), JSON.stringify(firstBody)).toBe(403);
      expect(reasonsOf(firstBody).map((entry) => entry.reason)).toContain("notYourListing");

      let remaining = -1;
      for (let call = 0; call < 30 && remaining !== 0; call += 1) {
        const counted = await admin.rpc("consume_rate_limit", {
          p_action: "photo-remove",
          p_key: user.id,
          p_limit: 30,
          p_window: "1 hour",
        });
        expect(counted.error, "PR-49: the server could not count").toBeNull();
        remaining = Number((counted.data as Record<string, unknown> | null)?.["remaining"] ?? -1);
      }
      expect(remaining, "PR-49: the hour's removals were not spent").toBe(0);

      const limited = await page.request.delete(target, { headers });
      const limitedBody = (await limited.json().catch(() => ({}))) as Record<string, unknown>;
      const refusals = (
        Array.isArray(limitedBody["refusals"]) ? limitedBody["refusals"] : []
      ) as Record<string, unknown>[];
      const refusal = refusals.find((entry) => entry["reason"] === "rateLimited");
      expect(refusal, JSON.stringify(limitedBody)).toBeDefined();
      expect(refusal?.["field"]).toBe("photos");
      expect(String(refusal?.["detail"] ?? ""), "PR-49: no reset time").not.toBe("");
    } finally {
      const removed = await admin
        .from("rate_limits")
        .delete()
        .eq("key", user.id)
        .in("action", ["photo-remove", "photo-remove:day"]);
      expect(removed.error, "PR-49 cleanup").toBeNull();
    }
  });

  test("PR-50 photos on drafts stop past 50 in 7 days with no ad submitted, and come back once one is (D185)", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const admin = adminClient();
    await destroyListingsOf(user.id);
    const cat = await category();
    const draft = await postRoute(
      page,
      DRAFT,
      { step: 1, categoryId: cat.id },
      { token, country: "ET" },
    );
    const listingId = String(draft.payload["listing_id"] ?? "");
    expect(listingId, "PR-50: the draft door made no listing").not.toBe("");
    await inOneWindow(604800, 20_000, "PR-50");
    try {
      const windowStart = new Date(
        Math.floor(Date.now() / 604_800_000) * 604_800_000,
      ).toISOString();
      const filled = await admin
        .from("rate_limits")
        .upsert(
          { key: user.id, action: "upload:draft-week", window_start: windowStart, count: 50 },
          { onConflict: "key,action,window_start" },
        );
      expect(filled.error, "PR-50: the week's counter could not be set").toBeNull();

      const stopped = await uploadPhoto(page, { listingId, token, cover: { name: "gps.jpg" } });
      expect(reasons(stopped.payload), JSON.stringify(stopped.payload)).toContainEqual({
        field: "photos",
        reason: "publishFirst",
      });

      const chain = await seedScratchChain("ET");
      places.push(chain.region.slug);
      const submitted = await admin.from("listings").insert({
        seller_id: user.id,
        category_id: cat.id,
        location_id: chain.city.id,
        title: `e2e pr50 ${rand()}`,
        description: "e2e pr50 submitted ad",
        home_country_code: "ET",
        status: "screening",
        published_first_at: new Date().toISOString(),
      });
      expect(submitted.error, "PR-50: the submitted ad could not be seeded").toBeNull();

      const stored = await uploadPhoto(page, { listingId, token, cover: { name: "gps.jpg" } });
      expect(
        reasons(stored.payload).map((entry) => entry.reason),
        JSON.stringify(stored.payload),
      ).not.toContain("publishFirst");
    } finally {
      const cleared = await admin
        .from("rate_limits")
        .delete()
        .eq("key", user.id)
        .eq("action", "upload:draft-week");
      expect(cleared.error, "PR-50 counter cleanup").toBeNull();
      await purgeListingObjects(user.id, listingId);
      await destroyListingsOf(user.id);
    }
  });
  test.describe("D189 deactivated seller", () => {
    const sellers: string[] = [];

    test.afterEach(async () => {
      for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    });

    test("PR-51 a deactivated account is refused at every route: 403 before any route work (D189)", async ({
      page,
    }) => {
      const user = await leaseSeller();
      sellers.push(user.id);
      const session = await passwordGrant(user.email, user.password);
      const headers = { Authorization: `Bearer ${session.access_token}` };
      const admin = adminClient();
      try {
        const active = await page.request.post("/api/listings/draft", {
          headers,
          data: { listingId: null, step: 1 },
        });
        expect(active.status(), "PR-51: the active seller's draft call").toBe(200);

        const closed = await admin
          .from("profiles")
          .update({ account_status: "deactivated" })
          .eq("user_id", user.id);
        expect(closed.error, "PR-51: the account could not be deactivated").toBeNull();

        const draft = await page.request.post("/api/listings/draft", {
          headers,
          data: { listingId: null, step: 1 },
        });
        expect(draft.status(), "PR-51: the draft route").toBe(403);
        expect(await draft.json()).toEqual({ error: "account is deactivated" });

        const identity = await page.request.post("/api/listings/identity", { headers, data: {} });
        expect(identity.status(), "PR-51: the identity route").toBe(403);
        expect(await identity.json()).toEqual({ error: "account is deactivated" });

        const attributeId = await anyAttributeId();
        const options = await page.request.get(`/api/attributes/${attributeId}/options`, {
          headers,
        });
        expect(options.status(), "PR-51: the options route").toBe(401);
      } finally {
        const reopened = await admin
          .from("profiles")
          .update({ account_status: "active" })
          .eq("user_id", user.id);
        expect(reopened.error, "PR-51: the account could not be reactivated").toBeNull();
      }
    });

    test("PR-52 the assist peek answers the budget without spending, and refuses what is not the caller's (INC-669)", async ({
      page,
    }) => {
      const { token } = await seller(page);
      const cat = await category();
      const draft = await postRoute(
        page,
        DRAFT,
        { step: 1, categoryId: cat.id },
        { token, country: "ET" },
      );
      expect(draft.status, JSON.stringify(draft.payload)).toBe(200);
      expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
      const listingId = String(draft.payload["listing_id"] ?? "");
      expect(listingId, "PR-52: the draft door made no listing").not.toBe("");
      const headers = { Authorization: `Bearer ${token}` };
      const path = `${ASSIST}?listingId=${listingId}`;

      const fresh = await page.request.get(path, { headers });
      expect(fresh.status()).toBe(200);
      const freshPayload = await fresh.json();
      expect(freshPayload["ok"], JSON.stringify(freshPayload)).toBe(true);
      expect(freshPayload["triesLeft"], JSON.stringify(freshPayload)).toBe(5);

      const spent = await postRoute(
        page,
        ASSIST,
        { categoryId: cat.id, locale: "en", attrs: { colour: "blue", size: "42" }, listingId },
        { token, country: "ET" },
      );
      expect(spent.status, JSON.stringify(spent.payload)).toBe(200);
      expect(spent.payload["ok"], JSON.stringify(spent.payload)).toBe(true);
      expect(spent.payload["triesLeft"], JSON.stringify(spent.payload)).toBe(4);

      for (let read = 0; read < 2; read += 1) {
        const peek = await page.request.get(path, { headers });
        expect(peek.status()).toBe(200);
        const payload = await peek.json();
        expect(payload["ok"], JSON.stringify(payload)).toBe(true);
        expect(payload["triesLeft"], JSON.stringify(payload)).toBe(4);
      }

      const user = await leaseSeller();
      sellers.push(user.id);
      const session = await passwordGrant(user.email, user.password);
      const other = await page.request.get(path, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      expect(other.status()).toBe(200);
      const otherPayload = await other.json();
      expect(otherPayload["ok"], JSON.stringify(otherPayload)).toBe(false);
      expect(reasonsOf(otherPayload), JSON.stringify(otherPayload)).toContainEqual({
        field: "listingId",
        reason: "notYourListing",
      });

      const missing = await page.request.get(ASSIST, { headers });
      expect(missing.status()).toBe(200);
      const missingPayload = await missing.json();
      expect(missingPayload["ok"], JSON.stringify(missingPayload)).toBe(false);
      expect(reasonsOf(missingPayload), JSON.stringify(missingPayload)).toContainEqual({
        field: "listingId",
        reason: "required",
      });

      const anonymous = await page.request.get(path);
      expect(anonymous.status()).toBe(401);
    });
  });

  test("PR-53 a seller or business name one letter off a protected organisation's name is refused as reserved; a short or exact-only handle is not widened; an ordinary name passes (DEC-191)", async ({
    page,
  }) => {
    const { token } = await seller(page);
    for (const alias of ["telebiirr", "telebxrr", "dashem_bank", "safarikom", "telebirr"]) {
      const answer = await postRoute(
        page,
        "/api/listings/alias",
        { alias },
        { token, country: "ET" },
      );
      expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
      expect(answer.payload["ok"], JSON.stringify(answer.payload)).toBe(false);
      expect(reasonsOf(answer.payload).map((refusal) => refusal.reason)).toContain("aliasReserved");
    }
    const short = await postRoute(
      page,
      "/api/listings/alias",
      { alias: "awashh" },
      { token, country: "ET" },
    );
    expect(short.status).toBe(200);
    expect(short.payload["ok"], JSON.stringify(short.payload)).toBe(true);
    expect(reasonsOf(short.payload).map((refusal) => refusal.reason)).not.toContain(
      "aliasReserved",
    );
    const ordinary = await postRoute(
      page,
      "/api/listings/alias",
      { alias: `e2epost${rand()}` },
      { token, country: "ET" },
    );
    expect(ordinary.payload["ok"], JSON.stringify(ordinary.payload)).toBe(true);
    const reserved = await postRoute(
      page,
      IDENTITY,
      { sellerType: "business", businessName: "Dashem Bank" },
      { token, country: "ET" },
    );
    expect(reserved.payload["ok"], JSON.stringify(reserved.payload)).toBe(false);
    expect(reasonsOf(reserved.payload)).toContainEqual({
      field: "business_name",
      reason: "businessReserved",
    });
    const business = await postRoute(
      page,
      IDENTITY,
      { sellerType: "business", businessName: "Selam Phones " + rand().replace(/[0-9]/g, "q") },
      { token, country: "ET" },
    );
    expect(business.payload["ok"], JSON.stringify(business.payload)).toBe(true);
  });

  /** Bundle 20 turn 1 — the reasons one door answer carries. */
  async function aliasReasons(
    page: import("@playwright/test").Page,
    token: string,
    alias: string,
    country = "ET",
  ) {
    const answer = await postRoute(page, "/api/listings/alias", { alias }, { token, country });
    expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
    return {
      ok: answer.payload["ok"],
      reasons: reasonsOf(answer.payload).map((refusal) => refusal.reason),
      raw: JSON.stringify(answer.payload),
    };
  }

  async function businessReasons(
    page: import("@playwright/test").Page,
    token: string,
    businessName: string,
  ) {
    const answer = await postRoute(
      page,
      IDENTITY,
      { sellerType: "business", businessName },
      { token, country: "ET" },
    );
    expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
    return {
      ok: answer.payload["ok"],
      reasons: reasonsOf(answer.payload).map((refusal) => refusal.reason),
      raw: JSON.stringify(answer.payload),
    };
  }

  const NAME_REFUSALS = [
    "aliasReserved",
    "aliasClaim",
    "businessReserved",
    "businessClaim",
    "businessEthio",
  ];

  function expectRefused(answer: { ok: unknown; reasons: string[]; raw: string }, reason: string) {
    expect(answer.ok, answer.raw).toBe(false);
    expect(answer.reasons, answer.raw).toContain(reason);
  }

  function expectPasses(answer: { reasons: string[]; raw: string }) {
    for (const reason of NAME_REFUSALS) expect(answer.reasons, answer.raw).not.toContain(reason);
  }

  test("PR-54 claim words and lure words refuse in every country; an ordinary name with a lure word inside passes (R1, R3, DEC-203)", async ({
    page,
  }) => {
    const { token } = await seller(page);
    for (const alias of ["cbe_eth", "eth_telebirr", "telebirr_etiopia", "telebirr_bonus"]) {
      expectRefused(await aliasReasons(page, token, alias), "aliasClaim");
    }
    expectPasses(await aliasReasons(page, token, `e2epost${rand()}_bonus`));
    expectRefused(await businessReasons(page, token, "Telebirr Bonus"), "businessClaim");
    expectRefused(await aliasReasons(page, token, "telebirr_bonus", "KE"), "aliasClaim");
  });

  test("PR-55 the never-refused words and the list fixes pass; an exact protected handle stays refused (R4, R8, R13)", async ({
    page,
  }) => {
    const { token } = await seller(page);
    for (const alias of [
      "discard",
      "papal",
      "shrill",
      "desta",
      "moshe",
      "amole_shop",
      "kacha_shop",
    ]) {
      expectPasses(await aliasReasons(page, token, alias));
    }
    for (const alias of ["discord", "amole", "destta"]) {
      expectRefused(await aliasReasons(page, token, alias), "aliasReserved");
    }
  });

  test("PR-56 an Amharic business name one letter off a protected Amharic name is refused as reserved; a never-refused Amharic word passes (R2)", async ({
    page,
  }) => {
    const { token } = await seller(page);
    for (const name of ["አቢሲኒያ ባንክ", "ኦሮሚያ ኅብረት ሥራ ባንክ", "አቢሲንያ ባንክ"]) {
      expectRefused(await businessReasons(page, token, name), "businessReserved");
    }
    expectPasses(await businessReasons(page, token, "ጎልድስታር"));
  });

  test("PR-57 a country's name beside an institution word is the claim refusal; a two-letter code is never a country (R5)", async ({
    page,
  }) => {
    const { token } = await seller(page);
    for (const alias of ["norway_visa_lottery", "canada_agency_098", "sweden_embassy"]) {
      expectRefused(await aliasReasons(page, token, alias), "aliasClaim");
    }
    for (const alias of ["ke_embassy", "visa_help_for_me", "my_travel_agency"]) {
      expectPasses(await aliasReasons(page, token, alias));
    }
    expectRefused(await businessReasons(page, token, "Embassy of Sweden"), "businessClaim");
  });

  test("PR-58 accented Latin letters are read as plain letters in business names (R10)", async ({
    page,
  }) => {
    const { token } = await seller(page);
    expectRefused(await businessReasons(page, token, "Télébirr"), "businessReserved");
    expectRefused(await businessReasons(page, token, "Éthio Coffee"), "businessEthio");
    expectPasses(await businessReasons(page, token, "Café Selam " + rand().replace(/[0-9]/g, "q")));
  });

  test("PR-59 the v4 organisations are reserved for every seller in every country (DEC-202, DEC-203)", async ({
    page,
  }) => {
    const { token } = await seller(page);
    for (const alias of [
      "barclays",
      "sparkasse",
      "seb_bank",
      "nibremit",
      "united_nations",
      "swish",
    ]) {
      expectRefused(await aliasReasons(page, token, alias), "aliasReserved");
    }
    expectRefused(await aliasReasons(page, token, "barclays", "KE"), "aliasReserved");
    for (const alias of ["swish_shop", "absher_tours"]) {
      expectPasses(await aliasReasons(page, token, alias));
    }
    for (const name of ["Barclays", "JPMorgan Chase Bank", "NibRemit"]) {
      expectRefused(await businessReasons(page, token, name), "businessReserved");
    }
  });

  test("PR-60 the Amharic names and short forms of the list are reserved (R2)", async ({
    page,
  }) => {
    const { token } = await seller(page);
    for (const name of ["ባርክሌይስ", "ንግድ ባንክ", "ሲቢኢ"]) {
      expectRefused(await businessReasons(page, token, name), "businessReserved");
    }
  });
});
