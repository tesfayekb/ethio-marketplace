# Foundations — turn 34: speed S11 — the Supabase client off every public page's first download (D234, DEC-261): brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS BUNDLE — TURN 34 (2026-10-26; DEC-237; D234 — the operator: "it should be the fastest, lightweight … VERY IMPORTANT"; DEC-261 — the operator's decision of 2026-10-25, "all as recommended": the sign-in and database client leaves every public page's first download, sign-in, sign-up, sign-out, the callback and token refresh behaving exactly as today; anchors located at 3464182843f7991b1fa5bbadbdb2a020cf734921). Tier A (sign-in, the session, every browser database call, the route calls' bearer). No migration. No new string. No package change. No file deleted. AGENTS.md: one new line (F6). Base: dev 3464182843f7991b1fa5bbadbdb2a020cf734921 (turn 32b's final commit). Checked by script against AGENTS.md: no new control; no map read by an outside key (the door reads PostgREST's error fields with Reflect.get after an `in` check); no silent catch (every failed load of the client is logged; the door never rejects where the client's own call did not); no `!`; no `.first()` in e2e; no cast in the new files. ONE TURN. Parts, IN THIS ORDER: A — orient and CI first; STEP 0; B — the door; C — every first-paint caller onto the door, the tests re-pointed (one commit); D — the guards and the ceilings; E — the browser; F — docs, register, changelog, AGENTS.md; then THE CHECKS, THE END-TO-END CHECK, the report and the landing.
BASE: 3464182843f7991b1fa5bbadbdb2a020cf734921
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
src/lib/supabase-door.ts
src/lib/supabase-door.test.ts
src/lib/session-bearer.ts
src/start.ts
src/lib/route-client.ts
src/lib/route-client.test.ts
src/lib/signed-in-route.ts
src/lib/signed-in-route.test.ts
src/lib/env-flags.test.ts
src/components/app-shell.tsx
src/components/shell/place-carry-service.ts
src/features/auth/auth-service.ts
src/features/auth/use-auth.ts
src/features/legal/legal-reader.ts
src/features/legal/legal-reader.test.ts
src/features/legal/use-legal-gate.ts
src/features/legal/use-legal-gate.test.tsx
src/features/permissions/service.ts
src/features/admin/nav-alerts.ts
src/features/admin/impersonation/impersonation-service.ts
src/features/posting/use-price-unit-labels.ts
src/features/posting/attribute-options.test.ts
src/features/ad-page/save.ts
src/features/ad-page/save.test.ts
src/features/ad-page/contact.ts
src/features/ad-page/contact.test.ts
src/features/ad-page/report.ts
src/features/ad-page/report.test.ts
src/features/ad-page/count-view.test.ts
src/i18n/bundle.ts
src/i18n/provider.tsx
src/i18n/provider.test.tsx
src/i18n/provider-layers.test.tsx
src/routes/auth.tsx
src/routes/settings.tsx
src/routes/legal.publishing.tsx
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/check-marketplace-imports.mjs
scripts/route-budgets.mjs
scripts/conformance/vendor-seams-scan.ts
scripts/e2e-select.ts
e2e/supabase-door.spec.ts
AGENTS.md
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: the Supabase client (sign-in, the session, database calls) — code a public page draws reaches it only through one door, which answers a signed-out visitor without fetching it, so no public page's first download carries it; a signed-in visitor's client starts as the page's code arrives.
MECHANISM: NONE YET — built in Part B as src/lib/supabase-door.ts: `getSupabase()` (the client module fetched once, `loadOnce`, src/lib/load-once.ts); `hasStoredSession()` and `storedSessionKey()` (supabase-js's own storage key, `sb-<the URL's first host label>-auth-token`, read without the client; a framed page counts — the Lovable preview keeps its session in the editor's broker, src/integrations/supabase/previewAuthStorage.ts :41-:57, read asynchronously); `onAuthChange()` (the client's `onAuthStateChange`: `INITIAL_SESSION` with null on the next task when nothing is stored, the listener attached to the client when it arrives); `currentSession()` (null without the client when nothing is stored; never rejects); `rpc()` (for a signed-out visitor without the client, the anonymous PostgREST call the client itself sends — POST /rest/v1/rpc/<name>, the key as `apikey`, the bearer only for an old-style JWT key, as src/integrations/supabase/client.ts :10-:31 does — answered in supabase-js's `{ data, error }` shape; the client's own `rpc` otherwise); and src/lib/session-bearer.ts, the route calls' bearer, in place of the platform's attacher (src/integrations/supabase/auth-attacher.ts :3 imports the client). The standard: import-on-interaction / idle-until-urgent loading; OWASP ASVS V3 (session management unchanged — the client still owns storage, refresh and sign-out) and V8 (the anonymous path sends exactly what the signed-out client sent).
CONSUMERS (grep at BASE: every module a public page's first download carries that imports the client or supabase-js by value, found by a static-import walk from the entry, the root route and every route file's options — a route's `beforeLoad` and `loader` are not code-split — and src/start.ts): src/components/app-shell.tsx :54 (the E2E hand-off, DEC-018); src/components/shell/place-carry-service.ts :1 (rpc :23, :38); src/features/ad-page/contact.ts :1 (rpc :37), report.ts :1 (:26), save.ts :2 (:14, :49, :73); src/features/admin/impersonation/impersonation-service.ts :1 (:52, :63, :68, :81, :100); src/features/admin/nav-alerts.ts :3 (:33); src/features/auth/auth-service.ts :1, :3 (every auth action; the verifier's `createClient`); src/features/auth/use-auth.ts :4 (:98, :102); src/features/legal/legal-reader.ts :1 (:105, :120, :129, :152, :160, :182); src/features/legal/use-legal-gate.ts :2 (:87); src/features/permissions/service.ts :1 (:15); src/features/posting/use-price-unit-labels.ts :2 (:17); src/i18n/bundle.ts :1 (:54, :115); src/i18n/provider.tsx :13 (:272); src/lib/route-client.ts :1 (:70); src/lib/signed-in-route.ts :2 (:14); src/routes/auth.tsx :16 (:208); src/routes/legal.publishing.tsx :5 (its loader); src/routes/settings.tsx :26; src/start.ts :5 (the platform's attacher) — every one bypasses (a static import). The tests that mock the client for a module that moves: src/lib/route-client.test.ts, src/lib/signed-in-route.test.ts, src/features/ad-page/contact.test.ts, report.test.ts, save.test.ts, count-view.test.ts, src/features/legal/legal-reader.test.ts, use-legal-gate.test.tsx, src/features/posting/attribute-options.test.ts, src/i18n/provider.test.tsx, provider-layers.test.tsx — a client mock left on a module that moved intercepts nothing (the door would take the anonymous path and fetch for real; a test expecting a rejection would pass for the wrong reason), so each mocks the door instead. auth-service.ts's own storage-key reader (:410-:425) moves onto the door's key.
COVERED HERE: every consumer above (Part C). LEFT: the files still frozen in scripts/conformance/vendor-seams-allowlist.txt (INC-877) import the client directly — signed-in and staff screens and scripts, never on a public page (D2 judges); src/features/session/session-policy.ts :64-:132 derives the same storage key by its own regex and keys its clocks by it — its move needs the e2e session helpers' census (e2e/helpers/session.ts :61, e2e/auth-signout.spec.ts :211), a roadmap line in F5.
CONFORMANCE GUARD: (1) scripts/bundle-closure.mjs gains `MUST_NOT_CARRY` (`GoTrueClient`, the client's auth class, whose name survives minification) and `carriedViolation`; scripts/check-bundle-size.mjs refuses an entry closure, and `judgeRouteBudgets` a public page, whose chunk TEXT carries it — the bundler names a shared chunk after any module grouped into it (`client-*.js` at BASE, `dist-*.js` once split), so a name prefix cannot find the client; BC-13 on planted chunks. (2) The weight guard (scripts/check-marketplace-imports.mjs) walks from src/start.ts too, forbids `@supabase/supabase-js` by value and stops at src/integrations/supabase/client.ts and auth-attacher.ts with a DEC-261 finding. Both proven on one planted import in src/components/app-shell.tsx (D2). (3) The vendor-seams census names the door the fifth seam; the seventeen files that move onto it leave the freeze (stale lines fail VS-1). Unit: src/lib/supabase-door.test.ts (SBD-1…13). Browser: e2e/supabase-door.spec.ts (SBE-1, SBE-2).
EXCEPTIONS: the route-client census (RCG) gains two lines — the door's anonymous call and the bearer middleware are not route calls (scripts/conformance/route-client-allowlist.txt, until 2027-04-24); the E2E build hands the client to the harness at mount unless a test's init script sets `__ethioClientOff` (isE2E only; SBE).
FIVE LENSES — security: identity and every database function's caller are unchanged — a signed-out visitor's call was already the anonymous PostgREST call, a signed-in one still goes through the client; the bearer is attached exactly as the platform's attacher did; no new secret, no key beyond the publishable one (already in the client) · performance: the supervisor's build — the entry closure 254.0 → 203.6 KiB, every public page 49.9–50.4 KiB lighter; the 29 signed-in and staff pages whose code still imports the client 3.9–4.0 KiB heavier (the client is a chunk of its own; their client starts as the page's code arrives); the frozen rule below is met in the prototype · failure modes: a client that fails to load is logged, `currentSession()` answers `failed` as a failed getSession did, a listener waits for the next load, `rpc()`'s network failure is an error, never a throw; a stale stored key loads the client, which clears it as today · consistency: one door for every first-paint caller; a signed-out listener can hear `INITIAL_SESSION` twice (null, then the client's own) and the three listeners (use-auth, the i18n provider, the sign-in screen) apply the session they are given · future growth: a new database call from public code is one `rpc()`; turn 35 puts the anonymous reference reads behind cached GET routes (DEC-263's groundwork).
FORWARD-SCAN: DEC-263 (edge caching at the cutover) needs public pages without account data — the door keeps the session in the browser; DEC-264 (card photos' public links) shares no file; the Sage redesign touches none of these modules. REGISTER: docs/governance/mechanisms.md row 50 (added in F2); rows 13 and 40 updated.
FROZEN RULE (DEC-261, set before any number existed): the whole is adopted when this turn's build takes at least 45 KiB gzip off the entry closure, every sign-in, sign-up, callback and session test is green in CI, and AP-54 holds; under 45 KiB, stop after turn 35's language routes and record why. The supervisor's prototype: 254.0 → 203.6 KiB.

WHY
- The sign-in and database client (supabase-js: auth, realtime, storage, PostgREST — about 52 KiB gzip) rode every page's first download, though a signed-out visitor on a public page uses none of it: the language bundles, the price units and the public legal text are anonymous reads the browser can send itself.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included) byte for byte as docs/governance/briefs/foundations-turn-34.md and paste its sha256sum (the carrying message states the expected value; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to its closing parenthesis becomes `docs/governance/briefs/foundations-turn-34.md (Foundations turn 34: speed S11 — the Supabase client off every public page's first download: one door, src/lib/supabase-door.ts — D234, DEC-261)` (everything after it stays); the line that begins "  - [ ] Turns 34–37 — speed S11" is replaced by these two lines:
  - [ ] Turn 34 (docs/governance/briefs/foundations-turn-34.md; no migration; the Claude Code executor) — speed S11: the Supabase client off every public page's first download (DEC-261) — one door, src/lib/supabase-door.ts (getSupabase on loadOnce; onAuthChange, currentSession and rpc answer a signed-out visitor without the client), the route calls' bearer through src/lib/session-bearer.ts; twenty first-paint modules onto it; MUST_NOT_CARRY (BC-13) and the weight guard; SBD-1…13, SBE-1…2. Frozen rule: at least 45 KiB off the entry closure (the supervisor's build: 254.0 → 203.6 KiB), every sign-in, sign-up, callback and session test green in CI, AP-54 holding.
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
Tick nothing else. Commit: `turn 34: step 0 — brief saved`.

HOW TO WORK
- Order: Part A (.claude/rules/00-executor-protocol.md step 1; <START> below means the BASE line); STEP 0; Parts B–F, one commit per part; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; the landing (bun .claude/hooks/land.ts); END THE TURN. Do not stop anywhere else. A STOP (a rule conflict, a file outside SCOPE, a census hit this brief did not anticipate, an environment limit) is landed as 00-executor-protocol.md says: commit what is green, write docs/governance/reports/foundations-turn-34.stop-<n>.md, commit it, land, end the turn; the supervisor answers in this session with "continue" or a numbered ruling.
- EXACT TEXT (INC-907): every FILE block is the file's whole text — write it with your file-writing tool; every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text — apply it with your file-editing tool, in the order given; every line this brief gives is copied, never paraphrased. Copy each block from the saved brief (docs/governance/briefs/foundations-turn-34.md), never from memory or a summary of it: if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's own hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation.
- RED FIRST (G38): the door is new behaviour (its tests need no red run); the guards are proven on a planted import (D2), never committed.
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. This turn adds e2e/supabase-door.spec.ts (scratch rows only: one scratch seller, its own category branch and one scratch ad, reaped in afterEach; one pool account).
- THE FILES: the SCOPE block above, plus from the standing allowance only docs/features/performance-strategy.md, docs/features/ci-guards.md, docs/features/route-client.md, docs/_changelog.md, docs/governance/mechanisms.md, scripts/conformance/vendor-seams-allowlist.txt, scripts/conformance/route-client-allowlist.txt, docs/generated/i18n-usage.json, public/i18n-usage.json, roadmap.md, the brief and the report. src/integrations/supabase/** (platform-generated) is never edited. Anything else is a STOP naming the file and why.
- EVERY COMMIT GREEN-SHAPED: before each part's commit, `bun run typecheck`, `bun run lint` and the tests the part touched pass.
- Known limits: EXH-11, EXH-12, EXH-17 and EXH-19 have timed out in sandboxes (INC-890); if one times out here, paste its failure line under Limits and do not change, skip or work around it. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS; the tests each part touches as you go; THE END-TO-END CHECK's tests through `bun run e2e:local -- <spec file>`, both projects, 2 workers, fake mode, 0 retries, each Bash call with a timeout of 1800000 ms; stop any preview server a killed run left on port 4173 before the next run; no local repeat runs (DEC-184); a run that is killed or cut short is reported as such and never re-run in the background (S407). When `node scripts/check-bundle-size.mjs` prints anything but this brief's expected lines after your build, paste its whole output and STOP — never move a ceiling yourself.
- Behaviour contract: every sign-in door, the callback, the reset, sign-out (this device and others), token refresh, the deactivated sign-out (INC-650, INC-661), the live guard (INC-668), the account carry and the language carry behave as today; a signed-in visitor's first auth event arrives as today; a signed-out visitor's is `INITIAL_SESSION` null at once; every database function sees the caller it saw before; every server function call carries the bearer it carried before. Nothing else changes.
- Knowledge K: K1 the mechanism above; K2 the report lists (file:line) every module a public page's first download carries that still imports `@/integrations/supabase/client` or `@supabase/supabase-js` by value (none may remain), every file outside the door that derives the auth storage key (session-policy.ts is the one expected), and every test that mocks `@/integrations/supabase/client` for a module that no longer imports it; K3 the guards, SBD and SBE land with the door; K4 no literal language code or country; K5, K6 do not arise.
- Tests (G27, G38): no real row (SBE seeds its own scratch ad; the home and the terms are read only); no assertion loosened; the guards are proven on a planted import (D2).
- If any rule of yours conflicts with this text, STOP and quote that rule's exact words in a stop report.

PART A — ORIENT AND CI FIRST.
A1. Part A exactly as .claude/rules/00-executor-protocol.md step 1 says (fetch; local dev brought level as a fast-forward — the session setup did it at startup; git switch dev); paste `git rev-parse HEAD origin/dev` — HEAD must equal origin/dev. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev`; a path in SCOPE is a STOP. Read CI with the two-step check (.claude/rules/40-ci-evidence.md): git show origin/ci-evidence:docs/tracking/ci-status.md | head -6, then e2e-last-failure.md and guards-last-failure.md the same way; paste the first six lines of the first and every failing job's evidence lines (expected: the run on BASE — turn 32b's final commit — finished with SUCCESS, or still running). A red on BASE is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before Part D and before the report (never wait for it: DEC-181 queues your landing behind it, and a landing never cancels a running run).

PART B — THE DOOR.
B1. NEW src/lib/supabase-door.ts (sha256 f924d23a8f8abe8796660c42f80530bb8e98003e809545d669efc254a39cd5dc):
FILE-BEGIN src/lib/supabase-door.ts
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
 *   the anonymous PostgREST call the client itself sends for a signed-out
 *   visitor — POST /rest/v1/rpc/<name>, the publishable key as `apikey`, the
 *   bearer only for an old-style anon JWT key — answered in supabase-js's
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

/** The project's URL and publishable key, read as the client module reads them. */
function projectEnv(): { url: string; key: string } | null {
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

/**
 * The current session: null without the client when nothing is stored. Never a
 * rejection: a client that did not load answers `failed` (logged), as a failed
 * getSession() did.
 */
export async function currentSession(): Promise<{ session: Session | null; failed: boolean }> {
  if (door.ready() === null && !hasStoredSession()) return { session: null, failed: false };
  try {
    const client = await getSupabase();
    const { data, error } = await client.auth.getSession();
    // As route-client read it before: any error is a failed read.
    return { session: data.session, failed: Boolean(error) };
  } catch (error) {
    logLoadFailure(error);
    return { session: null, failed: true };
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
  const client = ready ?? (await getSupabase());
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
FILE-END src/lib/supabase-door.ts
B2. NEW src/lib/supabase-door.test.ts (sha256 ba0fddfb49b8600ea07d72ec1924b1a6cd8618a3cb40e7c3aa7a8042c2a2cae9):
FILE-BEGIN src/lib/supabase-door.test.ts
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * DEC-261 (Foundations turn 34) — THE CLIENT'S DOOR. A signed-out visitor's page
 * never fetches the Supabase client: auth events, the session and database
 * functions answer without it, exactly as the client answered a signed-out
 * caller. Each test loads the door afresh (vi.resetModules) and sets its own
 * environment (INC-880).
 */
const state = vi.hoisted(() => ({
  imported: 0,
  listeners: new Array<(event: string, session: unknown) => void>(),
  rpc: vi.fn(),
  getSession: vi.fn(),
}));

vi.mock("@/integrations/supabase/client", () => {
  state.imported += 1;
  return {
    supabase: {
      rpc: state.rpc,
      auth: {
        getSession: state.getSession,
        onAuthStateChange: (listener: (event: string, session: unknown) => void) => {
          state.listeners.push(listener);
          return { data: { subscription: { unsubscribe: () => undefined } } };
        },
      },
    },
  };
});

const URL_ = "https://abcdefghijklmnop.supabase.co";
const KEY = "sb_publishable_test_key";
const STORED = "sb-abcdefghijklmnop-auth-token";
const fetchMock = vi.fn();
const json = (body: unknown, status = 200) =>
  new Response(body === undefined ? "" : JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

async function door() {
  return import("./supabase-door");
}

beforeEach(() => {
  vi.resetModules();
  state.imported = 0;
  state.listeners = [];
  state.rpc.mockReset().mockResolvedValue({ data: "from-client", error: null });
  state.getSession.mockReset().mockResolvedValue({ data: { session: null }, error: null });
  window.localStorage.clear();
  vi.stubEnv("VITE_SUPABASE_URL", URL_);
  vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", KEY);
  fetchMock.mockReset().mockResolvedValue(json(["ok"]));
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("the client's door (DEC-261)", () => {
  it("SBD-1 signed out: the listener hears INITIAL_SESSION null on the next task, and the client is never fetched", async () => {
    const { onAuthChange } = await door();
    const heard: Array<[string, unknown]> = [];
    onAuthChange((event, session) => heard.push([event, session]));
    expect(heard).toEqual([]);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(heard).toEqual([["INITIAL_SESSION", null]]);
    expect(state.imported).toBe(0);
  });

  it("SBD-2 signed out: the session is null and the client is never fetched", async () => {
    const { currentSession } = await door();
    expect(await currentSession()).toEqual({ session: null, failed: false });
    expect(state.imported).toBe(0);
  });

  it("SBD-3 signed out: a database function is the client's own anonymous call — POST, the key as apikey, no bearer for a new key", async () => {
    const { rpc } = await door();
    const answer = await rpc("get_ui_bundle", { p_lang: "am" });
    expect(answer).toEqual({ data: ["ok"], error: null });
    expect(state.imported).toBe(0);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${URL_}/rest/v1/rpc/get_ui_bundle`);
    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ p_lang: "am" }));
    expect(init.headers.get("apikey")).toBe(KEY);
    expect(init.headers.get("Content-Type")).toBe("application/json");
    expect(init.headers.get("Content-Profile")).toBe("public");
    expect(init.headers.has("Authorization")).toBe(false);
  });

  it("SBD-4 an old anon JWT key is also sent as the bearer, as the client's fetch sends it", async () => {
    const { anonymousHeaders } = await door();
    expect(anonymousHeaders("eyJhbGciOiJIUzI1NiJ9.e30.sig").get("Authorization")).toBe(
      "Bearer eyJhbGciOiJIUzI1NiJ9.e30.sig",
    );
    expect(anonymousHeaders("sb_secret_x").has("Authorization")).toBe(false);
  });

  it("SBD-5 a refusal answers supabase-js's error shape from PostgREST's body", async () => {
    fetchMock.mockResolvedValue(
      json({ code: "42501", message: "permission denied", details: "d", hint: "h" }, 403),
    );
    const { rpc } = await door();
    expect(await rpc("price_unit_labels")).toEqual({
      data: null,
      error: { code: "42501", message: "permission denied", details: "d", hint: "h" },
    });
  });

  it("SBD-6 a network failure answers an error, never a throw", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    const { rpc } = await door();
    const answer = await rpc("price_unit_labels");
    expect(answer.data).toBeNull();
    expect(answer.error?.message).toBe("TypeError: Failed to fetch");
  });

  it("SBD-7 an empty 2xx body is data null", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }));
    const { rpc } = await door();
    expect(await rpc("price_unit_labels")).toEqual({ data: null, error: null });
  });

  it("SBD-8 signed in: the client starts when the door loads, and a database function is the client's rpc", async () => {
    window.localStorage.setItem(STORED, JSON.stringify({ access_token: "t", refresh_token: "r" }));
    const { rpc } = await door();
    await vi.waitFor(() => expect(state.imported).toBe(1));
    expect(await rpc("get_my_permissions")).toEqual({ data: "from-client", error: null });
    expect(state.rpc).toHaveBeenCalledWith("get_my_permissions", undefined);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("SBD-9 a sign-in in another tab fetches the client, and a waiting listener is attached to it", async () => {
    const { onAuthChange } = await door();
    const heard: string[] = [];
    onAuthChange((event) => heard.push(event));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(state.imported).toBe(0);
    window.dispatchEvent(new StorageEvent("storage", { key: STORED, newValue: "{}" }));
    // Earlier tests' doors hear the same event; this door's listener is the last attached.
    await vi.waitFor(() => expect(state.listeners.length).toBeGreaterThan(0));
    state.listeners.at(-1)?.("SIGNED_IN", { user: { id: "u" } });
    expect(heard).toEqual(["INITIAL_SESSION", "SIGNED_IN"]);
  });

  it("SBD-10 the storage key is supabase-js's default for the project's URL", async () => {
    const { authStorageKey, storedSessionKey } = await door();
    expect(authStorageKey(URL_)).toBe(STORED);
    expect(storedSessionKey()).toBe(STORED);
    expect(authStorageKey("not a url")).toBeNull();
  });

  it("SBD-11 a session read that throws leaves the session unread, never a rejection", async () => {
    window.localStorage.setItem(STORED, "{}");
    state.getSession.mockRejectedValue(new Error("offline"));
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const { currentSession } = await door();
    expect(await currentSession()).toEqual({ session: null, failed: true });
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("SBD-13 a framed page (a Lovable preview's broker) starts the client at once, with nothing stored", async () => {
    // The client module's mock is evaluated once per file (SBD-8 first): the proof is the call's path.
    const parent = vi.spyOn(window, "parent", "get").mockReturnValue(Object.create(window));
    const { hasStoredSession, rpc } = await door();
    expect(hasStoredSession()).toBe(true);
    expect(await rpc("price_unit_labels")).toEqual({ data: "from-client", error: null });
    expect(fetchMock).not.toHaveBeenCalled();
    parent.mockRestore();
  });

  it("SBD-12 without the browser pair (VITE_), the server pair is read, as the client module reads it", async () => {
    vi.stubEnv("VITE_SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_URL", URL_);
    vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", KEY);
    vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "");
    const { rpc } = await door();
    await rpc("price_unit_labels");
    expect(fetchMock.mock.calls[0][0]).toBe(`${URL_}/rest/v1/rpc/price_unit_labels`);
  });
});
FILE-END src/lib/supabase-door.test.ts
B3. NEW src/lib/session-bearer.ts (sha256 b0c0f7ee5d2d557ff38077e215e25f5acda3e01834945270a5d3d8a286ca3638):
FILE-BEGIN src/lib/session-bearer.ts
import { createMiddleware } from "@tanstack/react-start";

import { currentSession } from "@/lib/supabase-door";

/**
 * DEC-261 (Foundations turn 34) — THE SESSION'S BEARER ON EVERY SERVER FUNCTION CALL,
 * through the client's door. The platform's generated attacher
 * (src/integrations/supabase/auth-attacher.ts) imports the client itself, which put the
 * whole client on every page's first download; this middleware does what it did —
 * attach `Authorization: Bearer <access token>` when the browser holds a session, and
 * nothing otherwise — without fetching the client for a signed-out visitor. Registered
 * in src/start.ts in its place; the weight guard (scripts/check-marketplace-imports.mjs,
 * FORBIDDEN_FILES) keeps the attacher off the first-paint walk.
 */
export const attachSessionBearer = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    const { session } = await currentSession();
    const token = session?.access_token;
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
);
FILE-END src/lib/session-bearer.ts
B4. scripts/conformance/vendor-seams-scan.ts, this edit (the door is the fifth seam):
EDIT scripts/conformance/vendor-seams-scan.ts #1
OLD-BEGIN
 * (src/server/media/storage.ts) and the browser's route calls
 * (src/lib/route-client.ts). Everything else the census finds is frozen in
 * vendor-seams-allowlist.txt until INC-877.
 */
OLD-END
NEW-BEGIN
 * (src/server/media/storage.ts) and the browser's route calls
 * (src/lib/route-client.ts) — and, since DEC-261 (Foundations turn 34), the browser's
 * door to the Supabase client (src/lib/supabase-door.ts), the fifth. Everything else the
 * census finds is frozen in vendor-seams-allowlist.txt until INC-877.
 */
NEW-END
EDIT scripts/conformance/vendor-seams-scan.ts #2
OLD-BEGIN
  /^src\/lib\/route-client\.ts$/,
];
OLD-END
NEW-BEGIN
  /^src\/lib\/route-client\.ts$/,
  /^src\/lib\/supabase-door\.ts$/,
];
NEW-END
B5. scripts/conformance/route-client-allowlist.txt, at its end, these two lines (each `file | reason | until`):
src/lib/supabase-door.ts | The client's door: the anonymous PostgREST call and the publishable key's bearer rule, not a route call (DEC-261) | 2027-04-24
src/lib/session-bearer.ts | The server-function bearer read through the client's door, not a route call (DEC-261) | 2027-04-24
Now `bunx vitest run src/lib/supabase-door.test.ts --reporter=verbose` (SBD-1…13 passed; paste the lines), `bunx vitest run scripts/conformance` (every census passes), `bun run typecheck`, `bun run lint`. Commit: `turn 34 part B: the client's door`.

PART C — EVERY FIRST-PAINT CALLER ONTO THE DOOR, THE TESTS RE-POINTED (ONE COMMIT).
C1. src/start.ts, this edit (the bearer through the door, in place of the platform's attacher):
EDIT src/start.ts #1
OLD-BEGIN
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";
OLD-END
NEW-BEGIN
import { attachSessionBearer } from "@/lib/session-bearer";
NEW-END
EDIT src/start.ts #2
OLD-BEGIN
  functionMiddleware: [attachSupabaseAuth],
OLD-END
NEW-BEGIN
  // DEC-261 — the bearer through the client's door (src/lib/session-bearer.ts), never the
  // generated attacher, which imports the whole client into every first download.
  functionMiddleware: [attachSessionBearer],
NEW-END
C2. src/lib/route-client.ts, these edits:
EDIT src/lib/route-client.ts #1
OLD-BEGIN
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { currentSession } from "@/lib/supabase-door";
NEW-END
EDIT src/lib/route-client.ts #2
OLD-BEGIN
/** The session's bearer, read once per call; null when there is no session. */
OLD-END
NEW-BEGIN
/**
 * The session's bearer, read once per call; null when there is no session. DEC-261:
 * through the client's door — an anonymous call fetches no client.
 */
NEW-END
EDIT src/lib/route-client.ts #3
OLD-BEGIN
  const { data, error } = await supabase.auth.getSession();
  if (error) return { token: null, failed: true };
  return { token: data.session?.access_token ?? null, failed: false };
OLD-END
NEW-BEGIN
  const { session, failed } = await currentSession();
  if (failed) return { token: null, failed: true };
  return { token: session?.access_token ?? null, failed: false };
NEW-END
C3. src/lib/signed-in-route.ts, these edits:
EDIT src/lib/signed-in-route.ts #1
OLD-BEGIN
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { currentSession } from "@/lib/supabase-door";
NEW-END
EDIT src/lib/signed-in-route.ts #2
OLD-BEGIN
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user ?? null;
OLD-END
NEW-BEGIN
  // DEC-261 — through the client's door: a signed-out visitor is sent on without the client.
  const { session } = await currentSession();
  const user = session?.user ?? null;
NEW-END
C4. src/features/auth/use-auth.ts, these edits:
EDIT src/features/auth/use-auth.ts #1
OLD-BEGIN
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { errorText } from "@/lib/error-text";
import { currentSession, getSupabase, onAuthChange } from "@/lib/supabase-door";
NEW-END
EDIT src/features/auth/use-auth.ts #2
OLD-BEGIN
 * state directly, so no extra React provider is needed in __root.tsx.
OLD-END
NEW-BEGIN
 * state through the client's door (src/lib/supabase-door.ts, DEC-261), so no
 * extra React provider is needed in __root.tsx.
NEW-END
EDIT src/features/auth/use-auth.ts #3
OLD-BEGIN
      const { data } = await supabase
        .from("profiles")
        .select("display_name, account_status")
        .eq("user_id", userId)
        .maybeSingle();
OLD-END
NEW-BEGIN
      // DEC-261 — the client is here for a signed-in visitor (the door started it); a
      // client that did not load is a read that failed: fail-open, as above.
      const { data } = await getSupabase().then(
        (supabase) =>
          supabase
            .from("profiles")
            .select("display_name, account_status")
            .eq("user_id", userId)
            .maybeSingle(),
        (error: unknown) => {
          console.warn(`[auth] the profile read could not start: ${errorText(error)}`);
          return { data: null };
        },
      );
NEW-END
EDIT src/features/auth/use-auth.ts #4
OLD-BEGIN
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
OLD-END
NEW-BEGIN
    // DEC-261 — the door: a signed-out visitor hears INITIAL_SESSION null without the client.
    const subscription = onAuthChange((_event, session) => {
NEW-END
EDIT src/features/auth/use-auth.ts #5
OLD-BEGIN
    void supabase.auth.getSession().then(({ data }) => {
      void applyUser(data.session?.user?.id, data.session?.user?.email);
OLD-END
NEW-BEGIN
    void currentSession().then(({ session }) => {
      void applyUser(session?.user?.id, session?.user?.email);
NEW-END
EDIT src/features/auth/use-auth.ts #6
OLD-BEGIN
      subscription.subscription.unsubscribe();
OLD-END
NEW-BEGIN
      subscription.unsubscribe();
NEW-END
C5. src/features/auth/auth-service.ts, these edits (every action awaits the door; the verifier's createClient by dynamic import; the stored token read under the door's key):
EDIT src/features/auth/auth-service.ts #1
OLD-BEGIN
import { createClient, type EmailOtpType, type UserIdentity } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { clearSessionClocks } from "@/features/session/session-policy";
import { safeReturnPath } from "@/lib/return-path";

OLD-END
NEW-BEGIN
import type { EmailOtpType, UserIdentity } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { clearSessionClocks } from "@/features/session/session-policy";
import { loadOnce } from "@/lib/load-once";
import { safeReturnPath } from "@/lib/return-path";
import { currentSession, getSupabase, storedSessionKey } from "@/lib/supabase-door";

NEW-END
EDIT src/features/auth/auth-service.ts #2
OLD-BEGIN

/** Where Supabase sends the user after they click the confirmation link. */
OLD-END
NEW-BEGIN

/** DEC-261 — supabase-js itself, for the current-password verifier only; fetched once on demand. */
const supabaseJs = loadOnce(() => import("@supabase/supabase-js"));

/** Where Supabase sends the user after they click the confirmation link. */
NEW-END
EDIT src/features/auth/auth-service.ts #3
OLD-BEGIN
): Promise<AuthResult> {
  const { error } = await supabase.auth.signUp({
OLD-END
NEW-BEGIN
): Promise<AuthResult> {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.signUp({
NEW-END
EDIT src/features/auth/auth-service.ts #4
OLD-BEGIN
  if (typeof window === "undefined") return null;
  const ref = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.match(
    /https?:\/\/([^.]+)\./,
  )?.[1];
  if (!ref) return null;
  try {
    const raw = window.localStorage.getItem(`sb-${ref}-auth-token`);
    if (!raw) return null;
OLD-END
NEW-BEGIN
  if (typeof window === "undefined") return null;
  const key = storedSessionKey();
  if (key === null) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
NEW-END
EDIT src/features/auth/auth-service.ts #5
OLD-BEGIN
async function evictExpiredSession(): Promise<void> {
  if (!storedSessionIsExpired()) return;
OLD-END
NEW-BEGIN
async function evictExpiredSession(): Promise<void> {
  const supabase = await getSupabase();
  if (!storedSessionIsExpired()) return;
NEW-END
EDIT src/features/auth/auth-service.ts #6
OLD-BEGIN
async function awaitSessionCommit(accessToken: string | undefined): Promise<boolean> {
  for (let attempt = 0; attempt < 60; attempt += 1) {
OLD-END
NEW-BEGIN
async function awaitSessionCommit(accessToken: string | undefined): Promise<boolean> {
  const supabase = await getSupabase();
  for (let attempt = 0; attempt < 60; attempt += 1) {
NEW-END
EDIT src/features/auth/auth-service.ts #7
OLD-BEGIN
export async function signInWithPassword({ email, password }: Credentials): Promise<AuthResult> {
  await evictExpiredSession();
OLD-END
NEW-BEGIN
export async function signInWithPassword({ email, password }: Credentials): Promise<AuthResult> {
  const supabase = await getSupabase();
  await evictExpiredSession();
NEW-END
EDIT src/features/auth/auth-service.ts #8
OLD-BEGIN
export async function signInWithGoogle(returnPath?: string): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithOAuth({
OLD-END
NEW-BEGIN
export async function signInWithGoogle(returnPath?: string): Promise<AuthResult> {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.signInWithOAuth({
NEW-END
EDIT src/features/auth/auth-service.ts #9
OLD-BEGIN
export async function resendConfirmation(email: string): Promise<AuthResult> {
  const { error } = await supabase.auth.resend({
OLD-END
NEW-BEGIN
export async function resendConfirmation(email: string): Promise<AuthResult> {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.resend({
NEW-END
EDIT src/features/auth/auth-service.ts #10
OLD-BEGIN
export async function signOut(): Promise<AuthResult> {
  const { error } = await supabase.auth.signOut();
OLD-END
NEW-BEGIN
export async function signOut(): Promise<AuthResult> {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.signOut();
NEW-END
EDIT src/features/auth/auth-service.ts #11
OLD-BEGIN
export async function signOutOtherDevices(): Promise<AuthResult> {
  const { error } = await supabase.auth.signOut({ scope: "others" });
OLD-END
NEW-BEGIN
export async function signOutOtherDevices(): Promise<AuthResult> {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.signOut({ scope: "others" });
NEW-END
EDIT src/features/auth/auth-service.ts #12
OLD-BEGIN
export async function getIdentities(): Promise<IdentitiesResult> {
  const { data, error } = await supabase.auth.getUserIdentities();
OLD-END
NEW-BEGIN
export async function getIdentities(): Promise<IdentitiesResult> {
  const supabase = await getSupabase();
  const { data, error } = await supabase.auth.getUserIdentities();
NEW-END
EDIT src/features/auth/auth-service.ts #13
OLD-BEGIN
export async function linkGoogleIdentity(): Promise<AuthResult> {
  const { error } = await supabase.auth.linkIdentity({
OLD-END
NEW-BEGIN
export async function linkGoogleIdentity(): Promise<AuthResult> {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.linkIdentity({
NEW-END
EDIT src/features/auth/auth-service.ts #14
OLD-BEGIN
export async function unlinkProviderIdentity(identityId: string): Promise<AuthResult> {
  const { data, error: readError } = await supabase.auth.getUserIdentities();
OLD-END
NEW-BEGIN
export async function unlinkProviderIdentity(identityId: string): Promise<AuthResult> {
  const supabase = await getSupabase();
  const { data, error: readError } = await supabase.auth.getUserIdentities();
NEW-END
EDIT src/features/auth/auth-service.ts #15
OLD-BEGIN
): Promise<AuthResult> {
  const verified = await verifyCurrentPassword(currentPassword);
OLD-END
NEW-BEGIN
): Promise<AuthResult> {
  const supabase = await getSupabase();
  const verified = await verifyCurrentPassword(currentPassword);
NEW-END
EDIT src/features/auth/auth-service.ts #16
OLD-BEGIN
async function currentPasswordProof(currentPassword: string) {
  const { data: userData } = await supabase.auth.getUser();
OLD-END
NEW-BEGIN
async function currentPasswordProof(currentPassword: string) {
  const supabase = await getSupabase();
  const { data: userData } = await supabase.auth.getUser();
NEW-END
EDIT src/features/auth/auth-service.ts #17
OLD-BEGIN

  const verifier = createClient<Database>(url, key, {
OLD-END
NEW-BEGIN

  // DEC-261 — the second client's code arrives with the first, never on a first download.
  const { createClient } = await supabaseJs.load();
  const verifier = createClient<Database>(url, key, {
NEW-END
EDIT src/features/auth/auth-service.ts #18
OLD-BEGIN
export async function changeEmail(newEmail: string): Promise<AuthResult> {
  const { error } = await supabase.auth.updateUser(
OLD-END
NEW-BEGIN
export async function changeEmail(newEmail: string): Promise<AuthResult> {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.updateUser(
NEW-END
EDIT src/features/auth/auth-service.ts #19
OLD-BEGIN
  if (typeof window === "undefined") return false;

OLD-END
NEW-BEGIN
  if (typeof window === "undefined") return false;
  const supabase = await getSupabase();

NEW-END
EDIT src/features/auth/auth-service.ts #20
OLD-BEGIN

  const projectRef = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.match(
    /https?:\/\/([^.]+)\./,
  )?.[1];
  if (!projectRef) return false;

  let stored: unknown;
  try {
    const raw = window.localStorage.getItem(`sb-${projectRef}-auth-token`);
    if (!raw) return false;
    stored = JSON.parse(raw);
  } catch {
    return false;
  }

  const tokens = stored as { access_token?: string; refresh_token?: string } | null;
  if (!tokens?.access_token || !tokens?.refresh_token) return false;

OLD-END
NEW-BEGIN

  // DEC-261 — the stored token is read under the door's key (storedSession above).
  const tokens = storedSession();
  if (tokens === null || tokens.access_token === "" || tokens.refresh_token === "") return false;

NEW-END
EDIT src/features/auth/auth-service.ts #21
OLD-BEGIN
export async function completeEmailVerification(): Promise<VerificationResult> {
  const url = new URL(window.location.href);
OLD-END
NEW-BEGIN
export async function completeEmailVerification(): Promise<VerificationResult> {
  const supabase = await getSupabase();
  const url = new URL(window.location.href);
NEW-END
EDIT src/features/auth/auth-service.ts #22
OLD-BEGIN
export async function hasPassword(): Promise<PasswordStateResult> {
  const { data, error } = await supabase.rpc("has_password");
OLD-END
NEW-BEGIN
export async function hasPassword(): Promise<PasswordStateResult> {
  const supabase = await getSupabase();
  const { data, error } = await supabase.rpc("has_password");
NEW-END
EDIT src/features/auth/auth-service.ts #23
OLD-BEGIN
export async function removeOwnPassword(currentPassword: string): Promise<AuthResult> {
  // DEC-242: keep GoTrue's password-proof session alive until the door answers.
OLD-END
NEW-BEGIN
export async function removeOwnPassword(currentPassword: string): Promise<AuthResult> {
  const supabase = await getSupabase();
  // DEC-242: keep GoTrue's password-proof session alive until the door answers.
NEW-END
EDIT src/features/auth/auth-service.ts #24
OLD-BEGIN
export async function requestPasswordReset(email: string): Promise<AuthResult> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
OLD-END
NEW-BEGIN
export async function requestPasswordReset(email: string): Promise<AuthResult> {
  const supabase = await getSupabase();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
NEW-END
EDIT src/features/auth/auth-service.ts #25
OLD-BEGIN
export async function completePasswordReset(newPassword: string): Promise<AuthResult> {
  const session = (await supabase.auth.getSession()).data.session;
OLD-END
NEW-BEGIN
export async function completePasswordReset(newPassword: string): Promise<AuthResult> {
  const supabase = await getSupabase();
  const session = (await supabase.auth.getSession()).data.session;
NEW-END
EDIT src/features/auth/auth-service.ts #26
OLD-BEGIN
> {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData.session?.user?.id;
  if (!userId) return { code: null, reason: "no session" };

OLD-END
NEW-BEGIN
> {
  // DEC-261 — the session through the door: a signed-out device fetches no client.
  const { session } = await currentSession();
  const userId = session?.user?.id;
  if (!userId) return { code: null, reason: "no session" };
  const supabase = await getSupabase();

NEW-END
EDIT src/features/auth/auth-service.ts #27
OLD-BEGIN
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) return { ok: false, reason: "no session" };

OLD-END
NEW-BEGIN
): Promise<{ ok: true } | { ok: false; reason: string }> {
  // DEC-261 — a signed-out device's star is the ordinary case: no client is fetched for it.
  const { session } = await currentSession();
  if (!session) return { ok: false, reason: "no session" };
  const supabase = await getSupabase();

NEW-END
C6. src/i18n/provider.tsx, these edits:
EDIT src/i18n/provider.tsx #1
OLD-BEGIN
import { fetchPreferredLanguage, savePreferredLanguage } from "@/features/auth/auth-service";
import { supabase } from "@/integrations/supabase/client";
import { isE2E } from "@/lib/env-flags";
OLD-END
NEW-BEGIN
import { fetchPreferredLanguage, savePreferredLanguage } from "@/features/auth/auth-service";
import { isE2E } from "@/lib/env-flags";
NEW-END
EDIT src/i18n/provider.tsx #2
OLD-BEGIN
import { errorText } from "@/lib/error-text";

OLD-END
NEW-BEGIN
import { errorText } from "@/lib/error-text";
import { onAuthChange } from "@/lib/supabase-door";

NEW-END
EDIT src/i18n/provider.tsx #3
OLD-BEGIN
    };
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      // No Supabase CALL here (law I5): the session is the event's own argument.
OLD-END
NEW-BEGIN
    };
    // DEC-261 — through the client's door: a signed-out visitor settles without the client.
    const subscription = onAuthChange((_event, session) => {
      // No Supabase CALL here (law I5): the session is the event's own argument.
NEW-END
EDIT src/i18n/provider.tsx #4
OLD-BEGIN
      clearTimeout(watchdog);
      subscription.subscription.unsubscribe();
    };
OLD-END
NEW-BEGIN
      clearTimeout(watchdog);
      subscription.unsubscribe();
    };
NEW-END
C7. src/i18n/bundle.ts, these edits:
EDIT src/i18n/bundle.ts #1
OLD-BEGIN
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { rpc } from "@/lib/supabase-door";
NEW-END
EDIT src/i18n/bundle.ts #2
OLD-BEGIN
  const { data, error } = await supabase.rpc("get_entity_bundle", { p_lang: lang });
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("get_entity_bundle", { p_lang: lang });
NEW-END
EDIT src/i18n/bundle.ts #3
OLD-BEGIN
  const { data, error } = await supabase.rpc("get_ui_bundle", { p_lang: lang });
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("get_ui_bundle", { p_lang: lang });
NEW-END
C8. src/features/legal/legal-reader.ts, these edits:
EDIT src/features/legal/legal-reader.ts #1
OLD-BEGIN
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { rpc } from "@/lib/supabase-door";
NEW-END
EDIT src/features/legal/legal-reader.ts #2
OLD-BEGIN
  const { data, error } = await supabase.rpc("my_legal_status", { p_kinds: kinds });
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("my_legal_status", { p_kinds: kinds });
NEW-END
EDIT src/features/legal/legal-reader.ts #3
OLD-BEGIN
  const { error } = await supabase.rpc("accept_legal", {
OLD-END
NEW-BEGIN
  const { error } = await rpc("accept_legal", {
NEW-END
EDIT src/features/legal/legal-reader.ts #4
OLD-BEGIN
  const { data, error } = await supabase.rpc("my_legal_history");
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("my_legal_history");
NEW-END
EDIT src/features/legal/legal-reader.ts #5
OLD-BEGIN
      const { data, error } = await supabase.rpc("legal_in_force", { p_kind: kind });
OLD-END
NEW-BEGIN
      const { data, error } = await rpc("legal_in_force", { p_kind: kind });
NEW-END
EDIT src/features/legal/legal-reader.ts #6
OLD-BEGIN
  const { data, error } = await supabase.rpc("my_legal_version", { p_version_id: id });
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("my_legal_version", { p_version_id: id });
NEW-END
EDIT src/features/legal/legal-reader.ts #7
OLD-BEGIN
  const { data, error } = await supabase.rpc("my_listing_certification", {
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("my_listing_certification", {
NEW-END
C9. src/features/legal/use-legal-gate.ts, these edits:
EDIT src/features/legal/use-legal-gate.ts #1
OLD-BEGIN
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { currentSession } from "@/lib/supabase-door";
NEW-END
EDIT src/features/legal/use-legal-gate.ts #2
OLD-BEGIN
  const { data } = await supabase.auth.getSession();
  const userId = data.session?.user?.id;
OLD-END
NEW-BEGIN
  const { session } = await currentSession();
  const userId = session?.user?.id;
NEW-END
C10. src/features/permissions/service.ts, these edits:
EDIT src/features/permissions/service.ts #1
OLD-BEGIN
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { rpc } from "@/lib/supabase-door";
NEW-END
EDIT src/features/permissions/service.ts #2
OLD-BEGIN
  const { data, error } = await supabase.rpc("get_my_permissions");
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("get_my_permissions");
NEW-END
C11. src/features/admin/nav-alerts.ts, these edits:
EDIT src/features/admin/nav-alerts.ts #1
OLD-BEGIN
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { rpc } from "@/lib/supabase-door";
NEW-END
EDIT src/features/admin/nav-alerts.ts #2
OLD-BEGIN
      const { data, error } = await supabase.rpc("legal_review_overdue");
OLD-END
NEW-BEGIN
      const { data, error } = await rpc("legal_review_overdue");
NEW-END
C12. src/features/admin/impersonation/impersonation-service.ts, these edits:
EDIT src/features/admin/impersonation/impersonation-service.ts #1
OLD-BEGIN
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { rpc } from "@/lib/supabase-door";
NEW-END
EDIT src/features/admin/impersonation/impersonation-service.ts #2
OLD-BEGIN
  const { data, error } = await supabase.rpc("begin_impersonation", {
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("begin_impersonation", {
NEW-END
EDIT src/features/admin/impersonation/impersonation-service.ts #3
OLD-BEGIN
  const { error } = await supabase.rpc("end_impersonation", { p_session: sessionId });
OLD-END
NEW-BEGIN
  const { error } = await rpc("end_impersonation", { p_session: sessionId });
NEW-END
EDIT src/features/admin/impersonation/impersonation-service.ts #4
OLD-BEGIN
  const { data, error } = await supabase.rpc("get_active_impersonation");
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("get_active_impersonation");
NEW-END
EDIT src/features/admin/impersonation/impersonation-service.ts #5
OLD-BEGIN
  const { data, error } = await supabase.rpc("impersonated_get_profile", { p_session: sessionId });
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("impersonated_get_profile", { p_session: sessionId });
NEW-END
EDIT src/features/admin/impersonation/impersonation-service.ts #6
OLD-BEGIN
  const { data, error } = await supabase.rpc("impersonated_list_listings", {
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("impersonated_list_listings", {
NEW-END
C13. src/components/shell/place-carry-service.ts, these edits:
EDIT src/components/shell/place-carry-service.ts #1
OLD-BEGIN
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { rpc } from "@/lib/supabase-door";
NEW-END
EDIT src/components/shell/place-carry-service.ts #2
OLD-BEGIN
  const { data, error } = await supabase.rpc("my_viewing_location");
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("my_viewing_location");
NEW-END
EDIT src/components/shell/place-carry-service.ts #3
OLD-BEGIN
  const { data, error } = await supabase.rpc("user_set_viewing_location", {
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("user_set_viewing_location", {
NEW-END
C14. src/features/posting/use-price-unit-labels.ts, these edits:
EDIT src/features/posting/use-price-unit-labels.ts #1
OLD-BEGIN
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { rpc } from "@/lib/supabase-door";
NEW-END
EDIT src/features/posting/use-price-unit-labels.ts #2
OLD-BEGIN
      const { data, error } = await supabase.rpc("price_unit_labels");
OLD-END
NEW-BEGIN
      const { data, error } = await rpc("price_unit_labels");
NEW-END
C15. src/features/ad-page/save.ts, these edits:
EDIT src/features/ad-page/save.ts #1
OLD-BEGIN
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { rpc } from "@/lib/supabase-door";
NEW-END
EDIT src/features/ad-page/save.ts #2
OLD-BEGIN
    const { data, error } = await supabase.rpc(door, { p_public_id: publicId });
OLD-END
NEW-BEGIN
    const { data, error } = await rpc(door, { p_public_id: publicId });
NEW-END
EDIT src/features/ad-page/save.ts #3
OLD-BEGIN
    const { data, error } = await supabase.rpc("listing_saved", { p_public_id: publicId });
OLD-END
NEW-BEGIN
    const { data, error } = await rpc("listing_saved", { p_public_id: publicId });
NEW-END
EDIT src/features/ad-page/save.ts #4
OLD-BEGIN
  const { data, error } = await supabase.rpc("my_saved_listings", {
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("my_saved_listings", {
NEW-END
C16. src/features/ad-page/contact.ts, these edits:
EDIT src/features/ad-page/contact.ts #1
OLD-BEGIN
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { rpc } from "@/lib/supabase-door";
NEW-END
EDIT src/features/ad-page/contact.ts #2
OLD-BEGIN
  const { data, error } = await supabase.rpc("reveal_listing_contact", {
OLD-END
NEW-BEGIN
  const { data, error } = await rpc("reveal_listing_contact", {
NEW-END
C17. src/features/ad-page/report.ts, these edits:
EDIT src/features/ad-page/report.ts #1
OLD-BEGIN
import { supabase } from "@/integrations/supabase/client";
OLD-END
NEW-BEGIN
import { rpc } from "@/lib/supabase-door";
NEW-END
EDIT src/features/ad-page/report.ts #2
OLD-BEGIN
    const { data, error } = await supabase.rpc("report_listing", {
OLD-END
NEW-BEGIN
    const { data, error } = await rpc("report_listing", {
NEW-END
C18. src/components/app-shell.tsx, these edits (the E2E hand-off through the door):
EDIT src/components/app-shell.tsx #1
OLD-BEGIN
import type { MessageKey } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import { isE2E } from "@/lib/env-flags";
OLD-END
NEW-BEGIN
import type { MessageKey } from "@/i18n";
import { isE2E } from "@/lib/env-flags";
NEW-END
EDIT src/components/app-shell.tsx #2
OLD-BEGIN
import { errorText } from "@/lib/error-text";
import { useRailCollapsed, RAIL_INIT_SCRIPT } from "@/providers/rail-state";
OLD-END
NEW-BEGIN
import { errorText } from "@/lib/error-text";
import { getSupabase } from "@/lib/supabase-door";
import { useRailCollapsed, RAIL_INIT_SCRIPT } from "@/providers/rail-state";
NEW-END
EDIT src/components/app-shell.tsx #3
OLD-BEGIN
    if (!isE2E || typeof window === "undefined") return;
    (window as unknown as { __ethioSupabase?: unknown }).__ethioSupabase = supabase;
    // U1g-2 — SO-4 proof reads the cache directly to assert the purge.
OLD-END
NEW-BEGIN
    if (!isE2E || typeof window === "undefined") return;
    // DEC-261 — the client through its door, asked for at mount in an E2E build — except where a
    // test's init script set `__ethioClientOff` (SBE-1 proves the signed-out path there).
    if ((window as unknown as { __ethioClientOff?: boolean }).__ethioClientOff !== true)
      void getSupabase().then(
        (client) => {
          (window as unknown as { __ethioSupabase?: unknown }).__ethioSupabase = client;
        },
        (error: unknown) => console.warn(`[e2e] the client did not load: ${errorText(error)}`),
      );
    // U1g-2 — SO-4 proof reads the cache directly to assert the purge.
NEW-END
C19. src/routes/auth.tsx, these edits (the sign-in screen's listener through the door; the client warmed once the screen has painted):
EDIT src/routes/auth.tsx #1
OLD-BEGIN
import { legalInForceIds } from "@/features/legal/legal-reader";
import { currentGateKinds, landAfterSignIn } from "@/features/legal/use-legal-gate";
import { supabase } from "@/integrations/supabase/client";
import { safeReturnPath } from "@/lib/return-path";
import { PageShell } from "@/components/layout/page-shell";
import { PageCard } from "@/components/shell/page-card";
OLD-END
NEW-BEGIN
import { legalInForceIds } from "@/features/legal/legal-reader";
import { currentGateKinds, landAfterSignIn } from "@/features/legal/use-legal-gate";
import { errorText } from "@/lib/error-text";
import { safeReturnPath } from "@/lib/return-path";
import { getSupabase, onAuthChange } from "@/lib/supabase-door";
import { PageShell } from "@/components/layout/page-shell";
import { PageCard } from "@/components/shell/page-card";
NEW-END
EDIT src/routes/auth.tsx #2
OLD-BEGIN
  const isSignIn = view !== "sign-up";

  /**
   * Bundle 22 turn 32 (D230) — the sign-up form's agreement tick. Create account is drawn closed until it
OLD-END
NEW-BEGIN
  const isSignIn = view !== "sign-up";

  // DEC-261 — every door on this screen needs the client: it starts downloading once the screen
  // has painted, so a submit does not wait for it (a failure is logged; the submit asks again).
  useEffect(() => {
    void getSupabase().catch((error: unknown) =>
      console.warn(`[auth] the client did not load: ${errorText(error)}`),
    );
  }, []);

  /**
   * Bundle 22 turn 32 (D230) — the sign-up form's agreement tick. Create account is drawn closed until it
NEW-END
EDIT src/routes/auth.tsx #3
OLD-BEGIN
    };

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && onCheckEmailRef.current) markConfirmed();
    });
OLD-END
NEW-BEGIN
    };

    // DEC-261 — the client's auth events through its door.
    const subscription = onAuthChange((_event, session) => {
      if (session && onCheckEmailRef.current) markConfirmed();
    });
NEW-END
EDIT src/routes/auth.tsx #4
OLD-BEGIN
    return () => {
      active = false;
      data.subscription.unsubscribe();
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
OLD-END
NEW-BEGIN
    return () => {
      active = false;
      subscription.unsubscribe();
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
NEW-END
C20. src/routes/settings.tsx, these edits:
EDIT src/routes/settings.tsx #1
OLD-BEGIN
import { useAuth } from "@/features/auth/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n";
OLD-END
NEW-BEGIN
import { useAuth } from "@/features/auth/use-auth";
import { getSupabase } from "@/lib/supabase-door";
import { useI18n } from "@/i18n";
NEW-END
EDIT src/routes/settings.tsx #2
OLD-BEGIN
      hadSession.current = true;
      const { data } = await supabase.auth.getUser();
OLD-END
NEW-BEGIN
      hadSession.current = true;
      const supabase = await getSupabase();
      const { data } = await supabase.auth.getUser();
NEW-END
C21. src/routes/legal.publishing.tsx, these edits:
EDIT src/routes/legal.publishing.tsx #1
OLD-BEGIN
import { useI18n } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import { isE2E } from "@/lib/env-flags";
OLD-END
NEW-BEGIN
import { useI18n } from "@/i18n";
import { getSupabase } from "@/lib/supabase-door";
import { isE2E } from "@/lib/env-flags";
NEW-END
EDIT src/routes/legal.publishing.tsx #2
OLD-BEGIN
    const { legalPageData } = await import("@/features/legal/legal-page-data");
    const [global, ...countries] = await Promise.all([
OLD-END
NEW-BEGIN
    const { legalPageData } = await import("@/features/legal/legal-page-data");
    const supabase = await getSupabase();
    const [global, ...countries] = await Promise.all([
NEW-END
C22. The tests that mocked the client for a module that moved now mock the door — src/lib/route-client.test.ts:
EDIT src/lib/route-client.test.ts #1
OLD-BEGIN

const { getSession } = vi.hoisted(() => ({ getSession: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { auth: { getSession } } }));
const fetchMock = vi.fn();
OLD-END
NEW-BEGIN

// DEC-261 — the session reaches route calls through the client's door (src/lib/supabase-door.ts).
const { currentSession } = vi.hoisted(() => ({ currentSession: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({ currentSession }));
const fetchMock = vi.fn();
NEW-END
EDIT src/lib/route-client.test.ts #2
OLD-BEGIN
beforeEach(() => {
  getSession.mockReset().mockResolvedValue({ data: { session: null }, error: null });
  fetchMock.mockReset().mockResolvedValue(jsonAnswer({}));
OLD-END
NEW-BEGIN
beforeEach(() => {
  currentSession.mockReset().mockResolvedValue({ session: null, failed: false });
  fetchMock.mockReset().mockResolvedValue(jsonAnswer({}));
NEW-END
EDIT src/lib/route-client.test.ts #3
OLD-BEGIN
    expect(fetchMock).not.toHaveBeenCalled();
    expect(getSession).toHaveBeenCalledTimes(1);
  });
  it("RCL-2 attaches the exact session bearer once", async () => {
    getSession.mockResolvedValue({ data: { session: { access_token: "test-token" } } });
    await callRoute("/api/x");
OLD-END
NEW-BEGIN
    expect(fetchMock).not.toHaveBeenCalled();
    expect(currentSession).toHaveBeenCalledTimes(1);
  });
  it("RCL-2 attaches the exact session bearer once", async () => {
    currentSession.mockResolvedValue({ session: { access_token: "test-token" }, failed: false });
    await callRoute("/api/x");
NEW-END
EDIT src/lib/route-client.test.ts #4
OLD-BEGIN
    expect(init.body).toBeUndefined();
    expect(getSession).toHaveBeenCalledTimes(1);
  });
OLD-END
NEW-BEGIN
    expect(init.body).toBeUndefined();
    expect(currentSession).toHaveBeenCalledTimes(1);
  });
NEW-END
EDIT src/lib/route-client.test.ts #5
OLD-BEGIN
    await callRoute("/api/x", { auth: "none" });
    expect(getSession).not.toHaveBeenCalled();
  });
OLD-END
NEW-BEGIN
    await callRoute("/api/x", { auth: "none" });
    expect(currentSession).not.toHaveBeenCalled();
  });
NEW-END
EDIT src/lib/route-client.test.ts #6
OLD-BEGIN
  it("RCL-15 bearer once, progress as (loaded, total), a 200 JSON answer answered", async () => {
    getSession.mockResolvedValue({ data: { session: { access_token: "test-token" } } });
    const progress: [number, number][] = [];
OLD-END
NEW-BEGIN
  it("RCL-15 bearer once, progress as (loaded, total), a 200 JSON answer answered", async () => {
    currentSession.mockResolvedValue({ session: { access_token: "test-token" }, failed: false });
    const progress: [number, number][] = [];
NEW-END
src/lib/signed-in-route.test.ts:
EDIT src/lib/signed-in-route.test.ts #1
OLD-BEGIN
const getSession = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { auth: { getSession: (...args: unknown[]) => getSession(...args) } },
OLD-END
NEW-BEGIN
const currentSession = vi.fn();
// DEC-261 — the session through the client's door.
vi.mock("@/lib/supabase-door", () => ({
  currentSession: (...args: unknown[]) => currentSession(...args),
NEW-END
EDIT src/lib/signed-in-route.test.ts #2
OLD-BEGIN
  beforeEach(() => getSession.mockReset());
OLD-END
NEW-BEGIN
  beforeEach(() => currentSession.mockReset());
NEW-END
EDIT src/lib/signed-in-route.test.ts #3
OLD-BEGIN
    getSession.mockResolvedValue({ data: { session: null } });
OLD-END
NEW-BEGIN
    currentSession.mockResolvedValue({ session: null, failed: false });
NEW-END
EDIT src/lib/signed-in-route.test.ts #4
OLD-BEGIN
    getSession.mockResolvedValue({ data: { session: { user: { id: "u-1" } } } });
OLD-END
NEW-BEGIN
    currentSession.mockResolvedValue({ session: { user: { id: "u-1" } }, failed: false });
NEW-END
src/features/ad-page/contact.test.ts:
EDIT src/features/ad-page/contact.test.ts #1
OLD-BEGIN
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { rpc: (...args: unknown[]) => rpc(...args) },
OLD-END
NEW-BEGIN
// DEC-261 — the database call through the client's door.
vi.mock("@/lib/supabase-door", () => ({
  rpc: (...args: unknown[]) => rpc(...args),
NEW-END
src/features/ad-page/report.test.ts:
EDIT src/features/ad-page/report.test.ts #1
OLD-BEGIN
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { rpc: (...args: unknown[]) => rpc(...args) },
OLD-END
NEW-BEGIN
// DEC-261 — the database call through the client's door.
vi.mock("@/lib/supabase-door", () => ({
  rpc: (...args: unknown[]) => rpc(...args),
NEW-END
src/features/ad-page/save.test.ts:
EDIT src/features/ad-page/save.test.ts #1
OLD-BEGIN
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { rpc: (...args: unknown[]) => rpc(...args) },
OLD-END
NEW-BEGIN
// DEC-261 — the database call through the client's door.
vi.mock("@/lib/supabase-door", () => ({
  rpc: (...args: unknown[]) => rpc(...args),
NEW-END
src/features/ad-page/count-view.test.ts:
EDIT src/features/ad-page/count-view.test.ts #1
OLD-BEGIN
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { auth: { getSession: vi.fn().mockResolvedValue({ data: { session: null } }) } },
OLD-END
NEW-BEGIN
// DEC-261 — the session reaches route calls through the client's door.
vi.mock("@/lib/supabase-door", () => ({
  currentSession: async () => ({ session: null, failed: false }),
NEW-END
src/features/legal/legal-reader.test.ts:
EDIT src/features/legal/legal-reader.test.ts #1
OLD-BEGIN
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc } }));
OLD-END
NEW-BEGIN
// DEC-261 — the database call through the client's door.
vi.mock("@/lib/supabase-door", () => ({ rpc }));
NEW-END
src/features/legal/use-legal-gate.test.tsx:
EDIT src/features/legal/use-legal-gate.test.tsx #1
OLD-BEGIN
  vi.mock("@/integrations/supabase/client", () => ({
    supabase: { auth: { getSession: async () => ({ data: { session: session.value } }) } },
OLD-END
NEW-BEGIN
  // DEC-261 — the session through the client's door.
  vi.mock("@/lib/supabase-door", () => ({
    currentSession: async () => ({ session: session.value, failed: false }),
NEW-END
src/features/posting/attribute-options.test.ts:
EDIT src/features/posting/attribute-options.test.ts #1
OLD-BEGIN
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: { getSession: async () => ({ data: { session: { access_token: "t" } } }) },
  },
OLD-END
NEW-BEGIN
// DEC-261 — the session reaches route calls through the client's door.
vi.mock("@/lib/supabase-door", () => ({
  currentSession: async () => ({ session: { access_token: "t" }, failed: false }),
NEW-END
src/i18n/provider.test.tsx:
EDIT src/i18n/provider.test.tsx #1
OLD-BEGIN
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } }),
    },
  },
OLD-END
NEW-BEGIN
// DEC-261 — auth events through the client's door; none arrives in these tests.
vi.mock("@/lib/supabase-door", () => ({
  onAuthChange: () => ({ unsubscribe: () => undefined }),
NEW-END
src/i18n/provider-layers.test.tsx:
EDIT src/i18n/provider-layers.test.tsx #1
OLD-BEGIN
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } }),
    },
  },
OLD-END
NEW-BEGIN
// DEC-261 — auth events through the client's door; none arrives in these tests.
vi.mock("@/lib/supabase-door", () => ({
  onAuthChange: () => ({ unsubscribe: () => undefined }),
NEW-END
C23. src/lib/env-flags.test.ts, this edit (HOOK-1's census gains the new window instrument, `__ethioClientOff`):
EDIT src/lib/env-flags.test.ts #1
OLD-BEGIN
      "src/components/app-shell.tsx: __ethioQueryClient, __ethioSupabase",
OLD-END
NEW-BEGIN
      "src/components/app-shell.tsx: __ethioClientOff, __ethioQueryClient, __ethioSupabase",
NEW-END
C24. scripts/conformance/vendor-seams-allowlist.txt, these edits (the seventeen files that moved onto the door leave the freeze; a stale line fails VS-1):
EDIT scripts/conformance/vendor-seams-allowlist.txt #1
OLD-BEGIN
scripts/feed-bench.ts | direct vendor use before DEC-250 | INC-877
src/components/app-shell.tsx | direct vendor use before DEC-250 | INC-877
src/components/shell/place-carry-service.ts | direct vendor use before DEC-250 | INC-877
src/features/account/account-overview.tsx | direct vendor use before DEC-250 | INC-877
src/features/ad-page/contact.ts | direct vendor use before DEC-250 | INC-877
src/features/ad-page/report.ts | direct vendor use before DEC-250 | INC-877
src/features/ad-page/save.ts | direct vendor use before DEC-250 | INC-877
src/features/admin-ai/ai-service.ts | direct vendor use before DEC-250 | INC-877
OLD-END
NEW-BEGIN
scripts/feed-bench.ts | direct vendor use before DEC-250 | INC-877
src/features/account/account-overview.tsx | direct vendor use before DEC-250 | INC-877
src/features/admin-ai/ai-service.ts | direct vendor use before DEC-250 | INC-877
NEW-END
EDIT scripts/conformance/vendor-seams-allowlist.txt #2
OLD-BEGIN
src/features/admin/audit/audit-service.ts | direct vendor use before DEC-250 | INC-877
src/features/admin/impersonation/impersonation-service.ts | direct vendor use before DEC-250 | INC-877
src/features/admin/legal/legal-service.ts | direct vendor use before DEC-250 | INC-877
src/features/admin/nav-alerts.ts | direct vendor use before DEC-250 | INC-877
src/features/admin/roles/roles-service.ts | direct vendor use before DEC-250 | INC-877
OLD-END
NEW-BEGIN
src/features/admin/audit/audit-service.ts | direct vendor use before DEC-250 | INC-877
src/features/admin/legal/legal-service.ts | direct vendor use before DEC-250 | INC-877
src/features/admin/roles/roles-service.ts | direct vendor use before DEC-250 | INC-877
NEW-END
EDIT scripts/conformance/vendor-seams-allowlist.txt #3
OLD-BEGIN
src/features/auth/mfa/mfa-service.ts | direct vendor use before DEC-250 | INC-877
src/features/auth/use-auth.ts | direct vendor use before DEC-250 | INC-877
src/features/legal/legal-page-data.ts | direct vendor use before DEC-250 | INC-877
src/features/legal/legal-reader.ts | direct vendor use before DEC-250 | INC-877
src/features/legal/use-legal-gate.ts | direct vendor use before DEC-250 | INC-877
src/features/my-listings/my-listing.ts | direct vendor use before DEC-250 | INC-877
src/features/my-listings/my-listings.ts | direct vendor use before DEC-250 | INC-877
src/features/permissions/service.ts | direct vendor use before DEC-250 | INC-877
src/features/posting/posting-service.ts | direct vendor use before DEC-250 | INC-877
OLD-END
NEW-BEGIN
src/features/auth/mfa/mfa-service.ts | direct vendor use before DEC-250 | INC-877
src/features/legal/legal-page-data.ts | direct vendor use before DEC-250 | INC-877
src/features/my-listings/my-listing.ts | direct vendor use before DEC-250 | INC-877
src/features/my-listings/my-listings.ts | direct vendor use before DEC-250 | INC-877
src/features/posting/posting-service.ts | direct vendor use before DEC-250 | INC-877
NEW-END
EDIT scripts/conformance/vendor-seams-allowlist.txt #4
OLD-BEGIN
src/features/posting/use-edit-draft.ts | direct vendor use before DEC-250 | INC-877
src/features/posting/use-price-unit-labels.ts | direct vendor use before DEC-250 | INC-877
src/i18n/bundle.ts | direct vendor use before DEC-250 | INC-877
src/i18n/provider.tsx | direct vendor use before DEC-250 | INC-877
src/lib/signed-in-route.ts | direct vendor use before DEC-250 | INC-877
src/routes/api/listings/assist.ts | direct vendor use before DEC-250 | INC-877
OLD-END
NEW-BEGIN
src/features/posting/use-edit-draft.ts | direct vendor use before DEC-250 | INC-877
src/routes/api/listings/assist.ts | direct vendor use before DEC-250 | INC-877
NEW-END
EDIT scripts/conformance/vendor-seams-allowlist.txt #5
OLD-BEGIN
src/routes/api/listings/photos.$id.ts | direct vendor use before DEC-250 | INC-877
src/routes/auth.tsx | direct vendor use before DEC-250 | INC-877
src/routes/legal.publishing.tsx | direct vendor use before DEC-250 | INC-877
src/routes/settings.tsx | direct vendor use before DEC-250 | INC-877
OLD-END
NEW-BEGIN
src/routes/api/listings/photos.$id.ts | direct vendor use before DEC-250 | INC-877
src/routes/settings.tsx | direct vendor use before DEC-250 | INC-877
NEW-END
Now the whole unit suite (`bun run test:unit`; paste totals — every file that changed must pass), `bun run typecheck`, `bun run lint`. Commit: `turn 34 part C: every first-paint caller onto the door; the tests mock the door`.

PART D — THE GUARDS AND THE CEILINGS.
D1. scripts/bundle-closure.mjs, these edits:
EDIT scripts/bundle-closure.mjs #1
OLD-BEGIN

/** The first closure chunk name that must stay lazy, or null. */
OLD-END
NEW-BEGIN

/**
 * DEC-261 (Foundations turn 34) — WHAT NO FIRST DOWNLOAD MAY CARRY, found by its text:
 * the bundler names a shared chunk after any module grouped into it, so a name prefix
 * cannot find the Supabase client; its auth class's name survives minification.
 */
export const MUST_NOT_CARRY = ["GoTrueClient"];

/** The first chunk of `closureNames` whose text (`textOf(name)`) carries a marker, or null. */
export function carriedViolation(closureNames, textOf, markers = MUST_NOT_CARRY) {
  for (const name of closureNames) {
    const text = textOf(name);
    const marker = markers.find((candidate) => text.includes(candidate));
    if (marker !== undefined) return { name, marker };
  }
  return null;
}

/** The first closure chunk name that must stay lazy, or null. */
NEW-END
EDIT scripts/bundle-closure.mjs #2
OLD-BEGIN
 * with no page, a page over its ceiling, a page `slack` KiB or more under it (the
 * ratchet: lower it), and a public page holding a must-stay-lazy chunk each fail.
 */
export function judgeRouteBudgets({ routeIds, budgets, measure, slack, publicLazy }) {
  // Page ids come from the build's manifest: the ceilings are read as own entries only.
OLD-END
NEW-BEGIN
 * with no page, a page over its ceiling, a page `slack` KiB or more under it (the
 * ratchet: lower it), a public page holding a must-stay-lazy chunk, and a public page
 * whose chunks carry a MUST_NOT_CARRY marker (`carries(closure)`, DEC-261) each fail.
 */
export function judgeRouteBudgets({ routeIds, budgets, measure, slack, publicLazy, carries }) {
  // Page ids come from the build's manifest: the ceilings are read as own entries only.
NEW-END
EDIT scripts/bundle-closure.mjs #3
OLD-BEGIN
      if (lazy) failures.push(`${id}: ${lazy} must stay lazy on a public page (D234)`);
    }
OLD-END
NEW-BEGIN
      if (lazy) failures.push(`${id}: ${lazy} must stay lazy on a public page (D234)`);
      const carried = carries === undefined ? null : carries(closure);
      if (carried)
        failures.push(
          `${id}: ${carried.name} carries ${carried.marker} on a public page (DEC-261)`,
        );
    }
NEW-END
scripts/bundle-closure.test.ts, these edits (BC-13):
EDIT scripts/bundle-closure.test.ts #1
OLD-BEGIN

import {
  entryChunks,
  judgeRouteBudgets,
OLD-END
NEW-BEGIN

import {
  carriedViolation,
  entryChunks,
  judgeRouteBudgets,
NEW-END
EDIT scripts/bundle-closure.test.ts #2
OLD-BEGIN
    }
  });
});
OLD-END
NEW-BEGIN
    }
  });

  it("BC-13 a chunk that carries the Supabase client fails by its text, whatever its name — the entry and a public page (DEC-261)", () => {
    const texts = new Map([
      ["index-a.js", "export const shell = 1;"],
      ["dist-b.js", "class GoTrueClient {}"],
    ]);
    const textOf = (name: string) => texts.get(name) ?? "";
    expect(carriedViolation(["index-a.js"], textOf)).toBeNull();
    expect(carriedViolation(["index-a.js", "dist-b.js"], textOf)).toEqual({
      name: "dist-b.js",
      marker: "GoTrueClient",
    });
    const carries = (closure: string[]) => carriedViolation(closure, textOf);
    const planted = {
      ...sizes,
      "/l/$slug": { kib: 320, closure: ["index-a.js", "dist-b.js"] },
    };
    expect(
      judgeRouteBudgets({
        routeIds: Object.keys(planted),
        budgets: fair,
        measure: (id) => planted[id as keyof typeof planted],
        slack: 8,
        publicLazy: PUBLIC_MUST_STAY_LAZY,
        carries,
      }).failures,
    ).toEqual(["/l/$slug: dist-b.js carries GoTrueClient on a public page (DEC-261)"]);
  });
});
NEW-END
scripts/check-bundle-size.mjs, these edits (the content check on the entry closure and on every public page; the entry's ceiling 257 → 207):
EDIT scripts/check-bundle-size.mjs #1
OLD-BEGIN
  judgeRouteBudgets,
  mustStayLazyViolation,
OLD-END
NEW-BEGIN
  judgeRouteBudgets,
  carriedViolation,
  mustStayLazyViolation,
NEW-END
EDIT scripts/check-bundle-size.mjs #2
OLD-BEGIN
  // DEC-260 (Foundations turn 32, 2026-10-26): the dialog's and the alert dialog's code left it (260.0 → 254.1 measured); the ceiling follows to 257.
  js: 257,
  css: 40,
OLD-END
NEW-BEGIN
  // DEC-260 (Foundations turn 32, 2026-10-26): the dialog's and the alert dialog's code left it (260.0 → 254.1 measured); the ceiling follows to 257.
  // DEC-261 (Foundations turn 34, 2026-10-26): the Supabase client left it (254.0 → 203.6 measured); the ceiling follows to 207.
  js: 207,
  css: 40,
NEW-END
EDIT scripts/check-bundle-size.mjs #3
OLD-BEGIN
  }
  for (const name of closure) eager.add(join(dirname(entry), name));
OLD-END
NEW-BEGIN
  }
  // DEC-261: the Supabase client never rides the first download, whatever its chunk is named.
  const carried = carriedViolation(closure, (name) =>
    readFileSync(join(dirname(entry), name), "utf8"),
  );
  if (carried) {
    console.error(
      `Bundle budget: ${carried.name} carries ${carried.marker} (the Supabase client, DEC-261) in the first-paint closure of ${basename(entry)}.`,
    );
    process.exit(1);
  }
  for (const name of closure) eager.add(join(dirname(entry), name));
NEW-END
EDIT scripts/check-bundle-size.mjs #4
OLD-BEGIN
  publicLazy: PUBLIC_MUST_STAY_LAZY,
  measure: (id) => {
OLD-END
NEW-BEGIN
  publicLazy: PUBLIC_MUST_STAY_LAZY,
  carries: (closure) =>
    carriedViolation(closure, (name) => readFileSync(join(assetsDir, name), "utf8")),
  measure: (id) => {
NEW-END
scripts/check-marketplace-imports.mjs, these edits (src/start.ts walked; the client, the attacher and supabase-js forbidden):
EDIT scripts/check-marketplace-imports.mjs #1
OLD-BEGIN

const ENTRIES = ["src/routes/index.tsx", "src/components/app-shell.tsx", "src/routes/__root.tsx"];
const FORBIDDEN_FILES = [
  "src/i18n/locales/en.ts",
OLD-END
NEW-BEGIN

// DEC-261 (Foundations turn 34): src/start.ts too — its request middleware rides every page.
const ENTRIES = [
  "src/routes/index.tsx",
  "src/components/app-shell.tsx",
  "src/routes/__root.tsx",
  "src/start.ts",
];
const FORBIDDEN_FILES = [
  // DEC-261 — the Supabase client, and the generated attacher that imports it, load through
  // src/lib/supabase-door.ts only.
  "src/integrations/supabase/client.ts",
  "src/integrations/supabase/auth-attacher.ts",
  "src/i18n/locales/en.ts",
NEW-END
EDIT scripts/check-marketplace-imports.mjs #2
OLD-BEGIN
  "cmdk",
];
OLD-END
NEW-BEGIN
  "cmdk",
  // Foundations turn 34 (DEC-261) — the Supabase client loads through src/lib/supabase-door.ts.
  "@supabase/supabase-js",
];
NEW-END
EDIT scripts/check-marketplace-imports.mjs #3
OLD-BEGIN
  if (FORBIDDEN_FILES.includes(relative)) {
    violations.push(
      `${importer ? importer.replace(`${process.cwd()}/`, "") : relative} reaches ${relative} (DEC-231: the full catalogues and the admin strings stay off the first paint)`,
    );
OLD-END
NEW-BEGIN
  if (FORBIDDEN_FILES.includes(relative)) {
    const why = relative.startsWith("src/integrations/supabase/")
      ? "DEC-261: the Supabase client loads through src/lib/supabase-door.ts"
      : "DEC-231: the full catalogues and the admin strings stay off the first paint";
    violations.push(
      `${importer ? importer.replace(`${process.cwd()}/`, "") : relative} reaches ${relative} (${why})`,
    );
NEW-END
scripts/route-budgets.mjs, its whole text (sha256 f7a11e6deed092cc445e3cdaa4307ccfa3d1ef99ff8864ace9450f926f529f12; every page re-measured on the supervisor's build — the comment after each line is its measure; 21 ceilings fall about 50, 29 rise 4–5, and the header says why):
FILE-BEGIN scripts/route-budgets.mjs
/**
 * D234 speed turn S1 — THE PER-PAGE FIRST-DOWNLOAD CEILINGS (KiB, gzip level 6),
 * read by scripts/check-bundle-size.mjs. Every page route the build's route
 * manifest names has one line here (server routes under /api/ have no page and
 * are left out by rule); a page with no line fails the guard, and so does a line
 * whose page is gone. `public` marks a page a visitor opens signed out: its
 * first download must also hold none of PUBLIC_MUST_STAY_LAZY
 * (scripts/bundle-closure.mjs).
 *
 * A RATCHET: each ceiling is the page's measured download plus 3 KiB of
 * build-to-build room, rounded up. A page that grows past its ceiling fails; a page that
 * shrinks 8 KiB or more below it fails too, until its ceiling is lowered in the
 * same commit — so every saving is kept. Raising a ceiling is a commit that says
 * why. Measured 2026-10-26 on the Foundations turn 34 build (DEC-261: the Supabase client left
 * every public page's first download, 49.9–50.4 KiB off each; the comment after each line). The 29
 * signed-in and staff pages whose code still imports the client (the vendor-seams freeze, INC-877)
 * now fetch it as a chunk of its own beside the entry, 3.9–4.0 KiB more than when it rode the
 * entry (the door, the import helper and the client's own compression), and their ceilings rise
 * by that much — a signed-in visitor's client starts downloading as the page's code arrives
 * (src/lib/supabase-door.ts). The three admin pages that import the whole catalogue
 * (/admin/listings_/$listingId, /admin/roles_/$roleId, /admin/translations) carry its member part
 * as a chunk of their own (INC-902).
 */
export const ROUTE_BUDGETS_KIB = {
  "/": { ceiling: 220, public: true }, // 217.0
  "/$name": { ceiling: 219, public: true }, // 215.7
  "/account": { ceiling: 266, public: false }, // 262.9
  "/account_/legal": { ceiling: 209, public: false }, // 205.4
  "/account_/legal_/$versionId": { ceiling: 210, public: false }, // 206.9
  "/account_/saved": { ceiling: 219, public: false }, // 215.8
  "/admin": { ceiling: 208, public: false }, // 204.5
  "/admin/": { ceiling: 209, public: false }, // 205.4
  "/admin/ai": { ceiling: 331, public: false }, // 327.7
  "/admin/attributes": { ceiling: 347, public: false }, // 343.9
  "/admin/audit": { ceiling: 308, public: false }, // 304.1
  "/admin/categories": { ceiling: 356, public: false }, // 352.1
  "/admin/countries": { ceiling: 337, public: false }, // 333.7
  "/admin/coverage": { ceiling: 330, public: false }, // 326.3
  "/admin/images": { ceiling: 209, public: false }, // 205.2
  "/admin/impersonation_/$sessionId": { ceiling: 308, public: false }, // 304.6
  "/admin/legal": { ceiling: 277, public: false }, // 273.9
  "/admin/legal_/$versionId": { ceiling: 277, public: false }, // 273.2
  "/admin/legal_/edit": { ceiling: 283, public: false }, // 279.3
  "/admin/listings": { ceiling: 353, public: false }, // 349.4
  "/admin/listings_/$listingId": { ceiling: 375, public: false }, // 371.7
  "/admin/listings_/$listingId_/edit": { ceiling: 399, public: false }, // 395.1
  "/admin/locations": { ceiling: 270, public: false }, // 266.1
  "/admin/places": { ceiling: 338, public: false }, // 335.0
  "/admin/roles": { ceiling: 306, public: false }, // 302.1
  "/admin/roles_/$roleId": { ceiling: 306, public: false }, // 302.7
  "/admin/screening": { ceiling: 373, public: false }, // 369.5
  "/admin/translations": { ceiling: 408, public: false }, // 404.4
  "/admin/translations_/$lang": { ceiling: 320, public: false }, // 316.6
  "/admin/users": { ceiling: 304, public: false }, // 300.6
  "/admin/users_/$userId": { ceiling: 285, public: false }, // 281.1
  "/auth": { ceiling: 219, public: true }, // 216.0
  "/auth_/callback": { ceiling: 208, public: true }, // 204.5
  "/auth_/reset": { ceiling: 210, public: true }, // 206.5
  "/c/$slug": { ceiling: 220, public: true }, // 217.0
  "/dev/primitives": { ceiling: 223, public: false }, // 219.3
  "/dev/style": { ceiling: 242, public: false }, // 238.1
  "/dev/tall": { ceiling: 207, public: false }, // 203.9
  "/l/$slug": { ceiling: 247, public: true }, // 243.5
  "/legal/$kind": { ceiling: 211, public: true }, // 207.5
  "/legal/accept": { ceiling: 218, public: false }, // 215.0
  "/legal/publishing": { ceiling: 212, public: true }, // 208.2
  "/my-listings": { ceiling: 327, public: false }, // 323.4
  "/my-listings_/$listingId": { ceiling: 315, public: false }, // 311.1
  "/my-listings_/$listingId_/edit": { ceiling: 393, public: false }, // 389.8
  "/post": { ceiling: 393, public: false }, // 389.8
  "/post_/$listingId": { ceiling: 393, public: false }, // 389.8
  "/privacy": { ceiling: 211, public: true }, // 207.5
  "/settings": { ceiling: 271, public: false }, // 267.3
  "/terms": { ceiling: 211, public: true }, // 207.5
};

/** A page this far under its ceiling (KiB) fails until the ceiling is lowered. */
export const RATCHET_SLACK_KIB = 8;
FILE-END scripts/route-budgets.mjs
Then `bunx vitest run scripts/bundle-closure.test.ts` (BC-1…13 passed), `bun run build`, `node scripts/check-bundle-size.mjs` (it must pass, printing `JS: 203.6 KiB / 207 KiB — ok` and `Bundle budget OK.`; paste both lines) and `node scripts/check-marketplace-imports.mjs` (`findings: 0`).
D2. The planted proof (never committed): add these two lines as the first lines of src/components/app-shell.tsx —
import { supabase as plantedClient } from "@/integrations/supabase/client";
void plantedClient.auth;
— and run `node scripts/check-marketplace-imports.mjs`: it must print `findings: 1` and `  src/components/app-shell.tsx reaches src/integrations/supabase/client.ts (DEC-261: the Supabase client loads through src/lib/supabase-door.ts)`; then `bun run build` and `node scripts/check-bundle-size.mjs`: it must exit 1 with `Bundle budget: <chunk>.js carries GoTrueClient (the Supabase client, DEC-261) in the first-paint closure of index-<hash>.js.` (the supervisor's build named `dist-CE1baibP.js` — a name prefix would have missed it); paste the lines. Put the file back with `git checkout -- src/components/app-shell.tsx`, check its sha256 is the hash list's, and run `bun run build` and `node scripts/check-bundle-size.mjs` again (`Bundle budget OK.`). Commit: `turn 34 part D: the client's text off every public first download; the ceilings`.

PART E — THE BROWSER.
E1. NEW e2e/supabase-door.spec.ts (sha256 63e1fad154a78285651ef6f016aec6b4fdcc502725759919b0d6940be6aaa008):
FILE-BEGIN e2e/supabase-door.spec.ts
import type { Page } from "@playwright/test";

import { expect, test } from "./fixtures";

import { adPageFixtures } from "./helpers/ad-page";
import { gotoReady, signInViaSession, signedInMarker } from "./helpers/ui";
import { leaseUser } from "./helpers/users";
import { listingPath } from "../src/features/ad-page/address";

/**
 * DEC-261 (Foundations turn 34) — THE CLIENT'S DOOR IN THE BROWSER. A signed-out
 * visitor's public pages download no Supabase client: no script the page fetches
 * carries the client's auth class (the build guard's marker, scripts/bundle-closure.mjs
 * MUST_NOT_CARRY). The sign-in screen fetches it once it has painted, and a signed-in
 * visitor's stored session starts it at once.
 *
 * An E2E build hands the client to the harness at mount (app-shell.tsx, DEC-018); the
 * init script's `__ethioClientOff` turns that hand-off off, so these tests see what a
 * production visitor's browser does. Scratch rows only (G27): a scratch seller, its own
 * category branch and one scratch ad, reaped in afterEach.
 */

const CLIENT_MARKER = "GoTrueClient";

/** Every script the page fetches, with whether its text carries the client. */
function watchScripts(page: Page) {
  const reads: Array<Promise<{ url: string; carries: boolean }>> = [];
  page.on("response", (response) => {
    if (response.request().resourceType() !== "script") return;
    reads.push(
      response.text().then(
        (text) => ({ url: response.url(), carries: text.includes(CLIENT_MARKER) }),
        () => ({ url: response.url(), carries: false }),
      ),
    );
  });
  return {
    async carriers(): Promise<string[]> {
      const all = await Promise.all(reads);
      return all.filter((read) => read.carries).map((read) => read.url);
    },
  };
}

/** The page has loaded and the browser has had an idle moment (a deferred fetch has started). */
async function settle(page: Page) {
  await page.waitForLoadState("load");
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        if ("requestIdleCallback" in window)
          window.requestIdleCallback(() => resolve(), { timeout: 2000 });
        else setTimeout(resolve, 500);
      }),
  );
}

test.describe("THE CLIENT'S DOOR — the Supabase client off public pages (DEC-261)", () => {
  const { scratchSeller, seed, publicIdOf, cleanup } = adPageFixtures();
  test.afterEach(async () => {
    await cleanup();
  });

  test("SBE-1 signed out: the home, a category, an ad and the terms download no client; the sign-in screen then fetches it", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const ad = await seed(seller, "active");
    const canonical = listingPath(ad.title, await publicIdOf(ad.id));
    await page.addInitScript(() => {
      Object.assign(window, { __ethioClientOff: true });
    });
    const scripts = watchScripts(page);
    for (const path of ["/", `/c/${seller.leafSlug}`, canonical, "/terms"]) {
      await gotoReady(page, path);
      await settle(page);
      expect(await scripts.carriers(), `${path}: no script carries the client`).toEqual([]);
    }
    // The ad page drew for a signed-out visitor through the door (its title and its sign-in link).
    await gotoReady(page, canonical);
    await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
    await page.getByTestId("listing-contact-sign-in").click();
    await expect(page).toHaveURL(/\/auth(?:\?|$)/);
    await expect
      .poll(async () => (await scripts.carriers()).length, {
        message: "the sign-in screen fetched the client",
      })
      .toBeGreaterThan(0);
  });

  test("SBE-2 signed in: the stored session starts the client and the header shows the account", async ({
    page,
  }) => {
    const user = await leaseUser();
    await page.addInitScript(() => {
      Object.assign(window, { __ethioClientOff: true });
    });
    const scripts = watchScripts(page);
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
    expect((await scripts.carriers()).length, "the client was fetched").toBeGreaterThan(0);
  });
});
FILE-END e2e/supabase-door.spec.ts
E2. scripts/e2e-select.ts, this edit (the auth area selects the new spec):
EDIT scripts/e2e-select.ts #1
OLD-BEGIN
      "e2e/smoke-auth-i18n.spec.ts",
      "e2e/nightly/*.spec.ts",
OLD-END
NEW-BEGIN
      "e2e/smoke-auth-i18n.spec.ts",
      "e2e/supabase-door.spec.ts",
      "e2e/nightly/*.spec.ts",
NEW-END
Then `bun run scripts/e2e-select.ts --self-test` (OK) and `bun run e2e:local -- e2e/supabase-door.spec.ts` (both projects; a spec file not fully green is not committed). Commit: `turn 34 part E: SBE-1, SBE-2`.

PART F — DOCS.
F1. docs/features/route-client.md, this edit:
EDIT docs/features/route-client.md #1
OLD-BEGIN
and `keepalive` forward to fetch. Tokens, headers and bodies are never logged.

OLD-END
NEW-BEGIN
and `keepalive` forward to fetch. Tokens, headers and bodies are never logged.
The session is read through the client's door (`currentSession`,
`src/lib/supabase-door.ts`, DEC-261): a signed-out visitor's call fetches no
Supabase client.

NEW-END
F2. docs/governance/mechanisms.md: the line that begins "| 13 | New code reaches a vendor" is replaced by this line:
| 13 | New code reaches a vendor (Supabase, Lovable) only through the project's seam modules | the five seams: `src/integrations/supabase/**`, `src/server/supabase/**`, `src/server/media/storage.ts`, `src/lib/route-client.ts`, `src/lib/supabase-door.ts` (DEC-261, Foundations turn 34) | VS-1…3 in `scripts/conformance/vendor-seams.test.ts` over `vendor-seams-scan.ts`; allowlist `scripts/conformance/vendor-seams-allowlist.txt` (51 physical lines, 49 entries) until INC-877; exit notes `docs/features/vendor-exit.md` | the 49 frozen files (41 Supabase, 8 Lovable), each a reviewed line | a move off Supabase or Lovable is the frozen set | DEC-250; planted-file proof VS-3 |
the line that begins "| 40 |" is replaced by this line:
| 40 | What a page downloads before it can run stays under that page's ceiling; heavy feature modules never reach a public page's first download (D234) | `scripts/check-bundle-size.mjs` + `scripts/bundle-closure.mjs` (route manifest → modulepreload chain → static closure); ceilings in `scripts/route-budgets.mjs` | the bundle-budget CI job; BC-1…BC-13 (`scripts/bundle-closure.test.ts`); `MUST_NOT_CARRY` — a first-paint chunk is judged by its text, whatever its name (DEC-261) | none | a new page is one line (a page without one fails); a new heavy feature is one prefix in `PUBLIC_MUST_STAY_LAZY`, or one marker in `MUST_NOT_CARRY` when the bundler may group it into a shared chunk | Foundations turns 24 (INC-895, INC-896) and 34 |
the line that begins "| 48 |" is replaced by this line (its guard column names OVF-17 and OVF-18, turn 32b's):
| 48 | An overlay primitive's code (the tooltip, the dropdown menu, the dialog, the alert dialog: Radix, floating-ui and their focus, scroll and dismiss layers) waits for the person's intent and never rides a page's first download (D234, DEC-259, DEC-260) | the facades `src/components/ui/tooltip.tsx` and `dropdown-menu.tsx` (the impls' exports) on `OverlayRoot` / `OverlayTrigger` / `OverlayContent`, and `dialog-primitive.tsx` (under `dialog.tsx`, `sheet.tsx`) and `alert-dialog-primitive.tsx` (under `alert-dialog.tsx`) on `ModalRoot` / `ModalTrigger` / `ModalPart` (`src/components/ui/overlay-facade.tsx`); the module `overlays-impl.ts` (re-exports the four impl files) behind `loadOverlays` / `useOverlays` / `warmOverlaysWhenIdle` (`src/components/ui/overlay-loader.ts`, loadOnce) — a tooltip's or a menu's trigger is the consumer's own element from the first render and the real root draws beside it on the first hover or keyboard focus (a tooltip) or press or opening key (a menu), the intent replayed on the same element; a closed modal draws its trigger alone and the real root draws around its children at the first opening (the trigger's click or the owner's `open`); the module is asked for anyway once the page is idle | `scripts/conformance/overlays.test.ts` (CF-OV-1…3: only the impl files reach the four Radix packages, only overlays-impl the impl files, only the loader overlays-impl; each facade exports its impl's names, the modal facades Radix's parts); MUST_STAY_LAZY and PUBLIC_MUST_STAY_LAZY (`overlays-impl`); the weight guard's FORBIDDEN; OVF-1…18; `e2e/overlays.spec.ts` (OVE-1…3) | none | a new overlay primitive is one impl file re-exported by overlays-impl and one facade over the same parts (the popover and the select next — K2); an owner-opened root (`open`, `defaultOpen`) is asked for at once | triggers are asChild only (the types say so); a modal's children are drawn afresh at its first opening; a failed download tells a modal's owner it did not open (INC-908); Foundations turns 31, 32 and 32b |
and directly after the line that begins "| 49 |", this line:
| 50 | The Supabase client (sign-in, the session, database calls) waits for a session and never rides a public page's first download (D234, DEC-261) | `src/lib/supabase-door.ts` — `getSupabase` (loadOnce), `hasStoredSession` and `storedSessionKey` (the client's own storage key; a framed page counts), `onAuthChange` (the client's `onAuthStateChange`; `INITIAL_SESSION` null for a signed-out visitor), `currentSession` (never rejects), `rpc` (the anonymous PostgREST call for a signed-out visitor, the client's own otherwise); `src/lib/session-bearer.ts` (the route calls' bearer, registered in `src/start.ts`) | `src/lib/supabase-door.test.ts` (SBD-1…13); `MUST_NOT_CARRY` + BC-13 (`scripts/bundle-closure.mjs`, `scripts/check-bundle-size.mjs`); the weight guard's FORBIDDEN and FORBIDDEN_FILES (walked from `src/start.ts` too); vendor-seams VS-1 (the door is a seam); `e2e/supabase-door.spec.ts` (SBE-1, SBE-2) | the files still frozen in the vendor-seams allowlist (INC-877) import the client directly — signed-in and staff screens, never a public page (`MUST_NOT_CARRY` judges) | a new database call from code a public page draws is one `rpc()`; a new auth listener one `onAuthChange()`; a new sign-in screen warms the client once painted | the E2E build hands the client to the harness at mount unless a test's init script sets `__ethioClientOff` (SBE); a signed-out listener can hear `INITIAL_SESSION` twice (null, then the client's own); Foundations turn 34 |
F3. docs/features/performance-strategy.md, at its end:
APPEND-BEGIN docs/features/performance-strategy.md
## 17. The Supabase client waits for a session (D234, Foundations turn 34)

DEC-261: the sign-in and database client (`@supabase/supabase-js`, about 52 KiB gzip: auth, realtime, storage, PostgREST) no longer rides any public page's first download. Browser code a public page draws reaches it through one door, `src/lib/supabase-door.ts`:

- `getSupabase()` fetches the client module once (`loadOnce`); every sign-in action, the callback, the reset and the signed-in screens await it.
- A browser that holds a session (the client's own storage key, `sb-<project ref>-auth-token`) or runs in a frame (a Lovable preview's broker) starts the client the moment the door's module is evaluated, beside the page's own code; a signed-out visitor's public page never fetches it. The sign-in screen starts it once it has painted, so a submit does not wait for it.
- `onAuthChange()` is the client's `onAuthStateChange`: a signed-out visitor hears `INITIAL_SESSION` with `null` on the next task, and the listener is attached to the client when the client arrives (a sign-in, another tab's sign-in).
- `currentSession()` answers `null` without the client when nothing is stored, and never rejects.
- `rpc()` calls a database function: for a signed-out visitor without the client it is the anonymous PostgREST call the client itself sends (POST, the publishable key as `apikey`, the bearer only for an old-style anon key), in supabase-js's `{ data, error }` shape; otherwise it is the client's own `rpc`. A function sees the caller it saw before.
- Route calls (`createServerFn`) carry the session's bearer through `src/lib/session-bearer.ts`, registered in `src/start.ts` in place of the platform's attacher, which imports the client.

Measured on the supervisor's build: the entry closure 254.0 → 203.6 KiB; each public page 49.9–50.4 KiB lighter; the 29 signed-in and staff pages whose code still imports the client 3.9–4.0 KiB heavier (it is now a chunk of its own; a signed-in visitor's client starts as the page's code arrives). The frozen rule — at least 45 KiB off the entry closure, every sign-in, sign-up, callback and session test green in CI, AP-54 holding — is judged on this turn's CI run. Guards: check-bundle-size refuses an entry closure or a public page whose chunk text carries `GoTrueClient` (`MUST_NOT_CARRY`, BC-13), whatever the bundler names the chunk; the weight guard forbids `@supabase/supabase-js`, the client module and the attacher on the first-paint walk (from `src/start.ts` too); `e2e/supabase-door.spec.ts` SBE-1 (signed out: the home, a category, an ad and the terms fetch no client; the sign-in screen then fetches it) and SBE-2 (signed in: the stored session starts it).
APPEND-END docs/features/performance-strategy.md
F4. docs/features/ci-guards.md, at its end:
APPEND-BEGIN docs/features/ci-guards.md
## DEC-261 — the Supabase client off the first download

`scripts/bundle-closure.mjs` gains `MUST_NOT_CARRY` (`GoTrueClient`, the client's auth class, whose name survives minification) and `carriedViolation`: `scripts/check-bundle-size.mjs` refuses an entry closure, and `judgeRouteBudgets` a public page, whose chunk text carries a marker — the bundler names a shared chunk after any module grouped into it, so a name prefix cannot find the client (BC-13 on planted chunks; proven on the turn-33 build, where `client-*.js` rode the entry). The weight guard (`scripts/check-marketplace-imports.mjs`) walks from `src/start.ts` too, forbids `@supabase/supabase-js` by value, and stops at `src/integrations/supabase/client.ts` and `auth-attacher.ts` with a DEC-261 finding (proven on a planted import of each). The vendor-seams census names the door, `src/lib/supabase-door.ts`, the fifth seam; the seventeen files that moved onto it left the freeze (49 entries). The entry's ceiling falls 257 → 207 KiB (203.6 measured); every page is re-measured — the 29 signed-in and staff pages that still import the client rise 4–5 KiB (it is now a chunk of its own).
APPEND-END docs/features/ci-guards.md
docs/_changelog.md, at its end:
APPEND-BEGIN docs/_changelog.md
- Foundations turn 34 (2026-10-26) — speed S11 (D234), DEC-261: the Supabase client off every public page's first download — one door, src/lib/supabase-door.ts (getSupabase on loadOnce; onAuthChange, currentSession and rpc answer a signed-out visitor without the client; a stored session or a frame starts it at once; the sign-in screen starts it once painted); the route calls' bearer through src/lib/session-bearer.ts in place of the platform's attacher; twenty modules onto the door (seventeen leave the vendor-seams freeze) and auth-service's storage-key reader onto storedSessionKey; MUST_NOT_CARRY (BC-13) and the weight guard extended; SBD-1…13, SBE-1…2; the entry 254.0 → 203.6 KiB; the 29 signed-in pages that still import the client rise 3.9–4.0 KiB.
APPEND-END docs/_changelog.md
F5. roadmap.md: directly after the turn-34 line STEP 0 wrote, these two lines:
  - [ ] The session clocks' storage key (src/features/session/session-policy.ts :64-:132) onto the door's storedSessionKey, with the census of the e2e session helpers that name the same key (e2e/helpers/session.ts :61, e2e/auth-signout.spec.ts :211) — DEC-261's K2 (Foundations turn 34).
  - [ ] Turn 34b — a failed on-demand download is surfaced to the person, every consumer (INC-911): the step-up gate reports a dialog whose code failed as unavailable, not as cancelled (step-up-gate.tsx :45-:47, use-step-up.ts :75, :89); the map preview logs its failure (map-preview.tsx :108) and the large map shows one (map-large.tsx :73); the footer's silent catch (use-footer-inset.ts :100, INC-909); OVF-19 (an uncontrolled root's listener hears true, then false, then true again); no stale `false` once the owner has closed or reopened; OVF-17 and OVF-18 re-assert the trigger's closed state; the colour reader applies its alpha rule to rgba() too (INC-910's sibling). From turn 32b's reviewer and K2.
F6. AGENTS.md: directly after the line that begins "- Fonts (DEC-262):", add exactly this one line (AGENTS.md then counts 8469 bytes by `wc -c AGENTS.md`):
- Supabase client (DEC-261): browser code a public page draws reaches it only through src/lib/supabase-door.ts (getSupabase, onAuthChange, currentSession, rpc — a signed-out visitor's database call is the anonymous call, no client); route calls carry the bearer through src/lib/session-bearer.ts (never re-register the platform's auth-attacher); no public page's first download carries the client — check-bundle-size (MUST_NOT_CARRY) and the weight guard judge.
F7. `bun run i18n:usage`, then `bun run i18n:map-guard` (the maps move by the two new source files: 1736 keys across 588 files (395 dynamic call sites)).
At the end, roadmap.md's turn-34 line `[x]` with the last code commit and the unit totals appended. Commit: `turn 34 part F: docs, register, changelog, AGENTS.md`.

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34.md | sha256sum -c` — every line prints OK (the list below; a FAILED line is fixed by copying its block again from the saved brief, never by editing an expectation); `git diff <START> --stat -- src/integrations` (empty: no platform file changes); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run typecheck`; `bun run test:unit` (paste totals — the supervisor's run: 307 files, 1918 tests, every one passed); `bun run i18n:map-guard`; `bun run build`; `node scripts/check-bundle-size.mjs` (it must pass: `JS: 203.6 KiB / 207 KiB — ok`); `node scripts/check-marketplace-imports.mjs` (findings: 0); `bash scripts/check-hardcoded-strings.sh` (findings: 0); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
cd49e47ad9f65dfb69ef6d09100238fb33b50ed97196e77288e70d474220d7a8  scripts/conformance/vendor-seams-scan.ts
573d0fb5aa67e3b587143a4dc397192ed98bfd9fbf4e96e2b108eab19da62580  src/start.ts
00c1defea5df4332f0770130494fed5ca6c603aad993e886cfbde7972253375b  src/lib/route-client.ts
1dd6868ba83b02c0708989390184b53c2ab0bfb43bf65fc32377afa6d3bfb35e  src/lib/signed-in-route.ts
2e22918346bf9dc5ffe440215550af837915a598972a6652163c8eb5bd463045  src/features/auth/use-auth.ts
63461418144e9146e3ac410412d657dd4afe636e64d27f642b2558fea0a91ec4  src/features/auth/auth-service.ts
b2dbad5990703115f9a73cdf98aeb6c00ac9a8a090383a625eb625331ac7dde9  src/i18n/provider.tsx
54c2f86a4ef835722d24f2b101209af5502b3a8fe1c1f9bd5ade57a745002565  src/i18n/bundle.ts
851e2f056e6d63b6913a75e9a7cedfc052d8ba323456da215828299059518081  src/features/legal/legal-reader.ts
cf443286c171ca98f3016c7c4ca15e3a11acfd9da12cb53c24f222f3651b16fd  src/features/legal/use-legal-gate.ts
0b21f3c5f8b5d7301a095f3d51c0b23f84e20e9c28fe51e8ad94da416e572101  src/features/permissions/service.ts
45d7cb293606ae36c1fc872fb840c3837cf902e31696715e635fe81e88dfe6a9  src/features/admin/nav-alerts.ts
7cd7e2d064a3eec1b3ac7f273f1c481d4520ec28d4bdece5aebfd262e3344caa  src/features/admin/impersonation/impersonation-service.ts
a7a7eb042ab58d90de8066750c5d7d96811e53ed7643bc0cd20400bad3877b5f  src/components/shell/place-carry-service.ts
3d95ff6b6ce1525fcaa3089c931d906750c90ce7ee1aedad74a851d66df7c3e5  src/features/posting/use-price-unit-labels.ts
0d5b8174df0ae753a4574378c8da965e03f48df7a70ce9389cf5aff35a240735  src/features/ad-page/save.ts
77eee2718a4bfbb76eaad332751c7239f543e33914bb3888e5752fa8a5872fe8  src/features/ad-page/contact.ts
77e4996857978defed17bb139f5e9ea1d5b20bba2a1e295a7e935780f5d19263  src/features/ad-page/report.ts
f39f87b4eb231475e24c45cebaa914ca2c522096d6b5c4f365373452bca6c0ca  src/components/app-shell.tsx
33e691555028059c53ff6746502b208e0b262c3252eaa2575f1b823e10154ed1  src/routes/auth.tsx
738fa0da29a07237bb299d9c0824a2ca8cd6e9dce90ad21cb613a30645b6c28c  src/routes/settings.tsx
565abff39643574dca3f4d8e78449f40d740172c82a4dde29c2411e107a6773e  src/routes/legal.publishing.tsx
9766909782c60180ef44b9b83f6ccfcd98496b48e78f451c3a28d1b2eeea89b5  src/lib/route-client.test.ts
87168e52250fe09c031cb12ec38fda7f5b30b136e73f147878edda4a97a26551  src/lib/signed-in-route.test.ts
731e519e8bb2b28b157ae35d32a5b8ec86458ecd941417e2c55c6edddab28ece  src/features/ad-page/contact.test.ts
04f032df3eb97b11063ecd7a23b3b21705c98fd978c3765328a2b66a9d8563ce  src/features/ad-page/report.test.ts
597e8ffaa1958d0bd8f29a4193fa196760b3248f509655dd40d1fcabedc93e8e  src/features/ad-page/save.test.ts
9c5b8a42b2ee41a9b5d7889809cea112b1506012027015db6fbedcc2021c9f63  src/features/ad-page/count-view.test.ts
12c4abd71d8d47f9c63c33c85a978403a5cfcb9270115dc88b30032dfa9bc6d9  src/features/legal/legal-reader.test.ts
2f1232b295377c573221f064a32e4f7b4f4c602cdebacda34f90b6f35be149ba  src/features/legal/use-legal-gate.test.tsx
f0a83322c4ae264c580b1b498e0fdfe8e440c022ab4efc20cc3776f278dd94bb  src/features/posting/attribute-options.test.ts
2ba6452d96a292d9e4682e81625f7387e6cd6a28447301702703ddc3804cd5de  src/i18n/provider.test.tsx
c3c2589d0fc5de9bfffb6d3c1cc5de85a4fbed719071b67b36f435d3d3a0c867  src/i18n/provider-layers.test.tsx
02eead7e9a346256512ec05b9a8a42b94794f62bdb6665105e29f8cb31e04947  src/lib/env-flags.test.ts
d175c0562b3797f15fd877cd4a453ef94a281e500e3473a560b92c99674a9dab  scripts/conformance/vendor-seams-allowlist.txt
959e4dee73fb70d17808f81712e4a3906bc2780eb7d66140b627dd7b48628acc  scripts/bundle-closure.mjs
5e3ccaa96b6b98b25ddb2317157f68bd0c3316b327a001f6c447b9e0c1bf9f44  scripts/bundle-closure.test.ts
4a2547cccf3d476aec930a121d094d5a0c3097bcb4af2ab614713aa762de6c73  scripts/check-bundle-size.mjs
0b2a208b242f40be68c2da2d26aaba8b07ad5614cd3d0ae40c7f550ed93f6472  scripts/check-marketplace-imports.mjs
3de936109e5e19cdbeecbab53fc4b501123bd1519f5328292c4f2c1f0f48a0e7  scripts/e2e-select.ts
27937cc20d3928b8d2250c516e78c04ecf5be26b5eeb467b09b1ea83f71400ea  docs/features/route-client.md
6d2daaaef669cd337ee8c9fed8da22f15d77d3343497285a259e444b16672746  docs/features/performance-strategy.md
68266a6e7f111071c1e73568132b039c908858865b792ee8dba1582c1cf5bd03  docs/features/ci-guards.md
116cd4a42abd8cd176561333a1c41945e9c2968ed63fd3d8d6b15ee24d6bb2cd  docs/_changelog.md
8bf67ec3100f46bde5d769af1d58d5b650ab51a386c1bae3f665b2e96a54dcd1  AGENTS.md
f924d23a8f8abe8796660c42f80530bb8e98003e809545d669efc254a39cd5dc  src/lib/supabase-door.ts
ba0fddfb49b8600ea07d72ec1924b1a6cd8618a3cb40e7c3aa7a8042c2a2cae9  src/lib/supabase-door.test.ts
b0c0f7ee5d2d557ff38077e215e25f5acda3e01834945270a5d3d8a286ca3638  src/lib/session-bearer.ts
c69050c4db269d24103e537a651c98a688b3c504e9bcd986dbe5e434170190e1  scripts/conformance/route-client-allowlist.txt
63e1fad154a78285651ef6f016aec6b4fdcc502725759919b0d6940be6aaa008  e2e/supabase-door.spec.ts
f7a11e6deed092cc445e3cdaa4307ccfa3d1ef99ff8864ace9450f926f529f12  scripts/route-budgets.mjs
de0b0910c8b6abb2fe10cdb6a4ea7051e978c6c12417a605db15c288619d416e  docs/governance/mechanisms.md

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>` with the `--grep` named; both projects, 0 retries, fake mode; CI runs every test): e2e/supabase-door.spec.ts whole; e2e/smoke-auth-i18n.spec.ts whole; e2e/auth-signout.spec.ts whole; e2e/auth-callback.spec.ts whole; e2e/auth-reset.spec.ts whole; e2e/auth-signin-errors.spec.ts whole; e2e/legal-accept.spec.ts whole; e2e/i18n-bundle.spec.ts whole; e2e/ad-page.spec.ts `--grep "AP-23 |AP-26 |AP-29 |AP-54 "` (contact, save and report through the door; the server's first cards kept); paste every count line and the server log's `[ssr-error]` count by path.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34.report.md, with the twelve headings of .claude/rules/60-report.md, carrying: done or not done by part and step (1); the file list from `git diff --name-only <START>` (2); the behaviour contract — a signed-out visitor's home, category, ad and terms pages (the client fetched or not, the first auth event), a sign-in, a signed-in reload, a server function call's bearer, before → after (3); the consumer census with file:line, re-located at <START> (4); SBD, BC-13 and SBE lines, the unit totals, the E2E count lines (5); the K2 lists, file:line (6); the guards' counts and D2's proof lines (7); "none" for strings and migrations with the check that proves it (8, 9); every departure with its reason (10); the first six lines of ci-status.md for the last commit you can read (11); every limit (12). Its "Final commit" is your last code commit. Commit it on its own (`turn 34: report`), run bun .claude/hooks/land.ts with a Bash timeout of 1800000 ms, and END THE TURN when it prints LANDED or HELD; the supervisor reads it.
```
