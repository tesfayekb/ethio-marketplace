import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DataTable, DataTablePagination, type DataTableColumn } from "./data-table";

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
