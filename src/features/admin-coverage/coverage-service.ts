import type { MessageKey } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";

/**
 * LOCATIONS ERA L2b-C2 — THE COVERAGE CONSOLE CLIENT SEAM.
 *
 * The READ is a plain SELECT on `public.coverage_plans`: the table's own
 * `coverage_plans_public_read` policy (L1a, 20260915162131) publishes the plans
 * to everyone, because posting reads them too — there is nothing private in a
 * limit. The WRITE is the SECURITY DEFINER door `admin_set_coverage_plan`
 * (20260915162505), which re-checks `has_permission(auth.uid(),'coverage',
 * 'update')` AND `require_step_up_if_needed('coverage','update')` server-side
 * (E7 / F3). The browser never writes the table.
 *
 * There is NO DELETE DOOR: a plan can be edited, never removed, until a DEC
 * says otherwise — so this seam offers no removal either (A2).
 *
 * Law F4 — no phantom success: every error is thrown, and `coverageErrorKey`
 * turns the door's own refusal id into a translated key.
 */

export interface CoveragePlanRow {
  plan: string;
  maxCities: number;
  maxRegions: number;
  maxCountries: number;
  /** D22 — how many photos a listing on this plan may carry (0..30). */
  maxPhotos: number;
  allowEverywhere: boolean;
  /** P-1 (D279) — an ad's lifetime in days where its category sets none (≥ 1). */
  defaultDays: number;
  /** P-1 (D283) — live ads at most per seller; null = unlimited. */
  maxActiveAds: number | null;
  /** P-1 — the translation key naming the plan on screens; null when none is set. */
  labelKey: string | null;
  updatedAt: string;
}

export async function listCoveragePlans(): Promise<CoveragePlanRow[]> {
  const { data, error } = await supabase
    .from("coverage_plans")
    .select(
      "plan, max_cities, max_regions, max_countries, max_photos, allow_everywhere, default_days, max_active_ads, label_key, updated_at",
    )
    .order("plan");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    plan: row.plan,
    maxCities: Number(row.max_cities ?? 0),
    maxRegions: Number(row.max_regions ?? 0),
    maxCountries: Number(row.max_countries ?? 0),
    maxPhotos: Number(row.max_photos ?? 0),
    allowEverywhere: row.allow_everywhere === true,
    defaultDays: row.default_days,
    maxActiveAds: row.max_active_ads,
    labelKey: row.label_key,
    updatedAt: row.updated_at ?? "",
  }));
}

export interface SetCoveragePlanInput {
  plan: string;
  maxCities: number;
  maxRegions: number;
  maxCountries: number;
  maxPhotos: number;
  allowEverywhere: boolean;
  defaultDays: number;
  /** null = unlimited (the door's `p_ads_unlimited`). */
  maxActiveAds: number | null;
  labelKey: string;
}

export async function setCoveragePlan(input: SetCoveragePlanInput): Promise<void> {
  const { error } = await supabase.rpc("admin_set_coverage_plan", {
    p_plan: input.plan,
    p_max_cities: input.maxCities,
    p_max_regions: input.maxRegions,
    p_max_countries: input.maxCountries,
    // D22 — the cap travels with the rest of the row (INC-188: a save never
    // drops a field the surface holds).
    p_max_photos: input.maxPhotos,
    p_allow_everywhere: input.allowEverywhere,
    // P-1 — the three dials travel too; an unlimited quota is the flag, never a number.
    p_default_days: input.defaultDays,
    ...(input.maxActiveAds === null
      ? { p_ads_unlimited: true }
      : { p_max_active_ads: input.maxActiveAds, p_ads_unlimited: false }),
    p_label_key: input.labelKey,
  });
  if (error) throw error;
}

/* ------------------------------- refusals -------------------------------- */

/** Every refusal id the coverage door raises, copied by name (E7). */
export const COVERAGE_REFUSAL_IDS = [
  "badPlan",
  "belowMinimum",
  "badMaxPhotos",
  "badDefaultDays",
  "badMaxActiveAds",
  "badLabelKey",
] as const;

export interface CoverageRefusal {
  key: MessageKey;
  raw: string | null;
}

export function coverageErrorKey(message: string): CoverageRefusal {
  const raw = (message ?? "").trim();
  if (/permission denied/i.test(raw)) {
    return { key: "admin.coverage.error.denied", raw: null };
  }
  if (/step[ -]?up/i.test(raw)) {
    return { key: "admin.coverage.error.stepUp", raw: null };
  }
  const head = raw.includes(":") ? raw.slice(0, raw.indexOf(":")) : raw;
  if ((COVERAGE_REFUSAL_IDS as readonly string[]).includes(head)) {
    return { key: `admin.coverage.error.${head}` as MessageKey, raw: null };
  }
  return { key: "admin.coverage.error.unknown", raw: raw === "" ? null : raw };
}

/** The door's own plan shape, so the surface refuses before the round trip. */
export const COVERAGE_PLAN_PATTERN = /^[a-z_]{2,32}$/;
/** P-1 — the door's label-key shape (`coverage_plans_label_key_check`). */
export const COVERAGE_LABEL_KEY_PATTERN = /^[a-z][a-z0-9_.]{1,79}$/;

export const COVERAGE_COLUMN_PRIORITIES = {
  plan: "primary",
  cities: "primary",
  regions: "primary",
  countries: "primary",
  photos: "primary",
  days: "primary",
  ads: "primary",
  everywhere: "secondary",
  label: "detail",
  updated: "detail",
} as const;
