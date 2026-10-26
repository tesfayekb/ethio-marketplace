import { expect, test } from "./fixtures";

import { openAfterTheOneReload, refuseScripts } from "./helpers/on-demand";
import { en } from "../src/i18n/locales/en";

/**
 * INC-911 / INC-918 (Foundations turn 34b-2) — A PIECE FETCHED ON DEMAND THAT FAILS TO DOWNLOAD
 * TELLS THE PERSON AND OFFERS THE ONE CURE. A menu's code (the overlay primitives,
 * src/components/ui/overlay-loader.ts) is refused, as a dropped download on a phone. The app
 * reloads once for a failed chunk (src/lib/stale-chunk.ts, INC-640); the failure that remains is
 * the browser's for the page's life, so the menu's press asks in vain: the shell's one notice
 * (src/components/shell/on-demand-notice.tsx) says part of the page did not load and offers to
 * refresh, the page stays whole, Close puts the notice away, and Refresh reads the page afresh.
 * No rows: the home page as a signed-out visitor sees it.
 */

const OVERLAYS_CHUNK = /\/overlays-impl-[^/]*\.js(?:\?|$)/;

test.describe("ON-DEMAND FAILURE — a failed download says so and offers a refresh (INC-911)", () => {
  test("ODE-1 a menu whose code cannot download: the notice says so, the page stays, Close hides it and Refresh reloads", async ({
    page,
  }) => {
    await refuseScripts(page, (url) => OVERLAYS_CHUNK.test(url));
    const loads = await openAfterTheOneReload(page, "/");
    const trigger = page.getByTestId("location-level-country");
    await expect(trigger).toBeVisible();
    await expect(page.getByTestId("on-demand-failed")).toHaveCount(0);

    await trigger.click();
    const notice = page.getByTestId("on-demand-failed");
    await expect(notice).toBeVisible();
    await expect(notice).toContainText(en["common.loadFailed"]);
    await expect(page.getByTestId("on-demand-refresh")).toHaveText(en["common.refreshPage"]);
    await expect(page.getByRole("menu")).toHaveCount(0);
    await expect(trigger, "the page stays whole: no route error screen").toBeVisible();
    expect(loads(), "the press asked no reload of its own").toBe(2);

    await page.getByTestId("on-demand-close").click();
    await expect(notice).toHaveCount(0);

    await trigger.click();
    await expect(notice, "a later failure shows the notice again").toBeVisible();
    await page.getByTestId("on-demand-refresh").click();
    await expect.poll(loads, { message: "Refresh reads the page afresh" }).toBe(3);
  });
});
