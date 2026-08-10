import { expect, test } from "@playwright/test";

import { ADMIN_SECTIONS } from "../src/features/admin/sections";
import { en } from "../src/i18n/locales/en";

import { gotoReady, signIn, waitForHydration } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

/**
 * Phase U0 — admin shell & navigation.
 *
 * Law F3 restated for tests: these assertions cover what the UI RENDERS. The
 * server-side proofs (RLS, has_permission) live in the migration suite; green
 * here is NOT an authorization proof.
 */

/** Grants a named role via the service role. Idempotent. */
async function grantRole(userId: string, roleName: string) {
  const supabase = adminClient();
  const { data: role, error: roleError } = await supabase
    .from("roles")
    .select("id")
    .eq("name", roleName)
    .single();
  if (roleError || !role) {
    throw new Error(`[e2e:admin-shell] role ${roleName} not found: ${roleError?.message ?? "none"}`);
  }
  const { error } = await supabase
    .from("user_roles")
    .upsert(
      { user_id: userId, role_id: role.id, scope_type: "global" },
      { onConflict: "user_id,role_id,scope_type", ignoreDuplicates: true },
    );
  if (error) throw new Error(`[e2e:admin-shell] granting ${roleName} failed: ${error.message}`);
}

/**
 * The permission slugs a seeded role actually holds. The expected section set
 * is DERIVED from live seeds rather than hardcoded, so a seed drift fails the
 * assertion loudly instead of silently changing what the test proves.
 */
async function permissionsOfRole(roleName: string): Promise<string[]> {
  const supabase = adminClient();
  const { data, error } = await supabase
    .from("roles")
    .select("name, role_permissions(permissions(action, resources(name)))")
    .eq("name", roleName)
    .single();
  if (error || !data) {
    throw new Error(`[e2e:admin-shell] reading ${roleName} permissions: ${error?.message ?? "none"}`);
  }
  type Row = {
    role_permissions: { permissions: { action: string; resources: { name: string } } | null }[];
  };
  return (data as unknown as Row).role_permissions
    .map((rp) => rp.permissions)
    .filter((p): p is { action: string; resources: { name: string } } => p !== null)
    .map((p) => `${p.resources.name}:${p.action}`);
}

function expectedSectionIds(permissions: string[]): string[] {
  return ADMIN_SECTIONS.filter((s) => permissions.includes(s.permission)).map((s) => s.id);
}

test.describe("Admin shell (U0)", () => {
  test("A-1 admin fixture: gated section nav, section page + breadcrumb, deep link", async ({
    page,
  }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const perms = await permissionsOfRole("admin");
    const expected = expectedSectionIds(perms);
    expect(expected.length, "admin role grants no admin sections").toBeGreaterThan(0);

    await signIn(page, staff.email, staff.password);
    await waitForHydration(page);
    await page.goto("/admin");
    await waitForHydration(page);

    const cards = page.getByTestId("admin-nav-cards").getByRole("link");
    await expect(cards).toHaveCount(expected.length, { timeout: 15000 });
    for (const id of expected) {
      await expect(page.getByTestId(`admin-section-link-${id}`)).toBeVisible();
    }

    // Clicking a permitted section lands on its empty state with breadcrumb.
    const first = expected[0]!;
    const section = ADMIN_SECTIONS.find((s) => s.id === first)!;
    await page.getByTestId(`admin-section-link-${first}`).click();
    await expect(page).toHaveURL(new RegExp(`${section.path}$`));
    await expect(page.getByTestId(`admin-section-${first}`)).toBeVisible();
    const crumb = page.getByTestId("admin-breadcrumb");
    await expect(crumb).toContainText(en["admin.breadcrumb.root"]);
    await expect(crumb).toContainText(en[section.titleKey]);

    // Deep link into another permitted section resolves directly.
    const second = expected[1] ?? expected[0]!;
    await page.goto(ADMIN_SECTIONS.find((s) => s.id === second)!.path);
    await waitForHydration(page);
    await expect(page.getByTestId(`admin-section-${second}`)).toBeVisible({ timeout: 15000 });

    // A section the admin role does NOT hold is refused, not blank.
    const forbidden = ADMIN_SECTIONS.find((s) => !expected.includes(s.id));
    if (forbidden) {
      await page.goto(forbidden.path);
      await waitForHydration(page);
      await expect(page).toHaveURL(/\/admin$/);
      await expect(page.getByTestId("admin-access-notice")).toBeVisible({ timeout: 15000 });
    }
  });

  test("A-2 moderator fixture: zero sections, deep link refused, admin tab still visible", async ({
    page,
  }) => {
    const mod = await createUser({ confirmed: true });
    await grantRole(mod.id, "moderator");
    const perms = await permissionsOfRole("moderator");
    expect(expectedSectionIds(perms), "moderator seed now grants admin sections").toEqual([]);

    await signIn(page, mod.email, mod.password);
    await waitForHydration(page);

    // admin_panel:access holds, so the tab is there.
    await expect(page.getByTestId("panel-tab-admin")).toBeVisible({ timeout: 15000 });

    await page.goto("/admin");
    await waitForHydration(page);
    await expect(page.getByTestId("admin-panel-root")).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId("admin-no-sections")).toBeVisible();
    await expect(page.getByTestId("admin-nav-cards")).toHaveCount(0);

    await page.goto("/admin/users");
    await waitForHydration(page);
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByTestId("admin-access-notice")).toBeVisible({ timeout: 15000 });
  });

  test("A-3 regular user: /admin still redirects home", async ({ page }) => {
    const user = await createUser({ confirmed: true });

    await signIn(page, user.email, user.password);
    await waitForHydration(page);

    await page.goto("/admin");
    await waitForHydration(page);
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId("admin-panel-root")).toHaveCount(0);

    // Sanity: the logged-out landing is unaffected.
    await gotoReady(page, "/");
    await expect(page.getByTestId("panel-tab-admin")).toHaveCount(0);
  });
});
