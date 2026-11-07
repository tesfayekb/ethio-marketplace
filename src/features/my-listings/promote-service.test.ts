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
  });

  it("PMV-3 a refused or malformed read throws a ReaderError whose code the sheet can name", async () => {
    answer = { data: null, error: { message: "listingNotPlaced", code: "P0D01" } };
    const refused = await readPromoteOptions("ad-1").catch((error: unknown) => error);
    expect(promoteRefusalKey(readerFailure(refused))).toBe(
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
    for (const [code, key] of named) expect(promoteRefusalKey({ message: code })).toBe(key);
    expect(promoteRefusalKey({ message: "account is deactivated" })).toBe("door.refused");
    expect(promoteRefusalKey({ message: "notSignedIn" })).toBe("door.refused");
    expect(promoteRefusalKey({ message: "toString" })).toBe("door.refused");
    expect(promoteRefusalKey(null)).toBe("door.refused");
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
    expect(availabilityKey("available")).toBeNull();
    expect(availabilityKey("seasonEnded")).toBe("myListings.promote.error.seasonEnded");
    expect(availabilityKey("notOffered")).toBe("myListings.promote.error.notOffered");
    expect(availabilityKey("levelNotAvailable")).toBe("myListings.promote.error.levelNotAvailable");
  });
});
