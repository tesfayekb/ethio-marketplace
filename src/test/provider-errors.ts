/**
 * INC-1278 (b), DEC-414 ruling 1 decision 13 — THE ONE FIXTURE OF THE PROVIDER'S REAL ERRORS.
 *
 * The auth server's codes and messages this app reads, each with the line of the vendor's source
 * that sends it (supabase/auth v2.197.0, the version cursor-bundle-6's census read; auth-js 2.110.9,
 * the lockfile's). A unit test that mocks a provider's error takes it from here, never an invented
 * sentence (ACS-U2 mocked `message: "refused"`, a message the server never sends, and the walk found
 * what the test could not). A templated message (a `%q` or `%v` in the source) is quoted with an
 * example value in the slot.
 *
 * cursor-bundle-8a ruling 1 — the server errors the failure crawl (e2e/helpers/failure-crawl.ts)
 * forces: one per backend (the data API, storage, the sign-in server, our own routes), each with
 * its source line at the version the pinned CLI starts and its whole answer captured.
 *
 * Read by: src/test/provider-errors.test.ts (every entry carries its code, message and line) and
 * scripts/conformance/provider-errors.test.ts (CF-PROVERR-1: a mocked error object in a unit test
 * carries a message from this fixture, a code a reader knows, or a quoted raised text).
 */

const AUTH = "supabase/auth v2.197.0 ";
const AUTH_JS = "@supabase/auth-js 2.110.9 ";
const POSTGREST_JS = "@supabase/postgrest-js 2.110.9 ";
const POSTGREST = "PostgREST/postgrest v16.4 ";
const STORAGE = "supabase/storage v1.79.36 ";

export type ProviderErrorEntry = {
  /** The provider's `code`, absent for an error the client library raises on its own. */
  code?: string;
  /** The error class's name, for an error the client library raises on its own. */
  name?: string;
  message: string;
  /** The HTTP status the error answers (the class constructor's), where the server sends it. */
  status?: number;
  /** Vendor and file:line of the message in its source. */
  source: string;
  /**
   * The whole answer verbatim, for a server error the failure crawl forces: captured from the
   * throwaway local stack (the images CLI 2.120.0 starts) with its database container stopped.
   */
  body?: string;
};

export const PROVIDER_ERRORS = {
  TypeError: {
    name: "TypeError",
    message: "TypeError: Failed to fetch",
    source: `${POSTGREST_JS}dist/index.mjs:357`,
  },
  email_not_confirmed: {
    code: "email_not_confirmed",
    message: "Email not confirmed",
    status: 400,
    source: `${AUTH}internal/api/token.go:182`,
  },
  invalid_credentials: {
    code: "invalid_credentials",
    message: "Invalid login credentials",
    status: 400,
    source: `${AUTH}internal/api/token.go:111`,
  },
  user_already_exists: {
    code: "user_already_exists",
    message: "User already registered",
    status: 422,
    source: `${AUTH}internal/api/signup.go:294`,
  },
  single_identity_not_deletable: {
    code: "single_identity_not_deletable",
    message: "User must have at least 1 identity after unlinking",
    status: 422,
    source: `${AUTH}internal/api/identity.go:41`,
  },
  weak_password: {
    code: "weak_password",
    message: "Password should be at least 6 characters.",
    status: 422,
    source: `${AUTH}internal/api/password.go:43`,
  },
  email_address_not_authorized: {
    code: "email_address_not_authorized",
    message: 'Email address "person@example.com" cannot be used as it is not authorized',
    status: 400,
    source: `${AUTH}internal/api/mail.go:775`,
  },
  validation_failed: {
    code: "validation_failed",
    message: "Invalid email format",
    status: 422,
    source: `${AUTH}internal/api/verify.go:77`,
  },
  over_request_rate_limit: {
    code: "over_request_rate_limit",
    message: "Request rate limit reached",
    status: 429,
    source: `${AUTH}internal/api/middleware.go:117`,
  },
  over_email_send_rate_limit: {
    code: "over_email_send_rate_limit",
    message: "email rate limit exceeded",
    status: 429,
    source: `${AUTH}internal/api/mail.go:29`,
  },
  current_password_required: {
    code: "current_password_required",
    message: "Current password required when setting new password.",
    status: 400,
    source: `${AUTH}internal/api/user.go:177`,
  },
  current_password_invalid: {
    code: "current_password_invalid",
    message: "Current password required when setting new password.",
    status: 400,
    source: `${AUTH}internal/api/user.go:184`,
  },
  same_password: {
    code: "same_password",
    message: "New password should be different from the old password.",
    status: 422,
    source: `${AUTH}internal/api/user.go:197`,
  },
  reauthentication_needed: {
    code: "reauthentication_needed",
    message: "Password update requires reauthentication",
    status: 400,
    source: `${AUTH}internal/api/user.go:159`,
  },
  mfa_verification_failed: {
    code: "mfa_verification_failed",
    message: "Invalid TOTP code entered",
    status: 422,
    source: `${AUTH}internal/api/mfa.go:656`,
  },
  mfa_challenge_expired: {
    code: "mfa_challenge_expired",
    message:
      "MFA challenge 5ad8e1d2-0000-4000-8000-000000000000 has expired, verify against another challenge or create a new challenge.",
    status: 422,
    source: `${AUTH}internal/api/mfa.go:750`,
  },
  mfa_factor_name_conflict: {
    code: "mfa_factor_name_conflict",
    message: 'A factor with the friendly name "ethio" for this user already exists',
    status: 422,
    source: `${AUTH}internal/api/mfa.go:114`,
  },
  too_many_enrolled_mfa_factors: {
    code: "too_many_enrolled_mfa_factors",
    message: "Maximum number of verified factors reached, unenroll to continue",
    status: 422,
    source: `${AUTH}internal/api/mfa.go:123`,
  },
  mfa_verified_factor_exists: {
    code: "mfa_verified_factor_exists",
    message: "A verified phone factor already exists, unenroll the existing factor to continue",
    status: 422,
    source: `${AUTH}internal/api/mfa.go:158`,
  },
  mfa_totp_enroll_not_enabled: {
    code: "mfa_totp_enroll_not_enabled",
    message: "MFA enroll is disabled for TOTP",
    status: 422,
    source: `${AUTH}internal/api/mfa.go:328`,
  },
  mfa_totp_verify_not_enabled: {
    code: "mfa_totp_verify_not_enabled",
    message: "MFA verification is disabled for TOTP",
    status: 422,
    source: `${AUTH}internal/api/mfa.go:580`,
  },
  mfa_factor_not_found: {
    code: "mfa_factor_not_found",
    message: "MFA factor with the provided challenge ID not found",
    status: 422,
    source: `${AUTH}internal/api/mfa.go:547`,
  },
  insufficient_aal: {
    code: "insufficient_aal",
    message: "AAL2 required to unenroll verified factor",
    status: 422,
    source: `${AUTH}internal/api/mfa.go:1039`,
  },
  session_not_found: {
    code: "session_not_found",
    message: "Invalid Refresh Token: No Valid Session Found",
    status: 400,
    source: `${AUTH}internal/tokens/service.go:234`,
  },
  session_expired: {
    code: "session_expired",
    message: "Session is no longer valid",
    status: 403,
    source: `${AUTH}internal/api/middleware.go:223`,
  },
  refresh_token_not_found: {
    code: "refresh_token_not_found",
    message: "Invalid Refresh Token: Refresh Token Not Found",
    status: 400,
    source: `${AUTH}internal/tokens/service.go:216`,
  },
  AuthSessionMissingError: {
    name: "AuthSessionMissingError",
    message: "Auth session missing!",
    status: 400,
    source: `${AUTH_JS}dist/module/lib/errors.js:102`,
  },
  disposableEmail: {
    message: "disposableEmail: sign-ups from throwaway mail services are not accepted",
    status: 403,
    source: "supabase/migrations/20261015110000_ed5dcaf6-f56d-41f7-94d4-eb1a1bad15d0.sql:9954",
  },
  unexpected_failure: {
    code: "unexpected_failure",
    message: "Unexpected failure, please check server logs for more information",
    status: 500,
    source: `${AUTH}internal/api/errors.go:235`,
    body: '{"code":"unexpected_failure","message":"Unexpected failure, please check server logs for more information"}',
  },
  PGRST000: {
    code: "PGRST000",
    message: "Database connection error.",
    status: 503,
    source: `${POSTGREST}src/library/PostgREST/Error.hs:485`,
    body: '{"code":"PGRST000","details":"could not translate host name \\"supabase_db_ethio-ci-local\\" to address: Name does not resolve\\n","hint":null,"message":"Database connection error."}',
  },
  InternalError: {
    code: "InternalError",
    message: "Internal Server Error",
    status: 500,
    source: `${STORAGE}src/http/error-handler.ts:91`,
    body: '{"statusCode":"500","error":"Internal","message":"Internal Server Error","code":"InternalError"}',
  },
  "upstream unavailable": {
    code: "upstream unavailable",
    message: "upstream unavailable",
    status: 503,
    source: "src/server/supabase/user-client.ts:226",
    body: '{"error":"upstream unavailable"}',
  },
} as const satisfies Record<string, ProviderErrorEntry>;

export type ProviderErrorName = keyof typeof PROVIDER_ERRORS;

/** The error object a mocked auth call answers: the entry's message, code, name and status. */
export function providerError(name: ProviderErrorName): {
  message: string;
  code?: string;
  name?: string;
  status?: number;
} {
  const entry: ProviderErrorEntry = PROVIDER_ERRORS[name];
  return {
    message: entry.message,
    ...(entry.code === undefined ? {} : { code: entry.code }),
    ...(entry.name === undefined ? {} : { name: entry.name }),
    ...(entry.status === undefined ? {} : { status: entry.status }),
  };
}
