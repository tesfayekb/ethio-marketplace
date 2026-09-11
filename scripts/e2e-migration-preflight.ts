/**
 * Migration-parity preflight (INC-074, U1f-3).
 *
 * Runs BEFORE Playwright. Proves that the staging database carries the newest
 * local migration, so a missing RPC fails once, loudly, with the filename —
 * instead of twelve cryptic test reds.
 *
 * ENVIRONMENT ASYMMETRY (U1f-3 root cause): supabase_migrations.schema_migrations
 * exists only where the migration TOOL ran (ethio-prod). ethio-staging is applied
 * by hand through the SQL editor, which writes no ledger at all. The ledger is
 * therefore public.migration_marks — every migration's last statement inserts its
 * own 14-digit version (self-marking law, docs/governance/migrations.md), so the
 * ledger is identical on both environments.
 *
 * Mechanism (in order):
 *   1. Ledger (primary): public.e2e_migration_ledger(), a SECURITY DEFINER
 *      function executable by service_role ONLY, returning the marks in order.
 *   2. Fallback probe (DEGRADED, announced loudly via ::warning and the CI step
 *      summary): used ONLY when the RPC itself is absent — i.e. the ledger
 *      migration has not been applied to staging yet. Parses the newest local
 *      migration for the objects it declares (CREATE [OR REPLACE] FUNCTION /
 *      CREATE TABLE) and checks them against staging. Seed-only migrations are
 *      invisible to this mode; it never claims otherwise.
 *
 * Modes:
 *   (default)  fail non-zero when staging is behind.
 *   --dry      print applied-vs-local for the operator; always exit 0.
 */

import { appendFileSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REAL_MIGRATIONS_DIR = join(HERE, "..", "supabase", "migrations");
/**
 * DEC-054: the only knob the --self-test mode turns. It points the SAME reader
 * and the SAME healer logic at fixture directories; nothing about healedMark
 * changes.
 */
let MIGRATIONS_DIR = REAL_MIGRATIONS_DIR;
const PROD_REF = "zwmvxvzzvjvtdcfcwiuf";

type Probe = { kind: "function" | "table"; name: string };

export function localMigrations(): string[] {
  return readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();
}

function versionOf(filename: string): string {
  return filename.split("_")[0] ?? "";
}

/**
 * INC-094 — DECLARED-MARK LAW. A migration cannot contain its own filename
 * stamp: the tool assigns that stamp when it writes the file, after the SQL is
 * authored, and the file cannot be edited afterwards. Parity is therefore keyed
 * on the mark the file DECLARES — the newest 14-digit literal in one of its
 * `INSERT INTO public.migration_marks` statements — falling back to the
 * filename stamp for the older files where the two coincide.
 */
export function declaredMark(filename: string): string {
  const sql = readFileSync(join(MIGRATIONS_DIR, filename), "utf8");
  const marks = [...sql.matchAll(/migration_marks[^;]*?'(\d{14})'/gi)].map((m) => m[1]!);
  const own = marks.length === 0 ? versionOf(filename) : marks.sort()[marks.length - 1]!;
  return healedMark(own);
}

/**
 * DEC-022 HEALER LAW. A file cannot be edited after it is written, so a mark
 * that violates monotonicity is corrected by a LATER migration that REWRITES
 * the ledger row (`UPDATE public.migration_marks SET version = '<new>' WHERE
 * version = '<old>'`). Parity must therefore compare against the healed value,
 * not the literal the older file declares — otherwise a healed environment
 * reads as "behind" forever. The remap is read from the migrations themselves,
 * so it needs no allowlist upkeep, and is applied transitively.
 */
let healMap: Map<string, string> | null = null;

function healRemaps(): Map<string, string> {
  if (healMap) return healMap;
  const map = new Map<string, string>();
  const re =
    /update\s+(?:public\.)?migration_marks\s+set\s+version\s*=\s*'(\d{14})'\s+where\s+version\s*=\s*'(\d{14})'/gi;
  for (const file of localMigrations()) {
    const sql = readFileSync(join(MIGRATIONS_DIR, file), "utf8");
    for (const m of sql.matchAll(re)) map.set(m[2]!, m[1]!);
  }
  healMap = map;
  return map;
}

function healedMark(mark: string): string {
  const map = healRemaps();
  let current = mark;
  const seen = new Set<string>([current]);
  while (map.has(current)) {
    const next = map.get(current)!;
    if (seen.has(next)) break;
    seen.add(next);
    current = next;
  }
  return current;
}

/**
 * INC-094: compare on the DECLARED mark (healed per DEC-022), never the
 * filename stamp. Extracted so --self-test exercises the very same comparison
 * the staging run uses.
 */
export function missingAgainstLedger(local: string[], applied: string[]): string[] {
  const appliedSet = new Set(applied);
  return local.filter((f) => !appliedSet.has(declaredMark(f)));
}


function serviceClient(): { client: SupabaseClient; url: string } {
  const url = process.env["E2E_SUPABASE_URL"] ?? "";
  const key = process.env["E2E_SUPABASE_SERVICE_ROLE_KEY"] ?? "";
  if (!url || !key) {
    throw new Error(
      "[e2e:preflight] E2E_SUPABASE_URL and E2E_SUPABASE_SERVICE_ROLE_KEY must be set (staging only).",
    );
  }
  if (url.includes(PROD_REF)) {
    throw new Error(
      "[e2e:preflight] Refusing to probe ethio-prod. Point E2E_SUPABASE_URL at staging.",
    );
  }
  return {
    url,
    client: createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }),
  };
}

/** Loud degraded-mode notice: stderr ::warning + the CI step summary. */
function degraded(reason: string): void {
  const line = `PREFLIGHT DEGRADED: object-probe only (seed-only migrations invisible) — ${reason}`;
  console.error(`::warning::${line}`);
  const summary = process.env["GITHUB_STEP_SUMMARY"];
  if (summary) {
    try {
      appendFileSync(summary, `\n> **${line}**\n`);
    } catch (err) {
      console.error(`[e2e:preflight] could not write the step summary: ${String(err)}`);
    }
  }
}

/**
 * LEDGER-FIRST RULE (U1c/U1f-2/U1f-3): the ledger is THE mechanism — the only
 * path that detects seed-only migrations. It is public.migration_marks, read
 * through public.e2e_migration_ledger(), a definer function executable by
 * service_role ONLY.
 *
 * Returns null only when the RPC itself is unavailable (the ledger migration has
 * not been applied to staging); the caller then declares degraded mode loudly
 * rather than claiming a check it never made.
 */
const LEDGER_MIGRATION = "20260817054246 (public.migration_marks + e2e_migration_ledger)";

async function appliedVersionsFromLedger(client: SupabaseClient): Promise<string[] | null> {
  const { data, error } = await client.rpc("e2e_migration_ledger");
  if (error || !data) {
    degraded(
      `${error?.message ?? "ledger RPC returned no rows"} — apply ${LEDGER_MIGRATION} to ethio-staging first`,
    );
    return null;
  }

  return (data as string[]).map((v) => String(v)).sort();
}

/** Objects declared by a migration file, used by the fallback probe. */
export function declaredObjects(sql: string): Probe[] {
  const probes: Probe[] = [];
  const fnRe = /create\s+(?:or\s+replace\s+)?function\s+(?:public\.)?"?([a-z0-9_]+)"?/gi;
  const tableRe = /create\s+table\s+(?:if\s+not\s+exists\s+)?(?:public\.)?"?([a-z0-9_]+)"?/gi;
  for (const m of sql.matchAll(fnRe)) probes.push({ kind: "function", name: m[1]!.toLowerCase() });
  for (const m of sql.matchAll(tableRe)) probes.push({ kind: "table", name: m[1]!.toLowerCase() });
  const seen = new Set<string>();
  return probes.filter((p) => {
    const key = `${p.kind}:${p.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** True when the object exists on staging. Missing-object error codes are the signal. */
async function objectExists(client: SupabaseClient, probe: Probe): Promise<boolean> {
  if (probe.kind === "table") {
    const { error } = await client.from(probe.name).select("*").limit(0);
    if (!error) return true;
    return !(error.code === "42P01" || /does not exist/i.test(error.message));
  }
  const { error } = await client.rpc(probe.name, {});
  if (!error) return true;
  // PGRST202 covers BOTH "no such function" and "exists but different
  // arguments". PostgREST distinguishes them in the hint: when the name exists
  // it suggests the real signature. A named suggestion means PRESENT.
  const hint = (error as { hint?: string | null }).hint ?? "";
  if (hint.toLowerCase().includes(probe.name)) return true;
  return !(error.code === "PGRST202" || /could not find the function/i.test(error.message));
}

export default async function migrationPreflight(dry = false): Promise<void> {
  const local = localMigrations();
  if (local.length === 0) {
    console.log("[e2e:preflight] no local migrations; nothing to check.");
    return;
  }
  const newest = local[local.length - 1]!;
  const { client } = serviceClient();

  const applied = await appliedVersionsFromLedger(client);
  let missing: string[] = [];
  let mechanism: string;

  if (applied) {
    mechanism = "public.e2e_migration_ledger() definer RPC (public.migration_marks)";

    missing = missingAgainstLedger(local, applied);
    if (dry) {
      console.log(`[e2e:preflight] mechanism: ${mechanism}`);
      console.log(`[e2e:preflight] applied on staging (${applied.length}): ${applied.join(", ")}`);
      console.log(
        `[e2e:preflight] local files (${local.length}): ${local
          .map((f) => `${versionOf(f)}→${declaredMark(f)}`)
          .join(", ")}`,
      );
    }
  } else {
    mechanism =
      "declared-object probe of the newest local migration (FALLBACK — seed-only migrations are invisible to it)";
    const probes = declaredObjects(readFileSync(join(MIGRATIONS_DIR, newest), "utf8"));
    const absent: string[] = [];
    for (const probe of probes) {
      if (!(await objectExists(client, probe))) absent.push(`${probe.kind} ${probe.name}`);
    }
    if (dry) {
      console.log(`[e2e:preflight] mechanism: ${mechanism} (ledger RPC unavailable)`);

      console.log(`[e2e:preflight] newest local migration: ${newest}`);
      console.log(
        `[e2e:preflight] probed objects: ${probes.map((p) => `${p.kind} ${p.name}`).join(", ") || "(none)"}`,
      );
      console.log(`[e2e:preflight] absent on staging: ${absent.join(", ") || "(none)"}`);
    }
    if (absent.length > 0) missing = [newest];
  }

  if (dry) {
    console.log(`[e2e:preflight] --dry: ${missing.length} migration(s) missing on staging.`);
    return;
  }

  if (missing.length > 0) {
    const newestMissing = missing[missing.length - 1]!;
    console.error(`STAGING BEHIND: apply ${newestMissing} to ethio-staging before E2E can pass`);
    console.error(`[e2e:preflight] mechanism: ${mechanism}`);
    console.error("[e2e:preflight] missing migration file(s):");
    for (const file of missing) console.error(`  - ${file}`);
    throw new Error(`STAGING BEHIND: apply ${newestMissing} to ethio-staging before E2E can pass`);
  }

  console.log(`[e2e:preflight] migration parity OK via ${mechanism} (newest: ${newest}).`);
  if (!applied) {
    degraded(
      `parity was proved by the object probe, not the ledger — apply ${LEDGER_MIGRATION} to ethio-staging`,
    );
  }
}

/* ------------------------------------------------------------------------- *
 * DEC-054 — SELF-TEST. A guard that has never been shown to fail on bad input
 * is not trusted. This mode points the real reader and the real healer logic at
 * authored fixture migrations under scripts/fixtures/migration-healer/ and
 * asserts the missing-count both ways round: the healed value is the truth, the
 * literal is not. No network, no real ledger.
 * ------------------------------------------------------------------------- */

const FIXTURES_DIR = join(HERE, "fixtures", "migration-healer");

type SelfTestCase = {
  name: string;
  dir: string;
  ledger: string[];
  expectMissing: string[];
};

/** Marks a fixture set declares BEFORE any healer remap is applied. */
function literalMarks(dir: string): Set<string> {
  const out = new Set<string>();
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".sql"))) {
    const sql = readFileSync(join(dir, file), "utf8");
    for (const m of sql.matchAll(/insert\s+into\s+(?:public\.)?migration_marks[^;]*?'(\d{14})'/gi)) {
      out.add(m[1]!);
    }
  }
  return out;
}

function useFixtureDir(dir: string): void {
  MIGRATIONS_DIR = dir;
  healMap = null; // recompute the remap from the fixture set
}

export function selfTest(): number {
  const cases: SelfTestCase[] = [
    {
      name: "a. healed — ledger holds the healed value → 0 missing",
      dir: "healed",
      ledger: ["20260101000000", "20260102000000"],
      expectMissing: [],
    },
    {
      name: "a. healed — ledger holds the stale literal → 1 missing (bad input)",
      dir: "healed",
      ledger: ["20250101000000", "20260102000000"],
      expectMissing: ["20260101000000_a-declares-below-stamp.sql"],
    },
    {
      name: "b. unhealed — ledger holds neither → 1 missing (bad input)",
      dir: "unhealed",
      ledger: [],
      expectMissing: ["20260101000000_a-declares-below-stamp.sql"],
    },
    {
      name: "b. unhealed — ledger holds the literal, no healer → 0 missing",
      dir: "unhealed",
      ledger: ["20250101000000"],
      expectMissing: [],
    },
    {
      name: "c. transitive — ledger holds Y → 0 missing",
      dir: "transitive",
      ledger: ["20260103000000", "20260102000000", "20260104000000"],
      expectMissing: [],
    },
    {
      name: "c. transitive — ledger holds the intermediate X → 1 missing (bad input)",
      dir: "transitive",
      ledger: ["20260101000000", "20260102000000", "20260104000000"],
      expectMissing: ["20260101000000_a-declares-below-stamp.sql"],
    },
    {
      name: "d. unknown old mark — healer ignored, literal stands → 0 missing",
      dir: "unknown-old-mark",
      ledger: ["20250101000000", "20260102000000"],
      expectMissing: [],
    },
  ];

  let failures = 0;
  for (const c of cases) {
    const dir = join(FIXTURES_DIR, c.dir);
    useFixtureDir(dir);
    const missing = missingAgainstLedger(localMigrations(), c.ledger);
    const ok =
      missing.length === c.expectMissing.length && c.expectMissing.every((f) => missing.includes(f));
    if (!ok) failures += 1;
    console.log(
      `${ok ? "OK  " : "FAIL"} ${c.name} — expected [${c.expectMissing.join(", ") || "none"}], got [${
        missing.join(", ") || "none"
      }]`,
    );
  }

  // Case d also demands a WARNING: a remap whose old mark no fixture declares
  // is announced, never silently applied.
  const unknownDir = join(FIXTURES_DIR, "unknown-old-mark");
  useFixtureDir(unknownDir);
  const declared = literalMarks(unknownDir);
  const orphans = [...healRemaps().keys()].filter((old) => !declared.has(old));
  if (orphans.length === 0) {
    failures += 1;
    console.log("FAIL d. unknown old mark — expected an orphan remap to warn about, found none");
  } else {
    for (const old of orphans) {
      console.log(
        `WARN d. healer names an old mark no migration declares: '${old}' → '${healRemaps().get(old)}' (ignored)`,
      );
    }
    console.log("OK   d. unknown old mark — orphan remap warned and not applied");
  }

  MIGRATIONS_DIR = REAL_MIGRATIONS_DIR;
  healMap = null;

  if (failures > 0) {
    console.error(`[e2e:preflight] --self-test FAILED: ${failures} case(s).`);
    return 1;
  }
  console.log(`[e2e:preflight] --self-test OK: ${cases.length + 1} case(s) passed.`);
  return 0;
}

// Direct CLI invocation: `bun scripts/e2e-migration-preflight.ts [--dry|--self-test]`
if (process.argv[1] && process.argv[1].includes("e2e-migration-preflight")) {
  if (process.argv.includes("--self-test")) {
    process.exit(selfTest());
  }
  migrationPreflight(process.argv.includes("--dry")).catch((err: unknown) => {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  });
}
