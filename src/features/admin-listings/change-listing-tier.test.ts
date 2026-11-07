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
    rpc.mockResolvedValueOnce({
      data: {
        ok: true,
        from: "regular",
        to: "premium",
        until: null,
        source: "staff",
        status: "active",
      },
      error: null,
    });
    const outcome = await changeListingTier(
      passThrough,
      "ad-1",
      "premium",
      "promotion",
      "  ",
      null,
    );
    expect(outcome).toEqual({ ok: true, status: "active" });
    expect(rpc).toHaveBeenCalledWith("admin_set_listing_tier", {
      p_listing_id: "ad-1",
      p_tier: "premium",
      p_reason: "promotion",
    });
  });

  it("CLT-2 a cancelled second factor is reported as cancelled, never as a refusal", async () => {
    const cancelling: GuardFn = () => Promise.reject(new StepUpCancelled());
    expect(await changeListingTier(cancelling, "ad-1", "premium", "promotion", "", null)).toEqual({
      ok: false,
      cancelled: true,
    });
  });

  it("CLT-3 no verified factor reads as the step-up hint; the door's refusal reads through the one mapper", async () => {
    const unavailable: GuardFn = () => Promise.reject(new StepUpUnavailable());
    expect(await changeListingTier(unavailable, "ad-1", "premium", "promotion", "", null)).toEqual({
      ok: false,
      cancelled: false,
      refusal: "mfa.stepUpUnavailableHint",
    });

    rpc.mockResolvedValueOnce({
      data: null,
      error: { message: "a removed listing takes no tier" },
    });
    expect(await changeListingTier(passThrough, "ad-1", "premium", "promotion", "", null)).toEqual({
      ok: false,
      cancelled: false,
      refusal: "admin.listings.tier.error.removed",
    });
  });

  it("CLT-4 the door's status comes back (paused when the baseline found no free slot); a malformed answer is the common error, never a done", async () => {
    rpc.mockResolvedValueOnce({
      data: {
        ok: true,
        from: "featured",
        to: "regular",
        until: null,
        source: null,
        status: "paused",
      },
      error: null,
    });
    expect(
      await changeListingTier(passThrough, "ad-1", "regular", "promotion_ended", "", null),
    ).toEqual({
      ok: true,
      status: "paused",
    });
    rpc.mockResolvedValueOnce({ data: null, error: null });
    expect(await changeListingTier(passThrough, "ad-1", "premium", "promotion", "", null)).toEqual({
      ok: false,
      cancelled: false,
      refusal: "common.error",
    });
    rpc.mockResolvedValueOnce({ data: null, error: { message: "noFreeSlot" } });
    expect(
      await changeListingTier(passThrough, "ad-1", "regular", "promotion_ended", "", null),
    ).toEqual({
      ok: false,
      cancelled: false,
      refusal: "admin.listings.error.noFreeSlot",
    });
  });

  it("CLT-5 the dialog's Days reach the door as p_days; the door's badDays reads as the days rule (P-2 (b))", async () => {
    rpc.mockResolvedValueOnce({
      data: {
        ok: true,
        from: "regular",
        to: "premium",
        until: null,
        source: "staff",
        status: "active",
      },
      error: null,
    });
    await changeListingTier(passThrough, "ad-1", "premium", "promotion", "", 14);
    expect(rpc).toHaveBeenLastCalledWith("admin_set_listing_tier", {
      p_listing_id: "ad-1",
      p_tier: "premium",
      p_reason: "promotion",
      p_days: 14,
    });
    rpc.mockResolvedValueOnce({ data: null, error: { message: "badDays" } });
    expect(await changeListingTier(passThrough, "ad-1", "premium", "promotion", "", 14)).toEqual({
      ok: false,
      cancelled: false,
      refusal: "admin.listings.level.error.days",
    });
  });
});
