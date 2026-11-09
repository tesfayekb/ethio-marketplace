import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  COMPUTED_BY_HAND,
  declarationsOf,
  droppedObjects,
  dropsOf,
  lastDeclarations,
  spanningLiterals,
  sqlCodeOf,
  staleComputedByHand,
  templateDeclarationsOf,
} from "./migration-reader";

/**
 * P-2 (c) c2b (ruling 1 Q9) — the migration reader on planted SQL: a function's
 * last declaration survives a DROP that comes before it, a computed insertion
 * is not seen (INC-1083, stated), and a comment that names a function is
 * neither a declaration nor a drop.
 */

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

/** A tree of migrations under a temporary root. */
function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "migration-reader-"));
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
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
${body}
END $function$;
`;

describe("the migration reader keeps each function's last declaration", () => {
  it("MGR-1 a declaration after a DROP is the last one; a DROP after a declaration forgets it", () => {
    const root = tree({
      "001_a.sql": fn("door", "  RETURN 'one';") + fn("gone", "  RETURN 'gone';"),
      "002_b.sql":
        "DROP FUNCTION IF EXISTS public.door(uuid);\n" +
        fn("door", "  RETURN 'two';") +
        "DROP FUNCTION public.gone(uuid);\n",
    });
    const last = lastDeclarations(root);
    expect([...last.keys()].sort()).toEqual(["door"]);
    expect(last.get("door")?.file).toBe("supabase/migrations/002_b.sql");
    expect(last.get("door")?.body).toContain("'two'");
    expect(last.get("door")?.line).toBe(2);
  });

  it("MGR-2 a computed insertion (a DO block that EXECUTEs a rewritten body) is not seen: the file's text stays the last (INC-1083)", () => {
    const root = tree({
      "001_a.sql": fn("door", "  RETURN 'one';"),
      "002_b.sql":
        "DO $patch$\nDECLARE v_src text;\nBEGIN\n" +
        "  SELECT pg_get_functiondef('public.door(uuid)'::regprocedure) INTO v_src;\n" +
        "  EXECUTE replace(v_src, $q$'one'$q$, $q$'two'$q$);\n" +
        "END $patch$;\n",
    });
    const last = lastDeclarations(root);
    expect(last.get("door")?.file).toBe("supabase/migrations/001_a.sql");
    expect(last.get("door")?.body).toContain("'one'");
    expect(last.get("door")?.body).not.toContain("'two'");
  });

  it("MGR-3 a comment naming a function is neither a declaration nor a drop; a quoted '--' is kept", () => {
    const sql =
      "-- CREATE OR REPLACE FUNCTION public.ghost(p uuid) RETURNS void AS $$ $$;\n" +
      "/* DROP FUNCTION public.door(uuid); */\n" +
      fn("door", "  RETURN '-- not a comment';");
    expect(declarationsOf(sql).map((d) => d.fn)).toEqual(["door"]);
    expect(dropsOf(sql)).toEqual([]);
    expect(sqlCodeOf(sql)).toContain("'-- not a comment'");
    expect(sqlCodeOf(sql)).not.toContain("ghost");
    expect(sqlCodeOf(sql).length).toBe(sql.length);
  });
});

describe("a compared literal never spans a line break (INC-1089)", () => {
  it("MGR-4 a literal across a line break is found on its lines; a doubled quote, a comment's apostrophe, a backslash pair and a dollar-quoted block are not", () => {
    const spanning =
      "DO $proof$\nBEGIN\n  v := replace(v_src, ',\n    ''caps'', x', '');\nEND $proof$;\n";
    expect(spanningLiterals(spanning)).toEqual([{ line: 3 }, { line: 4 }]);
    const clean =
      "-- it's a comment\n" +
      "/* and it's another */\n" +
      "DO $proof$\nBEGIN\n" +
      "  v := 'it''s' || ',' || chr(10) || '    ''caps'', x';\n" +
      "  w := E',\\n    ''caps''' || '--[^\\n]*';\n" +
      "END $proof$;\n" +
      "COMMENT ON TABLE public.t IS $c$over\ntwo lines$c$;\n";
    expect(spanningLiterals(clean)).toEqual([]);
  });
});

describe("the reader knows what the migrations dropped (DEC-357)", () => {
  it("MGR-5 a dropped function or table is dropped; one re-created after its drop, or never dropped, is not", () => {
    const root = tree({
      "001_a.sql":
        fn("gone", "  RETURN 'x';") +
        fn("back", "  RETURN 'x';") +
        fn("kept", "  RETURN 'x';") +
        "CREATE TABLE public.gone_table (id uuid);\nCREATE TABLE IF NOT EXISTS public.back_table (id uuid);\n",
      "002_b.sql":
        "DROP FUNCTION public.gone(uuid);\nDROP FUNCTION IF EXISTS public.back(uuid);\n" +
        "DROP TABLE public.gone_table, public.back_table CASCADE;\n" +
        "-- DROP FUNCTION public.kept(uuid);\n" +
        "DO $proof$ BEGIN DROP TABLE public.kept_scratch; END $proof$;\n",
      "003_c.sql": fn("back", "  RETURN 'y';") + "CREATE TABLE public.back_table (id uuid);\n",
    });
    expect(dropsOf(readFileSync(join(root, "supabase/migrations/002_b.sql"), "utf8"))).toEqual([
      { name: "gone", kind: "function", offset: 0 },
      { name: "back", kind: "function", offset: 33 },
      { name: "gone_table", kind: "table", offset: 76 },
      { name: "back_table", kind: "table", offset: 76 },
    ]);
    expect([...droppedObjects(root)].sort()).toEqual(["gone", "gone_table"]);
    expect([...lastDeclarations(root).keys()].sort()).toEqual(["back", "kept"]);
  });
});

describe("a body built at run time is computed (INC-1083)", () => {
  it("MGR-6 COMPUTED_BY_HAND: a line stands for its name's last declaration; one the files no longer declare, or whose last event the reader reads, is stale", () => {
    expect(staleComputedByHand(process.cwd())).toEqual([]);
    expect(Object.keys(COMPUTED_BY_HAND)).toEqual(["attr_import_plan"]);
    const root = tree({
      "20990101000000_a.sql":
        fn("built", "  RETURN 'x';") +
        fn("later", "  RETURN 'x';") +
        fn("templated", "  RETURN 'x';"),
      "20990101000002_b.sql":
        fn("later", "  RETURN 'y';") +
        "DO $t$ BEGIN EXECUTE format('CREATE OR REPLACE FUNCTION public.templated(%s) RETURNS text LANGUAGE sql AS $b$%s$b$', 'p uuid', 'SELECT 1'); END $t$;\n",
    });
    const since = { since: "20990101000001" };
    const byHand = { built: since, gone: since, later: since, templated: since };
    expect(staleComputedByHand(root, byHand)).toEqual([
      "gone: no migration declares it",
      "later: its last event (supabase/migrations/20990101000002_b.sql) is one the reader reads",
      "templated: its last event (supabase/migrations/20990101000002_b.sql) is one the reader reads",
    ]);
    const built = lastDeclarations(root, byHand).get("built");
    expect(built?.computed).toBe(true);
    expect(built?.body).toBe("");
    expect(built?.file).toBe("supabase/migrations/20990101000000_a.sql");
    expect(lastDeclarations(root, {}).get("built")?.computed).toBeUndefined();
  });

  it("MGR-7 a DO block's format() template — by its literal name or %I with a literal argument — is the last event; a later declaration, a comment or another format() is not", () => {
    const root = tree({
      "001_a.sql":
        fn("named", "  RETURN 'one';") +
        fn("by_ident", "  RETURN 'one';") +
        fn("redone", "  RETURN 'one';"),
      "002_b.sql":
        "DO $t$\nBEGIN\n" +
        "  -- EXECUTE format('CREATE OR REPLACE FUNCTION public.quiet(%s)', 'x');\n" +
        "  RAISE NOTICE '%', format('drift for %s', 'named');\n" +
        "  EXECUTE format('CREATE OR REPLACE FUNCTION public.named(%s) RETURNS %s LANGUAGE plpgsql AS $m$%s$m$', v_args, v_result, v_new);\n" +
        "  EXECUTE format('CREATE FUNCTION public.%I(%s) RETURNS %s LANGUAGE plpgsql AS $m$%s$m$',\n    'by_ident', v_args, v_result, v_new);\n" +
        "  EXECUTE format('CREATE OR REPLACE FUNCTION public.%I(%s) AS $m$%s$m$', 'redone', v_args, v_new);\n" +
        "END $t$;\n",
      "003_c.sql": fn("redone", "  RETURN 'two';"),
    });
    const sql = readFileSync(join(root, "supabase/migrations/002_b.sql"), "utf8");
    expect(templateDeclarationsOf(sql).map((t) => t.fn)).toEqual(["named", "by_ident", "redone"]);
    const last = lastDeclarations(root, {});
    expect([...last.keys()].sort()).toEqual(["by_ident", "named", "redone"]);
    for (const name of ["named", "by_ident"]) {
      expect(last.get(name)?.computed).toBe(true);
      expect(last.get(name)?.body).toBe("");
      expect(last.get(name)?.file).toBe("supabase/migrations/002_b.sql");
    }
    expect(last.get("named")?.line).toBe(5);
    expect(last.get("redone")?.computed).toBeUndefined();
    expect(last.get("redone")?.body).toContain("'two'");
    expect(
      [...lastDeclarations(process.cwd())]
        .filter(([, d]) => d.computed === true)
        .map(([name]) => name)
        .sort(),
    ).toEqual([
      "admin_commit_attribute_import",
      "admin_commit_category_import",
      "admin_commit_location_import",
      "admin_import_translations",
      "admin_undo_attribute_import",
      "admin_undo_category_import",
      "admin_undo_import",
      "admin_undo_location_import",
      "attr_import_plan",
      "edit_my_listing",
      "public_listing_json",
      "validate_listing_draft",
    ]);
  });
});
