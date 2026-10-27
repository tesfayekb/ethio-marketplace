import { expect, test } from "./fixtures";
import { adPageFixtures } from "./helpers/ad-page";
import { adminClient } from "./helpers/users";
import { whilePageLives } from "./helpers/route-guard";
import { gotoReady, layoutBoxes } from "./helpers/ui";
import { listingPath } from "../src/features/ad-page/address";

/**
 * INC-940 (Foundations turn 34f) — THE MAP'S PLACE HOLDS ITS BOX. AP-36 retried four times on
 * desktop-1280 when the Details | Description | Location row measured one height before the still
 * map arrived and another after it: the map's code, its library and its credit came after the page
 * had painted. Here the map's three downloads (its component, Leaflet and Leaflet's source) are held
 * until the Location box has been read, then let go; the box, and the row it stretches, keep their
 * height when the map is drawn (src/features/posting/map/map-frame.tsx).
 */
const MAP_CODE = /\/assets\/(?:map-preview|leaflet|leaflet-src)-[^/]*\.js(?:\?|$)/;

/** Scratch ads only; the maker's afterEach also reaps photos on a timed-out test. */
test.describe("AD PAGE — a late part holds its box (INC-940)", () => {
  const { scratchSeller, seed, publicIdOf, cleanup } = adPageFixtures();
  test.afterEach(async () => {
    await cleanup();
  });

  test("ALS-1 the Location box keeps its height when the still map arrives", async ({ page }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active", { pin: true });
    const exact = await adminClient()
      .from("listings")
      .update({ pin_precision: "exact", pin_show_lat: 8.9876543, pin_show_lng: 38.7612345 })
      .eq("id", ad.id);
    expect(exact.error).toBeNull();
    let release = () => undefined as void;
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    let heldCount = 0;
    await page.route(
      MAP_CODE,
      whilePageLives(async (route) => {
        heldCount += 1;
        await held;
        await route.fallback();
      }),
    );
    await gotoReady(page, listingPath(ad.title, await publicIdOf(ad.id)));
    const location = page.getByTestId("listing-detail-location");
    await location.scrollIntoViewIfNeeded();
    const targets = { location, safety: page.getByTestId("listing-safety") };
    const before = await layoutBoxes(targets);
    expect(heldCount, "the map's code was asked for and held").toBeGreaterThan(0);
    release();
    // The map is drawn: Leaflet opened it at its zoom (map-preview.tsx sets data-zoom with the credit).
    await expect(page.getByTestId("listing-map-pin")).toHaveAttribute("data-zoom", /\d/);
    const after = await layoutBoxes(targets);
    expect(Math.abs(after.location.height - before.location.height)).toBeLessThanOrEqual(0.5);
    expect(Math.abs(after.safety.y - before.safety.y)).toBeLessThanOrEqual(0.5);
  });
});
