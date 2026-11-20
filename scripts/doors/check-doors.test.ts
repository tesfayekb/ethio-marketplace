import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { GRANT_DROPPED_FLOOR, catalogueOf } from "./catalogue";
import {
  PLANTED_HELPER_LINE,
  PLANTED_POLICIES,
  PLANTED_PUBLIC_DATA_LINE,
  PLANTED_READER_LINE,
  PLANTED_STEP_UPS,
  READER_SHELL_BODY,
  allow,
  liveFindings,
  plantedCases,
  plantedDropHistory,
  plantedGrant,
  plantedReaders,
  selfTest,
  staticFindings,
} from "./check-doors";
import { columnsOf, declaredColumns } from "./columns";
import { FINDING_KINDS, doorContextCall, judge, reasonPolicies } from "./judge";
import { DOOR_CLASSES, lineRuleErrors, parseManifest, scopeModeOf } from "./manifest";
import { declaredPolicyCalls, policyCallsOf } from "./policies";
import {
  LIVE_QUERY,
  LIVE_QUERY_FILE,
  browserCallable,
  chunkBodiesOf,
  liveRows,
  staticRows,
  treeCallers,
  type DoorRow,
} from "./rows";
import { declaredStepUps, stepUpsOf } from "./step-ups";

/**
 * CF-DOORS (DEC-333 / DEC-334) — the door guard proves itself, then the tree:
 * the thirteen finding kinds each fire on their planted bypass and a clean pair
 * fires nothing (DOORS-1); the manifest's grammar refuses what it must
 * (DOORS-2); the live reader answers the same rows the judge reads and refuses
 * a malformed catalogue (DOORS-3); the repository's own tree reconciles —
 * every browser-callable function has its line and every line its door, under
 * the allowlist's census lines only (DOORS-4); the live query is a file the
 * script prints verbatim, its clauses on their own lines (DOORS-5, INC-1070);
 * the live judgement reads the same tree census as the static one, so the one
 * allowlist serves both modes (DOORS-6, INC-1072), and a body the migrations
 * hand over in chunks counts as a caller in both (DOORS-7, INC-1072); a `row:` cell names a
 * column the migrations declare (DOORS-8, F1-3); a DROP + CREATE restates every role the
 * function held, judged by the file from the floor and by the result before it (DOORS-10, F1-5a); a
 * `none:` step-up cell names a permission the migrations declare without step-up (DOORS-11, F1-6a);
 * a reader off the gate is a public reader whose `public-data` holds through every body it names
 * (DOORS-12, F1-7a); a helper's `policy` reason names standing policies that call it (DOORS-13,
 * F1-7a, INC-1212); a dynamic grant on a proof's pg_temp copy is no public grant (DOORS-14, F1-7a);
 * a body on the gate keeps the shell exactly when it spends a dial (DOORS-15, F1-7c ruling 1).
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

// The tests that read the repository's own migration tree declare this limit (F1-4b, DOORS-6's
// second occurrence): the first read walks every migration file, and the tree only grows — 4.1 s on
// CI's runner at 1350b00, 6.1 to 6.8 s once F1-4a's files joined it — so the default 5 s cannot hold.
// Later reads in the same process reuse it (scripts/doors/once.ts). A test that reads no tree keeps
// the default.
const TREE_READ_MS = 20_000;

/** The losses of a history whose second file at `stamp` holds `sql` alone (no re-creation). */
function catalogueDrop(stamp: string, sql: string) {
  return catalogueOf([
    {
      file: "supabase/migrations/20260101000000_planted.sql",
      sql: `CREATE FUNCTION public.e2e_planted_owner(p_id uuid) RETURNS jsonb LANGUAGE plpgsql AS $function$ BEGIN RETURN '{}'::jsonb; END $function$;\n${plantedGrant("authenticated, service_role")}\n`,
    },
    { file: `supabase/migrations/${stamp}_planted.sql`, sql },
  ]).dropped;
}

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
    expect(
      parseManifest("x() | helper | anon,authenticated | - | - | - | - | - | - | - | policy p_read")
        .errors,
    ).toEqual([]);
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

  it(
    "DOORS-6 the live mode judges the tree census too: the tree's own catalogue as a live TSV reconciles under the same allowlist (INC-1072)",
    { timeout: TREE_READ_MS },
    () => {
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
    },
  );

  it(
    "DOORS-7 a body the migrations hand over in chunks (migration_text_parts) counts as a caller in the static census, as the live catalogue's assembled body does (INC-1072)",
    { timeout: TREE_READ_MS },
    () => {
      // The tree: attr_import_plan's chunk 2 calls attr_option_norm_v2 — a caller the static
      // catalogue's single-chunk row never showed (the smoke lane's live mode read census line 4
      // as stale on dc3a7162e).
      const { rows } = staticRows(ROOT);
      const callers = treeCallers(ROOT, rows);
      expect(callers("attr_option_norm_v2")).toBe(true);
      expect(
        rows.some(
          (row) =>
            row.name !== "attr_option_norm_v2" && /\battr_option_norm_v2\s*\(/.test(row.body),
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
        const planted = treeCallers(root, [], { fresh: true });
        expect(planted("e2e_planted_callee")).toBe(true);
        expect(planted("e2e_planted_commented")).toBe(false);
        expect(planted("e2e_planted_assembled")).toBe(false);
        expect(
          chunkBodiesOf(
            readFileSync(
              join(root, "supabase", "migrations", "20990101000000_planted.sql"),
              "utf8",
            ),
          ).map((chunk) => chunk.name),
        ).toEqual(["e2e_planted_assembled"]);
      } finally {
        rmSync(root, { recursive: true, force: true });
      }
    },
  );

  it("DOORS-9 the tree is read once per root: a second read is the first's answer, and a fresh read sees a changed root (F1-4b)", () => {
    const root = mkdtempSync(join(tmpdir(), "doors-once-"));
    try {
      for (const dir of ["src", "e2e", join("supabase", "migrations")])
        mkdirSync(join(root, dir), { recursive: true });
      const file = join(root, "supabase", "migrations", "20990101000000_planted.sql");
      const part = (callee: string) =>
        [
          "INSERT INTO public.migration_text_parts (fn, seq, body) VALUES ('e2e_planted_assembled', 2, $chunk$",
          `    v_out := public.${callee}(v_in);`,
          "$chunk$);",
        ].join("\n");
      writeFileSync(file, part("e2e_planted_first"));
      const first = treeCallers(root, []);
      expect(first("e2e_planted_first")).toBe(true);
      // The root changes; a plain read still answers from the first read (never a silent re-read).
      writeFileSync(file, part("e2e_planted_second"));
      expect(treeCallers(root, [])("e2e_planted_second")).toBe(false);
      expect(treeCallers(root, [])("e2e_planted_first")).toBe(true);
      // The explicit option asks for the changed tree, and is what later plain reads then see.
      expect(treeCallers(root, [], { fresh: true })("e2e_planted_second")).toBe(true);
      expect(treeCallers(root, [])("e2e_planted_first")).toBe(false);
      expect(staticRows(root)).toBe(staticRows(root));
      expect(staticRows(root, { fresh: true })).toBe(staticRows(root));
      expect(declaredColumns(root)).toBe(declaredColumns(root));
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("DOORS-10 a DROP + CREATE restates every role the function held: the file from the floor, the result before it (F1-5a, ruling 2)", () => {
    const fired = (history: ReturnType<typeof plantedDropHistory>) =>
      history.map((loss) => `${loss.key} ${loss.role} ${loss.judge} ${loss.file}`);
    const atFloor = `${GRANT_DROPPED_FLOOR.slice(0, 8)}120000`;
    // The file's judge: a file at the floor restates authenticated only.
    expect(fired(plantedDropHistory(atFloor, plantedGrant("authenticated")))).toEqual([
      `e2e_planted_owner(uuid) service_role file supabase/migrations/${atFloor}_planted.sql`,
    ]);
    // A later file giving the role back does not excuse a file at the floor.
    expect(
      fired(
        plantedDropHistory(atFloor, plantedGrant("authenticated"), [plantedGrant("service_role")]),
      ),
    ).toHaveLength(1);
    // Good files: both roles restated; the lost role REVOKEd by name.
    expect(plantedDropHistory(atFloor, plantedGrant("authenticated, service_role"))).toEqual([]);
    expect(
      plantedDropHistory(
        atFloor,
        `${plantedGrant("authenticated")}\nREVOKE ALL ON FUNCTION public.e2e_planted_owner(uuid) FROM service_role;`,
      ),
    ).toEqual([]);
    // A drop with no re-creation in its file is not judged.
    expect(catalogueDrop(atFloor, "DROP FUNCTION public.e2e_planted_owner(uuid);")).toEqual([]);
    // The result's judge, below the floor: a loss nothing gives back fires; a loss a later
    // file gives back fires nothing.
    expect(fired(plantedDropHistory("20260601000000", plantedGrant("authenticated")))).toEqual([
      "e2e_planted_owner(uuid) service_role result supabase/migrations/20260601000000_planted.sql",
    ]);
    expect(
      plantedDropHistory("20260601000000", plantedGrant("authenticated"), [
        plantedGrant("service_role"),
      ]),
    ).toEqual([]);
    // The judge's finding names the role and the file.
    const [planted] = plantedCases().filter((c) => c.kind === "grant-dropped");
    expect(
      judge(planted?.rows ?? [], parseManifest(planted?.manifest ?? ""), {
        dropped: planted?.dropped,
      }).map((finding) => `${finding.kind} ${finding.key} (${finding.where})`),
    ).toEqual([
      "grant-dropped e2e_planted_owner(uuid) service_role (supabase/migrations/20990101000000_planted.sql:1)",
    ]);
  });

  it("DOORS-14 a dynamic grant on a proof's pg_temp copy is no public grant; any other unresolved target stays unseen (F1-7a)", () => {
    const unseenOf = (statement: string) =>
      catalogueOf([
        {
          file: "supabase/migrations/20990101000000_planted.sql",
          sql: `DO $$ DECLARE v_r record; BEGIN FOR v_r IN SELECT 'a' AS name, 'uuid' AS def LOOP ${statement}; END LOOP; END $$;\n`,
        },
      ]).unseen.map((grant) => grant.text);
    expect(
      unseenOf(
        "EXECUTE format('REVOKE ALL ON FUNCTION pg_temp.f17a_old_%s(%s) FROM PUBLIC', v_r.name, v_r.def)",
      ),
    ).toEqual([]);
    expect(
      unseenOf(
        "EXECUTE format('REVOKE ALL ON FUNCTION public.%s(%s) FROM PUBLIC', v_r.name, v_r.def)",
      ),
    ).toHaveLength(1);
    expect(
      unseenOf("EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO anon', v_r.name)"),
    ).toHaveLength(1);
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

  it(
    "DOORS-8 a row: cell names a column the migrations declare: the census reads tables, added and renamed columns, never a DO block's scratch table",
    { timeout: TREE_READ_MS },
    () => {
      const sql = [
        "-- CREATE TABLE public.commented (ghost text);",
        "CREATE TABLE public.e2e_planted_prices (",
        "  id uuid PRIMARY KEY,",
        "  country_code char(2) NOT NULL REFERENCES public.countries(code),",
        "  amount numeric(12, 2),",
        "  CONSTRAINT e2e_planted_prices_amount CHECK (amount > 0),",
        "  UNIQUE (country_code, amount)",
        ");",
        "ALTER TABLE public.e2e_planted_prices ADD COLUMN IF NOT EXISTS ends_at timestamptz;",
        "ALTER TABLE ONLY public.e2e_planted_prices RENAME COLUMN amount TO price;",
        "DO $ BEGIN CREATE TEMP TABLE scratch (country text); END $;",
      ].join("\n");
      expect(columnsOf(sql).sort()).toEqual([
        "e2e_planted_prices.amount",
        "e2e_planted_prices.country_code",
        "e2e_planted_prices.ends_at",
        "e2e_planted_prices.id",
        "e2e_planted_prices.price",
      ]);
      const line = (cell: string) =>
        `e2e_planted_staff(uuid) | staff | authenticated | packages:update | row | staff_config | - | row:${cell} | staff | - | -`;
      const columns = new Set(columnsOf(sql));
      const fired = (cell: string) =>
        judge([], parseManifest(line(cell)), { columns }).filter(
          (finding) => finding.kind === "row-column-unknown",
        );
      expect(fired("e2e_planted_prices.country_code")).toEqual([]);
      expect(fired("e2e_planted_prices.country").map((finding) => finding.what)).toEqual([
        "row:e2e_planted_prices.country names a column no migration declares",
      ]);
      expect(fired("scratch.country")).toHaveLength(1);
      expect(fired("commented.ghost")).toHaveLength(1);
      // The tree: every row: cell of the manifest names a declared column.
      const declared = declaredColumns(ROOT);
      expect(declared.has("package_prices.country_code")).toBe(true);
      expect(declared.has("package_prices.country")).toBe(false);
      const cells = [
        ...parseManifest(
          readFileSync(join(ROOT, "scripts", "doors", "manifest.txt"), "utf8"),
        ).lines.values(),
      ]
        .map((entry) => entry.country)
        .flatMap((country) => (country?.kind === "row" ? [country.column] : []));
      expect(cells.length).toBeGreaterThan(0);
      expect(cells.filter((column) => !declared.has(column))).toEqual([]);
    },
  );

  it(
    "DOORS-11 a none: step-up cell holds only over a permission declared without step-up: fires over listings:review, not over listings:reveal (F1-6a ruling 1, Part A)",
    { timeout: TREE_READ_MS },
    () => {
      const planted = stepUpsOf([
        { file: "supabase/migrations/20260101000000_a.sql", sql: PLANTED_STEP_UPS },
        {
          file: "supabase/migrations/20260102000000_b.sql",
          sql: [
            "UPDATE public.permissions p SET requires_step_up = true FROM public.resources r",
            "WHERE r.id = p.resource_id AND (r.name, p.action) IN (('profiles', 'update'), ('roles', 'assign'));",
            "DO $ BEGIN UPDATE public.permissions p SET requires_step_up = v_saved FROM public.resources r",
            "WHERE r.id = p.resource_id AND r.name = 'roles' AND p.action IN ('assign'); END $;",
          ].join("\n"),
        },
      ]);
      expect(planted("listings:review")).toBe(true);
      expect(planted("listings:reveal")).toBe(false);
      expect(planted("listings:view")).toBe(false);
      expect(planted("profiles:update")).toBe(true);
      expect(planted("roles:assign")).toBeNull();
      expect(planted("listings:enforce")).toBeUndefined();
      const line = (permission: string, stepUp: string) =>
        `e2e_planted_staff(uuid) | staff | authenticated | ${permission} | ${stepUp} | staff_moderation | - | global | staff | - | -`;
      const fired = (permission: string, stepUp = "none:D129") =>
        judge([], parseManifest(line(permission, stepUp)), { stepUps: planted })
          .filter((finding) => finding.kind === "opt-out-over-step-up")
          .map((finding) => finding.what);
      expect(fired("listings:review")).toEqual([
        "none:D129 over listings:review, whose declared requires_step_up is true",
      ]);
      expect(fired("listings:reveal")).toEqual([]);
      expect(fired("roles:assign")).toEqual([
        "none:D129 over roles:assign, whose declared requires_step_up is unreadable",
      ]);
      expect(fired("listings:enforce")).toHaveLength(1);
      expect(fired("listings:review", "row")).toEqual([]);
      // The tree: the flags the local proof stack reads (F1-6a census, #PERMS).
      const tree = declaredStepUps(ROOT);
      expect(tree("listings:review")).toBe(true);
      expect(tree("listings:reveal")).toBe(false);
      expect(tree("listings:enforce")).toBe(true);
      expect(tree("listings:view")).toBe(false);
      expect(tree("categories:update")).toBe(false);
      expect(tree("profiles:update")).toBe(true);
    },
  );

  it("DOORS-12 a reader off the gate is refused unless it is a public reader whose reason public-data holds through every body it names (F1-7a ruling 1, decisions 4 and 9)", () => {
    const fired = (manifest: string, rows: ReturnType<typeof plantedReaders>) =>
      judge(rows, parseManifest(manifest))
        .filter((finding) => finding.kind === "reader-off-gate")
        .map((finding) => `${finding.key} — ${finding.what}`);
    const reads = [
      "BEGIN RETURN auth.uid()::text; END",
      "SELECT auth.role()",
      "SELECT auth . jwt() ->> 'sub'",
      "SELECT current_setting('request.jwt.claims', true)",
    ];
    for (const body of reads)
      expect(fired(PLANTED_PUBLIC_DATA_LINE, plantedReaders(body)), body).toEqual([
        "e2e_planted_public(text) — public-data, yet e2e_planted_inner(text) reads its caller",
      ]);
    expect(fired(PLANTED_PUBLIC_DATA_LINE, plantedReaders("SELECT p_lang"))).toEqual([]);
    const deeper = [
      ...plantedReaders("SELECT public.e2e_planted_deep(p_lang)"),
      ...plantedReaders("SELECT 1")
        .slice(1)
        .map((inner) => ({
          ...inner,
          key: "e2e_planted_deep(text)",
          name: "e2e_planted_deep",
          body: "SELECT auth.uid()",
        })),
    ];
    expect(fired(PLANTED_PUBLIC_DATA_LINE, deeper)).toEqual([
      "e2e_planted_public(text) — public-data, yet e2e_planted_deep(text) reads its caller",
    ]);
    expect(
      fired(PLANTED_PUBLIC_DATA_LINE.replace("public-data", "-"), plantedReaders("SELECT p_lang")),
    ).toEqual([
      "e2e_planted_public(text) — a public reader off the gate carries the reason public-data",
    ]);
    const signedIn = plantedReaders("SELECT p_lang").map((planted) => ({
      ...planted,
      anon: false,
    }));
    const signedInLine = (cls: string, cells: string) =>
      `e2e_planted_public(text) | ${cls} | authenticated | ${cells} | - | - | public-data`;
    expect(fired(signedInLine("signed-in-reader", "- | - | - | - | -"), signedIn)).toEqual([
      "e2e_planted_public(text) — a signed-in-reader takes door_context",
    ]);
    expect(
      fired(signedInLine("staff-reader", "translations:manage | - | - | - | global"), signedIn),
    ).toEqual(["e2e_planted_public(text) — a staff-reader takes door_context"]);
    const gated = plantedReaders("SELECT auth.uid()").map((planted, index) =>
      index === 0
        ? { ...planted, body: "BEGIN v_ctx := public.door_context('public'); RETURN 1; END" }
        : planted,
    );
    expect(fired(PLANTED_PUBLIC_DATA_LINE.replace("public-data", "-"), gated)).toEqual([]);
  });

  it(
    "DOORS-13 a helper's policy reason names standing policies that call it: created, not dropped, calling by name (F1-7a ruling 1 decision 7, INC-1212)",
    { timeout: TREE_READ_MS },
    () => {
      const calls = policyCallsOf(PLANTED_POLICIES);
      expect(calls("e2e_planted_read", "e2e_planted_helper")).toBe(true);
      expect(calls("e2e_planted_other", "e2e_planted_helper")).toBe(false);
      expect(calls("e2e_planted_gone", "e2e_planted_helper")).toBe(false);
      expect(calls("e2e_planted_missing", "e2e_planted_helper")).toBe(false);
      const fired = (reason: string) =>
        judge(
          [
            {
              key: "e2e_planted_helper(uuid)",
              name: "e2e_planted_helper",
              volatility: "s",
              definer: true,
              anon: false,
              authenticated: true,
              trigger: false,
              body: "SELECT true",
              where: "planted",
            },
          ],
          parseManifest(PLANTED_HELPER_LINE(reason)),
          { policies: calls },
        )
          .filter((finding) => finding.kind === "helper-reason-unproven")
          .map((finding) => finding.what);
      expect(fired("policy e2e_planted_read")).toEqual([]);
      expect(fired("policy")).toEqual(["the reason policy names no policy"]);
      expect(fired("policy e2e_planted_read, e2e_planted_gone, e2e_planted_other")).toEqual([
        "no standing policy e2e_planted_gone, e2e_planted_other calls e2e_planted_helper",
      ]);
      expect(fired("invoker-chain")).toEqual([]);
      expect(reasonPolicies("policy a_read, b_read")).toEqual(["a_read", "b_read"]);
      // The tree: the two helper lines left after F1-7a hold by their policies.
      const tree = declaredPolicyCalls(ROOT);
      expect(tree("listings_public_read", "sold_cutoff")).toBe(true);
      expect(tree("user_roles_read", "has_permission")).toBe(true);
      expect(tree("listings_public_read", "has_permission")).toBe(false);
    },
  );

  it("DOORS-15 a body on the gate keeps the shell exactly when it spends a dial (F1-7c ruling 1, decision 3)", () => {
    const plantedRow = (key: string, body: string, volatility: DoorRow["volatility"]): DoorRow => ({
      key,
      name: key.slice(0, key.indexOf("(")),
      body,
      volatility,
      definer: true,
      anon: false,
      authenticated: true,
      trigger: false,
      where: "planted",
    });
    const fired = (
      manifest: string,
      key: string,
      body: string,
      volatility: DoorRow["volatility"] = "v",
    ) =>
      judge([plantedRow(key, body, volatility)], parseManifest(manifest))
        .filter((finding) => finding.kind === "dial-shell-mismatch")
        .map((finding) => finding.what);
    const owner = "e2e_planted_owner(uuid)";
    const ownerLine = `${owner} | owner | authenticated | - | - | draft | - | - | draft | - | -`;
    const readerKey = "e2e_planted_reader(uuid)";
    const plainReader = "BEGIN PERFORM public.door_context('reader'); RETURN '{}'::jsonb; END";
    const shellDoor =
      "BEGIN v_ctx := public.door_context('owner', NULL, NULL, 'draft'); RETURN '{}'::jsonb; EXCEPTION WHEN SQLSTATE 'P0D01' THEN RETURN public.door_refused('x', 'draft', SQLERRM); END";
    const bareDoor =
      "BEGIN v_ctx := public.door_context('owner', NULL, NULL, 'draft'); RETURN '{}'::jsonb; END";
    expect(parseManifest(PLANTED_READER_LINE).errors).toEqual([]);
    expect(fired(PLANTED_READER_LINE, readerKey, READER_SHELL_BODY, "s")).toEqual([
      "a shell without a dial: door_context marks the call a reader",
    ]);
    expect(fired(PLANTED_READER_LINE, readerKey, plainReader, "s")).toEqual([]);
    expect(fired(ownerLine, owner, bareDoor)).toEqual([
      "a dial without the shell: door_context marks the call a door",
    ]);
    expect(fired(ownerLine, owner, shellDoor)).toEqual([]);
  });

  it(
    "DOORS-4 the repository's tree reconciles: every browser-callable function has its line, every line its door",
    { timeout: TREE_READ_MS },
    () => {
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
    },
  );
});
