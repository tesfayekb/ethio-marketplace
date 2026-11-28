# Cursor bundle 8c-3a — the failure census sees every failure branch; a route's shape refusal carries a code — report

Base: dev f61239565 · Final commit: b0b2e1088 · Brief: docs/governance/briefs/cursor-bundle-8c-3a.md (sha256 94bfd507fdf1609d57ae6bfbf9117c23b6e5ee1408a9e1ad98c4b9b670f6c179) · Ruling 1: docs/governance/briefs/cursor-bundle-8c-3a-ruling-1.md (sha256 cec6d32caddf4537f91556c92ee62645de7bfb0e7f25113c6299ea10e9992a37)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on b0b2e10

CI of the base: `# CI Status … Commit f612395654ed95a38a67aa850203bdc90d328adb (short f612395) · Conclusion: SUCCESS · Completed (UTC): 2026-11-28T07:12:31Z · Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/46119564866`. CI of the stop's commit `f21739278` (the ruling's base): run 46124419001, success (the ruling's own words).

## 1. Done / not done, by part and step

- **Part A (INC-1349, INC-1351, FNC-5, FNC-6; guard for INC-1347).** Done: the census sees a branch by its bare flag and by its failure word (FNC-5), refuses a literal boolean handed to an outlet's `error` (FNC-6), and judges a `<StatCard failed>` handed no `error` (FNC-6b, added by ruling 1). The seven dated `BRANCH_ALLOW` lines are ended by cause. The nine branches STOP-1 held are settled by ruling 1: four ended by a fix (tier dialog, photos-soon tick, shop tick, identity save), five permanent lines naming their decision (below). `BRANCH_ALLOW` now holds five lines, all `permanent`.
- **Part B (INC-1352; RT-23, RCL-27).** Done: the boundary's own shape refusal and `catalog.find`'s answer carry a code (the brief's four sentences). RT-23 reads every `clientError(` by syntax tree; its fifteen other sentences are held until INC-1354 (ruling 1, decision 3). RCL-27 stays a pin and gained its positive control (decision 4).
- **Ruling 1 decisions.** D1 (the two shared lines `error={error}`): done. D2: (1) stat-card permanent line + FNC-6b + the board's failed tile hands an error; (2)(3)(4)(7) permanent lines; (5) tier dialog on `FailureNotice` with `retry` from `useLevelRows`; (6)(8)(9) `savePhotosSoon`, `saveSellerPlace`, `clearSellerPlace` answer ok / refusal `code[:detail]` / none, the wizard passes the answer through, step-who keeps the first refusal its fields do not show, each branch draws `draftRefusalText` or its own words, `clear_seller_place` joined `DRAFT_REFUSALS`' doors. D3: RT-23's fifteen lines name INC-1354 and Cursor 8c-3d, `until` is `INC-1354`, and the parser takes an `INC-n` until (RT-23b). D4: RCL-27's positive control. D5: ceilings, chunk by chunk, §10. D6: one push after every decision, `bun run checks` and the self-review.
- Steps: 1 orient, 2 record, 3 census, 4 parts, 5 no migration, 6 the checks, 7 browser by id, 8 self-review, 9 push + PR #124 ready. Step 10: CI green on the last code commit (§11).

## 2. Files changed

`git diff --name-only f61239565` at b0b2e1088:

```
docs/features/ci-guards.md
docs/features/route-client.md
docs/features/routes.md
docs/governance/briefs/cursor-bundle-8c-3a-ruling-1.md
docs/governance/briefs/cursor-bundle-8c-3a.md
docs/governance/reports/cursor-bundle-8c-3a.stop-1.md
roadmap.md
scripts/route-budgets.mjs
src/components/shell/failure-notice.census.test.ts
src/features/admin-categories/categories-page.tsx
src/features/admin-listings/listing-page-failure.test.tsx
src/features/admin-listings/listing-page.tsx
src/features/admin-listings/listings-page-reports.test.tsx
src/features/admin-listings/listings-page.tsx
src/features/admin-listings/tier-dialog.test.tsx
src/features/admin-listings/tier-dialog.tsx
src/features/admin-screening/job-line-failure.test.tsx
src/features/admin-screening/job-line.tsx
src/features/admin-screening/screening-decisions.test.tsx
src/features/admin-screening/screening-page.tsx
src/features/admin/roles/role-detail-failure.test.tsx
src/features/admin/roles/role-detail.tsx
src/features/admin/roles/roles-list.tsx
src/features/admin/translations/ai-bulk-bar.test.tsx
src/features/admin/translations/ai-bulk-bar.tsx
src/features/admin/users/user-detail-failure.test.tsx
src/features/admin/users/user-detail.tsx
src/features/levels/use-level-rows.test.ts
src/features/levels/use-level-rows.ts
src/features/my-listings/my-listing-page-draft.test.tsx
src/features/my-listings/my-listing-page.tsx
src/features/posting/posting-service.test.ts
src/features/posting/posting-service.ts
src/features/posting/refusal-text.ts
src/features/posting/step-photos.test.tsx
src/features/posting/step-photos.tsx
src/features/posting/step-specifications.tsx
src/features/posting/step-where-no-map.test.tsx
src/features/posting/step-where-pin-failure.test.tsx
src/features/posting/step-where-shop-failure.test.tsx
src/features/posting/step-where.test.tsx
src/features/posting/step-where.tsx
src/features/posting/step-who.test.tsx
src/features/posting/step-who.tsx
src/features/posting/wizard.tsx
src/lib/route-client.test.ts
src/routes/api/catalog.find.test.ts
src/routes/api/catalog.find.ts
src/routes/api/listings/share.test.ts
src/routes/api/listings/view.test.ts
src/routes/dev.primitives.tsx
src/server/ad-share.test.ts
src/server/ad-view.test.ts
src/server/route.test.ts
src/server/route.ts
```

New files, by `git ls-files` proof: `src/features/posting/step-where-shop-failure.test.tsx` (tracked, absent at f61239565), and the earlier part A/B new tests (`listing-page-failure.test.tsx`, `listings-page-reports.test.tsx`, `job-line-failure.test.tsx`, `role-detail-failure.test.tsx`, `user-detail-failure.test.tsx`, `my-listing-page-draft.test.tsx`, `step-where-pin-failure.test.tsx`), the brief, the ruling and the stop-1 report.

## 3. Behaviour contract — before → after

Part A/B (as in stop-1, unchanged by ruling 1):
- `defineRoute` shape refusal (`src/server/route.ts`): body `{ error: "bad request" }` → `{ error: "badShape" }`, status unchanged (400); the two other sentence lines of route.ts and `catalog.find`'s answer the same way (code in place of a sentence). Each `Retry` that could never succeed is no longer offered for them.
- Failed reads on role-detail, user-detail, job-line, listings-page, listing-page, screening-page's name-check line, ai-bulk-bar, my-listing-page's draft-none case: the page's own words (the notice's subject, same test ids) → the failure notice with the failure's reason and a Retry.

Ruling 1:
- **roles-list.tsx:239, categories-page.tsx:1103**: `error={error ?? undefined}` → `error={error}` (UF-2's text, now on origin/dev as PR #125; `git diff origin/dev HEAD` over the two files is empty).
- **`<StatCard>` on the board's failed tile** (`src/routes/dev.primitives.tsx`): drew the tile's own fallback → hands `BOARD_STAT_FAILURE` (status 500) and draws the notice's server reading, as every app caller already does. stat-card.tsx unchanged.
- **Tier dialog levels read** (`tier-dialog.tsx`): `<p>{t("common.error")}</p>`-class line → `FailureNotice` (`size="line"`, `listings-tier-levels-error`, `onRetry={levels.retry}`). A refused read (42501) draws the refused words with no Retry; a network failure offers Retry, which reads again; Confirm stays disabled in both. `useLevelRows` returns `retry` besides `rows`, `isLoading`, `error`.
- **`savePhotosSoon`, `saveSellerPlace`, `clearSellerPlace`**: `Promise<boolean>` → `Promise<ActionAnswer>` = `{ok: true}` | `{ok: false, refusal: string | null}` (`PinAnswer` is now an alias of it); the console lines are the same; `refusal` is the door's `code[:detail]` when the error names a code, else `null`. `saveSellerPlace`'s non-error, non-`{ok:true}` answer is `{ok:false, refusal:null}`.
- **Photos step** (`onPhotosSoon` prop `Promise<boolean>` → `Promise<ActionAnswer>`; wizard handler passes the answer through, the tick's put-back unchanged): a refused tick drew `post.photos.soonFailed` always → draws `draftRefusalText(refusal, t, language)` when the door named a code (the draft dial's code with its when), else `post.photos.soonFailed`; element and test id `post-photos-soon-failed` unchanged.
- **Place step shop tick**: `post.where.shopFailed` always → family words for a refusal (dial words with when for `rateLimited`), else `post.where.shopFailed`; element and test id `post-where-shop-error` unchanged. A failed re-read keeps `post.where.shopFailed`.
- **Identity save** (`step-who.tsx`): `post.who.saveFailed` always → the first refusal no field shows is drawn through `draftRefusalText`; a failure with no refusal keeps `post.who.saveFailed`; a refusal a field shows is still the field's (SWSF-4); `post-who-save-failed` unchanged.
- **`DRAFT_REFUSALS`** doors union gains `clear_seller_place` (the door has no codes of its own; the draft dial's `rateLimited` is the family's `when`).
- **RT-23's allowance** parser takes `INC-n` untils (RT-23b); no route sentence changed beyond the brief's four.

## 4. Censuses

- Failure branches at the base and at HEAD: FNC-2, FNC-3, FNC-4, FNC-4b, FNC-4c, FNC-5, FNC-6, FNC-6b pass at HEAD (census 9 tests). The nine STOP-1 hits and their routing are in ruling 1 and §7.
- `rg "saveSellerPlace|clearSellerPlace|savePhotosSoon|onPhotosSoon" src e2e`: callers are step-where.tsx (the shop tick), wizard.tsx (the photos-soon handler), step-photos.tsx (the prop) and their tests; no e2e names them.
- Test ids `SWSH-`, `SPSF-`, `SWSF-`, `RTW-25`, `RT-23b`, `FNC-6b`, `TD-9`, `LVS-11` searched across `src` and `e2e` before use: no collision (laws `TI-1` pass).
- Siblings that read `useLevelRows` without its `error`: see §13 (INC-1355).

## 5. Tests

Added / changed / re-pointed:
- **FNC-6b** (census): a StatCard handed `failed` with no `error` is a hit; the same with `error` is none; no allowed file carries one. Red first: with `dev.primitives.tsx` restored from the base, FNC-6b failed on the board's tile; green with the tile handing its error.
- **TD-8 re-pointed by ruling 1** (the refused read draws the notice's refused words, no Retry, Confirm disabled); **TD-9** new (a network failure offers Retry; Retry reads again). **LVS-11** (`use-level-rows.test.ts`): `retry` reads again after a failed read. These were written with the code; I did not run them red against the old tier dialog separately (the old dialog had no `retry` to call).
- **Per-branch tests, red first against the old code** (ran the three files before any posting code was changed: 9 failed, 19 passed): `SPSF-1` refusal → family words, `SPSF-2` rate refusal → dial words with when, `SPSF-3` no refusal → own words (step-photos.test.tsx); `SWSH-1`, `SWSH-2`, `SWSH-3` (+ `SWSH-4` an answered save draws no failure) (step-where-shop-failure.test.tsx); `SWSF-1`, `SWSF-2`, `SWSF-3` (+ `SWSF-4` a field's refusal is the field's) (step-who.test.tsx). Honest limit: `SPSF-3`, `SWSH-3`, `SWSF-3`, `SWSH-4` and `SWSF-4` were red or green on the old code for the shape of the mock (the new answer) or by being controls; the three refusal cases and the three rate cases are the ones the old code could not pass. All 28 pass after.
- **`UFW-10` (step-photos.test.tsx) changed shape**: its mock `save` answers `{ ok: false, refusal: null }` instead of `false`, because the prop's type is the answer now; its assertions are as they were.
- **`RTW-25`** (posting-service.test.ts): the three doors answer ok / `code[:detail]` / none (and a non-`{ok:true}` data answer is none); written after the code, not red first.
- **RCL-27** stays a pin, now with its positive control: the base's body `{ error: "bad request" }` from a route reads as class `malformed` (status 400), has no refusal code, and its kind is `server` with a Retry (`isRetryable`). It was never red against the base (the client was already right); the defect's red-first is RT-23's plant on the boundary's line 173 at f61239565, shown red in part B.
- **RT-23b** (route.test.ts): the allowance line's `until` takes an `INC-n` whose reason names it, a live date up to 2026-12-31, and nothing else.
- Unit totals: touched folders (`src/features/posting`, `admin-listings`, `levels`, `src/components/shell`, `route-client.test.ts`, `route.test.ts`): 162 files, 1072 tests pass. `bunx vitest run scripts --maxWorkers=2`: 152 files, 883 passed, 1 skipped (run on the final tree). `bun run typecheck`: clean on the final tree. `bunx eslint src/features/posting --max-warnings 0`: clean (full `bun run lint` is inside `bun run checks`).
- `bun run checks` (run on 1ea58da29, the tree before the ceiling commit and RTW-25; the two later commits changed `scripts/route-budgets.mjs` and one test file, and ran the laws, typecheck, lint and the budget check after): `checks (fast): 25 PASS · 0 FAIL · 711s …` and last line `checks: 36 PASS · 0 FAIL · 26 NOT RUN · 785s`. NOT RUN, each by the script's own reason: the scope index and upload (GitHub's artifacts API), actionlint and gitleaks (pinned linux/x64 binaries on darwin/arm64), the installs (dependencies present), dependency-audit (advisory service unreachable), the staging parity preflight and the e2e merge steps (no staging credential in the script; the lanes need CI's backend), promote (only CI promotes), semgrep's SARIF upload (GitHub-only).
- Browser by test id (E2E values set; names only tested): `bun run e2e:local -- e2e/post-wizard-bundle2.spec.ts e2e/post-wizard-category.spec.ts e2e/my-listings-ad.spec.ts --grep "PW-149|PW-143|PW-141|MLA-16" --retries=0 --project=mobile-360 --project=desktop-1280`: 8 passed, 0 failed, 0 transport retries. PW-149 asserts visibility only and is unchanged. No e2e file changed in this lane (the J-audit line does not apply). `[ssr-error]` lines in that run: not counted (the run's output was read for the result lines only).
- Bundle: `bun run build` then `node scripts/check-bundle-size.mjs` → `Bundle budget OK.` after the one ceiling below.

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg "useLevelRows" src`, `rg "clientError\(" src` (RT-23's own census), `rg "<StatCard" src`, `rg "soonFailed|shopFailed|saveFailed" src`.
- `src/features/admin-listings/listing-page.tsx:168`, `listings-page.tsx:136`, `src/features/admin-screening/screening-page.tsx:160` call `useLevelRows` and never read its `error` (INC-1355, owner Lovable UF-3).
- Fifteen route sentences and four names passed by name (INC-1354, Cursor 8c-3d).
- `src/features/posting/attribute-options.ts` lines 174–181 `loadAttributeOptions` answers `null` for an unanswered or refused read (a refused read is logged, its code is not kept), so a caller cannot word why: reported, not touched.
- `specsRateText` (`field-refusals.ts`) was unused before this lane's specifications line.

## 7. Allowlists and guards

- `BRANCH_ALLOW` (failure-notice.census.test.ts): base 7 dated lines (ended by cause in part A) → STOP-1's 9 dated lines → **5 permanent lines**: stat-card.tsx (DEC-464), saved-page.tsx (INC-1280, DEC-503), share-ad-dialog.tsx (DEC-503), attribute-link-cells.tsx (DEC-333, DEC-503), step-review.tsx (DEC-503); each reason carries the ruling's decision. The tier dialog, photos, place and identity lines left (no line needed: the branch draws the notice or the family's words).
- `SENTENCE_ALLOW` (route.test.ts): 0 → 15 lines, each `… | INC-1354, owned by Cursor 8c-3d (DEC-504): a sentence where a code belongs, found by RT-23; its client readers move with it | INC-1354`.
- `scripts/route-budgets.mjs`: `/admin/legal` 296 → 297 (accepted, decision 5) and `/admin/listings_/$listingId_/edit` 424 → 425 (§10).
- Guard self-tests: FNC-1's planted cases, FNC-6b's plant, RT-23's plants, RT-23b's parser cases.

## 8. Strings

none. FLAGS no-new-string held: every key drawn here is an existing key (`post.photos.soonFailed`, `post.where.shopFailed`, `post.who.saveFailed`, `common.error`, the posting family's `post.refusal.*`); proven by `bun run i18n:usage` leaving no diff and the string-scan step passing in `bun run checks`.

## 9. Migrations

none (FLAG no-migration; `git diff --name-only f61239565 -- supabase` is empty).

## 10. Departures

Stops and rulings: STOP-1 (nine branches) and STOP-2 (fifteen sentences) in `docs/governance/reports/cursor-bundle-8c-3a.stop-1.md`; ruling 1 answers both, and each decision above is built as ruled.
- **Scope widened by ruling 1**: `src/features/levels/use-level-rows.ts`, `src/features/admin-listings/tier-dialog.tsx`, `src/features/posting/step-who.tsx`, `wizard.tsx`, `refusal-text.ts`, `src/routes/dev.primitives.tsx` (each for the change named).
- **Dev.primitives decision (DECIDE-AND-NAME)**: the failed tile hands an error (`BOARD_STAT_FAILURE`, status 500), the first of the ruling's two options; the board's `INC-1279 permanent` line stays for its other states.
- **Part B's commit title** says "the boundary's shape refusal carries a code" where the brief writes "a shape refusal carries its code"; part A's red commit `c5f43b082` ("Ten branches" in its message; the allowance held nine) is landed history, accepted by ruling 1 (decision 5).
- **Part B's "EXCEPTIONS: none"** reads, by ruling 1, "the fifteen lines until INC-1354".
- **`UFW-10`'s mock** changed shape (§5); **`posting-service.ts`** gained `ActionAnswer`, which `PinAnswer` aliases.
- **`scripts/route-budgets.mjs`**: `/admin/legal` 296 → 297 (cause on its line, accepted); `/admin/listings_/$listingId_/edit` 424 → 425 = `ceilingForLocal(423.6)`: 423.6 KiB local + 0.1 sat inside the NEAR band of 424. Chunk by chunk (gzip, by chunk name against a copy of f61239565 under `/tmp/ethio-scratch/cursor-bundle-8c-3a/base`, the operator's to remove): wizard.js +247 B, posting-service.js +48 B, change-listing-tier.js +45 B, admin.roles_._roleId.js +37 B, admin.screening.js +36 B, use-level-rows.js +32 B, my-listings_._listingId.js +28 B, admin.listings_._listingId.js +25 B, admin.users_._userId.js +20 B, index.js +16 B, dev.primitives.js +12 B, every other chunk within ±7 B. The other pages' figures moved by at most +0.4 KiB (`/post` 410.8 → 411.1, `/my-listings_/$listingId_/edit` 410.9 → 411.2, `/admin/listings` 340.1 → 340.3) and none sits inside a band: the check's last run printed `Bundle budget OK.`; the `/admin/legal` growth is nil (295.6 KiB on both).
- **Self-review (rule 80) over ruling 1's delta `ca742be41..HEAD`**: 0 BLOCKER, 0 MAJOR, 3 MINOR — (1) `UFW-10`'s mock changed shape (§5); (2) `RTW-25`, `TD-9` and `LVS-11` were written with their code, not red first (the ruling asks red first of the per-branch tests and FNC-6b, which were); (3) `bun run checks` ran on 1ea58da29, not on the last two commits (§12). The one `as` cast in the diff (`saveSellerPlace`'s `data as Record`) is the base's own line moved, not new.
- **origin/dev moved** to 8474f91d7 (PR #125, UF-2) while this lane was open. It changes `categories-page.tsx` and `roles-list.tsx`, both in this lane's scope, with the text this lane's ruling-1 line already carries (empty diff); I did not merge or rebase, as the protocol says; the supervisor rules.

## 11. CI

Base: above. This pull request (#124): Run 46131049264 on b0b2e1088c98c859cc19a1e9f9c7b89e318598b9 (my last code commit): completed, success — 43 checks pass, 2 skipping (Lovable branch guard, Promote to main: skipped by their own conditions), every E2E lane (1–16, email, repeat, smoke, webkit) pass. No red in this pull request's own runs, so no re-run and no fix commit followed the push. I read the run with `gh pr checks 124` and `gh run view 46131049264` (headSha and conclusion), not the ci-evidence two-step SHA check.

## 12. Limits

- `bun run checks` ran on 1ea58da29; two later commits (a ceiling, one test file) ran their own checks as named in §5. The gate was not repeated whole for them (protocol step 8).
- The E2E logs were read for their result lines; `[ssr-error]` was not counted.
- No test of the dev board's tile in a browser; unit and census only.
- Dependency audit, gitleaks, actionlint, staging parity and every browser lane are CI's (NOT RUN locally, named in §5).

## 13. Findings

- **INC-1354**: fifteen route sentences, four more passed by name; readers include three browser specs and the translations console's sentence map (`translations-service.ts` lines 473–474); owner Cursor 8c-3d (§14).
- **INC-1355**: a failed level-rows read drawn as an absence on three staff pages (§6, §14).
- `src/features/posting/attribute-options.ts` lines 174–181: `loadAttributeOptions` cuts a refused read to `null` (not touched; for the supervisor to number).
- The `ALLOW` line for `dev.primitives.tsx` (`INC-1279 permanent`) no longer covers a StatCard; FNC-6b checks no allowed file carries one.
- A rule that misled: the brief's red-first for RCL-27 (ruling 1, class 2; the brief was wrong, the ruling says so).

## 14. Records

- DEC — The supervisor's, G17, overridable; Cursor 8c-3a ruling 1. An action's failure is drawn by what it kept. A refusal is drawn through its door family's words, and a rate refusal through the family's dial words with its when. A failure with no refusal (the network, an answer with no code) is drawn in the action's own words beside its control, which is the retry. The failure notice draws a failed read, refused or failed. A device's failure (the clipboard, the share sheet, location, the camera) is no answer from our server and keeps its own words. A failure-census line for such a branch is permanent and names this DEC. (As ruled: "DEC-503 (the supervisor's, G17, overridable; Cursor 8c-3a ruling 1) — …"; the number is the supervisor's.)
- DEC — The supervisor's, G17, overridable; it amends DEC-502. Cursor 8c-3 is four lanes. 8c-3d carries INC-1354: every route refusal answered as a sentence beyond the boundary's own becomes a code, with its client readers, and the boundary judges a refusal passed by name as well as by literal. Order: 8c-3b, then 8c-3d, then 8c-3c. Why: RT-23 found sentences the GO's census had not listed, and their readers include three browser specs and the translations console's sentence map, more room than one fix has in 8c-3a. (As ruled: "DEC-504 …".)
- INC — Route refusals answered as sentences beyond the boundary's own. Evidence: RT-23 (Cursor 8c-3a) found sentence literals in `src/routes/api/admin/attributes/export.ts` line 71, `src/routes/api/admin/locations/export.ts` line 68, `src/routes/api/admin/categories/generate-image.ts` lines 46, 94 and 102, `src/routes/api/admin/categories/suggest-icon.ts` lines 34 to 37, `src/routes/api/attributes.$id.options.ts` lines 53 and 71, `src/routes/api/i18n.$lang.ts` line 81, `src/routes/api/translate.ts` line 122, and `src/server/imports/route.ts` lines 216, 218 and 349. Two more pass a sentence by name, which RT-23 cannot read: `modeSentence` in `src/server/imports/route.ts` line 348, and `word.error` in `src/routes/api/translate.ts` line 102 (from `issueWord` in `src/lib/schemas/translate.ts`). The names in `src/routes/api/feed.ts` line 84 and `src/routes/api/seller.ts` line 63 are typed by a local union of codes. The client reads each sentence as malformed and offers a Retry that cannot succeed; the translations console reads two by sentence (`src/features/admin/translations/translations-service.ts` lines 473 and 474). Class: a route refusal carries a code (mechanism `defineRoute` / `clientError`; guard RT-23). Owner: Cursor 8c-3d (DEC-504). Status: open; RT-23's allowlist lines name it. (As ruled: "INC-1354 — …".)
- INC — A failed level-rows read drawn as an absence on three staff pages. Evidence: `src/features/admin-listings/listing-page.tsx` line 168, `src/features/admin-listings/listings-page.tsx` line 136 and `src/features/admin-screening/screening-page.tsx` line 160 call `useLevelRows` and never read its `error`; a failed read leaves the rows empty, so an ad's level reads as unknown and the level filter offers no choice, with no notice. Class: a failed read drawn as an absence (F4; mechanism `FailureNotice` with the read's `retry`, Cursor 8c-3a ruling 1). Owner: Lovable UF-3 (screens only). Status: open. (As ruled: "INC-1355 — …".)
- INC — INC-1349, INC-1351, INC-1352: fixed (what was built), each with its cause as found; INC-1347's guard landed (FNC-6, with the StatCard case). INC-1352's fix covers the brief's four; the rest is INC-1354.
- changelog — Cursor 8c-3a: the failure census sees every failure branch (a bare flag, a failure word, a literal boolean handed to an outlet; a StatCard failed with no error); an action's failure keeps its refusal on the photos-soon, shop and identity-save lines and the pin lines, drawn in the posting family's words; the tier dialog's levels read draws the failure notice with a Retry; a route's shape refusal carries `badShape`, and RT-23 judges every `clientError` sentence (fifteen held until INC-1354).
- register row — failure branches: `src/components/shell/failure-notice.census.test.ts` (FNC-1…FNC-6b) judges every branch that draws a failure; a hit goes through `FailureNotice`, the posting family's words, or a permanent `BRANCH_ALLOW` line naming its DEC or INC. Route refusal codes: `defineRoute` / `clientError`, judged by RT-23 (`src/server/route.test.ts`).
- roadmap — Cursor 8c-3a: done on the PR's green; next 8c-3b, then 8c-3d, then 8c-3c (DEC-504).
- slip — none.
