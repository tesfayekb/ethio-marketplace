import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { readAllowlist, TREE_SCAN_MS } from "./kit";
import { lastDeclarations } from "./plan-seam";
import {
  blankLiterals,
  DEPARSE_FLOOR,
  deparseFindingKey,
  deparseLikeFindings,
  deparseLikesOf,
  doBlocksOf,
  findingKey,
  pastDeparseFloor,
  proofReaderFindings,
  stableRaisers,
  whereCallsOf,
} from "./proof-readers";

/**
 * P-2 (a) (CF-PROOF-1, INC-1052, DEC-341) — a proof reads a STABLE RAISE-ing
 * reader into a variable, never beside a column in a WHERE clause of a DO
 * block. Allowances (`<fn>:<file>:<line> | reason | until`) in
 * proof-readers-allowlist.txt; a stale or expired line fails.
 * CF-PROOF-2 (INC-1054, ruling 6; PRF-5) — a proof asserts catalog facts from
 * catalog columns, never by LIKE on a `pg_get_*def` text, in every migration
 * stamped `DEPARSE_FLOOR` or later; no allowance exists for it.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "proof-readers-allowlist.txt");

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

/** A tree of migrations under a temporary root. */
function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "proof-readers-"));
  temps.push(root);
  for (const [name, text] of Object.entries(files)) {
    const path = join(root, "supabase", "migrations", name);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, text);
  }
  return root;
}

const fn = (name: string, volatility: "STABLE" | "VOLATILE", body: string) =>
  `CREATE OR REPLACE FUNCTION public.${name}(p_key text)
RETURNS smallint LANGUAGE plpgsql ${volatility} SET search_path TO 'public'
AS $fn$
BEGIN
${body}
END $fn$;
REVOKE ALL ON FUNCTION public.${name}(text) FROM PUBLIC;
`;

const RAISING =
  "  IF p_key IS NULL THEN RAISE EXCEPTION 'unknown key %', p_key; END IF;\n  RETURN 1;";
const QUIET = "  RETURN coalesce(length(p_key), 0)::smallint;";

/** The 1-based line of the first line of `text` containing `needle`. */
const lineOf = (text: string, needle: string) =>
  text.split("\n").findIndex((line) => line.includes(needle)) + 1;

describe("a proof reads a STABLE reader into a variable (CF-PROOF-1)", () => {
  it(
    "PRF-1 no DO block of the tree names a STABLE RAISE-ing function inside a WHERE clause",
    () => {
      const findings = proofReaderFindings(ROOT);
      const allowed = readAllowlist(ALLOWLIST, findings.map(findingKey));
      const unexcused = findings.filter((finding) => !allowed.has(findingKey(finding)));
      expect(
        unexcused.map(
          (finding) =>
            `${finding.file}:${finding.line} ${finding.fn} is read beside a column in a WHERE of a DO block`,
        ),
      ).toEqual([]);
      // The census the guard watches today holds the baseline reader; the dropped rank function is gone.
      const names = stableRaisers(lastDeclarations(ROOT));
      expect(names).toContain("baseline_level_key");
      expect(names).not.toContain("feed_tier_rank");
      expect(names).not.toContain("feed_index_refresh");
    },
    TREE_SCAN_MS,
  );

  it("PRF-2 a planted call in a WHERE is found; INTO, :=, PERFORM, IF, a scalar subquery, a literal and a quiet or volatile function are not", () => {
    const proof = `DO $proof$
DECLARE
  v_key text := 'k';
  v_rank smallint;
BEGIN
  SELECT public.strict_reader(v_key) INTO v_rank FROM public.t WHERE k = 1;
  v_rank := public.strict_reader(v_key);
  PERFORM public.strict_reader(v_key);
  IF public.strict_reader(v_key) <> 1 THEN RAISE EXCEPTION 'x'; END IF;
  IF EXISTS (SELECT 1 FROM public.t WHERE col <> public.strict_reader(v_key)) THEN RAISE EXCEPTION 'planted'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.t WHERE col = public.wrap(public.strict_reader(v_key))) THEN RAISE EXCEPTION 'nested'; END IF;
  IF EXISTS (SELECT 1 FROM public.t WHERE col IS DISTINCT FROM strict_reader(v_key)) THEN RAISE EXCEPTION 'unqualified'; END IF;
  IF EXISTS (SELECT 1 FROM public.t WHERE col = (SELECT public.strict_reader(v_key))) THEN RAISE EXCEPTION 'scalar'; END IF;
  IF EXISTS (SELECT 1 FROM pg_proc WHERE oid = 'public.strict_reader(text)'::regprocedure) THEN NULL; END IF;
  IF EXISTS (SELECT 1 FROM public.t WHERE col <> public.loud_writer(v_key)) THEN NULL; END IF;
  IF EXISTS (SELECT 1 FROM public.t WHERE col <> public.quiet_reader(v_key)) THEN NULL; END IF;
  -- WHERE col <> public.strict_reader(v_key) is a comment
  UPDATE public.t SET col = public.strict_reader(v_key) WHERE k = 'WHERE col <> public.strict_reader(v_key)';
  DELETE FROM public.t WHERE col = public.strict_reader(v_key);
END $proof$;
`;
    const file =
      fn("strict_reader", "STABLE", RAISING) +
      fn("loud_writer", "VOLATILE", RAISING) +
      fn("quiet_reader", "STABLE", QUIET) +
      fn("wrap", "STABLE", QUIET) +
      proof;
    const root = tree({ "20260101000000_a.sql": file });
    expect(proofReaderFindings(root).map(findingKey)).toEqual([
      `strict_reader:20260101000000_a.sql:${lineOf(file, "'planted'")}`,
      `strict_reader:20260101000000_a.sql:${lineOf(file, "'nested'")}`,
      `strict_reader:20260101000000_a.sql:${lineOf(file, "'unqualified'")}`,
      `strict_reader:20260101000000_a.sql:${lineOf(file, "DELETE FROM public.t")}`,
    ]);
  });

  it("PRF-3 the last declaration rules: a reader redeclared VOLATILE or dropped is no longer watched; a function body is not a proof", () => {
    const where = (name: string) =>
      `DO $$ BEGIN IF EXISTS (SELECT 1 FROM public.t WHERE col <> public.${name}('k')) THEN NULL; END IF; END $$;\n`;
    const root = tree({
      "20260101000000_a.sql":
        fn("later_volatile", "STABLE", RAISING) +
        fn("dropped", "STABLE", RAISING) +
        where("later_volatile"),
      "20260102000000_b.sql":
        fn("later_volatile", "VOLATILE", RAISING) +
        "DROP FUNCTION public.dropped(text);\n" +
        fn(
          "body_only",
          "STABLE",
          "  PERFORM 1 FROM public.t WHERE col <> public.later_volatile('k');\n" + RAISING,
        ) +
        where("dropped"),
    });
    expect(proofReaderFindings(root)).toEqual([]);
    const planted = tree({
      "20260101000000_a.sql": fn("kept", "STABLE", RAISING) + where("kept"),
    });
    expect(proofReaderFindings(planted).map((finding) => finding.fn)).toEqual(["kept"]);
  });

  it("PRF-4 literals are blanked whole, across lines and '' escapes; DO blocks are found by their tag", () => {
    expect(blankLiterals("a = 'it''s\nhere' AND b")).toBe("a = '     \n    ' AND b");
    const blocks = doBlocksOf("DO $p$ BEGIN x; END $p$; -- DO $$ no $$;\nDO $$ BEGIN y; END $$;");
    expect(blocks.map((block) => block.body.trim())).toEqual(["BEGIN x; END", "BEGIN y; END"]);
    expect(
      whereCallsOf("SELECT 1 FROM t WHERE a = f(1) AND b = g(2)", ["g"]).map((c) => c.fn),
    ).toEqual(["g"]);
  });

  it(
    "PRF-5 no DO block of a migration at or past the floor asserts a pg_get_*def text by LIKE; a planted one is found, an older one and a catalog read are not",
    () => {
      // The tree: nothing at or past the floor; the two older sites are applied history below it.
      expect(DEPARSE_FLOOR).toBe("20261104000000");
      expect(
        deparseLikeFindings(ROOT).map(
          (finding) =>
            `${finding.file}:${finding.line} asserts a deparsed definition by LIKE; read the catalog's columns`,
        ),
      ).toEqual([]);
      expect(pastDeparseFloor("20261104000000_a.sql")).toBe(true);
      expect(pastDeparseFloor("20261103235959_a.sql")).toBe(false);
      // Planted: the fold's own shape (INTO a variable, then NOT LIKE on it), a trigger, an index,
      // a constraint by LIKE / NOT LIKE and M-1a part 2's shape (a scalar subquery, then NOT LIKE);
      // a catalog read, a function def md5, a variable read INTO but never LIKE-matched, a literal
      // and a comment are not findings; the same text below the floor is history.
      const proof = `DO $proof$
DECLARE
  v_trg text;
  v_idx text;
BEGIN
  SELECT pg_get_triggerdef(t.oid) INTO v_trg FROM pg_trigger t WHERE t.tgname = 'x';
  IF v_trg NOT LIKE '%EXECUTE FUNCTION public.f()%' THEN RAISE EXCEPTION 'into-then-like'; END IF;
  SELECT pg_get_indexdef(i.indexrelid) INTO v_idx FROM pg_index i WHERE i.indexrelid = 1;
  RAISE NOTICE 'the index: %', v_idx;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger t WHERE pg_get_triggerdef(t.oid) LIKE '%AFTER UPDATE%') THEN RAISE EXCEPTION 'trigger'; END IF;
  IF EXISTS (SELECT 1 FROM pg_index i WHERE pg_get_indexdef( i.indexrelid ) NOT LIKE '%UNIQUE%') THEN RAISE EXCEPTION 'index'; END IF;
  IF EXISTS (SELECT 1 FROM pg_constraint c WHERE pg_get_constraintdef(c.oid, true)
       like '%CHECK%') THEN RAISE EXCEPTION 'constraint'; END IF;
  IF (SELECT pg_get_constraintdef(c.oid) FROM pg_constraint c
       WHERE c.conname = 'x') NOT LIKE '%''paused''%' THEN RAISE EXCEPTION 'subquery'; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger t WHERE t.tgfoid = 'public.f()'::regprocedure AND (t.tgtype & 2) = 0) THEN RAISE EXCEPTION 'columns'; END IF;
  IF md5(pg_get_functiondef('public.f()'::regprocedure)) <> md5(pg_get_functiondef('public.g()'::regprocedure)) THEN NULL; END IF;
  IF 'pg_get_triggerdef(t.oid) LIKE' = v_trg THEN NULL; END IF;
  -- pg_get_triggerdef(t.oid) LIKE '%x%' in a comment
END $proof$;
`;
      const planted = tree({
        "20261104000001_a.sql": proof,
        "20261103000000_b.sql": proof,
      });
      expect(deparseLikeFindings(planted).map(deparseFindingKey)).toEqual(
        [
          lineOf(proof, "INTO v_trg"),
          lineOf(proof, "'trigger'"),
          lineOf(proof, "'index'"),
          lineOf(proof, "pg_get_constraintdef(c.oid, true)"),
          lineOf(proof, "SELECT pg_get_constraintdef(c.oid) FROM"),
        ]
          .sort((a, b) => a - b)
          .map((line) => `20261104000001_a.sql:${line}`),
      );
      // The assigned form, and the fold's failing check as it was (INC-1054).
      expect(deparseLikesOf("x := pg_get_triggerdef(1); IF x LIKE 'z' THEN NULL; END IF;")).toEqual(
        [5],
      );
      expect(deparseLikesOf("x := pg_get_triggerdef(1); IF y LIKE 'z' THEN NULL; END IF;")).toEqual(
        [],
      );
    },
    TREE_SCAN_MS,
  );
});
