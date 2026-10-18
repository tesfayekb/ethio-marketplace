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
    if (href === null) throw new Error("AP-9 contact link missing");
    await expect(signIn).toHaveText(en["adPage.contact.link"]);
    expect(href.startsWith("/auth?return=")).toBe(true);
    expect(new URL(href, page.url()).searchParams.get("return")).toBe(`${canonical}#contact`);
    await expect(page.locator("body")).not.toContainText("251911000001");
    expect(html).not.toContain("251911000001");
    expect(html).not.toContain('data-testid="listing-detail-channel"');
    expect(html).not.toContain('data-testid="listing-contact-sign-in"');
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
    await expect(page.getByTestId("listing-detail-contact").getByRole("heading")).toHaveCount(0);
    await expect(page.getByTestId("listing-contact-sign-in")).toHaveText(am["adPage.contact.link"]);
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
  test("AP-17 a view counts once per browser session; reloads in the session do not; another session from the same address does; the owner never; the seller's page shows the count; the route refuses a bad id", async ({
    page,
    browser,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    const { canonical } = await address(ad);
    // The address key stays FIXED for the whole test: only the session changes.
    const addressKey = `ap17-${token()}`;
    const pin = async (context: import("@playwright/test").BrowserContext) =>
      context.route("**/api/listings/view", (route) =>
        route.continue({
          headers: { ...route.request().headers(), "x-e2e-catalog-find-key": addressKey },
        }),
      );
    await pin(page.context());
    async function visit(target: import("@playwright/test").Page, reload = false) {
      const response = target.waitForResponse(
        (response) =>
          new URL(response.url()).pathname === "/api/listings/view" &&
          response.request().method() === "POST",
      );
      if (reload) await target.reload();
      else await target.goto(canonical);
      await expect(target.getByTestId("listing-detail-title")).toHaveText(ad.title);
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
    await visit(page);
    expect(await views()).toBe(1);
    // A reload in the same tab keeps the same session id: no second count.
    await visit(page, true);
    expect(await views()).toBe(1);
    // A second browser context has its own sessionStorage: a new session from
    // the same address counts once more.
    const second = await browser.newContext();
    try {
      await pin(second);
      const secondPage = await second.newPage();
      await visit(secondPage);
      expect(await views()).toBe(2);
    } finally {
      await second.close();
    }
    // The owner's own view is never counted.
    await signInViaSession(page, seller.email, seller.password);
    await visit(page);
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
          return `${url.pathname}${url.search}${url.hash}`;
        })
        .toBe(`${canonical}#contact`);
      await expect(visitor.getByTestId("listing-detail-seller")).toBeInViewport();
      await expect(visitor.getByTestId("listing-contact-phone")).toHaveText("+251911000001");
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
      fill(en["adPage.counts.shared"], { count: 2 }),
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

  test("AP-35 the seller card links to the seller's page; the page lists his live ads and pages them; an unknown key says not found", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller);
    // EL-4 — two more live ads for the same scratch seller.
    await seed(seller);
    await seed(seller);
    const { canonical } = await address(ad);
    const key = seller.alias.toLowerCase();

    // A signed-out visitor: the seller card links to the seller's page.
    await page.goto(canonical);
    await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
    const link = page.getByTestId("listing-seller-all-ads");
    await expect(link).toHaveAttribute("href", `/${key}`);
    await link.click();
    await expect(page.getByTestId("seller-page-title")).toContainText(seller.alias);
    await expect(page.getByTestId("seller-page-card")).toHaveCount(3);

    // The address is the name lower-cased: an upper-case letter redirects 301.
    const upper = key.charAt(0).toUpperCase() + key.slice(1);
    const moved = await page.request.get(`/${upper}`, { maxRedirects: 0 });
    expect(moved.status()).toBe(301);
    expect(moved.headers()["location"]).toBe(`/${key}`);

    // An unknown or malformed name is a 404; the door refuses an unknown key too.
    const unknown = await page.request.get(`/nobody_${token()}`);
    expect(unknown.status()).toBe(404);
    expect((await page.request.get("/nobody-zzqk!")).status()).toBe(404);
    const old = await page.request.get(`/seller/${key}`);
    expect(old.status()).toBe(404);
    const missing = await page.request.get(`/api/seller?key=nobody_${token()}`);
    expect(missing.status()).toBe(404);
    const noKey = await page.request.get("/api/seller");
    expect(noKey.status()).toBe(400);

    // Every site page still ranks before the root name (B3).
    const auth = await page.request.get("/auth");
    expect(auth.status()).toBe(200);
  });
  test("AP-36 the layout follows the article's width (DEC-192, drawings v13)", async ({
    page,
  }, testInfo) => {
    const seller = await scratchSeller();
    const key = `e2e-layout-${token()}`;
    factKeys.push(key);
    const attributeId = await seedAttribute(key, "text");
    const linked = await adminClient()
      .from("category_attribute_links")
      .insert({ category_id: seller.leafId, attribute_id: attributeId, display_order: 1 });
    expect(linked.error).toBeNull();
    const ad = await seed(seller, "active", { attributes: { [key]: "scratch value" }, pin: true });
    await seedPhotos(ad.id);
    const exact = await adminClient()
      .from("listings")
      .update({ pin_precision: "exact", pin_show_lat: 8.9876543, pin_show_lng: 38.7612345 })
      .eq("id", ad.id);
    expect(exact.error).toBeNull();
    await gotoReady(page, (await address(ad)).canonical);
    await expect(page.getByTestId("listing-detail-specs")).toBeVisible();
    const check = async () => {
      await expect
        .poll(() =>
          page
            .getByTestId("gallery-main")
            .locator("img")
            .evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
        )
        .toBe(true);
      let previous = "";
      await expect
        .poll(async () => {
          const boxes = await Promise.all([
            page.getByTestId("listing-detail-media").boundingBox(),
            page.getByTestId("listing-detail-headline").boundingBox(),
          ]);
          const current = JSON.stringify(boxes);
          const settled = boxes.every(Boolean) && current === previous;
          previous = current;
          return settled;
        })
        .toBe(true);
      const article = await page.getByTestId("listing-detail").boundingBox();
      const media = await page.getByTestId("listing-detail-media").boundingBox();
      const headline = await page.getByTestId("listing-detail-headline").boundingBox();
      const nav = await page.getByTestId("listing-section-nav").boundingBox();
      const details = await page.getByTestId("listing-detail-specs").boundingBox();
      const description = await page.locator("#ad-description").boundingBox();
      const sellerBox = await page
        .locator('section[data-testid="listing-detail-seller"]')
        .boundingBox();
      const location = await page.getByTestId("listing-detail-location").boundingBox();
      const safety = await page.getByTestId("listing-safety").boundingBox();
      if (
        !article ||
        !media ||
        !headline ||
        !nav ||
        !details ||
        !description ||
        !sellerBox ||
        !location ||
        !safety
      )
        throw new Error("AP-36 missing layout boxes");
      const near = (a: number, b: number, tolerance: number) => Math.abs(a - b) <= tolerance;
      if (article.width < 672) {
        const order = [media, headline, nav, details, description, sellerBox, location, safety];
        for (let i = 1; i < order.length; i += 1)
          expect(order[i].y).toBeGreaterThanOrEqual(order[i - 1].y + order[i - 1].height);
      } else if (article.width < 896) {
        expect(headline.x).toBeGreaterThanOrEqual(media.x + media.width);
        expect(near(headline.y, media.y, 1)).toBe(true);
        expect(near(headline.y + headline.height, media.y + media.height, 1)).toBe(true);
        expect(near(nav.width, article.width, 1)).toBe(true);
        expect(nav.y).toBeGreaterThanOrEqual(
          Math.max(media.y + media.height, headline.y + headline.height),
        );
        expect(description.x).toBeGreaterThanOrEqual(details.x + details.width);
        expect(near(description.y, details.y, 1)).toBe(true);
        expect(near(description.height, details.height, 1)).toBe(true);
        expect(sellerBox.x).toBeLessThan(location.x);
        expect(near(sellerBox.y, location.y, 1)).toBe(true);
        expect(near(sellerBox.height, location.height, 1)).toBe(true);
        expect(near(safety.width, article.width, 1)).toBe(true);
        expect(safety.y).toBeGreaterThanOrEqual(sellerBox.y + sellerBox.height);
      } else {
        expect(headline.x).toBeGreaterThanOrEqual(media.x + media.width);
        expect(near(headline.y, media.y, 1)).toBe(true);
        expect(near(headline.y + headline.height, media.y + media.height, 1)).toBe(true);
        expect(near(nav.width, article.width, 1)).toBe(true);
        const third = (article.width - 32) / 3;
        const row = [details, description, sellerBox];
        for (let i = 1; i < row.length; i += 1)
          expect(row[i].x).toBeGreaterThanOrEqual(row[i - 1].x + row[i - 1].width);
        for (const item of row) {
          expect(near(item.y, details.y, 1)).toBe(true);
          expect(near(item.height, details.height, 1)).toBe(true);
          expect(near(item.width, third, 2)).toBe(true);
        }
        expect(near(safety.x, article.x, 1)).toBe(true);
        expect(location.x).toBeGreaterThanOrEqual(safety.x + safety.width);
        expect(near(location.y, safety.y, 1)).toBe(true);
        expect(near(location.height, safety.height, 1)).toBe(true);
        expect(near(safety.width, third, 2)).toBe(true);
        expect(near(location.width, 2 * third + 16, 2)).toBe(true);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      return article.width;
    };
    await check();
    if (testInfo.project.name === "desktop-1280") {
      const original = page.viewportSize();
      await page.setViewportSize({ width: 1100, height: 900 });
      const width = await check();
      expect(width).toBeGreaterThanOrEqual(672);
      expect(width).toBeLessThan(896);
      if (original) await page.setViewportSize(original);
      await check();
    }
  });

  test("AP-37 the in-page bar scrolls to each section and stays under the sub-band", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-360");
    const seller = await scratchSeller();
    const key = `e2e-sections-${token()}`;
    factKeys.push(key);
    const attributeId = await seedAttribute(key, "text");
    const linked = await adminClient()
      .from("category_attribute_links")
      .insert({ category_id: seller.leafId, attribute_id: attributeId, display_order: 1 });
    expect(linked.error).toBeNull();
    // Turn 23: a pin so the Location box and its tab exist.
    const ad = await seed(seller, "active", { attributes: { [key]: "scratch value" }, pin: true });
    await seedPhotos(ad.id);
    await gotoReady(page, (await address(ad)).canonical);
    const bar = page.getByTestId("listing-section-nav");
    await expect(bar.getByTestId("listing-section-nav-item")).toHaveCount(4);
    expect(
      await bar
        .getByTestId("listing-section-nav-item")
        .evaluateAll((items) => items.map((item) => item.getAttribute("data-target"))),
    ).toEqual(["details", "description", "seller", "location"]);
    const locationItem = bar.locator('[data-target="location"]');
    await locationItem.click();
    await expect(locationItem).toHaveAttribute("aria-current", "true");
    await expect
      .poll(async () => {
        const heading = await page
          .getByTestId("listing-detail-location")
          .getByRole("heading")
          .boundingBox();
        const nav = await bar.boundingBox();
        return heading && nav ? heading.y - nav.y - nav.height : -1;
      })
      .toBeGreaterThanOrEqual(0);
    await expect
      .poll(async () => {
        const nav = await bar.boundingBox();
        const band = await page.getByTestId("shell-subband").boundingBox();
        return nav && band ? Math.abs(nav.y - band.y - band.height) : 100;
      })
      .toBeLessThanOrEqual(8);
    // Turn 23: a sold ad without a pin has no Location box and no tab.
    const sold = await seed(seller, "sold", { soldAt: -1 });
    await gotoReady(page, (await address(sold)).canonical);
    await expect(page.getByTestId("listing-section-nav")).toBeVisible();
    await expect(page.getByTestId("listing-section-nav-item")).toHaveCount(2);
    expect(
      await page
        .getByTestId("listing-section-nav-item")
        .evaluateAll((items) => items.map((item) => item.getAttribute("data-target"))),
    ).toEqual(["description", "seller"]);
    await expect(page.getByTestId("listing-detail-location")).toHaveCount(0);
    await expect(page.getByTestId("listing-contact-bar")).toHaveCount(0);
  });

  test("AP-38 no contact bar: Contact seller lives in the seller card only", async ({ page }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active", {
      contactPref: { phone: { show: true, value: "+251911000001" } },
    });
    const { canonical } = await address(ad);
    await gotoReady(page, canonical);
    await expect(page.getByTestId("listing-contact-bar")).toHaveCount(0);
    const sellerCard = page.getByTestId("listing-detail-seller");
    const signIn = sellerCard.getByTestId("listing-contact-sign-in");
    await expect(signIn).toBeVisible();
    const href = await signIn.getAttribute("href");
    if (href === null) throw new Error("AP-38 contact return missing");
    expect(new URL(href, page.url()).searchParams.get("return")).toBe(`${canonical}#contact`);
    const buyer = await leaseUser();
    await signInViaSession(page, buyer.email, buyer.password);
    await gotoReady(page, canonical);
    await expect(
      page.getByTestId("listing-detail-seller").getByTestId("listing-contact-show"),
    ).toBeVisible();
    await expect(page.getByTestId("listing-contact-bar")).toHaveCount(0);
  });

  test("AP-39 the map: only with a pin; Enlarge opens a movable map and closes", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const noPin = await seed(seller);
    await gotoReady(page, (await address(noPin)).canonical);
    await expect(page.getByTestId("listing-detail-map")).toHaveCount(0);
    await expect(page.getByTestId("listing-map-enlarge")).toHaveCount(0);
    const exact = await seed(seller, "active", { pin: true });
    const saved = await adminClient()
      .from("listings")
      .update({
        pin_precision: "exact",
        pin_show_lat: 8.9876543,
        pin_show_lng: 38.7612345,
        pin_zoom: 14,
      })
      .eq("id", exact.id);
    expect(saved.error).toBeNull();
    await gotoReady(page, (await address(exact)).canonical);
    await page.getByTestId("listing-map-enlarge").click();
    const dialog = page.getByTestId("listing-map-dialog");
    const large = page.getByTestId("listing-map-large");
    await expect(dialog).toBeVisible();
    await expect(large).toHaveAttribute("data-zoom", "14");
    await large.locator(".leaflet-control-zoom-in").click();
    await expect(large).toHaveAttribute("data-zoom", "15");
    await page.getByTestId("listing-map-close").click();
    await expect(dialog).toHaveCount(0);
    await expect(page.getByTestId("listing-detail-map")).toBeVisible();
    const approx = await seed(seller, "active", { pin: true });
    await gotoReady(page, (await address(approx)).canonical);
    await page.getByTestId("listing-map-enlarge").click();
    await expect(large).toHaveAttribute("data-zoom", "13");
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const zoomIn = large.locator(".leaflet-control-zoom-in");
      if ((await zoomIn.getAttribute("aria-disabled")) !== "true") {
        const before = Number(await large.getAttribute("data-zoom"));
        await zoomIn.click();
        await expect(large).toHaveAttribute("data-zoom", String(Math.min(before + 1, 15)));
      }
    }
    await expect(large).toHaveAttribute("data-zoom", "15");
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });
  test("AP-40 an address never reveals: only the visitor's own tap does (D201 §14)", async ({
    page,
    browser,
  }) => {
    const seller = await scratchSeller();
    const x = await seed(seller, "active", {
      contactPref: { phone: { show: true, value: "+251911000001" } },
    });
    const y = await seed(seller, "active", {
      contactPref: { phone: { show: true, value: "+251911000002" } },
    });
    const buyer = await leaseUser();
    const xAddress = await address(x);
    const yAddress = await address(y);
    await signInViaSession(page, buyer.email, buyer.password);
    for (const path of [
      `${xAddress.canonical}?${["reveal", "1"].join("=")}#contact`,
      `${xAddress.canonical}#contact`,
    ]) {
      await gotoReady(page, path);
      await expect(page.getByTestId("listing-contact-show")).toBeVisible();
      await expect(page.getByTestId("listing-contact-phone")).toHaveCount(0);
      const rows = await adminClient()
        .from("contact_reveals")
        .select("listing_id")
        .eq("viewer_id", buyer.id)
        .eq("listing_id", x.id);
      expect(rows.error).toBeNull();
      expect(rows.data).toHaveLength(0);
    }
    const context = await browser.newContext();
    try {
      const visitor = await context.newPage();
      await gotoReady(visitor, xAddress.canonical);
      await visitor.getByTestId("listing-contact-sign-in").click();
      await waitForHydration(visitor);
      // A person changes the sign-in destination to ad Y; the intent still belongs only to X.
      await gotoReady(
        visitor,
        `/auth?return=${encodeURIComponent(`${yAddress.canonical}#contact`)}`,
      );
      const fields = authFields(visitor);
      await fields.email.fill(buyer.email);
      await fields.password.fill(buyer.password);
      await fields.submit.click();
      await expect(visitor).toHaveURL(new RegExp(`${yAddress.canonical}#contact$`));
      await expect(visitor.getByTestId("listing-contact-show")).toBeVisible();
      await expect(visitor.getByTestId("listing-contact-phone")).toHaveCount(0);
      const rows = await adminClient()
        .from("contact_reveals")
        .select("listing_id")
        .eq("viewer_id", buyer.id)
        .eq("listing_id", y.id);
      expect(rows.error).toBeNull();
      expect(rows.data).toHaveLength(0);
    } finally {
      await context.close();
    }
  });

  test("AP-41 the page's remaining lines", async ({ page }) => {
    const seller = await scratchSeller();
    const today = await seed(seller, "active", { publishedAt: 0, pin: true });
    const long = Array.from({ length: 40 }, (_, i) => `Scratch description line ${i + 1}`).join(
      "\n",
    );
    const update = await adminClient()
      .from("listings")
      .update({
        description: long,
        pin_precision: "exact",
        pin_show_lat: 8.9876543,
        pin_show_lng: 38.7612345,
      })
      .eq("id", today.id);
    expect(update.error).toBeNull();
    await gotoReady(page, (await address(today)).canonical);
    await expect(page.getByTestId("listing-detail-posted")).toContainText(
      fill(en["adPage.posted"], { when: "today" }),
    );
    const text = page.getByTestId("listing-detail-description");
    const toggle = page.getByTestId("listing-description-toggle");
    await expect(toggle).toHaveText(en["adPage.description.more"]);
    const folded = await text.boundingBox();
    if (!folded) throw new Error("AP-41 folded description missing");
    await toggle.click();
    await expect(toggle).toHaveText(en["adPage.description.less"]);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect
      .poll(async () => (await text.boundingBox())?.height ?? 0)
      .toBeGreaterThan(folded.height);
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByTestId("listing-places-maps")).toHaveAttribute(
      "href",
      /^https:\/\/www.google.com\/maps\/search\/\?api=1&query=/,
    );
    await expect(page.getByTestId("listing-places-maps")).toHaveAttribute("target", "_blank");
    await expect(page.getByTestId("listing-map-google")).toHaveAttribute(
      "href",
      "https://www.google.com/maps/search/?api=1&query=8.9876543%2C38.7612345",
    );
    await expect(page.getByTestId("listing-map-google")).toHaveAttribute("target", "_blank");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(today.title);
    const approx = await seed(seller, "active", { pin: true });
    const coords = await adminClient()
      .from("listings")
      .select("pin_lat,pin_lng,pin_show_lat,pin_show_lng")
      .eq("id", approx.id)
      .single();
    expect(coords.error).toBeNull();
    if (
      !coords.data ||
      coords.data.pin_lat === null ||
      coords.data.pin_lng === null ||
      coords.data.pin_show_lat === null ||
      coords.data.pin_show_lng === null
    )
      throw new Error("AP-41 missing approximate coordinates");
    await gotoReady(page, (await address(approx)).canonical);
    const href = await page.getByTestId("listing-map-google").getAttribute("href");
    expect(href).toBe(
      `https://www.google.com/maps/search/?api=1&query=${(Math.round(coords.data.pin_show_lat / 0.01) * 0.01).toFixed(2)}%2C${(Math.round(coords.data.pin_show_lng / 0.01) * 0.01).toFixed(2)}`,
    );
    expect(href).not.toContain(String(coords.data.pin_lat));
    expect(href).not.toContain(String(coords.data.pin_lng));
    const old = await seed(seller, "active", { publishedAt: -3 });
    const short = await adminClient()
      .from("listings")
      .update({ description: "Scratch line one\nScratch line two" })
      .eq("id", old.id);
    expect(short.error).toBeNull();
    await gotoReady(page, (await address(old)).canonical);
    await expect(page.getByTestId("listing-detail-posted")).toContainText(
      fill(en["adPage.posted"], { when: "3 days ago" }),
    );
    await expect(toggle).toHaveCount(0);
    await expect(page.getByTestId("listing-map-google")).toHaveCount(0);
    await expect(page.getByTestId("listing-places-maps")).toBeVisible();
    // INC-715 — the other-language check is LAST; a test never switches back.
    await gotoReady(page, (await address(today)).canonical);
    await switchLanguage(page, "am");
    await expect(page.getByTestId("listing-detail-posted")).toContainText(
      fill(am["adPage.posted"], {
        when: new Intl.RelativeTimeFormat("am", { numeric: "auto" }).format(0, "day"),
      }),
    );
  });

  test("AP-43 the buyer reads his own map words", async ({ page }) => {
    const seller = await scratchSeller();
    const exact = await seed(seller, "active", { pin: true });
    const pin = await adminClient()
      .from("listings")
      .update({ pin_precision: "exact", pin_show_lat: 8.9876543, pin_show_lng: 38.7612345 })
      .eq("id", exact.id);
    expect(pin.error).toBeNull();
    await gotoReady(page, (await address(exact)).canonical);
    await expect(page.locator(`text=${en["post.pin.previewExact"]}`)).toHaveCount(0);
    await expect(page.getByTestId("listing-map-pin")).toHaveAttribute(
      "aria-label",
      en["adPage.map.label"],
    );
    const approx = await seed(seller, "active", { pin: true });
    await gotoReady(page, (await address(approx)).canonical);
    await expect(page.locator(`text=${en["post.pin.previewApprox"]}`)).toHaveCount(0);
    await expect(page.getByTestId("listing-map-caption")).toHaveText(en["adPage.map.approx"]);
    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, `/my-listings/${exact.id}`);
    await expect(page.getByTestId("listing-map-caption")).toHaveText(en["post.pin.previewExact"]);
  });

  test("AP-44 nothing covers the top bars", async ({ page }, testInfo) => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active", { pin: true });
    const pin = await adminClient()
      .from("listings")
      .update({ pin_precision: "exact", pin_show_lat: 8.9876543, pin_show_lng: 38.7612345 })
      .eq("id", ad.id);
    expect(pin.error).toBeNull();
    await gotoReady(page, (await address(ad)).canonical);
    const box = async (id: string) => {
      const found = await page.getByTestId(id).boundingBox();
      if (!found) throw new Error(`AP-44 ${id} missing`);
      return found;
    };
    /** The element at a bar's centre must be INSIDE that bar, never inside the map. */
    const hitInside = (id: string) =>
      page.evaluate((target) => {
        const bar = document.querySelector<HTMLElement>(`[data-testid="${target}"]`);
        if (!bar) return "missing";
        const rect = bar.getBoundingClientRect();
        const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
        if (hit === null) return "none";
        if (hit.closest('[data-testid="listing-detail-map"]') !== null) return "map";
        return bar.contains(hit) ? "inside" : "outside";
      }, id);
    // Scroll until the map's box is under the shell's band (the map's top above the band's bottom).
    // INC-718: on the wide window the document bottoms out before the map can pass under the band,
    // so desktop-1280 shortens the window first; mobile-360 keeps its window.
    if (testInfo.project.name === "desktop-1280") {
      await page.setViewportSize({ width: 1280, height: 500 });
    }
    await page.getByTestId("listing-detail-map").scrollIntoViewIfNeeded();
    await expect
      .poll(async () => {
        await page.mouse.wheel(0, 120);
        const map = await box("listing-detail-map");
        const band = await box("shell-band");
        return map.y < band.y + band.height;
      })
      .toBe(true);
    expect(await hitInside("shell-band")).toBe("inside");
    expect(await hitInside("shell-subband")).toBe("inside");
    if (testInfo.project.name === "mobile-360") {
      // With the Enlarge button scrolled under the in-page bar, the point answers the bar.
      await expect
        .poll(async () => {
          await page.mouse.wheel(0, 120);
          const enlarge = await box("listing-map-enlarge");
          const nav = await box("listing-section-nav");
          return enlarge.y < nav.y + nav.height;
        })
        .toBe(true);
      expect(await hitInside("listing-section-nav")).toBe("inside");
    }
  });

  test("AP-42 a missing box gives its room to its row", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280");
    /* Census: seed()'s default description is the one-sentence literal "e2e
      scratch listing for the ad page's doors" (helpers/ad-page.ts), so the
      empty-description case overwrites it and the one-sentence case keeps it. */
    const seller = await scratchSeller();
    const key = `e2e-fullrow-${token()}`;
    factKeys.push(key);
    const attributeId = await seedAttribute(key, "text");
    const linked = await adminClient()
      .from("category_attribute_links")
      .insert({ category_id: seller.leafId, attribute_id: attributeId, display_order: 1 });
    expect(linked.error).toBeNull();
    const live = await seed(seller, "active", { attributes: { [key]: "scratch value" } });
    const cleared = await adminClient()
      .from("listings")
      .update({ description: "" })
      .eq("id", live.id);
    expect(cleared.error).toBeNull();
    // Turn 23: a pin so the sold ad keeps its Location box for the full-row check.
    const sold = await seed(seller, "sold", {
      soldAt: -1,
      attributes: { [key]: "scratch value" },
      pin: true,
    });
    for (const ad of [live, sold]) {
      await gotoReady(page, (await address(ad)).canonical);
      await expect(page.getByTestId("listing-detail-specs")).toBeVisible();
      let previous = "";
      await expect
        .poll(async () => {
          const current = JSON.stringify(
            await Promise.all([
              page.getByTestId("listing-detail-specs").boundingBox(),
              page.locator('section[data-testid="listing-detail-seller"]').boundingBox(),
            ]),
          );
          const stable = previous === current;
          previous = current;
          return stable;
        })
        .toBe(true);
      const article = await page.getByTestId("listing-detail").boundingBox();
      if (!article) throw new Error("AP-42 article missing");
      if (article.width < 896) throw new Error("AP-42 article under 896 on desktop-1280");
      const details = await page.getByTestId("listing-detail-specs").boundingBox();
      const sellerBox = await page
        .locator('section[data-testid="listing-detail-seller"]')
        .boundingBox();
      if (!details || !sellerBox) throw new Error("AP-42 boxes missing");
      if (ad.id === live.id) {
        // No description: Details and the seller card share the row in halves.
        expect(Math.abs(details.y - sellerBox.y)).toBeLessThanOrEqual(1);
        expect(Math.abs(details.width - (article.width - 16) / 2)).toBeLessThanOrEqual(2);
        expect(Math.abs(sellerBox.width - (article.width - 16) / 2)).toBeLessThanOrEqual(2);
      } else {
        // A sold ad: no safety box, so Location takes the whole row.
        const description = await page.locator("#ad-description").boundingBox();
        const location = await page.getByTestId("listing-detail-location").boundingBox();
        if (!description || !location) throw new Error("AP-42 sold boxes missing");
        await expect(page.getByTestId("listing-safety")).toHaveCount(0);
        for (const item of [details, description, sellerBox])
          expect(Math.abs(item.width - (article.width - 32) / 3)).toBeLessThanOrEqual(2);
        expect(Math.abs(location.width - article.width)).toBeLessThanOrEqual(1);
      }
    }
    // Turn 23: a live ad with a fact, a description and NO pin has no Location
    // box; the safety box takes the whole row under the seller card.
    const noPin = await seed(seller, "active", { attributes: { [key]: "scratch value" } });
    await gotoReady(page, (await address(noPin)).canonical);
    await expect(page.getByTestId("listing-detail-specs")).toBeVisible();
    await expect(page.getByTestId("listing-detail-location")).toHaveCount(0);
    const articleBox = await page.getByTestId("listing-detail").boundingBox();
    const sellerCard = await page
      .locator('section[data-testid="listing-detail-seller"]')
      .boundingBox();
    const safety = await page.getByTestId("listing-safety").boundingBox();
    if (!articleBox || !sellerCard || !safety) throw new Error("AP-42 no-pin boxes missing");
    expect(Math.abs(safety.width - articleBox.width)).toBeLessThanOrEqual(1);
    expect(safety.y).toBeGreaterThan(sellerCard.y);
  });

  test("AP-45 the tabs on a wide screen", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1280");
    // The ad of AP-36 without photos: a fact, an exact pin, the default one-sentence description.
    const seller = await scratchSeller();
    const key = `e2e-tabs-${token()}`;
    factKeys.push(key);
    const attributeId = await seedAttribute(key, "text");
    const linked = await adminClient()
      .from("category_attribute_links")
      .insert({ category_id: seller.leafId, attribute_id: attributeId, display_order: 1 });
    expect(linked.error).toBeNull();
    const ad = await seed(seller, "active", { attributes: { [key]: "scratch value" }, pin: true });
    const exact = await adminClient()
      .from("listings")
      .update({ pin_precision: "exact", pin_show_lat: 8.9876543, pin_show_lng: 38.7612345 })
      .eq("id", ad.id);
    expect(exact.error).toBeNull();
    await gotoReady(page, (await address(ad)).canonical);
    const bar = page.getByTestId("listing-section-nav");
    await expect(bar.getByTestId("listing-section-nav-item")).toHaveCount(4);
    const settle = async () => {
      let previous = "";
      await expect
        .poll(async () => {
          const current = JSON.stringify(
            await Promise.all([
              bar.boundingBox(),
              page.locator('section[data-testid="listing-detail-seller"]').boundingBox(),
            ]),
          );
          const stable = previous === current && current !== "null";
          previous = current;
          return stable;
        })
        .toBe(true);
    };
    const tap = async (target: string, card: string) => {
      await bar.locator(`[data-target="${target}"]`).click();
      await settle();
      await expect(bar.locator(`[data-target="${target}"]`)).toHaveAttribute(
        "aria-current",
        "true",
      );
      await expect(bar.locator('[data-target="details"]')).not.toHaveAttribute(
        "aria-current",
        "true",
      );
      const heading = await page.locator(card).getByRole("heading").boundingBox();
      const nav = await bar.boundingBox();
      if (!heading || !nav) throw new Error(`AP-45 ${target} boxes missing`);
      expect(heading.y).toBeGreaterThanOrEqual(nav.y + nav.height);
    };
    await tap("seller", 'section[data-testid="listing-detail-seller"]');
    await tap("description", "#ad-description");
    await tap("location", '[data-testid="listing-detail-location"]');
  });

  test("AP-46 Save and Share sit in the title box", async ({ page }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active");
    await seedPhotos(ad.id);
    await gotoReady(page, (await address(ad)).canonical);
    await expect(page.getByTestId("listing-save")).toBeVisible();
    const headline = page.getByTestId("listing-detail-headline");
    await expect(headline.getByTestId("listing-save")).toHaveCount(1);
    await expect(headline.getByTestId("listing-share-open")).toHaveCount(1);
    const media = page.getByTestId("listing-detail-media");
    await expect(media.getByTestId("listing-save")).toHaveCount(0);
    await expect(media.getByTestId("listing-share-open")).toHaveCount(0);
    await expect(page.getByTestId("listing-save")).toHaveText(en["adPage.save.add"]);
    await expect(page.getByTestId("listing-share-open")).toHaveText(en["adPage.share.open"]);
    let previous = "";
    await expect
      .poll(async () => {
        const current = JSON.stringify(
          await Promise.all([
            page.getByTestId("listing-detail-actions").boundingBox(),
            headline.boundingBox(),
            media.boundingBox(),
          ]),
        );
        const stable = previous === current;
        previous = current;
        return stable;
      })
      .toBe(true);
    const actions = await page.getByTestId("listing-detail-actions").boundingBox();
    const headlineBox = await headline.boundingBox();
    const mediaBox = await media.boundingBox();
    if (!actions || !headlineBox || !mediaBox) throw new Error("AP-46 boxes missing");
    expect(
      Math.abs(actions.y + actions.height - (headlineBox.y + headlineBox.height)),
    ).toBeLessThanOrEqual(24);
    const article = await page.getByTestId("listing-detail").boundingBox();
    if (!article) throw new Error("AP-46 article missing");
    if (article.width >= 672)
      expect(
        Math.abs(headlineBox.y + headlineBox.height - (mediaBox.y + mediaBox.height)),
      ).toBeLessThanOrEqual(1);
  });

  test("AP-47 the in-page bar shows no scrollbar (INC-717)", async ({ page }, testInfo) => {
    // AP-36's ad shape: a fact and an exact pin, so all four tabs show.
    const seller = await scratchSeller();
    const key = `e2e-scrollbar-${token()}`;
    factKeys.push(key);
    const attributeId = await seedAttribute(key, "text");
    const linked = await adminClient()
      .from("category_attribute_links")
      .insert({ category_id: seller.leafId, attribute_id: attributeId, display_order: 1 });
    expect(linked.error).toBeNull();
    const ad = await seed(seller, "active", { attributes: { [key]: "scratch value" }, pin: true });
    if (testInfo.project.name === "desktop-1280")
      await page.setViewportSize({ width: 600, height: 900 });
    await gotoReady(page, (await address(ad)).canonical);
    const bar = page.getByTestId("listing-section-nav");
    await expect(bar.getByTestId("listing-section-nav-item")).toHaveCount(4);
    const scrollbarWidth = await bar.evaluate((nav) => getComputedStyle(nav).scrollbarWidth);
    expect(scrollbarWidth).toBe("none");
    // At 360 the items share the row: nothing overflows.
    await page.setViewportSize({ width: 360, height: 900 });
    const nav = await bar.boundingBox();
    if (!nav) throw new Error("AP-47 nav missing");
    const overflow = await bar.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    const items = await bar.getByTestId("listing-section-nav-item").all();
    for (const item of items) {
      const box = await item.boundingBox();
      if (!box) throw new Error("AP-47 item missing");
      expect(box.x).toBeGreaterThanOrEqual(nav.x - 1);
      expect(box.x + box.width).toBeLessThanOrEqual(nav.x + nav.width + 1);
    }
  });
});
