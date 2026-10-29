import { describe, expect, it } from "vitest";

import {
  aiErrorKey,
  aiCallsOf,
  featureLabelKey,
  aiFeatureOf,
  aiFeaturesOf,
  aiSpendDaysOf,
  budgetCentsOf,
  budgetField,
  budgetText,
  featureAboutKey,
  featureLabelKey,
  priceField,
  priceText,
  spendByDay,
  spendText,
  unitCostOf,
} from "./ai-service";

/** Bundle 13 turn 5 (D158) — the AI console's reading of its door, its money and its refusals. */
const ROW = {
  feature: "writing_helper",
  on: true,
  off_reason: null,
  off_at: null,
  monthly_budget_cents: 500,
  unit: "call",
  unit_cost_microusd: 3000,
  month_spent_microusd: 1_234_567,
  month_calls: 411,
  month_units: 411,
  today_calls: 12,
  alert_level: 0,
  updated_at: "2026-10-13T18:47:00+00:00",
};

describe("the AI console's seam (D158)", () => {
  it("ACR-1 reads a private projection and preserves the server cursor", () => {
    const row = {
      id: "scratch",
      created_at: "2026-10-29T00:00:00Z",
      feature: "name_check",
      task: "name_check",
      task_version: 1,
      model: "model",
      outcome: "ok",
      provider_status: null,
      latency_ms: 12,
      fake: false,
      actor: { kind: "hidden" },
      input_hash: "private",
      actor_id: "private",
    };
    const page = aiCallsOf({ rows: [row], next: { at: row.created_at, id: row.id } });
    expect(page.rows[0]?.actor).toEqual({ kind: "hidden" });
    expect(page.rows[0]).not.toHaveProperty("input_hash");
    expect(page.rows[0]).not.toHaveProperty("actor_id");
    expect(page.next).toEqual({ at: row.created_at, id: row.id });
    expect(() => aiCallsOf({ rows: [{ ...row, latency_ms: null }], next: null })).toThrow(
      "out of shape",
    );
    expect(() => aiCallsOf({ rows: [row] })).toThrow("out of shape");
  });
  it("ACR-2 unknown tasks remain data, never inherited map members", () => {
    expect(featureLabelKey("category_icons")).toBe("admin.ai.feature.category_icons");
    expect(featureLabelKey("toString")).toBeNull();
    expect(featureLabelKey("future_task")).toBeNull();
  });
  it("AIS-1 a row is read as the door promises it, and any field out of shape refuses the row", () => {
    expect(aiFeatureOf(ROW)).toEqual({
      feature: "writing_helper",
      on: true,
      offReason: null,
      offAt: null,
      monthlyBudgetCents: 500,
      unit: "call",
      unitCostMicrousd: 3000,
      monthSpentMicrousd: 1_234_567,
      monthCalls: 411,
      monthUnits: 411,
      todayCalls: 12,
      alertLevel: 0,
      updatedAt: "2026-10-13T18:47:00+00:00",
    });
    expect(
      aiFeatureOf({ ...ROW, on: false, off_reason: "budget", off_at: "2026-10-13T20:00:00Z" })
        ?.offReason,
    ).toBe("budget");
    expect(aiFeatureOf({ ...ROW, monthly_budget_cents: null })?.monthlyBudgetCents).toBeNull();
    for (const bad of [
      { ...ROW, on: false },
      { ...ROW, off_reason: "staff" },
      { ...ROW, unit: "token" },
      { ...ROW, month_calls: -1 },
      { ...ROW, unit_cost_microusd: 1.5 },
      { ...ROW, alert_level: 50 },
      { ...ROW, feature: "" },
      { ...ROW, monthly_budget_cents: "500" },
      null,
      [ROW],
    ]) {
      expect(aiFeatureOf(bad)).toBeNull();
    }
  });

  it("AIS-2 the list comes in the console's order, an unknown feature last; a list out of shape is an error", () => {
    const rows = aiFeaturesOf([
      { ...ROW, feature: "translations", unit: "character" },
      { ...ROW, feature: "zz_new" },
      { ...ROW, feature: "photo_screen" },
      { ...ROW, feature: "writing_helper" },
    ]);
    expect(rows.map((row) => row.feature)).toEqual([
      "photo_screen",
      "writing_helper",
      "translations",
      "zz_new",
    ]);
    expect(() => aiFeaturesOf({ rows: [] })).toThrow("not a list");
    expect(() => aiFeaturesOf([ROW, { ...ROW, unit: "token" }])).toThrow("out of shape");
    expect(aiFeaturesOf([])).toEqual([]);
  });

  it("AIS-3 money reads in dollars: a spend to the cent, a price per call or per million characters", () => {
    expect(spendText(0)).toBe("$0.00");
    expect(spendText(5_000)).toBe("<$0.01");
    expect(spendText(1_234_567)).toBe("$1.23");
    expect(budgetText(500)).toBe("$5.00");
    expect(budgetText(100_000)).toBe("$1,000.00");
    expect(priceText("call", 2_000)).toBe("$0.002");
    expect(priceText("call", 300)).toBe("$0.0003");
    expect(priceText("call", 40_000)).toBe("$0.04");
    expect(priceText("character", 20)).toBe("$20.00");
  });

  it("AIS-4 the form's fields: empty budget is none; dollars to cents and to millionths, within the door's ceilings", () => {
    expect(budgetCentsOf("")).toEqual({ ok: true, cents: null });
    expect(budgetCentsOf(" 5 ")).toEqual({ ok: true, cents: 500 });
    expect(budgetCentsOf("$1,000.50")).toEqual({ ok: true, cents: 100_050 });
    expect(budgetCentsOf("1000000")).toEqual({ ok: true, cents: 100_000_000 });
    for (const bad of ["-1", "abc", "1000000.01", "5,5.5", "1e3"]) {
      expect(budgetCentsOf(bad), bad).toEqual({ ok: false });
    }
    expect(unitCostOf("call", "0.002")).toBe(2_000);
    expect(unitCostOf("call", "10")).toBe(10_000_000);
    expect(unitCostOf("call", "10.000001")).toBeNull();
    expect(unitCostOf("character", "20")).toBe(20);
    expect(unitCostOf("call", "")).toBeNull();
    expect(unitCostOf("call", "-1")).toBeNull();
    expect(budgetField(null)).toBe("");
    expect(budgetField(550)).toBe("5.50");
    expect(priceField("call", 2_000)).toBe("0.002");
    expect(priceField("character", 20)).toBe("20");
  });

  it("AIS-5 every refusal of the door is a sentence; anything else keeps its reason", () => {
    expect(aiErrorKey("permission denied")).toEqual({ key: "admin.ai.error.denied", raw: null });
    expect(aiErrorKey("step-up required: no verified factor").key).toBe("admin.ai.error.stepUp");
    // Bundle 13 turn 6 — the door no longer refuses photo screening off.
    expect(aiErrorKey("screeningStaysOn")).toEqual({
      key: "admin.ai.error.unknown",
      raw: "screeningStaysOn",
    });
    expect(aiErrorKey("overBudget").key).toBe("admin.ai.error.overBudget");
    expect(aiErrorKey("unknownFeature").key).toBe("admin.ai.error.unknownFeature");
    expect(aiErrorKey("badValue:budget").key).toBe("admin.ai.error.badBudget");
    expect(aiErrorKey("badValue:unitCost").key).toBe("admin.ai.error.badPriceDoor");
    expect(aiErrorKey("badValue:enabled")).toEqual({
      key: "admin.ai.error.unknown",
      raw: "badValue:enabled",
    });
    expect(aiErrorKey("boom")).toEqual({ key: "admin.ai.error.unknown", raw: "boom" });
    expect(aiErrorKey("")).toEqual({ key: "admin.ai.error.unknown", raw: null });
  });

  /** Bundle 13 turn 14 — the spend of each day, read from its door and summed for the page. */
  const DAY_ROW = {
    feature: "photo_screen",
    day: "2026-10-14",
    calls: 3,
    units: 3,
    cost_microusd: 6000,
  };

  it("AID-1 the door's day rows are read as promised; a row out of shape refuses the whole read", () => {
    expect(aiSpendDaysOf([DAY_ROW])).toEqual([
      { feature: "photo_screen", day: "2026-10-14", calls: 3, units: 3, costMicrousd: 6000 },
    ]);
    expect(aiSpendDaysOf([])).toEqual([]);
    expect(() => aiSpendDaysOf(null)).toThrow("not a list");
    for (const bad of [
      { ...DAY_ROW, feature: "" },
      { ...DAY_ROW, day: "14/10/2026" },
      { ...DAY_ROW, calls: -1 },
      { ...DAY_ROW, units: 1.5 },
      { ...DAY_ROW, cost_microusd: "6000" },
    ]) {
      expect(() => aiSpendDaysOf([DAY_ROW, bad])).toThrow("out of shape");
    }
  });

  it("AID-2 the days are summed over every feature or kept for one, newest first, and a day with no call is left out", () => {
    const rows = aiSpendDaysOf([
      DAY_ROW,
      { feature: "writing_helper", day: "2026-10-14", calls: 2, units: 2, cost_microusd: 6000 },
      { feature: "photo_screen", day: "2026-10-12", calls: 1, units: 1, cost_microusd: 2000 },
      { feature: "translations", day: "2026-10-13", calls: 0, units: 0, cost_microusd: 0 },
    ]);
    expect(spendByDay(rows, null)).toEqual([
      { day: "2026-10-14", calls: 5, costMicrousd: 12000 },
      { day: "2026-10-12", calls: 1, costMicrousd: 2000 },
    ]);
    expect(spendByDay(rows, "photo_screen")).toEqual([
      { day: "2026-10-14", calls: 3, costMicrousd: 6000 },
      { day: "2026-10-12", calls: 1, costMicrousd: 2000 },
    ]);
    expect(spendByDay(rows, "background_removal")).toEqual([]);
  });

  it("AID-3 every feature the console names has a line of what it does and a name; an unknown one, or a name every object has, has neither", () => {
    for (const feature of [
      "photo_screen",
      "writing_helper",
      "name_check",
      "category_images",
      "category_icons",
      "translations",
      "background_removal",
    ]) {
      expect(featureAboutKey(feature)).toBe(`admin.ai.about.${feature}`);
    }
    expect(featureAboutKey("e2e-sv-x")).toBeNull();
    expect(featureAboutKey("toString")).toBeNull();
    // The own-key rule: a feature named like a member every object has is not looked up there.
    expect(featureLabelKey("toString")).toBeNull();
    expect(featureLabelKey("constructor")).toBeNull();
    expect(featureLabelKey("background_removal")).toBe("admin.ai.feature.background_removal");
  });
});
