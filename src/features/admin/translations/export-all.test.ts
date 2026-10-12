import { describe, expect, it, vi } from "vitest";

import {
  EXPORT_PAGE_SIZE,
  exportFilename,
  fetchAllTranslationRows,
  type TranslationRow,
} from "./translations-service";

/**
 * DEC-026 — U4i-4 (a) / INC-123. The walk exported 25 rows and called it "the
 * catalog": the bar serialised the PAGE it was holding. The pagination loop is
 * therefore unit-tested against a mocked three-page reader — the loop is the
 * fix, so the loop is what must be pinned. Turn C6 (INC-568): the reader is
 * asked for each page after a key, and a write between two pages repeats and
 * drops nothing.
 */
function row(key: string): TranslationRow {
  return {
    key,
    value: `v-${key}`,
    sourceValue: `s-${key}`,
    status: "approved",
    machine: false,
    flagged: false,
    flagNote: null,
    updatedAt: null,
    orphaned: false,
    context: "",
  } as unknown as TranslationRow;
}

/** A language held in memory, read the way the export door reads it: by key, after a key. */
function store(initial: string[]) {
  const keys = new Set(initial);
  const reader = vi.fn(async (after: string | null, limit: number) => {
    const sorted = [...keys].sort();
    const next = sorted.filter((key) => after === null || key > after).slice(0, limit);
    return { data: next.map(row), error: null };
  });
  return { keys, reader };
}

describe("fetchAllTranslationRows", () => {
  it("pages by key until the catalog is exhausted (3 pages) and preserves order", async () => {
    const total = EXPORT_PAGE_SIZE * 2 + 7;
    const { reader } = store(
      Array.from({ length: total }, (_value, index) => `k${String(index).padStart(5, "0")}`),
    );

    const rows = await fetchAllTranslationRows("zxx-mo", reader);

    expect(reader).toHaveBeenCalledTimes(3);
    expect(reader.mock.calls.map(([after]) => after)).toEqual([
      null,
      `k${String(EXPORT_PAGE_SIZE - 1).padStart(5, "0")}`,
      `k${String(EXPORT_PAGE_SIZE * 2 - 1).padStart(5, "0")}`,
    ]);
    expect(rows).toHaveLength(total);
    expect(rows[0]?.key).toBe("k00000");
    expect(rows.at(-1)?.key).toBe(`k${String(total - 1).padStart(5, "0")}`);
  });

  it("INC-568: rows written between two pages neither repeat nor drop a row that was there throughout", async () => {
    const initial = Array.from(
      { length: EXPORT_PAGE_SIZE * 2 },
      (_value, index) => `k${String(index * 2).padStart(5, "0")}`,
    );
    const { keys, reader } = store(initial);
    let call = 0;
    const writer = vi.fn(async (after: string | null, limit: number) => {
      call += 1;
      if (call === 2) {
        // Another admin, between the first and the second page: a key that sorts
        // before the cursor is added, a row already read is removed, a later one
        // is removed and a later one is added.
        keys.add("k00001");
        keys.delete("k00010");
        keys.delete(`k${String(EXPORT_PAGE_SIZE * 3).padStart(5, "0")}`);
        keys.add(`k${String(EXPORT_PAGE_SIZE * 4 + 1).padStart(5, "0")}`);
      }
      return reader(after, limit);
    });

    const rows = await fetchAllTranslationRows("zxx-mo", writer);
    const exported = rows.map((r) => r.key);

    expect(new Set(exported).size, "a row was repeated").toBe(exported.length);
    const throughout = initial.filter((key) => keys.has(key));
    for (const key of throughout) expect(exported, `${key} was dropped`).toContain(key);
    expect(exported).toEqual([...exported].sort());
  });

  it("stops on the first short page without asking for another", async () => {
    const { reader } = store(["a", "b"]);
    const rows = await fetchAllTranslationRows("zxx-mo", reader);
    expect(reader).toHaveBeenCalledTimes(1);
    expect(rows).toHaveLength(2);
  });

  it("an exact multiple of the page asks once more and stops on the empty page", async () => {
    const { reader } = store(
      Array.from(
        { length: EXPORT_PAGE_SIZE },
        (_value, index) => `k${String(index).padStart(5, "0")}`,
      ),
    );
    const rows = await fetchAllTranslationRows("zxx-mo", reader);
    expect(reader).toHaveBeenCalledTimes(2);
    expect(rows).toHaveLength(EXPORT_PAGE_SIZE);
  });

  it("a failed page fails the export: no partial file", async () => {
    const reader = vi.fn(async () => ({ data: null, error: new Error("permission denied") }));
    await expect(fetchAllTranslationRows("zxx-mo", reader)).rejects.toThrow("permission denied");
  });
});

describe("exportFilename", () => {
  it("names the file <lang>-<scope>-<yyyymmdd>", () => {
    const when = new Date(2026, 8, 2);
    expect(exportFilename("am", "interface", "csv", when)).toBe("am-interface-20260902.csv");
    expect(exportFilename("am", "content", "xliff", when)).toBe("am-content-20260902.xlf");
  });
});
