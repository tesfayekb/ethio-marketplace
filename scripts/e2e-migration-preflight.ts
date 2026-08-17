/**
 * Migration-parity preflight (INC-074).
 *
 * Runs BEFORE Playwright. Proves that the staging database carries the newest
 * local migration, so a missing RPC fails once, loudly, with the filename —
 * instead of twelve cryptic test reds.
 *
 * Mechanism (in order):
 *   1. Try the Supabase CLI ledger: schema "supabase_migrations", table
 *      "schema_migrations" (column `version` = the 14-digit filename prefix).
 *      This is the table Lovable's migration tool writes on this project, but
 *      it is only readable through PostgREST when that schema is exposed.
 *   2. Fallback probe (definer-free, service-role): parse the newest local
 *      migration for the objects it declares (CREATE [OR REPLACE] FUNCTION /
 *      CREATE TABLE) and check them against staging — functions via
 *      pg_get_function_identity_arguments-free RPC existence detection
 *      (PostgREST PGRST202 = not in schema cache), tables via a zero-row select
 *      (42P01 = missing).
 *
 * Modes:
 *   (default)  fail non-zero when staging is behind.
 *   --dry      print applied-vs-local for the operator; always exit 0.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const HERE = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(HERE, "..", "supabase", "migrations");
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

/** Reads the CLI ledger. Returns null when the schema is not reachable. */
async function appliedVersionsFromLedger(url: string, key: string): Promise<string[] | null> {
  const ledger = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    db: { schema: "supabase_migrations" },
  });
  const { data, error } = await ledger.from("schema_migrations").select("version");
  if (error || !data) return null;
  return (data as Array<{ version: string }>).map((row) => String(row.version)).sort();
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
  // PGRST202: function not found in the schema cache -> genuinely missing.
  return !(error.code === "PGRST202" || /could not find the function/i.test(error.message));
}

export default async function migrationPreflight(dry = false): Promise<void> {
  const local = localMigrations();
  if (local.length === 0) {
    console.log("[e2e:preflight] no local migrations; nothing to check.");
    return;
  }
  const newest = local[local.length - 1]!;
  const { client, url } = serviceClient();
  const key = process.env["E2E_SUPABASE_SERVICE_ROLE_KEY"]!;

  const applied = await appliedVersionsFromLedger(url, key);
  let missing: string[] = [];
  let mechanism: string;

  if (applied) {
    mechanism = "supabase_migrations.schema_migrations ledger";
    const appliedSet = new Set(applied);
    missing = local.filter((f) => !appliedSet.has(versionOf(f)));
    if (dry) {
      console.log(`[e2e:preflight] mechanism: ${mechanism}`);
      console.log(`[e2e:preflight] applied on staging (${applied.length}): ${applied.join(", ")}`);
      console.log(
        `[e2e:preflight] local files (${local.length}): ${local.map(versionOf).join(", ")}`,
      );
    }
  } else {
    mechanism = "declared-object probe of the newest local migration";
    const probes = declaredObjects(readFileSync(join(MIGRATIONS_DIR, newest), "utf8"));
    const absent: string[] = [];
    for (const probe of probes) {
      if (!(await objectExists(client, probe))) absent.push(`${probe.kind} ${probe.name}`);
    }
    if (dry) {
      console.log(`[e2e:preflight] mechanism: ${mechanism} (ledger schema not exposed)`);
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
}

// Direct CLI invocation: `bun scripts/e2e-migration-preflight.ts [--dry]`
if (process.argv[1] && process.argv[1].includes("e2e-migration-preflight")) {
  migrationPreflight(process.argv.includes("--dry")).catch((err: unknown) => {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  });
}
