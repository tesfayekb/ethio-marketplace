STOP — turn 34 THE END-TO-END CHECK: AP-54 fails on the door's code (the frozen rule's third condition); the reviewer's two BLOCKERs
DONE: Part A; STEP 0 (ruling 1 of stop 1: the saved brief stands); parts B, C, D, E, F; THE CHECKS; THE END-TO-END CHECK (run whole; one red, below); the independent reviewer (below)
LEFT: the completion report and the final landing — after a ruling on AP-54
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `3b680c1a60c1704d0617305c97c1b1115feea066` (short `3b680c1`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-26T04:43:59Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40269083499
FILES:
AGENTS.md
docs/_changelog.md
docs/features/ci-guards.md
docs/features/performance-strategy.md
docs/features/route-client.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-34.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-34.stop-1.md
docs/governance/reports/foundations-turn-34.stop-2.md
e2e/supabase-door.spec.ts
public/i18n-usage.json
roadmap.md
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/check-marketplace-imports.mjs
scripts/conformance/route-client-allowlist.txt
scripts/conformance/vendor-seams-allowlist.txt
scripts/conformance/vendor-seams-scan.ts
scripts/e2e-select.ts
scripts/route-budgets.mjs
src/components/app-shell.tsx
src/components/shell/place-carry-service.ts
src/features/ad-page/contact.test.ts
src/features/ad-page/contact.ts
src/features/ad-page/count-view.test.ts
src/features/ad-page/report.test.ts
src/features/ad-page/report.ts
src/features/ad-page/save.test.ts
src/features/ad-page/save.ts
src/features/admin/impersonation/impersonation-service.ts
src/features/admin/nav-alerts.ts
src/features/auth/auth-service.ts
src/features/auth/use-auth.ts
src/features/legal/legal-reader.test.ts
src/features/legal/legal-reader.ts
src/features/legal/use-legal-gate.test.tsx
src/features/legal/use-legal-gate.ts
src/features/permissions/service.ts
src/features/posting/attribute-options.test.ts
src/features/posting/use-price-unit-labels.ts
src/i18n/bundle.ts
src/i18n/provider-layers.test.tsx
src/i18n/provider.test.tsx
src/i18n/provider.tsx
src/lib/env-flags.test.ts
src/lib/route-client.test.ts
src/lib/route-client.ts
src/lib/session-bearer.ts
src/lib/signed-in-route.test.ts
src/lib/signed-in-route.ts
src/lib/supabase-door.test.ts
src/lib/supabase-door.ts
src/routes/auth.tsx
src/routes/legal.publishing.tsx
src/routes/settings.tsx
src/start.ts

## Commits (BASE 3464182..HEAD)

4cf92b0 step 0 · 3b680c1 stop 1 · 19ebd54 part B · 046cad7 part C · 6b485f9 part D · 131f440 part E
(the last commit that touches code) · e913d3f part F. Every part's commit was preceded by
typecheck (clean), lint (0 errors, 39 warnings) and the part's tests.

## What passed

- THE CHECKS, in the brief's order: the hash list 52 of 52 OK; `git diff 3464182 --stat -- src/integrations`
  empty; lint `✖ 39 problems (0 errors, 39 warnings)`; typecheck clean; unit `Test Files 307 passed (307)`,
  `Tests 1918 passed (1918)`; `[i18n:map-guard] usage maps match the tree.` (1736 keys across 588 files,
  395 dynamic call sites); build exit 0; check-bundle-size `JS: 203.6 KiB / 207 KiB — ok`,
  `CSS: 20.5 KiB / 40 KiB — ok`, `Bundle budget OK.` (every page at the supervisor's measure, to the
  tenth); weight guard `findings: 0` (108 modules walked); check-hardcoded-strings `findings: 0`;
  format:check `All matched files use Prettier code style!`.
- SBD-1…13: 13 passed. BC-1…13: 13 passed. Conformance censuses: 17 files, 88 tests passed.
- D2 (planted, never committed): the weight guard `findings: 1` —
  `  src/components/app-shell.tsx reaches src/integrations/supabase/client.ts (DEC-261: the Supabase client loads through src/lib/supabase-door.ts)`;
  check-bundle-size exit 1 —
  `Bundle budget: dist-CE1baibP.js carries GoTrueClient (the Supabase client, DEC-261) in the first-paint closure of index--LL5lLXB.js.`;
  the file restored (`src/components/app-shell.tsx: OK`), rebuilt, `Bundle budget OK.`
- The frozen rule's first condition, on this build: the entry closure 254.0 → 203.6 KiB (50.4 KiB off;
  the floor is 45).
- THE END-TO-END CHECK (staging, both projects, 2 workers, fake mode, 0 retries; the preview server's
  output is piped into each run's log as `[WebServer]` lines, read for `[ssr-error]`):

  | Spec | Count line | `[ssr-error]` |
  | --- | --- | --- |
  | e2e/supabase-door.spec.ts | `4 passed (22.3s)` | 0 (35 server lines) |
  | e2e/smoke-auth-i18n.spec.ts | `2 passed (14.2s)` | 0 (7) |
  | e2e/auth-signout.spec.ts | `28 passed (2.0m)` | 0 (61) |
  | e2e/auth-callback.spec.ts | `4 passed (14.8s)` | 0 (9) |
  | e2e/auth-reset.spec.ts | `6 passed (26.6s)` | 0 (13) |
  | e2e/auth-signin-errors.spec.ts | `5 passed (17.5s)` | 0 (9) |
  | e2e/legal-accept.spec.ts | `12 passed (44.9s)` | 0 (31) |
  | e2e/i18n-bundle.spec.ts | `6 passed (26.1s)` | 0 (7) |
  | e2e/ad-page.spec.ts `--grep "AP-23 \|AP-26 \|AP-29 \|AP-54 "` | `2 failed`, `6 passed (1.2m)` | 0 (44) |

## The red: AP-54, both projects

```
✘  7 [mobile-360] › e2e/ad-page.spec.ts:1708:3 › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-54 the server draws the first cards and the browser keeps them: in the page's HTML, the very nodes once it is ready, no hydration error (D234 S6) (8.4s)
✘  8 [desktop-1280] › e2e/ad-page.spec.ts:1708:3 › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-54 … (8.2s)
Error: expect(received).toBe(expected) // Object.is equality
Expected: true
Received: false
> 1747 |     expect(kept).toBe(true);
```

The server's HTML held both cards (the assertion at :1737 passed), the feed became ready with two
cards (:1738–:1739 passed), but the first card's node was no longer the one the server drew: React
replaced it. AP-23, AP-26 and AP-29 (contact, save and report through the door) passed on both projects.

Classification (40-ci-evidence.md (e)): this turn's code. Proof, a local run against BASE's runtime code
(nothing reverted was committed): the 21 runtime files of parts B–C were restored from 3464182 with
`git restore --source=3464182… -- <files>`, `bun run e2e:local -- e2e/ad-page.spec.ts --grep "AP-54 "`
answered `2 passed (15.2s)`, and the files were restored from HEAD (`git status` clean, the hash list
52 of 52 OK again). One more run on HEAD, to capture a trace (`--project=desktop-1280`, one test alone),
answered `1 passed (14.3s)`: the failure is timing-dependent, not deterministic. No further runs were made
(DEC-184).

The cause, read from the code (not yet proven by a run): at BASE, a signed-out visitor's first auth event
and `getSession()` answer came from supabase-js after its own asynchronous initialisation. Through the door
they arrive at once — `onAuthChange` hears `INITIAL_SESSION` null on the next macrotask
(src/lib/supabase-door.ts :141-:144) and `currentSession()` answers in a microtask (:161). So
`useAuthIdentity` in src/i18n/provider.tsx (:267-:288) raises `settled` two tasks after mount, the provider's
bundle reads (now the door's anonymous fetch, src/i18n/bundle.ts) start and land sooner, and use-auth's
`applyUser` (src/features/auth/use-auth.ts :110-:116) and the shell's signed-out effect
(src/components/app-shell.tsx :743-:761: `removeQueries`, `setPermissionsState`, `setPanelChoice`) run
sooner too. An update that reaches the feed's Suspense boundary while it is still dehydrated (the held first
page still in flight, src/features/feed/use-feed.ts :87-:109) makes React client-render that boundary, which
replaces the server's nodes — exactly what AP-54 detects. Staging's latency (the first page travels from
ethio-staging) widens the window; CI's temporary backend may not show it.

Related, on BASE-equivalent code: CI run 40269083499 on 3b680c1 (stop 1's landing, docs only — its runtime
code is BASE's) failed PP-21 [mobile-360] (shard 5) with `strict mode violation: … listing-card-picture …
img resolved to 2 elements` (one under `shell-stack`, one under the "All listings" section): two copies of
the same scratch card in the page at once. Its code is not this turn's (40-ci-evidence.md (e) for that
commit; it passed on BASE's run 40265155741); it is named here because it may be the same family — the feed
drawn twice while the shell settles — and AP-54's race is the door's widening of it.

## Why this is a STOP

1. The brief's frozen rule (DEC-261) adopts the whole only when "AP-54 holds"; it does not hold locally.
2. Every fix touches files whose whole text the brief fixes by hash (src/lib/supabase-door.ts,
   src/i18n/provider.tsx, src/features/auth/use-auth.ts, src/components/app-shell.tsx), or files outside
   SCOPE (src/features/feed/use-feed.ts, src/features/feed/held-first-page.ts). 00-executor-protocol.md:
   "a departure from the brief's behaviour contract beyond its numbered CHANGEs" and "a file outside scope"
   are STOPs; the brief: "a mismatch is fixed by copying the block again, never by editing an expectation".
3. "A spec file not fully green is not committed" — no spec file was changed for this; e2e/ad-page.spec.ts is
   untouched.

## The question

A ruling on AP-54, for example one of:
(1) a change named by the supervisor, with its new hashes — candidates: hold the door's signed-out answers
    until the page has hydrated (e.g. `onAuthChange`'s null on an idle callback after the first commit rather
    than the next macrotask), or apply the i18n provider's and the shell's signed-out updates in a transition
    so a dehydrated boundary is not forced to client-render, or let the feed's boundary hydrate before the
    shell's updates reach it;
(2) land as is and let CI's temporary backend judge AP-54 (expected red named in advance: AP-54 and possibly
    PP-21), the frozen rule decided on that run;
(3) another instruction.
And a ruling on the reviewer's BLOCKER 2 (the sign-in screen on a failed client download) and its two MAJORs
(below), which also touch hashed files.

## The reviewer (the supervisor's note: run in the foreground on the last code commit before the report)

The independent reviewer (read-only, the `reviewer` agent) read the whole diff BASE..e913d3f against the
brief and the rules. It started in the background although the call asked for the foreground; I waited for
its answer and did nothing that depends on it until it arrived. It also read this stop report's draft while it
worked. Its verdict line, copied:

VERDICT: NOT READY — BLOCKER 2, MAJOR 2, MINOR 11

It confirmed: the hash list 52 of 52 OK, `src/integrations` untouched, SBD-1…13 and BC-1…13 passing (its own
run), every changed file in SCOPE or the named allowance, the flags held, the bearer middleware equal to the
generated attacher, a signed-in visitor's first event unchanged, no secret and no security finding. Its
findings, each against the brief's own fixed text, so none is fixed here (fixing one changes a hashed file —
the same conflict as AP-54's):

- BLOCKER 1 — AP-54 (above); it traced the same path and adds that the E2E hand-off (app-shell.tsx :768-:780)
  loads the client at mount, so signed-out listeners hear a second `INITIAL_SESSION` null in the same window,
  and use-auth's signed-out `setState` (use-auth.ts :51) is not equality-guarded.
- BLOCKER 2 — a failed download of the client chunk hangs the sign-in screen. Every auth action now begins
  `await getSupabase()`, which rejects when the chunk fails (load-once.ts); src/routes/auth.tsx sets `busy`
  and awaits with no catch or finally (:269-:278 sign-in/up, :318-:320, :340-:345 Google, :376-:378 reset), so
  `busy` stays true, the submit stays disabled and no message shows (F4). I checked the four sites myself. At
  BASE the client rode the entry, so this path did not exist. Fix candidates: the actions answer
  `{ ok: false, errorKey }` when the door rejects, or the screen wraps each submit in try/finally.
- MAJOR 1 — other load failures BASE could not have: `rpc()` rejects for a signed-in or framed visitor whose
  client did not load (supabase-door.ts :243), against the brief's "the door never rejects where the client's
  own call did not"; provider.tsx :391 and :577 then end in an unhandled rejection with no `[i18n]` line;
  `currentSession()`'s `failed` is ignored by use-auth and by requireSignedIn (signed-in-route.ts :15), so a
  signed-in visitor whose client failed is treated as signed out (sent from /admin or /settings to /); the log
  at :168 names a getSession failure "the client did not load".
- MAJOR 2 — the anonymous path is proven only against a mocked fetch (SBD-3); SBE-1 asserts nothing about an
  anonymous answer (no 2xx, no fallback warning); postgrest-js also sends `X-Client-Info`, which the anonymous
  call does not, so "exactly what the signed-out client sent" is not exact.
- MINOR (11): roadmap.md :509 was ticked `[x]` while this STOP is pending — un-ticked in this commit (the line
  is as STEP 0 wrote it); an `#access_token` hash landing on a path other than the callback is no longer
  consumed for a signed-out visitor (no current flow lands there; its grep found none); the door's key
  derivation now also answers for `http://localhost…` URLs, where auth-service's old regex returned null; two
  `as unknown as` casts in app-shell.tsx :772, :775 (brief text); `const data: T = JSON.parse(text)`
  (supabase-door.ts :221) types unvalidated JSON; a guard gap — a dynamic `import("@/integrations/supabase/client")`
  outside the door passes the vendor-seams census and the weight guard, and `MUST_NOT_CARRY` names only
  `GoTrueClient`; K2 siblings — auth-service.ts :20 (a second loadOnce of supabase-js, brief text),
  provider.tsx :145-:185 (`fetchPublicLanguages`, a second hand-built PostgREST read that never sends the bearer
  for an old JWT key), session-policy.ts :64-:132 (expected; roadmap line), src/i18n/server-shell-language.test.ts
  :3 (a client mock that now intercepts nothing); SBD-9's `imported` 0 check cannot fail (the mock is evaluated
  once per file) and each door import leaves a `storage` listener; untested: a rejected import in `rpc()` and
  `currentSession()`, unsubscribe before the client arrives, `newValue: null`, src/lib/session-bearer.ts;
  SBE-1 counts an unreadable script body as clean and bounds its negative check by an idle wait;
  `__ethioSupabase` now arrives after the chunk, not at mount (about 40 synchronous readers, most behind a
  signed-in wait — unaudited); docs/features/e2e-harness.md does not record `__ethioSupabase`'s timing or
  `__ethioClientOff`.

The supervisor's note says to fix every BLOCKER in a new commit and run the reviewer again. Both BLOCKERs sit in
files whose whole text the brief fixes by hash (and AP-54's may need src/features/feed/**, outside SCOPE), so
the fixes wait for the ruling asked above; the ruling may name them with new hashes, and I will then fix them,
show AP-54 red first and green after, and run the reviewer again.
