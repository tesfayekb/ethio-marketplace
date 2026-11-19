import { beforeEach, describe, expect, it, vi } from "vitest";

// F1-7a — `my_listing` is on the gate: the seller's page tells "not yours" by the gate's code.
const rpc = vi.hoisted(() => vi.fn());
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc } }));

import { readMyListing } from "./my-listing";

beforeEach(() => rpc.mockReset());

describe("readMyListing reads the gate's refusal (F1-7a)", () => {
  it("MLR-1 notYourListing is the page's `notYours`; the old sentence, other codes and a transport failure throw", async () => {
    rpc.mockResolvedValueOnce({ data: null, error: { message: "notYourListing", code: "P0D01" } });
    expect(await readMyListing("ad-1")).toBe("notYours");
    expect(rpc).toHaveBeenLastCalledWith("my_listing", { p_listing_id: "ad-1" });
    for (const message of ["notSignedIn", "accountDeactivated", "not your listing", "boom"]) {
      rpc.mockResolvedValueOnce({ data: null, error: { message, code: "P0D01" } });
      await expect(readMyListing("ad-1"), message).rejects.toThrow(message);
    }
  });
});
