import { Search } from "lucide-react";
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
 *
 * Bundle 11 V2 (D132) — on a phone the scope is a tinted pill on its own line,
 * then the search (a 44 px white box with its magnifier) shares one line with
 * the Filters and Columns tiles; from md all of it is one row inside the
 * table's card. The search box and the scope keep the page's own control: this
 * component dresses them, it never replaces them.
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
        {scope ? (
          <div className="w-full min-w-0 md:w-auto max-md:[&_select]:w-auto max-md:[&_select]:max-w-full max-md:[&_select]:rounded-full max-md:[&_select]:border-success-line max-md:[&_select]:bg-sidebar-accent max-md:[&_select]:ps-3.5 max-md:[&_select]:font-semibold max-md:[&_select]:text-primary">
            {scope}
          </div>
        ) : null}
        {search ? (
          <div className="relative min-w-40 flex-1 md:max-w-80 [&_input]:h-11 [&_input]:bg-card [&_input]:ps-9 [&_input]:shadow-xs md:pointer-fine:[&_input]:h-9">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            {search}
          </div>
        ) : null}
        {filters || columns ? (
          <div className="ms-auto flex items-center gap-2">
            {filters}
            {columns}
          </div>
        ) : null}
      </div>
      {chips}
    </div>
  );
}
