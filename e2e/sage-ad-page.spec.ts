import type { Locator, Page } from "@playwright/test";
import { listingPath } from "../src/features/ad-page/address";
import { expect, test } from "./fixtures";
import { adPageFixtures } from "./helpers/ad-page";
import {
  MODES,
  contrast,
  liftOf,
  setMode,
  style,
  tokenStyle,
  type Mode,
  type Token,
} from "./helpers/sage-look";
import {
  expectNoHorizontalOverflow,
  gotoReady,
  layoutBoxes,
  settled,
  signIn,
  signInViaSession,
  signInJobSuperAdmin,
} from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";
import { updateListingRow } from "./helpers/listing-seed";

/**
 * Turn SAGE-S5 (spec §12, §7, §8, §13; ruling 1) — the buyer's ad page in the Sage look by
 * tier, measured in the page. Scratch rows on ethio-staging through the harness (J3: removed in
 * afterEach): a regular, a Premium and a Featured ad, each Reserved (so each carries a ribbon),
 * each with two photos and a pin (so the section bar shows at every width), opened by a leased
 * signed-in buyer (so Show contact is drawn).
 * SAP-1: at 390, 834 and 1440, light and dark, for each tier — the title box's fill, lift and
 *   radius; another box's (the seller's) white fill and lift; Show contact's fill, ink and lift
 *   and its contrast; the price's and the links' ink and their contrast; the tier tag; the flag
 *   at the main photo's top-start corner; the ribbon's caps past the photo's end and foot, cut
 *   by no box; the section bar's radius and its current segment; the safety box unchanged.
 * SAP-2: at 390 and 1440, light, the free tier — Show contact is 48 px tall and as wide as
 *   its parent box.
 * SAP-3 (turn T1): the tier reaches every view of an ad — a Premium ad's own page and its
 *   edit's Review preview (the seller), and a Featured ad's Screening preview (staff), each
 *   carry `data-tier` and the tinted title box, with no flag and no tag (those are the buyer's).
 */
type Tier = "regular" | "premium" | "featured";
const WIDTHS = [390, 834, 1440];
const TIERS: Tier[] = ["regular", "premium", "featured"];
const TITLE_FILL: Record<Tier, Token> = {
  regular: "card",
  premium: "tier-premium",
  featured: "tier-featured",
};
const FRAME: Record<Tier, string> = {
  regular: "lift-card",
  premium: "lift-premium",
  featured: "lift-featured",
};
const INK: Record<Tier, Token> = {
  regular: "primary",
  premium: "tier-premium-ink",
  featured: "primary",
};

/** Every ancestor that clips (overflow other than visible) and does not hold the box whole. */
async function clippedBy(target: Locator) {
  return target.evaluate((el) => {
    const box = el.getBoundingClientRect();
    const cuts: string[] = [];
    for (let up = el.parentElement; up !== null; up = up.parentElement) {
      const { overflowX, overflowY } = getComputedStyle(up);
      if (overflowX === "visible" && overflowY === "visible") continue;
      const r = up.getBoundingClientRect();
      const holds =
        box.left >= r.left - 0.5 &&
        box.right <= r.right + 0.5 &&
        box.top >= r.top - 0.5 &&
        box.bottom <= r.bottom + 0.5;
      if (!holds) cuts.push(up.getAttribute("data-testid") ?? up.tagName.toLowerCase());
    }
    return cuts;
  });
}

for (const width of WIDTHS) {
  for (const mode of MODES) {
    test.describe(`Sage ad page at ${width}, ${mode}`, () => {
      const fixtures = adPageFixtures();
      test.afterEach(async () => {
        await fixtures.cleanup();
      });
      test.beforeEach(async ({ page }, testInfo) => {
        test.skip(
          width < 768 !== (testInfo.project.name === "mobile-360"),
          "each width uses its pointer project",
        );
        await page.setViewportSize({ width, height: 900 });
      });

      /** A regular, a Premium and a Featured ad, each Reserved, with photos and a pin. */
      async function seedTiers() {
        const seller = await fixtures.scratchSeller();
        const paths: Record<Tier, string> = { regular: "", premium: "", featured: "" };
        for (const tier of TIERS) {
          const row = await fixtures.seed(seller, "active", {
            pin: true,
            contactPref: { phone: { show: true, value: "+251911000001" } },
          });
          await updateListingRow(
            row.id,
            { tier, reserved_at: new Date().toISOString() },
            { tag: "sap" },
          );
          await fixtures.seedPhotos(row.id);
          paths[tier] = listingPath(row.title, await fixtures.publicIdOf(row.id));
        }
        return paths;
      }

      async function openAs(page: Page, path: string, theme: Mode) {
        await gotoReady(page, path);
        // The last tap's pointer must not rest on a control whose fill is read (hover).
        await page.mouse.move(0, 0);
        await expect(page.locator("html")).toHaveAttribute("data-mode", theme);
        await expect(page.getByTestId("listing-contact-show")).toBeVisible();
        await expect
          .poll(async () =>
            page
              .getByTestId("gallery-main")
              .locator("img")
              .evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
          )
          .toBe(true);
      }

      test(`SAP-1 each tier's ad page reads its tokens (${width}, ${mode})`, async ({ page }) => {
        const paths = await seedTiers();
        const buyer = await leaseUser();
        await signInViaSession(page, buyer.email, buyer.password);
        await setMode(page, mode);
        const boxRadius = width < 768 ? "16px" : "20px";
        const barRadius = width < 768 ? "12px" : "14px";

        for (const tier of TIERS) {
          const at = `${tier} ad`;
          await openAs(page, paths[tier], mode);
          await expect(page.getByTestId("listing-detail")).toHaveAttribute("data-tier", tier);

          // The title box: the one tinted box, on the tier's frame.
          const headline = page.getByTestId("listing-detail-headline");
          const titleFill = await style(headline, "background-color");
          expect(titleFill, `${at}: the title box's fill`).toBe(
            await tokenStyle(page, mode, TITLE_FILL[tier], "background-color"),
          );
          expect(await style(headline, "box-shadow"), `${at}: the title box's lift`).toBe(
            await liftOf(page, FRAME[tier]),
          );
          expect(await style(headline, "border-top-left-radius"), at).toBe(boxRadius);

          // Every other box white, on the tier's frame.
          const seller = page.locator('section[data-testid="listing-detail-seller"]');
          const white = await tokenStyle(page, mode, "card", "background-color");
          expect(await style(seller, "background-color"), `${at}: the seller box`).toBe(white);
          expect(await style(seller, "box-shadow"), `${at}: the seller box's frame`).toBe(
            await liftOf(page, FRAME[tier]),
          );
          expect(await style(seller, "border-top-left-radius"), at).toBe(boxRadius);

          // Show contact: gold on Premium, the site green otherwise. Its size is SAP-2.
          const show = page.getByTestId("listing-contact-show");
          const showFill = await style(show, "background-color");
          const showInk = await style(show, "color");
          expect(showFill, `${at}: Show contact's fill`).toBe(
            await tokenStyle(
              page,
              mode,
              tier === "premium" ? "gold" : "primary",
              "background-color",
            ),
          );
          expect(showInk, `${at}: Show contact's ink`).toBe(
            await tokenStyle(
              page,
              mode,
              tier === "premium" ? "gold-foreground" : "primary-foreground",
              "color",
            ),
          );
          expect(await style(show, "box-shadow"), `${at}: Show contact's lift`).toBe(
            await liftOf(page, tier === "premium" ? "lift-contact-premium" : "lift-button"),
          );
          expect(await contrast(page, showInk, showFill), at).toBeGreaterThanOrEqual(4.5);

          // The accents: the price on the title box, the seller's link on white.
          const ink = await tokenStyle(page, mode, INK[tier], "color");
          const price = page.getByTestId("listing-detail-price");
          expect(await style(price, "color"), `${at}: the price's ink`).toBe(ink);
          expect(await contrast(page, ink, titleFill), `${at}: price`).toBeGreaterThanOrEqual(4.5);
          const allAds = page.getByTestId("listing-seller-all-ads");
          expect(await style(allAds, "color"), `${at}: the link's ink`).toBe(ink);
          expect(await contrast(page, ink, white), `${at}: link`).toBeGreaterThanOrEqual(4.5);

          // The tier tag above the title, and the flag on the main photo's top-start corner.
          const tag = page.getByTestId("listing-detail-tier-tag");
          const flag = page.getByTestId("listing-detail-tier");
          const main = page.getByTestId("gallery-main");
          if (tier === "regular") {
            await expect(tag).toHaveCount(0);
            await expect(flag).toHaveCount(0);
          } else {
            await expect(tag).toHaveAttribute("data-tier", tier);
            expect(
              await contrast(page, await style(tag, "color"), await style(tag, "background-color")),
              `${at}: the tag's word`,
            ).toBeGreaterThanOrEqual(4.5);
            const boxes = await layoutBoxes({ flag, main, tag, title: headline });
            expect(boxes.tag.y, `${at}: the tag above the title`).toBeLessThan(
              boxes.title.y + boxes.title.height / 2,
            );
            const reach = 0.1 * boxes.main.width;
            expect(Math.abs(boxes.flag.x - boxes.main.x), `${at}: the flag's start`).toBeLessThan(
              reach,
            );
            expect(Math.abs(boxes.flag.y - boxes.main.y), `${at}: the flag's top`).toBeLessThan(
              reach,
            );
          }

          // The ribbon on the main photo: its caps past the photo's end and foot, cut by nothing.
          // The ad's own photo: similar ads below draw cards with ribbons of their own.
          const ends = page.getByTestId("listing-detail-media").getByTestId("listing-ribbon-ends");
          await expect(ends).toHaveCount(1);
          const caps = await layoutBoxes({
            main,
            capEnd: ends.locator(".ribbon-cap-end"),
            capFoot: ends.locator(".ribbon-cap-foot"),
          });
          expect(caps.capEnd.x, `${at}: the end cap past the photo`).toBeGreaterThanOrEqual(
            caps.main.x + caps.main.width - 0.5,
          );
          expect(caps.capFoot.y, `${at}: the foot cap below it`).toBeGreaterThanOrEqual(
            caps.main.y + caps.main.height - 0.5,
          );
          expect(await clippedBy(ends.locator(".ribbon-cap-end")), at).toEqual([]);
          expect(await clippedBy(ends.locator(".ribbon-cap-foot")), at).toEqual([]);

          // The safety box: white, the card's lift, the gold edge, whatever the tier.
          const safety = page.getByTestId("listing-safety");
          expect(await style(safety, "background-color"), `${at}: safety`).toBe(white);
          expect(await style(safety, "box-shadow"), `${at}: safety`).toBe(
            await liftOf(page, "lift-card"),
          );
          expect(await style(safety, "border-inline-start-color"), `${at}: safety`).toBe(
            await tokenStyle(page, mode, "gold", "color"),
          );

          // The section bar: its own radius, and the segment the buyer chose pressed in.
          const bar = page.getByTestId("listing-section-nav");
          expect(await style(bar, "border-top-left-radius"), at).toBe(barRadius);
          expect(await style(bar, "box-shadow"), `${at}: the bar's frame`).toBe(
            await liftOf(page, FRAME[tier]),
          );
          const description = bar.locator(
            '[data-testid="listing-section-nav-item"][data-target="description"]',
          );
          await description.click();
          await expect(description).toHaveAttribute("aria-current", "true");
          // The chosen segment's own look, not the pointer resting on it (a ghost's hover fill).
          await page.mouse.move(0, 0);
          await settled(page);
          expect(await style(description, "background-color"), `${at}: the segment`).toBe(
            await tokenStyle(
              page,
              mode,
              tier === "premium" ? "tier-premium" : "nav-pill",
              "background-color",
            ),
          );
          expect(await style(description, "color"), `${at}: the segment's ink`).toBe(
            await tokenStyle(
              page,
              mode,
              tier === "premium" ? "tier-premium-ink" : "nav-ink",
              "color",
            ),
          );
          expect(await style(description, "border-bottom-width"), at).toBe("0px");
          await expectNoHorizontalOverflow(page);
        }
      });

      if (mode === "light" && (width === 390 || width === 1440)) {
        test(`SAP-2 Show contact is 48px and as wide as its box (${width})`, async ({ page }) => {
          const paths = await seedTiers();
          const buyer = await leaseUser();
          await signInViaSession(page, buyer.email, buyer.password);
          await setMode(page, mode);
          await openAs(page, paths.regular, mode);
          const show = page.getByTestId("listing-contact-show");
          const boxes = await layoutBoxes({ show, parent: show.locator("..") });
          expect(Math.abs(boxes.show.height - 48), "Show contact's height").toBeLessThanOrEqual(
            0.5,
          );
          expect(
            Math.abs(boxes.show.width - boxes.parent.width),
            "Show contact's width",
          ).toBeLessThanOrEqual(0.5);
        });
      }
    });
  }
}

test.describe("The tier on every view of an ad (turn T1)", () => {
  const fixtures = adPageFixtures();
  test.afterEach(async () => {
    await fixtures.cleanup();
  });

  async function marked(id: string, tier: Tier) {
    await updateListingRow(id, { tier }, { tag: "sap" });
  }

  async function expectTierLook(view: Locator, tier: Tier) {
    const detail = view.getByTestId("listing-detail");
    await expect(detail).toHaveAttribute("data-tier", tier, { timeout: 20000 });
    await expect(view.getByTestId("listing-detail-headline")).toHaveClass(
      new RegExp(`(^|\\s)bg-tier-${tier}(\\s|$)`),
    );
    await expect(view.getByTestId("listing-detail-tier")).toHaveCount(0);
    await expect(view.getByTestId("listing-detail-tier-tag")).toHaveCount(0);
  }

  test("SAP-3 the seller's own page, the edit's Review preview and Screening's preview carry the tier look", async ({
    page,
  }) => {
    const seller = await fixtures.scratchSeller();
    const own = await fixtures.seed(seller, "active");
    await marked(own.id, "premium");
    const waiting = await fixtures.seed(seller, "screening");
    await marked(waiting.id, "featured");

    await page.goto("/");
    await signIn(page, seller.email, seller.password);
    await gotoReady(page, `/my-listings/${own.id}`);
    await expectTierLook(page.getByTestId("my-listing-as-seen"), "premium");

    await gotoReady(page, `/my-listings/${own.id}/edit`);
    await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
    await page.getByTestId("post-preview-open").click();
    await expectTierLook(page.getByTestId("post-preview-sheet"), "premium");

    await signInJobSuperAdmin(page);
    await gotoReady(page, "/admin/screening");
    await page.getByTestId("admin-screening-search").fill(waiting.title);
    const more = page.locator(`[data-testid="admin-screening-actions-${waiting.id}-more"]:visible`);
    await expect(more).toBeVisible({ timeout: 20000 });
    await more.click();
    await page.getByTestId(`admin-screening-actions-${waiting.id}-more-open`).click();
    await expectTierLook(page.getByTestId("post-preview-sheet"), "featured");
  });
});
