import { act, renderHook } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { useSavedState } from "./use-saved-state";

const read = vi.hoisted(() => vi.fn());
vi.mock("./save", () => ({ listingSaved: read }));
function deferred() {
  let resolve: (value: boolean) => void = () => {};
  const promise = new Promise<boolean>((answer) => {
    resolve = answer;
  });
  return { promise, resolve };
}
beforeEach(() => {
  read.mockReset();
});

it("SVS-1 a signed-out value is unknown on the signed-in render until its read answers", async () => {
  const load = deferred();
  read.mockReturnValue(load.promise);
  const renders: Array<boolean | null> = [];
  const { result, rerender } = renderHook(
    ({ viewer }: { viewer: string | null }) => {
      const state = useSavedState(viewer, "ad", 3);
      renders.push(state.saved);
      return state;
    },
    { initialProps: { viewer: null as string | null } },
  );
  expect(result.current.saved).toBe(false);
  renders.length = 0;
  rerender({ viewer: "viewer-a" });
  expect(renders[0]).toBeNull();
  await act(async () => load.resolve(true));
  expect(result.current.saved).toBe(true);
});

it("SVS-2 a read asked before a save cannot overwrite the write answer", async () => {
  const load = deferred();
  read.mockReturnValue(load.promise);
  const { result } = renderHook(() => useSavedState("viewer-a", "ad", 3));
  const apply = result.current.beginWrite();
  act(() => apply({ ok: true, saved: true, count: 4 }));
  await act(async () => load.resolve(false));
  expect(result.current.saved).toBe(true);
  expect(result.current.count).toBe(4);
});

it("SVS-3 an answer for a previous viewer is dropped", async () => {
  const first = deferred();
  const second = deferred();
  read.mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);
  const { result, rerender } = renderHook(({ viewer }) => useSavedState(viewer, "ad", 3), {
    initialProps: { viewer: "viewer-a" },
  });
  rerender({ viewer: "viewer-b" });
  await act(async () => second.resolve(false));
  await act(async () => first.resolve(true));
  expect(result.current.saved).toBe(false);
});

it("SVS-4 a write answer for a previous viewer is dropped", async () => {
  read.mockResolvedValue(false);
  const { result, rerender } = renderHook(({ viewer }) => useSavedState(viewer, "ad", 3), {
    initialProps: { viewer: "viewer-a" },
  });
  const apply = result.current.beginWrite();
  rerender({ viewer: "viewer-b" });
  await act(async () => {});
  act(() => apply({ ok: true, saved: true, count: 4 }));
  expect(result.current.saved).toBe(false);
  expect(result.current.count).toBe(3);
});
