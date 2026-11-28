# UF-3 — two staff rows, three screen fixes

Base: `lovable/next` = dev `3dc448dc3` (verified: HEAD is `3dc448dc3`, merge of #124). Commits in order: Part 2, Part 3, Part 4, Part 1. New strings: none. Last step: write-back of every non-task path from `3dc448dc3`, then `git diff --name-only 3dc448dc3`.

## Part 2 — INC-1355, the listing page's failed level read

- Touch: `src/features/admin-listings/listing-page.tsx` only (app). `levels` is read at line 168; the level is drawn by the `listing-fact-tier` Fact at lines 760-763.
- Placement: directly under the `listing-fact-tier` Fact, inside the same facts block, while `levels.error !== null`:
  `<FailureNotice error={levels.error} testid="listing-levels-error" size="line" subject={t("common.error")} onRetry={levels.retry} />` — tier-dialog.tsx:159-166's shape. New test id `listing-levels-error` (free in src/e2e/scripts; checked again at build, K7). The Fact itself, its words and test id are unchanged.
- `FailureNotice` is already imported (line 63): no new module, no first-download growth for /admin/listings/$id.
- New test `src/features/admin-listings/listing-page-levels.test.tsx` (useLevelRows mocked; service and route client mocked, route-client mock spreads the original):
  - UFL-1 "a failed levels read draws the shared notice beside the level" — network ReaderError → `listing-levels-error` with `common.error` words and `failure.network`.
  - UFL-2 "Retry on the levels notice reads the levels again" — click Retry by role → `retry` called once.
  - UFL-3 "a refused levels read draws the notice with no Retry" — refused class → `data-failure-reason="refused"`, no Retry button.
  - Red-first: run against the old file (UFL-1..3 fail: no notice), then pass.

## Part 3 — INC-1350, five gone codes

| Family | File:line | Change |
|---|---|---|
| MOVE_REFUSALS `ownerDeleted` | listing-refusals.ts:41 | add `ownerDeleted: "failure.gone"` to `words` |
| DECISION_REFUSALS `notYourListing` | use-screening.ts:297 | add `notYourListing: "failure.gone"` |
| IMPORT_REFUSALS `parentMissing`, `unknownCountry` | import-dialog.tsx:23 | add both → `"failure.gone"` |
| PROFILE_EDIT_REFUSALS `unknownUser` | admin-users-service.ts:248 | add `unknownUser: "failure.gone"`; its doc comment at ~244 ("unknownUser … read as the generic") updated to match |

- Allowlist: remove exactly the five `gone …` lines (36-40) under the DOORS-23 heading of `scripts/conformance/door-words-allowlist.txt`; the heading comment stays unless DOORS-23 fails it as stale (then reported, not edited).
- Tests (new files, red-first each):
  - `src/features/admin-listings/listing-refusals-gone.test.ts` UFG-1: `moveRefusalKey`(move-reasons.ts:60) of `ownerDeleted` → `failure.gone`.
  - `src/features/admin-screening/use-screening-gone.test.ts` UFG-2: `decisionRefusalKey` of `notYourListing` → `failure.gone`.
  - `src/features/admin/users/admin-users-service-gone.test.ts` UFG-3: `readRefusal(…, PROFILE_EDIT_REFUSALS).key` of `unknownUser` → `failure.gone`.
  - `src/features/admin/import-dialog-gone.test.tsx` UFG-4/UFG-5: IMPORT_REFUSALS is not exported, so the dialog is rendered and its undo refused with `parentMissing` / `unknownCountry`; the drawn words are `failure.gone`, not `common.error`.
- `user-detail.tsx` (reads PROFILE_EDIT_REFUSALS) is not touched; it gains the new word through the family.

## Part 4 — INC-1348, unnamed column switch

- Touch: `src/components/shell/columns-button.tsx:116-134`. Split the one value: `data-testid` keeps `${testid}-${column.key}`; the DOM `id` and the label's `htmlFor` become `${testid}-switch-${column.key}`. Panel ids in use: `-title`, `-description`, `-panel`, `-close`, `-all`, `-done` (toolbar-panel.tsx, columns-button.tsx); none starts with `-switch-`.
- Census of `#…`/`for=` reads of these ids: none in `src/` or `e2e/`. The only `label[for=…]` selectors are posting fields (e2e/post-wizard-where.spec.ts:461,552,558,575,581; post-wizard-pricing.spec.ts:394,437; post-wizard-specs.spec.ts:1120; step-where.test.tsx:546), unrelated. Every `data-testid` unchanged.
- New test `src/components/shell/columns-button-names.test.tsx` UFC-1 "every column switch has its column's name, a column keyed title included" — columns `title`, `price`; open the panel; `getByRole("switch", { name: <label> })` for each. Red-first: `title` fails (its label points at the heading).
- First download: the shared ColumnsList is on staff pages only; a string change, no growth.

## Part 1 — rows

| Row | Owner | Test file | Id / title | Asserts |
|---|---|---|---|---|
| A10.1 | role-detail.tsx:29-76 | `src/features/admin/roles/role-detail-states.test.tsx` | UFA-81 "uf:A10.1 role page: loading, failed read with Retry, refused without Retry, not found, Back link" | `admin.roles.loading` status; network failure → `role-detail-error` with `admin.roles.error` + Retry re-calls the read; refused → no Retry; `admin.roles.detail.notFound` alert (line 55); Back: role link, name `admin.roles.detail.back`, href `/admin/roles`, never followed (line 76) |
| A8.11 | screening-page.tsx:640-677, job-line.tsx:99-106, photo-reviews.tsx:113, photo-changes.tsx:103 | `src/features/admin-screening/screening-read-failures.test.tsx` | UFA-82 "uf:A8.11 screening: name, photo, change, job and warned-ads read failures each say their words with a Retry that reads again" | for each of `admin-screening-name-checks` (`admin.screening.nameChecks.error`), `admin-photo-reviews-error`, `admin-photo-changes-error`, `admin-job-line-error` (`admin.screening.job.error`), `admin-screening-warned-failed`: its words, `failure.network`, Retry by role re-calls that read only; warned-ads failure is said (not an empty set); a refused read of each offers no Retry |

- Allowlist: remove exactly lines 29-30 (A8.11, A10.1) of `user-facing-allowlist.txt`.
- No existing test file edited; no `as unknown as`; titles written out.

## After each commit
`bunx vitest run scripts`, `bun run lint`, `bash scripts/check-hardcoded-strings.sh`, `bash scripts/check-deletions.sh`, prettier + vitest on touched files — last lines pasted; on sandbox failure the four named guards alone; a cut-off run named as not passed. `bun run i18n:usage` after adding files (not committed).

## Files
App: listing-page.tsx, listing-refusals.ts, use-screening.ts, import-dialog.tsx, admin-users-service.ts, columns-button.tsx. Tests (new): eight files above. Scripts: seven allowlist line removals only.
