# Task W2 — the walk of turn E: the bar's seller label and Show contact's full form — report
Base: e83999cc77edb824f1d611e702ccf501f9193f2d · Final commit: cad0fc4b075eef80e1d262ae37843e7a28a2118b · Brief: docs/governance/briefs/walk-e-w2.md
Review: READY · 0 BLOCKER · 0 MAJOR · 0 MINOR · on cad0fc4

## 1. Done / not done, by part and step

Ruling 1–6 are done. No part is left.

The seller label is `panel.myListingsShort` only. English `My listing`. Amharic `የኔ አድስ` (U+12E8 U+1294 U+0020 U+12A0 U+12F5 U+1235). Measured on this machine's Chromium, viewport 360×740, the bar's face at weight 700, 12 px, the same probe as `e2e/helpers/one-line.ts` (runner width 1109, missing width 1421, ratio 1.2227, factor 1). The five-item item was measured: clientWidth 72, horizontal padding 8, room 64, bar 360. The four-item room 82 is that method's room from the plan (360 ÷ 4, minus the same 8 px); this re-run's bar was the five-item bar.

| Word | Width | Factor | Corrected | Room, 4 items / 5 items |
| --- | --- | --- | --- | --- |
| `የኔ አድስ` at 700 | 43 | 1 | 43 | 82 / 64 |
| `My listing` at 700 | 59 | 1 | 59 | 82 / 64 |

Both sit inside the five-item room. At weight 400 (what OLS-2 and OLS-3 paint on `/`, where Home is current) the same probe reads 41 and 54. 43 is under 64, so the word was not a stop.

Show contact takes `size="cta"` (`h-12 min-h-12 w-full px-4 py-2` in `button.tsx`). `adPageLookOf(tier).contact` still colours it. The tier test's free and Premium assertions gained `h-12 min-h-12 w-full` and refuse `h-11` and `min-h-11`. Old classes on that button: `h-11 min-h-11` from `size="touch"`. SAP-2 passed at 390 on mobile-360 and at 1440 on desktop-1280.

The ceiling check is the judge. No ceiling was widened (`scripts/route-budgets.mjs` is not in the diff). Printed sizes, base build of e83999cc against this tree (`~/.cache/ethio-checks/logs/base-build.log` and `bundle-budget-Check-the-first-paint-budget.log`): 50 pages both times. A local size is judged as printed + 0.1 KiB (DEC-296, `LOCAL_ALLOWANCE_KIB`). Every judged size is under its ceiling. The NEAR step printed `0 NEAR, none grew`.

| Page | Base printed | Now printed | Growth at 0.1 KiB | Ceiling |
| --- | --- | --- | --- | --- |
| `/` | 230.1 | 230.1 | 0.0 | 231 |
| `/c/$slug` | 230.1 | 230.1 | 0.0 | 231 |
| `/l/$slug` | 260.6 | 260.6 | 0.0 | 261 |
| `/my-listings` | 316.8 | 316.8 | 0.0 | 318 |
| `/account_/legal` | 214.4 | 214.5 | +0.1 | 215 |
| `/admin/coverage` | 319.6 | 319.5 | −0.1 | 320 |
| `/admin/images` | 213.4 | 213.5 | +0.1 | 214 |
| `/admin/screening` | 367.8 | 367.7 | −0.1 | 369 |

The other 42 pages printed the same tenth. Entry JS 211.8 → 211.9 KiB (ceiling 213). CSS 22.9 / 40 both times. Cause: the two longer words ride every page's base catalogs, and Button's `cta` class string rides the entry. Gzip moved four pages by a tenth and left `/l/$slug` at 260.6, judged 260.7, room 0.3 KiB under 261.

## 2. Files changed

`git diff --name-only e83999cc77edb824f1d611e702ccf501f9193f2d` at cad0fc4 (10 files, 99 insertions, 10 deletions). This report is committed after that.

```
docs/_changelog.md
docs/features/design-foundation.md
docs/governance/briefs/walk-e-w2.md
e2e/sage-ad-page.spec.ts
roadmap.md
src/components/ui/button.tsx
src/features/posting/preview/listing-detail-tier.test.tsx
src/features/posting/preview/listing-detail.tsx
src/i18n/locales/am-base.ts
src/i18n/locales/en-base.ts
```

Named by the brief and left unchanged: `src/components/shell/bottom-bar.tsx`, `src/components/marketplace/card-tier.ts`, `e2e/ad-page.spec.ts`, `e2e/one-line-slots.spec.ts`, `e2e/my-listings-page.spec.ts`.

## 3. Behaviour contract — answer tables before → after

The bar. `ItemBody` still renders `t("panel.myListingsShort")` through `CutText`. The panel name `panel.myListings` is unchanged (`Seller Centre` / `የሻጭ ማዕከል`).

| Key | Before | After |
| --- | --- | --- |
| `panel.myListingsShort` en | Sell | My listing |
| `panel.myListingsShort` am | ሽያጭ | የኔ አድስ |

Show contact (`listing-contact-show`), free and Featured still the site green, Premium still gold.

| | Before | After |
| --- | --- | --- |
| Size | `touch` (`h-11 min-h-11 px-4 py-2`) | `cta` (`h-12 min-h-12 w-full px-4 py-2`) |
| Colour | `className={contactLook}` | the same |

The signed-out control at `listing-detail.tsx:1440` (`listing-contact-sign-in`, outline, `size="touch"`, `className="w-full"`) is unchanged. The All-ads link at `:1072` (`listing-seller-all-ads`, `min-h-11`, `self-start`, no `w-full`) is unchanged.

## 4. Censuses

`panel.myListingsShort` is the existing key. This turn changed its two values and no other key. `git diff` of `en-base.ts` and `am-base.ts` is those two lines.

`w-full` under `src/**/*.tsx` was grepped this turn. The Button and hand-rolled controls are in section 6. `card-tier.ts` is not in the diff: colour stays on `adPageLookOf`.

## 5. Tests

Added: SAP-2 in `e2e/sage-ad-page.spec.ts`, inside the existing width × mode describe, registered when light and the width is 390 or 1440. It uses `seedTiers`, `leaseUser`, `signInViaSession`, `layoutBoxes`. Height within 0.5 of 48; width within 0.5 of the parent. The describe's `afterEach` still cleans the fixtures. No `test.only`, no `waitForTimeout`, no `.first()`.

Changed: LD-25 (free) and LD-26 (Premium) in `listing-detail-tier.test.tsx`. The Show contact class list now contains `h-12`, `min-h-12`, `w-full` and refuses `h-11` and `min-h-11`. Premium still refuses `bg-primary`. LD-27 (featured) was not extended. Old → new on that button: `h-11 min-h-11` → `h-12 min-h-12 w-full`.

Not edited, as the ruling said: OLS-2, OLS-3, `my-listings-page.spec.ts:446`. They read the key.

Unit, this turn:

- `bunx vitest run src/i18n/locales/am-script.test.ts src/features/posting/preview/listing-detail-tier.test.tsx --maxWorkers=2` — 2 files, 8 tests passed.
- `bun scripts/ci/laws-changed.ts units` — 23 files, 151 tests passed.
- `bun scripts/ci/laws-changed.ts semgrep` — 45 rules, 6 files, 0 findings.
- `bun run typecheck` (`tsc --noEmit`) passed.
- `bun run format:check` — all matched files use Prettier.
- `bun run lint` — 0 errors, 46 warnings (existing).
- `bun run scripts/e2e-select.ts --self-test` — every spec reachable; every area glob matches.
- `bun run scripts/check-root-routes.ts --self-test` then the check — self-test 12 allowed, 5 refused; 59 entries, every root segment safe.

The checks runner's own typecheck, format, lint, selector and root-route steps were NOT RUN because the workflow-lint step failed first (section 12). The commands above are those steps, run on this tree.

Browser, `bun run e2e:local -- e2e/sage-ad-page.spec.ts e2e/one-line-slots.spec.ts e2e/my-listings-page.spec.ts`, both projects, retries 0 (local default), workers 2. Count line: `3 failed`, `13 skipped`, `26 passed (4.7m)`. `[ssr-error]` 0, `[client-error]` 0, `[slow-rpc]` 0, `[client-aborted]` 0 in that log.

Passed, the ones this turn owes: OLS-2 and OLS-3 on mobile-360. SAP-2 at 390 on mobile-360 and at 1440 on desktop-1280. The desktop project skips OLS-2 and OLS-3 (`the phone width`). Each sage width uses its pointer project, so 390 is mobile-only and 1440 is desktop-only. MLP-3, which reads the key at line 446, passed on both projects.

Failed, and not edited by this turn:

- OLS-5 on mobile-360. `publicLanguages` got `[]`. The screenshot shows the language button focused and no menu. OLS-1 through OLS-4 used the same helper and passed. The page is signed out, so the new seller label is not on that bar.
- MLP-6 on both projects, at the clear-search step (`Control+A` then Backspace). The mobile screenshot still shows the query in the search box, so the select-all did not happen on this Mac. The test is unchanged. The base CI run passed it on Linux.

J-audit (e2e/sage-ad-page.spec.ts changed): SAP-2 seeds through the existing `adPageFixtures` scratch seller and cleans in the describe's `afterEach`. It signs in with `leaseUser`. It locates `listing-contact-show` and measures with `layoutBoxes`. No real row, no raised timeout, no retry.

THE CHECKS, on this tree:

```
checks (fast): 17 PASS · 4 FAIL · 250s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)
checks: 24 PASS · 4 FAIL · 30 NOT RUN · 316s
```

The four FAILs and every NOT RUN are in section 12. They are this Mac's environment. The bundle-budget steps passed, including `0 NEAR, none grew`.

## 6. K2 — siblings that bypass the mechanism

The mechanism is Button's `size`. Show contact is the one consumer that moved onto `cta`. Nothing else was changed. Ruling 3: the hand-rolled full-width controls are the form kit's Button debt, a roadmap line, not this task. The list below is the plan's census, re-read this turn. Where the live line moved, the live line is given; the files are not in this diff.

Buttons that already carry `w-full` (left as they are):

- `src/components/ui/calendar.tsx:168` (day Button, `h-auto w-full`)
- `src/features/ad-page/share-ad.tsx:104` (`row` is `min-h-11 w-full`; the share rows use it)
- `src/features/admin-attributes/category-attributes-dialog.tsx:534`
- `src/features/admin-categories/category-image-dialog.tsx:163`
- `src/features/admin-listings/listing-photos.tsx:238` and `:256`
- `src/features/admin/impersonation/impersonation-starter.tsx:41`
- `src/features/admin/impersonation/impersonation-view.tsx:172`
- `src/features/admin/roles/permission-matrix.tsx:180`
- `src/features/admin/roles/role-detail.tsx:279`
- `src/features/admin/translations/language-picker.tsx:82`
- `src/features/admin/translations/languages-page.tsx:698`, `:816`, `:853`
- `src/features/admin/translations/translator-card.tsx:148`
- `src/features/admin/users/user-detail.tsx:222`, `:240`, `:453`
- `src/features/posting/preview/listing-detail.tsx:1440` (`listing-contact-sign-in`)

Hand-rolled controls that carry both `w-full` and a height class (the form-kit debt; roadmap line, not changed):

- `src/components/shell/panel-header.tsx:64` (`h-8 w-full`; the plan read :60)
- `src/components/ui/strip-arrows.tsx:104` and `:121` (`h-11 w-full`; the plan read :99 and :116)
- `src/features/posting/step-category.tsx:55` (`rowClass`, `min-h-11 w-full`; the plan's call sites :100 and :451)
- `src/features/posting/step-photos.tsx:65` (`addButtonClass`; the plan's call site :957)
- `src/features/posting/step-pricing.tsx:551` (the plan read :548)
- `src/features/posting/step-review.tsx:692`, `:849`, `:861`, `:869`, `:903`
- `src/features/posting/wizard.tsx:995` (the plan read :992)
- `src/routes/auth.tsx:85` and `:89` (the primary and secondary class strings; the plan's call sites :460, :473, :491, :543, :559, :568, :690, :741, :745) and the extra full-width controls at :705 and :748
- `src/routes/auth_.callback.tsx:28` (the plan's call sites :101, :125, :141)
- `src/routes/auth_.reset.tsx:49` and `:53` (the plan's call sites :139, :164, :219)
- `src/routes/settings.tsx:88`, `:96`, `:100` (the plan's call sites :552, :563, :579, :683, :691, :704, :756, :767, :842, :866, :879, :887, :900)
- `src/components/shell/menu-row.ts:41`, `:73`, `:115` — the shared menu-row and field mechanism, not a primary action. Not changed.

The All-ads link at `listing-detail.tsx:1072` is not a Button and has no `w-full`.

## 7. Allowlists and guards

No allowlist file is in the diff. No guard was added (the brief: none new). CF-LOOK-1 was not given a new height on a screen: the 48 px form is a Button size. i18n maps: `1781 keys across 636 files`; `[i18n:map-guard] usage maps match the tree.` The checks i18n step passed (`the maps' bytes before and after regenerating`).

## 8. Strings

One key, both languages. No new key.

| Key | English | Amharic |
| --- | --- | --- |
| `panel.myListingsShort` | My listing | የኔ አድስ |

The Amharic is the operator's, five letters and a space: U+12E8 U+1294 U+0020 U+12A0 U+12F5 U+1235. `am-script.test.ts` passed with the tier test (8 tests).

## 9. Migrations

none. The changelog line says so. No migration file is in the diff.

## 10. Departures

- The task's Amharic candidate `ማስታወቂያዬ` did not fit (plan: corrected 73 against the 64 px room). Ruling 1 replaced it with `የኔ አድስ`. D273 uses the ruled words.
- The task called `listing-detail.tsx:1440` "All ads by this seller". It is `listing-contact-sign-in`. Ruling 3 accepted that and left both that control and the link at :1072 unchanged.
- The Measured bullet in `design-foundation.md` now names SAP-2 as well as SAP-1. The task named the Not-drawn line; the measured line is the record of the new test, fixed in the review.

## 11. CI

Base, read this turn from `origin/ci-evidence` after `git fetch origin dev main ci-evidence`. The reported commit equals `origin/dev` and the task base.

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `e83999cc77edb824f1d611e702ccf501f9193f2d` (short `e83999c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-01T23:10:46Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41359135253
```

`e2e-last-failure.md` on that run: `last E2E run 41359135253 passed`, same commit. No earlier red was open. This pull request's checks are not started at this commit; the pull request comment records their verdict.

## 12. Limits

Local `bun run checks` ended `24 PASS · 4 FAIL · 30 NOT RUN · 316s`. The four FAILs are this Mac, not this diff:

- `laws-first › scripts/ tests first` and `component-tests › Component tests`: NH-6 (`scripts/ci/nightly-hour.test.ts`) expected exit 2 when `TZDIR` is an empty directory. This Mac still resolves `America/New_York`, so the exit was 0. The scripts run: 1 failed, 417 passed (83 files). The full unit run: 1 failed, 2614 passed (419 files). The only failure in both is NH-6. CI on e83999cc was green, on Linux.
- `build-and-check › Workflow lint`: the pinned actionlint is `actionlint_1.7.7_linux_amd64.tar.gz` (checksum OK). The self-test then printed `actionlint self-test: the bad fixture failed for another reason`. That binary does not run on this Mac.
- `secrets-scan › Secrets scan`: the pinned gitleaks is `gitleaks_8.24.3_linux_x64.tar.gz`. The log is `cannot execute binary file: Exec format error`. No leak line was printed. The scan walked `5 commits in e83999cc..HEAD`.

NOT RUN because an earlier step failed: the laws-first changed-folder tests and Semgrep (both run afterwards by hand, section 5); build-and-check's typecheck, format, lint, e2e selector, root routes, Build and Bundle report (typecheck, format, lint, selector and root routes run by hand, section 5). The bundle-budget job built and checked the budget itself, and passed.

NOT RUN by the checks script's own reason: Install dependencies (already installed); dependency-audit (the advisory service is not reachable from the sandbox); e2e-preflight (staging credentials, which the script never holds); the e2e merge and verdict steps (GitHub's lane artifacts); promote (only CI promotes); semgrep's SARIF upload (GitHub only).

The first `e2e:local` stopped at the browser guard: it resolved a Chromium under the sandbox cache that is not installed. No test ran. The run in section 5 set `E2E_CHROMIUM_PATH` to the installed Playwright Chrome at `chromium-1208` and completed.

OLS-5 and MLP-6 are the local browser failures in section 5. They are not edits, and the screenshots do not show a cut seller label or a short Show contact. CI on the pull request is the proof of those two unchanged tests.
