import { authFetch } from "../global-setup";
import { totp, totpStep } from "./totp";

/**
 * DEC-434 (cursor bundle 5) — A STAFF ACCOUNT'S SECOND FACTOR, ENROLLED IN NODE.
 *
 * The staff gate (src/features/auth/mfa/staff-factor-gate.tsx) opens /admin only for an account with a
 * verified factor, in a session that used it. A test that needs the gate's middle state — a factor, and a
 * session that has not used it — enrols here: password grant → enrol → challenge → verify, nothing in the
 * browser. The account keeps a VERIFIED factor; the session this makes is discarded (the browser signs in
 * on its own, at the first level). The factor is the account's to carry until the lease's reap deletes
 * it (users.ts `reapPoolAccount`).
 *
 * `step` is the RFC 6238 step the verify spent: a factor accepts each code once, so the first code a test
 * types into the gate waits for a later step (`totpStep() > step`).
 */
export async function enrolVerifiedTotp(
  email: string,
  password: string,
): Promise<{ factorId: string; secret: string; step: number }> {
  const grant = await authFetch("/token?grant_type=password", {
    method: "POST",
    body: { email, password },
  });
  const accessToken = grant["access_token"];
  if (typeof accessToken !== "string") {
    throw new Error(`[e2e:staff-factor] the password grant for ${email} returned no access token.`);
  }
  const enrolled = await authFetch("/factors", {
    method: "POST",
    accessToken,
    body: { factor_type: "totp", friendly_name: "staff-gate-check" },
  });
  const factorId = enrolled["id"];
  const secret = (enrolled["totp"] as Record<string, unknown> | undefined)?.["secret"];
  if (typeof factorId !== "string" || typeof secret !== "string" || secret.length < 10) {
    throw new Error("[e2e:staff-factor] the TOTP enrolment returned no factor id or secret.");
  }
  const challenge = await authFetch(`/factors/${factorId}/challenge`, {
    method: "POST",
    accessToken,
  });
  const challengeId = challenge["id"];
  if (typeof challengeId !== "string") {
    throw new Error("[e2e:staff-factor] the TOTP challenge returned no id.");
  }
  const step = totpStep();
  await authFetch(`/factors/${factorId}/verify`, {
    method: "POST",
    accessToken,
    body: { challenge_id: challengeId, code: totp(secret) },
  });
  return { factorId, secret, step };
}
