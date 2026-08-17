import { randomBytes } from "node:crypto";

import { adminClient, processId } from "../global-setup";

export { adminClient } from "../global-setup";

export type TestUser = {
  id: string;
  email: string;
  password: string;
  displayName: string;
};

/**
 * Per-worker mint counter (INC-080 addendum). ONE job may run N workers
 * (Playwright projects x parallelism) that all share PROCESS_ID and each
 * restart this counter at 1 — ids must be unique per WORKER, not per job.
 * Uniqueness therefore comes from the worker tag + a random suffix; the
 * counter is only a readability aid.
 */
let minted = 1;

function workerTag(): string {
  return process.env["TEST_WORKER_INDEX"] ?? String(process.pid);
}

/**
 * Fixture identity is unique by construction: PROCESS_ID (ownership) + worker
 * tag + counter + 6 random base36 chars. Teardown still filters on
 * `+${PROCESS_ID}-`, which this shape preserves.
 */
export function mintEmail(n: number): string {
  const rand6 = randomBytes(8)
    .toString("base64url")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase()
    .slice(0, 6);
  return `e2e+${processId()}-${workerTag()}-${n}-${rand6}@ethio-e2e.invalid`;
}

function baseUrl(): string {
  return process.env["E2E_BASE_URL"] ?? "http://127.0.0.1:4173";
}

/**
 * Mints a user in the reserved '@ethio-e2e.invalid' namespace so the
 * teardown sweep can always reap it. Fails loudly — never returns a
 * half-made user.
 */
export async function createUser({ confirmed }: { confirmed: boolean }): Promise<TestUser> {
  const supabase = adminClient();
  minted += 1;
  const email = mintEmail(minted);
  const password = `Pw-${randomBytes(18).toString("base64url")}`;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: confirmed,
    user_metadata: { country_guess: "ET" },
  });
  if (error || !data?.user?.id) {
    throw new Error(
      `[e2e:users] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}`,
    );
  }

  // handle_new_user() derives display_name from the local part of the email.
  return { id: data.user.id, email, password, displayName: email.split("@")[0]! };
}

/**
 * Mints a real signup confirmation link without sending mail. Depends on the
 * staging project allow-listing <baseURL>/auth/callback as a redirect URL.
 */
export async function mintConfirmationLink(user: {
  email: string;
  password: string;
}): Promise<string> {
  const supabase = adminClient();
  const { data, error } = await supabase.auth.admin.generateLink({
    type: "signup",
    email: user.email,
    password: user.password,
    options: { redirectTo: `${baseUrl()}/auth/callback` },
  });
  const link = data?.properties?.action_link;
  if (error || !link) {
    throw new Error(
      `[e2e:users] generateLink failed for ${user.email}: ${error?.message ?? "no action_link returned"}`,
    );
  }
  return link;
}

/**
 * Mints a real password-recovery link without sending mail (P1-g). Depends on
 * the staging project allow-listing <baseURL>/auth/reset as a redirect URL.
 */
export async function mintRecoveryLink(email: string): Promise<string> {
  const supabase = adminClient();
  const { data, error } = await supabase.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo: `${baseUrl()}/auth/reset` },
  });
  const link = data?.properties?.action_link;
  if (error || !link) {
    throw new Error(
      `[e2e:users] recovery generateLink failed for ${email}: ${error?.message ?? "no action_link returned"}`,
    );
  }
  return link;
}

/** Providers currently linked to a user, straight from the admin API. */
export async function identityProviders(userId: string): Promise<string[]> {
  const supabase = adminClient();
  const { data, error } = await supabase.auth.admin.getUserById(userId);
  if (error || !data?.user) {
    throw new Error(`[e2e:users] getUserById failed: ${error?.message ?? "no user"}`);
  }
  return (data.user.identities ?? []).map((identity) => identity.provider).sort();
}
