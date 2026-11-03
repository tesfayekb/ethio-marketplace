import { useState } from "react";

import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";

import { capsFormInput, capsFormOf, type CapsFormValues } from "./caps-forms";
import {
  MonetisationDialogActions,
  MonetisationErrorLine,
  NumberField,
  Toggle,
} from "./monetisation-dialogs";
import type { CoveragePlanRow } from "./monetisation-service";
import { useSetCoveragePlan } from "./use-monetisation";
import { useMonetisationError } from "./use-monetisation-error";

/**
 * P-1b (ruling 1 §3 d) — THE CAPS EDITOR: the P-1 plan editor without its
 * label key. The plan's name is the row's identity and is shown, never
 * re-typed. INC-188 — the save round-trips every stored field this surface
 * holds, and the door keeps the label key it does not show.
 */
export function CapsEditorDialog({
  row,
  guard,
  openedBy,
  onClose,
}: {
  row: CoveragePlanRow;
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const save = useSetCoveragePlan();
  const { refusal, clear, fail, render } = useMonetisationError();
  const [form, setForm] = useState<CapsFormValues>(() => capsFormOf(row));
  const prefix = "monetisation-caps-edit";
  const change = (next: Partial<CapsFormValues>) => setForm((prev) => ({ ...prev, ...next }));

  const submit = () => {
    clear();
    const judged = capsFormInput(form);
    if (!judged.ok) {
      render(judged.key);
      return;
    }
    void guard(async () => {
      try {
        await save.mutateAsync({ plan: row.plan, ...judged.input });
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid={prefix}
      openedBy={openedBy}
      title={t("admin.monetisation.caps.edit")}
      onClose={onClose}
    >
      <p className="min-w-0 break-words text-sm" data-testid={`${prefix}-plan`}>
        {row.plan}
      </p>
      <NumberField
        id={`${prefix}-cities`}
        labelKey="admin.coverage.field.cities"
        helpKey="admin.coverage.field.limitHint"
        value={form.maxCities}
        onChange={(next) => change({ maxCities: next })}
      />
      <NumberField
        id={`${prefix}-regions`}
        labelKey="admin.coverage.field.regions"
        helpKey="admin.coverage.field.limitHint"
        value={form.maxRegions}
        onChange={(next) => change({ maxRegions: next })}
      />
      <NumberField
        id={`${prefix}-countries`}
        labelKey="admin.coverage.field.countries"
        helpKey="admin.coverage.field.limitHint"
        value={form.maxCountries}
        onChange={(next) => change({ maxCountries: next })}
      />
      {/* D22 — the ONE dial the photos step reads, editable here (0..30). */}
      <NumberField
        id={`${prefix}-photos`}
        labelKey="admin.coverage.field.photos"
        helpKey="admin.coverage.field.photosHint"
        value={form.maxPhotos}
        onChange={(next) => change({ maxPhotos: next })}
      />
      <Toggle
        id={`${prefix}-everywhere`}
        labelKey="admin.coverage.field.everywhere"
        checked={form.allowEverywhere}
        onChange={(next) => change({ allowEverywhere: next })}
      />
      {/* P-1 (D279, D283) — the plan's lifetime and quota dials; a quota is a number or Unlimited. */}
      <NumberField
        id={`${prefix}-days`}
        labelKey="admin.coverage.field.days"
        helpKey="admin.coverage.field.daysHint"
        value={form.defaultDays}
        onChange={(next) => change({ defaultDays: next })}
      />
      <NumberField
        id={`${prefix}-ads`}
        labelKey="admin.coverage.field.ads"
        helpKey="admin.coverage.field.adsHint"
        value={form.maxActiveAds}
        disabled={form.adsUnlimited}
        onChange={(next) => change({ maxActiveAds: next })}
      />
      <Toggle
        id={`${prefix}-ads-unlimited`}
        labelKey="admin.coverage.field.adsUnlimited"
        checked={form.adsUnlimited}
        onChange={(next) => change({ adsUnlimited: next })}
      />
      <p className="text-sm text-muted-foreground">{t("admin.coverage.noDelete")}</p>
      <MonetisationErrorLine refusal={refusal} testid={`${prefix}-error`} />
      <MonetisationDialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={save.isPending}
        cancelTestId={`${prefix}-cancel`}
        submitTestId={`${prefix}-save`}
        submitLabel={t("common.save")}
      />
    </CategoryModal>
  );
}

export default CapsEditorDialog;
