import { expect, test } from "./fixtures";

import { gotoReady } from "./helpers/ui";

/**
 * DEC-262 (Foundations turn 33) — THE DEVICE'S OWN FONTS IN THE BROWSER. A page
 * asks for no font: no request reaches a web-font host and none is for a font
 * file, and the body and the display face (the header's wordmark, as every
 * heading) draw with the device's stack from src/styles.css. Read-only: no rows
 * are written.
 */

/** A request for a font: by the browser's own resource type, by host or by file name. */
const FONT_REQUEST =
  /fonts\.googleapis\.com|fonts\.gstatic\.com|\.(?:woff2?|ttf|otf|eot)(?:[?#]|$)/i;

/** The start of --font-sans in src/styles.css (CF-FT-2 pins the whole stack). */
const DEVICE_STACK = /^-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,/;

test.describe("FONTS — the device's own (DEC-262)", () => {
  test("FTE-1 the home page and the terms page ask for no font and draw with the device's stack", async ({
    page,
  }) => {
    const asked: string[] = [];
    page.on("request", (request) => {
      if (request.resourceType() === "font" || FONT_REQUEST.test(request.url()))
        asked.push(request.url());
    });
    for (const path of ["/", "/terms"]) {
      await gotoReady(page, path);
      const families = await page.evaluate(() => {
        const wordmark = document.querySelector('[data-testid="logo-wordmark"]');
        return {
          body: getComputedStyle(document.body).fontFamily,
          display: wordmark === null ? null : getComputedStyle(wordmark).fontFamily,
        };
      });
      expect(families.body, `${path}: the body`).toMatch(DEVICE_STACK);
      expect(families.display, `${path}: the wordmark (font-display)`).toMatch(DEVICE_STACK);
    }
    expect(asked, "no font was asked for").toEqual([]);
  });
});
