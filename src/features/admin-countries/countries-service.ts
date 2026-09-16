import { supabase } from "@/integrations/supabase/client";
import type { MessageKey } from "@/i18n";

/**
 * LOCATIONS ERA L2b-C1 — THE COUNTRIES CONSOLE CLIENT SEAM.
 *
 * Every write below is a SECURITY DEFINER door landed by L1a (20260915162505)
 * that re-checks `has_permission(auth.uid(), …)` and
 * `require_step_up_if_needed(...)` server-side (E7 / F3). The browser never
 * writes `public.countries`, `public.country_root_order` or a country anchor:
 * the READ is `admin_list_countries` (L2b-M), whose column names are copied
 * from the SQL declaration.
 *
 * Law F4 — no phantom success: every error is thrown, never swallowed, and
 * `countryErrorKey` turns the door's own refusal id into a translated key.
 */

export const UNIT_SYSTEMS = ["metric", "imperial"] as const;
export type UnitSystem = (typeof UNIT_SYSTEMS)[number];

export interface CountryRow {
  code: string;
  nameEn: string;
  isActive: boolean;
  unitSystem: string;
  currencyCode: string | null;
  displayOrder: number;
  updatedAt: string;
  /** The market's own `level = 'country'` place; born inactive at L2b-M. */
  anchorId: string | null;
  anchorActive: boolean;
  placeCount: number;
  activePlaceCount: number;
  /** How many country-scoped role grants point at this market. */
  scopedRoleCount: number;
  /** The category slugs of this market's rail order, in position order. */
  rootOrder: string[];
}

export async function listCountries(): Promise<CountryRow[]> {
  const { data, error } = await supabase.rpc("admin_list_countries");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    code: row.code,
    nameEn: row.name_en,
    isActive: row.is_active === true,
    unitSystem: row.unit_system ?? "metric",
    currencyCode: row.currency_code ?? null,
    displayOrder: Number(row.display_order ?? 0),
    updatedAt: row.updated_at ?? "",
    anchorId: row.anchor_id ?? null,
    anchorActive: row.anchor_active === true,
    placeCount: Number(row.place_count ?? 0),
    activePlaceCount: Number(row.active_place_count ?? 0),
    scopedRoleCount: Number(row.scoped_role_count ?? 0),
    rootOrder: (row.root_order ?? []) as string[],
  }));
}

export interface UpsertCountryInput {
  code: string;
  nameEn: string;
  unitSystem: string;
  currencyCode: string | null;
  displayOrder: number;
}

export async function upsertCountry(input: UpsertCountryInput): Promise<void> {
  const { error } = await supabase.rpc("admin_upsert_country", {
    p_code: input.code,
    p_name_en: input.nameEn,
    p_unit_system: input.unitSystem,
    p_currency_code: input.currencyCode as string,
    p_display_order: input.displayOrder,
  });
  if (error) throw error;
}

/**
 * Opening or closing a market. A close is REFUSED with `scopedRolesExist` while
 * country-scoped roles point at it; the console then offers the explicit forced
 * close, which hides the market and keeps every grant (F4/F5 — the door is the
 * authority in both branches).
 */
export async function setCountryActive(input: {
  code: string;
  active: boolean;
  forceHide?: boolean;
}): Promise<void> {
  const { error } = await supabase.rpc("admin_set_country_active", {
    p_code: input.code,
    p_active: input.active,
    p_force_hide: input.forceHide === true,
  });
  if (error) throw error;
}

/** An EMPTY id list resets the market to the global root order. */
export async function setCountryRootOrder(input: {
  code: string;
  categoryIds: string[];
}): Promise<void> {
  const { error } = await supabase.rpc("admin_set_country_root_order", {
    p_code: input.code,
    p_category_ids: input.categoryIds,
  });
  if (error) throw error;
}

/* ------------------------------- refusals -------------------------------- */

/** Every refusal id the four country doors raise, copied by name (E7). */
export const COUNTRY_REFUSAL_IDS = [
  "badCountryCode",
  "badUnitSystem",
  "badCurrency",
  "nameRequired",
  "unknownCountry",
  "scopedRolesExist",
  "duplicateCategory",
  "notARoot",
] as const;

export interface CountryRefusal {
  key: MessageKey;
  raw: string | null;
}

export function countryErrorKey(message: string): CountryRefusal {
  const raw = (message ?? "").trim();
  if (/permission denied/i.test(raw)) {
    return { key: "admin.countries.error.denied", raw: null };
  }
  if (/step[ -]?up/i.test(raw)) {
    return { key: "admin.countries.error.stepUp", raw: null };
  }
  const head = raw.includes(":") ? raw.slice(0, raw.indexOf(":")) : raw;
  if ((COUNTRY_REFUSAL_IDS as readonly string[]).includes(head)) {
    return { key: `admin.countries.error.${head}` as MessageKey, raw: null };
  }
  return { key: "admin.countries.error.unknown", raw: raw === "" ? null : raw };
}

/* -------------------------------- sieve ---------------------------------- */

export interface CountryFilter {
  /** Matched against the name and the code. */
  search: string;
  /** "" = both, "open" | "closed" otherwise. */
  status: string;
}

/** ONE READ, sieved in the browser: a keystroke costs no request (G2). */
export function filterCountries(rows: CountryRow[], filter: CountryFilter): CountryRow[] {
  const needle = filter.search.trim().toLowerCase();
  return rows.filter((row) => {
    if (filter.status === "open" && !row.isActive) return false;
    if (filter.status === "closed" && row.isActive) return false;
    if (needle === "") return true;
    return row.nameEn.toLowerCase().includes(needle) || row.code.toLowerCase().includes(needle);
  });
}

export const COUNTRY_COLUMN_PRIORITIES = {
  name: "primary",
  status: "primary",
  places: "secondary",
  units: "secondary",
  rail: "detail",
  roles: "detail",
  updated: "wide",
} as const;
