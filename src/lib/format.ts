import { formatLocale } from "@/lib/format-locale";
import { LONG_MONTH_LANGUAGES } from "@/lib/locale";

/**
 * INC-985 (Foundations turn L-1, B1) — ONE FORMATTER PER INTENT. Every date, time, relative time
 * and number a person reads is formatted here, by intent, on formatLocale's locale (an unknown
 * language formats in English) to ECMA-402 / CLDR. A site never builds its own Intl options
 * (CF-FMT-1, scripts/conformance/format.test.ts).
 *
 * In a LONG_MONTH language (Amharic) a month is always written in full and dateStyle
 * "medium"/"short" is never used: am-ET's CLDR short month cuts the word ("ኦክቶ" for "ኦክቶበር").
 * One instance per (intent, resolved locale, time zone), cached.
 */

export type DateIntent =
  /** A day: 29 Oct 2026 · ጥቅምት… in full. */
  | "day"
  /** A day with its weekday, in full. */
  | "dayFull"
  /** A day in digits (dense tables). */
  | "dayNumeric"
  /** A day and month, no year (charts, this year's rows). */
  | "dayMonth"
  /** A day and a time to the minute. */
  | "dayTime"
  /** A day in digits and a time to the minute (dense admin rows). */
  | "dayTimeNumeric"
  /** A day in digits and a time to the second (audit rows). */
  | "moment"
  /** A day and a time with the time zone's name (legal records). */
  | "dayTimeZone"
  /** A month and year. */
  | "monthYear"
  /** A weekday's narrow letter (calendar heads). */
  | "weekdayNarrow";

type Options = Intl.DateTimeFormatOptions;
const NUMERIC_DAY: Options = { day: "numeric", month: "numeric", year: "numeric" };
const LONG_DAY: Options = { day: "numeric", month: "long", year: "numeric" };
const MINUTE: Options = { hour: "numeric", minute: "2-digit" };

/** Each intent's options: [standard, long-month language]. */
const DATE_INTENTS: Record<DateIntent, readonly [Options, Options]> = {
  day: [{ dateStyle: "medium" }, LONG_DAY],
  dayFull: [{ dateStyle: "full" }, { weekday: "long", ...LONG_DAY }],
  dayNumeric: [{ dateStyle: "short" }, NUMERIC_DAY],
  dayMonth: [
    { day: "numeric", month: "short" },
    { day: "numeric", month: "long" },
  ],
  dayTime: [{ dateStyle: "medium", timeStyle: "short" }, { ...LONG_DAY, ...MINUTE }],
  dayTimeNumeric: [{ dateStyle: "short", timeStyle: "short" }, { ...NUMERIC_DAY, ...MINUTE }],
  moment: [
    { dateStyle: "short", timeStyle: "medium" },
    { ...NUMERIC_DAY, ...MINUTE, second: "2-digit" },
  ],
  dayTimeZone: [
    { dateStyle: "medium", timeStyle: "long" },
    { ...LONG_DAY, ...MINUTE, second: "2-digit", timeZoneName: "short" },
  ],
  monthYear: [
    { month: "long", year: "numeric" },
    { month: "long", year: "numeric" },
  ],
  weekdayNarrow: [{ weekday: "narrow" }, { weekday: "narrow" }],
};

/** The resolved language whose rule applies: the locale's own language subtag. */
function languageOf(locale: string): string {
  return locale.split("-")[0] ?? locale;
}

const dateCache = new Map<string, Intl.DateTimeFormat>();
const numberCache = new Map<string, Intl.NumberFormat>();
const relativeCache = new Map<string, Intl.RelativeTimeFormat>();

/** The one cached date formatter for an intent in a language (optionally in a time zone). */
export function dateFormatter(
  intent: DateIntent,
  language: string,
  timeZone?: string,
): Intl.DateTimeFormat {
  const locale = formatLocale(language);
  const key = `${intent}|${locale}|${timeZone ?? ""}`;
  const cached = dateCache.get(key);
  if (cached !== undefined) return cached;
  const [standard, longMonth] = DATE_INTENTS[intent];
  const options = LONG_MONTH_LANGUAGES.has(languageOf(locale)) ? longMonth : standard;
  const made = new Intl.DateTimeFormat(locale, timeZone ? { ...options, timeZone } : options);
  dateCache.set(key, made);
  return made;
}

/** A date or ISO timestamp, formatted by intent. */
export function formatDate(
  intent: DateIntent,
  value: Date | string | number,
  language: string,
  timeZone?: string,
): string {
  return dateFormatter(intent, language, timeZone).format(
    value instanceof Date ? value : new Date(value),
  );
}

export type NumberIntent =
  /** A count or an amount as written: grouping, up to three decimals. */
  | "count"
  /** A stored number shown exactly (every decimal it has). */
  | "exact";

const NUMBER_INTENTS: Record<NumberIntent, Intl.NumberFormatOptions> = {
  count: {},
  exact: { maximumFractionDigits: 20 },
};

/** The one cached number formatter for an intent in a language. */
export function numberFormatter(intent: NumberIntent, language: string): Intl.NumberFormat {
  const locale = formatLocale(language);
  const key = `${intent}|${locale}`;
  const cached = numberCache.get(key);
  if (cached !== undefined) return cached;
  const made = new Intl.NumberFormat(locale, NUMBER_INTENTS[intent]);
  numberCache.set(key, made);
  return made;
}

export function formatNumber(value: number, language: string, intent: NumberIntent = "count") {
  return numberFormatter(intent, language).format(value);
}

/** A relative time ("yesterday", "in 3 hours"), numeric "auto". */
export function formatRelative(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  language: string,
): string {
  const locale = formatLocale(language);
  let made = relativeCache.get(locale);
  if (made === undefined) {
    made = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    relativeCache.set(locale, made);
  }
  return made.format(value, unit);
}
