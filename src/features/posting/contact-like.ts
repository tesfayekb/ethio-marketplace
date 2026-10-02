/**
 * Part D — THE ONE CLIENT MIRROR of the door's phone-number rule
 * (`public.attr_contact_like`, a35e45fa): a digit followed by six or more
 * digits, each optionally after spaces, dots, brackets or dashes.
 *
 * Advice only — the door is the authority (F3). INC-382 will tighten the
 * door's rule in bundle 2; this is the single place that changes with it.
 */
const CONTACT_LIKE = /[0-9]([ .()-]*[0-9]){6,}/;

export function looksLikeContact(text: string | null | undefined): boolean {
  return CONTACT_LIKE.test(text ?? "");
}

/**
 * Identity presets (digits:n, vin, plate-et, alnum) are identity data, never
 * free text, so the rule never applies to them — the door skips them too.
 */
export function contactRuleApplies(preset: string | null): boolean {
  return preset === null || preset.startsWith("free:");
}
