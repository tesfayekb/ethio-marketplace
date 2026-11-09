import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { readAllowlist, TREE_SCAN_MS } from "./kit";
import { lastDeclarations } from "./migration-reader";
import {
  describeFinding,
  findingKey,
  mappedStatusesOf,
  statusCheckOf,
  statusMapFindings,
  viewStatusesOf,
} from "./status-map";

/**
 * P-2 (a) (CF-STATUS-1, INC-1057, ruling 10 H4) — every status of
 * listings_status_check has a WHEN in listing_group_of (My listings' one
 * mapper) and a place in admin_list_listings' view arrays (or is excluded there
 * by name — the drafts' line). Allowances (`<fn>:<status> | reason | until`) in
 * status-map-allowlist.txt; a stale or expired line fails.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "status-map-allowlist.txt");

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

/** A tree of migrations under a temporary root. */
function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "status-map-"));
  temps.push(root);
  for (const [name, text] of Object.entries(files)) {
    const path = join(root, "supabase", "migrations", name);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, text);
  }
  return root;
}

const check = (statuses: string[]) =>
  `ALTER TABLE public.listings ADD CONSTRAINT listings_status_check
  CHECK (status IN (${statuses.map((s) => `'${s}'`).join(",")}));
`;

const mapper = (whens: string[]) =>
  `CREATE OR REPLACE FUNCTION public.listing_group_of(p_status text)
RETURNS text LANGUAGE plpgsql IMMUTABLE SET search_path TO 'public'
AS $fn$
DECLARE v_group text;
BEGIN
  -- WHEN 'ghost' THEN 'live' (a comment names nothing)
  v_group := CASE p_status ${whens.map((s) => `WHEN '${s}' THEN 'g'`).join(" ")} END;
  IF v_group IS NULL THEN RAISE EXCEPTION 'my_listings: unmapped status %', p_status; END IF;
  RETURN v_group;
END $fn$;
REVOKE ALL ON FUNCTION public.listing_group_of(text) FROM PUBLIC;
`;

const admin = (views: Record<string, string[]>, excluded: string[] = []) =>
  `CREATE OR REPLACE FUNCTION public.admin_list_listings(p_view text)
RETURNS SETOF uuid LANGUAGE plpgsql STABLE SET search_path TO 'public'
AS $fn$
DECLARE v_statuses text[];
BEGIN
  v_statuses := CASE p_view
    ${Object.entries(views)
      .map(
        ([view, statuses]) =>
          `WHEN '${view}' THEN ARRAY[${statuses.map((s) => `'${s}'`).join(",")}]`,
      )
      .join("\n    ")}
  END;
  RETURN QUERY SELECT l.id FROM public.listings l
   WHERE l.status = ANY (v_statuses)${excluded.map((s) => `\n     AND l.status <> '${s}'`).join("")};
END $fn$;
REVOKE ALL ON FUNCTION public.admin_list_listings(text) FROM PUBLIC;
`;

describe("every status has its place in the two status readers (CF-STATUS-1)", () => {
  it(
    "STM-1 the tree's statuses are all mapped by listing_group_of and placed (or excluded by name) by admin_list_listings",
    () => {
      const last = lastDeclarations(ROOT);
      const findings = statusMapFindings(ROOT, last);
      const allowed = readAllowlist(ALLOWLIST, findings.map(findingKey));
      const unexcused = findings.filter((finding) => !allowed.has(findingKey(finding)));
      expect(unexcused.map(describeFinding)).toEqual([]);
      // The census is not blind: the check holds the eleven statuses, 'paused' among them; the
      // mapper names each; the admin's 'all' view names every status but the draft, which its
      // body excludes by name.
      const statuses = statusCheckOf(ROOT);
      expect(statuses?.statuses).toContain("paused");
      expect(statuses?.statuses.length).toBeGreaterThanOrEqual(11);
      const mapped = mappedStatusesOf(last.get("listing_group_of")?.body ?? "");
      expect(new Set(mapped)).toEqual(new Set(statuses?.statuses));
      const views = viewStatusesOf(last.get("admin_list_listings")?.body ?? "");
      expect(views.excluded).toEqual(["draft"]);
      expect(views.named).toContain("paused");
    },
    TREE_SCAN_MS,
  );

  it("STM-2 a planted gap is found in each reader: an unmapped status, an unknown literal, a status no view names; one excluded by name is not", () => {
    const all = ["draft", "active", "closed", "paused"];
    const file =
      check(all) +
      mapper(["draft", "active", "closed", "ghost"]) +
      admin({ live: ["active"], all: ["active", "closed"] }, ["draft"]);
    const root = tree({ "20260101000000_a.sql": file });
    expect(statusMapFindings(root).map(findingKey).sort()).toEqual([
      "admin_list_listings:paused",
      "listing_group_of:ghost",
      "listing_group_of:paused",
    ]);
    const lineOf = (needle: string) =>
      file.split("\n").findIndex((line) => line.includes(needle)) + 1;
    expect(statusMapFindings(root).map(describeFinding).sort()).toEqual(
      [
        `20260101000000_a.sql:${lineOf("FUNCTION public.admin_list_listings")} admin_list_listings gives 'paused' no place`,
        `20260101000000_a.sql:${lineOf("FUNCTION public.listing_group_of")} listing_group_of gives 'paused' no place`,
        `20260101000000_a.sql:${lineOf("FUNCTION public.listing_group_of")} listing_group_of names 'ghost', which listings_status_check does not`,
      ].sort(),
    );
    // A reader the tree does not declare is its own finding.
    const bare = tree({ "20260101000000_a.sql": check(all) });
    expect(statusMapFindings(bare).map(findingKey).sort()).toEqual([
      "admin_list_listings:missing",
      "listing_group_of:missing",
    ]);
    // Without a status check there is nothing to judge.
    expect(statusMapFindings(tree({ "20260101000000_a.sql": mapper(all) }))).toEqual([]);
  });

  it("STM-3 the last declaration rules: a later check, mapper or admin reader replaces the earlier one", () => {
    const root = tree({
      "20260101000000_a.sql":
        check(["draft", "active"]) +
        mapper(["draft", "active"]) +
        admin({ all: ["active"] }, ["draft"]),
      "20260102000000_b.sql":
        check(["draft", "active", "paused"]) +
        mapper(["draft", "active", "paused"]) +
        admin({ all: ["active", "paused"] }, ["draft"]),
    });
    expect(statusMapFindings(root)).toEqual([]);
    const regressed = tree({
      "20260101000000_a.sql":
        check(["draft", "active", "paused"]) +
        mapper(["draft", "active", "paused"]) +
        admin({ all: ["active", "paused"] }, ["draft"]),
      "20260102000000_b.sql": mapper(["draft", "active"]),
    });
    expect(statusMapFindings(regressed).map(findingKey)).toEqual(["listing_group_of:paused"]);
  });
});
