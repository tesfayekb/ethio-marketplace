import { describe, expect, it, vi } from "vitest";

const rpc = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { rpc: (...args: unknown[]) => rpc(...args) },
}));

import { ReaderError, readerFailure } from "@/lib/reader-failure";
import { detailOf, readAdminListing, readAdminListingCertifications } from "./use-admin-listing";
import { listAdminListings, type AdminListingFilters } from "./use-admin-listings";

/**
 * P-2 (b) — the staff readers take the ad's level as the door answered it: a
 * level with its source and end as they came, and no level as a typed absence
 * (null, which the screen names), never a default level.
 */
const answer = (listing: Record<string, unknown>) => ({
  listing: { id: "l1", title: "T", status: "active", ...listing },
  seller: { id: "s1" },
  channels: {},
  history: [],
  history_total: 0,
});

const FILTERS: AdminListingFilters = {
  view: "all",
  search: "",
  country: [],
  category: [],
  seller: "",
  from: "",
  to: "",
  tier: null,
  limit: 20,
  offset: 0,
};

describe("the staff readers' level (P-2 (b))", () => {
  it("ALV-1 the detail keeps the level, its source and its end; no level is null, never regular", () => {
    const staff = detailOf(
      answer({ tier: "premium", tier_source: "staff", tier_until: "2026-12-01T00:00:00Z" }),
    );
    expect(staff.listing).toMatchObject({
      tier: "premium",
      tierSource: "staff",
      tierUntil: "2026-12-01T00:00:00Z",
    });
    for (const tier of [undefined, null, "", 7]) {
      expect(detailOf(answer({ tier })).listing.tier, String(tier)).toBeNull();
    }
  });

  it("ALV-2 the roster's row keeps its level; a row without one is null, never regular", async () => {
    rpc.mockResolvedValueOnce({
      data: [
        { id: "a", status: "active", tier: "featured", seller_id: "s", created_at: "x" },
        { id: "b", status: "active", seller_id: "s", created_at: "x" },
      ],
      error: null,
    });
    const { rows } = await listAdminListings(FILTERS);
    expect(rows.map((row) => row.tier)).toEqual(["featured", null]);
  });
});

describe("the staff detail's reads fail as one typed failure (DEC-429)", () => {
  it("ALV-3 a refused admin_listing_detail or admin_listing_certifications is a ReaderError classed by the mark, never an empty listing", async () => {
    for (const read of [() => readAdminListing("l1"), () => readAdminListingCertifications("l1")]) {
      for (const [error, failureClass] of [
        [{ message: "permissionDenied", code: "P0D01", status: 403 }, "refused"],
        [{ message: "notSignedIn", code: "P0D01", status: 401 }, "auth"],
        [{ message: "listingNotFound", code: "P0D01", status: 400 }, "refused"],
      ] as const) {
        rpc.mockResolvedValueOnce({ data: null, error });
        const thrown = await read().catch((caught: unknown) => caught);
        expect(thrown).toBeInstanceOf(ReaderError);
        expect(readerFailure(thrown), error.message).toMatchObject({
          class: failureClass,
          message: error.message,
        });
      }
    }
  });
});
