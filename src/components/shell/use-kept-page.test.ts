import { act, renderHook as renderBareHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { tableViewTestShell } from "./table-view-test-shell";
import { forgetTableViewsForTests } from "./table-view-store";
import { useKeptPage } from "./use-kept-page";

let account: string | null | undefined = "acc-1";
function renderHook<T>(callback: () => T) {
  return renderBareHook(callback, { wrapper: (props) => tableViewTestShell(account)(props) });
}

/**
 * Bundle 11 G3a — a table's page and its kept page size. INC-1238 — kept per ACCOUNT in the one
 * kept view (table-view-store.ts).
 */
describe("useKeptPage", () => {
  beforeEach(() => {
    account = "acc-1";
    forgetTableViewsForTests();
  });
  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("KP-1 starts on the first page at the default size, keeps a chosen size, and a new size returns to the first page", () => {
    const first = renderHook(() => useKeptPage("kp-test"));
    expect(first.result.current.page).toBe(0);
    expect(first.result.current.pageSize).toBe(25);
    act(() => first.result.current.setPage(2));
    act(() => first.result.current.setPageSize(10));
    expect(first.result.current.page).toBe(0);
    expect(first.result.current.pageSize).toBe(10);
    expect(JSON.parse(window.localStorage.getItem("ethio:view:acc-1:kp-test") ?? "null")).toEqual({
      v: 1,
      hidden: [],
      pageSize: 10,
      filters: {},
    });
    first.unmount();
    const again = renderHook(() => useKeptPage("kp-test"));
    expect(again.result.current.pageSize).toBe(10);
  });

  it("KP-2 a kept size that is not an option, or storage that throws, keeps the default", () => {
    window.localStorage.setItem(
      "ethio:view:acc-1:kp-odd",
      JSON.stringify({ v: 1, hidden: [], pageSize: 7, filters: {} }),
    );
    expect(renderHook(() => useKeptPage("kp-odd")).result.current.pageSize).toBe(25);
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const blocked = renderHook(() => useKeptPage("kp-blocked"));
    expect(blocked.result.current.pageSize).toBe(25);
    act(() => blocked.result.current.setPageSize(50));
    expect(blocked.result.current.pageSize).toBe(50);
  });

  it("KP-3 a table with its own sizes offers them and keeps only one of them (bundle 11 C1)", () => {
    const sizes = [25, 50, 100];
    window.localStorage.setItem(
      "ethio:view:acc-1:kp-own",
      JSON.stringify({ v: 1, hidden: [], pageSize: 10, filters: {} }),
    );
    const odd = renderHook(() => useKeptPage("kp-own", 25, sizes));
    expect(odd.result.current.pageSize).toBe(25);
    expect(odd.result.current.pageSizeOptions).toEqual([25, 50, 100]);
    window.localStorage.setItem(
      "ethio:view:acc-1:kp-own-2",
      JSON.stringify({ v: 1, hidden: [], pageSize: 50, filters: {} }),
    );
    expect(renderHook(() => useKeptPage("kp-own-2", 25, sizes)).result.current.pageSize).toBe(50);
    expect(renderHook(() => useKeptPage("kp-default")).result.current.pageSizeOptions).toEqual([
      10, 25, 50, 100,
    ]);
  });

  it("KP-4 is not ready while the account is unknown, then reads the account's kept size", () => {
    account = undefined;
    window.localStorage.setItem(
      "ethio:view:acc-2:kp-wait",
      JSON.stringify({ v: 1, hidden: [], pageSize: 50, filters: {} }),
    );
    const hook = renderHook(() => useKeptPage("kp-wait"));
    expect(hook.result.current.ready).toBe(false);
    expect(hook.result.current.pageSize).toBe(25);
    act(() => {
      account = "acc-2";
      hook.rerender();
    });
    expect(hook.result.current.ready).toBe(true);
    expect(hook.result.current.pageSize).toBe(50);
  });
});
