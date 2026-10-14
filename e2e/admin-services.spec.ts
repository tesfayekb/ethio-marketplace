import type { Locator, Page } from "@playwright/test";

import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";

import { signInAsSuperAdmin } from "./helpers/categories";
import { leaseSeller } from "./helpers/posting";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { adminClient } from "./helpers/users";

/**
 * Bundle 13, turn 1 — THE AI SWITCHES AND METER (D158, INC-600), at the doors.
 *
 * SV-1 a seller can neither read nor change a switch, call the meter or read its tables.
 * SV-2 the super admin reads the seven features and changes a switch; the door refuses
 *      an unknown feature and a bad budget, and writes its audit row.
 * SV-3 the meter on the app's own connection (the service role, as the routes call it):
 *      calls and units on today's row, the 80 % and 100 % audit rows, off at the budget,
 *      the gate's answer, bad units and an unknown feature refused.
 * SV-4 (turn 5) the page Admin › Services › AI lists the seven features with their state,
 *      spend and price; Edit opens the editor, where photo screening's switch says what
 *      switching it off does (turn 6).
 *      It only READS: no real switch row is written (G27); the door's writes are SV-2's.
 *
 * G27: no real switch row is changed. Every change is made on a scratch feature named
 * e2e-sv-…, which no code path names and the admin list leaves out; it is deleted in
 * `finally` (its day rows cascade; audit rows are append-only and stay).
 */

/** The six features of turn 1 and background removal (bundle 13 turn 12, D155b). */
const SEVEN = [
  "background_removal",
  "category_icons",
  "category_images",
  "name_check",
  "photo_screen",
  "translations",
  "writing_helper",
];

interface RpcAnswer {
  data: unknown;
  error: string | null;
}

/** Calls an RPC as the signed-in page's own user (the browser's seam). */
async function rpcAsPage(
  page: Page,
  fn: string,
  args: Record<string, unknown>,
): Promise<RpcAnswer> {
  return page.evaluate(
    async ({ fn, args }) => {
      const client = (
        window as unknown as {
          __ethioSupabase: {
            rpc: (
              name: string,
              params: Record<string, unknown>,
            ) => Promise<{ data: unknown; error: { message: string } | null }>;
          };
        }
      ).__ethioSupabase;
      const { data, error } = await client.rpc(fn, args);
      return { data, error: error ? error.message : null };
    },
    { fn, args },
  );
}

/** Reads a table as the signed-in page's own user. */
async function selectAsPage(page: Page, table: string): Promise<RpcAnswer> {
  return page.evaluate(async (table) => {
    const client = (
      window as unknown as {
        __ethioSupabase: {
          from: (name: string) => {
            select: (
              columns: string,
            ) => Promise<{ data: unknown; error: { message: string } | null }>;
          };
        };
      }
    ).__ethioSupabase;
    const { data, error } = await client.from(table).select("*");
    return { data, error: error ? error.message : null };
  }, table);
}

function scratchFeature(): string {
  return `e2e-sv-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

async function seedScratch(feature: string, row: { price: number; budget: number | null }) {
  const { error } = await adminClient().from("ai_features").insert({
    feature,
    unit_cost_microusd: row.price,
    monthly_budget_cents: row.budget,
  });
  if (error) throw new Error(`[e2e:sv] seeding ${feature} failed: ${error.message}`);
}

async function dropScratch(feature: string) {
  const { error } = await adminClient().from("ai_features").delete().eq("feature", feature);
  if (error) throw new Error(`[e2e:sv] removing ${feature} failed: ${error.message}`);
}

async function readScratch(feature: string) {
  const { data, error } = await adminClient()
    .from("ai_features")
    .select("*")
    .eq("feature", feature)
    .single();
  if (error || !data) throw new Error(`[e2e:sv] reading ${feature} failed: ${error?.message}`);
  return data;
}

/**
 * INC-608 — the feature's audit rows in the order they were written. Rows one
 * call writes share its transaction's `now()` (at 100 % the alert and the
 * switch-off), so their order is broken by the action's name, never left to the
 * index's order of equal times.
 */
async function auditActions(feature: string): Promise<string[]> {
  const { data, error } = await adminClient()
    .from("audit_log")
    .select("action")
    .eq("entity_type", "ai_feature")
    .eq("entity_id", feature)
    .order("created_at", { ascending: true })
    .order("action", { ascending: true });
  if (error) throw new Error(`[e2e:sv] reading the audit rows failed: ${error.message}`);
  return (data ?? []).map((row) => row.action);
}

test.describe("ADMIN › SERVICES — the AI switches and meter (D158)", () => {
  test("SV-1 a seller can neither read nor change a switch, call the meter or read its tables", async ({
    page,
  }) => {
    const seller = await leaseSeller();
    await signInViaSession(page, seller.email, seller.password);
    await gotoReady(page, "/");

    const list = await rpcAsPage(page, "admin_ai_features", {});
    expect(list.error).toBe("permission denied");

    const set = await rpcAsPage(page, "admin_set_ai_feature", {
      p_feature: "writing_helper",
      p_enabled: false,
      p_monthly_budget_cents: null,
      p_unit_cost_microusd: 3000,
    });
    expect(set.error).toBe("permission denied");

    // The meter's doors are the service role's alone: not executable for a browser role.
    const gate = await rpcAsPage(page, "ai_feature_gate", { p_feature: "writing_helper" });
    expect(gate.error ?? "").toContain("permission denied");
    const spend = await rpcAsPage(page, "ai_record_spend", {
      p_feature: "writing_helper",
      p_units: 1,
    });
    expect(spend.error ?? "").toContain("permission denied");

    for (const table of ["ai_features", "ai_spend_days"]) {
      const read = await selectAsPage(page, table);
      expect(read.error ?? "", `${table} read`).toContain("permission denied");
    }
  });

  test("SV-2 the super admin reads the seven features and changes a switch through its door", async ({
    page,
  }) => {
    const feature = scratchFeature();
    await seedScratch(feature, { price: 1000, budget: null });
    try {
      const admin = await signInAsSuperAdmin(page);
      await gotoReady(page, "/admin");

      const list = await rpcAsPage(page, "admin_ai_features", {});
      expect(list.error).toBeNull();
      const rows = list.data as { feature: string; unit: string; on: boolean }[];
      // The seven features, and never a test's scratch row.
      expect(rows.map((row) => row.feature).sort()).toEqual(SEVEN);
      expect(rows.find((row) => row.feature === "translations")?.unit).toBe("character");
      expect(rows.find((row) => row.feature === "photo_screen")?.on).toBe(true);

      const refused = async (args: Record<string, unknown>) =>
        (
          await rpcAsPage(page, "admin_set_ai_feature", {
            p_feature: feature,
            p_enabled: true,
            p_monthly_budget_cents: null,
            p_unit_cost_microusd: 1000,
            ...args,
          })
        ).error;
      // Bundle 13 turn 6 — photo screening may be switched off (new photos are held for
      // staff), so its refusal is gone; the real row is never switched by a test (G27).
      expect(await refused({ p_feature: "e2e-sv-no-such-feature" })).toBe("unknownFeature");
      expect(await refused({ p_monthly_budget_cents: -1 })).toBe("badValue:budget");
      expect(await refused({ p_unit_cost_microusd: -1 })).toBe("badValue:unitCost");

      const off = await rpcAsPage(page, "admin_set_ai_feature", {
        p_feature: feature,
        p_enabled: false,
        p_monthly_budget_cents: 500,
        p_unit_cost_microusd: 1234,
      });
      expect(off.error).toBeNull();
      let row = await readScratch(feature);
      expect(row.enabled).toBe(false);
      expect(row.off_reason).toBe("staff");
      expect(row.monthly_budget_cents).toBe(500);
      expect(row.unit_cost_microusd).toBe(1234);
      expect(row.updated_by).toBe(admin.user.id);

      const on = await rpcAsPage(page, "admin_set_ai_feature", {
        p_feature: feature,
        p_enabled: true,
        p_monthly_budget_cents: null,
        p_unit_cost_microusd: 1234,
      });
      expect(on.error).toBeNull();
      row = await readScratch(feature);
      expect(row.enabled).toBe(true);
      expect(row.off_reason).toBeNull();
      expect(row.monthly_budget_cents).toBeNull();

      expect(await auditActions(feature)).toEqual(["ai.feature_set", "ai.feature_set"]);
    } finally {
      await dropScratch(feature);
    }
  });

  test("SV-3 the meter on the app's own connection: today's row, the alerts and off at the budget", async () => {
    const feature = scratchFeature();
    // A price of 1,000 millionths of a dollar a unit and a budget of 1 cent (10,000).
    await seedScratch(feature, { price: 1000, budget: 1 });
    const service = adminClient();
    try {
      const gate = async () => {
        const { data, error } = await service.rpc("ai_feature_gate", { p_feature: feature });
        expect(error).toBeNull();
        return data as { on: boolean; off_reason: string | null };
      };
      const spend = async (units: number) => {
        const { data, error } = await service.rpc("ai_record_spend", {
          p_feature: feature,
          p_units: units,
        });
        expect(error).toBeNull();
        return data as { on: boolean; alert_level: number; spent_microusd: number };
      };

      expect(await gate()).toMatchObject({ on: true, off_reason: null });
      expect(await spend(5)).toMatchObject({ on: true, alert_level: 0, spent_microusd: 5000 });
      expect(await spend(3)).toMatchObject({ on: true, alert_level: 80, spent_microusd: 8000 });
      expect(await spend(2)).toMatchObject({ on: false, alert_level: 100, spent_microusd: 10000 });
      expect(await gate()).toMatchObject({ on: false, off_reason: "budget" });

      const { data: days, error: daysError } = await service
        .from("ai_spend_days")
        .select("calls, units, cost_microusd")
        .eq("feature", feature);
      expect(daysError).toBeNull();
      // Summed over the feature's day rows: a run that crosses UTC midnight has two.
      const total = (days ?? []).reduce(
        (sum, day) => ({
          calls: sum.calls + day.calls,
          units: sum.units + day.units,
          cost: sum.cost + day.cost_microusd,
        }),
        { calls: 0, units: 0, cost: 0 },
      );
      expect(total).toEqual({ calls: 3, units: 10, cost: 10000 });

      expect(await auditActions(feature)).toEqual([
        "ai.budget_alert",
        "ai.budget_alert",
        "ai.budget_off",
      ]);

      const bad = await service.rpc("ai_record_spend", { p_feature: feature, p_units: -1 });
      expect(bad.error?.message).toBe("badValue:units");
      const unknown = await service.rpc("ai_feature_gate", { p_feature: "e2e-sv-no-such-feature" });
      expect(unknown.error?.message).toBe("unknownFeature");
    } finally {
      await dropScratch(feature);
    }
  });

  /**
   * Bundle 13 turn 5 (D158) — the page. Below 1024 px the table is drawn as cards
   * (`cardUntil="lg"`), so every row is read inside the twin on screen.
   */
  test("SV-4 the page Admin › Services › AI lists the seven features, and photo screening's switch says what off does", async ({
    page,
  }) => {
    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/ai");
    await expect(page.getByTestId("admin-section-ai")).toBeVisible({ timeout: 20_000 });
    const cards = (page.viewportSize()?.width ?? 1024) < 1024;
    const surface: Locator = cards ? page.getByTestId("data-table-cards") : page.getByRole("table");

    for (const feature of SEVEN) {
      const key = `admin.ai.feature.${feature}` as keyof typeof en;
      await expect(
        surface.getByTestId(`ai-${feature}-name`),
        `SV-4: ${feature} is not listed by its name`,
      ).toHaveText(en[key], { timeout: 20_000 });
      await expect(surface.getByTestId(`ai-${feature}-state`)).toBeVisible();
      await expect(surface.getByTestId(`ai-${feature}-spend`)).toBeVisible();
    }
    await expect(surface.getByTestId("ai-photo_screen-state")).toHaveText(en["admin.ai.state.on"]);
    await expect(surface.getByTestId("ai-translations-price")).toContainText(
      en["admin.ai.price.perMillion"].replace("{price}", "").trim(),
    );
    await expect(surface.getByTestId("ai-writing_helper-price")).toContainText(
      en["admin.ai.price.perCall"].replace("{price}", "").trim(),
    );

    // The row's one action opens the editor; Cancel writes nothing.
    const actions = surface.getByTestId(
      cards ? "ai-photo_screen-actions" : "ai-photo_screen-actions-cell",
    );
    await actions.getByTestId("ai-actions-photo_screen-edit").click();
    const editor = page.getByTestId("ai-editor");
    await expect(editor).toBeVisible({ timeout: 20_000 });
    await expect(editor.getByTestId("ai-editor-feature")).toHaveText(
      en["admin.ai.feature.photo_screen"],
    );
    await expect(editor.getByTestId("ai-editor-on")).toBeChecked();
    await expect(editor.getByTestId("ai-editor-on")).toBeEnabled();
    await expect(editor.getByTestId("ai-editor-screening-note")).toHaveText(
      en["admin.ai.field.screeningOffNote"],
    );
    await editor.getByTestId("ai-editor-cancel").click();
    await expect(editor).toHaveCount(0);
  });
});
