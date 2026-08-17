import { randomBytes } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { createClient } from "@supabase/supabase-js";

import migrationPreflight from "../scripts/e2e-migration-preflight";

const HERE = dirname(fileURLToPath(import.meta.url));
export const STATE_FILE = join(HERE, ".state", "test-user.json");

const PROD_REF = "zwmvxvzzvjvtdcfcwiuf";
const STAGING_REF = "jatpuhfdjfzctjipklmk";

export type E2EUser = {
  id: string;
  email: string;
  password: string;
  displayName: string;
  /** Persisted so the teardown sweep can scope deletions to this run. */
  runId: string;
};

/** Reserved, non-deliverable namespace — sweepable, never a real address. */
export function testEmail(runId: string, n: number): string {
  return `e2e+${runId}-${n}@ethio-e2e.invalid`;
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

  const runId = process.env["GITHUB_RUN_ID"] ?? randomBytes(4).toString("hex");
  const email = testEmail(runId, 1);
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
    runId,
  };

  mkdirSync(dirname(STATE_FILE), { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(user), "utf8");
  console.log(`[e2e:setup] state written; setup complete`);
}
