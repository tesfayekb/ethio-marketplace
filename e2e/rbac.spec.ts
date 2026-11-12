import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";

import { expectPanelOffered, gotoReady, signIn, waitForHydration } from "./helpers/ui";
import { leaseUser, grantRole } from "./helpers/users";

/**
 * Phase R3 — RBAC client seam.
 *
 * Law F3 restated for tests: these assertions cover what the UI RENDERS. The
 * server-side proofs (RLS, has_permission, the function matrix) live in the
 * migration suite; a green run here is NOT an authorization proof.
 */

test.describe("RBAC client seam", () => {
  test("R-6 logged out: no Admin tab and no RBAC request at all", async ({ page }) => {
    const rbacCalls: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("get_my_permissions")) rbacCalls.push(request.url());
    });

    await gotoReady(page, "/");

    await expect(page.getByTestId("panel-tab-admin")).toHaveCount(0);
    // Performance law: the marketplace path must not pay for admin machinery.
    expect(rbacCalls, "logged-out visitor issued an RBAC request").toEqual([]);
  });

  test("R-7 regular user: no Admin tab, and /admin redirects home", async ({ page }) => {
    const user = await leaseUser();

    await signIn(page, user.email, user.password);
    await waitForHydration(page);

    await expect(page.getByTestId("panel-tab-admin")).toHaveCount(0);

    await page.goto("/admin");
    await waitForHydration(page);
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId("admin-panel-root")).toHaveCount(0);
  });

  test("R-8 staff user: Admin tab appears and /admin renders", async ({ page }) => {
    const staff = await leaseUser();
    await grantRole(staff.id, "admin");

    await signIn(page, staff.email, staff.password);
    await waitForHydration(page);

    await expectPanelOffered(page, "admin");

    await page.goto("/admin");
    await waitForHydration(page);
    await expect(page.getByTestId("admin-panel-root")).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("heading", { name: en["admin.title"] })).toBeVisible();
  });
});
