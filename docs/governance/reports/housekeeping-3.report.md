# Housekeeping turn 3 — the CI infrastructure — report

Base: dev 2b11a9d29 (the lane `cursor/housekeeping` at e295dc131) · Final commit: 3ab2bd250 (the last code commit) · Brief: docs/governance/briefs/housekeeping-3.md (sha256 75f5d22e351739089e5eeb5acce71c2a0c9ab316de661b56e59861c754d8f33e) · Ruling 1: docs/governance/briefs/housekeeping-3-ruling-1.md (sha256 67b94f0f4238281b20034e6fdd20f64aa7dc973ed32679de700f35919d96e69f) · Ruling 2: docs/governance/briefs/housekeeping-3-ruling-2.md (sha256 315b1594a8de56ac2decfd5baafd2b010a3a194c292a7a6befc720194333cf63)
Review: READY · 0 BLOCKER · 2 MAJOR · 6 MINOR · on 3ab2bd2

CI on the last code commit: 3ab2bd250, run 43124629224, completed, success — 37 jobs passed and 1
skipped (promote, not dev); all 19 lane jobs green; `gh pr checks 34`: 42 pass, 1 skipping. The two
runs before it, a10a525a6 (43116753764) and stop 2's 62382440f (43120433214), failed only at the smoke
lane's outbound-calls guard, which Part E's pin change broke (INC-1106, fixed in 3ab2bd250; §11).

## 1. Done / not done, by part and step

- STEP 0 — done (157f49f17 `housekeeping-3: task saved`; the brief saved by script, sha256 equal;
  roadmap line 3 as dictated; check-go `[check-go] no finding` on the saved tree).
- STEP 1 — the census, stop 1 (8511aeed9); ruling 1 answered it (seventeen answers, §B scope
  additions, §C records), saved by scripted copy in Part A's commit, sha256 equal.
- STEP 2 — Part A done (3cc79e92a): `scripts/ci/install-browser-deps.sh` (new) at all five sites as
  `bash scripts/ci/with-deadline.sh 1500 1 -- bash scripts/ci/install-browser-deps.sh` (Q3: one
  deadline around the whole script); the probe of every apt host (`/etc/apt/apt-mirrors.txt` under
  `mirror+file:`, else the deb822 `URIs:` hosts) with `getent hosts`, the `host → ok | no address`
  table, drops announced as `::warning title=ci-mirror::`, the resolver-down wait (30 s × 5), one more
  run only after a fetch-stage failure (Q1); CF-CID-1's seventh rule with its CF-CID-2 breach;
  CF-INSTALL-1…6 over captured install output (`scripts/fixtures/install-deps-*.txt`).
- STEP 3 — Part B done (9ad29b413): the carrier is Q5's first form — "Write lane evidence" writes
  `local-backend-step-failure.txt` through the same redaction and "Upload lane log" adds it to
  `e2e-log-<lane>`; the reporter's `INFRA_STEP_IDS` (Q4's list, its self-test reading every id from
  the lane workflow), the head block's `- Infrastructure:` line, `(INFRA: <step>)` on the sources
  line, the failed step in each silent source's section, `e2e-verdict-class.txt` read by the
  Verdict step for its text only (Q6); EFR-1 runs the reporter's self-test inside the unit suite;
  LFE-3.
- STEP 4 — Part C done (3e2063e83): `publish-evidence.sh` maps a non-dev ref to
  `docs/tracking/branches/<ref>/<file>` (sanitised, `..` refused), `--print-path`, a missing or
  refused `EVIDENCE_REF` is a `::warning::` and exit 0; the six callers set `EVIDENCE_REF`; the flake
  ledger stays one file and its new lines carry `· ref \`<ref>\``; `docs/tracking/branches/README.md`;
  CF-PUBLISH-1…3, the selftest's cases (f) and (g), CF-CID-5/6.
- STEP 5 — Part D done (c63c2e3c5): `scripts/ci/docs-only.ts` (new) and the `scope` job; the bounded
  walk (Q10); `e2e-lanes` and `bundle-budget` under `!cancelled() && needs.scope.outputs.docs_only !=
  'true'`; the verdict's skip line and pass; `promote`'s explicit condition and
  `check-promote-needs.sh`'s clauses with the rewritten planted fixture (Q11); the status reporter's
  `- Lanes:` line and `skipped (docs-only)` words; CF-DOCS-1…6 over captured API fixtures.
- STEP 6 — Part E done (071dbfefc): `scripts/ci/redact.py` (new) imported by the three programs, the
  separate account-id passes removed (Q14); the CLI pin read from the one env line by both setup-cli
  steps and the evidence (Q15); `scripts/ci/backend-config.py` (new, variant `images`) in the images
  job and its cache key (Q13); CF-REDACT-1/2, CF-BCFG-1/2, CF-CI-IMG-5.
- STEP 7 — Part F done (c7306e1b1): `laws-changed.ts` exits 3 with its reason for the rules archive
  and for `pip install semgrep==<v>`, the runner maps 3 to NOT RUN (TCK-11); one cache root —
  `checksCacheRoot` (an empty value is unset), db-proof.sh reads the constant by `bun -e`, CF-DBP-8.
- STEP 8 — done (§5). A docs commit followed (a10a525a6, the self-review's finding: the harness page
  names the per-ref proof evidence).
- STEP 9 — the push of a10a525a6 went red at the smoke lane's outbound-calls guard (Part E's
  defect, §11); stop 2 (62382440f); ruling 2 answered it; the fix (3ab2bd250, INC-1106) and its push;
  its run 43124629224 green on every check; the evidence read by ruling 1 Q7's paths (§11).
- STEP 10 — this report. The report push is DEC-365's first live case; its run is read after this
  file lands (§11).

## 2. Files changed

`git diff --name-only 2b11a9d29`, read at the last code commit 3ab2bd250 (the whole lane: the base is
behind the lane's earlier turns housekeeping-1, housekeeping-1b, the lockfile turn and housekeeping-2,
as stop report 1 said; `git merge-base origin/dev HEAD` = 2b11a9d29 = `origin/dev`). This report,
`docs/governance/reports/housekeeping-3.report.md`, joins it with the report commit.

```
.github/workflows/ci-status-report.yml
.github/workflows/ci.yml
.github/workflows/feed-bench.yml
.github/workflows/flake-check.yml
.github/workflows/guard-proof.yml
.github/workflows/local-backend-proof.yml
.github/workflows/nightly-e2e.yml
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
docs/governance/reports/housekeeping-3.stop-1.md
docs/governance/reports/housekeeping-3.stop-2.md
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
scripts/conformance/overlays.test.ts
scripts/conformance/pattern-sites-allowlist.txt
scripts/conformance/pattern-sites.test.ts
scripts/conformance/press.test.ts
scripts/conformance/visible-area.test.ts
scripts/conformance/wired.test.ts
scripts/db-proof.sh
scripts/doors/check-doors.test.ts
scripts/doors/manifest.ts
scripts/doors/rows.ts
scripts/e2e-failure-report.test.ts
scripts/e2e-failure-report.ts
scripts/e2e-leases.test.ts
scripts/e2e-leases.ts
scripts/e2e-select.ts
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

This turn's own files: `git diff --name-only e295dc131` (the lane's head before this turn), plus this
report with the report commit:

```
.github/workflows/ci-status-report.yml
.github/workflows/ci.yml
.github/workflows/feed-bench.yml
.github/workflows/flake-check.yml
.github/workflows/guard-proof.yml
.github/workflows/local-backend-proof.yml
.github/workflows/nightly-e2e.yml
docs/features/ci-guards.md
docs/features/ci-local-backend.md
docs/features/ci-status-reporter.md
docs/features/e2e-harness.md
docs/features/guard-proof.md
docs/features/nightly-e2e.md
docs/features/scheduled-jobs.md
docs/governance/briefs/housekeeping-3-ruling-1.md
docs/governance/briefs/housekeeping-3-ruling-2.md
docs/governance/briefs/housekeeping-3.md
docs/governance/reports/housekeeping-3.stop-1.md
docs/governance/reports/housekeeping-3.stop-2.md
docs/tracking/branches/README.md
roadmap.md
scripts/check-outbound-calls.ts
scripts/check-promote-needs.sh
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
scripts/ci/redact.py
scripts/ci/redact.test.ts
scripts/ci/turn-checks-allowlist.txt
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts
scripts/conformance/ci-deadlines.test.ts
scripts/conformance/ci-images.test.ts
scripts/conformance/db-proof.test.ts
scripts/conformance/wired.test.ts
scripts/db-proof.sh
scripts/e2e-failure-report.test.ts
scripts/e2e-failure-report.ts
scripts/fixtures/ci-promote-needs-bad.yml
scripts/fixtures/docs-only/jobs-green-43103925609.json
scripts/fixtures/docs-only/jobs-red-43033934604.json
scripts/fixtures/docs-only/runs-8511aeed9.json
scripts/fixtures/install-deps-fetch-failure.txt
scripts/fixtures/install-deps-success.txt
scripts/fixtures/lane-step-failure.install.txt
scripts/fixtures/lane-step-failure.smoke.txt
scripts/publish-evidence.selftest.sh
scripts/publish-evidence.sh
scripts/publish-evidence.test.ts
docs/governance/reports/housekeeping-3.report.md (this file, with the report commit)
```

New files, each in `git ls-files`: `docs/governance/briefs/housekeeping-3-ruling-1.md`, `docs/governance/briefs/housekeeping-3-ruling-2.md`, `docs/governance/briefs/housekeeping-3.md`, `docs/governance/reports/housekeeping-3.stop-1.md`, `docs/governance/reports/housekeeping-3.stop-2.md`, `docs/tracking/branches/README.md`, `scripts/ci/backend-config.py`, `scripts/ci/backend-config.test.ts`, `scripts/ci/cli-pin.ts`, `scripts/ci/docs-only.test.ts`, `scripts/ci/docs-only.ts`, `scripts/ci/install-browser-deps.sh`, `scripts/ci/install-browser-deps.test.ts`, `scripts/ci/redact.py`, `scripts/ci/redact.test.ts`, `scripts/e2e-failure-report.test.ts`, `scripts/fixtures/docs-only/jobs-green-43103925609.json`, `scripts/fixtures/docs-only/jobs-red-43033934604.json`, `scripts/fixtures/docs-only/runs-8511aeed9.json`, `scripts/fixtures/install-deps-fetch-failure.txt`, `scripts/fixtures/install-deps-success.txt`, `scripts/fixtures/lane-step-failure.install.txt`, `scripts/fixtures/lane-step-failure.smoke.txt`, `scripts/publish-evidence.test.ts` (24; `git ls-files` lists each)

## 3. Behaviour contract — answer tables before → after

Every change below is one of the brief's parts or a ruling's numbered answer; nothing under `src/`,
`e2e/` or `supabase/` changed, so no route, door or screen is touched.

| Touched | At e295dc131 | Now |
| --- | --- | --- |
| The browser's system libraries (five sites) | `bunx playwright install-deps chromium` once under with-deadline.sh, the runner's mirror only | `install-browser-deps.sh` under one 1500 s deadline: probe table, unresolvable hosts dropped and announced, one more run only after a fetch-stage failure (DEC-366) |
| Lane job "Write lane evidence" / "Upload lane log" | the step file stayed on the runner | `local-backend-step-failure.txt` (redacted) rides in `e2e-log-<lane>` |
| `scripts/e2e-failure-report.ts` head block | Run, Commit, Attempt, Written, counts; "Sources without results: …" | adds `- Lanes: <the scope's line>` when `E2E_LANES` is set; `- Infrastructure: …` and `(INFRA: <step>)` when every failed step of a silent source is in `INFRA_STEP_IDS`; each silent source's section names its failed step; a docs-only form when `E2E_DOCS_ONLY=1` |
| The reporter's flake-ledger line | `… · commit \`<sha>\`` | `… · commit \`<sha>\` · ref \`<ref>\`` |
| ci.yml Verdict step `::error` | `E2E failed — see docs/tracking/e2e-last-failure.md` | INFRA class: `E2E: <n> lane(s) died in infrastructure before any test (<steps>) — re-run the failed jobs`; else `E2E failed — see <the run's own evidence path>` (dev: the root path; a lane: `docs/tracking/branches/<ref>/…`); a docs-only skip: `Lanes: <line>`, exit 0. The exit is still the lanes' result |
| `scripts/publish-evidence.sh` | every file at its one path | dev: unchanged; any other ref: `docs/tracking/branches/<ref>/<basename>`; the ledger one file; a missing or refused ref: `::warning::`, exit 0, nothing published; `--print-path` |
| ci.yml job graph | no `scope`; `bundle-budget` and `e2e-lanes` always run; `promote` `if: … && success()` | `scope` first (`actions: read`); the two jobs skip only when `scope` said docs-only; `e2e` needs `scope`; `promote` reads every needed job's result by name, `skipped` accepted for the two only under docs-only, `scope` must succeed |
| ci-status-report.yml status file | the jobs' conclusions | a `- Lanes:` line after `- Run:` when the scope job's log names one; `skipped (docs-only)` for the two jobs under a docs-only line; reaches lanes only from the first run after the merge (dev's code, Q7/Q12) |
| local-backend-proof.yml redaction | two inline `def redact`, one `def safe`, four account-id passes | `from redact import redact` in the three programs; output identical for the INC-794 probes (CF-REDACT-1), the account-id pass now inside `redact` |
| local-backend-proof.yml CLI pin | `2.120.0` at :13, :65, :319, :835 | :13 only; the two setup-cli steps and the evidence read the env |
| backend-images job config | an inline regex rewrite of the toml | `backend-config.py images` (fails unless each switch is found once); the cache key hashes the program too (one cache miss on the first run) |
| `laws-changed.ts` (the laws' Semgrep mode) | a failed rules fetch or pip install: exit 1, the runner's FAIL | exit 3 with `[laws] NOT RUN — <reason>`, the runner's NOT RUN; a failed mkdir or venv stays FAIL |
| `checks-cache.ts` | `ETHIO_CHECKS_CACHE ?? default` (an empty value gave a relative root) | `ETHIO_CHECKS_CACHE \|\| default` |
| `scripts/db-proof.sh` | the cache root and the CLI pin by its own `sed`/parameter text | both by `bun -e` through `checks-cache.ts` and `cli-pin.ts`; a failed read is a named NOT RUN |
| `scripts/check-outbound-calls.ts` | the pin by a setup-cli `version:` line's form | the pin through `readCliPin()`; a null pin keeps the `"unknown"` path (ruling 2 §1) — at e295dc131 and now it reads `2.120.0` |
| `scripts/check-promote-needs.sh` | every job in `needs` | also: `success()` absent, `!cancelled()` present, `scope` needed, each job's result read by name in the two allowed forms, the skippable jobs' own `if:` exact |

## 4. Censuses

Read on the final tree (3ab2bd250), each with the grep run:

- `rg -n "playwright install-deps|install --with-deps" .github/workflows` → none (all five through
  the script: flake-check.yml :89, guard-proof.yml :51, nightly-e2e.yml :109 and :374,
  local-backend-proof.yml :733).
- `rg -n "apt-get install" .github/workflows` → local-backend-proof.yml :361 (the certificate
  tools, LEFT by ruling 1 Q2).
- `rg -n "def (redact|safe)\b" .github/workflows` → none; `rg -n "from redact import"
  .github/workflows` → local-backend-proof.yml :441, :800, :1058.
- `rg -n "2\.120\.0" .github/workflows scripts/ci` → local-backend-proof.yml :13 (the pin);
  `scripts/ci/start-failure-excerpt.mjs` :8 and `scripts/ci/fixtures/start-failure-cli.log` :2 name
  the CLI release a captured shape came from (comments and fixture text, not readers).
- The pin's readers (ruling 2's census, CF-CI-IMG-7 over `scripts/`, `e2e/`, `src/`): the module
  `scripts/ci/cli-pin.ts`; its users `scripts/check-outbound-calls.ts`, `scripts/db-proof.sh` :63,
  `scripts/conformance/ci-images.test.ts`, `scripts/conformance/db-proof.test.ts`,
  `scripts/ci/lane-failure-evidence.test.ts`. On a10a525a6 the same census named
  check-outbound-calls.ts :94, lane-failure-evidence.test.ts :96, db-proof.test.ts :130 and :291,
  db-proof.sh :63.
- `rg -n "publish-evidence.sh" .github/workflows` → six publishing steps (feed-bench.yml,
  ci-status-report.yml, ci.yml's E2E publish, nightly-e2e.yml, flake-check.yml,
  local-backend-proof.yml) and one path read (ci.yml's Verdict), each with `EVIDENCE_REF` in its env
  (CF-CID-5).
- `rg -n "success\(\)" .github/workflows/ci.yml` → only the promote-needs self-test's needle and a
  comment; `promote`'s condition names no `success()`.
- `rg -n "ETHIO_CHECKS_CACHE|ethio-checks" scripts` (tests aside) → `scripts/ci/checks-cache.ts`
  :4/:11/:14 and a comment in `turn-checks.ts` :31.
- `rg -n "local-backend-config.toml" .github/workflows scripts/ci` → `backend-config.py` (its
  source), the images job's cache key (local-backend-proof.yml :42), `prepare-local-backend.sh` :10
  and :153 (the whole copy).
- CENSUS-ITEM chunk-graph and first-download: not applicable — `git diff --name-only e295dc131`
  holds no `src/` path.

## 5. Tests

- `bun run typecheck` → exit 0 (`tsc --noEmit`) on 3ab2bd250. `bun run lint` → clean.
- `bunx vitest run scripts --maxWorkers=2` on 3ab2bd250 → `Test Files 110 passed (110)`, `Tests 556
  passed | 1 skipped (557)`.
- THE CHECKS on 3ab2bd250: `checks (fast): 25 PASS · 0 FAIL · 391s — laws-first, scope,
  build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan,
  import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit,
  e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)` and its last line
  `checks: 34 PASS · 0 FAIL · 25 NOT RUN · 447s`. The NOT RUN set equals the first run's (on
  c7306e1b1/a10a525a6: `checks: 34 PASS · 0 FAIL · 25 NOT RUN · 450s`), compared line by line:
  `scope › Decide whether the lanes run` (the Actions API exists only in a GitHub run; CF-DOCS-1…6 are
  its local proof — the new allowlist line); `build-and-check › Workflow lint (actionlint)` and
  `secrets-scan › gitleaks` (linux/x64 binaries; this machine darwin/arm64 — CI's jobs judge);
  `build-and-check › Typecheck` (reads Lovable's harness log; run by hand above); four `Install
  dependencies` steps (already installed; a package change is its own turn); `dependency-audit ›
  Install dependencies` and `› Audit` (the advisory service is not reachable); four `e2e-preflight`
  steps (staging credentials the script never holds); six `e2e` steps (the lanes' artifacts); four
  `promote` steps (only CI promotes); `semgrep › Upload SARIF` and its warning (GitHub-only).
- `bun scripts/brief/check-go.ts docs/governance/briefs/housekeeping-3.md` on the final tree → 5
  findings: CF-BRIEF-6 twice (the brief's anchors ci-status-report.yml :213 and laws-changed.ts :126
  now hold other text — Parts C and F edited those files) and CF-BRIEF-7 three times (CF-INSTALL-1,
  DEC-366 and CF-DOCS-1 "already used" — by this turn's own work). On the saved tree at STEP 0 it
  printed `[check-go] no finding`.
- Ids added: CF-INSTALL-1…6 (`scripts/ci/install-browser-deps.test.ts`, new), EFR-1
  (`scripts/e2e-failure-report.test.ts`, new), LFE-3, CF-PUBLISH-1…3 (`scripts/publish-evidence.test.ts`,
  new), CF-CID-5, CF-CID-6, CF-DOCS-1…6 (`scripts/ci/docs-only.test.ts`, new), CF-REDACT-1/2
  (`scripts/ci/redact.test.ts`, new), CF-BCFG-1/2 (`scripts/ci/backend-config.test.ts`, new),
  CF-CI-IMG-5, CF-CI-IMG-6, CF-CI-IMG-7, CF-DBP-8, TCK-11; the reporter's in-file self-test gains its
  INC-1101, DEC-321 and DEC-365 checks; `publish-evidence.selftest.sh` gains cases (f) and (g).
- Assertions that changed shape: CF-CID-1 (a seventh rule) and CF-CID-2 (its planted breach, the
  exact list of findings); CF-CID-5's count reads "seven steps call the publisher, one of them — the
  Verdict — only for `--print-path`" (ruling 2 §3 made the seventh); LFE-2 and LFE-3's env gains an
  absolute `PYTHONPATH`, `PYTHONDONTWRITEBYTECODE` and (LFE-3) the workflow's `SUPABASE_CLI_VERSION`;
  CF-CI-IMG-5's `pinRestatements` reads the pin through `cliPin`; `db-proof.test.ts`'s
  `dbProofFindings` reads it through `cliPin` (its planted `9.9.9` text unchanged); ci.yml's promote-needs self-test checks nine needles instead of one; CF-WIRED-1 names the
  new files' last ids.
- Red first:
  - The workflow censuses on e295dc131's seven workflows (written into place from `git show`, the
    current files copied to scratch first and restored, `git status --short` empty after): CF-CID-1
    named the five direct installs (flake-check.yml :87, guard-proof.yml :49,
    local-backend-proof.yml :737, nightly-e2e.yml :107 and :370); CF-REDACT-2 named three inline
    redactions (:806, :919, :1070), four account-id passes (:807, :920, :1071, :1147) and two programs
    calling `redact(` without the module; CF-CI-IMG-5 named three restatements (:65, :319, :835);
    CF-CID-5 counted six publisher steps, not seven; CF-BCFG-2 failed (no images-job call).
  - CF-CI-IMG-6/7 on a10a525a6's four readers (the same restore method): CF-CI-IMG-6's run of the
    guard printed exactly the smoke lane's three FAIL lines (`the CLI pin is unreadable`, the
    allowlist line expired, the caller refused); CF-CI-IMG-7 named the five readers listed in §4.
  - CF-DOCS-1 and CF-DOCS-4 were shown red on planted defects in Part D (the path law and the
    verdict-job check).
- E2E: no spec changed (no `e2e/` path in the turn). CI's lanes on 3ab2bd250 (run 43124629224): the
  proof table at `docs/tracking/branches/cursor/housekeeping/local-backend-proof.md` sums to 2598
  passed · 0 failed · 0 flaky · 334 skipped over its 18 rows; the E2E evidence's head reads `last E2E
  run 43124629224 passed`, flaky 0, errors outside any test none; its server-error census read all 19
  logs, `62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted`. The browser tests were not
  run locally (§12).

## 6. K2 — siblings that bypass the mechanism

Greps: `rg -n "apt-get install" .github/workflows`; `rg -n "redact" scripts/*.ts`; `rg -n
"2\.120\.0" scripts`; `rg -n "ts-expect-error" scripts`.

- `.github/workflows/local-backend-proof.yml` :361 — the certificate tools' `apt-get install -y
  libnss3-tools` installs a package outside `install-browser-deps.sh`'s probe. LEFT by ruling 1 Q2
  (not reached in 40 lane records; it moves onto the probe when it first runs red) — the register
  row's exception.
- `scripts/e2e-failure-report.ts` — the TypeScript reporter's own `redact` is a second rule set
  beside `scripts/ci/redact.py`. LEFT by ruling 1 Q14: turn 3b, one rule set read by both.
- `scripts/db-proof.sh` — `cli_sha256`'s table keys name `2.120.0` four times; LEFT by ruling 1 Q15
  (a checksum table keyed by version, held to the pin by CF-DBP-2/4).
- `scripts/ci/step-failures.test.ts` :6 and `scripts/ci/start-failure-excerpt.test.ts` :6 —
  `@ts-expect-error` over a plain `.mjs` import with no declaration file (the TypeScript law). Outside
  this turn's files; §13.

## 7. Allowlists and guards

- `scripts/ci/turn-checks-allowlist.txt`: 9 → 10 lines. New: `scope › * | decides from the push's
  base and the Actions API (DEC-365), which exist only in a GitHub run; CF-DOCS-1…6 are its local
  proof | 2027-04-30`.
- No other allowlist changed (`git diff --name-only e295dc131 -- '*allowlist*'` → only the file
  above). `scripts/conformance/outbound-calls-allowlist.txt` is unchanged; its `until` field names
  the pin's value by design (ruling 2's register exception).
- Guards and self-tests: CF-CID-1/2 (seventh rule, planted), CF-CID-5/6 (planted), CF-PUBLISH-1…3
  and the selftest's (f)/(g), CF-DOCS-1…6 (captured fixtures, planted), `check-promote-needs.sh`
  against its rewritten planted fixture (nine clauses named), CF-REDACT-1/2 (planted), CF-BCFG-1/2,
  CF-CI-IMG-5/6/7 (planted), CF-DBP-8 (planted value, none, empty), TCK-11, EFR-1 (the reporter's
  self-test), LFE-1…3. Each new test file's last id is named in `wired.test.ts`.

## 8. Strings

None — FLAG no-new-string; no `src/i18n` path in the turn.

## 9. Migrations

None — FLAG no-migration; no `supabase/` path in the turn.

## 10. Departures

- Two STOPs and two rulings: stop 1 (the census) → ruling 1
  (`docs/governance/briefs/housekeeping-3-ruling-1.md`); stop 2 (the outbound-calls guard's pin
  read) → ruling 2 (`docs/governance/briefs/housekeeping-3-ruling-2.md`). Each saved by scripted
  copy, sha256 equal to the operator's line.
- Ruling 2 added `scripts/check-outbound-calls.ts` and `scripts/ci/cli-pin.ts` to the turn, with
  `docs/features/scheduled-jobs.md` (the guard's page, under rule 10's allowance: one line naming the
  pin's reader).
- a10a525a6 (docs only, after Part F): the harness page names the per-ref proof evidence — accepted by
  ruling 2 §6.
- CF-INSTALL-5 and CF-INSTALL-6 go beyond ruling 1 Q1's CF-INSTALL-1 → 4 (the plain-`URIs:` swap and
  the second fetch-stage failure being final).
- TCK-11 is the id of "TCK-3's neighbour case" (ruling 1 Q17): TI-1 refuses a second TCK-3.
- DEC-365's walk counts `before` as the first of its ten commits.
- Semgrep's own exit 3 stays a FAIL: only `laws-changed.ts`'s fetch and install failures are NOT
  RUN.
- The reporter's new self-test checks (INC-1101, DEC-321, DEC-365) print a failure under the existing
  `SELF-TEST FAILED — DEC-083/084 census:` label (scripts/e2e-failure-report.ts :2914); the check's
  own name, which leads with its record, follows the label. Left as is: ruling 2 allowed one fix
  commit.
- DECIDE-AND-NAME: the carrier — Q5's first form; the deb822 edit — the host part of a `URIs:` line
  only (and a mirror list's line dropped); concern 5 (c) — a small program,
  `scripts/ci/backend-config.py`; the word `INFRA` and `INFRA_STEP_IDS` as Q4 lists; the job `scope`
  ("Scope (docs-only push, DEC-365)"), outputs `docs_only` and `lanes`; CF-CID-1 needs no new rule
  kind for a wrapping script (CF-INSTALL judges the script's own calls); the ledger's ref word after
  `commit`.
- Scratch copies under `/tmp/ethio-scratch/housekeeping-3/` (the operator's to remove): the base and
  restore copies for the red-first runs, the checks logs, the evidence reads, a YAML parse script.

## 11. CI

The base: the lane's head when this turn began, read at the raw ci-evidence address before STEP 0's
commit (stop report 1):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `e295dc131c6c65de0ee449894edbeee4701f6fb6` (short `e295dc1`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-11T18:26:29Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43074440038
```

Two-step SHA check then: the file's commit = `git rev-parse origin/cursor/housekeeping` = e295dc131. No
red of an earlier turn stood.

This pull request's runs in the turn (`gh run list --branch cursor/housekeeping`):

| Run | Commit | Conclusion | Class and cause |
| --- | --- | --- | --- |
| 43103925609 | 8511aeed9 (stop 1) | success | — |
| 43116753764 | a10a525a6 (Parts A–F and the docs commit) | failure | THIS TURN'S DEFECT, not infrastructure, not a test: the smoke lane's `outbound-calls-guard` step printed `allowlist: the CLI pin is unreadable` — `scripts/check-outbound-calls.ts` :94 read the pin by the setup-cli line Part E changed (INC-1106). No test failed (2598 passed). Fixed in 3ab2bd250 by ruling 2. |
| 43120433214 | 62382440f (stop 2) | failure | the same red, as stop 2 said; read, not judged (ruling 2 §5) |
| 43124629224 | 3ab2bd250 (ruling 2's fix) | success | the judged run |

No run was re-run.

The judged run's evidence, read at the raw ci-evidence addresses:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `3ab2bd25033cfd040528961a81c5162346f45293` (short `3ab2bd2`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T00:27:59Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43124629224
```

Two-step SHA check: the file's commit 3ab2bd250 = `git rev-parse HEAD` at the push = the pull request's
head at the read.

- DEC-321 (Part C): `docs/tracking/branches/cursor/housekeeping/e2e-last-failure.md` (head `last E2E
  run 43124629224 passed`) and `…/local-backend-proof.md` exist with the run's merge commit
  050305c1c; `docs/tracking/branches/cursor/housekeeping/ci-status.md` does not exist (404) and the
  root `ci-status.md` names the lane's commit — dev's status reporter (workflow_run) until the merge,
  as ruling 1 Q7 said. DEC-321's judge is read at the first side-branch run after the merge.
- DEC-365 (Part D), the `scope` job's line in each run: 43116753764 — `ran — not docs-only:
  .github/workflows/ci-status-report.yml is not a record (40 of 48 paths; diff base 8511aeed9…, push
  base 8511aeed9…)`; 43120433214 — the same with `40 of 49 paths`, push base a10a525a6 (the walk passed
  over a10a525a6's red run and the five Part commits without a run to 8511aeed9); 43124629224 — `42 of
  53 paths; diff base 8511aeed9…, push base 62382440f…`. Each line also heads the E2E evidence as
  `- Lanes:`.
- Part B: on 43116753764 the smoke source read `smoke: no results file … Failed step:
  outbound-calls-guard` with no INFRA mark (the guard is not in `INFRA_STEP_IDS`), and the Verdict
  printed `E2E failed — see docs/tracking/e2e-last-failure.md` (the TESTS text, before ruling 2 §3
  made it name the run's own path).
- Part A: no lane died at the install step; every lane's probe table read `→ ok` for
  `azure.archive.ubuntu.com`, `archive.ubuntu.com` and `security.ubuntu.com` (54 rows on 43116753764,
  57 on 43124629224), no `ci-mirror` warning. The script's drop, wait and second run are proven only
  by CF-INSTALL-1…6 until a mirror fails.
- Part E: the backend-images job passed in all three runs with the new derivation; whether its cache
  hit or missed under the new key was not read.
- The report push (DEC-365's first live case, ruling 1 §D): its `before` is 3ab2bd250, whose run
  43124629224 ran its lanes green, and `git diff 3ab2bd250 <its merge commit>` holds this file alone
  (dev has not moved: `origin/dev` = 2b11a9d29), so the walk should answer docs-only at its first hop
  and skip `e2e-lanes` and `bundle-budget`. Its status file will read the two jobs as plain `skipped`
  (dev's reporter, Q12). What it did is read after this file lands and named in the pull request's
  comment; if it did not skip, that is a finding and one more docs-only push brings this section up
  to date (the brief's STEP 10).

## 12. Limits

- The workflows do not run on this machine: actionlint and gitleaks are linux/x64 binaries (NOT RUN
  on darwin/arm64); the workflow censuses (CF-CID, CF-CI-IMG, CF-REDACT-2, CF-BCFG-2,
  check-promote-needs.sh) and a local parse of ci.yml are the local proof, CI the behaviour proof.
- The browser tests were not run locally: the turn changed no spec, screen or shared helper (rule
  20), and the E2E values were not checked for (`E2E_SUPABASE_*` names only); CI's lanes are the
  proof.
- Part A's mirror handling is judged only by a run whose mirror fails; no lane printed a `ci-mirror`
  drop in the runs read (§11).
- DEC-321's judge (the branch `ci-status.md`) can be read only at the first side-branch run after the
  merge (ruling 1 Q7).
- The report push's own run (DEC-365's first live case) happens after this file is committed; its
  result is in the pull request's comment and the chat, not here (rule 60: no push only to record a
  run).

## 13. Findings

- INC-1106 (fixed in this turn, §14): the CLI pin had five readers with five patterns; Part E's
  change broke one in the smoke lane. My census for concern 5 (b) followed the literal, not every
  reader of the file holding the pin — the class ruling 2's PREVENTION names.
- LEFT — turn 3b: one redaction rule set across Python and TypeScript (`scripts/e2e-failure-report.ts`
  `redact` beside `scripts/ci/redact.py`; ruling 1 Q14).
- `scripts/ci/step-failures.test.ts` :6 and `scripts/ci/start-failure-excerpt.test.ts` :6 carry
  `@ts-expect-error` (forbidden by rule 10's TypeScript law), each over a `.mjs` import with no
  declaration file; a `.d.mts` beside each module would remove both. Outside this turn's files.
- `.gitignore` does not ignore `__pycache__`: a Python test run without `PYTHONDONTWRITEBYTECODE`
  leaves `scripts/ci/__pycache__/` in the tree (this turn's tests set it). Outside SCOPE.
- The evidence paths in AGENTS.md :24–:25, `.cursor/rules/40-ci-evidence.mdc`, `.claude/` and
  `executor-hooks.test.ts` still name only the root files (F1; ruling 1's roadmap line for rules
  turn 4). Not edited (FLAG no-agents-change; rule files outside SCOPE).
- The certificate tools' `apt-get install` (local-backend-proof.yml :361) — LEFT by ruling 1 Q2.

## 14. Records

Copied by script from the brief's RECORDS, ruling 1 §C and ruling 2 §6; ruling 1 §C replaces the
brief's DEC-365 and DEC-366 texts and amends the brief's register rows and roadmap; ruling 2 §6
rewrites the register row "the CLI version pinned once" and adds to the changelog line. The
brackets filled here are named in each line; "[count at the records turn]" is the records turn's.

DEC — DEC-365 (the supervisor, 2026-11-11 16:4x New York, under G17 and G22 — a closed surface, the CI workflow graph; the operator's directive of 2026-11-10 that runs lost to housekeeping are a cost to the project) — a push whose code tree equals the newest lane-tested commit on its ref runs no browser lane and no bundle budget: the `scope` job (`scripts/ci/docs-only.ts`) walks at most ten first-parent commits back from the push's known base to the newest commit whose own run on this ref ran its lanes green (`e2e-lanes` success, read from the Actions API under a deadline), and holds docs-only only when every path in `git diff <that commit> <sha>` is a record (`docs/**` but not `docs/generated/**`, `roadmap.md`, `README.md`, `AGENTS.md`, `.cursor/**`, a root `*.md`); then `e2e-lanes` and `bundle-budget` do not run, the verdict job writes `- Lanes: skipped — docs-only push; the code tree equals <commit>, whose lanes were green in run <id>` and passes, the status file lists the two jobs as `skipped (docs-only)`, and `promote` on dev reads every needed job's result explicitly (`!cancelled()`, `scope` success, `skipped` accepted for the two lane jobs only while `scope` said docs-only — `scripts/check-promote-needs.sh` proves the condition's form). An unknown base, a failed API read, a bound exceeded or any other path runs today's graph. Frozen judge: adopted when ten docs-only pushes have skipped the lanes with the fast jobs green and the lane-tested commit named in the evidence [the first: the report push of housekeeping turn 3, run <id> — read after this report's push; the pull request's comment names it], and no push whose diff from that commit touched a non-record path skipped; reverted whole on one such skip.

DEC — DEC-366 (the supervisor, 2026-11-11 16:4x New York, under G17 and G22 — amends DEC-276; INC-1101) — the browser's system libraries are installed only by `scripts/ci/install-browser-deps.sh` (new): before the install it resolves every host apt will use (the runner's mirror list `/etc/apt/apt-mirrors.txt`, or the deb822 `URIs:` hosts) and drops from the list — or swaps for the public archive — each host that does not resolve, announcing every drop; when no host resolves it re-probes up to five times, thirty seconds apart [the wait's rescues counted: 0 in this turn's runs read — no lane printed a `ci-mirror` warning; run 43116753764: 54 probe rows `→ ok` (18 lanes), run 43124629224: 57 (19 lanes), none `→ no address`], and prints the probe table as the record of which mirror failed; `playwright install-deps chromium` then runs once under with-deadline.sh (DEC-276) — except that a failure at apt's fetch stage (`Temporary failure resolving` or `E: Unable to fetch some archives`, before any `Unpacking` line), which leaves the package manager untouched, is answered by one re-probe and ONE more run; a failure after unpacking began, or a second fetch-stage failure, is final. Frozen judge: adopted when the next twenty lane runs show no lane dead at the install step whose log carries a resolve failure [count at the records turn]; the `ci-mirror` lines counted per run in the lane evidence.

INC — INC-1101 — status line: FIXED in housekeeping turn 3 — Parts A and B (`scripts/ci/install-browser-deps.sh` (new), DEC-366; the reporter's INFRA class); until DEC-366's judge closes, an INFRA red is re-run once by the executor after 20 minutes (rule 40 as amended at rules turn 4).

INC — INC-1106 — the CLI pin had five readers with five regexes on the workflow's text (`scripts/check-outbound-calls.ts` :94 by a setup-cli line's form; `ci-images.test.ts` :160, `db-proof.test.ts` :130, `lane-failure-evidence.test.ts` :96 and `db-proof.sh` :63 by the `SUPABASE_CLI_VERSION:` line); Part E's "the pin appears once" (ruling 1 Q15) changed the setup-cli lines and the outbound-calls guard read "unreadable", refusing its one allowlisted caller in the smoke lane (run 43116753764 on a10a525a6; no test failed, 2598 passed). Evidence: the stop-2 report §"The cause". Fix: `scripts/ci/cli-pin.ts` (new), the one reader, used by all five; CF-CI-IMG-6 (the reader on the real tree), CF-CI-IMG-7 (no second reader). Class: a value's readers censused by the literal, not by the file that holds it (G68) — the GO template's `consumers` item amended at turn 3b. Status: FIXED (housekeeping turn 3). The register row "the CLI version pinned once" reads: mechanism `local-backend-proof.yml` `SUPABASE_CLI_VERSION` + `scripts/ci/cli-pin.ts` (the one reader) → guards CF-CI-IMG-5 (one literal), CF-CI-IMG-6, CF-CI-IMG-7 → exceptions: `outbound-calls-allowlist.txt` :3's `until` field names the pin's value by design (it expires with the pin). The changelog line gains "; the CLI pin has one reader (`scripts/ci/cli-pin.ts`, INC-1106)". Departures §9 names the a10a525a6 docs commit (accepted: a page in SCOPE under rule 10) and the scratch copies.

register row — register rows (unnumbered): "a CI package fetch survives one mirror" → scripts/ci/install-browser-deps.sh → CF-CID-1 (seventh rule), CF-INSTALL-1 → 4 → exceptions: none · "a lane without results is classified by the step it died at" → scripts/e2e-failure-report.ts + scripts/ci/step-failures.mjs → the reporter's fixtures → exceptions: none · "CI evidence per ref (DEC-321)" → scripts/publish-evidence.sh → CF-PUBLISH-1 → 3 → exceptions: the flake ledger, one file (DEC-030) · "a push's lanes by what it changed (DEC-365)" → scripts/ci/docs-only.ts, the `scope` job → CF-DOCS-1 → 4, CF-CID-1 → exceptions: none · "one redaction of the lanes' evidence" → scripts/ci/redact.py → CF-REDACT-1 → 2 → exceptions: none · "the CLI version pinned once" → local-backend-proof.yml `SUPABASE_CLI_VERSION` → CF-CI-IMG-5 → exceptions: none · "one derivation of the temporary backend's config" → scripts/ci/backend-config.py (variant `images`) → CF-BCFG-1/2 → exceptions: none.

register row — (ruling 1 §C) INC-1101 — status line unchanged from the brief. Register rows: concern 3's exceptions column gains "the status reporter publishes from dev's code (workflow_run): a lane's ci-status.md and guards file reach its branch folder from the first run after the publisher's merge"; concern 1's gains "the certificate tools' apt-get (local-backend-proof.yml :367) — not reached in 40 runs; onto the probe when it first runs red". Roadmap (the records turn writes it): turn 3b gains "one redaction rule set across Python and TypeScript (F2)"; rules turn 4 gains "the per-ref evidence path in AGENTS.md :24–:25, .cursor/rules/40-ci-evidence.mdc, .claude/ and executor-hooks.test.ts :453/:631 (F1)".

changelog — 2026-11-1x housekeeping turn 3 (Opus 5.5): the browser lanes' system-library install goes through `scripts/ci/install-browser-deps.sh` (new), which swaps a mirror that does not resolve for the public archive and may repeat a fetch-stage failure once (INC-1101, DEC-366; CF-INSTALL-1 → 4, CF-CID-1's seventh rule); the E2E evidence names a lane that died before any test by its step and the class INFRA; the CI evidence of a run on any ref but dev lands under `docs/tracking/branches/<ref>/` (DEC-321; CF-PUBLISH-1 → 3; the flake ledger stays one file, its lines now naming the ref); a docs-only push runs no browser lane and no budget and promotes only over a green base (DEC-365; `scripts/ci/docs-only.ts` (new), CF-DOCS-1 → 4); the lanes' redaction, CLI pin and config derivation are one each (CF-REDACT-1 → 2); a failed pinned Semgrep fetch is NOT RUN in the checks; one cache root. No product code, no migration, no string.

roadmap — the three CI-turn lines (the redaction module, the CLI pin once, the backend-images derived config) read `[x] … — housekeeping turn 3, pull request #34`; the housekeeping line (line 23) gains "turn 3: INC-1101, DEC-321, DEC-365, DEC-366, the three CI-turn lines" (the records turn writes it — DEC-346).
