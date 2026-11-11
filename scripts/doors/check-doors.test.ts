import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { allow, liveFindings, plantedCases, selfTest, staticFindings } from "./check-doors";
import { FINDING_KINDS, doorContextCall, judge } from "./judge";
import { DOOR_CLASSES, lineRuleErrors, parseManifest, scopeModeOf } from "./manifest";
import {
  LIVE_QUERY,
  LIVE_QUERY_FILE,
  browserCallable,
  chunkBodiesOf,
  liveRows,
  staticRows,
  treeCallers,
} from "./rows";

/**
 * CF-DOORS (DEC-333 / DEC-334) — the door guard proves itself, then the tree:
 * the seven finding kinds each fire on their planted bypass and a clean pair
 * fires nothing (DOORS-1); the manifest's grammar refuses what it must
 * (DOORS-2); the live reader answers the same rows the judge reads and refuses
 * a malformed catalogue (DOORS-3); the repository's own tree reconciles —
 * every browser-callable function has its line and every line its door, under
 * the allowlist's census lines only (DOORS-4); the live query is a file the
 * script prints verbatim, its clauses on their own lines (DOORS-5, INC-1070);
 * the live judgement reads the same tree census as the static one, so the one
 * allowlist serves both modes (DOORS-6, INC-1072), and a body the migrations
 * hand over in chunks counts as a caller in both (DOORS-7, INC-1072).
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
    const rest = " | owner | authenticated | - | - | draft | - | - | draft | - | -";
    const badKeys = [
      "X(uuid)", // the name's rule
      "x(uuid,Text)", // an argument's rule
      "x(uuid", // no closing parenthesis
      "x(uuid,)", // an empty argument
      "x((uuid))", // a parenthesis inside the arguments
    ];
    for (const key of badKeys)
      expect(
        parseManifest(key + rest).errors.map((e) => e.what),
        key,
      ).toEqual([`malformed key ${key}`]);
    expect(parseManifest("x(uuid,text[],timestamp with time zone)" + rest).errors).toEqual([]);
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

  it("DOORS-6 the live mode judges the tree census too: the tree's own catalogue as a live TSV reconciles under the same allowlist (INC-1072)", () => {
    // The repository's catalogue, spelt as psql -At -F tab would print it.
    const { rows } = staticRows(ROOT);
    const tsv = rows
      .map((row) =>
        [
          row.key,
          row.volatility,
          row.definer ? "t" : "f",
          row.anon ? "t" : "f",
          row.authenticated ? "t" : "f",
          row.trigger ? "t" : "f",
          row.body.replace(/[\t\r\n]+/g, " "),
        ].join("\t"),
      )
      .join("\n");
    // One live pass over the tree's rows plus a planted browser grant nothing calls (ruling 7 §3:
    // the tree census is walked once; on CI's runner two passes took 5841 ms).
    const stray =
      "e2e_planted_stray(uuid)\tv\tt\tf\tt\tf\tCREATE OR REPLACE FUNCTION public.e2e_planted_stray(p_id uuid) RETURNS jsonb LANGUAGE plpgsql AS $function$ BEGIN PERFORM public.door_context('owner', NULL, NULL, 'draft'); RETURN '{}'::jsonb; EXCEPTION WHEN SQLSTATE 'P0D01' THEN RETURN public.door_refused('x', 'draft', SQLERRM); END $function$\n";
    const live = liveFindings(`${tsv}\n${stray}`);
    const isStray = (finding: { key: string }) => finding.key === "e2e_planted_stray(uuid)";
    // The stray fires in live mode as it does in static mode.
    expect(live.filter(isStray).map((finding) => finding.kind)).toContain("grant-without-caller");
    // Every census allowance is a live finding too — none reads as stale (the kit throws), and
    // nothing else fires; DOORS-4 proves the same of the static mode, so the two agree.
    expect(
      allow(live.filter((finding) => !isStray(finding))).map(
        (finding) => `${finding.kind} ${finding.key}`,
      ),
    ).toEqual([]);
  });

  it("DOORS-7 a body the migrations hand over in chunks (migration_text_parts) counts as a caller in the static census, as the live catalogue's assembled body does (INC-1072)", () => {
    // The tree: attr_import_plan's chunk 2 calls attr_option_norm_v2 — a caller the static
    // catalogue's single-chunk row never showed (the smoke lane's live mode read census line 4
    // as stale on dc3a7162e).
    const { rows } = staticRows(ROOT);
    const callers = treeCallers(ROOT, rows);
    expect(callers("attr_option_norm_v2")).toBe(true);
    expect(
      rows.some(
        (row) => row.name !== "attr_option_norm_v2" && /\battr_option_norm_v2\s*\(/.test(row.body),
      ),
    ).toBe(false);
    // Planted: a chunk whose code calls a function; a chunk that only names it in a comment.
    const root = mkdtempSync(join(tmpdir(), "doors-chunk-"));
    try {
      for (const dir of ["src", "e2e", join("supabase", "migrations")])
        mkdirSync(join(root, dir), { recursive: true });
      writeFileSync(
        join(root, "supabase", "migrations", "20990101000000_planted.sql"),
        [
          "INSERT INTO public.migration_text_parts (fn, seq, body) VALUES ('e2e_planted_assembled', 2, $chunk$",
          "    -- e2e_planted_commented(x) is only named here",
          "    v_out := public.e2e_planted_callee(v_in);",
          "$chunk$);",
        ].join("\n"),
      );
      const planted = treeCallers(root, []);
      expect(planted("e2e_planted_callee")).toBe(true);
      expect(planted("e2e_planted_commented")).toBe(false);
      expect(planted("e2e_planted_assembled")).toBe(false);
      expect(
        chunkBodiesOf(
          readFileSync(join(root, "supabase", "migrations", "20990101000000_planted.sql"), "utf8"),
        ).map((chunk) => chunk.name),
      ).toEqual(["e2e_planted_assembled"]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("DOORS-5 --live-query prints scripts/doors/live-query.sql as it is: whitespace-separated clauses ending in ; (INC-1070)", () => {
    const printed = execFileSync("bun", ["scripts/doors/check-doors.ts", "--live-query"], {
      cwd: ROOT,
      encoding: "utf8",
    });
    expect(printed).toBe(readFileSync(LIVE_QUERY_FILE, "utf8"));
    expect(printed).toBe(LIVE_QUERY);
    expect(printed).toContain("\nfrom pg_proc p\n");
    expect(printed).toContain("\nwhere p.pronamespace = 'public'::regnamespace");
    expect(printed.trimEnd().endsWith(";")).toBe(true);
    // One statement: the clauses never run together once the comment lines are gone.
    const statement = printed
      .split("\n")
      .filter((line) => !line.startsWith("--"))
      .join("\n");
    expect(statement).toMatch(/^select [\s\S]*\nfrom pg_proc p\nwhere [\s\S]*\norder by 1;\n$/);
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
