import { expect, test } from "./fixtures";
import { seedAttribute, destroyAttribute } from "./helpers/admin-attributes";
import { adminClient, leaseUser } from "./helpers/users";
import { fill } from "../src/features/posting/refusal-text";
import { createClient } from "@supabase/supabase-js";
import { passwordGrant } from "./helpers/session";
import { token } from "./helpers/ad-page";
import { adPageFixtures } from "./helpers/ad-page";
import {
  authFields,
  gotoReady,
  signInViaSession,
  switchLanguage,
  waitForHydration,
} from "./helpers/ui";
import { listingPath, shortListingPath } from "../src/features/ad-page/address";
import en from "../src/i18n/locales/en";
import am from "../src/i18n/locales/am";

/** Scratch ads only; the maker's afterEach also reaps photos on a timed-out test. */
test.describe("AD PAGE — the buyer's page (bundle 19 turn 5)", () => {
  const { scratchSeller, seed, publicIdOf, seedPhotos, cleanup } = adPageFixtures();
  const factKeys: string[] = [];
  test.afterEach(async () => {
    try {
      for (const key of factKeys.splice(0)) await destroyAttribute(key);
    } finally {
      await cleanup();
    }
  });

  async function address(ad: { id: string; title: string }) {
    const publicId = await publicIdOf(ad.id);
    return { publicId, canonical: listingPath(ad.title, publicId) };
  }

  test("AP-9 a live ad opens at its canonical address, server-rendered", async ({ page }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active", {
      contactPref: { messages: true, phone: { show: true, value: "+251911000001" } },
    });
    await seedPhotos(ad.id);
    const { canonical } = await address(ad);
    const response = await page.request.get(canonical);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(ad.title);
    expect(html).toContain(`<title>${ad.title}`);
    await page.goto(canonical);
    await expect(page.getByTestId("ad-page")).toBeVisible();
    await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
    await expect(page.getByTestId("listing-detail-price")).toContainText("100");
    await expect(page.getByTestId("listing-safety")).toBeVisible();
    await expect(page.getByTestId("listing-safety").getByRole("heading")).toHaveText(
      en["listing.safety.header"],
    );
    await expect(page.getByTestId("listing-safety-line")).toHaveCount(4);
    await expect(page.getByTestId("listing-detail-sold-badge")).toHaveCount(0);
    await expect(page.getByTestId("gallery-thumb")).toHaveCount(2);
    await expect(page.getByTestId("gallery-thumbs").locator("img")).toHaveCount(2);
    await expect
      .poll(async () =>
        page
          .getByTestId("gallery-main")
          .locator("img")
          .evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
      )
      .toBe(true);
    await expect(page.locator('section[data-testid="listing-detail-seller"]')).toContainText(
      seller.alias,
    );
    // Turn 11 (D201 §6) — a signed-out visitor gets no channel rows, one
    // sign-in link that returns to the contact block, and the number nowhere.
    await expect(page.getByTestId("listing-detail-channel")).toHaveCount(0);
    const signIn = page.getByTestId("listing-contact-sign-in");
    await expect(signIn).toBeVisible();
    const href = await signIn.getAttribute("href");
    expect(href).not.toBeNull();
    expect(href!.startsWith("/auth?return=")).toBe(true);
    expect(decodeURIComponent(href!.slice("/auth?return=".length))).toBe(`${canonical}#contact`);
    await expect(page.locator("body")).not.toContainText("251911000001");
    expect(html).not.toContain("251911000001");
    expect(html).not.toContain('data-testid="listing-detail-channel"');
    await expect(
      page.locator(`[data-testid="breadcrumb-category-parent"][href="/c/${seller.leafSlug}"]`),
    ).toBeVisible();
    await expect(page.getByTestId("breadcrumb-ad")).toHaveText(ad.title);
  });

  test("AP-10 the short address and a wrong-words address are redirected to the canonical", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    const { canonical, publicId } = await address(ad);
    for (const path of [shortListingPath(publicId), `/l/old-words-${publicId}`]) {
      const response = await page.request.get(path, { maxRedirects: 0 });
      expect(response.status()).toBe(301);
      expect(response.headers()["location"]).toBe(canonical);
    }
    expect((await page.request.get(canonical)).status()).toBe(200);
  });

  test("AP-11 a draft, a removed, a long-sold and an unknown ad are gone", async ({ page }) => {
    const seller = await scratchSeller();
    const draft = await seed(seller, "draft");
    const removed = await seed(seller, "removed");
    const longSold = await seed(seller, "sold", { soldAt: -40 });
    for (const ad of [draft, removed, longSold]) {
      const { canonical } = await address(ad);
      expect((await page.request.get(canonical)).status()).toBe(404);
      await page.goto(canonical);
      await expect(page.getByTestId("ad-page-gone")).toBeVisible();
      await expect(page.getByTestId("ad-page-gone").getByRole("heading")).toHaveText(
        en["adPage.gone.title"],
      );
      await expect(page.getByTestId("ad-page-gone-home")).toHaveAttribute("href", "/");
    }
    for (const path of ["/l/zzzzzzzzzz", "/l/not-an-id"]) {
      expect((await page.request.get(path)).status()).toBe(404);
    }
  });

  test("AP-12 a sold ad keeps its page for 30 days, marked and unindexed", async ({ page }) => {
    const seller = await scratchSeller();
    const sold = await seed(seller, "sold", { soldAt: -1 });
    const live = await seed(seller);
    const soldPath = (await address(sold)).canonical;
    const response = await page.request.get(soldPath);
    expect(response.status()).toBe(200);
    expect(await response.text()).toMatch(
      /<meta(?=[^>]*name="robots")(?=[^>]*content="noindex")[^>]*>/,
    );
    const liveHtml = await (await page.request.get((await address(live)).canonical)).text();
    expect(liveHtml).not.toMatch(/<meta[^>]*name="robots"/);
    await page.goto(soldPath);
    await expect(page.getByTestId("ad-page")).toBeVisible();
    await expect(page.getByTestId("listing-ribbon-text")).toHaveText(en["feed.ribbon.sold"]);
    await expect(page.getByTestId("listing-detail-sold-badge")).toHaveText(en["feed.ribbon.sold"]);
    await expect(page.getByTestId("listing-safety")).toHaveCount(0);
    await expect(page.getByTestId("listing-detail-contact")).toHaveCount(0);
    await expect(page.locator('section[data-testid="listing-detail-seller"]')).toBeVisible();
    await expect(page.locator('section[data-testid="listing-detail-seller"]')).toContainText(
      seller.alias,
    );
  });

  test("AP-13 Amharic", async ({ page }) => {
    const seller = await scratchSeller();
    const live = await seed(seller);
    const draft = await seed(seller, "draft");
    await page.goto((await address(live)).canonical);
    await expect(page.getByTestId("ad-page")).toBeVisible();
    await switchLanguage(page, "am");
    await expect(page.getByTestId("listing-safety").getByRole("heading")).toHaveText(
      am["listing.safety.header"],
    );
    await expect(
      page
        .locator('section[data-testid="listing-detail-seller"]')
        .getByRole("heading", { level: 3 }),
    ).toHaveText(am["post.preview.sellerLabel"]);
    await expect(page.getByTestId("listing-detail-contact").getByRole("heading")).toHaveText(
      am["post.preview.contactLabel"],
    );
    await page.goto((await address(draft)).canonical);
    await expect(page.getByTestId("ad-page-gone")).toBeVisible();
    await expect(page.getByTestId("ad-page-gone").getByRole("heading")).toHaveText(
      am["adPage.gone.title"],
    );
  });
  test("AP-14 the feed card links to the ad's page", async ({ page }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    const { canonical } = await address(ad);
    await page.goto(`/c/${seller.leafSlug}`);
    const card = page.locator(`[data-testid="listing-card"][data-listing="${ad.id}"]`);
    await expect(card).toBeVisible();
    const link = card.getByTestId("listing-card-link");
    await expect(link).toHaveAttribute("href", canonical);
    await link.click();
    await expect(page.getByTestId("ad-page")).toBeVisible();
    await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
  });

  test("AP-15 the seller's ad page links to the buyer's view", async ({ page }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    const draft = await seed(seller, "draft");
    const { canonical } = await address(ad);
    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, `/my-listings/${ad.id}`);
    await expect(page.getByTestId("my-listing-page")).toBeVisible();
    const link = page.getByTestId("my-listing-open-public");
    await expect(link).toHaveAttribute("href", canonical);
    await expect(link).toHaveAttribute("target", "_blank");
    await gotoReady(page, `/my-listings/${draft.id}`);
    await expect(page.getByTestId("my-listing-continue")).toBeVisible();
    await expect(page.getByTestId("my-listing-open-public")).toHaveCount(0);
  });
  test("AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    const { canonical } = await address(ad);
    const runKey = `ap17-${token()}`;
    let addressKey = `${runKey}-a`;
    await page.route("**/api/listings/view", (route) =>
      route.continue({
        headers: { ...route.request().headers(), "x-e2e-catalog-find-key": addressKey },
      }),
    );
    async function visit(reload = false) {
      const response = page.waitForResponse(
        (response) =>
          new URL(response.url()).pathname === "/api/listings/view" &&
          response.request().method() === "POST",
      );
      if (reload) await page.reload();
      else await page.goto(canonical);
      await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
      const counted = await response;
      expect(counted.status()).toBe(200);
    }
    async function views() {
      const { data, error } = await adminClient()
        .from("listing_counters")
        .select("views")
        .eq("listing_id", ad.id);
      if (error) throw new Error(`[e2e:ap17] counter read failed: ${error.message}`);
      return (data ?? []).reduce((sum, row) => sum + row.views, 0);
    }
    await visit();
    expect(await views()).toBe(1);
    await visit(true);
    expect(await views()).toBe(1);
    addressKey = `${runKey}-b`;
    await visit(true);
    expect(await views()).toBe(2);
    await signInViaSession(page, seller.email, seller.password);
    addressKey = `${runKey}-c`;
    await visit();
    expect(await views()).toBe(2);
    await gotoReady(page, `/my-listings/${ad.id}`);
    const count = page.getByTestId("listing-detail-counts");
    await expect(count).toHaveAttribute("data-state", "ready");
    await expect(count).toHaveText(
      `${fill(en["feed.views"], { count: 2 })} · ${fill(en["adPage.counts.shares"], { count: 0 })} · ${fill(en["adPage.counts.saves"], { count: 0 })} · ${fill(en["adPage.counts.contacts"], { count: 0 })}`,
    );
    await expect(page.getByTestId("listing-detail")).toHaveAttribute("data-actor", "owner");
    for (const data of [{ publicId: "nope" }, {}]) {
      const refused = await page.request.post("/api/listings/view", { data });
      expect(refused.status()).toBe(400);
    }
    const unknown = await page.request.post("/api/listings/view", {
      data: { publicId: "2345678923" },
    });
    expect(unknown.status()).toBe(200);
    expect(await unknown.json()).toEqual({ counted: false });
  });
  test("AP-18 the key-facts strip: ranked facts in rank order, the fallback when none, never a card fact", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const selectKey = `e2e-fact-select-${token()}`;
    const numberKey = `e2e-fact-number-${token()}`;
    const textKey = `e2e-fact-text-${token()}`;
    factKeys.push(selectKey, numberKey, textKey);
    const supabase = adminClient();
    const selectId = await seedAttribute(selectKey, "single_select");
    const numberId = await seedAttribute(numberKey, "number");
    const textId = await seedAttribute(textKey, "text");
    const options = await supabase
      .from("attributes")
      .update({
        options: [
          {
            value: "blue",
            label_en: "Blue",
            label_am: null,
            parent: null,
            active: true,
            bounds: null,
            aliases: [],
          },
        ],
      })
      .eq("id", selectId);
    if (options.error) throw new Error(`AP-18 options: ${options.error.message}`);
    const links = await supabase.from("category_attribute_links").insert([
      {
        category_id: seller.leafId,
        attribute_id: selectId,
        display_order: 1,
        is_filterable: true,
        fact_rank: 2,
      },
      {
        category_id: seller.leafId,
        attribute_id: numberId,
        display_order: 2,
        is_filterable: true,
        fact_rank: 1,
      },
      { category_id: seller.leafId, attribute_id: textId, display_order: 3, is_filterable: false },
    ]);
    if (links.error) throw new Error(`AP-18 links: ${links.error.message}`);
    const ad = await seed(seller, "active", {
      attributes: { [selectKey]: "blue", [numberKey]: 42, [textKey]: "scratch" },
    });
    await page.goto((await address(ad)).canonical);
    await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
    const chips = page.getByTestId("listing-key-fact");
    await expect(chips).toHaveCount(2);
    expect(
      await chips.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-fact-key"))),
    ).toEqual([numberKey, selectKey]);
    await expect(chips.nth(0)).toContainText("42");
    await expect(chips.nth(1)).toContainText("Blue");
    const clear = await supabase
      .from("category_attribute_links")
      .update({ fact_rank: null })
      .eq("category_id", seller.leafId)
      .in("attribute_id", [selectId, numberId]);
    if (clear.error) throw new Error(`AP-18 clear: ${clear.error.message}`);
    await page.reload();
    await expect(chips).toHaveCount(2);
    // Part C is authoritative: fallback follows the seeded form order (select 1, number 2).
    expect(
      await chips.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-fact-key"))),
    ).toEqual([selectKey, numberKey]);
    const card = await supabase
      .from("category_attribute_links")
      .update({ card_rank: 1 })
      .eq("category_id", seller.leafId)
      .eq("attribute_id", selectId);
    if (card.error) throw new Error(`AP-18 card: ${card.error.message}`);
    await page.reload();
    await expect(chips).toHaveCount(1);
    await expect(chips).toHaveAttribute("data-fact-key", numberKey);
  });

  test("AP-19 the share image and the structured data", async ({ page }) => {
    const seller = await scratchSeller();
    const live = await seed(seller);
    await seedPhotos(live.id);
    const { canonical, publicId } = await address(live);
    const photo = await page.request.get(`/l/${publicId}/photo.jpg`, { maxRedirects: 0 });
    expect(photo.status()).toBe(302);
    const location = photo.headers()["location"];
    expect(location).toMatch(/^https:\/\//);
    const image = await page.request.get(location);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toMatch(/^image\//);
    const response = await page.request.get(canonical);
    expect(response.status()).toBe(200);
    const origin = new URL(response.url()).origin;
    const html = await response.text();
    expect(html).toMatch(
      new RegExp(
        `<meta(?=[^>]*property="og:image")(?=[^>]*content="${origin}/l/${publicId}/photo.jpg")[^>]*>`,
      ),
    );
    const product = (source: string) => {
      const scripts = [
        ...source.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
      ]
        .map((match) => JSON.parse(match[1] ?? "null"))
        .filter((value) => value?.["@type"] === "Product");
      expect(scripts).toHaveLength(1);
      return scripts[0];
    };
    expect(product(html)).toMatchObject({
      "@type": "Product",
      name: live.title,
      offers: { price: "100", priceCurrency: "ETB", availability: "https://schema.org/InStock" },
    });
    const sold = await seed(seller, "sold", { soldAt: -1 });
    const soldHtml = await (await page.request.get((await address(sold)).canonical)).text();
    expect(product(soldHtml).offers.availability).toBe("https://schema.org/SoldOut");
    const noPhotos = await seed(seller);
    const noPhotoHtml = await (await page.request.get((await address(noPhotos)).canonical)).text();
    expect(noPhotoHtml).not.toMatch(/<meta[^>]*property="og:image"/);
    expect(
      (await page.request.get(`/l/${(await address(noPhotos)).publicId}/photo.jpg`)).status(),
    ).toBe(404);
    for (const id of ["2345678923", "nope"]) {
      expect((await page.request.get(`/l/${id}/photo.jpg`)).status()).toBe(404);
    }
  });

  test("AP-23 a signed-in buyer taps Show contact; a signed-out visitor returns to the block after sign-in (D201 §6)", async ({
    page,
    browser,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active", {
      contactPref: {
        messages: true,
        phone: { show: true, value: "+251911000001" },
        telegram: { show: true, value: "@scratch_seller" },
      },
    });
    const { canonical } = await address(ad);
    const buyer = await leaseUser();

    // Signed in: the channel names only until the tap, then the links.
    const servedHtml = await (await page.request.get(canonical)).text();
    expect(servedHtml).not.toContain("251911000001");
    await signInViaSession(page, buyer.email, buyer.password);
    await gotoReady(page, canonical);
    await expect(page.getByTestId("listing-detail-channel")).toHaveCount(2);
    await expect(page.locator("body")).not.toContainText("251911000001");
    await expect(page.locator("body")).not.toContainText("scratch_seller");
    await page.getByTestId("listing-contact-show").click();
    await expect(page.getByTestId("listing-contact-phone")).toHaveAttribute(
      "href",
      "tel:+251911000001",
    );
    await expect(page.getByTestId("listing-contact-phone")).toHaveText("+251911000001");
    await expect(page.getByTestId("listing-contact-telegram")).toHaveAttribute(
      "href",
      "https://t.me/scratch_seller",
    );

    // Signed out: the link's return brings the visitor back to the contact block.
    const context = await browser.newContext();
    try {
      const visitor = await context.newPage();
      await gotoReady(visitor, canonical);
      await visitor.getByTestId("listing-contact-sign-in").click();
      await waitForHydration(visitor);
      const { email, password, submit } = authFields(visitor);
      await email.fill(buyer.email);
      await password.fill(buyer.password);
      await submit.click();
      await expect
        .poll(() => {
          const url = new URL(visitor.url());
          return `${url.pathname}${url.hash}`;
        })
        .toBe(`${canonical}#contact`);
      await expect(visitor.getByTestId("listing-detail-seller")).toBeInViewport();
    } finally {
      await context.close();
    }
  });
  test("AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart", async ({
    page,
    browser,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    const { canonical, publicId } = await address(ad);
    const buyer = await leaseUser();
    await gotoReady(page, canonical);
    const heart = page.getByTestId("listing-save");
    await expect(heart).toHaveAttribute("data-state", "signedOut");
    await expect(heart).toHaveAttribute("href", `/auth?return=${encodeURIComponent(canonical)}`);
    await expect(page.getByTestId("listing-save-count")).toHaveCount(0);
    await heart.click();
    await waitForHydration(page);
    const fields = authFields(page);
    await fields.email.fill(buyer.email);
    await fields.password.fill(buyer.password);
    await fields.submit.click();
    await expect.poll(() => new URL(page.url()).pathname).toBe(canonical);
    await expect(heart).toHaveAttribute("data-state", "unsaved");
    const savedRows = async () => {
      const { data, error } = await adminClient()
        .from("saved_listings")
        .select("listing_id")
        .eq("user_id", buyer.id)
        .eq("listing_id", ad.id);
      if (error) throw new Error(`AP-26 read: ${error.message}`);
      return data;
    };
    await heart.click();
    await expect(heart).toHaveAttribute("data-state", "saved");
    await expect(heart).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByTestId("listing-save-count")).toHaveText("Saved by 1");
    expect(await savedRows()).toEqual([{ listing_id: ad.id }]);
    await page.reload();
    await expect(heart).toHaveAttribute("data-state", "saved");
    await expect(page.getByTestId("listing-save-count")).toHaveText("Saved by 1");
    await heart.click();
    await expect(heart).toHaveAttribute("data-state", "unsaved");
    await expect(page.getByTestId("listing-save-count")).toHaveCount(0);
    expect(await savedRows()).toEqual([]);
    const context = await browser.newContext({ viewport: page.viewportSize() ?? undefined });
    try {
      const owner = await context.newPage();
      await signInViaSession(owner, seller.email, seller.password);
      await gotoReady(owner, `/my-listings/${ad.id}`);
      const count = owner.locator('[data-testid="listing-detail-count"][data-count="saves"]');
      await expect(count).toHaveText("0 saves");
      const url = process.env["E2E_SUPABASE_URL"];
      const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
      if (!url || !key) throw new Error("AP-26 staging configuration missing");
      const session = await passwordGrant(buyer.email, buyer.password);
      const client = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { headers: { Authorization: `Bearer ${session.access_token}` } },
      });
      const result = await client.rpc("save_listing", { p_public_id: publicId });
      expect(result.error).toBeNull();
      expect(result.data).toMatchObject({ ok: true, saved: true, count: 1 });
      await owner.reload();
      await expect(count).toHaveText("1 saves");
      await gotoReady(owner, canonical);
      const ownHeart = owner.getByTestId("listing-save");
      await expect(ownHeart).toHaveAttribute("data-state", "unsaved");
      await ownHeart.click();
      await expect(ownHeart).toHaveCount(0);
    } finally {
      await context.close();
    }
  });
  test("AP-29 Report on the buyer's page: signed out, the link signs in and comes back to #report; signed in, the dialog sends a reason and a note once and thanks; a second report says already reported; the owner's page has no Report", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    const buyer = await leaseUser();
    const { canonical } = await address(ad);
    await page.goto(canonical);
    const signIn = page.getByTestId("listing-report-sign-in");
    await expect(signIn).toBeVisible();
    const href = await signIn.getAttribute("href");
    if (href === null) throw new Error("AP-29 missing sign-in address");
    expect(href.startsWith("/auth?return=")).toBe(true);
    expect(decodeURIComponent(href.slice("/auth?return=".length))).toBe(`${canonical}#report`);
    await signInViaSession(page, buyer.email, buyer.password);
    await gotoReady(page, canonical);
    await page.getByTestId("listing-report-open").click();
    await expect(page.getByTestId("listing-report-send")).toBeDisabled();
    await page.getByTestId("listing-report-reason-wrongCategory").click();
    await page.getByTestId("listing-report-note").pressSequentially("scratch report");
    await page.getByTestId("listing-report-send").click();
    await expect(page.getByTestId("listing-report-status")).toHaveAttribute("data-state", "sent");
    await expect(page.getByTestId("listing-report-status")).toHaveText(en["adPage.report.thanks"]);
    const readReports = async () => {
      const read = await adminClient()
        .from("listing_reports")
        .select("reporter_id,reason,note,status,home_country_code")
        .eq("listing_id", ad.id);
      if (read.error) throw new Error(`[e2e:ap29] reports read failed: ${read.error.message}`);
      return read.data;
    };
    const reports = await readReports();
    const directory = await adminClient()
      .from("user_directory")
      .select("home_country_code")
      .eq("user_id", buyer.id)
      .single();
    if (directory.error)
      throw new Error(`[e2e:ap29] directory read failed: ${directory.error.message}`);
    expect(reports).toEqual([
      {
        reporter_id: buyer.id,
        reason: "wrongCategory",
        note: "scratch report",
        status: "open",
        home_country_code: directory.data.home_country_code,
      },
    ]);
    await page.keyboard.press("Escape");
    await page.getByTestId("listing-report-open").click();
    await page.getByTestId("listing-report-reason-spam").click();
    await page.getByTestId("listing-report-send").click();
    await expect(page.getByTestId("listing-report-status")).toHaveAttribute(
      "data-state",
      "already",
    );
    expect(await readReports()).toHaveLength(1);
    await page.keyboard.press("Escape");
    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, `/my-listings/${ad.id}`);
    await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
    await expect(page.getByTestId("listing-report-open")).toHaveCount(0);
    await expect(page.getByTestId("listing-report-sign-in")).toHaveCount(0);
  });
  test("AP-30 Share: rows and links, Copy and QR counted by channel, native sharing where supported, buyer and owner counters", async ({
    page,
    context,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    const { canonical, publicId } = await address(ad);
    const addressKey = `e2e-ap30-${token()}`;
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.route("**/api/listings/{view,share}", (route) =>
      route.continue({
        headers: { ...route.request().headers(), "x-e2e-catalog-find-key": addressKey },
      }),
    );
    const viewed = page.waitForResponse(
      (r) => new URL(r.url()).pathname === "/api/listings/view" && r.request().method() === "POST",
    );
    await page.goto(canonical);
    await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
    expect((await viewed).status()).toBe(200);
    const url = new URL(canonical, page.url()).href;
    await page.getByTestId("listing-share-open").click();
    await expect(page.getByTestId("listing-share-telegram")).toHaveAttribute(
      "href",
      new RegExp(`^https://t\\.me/share/url\\?url=${encodeURIComponent(url)}`),
    );
    const whatsapp = await page.getByTestId("listing-share-whatsapp").getAttribute("href");
    expect(whatsapp?.startsWith("https://wa.me/?text=")).toBe(true);
    expect(whatsapp).toContain(encodeURIComponent(url));
    await expect(page.getByTestId("listing-share-facebook")).toHaveAttribute(
      "href",
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    );
    const canShare = await page.evaluate(() => typeof navigator.share === "function");
    await expect(page.getByTestId("listing-share-more")).toHaveCount(canShare ? 1 : 0);
    async function tap(channel: "copy" | "qr") {
      const response = page.waitForResponse(
        (r) =>
          new URL(r.url()).pathname === "/api/listings/share" && r.request().method() === "POST",
      );
      await page.getByTestId(`listing-share-${channel}`).click();
      expect((await response).status()).toBe(200);
    }
    async function counters() {
      const answer = await adminClient()
        .from("listing_counters")
        .select("views,shares_copy,shares_qr")
        .eq("listing_id", ad.id)
        .eq("day", new Date().toISOString().slice(0, 10))
        .single();
      if (answer.error || !answer.data)
        throw new Error(`[e2e:ap30] counter read failed: ${answer.error?.message}`);
      return answer.data;
    }
    await tap("copy");
    await expect(page.getByTestId("listing-share-status")).toHaveAttribute("data-state", "copied");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(url);
    await tap("qr");
    const image = page.getByTestId("listing-share-qr-image");
    await expect(image).toHaveAttribute("src", `/l/${publicId}/qr.svg`);
    await expect
      .poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth))
      .toBeGreaterThan(0);
    expect(await counters()).toMatchObject({ views: 1, shares_copy: 1, shares_qr: 1 });
    await tap("copy");
    expect(await counters()).toMatchObject({ shares_copy: 1, shares_qr: 1 });
    const reViewed = page.waitForResponse(
      (r) => new URL(r.url()).pathname === "/api/listings/view" && r.request().method() === "POST",
    );
    await page.reload();
    await reViewed;
    await expect(page.getByTestId("listing-detail-public-counts")).toHaveText(
      `${fill(en["adPage.counts.seen"], { count: 1 })} · ${fill(en["adPage.counts.shared"], { count: 2 })}`,
    );
    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, `/my-listings/${ad.id}`);
    await expect(
      page.locator('[data-testid="listing-detail-count"][data-count="shares"]'),
    ).toHaveText(fill(en["adPage.counts.shares"], { count: 2 }));
  });

  test("AP-31 Share route refuses bad channel and id; a nonpublic ad is not counted", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const live = await seed(seller);
    const removed = await seed(seller, "removed");
    const { publicId } = await address(live);
    for (const data of [
      { publicId, channel: "email" },
      { publicId: "nope", channel: "copy" },
    ]) {
      const response = await page.request.post("/api/listings/share", { data });
      expect(response.status()).toBe(400);
    }
    const response = await page.request.post("/api/listings/share", {
      data: { publicId: await publicIdOf(removed.id), channel: "copy" },
      headers: { "x-e2e-catalog-find-key": `e2e-ap31-${token()}` },
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ counted: false });
    const truth = await adminClient()
      .from("listing_counters")
      .select("listing_id")
      .eq("listing_id", removed.id);
    expect(truth.error).toBeNull();
    expect(truth.data).toEqual([]);
  });

  test("AP-32 similar ads: up to six of the same leaf and place, the ad itself never among them; none on a sold ad", async ({
    page,
  }) => {
    const sellerA = await scratchSeller();
    const sellerB = await scratchSeller();
    const X = await seed(sellerA);
    for (let n = 0; n < 3; n++) await seed(sellerA);
    // B's ad in A's leaf and place: the scratch leaf holds only this test's ads.
    await seed({ id: sellerB.id, leafId: sellerA.leafId, cityId: sellerA.cityId });
    const { canonical, publicId } = await address(X);
    await page.goto(canonical);
    await expect(page.getByTestId("listing-detail-title")).toHaveText(X.title);
    const section = page.getByTestId("listing-similar");
    await expect(section).toBeVisible({ timeout: 15000 });
    const hrefs = await section
      .locator("ul > li a")
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href") ?? ""));
    expect(hrefs).toHaveLength(4);
    expect(hrefs.every((href) => !href.includes(publicId))).toBe(true);
    const marked = await adminClient()
      .from("listings")
      .update({ status: "sold", sold_at: new Date().toISOString() })
      .eq("id", X.id);
    expect(marked.error).toBeNull();
    await page.reload();
    await expect(page.getByTestId("listing-detail-title")).toHaveText(X.title);
    await expect(page.getByTestId("listing-similar")).toHaveCount(0);
  });

  test("AP-33 the seller's own ad page shares a live ad only", async ({ page }) => {
    const seller = await scratchSeller();
    const live = await seed(seller);
    const draft = await seed(seller, "draft");
    const sold = await seed(seller, "sold", { soldAt: -1 });
    const { canonical } = await address(live);
    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, `/my-listings/${live.id}`);
    await page.getByTestId("listing-share-open").click();
    const url = new URL(canonical, page.url()).href;
    await expect(page.getByTestId("listing-share-telegram")).toHaveAttribute(
      "href",
      new RegExp(`^https://t\\.me/share/url\\?url=${encodeURIComponent(url)}`),
    );
    await gotoReady(page, `/my-listings/${draft.id}`);
    await expect(page.getByTestId("listing-share-open")).toHaveCount(0);
    await gotoReady(page, `/my-listings/${sold.id}`);
    await expect(page.getByTestId("listing-share-open")).toHaveCount(0);
  });
});
