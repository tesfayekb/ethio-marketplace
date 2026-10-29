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

/**
 * Foundations turn L-1, B5 — LF-E1 (INC-985): an Amharic reader's dates carry the month's full
 * name, never the short form (`dateStyle: "medium"` cut "ሴፕቴምበር" to "ሴፕቴ").
 *
 * The oracle is independent of src/lib/format.ts: the two Amharic names of September are written
 * here. The seller is a pool lease (J9) with a scratch branch, place and listing (J1), all
 * destroyed in afterEach, the account's language put back to the value read before (J3, INC-377); every row is found by id.
 */

const FULL = "ሴፕቴምበር";
const SHORT_ONLY = /ሴፕቴ(?!ምበር)/;
const FIRST_POSTED = "2026-09-15T12:00:00.000Z";

const sellers: { id: string; prior: string | null }[] = [];
const regions: string[] = [];
const branches: string[][] = [];

test.afterEach(async () => {
  // L-2 Part 0.2 (INC-377) — a leased account gets back exactly the value it had.
  for (const { id, prior } of sellers.splice(0)) {
    await destroyListingsOf(id);
    const { error } = await adminClient()
      .from("profiles")
      .update({ preferred_language: prior })
      .eq("user_id", id);
    if (error) throw new Error(`[e2e:lf] restoring preference: ${error.message}`);
  }
  for (const slug of regions.splice(0)) await destroyLocation(slug);
  for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
});

test("LF-E1 an Amharic account sees the full Amharic month on My listings", async ({ page }) => {
  const seller = await leaseSeller({ alias: true, named: true });
  const before = await adminClient()
    .from("profiles")
    .select("preferred_language")
    .eq("user_id", seller.id)
    .single();
  if (before.error) throw new Error(`[e2e:lf] reading preference: ${before.error.message}`);
  sellers.push({ id: seller.id, prior: before.data.preferred_language });
  const { parent, leaf } = await seedCategoryBranch();
  branches.push([parent.slug as string, leaf.slug as string]);
  const chain = await seedScratchChain("ET");
  regions.push(chain.region.slug as string);

  const language = await adminClient()
    .from("profiles")
    .update({ preferred_language: "am" })
    .eq("user_id", seller.id);
  if (language.error) throw new Error(`[e2e:lf] seeding preference: ${language.error.message}`);

  const { data, error } = await adminClient()
    .from("listings")
    .insert({
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
    })
    .select("id")
    .single();
  if (error || !data) throw new Error(`[e2e:lf] seeding failed: ${error?.message ?? "no row"}`);
  const id = data.id as string;
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
