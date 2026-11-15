import { useState, type ReactNode } from "react";

import { useFormGate } from "@/components/forms/use-form-gate";
import { TipBadge } from "@/components/shell/tip-badge";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import { numberOf, parseNumber } from "@/lib/parse-input";
import type { Refusal } from "@/lib/refusal";

import {
  CountryDialogActions,
  CountryDialogAlert,
  CountryFormFields,
  type CountryFormValues,
} from "./country-dialogs";
import { useCountryRefusal } from "./country-refusals";
import type { CountryRow } from "./countries-service";
import { useUpsertCountry } from "./use-countries";

/**
 * L2b-C1 — THE COUNTRY EDITOR IS THE ROW'S ONE SURFACE (the categories
 * convention, CT-8). The roster carries a single 44px pencil per row; the
 * profile fields, the save and the verb bar the page hands in all live here, so
 * nothing is rendered inside a table cell.
 *
 * INC-188 — the save round-trips EVERY stored field this surface holds, so it
 * never drops what the operator did not touch. Names in other languages stay in
 * Translations → Data (D3). The door re-checks permission and step-up (F3).
 */
export function CountryEditorDialog({
  row,
  guard,
  verbBar,
  openedBy,
  onClose,
}: {
  row: CountryRow;
  guard: GuardFn;
  verbBar: ReactNode;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const upsert = useUpsertCountry();
  const { message, clear, fail } = useCountryRefusal();
  const gate = useFormGate();
  const [orderRefusal, setOrderRefusal] = useState<Refusal | null>(null);
  const [form, setForm] = useState<CountryFormValues>(() => ({
    nameEn: row.nameEn,
    unitSystem: row.unitSystem,
    currencyCode: row.currencyCode ?? "",
    displayOrder: String(row.displayOrder),
  }));

  const submit = () => {
    clear();
    setOrderRefusal(null);
    // DEC-339: the gate first — a blank name is marked under its Field and nothing is sent.
    if (!gate.try()) return;
    // The one parser: a blank or unreadable order is refused in words, never sent as 0.
    const order = numberOf(parseNumber(form.displayOrder, { integer: true }));
    if (order === null) {
      setOrderRefusal({ field: "displayOrder", reason: "badType" });
      return;
    }
    void guard(async () => {
      try {
        await upsert.mutateAsync({
          code: row.code,
          nameEn: form.nameEn.trim(),
          unitSystem: form.unitSystem,
          currencyCode: form.currencyCode.trim() === "" ? null : form.currencyCode.trim(),
          displayOrder: order,
        });
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="country-editor"
      openedBy={openedBy}
      title={t("admin.countries.edit.title")}
      onClose={onClose}
    >
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <span className="min-w-0 break-words text-sm" data-testid="country-editor-code">
          {`${row.nameEn} · ${row.code}`}
        </span>
        <TipBadge
          variant={row.isActive ? "secondary" : "outline"}
          label={t(row.isActive ? "admin.countries.badge.open" : "admin.countries.badge.closed")}
          tip={t(row.isActive ? "admin.countries.tip.open" : "admin.countries.tip.closed")}
          testid="country-editor-status"
        />
      </div>

      <CountryFormFields
        idPrefix="country-editor"
        values={form}
        onChange={(next) => setForm((prev) => ({ ...prev, ...next }))}
        gate={gate}
        refusals={{
          nameEn: gate.marks.find((mark) => mark.field === "nameEn"),
          displayOrder: orderRefusal ?? undefined,
        }}
      />
      <p className="text-sm text-muted-foreground">
        <a className="underline" data-testid="country-edit-translations" href="/admin/translations">
          {t("admin.countries.edit.translationsLink")}
        </a>
      </p>
      <CountryDialogAlert message={message} />
      <CountryDialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={upsert.isPending}
        submitTestId="country-editor-save"
      />

      {verbBar}
    </CategoryModal>
  );
}

export default CountryEditorDialog;
