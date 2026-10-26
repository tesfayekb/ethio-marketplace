# Foundations — turn 34c-1: a session the browser could not read is unknown, never signed out (INC-914) — every reader of the session reads its failure, the route error view's one cure is Refresh, and the reset and confirmation screens no longer call a good link dead: brief (saved unchanged, 2026-10-26)

```text
FOUNDATIONS — TURN 34c-1 (2026-10-26; INC-914; INC-918's class; anchors located at eb95b9e42b0a822d49993c7c9148243d53c54aec). The first half of turn 34c's roadmap line: a signed-in visitor whose session cannot be read — the sign-in code did not download, or its session read threw — was shown Sign in, sent to the sign-in page from a signed-in page and told on the reset and confirmation screens that a good link was dead, while its server calls went out as a visitor's without a word. The rest of turn 34c's line (turn 32b's guard debt, the session clocks' key, the strings layers' retry, INC-930) is turn 34c-2. Tier A (the session's readers; the door-step; the sign-in screens' answers). No migration. No string (common.refreshPage and common.loadFailed exist). No package change. AGENTS.md: one clause added to its Supabase-client line (EDIT below). No file deleted. Base: dev eb95b9e42b0a822d49993c7c9148243d53c54aec (turn 34b-4's landing). The supervisor sends this brief directly (the operator is away). ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — red first; C — the readers; D — docs and the roadmap; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN.
BASE: eb95b9e42b0a822d49993c7c9148243d53c54aec
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
e2e/supabase-door.spec.ts
scripts/conformance/session-reads.test.ts
src/features/auth/auth-client.test.ts
src/features/auth/auth-service.ts
src/features/auth/types.ts
src/features/auth/use-auth.test.tsx
src/features/auth/use-auth.ts
src/features/legal/use-legal-gate.ts
src/lib/session-bearer.test.ts
src/lib/session-bearer.ts
src/lib/signed-in-route.test.ts
src/lib/signed-in-route.ts
src/lib/supabase-door.test.ts
src/lib/supabase-door.ts
src/routes/__root.tsx
src/routes/auth_.callback.tsx
src/routes/auth_.reset.tsx
src/routes/root-error.test.tsx
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: a session the browser could not read is UNKNOWN — never a signed-out visitor: no Sign in shown to a signed-in visitor, no sign-in page for a door-step page, no "dead link" on a good link; a server call made without the session says so.
MECHANISM: src/lib/supabase-door.ts `currentSession()` — it already answered `{ session, failed }`; it now answers `SessionRead` (`{ session, failed: false }` or `{ session, failed: true, error }`), so a reader that says so has the failure's words — and every reader reads `failed`. `failed` means the read did not happen: the client did not download, getSession() threw, or a refresh of an expired session never reached the server (auth-js's AuthRetryableFetchError — offline, a timeout; the session stays stored). A refresh the server refused (a revoked or expired refresh token — auth-js has removed the session and announced SIGNED_OUT) is a signed-out visitor, known: `{ session: null, failed: false }` (at BASE every getSession() error was `failed`) — SBD-20. Register row 54 (added in Part D).
CONSUMERS (grep of `currentSession(` in src/ at BASE, every one):
- src/features/auth/use-auth.ts :115 — read `{ session }` only: a failed read set the visitor signed out (Sign in in the header, the live guard's moves) → unknown: the state stays "loading" (src/components/shell/app-header.tsx :250 and bottom-bar.tsx :70 draw neither Sign in nor the account; the live guard and the peek, app-rail.tsx :836, wait on authLoading) and the shell's one notice offers Refresh (`reportOnDemandFailure("the session", error)`); a later auth event (the client arriving, a token refreshed) settles it — UA-1, UA-2;
- src/lib/signed-in-route.ts :15 requireSignedIn — a failed read sent a signed-in visitor to /auth (which sends a session-holder home) → it throws, and the route error view shows — SIR-3;
- src/lib/session-bearer.ts :17 — no bearer, silently → no bearer, said (`[session-bearer] the session could not be read: …`) — SBB-3;
- src/features/auth/auth-service.ts :675 fetchPreferredLanguage, :698 savePreferredLanguage — "no session" → "the session could not be read";
- src/features/legal/use-legal-gate.ts :87 landAfterSignIn — lands where it was going, now logged (`[client-error] legal landing: …`): the legal gate's own check is the in-app net;
- src/lib/route-client.ts :73 — already reads `failed` (unchanged; a refresh the server refused now reaches it as a signed-out caller — no bearer, the server's own refusal — instead of a failed read);
and the readers of the same failure one level up: src/features/auth/auth-service.ts `hasSessionRehydrating` / `completeEmailVerification` returned "no session" / "a link with an error" when the sign-in code did not load → `sessionRehydration()` ("session" | "none" | "unavailable" — the client not downloaded, or its session read thrown; hasSessionRehydrating keeps its boolean for /auth, false and never a rejection on a throw — ASC-6) and `VerificationResult`'s `{ ok: false, unavailable: true }`: src/routes/auth_.reset.tsx and src/routes/auth_.callback.tsx draw LoadFailedHere (Refresh) for "unavailable" instead of "this link is no longer valid"; the reset submit gets its `finally` (a throw never leaves the button busy).
The route error view (src/routes/__root.tsx ErrorContent): "Try again" (router.invalidate + reset) cannot work after a failed download — the browser keeps it for the page's life (INC-918) — so its button is Refresh (`refreshPage`, common.refreshPage) on the shared Button — REV-1. The other route error views (legal.publishing's, terms', privacy's, legal.$kind's) draw the document's own "not available" page and offer no retry — K2 lists them.
COVERED HERE: every consumer above. LEFT: INC-931 — auth-service.ts `rehydrate` (/auth's and /auth/reset's mount read) evicts an expired session whose refresh never reached the server (DEC-076's eviction, written for a refresh the server refused): turn 34c-2, with its DEC; and turn 34c-2 — turn 32b's guard debt, the session clocks' key, useStringsLayers().retry, INC-930.
CONFORMANCE GUARD: scripts/conformance/session-reads.test.ts (BLOCK 1) — CF-SESSION-1: every call of `currentSession()` in src/ (the door itself excepted) reads `failed` (destructured, `.failed` on the held answer in the same function, or in the `.then` callback) — red on BASE (it names use-auth, requireSignedIn, the bearer, the two language reads and the legal landing); CF-SESSION-2: the census names three planted session-only readers and passes the three ways to read `failed`.
EXCEPTIONS: none.
FIVE LENSES — security: a signed-in visitor is no longer handed to the sign-in page by a failed read (a session-holder bounced between /auth and home); server functions still answer an unread session as a visitor (no bearer — the server stays the authority) and now say so · performance: none — the same reads, one more field · failure modes: the subject — a failed read is unknown, said once (the shell's notice or the route error view), cured by a refresh, healed by the next auth event · consistency: one meaning of a failed session read for every reader; one cure (Refresh) on every error view that can only be cured so · future growth: a new reader is named by CF-SESSION-1 the day it lands.
FORWARD-SCAN: turns 35–37 add signed-in screens (requireSignedIn, already covered) and readers (CF-SESSION-1). REGISTER: row 54 added; AGENTS.md's Supabase-client line gains the rule (Part D).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34c-1.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). The roadmap's lines change in Part D only.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>; it must be BASE — if not, paste `git diff --name-only BASE..HEAD`; a path in SCOPE is a STOP); STEP 0; Parts B–D; THE CHECKS; THE END-TO-END CHECK; the reviewer; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. SBE-6 leases one account; nothing else in e2e/ changes.
- Run no stateful git command. Every FILE block is the file's whole text — write it with your file-writing tool; every EDIT block replaces its OLD text (exactly once at BASE) with its NEW text, in the order given; copy them by script or your file-editing tool from the saved brief (docs/governance/briefs/foundations-turn-34c-1.md), never retyped and never from memory — if your context is compacted mid-turn, re-read the saved brief before the next block. THE CHECKS run the brief's hash list against the tree (`sha256sum -c`); a mismatch is fixed by copying the block again, never by editing an expectation. docs/generated/i18n-usage.json and public/i18n-usage.json are regenerated (`bun run i18n:usage`), never edited. No NEW or FILE block carries a non-null assertion (your platform rule; checked by the supervisor's script).
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-34c-1.md, roadmap.md, AGENTS.md, docs/_changelog.md, docs/governance/mechanisms.md, docs/generated/i18n-usage.json, public/i18n-usage.json and docs/governance/reports/foundations-turn-34c-1.report.md (your completion report). Anything else is a STOP naming the file and why.
- Your platform rule stands: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." After Part C, read /tmp/observability/build-errors.log and fix every `error TS` line at its root (no `!`, cast, `any` or `@ts-expect-error`); run the tests the part touched.
- RED FIRST (G38): Part B shows CF-SESSION-1, UA-1, SIR-3, SBB-3, REV-1 and SBD-11, SBD-15, SBD-20 failing on BASE's code before Part C's edits (auth-client.test.ts lands with Part C: ASC-1's answers for the new export and the new verification answer, and ASC-6, which reads a function BASE has not).
- Known limits, not yours: EXH-11, EXH-12, EXH-17, EXH-19 can time out in your sandbox (INC-890); AAN-1 and CF-SL-1, CF-SL-3, CF-SL-6 can time out under the full run's load and pass alone (INC-921). Do not change, skip or work around them; paste their failure lines and the single-file run under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS and the tests each part touched as you go; the browser specs through `bun run e2e:local -- <spec file>` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); no local repeat runs (DEC-184); a run the ceiling kills is reported, never re-run in the background (S407). Before a run, nothing of a previous run may still hold port 4173 — stop it first.
- Behaviour contract: with the session read succeeding, every page, header, door-step, server call, language read, landing, reset and confirmation behaves as today. Changed: a failed read leaves the visitor unknown (no Sign in, no account, the shell's notice with Refresh); a door-step page shows the route error view (Refresh) instead of the sign-in page; the route error view's Try again is Refresh; the bearer and the language reads say the read failed; the reset and confirmation screens show LoadFailedHere when their code did not load; the reset submit always gives its button back; a refresh the server refused reads as signed out everywhere (route-client included), as use-auth and requireSignedIn read it at BASE. Nothing else changes.
- Knowledge K: K1 the mechanism above; K2 the report lists (file:line) every other place that reads a session or a user without its failure (the synchronous `__ethioSupabase` readers in e2e/ included — listed, not changed: turn 34c-2), every error view that offers a retry for what only a refresh can cure, and every screen that calls a link dead or a person signed out when its code did not load — in scope or not; K3 the guard lands with the fix; K4 no literal language code or country; K5, K6 do not arise.
- Tests (G27, G38): no real row; no assertion loosened — SBD-11 and SBD-15 expect the failure's error with the failed read (exact shape), SBD-20 is new (a refresh that never reached the server is `failed` and said; one the server refused is signed out), SIR-3, SBB-3's said-so line, UA-1/2, REV-1, CF-SESSION-1/2 and SBE-6 are new, ASC-1's answers for `sessionRehydration` and `completeEmailVerification` follow the new answers, ASC-6 is new (a session read that throws is "unavailable" to the reset screen); every other test unchanged.
- The reviewer: after THE END-TO-END CHECK, run your independent review on the last code commit and put its verdict in the report; a BLOCKER is fixed and reviewed again; a MAJOR in SCOPE and provable is fixed, otherwise listed with its reason.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on BASE (CI run 40384938946, turn 34b-4's landing; it carries turn 34w-2's code too) — green, or still running; a red there is read and named). Any other red on BASE is fixed first at its root (G21, G38) and named in the report.

PART B — RED FIRST (nothing in this part is a fix).
B1. The census — BLOCK 1 (scripts/conformance/session-reads.test.ts); the readers' tests — BLOCK 2 (src/features/auth/use-auth.test.tsx), BLOCK 3 (src/routes/root-error.test.tsx); and:
EDIT src/lib/supabase-door.test.ts #1
OLD-BEGIN
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const { currentSession } = await door();
    expect(await currentSession()).toEqual({ session: null, failed: true });
    expect(warn).toHaveBeenCalledWith("[supabase-door] the session read failed: offline");
    warn.mockRestore();
  });

  it("SBD-13 a framed page (a Lovable preview's broker) starts the client at once, with nothing stored", async () => {
    // With nothing stored, only the frame can start the client: the proof is the call's path.
OLD-END
NEW-BEGIN
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const { currentSession } = await door();
    // INC-914 — the failed read carries its error for the reader that says so.
    expect(await currentSession()).toEqual({
      session: null,
      failed: true,
      error: new Error("offline"),
    });
    expect(warn).toHaveBeenCalledWith("[supabase-door] the session read failed: offline");
    warn.mockRestore();
  });

  it("SBD-20 a refresh that never reached the server leaves the session unread; one the server refused is a signed-out visitor (INC-914)", async () => {
    window.localStorage.setItem(STORED, "{}");
    const offline = Object.assign(new Error("Failed to fetch"), {
      name: "AuthRetryableFetchError",
    });
    state.getSession.mockResolvedValueOnce({ data: { session: null }, error: offline });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const { currentSession } = await door();
    expect(await currentSession()).toEqual({ session: null, failed: true, error: offline });
    expect(warn).toHaveBeenCalledWith(
      "[supabase-door] the session could not be refreshed: Failed to fetch",
    );
    const refused = Object.assign(new Error("Invalid Refresh Token: Refresh Token Not Found"), {
      name: "AuthApiError",
    });
    state.getSession.mockResolvedValueOnce({ data: { session: null }, error: refused });
    expect(await currentSession()).toEqual({ session: null, failed: false });
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });

  it("SBD-13 a framed page (a Lovable preview's broker) starts the client at once, with nothing stored", async () => {
    // With nothing stored, only the frame can start the client: the proof is the call's path.
NEW-END
EDIT src/lib/supabase-door.test.ts #2
OLD-BEGIN
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const { currentSession } = await door();
    expect(await currentSession()).toEqual({ session: null, failed: true });
    expect(warn).toHaveBeenCalledWith(
      expect.stringMatching(/^\[supabase-door\] the client did not load: /),
OLD-END
NEW-BEGIN
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const { currentSession } = await door();
    // INC-914 — the failed read carries the download's error for the reader that says so.
    expect(await currentSession()).toEqual({
      session: null,
      failed: true,
      error: expect.anything(),
    });
    expect(warn).toHaveBeenCalledWith(
      expect.stringMatching(/^\[supabase-door\] the client did not load: /),
NEW-END
EDIT src/lib/signed-in-route.test.ts #1
OLD-BEGIN

  it("SIR-2 a session answers the user's id", async () => {
OLD-END
NEW-BEGIN

  it("SIR-3 a session that could not be read is unknown: the route's error view, never the sign-in page (INC-914)", async () => {
    currentSession.mockResolvedValue({ session: null, failed: true, error: new Error("offline") });
    const failure = await requireSignedIn("/settings").catch((thrown: unknown) => thrown);
    expect(failure).not.toMatchObject({ options: { to: "/auth" } });
    expect(String(failure)).toContain("the session could not be read: offline");
  });

  it("SIR-2 a session answers the user's id", async () => {
NEW-END
EDIT src/lib/session-bearer.test.ts #1
OLD-BEGIN

  it("SBB-3 a failed session read: no header and no throw", async () => {
    door.currentSession.mockResolvedValue({ session: null, failed: true });
    expect(await headersSent()).toEqual({ headers: {} });
  });
OLD-END
NEW-BEGIN

  it("SBB-3 a failed session read: no header and no throw, and it says so (INC-914)", async () => {
    door.currentSession.mockResolvedValue({
      session: null,
      failed: true,
      error: new Error("offline"),
    });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    expect(await headersSent()).toEqual({ headers: {} });
    expect(warn).toHaveBeenCalledWith("[session-bearer] the session could not be read: offline");
    warn.mockRestore();
  });
NEW-END
B2. Run `bunx vitest run scripts/conformance/session-reads.test.ts src/features/auth/use-auth.test.tsx src/routes/root-error.test.tsx src/lib/supabase-door.test.ts src/lib/signed-in-route.test.ts src/lib/session-bearer.test.ts` — the supervisor's run on BASE: `Tests  8 failed | 23 passed (31)`: CF-SESSION-1 (`expected 'src/features/auth/auth-service.ts:675…' to be ''` — BASE's readers named), SBD-11, SBD-15 and SBD-20 (`expected { session: null, failed: true } to deeply equal { session: null, failed: true, …(1) }`), UA-1 (`expected "vi.fn()" to be called with arguments: [ 'the session', …(1) ]`), SIR-3 (a 307 to /auth), SBB-3 (`expected "warn" to be called with arguments`), REV-1 (`expected <button …(1)></button> to be null` — the Try again button) — paste the failure lines and the totals.

PART C — THE READERS.
C1. The door's answer carries the failure:
EDIT src/lib/supabase-door.ts #1
OLD-BEGIN

/**
 * The current session: null without the client when nothing is stored. Never a
 * rejection: a client that did not load answers `failed` (logged), as a failed
 * getSession() did.
 */
export async function currentSession(): Promise<{ session: Session | null; failed: boolean }> {
  if (door.ready() === null && !hasStoredSession()) return { session: null, failed: false };
OLD-END
NEW-BEGIN

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
NEW-END
EDIT src/lib/supabase-door.ts #2
OLD-BEGIN
    logLoadFailure(error);
    return { session: null, failed: true };
  }
OLD-END
NEW-BEGIN
    logLoadFailure(error);
    return { session: null, failed: true, error };
  }
NEW-END
EDIT src/lib/supabase-door.ts #3
OLD-BEGIN
    const { data, error } = await client.auth.getSession();
    // As route-client read it before: any error is a failed read.
    return { session: data.session, failed: Boolean(error) };
  } catch (error) {
OLD-END
NEW-BEGIN
    const { data, error } = await client.auth.getSession();
    if (error === null) return { session: data.session, failed: false };
    // getSession()'s one error is a failed refresh of an expired session. A refresh the server
    // refused (a revoked or expired refresh token) has removed the session and announced
    // SIGNED_OUT: a signed-out visitor, known. One that never reached the server (auth-js's
    // AuthRetryableFetchError — offline, a timeout) leaves the session stored and unread: unknown
    // until the next refresh (INC-914).
    if (error.name !== "AuthRetryableFetchError") return { session: null, failed: false };
    console.warn(`[supabase-door] the session could not be refreshed: ${errorText(error)}`);
    return { session: data.session, failed: true, error };
  } catch (error) {
NEW-END
EDIT src/lib/supabase-door.ts #4
OLD-BEGIN
    console.warn(`[supabase-door] the session read failed: ${errorText(error)}`);
    return { session: null, failed: true };
  }
OLD-END
NEW-BEGIN
    console.warn(`[supabase-door] the session read failed: ${errorText(error)}`);
    return { session: null, failed: true, error };
  }
NEW-END
C2. The readers:
EDIT src/features/auth/use-auth.ts #1
OLD-BEGIN
    void currentSession().then(({ session }) => {
      void applyUser(session?.user?.id, session?.user?.email);
OLD-END
NEW-BEGIN
    void currentSession().then((read) => {
      // INC-914 (Foundations turn 34c) — a session the browser could not read is UNKNOWN, never
      // signed out: the state stays "loading" (the header draws neither Sign in nor the account;
      // the live guard and the peek wait), the shell's one notice offers the cure, a refresh, and a
      // later auth event (the client arriving, a token refreshed) settles it.
      if (read.failed) {
        reportOnDemandFailure("the session", read.error);
        return;
      }
      void applyUser(read.session?.user?.id, read.session?.user?.email);
NEW-END
EDIT src/lib/signed-in-route.ts #1
OLD-BEGIN
import { redirect } from "@tanstack/react-router";
import { currentSession } from "@/lib/supabase-door";
OLD-END
NEW-BEGIN
import { redirect } from "@tanstack/react-router";
import { errorText } from "@/lib/error-text";
import { currentSession } from "@/lib/supabase-door";
NEW-END
EDIT src/lib/signed-in-route.ts #2
OLD-BEGIN
  // DEC-261 — through the client's door: a signed-out visitor is sent on without the client.
  const { session } = await currentSession();
  const user = session?.user ?? null;
  if (user === null) throw redirect({ to: "/auth", search: { return: returnTo } });
OLD-END
NEW-BEGIN
  // DEC-261 — through the client's door: a signed-out visitor is sent on without the client.
  const read = await currentSession();
  // INC-914 (Foundations turn 34c) — a session the browser could not read is UNKNOWN: the page
  // shows the route's error view, whose one cure is a refresh — never the sign-in page, which
  // a signed-in visitor would be sent to (and, holding a session, sent back from).
  if (read.failed) throw new Error(`the session could not be read: ${errorText(read.error)}`);
  const user = read.session?.user ?? null;
  if (user === null) throw redirect({ to: "/auth", search: { return: returnTo } });
NEW-END
EDIT src/lib/session-bearer.ts #1
OLD-BEGIN

import { currentSession } from "@/lib/supabase-door";
OLD-END
NEW-BEGIN

import { errorText } from "@/lib/error-text";
import { currentSession } from "@/lib/supabase-door";
NEW-END
EDIT src/lib/session-bearer.ts #2
OLD-BEGIN
  async ({ next }) => {
    const { session } = await currentSession();
    const token = session?.access_token;
    return next({
OLD-END
NEW-BEGIN
  async ({ next }) => {
    const read = await currentSession();
    // INC-914 — a session that could not be read sends no bearer (as a signed-out call does), and
    // says so: the server function answers as for a visitor, and the page's own refusal shows.
    if (read.failed)
      console.warn(`[session-bearer] the session could not be read: ${errorText(read.error)}`);
    const token = read.session?.access_token;
    return next({
NEW-END
EDIT src/features/legal/use-legal-gate.ts #1
OLD-BEGIN
import { useQuery, type QueryClient } from "@tanstack/react-query";
import { currentSession } from "@/lib/supabase-door";
OLD-END
NEW-BEGIN
import { useQuery, type QueryClient } from "@tanstack/react-query";
import { errorText } from "@/lib/error-text";
import { currentSession } from "@/lib/supabase-door";
NEW-END
EDIT src/features/legal/use-legal-gate.ts #2
OLD-BEGIN
    void navigate(replace === undefined ? { href: target } : { href: target, replace });
  const { session } = await currentSession();
  const userId = session?.user?.id;
  if (!userId) return land(href);
OLD-END
NEW-BEGIN
    void navigate(replace === undefined ? { href: target } : { href: target, replace });
  const read = await currentSession();
  // INC-914 — a session that could not be read lands where it was going, logged: the legal
  // gate's own check (LegalGate, the in-app net) runs once the session is read.
  if (read.failed) {
    console.error(
      `[client-error] legal landing: the session could not be read: ${errorText(read.error)}`,
    );
    return land(href);
  }
  const userId = read.session?.user?.id;
  if (!userId) return land(href);
NEW-END
C3. The sign-in screens' reads and the route error view:
EDIT src/features/auth/types.ts #1
OLD-BEGIN
export type VerificationResult = { ok: true } | { ok: false; hadError: boolean };
OLD-END
NEW-BEGIN
export type VerificationResult =
  | { ok: true }
  | { ok: false; hadError: boolean }
  // INC-914 (Foundations turn 34c) — the client did not load: neither a confirmation nor a dead link.
  | { ok: false; unavailable: true };
NEW-END
EDIT src/features/auth/auth-service.ts #1
OLD-BEGIN
export async function hasSessionRehydrating(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  const supabase = await authClient();
  if (supabase === null) return false;

  const direct = (await supabase.auth.getSession()).data.session;
OLD-END
NEW-BEGIN
export async function hasSessionRehydrating(): Promise<boolean> {
  return (await sessionRehydration()) === "session";
}

/**
 * INC-914 (Foundations turn 34c) — the same read, with a client that did not load kept apart
 * from "no session": the reset screen says the page did not load (and offers a refresh) rather
 * than calling a good link dead.
 */
export async function sessionRehydration(): Promise<"session" | "none" | "unavailable"> {
  if (typeof window === "undefined") return "none";
  const supabase = await authClient();
  if (supabase === null) return "unavailable";
  try {
    return (await rehydrate(supabase)) ? "session" : "none";
  } catch (error) {
    // The client loaded; its own session read threw: unread, never "no session".
    console.warn(`[auth] the session could not be read: ${errorText(error)}`);
    return "unavailable";
  }
}

async function rehydrate(supabase: Client): Promise<boolean> {
  const direct = (await supabase.auth.getSession()).data.session;
NEW-END
EDIT src/features/auth/auth-service.ts #2
OLD-BEGIN
  const supabase = await authClient();
  if (supabase === null) return { ok: false, hadError: true };
  const url = new URL(window.location.href);
OLD-END
NEW-BEGIN
  const supabase = await authClient();
  // INC-914 — the client did not load: unknown, never "the link is dead".
  if (supabase === null) return { ok: false, unavailable: true };
  const url = new URL(window.location.href);
NEW-END
EDIT src/features/auth/auth-service.ts #3
OLD-BEGIN
  // DEC-261 — the session through the door: a signed-out device fetches no client.
  const { session } = await currentSession();
  const userId = session?.user?.id;
  if (!userId) return { code: null, reason: "no session" };
OLD-END
NEW-BEGIN
  // DEC-261 — the session through the door: a signed-out device fetches no client.
  const read = await currentSession();
  // INC-914 — a session that could not be read is not "no session".
  if (read.failed) return { code: null, reason: "the session could not be read" };
  const userId = read.session?.user?.id;
  if (!userId) return { code: null, reason: "no session" };
NEW-END
EDIT src/features/auth/auth-service.ts #4
OLD-BEGIN
  // DEC-261 — a signed-out device's star is the ordinary case: no client is fetched for it.
  const { session } = await currentSession();
  if (!session) return { ok: false, reason: "no session" };
  const supabase = await authClient();
OLD-END
NEW-BEGIN
  // DEC-261 — a signed-out device's star is the ordinary case: no client is fetched for it.
  const read = await currentSession();
  // INC-914 — a session that could not be read is not "no session".
  if (read.failed) return { ok: false, reason: "the session could not be read" };
  if (!read.session) return { ok: false, reason: "no session" };
  const supabase = await authClient();
NEW-END
EDIT src/features/auth/auth-client.test.ts #1
OLD-BEGIN
  hasSessionRehydrating: false,
  completeEmailVerification: { ok: false, hadError: true },
  hasPassword: LOAD_FAILED,
OLD-END
NEW-BEGIN
  hasSessionRehydrating: false,
  sessionRehydration: "unavailable",
  completeEmailVerification: { ok: false, unavailable: true },
  hasPassword: LOAD_FAILED,
NEW-END
EDIT src/features/auth/auth-client.test.ts #2
OLD-BEGIN

  it("ASC-2 auth-service.ts asks the door for the client in one place", () => {
OLD-END
NEW-BEGIN

  it('ASC-6 a session read that throws is unavailable to the reset screen, never "no session" (INC-914)', async () => {
    const getSession = vi.fn().mockRejectedValue(new Error("the lock timed out"));
    door.getSupabase.mockReset().mockResolvedValue({ auth: { getSession } });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    try {
      expect(await service.sessionRehydration()).toBe("unavailable");
      expect(await service.hasSessionRehydrating()).toBe(false);
      expect(warn).toHaveBeenCalledWith("[auth] the session could not be read: the lock timed out");
    } finally {
      warn.mockRestore();
    }
  });

  it("ASC-2 auth-service.ts asks the door for the client in one place", () => {
NEW-END
EDIT src/routes/auth_.reset.tsx #1
OLD-BEGIN

import { completePasswordReset, hasSessionRehydrating } from "@/features/auth/auth-service";
import { landAfterSignIn } from "@/features/legal/use-legal-gate";
OLD-END
NEW-BEGIN

import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { completePasswordReset, sessionRehydration } from "@/features/auth/auth-service";
import { landAfterSignIn } from "@/features/legal/use-legal-gate";
NEW-END
EDIT src/routes/auth_.reset.tsx #2
OLD-BEGIN
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [password, setPassword] = useState("");
OLD-END
NEW-BEGIN
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  /** INC-914 (Foundations turn 34c) — the sign-in code did not load: neither a session nor a dead link. */
  const [unavailable, setUnavailable] = useState(false);
  const [password, setPassword] = useState("");
NEW-END
EDIT src/routes/auth_.reset.tsx #3
OLD-BEGIN
      // covers that without inventing tolerance for a genuinely dead link.
      let signedIn = await hasSessionRehydrating();
      if (!signedIn) {
        await new Promise((resolve) => window.setTimeout(resolve, 600));
        signedIn = await hasSessionRehydrating();
      }
      if (!active) return;
      setHasRecoverySession(signedIn);
      setChecking(false);
OLD-END
NEW-BEGIN
      // covers that without inventing tolerance for a genuinely dead link.
      let read = await sessionRehydration();
      if (read === "none") {
        await new Promise((resolve) => window.setTimeout(resolve, 600));
        read = await sessionRehydration();
      }
      if (!active) return;
      setHasRecoverySession(read === "session");
      setUnavailable(read === "unavailable");
      setChecking(false);
NEW-END
EDIT src/routes/auth_.reset.tsx #4
OLD-BEGIN
    setBusy(true);
    const result = await completePasswordReset(password);
    setBusy(false);
    if (!result.ok) {
OLD-END
NEW-BEGIN
    setBusy(true);
    let result: Awaited<ReturnType<typeof completePasswordReset>>;
    try {
      result = await completePasswordReset(password);
    } finally {
      // The roadmap's 34c item: a submit that throws never leaves the button busy for good.
      setBusy(false);
    }
    if (!result.ok) {
NEW-END
EDIT src/routes/auth_.reset.tsx #5
OLD-BEGIN

  if (!hasRecoverySession) {
OLD-END
NEW-BEGIN

  if (unavailable) {
    // INC-914 — the page's sign-in code did not download: the link may be good; a refresh is the cure.
    return (
      <main className="mx-auto w-full max-w-sm px-4 py-10">
        <LoadFailedHere testid="auth-reset-load-failed" refreshTestid="auth-reset-refresh" />
      </main>
    );
  }

  if (!hasRecoverySession) {
NEW-END
EDIT src/routes/auth_.callback.tsx #1
OLD-BEGIN

import { completeEmailVerification } from "@/features/auth/auth-service";
OLD-END
NEW-BEGIN

import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { completeEmailVerification } from "@/features/auth/auth-service";
NEW-END
EDIT src/routes/auth_.callback.tsx #2
OLD-BEGIN
   * "failed"     — the URL carried a real error param and no session exists.
   */
  const [status, setStatus] = useState<"checking" | "confirmed" | "noSession" | "failed">(
    "checking",
  );
  /**
OLD-END
NEW-BEGIN
   * "failed"     — the URL carried a real error param and no session exists.
   * "unavailable" — the sign-in code did not load (INC-914): the link may be good.
   */
  const [status, setStatus] = useState<
    "checking" | "confirmed" | "noSession" | "failed" | "unavailable"
  >("checking");
  /**
NEW-END
EDIT src/routes/auth_.callback.tsx #3
OLD-BEGIN
      // "invalid or expired" requires a genuine error param AND no session.
      const settled = result.ok ? "confirmed" : result.hadError ? "failed" : "noSession";
      setStatus(settled);
OLD-END
NEW-BEGIN
      // "invalid or expired" requires a genuine error param AND no session.
      // INC-914 (Foundations turn 34c) — the sign-in code did not load: neither confirmed nor a dead link.
      const settled = result.ok
        ? "confirmed"
        : "unavailable" in result
          ? "unavailable"
          : result.hadError
            ? "failed"
            : "noSession";
      setStatus(settled);
NEW-END
EDIT src/routes/auth_.callback.tsx #4
OLD-BEGIN

  if (status === "noSession") {
OLD-END
NEW-BEGIN

  if (status === "unavailable") {
    return (
      <main className="mx-auto w-full max-w-sm px-4 py-10">
        <LoadFailedHere testid="auth-callback-load-failed" refreshTestid="auth-callback-refresh" />
      </main>
    );
  }

  if (status === "noSession") {
NEW-END
EDIT src/routes/__root.tsx #1
OLD-BEGIN
  createRootRouteWithContext,
  useRouter,
  useRouterState,
OLD-END
NEW-BEGIN
  createRootRouteWithContext,
  useRouterState,
NEW-END
EDIT src/routes/__root.tsx #2
OLD-BEGIN
import { errorText } from "@/lib/error-text";
import { firstReadLinks, type FirstReadLink } from "@/lib/first-reads";
OLD-END
NEW-BEGIN
import { errorText } from "@/lib/error-text";
import { refreshPage } from "@/lib/on-demand-failure";
import { Button } from "@/components/ui/button";
import { firstReadLinks, type FirstReadLink } from "@/lib/first-reads";
NEW-END
EDIT src/routes/__root.tsx #3
OLD-BEGIN

function ErrorContent({ error, reset }: ErrorComponentProps) {
  const { t } = useI18n();
  const router = useRouter();
  useEffect(() => {
OLD-END
NEW-BEGIN

function ErrorContent({ error }: ErrorComponentProps) {
  const { t } = useI18n();
  useEffect(() => {
NEW-END
EDIT src/routes/__root.tsx #4
OLD-BEGIN
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("common.tryAgain")}
          </button>
          <a
OLD-END
NEW-BEGIN
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {/* INC-918 (Foundations turn 34c) — the one cure that always works: a fresh load. "Try
              again" re-ran the loaders in this page, and a download that failed (the page's code,
              the session's client) fails again until the page reloads. */}
          <Button type="button" data-testid="route-error-refresh" onClick={refreshPage}>
            {t("common.refreshPage")}
          </Button>
          <a
NEW-END
EDIT src/routes/__root.tsx #5
OLD-BEGIN
  // whose error view replaced the whole app — the offline sign-out's move to "/" from "/" (SO-12).
  // A navigation elsewhere never re-read them; only router.invalidate() (the error view's "Try
  // again") reads them again.
  shouldReload: false,
OLD-END
NEW-BEGIN
  // whose error view replaced the whole app — the offline sign-out's move to "/" from "/" (SO-12).
  // A navigation elsewhere never re-read them; a fresh load reads them again (the error view's
  // Refresh, turn 34c).
  shouldReload: false,
NEW-END
C4. The end-to-end proof — SBE-6:
EDIT e2e/supabase-door.spec.ts #1
OLD-BEGIN
import { openAfterTheOneReload, refuseScripts } from "./helpers/on-demand";
import { authFields, gotoReady, signInViaSession, signedInMarker } from "./helpers/ui";
import { leaseUser } from "./helpers/users";
OLD-END
NEW-BEGIN
import { openAfterTheOneReload, refuseScripts } from "./helpers/on-demand";
import {
  authFields,
  gotoReady,
  signInMarker,
  signInViaSession,
  signedInMarker,
} from "./helpers/ui";
import { leaseUser } from "./helpers/users";
NEW-END
EDIT e2e/supabase-door.spec.ts #2
OLD-BEGIN

  test("SBE-5 signed out, the client's download fails: Forgot password says it failed, sends no false word, and gives the try back (INC-915)", async ({
OLD-END
NEW-BEGIN

  test("SBE-6 signed in, the client's download fails: the visitor is unknown, never signed out — no Sign in, the notice offers Refresh, and Settings shows its error view, never the sign-in page (INC-914)", async ({
    page,
  }) => {
    const user = await leaseUser();
    await signInViaSession(page, user.email, user.password);
    await refuseClientDownload(page);
    await openAfterTheOneReload(page, "/");
    await expect(page.getByTestId("on-demand-failed")).toBeVisible();
    await expect(page.getByTestId("on-demand-refresh")).toBeVisible();
    await expect(signInMarker(page), "a signed-in visitor is never shown Sign in").toHaveCount(0);
    await expect(signedInMarker(page)).toHaveCount(0);
    await page.goto("/settings");
    await expect(page.getByTestId("route-error-refresh")).toBeVisible();
    await expect(page, "never sent to the sign-in page").toHaveURL(/\/settings$/);
    await expect(page.getByText(en["common.tryAgain"])).toHaveCount(0);
  });

  test("SBE-5 signed out, the client's download fails: Forgot password says it failed, sends no false word, and gives the try back (INC-915)", async ({
NEW-END
C5. `bun run i18n:usage`; read /tmp/observability/build-errors.log; `bunx vitest run scripts/conformance src/lib src/features/auth src/features/legal src/routes src/test` — every test passes (paste the totals; the known limits above excepted).

PART D — DOCS AND THE ROADMAP.
D1. roadmap.md, line 3: the text after "The brief in force: " up to and including `(Foundations turn 34b-4: the on-demand census judges a handler by what it does — turn 34b-3's reviewer)` becomes `docs/governance/briefs/foundations-turn-34c-1.md (Foundations turn 34c-1: a session the browser could not read is unknown, never signed out — INC-914)` (everything after it stays, as it is).
D2. These edits (AGENTS.md's Supabase-client line; the register's row 54; the changelog; turn 34b-4 ticked with its closing run; turn 34c's line split into 34c-1 and 34c-2):
EDIT AGENTS.md #1
OLD-BEGIN
- Supabase client (DEC-261): browser code a public page draws reaches it only through src/lib/supabase-door.ts (getSupabase, onAuthChange, currentSession, rpc — a signed-out visitor's database call is the anonymous call, no client); route calls carry the bearer through src/lib/session-bearer.ts (never re-register the platform's auth-attacher); no public page's first download carries the client — check-bundle-size (MUST_NOT_CARRY) and the weight guard judge.
OLD-END
NEW-BEGIN
- Supabase client (DEC-261): browser code a public page draws reaches it only through src/lib/supabase-door.ts (getSupabase, onAuthChange, currentSession, rpc — a signed-out visitor's database call is the anonymous call, no client); every reader of currentSession reads its `failed` — a failed read is unknown, never signed out (INC-914, CF-SESSION-1); route calls carry the bearer through src/lib/session-bearer.ts (never re-register the platform's auth-attacher); no public page's first download carries the client — check-bundle-size (MUST_NOT_CARRY) and the weight guard judge.
NEW-END
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 53 | The root's server facts (the published languages, the language star, the saved area, the edge's guess) are read once per page load: a navigation never asks the server for them again — offline that read fails and its error view replaces the whole app (DEC-272, INC-927) | `src/routes/__root.tsx` — the root route's `loader` (getSsrLangContext) with `shouldReload: false`; router-core reloads a staying match only when it is invalid, told to, or the navigation is to the same href | RRO-1 (`src/routes/root-reads-once.test.ts`); `e2e/auth-signout.spec.ts` SO-12 (the offline sign-out's move to "/" from "/") | none | a new root fact rides the one loader | only `router.invalidate()` (the root error view's Try again) reads them again; Foundations turn 34w-2 |
OLD-END
NEW-BEGIN
| 53 | The root's server facts (the published languages, the language star, the saved area, the edge's guess) are read once per page load: a navigation never asks the server for them again — offline that read fails and its error view replaces the whole app (DEC-272, INC-927) | `src/routes/__root.tsx` — the root route's `loader` (getSsrLangContext) with `shouldReload: false`; router-core reloads a staying match only when it is invalid, told to, or the navigation is to the same href | RRO-1 (`src/routes/root-reads-once.test.ts`); `e2e/auth-signout.spec.ts` SO-12 (the offline sign-out's move to "/" from "/") | none | a new root fact rides the one loader | a fresh load reads them again (the root error view's Refresh since turn 34c-1; `router.invalidate()` would too); Foundations turn 34w-2 |
| 54 | A session the browser could not read is UNKNOWN, never signed out: no Sign in shown to a signed-in visitor, no sign-in page for a door-step page, no "dead link" on a good link; a server call made without the session says so (INC-914) | `src/lib/supabase-door.ts` — `currentSession()` answers `SessionRead` (`{ session, failed: false }` or `{ session, failed: true, error }`) — `failed` when the read did not happen (the client not downloaded, getSession() thrown, a refresh that never reached the server); a refresh the server refused is signed out, known; its readers: use-auth (unknown: loading kept, the shell's notice), requireSignedIn (the route error view, whose one cure is Refresh), the session's bearer (none, said), the preferred-language reads (a typed reason), the legal landing (lands, logged), route-client; the reset and confirmation screens keep a client that did not load apart from a dead link (`sessionRehydration`, `VerificationResult` `unavailable`) | `scripts/conformance/session-reads.test.ts` (CF-SESSION-1: every reader reads `failed`; CF-SESSION-2: planted session-only readers); UA-1/2, SIR-3, SBB-3, REV-1, SBD-11/15/20; `e2e/supabase-door.spec.ts` SBE-6 | none | a new reader is named by CF-SESSION-1 the day it lands | the root error view's Try again became Refresh (INC-918's class); Foundations turn 34c-1 |
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34b-4 (2026-10-26; turn 34b-3's reviewer) — the on-demand census judges a handler by what it does: an empty `catch {}` around an awaited loader, a handler whose body only returns undefined, and `null`/`undefined`/`void 0` where a handler goes (`.then(ok, undefined)`, `.catch(undefined)`) are silent or no handler at all, never an answer. ODC-5.
OLD-END
NEW-BEGIN
- Foundations turn 34b-4 (2026-10-26; turn 34b-3's reviewer) — the on-demand census judges a handler by what it does: an empty `catch {}` around an awaited loader, a handler whose body only returns undefined, and `null`/`undefined`/`void 0` where a handler goes (`.then(ok, undefined)`, `.catch(undefined)`) are silent or no handler at all, never an answer. ODC-5.

- Foundations turn 34c-1 (2026-10-26) — INC-914: a session the browser could not read (its client did not download, its read threw, or a refresh never reached the server) is unknown, never signed out; a refresh the server refused is a signed-out visitor, known. `currentSession()` carries the failure's error (`SessionRead`) and every reader reads it (CF-SESSION-1): the header no longer shows Sign in to a signed-in visitor — it waits, and the shell's notice offers Refresh; a door-step page shows the route's error view instead of sending a signed-in visitor to sign in; the route error view's "Try again", which could not work after a failed download, is Refresh (INC-918's class); the session's bearer and the preferred-language reads say so; the reset and email-confirmation screens no longer call a good link dead when their code did not load, and a reset whose submit throws gives its button back. UA-1/2, SIR-3, SBB-3, REV-1, SBD-20, CF-SESSION-1/2, SBE-6.
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [ ] Turn 34b-4 (docs/governance/briefs/foundations-turn-34b-4.md; no migration; Lovable) — turn 34b-3's reviewer: the on-demand census judges a handler by what it does — an empty `catch {}`, a handler that only returns undefined, and `undefined`/`null`/`void 0` where a handler goes (`.then(ok, undefined)`, `.catch(undefined)`) are no answer (ODC-5).
OLD-END
NEW-BEGIN
  - [x] Turn 34b-4 (docs/governance/briefs/foundations-turn-34b-4.md; no migration; Lovable) — turn 34b-3's reviewer: the on-demand census judges a handler by what it does — an empty `catch {}`, a handler that only returns undefined, and `undefined`/`null`/`void 0` where a handler goes (`.then(ok, undefined)`, `.catch(undefined)`) are no answer (ODC-5). Final HEAD eb95b9e4; CI run 40384938946: running when turn 34c-1's brief was sent (the supervisor reads it).
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [ ] Turn 34c — a failed client download makes a signed-in visitor look signed out (INC-914): currentSession().failed read by use-auth, requireSignedIn (src/lib/signed-in-route.ts :15; /settings's door-step since turn 34b-1, INC-923) as "unknown — Try again", never as signed out; the census of every currentSession() reader and of the synchronous \_\_ethioSupabase readers in e2e/; the reset and callback screens read a failed download as a dead link (`src/routes/auth_.reset.tsx` :73-:76, `src/routes/auth_.callback.tsx` :57) and the reset submit has no `finally` (:99-:101); with the guard debt of turn 32b's reviewer (OVF-17/18/19, the stale `false`, the colour reader's rgba) and the session clocks' key (Foundations turn 34, rulings 2 and 3); the i18n provider's `useStringsLayers().retry` retired — no product caller since turn 34b-3, and a retry of a failed download cannot work (INC-918). And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell.
OLD-END
NEW-BEGIN
  - [ ] Turn 34c-1 (docs/governance/briefs/foundations-turn-34c-1.md; no migration; Lovable) — INC-914: a session the browser could not read is unknown, never signed out. currentSession() answers `SessionRead` (`failed` with its error) and every reader reads it (CF-SESSION-1/2): use-auth keeps the visitor loading — neither Sign in nor the account — with the shell's notice (Refresh); requireSignedIn throws to the route error view, whose Try again becomes Refresh (INC-918's class; REV-1); the bearer and the language reads say the read failed; the legal landing logs; the reset and confirmation screens answer an unloaded sign-in code with LoadFailedHere, never a dead link, and the reset submit gives its button back (`finally`); SBE-6.
  - [ ] Turn 34c-2 — the guard debt of turn 32b's reviewer (OVF-17/18/19, the stale `false`, the colour reader's rgba) and the session clocks' key (Foundations turn 34, rulings 2 and 3); the census of the synchronous \_\_ethioSupabase readers in e2e/ (turn 34c-1's K2); INC-931 — auth-service.ts `rehydrate` (the mount read of /auth and /auth/reset) evicts an expired session whose refresh never reached the server: DEC-076's eviction was written for a refresh the server refused, so an offline person on the sign-in page loses a session a later refresh would have kept (a DEC owed: evict only on a refused refresh); the i18n provider's `useStringsLayers().retry` retired — no product caller since turn 34b-3, and a retry of a failed download cannot work (INC-918). And INC-930: an offline sign-out from a page whose marketplace code the tab never downloaded moves to "/" and shows the app's own "didn't load" view until the connection returns (then the fresh load) — the sign-out keeps the person where they are, signed out, or the marketplace's code comes with the shell.
NEW-END

THE CHECKS (in this order): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34c-1.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- src/integrations supabase` (empty); `bun run lint` (paste the counts; expected 0 errors, 39 warnings); `bun run test:unit` (paste totals — the supervisor's run: 321 files, 1975 tests, every one passed); `bun run i18n:map-guard`; `bash scripts/check-hardcoded-strings.sh` (findings: 0); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn):
0610c611943dc2a936dfc7a67416382c03f0e52b0ad47d39df667cebe62fd2a6  AGENTS.md
a9227afeb047d2b6b3ffc3da51c04f82affbdffbcbf33950b7e4add75a0231f9  docs/_changelog.md
41102ac836ce39c8e51f5aa3bdd9fe28745a10df032b704d9cd87ee803a1c8e8  docs/generated/i18n-usage.json
a851cbb0ba649a8ffcab0b39fbcb1ca51fb6872b78f8169900e45b483c0bdc2b  docs/governance/mechanisms.md
652b7a651ba0051fd37cfa90299dbf002c69df9f69342039f449f28a1ee10634  e2e/supabase-door.spec.ts
41102ac836ce39c8e51f5aa3bdd9fe28745a10df032b704d9cd87ee803a1c8e8  public/i18n-usage.json
2e095c0aea9c62481bae87b5e91a98e447b36574cc0b5eb38620514e77733864  scripts/conformance/session-reads.test.ts
4e5ed0099ce3f2490091beb37b0ccbc0ec7e825d77a772669dd49d756e5bd0e9  src/features/auth/auth-client.test.ts
a5419db7a3cf32b81fce08fd7c47bdaaab9ba3c9b10f9edcb8d7556e47391315  src/features/auth/auth-service.ts
949a1c80a9e9226df9cee2a61c1d1da3cc273301c694cc50f168d21df5915c83  src/features/auth/types.ts
be4202c8ba84305b89954b8f3ce34e1a5045940a5e183366ef7b2b8b46c298aa  src/features/auth/use-auth.test.tsx
de7c8f6144a82738d2c0ee72d9013c3294ea5c2e3c42e4f609f6731ecfd8e890  src/features/auth/use-auth.ts
afa9fb828909dbcea4aed83fa01f55d3449ba8e26644f79e6c2c56eba7f45b04  src/features/legal/use-legal-gate.ts
fe4b5719edfa1b8883b03f11ea71f25699a0bb10f8a7aa4d67f67534d20f362a  src/lib/session-bearer.test.ts
3f6daab22797b2373c379aa4310c246b07152f172adb9a05f07c42c7b9783bef  src/lib/session-bearer.ts
a42ba7f739a5287e6cab74ce4fb5fcadbe76a30eaf1169d91b4a0d46ba597ee1  src/lib/signed-in-route.test.ts
e67374e21464d87c048774cb8967f9ae4ef240ebef54eccd217543e6138e9ab2  src/lib/signed-in-route.ts
7a1a7338162f925a50b01c6e85fb22b46ffea228e500714161bfa5eba648dc2e  src/lib/supabase-door.test.ts
6bf5325bc51eb543f4ca25300746b296a5cbcdc965ffce2fe49f92cb1ebe7d1c  src/lib/supabase-door.ts
c8625158e94dc476a984a5167d20992ac140ae02aae8b1fdf2a2c78f63dda27c  src/routes/__root.tsx
48781ae32f5bed8e1b827e811fe9eb40064107fa21dc116b07881b5acfd0c404  src/routes/auth_.callback.tsx
6d15d1262111f0b657f44788078352d6ac70b64bc069e1ace2ad89dfb7bc4d11  src/routes/auth_.reset.tsx
79fc3973e64244e1f128b630ad5528f6b5aa4a85a6967a4330c5b5ba6b92895b  src/routes/root-error.test.tsx

THE END-TO-END CHECK (`bun run e2e:local -- <spec file>`; both projects, 0 retries, fake mode; CI runs every test): e2e/supabase-door.spec.ts whole (SBE-6 among them); e2e/auth-signout.spec.ts whole; e2e/auth-reset.spec.ts whole; e2e/auth-callback.spec.ts whole; e2e/settings.spec.ts whole; e2e/smoke-auth-i18n.spec.ts whole; e2e/legal-certify.spec.ts whole; e2e/on-demand-failure.spec.ts whole; paste every count line and the server log's `[ssr-error]` count by path.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34c-1.report.md (and its summary in chat), carrying: done or not done by part and step; the file list from `git diff --name-only <START>`; the behaviour contract before → after for each reader above; the red-first lines; the unit totals and the E2E count lines; the K2 lists (file:line); "none" for migrations and strings; the reviewer's verdict and its findings as ruled above; every departure with its reason; the first six lines of ci-status.md for the last commit you can read; every limit. END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; the operator is away and reads them in the record): a failed session read keeps the visitor "loading" (neither Sign in nor the account) with the shell's notice, rather than a new "unknown" chrome; a door-step page answers a failed read with the route error view; the route error view's Try again becomes Refresh everywhere; the server functions keep answering an unread session as a visitor (the server stays the authority) and the bearer says so; turn 34c is split, its second half (34c-2) next.

BLOCK 1 — FILE-BEGIN scripts/conformance/session-reads.test.ts
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { report, TREE_SCAN_MS, visitTs, walkFiles } from "./kit";

/**
 * INC-914 (Foundations turn 34c) — A SESSION THE BROWSER COULD NOT READ IS UNKNOWN, NEVER SIGNED OUT.
 *
 * `currentSession()` (src/lib/supabase-door.ts) answers `{ session, failed }`; `failed` with its
 * error means the client did not download or its session read threw. A reader that takes only
 * `session` reads that failure as "signed out" — a signed-in visitor shown Sign in, sent to the
 * sign-in page, or answered as a visitor. The census reads every call in the browser tree: its
 * answer is destructured with `failed`, held in a name whose `.failed` the same function reads, or
 * handed to a `.then` callback that reads it so. Anything else is a finding.
 */

type Finding = { file: string; line: number; what: string };

const CALLEE = "currentSession";

/** The function (or file) a node sits in. */
function scopeOf(node: ts.Node): ts.Node {
  let up: ts.Node = node;
  while (up.parent !== undefined && !ts.isFunctionLike(up)) up = up.parent;
  return up;
}

/** A binding reads `failed`: `{ failed }`, `{ failed: f }`, or a name whose `.failed` its scope reads. */
function bindingReadsFailed(name: ts.BindingName, scope: ts.Node, source: ts.SourceFile): boolean {
  if (ts.isObjectBindingPattern(name))
    return name.elements.some(
      (element) => (element.propertyName ?? element.name).getText(source) === "failed",
    );
  if (ts.isIdentifier(name)) {
    const held = name.text;
    let read = false;
    const look = (node: ts.Node) => {
      if (
        ts.isPropertyAccessExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === held &&
        node.name.text === "failed"
      )
        read = true;
      if (!read) ts.forEachChild(node, look);
    };
    look(scope);
    return read;
  }
  return false;
}

export function sessionReadCensus(files: string[]): { calls: number; findings: Finding[] } {
  const findings: Finding[] = [];
  let calls = 0;
  for (const file of files) {
    visitTs(file, (node, source) => {
      if (
        !ts.isCallExpression(node) ||
        !ts.isIdentifier(node.expression) ||
        node.expression.text !== CALLEE
      )
        return;
      calls += 1;
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
      let answer: ts.Node = node;
      if (ts.isAwaitExpression(answer.parent)) answer = answer.parent;
      const parent = answer.parent;
      let reads = false;
      if (ts.isVariableDeclaration(parent) && parent.initializer === answer)
        reads = bindingReadsFailed(parent.name, scopeOf(parent), source);
      else if (
        ts.isPropertyAccessExpression(parent) &&
        parent.name.text === "then" &&
        ts.isCallExpression(parent.parent)
      ) {
        const callback = parent.parent.arguments[0];
        const first =
          callback !== undefined &&
          (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback))
            ? callback.parameters[0]
            : undefined;
        if (first !== undefined && callback !== undefined)
          reads = bindingReadsFailed(first.name, callback, source);
      }
      if (!reads)
        findings.push({
          file,
          line,
          what: "reads the session without its `failed` (a failed read is unknown, never signed out)",
        });
    });
  }
  return { calls, findings };
}

const domain = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).filter(
  (file) => file !== "src/lib/supabase-door.ts",
);

describe("a session that could not be read is unknown, never signed out (INC-914)", () => {
  it(
    "CF-SESSION-1 every reader of currentSession() reads its `failed`",
    () => {
      const { calls, findings } = sessionReadCensus(domain);
      console.log(
        `[session-reads] currentSession() calls: ${calls}; without failed: ${findings.length}`,
      );
      expect(calls).toBeGreaterThan(0);
      expect(report(findings)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CF-SESSION-2 the census names a planted session-only reader and passes the three ways to read `failed`", () => {
    const dir = "node_modules/.cache/session-reads";
    mkdirSync(dir, { recursive: true });
    const files = {
      destructured: `${dir}/sr-destructured.ts`,
      held: `${dir}/sr-held.ts`,
      then: `${dir}/sr-then.ts`,
      good: `${dir}/sr-good.ts`,
    };
    const head = 'import { currentSession } from "@/lib/supabase-door";\n';
    try {
      writeFileSync(
        files.destructured,
        `${head}export async function a() {\n  const { session } = await currentSession();\n  return session;\n}\n`,
      );
      writeFileSync(
        files.held,
        `${head}export async function b() {\n  const read = await currentSession();\n  return read.session;\n}\n`,
      );
      writeFileSync(
        files.then,
        `${head}export function c() {\n  void currentSession().then(({ session }) => session);\n}\n`,
      );
      writeFileSync(
        files.good,
        `${head}export async function d() {\n  const { session, failed } = await currentSession();\n  const read = await currentSession();\n  if (read.failed) return null;\n  void currentSession().then((answer) => (answer.failed ? null : answer.session));\n  return failed ? null : session;\n}\n`,
      );
      const { calls, findings } = sessionReadCensus(Object.values(files));
      expect(calls).toBe(6);
      expect(report(findings)).toBe(
        [
          `${files.destructured}:3 reads the session without its \`failed\` (a failed read is unknown, never signed out)`,
          `${files.held}:3 reads the session without its \`failed\` (a failed read is unknown, never signed out)`,
          `${files.then}:3 reads the session without its \`failed\` (a failed read is unknown, never signed out)`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
FILE-END scripts/conformance/session-reads.test.ts

BLOCK 2 — FILE-BEGIN src/features/auth/use-auth.test.tsx
import { renderHook, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";

/**
 * INC-914 (Foundations turn 34c) — a session the browser could not read is UNKNOWN, never signed
 * out: the state stays "loading" (the header draws neither Sign in nor the account; the shell's
 * live guard waits), and the shell's one notice offers the cure, a refresh.
 */
const door = vi.hoisted(() => ({ read: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({
  currentSession: () => door.read(),
  onAuthChange: () => ({ unsubscribe: () => undefined }),
  getSupabase: () => Promise.reject(new Error("not used")),
}));
const reported = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", () => ({ reportOnDemandFailure: reported }));

const { useAuth } = await import("./use-auth");

it("UA-1 a session that could not be read keeps the visitor unknown and says so, never signed out", async () => {
  const error = new Error("Failed to fetch dynamically imported module");
  door.read.mockResolvedValue({ session: null, failed: true, error });
  const { result } = renderHook(() => useAuth());
  await waitFor(() => expect(reported).toHaveBeenCalledWith("the session", error));
  expect(result.current.loading).toBe(true);
  expect(result.current.user).toBeNull();
});

it("UA-2 a read that answers no session is a signed-out visitor, as before", async () => {
  door.read.mockResolvedValue({ session: null, failed: false });
  const { result } = renderHook(() => useAuth());
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.user).toBeNull();
});
FILE-END src/features/auth/use-auth.test.tsx

BLOCK 3 — FILE-BEGIN src/routes/root-error.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { expect, it, vi } from "vitest";

/**
 * INC-918 / INC-914 (Foundations turn 34c) — the route error view's one cure is a fresh load:
 * "Try again" re-ran the loaders in the page, and a download that failed (the page's code, the
 * session's client) fails again until the page reloads.
 */
vi.mock("../i18n", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../i18n")>()),
  I18nProvider: ({ children }: { children: ReactNode }) => children,
  useI18n: () => ({ t: (key: string) => key }),
}));
vi.mock("../lib/lovable-error-reporting", () => ({ reportLovableError: () => undefined }));
const refreshed = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/on-demand-failure")>()),
  refreshPage: refreshed,
}));

const { Route } = await import("./__root");

it("REV-1 the route error view offers Refresh, never a Try again that cannot work", () => {
  const view = Route.options.errorComponent;
  if (typeof view !== "function") throw new Error("the root route has no error view");
  const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
  render(
    createElement(view, {
      error: new Error("the session could not be read: offline"),
      reset: () => undefined,
      info: { componentStack: "" },
    }),
  );
  expect(screen.getByText("error.pageFailed")).toBeTruthy();
  expect(screen.queryByText("common.tryAgain")).toBeNull();
  const refresh = screen.getByTestId("route-error-refresh");
  expect(refresh.textContent).toBe("common.refreshPage");
  fireEvent.click(refresh);
  expect(refreshed).toHaveBeenCalledTimes(1);
  errors.mockRestore();
});
FILE-END src/routes/root-error.test.tsx
```
