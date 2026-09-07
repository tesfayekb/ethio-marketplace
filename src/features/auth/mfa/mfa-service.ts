import { supabase } from "@/integrations/supabase/client";
import type { MessageKey } from "@/i18n";

/**
 * U1f-4 (INC-081) — A BEARER CLAIM IS NOT A STEP-UP.
 *
 * The server gate (public.require_step_up_if_needed) now requires BOTH a
 * currently-owned verified TOTP factor AND a totp verification on this session
 * within STEP_UP_WINDOW_MS. This client mirrors that window so the user is
 * asked for a code BEFORE the RPC refuses — never instead of it (law F3).
 */
export const STEP_UP_WINDOW_MS = 10 * 60 * 1000;

/**
 * L5 / DEC-040 — FRESHNESS IS READ FROM THE TOKEN, NEVER FROM A HINT.
 *
 * The old client mirror trusted a localStorage stamp written by this module.
 * A stamp is not evidence: it survived paths the token did not (INC-166), and
 * it could disagree with the server in both directions. The only client-side
 * source of truth now is the access token itself — its `aal` claim and the
 * `amr` entry GoTrue writes when a totp verification happens on this session,
 * which is EXACTLY what the server gate reads
 * (migration 20260817100845_… : `auth.mfa_amr_claims` … `updated_at > now() -
 * interval '10 minutes'`). The window constant above mirrors that interval.
 */
type JwtClaims = {
  aal?: string;
  amr?: Array<{ method?: string; timestamp?: number }>;
};

function decodeJwt(token: string): JwtClaims | null {
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const normalised = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json =
      typeof atob === "function"
        ? atob(normalised.padEnd(Math.ceil(normalised.length / 4) * 4, "="))
        : Buffer.from(normalised, "base64").toString("utf8");
    return JSON.parse(json) as JwtClaims;
  } catch {
    return null;
  }
}

/** The most recent totp verification recorded on this session, in ms, or null. */
function lastTotpVerificationAt(claims: JwtClaims): number | null {
  const stamps = (claims.amr ?? [])
    .filter((entry) => entry?.method === "totp")
    .map((entry) => Number(entry?.timestamp))
    .filter((value) => Number.isFinite(value));
  if (stamps.length === 0) return null;
  return Math.max(...stamps) * 1000;
}

/** DEV/E2E only: a shorter window so expiry is testable without waiting. */
function stepUpWindowMs(): number {
  if (typeof window === "undefined") return STEP_UP_WINDOW_MS;
  const override = (window as unknown as { __ethioStepUp?: { windowMs?: number } }).__ethioStepUp;
  const value = override?.windowMs;
  return typeof value === "number" && value > 0 ? value : STEP_UP_WINDOW_MS;
}

/**
 * U1f — MFA / STEP-UP SEAM (INC-079).
 *
 * Every call here is Supabase GoTrue's own MFA API (`supabase.auth.mfa.*`,
 * auth-js 2.110.x). Nothing in this file decides authorization: the AAL claim
 * it produces is read by the SERVER (public.require_step_up_if_needed) which
 * is the only authority (law F3). The client gate exists so the user is asked
 * for a code BEFORE a mutation fails, not instead of the server refusing it.
 *
 * Law F4 — no phantom success: every outcome is an explicit ok/errorKey.
 */

export type MfaOutcome = { ok: true } | { ok: false; errorKey: MessageKey };

export type MfaFactor = {
  id: string;
  friendlyName: string | null;
  createdAt: string;
};

export type EnrollResult =
  | { ok: true; factorId: string; qrCode: string; secret: string; uri: string }
  | { ok: false; errorKey: MessageKey };

/** The current session's assurance level, as GoTrue reports it. */
export type AalState = { current: string | null; next: string | null };

function invalidCode(message: string | undefined): boolean {
  const text = (message ?? "").toLowerCase();
  return text.includes("invalid") || text.includes("expired") || text.includes("code");
}

function failure(message: string | undefined): { ok: false; errorKey: MessageKey } {
  return {
    ok: false,
    errorKey: invalidCode(message) ? "mfa.errorInvalidCode" : "mfa.errorGeneric",
  };
}

/** PostgREST surfaces the server gate's RAISE as this message (SQLSTATE P0009). */
export function isStepUpRequiredError(error: unknown): boolean {
  const candidate = error as { message?: string; code?: string } | null;
  if (!candidate) return false;
  return candidate.code === "P0009" || (candidate.message ?? "").includes("step-up required");
}

export async function getAal(): Promise<AalState> {
  const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (error || !data) return { current: null, next: null };
  return { current: data.currentLevel, next: data.nextLevel };
}

/** True only when this session has actually completed a second-factor challenge. */
export async function isSteppedUp(): Promise<boolean> {
  return (await getAal()).current === "aal2";
}

/**
 * U1f-4 + L5 (DEC-040): the CLIENT-side mirror of the server's two conditions,
 * derived from the SESSION TOKEN alone.
 *   (1) a verified TOTP factor still exists on the account;
 *   (2) the token claims aal2 AND its newest totp `amr` timestamp is inside
 *       the same 10-minute window the server enforces.
 * Authority still lives in public.require_step_up_if_needed (law F3).
 */
export async function isStepUpFresh(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return false;
  const claims = decodeJwt(token);
  if (!claims || claims.aal !== "aal2") return false;
  const verifiedAt = lastTotpVerificationAt(claims);
  if (verifiedAt === null) return false;
  if (Date.now() - verifiedAt >= stepUpWindowMs()) return false;
  // Condition (1) of the server law: the factor must STILL exist.
  const factors = await listFactors();
  return factors.ok && factors.factors.length > 0;
}

export async function listFactors(): Promise<
  { ok: true; factors: MfaFactor[] } | { ok: false; errorKey: MessageKey }
> {
  const { data, error } = await supabase.auth.mfa.listFactors();
  if (error || !data) return { ok: false, errorKey: "mfa.errorGeneric" };
  return {
    ok: true,
    factors: (data.totp ?? []).map((factor) => ({
      id: factor.id,
      friendlyName: factor.friendly_name ?? null,
      createdAt: factor.created_at,
    })),
  };
}

export async function enrollTotp(friendlyName: string): Promise<EnrollResult> {
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: "totp",
    friendlyName,
  });
  if (error || !data) return failure(error?.message);
  return {
    ok: true,
    factorId: data.id,
    qrCode: data.totp.qr_code,
    secret: data.totp.secret,
    uri: data.totp.uri,
  };
}

/**
 * Challenge + verify in one step. Used for BOTH directions: finishing an
 * enrollment and stepping an existing session up to aal2 — GoTrue treats them
 * identically, and a successful verify raises the session's AAL either way.
 */
export async function verifyFactor(factorId: string, code: string): Promise<MfaOutcome> {
  const challenge = await supabase.auth.mfa.challenge({ factorId });
  if (challenge.error || !challenge.data) return failure(challenge.error?.message);
  const verify = await supabase.auth.mfa.verify({
    factorId,
    challengeId: challenge.data.id,
    code: code.trim(),
  });
  if (verify.error) return failure(verify.error.message);
  // L5: no hint is written — the refreshed token now carries the totp `amr`
  // entry that `isStepUpFresh` reads.
  return { ok: true };
}

/** Step the CURRENT session up using the first verified TOTP factor. */
export async function stepUpWithCode(code: string): Promise<MfaOutcome> {
  const factors = await listFactors();
  if (!factors.ok) return { ok: false, errorKey: factors.errorKey };
  const factor = factors.factors[0];
  if (!factor) return { ok: false, errorKey: "mfa.errorNoFactor" };
  return verifyFactor(factor.id, code);
}

/**
 * Unenroll. MF-5: the caller re-verifies first, so this runs at aal2 only.
 * U1f-4: removing the last factor must not leave a session that still LOOKS
 * stepped up — refresh so GoTrue re-issues the claim. The server refuses on
 * factor absence regardless.
 */
export async function unenrollFactor(factorId: string): Promise<MfaOutcome> {
  const { error } = await supabase.auth.mfa.unenroll({ factorId });
  if (error) return failure(error.message);
  // L5: refresh so the token itself stops claiming aal2 / carrying the amr.
  await supabase.auth.refreshSession();
  return { ok: true };
}
