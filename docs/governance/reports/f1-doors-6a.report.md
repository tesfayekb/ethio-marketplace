# Foundations 1, turn F1-6a — the staff's listing and screening doors onto door_context and the shell — report
Base: dev 143027fac · Final commit: 7f5a2cf34 (the last code commit; CI section below) · Brief: docs/governance/briefs/f1-doors-6a.md (the task stated no sha256)
Review: READY · 0 BLOCKER · 1 MAJOR · 3 MINOR · on 7f5a2cf

CI line opening the turn (rule 40, AGENTS.md): dev's last completed run is `1221ff615bc9d5f01850b8656a1e7ea2ae9d64fd`, SUCCESS (read from `origin/ci-evidence:docs/tracking/ci-status.md`, run 44291354731). Stop 2 recorded the earlier dependency-audit red on dev; it was fixed by the picomatch turn and is green on the pull request.

This report covers STEPS 3–7 (a second chat; STEPS 0–2 and the correction are the first chat's: the census, stop 1, stop 2 and `docs/governance/reports/f1-doors-6a.correction.md`).

## 1. Done / not done, by part and step

- STEP 3 (the client) — DONE, `27fce75b2`: the types patch applied by `git apply`; every console mapper of the listings and screening consoles reads its refusal through `readRefusal` (`src/lib/refusal.ts`) over a words table; the eight CF-FORM-3 lines left `forms-allowlist.txt`; the screening decision calls `admin_review_listing`; "Show number" has its own key `admin.roles.perm.action.reveal` (the `action:reveal` allowance left); Mark reviewed asks the second factor.
- STEP 4 (the tests) — DONE, `31a241f2d`: the e2e ids of the census's `tests` item now expect the codes; the DEC-403 definition search is run and pasted (§4).
- STEP 5 (the gate) — DONE with the limits in §12: typecheck, lint, scripts laws, touched unit tests, `bun run build` + `check-bundle-size`, `bun run checks`, `check-go`. The browser check by `--grep` was NOT run (staging lacks the correction's mark, §12).
  - Two commits the gate caused: `d6ead2e6c` (ENTRY_CLOSURE follows the build, §10) and `0d7cd54c7` (a stale error-text allowance and three `as unknown as` casts of my own test, found by the gate's first whole run and by the self-review).
- Ruling 2's decisions 10 and 11 — DONE in `27fce75b2`: the `admin_review_listing` line in `scripts/acceptance-doors-allowlist.txt`; the three stale reasons (`scripts/public-surface-allowlist.txt` :22, :52, and the acceptance line of the reveal).
- STEP 6 — pushed `0d7cd54c7` once, pull request #64 marked ready; CI's first run was red on four specs the census's `tests` item had not listed and on one CodeQL alert; the one further code commit `7f5a2cf34` fixes them (§10, §11). CI section below.
- STEP 7 — this report; the feature guides `docs/features/admin-listings.md`, `admin-screening.md` carry their sections (`584015c86`).

## 2. Files changed

`git diff --name-only 143027fac` (80 paths, before this report's own file). 18 of them (`git diff --name-only 143027fac origin/dev`) reached the branch through the operator's merge of dev (the picomatch turn and Lovable's #63) and are not this lane's: `docs/features/dependency-audit.md`, `docs/generated/i18n-usage.json` and `public/i18n-usage.json` (regenerated again here), `docs/governance/briefs/pkg-picomatch*.md`, `docs/governance/reports/pkg-picomatch*.md`, `e2e/ad-page.spec.ts`, `roadmap.md`, `scripts/audit-*`, `scripts/conformance/wired.test.ts`, `scripts/route-budgets.mjs` (edited again here), `src/features/ad-page/save-intent*`, `src/routes/l.$slug.tsx`.

```
docs/features/admin-listings.md
docs/features/admin-screening.md
docs/features/dependency-audit.md
docs/features/doors.md
docs/generated/i18n-usage.json
docs/governance/briefs/f1-doors-6a-ruling-1.md
docs/governance/briefs/f1-doors-6a-ruling-2.md
docs/governance/briefs/f1-doors-6a.md
docs/governance/briefs/pkg-picomatch-ruling-1.md
docs/governance/briefs/pkg-picomatch.md
docs/governance/reports/f1-doors-6a.census.md
docs/governance/reports/f1-doors-6a.correction.md
docs/governance/reports/f1-doors-6a.stop-1.md
docs/governance/reports/f1-doors-6a.stop-2.md
docs/governance/reports/pkg-picomatch.report.md
docs/governance/reports/pkg-picomatch.stop-1.md
e2e/ad-page-doors.spec.ts
e2e/ad-page.spec.ts
e2e/admin-listings.spec.ts
e2e/admin-screening.spec.ts
e2e/my-listings-doors.spec.ts
public/i18n-usage.json
roadmap.md
scripts/acceptance-doors-allowlist.txt
scripts/audit-exceptions.ts
scripts/audit-exceptions.txt
scripts/audit-gate.sh
scripts/audit-gate.test.ts
scripts/conformance/error-text-allowlist.txt
scripts/conformance/forms-allowlist.txt
scripts/conformance/wired.test.ts
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/judge.ts
scripts/doors/manifest.txt
scripts/doors/step-ups.ts
scripts/public-surface-allowlist.txt
scripts/route-budgets.mjs
src/features/ad-page/save-intent.test.ts
src/features/ad-page/save-intent.ts
src/features/admin-listings/change-listing-tier.test.ts
src/features/admin-listings/edit-listing.test.ts
src/features/admin-listings/edit-listing.ts
src/features/admin-listings/listing-page.tsx
src/features/admin-listings/listing-photos.test.tsx
src/features/admin-listings/listing-policy.test.ts
src/features/admin-listings/listing-policy.ts
src/features/admin-listings/listing-refusals.ts
src/features/admin-listings/listings-page.tsx
src/features/admin-listings/move-reasons.test.ts
src/features/admin-listings/move-reasons.ts
src/features/admin-listings/photo-remove.test.ts
src/features/admin-listings/photo-remove.ts
src/features/admin-listings/tier-reasons.test.ts
src/features/admin-listings/tier-reasons.ts
src/features/admin-listings/undo-edit.test.ts
src/features/admin-listings/undo-edit.ts
src/features/admin-screening/photo-changes.test.tsx
src/features/admin-screening/photo-changes.tsx
src/features/admin-screening/use-photo-changes.test.ts
src/features/admin-screening/use-photo-changes.ts
src/features/admin-screening/use-photo-reviews.test.ts
src/features/admin-screening/use-photo-reviews.ts
src/features/admin-screening/use-screening.test.ts
src/features/admin-screening/use-screening.ts
src/features/posting/use-edit-draft.test.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/en-admin.ts
src/integrations/supabase/types.ts
src/routes/l.$slug.tsx
supabase/migrations/20261118012100_bc29ea76-91c8-4bef-b10a-43631dce3928.sql
supabase/migrations/20261118012200_8af8d6de-451a-42f7-9f4a-6d34dcd7cdc5.sql
supabase/migrations/20261118012300_6aaba954-b8be-45af-9441-2568fa79849b.sql
supabase/migrations/20261118012400_64aca671-da4e-4957-9b60-d2507bbdec58.sql
supabase/migrations/20261118012500_f28efa6b-af25-4885-a95e-c9651318213a.sql
supabase/migrations/20261118012600_f4b5a77e-d92d-434c-b464-faed97296c53.sql
supabase/migrations/20261118012700_dcd3867e-e839-4780-8308-6bb9a66bf0b8.sql
supabase/migrations/20261118012800_2fd5e6a5-1831-4de4-abee-3ae5c55be1ea.sql
supabase/migrations/20261118012900_14117b17-8154-4c64-8cb3-0c1750236627.sql
supabase/migrations/20261118013000_3d2071ff-9fcb-4ad9-bf37-b366172e9c69.sql
```

New files (`git ls-files` proof): `src/features/admin-listings/listing-refusals.ts`, the ten migration files `supabase/migrations/20261118012100…013000_*.sql`, the briefs/reports under `docs/governance/`.

## 3. Behaviour contract — answer tables before → after

Server answers (the migrations; first chat, proved by `db:proof`): see §9 and the stop-2 report's tables. This turn's client side, base → now:

| screen / function | before | after |
|---|---|---|
| `moveErrorKey`, `editErrorKey`, `photoRemoveErrorKey`, `undoErrorKey`, `tierErrorKey`, `settingsErrorKey`, `photoAllowErrorKey`, `photoChangeErrorKey` | read a sentence (`"listing not found"`, `startsWith("your own listing")`, `includes("reviewGone")` …) | read `code[:detail]` through `readRefusal`; each maps the same codes to the SAME existing keys, so a problem line keeps its words; an unknown code is the family's generic (`common.error` or the settings' own); `badValue:<field>` is worded by `badValueWords` (reason → `admin.listings.move.pickReason`, tier → `admin.listings.level.error.unknown`, renew_days → `admin.listings.settings.daysHelp`) |
| `listings-page.tsx` bulk move | `message === "rateLimited"` stops the loop | `doorCode(message).code === "rateLimited"` (same stop) |
| `listing-page.tsx` missing ad | `=== "listing not found"` | `doorCode(…).code === "listingNotFound"` |
| `decideListing` (Approve, Reject, the Edit's Review) | `transition_listing` | `admin_review_listing` (DEC-402) |
| `revealContact` | a raised error was thrown; the dial came back as a returned answer | a raised `rateLimited` is the returned `rateLimited` the screen words as before; any other refusal throws |
| `PhotoChanges` Mark reviewed | the door only | `guard(() => reviewPhotoChange(id))`; a cancel is silent, a missing factor says the hint, a code is worded (DEC-401) |
| `/admin/screening` and the two listings pages' first download | see §10 | every page falls 2.9–5.0 KiB |

Everything else is today's.

## 4. Censuses

DEC-403 (ruling 2, "FOR STEP 3"): a spec in which a seller who is also staff decides their own ad. By definition (a seller id equal to the staff account in a review, approve, reject or restore call):

```
rg -n "own: true|id: user\.id\b|seller: user|sellerId: user|seller_id: user\.id|\.\.\.seller, id" e2e
```

Hits (verbatim, the useful part): `e2e/admin-listings.spec.ts:375` (AL-12: `seed({ ...seller, id: user.id }, "active", { own: true })`, then the EDIT door), `e2e/admin-listings.spec.ts:2414` (`seed({ ...seller, id: admin.user.id }, "active", { own: true })`, the TIER door), `e2e/photo-pipeline.spec.ts:388` and `:1151` (a seeded active ad, the owner's delete and the feed), `e2e/posting-routes.spec.ts:1364` (a submitted ad, read as the owner), `e2e/post-wizard-bundle2.spec.ts:999` (a service-role status flip, not a door), `e2e/post-wizard-place.spec.ts:1252` (an active ad at nationwide reach), `e2e/viewing-place.spec.ts:66`, and user-id hits that are not ad ownership (`admin-screening.spec.ts:453, :660, :849` audit actor, `posting-routes*.spec.ts` dial rows, `auth-caller-gates.spec.ts:220`, `helpers/ui.ts:901`). I read each: none calls `admin_review_listing`, `transition_listing` as a reviewer, or `admin_move_listing` restore on an ad owned by its own staff caller. The two `own: true` rows meet `ownListing` of the edit and the tier door, which refused the same before DEC-403 (AL-12 expects `ownListing` for the edit of the staff account's own ad, `admin-listings.spec.ts:376`). So DEC-403 corrects no assertion and nothing that must stay true was found.

Other callers of the decision door and of `transition_listing`: `rg -n "admin_review_listing|\"transition_listing\"" e2e` — the owner's own paths (`my-listings-*.spec.ts`, `legal-certify.spec.ts`, `posting-routes-dials.spec.ts:126`, `admin-listings.spec.ts:611, :2373, :2384`: the seller on their own ad), service-role calls (`adminClient()`), and the screening spec's SC-4, SC-16, SC-19 (now the review door). No staff caller of `transition_listing` remains.

Sentences left in app code: `rg -n "\"listing not found\"|\"permission denied\"|illegal move|your own listing|unknown channel|a note is required|the note is too long|a removed listing takes no tier|unknown tier|unknown reason|renew days are 1 to 365" src e2e --glob '!*.test.*'` — none in either console. The hits are other families: `src/features/admin-monetisation/monetisation-service.ts:254`, `e2e/admin-monetisation.spec.ts:590,:629`, `e2e/admin-services.spec.ts:125-149`, `e2e/legal-doors.spec.ts:796,:1277`, `e2e/ad-page-doors.spec.ts:176,:728,:732,:848,:936` (table-privilege sentences PostgREST raises, not the doors').

## 5. Tests

- Unit (changed or re-pointed to codes; each reads the codes its mapper now maps, plus the generic fallback): `edit-listing.test.ts`, `move-reasons.test.ts`, `photo-remove.test.ts`, `listing-policy.test.ts`, `tier-reasons.test.ts` (it reads `supabase/migrations/20261118012500_f28efa6b-…sql` for the tier codes), `undo-edit.test.ts`, `use-photo-reviews.test.ts`, `use-photo-changes.test.ts`, `change-listing-tier.test.ts`, `listing-photos.test.tsx`, `src/features/posting/use-edit-draft.test.ts` (out of the family; a mock still threw the sentence `nothing changed`, so it throws `nothingChanged` now, §10). New ids: SF-8 (`decideListing` calls `admin_review_listing`; a refusal is thrown), SF-9 (a raised `rateLimited` is the returned reason), PCH-7 (Mark reviewed asks the second factor: a cancel says nothing and runs nothing; no factor says the hint). Test ids are unique (`scripts/test-ids.test.ts` green).
- E2E ids changed to the codes: AL-2, AL-3, AL-4, AL-7, AL-8, AL-9, AL-12, AL-16, AL-24, AL-27, ATR-2, ATR-3, ATR-7, AP-28, ML-10; SC-4 and SC-16 (now `admin_review_listing`: `permissionDenied`, and `step-up required: no verified factor`), SC-8, SC-9 (`badValue:channel`), SC-10 (`listingNotFound`), SC-17 (its scratch role also holds `listings:reveal`, in the spec), SC-19 (service role through `admin_review_listing`), SC-21 (Mark reviewed answers a step-up prompt), SC-23 (`permissionDenied`). Found red by CI's first run, not in the census's list (§10): ML-2 (`notYourListing`), AL-6 (`photoNotFound`), AL-29 (`categoryFixed`), SC-15 (its scratch role also holds `listings:reveal`). SC-12, SC-14, SC-18, SC-25 and SC-26 drive the screen and needed no edit.
- AL-8's assertion changed shape (a MAJOR in §13): both the plain and the severe restore now answer `step-up required: no verified factor` for an enforcer with no fresh factor, because the door asks the second factor before it reads the move (ruling 1 §7).
- Red-first: none (this turn fixes no defect in code; the correction's own red-first is in the correction file).
- Totals from my runs: `bunx vitest run scripts --maxWorkers=2` → 124 files, 659 passed, 1 skipped; the component suite inside `bun run checks` → 523 files, 3405 passed, 1 skipped (after fixing ERRT-6); `bun run typecheck` pass; `bun run lint` pass; touched unit files plus both console folders 23 files, 114 passed.
- `bun run checks` first whole run: `checks: 34 PASS · 1 FAIL · 26 NOT RUN · 501s` (ERRT-6: a stale allowance — see §7); after the fix, whole again, last line: `checks: 35 PASS · 0 FAIL · 26 NOT RUN · 515s`; its fast line: `checks (fast): 26 PASS · 0 FAIL · 454s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`.
- `bun scripts/brief/check-go.ts docs/governance/briefs/f1-doors-6a.md --at 143027fac` → `[check-go] no finding`.
- Browser check: NOT RUN (§12). The E2E values are set in this environment (the three names are set), but `bun scripts/e2e-migration-preflight.ts --dry` reports `1 migration(s) missing on staging` — the correction's mark `20261118110000`; the brief runs the ids only when staging holds every mark. CI's temporary backends apply every file and are the proof. J-audit: the e2e edits keep J1–J9 (no `waitForTimeout`, no `.first()`, no `.only`; scratch roles through `grantScratchRole`; SC-21 answers the factor through `stepUpIfPrompted`); no spec file ran whole.
- [ssr-error] counts: no local browser run, so none read.

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "readRefusal" src/features`, `rg -n "includes\(\"|startsWith\(\"" src/features/admin-*`, `rg -n "error.message|errorText\(" src/features/admin-listings src/features/admin-screening`.
- `src/features/admin-listings/listings-page.tsx:313` still builds the move message with a cast (`String((error as { message: unknown }).message)`), unchanged from the base and passed to `moveErrorKey` and `doorCode`; its refusal goes through the reader (K2: the cast is a local reader of an error's text, left, outside the numbered changes).
- `src/features/admin-monetisation/monetisation-service.ts:254` maps `"permission denied"` by sentence (F1-6b's family).
- `e2e/admin-monetisation.spec.ts:590,:629`, `e2e/admin-services.spec.ts:125-149`: sentence expectations of F1-6b's doors.
- `src/lib/door-codes.ts` was not grown (INC-1153): the pages read their codes with `doorCode(...).code` against codes already in `DOOR_CODES`.

## 7. Allowlists and guards

Counts, `origin/dev` → this branch (non-comment lines): `scripts/conformance/forms-allowlist.txt` 29 → 21 (eight CF-FORM-3 lines leave); `scripts/conformance/perm-vocabulary-allowlist.txt` 0 → 0 (the dated `action:reveal` allowance came and left inside the lane); `scripts/doors/check-doors-allowlist.txt` 3 → 3 (the dated `grant-without-caller admin_review_listing` allowance came with the migration and left with STEP 3; stop 1's `opt-out-over-step-up admin_reveal_listing_contact` came and left earlier); `scripts/acceptance-doors-allowlist.txt` 119 → 120 (the new door's line, ruling 2 decision 10, `DEC-402` and `DEC-403` in its reason; the reveal's reason says `listings:reveal`); `scripts/public-surface-allowlist.txt` 231 → 232 (the new door's grant line; :22 and :52 reasons corrected, ruling 2 decision 11); `scripts/conformance/error-text-allowlist.txt` 9 → 8 (the `photo-changes.tsx :76` line left: it no longer reads a refusal's message — ERRT-6 said so, the gate's first run); `scripts/conformance/non-null-allowlist.txt` 142 → 142 (`photo-changes.test.tsx` stays at 10: my `!` became `clickFirstReview()`). `scripts/route-budgets.mjs`: ENTRY_CLOSURE (§10). New lines with an expiry: none. Guard self-tests: the laws ran whole (`scripts` 124 files) and the check-doors static (`bun scripts/doors/check-doors.ts`, in the correction file: static OK, 260 lines).

## 8. Strings

One new key, EN and AM in the same change (`src/i18n/locales/en-admin.ts:194`, `am-admin.ts:190`): `admin.roles.perm.action.reveal` — EN "Reveal"; AM copied by script from `/Users/tesfayemackbookpro/Downloads/f1-doors-6a-am.txt` ("ማሳየት"; I wrote no Amharic). No other key is new or changed: every code maps to a key that already existed. `bun run i18n:usage` regenerated both maps (`docs/generated/i18n-usage.json`, `public/i18n-usage.json`; 51 lines leave each: edit-listing no longer rides the admin listings and screening pages); `checks` i18n-usage-map is green.

## 9. Migrations

None written in this chat; the ten files are the first chat's, all on the branch (`git diff --name-only 143027fac -- supabase`), sha256 from `sha256sum` here:

| # | file | sha256 | mark | pairing line |
|---|---|---|---|---|
| 1 | `20261118012100_bc29ea76-91c8-4bef-b10a-43631dce3928.sql` | `7bc9c6c9331c30ff4098a02d00f9dc276f6b7763284552cd618655dac52a32b9` | 20261118070000 | `apply bc29ea76 → expect mark 20261118070000` |
| 2 | `20261118012200_8af8d6de-451a-42f7-9f4a-6d34dcd7cdc5.sql` | `4450cc7881e976498fdf757ec6cbc3b5def55f3d84fc7d2b6b247f91a5fb996b` | 20261118070100 | `apply 8af8d6de → expect mark 20261118070100` |
| 3 | `20261118012300_6aaba954-b8be-45af-9441-2568fa79849b.sql` | `63837e3664f4bf3ab885060c6f9f7cbc5880d0798de369108ef23da615c4e7c6` | 20261118070200 | `apply 6aaba954 → expect mark 20261118070200` |
| 4 | `20261118012400_64aca671-da4e-4957-9b60-d2507bbdec58.sql` | `7aa826b317bc95803185dd31afbf9ad203d7bce7224055ee9cb81a33297caa95` | 20261118070300 | `apply 64aca671 → expect mark 20261118070300` |
| 5 | `20261118012500_f28efa6b-af25-4885-a95e-c9651318213a.sql` | `b9b3555996e93315399659b6804f4defa5c46ee35a0f3887d3119cc9b158ee0d` | 20261118070400 | `apply f28efa6b → expect mark 20261118070400` |
| 6 | `20261118012600_f4b5a77e-d92d-434c-b464-faed97296c53.sql` | `ec20310dffec9538a49c29b9082bcd12171f8027c56f209443ab19c525e5c2fc` | 20261118070500 | `apply f4b5a77e → expect mark 20261118070500` |
| 7 | `20261118012700_dcd3867e-e839-4780-8308-6bb9a66bf0b8.sql` | `989ebb6e2082c3424389da4aa5f1d0b4404aed35f18dcddb4803940a451f9988` | 20261118070600 | `apply dcd3867e → expect mark 20261118070600` |
| 8 | `20261118012800_2fd5e6a5-1831-4de4-abee-3ae5c55be1ea.sql` | `e2bed4b9badbd57619f7d06c65da0df36107d0289eed4b2799ca8884d3c29a2d` | 20261118070700 | `apply 2fd5e6a5 → expect mark 20261118070700` |
| 9 | `20261118012900_14117b17-8154-4c64-8cb3-0c1750236627.sql` | `68a228720bcece2a8de3102bf7dece36d3ccd803ce48d27b1e1193598f65b430` | 20261118070800 | `apply 14117b17 → expect mark 20261118070800` |
| 10 | `20261118013000_3d2071ff-9fcb-4ad9-bf37-b366172e9c69.sql` | `deb7b3870aebec45fa672fcccb76e2061d556bba954d32d8078c651103ce2d52` | 20261118110000 | `apply 3d2071ff → expect mark 20261118110000` |

Files 1–9 are on ethio-staging (the preflight's list ends at 20261118070800); file 10 is not (`1 migration(s) missing on staging`). The same ten pairing lines are the ones for ethio-prod, in this order, after the merge. The migration files are unchanged since `4b46e4705` (`git diff --stat 4b46e4705 HEAD -- supabase` is empty). `bun run db:proof --fresh` from the final tree, last line: `db:proof PASS — applied 515/515, CLI 2.120.0, cold, 54 s`.

## 10. Departures

- ENTRY_CLOSURE (`scripts/route-budgets.mjs`, commit `d6ead2e6c`): the budget step failed on this tree before any size was read (`the first-paint closure of index-BB7MHk-F.js no longer matches ENTRY_CLOSURE`). Cause, by bisecting a clean copy of `origin/dev` with this tree's files laid over it: the three files `photo-remove.ts`, `tier-reasons.ts` and `undo-edit.ts` together reproduce it (each alone does not; the locales, the types and the other six files do not). Two of the three stopped importing `./edit-listing` (their mappers moved onto the shared words in `listing-refusals.ts`); my reading, not proved to the module, is that the chunk graph then no longer keeps those vendor chunks apart from the entry, and the bundler folds them in. The entry went 128.4 → 141.7 KiB gzipped, the eight chunks and the Radix primitive chunk (about 16 KiB) left the closure, and the closure's modules went 227 → 266. I removed the nine names/reasons that left (`chevron-right`, `createServerFn`, `ellipsis`, `lazyRouteComponent`, `qss`, `useNavigate`, `useRouterState`, `useSearch`, and the first of `dist`'s three reasons) and set `index`'s count to 266. No ceiling moves, because every page is smaller: first-download table (gzipped KiB, my own lock-exact local builds: base = `origin/dev` 1221ff615 built under `/tmp/ethio-scratch/f1-doors-6a/base/`, mine = HEAD; local builds read about 0.1 KiB under CI):

```
/                                    base  225.0 mine  221.7 ceiling 227  delta -3.3
/$name                               base  223.0 mine  219.7 ceiling 225  delta -3.3
/account                             base  265.9 mine  262.9 ceiling 268  delta -3.0
/account_/legal                      base  206.3 mine  203.4 ceiling 208  delta -2.9
/account_/legal_/$versionId          base  206.9 mine  204.1 ceiling 209  delta -2.8
/account_/saved                      base  223.6 mine  220.3 ceiling 225  delta -3.3
/admin                               base  208.1 mine  205.2 ceiling 210  delta -2.9
/admin/                              base  208.9 mine  206.0 ceiling 211  delta -2.9
/admin/ai                            base  301.8 mine  298.8 ceiling 303  delta -3.0
/admin/attributes                    base  316.5 mine  313.4 ceiling 318  delta -3.1
/admin/audit                         base  293.7 mine  290.6 ceiling 295  delta -3.1
/admin/categories                    base  347.1 mine  344.0 ceiling 348  delta -3.1
/admin/countries                     base  305.7 mine  302.7 ceiling 309  delta -3.0
/admin/images                        base  208.7 mine  205.8 ceiling 210  delta -2.9
/admin/impersonation_/$sessionId     base  291.4 mine  288.5 ceiling 293  delta -2.9
/admin/legal                         base  284.2 mine  281.1 ceiling 285  delta -3.1
/admin/legal_/$versionId             base  280.8 mine  277.8 ceiling 282  delta -3.0
/admin/legal_/edit                   base  282.9 mine  279.8 ceiling 284  delta -3.1
/admin/listings                      base  328.1 mine  324.4 ceiling 329  delta -3.7
/admin/listings_/$listingId          base  329.1 mine  325.0 ceiling 330  delta -4.1
/admin/listings_/$listingId_/edit    base  411.1 mine  406.1 ceiling 412  delta -5.0
/admin/locations                     base  269.3 mine  266.4 ceiling 271  delta -2.9
/admin/monetisation                  base  312.3 mine  309.0 ceiling 313  delta -3.3
/admin/places                        base  306.2 mine  303.1 ceiling 310  delta -3.1
/admin/roles                         base  294.4 mine  291.3 ceiling 295  delta -3.1
/admin/roles_/$roleId                base  274.6 mine  271.5 ceiling 275  delta -3.1
/admin/screening                     base  345.1 mine  341.0 ceiling 348  delta -4.1
/admin/translations                  base  305.7 mine  302.6 ceiling 307  delta -3.1
/admin/translations_/$lang           base  308.4 mine  305.3 ceiling 309  delta -3.1
/admin/users                         base  291.6 mine  288.7 ceiling 293  delta -2.9
/admin/users_/$userId                base  291.7 mine  288.7 ceiling 293  delta -3.0
/auth                                base  219.8 mine  216.6 ceiling 223  delta -3.2
/auth_/callback                      base  207.2 mine  204.3 ceiling 209  delta -2.9
/auth_/reset                         base  209.2 mine  206.3 ceiling 211  delta -2.9
/c/$slug                             base  225.0 mine  221.7 ceiling 227  delta -3.3
/dev/primitives                      base  227.3 mine  224.4 ceiling 228  delta -2.9
/dev/style                           base  247.4 mine  244.2 ceiling 248  delta -3.2
/dev/tall                            base  204.0 mine  201.1 ceiling 206  delta -2.9
/l/$slug                             base  256.2 mine  252.6 ceiling 257  delta -3.6
/legal/$kind                         base  208.4 mine  205.5 ceiling 210  delta -2.9
/legal/accept                        base  214.8 mine  211.8 ceiling 217  delta -3.0
/legal/publishing                    base  209.2 mine  206.3 ceiling 211  delta -2.9
/my-listings                         base  311.0 mine  307.6 ceiling 315  delta -3.4
/my-listings_/$listingId             base  321.7 mine  317.7 ceiling 323  delta -4.0
/my-listings_/$listingId_/edit       base  403.3 mine  398.3 ceiling 404  delta -5.0
/post                                base  403.2 mine  398.3 ceiling 404  delta -4.9
/post_/$listingId                    base  403.2 mine  398.3 ceiling 404  delta -4.9
/privacy                             base  208.4 mine  205.5 ceiling 210  delta -2.9
/settings                            base  274.3 mine  271.3 ceiling 277  delta -3.0
/terms                               base  208.4 mine  205.5 ceiling 210  delta -2.9
```
  Entry closure total 226.4 → 223.5 KiB. The scratch trees `/tmp/ethio-scratch/f1-doors-6a/{base,head,bis}` are the operator's to remove (my tool refuses `rm`). The ceilings now sit 1.4–5 KiB above the pages; lowering them is the supervisor's call (finding in §13).
- CI's first run (commit `0d7cd54c7`) was red on four e2e tests the census's `tests` item did not list, each expecting a sentence or a role this turn's server changes: ML-2 (`e2e/my-listings-doors.spec.ts:353`: a seller holding `listings:view` and `listings:review` reopening another seller's closed ad now meets `notYourListing`, because `transition_listing` is the owner's door alone (DEC-402; the migration proof of file 6 says the same), not the old reviewer branch's `ownerOnly:closed-active`; the test's claim — nobody else moves a seller's ad and nothing is written — holds and its service-role line is unchanged); AL-6 (`e2e/admin-listings.spec.ts:547`, `photo not found on this listing` → `photoNotFound`); AL-29 (`:1981`, `the category of a posted listing is not changed` → `categoryFixed`); SC-15 (`e2e/admin-screening.spec.ts:708`, the reviewer's scratch role gains `listings:reveal`, as SC-17's). The further code commit `7f5a2cf34` carries these and the CodeQL fix below; no assertion was loosened.
- `scripts/doors/step-ups.ts:35` (Part A's census, written by the first chat): CodeQL `js/redos` (high) on the `PAIRS` pattern, whose loop `((?:\s*\(…\)\s*,?)+)` could split white space two ways. Now each pair eats the white space after it and one optional comma with its own; `bunx vitest run scripts/doors` (11 passed) and `bun scripts/doors/check-doors.ts` (static OK, 260 lines; self-test OK) hold. Outside the brief's list, inside `scripts/doors/` which SCOPE names.
- `src/features/posting/use-edit-draft.test.ts` (outside the family, a unit test that mocks `useEditListing`'s door): changed `nothing changed` to `nothingChanged`, because `editErrorKey` now reads a code. Same for `listing-photos.test.tsx` (`photoNotFound`) and `change-listing-tier.test.ts` (`listingRemoved`).
- STOPs and rulings of the turn: stop 1 (two step-up cells), ruling 1, stop 2 (the migration stop), ruling 2 with the correction; this chat met no STOP.

## 11. CI

Base: dev `1221ff615bc9d5f01850b8656a1e7ea2ae9d64fd`, `ci-status.md` first lines: Conclusion SUCCESS, completed 2026-11-18T11:12:56Z, run 44291354731 (lanes skipped: the code tree was proven by run 44285456312 on the picomatch pull request).

The pull request's checks (`gh pr checks 64`) on my last code commit `7f5a2cf34`, run 44304415841: 42 pass · 1 fail · 1 skipping (Promote, which runs only on dev). Two-step SHA check: `origin/ci-evidence:docs/tracking/branches/cursor/f1-doors-6a/ci-status.md` reports commit `7f5a2cf34dc31642218c516040107cae2f375132`, Conclusion FAILURE, completed 2026-11-18T12:59:59Z, "Lanes: ran — no proven code tree"; every job in its table is `success` except `E2E preflight (migration parity, staging)`. The lane's `e2e-last-failure.md` reads "last E2E run 44304415841 passed" (it prints the run's merge commit `cac3d214…`, the run id is the same). Repeat lane: 29 of 97 tests repeated, all green. The 16 numbered lanes, smoke, e-mail, webkit, repeat, bundle budget, component tests, semgrep and the dependency audit are green.

- The one red, `E2E preflight (migration parity, staging)`: class (a) of rule 40, expected after a migration turn: `STAGING BEHIND: apply 20261118013000_3d2071ff-9fcb-4ad9-bf37-b366172e9c69.sql to ethio-staging before E2E can pass` (the preflight waited 22 of 28 attempts). Not a code finding; it clears when the supervisor applies that file (`apply 3d2071ff → expect mark 20261118110000`) and the job is re-run. Because of it the pull request is NOT yet "every check green"; I do not claim it.
- Reds of this pull request's earlier run, on `0d7cd54c7` (run 44300180305; class (e), mine): four tests (ML-2, AL-6, AL-29, SC-15; 12 failures counting both projects and the repeat lane) and the CodeQL alert 465 (`js/redos`, `scripts/doors/step-ups.ts:35`) — causes and the one further code commit `7f5a2cf34` in §10. The same run's preflight red was the same class (a). The E2E "Playwright, ethio-staging" verdict job was red only because its lanes were. No re-run was used (rule 40 allows (b) and (d) only).
- Reds of an earlier turn fixed here: the dependency audit's picomatch red that stop 2 recorded was fixed on dev by the picomatch turn and the operator's merge; it is green on this pull request.

## 12. Limits

- The browser tests by `--grep` were NOT run: the E2E values are set, but ethio-staging lacks the correction's mark `20261118110000` (preflight `--dry`: `1 migration(s) missing on staging`), and the brief requires every mark. Changed specs are proved by CI's temporary backends only; the specs most exposed to the correction are AL-8, SC-4, SC-16 and SC-19.
- `bun run checks` NOT RUN lines (from the last run): scope's three Actions-API steps; `actionlint` and `gitleaks` (pinned linux/x64 binaries on a darwin/arm64 machine; CI's gitleaks job judges the diff); dependency-audit (the advisory service is not reachable from the sandbox); e2e-preflight (staging credentials); the e2e artifact and promote steps; the semgrep SARIF upload; the "Install dependencies" steps.
- CI logs read: the two lanes' `ci-status.md`, `e2e-last-failure.md` (failure bodies of the first run), `guards-last-failure.md` (the preflight tail), and CodeQL's alert 465 through the code-scanning API. Not read: the run logs themselves.
- Production apply and Publish go together (brief TOLERANCES): between them the published consoles draw the generic line for a refusal of this family and the published screening still calls `transition_listing` (refused `notYourListing`). Expected.
- `readRefusal` words a code by table; a new door code no table lists reads as the generic line. Intended, as the brief says.

## 13. Findings

- MAJOR (coverage gap, `e2e/admin-listings.spec.ts:630-631`, AL-8): the severe-restore refusal (`severeRestore`) is no longer reached by any e2e assertion: the door asks the second factor first, an enforcer with a scratch role has none, and only the job's super admin has one (who may restore). Before this turn AL-8 reached it with the sentence. I did not check whether the migration proofs of file 1 cover it. A non-super enforcer holding a fresh factor needs a scratch account with a verified factor, a helper that does not exist; raised, not built (a helper is a new mechanism).
- MINOR: `scripts/route-budgets.mjs` ceilings are now 1.4–5 KiB loose on every page (§10); DEC-296 has no lowering form I could cite. Supervisor to rule.
- Class note for the supervisor: the census's `tests` list missed three sentence expectations (AL-6, AL-29 and ML-2's reviewer line) and one role that needs `listings:reveal` (SC-15); a census of `e2e` by the sentences each migration replaced (not by the door's name) would have found them.
- MINOR: `reveal` is granted by the migration only to roles holding `listings:review` at the apply time (DEC-400); a review role created later gets no reveal until an admin grants it. The role editor shows the new key (`admin.roles.perm.action.reveal`).
- MINOR (K2, outside scope): F1-6b's family (`admin-monetisation`, `admin-services`) still words and tests by sentence (§6).
- INC-1196 (the shell re-counts a `rateLimited` refusal) shows here only as the reveal's `rateLimited` line (use-screening.ts `revealContact`); owner F1-7.

## 14. Records

DEC-333 — status line: turn F1-6a BUILT — the staff's listing and screening doors and readers on `door_context` and the shell: `admin_allow_listing_photo`, `admin_review_photo_change`, `admin_move_listing`, `admin_edit_listing`, `admin_undo_listing_edit`, `admin_set_listing_tier`, `admin_set_listing_policy`, `admin_reveal_listing_contact`, `admin_name_check_clear`, the new `admin_review_listing`, the two filtered readers `admin_list_listings`, `admin_screening_facts`, the six global readers `admin_listing_certifications`, `admin_listing_detail`, `admin_listing_reports`, `admin_name_check_list`, `admin_name_check_summary`, `admin_open_report_counts`, and `transition_listing` (the owner's and the service role's alone); their refusals as codes (the doors raise `permissionDenied`, `badValue`, `listingNotFound`, `ownListing`, `rateLimited`, `illegalTransition`, `severeRestore`, `listingRemoved`, `nothingChanged`, `badDays`, `noteRequired`, `noteTooLong`, `nothingToUndo`, `listingChanged`, `photoRemovalFinal`, `reviewGone`, `changeGone`, `badSize`, `notYourListing`, and the step-up answer; `src/lib/door-codes.ts` is unchanged by this turn); no return type changed; the migration files `20261118012100`…`20261118013000` (ten) with the marks 20261118070000 to 20261118070800 and 20261118110000.
INC-1038 — status line: the doors of this family that gained their dial: the undo and the name-check clear spend `staff_moderation`; the move spends it once (its core's `revise` gone); the review door (new) spends it; the reveal spends `review_reveal` inside the gate; what is left for F1-6b: the monetisation and services doors.
INC-1158 — status line: the same class in this family — corrected: `admin_review_photo_change` asks the row step-up its line promised (INC-1195, DEC-401); `admin_reveal_listing_contact` moves from `listings:review` to `listings:reveal`, step-up still `none:D129` (DEC-400): it shows one seller's number to a reviewer who calls about an ad, a few times an hour, and asks no second factor; the staff move and the reviewer's decision on `staff_moderation` (not the seller's `revise`).
DEC — DEC-400: the reveal of a seller's contact during review is its own permission, `listings:reveal` (`requires_step_up = false`, assignable), granted by set at the apply to every role holding `listings:review`; `admin_reveal_listing_contact`'s line names it and keeps `none:D129`.
DEC — DEC-401: `admin_review_photo_change` asks `listings:review`'s second factor (`row`), through door_context on the shell.
DEC — DEC-402: the reviewer's screening decisions go through the staff door `admin_review_listing` (`listings:review`, `row`, `staff_moderation`), which calls `transition_listing_core` with the review transitions only; `transition_listing` is the owner's and the service role's alone.
DEC — DEC-403: a reviewer or enforcer never decides their own ad: `transition_listing_core` refuses `ownListing` in its reviewer branch and its enforcer restore branch when the caller owns the ad and is not the service role, after the branch's own staff refusal.
DEC — DEC-404: `admin_review_listing` is scoped `match` on `listings.home_country_code`, as the edit is.
INC — INC-1195: the defect is that `admin_review_photo_change`'s manifest line promised row step-up and neither the door nor its core checked it; its class is INC-1158's (a manifest cell true by its shape and not by its body); the mechanism is door_context on the shell, which keeps every staff `row` cell by construction once the family has moved, plus Part A's check for the `none:` side.
INC — INC-1196: the shell's `door_refused` re-counts a `rateLimited` refusal, so a rate-limited call spends one more unit of a spent dial; class: the shell's refusal accounting (mechanism `door_refused`, F1-1); owner: F1-7, with INC-1170.
register row — the doors' row gains "the staff's listing and screening doors on the shell (F1-6a)"; the forms row's refusal-reader law keeps no allowlist line for the listings and screening consoles.
changelog — 2026-11-1x turn F1-6a (Opus 5.5 and Sonnet 5.5): the staff's listing and screening doors on the door mechanism — one gate in one order with the staff permission, step-up and the staff's dial inside it, refusals as codes read by the one reader; a staff move and a reviewer's decision no longer spend the seller's dial.
roadmap — the Foundations 1 line gains "F1-6a DONE (pull request #64, marks 20261118070000 to 20261118070800 and 20261118110000)"; LEFT: F1-6b (monetisation and services), F1-7.
slip — the entry's closure list (`scripts/route-budgets.mjs` ENTRY_CLOSURE) moves by a build's own result when a refactor removes the one import that kept vendor chunks apart; the turn's first red came from a closure change, not a size.
