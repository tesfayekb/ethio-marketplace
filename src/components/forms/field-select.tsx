import { FailureNotice } from "@/components/shell/failure-notice";
import { SelectList, type SelectListOption } from "@/components/select-list";
import { useI18n } from "@/i18n";
import type { ReactNode } from "react";
import { Field } from "./field";

export type FieldSelectProps = Omit<Parameters<typeof Field>[0], "children" | "blank"> & {
  options: readonly SelectListOption[];
  value: readonly string[];
  onChange: (next: string[]) => void;
  multiple?: boolean;
  max?: number;
  placeholder?: string;
  /** INC-1279 — the choices' own read; absent means ready. A failed read draws the one notice. */
  read?: { isLoading: boolean; error: unknown; onRetry: () => void };
  /** What failed, in the caller's words, drawn before the notice's reason. */
  subject?: ReactNode;
  loadingLabel?: string;
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
  read,
  subject,
  loadingLabel,
  statusTestId,
  ...field
}: FieldSelectProps) {
  const { t } = useI18n();
  const choose = t("prim.select.choose");
  const searchLabel = t("prim.filter.search");
  const noneLabel = t("prim.filter.none");
  const maxLabel = t("prim.filter.max");
  const countLabel = t("prim.select.count");
  const failed = read !== undefined && read.error != null;
  const loading = !failed && read !== undefined && read.isLoading;
  const unavailable = failed || loading;
  const line = loading ? loadingLabel : failed ? undefined : placeholder;
  return (
    <Field {...field} blank={value.length === 0}>
      {(control) => (
        <>
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
            {...(loading
              ? {
                  renderControl: (trigger) => (
                    <div data-testid={statusTestId} role="status">
                      {trigger}
                    </div>
                  ),
                }
              : {})}
          />
          {failed ? (
            <FailureNotice
              size="line"
              error={read.error}
              onRetry={read.onRetry}
              subject={subject}
              testid={statusTestId ?? `${field.id}-error`}
            />
          ) : null}
        </>
      )}
    </Field>
  );
}
