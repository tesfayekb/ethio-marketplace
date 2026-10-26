import type { Page } from "@playwright/test";

import { expect, test } from "./fixtures";

import { adPageFixtures } from "./helpers/ad-page";
import { openAfterTheOneReload, refuseScripts } from "./helpers/on-demand";
import {
  authFields,
  gotoReady,
  signInMarker,
  signInViaSession,
  signedInMarker,
} from "./helpers/ui";
import { leaseUser } from "./helpers/users";
import { listingPath } from "../src/features/ad-page/address";
import { en } from "../src/i18n/locales/en";

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
 *
 * DEC-266 (INC-913) — SBE-3: the browser hydrates the server's first screen once React has
 * placed it, so a signed-in visitor's settling state (the session, the member strings) never
 * makes React draw the listings again: one copy of each card, the server's own. INC-915 —
 * SBE-4, SBE-5: a client whose download fails leaves the sign-in and the reset forms answering,
 * never stuck and never claiming a link was sent. A failed chunk first reloads the tab once
 * (src/lib/stale-chunk.ts, INC-640); both wait for that reload before they type.
 */

const CLIENT_MARKER = "GoTrueClient";

/**
 * Every script the page fetches, with whether its text carries the client; a body that cannot
 * be read is never counted clean (the reviewer of turn 34).
 */
function watchScripts(page: Page) {
  const reads: Array<Promise<{ url: string; carries: boolean | null }>> = [];
  page.on("response", (response) => {
    if (response.request().resourceType() !== "script") return;
    reads.push(
      response.text().then(
        (text) => ({ url: response.url(), carries: text.includes(CLIENT_MARKER) }),
        () => ({ url: response.url(), carries: null }),
      ),
    );
  });
  return {
    async carriers(): Promise<string[]> {
      const all = await Promise.all(reads);
      return all.filter((read) => read.carries !== false).map((read) => read.url);
    },
  };
}

/** Every database function a page calls, with its answer's status (the door's anonymous path). */
function watchRpcs(page: Page) {
  const calls: Array<{ name: string; status: number }> = [];
  page.on("response", (response) => {
    const match = /\/rest\/v1\/rpc\/([^?]+)/.exec(response.url());
    if (match) calls.push({ name: match[1] ?? "", status: response.status() });
  });
  return { calls: () => [...calls] };
}

/** Every script that carries the client is refused, as a dropped download on a phone. */
async function refuseClientDownload(page: Page) {
  await refuseScripts(page, (_url, text) => text.includes(CLIENT_MARKER));
}

/** The page has loaded and the browser has had an idle moment (a deferred fetch has started). */
async function settle(page: Page) {
  await page.waitForLoadState("load");
  await page.waitForLoadState("networkidle");
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
    const rpcs = watchRpcs(page);
    for (const path of ["/", `/c/${seller.leafSlug}`, canonical, "/terms"]) {
      await gotoReady(page, path);
      await settle(page);
      expect(await scripts.carriers(), `${path}: no script carries the client`).toEqual([]);
    }
    // The door answered them without the client: its anonymous calls reached the database and succeeded.
    expect(rpcs.calls().length, "the pages called the database through the door").toBeGreaterThan(
      0,
    );
    expect(rpcs.calls().filter((call) => call.status >= 400)).toEqual([]);
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

  test("SBE-3 signed in: a listings page draws each card once and keeps the server's (DEC-266, INC-913)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    await seed(seller, "active");
    const visitor = await leaseUser();
    await page.addInitScript(() => {
      Object.assign(window, { __ethioClientOff: true });
      // The most copies of a card the page ever held, and the first card as the server drew it.
      const most = { cards: 0 };
      Reflect.set(window, "__mostCards", most);
      new MutationObserver(() => {
        const cards = document.querySelectorAll('[data-testid="listing-card"]').length;
        if (cards > most.cards) most.cards = cards;
      }).observe(document, { childList: true, subtree: true });
      document.addEventListener("DOMContentLoaded", () => {
        Reflect.set(window, "__firstCard", document.querySelector('[data-testid="listing-card"]'));
      });
    });
    await signInViaSession(page, visitor.email, visitor.password);
    await gotoReady(page, `/c/${seller.leafSlug}`);
    await expect(page.locator('[data-testid="feed-container"][data-ready="1"]')).toBeAttached();
    await expect(page.getByTestId("listing-card")).toHaveCount(1);
    await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
    const seen = await page.evaluate(() => {
      const first: unknown = Reflect.get(window, "__firstCard");
      const most: unknown = Reflect.get(window, "__mostCards");
      return {
        most: most !== null && typeof most === "object" ? Reflect.get(most, "cards") : -1,
        kept:
          first instanceof Element &&
          first === document.querySelector('[data-testid="listing-card"]'),
      };
    });
    expect(seen.most, "the page never held two copies of the card").toBe(1);
    expect(seen.kept, "the browser kept the card the server drew").toBe(true);
  });

  test("SBE-4 signed out, the client's download fails: the sign-in form says so and its button works again (INC-915)", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Object.assign(window, { __ethioClientOff: true });
    });
    await refuseClientDownload(page);
    const loads = await openAfterTheOneReload(page, "/auth");
    const { email, password, submit } = authFields(page);
    await email.fill("nobody@example.test");
    await password.fill("not-a-real-password-1");
    await submit.click();
    await expect(page.getByTestId("auth-error")).toHaveText(en["common.loadFailed"]);
    await expect(submit).toBeEnabled();
    expect(loads(), "one reload, never a second").toBe(2);
  });

  test("SBE-6 signed in, the client's download fails: the visitor is unknown, never signed out — no Sign in, the notice offers Refresh, and Settings shows its error view, never the sign-in page (INC-914)", async ({
    page,
  }) => {
    const user = await leaseUser();
    await signInViaSession(page, user.email, user.password);
    await refuseClientDownload(page);
    await openAfterTheOneReload(page, "/");
    await expect(page.getByTestId("on-demand-failed")).toBeVisible();
    await expect(page.getByTestId("on-demand-refresh")).toBeVisible();
    await expect(signInMarker(page), "a signed-in visitor is never shown Sign in").toHaveCount(0);
    await expect(signedInMarker(page)).toHaveCount(0);
    await page.goto("/settings");
    await expect(page.getByTestId("route-error-refresh")).toBeVisible();
    await expect(page, "never sent to the sign-in page").toHaveURL(/\/settings$/);
    await expect(page.getByText(en["common.tryAgain"])).toHaveCount(0);
  });

  test("SBE-5 signed out, the client's download fails: Forgot password says it failed, sends no false word, and gives the try back (INC-915)", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Object.assign(window, { __ethioClientOff: true });
    });
    await refuseClientDownload(page);
    const loads = await openAfterTheOneReload(page, "/auth?view=forgot");
    await page.locator("#reset-email").fill("nobody@example.test");
    const send = page.getByRole("button", { name: en["auth.resetSend"] });
    await send.click();
    await expect(page.getByTestId("auth-reset-error")).toHaveText(en["common.loadFailed"]);
    await expect(page.getByText(en["auth.resetNeutral"])).toHaveCount(0);
    // The request never left the browser: no cooldown, so the button asks again at once.
    await expect(send).toBeEnabled();
    await expect(send).toHaveText(en["auth.resetSend"]);
    expect(loads(), "one reload, never a second").toBe(2);
  });
});
