/**
 * P1-g census 2/3 probe — does password RECOVERY re-create a missing 'email'
 * identity, or does it land a password with NO email identity (a new ghost
 * class the INC-024 DELETE trigger cannot catch)?
 *
 * TARGET: ethio-staging ONLY. The script refuses to run against ethio-prod.
 * All probe users live in the reserved '@ethio-e2e.invalid' namespace and are
 * deleted in phase 3, which the workflow runs with if: always().
 *
 * OBSERVE AND REPORT ONLY. It never patches, never fixes, never restores.
 *
 * Secrets are read from env at runtime and are NEVER printed:
 *   E2E_SUPABASE_URL, E2E_SUPABASE_SERVICE_ROLE_KEY, E2E_SUPABASE_PUBLISHABLE_KEY
 *
 * Why three phases: the google-only shape cannot be minted through the admin
 * API (GoTrue exposes no way to add a provider identity headlessly, and no way
 * to delete the last-but-one identity of another user). The synthetic google
 * identity row and the email-identity DELETE are therefore applied as SQL by
 * the workflow's psql step between phase 1 and phase 2. Everything else is
 * API-observable and asserted here.
 *
 *   bun run scripts/deny-tests/p1g-recovery-identity.ts --phase 1
 *   psql "$E2E_SUPABASE_DB_URL" -f /tmp/p1g-shape.sql
 *   bun run scripts/deny-tests/p1g-recovery-identity.ts --phase 2
 *   bun run scripts/deny-tests/p1g-recovery-identity.ts --phase 3
 */

import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

import { createClient } from "@supabase/supabase-js";

const PROD_REF = "zwmvxvzzvjvtdcfcwiuf";
const STAGING_REF = "jatpuhfdjfzctjipklmk";
const NAMESPACE = "@ethio-e2e.invalid";
const STATE_FILE = "/tmp/p1g-state.json";
const SQL_FILE = "/tmp/p1g-shape.sql";

const SUPABASE_URL = process.env["E2E_SUPABASE_URL"] ?? "";
const SERVICE_ROLE_KEY = process.env["E2E_SUPABASE_SERVICE_ROLE_KEY"] ?? "";
const PUBLISHABLE_KEY = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"] ?? "";
const BASE_URL = process.env["E2E_BASE_URL"] ?? "http://127.0.0.1:4173";

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !PUBLISHABLE_KEY) {
  console.error(
    "FAIL: missing env. Need E2E_SUPABASE_URL, E2E_SUPABASE_SERVICE_ROLE_KEY, E2E_SUPABASE_PUBLISHABLE_KEY.",
  );
  process.exit(1);
}
if (SUPABASE_URL.includes(PROD_REF) || !SUPABASE_URL.includes(STAGING_REF)) {
  console.error(`FAIL: refusing to run outside ethio-staging (${STAGING_REF}).`);
  process.exit(1);
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function anonClient() {
  return createClient(SUPABASE_URL, PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
  });
}

let failures = 0;

function block(title: string): void {
  console.log(`\n=== ${title} ===`);
}

function check(label: string, ok: boolean, detail: string): void {
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"} — ${label}: ${detail}`);
}

function note(label: string, detail: string): void {
  console.log(`INFO — ${label}: ${detail}`);
}

type State = { id: string; email: string; password: string; newPassword: string };

function readState(): State {
  if (!existsSync(STATE_FILE)) {
    throw new Error(`state file ${STATE_FILE} missing — phase 1 did not complete`);
  }
  return JSON.parse(readFileSync(STATE_FILE, "utf8")) as State;
}

function inNamespace(email: string | null | undefined): boolean {
  return Boolean(email && email.startsWith("e2e+") && email.endsWith(NAMESPACE));
}

async function identityProviders(userId: string): Promise<string[]> {
  const { data, error } = await admin.auth.admin.getUserById(userId);
  if (error || !data?.user) throw new Error(`getUserById failed: ${error?.message ?? "no user"}`);
  return (data.user.identities ?? []).map((i) => i.provider).sort();
}

async function canSignIn(email: string, password: string): Promise<{ ok: boolean; why: string }> {
  const { data, error } = await anonClient().auth.signInWithPassword({ email, password });
  if (error) return { ok: false, why: `${error.code ?? "error"} / ${error.message}` };
  return { ok: Boolean(data.session), why: data.session ? "session issued" : "no session" };
}

/* ------------------------------------------------------------------ phase 1 */

async function phase1(): Promise<void> {
  block("PHASE 1 — mint the google-only-shaped probe user");

  const runId = process.env["GITHUB_RUN_ID"] ?? randomBytes(4).toString("hex");
  const email = `e2e+p1g-${runId}-${Date.now() % 1_000_000}${NAMESPACE}`;
  const password = `Pw-${randomBytes(18).toString("base64url")}`;
  const newPassword = `Pw2-${randomBytes(18).toString("base64url")}`;

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { country_guess: "ET" },
  });
  if (error || !data?.user?.id) {
    throw new Error(`admin.createUser failed: ${error?.message ?? "no user id"}`);
  }
  const id = data.user.id;
  note("probe user", `${id} (${email})`);

  const before = await identityProviders(id);
  check("starts with an email identity", before.includes("email"), `identities = [${before}]`);

  const signIn = await canSignIn(email, password);
  check("password is alive before the shape change", signIn.ok, signIn.why);

  writeFileSync(STATE_FILE, JSON.stringify({ id, email, password, newPassword }), "utf8");

  // The synthetic google identity mirrors what a real OAuth link produces closely
  // enough for the INC-024 trigger's guard (it only asks whether ANY other
  // identity row survives the email-identity DELETE).
  const sql = `-- P1-g probe shape change for ${id} (staging, throwaway user)
insert into auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
values ('p1g-synthetic-${id}', '${id}'::uuid,
        jsonb_build_object('sub', 'p1g-synthetic-${id}', 'email', '${email}'),
        'google', now(), now(), now());

delete from auth.identities where user_id = '${id}'::uuid and provider = 'email';

select provider from auth.identities where user_id = '${id}'::uuid order by provider;
select (encrypted_password is not null and encrypted_password <> '') as has_password
  from auth.users where id = '${id}'::uuid;
`;
  writeFileSync(SQL_FILE, sql, "utf8");
  note("shape SQL written", SQL_FILE);
}

/* ------------------------------------------------------------------ phase 2 */

async function phase2(): Promise<void> {
  const state = readState();
  block("PHASE 2a — confirm the google-only shape (INC-024 trigger effect)");

  const shaped = await identityProviders(state.id);
  check(
    "email identity is gone, google remains",
    shaped.includes("google") && !shaped.includes("email"),
    `identities = [${shaped}]`,
  );
  const deadCheck = await canSignIn(state.email, state.password);
  check(
    "old password is dead (INC-024 trigger nulled it)",
    !deadCheck.ok,
    deadCheck.ok ? "sign-in still succeeded" : deadCheck.why,
  );

  block("PHASE 2b — CENSUS 2: does recovery email SEND for a passwordless, email-identity-less user?");
  const { error: resetError } = await anonClient().auth.resetPasswordForEmail(state.email, {
    redirectTo: `${BASE_URL}/auth/reset`,
  });
  check(
    "resetPasswordForEmail returned without error",
    !resetError,
    resetError ? `${resetError.code ?? "error"} / ${resetError.message}` : "no error (send accepted)",
  );

  block("PHASE 2c — CENSUS 3: complete recovery and set a password");
  const { data: link, error: linkError } = await admin.auth.admin.generateLink({
    type: "recovery",
    email: state.email,
    options: { redirectTo: `${BASE_URL}/auth/reset` },
  });
  const tokenHash = link?.properties?.hashed_token;
  check(
    "admin minted a type=recovery link",
    Boolean(tokenHash),
    linkError ? `${linkError.code ?? "error"} / ${linkError.message}` : "hashed_token present",
  );
  if (!tokenHash) {
    console.log("\nVERDICT: INCONCLUSIVE — no recovery link could be minted for this shape.");
    failures += 1;
    return;
  }

  const recoveryClient = anonClient();
  const { data: verified, error: verifyError } = await recoveryClient.auth.verifyOtp({
    token_hash: tokenHash,
    type: "recovery",
  });
  check(
    "recovery token exchanged for a session",
    Boolean(verified?.session) && !verifyError,
    verifyError ? `${verifyError.code ?? "error"} / ${verifyError.message}` : "session issued",
  );
  if (!verified?.session) {
    console.log("\nVERDICT: INCONCLUSIVE — recovery session could not be established.");
    failures += 1;
    return;
  }

  const { error: updateError } = await recoveryClient.auth.updateUser({
    password: state.newPassword,
  });
  check(
    "updateUser({ password }) on the recovery session succeeded",
    !updateError,
    updateError ? `${updateError.code ?? "error"} / ${updateError.message}` : "password set",
  );

  block("PHASE 2d — THE VERDICT READ-BACK");
  const after = await identityProviders(state.id);
  const emailIdentityExists = after.includes("email");
  const passwordAlive = await canSignIn(state.email, state.newPassword);

  note("identities after recovery", `[${after}]`);
  note(
    "sign-in with the new password",
    passwordAlive.ok ? "SUCCEEDS (password alive)" : `FAILS (${passwordAlive.why})`,
  );

  if (emailIdentityExists) {
    console.log(
      "\nVERDICT: EMAIL IDENTITY RE-CREATED — recovery restores the email identity row alongside the password. INC-024's model holds; the DELETE trigger remains sufficient. → Steps A–G may be built in full.",
    );
  } else if (passwordAlive.ok) {
    console.log(
      "\nVERDICT: NEW GHOST CLASS — a working password exists with NO 'email' identity row. The INC-024 DELETE trigger cannot catch this path (nothing is deleted). → STOP before Step E; supervisor ruling required.",
    );
    failures += 1;
  } else {
    console.log(
      "\nVERDICT: NO PASSWORD LANDED — recovery neither re-created the identity nor produced a usable password. Recovery is a dead end for this shape. → Supervisor ruling required before Step E.",
    );
    failures += 1;
  }
}

/* ------------------------------------------------------------------ phase 3 */

async function phase3(): Promise<void> {
  block("PHASE 3 — teardown");
  if (!existsSync(STATE_FILE)) {
    note("teardown", "no state file; nothing to delete");
    return;
  }
  const state = readState();
  if (!inNamespace(state.email)) {
    throw new Error(`refusing to delete out-of-namespace user ${state.id}`);
  }
  const { error } = await admin.auth.admin.deleteUser(state.id);
  check("probe user deleted", !error, error ? error.message : `${state.id} removed`);
}

/* -------------------------------------------------------------------- main */

const phaseArg = process.argv[process.argv.indexOf("--phase") + 1];

async function main(): Promise<void> {
  if (phaseArg === "1") await phase1();
  else if (phaseArg === "2") await phase2();
  else if (phaseArg === "3") await phase3();
  else {
    console.error("FAIL: pass --phase 1 | 2 | 3");
    process.exit(1);
  }
  console.log(`\n--- phase ${phaseArg} finished with ${failures} failure(s) ---`);
  process.exit(failures > 0 ? 1 : 0);
}

main().catch((error: unknown) => {
  console.error(`FAIL: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
