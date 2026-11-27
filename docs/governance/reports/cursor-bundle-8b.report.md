# CURSOR BUNDLE 8b — our own error reports (DEC-474, Part F); allowlist keys that survive a move (INC-1293); two lanes stop conflicting on generated files (INC-1295) — report
Base: 8f6c3f2fc · Final commit: 5b0d275f8 · Brief: docs/governance/briefs/cursor-bundle-8b.md (sha256 73182a7918ae5e0f6aa07fe7afe48ed0b163f03aba466e96053530fbc4adc750)
Review: READY · 0 BLOCKER · 0 MAJOR · 0 MINOR · on 5b0d275

Dev's CI on the base: `8f6c3f2fc` SUCCESS (run 45907708105). Dev's CI on `07162fd7a`, the dev this lane carries since ruling 1: SUCCESS (run 45915411185). Dev has not moved since then: `origin/dev` = `07162fd7aace57e76618952ac4a3bd016bbad01e`.

## 1. Done / not done, by part and step

- STEP 0: done. The branch `cursor/bundle-8b` was cut from `origin/dev` at `8f6c3f2fc`. The brief and the words file were saved by `cp`, and both sha256 values equal the carrier's (stop 1). Roadmap line 3 names this brief. `scripts/conformance/briefs-allowlist.txt` held no line keyed to another brief, so nothing was removed. check-go was run at STEP 7 (below).
- STEP 1, the census: done. It is written into §2 under its key words.
- STEP 2, Part 1's migration: done. Two files, a MIGRATION stop (stop 1), applied on staging and read back by the supervisor (ruling 1).
- STEP 3, Part 1's code: done.
  - The ff-only merge of `origin/cursor/bundle-8b` (dev `07162fd7a`, Lovable 10b part 2) was taken; `b1c5bd22d` is in the history.
  - The types patch was applied by `git apply`; sha256 `f6884dfb…5888`, equal to ruling 1's.
  - Built: the cleaner, the report's shape, the dial, the write route and its server module, the server's report in `serverError`, and INC-1312 (rulings 2 and 3).
  - Built: `errorStack` (ruling 2, decision 3), the browser trigger and its sender with the per-visit limits, the notice's report, the crash boundary's report, and the two listeners.
  - Built: the staff readers and their door-words family, the one key, the reporter census with its planted cases, and `e2e/error-reports.spec.ts`.
  - Stops 2 and 3 fell inside this step (§10).
- STEP 4, Part 2: done.
  - Built: the kit's place key (`placeOf`, `readPlacedAllowlist`, CF-KIT-10), every line-keyed allowlist re-keyed, the staff rules re-keyed, and the nav-alerts switch onto `permissionOf` (DEC-484) with its ceilings.
- STEP 5, Part 3: done.
  - (a) decided "the maps leave the tree": all three proofs passed.
  - (b) the ceilings file's layout, with RBL-1 and RBL-2.
- STEP 6, the docs: done (`docs/features/error-reports.md` (new), `ci-guards.md`, `doors.md`, `performance-strategy.md`, `translations.md`).
- STEP 7: done. The local-backend browser run was NOT RUN (§12).
- STEP 8: pushed. The pull request stays a draft as the brief says. CI was read as §11 states.
  - The run on `d12430121` went red in the failure crawl (stop 4). Ruling 4 was built in `c095c43bf` and `5b0d275f8`:
    - the crawl's read recorder leaves out the reporter's route (decision 1);
    - the crawl answers its pages' reports itself, and a refused send is a warning (decision 2);
    - the browser sender drops zod (decision 4).
  - The gate and the review ran again on the new code tree, and it was pushed once.
- STEP 9: this report.

## 2. Files changed

`git diff --name-only 8f6c3f2fc`, read on the final code commit `5b0d275f8` (170 lines; the report commit adds this file as the 171st), holds two kinds of path:
- the lane's own files, `git diff --name-only origin/dev HEAD` (122 lines);
- 48 files of dev's own that ruling 1's fast-forward brought in (merge `86c8840a9`, dev `07162fd7a`, Lovable 10b part 2). These are marked `(dev)`.

Every lane path is in SCOPE, in the standing allowance, or a guard-demanded mechanical edit named in §10.

```
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
docs/governance/briefs/cursor-bundle-8b-ruling-4.md
docs/governance/briefs/cursor-bundle-8b-types.patch
docs/governance/briefs/cursor-bundle-8b-words.json
docs/governance/briefs/cursor-bundle-8b.md
docs/governance/reports/cursor-bundle-8b.stop-1.md
docs/governance/reports/cursor-bundle-8b.stop-2.md
docs/governance/reports/cursor-bundle-8b.stop-3.md
docs/governance/reports/cursor-bundle-8b.stop-4.md
docs/tracking/intentional-deletions.txt
e2e/error-reports.spec.ts
e2e/helpers/failure-crawl-judge.ts
e2e/helpers/failure-crawl.ts
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
scripts/conformance/door-words-allowlist.txt (dev)
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
src/features/admin-ai/ai-page.test.tsx (dev)
src/features/admin-ai/ai-page.tsx (dev)
src/features/admin-attributes/attributes-page.test.tsx (dev)
src/features/admin-attributes/attributes-page.tsx (dev)
src/features/admin-categories/categories-page.tsx (dev)
src/features/admin-categories/category-refusals.test.tsx (dev)
src/features/admin-categories/category-refusals.ts (dev)
src/features/admin-countries/countries-page.tsx (dev)
src/features/admin-errors/errors-refusals.test.ts
src/features/admin-errors/errors-refusals.ts
src/features/admin-errors/errors-service.test.ts
src/features/admin-errors/errors-service.ts
src/features/admin-listings/edit-listing.test.ts (dev)
src/features/admin-listings/listing-page.tsx (dev)
src/features/admin-listings/listing-refusals.ts (dev)
src/features/admin-listings/listings-page.test.tsx (dev)
src/features/admin-listings/listings-page.tsx (dev)
src/features/admin-locations/locations-page.tsx (dev)
src/features/admin-monetisation/monetisation-page.test.tsx (dev)
src/features/admin-monetisation/monetisation-page.tsx (dev)
src/features/admin-overview/locations-overview.test.tsx (dev)
src/features/admin-overview/locations-overview.tsx (dev)
src/features/admin-screening/screening-decisions.test.tsx (dev)
src/features/admin-screening/screening-page.tsx (dev)
src/features/admin/legal/legal-editor-form.tsx (dev)
src/features/admin/legal/legal-facts-card.tsx (dev)
src/features/admin/legal/legal-form-gates.test.tsx (dev)
src/features/admin/legal/legal-page.tsx (dev)
src/features/admin/legal/legal-version-view.tsx (dev)
src/features/admin/nav-alerts.test.tsx
src/features/admin/nav-alerts.ts
src/features/admin/roles/permission-matrix.tsx (dev)
src/features/admin/roles/role-detail.test.tsx (dev)
src/features/admin/roles/role-detail.tsx (dev)
src/features/admin/roles/roles-list.tsx (dev)
src/features/admin/translations/consoles-fields.test.tsx (dev)
src/features/admin/translations/languages-page.tsx (dev)
src/features/admin/translations/languages-stats.test.tsx (dev)
src/features/admin/translations/string-editor-readonly.test.tsx (dev)
src/features/admin/translations/strings-page-counts.test.tsx (dev)
src/features/admin/translations/strings-page.tsx (dev)
src/features/admin/translations/transfer-bar.test.tsx (dev)
src/features/admin/translations/transfer-bar.tsx (dev)
src/features/admin/users/staff-form-gates.test.tsx (dev)
src/features/admin/users/user-detail.tsx (dev)
src/features/permissions/door-permissions.generated.ts
src/features/posting/step-details-assist.test.tsx (dev)
src/features/posting/step-details.tsx (dev)
src/features/posting/wizard.tsx (dev)
src/i18n/locales/am-admin.ts
src/i18n/locales/am-base.ts (dev)
src/i18n/locales/am-member.ts (dev)
src/i18n/locales/en-admin.ts
src/i18n/locales/en-base.ts (dev)
src/i18n/locales/en-member.ts (dev)
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
src/routes/admin.listings_.$listingId_.edit.tsx (dev)
src/routes/api/error-reports.test.ts
src/routes/api/error-reports.ts
src/routes/root-error.test.tsx
src/server/answer.test.ts
src/server/answer.ts
src/server/error-reports.test.ts
src/server/error-reports.ts
src/server/supabase/upstream.test.ts
src/server/supabase/user-client.ts
src/test/failure-crawl.test.ts
src/test/provider-errors.ts
supabase/migrations/20261126233000_3b6b710a-070f-4171-a588-0a8a66cff7e4.sql
supabase/migrations/20261126233100_8c6761c8-6a1f-4bcc-bb13-84119eaa1097.sql
vite.config.ts
```

`e2e/helpers/failure-crawl.ts`, `e2e/helpers/failure-crawl-judge.ts` and `src/test/failure-crawl.test.ts` entered scope by ruling 4.

New files of the lane's own, proven by `git ls-files` (`git diff --name-only --diff-filter=A origin/dev HEAD`, 36 lines; the four other added paths in `git diff --diff-filter=A 8f6c3f2fc` are dev's tests):

```
$ git ls-files -- <the 36 added paths>
docs/features/error-reports.md
docs/governance/briefs/cursor-bundle-8b-ruling-1.md
docs/governance/briefs/cursor-bundle-8b-ruling-2.md
docs/governance/briefs/cursor-bundle-8b-ruling-3.md
docs/governance/briefs/cursor-bundle-8b-ruling-4.md
docs/governance/briefs/cursor-bundle-8b-types.patch
docs/governance/briefs/cursor-bundle-8b-words.json
docs/governance/briefs/cursor-bundle-8b.md
docs/governance/reports/cursor-bundle-8b.stop-1.md
docs/governance/reports/cursor-bundle-8b.stop-2.md
docs/governance/reports/cursor-bundle-8b.stop-3.md
docs/governance/reports/cursor-bundle-8b.stop-4.md
e2e/error-reports.spec.ts
scripts/conformance/error-reports-allowlist.txt
scripts/conformance/error-reports.test.ts
scripts/conformance/error-reports.ts
scripts/i18n-usage-map.test.ts
scripts/route-budgets.test.ts
src/features/admin-errors/errors-refusals.test.ts
src/features/admin-errors/errors-refusals.ts
src/features/admin-errors/errors-service.test.ts
src/features/admin-errors/errors-service.ts
src/lib/error-clean.test.ts
src/lib/error-clean.ts
src/lib/error-report-send.test.ts
src/lib/error-report-send.ts
src/lib/error-report.test.ts
src/lib/error-report.ts
src/lib/schemas/error-report.test.ts
src/lib/schemas/error-report.ts
src/routes/api/error-reports.test.ts
src/routes/api/error-reports.ts
src/server/error-reports.test.ts
src/server/error-reports.ts
supabase/migrations/20261126233000_3b6b710a-070f-4171-a588-0a8a66cff7e4.sql
supabase/migrations/20261126233100_8c6761c8-6a1f-4bcc-bb13-84119eaa1097.sql
```

Deleted, declared in `09547a8fb` (the `[intentional-delete]` marker, with both lines in `docs/tracking/intentional-deletions.txt`): `docs/generated/i18n-usage.json` and `public/i18n-usage.json`.

### The census (STEP 1), by key word

**consumers / definition — fix 1.**
- Failure readings of kind `server` built by hand (`rg 'kind: "server"' src`, tests aside):
  - `src/components/shell/failure-reason.ts:123` is the notice's own reading; it reports through `useFailureKind`.
  - `src/features/admin/translations/ai-bulk-bar.tsx:52` (`COUNT_UNREAD`) and `src/features/admin/translations/delete-language-dialog.tsx:54` (`PREVIEW_EMPTY`) bypass the reporter. Both files are outside scope, so each is an allowlist line (§7, §13).
  - Hand-built readings of other kinds never report: `goneReading` (`failure-reason.ts:191`, used at `src/features/posting/wizard.tsx:885`) and `rateReading` (`failure-reason.ts:196`, used at `src/features/posting/step-specifications.tsx:1203,1219`).
- Crash boundaries (`rg "errorComponent|componentDidCatch" src`):
  - `src/routes/__root.tsx:390` (`ErrorComponent`) reports at `__root.tsx:261`.
  - `src/routes/legal.$kind.tsx:53`, `src/routes/legal.publishing.tsx:68`, `src/routes/privacy.tsx:37` and `src/routes/terms.tsx:37` bypass it. The legal pages are on SCOPE's never-list, so these are allowlist lines (§13).
- 500s: every route 500 goes through `serverError` (`src/server/answer.ts:192` reports). Four bypass it, each an allowlist line `| INC-1278`, because moving them would change the answer a client reads:
  - `src/server.ts` (`normalizeCatastrophicSsrResponse`, `fetch`) answers an HTML error page;
  - `src/server/ad-photo.ts` (`adPhotoResponse`) answers its own refusal shape;
  - `src/server/supabase/user-client.ts` (`refuseUserClient`): `serverError`'s answer carries an incident this one does not.
- An expired deadline reads as follows. `src/lib/route-client.ts:93` turns an unreachable call (`reason: "timeout"`) into `new TypeError("timeout")`, which the reader classes `network`. So a call whose own deadline expired reads `network` even while online, and is not reported. A server-side deadline answers a 5xx status, which reads `server` (`failure-reason.ts:88`) and is reported. §10 and §13 say why this stays.
- The server render's line (`[ssr-error] render`, `src/lib/error-capture.ts`) is not reported. The file is outside scope (§13), and the `render` kind is reserved in the table.
- INC-1312: `src/server/supabase/user-client.ts` (rulings 2 and 3; §3).
- The two signed-out names: `src/lib/refusal.ts:177` (`signedOut` → code `notSignedIn`) and `src/features/admin/translations/translations-service.ts:404,430,431,501`. Both files are outside scope, and each name is read by a different reader, so neither changes (§13).
- `src/lib/lovable-error-reporting.ts` `reportLovableError` is a K2 sibling: named, not changed.

**consumers / definition — fix 2.**
- These allowlists carried `path:<n>` keys and are re-keyed:
  - door-args (`door-args.test.ts`), door-answers (`door-answers.ts`), provider-errors (`provider-errors.test.ts`), refusal-readers (`refusal-readers.test.ts`);
  - listing-seed (`listing-seed.test.ts`), sql-writes (`sql-writes.test.ts`), e2e-waits (`e2e-waits.test.ts`), mailbox (`mailbox.test.ts`);
  - live-regions (`live-regions.test.ts`), planted-proofs (`planted-proofs.test.ts`), proof-readers (`proof-readers.test.ts`), locale-imports (`locale-imports.test.ts`), listing-designation (`listing-designation.test.ts`);
  - the staff rules (`scripts/doors/staff-rules.txt`, read by `staff-rules.ts` and `check-doors.ts`).
- After the change, `rg -n "^[^#][^ |]*:[0-9]+ \|" scripts -g '*allowlist*' -g staff-rules.txt` finds no line.
- Landed-migration lines (the two `20260809010130_…sql` lines in `mailbox-allowlist.txt`) are re-keyed by text too: the census does not prove a file landed and unchanged.
- Some of these files held no line yet (e2e-waits, listing-designation, live-regions, locale-imports, planted-proofs, proof-readers, sql-writes). Their readers took the line grammar, so the grammar comment and the reader moved to the place key.

**consumers / definition — fix 3.**
- The maps' readers and writers:
  - `scripts/i18n-usage-map.ts` (writer; now the build's plugin) and `scripts/i18n-map-guard.ts` (guard);
  - `package.json` `i18n:usage`, and `i18n:map-guard`, which `e2e:local` runs (unchanged; with no copy named, the guard checks that the generator answers keys);
  - `.github/workflows/ci.yml`'s `i18n-usage-map` job; `scripts/ci/turn-checks.ts`; `scripts/ci/docs-only.ts` and its test;
  - the deletions guard (`docs/tracking/intentional-deletions.txt`);
  - `src/features/admin/translations/use-translations.ts`, which reads `/i18n-usage.json` and is unchanged: the same address is served;
  - `.prettierignore:62–66`, `.cursor/rules/10-code-laws.mdc:101`, `.cursor/rules/00-protocol.mdc:183`, `CLAUDE.md:89`, `docs/governance/lovable-knowledge.md` A6, and `.claude/hooks/land.ts`, `lib.ts`, `post-edit.ts`, `.claude/rules/*`, `.claude/skills/turn-report/SKILL.md`. All of these are outside scope (§13).
- The ceilings file's writers: `scripts/route-budgets.mjs` (by hand, DEC-296), read by `scripts/check-bundle-size.mjs` and `scripts/ci/lovable-branch-guard.sh` (its `CEILING_LINE`).

**tests.**
- Each consumer's tests are listed in §5.
- Tests asserting `serverError`'s body or log line: ANS-1…16 (`src/server/answer.test.ts`).
- A reading's kind: FR-U1…19.
- Allowlist keys: CF-KIT-1…10, and each re-keyed census's test.
- The maps' presence: CF-DOCS-1 (re-titled) and CF-DOCS-10; TCK-13 (new) and UMAP-6.

**lists.**
- The door manifest went from 227 to 230 lines (three `staff-reader` lines, ruling 1 decision 1).
- The staff rules were re-keyed.
- The public-surface allowlist went from 237 to 240 (ruling 1 decision 2).
- The dial registry gained one line (`errorReportAddress`).
- `scripts/conformance/wired.test.ts` names the reporter census.
- The guards' register (`docs/features/ci-guards.md`) has the ERCE line.
- The briefs allowlist: no line.
- The e2e selector (`scripts/e2e-select.ts`) and `scripts/ci/lane-weights.json` gained the new spec. A guard demanded it (§10).
- Exact-list assertions: the resource list (`admin.roles.perm.resource.errors`), the door-codes and door-permissions generated lists, the `{ recorded: true }` answer (ERRO-1), and TCK-13's list of Build steps.
- Missed by this census, found by CI (stop 4): the failure crawl, which records every call a page makes (`readOf` in `e2e/helpers/failure-crawl-judge.ts`) and forces failures that the reporter then reports. Ruling 4 (S820) adds it: `readOf` leaves the route out (FCJ-1), and the crawl answers its pages' reports itself.

**old-file-readers.**
- Every census that reads a re-keyed line reads it through `readPlacedAllowlist` (kit.ts).
- The maps by path: listed under fix 3 above.

**second-readers.**
- `rg 'vi\.mock\(.*(server/answer|failure-reason|load-once)' src e2e scripts` finds none.
- Dynamic imports of the new modules:
  - `src/routes/api/error-reports.ts:33` and `src/server/answer.ts:174` (`@/server/error-reports`);
  - `src/lib/error-report.ts:21` (`loadOnce` of `@/lib/error-report-send`);
  - and their tests.

**chunk-graph.**
- The entry carries `src/lib/error-report.ts` (the trigger and the listeners, about 0.2 KiB).
- The sender (`error-report-send.ts`) and the cleaner (`error-clean.ts`) are not in the entry closure. They arrive through `loadOnce` when a failure happens; the `step3-size.log` build shows this.
- Since ruling 4 the sender's chunk holds no zod. It takes the shape's types only, and the route's address from `error-clean.ts`; the shape module re-exports that address for its other readers. The sender's chunk before and after is in §3.

**environments.**
- The plugin's build half runs only in the `client` environment (`applyToEnvironment`); ssr and nitro are untouched (UMAP-3).
- The dev server answers `/i18n-usage.json` from its middleware (UMAP-4, and the live probe in §5).

**mechanisms.** Read before building:
- `failureKind`, `useFailureKind`, `readFailure`;
- `ErrorComponent`;
- `serverError`, `logRouteError`;
- `defineRoute` (byte ceiling, `rate … when: "beforeParse"`), `spend`;
- `clientAddress` / `hashAddress` (through the route's `key: "address"`);
- `door_context` / `door_refuse` / `door_refused`, the manifest grammar;
- `cursor.ts`, the prune form, `loadOnce`;
- the kit (`kit.ts`), the generator and its guard.

**first-download.** The table is in §5. No page is within 0.3 KiB of its ceiling (after ruling 4's two raises, §10).

**premises.**
- (a) The build exposes no commit to the browser or the server (`rg -i "app_?version|appVersion"` finds only `src/lib/error-report-send.ts:72`, `appVersion: null`). It is OPEN: ruling 1 decision 6 and ACT-034.
- (b) The repository names no builder command for the hosting platform. `package.json:8` is `"build": "vite build"`. The plugin sits in `vite.config.ts`, so any host that runs Vite's build runs it. A build with no bun on PATH (node v22.23.4) emitted the map. That the platform runs `vite build` is inferred, not cited (§12).
- (c) The role that holds every permission today: `admin` holds the grants, and `super_admin` holds them through `is_super_admin` (file B, stop 1).
- Wrong premises found: INC-1312's class (stop 2, ruling 2); ruling 2's predicate (stop 3, ruling 3); the doors' class and the public-surface expectation (stop 1, ruling 1).

**callee-codes.** In stop 1: `door_context`'s refusals (`notSignedIn`, `permissionDenied`, `accountDeactivated`, `permissionDenied:scope`, `step-up required`), and each door's own `badValue:*`. The readers throw each as the typed failure (ERDR-2), and the door-words family words each gate code (ERFW-1).

**cell-meaning.** `staff-reader`, with no dial: a read of at most 200 groups or 100 rows, nothing to ration. Country `global`: error records name no country.

**existing-rows.** `errors:view` is granted to `admin` only. No other role gains or loses anything, and no existing table changes (stop 1; ruling 1's read-back).

**gate-reach.**
- The three doors are reached by `src/features/admin-errors/errors-service.ts` and its test. No spec reaches them; the Errors page is Lovable's next lane.
- The table is reached only by the service role (`record_error_report`, the cores); no browser role reaches it.

**user-cases.**
- Write route:
  - success: ERRO-1;
  - over the ceiling: ERRO-2 (by header) and ERRO-3 (by counting);
  - dial spent: ERRO-4;
  - bad shape, a server kind or not JSON: ERRO-5;
  - database failing: ERRO-6 (503 `reportNotRecorded`);
  - signed in, or a refused bearer: ERRO-7;
  - the server cleans again: ERRO-8.
- Doors:
  - success and refusals: stop 1's proofs (b) and (c), and ERDR-1…5;
  - invalid input: the doors' `badValue` proofs, and ERDR-6 for the window;
  - signed out: stop 1 proof (b), `notSignedIn`.
- Browser: ERSN-1…6, ERTR-1…4, FR-U17…19, REV-2, ER-1 and ER-2.
- The failure crawl: FCJ-1 (its read recorder leaves the route out), and the fifteen crawl tests that went red in run 45929211475, re-run on staging (§5).

**findings.** In §13.
- INC-1314: the lookup's line on this lane's migration-stop run (45913849134, job 140228256725) reads "DEC-365 lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-7465f9344c64… (0 read)". It counted correctly: that push carried code (the two migrations), so its tree had no green run, and the lanes ran rightly. INC-1314's case, a records-only push, did not arise on this lane before this report.

**queued.** `rg "bundle 8b|Cursor 8b|cursor-bundle-8b|DEC-474|INC-1293|INC-1295"` across briefs, reports, features and the roadmap:
- INC-1312 (8a ruling 2): built here.
- INC-1293 (cursor-bundle-6 ruling 3): built here.
- INC-1295 (7a ruling 3, 7b ruling 1, DEC-481): built here.
- DEC-474 Part F (7b, 7c and 8a briefs): built here.
- The Errors page (Lovable): left, next in DEC-479's order.

## 3. Behaviour contract — answer tables before → after

| Touched | At the base | Now |
|---|---|---|
| `POST /api/error-reports` (new) | none | Checked in this order: the byte ceiling (413), the optional caller (a refused bearer answers 401 before the dial), the address dial `errorReportAddress` spent before the body is read (429), the strict shape (400), then `{ recorded: true }` 200. A failed write answers 503 `reportNotRecorded`. A refused report writes nothing. |
| `serverError` (`src/server/answer.ts`) | Answers 500 with its envelope and logs `[ssr-error]` | The same answer and log line. It also reports once, as kind `route`, code 500, by its path (`reportFailureLater`, never awaited, never thrown). |
| `userClientFromRequest` / `refuseUserClient` | An `AuthApiError` (any status, including 505–519, 531–599, 429 and a body that is not JSON) answered `notSignedIn` 401; a retryable error answered `upstream` 503, unreported. | `notSignedIn` 401 only for `sessionGone(error)` or an `AuthApiError` with a status of 400–499 other than 429. Every other auth error answers `upstream` 503 and is reported once (kind `upstream`). `missingBearer`, `serverEnv`, the answer with no user and the deactivated branch are unchanged. |
| `useFailureKind` | A reading | The same reading. A `server` reading is reported once, after the reader has arrived. A refusal or an offline reading is never reported. |
| Root `ErrorComponent` | Draws the crash view and calls `reportLovableError` | The same, and it reports once as kind `crash`. |
| Client entry | none | `listenForFailures(window)`: an unhandled `error` (with an error object) and an `unhandledrejection` are reported as `unhandled`. |
| The browser's sender (`src/lib/error-report-send.ts`, ruling 4) | none | Sends the cleaned report as built: no zod parse in the browser, so the server's `.strict()` shape is the one judge. A report the route refuses is logged by `console.warn` as `[error-report] send failed <status> <code>`. An unreachable or throwing send stays `console.error`. |
| The failure crawl (`e2e/helpers/failure-crawl.ts`, `failure-crawl-judge.ts`, ruling 4) | Recorded every `/api/` call but the finder's | `readOf` also leaves out `ERROR_REPORTS_PATH`. Every crawled page's POST to it gets `{ recorded: true }` (200) from the crawl's own route, registered before the first load and removed in `finally`. Other methods fall through. |
| Staff readers `readErrorGroups` / `readErrorOccurrences` / `readErrorStats` (new) | none | Each calls its door. A refusal is thrown as the typed failure, and an out-of-shape answer is refused. |
| Nav alerts (`legal_review_overdue`) | Switch `legal:view` written by hand | Switch `permissionOf({ door: "legal_review_overdue" })`. The same permission, read from the manifest's line (NAV-ALERT-4). |
| The word maps | Committed; regenerated by hand | Built: the client build emits `/i18n-usage.json` and writes `docs/generated/i18n-usage.json`, and the dev server answers `/i18n-usage.json`. The console reads the same address. |
| `docs-only.ts` | `docs/generated/` counted as records | That exclusion is gone; the maps are no longer in the tree. |
| `turn-checks.ts` | A special case for map drift | The map job's Build reuses build-and-check's build, and its guard judges the build's copies. |

**The sender's on-demand chunk** (ruling 4 decision 4), from the builds' own size lines:

| build | before (`d12430121`'s code tree) | after (`5b0d275f8`) |
|---|---|---|
| E2E build (`VITE_E2E=1`, what stop 4 quoted) | 165.42 kB, gzip 39.21 kB | 8.02 kB, gzip 3.44 kB |
| production (`bun run build`) | 82.87 kB, gzip 24.51 kB | 3.44 kB, gzip 1.76 kB |

The "before" production line comes from a build of HEAD `2543064b2`'s exact tree under `/tmp/ethio-scratch/cursor-bundle-8b/head-tree/`. A first try with only the type-only import left zod in the chunk (82.74 kB, `ZodError` present): the shape module came in whole for the route's address. The address moved to `error-clean.ts` (§10). The final chunk holds neither `ZodError` nor `safeParse`.

## 4. Censuses

The full census is in §2 under its key words. Every grep named there was run in this turn, and its hits are listed with file:line. The greps that found nothing:
- `vi.mock` of the three modules;
- a `path:<n>` allowlist key after Part 2;
- a build-exposed app version.

## 5. Tests

**Added**, by file:
- ECL-1…7 (`src/lib/error-clean.test.ts`)
- ERSH-1…4 (`src/lib/schemas/error-report.test.ts`)
- ERRO-1…8 (`src/routes/api/error-reports.test.ts`)
- ERSV-1…7 (`src/server/error-reports.test.ts`)
- ANS-15, ANS-16 (`src/server/answer.test.ts`)
- ERRT-9 (`src/lib/error-text.test.ts`)
- ERTR-1…4 (`src/lib/error-report.test.ts`)
- ERSN-1…6 (`src/lib/error-report-send.test.ts`)
- FR-U17…19 (`src/components/shell/failure-reason.test.ts`)
- REV-2 (`src/routes/root-error.test.tsx`)
- ERDR-1…6 (`src/features/admin-errors/errors-service.test.ts`)
- ERFW-1 (`src/features/admin-errors/errors-refusals.test.ts`)
- ERCE-1…4 (`scripts/conformance/error-reports.test.ts`)
- CF-KIT-10 (`scripts/conformance/kit.test.ts`)
- NAV-ALERT-4 (`src/features/admin/nav-alerts.test.tsx`)
- UMAP-1…6 (`scripts/i18n-usage-map.test.ts`)
- RBL-1, RBL-2 (`scripts/route-budgets.test.ts`)
- TCK-13 (`scripts/ci/turn-checks.test.ts`)
- ER-1, ER-2 (`e2e/error-reports.spec.ts`)

**Changed:**
- UP-8 (`src/server/supabase/upstream.test.ts`) now holds the cases of rulings 2 and 3.
- CF-DOCS-1 was re-titled "every record shape passes; code and config never do", and the two map paths were dropped. CF-DOCS-10 lost its generated-file line, because the maps left the tree.
- The re-keyed censuses' tests read keys through `readPlacedAllowlist`. Their titles are unchanged.
- Ruling 4:
  - FCJ-1 (`src/test/failure-crawl.test.ts`) gains one case beside the finder's: a POST to `ERROR_REPORTS_PATH` reads `null`.
  - ERSN-2 and ERSN-3 (`src/lib/error-report-send.test.ts`) are re-pointed to the payload's keys. The reason: the sender no longer parses, so what it sends is the report as built. ERSN-2 asserts both built reports (the full one and the odd one) hold exactly the shape's keys and pass `ErrorReportBody`. ERSN-3 asserts the same of the `json` handed to `callRoute`. Before, ERSN-2 parsed the full report only, and ERSN-3 checked three keys of what the sender had parsed.
  - ERSN-6 is re-titled "a refused send is warned, an unreachable or throwing one logged, …" and splits its one list: the 429 on `console.warn`, the unreachable and the thrown send on `console.error`.

**Red-first:**
- UP-8 against the base's `user-client.ts`, written into place from `git show 8f6c3f2fc:…` and put back from a copy (`git diff --quiet` clean), re-run for this report. It fails at its first case: "the captured 500: expected "vi.fn()" to be called 1 times, but got 0 times". The per-case answers on the base:
  - the captured 500: `upstream`, 0 reports;
  - a 505 with a JSON body: `notSignedIn`;
  - a 531 with a JSON body: `notSignedIn`;
  - a 505 with a body that is not JSON: `notSignedIn`;
  - a 429: `notSignedIn`;
  - a session gone (403) and an expired session (403 and 401): `notSignedIn`. These are the expected answers; per ruling 3, no red-first is owed for them.
- Statuses with no captured body:
  - the 505 and 531 cases send `unexpected_failure`'s captured body at those statuses;
  - the `session_not_found` case sends its captured body (400, from the refresh path) at 403;
  - the 401 expired-session case sends `session_expired`'s captured body at 401.
- The 429 case sends `over_request_rate_limit`'s captured body at its own status.
- The non-JSON 505 case sends an HTML page (`page(505)`), because no captured auth body that is not JSON exists. Ruling 2 names that case. PROVERR-1 admitted it.
- RBL-1 and RBL-2 fail on HEAD's `scripts/route-budgets.mjs`, the side-by-side layout. Both failed, and both pass on the spaced file.
- CF-KIT-10 is planted: no match fails, two matches fail, and a line inserted above passes. The re-key proof: door-args with a line inserted above `user-client.ts:11` passes on the new key (3 passed), and HEAD's line key fails (1 failed, 2 passed).
- ERCE-3 and ERCE-4 plant files. A server reading that does not report, a refusal that reports, a boundary that does not report and a 500 outside `serverError` each fail; their twins pass.
- UMAP-5 and a live run of `scripts/i18n-map-guard.ts`: a planted stale copy and a missing copy each exit 1.
- FCJ-1 against HEAD `2543064b2`'s `failure-crawl-judge.ts` (written from `git show`, put back from a copy): "AssertionError: expected { key: 'api /api/error-reports', …(1) } to be null", 1 failed, 11 passed. On the new judge: 12 passed.
- ERSN-6 against HEAD's `error-report-send.ts` (the same way, `git diff --stat HEAD` after the restore showing only the intended change): 1 failed (ERSN-6), 5 passed. On the new sender: 6 passed.

**Part 3's proofs:**
- `bun run build` lists `dist/client/i18n-usage.json` (220,372 bytes) and `docs/generated/i18n-usage.json` (220,372 bytes). The asset sits in `dist/server/index.mjs`'s asset table.
- A build with no bun on PATH ("bun: not on PATH", "bunx: not on PATH", node v22.23.4) lists the same.
- The dev server's `/i18n-usage.json` answered status 200, `application/json; charset=utf-8`, 220,372 bytes, equal to a fresh generation, and the app's page still answered 200.
- The build's copy equals the base's committed map byte for byte.
- The generator alone takes 0.27, 0.07 and 0.07 s (three runs, `/usr/bin/time -p`). That is what each build gains.

**Unit totals:**
- `bunx vitest run scripts --maxWorkers=2` on the final tree: 150 files, 838 passed, 1 skipped.
- `bun run typecheck`: green.
- `bun run lint`: green.

**`bun run checks`** on the final code commit `5b0d275f8` (ruling 4's gate, whole):
- fast: `checks (fast): 25 PASS · 0 FAIL · 762s`
- last: `checks: 36 PASS · 0 FAIL · 26 NOT RUN · 830s`

The first gate, on `c1afdf00c`, read `checks (fast): 26 PASS · 0 FAIL · 738s` and `checks: 37 PASS · 0 FAIL · 25 NOT RUN · 803s`. The step `i18n-usage-map › Install dependencies` read PASS (0s) then; `9178412b8` makes it NOT RUN like every other Install step (§10), which is the one PASS that became a NOT RUN.

The NOT RUNs, each with the runner's reason:
- scope: decide whether the lanes run, and index the code tree (both read GitHub's Actions artifacts).
- build-and-check: workflow lint (the pinned binary is linux/x64), and Install dependencies (installed already).
- component-tests, i18n-usage-map and bundle-budget: Install dependencies (the same reason).
- secrets-scan (the pinned binary is linux/x64).
- dependency-audit: Install and Audit (the advisory service is not reachable).
- e2e-preflight: four steps (they need the staging credentials).
- e2e: six steps (they merge GitHub's lane artifacts).
- promote: four steps (only CI promotes).
- semgrep: upload SARIF, and its warning (GitHub only).

After ruling 4's two commits, before the gate: `bun run typecheck` and `bun run lint` green; the touched units (seven files) 48 passed; `bunx vitest run scripts --maxWorkers=2` 150 files, 838 passed, 1 skipped; `node scripts/check-bundle-size.mjs` "Bundle budget OK." after the two raises.

**Changed tests, each run alone** (`changed tests alone`: 51 files in 79.4 s, all passed):

- `scripts/ci/docs-only.test.ts`: 11 passed, passed (2.0 s)
- `scripts/ci/turn-checks.test.ts`: 18 passed, passed (2.0 s)
- `scripts/conformance/door-answers.test.ts`: 3 passed, passed (2.6 s)
- `scripts/conformance/door-args.test.ts`: 3 passed, passed (2.1 s)
- `scripts/conformance/e2e-waits.test.ts`: 2 passed, passed (1.0 s)
- `scripts/conformance/error-reports.test.ts`: 4 passed, passed (4.8 s)
- `scripts/conformance/kit.test.ts`: 16 passed, passed (2.5 s)
- `scripts/conformance/listing-designation.test.ts`: 3 passed, passed (2.9 s)
- `scripts/conformance/listing-seed.test.ts`: 4 passed, passed (1.4 s)
- `scripts/conformance/live-regions.test.ts`: 2 passed, passed (1.3 s)
- `scripts/conformance/locale-imports.test.ts`: 4 passed, passed (1.6 s)
- `scripts/conformance/mailbox.test.ts`: 5 passed, passed (1.8 s)
- `scripts/conformance/planted-proofs.test.ts`: 2 passed, passed (1.3 s)
- `scripts/conformance/proof-readers.test.ts`: 5 passed, passed (3.7 s)
- `scripts/conformance/provider-errors.test.ts`: 2 passed, passed (2.1 s)
- `scripts/conformance/refusal-readers.test.ts`: 12 passed, passed (4.5 s)
- `scripts/conformance/sql-writes.test.ts`: 3 passed, passed (2.1 s)
- `scripts/doors/check-doors.test.ts`: 22 passed, passed (5.0 s)
- `scripts/i18n-usage-map.test.ts`: 6 passed, passed (0.8 s)
- `scripts/route-budgets.test.ts`: 2 passed, passed (1.2 s)
- `src/components/shell/failure-reason.test.ts`: 19 passed, passed (0.9 s)
- `src/features/admin-ai/ai-page.test.tsx`: 3 passed, passed (1.2 s)
- `src/features/admin-attributes/attributes-page.test.tsx`: 4 passed, passed (1.1 s)
- `src/features/admin-categories/category-refusals.test.tsx`: 7 passed, passed (0.9 s)
- `src/features/admin-errors/errors-refusals.test.ts`: 1 passed, passed (0.8 s)
- `src/features/admin-errors/errors-service.test.ts`: 6 passed, passed (0.9 s)
- `src/features/admin-listings/edit-listing.test.ts`: 12 passed, passed (0.9 s)
- `src/features/admin-listings/listings-page.test.tsx`: 2 passed, passed (1.2 s)
- `src/features/admin-monetisation/monetisation-page.test.tsx`: 7 passed, passed (1.7 s)
- `src/features/admin-overview/locations-overview.test.tsx`: 1 passed, passed (0.9 s)
- `src/features/admin-screening/screening-decisions.test.tsx`: 20 passed, passed (1.5 s)
- `src/features/admin/legal/legal-form-gates.test.tsx`: 5 passed, passed (1.2 s)
- `src/features/admin/nav-alerts.test.tsx`: 5 passed, passed (1.0 s)
- `src/features/admin/roles/role-detail.test.tsx`: 3 passed, passed (0.9 s)
- `src/features/admin/translations/consoles-fields.test.tsx`: 6 passed, passed (1.3 s)
- `src/features/admin/translations/languages-stats.test.tsx`: 1 passed, passed (1.0 s)
- `src/features/admin/translations/string-editor-readonly.test.tsx`: 1 passed, passed (1.1 s)
- `src/features/admin/translations/strings-page-counts.test.tsx`: 1 passed, passed (1.1 s)
- `src/features/admin/translations/transfer-bar.test.tsx`: 1 passed, passed (0.9 s)
- `src/features/admin/users/staff-form-gates.test.tsx`: 5 passed, passed (1.1 s)
- `src/features/posting/step-details-assist.test.tsx`: 3 passed, passed (0.9 s)
- `src/lib/error-clean.test.ts`: 7 passed, passed (0.9 s)
- `src/lib/error-report-send.test.ts`: 6 passed, passed (0.9 s)
- `src/lib/error-report.test.ts`: 4 passed, passed (1.0 s)
- `src/lib/error-text.test.ts`: 9 passed, passed (1.3 s)
- `src/lib/schemas/error-report.test.ts`: 4 passed, passed (0.8 s)
- `src/routes/api/error-reports.test.ts`: 8 passed, passed (0.9 s)
- `src/routes/root-error.test.tsx`: 2 passed, passed (1.2 s)
- `src/server/answer.test.ts`: 19 passed, passed (1.0 s)
- `src/server/error-reports.test.ts`: 7 passed, passed (0.9 s)
- `src/server/supabase/upstream.test.ts`: 8 passed, passed (1.3 s)

After those runs, `errors-service.ts` and `error-reports.ts` changed in the review. Their tests were run again: `errors-service.test.ts` 6 passed, `error-reports.test.ts` 7 passed, and `scripts/doors` 28 passed.

Ruling 4's changed tests, each alone on `5b0d275f8`: `src/test/failure-crawl.test.ts` 12 passed; `src/lib/error-report-send.test.ts` 6 passed.

**Browser:** `bun run e2e:local -- e2e/error-reports.spec.ts --grep "ER-1|ER-2"` on ethio-staging, `mobile-360` and `desktop-1280`, with 0 retries:

```
  ✓  2 [desktop-1280] › e2e/error-reports.spec.ts:106:3 › our own error reports (DEC-474 Part F) › ER-1 a server failure on a page is reported once (1.8s)
  ✓  1 [mobile-360] › e2e/error-reports.spec.ts:106:3 › our own error reports (DEC-474 Part F) › ER-1 a server failure on a page is reported once (1.9s)
  ✓  4 [mobile-360] › e2e/error-reports.spec.ts:137:3 › our own error reports (DEC-474 Part F) › ER-2 a refusal on a page is never reported (31.3s)
  ✓  3 [desktop-1280] › e2e/error-reports.spec.ts:137:3 › our own error reports (DEC-474 Part F) › ER-2 a refusal on a page is never reported (31.4s)
  4 passed (43.2s)
```

- `[ssr-error]` lines in that run: 0. `[slow-rpc]` lines: 0.
- ER-2 took 31 s in that run. A timing re-run with temporary marks took 1.7 s ("1 passed (10.7s)"); the spec was put back and `git diff --quiet` was clean. The cause of the 31 s was not captured (§12).
- The spec is new, so it ran whole. CI's lanes and repeat lane are the full proof.
- J-audit for `e2e/**`:
  - rows are tagged `e2e-erep.<process>.<worker>.<project>.<letters>`;
  - they are removed by id in `afterEach` through a destroy that throws (J3);
  - they are read by DB truth through the service client (J4);
  - no `waitForTimeout`;
  - responses are awaited by route (`waitForResponse`).

**Browser, after ruling 4**, on ethio-staging with 0 retries:
- The fifteen crawl tests that went red in run 45929211475, in `mobile-360` (the only project the crawl runs in: "the crawl sets its own widths (360, 768, 1280): it runs once, in a phone's project"): `bun run e2e:local -- e2e/failure-crawl-admin-catalog.spec.ts e2e/failure-crawl-admin-content.spec.ts e2e/failure-crawl-admin-people.spec.ts --grep "FCR-(56|57|58|63|65|66|67|70|72|73|74|75|76|77|78) " --project=mobile-360 --retries=0`: `15 passed (8.1m)`.
- `e2e/error-reports.spec.ts` whole (new in this lane), `mobile-360` and `desktop-1280`: `4 passed (11.1s)`. The reporter's real path records what the sender now sends unparsed.
- This machine reaches staging alone, so these runs do not reproduce a lane's browsers sharing one address. The lanes are the proof that no lane meets the dial now (§11).

**check-go:** `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8b.md --at 8f6c3f2fc`:

```
[check-go] at 8f6c3f2fca3d4033ad9a908ee45b0f2e9b8bfd1a (--at 8f6c3f2fc): the tree laws and every other COUNT read its snapshot /var/folders/xb/_xhx_v4j7gl2v3y34657ymq00000gn/T/check-go-at-9y7MAq; a COUNT that is a git read runs in /Users/tesfayemackbookpro/ethio-marketplace; the allowlist and the template are read from /Users/tesfayemackbookpro/ethio-marketplace
[check-go] no finding
```

**First download**, from my lock-exact builds: base `07162fd7a` against the final code tree `5b0d275f8` (its check's output, `node scripts/check-bundle-size.mjs`, "Bundle budget OK."). Against part 3's table, ruling 4 moved two ceilings and 21 pages by +0.1 KiB at this rounding, all from the renamed chunk addresses.
- The entry went from 208.4 to 208.6 KiB (+0.2). Its ceiling went from 209 to 210.
- The causes, chunk by chunk:
  - +0.1 to +0.3 on every page: the entry's `src/lib/error-report.ts`, i.e. the root's crash report, the notice's report and the client entry's two listeners. The sender, the cleaner and the shape stay on demand.
  - +2.0 to +2.1 more on `/admin`, `/admin/`, `/admin/audit`, `/admin/images`, `/admin/impersonation_/$sessionId` and `/admin/users`: `use-may-call.js`, now loaded by nav-alerts (DEC-484). These are the pages that load no other control.
  - Ruling 4: `/admin/roles` 303.583 → 303.619 KiB (+37 B) and `/legal/accept` 218.599 → 218.629 KiB (+31 B), exact bytes by the check's own closure helpers on both builds. The sender's new chunk address renames the entry (`index.js` +13 B) and the chunks that name it, a few bytes each; no code moved. Both pages entered the NEAR band and are raised (304 → 305, 219 → 220). No other page entered the band ("Bundle budget OK.").
- Every raised line carries its cause, in DEC-296's form.

| page | base | ceiling | final | ceiling | change | room |
|---|---|---|---|---|---|---|
| / | 227.7 | 229 | 228 | 229 | +0.3 | 1.0 |
| /$name | 225.6 | 227 | 225.9 | 227 | +0.3 | 1.1 |
| /account | 270.7 | 272 | 271 | 272 | +0.3 | 1.0 |
| /account_/legal | 210.3 | 211 | 210.6 | 211 | +0.3 | 0.4 |
| /account_/legal_/$versionId | 211.7 | 213 | 211.9 | 213 | +0.2 | 1.1 |
| /account_/saved | 228 | 229 | 228.3 | 229 | +0.3 | 0.7 |
| /admin | 215.1 | 216 | 217.4 | 218 | +2.3 | 0.6 |
| /admin/ | 215.9 | 217 | 218.2 | 219 | +2.3 | 0.8 |
| /admin/ai | 313.2 | 314 | 313.5 | 314 | +0.3 | 0.5 |
| /admin/attributes | 328.6 | 329 | 328.9 | 330 | +0.3 | 1.1 |
| /admin/audit | 299.9 | 301 | 302.2 | 303 | +2.3 | 0.8 |
| /admin/categories | 363.1 | 364 | 363.3 | 364 | +0.2 | 0.7 |
| /admin/countries | 319.2 | 320 | 319.4 | 320 | +0.2 | 0.6 |
| /admin/images | 215.7 | 217 | 218 | 219 | +2.3 | 1.0 |
| /admin/impersonation_/$sessionId | 243.9 | 245 | 246.2 | 247 | +2.3 | 0.8 |
| /admin/legal | 294.5 | 295 | 294.9 | 296 | +0.4 | 1.1 |
| /admin/legal_/$versionId | 290.7 | 292 | 291 | 292 | +0.3 | 1.0 |
| /admin/legal_/edit | 294.4 | 295 | 294.7 | 296 | +0.3 | 1.3 |
| /admin/listings | 339 | 340 | 339.3 | 340 | +0.3 | 0.7 |
| /admin/listings_/$listingId | 339.9 | 341 | 340.2 | 341 | +0.3 | 0.8 |
| /admin/listings_/$listingId_/edit | 422.2 | 423 | 422.6 | 423 | +0.4 | 0.4 |
| /admin/locations | 281.2 | 282 | 281.5 | 282 | +0.3 | 0.5 |
| /admin/monetisation | 323 | 324 | 323.3 | 324 | +0.3 | 0.7 |
| /admin/places | 321.5 | 322 | 321.8 | 323 | +0.3 | 1.2 |
| /admin/roles | 303.3 | 304 | 303.6 | 305 | +0.3 | 1.4 |
| /admin/roles_/$roleId | 283.2 | 284 | 283.5 | 284 | +0.3 | 0.5 |
| /admin/screening | 359.9 | 361 | 360.1 | 361 | +0.2 | 0.9 |
| /admin/translations | 319.7 | 321 | 320 | 321 | +0.3 | 1.0 |
| /admin/translations_/$lang | 320.8 | 322 | 321.1 | 322 | +0.3 | 0.9 |
| /admin/users | 299.1 | 300 | 301.4 | 302 | +2.3 | 0.6 |
| /admin/users_/$userId | 302.2 | 303 | 302.5 | 303 | +0.3 | 0.5 |
| /auth | 224.1 | 225 | 224.3 | 225 | +0.2 | 0.7 |
| /auth_/callback | 209.8 | 211 | 210 | 211 | +0.2 | 1.0 |
| /auth_/reset | 217.2 | 218 | 217.4 | 218 | +0.2 | 0.6 |
| /c/$slug | 227.7 | 229 | 228 | 229 | +0.3 | 1.0 |
| /dev/primitives | 232.3 | 233 | 232.5 | 233 | +0.2 | 0.5 |
| /dev/style | 267.4 | 268 | 267.6 | 268 | +0.2 | 0.4 |
| /dev/tall | 208.7 | 210 | 209 | 210 | +0.3 | 1.0 |
| /l/$slug | 253.7 | 255 | 253.9 | 255 | +0.2 | 1.1 |
| /legal/$kind | 212.7 | 214 | 213 | 214 | +0.3 | 1.0 |
| /legal/accept | 218.4 | 219 | 218.6 | 220 | +0.2 | 1.4 |
| /legal/publishing | 214.1 | 215 | 214.3 | 215 | +0.2 | 0.7 |
| /my-listings | 315.1 | 316 | 315.3 | 316 | +0.2 | 0.7 |
| /my-listings_/$listingId | 325.6 | 326 | 325.8 | 327 | +0.2 | 1.2 |
| /my-listings_/$listingId_/edit | 410.1 | 411 | 410.3 | 411 | +0.2 | 0.7 |
| /post | 410.1 | 411 | 410.3 | 411 | +0.2 | 0.7 |
| /post_/$listingId | 410 | 411 | 410.3 | 411 | +0.3 | 0.7 |
| /privacy | 212.5 | 213 | 212.7 | 214 | +0.2 | 1.3 |
| /settings | 283.3 | 284 | 283.6 | 284 | +0.3 | 0.4 |
| /terms | 212.5 | 213 | 212.7 | 214 | +0.2 | 1.3 |

## 6. K2 — siblings that bypass the mechanism

The greps behind this list: `rg 'kind: "server"'`, `rg "errorComponent|componentDidCatch"`, the reporter census's rule 500, `rg "instanceof Error"`, `rg '"signedOut"|"notSignedIn"'`, `rg "i18n-usage|i18n:usage"` and `rg ":[0-9]+ \|"`.

- **The reporter.**
  - `src/features/admin/translations/ai-bulk-bar.tsx` (`COUNT_UNREAD`) and `src/features/admin/translations/delete-language-dialog.tsx` (`PREVIEW_EMPTY`): hand-built `server` readings that do not report. Outside scope; allowlisted until 2027-02-26.
  - `src/routes/legal.$kind.tsx`, `src/routes/legal.publishing.tsx`, `src/routes/privacy.tsx` and `src/routes/terms.tsx`: crash boundaries that do not report. Never-list; allowlisted.
  - `src/server.ts` (`normalizeCatastrophicSsrResponse`, `fetch`), `src/server/ad-photo.ts` (`adPhotoResponse`) and `src/server/supabase/user-client.ts` (`refuseUserClient`): 500s outside `serverError`, `| INC-1278`.
  - `src/lib/error-capture.ts` (the server render's `[ssr-error] render` line): not reported; outside scope.
  - `src/lib/lovable-error-reporting.ts` (`reportLovableError`): the vendor's reporter on the crash boundary. Named, not changed.
- **The route's address** (`ERROR_REPORTS_PATH`, `rg "error-reports\"|ERROR_REPORTS_PATH"`): `e2e/error-reports.spec.ts:27` writes `const REPORTS = "/api/error-reports"`, its own literal. It is a black-box check that the route answers at that address. Named, not changed.
- **INC-1315** (an Error's stack has one reader). Left: `src/lib/error-capture.ts:22,50` (the cause-chain walk and its type guard), `src/lib/error-page.ts:21`, and the line in `src/lib/error-text.ts` that falls back to an Error's name. The lane's own sites (`error-reports.ts`, `answer.ts`, `__root.tsx`) read through `errorStack`.
- **The signed-out names:** `src/lib/refusal.ts:177` and `src/features/admin/translations/translations-service.ts:404,430,431,501`.
- **Keys that survive a move:** `src/test/provider-errors.ts` quotes each entry's source as `file:line`. PEF-5 holds the line to its text, so a move above it reddens the law, as `8e8e9118a` showed. This is INC-1293's class in a fixture, outside the allowlists' grammar.
- **The ceilings' layout:** `scripts/check-bundle-size.mjs`'s entry and stylesheet ceilings keep their side-by-side layout. They are not pages, and their comment rule (DEC-425, DEC-468) is judged by `scripts/ci/lovable-branch-guard.sh`, which is outside scope.
- **The maps by hand:** `.claude/hooks/land.ts`, `.claude/hooks/lib.ts`, `.claude/hooks/post-edit.ts`, `.claude/rules/00-executor-protocol.md`, `.claude/rules/10-code-laws.md`, `.claude/rules/40-ci-evidence.md` and `.claude/skills/turn-report/SKILL.md` still regenerate or commit the maps (never-list).

## 7. Allowlists and guards

Line counts are non-comment lines, `origin/dev` → HEAD:

| file | before → after |
|---|---|
| `scripts/conformance/error-reports-allowlist.txt` (new) | 0 → 10 |
| `scripts/conformance/door-permissions-allowlist.txt` | 25 → 24 (nav-alerts `legal:view`, INC-1281, gone) |
| `scripts/conformance/on-demand-failure-allowlist.txt` | 7 → 8 |
| `scripts/ci/turn-checks-allowlist.txt` | 10 → 11 |
| `scripts/doors/manifest.txt` | 227 → 230 |
| `scripts/public-surface-allowlist.txt` | 237 → 240 |
| `docs/tracking/intentional-deletions.txt` | 79 → 81 |
| `scripts/doors/check-doors-allowlist.txt` | 35 → 35 (the three temporary `grant-without-caller` lines left in STEP 3, as ruling 1 decision 3 says; the file now equals dev's byte for byte) |
| door-answers 1, door-args 1, failure-crawl 76, listing-seed 2, mailbox 2, provider-errors 52, refusal-readers 44 | unchanged in count; re-keyed or reworded |
| e2e-waits, listing-designation, live-regions, locale-imports, planted-proofs, proof-readers, sql-writes | 0 → 0 non-comment lines; grammar comment re-keyed |

The new lines:
- `error-reports-allowlist.txt`:
  - `reading src/features/admin/translations/ai-bulk-bar.tsx#COUNT_UNREAD`, `reading src/features/admin/translations/delete-language-dialog.tsx#PREVIEW_EMPTY`: outside scope, until 2027-02-26.
  - `boundary` for each of the four legal routes (`#Route`): outside scope, until 2027-02-26.
  - `500 src/server.ts#normalizeCatastrophicSsrResponse`, `500 src/server.ts#fetch`, `500 src/server/ad-photo.ts#adPhotoResponse`, `500 src/server/supabase/user-client.ts#refuseUserClient`: moving them changes the answer a client reads, `| INC-1278`.
- `on-demand-failure-allowlist.txt`: `src/lib/error-report.ts`. The reporter's own sender is never shown: a notice about a failed report would be a second failure.
- `turn-checks-allowlist.txt`: `i18n-usage-map › Install dependencies | the sandbox's dependencies are already installed; a package change is its own turn | 2027-04-30`.
- `failure-crawl-allowlist.txt`: the `legal_review_overdue` line now names `nav-alerts.ts, useNavAlerts`, not `:42`.

Self-tests run: check-doors' self-test ("23 finding kinds fired on their planted fixtures, the clean pair fired nothing"), CF-KIT-10, ERCE-3, ERCE-4, RBL-2, UMAP-5, and the planted stale-copy run of the map guard.

## 8. Strings

One new key, copied by script from `cursor-bundle-8b-words.json`:
- `admin.roles.perm.resource.errors`: EN "Error reports", AM "የስህተት ሪፖርቶች" (`en-admin.ts`, `am-admin.ts`).

`am-script.test.ts` passes. The usage maps are now built, not committed (INC-1295).

## 9. Migrations

- `supabase/migrations/20261126233000_3b6b710a-070f-4171-a588-0a8a66cff7e4.sql`: sha256 `dcceeefc17c37b19208e75fdea109fefcaa1fe1366bb8ef1ffa7658ebd81d636`, mark `20261127010000`. Pairing: `apply 3b6b710a → expect mark 20261127010000`.
- `supabase/migrations/20261126233100_8c6761c8-6a1f-4bcc-bb13-84119eaa1097.sql`: sha256 `7ce0b850ad02c8ed1ac107fdaf0f66ec55295b83c815654838c66217093a8ae5`, mark `20261127010100`. Pairing: `apply 8c6761c8 → expect mark 20261127010100`.
- Both were applied on ethio-staging and read back by the supervisor (ruling 1). Neither file changed after stop 1; the sha256 values above were re-read on the final tree.
- `bun run db:proof --fresh` (stop 1): `db:proof PASS — applied 565/565, CLI 2.120.0, cold, 60 s`.

## 10. Departures

- **Stops and rulings.**
  - Stop 1 (MIGRATION), ruling 1:
    - the doors are `staff-reader` with no dial;
    - three public-surface lines;
    - three temporary `grant-without-caller` lines, since gone;
    - the regenerated door types;
    - file A at 29,426 bytes;
    - the app version open (ACT-034);
    - the path check;
    - the staging rows for ER-1 and ER-2.
  - Stop 2 (QUESTION: INC-1312's premise), ruling 2: the bearer's judgement alone reads signed out; `errorStack`.
  - Stop 3 (QUESTION: a revoked session under ruling 2), ruling 3: `sessionGone` or an `AuthApiError` 4xx other than 429.
  - Stop 4 (STOP: CI red on `d12430121`, the failure crawl and the reporter's dial), ruling 4:
    - (A) `readOf` leaves out `ERROR_REPORTS_PATH`, with a unit case;
    - (B) no dial raised for a test, and the reporter's answers not hidden across the harness: the crawl answers its own pages' reports, and a refused send is `console.warn`;
    - (C) the gone-session `[ssr-error]` line left (INC-1316);
    - (D) the browser sender drops zod;
    - one push after every fix, the gate and the review.
  - Each ruling was saved by scripted copy with its sha256 checked (`978f7eaa…ecc47`, `db7a9a86…253f`, `8c63449d…2a99`, `5073341d…ea72`).
- **Pushes.** The brief said two (the migration stop's and the final). There were seven code or stop pushes: stops 1, 2 and 3, `65dac93a6`, `d12430121`, stop 4 (`ed69c2dbf`), and `5b0d275f8`. The report's push is the eighth, records only.
  - The brief's wrong-premise clause made stops 2 and 3.
  - The review's two fixes after the first final push made the fifth; its run waited for `65dac93a6`'s to finish (S820's second class).
  - Stop 4 was CI's red.
- **The route's address moved** (ruling 4 decision 4, DECIDE-AND-NAME). A type-only import was not enough: the sender also imported `ERROR_REPORTS_PATH` from `src/lib/schemas/error-report.ts`, which builds the zod shape at its top level, so zod stayed in the chunk (82.74 kB). The constant now lives in `src/lib/error-clean.ts`, which has no zod and is already shared by browser and server. The shape module re-exports it (`export { ERROR_REPORTS_PATH } from "@/lib/error-clean"`), so its five other readers (`src/routes/api/error-reports.ts`, `src/server/error-reports.ts`, `e2e/helpers/failure-crawl.ts`, `e2e/helpers/failure-crawl-judge.ts`, `src/test/failure-crawl.test.ts`) import it as before. One definition; both files are this lane's own.
- **Guard-demanded mechanical edits** (DECIDE-AND-NAME):
  - `src/lib/door-codes.generated.ts` and `src/features/permissions/door-permissions.generated.ts` (DW-1);
  - `scripts/public-surface-allowlist.txt` (the public-surface guard);
  - `scripts/route-budgets.d.mts`, which gained `ROUTE_BUDGETS_KIB`'s declaration (CF-WIRED-3, for RBL-1);
  - `scripts/e2e-select.ts` and `scripts/ci/lane-weights.json` (the new spec's lane and weight);
  - `src/test/provider-errors.ts` (PEF-5: the `upstream unavailable` entry's source line moved with `user-client.ts`);
  - `src/routeTree.gen.ts` (the new route, generated);
  - `scripts/conformance/door-args-allowlist.txt` (DARGS-2, stop 2);
  - `scripts/ci/turn-checks-allowlist.txt`: the map job's new Install step reads NOT RUN like every other job's (TCK and the runner's allowlist grammar).
- **Ceilings** (DEC-296's form, each with its cause on its line). Raised:
  - by step 3: the entry, `/admin/attributes`, `/admin/legal`, `/admin/legal_/edit`, `/admin/places`, `/my-listings_/$listingId`, `/privacy` and `/terms`;
  - by part 2: `/admin`, `/admin/`, `/admin/audit`, `/admin/images`, `/admin/impersonation_/$sessionId` and `/admin/users`.
  - The brief named the overview, Audit, Images and View-as for `use-may-call.js`. `/admin/users` loads it too, and is raised with the same cause.
  - by ruling 4: `/admin/roles` (304 → 305) and `/legal/accept` (219 → 220), in `5b0d275f8`, the commit that causes it (§5).
- **Part 3 (b).** The ceilings file keeps one line per page, with one blank line between page lines. A merge of two lanes raising neighbouring pages is clean (RBL-2). The entry and stylesheet ceilings in `scripts/check-bundle-size.mjs` keep their layout (§6).
- **An online timeout is not reported.** The brief's CONCERN names "timed out while online" among what the notice draws as the server's. The census finds the notice draws an expired call deadline as `network` (`route-client.ts:93`). The brief's consistency lens ("the reporter never reads a failure its own way") and SCOPE (`failure-reason.ts`: the report hook only) leave the reading as it is, so it is not reported. Changing what that failure reads as would change the words a person sees. The supervisor recorded it as INC-1317 (§13, §14).
- **No reaper registry entry for `error_reports`.** No existing reaper helper takes a new table through an option; ER-1 and ER-2 remove their rows by id (ruling 1 decision 8; §12).
- **The briefs census.** `scripts/conformance/briefs-allowlist.txt` keys by a brief's path, not a line, so it was not re-keyed.
- **The review's fixes after the gate:**
  - `65dac93a6`: the stats reader carries the count it checked, with no `?? 0`;
  - `aec00348a`: a stale note left in `check-doors-allowlist.txt` was removed;
  - `d12430121`: the write's comment states only its constraint.
  - Each was followed by its tests, typecheck and lint, and the laws (150 files, 838 passed, 1 skipped).

## 11. CI

The base's CI. `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `07162fd7aace57e76618952ac4a3bd016bbad01e` (short `07162fd`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-27T00:24:04Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45915411185
```

The two-step check:
1. SUCCESS.
2. The commit equals `origin/dev` (`07162fd7a`), the dev this branch carries. The task's base `8f6c3f2fc` was SUCCESS too, in run 45907708105 (stop 1).

No red of an earlier turn was open.

The lane's runs:
- Stop 1 (`6a5c19f81`), run 45913849134: SUCCESS.
- Stop 2 (`f76cbee3b`), run 45918046430: cancelled when stop 3's push arrived (class d). No re-run.
- Stop 3 (`8bb8f54bb`), run 45918807028: FAILURE, class (e), mine, with two jobs red:
  - "i18n used-on map is fresh (U4i ②)": the committed maps did not match after `8e8e9118a`. Fixed in `4a18115b7` (regenerated), and the class is gone with part 3 (`09547a8fb`).
  - "Component tests": PEF-5 (`src/test/provider-errors.test.ts`), "upstream unavailable: expected '' to contain '"upstream unavailable"'". The fixture quoted `user-client.ts` by its old source line. Fixed in `4a18115b7`.
- The first final push (`65dac93a6`), run 45928742041: ran in full; the next push's run queued behind it (ruling 4, S820's second class).
- `d12430121`, run 45929211475: FAILURE, class (e), mine (stop 4). The failure crawl in lanes 2, 4 and 5 (FCR-56…58, 63, 65…67, 70, 72…78) recorded the reporter's POST as a page read, and the lanes' shared address met the reporter's dial (429). SAP-1 (webkit, `sage-ad-page.spec.ts`) was unrelated. The server-error census's three lines `[WebServer] [ssr-error] /api/error-reports not signed in Auth session missing!` (shards 5 and 13) did not gate: they are INC-1316. Fixed by ruling 4 in `c095c43bf` and `5b0d275f8`.
- Stop 4 (`ed69c2dbf`, records only, the same code tree as `d12430121`), run 45935486979: FAILURE, the same class. Thirteen crawl tests (FCR-56…58, 65…67, 70…76) with 344 lines naming 429 or `rateLimited`. LGA-21 (`legal-admin.spec.ts`, desktop-1280) failed once and passed on retry: FLAKY, non-gating (DEC-030). Its failed attempt logged a failed resource load and reporter 429s, the same dial.
- The final code commit `5b0d275f8`, run 45939465263:
  - Attempt 1: FAILURE, class (b), infrastructure. Lane 16 died before any test at its browser libraries' install ("E: Failed to fetch https://packages.microsoft.com/ubuntu/24.04/prod/dists/noble/InRelease  403  Forbidden"; "the install failed (exit 1) after apt's fetch stage — final, never run twice (DEC-276)"). The E2E verdict job was red with it.
  - Every other source in attempt 1 was clean: 2441 passed, 511 skipped, 0 failed. One flake, DLG-E5 (`dialogs.spec.ts`, mobile-360, "the page did not scroll"), passed on retry, non-gating; its client errors name no 429.
  - Re-run once, as rule 40 allows for (b): `gh run rerun 45939465263 --failed`. Attempt 2: SUCCESS.
- Every check on the pull request: `gh pr checks 117`: 43 pass, 2 skipping, none failing or pending.
- `git show origin/ci-evidence:docs/tracking/branches/cursor/bundle-8b/ci-status.md | head -6`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `5b0d275f8ff36b9b9adc91661bde831405c15655` (short `5b0d275`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-27T11:36:58Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45939465263
```

- `e2e-last-failure.md` for the run: "last E2E run 45939465263 passed".
  - Repeat: 40 of 60 tests, with "the time cap left 80 test runs". Its two errors outside any test (INC-589) are that cap: "Timed out waiting 913s for the test suite to run" and the same for its teardown. The repeat job is green.
  - Server-error census (DEC-083, non-gating): `[WebServer] [ssr-error] /api/error-reports not signed in Auth session missing!` ×2, shard 13 (INC-1316).
- **The dial (ruling 4 decision 2).** No lane met it.
  - Every lane's log (`gh run download 45939465263 --pattern "e2e-log-*"`, 20 logs) was searched for `error-reports.*429`, `429.*error-reports`, `send failed 429` and `rateLimited`. The only matches are two lines naming test DR-RL-1 in lane 8.
  - The limit of that search: a lane log prints a test's browser lines only for a failing attempt, and the one failing attempt (DLG-E5) names no 429.
  - The crawl: 75 crawl test passes and none failed. Every crawl test red in runs 45929211475 and 45935486979 passed: FCR-56…58 in lane 4, FCR-63 and 65…67 in lane 5, FCR-70…78 in lane 2, most of them again in the repeat lane.

## 12. Limits

- **The local backend browser run was NOT RUN.** `bun run db:proof`'s stack holds its own keys, which db:proof never prints and rule 50 forbids reading. `bun run e2e:local` with `E2E_LOCAL_BACKEND=1` therefore cannot be given that stack's URL and keys from this machine. CI's lanes run ER-1 and ER-2 on the temporary backend, which is the proof.
- **Premise (b) is inferred.** No file in the repository names the hosting platform's build command. The proof is a build with no bun on PATH, and `package.json:8` (`vite build`).
- **ER-2's 31 s** in the staging run was not explained. The re-run with timing marks took 1.7 s. CI's repeat lane judges its stability.
- **Staging rows.** Two rows were left on ethio-staging's `error_reports` by the first failed ER run: tags `e2e-erep.local.0.mobile-360.fismbimh` and `e2e-erep.local.1.desktop-1280.pbagygje`. No reaper registry takes the table (§10). Their 12-month erase is the scheduled prune. Removing them is the supervisor's (rule 50: no writing statement).
- WebKit, the merged tree's first download, the production apply and the lanes' real time belong to CI, the supervisor and the operator.
- **Local builds read about 0.1 KiB under CI.** The ceilings use the local form (`ceilingForLocal`).

## 13. Findings

1. **An online timeout reads as the network's and is never reported: INC-1317** (the supervisor's record, §14). `src/lib/route-client.ts:93`: an expired call deadline becomes `new TypeError("timeout")`, which the reader classes `network` (`src/lib/reader-failure.ts:191`). A deadline that expires while the device is online is likely the server's slowness; today it draws the network's words and no report sees it.
2. **Failures the reporter does not reach, outside scope:**
   - the server render's `[ssr-error] render` line (`src/lib/error-capture.ts`);
   - the server entry's catastrophic 500s (`src/server.ts`, HTML);
   - `src/server/ad-photo.ts`'s own 500 shape;
   - the two hand-built `server` readings in `src/features/admin/translations/` (`ai-bulk-bar.tsx:52`, `delete-language-dialog.tsx:54`);
   - the four legal pages' crash boundaries.
   - Each has an allowlist line with its `until`.
3. **The two signed-out names** remain in `src/lib/refusal.ts:177` and `src/features/admin/translations/translations-service.ts:404,430,431,501`. Each is read by a different reader, and both files are outside scope.
4. **INC-1315's remaining sites:** `src/lib/error-capture.ts:22,50`, `src/lib/error-page.ts:21`, and the name fallback in `src/lib/error-text.ts`.
5. **`src/test/provider-errors.ts` quotes sources as `file:line`.** PEF-5 reddens when code above a quoted line moves (`8e8e9118a`). This is INC-1293's class outside the allowlists.
6. **A cast in pre-existing code.** `src/server/supabase/user-client.ts`: `p_batch: entry.batch as unknown as string` (its door-args line, INC-942) is an `as unknown as` that rule 10 bans. It is pre-existing; the lane only re-keyed its allowlist line.
7. **Lines that part 3 makes stale, for the next rules turn:**
   - `.cursor/rules/10-code-laws.mdc:101` ("run `bun run i18n:usage` and commit both maps");
   - `.cursor/rules/00-protocol.mdc:183` (the standing allowance names `docs/generated/i18n-usage.json` and `public/i18n-usage.json`);
   - `docs/governance/lovable-knowledge.md` A6 (operator's word only, DEC-414 (7));
   - `CLAUDE.md:89`;
   - `.claude/hooks/land.ts`, `.claude/hooks/lib.ts`, `.claude/hooks/post-edit.ts`, `.claude/rules/00-executor-protocol.md`, `.claude/rules/10-code-laws.md`, `.claude/rules/40-ci-evidence.md`, `.claude/skills/turn-report/SKILL.md`;
   - `.prettierignore:62–66`, which names two files no longer in the tree.
8. **The server's report reads "signed in" as "a bearer rode".** `src/server/error-reports.ts` uses `carriesBearer(request)` for the server's own reports; the bearer is not verified there. The browser route's `signedIn` comes from the verified caller. It names no person either way.
9. **INC-1314:** read in §2 (findings). This lane's migration-stop push counted correctly as a code push.
10. **A gone session is logged as a server error: INC-1316** (ruling 4 (C), the supervisor's record, §14). The three census lines in run 45929211475, the same line three times (shards 5 and 13):
    - `[WebServer] [ssr-error] /api/error-reports not signed in Auth session missing!` ×3.
    - The tests that finished next in the same logs: RP-1 ×2, AT-69, AU-2, RP-2, SO-16. The reporter is a new caller that fires after a sign-out with the old bearer. `src/server/supabase/user-client.ts` logs every bearer judged gone as `[ssr-error]`, on every route. Left by ruling 4: changing it for one route would fork the route boundary's optional caller.
11. **The reporter's address dial rations a carrier, not a person: INC-1318** (the supervisor's record, §14). All of a CI lane's browsers share one address and met `errorReportAddress` (60 an hour) in runs 45929211475 and 45935486979. Outside the crawl, the reporter's calls in other specs still reach the real route and its dial (ruling 4 refused hiding them across the harness).

## 14. Records

- INC — INC-1281's last line closed: `src/features/admin/nav-alerts.ts`'s overdue-review alert reads its switch through `permissionOf({ door: "legal_review_overdue" })` (DEC-484). Its line in `scripts/conformance/door-permissions-allowlist.txt` is gone (25 → 24), and its `failure-crawl-allowlist.txt` line names the reader, not a line number.
- INC — INC-1312 fixed (cursor-bundle-8b): an auth failure now answers `notSignedIn` (401) only when the sign-in server judged the bearer (`sessionGone`, or an `AuthApiError` with a 4xx status other than 429). Every other auth failure answers `upstream` (503) and is reported once, as kind `upstream`. The two signed-out names (`signedOut`, `notSignedIn`) were left: each is read by a different reader in files outside scope (`src/lib/refusal.ts:177`, `src/features/admin/translations/translations-service.ts:404,430,431,501`), named in §13.
- INC-1312 correction (the supervisor's record) — the record's premise is not reproduced on the pinned auth library. `@supabase/auth-js` 2.110.9 throws its retryable error for 500–504 and 520–530 before it reads the body, so the user client already answered those as `upstream` (503); what was true is that no report saw them. The rest of the class stood: an auth answer that judged nothing (another 5xx, a 429, a body that is not JSON) still read as signed out. Fixed in Cursor bundle 8b: `notSignedIn` only when the sign-in server judged the bearer, meaning the session-gone check (`sessionGone`, `src/lib/ended-sign-in.ts`) or an `AuthApiError` with a 4xx status other than 429; every other auth failure answers `upstream` and is reported. Evidence: UP-8 red-first against the base (cursor-bundle-8b stop 2, rulings 2 and 3).
- INC-1315 (the supervisor's record) — reading an Error's stack had no one reader: seven sites on dev read it by a local `instanceof Error` under an `eslint-disable-next-line no-restricted-syntax` comment, and Cursor bundle 8b added an eighth. Cursor bundle 8b adds `errorStack` to `src/lib/error-text.ts` and moves its own sites onto it. Left: `src/lib/error-capture.ts` (the cause-chain walk and its type guard), `src/lib/error-page.ts`, and the line in `src/lib/error-text.ts` that falls back to an Error's name. Class: concern 'a caught error is read through the error-text reader'; mechanism `src/lib/error-text.ts`. Owner: the before-launch list.
- INC-1316 (the supervisor's record) — a bearer the sign-in server judged gone is logged as a server error on every route: `src/server/supabase/user-client.ts` writes `[ssr-error] <path> not signed in …` for each `notSignedIn` answer, so an ordinary ended session writes incident-shaped lines, and the server-error census counts them (3 lines in run 45929211475, from the error-report route after a sign-out). Class: concern 'the server-error census counts server failures only'; mechanism the user client. Owner: the before-launch list.
- INC-1317 (the supervisor's record) — a call whose own deadline expires is read as a network failure and is never reported, even while the browser is online (`src/lib/route-client.ts`, `src/lib/reader-failure.ts`; found by Cursor bundle 8b's census). Class: concern 'a failure is named by its cause and every server-side failure is reported'; mechanism the route client's failure reading. Owner: the before-launch list.
- INC-1318 (the supervisor's record) — the error reporter's per-address dial (`errorReportAddress`, 60 an hour) counts every person behind one shared carrier address as one sender, so during an incident most reports from one carrier are refused and the error page under-counts it. Evidence: the dial's design; all of a CI lane's browsers share one address and met it in run 45929211475. Class: concern 'an address-keyed dial rations a person'; mechanism `src/lib/dials.ts`. Owner: the before-launch list (the dial's key and value).
- DEC — DEC-474 Part F built (cursor-bundle-8b).
  - The table `error_reports` is born closed. Its write is `record_error_report`, service only, which computes the shape and the group key md5(kind, code, shape, place) in the database. Its cores are `error_groups_core`, `error_occurrences_core` and `error_stats_core`.
  - Three staff doors, `staff-reader` on `errors:view`, granted to `admin`: `admin_error_groups`, `admin_error_occurrences` (keyset) and `admin_error_stats`.
  - The 12-month erase is `error_reports_prune_core` with its wrapper, scheduled `29 4 * * *`, with a 14-day heartbeat.
  - The cleaner is `src/lib/error-clean.ts`, run by the browser and again by the server. The shape is `src/lib/schemas/error-report.ts`.
  - The public write route is `POST /api/error-reports`: byte ceiling, then optional caller, then the address dial `errorReportAddress` before the read, then the strict shape.
  - The server's report sits in `serverError`, and in the user client's upstream answer. It is never awaited, runs within a 3000 ms deadline, and is limited to the same failure once a minute and 30 a minute per instance.
  - The browser's trigger is `reportBrowserFailure` (`src/lib/error-report.ts`). It is called by the notice's `server` reading, the root crash boundary and the two listeners. The sender loads on demand and sends at most 5 per visit, the same failure once, and nothing offline.
  - The staff readers are in `src/features/admin-errors/` with their door-words family.
  - The guard is `scripts/conformance/error-reports.ts` (ERCE-1…4).
  - What a report holds, word for word: "when; the page path without its query or fragment; the kind; the code (a typed failure's code or status); the cleaned message and place (the first frame of our own code, file and line, no query); browser, engine and version; device type (phone, tablet, desktop); the page language; the app version (the build's commit if the build exposes one — the census answers whether it does; otherwise named OPEN, never invented); signed in or not. Never an account id, a name, an e-mail, a phone number, a network address, a token, a query string, a request body or a cookie." The app version is OPEN (ACT-034).
- INC — INC-1293 fixed (cursor-bundle-8b): an allowlist key names its place by text, `<file>#<text>` or `<file>#<scope>::<text>` (`placeOf`, `readPlacedAllowlist`, `scripts/conformance/kit.ts`). Each key must match exactly once; a key that matches nothing or twice fails (CF-KIT-10). Every line-keyed allowlist under `scripts/` and the staff rules are re-keyed, and no `path:<n>` key remains.
- INC — INC-1295 fixed (cursor-bundle-8b). Fix 3's rule decided (a), "the maps leave the tree", because all three proofs held:
  - `bun run build` emits `dist/client/i18n-usage.json` and writes `docs/generated/i18n-usage.json`;
  - a build with no bun on PATH emits the same;
  - the dev server answers `/i18n-usage.json` (200, equal to a fresh generation).
  - Both maps are git-ignored and their deletion is declared. CI's `i18n-usage-map` job builds and judges the build's copies against a fresh generation (`scripts/i18n-map-guard.ts`). `turn-checks` reuses the build, and the docs-only classifier no longer names them.
  - (b) The page ceilings stay committed, one line per page with one blank line between page lines. Two lanes changing two different pages merge cleanly (RBL-2).
- register row — "a failure in the field is recorded, cleaned and readable by staff" → the reporter (`reportBrowserFailure`, `src/lib/error-report.ts`; the server's report in `serverError`), the route `POST /api/error-reports`, the table `error_reports` and its doors `admin_error_groups`, `admin_error_occurrences`, `admin_error_stats` → the reporter census `scripts/conformance/error-reports.ts` (ERCE-1…4) → exceptions: `scripts/conformance/error-reports-allowlist.txt`.
- register row — the census kit's row gains "keys survive a move (INC-1293): `<file>#<text>` / `<file>#<scope>::<text>`, matched exactly once (`placeOf`, CF-KIT-10)".
- register row — the word maps' row: "built, never committed (INC-1295): `usageMapPlugin` (`scripts/i18n-usage-map.ts`, wired in `vite.config.ts`) emits `/i18n-usage.json` in the client build, writes `docs/generated/i18n-usage.json`, and answers `/i18n-usage.json` on the dev server; CI's `i18n-usage-map` job judges the build's copies (`scripts/i18n-map-guard.ts`)".
- register row — the ceilings' row: "one line per page, a blank line between page lines, so two lanes changing two different pages never conflict (INC-1295, RBL-1/RBL-2 in `scripts/route-budgets.test.ts`)".
- changelog — Cursor bundle 8b: our own error reports. Every failure in the field that is ours (the notice's server reading, a crash, an unhandled error, a 500 our server answers, an auth server failure) is recorded once, cleaned and grouped, kept 12 months and readable by staff with `errors:view` (DEC-474 Part F; INC-1312). Allowlist keys survive a move (INC-1293). The word maps are built, not committed, and the page ceilings merge across lanes (INC-1295).
- slip — for the next rules turn, the lines Part 3 makes stale:
  - `.cursor/rules/10-code-laws.mdc:101`, `.cursor/rules/00-protocol.mdc:183`, `CLAUDE.md:89`;
  - `docs/governance/lovable-knowledge.md` A6 (operator's word, DEC-414 (7));
  - `.claude/hooks/land.ts`, `.claude/hooks/lib.ts`, `.claude/hooks/post-edit.ts`, `.claude/rules/00-executor-protocol.md`, `.claude/rules/10-code-laws.md`, `.claude/rules/40-ci-evidence.md`, `.claude/skills/turn-report/SKILL.md`;
  - `.prettierignore:62–66`.
- ACT-034 (the supervisor's record) — the build's own stamp (its commit) reaches the error reports' app_version. Today no build exposes its commit, so the column is open and nullable and the stats' version list is one null bucket (Cursor bundle 8b, premise a). First read where the published build gets its commit. Owner: the before-launch list (G71).
