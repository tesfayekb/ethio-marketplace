import { expect, test } from "./fixtures";

import { gotoReady } from "./helpers/ui";
import { destroyCountry } from "./helpers/countries";
import { seedSingleOptionMarket, waitForOpenMarket, waitForTreeSlug } from "./helpers/locations";

test("TMP debug cookie", async ({ page }) => {
  test.setTimeout(180_000);
  const first = await seedSingleOptionMarket();
  const second = await seedSingleOptionMarket();
  try {
    await waitForOpenMarket(page, first.code);
    await waitForOpenMarket(page, second.code);
    await waitForTreeSlug(page, first.code, first.region.slug);
    await waitForTreeSlug(page, second.code, second.region.slug);
    await gotoReady(page, "/");
    const nameOf = async (code: string) => {
      const body = (await (await page.request.get("/api/locations")).json()) as {
        countries: { code: string; name_en: string }[];
      };
      return body.countries.find((c) => c.code === code)!.name_en;
    };
    const open = async (name: string) => {
      await page.getByTestId("location-level-country").click();
      await page.getByRole("menuitem", { name, exact: true }).click();
    };
    await open(await nameOf(first.code));
    await page.waitForTimeout(2500);
    console.log("COOKIE1", await page.evaluate("document.cookie"), first.code);
    await open(await nameOf(second.code));
    await page.waitForTimeout(4000);
    console.log("COOKIE2", await page.evaluate("document.cookie"), second.code);
    expect(true).toBe(true);
  } finally {
    await destroyCountry(first.code);
    await destroyCountry(second.code);
  }
});
