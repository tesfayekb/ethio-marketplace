import { randomBytes } from "node:crypto";

import { adminClient, processId, testEmail } from "../global-setup";

export { adminClient } from "../global-setup";

export type TestUser = {
  id: string;
  email: string;
  password: string;
  displayName: string;
};

/**
 * Per-process mint counter (INC-080). Combined with the process id in the
 * email, no two parallel test processes can race on the same fixture address.
 */
let minted = 1;

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
  const email = testEmail(processId(), minted);
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
