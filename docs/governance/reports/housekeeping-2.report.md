# Housekeeping turn 2 — report

Base: dev 2b11a9d29 · Final commit: cc151c279 (Part D; the code before it: a8c84e496) · Brief: docs/governance/briefs/housekeeping-2.md (sha256 6fa54ab7d3a4fa4f8c439771b5d337b1b71096e8444da96c01de5e703268e35a) · Ruling 1: docs/governance/briefs/housekeeping-2-ruling-1.md (sha256 8bee8caa275383f20cff386b16943fba62d4432ed186b0aa604d14f4940f2de3) · Ruling 2: docs/governance/briefs/housekeeping-2-ruling-2.md (sha256 32dadaeb552f7cd16738f4aee06a2b42c8a77ddcf4e0d14edefdd82f3175f8ee) · Ruling 3: docs/governance/briefs/housekeeping-2-ruling-3.md (sha256 4b808606e0d5f47f5d1a04fd27f5ad4cec9ca9ba199995c5b802b401551e7db9)
Review: READY · 0 BLOCKER · 3 MAJOR · 7 MINOR · on cc151c2

CI on the last code commit: cc151c279 (Part D), run 43069973329, completed, success. 36 jobs passed and 1 skipped (promote); all 19 E2E lanes and the repeat lane are green, and `gh pr checks 34` lists 41 pass and 1 skipping. The three runs before it (d529ce281, a8c84e496 and its re-run, 921ec9569) failed only at the browser lanes' system-library install, on the runners' mirror, before any test (INC-1101, §11).

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
- STOP 2 (the runners' mirror) → ruling 2: the report push's run (921ec9569) failed on the same mirror error, so I re-ran run 43036501908's failed jobs once, and that failed on it again (§11).
- Part D (ruling 3) — done (cc151c279):
  - `scripts/lib/pattern.ts` (`literal`, `pattern`, `flaggedPattern`, `exactWord`, `authored`) holds the one `new RegExp(` a script makes from text.
  - go-laws.ts's nine sites, check-go.ts :50 and doors/rows.ts :137, :139 moved onto it. go-laws.ts's `escapeRegExp` is gone.
  - The door manifest's key is checked token by token.
  - CF-PATTERN-1 → 3 (scripts/lib/pattern.test.ts) and CF-PATTERN-4 (scripts/conformance/pattern-sites.test.ts, with its allowlist of the turn-3 sites) judge it, and wired.test.ts names both.
- STEP 5 — done: typecheck, lint, the scripts suite, `bun run checks` (run whole three times, the third on the final tree cc151c279), and check-go.ts on a8c84e496's tree (§5).
- STEP 6 — pushed four times:
  - d529ce281 (the code), then a8c84e496 (the CodeQL fix). On both runs, CI's E2E lanes failed at the browser's system-library install before any test ran (§11).
  - 921ec9569 (the report and stop report 2). Same failure.
  - cc151c279 (Part D). Its run is the judged run (ruling 3 item 5), and every check on it is green (§11).
  - Then this report commit (with ruling 2's copy), pushed once. Its run is not judged (rule 40). The pull request's comment names cc151c279, and the draft stays a draft.
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

After a8c84e496, `git diff --name-only a8c84e496 cc151c279` prints 15 files: the report and stop report 2 (921ec9569), then Part D's 13 (cc151c279):

```
docs/features/security-scanning.md
docs/governance/briefs/housekeeping-2-ruling-3.md
docs/governance/reports/housekeeping-2.report.md
docs/governance/reports/housekeeping-2.stop-2.md
scripts/brief/check-go.ts
scripts/brief/go-laws.ts
scripts/conformance/briefs.test.ts
scripts/conformance/pattern-sites-allowlist.txt
scripts/conformance/pattern-sites.test.ts
scripts/conformance/wired.test.ts
scripts/doors/check-doors.test.ts
scripts/doors/manifest.ts
scripts/doors/rows.ts
scripts/lib/pattern.test.ts
scripts/lib/pattern.ts
```

The new files among them (`--diff-filter=A`): the two reports, the ruling 3 copy, pattern-sites-allowlist.txt, pattern-sites.test.ts, scripts/lib/pattern.test.ts and scripts/lib/pattern.ts. Over the whole lane, `git diff --name-only 2b11a9d29 cc151c279` prints 253 files; this turn's own (`3e63743cc`) are 94.

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
| A RegExp built from text (Part D) | each script's own `new RegExp(`: go-laws.ts's `escapeRegExp`, rows.ts a door name raw | `pattern` / `flaggedPattern` / `exactWord` / `literal` (every interpolated string escaped), `authored` for CF-BRIEF-9's ASSERT patterns; the matches are unchanged (§5's equivalence runs) except CF-BRIEF-7's id boundary, which now also counts `$` (§10 item 16) |
| Door manifest key (Part D) | one regex with nested quantifiers (`KEY`) | split on `(`, `)` and `,`: `NAME_WORD` for the name, `KEY_ARGUMENT` for each argument; the same keys pass and fail (§5) and the error text is unchanged (`malformed key <key>`) |

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

Part D's census (ruling 3), read on 921ec9569 before any edit:
- `rg -n "new RegExp\(" scripts --type ts --type js -g '!*.test.*' | wc -l` → 25, the ruling's COUNT. They are the twelve sites of item 2 (go-laws.ts :34, :35, :203, :204, :234, :272, :386, :416, :448; check-go.ts :50; rows.ts :137, :139) and the thirteen of item 3. A bare `RegExp(` call: none.
- manifest.ts :99 `KEY`, the nested-quantifier shape (alert #442, reported at its use, :129).
- `nosemgrep: detect-non-literal-regexp` in scripts/: e2e-select.ts :443 and list-action-labels.ts :111, both item-3 sites.
- Register row 98 already names this concern ("NONE YET as one helper — a kit `rx` (scripts/conformance/kit.ts)", roadmap). Ruling 3 places the helper at scripts/lib/pattern.ts instead; the row's text is in §14.
- On the final tree, CF-PATTERN-4 prints "[pattern-sites] files: 67, outside the helper: 8 (8 allowlisted)". 67 is `rg --files scripts -g '*.{ts,mjs,js,cjs}' -g '!*.test.ts' -g '!*.spec.ts' | wc -l`.
- The open code-scanning alerts on `refs/pull/34/merge` under scripts/brief and scripts/doors (`gh api …/code-scanning/alerts?ref=refs/pull/34/merge&state=open`, read before the push, on the merge commit 13ce313be) number 13:
  - `detect-non-literal-regexp`, eleven: #449 (go-laws.ts :203), #450 (:204), #451 (:234), #454 (:386), #456 (:448), #459 (:272), #460 (:416), #458 (check-go.ts :50), #443 and #445 (rows.ts :137, :139). Part D moves every one of these sites.
  - `detect-redos`, two: #442 (manifest.ts, fixed by Part D), and #453 on go-laws.ts :379, the `TEST_ID` literal `(?<![\w-])[A-Z]{2,6}(?:-[A-Z0-9]+)*-\d+(?![\w-])`, which Part D does not touch.
  - `html-in-template-string`, one: #457 on go-laws.ts :497, CF-BRIEF-10's message `a bare count "…" — write COUNT: <n> := <command>`.
  - #453 and #457 are hits ruling 3 did not name (§10 item 20, §13).

## 5. Tests

Law ids (each grep-checked free at the census, §7 of stop report 1):
- CF-BRIEF-5 cited path, 6 cited line, 7 free id, 8 option, 9 assert, 10 count, 11 title, 13 allowance, 14 the self-test (every law and check-go.ts on planted fixtures), 15 the census checklist. Law 12 (SCOPE) is the existing CF-BRIEF-3. CF-BRIEF-1 → 4 moved unchanged.
- CF-HELPERS-1 (a spec's local `function` or function-valued `const` of a shared helper's name: asPerson, asAnonymous, asAnon, rpcResult, rpcFromBrowser, rpcAsPage, doorError, clientReady, restBase, answerOf, bearerClient, grantRole, grantAdmin, scratchHolder, signInAsSuperAdmin, setAmharicAccount, setAccountLanguage, seedAccountLanguage). CF-HELPERS-2 (a `rules-of-hooks` disable anywhere under e2e/). CF-HELPERS-3 (a spec's direct write of `profiles.preferred_language`). Per D324 (b), CF-BC-1 keeps the page-client concern.

Red evidence:
- Each law's planted fixture is its red: CF-BRIEF-14's "each law's code finds its planted violation" and the planted test of e2e-helpers.test.ts assert each law's finding by name and line, so a law that cannot fail fails its own test.
- CF-HELPERS-3 on the tree: I planted an untracked `e2e/zz-planted-language.spec.ts` holding one direct write and ran `bunx vitest run scripts/conformance/e2e-helpers.test.ts`. It printed "1 failed | 1 passed (2)" with "+ e2e/zz-planted-language.spec.ts:4 writes profiles.preferred_language: use e2e/helpers/account-language.ts". With the plant deleted: "2 passed (2)". It was never committed.
- The escape (a8c84e496): the new briefs test is "a cited name enters a pattern as itself: every metacharacter, the backslash included". The old `$`-only escape on the test's name (`/tmp/ethio-scratch/housekeeping-2/escape-red.ts`) prints "old escape matches its own name: false", so the test's first claim fails on the old code.

Part D (cc151c279):
- New ids, each grep-checked free before use (`rg -n "CF-PATTERN|pattern-sites|scripts/lib" scripts src e2e docs` → none outside ruling 3):
  - CF-PATTERN-1: `literal` escapes every metacharacter of a planted string.
  - CF-PATTERN-2: a pattern built from twelve hostile parts (`.*`, `(`, `)`, `\`, `[a-z]+`, `(a+)+`, `a{1,}`, `^$`, `x|y`, `${x}`, `?`, `/`) matches only the part's literal text; the flags, a RegExp part, the refusals and `authored` are checked too.
  - CF-PATTERN-3: no helper's output from those parts holds a nested quantifier. The detector is first shown to flag the old manifest `KEY`, and a 41-character hostile input answers in under 100 ms.
  - CF-PATTERN-4: the census, with its planted bypass (a raw `new RegExp(`, a bare `RegExp(`, a stray marker, an `authored` import, and a pattern.ts without the reviewed form).
- DOORS-2 gains five malformed keys, one per token rule and shape (`X(uuid)`, `x(uuid,Text)`, `x(uuid`, `x(uuid,)`, `x((uuid))`), each answered `malformed key <key>` alone, and one good key with an array and a spaced argument.
- Red evidence:
  - CF-PATTERN-4 on the tree. I wrote a8c84e496's `scripts/doors/rows.ts` into place from `git show` and ran the census. It printed "1 failed | 1 passed (2)" with "+ scripts/doors/rows.ts:137 builds a RegExp outside scripts/lib/pattern.ts" and ":139". I then copied Part D's file back (`cmp` equal).
  - A test-id law caught my first draft, which gave two tests the id CF-PATTERN-4 (TI-1, "CF-PATTERN-4: scripts/conformance/pattern-sites.test.ts:111, …:120"). They are one test now.
- Equivalence of the moved sites (scratch scripts, outside the repository):
  - `key-equivalence.ts`: the old `KEY` and the new check over the manifest's 265 keys and 60,000 generated ones (1,052 well formed) → "disagreements 0".
  - `golaws-equivalence.ts`: the old and new glob converter (8 globs × 13 paths), census-item word (5 keys × 9 texts), `CITATION` and `CITED_PATH` (5 lines) → "disagreements 0".
- `bunx vitest run scripts --maxWorkers=2` on cc151c279: "Test Files 104 passed (104)", "Tests 528 passed | 1 skipped (529)".
- `bun run typecheck` and `bun run lint`: exit 0. scripts/ is outside tsconfig's include, so the touched scripts were also checked by `bunx tsc --noEmit --strict … <the eight files>`, with no output.
- THE CHECKS on cc151c279 (`bun run checks`):
  - fast line: `checks (fast): 25 PASS · 0 FAIL · 382s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`
  - last line: `checks: 34 PASS · 0 FAIL · 24 NOT RUN · 439s`
  - The NOT RUN steps are the same 24, for the reasons below. The local Semgrep scan passed (ERROR only); its per-rule counts are not kept, so the alerts' closing is CI's next scan.

Unit totals:
- `bunx vitest run scripts --maxWorkers=2` on a8c84e496: "Test Files 102 passed (102)", "Tests 524 passed | 1 skipped (525)".
- `bun run typecheck`: `tsc --noEmit`, no output (green). `bun run lint`: `eslint . --max-warnings 0`, no output (green).

THE CHECKS (`bun run checks`, a8c84e496's tree; cc151c279's are above):
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
- A RegExp built from text, outside Part D's sites (`rg -n "\bRegExp\(" src e2e -g '!*.test.*'`):
  - scripts/: the thirteen turn-3 sites, each counted on pattern-sites-allowlist.txt (§13).
  - src/, 9 sites in 5 files, outside scripts/ and so outside CF-PATTERN-4:
    - src/i18n/i18n-context.ts :44
    - src/server/imports/gate.ts :171
    - src/lib/schemas/theme.ts :191, :192, :202
    - src/components/shell/location-data.ts :92, :114
    - src/integrations/supabase/previewAuthStorage.ts :50, :51 (platform-generated, never hand-edited)
  - e2e/: 107 sites in 36 files. Semgrep's SARIF filter drops a WARNING in test code. Several carry their own escape: e2e/helpers/ui.ts :32 `escapeRe`, photo-pipeline :1229, :1354, my-listings-ad :93.
  - src/lib/schemas/server-fns.test.ts :44 and scripts/conformance/executor-hooks.test.ts :100 keep their own complete escapes (test files).

## 7. Allowlists and guards

| Allowlist | before (3e63743cc) → after |
| --- | --- |
| scripts/conformance/browser-client-allowlist.txt | 18 → 11 lines |
| scripts/conformance/door-answers-allowlist.txt | 1 → 1 (re-keyed) |
| scripts/conformance/listing-seed-allowlist.txt | 2 → 2 (re-keyed) |
| scripts/conformance/e2e-helpers-allowlist.txt (new) | 0 → 0 (header only) |
| scripts/conformance/briefs-allowlist.txt | 0 → 0 |
| scripts/conformance/pattern-sites-allowlist.txt (new, Part D) | 0 → 8 lines (13 sites, the turn-3 list) |

- browser-client-allowlist.txt: the lines of admin-audit (4), admin-listings (4), admin-roles (4), admin-screening (8), mfa-stepup (4), my-listings-doors (4) and posting-routes-dials (2) are gone; admin-services falls from (4) to (2), its `selectAsPage` table read; my-listings-page stays at (2), its inline sign-outs (F1).
- door-answers-allowlist.txt: `e2e/posting-routes-dials.spec.ts:167` → `:138`. The line moved when the wrappers above it went; the reason is unchanged.
- listing-seed-allowlist.txt: `e2e/ad-page-doors.spec.ts:452` / `:457` → `:325` / `:330`, for the same cause and with the same reasons.
- No new allowance line before Part D. Part D's eight lines are keyed `<file> (<sites>)`, and each names its sites by line. Their until is INC-1102 (§10 item 17).
- Guards:
  - pattern-sites.test.ts: CF-PATTERN-4 with its planted bypass. scripts/lib/pattern.test.ts: CF-PATTERN-1 → 3. wired.test.ts names both ("CF-PATTERN-4", "CF-PATTERN-3").
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

The rulings of this turn:
- STOP 1 (the census) → ruling 1, saved by scripted copy, sha256 8bee8caa…f2de3 equal to the carrier's.
- STOP 2 (the mirror) → ruling 2. Its sha256 (32dadaeb…f8ee) was checked on the attachment. Its item 3 puts the copy in "the one commit that follows the green", so `docs/governance/briefs/housekeeping-2-ruling-2.md` was copied by script into this report commit, after cc151c279's green run, with the sha256 equal.
- Stop 3 (the code-scanning comments) → ruling 3, saved by scripted copy in Part D's commit, sha256 4b808606…7db9 equal to the carrier's.

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
13. The CodeQL alert (go-laws.ts :411, "This does not escape backslash characters in the input") is fixed by one exported `escapeRegExp` in go-laws.ts. The module's two inline copies and check-go.ts's one now use it (K1 inside the module). The option name matched `[\w$]+`, so no backslash could reach it; the fix makes the escape complete regardless. Part D then moved that escape to scripts/lib/pattern.ts's `literal` and deleted it from go-laws.ts, as ruling 3 says.
14. Part D's helper holds two functions beyond ruling 3's three:
    - `flaggedPattern(flags)`, the same tag with flags. A tagged template takes no flags, and go-laws.ts's `CITATION` (g) and census-item words (i) need them.
    - `authored(source, flags)`, for CF-BRIEF-9's `ASSERT-…` lines. The pattern is the brief's author's own RegExp text, so escaping it would change the law. The census allows its import only in go-laws.ts.
    - Both pass through the one `new RegExp(`, which carries the ruling's reviewed-site words.
15. A `${part}` may also be a flagless RegExp; it enters as its source, in a non-capturing group. That is how go-laws.ts's `TREE_PREFIX` (now a RegExp literal) stays one shared prefix for `CITED_PATH` and `CITATION`. A string part is always escaped. A RegExp part can only come from a literal or from the module itself.
16. CF-BRIEF-7's id search (go-laws.ts :386 then) uses `exactWord`, whose boundary is ruling 3's `(?<![\w$-])…(?![\w$-])`. The old boundary was `(?<![\w-])…(?![\w-])`, so an id with a `$` beside it no longer counts as used. Every CF-BRIEF test passes. This is the one match change of Part D.
17. The allowlist's until is `INC-1102`, not ruling 3's "until: housekeeping turn 3". The kit's grammar (`readAllowlist`) takes a date or `INC-`/`DEC-<n>` only, and INC-1102's status is "OPEN — turn 3 closes it". Each line's reason says "housekeeping turn 3 moves it". The key is `<file> (<sites>)`, the count form browser-client-allowlist.txt uses, because a line number moves when a file is edited. Each reason names its lines.
18. Item 2's "`pattern` with `literal(name)`" is written as `pattern\`…${name}…\``: the tag escapes every string part itself, so calling `literal` too would escape the text twice.
19. The commit's subject is "housekeeping-2 part D: one pattern helper for script RegExps (INC-1102)" (71 characters). Ruling 3's title is 85 and rule 00 caps a subject at 72, so the ruling's title is the commit's first body line, word for word. CF-BRIEF-11 did not see it, because the ruling sets the title in parentheses, `one code commit (\`…\`)`, not after "Commit:" (§13).
20. Two open alerts on this pull request are hits ruling 3 did not name: #453 (`detect-redos` on go-laws.ts's `TEST_ID` literal) and #457 (`html-in-template-string` on CF-BRIEF-10's message text). Closing them changes a law's regex or its words, beyond ruling 3's numbered changes, so they are left as found and named (§13). Rule 00 makes such a hit a STOP-class item, as item 7 was.
21. Ruling 2's re-run is spent (run 43036501908, attempt 2). Ruling 3 item 5 moves its re-run clause to cc151c279's run.

Departures from the approved file list:
- e2e/global-setup.ts :74 — one comment line names the renamed helper. It is outside ruling 1's approved list, but it is a stale name in a comment, the class Q5 brings in. Its diff is that one line.
- Part D, three files beyond the ones ruling 3 names:
  - scripts/conformance/briefs.test.ts, already in this lane's scope: its escape test imported go-laws.ts's `escapeRegExp`, which ruling 3 deletes, so it now builds with `pattern`, with the same three claims.
  - scripts/conformance/wired.test.ts: the ruling's "wired", and rule 10 K3.
  - docs/features/security-scanning.md: rule 10's feature doc, under the standing allowance. The DEC-153 section names the helper and its census.
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
  - The browser-dependent proof of this turn (both projects, every lane, the repeat lane) was therefore not in on this commit. It came with cc151c279's run, below.
- 921ec9569 (the report push), read first under ruling 2 item 1: run 43041366407, completed 15:10:07Z, failure. All 19 lanes failed at "Install Chromium's system libraries", each with 26 "Temporary failure resolving" lines and "failed with exit 1 on try 1 of 1" (three lanes' logs read: jobs 130594114616, 130594114753, 130594114934), and the Verdict failed with them.
- Ruling 2 item 2, the one re-run: `gh run rerun 43036501908 --failed` at 16:36Z, more than twenty minutes after 15:10Z. Attempt 2 completed at 17:06:42Z, failure: 17 jobs passed, 1 skipped, 19 failed.
  - 18 lanes failed at the same step, each log with 26 "Temporary failure resolving" lines and "failed with exit 1 on try 1 of 1" (all 18 read, `rerun-lane-*.txt`).
  - Lane 13 passed its install and its tests. The Verdict failed with the 18.
  - Ruling 2 says stop and say so; I did, and pushed nothing. Ruling 3 then moved the re-run clause to Part D's run.
- cc151c279 (Part D): run 43069973329, completed 17:58:00Z, success: 36 jobs passed, 1 skipped (promote).
  - All 19 E2E lanes (16 numbered, smoke, email, repeat) passed their install and their tests, and "E2E (Playwright, ethio-staging)" passed. The mirror had recovered, so ruling 2's re-run clause, which ruling 3 moved to this run, was not needed.
  - `gh pr checks 34` on cc151c279: 41 pass, 1 skipping (promote), none failing or pending. They include CodeQL, the three Analyze jobs, "Semgrep (enforcing on ERROR)" and "Semgrep OSS".
  - Code scanning on `refs/pull/34/merge` after this run (merge commit 273394379):
    - Fixed: #442, #443, #445, #449, #450, #451, #454, #456, #458, #459, #460.
    - Open: #453 and #457 (§13).
    - No new alert (none numbered above #460).
  - This is the judged run for the lane (ruling 3 item 5). Its tree holds every code change of the turn, and the comment "Every check green on cc151c279" follows this report's push.

Flake ledger (origin/ci-evidence, read whole): no test has three or more lines in the last seven days. MON-9 and SO-12 have two each.

## 12. Limits

- Playwright does not start inside Cursor's sandbox (rule 20), so every local spec run was made outside it. CI's lanes on both projects and the repeat lane are the behaviour proof (DEC-364).
- Locally, the changed specs ran on desktop-1280 only, except the two phone-only specs on mobile-360. A spec's mobile-360 behaviour is CI's.
- The rename-only files (20) were proven by tsc, not run.
- Run 1 measured the language helper as first written (7f8002d40). The settle reload was added after run 2's AT-12 trace, and run 3 measured it on the same file.
- The checks' gitleaks and actionlint steps do not run on darwin/arm64, and dependency-audit cannot reach its service. CI judges those three.
- CI's browser lanes ran no test on d529ce281, a8c84e496 or 921ec9569 (the mirror, §11). The behaviour proof on both projects and the repeat lane is cc151c279's run alone.
- The scratch directory `/tmp/ethio-scratch/housekeeping-2/` is the operator's to remove. It holds:
  - the STEP 0 snapshot `step0/`;
  - the run logs (`run-*.txt`, `checks-*.txt`, `pr-checks-*.txt`, `lane*.txt`, `run2-lane-*.txt`, `build-final.txt`, `bundle-final.txt`, `check-go-*.txt`, `diff-base.txt`, `diff-turn.txt`);
  - AT-12's unpacked trace (`at12-trace/`);
  - the helper scripts named above (`classify.ts`, `per-file.ts`, `pick-race.ts`, `compare-pages.ts`, `trace-lang.ts`, `escape-red.ts`, `splice-report.ts`) and the earlier edit scripts (`mutate.ts`, `splice-header.ts`, `census-alone.ts`, `drop-fns.ts`, `wrap-calls.ts`, `replace-once.ts`, `bc-counts.ts`, `bc-counts2.ts`, `add-import.ts`, `drop-lines.ts`, `holder-calls.ts`, `drop-import.ts`);
  - their lists (`sias.txt`, `changed-e2e.txt`, `linekeyed.txt`, `touched.txt`, `classified.txt`, `files.txt`, `added-since.txt`, `p-*.txt`);
  - Part D's: `part-d-golaws.ts` (the edit script), `key-equivalence.ts`, `golaws-equivalence.ts`, `rows.part-d.ts` (the copy kept for the red-first run), `scripts-part-d.txt`, `tsc-part-d.txt`, `checks-3.txt`, and the CI material `rerun-watch.txt`, `rerun-lane-*.txt` and `partd-watch.txt`.
- The local test output under `test-results/` is git-ignored build output.

## 13. Findings

- MAJOR — the scratch role escapes the global reaper. `e2e/global-setup.ts` :832 reaps roles `LIKE 'e2e-%'` only. The ruled name `e2e_scratch_role_<letters>` (e2e/helpers/users.ts :467) is never swept, and neither are the older `e2e_viewonly_`, `e2e_catie_` and `e2e_mylistings_role_` names. TR-10 and "TR-scope AI" were named `e2e-…` before and are no longer swept, so the global reaper no longer catches their residue. Their own finally still reaps them. The fix is one reaper pattern (`e2e_%` beside `e2e-%`) in global-setup.ts, outside this turn's list.
- MAJOR — LGA-22's `makeRole` (e2e/legal-admin.spec.ts :1150) builds a scratch role by hand, the act `grantScratchRole` serves, and CF-HELPERS-1 does not see it (it is a `const` inside a test). It should be the next move, and a CF-HELPERS-1 extension (an inline `.from("roles").insert`) would hold it.
- The AT-12 class: 14 picks after a navigation with no account-read watch (§4). A signed-in pick inside the page's account-read window is replaced by the read. Each site needs reading (signed out is safe), and a shared form would settle it: `switchLanguage` waiting for the read on a signed-in page. The same window exists for a person who picks within the read's round trip; in a person's time that is hard to hit, and the rule (D239) is the product's.
- The unused names tsc `--noUnusedLocals` reports in touched specs, all from before this turn: `stripScratchRows` and `action` (admin-attributes-library), `cell`, `surface`, `isMobile`, `switchUser`, `c1Name` / `c2Name`. The project's lint does not flag them; they are left as found.
- `setDeviceAmharic`'s `catch {}` (private mode) moved from ui.ts unchanged, with its comment.
- The lanes' browser-library install has no retry. `.github/workflows/local-backend-proof.yml` :741 runs `bash scripts/ci/with-deadline.sh 1500 1 -- bunx playwright install-deps chromium`, one try, as flake-check.yml :89, guard-proof.yml :51 and nightly-e2e.yml :109 and :372 do. AGENTS.md's line is "installs run through `scripts/ci/with-deadline.sh` (one loud retry)". The mirror's name-lookup failure took every lane down on both of this pull request's runs (§11). Outside this turn's scope (.github/).
- MAJOR — two open alerts on this pull request are left as found (§10 item 20):
  - #453, `detect-redos` on go-laws.ts :379's `TEST_ID` literal `(?<![\w-])[A-Z]{2,6}(?:-[A-Z0-9]+)*-\d+(?![\w-])`. Each repeated group starts with `-` and its class cannot cross a `-`, so the backtracking is bounded, not exponential, but the rule reads the shape.
  - #457, `html-in-template-string` on go-laws.ts :497, CF-BRIEF-10's message, whose `<n>` and `<command>` are placeholders in a finding's text, never HTML.
  - Both are repository tooling over the supervisor's briefs. A ruling decides whether they close by a flat token check (as the manifest key did) and by reworded placeholders, or by DEC-153's reviewed-site form.
- Part D closes the alerts ruling 3 named: #442 (manifest.ts), #443 and #445 (rows.ts), and the three it counted on this pull request (#458 check-go.ts :50, #459 go-laws.ts :272, #460 :416). It also closes the other go-laws.ts sites it moves: #449 (:203), #450 (:204), #451 (:234), #454 (:386), #456 (:448). After cc151c279's scan all eleven read "fixed" on `refs/pull/34/merge` (§11). The three it counted are the second run's (a8c84e496) pull-request comments. The first run's (d529ce281) eleven comments were ten Semgrep findings, at the lines above and at #453 and #457, plus CodeQL's, which a8c84e496 fixed.
- The sites left for housekeeping turn 3 (ruling 3 item 3), each counted on scripts/conformance/pattern-sites-allowlist.txt with its line:
  - scripts/admin-tables.ts :213
  - scripts/e2e-select.ts :444 (a reviewed site; its marker :443 moves to pattern.ts with it)
  - scripts/list-action-labels.ts :112 (reviewed, INC-517; marker :111), :225, :241
  - scripts/brief/apply-blocks.ts :52, :94 (the dormant kit's applier)
  - scripts/destructive-red.ts :43 (constant strings)
  - scripts/conformance/vendor-seams-scan.ts :39
  - scripts/conformance/package-price.ts :59, :60
  - scripts/conformance/migration-reader.ts :49, :70 (:49 constant)
- The count in INC-1102's text: it says "the twelve remaining sites", but item 3's list (above) holds thirteen, and 25 − 12 (item 2) = 13. The record is copied word for word (§14); the supervisor's records turn reads this line.
- CF-BRIEF-11 (a dictated commit title of at most 72 characters) reads `Commit:` and `first line:` forms only. Ruling 3's title sat in parentheses after "one code commit" and was 85 characters (§10 item 19).
- The two CodeQL alerts ruling 3 item 4 places are not this turn's: #430 (src/features/legal/legal-text.tsx :17, `js/xss-through-dom`; INC-826, the first part of housekeeping turn 4) and #434, #435, #436 (src/providers/theme-provider.tsx :28, `js/bad-code-sanitization`; turn 4's `scriptLiteral()`). All four read "open" (`gh api …/code-scanning/alerts/<n>`); this turn touched neither file.
- None is a security hole. The CodeQL alert was a dev-tooling regex over the supervisor's brief text, never reachable from user input, and it is fixed in this pull request. Part D's sites read repository files only.

## 14. Records

DEC — DEC-364 as amended (housekeeping-2 ruling 1): a helper-consolidation turn runs each touched spec file whole locally on one project (desktop-1280, 0 retries, outside the sandbox) EXCEPT a file whose only change is a renamed import or call with identical arguments and no other line (the diff shape proves it — the executor lists those files under §5 with the words "rename-only; tsc is the local proof"); CI's lanes on both projects and the repeat lane are the behaviour proof for all; a spec red in CI that the local run did not run is read as this rule's cost. Frozen judge as before: adopted when every touched spec passes locally once and CI's lanes and repeat lane are green on the last code commit. Judge, filled: met. Every touched spec passed locally once (report §5, runs 1 → 4; AT-12 after its fix at its cause), and CI's 19 lanes and repeat lane are green on the last code commit, cc151c279 (run 43069973329; report §11). The three runs before it were lost to the runners' mirror before any test (INC-1101).

DEC — D324 (the supervisor, 2026-11-11 07:2x New York, housekeeping-2 ruling 1, under G17) — (a) law 10 counts digits only (a tolerance in words passes); law 5's "new" exception takes "built as / built here / (new)"; law 7 matches whole hyphenated ids; law 5 treats a glob as present when it matches; (b) a second guard for one concern is refused — CF-BC-1 keeps the page-client concern; CF-HELPERS covers local declarations, the hooks disable and the column write; (c) the language restores go to the pool's NULL baseline, not a read "prior" value.

INC — INC-1065: FIXED in housekeeping turn 2 — e2e/helpers/door-callers.ts (`asPerson`, `asAnonymous`, `asBearer`, `pageDoor`): the seven `asPerson`, seven `restBase`, six `answerOf`, `asAnonymous`/`asAnon` and admin-users' `bearerClient` copies, admin-monetisation's and seller-name.ts's `restBase`, legal-admin's raw grant and the thirteen page-side wrappers are gone; CF-HELPERS-1 refuses a copy.

INC — INC-1049: FIXED in housekeeping turn 2 — `grantRole` and `grantScratchRole` (e2e/helpers/users.ts): the ten same-signature copies, the three other-signature copies, the three `scratchHolder` bodies, `grantAdmin`, the inline super_admin grant and the nine inline scratch-role builds moved; CF-HELPERS-1 refuses a copy.

INC — INC-1073: FIXED in housekeeping turn 2 — LGA-21 writes texts only for its own scratch language and the non-scratch languages; its last check reads the card's translate control and requires that it offer neither this test's language nor any language without the `E2E ` name; the cross-worker write is gone.

INC — INC-1100: FIXED in housekeeping turn 2 — setAccountLanguage settles the session-start save, sets the language as the product does and proves the page took it; cause: the test's direct write raced D239's first-sign-in save (read, then measured at the first local run of i18n-coverage.spec.ts — paste the run). The run: report §5, run 1 (4 passed, 3 skipped, 0 failed, on 7f8002d40); after the settle reload (§10 item 11), run 3 (i18n-coverage 4 passed, 3 skipped).

INC — (new) A signed-in pick inside the page's own account-read window is replaced by the read (D239): AT-12 (e2e/admin-attributes-library.spec.ts) failed locally on housekeeping turn 2's run; the trace shows the read began 40 ms before the pick and answered after it. Fixed for AT-12 and `setAccountLanguage` in housekeeping turn 2 (the read awaited before the pick); 14 further sites after a navigation without the watch are listed in the report's §4, to be read.

INC — (new) The global reaper (e2e/global-setup.ts :832) sweeps roles `LIKE 'e2e-%'` only; the underscore scratch-role names (`e2e_scratch_role_`, `e2e_viewonly_`, `e2e_catie_`, `e2e_mylistings_role_`) are never swept, and TR-10 / TR-scope AI lost the sweep when they moved onto `grantScratchRole` in housekeeping turn 2.

INC — (new) CodeQL js/incomplete-sanitization on pull request #34: scripts/brief/go-laws.ts's option law escaped only `$` in a RegExp source; fixed in housekeeping turn 2 by one `escapeRegExp` in the module (a8c84e496).

INC — INC-1101 — the browser lanes install the browser's system libraries with one try, so a mirror outage on the runners takes down every lane before any test (2026-11-11; housekeeping-2 stop 2; runs 43033934604 and 43036501908). Defect: `.github/workflows/local-backend-proof.yml` :741 "Install Chromium's system libraries" runs its package install once; the runners' Ubuntu mirror did not resolve ("Temporary failure resolving 'azure.archive.ubuntu.com'") and all 19 lanes failed at that step with 0 results from 18 sources, twice in a row, while every other check was green. AGENTS.md's install law gives every install one loud retry, and the repository's install steps already run under `scripts/ci/with-deadline.sh <s> 2 --`; this step does not. Class: a CI step that depends on an outside service and has no retry (INC-318's family — a transport failure read as a red); the evidence file does not name "every source without results" as runner infrastructure, so the two-step read says red. Fix: housekeeping turn 3 — the step under with-deadline.sh's one retry; the E2E failure reporter's head line names the class. Until then: a run lost this way is re-run once by the executor on the supervisor's ruling (rule 40's second-red clause as amended at rules turn 4). Status: OPEN — turn 3.

INC — INC-1102 — a repository script builds a RegExp from text at twenty-five sites, each its own way (2026-11-11; code scanning: Semgrep #443, #445 on scripts/doors/rows.ts :137, :139 and #442 (ReDoS shape) on scripts/doors/manifest.ts :99 — F1-1; three findings on pull request #34's scripts/brief/check-go.ts :50 and go-laws.ts :272, :416 — housekeeping turn 2). Defect: `new RegExp(` with an interpolated part appears at 25 sites under scripts/ (tests excluded), some escaping their parts (`escapeRegExp` in go-laws.ts), some not (rows.ts interpolates a door name raw), one reviewed under DEC-153's marker (e2e-select.ts :444), one with a nested-quantifier shape over a manifest line (manifest.ts :99). None is reachable by a user — every input is a repository file — so no exploit; but a pattern shaped by its input is a defect class (an unescaped name that carries a metacharacter matches the wrong text or none, silently), and Semgrep flags the sites one by one. Class: a RegExp built from text without the one helper that escapes it; mechanism: NONE YET → scripts/lib/pattern.ts (`literal`, `pattern`, `exactWord`; the one reviewed `new RegExp(`), with CF-PATTERN-1 → 4. Fix: housekeeping turn 2 Part D (the helper; go-laws.ts, check-go.ts, rows.ts, manifest.ts) and turn 3 (the twelve remaining sites, allowlisted until then). Status: OPEN — turn 3 closes it.

register row — "a GO's claims are checked against the tree by a script" → scripts/brief/go-laws.ts (callers: scripts/conformance/briefs.test.ts, scripts/brief/check-go.ts) → CF-BRIEF-14 → exceptions: briefs-allowlist.txt.

register row — "a GO's census asks the repository's questions" → docs/governance/go-template.md → CF-BRIEF-15 → exceptions: records and rules turns by title.

register row — "a test does one thing one way through the shared e2e helper" → e2e/helpers (passwordGrant; door-callers.ts asPerson, asAnonymous, asBearer, pageDoor; inBrowserClient + doorAnswer; users.ts grantRole, grantScratchRole; ui.ts signInJobSuperAdmin; account-language.ts setDeviceAmharic, setAccountLanguage, seedAccountLanguage, restoreAccountLanguages) → CF-HELPERS-1 → 3 (D324 (b): the brief's CF-HELPERS-4 became CF-HELPERS-3; the page-client cast stays CF-BC-1's) → exceptions: e2e-helpers-allowlist.txt (empty).

register row — (row 98, as amended) "a regular expression a repository script builds from text goes through one helper (DEC-153; INC-1102)" → scripts/lib/pattern.ts (`literal`, `pattern`, `flaggedPattern`, `exactWord`, `authored` — the one `new RegExp(` and the scripts' one `nosemgrep: detect-non-literal-regexp`; callers: scripts/brief/go-laws.ts, scripts/brief/check-go.ts, scripts/doors/rows.ts) → CF-PATTERN-1 → 3 (scripts/lib/pattern.test.ts) and CF-PATTERN-4 (scripts/conformance/pattern-sites.test.ts; Semgrep's `detect-non-literal-regexp` in CI) → exceptions: scripts/conformance/pattern-sites-allowlist.txt (the thirteen turn-3 sites, until INC-1102).

changelog — 2026-11-11 housekeeping turn 2 (Opus 5.5): a GO's claims are checked against the tree by `scripts/brief/check-go.ts` over `scripts/brief/go-laws.ts` (CF-BRIEF-5 → 15; CF-BRIEF-14 the self-test), and `docs/governance/go-template.md` carries the GO's sections and its census checklist (CF-BRIEF-15); the e2e tree's hand-rolled helpers move onto shared ones — door-callers.ts (INC-1065), `grantRole` / `grantScratchRole` (INC-1049), `signInJobSuperAdmin` and the five hooks disables gone, account-language.ts whose `setAccountLanguage` proves the page took the language (INC-1100) — and LGA-21 writes only its own and the shipped languages (INC-1073); CF-HELPERS-1 → 3 refuse a copy; DEC-364 as amended, D324; Part D (ruling 3, INC-1102): every RegExp a script builds from text goes through `scripts/lib/pattern.ts` — go-laws.ts, check-go.ts and doors/rows.ts moved, the door manifest's key checked token by token, CF-PATTERN-1 → 4, the thirteen remaining sites allowlisted for turn 3; INC-1101 recorded (the lanes' one-try install).

roadmap — line 23 ("The housekeeping turn"), the parts this turn closed: `[x]` INC-1065 (the REST and page door callers, e2e/helpers/door-callers.ts), INC-1049 (`grantRole` / `grantScratchRole`), the `use…` helpers renamed (`signInJobSuperAdmin`, `setDeviceAmharic`), INC-1073 (LGA-21), INC-1100 (`setAccountLanguage`), the GO checker (CF-BRIEF-5 → 15) and the GO template — housekeeping turn 2, pull request #34; still open from this turn's findings: the reaper's underscore role names, LGA-22's `makeRole`, the 14 picks after a navigation (report §4).
