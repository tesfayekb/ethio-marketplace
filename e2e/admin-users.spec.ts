import { expect, test, type Page } from "@playwright/test";

import { en } from "../src/i18n/locales/en";

import { gotoReady, signIn, waitForHydration } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

/**
 * Phase U1 — Users section.
 *
 * Law F3 restated: the UI assertions here cover what RENDERS. The server
 * proofs (permission gates, the status guard, the seam) ran in the migration
 * (P1–P6); AU-5/AU-6 re-prove two of them from a real browser session.
 */

type RpcClient = {
  rpc: (
    fn: string,
    args?: Record<string, unknown>,
  ) => Promise<{ error: { message: string } | null }>;
};

async function grantRole(userId: string, roleName: string) {
  const supabase = adminClient();
  const { data: role, error: roleError } = await supabase
    .from("roles")
    .select("id")
    .eq("name", roleName)
    .single();
  if (roleError || !role) {
    throw new Error(`[e2e:u1] role ${roleName} not found: ${roleError?.message ?? "no row"}`);
  }
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role.id, scope_type: "global" });
  if (error) throw new Error(`[e2e:u1] granting ${roleName} failed: ${error.message}`);
}

async function rpcFromBrowser(page: Page, fn: string, args: Record<string, unknown>) {
  await page.waitForFunction(
    () => Boolean((window as unknown as { __ethioSupabase?: unknown }).__ethioSupabase),
    undefined,
    { timeout: 15000 },
  );
  return page.evaluate(
    async ([name, payload]) => {
      const client = (window as unknown as { __ethioSupabase: RpcClient }).__ethioSupabase;
      const result = await client.rpc(name as string, payload as Record<string, unknown>);
      return result.error?.message ?? null;
    },
    [fn, args] as const,
  );
}

test.describe("U1 admin users", () => {
  test("AU-1 permission: moderator is refused, admin sees the list", async ({ page }) => {
    const moderator = await createUser({ confirmed: true });
    await grantRole(moderator.id, "moderator");
    await signIn(page, moderator.email, moderator.password);
    await waitForHydration(page);
    await page.goto("/admin/users");
    await waitForHydration(page);
    await expect(page).toHaveURL(/\/admin\/?$/);
    await expect(page.getByText(en["admin.accessDenied"])).toBeVisible({ timeout: 15000 });

    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    await page.context().clearCookies();
    await signIn(page, staff.email, staff.password);
    await page.goto("/admin/users");
    await waitForHydration(page);
    await expect(page.getByTestId(`user-row-${staff.id}`)).toBeVisible({ timeout: 15000 });
  });

  test("AU-2 search and status filter", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const scratch = await createUser({ confirmed: true });

    await signIn(page, staff.email, staff.password);
    await page.goto("/admin/users");
    await waitForHydration(page);

    await page.getByTestId("users-search").fill(scratch.email);
    await expect(page.getByTestId(`user-row-${scratch.id}`)).toBeVisible({ timeout: 15000 });

    await page.getByTestId("users-status-filter").selectOption("deactivated");
    await expect(page.getByTestId(`user-row-${scratch.id}`)).toHaveCount(0);
  });

  test("AU-3 detail: reason required, deactivate, audit row, reactivate", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const scratch = await createUser({ confirmed: true });

    await signIn(page, staff.email, staff.password);
    await page.goto(`/admin/users/${scratch.id}`);
    await waitForHydration(page);
    await expect(page.getByTestId("user-identity-card")).toBeVisible({ timeout: 15000 });

    await page.getByTestId("deactivate-user").click();
    await expect(page.getByTestId("reason-error")).toBeVisible();

    await page.getByTestId("deactivate-reason").fill("U1 e2e");
    await page.getByTestId("deactivate-user").click();
    await expect(page.getByTestId("user-status-card").getByTestId("user-status")).toHaveText(
      en["admin.users.status.deactivated"],
      { timeout: 15000 },
    );
    await expect(page.getByTestId("activity-user.status_change").first()).toBeVisible({
      timeout: 15000,
    });

    await page.getByTestId("activate-user").click();
    await expect(page.getByTestId("user-status-card").getByTestId("user-status")).toHaveText(
      en["admin.users.status.active"],
      { timeout: 15000 },
    );
  });

  test("AU-4 roles: assign and remove, super_admin/user never offered", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "super_admin");
    const scratch = await createUser({ confirmed: true });

    await signIn(page, staff.email, staff.password);
    await page.goto(`/admin/users/${scratch.id}`);
    await waitForHydration(page);

    const select = page.getByTestId("assign-role-select");
    await expect(select).toBeVisible({ timeout: 15000 });
    const options = await select.locator("option").allInnerTexts();
    expect(options.join(" ")).not.toContain("super_admin");

    await select.selectOption("moderator");
    await page.getByTestId("assign-role").click();
    await expect(page.getByTestId("role-chip-moderator")).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId("activity-role.assign").first()).toBeVisible({ timeout: 15000 });

    await page.getByTestId("role-remove-moderator").click();
    await expect(page.getByTestId("role-chip-moderator")).toHaveCount(0, { timeout: 15000 });
    await expect(page.getByTestId("activity-role.revoke").first()).toBeVisible({ timeout: 15000 });
  });

  test("AU-5 seam: a deactivated account cannot write a listing", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const scratch = await createUser({ confirmed: true });

    await signIn(page, staff.email, staff.password);
    await page.goto(`/admin/users/${scratch.id}`);
    await waitForHydration(page);
    await page.getByTestId("deactivate-reason").fill("U1 seam");
    await page.getByTestId("deactivate-user").click();
    await expect(page.getByTestId("user-status-card").getByTestId("user-status")).toHaveText(
      en["admin.users.status.deactivated"],
      { timeout: 15000 },
    );

    // Sign in AS the deactivated user and call the write seam directly.
    await page.context().clearCookies();
    await signIn(page, scratch.email, scratch.password);
    await gotoReady(page, "/");
    const message = await rpcFromBrowser(page, "submit_listing", {
      p_seller_id: scratch.id,
      p_category_id: "00000000-0000-0000-0000-000000000000",
      p_location_id: "00000000-0000-0000-0000-000000000000",
      p_title: "U1 seam",
      p_description: "U1 seam",
      p_home_country_code: "ET",
    });
    expect(message ?? "").toContain("account is deactivated");
  });

  test("AU-6 negative: a base user cannot call the status RPC", async ({ page }) => {
    const base = await createUser({ confirmed: true });
    const victim = await createUser({ confirmed: true });

    await signIn(page, base.email, base.password);
    await gotoReady(page, "/");
    const message = await rpcFromBrowser(page, "admin_set_account_status", {
      p_user_id: victim.id,
      p_status: "deactivated",
      p_reason: "should never work",
    });
    expect(message ?? "").toContain("permission denied");
  });
});
