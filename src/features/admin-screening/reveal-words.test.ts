import { describe, expect, it, vi } from "vitest";

const rpc = vi.hoisted(() => vi.fn());
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc } }));

const { revealContact } = await import("./use-screening");
const refused = (code: string) => ({
  data: null,
  error: Object.assign(new Error(code), { code: "P0D01" }),
});

/** INC-1280 (10a-2, D34 words) — Show number's refusals have words. */
describe("Screening reveal words (INC-1280)", () => {
  it("RWG-U1 no such channel, and a gone listing", async () => {
    rpc.mockResolvedValueOnce(refused("badValue:channel"));
    expect(await revealContact("l1", "phone")).toEqual({
      ok: false,
      reason: "refused",
      key: "admin.screening.revealNoChannel",
    });
    rpc.mockResolvedValueOnce(refused("listingNotFound"));
    expect(await revealContact("l1", "phone")).toEqual({
      ok: false,
      reason: "refused",
      key: "admin.listings.move.error.notFound",
    });
  });
  it("RWG-U2 a code with no line still fails, for the page's generic line", async () => {
    rpc.mockResolvedValueOnce(refused("noSuchCode"));
    await expect(revealContact("l1", "phone")).rejects.toThrow("noSuchCode");
  });
});
