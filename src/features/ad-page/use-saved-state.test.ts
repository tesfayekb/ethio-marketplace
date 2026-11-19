import { act, renderHook } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { useSavedState } from "./use-saved-state";

const read = vi.hoisted(() => vi.fn());
vi.mock("./save", () => ({ listingViewerState: read }));

type State = { saved: boolean; owner: boolean } | null;
function deferred() {
  let resolve: (value: State) => void = () => {};
  const promise = new Promise<State>((answer) => {
    resolve = answer;
  });
  return { promise, resolve };
}
const buyer = (saved: boolean): State => ({ saved, owner: false });
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
  await act(async () => load.resolve(buyer(true)));
  expect(result.current.saved).toBe(true);
});

it("SVS-2 a read asked before a save cannot overwrite the write answer", async () => {
  const load = deferred();
  read.mockReturnValue(load.promise);
  const { result } = renderHook(() => useSavedState("viewer-a", "ad", 3));
  const apply = result.current.beginWrite();
  act(() => apply({ ok: true, saved: true, count: 4 }));
  await act(async () => load.resolve(buyer(false)));
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
  await act(async () => second.resolve(buyer(false)));
  await act(async () => first.resolve({ saved: true, owner: true }));
  expect(result.current.saved).toBe(false);
  expect(result.current.owner).toBe(false);
});

it("SVS-4 a write answer for a previous viewer is dropped", async () => {
  read.mockResolvedValue(buyer(false));
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

// INC-1191 (F1-7a) — the seller is known from the signed-in read, so a reload offers the seller no Save.
it("SVS-5 the seller's own state: owner is true once the signed-in read answers, and never before", async () => {
  const load = deferred();
  read.mockReturnValue(load.promise);
  const { result } = renderHook(() => useSavedState("seller-a", "ad", 3));
  expect(result.current).toMatchObject({ saved: null, owner: false });
  await act(async () => load.resolve({ saved: false, owner: true }));
  expect(result.current).toMatchObject({ saved: false, owner: true });
  expect(read).toHaveBeenCalledExactlyOnceWith("ad");
});

it("SVS-6 a signed-out visitor is never the owner and asks nothing", () => {
  const { result } = renderHook(() => useSavedState(null, "ad", 3));
  expect(result.current).toMatchObject({ saved: false, owner: false, count: 3 });
  expect(read).not.toHaveBeenCalled();
});

it("SVS-7 a read that failed is unknown, not 'not the owner' by claim: saved stays null, owner stays false", async () => {
  read.mockResolvedValue(null);
  const { result } = renderHook(() => useSavedState("viewer-a", "ad", 3));
  await act(async () => {});
  expect(result.current).toMatchObject({ saved: null, owner: false });
});

it("SVS-8 an owner state for another ad is dropped when the ad changes", async () => {
  const first = deferred();
  const second = deferred();
  read.mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);
  const { result, rerender } = renderHook(({ ad }) => useSavedState("viewer-a", ad, 3), {
    initialProps: { ad: "ad-1" },
  });
  rerender({ ad: "ad-2" });
  await act(async () => second.resolve(buyer(true)));
  await act(async () => first.resolve({ saved: false, owner: true }));
  expect(result.current).toMatchObject({ saved: true, owner: false });
});
