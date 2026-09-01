import { randomBytes } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { createClient } from "@supabase/supabase-js";

import migrationPreflight from "../scripts/e2e-migration-preflight";
import { mintEmail } from "./helpers/users";

const HERE = dirname(fileURLToPath(import.meta.url));
export const STATE_FILE = join(HERE, ".state", "test-user.json");

const PROD_REF = "zwmvxvzzvjvtdcfcwiuf";
const STAGING_REF = "jatpuhfdjfzctjipklmk";

/**
 * FENCE LANGUAGE (INC-097d). Sweep-class specs (the global AI bulk) operate in
 * a language nobody else works in, so a by-design global operation can never
 * touch a sibling test's seeded rows. Declared here because both the specs that
 * use it and this reaper must agree on the codes. `zxx` (ISO 639-2 "no
 * linguistic content"), not the literal `e2e`: /api/translate validates
 * target_lang against /^[a-z]{2,8}(-[a-z]{2,8})?$/, which rejects the digit.
 *
 * U4g-6 (INC-101) — ONE FENCE PER GLOBAL-SWEEP TEST: TR-12's AI bulk and
 * TR-19's approve-all are BOTH sweeps, so the approve sweep gets `zxy`.
 *
 * U4g-25 (INC-115b) — FENCES CARRY THE PROJECT AXIS: a sweep test running on
 * two viewports is TWO sweeps. Desktop's approve-all swept mobile's freshly
 * seeded rows inside the shared `zxy` (mobile saw reviewable=0, 2 of 4 keys).
 * Every fence is therefore region-suffixed per Playwright project — `zxx-m` /
 * `zxx-d`, `zxy-m` / `zxy-d` — which still satisfies the route's
 * ^[a-z]{2,8}(-[a-z]{2,8})?$ contract.
 */
export const FENCE_PREFIXES = { bulk: "zxx", approve: "zxy" } as const;

export type FenceKind = keyof typeof FENCE_PREFIXES;

/** Every fence prefix, so the reaper can never miss a suffixed variant. */
export const FENCE_PREFIX_LIST = Object.values(FENCE_PREFIXES);

/**
 * The project axis, reduced to a region subtag: only [a-z]{1,8} survives, so
 * any future project name still yields a route-legal code.
 */
export function fenceProjectSuffix(project: string): string {
  const letters = project.toLowerCase().replace(/[^a-z]/g, "");
  if (letters.startsWith("mobile")) return "m";
  if (letters.startsWith("desktop")) return "d";
  return (letters || "x").slice(0, 8);
}

/** The fence code a given sweep kind uses inside a given Playwright project. */
export function fenceLang(kind: FenceKind, project: string): string {
  return `${FENCE_PREFIXES[kind]}-${fenceProjectSuffix(project)}`;
}


export type E2EUser = {
  id: string;
  email: string;
  password: string;
  displayName: string;
  /**
   * Persisted so THIS process's teardown can scope deletions to its own
   * fixtures (INC-080). Parallel shards share GITHUB_RUN_ID, so the run id
   * alone is not an ownership boundary.
   */
  processId: string;
};

let cachedProcessId: string | null = null;

/**
 * Ownership boundary for E2E fixtures (INC-080). Every parallel test process
 * (each CI shard, the smoke tier, a local run) gets its own id, so teardown
 * can delete exactly what it minted and nothing a sibling process owns.
 */
export function processId(): string {
  if (cachedProcessId) return cachedProcessId;
  const run = process.env["GITHUB_RUN_ID"] ?? `local${randomBytes(3).toString("hex")}`;
  const shard = process.env["E2E_SHARD"] ?? "solo";
  cachedProcessId = `${run}-${shard}`;
  return cachedProcessId;
}

/**
 * Reserved, non-deliverable namespace — sweepable, never a real address.
 *
 * ID SCHEME (INC-080 final): `testEmail` is now a THIN ALIAS of `mintEmail`, so
 * no spec can construct a colliding address. `mintEmail` adds the worker tag and
 * a random suffix on top of PROCESS_ID, which is what parallel Playwright
 * workers inside ONE job need (they share PROCESS_ID and each restart any
 * counter at 1). The legacy `id` parameter is ignored: ownership always comes
 * from `processId()`, so teardown's `+${PROCESS_ID}-` filter still matches.
 */
export function testEmail(_id: string, n: number): string {
  return mintEmail(n);
}

export function adminClient() {
  const url = process.env["E2E_SUPABASE_URL"];
  const serviceRoleKey = process.env["E2E_SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !serviceRoleKey) {
    throw new Error(
      "E2E_SUPABASE_URL and E2E_SUPABASE_SERVICE_ROLE_KEY must be set (staging project only).",
    );
  }
  if (url.includes(PROD_REF)) {
    throw new Error("Refusing to run E2E against ethio-prod. Point E2E_SUPABASE_URL at staging.");
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default async function globalSetup() {
  // 0. Migration parity (INC-074): staging must carry the newest local migration,
  //    or the suite fails once with the filename instead of N cryptic reds.
  await migrationPreflight();

  // 1. Loud, non-sensitive preflight. URL is not secret; the key never is printed.
  const url = process.env["E2E_SUPABASE_URL"] ?? "";
  const keyLength = (process.env["E2E_SUPABASE_SERVICE_ROLE_KEY"] ?? "").length;
  console.log(`[e2e:setup] E2E_SUPABASE_URL = ${url || "(unset)"}`);
  console.log(
    `[e2e:setup] E2E_SUPABASE_SERVICE_ROLE_KEY present = ${keyLength > 0} (length ${keyLength})`,
  );
  console.log(`[e2e:setup] target ref is staging (${STAGING_REF}) = ${url.includes(STAGING_REF)}`);
  if (!url.includes(STAGING_REF)) {
    throw new Error(
      `[e2e:setup] E2E_SUPABASE_URL does not point at ethio-staging (${STAGING_REF}). Got: ${url || "(unset)"}`,
    );
  }

  const supabase = adminClient();

  const currentProcessId = processId();
  console.log(`[e2e:setup] PROCESS_ID = ${currentProcessId}`);
  const email = testEmail(currentProcessId, 1);
  const password =
    process.env["E2E_USER_PASSWORD"] ?? `Pw-${randomBytes(18).toString("base64url")}`;

  // 2. Create — any error or missing id fails the job HERE.
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { country_guess: "ET" },
  });
  if (error || !data?.user?.id) {
    throw new Error(
      `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
        (error?.status ? ` (status ${error.status})` : ""),
    );
  }
  const userId = data.user.id;
  console.log(`[e2e:setup] created user ${userId} (${email})`);

  // 3. Read the user back and prove it is confirmed.
  const { data: readBack, error: readError } = await supabase.auth.admin.getUserById(userId);
  if (readError || !readBack?.user) {
    throw new Error(
      `[e2e:setup] user ${userId} not found after create: ${readError?.message ?? "no user returned"}`,
    );
  }
  if (!readBack.user.email_confirmed_at) {
    throw new Error(
      `[e2e:setup] user ${userId} exists but email_confirmed_at is not set — sign-in would fail.`,
    );
  }
  console.log(`[e2e:setup] verified user confirmed at ${readBack.user.email_confirmed_at}`);

  // 4. We do NOT poll the RLS-protected profiles table here. The admin Auth client uses the
  //    sb_secret_ key, which is not the Postgres service_role role that bypasses RLS, so a
  //    direct PostgREST read would be denied. The handle_new_user trigger's row creation is
  //    already deny-proved in P1-a (scripts/deny-tests/phase1-identity.md, D1–D7). The actual
  //    E2E test exercises the profile read through the correct owner-authenticated path.

  // 5. Only now hand credentials to the spec.
  // handle_new_user() derives display_name from the local part of the email.
  const user: E2EUser = {
    id: userId,
    email,
    password,
    displayName: email.split("@")[0]!,
    processId: currentProcessId,
  };

  mkdirSync(dirname(STATE_FILE), { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(user), "utf8");

  // 6. Reap the fixture graveyard (INC-096g): a mid-test death leaves scratch
  //    rows behind. Anything older than an hour cannot belong to a live run.
  const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  let reaped = 0;
  const { data: staleRevisions, error: revisionError } = await supabase
    .from("ui_translation_revisions")
    .delete()
    .like("key", "e2e.scratch.%")
    .lt("changed_at", cutoff)
    .select("id");
  if (revisionError) {
    throw new Error(`[e2e:setup] reaping stale scratch revisions failed: ${revisionError.message}`);
  }
  reaped += staleRevisions?.length ?? 0;
  const { data: staleRows, error: rowError } = await supabase
    .from("ui_translations")
    .delete()
    .like("key", "e2e.scratch.%")
    .lt("updated_at", cutoff)
    .select("key");
  if (rowError) {
    throw new Error(`[e2e:setup] reaping stale scratch translations failed: ${rowError.message}`);
  }
  reaped += staleRows?.length ?? 0;

  // INC-097d — FENCE SURFACES also leave residue when a run dies mid-test:
  // the fence language's rows, and TR-14's scratch locations (with their
  // entity translations). Anything older than an hour cannot belong to a live
  // run, so it is reaped here rather than left to meet the next fixture.
  const { data: staleFenceRevisions, error: fenceRevisionError } = await supabase
    .from("ui_translation_revisions")
    .delete()
    .in("lang_code", [...FENCE_LANGS])
    .lt("changed_at", cutoff)
    .select("id");
  if (fenceRevisionError) {
    throw new Error(`[e2e:setup] reaping fence revisions failed: ${fenceRevisionError.message}`);
  }
  reaped += staleFenceRevisions?.length ?? 0;
  const { data: staleFenceRows, error: fenceRowError } = await supabase
    .from("ui_translations")
    .delete()
    .in("lang_code", [...FENCE_LANGS])
    .lt("updated_at", cutoff)
    .select("key");
  if (fenceRowError) {
    throw new Error(`[e2e:setup] reaping fence translations failed: ${fenceRowError.message}`);
  }
  reaped += staleFenceRows?.length ?? 0;

  const { data: staleLocations, error: locationError } = await supabase
    .from("locations")
    .select("id")
    .like("name_en", "E2E-Scratch-%")
    .lt("created_at", cutoff);
  if (locationError) {
    throw new Error(`[e2e:setup] listing stale scratch locations failed: ${locationError.message}`);
  }
  for (const row of staleLocations ?? []) {
    const { error: translationError } = await supabase
      .from("entity_translations")
      .delete()
      .eq("entity_type", "location")
      .eq("entity_id", row.id);
    if (translationError) {
      throw new Error(
        `[e2e:setup] reaping entity translations for ${row.id} failed: ${translationError.message}`,
      );
    }
    const { error: deleteError } = await supabase.from("locations").delete().eq("id", row.id);
    if (deleteError) {
      throw new Error(
        `[e2e:setup] reaping scratch location ${row.id} failed: ${deleteError.message}`,
      );
    }
    reaped += 1;
  }

  // INC-114 — SCRATCH ROLES were never reaped. PostgREST caps a read at 1000
  // rows, so an accumulated graveyard of `e2e-%` roles hid newly created ones
  // from RP-2's list (its dump showed dataLength=1000). The reaper law now
  // covers every scratch entity type, not just translations.
  const { data: staleRoles, error: staleRoleError } = await supabase
    .from("roles")
    .select("id")
    .like("name", "e2e-%")
    .lt("created_at", cutoff);
  if (staleRoleError) {
    throw new Error(`[e2e:setup] listing stale scratch roles failed: ${staleRoleError.message}`);
  }
  const staleRoleIds = (staleRoles ?? []).map((row) => row.id);
  if (staleRoleIds.length > 0) {
    // Dependents first: a role with grants or members cannot be deleted.
    const { error: permError } = await supabase
      .from("role_permissions")
      .delete()
      .in("role_id", staleRoleIds);
    if (permError) {
      throw new Error(`[e2e:setup] reaping scratch role permissions failed: ${permError.message}`);
    }
    const { error: memberError } = await supabase
      .from("user_roles")
      .delete()
      .in("role_id", staleRoleIds);
    if (memberError) {
      throw new Error(`[e2e:setup] reaping scratch role members failed: ${memberError.message}`);
    }
    const { error: roleDeleteError } = await supabase.from("roles").delete().in("id", staleRoleIds);
    if (roleDeleteError) {
      throw new Error(`[e2e:setup] reaping scratch roles failed: ${roleDeleteError.message}`);
    }
  }
  console.log(`[e2e:setup] reaped ${staleRoleIds.length} stale scratch role(s)`);

  console.log(`[e2e:setup] reaped ${reaped} stale scratch rows`);

  console.log(`[e2e:setup] state written; setup complete`);
}
