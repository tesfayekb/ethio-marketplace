import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";

import {
  useJobSuperAdmin,
  expectNoHorizontalOverflow,
  gotoReady,
  stepUpIfPrompted,
  switchUser,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * Phase U3 — Audit & Security (AS-*) and impersonation v1 (IMP-*).
 *
 * Law F3 restated: the browser cases prove what RENDERS; the refusal cases
 * (IMP-3) prove the SERVER is the authority — they call the RPC directly from
 * the signed-in browser client, bypassing every piece of UI.
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
    throw new Error(`[e2e:u3] role ${roleName} not found: ${roleError?.message ?? "no row"}`);
  }
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role.id, scope_type: "global" });
  if (error) throw new Error(`[e2e:u3] granting ${roleName} failed: ${error.message}`);
}

/**
 * INC-084c sixth — per-viewport scoping lives in one helper, never inline
 * (roleRow/userRow law). The audit list has a card twin at 360 and a table twin
 * at md+; tests must query inside the VISIBLE surface, because both twins are
 * in the DOM and share row testids.
 */
function auditSurface(page: Page) {
  const width = page.viewportSize()?.width ?? 1280;
  return width < 768 ? page.getByTestId("data-table-cards") : page.getByRole("table");
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

async function signInAsSuperAdmin(page: Page) {
  // eslint-disable-next-line react-hooks/rules-of-hooks -- L4: a harness helper, not a React hook
  return useJobSuperAdmin(page);
}

test.describe("U3 audit & security", () => {
  test("AS-1 gating: a plain user is refused, a moderator reads the log", async ({ page }) => {
    const plain = await leaseUser();
    await switchUser(page, plain.email, plain.password);
    await page.goto("/admin/audit");
    await waitForHydration(page);
    await expect(page.getByTestId("admin-audit")).toHaveCount(0);

    const moderator = await leaseUser();
    await grantRole(moderator.id, "moderator");
    await switchUser(page, moderator.email, moderator.password);
    await gotoReady(page, "/admin/audit");
    await expect(page.getByTestId("admin-audit")).toBeVisible();
    await expect(page.getByTestId("audit-stats")).toBeVisible();
    await expect(page.getByTestId("audit-chart")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("AS-2 filters: an action filter narrows the list", async ({ page }) => {
    const { user } = await signInAsSuperAdmin(page);
    // The MFA enrolment above wrote nothing to the audit log; a role grant does.
    await grantRole(user.id, "moderator");
    await gotoReady(page, "/admin/audit");
    await expect(page.getByTestId("admin-audit")).toBeVisible();

    // INC-092: the detail region must render ADJACENT to the row it describes,
    // never at page bottom. The assertion is a DOM RELATIONSHIP (sibling row at
    // md+, same card at 360), not a position on the page.
    // INC-084c sixth — per-viewport scoping lives in one helper, never inline
    // (roleRow/userRow law). The VISIBLE container is the card list at 360 and
    // the table at md+; both twins share the same row testids.
    const surface = auditSurface(page);
    // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: locator is already scoped to a single viewport twin (or a non-twin surface); grandfathered pending the twin-helper sweep
    const trigger = surface.locator('[data-testid^="audit-expand-"]').first();
    await expect(trigger).toBeVisible();
    const rowId = ((await trigger.getAttribute("data-testid")) ?? "").replace("audit-expand-", "");
    await trigger.click();
    // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: locator is already scoped to a single viewport twin (or a non-twin surface); grandfathered pending the twin-helper sweep
    const detail = surface.locator(`[data-testid="audit-row-${rowId}-expanded"]`).first();
    await expect(detail).toBeVisible();
    const adjacent = await detail.evaluate((element, id) => {
      const row = element.closest("tr");
      if (row) {
        const previous = row.previousElementSibling as HTMLElement | null;
        return previous?.dataset["testid"] === `audit-row-${id}`;
      }
      const card = element.closest("li");
      return Boolean(card?.querySelector(`[data-testid="audit-row-${id}-card"]`));
    }, rowId);
    expect(adjacent).toBe(true);

    await page.getByTestId("audit-search").fill("no-such-actor-value");
    await expect(page.getByTestId("data-table-empty")).toBeVisible({ timeout: 20000 });
    await expect(page.getByText(en["admin.audit.empty"])).toBeVisible();
  });

  /**
   * Bundle 11 G2b (D118, D128, D132) — the log on the agreed blocks: the
   * page's heading in the header; the toolbar's order (search, Filters,
   * Columns); the action and the entity type as pills and the two dates inside
   * Filters, a chosen date as a chip; the action locked in Columns; the
   * footer's page size kept across a reload.
   */
  test("AS-3 the log on the agreed blocks: heading, toolbar, Filters with pills and dates, Columns, page size", async ({
    page,
  }) => {
    const moderator = await leaseUser();
    await grantRole(moderator.id, "moderator");
    await switchUser(page, moderator.email, moderator.password);
    await gotoReady(page, "/admin/audit");
    await expect(page.getByTestId("audit-search")).toBeVisible({ timeout: 20000 });

    const header = page.getByTestId("audit-header");
    await expect(header.getByRole("heading", { level: 1 })).toHaveText(en["admin.audit.title"]);
    const toolbarOrder = await page.getByTestId("audit-toolbar").evaluate((node) =>
      Array.from(node.querySelectorAll("[data-testid]"))
        .map((child) => child.getAttribute("data-testid"))
        .filter((id) => ["audit-search", "audit-filters", "audit-columns"].includes(id ?? "")),
    );
    expect(toolbarOrder, "AS-3 the toolbar's order").toEqual([
      "audit-search",
      "audit-filters",
      "audit-columns",
    ]);

    await page.getByTestId("audit-filters").click();
    const panel = page.getByTestId("audit-filters-panel");
    await expect(panel.getByTestId("audit-filter-action-all")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(panel.getByTestId("audit-filter-entity-all")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    const today = new Date().toISOString().slice(0, 10);
    await panel.getByTestId("audit-filter-from").fill(today);
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await expect(page.getByTestId("audit-chips-chip-from")).toContainText(today);
    await page.getByTestId("audit-chips-chip-from-remove").click();
    await expect(page.getByTestId("audit-chips-chip-from")).toHaveCount(0);

    await page.getByTestId("audit-columns").click();
    await expect(page.getByTestId("audit-columns-action")).toBeDisabled();
    await page.keyboard.press("Escape");

    await page.getByTestId("audit-pagination-size").selectOption("10");
    await expect(page.getByTestId("audit-pagination-size")).toHaveValue("10");
    await page.reload();
    await waitForHydration(page);
    await expect(page.getByTestId("audit-pagination-size")).toHaveValue("10", { timeout: 20000 });
  });

  test(
    "IMP-1 impersonation: super admin opens a read-only session and ends it",
    { tag: "@private-identity" },
    async ({ page }) => {
      const { secret } = await signInAsSuperAdmin(page);
      const target = await leaseUser();

      await gotoReady(page, `/admin/users/${target.id}`);
      await expect(page.getByTestId("impersonation-starter")).toBeVisible();
      await page.getByTestId("impersonation-reason").fill("e2e support ticket 1234");
      await page.getByTestId("impersonation-begin").click();
      await stepUpIfPrompted(page, secret);

      await expect(page.getByTestId("impersonation-view")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("impersonation-banner")).toBeVisible();
      await expect(page.getByTestId("impersonation-readonly-note")).toBeVisible();
      // Bundle 11 G2b (D132) — the page's heading in the header; Columns on the listings.
      await expect(
        page.getByTestId("impersonation-header").getByRole("heading", { level: 1 }),
      ).toBeVisible();
      await expect(page.getByTestId("impersonation-listings-columns")).toBeVisible();
      await expectNoHorizontalOverflow(page);

      // The banner rides along on an unrelated page (global mount).
      await gotoReady(page, "/admin/audit");
      await expect(page.getByTestId("impersonation-banner")).toBeVisible();

      await page.getByTestId("impersonation-banner-end").click();
      await expect(page.getByTestId("impersonation-banner")).toHaveCount(0, { timeout: 20000 });
    },
  );

  test(
    "IMP-2 dual-actor audit: start and end are both recorded",
    { tag: "@private-identity" },
    async ({ page }) => {
      const { user, secret } = await signInAsSuperAdmin(page);
      const target = await leaseUser();

      await gotoReady(page, `/admin/users/${target.id}`);
      await page.getByTestId("impersonation-reason").fill("e2e audit evidence");
      await page.getByTestId("impersonation-begin").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("impersonation-view")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("impersonation-end").click();
      await expect(page.getByTestId("impersonation-banner")).toHaveCount(0, { timeout: 20000 });

      const { data, error } = await adminClient()
        .from("audit_log")
        .select("action, meta")
        .eq("actor_id", user.id)
        .in("action", ["impersonation.start", "impersonation.end"]);
      if (error) throw new Error(`[e2e:u3] audit read failed: ${error.message}`);
      const actions = (data ?? []).map((row) => row.action as string);
      expect(actions).toContain("impersonation.start");
      expect(actions).toContain("impersonation.end");
      const start = (data ?? []).find((row) => row.action === "impersonation.start");
      expect(JSON.stringify(start?.meta ?? {})).toContain(target.id);
    },
  );

  test(
    "IMP-3 server refusals: self, super-admin target, and a non-super caller",
    { tag: "@private-identity" },
    async ({ page }) => {
      const { user, secret } = await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/audit");
      await stepUpIfPrompted(page, secret);

      const self = await rpcFromBrowser(page, "begin_impersonation", {
        p_target: user.id,
        p_reason: "e2e self target",
      });
      expect(self ?? "").toContain("cannot impersonate yourself");

      const other = await leaseUser();
      await grantRole(other.id, "super_admin");
      const superTarget = await rpcFromBrowser(page, "begin_impersonation", {
        p_target: other.id,
        p_reason: "e2e super target",
      });
      expect(superTarget ?? "").toContain("cannot impersonate a super admin");

      const admin = await leaseUser();
      await grantRole(admin.id, "admin");
      await switchUser(page, admin.email, admin.password);
      await waitForHydration(page);
      const victim = await leaseUser();
      const refused = await rpcFromBrowser(page, "begin_impersonation", {
        p_target: victim.id,
        p_reason: "e2e non-super caller",
      });
      expect(refused ?? "").toContain("super-admin only");
    },
  );
});
