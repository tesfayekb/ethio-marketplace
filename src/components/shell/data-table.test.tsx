import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DataTable, DataTablePagination, type DataTableColumn } from "./data-table";
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
      minWidth,
      cell: (row) => <span>{row.name}</span>,
    },
    {
      key: "note",
      header: "Note",
      priority: "secondary",
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
  it("splits the twins at md when cardUntil is absent (default path)", () => {
    renderTable();
    expect(screen.getByTestId("data-table-cards").className).toContain("md:hidden");
    expect(screen.getByTestId("data-table-cards").className).not.toContain("lg:hidden");
    expect(screen.getByTestId("data-table-scroller").className).toContain("md:block");
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
  { key: "name", header: "Name", priority: "primary", card: "title", cell: (r) => r.name },
  { key: "path", header: "Path", priority: "secondary", card: "sub", cell: (r) => r.path },
  {
    key: "status",
    header: "Status",
    priority: "primary",
    card: "badge",
    cell: (r) => <span data-testid={`pill-${r.id}`}>{r.active ? "Active" : "Retired"}</span>,
  },
  {
    key: "listings",
    header: "Listings",
    priority: "detail",
    card: "meta",
    cell: (r) => <span data-testid={`listings-${r.id}`}>{r.listings}</span>,
  },
  {
    key: "order",
    header: "Order",
    priority: "detail",
    card: "foot",
    cell: (r) => <span data-testid={`order-${r.id}`}>{r.order}</span>,
  },
  {
    key: "iso",
    header: "ISO",
    priority: "secondary",
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
    for (const name of ["lg:rounded-lg", "lg:border", "lg:bg-card", "lg:shadow-card"]) {
      expect(frame.className).toContain(name);
    }
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
});
