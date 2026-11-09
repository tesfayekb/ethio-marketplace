import { beforeEach, describe, expect, it, vi } from "vitest";

const calls: Array<{ name: string; args: unknown }> = [];
let answer: { data: unknown; error: unknown } = { data: null, error: null };

vi.mock("@/lib/supabase-door", () => ({
  rpc: async (name: string, args: unknown) => {
    calls.push({ name, args });
    return answer;
  },
}));

import { readerFailure } from "@/lib/reader-failure";

import {
  availabilityKey,
  parsePromoteOptions,
  promoteRefusalKey,
  readPromoteOptions,
  setListingLevel,
  setListingReach,
} from "./promote-service";

/** promote_options' answer in the shape its jsonb_build_object writes (20261106233808). */
const ANSWER = {
  ok: true,
  status: "active",
  level: { key: "lvl-a", until: "2026-11-20T10:00:00.5+00:00", source: "launch" },
  country: "XZ",
  paidLevels: false,
  currency: "XTS",
  levels: [
    {
      key: "lvl-base",
      name_en: "Base",
      name_am: null,
      sort: 0,
      current: false,
      below: true,
      days: 30,
      amount: 0,
      currency: "XTS",
      availability: "available",
    },
    {
      key: "lvl-a",
      name_en: "Level A",
      name_am: "ደረጃ",
      sort: 10,
      current: true,
      below: false,
      days: 15,
      amount: null,
      currency: null,
      availability: "notOffered",
    },
    {
      key: "lvl-b",
      name_en: "Level B",
      name_am: null,
      sort: 20,
      current: false,
      below: false,
      days: 20,
      amount: 7.25,
      currency: "XTS",
      availability: "available",
    },
  ],
  reach: { key: "rch-inc", until: null, source: null, included: "rch-inc" },
  reaches: [
    {
      key: "rch-inc",
      name_en: "Included reach",
      name_am: null,
      sort: 10,
      current: true,
      below: false,
      days: null,
      amount: null,
      currency: null,
      availability: "includedReach",
    },
    {
      key: "rch-wide",
      name_en: "Wide reach",
      name_am: "ሰፊ",
      sort: 20,
      current: false,
      below: false,
      days: 30,
      amount: 4.5,
      currency: "XTS",
      availability: "available",
    },
  ],
};

beforeEach(() => {
  calls.length = 0;
  answer = { data: null, error: null };
});

describe("P-2 (b) promote-service (DEC-349)", () => {
  it("PMV-1 reads the door's answer and passes its numbers through untouched", async () => {
    answer = { data: ANSWER, error: null };
    const options = await readPromoteOptions("ad-1");
    expect(calls).toEqual([{ name: "promote_options", args: { p_listing_id: "ad-1" } }]);
    expect(options.level).toEqual(ANSWER.level);
    expect(options.paidLevels).toBe(false);
    expect(options.levels.map((level) => [level.key, level.days, level.amount])).toEqual([
      ["lvl-base", 30, 0],
      ["lvl-a", 15, null],
      ["lvl-b", 20, 7.25],
    ]);
    expect(options.levels[1]).toMatchObject({ nameAm: "ደረጃ", current: true, below: false });
  });

  it("PMV-2 a malformed answer is null, never a guessed level", () => {
    expect(parsePromoteOptions(ANSWER)).not.toBeNull();
    expect(parsePromoteOptions({ ...ANSWER, ok: false })).toBeNull();
    expect(parsePromoteOptions({ ...ANSWER, paidLevels: "no" })).toBeNull();
    expect(parsePromoteOptions({ ...ANSWER, levels: {} })).toBeNull();
    expect(
      parsePromoteOptions({ ...ANSWER, level: { key: "a", until: 3, source: null } }),
    ).toBeNull();
    const [first] = ANSWER.levels;
    expect(
      parsePromoteOptions({ ...ANSWER, levels: [{ ...first, availability: "free" }] }),
    ).toBeNull();
    expect(parsePromoteOptions({ ...ANSWER, levels: [{ ...first, amount: "7" }] })).toBeNull();
    expect(parsePromoteOptions(null)).toBeNull();
    const { reach, reaches, ...levelsOnly } = ANSWER;
    expect(parsePromoteOptions(levelsOnly)).toBeNull();
    expect(parsePromoteOptions({ ...ANSWER, reach: { ...reach, included: null } })).toBeNull();
    expect(parsePromoteOptions({ ...ANSWER, reaches: {} })).toBeNull();
    const [firstReach] = reaches;
    expect(
      parsePromoteOptions({ ...ANSWER, reaches: [{ ...firstReach, availability: "seasonEnded" }] }),
    ).toBeNull();
  });

  it("PMV-3 a refused or malformed read throws a ReaderError whose code the sheet can name", async () => {
    answer = { data: null, error: { message: "listingNotPlaced", code: "P0D01" } };
    const refused = await readPromoteOptions("ad-1").catch((error: unknown) => error);
    expect(promoteRefusalKey(readerFailure(refused), "level")).toBe(
      "myListings.promote.error.listingNotPlaced",
    );
    answer = { data: { ok: true }, error: null };
    const malformed = await readPromoteOptions("ad-1").catch((error: unknown) => error);
    expect(readerFailure(malformed).class).toBe("malformed");
  });

  it("PMV-4 every refusal is named by its code; a sentence or an unknown code is door.refused", () => {
    const named: Array<[string, string]> = [
      ["rateLimited", "myListings.error.rateLimited"],
      ["accountDeactivated", "myListings.error.deactivated"],
      ["listingNotFound", "myListings.error.notYours"],
      ["notLive", "myListings.promote.error.notLive"],
      ["sameLevel", "myListings.promote.error.sameLevel"],
      ["lowerLevel", "myListings.promote.error.lowerLevel"],
      ["unknownLevel", "myListings.promote.error.unknownLevel"],
      ["listingNotPlaced", "myListings.promote.error.listingNotPlaced"],
      ["levelNotAvailable", "myListings.promote.error.levelNotAvailable"],
      ["seasonEnded", "myListings.promote.error.seasonEnded"],
      ["notOffered", "myListings.promote.error.notOffered"],
      ["marketNotSet", "myListings.promote.error.marketNotSet"],
      ["creditsNotAvailable", "myListings.promote.error.creditsNotAvailable"],
    ];
    for (const [code, key] of named)
      expect(promoteRefusalKey({ message: code }, "level")).toBe(key);
    expect(promoteRefusalKey({ message: "account is deactivated" }, "level")).toBe("door.refused");
    expect(promoteRefusalKey({ message: "notSignedIn" }, "level")).toBe("door.refused");
    expect(promoteRefusalKey({ message: "toString" }, "level")).toBe("door.refused");
    expect(promoteRefusalKey(null, "level")).toBe("door.refused");
    const reach: Array<[string, string]> = [
      ...named.filter(([code]) => code !== "notOffered"),
      ["notOffered", "myListings.promote.error.reachNotOffered"],
      ["unknownReach", "myListings.promote.error.unknownReach"],
      ["sameReach", "myListings.promote.error.sameReach"],
      ["lowerReach", "myListings.promote.error.lowerReach"],
      ["includedReach", "myListings.promote.error.includedReach"],
    ];
    for (const [code, key] of reach)
      expect(promoteRefusalKey({ message: code }, "reach")).toBe(key);
    for (const code of ["unknownReach", "sameReach", "lowerReach", "includedReach"])
      expect(promoteRefusalKey({ message: code }, "level")).toBe("door.refused");
  });

  it("PMV-5 setting a level calls set_listing_level only and reads its answer or its code", async () => {
    answer = {
      data: { ok: true, level: "lvl-b", until: "2026-11-27T10:00:00+00:00" },
      error: null,
    };
    expect(await setListingLevel("ad-1", "lvl-b")).toEqual({
      ok: true,
      until: "2026-11-27T10:00:00+00:00",
    });
    expect(calls).toEqual([
      { name: "set_listing_level", args: { p_listing_id: "ad-1", p_level_key: "lvl-b" } },
    ]);
    answer = { data: null, error: { message: "sameLevel", details: "2026-11-20 10:00:00+00" } };
    expect(await setListingLevel("ad-1", "lvl-a")).toEqual({
      ok: false,
      key: "myListings.promote.error.sameLevel",
    });
    answer = { data: { ok: true }, error: null };
    expect(await setListingLevel("ad-1", "lvl-b")).toEqual({
      ok: false,
      key: "myListings.error.failed",
    });
  });

  it("PMV-6 a level the ad cannot take says why, from the door's availability", () => {
    expect(availabilityKey("available", "level")).toBeNull();
    expect(availabilityKey("seasonEnded", "level")).toBe("myListings.promote.error.seasonEnded");
    expect(availabilityKey("notOffered", "level")).toBe("myListings.promote.error.notOffered");
    expect(availabilityKey("levelNotAvailable", "level")).toBe(
      "myListings.promote.error.levelNotAvailable",
    );
  });

  it("PMV-7 the reach: the door's reach head and rows pass through untouched, set_listing_reach sets it, its refusals and availability in the reach's words", async () => {
    answer = { data: ANSWER, error: null };
    const options = await readPromoteOptions("ad-1");
    expect(options.reach).toEqual(ANSWER.reach);
    expect(
      options.reaches.map((row) => [row.key, row.current, row.days, row.amount, row.availability]),
    ).toEqual([
      ["rch-inc", true, null, null, "includedReach"],
      ["rch-wide", false, 30, 4.5, "available"],
    ]);
    expect(options.reaches[1]).toMatchObject({ nameEn: "Wide reach", nameAm: "ሰፊ", sort: 20 });

    calls.length = 0;
    answer = {
      data: { ok: true, reach: "rch-wide", until: "2026-12-09T10:00:00+00:00", source: "launch" },
      error: null,
    };
    expect(await setListingReach("ad-1", "rch-wide")).toEqual({
      ok: true,
      until: "2026-12-09T10:00:00+00:00",
    });
    expect(calls).toEqual([
      { name: "set_listing_reach", args: { p_listing_id: "ad-1", p_reach_key: "rch-wide" } },
    ]);
    answer = { data: null, error: { message: "sameReach", details: "2026-12-09 10:00:00+00" } };
    expect(await setListingReach("ad-1", "rch-wide")).toEqual({
      ok: false,
      key: "myListings.promote.error.sameReach",
    });
    answer = { data: null, error: { message: "notOffered", code: "P0001" } };
    expect(await setListingReach("ad-1", "rch-wide")).toEqual({
      ok: false,
      key: "myListings.promote.error.reachNotOffered",
    });
    answer = { data: { ok: true }, error: null };
    expect(await setListingReach("ad-1", "rch-wide")).toEqual({
      ok: false,
      key: "myListings.error.failed",
    });

    expect(availabilityKey("available", "reach")).toBeNull();
    expect(availabilityKey("notOffered", "reach")).toBe("myListings.promote.error.reachNotOffered");
    expect(availabilityKey("unknownReach", "reach")).toBe("myListings.promote.error.unknownReach");
    expect(availabilityKey("lowerReach", "reach")).toBe("myListings.promote.error.lowerReach");
  });
});
