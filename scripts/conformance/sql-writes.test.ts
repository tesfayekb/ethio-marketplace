import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { readAllowlist, TREE_SCAN_MS } from "./kit";
import { lastDeclarations } from "./migration-reader";
import { findingKey, sqlWriteFindings, unguardedWritesOf } from "./sql-writes";

/**
 * P-2 (a) (CF-SQL-1, INC-1055, ruling 7) — no function's last declaration
 * issues a DELETE or UPDATE without a WHERE clause: the app's connection runs
 * pg-safeupdate, which refuses it however deep it sits (INC-432's class).
 * Allowances (`<fn>:<file>:<line> | reason | until`) in sql-writes-allowlist.txt;
 * a stale or expired line fails.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "sql-writes-allowlist.txt");

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

/** A tree of migrations under a temporary root. */
function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "sql-writes-"));
  temps.push(root);
  for (const [name, text] of Object.entries(files)) {
    const path = join(root, "supabase", "migrations", name);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, text);
  }
  return root;
}

const fn = (name: string, body: string) =>
  `CREATE OR REPLACE FUNCTION public.${name}()
RETURNS void LANGUAGE plpgsql SET search_path TO 'public'
AS $fn$
BEGIN
${body}
END $fn$;
REVOKE ALL ON FUNCTION public.${name}() FROM PUBLIC;
`;

/** The 1-based line of the first line of `text` containing `needle`. */
const lineOf = (text: string, needle: string) =>
  text.split("\n").findIndex((line) => line.includes(needle)) + 1;

describe("no function issues a DELETE or UPDATE without a WHERE (CF-SQL-1)", () => {
  it(
    "SQW-1 no last declaration of the tree holds a DELETE or UPDATE statement with no WHERE clause",
    () => {
      const last = lastDeclarations(ROOT);
      const findings = sqlWriteFindings(ROOT, last);
      const allowed = readAllowlist(ALLOWLIST, findings.map(findingKey));
      const unexcused = findings.filter((finding) => !allowed.has(findingKey(finding)));
      expect(
        unexcused.map(
          (finding) =>
            `${finding.file}:${finding.line} ${finding.fn} issues a ${finding.verb} with no WHERE`,
        ),
      ).toEqual([]);
      // The census is not blind: the rank trigger's three guarded writes are among the bodies read.
      const rebuild = last.get("level_ranks_rebuild");
      expect(rebuild?.body).toMatch(/DELETE FROM public\.level_ranks r\s+WHERE NOT EXISTS/);
      expect(last.size).toBeGreaterThan(400);
    },
    TREE_SCAN_MS,
  );

  it("SQW-2 a planted DELETE or UPDATE with no WHERE is found, at depth 0 and inside a CTE; the guarded and the non-statements are not", () => {
    const body = `  DELETE FROM public.t;
  UPDATE public.t SET a = 1;
  WITH moved AS (UPDATE public.t SET a = 2 RETURNING key) SELECT count(*) INTO v FROM moved;
  WITH gone AS (DELETE FROM public.t WHERE a = 3 RETURNING key) SELECT count(*) INTO v FROM gone;
  DELETE FROM public.t WHERE a = (SELECT max(a) FROM public.t);
  UPDATE public.t SET a = (SELECT max(a) FROM public.u WHERE u.k = t.k);
  UPDATE public.t r SET a = n.pos FROM ranked n WHERE n.key = r.key RETURNING r.key;
  SELECT 1 FROM public.t WHERE a = 1 FOR UPDATE OF t;
  SELECT 1 FROM public.t FOR NO KEY UPDATE;
  INSERT INTO public.t (k, a) VALUES (1, 1) ON CONFLICT (k) DO UPDATE SET a = excluded.a;
  IF TG_OP = 'DELETE' THEN RETURN OLD; END IF;
  EXECUTE 'DELETE FROM public.t';
  -- DELETE FROM public.t in a comment
  FOR r IN UPDATE public.t SET a = 4 RETURNING * LOOP
    PERFORM 1 WHERE r.a = 4;
  END LOOP;
  GRANT SELECT, UPDATE, DELETE ON public.t TO service_role;
  CREATE TRIGGER x AFTER INSERT OR UPDATE OR DELETE ON public.t FOR EACH ROW EXECUTE FUNCTION f();`;
    const file = fn("writer", body);
    const root = tree({ "20260101000000_a.sql": file });
    const findings = sqlWriteFindings(root);
    expect(findings.map((finding) => `${finding.line} ${finding.verb}`)).toEqual([
      `${lineOf(file, "DELETE FROM public.t;")} DELETE`,
      `${lineOf(file, "UPDATE public.t SET a = 1;")} UPDATE`,
      `${lineOf(file, "WITH moved AS")} UPDATE`,
      `${lineOf(file, "SELECT max(a) FROM public.u")} UPDATE`,
      `${lineOf(file, "FOR r IN UPDATE")} UPDATE`,
    ]);
    expect(findings.map(findingKey)[0]).toBe(
      `writer:20260101000000_a.sql:${lineOf(file, "DELETE FROM public.t;")}`,
    );
  });

  it("SQW-3 the last declaration rules: a body redeclared with a WHERE, or dropped, is clean; the body's offsets give the file's line", () => {
    const root = tree({
      "20260101000000_a.sql":
        fn("later_fixed", "  DELETE FROM public.t;") +
        fn("dropped", "  UPDATE public.t SET a = 1;"),
      "20260102000000_b.sql":
        fn("later_fixed", "  DELETE FROM public.t WHERE a = 1;") +
        "DROP FUNCTION public.dropped();\n",
    });
    expect(sqlWriteFindings(root)).toEqual([]);
    expect(unguardedWritesOf("x; DELETE FROM t; y").map((hit) => hit.at)).toEqual([3]);
    expect(unguardedWritesOf("DELETE FROM t WHERE a = 'no; WHERE here'")).toEqual([]);
  });
});
