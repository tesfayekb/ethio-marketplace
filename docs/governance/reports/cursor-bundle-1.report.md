# CURSOR BUNDLE 1 — report

Base: dev 358c691ab · Final commit: 9d74f8071 (the last code commit; the report rides on top of it) · Brief: docs/governance/briefs/cursor-bundle-1.md (sha256 513ffcc4bbc1beb701eacd5e3b98b5d100527ce4dd413e3314cd8fa0118d73d2)
Review: READY · 0 BLOCKER · 0 MAJOR · 1 MINOR · on 9d74f80

Pull request: #91 (a DRAFT, by the brief's STEP 8). Lane `cursor/bundle-1`. Model: Claude Sonnet 5.5 (the build chat the ruling names).

## 1. Done / not done, by part and step

STEP 0 done: the brief, its package (`cursor-bundle-1-guide.json`) and, later, ruling 1 with its package (`cursor-bundle-1-ruling-1-am.json`) and ruling 2, each saved by scripted copy, each sha256 compared before and after (values in §10). STEP 1 done: the census (`cursor-bundle-1.census.md`) and stop 1. STEP 2 done: item 5, one migration, stop 2 (file 1 applied on ethio-staging by the supervisor; file 2 NOT written, ruling 2). STEPS 3 to 7 done by the commits below.

| item | state | commit |
| --- | --- | --- |
| 1 INC-1232, INC-1231, INC-1233 | done: the summary carries the serial line (LFE-4); a capped serial pass is its own clause, never a counted test run (EFR-5); `triggerFindings` reads SQL through `sqlCodeOf`, planted literal (CF-LANES-6); the message reworded without angle brackets | b18038a37 |
| 2 the form kit, wave 2 | done: the step-up code sits in `Field`; `auth-error-key.ts` and `mfa-service.ts` read through `readRefusal` with a family each; three new member-layer sentences; `forms-allowlist.txt` holds no line (CF-FORM-6); sign-out answers `auth.errorGeneric` without the mapper (ruling 1, answer 6) | 4616cfcb2 |
| 3 INC-1153 + INC-1229 | done: `DOOR_REFUSED_KEY` is a leaf (`src/lib/door-refused-key.ts`), `door-codes.ts` leaves the entry for the reader's chunk; one `rateUntilOf` in `src/lib/refusal.ts`; `doorKeyText` removed; `/auth_/callback` on option B (`src/features/auth/email-verification.ts`, ruling 1, answer 2) | 4616cfcb2 (the auth move), c510ea2b1 |
| 4 ACT-029 | done: 20 guide keys moved to `admin.monetisation.levels.guide.*`; `what` and `how` take the package's words; the old keys retired; the prefix and the guard's list changed | c510ea2b1 |
| 5 INC-1187 | done: the held read, one migration, applied on staging by the supervisor (stop 2) | d76cc487a |
| 6 INC-1166, second half | done: `scripts/doors/open-rules.txt` (six standing rules), four finding kinds (`open-rule-undeclared`, `-gone`, `-computed`, `-grants`), the smoke lane's live query, DOORS-16 and DOORS-17 with the planted case ruling 2 asked for; no rule dropped | b18038a37 |
| 7 the second sign-in prompt | NOT reproduced (as the census found); MF-9 pins one step-up, one prompt, in both Chromium projects; no change in the sign-in folder for it; the item stays open as INC-1234 (ruling 1, answer 5) | 4616cfcb2 |
| 8 the standing Lovable branch (DEC-416, added by ruling 1) | done: `.github/workflows/lovable-next.yml`; guard CF-LVB-15 and CF-LVB-16 | b18038a37 |

Review fix: 9d74f8071 — MF-9 read its counter through `as unknown as` (banned, rule 10 TypeScript); now `Reflect.set` / `Reflect.get` with a shape check. MF-9 re-run after it: 1 passed in `mobile-360`, 1 passed in `desktop-1280`.

Not done: nothing the brief or the rulings ask for is left. The browser lanes' full proof, the budget job and the review comments are CI's (§11).

## 2. Files changed

`git diff --name-only 358c691ab` at 9d74f8071 (76 files; this report is the 77th):

```
.github/workflows/local-backend-proof.yml
.github/workflows/lovable-next.yml
docs/features/ci-guards.md
docs/features/doors.md
docs/features/forms.md
docs/generated/i18n-usage.json
docs/governance/briefs/cursor-bundle-1-guide.json
docs/governance/briefs/cursor-bundle-1-ruling-1-am.json
docs/governance/briefs/cursor-bundle-1-ruling-1.md
docs/governance/briefs/cursor-bundle-1-ruling-2.md
docs/governance/briefs/cursor-bundle-1.md
docs/governance/reports/cursor-bundle-1.census.md
docs/governance/reports/cursor-bundle-1.stop-1.md
docs/governance/reports/cursor-bundle-1.stop-2.md
e2e/mfa-stepup.spec.ts
public/i18n-usage.json
roadmap.md
scripts/ci/lane-failure-evidence.test.ts
scripts/conformance/admin-guides.test.ts
scripts/conformance/auth-answers.test.ts
scripts/conformance/forms-allowlist.txt
scripts/conformance/forms.test.ts
scripts/conformance/lanes.test.ts
scripts/conformance/lovable-next.test.ts
scripts/conformance/route-client-allowlist.txt
scripts/conformance/shared-values.ts
scripts/conformance/vendor-seams-allowlist.txt
scripts/conformance/wired.test.ts
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/judge.ts
scripts/doors/live-open-rules.sql
scripts/doors/open-rules.ts
scripts/doors/open-rules.txt
scripts/doors/policies.ts
scripts/doors/rows.ts
scripts/e2e-failure-report.test.ts
scripts/e2e-failure-report.ts
scripts/route-budgets.mjs
src/components/shell/impersonation-notice.tsx
src/features/ad-page/ad-page-refusals.test.ts
src/features/ad-page/ad-page-refusals.ts
src/features/ad-page/contact.ts
src/features/ad-page/report.ts
src/features/ad-page/save.ts
src/features/admin-monetisation/products-section.tsx
src/features/auth/auth-client.test.ts
src/features/auth/auth-error-key.test.ts
src/features/auth/auth-error-key.ts
src/features/auth/auth-result.ts
src/features/auth/auth-service.ts
src/features/auth/email-verification.ts
src/features/auth/mfa/mfa-service.test.ts
src/features/auth/mfa/mfa-service.ts
src/features/auth/mfa/step-up-dialog.test.tsx
src/features/auth/mfa/step-up-dialog.tsx
src/features/auth/mfa/step-up-gate.tsx
src/features/auth/mfa/use-step-up.ts
src/features/auth/sign-out.ts
src/features/posting/posting-service.ts
src/features/posting/refusal-text.test.ts
src/features/posting/refusal-text.ts
src/features/posting/step-photos.tsx
src/i18n/locales/am-guide.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-guide.ts
src/i18n/locales/en-member.ts
src/lib/door-codes.test.ts
src/lib/door-codes.ts
src/lib/door-refused-key.ts
src/lib/refusal-tail.test.ts
src/lib/refusal-tail.ts
src/lib/refusal.test.ts
src/lib/refusal.ts
src/routes/auth_.callback.tsx
supabase/migrations/20261121145000_656c7e66-210f-412a-98fd-655df4c9e9fd.sql
```

New files, by `git ls-files` proof (each tracked): `.github/workflows/lovable-next.yml`, `scripts/conformance/lovable-next.test.ts`, `scripts/doors/open-rules.ts`, `scripts/doors/open-rules.txt`, `scripts/doors/live-open-rules.sql`, `src/features/auth/email-verification.ts`, `src/lib/door-refused-key.ts`, the migration, and the brief, ruling, census and stop files under `docs/governance/`.

Outside the brief's SCOPE by name, each a ruling or a guard's own demand (named again in §10): `src/routes/auth_.callback.tsx` (ruling 1, answer 2), `scripts/conformance/vendor-seams-allowlist.txt`, `scripts/conformance/route-client-allowlist.txt`, `scripts/conformance/auth-answers.test.ts`, `scripts/route-budgets.mjs` (the census's module list demands the line out), `src/components/shell/impersonation-notice.tsx` (the leaf's one shell importer), `scripts/conformance/wired.test.ts`.

## 3. Behaviour contract — answer tables before → after

Everything is today's except the brief's numbered changes.

| function / screen | before (base) | after |
| --- | --- | --- |
| `local-backend-proof.md` summary | kept some prefixes; the `- Repeat serially (DEC-415)` line missing | the line is kept (LFE-4) |
| `e2e-failure-report.ts` repeat line | the serial pass's cap line counted as one capped test run | counted apart; "the time cap stopped the serial pass" is its own clause (EFR-5) |
| `triggerFindings` (CF-LANES-4) | blanked SQL comments by a pattern of its own | reads `sqlCodeOf` (register row 125); a `--` in a literal hides nothing (CF-LANES-6) |
| `toErrorKey(error)` | a chain of message tests | `readRefusal(heard, AUTH_REFUSALS).key`; three pre-reads keep the three shapes the family cannot express (leaked password, mail-send 500, `email_address_not_authorized`); every case of `auth-error-key.test.ts` keeps its key; the provider codes are added; a 429 keeps its answer |
| two-factor outcomes | `{ ok:false, errorKey }` from four mappers; a refusal the provider names drawn as the generic line | `{ ok:false, errorKey, refusal }` through `MFA_REFUSALS`; `mfa_factor_name_conflict` → `mfa.errorSetupPending`, `too_many_enrolled_mfa_factors` / `mfa_verified_factor_exists` → `mfa.errorFactorExists`, `mfa_totp_enroll_not_enabled` / `mfa_totp_verify_not_enabled` → `mfa.errorMethodOff`; `stepUpAbortKey` keeps its three answers (MSV-5) |
| step-up dialog | the code in a bare control with its own `role="alert"` line | the code in `Field` (`aria-invalid`, `aria-describedby`); `data-testid` `step-up-code` and `step-up-error` kept (MF-2) |
| a failed sign-out (`sign-out.ts`) | the mapper's key | `auth.errorGeneric`, the provider's failure logged once (`console.warn`); the shell reads only `ok` (ASC-11) |
| `/auth_/callback` | `completeEmailVerification` from `auth-service.ts` | the same function, byte for byte, from `email-verification.ts`; `auth-service.ts` re-exports it |
| `rateUntilOf` | two readers (ad page, posting) | one, `src/lib/refusal.ts:272`; both features call it; the ad page's reader preferred `message` over `reason`, `hear` prefers `reason`; no caller passes both (census), RTW-22 pins every shape |
| `doorKeyText` | exported, no caller outside its tests | removed with its test block |
| level Guide | keys `admin.monetisation.level.guide.*` | `admin.monetisation.levels.guide.*`; `what` and `how` new words; the other 18 byte for byte |
| `feed_reindex_enqueue_*` | an insert after an unlocked read; a listing deleted between them raised a foreign-key error | the read is `FOR KEY SHARE OF l` (places: two CTEs); a gone ad answers 0 and raises nothing |
| `check-doors` | no census of `USING (true)` | four finding kinds against `open-rules.txt`; the live run adds a second query for the grants |
| `lovable/next` | none | moves to dev's head on a push to dev (three cases) |

The lock's cost (ruling 2, answer 2, its three sentences word for word):

Read on ethio-staging: `feed_reindex_queue_listing_id_fkey` is `FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE`. The foreign key's own check already takes `FOR KEY SHARE` on the listing for every queue row the insert writes. So the new clause takes that same lock before the insert instead of during it, and adds a lock only for an ad that is already queued.

First download (DEC-355), read on the joined tree (items 2 and 3 together, ruling 1, answer 1). `node scripts/check-bundle-size.mjs`: "Bundle budget OK."; "0 NEAR" in `bun run checks`. Entry (`index-*.js`): 142.5 → 142.1 KiB gzipped; shared shell (`shared-shell-*.js`): 29.4 → 28.9 KiB; `JS:` line 201.8 → 201.0 KiB of 203. Named causes, chunk by chunk (from `dist/.chunk-modules.json`, base against joined):
- `src/lib/door-codes.ts` was in `index-CAIvulkG.js` at the base; it is in `refusal-BLa-KvnK.js` (with `src/lib/refusal.ts`) on the joined tree; `src/lib/door-refused-key.ts` is in the entry (a leaf of one export).
- The auth mapper left the shared shell for the reader (`SHARED_SHELL_MODULES` loses its line) and `completeEmailVerification` left `auth-service.ts` for `email-verification.ts`, so `/auth_/callback` does not download code it never draws (it is 205.4 → 202.4, not the +1.95 KiB trial B measured).
- No page grew: 0 of 50 pages are above their base; no ceiling moved; the page rows are the final tree's:

| page | base | step 4 | joined (final) | ceiling | change vs base |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 222.9 | 222.5 | 222.5 | 224 | -0.4 |
| `/$name` | 221.0 | 220.6 | 220.6 | 222 | -0.4 |
| `/account` | 264.2 | 263.8 | 263.4 | 265 | -0.8 |
| `/account_/legal` | 204.4 | 204.0 | 203.6 | 205 | -0.8 |
| `/account_/legal_/$versionId` | 205.1 | 204.6 | 204.3 | 206 | -0.8 |
| `/account_/saved` | 221.9 | 221.4 | 221.4 | 223 | -0.5 |
| `/admin` | 206.2 | 205.8 | 205.4 | 207 | -0.8 |
| `/admin/` | 207.0 | 206.6 | 206.3 | 208 | -0.7 |
| `/admin/ai` | 300.8 | 300.7 | 300.7 | 302 | -0.1 |
| `/admin/attributes` | 315.5 | 315.4 | 315.5 | 316 | +0.0 |
| `/admin/audit` | 291.6 | 291.2 | 290.8 | 293 | -0.8 |
| `/admin/categories` | 345.2 | 345.2 | 345.2 | 346 | +0.0 |
| `/admin/countries` | 304.8 | 304.7 | 304.8 | 306 | +0.0 |
| `/admin/images` | 206.9 | 206.4 | 206.1 | 208 | -0.8 |
| `/admin/impersonation_/$sessionId` | 289.5 | 289.1 | 288.8 | 290 | -0.7 |
| `/admin/legal` | 282.4 | 282.3 | 282.3 | 283 | -0.1 |
| `/admin/legal_/$versionId` | 279.1 | 279.0 | 279.0 | 280 | -0.1 |
| `/admin/legal_/edit` | 281.8 | 281.7 | 281.8 | 283 | +0.0 |
| `/admin/listings` | 326.6 | 326.5 | 326.5 | 328 | -0.1 |
| `/admin/listings_/$listingId` | 327.4 | 327.4 | 327.3 | 328 | -0.1 |
| `/admin/listings_/$listingId_/edit` | 408.7 | 408.6 | 408.6 | 410 | -0.1 |
| `/admin/locations` | 267.4 | 267.0 | 266.6 | 268 | -0.8 |
| `/admin/monetisation` | 311.7 | 311.6 | 311.7 | 313 | +0.0 |
| `/admin/places` | 305.4 | 305.3 | 305.4 | 306 | +0.0 |
| `/admin/roles` | 293.3 | 293.2 | 293.3 | 294 | +0.0 |
| `/admin/roles_/$roleId` | 273.5 | 273.4 | 273.4 | 274 | -0.1 |
| `/admin/screening` | 343.5 | 343.4 | 343.3 | 344 | -0.2 |
| `/admin/translations` | 304.6 | 304.6 | 304.6 | 306 | +0.0 |
| `/admin/translations_/$lang` | 306.3 | 306.2 | 306.2 | 307 | -0.1 |
| `/admin/users` | 289.9 | 289.5 | 289.6 | 291 | -0.3 |
| `/admin/users_/$userId` | 290.0 | 289.9 | 289.9 | 291 | -0.1 |
| `/auth` | 219.2 | 218.9 | 219.0 | 220 | -0.2 |
| `/auth_/callback` | 205.4 | 202.7 | 202.4 | 206 | -3.0 |
| `/auth_/reset` | 212.4 | 212.0 | 212.1 | 213 | -0.3 |
| `/c/$slug` | 222.9 | 222.5 | 222.5 | 224 | -0.4 |
| `/dev/primitives` | 226.5 | 226.1 | 226.1 | 227 | -0.4 |
| `/dev/style` | 245.3 | 244.9 | 244.9 | 246 | -0.4 |
| `/dev/tall` | 202.2 | 201.7 | 201.4 | 203 | -0.8 |
| `/l/$slug` | 248.9 | 248.5 | 248.4 | 250 | -0.5 |
| `/legal/$kind` | 206.5 | 206.1 | 205.8 | 207 | -0.7 |
| `/legal/accept` | 213.8 | 213.3 | 213.4 | 215 | -0.4 |
| `/legal/publishing` | 207.6 | 207.2 | 206.8 | 209 | -0.8 |
| `/my-listings` | 309.3 | 308.9 | 309.0 | 310 | -0.3 |
| `/my-listings_/$listingId` | 319.9 | 319.5 | 319.4 | 321 | -0.5 |
| `/my-listings_/$listingId_/edit` | 400.8 | 400.7 | 400.6 | 402 | -0.2 |
| `/post` | 400.8 | 400.6 | 400.6 | 402 | -0.2 |
| `/post_/$listingId` | 400.7 | 400.6 | 400.5 | 402 | -0.2 |
| `/privacy` | 206.5 | 206.1 | 205.8 | 207 | -0.7 |
| `/settings` | 276.4 | 276.3 | 276.4 | 277 | +0.0 |
| `/terms` | 206.5 | 206.1 | 205.8 | 207 | -0.7 |

Scratch builds for these numbers are under `/tmp/ethio-scratch/cursor-bundle-1/` (the operator's to remove).

## 4. Censuses

The brief's STEP 1 keys are answered in `docs/governance/reports/cursor-bundle-1.census.md` (committed in d200bce1e), item by item. Re-run on the final tree for this report:
- `rg -n "export function rateUntilOf" src` → `src/lib/refusal.ts:272` only.
- `rg -n "doorKeyText" src scripts e2e docs/features` → two comment mentions (`src/lib/refusal-tail.ts:10`, `docs/features/forms.md:49`), no code.
- `rg -n "admin\.monetisation\.level\.guide" src scripts e2e` → none found.
- `rg -n "door-codes\"" src --glob '!*.test.*'` → `src/lib/refusal.ts:2`, `src/lib/door-error.ts:1`, `src/server/imports/csv.ts:1`, `src/features/admin-listings/listings-page.tsx:8`, `listing-page.tsx:55`, `src/features/auth/auth-service.ts:5`, `src/features/my-listings/promote-service.ts:2`. The reader's chunk carries the list; the pages of the other six importers carry it as they carried it before.
- Corrections to my census (A3): it said the two tables `level_overrides` and `market_settings` "hold no browser grant" (it read `REVOKE ALL` and not the `GRANT SELECT (…)` two lines under it); the rules are not dead (stop 2). Its policy reader also had a `DROP TABLE` blind spot, which the final `policies.ts` handles (`DROP POLICY` and `DROP TABLE`); the census's open-rule count of eight was wrong, the standing rules are six. Ruling 2 and stop 2 both say "ten lines": the file holds six (`open-rules.txt`, six non-comment lines); the ten is the columns each of the two tables grants.

## 5. Tests

IDs added (each free across `src`, `e2e` and `scripts` when added): LFE-4 (`scripts/ci/lane-failure-evidence.test.ts`), EFR-5 (`scripts/e2e-failure-report.test.ts`), CF-LANES-6 (`scripts/conformance/lanes.test.ts`), DOORS-16 and DOORS-17 (`scripts/doors/check-doors.test.ts`), CF-LVB-15 and CF-LVB-16 (`scripts/conformance/lovable-next.test.ts`), CF-FORM-6 (`forms.test.ts`), MSV-1 to MSV-5 (`mfa/mfa-service.test.ts`), SUD-1 and SUD-2 (`mfa/step-up-dialog.test.tsx`), RTW-22 (`src/lib/refusal.test.ts`), DRC-8 (`src/lib/door-codes.test.ts`), MF-9 (`e2e/mfa-stepup.spec.ts`).
IDs changed (`auth-client.test.ts`): ASC-2 (its file list gains `email-verification.ts`), ASC-3 (a failed sign-out answers `{ ok:false, errorKey:"auth.errorGeneric" }` and logs the provider's words once); ASC-11 added; `auth-error-key.test.ts` gained one case per provider code (existing cases unchanged); `ad-page-refusals.test.ts` and `refusal-text.test.ts` re-pointed `rateUntilOf` to `@/lib/refusal` (their cases are the same; RTW-22 adds every shape); `refusal-tail.test.ts` lost the `doorKeyText` block with the function; `auth-answers.test.ts` ACTION_FILES gained the verification leaf; `admin-guides.test.ts` list takes `admin.monetisation.levels`.
Deviations from the plan's ids: stop 1 named DC-5; the file already holds DC-5, so the id is DRC-8. MSV-1 to MSV-3 grew to MSV-5; SUD-1 and SUD-2 replace the planned `step-up-gate.test.tsx` case (the dialog is the unit that draws the refusal). CF-LVB-15 and CF-LVB-16 are the next free of their family.
Red-first: DOORS-17 proves the planted case (a table with column-level SELECT and no table-level SELECT: a `none` line fires `open-rule-grants`, a line listing the columns is clean). DOORS-16 plants an undeclared rule, a line for a gone rule and a computed policy: each fires. CF-LANES-6 plants the `--` literal: the old pattern misses it, the reader finds it (the planted write is removed by `afterEach`, planted-proofs law). CF-LVB-15/16 plant each way to break the workflow's shape. MF-9 is a regression test for a defect that was not reproduced, so there is no red run for it (the brief: "if the census cannot reproduce it, it says so").
Totals on the final tree: `bunx vitest run src scripts --maxWorkers=2` — 543 files passed, 3630 tests passed, 1 skipped (before the review fix, which changed only `e2e/`); `bunx vitest run scripts --maxWorkers=2` after it — 128 files passed, 695 passed, 1 skipped. `bun run typecheck` — clean (both projects), also after the review fix. `bun run lint` — clean (`--max-warnings 0`).
`bun run checks` (the final code tree before the review fix, which touched one e2e file):
`checks (fast): 26 PASS · 0 FAIL · 487s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`
`checks: 35 PASS · 0 FAIL · 25 NOT RUN · 546s`
NOT RUN, each with its reason as the script printed it (cut at 150 characters here):
```
NOT RUN  scope › Decide whether the lanes run  (0s) — looks the commit's code tree up in the Actions API's artifacts and uploads its index (DEC-375 a), which exist only i
NOT RUN  scope › Index the code tree the lanes prove  (0s) — looks the commit's code tree up in the Actions API's artifacts and uploads its index (DEC-375 a), which exist
NOT RUN  build-and-check › Workflow lint (actionlint, pinned)  (0s) — pinned binary linux/x64 (actionlint_1.7.7_linux_amd64.tar.gz); this machine darwin/arm64
NOT RUN  build-and-check › Install dependencies  (0s) — the sandbox's dependencies are already installed; a package change is its own turn
NOT RUN  component-tests › Install dependencies  (0s) — the sandbox's dependencies are already installed; a package change is its own turn
NOT RUN  secrets-scan › Secrets scan (gitleaks, pinned)  (0s) — pinned binary linux/x64 (gitleaks_8.24.3_linux_x64.tar.gz); this machine darwin/arm64
NOT RUN  dependency-audit › Install dependencies  (0s) — the advisory service it asks is not reachable from the sandbox; CI's verdict is the judge
NOT RUN  dependency-audit › Audit  (0s) — the advisory service it asks is not reachable from the sandbox; CI's verdict is the judge
NOT RUN  e2e-preflight › Cache bun install  (0s) — compares migrations with ethio-staging through the staging credentials, which the script never holds
NOT RUN  e2e-preflight › Bun cache hit?  (0s) — compares migrations with ethio-staging through the staging credentials, which the script never holds
NOT RUN  e2e-preflight › Install dependencies  (0s) — compares migrations with ethio-staging through the staging credentials, which the script never holds
NOT RUN  e2e-preflight › Migration parity preflight (staging)  (0s) — compares migrations with ethio-staging through the staging credentials, which the script never holds
NOT RUN  e2e › Download shard results  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
NOT RUN  e2e › Download job log tails  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
NOT RUN  e2e › Download error contexts  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
NOT RUN  e2e › Verify the downloaded artifacts belong to this attempt  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and br
NOT RUN  e2e › Publish merged E2E report  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
NOT RUN  e2e › Verdict  (0s) — merges the browser lanes' artifacts from GitHub; the lanes need the temporary backend and browsers
NOT RUN  promote › Promote token present (DEC-210)  (0s) — pushes main with the promote token; only CI promotes (DEC-020)
NOT RUN  promote › Configure the actions bot  (0s) — pushes main with the promote token; only CI promotes (DEC-020)
NOT RUN  promote › Fast-forward guard (ff-only law — never merge/rebase here)  (0s) — pushes main with the promote token; only CI promotes (DEC-020)
NOT RUN  promote › Promote dev to main  (0s) — pushes main with the promote token; only CI promotes (DEC-020)
NOT RUN  bundle-budget › Install dependencies  (0s) — the sandbox's dependencies are already installed; a package change is its own turn
NOT RUN  semgrep › Upload SARIF  (0s) — GitHub's code-scanning upload, only GitHub can receive it
NOT RUN  semgrep › Warn: the SARIF upload failed  (0s) — answers the GitHub-only upload above
checks: 35 PASS · 0 FAIL · 25 NOT RUN · 546s
```
Browser runs, by id (`bun run e2e:local`, 0 retries, ethio-staging; the three E2E names are set): `e2e/mfa-stepup.spec.ts` and `e2e/admin-guides.spec.ts`, `--grep "MF-2|MF-9|AG-[1-7]"` in `mobile-360`: 9 passed (41.7 s); in `desktop-1280`: 9 passed (39.9 s). After the review fix: `--grep "MF-9"`, 1 passed in each project. No spec file ran whole. `[ssr-error]` lines in these runs: none found (`rg "\[ssr-error\]"` over both logs). The webkit projects were not run (no test of this bundle is `@webkit`). CI's lanes and the repeat lane are the full proof (§11).
J-audit line (e2e/** changed: `e2e/mfa-stepup.spec.ts` only): J1 and J3 — MF-9's scratch category is made and removed in a `try`/`finally` by `scratchSlug` and the harness; J-rules for waits — MF-9 has no wall-clock wait (ruling 1, answer 5) and no `.first()`, `.only` or `waitForTimeout`; one cast removed by the review fix. The base's `as unknown as` at `e2e/mfa-stepup.spec.ts:291` is not mine (§13).
Local proof database: `bun run db:proof --fresh` on the migration's tree (the last line below). No file under `supabase/` changed after d76cc487a (`git diff --name-only d76cc487a..HEAD -- supabase` → 0 files).

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "reader-failure" src`, `rg -n "rateLimited" src --glob '!*.test.*'`, `rg -n "startsWith\("rateLimited|"rateLimited:|indexOf\(":"\)" src`, `rg -n "error\.message|\.message\b" src/features/auth`, `rg -n "as unknown as" e2e`, `rg -n "admin\.monetisation\.level" src scripts e2e`.
- `src/lib/reader-failure.ts:49-68`: its own sets of the gate codes (`GATE_AUTH_CODES`, `GATE_REFUSED_CODES`, `FALLBACK_REFUSED_CODES`) beside `DOOR_CODES` — a second list per concern (INC-1235; ruling 1 says not in this bundle).
- `src/lib/route-client.ts:227` and `src/lib/refusal-split.ts:14` both cut at a colon; the second is the one the reader uses; the first parses a response header line, not a refusal (read, not a sibling).
- `src/features/auth/auth-service.ts:346, 363, 523, 532, 560, 584` read `error.message` or `error.code` for a `console.warn` line only; nothing is drawn from them (read, not a bypass).
- `src/features/auth/preferred-language.ts:93` returns the provider's `error.message` as a `reason`; its one caller (`src/i18n/provider.tsx:432, 541`) only logs it (traced), so it reaches no client.
- `e2e/**`: 62 `as unknown as` sites in 34 files at the final tree (`rg -c`), one of them in `e2e/mfa-stepup.spec.ts:291` at the base (§13).
- The level guide's two other readers by prefix: none (`rg` above); `e2e/admin-guides.spec.ts` reads guides by their drawing.

## 7. Allowlists and guards

- `scripts/conformance/forms-allowlist.txt`: 3 lines → 0 (a comment remains; CF-FORM-6 asserts no line).
- `scripts/conformance/vendor-seams-allowlist.txt`: +1 — `src/features/auth/email-verification.ts | the email-verification landing, moved verbatim out of auth-service.ts (INC-1153); the same direct vendor use before DEC-250 | INC-877` (the reason and until of the line it moved from).
- `scripts/conformance/route-client-allowlist.txt`: +1 — `src/features/auth/email-verification.ts | The verification landing's session handoff token reader, moved verbatim out of auth-service.ts (INC-1153); not a route call | 2027-04-24` (RCG-2 flagged the moved credential sites; the line copies `auth-service.ts`'s own).
- `scripts/route-budgets.mjs` `SHARED_SHELL_MODULES`: −1 line (`auth-error-key.ts`); no ceiling moved.
- `scripts/doors/open-rules.txt` (new): 6 lines (the standing open read rules): `category_tree_pointers`, `countries`, `currencies`, `level_overrides`, `listing_policy`, `market_settings`. The `level_overrides` and `market_settings` lines carry grants as the live column lists (ten columns each) and, as ruling 2 states, the reason `declared public data (P-1b, the public-surface allowlist); no browser reader today, INC-1236`. `scripts/public-surface-allowlist.txt` untouched.
- Guards new: `check-doors` kinds `open-rule-undeclared`, `open-rule-gone`, `open-rule-computed`, `open-rule-grants` (`FINDING_KINDS` now 17), self-tested in `plantedCases()`/`selfTest()` (DEC-334), wired in `wired.test.ts`, the live query in the smoke lane (`local-backend-proof.yml`); `lovable-next.test.ts` (CF-LVB-15/16), wired. The check-doors static self-test passed in `bun run checks` ("Door guard self-test and static check (DEC-333)").

## 8. Strings

Three new keys (member layer), two changed (guide layer). Values copied by script from the packages, sha256 checked (the three: `cursor-bundle-1-ruling-1-am.json` sha256 08dd5cb075aa56eb83da298dc48f28661735350f53aa998a1c124f1addd7f178; the two: `cursor-bundle-1-guide.json` sha256 8da556b18357d21ed54d844cb279dd78799731b696915bda0df8647ec8304e79):

- `mfa.errorSetupPending` (member layer)
  - EN: A two-factor setup was started for this account and not finished. Finish it where you started it, or try again later.
  - AM: ለዚህ መለያ የባለ ሁለት ደረጃ ማረጋገጫ ማዋቀር ተጀምሮ አልተጠናቀቀም። በጀመሩበት ቦታ ያጠናቅቁት፣ ወይም ትንሽ ቆይተው እንደገና ይሞክሩ።
- `mfa.errorFactorExists` (member layer)
  - EN: This account already has an authenticator app. Remove it before adding another.
  - AM: ይህ መለያ አስቀድሞ የማረጋገጫ መተግበሪያ አለው። ሌላ ከመጨመርዎ በፊት ያስወግዱት።
- `mfa.errorMethodOff` (member layer)
  - EN: Two-factor codes are switched off for now. Please try again later.
  - AM: የባለ ሁለት ደረጃ ማረጋገጫ ኮዶች ለጊዜው ጠፍተዋል። እባክዎ ትንሽ ቆይተው እንደገና ይሞክሩ።
- `admin.monetisation.levels.guide.what` (guide layer; new words)
  - EN: The levels an ad can have — Regular, Featured, Premium and any you add. A level sets how long an ad runs, how many photos it may carry, where it is placed and whether it wears a badge. Open a level to set its specific perks and its prices.
  - AM: ማስታወቂያ ሊኖረው የሚችለው ደረጃዎች — መደበኛ፣ የተለየ፣ ፕሪሚየም እና እርስዎ የሚጨምሩት ማንኛውም። ደረጃ ማስታወቂያ ምን ያህል እንደሚቆይ፣ ስንት ፎቶ እንደሚይዝ፣ የት እንደሚቀመጥ እና ምልክት እንደሚኖረው ይወስናል። ልዩ ጥቅሞቹን እና ዋጋዎቹን ለማስቀመጥ ደረጃውን ይክፈቱ።
- `admin.monetisation.levels.guide.how` (guide layer; new words)
  - EN: Add level creates a level with its key, names and perks. Edit changes everything but the key. A level is switched off, never removed, so ads that have it keep their history. Open a row to add specific perks and prices for this level.
  - AM: «ደረጃ ጨምር» በመለያው፣ በስሞቹ እና በጥቅሞቹ ደረጃ ይፈጥራል። «አርትዕ» ከመለያው በስተቀር ሁሉንም ይቀይራል። ደረጃ ይጠፋል እንጂ በፍጹም አይወገድም፤ ስለዚህ ያለው ማስታወቂያዎች ታሪካቸውን ይጠብቃሉ። ለዚህ ደረጃ ልዩ ጥቅሞችን እና ዋጋዎችን ለመጨመር ረድፉን ይክፈቱ።

The 18 other guide keys moved byte for byte; the sha256 (first 12 hex) of every value before and after (the table is built by script from the UTF-8 values; the full list is in `/tmp/ethio-scratch/cursor-bundle-1/guide-sha256.json`):

| key (old → new) | EN before | EN after | AM before | AM after |
| --- | --- | --- | --- | --- |
| `col.badge` | `5aba3e44bad5` | `5aba3e44bad5` | `31bc26c4c85e` | `31bc26c4c85e` |
| `col.cities` | `d3bde5d5f3a8` | `d3bde5d5f3a8` | `d59c48249f80` | `d59c48249f80` |
| `col.countries` | `789c42259925` | `789c42259925` | `456f1697c796` | `456f1697c796` |
| `col.createdBy` | `835aa6904c34` | `835aa6904c34` | `a514d887cfc6` | `a514d887cfc6` |
| `col.days` | `be5b485e1a79` | `be5b485e1a79` | `e9a2bd6156b4` | `e9a2bd6156b4` |
| `col.enabled` | `33cdd8114cf4` | `33cdd8114cf4` | `a67cb699d216` | `a67cb699d216` |
| `col.extends` | `85772b3cc975` | `85772b3cc975` | `779a00140834` | `779a00140834` |
| `col.key` | `f0a87450ca76` | `f0a87450ca76` | `94acec39e45d` | `94acec39e45d` |
| `col.name` | `96a3c946b4ef` | `96a3c946b4ef` | `7f8aca0d8b91` | `7f8aca0d8b91` |
| `col.photos` | `bb167085f4e9` | `bb167085f4e9` | `3997bd73d5c5` | `3997bd73d5c5` |
| `col.placement` | `ceff4707c4f9` | `ceff4707c4f9` | `a53c9f04b343` | `a53c9f04b343` |
| `col.price` | `b9b7dfb6d1e7` | `b9b7dfb6d1e7` | `e6f772b5768c` | `e6f772b5768c` |
| `col.regions` | `e57bccbd99ef` | `e57bccbd99ef` | `a8c18443b9f1` | `a8c18443b9f1` |
| `col.selfServe` | `be5ba6c7b5f0` | `be5ba6c7b5f0` | `e5fd386b39f2` | `e5fd386b39f2` |
| `col.sort` | `7aada978e461` | `7aada978e461` | `57d821fbaf85` | `57d821fbaf85` |
| `col.updated` | `c3a85d3c27ac` | `c3a85d3c27ac` | `a89d5ba5a7f1` | `a89d5ba5a7f1` |
| `col.updatedBy` | `1e8dd8c53259` | `1e8dd8c53259` | `b4cf141b5562` | `b4cf141b5562` |
| `how` (new words) | `725a41a8ed8d` | `32bd8754c118` | `4b0a0c3e0b3b` | `2b8d807a0692` |
| `next` | `00c8ce1906b9` | `00c8ce1906b9` | `48453c1126cc` | `48453c1126cc` |
| `what` (new words) | `bf2b4006e9e8` | `055cb84e4ea3` | `e2fa7b07a57a` | `0f5774f85476` |

Both usage maps regenerated by `bun run i18n:usage` ("1854 keys across 746 files"), committed in c510ea2b1 (and 4616cfcb2 for the three keys). `am-script.test.ts` and `strings-layers.test.ts` pass (in the 543-file run).

## 9. Migrations

File: `supabase/migrations/20261121145000_656c7e66-210f-412a-98fd-655df4c9e9fd.sql`, sha256 `51365a1e36387fae24beb760fd2ecd5521cbdb2b69178354e27bd8884f3e7290`. Mark `20261121160000`. Pairing line: `apply 656c7e66-210f-412a-98fd-655df4c9e9fd → expect mark 20261121160000` (applied by the supervisor on ethio-staging; read back: three bodies md5 `bb34f140e16803d5f2fb62eeb283908f`, `6a9604372d2f1b3f6374a0bbdf4e27b7`, `49b86d1bc95feec03c3658472a096462`, grants as the file says; ruling 2, answer 1). The preflight job of this pull request passed (it finds the mark).
Old md5s (the pre-check's): `28b6ccb09d0736cf826f3274fe6ba8b9`, `55d421a866e45ac0066ec541631b9ae0`, `6c3e807ef39e8dbf290fe768127ab49f`.
`bun run db:proof --fresh`, last line from the migration's tree (no later change under `supabase/`): `db:proof PASS — applied 545/545, CLI 2.120.0, cold, 57 s`.
No second migration file: file 2 (the two drops) was not written (ruling 2).

## 10. Departures

Rulings in the turn: ruling 1 (sha256 91a2c00c3910413acb261eed16efe8e8ec32ff32eb5095a0cb7a104786573ee8; package 08dd5cb075aa56eb83da298dc48f28661735350f53aa998a1c124f1addd7f178) and ruling 2 (sha256 b52ab19b00e637df3fb4f726d02fbc89257ea75ae887c4a565c91fee8b04ed0c); each saved by scripted copy and compared before and after.
STOPs: stop 1 (the census, PLAN FIRST; THE CUT's condition met for item 3 alone); stop 2 (the migration; file 2's pre-check condition met).
- Item 8 added by ruling 1; item 3 landed with item 2's auth move (answer 1); `/auth_/callback` on option B (answer 2), which widened SCOPE by `src/features/auth/email-verification.ts`, `src/routes/auth_.callback.tsx`, the two allowlists and `auth-answers.test.ts` (named in answer 2).
- File 2 not written and the drop commit withdrawn (ruling 2, answer 3); the two rules stand as listed open rules.
- DECIDE-AND-NAME: the code list and the gate words live in the reader's chunk (`refusal-*.js`) by way of the leaf `src/lib/door-refused-key.ts`; the instant reader is `src/lib/refusal.ts` `rateUntilOf`; the enqueuers' form is the held read (`FOR KEY SHARE OF l`, places by two CTEs); the open-rules file is `scripts/doors/open-rules.txt`, line form `<table> <policy> | <command> to <roles> | grants <role>:<privilege>[(<columns>)] … or none | <reason>`; the new ids are listed in §5 (DC-5 became DRC-8, the file holding a DC-5); item 8's guard id family is CF-LVB (the next free: 15 and 16).
- Open rules count: ruling 2 and stop 2 say ten lines; the file holds six (see §4). The records' wording in §14 says six.
- `git reset -q <path>` was used once on my own unstaged file earlier in this lane; ruling 1 accepted it this once.
- Scratch: `/tmp/ethio-scratch/cursor-bundle-1/` (builds, logs, the trial spec, the guide sha256 list) — the operator's to remove. A throwaway scratch proof file for the grants' catalogue answer was deleted and never committed (stop 2).
- A review fix, 9d74f8071 (the one cast in MF-9), after the gate; the gate was not run again for it (rule 00 step 8); its typecheck, lint, the laws (128 files) and MF-9 in both projects were.
- `bunx actionlint` failed on this machine (no darwin binary through bunx); the workflow lint is `bun run checks`' step, which names its NOT RUN above, and CI's.

## 11. CI

Base: first six lines of `ci-status.md` on `ci-evidence`, read at the start and again at the end of this turn (the commit equals `358c691ab`, the base; `git rev-parse --short origin/dev` → 358c691ab):
```
# CI Status (auto-generated — do not edit by hand)

- Commit: `358c691ab112446f68b804c5f02848beda36dff0` (short `358c691`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-21T12:43:53Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44904897718
```
No red of an earlier turn stood. This pull request's own runs: three pushes, three completed CI runs (`gh run list --branch cursor/bundle-1`): b11f13ef0 (stop 1) run 44912773267, success; 675a7e505 (stop 2) run 44916556745, success (its preflight found the mark); the last code commit 9d74f8071 (STEP 7's push) — run https://github.com/tesfayekb/ethio-marketplace/actions/runs/44957024871, `gh run view` → `headSha` 9d74f807136c4b265e62b977df936dc7be45da9a, status completed, conclusion success; `gh pr checks 91 --watch --interval 60` ended with exit 0 and 43 checks `pass`, 0 fail, 2 `skipping` (the Lovable branch guard, which runs on `lovable/*` branches, and "Promote to main", which runs only on dev). The two-step read of `branches/cursor/bundle-1/ci-status.md` on `ci-evidence`: Commit `9d74f807136c4b265e62b977df936dc7be45da9a` (short `9d74f80`), Conclusion SUCCESS, Completed (UTC) 2026-11-21T22:49:08Z, Run 44957024871; its Lanes line reads "ran — no proven code tree: no green ci.yml run of this repository holds code-tree-701670c01dfb… (0 read)", so every lane ran (nothing was reused). The budget job "First-paint bundle budget (gzipped ceiling)" passed in 27 s: no page over its ceiling, in line with the local reading in §3. Review comments on the pull request: none (`gh pr view 91 --json comments,reviews` → 0 and 0; `gh api …/pulls/91/comments` → 0); the scanner jobs (Gitleaks, Semgrep, Semgrep OSS, CodeQL ×3) all passed. Reds of this pull request's own runs: none; no re-run was made. The staging preflight passed (staging holds the mark `20261121160000`). Every lane, the repeat lane (13 m 6 s) and the webkit lane passed at `retries: 0`.

## 12. Limits

- The webkit projects and every lane other than the two Chromium projects by id were not run locally; CI proves them.
- `bun run checks` NOT RUN: actionlint and gitleaks (linux binaries on this darwin/arm64 machine), the dependency audit (the advisory service is unreachable from the sandbox), the preflight (staging credentials), the e2e merge steps, promote. CI runs each.
- The concurrent DELETE the enqueuers' lock protects against is not staged (one session): the held read is proven by the body's lock count, a gone ad by its answer (as F1-5b's proof did).
- The second sign-in prompt was never seen: MF-9 passes, which proves "one code, one prompt" on ethio-staging under these tests, not the walk's flow.
- `e2e-last-failure.md` and `guards-last-failure.md` on `ci-evidence`: read at the start for the base only; `e2e-last-failure.md` and `guards-last-failure.md` of this branch were read at the end: "last E2E run 44957024871 passed" and the guards file names the same run and commit. The flake ledger was grepped for the dates 2026-11-20 and 2026-11-21 (6 lines) and not read whole; its lines were not matched against this bundle's test ids, so no flake finding is made from it.
- Per-page sizes are local gzip sizes (a local build reads about 0.1 KiB under CI, rule 10); CI's budget job is the judge.

## 13. Findings

1. INC-1235 (ruling 1 named it): `src/lib/reader-failure.ts:49-68` could read the one list without growing a first download only where the page already carries the reader: on the joined tree 14 pages carry `reader-failure-*.js`, 12 of them also carry `refusal-*.js`; `/account` and `/legal/publishing` do not and would gain the list's chunk (564 B gzipped, the census's trial A; not re-measured on this tree). The measure was a scratch script (`/tmp/ethio-scratch/cursor-bundle-1/page-carry.mjs`, output `joined-page-carry.tsv`).
2. Rule 10 (TypeScript) is broken at the base by 62 `as unknown as` sites in 34 e2e files (`rg -c "as unknown as" e2e`), among them `e2e/mfa-stepup.spec.ts:291` in a file this turn edited; lint does not catch it. Not touched (outside this brief's numbered changes); to be planned as its own item (the rule: no known-error debt).
3. The committed image specs (CI-4, CI-5) cannot see a second step-up prompt: they inject an aal2 session and `stepUpIfPrompted` passes silently when no modal opens (`e2e/helpers/ui.ts:1105-1113` at the base). MF-9 is the one spec that counts prompts.
4. `policies.ts` did not read a policy built by dynamic SQL; `open-rule-computed` now fires for an open one. Every dynamic policy in the tree today is `USING (false)` (census).
5. INC-1229, INC-1231, INC-1232 and INC-1233 were not in `docs/tracking/incidental-findings.md` (grep, census); the records turn's.
6. `local-backend-proof.md` on `ci-evidence` named commit `8df5d28db`, not the base, at the census; republished when the lanes next run.
7. The ruling-1 prevention class (a GO naming a sha256 "after END BRIEF" the file does not have): noted by the supervisor, nothing to do here.
8. SMN-E13's flake (`e2e/submenu-look.spec.ts` :213, five ledger lines 2026-11-17 to 11-19) is INC-1015 (open at the census; closed by the tests and CI turn 2 per ruling 1); the ledger line is the records turn's.

## 14. Records

DEC — 416 (the operator's yes, 2026-11-21): one standing Lovable branch, `lovable/next`, moved up to dev's head by a workflow on every push to dev when it holds nothing dev lacks; the operator creates and selects it once and never creates or switches a branch again; the Lovable branch guard and CI judge it as any `lovable/*` branch. Not straight on dev: every Lovable save would run CI on dev and the platform's own commits would turn dev red (INC-1168); nothing would judge the work before it lands. THE FROZEN JUDGE: over the next three Lovable bundles, no branch chore is asked of the operator, the fast-forward happens after each merge, Lovable's sandbox holds the new head without a manual switch, and Publish from the branch shows dev's content; two misses return Lovable to a branch per bundle, recorded. Built: `.github/workflows/lovable-next.yml`; the guard CF-LVB-15 and CF-LVB-16 in `scripts/conformance/lovable-next.test.ts`; commit b18038a37.

INC — INC-1232, INC-1231, INC-1233 — status line: CLOSED — the summary's line (`local-backend-proof.yml`'s summary step keeps `- Repeat serially`; LFE-4) and the cap's count (`scripts/e2e-failure-report.ts` counts per-test cap lines apart from `SERIAL_CAP_LINE`, the serial pass its own clause; EFR-5); `triggerFindings` on the reader (`sqlCodeOf`) with its planted literal (CF-LANES-6); the reworded message (`a reader line is not "file::test id" (…)`, no angle brackets, no suppression comment).

register row — row 160's line: wave 2 DONE (pull request #91); `scripts/conformance/forms-allowlist.txt` holds no line.

INC — INC-1147 — class 1 CLOSED (`AUTH_REFUSALS` and `MFA_REFUSALS` read a server refusal by its provider code through `readRefusal`; `mfa_factor_name_conflict` reads `mfa.errorSetupPending`, `too_many_enrolled_mfa_factors` and `mfa_verified_factor_exists` read `mfa.errorFactorExists`, `mfa_totp_enroll_not_enabled` and `mfa_totp_verify_not_enabled` read `mfa.errorMethodOff`); classes 2 and 3 open (ACT-020).

INC — INC-1153 — status line: CLOSED — the code list and the gate words live in the reader's chunk (`refusal-*.js`, with `src/lib/refusal.ts`) and `DOOR_REFUSED_KEY` in the leaf `src/lib/door-refused-key.ts`; the entry before and after: `index-*.js` 142.5 → 142.1 KiB gzipped, shared shell 29.4 → 28.9 KiB, no page above its base, no ceiling moved.

INC — INC-1229 — status line: CLOSED — the one reader, `src/lib/refusal.ts:272` `rateUntilOf`; the ad page and the posting wizard call it; RTW-22.

INC — ACT-029 — status line: CLOSED — the prefix `admin.monetisation.levels` (`products-section.tsx`, the level branch only); the two sentences `admin.monetisation.levels.guide.what` and `.how` (package `cursor-bundle-1-guide.json`); the list line in `scripts/conformance/admin-guides.test.ts` :331.

INC — INC-1187 — status line: CLOSED — mark `20261121160000`; the held read (`FOR KEY SHARE OF l`; places by two CTEs); the proof deletes a scratch listing beside the enqueue and asserts no error and no row for it. Add to its entry: the lock's cost was weighed at stop 2 and accepted (ruling 2, answer 2).

INC — INC-1166 — status line: CLOSED — the guard (`check-doors`' three finding kinds and the smoke lane's `open-rule-grants`), `scripts/doors/open-rules.txt` (new) with six standing rules (ruling 2 says ten; the file's non-comment lines are six), the planted cases; no rule is dropped in this bundle.

INC — INC-1234 — a second two-factor prompt moments after the first, on Admin, creating a category and then generating its picture (the operator's walk of 2026-11-15). Not reproduced: SU-R1 passed in `desktop-1280` and in `mobile-360`, and SU-R2 in `desktop-1280`, 0 retries, on ethio-staging, the modal opening once in each run; MF-9 then passed in both projects. The reading that `isStepUpFresh` is stale right after the code is false on both paths. Class: unknown until a trace names it. The trace to take at the next occurrence: the access token's `aal` and `amr`, and the device's `Date.now()`; the network answer just before the modal (a P0009 from a door would show the parked path, `use-step-up.ts` :123 at the base); whether `listFactors` answered (`mfa-service.ts` :185 at the base). MF-9 pins one step-up, one prompt. Status: OPEN — waits for a trace; no change in the sign-in folder.

INC — INC-1235 — `src/lib/reader-failure.ts` holds its own sets of the gate codes beside `DOOR_CODES`. Class: one list per concern. Status: OPEN — it could read the one list without growing a first download only on the 12 of the 14 pages that carry it which already carry the reader's chunk; `/account` and `/legal/publishing` would gain the list's chunk (§13, finding 1).

INC — INC-1236 — `level_overrides` and `market_settings` grant anon and authenticated a column-level SELECT and hold an open read rule each, and nothing reads them from a browser: no commit of dev holds a direct read of either table under `src/` (`git log -S` on both spellings), and the only functions that read them as their caller, `level_perks_for` and `market_settings_for`, are closed to both browser roles (read on ethio-staging, 2026-11-21). Class: a declared public surface with no reader (DEC-407's neighbour). Not a hole: the level matrix and the free baseline, no personal data. Owner: the first part of Cursor's next bundle, by a rule frozen now — if that bundle's census still finds no browser reader and its forward-scan names none, the column grants are revoked and the two rules dropped at that bundle's migration stop, and the two allowlist lines take DEC-407's RETIRED form; otherwise each line names its reader. Open.

INC — (a finding of this lane, for the records turn) the census read a `REVOKE ALL` and not the `GRANT SELECT (…)` under it, and ruled-on counts ("ten lines") were not read from the file: a table's browser grants are read table-level AND column-level from the proof stack's catalogue (ruling 2's own class).

changelog — Cursor bundle 1: the step-up code and the two-factor refusals read through the one refusal reader (wave 2 done); the shared code list left every page's first download; one reader of a rate refusal's reset instant; the level Guide's keys moved to `admin.monetisation.levels.guide.*`; the feed enqueuers hold their listing; a census guard for every open read rule (static and live); the CI summary carries the serial line; the standing Lovable branch workflow.

roadmap — the line naming wave 2 of the form kit (line 13 or 17 at the base) ticked DONE; the line naming INC-1153 and INC-1229 ticked; the line naming ACT-029 ticked; the line naming INC-1187 and INC-1166 ticked.

slip — none from this lane except the corrections named in §4 and §10 (the census's grants reading, the "ten lines" count, the `git reset -q` use ruling 1 accepted).
