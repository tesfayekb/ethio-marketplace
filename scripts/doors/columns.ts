import { readFileSync } from "node:fs";
import { join } from "node:path";

import { walkFiles } from "../conformance/kit";
import { functionCodeOf, tableCreatesOf } from "../conformance/migration-reader";
import { splitTopLevel } from "./identity";

/**
 * Foundations 1, turn F1-3 (ruling 1 item 5) — THE COLUMNS the migrations
 * declare, as `table.column`, for the manifest's `row:<table.column>` cells:
 * every column of a `CREATE TABLE public.<t> (…)` list (constraint entries
 * aside), every `ALTER TABLE … ADD COLUMN` and the new name of every
 * `RENAME COLUMN`. Comments and `DO` blocks are blanked first
 * (`functionCodeOf`), so a proof's scratch table is never a declaration. A
 * dropped column still counts: the census answers "was it ever declared".
 */

const TABLE_CONSTRAINT = /^(?:constraint|primary|unique|check|foreign|exclude|like)\b/i;
const IDENTIFIER = /^"?([A-Za-z_][A-Za-z0-9_]*)"?/;
const ALTER_TABLE =
  /\bALTER\s+TABLE\s+(?:IF\s+EXISTS\s+)?(?:ONLY\s+)?(?:public\.)?"?([A-Za-z_][A-Za-z0-9_]*)"?\s([^;]*);/gi;
const ADD_COLUMN = /\bADD\s+COLUMN\s+(?:IF\s+NOT\s+EXISTS\s+)?"?([A-Za-z_][A-Za-z0-9_]*)"?/gi;
const RENAME_COLUMN =
  /\bRENAME\s+COLUMN\s+"?[A-Za-z_][A-Za-z0-9_]*"?\s+TO\s+"?([A-Za-z_][A-Za-z0-9_]*)"?/gi;

/** The column list of the CREATE TABLE at `offset`: the text inside its outermost parentheses. */
function columnListAt(code: string, offset: number): string | null {
  const open = code.indexOf("(", offset);
  const stop = code.indexOf(";", offset);
  if (open < 0 || (stop >= 0 && stop < open)) return null;
  let depth = 0;
  for (let at = open; at < code.length; at += 1) {
    const ch = code[at];
    if (ch === "(") depth += 1;
    else if (ch === ")") {
      depth -= 1;
      if (depth === 0) return code.slice(open + 1, at);
    }
  }
  return null;
}

/** Every `table.column` one migration file declares. */
export function columnsOf(sql: string): string[] {
  const code = functionCodeOf(sql);
  const found: string[] = [];
  for (const table of tableCreatesOf(sql)) {
    const list = columnListAt(code, table.offset);
    if (list === null) continue;
    for (const entry of splitTopLevel(list)) {
      if (TABLE_CONSTRAINT.test(entry)) continue;
      const column = IDENTIFIER.exec(entry);
      if (column?.[1]) found.push(`${table.name}.${column[1].toLowerCase()}`);
    }
  }
  for (const alter of code.matchAll(ALTER_TABLE)) {
    const table = (alter[1] ?? "").toLowerCase();
    const rest = alter[2] ?? "";
    for (const added of rest.matchAll(ADD_COLUMN))
      found.push(`${table}.${(added[1] ?? "").toLowerCase()}`);
    for (const renamed of rest.matchAll(RENAME_COLUMN))
      found.push(`${table}.${(renamed[1] ?? "").toLowerCase()}`);
  }
  return found;
}

/** Every `table.column` the repository's migrations declare. */
export function declaredColumns(root: string): Set<string> {
  const columns = new Set<string>();
  for (const file of walkFiles([join(root, "supabase", "migrations")], { ext: ["sql"] }))
    for (const column of columnsOf(readFileSync(file, "utf8"))) columns.add(column);
  return columns;
}
