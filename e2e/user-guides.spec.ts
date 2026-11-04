import { type Locator, type Page } from "@playwright/test";

import { listingPath } from "../src/features/ad-page/address";
import { STEPS } from "../src/features/posting/types";
import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";
import { expect, test } from "./fixtures";
import { adPageFixtures } from "./helpers/ad-page";
import {
  expectNoHorizontalOverflow,
  gotoReady,
  settled,
  signInViaSession,
  switchLanguage,
} from "./helpers/ui";

/**
 * P-1c turn (b) (D315) — THE GUIDE ON THE PAGES PEOPLE USE (UG-1..UG-9): one
 * control in the row that carries the page's name (the ad page's actions
 * row) opens a sheet of four parts — What this is · Each part · How to add,
 * change or remove · What to do next — whose texts live in the `guide`
 * strings layer, fetched on the first open and never before.
 *
 * Identity: a scratch seller (J1, J3) with one live ad, its category and its
 * place, reaped after each test; the buyer's tests read the ad signed out.
 * Nothing is written by the Guides. Anchors: structure and testids (J5); a
 * word is read from the catalogues.
 */

const TAG = "[e2e:ug]";
/** The guide layer and the sheet's own code, however the server names them. */
const GUIDE_CHUNK = /(?:en|am)-guide|guide-sheet/;
const AD = "adPage";
const AD_PARTS = [
  "photos",
  "title",
  "facts",
  "description",
  "seller",
  "location",
  "save",
  "report",
];
const MY_LISTINGS_COLUMNS = ["photo", "title", "price", "state", "posted", "expires"];

function guideControls(scope: Locator | Page): Locator {
  return scope.locator('[data-testid$="-guide"][aria-haspopup="dialog"]');
}

async function openGuide(page: Page, anchor: string): Promise<Locator> {
  await page.getByTestId(`${anchor}-guide`).click();
  const sheet = page.getByTestId(`${anchor}-guide-sheet`);
  await expect(sheet).toBeVisible({ timeout: 20000 });
  await expect(sheet.getByTestId(`${anchor}-guide-body`)).toBeVisible({ timeout: 20000 });
  return sheet;
}

/** The page draws exactly one Guide control, a dialog popup, closed. */
async function expectOneControl(page: Page, where: string) {
  const controls = guideControls(page);
  await expect(controls, `${TAG} ${where} has no Guide`).toHaveCount(1, { timeout: 20000 });
  // One control, so the locator is the control.
  await expect(controls).toHaveAttribute("aria-expanded", "false");
  await expect(controls).toHaveText(en["prim.guide.open"]);
  await expectNoHorizontalOverflow(page);
}

test.describe("The Guide on the pages people use (P-1c turn b, D315)", () => {
  const { scratchSeller, seed, publicIdOf, cleanup } = adPageFixtures();
  test.afterEach(async () => {
    await cleanup();
  });

  /** A scratch seller with one live ad; the ad's public path. */
  async function liveAd() {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active");
    const path = listingPath(ad.title as string, await publicIdOf(ad.id as string));
    return { seller, ad, path };
  }

  test("UG-1 the ad page signed out: one control in the actions row; the sheet's four parts in order, eight part lines, the next link internal to Post", async ({
    page,
  }) => {
    const { path } = await liveAd();
    await gotoReady(page, path);
    await expectOneControl(page, "the ad page");
    await expect(
      page.getByTestId("listing-detail-actions").getByTestId(`${AD}-guide`),
    ).toBeVisible();
    const sheet = await openGuide(page, AD);
    await expect(sheet.locator("h3")).toHaveText([
      en["prim.guide.what"],
      en["prim.guide.parts"],
      en["prim.guide.how"],
      en["prim.guide.next"],
    ]);
    const lines = sheet.locator("ul > li");
    await expect(lines).toHaveCount(AD_PARTS.length);
    for (const part of AD_PARTS)
      await expect(sheet.getByTestId(`${AD}-guide-part-${part}`)).toBeVisible();
    const next = sheet.getByTestId(`${AD}-guide-next`);
    await expect(next).toHaveAttribute("href", "/post");
    await expect(sheet.locator("a")).toHaveCount(1);
  });

  test("UG-2 signed out, the sheet's words are the catalogue's, text for text: nothing of the ad or of a person is written into them", async ({
    page,
  }) => {
    const { path } = await liveAd();
    await gotoReady(page, path);
    const sheet = await openGuide(page, AD);
    await expect(sheet.locator("section:first-of-type > p")).toHaveText(en["adPage.guide.what"]);
    for (const part of AD_PARTS) {
      await expect(sheet.getByTestId(`${AD}-guide-part-${part}`)).toHaveText(
        en[`adPage.guide.part.${part}` as keyof typeof en],
      );
    }
    await expect(sheet.locator("section:nth-of-type(3) > p")).toHaveText(en["adPage.guide.how"]);
    await expect(sheet.getByTestId(`${AD}-guide-next`)).toHaveText(en["adPage.guide.next"]);
  });

  test("UG-3 My listings signed in: the table's Guide tile in its toolbar; one line per shown column, each the catalogue's; next to Post", async ({
    page,
  }) => {
    const { seller } = await liveAd();
    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, "/my-listings");
    await expect(page.getByTestId("my-listings-page")).toBeVisible({ timeout: 20000 });
    await expectOneControl(page, "My listings");
    await expect(
      page.getByTestId("data-table-toolbar").getByTestId("myListings-guide"),
    ).toBeVisible();
    const sheet = await openGuide(page, "myListings");
    await expect(sheet.getByRole("heading", { level: 2 })).toHaveText(en["nav.myListings"]);
    await expect(sheet.locator("h3").nth(1)).toHaveText(en["prim.guide.columns"]);
    await expect(sheet.locator("dl > div")).toHaveCount(MY_LISTINGS_COLUMNS.length);
    for (const column of MY_LISTINGS_COLUMNS) {
      await expect(sheet.getByTestId(`myListings-guide-col-${column}`).locator("dd")).toHaveText(
        en[`myListings.guide.col.${column}` as keyof typeof en],
      );
    }
    await expect(sheet.getByTestId("myListings-guide-next")).toHaveAttribute("href", "/post");
  });

  test("UG-4 the posting wizard at its first step: the eight steps as the parts, each named by its step, Category marked current", async ({
    page,
  }) => {
    const { seller } = await liveAd();
    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, "/post");
    await expect(page.getByTestId("post-step-header")).toBeVisible({ timeout: 20000 });
    await expectOneControl(page, "the wizard");
    const sheet = await openGuide(page, "post");
    await expect(sheet.getByRole("heading", { level: 2 })).toHaveText(en["post.title"]);
    const lines = sheet.locator("dl > div");
    await expect(lines).toHaveCount(STEPS.length);
    await expect(lines.locator("dt")).toHaveText(STEPS.map((step) => en[step.nameKey]));
    await expect(sheet.getByTestId("post-guide-part-category")).toHaveAttribute(
      "aria-current",
      "step",
    );
    await expect(sheet.locator('[aria-current="step"]')).toHaveCount(1);
    await expect(sheet.getByTestId("post-guide-next")).toHaveAttribute("href", "/my-listings");
  });

  test("UG-5 under Amharic the ad page's Guide reads its parts and texts from the Amharic guide layer", async ({
    page,
  }) => {
    const { path } = await liveAd();
    await gotoReady(page, path);
    await switchLanguage(page, "am");
    await expect(page.getByTestId(`${AD}-guide`)).toHaveText(am["prim.guide.open"], {
      timeout: 20000,
    });
    const sheet = await openGuide(page, AD);
    await expect(sheet.locator("h3")).toHaveText([
      am["prim.guide.what"],
      am["prim.guide.parts"],
      am["prim.guide.how"],
      am["prim.guide.next"],
    ]);
    await expect(sheet.locator("section:first-of-type > p")).toHaveText(am["adPage.guide.what"]);
    await expect(sheet.getByTestId(`${AD}-guide-part-photos`)).toHaveText(
      am["adPage.guide.part.photos"],
    );
    await expect(sheet.getByTestId(`${AD}-guide-next`)).toHaveText(am["adPage.guide.next"]);
    await page.getByTestId(`${AD}-guide-close`).click();
    await switchLanguage(page, "en");
  });

  test("UG-6 Escape closes the Guide and hands the focus back to its control; a second open is at once", async ({
    page,
  }) => {
    const { path } = await liveAd();
    await gotoReady(page, path);
    const control = page.getByTestId(`${AD}-guide`);
    const sheet = await openGuide(page, AD);
    await expect(control).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
    await expect(control).toHaveAttribute("aria-expanded", "false");
    await expect(control).toBeFocused();
    await openGuide(page, AD);
    await expect(control).toHaveAttribute("aria-expanded", "true");
  });

  test("UG-7 the first paint carries nothing but the control: no guide layer, no sheet code until the first tap", async ({
    page,
  }) => {
    const fetched: string[] = [];
    page.on("request", (request) => {
      if (GUIDE_CHUNK.test(request.url())) fetched.push(request.url());
    });
    const { path } = await liveAd();
    await gotoReady(page, path);
    await expect(page.getByTestId(`${AD}-guide`)).toBeVisible({ timeout: 20000 });
    await settled(page);
    expect(fetched, `${TAG} UG-7 guide code arrived before any tap: ${fetched.join(", ")}`).toEqual(
      [],
    );
    await openGuide(page, AD);
    expect(fetched.length, `${TAG} UG-7 nothing was fetched for the first tap`).toBeGreaterThan(0);
  });

  test("UG-8 every covered public route draws exactly one Guide signed out", async ({ page }) => {
    const { seller, path } = await liveAd();
    const routes = [
      ["/", "the home feed"],
      [`/c/${seller.leafSlug}`, "the category feed"],
      [path, "the ad page"],
      [`/${seller.alias.toLowerCase()}`, "the seller page"],
      ["/auth", "sign-in"],
    ] as const;
    for (const [route, where] of routes) {
      await gotoReady(page, route);
      await expectOneControl(page, where);
    }
  });

  test("UG-9 every covered member route draws exactly one Guide signed in", async ({ page }) => {
    const { seller, ad } = await liveAd();
    await signInViaSession(page, seller.email, seller.password);
    const routes = [
      ["/my-listings", "My listings"],
      [`/my-listings/${ad.id}`, "the listing page"],
      [`/my-listings/${ad.id}/edit`, "the edit wizard"],
      ["/post", "the posting wizard"],
      ["/account", "the account overview"],
      ["/account/saved", "Saved"],
      ["/settings", "Settings"],
    ] as const;
    for (const [route, where] of routes) {
      await gotoReady(page, route);
      await expectOneControl(page, where);
    }
    // The edit wizard's Guide reads the posting wizard's part lines under its own prefix.
    await gotoReady(page, `/my-listings/${ad.id}/edit`);
    const sheet = await openGuide(page, "post-edit");
    await expect(sheet.locator("section:first-of-type > p")).toHaveText(en["post.edit.guide.what"]);
    await expect(sheet.getByTestId("post-edit-guide-part-photos").locator("dd")).toHaveText(
      en["post.guide.part.photos"],
    );
  });
});
