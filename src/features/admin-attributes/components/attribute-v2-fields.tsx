import { controlClass } from "@/components/forms/control-class";
import { Field } from "@/components/forms/field";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { useI18n, type MessageKey } from "@/i18n";
import { ownValue } from "@/lib/own-key";
import type { Refusal } from "@/lib/refusal";

import { ATTRIBUTE_REFUSALS } from "../attribute-refusals";

/**
 * DEC-050 L3a — THE v2 FIELD GROUPS.
 *
 * B4 keeps these out of `attribute-dialogs.tsx` (already 843 lines). The groups
 * mirror the door's CHECK shapes for UX only: `admin_upsert_attribute` remains
 * the authority (F3), so nothing here refuses a value the door would accept.
 */

/** The door's cap on either help text (L1: `help_text_en` / `help_text_am`). */
export const HELP_TEXT_MAX = 240;

/* --------------------------------- number --------------------------------- */

export interface NumberFieldsValue {
  unit: string;
  /** Bundle 5 C6 — the Amharic unit; "" means the English one prints. */
  unitAm: string;
  min: string;
  max: string;
  /** "" | "0" | "1" | "2" | "3" — a string because the control is a select. */
  decimals: string;
  /** "" | "plain" | "year" */
  format: string;
}

/** A Field's hint line, as the old field drew it. */
function Hint({ children }: { children: string }) {
  return <p className="min-w-0 break-words text-xs text-muted-foreground">{children}</p>;
}

const DECIMALS_CHOICES = ["0", "1", "2", "3"] as const;
const FORMAT_CHOICES = ["plain", "year"] as const;

export function AttributeNumberFields({
  value,
  onChange,
  decimalsRefusal = null,
}: {
  value: NumberFieldsValue;
  onChange: (next: NumberFieldsValue) => void;
  /** DEC-339 — the parser's refusal of the decimals answer, under its Field. */
  decimalsRefusal?: Refusal | null;
}) {
  const { t } = useI18n();
  const patch = (part: Partial<NumberFieldsValue>) => onChange({ ...value, ...part });
  /** L1 — `format = 'year'` forces `decimals = 0`; the control says so. */
  const yearFormat = value.format === "year";

  return (
    <div className="min-w-0 space-y-3" data-testid="attribute-number-group">
      <p className="text-sm font-semibold text-foreground">
        {t("admin.attributes.field.numberGroup")}
      </p>
      <Field
        id="attribute-unit"
        label={t("admin.attributes.field.unit")}
        required={false}
        hint={<Hint>{t("admin.attributes.field.unitHelp")}</Hint>}
        refusal={null}
        family={ATTRIBUTE_REFUSALS}
      >
        {(control) => (
          <Input
            {...control}
            className={controlClass(false, false, "dialog")}
            data-testid="attribute-unit"
            maxLength={16}
            value={value.unit}
            onChange={(event) => patch({ unit: event.target.value })}
          />
        )}
      </Field>
      <Field
        id="attribute-unit-am"
        label={t("admin.attributes.field.unitAm")}
        required={false}
        hint={<Hint>{t("admin.attributes.field.unitAmHelp")}</Hint>}
        refusal={null}
        family={ATTRIBUTE_REFUSALS}
      >
        {(control) => (
          <Input
            {...control}
            className={controlClass(false, false, "dialog")}
            data-testid="attribute-unit-am"
            lang="am"
            maxLength={16}
            value={value.unitAm}
            onChange={(event) => patch({ unitAm: event.target.value })}
          />
        )}
      </Field>
      <Field
        id="attribute-min"
        label={t("admin.attributes.field.min")}
        required={false}
        hint={<Hint>{t("admin.attributes.field.boundHelp")}</Hint>}
        refusal={null}
        family={ATTRIBUTE_REFUSALS}
      >
        {(control) => (
          <Input
            {...control}
            className={controlClass(false, false, "dialog")}
            data-testid="attribute-min"
            value={value.min}
            onChange={(event) => patch({ min: event.target.value })}
          />
        )}
      </Field>
      <Field
        id="attribute-max"
        label={t("admin.attributes.field.max")}
        required={false}
        hint={<Hint>{t("admin.attributes.field.boundHelp")}</Hint>}
        refusal={null}
        family={ATTRIBUTE_REFUSALS}
      >
        {(control) => (
          <Input
            {...control}
            className={controlClass(false, false, "dialog")}
            data-testid="attribute-max"
            value={value.max}
            onChange={(event) => patch({ max: event.target.value })}
          />
        )}
      </Field>
      <Field
        id="attribute-format"
        label={t("admin.attributes.field.format")}
        required={false}
        hint={<Hint>{t("admin.attributes.field.formatHelp")}</Hint>}
        refusal={null}
        family={ATTRIBUTE_REFUSALS}
      >
        {(control) => (
          <NativeSelect
            {...control}
            data-testid="attribute-format"
            className="w-full"
            value={value.format}
            onChange={(event) => {
              const format = event.target.value;
              patch(format === "year" ? { format, decimals: "0" } : { format });
            }}
          >
            <option value="">{t("admin.attributes.format.none")}</option>
            {FORMAT_CHOICES.map((choice) => (
              <option key={choice} value={choice}>
                {t(`admin.attributes.format.${choice}` as MessageKey)}
              </option>
            ))}
          </NativeSelect>
        )}
      </Field>
      <Field
        id="attribute-decimals"
        field="decimals"
        label={t("admin.attributes.field.decimals")}
        required={false}
        hint={yearFormat ? <Hint>{t("admin.attributes.field.decimalsYear")}</Hint> : undefined}
        refusal={decimalsRefusal}
        family={ATTRIBUTE_REFUSALS}
      >
        {(control) => (
          <NativeSelect
            {...control}
            data-testid="attribute-decimals"
            className="w-full"
            disabled={yearFormat}
            value={yearFormat ? "0" : value.decimals}
            onChange={(event) => patch({ decimals: event.target.value })}
          >
            <option value="">{t("admin.attributes.decimals.none")}</option>
            {DECIMALS_CHOICES.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </NativeSelect>
        )}
      </Field>
    </div>
  );
}

/* ---------------------------------- text ---------------------------------- */

export interface TextFieldsValue {
  /** "" | "digits" | "vin" | "plate-et" | "alnum" | "free" */
  preset: string;
  presetN: string;
  presetA: string;
  presetB: string;
  maxLength: string;
}

/** L1's allowlist, in the order the operator reads it. */
const PRESET_CHOICES = ["digits", "vin", "plate-et", "alnum", "free"] as const;
/** plate-et is not a legal key segment; the label key spells it out. */
const PRESET_LABEL_KEY: Record<string, string> = {
  digits: "digits",
  vin: "vin",
  "plate-et": "plateEt",
  alnum: "alnum",
  free: "free",
};

export function AttributeTextFields({
  value,
  onChange,
  maxLengthRefusal = null,
}: {
  value: TextFieldsValue;
  onChange: (next: TextFieldsValue) => void;
  /** DEC-339 — the parser's refusal of the longest-length answer, under its Field. */
  maxLengthRefusal?: Refusal | null;
}) {
  const { t } = useI18n();
  const patch = (part: Partial<TextFieldsValue>) => onChange({ ...value, ...part });
  const takesN = value.preset === "digits" || value.preset === "free";
  const takesRange = value.preset === "alnum";

  return (
    <div className="min-w-0 space-y-3" data-testid="attribute-text-group">
      <p className="text-sm font-semibold text-foreground">
        {t("admin.attributes.field.textGroup")}
      </p>
      <Field
        id="attribute-preset"
        label={t("admin.attributes.field.preset")}
        required={false}
        hint={<Hint>{t("admin.attributes.field.presetHelp")}</Hint>}
        refusal={null}
        family={ATTRIBUTE_REFUSALS}
      >
        {(control) => (
          <NativeSelect
            {...control}
            data-testid="attribute-preset"
            className="w-full"
            value={value.preset}
            onChange={(event) =>
              patch({ preset: event.target.value, presetN: "", presetA: "", presetB: "" })
            }
          >
            <option value="">{t("admin.attributes.preset.none")}</option>
            {PRESET_CHOICES.map((choice) => (
              <option key={choice} value={choice}>
                {t(`admin.attributes.preset.${ownValue(PRESET_LABEL_KEY, choice)}` as MessageKey)}
              </option>
            ))}
          </NativeSelect>
        )}
      </Field>
      {takesN ? (
        <Field
          id="attribute-preset-n"
          label={t("admin.attributes.field.presetN")}
          required={false}
          refusal={null}
          family={ATTRIBUTE_REFUSALS}
        >
          {(control) => (
            <Input
              {...control}
              className={controlClass(false, false, "dialog")}
              data-testid="attribute-preset-n"
              inputMode="numeric"
              value={value.presetN}
              onChange={(event) => patch({ presetN: event.target.value })}
            />
          )}
        </Field>
      ) : null}
      {takesRange ? (
        <>
          <Field
            id="attribute-preset-a"
            label={t("admin.attributes.field.presetA")}
            required={false}
            refusal={null}
            family={ATTRIBUTE_REFUSALS}
          >
            {(control) => (
              <Input
                {...control}
                className={controlClass(false, false, "dialog")}
                data-testid="attribute-preset-a"
                inputMode="numeric"
                value={value.presetA}
                onChange={(event) => patch({ presetA: event.target.value })}
              />
            )}
          </Field>
          <Field
            id="attribute-preset-b"
            label={t("admin.attributes.field.presetB")}
            required={false}
            refusal={null}
            family={ATTRIBUTE_REFUSALS}
          >
            {(control) => (
              <Input
                {...control}
                className={controlClass(false, false, "dialog")}
                data-testid="attribute-preset-b"
                inputMode="numeric"
                value={value.presetB}
                onChange={(event) => patch({ presetB: event.target.value })}
              />
            )}
          </Field>
        </>
      ) : null}
      <Field
        id="attribute-max-length"
        field="maxLength"
        label={t("admin.attributes.field.maxLength")}
        required={false}
        hint={<Hint>{t("admin.attributes.field.maxLengthHelp")}</Hint>}
        refusal={maxLengthRefusal}
        family={ATTRIBUTE_REFUSALS}
      >
        {(control) => (
          <Input
            {...control}
            className={controlClass(maxLengthRefusal !== null, false, "dialog")}
            data-testid="attribute-max-length"
            inputMode="numeric"
            value={value.maxLength}
            onChange={(event) => patch({ maxLength: event.target.value })}
          />
        )}
      </Field>
    </div>
  );
}
