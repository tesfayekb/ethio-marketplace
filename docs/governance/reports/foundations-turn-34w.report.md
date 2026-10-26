# Foundations turn 34w — incomplete completion report

Brief: docs/governance/briefs/foundations-turn-34w.md; SHA-256 bbf8f37562500d88b68b5a957a7327c589c81fc339ab7b8bd6a10972051366b0; 67,890 bytes. Code reviewed: b1d82c6ed691c2dca1b120847f5defa55fa705bf. Independent review pending; completion is not claimed.

## 1. Done by part and step

- A: START = bc963938f649d134784d317c78b15ec367f132d9 = BASE. All three CI evidence documents fetched. Only two gating failures: auth-reset R-2 and R-4 on mobile-360, duplicate status matches. Part C fixes these; no other CI code red identified.
- STEP 0: exact carrying message recovered through chat history, extracted between markers, UTF-8/LF/one final newline; prescribed SHA and byte count match.
- B: both FILE blocks and all test EDITs copied by script from the saved brief. Unit red matches all three expected failures. Browser red performed before application fixes; details below.
- C: exact notice edits; ODN tests pass and complete reset spec passes.
- D: exact shell edits, including offline branch; three focused files pass.
- E: exact stale-chunk edits; seven tests pass. Offline sign-out browser contract remains failing.
- F: exact rail and selector edits; usage regenerated, selector self-test passes. Menu and peek browser checks pass.
- G: exact docs and AGENTS edits; roadmap line 3 updated with suffix preserved; 34b-2 ticked; 34w remains unchecked because browser failures prevent completion. AGENTS is 8,980 bytes.
- THE CHECKS: executed in order and passed. THE END-TO-END CHECK: every named run executed; four sign-out failures remain. Reviewer: pending. Report: written honestly as incomplete.

## 2. Files from git diff --name-only START

- `AGENTS.md`
- `docs/_changelog.md`
- `docs/features/panels.md`
- `docs/generated/i18n-usage.json`
- `docs/governance/briefs/foundations-turn-34w.md`
- `docs/governance/mechanisms.md`
- `e2e/auth-signout.spec.ts`
- `e2e/settings.spec.ts`
- `e2e/shell.spec.ts`
- `public/i18n-usage.json`
- `roadmap.md`
- `scripts/conformance/signed-in-routes.test.ts`
- `scripts/e2e-select.ts`
- `src/components/app-shell.tsx`
- `src/components/shell/app-rail.tsx`
- `src/components/shell/on-demand-notice.test.tsx`
- `src/components/shell/on-demand-notice.tsx`
- `src/lib/signed-in-pages.test.ts`
- `src/lib/signed-in-pages.ts`
- `src/lib/stale-chunk.test.ts`
- `src/lib/stale-chunk.ts`
- `docs/governance/reports/foundations-turn-34w.report.md`

No deletion, migration, package change, or generated Supabase edit. New source/test/brief files proved tracked with git ls-files --error-unmatch.

## 3. Behaviour contract — before → after

- Signed-out /settings: passing /auth frame followed by home and absent email → sign-in email can be typed, return=/settings preserved, no home frame. S-1 passes every prefix in the six-page list. Actual /settings post-sign-in return not independently exercised by these exact tests; not claimed.
- Offline sign-out: browser offline page in red-first test → final SO-12 still fails, now application's “This page didn't load” fallback, not a usable signed-out shell. Screenshot and error-context inspected by applying agent at both widths. Storage removal and reconnect assertions are not reached, so their browser outcomes are unverified.
- Failed download offline: first failure reloaded → STC-2 proves no reload at first offline failure or later online failure on the same page.
- Phone menu: fixed sliding × → × absent; top-left ☰, outside tap and Escape work in selected shell/overlay tests; touch target checked.
- Late peek: never showed → PK-2 shows once for at least 2,500 ms after late code delivery. Full three-second mechanism clock starts at onOpenAutoFocus; test's animation-tolerant threshold is unchanged from brief.
- Menu opened before sign-in check ends: peek closed it → PK-3 holds it for four seconds after signed-in marker.
- Notice: empty permanent status collided with reset status → aria-live stays, role removed; ODN-2 and R-2/R-4 pass.
- Online sign-out/common session evacuation: 28 sign-out checks pass; SO-11 fails before click at both widths, so this failure path is not verified.

## 4. Red-first evidence

Unit command: bunx vitest run scripts/conformance/signed-in-routes.test.ts src/lib/signed-in-pages.test.ts src/lib/stale-chunk.test.ts src/components/shell/on-demand-notice.test.tsx.

- CF-SIR-4: expected 'import { CARD_SURFACE } from "@/compo…' to match /const ownSignIn = sendsToSignIn\(path…/.
- STC-2: AssertionError: expected true to be false.
- ODN-2: expected [ <p role="status"></p>, …(1) ] to have a length of 1 but got 2.
- Test Files 3 failed | 1 passed (4); Tests 3 failed | 12 passed (15).
- S-1 /settings: 1 failed (mobile); locator.pressSequentially timed out waiting for #auth-email after the home detour. The prerequisite first invocation stopped before tests because i18n map-guard regenerated stale maps; the real run followed after that prerequisite.
- SO-12: 2 failed; expect(signInMarker).toBeVisible, element not found, 15,000 ms (both widths).
- PK-2/PK-3: 2 failed, 2 desktop skips. First errors: “INC-924: the late peek never showed”; “INC-924: the peek took over the person's menu and closed it”.

## 5. Required checks

- All 19 final hash lines OK; brief SHA/bytes exact. src/integrations/supabase diff empty; all supabase diff empty.
- Lint: 0 errors, 39 warnings.
- Full unit: Test Files 316 passed (316); Tests 1961 passed | 1 skipped (1962), 208.20 s. No sandbox timeout in this run. The carrying brief's “every one passed” differs from actual existing skip; actual totals reported.
- Focused C: 1 file, 2 tests pass. D: 3 files, 8 tests pass. E: 1 file, 7 tests pass. Selector self-test OK: every spec reachable; every area glob matches.
- i18n:map-guard: maps match tree; 1738 keys across 593 files (395 dynamic sites).
- Hardcoded-string scanner: findings 0; self-test bad fixture 1/good fixture 0.
- Format check after THE CHECKS: All matched files use Prettier code style! Final report formatting rechecked at end.
- Latest harness build entry: build OK. Red-first test's temporary TS2353 (navigator missing from BASE StaleChunkWindow) resolved by prescribed Part E; no manual typecheck/build command.

## 6. End-to-end results

Every run used bun run e2e:local, 2 workers, 0 retries, fake mode, permitted Chromium 1194 override, within 600 s. Port 4173 checked free before each run. Config intentionally excludes desktop settings/reset: these specs have mobile results only, not two-width claims.

| Requested run | Actual count line |
| --- | --- |
| settings whole | 9 passed (43.8s) |
| auth-signout whole | 4 failed; 28 passed (5.0m) |
| auth-reset whole | 6 passed (29.4s) |
| shell --grep RL-1\|RM-\|primary touch targets\|PK-\|FV-1 | 8 skipped; 12 passed (1.3m) |
| overlays whole | 1 skipped; 5 passed (12.6s) |
| on-demand-failure whole | 2 passed (11.8s) |
| account-saved whole | 4 passed (37.6s) |

Aggregate final required runs: 66 passed, 4 failed, 9 existing project skips. C's earlier auth-reset whole: 6 passed (29.2s), not added to aggregate. Server [ssr-error] count from each full run's entire captured log: 0 per run, no paths. These are server tag counts, not a claim of zero client/runtime errors; abort and deliberate offline client errors exist.

Outstanding:

- SO-11 mobile and desktop: Test timeout 120000 ms; locator.click waiting for account-menu / app-rail rail-sign-out before sign-out executes. Exact cause not proved; readiness/session-refresh race is a hypothesis, not a fix claim.
- SO-12 mobile and desktop: sign-in marker not found after 15,000 ms. Prescribed offline path continues through await navigate({to:"/",replace:true}); root loader calls getSsrLangContext over HTTP; offline createServerFn transport errors replace AppShell with application's error view. No reload-attempt/storage/reconnect assertion was reached.

## 7. Consumer census at START



1. **Always-mounted notice adds a page-wide status.** `src/components/shell/on-demand-notice.tsx:27` assigns status to the permanently mounted wrapper, while only its children are conditional. It collides with `e2e/auth-reset.spec.ts:47,144`. The other named consumers are `e2e/settings.spec.ts:127` (form-scoped; not the current working tree's shifted lines) and `e2e/legal-admin.spec.ts:989` (text-filtered). `LoadFailedHere` at notice line 82 is an alert with words, not the empty shell-wide region.
2. **INC-925: independent sign-in classification drifts.** `src/components/app-shell.tsx:756` ownSignIn includes only /account and /my-listings prefixes, missing /settings; `:737-741` gatedRoute includes /settings and `:773` evacuates it to /. `src/routes/settings.tsx:57` already redirects via requireSignedIn. S-1 at `e2e/settings.spec.ts:21` only observes arrival, not continued residence. No signed-in-pages module/list exists at BASE. The conformance scanner does not enforce equality between actual requireSignedIn callers and the shell's exemption list.
3. **Offline self-started reloads remain unguarded.** `src/components/app-shell.tsx:656` replaces location after signOut returns failure, before the ordinary cancel/remove cache purge; no offline branch/reconnect listener. `src/lib/stale-chunk.ts:64` reloads on first preload failure regardless of connectivity; its first-failure latch is set at :55 before retry checks. These are app-initiated even if signing out began as a click (hardReset also serves session expiry). Distinguish explicit refresh controls below.
4. **D238: fixed child inside sliding phone menu.** `src/components/shell/app-rail.tsx:982-991` draws rail-menu-close, fixed at :988 inside animated Dialog content (:948). The child's containing block changes during transform animation; the × also contradicts the requested menu interaction. BASE test dependencies: `e2e/shell.spec.ts:1173,1203` (RL-1), :1377 (RM-2), :1566 (touch target), :3914 (FV-1). These are exact BASE lines, not subsequent revisions.
5. **INC-924: peek claims existing menu and spends its clock before content exists.** `src/components/shell/app-rail.tsx:829-853` does not check navOpen before assigning peek ownership; :855-876 starts its three-second timeout at :866 from navOpen/peeking, not a committed menu node. Lazy overlay arrival consumes the interval. Existing recorder/test is PK-1, `e2e/shell.spec.ts:3725` onward; BASE has no PK-2/PK-3 proof of these conditions.


Door-step callers at immutable BASE: account.tsx:9; account_.legal.tsx:8; account_.legal_.$versionId.tsx:8; account_.saved.tsx:8; legal.accept.tsx:16; legal.publishing.tsx:47; my-listings.tsx:15; my-listings_.$listingId.tsx:19; my-listings_.$listingId_.edit.tsx:26; post.tsx:29; post_.$listingId.tsx:30; settings.tsx:57 (all under src/routes). Every one is covered by the six address prefixes; CF-SIR-4 verifies both directions and shell consumption.

## 8. K2 — siblings not changed

- Independent sign-in list app-shell.tsx:756 removed. Different concerns retained: app-shell.tsx:737–741 gatedRoute; :513–526 routePanel; shell/breadcrumbs.tsx:358–365 ownPage (:180 account branch).
- Only two automatic full-load mechanisms found at BASE: app-shell.tsx:656, stale-chunk.ts:64; both edited. User-triggered reloads unchanged: marketplace/feed.tsx:190, lib/on-demand-failure.ts:50–51, lib/error-page.ts:71; notice buttons at :45/:95.
- Empty permanent status sibling src/components/ui/fading-notice.tsx:35–41; consumers features/my-listings/my-listing-page.tsx:540 and features/posting/wizard.tsx:1117. Out of scope, not edited; contradicts brief's broad “every other status” census statement, not shell-wide duplication fix.
- Other always-drawn structural roles: shell/app-header.tsx:43/:152 search; shell/panel-tabs.tsx:32/:47 tablist/tab. These are legitimate structural roles, not empty live statuses. Conditional shell statuses app-shell.tsx:876/:897; rail error app-rail.tsx:659 and strings-layer-gate.tsx:29 are failure/notice-only.
- Only fixed descendant control within sliding panel found: rail × app-rail.tsx:988, removed. toolbar-panel header close is in flow; sheet/dialog closes absolute; fixed panel containers are not descendant controls.
- Metadata audit: index/root country-specific wording and category generic metadata are pre-existing/out of scope; no metadata changed. No new route in this turn.

## 9. Independent reviewer

Pending independent reviewer on final code commit b1d82c6ed691c2dca1b120847f5defa55fa705bf. Diagnosis task separately identified offline router navigation/server-loader dependency; no code changed after hashes passed. Verdict will be inserted before end.

## 10. Departures and blocked work

- No speculative edits, no altered hashes, no weakened tests. SO-12 repair would require changing prescribed app-shell bytes (and possibly server-loader behaviour outside scope). This conflicts with instruction to fix hash differences only by re-copying exact blocks; corrective ruling needed for code departing from pinned bytes. Await independent verdict.
- Existing config excludes desktop Settings/reset; no harness change made to force them.
- Map-guard regenerated maps early as E2E prerequisite; Part F regenerated them again; final hashes match.
- No repeat runs of failed final specs, no background E2E run, no time ceiling workaround.
- Part C build log still showed the intentional Part B temporary navigator shape error, whose root is Part E; fixed there rather than prematurely defeating red-first test.
- Files under .claude/ and CLAUDE.md not read or edited.

## 11. Migrations, strings and last readable CI

Migrations: none. New strings: none. Packages: none. Latest readable CI remains BASE; final turn CI unverified.

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `bc963938f649d134784d317c78b15ec367f132d9` (short `bc96393`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-26T15:23:57Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40345497360
```

R-2 and R-4 first error line: Error: strict mode violation: getByRole('status') resolved to 2 elements. The shell notice and reset answer were both matches. Complete reset specs now pass locally; no final CI-green claim.

## 12. Limits and closure

No named unit sandbox limits occurred in final full run. Browser override Chromium 1194 used because pinned managed Chromium absent. All requested runs completed below 600-second ceiling. Offline flow is not verified complete; SO-11 pre-click failure not diagnosed uniquely. Sign-in return to actual Settings after success not separately exercised. No publish or migration performed. Roadmap 34w left unchecked pending correction and passing sign-out proof.

J-audit: new cases use no real reference writes; S-1 has no rows; SO-12 and PK-3 each lease one pool account; existing harness cleanup retained; no weakened refusal assertion; cleanup-survives-timeout.
