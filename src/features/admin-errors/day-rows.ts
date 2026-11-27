import type { ErrorKind } from "@/lib/error-clean";

import type { ErrorStats } from "./errors-service";

export type DayRow = { day: string; total: number } & Record<ErrorKind, number>;

/** The days answer as a row per day (newest first), a count per kind and the day's total. */
export function dayRows(days: ErrorStats["days"]): DayRow[] {
  const byDay = new Map<string, DayRow>();
  for (const entry of days) {
    const row = byDay.get(entry.day) ?? {
      day: entry.day,
      total: 0,
      notice: 0,
      crash: 0,
      unhandled: 0,
      route: 0,
      upstream: 0,
      render: 0,
    };
    row[entry.kind] += entry.count;
    row.total += entry.count;
    byDay.set(entry.day, row);
  }
  // A day is an ISO date (yyyy-mm-dd): its order is the text's own, with no locale.
  return [...byDay.values()].sort((a, b) => (a.day < b.day ? 1 : a.day > b.day ? -1 : 0));
}
