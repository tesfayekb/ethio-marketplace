import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, expectTypeOf, it, vi } from "vitest";
import {
  clearTableFilters,
  tableFilterChips,
  tableFilterState,
  useTableFilters,
  type TableFilter,
  type TableSelectFilter,
} from "./table-filters";
import { tableViewTestShell } from "./table-view-test-shell";
import { forgetTableViewsForTests } from "./table-view-store";

const options = Array.from({ length: 21 }, (_, index) => ({
  value: `v${index}`,
  label: `Choice ${index} · ${index}`,
}));
function declaration(
  value: readonly string[],
  onChange: (next: string[]) => void = vi.fn(),
): TableSelectFilter {
  return {
    kind: "select",
    id: "f",
    chipKey: "f",
    name: "Choices",
    kept: true,
    multiple: true,
    options,
    value,
    onChange,
  };
}
describe("one table filter declaration", () => {
  it("FP-U18 one declaration drives checked values, per-value chips, state and the 20-choice cap", () => {
    const hook = renderHook(() => {
      const [value, onChange] = useState<string[]>([]);
      return useTableFilters("filter-cap", [declaration(value, onChange)]);
    });
    const filter = hook.result.current.filters[0];
    if (filter?.kind !== "select") throw new Error("select missing");
    act(() => filter.onChange([...options.map((option) => option.value), "outside"]));
    const checked = hook.result.current.filters;
    expect(checked[0]?.value).toEqual(options.slice(0, 20).map((option) => option.value));
    expect(tableFilterChips(checked)).toHaveLength(20);
    expect(tableFilterState(checked)).toBe(
      JSON.stringify([["f", options.slice(0, 20).map((option) => option.value)]]),
    );
    expectTypeOf<TableSelectFilter["value"]>().toEqualTypeOf<readonly string[]>();
  });
  it("FP-U19 clearing and removing use the declaration's setters; counted labels are retained", () => {
    const change = vi.fn();
    const filters = [declaration(["v0", "v1"], change)];
    const chips = tableFilterChips(filters);
    expect(chips.map((chip) => chip.label)).toEqual(["Choice 0 · 0", "Choice 1 · 1"]);
    chips[0]?.onRemove();
    expect(change).toHaveBeenLastCalledWith(["v1"]);
    clearTableFilters(filters);
    expect(change).toHaveBeenLastCalledWith([]);
  });
  it("FP-U20 typed text and dates never enter the account-backed kept offer", () => {
    forgetTableViewsForTests();
    const filters: TableFilter[] = [
      declaration(["v0"]),
      {
        kind: "text",
        id: "q",
        chipKey: "q",
        name: "Search",
        value: "private",
        placeholder: "Search",
        onChange: vi.fn(),
        kept: false,
      },
      {
        kind: "dates",
        id: "d",
        chipKey: "d",
        name: "Dates",
        value: { from: "2026-11-01", to: "2026-11-22" },
        onChange: vi.fn(),
        fromLabel: "From",
        toLabel: "To",
        maxDate: "2026-11-22",
        kept: false,
      },
    ];
    const hook = renderHook(() => useTableFilters("private-input", filters), {
      wrapper: tableViewTestShell("filter-account"),
    });
    const filter = hook.result.current.filters[0];
    if (filter?.kind !== "select") throw new Error("select missing");
    act(() => filter.onChange(["v1"]));
    expect(
      JSON.parse(localStorage.getItem("ethio:view:filter-account:private-input") ?? "null"),
    ).toEqual({ v: 1, hidden: [], filters: { f: ["v1"] } });
    localStorage.clear();
  });
  it("FP-U21 a request-dependent choice is not ready until today's options are known", () => {
    const hook = renderHook(
      ({ ready }) =>
        useTableFilters("choice-wait", [{ ...declaration(["v0"]), choicesReady: ready }]),
      { initialProps: { ready: false } },
    );
    expect(hook.result.current.ready).toBe(false);
    hook.rerender({ ready: true });
    expect(hook.result.current.ready).toBe(true);
    expect(hook.result.current.filters[0]?.value).toEqual(["v0"]);
  });
});
