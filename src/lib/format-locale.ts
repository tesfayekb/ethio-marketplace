import { FALLBACK_TAG, localeTagOf } from "@/lib/locale";

/**
 * DEC-229 (bundle 22 turn 24) — one language rule for dates and numbers: the
 * reader's language, else English. A known language formats as its tag in
 * src/lib/locale.ts (Amharic am-ET, English en-GB); any other code formats as
 * itself when the runtime knows it, else the fallback tag.
 */
export function formatLocale(language: string): string {
  const known = localeTagOf(language);
  if (known !== undefined) return known;
  try {
    return Intl.DateTimeFormat.supportedLocalesOf([language]).length > 0 ? language : FALLBACK_TAG;
  } catch {
    // A code that is not a well-formed language tag formats in English.
    return FALLBACK_TAG;
  }
}

/** A language other than en/am is named by its public-language row's own name, else its bare code. */
export function languageRowName(
  code: string,
  rows: ReadonlyArray<{ code: string; name_native: string }>,
): string {
  return rows.find((row) => row.code === code)?.name_native ?? code;
}
