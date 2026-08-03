/**
 * P1-f deny tests U-1 / U-2 / U-3 — identity unlink behaviour, executed against a
 * REAL Supabase project (ethio-prod) because a linked Google identity cannot be
 * minted headlessly in CI.
 *
 * OBSERVE AND REPORT ONLY. This script never patches, never fixes, never restores.
 *
 * Secrets: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and SUPABASE_PUBLISHABLE_KEY are
 * read from the environment at runtime. Nothing is hardcoded and no key is printed.
 *
 * Run (historical destructive U-1..U-3 run — already executed 2026-08-03):
 *   bun run scripts/deny-tests/p1f-identity-unlink.ts --force
 *
 * INC-024 recheck (post-fix, throwaway user only, non-destructive to real accounts):
 *   bun run scripts/deny-tests/p1f-identity-unlink.ts --recheck --phase 1
 *   # executor runs the printed SQL (synthetic second identity + email-identity delete)
 *   RECHECK_EMAIL=… RECHECK_PASSWORD=… \
 *     bun run scripts/deny-tests/p1f-identity-unlink.ts --recheck --phase 2
 *
 * Why two phases: the trigger's guard only fires when another identity remains, and a
 * second identity cannot be minted headlessly (OAuth consent). The synthetic identity
 * row and the email-identity DELETE are therefore executed as SQL by the executor
 * between the phases; everything else is API-observable and asserted here.
 *
 * has_password mechanism: the admin API exposes no password field, so aliveness is
 * proven POSITIVELY by `signInWithPassword` succeeding (phase 1) and death is proven
 * by the same call failing (phase 2). The SQL predicate used for read-back is
 * `encrypted_password IS NOT NULL AND encrypted_password <> ''`.
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env["SUPABASE_URL"];
const SERVICE_ROLE_KEY = process.env["SUPABASE_SERVICE_ROLE_KEY"];
const PUBLISHABLE_KEY =
  process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
const OPERATOR_EMAIL = process.env["OPERATOR_EMAIL"] ?? "tesfayekb@gmail.com";

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !PUBLISHABLE_KEY) {
  console.error(
    "FAIL: missing env. Need SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_PUBLISHABLE_KEY.",
  );
  process.exit(1);
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

let failures = 0;

function block(title: string): void {
  console.log(`\n=== ${title} ===`);
}

function check(label: string, ok: boolean, detail: string): void {
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"} — ${label}: ${detail}`);
}

function anonClient() {
  return createClient(SUPABASE_URL!, PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
  });
}

type AdminUser = {
  id: string;
  email?: string | null;
  identities?: Array<{ identity_id?: string; provider: string; last_sign_in_at?: string | null }>;
};

async function findUserByEmail(email: string): Promise<AdminUser | null> {
  for (let page = 1; page <= 20; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error(`listUsers failed: ${error.message}`);
    const hit = data.users.find((u) => (u.email ?? "").toLowerCase() === email.toLowerCase());
    if (hit) {
      // listUsers omits `identities`; getUserById returns them.
      const { data: full, error: getError } = await admin.auth.admin.getUserById(hit.id);
      if (getError || !full.user) throw new Error(`getUserById failed: ${getError?.message}`);
      return full.user as unknown as AdminUser;
    }
    if (data.users.length < 200) return null;
  }
  return null;
}

function providersOf(user: AdminUser): string[] {
  return (user.identities ?? []).map((i) => i.provider).sort();
}

/** DELETE /auth/v1/user/identities/{id} as the USER (admin API has no unlink). */
async function unlinkAsUser(
  accessToken: string,
  identityId: string,
): Promise<{ status: number; body: string }> {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user/identities/${identityId}`, {
    method: "DELETE",
    headers: { apikey: PUBLISHABLE_KEY!, Authorization: `Bearer ${accessToken}` },
  });
  return { status: res.status, body: await res.text() };
}

/** Mint a session for an existing user without knowing their password. */
async function sessionForUser(email: string): Promise<string> {
  const { data, error } = await admin.auth.admin.generateLink({ type: "magiclink", email });
  if (error || !data.properties?.hashed_token) {
    throw new Error(`generateLink failed: ${error?.message ?? "no hashed_token"}`);
  }
  const client = anonClient();
  const { data: verified, error: verifyError } = await client.auth.verifyOtp({
    token_hash: data.properties.hashed_token,
    type: "magiclink",
  });
  if (verifyError || !verified.session) {
    throw new Error(`verifyOtp failed: ${verifyError?.message ?? "no session"}`);
  }
  return verified.session.access_token;
}

/**
 * Password-presence probe. The admin user object exposes NO password field
 * (`encrypted_password` is not returned by GoTrue's admin API), so the only
 * API-level signal available is the sign-in error taxonomy for a DELIBERATELY
 * WRONG password. GoTrue answers `invalid_credentials` both for "wrong password"
 * and for "no password on this user", so this probe is INDETERMINATE by design —
 * it is recorded as evidence, not as proof. The authoritative fact must be read
 * from `auth.users.encrypted_password` via SQL (documented in the report).
 */
async function wrongPasswordProbe(email: string): Promise<{ code?: string; message: string }> {
  const client = anonClient();
  const { error } = await client.auth.signInWithPassword({
    email,
    password: `definitely-not-the-password-${crypto.randomUUID()}`,
  });
  return {
    code: error?.code,
    message: error?.message ?? "NO ERROR — sign-in unexpectedly SUCCEEDED",
  };
}

async function main(): Promise<void> {
  console.log(`Target project host: ${new URL(SUPABASE_URL!).host}`);
  console.log(`Operator account under test: ${OPERATOR_EMAIL}`);

  // ---------------------------------------------------------------- U-2 VERIFY
  block("U-2 VERIFY — operator's UI unlink + OAuth re-link left both identities intact");
  const before = await findUserByEmail(OPERATOR_EMAIL);
  if (!before) {
    console.log(`FAIL — operator user not found for ${OPERATOR_EMAIL}`);
    process.exit(1);
  }
  console.log(`user id: ${before.id}`);
  console.log(`identities: ${JSON.stringify(before.identities ?? [], null, 2)}`);
  const providersBefore = providersOf(before);
  check(
    "both identities present",
    providersBefore.includes("email") && providersBefore.includes("google"),
    `providers = [${providersBefore.join(", ")}]`,
  );
  const probeBefore = await wrongPasswordProbe(OPERATOR_EMAIL);
  console.log(
    `wrong-password probe (pre-unlink): code=${probeBefore.code ?? "none"} message="${probeBefore.message}"`,
  );
  check(
    "wrong-password probe answers invalid-credentials (not user-not-found)",
    probeBefore.code === "invalid_credentials" ||
      /invalid login credentials/i.test(probeBefore.message),
    "mechanism: sign-in error taxonomy; INDETERMINATE for password presence — see script docstring",
  );

  // ----------------------------------------------------------------------- U-1
  block("U-1 — GoTrue refuses to unlink the LAST identity (throwaway single-identity user)");
  const throwawayEmail = `deny-u1-${crypto.randomUUID()}@example.com`;
  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email: throwawayEmail,
    password: `Tmp-${crypto.randomUUID()}`,
    email_confirm: true,
  });
  if (createError || !created.user) {
    console.log(`FAIL — could not create throwaway user: ${createError?.message}`);
    process.exit(1);
  }
  const throwawayId = created.user.id;
  try {
    const throwawayIdentities = (created.user.identities ?? []) as Array<{
      identity_id?: string;
      provider: string;
    }>;
    console.log(`throwaway providers: [${throwawayIdentities.map((i) => i.provider).join(", ")}]`);
    const soleIdentity = throwawayIdentities[0];
    const token = await sessionForUser(throwawayEmail);
    const res = await unlinkAsUser(token, soleIdentity?.identity_id ?? "");
    console.log(`DELETE /auth/v1/user/identities/{id} → status ${res.status}`);
    console.log(`body: ${res.body}`);
    check(
      "server refuses last-identity unlink",
      res.status >= 400 && /identity/i.test(res.body),
      `status ${res.status}`,
    );
  } finally {
    await admin.auth.admin.deleteUser(throwawayId);
    console.log("throwaway user deleted");
  }

  // ----------------------------------------------------------------------- U-3
  block("U-3a — operator identities BEFORE the email unlink");
  console.log(JSON.stringify(before.identities ?? [], null, 2));

  block("U-3b — unlink the EMAIL identity, leaving google");
  const emailIdentity = (before.identities ?? []).find((i) => i.provider === "email");
  if (!emailIdentity?.identity_id) {
    console.log("FAIL — no email identity_id on the operator account");
    process.exit(1);
  }
  const operatorToken = await sessionForUser(OPERATOR_EMAIL);
  const unlinkRes = await unlinkAsUser(operatorToken, emailIdentity.identity_id);
  console.log("API used: DELETE /auth/v1/user/identities/{identity_id} as the user");
  console.log(`status ${unlinkRes.status} body: ${unlinkRes.body || "(empty)"}`);
  check("email identity unlink accepted", unlinkRes.status < 400, `status ${unlinkRes.status}`);

  block("U-3c — wrong-password sign-in AFTER the email identity is gone");
  const probeAfter = await wrongPasswordProbe(OPERATOR_EMAIL);
  console.log(`code=${probeAfter.code ?? "none"} message="${probeAfter.message}"`);
  check(
    "wrong password still rejected (no accidental sign-in)",
    probeAfter.message !== "NO ERROR — sign-in unexpectedly SUCCEEDED",
    probeAfter.message,
  );

  block("U-3d — THE PROBE: is the password alive or dead?");
  console.log("Mechanism available to this script: sign-in error taxonomy only. GoTrue returns");
  console.log(
    "`invalid_credentials` for BOTH 'wrong password' and 'user has no password', so this",
  );
  console.log("probe CANNOT distinguish life from death.");
  console.log("OPERATOR PROBE REQUIRED");
  console.log("Authoritative alternative (executor-side, outside this script): read");
  console.log("`auth.users.encrypted_password IS NOT NULL` for the operator via SQL.");

  block("U-3e — operator identities AFTER");
  const after = await findUserByEmail(OPERATOR_EMAIL);
  console.log(JSON.stringify(after?.identities ?? [], null, 2));
  const providersAfter = after ? providersOf(after) : [];
  check(
    "google remains, email gone",
    providersAfter.includes("google") && !providersAfter.includes("email"),
    `providers = [${providersAfter.join(", ")}]`,
  );
  console.log("password-presence fact: NOT DETERMINABLE from this script — see U-3d.");

  block("U-3f — STATE WARNING");
  console.log("STATE: operator account is now google-only. Re-linking email requires the operator");
  console.log(
    "to set a password via the reset flow or re-link. DO NOT attempt to restore automatically.",
  );

  block("RESULT");
  console.log(failures === 0 ? "ALL CHECKS PASS" : `${failures} CHECK(S) FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

// ---------------------------------------------------------------- INC-024 recheck

async function passwordSignIn(
  email: string,
  password: string,
): Promise<{ ok: boolean; code?: string; message: string }> {
  const { data, error } = await anonClient().auth.signInWithPassword({ email, password });
  return {
    ok: Boolean(data?.session),
    code: error?.code,
    message: error?.message ?? "signed in",
  };
}

async function recheckPhase1(): Promise<void> {
  block("INC-024 RECHECK — phase 1: mint a throwaway email user and prove the password is ALIVE");
  const email = `recheck-inc024-${crypto.randomUUID()}@example.com`;
  const password = `Ghost-${crypto.randomUUID()}`;
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error || !data.user) throw new Error(`createUser failed: ${error?.message}`);
  console.log(`throwaway user id: ${data.user.id}`);
  console.log(`providers: [${(data.user.identities ?? []).map((i) => i.provider).join(", ")}]`);

  const alive = await passwordSignIn(email, password);
  check("password ALIVE before unlink (positive sign-in)", alive.ok, alive.message);

  block("EXECUTOR SQL — run these, then re-run with --phase 2");
  console.log(`-- 1) synthetic second identity so the trigger's remaining-identity guard fires`);
  console.log(
    `insert into auth.identities (id, user_id, provider, provider_id, identity_data, created_at, updated_at)\n` +
      `values (gen_random_uuid(), '${data.user.id}', 'google', 'synthetic-${data.user.id}',\n` +
      `        jsonb_build_object('sub','synthetic-${data.user.id}','email','${email}'), now(), now());`,
  );
  console.log(`-- 2) the unlink under test`);
  console.log(
    `delete from auth.identities where user_id = '${data.user.id}' and provider = 'email';`,
  );
  console.log(`-- 3) read-back predicate`);
  console.log(
    `select (encrypted_password is not null and encrypted_password <> '') as has_password\n` +
      `from auth.users where id = '${data.user.id}';`,
  );
  console.log("");
  console.log(`RECHECK_EMAIL=${email}`);
  console.log(`RECHECK_PASSWORD=${password}`);
  console.log(`RECHECK_USER_ID=${data.user.id}`);

  block("RESULT (phase 1)");
  console.log(failures === 0 ? "ALL CHECKS PASS" : `${failures} CHECK(S) FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

async function recheckPhase2(): Promise<void> {
  const email = process.env["RECHECK_EMAIL"];
  const password = process.env["RECHECK_PASSWORD"];
  if (!email || !password) {
    console.error("FAIL: --phase 2 needs RECHECK_EMAIL and RECHECK_PASSWORD from phase 1.");
    process.exit(1);
  }

  block("INC-024 RECHECK — phase 2: the email identity is gone; the password must be DEAD");
  const user = await findUserByEmail(email);
  if (!user) {
    console.error("FAIL: throwaway user not found.");
    process.exit(1);
  }
  const providers = providersOf(user);
  check("email identity removed, account alive on another door", !providers.includes("email"), `providers = [${providers.join(", ")}]`);

  const dead = await passwordSignIn(email, password);
  check(
    "old password NO LONGER signs in (ghost door closed)",
    !dead.ok,
    `code=${dead.code ?? "none"} message="${dead.message}"`,
  );

  block("CLEANUP — throwaway user deleted");
  await admin.auth.admin.deleteUser(user.id);
  console.log("deleted");

  block("OPERATOR ACCOUNT READ-BACK (executor SQL, predicate documented in the header)");
  console.log(
    `select (encrypted_password is not null and encrypted_password <> '') as has_password\n` +
      `from auth.users where email = '${OPERATOR_EMAIL}';   -- must be FALSE after the 1c correction`,
  );

  block("RESULT (phase 2)");
  console.log(failures === 0 ? "ALL CHECKS PASS" : `${failures} CHECK(S) FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

const argv = process.argv.slice(2);

async function run(): Promise<void> {
  if (argv.includes("--recheck")) {
    const phase = argv[argv.indexOf("--phase") + 1];
    if (phase === "2") return recheckPhase2();
    return recheckPhase1();
  }
  if (!argv.includes("--force")) {
    console.error(
      "REFUSED: the U-1..U-3 run is destructive to a real account and already executed\n" +
        "(2026-08-03, results in docs/features/settings-surface.md). Pass --force to repeat,\n" +
        "or use --recheck for the INC-024 post-fix verification.",
    );
    process.exit(1);
  }
  return main();
}

run().catch((error: unknown) => {
  console.error(
    `FAIL — unhandled error: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exit(1);
});

