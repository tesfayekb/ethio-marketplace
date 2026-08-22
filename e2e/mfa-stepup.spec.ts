import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";

import { totp, wrongCode } from "./helpers/totp";
import { gotoReady, isMobile, switchUser, waitForHydration } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

/**
 * U1f — STEP-UP AUTHENTICATION (MF-1..MF-5).
 *
 * The TOTP codes are generated in-test from the enrolled secret with the
 * RFC 6238 helper (no new dependency). Law F3 restated: the browser assertions
 * cover what RENDERS and what the client sends; the authoritative refusals are
 * the migration proofs P1–P4 plus MF-4 below, which calls the RPCs directly.
 *
 * PRE-REQUISITE (operator item): TOTP must be enabled in
 * Supabase Dashboard → Authentication → Multi-Factor for the target project.
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
    throw new Error(`[e2e:u1f] role ${roleName} not found: ${roleError?.message ?? "no row"}`);
  }
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role.id, scope_type: "global" });
  if (error) throw new Error(`[e2e:u1f] granting ${roleName} failed: ${error.message}`);
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

/** Enrolls a TOTP factor through the settings UI and returns its secret. */
async function enrollThroughSettings(page: Page): Promise<string> {
  await gotoReady(page, "/settings");
  await page.getByTestId("mfa-enroll").click();
  await expect(page.getByTestId("mfa-qr")).toBeVisible({ timeout: 15000 });
  const secret = await page.getByTestId("mfa-secret").inputValue();
  expect(secret.length).toBeGreaterThan(10);
  await page.getByTestId("mfa-code").fill(totp(secret));
  await page.getByTestId("mfa-verify").click();
  await expect(page.getByTestId("mfa-status")).toHaveText(en["mfa.statusOn"], { timeout: 20000 });
  return secret;
}

function userRow(page: Page, userId: string) {
  return page.getByTestId(isMobile(page) ? `user-row-${userId}-card` : `user-row-${userId}`);
}

async function statusChangeCount(userId: string): Promise<number> {
  const supabase = adminClient();
  const { data, error } = await supabase
    .from("audit_log")
    .select("id")
    .eq("action", "user.status_change")
    .eq("entity_id", userId);
  if (error) throw new Error(`[e2e:u1f] audit read failed: ${error.message}`);
  return (data ?? []).length;
}

test.describe("U1f step-up authentication", () => {
  test("MF-1 enroll: QR + secret shown, a generated code activates the factor", async ({
    page,
  }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    await switchUser(page, staff.email, staff.password);

    await gotoReady(page, "/settings");
    await expect(page.getByTestId("mfa-status")).toHaveText(en["mfa.statusOff"], {
      timeout: 20000,
    });
    await enrollThroughSettings(page);
    await expect(page.getByTestId("mfa-success")).toBeVisible();
  });

  test("MF-2 gate: wrong code refused, correct code lets the action through", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const target = await createUser({ confirmed: true });
    await switchUser(page, staff.email, staff.password);
    const secret = await enrollThroughSettings(page);

    // A fresh sign-in is aal1 again — the gate must fire.
    await switchUser(page, staff.email, staff.password);
    await gotoReady(page, `/admin/users/${target.id}`);
    await page.getByTestId("deactivate-reason").fill("MF-2 proof");
    await page.getByTestId("deactivate-user").click();

    const modal = page.getByTestId("step-up-modal");
    await expect(modal).toBeVisible({ timeout: 15000 });
    await page.getByTestId("step-up-code").fill(wrongCode(secret));
    await page.getByTestId("step-up-submit").click();
    await expect(page.getByTestId("step-up-error")).toBeVisible({ timeout: 15000 });

    await page.getByTestId("step-up-code").fill(totp(secret));
    await page.getByTestId("step-up-submit").click();
    await expect(modal).toBeHidden({ timeout: 20000 });
    await expect(page.getByTestId("user-status")).toHaveText(en["admin.users.status.deactivated"], {
      timeout: 20000,
    });
    expect(await statusChangeCount(target.id)).toBeGreaterThan(0);
  });

  test("MF-3 no factor: the modal explains and the RPC is never called", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const target = await createUser({ confirmed: true });
    await switchUser(page, staff.email, staff.password);

    await gotoReady(page, `/admin/users/${target.id}`);
    await page.getByTestId("deactivate-reason").fill("MF-3 proof");
    await page.getByTestId("deactivate-user").click();

    await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId("step-up-settings-link")).toBeVisible();
    expect(await statusChangeCount(target.id)).toBe(0);
  });

  test("MF-4 server: permission first, then step-up — the RPC refuses regardless of UI", async ({
    page,
  }) => {
    const target = await createUser({ confirmed: true });

    const base = await createUser({ confirmed: true });
    await switchUser(page, base.email, base.password);
    await waitForHydration(page);
    const baseError = await rpcFromBrowser(page, "admin_set_account_status", {
      p_user_id: target.id,
      p_status: "deactivated",
      p_reason: "MF-4",
    });
    expect(baseError ?? "").toMatch(/permission denied/i);

    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    await switchUser(page, staff.email, staff.password);
    await waitForHydration(page);
    const staffError = await rpcFromBrowser(page, "admin_set_account_status", {
      p_user_id: target.id,
      p_status: "deactivated",
      p_reason: "MF-4",
    });
    expect(staffError ?? "").toMatch(/step-up required/i);
    expect(await statusChangeCount(target.id)).toBe(0);
  });

  test("MF-5 unenroll requires a fresh verification", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    await switchUser(page, staff.email, staff.password);
    const secret = await enrollThroughSettings(page);

    await page.getByTestId("mfa-remove").click();
    await page.getByTestId("mfa-remove-code").fill(wrongCode(secret));
    await page.getByTestId("mfa-remove-confirm").click();
    await expect(page.getByTestId("mfa-error")).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId("mfa-status")).toHaveText(en["mfa.statusOn"]);

    await page.getByTestId("mfa-remove-code").fill(totp(secret));
    await page.getByTestId("mfa-remove-confirm").click();
    await expect(page.getByTestId("mfa-status")).toHaveText(en["mfa.statusOff"], {
      timeout: 20000,
    });
  });
});

/**
 * U1f-4 (INC-081) — A BEARER aal2 CLAIM IS NOT A STEP-UP.
 *
 * Both proofs come from the operator repro: after unenrolling the only factor
 * the session still carried aal2 and `deactivate` went through; and the
 * enrollment verify itself elevated the session for its whole lifetime.
 *
 * MF-7 shortens the client window through the DEV override
 * (`window.__ethioStepUp = { windowMs }`); the SERVER window stays 10 minutes,
 * so the re-verification the modal collects is accepted normally. The
 * authoritative refusals are migration proofs P5/P7.
 */
test.describe("U1f-4 step-up freshness", () => {
  test("MF-6 unenrolling the only factor drops the stepped-up state", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const target = await createUser({ confirmed: true });
    await switchUser(page, staff.email, staff.password);
    const secret = await enrollThroughSettings(page);

    // Remove the only factor — the session may still claim aal2.
    await page.getByTestId("mfa-remove").click();
    await page.getByTestId("mfa-remove-code").fill(totp(secret));
    await page.getByTestId("mfa-remove-confirm").click();
    await expect(page.getByTestId("mfa-status")).toHaveText(en["mfa.statusOff"], {
      timeout: 20000,
    });
    await expect(page.getByTestId("mfa-off-warning")).toBeVisible();

    await gotoReady(page, `/admin/users/${target.id}`);
    await page.getByTestId("deactivate-reason").fill("MF-6 proof");
    await page.getByTestId("deactivate-user").click();

    await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    expect(await statusChangeCount(target.id)).toBe(0);
  });

  test("MF-7 a verification older than the window re-prompts", async ({ page }) => {
    const staff = await createUser({ confirmed: true });
    await grantRole(staff.id, "admin");
    const target = await createUser({ confirmed: true });
    await page.addInitScript(() => {
      (window as unknown as { __ethioStepUp: { windowMs: number } }).__ethioStepUp = {
        windowMs: 3000,
      };
    });
    await switchUser(page, staff.email, staff.password);
    const secret = await enrollThroughSettings(page);

    // Enrollment elevated the session; wait past the (shortened) window.
    await page.waitForTimeout(4000);

    await gotoReady(page, `/admin/users/${target.id}`);
    await page.getByTestId("deactivate-reason").fill("MF-7 proof");
    await page.getByTestId("deactivate-user").click();

    const modal = page.getByTestId("step-up-modal");
    await expect(modal).toBeVisible({ timeout: 15000 });
    await page.getByTestId("step-up-code").fill(totp(secret));
    await page.getByTestId("step-up-submit").click();
    await expect(modal).toBeHidden({ timeout: 20000 });
    await expect(page.getByTestId("user-status")).toHaveText(en["admin.users.status.deactivated"], {
      timeout: 20000,
    });
  });
});
