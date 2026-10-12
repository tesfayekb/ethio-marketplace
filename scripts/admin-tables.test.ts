import { describe, expect, it } from "vitest";

import { breaches, check, drawsTable, readAdminSources, SECTIONS } from "./admin-tables";

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
  it("TBL-4 every admin table passes every rule", () => {
    const result = check(readAdminSources());
    // The scan finds the tables (a check that reads nothing proves nothing).
    expect(result.tables.length).toBeGreaterThanOrEqual(14);
    expect(result.refusals).toEqual([]);
  });
});
