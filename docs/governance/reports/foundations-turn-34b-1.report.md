# Foundations turn 34b-1 — completion report

## 1. Outcome and parts

Part A and STEP 0 complete; Parts B, C0–C5 and D1 complete. THE CHECKS and every requested END-TO-END CHECK ran. Independent review complete: READY, no provable in-scope BLOCKER or MAJOR. Completion report complete; final CI remains the supervisor’s judgment. No manual build or typecheck command ran; the required e2e:local command internally builds its staging app.

## 2. Starting revision and exact brief

START = `a8a7a20703e29f5af4eb835f0b659221d4dc46de`, matching BASE. Saved brief SHA-256 `6fd16375c816c5cc8175048b257cc2c4136810f9a4f77efea4350059ea15466b`, 60,438 bytes, UTF-8/LF/one final newline. Every EDIT block was parsed from that file and applied by script, with exactly one OLD match per block and one write per file per part. All 13 prescribed final hashes print OK. No expectation was edited.

## 3. File list

- `docs/_changelog.md`
- `docs/governance/briefs/foundations-turn-34b-1.md`
- `docs/governance/mechanisms.md`
- `e2e/auth-signout.spec.ts`
- `roadmap.md`
- `scripts/conformance/auth-answers-allowlist.txt`
- `scripts/conformance/signed-in-routes.test.ts`
- `src/components/app-shell.tsx`
- `src/features/auth/auth-client.test.ts`
- `src/features/auth/auth-service.ts`
- `src/lib/stale-chunk.test.ts`
- `src/lib/stale-chunk.ts`
- `src/lib/supabase-door.test.ts`
- `src/lib/supabase-door.ts`
- `src/routes/settings.tsx`
- `docs/governance/reports/foundations-turn-34b-1.report.md` (this report, added after the captured list).

## 4. Behaviour contract — before → after

| Case | Before | After and evidence |
|---|---|---|
| Signed-out /settings visitor | Competing screen effects could send to / instead of /auth. | requireSignedIn runs before drawing; S-1 passes on the existing mobile project. |
| Server-confirmed sign-out | Library removes stored session; shell purges and navigates. | Unchanged; whole sign-out file 30 passed. |
| Server-unreachable sign-out | Library error retained session; sign-in marker absent, SO-11 red both widths. | Door removes session plus code-verifier/user; shell replaces / with a fresh load; SO-11 green both widths and remains signed out after network restoration/fresh load. |
| Client did not load | Generic failure left stored session. | Generic failure plus forgetStoredSession; ASC-3 passes. |
| Sign-in after expired prior session | Failed local eviction could keep prior session. | Failed or thrown eviction forgets it; ASC-4 and B-5 pass. |
| Page second failed download | Could reload after one minute if first failure was suppressed. | Never reloads on the same page; STC-1 passes. First-failure reload and existing five tests preserved. |
| Signed-in /settings | Member screen with existing settings. | Same contents, drawn browser-side; settings whole 4 passed and requested shell/security checks pass. |

Framed editor broker sessions are explicitly outside local-storage forgetting (SBD-19). A server-unrecorded sign-out leaves its server refresh token valid until expiry; local removal is not a claim of remote revocation. Blocked storage can return false; that limit is not proof of a removed session.

## 5. Red-first proof

```text
 FAIL  scripts/conformance/signed-in-routes.test.ts > every signed-in screen's door-step is requireSignedIn (INC-852) > CF-SIR-1 no route reads the session itself; ssr: false implies requireSignedIn
AssertionError: expected 'src/routes/settings.tsx:164 sends to …' to be '' // Object.is equality
+ src/routes/settings.tsx:164 sends to sign in from the screen
 FAIL  src/lib/stale-chunk.test.ts > reloadOnStaleChunk (INC-640) > STC-1 a page whose first failure came within the window is never reloaded by a later one (INC-922)
AssertionError: expected 1 to be +0 // Object.is equality
 FAIL  src/lib/supabase-door.test.ts > the client's door (DEC-261) > SBD-18 DEC-268 — forgetting the stored session removes it and the two items beside it, and nothing else
TypeError: forgetStoredSession is not a function
 FAIL  src/lib/supabase-door.test.ts > the client's door (DEC-261) > SBD-19 a framed page's session lives in the editor's broker: forgetting leaves storage alone and says so
TypeError: forgetStoredSession is not a function
 FAIL  src/features/auth/auth-client.test.ts > a sign-out ends the session on this device whatever the server answers (DEC-268) > ASC-3 a sign-out that cannot finish still ends the session on this device
AssertionError: expected "vi.fn()" to be called 1 times, but got 0 times
 FAIL  src/features/auth/auth-client.test.ts > a sign-out ends the session on this device whatever the server answers (DEC-268) > ASC-4 a sign-in that drops an expired prior session drops it from this device when the library keeps it
AssertionError: expected "vi.fn()" to be called 1 times, but got 0 times
 FAIL  src/features/auth/auth-client.test.ts > a sign-out ends the session on this device whatever the server answers (DEC-268) > ASC-5 every call that ends this device's session forgets the stored session when the library keeps it
AssertionError: evictExpiredSession: expected 'async function evictExpiredSession(su…' to match /forgetStoredSession\(\)/
 Test Files  4 failed (4)
      Tests  7 failed | 26 passed (33)
```

SO-11 before fixes:

```text
mobile-360: expect(locator).toBeVisible() failed; bottom-bar-sign-in absent (15000ms).
desktop-1280: expect(locator).toBeVisible() failed; header a[href="/auth"] absent (15000ms).
2 failed
```

The test reached expired storage plus aborted auth requests; no pass was mistaken for red proof.

## 6. Focused tests and THE CHECKS

- C5: 9 files / 58 tests passed. CF-SIR scanned 87 routes, 0 breaches; AAN scanned 589 files, 0 breaches.
- All 13 final hashes: OK. Integration/migration diff: empty.
- ESLint: 0 errors, 39 warnings.
- Full unit: 311 files; 309 passed files, 2 failed files; 1,943 passed tests, 1 existing skip, 4 timeouts (1,948 total).
- i18n:map-guard: usage maps match the tree (1,736 keys, 590 files, 395 dynamic call sites); no map changes required.
- Latest harness entry checked: build 2026-10-26T13:40:55Z — build OK. Red-first missing-export TS errors were resolved by C1.
- Format check clean at THE CHECKS; final report format check is run last again.

## 7. End-to-end count lines

All runs used e2e:local, fake mode, zero retries, existing two project definitions, default two workers where eligible, and the permitted Chromium 1194 path because the pinned browser was absent.

| Run | Exact count lines |
|---|---|
| C5 SO-11 | 2 passed (47.3s) |
| C5 S-1 | 1 passed (12.7s) |
| auth-reset | 1 passed (14.8s) |
| auth-signin-errors | 5 passed (26.9s) |
| breadcrumbs | 6 passed (1.0m) |
| layout | 2 skipped; 8 passed (33.1s) |
| legal-accept | 2 passed (26.0s) |
| mfa-stepup | 18 passed (2.0m) |
| phone-frame | 1 skipped; 1 passed (15.2s) |
| settings | 4 passed (47.3s) |
| shell | 5 skipped; 7 passed (35.2s) |
| signout | 30 passed (3.3m) |
| smoke-auth-i18n | 2 passed (23.7s) |
| supabase-door | 10 passed (1.1m) |

Whole specs: settings, auth-signout, auth-signin-errors, smoke-auth-i18n, supabase-door, mfa-stepup, breadcrumbs, layout. Filtered specs exactly as brief: LAC-3, pool user routes fit, R-9 and the stated shell alternatives. Totals of the end-to-end batch: 94 passed, 8 existing project skips, 0 failed. No killed or background rerun. Existing playwright.config.ts:66–73 excludes settings/auth-signin-errors/auth-reset from desktop, so S-1 and R-9 each run once; no project filters were changed to manufacture the brief’s expected two.

## 8. K2 census

- Device endings: auth-service.ts:205–208 evictExpiredSession and :292–294 signOut call forgetStoredSession on failure; :289 covers client absence. Sole exception :428 currentPasswordProof, whose verifier has persistSession:false at :419–421. Other-device-only calls :307, :386, :597, :655 are not local endings.
- Callers: app-shell.tsx:648 reads signOut answer and :655 replaces / on failure; use-auth.ts:91 deactivation clears user regardless and :124 returns the deliberate sign-out answer. Vendor seam census passes.
- Automatic stale-chunk failure reload: stale-chunk.ts:64, installed once by __root.tsx:417–418. Other src failure reloads are user actions: marketplace/feed.tsx:190 (category read failure), posting/step-where.tsx:78 (pin-map unavailable), error-page.ts:71 (generic Try again). Not changed; later download-notice consumers are scheduled under 34b-2/3.
- Ungated member screens: none after /settings joins requireSignedIn; signed-in census passes. Auth screens and the permission-gated staff panel are outside this member-door concern.

## 9. Allowlist, strings, migrations and records

AAN exception entries 2 → 1: app-shell signOut removed because its answer is read; use-auth deactivated-account signOut retained with DEC-268 instead of DEC-267. Strings: none. Migrations: none. Packages: none. Deleted files: none. AGENTS.md: unchanged. Mechanism register rows 29 and 50 and changelog copied exactly. Roadmap copied exactly: turn 34 ticked with its ruled closing evidence; 34b split into 1/2/3; 34c references requireSignedIn/settings. Turn 34b-1 stays unchecked as the prescribed NEW text states, pending final CI/supervisor closure; K1 also left unchecked as directed.

## 10. Independent review

Verdict: **READY — no provable in-scope BLOCKER or MAJOR**. Reviewed HEAD `96dbdf3bbf38767aa7894e3a550de607960dbe99`, tree `ea0dcdd61dc96b90f311661ae7ec06493277d3aa`; clean tree at review. BASE-to-working-tree full diff SHA-256 `781e2a2afc40c10cca46fd917177e5b4ec736c9be4a5829a59b767858908c0a1`; applying agent’s src/scripts/e2e diff SHA-256 `922f330fa55985471a3921529b0211e7a99b92753b164cad8af65b64ad87543a`. Reviewer independently checked all 13 hashes, session endings, Settings gate, stale-chunk first-failure ordering and final K2 census. No changes requested. Review confirmed limits: blocked/framed storage does not establish remote revocation; full-suite timeouts are not a green run; S-1 is mobile-only under the unchanged project filters. No code changed after review; only this report is added.

## 11. Departures and limits

- Initial CI was FAILURE on 6c445a3e, not S-1: shard 7 supplied no results or log. Reported 2,081 passed/155 skipped/0 failed only among available results. No missing shard was called green or fixed without evidence; it was not a red on BASE. Later BASE CI is SUCCESS (section 12).
- Full-unit timeouts: AAN-1, CF-SL-1, CF-SL-3 and CF-SL-6, each 5000ms. AAN-1/CF-SL-1 are named sandbox limits; CF-SL-3/6 are additional full-load limits in the same unchanged file, not pre-authorized exceptions. Both whole files pass isolated: 2 files, 8 tests. No timeout, skip or assertion was changed; full suite is not reported green.
- Existing project exclusions produce fewer passes than the brief’s S-1 expectation; these are disclosed, not changed outside scope.
- No manual app build/typecheck, stateful git, production write, package or generated-client edit.
- No final-turn CI verdict claimed from local checks.

Additional metadata inspection (read-only): every leaf, including index/settings, has the required title/description/OG/type/card fields. Pre-existing content specificity issues remain out of scope: c.$slug.tsx:22 uses generic Category OG title; legal.$kind.tsx:43–45 describes its test documents as “A test legal document.” No SEO change was requested.

## 12. CI evidence

Initial A1 first six lines:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `6c445a3e428b341c3d112dbb0990246364fb7f4d` (short `6c445a3`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-26T13:07:28Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40321484284
```

Initial failing-job evidence:

```text
Sources without results: shard 7
shard 7: no results file — the process failed outside test results (setup/teardown/preflight).
(no log tail was uploaded for this source)
##[error]E2E failed — see docs/tracking/e2e-last-failure.md
##[error]Process completed with exit code 1.
```

Last readable completed run, first six lines:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `a8a7a20703e29f5af4eb835f0b659221d4dc46de` (short `a8a7a20`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T13:35:13Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40326085964
```

This is BASE’s completed CI, not turn 34b-1’s final landing. The supervisor reads final CI after turn end.

J-audit: SO-11 leases one namespaced pool account, writes no database fixture, alters only its page storage/network interception, uses viewport-specific structural controls, and restores routes; existing tests unchanged; cleanup-survives-timeout is the harness lease/reaper ownership.
