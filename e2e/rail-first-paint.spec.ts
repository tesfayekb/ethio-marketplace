import { expect, test } from "./fixtures";
import { whilePageLives } from "./helpers/route-guard";
import { gotoReady } from "./helpers/ui";

/**
 * INC-974 — THE RAIL'S NAMES ARE IN THE FIRST PAINT. The operator saw a blank left
 * rail for seconds on a first load: the rail drew only its skeleton until the tree
 * had been read after hydration AND the glyph map had downloaded. The server now
 * hands the rail its first-rail seed in the page itself, and each glyph fills its
 * own fixed box when the map lands (register row 60). Real categories are read
 * only (J2); nothing is written.
 */
const GLYPH_CODE = /\/assets\/category-glyphs-[^/]*\.js(?:\?|$)/;

test.describe("RAIL — names at first paint (INC-974)", () => {
  test("RFP-1 the server's HTML already holds the rail's category rows, no skeleton held", async ({
    page,
    baseURL,
  }) => {
    const answer = await page.request.get(new URL("/", baseURL).toString());
    expect(answer.status()).toBe(200);
    const html = await answer.text();
    expect(html).toContain('data-rail-ready="1"');
    expect(html).toMatch(/data-testid="(?:rail|strip)-category-[a-z0-9-]+"/);
  });

  test("RFP-2 the first row keeps its box when the glyph map arrives late", async ({ page }) => {
    let release = () => undefined as void;
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route(
      GLYPH_CODE,
      whilePageLives(async (route) => {
        await held;
        await route.continue();
      }),
    );
    await gotoReady(page, "/");
    const firstRow = page.locator('[data-rail-ready="1"]:visible li').first();
    await expect(firstRow).toBeVisible();
    await expect(firstRow.getByTestId("rail-glyph-box")).toHaveCount(1);
    const before = await firstRow.boundingBox();
    release();
    await expect(firstRow.getByTestId("rail-glyph-box")).toHaveCount(0);
    await expect(firstRow.locator("svg").first()).toBeVisible();
    const after = await firstRow.boundingBox();
    expect(after).toEqual(before);
  });
});
