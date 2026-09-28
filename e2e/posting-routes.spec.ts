import { expect, test } from "./fixtures";

import { gotoReady, signInViaSession } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";
import {
  activeCityOf,
  anyAttributeId,
  bearerOf,
  completeDraft,
  destroyListingsOf,
  destroyPostableCategory,
  observedCountryOf,
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

  test.afterEach(async () => {
    // J3 — an afterEach hook survives a body timeout; a `finally` inside the body
    // does not, and that is how markets leaked in INC-218.
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    // Links first: a category cannot be deleted while a definition link points at it.
    await destroySpecSet(specs.splice(0));
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
  });

  async function seller(page: import("@playwright/test").Page) {
    const user = await createUser({ confirmed: true });
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

  test("PR-3 a complete draft publishes to screening and never to active", async ({ page }) => {
    const { token } = await seller(page);
    const cat = await category();
    const city = await activeCityOf("ET");

    const draft = await postRoute(
      page,
      DRAFT,
      completeDraft({ categoryId: cat.id, cityId: city.id, title: `e2e posting ${rand()}` }),
      { token, country: "ET" },
    );
    expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
    const listingId = String(draft.payload["listing_id"] ?? "");
    expect(listingId).not.toBe("");

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

    const first = await page.request.get(path);
    expect(first.status()).toBe(200);
    const etag = first.headers()["etag"] ?? "";
    expect(etag, "the options route published no ETag").not.toBe("");
    // INC-243 — the list is held for ONE minute, with five of stale-while-revalidate,
    // so a curator's file commit reaches an open form within the minute.
    expect(first.headers()["cache-control"] ?? "").toContain("max-age=60");
    expect(first.headers()["cache-control"] ?? "").toContain("stale-while-revalidate=300");

    const repeat = await page.request.get(path, { headers: { "If-None-Match": etag } });
    expect(repeat.status()).toBe(304);

    // An id no attribute has is a 404, never an empty 200.
    const missing = await page.request.get(
      "/api/attributes/00000000-0000-0000-0000-000000000000/options",
    );
    expect(missing.status()).toBe(404);
  });

  test("PR-7 the draft dial refuses by name once the ceiling is reached", async ({ page }) => {
    test.setTimeout(120_000);
    const { token } = await seller(page);
    const cat = await category();
    // The dial is server env (`RATE_LIMIT_DRAFT_PER_HOUR`, default 30). The test
    // cannot set the server's env, so it walks the ceiling with a BOUND and
    // asserts the refusal's shape — never a sleep and never an unbounded loop.
    const ceiling = Number(process.env["RATE_LIMIT_DRAFT_PER_HOUR"] ?? 30);
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
});
