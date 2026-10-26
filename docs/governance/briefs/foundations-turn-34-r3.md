# Foundations — turn 34, ruling 3 in brief form: Forgot password never claims a link that was not sent; every auth action's answer read where it is called; the tests wait for the one reload; DEC-266's cost told true (INC-915, DEC-267): brief (saved unchanged, 2026-10-26)

```text
RULING 3 IN BRIEF FORM — FOUNDATIONS TURN 34, RULING 2'S STOP 1 (2026-10-26; INC-915 continued; DEC-266 corrected; DEC-267; S433, the supervisor's slip: ruling 2's R2-3 changed what requestPasswordReset answers without listing the screens that read the answer — G0.3's census of consumers, owed at brief time; your reviewer caught the one that showed "on its way" for a request that never left the browser). Tier A. No migration. No new string. No package change. No AGENTS.md change. No file deleted. Base: dev b98e4346b12f651cbad62980eafa317b6504782c (your stop landing). This brief replaces docs/governance/briefs/foundations-turn-34-r2.md as the brief in force for the rest of the turn; ruling 2 (docs/governance/briefs/foundations-turn-34-ruling-2.md) and the r2 brief's four changes stand as done. Every part of foundations-turn-34.md not yet done — THE CHECKS, THE END-TO-END CHECK, THE COMPLETION REPORT — is done from that saved file as written, with r2's change (c) (the released files' hash lines skipped) and with this brief's own hash list added. Order: STEP 0; R3-1 … R3-6; the landing.
BASE: b98e4346b12f651cbad62980eafa317b6504782c
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
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
src/client.tsx
src/lib/hydrate-when-placed.ts
src/lib/hydrate-when-placed.test.ts
src/features/auth/auth-client.test.ts
src/lib/session-bearer.test.ts
src/i18n/server-shell-language.test.ts
scripts/conformance/vendor-seams.test.ts
scripts/conformance/auth-answers.test.ts
SCOPE-END

THE SYSTEM (G0) — INC-915, the second half: an action's answer is read where it is called.
CONCERN: a screen never shows success for an auth action that failed or never left the browser (F4) — every exported action of src/features/auth/auth-service.ts answers its failure as a value and never rejects (ASC-1), so the one way left to lie is a caller that throws the answer away.
MECHANISM: NONE YET at BASE — R3-1 builds it: scripts/conformance/auth-answers.test.ts (BLOCK E), an AST census of every call of those actions under src/ (tests excepted) that reports a call whose answer is discarded (`await action(…);` or `void action(…);` or a bare call as a statement), with its allowlist scripts/conformance/auth-answers-allowlist.txt (BLOCK F; `file:action | reason | until`, the kit's grammar).
CONSUMERS (the supervisor's census at BASE — every call of the 19 actions outside auth-service.ts; the census test reproduces it): src/routes/auth.tsx :167, :178, :214 (hasSessionRehydrating — read), :275 (signUp / signIn — read), :327 (resendConfirmation — read), :354 (signInWithGoogle — read), :392 (requestPasswordReset — DISCARDED: the screen shows "auth.resetNeutral" and spends a try and the cooldown for a request that never left the browser — the reviewer's BLOCKER 1); src/routes/settings.tsx :164, :197, :208, :271, :289, :306, :326, :344, :350 (all read, `run()` reads `ok`); src/routes/auth_.reset.tsx :73, :76, :100 and src/routes/auth_.callback.tsx :57 (read — but a failed download reads as a dead link: turn 34c's roadmap line, R3-5); src/i18n/provider.tsx :442, :506 (read); src/features/auth/use-auth.ts :91 (signOut — DISCARDED, a deactivated account's sign-out) and src/components/app-shell.tsx :645 (signOut — DISCARDED, the deliberate sign-out's hard reset) → EXCEPTIONS.
COVERED HERE: auth.tsx :392 (R3-2). LEFT: the reset and callback screens' "dead link" reading of a failed download → turn 34c (INC-914's line, R3-5).
CONFORMANCE GUARD: BLOCK E — AAN-1 (no breach outside the allowlist, over at least 100 files and 15 actions) and AAN-2 (a planted file: `await action(…);`, `void action(…);` and `authService.action();` reported; a call whose answer is kept is not). Red first: AAN-1 on BASE reports auth.tsx :392 (and the two sign-outs before BLOCK F's lines). In the browser, SBE-5 (BLOCK D).
EXCEPTIONS: DEC-267 — the two sign-outs discard the answer on purpose: supabase-js removes the stored session whatever the server answers (auth-js GoTrueClient `_signOut`: on an error it still runs `removeCurrentSession()` for scope global), so the hard reset that follows is true on this device, and a deactivated account's user is cleared whatever the answer while every door refuses the account (D189, F3); a sign-out the server did not record leaves its refresh token to expire on its own. Neither can meet a failed download: a sign-out needs a signed-in user, who exists on screen only once the client has loaded. BLOCK F carries both lines, `until DEC-267`.
FIVE LENSES — security: B-3 holds — a failed download says nothing about whether an account exists; the refund of the try cannot be used to probe (no request left) · performance: none (a test file; a few lines on one screen) · failure modes: the subject of the change; the stale-chunk reload stays (below) · consistency: one census for every caller of every action; the sign-in and the reset forms read their answers the same way · future growth: a new action or a new caller is enumerated by itself.
FORWARD-SCAN: INC-911's mechanism (turn 34b) gives "the client did not load" its own words for every on-demand piece; the AAN census already reads those answers. REGISTER: row 50 (the door) gains the census (R3-5).

THE OTHER TWO FINDINGS.
MAJOR 1 (the reviewer): on the sign-in screen a failed client download first reloads the tab once — src/lib/stale-chunk.ts (INC-640): Vite fires `vite:preloadError` for a failed import, and the app answers the tab's first one with one reload, because a tab opened before a Publish asks for old chunk names. That rule is right for the client's chunk too (a stale deploy is the likeliest cause), so it stays: the screen's comment says what happens (R3-2), and SBE-4 and SBE-5 wait for that one reload and for the page it lands on before they type, and check it happened once (BLOCK D's `openAfterTheOneReload`). stale-chunk.ts is a consumer of INC-915's concern, named here: it reloads once and then lets the failure surface, which the forms now answer.
MAJOR 2 (the reviewer): DEC-266's stated cost was wrong — hydration waits for the stream's end, and on a listings page the stream ends with the server's first page, bounded by its 2 s deadline, so the shell can take its handlers up to about 2.3 s after the first paint on a slow read. R3-5 corrects the records, moves the speed study before turns 35–37, and gives DEC-266's judge a time-to-interactive measure (REVISIT when its wait adds more than 300 ms at the median on "/" or a category page).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included) byte for byte as docs/governance/briefs/foundations-turn-34-r3.md and paste its sha256sum (the carrying message states the expected value; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to its closing parenthesis becomes `docs/governance/briefs/foundations-turn-34-r3.md (Foundations turn 34, ruling 3 in brief form: Forgot password never claims a link that was not sent; every auth action's answer read where it is called — INC-915, DEC-267; DEC-266's cost told true)` (everything after it stays). Tick nothing. Commit: `turn 34: ruling 3's brief saved`. Then ask the guard's scopeVerdict for scripts/conformance/auth-answers.test.ts, scripts/conformance/auth-answers-allowlist.txt, e2e/supabase-door.spec.ts, src/routes/auth.tsx, src/client.tsx, src/lib/supabase-door.ts and src/lib/supabase-door.test.ts and paste the verdicts: all allowed.

R3-1 — red first (nothing committed in this step). Write BLOCK D (e2e/supabase-door.spec.ts, its whole new text), BLOCK E and BLOCK F verbatim and check their sha256 against the hash list below. Run `bunx vitest run scripts/conformance/auth-answers.test.ts`: AAN-2 passes and AAN-1 fails with exactly one breach, `src/routes/auth.tsx:392 requestPasswordReset() — its answer is discarded` — paste it. Run `bun run e2e:local -- e2e/supabase-door.spec.ts`, both projects: SBE-5 fails (the screen shows "auth.resetNeutral", or no `auth-reset-error` — the test id R3-2 adds), SBE-1…4 pass — paste the count lines.

R3-2 — the forgot form reads its answer (src/routes/auth.tsx), these edits:
EDIT src/routes/auth.tsx #1
OLD-BEGIN
  // DEC-261 — every door on this screen needs the client: it starts downloading once the screen
  // has painted, so a submit does not wait for it (a failure is logged; the submit asks again).
  useEffect(() => {
OLD-END
NEW-BEGIN
  // DEC-261 — every door on this screen needs the client: it starts downloading once the screen
  // has painted, so a submit does not wait for it. A failed download first reloads the tab once
  // (src/lib/stale-chunk.ts, INC-640: a tab opened before a Publish asks for old chunk names); a
  // failure that remains is logged here, and each submit asks again and says it failed (INC-915).
  useEffect(() => {
NEW-END
EDIT src/routes/auth.tsx #2
OLD-BEGIN
   * used to enumerate addresses (the B-3 guard). The in-flight lock engages on
   * INITIATION, per the INC-017 precedent.
   */
OLD-END
NEW-BEGIN
   * used to enumerate addresses (the B-3 guard). The in-flight lock engages on
   * INITIATION, per the INC-017 precedent. INC-915 — a request that never left
   * the browser (the sign-in code did not load) is not "on its way": the screen
   * says it failed and gives back the try and the cooldown it took. That says
   * nothing about whether an account exists, so B-3 holds.
   */
NEW-END
EDIT src/routes/auth.tsx #3
OLD-BEGIN
    // INC-915 — busy and the in-flight lock end in a finally: no throw leaves them engaged.
    try {
      await requestPasswordReset(address);
    } finally {
OLD-END
NEW-BEGIN
    // INC-915 — busy and the in-flight lock end in a finally: no throw leaves them engaged.
    let result: Awaited<ReturnType<typeof requestPasswordReset>>;
    try {
      result = await requestPasswordReset(address);
    } finally {
NEW-END
EDIT src/routes/auth.tsx #4
OLD-BEGIN
    }
    setResetRequested(true);
OLD-END
NEW-BEGIN
    }
    if (!result.ok) {
      setResendCount((n) => Math.max(0, n - 1));
      setCooldown(0);
      setErrorKey(result.errorKey);
      return;
    }
    setResetRequested(true);
NEW-END
EDIT src/routes/auth.tsx #5
OLD-BEGIN
            {errorKey ? (
              <p role="alert" className="text-sm text-destructive">
                {t(errorKey)}
OLD-END
NEW-BEGIN
            {errorKey ? (
              <p role="alert" data-testid="auth-reset-error" className="text-sm text-destructive">
                {t(errorKey)}
NEW-END
EDIT src/routes/auth.tsx #6
OLD-BEGIN
          {errorKey ? (
            <p role="alert" className="text-sm text-destructive">
              {t(errorKey)}
OLD-END
NEW-BEGIN
          {errorKey ? (
            <p role="alert" data-testid="auth-error" className="text-sm text-destructive">
              {t(errorKey)}
NEW-END
Then AAN-1/2 pass; `bun run e2e:local -- e2e/supabase-door.spec.ts` whole, both projects — all five green (paste) — and `bun run e2e:local -- e2e/auth-reset.spec.ts` whole (the forgot view's own spec, unchanged: still green); typecheck, lint. Commit BLOCKS D, E, F with these edits: "turn 34 ruling 3: Forgot password never claims a link that was not sent; every auth action's answer read where it is called (INC-915, DEC-267); SBE-4, SBE-5".

R3-3 — the deadline's words and the door's comment. src/client.tsx becomes BLOCK C (its message names PLACED_DEADLINE_MS instead of "1.5 s" — the reviewer's MINOR 6); src/lib/supabase-door.ts, this edit (MINOR 3):
EDIT src/lib/supabase-door.ts #1
OLD-BEGIN
 *   the anonymous PostgREST call the client itself sends for a signed-out
OLD-END
NEW-BEGIN
 *   the anonymous PostgREST call with the client's own auth headers for a signed-out
NEW-END
EDIT src/lib/supabase-door.ts #2
OLD-BEGIN
 *   bearer only for an old-style anon JWT key — answered in supabase-js's
OLD-END
NEW-BEGIN
 *   bearer only for an old-style anon JWT key; not postgrest-js's X-Client-Info,
 *   an analytics header — answered in supabase-js's
NEW-END
HWP-1…6 pass. Commit "turn 34 ruling 3: the deadline's words from its constant; the door's comment exact".

R3-4 — the door's tests read their own listener (MINOR 5). In src/lib/supabase-door.test.ts each case's import registers its own window `storage` listener; SBD-9 and SBD-17 read the listener their own import registered (the one added after that import, never `state.listeners.at(-1)` from an earlier case), and the listeners are cleared in afterEach. SBD-1…17 pass; run the file 10 times in parallel pairs as you did for SBD-15 and paste the counts. Commit "turn 34 ruling 3: the door's tests read their own storage listener".

R3-5 — the records, these edits:
EDIT docs/features/performance-strategy.md #1
OLD-BEGIN
**DEC-266 — the first screen is hydrated where React placed it** (Foundations turn 34, ruling 2; INC-913). React 19.2 streams a Suspense boundary that finishes after the shell as a hidden segment (`<div hidden id="S:n">`) and reveals it on a timer; TanStack Start's entry script is `async`, so the browser could begin hydrating while a boundary was still pending or queued, and the first state change above it (the auth answer, a strings layer, a shell choice) made React draw that boundary again — the server's nodes replaced (AP-54) and, until React's timer fired, two copies of a card in the page (PP-21, PW-94). The client entry, `src/client.tsx`, now hydrates only once the document has been read and no segment waits (`whenStreamPlaced`, `src/lib/hydrate-when-placed.ts`). Its cost: hydration waits for the stream's end and React's reveal — at most 300 ms after the first paint where a late boundary exists; a page without one is unchanged. A segment React never places ends the wait 1.5 s after the document was read, and hydration proceeds with a `[client-error] the first screen was not placed 1.5 s after the page was read; hydrating anyway` line. Guards: HWP-1…6 (`src/lib/hydrate-when-placed.test.ts`; HWP-5 pins react-dom's segment marker and `$RC`, HWP-6 the entry's order), the weight guard's walk from `src/client.tsx`, and SBE-3 in the browser (signed in: one copy of each card, the server's own kept).
OLD-END
NEW-BEGIN
**DEC-266 — the first screen is hydrated where React placed it** (Foundations turn 34, ruling 2; INC-913). React 19.2 streams a Suspense boundary that finishes after the shell as a hidden segment (`<div hidden id="S:n">`) and reveals it on a timer; TanStack Start's entry script is `async`, so the browser could begin hydrating while a boundary was still pending or queued, and the first state change above it (the auth answer, a strings layer, a shell choice) made React draw that boundary again — the server's nodes replaced (AP-54) and, until React's timer fired, two copies of a card in the page (PP-21, PW-94). The client entry, `src/client.tsx`, now hydrates only once the document has been read and no segment waits (`whenStreamPlaced`, `src/lib/hydrate-when-placed.ts`). Its cost (corrected by ruling 3 — the reviewer's MAJOR 2): hydration waits for the stream's end and then React's reveal (at most 300 ms after the shell's first frame, or until 2.3 s when the last part lands between 2.0 and 2.3 s). The stream ends when its slowest part does — on the listings pages, the server's first page, bounded by `FIRST_PAGE_DEADLINE_MS` (2 s, `src/server/first-screen.ts` :55) — so on a slow first page the shell takes its handlers (the menu, search, the language choice; links still work as plain links) up to about 2.3 s after the first paint, where before it took them as soon as its code arrived. A page without a late part is unchanged. The speed study on the roadmap measures the time to `data-app-ready` with this wait and with the first page held inline in the first flush, and DEC-266's judge reads it. A segment React never places ends the wait 1.5 s after the document was read, and hydration proceeds with a `[client-error] the first screen was not placed 1.5 s after the page was read; hydrating anyway` line. Guards: HWP-1…6 (`src/lib/hydrate-when-placed.test.ts`; HWP-5 pins react-dom's segment marker and `$RC`, HWP-6 the entry's order), the weight guard's walk from `src/client.tsx`, and SBE-3 in the browser (signed in: one copy of each card, the server's own kept).
NEW-END
EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 50 | The Supabase client (sign-in, the session, database calls) waits for a session and never rides a public page's first download (D234, DEC-261) | `src/lib/supabase-door.ts` — `getSupabase` (loadOnce), `hasStoredSession` and `storedSessionKey` (the client's own storage key; a framed page counts), `onAuthChange` (the client's `onAuthStateChange`; `INITIAL_SESSION` null for a signed-out visitor), `currentSession` (never rejects), `rpc` (the anonymous PostgREST call for a signed-out visitor, the client's own otherwise) — never rejects where the client's own call did not; auth-service's authClient() (INC-915); `src/lib/session-bearer.ts` (the route calls' bearer, registered in `src/start.ts`) | `src/lib/supabase-door.test.ts` (SBD-1…17); `src/features/auth/auth-client.test.ts` (ASC-1, ASC-2); `src/lib/session-bearer.test.ts` (SBB-1…3); `MUST_NOT_CARRY` + BC-13 (`scripts/bundle-closure.mjs`, `scripts/check-bundle-size.mjs`); the weight guard's FORBIDDEN and FORBIDDEN_FILES (walked from `src/start.ts` too); vendor-seams VS-1 (the door is a seam); `e2e/supabase-door.spec.ts` (SBE-1…4) | the files still frozen in the vendor-seams allowlist (INC-877) import the client directly — signed-in and staff screens, never a public page (`MUST_NOT_CARRY` judges) | a new database call from code a public page draws is one `rpc()`; a new auth listener one `onAuthChange()`; a new sign-in screen warms the client once painted | the E2E build hands the client to the harness at mount unless a test's init script sets `__ethioClientOff` (SBE); a signed-out listener can hear `INITIAL_SESSION` twice (null, then the client's own); Foundations turn 34 |
| 51 | The first screen's hydration: the browser hydrates the server's first screen as drawn — no state change makes React draw a streamed part again, and the page never holds two copies of anything (D234, DEC-266, INC-913) | `src/client.tsx` (the browser's entry: TanStack Start's own, hydrating after the wait) + `src/lib/hydrate-when-placed.ts` (`whenStreamPlaced`: the document read and no `div[hidden][id^="S:"]` segment waiting; a 1.5 s deadline with a `[client-error]` line) | `src/lib/hydrate-when-placed.test.ts` (HWP-1…6: HWP-5 pins react-dom's segment marker and `$RC`, HWP-6 the entry's order); `e2e/supabase-door.spec.ts` SBE-3; the weight guard's entry (`scripts/check-marketplace-imports.mjs` walks `src/client.tsx`) | none | a new late boundary or provider is covered by itself | hydration waits at most 300 ms after the first paint where a late boundary exists; Foundations turn 34, ruling 2 |
OLD-END
NEW-BEGIN
| 50 | The Supabase client (sign-in, the session, database calls) waits for a session and never rides a public page's first download (D234, DEC-261) | `src/lib/supabase-door.ts` — `getSupabase` (loadOnce), `hasStoredSession` and `storedSessionKey` (the client's own storage key; a framed page counts), `onAuthChange` (the client's `onAuthStateChange`; `INITIAL_SESSION` null for a signed-out visitor), `currentSession` (never rejects), `rpc` (the anonymous PostgREST call for a signed-out visitor, the client's own otherwise) — never rejects where the client's own call did not; auth-service's authClient() (INC-915); `src/lib/session-bearer.ts` (the route calls' bearer, registered in `src/start.ts`) | `src/lib/supabase-door.test.ts` (SBD-1…17); `src/features/auth/auth-client.test.ts` (ASC-1, ASC-2); `src/lib/session-bearer.test.ts` (SBB-1…3); `MUST_NOT_CARRY` + BC-13 (`scripts/bundle-closure.mjs`, `scripts/check-bundle-size.mjs`); the weight guard's FORBIDDEN and FORBIDDEN_FILES (walked from `src/start.ts` too); vendor-seams VS-1 (the door is a seam); `e2e/supabase-door.spec.ts` (SBE-1…5); `scripts/conformance/auth-answers.test.ts` (AAN-1/2: every auth action's answer read where it is called; two sign-outs excepted by DEC-267, ruling 3) | the files still frozen in the vendor-seams allowlist (INC-877) import the client directly — signed-in and staff screens, never a public page (`MUST_NOT_CARRY` judges) | a new database call from code a public page draws is one `rpc()`; a new auth listener one `onAuthChange()`; a new sign-in screen warms the client once painted | the E2E build hands the client to the harness at mount unless a test's init script sets `__ethioClientOff` (SBE); a signed-out listener can hear `INITIAL_SESSION` twice (null, then the client's own); Foundations turn 34 |
| 51 | The first screen's hydration: the browser hydrates the server's first screen as drawn — no state change makes React draw a streamed part again, and the page never holds two copies of anything (D234, DEC-266, INC-913) | `src/client.tsx` (the browser's entry: TanStack Start's own, hydrating after the wait) + `src/lib/hydrate-when-placed.ts` (`whenStreamPlaced`: the document read and no `div[hidden][id^="S:"]` segment waiting; a 1.5 s deadline with a `[client-error]` line) | `src/lib/hydrate-when-placed.test.ts` (HWP-1…6: HWP-5 pins react-dom's segment marker and `$RC`, HWP-6 the entry's order); `e2e/supabase-door.spec.ts` SBE-3; the weight guard's entry (`scripts/check-marketplace-imports.mjs` walks `src/client.tsx`) | none | a new late boundary or provider is covered by itself | hydration waits for the stream's end and then React's reveal (at most 300 ms after the first frame, 2.3 s at worst when a part lands between 2.0 and 2.3 s) — on a slow listings page up to about 2.3 s, bounded by the first page's 2 s deadline (ruling 3); Foundations turn 34, ruling 2 |
NEW-END
EDIT docs/features/e2e-harness.md #1
OLD-BEGIN
`window.__ethioClientOff`, set by a test's init script, turns that E2E hand-off off, so the page behaves as a production visitor's (SBE-1…4).
OLD-END
NEW-BEGIN
`window.__ethioClientOff`, set by a test's init script, turns that E2E hand-off off, so the page behaves as a production visitor's (SBE-1…5).

A test that refuses a chunk's download waits for the app's one reload for a failed chunk (src/lib/stale-chunk.ts, INC-640) and for the page it lands on before it types — the reload drops what was typed (SBE-4, SBE-5's `openAfterTheOneReload`).
NEW-END
EDIT roadmap.md #1
OLD-BEGIN
  - [ ] Turn 34b also — a failed client download makes a signed-in visitor look signed out (INC-914): currentSession().failed read by use-auth, requireSignedIn (src/lib/signed-in-route.ts :15) and settings' hasSessionRehydrating as "unknown — Try again", never as signed out; the census of every currentSession() reader and of the synchronous \_\_ethioSupabase readers in e2e/ (Foundations turn 34, ruling 2).
OLD-END
NEW-BEGIN
  - [ ] Turn 34c — a failed client download makes a signed-in visitor look signed out (INC-914): currentSession().failed read by use-auth, requireSignedIn (src/lib/signed-in-route.ts :15) and settings' hasSessionRehydrating as "unknown — Try again", never as signed out; the census of every currentSession() reader and of the synchronous \_\_ethioSupabase readers in e2e/; the reset and callback screens read a failed download as a dead link (`src/routes/auth_.reset.tsx` :73-:76, `src/routes/auth_.callback.tsx` :57) and the reset submit has no `finally` (:99-:101); with the guard debt of turn 32b's reviewer (OVF-17/18/19, the stale `false`, the colour reader's rgba) and the session clocks' key (Foundations turn 34, rulings 2 and 3).
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [ ] Speed study (DEC-266's REVISIT branch, D234): the listings pages' first page held inline in the server's first flush when it arrives within a short budget (no late boundary, no reveal timer), measured in the lab against the streamed page; adopted only on the lab's numbers.
OLD-END
NEW-BEGIN
  - [ ] Speed study (DEC-266's REVISIT branch, D234) — before turns 35–37: the lab gains the time to `data-app-ready`; the listings pages' first page held inline in the server's first flush when it arrives within a short budget (no late boundary, no reveal timer), measured against the streamed page with DEC-266's wait; adopted only on the lab's numbers. DEC-266's judge reads the same measure: REVISIT when its wait adds more than 300 ms at the median on "/" or a category page (ruling 3).
NEW-END
EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34, ruling 2 (2026-10-26) — DEC-266 (INC-913): the browser's entry, src/client.tsx, hydrates the server's first screen only once React has placed every streamed segment (src/lib/hydrate-when-placed.ts; a 1.5 s deadline with a `[client-error]` line), so no state change redraws a late boundary — AP-54's replaced nodes and PP-21's and PW-94's two copies of a card; HWP-1…6, SBE-3; the entry 203.6 → 203.9 KiB. INC-915: a failed download of the Supabase client answers as a failed action — auth-service's one authClient(), the sign-in screen's busy in a finally, settings' session check, the door's rpc() and currentSession() never reject; ASC-1, ASC-2, SBD-14…17, SBB-1…3, SBE-4. INC-916: the vendor-seams census sees a dynamic import of the client (VS-4, VS-5). INC-917: a test's stand-in intercepts what its subject reaches (server-shell-language.test.ts's client mock removed; the census of every client mock in the report).
OLD-END
NEW-BEGIN
- Foundations turn 34, ruling 2 (2026-10-26) — DEC-266 (INC-913): the browser's entry, src/client.tsx, hydrates the server's first screen only once React has placed every streamed segment (src/lib/hydrate-when-placed.ts; a 1.5 s deadline with a `[client-error]` line), so no state change redraws a late boundary — AP-54's replaced nodes and PP-21's and PW-94's two copies of a card; HWP-1…6, SBE-3; the entry 203.6 → 203.9 KiB. INC-915: a failed download of the Supabase client answers as a failed action — auth-service's one authClient(), the sign-in screen's busy in a finally, settings' session check, the door's rpc() and currentSession() never reject; ASC-1, ASC-2, SBD-14…17, SBB-1…3, SBE-4. INC-916: the vendor-seams census sees a dynamic import of the client (VS-4, VS-5). INC-917: a test's stand-in intercepts what its subject reaches (server-shell-language.test.ts's client mock removed; the census of every client mock in the report).

- Foundations turn 34, ruling 3 (2026-10-26) — INC-915 continued: Forgot password says a request that never left the browser failed, gives back its try and cooldown, and no longer claims a link is on its way; one census reads every auth action's answer where it is called (scripts/conformance/auth-answers.test.ts, AAN-1/2; the two sign-outs that discard it on purpose, by DEC-267); SBE-4 and SBE-5 wait for the app's one reload for a failed chunk (INC-640) before they type; DEC-266's stated cost corrected (up to about 2.3 s on a slow listings page) and its judge given a time-to-interactive measure in the speed study, moved before turns 35–37.
NEW-END
Commit "turn 34 ruling 3: the records — DEC-266's cost, the answer census, the one reload".

R3-6 — the close. THE CHECKS in foundations-turn-34.md's order, with r2's change (c), and this brief's hash list (`grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34-r3.md | sha256sum -c` — every line OK). The supervisor's run of BASE plus this brief: unit 311 files / 1937 tests passed (your 1935 plus AAN-1/2); JS 204.1 KiB / 207 — paste yours. THE END-TO-END CHECK: the brief's list as you ran it, plus e2e/supabase-door.spec.ts whole, e2e/auth-reset.spec.ts whole, and AP-23, AP-26, AP-29, AP-54, PP-21, PW-94 by id, both projects. Then the reviewer in the FOREGROUND on the last code commit; wait for its verdict line; a BLOCKER is fixed in a new commit and the reviewer runs again; a MAJOR is fixed when it is in SCOPE and provable, otherwise listed. Then the completion report (its file name follows the brief in force's stem): the frozen rule's three conditions with their numbers; R3-1's red-first lines; every changed file's sha256; the departures.

Decisions made here (overridable by the operator; pasting this brief approves them — G17): DEC-267 (the two sign-outs discard their answers on purpose, as above); the stale-chunk reload stays on the sign-in screen and the tests wait for it; a failed request gives back its try and its cooldown; the test ids `auth-error` and `auth-reset-error` on the two forms' error lines (the reviewer's MINOR 4: anchor on structure); the reviewer's MINOR 1 (`\_\_ethioSupabase`, Prettier's escape) and MINOR 2 (a fourth helper takes the client) accepted; MINOR 7 (auth_.reset.tsx :99-:101 without a `finally`, safe now that no action rejects) and MINOR 8 (app-shell :645) — the first goes to turn 34c's line, the second is DEC-267.

BLOCK C — FILE-BEGIN src/client.tsx
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

import { PLACED_DEADLINE_MS, whenStreamPlaced } from "@/lib/hydrate-when-placed";

/**
 * DEC-266 — the browser's entry: TanStack Start's own client entry
 * (@tanstack/react-start/dist/plugin/default-entry/client.tsx), with one change — it hydrates
 * once the server's first screen is placed (src/lib/hydrate-when-placed.ts, INC-913).
 */
void whenStreamPlaced().then((outcome) => {
  if (outcome === "deadline")
    console.error(
      `[client-error] the first screen was not placed ${PLACED_DEADLINE_MS / 1000} s after the page was read; hydrating anyway`,
    );
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <StartClient />
      </StrictMode>,
    );
  });
});
FILE-END src/client.tsx

BLOCK D — FILE-BEGIN e2e/supabase-door.spec.ts
import type { Page } from "@playwright/test";

import { expect, test } from "./fixtures";

import { adPageFixtures } from "./helpers/ad-page";
import {
  authFields,
  gotoReady,
  signInViaSession,
  signedInMarker,
  waitForHydration,
} from "./helpers/ui";
import { leaseUser } from "./helpers/users";
import { listingPath } from "../src/features/ad-page/address";
import { en } from "../src/i18n/locales/en";
import { STALE_CHUNK_KEY } from "../src/lib/stale-chunk";

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
 *
 * DEC-266 (INC-913) — SBE-3: the browser hydrates the server's first screen once React has
 * placed it, so a signed-in visitor's settling state (the session, the member strings) never
 * makes React draw the listings again: one copy of each card, the server's own. INC-915 —
 * SBE-4, SBE-5: a client whose download fails leaves the sign-in and the reset forms answering,
 * never stuck and never claiming a link was sent. A failed chunk first reloads the tab once
 * (src/lib/stale-chunk.ts, INC-640); both wait for that reload before they type.
 */

const CLIENT_MARKER = "GoTrueClient";

/**
 * Every script the page fetches, with whether its text carries the client; a body that cannot
 * be read is never counted clean (the reviewer of turn 34).
 */
function watchScripts(page: Page) {
  const reads: Array<Promise<{ url: string; carries: boolean | null }>> = [];
  page.on("response", (response) => {
    if (response.request().resourceType() !== "script") return;
    reads.push(
      response.text().then(
        (text) => ({ url: response.url(), carries: text.includes(CLIENT_MARKER) }),
        () => ({ url: response.url(), carries: null }),
      ),
    );
  });
  return {
    async carriers(): Promise<string[]> {
      const all = await Promise.all(reads);
      return all.filter((read) => read.carries !== false).map((read) => read.url);
    },
  };
}

/** Every database function a page calls, with its answer's status (the door's anonymous path). */
function watchRpcs(page: Page) {
  const calls: Array<{ name: string; status: number }> = [];
  page.on("response", (response) => {
    const match = /\/rest\/v1\/rpc\/([^?]+)/.exec(response.url());
    if (match) calls.push({ name: match[1] ?? "", status: response.status() });
  });
  return { calls: () => [...calls] };
}

/** Every script that carries the client is refused, as a dropped download on a phone. */
async function refuseClientDownload(page: Page) {
  await page.route("**/*.js", async (route) => {
    const response = await route.fetch();
    if ((await response.text()).includes(CLIENT_MARKER)) await route.abort("failed");
    else await route.fulfill({ response });
  });
}

/**
 * Opens `path` with the client refused and waits for the app's one reload for a failed chunk
 * (src/lib/stale-chunk.ts, INC-640) and for the page it lands on to be ready, so a test types
 * into the page that stays. Returns the page's load count, which a test checks stays at two.
 */
async function openAfterTheOneReload(page: Page, path: string): Promise<() => number> {
  let loads = 0;
  page.on("load", () => {
    loads += 1;
  });
  // Not gotoReady: the reload can land while it waits, and a destroyed page is not this test's subject.
  await page.goto(path);
  await expect
    .poll(() => loads, { message: "the app reloaded once for the failed chunk (INC-640)" })
    .toBe(2);
  await waitForHydration(page);
  expect(
    await page.evaluate((key) => window.sessionStorage.getItem(key), STALE_CHUNK_KEY),
    "the reload was the stale-chunk rule's",
  ).not.toBeNull();
  return () => loads;
}

/** The page has loaded and the browser has had an idle moment (a deferred fetch has started). */
async function settle(page: Page) {
  await page.waitForLoadState("load");
  await page.waitForLoadState("networkidle");
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
    const rpcs = watchRpcs(page);
    for (const path of ["/", `/c/${seller.leafSlug}`, canonical, "/terms"]) {
      await gotoReady(page, path);
      await settle(page);
      expect(await scripts.carriers(), `${path}: no script carries the client`).toEqual([]);
    }
    // The door answered them without the client: its anonymous calls reached the database and succeeded.
    expect(rpcs.calls().length, "the pages called the database through the door").toBeGreaterThan(
      0,
    );
    expect(rpcs.calls().filter((call) => call.status >= 400)).toEqual([]);
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

  test("SBE-3 signed in: a listings page draws each card once and keeps the server's (DEC-266, INC-913)", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    await seed(seller, "active");
    const visitor = await leaseUser();
    await page.addInitScript(() => {
      Object.assign(window, { __ethioClientOff: true });
      // The most copies of a card the page ever held, and the first card as the server drew it.
      const most = { cards: 0 };
      Reflect.set(window, "__mostCards", most);
      new MutationObserver(() => {
        const cards = document.querySelectorAll('[data-testid="listing-card"]').length;
        if (cards > most.cards) most.cards = cards;
      }).observe(document, { childList: true, subtree: true });
      document.addEventListener("DOMContentLoaded", () => {
        Reflect.set(window, "__firstCard", document.querySelector('[data-testid="listing-card"]'));
      });
    });
    await signInViaSession(page, visitor.email, visitor.password);
    await gotoReady(page, `/c/${seller.leafSlug}`);
    await expect(page.locator('[data-testid="feed-container"][data-ready="1"]')).toBeAttached();
    await expect(page.getByTestId("listing-card")).toHaveCount(1);
    await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
    const seen = await page.evaluate(() => {
      const first: unknown = Reflect.get(window, "__firstCard");
      const most: unknown = Reflect.get(window, "__mostCards");
      return {
        most: most !== null && typeof most === "object" ? Reflect.get(most, "cards") : -1,
        kept:
          first instanceof Element &&
          first === document.querySelector('[data-testid="listing-card"]'),
      };
    });
    expect(seen.most, "the page never held two copies of the card").toBe(1);
    expect(seen.kept, "the browser kept the card the server drew").toBe(true);
  });

  test("SBE-4 signed out, the client's download fails: the sign-in form says so and its button works again (INC-915)", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Object.assign(window, { __ethioClientOff: true });
    });
    await refuseClientDownload(page);
    const loads = await openAfterTheOneReload(page, "/auth");
    const { email, password, submit } = authFields(page);
    await email.fill("nobody@example.test");
    await password.fill("not-a-real-password-1");
    await submit.click();
    await expect(page.getByTestId("auth-error")).toHaveText(en["auth.errorGeneric"]);
    await expect(submit).toBeEnabled();
    expect(loads(), "one reload, never a second").toBe(2);
  });

  test("SBE-5 signed out, the client's download fails: Forgot password says it failed, sends no false word, and gives the try back (INC-915)", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Object.assign(window, { __ethioClientOff: true });
    });
    await refuseClientDownload(page);
    const loads = await openAfterTheOneReload(page, "/auth?view=forgot");
    await page.locator("#reset-email").fill("nobody@example.test");
    const send = page.getByRole("button", { name: en["auth.resetSend"] });
    await send.click();
    await expect(page.getByTestId("auth-reset-error")).toHaveText(en["auth.errorGeneric"]);
    await expect(page.getByText(en["auth.resetNeutral"])).toHaveCount(0);
    // The request never left the browser: no cooldown, so the button asks again at once.
    await expect(send).toBeEnabled();
    await expect(send).toHaveText(en["auth.resetSend"]);
    expect(loads(), "one reload, never a second").toBe(2);
  });
});
FILE-END e2e/supabase-door.spec.ts

BLOCK E — FILE-BEGIN scripts/conformance/auth-answers.test.ts
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterEach, describe, expect, it } from "vitest";
import { codeOf, readAllowlist, report, visitTs, walkFiles } from "./kit";

/**
 * INC-915 (Foundations turn 34, ruling 3): an auth action's answer is read where it is called.
 * Every exported async action of src/features/auth/auth-service.ts answers its failure as a value
 * ({ ok: false, … }) and never rejects (ASC-1), so a call whose answer is thrown away — `await
 * requestPasswordReset(email);` as a statement, a bare or `void` call — can show success for an
 * action that failed or never left the browser (F4). The census reads every call of those actions
 * under src/ (tests excepted) and reports each one whose answer is discarded; a deliberate one
 * carries an allowance (`file:action | reason | until`) in auth-answers-allowlist.txt.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SERVICE = join(ROOT, "src", "features", "auth", "auth-service.ts");
const ALLOWLIST = join(dirname(fileURLToPath(import.meta.url)), "auth-answers-allowlist.txt");

type Finding = { file: string; line: number; what: string };

/** The exported async actions of the auth service, by name. */
export function authActions(serviceText: string): string[] {
  return [...codeOf(serviceText).matchAll(/^export\s+async\s+function\s+([A-Za-z0-9_]+)/gm)].map(
    (match) => match[1] ?? "",
  );
}

/** The action a call names (`signOut()` or `authService.signOut()`), or null. */
function calledAction(call: ts.CallExpression, actions: Set<string>): string | null {
  const callee = call.expression;
  if (ts.isIdentifier(callee) && actions.has(callee.text)) return callee.text;
  if (ts.isPropertyAccessExpression(callee) && actions.has(callee.name.text))
    return callee.name.text;
  return null;
}

/** Every call of an action under `roots` whose answer is discarded. */
export function census(
  roots: string[],
  actions: string[],
): { scanned: number; findings: Finding[] } {
  const names = new Set(actions);
  const files = walkFiles(roots, { ext: ["ts", "tsx"], skipTests: true }).filter(
    (file) => file !== SERVICE,
  );
  const findings: Finding[] = [];
  for (const file of files) {
    const rel = relative(ROOT, file).split("\\").join("/");
    visitTs(file, (node, source) => {
      if (!ts.isExpressionStatement(node)) return;
      let expression = node.expression;
      if (ts.isVoidExpression(expression)) expression = expression.expression;
      if (ts.isAwaitExpression(expression)) expression = expression.expression;
      if (!ts.isCallExpression(expression)) return;
      const action = calledAction(expression, names);
      if (action === null) return;
      findings.push({
        file: rel,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        what: `${action}() — its answer is discarded`,
      });
    });
  }
  return { scanned: files.length, findings };
}

const tempRoots: string[] = [];
afterEach(() => {
  while (tempRoots.length) rmSync(tempRoots.pop()!, { recursive: true, force: true });
});

describe("an auth action's answer is read where it is called (INC-915)", () => {
  it("AAN-1 no call under src/ discards an auth action's answer", () => {
    const actions = authActions(readFileSync(SERVICE, "utf8"));
    expect(actions.length).toBeGreaterThanOrEqual(15);
    const { scanned, findings } = census([join(ROOT, "src")], actions);
    expect(scanned).toBeGreaterThanOrEqual(100);
    const allowances = readAllowlist(
      ALLOWLIST,
      findings.map((finding) => `${finding.file}:${finding.what.split("(")[0]}`),
    );
    const breaches = findings.filter(
      (finding) => !allowances.has(`${finding.file}:${finding.what.split("(")[0]}`),
    );
    console.log(`[auth-answers] scanned: ${scanned}, breaches: ${breaches.length}`);
    expect(report(breaches)).toBe("");
  });

  it("AAN-2 a planted call that throws its answer away is reported, in every spelling", () => {
    const temp = mkdtempSync(join(tmpdir(), "auth-answers-"));
    tempRoots.push(temp);
    writeFileSync(
      join(temp, "planted.tsx"),
      [
        "async function a() {",
        "  await requestPasswordReset(email);",
        "  void signOut();",
        "  authService.signOut();",
        "  const kept = await signInWithPassword(c);",
        "  if (!kept.ok) return;",
        "}",
        "",
      ].join("\n"),
    );
    const { findings } = census([temp], ["requestPasswordReset", "signOut", "signInWithPassword"]);
    expect(findings.map((finding) => `${finding.line} ${finding.what}`)).toEqual([
      "2 requestPasswordReset() — its answer is discarded",
      "3 signOut() — its answer is discarded",
      "4 signOut() — its answer is discarded",
    ]);
  });
});
FILE-END scripts/conformance/auth-answers.test.ts

BLOCK F — FILE-BEGIN scripts/conformance/auth-answers-allowlist.txt
# INC-915: an auth action's answer is read where it is called (scripts/conformance/auth-answers.test.ts). A call that discards it on purpose: <file>:<action> | <reason> | <until>
src/components/app-shell.tsx:signOut | the deliberate sign-out's hard reset: supabase-js removes the stored session whatever the server answers (auth-js GoTrueClient _signOut), so the reset that follows is true on this device; a sign-out the server did not record leaves its refresh token to expire on its own | DEC-267
src/features/auth/use-auth.ts:signOut | a deactivated account's sign-out (D189): the user is cleared whatever it answers, the stored session goes as above, and every door refuses the account (F3) | DEC-267
FILE-END scripts/conformance/auth-answers-allowlist.txt

The hash list (the files as they stand at the end of the turn):
50a959a7065841a42f1b68177faf3bb64fc675106e59540a5847bb2348d679d5  src/client.tsx
7e19f1632e12728c62d8fda4eb0f765c8e6216bfef4227d5c10125eaf85564a9  e2e/supabase-door.spec.ts
74fefb08ef5c26ae9a100c930fbffd38889b7f33def6476b3c70f4efb5025e65  scripts/conformance/auth-answers.test.ts
a91a9956f7956d03825535c405b6de94e28335021fc660d93f486c0b972e6130  scripts/conformance/auth-answers-allowlist.txt
b27c7d10aef777482a59aacacecb9de0d5f00562b08480a4e0e290061b069513  src/routes/auth.tsx
c1771f5799ffae4e49c6e1d0802c1363f1b6ebf73de75cd6f97528b9fa7f1557  src/lib/supabase-door.ts
208e7faae960870744a3ace120c8ac7a3600466d6d70e53d191ea27657edd0f2  docs/features/performance-strategy.md
d32dad6ab02f737259850eeed377e46ded3e52b69461530a0d6255a84e0b3594  docs/governance/mechanisms.md
0ec80e5e93923095c7c59e765d35c7488c73f6847d5d2c57bbdd57fdee9693ad  docs/features/e2e-harness.md
9984b04f60b20d216f3c6b3ae69128f8e8983724bc91b7b55c12f420c5967092  docs/_changelog.md
```
