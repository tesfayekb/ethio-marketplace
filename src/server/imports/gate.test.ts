/**
 * INC-265 — THE OPTION RECORD BOUNDARY IS `}|{`, NEVER A BARE PIPE.
 *
 * D28/M-SWATCH allows a two-tone swatch written as two hexes separated by a pipe,
 * and the options cell separates its RECORDS with a pipe. The reader separates only
 * at a pipe that sits OUTSIDE every record, so a two-tone swatch and a piped label
 * stay whole, while a legacy `value=label` segment separates exactly as before.
 */
import { describe, expect, it } from "vitest";

import { normalizeOptionsCell, optionShapeFault, splitOptionSegments } from "./gate";

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

  it("still refuses a truncated record", () => {
    expect(optionShapeFault('{"value":"black_tan","swatch":"#000000')).not.toBeNull();
  });
});
