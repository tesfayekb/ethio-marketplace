import { describe, expect, it } from "vitest";

import {
  detectFormat,
  fromCsv,
  fromXliff,
  normalizeTransferValue,
  parseTransfer,
  partitionUnchanged,
  toCsv,
  toXliff,
  transferFilename,
  type TransferRow,
} from "./io-formats";

/**
 * DEC-026 seed coverage for U4i ⑤. Round trips are the contract: whatever the
 * console exports must come back identical, including Ge'ez, quoting,
 * newlines and `{placeholders}`.
 */

const ROWS: TransferRow[] = [
  { key: "common.save", source: "Save", value: "አስቀምጥ", context: "Primary form button" },
  {
    key: "feed.count",
    source: "Showing {count} of {total}",
    value: "ከ{total} ውስጥ {count} በማሳየት ላይ",
    context: "",
  },
  {
    key: "legal.quote",
    source: 'He said "hello", then left',
    value: 'እሱ "ሰላም" አለ, ከዚያ ሄደ',
    context: "Contains a comma and quotes",
  },
  { key: "multi.line", source: "Line one\nLine two", value: "አንድ\nሁለት", context: "" },
];

describe("⑤ CSV", () => {
  it("round-trips every row unchanged", () => {
    const parsed = fromCsv(toCsv(ROWS));
    expect(parsed.malformed).toBe(0);
    expect(parsed.rows).toEqual(ROWS.map((row) => ({ key: row.key, value: row.value })));
  });

  it("quotes cells with commas, quotes and newlines", () => {
    const csv = toCsv([ROWS[2] as TransferRow]);
    expect(csv).toContain('"He said ""hello"", then left"');
  });

  it("tolerates a BOM and a CRLF file from Excel", () => {
    const csv = `\uFEFFkey,source,translation,context\r\ncommon.save,Save,አስቀምጥ,\r\n`;
    expect(fromCsv(csv).rows).toEqual([{ key: "common.save", value: "አስቀምጥ" }]);
  });

  it("counts a row with no translation column as malformed, never as empty text", () => {
    const csv = "key,source,translation,context\r\nonly.key\r\n";
    const parsed = fromCsv(csv);
    expect(parsed.rows).toEqual([]);
    expect(parsed.malformed).toBe(1);
  });
});

describe("⑤ XLIFF 1.2", () => {
  it("round-trips every row unchanged", () => {
    const parsed = fromXliff(toXliff(ROWS, "en", "am"));
    expect(parsed.malformed).toBe(0);
    expect(parsed.rows).toEqual(ROWS.map((row) => ({ key: row.key, value: row.value })));
  });

  it("declares the language pair and wraps payloads in CDATA", () => {
    const xliff = toXliff([ROWS[0] as TransferRow], "en", "am");
    expect(xliff).toContain('source-language="en"');
    expect(xliff).toContain('target-language="am"');
    expect(xliff).toContain("<target><![CDATA[አስቀምጥ]]></target>");
    expect(xliff).toContain("<note><![CDATA[Primary form button]]></note>");
  });

  it("reads a CAT-tool unit that used entities instead of CDATA", () => {
    const xliff = `<xliff version="1.2"><file><body>
      <trans-unit id="a.b" approved="yes"><source>Save</source><target state="final">&lt;b&gt;አስቀምጥ&lt;/b&gt;</target></trans-unit>
    </body></file></xliff>`;
    expect(fromXliff(xliff).rows).toEqual([{ key: "a.b", value: "<b>አስቀምጥ</b>" }]);
  });

  it("counts a target-less unit as malformed", () => {
    const xliff = `<xliff><file><body><trans-unit id="a.b"><source>Save</source></trans-unit></body></file></xliff>`;
    expect(fromXliff(xliff)).toEqual({ rows: [], malformed: 1 });
  });
});

describe("⑤ dispatch", () => {
  it("detects by extension first and by content otherwise", () => {
    expect(detectFormat("ethio-ui-am.xlf", "")).toBe("xliff");
    expect(detectFormat("ethio-ui-am.csv", "")).toBe("csv");
    expect(detectFormat("clipboard", "<trans-unit id='a'></trans-unit>")).toBe("xliff");
    expect(detectFormat("clipboard", "key,source,translation,context")).toBe("csv");
  });

  it("parses through the shared entry point", () => {
    expect(parseTransfer("csv", toCsv(ROWS)).rows.length).toBe(ROWS.length);
    expect(parseTransfer("xliff", toXliff(ROWS, "en", "am")).rows.length).toBe(ROWS.length);
  });

  it("names downloads per language and format", () => {
    expect(transferFilename("am", "csv")).toBe("ethio-ui-am.csv");
    expect(transferFilename("am", "xliff")).toBe("ethio-ui-am.xlf");
  });
});

describe("⑤ no-op law (U4i-3 d, INC-122)", () => {
  const current = new Map<string, string | null>(ROWS.map((row) => [row.key, row.value]));

  it("treats an untouched export re-import as a full no-op", () => {
    const parsed = fromCsv(toCsv(ROWS));
    const split = partitionUnchanged(parsed.rows, current);
    expect(split.changed).toEqual([]);
    expect(split.unchanged).toBe(ROWS.length);
  });

  it("normalizes round-trip noise but never an interior edit", () => {
    expect(normalizeTransferValue("Save\r\n")).toBe("Save");
    expect(normalizeTransferValue("Save  ")).toBe("Save");
    expect(normalizeTransferValue("Sa  ve")).toBe("Sa  ve");
  });

  it("sends a real edit and an unknown key to the server", () => {
    const split = partitionUnchanged(
      [
        { key: "common.save", value: "አስቀምጥ " },
        { key: "common.save", value: "ተለወጠ" },
        { key: "ghost.key", value: "x" },
      ],
      current,
    );
    expect(split.unchanged).toBe(1);
    expect(split.changed).toEqual([
      { key: "common.save", value: "ተለወጠ" },
      { key: "ghost.key", value: "x" },
    ]);
  });
});
