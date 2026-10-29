/**
 * INC-985 / INC-954 (Foundations turn L-1, B1/B4) — THE ONE LOCALE CONSTANTS MODULE (K4).
 * The language codes the formatters know, their locale tags, the fallback, the languages whose
 * short month cuts the word, and the shapes of a country code and a currency code. Nothing else in
 * the app names a locale tag or re-declares a code's shape (CF-FMT-1,
 * scripts/conformance/format.test.ts). Afaan Oromo and Tigrinya join as rows here.
 */

/** The fallback language: an unknown or malformed code formats in it. */
export const FALLBACK_LANGUAGE = "en";

/** Each known language's locale tag (ECMA-402 / CLDR). */
export const LOCALE_TAGS: Readonly<Record<string, string>> = Object.freeze({
  en: "en-GB",
  am: "am-ET",
});

/** The fallback language's tag. */
export const FALLBACK_TAG = LOCALE_TAGS[FALLBACK_LANGUAGE] ?? "en-GB";

/**
 * Languages whose CLDR short month is a cut word (am-ET's "ኦክቶ" for "ኦክቶበር"): a month in them
 * is always written in full, and dateStyle "medium"/"short" is never used for them.
 */
export const LONG_MONTH_LANGUAGES: ReadonlySet<string> = new Set(["am"]);

/** A country code's shape (ISO 3166-1 alpha-2). */
export const COUNTRY_CODE = /^[A-Z]{2}$/;
/** A currency code's shape (ISO 4217 alpha-3). */
export const CURRENCY_CODE = /^[A-Z]{3}$/;

export function isCountryCode(value: unknown): value is string {
  return typeof value === "string" && COUNTRY_CODE.test(value);
}
export function isCurrencyCode(value: unknown): value is string {
  return typeof value === "string" && CURRENCY_CODE.test(value);
}

/** A known language's tag, else undefined (format-locale.ts decides the rest). */
export function localeTagOf(language: string): string | undefined {
  return Object.prototype.hasOwnProperty.call(LOCALE_TAGS, language)
    ? LOCALE_TAGS[language]
    : undefined;
}
