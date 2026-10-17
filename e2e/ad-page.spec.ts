import { expect, test } from "./fixtures";
import { adPageFixtures } from "./helpers/ad-page";
import { signInViaSession, gotoReady, switchLanguage } from "./helpers/ui";
import { listingPath, shortListingPath } from "../src/features/ad-page/address";
import en from "../src/i18n/locales/en";
import am from "../src/i18n/locales/am";

/** Scratch ads only; the maker's afterEach also reaps photos on a timed-out test. */
test.describe("AD PAGE — the buyer's page (bundle 19 turn 5)", () => {
  const { scratchSeller, seed, publicIdOf, seedPhotos, cleanup } = adPageFixtures();
  test.afterEach(cleanup);

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
    const channels = page.getByTestId("listing-detail-channel");
    await expect(channels).toHaveCount(2);
    await expect(channels.filter({ hasText: en["post.who.channel.messages"] })).toBeVisible();
    await expect(channels.filter({ hasText: en["post.who.channel.phone"] })).toBeVisible();
    await expect(page.locator("body")).not.toContainText("251911000001");
    expect(html).not.toContain("251911000001");
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
  });

  test("AP-13 Amharic", async ({ page }) => {
    const seller = await scratchSeller();
    const live = await seed(seller);
    const draft = await seed(seller, "draft");
    await page.goto((await address(live)).canonical);
    await expect(page.getByTestId("ad-page")).toBeVisible();
    await switchLanguage(page, "am");
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
});
