import type { MessageKey } from "@/i18n";

import { wholeNumber } from "./monetisation-forms";
import type { CoveragePlanRow, SetCoveragePlanInput } from "./monetisation-service";

/**
 * P-1b — THE POSTING CAPS JUDGE: the P-1 plans form without its label key
 * (the door keeps the stored one). The door remains the authority (F3); this
 * mirrors its rules so the surface refuses before the round trip.
 */

export interface CapsFormValues {
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
}

/** The form as a stored row shows it (the editor's opening values). */
export function capsFormOf(row: CoveragePlanRow): CapsFormValues {
  return {
    maxCities: String(row.maxCities),
    maxRegions: String(row.maxRegions),
    maxCountries: String(row.maxCountries),
    maxPhotos: String(row.maxPhotos),
    allowEverywhere: row.allowEverywhere,
    defaultDays: String(row.defaultDays),
    maxActiveAds: row.maxActiveAds === null ? "" : String(row.maxActiveAds),
    adsUnlimited: row.maxActiveAds === null,
  };
}

export type CapsFormOutcome =
  | { ok: true; input: Omit<SetCoveragePlanInput, "plan"> }
  | { ok: false; key: MessageKey };

export function capsFormInput(values: CapsFormValues): CapsFormOutcome {
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
    },
  };
}
