import { expect, test, type Page } from "@playwright/test";

import { en } from "../src/i18n/locales/en";

import { gotoReady, isMobile, openRailScope, signIn, signOutViaUi } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

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
    const user = await createUser({ confirmed: true });
    await grantRole(user.id, "super_admin");

    await signIn(page, user.email, user.password);
    await gotoReady(page, "/admin");
    await expect(page.getByTestId("admin-panel-root")).toBeVisible();

    // U0k — ONE CLICK. No dialog exists any more; the affordance IS the reset.
    await signOutViaUi(page);

    await expectSignedOutMarketplace(page);
    await expect(page.getByTestId("sign-out-dialog")).toHaveCount(0);
    await expect(page.getByTestId("panel-header-title")).toHaveText(en["panel.marketplace"]);

    // Back must not re-enter a gated page (replace-navigation).
    await page.goBack();
    await expect(page.getByTestId("admin-panel-root")).toHaveCount(0);
  });

  test("SO-2 settings: confirmed sign-out empties the gated surface", async ({ page }) => {
    const user = await createUser({ confirmed: true });

    await signIn(page, user.email, user.password);
    await gotoReady(page, "/settings");

    await signOutViaUi(page);

    await expectSignedOutMarketplace(page);
    await expect(page.getByRole("heading", { name: en["settings.title"] })).toHaveCount(0);
  });

  test("SO-3 live guard: a same-tab client sign-out evacuates /admin", async ({ page }) => {
    const user = await createUser({ confirmed: true });
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
    const user = await createUser({ confirmed: true });
    await grantRole(user.id, "super_admin");

    await signIn(page, user.email, user.password);
    await gotoReady(page, "/admin");
    await expect(page.getByTestId("admin-panel-root")).toBeVisible();

    // Distinct from SO-3: no live transition, the session is simply gone when
    // the gated route mounts again.
    await page.evaluate(() => {
      const key = Object.keys(localStorage).find(
        (k) => k.startsWith("sb-") && k.endsWith("-auth-token"),
      );
      if (!key) throw new Error("no persisted supabase session found");
      localStorage.removeItem(key);
    });
    await page.reload();

    await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
    await expect(page.getByTestId("admin-panel-root")).toHaveCount(0);
  });

  test("SO-4 signed-out marketplace carries no gated UI", async ({ page }) => {
    const user = await createUser({ confirmed: true });
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

test.describe("U0k session policy", () => {
  test("SP-1 idle: the warning appears, then the session is hard-reset", async ({ page }) => {
    await overridePolicy(page, { idleMs: 4000, warnMs: 2500, absoluteMs: 600_000 });
    const user = await createUser({ confirmed: true });

    await signIn(page, user.email, user.password);
    await expect(page.getByTestId("session-idle-warning")).toBeVisible({ timeout: 15000 });

    // No interaction: the policy must finish the job on its own.
    await expect(page.getByTestId("account-menu")).toHaveCount(0, { timeout: 15000 });
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId("session-notice")).toBeVisible();
  });

  test("SP-2 stay signed in extends past the original deadline", async ({ page }) => {
    await overridePolicy(page, { idleMs: 6000, warnMs: 4000, absoluteMs: 600_000 });
    const user = await createUser({ confirmed: true });

    await signIn(page, user.email, user.password);
    await expect(page.getByTestId("session-idle-warning")).toBeVisible({ timeout: 15000 });
    await page.getByTestId("session-stay-signed-in").click();
    await expect(page.getByTestId("session-idle-warning")).toHaveCount(0);

    // Past the ORIGINAL deadline, still signed in.
    await page.waitForTimeout(4000);
    await expect(page.getByTestId("account-menu")).toBeVisible();
  });

  test("SP-3 absolute: continuous activity does not save the session", async ({ page }) => {
    await overridePolicy(page, { idleMs: 600_000, warnMs: 1000, absoluteMs: 5000 });
    const user = await createUser({ confirmed: true });

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
    const user = await createUser({ confirmed: true });
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
});
