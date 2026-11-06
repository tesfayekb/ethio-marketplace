import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { codeOf, walkFiles } from "../conformance/kit";
import { callableBy, readCatalogue, type UnseenGrant } from "./catalogue";

/**
 * Foundations 1 (DEC-333) — THE ROWS check-doors judges, from either source:
 * - static: the catalogue the migrations leave (scripts/doors/catalogue.ts),
 *   comments blanked, grants replayed;
 * - live: the smoke lane's catalogue of CI's temporary backend, read by
 *   LIVE_QUERY through psql (-At -F tab), one row per function of schema
 *   public, comments stripped and the definition flattened to one line.
 * Both answer the same DoorRow, so the judge (judge.ts) has one body.
 */

export type DoorRow = {
  /** `name(type,type)` as `regprocedure::text` prints it. */
  key: string;
  name: string;
  volatility: "v" | "s" | "i";
  definer: boolean;
  anon: boolean;
  authenticated: boolean;
  /** RETURNS trigger / event_trigger: never a door, read only for stray grants. */
  trigger: boolean;
  /** The body (static: comments blanked; live: the whole definition, comments stripped). */
  body: string;
  where: string;
};

/** A browser role may run the function. */
export function browserCallable(row: Pick<DoorRow, "anon" | "authenticated">): boolean {
  return row.anon || row.authenticated;
}

export function staticRows(root: string): { rows: DoorRow[]; unseen: UnseenGrant[] } {
  const catalogue = readCatalogue(root);
  const rows: DoorRow[] = [];
  for (const fn of catalogue.functions.values()) {
    rows.push({
      key: fn.key,
      name: fn.name,
      volatility: fn.volatility,
      definer: fn.definer,
      anon: callableBy(fn, "anon"),
      authenticated: callableBy(fn, "authenticated"),
      trigger: /^(?:trigger|event_trigger)$/.test(fn.returns),
      body: fn.body,
      where: `${fn.file}:${fn.line}`,
    });
  }
  return { rows, unseen: catalogue.unseen };
}

/**
 * The one query the smoke lane runs (DEC-310's form: live names stay in
 * RUNNER_TEMP) is the file `scripts/doors/live-query.sql`, read verbatim and
 * printed as it is by `--live-query` — never a string code assembles
 * (INC-1070). Columns: key, provolatile, prosecdef, anon, authenticated,
 * trigger, definition (comments stripped, whitespace folded to one space).
 */
export const LIVE_QUERY_FILE = join(dirname(fileURLToPath(import.meta.url)), "live-query.sql");
export const LIVE_QUERY = readFileSync(LIVE_QUERY_FILE, "utf8");

/** The rows of a LIVE_QUERY answer; a malformed row is an error, never a skipped door. */
export function liveRows(tsv: string): DoorRow[] {
  const rows: DoorRow[] = [];
  tsv.split(/\r?\n/).forEach((line, index) => {
    if (line.trim() === "") return;
    const cells = line.split("\t");
    const [key, volatility, definer, anon, authenticated, trigger, body] = cells;
    if (
      cells.length !== 7 ||
      key === undefined ||
      !/^[a-z][a-z0-9_]*\(.*\)$/.test(key) ||
      (volatility !== "v" && volatility !== "s" && volatility !== "i") ||
      [definer, anon, authenticated, trigger].some((flag) => flag !== "t" && flag !== "f") ||
      body === undefined
    )
      throw new Error(`check-doors: malformed live row ${index + 1}`);
    rows.push({
      key,
      name: key.slice(0, key.indexOf("(")),
      volatility,
      definer: definer === "t",
      anon: anon === "t",
      authenticated: authenticated === "t",
      trigger: trigger === "t",
      body,
      where: `live:${index + 1}`,
    });
  });
  if (rows.length === 0) throw new Error("check-doors: the live catalogue is empty");
  return rows;
}

/**
 * The tree's evidence that something calls a function by name: a string
 * literal in src/ or e2e/ code (comments stripped; the generated types aside),
 * a policy or CHECK naming it, or another function of public calling it.
 */
export function treeCallers(root: string, rows: DoorRow[]): (name: string) => boolean {
  const code = walkFiles([join(root, "src"), join(root, "e2e")], { ext: ["ts", "tsx"] })
    .filter((file) => !file.includes("/integrations/"))
    .map((file) => codeOf(readFileSync(file, "utf8")))
    .join("\n");
  const sql = walkFiles([join(root, "supabase", "migrations")], { ext: ["sql"] })
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");
  const policies = [
    ...[...sql.matchAll(/\bCREATE\s+POLICY[\s\S]*?;/gi)].map((match) => match[0]),
    ...[...sql.matchAll(/\bCHECK\s*\([^;]*/gi)].map((match) => match[0]),
  ].join("\n");
  return (name: string) => {
    const quoted = new RegExp(`["']${name}["']`);
    if (quoted.test(code)) return true;
    const called = new RegExp(`\\b${name}\\s*\\(`);
    if (called.test(policies)) return true;
    return rows.some((row) => row.name !== name && called.test(row.body));
  };
}
