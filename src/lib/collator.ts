import { formatLocale } from "@/lib/format-locale";

/**
 * Foundations turn L-2 Part A (register row 16; moved from place-order.ts, INC-401) — READER
 * ORDER: a list a person reads is ordered by the name shown, in the reader's language. The one
 * Intl.Collator for reader order (CF-FMT-1), cached per locale, its locale from formatLocale.
 * A fixed order is compareNames (name-collator.ts); a machine order is compareCodes.
 */
const collators = new Map<string, Intl.Collator>();

export function collatorFor(language: string): Intl.Collator {
  const tag = formatLocale(language);
  let found = collators.get(tag);
  if (found === undefined) {
    found = new Intl.Collator(tag, { sensitivity: "base", numeric: true });
    collators.set(tag, found);
  }
  return found;
}
