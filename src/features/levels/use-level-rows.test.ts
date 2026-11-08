import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const reported = vi.hoisted(() => [] as string[]);

vi.mock("@/lib/on-demand-failure", () => ({
  reportOnDemandFailure: (what: string) => reported.push(what),
}));
vi.mock("./level-table-read", () => {
  throw new Error("the chunk did not download");
});

import { heldLevelRows } from "./levels-store";
import { useLevelRows } from "./use-level-rows";

describe("use-level-rows — the table read on demand (DEC-355)", () => {
  it("LVS-10 a failed download of the read's module is the shell's one notice and a network failure (INC-911)", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const { result } = renderHook(() => useLevelRows());
    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.error?.failure.class).toBe("network");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.rows).toEqual([]);
    expect(reported).toEqual(["the level rows' reader"]);
    expect(heldLevelRows().source).toBe("none");
  });
});
