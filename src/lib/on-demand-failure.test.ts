import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { reportOnDemandFailure, useOnDemandFailures } from "./on-demand-failure";

/**
 * INC-911 — a piece fetched on demand that fails to download is reported once, in one log
 * form, and every reader of the count hears it (the shell's one notice).
 */
describe("the on-demand failure reporter (INC-911)", () => {
  it("ODF-1 a report logs one [client-error] line naming the piece and the cause", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    reportOnDemandFailure("the map", new Error("Failed to fetch dynamically imported module"));
    expect(errors).toHaveBeenCalledWith(
      "[client-error] the map failed to load: Failed to fetch dynamically imported module",
    );
    errors.mockRestore();
  });

  it("ODF-2 every report raises the count its readers hear", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const { result } = renderHook(() => useOnDemandFailures());
    const before = result.current;
    act(() => {
      reportOnDemandFailure("a menu's code", new Error("offline"));
    });
    expect(result.current).toBe(before + 1);
    act(() => {
      reportOnDemandFailure("a dialog's code", new Error("offline"));
    });
    expect(result.current).toBe(before + 2);
    errors.mockRestore();
  });
});
