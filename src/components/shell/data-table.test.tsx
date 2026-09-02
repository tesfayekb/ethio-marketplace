import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  ACTIONS_COLUMN_MIN_WIDTH,
  DataTable,
  DEFAULT_COLUMN_MIN_WIDTH,
  type DataTableColumn,
} from "./data-table";

/**
 * U4i-10 (INC-126b) — THE SCROLL-NOT-CRAMP LAW, proved at the primitive.
 * The tablet band (768–1024) belonged to no one: the table twin appeared at
 * `md` and its cells were compressed into vertical text. The primitive now
 * owns the scroll container, the summed column min-width contract and the
 * `cardUntil` twin breakpoint, so no page can repeat the defect.
 *
 * Seams: `@/i18n` (identity `t`) and the router (`Link`/`useNavigate` are only
 * reachable via `rowHref`, which these cases do not use).
 */
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children?: React.ReactNode }) => <span>{children}</span>,
  useNavigate: () => () => {},
}));

interface Row {
  code: string;
  name: string;
}

const rows: Row[] = [
  { code: "en", name: "English" },
  { code: "am", name: "Amharic" },
];

const columns: DataTableColumn<Row>[] = [
  { key: "code", header: "Code", priority: "primary", minWidth: 120, cell: (row) => row.code },
  { key: "name", header: "Name", priority: "secondary", minWidth: 200, cell: (row) => row.name },
  // No `minWidth` — the default floor applies.
  { key: "extra", header: "Extra", priority: "detail", cell: () => "-" },
];

function renderTable(props: Partial<Parameters<typeof DataTable<Row>>[0]> = {}) {
  return render(
    <DataTable<Row>
      columns={columns}
      rows={rows}
      rowKey={(row) => row.code}
      rowTestId={(row) => `row-${row.code}`}
      caption="languages"
      emptyState={<p>empty</p>}
      {...props}
    />,
  );
}

describe("DataTable scroll-not-cramp contract", () => {
  it("always wraps the table twin in a horizontal scroll container", () => {
    renderTable();
    expect(screen.getByTestId("data-table-scroll").className).toContain("overflow-x-auto");
  });

  it("sets the table min-width to the summed column contract", () => {
    renderTable();
    const table = screen.getByTestId("data-table-scroll").querySelector("table");
    expect(table).not.toBeNull();
    expect(table?.style.minWidth).toBe(`${120 + 200 + DEFAULT_COLUMN_MIN_WIDTH}px`);
  });

  it("adds the actions column to the min-width contract", () => {
    renderTable({ rowActions: () => <button type="button">act</button> });
    const table = screen.getByTestId("data-table-scroll").querySelector("table");
    expect(table?.style.minWidth).toBe(
      `${120 + 200 + DEFAULT_COLUMN_MIN_WIDTH + ACTIONS_COLUMN_MIN_WIDTH}px`,
    );
  });

  it("defaults the twin breakpoint to md", () => {
    renderTable();
    expect(screen.getByTestId("data-table-cards").className).toContain("md:hidden");
    expect(screen.getByTestId("data-table-scroll").className).toContain("md:block");
  });

  it("cardUntil='lg' keeps cards through the tablet band and hides the table below lg", () => {
    renderTable({ cardUntil: "lg" });
    const cards = screen.getByTestId("data-table-cards");
    expect(cards.className).toContain("lg:hidden");
    expect(cards.className).not.toContain("md:hidden");
    // The card markup is real, not a placeholder: one card per row.
    expect(screen.getByTestId("row-en-card")).toBeInTheDocument();
    expect(screen.getByTestId("row-am-card")).toBeInTheDocument();
    const scroll = screen.getByTestId("data-table-scroll");
    expect(scroll.className).toContain("hidden");
    expect(scroll.className).toContain("lg:block");
    expect(scroll.className).not.toContain("md:block");
  });
});
