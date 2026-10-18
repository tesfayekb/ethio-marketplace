import { CARD_SURFACE } from "@/components/layout/surface";
import { Link, useNavigate, type LinkProps } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cloneElement, Fragment, isValidElement, type KeyboardEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NativeSelect } from "@/components/ui/native-select";
import { Toolbar } from "@/components/layout/toolbar";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

import { pageWindow } from "./page-window";
import { RowActions, type RowActionsProps } from "./row-actions";

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

/**
 * Bundle 11 V2 (D132) — where a column sits in the phone card (Filament's
 * stacked-on-mobile layout, the agreed board):
 *   title — the card's first line (the row's name), one per card;
 *   sub   — the muted line under the name;
 *   meta  — a labelled fact on the card's facts line (label and value side
 *           by side; the facts wrap only when they must);
 *   badge — a state pill at the end of the facts line;
 *   foot  — a labelled note in the card's footer, beside Edit and Delete;
 *   hide  — the table only.
 * Unset, the priority decides (detail stays out; wide only at `xl`) and the
 * first column shown is the title, the others facts.
 */
export type CardPlace = "title" | "sub" | "meta" | "badge" | "foot" | "hide";

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
  /** Bundle 11 V2 (D132) — the column's place in the phone card. */
  card?: CardPlace;
  /**
   * Bundle 11 V2 (D132) — what the CARD shows for this column when it differs
   * from the table's cell (the table keeps `cell`). Returning null leaves the
   * fact out of that card: a root category's card has no "—" parent line.
   */
  cardCell?: (row: T) => ReactNode;
  /**
   * Bundle 11 B3 — `false` when the cell already names itself ("Used by 3
   * categories"), so the card draws no label above it.
   */
  cardLabel?: false;
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
   * Bundle 11 B3 (INC-542) — the actions column's width in the table twin, so
   * the row's icons never spill over the column before it. With the cell's
   * padding and RowActions' gap: `w-24` holds one 44 px icon (the default),
   * `w-32` two, `w-44` three (Edit, Delete and the three-dots) — and, where a
   * mouse draws the icons at 36 px (md and up), `w-36`, so the other columns
   * keep the room.
   */
  actionsWidth?: "w-24" | "w-32" | "w-44";
  /**
   * Bundle 11 V2 (D132) — the card's lead tile: an icon (or initials) in a
   * tinted square before the row's name. Decorative; the name says it.
   */
  cardLead?: (row: T) => ReactNode;
  /**
   * Bundle 16 turn R1 (D181) — `"picture"` draws the lead as the row's own
   * picture, 80 px wide and untinted (a seller's ad: its photo with its ribbon),
   * instead of the 36 px icon tile. Decorative either way; the name says it.
   */
  cardLeadKind?: "icon" | "picture";
  /**
   * U3a (INC-092) — INLINE ROW EXPANSION. Return the detail region for a row
   * and it renders DIRECTLY beneath that row: inside the 360 card, and as a
   * full-width `<tr>` injected immediately after the table row. Returning
   * `null`/`undefined` renders nothing. Tabular detail is never allowed to
   * appear at page bottom, detached from the row it describes.
   * Testid: `${rowTestId(row)}-expanded`.
   *
   * Bundle 11 V2c (the operator's walk, 2026-10-11) — the region stays in its
   * row's box: in the card, under the facts and above the footer, in the
   * name's column; in the table, the row and its expansion are one band (no
   * line between them, the expansion's cell starting at the row's bottom).
   */
  expandedRow?: (row: T) => ReactNode;
  /** Optional bulk-select support. */
  selection?: DataTableSelection<T>;
  /** BUNDLE 9 B6 — actions rendered at the end of the selection bar. */
  selectionActions?: ReactNode;
  /**
   * Bundle 16 turn R1 (D182 2) — `"md"`: the tick-boxes appear from tablet width
   * up; a phone's cards act one row at a time (a seller's My listings). Unset,
   * every card carries its tick-box, as before.
   */
  selectionFrom?: "md";
  /** Pagination controls slot, rendered under the table. */
  pagination?: ReactNode;
  /**
   * INC-172 — PAGINATION LIVES IN THE PRIMITIVE. Declare the zero-based `page`
   * and its `pageSize` alongside the `pagination` element and the primitive
   * slices `rows` itself; consumers never hand-slice (a per-page slice is the
   * same class of hack C7 outlawed for widths).
   */
  page?: number;
  pageSize?: number;
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

/** INC-542 — literal classes, so the stylesheet carries each one. */
const ACTIONS_WIDTH_CLASS = {
  "w-24": "w-24",
  "w-32": "w-32",
  "w-44": "w-44 md:pointer-fine:w-36",
} as const;

function cellClass(
  column: DataTableColumn<unknown>,
  sticky: false | "start-0" | "start-10" = false,
) {
  return cn(
    "p-3 align-top",
    column.align === "end" ? "text-end" : "text-start",
    column.priority === "detail" && "hidden lg:table-cell",
    column.priority === "wide" && "hidden xl:table-cell",
    // INC-135 / INC-136 — the pinned first column. `start-*` is a LOGICAL
    // offset, so the pin lands on the correct edge in RTL, and the background
    // is the card token (never a hardcoded colour) so scrolled cells pass
    // under it. When a selection column precedes it, the pin offset is that
    // column's own width (w-10 → start-10); pinning both at 0 made the first
    // data column jump 40px left on the first scroll tick (L11 drift).
    sticky !== false && cn("sticky z-10 bg-card", sticky),
    column.width,
    column.minWidth,
  );
}

/**
 * The standard pagination filling: Prev / Next plus "from–to of total".
 * BUNDLE 9 B3 — three zones (count · rows per page · pages); the page run and
 * the size control appear only through their optional props.
 *
 * Bundle 11 V2 (D132) — one line on a phone: the count, the page size and two
 * arrow tiles (the page run waits for md, where it joins the arrows into one
 * group). The arrows are icons named by their words; RTL mirrors them.
 */
export function DataTablePagination({
  offset,
  pageSize,
  total,
  totalLabel,
  onPrevious,
  onNext,
  testid = "data-table-pagination",
  onPage,
  pageSizeOptions,
  onPageSize,
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
  /** Zero-based page index. When given, the page run is drawn. */
  onPage?: (pageIndex: number) => void;
  pageSizeOptions?: number[];
  onPageSize?: (size: number) => void;
}) {
  const { t } = useI18n();
  const from = total === 0 ? 0 : offset + 1;
  const to = Math.min(offset + pageSize, total);
  const pageCount = total === 0 || pageSize <= 0 ? 0 : Math.ceil(total / pageSize);
  const currentPage = pageSize > 0 ? Math.floor(offset / pageSize) : 0;
  const pages = onPage ? pageWindow(currentPage, pageCount) : [];
  const hasRun = onPage !== undefined && pages.length > 0;
  return (
    <div
      data-testid={testid}
      className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 md:grid md:grid-cols-[1fr_auto_1fr]"
    >
      <span data-testid={`${testid}-range`} className="text-sm tabular-nums text-muted-foreground">
        {`${from}–${to} ${t("prim.table.of")} ${totalLabel ?? total}`}
      </span>

      {pageSizeOptions && onPageSize ? (
        <label className="ms-auto flex items-center gap-2 text-sm text-muted-foreground md:ms-0">
          <span className="max-md:sr-only">{t("prim.table.pageSize")}</span>
          <NativeSelect
            data-testid={`${testid}-size`}
            value={String(pageSize)}
            onChange={(event) => onPageSize(Number(event.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={String(size)}>
                {size}
              </option>
            ))}
          </NativeSelect>
        </label>
      ) : (
        <span className="hidden md:block" />
      )}

      <div
        className={cn(
          "flex items-center gap-1.5 md:justify-self-end",
          pageSizeOptions && onPageSize ? null : "ms-auto md:ms-0",
          "md:gap-0",
        )}
      >
        <Button
          type="button"
          variant="outline"
          className="size-11 p-0 md:pointer-fine:size-9 md:rounded-e-none"
          data-testid={`${testid}-prev`}
          aria-label={t("prim.table.previous")}
          disabled={offset === 0}
          onClick={onPrevious}
        >
          <ChevronLeft aria-hidden="true" className="rtl:rotate-180" />
        </Button>
        {hasRun ? (
          <div className="hidden items-center md:flex">
            {pages.map((entry, index) => {
              if (entry === "gap") {
                return (
                  <span
                    key={`gap-${index}`}
                    aria-hidden="true"
                    className="-ms-px inline-flex h-11 min-w-9 items-center justify-center border border-input bg-card text-sm text-muted-foreground md:pointer-fine:h-9"
                  >
                    …
                  </span>
                );
              }
              const current = entry === currentPage + 1;
              return (
                <Button
                  key={entry}
                  type="button"
                  variant="outline"
                  data-testid={`${testid}-page-${entry}`}
                  aria-label={t("prim.table.page").replace("{n}", String(entry))}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "-ms-px h-11 min-w-9 rounded-none px-3 md:pointer-fine:h-9",
                    current &&
                      "relative z-10 border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                  )}
                  onClick={() => onPage(entry - 1)}
                >
                  {entry}
                </Button>
              );
            })}
          </div>
        ) : null}
        <Button
          type="button"
          variant="outline"
          className="size-11 p-0 md:pointer-fine:size-9 md:-ms-px md:rounded-s-none"
          data-testid={`${testid}-next`}
          aria-label={t("prim.table.next")}
          disabled={to >= total}
          onClick={onNext}
        >
          <ChevronRight aria-hidden="true" className="rtl:rotate-180" />
        </Button>
      </div>
    </div>
  );
}

/**
 * Bundle 11 V2 (D132) — the breakpoint classes, written out whole so the
 * stylesheet carries each one. At and above `cardUntil` the table is ONE card:
 * toolbar, selection bar, table and footer inside a single frame. Below it the
 * toolbar and the footer sit on the page and every row is its own card.
 */
const FRAME_AT: Record<CardUntil, string> = {
  md: "md:space-y-0 md:rounded-card md:bg-card md:shadow-card",
  lg: "lg:space-y-0 lg:rounded-card lg:bg-card lg:shadow-card",
  xl: "xl:space-y-0 xl:rounded-card xl:bg-card xl:shadow-card",
};
const BODY_AT: Record<CardUntil, string> = {
  md: "md:space-y-0",
  lg: "lg:space-y-0",
  xl: "xl:space-y-0",
};
const TOOLBAR_AT: Record<CardUntil, string> = {
  md: "md:border-b md:border-border md:px-4 md:py-3",
  lg: "lg:border-b lg:border-border lg:px-4 lg:py-3",
  xl: "xl:border-b xl:border-border xl:px-4 xl:py-3",
};
const FOOTER_AT: Record<CardUntil, string> = {
  md: "md:border-t md:border-border md:px-4 md:py-3",
  lg: "lg:border-t lg:border-border lg:px-4 lg:py-3",
  xl: "xl:border-t xl:border-border xl:px-4 xl:py-3",
};
const STATE_AT: Record<CardUntil, string> = {
  md: "md:rounded-none md:border-0 md:bg-transparent md:shadow-none",
  lg: "lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none",
  xl: "xl:rounded-none xl:border-0 xl:bg-transparent xl:shadow-none",
};
const SELECTION_AT: Record<CardUntil, string> = {
  md: "md:rounded-none md:border-x-0 md:border-t-0",
  lg: "lg:rounded-none lg:border-x-0 lg:border-t-0",
  xl: "xl:rounded-none xl:border-x-0 xl:border-t-0",
};

/**
 * Bundle 11 V2 (D132) — the card's own split of a row's RowActions: the
 * three-dots go to the card's top corner, Edit and Delete to its footer. Any
 * other actions node is the footer's as it is.
 */
function splitRowActions(node: ReactNode): { top: ReactNode; foot: ReactNode } {
  if (isValidElement<RowActionsProps>(node) && node.type === RowActions) {
    const props = node.props;
    const hasMore = (props.more?.length ?? 0) > 0;
    const hasDoors = props.edit !== undefined || props.remove !== undefined;
    return {
      top: hasMore ? cloneElement(node, { edit: undefined, remove: undefined }) : null,
      foot: hasDoors ? cloneElement(node, { more: undefined }) : null,
    };
  }
  return { top: null, foot: node ?? null };
}

export function DataTable<T>({
  columns,
  rows: allRows,
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
  actionsWidth = "w-24",
  cardLead,
  cardLeadKind = "icon",
  expandedRow,
  selection,
  selectionActions,
  selectionFrom,
  pagination,
  page,
  pageSize,
  sortKey,
  sortDirection,
  onSort,
  cardUntil = "md",
  stickyFirstColumn = false,
  className,
}: DataTableProps<T>) {
  const { t } = useI18n();
  const navigate = useNavigate();
  /** INC-172 — the primitive owns the page window. */
  const rows =
    pageSize && pageSize > 0
      ? allRows.slice((page ?? 0) * pageSize, (page ?? 0) * pageSize + pageSize)
      : allRows;
  const cardsHiddenClass =
    cardUntil === "xl" ? "xl:hidden" : cardUntil === "lg" ? "lg:hidden" : "md:hidden";
  const tableShownClass =
    cardUntil === "xl" ? "xl:block" : cardUntil === "lg" ? "lg:block" : "md:block";
  /**
   * INC-136 — the pin offset. A selection column is 40px (`w-10`) wide and is
   * itself pinned at 0, so the first data column pins at `start-10`.
   */
  const stickyOffset: false | "start-0" | "start-10" = stickyFirstColumn
    ? selection
      ? "start-10"
      : "start-0"
    : false;
  const stickyFor = (index: number) => (index === 0 ? stickyOffset : false);

  /** Any declared min-width switches the table off fixed layout (C7). */
  const hasMinWidths = columns.some((column) => Boolean(column.minWidth));
  /** U1d: the FIRST primary column carries the row link inside the table. */

  const linkColumnKey = columns.find((column) => column.priority === "primary")?.key;

  const toolbarBlock = toolbar ? (
    <div data-testid="data-table-toolbar" className={cn("min-w-0", TOOLBAR_AT[cardUntil])}>
      <Toolbar>{toolbar}</Toolbar>
    </div>
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
    <div className={cn("min-w-0 max-w-full space-y-3", FRAME_AT[cardUntil], className)}>
      {toolbarBlock}
      {body}
    </div>
  );
  const stateBox = (testid: string, node: ReactNode) =>
    frame(
      <div
        data-testid={testid}
        className={cn(
          CARD_SURFACE, "min-w-0 p-6",
          STATE_AT[cardUntil],
        )}
      >
        {node}
      </div>,
    );

  if (loading) return stateBox("data-table-loading", loadingState);
  if (error) return stateBox("data-table-error", errorState);
  if (rows.length === 0) return stateBox("data-table-empty", emptyState);

  /**
   * C2-UI-FIX-3 — when the split is at `xl` the card twin is the ONLY
   * presentation below a wide desktop, so dropping the `wide` tier there would
   * hide that content outright. A vertical card has the room the table row did
   * not: at `cardUntil="xl"` the card carries every column except `detail`.
   *
   * Bundle 11 V2 (D132) — a column's own `card` place wins over its priority.
   */
  const cardColumns = columns.filter((column) =>
    column.card !== undefined
      ? column.card !== "hide"
      : column.priority !== "detail" && (cardUntil === "xl" || column.priority !== "wide"),
  );
  const titleColumn =
    cardColumns.find((column) => column.card === "title") ??
    cardColumns.find((column) => column.card === undefined) ??
    cardColumns[0];
  const placeOf = (column: DataTableColumn<T>): CardPlace =>
    column === titleColumn
      ? "title"
      : column.card === undefined || column.card === "title"
        ? "meta"
        : column.card;
  const inCard = (place: CardPlace) => cardColumns.filter((column) => placeOf(column) === place);
  const subColumns = inCard("sub");
  const metaColumns = inCard("meta");
  const badgeColumns = inCard("badge");
  const footColumns = inCard("foot");

  const selectedKeys = new Set(selection?.selectedKeys ?? []);
  const allSelected = rows.every((row) => selectedKeys.has(rowKey(row)));

  return frame(
    <div className={cn("min-w-0 max-w-full space-y-3", BODY_AT[cardUntil])}>
      {selection && selectedKeys.size > 0 ? (
        <div
          data-testid="data-table-selection"
          className={cn(
            "flex min-w-0 flex-wrap items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2 text-sm text-foreground",
            SELECTION_AT[cardUntil],
          )}
        >
          <span className="tabular-nums">{`${selectedKeys.size} ${t("prim.table.selected")}`}</span>
          {selectionActions ? (
            <div className="ms-auto flex flex-wrap items-center gap-2">{selectionActions}</div>
          ) : null}
        </div>
      ) : null}

      <div data-testid="data-table" className="min-w-0 max-w-full">
        {/*
          Below `cardUntil`: one card per row (Bundle 11 V2, D132). The top line
          is the row's name with its three-dots in the corner, then a line under
          it, then the labelled facts with the state badges at the end, and a
          footer with a note and Edit / Delete.
        */}
        <ul
          data-testid="data-table-cards"
          aria-label={caption}
          className={cn(
            "grid min-w-0 gap-3",
            cardUntil === "md" ? null : "md:grid-cols-2",
            cardsHiddenClass,
          )}
        >
          {rows.map((row) => {
            const key = rowKey(row);
            const rid = rowTestId(row);
            const href = rowHref?.(row);
            const { top, foot } = rowActions
              ? splitRowActions(rowActions(row))
              : { top: null, foot: null };
            const lead = cardLead?.(row);
            const expansion = expandedRow?.(row);
            const label = (column: DataTableColumn<T>) =>
              column.cardLabel !== false &&
              typeof column.header === "string" &&
              column.header !== ""
                ? column.header
                : null;
            /** The card's own value of a column; null, undefined or false leaves it out. */
            const shown = (columns: DataTableColumn<T>[]) =>
              columns
                .map((column) => ({
                  column,
                  value: column.cardCell ? column.cardCell(row) : column.cell(row),
                }))
                .filter(({ value }) => value !== null && value !== undefined && value !== false);
            const subs = shown(subColumns);
            const metas = shown(metaColumns);
            const badges = shown(badgeColumns);
            const notes = shown(footColumns);
            const body = (
              <>
                {/*
                  A cell's tree indent (`data-indent`: a margin or a run of
                  dots) is the table's; the card is not a tree, so it drops it.
                */}
                <span
                  className={cn(
                    "block min-w-0 break-words text-[15px] font-semibold leading-5 text-foreground [&_[data-indent]]:ms-0! [&_span[data-indent][aria-hidden]]:hidden",
                    top ? "pe-9" : null,
                  )}
                >
                  {titleColumn ? titleColumn.cell(row) : null}
                </span>
                {subs.length > 0 ? (
                  <span
                    className={cn(
                      "flex min-w-0 flex-wrap items-center gap-x-1.5 text-[13px] leading-[18px] text-muted-foreground",
                      top ? "pe-9" : null,
                    )}
                  >
                    {subs.map(({ column, value }, index) => (
                      <Fragment key={column.key}>
                        {index > 0 ? <span aria-hidden="true">·</span> : null}
                        <span className="min-w-0 break-words">{value}</span>
                      </Fragment>
                    ))}
                  </span>
                ) : null}
                {/*
                  The facts line (the operator's walk, 2026-10-11): each fact is
                  its label and its value side by side (a value that does not
                  fit beside its label moves under it whole), the facts flow on
                  one line and wrap only when they must; the state pills end
                  the line, and move under the facts when they do not fit.
                */}
                {metas.length > 0 || badges.length > 0 ? (
                  <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5 pt-1">
                    {metas.map(({ column, value }) => (
                      <span
                        key={column.key}
                        data-card-fact={column.key}
                        className="inline-flex min-w-0 max-w-full flex-wrap items-baseline gap-x-1.5 text-sm"
                      >
                        {label(column) ? (
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {label(column)}
                          </span>
                        ) : null}
                        <span className="min-w-0 break-words font-medium tabular-nums text-foreground">
                          {value}
                        </span>
                      </span>
                    ))}
                    {/*
                      A cell that draws a group of pills in its own flex span
                      (Categories' flags) is flattened into this one row, so
                      every pill wraps the same way, at the end.
                    */}
                    {badges.length > 0 ? (
                      <span className="ms-auto flex min-w-0 flex-wrap justify-end gap-1.5 [&>span.flex]:contents">
                        {badges.map(({ column, value }) => (
                          <Fragment key={column.key}>{value}</Fragment>
                        ))}
                      </span>
                    ) : null}
                  </span>
                ) : null}
              </>
            );
            const hasFoot = notes.length > 0 || foot !== null;
            return (
              <li key={key} className="min-w-0">
                <div
                  data-testid={rowActions ? `${rid}-actions` : undefined}
                  className={cn(CARD_SURFACE, "relative flex min-w-0 flex-col")}
                >
                  <div className="flex min-w-0 items-start gap-2.5 px-3 pb-3 pt-3">
                    {selection ? (
                      <Checkbox
                        className={cn("mt-2.5 shrink-0", selectionFrom === "md" && "max-md:hidden")}
                        aria-label={t("prim.table.selectRow")}
                        data-testid={`${rid}-select`}
                        checked={selectedKeys.has(key)}
                        onCheckedChange={(checked) => selection.onToggleRow(row, checked === true)}
                      />
                    ) : null}
                    {lead && cardLeadKind === "picture" ? (
                      <span
                        aria-hidden="true"
                        data-testid={`${rid}-lead`}
                        className="block w-20 shrink-0"
                      >
                        {lead}
                      </span>
                    ) : lead ? (
                      <span
                        aria-hidden="true"
                        className="flex size-9 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-primary [&_svg]:size-[18px]"
                      >
                        {lead}
                      </span>
                    ) : null}
                    <div className="min-w-0 flex-1">
                      {href ? (
                        <Link
                          {...href}
                          data-testid={`${rid}-card`}
                          className="block min-h-11 min-w-0 space-y-1"
                        >
                          {body}
                        </Link>
                      ) : (
                        <div data-testid={`${rid}-card`} className="min-w-0 space-y-1">
                          {body}
                        </div>
                      )}
                      {/* The row's expansion stays in its box, in the name's column (V2c). */}
                      {expansion ? (
                        <div data-testid={`${rid}-expanded`} className="mt-2 min-w-0">
                          {expansion}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {top ? <div className="absolute end-1 top-1">{top}</div> : null}
                  {hasFoot ? (
                    <div className="flex min-h-11 min-w-0 items-center gap-2 rounded-b-lg border-t border-border/70 bg-muted/40 pe-1 ps-3">
                      <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                        {notes.map(({ column, value }, index) => (
                          <Fragment key={column.key}>
                            {index > 0 ? <span aria-hidden="true">·</span> : null}
                            <span className="inline-flex min-w-0 items-baseline gap-1">
                              {label(column) ? <span>{label(column)}</span> : null}
                              <span className="min-w-0 break-words text-foreground">{value}</span>
                            </span>
                          </Fragment>
                        ))}
                      </span>
                      {foot !== null ? (
                        <span className="flex min-w-0 shrink-0 flex-wrap items-center justify-end gap-1">
                          {foot}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>

        {/* At `cardUntil`: a real table. overflow-x-auto is the last resort, never the plan. */}
        <div
          data-testid="data-table-scroller"
          className={cn("hidden min-w-0 max-w-full overflow-x-auto", tableShownClass)}
        >
          <table
            className={cn("w-full text-start text-sm", hasMinWidths ? "min-w-max" : "table-fixed")}
          >
            <caption className="sr-only">{caption}</caption>
            <thead className="border-b border-border text-xs text-muted-foreground">
              <tr>
                {selection ? (
                  <th
                    scope="col"
                    className={cn(
                      "w-10 p-3 align-top",
                      stickyFirstColumn && "sticky start-0 z-10 bg-card",
                    )}
                  >
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
                      cellClass(column as DataTableColumn<unknown>, stickyFor(index)),
                      "font-semibold",
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
                    className={cn(
                      ACTIONS_WIDTH_CLASS[actionsWidth],
                      "p-3 text-end align-top font-semibold",
                    )}
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
                        // With an expansion, the row and its expansion are one
                        // band: the line comes after the expansion (V2c).
                        expansion ? null : "border-b border-border/70 last:border-0",
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
                          className={cn(
                            "p-3 align-top",
                            stickyFirstColumn && "sticky start-0 z-10 bg-card",
                          )}
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
                            stickyFor(index),
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
                        className="border-b border-border/70 last:border-0"
                      >
                        <td
                          colSpan={columns.length + (selection ? 1 : 0) + (rowActions ? 1 : 0)}
                          data-testid={`${rowTestId(row)}-expanded`}
                          className="min-w-0 px-3 pb-3 pt-0 align-top"
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
      </div>

      {pagination ? <div className={cn("min-w-0", FOOTER_AT[cardUntil])}>{pagination}</div> : null}
    </div>,
  );
}

export default DataTable;
