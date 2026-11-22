import { useState } from "react";

import { PAGE_SIZE_OPTIONS } from "@/features/admin-locations/locations-toolbar";

import { tableOfPageKey, useTableEntry } from "./table-view-store";

/**
 * Bundle 11 G3a (the operator's walk, 2026-10-11: "I don't see page count,
 * pagination line in roles") — every table has its footer: the range, rows per
 * page and the pages. This hook holds a table's page and its page size.
 * INC-1238 — the size is a reader of the one kept view (table-view-store.ts), per account and
 * table; `storageKey` names the table (the store pairs it with the table's columns id). A kept
 * size the table does not offer today reads as the default.
 *
 * `ready` (ruling 1, decision 5): false until the account is known (the server's render and the
 * first paint). A table whose door takes the page size waits for it before its first read.
 */
export function useKeptPage(
  storageKey: string,
  defaultSize = 25,
  /** Bundle 11 C1 — a table whose door pages differently names its own sizes (Screening: 25, 50, 100). */
  options: readonly number[] = PAGE_SIZE_OPTIONS,
) {
  const tableId = tableOfPageKey(storageKey);
  const { ready, entry, setPageSize: keepSize } = useTableEntry(tableId);
  const [page, setPage] = useState(0);
  const kept = entry.pageSize;
  const pageSize = kept !== null && options.includes(kept) ? kept : defaultSize;

  const setPageSizeKept = (next: number) => {
    setPage(0);
    keepSize(next);
  };

  return {
    ready,
    page,
    setPage,
    pageSize,
    setPageSize: setPageSizeKept,
    pageSizeOptions: [...options],
  };
}
