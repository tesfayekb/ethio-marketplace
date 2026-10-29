import { describe, expect, it } from "vitest";

import { breaches, check, drawsTable, readTableSources, SECTIONS } from "./admin-tables";

/**
 * Bundle 11, Part C (turn C1) — the agreed tables' check, proven on planted
 * files (each rule refuses its own breach), then run on the real tree.
 */
const GOOD = `
import { useKeptPage } from "@/components/shell/use-kept-page";
export function Page() {
  const { page, pageSize } = useKeptPage("ethio.admin.x.pageSize");
  const [hidden] = useHiddenColumns("x");
  const columns = [{ key: "name", card: "title" }];
  return (
    <>
      <TableActions testid="x-header" />
      <DataTable
        toolbar={<TableToolbar><FiltersButton /><ColumnsButton /><FilterChips /></TableToolbar>}
        rowActions={(row) => <RowActions testid={row.id} name="x" />}
        pagination={<DataTablePagination />}
      />
    </>
  );
}
`;

const without = (text: string, piece: string) => {
  expect(text).toContain(piece);
  return text.replace(piece, "");
};

describe("the agreed tables' check — planted files", () => {
  it("ACR-6 keyset accepts server navigation only; removing it still fails the footer rule", () => {
    const keyed = GOOD.replace('const { page, pageSize } = useKeptPage("ethio.admin.x.pageSize");', "")
      .replace("pagination={<DataTablePagination />}", "keyset={{ hasNext, hasPrevious, onNext, onPrevious }}");
    expect(breaches("src/features/admin-x/x-page.tsx", keyed)).toEqual([]);
    expect(breaches("src/features/admin-x/x-page.tsx", keyed.replace("keyset=", "missing="))).toEqual(["T6"]);
  });
  it("TBL-1 a page on every block passes; each missing block names its own rule", () => {
    expect(drawsTable(GOOD)).toBe(true);
    expect(breaches("src/features/admin-x/x-page.tsx", GOOD)).toEqual([]);
    const f = "src/features/admin-x/x-page.tsx";
    expect(breaches(f, without(GOOD, '<TableActions testid="x-header" />'))).toEqual(["T1"]);
    expect(breaches(f, GOOD.replace("<TableToolbar>", "<div>"))).toEqual(["T2"]);
    expect(breaches(f, without(GOOD, "<ColumnsButton />"))).toEqual(["T3"]);
    expect(breaches(f, without(GOOD, "<FilterChips />"))).toEqual(["T4"]);
    expect(breaches(f, GOOD.replace("<RowActions", "<Button"))).toEqual(["T5"]);
    expect(breaches(f, without(GOOD, "pagination={<DataTablePagination />}"))).toEqual(["T6"]);
    expect(breaches(f, GOOD.replace('card: "title"', 'card: "meta"'))).toEqual(["T7"]);
    expect(
      breaches(f, GOOD.replace("pagination={", "selection={picked}\n        pagination={")),
    ).toEqual(["T8"]);
    expect(
      breaches(
        f,
        GOOD.replace(
          "pagination={",
          "selection={picked}\n        selectionActions={<Bar />}\n        pagination={",
        ),
      ),
    ).toEqual([]);
    // T9 (D142) — a row that opens its page and has a three-dots menu offers Open.
    const linked = GOOD.replace(
      "pagination={",
      "rowHref={(row) => ({ to: row.id })}\n        pagination={",
    );
    expect(breaches(f, linked)).toEqual([]);
    const withMenu = linked.replace(
      '<RowActions testid={row.id} name="x" />',
      '<RowActions testid={row.id} name="x" more={[{ key: "members", label: "M", onSelect }]} />',
    );
    expect(breaches(f, withMenu)).toEqual(["T9"]);
    expect(
      breaches(f, withMenu.replace("more={[{", 'more={[{ key: "open", label: "O", onSelect }, {')),
    ).toEqual([]);
  });

  it("TBL-2 the conditional rules: no Filters asks no chips; a details toggle may stand for RowActions; any localStorage breaks T6; comments are not blocks", () => {
    const f = "src/features/admin-x/x-page.tsx";
    expect(breaches(f, without(without(GOOD, "<FiltersButton />"), "<FilterChips />"))).toEqual([]);
    const toggle = GOOD.replace(
      'rowActions={(row) => <RowActions testid={row.id} name="x" />}',
      "rowActions={(row) => <Button onClick={() => open(row.id)} />}\n        expandedRow={(row) => <Details row={row} />}",
    );
    expect(breaches(f, toggle)).toEqual([]);
    const ownSize = GOOD.replace(
      "const [hidden]",
      'window.localStorage.setItem("ethio.admin.x.pageSize", "10");\n  const [hidden]',
    );
    expect(breaches(f, ownSize)).toEqual(["T6"]);
    const commented = GOOD.replace(
      '<TableActions testid="x-header" />',
      '{/* <TableActions testid="x-header" /> */}',
    );
    expect(breaches(f, commented)).toEqual(["T1"]);
    expect(drawsTable("<DataTablePagination />")).toBe(false);
  });

  it("TBL-3 a declared section takes its host's heading; an undeclared one, or a host that does not draw it, is refused", () => {
    const [section, host] = Object.entries(SECTIONS)[0]!;
    const sectionText = without(GOOD, '<TableActions testid="x-header" />');
    const name = section.replace(/^.*\//, "").replace(/\.tsx$/, "");
    const hostText = `${GOOD}\nimport { Section } from "./${name}";`;
    expect(
      check([
        { file: section, text: sectionText },
        { file: host, text: hostText },
      ]).refusals,
    ).toEqual([]);
    expect(
      check([
        { file: section, text: sectionText },
        { file: host, text: GOOD },
      ]).refusals,
    ).toEqual([`${section}: T1 — its host ${host} does not draw it`]);
    expect(check([{ file: "src/features/admin-x/inner.tsx", text: sectionText }]).refusals).toEqual(
      ["src/features/admin-x/inner.tsx: T1 — the page's heading in the header (TableActions)"],
    );
  });
});

describe("the agreed tables' check — the real tree", () => {
  it("TBL-4 every table passes every rule", () => {
    const result = check(readTableSources());
    // The scan finds the tables (a check that reads nothing proves nothing).
    expect(result.tables.length).toBeGreaterThanOrEqual(15);
    expect(result.refusals).toEqual([]);
  });

  it("TBL-5 the check reads the user's tables too, not only the admin's (INC-630)", () => {
    const sources = readTableSources();
    const tables = check(sources).tables;
    expect(tables).toContain("src/features/my-listings/my-listings-page.tsx");
    expect(tables.some((file) => file.startsWith("src/features/admin"))).toBe(true);
    // My listings as it stood before turn R1 — its own table, footer and chips, nothing else — is refused.
    const before = `
import { useKeptPage } from "@/components/shell/use-kept-page";
export function MyListingsPage() {
  const paging = useKeptPage("ethio.myListings.pageSize");
  const columns = [{ key: "title", card: "title" }];
  return (
    <PageShell>
      <PageHeader title="x" />
      <FilterChoices testid="my-listings-group" />
      <DataTable
        rowActions={(row) => <Button asChild><Link to="/my-listings/$listingId" /></Button>}
        pagination={<DataTablePagination />}
      />
    </PageShell>
  );
}
`;
    expect(
      check([{ file: "src/features/my-listings/my-listings-page.tsx", text: before }]).refusals,
    ).toEqual([
      "src/features/my-listings/my-listings-page.tsx: T1 — the page's heading in the header (TableActions)",
      "src/features/my-listings/my-listings-page.tsx: T2 — the toolbar (TableToolbar)",
      "src/features/my-listings/my-listings-page.tsx: T3 — Columns (ColumnsButton with useHiddenColumns)",
      "src/features/my-listings/my-listings-page.tsx: T5 — the row's actions as RowActions (or the toggle of the row's expandedRow)",
    ]);
  });
});
