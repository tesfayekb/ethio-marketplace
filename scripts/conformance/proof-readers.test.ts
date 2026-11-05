import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { readAllowlist, TREE_SCAN_MS } from "./kit";
import { lastDeclarations } from "./plan-seam";
import {
  blankLiterals,
  doBlocksOf,
  findingKey,
  proofReaderFindings,
  stableRaisers,
  whereCallsOf,
} from "./proof-readers";

/**
 * P-2 (a) (CF-PROOF-1, INC-1052, DEC-340) — a proof reads a STABLE RAISE-ing
 * reader into a variable, never beside a column in a WHERE clause of a DO
 * block. Allowances (`<fn>:<file>:<line> | reason | until`) in
 * proof-readers-allowlist.txt; a stale or expired line fails.
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
});
