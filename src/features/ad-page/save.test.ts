import { beforeEach, describe, expect, it, vi } from "vitest";
const rpc = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { rpc: (...args: unknown[]) => rpc(...args) },
}));
const { saveListing, unsaveListing, listingSaved, mySaved } = await import("./save");
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
  it("SAVE-2 (SV-2) ownListing and rateLimited pass through", async () => {
    for (const reason of ["ownListing", "rateLimited"]) {
      rpc.mockResolvedValueOnce({ data: { ok: false, reason }, error: null });
      expect(await saveListing("abc")).toEqual({ ok: false, reason });
    }
  });
  it("SAVE-3 (SV-3) unavailable errors map, other errors and malformed answers fail", async () => {
    for (const [message, reason] of [
      ["listingNotAvailable", "listingNotAvailable"],
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
    ]) {
      rpc.mockResolvedValueOnce({ data, error: null });
      expect(await saveListing("abc")).toEqual({ ok: false, reason: "failed" });
    }
    rpc.mockRejectedValueOnce(new Error("transport"));
    expect(await unsaveListing("abc")).toEqual({ ok: false, reason: "failed" });
  });
  it("SAVE-4 (SV-4) listingSaved returns null on error and preserves booleans", async () => {
    rpc.mockResolvedValueOnce({ data: null, error: { message: "boom" } });
    expect(await listingSaved("abc")).toBeNull();
    for (const data of [false, true]) {
      rpc.mockResolvedValueOnce({ data, error: null });
      expect(await listingSaved("abc")).toBe(data);
    }
    rpc.mockRejectedValueOnce(new Error("transport"));
    expect(await listingSaved("abc")).toBeNull();
  });
  it("mySaved preserves unavailable cards and cursor and throws on error", async () => {
    const cards = [
      { id: "id", publicId: "abc", savedAt: "2026-10-17T00:00:00Z", available: false },
    ];
    const next = { a: cards[0]?.savedAt, i: "id" };
    rpc.mockResolvedValueOnce({ data: { cards, next }, error: null });
    expect(await mySaved(null, 20)).toEqual({ cards, next });
    expect(rpc).toHaveBeenLastCalledWith("my_saved_listings", { p_after: null, p_size: 20 });
    rpc.mockResolvedValueOnce({ data: null, error: { message: "boom" } });
    await expect(mySaved(next, 20)).rejects.toThrow("boom");
  });
});
