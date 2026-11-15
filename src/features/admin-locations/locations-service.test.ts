import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useLocationRefusal } from "./location-refusals";

vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key }) }));

const door = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({ rpc: door.rpc }));

import {
  deleteBlockedKey,
  deleteLocation,
  LISTED_LEVELS,
  LOCATION_LEVELS,
  moveLocation,
  reorderLocations,
  setLocationActive,
  upsertLocation,
} from "./locations-service";

/** Bundle 11 B1 — the one delete rule the verb bar and the row's Delete read. */
describe("deleteBlockedKey", () => {
  it("PL-1 names the first reason a place cannot be deleted, in the door's order, and nothing for a free leaf", () => {
    const free = { childCount: 0, listingCount: 0, coverageCount: 0, profileDefaultCount: 0 };
    expect(deleteBlockedKey(free)).toBeNull();
    expect(deleteBlockedKey({ ...free, childCount: 2, listingCount: 1 })).toBe(
      "admin.locations.error.detail.hasChildren",
    );
    expect(deleteBlockedKey({ ...free, listingCount: 1, coverageCount: 1 })).toBe(
      "admin.locations.error.detail.hasListings",
    );
    expect(deleteBlockedKey({ ...free, coverageCount: 3, profileDefaultCount: 1 })).toBe(
      "admin.locations.error.detail.hasCoverage",
    );
    expect(deleteBlockedKey({ ...free, profileDefaultCount: 1 })).toBe(
      "admin.locations.error.detail.hasProfileDefaults",
    );
  });
});

/** Bundle 11 V2b (the operator's walk) — the Level filter offers only what Places lists. */
describe("LISTED_LEVELS", () => {
  it("PL-2 leaves out the country (its anchor is Admin › Countries'), keeps every other level in order", () => {
    expect(LISTED_LEVELS).not.toContain("country");
    expect(LISTED_LEVELS).toEqual(LOCATION_LEVELS.filter((level) => level !== "country"));
  });
});

describe("useLocationRefusal", () => {
  it("PL-3 reads a database refusal object by its own message; an unknown one draws the generic line, no raw text", () => {
    const { result } = renderHook(() => useLocationRefusal());
    act(() =>
      result.current.fail({ message: "badLevel", code: "P0001", details: null, hint: null }),
    );
    expect(result.current.message).toBe("admin.locations.error.badLevel");
    act(() =>
      result.current.fail({ message: "something new", code: "P0001", details: null, hint: null }),
    );
    expect(result.current.message).toBe("admin.locations.error.unknown");
    act(() => result.current.fail(undefined));
    expect(result.current.message).toBe("admin.locations.error.unknown");
  });
});

describe("the places doors' calls (F1-4b)", () => {
  beforeEach(() => door.rpc.mockReset());

  it("PL-4 the editor sends its NULLs as given and reads the new id from the answer; a write without one throws", async () => {
    door.rpc.mockResolvedValue({ data: { ok: true, id: "p-1" }, error: null });
    const id = await upsertLocation({
      id: null,
      parentId: "parent-1",
      level: null,
      nameEn: "Adama",
      slug: null,
      iso: null,
      aliases: [],
      displayOrder: 0,
      centerLat: null,
      centerLng: null,
    });
    expect(id).toBe("p-1");
    expect(door.rpc).toHaveBeenCalledWith("admin_upsert_location", {
      p_id: null,
      p_parent_id: "parent-1",
      p_level: null,
      p_name_en: "Adama",
      p_slug: null,
      p_iso_3166_2: null,
      p_aliases: [],
      p_display_order: 0,
      p_center_lat: null,
      p_center_lng: null,
    });
    for (const data of [
      null,
      { ok: true },
      { ok: true, id: "" },
      { ok: false, id: "p-1" },
      "p-1",
    ]) {
      door.rpc.mockResolvedValue({ data, error: null });
      await expect(
        upsertLocation({
          id: "p-1",
          parentId: null,
          level: null,
          nameEn: "A",
          slug: null,
          iso: null,
          aliases: [],
          displayOrder: 0,
          centerLat: null,
          centerLng: null,
        }),
      ).rejects.toThrow("admin_upsert_location answered without an id");
    }
  });

  it("PL-5 each other door is called with its own arguments, and a refusal is thrown as it arrived", async () => {
    door.rpc.mockResolvedValue({ data: { ok: true }, error: null });
    await setLocationActive({ id: "p-1", active: true });
    await moveLocation({ id: "p-1", newParentId: "p-2" });
    await reorderLocations({ parentId: "p-2", ids: ["p-1", "p-3"] });
    await deleteLocation({ id: "p-1", slug: "adama" });
    expect(door.rpc.mock.calls).toEqual([
      ["admin_set_location_active", { p_id: "p-1", p_active: true }],
      ["admin_move_location", { p_id: "p-1", p_new_parent_id: "p-2" }],
      ["admin_reorder_locations", { p_parent_id: "p-2", p_ids: ["p-1", "p-3"] }],
      ["admin_delete_location", { p_id: "p-1", p_slug: "adama" }],
    ]);
    const refusal = { message: "retireInstead:hasChildren", code: "P0D01", details: "", hint: "" };
    door.rpc.mockResolvedValue({ data: null, error: refusal });
    await expect(deleteLocation({ id: "p-1", slug: "adama" })).rejects.toBe(refusal);
    await expect(moveLocation({ id: "p-1", newParentId: "p-2" })).rejects.toBe(refusal);
  });
});
