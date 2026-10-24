import { describe, expect, it } from "vitest";

import { exportColumns, exportFilename, toCsv } from "./csv";
import { isFormulaCell, unneutralize } from "./gate";
import { familyOf, fileOf } from "./registry";

/**
 * Foundations turn 11 (DEC-237) — THE ONE CSV WRITER (CSV-1…4). CSV-4's lists
 * are the literal column lists the categories and attributes exports carried
 * at 126fbb4c, copied character for character before they were deleted.
 */

const file = (family: string, id: string) => fileOf(familyOf(family)!, id)!;
const one = [{ name: "a", header: "a" }];

describe("toCsv", () => {
  it("CSV-1 BOM, CRLF rows and a trailing CRLF", () => {
    const text = toCsv(
      [
        { name: "a", header: "a" },
        { name: "b", header: "b (read-only)" },
      ],
      [
        { a: "1", b: null },
        { a: undefined, b: 2 },
      ],
    );
    expect(text).toBe("\ufeffa,b (read-only)\r\n1,\r\n,2\r\n");
  });

  it('CSV-2 RFC 4180 quoting of ", comma, LF and CR', () => {
    expect(toCsv(one, [{ a: 'say "hi"' }])).toBe('\ufeffa\r\n"say ""hi"""\r\n');
    expect(toCsv(one, [{ a: "x,y" }])).toBe('\ufeffa\r\n"x,y"\r\n');
    expect(toCsv(one, [{ a: "x\ny" }])).toBe('\ufeffa\r\n"x\ny"\r\n');
    expect(toCsv(one, [{ a: "x\ry" }])).toBe('\ufeffa\r\n"x\ry"\r\n');
  });

  it("CSV-3 formula leaders are neutralised exactly where the reader refuses them", () => {
    for (const leader of ["=", "+", "-", "@"]) {
      const cell = `${leader}1`;
      expect(toCsv(one, [{ a: cell }])).toBe(`\ufeffa\r\n'${cell}\r\n`);
      expect(isFormulaCell(cell)).toBe(true);
      expect(unneutralize(`'${cell}`)).toBe(cell);
    }
    // Tab and CR leaders: the reader neither refuses nor strips them, so the
    // writer leaves them as they were at 126fbb4c (a CR is quoted, never prefixed).
    expect(toCsv(one, [{ a: "\tx" }])).toBe("\ufeffa\r\n\tx\r\n");
    expect(isFormulaCell("\tx")).toBe(false);
    expect(toCsv(one, [{ a: "\rx" }])).toBe('\ufeffa\r\n"\rx"\r\n');
    expect(isFormulaCell("\rx")).toBe(false);
  });

  it("CSV-4 exportColumns equals the literal lists the exports carried", () => {
    const headers = (family: string, id: string) =>
      exportColumns(file(family, id)).map((column) => column.header);
    expect(headers("categories", "categories")).toEqual([
      "category_path (read-only)",
      "category_slug",
      "parent_slug",
      "name_en",
      "name_am",
      "display_order",
      "is_active",
      "allow_listings",
      "is_catchall (read-only)",
      "price_enabled",
      "capabilities",
      "default_price_period",
      "price_period_locked",
      "expiry_days",
      "icon",
      "visible_from",
      "visible_until",
      "excluded_country_codes",
      "secondary_parents",
      "listing_count (read-only)",
      "origin_scope (read-only)",
    ]);
    expect(headers("attributes", "definitions")).toEqual([
      "attribute_key",
      "label_en",
      "label_am",
      "type",
      "options",
      "depends_on",
      "unit",
      "min",
      "max",
      "decimals",
      "format",
      "preset",
      "max_length",
      "help_text_en",
      "help_text_am",
      "is_per_variant (read-only)",
      "direct_link_count (read-only)",
      "unit_am",
    ]);
    expect(headers("attributes", "links")).toEqual([
      "category_path (read-only)",
      "category_slug",
      "attribute_key",
      "is_required",
      "is_filterable",
      "card_rank",
      "origin (read-only)",
      "allowed_options",
      "default_value",
      "visible_when",
      "display_order",
      "fact_rank",
    ]);
    for (const [family, id] of [
      ["locations", "countries"],
      ["locations", "locations"],
    ]) {
      expect(headers(family, id)).not.toContain("action");
    }
  });

  it("CSV-5 the filename rule: ethio-<scope->-<file id>-YYYY-MM-DD.csv, UTC day", () => {
    const at = new Date("2026-10-24T23:30:00-05:00");
    expect(exportFilename("categories", null, at)).toBe("ethio-categories-2026-10-25.csv");
    expect(exportFilename("links", "vehicles", at)).toBe("ethio-vehicles-links-2026-10-25.csv");
  });
});
