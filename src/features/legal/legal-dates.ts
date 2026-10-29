import { dateFormatter } from "@/lib/format";

/**
 * Foundations turn L-1 (INC-985): the legal pages' dates, apart from legal-kinds.ts — that file's
 * gate rules ride every page's first download, and no first paint draws a legal date, so the
 * formatter (src/lib/format.ts) stays off it (the way INC-864 keeps reader-failure on demand).
 */

/** A legal date in the page's language (the day intent; Amharic months whole). */
export function legalDate(value: string | null | undefined, language: string): string {
  if (!value) return "";
  return dateFormatter("day", language).format(new Date(value));
}
/**
 * Turn 12: an acceptance's or an e-mail's moment, stored in UTC, shown in the viewer's own time zone
 * with the zone named. `timeZone` is for tests only; the screens pass none.
 */
export function legalMoment(
  value: string | null | undefined,
  language: string,
  timeZone?: string,
): string {
  if (!value) return "";
  return dateFormatter("dayTimeZone", language, timeZone).format(new Date(value));
}
