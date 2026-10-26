import { expect, test } from "./fixtures";

import { gotoReady } from "./helpers/ui";

/**
 * DEC-259 (Foundations turn 31) — THE OVERLAY PRIMITIVES IN THE BROWSER. The
 * tooltip's and the dropdown menu's code (Radix, floating-ui and their layers)
 * is not on any page's first download: the browser asks for it once the page
 * has loaded and is idle, or on a trigger's first intent, and the trigger the
 * person already sees answers that intent itself. Read-only: no rows are written.
 */

/** The overlay chunk's own name in the build: overlays-impl-<hash>.js. */
const OVERLAY_CHUNK = /\/overlays-impl-[^/]+\.js$/;

test.describe("OVERLAYS — their code after the first paint (DEC-259)", () => {
  test("OVE-1 the overlay code is asked for after the page's load event, never before its first paint", async ({
    page,
  }) => {
    await gotoReady(page, "/");
    await expect
      .poll(() =>
        page.evaluate(
          (source) =>
            performance
              .getEntriesByType("resource")
              .some((entry) => new RegExp(source).test(entry.name)),
          OVERLAY_CHUNK.source,
        ),
      )
      .toBe(true);
    const timing = await page.evaluate((source) => {
      const navigation = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;
      const chunk = performance
        .getEntriesByType("resource")
        .find((entry) => new RegExp(source).test(entry.name));
      return { loadEnd: navigation.loadEventEnd, asked: chunk?.startTime ?? -1 };
    }, OVERLAY_CHUNK.source);
    expect(timing.loadEnd).toBeGreaterThan(0);
    expect(timing.asked).toBeGreaterThanOrEqual(timing.loadEnd);
  });

  test("OVE-2 the language menu's first Enter opens it on the same button with a choice focused; Escape gives the focus back", async ({
    page,
  }) => {
    await gotoReady(page, "/");
    const trigger = page.getByTestId("language-switcher");
    await expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("menu")).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(":focus")).toHaveAttribute("role", "menuitemradio");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("menu")).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
