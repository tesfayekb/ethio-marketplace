import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";

import {
  enrollAndStepUp,
  expectAal2,
  gotoReady,
  stepUpIfPrompted,
  switchUser,
  userRow,
  waitForHydration,
} from "./helpers/ui";
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

/**
 * INC-109 — self-describing failure dump for the user-detail surface.
 * Reads the live query cache through the E2E instrument (`__ethioQueryClient`,
 * VITE_E2E-gated) plus the presence of the three detail testids, so a failed
 * assertion names WHY the panel was empty instead of only that it was.
 */
async function describeUserDetail(page: Page): Promise<string> {
  let cache = "(query cache unavailable)";
  try {
    cache = await page.evaluate(() => {
      type Q = {
        queryKey: unknown[];
        state: {
          status: string;
          error: unknown;
          dataUpdatedAt: number;
          data: unknown;
        };
      };
      const client = (
        window as unknown as {
          __ethioQueryClient?: { getQueryCache: () => { getAll: () => Q[] } };
        }
      ).__ethioQueryClient;
      if (!client) return "(no __ethioQueryClient — not an E2E build?)";
      return client
        .getQueryCache()
        .getAll()
        .filter((q) => {
          const key = q.queryKey.map((part) => String(part)).join("/");
          return key.includes("detail") || key.includes("activity") || key.includes("user");
        })
        .map((q) => {
          const error = q.state.error as { message?: string } | null;
          const data = q.state.data;
          const length = Array.isArray(data) ? data.length : data == null ? "null" : "non-array";
          return `  ${JSON.stringify(q.queryKey)} status=${q.state.status} error=${
            error?.message ?? "none"
          } dataUpdatedAt=${q.state.dataUpdatedAt} dataLength=${length}`;
        })
        .join("\n");
    });
  } catch (error) {
    cache = `(query cache read threw: ${(error as Error).message})`;
  }

  const present: string[] = [];
  for (const id of ["admin-user-detail", "user-detail-error", "user-detail-loading"]) {
    const count = await page
      .getByTestId(id)
      .count()
      .catch(() => -1);
    present.push(`${id}=${count}`);
  }

  return [
    `[INC-109] url: ${page.url()}`,
    `[INC-109] testids: ${present.join(" ")}`,
    `[INC-109] queries:\n${cache || "  (no matching queries)"}`,
  ].join("\n");
}

/**
 * INC-114 — AU-3's activity assertion failed with `dataLength=0`, which is
 * ambiguous: either no audit row was written, or the activity RPC filtered it
 * out. The dump now reads audit truth with the service client, so the next
 * failure settles that question by itself.
 */
async function describeAuditRows(userId: string): Promise<string> {
  try {
    const supabase = adminClient();
    const { data, error } = await supabase
      .from("audit_log")
      .select("action, entity_type, entity_id, created_at")
      .or(`entity_id.eq.${userId},actor_id.eq.${userId}`)
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) return `[INC-114] audit_log read failed: ${error.message}`;
    const rows = data ?? [];
    if (rows.length === 0) return `[INC-114] audit_log rows for ${userId}: NONE`;
    return [
      `[INC-114] audit_log rows for ${userId}: ${rows.length}`,
      ...rows.map(
        (row) =>
          `  action=${row.action} entity=${row.entity_type}:${row.entity_id} created_at=${row.created_at}`,
      ),
    ].join("\n");
  } catch (error) {
    return `[INC-114] audit_log read threw: ${(error as Error).message}`;
  }
}

/**
 * INC-115d — EVERY activity assertion on the user-detail surface carries the
 * same dump, not just AU-3's. A bare "element(s) not found" cannot distinguish
 * "no audit row was written" from "the activity RPC omits it" from "the list
 * was never refetched"; the rethrow below reads all three in one shot.
 */
async function expectActivity(page: Page, action: string, userId: string) {
  try {
    await expect(page.getByTestId(`activity-${action}`).first()).toBeVisible({ timeout: 15000 });
  } catch (error) {
    throw new Error(
      `${(error as Error).message}\n\n[INC-115d] expected activity row: ${action}\n${await describeUserDetail(
        page,
      )}\n${await describeAuditRows(userId)}`,
    );
  }
}

/** The negative twin: the row must be gone, with the same evidence on failure. */
async function expectNoActivity(page: Page, action: string, userId: string, count = 0) {
  try {
    await expect(page.getByTestId(`activity-${action}`)).toHaveCount(count, { timeout: 15000 });
  } catch (error) {
    throw new Error(
      `${(error as Error).message}\n\n[INC-115d] expected activity count ${count}: ${action}\n${await describeUserDetail(
        page,
      )}\n${await describeAuditRows(userId)}`,
    );
  }
}


test.describe("U1 admin users", () => {
  test("AU-1 permission: moderator is refused, admin sees the list", async ({ page }) => {
    const moderator = await createUser({ confirmed: true });
    await grantRole(moderator.id, "moderator");
    await switchUser(page, moderator.email, moderator.password);
    await waitForHydration(page);
    await page.goto("/admin/users");
    await waitForHydration(page);
    await expect(page).toHaveURL(/\/admin\/?$/);
    await expect(page.getByText(en["admin.accessDenied"])).toBeVisible({ timeout: 15000 });

    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    // INC-074: /auth is guarded for an authenticated session — sign out first.
    await switchUser(page, staff.email, staff.password);
    await page.goto("/admin/users");
    await waitForHydration(page);
    await expect(userRow(page, staff.id)).toBeVisible({ timeout: 15000 });
  });

  test("AU-2 search and status filter", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const scratch = await createUser({ confirmed: true });

    await switchUser(page, staff.email, staff.password);
    await page.goto("/admin/users");
    await waitForHydration(page);

    await page.getByTestId("users-search").fill(scratch.email);
    await expect(userRow(page, scratch.id)).toBeVisible({ timeout: 15000 });

    await page.getByTestId("users-status-filter").selectOption("deactivated");
    await expect(userRow(page, scratch.id)).toHaveCount(0);
  });

  test("AU-3 detail: reason required, deactivate, audit row, reactivate", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const scratch = await createUser({ confirmed: true });

    await switchUser(page, staff.email, staff.password);
    // U1g: the mutation is step-up gated (U1f) — enroll and reach aal2 first.
    const secret = await enrollAndStepUp(page);
    await page.goto(`/admin/users/${scratch.id}`);
    await waitForHydration(page);
    await expect(page.getByTestId("user-identity-card")).toBeVisible({ timeout: 15000 });

    await page.getByTestId("deactivate-user").click();
    await expect(page.getByTestId("reason-error")).toBeVisible();

    await page.getByTestId("deactivate-reason").fill("U1 e2e");
    await page.getByTestId("deactivate-user").click();
    await stepUpIfPrompted(page, secret);
    await expectAal2(page);
    await expect(page.getByTestId("user-status-card").getByTestId("user-status")).toHaveText(
      en["admin.users.status.deactivated"],
      { timeout: 15000 },
    );
    // INC-109 / INC-115d — this assertion has failed five times with nothing
    // but "element(s) not found". No budget or assertion change: on failure the
    // error carries the route, the query-cache state, which detail testids
    // rendered, and the target's audit rows.
    await expectActivity(page, "user.status_change", scratch.id);

    // U1d — the deactivated user sees the banner on their own settings page.
    await switchUser(page, scratch.email, scratch.password);
    await gotoReady(page, "/settings");
    await expect(page.getByTestId("account-deactivated-banner")).toBeVisible({ timeout: 15000 });

    await switchUser(page, staff.email, staff.password);
    await page.goto(`/admin/users/${scratch.id}`);
    await waitForHydration(page);
    await page.getByTestId("activate-user").click();
    // A fresh sign-in starts at aal1, so the gate fires again here.
    await stepUpIfPrompted(page, secret);
    await expectAal2(page);
    await expect(page.getByTestId("user-status-card").getByTestId("user-status")).toHaveText(
      en["admin.users.status.active"],
      { timeout: 15000 },
    );
  });

  test("AU-7 crumb: Home > Admin > Users > <name>, Users navigates back", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const scratch = await createUser({ confirmed: true });

    await switchUser(page, staff.email, staff.password);
    await page.goto(`/admin/users/${scratch.id}`);
    await waitForHydration(page);

    const crumbs = page.getByTestId("breadcrumbs").locator("li");
    await expect(page.getByTestId("breadcrumb-admin-user")).toBeVisible({ timeout: 15000 });
    expect(await crumbs.count()).toBeGreaterThanOrEqual(4);

    await page.getByTestId("breadcrumb-admin-section").click();
    await expect(page).toHaveURL(/\/admin\/users\/?$/);
  });

  test("AU-8 own row: status controls are not offered on your own record", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");

    await switchUser(page, staff.email, staff.password);
    await page.goto(`/admin/users/${staff.id}`);
    await waitForHydration(page);

    await expect(page.getByTestId("own-account-note")).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId("deactivate-user")).toHaveCount(0);
    await expect(page.getByTestId("activate-user")).toHaveCount(0);
  });

  test("AU-4 roles: assign and remove, super_admin/user never offered", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "super_admin");
    const scratch = await createUser({ confirmed: true });

    await switchUser(page, staff.email, staff.password);
    const secret = await enrollAndStepUp(page);
    await page.goto(`/admin/users/${scratch.id}`);
    await waitForHydration(page);

    const select = page.getByTestId("assign-role-select");
    await expect(select).toBeVisible({ timeout: 15000 });
    const options = await select.locator("option").allInnerTexts();
    expect(options.join(" ")).not.toContain("super_admin");

    await select.selectOption("moderator");
    await page.getByTestId("assign-role").click();
    await stepUpIfPrompted(page, secret);
    await expectAal2(page);
    await expect(page.getByTestId("role-chip-moderator")).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId("activity-role.assign").first()).toBeVisible({ timeout: 15000 });

    await page.getByTestId("role-remove-moderator").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("role-chip-moderator")).toHaveCount(0, { timeout: 15000 });
    await expect(page.getByTestId("activity-role.revoke").first()).toBeVisible({ timeout: 15000 });
  });

  test("AU-5 seam: a deactivated account cannot write a listing", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const scratch = await createUser({ confirmed: true });

    await switchUser(page, staff.email, staff.password);
    const secret = await enrollAndStepUp(page);
    await page.goto(`/admin/users/${scratch.id}`);
    await waitForHydration(page);
    await page.getByTestId("deactivate-reason").fill("U1 seam");
    await page.getByTestId("deactivate-user").click();
    await stepUpIfPrompted(page, secret);
    await expectAal2(page);
    await expect(page.getByTestId("user-status-card").getByTestId("user-status")).toHaveText(
      en["admin.users.status.deactivated"],
      { timeout: 15000 },
    );

    // Sign in AS the deactivated user and call the write seam directly.
    // INC-074: /auth is guarded while authenticated — switchUser signs out first.
    await switchUser(page, scratch.email, scratch.password);
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

    await switchUser(page, base.email, base.password);
    await gotoReady(page, "/");
    const message = await rpcFromBrowser(page, "admin_set_account_status", {
      p_user_id: victim.id,
      p_status: "deactivated",
      p_reason: "should never work",
    });
    expect(message ?? "").toContain("permission denied");
  });
  test("AU-9 edit: staff edits display name and alias, activity records it", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const scratch = await createUser({ confirmed: true });
    const alias = `u1g${Date.now().toString(36)}`;

    await switchUser(page, staff.email, staff.password);
    const secret = await enrollAndStepUp(page);
    await page.goto(`/admin/users/${scratch.id}`);
    await waitForHydration(page);

    await page.getByTestId("edit-display-name").fill("U1g Edited Name");
    await page.getByTestId("edit-seller-alias").fill(alias);
    await page.getByTestId("edit-save").click();
    await stepUpIfPrompted(page, secret);
    await expectAal2(page);

    await expect(page.getByTestId("edit-saved")).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId("activity-user.profile_edit").first()).toBeVisible({
      timeout: 15000,
    });

    await page.reload();
    await waitForHydration(page);
    await expect(page.getByTestId("edit-display-name")).toHaveValue("U1g Edited Name", {
      timeout: 15000,
    });
    await expect(page.getByTestId("edit-seller-alias")).toHaveValue(alias);
  });

  test("AU-10 edit: a duplicate alias is refused inline and nothing changes", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const holder = await createUser({ confirmed: true });
    const scratch = await createUser({ confirmed: true });
    const alias = `u1gdup${Date.now().toString(36)}`;

    await switchUser(page, staff.email, staff.password);
    const secret = await enrollAndStepUp(page);

    await page.goto(`/admin/users/${holder.id}`);
    await waitForHydration(page);
    await page.getByTestId("edit-seller-alias").fill(alias);
    await page.getByTestId("edit-save").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("edit-saved")).toBeVisible({ timeout: 15000 });

    await page.goto(`/admin/users/${scratch.id}`);
    await waitForHydration(page);
    await page.getByTestId("edit-seller-alias").fill(alias);
    await page.getByTestId("edit-save").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("edit-error")).toHaveText(
      en["admin.users.edit.errorAliasTaken"],
      { timeout: 15000 },
    );

    await page.reload();
    await waitForHydration(page);
    await expect(page.getByTestId("edit-seller-alias")).toHaveValue("", { timeout: 15000 });
  });

  test("AU-11 own row: no edit form on your own record", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");

    await switchUser(page, staff.email, staff.password);
    await page.goto(`/admin/users/${staff.id}`);
    await waitForHydration(page);

    await expect(page.getByTestId("own-account-note-edit")).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId("user-edit-form")).toHaveCount(0);
  });
});
