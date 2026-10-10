import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ColumnsButton } from "./columns-button";
import { useHiddenColumns, visibleColumns } from "./columns-state";
import { TableToolbar } from "./table-toolbar";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

/** BUNDLE 11 A2 (D128) — the Columns button, the remembered choice and the toolbar's places. */
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
});
