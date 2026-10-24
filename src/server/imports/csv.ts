import type { FileSpec } from "./registry";

/**
 * Foundations turn 11 (DEC-237, INC-860 part 1) — THE ONE CSV WRITER.
 *
 * Every staff export writes its file here, so the importer's reader
 * (gate.ts `parseCsvGrid`) and this writer are the two halves of one format:
 *
 * - the columns are the registry file's, in order, WITHOUT the `action` column
 *   (an exported file states data; `action` is an instruction the operator
 *   adds, and the reader treats a trailing `action` header as optional); a
 *   `klass: "read-only"` column's header carries " (read-only)", which the
 *   reader's `canonicalHeader` strips back;
 * - UTF-8 BOM (Excel reads Ge'ez correctly only with it), CRLF rows and a
 *   trailing CRLF, RFC 4180 quoting of `"`, `,`, CR and LF;
 * - FORMULA SAFETY (CSV injection, OWASP): a cell opening with `=`, `+`, `-`
 *   or `@` gains a leading apostrophe BEFORE quoting — exactly the set the
 *   reader's `isFormulaCell` refuses raw and `unneutralize` strips back
 *   (gate.ts), so every exported cell round-trips. Moved byte for byte from
 *   the three exports.
 */

export type ExportColumn = { name: string; header: string };

export function exportColumns(file: FileSpec): ExportColumn[] {
  return file.columns
    .filter((column) => column.klass !== "action")
    .map((column) => ({
      name: column.name,
      header: column.klass === "read-only" ? `${column.name} (read-only)` : column.name,
    }));
}

/** The leading characters `isFormulaCell` refuses and `unneutralize` strips (gate.ts). */
function neutralize(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function csvCell(raw: unknown): string {
  const value = neutralize(raw === null || raw === undefined ? "" : String(raw));
  return /["\n\r,]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function toCsv(columns: readonly ExportColumn[], rows: Record<string, unknown>[]): string {
  const lines = [columns.map((column) => column.header).join(",")];
  for (const row of rows) lines.push(columns.map((column) => csvCell(row[column.name])).join(","));
  return `\ufeff${lines.join("\r\n")}\r\n`;
}

/** CHANGE (7) — `ethio-<scope->-<file id>-YYYY-MM-DD.csv`, the UTC day; the scope only when scoped. */
export function exportFilename(fileId: string, scope: string | null, now = new Date()): string {
  const day = now.toISOString().slice(0, 10);
  return `ethio-${scope === null ? "" : `${scope}-`}${fileId}-${day}.csv`;
}

/** The export RPCs' refusals, by their own words; anything else is the caller's read failure. */
export function exportRefusal(
  error: { message: string },
  unknownScope: "unknown category scope" | "unknown country scope",
): "forbidden" | typeof unknownScope | null {
  if (error.message.includes("permission denied")) return "forbidden";
  if (error.message.includes(unknownScope)) return unknownScope;
  return null;
}
