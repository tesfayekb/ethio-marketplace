import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { readAllowlist } from "../conformance/kit";
import { catalogueOf, type DroppedGrant } from "./catalogue";
import { declaredColumns } from "./columns";
import { FINDING_KINDS, judge, type Finding, type FindingKind } from "./judge";
import { parseManifest } from "./manifest";
import { liveGrants, parseOpenRules, type OpenRuleEvidence } from "./open-rules";
import { declaredOpenRules, declaredPolicyCalls, openRulesOf, policyCallsOf } from "./policies";
import {
  LIVE_OPEN_RULES_QUERY,
  LIVE_QUERY,
  liveRows,
  staticRows,
  treeCallers,
  type DoorRow,
} from "./rows";
import { declaredStepUps, stepUpsOf } from "./step-ups";

/**
 * Foundations 1 (DEC-333 / DEC-334) — THE DOOR GUARD. Judges
 * scripts/doors/manifest.txt against the rows (judge.ts):
 *
 *   bun scripts/doors/check-doors.ts                 static: the migrations' catalogue + the tree's callers
 *   bun scripts/doors/check-doors.ts --live <tsv> <grants tsv>
 *                                                    live: the smoke lane's catalogue (LIVE_QUERY's answer) and the
 *                                                    browser roles' grants on the open rules' tables
 *                                                    (LIVE_OPEN_RULES_QUERY's answer)
 *   bun scripts/doors/check-doors.ts --live-query    prints scripts/doors/live-query.sql verbatim for the workflow's psql
 *   bun scripts/doors/check-doors.ts --live-open-rules-query
 *                                                    prints scripts/doors/live-open-rules.sql verbatim
 *   SELF_TEST=1 bun scripts/doors/check-doors.ts     the planted fixtures only
 *
 * DEC-334's frozen rule: every mode runs the self-test FIRST, in the same
 * process — each of the seventeen finding kinds must fire on its planted fixture
 * and a clean planted pair must fire nothing — and judges nothing until it has.
 * A guard that cannot prove itself gates nothing and fails loudly.
 *
 * Allowlist: scripts/doors/check-doors-allowlist.txt, kit grammar
 * `<kind> <key> | reason | until`; stale or expired lines fail (kit).
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "doors", "check-doors-allowlist.txt");
const MANIFEST = join(ROOT, "scripts", "doors", "manifest.txt");
const OPEN_RULES = join("scripts", "doors", "open-rules.txt");

const row = (over: Partial<DoorRow> & Pick<DoorRow, "key" | "body">): DoorRow => ({
  name: over.key.slice(0, over.key.indexOf("(")),
  volatility: "v",
  definer: true,
  anon: false,
  authenticated: true,
  trigger: false,
  where: "planted",
  ...over,
});

const OWNER_LINE =
  "e2e_planted_owner(uuid) | owner | authenticated | - | - | draft | - | - | draft | - | -";
const STAFF_LINE =
  "e2e_planted_staff(uuid) | staff | authenticated | listings:review | row | staff_moderation | - | global | staff | - | -";
const SHELL_BODY = (ctx: string) =>
  `BEGIN v_ctx := public.door_context(${ctx}); RETURN jsonb_build_object('ok', true); EXCEPTION WHEN SQLSTATE 'P0D01' THEN RETURN public.door_refused('x', 'draft', SQLERRM); END`;

const PLANTED_CREATE = [
  "CREATE FUNCTION public.e2e_planted_owner(p_id uuid) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER",
  "SET search_path = public AS $function$ BEGIN RETURN '{}'::jsonb; END $function$;",
].join("\n");
export const plantedGrant = (roles: string) =>
  `GRANT EXECUTE ON FUNCTION public.e2e_planted_owner(uuid) TO ${roles};`;

/**
 * The planted history of `grant-dropped` (F1-5a ruling 2 §1): a function held by
 * authenticated and service_role, then a file at `stamp` that drops and re-creates it
 * with `restated` as its only closer; `later` files follow.
 */
export function plantedDropHistory(
  stamp: string,
  restated: string,
  later: string[] = [],
): DroppedGrant[] {
  const files = [
    {
      file: "supabase/migrations/20260101000000_planted.sql",
      sql: `${PLANTED_CREATE}\n${plantedGrant("authenticated, service_role")}\n`,
    },
    {
      file: `supabase/migrations/${stamp}_planted.sql`,
      sql: `DROP FUNCTION public.e2e_planted_owner(uuid);\n${PLANTED_CREATE}\n${restated}\n`,
    },
    ...later.map((sql, index) => ({
      file: `supabase/migrations/2099010200000${index}_planted.sql`,
      sql,
    })),
  ];
  return catalogueOf(files).dropped;
}

/**
 * The planted permission rows of `opt-out-over-step-up` (F1-6a ruling 1, Part A), in the two forms the
 * migrations seed: listings:review declared with step-up, listings:reveal without.
 */
export const PLANTED_STEP_UPS = [
  "INSERT INTO public.permissions (resource_id, action, description, requires_step_up, assignable)",
  "SELECT r.id, v.action, v.descr, v.step_up, true FROM public.resources r",
  "CROSS JOIN (VALUES ('view', 'See listings', false), ('review', 'Review a listing (held)', true)) AS v(action, descr, step_up)",
  "WHERE r.name = 'listings';",
  "INSERT INTO public.permissions (resource_id, action, description, requires_step_up, assignable)",
  "SELECT r.id, 'reveal', 'Show a seller''s number (D129)', false, true FROM public.resources r",
  "WHERE r.name = 'listings';",
].join("\n");

/**
 * The planted readers of `reader-off-gate` (F1-7a ruling 1, decisions 4 and 9): a public reader
 * whose body names a function that reads its caller, and that function.
 */
export const PLANTED_PUBLIC_DATA_LINE =
  "e2e_planted_public(text) | public-reader | anon,authenticated | - | - | - | - | - | - | - | public-data";
export const plantedReaders = (innerBody: string): DoorRow[] => [
  row({
    key: "e2e_planted_public(text)",
    body: "BEGIN RETURN public.e2e_planted_inner(p_lang); END",
    volatility: "s",
    anon: true,
  }),
  row({ key: "e2e_planted_inner(text)", body: innerBody, volatility: "s", authenticated: false }),
];

/**
 * The planted policies of `helper-reason-unproven` (F1-7a ruling 1, decision 7; INC-1212): one that
 * calls the helper, one that does not, and one that calls it but is dropped by a later file.
 */
export const PLANTED_POLICIES = [
  {
    file: "supabase/migrations/20260101000000_a.sql",
    sql: [
      "CREATE POLICY e2e_planted_read ON public.listings FOR SELECT USING (public.e2e_planted_helper(id));",
      "CREATE POLICY e2e_planted_other ON public.listings FOR SELECT USING (true);",
      'CREATE POLICY "e2e_planted_gone" ON public.listings FOR SELECT USING (public.e2e_planted_helper(id));',
    ].join("\n"),
  },
  {
    file: "supabase/migrations/20260102000000_b.sql",
    sql: 'DROP POLICY IF EXISTS "e2e_planted_gone" ON public.listings;',
  },
];
/** The planted reader of `dial-shell-mismatch` (F1-7c ruling 1, decision 3): on the gate, no dial, a shell. */
export const PLANTED_READER_LINE =
  "e2e_planted_reader(uuid) | signed-in-reader | authenticated | - | - | - | - | - | - | - | -";
export const READER_SHELL_BODY =
  "BEGIN PERFORM public.door_context('reader'); RETURN '{}'::jsonb; EXCEPTION WHEN SQLSTATE 'P0D01' THEN RETURN public.door_refused('x', NULL, SQLERRM); END";
export const PLANTED_HELPER_LINE = (reason: string) =>
  `e2e_planted_helper(uuid) | helper | authenticated | - | - | - | - | - | - | - | ${reason}`;

/**
 * The planted open rules (cursor-bundle-1 item 6, INC-1166): a standing open rule, a closed policy, an
 * open rule a later file drops, an open policy on a dropped table, and the open policy a DO block builds
 * by dynamic SQL (the reader cannot name it).
 */
export const PLANTED_OPEN_FILES = [
  {
    file: "supabase/migrations/20260101000000_a.sql",
    sql: [
      "CREATE POLICY e2e_planted_open ON public.e2e_planted_t FOR SELECT TO anon, authenticated USING (true);",
      "CREATE POLICY e2e_planted_closed ON public.e2e_planted_t FOR SELECT TO anon USING (false);",
      "CREATE POLICY e2e_planted_gone ON public.e2e_planted_u FOR SELECT TO authenticated USING (true);",
      "CREATE POLICY e2e_planted_dead ON public.e2e_planted_v FOR ALL TO service_role USING (true) WITH CHECK (true);",
      "INSERT INTO public.e2e_planted_notes (body) VALUES ('--'); CREATE POLICY e2e_planted_lit ON public.e2e_planted_w FOR SELECT USING (true);",
    ].join("\n"),
  },
  {
    file: "supabase/migrations/20260102000000_b.sql",
    sql: "DROP POLICY e2e_planted_gone ON public.e2e_planted_u;\nDROP TABLE IF EXISTS public.e2e_planted_v;",
  },
];
/** An open policy built by dynamic SQL, naming its table in the text (so a `(computed)` line can claim it). */
export const PLANTED_COMPUTED_FILE = {
  file: "supabase/migrations/20260103000000_c.sql",
  sql: "DO $$ BEGIN EXECUTE format('CREATE POLICY %I ON public.e2e_planted_x FOR SELECT USING (true)', 'e2e_planted_x_read'); END $$;",
};
/** The lines of the planted open rules: the standing open rules of PLANTED_OPEN_FILES, kept. */
export const PLANTED_OPEN_LINES = [
  "e2e_planted_t e2e_planted_open | SELECT to anon,authenticated | grants anon:SELECT authenticated:SELECT | planted",
  "e2e_planted_w e2e_planted_lit | SELECT to public | grants none | planted",
].join("\n");
/** The planted evidence of an open-rules judgement: the files read, the file's text, the live grants. */
export function plantedOpenRules(
  files: Array<{ file: string; sql: string }>,
  lines: string,
  live?: string,
): OpenRuleEvidence {
  return {
    ...openRulesOf(files),
    file: parseOpenRules(lines),
    live: live === undefined ? undefined : liveGrants(live),
  };
}
/** The planted live answer for `e2e_planted_t`: table-level SELECT to both browser roles, nothing for `w`. */
export const PLANTED_LIVE_GRANTS =
  "e2e_planted_t\tanon\tSELECT\t*\ne2e_planted_t\tauthenticated\tSELECT\t*\n";
/** The planted live answer of a table that holds SELECT by column alone (the case ruling 2 pins). */
export const PLANTED_LIVE_COLUMN_GRANTS =
  "e2e_planted_t\tanon\tSELECT\ta,b\ne2e_planted_t\tauthenticated\tSELECT\ta,b\n";

/** The planted fixtures: each kind on its own bypass, and a clean pair. */
export function plantedCases(): Array<{
  kind: FindingKind | "clean";
  rows: DoorRow[];
  manifest: string;
  callers?: (name: string) => boolean;
  columns?: ReadonlySet<string>;
  dropped?: DroppedGrant[];
  stepUps?: (permission: string) => boolean | null | undefined;
  policies?: (policy: string, fn: string) => boolean;
  openRules?: OpenRuleEvidence;
}> {
  const openFiles = PLANTED_OPEN_FILES;
  return [
    {
      kind: "clean",
      rows: [
        row({ key: "e2e_planted_owner(uuid)", body: SHELL_BODY("'owner', NULL, NULL, 'draft'") }),
      ],
      manifest: OWNER_LINE,
    },
    {
      kind: "missing-line",
      rows: [
        row({
          key: "e2e_planted_stray(uuid)",
          body: "BEGIN PERFORM public.rate_gate('draft'); END",
        }),
      ],
      manifest: OWNER_LINE + "\n",
    },
    {
      kind: "line-without-door",
      rows: [
        row({
          key: "e2e_planted_owner(uuid)",
          body: SHELL_BODY("'owner', NULL, NULL, 'draft'"),
          authenticated: false,
        }),
      ],
      manifest: OWNER_LINE,
    },
    {
      kind: "gate-missing-for-class",
      rows: [
        row({
          key: "e2e_planted_owner(uuid)",
          body: "BEGIN UPDATE public.listings SET title = 'x' WHERE id = p_id; END",
        }),
      ],
      manifest: OWNER_LINE,
    },
    {
      kind: "class-mismatch",
      rows: [
        row({
          key: "e2e_planted_owner(uuid)",
          body: SHELL_BODY("'staff', 'listings', 'review', 'draft'"),
        }),
      ],
      manifest: OWNER_LINE,
    },
    {
      kind: "grant-unseen",
      rows: [
        row({ key: "e2e_planted_owner(uuid)", body: SHELL_BODY("'owner', NULL, NULL, 'draft'") }),
      ],
      manifest: OWNER_LINE,
      callers: () => true,
    },
    {
      kind: "grant-without-caller",
      rows: [
        row({ key: "e2e_planted_owner(uuid)", body: SHELL_BODY("'owner', NULL, NULL, 'draft'") }),
      ],
      manifest: OWNER_LINE,
      callers: () => false,
    },
    {
      kind: "scope-mode-missing",
      rows: [
        row({
          key: "e2e_planted_staff(uuid)",
          body: SHELL_BODY("'staff', 'listings', 'review', 'staff_moderation'"),
        }),
      ],
      manifest: STAFF_LINE,
    },
    {
      kind: "row-column-unknown",
      rows: [
        row({
          key: "e2e_planted_staff(uuid)",
          body: SHELL_BODY("'staff', 'listings', 'review', 'staff_moderation', v_country, 'match'"),
        }),
      ],
      manifest: STAFF_LINE.replace("| global |", "| row:listings.country |"),
      columns: new Set(["listings.home_country_code"]),
    },
    {
      kind: "grant-dropped",
      rows: [
        row({ key: "e2e_planted_owner(uuid)", body: SHELL_BODY("'owner', NULL, NULL, 'draft'") }),
      ],
      manifest: OWNER_LINE,
      dropped: plantedDropHistory("20990101000000", plantedGrant("authenticated")),
    },
    {
      kind: "opt-out-over-step-up",
      rows: [
        row({
          key: "e2e_planted_staff(uuid)",
          body: SHELL_BODY("'staff', 'listings', 'review', 'staff_moderation', NULL, 'global'"),
        }),
      ],
      manifest: STAFF_LINE.replace("| row |", "| none:D129 |"),
      stepUps: stepUpsOf([{ file: "planted.sql", sql: PLANTED_STEP_UPS }]),
    },
    {
      kind: "reader-off-gate",
      rows: plantedReaders("BEGIN RETURN auth.uid()::text; END"),
      manifest: PLANTED_PUBLIC_DATA_LINE,
    },
    {
      kind: "helper-reason-unproven",
      rows: [row({ key: "e2e_planted_helper(uuid)", body: "SELECT true", volatility: "s" })],
      manifest: PLANTED_HELPER_LINE("policy e2e_planted_gone"),
      policies: policyCallsOf(PLANTED_POLICIES),
    },
    {
      kind: "dial-shell-mismatch",
      rows: [
        row({
          key: "e2e_planted_reader(uuid)",
          body: READER_SHELL_BODY,
          volatility: "s",
        }),
      ],
      manifest: PLANTED_READER_LINE,
    },
    {
      // Every line kept, a closed policy, a dropped one, a dropped table's and a computed one a line
      // claims: nothing fires; the live grants are the catalogue's.
      kind: "clean",
      rows: [],
      manifest: "",
      openRules: plantedOpenRules(
        [...openFiles, PLANTED_COMPUTED_FILE],
        `${PLANTED_OPEN_LINES}\ne2e_planted_x (computed) | SELECT to public | grants none | planted`,
        PLANTED_LIVE_GRANTS,
      ),
    },
    {
      kind: "open-rule-undeclared",
      rows: [],
      manifest: "",
      openRules: plantedOpenRules(openFiles, ""),
    },
    {
      kind: "open-rule-gone",
      rows: [],
      manifest: "",
      openRules: plantedOpenRules(
        openFiles,
        `${PLANTED_OPEN_LINES}\ne2e_planted_u e2e_planted_gone | SELECT to authenticated | grants none | planted`,
      ),
    },
    {
      kind: "open-rule-computed",
      rows: [],
      manifest: "",
      openRules: plantedOpenRules([...openFiles, PLANTED_COMPUTED_FILE], PLANTED_OPEN_LINES),
    },
    {
      // A table that holds SELECT by column alone, its line saying `none`.
      kind: "open-rule-grants",
      rows: [],
      manifest: "",
      openRules: plantedOpenRules(
        openFiles,
        PLANTED_OPEN_LINES.replace("grants anon:SELECT authenticated:SELECT", "grants none"),
        PLANTED_LIVE_COLUMN_GRANTS,
      ),
    },
  ];
}

/** The self-test's failures: a kind that did not fire on its fixture, or a clean pair that did. */
export function selfTest(): string[] {
  const failures: string[] = [];
  for (const planted of plantedCases()) {
    const evidence =
      planted.kind === "grant-unseen"
        ? {
            unseen: [
              {
                file: "planted.sql",
                line: 1,
                text: "EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO authenticated', v_fn)",
              },
            ],
            callers: planted.callers,
          }
        : {
            callers: planted.callers,
            columns: planted.columns,
            dropped: planted.dropped,
            stepUps: planted.stepUps,
            policies: planted.policies,
            openRules: planted.openRules,
          };
    const findings = judge(planted.rows, parseManifest(planted.manifest), evidence);
    if (planted.kind === "clean") {
      if (findings.length > 0)
        failures.push(`clean pair fired: ${findings.map((f) => `${f.kind} ${f.key}`).join("; ")}`);
      continue;
    }
    const kinds = new Set(findings.map((f) => f.kind));
    if (!kinds.has(planted.kind))
      failures.push(`${planted.kind} did not fire on its planted fixture`);
  }
  for (const kind of FINDING_KINDS)
    if (!plantedCases().some((planted) => planted.kind === kind))
      failures.push(`${kind} has no planted fixture`);
  return failures;
}

/** The findings of a judgement less its allowances (kit: stale or expired lines throw). */
export function allow(findings: Finding[], allowlistPath = ALLOWLIST): Finding[] {
  const keys = findings.map((finding) => `${finding.kind} ${finding.key}`);
  const allowances = readAllowlist(allowlistPath, keys);
  return findings.filter((finding) => !allowances.has(`${finding.kind} ${finding.key}`));
}

export function staticFindings(root = ROOT): Finding[] {
  const { rows, unseen, dropped } = staticRows(root);
  const manifest = parseManifest(
    readFileSync(join(root, "scripts", "doors", "manifest.txt"), "utf8"),
  );
  return judge(rows, manifest, {
    unseen,
    dropped,
    callers: treeCallers(root, rows),
    columns: declaredColumns(root),
    stepUps: declaredStepUps(root),
    policies: declaredPolicyCalls(root),
    openRules: declaredOpenRulesFile(root),
  });
}

/** The open rules the migrations leave standing, beside the file that lists them (`live`: the grants). */
function declaredOpenRulesFile(root: string, grantsTsv?: string): OpenRuleEvidence {
  return {
    ...declaredOpenRules(root),
    file: parseOpenRules(readFileSync(join(root, OPEN_RULES), "utf8")),
    live: grantsTsv === undefined ? undefined : liveGrants(grantsTsv),
  };
}

export function liveFindings(tsv: string, root = ROOT, grantsTsv?: string): Finding[] {
  const manifest = parseManifest(
    readFileSync(join(root, "scripts", "doors", "manifest.txt"), "utf8"),
  );
  // INC-1072: the live judgement reads the same tree census as the static one, so both modes
  // fire the same kinds and one allowlist serves both (a `grant-without-caller` line the live
  // mode never judged read as stale and killed the smoke lane's first live run).
  const rows = liveRows(tsv);
  return judge(rows, manifest, {
    callers: treeCallers(root, rows),
    columns: declaredColumns(root),
    stepUps: declaredStepUps(root),
    policies: declaredPolicyCalls(root),
    openRules: declaredOpenRulesFile(root, grantsTsv),
  });
}

function print(label: string, findings: Finding[]): void {
  for (const finding of findings)
    console.error(
      `check-doors ${label} FAIL: ${finding.kind} ${finding.key} — ${finding.what} (${finding.where})`,
    );
}

if (process.argv[1] !== undefined && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [mode, path, grantsPath] = process.argv.slice(2);
  if (mode === "--live-query") {
    // INC-1070: the file's bytes as they are — the workflow hands them to psql.
    process.stdout.write(LIVE_QUERY);
    process.exit(0);
  }
  if (mode === "--live-open-rules-query") {
    // The file's bytes as they are — the workflow hands them to psql (INC-1070).
    process.stdout.write(LIVE_OPEN_RULES_QUERY);
    process.exit(0);
  }
  const proof = selfTest();
  if (proof.length > 0) {
    for (const line of proof) console.error(`check-doors self-test FAILED: ${line}`);
    console.error("check-doors: the guard did not prove itself, so it judged nothing (DEC-334)");
    process.exit(1);
  }
  console.log(
    `check-doors self-test OK: ${FINDING_KINDS.length} finding kinds fired on their planted fixtures, the clean pair fired nothing`,
  );
  if (process.env["SELF_TEST"] === "1") process.exit(0);
  const manifestLines = parseManifest(readFileSync(MANIFEST, "utf8")).lines.size;
  if (mode === "--live") {
    if (path === undefined || grantsPath === undefined)
      throw new Error(
        "check-doors --live requires the catalogue TSV path and the open rules' grants TSV path",
      );
    const findings = allow(
      liveFindings(readFileSync(path, "utf8"), ROOT, readFileSync(grantsPath, "utf8")),
    );
    if (findings.length > 0) {
      print("live", findings);
      process.exit(1);
    }
    console.log(
      `check-doors live OK: ${manifestLines} manifest lines reconcile with the live catalogue; the open rules' grants are the catalogue's`,
    );
  } else {
    const findings = allow(staticFindings());
    if (findings.length > 0) {
      print("static", findings);
      process.exit(1);
    }
    console.log(
      `check-doors static OK: ${manifestLines} manifest lines reconcile with the migrations' catalogue`,
    );
  }
}
