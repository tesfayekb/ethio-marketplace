import { useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryModal, SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n, type MessageKey } from "@/i18n";

import { countryErrorKey, UNIT_SYSTEMS, type CountryRefusal } from "./countries-service";
import { useUpsertCountry } from "./use-countries";

/**
 * LOCATIONS ERA L2b-C1 — THE COUNTRIES WRITE SURFACES (shared pieces + create).
 *
 * Every submit runs through the page's step-up `guard`; the door behind it
 * re-checks the permission AND the step-up server-side (F3), so a refusal here
 * is a translated sentence naming the door's own id, never a silent no-op (F4).
 * Nothing closes on failure. 360-first: full-width controls, ≥44px targets,
 * logical spacing only (C5).
 */

/** F4 — one refusal mapping for every countries surface (B2). */
export function useCountryError() {
  const [refusal, setRefusal] = useState<CountryRefusal | null>(null);
  const clear = () => setRefusal(null);
  const fail = (error: unknown) => {
    const abort = stepUpAbortKey(error);
    if (abort !== undefined) {
      setRefusal(abort === null ? null : { key: abort as MessageKey, raw: null });
      return;
    }
    setRefusal(countryErrorKey(error instanceof Error ? error.message : String(error ?? "")));
  };
  const render = (message: MessageKey) => setRefusal({ key: message, raw: null });
  return { refusal, clear, fail, render };
}

export function CountryErrorLine({
  refusal,
  testid = "country-dialog-error",
}: {
  refusal: CountryRefusal | null;
  testid?: string;
}) {
  const { t } = useI18n();
  if (refusal === null) return null;
  return (
    <>
      <p role="alert" data-testid={testid} className="text-sm text-destructive">
        {t(refusal.key)}
      </p>
      {refusal.raw === null ? null : (
        <p
          className="text-sm break-words text-muted-foreground"
          data-testid="country-dialog-error-reason"
        >
          {t("admin.countries.error.reason").replace("{reason}", refusal.raw)}
        </p>
      )}
    </>
  );
}

export function CountryDialogActions({
  onCancel,
  onSubmit,
  busy,
  submitTestId,
  submitLabel,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  busy: boolean;
  submitTestId: string;
  submitLabel?: string;
}) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
      <Button
        type="button"
        variant="outline"
        size="touch"
        data-testid="country-dialog-cancel"
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
        {submitLabel ?? t("common.save")}
      </Button>
    </div>
  );
}

export interface CountryFormValues {
  nameEn: string;
  unitSystem: string;
  currencyCode: string;
  displayOrder: string;
}

/** The profile fields, shared by create and the editor (B3, one definition). */
export function CountryFormFields({
  idPrefix,
  values,
  onChange,
}: {
  idPrefix: string;
  values: CountryFormValues;
  onChange: (next: Partial<CountryFormValues>) => void;
}) {
  const { t } = useI18n();
  return (
    <>
      <FormField label={t("admin.countries.field.name")} htmlFor={`${idPrefix}-name`}>
        <Input
          id={`${idPrefix}-name`}
          data-testid={`${idPrefix}-name`}
          value={values.nameEn}
          onChange={(event) => onChange({ nameEn: event.target.value })}
        />
      </FormField>
      <FormField label={t("admin.countries.field.unit")} htmlFor={`${idPrefix}-unit`}>
        <select
          id={`${idPrefix}-unit`}
          data-testid={`${idPrefix}-unit`}
          className={SELECT_CLASS}
          value={values.unitSystem}
          onChange={(event) => onChange({ unitSystem: event.target.value })}
        >
          {UNIT_SYSTEMS.map((name) => (
            <option key={name} value={name}>
              {t(`admin.countries.unit.${name}` as MessageKey)}
            </option>
          ))}
        </select>
      </FormField>
      <FormField
        label={t("admin.countries.field.currency")}
        htmlFor={`${idPrefix}-currency`}
        help={t("admin.countries.field.currencyHint")}
      >
        <Input
          id={`${idPrefix}-currency`}
          data-testid={`${idPrefix}-currency`}
          value={values.currencyCode}
          onChange={(event) => onChange({ currencyCode: event.target.value.toUpperCase() })}
        />
      </FormField>
      <FormField label={t("admin.countries.field.order")} htmlFor={`${idPrefix}-order`}>
        <Input
          id={`${idPrefix}-order`}
          data-testid={`${idPrefix}-order`}
          inputMode="numeric"
          value={values.displayOrder}
          onChange={(event) => onChange({ displayOrder: event.target.value })}
        />
      </FormField>
    </>
  );
}

export function numberOrZero(raw: string): number {
  const parsed = Number(raw.trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * ADD A COUNTRY. It is born CLOSED by the door's own INSERT, and its anchor
 * place is born with it (the L2b-M trigger), so the dialog says so rather than
 * pretending the market is live.
 */
export function CountryCreateDialog({ guard, onClose }: { guard: GuardFn; onClose: () => void }) {
  const { t } = useI18n();
  const upsert = useUpsertCountry();
  const { refusal, clear, fail, render } = useCountryError();
  const [code, setCode] = useState("");
  const [created, setCreated] = useState(false);
  const [form, setForm] = useState<CountryFormValues>({
    nameEn: "",
    unitSystem: "metric",
    currencyCode: "",
    displayOrder: "0",
  });

  const submit = () => {
    clear();
    if (!/^[A-Za-z]{2}$/.test(code.trim())) {
      render("admin.countries.error.badCountryCode");
      return;
    }
    if (form.nameEn.trim() === "") {
      render("admin.countries.error.nameRequired");
      return;
    }
    void guard(async () => {
      try {
        await upsert.mutateAsync({
          code: code.trim().toUpperCase(),
          nameEn: form.nameEn.trim(),
          unitSystem: form.unitSystem,
          currencyCode: form.currencyCode.trim() === "" ? null : form.currencyCode.trim(),
          displayOrder: numberOrZero(form.displayOrder),
        });
        setCreated(true);
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="country-create-dialog"
      openedBy="create-button"
      title={t("admin.countries.create.title")}
      onClose={onClose}
    >
      {created ? (
        <>
          <p
            role="status"
            data-testid="country-create-closed"
            className="rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary"
          >
            {t("admin.countries.create.bornClosed")}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button type="button" size="touch" data-testid="country-create-close" onClick={onClose}>
              {t("common.close")}
            </Button>
          </div>
        </>
      ) : (
        <>
          <FormField
            label={t("admin.countries.create.code")}
            htmlFor="country-create-code"
            help={t("admin.countries.create.codeHint")}
          >
            <Input
              id="country-create-code"
              data-testid="country-create-code"
              value={code}
              maxLength={2}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
            />
          </FormField>
          <CountryFormFields
            idPrefix="country-create"
            values={form}
            onChange={(next) => setForm((prev) => ({ ...prev, ...next }))}
          />
          <CountryErrorLine refusal={refusal} />
          <CountryDialogActions
            onCancel={onClose}
            onSubmit={submit}
            busy={upsert.isPending}
            submitTestId="country-create-submit"
          />
        </>
      )}
    </CategoryModal>
  );
}
