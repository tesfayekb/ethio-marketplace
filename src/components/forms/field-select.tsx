import { SelectList, type SelectListOption } from "@/components/select-list";
import { useI18n } from "@/i18n";
import { Field } from "./field";

export type FieldSelectProps = Omit<Parameters<typeof Field>[0], "children" | "blank"> & {
  options: readonly SelectListOption[];
  value: readonly string[];
  onChange: (next: string[]) => void;
  multiple?: boolean;
  max?: number;
  placeholder?: string;
  state?: "ready" | "loading" | "failed";
  loadingLabel?: string;
  failedLabel?: string;
  statusTestId?: string;
};

/** DEC-427: data multi-choice and searchable catalogue one-choice, inside the one Field gate. */
export function FieldSelect({
  options,
  value,
  onChange,
  multiple = false,
  max,
  placeholder,
  state = "ready",
  loadingLabel,
  failedLabel,
  statusTestId,
  ...field
}: FieldSelectProps) {
  const { t } = useI18n();
  const choose = t("prim.select.choose");
  const searchLabel = t("prim.filter.search");
  const noneLabel = t("prim.filter.none");
  const maxLabel = t("prim.filter.max");
  const countLabel = t("prim.select.count");
  const unavailable = state !== "ready";
  const line = state === "loading" ? loadingLabel : state === "failed" ? failedLabel : placeholder;
  return (
    <Field {...field} blank={value.length === 0}>
      {(control) => (
        <SelectList
          id={field.id}
          testId={field.id}
          control={control}
          {...(typeof field.label === "string" ? { label: field.label } : {})}
          options={options}
          value={unavailable ? [] : value}
          onChange={onChange}
          multiple={multiple}
          max={max ?? options.length + value.length}
          placeholder={line ?? choose}
          searchLabel={searchLabel}
          noneLabel={noneLabel}
          maxLabel={maxLabel}
          countLabel={countLabel}
          disabled={unavailable}
          {...(unavailable
            ? {
                renderControl: (trigger) => (
                  <div data-testid={statusTestId} role={state === "failed" ? "alert" : "status"}>
                    {trigger}
                  </div>
                ),
              }
            : {})}
        />
      )}
    </Field>
  );
}
