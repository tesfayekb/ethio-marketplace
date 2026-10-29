import type { MessageKey } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import { ownValue } from "@/lib/own-key";
import { ReaderError, readerFailure } from "@/lib/reader-failure";

/**
 * Bundle 13 turn 5 (D158) — THE AI SERVICES CONSOLE CLIENT SEAM.
 *
 * The READ is the door `admin_ai_features()` (`services:view`), the WRITE the
 * door `admin_set_ai_feature(feature, enabled, budget_cents, unit_cost)`
 * (`services:manage` and a fresh second factor), both from bundle 13 turn 1
 * (docs/features/ai-services.md). The tables behind them are closed to the
 * browser; every check is the door's (F3).
 *
 * Money: the door keeps prices in millionths of a dollar (`unit_cost_microusd`)
 * and budgets in cents. A price per character is shown per million characters,
 * which is the same number: $20 a million characters is 20 millionths a
 * character.
 *
 * Law F4 — a row the door answers in another shape is refused, never shown with
 * invented numbers; every error is thrown, and `aiErrorKey` turns the door's
 * own refusal into a translated sentence.
 */

export type AiUnit = "call" | "character";
export type AiOffReason = "staff" | "budget";

export interface AiFeatureRow {
  feature: string;
  on: boolean;
  offReason: AiOffReason | null;
  /** When it was switched off (ISO), or null while on. */
  offAt: string | null;
  /** Empty = no budget. */
  monthlyBudgetCents: number | null;
  unit: AiUnit;
  unitCostMicrousd: number;
  monthSpentMicrousd: number;
  monthCalls: number;
  monthUnits: number;
  todayCalls: number;
  /** 0, 80 or 100 — this month's alert. */
  alertLevel: 0 | 80 | 100;
  updatedAt: string;
}

/**
 * The six features turn 1 seeded and background removal (turn 12, D155b), in
 * the order the console lists them.
 */
export const AI_FEATURE_ORDER = [
  "photo_screen",
  "writing_helper",
  "name_check",
  "category_images",
  "category_icons",
  "translations",
  "background_removal",
] as const;

const FEATURE_LABELS: Record<(typeof AI_FEATURE_ORDER)[number], MessageKey> = {
  photo_screen: "admin.ai.feature.photo_screen",
  writing_helper: "admin.ai.feature.writing_helper",
  name_check: "admin.ai.feature.name_check",
  category_images: "admin.ai.feature.category_images",
  category_icons: "admin.ai.feature.category_icons",
  translations: "admin.ai.feature.translations",
  background_removal: "admin.ai.feature.background_removal",
};

/**
 * Bundle 13 turn 14 (the operator, 2026-10-14: "have the documentation in the
 * admin section") — what each feature does and who provides it, shown under
 * its name.
 */
const FEATURE_ABOUT: Record<(typeof AI_FEATURE_ORDER)[number], MessageKey> = {
  photo_screen: "admin.ai.about.photo_screen",
  writing_helper: "admin.ai.about.writing_helper",
  name_check: "admin.ai.about.name_check",
  category_images: "admin.ai.about.category_images",
  category_icons: "admin.ai.about.category_icons",
  translations: "admin.ai.about.translations",
  background_removal: "admin.ai.about.background_removal",
};

/** A feature's line of what it does, or null for a feature this build does not name. */
export function featureAboutKey(feature: string): MessageKey | null {
  return ownValue<MessageKey>(FEATURE_ABOUT, feature) ?? null;
}

/**
 * A feature's name key, or null for a feature this build does not name (its id is shown).
 * The feature comes from a row, so only the map's own members are read (the own-key rule).
 */
export function featureLabelKey(feature: string): MessageKey | null {
  return ownValue<MessageKey>(FEATURE_LABELS, feature) ?? null;
}

const whole = (value: unknown): number | null =>
  typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;

/** One row of the door's answer, or null when any field is not as the door promises. */
export function aiFeatureOf(raw: unknown): AiFeatureRow | null {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return null;
  const row = raw as Record<string, unknown>;
  const feature = row["feature"];
  const on = row["on"];
  const offReason = row["off_reason"] ?? null;
  const offAt = row["off_at"] ?? null;
  const budget = row["monthly_budget_cents"] ?? null;
  const unit = row["unit"];
  const alert = row["alert_level"];
  const updatedAt = row["updated_at"] ?? "";
  const numbers = [
    "unit_cost_microusd",
    "month_spent_microusd",
    "month_calls",
    "month_units",
    "today_calls",
  ].map((key) => whole(row[key]));
  if (typeof feature !== "string" || feature === "") return null;
  if (typeof on !== "boolean") return null;
  if (offReason !== null && offReason !== "staff" && offReason !== "budget") return null;
  if (on !== (offReason === null)) return null;
  if (offAt !== null && typeof offAt !== "string") return null;
  if (budget !== null && whole(budget) === null) return null;
  if (unit !== "call" && unit !== "character") return null;
  if (alert !== 0 && alert !== 80 && alert !== 100) return null;
  if (typeof updatedAt !== "string") return null;
  if (numbers.some((value) => value === null)) return null;
  const [unitCost, spent, calls, units, today] = numbers as number[];
  return {
    feature,
    on,
    offReason,
    offAt,
    monthlyBudgetCents: budget as number | null,
    unit,
    unitCostMicrousd: unitCost!,
    monthSpentMicrousd: spent!,
    monthCalls: calls!,
    monthUnits: units!,
    todayCalls: today!,
    alertLevel: alert,
    updatedAt,
  };
}

/** The door's whole answer: every row as promised, in the console's order, or a thrown error (F4). */
export function aiFeaturesOf(payload: unknown): AiFeatureRow[] {
  if (!Array.isArray(payload)) throw new Error("admin_ai_features: not a list");
  const rows = payload.map(aiFeatureOf);
  if (rows.some((row) => row === null)) throw new Error("admin_ai_features: a row out of shape");
  const rank = (feature: string) => {
    const index = (AI_FEATURE_ORDER as readonly string[]).indexOf(feature);
    return index === -1 ? AI_FEATURE_ORDER.length : index;
  };
  return (rows as AiFeatureRow[]).sort(
    (a, b) => rank(a.feature) - rank(b.feature) || a.feature.localeCompare(b.feature),
  );
}

export async function listAiFeatures(): Promise<AiFeatureRow[]> {
  const { data, error } = await supabase.rpc("admin_ai_features");
  if (error) throw error;
  return aiFeaturesOf(data);
}

/* ------------------------------ spend by day ------------------------------ */

/** Bundle 13 turn 14 — how many UTC days the page shows (the door allows 1–92). */
export const SPEND_DAYS = 30;

/** One feature's spend on one UTC day, as `admin_ai_spend_days` answers it. */
export interface AiSpendDay {
  feature: string;
  /** YYYY-MM-DD (UTC). */
  day: string;
  calls: number;
  units: number;
  costMicrousd: number;
}

const DAY = /^\d{4}-\d{2}-\d{2}$/;

/** The door's whole answer, every row as promised, or a thrown error (F4: never invented numbers). */
export function aiSpendDaysOf(payload: unknown): AiSpendDay[] {
  if (!Array.isArray(payload)) throw new Error("admin_ai_spend_days: not a list");
  return payload.map((raw) => {
    const row = (raw ?? {}) as Record<string, unknown>;
    const feature = row["feature"];
    const day = row["day"];
    const numbers = ["calls", "units", "cost_microusd"].map((key) => whole(row[key]));
    if (typeof feature !== "string" || feature === "") {
      throw new Error("admin_ai_spend_days: a row out of shape");
    }
    if (typeof day !== "string" || !DAY.test(day)) {
      throw new Error("admin_ai_spend_days: a row out of shape");
    }
    if (numbers.some((value) => value === null)) {
      throw new Error("admin_ai_spend_days: a row out of shape");
    }
    const [calls, units, cost] = numbers as number[];
    return { feature, day, calls: calls!, units: units!, costMicrousd: cost! };
  });
}

export async function listAiSpendDays(days: number = SPEND_DAYS): Promise<AiSpendDay[]> {
  const { data, error } = await supabase.rpc("admin_ai_spend_days", { p_days: days });
  if (error) throw error;
  return aiSpendDaysOf(data);
}

/** One day's line on the page: a feature's, or every feature's together. */
export interface DaySpend {
  day: string;
  calls: number;
  costMicrousd: number;
}

/** The days with any call, newest first, for one feature or (null) for all of them summed. */
export function spendByDay(rows: readonly AiSpendDay[], feature: string | null): DaySpend[] {
  const byDay = new Map<string, DaySpend>();
  for (const row of rows) {
    if (feature !== null && row.feature !== feature) continue;
    const line = byDay.get(row.day) ?? { day: row.day, calls: 0, costMicrousd: 0 };
    line.calls += row.calls;
    line.costMicrousd += row.costMicrousd;
    byDay.set(row.day, line);
  }
  return [...byDay.values()]
    .filter((line) => line.calls > 0 || line.costMicrousd > 0)
    .sort((a, b) => (a.day < b.day ? 1 : a.day > b.day ? -1 : 0));
}

export interface SetAiFeatureInput {
  feature: string;
  enabled: boolean;
  monthlyBudgetCents: number | null;
  unitCostMicrousd: number;
}

export async function setAiFeature(input: SetAiFeatureInput): Promise<void> {
  const { error } = await supabase.rpc("admin_set_ai_feature", {
    p_feature: input.feature,
    p_enabled: input.enabled,
    // The door takes NULL for "no budget"; the generated type says number.
    p_monthly_budget_cents: input.monthlyBudgetCents as number,
    p_unit_cost_microusd: input.unitCostMicrousd,
  });
  if (error) throw error;
}

/* --------------------------------- money --------------------------------- */

const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const fine = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 6,
});
const count = new Intl.NumberFormat("en-US");

/** A spend in millionths of a dollar, to the cent; a spend under a cent says so. */
export function spendText(microusd: number): string {
  if (microusd > 0 && microusd < 10_000) return `<${dollars.format(0.01)}`;
  return dollars.format(microusd / 1_000_000);
}

/** A budget in cents. */
export function budgetText(cents: number): string {
  return dollars.format(cents / 100);
}

/** A unit price as the console shows it: a call's price, or a million characters' price. */
export function priceText(unit: AiUnit, microusd: number): string {
  return unit === "call" ? fine.format(microusd / 1_000_000) : dollars.format(microusd);
}

export function countText(value: number): string {
  return count.format(value);
}

/** The door's ceilings (admin_set_ai_feature), mirrored so the form refuses first (F3). */
export const MAX_BUDGET_CENTS = 100_000_000;
export const MAX_UNIT_COST_MICROUSD = 10_000_000;

/**
 * A typed dollar amount, or null when it is not a plain non-negative number: a
 * leading "$" is allowed, and commas only between groups of three digits.
 */
function typedDollars(raw: string): number | null {
  const text = raw.trim().replace(/^\$/, "");
  if (!/^(\d+|\d{1,3}(,\d{3})+)(\.\d+)?$/.test(text)) return null;
  const value = Number(text.replace(/,/g, ""));
  return Number.isFinite(value) ? value : null;
}

/** The budget field: empty is "no budget"; otherwise whole cents within the door's ceiling. */
export function budgetCentsOf(raw: string): { ok: true; cents: number | null } | { ok: false } {
  if (raw.trim() === "") return { ok: true, cents: null };
  const value = typedDollars(raw);
  if (value === null) return { ok: false };
  const cents = Math.round(value * 100);
  return cents > MAX_BUDGET_CENTS ? { ok: false } : { ok: true, cents };
}

/** The price field: dollars a call, or dollars a million characters, to whole millionths. */
export function unitCostOf(unit: AiUnit, raw: string): number | null {
  const value = typedDollars(raw);
  if (value === null) return null;
  const micro = Math.round(unit === "call" ? value * 1_000_000 : value);
  return micro > MAX_UNIT_COST_MICROUSD ? null : micro;
}

/** A2: a page is already keyed by the door; never infer totals or expose hashes/IDs. */
export const AI_OUTCOMES = ["ok", "featureOff", "budget", "unavailable", "timeout", "providerError", "unusableAnswer"] as const;
export type AiOutcome = (typeof AI_OUTCOMES)[number];
export type AiCallsCursor = { at: string; id: string };
export interface AiCallRow {
  id: string;
  created_at: string;
  feature: string;
  task: string;
  task_version: number;
  model: string;
  outcome: AiOutcome;
  provider_status: number | null;
  latency_ms: number;
  fake: boolean;
  actor: { kind: "system" | "hidden" } | { kind: "person"; name: string };
}
export interface AiCallsPage { rows: AiCallRow[]; next: AiCallsCursor | null }
const TASK_LABELS: Record<string, MessageKey> = {
  photo_screen: "admin.ai.feature.photo_screen", writing_helper: "admin.ai.feature.writing_helper",
  name_check: "admin.ai.feature.name_check", category_image: "admin.ai.feature.category_images",
  category_icon: "admin.ai.feature.category_icons", translation: "admin.ai.feature.translations",
  background_removal: "admin.ai.feature.background_removal",
};
export const AI_TASK_ORDER = Object.keys(TASK_LABELS);
export function taskLabelKey(task: string): MessageKey | null {
  return ownValue<MessageKey>(TASK_LABELS, task) ?? null;
}
export function aiCallsOf(raw: unknown): AiCallsPage {
  const malformed = () => new ReaderError({ class: "malformed", message: "admin_list_ai_calls: answer out of shape" });
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) throw malformed();
  const page = raw as Record<string, unknown>;
  if (!Array.isArray(page["rows"])) throw malformed();
  const rows = page["rows"].map((value): AiCallRow => {
    if (value === null || typeof value !== "object") throw malformed();
    const row = value as Record<string, unknown>;
    for (const key of ["id", "created_at", "feature", "task", "model"]) {
      if (typeof row[key] !== "string" || row[key] === "") throw malformed();
    }
    if (!Number.isFinite(Date.parse(String(row["created_at"]))) || whole(row["task_version"]) === null || row["task_version"] === 0 ||
      whole(row["latency_ms"]) === null || typeof row["fake"] !== "boolean" ||
      !AI_OUTCOMES.includes(row["outcome"] as AiOutcome) ||
      (row["provider_status"] !== null && (whole(row["provider_status"]) === null || Number(row["provider_status"]) < 100 || Number(row["provider_status"]) > 599))) throw malformed();
    const actor = row["actor"] as Record<string, unknown> | null;
    if (!actor || !["system", "hidden", "person"].includes(String(actor["kind"])) ||
      (actor["kind"] === "person" && typeof actor["name"] !== "string")) throw malformed();
    return { id: String(row["id"]), created_at: String(row["created_at"]), feature: String(row["feature"]),
      task: String(row["task"]), task_version: Number(row["task_version"]), model: String(row["model"]),
      outcome: row["outcome"] as AiOutcome, provider_status: row["provider_status"] as number | null,
      latency_ms: Number(row["latency_ms"]), fake: row["fake"],
      actor: actor["kind"] === "person" ? { kind: "person", name: String(actor["name"]) } : { kind: actor["kind"] as "hidden" | "system" } };
  });
  const next = page["next"];
  if (next === null) return { rows, next: null };
  if (!next || typeof next !== "object" || Array.isArray(next)) throw malformed();
  const cursor = next as Record<string, unknown>;
  if (typeof cursor["at"] !== "string" || !Number.isFinite(Date.parse(cursor["at"])) || typeof cursor["id"] !== "string") throw malformed();
  return { rows, next: { at: cursor["at"], id: cursor["id"] } };
}
export async function fetchAiCalls(task: string, outcome: string, before: AiCallsCursor | null): Promise<AiCallsPage> {
  const { data, error } = await supabase.rpc("admin_list_ai_calls", {
    ...(task ? { p_task: task } : {}), ...(outcome ? { p_outcome: outcome } : {}),
    ...(before ? { p_before_at: before.at, p_before_id: before.id } : {}), p_limit: 50,
  });
  if (error) throw new ReaderError(readerFailure(error));
  return aiCallsOf(data);
}

/** The fields as the form first shows them: the stored values, typed back. */
export function budgetField(cents: number | null): string {
  return cents === null ? "" : (cents / 100).toFixed(2);
}

export function priceField(unit: AiUnit, microusd: number): string {
  return unit === "call" ? String(microusd / 1_000_000) : String(microusd);
}

/** The price ceiling in the form's own terms, for the refusal's sentence. */
export function priceCeilingText(unit: AiUnit): string {
  return priceText(unit, MAX_UNIT_COST_MICROUSD);
}

/* -------------------------------- refusals -------------------------------- */

/** Every refusal the door raises, by name (E7). */
export const AI_REFUSAL_IDS = ["overBudget", "unknownFeature", "badValue"] as const;

export interface AiRefusal {
  key: MessageKey;
  raw: string | null;
}

export function aiErrorKey(message: string): AiRefusal {
  const raw = (message ?? "").trim();
  if (/permission denied/i.test(raw)) return { key: "admin.ai.error.denied", raw: null };
  if (/step[ -]?up/i.test(raw)) return { key: "admin.ai.error.stepUp", raw: null };
  const head = raw.includes(":") ? raw.slice(0, raw.indexOf(":")) : raw;
  if (head === "badValue") {
    const field = raw.slice(raw.indexOf(":") + 1);
    if (field === "budget") return { key: "admin.ai.error.badBudget", raw: null };
    if (field === "unitCost") return { key: "admin.ai.error.badPriceDoor", raw: null };
    return { key: "admin.ai.error.unknown", raw };
  }
  if ((AI_REFUSAL_IDS as readonly string[]).includes(head)) {
    return { key: `admin.ai.error.${head}` as MessageKey, raw: null };
  }
  return { key: "admin.ai.error.unknown", raw: raw === "" ? null : raw };
}

export const AI_COLUMN_PRIORITIES = {
  feature: "primary",
  state: "primary",
  spend: "primary",
  calls: "secondary",
  price: "secondary",
  updated: "detail",
} as const;
