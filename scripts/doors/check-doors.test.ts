import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { allow, plantedCases, selfTest, staticFindings } from "./check-doors";
import { FINDING_KINDS, doorContextCall, judge } from "./judge";
import { DOOR_CLASSES, lineRuleErrors, parseManifest, scopeModeOf } from "./manifest";
import { LIVE_QUERY, browserCallable, liveRows, staticRows } from "./rows";

/**
 * CF-DOORS (DEC-333 / DEC-334) — the door guard proves itself, then the tree:
 * the seven finding kinds each fire on their planted bypass and a clean pair
 * fires nothing (DOORS-1); the manifest's grammar refuses what it must
 * (DOORS-2); the live reader answers the same rows the judge reads and refuses
 * a malformed catalogue (DOORS-3); the repository's own tree reconciles —
 * every browser-callable function has its line and every line its door, under
 * the allowlist's census lines only (DOORS-4).
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

describe("check-doors (CF-DOORS)", () => {
  it("DOORS-1 every finding kind fires on its planted fixture; the clean pair fires nothing", () => {
    expect(selfTest()).toEqual([]);
    const kinds = plantedCases().map((planted) => planted.kind);
    for (const kind of FINDING_KINDS) expect(kinds).toContain(kind);
    expect(kinds).toContain("clean");
  });

  it("DOORS-2 the manifest grammar refuses malformed and self-contradicting lines", () => {
    const bad = [
      "x(uuid) | owner | authenticated | - | - | draft | - | - | draft | -", // ten cells
      "x(uuid) | nobody | authenticated | - | - | draft | - | - | draft | - | -", // unknown class
      "x(uuid) | owner | anon,authenticated | - | - | draft | - | - | draft | - | -", // anon on an owner line
      "x(uuid) | staff | authenticated | - | row | staff_config | - | global | staff | - | -", // staff without permission
      "x(uuid) | staff | authenticated | a:b | - | staff_config | - | global | staff | - | -", // staff without step-up
      "x(uuid) | owner | authenticated | - | - | - | - | - | draft | - | -", // a door without a dial
      "x(uuid) | signed-in-reader | authenticated | - | - | draft | - | - | - | - | -", // a reader with a dial
      "x(uuid) | staff | authenticated | a:b | row | staff_config | - | - | staff | - | -", // staff without country
      "x(uuid) | helper | authenticated | - | - | - | - | - | - | - | because", // helper reason word
      "x(uuid) | owner | authenticated | - | - | draft | - | - | draft | Bad-Code | -", // malformed code
      "x(uuid) | owner | authenticated | - | - | draft | - | - | draft | - | -\nx(uuid) | owner | authenticated | - | - | draft | - | - | draft | - | -", // duplicate
    ];
    for (const text of bad) expect(parseManifest(text).errors.length, text).toBeGreaterThan(0);
    const good = parseManifest(
      "y(uuid,text) | staff | authenticated | listings:review | row | staff_moderation | listing.reviewed | row:listings.home_country_code | staff | notFound,alreadyDone | -",
    );
    expect(good.errors).toEqual([]);
    const line = good.lines.get("y(uuid,text)");
    expect(line?.codes).toEqual(["notFound", "alreadyDone"]);
    expect(line === undefined ? null : scopeModeOf(line)).toBe("match");
    expect(line === undefined ? [] : lineRuleErrors(line)).toEqual([]);
    expect(DOOR_CLASSES).toHaveLength(7);
  });

  it("DOORS-3 the live reader answers the judge's rows and refuses a malformed catalogue", () => {
    const def =
      "CREATE OR REPLACE FUNCTION public.e2e_planted_owner(p_id uuid) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER AS $function$ BEGIN v_ctx := public.door_context('owner', NULL, NULL, 'draft'); RETURN jsonb_build_object('ok', true); EXCEPTION WHEN SQLSTATE 'P0D01' THEN RETURN public.door_refused('x', 'draft', SQLERRM); END $function$";
    const rows = liveRows(`e2e_planted_owner(uuid)\tv\tt\tf\tt\tf\t${def}\n`);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.authenticated).toBe(true);
    expect(browserCallable(rows[0] ?? { anon: false, authenticated: false })).toBe(true);
    expect(doorContextCall(rows[0]?.body ?? "")).toEqual([
      { literal: "owner" },
      null,
      null,
      { literal: "draft" },
      null,
      null,
    ]);
    const manifest = parseManifest(
      "e2e_planted_owner(uuid) | owner | authenticated | - | - | draft | - | - | draft | - | -",
    );
    expect(judge(rows, manifest)).toEqual([]);
    expect(() => liveRows("e2e_planted_owner(uuid)\tv\tt\n")).toThrow(/malformed live row/);
    expect(() => liveRows("")).toThrow(/empty/);
    expect(LIVE_QUERY).toContain("has_function_privilege('anon'");
    expect(LIVE_QUERY).toContain("pg_get_functiondef");
  });

  it("DOORS-4 the repository's tree reconciles: every browser-callable function has its line, every line its door", () => {
    const findings = allow(staticFindings(ROOT));
    expect(findings.map((finding) => `${finding.kind} ${finding.key} — ${finding.what}`)).toEqual(
      [],
    );
    const { rows } = staticRows(ROOT);
    const doors = rows.filter((row) => !row.trigger && browserCallable(row));
    const manifest = parseManifest(
      readFileSync(join(ROOT, "scripts", "doors", "manifest.txt"), "utf8"),
    );
    expect(manifest.errors).toEqual([]);
    expect(manifest.lines.size).toBe(doors.length);
    console.log(
      `[doors] ${manifest.lines.size} manifest lines, ${doors.length} browser-callable functions`,
    );
  });
});
