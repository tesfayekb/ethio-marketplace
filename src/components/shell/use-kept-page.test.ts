import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useKeptPage } from "./use-kept-page";

/** Bundle 11 G3a — a client-paged table's page and its kept page size. */
describe("useKeptPage", () => {
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
    expect(window.localStorage.getItem("kp-test")).toBe("10");
    first.unmount();
    const again = renderHook(() => useKeptPage("kp-test"));
    expect(again.result.current.pageSize).toBe(10);
  });

  it("KP-2 a stored size that is not an option, or storage that throws, keeps the default", () => {
    window.localStorage.setItem("kp-odd", "7");
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
});
