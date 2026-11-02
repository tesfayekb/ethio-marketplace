import { describe, expect, it, vi } from "vitest";

import { StepUpCancelled, StepUpUnavailable } from "@/features/auth/mfa/mfa-service";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";

const rpc = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { rpc: (...args: unknown[]) => rpc(...args) },
}));

import { changeListingTier } from "./change-listing-tier";

/**
 * P-1 W4 — the one runner of "Set tier", shared by the ad's page and the
 * table's row menu: the door under the guard, its answer as one of three
 * outcomes, the refusal through the one mapper (`tierErrorKey`).
 */
const passThrough: GuardFn = (action) => Promise.resolve(action());

describe("changeListingTier (P-1 W4)", () => {
  it("CLT-1 a door that answers is done, and was asked with the listing, the tier, the reason", async () => {
    rpc.mockResolvedValueOnce({ data: null, error: null });
    const outcome = await changeListingTier(passThrough, "ad-1", "premium", "promotion", "  ");
    expect(outcome).toEqual({ ok: true });
    expect(rpc).toHaveBeenCalledWith("admin_set_listing_tier", {
      p_listing_id: "ad-1",
      p_tier: "premium",
      p_reason: "promotion",
    });
  });

  it("CLT-2 a cancelled second factor is reported as cancelled, never as a refusal", async () => {
    const cancelling: GuardFn = () => Promise.reject(new StepUpCancelled());
    expect(await changeListingTier(cancelling, "ad-1", "premium", "promotion", "")).toEqual({
      ok: false,
      cancelled: true,
    });
  });

  it("CLT-3 no verified factor reads as the step-up hint; the door's refusal reads through the one mapper", async () => {
    const unavailable: GuardFn = () => Promise.reject(new StepUpUnavailable());
    expect(await changeListingTier(unavailable, "ad-1", "premium", "promotion", "")).toEqual({
      ok: false,
      cancelled: false,
      refusal: "mfa.stepUpUnavailableHint",
    });

    rpc.mockResolvedValueOnce({
      data: null,
      error: { message: "a removed listing takes no tier" },
    });
    expect(await changeListingTier(passThrough, "ad-1", "premium", "promotion", "")).toEqual({
      ok: false,
      cancelled: false,
      refusal: "admin.listings.tier.error.removed",
    });
  });
});
