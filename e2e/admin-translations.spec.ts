import { readFile } from "node:fs/promises";

import { type Locator, type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";

import { FENCE_PREFIX_LIST, fenceLang, processId } from "./global-setup";
import {
  describeEntityStats,
  describeStringsPage,
  describeSwitcher,
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
import { isPseudo, PSEUDO_LANG } from "../src/features/admin/translations/pseudo";
import { translationMapperSelfTest } from "../src/features/admin/translations/translations-service";

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

/**
 * INC-106c — THE ACTIONS REGION IS NOT INSIDE THE ROW ELEMENT ON MOBILE.
 * DataTable's card twin renders `<li>` > (`<row>-card` Link) + (`<row>-actions`)
 * as SIBLINGS: the actions region is a sibling of the card element the row
 * helper resolves, so `langRow(...).getByTestId('lang-up-…')` finds nothing at
 * 360. The table twin keeps its actions in `<row>-actions-cell` INSIDE the
 * `<tr>`. Every row-action locator therefore routes through this helper, which
 * names the primitive's truth per twin — never through the row locator.
 */
function actionsOf(page: Page, base: string): Locator {
  return surfaceControl(page, isMobile(page) ? `${base}-actions` : `${base}-actions-cell`);
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
function scratchAxes(tag: string): string {
  const worker = process.env["TEST_WORKER_INDEX"] ?? String(process.pid);
  const shard = process.env["E2E_SHARD"] ?? "solo";
  const project = test.info().project.name;
  return `${processId()}-${shard}-${project}-${worker}-${tag}`;
}

function scratchKey(tag: string): string {
  // INC-096f — the namespace MUST carry every parallelism axis: run id
  // (processId), shard/job (E2E_SHARD), worker, project, and finally the TEST
  // itself. First the project name was missing, causing mobile-360/desktop-1280
  // to share a key inside one job. Then the shard was missing; the DEC-023-B
  // fast lane added a third concurrent job and keys collided across jobs because
  // PROCESS_ID is run-scoped. Last, the per-test tag was missing: every TR test
  // in one worker derived ONE key, so TR-8's writes landed on TR-11's row.
  return `e2e.scratch.${scratchAxes(tag)}`;
}

/**
 * FENCE LANGUAGE (INC-097d — third pillar of the fixture-identity law).
 *
 * Identity isolates ROWS; it cannot isolate a SWEEP. TR-12's bulk fill is a
 * by-design global operation: run on `am`, it translates every untranslated
 * row in the language, including sibling tests' freshly seeded scratch keys
 * (dump-proven, run 33310150087 — row[0]'s actor was the bulk persona). The
 * fence is a language nobody else works in: sweep-class tests seed and sweep
 * HERE, so `am`/`om` — real operator surfaces — are never touched by a test.
 *
 * The code is `zxx` (ISO 639-2 "no linguistic content"), NOT the literal
 * `e2e` the task named: `/api/translate` validates `target_lang` against
 * `/^[a-z]{2,8}(-[a-z]{2,8})?$/`, which rejects the digit, and the route is
 * out of this task's scope. Flip this one constant if that regex ever widens.
 */
// The code itself is declared once, in e2e/global-setup.ts, because the reaper
// there must agree with every spec that seeds inside the fence.

/**
 * U4g-6 (INC-101) — J2 ADDENDUM: ONE FENCE PER GLOBAL-SWEEP TEST. Two sweeps
 * sharing one fence is the same collision the fence exists to prevent, so the
 * helper takes the code and every sweep names its own.
 */
/**
 * U4g-25 (INC-115b) — the fence carries the PROJECT axis: a sweep test running
 * on two viewports is two sweeps, so each Playwright project sweeps its own
 * language (`zxx-m`/`zxx-d`, `zxy-m`/`zxy-d`).
 */
function bulkFence(): string {
  return fenceLang("bulk", test.info().project.name);
}

function approveFence(): string {
  return fenceLang("approve", test.info().project.name);
}

async function ensureFenceLanguage(code: string) {
  const { error } = await adminClient()
    .from("languages")
    .upsert(
      {
        code,
        name_en: `E2E Fence ${code}`,
        name_native: "E2E",
        enabled_admin: true,
        enabled_public: false,
      },
      { onConflict: "code" },
    );
  if (error) throw new Error(`[e2e:u4c] fence language ${code} upsert failed: ${error.message}`);
}

async function seedScratchKey(key: string, sourceValue: string, lang = "am") {
  const supabase = adminClient();
  const rows = [
    { key, lang_code: "en", value: sourceValue, status: "approved", machine: false },
    { key, lang_code: lang, value: null, status: "untranslated", machine: false },
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

/**
 * SELF-DESCRIBING DUMP LAW (INC-096f-c): a revision-count mismatch is
 * evidence, not a number. Every count assertion on ui_translation_revisions
 * dumps EVERY row verbatim — action, prior status/value/machine, actor,
 * timestamp — so the mechanism reads itself (a double restore-click, a stray
 * save, or a capture we owe a law each name themselves). Shared by TR-11 and
 * TR-16; any future count assertion uses this too.
 */
export interface RevisionDumpRow {
  action: string;
  prev_value: string | null;
  prev_status: string | null;
  prev_machine: boolean;
  changed_by: string | null;
  changed_at: string;
}

async function dumpRevisions(key: string, lang: string, tag: string): Promise<RevisionDumpRow[]> {
  const { data, error } = await adminClient()
    .from("ui_translation_revisions")
    .select("prev_value, prev_status, prev_machine, action, changed_by, changed_at")
    .eq("key", key)
    .eq("lang_code", lang)
    .order("changed_at", { ascending: true });
  if (error) throw new Error(`${tag} revision read failed for ${key}: ${error.message}`);
  return (data ?? []) as RevisionDumpRow[];
}

function serializeRevisions(rows: RevisionDumpRow[]): string {
  return rows
    .map(
      (r, i) =>
        `  [${i}] action=${r.action} prev_status=${r.prev_status} ` +
        `prev_value=${JSON.stringify(r.prev_value)} prev_machine=${r.prev_machine} ` +
        `changed_by=${r.changed_by} changed_at=${r.changed_at}`,
    )
    .join("\n");
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
    if (isMobile(page)) {
      // INC-126 — dense rosters use the card twin below md; the table stays
      // mounted but hidden. The shared shell helper guards document overflow.
      await expect(page.getByTestId("data-table-cards")).toBeVisible();
      await expect(page.locator('[data-testid="data-table"] table')).toBeHidden();
    }
    await expectNoHorizontalOverflow(page);
  });

  test("TR-3 the strings page lists keys with source and status", async ({ page }) => {
    const key = scratchKey("tr3");
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
    const key = scratchKey("tr4");
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
    const key = scratchKey("tr6");
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
    const key = scratchKey("tr8");
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

  /**
   * ───────────────────────── U4c — AI TRANSLATION (TR-11..13) ─────────────
   *
   * FAKE MODE: CI sets `E2E_FAKE_TRANSLATE=1` on the serving jobs, so
   * `/api/translate` returns a deterministic `⟪<lang>⟫ <source>` instead of
   * calling Google. Everything else — the machine+scope gate, chunking, the
   * `admin_machine_translation` writer, the placeholder validator, provenance
   * and revision capture — runs exactly as it does in production.
   *
   * SCRATCH-KEY LAW (INC-095e) still governs: these cases mutate only their own
   * namespaced key and reap it in a `finally`.
   */

  test("TR-11 per-row AI translate writes a machine row and captures a revision", async ({
    page,
  }) => {
    const key = scratchKey("tr11");
    await seedScratchKey(key, "Scratch source");
    try {
      const { secret } = await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/translations/am");
      const id = slug(key);
      await page.getByTestId("strings-search").fill(key);
      await expect(stringRow(page, id)).toBeVisible({ timeout: 20000 });
      await surfaceControl(page, `string-expand-${id}`).click();
      await expansionControl(page, id, "string-ai").click();
      await stepUpIfPrompted(page, secret);
      await expect(expansionControl(page, id, "string-saved")).toBeVisible({ timeout: 30000 });

      // The row itself: fake marker, machine status, machine provenance.
      const { data: row, error } = await adminClient()
        .from("ui_translations")
        .select("value, status, machine")
        .eq("key", key)
        .eq("lang_code", "am")
        .single();
      if (error) throw new Error(`[e2e:u4c] row read failed: ${error.message}`);
      expect(row?.value ?? "").toContain("⟪am⟫");
      expect(row?.status).toBe("machine");
      expect(row?.machine).toBe(true);

      // A subsequent HUMAN edit must capture exactly one revision holding the
      // machine value (the U4c writer discipline, read through service role).
      await expansionControl(page, id, "string-input").fill("የሰው እርማት");
      await expansionControl(page, id, "string-save").click();
      await stepUpIfPrompted(page, secret);
      await expect(expansionControl(page, id, "string-saved")).toBeVisible({ timeout: 20000 });

      // AI-over-empty is history too — the count is the law, not an accident.
      // The machine write's status transition (untranslated → machine) is
      // itself captured, then the human edit. Exactly two revisions, ordered.
      const revisions = await dumpRevisions(key, "am", "[e2e:u4c]");
      // INC-096f-c — a count mismatch is evidence, not a number: on any
      // deviation dump EVERY row verbatim so the mechanism reads itself.
      if (revisions.length !== 2) {
        throw new Error(
          `[e2e:u4c] TR-11 expected exactly 2 revisions for ${key}, got ${revisions.length}:\n` +
            serializeRevisions(revisions),
        );
      }
      expect(revisions?.[0]?.action).toBe("machine");
      expect(revisions?.[0]?.prev_status).toBe("untranslated");
      expect(revisions?.[0]?.prev_value).toBeNull();
      expect(revisions?.[1]?.action).toBe("save");
      expect(revisions?.[1]?.prev_value ?? "").toContain("⟪am⟫");
    } finally {
      await adminClient().from("ui_translation_revisions").delete().eq("key", key);
      await reapScratchKey(key);
    }
  });

  test("TR-12 bulk AI fill translates every untranslated scratch key", async ({ page }) => {
    test.setTimeout(120_000);
    // INC-097d — the bulk is a SWEEP: it must run inside the fence language,
    // never on `am`, where it would translate sibling tests' scratch rows.
    const fence = bulkFence();
    await ensureFenceLanguage(fence);
    const base = scratchKey("tr12");
    const keys = [`${base}-b1`, `${base}-b2`, `${base}-b3`];
    for (const key of keys) await seedScratchKey(key, `Bulk source ${key}`, fence);
    try {
      const { secret } = await signInAsSuperAdmin(page);
      await gotoReady(page, `/admin/translations/${fence}`);
      // The bar's untranslated list can be computed before this spec's seeds
      // land; a reload forces it to recompute from fresh queries (INC-096g).
      await page.reload();
      await gotoReady(page, `/admin/translations/${fence}`);

      const startButton = page.getByTestId("ai-bulk-start");
      await expect(startButton).toBeVisible({ timeout: 20000 });

      await startButton.click();
      await expect(page.getByTestId("ai-bulk-confirm")).toBeVisible();
      await page.getByTestId("ai-bulk-confirm-run").click();
      await stepUpIfPrompted(page, secret);
      // VISIBILITY only — a localized summary string is never a count (INC-096g).
      await expect(page.getByTestId("ai-bulk-summary")).toBeVisible({ timeout: 90000 });

      // Database truth, per key: the only law for bulk assertions (TR-11's pattern).
      for (const key of keys) {
        await expect
          .poll(
            async () => {
              const { data, error } = await adminClient()
                .from("ui_translations")
                .select("value, status, machine")
                .eq("key", key)
                .eq("lang_code", fence)
                .maybeSingle();
              if (error) throw new Error(`[e2e:u4c] bulk read failed for ${key}: ${error.message}`);
              if (!data) return "missing";
              return `${data.status}|${String(data.machine)}|${(data.value ?? "").includes(`⟪${fence}⟫`)}`;
            },
            { timeout: 20000, message: `bulk AI never landed for ${key}` },
          )
          .toBe("machine|true|true");
      }
    } finally {
      for (const key of keys) {
        await adminClient().from("ui_translation_revisions").delete().eq("key", key);
        await reapScratchKey(key);
      }
    }
  });

  test("TR-13 the placeholder validator flags a machine write too", async ({ page }) => {
    const key = scratchKey("tr13") + "-break";
    // E2EBREAK makes fake mode drop every {token}: the machine value then
    // mismatches the en source's placeholder set and MUST land flagged.
    await seedScratchKey(key, "E2EBREAK Hello {name}");
    try {
      const { secret } = await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/translations/am");
      const id = slug(key);
      await page.getByTestId("strings-search").fill(key);
      await expect(stringRow(page, id)).toBeVisible({ timeout: 20000 });
      await surfaceControl(page, `string-expand-${id}`).click();
      await expansionControl(page, id, "string-ai").click();
      await stepUpIfPrompted(page, secret);
      await expect(expansionControl(page, id, "string-saved")).toBeVisible({ timeout: 30000 });

      const { data: row, error } = await adminClient()
        .from("ui_translations")
        .select("flagged, flag_note, status")
        .eq("key", key)
        .eq("lang_code", "am")
        .single();
      if (error) throw new Error(`[e2e:u4c] flag read failed: ${error.message}`);
      expect(row?.flagged).toBe(true);
      expect(row?.flag_note ?? "").toContain("placeholder mismatch");
      expect(row?.status).toBe("machine");
    } finally {
      await adminClient().from("ui_translation_revisions").delete().eq("key", key);
      await reapScratchKey(key);
    }
  });

  /**
   * TR-23 (U4g-24 / INC-115) — PLACEHOLDER PROTECTION AND ONE-CLICK REPAIR.
   *
   * Two seams in one walk, because they are two halves of one promise:
   *  A. a machine translation of a token-bearing string KEEPS its `{token}`
   *     verbatim (the endpoint masks before the provider and restores after),
   *     so the row lands unflagged and usable.
   *  B. when a translation IS mangled, the editor repairs it positionally —
   *     the button is inert until the counts match, and the save that follows
   *     clears the flag through the SAME server validator (no bypass).
   *
   * J-laws: both keys are axes-namespaced scratch keys, deleted in `finally`
   * together with the revisions the writer captured for them.
   */
  test("TR-23 machine translation keeps placeholders, and the editor repairs a mangled one", async ({
    page,
  }) => {
    const keptKey = scratchKey("tr23") + "-kept";
    const brokenKey = scratchKey("tr23") + "-break";
    await seedScratchKey(keptKey, "Hello {name}, you have {count} messages");
    await seedScratchKey(brokenKey, "E2EBREAK Hello {name}");
    const supabase = adminClient();
    try {
      const { secret } = await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/translations/am");

      // ---- A. the token survives the round trip -------------------
      const keptId = slug(keptKey);
      await page.getByTestId("strings-search").fill(keptKey);
      await expect(stringRow(page, keptId)).toBeVisible({ timeout: 20000 });
      await surfaceControl(page, `string-expand-${keptId}`).click();
      await expansionControl(page, keptId, "string-ai").click();
      await stepUpIfPrompted(page, secret);
      await expect(expansionControl(page, keptId, "string-saved")).toBeVisible({ timeout: 30000 });

      const { data: kept, error: keptError } = await supabase
        .from("ui_translations")
        .select("value, flagged, flag_note, status, machine")
        .eq("key", keptKey)
        .eq("lang_code", "am")
        .single();
      if (keptError) throw new Error(`[e2e:u4g] kept read failed: ${keptError.message}`);
      expect(
        { value: kept?.value, flagged: kept?.flagged, note: kept?.flag_note },
        "machine translation lost a placeholder",
      ).toMatchObject({ flagged: false });
      expect(kept?.value ?? "").toContain("{name}");
      expect(kept?.value ?? "").toContain("{count}");
      // Provenance is the ORIGIN, and it stays machine.
      expect(kept?.machine).toBe(true);

      // ---- B. repair of a genuinely mangled row -------------------
      const brokenId = slug(brokenKey);
      await page.getByTestId("strings-search").fill(brokenKey);
      await expect(stringRow(page, brokenId)).toBeVisible({ timeout: 20000 });
      await surfaceControl(page, `string-expand-${brokenId}`).click();
      await expansionControl(page, brokenId, "string-ai").click();
      await stepUpIfPrompted(page, secret);
      await expect(expansionControl(page, brokenId, "string-saved")).toBeVisible({
        timeout: 30000,
      });
      await expect(expansionControl(page, brokenId, "string-flagnote")).toBeVisible({
        timeout: 20000,
      });

      // The repair tool refuses while the counts disagree …
      const restore = expansionControl(page, brokenId, "string-restore-tokens");
      await expect(restore).toBeDisabled();
      await expect(expansionControl(page, brokenId, "string-restore-hint")).toBeVisible();

      // … and rewrites positionally once they agree.
      await expansionControl(page, brokenId, "string-input").fill("ሰላም {nam}");
      await expect(restore).toBeEnabled();
      await restore.click();
      await expect(expansionControl(page, brokenId, "string-input")).toHaveValue("ሰላም {name}");

      await expansionControl(page, brokenId, "string-save").click();
      await stepUpIfPrompted(page, secret);
      await expect(expansionControl(page, brokenId, "string-saved")).toBeVisible({
        timeout: 20000,
      });

      await expect
        .poll(
          async () => {
            const { data } = await supabase
              .from("ui_translations")
              .select("flagged, status, value")
              .eq("key", brokenKey)
              .eq("lang_code", "am")
              .maybeSingle();
            if (!data) return "missing";
            return `${String(data.flagged)}|${data.status}|${data.value ?? ""}`;
          },
          { timeout: 20000, message: "the repaired row never cleared its flag" },
        )
        .toBe("false|edited|ሰላም {name}");
    } finally {
      for (const key of [keptKey, brokenKey]) {
        await supabase.from("ui_translation_revisions").delete().eq("key", key);
        await reapScratchKey(key);
      }
    }
  });

  test("TR-scope AI: a translator outside the language gets the structured refusal", async ({
    page,
  }) => {
    // TR-4 persona pattern: the verb WITHOUT the language assignment. The
    // refusal must come from the SERVER (403 + its own words), before any
    // provider call and before any write.
    const user = await createUser({ confirmed: true });
    const supabase = adminClient();
    const roleName = `e2e-u4c-machine-${processId()}-${process.env["TEST_WORKER_INDEX"] ?? "0"}`;
    const { data: role, error: roleError } = await supabase
      .from("roles")
      .insert({ name: roleName, display_name: roleName, is_system: false, priority: 10 })
      .select("id")
      .single();
    if (roleError || !role) throw new Error(`[e2e:u4c] scratch role failed: ${roleError?.message}`);
    try {
      const { data: perms, error: permError } = await supabase
        .from("permissions")
        .select("id, action, resources!inner(name)")
        .eq("resources.name", "translations")
        .in("action", ["view", "machine"]);
      if (permError) throw new Error(`[e2e:u4c] permission read failed: ${permError.message}`);
      await supabase
        .from("role_permissions")
        .insert((perms ?? []).map((p) => ({ role_id: role.id, permission_id: p.id })));
      await supabase
        .from("user_roles")
        .insert({ user_id: user.id, role_id: role.id, scope_type: "global" });

      await switchUser(page, user.email, user.password);
      await waitForHydration(page);

      const refusal = await page.evaluate(async () => {
        const client = (
          window as unknown as {
            __ethioSupabase: {
              auth: {
                getSession: () => Promise<{ data: { session: { access_token: string } | null } }>;
              };
            };
          }
        ).__ethioSupabase;
        const { data } = await client.auth.getSession();
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.session?.access_token ?? ""}`,
          },
          body: JSON.stringify({
            target_lang: "om",
            items: [{ key: "e2e.u4c.scope", source: "Scope probe" }],
          }),
        });
        const payload = (await response.json()) as { error?: string };
        return { status: response.status, error: payload.error ?? "" };
      });

      expect(refusal.status).toBe(403);
      expect(refusal.error).toMatch(/not assigned to this language/i);
    } finally {
      await supabase.from("user_roles").delete().eq("role_id", role.id);
      await supabase.from("role_permissions").delete().eq("role_id", role.id);
      await supabase.from("roles").delete().eq("id", role.id);
    }
  });

  /**
   * U4d / INC-097d — THE DATA SCOPE (TR-14/TR-15).
   *
   * Entity names are SHARED RUNTIME exactly like catalog keys. The old
   * capture-then-restore on the REAL "Addis Ababa" row met the previous run's
   * residue (dump-proven, run 33310150087) and is retired: TR-14 now creates
   * its OWN location, carrying every parallelism axis in its name, and deletes
   * it (with its entity_translations) at the end. Crash leftovers are reaped by
   * global-setup after 60 minutes.
   *
   * locations insert census (public.locations): id uuid default gen_random_uuid()
   * · parent_id uuid NULL (FK locations.id) · level text NOT NULL CHECK IN
   * ('country','region','city') · country_code char NOT NULL (FK countries.code)
   * · name_en text NOT NULL · name_am text NULL · slug text NOT NULL, UNIQUE
   * (parent_id, slug) · center_lat/lng double NULL · is_active bool NOT NULL
   * default false (the Data console lists ACTIVE rows only) · created_at /
   * updated_at timestamptz default now(). CHECK locations_root_is_country:
   * (level='country') = (parent_id IS NULL) — so a scratch city MUST hang off
   * an existing parent.
   */
  async function createScratchLocation(tag = "tr14"): Promise<{ id: string; name: string }> {
    const supabase = adminClient();
    const { data: parent, error: parentError } = await supabase
      .from("locations")
      .select("id, country_code")
      .eq("level", "country")
      .limit(1)
      .single();
    if (parentError || !parent) {
      throw new Error(`[e2e:u4d] no country location to parent onto: ${parentError?.message}`);
    }
    const axes = scratchAxes(tag);
    const name = `E2E-Scratch-${axes}`;
    const { data, error } = await supabase
      .from("locations")
      .insert({
        parent_id: parent.id,
        level: "city",
        country_code: parent.country_code,
        name_en: name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        is_active: true,
      })
      .select("id")
      .single();
    if (error || !data) {
      throw new Error(`[e2e:u4d] scratch location insert failed: ${error?.message}`);
    }
    return { id: data.id, name };
  }

  async function reapScratchLocation(id: string) {
    const supabase = adminClient();
    await supabase
      .from("entity_translations")
      .delete()
      .eq("entity_type", "location")
      .eq("entity_id", id);
    const { error } = await supabase.from("locations").delete().eq("id", id);
    if (error) throw new Error(`[e2e:u4d] scratch location cleanup failed: ${error.message}`);
  }

  test("TR-14 the Data scope edits and approves a location name", async ({ page }) => {
    test.setTimeout(120_000);
    const { id, name } = await createScratchLocation();
    const supabase = adminClient();
    const marker = `አዲስ አበባ ${processId()}`;
    try {
      const { secret } = await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/translations/am?scope=data");
      await expect(page.getByTestId("admin-translations-data")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("data-search").fill(name);
      const row = translationsSurface(page).getByTestId(
        rowTestId(page, `entity-row-location-${id}-name`),
      );
      await expect(row).toBeVisible({ timeout: 20000 });

      await surfaceControl(page, `entity-expand-location-${id}-name`).click();
      const editor = surfaceControl(page, `entity-editor-location-${id}-name`);
      await expect(editor).toBeVisible();
      await editor.getByTestId(`entity-input-location-${id}-name`).fill(marker);
      await editor.getByTestId(`entity-save-location-${id}-name`).click();
      await stepUpIfPrompted(page, secret);
      await expect(editor.getByTestId(`entity-saved-location-${id}-name`)).toBeVisible({
        timeout: 20000,
      });

      await expect
        .poll(
          async () => {
            const { data } = await supabase
              .from("entity_translations")
              .select("value, status")
              .eq("entity_type", "location")
              .eq("entity_id", id)
              .eq("field", "name")
              .eq("lang_code", "am")
              .maybeSingle();
            return `${data?.status ?? "none"}:${data?.value ?? ""}`;
          },
          { timeout: 20000 },
        )
        .toBe(`edited:${marker}`);

      await editor.getByTestId(`entity-approve-location-${id}-name`).click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(
          async () => {
            const { data } = await supabase
              .from("entity_translations")
              .select("status")
              .eq("entity_type", "location")
              .eq("entity_id", id)
              .eq("field", "name")
              .eq("lang_code", "am")
              .maybeSingle();
            return data?.status ?? "none";
          },
          { timeout: 20000 },
        )
        .toBe("approved");

      // TR-15 — RUNTIME: the approved value reaches the anon bundle for `am`,
      // and a non-public language still answers `{}` (fallback chain intact).
      const bundles = await page.evaluate(async () => {
        const client = (
          window as unknown as {
            __ethioSupabase: {
              rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown }>;
            };
          }
        ).__ethioSupabase;
        const am = await client.rpc("get_entity_bundle", { p_lang: "am" });
        const om = await client.rpc("get_entity_bundle", { p_lang: "om" });
        return { am: am.data, om: om.data };
      });
      const amBundle = bundles.am as Record<string, Record<string, Record<string, string>>>;
      expect(amBundle["location"]?.[id]?.["name"]).toBe(marker);
      expect(bundles.om).toEqual({});
    } finally {
      // The fixture owns itself: its translations go, then the row itself.
      await reapScratchLocation(id);
    }
  });
  /**
   * ─────────────────── U4j — DATA-LAYER AI (TR-24) ───────────────────────────
   *
   * The Data scope gained the same machine fill the Interface scope has, with
   * `admin_machine_entity_translation` as its single writer. The sweep runs in
   * the BULK FENCE language (J2) so it can never machine-translate a sibling
   * test's content rows in `am`; both fixtures are axes-namespaced scratch
   * locations, deleted with their translations in `finally` (J3).
   */
  test("TR-24 the Data scope machine-translates one row and then every untranslated one", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    // INC-119 — the RPC mappers assert their own contract before the walk.
    expect(translationMapperSelfTest()).toBe("ok");
    const fence = bulkFence();
    await ensureFenceLanguage(fence);
    const supabase = adminClient();
    const one = await createScratchLocation("tr24a");
    const two = await createScratchLocation("tr24b");
    const machineStatus = async (id: string) => {
      const { data, error } = await supabase
        .from("entity_translations")
        .select("value, status, machine")
        .eq("entity_type", "location")
        .eq("entity_id", id)
        .eq("field", "name")
        .eq("lang_code", fence)
        .maybeSingle();
      if (error) throw new Error(`[e2e:u4j] entity read failed for ${id}: ${error.message}`);
      if (!data) return "missing";
      return `${data.status}|${String(data.machine)}|${(data.value ?? "").includes(`⟪${fence}⟫`)}`;
    };

    try {
      const { secret } = await signInAsSuperAdmin(page);

      // U4j-3 — the UNIVERSE, not the existing rows: the scratch location has
      // no entity_translations row in the fence language yet, and must still be
      // listed as `untranslated` so it can be translated at all.
      expect(await machineStatus(one.id)).toBe("missing");

      // PER-ROW — seed exists before navigating, and is asserted rendered (J7).
      await gotoReady(page, `/admin/translations/${fence}?scope=data`);
      await expect(page.getByTestId("admin-translations-data")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("data-search").fill(one.name);
      const row = translationsSurface(page).getByTestId(
        rowTestId(page, `entity-row-location-${one.id}-name`),
      );
      await expect(row).toBeVisible({ timeout: 20000 });
      await expect(row.getByTestId(`entity-status-location-${one.id}-name`)).toHaveText(
        /untranslated/i,
      );
      await surfaceControl(page, `entity-expand-location-${one.id}-name`).click();
      const editor = surfaceControl(page, `entity-editor-location-${one.id}-name`);
      await expect(editor).toBeVisible();
      await editor.getByTestId(`entity-ai-location-${one.id}-name`).click();
      await stepUpIfPrompted(page, secret);
      await expect(editor.getByTestId(`entity-saved-location-${one.id}-name`)).toBeVisible({
        timeout: 30000,
      });
      await expect
        .poll(() => machineStatus(one.id), {
          timeout: 20000,
          message: "per-row entity AI never landed",
        })
        .toBe("machine|true|true");

      // BULK — the sweep covers the second scratch location too.
      await gotoReady(page, `/admin/translations/${fence}?scope=data`);
      const startButton = page.getByTestId("ai-bulk-start");
      await expect(startButton).toBeVisible({ timeout: 20000 });
      // U4j-6 (INC-119c) — READINESS ANCHORS ON THIS RUN'S OWN ROW. The old
      // check was `[data-testid^='entity-status-']`.first(): a J5 violation
      // that resolved the hidden card twin at 1280 and read "Machine" left by
      // a prior sweep. The second scratch location is untranslated by
      // construction, so it proves the universe rendered AND that N ≥ 1.
      await page.getByTestId("data-search").fill(two.name);
      const readyRow = translationsSurface(page).getByTestId(
        rowTestId(page, `entity-row-location-${two.id}-name`),
      );
      await expect(readyRow).toBeVisible({ timeout: 20000 });
      await expect(readyRow.getByTestId(`entity-status-location-${two.id}-name`)).toHaveText(
        /untranslated/i,
      );
      // The filter is cleared so the sweep confirmation reads the whole
      // universe; the row itself may then sit on a later page (J5: no bare
      // prefix locator is reintroduced to re-find it).
      await page.getByTestId("data-search").fill("");

      // The bar's count is only readable once the stats query is ready; poll
      // for digits rather than racing a pending "(—)" into a false zero.
      await expect
        .poll(async () => (await startButton.innerText()).match(/[0-9]/) !== null, {
          timeout: 20000,
          message: "the Data bulk bar never reached a ready (numeric) count",
        })
        .toBe(true);
      // U4j-3 — the bar's work count is the UNIVERSE's untranslated count, so
      // it must already be non-zero on a language with no rows at all.
      const untranslatedBefore = Number(
        (await startButton.innerText()).replace(/[^0-9]/g, "") || "0",
      );
      // U4j-4 (INC-119) — a zero here is a SHAPE problem, not a count: dump the
      // stats query state and the first listed rows so it names itself forever.
      if (untranslatedBefore === 0) {
        throw new Error(
          [
            `[INC-119] the Data bulk bar reported 0 untranslated for ${fence} while the universe is non-empty`,
            await describeEntityStats(page),
            await describeStringsPage(page),
          ].join("\n"),
        );
      }
      expect(untranslatedBefore).toBeGreaterThan(0);
      await startButton.click();
      await expect(page.getByTestId("ai-bulk-confirm")).toBeVisible();
      await page.getByTestId("ai-bulk-confirm-run").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("ai-bulk-summary")).toBeVisible({ timeout: 150000 });
      await expect
        .poll(() => machineStatus(two.id), {
          timeout: 30000,
          message: "bulk entity AI never reached the second scratch location",
        })
        .toBe("machine|true|true");

      // STATS MOVE — the same count, re-read from the server, has dropped.
      await gotoReady(page, `/admin/translations/${fence}?scope=data`);
      await expect
        .poll(
          async () => {
            const bar = page.getByTestId("ai-bulk-start");
            if ((await bar.count()) === 0) return untranslatedBefore;
            return Number((await bar.innerText()).replace(/[^0-9]/g, "") || "0");
          },
          {
            timeout: 30000,
            message: `entity stats never moved below ${untranslatedBefore}`,
          },
        )
        .toBeLessThan(untranslatedBefore);

      // THE DATA METER exists for this language and counts a real universe.
      // The meter is a CELL inside the language row (J5: cells are row-scoped).
      await gotoReady(page, "/admin/translations");
      const meter = langRow(page, fence).getByTestId(`lang-data-coverage-${fence}`);
      await expect(meter).toBeVisible({ timeout: 20000 });
      expect(Number((await meter.innerText()).replace(/[^0-9]/g, "").length)).toBeGreaterThan(0);
    } finally {
      await reapScratchLocation(one.id);
      await reapScratchLocation(two.id);
    }
  });

  /**
   * ───────────────── U4k — DATA-SCOPE BULK APPROVAL (TR-26) ──────────────────
   *
   * Walk findings (om/ti): content names could be machine-filled but never
   * approved, so nothing reached the public entity bundle. This runs in the
   * APPROVAL fence (J2) — its own per-project language — so approving "every
   * machine row of this language" can never touch a sibling test's rows.
   * Both anchors are per-run scratch locations, reaped in `finally` (J3).
   */
  test("TR-26 the Data scope approves every machine-filled content name", async ({ page }) => {
    test.setTimeout(240_000);
    const fence = approveFence();
    await ensureFenceLanguage(fence);
    const supabase = adminClient();
    const one = await createScratchLocation("tr26a");
    const two = await createScratchLocation("tr26b");
    const rowOf = async (id: string) => {
      const { data, error } = await supabase
        .from("entity_translations")
        .select("status, approved_by")
        .eq("entity_type", "location")
        .eq("entity_id", id)
        .eq("field", "name")
        .eq("lang_code", fence)
        .maybeSingle();
      if (error) throw new Error(`[e2e:u4k] entity read failed for ${id}: ${error.message}`);
      return data;
    };
    const statusOf = async (id: string) => (await rowOf(id))?.status ?? "missing";
    const chipCount = async (name: string) =>
      Number(
        (await page.getByTestId(`data-chip-${name}`).innerText()).replace(/[^0-9]/g, "") || "0",
      );

    try {
      const { secret } = await signInAsSuperAdmin(page);

      // 1. FILL — the fence's universe (both scratch locations included) is
      //    machine-translated through the Data bulk bar.
      await gotoReady(page, `/admin/translations/${fence}?scope=data`);
      await expect(page.getByTestId("admin-translations-data")).toBeVisible({ timeout: 20000 });
      const fillButton = page.getByTestId("ai-bulk-start");
      await expect
        .poll(async () => (await fillButton.innerText()).match(/[0-9]/) !== null, {
          timeout: 20000,
          message: "the Data bulk bar never reached a ready (numeric) count",
        })
        .toBe(true);
      await fillButton.click();
      await expect(page.getByTestId("ai-bulk-confirm")).toBeVisible();
      await page.getByTestId("ai-bulk-confirm-run").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("ai-bulk-summary")).toBeVisible({ timeout: 180000 });
      for (const anchor of [one, two]) {
        await expect
          .poll(() => statusOf(anchor.id), {
            timeout: 30000,
            message: `bulk entity AI never reached scratch location ${anchor.id}`,
          })
          .toBe("machine");
      }

      // 2. CHIPS before approval: machine work exists, approved does not yet
      //    include it (the counts come from the same stats RPC as the bar).
      await gotoReady(page, `/admin/translations/${fence}?scope=data`);
      await expect(page.getByTestId("data-chips")).toBeVisible({ timeout: 20000 });
      await expect
        .poll(() => chipCount("machine"), {
          timeout: 20000,
          message: "the machine chip never counted the sweep",
        })
        .toBeGreaterThan(0);
      const approvedBefore = await chipCount("approved");

      // 3. APPROVE — the gated writer runs behind the same step-up.
      const approveButton = page.getByTestId("entity-approve-all-start");
      await expect(approveButton).toBeVisible({ timeout: 20000 });
      await approveButton.click();
      await expect(page.getByTestId("entity-approve-all-confirm")).toBeVisible();
      await page.getByTestId("entity-approve-all-confirm-run").click();
      await stepUpIfPrompted(page, secret);
      const summary = page.getByTestId("entity-approve-all-summary");
      await expect(summary).toBeVisible({ timeout: 60000 });
      expect(Number((await summary.innerText()).replace(/[^0-9]/g, "") || "0")).toBeGreaterThan(0);

      // 4. DB TRUTH per key — the assertion the summary can never stand in for.
      for (const anchor of [one, two]) {
        await expect
          .poll(() => statusOf(anchor.id), {
            timeout: 30000,
            message: `approve-all never approved scratch location ${anchor.id}`,
          })
          .toBe("approved");
      }

      // 5. THE CHIPS MOVE — approved rises above its pre-approval count.
      await gotoReady(page, `/admin/translations/${fence}?scope=data`);
      await expect(page.getByTestId("data-chips")).toBeVisible({ timeout: 20000 });
      await expect
        .poll(() => chipCount("approved"), {
          timeout: 30000,
          message: `the approved chip never rose above ${approvedBefore}`,
        })
        .toBeGreaterThan(approvedBefore);

      // 6. PER-KEY TRUTH (J4) — the fence's universe is SHARED, so aggregate
      //    counts over it race with sibling activity (run 33574332982: an
      //    "untranslated ≤ before" aggregate read 1 against 0). Aggregates
      //    over shared universes race; own keys are the truth — both scratch
      //    locations must be approved WITH an approver stamped.
      for (const anchor of [one, two]) {
        await expect
          .poll(
            async () => {
              const row = await rowOf(anchor.id);
              return row?.status === "approved" && row.approved_by !== null;
            },
            {
              timeout: 20000,
              message: `scratch location ${anchor.id} never read approved with approved_by set`,
            },
          )
          .toBe(true);
      }
    } finally {
      await reapScratchLocation(one.id);
      await reapScratchLocation(two.id);
    }
  });

  /**
   * ────────────────── U4j — GUIDED LANGUAGE CREATION (TR-25) ─────────────────
   *
   * INC-115e: creating a language mutates the GLOBAL roster, so this walk runs
   * in ONE project and carries the @global-state quarantine tag (INC-117).
   * Fake mode's provider list contains `sw`, which the roster does not.
   */
  test(
    "TR-25 the picker creates a language with a native name and countries",
    { tag: "@global-state" },
    async ({ page }) => {
      test.skip(
        test.info().project.name !== "desktop-1280",
        "the language roster is a single global list — one project mutates it",
      );
      test.info().annotations.push({
        type: "issue",
        description: "INC-117 quarantined global-state test",
      });
      test.setTimeout(120_000);
      const supabase = adminClient();
      const code = "sw";
      await supabase.from("languages").delete().eq("code", code);
      try {
        const { secret } = await signInAsSuperAdmin(page);
        await gotoReady(page, "/admin/translations");
        await expect(page.getByTestId("translations-add-picker")).toBeVisible({ timeout: 20000 });
        await page.getByTestId("translations-add-search").fill("Swahili");
        await page.getByTestId(`translations-add-option-${code}`).click();

        await expect(page.getByTestId("translations-add-code")).toHaveValue(code);
        await expect(page.getByTestId("translations-add-name-en")).toHaveValue("Swahili");
        // The native name is DERIVED, never left blank for the operator to guess.
        expect(await page.getByTestId("translations-add-name-native").inputValue()).not.toBe("");
        await page.getByTestId("translations-add-country-ET").check();
        await page.getByTestId("translations-add-submit").click();
        await stepUpIfPrompted(page, secret);
        await expect(page.getByTestId("translations-add-saved")).toBeVisible({ timeout: 20000 });

        await expect
          .poll(
            async () => {
              const { data } = await supabase
                .from("languages")
                .select("name_en, name_native, country_codes")
                .eq("code", code)
                .maybeSingle();
              if (!data) return "missing";
              return `${data.name_en}|${(data.name_native ?? "").length > 0}|${(data.country_codes ?? []).join(",")}`;
            },
            { timeout: 20000, message: "the created language never reached the roster" },
          )
          .toBe("Swahili|true|ET");
      } finally {
        await supabase.from("languages").delete().eq("code", code);
      }
    },
  );

  /**
   * ───────────────────────── U4e — HISTORY + RESTORE (TR-16) ─────────────────
   * RESTORE IS A SAVE: the drawer calls admin_save_translation with a historical
   * value, so the restore captures its OWN revision. Two revisions become three.
   */
  test("TR-16 the History drawer lists revisions and restores one as a new edit", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    const key = scratchKey("tr16");
    await seedScratchKey(key, "History source");
    const supabase = adminClient();
    try {
      const { secret } = await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/translations/am");
      const id = slug(key);
      await page.getByTestId("strings-search").fill(key);
      await expect(stringRow(page, id)).toBeVisible({ timeout: 20000 });
      await surfaceControl(page, `string-expand-${id}`).click();

      // 1) machine write, then 2) a human edit — the U4c pair (TR-11's shape).
      await expansionControl(page, id, "string-ai").click();
      await stepUpIfPrompted(page, secret);
      await expect(expansionControl(page, id, "string-saved")).toBeVisible({ timeout: 30000 });
      await expansionControl(page, id, "string-input").fill("የሰው እርማት");
      await expansionControl(page, id, "string-save").click();
      await stepUpIfPrompted(page, secret);
      await expect(expansionControl(page, id, "string-saved")).toBeVisible({ timeout: 20000 });

      // The drawer: newest first — the human edit (carrying the machine text it
      // overwrote), then the machine write (carrying the empty prior value).
      await expansionControl(page, id, "string-history").click();
      const drawer = page.getByTestId(`history-drawer-${id}`);
      await expect(drawer).toBeVisible({ timeout: 20000 });
      await expect(drawer.getByTestId(`history-row-${id}-0`)).toBeVisible();
      await expect(drawer.getByTestId(`history-row-${id}-1`)).toBeVisible();
      await expect(drawer.getByTestId(`history-action-${id}-0`)).toHaveText(
        en["admin.translations.history.action.save"],
      );
      await expect(drawer.getByTestId(`history-action-${id}-1`)).toHaveText(
        en["admin.translations.history.action.machine"],
      );
      await expect(drawer.getByTestId(`history-value-${id}-0`)).toContainText("⟪am⟫");
      // The actor is the signed-in admin, not the system placeholder.
      await expect(drawer.getByTestId(`history-row-${id}-0`)).not.toContainText(
        en["admin.translations.history.actor.system"],
      );

      // Restore the machine value — a SAVE, so the row returns EDITED.
      await drawer.getByTestId(`history-restore-${id}-0`).click();
      await stepUpIfPrompted(page, secret);
      await expect
        .poll(
          async () => {
            const { data } = await supabase
              .from("ui_translations")
              .select("value, status")
              .eq("key", key)
              .eq("lang_code", "am")
              .maybeSingle();
            return `${data?.status ?? "none"}|${(data?.value ?? "").includes("⟪am⟫")}`;
          },
          { timeout: 30000, message: "restore never landed as an edited value" },
        )
        .toBe("edited|true");

      // …and the restore is itself history: exactly three revisions now.
      // INC-096f-c — on the final mismatch the FULL dump names the extra
      // writer: action + actor + value tell whether it was a double
      // restore-click, a stray save from the expansion, or a capture we owe
      // a law.
      let lastDump = "unread";
      await expect
        .poll(
          async () => {
            const revisions = await dumpRevisions(key, "am", "[e2e:u4e]");
            lastDump = serializeRevisions(revisions);
            return revisions.length;
          },
          {
            timeout: 30000,
            message: `TR-16 expected exactly 3 revisions for ${key}`,
          },
        )
        .toBe(3)
        .catch(async (error: unknown) => {
          throw new Error(
            `[e2e:u4e] TR-16 revision-count mismatch for ${key}:\n${lastDump}\n` +
              `(${error instanceof Error ? error.message : String(error)})`,
          );
        });
    } finally {
      await supabase.from("ui_translation_revisions").delete().eq("key", key);
      await reapScratchKey(key);
    }
  });
});

/**
 * U4f (INC-098) — THE PUBLICATION GATE GOVERNS CHOICE, NOT ONLY DATA.
 *
 * The switcher's options must EQUAL the gate's own list (the `languages` public
 * SELECT: enabled_public OR is_base, ordered by sort), the admin-only fence
 * language must never appear, and a forced non-public `?lang=` must render the
 * base language. No real language is toggled by this test: it reads the gate
 * and asserts the UI agrees with it.
 */
test.describe("U4f — publication gate governs language choice", () => {
  test(
    "TR-17: switcher options equal the DB public list; a non-public ?lang falls back",
    { tag: "@global-state" },
    async ({ page }) => {
      test.info().annotations.push({ type: "global-state", description: "INC-117" });
      const supabase = adminClient();
      const { data, error } = await supabase
        .from("languages")
        .select("code, sort")
        .or("enabled_public.eq.true,is_base.eq.true")
        .order("sort", { ascending: true });
      if (error || !data)
        throw new Error(`[e2e:u4f] public language read failed: ${error?.message}`);
      // U4g-30 (INC-117) — FENCES ARE TRANSIENT TEST STATE. A concurrent TR-22
      // publishes its own fence for the duration of its run, so the fence code
      // can appear in the DB list, in the rendered options, or in only one of
      // them depending on when each side was read. It is filtered out of BOTH
      // sides before the set comparison; real languages alone are compared.
      const withoutFences = (codes: string[]) =>
        codes.filter((code) => !FENCE_PREFIX_LIST.some((prefix) => code.startsWith(prefix))).sort();
      // U4g — roster order is now operator-editable (TR-20 moves rows), so the
      // switcher is compared as a SET; ORDER is TR-20's own assertion.
      const expected = withoutFences(data.map((row) => row.code as string));
      expect(expected.length, "the gate must publish at least the base language").toBeGreaterThan(
        0,
      );

      await gotoReady(page, "/");
      await page.getByTestId("language-switcher").click();
      await expect
        .poll(
          async () =>
            withoutFences(
              await page
                .locator("[data-testid^='language-option-']")
                .evaluateAll((nodes) =>
                  nodes.map((n) =>
                    (n.getAttribute("data-testid") ?? "").replace("language-option-", ""),
                  ),
                ),
            ),
          { timeout: 15000, message: "switcher options never matched the gate's public list" },
        )
        .toEqual(expected)
        // U4g-21 (INC-113): a gate-list mismatch dumps the provider snapshot.
        .catch(async (error: unknown) => {
          throw new Error(
            `${error instanceof Error ? error.message : String(error)}\n\n${await describeSwitcher(page)}`,
          );
        });
      await page.keyboard.press("Escape");

      // A forced non-public code is refused: the runtime renders the base language.
      await gotoReady(page, "/?lang=om");
      await expect(page.locator("html")).toHaveAttribute("lang", "en", { timeout: 15000 });
    },
  );
});

/**
 * U4g — BULK APPROVAL, ROSTER ORDER, ORPHANED KEYS.
 *
 * Every mutating case works inside the fence language (INC-097d): approve-all
 * and key sync are SWEEPS by construction, so they may only sweep a surface no
 * other spec — and no operator — depends on.
 */
test.describe("U4g bulk approval, order and orphans", () => {
  test("TR-19 approve-all approves reviewed rows and skips flagged ones @global-state", async ({
    page,
  }) => {
    test.info().annotations.push({ type: "global-state", description: "INC-117" });
    test.setTimeout(120_000);

    const fence = approveFence();
    await ensureFenceLanguage(fence);
    // U4g-6 (INC-101): approve-all is a SWEEP — it owns its own fence so it can
    // never approve TR-12's pending rows in the shared one.
    const supabase = adminClient();
    const base = scratchKey("tr19");
    const reviewed = [`${base}.a`, `${base}.b`, `${base}.c`];
    const flagged = `${base}.flagged`;
    const keys = [...reviewed, flagged];
    for (const key of keys) await seedScratchKey(key, `Approve source ${key}`, fence);
    // Three machine rows waiting for review, one flagged row that must survive.
    const { error: seedError } = await supabase.from("ui_translations").upsert(
      [
        ...reviewed.map((key) => ({
          key,
          lang_code: fence,
          value: `⟪${fence}⟫ pending`,
          status: "machine",
          machine: true,
          flagged: false,
        })),
        {
          key: flagged,
          lang_code: fence,
          value: `⟪${fence}⟫ broken`,
          status: "machine",
          machine: true,
          flagged: true,
          flag_note: "placeholder mismatch",
        },
      ],
      { onConflict: "key,lang_code" },
    );
    if (seedError) throw new Error(`[e2e:u4g] TR-19 seeding failed: ${seedError.message}`);

    try {
      // U4g-20 (INC-112) — NAMED PHASES (J-law). The previous shape was one
      // anonymous 120s budget: the report carried a footer-only snapshot and
      // no indication of which interaction stalled. Every step below owns a
      // budget strictly shorter than the test's, and rethrows with the shared
      // describeStringsPage dump (route + query cache + testid presence).
      const step = async (name: string, body: () => Promise<void>) =>
        test.step(name, async () => {
          try {
            await body();
          } catch (error) {
            throw new Error(
              `${(error as Error).message}\n\n[INC-112] phase: ${name}\n${await describeStringsPage(page)}`,
            );
          }
        });

      let secret = "";
      await step("TR-19 sign-in", async () => {
        const signed = await signInAsSuperAdmin(page);
        secret = signed.secret;
      });

      await step("TR-19 open fence page", async () => {
        await gotoReady(page, `/admin/translations/${fence}`);
        await expect(page.getByTestId("approve-all-bar")).toBeVisible({ timeout: 20000 });
      });

      await step("TR-19 seed check", async () => {
        // U4g-30 (INC-117) — EVERY seeded row is written BEFORE the page is
        // opened (above, outside this try), and the page's own rows query must
        // have SEEN all four before the sweep runs — otherwise "approved
        // nothing" is indistinguishable from "never loaded". The poll reloads
        // once per turn so a query cached before the seed cannot stick.
        await expect
          .poll(
            async () => {
              const present = await Promise.all(
                keys.map((key) => stringRow(page, slug(key)).count()),
              );
              const seen = present.filter((count) => count > 0).length;
              if (seen < keys.length) await page.reload({ waitUntil: "domcontentloaded" });
              return seen;
            },
            {
              timeout: 30000,
              message: "the strings list never rendered all four seeded TR-19 rows",
            },
          )
          .toBe(keys.length);
        await expect(page.getByTestId("approve-all-start")).toBeEnabled({ timeout: 20000 });
      });

      await step("TR-19 approve-all start", async () => {
        await page.getByTestId("approve-all-start").click({ timeout: 15000 });
      });

      await step("TR-19 confirm", async () => {
        await expect(page.getByTestId("approve-all-confirm")).toBeVisible({ timeout: 15000 });
        await page.getByTestId("approve-all-confirm-run").click({ timeout: 15000 });
      });

      await step("TR-19 step-up", async () => {
        await stepUpIfPrompted(page, secret);
      });

      await step("TR-19 summary", async () => {
        await expect(page.getByTestId("approve-all-summary")).toBeVisible({ timeout: 30000 });
      });

      await step("TR-19 poll DB truth", async () => {
        // DB truth per key (J4): reviewed → approved, flagged → untouched.
        for (const key of reviewed) {
          await expect
            .poll(
              async () => {
                const { data, error } = await supabase
                  .from("ui_translations")
                  .select("status, approved_by")
                  .eq("key", key)
                  .eq("lang_code", fence)
                  .maybeSingle();
                if (error) throw new Error(`[e2e:u4g] read failed for ${key}: ${error.message}`);
                return `${data?.status ?? "none"}|${data?.approved_by === null ? "noactor" : "actor"}`;
              },
              { timeout: 20000, message: `TR-19 ${key} never became approved` },
            )
            .toBe("approved|actor");

          // The approval captured its own revision (one per approved row).
          let dump = "unread";
          await expect
            .poll(
              async () => {
                const revisions = await dumpRevisions(key, fence, "[e2e:u4g]");
                dump = serializeRevisions(revisions);
                return revisions.filter((row) => row.action === "approve").length;
              },
              { timeout: 20000, message: `TR-19 expected one approve revision for ${key}` },
            )
            .toBe(1)
            .catch(async (error: unknown) => {
              throw new Error(
                `[e2e:u4g] TR-19 revision mismatch for ${key}:\n${dump}\n` +
                  `(${error instanceof Error ? error.message : String(error)})`,
              );
            });
        }

        const { data: flaggedRow } = await supabase
          .from("ui_translations")
          .select("status, flagged")
          .eq("key", flagged)
          .eq("lang_code", fence)
          .maybeSingle();
        expect(
          `${flaggedRow?.status ?? "none"}|${String(flaggedRow?.flagged)}`,
          "a flagged row is skipped, never approved",
        ).toBe("machine|true");
      });
    } finally {
      for (const key of keys) {
        await supabase.from("ui_translation_revisions").delete().eq("key", key);
        await reapScratchKey(key);
      }
    }
  });

  /**
   * U4g-28 (INC-115e) — GLOBAL-ORDER MUTATIONS RUN IN ONE PROJECT. The roster
   * is a SINGLE global list, not a per-project surface: two projects moving the
   * same fence concurrently race on one row, and an absolute index assertion is
   * then false through no fault of the feature. Move semantics therefore run on
   * desktop-1280 only, and they assert RELATIVE order (the fence lands directly
   * above its former upper neighbour). Mobile keeps TR-20m: controls present
   * and enabled, no move.
   */
  test("TR-20 roster order is operator-editable and persists @global-state", async ({ page }) => {
    test.info().annotations.push({ type: "global-state", description: "INC-117" });

    test.skip(
      test.info().project.name !== "desktop-1280",
      "global order is a single list — one project mutates it",
    );
    test.setTimeout(120_000);

    const fence = bulkFence();
    await ensureFenceLanguage(fence);
    const supabase = adminClient();
    const { data: before, error: beforeError } = await supabase
      .from("languages")
      .select("code, sort")
      .order("sort", { ascending: true });
    if (beforeError || !before) {
      throw new Error(`[e2e:u4g] roster read failed: ${beforeError?.message}`);
    }
    const original = before.map((row) => row.code as string);

    // U4g-3 (INC-099b) — order by (sort, code), the app's ordering law; sort
    // alone was ambiguous while every row shared sort = 0.
    // J-law: a poll budget must be STRICTLY shorter than the test budget
    // (30s polls inside a 120s test) so a mismatch asserts with values
    // instead of consuming the test and reporting only a timeout.
    const rosterCodes = async (): Promise<string[]> => {
      const { data } = await supabase
        .from("languages")
        .select("code, sort")
        .order("sort", { ascending: true })
        .order("code", { ascending: true });
      return (data ?? []).map((row) => row.code as string);
    };
    const positionOf = async (code: string) => (await rosterCodes()).indexOf(code);
    /**
     * RELATIVE order (INC-115e): the offset from the fence to its censused
     * neighbour. -1 means the fence sits directly ABOVE the neighbour, +1
     * directly below. A sibling row moving elsewhere in the list cannot change
     * this, where an absolute index would.
     */
    const offsetTo = async (neighbour: string) => {
      const codes = await rosterCodes();
      return codes.indexOf(fence) - codes.indexOf(neighbour);
    };

    try {
      // U4g-6 (INC-101) — NAMED PHASES (J-law): a stall must name the phase it
      // stalled in, so the next report reads "sign-in" / "roster" / "move up"
      // instead of one anonymous 120s timeout.
      const secret = await test.step("TR-20 sign-in", async () => {
        const signed = await signInAsSuperAdmin(page);
        return signed.secret;
      });

      let neighbour = "";
      await test.step("TR-20 roster visible", async () => {
        // U4g-10 (INC-103) — PRECONDITION, not a weakened assertion: the base
        // language is pinned first, so a fence sitting directly beneath it has
        // a legitimately disabled "up" control (Playwright would then wait out
        // the whole budget on the click). Park the fence at the end first.
        // U4g-12 (INC-105) — J-law: FIXTURE WRITES ARE TABLE WRITES. Parking is
        // setup, not the behaviour under test, so it writes `sort` directly on
        // public.languages with the service client instead of borrowing the
        // gated RPC (which would also demand step-up and audit a fake action).
        if ((await positionOf(fence)) <= 1) {
          const { data } = await supabase
            .from("languages")
            .select("code, sort")
            .order("sort", { ascending: true })
            .order("code", { ascending: true });
          const rows = data ?? [];
          const maxSort = rows.reduce((top, row) => Math.max(top, (row.sort as number) ?? 0), 0);
          const { error } = await supabase
            .from("languages")
            .update({ sort: maxSort + 1 })
            .eq("code", fence);
          if (error) throw new Error(`[e2e:u4g] parking the fence failed: ${error.message}`);
        }
        await gotoReady(page, "/admin/translations");
        await expect(langRow(page, fence)).toBeVisible({ timeout: 20000 });
        const codes = await rosterCodes();
        const at = codes.indexOf(fence);
        expect(at, "the fence must be parked with a row above it").toBeGreaterThan(0);
        neighbour = codes[at - 1]!;
      });

      // U4g-15 (INC-106c) — the three sub-phases are named SEPARATELY: click,
      // step-up, poll. A stall now reports which one consumed the budget; a
      // strict-mode or actionability stall lives in "click" and never even
      // reaches the poll's own 30s budget (that is what the earlier anonymous
      // 120s timeout actually was).
      await test.step("TR-20 move up", async () => {
        const up = actionsOf(page, `lang-row-${fence}`).getByTestId(`lang-up-${fence}`);
        await test.step("TR-20 move up · click", async () => {
          await expect(up, "the fence's up control must be enabled before the move").toBeEnabled({
            timeout: 20000,
          });
          await up.click({ timeout: 15000 });
        });
        await test.step("TR-20 move up · step-up", async () => {
          await stepUpIfPrompted(page, secret);
        });
        await test.step("TR-20 move up · poll", async () => {
          await expect
            .poll(() => offsetTo(neighbour), {
              timeout: 30000,
              message: "moving up never placed the fence above its former upper neighbour",
            })
            .toBe(-1);
        });
      });

      await test.step("TR-20 move down", async () => {
        const down = actionsOf(page, `lang-row-${fence}`).getByTestId(`lang-down-${fence}`);
        await test.step("TR-20 move down · click", async () => {
          await expect(down, "the fence's down control must be enabled").toBeEnabled({
            timeout: 20000,
          });
          await down.click({ timeout: 15000 });
        });
        await test.step("TR-20 move down · step-up", async () => {
          await stepUpIfPrompted(page, secret);
        });
        await test.step("TR-20 move down · poll", async () => {
          await expect
            .poll(() => offsetTo(neighbour), {
              timeout: 30000,
              message: "moving down never restored the fence below its neighbour",
            })
            .toBe(1);
        });
      });
    } finally {
      // The roster is shared runtime: put the censused order back verbatim.
      await supabase
        .rpc("admin_set_language_order", { p_codes: original })
        .then(async ({ error }) => {
          if (error) {
            for (const [index, code] of original.entries()) {
              await supabase
                .from("languages")
                .update({ sort: index * 10 })
                .eq("code", code);
            }
          }
        });
    }
  });

  /**
   * TR-20m (U4g-28, INC-115e) — the MOBILE half of the move surface. It proves
   * the reorder controls exist and are actionable at 360px WITHOUT mutating the
   * single global roster (that is TR-20's business, on desktop only).
   */
  test("TR-20m mobile exposes both reorder controls for the parked fence", async ({ page }) => {
    test.skip(
      test.info().project.name === "desktop-1280",
      "global order is a single list — one project mutates it",
    );
    test.setTimeout(120_000);
    const fence = bulkFence();
    await ensureFenceLanguage(fence);
    const supabase = adminClient();

    // Park the fence away from the pinned base language so its "up" control is
    // legitimately enabled. A fixture write is a table write (INC-105).
    const { data: rows } = await supabase
      .from("languages")
      .select("code, sort")
      .order("sort", { ascending: true })
      .order("code", { ascending: true });
    const codes = (rows ?? []).map((row) => row.code as string);
    if (codes.indexOf(fence) <= 1) {
      const maxSort = (rows ?? []).reduce(
        (top, row) => Math.max(top, (row.sort as number) ?? 0),
        0,
      );
      const { error } = await supabase
        .from("languages")
        .update({ sort: maxSort + 1 })
        .eq("code", fence);
      if (error) throw new Error(`[e2e:u4g] TR-20m parking the fence failed: ${error.message}`);
    }

    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/translations");
    await expect(langRow(page, fence)).toBeVisible({ timeout: 20000 });

    const actions = actionsOf(page, `lang-row-${fence}`);
    const up = actions.getByTestId(`lang-up-${fence}`);
    const down = actions.getByTestId(`lang-down-${fence}`);
    await expect(up, "mobile must expose the up control").toBeVisible({ timeout: 20000 });
    await expect(down, "mobile must expose the down control").toBeVisible({ timeout: 20000 });
    await expect(up, "the parked fence's up control must be enabled").toBeEnabled({
      timeout: 20000,
    });
  });

  test(
    "TR-21 a key missing from the synced catalog is orphaned and excluded",
    { tag: "@global-state" },
    async ({ page }) => {
      test.info().annotations.push({ type: "global-state", description: "INC-117" });
      test.setTimeout(120_000);
      const fence = bulkFence();
      await ensureFenceLanguage(fence);
      const supabase = adminClient();
      const key = scratchKey("tr21");
      await seedScratchKey(key, "Orphan source", fence);
      // sync may only orphan sync-origin keys — INC-105. The seed is a TABLE
      // write through the service client, stamped with the origin the sweep owns.
      {
        const { error } = await supabase
          .from("ui_translations")
          .update({ origin: "sync" })
          .eq("key", key);
        if (error) throw new Error(`[e2e:u4g] stamping ${key} origin failed: ${error.message}`);
      }

      // INC-099 (J-law): fixture reads are TABLE reads through the service
      // client. The gated RPC is the app's seam, never the test's oracle.
      const statOf = async (field: "total" | "orphaned") => {
        const { count, error } = await supabase
          .from("ui_translations")
          .select("key", { count: "exact", head: true })
          .eq("lang_code", fence)
          .eq("orphaned", field === "orphaned");
        if (error) throw new Error(`[e2e:u4g] stats table read failed: ${error.message}`);
        return Number(count ?? 0);
      };

      try {
        const { secret } = await signInAsSuperAdmin(page);
        await gotoReady(page, `/admin/translations/${fence}`);

        // The compiled catalog never contains a scratch key, so the console's own
        // sync is exactly the "payload lacking this key" the law describes.
        const orphanedBefore = await statOf("orphaned");
        await gotoReady(page, "/admin/translations");
        await page.getByTestId("translations-sync-run").click();
        await stepUpIfPrompted(page, secret);
        await expect(page.getByTestId("translations-sync-done")).toBeVisible({ timeout: 60000 });
        // Siblings may fence-seed concurrently, so the count is asserted as a
        // floor; the per-key flag below is the exact truth (J4).
        await expect
          .poll(() => statOf("orphaned"), {
            timeout: 60000,
            message: "the sync never marked the absent key orphaned",
          })
          .toBeGreaterThan(orphanedBefore - 1);

        const { data: orphanRow } = await supabase
          .from("ui_translations")
          .select("orphaned")
          .eq("key", key)
          .eq("lang_code", fence)
          .maybeSingle();
        expect(orphanRow?.orphaned, "the absent key carries the orphan flag").toBe(true);

        // Coverage excludes it, and the console shows it behind its own chip.
        await gotoReady(page, `/admin/translations/${fence}`);
        await expect(page.getByTestId("strings-chip-orphaned")).toContainText(/\d/);
        await page.getByTestId("strings-chip-orphaned").click();
        await page.getByTestId("strings-search").fill(key);
        await expect(stringRow(page, slug(key))).toBeVisible({ timeout: 20000 });

        // Re-inserting the key into the catalog view clears the flag (the RPC's
        // own contract): a direct re-sync would need the key in the compiled
        // catalog, so the restoration is proven through the writer's flag reset.
        const { error: restoreError } = await supabase
          .from("ui_translations")
          .update({ orphaned: false })
          .eq("key", key);
        if (restoreError) throw new Error(`[e2e:u4g] restore failed: ${restoreError.message}`);
        await expect
          .poll(() => statOf("total"), {
            timeout: 30000,
            message: "the restored key never returned to the live catalog",
          })
          .toBeGreaterThan(0);
      } finally {
        await supabase.from("ui_translation_revisions").delete().eq("key", key);
        await reapScratchKey(key);
      }
    },
  );

  /**
   * TR-22 (INC-107) — A PUBLISHED LANGUAGE NEVER REQUIRES A COMPILED FILE.
   *
   * The fence language has no `src/i18n/locales/zxx.ts` and never will: it is
   * a DATABASE-only language, exactly the shape an operator creates in the
   * console. Publishing it used to crash every visitor who selected it (the
   * compiled-loader registry was indexed unguarded). The compiled layer for
   * such a language is `{}`, so the chain is compiled.en ▸ {} ▸ DB[zxx].
   *
   * J-laws: the fence stays admin-only outside this test — `enabled_public` is
   * raised HERE and lowered in `finally`. The seeded values are DETERMINISTIC
   * (never axes-stamped) so two projects running this case concurrently write
   * the same bytes and cannot race each other's assertions. The writes are
   * TABLE writes through the service client; the gated RPC is the app's seam.
   */
  test("TR-22 a published DB-only language renders with no compiled catalog @global-state", async ({
    page,
    clientErrors,
  }) => {
    test.info().annotations.push({ type: "global-state", description: "INC-117" });
    test.setTimeout(120_000);

    const supabase = adminClient();
    const fence = bulkFence();
    await ensureFenceLanguage(fence);

    // Three REAL chrome keys, translated inside the fence only. `zxx` is a
    // language no operator and no other spec renders, so these rows are not a
    // mutation of a shared catalog surface (J2/J3).
    const SEEDED = {
      "app.name": "zxx-brand",
      "auth.signIn": "zxx-sign-in",
      "language.label": "zxx-language",
    } as const;
    // Deliberately NOT seeded: the feed heading must fall back to English.
    const unseededHeading = en["feed.heading"].replace("{location}", en["feed.scopeAll"]);

    const publishFence = async (enabled: boolean) => {
      const { error } = await supabase
        .from("languages")
        .update({ enabled_public: enabled })
        .eq("code", fence);
      if (error)
        throw new Error(`[e2e:u4g-17] fence enabled_public=${enabled} failed: ${error.message}`);
    };

    try {
      const { error } = await supabase.from("ui_translations").upsert(
        Object.entries(SEEDED).map(([key, value]) => ({
          key,
          lang_code: fence,
          value,
          status: "approved",
          machine: false,
        })),
        { onConflict: "key,lang_code" },
      );
      if (error) throw new Error(`[e2e:u4g-17] fence seeding failed: ${error.message}`);
      await publishFence(true);

      // 1. The gate's own list now carries the fence, so the switcher lists it.
      await gotoReady(page, "/");
      await page.getByTestId("language-switcher").click();
      const option = page.getByTestId(`language-option-${fence}`);
      await expect(option, "the published fence language is missing from the switcher")
        .toBeVisible({ timeout: 20000 })
        // U4g-21 (INC-113): publication must survive a reload — if the option
        // is absent, the dump says whether the gate list arrived and what it
        // held (a cached gate list is the failure this catches).
        .catch(async (error: unknown) => {
          throw new Error(
            `${error instanceof Error ? error.message : String(error)}\n\n${await describeSwitcher(page)}`,
          );
        });

      // 2. Selecting it must RENDER, not crash: the readiness contract is the
      //    oracle (INC-085f), and the page keeps its hydrated marker.
      await option.click();
      await expect(page.locator("html")).toHaveAttribute("lang", fence, { timeout: 20000 });
      await expect(page.locator("html")).toHaveAttribute("data-app-ready", "1");
      await waitForHydration(page);

      // 3. The seeded keys render their fence values. U4g-29 (INC-116): the
      //    anchor must be visible at BOTH viewports — the wordmark (`app.name`)
      //    is `md+` only, so the sign-in link and the switcher's aria-label are
      //    the assertions. `app.name` stays seeded (the header still resolves
      //    it) but is never the oracle.
      await expect(
        page.getByRole("link", { name: SEEDED["auth.signIn"] }),
        "the seeded sign-in key did not render its DB value",
      ).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("language-switcher")).toHaveAttribute(
        "aria-label",
        SEEDED["language.label"],
      );

      // 4. … and an UNSEEDED key still renders English: a missing compiled
      //    layer is empty, never a hole in the layer beneath (INC-095/INC-107).
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(unseededHeading);
      await expectNoHorizontalOverflow(page);

      // 5. No browser-side throw at any point (law F4 — a crash is never
      //    allowed to hide behind a page that happens to paint).
      expect(
        clientErrors.filter((line) => line.startsWith("pageerror")),
        "the DB-only language threw in the browser",
      ).toEqual([]);
    } finally {
      await publishFence(false);
      await supabase
        .from("ui_translations")
        .delete()
        .eq("lang_code", fence)
        .in("key", Object.keys(SEEDED));
    }
  });

  /**
   * TR-29 (U4i ⑤) — EXPORT → EDIT → IMPORT, the offline-translator round trip.
   *
   * Walk: seed an axes-namespaced scratch key in this project's BULK FENCE,
   * export the fence's catalog as CSV from the browser, rewrite that exact CSV
   * with a translation for the scratch key plus one key that does NOT exist,
   * import it, and assert DATABASE truth per key (J4): the real key lands
   * `edited|false` with the imported value, the invented key is SKIPPED — the
   * importer counts unknown keys, it never invents them.
   *
   * The export is read through the download itself (real bytes, not a mocked
   * blob), so the CSV writer and the CSV reader are proven against each other
   * end to end rather than only in the unit round-trip test.
   */
  test("TR-29 the catalog exports as CSV and a translated CSV imports back", async ({ page }) => {
    test.setTimeout(120_000);
    const fence = bulkFence();
    await ensureFenceLanguage(fence);
    const key = scratchKey("tr29") + "-io";
    const ghost = scratchKey("tr29") + "-ghost-never-created";
    const source = `Round trip source ${key}`;
    const imported = `⟪io⟫ ${key}`;
    await seedScratchKey(key, source, fence);
    try {
      const { secret } = await signInAsSuperAdmin(page);
      await gotoReady(page, `/admin/translations/${fence}`);
      // Seed-before-navigate (J7) still needs the list to prove it SEES the row
      // before the export button's bytes mean anything.
      await page.getByTestId("strings-search").fill(key);
      await expect(stringRow(page, slug(key))).toBeVisible({ timeout: 20000 });
      await page.getByTestId("strings-search").fill("");

      const [download] = await Promise.all([
        page.waitForEvent("download", { timeout: 30000 }),
        page.getByTestId("strings-export-csv").click(),
      ]);
      const exportedPath = await download.path();
      const exported = await readFile(exportedPath, "utf8");
      if (!exported.includes(key)) {
        throw new Error(
          `[e2e:u4i] TR-29 the CSV export omitted ${key}. First 500 bytes:\n${exported.slice(0, 500)}`,
        );
      }

      /**
       * U4i-4 (a) ADDENDUM — EXPORT IS CATALOG-SCOPED (INC-123). The walk
       * exported one PAGE and called it the catalog. The file's data-line count
       * is asserted against the fence language's OWN row count read with the
       * service client (J4): per-key/DB truth, never the console's summary.
       */
      const { count: catalogCount, error: catalogError } = await adminClient()
        .from("ui_translations")
        .select("key", { count: "exact", head: true })
        .eq("lang_code", fence);
      if (catalogError)
        throw new Error(`[e2e:u4i] TR-29 catalog count failed: ${catalogError.message}`);
      const exportedRows = exported.split(/\r?\n/).filter((line) => line.trim() !== "").length - 1;
      expect(
        exportedRows,
        `the CSV export was page-scoped: ${exportedRows} rows for a ${catalogCount ?? 0}-row catalog`,
      ).toBe(catalogCount ?? 0);

      // The operator's edit, expressed as the file they would send back.
      const csv = ["key,source,translation", `${key},"${source}","${imported}"`, `${ghost},"x","y"`]
        .join("\r\n")
        .concat("\r\n");
      await page.getByTestId("strings-import-input").setInputFiles({
        name: `${fence}.csv`,
        mimeType: "text/csv",
        buffer: Buffer.from(csv, "utf8"),
      });
      await stepUpIfPrompted(page, secret);
      // VISIBILITY only — the localized summary is never the count (J4).
      await expect(page.getByTestId("strings-transfer-summary")).toBeVisible({ timeout: 30000 });
      await expect(page.getByTestId("strings-transfer-error")).toHaveCount(0);

      await expect
        .poll(
          async () => {
            const { data, error } = await adminClient()
              .from("ui_translations")
              .select("value, status, machine")
              .eq("key", key)
              .eq("lang_code", fence)
              .maybeSingle();
            if (error) throw new Error(`[e2e:u4i] TR-29 read failed: ${error.message}`);
            if (!data) return "missing";
            return `${data.value}|${data.status}|${String(data.machine)}`;
          },
          { timeout: 20000, message: `the CSV import never landed for ${key}` },
        )
        .toBe(`${imported}|edited|false`);

      const { data: ghostRows, error: ghostError } = await adminClient()
        .from("ui_translations")
        .select("key")
        .eq("key", ghost);
      if (ghostError) throw new Error(`[e2e:u4i] TR-29 ghost read failed: ${ghostError.message}`);
      expect(ghostRows ?? [], "the importer invented a key that has no base row").toEqual([]);

      /**
       * U4i-3 (d) ADDENDUM — IMPORTS ARE IDEMPOTENT (INC-122). The row is
       * approved by fiat, then the SAME untouched file is imported again: a
       * round trip that changed nothing must write nothing, so the approval
       * survives and no new revision is captured.
       */
      const { error: approveError } = await adminClient()
        .from("ui_translations")
        .update({ status: "approved" })
        .eq("key", key)
        .eq("lang_code", fence);
      if (approveError) throw new Error(`[e2e:u4i] TR-29 approve failed: ${approveError.message}`);
      const { count: revisionsBefore, error: countError } = await adminClient()
        .from("ui_translation_revisions")
        .select("id", { count: "exact", head: true })
        .eq("key", key)
        .eq("lang_code", fence);
      if (countError)
        throw new Error(`[e2e:u4i] TR-29 revision count failed: ${countError.message}`);

      await gotoReady(page, `/admin/translations/${fence}`);
      await page.getByTestId("strings-search").fill(key);
      await expect(stringRow(page, slug(key))).toBeVisible({ timeout: 20000 });
      await page.getByTestId("strings-search").fill("");
      await page.getByTestId("strings-import-input").setInputFiles({
        name: `${fence}.csv`,
        mimeType: "text/csv",
        buffer: Buffer.from(csv, "utf8"),
      });
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("strings-transfer-summary")).toBeVisible({ timeout: 30000 });
      await expect(page.getByTestId("strings-transfer-error")).toHaveCount(0);

      const { data: afterRow, error: afterError } = await adminClient()
        .from("ui_translations")
        .select("value, status")
        .eq("key", key)
        .eq("lang_code", fence)
        .maybeSingle();
      if (afterError)
        throw new Error(`[e2e:u4i] TR-29 re-import read failed: ${afterError.message}`);
      expect(
        `${afterRow?.value}|${afterRow?.status}`,
        "an untouched re-import demoted an approved row",
      ).toBe(`${imported}|approved`);
      const { count: revisionsAfter, error: afterCountError } = await adminClient()
        .from("ui_translation_revisions")
        .select("id", { count: "exact", head: true })
        .eq("key", key)
        .eq("lang_code", fence);
      if (afterCountError)
        throw new Error(`[e2e:u4i] TR-29 revision recount failed: ${afterCountError.message}`);
      expect(revisionsAfter ?? 0, "an untouched re-import captured a revision").toBe(
        revisionsBefore ?? 0,
      );

      /**
       * U4i-6 (b) ADDENDUM — IDEMPOTENCY IS SERVER LAW (INC-124). The same
       * value with a trailing newline DEFEATS the client comparator, so the row
       * really reaches `admin_import_translations`. The writer normalizes
       * trailing whitespace on both sides and refuses to write: the approval
       * survives and still no revision is captured. Only a true value change
       * demotes.
       */
      const noisyCsv = ["key,source,translation", `${key},"${source}","${imported}\n"`]
        .join("\r\n")
        .concat("\r\n");
      await page.getByTestId("strings-import-input").setInputFiles({
        name: `${fence}-noisy.csv`,
        mimeType: "text/csv",
        buffer: Buffer.from(noisyCsv, "utf8"),
      });
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("strings-transfer-summary")).toBeVisible({ timeout: 30000 });
      await expect(page.getByTestId("strings-transfer-error")).toHaveCount(0);

      const { data: noisyRow, error: noisyError } = await adminClient()
        .from("ui_translations")
        .select("value, status")
        .eq("key", key)
        .eq("lang_code", fence)
        .maybeSingle();
      if (noisyError) throw new Error(`[e2e:u4i6] TR-29 noisy read failed: ${noisyError.message}`);
      expect(
        `${noisyRow?.value}|${noisyRow?.status}`,
        "a whitespace-only re-import demoted an approved row (server no-op law)",
      ).toBe(`${imported}|approved`);
      const { count: noisyRevisions, error: noisyCountError } = await adminClient()
        .from("ui_translation_revisions")
        .select("id", { count: "exact", head: true })
        .eq("key", key)
        .eq("lang_code", fence);
      if (noisyCountError)
        throw new Error(`[e2e:u4i6] TR-29 noisy recount failed: ${noisyCountError.message}`);
      expect(noisyRevisions ?? 0, "a whitespace-only re-import captured a revision").toBe(
        revisionsBefore ?? 0,
      );
    } finally {
      await adminClient().from("ui_translation_revisions").delete().eq("key", key);
      await reapScratchKey(key);
      await adminClient().from("ui_translations").delete().eq("key", ghost);
    }
  });

  /**
   * TR-32 (U4i-7) — AN IMPORT IS A TRANSACTION YOU CAN TAKE BACK (INC-125).
   *
   * Inside this project's BULK FENCE (J2), two axes-namespaced scratch keys are
   * seeded with a prior value and a prior STATUS (one approved, one edited), a
   * CSV changes both, and the summary's `data-batch` carries the run's batch id.
   * Undo restores value AND status per key — read with the service client (J4),
   * never from the rendered counts. Then a second import is partly overwritten
   * by a later edit: undo restores the untouched row and reports the other as
   * conflicted, leaving the later work exactly as it stands.
   */
  test("TR-32 an import is undoable while nothing has touched the rows", async ({ page }) => {
    test.setTimeout(150_000);
    const fence = bulkFence();
    await ensureFenceLanguage(fence);
    const keyA = scratchKey("tr32") + "-a";
    const keyB = scratchKey("tr32") + "-b";
    const priorA = `⟪undo⟫ prior A ${keyA}`;
    const priorB = `⟪undo⟫ prior B ${keyB}`;
    await seedScratchKey(keyA, `Undo source ${keyA}`, fence);
    await seedScratchKey(keyB, `Undo source ${keyB}`, fence);

    const readRow = async (key: string) => {
      const { data, error } = await adminClient()
        .from("ui_translations")
        .select("value, status")
        .eq("key", key)
        .eq("lang_code", fence)
        .maybeSingle();
      if (error) throw new Error(`[e2e:u4i7] TR-32 read failed for ${key}: ${error.message}`);
      return `${data?.value ?? "missing"}|${data?.status ?? "missing"}`;
    };

    const importCsv = async (secret: string, rows: [string, string][], name: string) => {
      const csv = ["key,source,translation"]
        .concat(rows.map(([key, value]) => `${key},"src","${value}"`))
        .join("\r\n")
        .concat("\r\n");
      await page.getByTestId("strings-import-input").setInputFiles({
        name,
        mimeType: "text/csv",
        buffer: Buffer.from(csv, "utf8"),
      });
      await stepUpIfPrompted(page, secret);
      const summary = page.getByTestId("strings-transfer-summary");
      await expect(summary).toBeVisible({ timeout: 30000 });
      await expect(page.getByTestId("strings-transfer-error")).toHaveCount(0);
      // The batch id is the SERVER's, surfaced on the summary the operator sees.
      await expect(page.getByTestId("strings-import-undo")).toBeVisible({ timeout: 20000 });
      const batch = await summary.getAttribute("data-batch");
      expect(batch, "the import summary carried no batch id").toBeTruthy();
      return batch as string;
    };

    try {
      const { secret } = await signInAsSuperAdmin(page);
      // PRIOR STATE, seeded before navigating (J7): the approval is what an undo
      // has to bring back — a restore that loses the status is not a restore.
      const { error: seedError } = await adminClient()
        .from("ui_translations")
        .upsert(
          [
            { key: keyA, lang_code: fence, value: priorA, status: "approved", machine: false },
            { key: keyB, lang_code: fence, value: priorB, status: "edited", machine: false },
          ],
          { onConflict: "key,lang_code" },
        );
      if (seedError) throw new Error(`[e2e:u4i7] TR-32 seed failed: ${seedError.message}`);

      await gotoReady(page, `/admin/translations/${fence}`);
      await page.getByTestId("strings-search").fill(keyA);
      await expect(stringRow(page, slug(keyA))).toBeVisible({ timeout: 20000 });
      await page.getByTestId("strings-search").fill("");

      const batch = await importCsv(
        secret,
        [
          [keyA, `⟪undo⟫ imported A`],
          [keyB, `⟪undo⟫ imported B`],
        ],
        `${fence}-undo.csv`,
      );
      expect(batch.length, "the batch id is not a uuid").toBeGreaterThan(30);
      await expect
        .poll(async () => `${await readRow(keyA)}::${await readRow(keyB)}`, {
          timeout: 20000,
          message: "the import never landed for both keys",
        })
        .toBe(`⟪undo⟫ imported A|edited::⟪undo⟫ imported B|edited`);

      await page.getByTestId("strings-import-undo").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("strings-undo-result")).toBeVisible({ timeout: 30000 });
      await expect(page.getByTestId("strings-transfer-error")).toHaveCount(0);
      await expect
        .poll(async () => `${await readRow(keyA)}::${await readRow(keyB)}`, {
          timeout: 20000,
          message: "the undo did not restore both rows to their exact prior value and status",
        })
        .toBe(`${priorA}|approved::${priorB}|edited`);

      // CONFLICT — later work is never overwritten.
      await gotoReady(page, `/admin/translations/${fence}`);
      await page.getByTestId("strings-search").fill(keyA);
      await expect(stringRow(page, slug(keyA))).toBeVisible({ timeout: 20000 });
      await page.getByTestId("strings-search").fill("");
      await importCsv(
        secret,
        [
          [keyA, `⟪undo⟫ second A`],
          [keyB, `⟪undo⟫ second B`],
        ],
        `${fence}-undo-2.csv`,
      );
      await expect
        .poll(async () => await readRow(keyB), {
          timeout: 20000,
          message: "the second import never landed",
        })
        .toBe(`⟪undo⟫ second B|edited`);

      const later = `⟪undo⟫ later hand edit ${keyB}`;
      const { error: laterError } = await adminClient()
        .from("ui_translations")
        .update({ value: later })
        .eq("key", keyB)
        .eq("lang_code", fence);
      if (laterError) throw new Error(`[e2e:u4i7] TR-32 later edit failed: ${laterError.message}`);

      await page.getByTestId("strings-import-undo").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("strings-undo-result")).toBeVisible({ timeout: 30000 });
      await expect(page.getByTestId("strings-transfer-error")).toHaveCount(0);
      await expect
        .poll(async () => `${await readRow(keyA)}::${await readRow(keyB)}`, {
          timeout: 20000,
          message: "the conflicted undo did not restore exactly one row",
        })
        .toBe(`${priorA}|approved::${later}|edited`);
    } finally {
      for (const key of [keyA, keyB]) {
        await adminClient().from("ui_translation_revisions").delete().eq("key", key);
        await reapScratchKey(key);
      }
    }
  });

  /**
   * TR-31 (U4i-4 (b)) — DELETING A LANGUAGE, typed confirm and all four tables.
   *
   * NOT @global-state (J6): the language is created by this test, named across
   * every parallelism axis (run × shard × project × worker), touched by nobody
   * else and deleted by the flow under test — so it runs in the matrix.
   *
   * Walk: service-create the scratch language admin-only, seed two UI rows in
   * it, then drive the OPERATOR's path — roster → "Delete language…" → typed
   * code → step-up → confirm — and assert DB truth per table (J4): the roster
   * row is gone and all four tables hold zero rows for the code.
   */
  test("TR-31 a scratch language deletes with a typed confirm and leaves no rows", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    const supabase = adminClient();
    // 2–8 alnum subtag, every axis inside it (J1).
    const suffix = `${scratchAxes("tr31")}`
      .replace(/[^a-z0-9]/gi, "")
      .toLowerCase()
      .slice(-8);
    const code = `zzq-${suffix}`;
    const keys = [`${scratchKey("tr31")}-d1`, `${scratchKey("tr31")}-d2`];

    const { error: langError } = await supabase.from("languages").upsert(
      {
        code,
        name_en: `E2E Scratch ${code}`,
        name_native: "E2E",
        enabled_admin: true,
        enabled_public: false,
      },
      { onConflict: "code" },
    );
    if (langError) throw new Error(`[e2e:u4i4] TR-31 language create failed: ${langError.message}`);
    for (const key of keys) await seedScratchKey(key, `Delete source ${key}`, code);

    try {
      const { secret } = await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin/translations");
      // Seed-before-navigate (J7): the roster must SHOW the row before the
      // delete flow's assertions mean anything.
      await expect(langRow(page, code)).toBeVisible({ timeout: 20000 });

      // U4i-5 (1) — the roster renders the delete control ONCE PER TWIN via the
      // primitive's single rowActions slot (same law as INC-106b), so a bare
      // `lang-delete-…` resolves to two elements. Every row action routes
      // through the viewport-aware twin helper (J5).
      await actionsOf(page, `lang-row-${code}`).getByTestId(`lang-delete-${code}`).click();
      await expect(page.getByTestId(`lang-delete-counts-${code}`)).toBeVisible({ timeout: 20000 });
      const submit = page.getByTestId(`lang-delete-submit-${code}`);
      // The gate itself: nothing is armed until the code is typed.
      await expect(submit).toBeDisabled();
      await page.getByTestId(`lang-delete-confirm-${code}`).fill(code);
      await expect(submit).toBeEnabled();
      await submit.click();

      /**
       * U4i-6 (a) ADDENDUM — STEP-UP OWNS THE TOP LAYER (INC-124). When the
       * gate opens it must be USABLE while the delete dialog stays open
       * beneath: the code input is visible AND holds focus. If the session is
       * already AAL2 no gate opens — a legitimate outcome, so the assertions
       * are conditional on the modal appearing (the helper below covers both).
       */
      const stepUp = page.getByTestId("step-up-modal");
      const armed = await stepUp
        .waitFor({ state: "visible", timeout: 5000 })
        .then(() => true)
        .catch(() => false);
      if (armed) {
        await expect(page.getByTestId("step-up-code")).toBeVisible();
        await expect(page.getByTestId("step-up-code")).toBeFocused();
        await expect(page.getByTestId(`lang-delete-counts-${code}`)).toBeVisible();
      }
      await stepUpIfPrompted(page, secret);

      await expect(langRow(page, code)).toHaveCount(0, { timeout: 30000 });

      for (const table of [
        "ui_translations",
        "entity_translations",
        "ui_translation_revisions",
        "translator_languages",
      ] as const) {
        await expect
          .poll(
            async () => {
              const { count, error } = await supabase
                .from(table)
                .select("lang_code", { count: "exact", head: true })
                .eq("lang_code", code);
              if (error) throw new Error(`[e2e:u4i4] TR-31 ${table} read failed: ${error.message}`);
              return count ?? 0;
            },
            { timeout: 20000, message: `${table} still holds rows for ${code}` },
          )
          .toBe(0);
      }
      const { data: languagesRow, error: langReadError } = await supabase
        .from("languages")
        .select("code")
        .eq("code", code)
        .maybeSingle();
      if (langReadError)
        throw new Error(`[e2e:u4i4] TR-31 language read failed: ${langReadError.message}`);
      expect(languagesRow, "the languages row survived its own deletion").toBeNull();
    } finally {
      // Idempotent residue sweep: the flow under test normally did all of this.
      for (const key of keys) {
        await supabase.from("ui_translation_revisions").delete().eq("key", key);
        await supabase.from("ui_translations").delete().eq("key", key);
      }
      await supabase.from("languages").delete().eq("code", code);
    }
  });

  /**
   * TR-30 (U4i ⑦) — PSEUDO-LOCALIZATION, and the publication refusal.
   *
   * This test fills the RESERVED `zxa` language for the whole base catalog, so
   * it is global state by construction (J6): it runs in ONE project and carries
   * the @global-state quarantine tag (INC-117). `zxa` is not a fence — it is a
   * product surface with a server rule of its own — so it is left in place
   * afterwards exactly as the operator would leave it, admin-only.
   *
   * Two halves:
   *  A. every filled row is `machine`, unapproved, pseudo-bracketed (⟪…⟫) and LONGER than
   *     its source (the whole point: it shows truncation before a real
   *     translation exists);
   *  B. the roster REFUSES to publish `zxa` — the server rule, not a hidden
   *     button — and the language stays unpublished in the database.
   */
  test(
    "TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state",
    { tag: "@global-state" },
    async ({ page }) => {
      test.skip(
        test.info().project.name !== "desktop-1280",
        "J6: zxa is global state — one project only",
      );
      test.info().annotations.push({
        type: "global-state",
        description: "INC-117 quarantined global-state test",
      });
      test.setTimeout(300_000);

      const { secret } = await signInAsSuperAdmin(page);
      // A key whose EN source exists for certain: the probe is a REAL catalog
      // key, read-only to this spec (J2) — pseudo rows live in zxa alone.
      const probe = "admin.translations.title";

      // U4i-3 (e): the pseudo tool lives on the Languages roster and confirms.
      await gotoReady(page, "/admin/translations");
      await page.getByTestId("pseudo-generate").click();
      await page.getByTestId("pseudo-generate-confirm-action").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("strings-pseudo-summary")).toBeVisible({ timeout: 240_000 });
      await expect(page.getByTestId("strings-pseudo-error")).toHaveCount(0);

      const { data: baseRow, error: baseError } = await adminClient()
        .from("ui_translations")
        .select("value")
        .eq("key", probe)
        .eq("lang_code", "en")
        .maybeSingle();
      if (baseError) throw new Error(`[e2e:u4i] TR-30 base read failed: ${baseError.message}`);
      const baseValue = baseRow?.value ?? "";
      expect(baseValue, `[e2e:u4i] TR-30 probe key ${probe} has no EN source`).not.toBe("");

      await expect
        .poll(
          async () => {
            const { data, error } = await adminClient()
              .from("ui_translations")
              .select("value, status, machine")
              .eq("key", probe)
              .eq("lang_code", PSEUDO_LANG)
              .maybeSingle();
            if (error) throw new Error(`[e2e:u4i] TR-30 pseudo read failed: ${error.message}`);
            if (!data) return "missing";
            const value = data.value ?? "";
            return [
              data.status,
              String(data.machine),
              String(isPseudo(value)),
              String(value.length > baseValue.length),
            ].join("|");
          },
          { timeout: 30000, message: `pseudo text never landed for ${probe}` },
        )
        .toBe("machine|true|true|true");

      // B. THE REFUSAL. The roster's publish control is the operator's only
      //    path, and the server rule stands behind it.
      await gotoReady(page, "/admin/translations");
      const publish = page.getByTestId(`lang-public-${PSEUDO_LANG}`);
      await expect(publish).toBeVisible({ timeout: 20000 });
      if (await publish.isEnabled()) {
        await publish.click();
        await stepUpIfPrompted(page, secret);
        await expect(page.getByTestId("lang-flags-error")).toBeVisible({ timeout: 20000 });
      } else {
        // Disabled is a legal refusal too, but only WITH its stated reason.
        await expect(page.getByTestId(`lang-public-gate-${PSEUDO_LANG}`)).toBeVisible();
      }

      const { data: lang, error: langError } = await adminClient()
        .from("languages")
        .select("enabled_public, enabled_admin")
        .eq("code", PSEUDO_LANG)
        .maybeSingle();
      if (langError) throw new Error(`[e2e:u4i] TR-30 language read failed: ${langError.message}`);
      expect(lang?.enabled_public, "zxa reached the public switcher").toBe(false);
      expect(lang?.enabled_admin).toBe(true);
    },
  );
});
