import { expect, test } from "./fixtures";

import { am } from "../src/i18n/locales/am";
import { processId } from "./global-setup";
import {
  describeEntityStats,
  describeStringsPage,
  gotoReady,
  stepUpIfPrompted,
} from "./helpers/ui";
import { adminClient } from "./helpers/users";
import {
  entityRow,
  langRow,
  surfaceControl,
  slug,
  scratchAxes,
  bulkFence,
  approveFence,
  ensureFenceLanguage,
  signInAsSuperAdmin,
} from "./helpers/translations";
import { translationMapperSelfTest } from "../src/features/admin/translations/translations-service";
/**
 * Phase U4d — the Data scope (TR-14, TR-24, TR-26).
 *
 * L1 (DEC-037): split out of admin-translations.spec.ts with its titles, tags
 * and fixture identities unchanged (INC-159 shard balance).
 */ test.describe("U4b translations console", () => {
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
      const row = entityRow(page, `location-${id}-name`);
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
      const row = entityRow(page, `location-${one.id}-name`);
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
      const readyRow = entityRow(page, `location-${two.id}-name`);
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
   * ───────────── UX-2 item 7 — SIX ROWS NAMED "Make" ARE DISTINGUISHABLE ─────
   *
   * TR-34. The Data roster showed the LABEL alone, so duplicate names were one
   * indistinguishable block. Every row now carries its stable machine identity
   * under the name — `attributes.attr_key` for an attribute, `categories.slug`
   * for a category — exactly as the attribute library renders it.
   *
   * ROUND-TRIP INVARIANT (same test, same session): the roster RPC's shape
   * change must not reach any other surface. `get_entity_bundle` and BOTH
   * attribute export files are captured before the roster is read and compared
   * BYTE-IDENTICAL afterwards — the fixtures are seeded first, so the two
   * captures span nothing but the roster read itself.
   *
   * J1/J3 — two attributes sharing ONE label plus one category, all axes-
   * namespaced and reaped in `finally`; nothing real is touched (J6).
   */
  test("TR-34 the Data roster names each row's identity and changes nothing else", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    const supabase = adminClient();
    const axes = scratchAxes("tr34");
    const label = `E2E Make ${axes}`;
    const keyOne = `e2e_attr_ux27_${axes.replace(/[^a-zA-Z0-9]+/g, "_")}_a`;
    const keyTwo = `e2e_attr_ux27_${axes.replace(/[^a-zA-Z0-9]+/g, "_")}_b`;
    const catSlug = `e2e-cat-ux27-${axes.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    const { data: attrs, error: attrError } = await supabase
      .from("attributes")
      .insert([
        { attr_key: keyOne, name_en: label, attr_type: "text" },
        { attr_key: keyTwo, name_en: label, attr_type: "text" },
      ])
      .select("id, attr_key");
    if (attrError || !attrs) throw new Error(`TR-34 attribute seed failed: ${attrError?.message}`);
    const { data: category, error: catError } = await supabase
      .from("categories")
      .insert({ slug: catSlug, name_en: `E2E Cat ${axes}`, is_active: true })
      .select("id")
      .single();
    if (catError || !category) throw new Error(`TR-34 category seed failed: ${catError?.message}`);

    const idOf = (key: string) => attrs.find((row) => row.attr_key === key)!.id as string;

    try {
      const { secret } = await signInAsSuperAdmin(page);
      void secret;

      const bearer = async () =>
        page.evaluate(async () => {
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
          return data.session?.access_token ?? "";
        });

      const readBundle = async () =>
        page.evaluate(async () => {
          const client = (
            window as unknown as {
              __ethioSupabase: {
                rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown }>;
              };
            }
          ).__ethioSupabase;
          const bundle = await client.rpc("get_entity_bundle", { p_lang: "am" });
          return JSON.stringify(bundle.data);
        });

      const readExports = async (token: string) => {
        const out: string[] = [];
        for (const file of ["definitions", "links"]) {
          const response = await page.request.get(`/api/admin/attributes/export?file=${file}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          expect(response.status(), `TR-34 export ${file} refused`).toBe(200);
          // J6 — the STABLE library only. A sibling spec (and the other
          // viewport project) mints and destroys its own `e2e_attr_` / `e2e-cat-`
          // fixtures between the two captures, which reads as a phantom diff;
          // the invariant is about THIS landing's shape change, so transient
          // rows are excluded exactly as AT-20's invariant excludes them.
          const text = await response.text();
          out.push(
            text
              .split("\r\n")
              .filter((line) => !line.includes("e2e_attr_") && !line.includes("e2e-cat-"))
              .join("\r\n"),
          );
        }
        return out;
      };

      await gotoReady(page, "/admin/translations/am?scope=data");
      const token = await bearer();
      expect(token).not.toBe("");
      const bundleBefore = await readBundle();
      const exportsBefore = await readExports(token);

      // 1. TWO ROWS, ONE LABEL, TWO IDENTITIES.
      await expect(page.getByTestId("admin-translations-data")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("data-search").fill(label);
      for (const key of [keyOne, keyTwo]) {
        const stem = `attribute-${idOf(key)}-label`;
        const row = entityRow(page, stem);
        await expect(row).toBeVisible({ timeout: 20000 });
        await expect(row).toContainText(label);
        await expect(row.getByTestId(`entity-identifier-${stem}`)).toHaveText(key);
      }

      // 2. A CATEGORY NAMES ITS SLUG.
      await page.getByTestId("data-search").fill(`E2E Cat ${axes}`);
      const catStem = `category-${category.id}-name`;
      const catRow = entityRow(page, catStem);
      await expect(catRow).toBeVisible({ timeout: 20000 });
      await expect(catRow.getByTestId(`entity-identifier-${catStem}`)).toHaveText(catSlug);

      // 3. ROUND-TRIP INVARIANT — nothing else moved.
      expect(await readBundle()).toBe(bundleBefore);
      expect(await readExports(token)).toEqual(exportsBefore);
    } finally {
      await supabase.from("entity_translations").delete().eq("entity_id", category.id);
      await supabase.from("categories").delete().eq("id", category.id);
      for (const key of [keyOne, keyTwo]) {
        await supabase.from("entity_translations").delete().eq("entity_id", idOf(key));
        await supabase.from("attributes").delete().eq("attr_key", key);
      }
    }
  });
});
