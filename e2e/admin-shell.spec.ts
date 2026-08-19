import { expect, test } from "@playwright/test";

import { ADMIN_SECTIONS, sectionForPath } from "../src/features/admin/sections";
import { en } from "../src/i18n/locales/en";

import { gotoReady, openRailScope, signIn, waitForHydration } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

/**
 * Phase U0 — admin shell & navigation.
 *
 * Law F3 restated for tests: these assertions cover what the UI RENDERS. The
 * server-side proofs (RLS, has_permission) live in the migration suite; green
 * here is NOT an authorization proof.
 */

/**
 * Grants a named role via the service role — the staff fixture.
 *
 * Same shape as e2e/rbac.spec.ts: a plain INSERT. The user_roles UNIQUE is
 * (user_id, role_id, scope_type, scope_country), so an onConflict list that
 * omits scope_country is not a valid conflict target. Every fixture user here
 * is freshly minted, so a plain insert can never collide.
 */
async function grantRole(userId: string, roleName: string) {
  const supabase = adminClient();
  const { data: role, error: roleError } = await supabase
    .from("roles")
    .select("id")
    .eq("name", roleName)
    .single();
  if (roleError || !role) {
    throw new Error(
      `[e2e:admin-shell] role ${roleName} not found: ${roleError?.message ?? "none"}`,
    );
  }
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role.id, scope_type: "global" });
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
    throw new Error(
      `[e2e:admin-shell] reading ${roleName} permissions: ${error?.message ?? "none"}`,
    );
  }
  type Row = {
    role_permissions: { permissions: { action: string; resources: { name: string } } | null }[];
  };
  return (data as unknown as Row).role_permissions
    .map((rp) => rp.permissions)
    .filter((p): p is { action: string; resources: { name: string } } => p !== null)
    .map((p) => `${p.resources.name}:${p.action}`);
}

/** True on the 360px project; the drawer owns nav there, the rail on md+. */
function isMobile(page: import("@playwright/test").Page): boolean {
  return (page.viewportSize()?.width ?? 0) < 768;
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
    // U0d (INC-070): each card is a real link carrying BOTH the section title
    // and its description — the landing theme, not a bare list.
    for (const id of expected) {
      const card = page.getByTestId(`admin-section-link-${id}`);
      const s = ADMIN_SECTIONS.find((x) => x.id === id)!;
      await expect(card).toBeVisible();
      await expect(card).toContainText(en[s.titleKey]);
      await expect(card).toContainText(en[s.bodyKey]);
    }

    // Clicking a permitted section lands on its empty state with breadcrumb.
    const first = expected[0]!;
    const section = ADMIN_SECTIONS.find((s) => s.id === first)!;
    await page.getByTestId(`admin-section-link-${first}`).click();
    await expect(page).toHaveURL(new RegExp(`${section.path}$`));
    await expect(page.getByTestId(`admin-section-${first}`)).toBeVisible();
    // U0c — EXACTLY ONE breadcrumb nav (the shell's) on admin routes, with
    // route-derived functional segments and an emphasized current segment.
    await expect(page.getByTestId("admin-breadcrumb")).toHaveCount(0);
    await expect(page.getByTestId("admin-section-back")).toHaveCount(0);
    const crumb = page.getByTestId("breadcrumbs");
    await expect(crumb).toHaveCount(1);
    await expect(crumb.getByTestId("breadcrumb-home")).toBeVisible();
    await expect(crumb.getByTestId("breadcrumb-admin")).toBeVisible();
    const current = crumb.getByTestId("breadcrumb-admin-section");
    await expect(current).toHaveText(en[section.titleKey]);
    await expect(current).toHaveAttribute("aria-current", "page");
    await expect(current).toHaveClass(/underline/);

    // The Admin segment is a real link back to the landing.
    await crumb.getByTestId("breadcrumb-admin").click();
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByTestId("admin-landing")).toBeVisible();
    await page.goto(section.path);
    await waitForHydration(page);
    await expect(page.getByTestId(`admin-section-${first}`)).toBeVisible({ timeout: 15000 });

    // Deep link into another permitted section resolves directly.
    const second = expected[1] ?? expected[0]!;
    await page.goto(ADMIN_SECTIONS.find((s) => s.id === second)!.path);
    await waitForHydration(page);
    await expect(page.getByTestId(`admin-section-${second}`)).toBeVisible({ timeout: 15000 });

    // U0b (INC-069): the SHELL rail/drawer carries the section items, and the
    // page-internal sidebar is gone on every viewport.
    await expect(page.getByTestId("admin-nav-sidebar")).toHaveCount(0);

    if (isMobile(page)) {
      const drawer = await openRailScope(page);
      // U0c — the drawer heads with the ACTIVE panel and lists its items only.
      await expect(drawer.getByTestId("panel-header-title")).toHaveText(en["panel.admin"]);
      for (const id of expected) {
        await expect(drawer.getByTestId(`rail-item-ad-${id}`)).toBeVisible({ timeout: 15000 });
      }
      const target = ADMIN_SECTIONS.find((s) => s.id === (expected[1] ?? expected[0]!))!;
      await drawer.getByTestId(`rail-item-ad-${target.id}`).click();
      await expect(page).toHaveURL(new RegExp(`${target.path}$`));
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await expect(page.getByTestId(`admin-section-${target.id}`)).toBeVisible();
    } else {
      const rail = page.getByTestId("app-rail");
      for (const id of expected) {
        await expect(rail.getByTestId(`rail-item-ad-${id}`)).toBeVisible({ timeout: 15000 });
      }
      // The current section is the highlighted one.
      const current = sectionForPath(new URL(page.url()).pathname)!;
      await expect(rail.getByTestId(`rail-item-ad-${current.id}`)).toHaveClass(/bg-sidebar-accent/);
    }

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
    // AdminNav returns null for zero sections, so the container is absent (not empty).
    await expect(page.getByTestId("admin-nav-cards")).toHaveCount(0);
    await expect(page.getByTestId("admin-nav-sidebar")).toHaveCount(0);

    // U0b: the shell drawer carries zero admin section items for this role.
    if (isMobile(page)) {
      const drawer = await openRailScope(page);
      await expect(drawer.getByTestId("panel-header-title")).toHaveText(en["panel.admin"]);
      for (const section of ADMIN_SECTIONS) {
        await expect(drawer.getByTestId(`rail-item-ad-${section.id}`)).toHaveCount(0);
      }
      await page.keyboard.press("Escape");
    } else {
      const rail = page.getByTestId("app-rail");
      for (const section of ADMIN_SECTIONS) {
        await expect(rail.getByTestId(`rail-item-ad-${section.id}`)).toHaveCount(0);
      }
    }

    await page.goto("/admin/users");
    await waitForHydration(page);
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByTestId("admin-access-notice")).toBeVisible({ timeout: 15000 });
  });

  test("A-4 admin TAB from marketplace navigates to /admin (INC-071)", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");

    await signIn(page, staff.email, staff.password);
    await waitForHydration(page);
    await page.goto("/");
    await waitForHydration(page);

    // U0e: activation IS navigation — the stale state-path placeholder that
    // used to render here is deleted.
    await page.getByTestId("panel-tab-admin").click();
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByTestId("admin-landing")).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId("admin-nav-cards")).toBeVisible();
    await expect(page.getByText(en["shell.placeholderTitle"], { exact: true })).toHaveCount(0);
    await expect(page.getByText(en["shell.placeholderBody"], { exact: true })).toHaveCount(0);
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
