import type { Page } from "@playwright/test";

import { expect, test } from "./fixtures";

import { adPageFixtures } from "./helpers/ad-page";
import { gotoReady, signInViaSession, signedInMarker } from "./helpers/ui";
import { leaseUser } from "./helpers/users";
import { listingPath } from "../src/features/ad-page/address";

/**
 * DEC-261 (Foundations turn 34) — THE CLIENT'S DOOR IN THE BROWSER. A signed-out
 * visitor's public pages download no Supabase client: no script the page fetches
 * carries the client's auth class (the build guard's marker, scripts/bundle-closure.mjs
 * MUST_NOT_CARRY). The sign-in screen fetches it once it has painted, and a signed-in
 * visitor's stored session starts it at once.
 *
 * An E2E build hands the client to the harness at mount (app-shell.tsx, DEC-018); the
 * init script's `__ethioClientOff` turns that hand-off off, so these tests see what a
 * production visitor's browser does. Scratch rows only (G27): a scratch seller, its own
 * category branch and one scratch ad, reaped in afterEach.
 */

const CLIENT_MARKER = "GoTrueClient";

/** Every script the page fetches, with whether its text carries the client. */
function watchScripts(page: Page) {
  const reads: Array<Promise<{ url: string; carries: boolean }>> = [];
  page.on("response", (response) => {
    if (response.request().resourceType() !== "script") return;
    reads.push(
      response.text().then(
        (text) => ({ url: response.url(), carries: text.includes(CLIENT_MARKER) }),
        () => ({ url: response.url(), carries: false }),
      ),
    );
  });
  return {
    async carriers(): Promise<string[]> {
      const all = await Promise.all(reads);
      return all.filter((read) => read.carries).map((read) => read.url);
    },
  };
}

/** The page has loaded and the browser has had an idle moment (a deferred fetch has started). */
async function settle(page: Page) {
  await page.waitForLoadState("load");
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        if ("requestIdleCallback" in window)
          window.requestIdleCallback(() => resolve(), { timeout: 2000 });
        else setTimeout(resolve, 500);
      }),
  );
}

test.describe("THE CLIENT'S DOOR — the Supabase client off public pages (DEC-261)", () => {
  const { scratchSeller, seed, publicIdOf, cleanup } = adPageFixtures();
  test.afterEach(async () => {
    await cleanup();
  });

  test("SBE-1 signed out: the home, a category, an ad and the terms download no client; the sign-in screen then fetches it", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active");
    const canonical = listingPath(ad.title, await publicIdOf(ad.id));
    await page.addInitScript(() => {
      Object.assign(window, { __ethioClientOff: true });
    });
    const scripts = watchScripts(page);
    for (const path of ["/", `/c/${seller.leafSlug}`, canonical, "/terms"]) {
      await gotoReady(page, path);
      await settle(page);
      expect(await scripts.carriers(), `${path}: no script carries the client`).toEqual([]);
    }
    // The ad page drew for a signed-out visitor through the door (its title and its sign-in link).
    await gotoReady(page, canonical);
    await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
    await page.getByTestId("listing-contact-sign-in").click();
    await expect(page).toHaveURL(/\/auth(?:\?|$)/);
    await expect
      .poll(async () => (await scripts.carriers()).length, {
        message: "the sign-in screen fetched the client",
      })
      .toBeGreaterThan(0);
  });

  test("SBE-2 signed in: the stored session starts the client and the header shows the account", async ({
    page,
  }) => {
    const user = await leaseUser();
    await page.addInitScript(() => {
      Object.assign(window, { __ethioClientOff: true });
    });
    const scripts = watchScripts(page);
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
    expect((await scripts.carriers()).length, "the client was fetched").toBeGreaterThan(0);
  });
});
