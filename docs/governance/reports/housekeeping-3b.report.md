# Housekeeping turn 3b — the scripts and the e2e tree — report

Base: dev 2b11a9d29 (the lane `cursor/housekeeping` at f3b215762) · Final commit: 188950f05 (the last code commit) · Brief: docs/governance/briefs/housekeeping-3b.md (sha256 b5ba11819df1948009899c52af371241e551805e2ef151eaacf4ac4790209f9f) · Ruling 1: docs/governance/briefs/housekeeping-3b-ruling-1.md (sha256 e205663b31a8ed8b1aee4e7edd910b45b816f905dbf30b1d76186460a9fca08b) · Ruling 2: docs/governance/briefs/housekeeping-3b-ruling-2.md (sha256 f403e72aad0f6e718e72c950b4b0af672fdd12418bb1e74bf3bb771233b03b63)
Review: READY · 0 BLOCKER · 1 MAJOR · 4 MINOR · on 188950f

CI: the judged run 43144538685 on 188950f05 — **SUCCESS** (ci-status.md at the ci-evidence branch: Commit `188950f055a0207a9a216b50aebe03cebafcefe1`, Conclusion SUCCESS, Completed 2026-11-12T03:18:16Z); every check on the pull request green but "Promote to main", which skips on a pull request.

## 1. Done / not done, by part and step

Everything the brief and the two rulings ask for is done. Commits on the lane after f3b215762:

| Commit | What |
| --- | --- |
| 64102f86c | STEP 0: the brief saved (sha256 equal), roadmap line 3 |
| 2fa93f6b1 | STEP 1: stop report 1, the census |
| a2a1f5467 | Part A: every script RegExp through `scripts/lib/pattern.ts`; ruling 1 saved |
| c463c9ec2 | Part B: one redaction rule set for every writer |
| 0ca1c09ab | Part C: the page says when its language is settled |
| 60dca91a5 | Part D: the reaper sweeps every scratch prefix |
| d1b87b77d | Part E: the GO checker, the template, LGA-22, `.d.mts` |
| 35234dedd | stop report 2 (`scripts/route-budgets.d.mts` outside SCOPE) |
| e91c135e6 | ruling 2: every imported `.mjs` declared whole; ruling 2 saved |
| f67ab0b03 | `startFailureExcerpt` declared with its real answer |
| 188950f05 | the excerpt test calls the declared function |

- **Part A.** The thirteen sites in the eight allowlisted scripts now build their patterns through
  `pattern` / `flaggedPattern` (`scripts/lib/pattern.ts`), and `pattern-sites-allowlist.txt` is
  empty. The GO checker's `TEST_ID` RegExp became `isTestId`, a flat token check (alert #453).
  Ruling 1 item 6 (F3) applies to the e2e harness: its two sites, `e2e/helpers/ui.ts` and
  `e2e/helpers/auth-form.ts`, build through `matcher` (e2e/helpers/ui.ts), and the catalogue string
  in auth-form is now escaped. CF-HELPERS-7 refuses a hand-built RegExp under `e2e/helpers/` and in
  `e2e/global-setup.ts` and `e2e/global-teardown.ts`.
- **Part B (DEC-368).**
  - `scripts/ci/redaction-rules.json` (new) is one ordered rule set that both `redact.py` and the
    reporter's `redact` read. ANSI comes first; Python compiles it under `re.ASCII`, and no shared
    pattern uses `\s`.
  - The reporter writes its own identifiers outside the rules.
  - CF-REDACT-3 proves byte-identical output from the two writers, and refuses a rule one engine
    reads differently. CF-REDACT-1's ANSI expectation is now "stripped". The self-test's head-block
    case proves the commit survives the rules.
- **Part C (DEC-367, INC-1103).**
  - The provider writes `data-lang-settled="1"` on `<html>` at every exit of its account rule, and
    removes it when a new identity's read starts. This is ruling 1 item 5's form: one home, no React
    state.
  - `waitForLanguageSettled(page)` (e2e/helpers/account-language.ts) is the one wait that
    `switchLanguage` and `reloadSettled` call. `watchAccountLanguage` and `consumeAccountLanguage`
    are gone, and so are the spec arms (AT-12 and the two one-line-slots specs).
  - CF-HELPERS-5 is the guard; LANG-D239-U9 → U12 cover the provider.
  - Three page ceilings were raised by `ceilingForLocal`, each line carrying its cause (§5's
    first-download table).
- **Part D (INC-1104).**
  - `e2e/helpers/scratch.ts` (new) holds every scratch prefix by kind, with LIKE escaping
    (`likePrefix`, `likeAnywhere`).
  - Every sweep in `e2e/global-setup.ts` and `e2e/helpers/locations.ts`, every helper builder, the
    teardown and `scripts/en-baseline-heal.ts` read it. The roles sweep reads both `e2e-` and
    `e2e_scratch_role_`.
  - CF-HELPERS-6 judges every sweep and builder, and runs a LIKE simulation over the reaper's
    patterns. The pool identity is named in the module as never swept.
- **Part E.**
  - (i) The GO checker:
    - Law 3's K1 clause is `newTestFindings` (CF-BRIEF-3, a tree law).
    - Law 11 reads a title after `commit (` / `Commit (`. A backtick before it keeps a quotation,
      such as the brief's own line 51, from counting.
    - Law 10's message and the template's line 25 read `COUNT: N := COMMAND`.
  - (ii) The template: the consumers, premises and first-download lines; STEP 0's check-go sentence;
    and ruling 2's consumers clause and one-push sentence.
  - (iii) LGA-22 is on `grantScratchRole`. CF-HELPERS-1 refuses a spec's inline
    `.from("roles").insert(`.
  - (iv) Five declaration files are whole: four new ones plus `route-budgets.d.mts` (ruling 2). No
    `@ts-expect-error` remains. CF-WIRED-3/4 assert every imported name is declared.
  - (v) `.gitignore` ignores `__pycache__/`.
  - (vi) `selfTestFailureLines` prints each failed check under its own record.
- **STEP 7** — all run on 188950f05; outputs in §5.
- **STEP 8** — one judged push of 188950f05 (§11).
- **STEP 9** — this report.

## 2. Files changed

`git diff --name-only 2b11a9d29`, read at the last code commit 188950f05. The base is behind the
lane's earlier turns (housekeeping-1, housekeeping-1b, the lockfile turn, housekeeping-2 and
housekeeping-3), and `git merge-base origin/dev HEAD` = 2b11a9d29 = `origin/dev`. This report,
`docs/governance/reports/housekeeping-3b.report.md`, joins the list with the report commit.

```text
.github/workflows/ci-status-report.yml
.github/workflows/ci.yml
.github/workflows/feed-bench.yml
.github/workflows/flake-check.yml
.github/workflows/guard-proof.yml
.github/workflows/local-backend-proof.yml
.github/workflows/nightly-e2e.yml
.gitignore
bun.lock
docs/features/admin-listings.md
docs/features/ci-guards.md
docs/features/ci-local-backend.md
docs/features/ci-status-reporter.md
docs/features/e2e-harness.md
docs/features/guard-proof.md
docs/features/nightly-e2e.md
docs/features/performance-strategy.md
docs/features/posting.md
docs/features/scheduled-jobs.md
docs/features/security-scanning.md
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
docs/governance/briefs/housekeeping-2-ruling-2.md
docs/governance/briefs/housekeeping-2-ruling-3.md
docs/governance/briefs/housekeeping-2.md
docs/governance/briefs/housekeeping-3-ruling-1.md
docs/governance/briefs/housekeeping-3-ruling-2.md
docs/governance/briefs/housekeeping-3.md
docs/governance/briefs/housekeeping-3b-ruling-1.md
docs/governance/briefs/housekeeping-3b-ruling-2.md
docs/governance/briefs/housekeeping-3b.md
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
docs/governance/reports/housekeeping-2.report.md
docs/governance/reports/housekeeping-2.stop-1.md
docs/governance/reports/housekeeping-2.stop-2.md
docs/governance/reports/housekeeping-3.report.md
docs/governance/reports/housekeeping-3.stop-1.md
docs/governance/reports/housekeeping-3.stop-2.md
docs/governance/reports/housekeeping-3b.stop-1.md
docs/governance/reports/housekeeping-3b.stop-2.md
docs/governance/reports/lockfile.report.md
docs/governance/reports/lockfile.stop-1.md
docs/tracking/branches/README.md
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
e2e/global-teardown.ts
e2e/helpers/account-language.ts
e2e/helpers/ad-page.ts
e2e/helpers/alias-check.ts
e2e/helpers/attribute-reap-plan.ts
e2e/helpers/auth-form.ts
e2e/helpers/categories.ts
e2e/helpers/category-menu.ts
e2e/helpers/countries.ts
e2e/helpers/door-callers.ts
e2e/helpers/exports.ts
e2e/helpers/locations.ts
e2e/helpers/posting.ts
e2e/helpers/reach-rows.ts
e2e/helpers/scratch.ts
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
scripts/admin-tables.ts
scripts/brief/apply-blocks.ts
scripts/brief/check-go.ts
scripts/brief/go-laws.ts
scripts/budget-band.d.mts
scripts/bundle-closure.d.mts
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/check-identity-tags.sh
scripts/check-outbound-calls.ts
scripts/check-promote-needs.sh
scripts/chunk-modules-plugin.d.mts
scripts/chunk-modules-plugin.mjs
scripts/ci/backend-config.py
scripts/ci/backend-config.test.ts
scripts/ci/checks-cache.ts
scripts/ci/cli-pin.ts
scripts/ci/docs-only.test.ts
scripts/ci/docs-only.ts
scripts/ci/install-browser-deps.sh
scripts/ci/install-browser-deps.test.ts
scripts/ci/lane-failure-evidence.test.ts
scripts/ci/laws-changed.ts
scripts/ci/nightly-hour.sh
scripts/ci/nightly-hour.test.ts
scripts/ci/redact.py
scripts/ci/redact.test.ts
scripts/ci/redaction-rules.json
scripts/ci/start-failure-excerpt.d.mts
scripts/ci/start-failure-excerpt.test.ts
scripts/ci/step-failures.d.mts
scripts/ci/step-failures.test.ts
scripts/ci/turn-checks-allowlist.txt
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/browser-client-allowlist.txt
scripts/conformance/choice-lists.test.ts
scripts/conformance/ci-deadlines.test.ts
scripts/conformance/ci-images.test.ts
scripts/conformance/db-proof.test.ts
scripts/conformance/door-answers-allowlist.txt
scripts/conformance/e2e-helpers-allowlist.txt
scripts/conformance/e2e-helpers.test.ts
scripts/conformance/listing-seed-allowlist.txt
scripts/conformance/lockfile-hosts-allowlist.txt
scripts/conformance/lockfile-hosts.test.ts
scripts/conformance/migration-reader.ts
scripts/conformance/overlays.test.ts
scripts/conformance/package-price.ts
scripts/conformance/pattern-sites-allowlist.txt
scripts/conformance/pattern-sites.test.ts
scripts/conformance/press.test.ts
scripts/conformance/vendor-seams-scan.ts
scripts/conformance/visible-area.test.ts
scripts/conformance/wired.test.ts
scripts/db-proof.sh
scripts/destructive-red.ts
scripts/doors/check-doors.test.ts
scripts/doors/manifest.ts
scripts/doors/rows.ts
scripts/e2e-failure-report.test.ts
scripts/e2e-failure-report.ts
scripts/e2e-leases.test.ts
scripts/e2e-leases.ts
scripts/e2e-select.ts
scripts/en-baseline-heal.ts
scripts/fixtures/ci-promote-needs-bad.yml
scripts/fixtures/docs-only/jobs-green-43103925609.json
scripts/fixtures/docs-only/jobs-red-43033934604.json
scripts/fixtures/docs-only/runs-8511aeed9.json
scripts/fixtures/install-deps-fetch-failure.txt
scripts/fixtures/install-deps-success.txt
scripts/fixtures/lane-step-failure.install.txt
scripts/fixtures/lane-step-failure.smoke.txt
scripts/lib/pattern.test.ts
scripts/lib/pattern.ts
scripts/list-action-labels.ts
scripts/publish-evidence.selftest.sh
scripts/publish-evidence.sh
scripts/publish-evidence.test.ts
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

This turn's own files, `git diff --name-only f3b215762` at 188950f05:

```text
.gitignore
docs/features/ci-guards.md
docs/features/ci-local-backend.md
docs/features/e2e-harness.md
docs/features/security-scanning.md
docs/governance/briefs/housekeeping-3b-ruling-1.md
docs/governance/briefs/housekeeping-3b-ruling-2.md
docs/governance/briefs/housekeeping-3b.md
docs/governance/go-template.md
docs/governance/reports/housekeeping-3b.stop-1.md
docs/governance/reports/housekeeping-3b.stop-2.md
e2e/admin-attributes-library.spec.ts
e2e/global-setup.ts
e2e/global-teardown.ts
e2e/helpers/account-language.ts
e2e/helpers/ad-page.ts
e2e/helpers/alias-check.ts
e2e/helpers/attribute-reap-plan.ts
e2e/helpers/auth-form.ts
e2e/helpers/categories.ts
e2e/helpers/category-menu.ts
e2e/helpers/countries.ts
e2e/helpers/exports.ts
e2e/helpers/locations.ts
e2e/helpers/posting.ts
e2e/helpers/reach-rows.ts
e2e/helpers/scratch.ts
e2e/helpers/translations.ts
e2e/helpers/ui.ts
e2e/helpers/users.ts
e2e/legal-admin.spec.ts
e2e/one-line-slots-admin.spec.ts
e2e/one-line-slots.spec.ts
roadmap.md
scripts/admin-tables.ts
scripts/brief/apply-blocks.ts
scripts/brief/go-laws.ts
scripts/budget-band.d.mts
scripts/bundle-closure.d.mts
scripts/ci/redact.py
scripts/ci/redact.test.ts
scripts/ci/redaction-rules.json
scripts/ci/start-failure-excerpt.d.mts
scripts/ci/start-failure-excerpt.test.ts
scripts/ci/step-failures.d.mts
scripts/ci/step-failures.test.ts
scripts/conformance/briefs.test.ts
scripts/conformance/e2e-helpers.test.ts
scripts/conformance/migration-reader.ts
scripts/conformance/package-price.ts
scripts/conformance/pattern-sites-allowlist.txt
scripts/conformance/pattern-sites.test.ts
scripts/conformance/vendor-seams-scan.ts
scripts/conformance/wired.test.ts
scripts/destructive-red.ts
scripts/e2e-failure-report.test.ts
scripts/e2e-failure-report.ts
scripts/e2e-select.ts
scripts/en-baseline-heal.ts
scripts/list-action-labels.ts
scripts/route-budgets.d.mts
scripts/route-budgets.mjs
src/i18n/provider-d239.test.tsx
src/i18n/provider.tsx
```

New files, by `git ls-files`: `e2e/helpers/scratch.ts`, `scripts/ci/redaction-rules.json`,
`scripts/budget-band.d.mts`, `scripts/bundle-closure.d.mts`, `scripts/ci/step-failures.d.mts`,
`scripts/ci/start-failure-excerpt.d.mts`, the brief, both rulings and both stop reports. Deleted:
none (`git diff --diff-filter=D --name-only f3b215762` prints nothing).

## 3. Behaviour contract — answer tables before → after

| Touched | At f3b215762 | At 188950f05 |
| --- | --- | --- |
| `src/i18n/provider.tsx`, the account rule | applies, saves or keeps the language; nothing on `<html>` but `lang` | the same answers, words and log lines; `data-lang-settled="1"` is written at each exit (a save's exit after the save answers) and removed when a new identity's read starts; a read a newer identity overtook writes nothing |
| `switchLanguage` / `reloadSettled` (e2e/helpers) | a pick could race the account read; turn 2's watch at two sites | each waits for the attribute first; failure text "the page never said its language was settled (DEC-367)" |
| the reaper (`e2e/global-setup.ts`) | its patterns, but `e2e_scratch_role_` roles never matched `e2e-%` | the same tables and cut-offs; patterns read from the list with `_` / `%` escaped; roles also swept by `e2e_scratch_role_` (INC-1104) |
| `redact.py`, the reporter's `redact` | two rule sets (four rules, two words, one length apart) | one ordered set, the same bytes from both; the reporter's identifiers written outside the rules |
| the GO checker (`check-go.ts`, `go-laws.ts`) | laws 3, 10, 11 as at the base | law 3 gains the K1 finding; law 11 reads the paren form; law 10's message words |
| the reporter's self-test | one label for every census-block failure | one line per record; the passing output is unchanged |
| LGA-22 | made its roles by hand | the same two grants through `grantScratchRole`; the same assertions |

The provider is the turn's one product change. Every other row is the harness or CI tooling.

## 4. Censuses

Stop report 1 (2fa93f6b1) is the census. Re-run at 188950f05:

- The brief's COUNT lines:
  - `rg -n "[\"'\x60]e2e[-_]" e2e --glob '!*.spec.ts' | wc -l`: 67 at the base, 46 now. Every
    remaining hit is a comment, the list itself in `e2e/helpers/scratch.ts`, or a pool name
    (`users.ts:161`, `:302`; `global-setup.ts:345`), which is never swept.
  - The spec tree's own literals, `--glob '*.spec.ts'`: 357, unchanged (LEFT, roadmap).
  - `rg -l "page\.goto\(" e2e --glob '*.spec.ts' | wc -l` = 36; `gotoReady` = 98 (unchanged; LEFT).
- `rg -n "new RegExp\(" e2e | wc -l` = 105 (107 at the base, the two helper sites moved). Under
  `e2e/helpers` and the global setup/teardown: 0.
- `.mjs` imports from a scripts/ TypeScript file: six importers, five modules. Every imported name
  is declared (CF-WIRED-3).

## 5. Tests

**Ids added or changed:**
- CF-REDACT-3 (new).
- CF-BRIEF-7 (the token test id, new case).
- CF-BRIEF-3's K1 clause and CF-BRIEF-11's paren form (new case).
- CF-HELPERS-5, CF-HELPERS-6, CF-HELPERS-7 (new laws in e2e-helpers.test.ts). The tree test now
  reads "CF-HELPERS-1 → CF-HELPERS-3, CF-HELPERS-5 → CF-HELPERS-7 …", and the planted test is
  renamed to match.
- CF-WIRED-3, CF-WIRED-4 (new).
- EFR-2 (new).
- LANG-D239-U9 → U12 (new, `src/i18n/provider-d239.test.tsx`).

No spec test id changed: AT-12 and the two one-line-slots specs lost their arms, and LGA-22 its
hand-built role.

**Red first:**
- CF-WIRED-3 on 35234dedd's tree printed exactly the four findings stop report 2 quotes.
- CF-HELPERS-1's role insert on the base `legal-admin.spec.ts` printed "e2e/legal-admin.spec.ts:1153
  inserts a role inline".
- CF-HELPERS-6 found 35 findings on the base harness (`global-setup.ts` and `users.ts` written from
  `git show f3b215762:`).
- LANG-D239-U9 → U12 all failed on the base provider. U12 failed again with only the
  overtaken-read guard removed.
- Parts A and B: no separate red-first run beyond each guard's planted case (CF-PATTERN-4's
  planted site; CF-REDACT-3's planted engine-specific rule; CF-HELPERS-7's planted RegExp).

**The checks:**
- `bun run typecheck` at 188950f05: exit 0.
- `bun run lint`: exit 0.
- `bunx vitest run scripts --maxWorkers=2` (at e91c135e6, outside the sandbox): 110 files, 563
  passed, 1 skipped. Inside the sandbox two files failed on a temporary bare repository and the
  hooks test; that is the sandbox, and the run outside it is the one counted.
- `bun run checks` at 188950f05:
  - `checks (fast): 25 PASS · 0 FAIL · 412s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`
  - `checks: 34 PASS · 0 FAIL · 25 NOT RUN · 469s`
  - The budget step's last line: `PASS     bundle-budget › the NEAR band (R4)  (0s) — 0 NEAR (DEC-296's one band; NOTE lines above)`
- The 25 NOT RUN steps, each for the reason the runner prints:
  - scope's decision: GitHub's API.
  - actionlint and gitleaks: linux/x64 binaries, and this machine is darwin/arm64.
  - The checks runner's own typecheck: it reads Lovable's log. I ran `bun run typecheck` myself,
    above.
  - The installs: dependencies already installed.
  - dependency-audit: the advisory service is unreachable.
  - The e2e-preflight steps: staging credentials.
  - The six e2e merge and verdict steps: GitHub artifacts.
  - The four promote steps: CI only.
  - The SARIF upload and its warning: GitHub only.

**`bun scripts/brief/check-go.ts docs/governance/briefs/housekeeping-3b.md`** (STEP 7), on the final
tree:

```text
CF-BRIEF-6 docs/governance/briefs/housekeeping-3b.md:13 scripts/brief/go-laws.ts :40 holds "const MADE_HERE = /\bnew\b|\bcreated here\b|\bbuilt as\b|\bbuilt here\b/i;", not TEST_ID
CF-BRIEF-6 docs/governance/briefs/housekeeping-3b.md:23 e2e/admin-attributes-library.spec.ts :707 holds "await switchLanguage(page, "am");", not arm / watchAccountLanguage
CF-BRIEF-6 docs/governance/briefs/housekeeping-3b.md:32 e2e/global-setup.ts :693 holds "*/", not reaper / like
CF-BRIEF-6 docs/governance/briefs/housekeeping-3b.md:53 e2e/legal-admin.spec.ts :1150 holds "["admin_panel", "access"],", not makeRole / from
CF-BRIEF-6 docs/governance/briefs/housekeeping-3b.md:54 scripts/ci/step-failures.test.ts :6 holds "import { failedStepLines, TAIL_LINES } from "./step-failures.mjs";", not ts-expect-error
CF-BRIEF-6 docs/governance/briefs/housekeeping-3b.md:54 scripts/ci/start-failure-excerpt.test.ts :6 holds "import { ECHO_LINES, startFailureExcerpt, TAIL_LINES } from "./start-failure-excerpt.mjs";", not ts-expect-error
CF-BRIEF-6 docs/governance/briefs/housekeeping-3b.md:56 scripts/e2e-failure-report.ts :2914 holds ") &&", not SELF-TEST
CF-BRIEF-10 docs/governance/briefs/housekeeping-3b.md:33 COUNT 67 := rg -n "[\"'\x60]e2e[-_]" e2e --glob '!*.spec.ts' | wc -l — prints 46
[check-go] 8 finding(s)
```

As ruling 2 reads it, this is expected: the tree laws read the tree after the build, while the brief
cites the base (the seven CF-BRIEF-6 lines are the sites this turn changed). The count 67 → 46 is
Part D's move onto the list. The fix, `check-go --at <commit>`, is 3c's second item (§13).

**Browser, locally** (`bun run e2e:local -- <files> --project=<p> --retries=0`, ethio-staging, the
maintenance pass not run: it belongs to shard 1):

| Run | Specs | Project | Result | `[ssr-error]` / `[client-error]` |
| --- | --- | --- | --- | --- |
| C1 | admin-attributes-library (AT-12), one-line-slots-admin, one-line-slots | desktop-1280 | 21 passed, 10 skipped (the one-line-slots tests are mobile-only) | 0 / 0 |
| C2 | one-line-slots-admin, one-line-slots | mobile-360 | 10 passed | 0 / 0 |
| C3 | i18n-sign-in-language, page-head, i18n-coverage | desktop-1280 | 12 passed, 3 skipped (mobile-only) | 0 / 0 |
| C4 | i18n-coverage | mobile-360 | 7 passed | 0 / 0 |
| D1 | admin-translations-governance, my-listings-levels, post-wizard-category (Part D's helpers) | desktop-1280 | 45 passed, 3 skipped (mobile-only) | 0 / 0 |
| E1 | legal-admin (LGA-22 4.8 s) | desktop-1280 | 22 passed | 0 / 0 |

J-audit (e2e/** changed):
- No real row is used and no `waitForTimeout`, `.first()` or `test.only` is added: a grep of the
  turn's added lines found none.
- Scratch rows only, under the list's prefixes.
- A changed helper's other importers are judged by CI's repeat lane (DEC-283; ruling 1 item 4 (b)).

**First download** (Part C, local lock-exact builds, base f3b215762 against the Part C tree):
- The entry chunk `index-*.js` went from 129.0 to 129.1 KiB: +71 bytes gzipped, the provider's
  `settle` / `unsettle` and their calls.
- `shared-shell` and the stylesheet are unchanged.
- 29 of the 50 pages rose by 0.1 KiB, the same 71 bytes.
- Three pages entered the NEAR band, and their ceilings were raised by `ceilingForLocal`, each line
  naming its cause:

| Page | Base | Part C | Ceiling |
| --- | --- | --- | --- |
| `/account_/legal` | 208.6 | 208.6 | 209 → 210 |
| `/admin/audit` | 292.6 | 292.6 | 293 → 294 |
| `/admin/images` | 207.5 | 207.6 | 208 → 209 |

The final tree's budget step reports 0 NEAR. No src/ file changed after Part C.

## 6. K2 — siblings that bypass the mechanism

Greps run: the four COUNT lines in §4, `rg -n "new RegExp\(" e2e`, `rg -n "@ts-expect-error" src
scripts e2e`, and the reaper's `like` calls against the list's kinds.

- A RegExp built from text in specs: 105 sites (`rg -n "new RegExp\(" e2e`). LEFT by ruling 1
  item 6, with the roadmap line "every RegExp a spec builds from text through the one helper".
- Scratch names in specs: 357 literals. LEFT, with their roadmap line. Among them is
  `e2e/admin-monetisation.spec.ts:54`, the spec's own `SCRATCH_PREFIX = "e2e_mon_"` (stop 1's F6).
- Navigation: 36 spec files call `page.goto(` (roadmap line, LEFT).
- `@ts-expect-error`: `src/server/ai/gateway.test.ts:407` (F2), which goes to turn 4 by ruling 1
  item 8. None remains under scripts/.
- Scratch reach rows: `e2e/helpers/reach-rows.ts` names them `e2e_lvl_r…` (table
  `listing_packages`), and no sweep reaps them (§13). CF-HELPERS-6 names the gap in `UNSWEPT_KINDS`.

## 7. Allowlists and guards

- Allowlists, at f3b215762 → 188950f05:
  - `pattern-sites-allowlist.txt`: 8 lines (13 sites) → 0.
  - `e2e-helpers-allowlist.txt`: 0 → 0.
  - `briefs-allowlist.txt`: 0 → 0.
  - `non-null-allowlist.txt`: 143 → 143.
  - No new allowlist line.
- New guards and their callers:
  - CF-HELPERS-5, -6 and -7, and CF-HELPERS-1's role-insert form, all in e2e-helpers.test.ts.
    wired.test.ts names CF-HELPERS-3 and -5 through -7.
  - CF-REDACT-3 (named in wired.test.ts).
  - CF-WIRED-3/4, which run inside wired.test.ts itself.
  - CF-BRIEF-3's K1 clause, inside the existing CF-BRIEF-14 self-test with planted fixtures.
  - EFR-2.
- Each new guard is proven on a planted bypass in its planted test.

## 8. Strings

None (FLAG no-new-string). No `t(` key was touched, so the i18n maps were not regenerated; checks'
`i18n-usage-map › Assert no drift` passed.

## 9. Migrations

None (FLAG no-migration).

## 10. Departures

- **Two STOPs and two rulings.**
  - Stop 1, the census, answered by ruling 1 (`docs/governance/briefs/housekeeping-3b-ruling-1.md`).
  - Stop 2, `scripts/route-budgets.d.mts` outside SCOPE, answered by ruling 2
    (`docs/governance/briefs/housekeeping-3b-ruling-2.md`).
  - Each ruling was saved by scripted copy, with its sha256 equal to the operator's line.
- **Stop 2's push** (35234dedd) carried parts A → E before STEP 7, as rule 00 requires of a stop.
  Ruling 2 accepted it: "this turn therefore has two runs, the early one informational, and the
  push after this commit is the judged run". That early run, 43141608706, is green.
- **Two commits after ruling 2's one.** e91c135e6 is the one ruling 2 named. f67ab0b03 and
  188950f05 followed:
  - The F1 re-measure on the final tree (`tsc` over scripts/) found that
    `start-failure-excerpt.d.mts` typed the excerpt as `string[]`. It answers
    `{ section, failure, server }`, and the capture folder may be `null`.
  - The test's local cast had hidden that mismatch, so the self-review removed the cast.
  - Both files are in SCOPE (ruling 1 Q4 (a); `scripts/ci/start-failure-excerpt.test.ts`).
  - `bun run checks` ran again whole on 188950f05.
- **Part D touched helpers beyond SCOPE's parenthetical.** SCOPE names "e2e/helpers/ (ui.ts,
  account-language.ts, users.ts or a new scratch module …)". Part D also touched `ad-page.ts`,
  `alias-check.ts`, `attribute-reap-plan.ts`, `categories.ts`, `category-menu.ts`, `countries.ts`,
  `exports.ts`, `locations.ts`, `posting.ts`, `reach-rows.ts` and `translations.ts`. Each makes or
  matches a scratch name. The basis is ruling 1 item 2: "every builder reads its prefix", and
  "CF-HELPERS-6 covers every sweep and every helper builder"; stop 1's maker list names each.
- **The one-line-slots specs ran on mobile-360**, beside the desktop-1280 run that ruling 1
  item 4 (b) names. Their tests are mobile-only and skip on desktop-1280 (run C1), so mobile-360 is
  where they run (C2). i18n-coverage ran on both projects.
- **`docs/features/ci-local-backend.md`** carries Part B's page change: the page that describes the
  redaction, under rule 10's allowance and the standing `docs/features/**`.
- **SCOPE files left unchanged:** `src/i18n/provider.test.tsx` (ruling 1 item 5 placed the cases in
  provider-d239.test.tsx), `scripts/brief/check-go.ts`, and the eight scripts' own test files (their
  tests pass unchanged at the moved sites).
- **DECIDE-AND-NAME:**
  - The scratch-prefix module: `e2e/helpers/scratch.ts`. `scripts/en-baseline-heal.ts` imports it
    (the build graph allows it).
  - The attribute's set points: `settle()` / `unsettle()` in the provider, every exit.
  - `watchAccountLanguage`: removed, with `consumeAccountLanguage` (ruling 1 item 5).
  - The rules JSON: `{ about, rules }`, nine rules with the fields `name`, `pattern`,
    `replacement`, `env`, `keep_env`, and a module-local compile on each side.
  - The token check: `isTestId`.
  - The placeholder wording: `COUNT: N := COMMAND`.
  - The `.d.mts` export lists: each module's exports as its JSDoc and body give them.
- **The self-review** (rule 80) covered `git diff 2b11a9d29..188950f05`, this turn's part
  f3b215762..188950f05 read file by file.
  - BLOCKER: none. A grep of the added lines for `as unknown as`, `any`, a non-null `!`,
    `@ts-expect-error`, `@ts-ignore`, `waitForTimeout`, `.first()`, `test.only`, sentinel defaults,
    `eslint-disable` and `nosemgrep` found none; no deletion; no secret-shaped text.
  - MAJOR: the reaper's new patterns are proven against staging's real leftovers only by
    CF-HELPERS-6's LIKE simulation, because the maintenance pass was not run locally (§12).
  - MINOR, in four points:
    - The one-line-slots runs moved to mobile-360.
    - Part D's helpers go beyond the SCOPE parenthetical.
    - CF-WIRED-3 judges names, not types.
    - The brief's anchors are stale for check-go.
  - Each is listed above or in §12/§13. Found and fixed during the review: the excerpt test's cast
    (188950f05).
- **Scratch files** under `/tmp/ethio-scratch/housekeeping-3b/` are the operator's to remove: the
  e2e and checks logs, the budget logs, the base and new spec copies, the F1 base and head trees with
  their tsconfigs, and the held-aside `wired.test.part-e.ts`. Also `/tmp/hk3b-chat.txt` (F8),
  outside that folder.

## 11. CI

**The base.** The lane head this turn began from is f3b215762, read at the ci-evidence branch before
STEP 0's commit (stop report 1):

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `f3b215762a80531405ed4c8ebfac1e4b62a15a1d` (short `f3b2157`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T00:47:21Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43129068660
```

No red of an earlier turn was waiting to be fixed.

**The runs of this pull request in this turn:**

| Run | Head | What | Conclusion |
| --- | --- | --- | --- |
| 43133843360 | 2fa93f6b1 | stop report 1 (docs) | success |
| 43141608706 | 35234dedd | stop report 2's push, parts A → E (informational, ruling 2) | success |
| 43144538685 | 188950f05 | the judged run, the last code commit | success |

**The judged run, read at ci-evidence (`git fetch origin ci-evidence`) on two steps:**

1. `docs/tracking/ci-status.md` reads:

   ```text
   # CI Status (auto-generated — do not edit by hand)

   - Commit: `188950f055a0207a9a216b50aebe03cebafcefe1` (short `188950f`)
   - Conclusion: **SUCCESS**
   - Completed (UTC): 2026-11-12T03:18:16Z
   - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43144538685
   ```

2. The lane's branch folder `docs/tracking/branches/cursor/housekeeping/` (DEC-321) holds
   `e2e-last-failure.md` ("last E2E run 43144538685 passed"), `local-backend-proof.md` and
   `local-backend-last-failure.md`. Each names run 43144538685 and commit 4937f82d9. `gh api …/commits/4937f82d9`
   gives parents 2b11a9d29 and 188950f05 ("Merge 188950f05… into 2b11a9d29…", the pull request's merge
   ref), and `gh run view 43144538685` gives `headSha` 188950f05 and `event` pull_request. So the
   evidence is this commit's.

**What the evidence says:**
- Lanes ran ("not docs-only: scripts/ci/start-failure-excerpt.d.mts is not a record").
- Nineteen lanes, migrations applied 437/437 on each. TOTAL: 2804 passed, 0 failed, 0 flaky, 404
  skipped, 3208 in all.
- Errors outside any test: none (19 of 19 results files read, 19 of 19 logs read).
- Server-error census: 62 lines, 27 messages, 0 off the allowlist.
- Flaky: 0.

**The repeat lane** (DEC-283): "1393 tests selected, 38 repeated; budget 720 s at 4.7 s a test;
directly changed: 5 of 53 repeated; importers of a changed helper: 0 of 60". 108 specs are listed
"Not repeated", `legal-admin.spec.ts`, the two one-line-slots specs and `i18n-coverage.spec.ts`
among them (§12, §13).

No red in any run, so no rule-40 class and no re-run.

## 12. Limits

- The reaper's maintenance pass was not run locally. It runs only on shard 1 (or with
  `E2E_MAINTENANCE=1`), and against ethio-staging it would delete rows beyond this run's own.
  - The new patterns are proven by CF-HELPERS-6's LIKE simulation over every prefix.
  - CI's lane 1 runs the pass on its temporary backend, but a fresh backend has no leftovers to
    match.
  - So the patterns against staging's real leftovers are proven only by the simulation (the review's
    MAJOR).
- CF-WIRED-3 judges declared NAMES, not their types. The types are judged only by `tsc`, which
  scripts/ joins in 3c. The type mismatch fixed in f67ab0b03 was found by the F1 measurement, not by
  a gate.
- The repeat lane did not repeat this turn's helper importers. Ruling 1 item 4 (b) left "the other
  nineteen" specs to "the lanes and the repeat lane". The judged run's repeat lane repeated 5 of the
  53 directly changed specs and 0 of the 60 importers of a changed helper, within its 720 s budget.
  So each importer passed once in the lanes (0 failed, 0 flaky across 3208 tests), but none was
  repeated in this turn.
- gitleaks and actionlint did not run locally (darwin/arm64). CI judges both.
- E2E values: the local runs read them from the environment, checked by name only.

## 13. Findings

- **F1 (ruling 1 item 7; ruling 2): scripts/ outside the typecheck.**
  - Each measurement uses a temporary tsconfig kept in scratch, never in the repository:
    `{"extends": "./tsconfig.json", "include": ["scripts/**/*.ts"]}`.
  - At f3b215762, the base copy is `/tmp/ethio-scratch/housekeeping-3b/f1-base/`: each of the 49
    changed paths written back from `git show f3b215762:<path>` and checked by `cmp`.
    ```text
    $ cd /tmp/ethio-scratch/housekeeping-3b/f1-base && bunx tsc --noEmit --pretty -p tsconfig.f1.json
    Found 49 errors in 8 files.
    ```
    By file: `.claude/hooks/lib.ts` 3, `scripts/bundle-closure.test.ts` 5, `scripts/ci/turn-checks.ts`
    1, `scripts/conformance/budget-band.test.ts` 2, `scripts/conformance/card-tiers.test.ts` 3,
    `scripts/conformance/lint-rules.test.ts` 2, `scripts/conformance/on-demand-failure.test.ts` 1,
    `scripts/e2e-failure-report.ts` 32 (the `Bun` global without types).
  - At 188950f05, the copy `/tmp/ethio-scratch/housekeeping-3b/f1-head/`, whose `scripts/` matches
    the repository by `diff -rq`:
    ```text
    $ cd /tmp/ethio-scratch/housekeeping-3b/f1-head && bunx tsc --noEmit --pretty -p tsconfig.f1.json
    Found 38 errors in 4 files.
    ```
    By file: `.claude/hooks/lib.ts` 3, `scripts/conformance/lint-rules.test.ts` 2 (no declaration for
    `eslint.config.js`), `scripts/conformance/on-demand-failure.test.ts` 1, and
    `scripts/e2e-failure-report.ts` 32.
  - The eleven `.mjs` errors of the base are gone, by this turn's declarations.
  - 3c's first item.
- **`check-go --at <commit>` (ruling 2).** At STEP 7 the tree laws read the built tree, while the
  brief cites its base: hence §5's eight findings. 3c's second item.
- **Scratch reach rows are never swept.**
  - `e2e/helpers/reach-rows.ts` makes `listing_packages` rows named `${SCRATCH_PREFIXES.underscore}lvl_r…`.
  - No reaper step deletes them, so a run that dies before its own cleanup leaves them on staging.
  - The spec's `e2e_mon_` packages (`e2e/admin-monetisation.spec.ts:54`) are likely the same.
  - Not fixed here: a sweep is beyond ruling 1's items, and catalogue rows are referenced by
    `market_settings.included_reach`, so a sweep needs its own design.
  - Named in CF-HELPERS-6's `UNSWEPT_KINDS` and in `docs/features/e2e-harness.md`.
- **The repeat lane's budget cannot hold a harness-wide change.**
  - Run 43144538685's repeat lane: 1393 tests selected, 38 repeated (budget 720 s at 4.7 s a test);
    directly changed 5 of 53, importers 0 of 60.
  - A change to a shared e2e helper selects nearly every spec, and the lane repeats a few. DEC-364's
    amendment ("the importers by the repeat lane") therefore holds only while a helper change is
    small.
  - The selection and cap are `scripts/ci/repeat-cap.ts` and `.github/workflows/local-backend-proof.yml`
    :284. A records-turn or CI-turn decision; not this turn's to change.
- **F2** (`src/server/ai/gateway.test.ts:407`, `@ts-expect-error`) goes to turn 4 (ruling 1
  item 8). F7 is noted (the dev alerts close at the merge).
- **Prevention (ruling 2, G70).** A file's existence was taken for its completeness. The guard is
  CF-WIRED-3, plus the template's consumers clause: "a declaration, allowlist or manifest file is a
  consumer of the thing it describes: the census reads its content against that thing, never only
  its existence".

## 14. Records

Copied by script (`/tmp/ethio-scratch/housekeeping-3b/assemble.py`) from the brief's RECORDS, ruling 1 item 9 (with items 4 (b), 6 and 8, which it names) and ruling 2's Records paragraph. The bracketed measurements filled here: `[the provider's test]` → `src/i18n/provider-d239.test.tsx` (LANG-D239-U9 → U12); `[the module]` → `e2e/helpers/scratch.ts`; `[n] bytes` → 71 bytes. DEC-367's "[the two runs: <id>, <id>]" and DEC-368's "[read at the records turn]" are the records turn's. Ruling 2's 3c line replaces ruling 1 item 9's "[n] errors at f3b215762" line.

DEC — DEC-367 (the supervisor, 2026-11-11 2x:xx New York, under G17 and G22 — a harness-visible readiness contract, the class of `data-app-ready` (INC-085f); INC-1103) — the i18n provider sets `data-lang-settled="1"` on `<html>` from one home (`src/i18n/provider.tsx`'s account rule) when the session-start language rule has run to its end — every branch — or when the page is signed out; the one pick helper (`e2e/helpers/ui.ts` `switchLanguage`) waits for it before it opens the switcher, so no pick at any site can be replaced by the page's account read, and no spec arms a watch of its own (CF-HELPERS-5). Why: turn 2 fixed two sites and listed fourteen more; a wait inside the one helper, keyed to the page's own word, covers every site now and every site to come. Frozen judge: adopted when the lanes have run green twice after the landing with no failure of a language pick and no new flake-ledger line naming `switchLanguage` [the two runs: <id>, <id>]; reverted (the attribute kept, the wait removed) if three picks time out on the attribute in seven days.

DEC — DEC-368 (the supervisor, 2026-11-11 2x:xx New York, under G17 and G22 — the E2E failure reporter is a closed surface; turn 3's F2) — the lanes' Python redaction and the E2E reporter's TypeScript redaction read ONE ordered rule set, `scripts/ci/redaction-rules.json` (ANSI first; account ids, the secret environment values, JWTs, `sb_` keys, e-mail addresses, the storage-key rows, 32+ hex strings but the run's own commit; redact.py's replacement words), Python under `re.ASCII` with no `\s` in a shared pattern; the reporter writes its own identifiers (the run, the commit, the attempt, the lane names, the ledger's commit field) outside the rules, and its self-test asserts the head block keeps its commit after the rules run. Why: two rule sets differed in four rules, two words and one length, so a secret shape masked in one evidence file could show in the other. Frozen judge: adopted when CF-REDACT-3 proves byte-identical output on the probe set and the next five runs' evidence files on ci-evidence show no unmasked account id, e-mail or key [read at the records turn]; reverted if an evidence file loses an identifier a reader needs (its commit, its run) — the self-test's head-block case is the guard.

DEC — DEC-364 — amendment line (ruling 1, items 4 (b) and 9): "a helper change's specs: the edited specs and the behaviour specs locally; the importers by the repeat lane"

INC — INC-1102 — status line: FIXED (housekeeping turn 3b) — the thirteen allowlisted sites moved; the allowlist is empty; `TEST_ID` replaced by the flat token check (alert #453).

INC — INC-1103 — status line: FIXED (housekeeping turn 3b) — DEC-367; the fourteen sites of turn 2's §4 covered without a site edit; the AT-12 arm retired onto the helper.

INC — INC-1104 — status line: FIXED (housekeeping turn 3b) — one scratch-prefix list read by the reaper and every helper that names a scratch row; CF-HELPERS-6; the specs' own literals LEFT (roadmap line).

INC — INC-1049 — amendment: the one insert that remained (LGA-22's `makeRole`, legal-admin :1150) moved onto `grantScratchRole` in housekeeping turn 3b; CF-HELPERS-1 refuses an inline `.from("roles").insert(` in a spec.

register row — register rows (unnumbered): "a RegExp built from text" (turn 2's row) → exceptions: none · "the page says when its language is settled (DEC-367)" → src/i18n/provider.tsx `data-lang-settled` + e2e/helpers/ui.ts `switchLanguage` → CF-HELPERS-5, `src/i18n/provider-d239.test.tsx` (LANG-D239-U9 → U12) → exceptions: none · "scratch rows are swept by their prefix" → `e2e/helpers/scratch.ts` + e2e/global-setup.ts → CF-HELPERS-6 → exceptions: the specs' literals (roadmap) · "one redaction rule set for every evidence writer" (replaces turn 3's row) → scripts/ci/redaction-rules.json → CF-REDACT-1 → 3 → exceptions: none · "a GO's claims are checked against the tree by a script" (turn 2's row) → guards gain law 3's K1 clause and law 11's parentheses form.

register row — (ruling 1, item 9) Register: "one redaction rule set for every evidence writer" → DEC-368 in its exceptions column; "a RegExp built from text" gains the e2e tree's helper (item 6) as a second mechanism row or a second file in the same row — the records turn decides the shape.

register row — (ruling 2) Records (word for word into §14, beside ruling 1's): the register row "a RegExp built from text" is unchanged by this stop; the `wired.test.ts` declarations check joins the row "a GO's claims are checked…"? — no: it is its own row, "every `.mjs` a script imports is declared whole" → scripts/*.d.mts + the wired.test.ts check → exceptions: none (the records turn numbers it).

changelog — 2026-11-1x housekeeping turn 3b (Opus 5.5): every script RegExp is built by `scripts/lib/pattern.ts` — the thirteen allowlisted sites moved and the allowlist empty (INC-1102 closes; the GO checker's test-id scan is a flat token check, alert #453); one redaction rule set, `scripts/ci/redaction-rules.json` (new), read by redact.py and the E2E reporter (CF-REDACT-3); the i18n provider says when the page's language is settled (`data-lang-settled`, one home) and the one pick helper waits for it, so a signed-in pick can never race the account read (INC-1103, DEC-367; CF-HELPERS-5); the reaper sweeps every scratch prefix from one list (INC-1104; CF-HELPERS-6); LGA-22's hand-built role moves onto `grantScratchRole` (INC-1049 closes whole); the GO checker refuses a "new" test for a stem that has one and reads a title in parentheses, and the GO template names outside-system premises and file readers; the two `.mjs` modules get declarations (no `@ts-expect-error`); `__pycache__/` ignored; the reporter's self-test names the failed check's own record. One product change: the attribute, 71 bytes in the provider chunk.

roadmap — line 23 ("The housekeeping turn") gains "turn 3b: INC-1102, INC-1103 (DEC-367), INC-1104, INC-1049 closed; the GO checker's two gaps"; two new lines for the e2e turn after the bundle: "one navigation helper — no spec calls page.goto (36 files)" and "scratch names in specs through the one builder (357 literals)" (the records turn writes them — DEC-346).

roadmap — (ruling 1, item 6) "every RegExp a spec builds from text through the one helper"

roadmap — (ruling 2, replacing ruling 1 item 9's 3c line) Roadmap (the records turn writes): 3c's line reads "housekeeping 3c — scripts/ under the typecheck (F1: 49 errors in 8 files at f3b215762, 32 of them the reporter's `Bun` global) and `check-go --at <commit>`".

roadmap — (ruling 1, item 9) F2 on turn 4's line: F2 (`src/server/ai/gateway.test.ts` :407, `@ts-expect-error`) goes to turn 4 (app code, Tier A);

INC — (proposed by this report, §13) scratch reach rows are never swept: `e2e/helpers/reach-rows.ts` makes `listing_packages` rows named `e2e_lvl_r…` and no reaper step deletes them, so a run that dies before its own cleanup leaves them on ethio-staging; the spec's `e2e_mon_` packages (`e2e/admin-monetisation.spec.ts:54`) are likely the same. Named in CF-HELPERS-6's `UNSWEPT_KINDS` and `docs/features/e2e-harness.md`; a sweep needs its own design (`market_settings.included_reach` references catalogue rows).
