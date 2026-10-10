import type { ReactNode } from "react";

/**
 * BUNDLE 11 A2 (D118, D128) — THE TABLE'S TOOLBAR, one layout for every admin
 * table: the search box, then Filters and Columns at the end of the row, and
 * the active filters as chips under it. Each part is the shared block
 * (FiltersButton, ColumnsButton, FilterChips); this component only places them.
 */
export function TableToolbar({
  testid,
  search,
  filters,
  columns,
  chips,
}: {
  testid: string;
  search?: ReactNode;
  filters?: ReactNode;
  columns?: ReactNode;
  chips?: ReactNode;
}) {
  return (
    <div data-testid={testid} className="flex min-w-0 flex-col gap-2">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        {search ? <div className="min-w-0 flex-1 md:max-w-72">{search}</div> : null}
        <div className="ms-auto flex flex-wrap items-center gap-2">
          {filters}
          {columns}
        </div>
      </div>
      {chips}
    </div>
  );
}
