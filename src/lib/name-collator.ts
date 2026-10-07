/**
 * Part H5 — THE ONE NAME ORDER. Lists put back in the server's order compare
 * names with this collator, pinned to "en": the order of a list never depends
 * on the language of the admin's browser.
 */
export const NAME_COLLATOR = new Intl.Collator("en");

export function compareNames(a: string, b: string): number {
  return NAME_COLLATOR.compare(a, b);
}
