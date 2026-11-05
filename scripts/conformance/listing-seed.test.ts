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

/** Every `from("listings").insert(…)` in the files, by file and line. */
export function listingInserts(files: string[]): Finding[] {
  const sites: Finding[] = [];
  for (const file of files) {
    if (file.endsWith(HELPER)) continue;
    visitTs(file, (node, source) => {
      if (
        !ts.isCallExpression(node) ||
        !ts.isPropertyAccessExpression(node.expression) ||
        node.expression.name.text !== "insert" ||
        !isFromListings(node.expression.expression)
      )
        return;
      sites.push({
        file,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: "a listings INSERT outside e2e/helpers/listing-seed.ts (seedListingRow, D318)",
      });
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

  it("CFS-2 the census names a planted INSERT and passes a read, an UPDATE and another table's INSERT", () => {
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
          'export const c = db.from("listings").update({ status: "sold" });',
          'export const d = db.from("listing_locations").insert({ position: 1 });',
          "",
        ].join("\n"),
      );
      expect(listingInserts([file]).map((site) => site.line)).toEqual([2]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CFS-3 the helper itself is in the domain and is the only file left out of the census", () => {
    expect(domain.some((file) => file.endsWith(HELPER))).toBe(true);
    expect(listingInserts(domain.filter((file) => file.endsWith(HELPER)))).toEqual([]);
  });
});
