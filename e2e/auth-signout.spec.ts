import { expect, test, type Page } from "@playwright/test";

import { en } from "../src/i18n/locales/en";

import { gotoReady, signIn, waitForHydration } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

/**
 * U0j — sign-out is a HARD RESET (INC-072).
 *
 * The law under test: a confirmed sign-out clears the session, purges the
 * permission cache, resets the shell to the marketplace and replace-navigates
 * to "/", and NO gated UI stays rendered on any viewport. SO-3 additionally
 * proves the gate is LIVE (subscribed), not a mount-only check.
 */

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

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1280) < 768;

/** Opens the drawer at mobile so the rail's sign-out button is reachable. */
async function openRail(page: Page) {
  if (!isMobile(page)) return;
  await page.getByRole("button", { name: en["shell.openMenu"] }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
}

async function clickSignOut(page: Page) {
  await waitForHydration(page);
  await openRail(page);
  await page.getByTestId("rail-sign-out").click();
  await expect(page.getByTestId("sign-out-dialog")).toBeVisible();
}

async function expectSignedOutMarketplace(page: Page) {
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByTestId("admin-panel-root")).toHaveCount(0);
  await expect(page.getByTestId("panel-tab-admin")).toHaveCount(0);
  await expect(page.getByRole("button", { name: en["shell.accountMenu"] })).toHaveCount(0);
  await expect(page.getByRole("link", { name: en["auth.signIn"] })).toBeVisible();
}

test.describe("U0j sign-out hard reset", () => {
  test("SO-1 admin: cancel keeps the session, confirm resets to the marketplace", async ({
    page,
  }) => {
    const user = await createUser({ confirmed: true });
    await grantRole(user.id, "super_admin");

    await signIn(page, user.email, user.password);
    await gotoReady(page, "/admin");
    await expect(page.getByTestId("admin-panel-root")).toBeVisible();

    // Cancel — nothing happens.
    await clickSignOut(page);
    await page.getByTestId("sign-out-cancel").click();
    await expect(page.getByTestId("sign-out-dialog")).toHaveCount(0);
    await expect(page).toHaveURL(/\/admin/);
    await expect(page.getByTestId("admin-panel-root")).toBeVisible();

    // Confirm — the hard reset.
    await clickSignOut(page);
    await page.getByTestId("sign-out-confirm").click();

    await expectSignedOutMarketplace(page);
    await expect(page.getByTestId("panel-header-title")).toHaveText(en["panel.marketplace"]);

    // Back must not re-enter a gated page (replace-navigation).
    await page.goBack();
    await waitForHydration(page);
    await expect(page.getByTestId("admin-panel-root")).toHaveCount(0);
  });

  test("SO-2 settings: confirmed sign-out empties the gated surface", async ({ page }) => {
    const user = await createUser({ confirmed: true });

    await signIn(page, user.email, user.password);
    await gotoReady(page, "/settings");
    await expect(page.getByTestId("rail-sign-out")).toHaveCount(isMobile(page) ? 0 : 1);

    await clickSignOut(page);
    await page.getByTestId("sign-out-confirm").click();

    await expectSignedOutMarketplace(page);
    await expect(page.getByRole("heading", { name: en["settings.title"] })).toHaveCount(0);
  });

  test("SO-3 live guard: a session cleared without the UI evacuates /admin", async ({ page }) => {
    const user = await createUser({ confirmed: true });
    await grantRole(user.id, "super_admin");

    await signIn(page, user.email, user.password);
    await gotoReady(page, "/admin");
    await expect(page.getByTestId("admin-panel-root")).toBeVisible();

    // MECHANISM: drop the persisted sb-*-auth-token and fire a storage event.
    // supabase-js listens for cross-tab storage changes and emits SIGNED_OUT,
    // which is exactly the transition another tab (or an expiry) produces —
    // no app button is involved, so only the LIVE guard can react.
    await page.evaluate(() => {
      const key = Object.keys(localStorage).find(
        (k) => k.startsWith("sb-") && k.endsWith("-auth-token"),
      );
      if (!key) throw new Error("no persisted supabase session found");
      const oldValue = localStorage.getItem(key);
      localStorage.removeItem(key);
      window.dispatchEvent(new StorageEvent("storage", { key, oldValue, newValue: null }));
    });

    await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
    await expect(page.getByTestId("admin-panel-root")).toHaveCount(0);
  });

  test("SO-4 signed-out marketplace carries no gated UI", async ({ page }) => {
    const user = await createUser({ confirmed: true });
    await grantRole(user.id, "super_admin");

    await signIn(page, user.email, user.password);
    await gotoReady(page, "/admin");
    await clickSignOut(page);
    await page.getByTestId("sign-out-confirm").click();
    await expectSignedOutMarketplace(page);

    await openRail(page);
    const scope = isMobile(page) ? page.getByRole("dialog") : page.getByTestId("app-rail");
    await expect(scope.getByTestId("rail-sign-out")).toHaveCount(0);
    await expect(scope.getByText(en["admin.nav.label"], { exact: true })).toHaveCount(0);
    await expect(scope.getByText(en["panel.account"], { exact: true })).toHaveCount(0);
  });
});
