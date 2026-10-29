import { beforeEach, describe, expect, it, vi } from "vitest";

const rpc = vi.fn();
vi.mock("@/lib/supabase-door", () => ({ rpc: (...args: unknown[]) => rpc(...args) }));
const { readSellerReview } = await import("./seller-review");
const { ReaderError } = await import("@/lib/reader-failure");

/** N1b-2c (INC-977, SPA-6d) — the owner's review flag: true, false, or a typed failure; never a guess. */
describe("readSellerReview", () => {
  beforeEach(() => rpc.mockReset());

  it("SPA-6d reads under_review from my_seller_line", async () => {
    rpc.mockResolvedValueOnce({ data: { alias: "x", under_review: true }, error: null });
    await expect(readSellerReview()).resolves.toBe(true);
    rpc.mockResolvedValueOnce({ data: { alias: "x", under_review: false }, error: null });
    await expect(readSellerReview()).resolves.toBe(false);
    expect(rpc).toHaveBeenCalledWith("my_seller_line");
  });

  it("SPA-6e a door error or a missing flag is a ReaderError, never 'not held'", async () => {
    rpc.mockResolvedValueOnce({
      data: null,
      error: { message: "not authenticated", code: "P0001", details: "", hint: "" },
    });
    await expect(readSellerReview()).rejects.toBeInstanceOf(ReaderError);
    rpc.mockResolvedValueOnce({ data: { alias: "x" }, error: null });
    await expect(readSellerReview()).rejects.toBeInstanceOf(ReaderError);
  });
});
