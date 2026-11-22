import { useCallback } from "react";

import { setKeptHidden, useTableEntry } from "./table-view-store";

/**
 * BUNDLE 11 A2 (D128) — which columns a table hides, for the Columns button (columns-button.tsx).
 * INC-1238 — a reader of the one kept view (table-view-store.ts): per account and table, one copy
 * in memory shared with the table's other hooks. Not known yet, or no account: every column
 * shown, and a choice lasts for the visit.
 */
export function useHiddenColumns(
  tableId: string,
): [string[], (key: string, visible: boolean) => void] {
  const { entry } = useTableEntry(tableId);
  const toggle = useCallback(
    (key: string, visible: boolean) => setKeptHidden(tableId, key, visible),
    [tableId],
  );
  return [entry.hidden as string[], toggle];
}

/** The columns a table draws: every locked column, and the others not hidden. */
export function visibleColumns<T extends { key: string }>(
  columns: T[],
  hidden: string[],
  locked: string[],
): T[] {
  return columns.filter((column) => locked.includes(column.key) || !hidden.includes(column.key));
}
