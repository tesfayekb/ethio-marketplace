import { formatLocale } from "@/lib/format-locale";

/**
 * Foundations turn L-2 Part A (register row 16) — A COUNTRY'S NAME IN THE READER'S LANGUAGE.
 * The one Intl.DisplayNames of regions (CF-FMT-1), cached per locale, its locale from
 * formatLocale. A code the runtime does not know, or a malformed one, is shown as the code
 * itself. Its own small module: it rides pages that must not carry format.ts (L-2 A1).
 */
const regionNames = new Map<string, Intl.DisplayNames | null>();

function namesFor(language: string): Intl.DisplayNames | null {
  const tag = formatLocale(language);
  let found = regionNames.get(tag);
  if (found === undefined) {
    try {
      found = new Intl.DisplayNames([tag], { type: "region" });
    } catch {
      found = null;
    }
    regionNames.set(tag, found);
  }
  return found;
}

export function formatCountryName(code: string, language: string): string {
  try {
    return namesFor(language)?.of(code) ?? code;
  } catch {
    // RangeError: not a well-formed region code.
    return code;
  }
}
