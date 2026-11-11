# Housekeeping turn 2 — report

Base: dev 2b11a9d29 · Final commit: a8c84e496 · Brief: docs/governance/briefs/housekeeping-2.md (sha256 6fa54ab7d3a4fa4f8c439771b5d337b1b71096e8444da96c01de5e703268e35a) · Ruling 1: docs/governance/briefs/housekeeping-2-ruling-1.md (sha256 8bee8caa275383f20cff386b16943fba62d4432ed186b0aa604d14f4940f2de3)
Review: READY · 0 BLOCKER · 2 MAJOR · 3 MINOR · on a8c84e4

CI on the last code commit: a8c84e496, run 43036501908, completed, failure. Every check that does not need the browser passed: `gh pr checks 34` lists 21 passing, CodeQL among them. All 19 E2E lanes failed at "Install Chromium's system libraries" on the runners' name lookup for the Ubuntu mirror, before any test ran. This is infrastructure (rule 40 class (b)) and the second such run in a row, so it is reported, not re-run. NOT "every check green"; see §11 and stop report 2.

## 1. Done / not done, by part and step

- STEP 0 — done: the brief was saved by scripted copy (sha256 equal), roadmap line 3 written, briefs-allowlist.txt read (no line to remove), CI read (stop report 1).
- STEP 1 — done: the census and its STOP (`docs/governance/reports/housekeeping-2.stop-1.md`), answered by ruling 1, which was saved by scripted copy (sha256 equal).
- Part A — done (6c28911bd): `scripts/brief/go-laws.ts` holds one function per law; `scripts/brief/check-go.ts` runs them on a named root; `briefs.test.ts` runs the text laws on the brief in force and its rulings; the self-test CF-BRIEF-14 runs every law and check-go.ts on planted fixtures; wired.test.ts names both callers. A follow-up (a8c84e496) puts one complete RegExp escape in the module (CodeQL on the pull request, §11).
- Part B — done (012b6a6b7): `docs/governance/go-template.md`, with its `CENSUS-ITEM` markers (the `definition` key included, per ruling 1's PREVENTION). CF-BRIEF-15 reads them against STEP 1 of the brief in force and its rulings.
- Part C — done, in ruling 1's order:
  - Q3 and Q2 (1669b6e30): `e2e/helpers/door-callers.ts`.
  - Q4 (0bcfcc1bb): `grantScratchRole`, and every grant moved onto `grantRole`.
  - Q5 (2ab609364): `signInJobSuperAdmin` and `setDeviceAmharic`; the five disables gone.
  - Q6 (6e8ed6968): LGA-21.
  - Q7 (7f8002d40): `e2e/helpers/account-language.ts`.
  - The harness guide (497b2e3a8).
  - A pick that waits for the page's account read (d529ce281, §10 item 11).
- STEP 5 — done: typecheck, lint, the scripts suite, `bun run checks` (run whole twice, the second on the final tree), and check-go.ts on the final tree (§5).
- STEP 6 — pushed twice: d529ce281 (the code), then a8c84e496 (the CodeQL fix). On both runs, CI's E2E lanes failed at the browser's system-library install before any test ran (§11). No "Every check green" comment was posted, and the draft stays a draft. Stop report 2 asks for the re-run that rule 40 does not let me make.
- STEP 7 — this report; the self-review's last line is above.

## 2. Files changed

`git diff --name-only 2b11a9d29` (the whole lane: the base is behind the lane's earlier turns, housekeeping-1, housekeeping-1b and the lockfile turn, as stop report 1 said). This turn's own files are the 83 that `git diff --name-only 3e63743cc` prints (3e63743cc is the lane's head before this turn). The list is read at the last code commit, a8c84e496; this report, `docs/governance/reports/housekeeping-2.report.md`, joins it with the report commit.

```
bun.lock
docs/features/admin-listings.md
docs/features/ci-guards.md
docs/features/ci-status-reporter.md
docs/features/e2e-harness.md
docs/features/nightly-e2e.md
docs/features/performance-strategy.md
docs/features/posting.md
docs/features/step-up-auth.md
docs/generated/i18n-usage.json
docs/governance/briefs/housekeeping-1-ruling-1.md
docs/governance/briefs/housekeeping-1-ruling-2.md
docs/governance/briefs/housekeeping-1-ruling-3.md
docs/governance/briefs/housekeeping-1-ruling-4.md
docs/governance/briefs/housekeeping-1-ruling-5.md
docs/governance/briefs/housekeeping-1.md
docs/governance/briefs/housekeeping-1b-ruling-1.md
docs/governance/briefs/housekeeping-1b-ruling-2.md
docs/governance/briefs/housekeeping-1b-ruling-3.md
docs/governance/briefs/housekeeping-1b.md
docs/governance/briefs/housekeeping-2-ruling-1.md
docs/governance/briefs/housekeeping-2.md
docs/governance/briefs/lockfile-ruling-1.md
docs/governance/briefs/lockfile.md
docs/governance/go-template.md
docs/governance/reports/housekeeping-1.report.md
docs/governance/reports/housekeeping-1.stop-1.md
docs/governance/reports/housekeeping-1.stop-2.md
docs/governance/reports/housekeeping-1.stop-3.md
docs/governance/reports/housekeeping-1.stop-4.md
docs/governance/reports/housekeeping-1.stop-5.md
docs/governance/reports/housekeeping-1b.report.md
docs/governance/reports/housekeeping-1b.stop-1.md
docs/governance/reports/housekeeping-1b.stop-2.md
docs/governance/reports/housekeeping-2.stop-1.md
docs/governance/reports/lockfile.report.md
docs/governance/reports/lockfile.stop-1.md
e2e/ad-page-doors.spec.ts
e2e/admin-ai-calls.spec.ts
e2e/admin-attributes-editor.spec.ts
e2e/admin-attributes-import.spec.ts
e2e/admin-attributes-library.spec.ts
e2e/admin-attributes-links.spec.ts
e2e/admin-attributes-safety.spec.ts
e2e/admin-audit.spec.ts
e2e/admin-categories-console.spec.ts
e2e/admin-categories-home.spec.ts
e2e/admin-categories-images.spec.ts
e2e/admin-categories-lifecycle.spec.ts
e2e/admin-countries.spec.ts
e2e/admin-guides.spec.ts
e2e/admin-listings.spec.ts
e2e/admin-locations.spec.ts
e2e/admin-monetisation.spec.ts
e2e/admin-roles.spec.ts
e2e/admin-screening.spec.ts
e2e/admin-services.spec.ts
e2e/admin-translations-console.spec.ts
e2e/admin-translations-data.spec.ts
e2e/admin-translations-governance.spec.ts
e2e/admin-users.spec.ts
e2e/auth-signout.spec.ts
e2e/breadcrumbs.spec.ts
e2e/category-image-routes.spec.ts
e2e/global-setup.ts
e2e/helpers/account-language.ts
e2e/helpers/categories.ts
e2e/helpers/door-callers.ts
e2e/helpers/seller-name.ts
e2e/helpers/session.ts
e2e/helpers/translations.ts
e2e/helpers/ui.ts
e2e/helpers/users.ts
e2e/i18n-coverage.spec.ts
e2e/i18n-sign-in-language.spec.ts
e2e/import-security.spec.ts
e2e/legal-admin.spec.ts
e2e/legal-certify.spec.ts
e2e/legal-doors.spec.ts
e2e/locale-format.spec.ts
e2e/mfa-stepup.spec.ts
e2e/my-listings-ad.spec.ts
e2e/my-listings-doors.spec.ts
e2e/my-listings-levels.spec.ts
e2e/my-listings-page.spec.ts
e2e/my-listings-promote.spec.ts
e2e/name-check-queue.spec.ts
e2e/one-line-slots-admin.spec.ts
e2e/one-line-slots.spec.ts
e2e/overlays.spec.ts
e2e/page-head.spec.ts
e2e/phone-frame.spec.ts
e2e/photo-pipeline.spec.ts
e2e/posting-routes-dials.spec.ts
e2e/posting-routes.spec.ts
e2e/rbac.spec.ts
e2e/sage-ad-page.spec.ts
e2e/shell-table-law.spec.ts
e2e/shell.spec.ts
package.json
public/i18n-usage.json
roadmap.md
scripts/brief/check-go.ts
scripts/brief/go-laws.ts
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/check-identity-tags.sh
scripts/chunk-modules-plugin.d.mts
scripts/chunk-modules-plugin.mjs
scripts/ci/checks-cache.ts
scripts/ci/laws-changed.ts
scripts/ci/nightly-hour.sh
scripts/ci/nightly-hour.test.ts
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/browser-client-allowlist.txt
scripts/conformance/choice-lists.test.ts
scripts/conformance/door-answers-allowlist.txt
scripts/conformance/e2e-helpers-allowlist.txt
scripts/conformance/e2e-helpers.test.ts
scripts/conformance/listing-seed-allowlist.txt
scripts/conformance/lockfile-hosts-allowlist.txt
scripts/conformance/lockfile-hosts.test.ts
scripts/conformance/overlays.test.ts
scripts/conformance/press.test.ts
scripts/conformance/visible-area.test.ts
scripts/conformance/wired.test.ts
scripts/e2e-leases.test.ts
scripts/e2e-leases.ts
scripts/e2e-select.ts
scripts/route-budgets.d.mts
scripts/route-budgets.mjs
src/components/marketplace/feed.tsx
src/components/picker-popup.ts
src/components/searchable-picker.test.tsx
src/components/searchable-picker.tsx
src/components/shell/app-rail.tsx
src/components/shell/block-guide.tsx
src/components/shell/data-table.tsx
src/components/shell/favourite-category.ts
src/components/shell/rail-first-paint.test.tsx
src/components/shell/rail-variant.ts
src/components/shell/submenu/submenu-signal.ts
src/components/shell/theme-toggle.tsx
src/components/ui/alert-dialog.tsx
src/components/ui/badge.tsx
src/components/ui/button-variants.ts
src/components/ui/button.tsx
src/components/ui/calendar.tsx
src/components/ui/choice-list-look.test.tsx
src/components/ui/dialog-look.test.tsx
src/components/ui/form.tsx
src/components/ui/keep-in-strip.ts
src/components/ui/one-line-slot.test.tsx
src/components/ui/one-line-slot.tsx
src/components/ui/overlay-ask.ts
src/components/ui/overlay-facade.tsx
src/components/ui/overlays-impl.ts
src/components/ui/pagination.tsx
src/components/ui/section-notice-state.ts
src/components/ui/section-notice.tsx
src/components/ui/slot-split.ts
src/components/ui/strip-arrows.tsx
src/components/ui/submenu-impl.tsx
src/components/ui/submenu-levels.ts
src/components/ui/toggle-group.tsx
src/components/ui/toggle-variants.ts
src/components/ui/toggle.tsx
src/features/ad-page/share-ad.tsx
src/features/ad-page/share-price-text.ts
src/features/admin-attributes/attribute-dialogs.tsx
src/features/admin-attributes/attribute-error.ts
src/features/admin-attributes/category-attributes-dialog.tsx
src/features/admin-categories/categories-page.tsx
src/features/admin-categories/category-dialogs.test.tsx
src/features/admin-categories/category-dialogs.tsx
src/features/admin-categories/category-form-fields.tsx
src/features/admin-categories/category-form-values.ts
src/features/admin-categories/category-image-dialog.tsx
src/features/admin-categories/category-submit-error.ts
src/features/admin-countries/country-dialog-state.ts
src/features/admin-countries/country-dialogs.test.tsx
src/features/admin-countries/country-dialogs.tsx
src/features/admin-countries/country-editor.tsx
src/features/admin-countries/country-verb-dialogs.tsx
src/features/admin-listings/edit-listing.ts
src/features/admin-locations/location-dialog-state.ts
src/features/admin-locations/location-dialogs.tsx
src/features/admin-locations/location-editor.tsx
src/features/admin-locations/location-form-fields.tsx
src/features/admin-locations/location-form-values.ts
src/features/admin-locations/location-verb-dialogs.tsx
src/features/admin-locations/locations-service.test.ts
src/features/admin-screening/name-checks.tsx
src/features/admin-screening/photo-changes.tsx
src/features/admin-screening/photo-reviews.tsx
src/features/admin/admin-context.tsx
src/features/admin/admin-shell-provider.tsx
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/my-listings-page.tsx
src/features/posting/amount-scale.ts
src/features/posting/edit-step-changes.ts
src/features/posting/field-refusals.ts
src/features/posting/field.test.ts
src/features/posting/field.tsx
src/features/posting/map/map-large.tsx
src/features/posting/map/map-preview.tsx
src/features/posting/map/map-snap.ts
src/features/posting/map/outline.test.ts
src/features/posting/phone-number-field.tsx
src/features/posting/preview/listing-detail-map.test.tsx
src/features/posting/preview/listing-detail.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/preview/listing-section.ts
src/features/posting/preview/photo-gallery.tsx
src/features/posting/same-channels.test.ts
src/features/posting/same-channels.ts
src/features/posting/spec-sentences.ts
src/features/posting/step-details.tsx
src/features/posting/step-photos.tsx
src/features/posting/step-pricing.tsx
src/features/posting/step-review.tsx
src/features/posting/step-specifications.test.ts
src/features/posting/step-specifications.tsx
src/features/posting/step-who.test.tsx
src/features/posting/step-who.tsx
src/features/posting/wizard.tsx
src/i18n/i18n-context.ts
src/i18n/index.ts
src/i18n/provider-d239.test.tsx
src/i18n/provider-layers.test.tsx
src/i18n/provider.test.tsx
src/i18n/provider.tsx
src/providers/theme-context.ts
src/providers/theme-provider.tsx
src/routes/admin.tsx
src/routes/l.$slug.tsx
src/test/own-key-sites.test.ts
vite.config.ts
```

New files of this turn, proved tracked by `git ls-files`:

```
docs/governance/briefs/housekeeping-2-ruling-1.md
docs/governance/briefs/housekeeping-2.md
docs/governance/go-template.md
docs/governance/reports/housekeeping-2.stop-1.md
e2e/helpers/account-language.ts
e2e/helpers/door-callers.ts
scripts/brief/check-go.ts
scripts/brief/go-laws.ts
scripts/conformance/e2e-helpers-allowlist.txt
scripts/conformance/e2e-helpers.test.ts
```

No file was deleted (`git diff --name-only --diff-filter=D 3e63743cc` prints nothing).

## 3. Behaviour contract — answer tables before → after

No product code changed: `git diff --name-only 3e63743cc -- src supabase .github package.json bun.lock AGENTS.md .cursor` prints 0 lines. No route, door or screen changed. The touched functions are the harness's:

| Function | Before (3e63743cc) | After |
| --- | --- | --- |
| REST door call as a person | seven spec-local `asPerson`, each with its own `restBase` / `answerOf`, five of them with extra members | `asPerson(person, { fresh? })` → `{ rpc(fn, args = {}), rest(path, init?), userId }`; `asBearer(token)`; the answer is `{ data, error: string \| null }`, and the error is the body's message or `HTTP <status>` |
| Anonymous REST call | `asAnonymous` (ad-page-doors), `asAnon` (legal-doors) | `asAnonymous()` → `{ rpc, rest }` |
| Door call through the page's client | thirteen wrappers (three `rpcResult`, `door`, two `rpcAsPage`, five `rpcFromBrowser`, `doorError`), two `clientReady` waits | `pageDoor(page, fn, args)` over `inBrowserClient` → `{ data, error }`; the waits use `awaitBrowserClient` |
| Named role grant | `grantRole` in users.ts plus ten copies, `grantAdmin`, one inline super_admin grant | `grantRole(userId, roleName)` (users.ts, unchanged) |
| Scratch role with permissions | three `grantRole(wanted, person)` copies, three `scratchHolder`, nine inline builds | `grantScratchRole(userId, wanted, reap)`: the role `e2e_scratch_role_<letters>` (priority 1); its id joins `reap` at once; the permission read's error throws; the picked key set must equal `wanted` exactly; `role_permissions`, then a global `user_roles` row; returns the role id |
| Pooled super admin | `useJobSuperAdmin(page)` and four `signInAsSuperAdmin` wrappers | `signInJobSuperAdmin(page)`, same body and same answer |
| Device language | `useAmharic(page)` (i18n-coverage) | `setDeviceAmharic(page)` (account-language.ts), same body |
| Account language, signed in | `setAmharicAccount` wrote the column with the service client, then set the device | `setAccountLanguage(page, userId, code)`: it polls the column until it is non-NULL (15 s, named failure); reloads with the account read awaited; picks `code` in the switcher (`switchLanguage`); polls the column until it equals `code`; reloads with the account read awaited; asserts `<html lang>` and every switcher label's `lang` |
| Account language, before a session | four spec-local writes (i18n-sign-in-language, locale-format, shell TR-37 ×2) | `seedAccountLanguage(userId, code \| null)` |
| Account language restore | NULL (i18n-coverage, i18n-sign-in-language, shell); the "prior" value read before (locale-format, page-head) | `restoreAccountLanguages()`: NULL for every touched id (D324 (c)) |
| LGA-21 | wrote a text for every `enabled_admin` language but en, am and the pseudo language; asserted no translate control | writes texts for its own language and the non-scratch languages; asserts the codes it wrote include its own; if the translate control is present, it offers neither this test's language nor any language whose `name_en` lacks the `E2E ` prefix |
| AT-12 | `gotoReady` then `switchLanguage` | `watchAccountLanguage` is armed before `gotoReady` and awaited before `switchLanguage` |
| GO laws | CF-BRIEF-1 → 4 in briefs.test.ts | the same four, moved unchanged in behaviour, plus 5 → 11, 13, 14 (self-test) and 15 in go-laws.ts; law 12 is CF-BRIEF-3 as the brief says |

## 4. Censuses

The census is stop report 1 (§1 → §10 and the questions), read on 3e63743cc. Re-read on the final tree:

- The brief's COUNT lines, run by check-go.ts on the final tree (pasted in §5): `^async function asPerson` 0 (was 7); `^async function rpcResult` 0 (was 3); `function grantRole` 1 (users.ts :418; was 14); `rules-of-hooks` in e2e 0 (was 5).
- The other COUNT-line copies: `rg -n "^(async )?function (restBase|answerOf|asAnonymous|asAnon|rpcFromBrowser|rpcAsPage|doorError|clientReady|scratchHolder|grantAdmin|signInAsSuperAdmin|setAmharicAccount)\b" e2e/*.spec.ts` → none. CF-HELPERS-1 is the standing form of this grep.
- `profiles.preferred_language` writes (Q7's census) on the final tree:
  - In specs: none. CF-HELPERS-3 reads them across the line break, and the tree test passes with an empty allowlist.
  - In helpers: account-language.ts (the module) and two baselines left where they are: users.ts :326–:332 (the lease's reset) and ui.ts :1042–:1046 (`resetLanguageBaseline`, the pooled super admin) — §10 item 9.
- Picks that may race the page's account read (the AT-12 class, §10 item 11; a heuristic: `switchLanguage(` within three lines after a navigation, with no account-read watch between, in a spec that signs in; `/tmp/ethio-scratch/housekeeping-2/pick-race.ts`) → 14:
  - ad-page :159, :1323
  - admin-roles :344
  - i18n-sign-in-language :143
  - page-head :53
  - post-wizard-specs :2527
  - sage-bands :408
  - sage-tiers :592
  - shell :1619, :1626, :2040, :2409, :2441
  - user-guides :172

  Some are signed out at the pick (page-head :53 picks before any sign-in), which makes them safe. Each needs reading (§13).
- Role builds outside `grantScratchRole`: `rg -n '\.from\("roles"\)' e2e/*.spec.ts | rg -v "select|delete"` finds one insert, legal-admin :1153 (LGA-22's `makeRole`, :1150, §6). door-refusals :49 `grantScopedRole` is a country-scoped grant, a different act (ruling 1 Q4).
- First-download table: a fresh `bun run build && node scripts/check-bundle-size.mjs` on the final tree prints "JS: 206.0 KiB / 207 KiB — ok", "CSS: 23.1 KiB / 40 KiB — ok", "Bundle budget OK.". Each of the 50 pages equals stop report 1 §8's figure: `/tmp/ethio-scratch/housekeeping-2/compare-pages.ts` → "pages: census 50, final 50, differing 0". Unchanged.

## 5. Tests

Law ids (each grep-checked free at the census, §7 of stop report 1):
- CF-BRIEF-5 cited path, 6 cited line, 7 free id, 8 option, 9 assert, 10 count, 11 title, 13 allowance, 14 the self-test (every law and check-go.ts on planted fixtures), 15 the census checklist. Law 12 (SCOPE) is the existing CF-BRIEF-3. CF-BRIEF-1 → 4 moved unchanged.
- CF-HELPERS-1 (a spec's local `function` or function-valued `const` of a shared helper's name: asPerson, asAnonymous, asAnon, rpcResult, rpcFromBrowser, rpcAsPage, doorError, clientReady, restBase, answerOf, bearerClient, grantRole, grantAdmin, scratchHolder, signInAsSuperAdmin, setAmharicAccount, setAccountLanguage, seedAccountLanguage). CF-HELPERS-2 (a `rules-of-hooks` disable anywhere under e2e/). CF-HELPERS-3 (a spec's direct write of `profiles.preferred_language`). Per D324 (b), CF-BC-1 keeps the page-client concern.

Red evidence:
- Each law's planted fixture is its red: CF-BRIEF-14's "each law's code finds its planted violation" and the planted test of e2e-helpers.test.ts assert each law's finding by name and line, so a law that cannot fail fails its own test.
- CF-HELPERS-3 on the tree: I planted an untracked `e2e/zz-planted-language.spec.ts` holding one direct write and ran `bunx vitest run scripts/conformance/e2e-helpers.test.ts`. It printed "1 failed | 1 passed (2)" with "+ e2e/zz-planted-language.spec.ts:4 writes profiles.preferred_language: use e2e/helpers/account-language.ts". With the plant deleted: "2 passed (2)". It was never committed.
- The escape (a8c84e496): the new briefs test is "a cited name enters a pattern as itself: every metacharacter, the backslash included". The old `$`-only escape on the test's name (`/tmp/ethio-scratch/housekeeping-2/escape-red.ts`) prints "old escape matches its own name: false", so the test's first claim fails on the old code.

Unit totals:
- `bunx vitest run scripts --maxWorkers=2` on the final tree: "Test Files 102 passed (102)", "Tests 524 passed | 1 skipped (525)".
- `bun run typecheck`: `tsc --noEmit`, no output (green). `bun run lint`: `eslint . --max-warnings 0`, no output (green).

THE CHECKS (`bun run checks`, the final tree a8c84e496):
- fast line: `checks (fast): 25 PASS · 0 FAIL · 368s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`
- last line: `checks: 34 PASS · 0 FAIL · 24 NOT RUN · 426s`
- NOT RUN, each with the runner's reason:
  - Workflow lint and Secrets scan: the pinned binaries are linux/x64; this machine is darwin/arm64.
  - The four Install dependencies steps: the dependencies are already installed.
  - The checks' own Typecheck step reads Lovable's harness log, which is missing; I ran `bun run typecheck` myself.
  - dependency-audit (2): the advisory service is not reachable.
  - e2e-preflight (4): the staging credentials are not given to the script.
  - The e2e merge (6): it needs GitHub's lane artifacts.
  - promote (4): only CI promotes.
  - semgrep's SARIF upload and its warning (2): GitHub only.
- The run before the escape fix (d529ce281) printed the same counts (fast 25 PASS · 0 FAIL · 370s; last `checks: 34 PASS · 0 FAIL · 24 NOT RUN · 425s`).

check-go.ts on this brief:
- On the STEP 0 snapshot (`--root /tmp/ethio-scratch/housekeeping-2/step0`, the tree as saved, before any change):

```
CF-BRIEF-5 docs/governance/briefs/housekeeping-2.md:6 cites docs/governance/reports/housekeeping-2.report.md, not in the tree
CF-BRIEF-5 docs/governance/briefs/housekeeping-2.md:45 cites docs/governance/reports/housekeeping-2.stop-1.md, not in the tree
CF-BRIEF-7 docs/governance/briefs/housekeeping-2.md:34 calls CF-E2E-WAIT-1 new or free; the tree already uses it
CF-BRIEF-7 docs/governance/briefs/housekeeping-2.md:34 calls CF-E2E-PLACE-1 new or free; the tree already uses it
CF-BRIEF-10 docs/governance/briefs/housekeeping-2.md:13 a bare count "2 lines" — write COUNT: <n> := <command>
CF-BRIEF-15 docs/governance/briefs/housekeeping-2.md:1 the root holds no docs/governance/go-template.md
[check-go] 6 finding(s)
```

  Each is one of the census's corrections (stop report 1 §9): the turn's own two outputs; the two ids cited as existing; law 6's tolerance, which ruling 1 writes in words for later GOs; and the template, which Part B creates.
- On the final tree (`bun scripts/brief/check-go.ts docs/governance/briefs/housekeeping-2.md`, d529ce281's tree; a8c84e496 changes no law's behaviour):

```
CF-BRIEF-5 docs/governance/briefs/housekeeping-2.md:6 cites docs/governance/reports/housekeeping-2.report.md, not in the tree
CF-BRIEF-6 docs/governance/briefs/housekeeping-2.md:31 e2e/i18n-coverage.spec.ts :108 holds "}", not setAmharicAccount
CF-BRIEF-6 docs/governance/briefs/housekeeping-2.md:31 e2e/legal-admin.spec.ts :1012 holds "const versionId = (await version(kind)).id;", not LGA-21 / legal_version_texts
CF-BRIEF-7 docs/governance/briefs/housekeeping-2.md:13 calls CF-BRIEF-5 new or free; the tree already uses it
CF-BRIEF-7 docs/governance/briefs/housekeeping-2.md:34 calls CF-HELPERS-1 new or free; the tree already uses it
CF-BRIEF-7 docs/governance/briefs/housekeeping-2.md:34 calls CF-E2E-WAIT-1 new or free; the tree already uses it
CF-BRIEF-7 docs/governance/briefs/housekeeping-2.md:34 calls CF-E2E-PLACE-1 new or free; the tree already uses it
CF-BRIEF-7 docs/governance/briefs/housekeeping-2.md:45 calls CF-BRIEF-5 new or free; the tree already uses it
CF-BRIEF-10 docs/governance/briefs/housekeeping-2.md:13 a bare count "2 lines" — write COUNT: <n> := <command>
CF-BRIEF-10 docs/governance/briefs/housekeeping-2.md:31 COUNT 7 := rg -n "^async function asPerson" e2e | wc -l — prints 0
CF-BRIEF-10 docs/governance/briefs/housekeeping-2.md:31 COUNT 3 := rg -n "^async function rpcResult" e2e | wc -l — prints 0
CF-BRIEF-10 docs/governance/briefs/housekeeping-2.md:31 COUNT 14 := rg -n "function grantRole" e2e | wc -l — prints 1
CF-BRIEF-10 docs/governance/briefs/housekeeping-2.md:31 COUNT 5 := rg -n "rules-of-hooks" e2e | wc -l — prints 0
[check-go] 13 finding(s)
```

  Beyond the STEP 0 hits, every new line records this turn's own work: the copies counted are gone; the cited lines moved with them; and the ids the brief called free are now this turn's. The report is the one this file is. This is why ruling 1 Q1 runs the tree laws at the moment of saving, not on a tree the turn has changed.

Local spec runs (DEC-364 as amended; `bun run e2e:local -- <files> --project=<project> --retries=0`, outside the sandbox, against ethio-staging):

- Run 1 — `e2e/i18n-coverage.spec.ts`, desktop-1280, on 7f8002d40 (the language helper as first written): 4 passed, 3 skipped (the mobile-only tests), 0 failed. Pasted whole for INC-1100. The 1,229 lines above it are the three `vite build` passes of the E2E build, kept in `/tmp/ethio-scratch/housekeeping-2/run-i18n-coverage-1.txt`.

```
[WebServer] $ bun run scripts/serve-e2e-node.ts --port "4173"
[WebServer] ➜ Listening on: http://127.0.0.1:4173/
[WebServer] [upstream] ssr language gate 200 564ms
[WebServer] [first-screen] tree deadline passed; the browser reads the tree
[e2e:preflight] migration parity OK via public.e2e_migration_ledger() definer RPC (public.migration_marks) (newest: 20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql).
[e2e:setup] E2E_SUPABASE_URL = https://jatpuhfdjfzctjipklmk.supabase.co
[e2e:setup] E2E_SUPABASE_SERVICE_ROLE_KEY present = true (length 219)
[e2e:setup] target ref is staging (jatpuhfdjfzctjipklmk) = true
[e2e:setup] app target is staging = true
[e2e:setup] PROCESS_ID = local798eb3-local
[e2e:setup] created user 3cd10a81-5487-4c3e-8ab4-e24e4a37e796 (e2e+local798eb3-local-62309-1-v4wgz4@ethio-e2e.invalid)
[e2e:setup] verified user confirmed at 2026-11-11T13:12:05.651833Z
[e2e:setup] pooled slot 0 verify currentLevel = aal2 (session discarded)
[e2e:setup] pooled factor 9f2c3d16-42f8-4eb8-9923-7b3ff051925e status = verified (1 totp factor)
[e2e:setup] pooled super admin slot 0: 3441507f-2384-4e59-a2a1-65c4b5172a47 (e2e+local798eb3-local-62309-2-puedw1@ethio-e2e.invalid, factor 9f2c3d16-42f8-4eb8-9923-7b3ff051925e)
[e2e:setup] pooled slot 1 verify currentLevel = aal2 (session discarded)
[e2e:setup] pooled factor a4574192-5729-4f93-afb7-a7d07e76c1f4 status = verified (1 totp factor)
[e2e:setup] pooled super admin slot 1: 56e4f4b4-9bd1-4cb5-86dc-40cefa674fbc (e2e+local798eb3-local-62309-3-dyliyh@ethio-e2e.invalid, factor a4574192-5729-4f93-afb7-a7d07e76c1f4)
[e2e:setup] identity pool size = 2 (E2E_WORKERS=2)
[e2e:setup] healed 0 stale EN rows (INC-175; probe complete; 394 ms)
[e2e:setup] maintenance skipped (owner: shard 1)
[e2e:setup] state written; setup complete

Running 7 tests using 1 worker

(node:62434) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:62434) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] [upstream] ssr language gate 200 80ms
  ✓  1 [desktop-1280] › e2e/i18n-coverage.spec.ts:176:3 › i18n chrome coverage (Amharic) › the marketplace shell renders no English fallback (772ms)
  -  2 [desktop-1280] › e2e/i18n-coverage.spec.ts:194:3 › i18n chrome coverage (Amharic) › the mobile drawer renders no English fallback
[WebServer] [upstream] ssr language gate 200 78ms
[WebServer] [upstream] ssr language gate 200 103ms
[WebServer] [upstream] ssr language gate 200 55ms
  ✓  3 [desktop-1280] › e2e/i18n-coverage.spec.ts:209:3 › i18n chrome coverage (Amharic) › the admin shell renders no English fallback (5.1s)
[WebServer] [upstream] ssr language gate 200 63ms
[WebServer] [upstream] ssr language gate 200 57ms
[WebServer] [upstream] ssr language gate 200 109ms
  ✓  4 [desktop-1280] › e2e/i18n-coverage.spec.ts:230:3 › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary (4.3s)
  -  5 [desktop-1280] › e2e/i18n-coverage.spec.ts:257:1 › B21SC-3 SC-3 the phone category level and Main menu are Amharic
[WebServer] [upstream] ssr language gate 200 58ms
  ✓  6 [desktop-1280] › e2e/i18n-coverage.spec.ts:309:1 › PN-AM-1 the different-place notice and place name are Amharic (984ms)
  -  7 [desktop-1280] › e2e/i18n-coverage.spec.ts:372:1 › FV-AM-1 the ☆'s fine print is Amharic
[e2e:teardown] accounts signed in this run: 3 (pool 1, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process local798eb3-local

  3 skipped
  4 passed (17.5s)
exit 0
```

- Run 2 — the 33 changed specs below, desktop-1280, on 497b2e3a8: "1 failed · 50 skipped · 497 passed (30.0m)". The failure was AT-12 (§10 item 11). `[ssr-error]` lines: 4, all the import tests' own refusals (`/api/admin/attributes/import definitions badHeader`, `… wrongFile`, `/api/admin/categories/import categories badHeader`, `… wrongFile`). `[slow-rpc]`: 0.
- Run 3 — after the AT-12 fix (d529ce281): admin-attributes-library, i18n-coverage, i18n-sign-in-language and page-head (the file that failed and the three callers of the changed `setAccountLanguage`), desktop-1280: "3 skipped · 33 passed (3.4m)"; `[ssr-error]` 0.
- Run 4 — one-line-slots and one-line-slots-admin, mobile-360 (both skip every test on desktop-1280: "the phone width"; §10 item 12): "10 passed (1.2m)" — one-line-slots 5 / 0 / 0, one-line-slots-admin 5 / 0 / 0; `[ssr-error]` 0.

| File (run 2, desktop-1280) | passed | failed | skipped |
| --- | --- | --- | --- |
| e2e/ad-page-doors.spec.ts | 15 | 0 | 0 |
| e2e/admin-attributes-editor.spec.ts | 18 | 0 | 0 |
| e2e/admin-attributes-import.spec.ts | 20 | 0 | 0 |
| e2e/admin-attributes-library.spec.ts | 20 | 1 | 0 |
| e2e/admin-audit.spec.ts | 7 | 0 | 0 |
| e2e/admin-categories-lifecycle.spec.ts | 26 | 0 | 0 |
| e2e/admin-listings.spec.ts | 38 | 0 | 0 |
| e2e/admin-monetisation.spec.ts | 17 | 0 | 0 |
| e2e/admin-roles.spec.ts | 14 | 0 | 0 |
| e2e/admin-screening.spec.ts | 27 | 0 | 0 |
| e2e/admin-services.spec.ts | 5 | 0 | 0 |
| e2e/admin-translations-console.spec.ts | 23 | 0 | 0 |
| e2e/admin-users.spec.ts | 14 | 0 | 0 |
| e2e/auth-signout.spec.ts | 17 | 0 | 1 |
| e2e/category-image-routes.spec.ts | 5 | 0 | 0 |
| e2e/i18n-coverage.spec.ts | 4 | 0 | 3 |
| e2e/i18n-sign-in-language.spec.ts | 6 | 0 | 0 |
| e2e/legal-admin.spec.ts | 22 | 0 | 0 |
| e2e/legal-certify.spec.ts | 22 | 0 | 0 |
| e2e/legal-doors.spec.ts | 17 | 0 | 0 |
| e2e/locale-format.spec.ts | 1 | 0 | 0 |
| e2e/mfa-stepup.spec.ts | 10 | 0 | 0 |
| e2e/my-listings-ad.spec.ts | 19 | 0 | 0 |
| e2e/my-listings-doors.spec.ts | 14 | 0 | 0 |
| e2e/my-listings-levels.spec.ts | 14 | 0 | 0 |
| e2e/my-listings-page.spec.ts | 8 | 0 | 0 |
| e2e/one-line-slots-admin.spec.ts | 0 | 0 | 5 |
| e2e/one-line-slots.spec.ts | 0 | 0 | 5 |
| e2e/page-head.spec.ts | 2 | 0 | 0 |
| e2e/posting-routes-dials.spec.ts | 7 | 0 | 0 |
| e2e/rbac.spec.ts | 3 | 0 | 0 |
| e2e/shell-table-law.spec.ts | 1 | 0 | 0 |
| e2e/shell.spec.ts | 81 | 0 | 36 |

Run 3 per file: admin-attributes-library 21 / 0 / 0, i18n-coverage 4 / 0 / 3, i18n-sign-in-language 6 / 0 / 0, page-head 2 / 0 / 0.

Rename-only; tsc is the local proof (20 files). Each changed only by import lines and the renamed call `useJobSuperAdmin` / `signInAsSuperAdmin` → `signInJobSuperAdmin`, with the same arguments. Their bodies with imports removed equal their base bodies after the rename (`/tmp/ethio-scratch/housekeeping-2/classify.ts`):

- e2e/admin-ai-calls.spec.ts
- e2e/admin-attributes-links.spec.ts
- e2e/admin-attributes-safety.spec.ts
- e2e/admin-categories-console.spec.ts
- e2e/admin-categories-home.spec.ts
- e2e/admin-categories-images.spec.ts
- e2e/admin-countries.spec.ts
- e2e/admin-guides.spec.ts
- e2e/admin-locations.spec.ts
- e2e/admin-translations-data.spec.ts
- e2e/admin-translations-governance.spec.ts
- e2e/breadcrumbs.spec.ts
- e2e/import-security.spec.ts
- e2e/my-listings-promote.spec.ts
- e2e/name-check-queue.spec.ts
- e2e/overlays.spec.ts
- e2e/phone-frame.spec.ts
- e2e/photo-pipeline.spec.ts
- e2e/posting-routes.spec.ts
- e2e/sage-ad-page.spec.ts

J-audit (e2e/** changed):
- J1: the scratch role name is lettered (`e2e_scratch_role_<letters>`).
- J3: every scratch role is reaped by its spec's afterEach or finally through `reap`; the language restores are in afterEach.
- J4: the column polls read DB truth through the service client.
- J5: seeds are service-client table writes.
- J6: LGA-21's last check excludes other tests' rows.
- J7: polls are shorter than their budgets and fail with values.
- J9: pool leases throughout; E6 keeps its `@private-identity`.
- No `.first()`, `waitForTimeout` or `test.only` was added (the added-line grep in §6).

## 6. K2 — siblings that bypass the mechanism

Greps run:
- `rg -n "createClient\(" e2e/*.spec.ts`
- `rg -n '\.from\("roles"\)' e2e/*.spec.ts`
- the pick-race census (§4)
- `rg -n "replace\(/\[.\*\+\?\^" scripts src/lib`
- `git diff 3e63743cc -- e2e scripts | rg "^\+" …` for the banned patterns

Results:
- Spec-local supabase-js clients (out of the five classes; left): ad-page :541; category-image-routes :46; posting-routes-identity :118; posting-routes-catalog :605, :699; account-saved :33; admin-monetisation :1166, :1316, :1318; viewing-place :58, :189; photo-pipeline :1793, :2027, :2040; admin-screening :778, :1160; feed-index :240, :447; feed-route :285, :401; posting-routes :1225; import-security :994. They are the anonymous or signed-in callers that `asAnonymous` / `asPerson` now serve.
- A scratch role built by hand: legal-admin :1150 (LGA-22's `makeRole`), the same act as `grantScratchRole`. The census named LGA-21's `makeRole` (:1033 then) and not this one, so it is left as found (§10 item 7).
- Picks that may race the page's account read: the 14 sites in §4.
- The same RegExp escape written inline, outside this turn's scope: src/lib/schemas/server-fns.test.ts :44 and scripts/conformance/executor-hooks.test.ts :100 (both complete escapes; left).
- Page-client reads inside test bodies: they stay on CF-BC-1's allowlist (finding F1 of stop report 1; D324 (b)).

## 7. Allowlists and guards

| Allowlist | before (3e63743cc) → after |
| --- | --- |
| scripts/conformance/browser-client-allowlist.txt | 18 → 11 lines |
| scripts/conformance/door-answers-allowlist.txt | 1 → 1 (re-keyed) |
| scripts/conformance/listing-seed-allowlist.txt | 2 → 2 (re-keyed) |
| scripts/conformance/e2e-helpers-allowlist.txt (new) | 0 → 0 (header only) |
| scripts/conformance/briefs-allowlist.txt | 0 → 0 |

- browser-client-allowlist.txt: the lines of admin-audit (4), admin-listings (4), admin-roles (4), admin-screening (8), mfa-stepup (4), my-listings-doors (4) and posting-routes-dials (2) are gone; admin-services falls from (4) to (2), its `selectAsPage` table read; my-listings-page stays at (2), its inline sign-outs (F1).
- door-answers-allowlist.txt: `e2e/posting-routes-dials.spec.ts:167` → `:138`. The line moved when the wrappers above it went; the reason is unchanged.
- listing-seed-allowlist.txt: `e2e/ad-page-doors.spec.ts:452` / `:457` → `:325` / `:330`, for the same cause and with the same reasons.
- No new allowance line.
- Guards:
  - e2e-helpers.test.ts: CF-HELPERS-1 → 3 with a planted fixture.
  - briefs.test.ts: CF-BRIEF-14's self-test and the escape test.
  - wired.test.ts names e2e-helpers.test.ts ("CF-HELPERS-3"), briefs.test.ts and check-go.ts.
  - All of them pass in the scripts suite above.
- kit.test.ts CF-KIT-7: both new censuses hand their finding keys to `readAllowlist`.

## 8. Strings

None (FLAG no-new-string). No `t(` key was touched; `bun run checks`' i18n-usage-map step "Assert no drift" passed.

## 9. Migrations

None (FLAG no-migration).

## 10. Departures

The rulings of this turn: STOP 1 (the census) → ruling 1, saved by scripted copy, sha256 8bee8caa…f2de3 equal to the carrier's.

Decide-and-name under the laws, beyond stop report 1's D1 → D7:
1. CF-HELPERS-1 counts a `const` only when it holds a function (an arrow or function expression). `const asAnon = await rest(…)` (posting-routes :942) is a value, not a copy (K1; the planted clean spec proves it passes).
2. CF-HELPERS-2 and CF-HELPERS-3 joined the tree test in the commit that clears them (Q5, Q7), so every commit is green (rule 00 step 4).
3. `grantScratchRole`'s `reap` takes `string[] | Set<string>`: legal-admin's afterEach backstop is a Set (ruling 1 Q4's "pushed to the spec's reap list").
4. TR-10 and "TR-scope AI" used `is_system` / `is_core` false (the defaults) and priority 10 (ordering only). They now take the shared role (priority 1), and TR-scope AI now checks its grant errors (D2's stricter check).
5. CT-23 moved with CT-22: they shared the local `scratchRole`. The scratch roles are now created after the lease (an order change with no observable effect: the role exists before the sign-in either way).
6. LGA-21 (ruling 1 Q6 (a)) reads "the base set" as every non-scratch `enabled_admin` language. With is_base alone, om and ti would stay offered on the card and the check could not hold. A scratch language is judged by its `E2E ` name, the text the control exposes (`"Add translation: " + names.join(", ")`, the names being `name_en`). The control exposes every missing language, so no STOP.
7. LGA-22's `makeRole` (legal-admin :1150) is the same act but was not in the census's list, so it is left untouched and reported (§6, §13). Rule 00 makes a census hit the task did not anticipate a STOP, so it is a STOP-class item named here, not acted on.
8. CF-HELPERS-3 is scoped to e2e/*.spec.ts, per the brief's "a census over e2e/*.spec.ts".
9. The two helper baselines stay where they are: users.ts :326–:332, the lease, and ui.ts `resetLanguageBaseline`, the pooled super admin. Moving them into account-language.ts would make ui.ts import a module that imports ui.ts.
10. "The control's code" is the `lang` attribute both switcher labels carry (`language-switcher-short` / `-full`, src/components/language-switcher.tsx :67, :70; read only). The helper requires every label on the page to carry `code`.
11. AT-12, and an extra settle step in `setAccountLanguage` (TOLERANCES: "fixed at its cause before the push").
    - Run 2's AT-12 failed in `switchLanguage` (`<html lang>` stayed "en").
    - The trace's network log shows the cause: the page's own D239 account read began at 13:18:54.778 and answered 69 ms later; the pick's `user_set_preferred_language` call began at 54.818, inside that window, and returned `{"ok": true, "language": "am"}`; the read's "en" then replaced the pick.
    - AT-12 changed only by the rename; the race is older than this turn. ui.ts documents it at `watchAccountLanguage` ("A pick made while that read is in flight is overwritten").
    - The fix: AT-12 arms the watch before its navigation, as one-line-slots does. `setAccountLanguage` reloads with the watch armed before it picks, beyond ruling 1 Q7's recipe, because the helper had the same window.
    - Run 3 passed with both changes.
12. one-line-slots and one-line-slots-admin skip every test on desktop-1280 ("the phone width"). For them, DEC-364's one project is the one they run on, mobile-360 (run 4).
13. The CodeQL alert (go-laws.ts :411, "This does not escape backslash characters in the input") is fixed by one exported `escapeRegExp` in go-laws.ts. The module's two inline copies and check-go.ts's one now use it (K1 inside the module). The option name matched `[\w$]+`, so no backslash could reach it; the fix makes the escape complete regardless.

Departures from the approved file list:
- e2e/global-setup.ts :74 — one comment line names the renamed helper. It is outside ruling 1's approved list, but it is a stale name in a comment, the class Q5 brings in. Its diff is that one line.
- docs/features/ci-guards.md — the renamed helper's name in a mention. The file is in the standing allowance (docs/features/**); ruling 1's list names step-up-auth.md and admin-listings.md, and Q5 says "docs/features mentions updated".

## 11. CI

The base, read at STEP 0 (stop report 1): ci-status.md

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `3e63743cc2535071ee9708d9f5fe3460990ee35e` (short `3e63743`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-11T03:31:22Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42950754366
```

Two-step check: the reported commit was the lane's head then, so SUCCESS was current. Read again before the push (`git show origin/ci-evidence:docs/tracking/ci-status.md`): c063f9dc5 (the stop-1 push), SUCCESS, run 43015859409. No red of an earlier turn.

This pull request's runs:
- d529ce281:
  - CodeQL failed: "1 new alert including 1 high severity security vulnerability", at scripts/brief/go-laws.ts :411, "Incomplete string escaping or encoding". Class (e), mine; fixed at its root in a8c84e496 (§10 item 13).
  - Run 43033934604, completed, failure: 16 jobs passed, 1 skipped (promote), 20 failed. All 19 E2E lanes (16 numbered, smoke, email, repeat) failed at "Install Chromium's system libraries" before any test ran, and the merged "E2E (Playwright, ethio-staging)" Verdict failed with them. Lane 15's log: "Temporary failure resolving 'azure.archive.ubuntu.com'", then "E: Unable to fetch some archives", then "bunx playwright install-deps chromium failed with exit 1 on try 1 of 1". Class (b), infrastructure. Not re-run: the fix's push started a new run.
- a8c84e496: 
  - CodeQL: pass (the alert is gone).
  - Run 43036501908, completed, failure: 16 jobs passed, 1 skipped (promote), 20 failed. `gh pr checks 34`: 21 pass, 20 fail, 1 skipping.
  - The 20 failures are all 19 E2E lanes, each at "Install Chromium's system libraries", and the merged Verdict.
  - Lanes 2 and 15's logs (read whole): 26 lines "Temporary failure resolving 'azure.archive.ubuntu.com'", then "E: Unable to fetch some archives", then "bunx playwright install-deps chromium failed with exit 1 on try 1 of 1".
  - Class (b), infrastructure: the runners could not resolve the Ubuntu mirror, and no test ran. This is the second infrastructure red in a row (d529ce281's run above), so rule 40 has it reported, not re-run. Stop report 2 asks the operator or the supervisor for the re-run (`gh run rerun 43036501908 --failed`) once the runners' name lookup recovers.
  - The browser-dependent proof of this turn (both projects, every lane, the repeat lane) is therefore not yet in.

Flake ledger (origin/ci-evidence, read whole): no test has three or more lines in the last seven days. MON-9 and SO-12 have two each.

## 12. Limits

- Playwright does not start inside Cursor's sandbox (rule 20), so every local spec run was made outside it. CI's lanes on both projects and the repeat lane are the behaviour proof (DEC-364).
- Locally, the changed specs ran on desktop-1280 only, except the two phone-only specs on mobile-360. A spec's mobile-360 behaviour is CI's.
- The rename-only files (20) were proven by tsc, not run.
- Run 1 measured the language helper as first written (7f8002d40). The settle reload was added after run 2's AT-12 trace, and run 3 measured it on the same file.
- The checks' gitleaks and actionlint steps do not run on darwin/arm64, and dependency-audit cannot reach its service. CI judges those three.
- CI's browser lanes have not run a test on the last code commit (§11), so nothing on mobile-360 beyond run 4, nor the repeat lane, is proven yet.
- The scratch directory `/tmp/ethio-scratch/housekeeping-2/` is the operator's to remove. It holds:
  - the STEP 0 snapshot `step0/`;
  - the run logs (`run-*.txt`, `checks-*.txt`, `pr-checks-*.txt`, `lane*.txt`, `run2-lane-*.txt`, `build-final.txt`, `bundle-final.txt`, `check-go-*.txt`, `diff-base.txt`, `diff-turn.txt`);
  - AT-12's unpacked trace (`at12-trace/`);
  - the helper scripts named above (`classify.ts`, `per-file.ts`, `pick-race.ts`, `compare-pages.ts`, `trace-lang.ts`, `escape-red.ts`, `splice-report.ts`) and the earlier edit scripts (`mutate.ts`, `splice-header.ts`, `census-alone.ts`, `drop-fns.ts`, `wrap-calls.ts`, `replace-once.ts`, `bc-counts.ts`, `bc-counts2.ts`, `add-import.ts`, `drop-lines.ts`, `holder-calls.ts`, `drop-import.ts`);
  - their lists (`sias.txt`, `changed-e2e.txt`, `linekeyed.txt`, `touched.txt`, `classified.txt`, `files.txt`, `added-since.txt`, `p-*.txt`).
- The local test output under `test-results/` is git-ignored build output.

## 13. Findings

- MAJOR — the scratch role escapes the global reaper. `e2e/global-setup.ts` :832 reaps roles `LIKE 'e2e-%'` only. The ruled name `e2e_scratch_role_<letters>` (e2e/helpers/users.ts :467) is never swept, and neither are the older `e2e_viewonly_`, `e2e_catie_` and `e2e_mylistings_role_` names. TR-10 and "TR-scope AI" were named `e2e-…` before and are no longer swept, so the global reaper no longer catches their residue. Their own finally still reaps them. The fix is one reaper pattern (`e2e_%` beside `e2e-%`) in global-setup.ts, outside this turn's list.
- MAJOR — LGA-22's `makeRole` (e2e/legal-admin.spec.ts :1150) builds a scratch role by hand, the act `grantScratchRole` serves, and CF-HELPERS-1 does not see it (it is a `const` inside a test). It should be the next move, and a CF-HELPERS-1 extension (an inline `.from("roles").insert`) would hold it.
- The AT-12 class: 14 picks after a navigation with no account-read watch (§4). A signed-in pick inside the page's account-read window is replaced by the read. Each site needs reading (signed out is safe), and a shared form would settle it: `switchLanguage` waiting for the read on a signed-in page. The same window exists for a person who picks within the read's round trip; in a person's time that is hard to hit, and the rule (D239) is the product's.
- The unused names tsc `--noUnusedLocals` reports in touched specs, all from before this turn: `stripScratchRows` and `action` (admin-attributes-library), `cell`, `surface`, `isMobile`, `switchUser`, `c1Name` / `c2Name`. The project's lint does not flag them; they are left as found.
- `setDeviceAmharic`'s `catch {}` (private mode) moved from ui.ts unchanged, with its comment.
- The lanes' browser-library install has no retry. `.github/workflows/local-backend-proof.yml` :741 runs `bash scripts/ci/with-deadline.sh 1500 1 -- bunx playwright install-deps chromium`, one try, as flake-check.yml :89, guard-proof.yml :51 and nightly-e2e.yml :109 and :372 do. AGENTS.md's line is "installs run through `scripts/ci/with-deadline.sh` (one loud retry)". The mirror's name-lookup failure took every lane down on both of this pull request's runs (§11). Outside this turn's scope (.github/).
- None is a security hole. The CodeQL alert was a dev-tooling regex over the supervisor's brief text, never reachable from user input, and it is fixed in this pull request.

## 14. Records

DEC — DEC-364 as amended (housekeeping-2 ruling 1): a helper-consolidation turn runs each touched spec file whole locally on one project (desktop-1280, 0 retries, outside the sandbox) EXCEPT a file whose only change is a renamed import or call with identical arguments and no other line (the diff shape proves it — the executor lists those files under §5 with the words "rename-only; tsc is the local proof"); CI's lanes on both projects and the repeat lane are the behaviour proof for all; a spec red in CI that the local run did not run is read as this rule's cost. Frozen judge as before: adopted when every touched spec passes locally once and CI's lanes and repeat lane are green on the last code commit. Judge, filled: not yet met. Every touched spec passed locally once (report §5, runs 1 → 4; AT-12 after its fix at its cause), but CI's lanes and repeat lane have not run a test on the last code commit (a8c84e496): an infrastructure red, twice (report §11).

DEC — D324 (the supervisor, 2026-11-11 07:2x New York, housekeeping-2 ruling 1, under G17) — (a) law 10 counts digits only (a tolerance in words passes); law 5's "new" exception takes "built as / built here / (new)"; law 7 matches whole hyphenated ids; law 5 treats a glob as present when it matches; (b) a second guard for one concern is refused — CF-BC-1 keeps the page-client concern; CF-HELPERS covers local declarations, the hooks disable and the column write; (c) the language restores go to the pool's NULL baseline, not a read "prior" value.

INC — INC-1065: FIXED in housekeeping turn 2 — e2e/helpers/door-callers.ts (`asPerson`, `asAnonymous`, `asBearer`, `pageDoor`): the seven `asPerson`, seven `restBase`, six `answerOf`, `asAnonymous`/`asAnon` and admin-users' `bearerClient` copies, admin-monetisation's and seller-name.ts's `restBase`, legal-admin's raw grant and the thirteen page-side wrappers are gone; CF-HELPERS-1 refuses a copy.

INC — INC-1049: FIXED in housekeeping turn 2 — `grantRole` and `grantScratchRole` (e2e/helpers/users.ts): the ten same-signature copies, the three other-signature copies, the three `scratchHolder` bodies, `grantAdmin`, the inline super_admin grant and the nine inline scratch-role builds moved; CF-HELPERS-1 refuses a copy.

INC — INC-1073: FIXED in housekeeping turn 2 — LGA-21 writes texts only for its own scratch language and the non-scratch languages; its last check reads the card's translate control and requires that it offer neither this test's language nor any language without the `E2E ` name; the cross-worker write is gone.

INC — INC-1100: FIXED in housekeeping turn 2 — setAccountLanguage settles the session-start save, sets the language as the product does and proves the page took it; cause: the test's direct write raced D239's first-sign-in save (read, then measured at the first local run of i18n-coverage.spec.ts — paste the run). The run: report §5, run 1 (4 passed, 3 skipped, 0 failed, on 7f8002d40); after the settle reload (§10 item 11), run 3 (i18n-coverage 4 passed, 3 skipped).

INC — (new) A signed-in pick inside the page's own account-read window is replaced by the read (D239): AT-12 (e2e/admin-attributes-library.spec.ts) failed locally on housekeeping turn 2's run; the trace shows the read began 40 ms before the pick and answered after it. Fixed for AT-12 and `setAccountLanguage` in housekeeping turn 2 (the read awaited before the pick); 14 further sites after a navigation without the watch are listed in the report's §4, to be read.

INC — (new) The global reaper (e2e/global-setup.ts :832) sweeps roles `LIKE 'e2e-%'` only; the underscore scratch-role names (`e2e_scratch_role_`, `e2e_viewonly_`, `e2e_catie_`, `e2e_mylistings_role_`) are never swept, and TR-10 / TR-scope AI lost the sweep when they moved onto `grantScratchRole` in housekeeping turn 2.

INC — (new) CodeQL js/incomplete-sanitization on pull request #34: scripts/brief/go-laws.ts's option law escaped only `$` in a RegExp source; fixed in housekeeping turn 2 by one `escapeRegExp` in the module (a8c84e496).

register row — "a GO's claims are checked against the tree by a script" → scripts/brief/go-laws.ts (callers: scripts/conformance/briefs.test.ts, scripts/brief/check-go.ts) → CF-BRIEF-14 → exceptions: briefs-allowlist.txt.

register row — "a GO's census asks the repository's questions" → docs/governance/go-template.md → CF-BRIEF-15 → exceptions: records and rules turns by title.

register row — "a test does one thing one way through the shared e2e helper" → e2e/helpers (passwordGrant; door-callers.ts asPerson, asAnonymous, asBearer, pageDoor; inBrowserClient + doorAnswer; users.ts grantRole, grantScratchRole; ui.ts signInJobSuperAdmin; account-language.ts setDeviceAmharic, setAccountLanguage, seedAccountLanguage, restoreAccountLanguages) → CF-HELPERS-1 → 3 (D324 (b): the brief's CF-HELPERS-4 became CF-HELPERS-3; the page-client cast stays CF-BC-1's) → exceptions: e2e-helpers-allowlist.txt (empty).

changelog — 2026-11-11 housekeeping turn 2 (Opus 5.5): a GO's claims are checked against the tree by `scripts/brief/check-go.ts` over `scripts/brief/go-laws.ts` (CF-BRIEF-5 → 15; CF-BRIEF-14 the self-test), and `docs/governance/go-template.md` carries the GO's sections and its census checklist (CF-BRIEF-15); the e2e tree's hand-rolled helpers move onto shared ones — door-callers.ts (INC-1065), `grantRole` / `grantScratchRole` (INC-1049), `signInJobSuperAdmin` and the five hooks disables gone, account-language.ts whose `setAccountLanguage` proves the page took the language (INC-1100) — and LGA-21 writes only its own and the shipped languages (INC-1073); CF-HELPERS-1 → 3 refuse a copy; DEC-364 as amended, D324.

roadmap — line 23 ("The housekeeping turn"), the parts this turn closed: `[x]` INC-1065 (the REST and page door callers, e2e/helpers/door-callers.ts), INC-1049 (`grantRole` / `grantScratchRole`), the `use…` helpers renamed (`signInJobSuperAdmin`, `setDeviceAmharic`), INC-1073 (LGA-21), INC-1100 (`setAccountLanguage`), the GO checker (CF-BRIEF-5 → 15) and the GO template — housekeeping turn 2, pull request #34; still open from this turn's findings: the reaper's underscore role names, LGA-22's `makeRole`, the 14 picks after a navigation (report §4).
