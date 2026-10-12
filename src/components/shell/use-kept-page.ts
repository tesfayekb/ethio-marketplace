import { useEffect, useState } from "react";

import { PAGE_SIZE_OPTIONS } from "@/features/admin-locations/locations-toolbar";

/**
 * Bundle 11 G3a (the operator's walk, 2026-10-11: "I don't see page count,
 * pagination line in roles") — every table has its footer: the range, rows per
 * page and the pages. This hook holds a client-paged table's page and its page
 * size, the size kept in this browser under `storageKey` (a convenience only:
 * storage that fails or is missing keeps the default). The size is read after
 * mount, so the server's render and the first client render agree.
 */
export function useKeptPage(
  storageKey: string,
  defaultSize = 25,
  /** Bundle 11 C1 — a table whose door pages differently names its own sizes (Screening: 25, 50, 100). */
  options: readonly number[] = PAGE_SIZE_OPTIONS,
) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<number>(defaultSize);

  useEffect(() => {
    try {
      const stored = Number(window.localStorage.getItem(storageKey) ?? "");
      if (options.includes(stored)) {
        setPageSize(stored);
      }
    } catch {
      // Storage refused: the default stands.
    }
  }, [storageKey, options]);

  const setPageSizeKept = (next: number) => {
    setPageSize(next);
    setPage(0);
    try {
      window.localStorage.setItem(storageKey, String(next));
    } catch {
      // Storage refused: the choice lasts for this visit.
    }
  };

  return {
    page,
    setPage,
    pageSize,
    setPageSize: setPageSizeKept,
    pageSizeOptions: [...options],
  };
}
