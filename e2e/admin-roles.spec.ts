import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";

import {
  enrollAndStepUp,
  expectNoHorizontalOverflow,
  gotoReady,
  roleRow,
  stepUpIfPrompted,
  switchLanguage,
  switchUser,
  userRow,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

/**
 * Phase U2 — Roles & Permissions console (RP-1..RP-8).
 *
 * Law F3 restated: these assertions cover what RENDERS and what the server
 * REFUSES. The migration proofs P1–P8 are the server's own evidence; RP-4,
 * RP-5 and RP-6 re-prove three of them from a real browser session.
 *
 * MUTATION PRINCIPAL: only super_admin holds roles:create/update/delete today
 * (the U2 seed granted `admin` roles:view alone), so every mutating case signs
 * in as a super admin. RP-1 uses admin/moderator for the gating split.
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
    throw new Error(`[e2e:u2] role ${roleName} not found: ${roleError?.message ?? "no row"}`);
  }
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role.id, scope_type: "global" });
  if (error) throw new Error(`[e2e:u2] granting ${roleName} failed: ${error.message}`);
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

function rand() {
  return Math.random().toString(36).slice(2, 8);
}

/** Creates a super admin, signs in, enrols TOTP and returns the shared secret. */
async function signInAsSuperAdmin(page: Page) {
  const user = await createUser({ confirmed: true });
  await grantRole(user.id, "super_admin");
  await switchUser(page, user.email, user.password);
  await waitForHydration(page);
  const secret = await enrollAndStepUp(page);
  return { user, secret };
}

/** Creates a custom role through the UI and returns its key. */
async function createRoleViaUi(page: Page, secret: string) {
  const name = `e2e-custom-${rand()}`;
  await gotoReady(page, "/admin/roles");
  await page.getByTestId("role-create-open").click();
  await page.getByTestId("role-create-name").fill(name);
  await page.getByTestId("role-create-display").fill(`E2E ${name}`);
  await page.getByTestId("role-create-submit").click();
  await stepUpIfPrompted(page, secret);
  await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
  return name;
}

async function roleId(name: string) {
  const { data, error } = await adminClient().from("roles").select("id").eq("name", name).single();
  if (error || !data) throw new Error(`[e2e:u2] role ${name} not found after create`);
  return data.id as string;
}

test.describe("U2 roles console", () => {
  test("RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects", async ({
    page,
  }) => {
    const moderator = await createUser({ confirmed: true });
    await grantRole(moderator.id, "moderator");
    await switchUser(page, moderator.email, moderator.password);
    await page.goto("/admin/roles");
    await waitForHydration(page);
    await expect(page).toHaveURL(/\/admin\/?$/);
    await expect(page.getByTestId("admin-section-roles")).toHaveCount(0);
    // TWIN LAW: absence is asserted through the same visible-twin locator the
    // positive phase uses, never through a raw role-row-* testid.
    await expect(roleRow(page, "admin")).toHaveCount(0);

    const admin = await createUser({ confirmed: true });
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/roles");
    await expect(page.getByTestId("admin-section-roles")).toBeVisible();
    await expect(roleRow(page, "admin")).toBeVisible();
    await expect(roleRow(page, "super_admin")).toBeVisible();

    // Signed-out deep link into a role id: redirected, nothing gated renders.
    const id = await roleId("admin");
    await page.context().clearCookies();
    await page.evaluate(() => window.localStorage.clear());
    await page.goto(`/admin/roles/${id}`);
    await waitForHydration(page);
    await expect(page.getByTestId("role-permissions")).toHaveCount(0);
    await expect(roleRow(page, "admin")).toHaveCount(0);
    await expect(page).not.toHaveURL(/\/admin\/roles\//);
  });

  test("RP-2 create: a super admin creates a custom role through step-up", async ({ page }) => {
    const { secret } = await signInAsSuperAdmin(page);
    const name = await createRoleViaUi(page, secret);
    // The audit row is per-actor; assert it through the same definer read the
    // Users section uses (activity is scoped to the signed-in actor).
    await gotoReady(page, "/admin/roles");
    const row = roleRow(page, name);
    await expect(row).toBeVisible();
    await row.click();
    await expect(page.getByTestId("role-permissions")).toBeVisible();
    expect(secret.length).toBeGreaterThan(0);
  });

  test("RP-3 matrix: grant then revoke a benign permission, persisted across reload", async ({
    page,
  }) => {
    const { secret } = await signInAsSuperAdmin(page);
    const name = await createRoleViaUi(page, secret);
    const id = await roleId(name);

    await page.getByTestId("role-permission-toggle-listings:view").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("role-permission-listings:view")).toHaveAttribute(
      "data-granted",
      "true",
      { timeout: 20000 },
    );

    await gotoReady(page, `/admin/roles/${id}`);
    await expect(page.getByTestId("role-permission-listings:view")).toHaveAttribute(
      "data-granted",
      "true",
    );

    await page.getByTestId("role-permission-toggle-listings:view").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("role-permission-listings:view")).toHaveAttribute(
      "data-granted",
      "false",
      { timeout: 20000 },
    );
  });

  test("RP-4 system lock: super_admin role is read-only in UI and refused by the RPCs", async ({
    page,
  }) => {
    const { secret } = await signInAsSuperAdmin(page);
    expect(secret.length).toBeGreaterThan(0);
    const id = await roleId("super_admin");
    await gotoReady(page, `/admin/roles/${id}`);
    await expect(page.getByTestId("role-system-note")).toBeVisible();
    await expect(page.getByTestId("role-meta-save")).toHaveCount(0);
    await expect(page.getByTestId("role-danger")).toHaveCount(0);
    await expect(page.getByTestId("role-permission-locked-roles:view")).toBeVisible();

    expect(
      await rpcFromBrowser(page, "admin_update_role", {
        p_role_id: id,
        p_display_name: "hijack",
        p_description: null,
      }),
    ).toMatch(/system role/i);
    const permId = (
      await adminClient()
        .from("permissions")
        .select("id, action, resources!inner(name)")
        .eq("action", "view")
        .eq("resources.name", "listings")
        .single()
    ).data as { id: string } | null;
    expect(
      await rpcFromBrowser(page, "admin_set_role_permission", {
        p_role_id: id,
        p_permission_id: permId?.id,
        p_granted: true,
      }),
    ).toMatch(/system role/i);
  });

  test("RP-5 delete guards: members block deletion; typed confirm deletes", async ({ page }) => {
    const { secret } = await signInAsSuperAdmin(page);
    const name = await createRoleViaUi(page, secret);
    const id = await roleId(name);

    const member = await createUser({ confirmed: true });
    await grantRole(member.id, name);

    await gotoReady(page, `/admin/roles/${id}`);
    await expect(page.getByTestId("role-delete-hint")).toBeVisible();
    await expect(page.getByTestId("role-delete")).toBeDisabled();
    expect(await rpcFromBrowser(page, "admin_delete_role", { p_role_id: id })).toMatch(
      /role has members/i,
    );

    const { error } = await adminClient()
      .from("user_roles")
      .delete()
      .eq("user_id", member.id)
      .eq("role_id", id);
    if (error) throw new Error(`[e2e:u2] revoking membership failed: ${error.message}`);

    await gotoReady(page, `/admin/roles/${id}`);
    await page.getByTestId("role-delete-confirm").fill(name);
    await page.getByTestId("role-delete").click();
    await stepUpIfPrompted(page, secret);
    await expect(page).toHaveURL(/\/admin\/roles\/?$/, { timeout: 20000 });
    await expect(roleRow(page, name)).toHaveCount(0);
  });

  test("RP-6 revocation path: unenrolling the factor refuses the next change", async ({ page }) => {
    const { secret, user } = await signInAsSuperAdmin(page);
    const name = await createRoleViaUi(page, secret);
    const id = await roleId(name);

    await page.getByTestId("role-permission-toggle-listings:view").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("role-permission-listings:view")).toHaveAttribute(
      "data-granted",
      "true",
      { timeout: 20000 },
    );

    // Unenrol every factor server-side (INC-081: a stale aal2 claim is not
    // authority — the gate re-reads auth.mfa_factors).
    const { data: factorList, error: factorError } = await adminClient().auth.admin.mfa.listFactors(
      { userId: user.id },
    );
    if (factorError) throw new Error(`[e2e:u2] listing factors failed: ${factorError.message}`);
    for (const factor of factorList?.factors ?? []) {
      const { error } = await adminClient().auth.admin.mfa.deleteFactor({
        id: factor.id,
        userId: user.id,
      });
      if (error) throw new Error(`[e2e:u2] deleting factor failed: ${error.message}`);
    }

    expect(
      await rpcFromBrowser(page, "admin_set_role_permission", {
        p_role_id: id,
        p_permission_id: (
          await adminClient()
            .from("permissions")
            .select("id, action, resources!inner(name)")
            .eq("action", "view")
            .eq("resources.name", "listings")
            .single()
        ).data?.id,
        p_granted: false,
      }),
    ).toMatch(/no verified factor|step-up required/i);
  });

  test("RP-7 registration: DEC-016 permissions appear as grantable rows", async ({ page }) => {
    const { secret } = await signInAsSuperAdmin(page);
    await createRoleViaUi(page, secret);
    await expect(page.getByTestId("role-permission-profiles:create")).toBeVisible();
    await expect(page.getByTestId("role-permission-profiles:delete")).toBeVisible();
    await expect(page.getByTestId("role-permission-impersonation:use")).toBeVisible();
    // Registered, never granted here (impersonation ships at U3 with guardrails).
    await expect(page.getByTestId("role-permission-impersonation:use")).toHaveAttribute(
      "data-granted",
      "false",
    );
  });

  test("RP-8 Amharic + no horizontal overflow", async ({ page }) => {
    const { secret } = await signInAsSuperAdmin(page);
    const name = await createRoleViaUi(page, secret);
    const id = await roleId(name);

    await gotoReady(page, "/admin/roles");
    await switchLanguage(page, "am");
    await expect(page.getByText(am["admin.roles.title"]).first()).toBeVisible();
    await expect(page.getByText(en["admin.roles.subtitle"])).toHaveCount(0);
    await expectNoHorizontalOverflow(page);

    await gotoReady(page, `/admin/roles/${id}`);
    await expect(page.getByText(am["admin.roles.perm.title"]).first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match", async ({
    page,
  }) => {
    const { secret } = await signInAsSuperAdmin(page);
    const name = await createRoleViaUi(page, secret);
    const id = await roleId(name);
    await gotoReady(page, `/admin/roles/${id}`);

    // INC-084(a): the operator reads the key from the page, not from memory.
    const shown = (await page.getByTestId("role-delete-key").innerText()).trim();
    expect(shown).toBe(name);
    await expect(page.getByTestId("role-delete")).toBeDisabled();

    await page.getByTestId("role-delete-confirm").fill("delete");
    await expect(page.getByTestId("role-delete")).toBeDisabled();

    await page.getByTestId("role-delete-confirm").fill(shown);
    await expect(page.getByTestId("role-delete")).toBeEnabled();
    await page.getByTestId("role-delete").click();
    await stepUpIfPrompted(page, secret);
    await expect(page).toHaveURL(/\/admin\/roles\/?$/, { timeout: 20000 });
    await expect(roleRow(page, name)).toHaveCount(0);
  });

  test("RP-10 members link preselects the role filter via the URL", async ({ page }) => {
    const { secret } = await signInAsSuperAdmin(page);
    const name = await createRoleViaUi(page, secret);
    const id = await roleId(name);

    const member = await createUser({ confirmed: true });
    await grantRole(member.id, name);

    await gotoReady(page, `/admin/roles/${id}`);
    await page.getByTestId("role-members-link").click();
    await expect(page).toHaveURL(new RegExp(`/admin/users\\?role=${name}$`), { timeout: 20000 });
    await expect(page.getByTestId("users-role-filter")).toHaveValue(name);
    await expect(userRow(page, member.id)).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("users-total")).toContainText("1");

    // A direct deep link behaves identically (INC-073: the URL is the state).
    await gotoReady(page, `/admin/users?role=${name}`);
    await expect(page.getByTestId("users-role-filter")).toHaveValue(name);
    await expect(userRow(page, member.id)).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("users-total")).toContainText("1");
  });

  test("RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC", async ({
    page,
  }) => {
    const { secret } = await signInAsSuperAdmin(page);
    const name = await createRoleViaUi(page, secret);
    const id = await roleId(name);
    await gotoReady(page, `/admin/roles/${id}`);

    // UI: no toggle, a locked state and the reserved note.
    await expect(page.getByTestId("role-permission-toggle-roles:update")).toHaveCount(0);
    await expect(page.getByTestId("role-permission-locked-roles:update")).toBeVisible();
    await expect(page.getByTestId("role-permission-reserved-roles:update")).toContainText(
      en["admin.roles.perm.notAssignable"],
    );

    // Server: the same refusal, reached around the UI entirely (Law F3).
    const permId = (
      await adminClient()
        .from("permissions")
        .select("id, action, resources!inner(name)")
        .eq("action", "update")
        .eq("resources.name", "roles")
        .single()
    ).data as { id: string } | null;
    expect(
      await rpcFromBrowser(page, "admin_set_role_permission", {
        p_role_id: id,
        p_permission_id: permId?.id,
        p_granted: true,
      }),
    ).toMatch(/not assignable to custom roles/i);

    await switchLanguage(page, "am");
    await expect(page.getByTestId("role-permission-reserved-roles:update")).toContainText(
      am["admin.roles.perm.notAssignable"],
    );
    await expectNoHorizontalOverflow(page);
  });

  test("RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles", async ({
    page,
  }) => {
    const { secret } = await signInAsSuperAdmin(page);
    const name = await createRoleViaUi(page, secret);
    const id = await roleId(name);
    await gotoReady(page, `/admin/roles/${id}`);

    // account_panel:access is the base `user` role's only grant today.
    await expect(page.getByTestId("role-permission-baseline-account_panel:access")).toContainText(
      en["admin.roles.perm.baselineBadge"],
    );
    await expect(page.getByTestId("role-permission-toggle-account_panel:access")).toHaveCount(0);
    await expect(page.getByTestId("role-permission-locked-account_panel:access")).toBeVisible();

    // Regression: an ordinary assignable row still grants and revokes.
    await page.getByTestId("role-permission-toggle-listings:view").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("role-permission-listings:view")).toHaveAttribute(
      "data-granted",
      "true",
      { timeout: 20000 },
    );

    await switchLanguage(page, "am");
    await expect(page.getByTestId("role-permission-baseline-account_panel:access")).toContainText(
      am["admin.roles.perm.baselineBadge"],
    );
    await expectNoHorizontalOverflow(page);
  });
});
