/**
 * DEC-229 (bundle 22 turn 24) — one language rule for dates and numbers: the
 * reader's language, else English. Amharic formats as am-ET, English as en-GB;
 * any other code formats as itself when the runtime knows it, else en-GB.
 */
export function formatLocale(language: string): string {
  if (language === "am") return "am-ET";
  if (language === "en") return "en-GB";
  try {
    return Intl.DateTimeFormat.supportedLocalesOf([language]).length > 0 ? language : "en-GB";
  } catch {
    // A code that is not a well-formed language tag formats in English.
    return "en-GB";
  }
}

/** A language other than en/am is named by its public-language row's own name, else its bare code. */
export function languageRowName(
  code: string,
  rows: ReadonlyArray<{ code: string; name_native: string }>,
): string {
  return rows.find((row) => row.code === code)?.name_native ?? code;
}
