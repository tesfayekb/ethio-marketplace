import { useState } from "react";

import { DateField } from "@/components/shell/date-field";
import { todayIso } from "@/components/shell/date-day";
import { FormField } from "@/components/shell/form-section";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";

import { PackagesDialogActions, PackagesErrorLine } from "./packages-dialogs";
import { usePackagesError } from "./use-packages-error";
import { dayEnd } from "./packages-forms";
import type { PriceRow } from "./packages-service";
import { useEndPrice } from "./use-packages";

/**
 * P-1 (D280) — END A PRICE: the row keeps its history and gains a `valid_to`.
 * Today (the default) ends it now; a later day ends it at the end of that day.
 * The door refuses a row already ended, an end before its start, and an end
 * that would overlap another window of the same scope. A destructive verb (red).
 */
export function PriceEndDialog({
  row,
  guard,
  openedBy,
  onClose,
}: {
  row: PriceRow;
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const end = useEndPrice();
  const { refusal, clear, fail } = usePackagesError();
  const today = todayIso();
  const [day, setDay] = useState(today);
  const prefix = "packages-price-end";

  const submit = () => {
    clear();
    // Today = now (the door's default); a later day = the end of that day.
    const validTo = day === "" || day === today ? null : dayEnd(day);
    void guard(async () => {
      try {
        await end.mutateAsync({ id: row.id, validTo });
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
      title={t("admin.packages.prices.end.title")}
      onClose={onClose}
    >
      <p className="text-sm text-muted-foreground">{t("admin.packages.prices.end.body")}</p>
      <FormField label={t("admin.packages.prices.field.to")} htmlFor={`${prefix}-to`}>
        <DateField
          id={`${prefix}-to`}
          testid={`${prefix}-to`}
          value={day}
          min={today}
          clearable={false}
          onChange={setDay}
        />
      </FormField>
      <PackagesErrorLine refusal={refusal} testid={`${prefix}-error`} />
      <PackagesDialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={end.isPending}
        cancelTestId={`${prefix}-cancel`}
        submitTestId={`${prefix}-confirm`}
        submitLabel={t("admin.packages.prices.action.end")}
        destructive
      />
    </CategoryModal>
  );
}

export default PriceEndDialog;
