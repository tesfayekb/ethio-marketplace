import type { MessageKey } from "@/i18n";

import { COVERAGE_LABEL_KEY_PATTERN, type SetCoveragePlanInput } from "./coverage-service";

/**
 * P-1 — THE PLANS FORM'S JUDGE (no component here, so the dialogs' file keeps
 * fast refresh): the form's values, the stored row as the editor opens it, the
 * typed number parse and the one judge the editor and Add share. The door
 * remains the authority (F3); this mirrors its rules so the surface refuses
 * before the round trip. The packages forms read `wholeNumber` from here.
 */

export interface CoverageFormValues {
  maxCities: string;
  maxRegions: string;
  maxCountries: string;
  /** D22 — the plan's photo cap, as typed. */
  maxPhotos: string;
  allowEverywhere: boolean;
  /** P-1 — an ad's lifetime in days, as typed. */
  defaultDays: string;
  /** P-1 — live ads at most, as typed; read only while `adsUnlimited` is off. */
  maxActiveAds: string;
  adsUnlimited: boolean;
  /** P-1 — the plan's label key, as typed. */
  labelKey: string;
}

/** The form as a stored row shows it (the editor's opening values). */
export function coverageFormOf(row: {
  maxCities: number;
  maxRegions: number;
  maxCountries: number;
  maxPhotos: number;
  allowEverywhere: boolean;
  defaultDays: number;
  maxActiveAds: number | null;
  labelKey: string | null;
}): CoverageFormValues {
  return {
    maxCities: String(row.maxCities),
    maxRegions: String(row.maxRegions),
    maxCountries: String(row.maxCountries),
    maxPhotos: String(row.maxPhotos),
    allowEverywhere: row.allowEverywhere,
    defaultDays: String(row.defaultDays),
    maxActiveAds: row.maxActiveAds === null ? "" : String(row.maxActiveAds),
    adsUnlimited: row.maxActiveAds === null,
    labelKey: row.labelKey ?? "",
  };
}

/**
 * Ruling 1 (answer 10) — a typed number parse: a whole number, or null when the
 * field is blank or not a number. Never a sentinel 0 (the old `numberOrZero`
 * read a blank field as 0 and let "below minimum" speak for "not a number").
 */
export function wholeNumber(raw: string): number | null {
  const text = raw.trim();
  if (!/^-?\d+$/.test(text)) return null;
  return Number(text);
}

export type CoverageFormOutcome =
  | { ok: true; input: Omit<SetCoveragePlanInput, "plan"> }
  | { ok: false; key: MessageKey };

/**
 * The form's values as the door takes them, or the first rule they break — the
 * door's own rules mirrored so the surface refuses before the round trip; the
 * door remains the authority (F3). One judge for the editor and for Add.
 */
export function coverageFormInput(values: CoverageFormValues): CoverageFormOutcome {
  const cities = wholeNumber(values.maxCities);
  const regions = wholeNumber(values.maxRegions);
  const countries = wholeNumber(values.maxCountries);
  if (
    cities === null ||
    regions === null ||
    countries === null ||
    cities < 1 ||
    regions < 1 ||
    countries < 1
  ) {
    return { ok: false, key: "admin.coverage.error.belowMinimum" };
  }
  // D22 — the photo cap's bound (0..30).
  const photos = wholeNumber(values.maxPhotos);
  if (photos === null || photos < 0 || photos > 30) {
    return { ok: false, key: "admin.coverage.error.badMaxPhotos" };
  }
  const days = wholeNumber(values.defaultDays);
  if (days === null || days < 1) return { ok: false, key: "admin.coverage.error.badDefaultDays" };
  let ads: number | null = null;
  if (!values.adsUnlimited) {
    ads = wholeNumber(values.maxActiveAds);
    if (ads === null || ads < 1) return { ok: false, key: "admin.coverage.error.badMaxActiveAds" };
  }
  const label = values.labelKey.trim();
  if (!COVERAGE_LABEL_KEY_PATTERN.test(label)) {
    return { ok: false, key: "admin.coverage.error.badLabelKey" };
  }
  return {
    ok: true,
    input: {
      maxCities: cities,
      maxRegions: regions,
      maxCountries: countries,
      maxPhotos: photos,
      allowEverywhere: values.allowEverywhere,
      defaultDays: days,
      maxActiveAds: ads,
      labelKey: label,
    },
  };
}
