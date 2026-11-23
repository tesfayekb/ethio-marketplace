import { beforeEach, describe, expect, it, vi } from "vitest";
const rpc = vi.fn();
// DEC-261 — the database call through the client's door.
vi.mock("@/lib/supabase-door", () => ({
  rpc: (...args: unknown[]) => rpc(...args),
}));
const { saveListing, unsaveListing, listingViewerState, mySaved } = await import("./save");
const { ReaderError, readerFailure } = await import("@/lib/reader-failure");
beforeEach(() => rpc.mockReset());
describe("Save answers", () => {
  it("SAVE-1 (SV-1) the ok shape for saving and removing", async () => {
    rpc.mockResolvedValueOnce({ data: { ok: true, saved: true, count: 3 }, error: null });
    expect(await saveListing("abc")).toEqual({ ok: true, saved: true, count: 3 });
    expect(rpc).toHaveBeenLastCalledWith("save_listing", { p_public_id: "abc" });
    rpc.mockResolvedValueOnce({ data: { ok: true, saved: false, count: 2 }, error: null });
    expect(await unsaveListing("abc")).toEqual({ ok: true, saved: false, count: 2 });
    expect(rpc).toHaveBeenLastCalledWith("unsave_listing", { p_public_id: "abc" });
  });
  it("SAVE-2 (SV-2) the shell's ownListing and rateLimited codes are read as errors", async () => {
    for (const reason of ["ownListing", "rateLimited"]) {
      rpc.mockResolvedValueOnce({ data: null, error: { message: reason } });
      expect(await saveListing("abc")).toEqual({ ok: false, reason });
    }
    rpc.mockResolvedValueOnce({ data: null, error: { message: "rateLimited" } });
    expect(await unsaveListing("abc")).toEqual({ ok: false, reason: "rateLimited" });
  });
  it("SAVE-3 (SV-3) unavailable errors map, other errors and malformed answers fail", async () => {
    for (const [message, reason] of [
      ["listingNotAvailable", "listingNotAvailable"],
      ["notSignedIn", "failed"],
      ["accountDeactivated", "failed"],
      ["boom", "failed"],
    ]) {
      rpc.mockResolvedValueOnce({ data: null, error: { message } });
      expect(await saveListing("abc")).toEqual({ ok: false, reason });
    }
    for (const data of [
      null,
      {},
      { ok: true, saved: "yes", count: 0 },
      { ok: true, saved: true, count: -1 },
      { ok: true, saved: true, count: 0.5 },
      { ok: false, reason: "unexpected" },
      // The shell refuses with an error now; a returned refusal is not an answer of the door.
      { ok: false, reason: "ownListing" },
      { ok: false, reason: "rateLimited" },
    ]) {
      rpc.mockResolvedValueOnce({ data, error: null });
      expect(await saveListing("abc")).toEqual({ ok: false, reason: "failed" });
    }
    rpc.mockRejectedValueOnce(new Error("transport"));
    expect(await unsaveListing("abc")).toEqual({ ok: false, reason: "failed" });
  });
  it("SAVE-4 (SV-4) listingViewerState returns null on error and a malformed answer, and preserves both booleans", async () => {
    const logged = vi.spyOn(console, "error").mockImplementation(() => undefined);
    try {
      // Every refusal of the gate and a failure of the read are unknown, never "not the seller".
      for (const message of ["notSignedIn", "accountDeactivated", "boom"]) {
        rpc.mockResolvedValueOnce({ data: null, error: { message } });
        expect(await listingViewerState("abc"), message).toBeNull();
      }
      for (const data of [
        null,
        true,
        [],
        {},
        { saved: true },
        { owner: true },
        { saved: "yes", owner: false },
        { saved: false, owner: 1 },
      ]) {
        rpc.mockResolvedValueOnce({ data, error: null });
        expect(await listingViewerState("abc"), JSON.stringify(data)).toBeNull();
      }
      rpc.mockRejectedValueOnce(new Error("transport"));
      expect(await listingViewerState("abc")).toBeNull();
      expect(logged).toHaveBeenCalledTimes(12);
    } finally {
      logged.mockRestore();
    }
    for (const state of [
      { saved: false, owner: false },
      { saved: true, owner: false },
      { saved: false, owner: true },
    ]) {
      rpc.mockResolvedValueOnce({ data: { ...state, extra: 1 }, error: null });
      expect(await listingViewerState("abc")).toEqual(state);
    }
    expect(rpc).toHaveBeenLastCalledWith("listing_viewer_state", { p_public_id: "abc" });
  });
  it("mySaved preserves unavailable cards and cursor and throws on error", async () => {
    const cards = [
      { id: "id", publicId: "abc", savedAt: "2026-10-17T00:00:00Z", available: false },
    ];
    const next = { a: cards[0]?.savedAt, i: "id" };
    rpc.mockResolvedValueOnce({ data: { cards, next }, error: null });
    expect(await mySaved(null, 20)).toEqual({ cards, next });
    expect(rpc).toHaveBeenLastCalledWith("my_saved_listings", { p_after: null, p_size: 20 });
    // DEC-429 — a failed read is the typed failure, its class read from the door's mark.
    for (const [error, failureClass] of [
      [{ message: "boom" }, "malformed"],
      [{ message: "notSignedIn", code: "P0D01" }, "auth"],
      [{ message: "listingNotFound", code: "P0D01" }, "refused"],
    ] as const) {
      rpc.mockResolvedValueOnce({ data: null, error });
      const thrown = await mySaved(next, 20).catch((caught: unknown) => caught);
      expect(thrown).toBeInstanceOf(ReaderError);
      expect(readerFailure(thrown), error.message).toMatchObject({
        class: failureClass,
        message: error.message,
      });
    }
  });
});
