import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";
import {
  ADMITTED_WRITERS,
  admittedWriters,
  designationFindings,
  designationFindingsOf,
  srcDesignationWrites,
} from "./listing-designation";
import { lastDeclarations } from "./migration-reader";

/**
 * P-2 (a) ruling 14 item 4 (CF-TIER-5) — the five designation columns of
 * public.listings (tier_until, tier_source, reach, reach_until, reach_source)
 * are written only by the level and reach doors, admin_set_listing_tier,
 * transition_listing and designation_sweep_core; src/ never writes them through
 * the data API. Allowances (`<fn>:<file>:<line>` or `<file>:<line>` | reason |
 * until) in listing-designation-allowlist.txt; a stale or expired line fails.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "listing-designation-allowlist.txt");

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

/** A tree of migrations under a temporary root. */
function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "listing-designation-"));
  temps.push(root);
  for (const [name, text] of Object.entries(files)) {
    const path = join(root, "supabase", "migrations", name);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, text);
  }
  return root;
}

const fn = (name: string, body: string) =>
  `CREATE OR REPLACE FUNCTION public.${name}(p_id uuid)
RETURNS void LANGUAGE plpgsql SET search_path TO 'public'
AS $fn$
BEGIN
${body}
END $fn$;
REVOKE ALL ON FUNCTION public.${name}(uuid) FROM PUBLIC;
`;

const lineOf = (text: string, needle: string) =>
  text.split("\n").findIndex((line) => line.includes(needle)) + 1;

const keyOf = (finding: { fn: string; file: string; line: number }) =>
  `${finding.fn}:${basename(finding.file)}:${finding.line}`;

describe("an ad's designation is written by its own doors only (CF-TIER-5)", () => {
  it(
    "DSG-1 no last declaration outside the five admitted bodies writes a designation column, and src/ writes none",
    () => {
      const last = lastDeclarations(ROOT);
      const sql = designationFindings(last);
      const src = srcDesignationWrites(
        walkFiles([join(ROOT, "src")], { ext: ["ts", "tsx"] }).filter(
          (file) => !file.includes(`${join("src", "integrations")}`),
        ),
      ).map((site) => ({ ...site, file: site.file.slice(ROOT.length + 1) }));
      const keys = [...sql.map(keyOf), ...src.map((site) => `${site.file}:${site.line}`)];
      const allowed = readAllowlist(ALLOWLIST, keys);
      expect(
        sql
          .filter((finding) => !allowed.has(keyOf(finding)))
          .map((finding) => `${keyOf(finding)} writes ${finding.columns.join(", ")}`),
      ).toEqual([]);
      expect(report(src.filter((site) => !allowed.has(`${site.file}:${site.line}`)))).toBe("");
      // The census is not blind: each admitted body is read writing its columns.
      expect(admittedWriters(last)).toEqual([...ADMITTED_WRITERS]);
    },
    TREE_SCAN_MS,
  );

  it("DSG-2 a planted body writing a designation column is found (an UPDATE's SET, an INSERT's columns); a read, a WHERE, another table and an admitted body are not", () => {
    const body = `  UPDATE public.listings SET reach = NULL, reach_until = NULL WHERE id = p_id;
  UPDATE public.listings l SET title = 'x', tier_source = (SELECT 'staff' FROM public.t WHERE t.k = 1) WHERE l.id = p_id;
  INSERT INTO public.listings (id, seller_id, tier_until) VALUES (p_id, p_id, now());
  UPDATE public.listings SET title = 'y' WHERE reach = 'country' AND tier_until IS NULL;
  SELECT reach_until INTO v FROM public.listings WHERE id = p_id FOR UPDATE;
  UPDATE public.listing_packages SET reach = 'x' WHERE key = 'k';
  -- UPDATE public.listings SET reach = NULL in a comment
  EXECUTE 'UPDATE public.listings SET reach = NULL';`;
    const file = fn("planted_writer", body);
    const root = tree({
      "20260101000000_a.sql":
        file +
        fn("set_listing_reach", "  UPDATE public.listings SET reach = NULL WHERE id = p_id;"),
    });
    const findings = designationFindingsOf(root);
    expect(
      findings.map((finding) => `${finding.fn} ${finding.line} ${finding.columns.join(",")}`),
    ).toEqual([
      `planted_writer ${lineOf(file, "SET reach = NULL, reach_until")} reach,reach_until`,
      `planted_writer ${lineOf(file, "tier_source = (SELECT")} tier_source`,
      `planted_writer ${lineOf(file, "INSERT INTO public.listings")} tier_until`,
    ]);
  });

  it("DSG-3 the last declaration rules, and a planted src write of a designation column is found while another write is not", () => {
    const root = tree({
      "20260101000000_a.sql": fn(
        "later_fixed",
        "  UPDATE public.listings SET reach = NULL WHERE id = p_id;",
      ),
      "20260102000000_b.sql": fn(
        "later_fixed",
        "  UPDATE public.listings SET title = 'x' WHERE id = p_id;",
      ),
    });
    expect(designationFindingsOf(root)).toEqual([]);

    const dir = mkdtempSync(join(tmpdir(), "listing-designation-src-"));
    temps.push(dir);
    const planted = join(dir, "planted.ts");
    writeFileSync(
      planted,
      [
        "declare const db: { from(t: string): Record<string, (...a: unknown[]) => unknown> };",
        'export const a = db.from("listings").update({ reach: null, reach_until: null });',
        'export const b = db.from("listings").update({ title: "x" });',
        'export const c = db.from("other").upsert([{ "tier_until": null }]);',
        "",
      ].join("\n"),
    );
    expect(srcDesignationWrites([planted]).map((site) => site.line)).toEqual([2, 4]);
  });
});
