import { Link, useNavigate, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

import { PageCard } from "./page-card";

/**
 * U1b/U1c — THE DATATABLE PRIMITIVE (shell law).
 *
 * Every admin list renders through this component. It exists because the
 * hand-rolled U1 users list shipped a card list AND a table that duplicated
 * markup, testids and — worse — overflowed the page horizontally at desktop
 * (INC-075).
 *
 * NO-HORIZONTAL-OVERFLOW LAW: no admin page may scroll horizontally at 360,
 * 768 or 1280 (CI-asserted by e2e/shell-table-law.spec.ts and
 * e2e/primitives-law.spec.ts). Responsiveness is driven by column PRIORITY,
 * not by scrolling:
 *   - primary   — always rendered (cards and table);
 *   - secondary — rendered in the card body and in the md table;
 *   - detail    — hidden at 360 (reachable through the row link) and only
 *                 shown in the table from lg up.
 * Cells truncate with a `title` tooltip, long text wraps, chips wrap. The
 * `overflow-x-auto` on the table wrapper is a LAST RESORT for data wider than
 * any layout; our own tables must never need it.
 *
 * U1c slots (all OPTIONAL — existing call sites are unaffected):
 *   toolbar     — search/filter controls above the list; wraps at 360;
 *   rowActions  — per-row controls (inline in the card, end column at md);
 *   selection   — checkbox column plus a selected-count bar;
 *   pagination  — free slot; `DataTablePagination` is the standard filling.
 *
 * Testids: container `data-table`, card list `data-table-cards`, header cell
 * `data-table-col-<key>`, card `${rowTestId(row)}-card`, table row
 * `rowTestId(row)`, toolbar `data-table-toolbar`, selection bar
 * `data-table-selection`.
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

export interface DataTableSelection<T> {
  selectedKeys: string[];
  onToggleRow: (row: T, selected: boolean) => void;
  onToggleAll: (selected: boolean) => void;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  rowTestId: (row: T) => string;
  /**
   * Router link props for the whole row. U1d (INC-077): this applies to BOTH
   * responsive twins — the 360 card is a Link, and the md+ table row renders
   * its first primary cell as a Link, navigates on click anywhere in the row,
   * and is keyboard reachable (role="link", tabIndex, Enter).
   */
  rowHref?: (row: T) => LinkProps;

  /** Accessible caption for the table (also the card list's aria-label). */
  caption: string;
  emptyState: ReactNode;
  loading?: boolean;
  loadingState?: ReactNode;
  error?: unknown;
  errorState?: ReactNode;
  /** Search + filter controls rendered above the list. */
  toolbar?: ReactNode;
  /** Per-row controls: inline in the 360 card, trailing column at md. */
  rowActions?: (row: T) => ReactNode;
  /** Optional bulk-select support. */
  selection?: DataTableSelection<T>;
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

/** The standard pagination filling: Prev / Next plus "from–to of total". */
export function DataTablePagination({
  offset,
  pageSize,
  total,
  onPrevious,
  onNext,
  testid = "data-table-pagination",
}: {
  offset: number;
  pageSize: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  testid?: string;
}) {
  const { t } = useI18n();
  const from = total === 0 ? 0 : offset + 1;
  const to = Math.min(offset + pageSize, total);
  return (
    <div data-testid={testid} className="flex min-w-0 flex-wrap items-center justify-between gap-3">
      <span data-testid={`${testid}-range`} className="text-sm tabular-nums text-muted-foreground">
        {`${from}–${to} ${t("prim.table.of")} ${total}`}
      </span>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          data-testid={`${testid}-prev`}
          disabled={offset === 0}
          onClick={onPrevious}
        >
          {t("prim.table.previous")}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          data-testid={`${testid}-next`}
          disabled={to >= total}
          onClick={onNext}
        >
          {t("prim.table.next")}
        </Button>
      </div>
    </div>
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
  toolbar,
  rowActions,
  selection,
  pagination,
  sortKey,
  sortDirection,
  onSort,
  className,
}: DataTableProps<T>) {
  const { t } = useI18n();
  const navigate = useNavigate();
  /** U1d: the FIRST primary column carries the row link inside the table. */
  const linkColumnKey = columns.find((column) => column.priority === "primary")?.key;


  const toolbarBlock = toolbar ? (
    <PageCard testid="data-table-toolbar" className="min-w-0">
      <div className="flex min-w-0 flex-col gap-3 md:flex-row md:flex-wrap md:items-end">
        {toolbar}
      </div>
    </PageCard>
  ) : null;

  const frame = (body: ReactNode) => (
    <div className={cn("space-y-4", className)}>
      {toolbarBlock}
      {body}
    </div>
  );

  if (loading) {
    return frame(<PageCard testid="data-table-loading">{loadingState}</PageCard>);
  }
  if (error) {
    return frame(<PageCard testid="data-table-error">{errorState}</PageCard>);
  }
  if (rows.length === 0) {
    return frame(<PageCard testid="data-table-empty">{emptyState}</PageCard>);
  }

  const cardColumns = columns.filter((column) => column.priority !== "detail");
  const selectedKeys = new Set(selection?.selectedKeys ?? []);
  const allSelected = rows.every((row) => selectedKeys.has(rowKey(row)));

  return frame(
    <div className="min-w-0 space-y-4">
      {selection && selectedKeys.size > 0 ? (
        <div
          data-testid="data-table-selection"
          className="flex min-w-0 flex-wrap items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2 text-sm text-foreground"
        >
          <span className="tabular-nums">{`${selectedKeys.size} ${t("prim.table.selected")}`}</span>
        </div>
      ) : null}

      <PageCard testid="data-table" className="min-w-0 p-0">
        {/* 360-first: a card per row, primary + secondary stacked. */}
        <ul
          data-testid="data-table-cards"
          aria-label={caption}
          className="divide-y divide-border md:hidden"
        >
          {rows.map((row) => {
            const key = rowKey(row);
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
              <li key={key} className="min-w-0 space-y-2 p-4">
                <div className="flex min-w-0 items-start gap-3">
                  {selection ? (
                    <Checkbox
                      className="mt-1 shrink-0"
                      aria-label={t("prim.table.selectRow")}
                      data-testid={`${rowTestId(row)}-select`}
                      checked={selectedKeys.has(key)}
                      onCheckedChange={(checked) => selection.onToggleRow(row, checked === true)}
                    />
                  ) : null}
                  <div className="min-w-0 flex-1">
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
                  </div>
                </div>
                {rowActions ? (
                  <div
                    data-testid={`${rowTestId(row)}-actions`}
                    className="flex min-w-0 flex-wrap gap-2"
                  >
                    {rowActions(row)}
                  </div>
                ) : null}
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
                {selection ? (
                  <th scope="col" className="w-10 p-3 align-top">
                    <Checkbox
                      aria-label={t("prim.table.selectAll")}
                      data-testid="data-table-select-all"
                      checked={allSelected}
                      onCheckedChange={(checked) => selection.onToggleAll(checked === true)}
                    />
                  </th>
                ) : null}
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
                {rowActions ? (
                  <th
                    scope="col"
                    data-testid="data-table-col-actions"
                    className="w-24 p-3 text-end align-top font-medium"
                  >
                    {t("prim.table.actions")}
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const key = rowKey(row);
                return (
                  <tr
                    key={key}
                    data-testid={rowTestId(row)}
                    className="border-b border-border last:border-0"
                  >
                    {selection ? (
                      <td className="p-3 align-top">
                        <Checkbox
                          aria-label={t("prim.table.selectRow")}
                          data-testid={`${rowTestId(row)}-select-cell`}
                          checked={selectedKeys.has(key)}
                          onCheckedChange={(checked) =>
                            selection.onToggleRow(row, checked === true)
                          }
                        />
                      </td>
                    ) : null}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cellClass(column as DataTableColumn<unknown>)}
                      >
                        <span className="block min-w-0 break-words">{column.cell(row)}</span>
                      </td>
                    ))}
                    {rowActions ? (
                      <td
                        data-testid={`${rowTestId(row)}-actions-cell`}
                        className="p-3 text-end align-top"
                      >
                        <span className="flex flex-wrap justify-end gap-2">{rowActions(row)}</span>
                      </td>
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PageCard>

      {pagination}
    </div>,
  );
}

export default DataTable;
