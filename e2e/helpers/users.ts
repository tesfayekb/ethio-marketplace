import { randomBytes } from "node:crypto";

import { appendFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

import { test } from "@playwright/test";

import { adminClient, authFetch, processId, STATE_FILE } from "../global-setup";

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

  recordAccount("fresh", data.user.id);
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

/* ------------------------------------------------------------------------- */
/* DEC-097 — THE E2E ACCOUNT POOL (staging only).                             */
/* ------------------------------------------------------------------------- */

/** Accounts per worker slot a single test may lease at once (actor + helpers). */
export const POOL_SEATS_PER_SLOT = 10;

/**
 * Lanes never share accounts: one per CI shard, one for the nightly, one for
 * local runs. `E2E_POOL_LANE` overrides (the nightly config sets it).
 */
export function poolLane(): string {
  const explicit = process.env["E2E_POOL_LANE"];
  if (explicit) return explicit.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (process.env["CI"])
    return `s${(process.env["E2E_SHARD"] ?? "solo").replace(/[^a-z0-9]/gi, "")}`;
  return "local";
}

export function poolEmail(lane: string, seat: number): string {
  return `e2e-pool-${lane}-${String(seat).padStart(3, "0")}@ethio-e2e.invalid`;
}

/** Ledger read by teardown for the "accounts signed in this run" line. */
export function accountLedgerFile(): string {
  return join(dirname(STATE_FILE), "accounts.log");
}

export function recordAccount(kind: "pool" | "fresh", id: string): void {
  try {
    mkdirSync(dirname(STATE_FILE), { recursive: true });
    appendFileSync(accountLedgerFile(), `${kind} ${id}\n`, "utf8");
  } catch (error) {
    console.warn(
      `[e2e:pool] WARNING could not record ${kind} account ${id}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

let seatTestId = "";
let seatCursor = 0;

function nextSeat(): number {
  let parallelIndex = 0;
  let testId = "outside-test";
  try {
    const info = test.info();
    parallelIndex = info.parallelIndex;
    testId = info.testId;
  } catch {
    // A helper outside a running test leases seat 0 of slot 0.
  }
  if (testId !== seatTestId) {
    seatTestId = testId;
    seatCursor = 0;
  }
  if (seatCursor >= POOL_SEATS_PER_SLOT) {
    throw new Error(`[e2e:pool] a test leased more than ${POOL_SEATS_PER_SLOT} accounts.`);
  }
  const seat = parallelIndex * POOL_SEATS_PER_SLOT + seatCursor;
  seatCursor += 1;
  return seat;
}

const seatIds = new Map<string, string>();

async function ensurePoolAccount(email: string, password: string): Promise<string> {
  const supabase = adminClient();
  const known = seatIds.get(email);
  if (known) return known;

  // Recovery links resolve an existing user without creating one or sending mail.
  const found = await supabase.auth.admin.generateLink({ type: "recovery", email });
  if (!found.error && found.data?.user?.id) {
    seatIds.set(email, found.data.user.id);
    return found.data.user.id;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { country_guess: "ET" },
  });
  if (error || !data?.user?.id) {
    throw new Error(
      `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
        (found.error ? ` (lookup: ${found.error.message})` : ""),
    );
  }
  seatIds.set(email, data.user.id);
  return data.user.id;
}

/**
 * Returns a pooled account to the state handle_new_user() leaves a fresh one
 * in: no listings, no extra roles, no factors, no sessions, default profile.
 * Fails loudly — a half-reset account would leak state into the next test.
 */
async function reapPoolAccount(id: string, email: string, password: string): Promise<void> {
  const supabase = adminClient();
  const fail = (step: string, message: string) => {
    throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
  };

  const listings = await supabase.from("listings").delete().eq("seller_id", id);
  if (listings.error) fail("listings", listings.error.message);
  const limits = await supabase.from("rate_limits").delete().eq("key", id);
  if (limits.error) fail("rate limits", limits.error.message);

  const base = await supabase.from("roles").select("id").eq("name", "user").single();
  if (base.error || !base.data) fail("base role", base.error?.message ?? "no row");
  const roles = await supabase
    .from("user_roles")
    .delete()
    .eq("user_id", id)
    .neq("role_id", base.data!.id);
  if (roles.error) fail("roles", roles.error.message);
  const held = await supabase
    .from("user_roles")
    .select("id")
    .eq("user_id", id)
    .eq("role_id", base.data!.id);
  if (held.error) fail("base role read", held.error.message);
  if ((held.data ?? []).length === 0) {
    const grant = await supabase
      .from("user_roles")
      .insert({ user_id: id, role_id: base.data!.id, scope_type: "global" });
    if (grant.error) fail("base role grant", grant.error.message);
  }

  const localPart = email.split("@")[0]!;
  const profile = await supabase
    .from("profiles")
    .update({
      home_country_code: "ET",
      country_source: "ip_guess",
      display_name: localPart,
      avatar_url: null,
      preferred_language: null,
      viewing_location: null,
      notification_prefs: {},
      contact_prefs: {},
      seller_alias: null,
      contact_phone: null,
      show_phone: false,
      contact_telegram: null,
      show_telegram: false,
      contact_whatsapp: false,
      default_post_location_id: null,
      account_status: "active",
      status_changed_at: null,
      status_reason: null,
      seller_type: "person",
      business_name: null,
      first_name: null,
      last_name: null,
    })
    .eq("user_id", id);
  if (profile.error) fail("profile", profile.error.message);
  const directory = await supabase
    .from("user_directory")
    .update({
      home_country_code: "ET",
      country_source: "ip_guess",
      handle: null,
      account_status: "active",
      observed_country_code: null,
      observed_at: null,
      standing: {},
    })
    .eq("user_id", id);
  if (directory.error) fail("directory", directory.error.message);

  const factors = await supabase.auth.admin.mfa.listFactors({ userId: id });
  if (factors.error) fail("factors", factors.error.message);
  for (const factor of factors.data?.factors ?? []) {
    const removed = await supabase.auth.admin.mfa.deleteFactor({ id: factor.id, userId: id });
    if (removed.error) fail("factor delete", removed.error.message);
  }

  const updated = await supabase.auth.admin.updateUserById(id, {
    password,
    email_confirm: true,
    ban_duration: "none",
    user_metadata: { country_guess: "ET" },
    app_metadata: {},
  });
  if (updated.error) fail("password", updated.error.message);

  // Revoke every session the previous holder left behind.
  const grantAnswer = await authFetch("/token?grant_type=password", {
    method: "POST",
    body: { email, password },
  });
  const token = grantAnswer["access_token"];
  if (typeof token !== "string") fail("session", "password grant returned no access token");
  await authFetch("/logout?scope=global", { method: "POST", accessToken: token as string });
}

/**
 * Leases a confirmed, signed-out, clean account for this worker slot. Use it
 * wherever a test only needs "a signed-in user"; tests that need a brand-new
 * identity keep `createUser`. Roles a test grants are removed at the next lease.
 */
export async function leaseUser(): Promise<TestUser> {
  const email = poolEmail(poolLane(), nextSeat());
  const password = `Pw-${randomBytes(18).toString("base64url")}`;
  const id = await ensurePoolAccount(email, password);
  await reapPoolAccount(id, email, password);
  recordAccount("pool", id);
  return { id, email, password, displayName: email.split("@")[0]! };
}
