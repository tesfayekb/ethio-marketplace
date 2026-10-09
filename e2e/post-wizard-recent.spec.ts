import type { Page } from "@playwright/test";
import { en } from "../src/i18n/locales/en";
import { expect, test } from "./fixtures";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import {
  destroyListingsOf,
  destroyPostableCategory,
  leaseSeller,
  seedPostableCategory,
} from "./helpers/posting";

/**
 * Bundle 7 D2 — TWO "USED BEFORE" CHIPS (PW-171). Scratch leaves and a leased
 * seller whose earlier scratch ads are removed first (as PR-39); cleanup in an
 * afterEach that survives a body timeout (J3).
 */
test.describe("POSTING WIZARD — USED BEFORE", () => {
  const sellers: string[] = [];
  const categories: string[] = [];
  test.afterEach(async () => {
    for (const id of sellers.splice(0)) await destroyListingsOf(id);
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
  });

  async function seed(categoryId: string, sellerId: string, published: string | null) {
    const result = await adminClient().from("listings").insert({
      seller_id: sellerId,
      category_id: categoryId,
      title: "e2e recent chip",
      description: "e2e scratch ad",
      status: "draft",
      location_id: null,
      attributes: {},
      published_first_at: published,
      home_country_code: "ET",
    });
    expect(result.error).toBeNull();
  }
  async function asEdge(page: Page) {
    for (const glob of ["**/api/listings/**", "**/api/geo"]) {
      await page.route(glob, async (route) => {
        await route.continue({ headers: { ...route.request().headers(), "cf-ipcountry": "ET" } });
      });
    }
  }
  const chip = (page: Page, id: string) =>
    page.locator(`[data-testid="post-category-recent"][data-category="${id}"]`);

  test("PW-171 two chips, most used first; a tap selects that leaf; drafts only draw none", async ({
    page,
  }) => {
    const user = await leaseSeller();
    sellers.push(user.id);
    await destroyListingsOf(user.id);
    const x = await seedPostableCategory();
    const y = await seedPostableCategory();
    categories.push(x.slug, y.slug);
    const xName = x.slug.slice(-3);
    const yName = `${y.slug} exceptionally long household equipment collection`;
    const renamed = await Promise.all(
      [
        { id: x.id, name: xName },
        { id: y.id, name: yName },
      ].map(({ id, name }) =>
        adminClient().from("categories").update({ name_en: name }).eq("id", id),
      ),
    );
    expect(renamed.map((result) => result.error)).toEqual([null, null]);
    const time = "2026-10-06T12:00:00Z";
    await seed(x.id, user.id, time);
    await seed(x.id, user.id, time);
    await seed(y.id, user.id, time);
    await asEdge(page);
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/post");

    const chips = page.getByTestId("post-category-recent");
    await expect(chips).toHaveCount(2, { timeout: 20_000 });
    await expect(chips.nth(0), "PW-171: X is not first").toHaveAttribute("data-category", x.id);
    await expect(chips.nth(1)).toHaveAttribute("data-category", y.id);
    if (test.info().project.name === "mobile-360") {
      for (const width of [360, 320]) {
        await page.setViewportSize({ width, height: 800 });
        const label = page.getByText(en["post.category.recentLabel"], { exact: true });
        const labelBox = await label.boundingBox();
        const chipBoxes = await chips.evaluateAll((elements) =>
          elements.map((element) => {
            const box = element.getBoundingClientRect();
            return { top: box.top, height: box.height, title: element.getAttribute("title") };
          }),
        );
        if (!labelBox) throw new Error("PW-171: recent label has no box");
        const labelCentre = labelBox.y + labelBox.height / 2;
        for (const box of chipBoxes) {
          expect(Math.abs(box.top + box.height / 2 - labelCentre)).toBeLessThanOrEqual(2);
        }
        const [first, second] = chipBoxes;
        if (!first || !second) throw new Error("PW-171: missing chip boxes");
        expect(Math.abs(first.top - second.top)).toBeLessThanOrEqual(1);
        expect(chipBoxes.map((box) => box.title)).toEqual([xName, yName]);
        expect(await chip(page, x.id).evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1);
        const longHead = await chip(page, y.id).evaluate((element) => {
          const head = element.firstElementChild?.firstElementChild;
          if (!head) throw new Error("PW-171: missing name head");
          const box = element.getBoundingClientRect();
          return { text: head.textContent, right: head.getBoundingClientRect().right,
            contentRight: box.right - parseFloat(getComputedStyle(element).paddingRight) };
        });
        expect(longHead.text).toBe(yName.slice(0, 5));
        expect(longHead.right).toBeLessThanOrEqual(longHead.contentRight + 1);
        const row = page.getByTestId("post-category-recent-row");
        expect(await row.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1);
      }
    }
    await chip(page, y.id).click();
    await expect(page.getByTestId("post-step-3"), "PW-171: Y's details did not open").toBeVisible({
      timeout: 20_000,
    });
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-1")).toBeVisible({ timeout: 20_000 });
    await expect(chip(page, y.id), "PW-171: Y's chip is not pressed").toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(
      page.locator(`[data-testid="post-browse-leaf"][data-category="${y.id}"]`),
      "PW-171: the list does not show Y chosen",
    ).toHaveAttribute("aria-current", "true");

    const other = await leaseSeller();
    sellers.push(other.id);
    await destroyListingsOf(other.id);
    await seed(x.id, other.id, null);
    await signInViaSession(page, other.email, other.password);
    const answered = page.waitForResponse((r) => r.url().includes("/rpc/my_recent_categories"), {
      timeout: 20_000,
    });
    await gotoReady(page, "/post");
    await expect(page.getByTestId("post-category-search")).toBeVisible({ timeout: 20_000 });
    const reply = await answered;
    expect(await reply.json(), "PW-171: the reader did not answer none").toEqual({
      categories: [],
    });
    await expect(
      page.getByTestId("post-category-recent-row"),
      "PW-171: drafts drew chips",
    ).toHaveCount(0);
  });
});
