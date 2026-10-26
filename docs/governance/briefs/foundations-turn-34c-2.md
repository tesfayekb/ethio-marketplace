# Foundations — turn 34c-2: the project's address, its key and the session's storage names are read in one place, the door — and a session whose refresh never reached the server is kept (INC-931): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS — TURN 34c-2 (2026-10-26; turn 34c's line, its second part; INC-931; DEC-273; anchors located at 0d8d4f28c3a8c9d44f93b3a5b88d412299c21874). Five readers outside the door read the project's public address and key for themselves, and the session clocks named their storage from the address with their own pattern — a local backend's "localhost" gave them "sb-local-…" while the client keeps its session under "sb-localhost-auth-token", so they fell back to ANY project's session in the browser; the password check's second client and the language list read the browser pair only; the root's loader kept a trailing slash. And the sign-in and reset screens' mount read dropped an expired session whose refresh had only failed to reach the server (INC-931). Tier A (the session's storage and clocks; the password check; the sign-in screens' read). No migration. No string. No package change. AGENTS.md: one clause added to its Supabase-client line (EDIT below). No file deleted. Base: dev 0d8d4f28c3a8c9d44f93b3a5b88d412299c21874 (turn 34c-1's landing). The supervisor sends this brief directly (the operator is away). ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — red first; C — the door and its readers; D — docs and the roadmap; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN.
BASE: 0d8d4f28c3a8c9d44f93b3a5b88d412299c21874
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
scripts/conformance/project-reads.test.ts
src/features/auth/auth-client.test.ts
src/features/auth/auth-service.ts
src/features/session/session-policy.test.ts
src/features/session/session-policy.ts
src/i18n/provider-layers.test.tsx
src/i18n/provider.test.tsx
src/i18n/provider.tsx
src/lib/supabase-door.ts
src/routes/__root.tsx
SCOPE-END

THE SYSTEM (G0) — two concerns, one door.
CONCERN 1 (new, register row 55): the project's public address, its publishable key and the session's storage names are read in one place, so every reader agrees — the client, the session clocks, the password check's second client, the language list, the root's loader and the photo origin.
MECHANISM 1: src/lib/supabase-door.ts — `projectEnv()` (until now private: the address and key as the client module reads them, VITE_* then the unprefixed pair, the trailing slash dropped) is exported; `storedSessionKey()` (the client's own `sb-<ref>-auth-token`) stands; NEW `besideStoredSession(name)` — `sb-<ref>-<name>`, the prefix the client's own key carries (null without a project).
CONSUMERS 1 (grep of `SUPABASE_URL|SUPABASE_PUBLISHABLE_KEY|auth-token` in src/ at BASE, comments excepted, every one; src/integrations/ is the generated client and src/server/ the server's environment reader — not browser code):
- src/features/session/session-policy.ts :64-:79 `projectRef()` / `sessionPolicyKeys()` — the address by its own pattern ("local" for a dot-less host) → `besideStoredSession(...)`; `sessionPolicyKeys()` answers null without a project (no session to clock) and its four callers return on null; :128-:131 `liveSessionRef()` — this project's key, else ANY `sb-*-auth-token` in the browser → `storedSessionKey()` only; :211 the retired step-up hint → `besideStoredSession("stepped-up-at")` — SPK-1/2/3;
- src/features/auth/auth-service.ts :414 the password check's second client — the browser pair only → `projectEnv()`;
- src/i18n/provider.tsx :147 the language list's fetch — the browser pair only → `projectEnv()`;
- src/routes/__root.tsx :161 the root's loader (SSR) — its own reading, the trailing slash kept → `projectEnv()`; :279-:280 the photo origin → `projectEnv()`.
CONCERN 2 (register row 54, continued): a session the browser could not read is UNKNOWN, never signed out — INC-931: auth-service.ts `rehydrate` (:497-:503; the mount read of /auth and /auth/reset) evicted an expired session on ANY failed refresh, one that never reached the server (offline, a timeout — auth-js's AuthRetryableFetchError) included; DEC-076's eviction was written for a refresh the server refused.
MECHANISM 2: src/lib/supabase-door.ts NEW `neverReachedTheServer(error)` — auth-js's own test (isAuthRetryableFetchError, a name check), read by name so the client's code stays off the first download; `currentSession()` (turn 34c-1) and `rehydrate` use it: a refresh that never reached the server throws, so `sessionRehydration` answers "unavailable" (the reset screen's LoadFailedHere, /auth's form) and the session stays stored — ASC-7. DEC-273.
COVERED HERE: every consumer above. LEFT, to turn 34c-3 (its roadmap line, Part D): the E2E side of concern 1 — e2e/helpers/session.ts :61 `storageKey()` (its own reading of the address) and the page scripts that look for any `sb-*-auth-token` (e2e/auth-signout.spec.ts :143, :212, :230, :272, :305-:312; e2e/helpers/ui.ts :506, :563; e2e/smoke-auth-i18n.spec.ts :58; e2e/admin-categories-home.spec.ts :240, :380) with the census of the synchronous `__ethioSupabase` readers in e2e/ (turn 34c-1's K2); turn 32b's guard debt (OVF-17/18/19, the stale `false`, the colour reader's rgba); `useStringsLayers().retry` retired; INC-930.
CONFORMANCE GUARD: scripts/conformance/project-reads.test.ts (BLOCK 1) — CF-PROJECT-1: no browser or route file outside the door reads the address, the key or the session's storage name (code, comments blanked) — red on BASE (it names the reading lines above); CF-PROJECT-2: the census names a planted address read, key read and storage name, and passes the door's own reader and a comment.
EXCEPTIONS: src/integrations/ (the generated client: platform files) and src/server/ (serverEnv) — outside the census's domain, said in its header.
FIVE LENSES — security: the clocks of one project's session are never judged by another project's token in the same browser (the "any sb-*-auth-token" fallback is gone); a session is no longer dropped because a refresh could not reach the server · performance: none — the same reads, one parse of the address per call · failure modes: no project → no clocks (typed null, never a "local" guess); a refresh that never reached the server is unknown ("unavailable"), a refused one drops the session as before · consistency: one reading of the address and key for the client and everything beside it; one test of "never reached the server" · future growth: a new name kept beside the session is one `besideStoredSession` call; a new reader of the address is named by CF-PROJECT-1 the day it lands.
FORWARD-SCAN: turns 35–37 (DEC-263's cached GET routes for the anonymous reference reads) read the address through `projectEnv()`; the edge-caching cutover (DEC-263) moves no storage name. REGISTER: row 55 added; row 54's last cell gains INC-931 (Part D).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34c-2.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). The roadmap's lines change in Part D only.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP); STEP 0; Parts B–D; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first — though no e2e/ file changes in this turn (the E2E side is turn 34c-3's); the browser specs below run unchanged.
- Run no stateful git command. Every FILE block is the file's whole text — write it with your file-writing tool; every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool from the saved brief (docs/governance/briefs/foundations-turn-34c-2.md), never retyped and never from memory — if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. No NEW or FILE block carries a non-null assertion (your platform rule; checked by the supervisor's script).
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-34c-2.md, roadmap.md, AGENTS.md, docs/_changelog.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-turn-34c-2.report.md (your completion report). `bun run i18n:usage` changes nothing (no key moves; checked). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After Part C, read /tmp/observability/build-errors.log and fix every `error TS` line at its root (no `!`, cast, `any` or `@ts-expect-error`); run the tests the part touched.
- RED FIRST (G38): Part B shows CF-PROJECT-1, SPK-1, SPK-2, SPK-3 and ASC-7 failing on BASE's code before Part C's edits.
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 can time out in your sandbox (INC-890); AAN-1 and CF-SL-1, CF-SL-3, CF-SL-6 can time out under the full run's load and pass alone (INC-921). Do not change, skip or work around them; paste their failure lines and the single-file run under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS and the tests each part touched as you go; the browser specs through `bun run e2e:local -- <spec file>` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); no local repeat runs (DEC-184); a run the ceiling kills is reported, never re-run in the background (S407). Before a run, nothing of a previous run may still hold port 4173 — stop it first.
- Behaviour contract: with a project whose address has a dotted host (every deployed and staging address, and 127.0.0.1), the clocks keep their names and every page, sign-in, password check, language list, root read and photo behaves as today. Changed: a dot-less local address ("localhost") names the clocks as the client names its session; the clocks never read another project's session; no project → no clocks; the root's loader drops a trailing slash; an expired session whose refresh never reached the server is kept on the sign-in and reset screens' mount read, and the reset screen shows LoadFailedHere for it (a refused refresh drops it, as today). Nothing else changes.
- Knowledge K: K1 the mechanisms above; K2 the report lists (file:line) every other place, in scope or not, that reads the project's address or key or names a storage key itself (e2e/, scripts/, supabase/functions/ included — listed, not changed), and every other auth call whose failure is read as "no session" without asking whether the call reached the server; and every test that mocks the door (`vi.mock("@/lib/supabase-door"`) whose subject now reaches `projectEnv`, `storedSessionKey`, `besideStoredSession` or `neverReachedTheServer` without that reader in its mock (the supervisor's census: auth-client.test.ts and the two provider tests — fixed here); K3 the guard lands with the fix; K4 no literal language code or country; K5, K6 do not arise.
- Tests (G27, G38): no real row; no assertion loosened; SPK-1/2/3, ASC-7 and CF-PROJECT-1/2 are new; auth-client.test.ts's door mock gains the door's three new readers (the real `neverReachedTheServer`, a fixed project, the names beside the fixed key), and the two provider tests' door mocks gain `projectEnv` (a fixed project — their language fetch never answers, as at BASE, where the provider read the address itself; without it each run raises the mock's "No projectEnv export" error); every other test unchanged.
- The reviewer: after THE END-TO-END CHECK, run your independent review on the last code commit and put its verdict in the report; a BLOCKER is fixed and reviewed again; a MAJOR in SCOPE and provable is fixed, otherwise listed with its reason.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on BASE (CI run 40391189707, turn 34c-1's landing; run 40384938946 on turn 34b-4's landing may still be running too) — green, or still running; a red there is read and named). Any other red on BASE is fixed first at its root (G21, G38) and named in the report.

PART B — RED FIRST (nothing in this part is a fix).
B1. The census — BLOCK 1 (scripts/conformance/project-reads.test.ts); the clocks' tests — BLOCK 2 (src/features/session/session-policy.test.ts); and ASC-7 with the door mock's new readers:
EDIT src/features/auth/auth-client.test.ts #1
OLD-BEGIN

vi.mock("@/lib/supabase-door", () => ({
  getSupabase: () => door.getSupabase(),
  // A signed-in device, so the account-carry calls go on to ask for the client.
  currentSession: () => door.currentSession(),
  storedSessionKey: () => "sb-abcdefghijklmnop-auth-token",
  forgetStoredSession: () => door.forgetStoredSession(),
}));

OLD-END
NEW-BEGIN

vi.mock("@/lib/supabase-door", async (importOriginal) => {
  const real = await importOriginal<typeof import("@/lib/supabase-door")>();
  return {
    getSupabase: () => door.getSupabase(),
    // A signed-in device, so the account-carry calls go on to ask for the client.
    currentSession: () => door.currentSession(),
    storedSessionKey: () => "sb-abcdefghijklmnop-auth-token",
    besideStoredSession: (name: string) => `sb-abcdefghijklmnop-${name}`,
    projectEnv: () => ({ url: "https://abcdefghijklmnop.supabase.co", key: "publishable" }),
    neverReachedTheServer: real.neverReachedTheServer,
    forgetStoredSession: () => door.forgetStoredSession(),
  };
});

NEW-END
EDIT src/features/auth/auth-client.test.ts #2
OLD-BEGIN

  it("ASC-2 auth-service.ts asks the door for the client in one place", () => {
OLD-END
NEW-BEGIN

  it("ASC-7 an expired session whose refresh never reached the server is kept, and the read is unknown; one the server refused is dropped (INC-931)", async () => {
    const key = "sb-abcdefghijklmnop-auth-token";
    const expiredAt = Math.floor(Date.now() / 1000) - 3600;
    const stored = JSON.stringify({ access_token: "a", refresh_token: "r", expires_at: expiredAt });
    const getSession = vi.fn().mockResolvedValue({ data: { session: null }, error: null });
    const unreachable = Object.assign(new Error("Failed to fetch"), {
      name: "AuthRetryableFetchError",
    });
    const refreshSession = vi
      .fn()
      .mockResolvedValue({ data: { session: null, user: null }, error: unreachable });
    const signOut = vi.fn().mockResolvedValue({ error: null });
    door.getSupabase
      .mockReset()
      .mockResolvedValue({ auth: { getSession, refreshSession, signOut } });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    window.localStorage.setItem(key, stored);
    try {
      expect(await service.sessionRehydration()).toBe("unavailable");
      expect(signOut).not.toHaveBeenCalled();
      expect(door.forgetStoredSession).not.toHaveBeenCalled();
      expect(window.localStorage.getItem(key)).toBe(stored);
      expect(warn).toHaveBeenCalledWith("[auth] the session could not be read: Failed to fetch");
      const refused = Object.assign(new Error("Invalid Refresh Token: Refresh Token Not Found"), {
        name: "AuthApiError",
      });
      refreshSession.mockResolvedValue({ data: { session: null, user: null }, error: refused });
      expect(await service.sessionRehydration()).toBe("none");
      expect(signOut).toHaveBeenCalledWith({ scope: "local" });
    } finally {
      window.localStorage.removeItem(key);
      warn.mockRestore();
    }
  });

  it("ASC-2 auth-service.ts asks the door for the client in one place", () => {
NEW-END
B2. Run `bunx vitest run scripts/conformance/project-reads.test.ts src/features/session/session-policy.test.ts src/features/auth/auth-client.test.ts` — the supervisor's run on BASE: `Tests  5 failed | 7 passed (12)`: CF-PROJECT-1 (`expected 'src/features/auth/auth-service.ts:414…' to be ''` — BASE's readers named), ASC-7 (`expected 'none' to be 'unavailable'` — the session dropped), SPK-1 (`expected 'sb-local-session-ref' to be 'sb-localhost-session-ref'`), SPK-2 (`expected 'theirs' to be null` — another project's session read), SPK-3 (`expected { …(3) } to be null`) — paste the failure lines and the totals.

PART C — THE DOOR AND ITS READERS.
C1. The door: `projectEnv()` exported, `besideStoredSession()` and `neverReachedTheServer()` added, `currentSession()` on the shared test:
EDIT src/lib/supabase-door.ts #1
OLD-BEGIN

/** The project's URL and publishable key, read as the client module reads them. */
function projectEnv(): { url: string; key: string } | null {
  const url = import.meta.env.VITE_SUPABASE_URL || process.env["SUPABASE_URL"];
OLD-END
NEW-BEGIN

/**
 * The project's public address and publishable key, read as the client module reads them (dev
 * serves VITE_*; the deployed Worker serves the unprefixed pair). Turn 34c-2: the one place browser
 * and route code reads them (CF-PROJECT-1) — a second reading drifts (a trailing slash, a server
 * pair one reader forgot, a local address one regex could not read).
 */
export function projectEnv(): { url: string; key: string } | null {
  const url = import.meta.env.VITE_SUPABASE_URL || process.env["SUPABASE_URL"];
NEW-END
EDIT src/lib/supabase-door.ts #2
OLD-BEGIN

/** A framed page: a superset of the preview broker's rule (previewAuthStorage.ts). */
OLD-END
NEW-BEGIN

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
NEW-END
EDIT src/lib/supabase-door.ts #3
OLD-BEGIN
    // until the next refresh (INC-914).
    if (error.name !== "AuthRetryableFetchError") return { session: null, failed: false };
    console.warn(`[supabase-door] the session could not be refreshed: ${errorText(error)}`);
OLD-END
NEW-BEGIN
    // until the next refresh (INC-914).
    if (!neverReachedTheServer(error)) return { session: null, failed: false };
    console.warn(`[supabase-door] the session could not be refreshed: ${errorText(error)}`);
NEW-END
C2. The session clocks:
EDIT src/features/session/session-policy.ts #1
OLD-BEGIN
import { isE2E } from "@/lib/env-flags";

OLD-END
NEW-BEGIN
import { isE2E } from "@/lib/env-flags";
import { besideStoredSession, storedSessionKey } from "@/lib/supabase-door";

NEW-END
EDIT src/features/session/session-policy.ts #2
OLD-BEGIN

/**
 * Storage keys are sb-scoped like the supabase token itself, so a different
 * project (staging vs prod) in the same browser keeps its own clocks.
 */
function projectRef(): string {
  return (
    (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.match(/https?:\/\/([^.]+)\./)?.[1] ??
    "local"
  );
}

export function sessionPolicyKeys() {
  const ref = projectRef();
  return {
    lastActivityAt: `sb-${ref}-last-activity-at`,
    sessionStartedAt: `sb-${ref}-session-started-at`,
    /** INC-223 — which session these clocks belong to. */
    sessionRef: `sb-${ref}-session-ref`,
  };
}
OLD-END
NEW-BEGIN

export type SessionClockKeys = {
  lastActivityAt: string;
  sessionStartedAt: string;
  /** INC-223 — which session these clocks belong to. */
  sessionRef: string;
};

/**
 * The clocks' storage keys sit beside the session's own key, as the door names it (turn 34c-2:
 * besideStoredSession — the client's own prefix, read from the project's address as the client
 * reads it), so a different project (staging vs prod) in the same browser keeps its own clocks.
 * Null without a project: there is no session to clock.
 */
export function sessionPolicyKeys(): SessionClockKeys | null {
  const lastActivityAt = besideStoredSession("last-activity-at");
  const sessionStartedAt = besideStoredSession("session-started-at");
  const sessionRef = besideStoredSession("session-ref");
  if (lastActivityAt === null || sessionStartedAt === null || sessionRef === null) return null;
  return { lastActivityAt, sessionStartedAt, sessionRef };
}
NEW-END
EDIT src/features/session/session-policy.ts #3
OLD-BEGIN
  if (typeof window === "undefined") return null;
  const key =
    `sb-${projectRef()}-auth-token` in window.localStorage
      ? `sb-${projectRef()}-auth-token`
      : Object.keys(window.localStorage).find(
          (k) => k.startsWith("sb-") && k.endsWith("-auth-token"),
        );
  if (!key) return null;
  const raw = window.localStorage.getItem(key);
OLD-END
NEW-BEGIN
  if (typeof window === "undefined") return null;
  // Turn 34c-2 — this project's session only, under the key the door names: another project's
  // session in the same browser is never read as this one's.
  const key = storedSessionKey();
  if (key === null) return null;
  const raw = window.localStorage.getItem(key);
NEW-END
EDIT src/features/session/session-policy.ts #4
OLD-BEGIN
  const keys = sessionPolicyKeys();
  if (readStamp(keys.sessionStartedAt) === null) return false;
  const live = liveSessionRef();
OLD-END
NEW-BEGIN
  const keys = sessionPolicyKeys();
  if (keys === null || readStamp(keys.sessionStartedAt) === null) return false;
  const live = liveSessionRef();
NEW-END
EDIT src/features/session/session-policy.ts #5
OLD-BEGIN
  const keys = sessionPolicyKeys();
  if (sessionClocksAreCurrent()) {
OLD-END
NEW-BEGIN
  const keys = sessionPolicyKeys();
  if (keys === null) return;
  if (sessionClocksAreCurrent()) {
NEW-END
EDIT src/features/session/session-policy.ts #6
OLD-BEGIN
  const keys = sessionPolicyKeys();
  window.localStorage.removeItem(keys.lastActivityAt);
OLD-END
NEW-BEGIN
  const keys = sessionPolicyKeys();
  if (keys === null) return;
  window.localStorage.removeItem(keys.lastActivityAt);
NEW-END
EDIT src/features/session/session-policy.ts #7
OLD-BEGIN
  // INC-167: shed the retired U1f step-up hint from pre-L5 browsers.
  window.localStorage.removeItem(`sb-${projectRef()}-stepped-up-at`);
}
OLD-END
NEW-BEGIN
  // INC-167: shed the retired U1f step-up hint from pre-L5 browsers.
  const steppedUp = besideStoredSession("stepped-up-at");
  if (steppedUp !== null) window.localStorage.removeItem(steppedUp);
}
NEW-END
EDIT src/features/session/session-policy.ts #8
OLD-BEGIN
  const extend = useCallback(() => {
    writeStamp(sessionPolicyKeys().lastActivityAt, Date.now());
    setSecondsLeft(null);
OLD-END
NEW-BEGIN
  const extend = useCallback(() => {
    const keys = sessionPolicyKeys();
    if (keys !== null) writeStamp(keys.lastActivityAt, Date.now());
    setSecondsLeft(null);
NEW-END
EDIT src/features/session/session-policy.ts #9
OLD-BEGIN
    const keys = sessionPolicyKeys();
    // Session-scoped: absent OR foreign stamps start a fresh window.
OLD-END
NEW-BEGIN
    const keys = sessionPolicyKeys();
    if (keys === null) {
      setSecondsLeft(null);
      return;
    }
    // Session-scoped: absent OR foreign stamps start a fresh window.
NEW-END
C3. The password check, the sign-in screens' mount read (INC-931), the language list and the root:
EDIT src/features/auth/auth-service.ts #1
OLD-BEGIN
  getSupabase,
  storedSessionKey,
OLD-END
NEW-BEGIN
  getSupabase,
  neverReachedTheServer,
  projectEnv,
  storedSessionKey,
NEW-END
EDIT src/features/auth/auth-service.ts #2
OLD-BEGIN

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
  if (!url || !key) return { ok: false as const, errorKey: "auth.errorGeneric" as const };

OLD-END
NEW-BEGIN

  // Turn 34c-2 — the project's address and key through the door (CF-PROJECT-1).
  const project = projectEnv();
  if (project === null) return { ok: false as const, errorKey: "auth.errorGeneric" as const };

NEW-END
EDIT src/features/auth/auth-service.ts #3
OLD-BEGIN
  const { createClient } = await supabaseJs.load();
  const verifier = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
OLD-END
NEW-BEGIN
  const { createClient } = await supabaseJs.load();
  const verifier = createClient<Database>(project.url, project.key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
NEW-END
EDIT src/features/auth/auth-service.ts #4
OLD-BEGIN
  } catch (error) {
    // The client loaded; its own session read threw: unread, never "no session".
    console.warn(`[auth] the session could not be read: ${errorText(error)}`);
OLD-END
NEW-BEGIN
  } catch (error) {
    // The client loaded; its own session read threw, or its refresh never reached the server
    // (INC-931): unread, never "no session".
    console.warn(`[auth] the session could not be read: ${errorText(error)}`);
NEW-END
EDIT src/features/auth/auth-service.ts #5
OLD-BEGIN
    });
    if (error || !data.session) {
OLD-END
NEW-BEGIN
    });
    // INC-931 (turn 34c-2, DEC-273) — a refresh that never reached the server (offline, a timeout)
    // proves nothing about the session: it stays stored, and the read is unknown —
    // sessionRehydration answers "unavailable". The eviction is for a refresh the server refused.
    if (error !== null && neverReachedTheServer(error)) throw error;
    if (error || !data.session) {
NEW-END
EDIT src/i18n/provider.tsx #1
OLD-BEGIN
import { onAuthChange } from "@/lib/supabase-door";
OLD-END
NEW-BEGIN
import { onAuthChange, projectEnv } from "@/lib/supabase-door";
NEW-END
EDIT src/i18n/provider.tsx #2
OLD-BEGIN
  const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
  const key = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string | undefined;
  if (!url || !key) return null;
OLD-END
NEW-BEGIN
  // Turn 34c-2 — the project's address and key through the door (CF-PROJECT-1).
  const project = projectEnv();
  if (project === null) return null;
  const { url, key } = project;
NEW-END
EDIT src/i18n/provider.test.tsx #1
OLD-BEGIN
  onAuthChange: () => ({ unsubscribe: () => undefined }),
}));
OLD-END
NEW-BEGIN
  onAuthChange: () => ({ unsubscribe: () => undefined }),
  // Turn 34c-2 — the language list reads the project through the door (its fetch never answers here).
  projectEnv: () => ({ url: "https://abcdefghijklmnop.supabase.co", key: "publishable" }),
}));
NEW-END
EDIT src/i18n/provider-layers.test.tsx #1
OLD-BEGIN
  onAuthChange: () => ({ unsubscribe: () => undefined }),
}));
OLD-END
NEW-BEGIN
  onAuthChange: () => ({ unsubscribe: () => undefined }),
  // Turn 34c-2 — the language list reads the project through the door (its fetch never answers here).
  projectEnv: () => ({ url: "https://abcdefghijklmnop.supabase.co", key: "publishable" }),
}));
NEW-END
EDIT src/routes/__root.tsx #1
OLD-BEGIN
import { refreshPage } from "@/lib/on-demand-failure";
import { Button } from "@/components/ui/button";
OLD-END
NEW-BEGIN
import { refreshPage } from "@/lib/on-demand-failure";
import { projectEnv } from "@/lib/supabase-door";
import { Button } from "@/components/ui/button";
NEW-END
EDIT src/routes/__root.tsx #2
OLD-BEGIN

    // Same resolution order as the generated client (dev serves VITE_*; the
    // deployed Worker serves the unprefixed pair).
    const base = import.meta.env.VITE_SUPABASE_URL || process.env["SUPABASE_URL"];
    const key =
      import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env["SUPABASE_PUBLISHABLE_KEY"];
    let languages: Array<{ code: string; rtl: boolean }> = [];
    if (base && key) {
      try {
OLD-END
NEW-BEGIN

    // Turn 34c-2 — the project's address and key through the door (CF-PROJECT-1): the same
    // resolution order as the generated client (dev serves VITE_*; the deployed Worker serves the
    // unprefixed pair).
    const project = projectEnv();
    let languages: Array<{ code: string; rtl: boolean }> = [];
    if (project !== null) {
      try {
NEW-END
EDIT src/routes/__root.tsx #3
OLD-BEGIN
        const response = await upstream(
          `${base}/rest/v1/languages?select=code,rtl&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc`,
          { headers: { apikey: key, accept: "application/json" }, cache: "no-store" },
          { timeoutMs: LANGUAGE_GATE_TIMEOUT_MS, label: "ssr language gate" },
OLD-END
NEW-BEGIN
        const response = await upstream(
          `${project.url}/rest/v1/languages?select=code,rtl&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc`,
          { headers: { apikey: project.key, accept: "application/json" }, cache: "no-store" },
          { timeoutMs: LANGUAGE_GATE_TIMEOUT_MS, label: "ssr language gate" },
NEW-END
EDIT src/routes/__root.tsx #4
OLD-BEGIN
  try {
    // Same resolution order as the loader (:116): dev serves VITE_*; the
    // deployed Worker serves the unprefixed name. Never a hard-coded URL.
    const url =
      (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
      process.env["SUPABASE_URL"] ||
      "";
    return url === "" ? null : new URL(url).origin;
  } catch {
OLD-END
NEW-BEGIN
  try {
    // Turn 34c-2 — the project's address through the door (CF-PROJECT-1), as the loader reads it.
    // Never a hard-coded URL.
    const project = projectEnv();
    return project === null ? null : new URL(project.url).origin;
  } catch {
NEW-END
C4. Read /tmp/observability/build-errors.log; `bunx vitest run scripts/conformance src/lib src/features/session src/features/auth src/i18n src/routes src/test` — every test passes (paste the totals; the known limits above excepted).

PART D — DOCS AND THE ROADMAP.
D1. roadmap.md, line 3: the text after "The brief in force: " up to and including `(Foundations turn 34c-1: a session the browser could not read is unknown, never signed out — INC-914)` becomes `docs/governance/briefs/foundations-turn-34c-2.md (Foundations turn 34c-2: the project's address, key and session names read in one place — the door; INC-931)` (everything after it stays, as it is).
D2. These edits (AGENTS.md's Supabase-client line; the register's row 54 and the new row 55; the changelog; turn 34c-1 ticked with its closing run; turn 34c-2's line rewritten to what it does; turn 34c-3's line, the rest of turn 34c):
EDIT AGENTS.md #1
OLD-BEGIN
- Supabase client (DEC-261): browser code a public page draws reaches it only through src/lib/supabase-door.ts (getSupabase, onAuthChange, currentSession, rpc — a signed-out visitor's database call is the anonymous call, no client); every reader of currentSession reads its `failed` — a failed read is unknown, never signed out (INC-914, CF-SESSION-1); route calls carry the bearer through src/lib/session-bearer.ts (never re-register the platform's auth-attacher); no public page's first download carries the client — check-bundle-size (MUST_NOT_CARRY) and the weight guard judge.
OLD-END
NEW-BEGIN
- Supabase client (DEC-261): browser code a public page draws reaches it only through src/lib/supabase-door.ts (getSupabase, onAuthChange, currentSession, rpc — a signed-out visitor's database call is the anonymous call, no client); every reader of currentSession reads its `failed` — a failed read is unknown, never signed out (INC-914, CF-SESSION-1); the project's address and key and the session's storage names only through projectEnv, storedSessionKey and besideStoredSession (CF-PROJECT-1); route calls carry the bearer through src/lib/session-bearer.ts (never re-register the platform's auth-attacher); no public page's first download carries the client — check-bundle-size (MUST_NOT_CARRY) and the weight guard judge.
NEW-END
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 54 | A session the browser could not read is UNKNOWN, never signed out: no Sign in shown to a signed-in visitor, no sign-in page for a door-step page, no "dead link" on a good link; a server call made without the session says so (INC-914) | `src/lib/supabase-door.ts` — `currentSession()` answers `SessionRead` (`{ session, failed: false }` or `{ session, failed: true, error }`) — `failed` when the read did not happen (the client not downloaded, getSession() thrown, a refresh that never reached the server); a refresh the server refused is signed out, known; its readers: use-auth (unknown: loading kept, the shell's notice), requireSignedIn (the route error view, whose one cure is Refresh), the session's bearer (none, said), the preferred-language reads (a typed reason), the legal landing (lands, logged), route-client; the reset and confirmation screens keep a client that did not load apart from a dead link (`sessionRehydration`, `VerificationResult` `unavailable`) | `scripts/conformance/session-reads.test.ts` (CF-SESSION-1: every reader reads `failed`; CF-SESSION-2: planted session-only readers); UA-1/2, SIR-3, SBB-3, REV-1, SBD-11/15/20; `e2e/supabase-door.spec.ts` SBE-6 | none | a new reader is named by CF-SESSION-1 the day it lands | the root error view's Try again became Refresh (INC-918's class); Foundations turn 34c-1 |
OLD-END
NEW-BEGIN
| 54 | A session the browser could not read is UNKNOWN, never signed out: no Sign in shown to a signed-in visitor, no sign-in page for a door-step page, no "dead link" on a good link; a server call made without the session says so (INC-914) | `src/lib/supabase-door.ts` — `currentSession()` answers `SessionRead` (`{ session, failed: false }` or `{ session, failed: true, error }`) — `failed` when the read did not happen (the client not downloaded, getSession() thrown, a refresh that never reached the server); a refresh the server refused is signed out, known; its readers: use-auth (unknown: loading kept, the shell's notice), requireSignedIn (the route error view, whose one cure is Refresh), the session's bearer (none, said), the preferred-language reads (a typed reason), the legal landing (lands, logged), route-client; the reset and confirmation screens keep a client that did not load apart from a dead link (`sessionRehydration`, `VerificationResult` `unavailable`) | `scripts/conformance/session-reads.test.ts` (CF-SESSION-1: every reader reads `failed`; CF-SESSION-2: planted session-only readers); UA-1/2, SIR-3, SBB-3, REV-1, SBD-11/15/20; `e2e/supabase-door.spec.ts` SBE-6 | none | a new reader is named by CF-SESSION-1 the day it lands | the root error view's Try again became Refresh (INC-918's class); Foundations turn 34c-1; turn 34c-2 — INC-931, DEC-273: the sign-in and reset screens' mount read (auth-service.ts `rehydrate`) keeps an expired session whose refresh never reached the server (`neverReachedTheServer`) and answers "unavailable", ASC-7; the eviction stays for a refresh the server refused |
| 55 | The project's public address, its publishable key and the session's storage names are read in one place, so every reader agrees: the client, the session clocks, the password check's second client, the language list, the root's loader and the photo origin (a second reading drifted — a local backend's address, a trailing slash, a browser pair without the server pair) | `src/lib/supabase-door.ts` — `projectEnv()` (the address and key as the client module reads them), `storedSessionKey()` (the client's own `sb-<ref>-auth-token`), `besideStoredSession(name)` (`sb-<ref>-<name>`: the session clocks), `neverReachedTheServer(error)` (auth-js's own test, by name) | `scripts/conformance/project-reads.test.ts` (CF-PROJECT-1: no browser or route file outside the door reads the address, the key or the storage name; CF-PROJECT-2: planted readers); SPK-1/2/3 (`src/features/session/session-policy.test.ts`) | `src/integrations/` (the generated client) and `src/server/` (the server's environment reader) are not browser code | a second project in the browser, a local backend, a new name kept beside the session | the session clocks read only this project's session — never any `sb-*-auth-token` in the browser; Foundations turn 34c-2 |
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34c-1 (2026-10-26) — INC-914: a session the browser could not read (its client did not download, its read threw, or a refresh never reached the server) is unknown, never signed out; a refresh the server refused is a signed-out visitor, known. `currentSession()` carries the failure's error (`SessionRead`) and every reader reads it (CF-SESSION-1): the header no longer shows Sign in to a signed-in visitor — it waits, and the shell's notice offers Refresh; a door-step page shows the route's error view instead of sending a signed-in visitor to sign in; the route error view's "Try again", which could not work after a failed download, is Refresh (INC-918's class); the session's bearer and the preferred-language reads say so; the reset and email-confirmation screens no longer call a good link dead when their code did not load, and a reset whose submit throws gives its button back. UA-1/2, SIR-3, SBB-3, REV-1, SBD-20, CF-SESSION-1/2, SBE-6.
OLD-END
NEW-BEGIN
- Foundations turn 34c-1 (2026-10-26) — INC-914: a session the browser could not read (its client did not download, its read threw, or a refresh never reached the server) is unknown, never signed out; a refresh the server refused is a signed-out visitor, known. `currentSession()` carries the failure's error (`SessionRead`) and every reader reads it (CF-SESSION-1): the header no longer shows Sign in to a signed-in visitor — it waits, and the shell's notice offers Refresh; a door-step page shows the route's error view instead of sending a signed-in visitor to sign in; the route error view's "Try again", which could not work after a failed download, is Refresh (INC-918's class); the session's bearer and the preferred-language reads say so; the reset and email-confirmation screens no longer call a good link dead when their code did not load, and a reset whose submit throws gives its button back. UA-1/2, SIR-3, SBB-3, REV-1, SBD-20, CF-SESSION-1/2, SBE-6.

- Foundations turn 34c-2 (2026-10-26) — the project's public address, its key and the session's storage names are read in one place, the door (`projectEnv`, `storedSessionKey`, `besideStoredSession`; CF-PROJECT-1): the session clocks no longer read the address with a pattern a local backend's "localhost" defeated, nor fall back to any project's session in the browser; the password check's second client, the language list, the root's loader and the photo origin read what the client reads. INC-931 (DEC-273): the sign-in and reset screens keep an expired session whose refresh never reached the server, and the reset screen says the page did not load instead of dropping it; a refresh the server refused still drops it. SPK-1/2/3, ASC-7, CF-PROJECT-1/2.
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [ ] Turn 34c-1 (docs/governance/briefs/foundations-turn-34c-1.md; no migration; Lovable) — INC-914: a session the browser could not read is unknown, never signed out. currentSession() answers `SessionRead` (`failed` with its error) and every reader reads it (CF-SESSION-1/2): use-auth keeps the visitor loading — neither Sign in nor the account — with the shell's notice (Refresh); requireSignedIn throws to the route error view, whose Try again becomes Refresh (INC-918's class; REV-1); the bearer and the language reads say the read failed; the legal landing logs; the reset and confirmation screens answer an unloaded sign-in code with LoadFailedHere, never a dead link, and the reset submit gives its button back (`finally`); SBE-6.
  - [ ] Turn 34c-2 — the guard debt of turn 32b's reviewer (OVF-17/18/19, the stale `false`, the colour reader's rgba) and the session clocks' key (Foundations turn 34, rulings 2 and 3); the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2); INC-931 — auth-service.ts `rehydrate` (the mount read of /auth and /auth/reset) evicts an expired session whose refresh never reached the server: DEC-076's eviction was written for a refresh the server refused, so an offline person on the sign-in page loses a session a later refresh would have kept (a DEC owed: evict only on a refused refresh); the i18n provider's `useStringsLayers().retry` retired — no product caller since turn 34b-3, and a retry of a failed download cannot work (INC-918). And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell.
OLD-END
NEW-BEGIN
  - [x] Turn 34c-1 (docs/governance/briefs/foundations-turn-34c-1.md; no migration; Lovable) — INC-914: a session the browser could not read is unknown, never signed out. currentSession() answers `SessionRead` (`failed` with its error) and every reader reads it (CF-SESSION-1/2): use-auth keeps the visitor loading — neither Sign in nor the account — with the shell's notice (Refresh); requireSignedIn throws to the route error view, whose Try again becomes Refresh (INC-918's class; REV-1); the bearer and the language reads say the read failed; the legal landing logs; the reset and confirmation screens answer an unloaded sign-in code with LoadFailedHere, never a dead link, and the reset submit gives its button back (`finally`); SBE-6. Final HEAD 0d8d4f28; CI run 40391189707: running when turn 34c-2's brief was sent (the supervisor reads it).
  - [ ] Turn 34c-2 (docs/governance/briefs/foundations-turn-34c-2.md; no migration; Lovable) — the project's public address, its key and the session's storage names read in one place, the door (`projectEnv`, `storedSessionKey`, `besideStoredSession`; CF-PROJECT-1/2, register row 55): the session clocks (no own pattern, no "any sb-*-auth-token" fallback, absent without a project; SPK-1/2/3), the password check's second client, the language list, the root's loader and the photo origin. INC-931 / DEC-273 — the sign-in and reset screens' mount read keeps an expired session whose refresh never reached the server (`neverReachedTheServer`; ASC-7); a refused refresh drops it.
  - [ ] Turn 34c-3 — the rest of turn 34c: the E2E side of the storage name and the client hand-off — e2e/helpers/session.ts :61 `storageKey()` and the page scripts that look for any `sb-*-auth-token` (e2e/auth-signout.spec.ts, e2e/helpers/ui.ts, e2e/smoke-auth-i18n.spec.ts, e2e/admin-categories-home.spec.ts) onto one helper, with the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2); the guard debt of turn 32b's reviewer (OVF-17/18/19, the stale `false`, the colour reader's rgba); the i18n provider's `useStringsLayers().retry` retired — no product caller since turn 34b-3, and a retry of a failed download cannot work (INC-918). And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell.
NEW-END

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34c-2.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src/integrations supabase e2e` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 323 files, 1981 tests, every one passed); `bun run i18n:usage` then `git diff <START> --stat -- docs/generated public` (empty); `bun run i18n:map-guard`; `bash scripts/check-hardcoded-strings.sh` (findings: 0); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
a736ff0881391c10833fda034211dcac007e6151240e3f90f8876984f29e5f67  AGENTS.md
c957ddd92a60f44dab31f4fca85776f9668688f546cca15591bcd9265e6f07f3  docs/_changelog.md
9f365dcf64f2e54282fa9a3e6a289872e68545f119baaca80f23372d3436d564  docs/governance/mechanisms.md
11f89629f3e0a225bb5bb6d691d0d6c1116dd689f52e150f5fc5072612483549  scripts/conformance/project-reads.test.ts
115ccbba0d9c27dda65687dbb4e1b36c88d6c530b2348619083d1994e309e681  src/features/auth/auth-client.test.ts
d72c798814c49c5602c3b882319d765b350cc155a65b130b43f855f244b708d7  src/features/auth/auth-service.ts
c429db63743cb0a7aabddc55566b3b1b3568bfd1cea358c5fcecdc97bf7df70a  src/features/session/session-policy.test.ts
1c77f05d4fd854bf9041d1d766de6b26cf33f880b8a32d3473523d989760e864  src/features/session/session-policy.ts
721feb53e2330eb63791b8134537175b76201c754bf2d1bb2315f12f8cc0a715  src/i18n/provider-layers.test.tsx
1a15984156039e682d8f8e31ed36b47e935211018d87ef31f49e9a9f103aa26d  src/i18n/provider.test.tsx
9a9271584589cfcb1802548c99ddcb90b285d9761a11c49ff83ae0a0ea2c3a77  src/i18n/provider.tsx
3b8851f4b8be051ea4a959ac04e4a7a824f86910e54df50dc6d12f9410de4d86  src/lib/supabase-door.ts
4e17bfdff804d755c872be2bfb2b2d7ab830179ea06ac2fb0ad12e4edd0b73b4  src/routes/__root.tsx

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>`; both projects, 0 retries, fake mode; G37's minimum — no spec file changes in this turn, so the specs of the changed screens only; CI runs every test on every commit): e2e/auth-signout.spec.ts whole (SP-1…SP-7: the clocks under their names); e2e/auth-reset.spec.ts whole (the reset screen's mount read); e2e/smoke-auth-i18n.spec.ts whole (the root's loader and the language list); paste every count line and the server log's `[ssr-error]` count by path.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34c-2.report.md (and its summary in chat), carrying: done or not done by part and step; the file list from `git diff --name-only <START>`; the behaviour contract before → after for each consumer above; the red-first lines; the unit totals and the E2E count lines; the K2 lists (file:line); "none" for migrations and strings; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; the operator is away and reads them in the record): DEC-273 — the sign-in and reset screens' mount read drops an expired session only on a refresh the server refused; one that never reached the server keeps it and answers "unavailable" (DEC-076's eviction, read for what it was written for). Without a project the session clocks are absent (typed null), never a "local" guess. The E2E side of the storage name, with the hand-off readers' census, is turn 34c-3's.

BLOCK 1 — FILE-BEGIN scripts/conformance/project-reads.test.ts
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { codeOf, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * Turn 34c-2 — THE PROJECT'S ADDRESS, ITS KEY AND THE SESSION'S STORAGE NAMES ARE READ IN ONE
 * PLACE: src/lib/supabase-door.ts (`projectEnv()`, `storedSessionKey()`, `besideStoredSession()`).
 * A second reading drifts — the session clocks read the address with a pattern a local backend's
 * "localhost" defeated and fell back to any project's session in the browser; the password check
 * and the language list read the browser pair only; the root's loader kept a trailing slash. The
 * census reads the code (comments blanked) of every browser and route file: the generated client
 * (src/integrations/) and the server's own environment reader (src/server/) are not browser code.
 */

type Finding = { file: string; line: number; what: string };

const READS: Array<{ pattern: RegExp; what: string }> = [
  {
    pattern: /\b(?:VITE_)?SUPABASE_URL\b/,
    what: "reads the project's address itself — through projectEnv() (src/lib/supabase-door.ts)",
  },
  {
    pattern: /\b(?:VITE_)?SUPABASE_PUBLISHABLE_KEY\b/,
    what: "reads the project's key itself — through projectEnv() (src/lib/supabase-door.ts)",
  },
  {
    pattern: /auth-token/,
    what: "names the session's storage itself — through storedSessionKey() or besideStoredSession() (src/lib/supabase-door.ts)",
  },
];

export function projectReadCensus(files: string[]): Finding[] {
  const findings: Finding[] = [];
  for (const file of files) {
    const lines = codeOf(readFileSync(file, "utf8")).split("\n");
    lines.forEach((text, index) => {
      for (const read of READS)
        if (read.pattern.test(text)) findings.push({ file, line: index + 1, what: read.what });
    });
  }
  return findings;
}

const domain = walkFiles(["src"], {
  ext: ["ts", "tsx"],
  skipTests: true,
  skip: /^src[\\/](?:integrations|server)(?:[\\/]|$)/,
}).filter((file) => file !== "src/lib/supabase-door.ts");

describe("the project's address, key and session names are read in one place (turn 34c-2)", () => {
  it(
    "CF-PROJECT-1 no browser or route file reads the project's address, its key or the session's storage name itself",
    () => {
      const findings = projectReadCensus(domain);
      console.log(`[project-reads] files read: ${domain.length}; findings: ${findings.length}`);
      expect(domain.length).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-PROJECT-2 the census names a planted address read, a key read and a storage name, and passes the door and a comment", () => {
    const dir = "node_modules/.cache/project-reads";
    mkdirSync(dir, { recursive: true });
    const files = {
      address: `${dir}/pr-address.ts`,
      key: `${dir}/pr-key.ts`,
      storage: `${dir}/pr-storage.ts`,
      good: `${dir}/pr-good.ts`,
    };
    try {
      writeFileSync(
        files.address,
        "export const url =\n  import.meta.env.VITE_SUPABASE_URL as string | undefined;\n",
      );
      writeFileSync(files.key, 'export const key = process.env["SUPABASE_PUBLISHABLE_KEY"];\n');
      writeFileSync(
        files.storage,
        "export const name = (ref: string) =>\n  `sb-${ref}-auth-token`;\n",
      );
      writeFileSync(
        files.good,
        'import { projectEnv } from "@/lib/supabase-door";\n// SUPABASE_URL is read by the door, as the client reads it.\nexport const url = projectEnv()?.url;\n',
      );
      expect(report(projectReadCensus(Object.values(files)))).toBe(
        [
          `${files.address}:2 reads the project's address itself — through projectEnv() (src/lib/supabase-door.ts)`,
          `${files.key}:1 reads the project's key itself — through projectEnv() (src/lib/supabase-door.ts)`,
          `${files.storage}:2 names the session's storage itself — through storedSessionKey() or besideStoredSession() (src/lib/supabase-door.ts)`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
FILE-END scripts/conformance/project-reads.test.ts

BLOCK 2 — FILE-BEGIN src/features/session/session-policy.test.ts
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Turn 34c-2 — THE SESSION CLOCKS SIT BESIDE THE SESSION'S OWN KEY. Their names come from the
 * door (besideStoredSession), read from the project's address as the client reads it: a local
 * backend's address gives the client's own prefix, and another project's session in the same
 * browser is never read as this one's.
 */
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

const { clearSessionClocks, liveSessionRef, sessionPolicyKeys, startSessionClocks } =
  await import("./session-policy");

/** A token whose payload carries the session's id, as the auth server writes it. */
const token = (sessionId: string) =>
  `header.${btoa(JSON.stringify({ session_id: sessionId })).replace(/=+$/, "")}.signature`;

beforeEach(() => {
  vi.stubEnv("VITE_SUPABASE_URL", "https://abcdefghijklmnop.supabase.co");
  vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test_key");
});

afterEach(() => {
  vi.unstubAllEnvs();
  window.localStorage.clear();
});

describe("the session clocks' keys (turn 34c-2)", () => {
  it("SPK-1 the clocks are named beside the client's own key, a local backend's address included", () => {
    expect(sessionPolicyKeys()).toEqual({
      lastActivityAt: "sb-abcdefghijklmnop-last-activity-at",
      sessionStartedAt: "sb-abcdefghijklmnop-session-started-at",
      sessionRef: "sb-abcdefghijklmnop-session-ref",
    });
    // The old reading (a pattern on "http(s)://<label>.") named a local backend's clocks
    // "sb-local-…"; the client keeps that session under "sb-localhost-auth-token".
    vi.stubEnv("VITE_SUPABASE_URL", "http://localhost:54321");
    expect(sessionPolicyKeys()?.sessionRef).toBe("sb-localhost-session-ref");
  });

  it("SPK-2 only this project's session is read: another project's token beside it is not", () => {
    window.localStorage.setItem(
      "sb-otherprojectabcd-auth-token",
      JSON.stringify({ access_token: token("theirs") }),
    );
    expect(liveSessionRef()).toBeNull();
    window.localStorage.setItem(
      "sb-abcdefghijklmnop-auth-token",
      JSON.stringify({ access_token: token("mine") }),
    );
    expect(liveSessionRef()).toBe("mine");
    startSessionClocks(1_000);
    expect(window.localStorage.getItem("sb-abcdefghijklmnop-session-ref")).toBe("mine");
    expect(window.localStorage.getItem("sb-abcdefghijklmnop-session-started-at")).toBe("1000");
    clearSessionClocks();
    expect(window.localStorage.getItem("sb-abcdefghijklmnop-session-ref")).toBeNull();
  });

  it("SPK-3 without a project there is no session to clock: nothing is written, nothing throws", () => {
    vi.stubEnv("VITE_SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_URL", "");
    expect(sessionPolicyKeys()).toBeNull();
    expect(liveSessionRef()).toBeNull();
    startSessionClocks();
    clearSessionClocks();
    expect(window.localStorage.length).toBe(0);
  });
});
FILE-END scripts/conformance/project-reads.test.ts
```
