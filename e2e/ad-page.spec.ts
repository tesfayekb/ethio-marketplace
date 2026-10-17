import { expect, test } from "./fixtures";
import { seedAttribute, destroyAttribute } from "./helpers/admin-attributes";
import { adminClient, leaseUser } from "./helpers/users";
import { fill } from "../src/features/posting/refusal-text";
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
    await expect(count).toHaveText(fill(en["feed.views"], { count: 2 }));
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
      await chips.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-key"))),
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
      await chips.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-key"))),
    ).toEqual([selectKey, numberKey]);
    const card = await supabase
      .from("category_attribute_links")
      .update({ card_rank: 1 })
      .eq("category_id", seller.leafId)
      .eq("attribute_id", selectId);
    if (card.error) throw new Error(`AP-18 card: ${card.error.message}`);
    await page.reload();
    await expect(chips).toHaveCount(1);
    await expect(chips).toHaveAttribute("data-key", numberKey);
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
});
