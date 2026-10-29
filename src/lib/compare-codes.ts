/**
 * Foundations turn L-2 Part A2 — MACHINE ORDER: ids, codes, slugs, ISO timestamps and feature
 * ids (single-case ASCII) compare by code point, the same on the server and in every browser,
 * never through a locale (CF-FMT-1 refuses a localeCompare with no locale).
 */
export function compareCodes(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
