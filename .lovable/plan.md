# UF-2 — staff-screen row tests (DEC-493, DEC-498, INC-1278)

Base: lovable/next = dev b355cbe00 (verified: merge of PR #121). Sandbox branch edit/<id> is not a stop.
Counted by script at b355cbe00: all 86 rows exist in the manifest and the allowlist.
Test id prefix: UFA-n (rg finds no UFA- in src, e2e or scripts). Every title: `UFA-n <what it proves> uf:<row>`, written-out `it(`, no `it.each`, no `as unknown as`.
Line numbers below are at b355cbe00; the build re-reads each before writing.

## Findings for your ruling (written nothing for these rows)

Defects (code is not what the row asks; not pinned):
- A10.1 — `src/features/admin/roles/role-detail.tsx:38-45`: failed state is its own `<p role="alert">admin.roles.error`, not `FailureNotice`, no Retry.
- A11.4 — `src/features/admin/audit/audit-page.tsx:118-136`: facets read failure leaves action/entity choices silently empty (`facets.data?.actions ?? []`), no failure drawn.
- A1.3 — `src/routes/admin.tsx:68-112`: the shell reads `{ permissions, loading }` only; a failed permission read is not drawn by the shell (`usePermissions` exposes `error`, line 67). What the person sees depends on the loader/boundary path; I cannot confirm from the screen that it is an error and not "no permission" (F4). Defect pending your ruling.
- A25.9 — `use-monetisation-error.ts:34-41`: the row asks generic + "Reason: {reason}" with raw text; code (D51, DEC-464) sends the text to the console and sets `raw: null`. Row and code disagree.
- A27.5 — `src/features/admin-ai/ai-refusals.ts:62-68`: same disagreement as A25.9.
- A8.11 — the row says the warned-ads read failure "becomes an empty set"; code now draws `FailureNotice` + Retry (`screening-page.tsx:664-670`). Row words are stale; I would test the current FailureNotice only if you rule the row's words.
- A14.6 — the row says "failed, no Retry"; `history-drawer.tsx:138-143` now draws FailureNotice with Retry. Same stale-words question.
- Note (not a stop): A9.3 `roles-list.tsx:239` and A18.14 `categories-page.tsx:1103` pass `error={error ? true : undefined}` to DataTable, so FailureNotice gets `true` and cannot show the failure class. Tests would assert words + Retry only; please rule whether that counts.

Cursor (8c-3):
- A16.3 Export acceptances — a download (`legal-version-view.tsx:486-530`).
- A18.6 Move up / down — the proof is the server's new order (`admin_reorder_categories`); the screen only calls the door.

## Part 1 (29 rows; 26 answerable, A1.3 defect, A8.11 ruling, A10.1 is Part 2)

File `src/features/admin/admin-shell-states.test.tsx`:
- A1.3 · admin.tsx:68 · — · defect (above).
- A1.6 · nav alerts via `useNavAlerts`/sections.ts · UFA-1 `menu shows the legal review alert uf:A1.6` · alert badge visible with its catalogue name when `legalReview` count > 0, absent at 0.
- A1.7 · admin.tsx · UFA-2 `shell words are Amharic uf:A1.7` · rail names equal am catalogue, none equal en.
File `src/features/admin/admin-landing-states.test.tsx` (route admin.index.tsx, options read like root-error.test.tsx:27):
- A2.4 · admin.index.tsx:56-61 · UFA-3 `no sections shows title and body uf:A2.4` · `admin-no-sections` holds `admin.noSections.title`/`body`.
- A2.5 · UFA-4 `landing words are Amharic uf:A2.5`.
File `src/features/admin/users/users-list-states.test.tsx`:
- A3.5 · users-list.tsx:244-253 · UFA-5 `loading, failed with Retry, empty uf:A3.5` · status loading; FailureNotice subject `admin.users.error` + Retry re-reads (service called twice); `admin.users.empty`.
- A3.7 · UFA-6 Amharic.
File `src/features/admin/users/user-detail-states.test.tsx`:
- A4.2 · user-detail.tsx:93-104 · UFA-7 loading/failed/not found (`admin.users.detail.notFound`).
- A4.5 · UFA-8 `status refusals show their words uf:A4.5` · each of `badValue`, `required`, `unknownUser` via the feature's refusal reader.
- A4.7 · UFA-9 role refusals (`roleReserved`, `unknownRole`, `badCountryCode`, `unknownUser`).
- A4.9 · UFA-10 view-as refusals (five cases).
- A4.12 · UFA-11 edit refusals from `PROFILE_EDIT_REFUSALS` (each code → its key).
- A4.13 · :370 · UFA-12 `translator block shown with permission, hidden without uf:A4.13` (useMayCall both ways).
- A4.15 · UFA-13 Amharic.
File `src/features/admin-listings/listings-page-states.test.tsx`:
- A5.2 · LP:175-221, :681-698 · UFA-14 filters by label, chips appear/clear, Columns toggles a column.
- A5.11 · LP:635-661 · UFA-15 loading/empty `listings-empty`/failed `common.error` + Retry; pager next calls service with next cursor.
- A5.12 · UFA-16 Amharic.
File `src/features/admin-listings/listing-page-states.test.tsx`:
- A6.8 · DP:767-850 · UFA-17 history lines, show/hide changes by keyboard.
- A6.10 · DP:996-1045 · UFA-18 certification lines drawn from fixture.
- A6.11 · UFA-19 Amharic.
File `src/features/admin-listings/staff-edit-states.test.tsx`:
- A7.3 · step-review.tsx:595-601 · UFA-20 identity failed shows FailureNotice with class.
- A7.5 · route :87-184; step-review :867-884 · UFA-21 Approve/Reject ask confirm before the door; `ownListing` shows its catalogue words.
File `src/features/admin-screening/screening-page-states.test.tsx`:
- A8.4 · UFA-22 each decision refusal code → `decisionRefusalKey` words.
- A8.10 · S:671-692 · UFA-23 queue loading/empty/failed + Retry; pager.
- A8.11 · ruling (above).
- A8.12 · UFA-24 Amharic.
File `src/features/admin/roles/roles-list-states.test.tsx`:
- A9.1 · RL:60-230 · UFA-25 heading, search filters rows, Columns, row Open / View members links (role, name, `to`, not followed).
- A9.2 · RL:158-375 · UFA-26 create: step-up asked before the door (guard mocked; door not called when step-up aborts), cancel closes, refusal words via `roleRefusalKey`.
- A9.3 · RL:231-246 · UFA-27 loading/failed `admin.roles.error` + Retry/empty/no match (see note).

## Part 2 (33 rows; A10.1, A11.4 defects; A14.6 ruling; A16.3 Cursor)

- A10.1 · defect.
- audit-page-states.test.tsx: A11.1 UFA-28 four counts loading/failed/Retry (StatCard); A11.2 UFA-29 chart loading/failed/empty; A11.4 defect; A11.5 UFA-30 expand detail by keyboard, capped total in pager; A11.6 UFA-31 loading/failed `admin.audit.error`/empty.
- impersonation-view-states.test.tsx: A12.2 UFA-32 End now calls the end door, retryable failure shows FailureNotice + Retry; A12.3 UFA-33 profile loading/error/empty; A12.4 UFA-34 ad list, Columns, pager, `impersonation.listings.empty`; A12.5 UFA-35 ad list loading/FailureNotice + Retry; A12.6 UFA-36 `impersonation.expired` + back link (role, name, to).
- `src/components/shell/impersonation-notice-states.test.tsx`: A12.8 UFA-37 fallback bar End, `door.refused`, Refresh page.
- languages-page-states.test.tsx: A13.2 UFA-38 three counts + Retry; A13.8 UFA-39 loading/failed/empty, flags error (L:706); A13.9 UFA-40 Amharic.
- strings-page-states.test.tsx: A14.6 ruling; A14.8 UFA-41 AI bulk count, confirm, progress, failures (ai-bulk-bar mocked service); A14.11 UFA-42 loading/failed/empty; A14.12 UFA-43 Amharic.
- legal-page-states.test.tsx: A15.7 UFA-44 facts values, edit, local errors via `legalRefusalKey`, Save/Cancel; A15.8 UFA-45 failed `admin.legal.error.load` + Retry; A15.9 UFA-46 Amharic.
- legal-version-states.test.tsx: A16.3 Cursor; A16.5 UFA-47 loading/not found/failed, compare load; A16.6 UFA-48 Amharic.
- legal-editor-states.test.tsx: A17.1 UFA-49 bad kind/country `admin.legal.badDocument`, loading/failed; A17.3 UFA-50 unknown-token and empty-fact warnings; A17.6 UFA-51 Back link `legal-back` → /admin/legal; A17.7 UFA-52 Amharic.
- categories-page-states.test.tsx: A18.3 UFA-53 Columns, pagination, page size; A18.6 Cursor; A18.11 UFA-54 bulk generate progress and failures; A18.14 UFA-55 loading/empty/failed + Retry, paths dialog opens.

## Part 3 (24 rows; A25.9, A27.5 defects)

- attributes-page-states.test.tsx: A19.2 UFA-56 coverage column values; A19.3 UFA-57 search, category filter, clear; A19.6 UFA-58 number/text fields and presets (attribute-v2-fields); A19.14 UFA-59 loading/empty/failed, link manager failed state; A19.15 UFA-60 roster/links/used-by read failures each drawn.
- `src/features/admin/section-page-states.test.tsx`: A20.1 UFA-61 `admin-section-images` with `admin.comingSoon` + body.
- locations-overview-states.test.tsx: A21.2 UFA-62 markets tile, read only with `countries:view` (both ways); A21.3 UFA-63 places tile and levels; A21.4 UFA-64 tile loading/failed/Retry; A21.5 UFA-65 links `overview-link-locations`/`-countries` (role, name, to); A21.6 UFA-66 Amharic.
- places-page-states.test.tsx: A22.3 UFA-67 Columns, pagination; A22.11 UFA-68 loading/empty/failed + Retry.
- countries-page-states.test.tsx: A23.7 UFA-69 rail dialog root-category read failed/Retry; A23.10 UFA-70 loading/empty/failed.
- monetisation-states.test.tsx: A25.7 UFA-71 prices search, columns, paging; A25.9 defect; A25.10 UFA-72 markets and products loading/empty/failed.
- ai-page-states.test.tsx: A27.2 UFA-73 search, columns, paging; A27.5 defect; A27.6 UFA-74 daily spend, feature picker, Retry, `badValue:days` words; A27.7 UFA-75 call history filters, previous/next, Retry, `badValue` words; A27.8 UFA-76 feature list loading/empty/failed; A27.9 UFA-77 Amharic.

## Technical details

- Mocks: each feature's service module via `vi.mock("./<feature>-service", async (original) => ({ ...await original(), read: vi.fn() }))` returning whole typed fixtures; route client (`callRoute`) mocked where a screen calls it directly; `@tanstack/react-router` Link rendered as `<a href>` as error-reports-page.test.tsx does; fresh QueryClient per test.
- Permission: `useMayCall` mocked per test (`mayCall` returns true / false by door name); step-up `guard` mocked to resolve or abort; a factor is never driven.
- Amharic: render with the am catalogue as legal-document-page.test.tsx does; each asserted key's text equals `am[key]` and differs from `en[key]`. No widths.
- Refusals: expected words from the feature's reader (`roleRefusalKey`, `decisionRefusalKey`, `legalRefusalKey`, PROFILE_EDIT_REFUSALS …) then the catalogue, never a copied string.
- Test ids: all assertions use existing data-testids or role/name; none missing found so far; any missing is reported, not added.
- New strings: none (no-new-string). App code: none.
- Files touched: the ~25 new test files above; `scripts/conformance/user-facing-allowlist.txt` (removal of answered lines only, per part). Defect, ruling and Cursor rows keep their lines.
- Per part: one commit; then `bunx vitest run scripts`, `bun run lint`, hardcoded-strings, deletions, prettier and vitest on touched files, last lines pasted; on sandbox failure also type-casts, user-facing and failure-notice census alone. A cut-off command is named not passed.
- Last step: write-back of every non-task path from b355cbe00, then `git diff --name-only b355cbe00`. No PR.
