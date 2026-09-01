/**
 * U4i ⑤ — CSV AND XLIFF 1.2 SERIALISATION.
 *
 * Pure string in / string out, no DOM and no Node APIs, so the same module runs
 * in the browser, in vitest (DEC-026) and — if it is ever needed — on the
 * server. Ge'ez content is never transliterated or escaped away: both writers
 * emit UTF-8 text verbatim and both readers hand it back byte-for-byte.
 *
 * IMPORT IS NEVER TRUST. These readers only PARSE; the gates, the placeholder
 * validator, the `edited` status, the flagging and the audit all belong to
 * `admin_import_translations` → `admin_save_translation` on the server.
 */

export interface TransferRow {
  key: string;
  source: string;
  value: string;
  context: string;
}

export interface ParsedTransfer {
  rows: { key: string; value: string }[];
  /** Rows the file itself could not yield a key/value pair for. */
  malformed: number;
}

/* ------------------------------ CSV ------------------------------ */

const CSV_HEADER = ["key", "source", "translation", "context"] as const;

function csvCell(value: string): string {
  // RFC 4180: quote when the cell carries a quote, a comma, or any newline.
  const needsQuotes = /["\n\r,]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
}

export function toCsv(rows: TransferRow[]): string {
  const lines = [CSV_HEADER.join(",")];
  for (const row of rows) {
    lines.push([row.key, row.source, row.value, row.context].map(csvCell).join(","));
  }
  // CRLF is what Excel expects; the reader accepts either.
  return `${lines.join("\r\n")}\r\n`;
}

/** RFC 4180 reader: quoted fields, doubled quotes, embedded commas/newlines. */
function parseCsvGrid(text: string): string[][] {
  const grid: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  // Strip a BOM: Excel writes one and it would otherwise poison the first header.
  const input = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    if (quoted) {
      if (char === '"') {
        if (input[index + 1] === '"') {
          cell += '"';
          index += 1;
        } else {
          quoted = false;
        }
      } else {
        cell += char;
      }
      continue;
    }
    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      grid.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }
  if (cell !== "" || row.length > 0) {
    row.push(cell);
    grid.push(row);
  }
  return grid;
}

export function fromCsv(text: string): ParsedTransfer {
  const grid = parseCsvGrid(text);
  const rows: { key: string; value: string }[] = [];
  let malformed = 0;
  const header = grid[0] ?? [];
  const hasHeader = (header[0] ?? "").trim().toLowerCase() === "key";
  const keyIndex = 0;
  const valueIndex = hasHeader
    ? Math.max(
        header.findIndex((name) => name.trim().toLowerCase() === "translation"),
        0,
      )
    : 2;

  for (const line of grid.slice(hasHeader ? 1 : 0)) {
    if (line.length === 1 && (line[0] ?? "").trim() === "") continue;
    const key = (line[keyIndex] ?? "").trim();
    const value = line[valueIndex];
    if (key === "" || value === undefined) {
      malformed += 1;
      continue;
    }
    rows.push({ key, value });
  }
  return { rows, malformed };
}

/* ----------------------------- XLIFF ----------------------------- */

function xmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * CDATA carries the payload so Ge'ez, quotes and `{placeholders}` survive with
 * no escaping at all. The single sequence CDATA cannot contain is `]]>`, which
 * is split across two sections — the standard, lossless workaround.
 */
function cdata(value: string): string {
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

export function toXliff(rows: TransferRow[], sourceLang: string, targetLang: string): string {
  const units = rows
    .map((row) => {
      const note = row.context === "" ? "" : `\n      <note>${cdata(row.context)}</note>`;
      return [
        `    <trans-unit id="${xmlAttr(row.key)}" resname="${xmlAttr(row.key)}">`,
        `      <source>${cdata(row.source)}</source>`,
        `      <target>${cdata(row.value)}</target>${note}`,
        `    </trans-unit>`,
      ].join("\n");
    })
    .join("\n");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">`,
    `  <file original="ethio.com" datatype="plaintext" source-language="${xmlAttr(sourceLang)}" target-language="${xmlAttr(targetLang)}">`,
    `    <body>`,
    units,
    `    </body>`,
    `  </file>`,
    `</xliff>`,
    ``,
  ].join("\n");
}

function decodeXmlText(value: string): string {
  const withoutCdata = value.replace(/<!\[CDATA\[([\s\S]*?)]]>/g, (_whole, inner: string) => inner);
  // A plain-text target (some tools drop CDATA) still needs entity decoding.
  return withoutCdata
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

const UNIT_RE = /<trans-unit\b([^>]*)>([\s\S]*?)<\/trans-unit>/g;
const TARGET_RE = /<target\b[^>]*>([\s\S]*?)<\/target>/;
const ID_RE = /\bid="([^"]*)"/;

/**
 * A regex reader rather than DOMParser: this module must stay runtime-neutral
 * (browser + vitest + server), and the emitted dialect is exactly the one above
 * plus the common CAT-tool variations (no CDATA, extra attributes).
 */
export function fromXliff(text: string): ParsedTransfer {
  const rows: { key: string; value: string }[] = [];
  let malformed = 0;
  for (const unit of text.matchAll(UNIT_RE)) {
    const attrs = unit[1] ?? "";
    const body = unit[2] ?? "";
    const key = (ID_RE.exec(attrs)?.[1] ?? "").trim();
    const target = TARGET_RE.exec(body)?.[1];
    if (key === "" || target === undefined) {
      malformed += 1;
      continue;
    }
    rows.push({ key, value: decodeXmlText(target) });
  }
  return { rows, malformed };
}

/* ---------------------------- dispatch --------------------------- */

export type TransferFormat = "csv" | "xliff";

export function detectFormat(filename: string, text: string): TransferFormat {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".xlf") || lower.endsWith(".xliff") || lower.endsWith(".xml")) return "xliff";
  if (lower.endsWith(".csv")) return "csv";
  // Extension-free upload: the content decides, never a guess.
  return text.includes("<trans-unit") ? "xliff" : "csv";
}

export function parseTransfer(format: TransferFormat, text: string): ParsedTransfer {
  return format === "xliff" ? fromXliff(text) : fromCsv(text);
}

export function transferFilename(lang: string, format: TransferFormat): string {
  return `ethio-ui-${lang}.${format === "xliff" ? "xlf" : "csv"}`;
}
