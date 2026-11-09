import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const tableAnswers: Array<{ data: unknown; error: unknown }> = [];
const reads: string[] = [];
const door = vi.hoisted(() => ({ fails: false, reported: [] as string[] }));

vi.mock("@/lib/on-demand-failure", () => ({
  reportOnDemandFailure: (what: string) => door.reported.push(what),
}));
vi.mock("@/lib/supabase-door", () => ({
  getSupabase: async () => {
    if (door.fails) throw new Error("the chunk did not download");
    return {
      from: (table: string) => {
        reads.push(table);
        const query = {
          select: () => query,
          eq: () => query,
          order: () => query,
          gt: () => query,
          limit: () => Promise.resolve(tableAnswers.shift() ?? { data: [], error: null }),
        };
        return query;
      },
    };
  },
}));

import { levelNameOf, parseCardLevel } from "./level-fields";
import {
  exactLevel,
  heldLevelRows,
  levelLook,
  levelOf,
  parseLevelRows,
  resetLevelRows,
  seedLevelRows,
} from "./levels-store";
import { useLevelLook, useLevelRows } from "./use-level-rows";

/** A dictionary row as the card answers write it (key, sort, names, baseline flag). */
const entry = (key: string, sort: number, is_baseline = false) => ({
  key,
  sort,
  name_en: `Level ${key}`,
  name_am: null,
  is_baseline,
});
/** A table row: the dictionary's fields and the row's base look. */
const tableRow = (key: string, sort: number, placement: string, badge: boolean, base = false) => ({
  ...entry(key, sort, base),
  placement,
  badge,
});

beforeEach(() => {
  resetLevelRows();
  tableAnswers.length = 0;
  reads.length = 0;
});
afterEach(() => vi.restoreAllMocks());

describe("P-2 (c) c2a — the level rows, one store (DEC-351 §8)", () => {
  it("LVS-1 the dictionary parses in (sort, key) order; a malformed row refuses the whole list", () => {
    const rows = parseLevelRows([
      entry("lvl-c", 20),
      entry("lvl-base", 0, true),
      entry("lvl-b", 20),
    ]);
    expect(rows?.map((row) => row.key)).toEqual(["lvl-base", "lvl-b", "lvl-c"]);
    expect(rows?.[0]).toEqual({
      key: "lvl-base",
      sort: 0,
      nameEn: "Level lvl-base",
      nameAm: null,
      isBaseline: true,
      look: null,
    });
    expect(parseLevelRows([tableRow("lvl-a", 10, "top", true)])?.[0]?.look).toEqual({
      placement: "top",
      badge: true,
    });
    for (const bad of [
      [{ ...entry("lvl-a", 1), sort: "1" }],
      [{ ...entry("lvl-a", 1), key: "" }],
      [{ ...entry("lvl-a", 1), is_baseline: null }],
      [{ ...entry("lvl-a", 1), placement: 3 }],
      [null],
      "rows",
    ]) {
      expect(parseLevelRows(bad), JSON.stringify(bad)).toBeNull();
    }
  });

  it("LVS-2 a card's level is its key and its two axes; NULL axes stay NULL (the plain look)", () => {
    expect(parseCardLevel({ key: "lvl-a", placement: "boost", badge: true })).toEqual({
      key: "lvl-a",
      look: { placement: "boost", badge: true },
    });
    expect(parseCardLevel({ key: "lvl-off", placement: null, badge: null })?.look).toEqual({
      placement: null,
      badge: null,
    });
    expect(parseCardLevel({ key: 1, placement: null, badge: null })).toBeNull();
    expect(parseCardLevel({ key: "lvl-a", placement: "top", badge: "yes" })).toBeNull();
    expect(parseCardLevel(undefined)).toBeNull();
  });

  it("LVS-3 a fourth, unknown key takes the baseline row (INC-1079); without a baseline it is null; a name is exact", () => {
    const rows = parseLevelRows([
      tableRow("lvl-base", 0, "standard", false, true),
      tableRow("lvl-a", 10, "boost", true),
    ]);
    if (rows === null) throw new Error("rows did not parse");
    expect(levelOf(rows, "lvl-a")?.key).toBe("lvl-a");
    expect(levelOf(rows, "lvl-fourth")?.key).toBe("lvl-base");
    expect(levelLook(rows, "lvl-fourth")).toEqual({ placement: "standard", badge: false });
    expect(levelLook(rows, null)).toBeNull();
    expect(exactLevel(rows, "lvl-fourth")).toBeNull();
    const noBaseline = rows.filter((row) => !row.isBaseline);
    expect(levelOf(noBaseline, "lvl-fourth")).toBeNull();
    expect(levelLook(noBaseline, "lvl-fourth")).toBeNull();
  });

  it("LVS-4 a row's name comes through the one chooser, in the reader's language, English where Amharic is missing", () => {
    const [row] = parseLevelRows([{ ...entry("lvl-a", 1), name_am: "ደረጃ ሀ" }]) ?? [];
    const [bare] = parseLevelRows([entry("lvl-b", 2)]) ?? [];
    if (row === undefined || bare === undefined) throw new Error("rows did not parse");
    expect(levelNameOf(row, "am")).toBe("ደረጃ ሀ");
    expect(levelNameOf(row, "en")).toBe("Level lvl-a");
    expect(levelNameOf(bare, "am")).toBe("Level lvl-b");
  });

  it("LVS-5 a card answer seeds the store once (equality-guarded) and serves a names-only screen with no read", async () => {
    const rows = parseLevelRows([entry("lvl-base", 0, true), entry("lvl-a", 10)]) ?? [];
    seedLevelRows(rows);
    const first = heldLevelRows();
    seedLevelRows(parseLevelRows([entry("lvl-base", 0, true), entry("lvl-a", 10)]) ?? []);
    expect(heldLevelRows()).toBe(first);
    const { result } = renderHook(() => useLevelRows({ looks: false }));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.rows.map((row) => row.key)).toEqual(["lvl-base", "lvl-a"]);
    await Promise.resolve();
    expect(reads).toEqual([]);
  });

  it("LVS-6 a screen without a card answer reads the enabled rows once with their looks; a later seed never replaces them", async () => {
    tableAnswers.push({
      data: [tableRow("lvl-a", 10, "top", true), tableRow("lvl-base", 0, "standard", false, true)],
      error: null,
    });
    seedLevelRows(parseLevelRows([entry("lvl-base", 0, true)]) ?? []);
    const one = renderHook(() => useLevelLook("lvl-a"));
    const two = renderHook(() => useLevelRows());
    await waitFor(() => expect(one.result.current).toEqual({ placement: "top", badge: true }));
    expect(two.result.current.rows.map((row) => row.key)).toEqual(["lvl-base", "lvl-a"]);
    expect(reads).toEqual(["listing_packages"]);
    act(() => seedLevelRows(parseLevelRows([entry("lvl-other", 0, true)]) ?? []));
    expect(heldLevelRows().source).toBe("table");
    expect(two.result.current.rows.map((row) => row.key)).toEqual(["lvl-base", "lvl-a"]);
  });

  it("LVS-7 a failed read is the screen's error (a ReaderError, logged), never an empty list that looks loaded", async () => {
    const logged = vi.spyOn(console, "error").mockImplementation(() => undefined);
    tableAnswers.push({ data: null, error: { message: "permission denied", code: "42501" } });
    const { result } = renderHook(() => useLevelRows());
    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.error?.name).toBe("ReaderError");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.rows).toEqual([]);
    expect(logged).toHaveBeenCalledWith("[levels] the level rows read failed", "permission denied");
    expect(heldLevelRows().source).toBe("none");
  });

  it("LVS-8 a malformed table row is a failure, not a list", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    tableAnswers.push({ data: [{ key: "lvl-a" }], error: null });
    const { result } = renderHook(() => useLevelRows());
    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.error?.failure.class).toBe("malformed");
  });

  it("LVS-9 a failed download of the database client is the shell's one notice and a network failure (INC-911)", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    door.fails = true;
    door.reported.length = 0;
    try {
      const { result } = renderHook(() => useLevelRows());
      await waitFor(() => expect(result.current.error).not.toBeNull());
      expect(result.current.error?.failure.class).toBe("network");
      expect(door.reported).toEqual(["the level rows' reader"]);
    } finally {
      door.fails = false;
    }
  });
});
