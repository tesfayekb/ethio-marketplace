import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { purgeListingObjects } from "./helpers/photos";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { adminClient } from "./helpers/users";
import { destroyLocation, seedScratchChain } from "./helpers/locations";
import {
  bearerOf,
  completeDraft,
  postRoute,
  seedSpecSet,
  leaseSeller,
  attributesOf,
  destroyListingsOf,
  destroyPostableCategory,
  destroySpecSet,
  draftsOf,
  rand,
  RUN,
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
  const places: string[] = [];

  test.afterEach(async ({ page }) => {
    await stopPageBeforePurge(page);
    for (const ref of objects.splice(0)) await purgeListingObjects(ref.userId, ref.listingId);
    for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    for (const sellerId of placeSellers.splice(0)) {
      const gone = await adminClient().from("seller_places").delete().eq("user_id", sellerId);
      if (gone.error) throw new Error(`seller_places cleanup ${sellerId}: ${gone.error.message}`);
    }
    for (const slug of places.splice(0)) await destroyLocation(slug);
    await destroySpecSet(specs.splice(0));
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
  });
  const placeSellers: string[] = [];

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

  /**
   * Bundle 7 B3.1 — on a leaf shaped like an "Other" leaf (a required text
   * question first, no card rank, then a ranked choice) the title step offers a
   * title that begins with the seller's own name for the item. Scratch only (J3).
   */
  test("PW-170 the suggested title leads with the seller's own name for the item (Bundle 7 B3)", async ({
    page,
  }) => {
    const user = await leaseSeller();
    sellers.push(user.id);
    await asEdge(page);
    await signInViaSession(page, user.email, user.password);
    const category = await seedPostableCategory();
    categories.push(category.slug);

    const stem = `e2e_b7t_${RUN}_${process.env["TEST_WORKER_INDEX"] ?? "0"}_${rand()}`;
    const choice = `${stem}_c1`;
    const supabase = adminClient();
    const { data, error } = await supabase
      .from("attributes")
      .insert([
        { attr_key: `${stem}_name`, name_en: `${stem} name`, attr_type: "text", max_length: 70 },
        {
          attr_key: `${stem}_kind`,
          name_en: `${stem} kind`,
          attr_type: "single_select",
          options: [{ value: choice, label_en: "Oak", label_am: "ዋርካ", active: true }],
        },
      ])
      .select("id, attr_key");
    if (error || !data) throw new Error(`[e2e:b7] seeding failed: ${error?.message ?? "no rows"}`);
    specs.push(...data.map((row) => row.attr_key));
    const idOf = (suffix: string) => data.find((row) => row.attr_key.endsWith(suffix))!.id;
    const { error: linkError } = await supabase.from("category_attribute_links").insert([
      {
        category_id: category.id,
        attribute_id: idOf("_name"),
        is_required: true,
        display_order: 1,
      },
      {
        category_id: category.id,
        attribute_id: idOf("_kind"),
        is_required: true,
        card_rank: 1,
        display_order: 2,
      },
    ]);
    if (linkError) throw new Error(`[e2e:b7] linking failed: ${linkError.message}`);

    await gotoReady(page, "/post");
    await page.getByTestId("post-category-search").fill(category.slug);
    const hit = page.locator(`[data-testid="post-category-hit"][data-category="${category.id}"]`);
    await expect(hit).toBeVisible();
    await hit.click();
    await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    const [draft] = await draftsOf(user.id);
    objects.push({ userId: user.id, listingId: String(draft?.id ?? "") });
    await expect(page.getByTestId("post-specs")).toHaveAttribute("data-options", "1", {
      timeout: 20_000,
    });

    await control(page, `${stem}_name`).fill("Carved stool");
    // DEC-053: an option list is read on the first tap (the law PW-5 states).
    const picker = control(page, `${stem}_kind`);
    await picker.focus();
    await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
    await picker.selectOption(choice);
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-4")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-price-mode-free").click();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-5")).toBeVisible({ timeout: 20_000 });
    await expect(
      page.getByTestId("post-title"),
      "PW-170: the title does not lead with the seller's name",
    ).toHaveValue("Carved stool Oak", { timeout: 20_000 });
  });

  test("PW-172 a held answer whose option is switched off prints its label, never offered (INC-466)", async ({
    page,
  }) => {
    const user = await leaseSeller({ named: true });
    sellers.push(user.id);
    placeSellers.push(user.id);
    await destroyListingsOf(user.id);
    await asEdge(page);
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    const category = await seedPostableCategory();
    categories.push(category.slug);
    const set = await seedSpecSet(category.id);
    specs.push(set.text.attrKey, set.number.attrKey, set.bool.attrKey);
    specs.push(set.select.attrKey, set.multi.attrKey);
    const chain = await seedScratchChain("ET");
    places.push(chain.region.slug);
    const [held, kept] = set.optionValues as [string, string];
    const saved = await postRoute(
      page,
      "/api/listings/draft",
      {
        ...completeDraft({
          categoryId: category.id,
          cityId: chain.city.id,
          title: "e2e retired label",
          step: 7,
        }),
        attributes: { [set.text.attrKey]: "e2e held text", [set.select.attrKey]: held },
      },
      { token: await bearerOf(page), country: "ET" },
    );
    expect(saved.payload["ok"], JSON.stringify(saved.payload)).toBe(true);
    const listingId = String(saved.payload["listing_id"]);
    objects.push({ userId: user.id, listingId });
    const off = await adminClient()
      .from("attributes")
      .update({
        options: [
          { value: held, label_en: `${held} label`, label_am: `${held} ምልክት`, active: false },
          { value: kept, label_en: `${kept} label`, label_am: `${kept} ምልክት`, active: true },
        ],
      })
      .eq("id", set.select.id);
    expect(off.error).toBeNull();

    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
    const label = `${held} label`;
    await expect(
      page.locator('[data-testid="post-review-section"][data-step="3"]'),
      "PW-172: Review prints the stored value",
    ).toContainText(label, { timeout: 20_000 });
    await page.getByTestId("post-preview-open").click();
    await expect(
      page.locator(`[data-testid="listing-detail-spec"][data-key="${set.select.attrKey}"]`),
      "PW-172: the preview prints the stored value",
    ).toHaveText(label);
    await page.getByTestId("post-preview-close").click();
    await page.locator('[data-testid="post-review-edit"][data-step="3"]').click();
    await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    const picker = control(page, set.select.attrKey);
    await picker.focus();
    await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
    await expect(
      picker.locator("option:checked"),
      "PW-172: the picker's current choice is not the label",
    ).toHaveText(label);
    await expect(
      picker.locator(`option[value="${held}"]:not([disabled])`),
      "PW-172: the switched-off option is offered",
    ).toHaveCount(0);
  });
});
