import { controlClass } from "@/components/forms/control-class";
import { Field } from "@/components/forms/field";
import type { FormGate } from "@/components/forms/use-form-gate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { useI18n, type MessageKey } from "@/i18n";
import type { Refusal } from "@/lib/refusal";

import { UNIT_SYSTEMS } from "./countries-service";
import { COUNTRY_REFUSALS } from "./country-refusals";

/**
 * LOCATIONS ERA L2b-C1 — THE COUNTRIES WRITE SURFACE SHARED PIECES.
 *
 * Every submit runs through the page's step-up `guard`; the door behind it
 * re-checks the permission AND the step-up server-side (F3), so a refusal here
 * is a translated sentence naming the door's own id, never a silent no-op (F4).
 * Nothing closes on failure. 360-first: full-width controls, ≥44px targets,
 * logical spacing only (C5).
 */

/** The one line a markets dialog draws for a refusal it read (F4); nothing when there is none. */
export function CountryDialogAlert({
  message,
  testid = "country-dialog-error",
}: {
  message: string | null;
  testid?: string;
}) {
  if (message === null) return null;
  return (
    <p role="alert" data-testid={testid} className="text-sm text-destructive">
      {message}
    </p>
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
    <>
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
    </>
  );
}

export interface CountryFormValues {
  nameEn: string;
  unitSystem: string;
  currencyCode: string;
  displayOrder: string;
}

/**
 * The editor's profile fields (B3, one definition), each in the one Field (DEC-339) at the dialog
 * density. The name reports its blank to the editor's gate; the unit always holds a value, so it
 * carries no mark; the currency is optional; the order's parse refusal is drawn under it.
 */
export function CountryFormFields({
  idPrefix,
  values,
  onChange,
  gate,
  refusals = {},
}: {
  idPrefix: string;
  values: CountryFormValues;
  onChange: (next: Partial<CountryFormValues>) => void;
  gate?: FormGate;
  /** Each field's refusal (the gate's mark or the parser's), by the field's name. */
  refusals?: Partial<Record<keyof CountryFormValues, Refusal>>;
}) {
  const { t } = useI18n();
  const nameRefusal = refusals.nameEn ?? null;
  const orderRefusal = refusals.displayOrder ?? null;
  return (
    <>
      <Field
        id={`${idPrefix}-name`}
        field="nameEn"
        label={t("admin.countries.field.name")}
        required
        refusal={nameRefusal}
        family={COUNTRY_REFUSALS}
        gate={gate}
        blank={values.nameEn.trim() === ""}
      >
        {(control) => (
          <Input
            {...control}
            data-testid={`${idPrefix}-name`}
            className={controlClass(nameRefusal !== null, false, "dialog")}
            value={values.nameEn}
            onChange={(event) => onChange({ nameEn: event.target.value })}
          />
        )}
      </Field>
      <Field
        id={`${idPrefix}-unit`}
        field="unitSystem"
        label={t("admin.countries.field.unit")}
        required
        marked={false}
        refusal={null}
      >
        {(control) => (
          <NativeSelect
            {...control}
            data-testid={`${idPrefix}-unit`}
            className="w-full"
            value={values.unitSystem}
            onChange={(event) => onChange({ unitSystem: event.target.value })}
          >
            {UNIT_SYSTEMS.map((name) => (
              <option key={name} value={name}>
                {t(`admin.countries.unit.${name}` as MessageKey)}
              </option>
            ))}
          </NativeSelect>
        )}
      </Field>
      <Field
        id={`${idPrefix}-currency`}
        field="currencyCode"
        label={t("admin.countries.field.currency")}
        required={false}
        hint={
          <p className="text-xs text-muted-foreground">{t("admin.countries.field.currencyHint")}</p>
        }
        refusal={null}
      >
        {(control) => (
          <Input
            {...control}
            data-testid={`${idPrefix}-currency`}
            className={controlClass(false, false, "dialog")}
            value={values.currencyCode}
            onChange={(event) => onChange({ currencyCode: event.target.value.toUpperCase() })}
          />
        )}
      </Field>
      <Field
        id={`${idPrefix}-order`}
        field="displayOrder"
        label={t("admin.countries.field.order")}
        required
        refusal={orderRefusal}
        family={COUNTRY_REFUSALS}
      >
        {(control) => (
          <Input
            {...control}
            data-testid={`${idPrefix}-order`}
            inputMode="numeric"
            className={controlClass(orderRefusal !== null, false, "dialog")}
            value={values.displayOrder}
            onChange={(event) => onChange({ displayOrder: event.target.value })}
          />
        )}
      </Field>
    </>
  );
}
