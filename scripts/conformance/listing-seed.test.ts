import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * P-2 (a) ruling 13 item 4 (CF-SEED-1, D318) — THE ONE SEEDER OF LISTING ROWS. The
 * free-slot law lives at the table (listings_free_slot_guard, CF-SLOT-1): a browser
 * test's service-role INSERT of a counted baseline ad obeys it like any other writer,
 * and no test-only switch bypasses it (§7). So every `from("listings").insert(…)` in
 * e2e/ goes through e2e/helpers/listing-seed.ts (seedListingRow / seedListingRows),
 * which reads the seller's room through the guard's own readers before the write and
 * seeds an ad beyond the free slots at a level above the baseline or refuses at the
 * seeding line. A site that stays outside — a draft without a place, or a test of the
 * table's own refusal — holds its allowlist line `<file>:<line> | reason | until`.
 *
 * Ruling 14 item 1 (INC-1061): the law fires on INSERT OR UPDATE OF status, tier, so
 * the census reads the law's definition, not the statement: a `from("listings")
 * .update(…)` (or `.upsert(…)`) whose payload names `status` or `tier` — or whose
 * payload the census cannot read (a variable, a conditional, a spread) — goes
 * through `updateListingRow` in the same helper.
 */

type Finding = { file: string; line: number; what: string };

const HELPER = "e2e/helpers/listing-seed.ts";

/** Whether `node` is `<x>.from("listings")`. */
function isFromListings(node: ts.Node): boolean {
  return (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    node.expression.name.text === "from" &&
    node.arguments.length === 1 &&
    ts.isStringLiteral(node.arguments[0] as ts.Node) &&
    (node.arguments[0] as ts.StringLiteral).text === "listings"
  );
}

/** The columns the free-slot law fires on (`BEFORE INSERT OR UPDATE OF status, tier`). */
const LAW_COLUMNS = new Set(["status", "tier"]);

/** Whether an UPDATE's payload names a law column, or cannot be read as a plain object. */
function writesTheLaw(payload: ts.Expression | undefined): boolean {
  if (payload === undefined) return false;
  if (!ts.isObjectLiteralExpression(payload)) return true;
  return payload.properties.some((property) => {
    if (ts.isSpreadAssignment(property)) return true;
    const name = property.name;
    if (name === undefined) return true;
    if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return LAW_COLUMNS.has(name.text);
    return true;
  });
}

/**
 * Every `from("listings").insert(…)`, and every `.update(…)` / `.upsert(…)` that writes
 * a law column, in the files, by file and line.
 */
export function listingInserts(files: string[]): Finding[] {
  const sites: Finding[] = [];
  for (const file of files) {
    if (file.endsWith(HELPER)) continue;
    visitTs(file, (node, source) => {
      if (
        !ts.isCallExpression(node) ||
        !ts.isPropertyAccessExpression(node.expression) ||
        !isFromListings(node.expression.expression)
      )
        return;
      const verb = node.expression.name.text;
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      if (verb === "insert") {
        sites.push({
          file,
          line,
          what: "a listings INSERT outside e2e/helpers/listing-seed.ts (seedListingRow, D318)",
        });
      } else if ((verb === "update" || verb === "upsert") && writesTheLaw(node.arguments[0])) {
        sites.push({
          file,
          line,
          what: `a listings ${verb.toUpperCase()} of status or tier outside e2e/helpers/listing-seed.ts (updateListingRow, INC-1061)`,
        });
      }
    });
  }
  return sites;
}

const ALLOWLIST = "scripts/conformance/listing-seed-allowlist.txt";

const domain = walkFiles(["e2e"], { ext: ["ts"] });

describe("the one seeder of listing rows (D318, CF-SEED-1)", () => {
  it(
    "CFS-1 every listings INSERT in e2e/ goes through listing-seed.ts, or its line holds it",
    () => {
      const sites = listingInserts(domain);
      const keys = sites.map((site) => `${site.file}:${site.line}`);
      const allowed = readAllowlist(ALLOWLIST, keys);
      const findings = sites.filter((site) => !allowed.has(`${site.file}:${site.line}`));
      console.log(
        `[listing-seed] files read: ${domain.length}; inserts outside the helper: ${sites.length}, held: ${allowed.size}`,
      );
      expect(domain.length).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CFS-2 the census names a planted INSERT and passes a read, an UPDATE of other columns and another table's INSERT", () => {
    const dir = "node_modules/.cache/listing-seed";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/seed-planted.ts`;
    try {
      writeFileSync(
        file,
        [
          "declare const db: { from(table: string): Record<string, (...a: unknown[]) => unknown> };",
          'export const a = db.from("listings").insert({ status: "active" });',
          'export const b = db.from("listings").select("id");',
          'export const c = db.from("listings").update({ title: "sold" });',
          'export const d = db.from("listing_locations").insert({ position: 1 });',
          "",
        ].join("\n"),
      );
      expect(listingInserts([file]).map((site) => site.line)).toEqual([2]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CFS-4 the census names makeState's UPDATE shape (a conditional payload), a named status or tier, a spread and a variable, and passes an UPDATE of other columns", () => {
    const dir = "node_modules/.cache/listing-seed-update";
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/update-planted.ts`;
    try {
      writeFileSync(
        file,
        [
          "declare const db: { from(table: string): Record<string, (...a: unknown[]) => unknown> };",
          "declare const live: boolean;",
          "declare const patch: Record<string, unknown>;",
          'export const a = db.from("listings").update(live ? { status: "active" } : { status: "expired" });',
          'export const b = db.from("listings").update({ tier: "premium" });',
          'export const c = db.from("listings").update({ ...patch, title: "x" });',
          'export const d = db.from("listings").update(patch);',
          'export const e = db.from("listings").update({ reserved_at: "now", price_amount: 9 });',
          'export const f = db.from("listings").upsert({ "status": "sold" });',
          "",
        ].join("\n"),
      );
      expect(listingInserts([file]).map((site) => site.line)).toEqual([4, 5, 6, 7, 9]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CFS-3 the helper itself is in the domain and is the only file left out of the census", () => {
    expect(domain.some((file) => file.endsWith(HELPER))).toBe(true);
    expect(listingInserts(domain.filter((file) => file.endsWith(HELPER)))).toEqual([]);
  });
});
