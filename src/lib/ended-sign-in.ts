import { errorText } from "@/lib/error-text";
import { splitRefusal } from "@/lib/refusal-split";

/**
 * INC-1274 — AN ENDED SIGN-IN IS REPORTED WHERE IT IS FIRST READ. The answers that say the caller's
 * sign-in has ended — the route client's signed-out answer and its 401, the door client's 401 and
 * `notSignedIn`, a reader's or a write's error (the query client) — are reported once, by the
 * client that reads them, to the one listener the shell registers (`onEndedSignIn`; the shell's
 * cure is src/features/auth/session-end.ts `onUnauthorised`, which is this registration). No
 * consumer has to remember: it maps the answer to its signed-out state. This module sits in
 * src/lib so the two clients that read the answers import nothing from src/features; the shell
 * ends the session once however many reports reach it (`endSession`).
 */

/** PostgREST's codes for a token that is no longer valid (expired, or not a session's). */
const STALE_TOKEN_CODES = new Set(["PGRST301", "PGRST303"]);
/**
 * INC-1274 — the sign-in server's own words for a session that is gone (supabase/auth v2.197.0
 * internal/api/apierrors/errorcode.go:20–23): the session is unknown or ended, or its refresh token is
 * unknown or spent. The client library raises `AuthSessionMissingError` (no code) for a call made when
 * the store holds no session (auth-js lib/errors.js:100–102).
 */
const SESSION_GONE_CODES = new Set([
  "session_not_found",
  "session_expired",
  "refresh_token_not_found",
  "refresh_token_already_used",
]);
const SESSION_MISSING_NAME = "AuthSessionMissingError";
/** The console's name for a call made with no session in the store. */
const SESSION_MISSING_CODE = "session_missing";
/** A code is written to the console only in this shape: never a token, an id or a sentence. */
export const CODE_SHAPE = /^[A-Za-z0-9_]{1,32}$/;

function field(value: unknown, name: string): unknown {
  return value !== null && typeof value === "object" ? Reflect.get(value, name) : undefined;
}

/** The HTTP status an error carries: its own, or that of the reader failure it wraps. */
function statusOf(error: unknown): unknown {
  return field(error, "status") ?? field(field(error, "failure"), "status");
}

/**
 * True when an auth call's error says the session it needed is gone (INC-1274): the library's own
 * missing-session error, or a code of the server's that names the session or its refresh token.
 */
export function sessionGone(error: unknown): boolean {
  if (field(error, "name") === SESSION_MISSING_NAME) return true;
  const code = field(error, "code");
  return typeof code === "string" && SESSION_GONE_CODES.has(code);
}

/** True when an error says the caller's session is gone: a 401, a stale token, `notSignedIn`. */
export function endsSession(error: unknown): boolean {
  if (statusOf(error) === 401 || sessionGone(error)) return true;
  const code = field(error, "code") ?? field(field(error, "failure"), "code");
  if (typeof code === "string" && STALE_TOKEN_CODES.has(code)) return true;
  return splitRefusal(errorText(error).trim()).key === "notSignedIn";
}

/** The code the console line names for an error that ended the session, or null. */
export function sessionEndCode(error: unknown): string | null {
  const key = splitRefusal(errorText(error).trim()).key;
  if (key === "notSignedIn") return key;
  if (field(error, "name") === SESSION_MISSING_NAME) return SESSION_MISSING_CODE;
  const code = field(error, "code") ?? field(field(error, "failure"), "code");
  if (typeof code === "string" && CODE_SHAPE.test(code)) return code;
  return statusOf(error) === 401 ? "401" : null;
}

export type EndedSignInListener = (code: string | null) => void;
const listeners = new Set<EndedSignInListener>();

/** The shell's ear for an ended sign-in: called with the code, once per failed read or write. */
export function onEndedSignIn(listener: EndedSignInListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Tells the listener that a read or a write failed because the session is gone. */
export function reportEndedSignIn(error: unknown): void {
  if (!endsSession(error)) return;
  const code = sessionEndCode(error);
  for (const listener of [...listeners]) listener(code);
}

/**
 * Tells the listener that the call never left because the browser holds no session (the route
 * client's signed-out answer): the same cure as a 401, so the session read after it decides.
 */
export function reportNoSession(): void {
  for (const listener of [...listeners]) listener(SESSION_MISSING_CODE);
}
