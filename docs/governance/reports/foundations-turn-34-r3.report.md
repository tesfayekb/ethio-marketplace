# Turn 34 — speed S11: the Supabase client off every public page's first download (DEC-261); ruling 3: Forgot password never claims a link that was not sent; every auth action's answer read where it is called (INC-915, DEC-267)
Base: b98e4346b12f651cbad62980eafa317b6504782c · Final commit: fd3c6870 · Brief: docs/governance/briefs/foundations-turn-34-r3.md (sha256 25a9c18304c42ed87f92e2068abf1c54ed84ca8b8d7a028ca3e9f1e294798f39)

This report closes the whole turn. Its earlier parts are already on `dev`:
- Parts A–F of docs/governance/briefs/foundations-turn-34.md
- ruling 2 (docs/governance/briefs/foundations-turn-34-ruling-2.md)
- the r2 brief (docs/governance/briefs/foundations-turn-34-r2.md)

They were landed with stops 1–3 and the r2 stop 1, and those stop reports (docs/governance/reports/foundations-turn-34.stop-1…3.md, foundations-turn-34-r2.stop-1.md) give their evidence. This report covers the landing range b98e4346..HEAD (ruling 3) and the turn's close. The last commit touching src/ is f8266e64 (R3-4). fd3c6870 (R3-5, the records) is the last commit before this report.

## 1. Done / not done, by part and step

- **STEP 0 — done (4a5c0007).**
  - The brief was saved byte for byte. Its sha256 is 25a9c18304c42ed87f92e2068abf1c54ed84ca8b8d7a028ca3e9f1e294798f39 (49423 bytes), equal to the carrying message's value.
  - roadmap.md line 3 names it. Nothing was ticked.
  - scopeVerdict was asked for the new paths, and every one was in scope.
- **R3-1 — done (red first, nothing committed).**
  - BLOCKS D, E and F were written verbatim, and their sha256 equal the hash list.
  - AAN-1 was red with exactly one breach; AAN-2 was green.
  - SBE-5 was red on both projects. The lines are in section 5.
- **R3-2 — done (65887181).**
  - The forgot form in src/routes/auth.tsx reads its answer (EDITs #1–#6).
  - BLOCKS D, E and F were committed.
- **R3-3 — done (061e23a6).**
  - src/client.tsx became BLOCK C: its message is built from `PLACED_DEADLINE_MS`.
  - The comment edit in src/lib/supabase-door.ts was made.
- **R3-4 — done (f8266e64).**
  - In src/lib/supabase-door.test.ts, each case records the `storage` listener its own import registered, and afterEach removes them.
  - SBD-9 and SBD-17 read their own listener.
  - The file was run 10 times in parallel pairs (section 5).
- **R3-5 — done (fd3c6870).** The records:
  - docs/features/performance-strategy.md
  - docs/governance/mechanisms.md (rows 50 and 51)
  - docs/features/e2e-harness.md
  - docs/_changelog.md (one line appended)
  - roadmap.md: R3-5's #1 and #2
- **R3-6 — done.**
  - THE CHECKS ran, with r2's change (c) and the r3 hash list.
  - THE END-TO-END CHECK ran.
  - The reviewer ran in the foreground on the last code commit: `VERDICT: READY — BLOCKER 0, MAJOR 4, MINOR 6`.
  - This report.
- **Not done:** nothing the brief asked for. The reviewer's four MAJORs are listed, not fixed. The reason for each is in section 10.

## 2. Files changed  (verbatim `git diff --name-only <BASE>`; new files with `git ls-files` proof)

`git diff --name-only b98e4346` at fd3c6870:

```
docs/_changelog.md
docs/features/e2e-harness.md
docs/features/performance-strategy.md
docs/governance/briefs/foundations-turn-34-r3.md
docs/governance/mechanisms.md
e2e/supabase-door.spec.ts
roadmap.md
scripts/conformance/auth-answers-allowlist.txt
scripts/conformance/auth-answers.test.ts
src/client.tsx
src/lib/supabase-door.test.ts
src/lib/supabase-door.ts
src/routes/auth.tsx
```

Plus this report, docs/governance/reports/foundations-turn-34-r3.report.md, which is committed on its own.

- **New files** (`git diff --name-only --diff-filter=A b98e4346`, each listed by `git ls-files`):
  - docs/governance/briefs/foundations-turn-34-r3.md
  - scripts/conformance/auth-answers-allowlist.txt
  - scripts/conformance/auth-answers.test.ts
- **Deletions:** none (`--diff-filter=D` counts 0).
- **Size:** `13 files changed, 888 insertions(+), 31 deletions(-)`.

Every changed file's sha256 at fd3c6870 (`sha256sum`):

```
9984b04f60b20d216f3c6b3ae69128f8e8983724bc91b7b55c12f420c5967092  docs/_changelog.md
0ec80e5e93923095c7c59e765d35c7488c73f6847d5d2c57bbdd57fdee9693ad  docs/features/e2e-harness.md
208e7faae960870744a3ace120c8ac7a3600466d6d70e53d191ea27657edd0f2  docs/features/performance-strategy.md
25a9c18304c42ed87f92e2068abf1c54ed84ca8b8d7a028ca3e9f1e294798f39  docs/governance/briefs/foundations-turn-34-r3.md
d32dad6ab02f737259850eeed377e46ded3e52b69461530a0d6255a84e0b3594  docs/governance/mechanisms.md
7e19f1632e12728c62d8fda4eb0f765c8e6216bfef4227d5c10125eaf85564a9  e2e/supabase-door.spec.ts
d43bfebabf1a0b9f5080346354b9f1ec629f6671502f33cfd60a0de3bda1ce08  roadmap.md
a91a9956f7956d03825535c405b6de94e28335021fc660d93f486c0b972e6130  scripts/conformance/auth-answers-allowlist.txt
74fefb08ef5c26ae9a100c930fbffd38889b7f33def6476b3c70f4efb5025e65  scripts/conformance/auth-answers.test.ts
50a959a7065841a42f1b68177faf3bb64fc675106e59540a5847bb2348d679d5  src/client.tsx
e6b1a46171dde3de788ec7e6d407d15024e89b643d449a68494b95367545ba28  src/lib/supabase-door.test.ts
c1771f5799ffae4e49c6e1d0802c1363f1b6ebf73de75cd6f97528b9fa7f1557  src/lib/supabase-door.ts
b27c7d10aef777482a59aacacecb9de0d5f00562b08480a4e0e290061b069513  src/routes/auth.tsx
```

The brief's hash list, checked with `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34-r3.md | sha256sum -c`, gives 10 lines, all OK:
- src/client.tsx
- e2e/supabase-door.spec.ts
- scripts/conformance/auth-answers.test.ts
- scripts/conformance/auth-answers-allowlist.txt
- src/routes/auth.tsx
- src/lib/supabase-door.ts
- docs/features/performance-strategy.md
- docs/governance/mechanisms.md
- docs/features/e2e-harness.md
- docs/_changelog.md

## 3. Behaviour contract — answer tables before → after  (every touched route/function/screen)

**The /auth "Forgot password" form (`handleForgot`, src/routes/auth.tsx).** `requestPasswordReset` answers `ok:false` only when the client could not be downloaded (`CLIENT_FAILED`, INC-915). No request leaves the browser in that case. Every answer from GoTrue is `ok:true`, as at BASE (B-3).

| Case | BASE b98e4346 | Now |
|---|---|---|
| Valid address, client downloaded, any GoTrue answer | `auth.resetNeutral` shown; the try is counted; 60 s cooldown | the same |
| Valid address, client download failed (`CLIENT_FAILED`) | the answer was discarded: `auth.resetNeutral` ("on its way") shown, a try spent, 60 s cooldown | `auth.errorGeneric` in `p[role=alert][data-testid=auth-reset-error]`; no `auth.resetNeutral`; the try given back (`setResendCount(n → max(0, n−1))`); cooldown 0, so the button is enabled with `auth.resetSend` (CHANGEs #3, #4) |
| Invalid address, throttle, in-flight guard | unchanged | unchanged |

The `busy` state is still released in the existing `finally`.

**The /auth error lines.**
- The forgot view's error `<p role="alert">` carries `data-testid="auth-reset-error"` (#5).
- The sign-in/sign-up error `<p role="alert">` carries `data-testid="auth-error"` (#6).
- Their text, role and class are unchanged.

**src/client.tsx (the browser's entry).**
- At BASE the deadline line was `[client-error] the first screen was not placed 1.5 s after the page was read; hydrating anyway`.
- Now it is the same text, built from `${PLACED_DEADLINE_MS / 1000}`. `PLACED_DEADLINE_MS` is 1500, so the words are identical.
- Behaviour is unchanged.

**src/lib/supabase-door.ts.** Comments only. Its exports, answers and logs are unchanged.

**Tests and records.** The test files and the records have no runtime answer.

Nothing else differs beyond the numbered CHANGEs. I checked this with `git diff b98e4346 HEAD -- src/routes/auth.tsx src/client.tsx`: its non-comment lines are only the ones above.

## 4. Censuses  (every grep the brief asked for, with file:line; "none found" only after the grep)

**The auth-action answer census (AAN, BLOCK E).** It is an AST census of every call of the auth-service actions under src/, tests excepted.
- On BASE plus BLOCKS E and F: one breach, `src/routes/auth.tsx:392 requestPasswordReset() — its answer is discarded` (section 5).
- After R3-2: 0 breaches outside the allowlist. `bunx vitest run scripts/conformance/auth-answers.test.ts` gives `Tests  2 passed (2)`.
- AAN-1 asserts its own floor (at least 100 files and 15 actions walked) and passes.
- The two allowlisted sign-outs:
  - src/components/app-shell.tsx:645 (`await signOut();`)
  - the deactivated-account sign-out in src/features/auth/use-auth.ts
  - Both are live: a stale line fails in kit.ts.
- **The consumers of `requestPasswordReset`'s answer** (G0.3, named by the brief): `grep -rn "requestPasswordReset" src/ | grep -v "\.test\."` finds:
  - src/features/auth/auth-service.ts, the definition
  - src/routes/auth.tsx, the forgot form (read now)
  - No other caller.

## 5. Tests  (ids added/changed/re-pointed with reasons; red-first evidence; unit totals; the E2E count lines and [ssr-error] counts; the J-audit line when e2e/** changed)

**Added:**
- AAN-1 and AAN-2 (scripts/conformance/auth-answers.test.ts, BLOCK E).
- SBE-5 (e2e/supabase-door.spec.ts, BLOCK D).

**Changed:**
- **SBE-4.** BLOCK D enumerates the change: the error is read by `getByTestId("auth-error")` plus `toHaveText(en["auth.errorGeneric"])`, where it was `p[role=alert]` filtered by text. Both SBE-4 and SBE-5 open through `openAfterTheOneReload` and assert two loads.
- **SBD-9 and SBD-17** (src/lib/supabase-door.test.ts, R3-4). They read the `storage` listener their own import registered, and assert exactly one storage listener and one auth listener. afterEach removes the listeners each case recorded.

**Red first (R3-1, nothing committed).**

`bunx vitest run scripts/conformance/auth-answers.test.ts` on BASE plus BLOCKS D/E/F:
```
× AAN-1 no call under src/ discards an auth action's answer 1468ms
FAIL  scripts/conformance/auth-answers.test.ts > an auth action's answer is read where it is called (INC-915) > AAN-1 no call under src/ discards an auth action's answer
src/routes/auth.tsx:392 requestPasswordReset() — its answer is discarded
Tests  1 failed | 1 passed (2)
```

`bun run e2e:local -- e2e/supabase-door.spec.ts` on BASE plus BLOCK D gave `4 failed` / `6 passed (1.3m)`:
- SBE-5, desktop-1280 and mobile-360: `Locator: getByTestId('auth-reset-error')` · `Error: element(s) not found`.
- SBE-4, desktop-1280 and mobile-360: `Locator: getByTestId('auth-error')` · `Error: element(s) not found`. This is a departure, see section 10: R3-1 expected SBE-4 to pass.
- SBE-1…3 passed on both projects.

After R3-2 the same file gave `10 passed (40.0s)`, and e2e/auth-reset.spec.ts gave `6 passed (27.1s)`.

**R3-4, the file 10 times in parallel pairs** (5 pairs of `bunx vitest run src/lib/supabase-door.test.ts`): `Tests  17 passed (17)` on 10 of 10 runs.

**Unit (`bun run test:unit`, THE CHECKS):** `Test Files  311 passed (311)` · `Tests  1937 passed (1937)`. That equals the supervisor's 311 / 1937.

**THE END-TO-END CHECK.** Target: ethio-staging, both projects (mobile-360, desktop-1280), fake mode, 0 retries, `bun run e2e:local -- <file>`, each file whole and alone, ids by `--grep`. The `ssr-error]` line count was 0 in every run's log.

| Run | Count line |
|---|---|
| e2e/supabase-door.spec.ts | `10 passed (41.3s)` |
| e2e/smoke-auth-i18n.spec.ts | `2 passed (14.8s)` |
| e2e/auth-signout.spec.ts | `28 passed (2.0m)` |
| e2e/auth-callback.spec.ts | `4 passed (15.8s)` |
| e2e/auth-reset.spec.ts | `6 passed (28.2s)` |
| e2e/auth-signin-errors.spec.ts | `5 passed (19.2s)` |
| e2e/legal-accept.spec.ts | `12 passed (47.0s)` |
| e2e/i18n-bundle.spec.ts | `6 passed (27.1s)` |
| ad-page, `--grep` AP-23, AP-26, AP-29, AP-54 | `8 passed (1.2m)` |
| photo-pipeline, `--grep` PP-21 | `2 passed (22.5s)` |
| post-wizard-pricing, `--grep` PW-94 | `2 passed (13.4s)` |

**J-audit (e2e/supabase-door.spec.ts, SBE-4/5):**
- J1/J3: no fixture and no row. The address `nobody@example.test` is typed and never created.
- J2: no sweep.
- J4: no count of rows. The one count asserted is the page's own load count.
- J5: locators are by test id, role plus EN key, and `#reset-email`. No `.first()`.
- J6: no roster.
- J7: built-in waiting only (`expect.poll`, `toHaveText`), no `waitForTimeout`.
- J8: not `@global-state`.
- J9: no identity (signed out).

**The frozen rule (DEC-261), with numbers:**
1. The entry closure goes from 254.0 to 204.1 KiB, 49.9 KiB off against a floor of 45. check-bundle-size on this session's `bun run build` (exit 0) prints `JS: 204.1 KiB / 207 KiB — ok`, `CSS: 20.5 KiB / 40 KiB — ok` and `Bundle budget OK.`. The supervisor's figure is JS 204.1 / 207.
2. Every sign-in, sign-up, callback and session test is green:
   - in CI on b98e4346 (run 40287618859, SUCCESS, section 11)
   - locally in the table above
3. AP-54 holds: green in that CI run and locally (above).

## 6. K2 — siblings that bypass the mechanism  (file:line, in scope or not; what was left and why)

Greps run:
- `grep -nE "signIn: authService|void .*\)\.then\(" src/features/auth/use-auth.ts src/i18n/provider.tsx`
- `grep -nE "handleResend|setResendCount" src/routes/auth.tsx`
- the reviewer's `grep -nE "=>\s*(void\s+)?([A-Za-z]+\.)?(<actions>)\("` over src/

Found:
- **src/features/auth/use-auth.ts:131** `signIn: authService.signInWithPassword`. The action is re-exported under another name, so AAN's census does not see calls of `signIn(...)` (src/routes/auth.tsx). Today those calls read their answer. Left as is: AAN's text is BLOCK E (hash-bound). See MAJOR-1.
- **src/i18n/provider.tsx:442 and :506**: `void action(…).then(…)` chains. The census judges the `.then` callee, not the action. Today both callbacks read their answer. Left as is for the same reason (MAJOR-1).
- **src/routes/auth.tsx:304, `handleResend`.** It shares the forgot form's throttle and cooldown. On `CLIENT_FAILED` it keeps the try spent and the 60 s cooldown, and shows the error. That is not the forgot form's refund. It is in a file in SCOPE but not in the brief's CHANGEs, so it was left as is (MINOR-3).
- **Arrow functions returning an action, discarded by their caller:** none found. The grep hits src/features/auth/use-auth.ts:124 and src/routes/settings.tsx :271, :289, :326, :344, :350, and each of those is returned or read.

## 7. Allowlists and guards  (each allowlist's count before → after; every new line with reason and until; guard self-tests run)

scripts/conformance/auth-answers-allowlist.txt is new (BLOCK F). It goes from 0 entries to 2, plus one header comment:
- `src/components/app-shell.tsx:signOut`: the deliberate sign-out's hard reset, as BLOCK F words it. Until: `DEC-267`.
- `src/features/auth/use-auth.ts:signOut`: a deactivated account's sign-out (D189), as BLOCK F words it. Until: `DEC-267`.

Guards and self-tests:
- AAN-2 is the census's planted-file self-test, and it is green.
- AAN-1 makes the allowlist's lines live: a stale line throws in kit.ts.
- The census is wired: vitest finds `scripts/**/*.test.ts`, and wired.test.ts's domain leaves `.test.ts` out.
- No other allowlist changed. `git diff --name-only b98e4346` names no other `*-allowlist.txt`.

## 8. Strings

None: the brief says no new string. No locale file changed (section 2). `bun run i18n:map-guard` prints `usage maps match the tree.` (1736 keys across 590 files, 395 dynamic call sites).

## 9. Migrations

None. `git diff --name-only b98e4346` names no supabase/ path.

## 10. Departures

**Stops and rulings in the turn:**
- **Stop 1** (foundations-turn-34.stop-1.md) had two values:
  - the saved brief's sha256: 9d0a4d42973b127a5815ac719779f2d1f2d617f5b99a822530831e9d878ade4c
  - the carrying message's value: 9d59722dae4c0a7c2b477b4e821e6fc0075b32f8260ee80d98a49c899c0a7465

  The only difference was the last line ("…reads the run." against "…reads it.").

  Ruling 1 said "the saved brief stands. Base: dev 3b680c1a". The saved copy is the brief in force and was not re-saved; the roadmap edits stood. "The report's Departures (section 10) names both sha256 values and this ruling."
- **Stop 2** (foundations-turn-34.stop-2.md): AP-54 failed locally on the door's code. The frozen rule's third condition, together with the reviewer's two BLOCKERs, led to ruling 2 (foundations-turn-34-ruling-2.md, sha256 6f55ba63c9078f5ef9fd52f4518996fe12ceac1218775a413ca8f7efe61f18d0): DEC-266 / INC-913, INC-915, INC-916 and INC-917.
- **Stop 3** (foundations-turn-34.stop-3.md): the scope guard could not read ruling 2's new files, which led to the r2 brief (foundations-turn-34-r2.md, sha256 762a86c4df3287b9f091bb7537ce4426f3a310add44a5cc9137770be1a03af37).
- **r2 stop 1** (foundations-turn-34-r2.stop-1.md): the reviewer's BLOCKER (the forgot form's answer) needed a test file outside SCOPE, which led to ruling 3, this brief.

**Departures in ruling 3:**
- **R3-1: SBE-4 was red too.** R3-1 expected SBE-1…4 to pass. SBE-4 failed on both projects only because `getByTestId('auth-error')` was not found. That test id arrives with R3-2's EDIT #6, which BLOCK D's changed SBE-4 reads. After R3-2, SBE-4 is green.
- **roadmap.md.** Prettier writes `__ethioSupabase` as `\_\_ethioSupabase` in roadmap.md. That was accepted under ruling 3.

**The reviewer:** `VERDICT: READY — BLOCKER 0, MAJOR 4, MINOR 6`. No BLOCKER, so it was not run again. Each MAJOR was checked against R3-6's "fixed when it is in SCOPE and provable, otherwise listed".

- **MAJOR-1: the AAN census sees only some ways of calling an action.**
  - It matches a callee by the action's own name only. It misses:
    - a renamed re-export (src/features/auth/use-auth.ts:131 `signIn`)
    - `.then/.catch/.finally` chains (src/i18n/provider.tsx:442, :506)
  - So AAN-2's title, "in every spelling", claims more than the census checks.
  - Listed, not fixed: the census is BLOCK E, bound by the brief's hash list. Changing it is the supervisor's ruling.
  - The reviewer's fix options:
    - resolve each callee to its auth-service export through the import and re-export bindings
    - unwrap promise chains
    - plant both shapes in AAN-2
- **MAJOR-2: SBE-5 does not prove that the try is given back.**
  - `MAX_RESENDS_PER_VISIT` is 3 and SBE-5 makes one try. Without the `setResendCount` refund the button stays enabled, so SBE-5 stays green.
  - The cooldown refund is proven.
  - Listed: SBE-5 is BLOCK D (hash-bound).
  - The reviewer's fix: three failing submits, then no `auth.resetLimit` and an enabled button. Or a component test.
- **MAJOR-3: the one reload is "once" only within the stale-chunk rule's 60 s window** (src/lib/stale-chunk.ts, INC-640).
  - load-once forgets a failure, so a submit more than 60 s after the reload imports the client again. That is a second reload of the page, which drops what was typed, instead of the error line.
  - So "never a second" in SBE-4/5, and the auth.tsx comment, are true within 60 s.
  - This is a cost of DEC-261 making the client an on-demand chunk on /auth.
  - Listed: the fix is in src/lib/stale-chunk.ts (outside SCOPE), or a change to BLOCK D's wording. The supervisor rules.
- **MAJOR-4: the reviewer questions DEC-267's premise.**
  - The premise is the reason text of the two allowlist lines (BLOCK F).
  - The reviewer says it does not hold on every path of the client library's sign-out. The behaviour it describes predates this turn.
  - Per DEC-116 (.claude/rules/50-security.md, "no detail of an unfixed hole enters the public repository before its fix is live"), the detail is given to the supervisor in this session and not in this record.
  - Listed: BLOCK F is hash-bound, and a change to the sign-out is the supervisor's and the operator's ruling.

The six MINORs, listed and not fixed. Each is in a hash-bound block or outside the brief's CHANGEs:
- **MINOR-1:** `tempRoots.pop()!` (scripts/conformance/auth-answers.test.ts:73) is a non-null assertion.
  - It is BLOCK E verbatim, and the same line is in kit-adoption.test.ts and signed-in-routes.test.ts.
  - Lint allows it.
- **MINOR-2:** any `.signOut()` on any object counts as the action, which errs safe. The allowance is keyed `file:action`, so it exempts any later discarded sign-out in those two files. This is BLOCKS E and F.
- **MINOR-3:** `handleResend` (src/routes/auth.tsx:304) does not refund the try on `CLIENT_FAILED`, which is not consistent with the forgot form (section 6).
- **MINOR-4:** `openAfterTheOneReload` depends on load order. The warm-up import can fail and reload before the first document's `load` event. This is BLOCK D.
- **MINOR-5:** R3-4's listener record wraps `window.addEventListener` through `Reflect.set` rather than `vi.spyOn`.
  - It works, because the door registers without options, so the removal matches.
  - It follows R3-4's words. It could be changed in SCOPE, but a change is not asked for.
- **MINOR-6:** the refund at src/routes/auth.tsx:403-407 fires on any `!result.ok`, not only on a request that never left the browser.
  - It is safe today: `requestPasswordReset` answers `ok:true` for every GoTrue answer (section 3).
  - It is tied to that answer shape, which src/features/auth/auth-service.ts does not name.

## 11. CI

`git fetch origin ci-evidence`, then `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `b98e4346b12f651cbad62980eafa317b6504782c` (short `b98e434`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T08:06:55Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40287618859
```

The two-step check:
1. Conclusion SUCCESS.
2. The reported commit, b98e4346, equals `git rev-parse origin/dev`, the last landed commit and this brief's BASE.

This landing's run (fd3c6870 plus this report) has not completed.

## 12. Limits

- **No CI on these commits yet.** The landing's run is the full proof.
- **E2E ran locally against ethio-staging, not CI's temporary backend.**
- **No repeat runs of E2E.** DEC-184: flake proofs are the operator's Flake check.
- **THE CHECKS numbers:**
  - The unit totals are from the R3-6 run (`bun run test:unit`).
  - lint (`0 errors, 39 warnings`, the same 39 as at the r2 stop), typecheck (exit 0), i18n:map-guard, `bun run build` (exit 0), check-bundle-size, the weight guard (`modules walked: 110`, `findings: 0`) and format:check ("All matched files use Prettier code style!") were run again in this session before this report.
  - land.ts runs them all again before the push.
- **MAJOR-3's second reload was not reproduced in a browser.** It needs a wait of more than 60 s, which J7 does not allow in a spec. It is the reviewer's reading of src/lib/stale-chunk.ts and src/lib/load-once.ts, which I checked by reading. The same applies to MAJOR-4: the reviewer read the client library's source, and I have not reproduced it.
- **The reviewer could not check STEP 0's sha256 against the carrying message.** I checked it at STEP 0 (section 1).
