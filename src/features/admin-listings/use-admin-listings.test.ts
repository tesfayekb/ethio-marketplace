import { beforeEach, describe, expect, it, vi } from "vitest";

import { ReaderError } from "@/lib/reader-failure";

/** The door's calls and what the mocked `rpc` answers with. */
const door = vi.hoisted(() => ({
  calls: [] as Array<[string, unknown]>,
  answer: { data: [], error: null } as {
    data: unknown;
    error: { message: string } | null;
  },
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    rpc: (name: string, args: unknown) => {
      door.calls.push([name, args]);
      return Promise.resolve(door.answer);
    },
  },
}));

import { listAdminListings, type AdminListingFilters } from "./use-admin-listings";

const NONE: AdminListingFilters = {
  view: "all",
  search: "",
  country: [],
  category: [],
  seller: "",
  from: "",
  to: "",
  tier: null,
  limit: 25,
  offset: 0,
};

beforeEach(() => {
  door.calls.length = 0;
  door.answer = { data: [], error: null };
});

describe("the All listings reader (DEC-420)", () => {
  it("ALR-1 the country and the category are lists of one on the door; none asked sends no list", async () => {
    const category = "6d1f1c2e-0000-4000-8000-000000000030";
    await listAdminListings({ ...NONE, country: ["ET"], category: [category] });
    await listAdminListings(NONE);
    expect(door.calls).toEqual([
      [
        "admin_list_listings",
        { p_view: "all", p_country: ["ET"], p_category: [category], p_limit: 25, p_offset: 0 },
      ],
      ["admin_list_listings", { p_view: "all", p_limit: 25, p_offset: 0 }],
    ]);
  });

  it("ALR-2 a failed read is a typed ReaderError carrying the door's own text, never an empty table", async () => {
    door.answer = { data: null, error: { message: "permissionDenied" } };
    const failed = await listAdminListings(NONE).catch((error: unknown) => error);
    expect(failed).toBeInstanceOf(ReaderError);
    expect(failed).toMatchObject({
      failure: { class: "refused", message: "permissionDenied" },
    });
  });
});
