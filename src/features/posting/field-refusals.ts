import { registeredField, type FieldRegistry } from "@/components/forms/field-registry";
import { revealControl } from "@/components/forms/reveal-control";
import type { MessageKey } from "@/i18n";
import { ownValue } from "@/lib/own-key";

import { type Refusal } from "./types";

/**
 * DEC-339 — POSTING'S FIELD REGISTRY: the draft and contact doors' field names,
 * each with its words in the seller's language and the step that draws it.
 *
 * An attribute's own key has no entry: the summary then shows the key as DATA,
 * which is what the specification step labels it with too, and the wizard
 * reports the attribute keys each step draws, so those refusals find their step
 * by that list.
 *
 * INC-231 — WHICH STEP OWNS A FIELD. The summary above Back/Next is about THIS
 * step: a seller reading "Title" under the price form has no control to fix and
 * no idea where it lives. A refusal naming another step's field therefore
 * renders as "Fix <Step name>: <label>" and takes the seller there in one tap —
 * nothing is swallowed (F4), and nothing is shown where it cannot be acted on.
 *
 * U6-C1-R3a — the contact door names its fields with the object's own path
 * (`listing_contact_refusals`), so those names carry labels too.
 */
export const POSTING_FIELDS: FieldRegistry = {
  category_id: { label: "post.step.category", step: 1 },
  photos: { label: "post.step.photos", step: 2 },
  video_url: { label: "post.details.videoLabel", step: 2 },
  videoUrl: { label: "post.details.videoLabel", step: 2 },
  attributes: { label: "post.step.specifications", step: 3 },
  title: { label: "post.details.titleLabel", step: 5 },
  description: { label: "post.details.descriptionLabel", step: 5 },
  price_mode: { label: "post.price.modeLabel", step: 4 },
  price_amount: { label: "post.price.amountLabel", step: 4 },
  price_currency: { label: "post.price.currencyLabel", step: 4 },
  price_period: { label: "post.price.periodLabel", step: 4 },
  coverage: { label: "post.step.place", step: 6 },
  contact_pref: { label: "post.step.contact", step: 7 },
  "contact_pref.messages": { label: "post.who.channel.messages", step: 7 },
  "contact_pref.phone": { label: "post.who.channel.phone", step: 7 },
  "contact_pref.telegram": { label: "post.who.channel.telegram", step: 7 },
  "contact_pref.whatsapp": { label: "post.who.channel.whatsapp", step: 7 },
  "contact_pref.phone2": { step: 7 },
  messages: { label: "post.who.channel.messages", step: 7 },
  phone: { label: "post.who.channel.phone", step: 7 },
  telegram: { label: "post.who.channel.telegram", step: 7 },
  whatsapp: { label: "post.who.channel.whatsapp", step: 7 },
  alias: { label: "post.who.aliasLabel", step: 7 },
  first_name: { label: "post.who.firstNameLabel", step: 7 },
  last_name: { label: "post.who.lastNameLabel", step: 7 },
  seller_type: { step: 7 },
  business_name: { label: "post.who.businessLabel", step: 7 },
  home_country_code: { label: "post.who.countryLabel", step: 7 },
  poster_expires_at: { label: "post.price.expiryLabel", step: 8 },
};

/** Which step a refused field belongs to, or `null` when no step claims it. */
export function stepOfField(
  field: string,
  specFields: readonly string[] = [],
  priceFields: readonly string[] = [],
): number | null {
  if (specFields.includes(field)) return 3;
  // DEC-109 — a detail drawn on the price page belongs to step 4.
  if (priceFields.includes(field)) return 4;
  return registeredField(POSTING_FIELDS, field)?.step ?? null;
}

/**
 * The control a refusal names, however that step built it, or `null`. The steps
 * name their controls `post-<field>` (snake case as kebab) and a detail
 * `post-attr-<key>`, so the door's bare field name is tried in those shapes too.
 */
function fieldTarget(field: string): HTMLElement | null {
  const kebab = field.replace(/_/g, "-");
  const who: Record<string, string> = {
    first_name: "first",
    last_name: "last",
    business_name: "business",
    alias: "alias",
    home_country_code: "country",
    "contact_pref.phone": "value-phone",
    "contact_pref.phone2": "value-phone2",
    "contact_pref.telegram": "value-telegram",
    "contact_pref.whatsapp": "value-whatsapp",
  };
  const contact = ownValue(who, field);
  return (
    (contact === undefined ? null : document.getElementById(`post-who-${contact}`)) ??
    document.getElementById(field) ??
    document.getElementById(`post-${kebab}`) ??
    document.getElementById(`post-attr-${field}`) ??
    document.querySelector<HTMLElement>(`[data-testid="post-field"][data-field="${field}"]`)
  );
}

/**
 * Move the seller to the control a refusal names, however that step built it:
 * its Field's box (W4 D2), or the specification row that holds it.
 */
function focusElement(target: HTMLElement): void {
  const box =
    target.closest<HTMLElement>("[data-form-field]") ??
    target.closest<HTMLElement>('[data-testid="post-spec"]') ??
    undefined;
  revealControl(target, box);
}

export function focusField(field: string): void {
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
  priceFields: readonly string[] = [],
): void {
  const targets = summaryRefusals(refusals)
    .filter((refusal) => stepOfField(refusal.field, specFields, priceFields) === step)
    .map((refusal) => fieldTarget(refusal.field))
    .filter((target): target is HTMLElement => target !== null);
  if (targets.length === 0) return;
  const first = targets.reduce((best, next) =>
    best.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_PRECEDING ? next : best,
  );
  focusElement(first);
}

/**
 * INC-455 — A QUESTION IS NAMED BY ITS NAME. A form field reads its translated
 * label; an attribute reads the definition's drawn name the wizard handed down;
 * only a key with neither falls back to itself, so nothing is ever blank (F4).
 */
export function summaryLabel(
  field: string,
  t: (key: MessageKey) => string,
  fieldNames: Readonly<Record<string, string>> = {},
): string {
  const key = registeredField(POSTING_FIELDS, field)?.label;
  if (key !== undefined) return t(key);
  const name = ownValue(fieldNames, field);
  return name === undefined || name === "" ? field : name;
}
