import { useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import { useI18n, type MessageKey } from "@/i18n";

import { coverageErrorKey, type CoverageRefusal } from "./coverage-service";

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
    setRefusal(coverageErrorKey(error instanceof Error ? error.message : String(error ?? "")));
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
  allowEverywhere: boolean;
}

/** The four limit fields, shared by create and the editor (B3). */
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
    key: "maxCities" | "maxRegions" | "maxCountries",
    label: MessageKey,
    suffix: string,
  ) => (
    <FormField
      label={t(label)}
      htmlFor={`${idPrefix}-${suffix}`}
      help={t("admin.coverage.field.limitHint")}
    >
      <Input
        id={`${idPrefix}-${suffix}`}
        data-testid={`${idPrefix}-${suffix}`}
        inputMode="numeric"
        value={values[key]}
        onChange={(event) => onChange({ [key]: event.target.value } as Partial<CoverageFormValues>)}
      />
    </FormField>
  );

  return (
    <>
      {number("maxCities", "admin.coverage.field.cities", "cities")}
      {number("maxRegions", "admin.coverage.field.regions", "regions")}
      {number("maxCountries", "admin.coverage.field.countries", "countries")}
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
    </>
  );
}

export function numberOrZero(raw: string): number {
  const parsed = Number(raw.trim());
  return Number.isFinite(parsed) ? parsed : 0;
}
