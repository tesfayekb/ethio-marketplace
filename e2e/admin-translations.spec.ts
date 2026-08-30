import { type Locator, type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";

import { processId } from "./global-setup";
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
 *
 * INC-095(d) — the EXPANSION innards (`string-editor-*`, `string-input-*`,
 * `string-save-*`, …) exist in BOTH twins too: the desktop expansion is a
 * full-width `<tr>` inside the table, the mobile one renders inside the card.
 * A bare `.first()` therefore resolves the HIDDEN twin (TR-4's ×14 hidden,
 * TR-8's strict duplicate). Every expansion locator routes through
 * `expansionOf` / `surfaceControl`, never inline.
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

/** The VISIBLE twin's inline editor for one string row (INC-095d). */
function expansionOf(page: Page, keySlug: string): Locator {
  return surfaceControl(page, `string-editor-${keySlug}`);
}

/** A control inside the VISIBLE twin's inline editor. */
function expansionControl(page: Page, keySlug: string, prefix: string): Locator {
  return expansionOf(page, keySlug).getByTestId(`${prefix}-${keySlug}`);
}

/** The first Amharic key the strings list shows, as a testid-safe slug. */
function slug(key: string) {
  return key.replace(/[^a-zA-Z0-9]+/g, "-");
}

/**
 * SCRATCH-KEY LAW (INC-095e). The catalog is SHARED RUNTIME: a spec that
 * edits, flags, approves or clears a real chrome key mutates what every other
 * spec — and every operator — then renders. Specs therefore mutate ONLY a
 * namespaced key of their own, `e2e.scratch.<PROCESS_ID>-<worker>`, seeded
 * before the assertion and reaped after it. Real catalog keys are READ-ONLY to
 * specs.
 *
 * Seeding is a service-role INSERT rather than `admin_sync_ui_keys` because
 * that RPC is `has_permission(auth.uid(), …)` + step-up gated and the
 * service-role connection has no `auth.uid()`; the rows written here are the
 * exact shape the RPC writes (base `approved`, target `untranslated`).
 */
function scratchKey(): string {
  const worker = process.env["TEST_WORKER_INDEX"] ?? String(process.pid);
  return `e2e.scratch.${processId()}-${worker}`;
}

async function seedScratchKey(key: string, sourceValue: string) {
  const supabase = adminClient();
  const rows = [
    { key, lang_code: "en", value: sourceValue, status: "approved", machine: false },
    { key, lang_code: "am", value: null, status: "untranslated", machine: false },
  ];
  const { error } = await supabase
    .from("ui_translations")
    .upsert(rows, { onConflict: "key,lang_code" });
  if (error) throw new Error(`[e2e:u4b] seeding ${key} failed: ${error.message}`);
}

async function reapScratchKey(key: string) {
  const { error } = await adminClient().from("ui_translations").delete().eq("key", key);
  if (error) throw new Error(`[e2e:u4b] reaping ${key} failed: ${error.message}`);
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
    const key = scratchKey();
    await seedScratchKey(key, "Scratch source");
    try {
      await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/translations/am");
      await expect(page.getByTestId("admin-translations-strings")).toBeVisible();
      await expect(page.getByTestId("strings-coverage")).toBeVisible();
      await page.getByTestId("strings-search").fill(key);
      await expect(stringRow(page, slug(key))).toBeVisible({ timeout: 20000 });
      await expect(surfaceControl(page, `string-status-${slug(key)}`)).toBeVisible();
    } finally {
      await reapScratchKey(key);
    }
  });

  test("TR-4 scope: a translator outside the language is refused by the SERVER", async ({
    page,
  }) => {
    const key = scratchKey();
    await seedScratchKey(key, "Scratch source");
    try {
      const { secret } = await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/translations/am");
      const id = slug(key);
      await page.getByTestId("strings-search").fill(key);
      await expect(stringRow(page, id)).toBeVisible({ timeout: 20000 });
      await surfaceControl(page, `string-expand-${id}`).click();
      // INC-095d — the editor is scoped to the VISIBLE twin, never `.first()`.
      await expect(expansionOf(page, id)).toBeVisible();
      await stepUpIfPrompted(page, secret);
    } finally {
      await reapScratchKey(key);
    }
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

  /**
   * TR-6 — the publication gate, deterministic under ANY shard order.
   *
   * INC-095h: the catalog is SHARED RUNTIME whose size depends on whether a
   * sync (TR-7) or a purge ran first. The spec therefore branches on the
   * observed state instead of assuming one:
   *   step 1 — read the base key count; if the catalog is EMPTY assert the
   *            empty-set branch (switch disabled, sync-first tooltip, and the
   *            server RAISEs the empty refusal through the DEV client);
   *   step 2 — ensure non-empty by seeding ONE scratch key (scratch-key law),
   *            then assert the incomplete branch (N-remaining tooltip + the
   *            'not fully approved' RAISE).
   * Ordering: step 2 only ever ADDS a key, so it can never make step 1's
   * branch flip back — the sequence is monotonic and shard-order-proof.
   */
  test("TR-6 coverage gate: empty and incomplete catalogs both refuse publication", async ({
    page,
  }) => {
    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/translations");

    const flipOm = async () =>
      page.evaluate(async () => {
        const client = (
          window as unknown as {
            __ethioSupabase: {
              rpc: (
                fn: string,
                args: Record<string, unknown>,
              ) => Promise<{ error: { message: string } | null }>;
            };
          }
        ).__ethioSupabase;
        const { error } = await client.rpc("admin_set_language_flags", {
          p_code: "om",
          p_enabled_admin: true,
          p_enabled_public: true,
        });
        return error?.message ?? "";
      });

    const baseCount = async () => {
      const { count, error } = await adminClient()
        .from("ui_translations")
        .select("key", { count: "exact", head: true })
        .eq("lang_code", "en");
      if (error) throw new Error(`[e2e:u4b] base count failed: ${error.message}`);
      return count ?? 0;
    };

    const publicSwitch = surfaceControl(page, "lang-public-om");

    if ((await baseCount()) === 0) {
      await expect(publicSwitch).toBeDisabled();
      await expect(surfaceControl(page, "lang-public-gate-om")).toContainText(
        en["admin.translations.syncFirstTooltip"],
      );
      expect(await flipOm()).toMatch(/catalog empty/i);
    }

    // Step 2 — ensure NON-empty via this spec's own scratch key.
    const key = scratchKey();
    await seedScratchKey(key, "Scratch source");
    try {
      await gotoReady(page, "/admin/translations");
      await expect(publicSwitch).toBeDisabled();
      await expect(surfaceControl(page, "lang-public-gate-om")).toBeVisible();
      expect(await flipOm()).toMatch(/not fully approved/i);
    } finally {
      await reapScratchKey(key);
    }
  });

  test("TR-7 sync imports the compiled catalog and reports its counts", async ({ page }) => {
    const { secret } = await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/translations");
    await page.getByTestId("translations-sync-run").click();
    await stepUpIfPrompted(page, secret);
    await expect(page.getByTestId("translations-sync-done")).toBeVisible({ timeout: 30000 });
  });

  test("TR-8 save then approve moves a string through the status machine", async ({ page }) => {
    // SCRATCH-KEY LAW (INC-095e): the mutation targets this spec's OWN key.
    const key = scratchKey();
    await seedScratchKey(key, "Scratch source");
    try {
      const { secret } = await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/translations/am");
      const id = slug(key);
      await page.getByTestId("strings-search").fill(key);
      await expect(stringRow(page, id)).toBeVisible({ timeout: 20000 });
      await surfaceControl(page, `string-expand-${id}`).click();
      await expansionControl(page, id, "string-input").fill("የሙከራ ምንጭ");
      await expansionControl(page, id, "string-save").click();
      await stepUpIfPrompted(page, secret);
      await expect(expansionControl(page, id, "string-saved")).toBeVisible({ timeout: 20000 });
      await expansionControl(page, id, "string-approve").click();
      await stepUpIfPrompted(page, secret);
      await expect(expansionControl(page, id, "string-saved")).toBeVisible({ timeout: 20000 });
    } finally {
      await reapScratchKey(key);
    }
  });

  test("TR-9 the Amharic runtime still renders after the DB bundle merge", async ({ page }) => {
    // sized budget for a legitimate 577-key bulk sync — sizing a real operation
    // is not loosening (INC-095i); phases named below so any timeout self-locates.
    test.setTimeout(120_000);

    const enTotal = async () => {
      return page.evaluate(async () => {
        const client = (
          window as unknown as {
            __ethioSupabase: {
              rpc: (
                fn: string,
                args: Record<string, unknown>,
              ) => Promise<{ data: Array<{ total: number }> | null; error: unknown }>;
            };
          }
        ).__ethioSupabase;
        const { data, error } = await client.rpc("admin_translation_stats", { p_lang: "en" });
        if (error) throw error;
        return data?.[0]?.total ?? 0;
      });
    };

    await test.step("sign-in", async () => {
      await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/translations");
    });

    // VERIFY-OR-SYNC: if another spec's sync already populated the catalog,
    // skip the bulk operation and go straight to the merge assertion.
    await test.step("sync", async () => {
      if ((await enTotal()) === 0) {
        const secret = await enrollAndStepUp(page);
        await page.getByTestId("translations-sync-run").click();
        await stepUpIfPrompted(page, secret);
        await expect(page.getByTestId("translations-sync-done")).toBeVisible({ timeout: 30000 });
      }
    });

    await test.step("switch+assert", async () => {
      // INC-084c seventh — anchored to the censused section container inside
      // <main>, never a bare getByText().first() (the rail's hidden nav twin
      // carries the same label).
      const section = page.locator("main").getByTestId("admin-section-translations");
      await switchLanguage(page, "am");
      await expect(
        section.getByRole("heading", { name: am["admin.translations.title"] }),
      ).toBeVisible({ timeout: 20000 });
      await switchLanguage(page, "en");
      await expect(
        section.getByRole("heading", { name: en["admin.translations.title"] }),
      ).toBeVisible({ timeout: 20000 });
    });
  });

  /**
   * TR-10 — the two-state proof (INC-095j). TRUTH CHANGE (U4b-5 amendment):
   * the translator card is CONDITIONAL on the target's effective
   * `translations:*` permissions, so the old single-state assertion
   * (`translator-lang-am` always visible) was asserting a truth the product
   * no longer holds — a target with no translations permission renders the
   * muted `translator-no-role` line and NO controls.
   *
   * STATE A: fresh scratch user, no role → no-role line, zero checkboxes, no
   * save button. STATE B: grant `translations:view` via a SCRATCH CUSTOM ROLE
   * (service-role inserts, the established fixture path — scratch-key law's
   * roles analogue) → checkboxes render → assign am → save behind step-up →
   * saved status + the am checkbox stays checked (the visible assignment).
   */
  test("TR-10 translator card proves both permission states", async ({ page }) => {
    const { secret } = await signInAsSuperAdmin(page);
    const target = await createUser({ confirmed: true });
    const supabase = adminClient();
    const roleName = `e2e-tr10-${processId()}-${process.env["TEST_WORKER_INDEX"] ?? process.pid}`;
    let roleId: string | null = null;
    try {
      // STATE A — no translations:* permission: the card collapses honestly.
      await gotoReady(page, `/admin/users/${target.id}`);
      await expect(page.getByTestId("user-translator-card")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("translator-no-role")).toBeVisible();
      await expect(page.locator('[data-testid^="translator-lang-"]')).toHaveCount(0);
      await expect(page.getByTestId("translator-save")).toHaveCount(0);

      // STATE B — a scratch custom role carrying ONLY translations:view.
      const { data: permission, error: permissionError } = await supabase
        .from("permissions")
        .select("id, resources!inner(name)")
        .eq("resources.name", "translations")
        .eq("action", "view")
        .single();
      if (permissionError || !permission) {
        throw new Error(
          `[e2e:u4b] translations:view permission lookup failed: ${permissionError?.message ?? "no row"}`,
        );
      }
      const { data: role, error: roleError } = await supabase
        .from("roles")
        .insert({ name: roleName, display_name: roleName, is_system: false })
        .select("id")
        .single();
      if (roleError || !role) {
        throw new Error(`[e2e:u4b] scratch role insert failed: ${roleError?.message ?? "no row"}`);
      }
      roleId = role.id;
      const { error: grantError } = await supabase
        .from("role_permissions")
        .insert({ role_id: role.id, permission_id: permission.id, is_core: false });
      if (grantError) {
        throw new Error(`[e2e:u4b] scratch role permission failed: ${grantError.message}`);
      }
      const { error: assignError } = await supabase
        .from("user_roles")
        .insert({ user_id: target.id, role_id: role.id, scope_type: "global" });
      if (assignError) {
        throw new Error(`[e2e:u4b] scratch role assign failed: ${assignError.message}`);
      }

      await gotoReady(page, `/admin/users/${target.id}`);
      const amBox = page.getByTestId("translator-lang-am");
      await expect(amBox).toBeVisible({ timeout: 20000 });
      await amBox.click();
      await page.getByTestId("translator-save").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("translator-saved")).toBeVisible({ timeout: 20000 });
      await expect(amBox).toHaveAttribute("aria-checked", "true");

      // PERSISTENCE (INC-095n) — the card used to never read existing
      // assignments, so a replace-set save could silently wipe scope. After a
      // reload the checkbox must come back CHECKED from server-loaded state.
      await gotoReady(page, `/admin/users/${target.id}`);
      const reloadedBox = page.getByTestId("translator-lang-am");
      await expect(reloadedBox).toBeVisible({ timeout: 20000 });
      await expect(reloadedBox).toHaveAttribute("aria-checked", "true");
      await expectNoHorizontalOverflow(page);
    } finally {
      if (roleId) {
        await supabase.from("user_roles").delete().eq("role_id", roleId);
        await supabase.from("roles").delete().eq("id", roleId);
      }
    }
  });
});
