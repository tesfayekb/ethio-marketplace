import type { ReactNode } from "react";

/**
 * BUNDLE 11 A2 (D118, D128) — THE TABLE'S TOOLBAR, one layout for every admin
 * table: the search box, then Filters and Columns at the end of the row, and
 * the active filters as chips under it. Each part is the shared block
 * (FiltersButton, ColumnsButton, FilterChips); this component only places them.
 *
 * Bundle 11 B1 — an optional `scope` comes first: a control that decides WHAT
 * the table reads (Admin › Places' market), not a sieve over what it shows, so
 * it stays on the row instead of inside Filters. The toolbar spans the row.
 */
export function TableToolbar({
  testid,
  scope,
  search,
  filters,
  columns,
  chips,
}: {
  testid: string;
  scope?: ReactNode;
  search?: ReactNode;
  filters?: ReactNode;
  columns?: ReactNode;
  chips?: ReactNode;
}) {
  return (
    <div data-testid={testid} className="flex w-full min-w-0 flex-col gap-2">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        {scope ? <div className="w-full min-w-0 md:w-auto">{scope}</div> : null}
        {search ? <div className="min-w-40 flex-1 md:max-w-72">{search}</div> : null}
        <div className="ms-auto flex flex-wrap items-center gap-2">
          {filters}
          {columns}
        </div>
      </div>
      {chips}
    </div>
  );
}
