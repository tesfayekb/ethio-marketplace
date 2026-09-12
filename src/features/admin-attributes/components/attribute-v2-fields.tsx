import { FormField } from "@/components/shell/form-section";
import { Input } from "@/components/ui/input";
import { SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { useI18n, type MessageKey } from "@/i18n";

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
  min: string;
  max: string;
  /** "" | "0" | "1" | "2" | "3" — a string because the control is a select. */
  decimals: string;
  /** "" | "plain" | "year" */
  format: string;
}

export const EMPTY_NUMBER_FIELDS: NumberFieldsValue = {
  unit: "",
  min: "",
  max: "",
  decimals: "",
  format: "",
};

const DECIMALS_CHOICES = ["0", "1", "2", "3"] as const;
const FORMAT_CHOICES = ["plain", "year"] as const;

export function AttributeNumberFields({
  value,
  onChange,
}: {
  value: NumberFieldsValue;
  onChange: (next: NumberFieldsValue) => void;
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
      <FormField
        label={t("admin.attributes.field.unit")}
        htmlFor="attribute-unit"
        help={t("admin.attributes.field.unitHelp")}
      >
        <Input
          id="attribute-unit"
          data-testid="attribute-unit"
          maxLength={16}
          value={value.unit}
          onChange={(event) => patch({ unit: event.target.value })}
        />
      </FormField>
      <FormField
        label={t("admin.attributes.field.min")}
        htmlFor="attribute-min"
        help={t("admin.attributes.field.boundHelp")}
      >
        <Input
          id="attribute-min"
          data-testid="attribute-min"
          value={value.min}
          onChange={(event) => patch({ min: event.target.value })}
        />
      </FormField>
      <FormField
        label={t("admin.attributes.field.max")}
        htmlFor="attribute-max"
        help={t("admin.attributes.field.boundHelp")}
      >
        <Input
          id="attribute-max"
          data-testid="attribute-max"
          value={value.max}
          onChange={(event) => patch({ max: event.target.value })}
        />
      </FormField>
      <FormField
        label={t("admin.attributes.field.format")}
        htmlFor="attribute-format"
        help={t("admin.attributes.field.formatHelp")}
      >
        <select
          id="attribute-format"
          data-testid="attribute-format"
          className={SELECT_CLASS}
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
        </select>
      </FormField>
      <FormField
        label={t("admin.attributes.field.decimals")}
        htmlFor="attribute-decimals"
        help={yearFormat ? t("admin.attributes.field.decimalsYear") : undefined}
      >
        <select
          id="attribute-decimals"
          data-testid="attribute-decimals"
          className={SELECT_CLASS}
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
        </select>
      </FormField>
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

export const EMPTY_TEXT_FIELDS: TextFieldsValue = {
  preset: "",
  presetN: "",
  presetA: "",
  presetB: "",
  maxLength: "",
};

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

/** The token the door stores: `digits:N` · `vin` · `plate-et` · `alnum:A-B` · `free:N`. */
export function presetToken(value: TextFieldsValue): string | null {
  const arg = (raw: string) => raw.trim();
  switch (value.preset) {
    case "digits":
      return arg(value.presetN) === "" ? null : `digits:${arg(value.presetN)}`;
    case "free":
      return arg(value.presetN) === "" ? null : `free:${arg(value.presetN)}`;
    case "alnum":
      return arg(value.presetA) === "" || arg(value.presetB) === ""
        ? null
        : `alnum:${arg(value.presetA)}-${arg(value.presetB)}`;
    case "vin":
    case "plate-et":
      return value.preset;
    default:
      return null;
  }
}

/** The inverse: a stored token pre-fills the builder when a row is reopened. */
export function parsePreset(raw: string | null): Omit<TextFieldsValue, "maxLength"> {
  const empty = { preset: "", presetN: "", presetA: "", presetB: "" };
  if (raw === null || raw.trim() === "") return empty;
  const token = raw.trim();
  if (token === "vin" || token === "plate-et") return { ...empty, preset: token };
  const [kind, arg = ""] = token.split(":");
  if (kind === "digits" || kind === "free") return { ...empty, preset: kind, presetN: arg };
  if (kind === "alnum") {
    const [a = "", b = ""] = arg.split("-");
    return { ...empty, preset: "alnum", presetA: a, presetB: b };
  }
  return empty;
}

export function AttributeTextFields({
  value,
  onChange,
}: {
  value: TextFieldsValue;
  onChange: (next: TextFieldsValue) => void;
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
      <FormField
        label={t("admin.attributes.field.preset")}
        htmlFor="attribute-preset"
        help={t("admin.attributes.field.presetHelp")}
      >
        <select
          id="attribute-preset"
          data-testid="attribute-preset"
          className={SELECT_CLASS}
          value={value.preset}
          onChange={(event) =>
            patch({ preset: event.target.value, presetN: "", presetA: "", presetB: "" })
          }
        >
          <option value="">{t("admin.attributes.preset.none")}</option>
          {PRESET_CHOICES.map((choice) => (
            <option key={choice} value={choice}>
              {t(`admin.attributes.preset.${PRESET_LABEL_KEY[choice]}` as MessageKey)}
            </option>
          ))}
        </select>
      </FormField>
      {takesN ? (
        <FormField label={t("admin.attributes.field.presetN")} htmlFor="attribute-preset-n">
          <Input
            id="attribute-preset-n"
            data-testid="attribute-preset-n"
            inputMode="numeric"
            value={value.presetN}
            onChange={(event) => patch({ presetN: event.target.value })}
          />
        </FormField>
      ) : null}
      {takesRange ? (
        <>
          <FormField label={t("admin.attributes.field.presetA")} htmlFor="attribute-preset-a">
            <Input
              id="attribute-preset-a"
              data-testid="attribute-preset-a"
              inputMode="numeric"
              value={value.presetA}
              onChange={(event) => patch({ presetA: event.target.value })}
            />
          </FormField>
          <FormField label={t("admin.attributes.field.presetB")} htmlFor="attribute-preset-b">
            <Input
              id="attribute-preset-b"
              data-testid="attribute-preset-b"
              inputMode="numeric"
              value={value.presetB}
              onChange={(event) => patch({ presetB: event.target.value })}
            />
          </FormField>
        </>
      ) : null}
      <FormField
        label={t("admin.attributes.field.maxLength")}
        htmlFor="attribute-max-length"
        help={t("admin.attributes.field.maxLengthHelp")}
      >
        <Input
          id="attribute-max-length"
          data-testid="attribute-max-length"
          inputMode="numeric"
          value={value.maxLength}
          onChange={(event) => patch({ maxLength: event.target.value })}
        />
      </FormField>
    </div>
  );
}
