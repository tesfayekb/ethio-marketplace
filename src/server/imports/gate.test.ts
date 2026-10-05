/**
 * INC-265 — THE OPTION RECORD BOUNDARY IS `}|{`, NEVER A BARE PIPE.
 *
 * D28/M-SWATCH allows a two-tone swatch written as two hexes separated by a pipe,
 * and the options cell separates its RECORDS with a pipe. The reader separates only
 * at a pipe that sits OUTSIDE every record, so a two-tone swatch and a piped label
 * stay whole, while a legacy `value=label` segment separates exactly as before.
 */
import { describe, expect, it } from "vitest";

import {
  BUCKET_IDLE_MS,
  bucketFor,
  checkCell,
  hasBucket,
  normalizeOptionsCell,
  optionShapeFault,
  splitOptionSegments,
} from "./gate";
import { FAMILIES } from "./registry";

const twoTone =
  '{"value":"black_tan","label_en":"Black | Tan","swatch":"#000000|#8B5A2B"}|{"value":"white","label_en":"White","swatch":"#FFFFFF"}';

describe("splitOptionSegments", () => {
  it("separates records at the JSON boundary, not inside a two-tone swatch", () => {
    expect(splitOptionSegments(twoTone)).toEqual([
      '{"value":"black_tan","label_en":"Black | Tan","swatch":"#000000|#8B5A2B"}',
      '{"value":"white","label_en":"White","swatch":"#FFFFFF"}',
    ]);
  });

  it("keeps a pipe that lives inside a label", () => {
    const cell = '{"value":"a","label_en":"A|B"}';
    expect(splitOptionSegments(cell)).toEqual([cell]);
  });

  it("respects an escaped quote inside a string", () => {
    const cell = '{"value":"a","label_en":"say \\"a|b\\""}|{"value":"b"}';
    expect(splitOptionSegments(cell)).toEqual([
      '{"value":"a","label_en":"say \\"a|b\\""}',
      '{"value":"b"}',
    ]);
  });

  it("separates legacy value=label segments exactly as before", () => {
    expect(splitOptionSegments("a=A|b=B|c=C")).toEqual(["a=A", "b=B", "c=C"]);
  });
});

describe("the options cell reads and round-trips", () => {
  it("accepts a two-tone swatch and a piped label", () => {
    expect(optionShapeFault(twoTone)).toBeNull();
  });

  it("normalises a two-tone cell to itself (byte-identical round-trip)", () => {
    expect(normalizeOptionsCell(twoTone)).toBe(twoTone);
  });

  it("still refuses a swatch that is not text", () => {
    expect(optionShapeFault('{"value":"a","swatch":123}|{"value":"b"}')).not.toBeNull();
  });
});

describe("INC-298 — idle rate buckets are pruned", () => {
  it("drops a bucket idle past an hour on the next bucketFor", () => {
    const start = 1_000_000;
    bucketFor("inc298-old", start);
    bucketFor("inc298-fresh", start + BUCKET_IDLE_MS);
    expect(hasBucket("inc298-old")).toBe(true);
    bucketFor("inc298-fresh", start + BUCKET_IDLE_MS + 1);
    expect(hasBucket("inc298-old")).toBe(false);
    expect(hasBucket("inc298-fresh")).toBe(true);
  });
});

describe("INC-316 — the icon column is judged against the allowlist", () => {
  const rule = { name: "icon", klass: "editable", type: "icon" } as const;
  it("passes a listed name", () => {
    expect(checkCell(rule, "Warehouse")).toBeNull();
  });
  it("refuses a name off the list", () => {
    expect(checkCell(rule, "NotAnIcon")).toBe("unknownIcon");
  });
  it("passes a blank cell (no change)", () => {
    expect(checkCell(rule, "")).toBeNull();
  });
});

describe("DEC-103 — the option ceiling is 1,500", () => {
  const rule = { name: "options", klass: "editable", type: "options" } as const;
  const cell = (n: number) =>
    Array.from({ length: n }, (_, i) => `{"value":"m${i}","label_en":"Model ${i}"}`).join("|");
  it("accepts a cell of 1,500 options", () => {
    expect(checkCell(rule, cell(1500))).toBeNull();
  });
  it("refuses a cell of 1,501 options as tooManyOptions", () => {
    expect(checkCell(rule, cell(1501))).toBe("tooManyOptions");
  });
});

describe("steps 28–29 census — the gate neither changes nor refuses a catalogue token", () => {
  const file = FAMILIES.attributes!.files.find((entry) => entry.id === "definitions")!;
  const rule = (name: string) => file.columns.find((column) => column.name === name)!;
  it("passes {country} and {category:…} in labels and help text, en and am", () => {
    expect(checkCell(rule("label_en"), "Plug type used in {country}")).toBeNull();
    expect(checkCell(rule("label_am"), "በ{country} የሚሠራ መሰኪያ")).toBeNull();
    expect(checkCell(rule("help_text_en"), "Cases go under {category:phone-cases}.")).toBeNull();
    expect(checkCell(rule("help_text_am"), "ሽፋኖች በ{category:phone-cases} ሥር።")).toBeNull();
  });
  it("keeps a token inside an option label whole, in both cell dialects", () => {
    const records = '{"value":"local","label_en":"Made in {country}"}|{"value":"import","label_en":"Imported"}';
    expect(checkCell(rule("options"), records)).toBeNull();
    expect(splitOptionSegments(records)).toEqual([
      '{"value":"local","label_en":"Made in {country}"}',
      '{"value":"import","label_en":"Imported"}',
    ]);
    expect(normalizeOptionsCell(records)).toContain("Made in {country}");
    expect(normalizeOptionsCell("local=Made in {country}|import=Imported")).toContain(
      "Made in {country}",
    );
  });
});
