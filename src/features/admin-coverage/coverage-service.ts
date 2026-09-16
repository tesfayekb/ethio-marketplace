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
  allowEverywhere: boolean;
  updatedAt: string;
}

export async function listCoveragePlans(): Promise<CoveragePlanRow[]> {
  const { data, error } = await supabase
    .from("coverage_plans")
    .select("plan, max_cities, max_regions, max_countries, allow_everywhere, updated_at")
    .order("plan");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    plan: row.plan,
    maxCities: Number(row.max_cities ?? 0),
    maxRegions: Number(row.max_regions ?? 0),
    maxCountries: Number(row.max_countries ?? 0),
    allowEverywhere: row.allow_everywhere === true,
    updatedAt: row.updated_at ?? "",
  }));
}

export interface SetCoveragePlanInput {
  plan: string;
  maxCities: number;
  maxRegions: number;
  maxCountries: number;
  allowEverywhere: boolean;
}

export async function setCoveragePlan(input: SetCoveragePlanInput): Promise<void> {
  const { error } = await supabase.rpc("admin_set_coverage_plan", {
    p_plan: input.plan,
    p_max_cities: input.maxCities,
    p_max_regions: input.maxRegions,
    p_max_countries: input.maxCountries,
    p_allow_everywhere: input.allowEverywhere,
  });
  if (error) throw error;
}

/* ------------------------------- refusals -------------------------------- */

/** Every refusal id the coverage door raises, copied by name (E7). */
export const COVERAGE_REFUSAL_IDS = ["badPlan", "belowMinimum"] as const;

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

export const COVERAGE_COLUMN_PRIORITIES = {
  plan: "primary",
  cities: "primary",
  regions: "primary",
  countries: "primary",
  everywhere: "secondary",
  updated: "detail",
} as const;
