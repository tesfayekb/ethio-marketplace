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

---

# Parts 5–7 (Ruling 1: Parts 1–4 accepted as written)

Build order after ruling 2: Parts 2, 3, 4, 5, 6, 7, then Part 1, one commit each. Allowlist removals: A8.11, A10.1, A11.4 and the five DOORS-23 lines. New strings: none.

## Part 5 — INC-1346 / INC-1355: failed filter choices

**New declaration shape** (`src/components/shell/table-filters.ts`): `choicesReady?` is replaced by a required `choices` on every `TableSelectDeclaration`:

```text
type TableChoices =
  | { fixed: true }                                   // options written in code, no read
  | { read: string;                                   // the read's name; one notice per name
      ready: boolean;                                 // !isLoading
      failure: unknown;                               // the read's own error, null when fine
      retry: () => void }
```

- `useTableFilters` returns `choiceFailures: { read, failure, retry }[]`, one per distinct `read` whose `failure !== null`, so two filters on one read draw one notice. `ready` becomes `every(fixed || ready)` — a failed read counts as ready (today's behaviour: the table still reads); only the notice changes.
- **Where the notice sits**: `TableToolbar` (`src/components/shell/table-toolbar.tsx`) gains an optional `choiceFailures` prop and draws one `FailureNotice` (`size="line"`, `subject={t("common.error")}`, `onRetry={retry}`, testid `${testid}-choices-failed-${read}`) per entry, directly under the toolbar row, above the table. Each page passes its hook's `choiceFailures` to its toolbar. New test ids (K7, checked at build): `listings-toolbar-choices-failed-{markets,categories,levels}`, `admin-screening-toolbar-choices-failed-{markets,levels}`, audit's/users'/my-listings' toolbar testid + `-choices-failed-{facets,roles,categories}`.
- **Consumers**:
  - `listings-page.tsx:179/192/206` → `{read:"markets", failure: markets.failure, retry: markets.retry}`, `{read:"categories", failure: categoryTree.failure, retry: categoryTree.retry}`, `{read:"levels", failure: levels.error, retry: levels.retry}`. The levels notice also covers each row's "unknown" level (INC-1355); no second notice.
  - `screening-page.tsx:232/246` → markets, levels, same.
  - `audit-page.tsx:123/132` → both `{read:"facets", failure: facets.error, retry: () => void facets.refetch()}` → one notice (A11.4).
  - `users-list.tsx:128` → `{read:"roles", failure: roles.error, retry: () => void roles.refetch()}`.
  - `my-listings-page.tsx:196` → categories.
- **Needs a ruling — fixed-choice declarations**: a required field forces `choices: { fixed: true }` on every other select declaration: `src/features/admin-locations/locations-page.tsx` (2), `src/features/admin-ai/ai-calls.tsx` (2), `src/features/admin-countries/countries-page.tsx` (1), `src/features/admin/translations/data-scope.tsx` (1), `src/features/admin/translations/strings-page.tsx` (1), and `src/routes/dev.style.tsx` (5, under `src/routes/`). Adding one line per declaration, no behaviour change. If `src/routes/dev.style.tsx` stays out of scope, the field cannot be required: STOP until ruled.
- **Tests** (new, red-first on the old code):
  - `src/components/shell/table-filters-choices.test.tsx` UFF-1 failed read → one notice under the toolbar; UFF-2 Retry calls that read's retry; UFF-3 refused read → `data-failure-reason="refused"`, no Retry; UFF-4 two filters on one read → one notice.
  - `src/features/admin/audit/audit-page-facets.test.tsx` UFA-83 "uf:A11.4 audit: a failed facets read says so once with a Retry that reads again; a refused read offers no Retry; the action and entity filters are not drawn as empty choices without the notice".
  - `src/features/admin-listings/listings-page-levels.test.tsx` UFF-5 failed levels read on All listings → the one levels notice while rows show the unknown level.
- **First download**: `FailureNotice` is already in the admin shell; `table-filters.ts`/`table-toolbar.tsx` ride in every table page's chunk. Growth is the small union + map + notice render: all staff table pages and /my/listings. Please measure /my/listings (the one non-staff page).

## Part 6 — INC-1353: steps report in the drawing commit

- Change `useEffect` → `useLayoutEffect` (import adjusted) on exactly: `step-details.tsx:123-125`, `step-pricing.tsx:164-166`, `step-where.tsx:1400-1402`, `step-who.tsx:609-611`. Nothing else.
- **Census rule** (`src/components/forms/gate-report-effects.census.test.ts`): read every `src/**/*.{ts,tsx}` except `*.test.*`; for each `useEffect(` call, take its callback body by bracket matching; fail, naming `file:line`, when the body calls `onMissing(`, `onMissing?.(` or `.report(`. A planted self-test checks the rule catches a sample `useEffect(() => { onMissing?.([]) })` and passes the `useLayoutEffect` form. Red-first: on 3dc448dc3 it names the four lines above; after the change it passes. (Not under `scripts/`, so no allowlist; no kit.ts census — say if you want it in `scripts/conformance/` instead.)
- **Behaviour test** `src/features/posting/step-gate-timing.test.tsx` UFP-1..4 (one per step): render the step with a real `useFormGate` via `createRoot` + `flushSync` (layout effects run, passive ones not yet), then call `gate.try()` in the same tick → closed with the step's missing field. Red on the old code (gate opens), green after.
- First download: none (same chunks, a hook swap).

## Part 7 — INC-1356: `loadAttributeOptions` keeps its failure

- **New answer** (`src/features/posting/attribute-options.ts:159-181`):
  ```text
  { ok: true;  options: AttrOption[] }
  { ok: false; failure: ReaderError /* network | refused | malformed */; held: AttrOption[] | null }
  ```
  Not answered → `network`; `!ok` → `refused` (the status kept; `onRateLimited` kept for 429); bad payload → `malformed`. `held` is the expired copy, or null when `freshOnly` (K4 unchanged: lines 163-167's rule moves into `held`).
- **Each caller's decision**:
  - `use-screening.ts:403` (useScreeningSchema): throws the failure → the query fails. Drawn by `listing-page.tsx:597` (mine, Part 2 file): a `FailureNotice` (`size="line"`, testid `listing-schema-error`, Retry = `schema.refetch`) above the ad preview; and by `screening-page.tsx:993` — **needs a ruling**: screening-page is mine for Part 5 only. If allowed, the same notice beside the screening preview (testid `admin-screening-schema-error`).
  - `my-listing-page.tsx:259`: throws → `schema` query fails → `FailureNotice` (testid `my-listing-schema-error`, Retry = refetch) where the specifications are drawn.
  - `catalog-finder.ts:160`: honest go-on — a suggestion only; a failed list drops that one suggestion (as an unmatched value does today) and logs the class. No list is drawn from it.
  - `step-details.tsx:169`: honest go-on — the title helper; a failed list leaves that row out of the suggested title (no raw token, today's comment), logged. No choices drawn.
  - `step-review.tsx:330`: draws answer labels → no longer `?? []`; a failed list draws `FailureNotice` (`size="line"`, testid `post-review-options-error`, Retry re-runs that read) in the specifications section of the review.
  - `step-specifications.tsx:288`: keeps its own section words (`post.specs.optionsFailed` / the rate words) and `post-attr-options-error` with `data-attr`/`data-reason`; `data-reason` gains the class (`refused`, `malformed`, `network`, `rateLimited`); adds a Retry (the notice's existing Retry word) that sets the control back to idle and reads again. Refused reads offer no Retry. (Changes the `data-reason` values for non-429 — e2e readers checked at build; if an e2e spec reads `data-reason="failed"`, I stop and name it.)
  - `wizard.tsx:624` (freshOnly): failure → `optionsByKey[key] = null` → no choice judged (K4 as today).
  - `wizard.tsx:658` (basis): a failed list keeps the token as the label (today) and draws `FailureNotice` (testid `post-basis-options-error`, Retry re-reads) beside the price step's basis line.
- **Tests** (new, red-first): `attribute-options-failure.test.ts` UFO-1..4 (network / refused / malformed kept with class; freshOnly holds no expired copy); `step-review-options.test.tsx` UFO-5; `step-specifications-options.test.tsx` UFO-6 (each class's reason, Retry reads again, refused no Retry); `my-listing-page-schema.test.tsx` UFO-7; `listing-page-schema.test.tsx` UFO-8; `wizard-basis-options.test.tsx` UFO-9. Existing tests that mock `loadAttributeOptions` with the old shape are not edited; if any break, I stop and name them.
- **First download**: /post (wizard chunk: step-review, step-specifications, wizard gain FailureNotice if not already carried); /my/listings/$id. Please measure both.

## Rulings needed before build
1. Part 5: the six fixed-choice files, including `src/routes/dev.style.tsx`.
2. Part 7: `screening-page.tsx` for the schema-failure notice.
3. Part 6: census beside the gate as written, or in `scripts/conformance/`.
