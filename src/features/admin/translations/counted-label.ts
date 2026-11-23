/**
 * INC-1144 — a choice's count is drawn only from a read that answered: while the read loads or
 * has failed, the choice shows its name alone, never a 0 the read did not give.
 */
export function countedLabel(label: string, count: number | undefined, answered: boolean): string {
  return answered ? `${label} · ${count ?? 0}` : label;
}
