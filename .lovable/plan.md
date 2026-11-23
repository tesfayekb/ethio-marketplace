# Bundle 6 plan — numbers show their read's state (INC-1144); one look for the view-as bar (INC-1145)

Base `77fa8800c`, branch `lovable/next`. Plan only; nothing changed.

## (a) Files per part
Part A
- `src/components/shell/stat-card.tsx` + `stat-card.test.tsx` (new or extended) — failed state.
- `src/features/admin/translations/languages-page.tsx` + its test — three tiles pass read state.
- `src/features/admin/audit/audit-page.tsx` + its test — four tiles pass read state.
- `src/routes/dev.primitives.tsx` — board: loading / failed with Retry / answered side by side.
- Census fixes in my files (table c): `users-list.tsx`, `strings-page.tsx`, `data-scope.tsx`, `screening-page.tsx`, `impersonation-view.tsx` — only where the count is drawn while its read failed (confirmed per line at build).
- `docs/features/design-foundation.md` — one sentence on the tile's three states.
Part B
- New `src/components/shell/view-as-bar-look.ts` (one exported class constant).
- `src/components/shell/impersonation-notice.tsx`, `src/features/admin/impersonation/impersonation-banner.tsx` + one test asserting both bars carry the constant.
- i18n usage maps regenerated (a source file is added).

## (b) StatCard
New props: `failed?: boolean`, `onRetry?: () => void`. Precedence: `loading` > `failed` > value.
Failed tile: label kept; the value line is replaced by `common.loadFailed` (existing key) in muted text, no figure; when `onRetry` is passed, a small Retry button (`common.retry`, existing) with test id `${testid}-retry`; card test id `${testid}-failed`. `value` is not rendered at all in this state.
Callers pass `loading={q.isLoading}`, `failed={q.isError}`, `onRetry={() => q.refetch()}`:
- Translations keys tile: loading = either read loading; failed = `stats.isError || languages.isError`; retry refetches the failed one(s). Languages tile: `languages`. Approved tile: `stats`.
- Audit four tiles: `stats`.
Answered tiles unchanged.

## (c) Census (numbers drawn from a read)
| File:line | Draws | Failed read draws today | Owner / fix |
|---|---|---|---|
| translations/languages-page.tsx:116,135-140 | total keys | 0 | mine — failed tile |
| languages-page.tsx:117,141-146 | languages enabled | 0 | mine — failed tile |
| languages-page.tsx:118-122,147-152 | approved % | 0 % | mine — failed tile |
| languages-page.tsx:234 | base key count in table | 0 | mine — read at build; table's error slot or dash via key |
| audit/audit-page.tsx:259,265,271 + top-action | 24h / 7d / impersonations | 0 | mine — failed tile |
| audit-page.tsx:165,342,400 | result count, pagination total | 0 | mine — `resultCount`/`total` passed only when `list.isSuccess` |
| admin/users/users-list.tsx:148,271,293 | result count, total | 0 | mine — same |
| translations/strings-page.tsx:154,276,307,315,448,517 | per-language totals in line, result count, total | 0 | mine — same; the "{total}" line shows `common.loadFailed` when its stats read failed |
| translations/data-scope.tsx:115,173,193,243,292 | totals line, result count, total | 0 | mine — same |
| admin-screening/screening-page.tsx:770 | pagination total | 0 | mine — same |
| admin/impersonation/impersonation-view.tsx:233 | pagination total | 0 | mine — same |
| admin-listings/listings-page.tsx:246 | total | 0 | Cursor's file — reported |
| translations/ai-bulk-bar.tsx:243 | "N to translate" | 0 | Cursor's file — reported |
| admin/users/user-detail.tsx:383,418 | activity empty | empty | Cursor's file — reported |
| admin-listings/listing-page.tsx:620 | reports empty | empty | Cursor's file — reported |
| admin-locations overview `overview-stat-*` tiles | counts | to read at build | mine if under my folders; census line added at build |

Not consumers (structural lengths, no read): app-rail.tsx:194/805, row-actions.tsx:64, data-table.tsx:518, validate.ts:134, reset-scope.ts:343, use-legal-gate.ts:66 (gate, not a drawn number), progress.tsx:19 (primitive; callers checked at build).
The one rule outside a tile: NONE YET as a shared part. Proposed home: `src/lib/read-number.ts` — `numberOf(query, pick)` returning `{state:"loading"|"failed"|"ready", value?}`; `FiltersButton.resultCount` and `DataTablePagination.total` already accept "absent" (verify at build), so callers pass the value only when ready. Whether the DataTable error slot already hides pagination on error is to be confirmed at build; if it does, those rows reduce to the FiltersButton count.

## (d) Part B
`src/components/shell/view-as-bar-look.ts` exports `VIEW_AS_BAR_CLASS` (the outer bar's class string, identical at both files' line 31/62). Both bars import it. Shell's first download: the string already rides the shell chunk via impersonation-notice; it moves into a tiny module of the same chunk — net ~0 bytes. The banner's chunk keeps the same string. No other file repeats the class list (searched). The inner button classes differ between the two bars and stay as they are.

## (e) Exported types changed
`StatCardProps` (adds `failed?`, `onRetry?`). New export `VIEW_AS_BAR_CLASS`. If adopted: new `ReadNumber` type in `src/lib/read-number.ts` (src/lib is Cursor-forbidden by my knowledge for `supabase-door.ts` only; ruling to confirm).

## (f) Laws
Forms census: untouched (no form). Dialog guard: untouched. String scan: reads the new Retry/failed text (keys only). Usage maps: new file. No allowlist line.
Guard laws for Cursor: (1) `StatCard` never receives `value` without `failed` from a caller whose read may fail (census: every StatCard passes `failed`); (2) no `?.totalCount ?? 0` / `?? []).reduce|length` drawn to a count; (3) `VIEW_AS_BAR_CLASS` is the only fixed destructive top bar class list.
Unit tests holding them meanwhile: SC-U tests below, LP/AP caller tests, VAB-U1.

## (g) New test ids (each searched in src, e2e, scripts: no hit)
SC-U1 failed tile draws no number; SC-U2 Retry calls onRetry; SC-U3 loading beats failed; LPG-U1 Translations tiles failed; AUD-U1 audit tiles failed; VAB-U1 both bars carry one class list; plus one per census fix (proposed CNT-U1…CNT-U7), all to be re-searched before use.

## (h) Words
No new key: `common.loadFailed`, `common.retry` exist. If the supervisor prefers a shorter tile word ("Not loaded"), a new key `prim.stat.failed` English "Not loaded" — Amharic from the supervisor.

## (i) Browser specs reading changed parts
- `e2e/admin-audit.spec.ts:60` (`audit-stats`).
- `e2e/primitives-law.spec.ts:22,82-83` (`prim-stat-grid`, `prim-stat-tile-*` count — board gains tiles; may change its count).
- `e2e/i18n-sign-in-language.spec.ts:192-193`, `e2e/admin-audit.spec.ts:194-219` (banner ids — unchanged).
- `e2e/admin-locations.spec.ts:1270,1275` (`overview-stat-*`) only if that tile is changed.

## (j) Open points
- Is `src/lib/read-number.ts` allowed (my role allows src/lib utilities; Cursor's list names only supabase-door.ts)?
- Board's new tiles may break `primitives-law.spec.ts`'s tile count — ruling to name the test id prefix to use (`prim-stat-state-*` proposed, outside `prim-stat-tile-`).
- `feed.tsx` and other Cursor files: no count found drawn there; reported if found at build.
- Build order: Turn 1 Part A (tile, callers, census fixes, board); Turn 2 Part B + doc; last step platform write-back and both empty proofs.
