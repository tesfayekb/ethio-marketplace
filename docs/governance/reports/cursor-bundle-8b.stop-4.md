STOP — cursor-bundle-8b step 8: CI's red names the reporter's own route, /api/error-reports
DONE: parts 1, 2, 3; steps 0–7; step 8's push (d12430121); the self-review (Review: READY · 0 BLOCKER · 0 MAJOR · 0 MINOR · on d12430121)
LEFT: step 8's green; step 9 (the report is drafted in the worktree, not committed)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `d1243012111a949b7d12ba45d6589a8889b9965c` (short `d124301`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-27T03:34:24Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45929211475
FILES:
.github/workflows/ci.yml
.gitignore
docs/features/ci-guards.md
docs/features/doors.md
docs/features/error-reports.md
docs/features/performance-strategy.md
docs/features/translations.md
docs/generated/i18n-usage.json
docs/governance/briefs/cursor-bundle-8b-ruling-1.md
docs/governance/briefs/cursor-bundle-8b-ruling-2.md
docs/governance/briefs/cursor-bundle-8b-ruling-3.md
docs/governance/briefs/cursor-bundle-8b-types.patch
docs/governance/briefs/cursor-bundle-8b-words.json
docs/governance/briefs/cursor-bundle-8b.md
docs/governance/reports/cursor-bundle-8b.stop-1.md
docs/governance/reports/cursor-bundle-8b.stop-2.md
docs/governance/reports/cursor-bundle-8b.stop-3.md
docs/tracking/intentional-deletions.txt
e2e/error-reports.spec.ts
public/i18n-usage.json
roadmap.md
scripts/check-bundle-size.mjs
scripts/ci/docs-only.test.ts
scripts/ci/docs-only.ts
scripts/ci/lane-weights.json
scripts/ci/turn-checks-allowlist.txt
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts
scripts/conformance/door-answers-allowlist.txt
scripts/conformance/door-answers.test.ts
scripts/conformance/door-answers.ts
scripts/conformance/door-args-allowlist.txt
scripts/conformance/door-args.test.ts
scripts/conformance/door-args.ts
scripts/conformance/door-permissions-allowlist.txt
scripts/conformance/door-words-allowlist.txt
scripts/conformance/e2e-waits-allowlist.txt
scripts/conformance/e2e-waits.test.ts
scripts/conformance/error-reports-allowlist.txt
scripts/conformance/error-reports.test.ts
scripts/conformance/error-reports.ts
scripts/conformance/failure-crawl-allowlist.txt
scripts/conformance/kit.test.ts
scripts/conformance/kit.ts
scripts/conformance/listing-designation-allowlist.txt
scripts/conformance/listing-designation.test.ts
scripts/conformance/listing-seed-allowlist.txt
scripts/conformance/listing-seed.test.ts
scripts/conformance/live-regions-allowlist.txt
scripts/conformance/live-regions.test.ts
scripts/conformance/locale-imports-allowlist.txt
scripts/conformance/locale-imports.test.ts
scripts/conformance/mailbox-allowlist.txt
scripts/conformance/mailbox.test.ts
scripts/conformance/on-demand-failure-allowlist.txt
scripts/conformance/planted-proofs-allowlist.txt
scripts/conformance/planted-proofs.test.ts
scripts/conformance/proof-readers-allowlist.txt
scripts/conformance/proof-readers.test.ts
scripts/conformance/provider-errors-allowlist.txt
scripts/conformance/provider-errors.test.ts
scripts/conformance/refusal-readers-allowlist.txt
scripts/conformance/refusal-readers.test.ts
scripts/conformance/sql-writes-allowlist.txt
scripts/conformance/sql-writes.test.ts
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/manifest.txt
scripts/doors/staff-rules.ts
scripts/doors/staff-rules.txt
scripts/e2e-select.ts
scripts/i18n-map-guard.ts
scripts/i18n-usage-map.test.ts
scripts/i18n-usage-map.ts
scripts/public-surface-allowlist.txt
scripts/route-budgets.d.mts
scripts/route-budgets.mjs
scripts/route-budgets.test.ts
src/client.tsx
src/components/shell/failure-reason.test.ts
src/components/shell/failure-reason.ts
src/features/admin-ai/ai-page.test.tsx
src/features/admin-ai/ai-page.tsx
src/features/admin-attributes/attributes-page.test.tsx
src/features/admin-attributes/attributes-page.tsx
src/features/admin-categories/categories-page.tsx
src/features/admin-categories/category-refusals.test.tsx
src/features/admin-categories/category-refusals.ts
src/features/admin-countries/countries-page.tsx
src/features/admin-errors/errors-refusals.test.ts
src/features/admin-errors/errors-refusals.ts
src/features/admin-errors/errors-service.test.ts
src/features/admin-errors/errors-service.ts
src/features/admin-listings/edit-listing.test.ts
src/features/admin-listings/listing-page.tsx
src/features/admin-listings/listing-refusals.ts
src/features/admin-listings/listings-page.test.tsx
src/features/admin-listings/listings-page.tsx
src/features/admin-locations/locations-page.tsx
src/features/admin-monetisation/monetisation-page.test.tsx
src/features/admin-monetisation/monetisation-page.tsx
src/features/admin-overview/locations-overview.test.tsx
src/features/admin-overview/locations-overview.tsx
src/features/admin-screening/screening-decisions.test.tsx
src/features/admin-screening/screening-page.tsx
src/features/admin/legal/legal-editor-form.tsx
src/features/admin/legal/legal-facts-card.tsx
src/features/admin/legal/legal-form-gates.test.tsx
src/features/admin/legal/legal-page.tsx
src/features/admin/legal/legal-version-view.tsx
src/features/admin/nav-alerts.test.tsx
src/features/admin/nav-alerts.ts
src/features/admin/roles/permission-matrix.tsx
src/features/admin/roles/role-detail.test.tsx
src/features/admin/roles/role-detail.tsx
src/features/admin/roles/roles-list.tsx
src/features/admin/translations/consoles-fields.test.tsx
src/features/admin/translations/languages-page.tsx
src/features/admin/translations/languages-stats.test.tsx
src/features/admin/translations/string-editor-readonly.test.tsx
src/features/admin/translations/strings-page-counts.test.tsx
src/features/admin/translations/strings-page.tsx
src/features/admin/translations/transfer-bar.test.tsx
src/features/admin/translations/transfer-bar.tsx
src/features/admin/users/staff-form-gates.test.tsx
src/features/admin/users/user-detail.tsx
src/features/permissions/door-permissions.generated.ts
src/features/posting/step-details-assist.test.tsx
src/features/posting/step-details.tsx
src/features/posting/wizard.tsx
src/i18n/locales/am-admin.ts
src/i18n/locales/am-base.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-base.ts
src/i18n/locales/en-member.ts
src/integrations/supabase/types.ts
src/lib/dials.ts
src/lib/door-codes.generated.ts
src/lib/error-clean.test.ts
src/lib/error-clean.ts
src/lib/error-report-send.test.ts
src/lib/error-report-send.ts
src/lib/error-report.test.ts
src/lib/error-report.ts
src/lib/error-text.test.ts
src/lib/error-text.ts
src/lib/schemas/error-report.test.ts
src/lib/schemas/error-report.ts
src/routeTree.gen.ts
src/routes/__root.tsx
src/routes/admin.listings_.$listingId_.edit.tsx
src/routes/api/error-reports.test.ts
src/routes/api/error-reports.ts
src/routes/root-error.test.tsx
src/server/answer.test.ts
src/server/answer.ts
src/server/error-reports.test.ts
src/server/error-reports.ts
src/server/supabase/upstream.test.ts
src/server/supabase/user-client.ts
src/test/provider-errors.ts
supabase/migrations/20261126233000_3b6b710a-070f-4171-a588-0a8a66cff7e4.sql
supabase/migrations/20261126233100_8c6761c8-6a1f-4bcc-bb13-84119eaa1097.sql
vite.config.ts
docs/governance/reports/cursor-bundle-8b.stop-4.md

The brief's TOLERANCES: "a red whose failure or server log names a path this lane changed is a STOP". Every red of run 45929211475 names `/api/error-reports`.
- Failed jobs: E2E lanes 2, 4 and 5, and the merged verdict.
- Green: 34 jobs, including every guard, the repeat lane (which ran `e2e/error-reports.spec.ts`), smoke, email and webkit.
- Read: `branches/cursor/bundle-8b/e2e-last-failure.md`, and the artifacts `e2e-log-2` and `e2e-log-4`. Nothing was re-run; the class is (e), mine.

## What failed, and why

**A. The failure crawl takes the reporter's own call for a page's read.**
- 15 crawl tests failed (FCR-56, 57, 58, 63, 65, 66, 67, 70, 72–78).
- FCR-70 (`/admin/`, staff) reads: "/admin/ api /api/error-reports (network): the read failed and the screen said nothing (no failure notice)", and the same for `(server)`.
- A report the browser sends during the crawl's ordinary load is recorded as one of the page's reads (`e2e/helpers/failure-crawl.ts` `record`, `readOf`). The crawl then fails it on purpose and expects a notice.
- DEC-474 makes that call silent by design: "the reporter itself failing … is silent to the person and never loops". No screen can say anything about it.

**B. The reporter's address dial runs out in CI.**
- Every browser in a lane reaches the server from one address. The crawl provokes server failures on purpose; each `server` reading is reported (as DEC-474 wants), and after 60 in the hour (`errorReportAddress`, fallback 60, `RATE_LIMIT_ERROR_REPORT_PER_HOUR`) every report is refused 429.
- The lane logs then carry three lines per refused report, and the crawl judges each a client error on the ordinary loads:
  - `[client-error] HTTP 429 POST /api/error-reports ({"error":"rateLimited","resetsAt":"2026-11-27T04:00:00+00:00"})`;
  - Chrome's own `Failed to load resource: the server responded with a status of 429 (Too Many Requests)`;
  - the sender's own `[error-report] send failed 429 rateLimited`.
- `e2e-log-2` holds 178 lines naming `/api/error-reports`.
- The gating section lists those 15 crawl tests and nothing else. "Errors outside any test": none.
- The flake ledger has one line, unrelated to this lane: SAP-1 (`e2e/sage-ad-page.spec.ts`, `webkit-390`, an ad page's colour) failed and then passed on retry.
- No E2E setting raises any dial today: `rg RATE_LIMIT_ playwright.config.ts package.json .github/workflows/ci.yml scripts/e2e*.ts e2e/global-setup.ts` finds none.

**C. Not a red; a finding from the same run: a report sent with a session that is already gone writes a server error line.**
- It sits in the "Server errors — census (DEC-083, non-gating)" section: 3 lines, shards 5 and 13.
- The line: `[WebServer] [ssr-error] /api/error-reports not signed in Auth session missing!`.
- The route's caller is optional (the brief). A bearer that is present is verified, and a gone session is refused 401 (ERRO-7, rulings 2 and 3).
- `src/server/supabase/user-client.ts:271` logs every such refusal as `[ssr-error] <path> not signed in …`, on every route. The reporter is a new caller that fires after a sign-out with the old bearer, so the server-error census counts it. The census does not gate today, but each ordinary sign-out could add an incident-shaped line in production too.

**D. Found while reading the build listing, not a red: the sender's on-demand chunk is 39.21 kB gzipped** (`dist/client/assets/error-report-send-*.js`, 165.42 kB raw, lane 2's build).
- `src/lib/error-report-send.ts` checks the report against the zod shape (`src/lib/schemas/error-report.ts`) before sending, which brings zod into the browser in that chunk.
- It is on no first download (the ceilings hold), but a phone pays about 39 KiB the first time a failure happens.
- The server parses the same shape (`defineRoute`), and the cleaner already bounds every field.

## What the brief does not decide

Each fix below touches a file SCOPE does not name, or chooses between two things DEC-474 wants.

1. **(A) Exclude the reporter's route from the crawl's reads.** `readOf` in `e2e/helpers/failure-crawl.ts` would skip `ERROR_REPORTS_PATH` (`src/lib/schemas/error-report.ts`), with a planted case. SCOPE allows `e2e/` helpers "only by a new option", and this changes what an existing helper counts. My recommendation: bring `e2e/helpers/failure-crawl.ts` into scope for this one exclusion. Per-page lines in `scripts/conformance/failure-crawl-allowlist.txt` would not hold: whether a page's load sends a report is not fixed, so a line would go stale or be missing from run to run.
2. **(B) The dial in CI.** One of these:
   - (a) The E2E server takes a raised `RATE_LIMIT_ERROR_REPORT_PER_HOUR`. That is set where the browser-test server's environment is set (`playwright.config.ts`'s webServer and/or `.github/workflows/ci.yml`'s lanes), both outside SCOPE. My recommendation, with ER-1/ER-2 still proving one report per failure.
   - (b) The harness and the crawl stop counting the reporter's own answers and console lines. Also `e2e/helpers/`, outside SCOPE. It would hide a real 429 from the reporter.
   - In either case, the sender's own refused-send line becomes a `console.warn` (src/lib, in scope), so that a refused report never reads as a client error. Chrome's own "Failed to load resource" line stays under (a), because no report is refused there.
3. **(C) A gone session on the reporter's route.** One of these:
   - (a) The browser sends its reports with no bearer, and `signed_in` is no longer recorded. The column stays and is always false, or is dropped by a follow-up migration. This departs from WHAT A REPORT HOLDS ("signed in or not").
   - (b) The route answers a gone session as an anonymous report: write it with `signed_in` false, no 401, no `[ssr-error]`. This needs `defineRoute`'s optional caller to treat a refused bearer as absent for this route, by a new option in `src/server/route.ts`, outside SCOPE.
   - (c) Leave it: the census is non-gating, and the line is named in the report's §13.
   - My recommendation: (b). It keeps "signed in or not", writes nothing a stranger asserts, and logs no incident for an ordinary sign-out. (c) is the in-scope choice if the supervisor would rather not widen SCOPE.
4. **(D) Drop zod from the browser sender** (src/lib, in scope). The sender keeps its cleaner and the field bounds, and the server's `.strict()` shape stays the authority. The sender's tests (ERSN-2, ERSN-3) are re-pointed to the payload's keys. Raised here because the code changes again after this ruling anyway.

## Also for the record

- A fifth push: the review's two fixes after the first final push. The run on `65dac93a6` (45928742041) still ran in full, because the workflow queues runs and does not cancel them. I may not cancel a run.
- The report is drafted, and its §13 already names a further finding: an expired call deadline reads `network` and is never reported (`src/lib/route-client.ts:93`, `src/lib/reader-failure.ts:191`).
- Dev has not moved: `origin/dev` = `07162fd7a`.
