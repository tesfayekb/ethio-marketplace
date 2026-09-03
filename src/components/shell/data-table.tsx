import { Link, useNavigate, type LinkProps } from "@tanstack/react-router";
import { Fragment, type KeyboardEvent, type ReactNode } from "react";

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

/**
 * C7 / INC-135 — `wide` is the tier ABOVE `detail`: a column that only earns
 * its horizontal budget on a genuinely wide desktop (xl and up). Dense rosters
 * park their numeric tail there so the tablet/laptop band shows the columns an
 * operator acts on, and the scroller carries the rest.
 */
export type ColumnPriority = "primary" | "secondary" | "detail" | "wide";

/**
 * C7 / INC-130 — where the card twin gives way to the table twin. `"xl"`
 * (C2-UI-FIX-3) keeps cards through the whole laptop band: a roster whose
 * table only earns its width on a genuinely wide desktop never scrolls
 * sideways at all, because below xl there is no table to scroll.
 */
export type CardUntil = "md" | "lg" | "xl";


export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  priority: ColumnPriority;
  align?: "start" | "end";
  /** Optional fixed/max width utility class for the table cell. */
  width?: string;
  /**
   * C7 / INC-130 — MIN-WIDTH CONTRACT. A design-token min-width utility class
   * (`min-w-24`, `min-w-40`, …) declared by the column. When ANY column
   * declares one the primitive switches the table to auto layout and lets its
   * own `overflow-x-auto` wrapper scroll — dense tables scroll, they never
   * cramp, and no consumer adds a per-page width hack.
   */
  minWidth?: string;
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
  /**
   * U3a (INC-092) — INLINE ROW EXPANSION. Return the detail region for a row
   * and it renders DIRECTLY beneath that row: inside the 360 card, and as a
   * full-width `<tr>` injected immediately after the table row. Returning
   * `null`/`undefined` renders nothing. Tabular detail is never allowed to
   * appear at page bottom, detached from the row it describes.
   * Testid: `${rowTestId(row)}-expanded`.
   */
  expandedRow?: (row: T) => ReactNode;
  /** Optional bulk-select support. */
  selection?: DataTableSelection<T>;
  /** Pagination controls slot, rendered under the table. */
  pagination?: ReactNode;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (key: string) => void;
  /**
   * C7 / INC-130 — the card/table twin split. `"md"` (default) keeps every
   * pre-existing consumer byte-identical; `"lg"` keeps cards through the
   * tablet band, where dense tables used to crush.
   */
  cardUntil?: CardUntil;
  /**
   * C7 / INC-135 — pin the FIRST column while the table scrolls horizontally,
   * so the row's identity never leaves the viewport. Logical `start-0` keeps it
   * RTL-correct; the card twin is unaffected.
   */
  stickyFirstColumn?: boolean;
  className?: string;
}

function cellClass(column: DataTableColumn<unknown>, sticky = false) {
  return cn(
    "p-3 align-top",
    column.align === "end" ? "text-end" : "text-start",
    column.priority === "detail" && "hidden lg:table-cell",
    column.priority === "wide" && "hidden xl:table-cell",
    // INC-135 — the pinned first column. `start-0` is a LOGICAL offset, so the
    // pin lands on the correct edge in RTL, and the background is the card
    // token (never a hardcoded colour) so scrolled cells pass under it.
    sticky && "sticky start-0 z-10 bg-card",
    column.width,
    column.minWidth,
  );
}

/** The standard pagination filling: Prev / Next plus "from–to of total". */
export function DataTablePagination({
  offset,
  pageSize,
  total,
  totalLabel,
  onPrevious,
  onNext,
  testid = "data-table-pagination",
}: {
  offset: number;
  pageSize: number;
  total: number;
  /**
   * C7 / INC-130 — replaces the numeric total in the range string (the audit
   * console's capped "10,000+"). Paging arithmetic is unchanged.
   */
  totalLabel?: string;
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
        {`${from}–${to} ${t("prim.table.of")} ${totalLabel ?? total}`}
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
  expandedRow,
  selection,
  pagination,
  sortKey,
  sortDirection,
  onSort,
  cardUntil = "md",
  stickyFirstColumn = false,
  className,
}: DataTableProps<T>) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const cardsHiddenClass = cardUntil === "lg" ? "lg:hidden" : "md:hidden";
  const tableShownClass = cardUntil === "lg" ? "lg:block" : "md:block";
  /** Any declared min-width switches the table off fixed layout (C7). */
  const hasMinWidths = columns.some((column) => Boolean(column.minWidth));
  /** U1d: the FIRST primary column carries the row link inside the table. */

  const linkColumnKey = columns.find((column) => column.priority === "primary")?.key;

  const toolbarBlock = toolbar ? (
    <PageCard testid="data-table-toolbar" className="min-w-0">
      <div className="flex min-w-0 flex-col gap-3 md:flex-row md:flex-wrap md:items-end">
        {toolbar}
      </div>
    </PageCard>
  ) : null;

  /**
   * INC-132 — THE SCROLLER CHAIN. `overflow-x-auto` only engages when every
   * ancestor between it and the page column is allowed to be narrower than
   * its content. A single flex/grid ancestor at its default `min-width:auto`
   * silently widens the whole chain and the scroller never activates — the
   * page overflows instead. The primitive therefore owns `min-w-0 max-w-full`
   * on EVERY link of its own chain (frame → body → card → scroller); a
   * consumer never adds a width hack (C7).
   */
  const frame = (body: ReactNode) => (
    <div className={cn("min-w-0 max-w-full space-y-4", className)}>
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

  const cardColumns = columns.filter(
    (column) => column.priority !== "detail" && column.priority !== "wide",
  );
  const selectedKeys = new Set(selection?.selectedKeys ?? []);
  const allSelected = rows.every((row) => selectedKeys.has(rowKey(row)));

  return frame(
    <div className="min-w-0 max-w-full space-y-4">
      {selection && selectedKeys.size > 0 ? (
        <div
          data-testid="data-table-selection"
          className="flex min-w-0 flex-wrap items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2 text-sm text-foreground"
        >
          <span className="tabular-nums">{`${selectedKeys.size} ${t("prim.table.selected")}`}</span>
        </div>
      ) : null}

      <PageCard testid="data-table" className="min-w-0 max-w-full p-0">
        {/* 360-first: a card per row, primary + secondary stacked. */}
        <ul
          data-testid="data-table-cards"
          aria-label={caption}
          className={cn("divide-y divide-border", cardsHiddenClass)}
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
                {expandedRow?.(row) ? (
                  <div data-testid={`${rowTestId(row)}-expanded`} className="min-w-0">
                    {expandedRow(row)}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        {/* md+: a real table. overflow-x-auto is the last resort, never the plan. */}
        <div
          data-testid="data-table-scroller"
          className={cn("hidden min-w-0 max-w-full overflow-x-auto", tableShownClass)}
        >
          <table
            className={cn("w-full text-start text-sm", hasMinWidths ? "min-w-max" : "table-fixed")}
          >
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
                {columns.map((column, index) => (
                  <th
                    key={column.key}
                    data-testid={`data-table-col-${column.key}`}
                    scope="col"
                    className={cn(
                      cellClass(
                        column as DataTableColumn<unknown>,
                        stickyFirstColumn && index === 0,
                      ),
                      "font-medium",
                    )}
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
                const href = rowHref?.(row);
                const go = () => {
                  if (href) void navigate(href as never);
                };
                const expansion = expandedRow?.(row);
                return (
                  <Fragment key={key}>
                    <tr
                      data-testid={rowTestId(row)}
                      className={cn(
                        "border-b border-border last:border-0",
                        href && "cursor-pointer hover:bg-muted/50",
                      )}
                      {...(href
                        ? {
                            role: "link",
                            tabIndex: 0,
                            onClick: go,
                            onKeyDown: (event: KeyboardEvent<HTMLTableRowElement>) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                go();
                              }
                            },
                          }
                        : {})}
                    >
                      {selection ? (
                        <td
                          className="p-3 align-top"
                          onClick={(event) => event.stopPropagation()}
                          onKeyDown={(event) => event.stopPropagation()}
                        >
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
                      {columns.map((column, index) => (
                        <td
                          key={column.key}
                          className={cellClass(
                            column as DataTableColumn<unknown>,
                            stickyFirstColumn && index === 0,
                          )}
                        >
                          {href && column.key === linkColumnKey ? (
                            <Link
                              {...href}
                              data-testid={`${rowTestId(row)}-link`}
                              className="block min-w-0 break-words"
                              onClick={(event) => event.stopPropagation()}
                            >
                              {column.cell(row)}
                            </Link>
                          ) : (
                            <span className="block min-w-0 break-words">{column.cell(row)}</span>
                          )}
                        </td>
                      ))}
                      {rowActions ? (
                        <td
                          data-testid={`${rowTestId(row)}-actions-cell`}
                          className="p-3 text-end align-top"
                          onClick={(event) => event.stopPropagation()}
                          onKeyDown={(event) => event.stopPropagation()}
                        >
                          <span className="flex flex-wrap justify-end gap-2">
                            {rowActions(row)}
                          </span>
                        </td>
                      ) : null}
                    </tr>
                    {expansion ? (
                      <tr
                        data-testid={`${rowTestId(row)}-expanded-row`}
                        className="border-b border-border last:border-0"
                      >
                        <td
                          colSpan={columns.length + (selection ? 1 : 0) + (rowActions ? 1 : 0)}
                          data-testid={`${rowTestId(row)}-expanded`}
                          className="min-w-0 p-3 align-top"
                        >
                          {expansion}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
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
