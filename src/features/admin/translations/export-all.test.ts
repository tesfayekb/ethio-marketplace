import { describe, expect, it, vi } from "vitest";

import {
  EXPORT_PAGE_SIZE,
  exportFilename,
  fetchAllTranslationRows,
  type TranslationPage,
  type TranslationRow,
} from "./translations-service";

/**
 * DEC-026 — U4i-4 (a) / INC-123. The walk exported 25 rows and called it "the
 * catalog": the bar serialised the PAGE it was holding. The pagination loop is
 * therefore unit-tested against a mocked three-page reader — the loop is the
 * fix, so the loop is what must be pinned.
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

function page(keys: string[], totalCount: number): TranslationPage {
  return { rows: keys.map(row), totalCount } as unknown as TranslationPage;
}

describe("fetchAllTranslationRows", () => {
  it("pages until the catalog is exhausted (3 pages) and preserves order", async () => {
    const total = EXPORT_PAGE_SIZE * 2 + 7;
    const keys = Array.from({ length: total }, (_value, index) => `k${index}`);
    const reader = vi.fn(async (offset: number, limit: number) =>
      page(keys.slice(offset, offset + limit), total),
    );

    const rows = await fetchAllTranslationRows("zxx-mo", reader);

    expect(reader).toHaveBeenCalledTimes(3);
    expect(reader.mock.calls.map(([offset]) => offset)).toEqual([
      0,
      EXPORT_PAGE_SIZE,
      EXPORT_PAGE_SIZE * 2,
    ]);
    expect(rows).toHaveLength(total);
    expect(rows[0]?.key).toBe("k0");
    expect(rows.at(-1)?.key).toBe(`k${total - 1}`);
  });

  it("stops on the first short page without asking for another", async () => {
    const reader = vi.fn(async () => page(["a", "b"], 2));
    const rows = await fetchAllTranslationRows("zxx-mo", reader);
    expect(reader).toHaveBeenCalledTimes(1);
    expect(rows).toHaveLength(2);
  });

  it("stops on an exact-multiple catalog using the server's own total", async () => {
    const keys = Array.from({ length: EXPORT_PAGE_SIZE }, (_value, index) => `k${index}`);
    const reader = vi.fn(async () => page(keys, EXPORT_PAGE_SIZE));
    const rows = await fetchAllTranslationRows("zxx-mo", reader);
    expect(reader).toHaveBeenCalledTimes(1);
    expect(rows).toHaveLength(EXPORT_PAGE_SIZE);
  });
});

describe("exportFilename", () => {
  it("names the file <lang>-<scope>-<yyyymmdd>", () => {
    const when = new Date(2026, 8, 2);
    expect(exportFilename("am", "interface", "csv", when)).toBe("am-interface-20260902.csv");
    expect(exportFilename("am", "content", "xliff", when)).toBe("am-content-20260902.xlf");
  });
});
