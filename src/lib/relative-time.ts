import { formatRelative } from "@/lib/format";
/**
 * Relative time formatting — the single source of truth (law B2).
 *
 * The unit choice lives here; the words come from formatRelative (src/lib/format.ts,
 * INC-985). No locale strings are assembled by hand and no date library is added.
 */

const UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
];

/** Renders an ISO timestamp relative to now, in the active language. */
export function relativeTime(iso: string, language: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const seconds = Math.round((then - Date.now()) / 1000);
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return formatRelative(Math.round(seconds / size), unit, language);
  }
  return formatRelative(Math.round(seconds), "second", language);
}
