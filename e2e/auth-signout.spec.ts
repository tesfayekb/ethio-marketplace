import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";

import {
  authFields,
  expectActivePanel,
  fillUntilStable,
  gotoReady,
  isMobile,
  openRailScope,
  signIn,
  signInViaSession,
  signInMarker,
  signOutViaUi,
  signedInMarker,
  waitForHydration,
} from "./helpers/ui";
import {
  besideSessionKey,
  editStoredSession,
  forgetStoredSession,
  holdsStoredSession,
  injectSession,
  passwordGrant,
  storageKey,
  supabaseNamesIn,
} from "./helpers/session";
import { adminClient, leaseUser } from "./helpers/users";

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

declare global {
  interface Window {
    __ethioSupabase?: {
      auth: { signOut: (options?: { scope?: "local" | "global" | "others" }) => Promise<unknown> };
    };
  }
}

async function grantRole(userId: string, roleName: string) {
  const supabase = adminClient();
  const { data: role, error: roleError } = await supabase
    .from("roles")
    .select("id")
    .eq("name", roleName)
    .single();
  if (roleError || !role) {
    throw new Error(`[e2e:signout] role ${roleName} not found: ${roleError?.message ?? "no row"}`);
  }
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role.id, scope_type: "global" });
  if (error) throw new Error(`[e2e:signout] granting ${roleName} failed: ${error.message}`);
}

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
    await page.waitForFunction(() => Boolean(window.__ethioSupabase), undefined, {
      timeout: 15000,
    });
    await page.evaluate(async () => {
      await window.__ethioSupabase!.auth.signOut({ scope: "local" });
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
    expect(await holdsStoredSession(page), "the stored session is gone from this device").toBe(
      false,
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
    expect(await holdsStoredSession(page), "the stored session is gone from this device").toBe(
      false,
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
    // Home is drawn by its own code, signed out — not the root's "This page didn't load" view.
    await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });
    await expect(page.getByTestId("feed-container")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("route-error-refresh")).toHaveCount(0);
    await expect(signInMarker(page)).toBeVisible();
    await expect(page.getByTestId("account-menu")).toHaveCount(0);
    expect(loads, "no load is tried while offline").toBe(0);
    expect(await holdsStoredSession(page), "the stored session is gone from this device").toBe(
      false,
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
