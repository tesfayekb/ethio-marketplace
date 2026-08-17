import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { PageCard } from "./page-card";

/**
 * U1b — THE DATATABLE PRIMITIVE (shell law).
 *
 * Every admin list renders through this component. It exists because the
 * hand-rolled U1 users list shipped a card list AND a table that duplicated
 * markup, testids and — worse — overflowed the page horizontally at desktop
 * (INC-075).
 *
 * NO-HORIZONTAL-OVERFLOW LAW: no admin page may scroll horizontally at 360,
 * 768 or 1280 (CI-asserted by e2e/shell-table-law.spec.ts). Responsiveness is
 * driven by column PRIORITY, not by scrolling:
 *   - primary   — always rendered (cards and table);
 *   - secondary — rendered in the card body and in the md table;
 *   - detail    — hidden at 360 (reachable through the row link) and only
 *                 shown in the table from lg up.
 * Cells truncate with a `title` tooltip, long text wraps, chips wrap. The
 * `overflow-x-auto` on the table wrapper is a LAST RESORT for data wider than
 * any layout; our own tables must never need it.
 *
 * Testids: container `data-table`, card list `data-table-cards`, header cell
 * `data-table-col-<key>`, card `${rowTestId(row)}-card`, table row
 * `rowTestId(row)`.
 */

export type ColumnPriority = "primary" | "secondary" | "detail";

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  priority: ColumnPriority;
  align?: "start" | "end";
  /** Optional fixed/max width utility class for the table cell. */
  width?: string;
  /** Opt-in sorting; the parent owns the state and receives onSort(key). */
  sortable?: boolean;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  rowTestId: (row: T) => string;
  /** Router link props for the whole row (cards are links, table names are not). */
  rowHref?: (row: T) => LinkProps;
  /** Accessible caption for the table (also the card list's aria-label). */
  caption: string;
  emptyState: ReactNode;
  loading?: boolean;
  loadingState?: ReactNode;
  error?: unknown;
  errorState?: ReactNode;
  /** Pagination controls slot, rendered under the table. */
  pagination?: ReactNode;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (key: string) => void;
  className?: string;
}

function cellClass(column: DataTableColumn<unknown>) {
  return cn(
    "p-3 align-top",
    column.align === "end" ? "text-end" : "text-start",
    column.priority === "detail" && "hidden lg:table-cell",
    column.width,
  );
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  rowTestId,
  rowHref,
  caption,
  emptyState,
  loading = false,
  loadingState,
  error,
  errorState,
  pagination,
  sortKey,
  sortDirection,
  onSort,
  className,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <PageCard testid="data-table-loading" className={className}>
        {loadingState}
      </PageCard>
    );
  }
  if (error) {
    return (
      <PageCard testid="data-table-error" className={className}>
        {errorState}
      </PageCard>
    );
  }
  if (rows.length === 0) {
    return (
      <PageCard testid="data-table-empty" className={className}>
        {emptyState}
      </PageCard>
    );
  }

  const cardColumns = columns.filter((column) => column.priority !== "detail");

  return (
    <div className={cn("space-y-4", className)}>
      <PageCard data-testid="data-table" testid="data-table" className="min-w-0 p-0">
        {/* 360-first: a card per row, primary + secondary stacked. */}
        <ul data-testid="data-table-cards" aria-label={caption} className="divide-y divide-border md:hidden">
          {rows.map((row) => {
            const body = (
              <>
                {cardColumns.map((column) => (
                  <span key={column.key} className="block min-w-0 break-words text-sm">
                    {column.cell(row)}
                  </span>
                ))}
              </>
            );
            const href = rowHref?.(row);
            return (
              <li key={rowKey(row)} className="min-w-0 p-4">
                {href ? (
                  <Link
                    {...href}
                    data-testid={`${rowTestId(row)}-card`}
                    className="block min-h-11 min-w-0 space-y-1"
                  >
                    {body}
                  </Link>
                ) : (
                  <div data-testid={`${rowTestId(row)}-card`} className="min-w-0 space-y-1">
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* md+: a real table. overflow-x-auto is the last resort, never the plan. */}
        <div className="hidden min-w-0 overflow-x-auto md:block">
          <table className="w-full table-fixed text-start text-sm">
            <caption className="sr-only">{caption}</caption>
            <thead className="border-b border-border text-muted-foreground">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    data-testid={`data-table-col-${column.key}`}
                    scope="col"
                    className={cn(cellClass(column as DataTableColumn<unknown>), "font-medium")}
                    aria-sort={
                      sortKey === column.key
                        ? sortDirection === "desc"
                          ? "descending"
                          : "ascending"
                        : undefined
                    }
                  >
                    {column.sortable && onSort ? (
                      <button
                        type="button"
                        className="min-h-11 text-start underline-offset-4 hover:underline"
                        onClick={() => onSort(column.key)}
                      >
                        {column.header}
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={rowKey(row)}
                  data-testid={rowTestId(row)}
                  className="border-b border-border last:border-0"
                >
                  {columns.map((column) => (
                    <td key={column.key} className={cellClass(column as DataTableColumn<unknown>)}>
                      <span className="block min-w-0 break-words">{column.cell(row)}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageCard>

      {pagination}
    </div>
  );
}

export default DataTable;
