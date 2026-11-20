import {
  QueryCache,
  QueryClient,
  MutationCache,
  type DefaultError,
  type DefaultedQueryObserverOptions,
  type QueryKey,
  type QueryObserverOptions,
} from "@tanstack/react-query";

import { errorText } from "@/lib/error-text";
import { splitRefusal } from "@/lib/refusal";

/**
 * F1-7d (INC-1218) — THE END OF A SESSION IS ONE STATE. A session ends when this tab signs out,
 * the session policy expires it, an auth event says it is gone (another tab, a refused refresh),
 * or any reader or door answers 401 or `notSignedIn`. Whatever ended it, the shell ends it once
 * (app-shell.tsx): the auth-derived queries are cleared, the polls unmount, and the existing words
 * offer sign-in. The query client never retries an answer that ended the session.
 */
export type SessionEndEvent = "signOut" | "idle" | "absolute" | "signedOut" | "unauthorised";

/** PostgREST's codes for a token that is no longer valid (expired, or not a session's). */
const STALE_TOKEN_CODES = new Set(["PGRST301", "PGRST303"]);
/** A code is written to the console only in this shape: never a token, an id or a sentence. */
const CODE_SHAPE = /^[A-Za-z0-9_]{1,32}$/;

function field(value: unknown, name: string): unknown {
  return value !== null && typeof value === "object" ? Reflect.get(value, name) : undefined;
}

/** The HTTP status an error carries: its own, or that of the reader failure it wraps. */
function statusOf(error: unknown): unknown {
  return field(error, "status") ?? field(field(error, "failure"), "status");
}

/** True when an error says the caller's session is gone: a 401, a stale token, `notSignedIn`. */
export function endsSession(error: unknown): boolean {
  if (statusOf(error) === 401) return true;
  const code = field(error, "code") ?? field(field(error, "failure"), "code");
  if (typeof code === "string" && STALE_TOKEN_CODES.has(code)) return true;
  return splitRefusal(errorText(error).trim()).key === "notSignedIn";
}

/** The code the console line names for an error that ended the session, or null. */
export function sessionEndCode(error: unknown): string | null {
  const key = splitRefusal(errorText(error).trim()).key;
  if (key === "notSignedIn") return key;
  const code = field(error, "code") ?? field(field(error, "failure"), "code");
  if (typeof code === "string" && CODE_SHAPE.test(code)) return code;
  return statusOf(error) === 401 ? "401" : null;
}

type UnauthorisedListener = (code: string | null) => void;
const listeners = new Set<UnauthorisedListener>();

/** The shell's ear for a 401: called with the code, once per failed read or write. */
export function onUnauthorised(listener: UnauthorisedListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Tells the shell that a read or a write failed because the session is gone. */
export function reportUnauthorised(error: unknown): void {
  if (!endsSession(error)) return;
  const code = sessionEndCode(error);
  for (const listener of [...listeners]) listener(code);
}

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

type Retry<TError> = boolean | number | ((failureCount: number, error: TError) => boolean);

/** A query's own retry rule, read as TanStack reads it (3 in a browser, 0 on the server). */
function retries<TError>(retry: Retry<TError> | undefined, count: number, error: TError): boolean {
  if (typeof retry === "function") return retry(count, error);
  if (typeof retry === "number") return count < retry;
  if (typeof retry === "boolean") return retry;
  return count < (typeof window === "undefined" ? 0 : 3);
}

/**
 * The query client: every query keeps its own retry rule except for an answer that ended the
 * session, which is never retried; every failed query or mutation is reported to the shell.
 * The rule wraps each query's options where the client defaults them, so a query that sets its
 * own `retry` inherits it too.
 */
class SessionQueryClient extends QueryClient {
  override defaultQueryOptions<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = never,
  >(
    options:
      | QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey, TPageParam>
      | DefaultedQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
  ): DefaultedQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey> {
    if (options._defaulted === true) return super.defaultQueryOptions(options);
    const defaulted = super.defaultQueryOptions(options);
    const own = defaulted.retry;
    return {
      ...defaulted,
      retry: (count: number, error: TError) => !endsSession(error) && retries(own, count, error),
    };
  }
}

export function sessionQueryClient(): QueryClient {
  return new SessionQueryClient({
    queryCache: new QueryCache({ onError: reportUnauthorised }),
    mutationCache: new MutationCache({ onError: reportUnauthorised }),
  });
}
