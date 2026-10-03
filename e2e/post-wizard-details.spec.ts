import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { purgeListingObjects } from "./helpers/photos";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { leaseUser } from "./helpers/users";
import { leaseSeller,
  attributesOf,
  destroyListingsOf,
  destroyPostableCategory,
  destroySpecSet,
  draftsOf,
  seedPostableCategory,
  seedWriteInSet,
  stopPageBeforePurge,
  type WriteInSet,
} from "./helpers/posting";

/**
 * INC-357 N1 — EVERY ROW THE DOOR DEMANDS HAS A BOX (PW-102, PW-103).
 *
 * `post-wizard-specs.spec.ts` is at its size limit, so the write-in proofs live
 * here. Scratch definitions only (J3); DB truth through the service client (J4);
 * cleanup in an afterEach that survives a body timeout.
 */
test.describe("POSTING WIZARD — WRITE-IN DETAILS", () => {
  const categories: string[] = [];
  const sellers: string[] = [];
  const specs: string[] = [];
  const objects: { userId: string; listingId: string }[] = [];

  test.afterEach(async ({ page }) => {
    await stopPageBeforePurge(page);
    for (const ref of objects.splice(0)) await purgeListingObjects(ref.userId, ref.listingId);
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    await destroySpecSet(specs.splice(0));
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
  });

  async function asEdge(page: Page) {
    for (const glob of ["**/api/listings/**", "**/api/geo"]) {
      await page.route(glob, async (route) => {
        await route.continue({ headers: { ...route.request().headers(), "cf-ipcountry": "ET" } });
      });
    }
  }

  async function reachStep3(page: Page): Promise<{ set: WriteInSet; listingId: string }> {
    const user = await leaseSeller();
    sellers.push(user.id);
    await asEdge(page);
    await signInViaSession(page, user.email, user.password);
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const set = await seedWriteInSet(category.id);
    specs.push(...set.attrKeys);

    await gotoReady(page, "/post");
    await page.getByTestId("post-category-search").fill(category.slug);
    const hit = page.locator(`[data-testid="post-category-hit"][data-category="${category.id}"]`);
    await expect(hit).toBeVisible();
    await hit.click();
    await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-specs")).toHaveAttribute("data-options", "1", {
      timeout: 20_000,
    });
    const [draft] = await draftsOf(user.id);
    const listingId = String(draft?.id ?? "");
    expect(listingId, "step 1 created no draft").not.toBe("");
    objects.push({ userId: user.id, listingId });
    return { set, listingId };
  }

  const control = (page: Page, attrKey: string) =>
    page.locator(`[data-testid="post-attr-control"][data-attr="${attrKey}"]`);
  const otherBox = (page: Page, attrKey: string) =>
    page.locator(`[data-testid="post-attr-other"][data-attr="${attrKey}"]`);

  test("PW-102 a type that leaves only Other shows that question's text box, and the typed text saves", async ({
    page,
  }) => {
    const { set, listingId } = await reachStep3(page);
    await control(page, set.kind.attrKey).selectOption(set.kindOtherOnly);

    const box = otherBox(page, set.brand.attrKey);
    await expect(box, "PW-102: the settled Other has no text box").toBeVisible({
      timeout: 20_000,
    });
    await expect(box).toHaveAttribute("data-settled", "1");
    await box.fill("e2e brand write-in");
    await control(page, set.textRequired.attrKey).fill("e2e required");

    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2"), "PW-102: Next did not pass").toBeVisible({
      timeout: 20_000,
    });
    await expect
      .poll(async () => (await attributesOf(listingId))[set.brand.attrKey], {
        message: "PW-102: the typed text never reached the draft",
        timeout: 20_000,
      })
      .toEqual({ value: "other", text: "e2e brand write-in" });
  });

  test("PW-103 required text, optional text and a list's Other text each save; an empty required text is refused by name", async ({
    page,
  }) => {
    const { set, listingId } = await reachStep3(page);
    await control(page, set.kind.attrKey).selectOption(set.kindOtherOnly);
    await otherBox(page, set.brand.attrKey).fill("e2e brand");
    await control(page, set.colour.attrKey).selectOption("other");
    await otherBox(page, set.colour.attrKey).fill("e2e teal");
    await control(page, set.textOptional.attrKey).fill("e2e optional");

    // The required text is empty: the door refuses it under its own control.
    await page.getByTestId("post-next").click();
    await expect(
      page.locator(`[data-testid="post-attr-refusal"][data-attr="${set.textRequired.attrKey}"]`),
      "PW-103: the empty required text was not refused by name",
    ).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-step-3")).toBeVisible();

    await control(page, set.textRequired.attrKey).fill("e2e required");
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2"), "PW-103: Next did not pass").toBeVisible({
      timeout: 20_000,
    });
    await expect
      .poll(async () => await attributesOf(listingId), {
        message: "PW-103: the answers never reached the draft",
        timeout: 20_000,
      })
      .toMatchObject({
        [set.textRequired.attrKey]: "e2e required",
        [set.textOptional.attrKey]: "e2e optional",
        [set.colour.attrKey]: { value: "other", text: "e2e teal" },
        [set.brand.attrKey]: { value: "other", text: "e2e brand" },
      });
  });
});
