import { useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { Input } from "@/components/ui/input";
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
import { COVERAGE_PLAN_PATTERN } from "./coverage-service";
import { useSetCoveragePlan } from "./use-coverage";

/**
 * L2b-C2 — ADD A PLAN. The plan name is checked against the door's own shape
 * before the round trip, and the door checks it again (F3); a refusal is
 * rendered by name (F4).
 */
export function CoverageCreateDialog({ guard, onClose }: { guard: GuardFn; onClose: () => void }) {
  const { t } = useI18n();
  const save = useSetCoveragePlan();
  const { refusal, clear, fail, render } = useCoverageError();
  const [plan, setPlan] = useState("");
  const [form, setForm] = useState<CoverageFormValues>({
    maxCities: "1",
    maxRegions: "1",
    maxCountries: "1",
    allowEverywhere: false,
  });

  const submit = () => {
    clear();
    if (!COVERAGE_PLAN_PATTERN.test(plan.trim())) {
      render("admin.coverage.error.badPlan");
      return;
    }
    if (
      numberOrZero(form.maxCities) < 1 ||
      numberOrZero(form.maxRegions) < 1 ||
      numberOrZero(form.maxCountries) < 1
    ) {
      render("admin.coverage.error.belowMinimum");
      return;
    }
    void guard(async () => {
      try {
        await save.mutateAsync({
          plan: plan.trim(),
          maxCities: numberOrZero(form.maxCities),
          maxRegions: numberOrZero(form.maxRegions),
          maxCountries: numberOrZero(form.maxCountries),
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
      testid="coverage-create-dialog"
      openedBy="create-button"
      title={t("admin.coverage.create.title")}
      onClose={onClose}
    >
      <FormField
        label={t("admin.coverage.field.plan")}
        htmlFor="coverage-create-plan"
        help={t("admin.coverage.field.planHint")}
      >
        <Input
          id="coverage-create-plan"
          data-testid="coverage-create-plan"
          value={plan}
          maxLength={32}
          onChange={(event) => setPlan(event.target.value.toLowerCase())}
        />
      </FormField>
      <CoverageFormFields
        idPrefix="coverage-create"
        values={form}
        onChange={(next) => setForm((prev) => ({ ...prev, ...next }))}
      />
      <CoverageErrorLine refusal={refusal} />
      <CoverageDialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={save.isPending}
        submitTestId="coverage-create-submit"
      />
    </CategoryModal>
  );
}

export default CoverageCreateDialog;
