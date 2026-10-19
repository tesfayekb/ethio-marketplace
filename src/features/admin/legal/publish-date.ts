/** Calendar dates are UTC; the earliest choice delegates the exact instant to the door. */
export function earliestLegalDate(now: Date, noticeDays: number): string {
  return new Date(now.getTime() + noticeDays * 86_400_000).toISOString().slice(0, 10);
}
export function legalPublishDate(
  first: boolean,
  choice: "material" | "correction" | null,
  date: string,
  now: Date,
  noticeDays: number,
): { material: boolean; effective_at?: string } | null {
  if (first || choice === "correction") return { material: false };
  if (choice !== "material") return null;
  const earliest = earliestLegalDate(now, noticeDays);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < earliest) return null;
  const instant = new Date(`${date}T00:00:00.000Z`);
  if (!Number.isFinite(instant.getTime()) || instant.toISOString().slice(0, 10) !== date)
    return null;
  return date === earliest
    ? { material: true }
    : { material: true, effective_at: instant.toISOString() };
}
