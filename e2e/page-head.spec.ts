import { expect, test } from "./fixtures";
import { en } from "../src/i18n/locales/en";
import { am } from "../src/i18n/locales/am";
import { adPageFixtures } from "./helpers/ad-page";
import { listingPath } from "../src/features/ad-page/address";
import { signInAsSuperAdmin } from "./helpers/categories";
import { gotoReady, switchLanguage } from "./helpers/ui";

test.describe("PAGE HEAD — base first, then the applied reader catalogue", () => {
  const fixtures = adPageFixtures();
  test.afterEach(async () => {
    await fixtures.cleanup();
  });

  test("PGH-E1 raw HTML is base-first; hydration and navigation keep the applied catalogue", async ({
    page,
  }) => {
    const seller = await fixtures.scratchSeller();
    const ad = await fixtures.seed(seller);
    const path = listingPath(ad.title, await fixtures.publicIdOf(ad.id));
    await signInAsSuperAdmin(page); // J9: the job's pooled admin, never a real account.
    await page
      .context()
      .addCookies([{ name: "ethio_lang_star", value: "am", url: new URL(page.url()).origin }]);
    await page.evaluate(() => {
      window.localStorage.setItem("ethio.lang.star", "am");
      window.localStorage.setItem("ethio.lang", "am");
    });
    for (const [url, baseTitle, readerTitle, marker] of [
      ["/", en["head.home.title"], am["head.home.title"], "feed-container"],
      [path, `${ad.title} — ethio.com`, `${ad.title} — ethio.com`, "ad-page"],
      [
        "/admin",
        "Overview — ethio.com Admin",
        `${am["nav.overview"]} — ethio.com አስተዳደር`,
        "admin-landing",
      ],
    ]) {
      const response = await page.request.get(url);
      expect(response.status()).toBe(200);
      const html = await response.text();
      expect(html).toContain(`<title>${baseTitle}</title>`);
      expect(html).toMatch(/<html[^>]*lang="en"/);
      await gotoReady(page, url);
      await expect(page.getByTestId(marker)).toBeVisible();
      await expect(page.locator("html")).toHaveAttribute("lang", "am");
      await expect(page).toHaveTitle(readerTitle);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        "content",
        readerTitle,
      );
    }
    // Use the router's existing link, not a new document navigation.
    await page.getByTestId("language-switcher").click();
    await page.keyboard.press("Escape");
    const home = page.locator('a[href="/"]').filter({ visible: true });
    await home.nth(0).click();
    await expect(page.getByTestId("feed-container")).toBeVisible();
    await expect(page).toHaveTitle(am["head.home.title"]);
    await expect(page.locator("html")).toHaveAttribute("lang", "am");
  });

  test("PGH-E2 a language pick changes all four head texts without a route server-function request", async ({
    page,
  }) => {
    await gotoReady(page, "/?lang=en");
    await expect(page.getByTestId("feed-container")).toBeVisible();
    await expect(page).toHaveTitle(en["head.home.title"]);
    const url = page.url();
    const requests: string[] = [];
    page.on("request", (request) => {
      if (new URL(request.url()).pathname.includes("_serverFn")) requests.push(request.url());
    });
    await switchLanguage(page, "am");
    await expect(page).toHaveTitle(am["head.home.title"]);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      am["head.home.description"],
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      am["head.home.title"],
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      "content",
      am["head.home.description"],
    );
    expect(page.url()).toBe(url);
    expect(requests).toEqual([]);
  });
});
