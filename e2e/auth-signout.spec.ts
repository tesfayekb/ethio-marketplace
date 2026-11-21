import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";

import {
  authFields,
  expectActivePanel,
  fillUntilStable,
  gotoReady,
  isMobile,
  layoutBoxes,
  openRailScope,
  signIn,
  signInViaSession,
  signInMarker,
  signOutViaUi,
  signedInMarker,
  switchLanguage,
  waitForHydration,
} from "./helpers/ui";
import {
  besideSessionKey,
  editStoredSession,
  forgetStoredSession,
  injectSession,
  passwordGrant,
  readStoredSession,
  sessionsIn,
  storageKey,
  supabaseNamesIn,
} from "./helpers/session";
import { inBrowserClient } from "./helpers/browser-client";
import { adminClient, leaseUser, grantRole } from "./helpers/users";

/**
 * U0j — sign-out is a HARD RESET (INC-072), repaired in U0j-2.
 *
 * The law under test: a confirmed sign-out clears the session, purges the
 * permission cache, resets the shell to the marketplace and replace-navigates
 * to "/", and NO gated UI stays rendered on any viewport.
 *
 * SO-3 proves the gate is LIVE (subscribed), not a mount-only check, by calling
 * the APP'S OWN supabase client in the page (`window.__ethioSupabase`, exposed
 * only under `import.meta.env.DEV`). The earlier synthetic-`StorageEvent`
 * mechanism was RETIRED: supabase-js only reacts to storage events raised by
 * ANOTHER tab, so a same-tab synthetic event never emits SIGNED_OUT and the
 * test proved nothing. SO-3b keeps the reload path (mount-time guard) as a
 * separate, explicitly labelled case.
 */

async function expectSignedOutMarketplace(page: Page) {
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByTestId("admin-panel-root")).toHaveCount(0);
  await expect(page.getByTestId("panel-tab-admin")).toHaveCount(0);
  await expect(page.getByRole("button", { name: en["shell.accountMenu"] })).toHaveCount(0);
  await expect(page.getByRole("link", { name: en["auth.signIn"] })).toBeVisible();
}

test.describe("U0j sign-out hard reset", () => {
  test("SO-1 admin: one click signs out and resets to the marketplace", async ({ page }) => {
    const user = await leaseUser();
    await grantRole(user.id, "super_admin");

    await signIn(page, user.email, user.password);
    await gotoReady(page, "/admin");
    await expect(page.getByTestId("admin-panel-root")).toBeVisible();

    // U0k — ONE CLICK. No dialog exists any more; the affordance IS the reset.
    await signOutViaUi(page);

    await expectSignedOutMarketplace(page);
    await expect(page.getByTestId("sign-out-dialog")).toHaveCount(0);
    if (isMobile(page)) {
      await expectActivePanel(page, "marketplace");
    } else {
      await expect(page.getByTestId("panel-header-title")).toHaveText(en["panel.marketplace"]);
    }

    // Back must not re-enter a gated page (replace-navigation).
    await page.goBack();
    await expect(page.getByTestId("admin-panel-root")).toHaveCount(0);
  });

  test("SO-2 settings: confirmed sign-out empties the gated surface", async ({ page }) => {
    const user = await leaseUser();

    await signIn(page, user.email, user.password);
    await gotoReady(page, "/settings");

    await signOutViaUi(page);

    await expectSignedOutMarketplace(page);
    await expect(page.getByRole("heading", { name: en["settings.title"] })).toHaveCount(0);
  });

  test("SO-3 live guard: a same-tab client sign-out evacuates /admin", async ({ page }) => {
    const user = await leaseUser();
    await grantRole(user.id, "super_admin");

    await signIn(page, user.email, user.password);
    await gotoReady(page, "/admin");
    await expect(page.getByTestId("admin-panel-root")).toBeVisible();

    // MECHANISM: the app's own client, no UI involved — this emits a real
    // SIGNED_OUT on onAuthStateChange, which only the LIVE guard can react to.
    await inBrowserClient(page, async (client) => {
      await client.auth.signOut({ scope: "local" });
    });

    await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
    await expect(page.getByTestId("admin-panel-root")).toHaveCount(0);
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
  });

  test("SO-3b reload path: a cleared token means /admin never renders on mount", async ({
    page,
  }) => {
    const user = await leaseUser();
    await grantRole(user.id, "super_admin");

    await signIn(page, user.email, user.password);
    await gotoReady(page, "/admin");
    await expect(page.getByTestId("admin-panel-root")).toBeVisible();

    // Distinct from SO-3: no live transition, the session is simply gone when
    // the gated route mounts again.
    await forgetStoredSession(page);
    await page.reload();

    await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
    await expect(page.getByTestId("admin-panel-root")).toHaveCount(0);
  });

  test("SO-4 signed-out marketplace carries no gated UI", async ({ page }) => {
    const user = await leaseUser();
    await grantRole(user.id, "super_admin");

    await signIn(page, user.email, user.password);
    await gotoReady(page, "/admin");
    await signOutViaUi(page);
    await expectSignedOutMarketplace(page);

    // Unified: openRailScope owns BOTH viewports (drawer on mobile, rail on desktop).
    const scope = await openRailScope(page);
    await expect(scope.getByTestId("rail-sign-out")).toHaveCount(0);
    await expect(scope.getByText(en["admin.nav.label"], { exact: true })).toHaveCount(0);
    await expect(scope.getByText(en["panel.account"], { exact: true })).toHaveCount(0);

    // U1g-2 (INC-078 addendum) — STRUCTURAL PURGE PROOF: not one auth-derived
    // query survives the hard reset, whichever feature added it.
    // U1g-3: a 500ms settle so the read happens after React has flushed the
    // unmount of the session-only observers — the assertion itself stays strict.
    // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: deliberate wall-clock wait (rate-limit / session-expiry semantics), grandfathered pending a truth poll
    await page.waitForTimeout(500);
    const survivors = await page.evaluate(() => {
      const client = (
        window as unknown as {
          __ethioQueryClient?: { getQueryCache: () => { getAll: () => { queryKey: unknown[] }[] } };
        }
      ).__ethioQueryClient;
      if (!client) return ["__no_query_client__"];
      return client
        .getQueryCache()
        .getAll()
        .filter((q) => q.queryKey?.[0] === "auth-derived")
        .map((q) => JSON.stringify(q.queryKey));
    });
    expect(survivors, "auth-derived queries survived the hard reset").toEqual([]);
  });

  test("SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268)", async ({
    page,
  }) => {
    // supabase-js retries a refused token refresh with back-off for up to about 30 s before
    // the sign-out answers (auth-js GoTrueClient's refresh retry): that wait is this test's time.
    test.setTimeout(120_000);
    const user = await leaseUser();
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/settings");
    // INC-928 — the signed-in page is drawn before its session goes stale: made stale while the
    // page's first session read was still pending, the visitor read as signed out before the click
    // (turn 34w's local runs; that reading is INC-914's, turn 34c).
    await expect(
      isMobile(page)
        ? page.getByTestId("account-menu")
        : page.getByTestId("app-rail").getByTestId("rail-sign-out"),
    ).toBeVisible();
    // The access token has run out and the auth server cannot be reached.
    await page.route("**/auth/v1/**", (route) => route.abort("failed"));
    await editStoredSession(page, (session) => ({
      ...session,
      expires_at: Math.floor(Date.now() / 1000) - 3600,
    }));
    if (isMobile(page)) {
      await page.getByTestId("account-menu").click();
      await page.getByTestId("account-menu-sign-out").click();
    } else {
      await page.getByTestId("app-rail").getByTestId("rail-sign-out").click();
    }
    await expect(page).toHaveURL(/\/$/, { timeout: 60_000 });
    await expect(signInMarker(page)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
    expect(await sessionsIn(page), "no project's stored session is left on this device").toEqual(
      [],
    );
    // The network is back: a fresh load of the page is still signed out.
    await page.unrouteAll({ behavior: "ignoreErrors" });
    await gotoReady(page, "/");
    await expect(signInMarker(page)).toBeVisible();
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
  });

  test("SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271)", async ({
    page,
  }) => {
    const user = await leaseUser();
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    if (isMobile(page)) {
      // The account menu's code arrives on its first opening: open it once while online.
      await page.getByTestId("account-menu").click();
      await expect(page.getByTestId("account-menu-sign-out")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByTestId("account-menu-sign-out")).toHaveCount(0);
    }
    let loads = 0;
    page.on("load", () => {
      loads += 1;
    });
    await page.context().setOffline(true);
    if (isMobile(page)) {
      await page.getByTestId("account-menu").click();
      await page.getByTestId("account-menu-sign-out").click();
    } else {
      await page.getByTestId("app-rail").getByTestId("rail-sign-out").click();
    }
    // The site stays on screen, signed out — not the browser's own "cannot open" page.
    await expect(signInMarker(page)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
    await expect(page).toHaveURL(/\/$/);
    expect(loads, "no load is tried while offline").toBe(0);
    expect(await sessionsIn(page), "no project's stored session is left on this device").toEqual(
      [],
    );
    // The connection returns: the page loads afresh, still signed out.
    await page.context().setOffline(false);
    await expect
      .poll(() => loads, { message: "the page loads afresh when the connection returns" })
      .toBe(1);
    await waitForHydration(page);
    await expect(signInMarker(page)).toBeVisible();
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
  });

  test("SO-13 an offline sign-out from a page opened directly lands on a working Home page (DEC-279, INC-930)", async ({
    page,
  }) => {
    // The tab opens on /settings and never visits "/": only the code fetched ahead of time for a
    // signed-in visitor (src/lib/sign-out-landing.ts) can draw the Home page once the device is
    // offline. Without it the root's "This page didn't load" view showed until the connection
    // returned (INC-930).
    const user = await leaseUser();
    await injectSession(page, await passwordGrant(user.email, user.password));
    await gotoReady(page, "/settings");
    await expect(
      isMobile(page)
        ? page.getByTestId("account-menu")
        : page.getByTestId("app-rail").getByTestId("rail-sign-out"),
    ).toBeVisible({ timeout: 15_000 });
    await expect
      .poll(
        () =>
          page.evaluate(
            () => (window as unknown as { __ethioHomeAhead?: string }).__ethioHomeAhead ?? "idle",
          ),
        { message: "the Home page's code is fetched ahead of time for a signed-in visitor" },
      )
      .toBe("ready");
    if (isMobile(page)) {
      // INC-960 (Foundations turn C2, ruling 3) — the account menu draws from the overlays module,
      // which every page warms at idle; the E2E build reports its arrival, so the phone leg opens
      // the menu for the first time only once offline: no online opening brings its code here.
      await expect
        .poll(() => page.evaluate(() => window.__ethioMenuAhead ?? "idle"), {
          message: "the account menu's code has arrived by the overlays' warm-up",
        })
        .toBe("ready");
    }
    let loads = 0;
    page.on("load", () => {
      loads += 1;
    });
    await page.context().setOffline(true);
    if (isMobile(page)) {
      await page.getByTestId("account-menu").click();
      await page.getByTestId("account-menu-sign-out").click();
    } else {
      await page.getByTestId("app-rail").getByTestId("rail-sign-out").click();
    }
    // Home is drawn by its own code, signed out — not the root's "This page didn't load" view.
    await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });
    await expect(page.getByTestId("feed-container")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("route-error-refresh")).toHaveCount(0);
    await expect(signInMarker(page)).toBeVisible();
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
    expect(loads, "no load is tried while offline").toBe(0);
    expect(await sessionsIn(page), "no project's stored session is left on this device").toEqual(
      [],
    );
    // The connection returns: the page loads afresh, still signed out (DEC-271).
    await page.context().setOffline(false);
    await expect
      .poll(() => loads, { message: "the page loads afresh when the connection returns" })
      .toBe(1);
    await waitForHydration(page);
    await expect(signInMarker(page)).toBeVisible();
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
  });
});

/**
 * U0k — SESSION POLICY. The real limits are minutes/hours, so the specs drive
 * the DEV-only override (window.__ethioSessionPolicy, same guard as the
 * supabase test hook) via addInitScript, which lands before any app code runs.
 */
async function overridePolicy(
  page: Page,
  policy: { idleMs?: number; warnMs?: number; absoluteMs?: number },
) {
  await page.addInitScript((p) => {
    (window as unknown as { __ethioSessionPolicy?: unknown }).__ethioSessionPolicy = p;
  }, policy);
}

/**
 * INC-223 — the policy clocks are localStorage stamps keyed on the project ref,
 * exactly like the supabase token (see src/features/session/session-policy.ts).
 */
function policyKeys() {
  return {
    lastActivityAt: besideSessionKey("last-activity-at"),
    sessionStartedAt: besideSessionKey("session-started-at"),
    sessionRef: besideSessionKey("session-ref"),
    authToken: storageKey(),
  };
}

/** Plants a PREVIOUS session's clocks, before any app code runs. */
async function seedStaleClocks(page: Page, ageMs: number) {
  await page.addInitScript(
    ({ keys, ageMs: age }: { keys: ReturnType<typeof policyKeys>; ageMs: number }) => {
      const w = window as unknown as { __inc223Seeded?: boolean };
      if (w.__inc223Seeded) return;
      w.__inc223Seeded = true;
      const stale = String(Date.now() - age);
      localStorage.setItem(keys.lastActivityAt, stale);
      localStorage.setItem(keys.sessionStartedAt, stale);
      localStorage.setItem(keys.sessionRef, "previous-session");
    },
    { keys: policyKeys(), ageMs },
  );
}

async function readStamps(page: Page) {
  return page.evaluate((keys) => {
    const token = localStorage.getItem(keys.authToken);
    const parsed = token
      ? (JSON.parse(token) as {
          access_token?: string;
          expires_at?: number;
          expires_in?: number;
        })
      : null;
    // U6-C1-R3a — the live ref is the JWT `session_id` claim (stable across a
    // token refresh), with the old issuance stamp kept only as the fallback the
    // app itself uses when the payload cannot be read.
    const sessionId = (() => {
      const payload = parsed?.access_token?.split(".")[1];
      if (payload === undefined) return null;
      try {
        const claims = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))) as {
          session_id?: unknown;
        };
        return typeof claims.session_id === "string" && claims.session_id !== ""
          ? claims.session_id
          : null;
      } catch {
        return null;
      }
    })();
    return {
      lastActivityAt: localStorage.getItem(keys.lastActivityAt),
      sessionStartedAt: localStorage.getItem(keys.sessionStartedAt),
      sessionRef: localStorage.getItem(keys.sessionRef),
      liveRef:
        sessionId ??
        (parsed && typeof parsed.expires_at === "number" && typeof parsed.expires_in === "number"
          ? String(parsed.expires_at - parsed.expires_in)
          : null),
    };
  }, policyKeys());
}

test.describe("U0k session policy", () => {
  test("SP-1 idle: the warning appears, then the session is hard-reset", async ({ page }) => {
    await overridePolicy(page, { idleMs: 4000, warnMs: 2500, absoluteMs: 600_000 });
    const user = await leaseUser();

    await signIn(page, user.email, user.password);
    await expect(page.getByTestId("session-idle-warning")).toBeVisible({ timeout: 15000 });

    // No interaction: the policy must finish the job on its own.
    await expect(page.getByTestId("account-menu")).toHaveCount(0, { timeout: 15000 });
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId("session-notice")).toBeVisible();
  });

  test("SP-2 stay signed in extends past the original deadline", async ({ page }) => {
    await overridePolicy(page, { idleMs: 6000, warnMs: 4000, absoluteMs: 600_000 });
    const user = await leaseUser();

    await signIn(page, user.email, user.password);
    await expect(page.getByTestId("session-idle-warning")).toBeVisible({ timeout: 15000 });
    await page.getByTestId("session-stay-signed-in").click();
    await expect(page.getByTestId("session-idle-warning")).toHaveCount(0);

    // Past the ORIGINAL deadline, still signed in.
    // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: deliberate wall-clock wait (rate-limit / session-expiry semantics), grandfathered pending a truth poll
    await page.waitForTimeout(4000);
    await expect(signedInMarker(page)).toBeVisible();
  });

  test("SP-3 absolute: continuous activity does not save the session", async ({ page }) => {
    await overridePolicy(page, { idleMs: 600_000, warnMs: 1000, absoluteMs: 5000 });
    const user = await leaseUser();

    await signIn(page, user.email, user.password);
    await page.evaluate(() => {
      window.setInterval(() => {
        window.dispatchEvent(new Event("pointerdown"));
      }, 500);
    });

    await expect(page.getByTestId("account-menu")).toHaveCount(0, { timeout: 20000 });
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId("session-notice")).toBeVisible();
  });

  test("SP-4 cross-tab: signing out in one tab evacuates the other", async ({ page, context }) => {
    const user = await leaseUser();
    await grantRole(user.id, "super_admin");

    await signIn(page, user.email, user.password);

    const other = await context.newPage();
    await gotoReady(other, "/admin");
    await expect(other.getByTestId("admin-panel-root")).toBeVisible({ timeout: 15000 });

    await signOutViaUi(page);

    await expect(other).toHaveURL(/\/$/, { timeout: 20000 });
    await expect(other.getByTestId("admin-panel-root")).toHaveCount(0);
    await expect(other.getByTestId("account-menu")).toHaveCount(0);
    await other.close();
  });

  /**
   * INC-223 — A PREVIOUS SESSION'S MARKER JUDGES NOTHING. Before the fix the
   * policy's synchronous first tick read these 3 h-old stamps and hard-reset a
   * correct sign-in with "Signed out for inactivity".
   */
  test("SP-6 stale stamps from a previous session never sign the new one out", async ({ page }) => {
    // Staff limits, stated explicitly: idle 30 min, absolute 12 h.
    await overridePolicy(page, {
      idleMs: 30 * 60_000,
      warnMs: 60_000,
      absoluteMs: 12 * 60 * 60_000,
    });
    await seedStaleClocks(page, 3 * 60 * 60_000);
    const user = await leaseUser();
    await grantRole(user.id, "super_admin");

    await signIn(page, user.email, user.password);

    // Ten seconds of the real policy clock: ten ticks, no expiry.
    for (let i = 0; i < 10; i += 1) {
      // eslint-disable-next-line no-restricted-syntax -- DEC-027: the subject IS elapsed policy time
      await page.waitForTimeout(1000);
      await expect(signedInMarker(page)).toBeVisible();
      await expect(page.getByTestId("session-notice")).toHaveCount(0);
      await expect(page.getByTestId("session-idle-warning")).toHaveCount(0);
    }

    const stamps = await readStamps(page);
    expect(stamps.liveRef, "no live session ref to key the clocks on").not.toBeNull();
    expect(stamps.sessionRef, "clocks still carry the previous session's ref").toBe(stamps.liveRef);
    expect(
      Date.now() - Number(stamps.sessionStartedAt),
      "the stale start stamp survived the sign-in",
    ).toBeLessThan(60_000);
  });

  test("SP-7 reload of a live session keeps its clocks (no silent extension)", async ({ page }) => {
    await overridePolicy(page, {
      idleMs: 30 * 60_000,
      warnMs: 60_000,
      absoluteMs: 12 * 60 * 60_000,
    });
    const user = await leaseUser();

    await signIn(page, user.email, user.password);
    const before = await readStamps(page);
    expect(before.sessionRef).toBe(before.liveRef);

    // eslint-disable-next-line no-restricted-syntax -- DEC-027: the stamps must differ if they were rewritten
    await page.waitForTimeout(2000);
    await page.reload();
    await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });

    const after = await readStamps(page);
    expect(after.sessionStartedAt, "the reload restarted the absolute window").toBe(
      before.sessionStartedAt,
    );
    expect(Number(after.lastActivityAt), "the reload reset the idle clock").toBeLessThan(
      Number(before.lastActivityAt) + 1500,
    );
    expect(after.sessionRef).toBe(before.sessionRef);
    await expect(page.getByTestId("session-notice")).toHaveCount(0);
  });

  /**
   * Turn W3 (the operator's walk, 2026-11-01) — the "Signed out for inactivity" notice on a phone
   * is docked on the bottom bar (src/components/shell/notice-dock.ts): from the phone strip's end
   * edge to the screen's end edge, its bottom on the bar's top, the Post disc painted over it.
   * One notice, read in both modes and two languages (it is the shell's state until a sign-in).
   */
  test("SP-8 the session notice on a phone is docked on the bottom bar, the Post disc over it", async ({
    page,
  }) => {
    test.skip(!isMobile(page), "the bottom bar is the phone's (below md)");
    await overridePolicy(page, { idleMs: 4000, warnMs: 2500, absoluteMs: 600_000 });
    const user = await leaseUser();

    await signIn(page, user.email, user.password);
    await expect(page.getByTestId("session-idle-warning")).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId("account-menu")).toHaveCount(0, { timeout: 15000 });
    const notice = page.getByTestId("session-notice");
    await expect(notice).toBeVisible();

    const html = page.locator("html");
    for (const [mode, code] of [
      ["light", "en"],
      ["dark", "en"],
      ["dark", "am"],
      ["light", "am"],
    ] as const) {
      if ((await html.getAttribute("data-mode")) !== mode)
        await page.getByTestId("theme-toggle").click();
      await expect(html).toHaveAttribute("data-mode", mode);
      if ((await html.getAttribute("lang")) !== code) await switchLanguage(page, code);
      await expect(notice, `${mode}/${code}: the notice is still shown`).toBeVisible();

      const boxes = await layoutBoxes({
        notice,
        bar: page.getByTestId("bottom-bar"),
        strip: page.getByTestId("rail-strip"),
        disc: page.getByTestId("bottom-bar-disc"),
      });
      const end = await page.evaluate(() => document.documentElement.clientWidth);
      const at = `${mode}/${code} ${JSON.stringify(boxes)}`;
      expect(
        Math.abs(boxes.notice.x - (boxes.strip.x + boxes.strip.width)),
        `${at}: starts at the strip's end edge`,
      ).toBeLessThanOrEqual(1);
      expect(
        Math.abs(boxes.notice.x + boxes.notice.width - end),
        `${at}: ends at the screen's end edge`,
      ).toBeLessThanOrEqual(1);
      expect(
        Math.abs(boxes.notice.y + boxes.notice.height - boxes.bar.y),
        `${at}: its bottom on the bar's top`,
      ).toBeLessThanOrEqual(1);

      const x = boxes.disc.x + boxes.disc.width / 2;
      const points: Array<[number, number]> = [
        [x, boxes.disc.y + boxes.disc.height / 2],
        [x, boxes.disc.y + 3],
      ];
      expect(boxes.disc.y + 3, `${at}: the second point lies over the notice`).toBeGreaterThan(
        boxes.notice.y,
      );
      expect(boxes.disc.y + 3).toBeLessThan(boxes.notice.y + boxes.notice.height);
      const hits = await page.evaluate((points) => {
        const disc = document.querySelector('[data-testid="bottom-bar-disc"]');
        return points.map(([px, py]) => {
          const hit = document.elementFromPoint(px, py);
          return hit !== null && disc !== null && disc.contains(hit);
        });
      }, points);
      expect(hits, `${at}: the Post disc is on top at its centre and 3 px below its top`).toEqual([
        true,
        true,
      ]);
    }
  });
});

test.describe("D189 deactivated session", () => {
  test("SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189)", async ({
    page,
  }) => {
    const user = await leaseUser();
    const admin = adminClient();
    try {
      await signInViaSession(page, user.email, user.password);
      await expect(page.getByTestId("account-menu")).toBeVisible({ timeout: 15000 });

      const closed = await admin
        .from("profiles")
        .update({ account_status: "deactivated" })
        .eq("user_id", user.id);
      expect(closed.error, "SO-8: the account could not be deactivated").toBeNull();

      await page.reload();
      await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
      await expect(page.getByTestId("account-menu")).toHaveCount(0);
      const stored = await supabaseNamesIn(page);
      expect(stored, "SO-8: the session survived the sign-out").toEqual([]);

      await page.goto("/auth");
      await expect(page.getByTestId("auth-deactivated")).toHaveCount(0);
    } finally {
      const reopened = await admin
        .from("profiles")
        .update({ account_status: "active" })
        .eq("user_id", user.id);
      expect(reopened.error, "SO-8: the account could not be reactivated").toBeNull();
    }
  });

  test("SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)", async ({
    page,
  }) => {
    const user = await leaseUser();
    const admin = adminClient();
    try {
      // Deactivate BEFORE signing in.
      const closed = await admin
        .from("profiles")
        .update({ account_status: "deactivated" })
        .eq("user_id", user.id);
      expect(closed.error, "SO-9: the account could not be deactivated").toBeNull();

      // Sign in through the FORM (not session injection).
      await page.goto("/auth");
      const { email: emailInput, password: passwordInput, submit } = authFields(page);
      await expect(emailInput, "sign-in form did not render").toBeEditable({ timeout: 15000 });
      await fillUntilStable(emailInput, user.email, "email");
      await fillUntilStable(passwordInput, user.password, "password");
      await submit.click();

      // The page must land on /auth with the deactivated reason, never the signed-in screen.
      await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
      await expect(page.getByTestId("account-menu")).toHaveCount(0);

      // The signed-in screen must NEVER have appeared: wait 1,500 ms — a menu that appears fails.
      await expect(page.getByTestId("account-menu"))
        .toBeVisible({ timeout: 1500 })
        .then(
          () => {
            throw new Error("SO-9: the signed-in screen appeared");
          },
          () => undefined,
        );

      // The session must be gone.
      const stored = await supabaseNamesIn(page);
      expect(stored, "SO-9: the session survived the sign-out").toEqual([]);
    } finally {
      const reopened = await admin
        .from("profiles")
        .update({ account_status: "active" })
        .eq("user_id", user.id);
      expect(reopened.error, "SO-9: the account could not be reactivated").toBeNull();
    }
  });

  test("SO-10 a signed-in tab's reload never shows the Sign in link before the account menu (INC-667)", async ({
    page,
  }) => {
    const user = await leaseUser();
    await signIn(page, user.email, user.password);
    await page.reload();

    // Sample every 50 ms until the menu is visible (at most 15 s). The link is
    // counted, not tested for visibility: on mobile-360 it is in the DOM, hidden by CSS.
    const signInLink = page.getByRole("link", { name: en["auth.signIn"], includeHidden: true });
    const menu = page.getByTestId("account-menu");
    let linkSamples = 0;
    await expect
      .poll(
        async () => {
          if ((await signInLink.count()) > 0) linkSamples += 1;
          return menu.isVisible();
        },
        { message: "SO-10: the account menu never appeared", timeout: 15000, intervals: [50] },
      )
      .toBe(true);
    expect(linkSamples, "SO-10: the Sign in link showed during the read").toBe(0);
    await expect(menu).toBeVisible();
  });
});

/**
 * F1-7d (INC-1218) — THE END OF A SESSION IS ONE STATE. However a session ends (a refresh the
 * server refuses, a session gone with no event, a sign-out in another tab), the tab says so once,
 * with the words that offer sign-in, and never "could not be loaded"; the sign-in after it sticks;
 * no poll keeps calling. Each end writes ONE console line, `[session] ended: <event> <code or
 * none> <seconds since this tab's last sign-in or none> <visibility>`, never a token.
 */
const LOAD_FAILED_TEXTS = Object.values(en).filter((text) =>
  /could(?:n't| not) be loaded/i.test(text),
);
const SESSION_END_LINE =
  /^\[session\] ended: (signOut|idle|absolute|signedOut|unauthorised) [A-Za-z0-9_]+ (\d+|none) (visible|hidden)$/;

async function loadFailedTextsOn(page: Page): Promise<string[]> {
  const body = await page.evaluate(() => document.body.innerText);
  return LOAD_FAILED_TEXTS.filter((text) => body.includes(text));
}

/** The calls the page makes from now on that answer 401, by method and path (never the query). */
function record401s(page: Page): string[] {
  const seen: string[] = [];
  page.on("response", (response) => {
    if (response.status() !== 401) return;
    seen.push(`${response.request().method()} ${new URL(response.url()).pathname}`);
  });
  return seen;
}

/** The calls the page makes from now on to one database function. */
function recordCalls(page: Page, fn: string): string[] {
  const seen: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname === `/rest/v1/rpc/${fn}`) seen.push(request.method());
  });
  return seen;
}

/** The page's session-end console lines from now on. */
function sessionEndLines(page: Page): string[] {
  const lines: string[] = [];
  page.on("console", (message) => {
    if (message.text().startsWith("[session] ended:")) lines.push(message.text());
  });
  return lines;
}

test.describe("F1-7d the end of a session", () => {
  test("SO-14 a refresh the server refuses ends the session once: the notice offers sign-in, nothing says it could not be loaded, and the sign-in after it sticks (INC-1218)", async ({
    page,
  }) => {
    test.setTimeout(150_000);
    const user = await leaseUser();
    await grantRole(user.id, "super_admin");
    const lines = sessionEndLines(page);
    await signIn(page, user.email, user.password);

    // The scratch account's every session is revoked, and this tab's session is made due: the
    // client's next refresh (its own 30 s tick, or the next read) is one the server refuses.
    const grant = await passwordGrant(user.email, user.password, { fresh: true });
    const stored = await readStoredSession(page);
    const revoked = await adminClient().auth.admin.signOut(grant.access_token, "global");
    expect(revoked.error, "the scratch account's sessions were not revoked").toBeNull();
    await editStoredSession(page, (session) => ({
      ...session,
      expires_at: Math.floor(Date.now() / 1000) - 60,
    }));

    await expect(page.getByTestId("session-notice")).toContainText(en["session.expired"], {
      timeout: 45_000,
    });
    await expect(signInMarker(page)).toBeVisible();
    await expect(signedInMarker(page)).toHaveCount(0);
    expect(await loadFailedTextsOn(page), "the end showed a could-not-be-loaded message").toEqual(
      [],
    );
    await expect.poll(() => lines.length, { message: "no session-end line was written" }).toBe(1);
    const [line = ""] = lines;
    expect(line).toMatch(SESSION_END_LINE);
    for (const token of [grant.access_token, grant.refresh_token, stored?.access_token ?? ""])
      if (token !== "") expect(line.includes(token), "the line carries a token").toBe(false);

    // The sign-in after the end sticks.
    await signIn(page, user.email, user.password);
    // eslint-disable-next-line no-restricted-syntax -- DEC-027: the subject IS the seconds after a sign-in
    await page.waitForTimeout(6_000);
    expect((await readStoredSession(page)) !== null, "the fresh session was dropped").toBe(true);
    await expect(signedInMarker(page)).toBeVisible();
    await expect(page.getByTestId("session-notice")).toHaveCount(0);
    expect(lines, "the fresh session was ended").toHaveLength(1);
  });

  test("SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218)", async ({
    page,
  }) => {
    test.setTimeout(150_000);
    const user = await leaseUser();
    await grantRole(user.id, "super_admin");
    const lines = sessionEndLines(page);
    await signIn(page, user.email, user.password);

    // The stored session goes with no auth event (a same-tab removal raises none); the
    // impersonation poll (every 30 s) is the next read, and it is refused.
    await forgetStoredSession(page);
    await expect(page.getByTestId("session-notice")).toContainText(en["session.expired"], {
      timeout: 45_000,
    });
    await expect(signInMarker(page)).toBeVisible();
    expect(await loadFailedTextsOn(page), "the end showed a could-not-be-loaded message").toEqual(
      [],
    );
    await expect.poll(() => lines.length, { message: "no session-end line was written" }).toBe(1);
    expect(lines[0]).toMatch(/^\[session\] ended: unauthorised [A-Za-z0-9_]+ \d+ visible$/);

    const polled = recordCalls(page, "get_active_impersonation");
    // eslint-disable-next-line no-restricted-syntax -- DEC-027: the subject IS the poll's 30 s interval
    await page.waitForTimeout(32_000);
    expect(polled, "the poll kept calling after the end").toEqual([]);
    expect(lines, "the end was told more than once").toHaveLength(1);
  });

  /**
   * SO-16 (ruling 1, decision 1) — two pages of one browser, both signed in with one scratch
   * account; page A signs out and signs in again. Page A keeps its fresh session, makes no call
   * that answers 401, and neither page says "could not be loaded". Red-first at the base, it was
   * green there in every project (Chromium and WebKit): a second tab of the site, with a sign-out
   * and a fresh sign-in in the first, is not the cause of INC-1218.
   */
  test("SO-16 a sign-out and a fresh sign-in in one tab, with a second tab open, keep the fresh session (INC-1218) @webkit", async ({
    page,
    context,
  }) => {
    test.setTimeout(120_000);
    const user = await leaseUser();
    await grantRole(user.id, "super_admin");
    await signIn(page, user.email, user.password);
    const other = await context.newPage();
    await gotoReady(other, "/");
    await expect(signedInMarker(other)).toBeVisible({ timeout: 15_000 });

    await signOutViaUi(page);
    // The shell hides the account the moment the sign-out starts; the stored session goes when
    // the client's sign-out has finished.
    await expect
      .poll(async () => (await readStoredSession(page)) === null, {
        message: "the sign-out left a stored session",
      })
      .toBe(true);
    const unauthorised = record401s(page);
    await signIn(page, user.email, user.password);
    expect((await readStoredSession(page)) !== null, "the fresh sign-in stored no session").toBe(
      true,
    );

    // eslint-disable-next-line no-restricted-syntax -- DEC-027: the subject IS the seconds after a sign-in (ruling 1: at least 5 s)
    await page.waitForTimeout(6_000);
    expect((await readStoredSession(page)) !== null, "the fresh session was dropped").toBe(true);
    await expect(signedInMarker(page)).toBeVisible();
    expect(unauthorised, "the tab made calls that answered 401 after the fresh sign-in").toEqual(
      [],
    );
    expect(await loadFailedTextsOn(page), "page A says something could not be loaded").toEqual([]);
    expect(await loadFailedTextsOn(other), "page B says something could not be loaded").toEqual([]);
    await other.close();
  });
});
