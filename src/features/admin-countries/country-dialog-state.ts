export function numberOrZero(raw: string): number {
  const parsed = Number(raw.trim());
  return Number.isFinite(parsed) ? parsed : 0;
}
