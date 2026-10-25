import type { Page } from "@playwright/test";

import { expect, test } from "./fixtures";

import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";
import { gotoReady } from "./helpers/ui";

/**
 * DEC-258 (Foundations turn 30) — THE STRINGS LAYERS IN THE BROWSER. Every
 * page's first download carries only the base strings; a page whose route
 * declares a layer (staticData.strings) loads that layer's chunks and draws
 * its text once they are in. Read-only: no rows are written.
 */

/** The strings layers' chunks the page asks for, by name ("en-member", "am-admin", …). */
function layerChunks(page: Page): string[] {
  const asked: string[] = [];
  page.on("request", (request) => {
    const name = new URL(request.url()).pathname.split("/").pop() ?? "";
    const layer = /^((?:en|am)-(?:member|admin))-[^/]+\.js$/.exec(name);
    if (layer) asked.push(layer[1] as string);
  });
  return asked;
}

test.describe("STRINGS LAYERS — what a page's first download carries (DEC-258)", () => {
  test("SLE-1 the listings page asks for no strings layer", async ({ page }) => {
    const asked = layerChunks(page);
    await gotoReady(page, "/");
    await expect(page.locator('[data-testid="feed-container"][data-ready="1"]')).toBeAttached();
    expect(asked).toEqual([]);
  });

  test("SLE-2 a page that declares the member layer draws its strings once they are in", async ({
    page,
  }) => {
    const asked = layerChunks(page);
    await gotoReady(page, "/dev/primitives");
    await expect(page.getByTestId("prim-fixture")).toContainText(en["prim.table.actions"]);
    await expect(page.getByTestId("strings-layer-waiting")).toHaveCount(0);
    expect(asked).toContain("en-member");
    expect(asked).not.toContain("en-admin");
  });

  test("SLE-3 in Amharic the listings page asks for no layer, and a member page draws the Amharic text", async ({
    page,
  }) => {
    const asked = layerChunks(page);
    await gotoReady(page, "/?lang=am");
    await expect(page.locator("html")).toHaveAttribute("lang", "am");
    await expect(page.locator('[data-testid="feed-container"][data-ready="1"]')).toBeAttached();
    expect(asked).toEqual([]);
    await gotoReady(page, "/dev/primitives?lang=am");
    await expect(page.getByTestId("prim-fixture")).toContainText(am["prim.table.actions"]);
    expect(asked).toEqual(expect.arrayContaining(["en-member", "am-member"]));
  });
});
