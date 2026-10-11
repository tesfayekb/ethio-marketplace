/**
 * Bundle 11, turn L1b (INC-549) — calendar days as the house date field reads
 * and writes them: "YYYY-MM-DD" in the person's own calendar, never through UTC,
 * so a day never shifts across midnight.
 */

/** "YYYY-MM-DD" → a local calendar day; null for anything else. */
export function parseDay(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  // A day the calendar does not have (2026-02-31) rolls over: refuse it.
  return Number.isNaN(date.getTime()) || isoDay(date) !== value ? null : date;
}

/** A local calendar day → "YYYY-MM-DD". */
export function isoDay(date: Date): string {
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Today in the person's own calendar, as the field writes it. */
export function todayIso(): string {
  return isoDay(new Date());
}
