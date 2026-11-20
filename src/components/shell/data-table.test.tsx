import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, expectTypeOf, it, vi } from "vitest";

import {
  COLUMN_SIZE,
  DataTable,
  DataTablePagination,
  TEXT_MEASURE,
  type ColumnSize,
  type DataTableColumn,
} from "./data-table";
import { RowActions } from "./row-actions";

/**
 * DEC-025 floor for the C7 / INC-130 DataTable contract.
 *
 * The tablet band once crushed dense tables because the twin split was
 * hardcoded at `md` and columns had no min-width contract. These five cases
 * pin the contract at the primitive so no future table can repeat it.
 *
 * Seams: `@/i18n` (identity `t`, so assertions read keys, no catalog loads)
 * and `@tanstack/react-router` (no router is mounted in a unit render).
 */
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }: { children?: React.ReactNode }) => <span>{children}</span>,
}));

type Row = { id: string; name: string; note: string };

const ROWS: Row[] = [
  { id: "a", name: "Alpha", note: "first" },
  { id: "b", name: "Beta", note: "second" },
];

function columns(minWidth?: string): DataTableColumn<Row>[] {
  return [
    {
      key: "name",
      header: "Name",
      priority: "primary",
      size: "name",
      minWidth,
      cell: (row) => <span>{row.name}</span>,
    },
    {
      key: "note",
      header: "Note",
      priority: "secondary",
      size: "text",
      cell: (row) => <span>{row.note}</span>,
    },
  ];
}

function renderTable(props: Partial<React.ComponentProps<typeof DataTable<Row>>> = {}) {
  return render(
    <DataTable<Row>
      columns={columns()}
      rows={ROWS}
      rowKey={(row) => row.id}
      rowTestId={(row) => `row-${row.id}`}
      caption="fixture"
      emptyState={<p data-testid="slot-empty">empty</p>}
      loadingState={<p data-testid="slot-loading">loading</p>}
      errorState={<p data-testid="slot-error">error</p>}
      {...props}
    />,
  );
}

describe("DataTable C7 contract", () => {
  it("ACR-5 keyset mode preserves the whole server page and only permits available navigation", () => {
    const next = vi.fn();
    const previous = vi.fn();
    const { rerender } = renderTable({
      page: 7,
      pageSize: 1,
      keyset: { hasPrevious: false, hasNext: true, onNext: next, onPrevious: previous },
    });
    expect(within(screen.getByRole("table")).getAllByRole("row")).toHaveLength(3);
    fireEvent.click(screen.getByRole("button", { name: "prim.table.previous" }));
    fireEvent.click(screen.getByRole("button", { name: "prim.table.next" }));
    expect(previous).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    rerender(
      <DataTable
        columns={columns()}
        rows={ROWS}
        rowKey={(row) => row.id}
        rowTestId={(row) => row.id}
        caption="fixture"
        emptyState={null}
        keyset={{
          hasPrevious: true,
          hasNext: false,
          busy: true,
          onNext: next,
          onPrevious: previous,
        }}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "prim.table.previous" }));
    fireEvent.click(screen.getByRole("button", { name: "prim.table.next" }));
    expect(previous).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });
  it("DTK-1 an empty keyset page keeps its footer, so Previous stays reachable; an offset empty page draws none", () => {
    const previous = vi.fn();
    const { rerender } = render(
      <DataTable
        columns={columns()}
        rows={[]}
        rowKey={(row: (typeof ROWS)[number]) => row.id}
        rowTestId={(row: (typeof ROWS)[number]) => row.id}
        caption="fixture"
        emptyState="empty"
        keyset={{ hasPrevious: true, hasNext: false, onNext: vi.fn(), onPrevious: previous }}
      />,
    );
    expect(screen.getByTestId("data-table-empty").textContent).toBe("empty");
    fireEvent.click(screen.getByRole("button", { name: "prim.table.previous" }));
    expect(previous).toHaveBeenCalledTimes(1);
    rerender(
      <DataTable
        columns={columns()}
        rows={[]}
        rowKey={(row: (typeof ROWS)[number]) => row.id}
        rowTestId={(row: (typeof ROWS)[number]) => row.id}
        caption="fixture"
        emptyState="empty"
      />,
    );
    expect(screen.queryByTestId("data-table-keyset")).toBeNull();
  });
  it("splits the twins at md when cardUntil is absent (default path)", () => {
    renderTable();
    expect(screen.getByTestId("data-table-cards").className).toContain("tbl-md:hidden");
    expect(screen.getByTestId("data-table-cards").className).not.toContain("lg:hidden");
    expect(screen.getByTestId("data-table-scroller").className).toContain("tbl-md:block");
  });

  it('splits the twins at lg when cardUntil="lg"', () => {
    renderTable({ cardUntil: "lg" });
    expect(screen.getByTestId("data-table-cards").className).toContain("lg:hidden");
    expect(screen.getByTestId("data-table-scroller").className).toContain("lg:block");
    expect(screen.getByTestId("data-table-scroller").className).not.toContain("md:block");
  });

  it("applies a declared column min-width and drops fixed layout", () => {
    const { container } = renderTable({ columns: columns("min-w-40") });
    expect(screen.getByTestId("data-table-col-name").className).toContain("min-w-40");
    const table = container.querySelector("table");
    expect(table?.className).toContain("min-w-max");
    expect(table?.className).not.toContain("table-fixed");
  });

  it("sizes the actions column for the icons it holds: one by default, three on request (INC-542)", () => {
    const actions = () => <button type="button">act</button>;
    const { unmount } = renderTable({ rowActions: actions });
    expect(screen.getByTestId("data-table-col-actions").className).toContain("w-24");
    unmount();
    renderTable({ rowActions: actions, actionsWidth: "w-44" });
    const header = screen.getByTestId("data-table-col-actions").className;
    expect(header).toContain("w-44");
    expect(header).not.toContain("w-24");
  });

  it("keeps fixed layout when no column declares a min-width", () => {
    const { container } = renderTable();
    expect(container.querySelector("table")?.className).toContain("table-fixed");
  });

  it("owns min-w-0/max-w-full on every link of its own scroller chain (INC-132)", () => {
    renderTable({ columns: columns("min-w-40"), className: "flex-1" });
    // frame → body → card → scroller: a single ancestor at min-width:auto
    // would widen the chain and the scroller would never engage.
    const scroller = screen.getByTestId("data-table-scroller");
    expect(scroller.className).toContain("min-w-0");
    expect(scroller.className).toContain("max-w-full");
    const card = screen.getByTestId("data-table");
    expect(card.className).toContain("min-w-0");
    expect(card.className).toContain("max-w-full");
    const frame = card.parentElement!.parentElement!;
    expect(frame.className).toContain("min-w-0");
    expect(frame.className).toContain("max-w-full");
  });

  it('hides a "wide" column below xl and keeps it out of the card twin (INC-135)', () => {
    renderTable({
      columns: [
        ...columns(),
        {
          key: "tail",
          header: "Tail",
          priority: "wide",
          size: "short",
          cell: () => <span data-testid="wide-cell">tail</span>,
        },
      ],
    });
    expect(screen.getByTestId("data-table-col-tail").className).toContain("hidden");
    expect(screen.getByTestId("data-table-col-tail").className).toContain("xl:table-cell");
    // Card twin: primary + secondary only, so a wide column never renders there.
    expect(screen.getAllByTestId("wide-cell")).toHaveLength(ROWS.length);
  });

  it("pins the first column when stickyFirstColumn is set (INC-135)", () => {
    renderTable({ columns: columns("min-w-40"), stickyFirstColumn: true });
    const head = screen.getByTestId("data-table-col-name");
    expect(head.className).toContain("sticky");
    // Logical offset (RTL-safe) and a token background, never a hardcoded one.
    expect(head.className).toContain("start-0");
    expect(head.className).toContain("bg-card");
    expect(screen.getByTestId("data-table-col-note").className).not.toContain("sticky");
  });

  it("leaves the first column unpinned by default", () => {
    renderTable();
    expect(screen.getByTestId("data-table-col-name").className).not.toContain("sticky");
  });

  it('splits the twins at xl when cardUntil="xl" (C2-UI-FIX-3)', () => {
    renderTable({ cardUntil: "xl" });
    expect(screen.getByTestId("data-table-cards").className).toContain("xl:hidden");
    expect(screen.getByTestId("data-table-scroller").className).toContain("xl:block");
    expect(screen.getByTestId("data-table-scroller").className).not.toContain("lg:block");
  });

  it('keeps "wide" columns in the card twin when cardUntil="xl"', () => {
    renderTable({
      cardUntil: "xl",
      columns: [
        ...columns(),
        {
          key: "tail",
          header: "Tail",
          priority: "wide",
          size: "short",
          cell: () => <span data-testid="wide-cell">tail</span>,
        },
      ],
    });
    // Cards are the only presentation below xl, so hiding the wide tier there
    // would drop the content outright: every card carries it.
    expect(screen.getAllByTestId("wide-cell").length).toBeGreaterThan(ROWS.length);
  });

  it("pins header AND body cells at the same offset when a selection column exists (INC-136)", () => {
    render(
      <DataTable<Row>
        columns={columns("min-w-40")}
        rows={ROWS}
        rowKey={(row) => row.id}
        rowTestId={(row) => `row-${row.id}`}
        caption="fixture"
        stickyFirstColumn
        selection={{ selectedKeys: [], onToggleRow: () => {}, onToggleAll: () => {} }}
        emptyState={<p>empty</p>}
      />,
    );
    const head = screen.getByTestId("data-table-col-name");
    expect(head.className).toContain("sticky");
    expect(head.className).toContain("start-10");
    const bodyCell = screen.getByTestId("row-a").querySelectorAll("td")[1]!;
    expect(bodyCell.className).toContain("sticky");
    expect(bodyCell.className).toContain("start-10");
  });

  it("renders the empty, loading and error slots unchanged", () => {
    const empty = renderTable({ rows: [] });
    expect(screen.getByTestId("slot-empty")).toBeTruthy();
    empty.unmount();

    const loading = renderTable({ loading: true });
    expect(screen.getByTestId("slot-loading")).toBeTruthy();
    loading.unmount();

    renderTable({ error: new Error("boom") });
    expect(screen.getByTestId("slot-error")).toBeTruthy();
  });
});

describe("DataTablePagination totalLabel", () => {
  it("prints the numeric total when no label is given", () => {
    render(
      <DataTablePagination
        offset={0}
        pageSize={25}
        total={120}
        onPrevious={() => {}}
        onNext={() => {}}
      />,
    );
    expect(screen.getByTestId("data-table-pagination-range").textContent).toBe(
      "1–25 prim.table.of 120",
    );
  });

  it("substitutes totalLabel for the numeric total", () => {
    render(
      <DataTablePagination
        offset={0}
        pageSize={25}
        total={10001}
        totalLabel="10,000+"
        onPrevious={() => {}}
        onNext={() => {}}
      />,
    );
    expect(screen.getByTestId("data-table-pagination-range").textContent).toBe(
      "1–25 prim.table.of 10,000+",
    );
  });
});

/**
 * Bundle 11 V2 (D132) — the phone card and the one-card frame, as drawn on the
 * agreed boards: a column's `card` place puts it in the card's title, the line
 * under it, the labelled facts, the pills or the footer; RowActions splits
 * into the corner three-dots and the footer's Edit and Delete.
 */
type Place = {
  id: string;
  name: string;
  path: string;
  listings: number;
  order: number;
  active: boolean;
};
const PLACES: Place[] = [
  { id: "p1", name: "Adama", path: "Oromia", listings: 14, order: 3, active: true },
];
const placeColumns: DataTableColumn<Place>[] = [
  {
    key: "name",
    header: "Name",
    priority: "primary",
    size: "name",
    card: "title",
    cell: (r) => r.name,
  },
  {
    key: "path",
    header: "Path",
    priority: "secondary",
    size: "text",
    card: "sub",
    cell: (r) => r.path,
  },
  {
    key: "status",
    header: "Status",
    priority: "primary",
    size: "short",
    card: "badge",
    cell: (r) => <span data-testid={`pill-${r.id}`}>{r.active ? "Active" : "Retired"}</span>,
  },
  {
    key: "listings",
    header: "Listings",
    priority: "detail",
    size: "short",
    card: "meta",
    cell: (r) => <span data-testid={`listings-${r.id}`}>{r.listings}</span>,
  },
  {
    key: "order",
    header: "Order",
    priority: "detail",
    size: "short",
    card: "foot",
    cell: (r) => <span data-testid={`order-${r.id}`}>{r.order}</span>,
  },
  {
    key: "iso",
    header: "ISO",
    priority: "secondary",
    size: "short",
    card: "hide",
    cell: () => <span data-testid="iso-cell">ET-OR</span>,
  },
];

function renderPlaces(props: Partial<React.ComponentProps<typeof DataTable<Place>>> = {}) {
  return render(
    <DataTable<Place>
      columns={placeColumns}
      rows={PLACES}
      rowKey={(r) => r.id}
      rowTestId={(r) => `place-${r.id}`}
      caption="places"
      emptyState={<p>empty</p>}
      {...props}
    />,
  );
}

describe("DataTable V2 card and frame (D132)", () => {
  it("HS-11 a column's card place decides where the card shows it, the facts and notes labelled", () => {
    renderPlaces();
    const card = screen.getByTestId("place-p1-card");
    expect(card).toHaveTextContent("Adama");
    expect(card).toHaveTextContent("Oromia");
    // A detail column with a card place is in the card; its label rides with it.
    expect(within(card).getByTestId("listings-p1")).toHaveTextContent("14");
    expect(card).toHaveTextContent("Listings");
    expect(within(card).getByTestId("pill-p1")).toBeTruthy();
    // "hide" keeps a column to the table: once there, never in the card.
    expect(within(card).queryByTestId("iso-cell")).toBeNull();
    expect(screen.getAllByTestId("iso-cell")).toHaveLength(1);
    // The footer note sits outside the card body, beside the actions.
    expect(within(card).queryByTestId("order-p1")).toBeNull();
    const cards = screen.getByTestId("data-table-cards");
    expect(within(cards).getByTestId("order-p1").parentElement?.parentElement).toHaveTextContent(
      "Order",
    );
  });

  it("HS-12 RowActions splits in the card: the three-dots in its corner, Edit and Delete in its footer, all inside the row's actions region", () => {
    renderPlaces({
      rowActions: (r) => (
        <RowActions
          testid={`act-${r.id}`}
          name={r.name}
          edit={{ label: "Edit", onSelect: () => {} }}
          remove={{ label: "Delete", onSelect: () => {}, disabled: true }}
          more={[{ key: "move", label: "Move", onSelect: () => {} }]}
        />
      ),
    });
    const region = within(screen.getByTestId("data-table-cards")).getByTestId("place-p1-actions");
    // One of each control in the card, none twice.
    expect(within(region).getAllByTestId("act-p1-edit")).toHaveLength(1);
    expect(within(region).getAllByTestId("act-p1-delete")).toHaveLength(1);
    expect(within(region).getAllByTestId("act-p1-more")).toHaveLength(1);
    expect(within(region).getByTestId("act-p1-delete")).toBeDisabled();
    // The three-dots sits apart from the footer's two doors.
    const more = within(region).getByTestId("act-p1-more");
    const edit = within(region).getByTestId("act-p1-edit");
    expect(more.closest(".absolute")).not.toBeNull();
    expect(edit.closest(".absolute")).toBeNull();
    // The table twin keeps all three together in its actions cell.
    const cell = screen.getByTestId("place-p1-actions-cell");
    expect(within(cell).getByTestId("act-p1-more")).toBeTruthy();
    expect(within(cell).getByTestId("act-p1-edit")).toBeTruthy();
  });

  it("HS-13 from cardUntil up the toolbar, the table and the footer share one card; below it each row is its own card", () => {
    renderPlaces({
      cardUntil: "lg",
      toolbar: <input data-testid="tb" />,
      pagination: <div data-testid="pager" />,
    });
    const frame = screen.getByTestId("data-table").parentElement!.parentElement!;
    for (const name of ["lg:rounded-card", "lg:bg-card", "lg:shadow-card"]) {
      expect(frame.className).toContain(name);
    }
    expect(frame.className).not.toContain("lg:border-border");
    expect(frame.className).not.toContain("md:bg-card");
    expect(frame.contains(screen.getByTestId("data-table-toolbar"))).toBe(true);
    expect(frame.contains(screen.getByTestId("pager"))).toBe(true);
    expect(screen.getByTestId("data-table-toolbar").className).toContain("lg:border-b");
    expect(screen.getByTestId("pager").parentElement!.className).toContain("lg:border-t");
    // Below lg the cards stand alone (two to a row from md).
    const cards = screen.getByTestId("data-table-cards");
    expect(cards.className).toContain("md:grid-cols-2");
    const article = within(cards).getByTestId("place-p1-card").closest(".shadow-card");
    expect(article).not.toBeNull();
  });

  it("HS-14 a card cell can leave a fact out of the card while the table keeps it", () => {
    renderPlaces({
      columns: placeColumns.map((column) =>
        column.key === "path" ? { ...column, cardCell: () => null } : column,
      ),
    });
    expect(screen.getByTestId("place-p1-card")).not.toHaveTextContent("Oromia");
    expect(screen.getByTestId("place-p1")).toHaveTextContent("Oromia");
  });

  it("HS-22 the card's facts sit side by side: each label beside its value, all on one wrapping line with the pills", () => {
    renderPlaces({
      columns: [
        ...placeColumns,
        {
          key: "aliases",
          header: "Aliases",
          priority: "detail",
          size: "short",
          card: "meta",
          cell: () => <span data-testid="aliases-p1">2</span>,
        },
      ],
    });
    const card = screen.getByTestId("place-p1-card");
    const listings = card.querySelector('[data-card-fact="listings"]')!;
    const aliases = card.querySelector('[data-card-fact="aliases"]')!;
    expect(listings).toHaveTextContent("Listings14");
    expect(listings.className).toContain("inline-flex");
    expect(aliases.parentElement).toBe(listings.parentElement);
    expect(listings.parentElement!.className).toContain("flex-wrap");
    expect(listings.parentElement!.contains(within(card).getByTestId("pill-p1"))).toBe(true);
  });

  it("HS-21 a fact whose cell names itself draws no label in the card (cardLabel: false)", () => {
    renderPlaces({
      columns: placeColumns.map((column) =>
        column.key === "listings" ? { ...column, cardLabel: false as const } : column,
      ),
    });
    const card = screen.getByTestId("place-p1-card");
    expect(within(card).getByTestId("listings-p1")).toHaveTextContent("14");
    expect(card).not.toHaveTextContent("Listings");
  });

  it("HS-25 a row's expansion stays in its row's box: in the card above its footer, and one band with its table row (V2c)", () => {
    renderPlaces({
      rowActions: (r) => (
        <RowActions
          testid={`act-${r.id}`}
          name={r.name}
          edit={{ label: "Edit", onSelect: () => {} }}
          remove={{ label: "Delete", onSelect: () => {} }}
        />
      ),
      rows: [
        ...PLACES,
        { id: "p2", name: "Bishoftu", path: "Oromia", listings: 2, order: 4, active: true },
      ],
      expandedRow: (r) => (r.id === "p1" ? <p data-testid={`opts-${r.id}`}>Options</p> : null),
    });
    const cards = screen.getByTestId("data-table-cards");
    const box = within(cards).getByTestId("place-p1-actions");
    const expanded = within(box).getByTestId("place-p1-expanded");
    expect(within(expanded).getByTestId("opts-p1")).toBeTruthy();
    // Under the facts, in the name's column, before the footer's Edit.
    const card = within(box).getByTestId("place-p1-card");
    expect(card.compareDocumentPosition(expanded) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(expanded.parentElement).toBe(card.parentElement);
    const edit = within(box).getByTestId("act-p1-edit");
    expect(expanded.compareDocumentPosition(edit) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // A row with no expansion draws none.
    expect(screen.queryByTestId("place-p2-expanded")).toBeNull();
    // The table twin: no line between the row and its expansion, the line after the pair.
    const row = screen.getByTestId("place-p1");
    expect(row.className).not.toContain("border-b");
    const band = screen.getByTestId("place-p1-expanded-row");
    expect(band.className).toContain("border-b");
    expect(row.nextElementSibling).toBe(band);
    expect(within(band).getByTestId("place-p1-expanded").className).toContain("pt-0");
    expect(screen.getByTestId("place-p2").className).toContain("border-b");
  });

  it("HS-26 a picture lead is the row's own picture, 80 px and untinted; the icon lead keeps its tile (bundle 16 turn R1)", () => {
    renderPlaces({
      cardLead: (r) => <img data-testid={`pic-${r.id}`} alt="" />,
      cardLeadKind: "picture",
    });
    const lead = screen.getByTestId("place-p1-lead");
    expect(within(lead).getByTestId("pic-p1")).toBeTruthy();
    expect(lead.className).toContain("w-20");
    expect(lead.className).not.toContain("bg-sidebar-accent");
    expect(lead.getAttribute("aria-hidden")).toBe("true");
    // The default stays the 36 px tile, with no lead testid.
    renderPlaces({ cardLead: (r) => <svg data-testid={`icon-${r.id}`} /> });
    const tile = screen.getByTestId("icon-p1").parentElement;
    expect(tile?.className).toContain("size-9");
    expect(tile?.className).toContain("bg-sidebar-accent");
  });

  it("HS-27 tick-boxes from tablet width up: a card's tick-box hides below md with selectionFrom, and shows everywhere without it (D182 2)", () => {
    const selection = { selectedKeys: [], onToggleRow: vi.fn(), onToggleAll: vi.fn() };
    const { unmount } = renderPlaces({
      selection,
      selectionActions: <button type="button">Bulk</button>,
      selectionFrom: "md",
    });
    expect(screen.getByTestId("place-p1-select").className).toContain("max-md:hidden");
    // The table twin's tick-box is the table's (from cardUntil up): unchanged.
    expect(screen.getByTestId("place-p1-select-cell").className).not.toContain("max-md:hidden");
    unmount();
    renderPlaces({ selection, selectionActions: <button type="button">Bulk</button> });
    expect(screen.getByTestId("place-p1-select").className).not.toContain("max-md:hidden");
  });

  it("HS-28 a row's expansion mounts in the drawn twin only: both while neither is known hidden, then the one the stylesheet shows (P-1c, D313)", () => {
    // A ResizeObserver whose callback the test fires, as a breakpoint flip would.
    const callbacks: Array<() => void> = [];
    const Real = globalThis.ResizeObserver;
    globalThis.ResizeObserver = class {
      constructor(callback: () => void) {
        callbacks.push(callback);
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
    try {
      renderPlaces({
        expandedRow: (r) => (r.id === "p1" ? <p data-testid={`opts-${r.id}`}>Options</p> : null),
      });
      // Without the stylesheet neither twin is hidden: both carry the expansion.
      expect(screen.getAllByTestId("place-p1-expanded")).toHaveLength(2);
      // The cards twin hidden (from cardUntil up): the table's copy alone remains.
      screen.getByTestId("data-table-cards").style.display = "none";
      act(() => callbacks.forEach((callback) => callback()));
      const table = screen.getAllByTestId("place-p1-expanded");
      expect(table).toHaveLength(1);
      expect(table[0]?.tagName).toBe("TD");
      // The table twin hidden instead (a phone): the card's copy alone.
      screen.getByTestId("data-table-cards").style.display = "";
      screen.getByTestId("data-table-scroller").style.display = "none";
      act(() => callbacks.forEach((callback) => callback()));
      const cards = screen.getAllByTestId("place-p1-expanded");
      expect(cards).toHaveLength(1);
      expect(cards[0]?.tagName).toBe("DIV");
    } finally {
      globalThis.ResizeObserver = Real;
    }
  });

  function sized(sizes: Record<string, ColumnSize>): DataTableColumn<Row>[] {
    return Object.entries(sizes).map(([key, size], index) => ({
      key,
      header: key,
      priority: index === 0 ? "primary" : "secondary",
      size,
      cell: (row: Row) => <span data-cell={key}>{`${key}-${row.id}`}</span>,
    }));
  }

  function bodyCell(key: string) {
    const td = document.querySelector(`table [data-cell="${key}"]`)?.closest("td");
    if (!td) throw new Error(`no body cell for ${key}`);
    return td;
  }

  it("DTK-2 column shares follow their weights and add up to 100%", () => {
    renderTable({
      columns: sized({ t: "text", n: "name", s: "short" }),
      selection: { selectedKeys: [], onToggleRow: vi.fn(), onToggleAll: vi.fn() },
      rowActions: () => <span />,
      actionsWidth: "w-44",
    });
    const tickHeader = screen.getByTestId("data-table-select-all").closest("th");
    expect(tickHeader).toHaveClass("w-10");
    expect(tickHeader?.style.width).toBe("");
    const actionsHeader = screen.getByTestId("data-table-col-actions");
    expect(actionsHeader).toHaveClass("w-44", "md:pointer-fine:w-36");
    expect(actionsHeader.style.width).toBe("");
    let total = 0;
    for (const [key, weight] of [
      ["t", 7],
      ["n", 4],
      ["s", 3],
    ] as const) {
      const header = screen.getByTestId(`data-table-col-${key}`);
      expect(header.style.width).toContain("%");
      const share = Number.parseFloat(header.style.width);
      expect(share).toBeCloseTo((weight / 14) * 100);
      total += share;
    }
    expect(total).toBeCloseTo(100);
    expect(COLUMN_SIZE).toEqual({
      control: 2,
      short: 3,
      date: 3,
      name: 4,
      text: 7,
    });
  });

  it("DTK-3 a text cell's content wraps at the measure", () => {
    renderTable({ columns: sized({ n: "name", t: "text", u: "text" }) });
    for (const key of ["t", "u"]) {
      const wrap = bodyCell(key).firstElementChild;
      expect(wrap?.className).toContain(TEXT_MEASURE);
    }
    expect(bodyCell("n").firstElementChild?.className).not.toContain(TEXT_MEASURE);
    expect(TEXT_MEASURE).toBe("max-w-[60ch]");
  });

  it("DTK-4 short and name columns fill 100% with no zero-width column", () => {
    renderTable({ columns: sized({ s: "short", first: "name", second: "name" }) });
    const shares = ["s", "first", "second"].map((key) =>
      Number.parseFloat(screen.getByTestId(`data-table-col-${key}`).style.width),
    );
    expect(shares[0]).toBeCloseTo((3 / 11) * 100);
    expect(shares[1]).toBeCloseTo((4 / 11) * 100);
    expect(shares[2]).toBeCloseTo((4 / 11) * 100);
    expect(shares.every((share) => share > 0)).toBe(true);
    expect(shares.reduce((sum, share) => sum + share, 0)).toBeCloseTo(100);
  });

  it("DTK-5 a min-width table keeps auto layout and scrolls, never table-fixed", () => {
    renderTable({
      columns: sized({ n: "name", t: "text" }).map((column) => ({
        ...column,
        minWidth: "min-w-40", // C7-dense: DTK-5 proves the min-width contract (auto layout, scroll)
      })),
    });
    const table = document.querySelector("table");
    expect(table?.className).toContain("min-w-max");
    expect(table?.className).not.toContain("table-fixed");
    for (const key of ["n", "t"]) {
      expect(screen.getByTestId(`data-table-col-${key}`).style.width).toBe("");
      expect(bodyCell(key).className).toContain("min-w-40");
    }
  });

  it("DTK-6 a column without a size is refused by the type", () => {
    expectTypeOf<DataTableColumn<Row>>().not.toHaveProperty("width");
    expectTypeOf<DataTableColumn<Row>["size"]>().not.toBeNullable();
  });

  it("DTK-7 with no minWidth every data column gets a share and the shares sum to 100%", () => {
    renderTable({ columns: sized({ c: "control", d: "date", n: "name" }) });
    const shares = ["c", "d", "n"].map((key) =>
      Number.parseFloat(screen.getByTestId(`data-table-col-${key}`).style.width),
    );
    expect(shares.every((share) => share > 0)).toBe(true);
    expect(shares.reduce((sum, share) => sum + share, 0)).toBeCloseTo(100);
    expect(document.querySelector("table")?.className).toContain("table-fixed");
  });
  it("DTK-8 a fixed table's header and its sort button wrap; a min-width table's do not change", () => {
    const wrap = ["whitespace-normal", "break-words", "hyphens-auto"];
    renderTable({
      columns: sized({ n: "name", s: "short" }).map((column) =>
        column.key === "s" ? { ...column, header: "Placement badge", sortable: true } : column,
      ),
      onSort: vi.fn(),
    });
    const header = screen.getByTestId("data-table-col-s");
    expect(header).toHaveClass(...wrap);
    expect(within(header).getByRole("button")).toHaveClass(...wrap, "max-w-full");
    document.body.innerHTML = "";
    renderTable({
      columns: sized({ n: "name", s: "short" }).map((column) => ({
        ...column,
        minWidth: "min-w-40", // C7-dense: DTK-8 proves a min-width table keeps its header classes
      })),
    });
    for (const name of wrap) {
      expect(screen.getByTestId("data-table-col-s")).not.toHaveClass(name);
    }
  });

  it("DTK-9 an On/Off value in meta carries its label in the card; a status badge stays bare", () => {
    renderTable({
      columns: [
        ...sized({ n: "name" }),
        {
          key: "enabled",
          header: "Enabled",
          priority: "primary",
          size: "short",
          card: "meta",
          cell: (row: Row) => <span data-testid={`on-${row.id}`}>On</span>,
        },
        {
          key: "status",
          header: "Status",
          priority: "primary",
          size: "short",
          card: "badge",
          cell: (row: Row) => <span data-testid={`st-${row.id}`}>Active</span>,
        },
      ],
    });
    const cards = screen.getByTestId("data-table-cards");
    const fact = cards.querySelector('[data-card-fact="enabled"]');
    expect(fact?.textContent).toBe("EnabledOn");
    const pill = within(cards).getAllByTestId(/^st-/)[0];
    expect(pill?.parentElement?.textContent).toBe("Active");
  });

  it("DTK-10 empty card values draw no label and no separator", () => {
    const empty = (key: string, card: "foot" | "meta", value: (row: Row) => React.ReactNode) => ({
      key,
      header: key === "kept" ? "Updated" : `Label-${key}`,
      priority: "secondary" as const,
      size: "short" as const,
      card,
      cell: value,
    });
    renderTable({
      columns: [
        ...sized({ n: "name" }),
        empty("createdBy", "foot", () => <span className="text-sm"></span>),
        empty("updatedBy", "foot", () => ""),
        empty("kept", "foot", () => <span>today</span>),
        empty("since", "meta", () => <span> </span>),
      ],
    });
    const card = within(screen.getByTestId("data-table-cards")).getAllByRole("listitem")[0];
    const text = card?.textContent ?? "";
    expect(text).not.toContain("Label-createdBy");
    expect(text).not.toContain("Label-updatedBy");
    expect(text).not.toContain("Label-since");
    expect(text).not.toContain("·");
    expect(text).toContain("Updatedtoday");
  });
});
