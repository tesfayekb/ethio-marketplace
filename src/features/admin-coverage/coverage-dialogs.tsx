import { useState } from "react";
import { errorText } from "@/lib/error-text";

import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import { useI18n, type MessageKey } from "@/i18n";

import {
  COVERAGE_LABEL_KEY_PATTERN,
  coverageErrorKey,
  type CoverageRefusal,
  type SetCoveragePlanInput,
} from "./coverage-service";

/**
 * LOCATIONS ERA L2b-C2 — THE COVERAGE WRITE SURFACES (shared pieces).
 *
 * Every submit runs through the page's step-up `guard`; the door behind it
 * re-checks the permission AND the step-up server-side (F3), so a refusal here
 * is a translated sentence naming the door's own id, never a silent no-op (F4).
 * Nothing closes on failure. 360-first: full-width controls, ≥44px targets,
 * logical spacing only (C5).
 */

/** F4 — one refusal mapping for every coverage surface (B2). */
export function useCoverageError() {
  const [refusal, setRefusal] = useState<CoverageRefusal | null>(null);
  const clear = () => setRefusal(null);
  const fail = (error: unknown) => {
    const abort = stepUpAbortKey(error);
    if (abort !== undefined) {
      setRefusal(abort === null ? null : { key: abort as MessageKey, raw: null });
      return;
    }
    setRefusal(coverageErrorKey(error === null || error === undefined ? "" : errorText(error)));
  };
  const render = (message: MessageKey) => setRefusal({ key: message, raw: null });
  return { refusal, clear, fail, render };
}

export function CoverageErrorLine({ refusal }: { refusal: CoverageRefusal | null }) {
  const { t } = useI18n();
  if (refusal === null) return null;
  return (
    <>
      <p role="alert" data-testid="coverage-editor-error" className="text-sm text-destructive">
        {t(refusal.key)}
      </p>
      {refusal.raw === null ? null : (
        <p
          className="text-sm break-words text-muted-foreground"
          data-testid="coverage-editor-error-reason"
        >
          {t("admin.coverage.error.reason").replace("{reason}", refusal.raw)}
        </p>
      )}
    </>
  );
}

export function CoverageDialogActions({
  onCancel,
  onSubmit,
  busy,
  submitTestId,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  busy: boolean;
  submitTestId: string;
}) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
      <Button
        type="button"
        variant="outline"
        size="touch"
        data-testid="coverage-dialog-cancel"
        onClick={onCancel}
      >
        {t("common.cancel")}
      </Button>
      <Button
        type="button"
        size="touch"
        data-testid={submitTestId}
        disabled={busy}
        onClick={onSubmit}
      >
        {t("common.save")}
      </Button>
    </div>
  );
}

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

/** The limit fields, shared by create and the editor (B3). */
export function CoverageFormFields({
  idPrefix,
  values,
  onChange,
}: {
  idPrefix: string;
  values: CoverageFormValues;
  onChange: (next: Partial<CoverageFormValues>) => void;
}) {
  const { t } = useI18n();
  const number = (
    key: "maxCities" | "maxRegions" | "maxCountries" | "maxPhotos" | "defaultDays" | "maxActiveAds",
    label: MessageKey,
    suffix: string,
    help: MessageKey = "admin.coverage.field.limitHint",
    disabled = false,
  ) => (
    <FormField label={t(label)} htmlFor={`${idPrefix}-${suffix}`} help={t(help)}>
      <Input
        id={`${idPrefix}-${suffix}`}
        data-testid={`${idPrefix}-${suffix}`}
        inputMode="numeric"
        value={values[key]}
        disabled={disabled}
        onChange={(event) => onChange({ [key]: event.target.value } as Partial<CoverageFormValues>)}
      />
    </FormField>
  );

  return (
    <>
      {number("maxCities", "admin.coverage.field.cities", "cities")}
      {number("maxRegions", "admin.coverage.field.regions", "regions")}
      {number("maxCountries", "admin.coverage.field.countries", "countries")}
      {/* D22 — the ONE dial the photos step reads, editable here (0..30). */}
      {number(
        "maxPhotos",
        "admin.coverage.field.photos",
        "photos",
        "admin.coverage.field.photosHint",
      )}
      <label className="flex min-h-11 min-w-0 items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="size-5"
          data-testid={`${idPrefix}-everywhere`}
          checked={values.allowEverywhere}
          onChange={(event) => onChange({ allowEverywhere: event.target.checked })}
        />
        <span>{t("admin.coverage.field.everywhere")}</span>
      </label>
      {/* P-1 (D279, D283) — the plan's lifetime and quota dials; a quota is a number or Unlimited. */}
      {number("defaultDays", "admin.coverage.field.days", "days", "admin.coverage.field.daysHint")}
      {number(
        "maxActiveAds",
        "admin.coverage.field.ads",
        "ads",
        "admin.coverage.field.adsHint",
        values.adsUnlimited,
      )}
      <label className="flex min-h-11 min-w-0 items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="size-5"
          data-testid={`${idPrefix}-ads-unlimited`}
          checked={values.adsUnlimited}
          onChange={(event) => onChange({ adsUnlimited: event.target.checked })}
        />
        <span>{t("admin.coverage.field.adsUnlimited")}</span>
      </label>
      <FormField
        label={t("admin.coverage.field.label")}
        htmlFor={`${idPrefix}-label`}
        help={t("admin.coverage.field.labelHint")}
      >
        <Input
          id={`${idPrefix}-label`}
          data-testid={`${idPrefix}-label`}
          value={values.labelKey}
          maxLength={80}
          onChange={(event) => onChange({ labelKey: event.target.value })}
        />
      </FormField>
    </>
  );
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
