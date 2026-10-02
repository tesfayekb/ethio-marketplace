import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { gotoReady, signInViaSession, switchLanguage } from "./helpers/ui";
import { leaseUser } from "./helpers/users";
import {
  attributesOf,
  destroyCategoryBranch,
  destroyListingsOf,
  destroyPostableCategory,
  destroySpecSet,
  draftsOf,
  rand,
  seedCategoryBranch,
  seedFinderOption,
  stopPageBeforePurge,
} from "./helpers/posting";

/**
 * W7 — STEP 1 ASKS THE CATALOG FINDER (D37-2) AND ASKS AGAIN OFF THE CHOSEN
 * PATH (INC-346). PW-85, PW-86, PW-87.
 *
 * J-laws: sellers are minted by `createUser`; every category, attribute and
 * option is scratch (G27) and reaped in an afterEach that first stops the page
 * (`stopPageBeforePurge`, INC-323). Rows are addressed by their own ids, never
 * by position (G28). The finder's per-key rate limit is isolated per request
 * with the local-build key header, so the suite never meets another test's
 * budget.
 */

test.describe("POSTING WIZARD — the category finder (W7)", () => {
  const categories: string[] = [];
  const branches: string[][] = [];
  const attrs: string[] = [];
  const sellers: string[] = [];

  test.afterEach(async ({ page }) => {
    await stopPageBeforePurge(page);
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    await destroySpecSet(attrs.splice(0));
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
    for (const slugs of branches.splice(0)) await destroyCategoryBranch(slugs);
  });

  async function seller(page: Page) {
    const user = await leaseUser();
    sellers.push(user.id);
    for (const glob of ["**/api/listings/**", "**/api/geo"]) {
      await page.route(glob, async (route) => {
        await route.continue({ headers: { ...route.request().headers(), "cf-ipcountry": "ET" } });
      });
    }
    await signInViaSession(page, user.email, user.password);
    return user;
  }

  /** Each finder request gets its own rate key (local builds only honour it). */
  async function isolateFinder(page: Page) {
    await page.route("**/api/catalog/find**", async (route) => {
      await route.continue({
        headers: { ...route.request().headers(), "x-e2e-catalog-find-key": `pw85-${rand()}` },
      });
    });
  }

  function hitOf(page: Page, id: string) {
    return page.locator(`[data-testid="post-category-hit"][data-category="${id}"]`);
  }

  test("PW-85 an option label, an alias and an Amharic alias each find the leaf, and the choice prefills the option", async ({
    page,
  }) => {
    const user = await seller(page);
    const seed = await seedFinderOption();
    categories.push(seed.leaf.slug);
    attrs.push(seed.attrKey);
    await isolateFinder(page);
    await gotoReady(page, "/post");
    const search = page.getByTestId("post-category-search");

    for (const word of [seed.label, seed.alias]) {
      await search.fill(word);
      const hit = hitOf(page, seed.leaf.id);
      await expect(hit, `PW-85: "${word}" never listed the scratch leaf`).toBeVisible({
        timeout: 20_000,
      });
      await expect(
        hit.getByTestId("post-category-hit-match"),
        `PW-85: "${word}" listed the leaf without the match line`,
      ).toContainText(seed.label);
    }

    await search.fill("");
    await switchLanguage(page, "am");
    const amRequest = page.waitForRequest((request) => request.url().includes("/api/catalog/find"));
    await search.fill(seed.aliasAm);
    const amHit = hitOf(page, seed.leaf.id);
    await expect(amHit, "PW-85: the Amharic alias never listed the leaf").toBeVisible({
      timeout: 20_000,
    });
    expect(new URL((await amRequest).url()).searchParams.get("lang")).toBe("am");
    await switchLanguage(page, "en");
    await search.fill(seed.label);
    await expect(hitOf(page, seed.leaf.id).getByTestId("post-category-hit-match")).toBeVisible({
      timeout: 20_000,
    });

    await hitOf(page, seed.leaf.id).click();
    await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    const picker = page.locator(`[data-testid="post-attr-control"][data-attr="${seed.attrKey}"]`);
    if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
    await expect(picker).toHaveAttribute("data-options", "ready");
    await expect(picker, "PW-85: the matched option was not prefilled").toHaveValue(seed.value);

    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
    const [draft] = await draftsOf(user.id);
    expect(draft, "PW-85: no draft").toBeDefined();
    await expect
      .poll(async () => (await attributesOf(draft!.id))[seed.attrKey], {
        message: "PW-85: the prefilled option never reached the draft",
      })
      .toBe(seed.value);
  });

  test("PW-86 a failing finder leaves the name matches on screen, with the notice", async ({
    page,
  }) => {
    await seller(page);
    const branch = await seedCategoryBranch();
    branches.push([branch.parent.slug, branch.leaf.slug]);
    await page.route("**/api/catalog/find**", (route) =>
      route.fulfill({ status: 503, body: "{}", contentType: "application/json" }),
    );
    await gotoReady(page, "/post");
    await page.getByTestId("post-category-search").fill(branch.leaf.slug);
    await expect(hitOf(page, branch.leaf.id), "PW-86: the name match did not render").toBeVisible();
    await expect(
      page.getByTestId("post-category-nameonly"),
      "PW-86: the finder failed silently — no name-matches-only notice",
    ).toBeVisible({ timeout: 20_000 });
    await expect(hitOf(page, branch.leaf.id)).toBeVisible();
  });

  /**
   * PW-105 — S3 / INC-362. While the finder is still asked about the current
   * term, the list shows the searching row and never "Nothing matched"; once the
   * finder answers with nothing, "Nothing matched" shows.
   */
  test("PW-105 the searching row shows while the finder is asked; no-hits only after its answer", async ({
    page,
  }) => {
    await seller(page);
    let release: () => void = () => {};
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route("**/api/catalog/find**", async (route) => {
      await held;
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ ok: true, results: [] }),
        contentType: "application/json",
      });
    });
    await gotoReady(page, "/post");
    await page.getByTestId("post-category-search").fill(`zq${rand()}`);
    await expect(
      page.getByTestId("post-category-searching"),
      "PW-105: no searching row while the finder was asked",
    ).toBeVisible();
    await expect(
      page.getByTestId("post-category-nohits"),
      "PW-105: no-hits showed before the finder answered",
    ).toHaveCount(0);
    release();
    await expect(page.getByTestId("post-category-nohits")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-category-searching")).toHaveCount(0);
  });

  test("PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it", async ({
    page,
  }) => {
    await seller(page);
    const a = await seedCategoryBranch();
    const b = await seedCategoryBranch();
    branches.push([a.parent.slug, a.leaf.slug], [b.parent.slug, b.leaf.slug]);
    await gotoReady(page, "/post");

    const folder = (id: string) =>
      page.locator(`[data-testid="post-browse-folder"][data-category="${id}"]`);
    const leafRow = (id: string) =>
      page.locator(`[data-testid="post-browse-leaf"][data-category="${id}"]`);
    const group = page.getByTestId("post-category-group");
    const mark = page.getByTestId("post-category-list-heading").getByTestId("post-required-mark");
    const current = page.getByTestId("post-category-current");

    await folder(a.parent.id).click();
    await leafRow(a.leaf.id).click();
    await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-1")).toBeVisible();

    // On the chosen path: nothing asked, the choice selected.
    await page.locator('[data-testid="post-browse-crumb"][data-category=""]').click();
    await expect(group).toHaveAttribute("data-empty", "0");
    await expect(mark).toHaveCount(0);
    await expect(folder(a.parent.id)).toHaveAttribute("data-on-path", "1");

    // Off it: the mark, the soft border and the current choice.
    await folder(b.parent.id).click();
    await expect(group, "PW-87: no soft border off the chosen path").toHaveAttribute(
      "data-empty",
      "1",
    );
    await expect(mark, "PW-87: no required mark off the chosen path").toHaveCount(1);
    await expect(current, "PW-87: no Current choice line").toContainText(a.leaf.slug);

    await page.getByTestId("post-category-keep").click();
    await expect(leafRow(a.leaf.id), "PW-87: Keep it did not return").toHaveAttribute(
      "aria-current",
      "true",
    );
    await expect(group).toHaveAttribute("data-empty", "0");
    await expect(current).toHaveCount(0);

    await page.locator('[data-testid="post-browse-crumb"][data-category=""]').click();
    await folder(b.parent.id).click();
    await leafRow(b.leaf.id).click();
    await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-1")).toBeVisible();
    await expect(group, "PW-87: the new leaf left the step asking").toHaveAttribute(
      "data-empty",
      "0",
    );
    await expect(mark).toHaveCount(0);
    await expect(current).toHaveCount(0);
  });
});
