import { useState } from "react";

import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";

import {
  CoverageDialogActions,
  CoverageErrorLine,
  CoverageFormFields,
  numberOrZero,
  useCoverageError,
  type CoverageFormValues,
} from "./coverage-dialogs";
import type { CoveragePlanRow } from "./coverage-service";
import { useSetCoveragePlan } from "./use-coverage";

/**
 * L2b-C2 — THE PLAN EDITOR IS THE ROW'S ONE SURFACE (CT-8). The roster carries
 * a single 44px pencil per row; the four limits and the save live here.
 *
 * INC-188 — the save round-trips EVERY stored field this surface holds, so it
 * never drops what the operator did not touch. The plan name is the row's
 * identity and is shown, never re-typed. There is no delete door: a plan is
 * edited, never removed.
 */
export function CoverageEditorDialog({
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
  const { refusal, clear, fail, render } = useCoverageError();
  const [form, setForm] = useState<CoverageFormValues>(() => ({
    maxCities: String(row.maxCities),
    maxRegions: String(row.maxRegions),
    maxCountries: String(row.maxCountries),
    maxPhotos: String(row.maxPhotos),
    allowEverywhere: row.allowEverywhere,
  }));

  const submit = () => {
    clear();
    if (
      numberOrZero(form.maxCities) < 1 ||
      numberOrZero(form.maxRegions) < 1 ||
      numberOrZero(form.maxCountries) < 1
    ) {
      render("admin.coverage.error.belowMinimum");
      return;
    }
    // D22 — the door's own bound, mirrored so the surface refuses before the
    // round trip; the door remains the authority (F3).
    const photos = numberOrZero(form.maxPhotos);
    if (photos < 0 || photos > 30) {
      render("admin.coverage.error.badMaxPhotos");
      return;
    }
    void guard(async () => {
      try {
        await save.mutateAsync({
          plan: row.plan,
          maxCities: numberOrZero(form.maxCities),
          maxRegions: numberOrZero(form.maxRegions),
          maxCountries: numberOrZero(form.maxCountries),
          maxPhotos: photos,
          allowEverywhere: form.allowEverywhere,
        });
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="coverage-editor"
      openedBy={openedBy}
      title={t("admin.coverage.edit.title")}
      onClose={onClose}
    >
      <p className="min-w-0 break-words text-sm" data-testid="coverage-editor-plan">
        {row.plan}
      </p>
      <CoverageFormFields
        idPrefix="coverage-editor"
        values={form}
        onChange={(next) => setForm((prev) => ({ ...prev, ...next }))}
      />
      <p className="text-sm text-muted-foreground">{t("admin.coverage.noDelete")}</p>
      <CoverageErrorLine refusal={refusal} />
      <CoverageDialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={save.isPending}
        submitTestId="coverage-editor-save"
      />
    </CategoryModal>
  );
}

export default CoverageEditorDialog;
