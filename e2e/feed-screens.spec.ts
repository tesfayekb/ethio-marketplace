import type { Locator, Page } from "@playwright/test";

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
import { gotoReady, signInViaSession, signOutViaUi } from "./helpers/ui";

/**
 * Bundle 10 E3b — THE LISTINGS PAGES (FS-1..FS-6): the home and category pages
 * read /api/feed a page at a time, in D108's order, widening beyond the chosen
 * place with the wider place named. Scratch rows only; cleanup in afterEach (J3).
 * FS-8..FS-10 and the additions to FS-3/FS-4 — D119, the invite card. FS-11 —
 * INC-532, the place kept across a sign-out. FS-12 — D123, three a row on a phone.
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

  async function branch(options: { parentImageUrl?: string } = {}) {
    const { parent, leaf } = await seedCategoryBranch(options);
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
    // Built in the expected order: tier first (premium, featured, regular), then newest.
    const rows = tiers.map((tier, i) => row(leaf.id, user.id, c.city.id, tier, i + 1));
    const { data, error } = await adminClient().from("listings").insert(rows).select("id, title");
    if (error || !data) throw new Error(`[e2e:fs] seeding 25 listings failed: ${error?.message}`);
    const idOf = new Map(data.map((r) => [r.title as string, r.id as string]));
    const expected = rows.map((r) => idOf.get(r.title) ?? "");

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
    await page
      .context()
      .addCookies([{ name: "ethio_area", value: `ET:${fx.a.city.id}`, url: base }]);
    await gotoReady(page, `/c/${fx.leaf.slug}`);
  }

  function sectionIds(page: Page, step: number) {
    return page
      .locator(`[data-testid="feed-section"][data-step="${step}"] [data-testid="listing-card"]`)
      .evaluateAll((els) => els.map((el) => el.getAttribute("data-listing") ?? ""));
  }

  /** D119 — the chosen place's invitation (section 1 only). */
  function inviteOf(page: Page) {
    return page.locator('[data-testid="feed-section"][data-step="1"] [data-testid="feed-invite"]');
  }

  /** D119 — what a section's row holds, in order: listing cards and the invitation. */
  function rowOrder(page: Page, step: number) {
    return page
      .locator(`[data-testid="feed-section"][data-step="${step}"] ul > li > *`)
      .evaluateAll((els) => els.map((el) => el.getAttribute("data-testid") ?? ""));
  }

  /** D119 — the invitation's address: /post, and its search parameters. */
  async function inviteSearch(link: Locator) {
    const href = await link.getAttribute("href");
    expect(href, "the invitation has no address").not.toBeNull();
    const url = new URL(href!, "http://local.test");
    expect(url.pathname).toBe("/post");
    return url.searchParams;
  }

  test("FS-3 the page reaches beyond the chosen place, names the wider place, and invites in the chosen one", async ({
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
    // D119 — the chosen place's row ends with its invitation; the wider row has none.
    await expect
      .poll(() => rowOrder(page, 1))
      .toEqual(["listing-card", "listing-card", "feed-invite"]);
    await expect(inviteOf(page).getByTestId("feed-invite-text")).toHaveText(
      // The place has ads, so not "Be the first" (the operator, 2026-10-10).
      en["feed.invite.placeCategoryToo"]
        .replace("{category}", fx.leaf.slug)
        .replace("{place}", fx.a.city.name_en as string),
    );
    const params = await inviteSearch(inviteOf(page).getByTestId("feed-invite-post"));
    expect(params.get("category")).toBe(fx.leaf.id);
    expect(params.get("place")).toBe(fx.a.city.id);
    await expect(
      page.locator('[data-testid="feed-section"][data-step="3"] [data-testid="feed-invite"]'),
    ).toHaveCount(0);
    await expect(page.getByTestId("feed-step-none")).toHaveCount(0);
  });

  test("FS-4 nothing in the chosen place: the invitation first, then the wider place", async ({
    page,
    baseURL,
  }) => {
    const fx = await areaFixture(page);
    const b3 = await addListing(fx.leaf.id, fx.user.id, fx.b.city.id, "regular", 3);
    const b4 = await addListing(fx.leaf.id, fx.user.id, fx.b.city.id, "regular", 4);
    const b5 = await addListing(fx.leaf.id, fx.user.id, fx.b.city.id, "regular", 5);
    await openArea(page, fx, baseURL!);

    await expect.poll(() => sectionIds(page, 3)).toEqual([b3, b4, b5]);
    // D119 — the invitation leads, alone in the chosen place's row, and replaces the note.
    await expect.poll(() => rowOrder(page, 1)).toEqual(["feed-invite"]);
    expect(
      await page
        .locator('[data-testid="feed-section"]')
        .evaluateAll((els) => els.map((el) => el.getAttribute("data-step"))),
    ).toEqual(["1", "3"]);
    await expect(page.getByTestId("feed-step-none")).toHaveCount(0);
    await expect(
      page.locator('[data-testid="feed-section"][data-step="3"] [data-testid="feed-step-label"]'),
    ).toHaveText(en["feed.heading"].replace("{location}", fx.country));
  });

  test("FS-5 an address nobody has shows not found and asks the feed nothing", async ({ page }) => {
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
    await expect.poll(() => n).toBe(2);
    await expect(page.getByTestId("feed-error")).toBeVisible();
    await page.getByTestId("feed-retry").click();
    await expect(page.locator(`[data-testid="listing-card"][data-listing="${id}"]`)).toBeVisible();
    await expect(page.getByTestId("feed-error")).toHaveCount(0);
  });

  test("FS-7 a card without a photo draws the nearest category picture, else the placeholder", async ({
    page,
  }) => {
    const picture = "https://example.invalid/e2e-feed-picture.jpg";
    const user = await seller();
    const pictured = await branch({ parentImageUrl: picture });
    const bare = await branch();
    const c = await chain();
    const a = await addListing(pictured.leaf.id, user.id, c.city.id, "regular", 1);
    const b = await addListing(bare.leaf.id, user.id, c.city.id, "regular", 2);

    await gotoReady(page, `/c/${pictured.leaf.slug}`);
    const boxA = page.locator(
      `[data-testid="listing-card"][data-listing="${a}"] [data-testid="listing-card-picture"]`,
    );
    await expect(boxA, "FS-7: the leaf's card did not draw its folder's picture").toHaveAttribute(
      "data-picture",
      "category",
      { timeout: 20_000 },
    );
    await expect(boxA.locator("img")).toHaveAttribute("src", picture);

    await gotoReady(page, `/c/${bare.leaf.slug}`);
    const boxB = page.locator(
      `[data-testid="listing-card"][data-listing="${b}"] [data-testid="listing-card-picture"]`,
    );
    await expect(boxB).toBeVisible({ timeout: 20_000 });
    await expect(boxB).toHaveAttribute("data-picture", "none");
    await expect(boxB.locator("img")).toHaveCount(0);
  });

  test("FS-8 the home page invites in the chosen place, naming the place alone", async ({
    page,
    baseURL,
  }) => {
    const fx = await areaFixture(page);
    const a1 = await addListing(fx.leaf.id, fx.user.id, fx.a.city.id, "regular", 1);
    const a2 = await addListing(fx.leaf.id, fx.user.id, fx.a.city.id, "regular", 2);
    await waitForTreeSlug(page, "ET", fx.subSlug);
    await page
      .context()
      .addCookies([{ name: "ethio_area", value: `ET:${fx.a.city.id}`, url: baseURL! }]);
    await gotoReady(page, "/");

    await expect.poll(() => sectionIds(page, 1)).toEqual([a1, a2]);
    await expect
      .poll(() => rowOrder(page, 1))
      .toEqual(["listing-card", "listing-card", "feed-invite"]);
    await expect(inviteOf(page).getByTestId("feed-invite-text")).toHaveText(
      en["feed.invite.placeToo"].replace("{place}", fx.a.city.name_en as string),
    );
    const params = await inviteSearch(inviteOf(page).getByTestId("feed-invite-post"));
    expect(params.get("place")).toBe(fx.a.city.id);
    expect(params.has("category")).toBe(false);
  });

  test("FS-9 four listings in the chosen place: no invitation", async ({ page, baseURL }) => {
    const fx = await areaFixture(page);
    for (const minutes of [1, 2, 3, 4])
      await addListing(fx.leaf.id, fx.user.id, fx.a.city.id, "regular", minutes);
    await openArea(page, fx, baseURL!);

    await expect.poll(() => sectionIds(page, 1)).toHaveLength(4);
    await expect(page.getByTestId("feed-invite")).toHaveCount(0);
    await expect(page.getByTestId("feed-invite-post")).toHaveCount(0);
  });

  test("FS-10 nothing anywhere: the invitation card comes first, with the category and the place", async ({
    page,
    baseURL,
  }) => {
    const fx = await areaFixture(page);
    await openArea(page, fx, baseURL!);

    // The operator's walk, 2026-10-09: the gold card, never the old empty box.
    await expect.poll(() => rowOrder(page, 1), { timeout: 20_000 }).toEqual(["feed-invite"]);
    await expect(inviteOf(page).getByTestId("feed-invite-text")).toHaveText(
      en["feed.invite.placeCategory"]
        .replace("{category}", fx.leaf.slug)
        .replace("{place}", fx.a.city.name_en as string),
    );
    const params = await inviteSearch(inviteOf(page).getByTestId("feed-invite-post"));
    expect(params.get("category")).toBe(fx.leaf.id);
    expect(params.get("place")).toBe(fx.a.city.id);
    await expect(page.getByTestId("feed-empty")).toHaveCount(0);
  });

  /**
   * FS-11 — INC-532 (the operator's walk, 2026-10-10): signing out keeps the
   * place this browser chose. The saved area is the visitor's own, so the same
   * browser shows the same place signed in and signed out — with no reload.
   */
  test("FS-11 signing out keeps the place this browser chose (INC-532)", async ({
    page,
    baseURL,
  }) => {
    const fx = await areaFixture(page);
    await waitForTreeSlug(page, "ET", fx.subSlug);
    await page
      .context()
      .addCookies([{ name: "ethio_area", value: `ET:${fx.a.city.id}`, url: baseURL! }]);
    await signInViaSession(page, fx.user.email, fx.user.password);
    const heading = en["feed.heading"].replace("{location}", fx.a.city.name_en as string);
    await expect(page.locator("main h1")).toHaveText(heading, { timeout: 20_000 });

    await signOutViaUi(page);
    await expect(
      page.locator("main h1"),
      "INC-532: the sign-out dropped the chosen place",
    ).toHaveText(heading, { timeout: 20_000 });
  });

  /**
   * FS-12 — D123 (the operator, 2026-10-10): on a phone three cards share a row,
   * and the invitation is one of them, the size of a card.
   */
  test("FS-12 on a phone three cards share a row and the invitation is the size of a card (D123)", async ({
    page,
    baseURL,
  }) => {
    test.skip((page.viewportSize()?.width ?? 0) >= 640, "phones only");
    const fx = await areaFixture(page);
    const a1 = await addListing(fx.leaf.id, fx.user.id, fx.a.city.id, "regular", 1);
    await openArea(page, fx, baseURL!);

    await expect.poll(() => sectionIds(page, 1)).toEqual([a1]);
    const row = await page.locator('[data-testid="feed-section"][data-step="1"] ul').boundingBox();
    const card = await page
      .locator(`[data-testid="listing-card"][data-listing="${a1}"]`)
      .boundingBox();
    const invite = await inviteOf(page).boundingBox();
    expect(row && card && invite, "FS-12: a box was not drawn").toBeTruthy();
    expect(card!.width, "FS-12: a card is wider than a third of the row").toBeLessThan(
      row!.width / 3 + 1,
    );
    expect(
      Math.abs(invite!.width - card!.width),
      "FS-12: the invitation is not the size of a card",
    ).toBeLessThanOrEqual(1);
  });
});
