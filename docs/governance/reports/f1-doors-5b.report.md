# F1-5b — the buyer's doors onto the door mechanism — report

Base: 157d28bbd (Ruling A; the brief's own `Base: dev 68b360fa1`) · Final commit: 3405164a5 · Brief: docs/governance/briefs/f1-doors-5b.md (sha256: the brief states none) · Ruling 1: docs/governance/briefs/f1-doors-5b-ruling-1.md (sha256 776aac13bdc0d4139ea8c0f533413db56d4cade0772c10f70c8c8603f421f95c, equal to the value in the message, `cmp` identical to the carrier)
Review: READY · 0 BLOCKER · 0 MAJOR · 2 MINOR · on 3405164

Two chats wrote this turn. The first chat (Opus) wrote STEPS 0 to 2 (the census, the six migration
files, stop 1). This chat (Sonnet) wrote STEPS 3 to 7 after the supervisor's ruling, stopped once
more (stop 2, `origin/dev` moved under the lane) and went on after the operator's "Update branch"
(a merge commit of dev `3c2bf65c3`, which holds #58 and #60, Lovable's L6 and L7, into the lane).
The tree the review read is that merged tree: `git diff 3c2bf65c3..HEAD` (the lane's own change) is
what the review judged; the Lovable files of #58 and #60 are theirs.

## 1. Done / not done, by part and step

- STEP 0, 1, 2 (the first chat): the brief saved, the census, six migration files, stop 1.
- Ruling 1: saved and proved (above). Decisions D1 to D9 stand; the ruling's item 1 (D2) and item 2
  (the public-surface line leaves) are built.
- STEP 3 `df234a957`: the client. `save.ts`, `report.ts`, `contact.ts` and `legal-accept-screen.tsx`
  read the shell's codes through `readRefusal` / `splitRefusal`. New files:
  `src/features/ad-page/ad-page-refusals.ts` (the family's words and the three readers) and
  `src/features/legal/legal-accept-refusals.ts` (the acceptance screen's words).
- STEP 4 `3e2a5c870`: the specs. AP-24, AP-25, AP-27, LG-20, CG-1, VP-2, VP-4 read the codes as the
  transport's error; `listing_reveal_count`'s public-surface line leaves.
- STEP 5: the gate (section 5), the self-review (the line above).
- The ceilings: `256cce723` moved three lines 404 → 405 on the old base; on the merged tree they
  read 403.2 to 403.3 KiB, so `3405164a5` puts them back to 404 (their form on that tree). Net
  change of `scripts/route-budgets.mjs` against dev `3c2bf65c3`: none.
- STEP 6: the push once (`3405164a5`), the watch. STEP 7: this report.
- Not done: the server's ad read (`src/server/ad-page.ts`, `src/server/ad-photo.ts`) and the place
  carry (`src/components/shell/place-carry-service.ts`) are NOT moved onto the reader; section 10.

## 2. Files changed

`git diff --name-only 157d28bbd` lists 71 paths: the lane's 34 and 37 more that came in through the
operator's merge of dev (`git diff --name-only 157d28bbd..3c2bf65c3`: #58 and #60's admin, forms and
consoles files, `docs/features/forms.md`, `scripts/conformance/forms-allowlist.txt`,
`scripts/route-budgets.mjs`). The lane's own list, `git diff --name-only 3c2bf65c3` (verbatim):

```
docs/features/doors.md
docs/generated/i18n-usage.json
docs/governance/briefs/f1-doors-5b-ruling-1.md
docs/governance/briefs/f1-doors-5b.md
docs/governance/reports/f1-doors-5b.census.md
docs/governance/reports/f1-doors-5b.stop-1.md
docs/governance/reports/f1-doors-5b.stop-2.md
e2e/ad-page-doors.spec.ts
e2e/auth-caller-gates.spec.ts
e2e/legal-certify.spec.ts
e2e/viewing-place.spec.ts
public/i18n-usage.json
roadmap.md
scripts/doors/check-doors-allowlist.txt
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
src/features/ad-page/ad-page-refusals.test.ts
src/features/ad-page/ad-page-refusals.ts
src/features/ad-page/contact.test.ts
src/features/ad-page/contact.ts
src/features/ad-page/report.test.ts
src/features/ad-page/report.ts
src/features/ad-page/save.test.ts
src/features/ad-page/save.ts
src/features/legal/legal-accept-refusals.test.ts
src/features/legal/legal-accept-refusals.ts
src/features/legal/legal-accept-screen.test.tsx
src/features/legal/legal-accept-screen.tsx
supabase/migrations/20261117040300_e79b19f6-6059-4f30-93e5-7040e78f536e.sql
supabase/migrations/20261117040400_afb3c699-a591-44c9-b00e-607ae6e200f4.sql
supabase/migrations/20261117040500_b9545ea9-7eab-4e41-9565-4ea9369b0610.sql
supabase/migrations/20261117040600_5c1c0ca4-9f92-409d-b923-be63f247144c.sql
supabase/migrations/20261117040700_6ea62fd4-0a6d-4c6d-a753-f11eee0195c7.sql
supabase/migrations/20261117040800_ffe4d0a8-1079-418d-ae51-f4bf552fd0e9.sql
```

New files, proved by `git ls-files --error-unmatch` (5 of 5 tracked): the four `*-refusals*` files
and `docs/governance/briefs/f1-doors-5b-ruling-1.md`. This report and the stop reports are new too.
No file is deleted. `src/i18n/` has no changed path (`git diff --name-only 3c2bf65c3 -- src/i18n`:
0 lines).

## 3. Behaviour contract — answer tables before → after

The shell turns a refusal into an HTTP status (PostgREST): the client sees `error.message = code`
(or `code:detail`), `data` null. The migration (stop 1) changed the database side; this turn's
client reads it.

| door | refusal | before (base) | after |
| --- | --- | --- | --- |
| `save_listing` | the caller's own ad | `{ok:false, reason:"ownListing"}`, 200 | error `ownListing`, 400; the service answers `ownListing` |
| `save_listing` | a listing not live | raised sentence | error `listingNotAvailable`, 400 |
| `save_listing` | a repeat save | free, `ok` | counts `save` (D2); the 201st of a day answers `rateLimited` (429) |
| `unsave_listing` | any call | no dial | spends `save` (D2, DEC-385); `listingNotAvailable` as a code |
| `report_listing` | own ad, already reported, bad reason, note too long | `{ok:false, reason}`, 200 | the same words as codes `ownListing`, `alreadyReported`, `badReason`, `noteTooLong`, 400; every refused attempt counts `report` once |
| `reveal_listing_contact` | no acceptance | `{ok:false, reason:"acceptanceRequired"}`, 200 | error `acceptanceRequired`, 400 |
| `reveal_listing_contact` | a same-day re-open, the owner's own | free | counts `contact_reveal` (D2) |
| `reveal_listing_contact` | `sellersCapReached`, the new account's `rateLimited` | returned at 200 | unchanged (D3); the gate's own `rateLimited` has no reset time (D5, INC-1170) |
| `user_set_viewing_location` | a place not open | `{ok:false}` / sentence | error `placeNotOpen`, 400; a missing profile `noProfile` (D7, drawn by no screen) |
| `accept_legal` | `adultRequired`, `badLanguage`, `emptyList`, `notApplicable`, `notInForce` | raised sentences | codes by the shell; the screen's `legal.accept.changed` line for `notInForce`, the generic line otherwise |
| `public_listing` | a visitor | passes | passes, spends nothing; a signed-in reader counted (`listing_read`); a deactivated reader 403 |
| `listing_reveal_count` | browser role | `authenticated` grant | no browser grant (D6) |

The client services keep their reason enums (`SaveRefusal`, `ReportRefusal`, `ContactRefusal`), so
no screen outside the scope changes (`report-ad.tsx`, `l.$slug.tsx`, `listing-detail.tsx` read the
same words as before). Nothing else differs from the base by this turn's change.

## 4. Censuses

- STEP 1's census is `docs/governance/reports/f1-doors-5b.census.md`: consumers, callee-codes,
  cell-meaning, definition, tests, lists, old-file-readers, second-readers, chunk-graph,
  environments, mechanisms, first-download, premises, findings, queued.
- This chat's greps, on the final tree:
  - `rg -n "message\.includes\(" src/features/ad-page src/features/legal src/components/shell
    --glob '!*.test.*'`: none found. The family no longer reads a sentence by `includes`.
  - `rg -n "message\.includes\(" src --glob '!*.test.*'`: 20 hits, all outside this family:
    `src/routes/api/attributes.$id.options.ts:43,44`, `src/routes/api/seller.ts:59,63`,
    `src/routes/api/feed.ts:80,83`, `src/server/imports/csv.ts:69`,
    `src/routes/api/listings/draft.ts:104,107`, `src/features/auth/deactivated.ts:38`,
    `src/features/admin/impersonation/impersonation-service.ts:138`,
    `src/features/admin-screening/use-photo-changes.ts:97`, `use-photo-reviews.ts:93,94`,
    `src/features/my-listings/my-listing.ts:81`, `src/features/admin-listings/listing-policy.ts:37`,
    `src/features/posting/posting-service.ts:353,1148,1150`. See section 6.

## 5. Tests

- Unit tests added: `src/features/ad-page/ad-page-refusals.test.ts` (ARF-1 to ARF-5) and
  `src/features/legal/legal-accept-refusals.test.ts` (LAR-1). Changed: `save.test.ts`,
  `report.test.ts`, `contact.test.ts`, `legal-accept-screen.test.tsx` (the `legalRefusal` mock is
  gone). Totals, from `bunx vitest run src/features/ad-page src/features/legal src/features/account
  src/components/shell src/lib/refusal` on the lane tree before the merge: `Test Files 56 passed
  (56)`, `Tests 425 passed (425)`; the merged tree's changed folders ran inside `bun run checks`
  (below).
- e2e ids changed, and why (each assertion read the old returned answer; it now reads the code):
  - AP-24 (`ad-page-doors.spec.ts`): the own save is `.error` `ownListing`, data null.
  - AP-25: title says "counts every signed-in attempt"; the repeat and the third answer `.error`
    `rateLimited` (INC-1170: no `resets_at`).
  - AP-27: title updated; the own, repeat, bad reason, long note, limited and duplicate expectations
    are `.error` codes with data null; the meter reads 10 (D2).
  - LG-20 (`legal-certify.spec.ts`): the refused reveal is `.error` `acceptanceRequired`.
  - CG-1 (`auth-caller-gates.spec.ts`): `unsave_listing` and `accept_legal` answer
    `accountDeactivated` for a deactivated account.
  - VP-2 and VP-4 (`viewing-place.spec.ts`): `placeNotOpen`, and `rateLimited` without the reset time;
    a `refusedPlace(own, id)` helper reads the error.
  - AP-26 and AP-29 were red on the old run and need no spec change: both turn green with the
    client on the reader.
- Red-first: the lane's last push before this chat (`b82f575c7`) ran CI red on exactly these ids
  (stop 1 predicted them): CG-1, AP-24, AP-25, AP-27, LG-20, VP-2, VP-4, AP-26, AP-29. That run is the
  red-first evidence; the same ids pass on the final tree locally (below).
- Local browser run, `bun run e2e:local -- <the ten spec files> --project=mobile-360
  --project=desktop-1280 --retries=0 --grep "AP-20 |AP-21 |AP-22 |AP-23 |AP-24 |AP-25 |AP-26 |AP-27
  |AP-28 |AP-29 |SAVED-1 |LG-20 |CG-1 |VP-[1-5] |ML-4 |LG-4 |LG-23 |AL-31 |LAC-4 "`, on the MERGED
  final tree: `46 passed (3.4m)`, no `[ssr-error]` line (log
  `/tmp/ethio-scratch/f1-doors-5b-5c/e2e-3.log`). The same run on the pre-merge tree: `46 passed
  (3.1m)`. No spec file ran whole. ethio-staging held the six marks.
- J-audit: `docs/features/e2e-harness.md` names laws J1 to J9; I found no script of that name
  (`rg -il "j-audit|jaudit" scripts docs/features/e2e-harness.md`: none), so no J-audit line is
  claimed. The changed specs add no `waitForTimeout`, `.first()` or `test.only` (a grep of the added
  lines: none).
- Scripts laws: `bunx vitest run scripts --maxWorkers=2` on the lane tree: 123 files, 648 tests
  passed; on the merged tree `PASS laws-first › scripts/ tests first (INC-1030)  (91s)`.
- `bun run typecheck` and `bun run lint`: pass, inside `bun run checks` (its own typecheck and lint
  jobs: `checks (fast): 26 PASS · 0 FAIL`). `bash scripts/check-migrations.sh`: `Migration guard OK.`;
  `bun scripts/doors/check-doors.ts`: `check-doors static OK: 259 manifest lines reconcile with the
  migrations' catalogue`; `bun scripts/brief/check-go.ts docs/governance/briefs/f1-doors-5b.md --at
  157d28bbd`: `[check-go] no finding`.
- `bun run checks` on the merged final tree (`3405164a5`): fast line `PASS     laws-first › scripts/
  tests first (INC-1030)  (91s)`; last line `checks: 35 PASS · 0 FAIL · 26 NOT RUN · 529s`. NOT RUN, by
  reason: the GitHub-Actions-only jobs (Lovable branch guard, Decide whether the lanes run, Index the
  code tree, the e2e artifact steps, Promote, the Semgrep upload), the linux-only binaries
  (actionlint, gitleaks), the install steps and the advisory-database audit (already installed; the
  service is not reached), and the staging-credentials e2e preflight.
- First download: `bun run build && node scripts/check-bundle-size.mjs` on the merged tree and on dev
  `3c2bf65c3` (my scratch copy `/tmp/ethio-scratch/f1-doors-5b-5c/base3`), KiB local:

  | page | dev `3c2bf65c3` | merged lane | ceiling |
  | --- | --- | --- | --- |
  | `/l/$slug` | 255.6 | 255.9 | 257 |
  | `/account_/saved` | 223.2 | 223.6 | 225 |
  | `/legal/accept` | 214.7 | 214.8 | 217 |
  | `/admin/listings_/$listingId_/edit` | 410.7 | 411.1 | 412 |
  | `/my-listings_/$listingId_/edit` | 402.8 | 403.3 | 404 |
  | `/post` | 402.8 | 403.2 | 404 |
  | `/post_/$listingId` | 402.8 | 403.2 | 404 |

  Named cause (measured on the old base `b82f575c7`, chunk by chunk, gzip): the new chunk
  `ad-page-refusals.js` +463 B, carried by the preview because `contact.ts` imports it; `refusal.js`
  +4 B; the entry `index.js` +29 B (its dependency map names the new chunk); `listing-detail.js`
  −32 B; `save.js` −40 B; `report.js` −22 B; the rest hash noise (±1 to ±7 B). The
  `/admin/listings_/$listingId_/edit` growth (+0.4) comes through the same preview closure (I did not
  read it chunk by chunk). The direct `node scripts/check-bundle-size.mjs` run also prints a NEAR
  band failure for `/admin/translations` (305.7 of 306) and `/admin/users_/$userId` (290.7 of 291);
  the same two lines print on dev `3c2bf65c3` with none of my change (`bundle-base3.log`), so they
  are #58's and #60's lines, left as the ruling says; `bun run checks`' own bundle job passed.

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "message\.includes\(" src --glob '!*.test.*'` (section 4), `rg -n
"legalRefusal|legalReasonOf" src`, `rg -n "my_viewing_location|place-carry-service" src`, `rg -n
"public_listing" src/server`.

- `src/features/legal/legal-reader.ts:98` (`legalRefusal`), read by
  `src/features/legal/my-legal-version.tsx:31`; `src/features/my-listings/my-listing.ts:593`
  (`legalReasonOf`, read at `:347`): two more readings of a code's head beside this turn's
  `refusalCode`. One `refusalCode` in `src/lib/refusal.ts` would serve all three. Out of scope, left.
- `src/components/shell/place-carry-service.ts:24` and `:41` return `error.message`, read by
  `src/components/app-shell.tsx` (`readAccountPlace`, `saveAccountPlace`), which only logs it.
  In scope by the brief; left (section 10).
- `src/server/ad-page.ts:30` and `src/server/ad-photo.ts:28` (`client.rpc("public_listing")` as the
  anonymous caller). Left (section 10).
- The `includes` readers of section 4 outside this family (`my-listing.ts:81`,
  `posting-service.ts:353,1148,1150`, `use-photo-reviews.ts:93,94`, …) read other doors' sentences;
  not this family, left.
- `src/features/auth/deactivated.ts:38` (`isDeactivatedRefusal`) matches `'account is deactivated'`,
  which the doors on the shell answer as `accountDeactivated` no more; the census's F2 found no
  caller outside its own test. Out of scope.

## 7. Allowlists and guards

- `scripts/public-surface-allowlist.txt`: 232 → 231 lines (non-comment); the `listing_reveal_count`
  line left (ruling 1, item 2). No new line.
- `scripts/doors/check-doors-allowlist.txt`: 4 → 3; the `grant-without-caller listing_reveal_count`
  line left with its grant (D6).
- `scripts/doors/manifest.txt`: the six owner doors' codes cells filled; the `listing_reveal_count`
  line left. 259 lines reconcile.
- `scripts/conformance/forms-allowlist.txt`: not touched by the lane (`report-ad.tsx` unchanged, no
  new line). `scripts/conformance/*` and `src/lib/door-codes.ts`: not changed (INC-1153).
- Guards run: `check-doors` static (self-test: 9 finding kinds fired on planted fixtures, the clean
  pair fired nothing), `scripts/check-migrations.sh` (all guards `OK`), the scripts laws. `check-doors
  --live` and the planted self-test on the smoke lane are CI's.
- No new mechanism: `readRefusal` serves the family; the two words files are rows of it, so no new
  conformance guard or `wired.test.ts` line is owed.

## 8. Strings

None. The ruling adds no key, and none was added: `git diff --name-only 3c2bf65c3 -- src/i18n` is
empty. The words files reuse existing keys (`adPage.save.rateLimited`, `adPage.save.failed`,
`adPage.report.rateLimited`, `adPage.report.already`, `adPage.report.failed`,
`adPage.contact.rateLimited`, `adPage.contact.sellersCap`, `adPage.contact.failed`,
`legal.accept.changed`, `legal.accept.error`). `docs/generated/i18n-usage.json` and
`public/i18n-usage.json` regenerated by `bun run i18n:usage`; the diff against dev is one line
(`"scanned": 728 → 730`), and `bun run i18n:map-guard` reads "usage maps match the tree" on the
merged tree.

## 9. Migrations

Six files by the first chat, unchanged since stop 1 (sha256 and marks as in stop 1). Each pairing line
reads, for ethio-staging (applied by the supervisor) and, after the merge, for ethio-prod:

| file | sha256 | mark | pairing line |
| --- | --- | --- | --- |
| `20261117040300_e79b19f6-…sql` | `a647cf233354e95e079939648aeaf08e4170cc572f2110bd2cacdf1251663035` | `20261117060000` | `apply e79b19f6 → expect mark 20261117060000` |
| `20261117040400_afb3c699-…sql` | `c9ca44ab3a35111866085a126a6f9bca5d1c8a9faf337af916807e6223693254` | `20261117060100` | `apply afb3c699 → expect mark 20261117060100` |
| `20261117040500_b9545ea9-…sql` | `91360ec9387b814c10e10dc3169f8a7c4703ff5e4a11c9689986559e12671cda` | `20261117060200` | `apply b9545ea9 → expect mark 20261117060200` |
| `20261117040600_5c1c0ca4-…sql` | `6e29d204e792fddddede185877db409b925363682aeb187b2e16ff568c20e83a` | `20261117060300` | `apply 5c1c0ca4 → expect mark 20261117060300` |
| `20261117040700_6ea62fd4-…sql` | `75306519dfa1b5b18262c7df80555ede069edab707a212e1f97019a77a6e3596` | `20261117060400` | `apply 6ea62fd4 → expect mark 20261117060400` |
| `20261117040800_ffe4d0a8-…sql` | `9f53a38615c433a2809468c43458a96fb73d5533a69071285d4d40bf4324f775` | `20261117060500` | `apply ffe4d0a8 → expect mark 20261117060500` |

`bun run db:proof --fresh`, last line from stop 1 (the first chat's run on the final migration
tree; this chat touched no SQL and did not run it): `db:proof PASS — applied 505/505, CLI 2.120.0,
cold, 53 s`. Between the production apply and the next Publish the published ad page may draw the
generic line for a refusal of this family (brief's tolerance): expected, not a red.

## 10. Departures

- Place carry and the server's ad read are not moved onto the reader. The place carry's `reason` is
  read by `app-shell.tsx`, which only logs it; the shell's message is already the bare code. The
  server reads `public_listing` as the anonymous caller, which the public gate never refuses, so no
  refusal reaches it: a reader there would be a branch no call can reach. The brief's STEP 3 words
  ("the server's ad read reads `public_listing`'s refusal as data") are not built, for that reason
  (`place-carry-service.ts:24,41`, `ad-page.ts:30`, `ad-photo.ts:28`).
- The acceptance screen's words live in `src/features/legal/legal-accept-refusals.ts`, not in
  `legal-reader.ts` as the census suggested: `legal-reader.ts` is imported by `use-legal-gate.ts` and
  `auth.tsx` (the shell's first download), and `refusal.ts` is not in the entry's closure.
- `legalRefusal` (`legal-reader.ts:98`) stays: `my-legal-version.tsx:31` still reads it.
- The services keep their reason enums and read the code through `readRefusal` (words-bearing codes
  by `read.key`, the F1-5a `isRateRefusal` precedent) and `splitRefusal` (behaviour codes with no
  words: `ownListing`, `listingNotAvailable`, `acceptanceRequired`, the `legalReasonOf` precedent):
  no new string key, as the ruling says.
- `scripts/public-surface-allowlist.txt` line removed (ruling 1, item 2: "the line leaves in this
  lane"); `docs/features/doors.md` gains an F1-5b paragraph (standing allowance).
- The i18n usage maps: the scanned count only.
- AP-26 and AP-29 are in no spec change: they turn green with the client (stop 1, decision 4).
- Ceilings: `256cce723` raised three lines 404 → 405 on the old base by DEC-296's form; on the merged
  tree the sizes fell under the band and `3405164a5` returns them to 404 (net zero against dev).
- STOP 2 and its ruling: `origin/dev` moved (`157d28bbd` → `0e51207b8` → `3c2bf65c3`, #58 and #60,
  Lovable's L6 and L7). The ruling chose the operator's "Update branch" merge, which I took by
  `git merge --ff-only origin/cursor/f1-doors-5b`; the maps regenerated (no change), the ceilings
  re-read, `bun run checks` once on the merged tree, one push.
- Ruling 1 (stop 1's): D1 to D9, items 1 and 2.
- `PLAYWRIGHT_BROWSERS_PATH` was pointed at `~/Library/Caches/ms-playwright` for the local browser
  runs (the sandbox's cache held no browser); the run itself is `bun run e2e:local`.

## 11. CI

- Base's CI (`157d28bbd`, from stop 1): `Commit: 157d28bbd8458241dae82763a85646e6780ede22`,
  `Conclusion: SUCCESS`, `Completed (UTC): 2026-11-17T03:18:31Z`, run
  https://github.com/tesfayekb/ethio-marketplace/actions/runs/44008596823.
- The lane's earlier run (`b82f575c7`, before STEPS 3 and 4): FAILURE, run 44017605815. Its gating
  reds are the ids section 5 names (stop 1 predicted them). Its table also listed IG-3, LT-4, MLA-15,
  VP-8, VP-9 and VP-10 (a slow-test table, not the gating failures; I did not classify them then).
- This pull request's own run on `3405164a5` (the last code commit; the first six lines of the lane's
  `ci-status.md`, read from `origin/ci-evidence` after the two-step SHA check: the file's commit is
  `3405164a5697952755f5570733d9d29ec5299789`, equal to the lane's `git rev-parse` of that commit):

  ```
  # CI Status (auto-generated — do not edit by hand)

  - Commit: `3405164a5697952755f5570733d9d29ec5299789` (short `3405164`)
  - Conclusion: **SUCCESS**
  - Completed (UTC): 2026-11-17T10:36:24Z
  - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44062398210
  ```

  `gh pr checks 59`: 43 pass, 1 skipping (Promote to main, which only runs on `dev`), 0 fail, 0
  pending. The 16 lanes, the email, repeat, smoke and webkit lanes and the staging preflight (so
  ethio-staging holds the six marks) all pass. The ids that were red on `b82f575c7` (CG-1, AP-24,
  AP-25, AP-26, AP-27, AP-29, LG-20, VP-2, VP-4) and the six the ruling named (IG-3, LT-4, MLA-15,
  VP-8, VP-9, VP-10) are inside lanes that pass. No red on this run: no re-run, no class to name, no
  further code commit.

## 12. Limits

- Local browser run: only the ids of section 5 by `--grep`, in mobile-360 and desktop-1280, 0
  retries; no spec file ran whole; no webkit project (no `@webkit` test changed). CI is the full
  proof.
- `bun run checks`: 26 NOT RUN, named in section 5.
- `bun run db:proof` was not run in this chat (no SQL was written); its last line is the first chat's
  (section 9).
- I could not run `check-doors --live` (smoke lane) or the e2e preflight (staging credentials).
- The `/admin/listings_/$listingId_/edit` growth of +0.4 KiB is attributed to the preview closure; I
  did not read it chunk by chunk.
- The final browser, `checks` and bundle runs are on the merged tree; the ones before the merge are
  named as such where quoted.
- Scratch copies under `/tmp/ethio-scratch/f1-doors-5b-5c/` (base builds `base`, `base3`, the logs,
  `closure-diff.mjs`) are the operator's to remove.

## 13. Findings

- F1 (census) — the feed enqueuers `feed_reindex_enqueue_listings` (`20261104153313…sql:49`),
  `feed_reindex_enqueue_categories` and `feed_reindex_enqueue_places` (`20261015023155…sql:178`,
  `:209`) are one `INSERT … SELECT FROM listings`; a listing deleted between the statement's
  snapshot and its foreign-key check raises 23503 in a job. Not this family; queued for the records
  turn.
- F2 (census) — `src/features/auth/deactivated.ts:37-38` (`isDeactivatedRefusal`) has no caller
  outside its own test and matches a sentence the shell no longer answers.
- F3 — three readings of a code's head: `refusalCode` (`src/features/ad-page/ad-page-refusals.ts`),
  `legalReasonOf` (`src/features/my-listings/my-listing.ts:593`) and `legalRefusal`
  (`src/features/legal/legal-reader.ts:98`): one `refusalCode` in `src/lib/refusal.ts` would serve them.
- F4 — `bun run build && node scripts/check-bundle-size.mjs` called directly prints a NEAR band
  failure for `/admin/translations` (305.7 of 306) and `/admin/users_/$userId` (290.7 of 291) on dev
  `3c2bf65c3` itself (local reading with its 0.1 allowance); `bun run checks`' bundle job passes.
  Lovable's lines; reported, not touched.
- F5 — the G70 prevention the supervisor wrote (two executors on the generated maps and the ceilings
  file) stands in the ruling; nothing to add.
- Security: no hole met.

## 14. Records

DEC — DEC-333 status line: turn F1-5b BUILT — the buyer's doors on `door_context` and the shell
(`save_listing`, `unsave_listing`, `report_listing`, `reveal_listing_contact`,
`user_set_viewing_location`, `accept_legal`, `public_listing`); their refusals as codes (`listingNotAvailable`,
`ownListing`, `alreadyReported`, `badReason`, `noteTooLong`, `acceptanceRequired`, `placeNotOpen`,
`noProfile`, `adultRequired`, `badLanguage`, `emptyList`, `notApplicable`, `notInForce`, with the gate's
own codes; `sellersCapReached` and the new account's `rateLimited` stay returned answers, D3); no
return type changed (all `jsonb`); every call spends its dial at the gate before the row is read (D2:
a repeat save, every refused report, every reveal tap and an unsave count); `listing_reveal_count`
lost its browser grant (D6) and its public-surface line; the migration files
`20261117040300_e79b19f6-6059-4f30-93e5-7040e78f536e.sql`,
`20261117040400_afb3c699-a591-44c9-b00e-607ae6e200f4.sql`,
`20261117040500_b9545ea9-7eab-4e41-9565-4ea9369b0610.sql`,
`20261117040600_5c1c0ca4-9f92-409d-b923-be63f247144c.sql`,
`20261117040700_6ea62fd4-0a6d-4c6d-a753-f11eee0195c7.sql`,
`20261117040800_ffe4d0a8-1079-418d-ae51-f4bf552fd0e9.sql` with the marks `20261117060000`,
`20261117060100`, `20261117060200`, `20261117060300`, `20261117060400`, `20261117060500`.

INC — INC-786 status line: CLOSED in F1-5b — `count_listing_view`, `count_listing_share`,
`save_listing`, `report_listing`, `reveal_listing_contact` and `register_listing_photo` take
`FOR KEY SHARE` on the listing read before the keyed insert (the `EXISTS` form was rejected: the
foreign-key check reads a fresh snapshot); a listing deleted mid-call answers the quiet `false`
(the counters), `listingNotAvailable` (the doors) and `listing not found` (the photo register). The
class census: admin_edit_listing_core, admin_move_listing_core, admin_set_listing_tier,
copy_my_listing, designation_sweep_core, edit_listing, edit_my_listing, feed_index_refresh,
mark_sold, publish_listing, relist_listing, remove_listing_photo, renew_listing,
replace_listing_photo, set_listing_level, set_listing_photos_soon, set_listing_pin,
set_listing_price, set_listing_reach, set_listing_reserved, submit_listing and
transition_listing_core are already safe (each holds the row by `FOR UPDATE`, `FOR SHARE` or an
`UPDATE listings` before its keyed insert: the census's table gives each line); the three feed
enqueuers (one `INSERT … SELECT`) are left (finding F1).

INC — INC-821 status line: CLOSED in F1-5b with INC-786 (the same census).

INC — INC-1158 status line: the same class in this family — none: every cell held (`save` 200 a day,
`report` 10 a day, `contact_reveal` 30 a day, `contact_reveal_sellers` 10 a day, `viewing_place` 60 an
hour, `legal_accept` 60 an hour, `listing_read` 600 an hour, each read against its work in the
census's `cell-meaning`); `unsave_listing` gains `save` (DEC-385, the line stood).

INC — INC-1170 status line: widened — in F1-5b the gate's `rateLimited` of `save_listing`,
`report_listing`, `reveal_listing_contact` and `user_set_viewing_location` carries no reset time (the
`resets_at` assertions at AP-25, AP-27 and VP-4 left); F1-7 gives the shell's `rateLimited` its reset.

register row — the doors' row gains "the buyer's doors on the shell (F1-5b)".

register row — a counter keyed to a listing never raises on a deleted listing → the listing read
before the keyed insert takes `FOR KEY SHARE` (`count_listing_view`, `count_listing_share`,
`save_listing`, `report_listing`, `reveal_listing_contact`, `register_listing_photo`) → the proofs
(in each migration file: delete the scratch listing between the read and the write, assert the
quiet answer, never a 23503) → exceptions: none; the feed enqueuers' one-statement form is left
(finding F1).

changelog — 2026-11-17 turn F1-5b (Opus 5.5 and Sonnet 5.5): the buyer's doors on the door
mechanism — save, report, contact reveal, the place carry, the legal acceptance and the public ad
read, one gate in one order, refusals as codes read by the one reader; the counters no longer log an
error for an ad deleted mid-view.

roadmap — the Foundations 1 line gains "F1-5b DONE (pull request #59, marks 20261117060000 →
20261117060500)"; left: the buyer's readers (`listing_saved`, `my_saved_listings`,
`my_viewing_location`, `listing_contact_refusals`) and the typed result of every door call (F1-7,
INC-838); `door_context`'s `rateLimited` reset time (F1-7, INC-1170); the staff doors (F1-6); the
place carry's and the server ad read's reader (no refusal reaches them today — F1-7 if the readers
change).

slip — none.
