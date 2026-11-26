import { fetchWithDeadline } from "@/lib/call-deadline";
import { loadOnce } from "@/lib/load-once";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { currentSession, projectEnv } from "@/lib/supabase-door";

/**
 * INC-1291 (cursor bundle 7b) — THE LIGHT READ OF A SESSION'S SECOND-FACTOR STATE. A staff screen's
 * gate and the admin menu's alert need two things: the level the session's token claims (aal1 or
 * aal2) and whether the account holds a verified second factor. Both come without the database
 * client: the level from the token itself (its `aal` claim — what the server's own gate reads, law
 * F3 stays with the server), the factors from one authenticated request to the auth server's own
 * `/auth/v1/user`. The client's code therefore leaves the first download of the admin pages that
 * only needed to ask (`mfa-service.ts` stays the one owner of every WRITE: enrol, challenge, verify,
 * unenrol).
 *
 * Every failure is typed (`ReaderError`, src/lib/reader-failure.ts, loaded only when a read failed):
 * the gate and the menu draw it through the failure notice; a failed read never lets a staff screen
 * open and never reads as "no factor" or "no alert".
 */

/** The claims of an access token that the client mirror reads. */
export type JwtClaims = {
  aal?: string;
  amr?: Array<{ method?: string; timestamp?: number }>;
};

/** The token's payload, or null when it is not a token. Moved here from mfa-service.ts (one decoder). */
export function decodeJwt(token: string): JwtClaims | null {
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const normalised = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json =
      typeof atob === "function"
        ? atob(normalised.padEnd(Math.ceil(normalised.length / 4) * 4, "="))
        : Buffer.from(normalised, "base64").toString("utf8");
    const parsed: unknown = JSON.parse(json);
    return parsed !== null && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

/** The most recent totp verification recorded on this session, in ms, or null. */
export function lastTotpVerificationAt(claims: JwtClaims): number | null {
  const stamps = (claims.amr ?? [])
    .filter((entry) => entry?.method === "totp")
    .map((entry) => Number(entry?.timestamp))
    .filter((value) => Number.isFinite(value));
  if (stamps.length === 0) return null;
  return Math.max(...stamps) * 1000;
}

// The typed failure's module loads when a read failed, never before (INC-864): a first download
// of an admin page does not carry it.
const reader = loadOnce(() => import("@/lib/reader-failure"));

/** The failure as the one reader types it. */
async function typed(error: unknown, status?: number): Promise<unknown> {
  try {
    return (await reader.load()).readFailed(error, status);
  } catch (loadError) {
    // The reader's own download failed: the shell's one notice offers the refresh; the raw error still
    // reads (its status and class), untyped.
    reportOnDemandFailure("reader-failure", loadError);
    return error;
  }
}

export type LevelRead =
  | { ok: true; token: string; current: "aal1" | "aal2" }
  | { ok: false; error: unknown };

/** The session's level, read from its token. A session that could not be read, or none, is a failure. */
export async function readSessionLevel(): Promise<LevelRead> {
  const read = await currentSession();
  if (read.failed) return { ok: false, error: await typed(read.error) };
  const token = read.session?.access_token;
  if (!token) return { ok: false, error: await typed(new Error("notSignedIn"), 401) };
  const claims = decodeJwt(token);
  if (claims === null)
    return { ok: false, error: await typed(new Error("the session's token could not be read")) };
  return { ok: true, token, current: claims.aal === "aal2" ? "aal2" : "aal1" };
}

export type FactorsRead = { ok: true; verified: number } | { ok: false; error: unknown };

/** How many verified second factors the account holds: one request, the token as the bearer. */
export async function readVerifiedFactors(token: string): Promise<FactorsRead> {
  const env = projectEnv();
  if (env === null)
    return { ok: false, error: await typed(new Error("the project's address is not set")) };
  let response: Response;
  try {
    response = await fetchWithDeadline(fetch, `${env.url}/auth/v1/user`, {
      headers: { apikey: env.key, Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    return { ok: false, error: await typed(error) };
  }
  if (!response.ok)
    return {
      ok: false,
      error: await typed(new Error(`auth user ${response.status}`), response.status),
    };
  let body: unknown;
  try {
    body = await response.json();
  } catch (error) {
    return { ok: false, error: await typed(error) };
  }
  const factors: unknown =
    body !== null && typeof body === "object" ? Reflect.get(body, "factors") : null;
  // An account with no factor answers `factors: null` or no key; a list is read for its verified TOTP ones.
  if (factors === null || factors === undefined) return { ok: true, verified: 0 };
  if (!Array.isArray(factors))
    return { ok: false, error: await typed(new Error("the account's factors were not a list")) };
  const verified = factors.filter(
    (factor: unknown) =>
      factor !== null &&
      typeof factor === "object" &&
      Reflect.get(factor, "factor_type") === "totp" &&
      Reflect.get(factor, "status") === "verified",
  ).length;
  return { ok: true, verified };
}
