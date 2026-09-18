import type { ReactNode } from "react";

import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

import { draftRefusalKey } from "./refusal-text";
import type { Refusal } from "./types";

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
 * The door's field names, in the seller's words. An attribute's own key has no
 * entry here: the summary then shows the key as DATA, which is what the
 * specification step labels it with too.
 */
const FIELD_LABEL_KEYS: Record<string, MessageKey> = {
  category_id: "post.step.category",
  photos: "post.step.photos",
  attributes: "post.step.specifications",
  title: "post.details.titleLabel",
  description: "post.details.descriptionLabel",
  video_url: "post.details.videoLabel",
  videoUrl: "post.details.videoLabel",
  price_mode: "post.price.modeLabel",
  price_amount: "post.price.amountLabel",
  price_currency: "post.price.currencyLabel",
  price_period: "post.price.periodLabel",
  poster_expires_at: "post.price.expiryLabel",
  coverage: "post.step.place",
  contact_pref: "post.step.contact",
  messages: "post.who.channel.messages",
  phone: "post.who.channel.phone",
  telegram: "post.who.channel.telegram",
  whatsapp: "post.who.channel.whatsapp",
  alias: "post.who.aliasLabel",
};

export const fieldControlClass =
  "min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground " +
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-ring";

/**
 * The border a control wears.
 *
 * U6-C1-R2 — THREE STATES, NOT TWO. A refused control wears the full
 * destructive border (the door has spoken). A REQUIRED control that is still
 * EMPTY wears a soft one from the start: the seller can see, before pressing
 * anything, which answers the form is still waiting for — without the screen
 * claiming a refusal nobody made (F4).
 */
export function controlClass(refused: boolean, soft = false): string {
  const border = refused ? "border-destructive" : soft ? "border-destructive/40" : "border-input";
  return `${fieldControlClass} ${border}`;
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
    <div className="space-y-1" data-testid="post-field" data-field={id}>
      <label htmlFor={id} className="flex items-center gap-1 text-sm font-medium text-foreground">
        <span>{label}</span>
        {required ? (
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="text-xs font-normal text-muted-foreground">{t("post.optional")}</span>
        )}
        {required && <span className="sr-only">{t("post.field.required")}</span>}
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

/** Move the seller to the control a refusal names, however that step built it. */
function focusField(field: string): void {
  const byId = document.getElementById(field);
  const target =
    byId ??
    document.querySelector<HTMLElement>(`[data-testid="post-field"][data-field="${field}"]`);
  if (target === null) return;
  target.scrollIntoView({ block: "center" });
  if (typeof (target as HTMLElement & { focus?: () => void }).focus === "function") target.focus();
}

/**
 * THE RED SUMMARY, above Back/Next. It lists the refused fields BY LABEL and each
 * name jumps to its control. It renders only when the door has actually refused
 * something — it is never a pre-emptive warning.
 */
export function RefusalSummary({ refusals }: { refusals: Refusal[] }) {
  const { t } = useI18n();
  if (refusals.length === 0) return null;
  const named = refusals.map((refusal) => {
    const key = FIELD_LABEL_KEYS[refusal.field];
    return { field: refusal.field, label: key === undefined ? refusal.field : t(key) };
  });
  return (
    <div
      className="rounded-md border border-destructive bg-destructive/5 p-3"
      data-testid="post-refusal-summary"
      role="alert"
    >
      <p className="text-sm font-medium text-destructive">{t("post.refusalSummary")}</p>
      <ul className="mt-1 flex flex-wrap gap-2">
        {named.map((entry) => (
          <li key={entry.field}>
            <button
              type="button"
              data-testid="post-refusal-summary-field"
              data-field={entry.field}
              className="min-h-11 text-sm font-medium text-destructive underline"
              onClick={() => focusField(entry.field)}
            >
              {entry.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
