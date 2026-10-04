import type { ReactNode } from "react";

import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

import { draftRefusalKey, fill } from "./refusal-text";
import { STEPS, type Refusal } from "./types";

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
  // U6-C1-R3a — the contact door names its fields with the object's own path
  // (`listing_contact_refusals`), so those names carry labels too.
  "contact_pref.messages": "post.who.channel.messages",
  "contact_pref.phone": "post.who.channel.phone",
  "contact_pref.telegram": "post.who.channel.telegram",
  "contact_pref.whatsapp": "post.who.channel.whatsapp",
};

/**
 * INC-231 — WHICH STEP OWNS A FIELD.
 *
 * The summary above Back/Next is about THIS step: a seller reading "Title" under
 * the price form has no control to fix and no idea where it lives. A refusal
 * naming another step's field therefore renders as "Fix <Step name>: <label>"
 * and takes the seller there in one tap — nothing is swallowed (F4), and nothing
 * is shown where it cannot be acted on.
 *
 * An attribute key has no entry: the specification step declares its own fields
 * and the wizard reports them, so those refusals are matched by that list.
 */
const FIELD_STEPS: Record<string, number> = {
  category_id: 1,
  photos: 2,
  video_url: 2,
  videoUrl: 2,
  attributes: 3,
  title: 5,
  description: 5,
  price_mode: 4,
  price_amount: 4,
  price_currency: 4,
  price_period: 4,
  coverage: 6,
  contact_pref: 7,
  "contact_pref.messages": 7,
  "contact_pref.phone": 7,
  "contact_pref.telegram": 7,
  "contact_pref.whatsapp": 7,
  messages: 7,
  phone: 7,
  telegram: 7,
  whatsapp: 7,
  alias: 7,
  seller_type: 7,
  business_name: 7,
  home_country_code: 7,
  poster_expires_at: 8,
};

/** Which step a refused field belongs to, or `null` when no step claims it. */
export function stepOfField(field: string, specFields: readonly string[] = []): number | null {
  if (specFields.includes(field)) return 3;
  return FIELD_STEPS[field] ?? null;
}

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
  // INC-355 — required + empty is the FULL destructive border; refused adds the ring.
  const border = refused
    ? "border-destructive ring-1 ring-destructive"
    : soft
      ? "border-destructive"
      : "border-input";
  return `${fieldControlClass} ${border}`;
}

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
 * The control a refusal names, however that step built it, or `null`. The steps
 * name their controls `post-<field>` (snake case as kebab) and a detail
 * `post-attr-<key>`, so the door's bare field name is tried in those shapes too.
 */
function fieldTarget(field: string): HTMLElement | null {
  const kebab = field.replace(/_/g, "-");
  return (
    document.getElementById(field) ??
    document.getElementById(`post-${kebab}`) ??
    document.getElementById(`post-attr-${field}`) ??
    document.querySelector<HTMLElement>(`[data-testid="post-field"][data-field="${field}"]`)
  );
}

/**
 * Move the seller to the control a refusal names, however that step built it.
 *
 * W4 D2 — the FIELD CONTAINER (label included) is scrolled into view, smoothly
 * unless the seller asked for reduced motion; its `scroll-mt-20` keeps the label
 * below the fixed header. Then the control takes focus without a second jump.
 */
function focusElement(target: HTMLElement): void {
  const container =
    target.closest<HTMLElement>('[data-testid="post-field"]') ??
    target.closest<HTMLElement>('[data-testid="post-spec"]') ??
    target;
  const reduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  container.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
  if (typeof (target as HTMLElement & { focus?: () => void }).focus === "function") {
    target.focus({ preventScroll: true });
  }
}

function focusField(field: string): void {
  const target = fieldTarget(field);
  if (target !== null) focusElement(target);
}

/**
 * INC-313 — REFUSALS WITH NO CONTROL. The doors answer some refusals against
 * the request itself (`door`, `residency`, `id`): there is no control to name
 * or focus, and their words already render as post-refusal paragraphs. The
 * summary leaves them out rather than showing the raw field word.
 */
export const CONTROL_LESS_FIELDS: ReadonlySet<string> = new Set(["door", "residency", "id"]);

export function summaryRefusals(refusals: Refusal[]): Refusal[] {
  return refusals.filter((refusal) => !CONTROL_LESS_FIELDS.has(refusal.field));
}

/**
 * D70 — AFTER A STRICT REFUSAL, THE FIRST REFUSED CONTROL OF THIS STEP TAKES
 * FOCUS. "First" is DOCUMENT order (what the seller sees top to bottom), never
 * the door's array order; another step's field is left to the summary.
 */
export function focusFirstRefusal(
  refusals: Refusal[],
  step: number,
  specFields: readonly string[] = [],
): void {
  const targets = summaryRefusals(refusals)
    .filter((refusal) => stepOfField(refusal.field, specFields) === step)
    .map((refusal) => fieldTarget(refusal.field))
    .filter((target): target is HTMLElement => target !== null);
  if (targets.length === 0) return;
  const first = targets.reduce((best, next) =>
    best.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_PRECEDING ? next : best,
  );
  focusElement(first);
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
  onGoTo,
}: {
  refusals: Refusal[];
  /** The step on screen; entries belonging elsewhere are labelled with theirs. */
  step: number;
  /** The detail keys step 3 renders, so an attribute refusal finds its step. */
  specFields?: readonly string[];
  onGoTo?: (step: number) => void;
}) {
  const { t } = useI18n();
  const shown = summaryRefusals(refusals);
  if (shown.length === 0) return null;
  const named = shown.map((refusal) => {
    const key = FIELD_LABEL_KEYS[refusal.field];
    const owner = stepOfField(refusal.field, specFields);
    const label = key === undefined ? refusal.field : t(key);
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
