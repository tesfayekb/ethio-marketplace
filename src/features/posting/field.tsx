import type { ReactNode } from "react";

import { useI18n } from "@/i18n";

import { draftRefusalKey, fill } from "./refusal-text";
import { STEPS, type Refusal } from "./types";
import { focusField, stepOfField, summaryLabel, summaryRefusals } from "./field-refusals";

/**
 * U6-C1-R1 — THE REQUIRED-FIELD PRIMITIVE (B3: one shape, every step).
 *
 * Three promises, kept in one place so no step can keep them differently:
 *
 *  1 THE LABEL SAYS WHETHER THE ANSWER IS NEEDED. A required field carries an
 *    asterisk (with a screen-reader word beside it); an optional one says
 *    "Optional" in words rather than leaving the seller to guess.
 *  2 A REFUSAL IS ATTACHED TO THE CONTROL THAT EARNED IT: red border, the door's
 *    reason underneath, in the seller's language (D1/F4).
 *  3 NOTHING IS BLOCKED IN SILENCE. `RefusalSummary` gathers the refused fields
 *    by LABEL above Back/Next, so a seller on a 360-pixel screen who cannot see
 *    the offending control still learns its name and can jump to it. `Next` is
 *    never greyed without this summary on screen.
 */

/**
 * D72 — THE ONE REQUIRED MARK. A visible asterisk (hidden from screen readers)
 * and the word "Required" for them. Every required control whose label a step
 * renders itself uses this, so the mark reads the same on every step.
 */
export function RequiredMark() {
  const { t } = useI18n();
  return (
    <span data-testid="post-required-mark">
      <span className="text-destructive" aria-hidden="true">
        *
      </span>
      <span className="sr-only">{t("post.field.required")}</span>
    </span>
  );
}

export function Field({
  id,
  label,
  required,
  refusal,
  hint,
  refusalTestId = "post-field-refusal",
  refusalAttr,
  children,
}: {
  /** The control's own `id`; the summary focuses it by this name. */
  id: string;
  label: string;
  required: boolean;
  /** The door's refusal for this field, or `null`. */
  refusal: Refusal | null;
  hint?: ReactNode;
  /** Steps whose refusals carry their own anchor (the generated details) name it. */
  refusalTestId?: string;
  refusalAttr?: string;
  children: ReactNode;
}) {
  const { t } = useI18n();
  return (
    <div className="scroll-mt-20 space-y-1" data-testid="post-field" data-field={id}>
      <label htmlFor={id} className="flex items-center gap-1 text-sm font-medium text-foreground">
        <span>{label}</span>
        {required ? (
          <RequiredMark />
        ) : (
          <span className="text-xs font-normal text-muted-foreground">{t("post.optional")}</span>
        )}
      </label>
      {children}
      {hint}
      {refusal !== null && (
        <p
          className="text-sm text-destructive"
          data-testid={refusalTestId}
          data-field={id}
          data-attr={refusalAttr}
          role="alert"
        >
          {t(draftRefusalKey(refusal.reason))}
        </p>
      )}
    </div>
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
          const elsewhere = entry.owner !== null && entry.owner !== step;
          const stepName =
            entry.owner === null ? "" : t(STEPS[entry.owner - 1]?.nameKey ?? "post.step.category");
          return (
            <li key={entry.field}>
              <button
                type="button"
                data-testid="post-refusal-summary-field"
                data-field={entry.field}
                data-step={entry.owner ?? ""}
                className="min-h-11 text-sm font-medium text-destructive underline"
                onClick={() => {
                  if (elsewhere && onGoTo !== undefined) {
                    onGoTo(entry.owner!);
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
