import { useEffect, type ReactNode } from "react";

import { useI18n } from "@/i18n";
import { readRefusal, refusalText, type Refusal, type RefusalFamily } from "@/lib/refusal";

import { RequiredMark } from "./required-mark";
import type { FormGate } from "./use-form-gate";

/**
 * DEC-339 (Foundations 2) — THE ONE FIELD. Every control a person answers in
 * sits in one, so every form keeps the same promises:
 *
 *  1 THE LABEL SAYS WHETHER THE ANSWER IS NEEDED: a required field carries the
 *    one mark; an optional one says "Optional" in words.
 *  2 A REFUSAL IS ATTACHED TO THE CONTROL THAT EARNED IT: read by the one reader
 *    (never the server's own text), under the control (or above a choice, the
 *    GOV.UK pattern), in the person's language. The control is marked
 *    `aria-invalid` and names the refusal (and the hint) by `aria-describedby`
 *    (WAI-ARIA 1.2, WCAG 2.2 3.3.1).
 *  3 A BLANK REQUIRED ANSWER IS REPORTED TO THE ONE GATE (`gate`, `blank`), which
 *    keeps the submit closed until it is given.
 *
 * `id` is the control's own id and the refusal's anchor; `field` is the door's
 * name for the answer (the gate's and the refusal's), `id` unless they differ.
 */
export type FieldControl = {
  id: string;
  "aria-invalid": true | undefined;
  "aria-describedby": string | undefined;
  "aria-required": true | undefined;
};

/** stack: label, control, hint, refusal · inline: label and control on one row · choice: a tick or a radio before its sentence, the refusal above. */
export type FieldLayout = "stack" | "inline" | "choice";

export function Field({
  id,
  field = id,
  label,
  required,
  marked = required,
  hint,
  refusal,
  family,
  refusalValues,
  testId = "form-field",
  refusalTestId = "form-field-refusal",
  markTestId,
  refusalAttr,
  layout = "stack",
  gate,
  blank = false,
  children,
}: {
  id: string;
  field?: string;
  label: ReactNode;
  required: boolean;
  /** W4 D1 — a required answer whose mark clears once it is given says so; never "Optional". */
  marked?: boolean;
  hint?: ReactNode;
  /** The door's (or the gate's) refusal for this field, or `null`. */
  refusal: Refusal | null;
  /** The family whose words the refusal is read by. */
  family?: RefusalFamily;
  /** `{name}`-style values the refusal's words carry. */
  refusalValues?: Record<string, string | number>;
  testId?: string;
  refusalTestId?: string;
  markTestId?: string;
  refusalAttr?: string;
  layout?: FieldLayout;
  gate?: FormGate;
  /** With `gate`: the answer is still blank. */
  blank?: boolean;
  children: ReactNode | ((control: FieldControl) => ReactNode);
}) {
  const { t } = useI18n();
  const register = gate?.register;
  const missing = required && blank;
  useEffect(() => {
    if (register === undefined) return;
    register(field, missing);
    return () => register(field, false);
  }, [register, field, missing]);
  const refused = refusal !== null;
  const hinted = hint !== undefined && hint !== null && hint !== false;
  const hintId = `${id}-hint`;
  const refusalId = `${id}-refusal`;
  const described = [hinted ? hintId : null, refused ? refusalId : null].filter(
    (part): part is string => part !== null,
  );
  const control: FieldControl = {
    id,
    "aria-invalid": refused || undefined,
    "aria-describedby": described.length === 0 ? undefined : described.join(" "),
    "aria-required": required || undefined,
  };
  const drawn = typeof children === "function" ? children(control) : children;
  const mark = required && marked ? <RequiredMark testId={markTestId} /> : null;
  const words = refusal === null ? "" : refusalText(readRefusal(refusal, family), t, refusalValues);
  const refusalLine = refused ? (
    <p
      id={refusalId}
      className="text-sm text-destructive"
      data-testid={refusalTestId}
      data-field={id}
      data-attr={refusalAttr}
      role="alert"
    >
      {words}
    </p>
  ) : null;
  const hintBox = hinted ? <div id={hintId}>{hint}</div> : null;
  const box = {
    "data-testid": testId,
    "data-field": id,
    "data-form-field": "",
    "data-refused": refused ? "1" : undefined,
  };
  if (layout === "choice") {
    return (
      <div {...box} className="scroll-mt-20 space-y-2">
        {refusalLine}
        <label htmlFor={id} className="flex min-h-11 items-start gap-3 text-sm text-foreground">
          {drawn}
          <span>
            {label} {mark}
          </span>
        </label>
        {hintBox}
      </div>
    );
  }
  const labelLine = (
    <label htmlFor={id} className="flex items-center gap-1 text-sm font-medium text-foreground">
      <span>{label}</span>
      {layout === "stack" && !required ? (
        <span className="text-xs font-normal text-muted-foreground">{t("post.optional")}</span>
      ) : (
        mark
      )}
    </label>
  );
  return (
    <div {...box} className="scroll-mt-20 space-y-1">
      {layout === "inline" ? (
        <div className="flex min-h-11 items-center justify-between gap-3">
          {labelLine}
          {drawn}
        </div>
      ) : (
        <>
          {labelLine}
          {drawn}
        </>
      )}
      {hintBox}
      {refusalLine}
    </div>
  );
}
