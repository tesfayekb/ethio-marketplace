import { act, renderHook } from "@testing-library/react";
import { describe, expect, expectTypeOf, it, vi } from "vitest";
import {
  clearTableFilters,
  tableFilterChips,
  tableFilterState,
  useTableFilters,
  type TableFilter,
  type TableFilterDeclaration,
  type TableSelectDeclaration,
  type TableSelectFilter,
} from "./table-filters";
import { tableViewTestShell } from "./table-view-test-shell";
import { forgetTableViewsForTests } from "./table-view-store";

const options = Array.from({ length: 21 }, (_, index) => ({
  value: `v${index}`,
  label: `Choice ${index} · ${index}`,
}));
function declaration(extra: Partial<TableSelectDeclaration> = {}): TableSelectDeclaration {
  return {
    kind: "select",
    id: "f",
    chipKey: "f",
    name: "Choices",
    kept: true,
    multiple: true,
    options,
    ...extra,
  };
}
function selectOf(filters: readonly TableFilter[], index = 0): TableSelectFilter {
  const filter = filters[index];
  if (filter?.kind !== "select") throw new Error("select missing");
  return filter;
}
describe("one table filter declaration", () => {
  it("FP-U18 one declaration drives checked values, per-value chips, state and the 20-choice cap", () => {
    const hook = renderHook(() => useTableFilters("filter-cap", [declaration()]));
    act(() =>
      selectOf(hook.result.current.filters).onChange([
        ...options.map((option) => option.value),
        "outside",
      ]),
    );
    const checked = hook.result.current.filters;
    expect(checked[0]?.value).toEqual(options.slice(0, 20).map((option) => option.value));
    expect(tableFilterChips(checked)).toHaveLength(20);
    expect(tableFilterState(checked)).toBe(
      JSON.stringify([["f", options.slice(0, 20).map((option) => option.value)]]),
    );
    expectTypeOf<TableSelectFilter["value"]>().toEqualTypeOf<readonly string[]>();
  });
  it("FP-U19 clearing and removing use the declaration's setters; counted labels are retained", () => {
    const hook = renderHook(() => useTableFilters("filter-remove", [declaration()]));
    act(() => selectOf(hook.result.current.filters).onChange(["v0", "v1"]));
    const chips = tableFilterChips(hook.result.current.filters);
    expect(chips.map((chip) => chip.label)).toEqual(["Choice 0 · 0", "Choice 1 · 1"]);
    act(() => chips[0]?.onRemove());
    expect(hook.result.current.filters[0]?.value).toEqual(["v1"]);
    act(() => clearTableFilters(hook.result.current.filters));
    expect(hook.result.current.filters[0]?.value).toEqual([]);
  });
  it("FP-U20 typed text and dates never enter the account-backed kept offer", () => {
    forgetTableViewsForTests();
    const filters: TableFilterDeclaration[] = [
      declaration(),
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
    act(() => selectOf(hook.result.current.filters).onChange(["v1"]));
    expect(
      JSON.parse(localStorage.getItem("ethio:view:filter-account:private-input") ?? "null"),
    ).toEqual({ v: 1, hidden: [], filters: { f: ["v1"] } });
    localStorage.clear();
  });
  it("FP-U21 a request-dependent choice is not ready until today's options are known", () => {
    const hook = renderHook(
      ({ ready }) => useTableFilters("choice-wait", [declaration({ choicesReady: ready })]),
      { initialProps: { ready: false } },
    );
    expect(hook.result.current.ready).toBe(false);
    act(() => selectOf(hook.result.current.filters).onChange(["v0"]));
    hook.rerender({ ready: true });
    expect(hook.result.current.ready).toBe(true);
    expect(hook.result.current.filters[0]?.value).toEqual(["v0"]);
  });
});

function addressHook(table: string, initial: readonly string[] = []) {
  return renderHook(
    ({ address }) => useTableFilters(table, [declaration({ addressValue: address })]),
    { initialProps: { address: initial }, wrapper: tableViewTestShell(`account-${table}`) },
  );
}
function choose(hook: ReturnType<typeof addressHook>, value: string[]) {
  act(() => selectOf(hook.result.current.filters).onChange(value));
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
    () => useTableFilters("address-choice", [declaration({ addressValue: [], onAddress: writer })]),
    { wrapper: tableViewTestShell("address-writer") },
  );
  act(() => selectOf(hook.result.current.filters).onChange(["v3"]));
  expect(writer).toHaveBeenCalledExactlyOnceWith(["v3"]);
  expect(
    JSON.parse(localStorage.getItem("ethio:view:address-writer:address-choice") ?? "null").filters,
  ).toEqual({ f: ["v3"] });
});
it("FP-U35 Clear all leaves the address writer and kept value empty without a copy effect", () => {
  forgetTableViewsForTests();
  let address: string[] = ["v2"];
  const hook = renderHook(
    () =>
      useTableFilters("address-clear", [
        declaration({
          addressValue: address,
          onAddress: (next) => {
            address = next;
          },
        }),
      ]),
    { wrapper: tableViewTestShell("address-clear-account") },
  );
  act(() => clearTableFilters(hook.result.current.filters));
  hook.rerender();
  expect(address).toEqual([]);
  expect(hook.result.current.filters[0]?.value).toEqual([]);
  expect(
    JSON.parse(localStorage.getItem("ethio:view:address-clear-account:address-clear") ?? "null")
      .filters,
  ).toEqual({});
});

describe("one value per filter (INC-1251)", () => {
  it("FP-U42 a select that is not kept lives only in the hook: never in storage, kept across draws", () => {
    forgetTableViewsForTests();
    localStorage.clear();
    const hook = renderHook(() => useTableFilters("loose", [declaration({ kept: false })]), {
      wrapper: tableViewTestShell("loose-account"),
    });
    act(() => selectOf(hook.result.current.filters).onChange(["v4"]));
    hook.rerender();
    expect(hook.result.current.filters[0]?.value).toEqual(["v4"]);
    expect(localStorage.getItem("ethio:view:loose-account:loose")).toBeNull();
  });
  it("FP-U43 a kept filter is held only by the kept view: another reader of the table sees the same value", () => {
    forgetTableViewsForTests();
    const shell = tableViewTestShell("shared-account");
    const one = renderHook(() => useTableFilters("shared", [declaration()]), { wrapper: shell });
    const two = renderHook(() => useTableFilters("shared", [declaration()]), { wrapper: shell });
    act(() => selectOf(one.result.current.filters).onChange(["v5"]));
    expect(two.result.current.filters[0]?.value).toEqual(["v5"]);
    localStorage.clear();
  });
  it("FP-U44 the first page is said once a change, and once for Clear all", () => {
    const first = vi.fn();
    const text = vi.fn();
    const hook = renderHook(() =>
      useTableFilters(
        "first-page",
        [
          declaration({ kept: false }),
          { kind: "switch", id: "s", chipKey: "s", name: "Switch", kept: false },
          {
            kind: "text",
            id: "q",
            chipKey: "q",
            name: "Seller",
            kept: false,
            value: "x",
            placeholder: "",
            onChange: text,
          },
        ],
        { onAnyChange: first },
      ),
    );
    act(() => selectOf(hook.result.current.filters).onChange(["v1"]));
    expect(first).toHaveBeenCalledTimes(1);
    const toggle = hook.result.current.filters[1];
    if (toggle?.kind !== "switch") throw new Error("switch missing");
    act(() => toggle.onChange(true));
    expect(first).toHaveBeenCalledTimes(2);
    expect(hook.result.current.filters[1]?.value).toBe(true);
    first.mockClear();
    act(() => clearTableFilters(hook.result.current.filters));
    expect(first).toHaveBeenCalledTimes(1);
    expect(text).toHaveBeenLastCalledWith("");
    expect(hook.result.current.filters[0]?.value).toEqual([]);
    expect(hook.result.current.filters[1]?.value).toBe(false);
  });
  it("FP-U45 a held value today's choices no longer offer is dropped before use", () => {
    forgetTableViewsForTests();
    const hook = renderHook(
      ({ offered }) => useTableFilters("gone", [declaration({ kept: false, options: offered })]),
      { initialProps: { offered: options } },
    );
    act(() => selectOf(hook.result.current.filters).onChange(["v1", "v2"]));
    hook.rerender({ offered: options.filter((option) => option.value !== "v1") });
    expect(hook.result.current.filters[0]?.value).toEqual(["v2"]);
  });
});
