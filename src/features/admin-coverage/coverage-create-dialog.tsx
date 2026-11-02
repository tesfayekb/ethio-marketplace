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
  useCoverageError,
} from "./coverage-dialogs";
import { coverageFormInput, type CoverageFormValues } from "./coverage-forms";
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
  // P-1 — the label key follows the plan's name (`plan.<name>`) until it is typed.
  const [labelTyped, setLabelTyped] = useState(false);
  const [form, setForm] = useState<CoverageFormValues>({
    maxCities: "1",
    maxRegions: "1",
    maxCountries: "1",
    maxPhotos: "10",
    allowEverywhere: false,
    defaultDays: "30",
    maxActiveAds: "",
    adsUnlimited: true,
    labelKey: "",
  });
  const changePlan = (value: string) => {
    const next = value.toLowerCase();
    setPlan(next);
    if (!labelTyped) setForm((prev) => ({ ...prev, labelKey: `plan.${next.trim()}` }));
  };

  const submit = () => {
    clear();
    if (!COVERAGE_PLAN_PATTERN.test(plan.trim())) {
      render("admin.coverage.error.badPlan");
      return;
    }
    const judged = coverageFormInput(form);
    if (!judged.ok) {
      render(judged.key);
      return;
    }
    void guard(async () => {
      try {
        await save.mutateAsync({ plan: plan.trim(), ...judged.input });
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
          onChange={(event) => changePlan(event.target.value)}
        />
      </FormField>
      <CoverageFormFields
        idPrefix="coverage-create"
        values={form}
        onChange={(next) => {
          if (next.labelKey !== undefined) setLabelTyped(true);
          setForm((prev) => ({ ...prev, ...next }));
        }}
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
