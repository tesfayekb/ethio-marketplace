/**
 * INC-175 / INC-493 (DEC-160) — the EN baseline comparison, pure.
 *
 * Given the compiled English catalog and the `en` rows read from staging's
 * public.ui_translations, answer the keys whose row must be set back to the
 * compiled text: a row whose value differs, or whose status is not approved.
 * A scratch key (`e2e.scratch.`) is never returned; a row whose key the
 * catalog no longer has is never returned. Imports nothing.
 */
export type EnRow = { key: string; value: string | null; status: string | null };

export const SCRATCH_PREFIX = "e2e.scratch.";

export function staleEnKeys(compiled: Record<string, string>, rows: readonly EnRow[]): string[] {
  const stale: string[] = [];
  for (const row of rows) {
    if (row.key.startsWith(SCRATCH_PREFIX)) continue;
    if (!Object.prototype.hasOwnProperty.call(compiled, row.key)) continue;
    if (row.value !== compiled[row.key] || row.status !== "approved") stale.push(row.key);
  }
  return stale;
}
