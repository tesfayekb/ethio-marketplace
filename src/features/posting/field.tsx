import type { ComponentProps } from "react";

import { Field as FormField } from "@/components/forms/field";
import { RequiredMark as FormRequiredMark } from "@/components/forms/required-mark";
import { useI18n } from "@/i18n";

import { DRAFT_REFUSALS, fill } from "./refusal-text";
import { STEPS, type Refusal } from "./types";
import { focusField, stepOfField, summaryLabel, summaryRefusals } from "./field-refusals";

/**
 * DEC-339 — the posting wizard's names for the one Field
 * (`src/components/forms/field.tsx`): the draft door's refusal words, and the
 * test ids the posting specs read (`post-field`, `post-field-refusal`,
 * `post-required-mark`). The Field keeps the three promises; the summary below
 * keeps the third for the wizard: NOTHING IS BLOCKED IN SILENCE.
 */
export function RequiredMark() {
  return <FormRequiredMark testId="post-required-mark" />;
}

export function Field({
  family = DRAFT_REFUSALS,
  refusalTestId = "post-field-refusal",
  ...props
}: Omit<ComponentProps<typeof FormField>, "testId" | "markTestId">) {
  return (
    <FormField
      {...props}
      family={family}
      testId="post-field"
      refusalTestId={refusalTestId}
      markTestId="post-required-mark"
    />
  );
}

/**
 * THE RED SUMMARY, above Back/Next. It lists the refused fields BY LABEL and each
 * name jumps to its control. It renders only when a refusal actually exists — it
 * is never a pre-emptive warning.
 *
 * INC-231 — BY LABEL, AND BY STEP. A field of THIS step is a label that focuses
 * its own control; a field of ANOTHER step reads "Fix <Step name>: <label>" and
 * navigates there, because a name with no control beside it is a dead end.
 */
export function RefusalSummary({
  refusals,
  step,
  specFields = [],
  priceFields = [],
  fieldNames = {},
  onGoTo,
}: {
  refusals: Refusal[];
  /** The step on screen; entries belonging elsewhere are labelled with theirs. */
  step: number;
  /** The detail keys step 3 renders, so an attribute refusal finds its step. */
  specFields?: readonly string[];
  /** DEC-109 — the detail keys the price page renders. */
  priceFields?: readonly string[];
  /** INC-455 — each attribute key's drawn name, in the screen's language. */
  fieldNames?: Readonly<Record<string, string>>;
  onGoTo?: (step: number) => void;
}) {
  const { t } = useI18n();
  const shown = summaryRefusals(refusals);
  if (shown.length === 0) return null;
  const named = shown.map((refusal) => {
    const owner = stepOfField(refusal.field, specFields, priceFields);
    const label = summaryLabel(refusal.field, t, fieldNames);
    return { field: refusal.field, label, owner };
  });
  return (
    <div
      className="rounded-md border border-destructive bg-destructive/5 p-3"
      data-testid="post-refusal-summary"
      role="alert"
    >
      <p className="text-sm font-medium text-destructive">{t("post.refusalSummary")}</p>
      <ul className="mt-1 flex flex-wrap gap-2">
        {named.map((entry) => {
          const { owner } = entry;
          const elsewhere = owner !== null && owner !== step;
          const stepName =
            owner === null ? "" : t(STEPS[owner - 1]?.nameKey ?? "post.step.category");
          return (
            <li key={entry.field}>
              <button
                type="button"
                data-testid="post-refusal-summary-field"
                data-field={entry.field}
                data-step={owner ?? ""}
                className="min-h-11 text-sm font-medium text-destructive underline"
                onClick={() => {
                  if (elsewhere && onGoTo !== undefined) {
                    onGoTo(owner);
                    return;
                  }
                  focusField(entry.field);
                }}
              >
                {elsewhere
                  ? fill(t("post.refusalSummary.elsewhere"), {
                      step: stepName,
                      label: entry.label,
                    })
                  : entry.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
