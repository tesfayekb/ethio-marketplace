import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { readAllowlist } from "../conformance/kit";
import { FINDING_KINDS, judge, type Finding, type FindingKind } from "./judge";
import { parseManifest } from "./manifest";
import { LIVE_QUERY, liveRows, staticRows, treeCallers, type DoorRow } from "./rows";

/**
 * Foundations 1 (DEC-333 / DEC-334) — THE DOOR GUARD. Judges
 * scripts/doors/manifest.txt against the rows (judge.ts):
 *
 *   bun scripts/doors/check-doors.ts                 static: the migrations' catalogue + the tree's callers
 *   bun scripts/doors/check-doors.ts --live <tsv>    live: the smoke lane's catalogue (LIVE_QUERY's answer)
 *   bun scripts/doors/check-doors.ts --live-query    prints scripts/doors/live-query.sql verbatim for the workflow's psql
 *   SELF_TEST=1 bun scripts/doors/check-doors.ts     the planted fixtures only
 *
 * DEC-334's frozen rule: every mode runs the self-test FIRST, in the same
 * process — each of the seven finding kinds must fire on its planted fixture
 * and a clean planted pair must fire nothing — and judges nothing until it has.
 * A guard that cannot prove itself gates nothing and fails loudly.
 *
 * Allowlist: scripts/doors/check-doors-allowlist.txt, kit grammar
 * `<kind> <key> | reason | until`; stale or expired lines fail (kit).
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "doors", "check-doors-allowlist.txt");
const MANIFEST = join(ROOT, "scripts", "doors", "manifest.txt");

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

/** The planted fixtures: each kind on its own bypass, and a clean pair. */
export function plantedCases(): Array<{
  kind: FindingKind | "clean";
  rows: DoorRow[];
  manifest: string;
  callers?: (name: string) => boolean;
}> {
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
        : { callers: planted.callers };
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
  const { rows, unseen } = staticRows(root);
  const manifest = parseManifest(
    readFileSync(join(root, "scripts", "doors", "manifest.txt"), "utf8"),
  );
  return judge(rows, manifest, { unseen, callers: treeCallers(root, rows) });
}

export function liveFindings(tsv: string, root = ROOT): Finding[] {
  const manifest = parseManifest(
    readFileSync(join(root, "scripts", "doors", "manifest.txt"), "utf8"),
  );
  return judge(liveRows(tsv), manifest);
}

function print(label: string, findings: Finding[]): void {
  for (const finding of findings)
    console.error(
      `check-doors ${label} FAIL: ${finding.kind} ${finding.key} — ${finding.what} (${finding.where})`,
    );
}

if (process.argv[1] !== undefined && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [mode, path] = process.argv.slice(2);
  if (mode === "--live-query") {
    // INC-1070: the file's bytes as they are — the workflow hands them to psql.
    process.stdout.write(LIVE_QUERY);
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
    if (path === undefined) throw new Error("check-doors --live requires the catalogue TSV path");
    const findings = allow(liveFindings(readFileSync(path, "utf8")));
    if (findings.length > 0) {
      print("live", findings);
      process.exit(1);
    }
    console.log(
      `check-doors live OK: ${manifestLines} manifest lines reconcile with the live catalogue`,
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
