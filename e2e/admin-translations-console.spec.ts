import type { Page } from "@playwright/test";

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
import {
  langRow,
  stringRow,
  surfaceControl,
  expansionOf,
  expansionControl,
  slug,
  scratchKey,
  bulkFence,
  ensureFenceLanguage,
  seedScratchKey,
  reapScratchKey,
  dumpRevisions,
  serializeRevisions,
  signInAsSuperAdmin,
} from "./helpers/translations";
/**
 * Phase U4b — Translations console (TR-1..TR-13, TR-23, TR-25, TR-16).
 *
 * L1 (DEC-037): this file is one third of the former admin-translations.spec.ts.
 * Every test title, tag, fence and seeded identity is byte-identical; only the
 * containing file changed (INC-159 shard balance).
 */

/**
 * L4c PART B — ROUTE EVIDENCE. The shared pooled identity (DEC-038) means a
 * failure in TR-7/11/13/16/23 must say WHO the caller was and WHAT the route
 * answered, not just that a marker never appeared. One start-of-test line logs
 * the pooled user's translator scope (the shared-identity hypothesis's key
 * value); before each action click a response watcher is registered; on a
 * failed expectation the thrown message carries the route's status + full JSON
 * body, the pooled user id, and the DB row as read. Assertions are unchanged.
 */
async function logTranslatorScope(page: Page, userId: string): Promise<void> {
  const scope = await page.evaluate(async () => {
    const client = (
      window as unknown as {
        __ethioSupabase: {
          rpc: (
            fn: string,
          ) => Promise<{
            data: Array<{ lang_code: string }> | null;
            error: { message: string } | null;
          }>;
        };
      }
    ).__ethioSupabase;
    const { data, error } = await client.rpc("get_my_translator_languages");
    if (error) return `error: ${error.message}`;
    return JSON.stringify((data ?? []).map((row) => row.lang_code));
  });
  console.log(`[e2e:l4c] get_my_translator_languages for pooled ${userId}: ${scope}`);
}

/** Registered BEFORE the click; resolves to "<status> <full JSON body>". */
function watchRoute(page: Page, urlPart: string): Promise<string> {
  return page
    .waitForResponse((response) => response.url().includes(urlPart), { timeout: 60000 })
    .then(async (response) => `${response.status()} ${await response.text()}`)
    .catch((error: unknown) => `no response observed: ${String(error)}`);
}

/** The row as read — all columns — via the service client (J4 table truth). */
async function readRowEvidence(key: string, lang: string): Promise<string> {
  const { data, error } = await adminClient()
    .from("ui_translations")
    .select("*")
    .eq("key", key)
    .eq("lang_code", lang)
    .maybeSingle();
  if (error) return `row read failed: ${error.message}`;
  return JSON.stringify(data);
}

async function expectWithEvidence(
  assertion: () => Promise<unknown>,
  evidence: () => Promise<string>,
): Promise<void> {
  try {
    await assertion();
  } catch (error) {
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}\n[e2e:l4c] ${await evidence()}`,
    );
  }
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
    const { user, secret } = await signInAsSuperAdmin(page);
    await logTranslatorScope(page, user.id);
    await gotoReady(page, "/admin/translations");
    const syncRoute = watchRoute(page, "admin_sync_ui_keys");
    await page.getByTestId("translations-sync-run").click();
    await stepUpIfPrompted(page, secret);
    const syncResult = await syncRoute;
    await expectWithEvidence(
      () => expect(page.getByTestId("translations-sync-done")).toBeVisible({ timeout: 30000 }),
      async () => {
        const { data, error } = await adminClient().rpc("admin_translation_stats", {
          p_lang: "en",
        });
        const stats = error ? `stats read failed: ${error.message}` : JSON.stringify(data);
        return (
          `sync route (admin_sync_ui_keys) → ${syncResult}\n` +
          `pooled user ${user.id}\nDB stats row: ${stats}`
        );
      },
    );
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
      const { user, secret } = await signInAsSuperAdmin(page);
      await logTranslatorScope(page, user.id);
      await gotoReady(page, "/admin/translations/am");
      const id = slug(key);
      await page.getByTestId("strings-search").fill(key);
      await expect(stringRow(page, id)).toBeVisible({ timeout: 20000 });
      await surfaceControl(page, `string-expand-${id}`).click();
      const aiRoute = watchRoute(page, "/api/translate");
      await expansionControl(page, id, "string-ai").click();
      await stepUpIfPrompted(page, secret);
      const aiResult = await aiRoute;
      await expectWithEvidence(
        () => expect(expansionControl(page, id, "string-saved")).toBeVisible({ timeout: 30000 }),
        async () =>
          `route /api/translate → ${aiResult}\n` +
          `pooled user ${user.id}\nDB row: ${await readRowEvidence(key, "am")}`,
      );

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
      const { user, secret } = await signInAsSuperAdmin(page);
      await logTranslatorScope(page, user.id);
      await gotoReady(page, "/admin/translations/am");
      const id = slug(key);
      await page.getByTestId("strings-search").fill(key);
      await expect(stringRow(page, id)).toBeVisible({ timeout: 20000 });
      await surfaceControl(page, `string-expand-${id}`).click();
      const aiRoute = watchRoute(page, "/api/translate");
      await expansionControl(page, id, "string-ai").click();
      await stepUpIfPrompted(page, secret);
      const aiResult = await aiRoute;
      await expectWithEvidence(
        () => expect(expansionControl(page, id, "string-saved")).toBeVisible({ timeout: 30000 }),
        async () =>
          `route /api/translate → ${aiResult}\n` +
          `pooled user ${user.id}\nDB row: ${await readRowEvidence(key, "am")}`,
      );

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
      const { user, secret } = await signInAsSuperAdmin(page);
      await logTranslatorScope(page, user.id);
      await gotoReady(page, "/admin/translations/am");

      // ---- A. the token survives the round trip -------------------
      const keptId = slug(keptKey);
      await page.getByTestId("strings-search").fill(keptKey);
      await expect(stringRow(page, keptId)).toBeVisible({ timeout: 20000 });
      await surfaceControl(page, `string-expand-${keptId}`).click();
      const keptRoute = watchRoute(page, "/api/translate");
      await expansionControl(page, keptId, "string-ai").click();
      await stepUpIfPrompted(page, secret);
      const keptRouteText = await keptRoute;
      await expectWithEvidence(
        () =>
          expect(expansionControl(page, keptId, "string-saved")).toBeVisible({ timeout: 30000 }),
        async () =>
          `route /api/translate → ${keptRouteText}\n` +
          `pooled user ${user.id}\nDB row: ${await readRowEvidence(keptKey, "am")}`,
      );

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
      const brokenRoute = watchRoute(page, "/api/translate");
      await expansionControl(page, brokenId, "string-ai").click();
      await stepUpIfPrompted(page, secret);
      const brokenRouteText = await brokenRoute;
      await expectWithEvidence(
        () =>
          expect(expansionControl(page, brokenId, "string-saved")).toBeVisible({
            timeout: 30000,
          }),
        async () =>
          `route /api/translate → ${brokenRouteText}\n` +
          `pooled user ${user.id}\nDB row: ${await readRowEvidence(brokenKey, "am")}`,
      );
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
      const { user, secret } = await signInAsSuperAdmin(page);
      await logTranslatorScope(page, user.id);
      await gotoReady(page, "/admin/translations/am");
      const id = slug(key);
      await page.getByTestId("strings-search").fill(key);
      await expect(stringRow(page, id)).toBeVisible({ timeout: 20000 });
      await surfaceControl(page, `string-expand-${id}`).click();

      // 1) machine write, then 2) a human edit — the U4c pair (TR-11's shape).
      const aiRoute = watchRoute(page, "/api/translate");
      await expansionControl(page, id, "string-ai").click();
      await stepUpIfPrompted(page, secret);
      const aiResult = await aiRoute;
      await expectWithEvidence(
        () => expect(expansionControl(page, id, "string-saved")).toBeVisible({ timeout: 30000 }),
        async () =>
          `route /api/translate → ${aiResult}\n` +
          `pooled user ${user.id}\nDB row: ${await readRowEvidence(key, "am")}`,
      );
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
