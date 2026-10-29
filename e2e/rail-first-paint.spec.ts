import { expect, test } from "./fixtures";
import { whilePageLives } from "./helpers/route-guard";
import { gotoReady, layoutBoxes } from "./helpers/ui";

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

  test("RFP-2 the first row keeps its box when the glyph map arrives late", async ({
    page,
    baseURL,
  }) => {
    // J5: the row is named, not taken by position — the slug of the first row the server drew.
    const html = await (await page.request.get(new URL("/", baseURL).toString())).text();
    const slug = /data-testid="(?:rail|strip)-category-([a-z0-9-]+)"/.exec(html)?.[1];
    if (slug === undefined) throw new Error("RFP-2: the server drew no category row");
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
    const phone = (page.viewportSize()?.width ?? 1280) < 768;
    const firstRow = page
      .getByTestId(phone ? "rail-strip" : "app-rail")
      .locator(`[data-testid$="-category-${slug}"]`);
    await expect(firstRow).toBeVisible();
    await expect(firstRow.getByTestId("rail-glyph-box")).toHaveCount(1);
    const before = await layoutBoxes({ row: firstRow });
    release();
    await expect(firstRow.getByTestId("rail-glyph-box")).toHaveCount(0);
    await expect(firstRow.locator("svg")).not.toHaveCount(0);
    const after = await layoutBoxes({ row: firstRow });
    expect(after).toEqual(before);
  });
});
