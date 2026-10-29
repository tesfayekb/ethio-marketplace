import { FIXED_ORDER_LOCALE } from "@/lib/locale";

/**
 * Part H5 — THE ONE NAME ORDER. Lists put back in the server's order compare
 * names with this collator, pinned to FIXED_ORDER_LOCALE (locale.ts; it reproduces the server's ORDER BY name_en for Latin names): the order of a list never depends
 * on the language of the admin's browser.
 */
export const NAME_COLLATOR = new Intl.Collator(FIXED_ORDER_LOCALE);

export function compareNames(a: string, b: string): number {
  return NAME_COLLATOR.compare(a, b);
}
