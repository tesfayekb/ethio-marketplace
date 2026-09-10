import { type Locator, type Page } from "@playwright/test";

import { test } from "../fixtures";
import { fenceLang, processId } from "../global-setup";
import { isMobile, switchUser, useJobSuperAdmin, waitForHydration } from "./ui";
import { adminClient } from "./users";

/**
 * L1 (DEC-037) — SHARED TRANSLATION-CONSOLE HELPERS.
 *
 * Extracted verbatim from e2e/admin-translations.spec.ts when that file was
 * split three ways for shard balance (INC-159). Nothing here changed meaning:
 * the twin locators, the scratch-key law, the fence helpers and the sign-in
 * shortcut are byte-identical to the originals; only their home moved.
 */

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
export function translationsSurface(page: Page): Locator {
  return isMobile(page) ? page.getByTestId("data-table-cards") : page.getByRole("table");
}

/** Row testid differs per twin: `-card` on mobile, bare on the desktop row. */
export function rowTestId(page: Page, base: string): string {
  return isMobile(page) ? `${base}-card` : base;
}

export function langRow(page: Page, code: string): Locator {
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
export function actionsOf(page: Page, base: string): Locator {
  return surfaceControl(page, isMobile(page) ? `${base}-actions` : `${base}-actions-cell`);
}

/**
 * UX-2 item 7 — THE DATA-SCOPE ROW, RESOLVED STRUCTURALLY (J5). Entity rows
 * carry the composite `entity-row-<type>-<id>-<field>` stem in both twins; the
 * `-card` suffix belongs to the mobile twin alone. The secondary identifier
 * this landing adds is TEXT inside that row, never a new anchor — TR-24 and
 * TR-26 keep the exact locators they had, now through this one helper.
 */
export function entityRow(page: Page, entitySlug: string): Locator {
  return translationsSurface(page).getByTestId(rowTestId(page, `entity-row-${entitySlug}`));
}

export function stringRow(page: Page, keySlug: string): Locator {
  return translationsSurface(page).getByTestId(rowTestId(page, `string-row-${keySlug}`));
}

export function surfaceControl(page: Page, testid: string): Locator {
  return translationsSurface(page).getByTestId(testid);
}

/** The VISIBLE twin's inline editor for one string row (INC-095d). */
export function expansionOf(page: Page, keySlug: string): Locator {
  return surfaceControl(page, `string-editor-${keySlug}`);
}

/** A control inside the VISIBLE twin's inline editor. */
export function expansionControl(page: Page, keySlug: string, prefix: string): Locator {
  return expansionOf(page, keySlug).getByTestId(`${prefix}-${keySlug}`);
}

/** The first Amharic key the strings list shows, as a testid-safe slug. */
export function slug(key: string) {
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
export function scratchAxes(tag: string): string {
  const worker = process.env["TEST_WORKER_INDEX"] ?? String(process.pid);
  const shard = process.env["E2E_SHARD"] ?? "solo";
  const project = test.info().project.name;
  return `${processId()}-${shard}-${project}-${worker}-${tag}`;
}

export function scratchKey(tag: string): string {
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
export function bulkFence(): string {
  return fenceLang("bulk", test.info().project.name);
}

export function approveFence(): string {
  return fenceLang("approve", test.info().project.name);
}

export async function ensureFenceLanguage(code: string) {
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

export async function seedScratchKey(key: string, sourceValue: string, lang = "am") {
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

export async function reapScratchKey(key: string) {
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

export async function dumpRevisions(
  key: string,
  lang: string,
  tag: string,
): Promise<RevisionDumpRow[]> {
  const { data, error } = await adminClient()
    .from("ui_translation_revisions")
    .select("prev_value, prev_status, prev_machine, action, changed_by, changed_at")
    .eq("key", key)
    .eq("lang_code", lang)
    .order("changed_at", { ascending: true });
  if (error) throw new Error(`${tag} revision read failed for ${key}: ${error.message}`);
  return (data ?? []) as RevisionDumpRow[];
}

export function serializeRevisions(rows: RevisionDumpRow[]): string {
  return rows
    .map(
      (r, i) =>
        `  [${i}] action=${r.action} prev_status=${r.prev_status} ` +
        `prev_value=${JSON.stringify(r.prev_value)} prev_machine=${r.prev_machine} ` +
        `changed_by=${r.changed_by} changed_at=${r.changed_at}`,
    )
    .join("\n");
}

export async function grantRole(userId: string, roleName: string) {
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

/**
 * L4 (DEC-038) — THE JOB POOL. This helper used to mint a fresh super admin and
 * enrol a TOTP factor on every call; it now delegates to the job-scoped pooled
 * identity (`useJobSuperAdmin`), so nothing is minted here and the L1c
 * co-located disposer it owned has no mint left to reap. Call sites, titles,
 * tags and assertions are untouched (J1); the returned shape is unchanged.
 */
export async function signInAsSuperAdmin(page: Page) {
  // eslint-disable-next-line react-hooks/rules-of-hooks -- L4: a harness helper, not a React hook
  return useJobSuperAdmin(page);
}
