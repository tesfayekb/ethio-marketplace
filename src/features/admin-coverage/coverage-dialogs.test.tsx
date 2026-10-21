import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useCoverageError } from "./coverage-dialogs";

describe("useCoverageError", () => {
  it("reads a database refusal object by its own message", () => {
    const { result } = renderHook(() => useCoverageError());
    act(() =>
      result.current.fail({ message: "badPlan", code: "P0001", details: null, hint: null }),
    );
    expect(result.current.refusal).toMatchObject({
      key: "admin.coverage.error.badPlan",
      raw: null,
    });
    act(() =>
      result.current.fail({ message: "something new", code: "P0001", details: null, hint: null }),
    );
    expect(result.current.refusal).toMatchObject({
      key: "admin.coverage.error.unknown",
      raw: "something new",
    });
    act(() => result.current.fail(undefined));
    expect(result.current.refusal?.raw).toBeNull();
  });
});
