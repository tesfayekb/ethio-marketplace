import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useFormGate } from "./use-form-gate";

describe("the one form gate (DEC-339)", () => {
  it("FKG-1 each part's list is held whole; an unchanged report leaves the gate as it was", () => {
    const { result } = renderHook(() => useFormGate(3));
    act(() => result.current.report("where", ["coverage"]));
    act(() => result.current.report("price", ["price_amount", "price_currency"]));
    expect(result.current.missing).toEqual(["coverage", "price_amount", "price_currency"]);
    const before = result.current;
    act(() => result.current.report("where", ["coverage"]));
    expect(result.current).toBe(before);
    act(() => result.current.report("where", []));
    expect(result.current.missing).toEqual(["price_amount", "price_currency"]);
  });

  it("FKG-2 a closed submit marks the blanks and moves to the first; an open one passes", () => {
    const reveal = vi.fn();
    const { result } = renderHook(() => useFormGate(1, reveal));
    expect(result.current.try()).toBe(true);
    expect(result.current.tried).toBe(false);
    act(() => result.current.register("category_id", true));
    let open = true;
    act(() => {
      open = result.current.try();
    });
    expect(open).toBe(false);
    expect(result.current.tried).toBe(true);
    expect(result.current.marks).toEqual([{ field: "category_id", reason: "required" }]);
    expect(reveal).toHaveBeenCalledWith(["category_id"]);
    act(() => result.current.register("category_id", false));
    expect(result.current.missing).toEqual([]);
    expect(result.current.marks).toEqual([]);
  });

  it("FKG-3 a new scope starts clean: another scope's lists and the tried mark are dropped", () => {
    const { result, rerender } = renderHook(({ scope }) => useFormGate(scope), {
      initialProps: { scope: 5 },
    });
    act(() => result.current.report("details", ["title"]));
    act(() => {
      result.current.try();
    });
    expect(result.current.tried).toBe(true);
    rerender({ scope: 6 });
    expect(result.current.missing).toEqual([]);
    expect(result.current.tried).toBe(false);
    act(() => result.current.report("price", ["price_amount"]));
    expect(result.current.missing).toEqual(["price_amount"]);
  });

  it("FKG-4 a report made while the new scope mounts is kept for that scope", () => {
    const { result, rerender } = renderHook(({ scope }) => useFormGate(scope), {
      initialProps: { scope: 6 },
    });
    rerender({ scope: 7 });
    act(() => result.current.report("who", ["alias"]));
    expect(result.current.missing).toEqual(["alias"]);
  });
});
