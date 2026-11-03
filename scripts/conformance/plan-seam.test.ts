import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { readAllowlist, TREE_SCAN_MS } from "./kit";
import {
  declarationsOf,
  dropsOf,
  findingKey,
  lastDeclarations,
  planSeamFindings,
} from "./plan-seam";

/**
 * P-1b (CF-PLAN-1, INC-1034) — a seller's plan is read through the one seam:
 * no function's last declaration reads `coverage_plans` without
 * `seller_plan(`, none compares `plan = 'free'`. Allowances
 * (`reads:<fn>` / `literal:<fn> | reason | until`) in plan-seam-allowlist.txt;
 * a stale or expired line fails.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "plan-seam-allowlist.txt");

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

/** A tree of migrations under a temporary root. */
function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "plan-seam-"));
  temps.push(root);
  for (const [name, text] of Object.entries(files)) {
    const path = join(root, "supabase", "migrations", name);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, text);
  }
  return root;
}

const fn = (name: string, body: string, replace = true) =>
  `CREATE ${replace ? "OR REPLACE " : ""}FUNCTION public.${name}(p_uid uuid, p_n numeric DEFAULT 1)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE v_plan public.coverage_plans%ROWTYPE;
BEGIN
${body}
END $function$;
REVOKE ALL ON FUNCTION public.${name}(uuid, numeric) FROM PUBLIC;
`;

const BYPASS = "  SELECT * INTO v_plan FROM public.coverage_plans WHERE plan = 'free';";
const SEAMED =
  "  SELECT * INTO v_plan FROM public.coverage_plans WHERE plan = public.seller_plan(p_uid);";

describe("a seller's plan is read through the seam (CF-PLAN-1)", () => {
  it(
    "PSM-1 no function's last declaration reads coverage_plans beside seller_plan or by a literal plan",
    () => {
      const findings = planSeamFindings(ROOT);
      const allowed = readAllowlist(ALLOWLIST, findings.map(findingKey));
      const unexcused = findings.filter((finding) => !allowed.has(findingKey(finding)));
      expect(
        unexcused.map(
          (finding) =>
            `${finding.file}:${finding.line} ${findingKey(finding)} reads the plan beside the seam`,
        ),
      ).toEqual([]);
      // The seam and INC-1034's door are declared in the tree the census read.
      const last = lastDeclarations(ROOT);
      expect(last.has("seller_plan")).toBe(true);
      expect(last.get("validate_listing_draft")?.body).toMatch(/seller_plan\s*\(/);
    },
    TREE_SCAN_MS,
  );

  it("PSM-2 a planted bypass is found in a last declaration; a superseded, seamed, dropped or proof-only one is not", () => {
    const root = tree({
      "001_a.sql": fn("old_door", BYPASS) + fn("gone_door", BYPASS) + fn("bad_door", SEAMED),
      "002_b.sql":
        fn("old_door", SEAMED) +
        fn("bad_door", BYPASS) +
        fn("seller_plan", "  RETURN 'free';") +
        fn("plan_caps", BYPASS) +
        fn("fine_door", "  v_plan := public.plan_caps(public.seller_plan(p_uid));") +
        `DROP FUNCTION public.gone_door(uuid, numeric);\n` +
        `DO $proof$\nBEGIN\n  PERFORM 1 FROM public.coverage_plans WHERE plan = 'free';\nEND $proof$;\n` +
        `DO $$ BEGIN PERFORM 1 FROM public.coverage_plans WHERE plan = 'free'; END $$;\n`,
    });
    const findings = planSeamFindings(root).map(
      (finding) => `${findingKey(finding)} @ ${finding.file}:${finding.line}`,
    );
    expect(findings).toEqual([
      "literal:bad_door @ supabase/migrations/002_b.sql:9",
      "reads:bad_door @ supabase/migrations/002_b.sql:9",
    ]);
    expect(
      dropsOf("DROP FUNCTION IF EXISTS public.x(uuid); DROP FUNCTION y();").map((d) => d.fn),
    ).toEqual(["x", "y"]);
  });

  it("PSM-3 comments and the argument list are not the body; a JOIN and an unqualified name are reads", () => {
    const sql =
      fn(
        "commented",
        "  -- SELECT * FROM public.coverage_plans WHERE plan = 'free';\n  v_plan := NULL;",
      ) +
      fn("joined", "  SELECT 1 FROM public.listings l JOIN coverage_plans c ON c.plan = l.plan;") +
      fn(
        "quoted",
        "  PERFORM 1 FROM public.coverage_plans WHERE plan = p_uid::text; -- plan = 'free'",
      );
    const declarations = declarationsOf(sql);
    expect(declarations.map((d) => d.fn)).toEqual(["commented", "joined", "quoted"]);
    expect(declarations[0]?.body).not.toMatch(/FROM public\.coverage_plans|'free'/);
    const root = tree({ "001.sql": sql });
    expect(planSeamFindings(root).map(findingKey)).toEqual(["reads:joined", "reads:quoted"]);
  });
});
