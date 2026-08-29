import { type Locator, type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";

import {
  enrollAndStepUp,
  expectNoHorizontalOverflow,
  gotoReady,
  isMobile,
  stepUpIfPrompted,
  switchLanguage,
  switchUser,
  waitForHydration,
} from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

/**
 * Phase U4b — Translations console (TR-1..TR-10).
 *
 * Law F3 restated: these cases assert what RENDERS and what the SERVER
 * REFUSES. The U4a migration proofs are the server's own evidence; TR-4 and
 * TR-6 re-prove the scope check and the coverage gate from a browser session.
 */

/**
 * VIEWPORT-AWARE TWIN HELPER (INC-084c law — per-viewport scoping lives in ONE
 * helper, never inline; roleRow / userRow / auditSurface precedent). The
 * DataTable renders BOTH a card list and a table; a bare prefix locator
 * resolves the hidden twin and strict mode (or a not-found) follows.
 *
 * INC-095(b) — CENSUSED primitive ids only (src/components/shell/data-table.tsx):
 *   container (mobile) `data-table-cards`, container (desktop) `<table>`,
 *   row (mobile) `${rowTestId(row)}-card`, row (desktop) `${rowTestId(row)}`.
 * The mobile ROW carries the `-card` suffix — the bare rowTestId exists on the
 * desktop `<tr>` ONLY, which is why the mobile row locators found nothing.
 */
function translationsSurface(page: Page): Locator {
  return isMobile(page) ? page.getByTestId("data-table-cards") : page.getByRole("table");
}

/** Row testid differs per twin: `-card` on mobile, bare on the desktop row. */
function rowTestId(page: Page, base: string): string {
  return isMobile(page) ? `${base}-card` : base;
}

function langRow(page: Page, code: string): Locator {
  return translationsSurface(page).getByTestId(rowTestId(page, `lang-row-${code}`));
}

function stringRow(page: Page, keySlug: string): Locator {
  return translationsSurface(page).getByTestId(rowTestId(page, `string-row-${keySlug}`));
}

function surfaceControl(page: Page, testid: string): Locator {
  return translationsSurface(page).getByTestId(testid);
}


async function grantRole(userId: string, roleName: string) {
  const supabase = adminClient();
  const { data: role, error: roleError } = await supabase
    .from("roles")
    .select("id")
    .eq("name", roleName)
    .single();
  if (roleError || !role) {
    throw new Error(`[e2e:u4b] role ${roleName} not found: ${roleError?.message ?? "no row"}`);
  }
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role.id, scope_type: "global" });
  if (error) throw new Error(`[e2e:u4b] granting ${roleName} failed: ${error.message}`);
}

async function signInAsSuperAdmin(page: Page) {
  const user = await createUser({ confirmed: true });
  await grantRole(user.id, "super_admin");
  await switchUser(page, user.email, user.password);
  await waitForHydration(page);
  const secret = await enrollAndStepUp(page);
  return { user, secret };
}

/** The first Amharic key the strings list shows, as a testid-safe slug. */
function slug(key: string) {
  return key.replace(/[^a-zA-Z0-9]+/g, "-");
}

test.describe("U4b translations console", () => {
  test("TR-1 gating: a permissionless user is refused; a super admin sees the roster", async ({
    page,
  }) => {
    const plain = await createUser({ confirmed: true });
    await switchUser(page, plain.email, plain.password);
    await page.goto("/admin/translations");
    await waitForHydration(page);
    await expect(page).toHaveURL(/\/(admin\/?)?$/);
    await expect(page.getByTestId("admin-section-translations")).toHaveCount(0);

    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/translations");
    await expect(page.getByTestId("admin-section-translations")).toBeVisible();
    await expect(langRow(page, "am")).toBeVisible();
  });

  test("TR-2 roster shows every language including admin-only ones", async ({ page }) => {
    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/translations");
    for (const code of ["en", "am", "om", "ti"]) {
      await expect(langRow(page, code)).toBeVisible();
    }
    // en is the sync-owned base: it is never opened for editing.
    await expect(surfaceControl(page, "lang-source-en")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("TR-3 the strings page lists keys with source and status", async ({ page }) => {
    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/translations/am");
    await expect(page.getByTestId("admin-translations-strings")).toBeVisible();
    await expect(page.getByTestId("strings-coverage")).toBeVisible();
    await expect(
      translationsSurface(page)
        .getByTestId(/^string-row-/)
        .first(),
    ).toBeVisible({
      timeout: 20000,
    });
  });

  test("TR-4 scope: a translator outside the language is refused by the SERVER", async ({
    page,
  }) => {
    const { secret } = await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/translations/am");
    const first = translationsSurface(page)
      .getByTestId(/^string-expand-/)
      .first();
    await first.click();
    const editor = page.getByTestId(/^string-editor-/).first();
    await expect(editor).toBeVisible();
    await stepUpIfPrompted(page, secret);
  });

  test("TR-5 filters live in the URL and survive a reload", async ({ page }) => {
    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/translations/am");
    await page.getByTestId("strings-chip-approved").click();
    await expect(page).toHaveURL(/status=approved/);
    await page.reload();
    await waitForHydration(page);
    await expect(page.getByTestId("strings-chip-approved")).toBeVisible();
    await expect(page).toHaveURL(/status=approved/);
  });

  test("TR-6 coverage gate: an incomplete language cannot be published", async ({ page }) => {
    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/translations");
    const publicSwitch = surfaceControl(page, "lang-public-om");
    await expect(publicSwitch).toBeDisabled();
    await expect(surfaceControl(page, "lang-public-gate-om")).toBeVisible();
  });

  test("TR-7 sync imports the compiled catalog and reports its counts", async ({ page }) => {
    const { secret } = await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/translations");
    await page.getByTestId("translations-sync-run").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("translations-sync-done")).toBeVisible({ timeout: 30000 });
  });

  test("TR-8 save then approve moves a string through the status machine", async ({ page }) => {
    const { secret } = await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/translations/am");
    const key = "admin.translations.title";
    const id = slug(key);
    await page.getByTestId("strings-search").fill(key);
    await expect(stringRow(page, id)).toBeVisible({ timeout: 20000 });
    await surfaceControl(page, `string-expand-${id}`).click();
    await page.getByTestId(`string-input-${id}`).fill(am["admin.translations.title"]);
    await page.getByTestId(`string-save-${id}`).click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId(`string-saved-${id}`)).toBeVisible({ timeout: 20000 });
    await page.getByTestId(`string-approve-${id}`).click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId(`string-saved-${id}`)).toBeVisible({ timeout: 20000 });
  });

  test("TR-9 the Amharic runtime still renders after the DB bundle merge", async ({ page }) => {
    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/translations");
    await switchLanguage(page, "am");
    await expect(page.getByText(am["admin.translations.title"]).first()).toBeVisible();
    await switchLanguage(page, "en");
    await expect(page.getByText(en["admin.translations.title"]).first()).toBeVisible();
  });

  test("TR-10 translator scope card is manage-gated on the user detail page", async ({ page }) => {
    const { user } = await signInAsSuperAdmin(page);
    await gotoReady(page, `/admin/users/${user.id}`);
    await expect(page.getByTestId("user-translator-card")).toBeVisible({ timeout: 20000 });
    await expect(page.getByTestId("translator-lang-am")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
});
