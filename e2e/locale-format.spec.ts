import { expect, test } from "./fixtures";
import { destroyLocation, seedScratchChain } from "./helpers/locations";
import {
  destroyCategoryBranch,
  destroyListingsOf,
  leaseSeller,
  RUN,
  seedCategoryBranch,
} from "./helpers/posting";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import { seedListingRow } from "./helpers/listing-seed";
import { restoreAccountLanguages, seedAccountLanguage } from "./helpers/account-language";

/**
 * Foundations turn L-1, B5 — LF-E1 (INC-985): an Amharic reader's dates carry the month's full
 * name, never the short form (`dateStyle: "medium"` cut "ሴፕቴምበር" to "ሴፕቴ").
 *
 * The oracle is independent of src/lib/format.ts: the two Amharic names of September are written
 * here. The seller is a pool lease (J9) with a scratch branch, place and listing (J1), all
 * destroyed in afterEach, the account's language put back to the pool's baseline, NULL (J3,
 * D324 (c)); every row is found by id.
 */

const FULL = "ሴፕቴምበር";
const SHORT_ONLY = /ሴፕቴ(?!ምበር)/;
const FIRST_POSTED = "2026-09-15T12:00:00.000Z";

const sellers: string[] = [];
const regions: string[] = [];
const branches: string[][] = [];

test.afterEach(async () => {
  for (const id of sellers.splice(0)) await destroyListingsOf(id);
  await restoreAccountLanguages();
  for (const slug of regions.splice(0)) await destroyLocation(slug);
  for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
});

test("LF-E1 an Amharic account sees the full Amharic month on My listings", async ({ page }) => {
  const seller = await leaseSeller({ alias: true, named: true });
  sellers.push(seller.id);
  const { parent, leaf } = await seedCategoryBranch();
  branches.push([parent.slug as string, leaf.slug as string]);
  const chain = await seedScratchChain("ET");
  regions.push(chain.region.slug as string);

  await seedAccountLanguage(seller.id, "am");

  // D318 — the one seeder (listing-seed.ts): the seller's free slots are read first.
  const data = await seedListingRow(
    {
      category_id: leaf.id as string,
      seller_id: seller.id,
      location_id: chain.city.id as string,
      home_country_code: "ET",
      title: `E2E locale format ${RUN.replace(/[0-9]/g, "x")}`,
      description: "e2e scratch listing for the locale format check",
      attributes: {},
      price_mode: "fixed",
      price_amount: 100,
      price_currency: "ETB",
      price_period: "once",
      price_set_at: FIRST_POSTED,
      contact_pref: { messages: true },
      status: "active",
      tier: "regular",
      published_at: FIRST_POSTED,
      published_first_at: FIRST_POSTED,
      expires_at: new Date(Date.now() + 10 * 86_400_000).toISOString(),
    },
    { tag: "lf" },
  );
  const id = data.id;
  const located = await adminClient()
    .from("listing_locations")
    .insert({ listing_id: id, location_id: chain.city.id as string, position: 1 });
  if (located.error) throw new Error(`[e2e:lf] coverage failed: ${located.error.message}`);

  await signInViaSession(page, seller.email, seller.password);
  await gotoReady(page, `/my-listings/${id}`);
  await expect(page.locator("html")).toHaveAttribute("lang", "am");
  const posted = page.getByTestId("my-listing-first-posted");
  await expect(posted).toContainText(FULL);
  expect(SHORT_ONLY.test(await posted.innerText())).toBe(false);
});
