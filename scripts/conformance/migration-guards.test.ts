import { describe, expect, it } from "vitest";

import {
  headSha,
  realPickHeads,
  realRowHeads,
  splitByAllowlist,
  statementHead,
  tableCreatesOutsideProofs,
} from "./migration-guards";

/**
 * The tests and CI turn 2 (INC-1207) — the migration guard's proof rules on the reader, on
 * planted SQL. scripts/check-migrations.sh runs them through the reader's CLI and proves, by its
 * own self-tests, that a reader that does not finish fails each guard.
 */

/** A migration's text as the rules read it: its UTF-8 bytes, one character per byte. */
const bytes = (sql: string) => Buffer.from(sql, "utf8").toString("latin1");

const proof = (body: string) => `DO $proof$\nDECLARE v uuid;\nBEGIN\n${body}\nEND $proof$;\n`;

describe("the migration guard's proof rules (INC-1207)", () => {
  it("MGR-9 a proof's scratch table is set aside only when created, dropped and namespaced there; a top-level or commented table is judged as written", () => {
    const scratch = proof(
      "  EXECUTE format('CREATE TABLE public.%I (id int)', 'e2e_mig_t');\n" +
        "  EXECUTE format('DROP TABLE public.%I', 'e2e_mig_t');",
    );
    expect(tableCreatesOutsideProofs(bytes(scratch))).toEqual([]);
    expect(
      tableCreatesOutsideProofs(bytes(scratch.replace(/ {2}EXECUTE format\('DROP[^\n]*\n/, ""))),
    ).toEqual([{ line: 4 }]);
    expect(
      tableCreatesOutsideProofs(bytes(scratch.replaceAll("e2e_mig_t", "scratch_t"))),
    ).toHaveLength(1);
    expect(
      tableCreatesOutsideProofs(bytes(`${scratch}CREATE TABLE public.top (id int);\n`)),
    ).toEqual([{ line: 7 }]);
    expect(
      tableCreatesOutsideProofs(bytes("-- CREATE TABLE public.only_named (id int);\nSELECT 1;\n")),
    ).toEqual([]);
  });

  it("MGR-10 a proof statement reading an identity or reference row is named by its head, comments kept; a scratch key anywhere in it, or a read only a comment names, is not", () => {
    const sql = proof(
      "  -- the base principal\n  SELECT id INTO v FROM public.profiles WHERE handle = 'x';\n" +
        "  UPDATE public.attributes SET depends_on = NULL WHERE id = v;\n" +
        "  -- e2e-mig- scratch row\n  DELETE FROM auth.users WHERE id = v;\n" +
        "  -- SELECT id FROM public.user_roles WHERE true\n  PERFORM 1;\n" +
        "  SELECT id INTO v FROM public.user_roles WHERE email LIKE 'e2e-mig-%';",
    );
    expect(realRowHeads(bytes(sql))).toEqual([
      "BEGIN -- the base principal SELECT id INTO v FROM public.profiles WHERE handle = 'x'",
      "UPDATE public.attributes SET depends_on = NULL WHERE id = v",
    ]);
  });

  it("MGR-11 a proof that picks a country, language or currency by ORDER BY … LIMIT 1 is refused unless a scratch key names it", () => {
    const sql = proof(
      "  SELECT code INTO v FROM public.languages ORDER BY code LIMIT 1;\n" +
        "  SELECT code INTO v FROM public.countries WHERE code LIKE 'e2e_mig_%' ORDER BY code LIMIT 1;\n" +
        "  SELECT code INTO v FROM public.currencies WHERE code = 'XZ';",
    );
    expect(realPickHeads(bytes(sql))).toEqual([
      "BEGIN SELECT code INTO v FROM public.languages ORDER BY code LIMIT 1",
    ]);
  });

  it("MGR-12 a head folds ASCII whitespace and is cut at 120 bytes, so a key written by that cut still matches", () => {
    const wide = `SELECT id INTO v FROM public.profiles WHERE note = '${"—".repeat(40)}'`;
    const head = statementHead(bytes(`\n\t ${wide}`));
    expect(head.length).toBe(120);
    expect(Buffer.from(head, "latin1").length).toBe(120);
    expect(head.startsWith("SELECT id INTO v FROM public.profiles WHERE note = '")).toBe(true);
    expect(statementHead("  a \u00a0 b  ")).toBe("a \u00a0 b");
  });

  it("MGR-13 the allowlist names a head as written or by its sha256; a stale sha, a line with too few cells and an unlisted head are refused", () => {
    const head = "BEGIN SELECT id INTO v FROM public.profiles WHERE handle = 'a' || 'b'";
    expect(headSha(head)).toBe("9dacdee4ae630a9d");
    const offenders = [
      `supabase/migrations/1_a.sql: ${head}`,
      "supabase/migrations/1_a.sql: UPDATE public.attributes SET x = 1 WHERE id = v",
      "supabase/migrations/2_b.sql: DELETE FROM auth.users WHERE id = v",
      "supabase/migrations/3_c.sql: SELECT 1 FROM public.profiles",
    ];
    const allowlist = [
      "# a comment",
      "",
      "1_a.sql | sha256:9dacdee4ae630a9d | delimiter-safe key",
      "1_a.sql | UPDATE public.attributes SET x = 1 WHERE id = v | the proof's own row",
      "2_b.sql | sha256:0000000000000000 | stale",
      "3_c.sql | SELECT 1 FROM public.profiles |",
    ].join("\n");
    expect(splitByAllowlist(offenders, allowlist)).toEqual({
      refused: [
        "supabase/migrations/2_b.sql: DELETE FROM auth.users WHERE id = v",
        "supabase/migrations/3_c.sql: SELECT 1 FROM public.profiles",
      ],
      allowed: [
        "1_a.sql | sha256:9dacdee4ae630a9d | delimiter-safe key",
        "1_a.sql | UPDATE public.attributes SET x = 1 WHERE id = v | the proof's own row",
      ],
    });
  });
});
