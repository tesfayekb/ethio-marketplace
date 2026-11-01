# Turn E — one line at 360 — report

Base: c21ec7552cdece93ded3ce89afe82802f491f8c6 · Final commit: 5d09186951891c34185dbde6765b2d21aea8653d · Brief: docs/governance/briefs/sage-e-one-line.md (no sha256 given)
Review: READY · 0 BLOCKER · 0 MAJOR · 1 MINOR · on 5d09186

CI evidence read this turn from the raw ci-evidence files (section 11). `origin/dev` is still
`c21ec7552cdece93ded3ce89afe82802f491f8c6` (`git fetch origin dev` then `git rev-parse origin/dev`).

## 1. Done / not done, by part and step

The plan was saved, then ruling 1, then stop 1. Stop 1 is done. The five-item bar keeps
"ያስተዋውቁ".

- **Task saved** (`d23fe6bb1`): the brief. Roadmap line 3 names it.
- **A** (`1d93649a4`): the bottom bar's seller item is `panel.myListingsShort`. The panel name stays
  `panel.myListings`.
- **B** (`670e7179b`): the everywhere heading is one fixed line.
- **C** (`4d7da641a`): the 1.22 judge and OLS-1…10.
- **D** (`f3d982ee9`): the register row, the foundation note, the class line.
- **E** (`d4049ebf1`, `b01a4fbce`): `/auth` ceiling 225 → 226, the changelog clause.
- **F** (`262dd3e16`): room is the heading's row and the bar item's content box.
- **Stop 1** (`a8fb06ea1`): the five-item post label, reported, the class line unticked.
- **G** (`935f22fc6`): the factor is Noto's correction. `runnerFactor` is
  `max(1, 1.22 / (runnerWidth / 907))`. A missing Ethiopic face throws. OLJ-5. A signed-in load's
  account-language read is awaited before the next pick.
- **H** (`5d0918695`): the admin-table walk grants `super_admin`.

## 2. Files changed

`git diff --name-only c21ec7552..5d0918695`:

```
docs/_changelog.md
docs/features/design-foundation.md
docs/generated/i18n-usage.json
docs/governance/briefs/sage-e-one-line.md
docs/governance/mechanisms.md
docs/governance/reports/sage-e-one-line.stop-1.md
e2e/helpers/one-line.ts
e2e/helpers/ui.ts
e2e/my-listings-page.spec.ts
e2e/one-line-slots-admin.spec.ts
e2e/one-line-slots.spec.ts
public/i18n-usage.json
roadmap.md
scripts/e2e-select.ts
scripts/route-budgets.mjs
src/components/marketplace/feed.tsx
src/components/shell/bottom-bar.tsx
src/components/ui/one-line-slot.test.tsx
src/components/ui/one-line-slot.tsx
src/i18n/locales/am-base.ts
src/i18n/locales/en-base.ts
src/test/one-line-judge.test.ts
```

This report is the commit after `5d0918695`.

## 3. Behaviour contract — answer tables before → after

The judge (`e2e/helpers/one-line.ts`):

| | before stop 1 | after |
| --- | --- | --- |
| Ge'ez width | runner width × 1.22 | runner width × max(1, 1.22 / (runner calibration ÷ 907)) |
| Latin | the runner's width | the runner's width |
| no Ethiopic face | the factor still applied | `runnerFactor` throws `the runner has no Ethiopic face` |
| room | the constrained box (part F) | unchanged |

Calibration, recorded in the helper: the string `የኢትዮጵያ ማስታወቂያዎች`, 100px, weight 400,
letter-spacing normal, Noto Sans Ethiopic scrollWidth **907**. This Mac's page probe (Chromium
1208, the site's own stack) logged `runner 1109 missing 1421 ratio 1.223 factor 1.000`.
`1.22 / 1.223` clamps to 1. On Noto the ratio is 1 and the factor is 1.22. OLJ-5 also plants
`907 × 1.212`, which is 1.01 to two places (the ruling's Kefa figure).

The bottom bar (part A, unchanged by G and H): the seller item reads `panel.myListingsShort`.
Every other surface still reads `panel.myListings`. "ያስተዋውቁ" is unchanged. The five-item bar's
post word measured 59px in a 64px content box on this runner (5px spare) under factor 1.

The admin-table specs grant `super_admin` (part H). OLS-3 still grants `admin`, which is the role
that adds the fifth bar item. That test passed on this machine and was not among the three failures
on run 41353124478.

## 4. Censuses

Stop 1's census stands. This ruling's census is the factor and the account-language read.

- `runnerFactor` is the only multiplier. `rg` of `GEEZ_FACTOR` is the helper and OLJ-1…5, which
  pass `GEEZ_FACTOR` as the Noto case.
- The calibration text and `100px` are written inside `readSlots` and `readAdminSlots`. OLJ-5
  reads both function sources and requires both.
- `preferred_language` reads in the app are `fetchPreferredLanguage` (`src/features/auth/auth-service.ts`).
  The spec waits on `GET /rest/v1/profiles?select=preferred_language` through `watchAccountLanguage`
  (`e2e/helpers/ui.ts`).

## 5. Tests

- OLJ-1…4 still plant the 1.22 multiply on a Noto factor, so deleting it fails OLJ-3.
- OLJ-5: Noto → 1.22; `907 × 1.212` → 1.01; `907 × 1.224` → 1; equal runner and missing widths throw;
  both probes contain the calibration string and `100px`.
- `bunx vitest run src/test/one-line-judge.test.ts --maxWorkers=2`: 5 passed.
- `bun run typecheck` on `5d0918695`: exit 0. The checks runner's own typecheck step is NOT RUN
  (actionlint fails first on this Mac).
- Browser, `bun run e2e:local`, `--retries=0`, both projects, `PLAYWRIGHT_BROWSERS_PATH` unset:
  `e2e/one-line-slots.spec.ts` and `e2e/one-line-slots-admin.spec.ts` on `935f22fc6`: **10 passed,
  10 skipped** (the desktop project skips), 1.3m. `[ssr-error]` lines in that log: none.
  After part H, OLS-9 and OLS-10 again: **2 passed, 2 skipped**, 31.1s. OLS-6…8 use the same
  `walk` and were not re-executed after the role change.
- J-audit (`e2e/**` changed): leased users, reaped by the harness teardown (the run deleted the
  users it signed in). OLS-5's ad is `adPageFixtures` scratch, removed in `finally`. No `.first()`,
  no `waitForTimeout`, no `test.only`. Locators are test ids.
- THE CHECKS on `5d0918695`, whole run: `checks (fast): 17 PASS · 4 FAIL · 235s` and
  `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 288s`.
  The four FAILs are local to this Mac:
  - laws-first scripts tests, and component tests: NH-6 (`expected 2, received 0` — macOS resolves
    `America/New_York`). Component tests: 1 failed, 2614 passed (2615); 418 files passed, 1 failed.
  - actionlint: the pinned binary is `ELF 64-bit LSB executable, x86-64` (`file` on
    `runner-temp/actionlint`). The log is `actionlint self-test: the bad fixture failed for another reason`.
  - gitleaks: the same ELF class (`file` on `runner-temp/gitleaks`).
  NOT RUN, with the runner's own reasons: changed-folder unit tests and Semgrep-on-changed (laws-first
  already failed); typecheck, format, lint, e2e selector self-test, root route names, and
  build-and-check's build and bundle report (actionlint failed first); install steps (dependencies
  already present); dependency-audit (the advisory service is not reachable here); e2e-preflight
  (staging credentials are not held by the script); the e2e merge and verdict (GitHub lane
  artifacts); promote (only CI promotes); semgrep SARIF upload (GitHub only).
  Passed here and relevant to this turn: migration lint, i18n map (no drift), string scan,
  import gate, listing-write seam, browse-path guard, marketplace weight, bundle budget
  (`0 NEAR, none grew`), semgrep scan.

## 6. K2 — siblings that bypass the mechanism

Bare `truncate`, reported and left in place (ruling 1, item 3). `rg -n truncate src --glob '*.tsx'`
excluding `dialog-look.test.tsx`, `dev.primitives.tsx` and `data-table.tsx` returned **44** lines.
The ruling's census said 33. This grep's 44 were not moved.

`src/components/shell/menu-row.ts:73` (`[&>span]:truncate`) is the list-row mechanism.
`src/components/shell/data-table.tsx:32` is a comment. `src/routes/dev.primitives.tsx:168` and
`:190` are the style board. `src/components/ui/dialog-look.test.tsx:183` asserts the absence of
the menu-row truncate.

Unmeasured phone slots, left unmoved: the tier word (`src/components/marketplace/tier-flag.tsx:96`,
`TierWord`), the Sold badge (`src/features/posting/preview/listing-detail.tsx:795`,
`listing-detail-sold-badge`), the place line (`src/components/marketplace/listing-card.tsx:159`,
`listing-card-place`, already CutText).

## 7. Allowlists and guards

No allowlist file is in the diff. `git diff --name-only c21ec7552..5d0918695` names none.
ONE_LINE_SLOT's guard stays CF-ONE-LINE-1; OLJ-5 is the new planted case for the factor.

## 8. Strings

One new key, from ruling 1. The operator may override the words.

| key | en | am |
| --- | --- | --- |
| `panel.myListingsShort` | Sell | ሽያጭ |

`panel.myListings` is unchanged. "ያስተዋውቁ" is unchanged. No Amharic was written in this turn
beyond the key the ruling gave.

## 9. Migrations

none. `git diff --name-only c21ec7552..5d0918695` names no file under `supabase/migrations/`.

## 10. Departures

- Stop 1's ruling replaces ruling 1's flat 1.22 for Ge'ez. The words were not shortened.
- `watchAccountLanguage` and `consumeAccountLanguage` (`e2e/helpers/ui.ts`) wait out D239's
  account read before the next pick. Without that, a reload's read put `html lang` back to `am`
  after a pick of `en` (OLS-3, OLS-10 on this Mac). The ruling did not name this wait.
- MINOR: `consumeAccountLanguage` catches a 2s timeout and continues. The comment says the read
  may already have landed. A read that is merely slow is then the next navigation's watch.
- The admin-table walk grants `super_admin`. Run 41353124478, on the stop commit, failed OLS-9
  (shard 5 and the repeat lane) and OLS-10 (shard 5): `admin-access-notice` stayed at 1. The
  `admin` role's seed does not hold translations, legal and services. OLS-3 still grants `admin`.
- The recorded Noto width 907 is Chromium 1208 measuring the variable Noto Sans Ethiopic file at
  weight 400. This Mac has Kefa and no installed Noto Sans Ethiopic, so 907 is that probe, and
  CI is the Noto runner the constant names.
- The truncate census here is 44 lines. The ruling said 33. Reported, not moved.
- `612469b7` is not the commit named by the evidence files read this turn.

## 11. CI

First lines of `ci-status.md` (raw ci-evidence), read this turn:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: a8fb06ea12d66576e4ecb13571210b4238dde100 (short a8fb06e)
- Conclusion: FAILURE
- Completed (UTC): 2026-11-01T22:01:14Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41353124478
```

Two-step: the conclusion is FAILURE, and the named commit is `a8fb06ea1`, this branch's stop
commit, not the base `c21ec7552`. `e2e-last-failure.md` for the same run URL names
`97d9338b77a8b3eebe492220e8e7c75abaab036c`, which is not in this clone. The failure bodies in
that file are OLS-9 and OLS-10, `admin-access-notice` expected 0 received 1 (shard 5, and OLS-9
again on the repeat lane). Passed 2649, skipped 418, failed 3. Part H is the fix for that red.
`guards-last-failure.md` names the same run and `a8fb06ea`; its gating red is the E2E job, not a
guard. Lane 5 and the repeat lane failed; the other lanes in the status table succeeded.
`origin/dev` has not moved, so the base's own run is the earlier SUCCESS on `c21ec7552` that
stop 1 already recorded; the evidence file now points at this branch.

This pull request's checks on `5d0918695` are not in that file yet. They start when this commit
is pushed.

## 12. Limits

- `bun run checks` does not typecheck, format or lint on this Mac, because actionlint is a Linux
  ELF and that step fails first. `bun run typecheck` was run directly: exit 0.
- gitleaks was not executed (same ELF). The cached diff was read for secret-shaped text; none.
- dependency-audit, e2e-preflight, the e2e merge and promote were NOT RUN for the reasons in
  section 5. CI is the proof for those.
- The Noto width 907 was measured here by embedding the variable font in Chromium 1208, because
  this Mac draws Kefa. CI's own face is what the constant is for; this machine cannot draw it
  as the installed face.
- OLS-6, OLS-7 and OLS-8 were not re-run after the `super_admin` grant. They call the same `walk`.
- Browser tools were the Playwright suite (`bun run e2e:local`), not a separate click-through.
  The five-item bar's Amharic post word was on screen in the earlier failure screenshot and the
  specs that measure it passed after the factor change.
