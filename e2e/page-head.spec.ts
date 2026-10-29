import { expect, test } from "./fixtures";
import { adPageFixtures } from "./helpers/ad-page";
import { listingPath } from "../src/features/ad-page/address";
import { signInAsSuperAdmin } from "./helpers/categories";
import { adminClient } from "./helpers/users";
import { gotoReady, switchLanguage } from "./helpers/ui";
import en from "../src/i18n/locales/en";
import am from "../src/i18n/locales/am";

const fixtures = adPageFixtures();
const preferences: { id: string; prior: string | null }[] = [];
test.afterEach(async () => {
  try {
    for (const { id, prior } of preferences.splice(0)) {
      const { error } = await adminClient()
        .from("profiles")
        .update({ preferred_language: prior })
        .eq("user_id", id);
      if (error) throw new Error(`[e2e:pgh] restoring preference: ${error.message}`);
    }
  } finally {
    await fixtures.cleanup();
  }
});

/** Server encodes text, not a different title. Decode using the browser's HTML parser. */
async function rawTitle(page: import("@playwright/test").Page, url: string) {
  const response = await page.request.get(url);
  expect(response.status()).toBe(200);
  const html = await response.text();
  return page.evaluate(
    (source) => new DOMParser().parseFromString(source, "text/html").title,
    html,
  );
}
async function headText(page: import("@playwright/test").Page, title: string, description: string) {
  await expect(page).toHaveTitle(title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", description);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    description,
  );
}

test("PGH-E1 base server heads, applied Amharic and client navigation agree", async ({ page }) => {
  const seller = await fixtures.scratchSeller();
  const ad = await fixtures.seed(seller);
  const canonical = listingPath(ad.title, await fixtures.publicIdOf(ad.id));
  await gotoReady(page, "/");
  expect(await rawTitle(page, "/")).toBe(en["head.home.title"]);
  await headText(page, en["head.home.title"], en["head.home.description"]);
  await switchLanguage(page, "am");
  await headText(page, am["head.home.title"], am["head.home.description"]);
  // The pick uses the approved switchLanguage seam, which writes the star cookie too.
  await gotoReady(page, "/");
  await expect(page.locator("html")).toHaveAttribute("lang", "am");
  await headText(page, am["head.home.title"], am["head.home.description"]);
  expect(await rawTitle(page, canonical)).toBe(`${ad.title} — ethio.com`);
  await gotoReady(page, canonical);
  await expect(page.getByTestId("ad-page")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "am");
  await headText(page, `${ad.title} — ethio.com`, ad.description.slice(0, 160));
  // A real client navigation: the brand link commits another page's head, no hard reload.
  await page.locator('a[href="/"]').filter({ visible: true }).first().click();
  await headText(page, am["head.home.title"], am["head.home.description"]);

  const staff = await signInAsSuperAdmin(page);
  const before = await adminClient()
    .from("profiles")
    .select("preferred_language")
    .eq("user_id", staff.id)
    .single();
  if (before.error) throw new Error(`[e2e:pgh] reading preference: ${before.error.message}`);
  preferences.push({ id: staff.id, prior: before.data.preferred_language });
  await switchLanguage(page, "am");
  const title = am["head.admin.pattern.title"].replace("{name}", am["admin.section.ai.title"]);
  const description = am["head.admin.pattern.description"].replace(
    "{name}",
    am["admin.section.ai.title"],
  );
  expect(await rawTitle(page, "/admin/ai")).toBe("AI — ethio.com Admin");
  await gotoReady(page, "/admin/ai");
  await expect(page.getByTestId("admin-panel-root")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "am");
  await headText(page, title, description);
  await page.locator('a[href="/"]').filter({ visible: true }).first().click();
  await headText(page, am["head.home.title"], am["head.home.description"]);
});

test("PGH-E2 picks re-title without changing the URL or calling route server functions", async ({
  page,
}) => {
  const scripts: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "script") scripts.push(request.url());
  });
  await gotoReady(page, "/");
  await headText(page, en["head.home.title"], en["head.home.description"]);
  expect(scripts.some((url) => /page-head-client/.test(url))).toBe(false);
  const url = page.url();
  const requests: string[] = [];
  page.on("request", (request) => {
    if (/\/_server\/|\/api\//.test(request.url())) requests.push(request.url());
  });
  await switchLanguage(page, "am");
  await headText(page, am["head.home.title"], am["head.home.description"]);
  expect(page.url()).toBe(url);
  expect(requests).toEqual([]);
  expect(scripts.some((url) => /page-head-client/.test(url))).toBe(true);
  await switchLanguage(page, "en");
  await headText(page, en["head.home.title"], en["head.home.description"]);
  expect(page.url()).toBe(url);
  expect(requests).toEqual([]);
});
