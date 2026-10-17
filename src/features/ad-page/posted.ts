/** Whole elapsed days, weeks and 30-day months; rendered only after mount. */
export function postedWhen(postedAt: string, language: string, now = Date.now()): string | null {
  const at = Date.parse(postedAt);
  if (!Number.isFinite(at)) return null;
  const days = Math.max(0, Math.floor((now - at) / 86_400_000));
  const unit = days < 7 ? "day" : days < 35 ? "week" : "month";
  const amount = unit === "day" ? days : Math.floor(days / (unit === "week" ? 7 : 30));
  return new Intl.RelativeTimeFormat(language, { numeric: "auto" }).format(
    amount === 0 ? 0 : -amount,
    unit,
  );
}
