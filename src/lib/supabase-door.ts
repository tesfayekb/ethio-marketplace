import type { AuthChangeEvent, Session, SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { errorText } from "@/lib/error-text";
import { loadOnce } from "@/lib/load-once";

/**
 * DEC-261 (Foundations turn 34; D234 speed S11) — THE ONE DOOR TO THE SUPABASE
 * CLIENT. The sign-in and database client (`@supabase/supabase-js`, about 52 KiB
 * gzip) is never part of a public page's first download: a module a public page
 * draws reaches it only through this door.
 *
 * - `getSupabase()` fetches the client module once (loadOnce) and answers it.
 * - `hasStoredSession()` says, without the client, whether this browser holds a
 *   session: the client's own storage key (`sb-<project ref>-auth-token`, as
 *   supabase-js derives it from the URL) in localStorage, or a framed page (a
 *   Lovable preview keeps its session in the editor's broker,
 *   previewAuthStorage.ts, which cannot be read synchronously; any frame counts,
 *   so the platform's file stays off the first download). A browser that
 *   holds one starts the client at once, when this module is evaluated, so a
 *   signed-in visitor's auth flow starts as it did when the client rode the
 *   entry.
 * - `onAuthChange()` is the client's `onAuthStateChange` contract. With no stored
 *   session and no client yet, the listener hears `INITIAL_SESSION` with `null`
 *   on the next macrotask (law I5: no call inside the callback), and it is
 *   attached to the client the moment the client arrives (a sign-in screen, a
 *   sign-in in another tab), which then reports the session as it always has —
 *   so a signed-out listener can hear `INITIAL_SESSION` twice (null, then the
 *   client's own); the three listeners (use-auth, the i18n provider, the sign-in
 *   screen) apply the session they are given and are idempotent.
 * - `currentSession()` is `null` without the client when nothing is stored, and
 *   the client's `getSession()` (refresh included) otherwise.
 * - `rpc()` calls a database function. With no stored session and no client it is
 *   the anonymous PostgREST call with the client's own auth headers for a signed-out
 *   visitor — POST /rest/v1/rpc/<name>, the publishable key as `apikey`, the
 *   bearer only for an old-style anon JWT key; not postgrest-js's X-Client-Info,
 *   an analytics header — answered in supabase-js's
 *   `{ data, error }` shape; otherwise it is the client's own `rpc`. A function
 *   therefore sees exactly the caller it saw before.
 */
type Client = SupabaseClient<Database>;
type Functions = Database["public"]["Functions"];
type FunctionName = keyof Functions & string;

/** supabase-js's error shape for a database call. */
export interface RpcError {
  message: string;
  code: string;
  details: string;
  hint: string;
}

/** supabase-js's answer shape for a database call. */
export interface RpcAnswer<T> {
  data: T | null;
  error: RpcError | null;
}

export type AuthListener = (event: AuthChangeEvent, session: Session | null) => void;

export interface AuthSubscription {
  unsubscribe(): void;
}

/** Listeners waiting for the client: each attaches itself when it arrives. */
const waiting = new Set<(client: Client) => void>();

const door = loadOnce(async (): Promise<Client> => {
  const module = await import("@/integrations/supabase/client");
  const client: Client = module.supabase;
  for (const attach of [...waiting]) attach(client);
  waiting.clear();
  return client;
});

/** The client, fetched once; every caller that needs it awaits this. */
export function getSupabase(): Promise<Client> {
  return door.load();
}

/**
 * The project's public address and publishable key, read as the client module reads them (dev
 * serves VITE_*; the deployed Worker serves the unprefixed pair). Turn 34c-2: the one place browser
 * and route code reads them (CF-PROJECT-1) — a second reading drifts (a trailing slash, a server
 * pair one reader forgot, a local address one regex could not read).
 */
export function projectEnv(): { url: string; key: string } | null {
  const url = import.meta.env.VITE_SUPABASE_URL || process.env["SUPABASE_URL"];
  const key =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (typeof url !== "string" || url === "" || typeof key !== "string" || key === "") return null;
  return { url: url.replace(/\/$/, ""), key };
}

/** supabase-js's default storage key: `sb-<the URL's first host label>-auth-token`. */
export function authStorageKey(url: string): string | null {
  try {
    return `sb-${new URL(url).hostname.split(".")[0]}-auth-token`;
  } catch {
    return null;
  }
}

/** The storage key this project's client keeps its session under, or null without a URL. */
export function storedSessionKey(): string | null {
  const env = projectEnv();
  return env === null ? null : authStorageKey(env.url);
}

/**
 * A name beside the stored session, `sb-<project ref>-<name>` — what the app keeps with the
 * session (its clocks) carries the prefix the client's own key carries, so a browser that holds
 * two projects' sessions keeps two sets apart. Null without a URL (turn 34c-2).
 */
export function besideStoredSession(name: string): string | null {
  const key = storedSessionKey();
  return key === null ? null : `${key.slice(0, -"auth-token".length)}${name}`;
}

/**
 * auth-js's own test of an auth call that never reached the server — offline, a timeout:
 * `AuthRetryableFetchError` (auth-js isAuthRetryableFetchError), read by its name so the client's
 * code stays off the first download. Such a call proves nothing about the session (INC-914, INC-931).
 */
export function neverReachedTheServer(error: { name?: unknown } | null): boolean {
  return error !== null && error.name === "AuthRetryableFetchError";
}

/** A framed page: a superset of the preview broker's rule (previewAuthStorage.ts). */
function framed(): boolean {
  try {
    // lib.dom types window.parent as always set; a detached frame has none.
    const parent: Window | null = window.parent;
    return parent !== null && parent !== window;
  } catch {
    return true;
  }
}

/** True when this browser holds a session (or may: a framed page, blocked storage). */
export function hasStoredSession(): boolean {
  if (typeof window === "undefined") return false;
  if (framed()) return true;
  const key = storedSessionKey();
  if (key === null) return false;
  try {
    return window.localStorage.getItem(key) !== null;
  } catch {
    return true;
  }
}

/**
 * Foundations turn 34b-1 (DEC-268) — A SIGN-OUT ENDS THE SESSION ON THIS DEVICE, whatever
 * the server answered. Removes this project's stored session, and the two items the client keeps
 * beside it, from the browser's storage, where the client reads its session on every call
 * (supabase-js keeps none in memory with persistSession). For the sign-out that could not finish
 * (src/features/auth/auth-service.ts signOut): the client then holds no session, and a page load
 * reads none. A framed page (the editor's preview) keeps its session in the editor's broker,
 * which this does not reach; a visitor's page is never framed. Answers whether it removed it.
 */
export function forgetStoredSession(): boolean {
  if (typeof window === "undefined" || framed()) return false;
  const key = storedSessionKey();
  if (key === null) return false;
  try {
    for (const item of [key, `${key}-code-verifier`, `${key}-user`])
      window.localStorage.removeItem(item);
    return true;
  } catch {
    return false;
  }
}

/** The client's onAuthStateChange, without fetching the client for a signed-out visitor. */
export function onAuthChange(listener: AuthListener): AuthSubscription {
  let cancelled = false;
  let inner: { unsubscribe(): void } | null = null;
  const attach = (client: Client) => {
    if (cancelled || inner !== null) return;
    inner = client.auth.onAuthStateChange(listener).data.subscription;
  };
  const ready = door.ready();
  if (ready !== null) attach(ready);
  else {
    waiting.add(attach);
    if (hasStoredSession()) void getSupabase().catch(logLoadFailure);
    else
      setTimeout(() => {
        if (!cancelled && inner === null) listener("INITIAL_SESSION", null);
      }, 0);
  }
  return {
    unsubscribe() {
      cancelled = true;
      waiting.delete(attach);
      inner?.unsubscribe();
    },
  };
}

/** The answer of a session read: `failed` carries why (INC-914 — a failed read is unknown, never signed out). */
export type SessionRead =
  | { session: Session | null; failed: false }
  | { session: Session | null; failed: true; error: unknown };

/**
 * The current session: null without the client when nothing is stored. Never a
 * rejection: a client that did not load answers `failed` with its error (logged), as a
 * failed getSession() does. Every reader reads `failed` (CF-SESSION-1): a failed read
 * is UNKNOWN — never a signed-out visitor (INC-914).
 */
export async function currentSession(): Promise<SessionRead> {
  if (door.ready() === null && !hasStoredSession()) return { session: null, failed: false };
  let client: Client;
  try {
    client = await getSupabase();
  } catch (error) {
    logLoadFailure(error);
    return { session: null, failed: true, error };
  }
  try {
    const { data, error } = await client.auth.getSession();
    if (error === null) return { session: data.session, failed: false };
    // getSession()'s one error is a failed refresh of an expired session. A refresh the server
    // refused (a revoked or expired refresh token) has removed the session and announced
    // SIGNED_OUT: a signed-out visitor, known. One that never reached the server (auth-js's
    // AuthRetryableFetchError — offline, a timeout) leaves the session stored and unread: unknown
    // until the next refresh (INC-914).
    if (!neverReachedTheServer(error)) return { session: null, failed: false };
    console.warn(`[supabase-door] the session could not be refreshed: ${errorText(error)}`);
    return { session: data.session, failed: true, error };
  } catch (error) {
    // INC-915 — the client loaded; its own session read threw.
    console.warn(`[supabase-door] the session read failed: ${errorText(error)}`);
    return { session: null, failed: true, error };
  }
}

/** The headers the client's own fetch sends for an anonymous call (client.ts createSupabaseFetch). */
export function anonymousHeaders(key: string): Headers {
  const headers = new Headers({
    apikey: key,
    "Content-Type": "application/json",
    "Content-Profile": "public",
  });
  if (!(key.startsWith("sb_publishable_") || key.startsWith("sb_secret_")))
    headers.set("Authorization", `Bearer ${key}`);
  return headers;
}

function rpcError(body: unknown, fallback: string): RpcError {
  const field = (name: string): string => {
    if (body === null || typeof body !== "object" || !(name in body)) return "";
    const value: unknown = Reflect.get(body, name);
    return typeof value === "string" ? value : "";
  };
  return {
    message: field("message") || fallback,
    code: field("code"),
    details: field("details"),
    hint: field("hint"),
  };
}

async function anonymousRpc<T>(name: string, args: object): Promise<RpcAnswer<T>> {
  const env = projectEnv();
  if (env === null)
    return { data: null, error: rpcError(null, "Missing Supabase environment variable(s)") };
  let response: Response;
  try {
    response = await fetch(`${env.url}/rest/v1/rpc/${name}`, {
      method: "POST",
      headers: anonymousHeaders(env.key),
      body: JSON.stringify(args),
    });
  } catch (error) {
    // postgrest-js's own wording for a failed fetch: "<name>: <message>".
    const name: unknown =
      error !== null && typeof error === "object" ? Reflect.get(error, "name") : undefined;
    const kind = typeof name === "string" && name !== "" ? name : "FetchError";
    return { data: null, error: rpcError(null, `${kind}: ${errorText(error)}`) };
  }
  const text = await response.text();
  if (response.ok) {
    if (text === "") return { data: null, error: null };
    try {
      const data: T = JSON.parse(text);
      return { data, error: null };
    } catch {
      return { data: null, error: rpcError(null, text) };
    }
  }
  try {
    const body: unknown = JSON.parse(text);
    return { data: null, error: rpcError(body, text) };
  } catch {
    return { data: null, error: rpcError(null, text) };
  }
}

/** A database function, called as the caller the client would have been. */
export async function rpc<F extends FunctionName>(
  name: F,
  args?: Functions[F]["Args"],
): Promise<RpcAnswer<Functions[F]["Returns"]>> {
  const ready = door.ready();
  if (ready === null && !hasStoredSession())
    return anonymousRpc<Functions[F]["Returns"]>(name, args ?? {});
  let client: Client;
  try {
    client = ready ?? (await getSupabase());
  } catch (error) {
    // INC-915 — never a rejection where the client's own call would have answered.
    logLoadFailure(error);
    return { data: null, error: rpcError(null, `the client did not load: ${errorText(error)}`) };
  }
  const { data, error } = await client.rpc(name, args);
  return { data, error: error === null ? null : rpcError(error, error.message) };
}

function logLoadFailure(error: unknown): void {
  console.warn(`[supabase-door] the client did not load: ${errorText(error)}`);
}

// A browser that holds a session starts the client now, beside the page's own code.
if (typeof window !== "undefined") {
  if (hasStoredSession()) void getSupabase().catch(logLoadFailure);
  // A sign-in in another tab writes the key: the client arrives and reports it.
  window.addEventListener("storage", (event) => {
    if (door.ready() !== null || event.newValue === null) return;
    if (event.key === storedSessionKey()) void getSupabase().catch(logLoadFailure);
  });
}
