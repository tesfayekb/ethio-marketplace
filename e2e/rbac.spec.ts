import { expect, test } from "@playwright/test";

import { en } from "../src/i18n/locales/en";

import { gotoReady, signIn, waitForHydration } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

/**
 * Phase R3 — RBAC client seam.
 *
 * Law F3 restated for tests: these assertions cover what the UI RENDERS. The
 * server-side proofs (RLS, has_permission, the function matrix) live in the
 * migration suite; a green run here is NOT an authorization proof.
 */

/** Grants a named role via the service role — the staff fixture. */
async function grantRole(userId: string, roleName: string) {
  const supabase = adminClient();
  const { data: role, error: roleError } = await supabase
    .from("roles")
    .select("id")
    .eq("name", roleName)
    .single();
  if (roleError || !role) {
    throw new Error(`[e2e:rbac] role ${roleName} not found: ${roleError?.message ?? "no row"}`);
  }
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role.id, scope_type: "global" });
  if (error) throw new Error(`[e2e:rbac] granting ${roleName} failed: ${error.message}`);
}

test.describe("RBAC client seam", () => {
  test("R-1 logged out: no Admin tab and no RBAC request at all", async ({ page }) => {
    const rbacCalls: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("get_my_permissions")) rbacCalls.push(request.url());
    });

    await gotoReady(page, "/");

    await expect(page.getByTestId("panel-tab-admin")).toHaveCount(0);
    // Performance law: the marketplace path must not pay for admin machinery.
    expect(rbacCalls, "logged-out visitor issued an RBAC request").toEqual([]);
  });

  test("R-2 regular user: no Admin tab, and /admin redirects home", async ({ page }) => {
    const user = await createUser({ confirmed: true });

    await signIn(page, user.email, user.password);
    await waitForHydration(page);

    await expect(page.getByTestId("panel-tab-admin")).toHaveCount(0);

    await page.goto("/admin");
    await waitForHydration(page);
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId("admin-panel-root")).toHaveCount(0);
  });

  test("R-3 staff user: Admin tab appears and /admin renders", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");

    await signIn(page, staff.email, staff.password);
    await waitForHydration(page);

    const adminTab = page.getByTestId("panel-tab-admin");
    await expect(adminTab).toBeVisible({ timeout: 15000 });

    await page.goto("/admin");
    await waitForHydration(page);
    await expect(page.getByTestId("admin-panel-root")).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("heading", { name: en["admin.title"] })).toBeVisible();
  });
});
