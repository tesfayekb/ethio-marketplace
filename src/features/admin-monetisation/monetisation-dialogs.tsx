import { Field } from "@/components/forms/field";
import type { FormGate } from "@/components/forms/use-form-gate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { useI18n, type MessageKey } from "@/i18n";
import { refusalText, type Refusal } from "@/lib/refusal";

import { PLACEMENT_LABEL } from "./monetisation-forms";
import { MONETISATION_REFUSALS, type MonetisationRefusal } from "./monetisation-refusals";
import { PLACEMENTS } from "./monetisation-service";

/**
 * P-1b — ADMIN › MONETISATION: the pieces every write surface shares (the P-1
 * packages console's shape). Every submit runs through the page's step-up
 * `guard`; the door behind it re-checks the permission AND the step-up
 * server-side (F3), so a refusal here is a translated line for the
 * door's own code, never a silent no-op (F4). Nothing closes on failure.
 * The refusal state is `useMonetisationError`.
 */

export function MonetisationProblemLine({
  refusal,
  testid,
}: {
  refusal: MonetisationRefusal | null;
  testid: string;
}) {
  const { t, language } = useI18n();
  if (refusal === null) return null;
  return (
    <>
      <p role="alert" data-testid={testid} className="text-sm text-destructive">
        {refusal.read === undefined
          ? t(refusal.key)
          : refusalText(refusal.read, t, undefined, language)}
      </p>
      {refusal.raw === null ? null : (
        <p className="text-sm break-words text-muted-foreground" data-testid={`${testid}-reason`}>
          {t("admin.monetisation.error.reason").replace("{reason}", refusal.raw)}
        </p>
      )}
    </>
  );
}

export function MonetisationDialogActions({
  onCancel,
  onSubmit,
  busy,
  cancelTestId,
  submitTestId,
  submitLabel,
  destructive = false,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  busy: boolean;
  cancelTestId: string;
  submitTestId: string;
  submitLabel: string;
  destructive?: boolean;
}) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
      <Button
        type="button"
        variant="outline"
        size="touch"
        data-testid={cancelTestId}
        onClick={onCancel}
      >
        {t("common.cancel")}
      </Button>
      <Button
        type="button"
        size="touch"
        variant={destructive ? "destructive" : "default"}
        data-testid={submitTestId}
        disabled={busy}
        onClick={onSubmit}
      >
        {submitLabel}
      </Button>
    </div>
  );
}

/** What a control of this console hands the one Field (DEC-339, L8). */
export type FieldPart = {
  /** The door's name for the answer. */
  field: string;
  required?: boolean;
  refusal?: Refusal | null;
  gate?: FormGate;
};

/** A whole-number field as typed (the judges parse it; blank is never 0). */
export function NumberField({
  id,
  field,
  required = false,
  refusal = null,
  gate,
  labelKey,
  helpKey,
  placeholderKey,
  value,
  onChange,
  disabled = false,
}: FieldPart & {
  id: string;
  labelKey: MessageKey;
  helpKey?: MessageKey;
  /** The word a blank field stands for (a reach row's cap: "No limit"). */
  placeholderKey?: MessageKey;
  value: string;
  onChange: (next: string) => void;
  disabled?: boolean;
}) {
  const { t } = useI18n();
  return (
    <Field
      id={id}
      field={field}
      label={t(labelKey)}
      required={required}
      gate={gate}
      blank={value.trim() === ""}
      refusal={refusal}
      family={MONETISATION_REFUSALS}
      hint={
        helpKey === undefined ? undefined : (
          <p className="min-w-0 break-words text-xs text-muted-foreground">{t(helpKey)}</p>
        )
      }
    >
      {(control) => (
        <Input
          {...control}
          data-testid={id}
          inputMode="numeric"
          value={value}
          placeholder={placeholderKey === undefined ? undefined : t(placeholderKey)}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </Field>
  );
}

export function Toggle({
  id,
  field,
  labelKey,
  checked,
  onChange,
}: {
  id: string;
  field: string;
  labelKey: MessageKey;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  const { t } = useI18n();
  return (
    <Field
      id={id}
      field={field}
      label={t(labelKey)}
      required={false}
      refusal={null}
      layout="choice"
    >
      {(control) => (
        <input
          {...control}
          type="checkbox"
          className="size-5"
          data-testid={id}
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
      )}
    </Field>
  );
}

/**
 * The placement picker. With `blank`, the first choice is empty: on an override
 * it means "the level's own value" (the help text says so) and is shown as a
 * blank cell, never as a word of its own.
 */
export function PlacementSelect({
  id,
  value,
  onChange,
  blank = false,
}: {
  id: string;
  value: string;
  onChange: (next: string) => void;
  blank?: boolean;
}) {
  const { t } = useI18n();
  return (
    <Field
      id={id}
      field="placement"
      label={t("admin.monetisation.col.placement")}
      required={!blank}
      marked={false}
      refusal={null}
    >
      {(control) => (
        <NativeSelect
          {...control}
          data-testid={id}
          className="w-full"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {blank ? <option value="" /> : null}
          {PLACEMENTS.map((placement) => (
            <option key={placement} value={placement}>
              {t(PLACEMENT_LABEL[placement])}
            </option>
          ))}
        </NativeSelect>
      )}
    </Field>
  );
}

/** A yes / no / blank (inherit) picker for an override's badge. */
export function BadgeSelect({
  id,
  value,
  onChange,
}: {
  id: string;
  /** "" = the level's own value, "yes", "no". */
  value: "" | "yes" | "no";
  onChange: (next: "" | "yes" | "no") => void;
}) {
  const { t } = useI18n();
  return (
    <Field
      id={id}
      field="badge"
      label={t("admin.monetisation.col.badge")}
      required={false}
      refusal={null}
    >
      {(control) => (
        <NativeSelect
          {...control}
          data-testid={id}
          className="w-full"
          value={value}
          onChange={(event) => {
            const next = event.target.value;
            onChange(next === "yes" ? "yes" : next === "no" ? "no" : "");
          }}
        >
          <option value="" />
          <option value="yes">{t("admin.monetisation.everywhere.yes")}</option>
          <option value="no">{t("admin.monetisation.everywhere.no")}</option>
        </NativeSelect>
      )}
    </Field>
  );
}
