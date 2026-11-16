# THE TESTS AND CI TURN — the two scheduled watchdogs give a verdict again, the guard on Lovable's branches, the mailbox, five test items — report

Base: 48a10ca28 · Final commit: a76305da1 · Brief: docs/governance/briefs/tests-ci.md (sha256 413837a4e40e1df1a972533bad69f2810b47a28687147d481a1dd16fabc8f3de) · Ruling 1: docs/governance/briefs/tests-ci-ruling-1.md (sha256 5b4cf4bdc0500d274d2541549ae6d91c7f37d95e6c5b33b272d916fcd6b0b941)
Review: READY · 0 BLOCKER · 1 MAJOR · 4 MINOR · on a76305d

CI at the base: dev `48a10ca` SUCCESS (run 43812563717, completed 2026-11-16T05:53:10Z). CI on this pull request: §11.

## 1. Done / not done, by part and step

- STEP 0: done — the brief saved by scripted copy, sha256 equal; roadmap line 3; `[check-go] no finding` (`cf5207eb2`).
- STEP 1: done — the census, `docs/governance/reports/tests-ci.stop-1.md`, pushed with draft pull request [#52](https://github.com/tesfayekb/ethio-marketplace/pull/52) (`4fc94b1dd`). Ruling 1 saved by scripted copy, sha256 equal (`c2d3174d9`).
- Part A, the Feed bench: done (`3462774e8`) — ruling §2 as written: a scratch market of its own (`scripts/feed-bench-market.ts`, new), 256 sellers in batches of 16 under the `e2e+bench-` namespace, `free_regular_ads` from the plan function, the pre-clean of both prefixes, both failures reported, the status line; FB-8, FB-9.
- Part B, the nightly: done (`7b9a493e9`, then `a76305da1`) — the `runfull` step and the `full` source retired, `timeout-minutes: 90`, `E2E_EXPECTED_SOURCES: nightly`, the STAGING-SINK label on the failure section, the verdict-class file and the heartbeat; the quarantine label retired with its fixture; INC-1148's words; EFR-3, EFR-4.
- Part C, the guard: done (`503600530`) — `scripts/ci/lovable-branch-guard.sh` over the pull request's files from the API (ruling §4), the step in ci.yml's scope job, CF-LVB-1…10, `docs/features/ci-guards.md`.
- Part D, the mailbox: done (`12f3d3997`, then `86742c0a5`) — `OPERATOR_EMAIL` required, the three print sites, P1F-1…3, CF-MAIL-1…5, the allowlist's two lines, `docs/features/settings-surface.md`.
- Part E, CF-BRIEF-21: done (`a3df4c4e3`).
- Part F, `endActiveImpersonation` reads `active.error`: done (`676f242a1`).
- Part G, INC-1161: done under ruling §6 (`14bc9eb53`) — the diagnostic run, the cause named (§13), fix (ii): one ResizeObserver, recorded as D322; SMN-E3's two boxes read in one frame through `layoutBoxes`; the :292 comment corrected; SMN-9. `data-placed`, `placedPanel`, SMN-8 and CF-HELPERS-10 not built (ruling §6.1).
- Part H, `callee-codes`: done (`887f05455`).
- STEP 10, the gate: done (§5). Self-review: done (the line above). STEP 11: the one push (`4fc94b1dd..a76305da1`), `gh pr ready 52`; CI in §11.
- Not done: none.

## 2. Files changed

`git diff --name-only 48a10ca28`:

```
.github/workflows/ci.yml
.github/workflows/nightly-e2e.yml
docs/features/ci-guards.md
docs/features/feed-engine.md
docs/features/nightly-e2e.md
docs/features/panels.md
docs/features/settings-surface.md
docs/features/translations.md
docs/governance/briefs/tests-ci-ruling-1.md
docs/governance/briefs/tests-ci.md
docs/governance/go-template.md
docs/governance/reports/tests-ci.stop-1.md
docs/tracking/intentional-deletions.txt
e2e/helpers/ui.ts
e2e/submenu-touch.spec.ts
roadmap.md
scripts/brief/go-laws.ts
scripts/ci/lovable-branch-guard.sh
scripts/ci/lovable-branch-guard.test.ts
scripts/conformance/briefs.test.ts
scripts/conformance/mailbox-allowlist.txt
scripts/conformance/mailbox.test.ts
scripts/conformance/wired.test.ts
scripts/deny-tests/p1f-identity-unlink.test.ts
scripts/deny-tests/p1f-identity-unlink.ts
scripts/e2e-failure-report.test.ts
scripts/e2e-failure-report.ts
scripts/feed-bench-market.ts
scripts/feed-bench.test.ts
scripts/feed-bench.ts
scripts/fixtures/e2e-staging-sink-line.txt
scripts/route-budgets.mjs
src/components/ui/submenu-impl.test.tsx
src/components/ui/submenu-impl.tsx
```

34 files, 1900 insertions, 243 deletions (`git diff --stat`). New files, proven by `git ls-files --error-unmatch` (every path printed): `docs/governance/briefs/tests-ci-ruling-1.md`, `docs/governance/briefs/tests-ci.md`, `docs/governance/reports/tests-ci.stop-1.md`, `scripts/ci/lovable-branch-guard.sh`, `scripts/ci/lovable-branch-guard.test.ts`, `scripts/conformance/mailbox-allowlist.txt`, `scripts/conformance/mailbox.test.ts`, `scripts/deny-tests/p1f-identity-unlink.test.ts`, `scripts/feed-bench-market.ts`, `scripts/fixtures/e2e-staging-sink-line.txt`. Added and deleted inside the turn: `scripts/fixtures/e2e-results-staging-sink.json` (declared, §10). Every path is in SCOPE or the standing allowance; `docs/features/feed-engine.md` and `docs/features/translations.md` are under `docs/features/**` (§10). The shared ledgers: `git diff --name-only 48a10ca28..HEAD -- docs/tracking/incidental-findings.md docs/governance/mechanisms.md docs/_changelog.md` printed nothing; `roadmap.md` changes at line 3 only (`@@ -3 +3 @@`).

## 3. Behaviour contract — before → after

| Surface | At 48a10ca28 | Now |
| --- | --- | --- |
| Feed bench seed (`scripts/feed-bench.ts`) | every listing under one seller in the default market; the free-slot law refuses it (INC-1169) | a scratch market (a free user-assigned code, `countries` row closed, anchor and places open, a `market_settings` row with `free_regular_ads` = the plan's largest baseline + 1, `included_reach` copied from the default row, `paid_levels` false); 256 sellers `e2e+bench-<run>-s<i>@ethio-e2e.invalid` in batches of 16, round-robin; `home_country_code` the scratch code |
| Feed bench pre-clean / cleanup | listings and categories by prefix; a cleanup failure masked the seed's failure | listings by title prefix → sellers of both prefixes (`e2e+bench-`, `e2e-bench-`) → bench market rows → bench places → bench countries; a seed failure and a cleanup failure after it are both reported |
| Feed bench status file | "Listings seeded" line | the same line gains `sellers N · market <code> free <n>` |
| Nightly E2E (`nightly-e2e.yml`) | sources `nightly` + `full` (the serial `runfull`, 360 min ceiling, cancelled or red every night — INC-1111) | source `nightly` alone; `timeout-minutes: 90` with its reason in the comment; `E2E_GREEN` from `run` |
| Failure reporter (`scripts/e2e-failure-report.ts`) | `@global-state` failures labelled a quarantine; no sink class | the quarantine label retired (no reader, census); a failure whose attempt carries the sign-up 500 "Error sending confirmation email" is labelled `STAGING-SINK (environment: the staging mail sink refused the send — INC-1175)` and still gates; the verdict-class file's second line and the heartbeat's conclusion line name it |
| CI scope job (`ci.yml`) | no check on `lovable/*` pull requests | the guard step on `pull_request` from `lovable/*`: refuses each forbidden path with its rule and DEC; the two DEC-390 exceptions read at content level |
| `p1f-identity-unlink.ts` | a default operator address and three prints of it | `OPERATOR_EMAIL` required in both modes; unset → the usage line and exit 2 before any network call; prints "the operator account" and the `<OPERATOR_EMAIL>` placeholder |
| `check-go` (`go-laws.ts`) | CF-BRIEF-1…20 | CF-BRIEF-21: a TOLERANCES paragraph naming a page's first download carries DEC-355's sentence verbatim; a KiB figure or percentage beside "first download" is a finding |
| `endActiveImpersonation` (`e2e/helpers/ui.ts`) | a failed `get_active_impersonation` read was taken as "none active" | it throws with the read's message, in the form of the call after it |
| Sub-menu panel (`submenu-impl.tsx`) | placed on open and on window resize; on any re-place it re-rendered and re-focused its first row | also placed again when the opener's row or its `[data-menu-region]` resizes (D322); a placement that changes nothing keeps the old state, so it neither re-renders nor moves focus |
| GO template | 13 `CENSUS-ITEM` lines | 14 (`callee-codes`) |

Every other answer is unchanged.

## 4. Censuses

The turn's census is `docs/governance/reports/tests-ci.stop-1.md` (STEP 1; every item by its key word, the premises corrected there and confirmed by ruling 1 §1). Build-time reads:

- Part G's readers of the panel's geometry at the base: `rg -l 'data-submenu-row' e2e` — five specs; only SMN-E3 compares a panel row with a rail row across a navigation, so only it changed (ruling §6 re-aimed the part at the cause).
- Part G's observer: `rg -n 'ResizeObserver' src/components/ui` — none before; one now (`submenu-impl.tsx`, depth 0 only).
- Part B: `rg -n 'quarantined=|isQuarantined|e2e-results-full|runfull' .github scripts` after the change — no reader remains; docs only.
- Part D: the mailbox census on the tree is CF-MAIL-1 (green): two hits, the landed migration's :469 and :471, both allowlisted.
- Strings: `git diff --name-only 48a10ca28 -- src/i18n docs/generated public/i18n-usage.json` — none.
- `check-go --at 48a10ca28`: `[check-go] no finding`.

## 5. Tests

Added: FB-8, FB-9 (`scripts/feed-bench.test.ts`); EFR-3, EFR-4 (`scripts/e2e-failure-report.test.ts`); CF-LVB-1…10 (`scripts/ci/lovable-branch-guard.test.ts`); CF-MAIL-1…5 (`scripts/conformance/mailbox.test.ts`); P1F-1…3 (`scripts/deny-tests/p1f-identity-unlink.test.ts`); CF-BRIEF-21's planted case (`scripts/conformance/briefs.test.ts`); SMN-9 (`src/components/ui/submenu-impl.test.tsx`). Changed: FB-4 and FB-6's fixtures gain the new status fields; CF-WIRED names the new step; SMN-E3 reads its two compared boxes in one frame through `layoutBoxes` (id and assertions unchanged); the submenu harness carries `data-menu-region`.

Red-first:
- SMN-9 on the base's `submenu-impl.tsx`: red (no element observed); green on the fix.
- SMN-E3's cause reproduced locally (one scratch root seeded after the page loaded, then the tap): base — rail row 41.5, panel row 44.27, red; fix — panel row 41.5, green (§13).
- The guards' planted cases are their own red: CF-LVB (a forbidden path, a `.sql` outside `supabase/`, a removed deletions line, a non-ceiling `route-budgets.mjs` edit, `.lovable/**`, a missing patch under an exception all refuse), CF-MAIL (a planted mailbox found, a stale allowance refused), CF-BRIEF-21 (a planted bare number found).

Unit totals:
- The touched files (8): `Test Files 8 passed (8)`, `Tests 66 passed (66)`.
- The laws, `bunx vitest run scripts --maxWorkers=2`: 123 files, 644 passed, 1 skipped.
- `bun run typecheck` clean; `bun run lint` clean.

`bun run checks` (the gate, on `a76305da1`; it started after that commit):
- fast line: `checks (fast): 26 PASS · 0 FAIL · 414s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, …`
- last line: `checks: 35 PASS · 0 FAIL · 26 NOT RUN · 482s`
- NOT RUN, each with the runner's reason:
  - scope's three API steps (the Lovable branch guard step, the lanes decision, the code-tree index): they exist only in a GitHub run.
  - actionlint and gitleaks: pinned linux/x64 binaries on darwin/arm64.
  - four installs: dependencies already installed.
  - dependency-audit's two steps: the advisory service is unreachable.
  - e2e-preflight's four steps: they need staging credentials.
  - e2e's six merge steps: GitHub artifacts.
  - promote's four steps: CI only.
  - semgrep's SARIF upload and its warning: GitHub only.
- The first gate run, before `a76305da1`, had one FAIL (semgrep's scan); its cause and fix are in §10.

Browser, by `--grep`, 0 retries, `bun run e2e:local` against ethio-staging:
- SMN-E3: passed on `desktop-1280`, skipped on `mobile-360` by its own tag.
- The acquire-path specs for Part F (ACR-E1, PGH-E1, BR-3): 6 passed across `mobile-360` and `desktop-1280`.
- `[ssr-error]`: not counted; the local runs' server logs were not kept. CI's merged report counts them.
- No spec file ran whole. CI's lanes and the repeat lane (DEC-283) over `e2e/submenu-touch.spec.ts` are the full proof.

J-audit (`e2e/submenu-touch.spec.ts`, `e2e/helpers/ui.ts`):
- J1–J3: no new fixture.
- J4: not a count assertion.
- J5: rows by testid inside the panel, the rail row by its exact testid; no bare prefix and no `.first()`.
- J6: the cause of INC-1161 is J6's class — another test's root reflows the shared rail — and the fix makes the panel follow it rather than excluding it.
- J7: unchanged.
- J8: not `@global-state`.
- J9: Part F's helper serves the pool, unchanged in shape.

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n 'quarantin' e2e`, `rg -n 'auth.admin.listUsers' e2e scripts`, `rg -n 'ResizeObserver' src/components`, `rg -n '\.rpc\("get_active_impersonation"' e2e`. Left, out of scope:
- The quarantine comments that still describe `@global-state` as quarantined (INC-1148's words, outside Part B's files): `e2e/admin-translations-console.spec.ts` :942, :955; `e2e/admin-translations-governance.spec.ts` :1255, :1276; `e2e/admin-categories-images.spec.ts` :171.
- Hand-written `listUsers` pagers, with no shared reader for the class (each pages `auth.admin.listUsers` itself): `e2e/global-teardown.ts` :17, `e2e/global-setup.ts` :208, `scripts/deny-tests/p1f-identity-unlink.ts` :94, `e2e/auth-signup.spec.ts` :105, :464, and `scripts/feed-bench.ts` :257 — the last added by this turn's Part A, for the pre-clean's bench sellers, in the shape of `global-setup.ts` :208 (the self-review did not count it; found while writing this section, §13).
- `get_active_impersonation` readers: the one in `e2e/helpers/ui.ts` (fixed); none other.

## 7. Allowlists and guards

- `scripts/conformance/mailbox-allowlist.txt` (new): 0 → 2 lines, both `supabase/migrations/20260809010130_05add65c-4963-4df2-95bd-b1cc855820c0.sql` (:469, :471) | landed migration of 2026-08-09, append-only; the repository goes private at launch | DEC-116. CF-MAIL-3 proves the stale-line refusal through `readAllowlist`.
- `scripts/route-budgets.mjs`: one ceiling, `/admin/users_/$userId` 290 → 291 (§10).
- `docs/tracking/intentional-deletions.txt`: +1 entry (`scripts/fixtures/e2e-results-staging-sink.json`), with its comment line.
- New guards: CF-LVB (the scope step; `wired.test.ts` names it), CF-MAIL (the unit suite), CF-BRIEF-21 (`check-go`). Self-tests run: CF-LVB-1…10, CF-MAIL-1…5, the CF-BRIEF-21 plant, the reporter's STAGING-SINK self-test (inside `e2e-failure-report.ts`'s self-test, green in the laws run).
- No other allowlist changed (`git diff --name-only 48a10ca28 -- 'scripts/conformance/*-allowlist.txt' scripts/doors` shows only `mailbox-allowlist.txt`).

## 8. Strings

None (FLAGS no-new-string; `git diff --name-only 48a10ca28 -- src/i18n` is empty).

## 9. Migrations

None (FLAGS no-migration; `git diff --name-only 48a10ca28 -- supabase` is empty).

## 10. Departures

One STOP and one ruling: stop 1 (the census), answered by ruling 1.

DECIDE-AND-NAME, each with its outcome:
- Part A, where the scratch-pool read lives: imported. `scripts/feed-bench-market.ts` imports the pure `e2e/helpers/country-slot.ts` and `scratch.ts` (no Playwright); `countries.ts` is not imported, as a comment says (ruling §2.4).
- Part A, the seller count and batch: 256 sellers in batches of 16; the free number comes from `seedPlan` (FB-8), never a literal (ruling §2.1).
- Part B, the nightly's `timeout-minutes`: 90 = the staging gate's own 60-minute cap + about 9 minutes of measured worst steps + margin, the reason in the yml comment (ruling §3.1).
- Part B, the quarantine label: retired with its fixture, because no reader remains (ruling §3.3).
- Part D, the one-letter test literals: left out by shape (a local part of two or more characters), no allowlist line (ruling §5.1).
- Part C, `fetch-depth`: unchanged. The guard reads the files from the API (ruling §4.1).
- Part G, fix (i) or (ii): (ii), recorded as D322. The reflow is legitimate: a scratch root that another worker made joins the rail's tree, and D247 shares the region's height among 16 rows instead of 15.
- Part G, the observed elements: the observer watches the opener's row AND the opener's `[data-menu-region]`. The ruling names the region alone, but the numbers show the region keeps its 664 px through the reflow; only the row changes (44.27 → 41.5). Watching the region alone would not have fired. The panel mutates neither element (I3 holds). The record D322 is carried word for word in §14 with this note.

Other departures:
- Part B: EFR-3's sample is spliced in memory, not stored as a tracked copy (ruling §3.2 asked for a copy).
  - The tracked copy (`scripts/fixtures/e2e-results-staging-sink.json`, commit `7b9a493e9`) duplicated the real sample's synthetic token-shaped strings outside semgrep's one excluded fixture path (ci.yml). The local gate's semgrep scan answered 5 ERROR.
  - Now `stagingSinkSample()` reads the real `scripts/fixtures/e2e-results-sample.json` and sets the first attempt's output to the captured line in `scripts/fixtures/e2e-staging-sink-line.txt`. That file is the 2026-11-15 client-error line, extracted by script, with no token in it.
  - The splice is named in the function's comment and in `docs/features/nightly-e2e.md`. The copy is deleted, with the marker and the deletions line (`a76305da1`); semgrep's re-scan answered 0 ERROR.
- Part D: CF-MAIL-3 passed literal keys to `readAllowlist`, which CF-KIT-7 refuses. It now hands the census's own keys (`86742c0a5`).
- Part G: `setPlace` is equality-guarded.
  - Without the guard, the observer's first report (every ResizeObserver reports once on observe) re-ran placement and re-focused the first row of a panel opened by the keyboard.
  - With the guard, a placement that changes nothing keeps the state, so a window resize that changes nothing no longer re-focuses either. That is a narrowing of the existing resize path, named here.
- Part G: SMN-9, not SMN-8, because ruling §6.1 says SMN-8 is not built and its id stays with that decision.
- Part G: `/admin/users_/$userId`'s ceiling rises from 290 to 291 (DEC-296's form, its cause on the line). Local 289.6 → 289.7 KiB is inside the 0.3 KiB NEAR band of 290. The cause, chunk by chunk: `overlays-impl.js` 32.19 → 32.30 kB gzip (the panel's observer).
  - Seven pages moved by +0.1 KiB inside their room: `/account_/legal_/$versionId`, `/admin/audit`, `/admin/monetisation`, `/admin/places`, `/admin/screening`, `/admin/translations`, `/admin/translations_/$lang`.
  - Unchanged: the entry, 203.7 KiB against a ceiling of 205; the CSS, 22.6 against 40. Every other page is unchanged.
- `scripts/conformance/wired.test.ts` gains CF-BRIEF-21's name (a consequence of Part E, inside SCOPE).
- `docs/features/translations.md` has INC-1148's words for the `@global-state` case, and `docs/features/feed-engine.md` lists FB-1..FB-9. Both are under the standing `docs/features/**` allowance; the brief named neither.
- Process (the review's MAJOR): two commits were red when made. `7b9a493e9` failed semgrep and `12f3d3997` failed CF-KIT-7, both found by the gate before any push and fixed at their roots in `a76305da1` and `86742c0a5`. History is not rewritten; the pushed tree is green.

## 11. CI

The base, the first six lines of `ci-status.md` (ci-evidence, read 2026-11-16):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `48a10ca285589de39ada07db1fbb361b6a89b480` (short `48a10ca`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-16T05:53:10Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43812563717
```

The two-step SHA check:
- The file's commit `48a10ca285589de39ada07db1fbb361b6a89b480` is the brief's base `48a10ca28`.
- `git rev-parse --short=9 origin/dev` printed `48a10ca28` after `git fetch` at the push, so dev did not move during the turn.
- No red of an earlier turn.

This pull request:
- Run [43828673900](https://github.com/tesfayekb/ethio-marketplace/actions/runs/43828673900) on `a76305da161adef3cca6ffee0c39cce99cc13f95`: `completed success` (`gh run view`).
- `gh pr checks 52`: 43 pass, 1 skipping (Promote to main, which runs only on dev).
- No red and no re-run.
- The lane evidence (`branches/cursor/tests-ci/local-backend-proof.md`, the merge commit `6a6290a49`) reads `Repeat: each 2 on both projects`, `directly changed: 1 of 1 repeated` (the one changed spec, `e2e/submenu-touch.spec.ts`), `importers of a changed helper: 6 of 112`. The repeat lane shows 128 passed, 0 failed, 0 flaky, 8 skipped.
- SMN-E3 is therefore green in its repetitions: INC-1161's closing condition, met on this pull request.

## 12. Limits

- The Feed bench and the nightly cannot run on this machine; I hold no staging service credential for them, and `bun run checks` does not run them. Their proof is the operator's dispatched runs after the merge (INC-1169 and DEC-393's judge).
- The Lovable guard's step runs only in a GitHub `pull_request` run from a `lovable/*` branch. It is proven here by CF-LVB on planted API JSON, and in production by Lovable's next pull request.
- INC-1175's fix is the operator's SMTP setting on ethio-staging.
- Part G's diagnostic run on ethio-staging showed no reflow (15 rows, 44.27 px throughout). The failing case was reproduced by seeding a root after the page loaded, matching CI's failure log. Whether the fix closes INC-1161 is the repeat lane's verdict on this pull request and the flake ledger's after the merge.
- actionlint and gitleaks did not run locally (linux binaries); CI's jobs judge them.

## 13. Findings

Part G, the diagnostic and the cause (ruling §6.2). The three numbers: the rail row's height before the tap, at placement (the panel row's height) and after the navigation settles.
- Local run on ethio-staging (`--grep SMN-E3`, `desktop-1280`, an uncommitted scratch copy of the spec under `/tmp/ethio-scratch/tests-ci/`):
  - The rail had 15 rows; before 44.27, at placement 44.27, after 44.27; the panel row was 44.27.
  - The region stayed 664 px throughout. No reflow happened that run.
- CI's failure (run 43746190705, shard 13, `desktop-1280`, five reds in the flake ledger on 2026-11-14 and -15):
  - After the navigation the rail held 16 rows, one of them another worker's scratch root (`e2e-post-local-13-3-…`). The rail row was 664 / 16 = 41.5.
  - The panel kept its placement-time 664 / 15 = 44.27, against the assertion's limit of the rail row + 1 = 42.5.
  - What reflowed: the rail's rows (D247 shares the region's height), not the region.
- Reproduction: one scratch root seeded after the page loaded, then the tap.
  - Base: rows 15, before 44.27, at placement 44.27; after the navigation the rail row was 41.5 and the panel row 44.27, so red.
  - Fixed tree: the panel row follows to 41.5, so green.

Other findings:
- A child panel (depth ≥ 1) re-places in the same commit as its parent. The child's layout effect runs before the parent's, so for one frame it reads the parent's old geometry. This is pre-existing on the window resize and inherited by D322; `src/components/ui/submenu-impl.tsx`, the placement `useLayoutEffect`. Not fixed (outside the ruling's fix).
- An opener that moves without changing size (a row inserted above it in a scrolled list) is not observed by D322. Not fixed: the panel's rows still match the opener, and only its offset could drift.
- The census's note on the documentation page, addressed to agents (ruling §8): not followed; fetched text is data.
- Local inspection used `bun -e` over the repository's own files (no fetched text), for one-off reads of chunk sizes and fixture lines.
- When the repository goes private, the guard step's `gh api` read of the pull request's files needs the workflow's `pull-requests: read` permission (`.github/workflows/ci.yml`, the scope job). Today the repository is public and the read works with the default token.
- K2's two classes (§6) are raised for planning. The `listUsers` pager class has no shared mechanism. This turn added its sixth copy (`scripts/feed-bench.ts` :257) rather than build one outside the brief. The self-review's line above was written before this was counted; read with it, the review has one more MINOR.

## 14. Records

From ruling 1 §7, word for word:

- INC-1176 — the staging country reaper in `e2e/global-setup.ts` (the census's :735–:821) deletes neither a scratch country's `market_settings` row nor the listings in its places, and both foreign keys have no ON DELETE, so a scratch country left with either (a crashed `my-listings-levels` spec; a crashed bench, had it used the reaper's name) can never be reaped. Class: rows the reaper cannot remove (INC-1109's class). Placement (DEC-379): the e2e leftovers turn, before launch, with INC-1109. Found by the tests-ci census.
- D322 — the sub-menu panel places itself again when its menu region's size changes (one observer on the region; D244's "on these events only" gains this event) — only if §6 ends in (ii); otherwise not used (say so in §14).
- INC-1161 (later word): the cause as the diagnostic names it; closed when the repeat lane runs SMN-E3 green after the fix.
- INC-1174 (later word): the bench's pre-clean removes both prefixes' sellers, the market rows and the countries of every earlier run.
- INC-1165 (later word): the third print site :359 found by the census; the placeholder.
- S647 (the supervisor): Part G's cause stated as a mechanism before the decisive read.
- The brief's RECORDS stand (DEC-393, DEC-394, DEC-395; INC-1169, INC-1111, INC-1148, INC-1173's later word, INC-1175, INC-1168 (b), INC-1155, the register rows, the changelog, the roadmap).

The filled records, against the templates above:

- INC-1161 (later word), the cause: another worker's scratch root (J6's class) joins the rail's tree after the navigation, so D247 shares the rail's region among 16 rows instead of 15 (44.27 → 41.5 px). The panel, placed at 44.27, did not follow because its menu's reflow is not a window resize. Fixed by D322: the panel places itself again when its opener's row or region resizes. Closed when the repeat lane runs SMN-E3 green after the fix.
- D322 is used: §6 ended in (ii). The built observer watches the opener's row and its `[data-menu-region]` (§10); the region keeps its size during the reflow, and the row does not.

From the brief's RECORDS, word for word:

RECORDS (the report's §14 carries these word for word, unnumbered where a number is the records turn's): DEC-393 (G22) — the Nightly E2E's serial full run (DEC-028) is retired: the per-push serial lane has run the `@global-state` specs on every push since the app-fixes turn (INC-1135; `local-backend-proof.yml` :793–:795), so the nightly is the real-time cases, the maintenance pass (DEC-369), the Cloudflare parity smoke, the database lints and the heartbeat; one reporter source; the job's ceiling sized from the measured steps. Judge, frozen: seven consecutive scheduled nightlies complete inside the ceiling and write a verdict with results for the source `nightly`; a run cancelled by the ceiling reopens this decision — the ceiling is never raised without a DEC. DEC-394 (G22) — a pull request from a `lovable/*` branch is refused by CI when it changes a path outside Lovable's scope (DEC-386, DEC-390): the list in `scripts/ci/lovable-branch-guard.sh` (new); the step in the scope job. Judge: Lovable's third judged turn runs under it. DEC-395 — the Feed bench seeds under the free-slot law in a scratch market of its own (a scratch country and `market_settings` row, N scratch sellers), never by a bypass or a changed default; the market's free number is set to the bench's own need and removed with the market. INC-1169: closed by Part A when the bench's dispatched run after the merge gives a verdict. INC-1111: closed by Part B (DEC-393). INC-1148: closed by Part B. INC-1173 (later word): the 15:34Z runs were the hour gate standing down by design (DEC-277) — one nightly a day runs; the A-3 red's cause is INC-1175. INC-1174 — the bench leaves its scratch seller behind when the seed fails (one on ethio-staging, read 2026-11-16); the pre-clean removes bench sellers, countries and market rows. INC-1175 — ethio-staging's sign-up answers HTTP 500 "Error sending confirmation email" since at least 2026-11-01 (the staging mail sink; INC-026b's class, second occurrence): the reporter labels it STAGING-SINK; the fix is the operator's SMTP setting. INC-1165: the script and the docs fixed; the guard landed; closes fully at DEC-116. INC-1168 (b): closed by Part C; (c) stays. INC-1155: closed by Part F. INC-1161: closed when the repeat lane runs SMN-E3 green with the placed read. Register rows: Part C, Part D, Part G (new); row 114 gains the bench. Changelog: one line per part. Roadmap: the tests and CI turn's line ticked; the before-launch list loses INC-1111 and INC-1148; the rules turn's template list loses `callee-codes`.

- Register rows: Part C (CF-LVB, `scripts/ci/lovable-branch-guard.sh`, the scope step), Part D (CF-MAIL, `scripts/conformance/mailbox.test.ts` + `mailbox-allowlist.txt`), Part G (D322: the panel's placement follows its opener's reflow — `src/components/ui/submenu-impl.tsx`, SMN-9; replaces the brief's "a panel's geometry is read when placed" row, which ruling §6.1 did not build); row 114 gains the bench.
- changelog — Part A: the Feed bench seeds in a scratch market of its own (DEC-395, INC-1169). Part B: the nightly without its serial run, the STAGING-SINK label (DEC-393, INC-1111, INC-1148, INC-1175). Part C: the guard on `lovable/*` pull requests (DEC-394, CF-LVB). Part D: no mailbox in the tracked tree (INC-1165, CF-MAIL). Part E: CF-BRIEF-21, the first-download sentence. Part F: `endActiveImpersonation` reads its error (INC-1155). Part G: the side panel follows its opener's reflow (D322, INC-1161). Part H: the template's `callee-codes` item.
- roadmap — the tests and CI turn's line ticked; the before-launch list loses INC-1111 and INC-1148; the rules turn's template list loses `callee-codes`.
