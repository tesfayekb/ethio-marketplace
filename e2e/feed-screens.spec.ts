import type { Page } from "@playwright/test";

import { expect, test } from "./fixtures";
import { en } from "../src/i18n/locales/en";
import { adminClient } from "./helpers/users";
import {
  anchorOf,
  destroyLocation,
  scratchSlug,
  seedScratchChain,
  waitForTreeSlug,
} from "./helpers/locations";
import {
  destroyCategoryBranch,
  destroyListingsOf,
  leaseSeller,
  rand,
  RUN,
  scratchCategorySlug,
  seedCategoryBranch,
} from "./helpers/posting";
import { gotoReady } from "./helpers/ui";

/**
 * Bundle 10 E3b — THE LISTINGS PAGES (FS-1..FS-6): the home and category pages
 * read /api/feed a page at a time, in D108's order, widening beyond the chosen
 * place with the wider place named. Scratch rows only; cleanup in afterEach (J3).
 */

type Tier = "premium" | "featured" | "regular";

test.describe("FEED SCREENS", () => {
  const sellers: string[] = [];
  const regions: string[] = [];
  const branches: string[][] = [];

  test.afterEach(async () => {
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const slug of regions.splice(0)) await destroyLocation(slug);
    for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
  });

  async function seller() {
    const user = await leaseSeller();
    sellers.push(user.id);
    return user;
  }

  async function branch() {
    const { parent, leaf } = await seedCategoryBranch();
    const slugs = [parent.slug, leaf.slug];
    branches.push(slugs);
    return { parent, leaf, slugs };
  }

  async function chain() {
    const c = await seedScratchChain("ET");
    regions.push(c.region.slug);
    return c;
  }

  async function addLeaf(parentId: string, slugs: string[]) {
    const slug = scratchCategorySlug();
    const supabase = adminClient();
    const { data, error } = await supabase
      .from("categories")
      .insert({
        slug,
        name_en: slug,
        is_active: true,
        allow_listings: true,
        is_catchall: false,
        display_order: 9102,
      })
      .select("id, slug")
      .single();
    if (error || !data) throw new Error(`[e2e:fs] seeding a leaf failed: ${error?.message}`);
    slugs.push(data.slug as string);
    const { error: pointerError } = await supabase
      .from("category_tree_pointers")
      .insert({ parent_id: parentId, child_id: data.id, display_order: 2 });
    if (pointerError) throw new Error(`[e2e:fs] linking a leaf failed: ${pointerError.message}`);
    return { id: data.id as string, slug: data.slug as string };
  }

  function row(categoryId: string, sellerId: string, placeId: string, tier: Tier, ago: number) {
    return {
      category_id: categoryId,
      seller_id: sellerId,
      location_id: placeId,
      home_country_code: "ET",
      title: `e2e-feed-${RUN}-${rand()}`,
      description: "e2e scratch listing for the feed screens",
      status: "active",
      tier,
      published_at: new Date(Date.now() - ago * 60_000).toISOString(),
    };
  }

  async function addListing(
    categoryId: string,
    sellerId: string,
    placeId: string,
    tier: Tier,
    minutesAgo: number,
  ): Promise<string> {
    const { data, error } = await adminClient()
      .from("listings")
      .insert(row(categoryId, sellerId, placeId, tier, minutesAgo))
      .select("id")
      .single();
    if (error || !data) throw new Error(`[e2e:fs] seeding a listing failed: ${error?.message}`);
    return data.id as string;
  }

  async function cardIds(page: Page): Promise<string[]> {
    return page
      .locator('[data-testid="listing-card"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("data-listing") ?? ""));
  }

  function watchFeed(page: Page): string[] {
    const calls: string[] = [];
    page.on("request", (request) => {
      if (new URL(request.url()).pathname === "/api/feed") calls.push(request.url());
    });
    return calls;
  }

  test("FS-1 a subcategory shows its own listings; its parent shows the whole branch", async ({
    page,
  }) => {
    const user = await seller();
    const { parent, leaf: l1, slugs } = await branch();
    const l2 = await addLeaf(parent.id, slugs);
    const c = await chain();
    const a = await addListing(l1.id, user.id, c.city.id, "regular", 5);
    const b = await addListing(l2.id, user.id, c.city.id, "regular", 10);

    await gotoReady(page, `/c/${l1.slug}`);
    await expect.poll(() => cardIds(page)).toEqual([a]);
    await expect(page.getByTestId("breadcrumb-category-parent")).toHaveText(parent.slug);
    await expect(page.getByTestId("breadcrumb-category")).toHaveText(l1.slug);

    await page.getByTestId("breadcrumb-category-parent").click();
    await expect(page).toHaveURL(new RegExp(`/c/${parent.slug}$`));
    await expect.poll(() => cardIds(page)).toEqual([a, b]);

    await gotoReady(page, `/c/${l2.slug}`);
    await expect.poll(() => cardIds(page)).toEqual([b]);
  });

  test("FS-2 20 per page in D108's order; the next page loads only when the end comes into view", async ({
    page,
  }) => {
    const user = await seller();
    const { leaf } = await branch();
    const c = await chain();
    const tiers: Tier[] = Array.from({ length: 25 }, (_, i) =>
      i < 2 ? "premium" : i < 5 ? "featured" : "regular",
    );
    const { data, error } = await adminClient()
      .from("listings")
      .insert(tiers.map((tier, i) => row(leaf.id, user.id, c.city.id, tier, i + 1)))
      .select("id, title");
    if (error || !data) throw new Error(`[e2e:fs] seeding 25 listings failed: ${error?.message}`);
    // Inserted in the expected order already: tier first, then newest.
    const expected = tiers.map((_, i) => {
      const wanted = row(leaf.id, user.id, c.city.id, tiers[i]!, i + 1);
      void wanted;
      return data[i]!.id as string;
    });

    const calls = watchFeed(page);
    await gotoReady(page, `/c/${leaf.slug}`);
    await expect.poll(() => cardIds(page)).toEqual(expected.slice(0, 20));
    expect(calls.filter((u) => new URL(u).searchParams.has("after"))).toEqual([]);

    await page.getByTestId("feed-more").scrollIntoViewIfNeeded();
    await expect.poll(() => cardIds(page)).toEqual(expected);
    await expect(page.getByTestId("feed-more")).toHaveCount(0);
    expect(calls.filter((u) => new URL(u).searchParams.has("after"))).toHaveLength(1);
  });

  async function areaFixture(page: Page) {
    const user = await seller();
    const { leaf } = await branch();
    const a = await chain();
    const subSlug = scratchSlug("fs-sub");
    const { error } = await adminClient().from("locations").insert({
      parent_id: a.city.id,
      level: "sub_city",
      country_code: "ET",
      slug: subSlug,
      name_en: subSlug,
      is_active: true,
      source: "admin",
      center_lat: 9.03,
      center_lng: 38.74,
    });
    if (error) throw new Error(`[e2e:fs] seeding the second sub-city failed: ${error.message}`);
    const b = await chain();
    const country = (await anchorOf("ET")).name_en as string;
    return { user, leaf, a, b, subSlug, country };
  }

  async function openArea(page: Page, fx: Awaited<ReturnType<typeof areaFixture>>, base: string) {
    await waitForTreeSlug(page, "ET", fx.subSlug);
    await page.context().addCookies([{ name: "ethio_area", value: `ET:${fx.a.city.id}`, url: base }]);
    await gotoReady(page, `/c/${fx.leaf.slug}`);
  }

  function sectionIds(page: Page, step: number) {
    return page
      .locator(`[data-testid="feed-section"][data-step="${step}"] [data-testid="listing-card"]`)
      .evaluateAll((els) => els.map((el) => el.getAttribute("data-listing") ?? ""));
  }

  test("FS-3 the page reaches beyond the chosen place and names the wider place", async ({
    page,
    baseURL,
  }) => {
    const fx = await areaFixture(page);
    const a1 = await addListing(fx.leaf.id, fx.user.id, fx.a.city.id, "regular", 1);
    const a2 = await addListing(fx.leaf.id, fx.user.id, fx.a.city.id, "regular", 2);
    const b3 = await addListing(fx.leaf.id, fx.user.id, fx.b.city.id, "regular", 3);
    const b4 = await addListing(fx.leaf.id, fx.user.id, fx.b.city.id, "regular", 4);
    const b5 = await addListing(fx.leaf.id, fx.user.id, fx.b.city.id, "regular", 5);
    await openArea(page, fx, baseURL!);

    await expect(page.locator("main h1")).toHaveText(
      en["feed.heading"].replace("{location}", fx.a.city.name_en as string),
    );
    await expect.poll(() => sectionIds(page, 1)).toEqual([a1, a2]);
    await expect(
      page.locator('[data-testid="feed-section"][data-step="1"] [data-testid="feed-step-label"]'),
    ).toHaveCount(0);
    await expect(page.getByTestId("feed-step-label")).toHaveCount(1);
    await expect(
      page.locator('[data-testid="feed-section"][data-step="3"] [data-testid="feed-step-label"]'),
    ).toHaveText(en["feed.heading"].replace("{location}", fx.country));
    await expect.poll(() => sectionIds(page, 3)).toEqual([b3, b4, b5]);
    await expect(page.getByTestId("feed-step-none")).toHaveCount(0);
  });

  test("FS-4 nothing in the chosen place: the note, then the wider place", async ({
    page,
    baseURL,
  }) => {
    const fx = await areaFixture(page);
    const b3 = await addListing(fx.leaf.id, fx.user.id, fx.b.city.id, "regular", 3);
    const b4 = await addListing(fx.leaf.id, fx.user.id, fx.b.city.id, "regular", 4);
    const b5 = await addListing(fx.leaf.id, fx.user.id, fx.b.city.id, "regular", 5);
    await openArea(page, fx, baseURL!);

    await expect(page.getByTestId("feed-step-none")).toHaveText(en["feed.emptyTitle"]);
    await expect.poll(() => sectionIds(page, 3)).toEqual([b3, b4, b5]);
    await expect(page.locator('[data-testid="feed-section"][data-step="1"]')).toHaveCount(0);
    await expect(
      page.locator('[data-testid="feed-section"][data-step="3"] [data-testid="feed-step-label"]'),
    ).toHaveText(en["feed.heading"].replace("{location}", fx.country));
  });

  test("FS-5 an address nobody has shows not found and asks the feed nothing", async ({
    page,
  }) => {
    const calls = watchFeed(page);
    await gotoReady(page, `/c/e2e-none-${rand()}`);
    const unknown = page.getByTestId("feed-category-unknown");
    await expect(unknown).toBeVisible();
    await expect(unknown).toContainText(en["error.pageNotFound"]);
    await expect(unknown).toContainText(en["error.pageNotFoundBody"]);
    await expect(page.getByTestId("feed-empty")).toHaveCount(0);
    expect(calls).toEqual([]);
  });

  test("FS-6 a failed read is shown, and Retry recovers", async ({ page }) => {
    const user = await seller();
    const { leaf } = await branch();
    const c = await chain();
    const id = await addListing(leaf.id, user.id, c.city.id, "regular", 1);
    let n = 0;
    await page.route("**/api/feed*", async (route) => {
      n += 1;
      if (n === 1) {
        await route.fulfill({
          status: 502,
          contentType: "application/json",
          body: '{"error":"internal error"}',
        });
      } else if (n === 2) {
        await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
      } else {
        await route.continue();
      }
    });

    await gotoReady(page, `/c/${leaf.slug}`);
    await expect(page.getByTestId("feed-error")).toBeVisible();
    await expect(page.getByTestId("feed-error")).toContainText(en["feed.errorTitle"]);
    await page.getByTestId("feed-retry").click();
    await expect(page.getByTestId("feed-error")).toBeVisible();
    await page.getByTestId("feed-retry").click();
    await expect(page.locator(`[data-testid="listing-card"][data-listing="${id}"]`)).toBeVisible();
    await expect(page.getByTestId("feed-error")).toHaveCount(0);
  });
});
