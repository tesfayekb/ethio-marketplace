import { useCallback, useEffect, useState } from "react";

/**
 * BUNDLE 11 A2 (D128) — which columns this browser hides, per table, for the
 * Columns button (columns-button.tsx). A convenience only: storage that fails or
 * is missing shows every column.
 */
const STORE_PREFIX = "ethio:table-columns:";

function readHidden(tableId: string): string[] {
  try {
    const raw = window.localStorage.getItem(STORE_PREFIX + tableId);
    if (raw === null) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((key): key is string => typeof key === "string")
      : [];
  } catch {
    return [];
  }
}

function writeHidden(tableId: string, hidden: string[]): void {
  try {
    window.localStorage.setItem(STORE_PREFIX + tableId, JSON.stringify(hidden));
  } catch {
    // A convenience only (private windows, blocked storage): the choice lasts for this page.
  }
}

/**
 * The hidden columns of one table, read after the first paint so the server's
 * render and the browser's first render agree (every column shown).
 */
export function useHiddenColumns(
  tableId: string,
): [string[], (key: string, visible: boolean) => void] {
  const [hidden, setHidden] = useState<string[]>([]);
  useEffect(() => {
    setHidden(readHidden(tableId));
  }, [tableId]);
  const toggle = useCallback(
    (key: string, visible: boolean) => {
      setHidden((current) => {
        const next = visible ? current.filter((k) => k !== key) : [...new Set([...current, key])];
        writeHidden(tableId, next);
        return next;
      });
    },
    [tableId],
  );
  return [hidden, toggle];
}

/** The columns a table draws: every locked column, and the others not hidden. */
export function visibleColumns<T extends { key: string }>(
  columns: T[],
  hidden: string[],
  locked: string[],
): T[] {
  return columns.filter((column) => locked.includes(column.key) || !hidden.includes(column.key));
}
