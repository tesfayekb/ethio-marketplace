import { type Locator, type Page } from "@playwright/test";
import { expect, test } from "./fixtures";

import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";

import { FENCE_LANG, processId } from "./global-setup";
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

async function ensureFenceLanguage() {
  const { error } = await adminClient().from("languages").upsert(
    {
      code: FENCE_LANG,
      name_en: "E2E Fence",
      name_native: "E2E",
      enabled_admin: true,
      enabled_public: false,
    },
    { onConflict: "code" },
  );
  if (error) throw new Error(`[e2e:u4c] fence language upsert failed: ${error.message}`);
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
    await ensureFenceLanguage();
    const base = scratchKey("tr12");
    const keys = [`${base}-b1`, `${base}-b2`, `${base}-b3`];
    for (const key of keys) await seedScratchKey(key, `Bulk source ${key}`, FENCE_LANG);
    try {
      const { secret } = await signInAsSuperAdmin(page);
      await gotoReady(page, `/admin/translations/${FENCE_LANG}`);
      // The bar's untranslated list can be computed before this spec's seeds
      // land; a reload forces it to recompute from fresh queries (INC-096g).
      await page.reload();
      await gotoReady(page, `/admin/translations/${FENCE_LANG}`);

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
                .eq("lang_code", FENCE_LANG)
                .maybeSingle();
              if (error) throw new Error(`[e2e:u4c] bulk read failed for ${key}: ${error.message}`);
              if (!data) return "missing";
              return `${data.status}|${String(data.machine)}|${(data.value ?? "").includes(`⟪${FENCE_LANG}⟫`)}`;
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
  async function createScratchLocation(): Promise<{ id: string; name: string }> {
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
    const axes = scratchAxes("tr14");
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
      const row = translationsSurface(page).getByTestId(rowTestId(page, `entity-row-${id}`));
      await expect(row).toBeVisible({ timeout: 20000 });

      await surfaceControl(page, `entity-expand-${id}`).click();
      const editor = surfaceControl(page, `entity-editor-${id}`);
      await expect(editor).toBeVisible();
      await editor.getByTestId(`entity-input-${id}`).fill(marker);
      await editor.getByTestId(`entity-save-${id}`).click();
      await stepUpIfPrompted(page, secret);
      await expect(editor.getByTestId(`entity-saved-${id}`)).toBeVisible({ timeout: 20000 });

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

      await editor.getByTestId(`entity-approve-${id}`).click();
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
  test("TR-17: switcher options equal the DB public list; a non-public ?lang falls back", async ({
    page,
  }) => {
    const supabase = adminClient();
    const { data, error } = await supabase
      .from("languages")
      .select("code, sort")
      .or("enabled_public.eq.true,is_base.eq.true")
      .order("sort", { ascending: true });
    if (error || !data) throw new Error(`[e2e:u4f] public language read failed: ${error?.message}`);
    const expected = data.map((row) => row.code as string);
    expect(expected.length, "the gate must publish at least the base language").toBeGreaterThan(0);
    expect(expected, "the admin-only fence language is never public").not.toContain(FENCE_LANG);

    await gotoReady(page, "/");
    await page.getByTestId("language-switcher").click();
    await expect
      .poll(
        async () =>
          page
            .locator("[data-testid^='language-option-']")
            .evaluateAll((nodes) =>
              nodes.map((n) =>
                (n.getAttribute("data-testid") ?? "").replace("language-option-", ""),
              ),
            ),
        { timeout: 15000, message: "switcher options never matched the gate's public list" },
      )
      .toEqual(expected);
    await page.keyboard.press("Escape");

    // A forced non-public code is refused: the runtime renders the base language.
    await gotoReady(page, "/?lang=om");
    await expect(page.locator("html")).toHaveAttribute("lang", "en", { timeout: 15000 });
  });
});
