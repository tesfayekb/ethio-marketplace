import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  declarationsOf,
  dropsOf,
  lastDeclarations,
  spanningLiterals,
  sqlCodeOf,
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
