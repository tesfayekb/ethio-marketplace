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

function addressHook(table: string, initial: readonly string[] = []) {
  return renderHook(
    ({ address }) => useTableFilters(table, [{ ...declaration([]), addressValue: address }]),
    { initialProps: { address: initial }, wrapper: tableViewTestShell(`account-${table}`) },
  );
}
function choose(hook: ReturnType<typeof addressHook>, value: string[]) {
  const filter = hook.result.current.filters[0];
  if (filter?.kind !== "select") throw new Error("select missing");
  act(() => filter.onChange(value));
}
it("FP-U32 a named address choice beats the kept value without changing kept state on arrival", () => {
  forgetTableViewsForTests();
  const hook = addressHook("address-wins");
  choose(hook, ["v1"]);
  const before = localStorage.getItem("ethio:view:account-address-wins:address-wins");
  hook.rerender({ address: ["v2"] });
  expect(hook.result.current.filters[0]?.value).toEqual(["v2"]);
  expect(localStorage.getItem("ethio:view:account-address-wins:address-wins")).toBe(before);
});
it("FP-U33 no named address choice applies the kept value", () => {
  forgetTableViewsForTests();
  const hook = addressHook("address-none");
  choose(hook, ["v1"]);
  hook.rerender({ address: ["v2"] });
  hook.rerender({ address: [] });
  expect(hook.result.current.filters[0]?.value).toEqual(["v1"]);
});
it("FP-U34 a choice calls the address writer and keeps the same value", () => {
  forgetTableViewsForTests();
  const writer = vi.fn();
  const hook = renderHook(
    () => useTableFilters("address-choice", [{ ...declaration([], writer), addressValue: [] }]),
    { wrapper: tableViewTestShell("address-writer") },
  );
  choose(hook, ["v3"]);
  expect(writer).toHaveBeenCalledExactlyOnceWith(["v3"]);
  expect(
    JSON.parse(localStorage.getItem("ethio:view:address-writer:address-choice") ?? "null").filters,
  ).toEqual({ f: ["v3"] });
});
it("FP-U35 Clear all leaves the address writer and kept value empty without a copy effect", () => {
  forgetTableViewsForTests();
  const hook = renderHook(
    () => {
      const [address, writer] = useState<string[]>(["v2"]);
      return {
        ...useTableFilters("address-clear", [
          { ...declaration([], writer), addressValue: address },
        ]),
        address,
      };
    },
    { wrapper: tableViewTestShell("address-clear-account") },
  );
  act(() => clearTableFilters(hook.result.current.filters));
  expect(hook.result.current.address).toEqual([]);
  expect(hook.result.current.filters[0]?.value).toEqual([]);
  expect(
    JSON.parse(localStorage.getItem("ethio:view:address-clear-account:address-clear") ?? "null")
      .filters,
  ).toEqual({});
});
