/**
 * DEC-029 — SESSION INJECTION (lever 1).
 *
 * Signing a persona in through the real UI costs a page load, a hydration
 * wait, two hydration-stable fills, a network round trip and a redirect —
 * multiplied by every admin spec that needs a signed-in browser. For specs
 * whose SUBJECT IS NOT AUTH the same state is obtainable at node speed: ask
 * GoTrue for a session with a password grant, then hand the browser the exact
 * bytes @supabase/supabase-js would have persisted itself.
 *
 * LAW (non-negotiable): e2e/auth-*.spec.ts — sign-in, sign-up, sign-out,
 * callback, reset, google, step-up enrolment — keep the REAL UI flows. They
 * are the tests OF the door; a door proved by injection is not proved at all.
 * `isAuthSpec()` enforces that by file path, not by opt-in.
 *
 * REVERT KNOB (pre-committed): `E2E_UI_LOGIN=1` short-circuits every caller
 * back to the UI path, which is kept intact. Any auth-derived flake class
 * after this landing FLIPS THE KNOB FIRST and diagnoses second.
 *
 * ── PERSISTED-SESSION CENSUS (@supabase/supabase-js 2.110.9) ───────────────
 * Key   — `dist/index.mjs`: `sb-${baseUrl.hostname.split(".")[0]}-auth-token`,
 *         so for https://jatpuhfdjfzctjipklmk.supabase.co the localStorage key
 *         is `sb-jatpuhfdjfzctjipklmk-auth-token`.
 * Store — src/integrations/supabase/client.ts passes
 *         `brokeredPreviewStorage()`, which returns `localStorage` on any
 *         non-Lovable-preview host; 127.0.0.1 is such a host.
 * Value — auth-js `_saveSession` → `setItemAsync(storage, storageKey, session)`
 *         → `JSON.stringify(session)`. PLAIN JSON, no `base64-` envelope in
 *         this version (grepped: the prefix does not appear in auth-js dist).
 *         Shape = the GoTrue token response verbatim:
 *         { access_token, token_type, expires_in, expires_at, refresh_token,
 *           user: {...} }.
 */
import type { Page } from "@playwright/test";
import { test } from "@playwright/test";

export type PersistedSession = {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: Record<string, unknown>;
};

function supabaseUrl(): string {
  const url = process.env["E2E_SUPABASE_URL"];
  if (!url) throw new Error("[e2e:session] E2E_SUPABASE_URL is not set.");
  return url.replace(/\/+$/, "");
}

function publishableKey(): string {
  const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
  if (!key) throw new Error("[e2e:session] E2E_SUPABASE_PUBLISHABLE_KEY is not set.");
  return key;
}

/** The exact localStorage key supabase-js derives from the project URL. */
export function storageKey(): string {
  const host = new URL(supabaseUrl()).hostname;
  return `sb-${host.split(".")[0]}-auth-token`;
}

/** The pre-committed revert knob: UI sign-in everywhere. */
export function uiLoginForced(): boolean {
  return process.env["E2E_UI_LOGIN"] === "1";
}

/** Auth specs prove the door itself and therefore never inject. */
export function isAuthSpec(): boolean {
  const file = test.info().file.replace(/\\/g, "/");
  return /\/e2e\/auth-[^/]*\.spec\.ts$/.test(file);
}

/** Injection is allowed only outside auth specs, with the knob unset. */
export function sessionInjectionEnabled(): boolean {
  if (uiLoginForced()) return false;
  if (!process.env["E2E_SUPABASE_URL"] || !process.env["E2E_SUPABASE_PUBLISHABLE_KEY"])
    return false;
  try {
    return !isAuthSpec();
  } catch {
    // Outside a running test (no test.info()) injection is not offered.
    return false;
  }
}

/**
 * Per-WORKER persona cache. Each Playwright worker is its own process, so this
 * map never crosses the worker boundary — the same fixture user signing in
 * repeatedly inside one worker pays for exactly one token request.
 */
const grants = new Map<string, PersistedSession>();

function isFresh(session: PersistedSession): boolean {
  // 60s of headroom: a session that expires mid-test would force a refresh
  // round trip the app has to win before the first assertion.
  return session.expires_at * 1000 - Date.now() > 60_000;
}

/** Node-side password grant against staging. Fails loudly, never half-way. */
export async function passwordGrant(email: string, password: string): Promise<PersistedSession> {
  const cacheKey = `${email}\u0000${password}`;
  const cached = grants.get(cacheKey);
  if (cached && isFresh(cached)) return cached;

  const response = await fetch(`${supabaseUrl()}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: publishableKey(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const body = (await response.json()) as Record<string, unknown>;
  if (!response.ok || typeof body["access_token"] !== "string") {
    throw new Error(
      `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
        `${JSON.stringify(body).slice(0, 300)}`,
    );
  }
  const expiresIn = typeof body["expires_in"] === "number" ? body["expires_in"] : 3600;
  const session: PersistedSession = {
    access_token: body["access_token"],
    token_type: typeof body["token_type"] === "string" ? body["token_type"] : "bearer",
    expires_in: expiresIn,
    expires_at:
      typeof body["expires_at"] === "number"
        ? body["expires_at"]
        : Math.floor(Date.now() / 1000) + expiresIn,
    refresh_token: typeof body["refresh_token"] === "string" ? body["refresh_token"] : "",
    user: (body["user"] as Record<string, unknown>) ?? {},
  };
  grants.set(cacheKey, session);
  return session;
}

/**
 * Writes the session into the page BEFORE any script of the next navigation
 * runs, so the app's first frame already sees an authenticated client — there
 * is no signed-out flash to race. Later injections shadow earlier ones because
 * init scripts run in insertion order and the last write wins.
 */
export async function injectSession(page: Page, session: PersistedSession): Promise<void> {
  await page.addInitScript(
    ({ key, value }: { key: string; value: string }) => {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        // A storage-denied context is a real failure, but it must surface as a
        // signed-out assertion in the caller, not as an init-script crash.
      }
    },
    { key: storageKey(), value: JSON.stringify(session) },
  );
}
