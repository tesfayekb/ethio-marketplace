# Foundations turn N1a — final report (INC-977)

CI line read: 31d5fb6b, FAILURE, with one red. The first-paint budget failed with "/admin/places: 338.0 KiB, over its ceiling of 338 KiB". Format, the i18n map and every E2E lane were green. It is fixed in this turn (item 0).

## 0. The CI red
- `/admin/places` now has a line of **339**, with the comment "338.0 on CI 31d5fb6b (INC-974: the rail seed, +0.3–0.4 on every page — the blank-menu fix)". No other line moved.
- Pages within 0.3 KiB of their line in that CI run: /admin/listings 352.8/353, /admin/translations_/$lang 319.8/320, /admin/roles 305.6/306, /admin/coverage 329.3/330.
- My production build of this tree, built outside the project, passes `check-bundle-size` (exit 0). It measures:

| Page | Measured | Line |
| --- | --- | --- |
| /admin/listings | 353.0 | 353 |
| /admin/places | 337.9 | 339 |
| /admin/translations_/$lang | 319.6 | 320 |
| /admin/roles | 305.0 | 306 |
| /admin/coverage | 329.2 | 330 |
| /admin/screening | 374.5 | 377 |

- **/admin/listings sits exactly on its line.** If CI measures it 0.1 KiB higher, it goes red. I did not move it, as ruled.

## Items
- **STEP 0:** done in stop 1 (brief, roadmap line 3, INC-974 K2 line, INC-977 split). The N1a line is now ticked.
- **Rulings 2, 3a, 3b, 5, 6 and 8 (the migration):** done in stop 1, accepted.
  - File `20261029063150_560e36c8…sql`, sha256 af181316…9b1a.
  - Staging: apply 560e36c8 → expect mark 20261029210000. Staging now has it: the E2E preflight passed.
- **Ruling 3c (the route):** done.
  - `src/routes/api/listings/identity.ts` asks the model first, as before.
  - After the door answers ok and the answer was clean, the route calls `name_check_mark(userId, 'alias', <lower-cased alias>, 'clean')` through the server client.
  - A failed mark, or a mark that finds no row for the asked text, is logged. The name stays `unchecked`.
- **Ruling 3d:** `auditUnchecked` and `alias.unchecked` are retired.
  - Updated: the route's comments, AIV-1's expectation, `docs/features/ai-gateway.md` (both lines) and `docs/features/ai-services.md`.
  - The INC-977 entry in `docs/tracking/incidental-findings.md` has its N1a fix line.
  - Historical records were left as written: spec-ledger DEC-107 and the step-19 ruling line.
- **Ruling 4:** answered in stop 1. Only `save_posting_identity` and `admin_update_profile` write `seller_alias`. `alias.ts` and `seller.ts` save no names.
- **Ruling 6 (the staff line):** done.
  - It is a plain text line under the Screening heading (`data-testid="admin-screening-name-checks"`), not a card.
  - The reader is `readNameCheckSummary` / `useNameCheckSummary` in `use-screening.ts`.
  - A failed read, or an answer out of shape, is a thrown typed failure (`ReaderError`, malformed), shown as the error line and never as 0.
  - `{date}` uses the audit page's day format (`formatLocale`, day numeric, month short).
  - The line draws inside the page's existing gate, and the door refuses a caller without listings:view.
- **Ruling 7 (tests):** done.
  - NCU-1, 2, 4, 5, 6 and 7 are the migration's proofs (stop 1).
  - NCU-3a/b/c are in `identity.test.ts`: a clean answer is marked with the exact args; `unavailable` marks nothing and logs nothing; a failed mark is logged and the save still answers ok.
  - NCU-8 is in `use-screening.test.ts`: the reader's shape, and a typed failure, never 0.
  - The E2E is one assertion in SC-1 of `e2e/admin-screening.spec.ts`: the line reads the count line or "none", never the failure.
  - All ids were grep-checked free.
- **The i18n maps:** regenerated (`docs/generated/i18n-usage.json`, `public/i18n-usage.json`). `i18n:usage` exits 0.

## Strings (G43)
The JSON's sha256 matched f2881a188cbdf8cf344de6b0dcbe2bc0b754616b2e9a5779b722ffc2c6001ccb. The strings were written by script, and a script check confirms they are byte-equal after formatting.

| Key | EN | AM |
| --- | --- | --- |
| admin.screening.nameChecks.waiting | Names waiting for the seller-name check: {n} (the oldest since {date}). | የሻጭ ስም ፍተሻን የሚጠብቁ ስሞች፦ {n} (በጣም የቆየው ከ{date} ጀምሮ)። |
| admin.screening.nameChecks.none | No names are waiting for the seller-name check. | የሻጭ ስም ፍተሻን የሚጠብቅ ስም የለም። |
| admin.screening.nameChecks.error | The names waiting for the seller-name check could not be counted. | የሻጭ ስም ፍተሻን የሚጠብቁ ስሞችን መቁጠር አልተቻለም። |

## Test counts
- **Whole unit suite:** 2,149 passed, 3 failed, 1 skipped (2,153). The 3 failures are NH-1/2/3, the sandbox's missing time-zone data, which CI has.
- **Earlier run:** it also failed ERRT-6. My new test logged with `String(error)`; it now uses `errorText`, and ERRT-6 passes.
- **E2E:** `bun run e2e:local -- e2e/admin-screening.spec.ts`, the whole file, both projects, 0 retries: **52 passed**, 0 failed.
  - SC-1 passed on desktop-1280 and mobile-360.
  - The first try was parity-blocked ("STAGING BEHIND: apply …560e36c8…"), and it passed once the operator had applied it.
  - The sandbox's browser path needed `E2E_CHROMIUM_PATH`, set to the installed Playwright Chromium.
- **Checks:**
  - `bash scripts/check-migrations.sh`: exit 0.
  - eslint and `prettier --check` on every touched file: clean.
  - `/tmp/observability/build-errors.log`: build OK.

## Lesson (stop 1)
A proof that calls a writing function and reads its effect in the same `IF` reads a snapshot taken before the write. Call the function in its own statement first. A scratch trigger function in a proof needs its own REVOKE line, or a pg_temp function.

## K2 sibling list
- `businessName` is never asked the imitation question (`src/routes/api/listings/identity.ts`, `p_business_name: text(body.businessName)`). It belongs to D222 / bundle 23, so it is not built here. `name_checks.subject` takes it by value.
- The other `useCategoryTree` readers (INC-974 K2) are a roadmap line, not built.
- N1b is open: the catch-up, its trigger (T1/T2), the imitates queue (a/b/c) and the heartbeat. It waits on the operator's two choices.

## Files (git diff --name-only 7e2006a7, plus new files)
docs/_changelog.md
docs/features/ai-gateway.md
docs/features/ai-services.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-n1a.md
docs/governance/reports/foundations-turn-n1a.report.md
docs/governance/reports/foundations-turn-n1a.stop-1.md
docs/tracking/incidental-findings.md
e2e/admin-screening.spec.ts
public/i18n-usage.json
roadmap.md
scripts/migration-guard-allowlist.txt
scripts/migration-real-row-allowlist.txt
scripts/public-surface-allowlist.txt
scripts/route-budgets.mjs
src/features/admin-screening/screening-page.tsx
src/features/admin-screening/use-screening.test.ts
src/features/admin-screening/use-screening.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/en-admin.ts
src/integrations/supabase/types.ts (regenerated by the platform after the migration)
src/routes/api/listings/identity.test.ts
src/routes/api/listings/identity.ts
supabase/migrations/20261029063150_560e36c8-6f0f-4ab9-a021-bfe1582a9431.sql

Commit: made by the platform at the end of this turn.
