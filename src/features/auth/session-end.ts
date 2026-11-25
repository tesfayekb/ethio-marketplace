import {
  CODE_SHAPE,
  endsSession,
  onEndedSignIn,
  reportEndedSignIn,
  reportNoSession,
  sessionEndCode,
  sessionGone,
} from "@/lib/ended-sign-in";

// INC-1274 — the reading and the listener live in src/lib/ended-sign-in.ts (the clients that read an
// ended sign-in report it there, and src/lib imports nothing from src/features); the names the
// shell and the auth actions use stay here.
export { endsSession, sessionEndCode, sessionGone };
export const onUnauthorised = onEndedSignIn;
export const reportUnauthorised = reportEndedSignIn;
/**
 * INC-1274 — tells the shell that the browser's session store holds no session although this tab
 * holds one (another tab's sign-out, a refused renewal, a removal nothing announced): the same cure
 * as a 401, so the session read after it decides.
 */
export const reportSessionMissing = reportNoSession;

/**
 * F1-7d (INC-1218) — THE END OF A SESSION IS ONE STATE. A session ends when this tab signs out,
 * the session policy expires it, an auth event says it is gone (another tab, a refused refresh),
 * or any reader or door answers 401 or `notSignedIn`. Whatever ended it, the shell ends it once
 * (app-shell.tsx): the auth-derived queries are cleared, the polls unmount, and the existing words
 * offer sign-in. The query client never retries an answer that ended the session.
 */
export type SessionEndEvent = "signOut" | "idle" | "absolute" | "signedOut" | "unauthorised";

/**
 * What the shell does with a 401, by the session read after it: a read that failed decides
 * nothing (INC-914, `wait`); no session left is the end (`end`); a session still stored may have
 * raced a fresh sign-in, so its failed reads are read again once (`recover`, `held` names that
 * session by its user and expiry, never its token) and a second 401 for it waits for its own
 * auth event.
 */
export type UnauthorisedVerdict =
  | { kind: "wait" }
  | { kind: "end" }
  | { kind: "recover"; held: string };

export function unauthorisedVerdict(
  read: { failed: boolean; session: { user: { id: string }; expires_at?: number } | null },
  recoveredFor: string | null,
): UnauthorisedVerdict {
  if (read.failed) return { kind: "wait" };
  if (read.session === null) return { kind: "end" };
  const held = `${read.session.user.id}:${read.session.expires_at ?? "none"}`;
  return held === recoveredFor ? { kind: "wait" } : { kind: "recover", held };
}

let ended = false;
let signedInAt: number | null = null;

/** This tab signed in (the client's SIGNED_IN): the seconds the console line counts start here. */
export function noteSignIn(now = Date.now()): void {
  signedInAt = now;
}

/** A session is on screen: its end may be told again. */
export function sessionStarted(): void {
  ended = false;
}

/**
 * The session on screen has ended: true the first time only, when it also writes the one console
 * line `[session] ended: <event> <code or none> <seconds since this tab's last sign-in or none>
 * <visibility>`; false for every later report of the same end.
 */
export function endSession(event: SessionEndEvent, code: string | null, now = Date.now()): boolean {
  if (ended) return false;
  ended = true;
  const since = signedInAt === null ? "none" : String(Math.round((now - signedInAt) / 1000));
  const visibility = typeof document === "undefined" ? "none" : document.visibilityState;
  const named = code !== null && CODE_SHAPE.test(code) ? code : "none";
  console.warn(`[session] ended: ${event} ${named} ${since} ${visibility}`);
  return true;
}
