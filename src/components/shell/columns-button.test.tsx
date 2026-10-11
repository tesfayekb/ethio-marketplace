import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ColumnsButton } from "./columns-button";
import { useHiddenColumns, visibleColumns } from "./columns-state";
import { TableActions } from "./table-actions";
import { TableToolbar } from "./table-toolbar";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

/** BUNDLE 11 A2 (D128) — the Columns button, the remembered choice and the toolbar's places; B1 — the scope and the header actions. */
describe("ColumnsButton, useHiddenColumns and TableToolbar", () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("HS-7 the button lists every column, a locked one ticked and disabled, and a tick reports the choice", () => {
    const onToggle = vi.fn();
    render(
      <ColumnsButton
        testid="c"
        columns={[
          { key: "title", label: "Title", locked: true },
          { key: "sent", label: "Sent" },
        ]}
        hidden={["sent"]}
        onToggle={onToggle}
      />,
    );
    expect(screen.getByTestId("c")).toHaveTextContent("prim.table.columns");
    fireEvent.click(screen.getByTestId("c"));
    const title = screen.getByTestId("c-title");
    const sent = screen.getByTestId("c-sent");
    expect(title).toHaveAttribute("data-state", "checked");
    expect(title).toBeDisabled();
    expect(sent).toHaveAttribute("data-state", "unchecked");
    fireEvent.click(sent);
    expect(onToggle).toHaveBeenCalledWith("sent", true);
  });

  it("HS-8 the hidden columns are remembered per table, and failing storage hides nothing", () => {
    const first = renderHook(() => useHiddenColumns("t1"));
    act(() => first.result.current[1]("sent", false));
    expect(first.result.current[0]).toEqual(["sent"]);
    const again = renderHook(() => useHiddenColumns("t1"));
    expect(again.result.current[0]).toEqual(["sent"]);
    const other = renderHook(() => useHiddenColumns("t2"));
    expect(other.result.current[0]).toEqual([]);
    act(() => first.result.current[1]("sent", true));
    expect(renderHook(() => useHiddenColumns("t1")).result.current[0]).toEqual([]);

    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const blocked = renderHook(() => useHiddenColumns("t3"));
    expect(blocked.result.current[0]).toEqual([]);
    act(() => blocked.result.current[1]("sent", false));
    expect(blocked.result.current[0]).toEqual(["sent"]);
  });

  it("HS-9 a table draws its locked columns always and the others unless hidden; the toolbar places its parts", () => {
    const columns = [{ key: "title" }, { key: "place" }, { key: "sent" }];
    expect(visibleColumns(columns, ["title", "sent"], ["title"]).map((c) => c.key)).toEqual([
      "title",
      "place",
    ]);
    render(
      <TableToolbar
        testid="tb"
        search={<input data-testid="tb-search" />}
        filters={<button data-testid="tb-filters" />}
        columns={<button data-testid="tb-columns" />}
        chips={<div data-testid="tb-chips" />}
      />,
    );
    const bar = screen.getByTestId("tb");
    const order = Array.from(bar.querySelectorAll("[data-testid^='tb-']")).map((el) =>
      el.getAttribute("data-testid"),
    );
    expect(order).toEqual(["tb-search", "tb-filters", "tb-columns", "tb-chips"]);
  });

  it("HS-10 a scope control comes before the search; the header actions keep their order and draw nothing when empty", () => {
    render(
      <TableToolbar
        testid="sc"
        scope={<select data-testid="sc-scope" />}
        search={<input data-testid="sc-search" />}
        filters={<button data-testid="sc-filters" />}
        columns={<button data-testid="sc-columns" />}
      />,
    );
    const bar = screen.getByTestId("sc");
    expect(
      Array.from(bar.querySelectorAll("[data-testid^='sc-']")).map((el) =>
        el.getAttribute("data-testid"),
      ),
    ).toEqual(["sc-scope", "sc-search", "sc-filters", "sc-columns"]);

    render(
      <TableActions testid="ha">
        <button data-testid="ha-export" />
        <button data-testid="ha-new" />
      </TableActions>,
    );
    expect(
      Array.from(screen.getByTestId("ha").querySelectorAll("button")).map((el) =>
        el.getAttribute("data-testid"),
      ),
    ).toEqual(["ha-export", "ha-new"]);
    render(<TableActions testid="none">{null}</TableActions>);
    expect(screen.queryByTestId("none")).toBeNull();
  });

  it("HS-19 the header carries the page's one heading; Show all brings back every hidden column (D132)", () => {
    render(
      <TableActions testid="hd" title="Places">
        <button data-testid="hd-new" />
      </TableActions>,
    );
    expect(screen.getByTestId("hd").querySelector("h1")).toHaveTextContent("Places");
    render(<TableActions testid="hd2" title="Coverage" />);
    expect(screen.getByTestId("hd2").querySelector("h1")).toHaveTextContent("Coverage");

    const onToggle = vi.fn();
    render(
      <ColumnsButton
        testid="cc"
        columns={[
          { key: "title", label: "Title", locked: true },
          { key: "sent", label: "Sent" },
          { key: "place", label: "Place" },
        ]}
        hidden={["sent", "place"]}
        onToggle={onToggle}
      />,
    );
    fireEvent.click(screen.getByTestId("cc"));
    fireEvent.click(screen.getByTestId("cc-all"));
    expect(onToggle.mock.calls).toEqual([
      ["sent", true],
      ["place", true],
    ]);
    fireEvent.click(screen.getByTestId("cc-done"));
    expect(screen.queryByTestId("cc-panel")).toBeNull();
  });
});
