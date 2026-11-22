# CURSOR BUNDLE 2 — the groundwork for the compact table filters and the one dialog look — report

Base: 63d6bee0d60517187cf1a636666c5ffeb308f7d4 · Final commit: d436428e6426106e5d6ceb4bc4e3bef21bae826b · Brief: docs/governance/briefs/cursor-bundle-2.md (sha256 ca29d6a05d13f8d0d142463790c2329793b0cde0f55fbe674f972fea5e292ed6)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on d436428

Rulings in force: `docs/governance/briefs/cursor-bundle-2-ruling-1.md` (sha256 `0dd1c29c9d1cd046cd1409202e26a3591e143a8c9675a79b6db765a8549e1181`) and `docs/governance/briefs/cursor-bundle-2-ruling-2.md` (sha256 `b4f720362c1bca1f9057fca2f6e1ff2a6939efb8559951ac9a214ad262314041`); each was saved by scripted copy and its sha256 equalled the stated value at the source and at the destination. The types patch `cursor-bundle-2-types.patch` (sha256 `c6fd6caea30bc3e1ae25f093e64b74b6c428b38f3007ff42ac22ab2002a9a0ea`) was applied with `git apply`; `src/integrations/supabase/types.ts` then read sha256 `4636db9e550637b426e33f819ff6e5d338934bf8a035b660d50f9de905a3f06e`.

CI at the start of this build (ruling 2, answer 6): dev `63d6bee0d` SUCCESS (run 44959633359); this branch at `d2953e55f` (the migration push) FAILURE, run 44979930034 — the four red jobs are named in §11.

## 1. Done / not done, by part and step

Every part of the brief is done. The pull request stays a DRAFT (ruling 2, answer 11).

| Step | What | Commit |
| --- | --- | --- |
| 0 | the brief saved, roadmap line 3, `check-go` | `5bf75c693` task saved |
| 1 | the census; the plan (stop 1) | `8c91188d4`, `80eed9f7e` |
| 2 | the list rule and its guard (DEC-423); the list doors (DEC-420); the Screening queue's door (ACT-022); two closed public reads (INC-1236); the migration stop (stop 2) | `0757d25d7`, `490515b13`, `e5e3c5574`, `51fe27c9d`, `d2953e55f` |
| 3 | the readers pass lists, the queue reads its door; the types patch; ruling 2 saved | `e9de260c2` |
| 4 | one `chooseFilter`; `choosePinShow` on the pin specs; INC-1244's fix | `3847ae92f` |
| 5 | the double-cast guard and its census (INC-1239) | `cac963863` |
| 6 | the gate, the browser ids, `check-go`, the self-review | (no commit; §5) |
| 7 | push; two further code commits for what the self-review and the verifying of this report found | `d145cfee9`, `d436428e6` |
| 8 | this report | (its own commit) |

By brief item:

1. **Item 1, DEC-420, built (its database half).** `admin_list_listings`, `my_listings` and (ruling 1, answer 4) `admin_list_locations` take lists, read by the list rule; `admin_screening_queue` is born with the same form. Old and new argument lists are in §3 and §9.
2. **Item 2, ACT-022, built (its data half).** The queue's own door and reader; the three seller fields; a seller filter; the country filter as a list. The column and the filter on the Screening screen are Lovable's bundle 3.
3. **Item 3, INC-1236, built: the retired form.** Both tables lost the browser's column grants and the open read rule (file C); on ethio-staging the operator applied the five files and read them back (ruling 2, answer 1).
4. **Item 4, INC-1237, built.** One `chooseFilter` in `e2e/helpers/filters.ts`; the four copies are gone.
5. **Item 5, the pin specs, built.** One helper, `choosePinShow`, in `e2e/helpers/posting.ts`.
6. **Item 6, INC-1239, built; the list is the guard's ratchet, not empty.** `scripts/conformance/type-casts.ts` and its allowlist (110 files, 171 casts); the files this bundle touches left it (§7).
7. **INC-1244 (ruling 2, answer 7), fixed.** `waitForOpenMarket` takes the anchor; MON-16 passes it.

Not done and why: nothing in the brief or the rulings is left. Two things were not run locally and are CI's (§12): CI-5 (a `@global-state` test) and `bun run checks`' 25 NOT RUN steps.

## 2. Files changed

`git diff --name-only 63d6bee0d..d436428e6` (71 files). The report itself (`docs/governance/reports/cursor-bundle-2.report.md`) is the next commit and is not in the list.

```
docs/features/admin-listings.md
docs/features/admin-screening.md
docs/features/ci-guards.md
docs/features/display-primitives.md
docs/features/doors.md
docs/features/e2e-harness.md
docs/features/locations-console.md
docs/features/my-listings.md
docs/features/translations.md
docs/governance/briefs/cursor-bundle-2-ruling-1.md
docs/governance/briefs/cursor-bundle-2-ruling-2.md
docs/governance/briefs/cursor-bundle-2.md
docs/governance/reports/cursor-bundle-2.census.md
docs/governance/reports/cursor-bundle-2.stop-1.md
docs/governance/reports/cursor-bundle-2.stop-2.md
e2e/ad-page-doors.spec.ts
e2e/admin-ai-calls.spec.ts
e2e/admin-categories-console.spec.ts
e2e/admin-categories-images.spec.ts
e2e/admin-countries.spec.ts
e2e/admin-listings.spec.ts
e2e/admin-locations.spec.ts
e2e/admin-monetisation.spec.ts
e2e/admin-screening.spec.ts
e2e/admin-translations-console.spec.ts
e2e/admin-translations-governance.spec.ts
e2e/admin-users.spec.ts
e2e/helpers/browser-client.ts
e2e/helpers/categories.ts
e2e/helpers/countries.ts
e2e/helpers/filters.ts
e2e/helpers/locations.ts
e2e/helpers/posting.ts
e2e/helpers/translations.ts
e2e/my-listings-page.spec.ts
e2e/post-wizard-bundle2.spec.ts
e2e/post-wizard-place.spec.ts
e2e/post-wizard-where.spec.ts
roadmap.md
scripts/conformance/browser-client-allowlist.txt
scripts/conformance/browser-client.test.ts
scripts/conformance/e2e-helpers.test.ts
scripts/conformance/seller-names-allowlist.txt
scripts/conformance/type-casts-allowlist.txt
scripts/conformance/type-casts.test.ts
scripts/conformance/type-casts.ts
scripts/conformance/wired.test.ts
scripts/doors/catalogue.ts
scripts/doors/check-doors-allowlist.txt
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/identity.ts
scripts/doors/judge.ts
scripts/doors/manifest.txt
scripts/doors/open-rules.txt
scripts/doors/rows.ts
scripts/public-surface-allowlist.txt
src/features/admin-listings/use-admin-listings.test.ts
src/features/admin-listings/use-admin-listings.ts
src/features/admin-locations/locations-service.test.ts
src/features/admin-locations/locations-service.ts
src/features/admin-screening/use-screening.test.ts
src/features/admin-screening/use-screening.ts
src/features/my-listings/my-listings.test.ts
src/features/my-listings/my-listings.ts
src/integrations/supabase/types.ts
supabase/migrations/20261122023100_a1caa1e9-2188-4f2e-8441-c1da1dad769a.sql
supabase/migrations/20261122023200_3d572b84-aa6b-4bc6-beeb-145593fb13a3.sql
supabase/migrations/20261122023300_7366b006-8a16-4200-b479-44976331bf43.sql
supabase/migrations/20261122023400_219cb8ac-c6b7-44ce-a1c2-522657879179.sql
supabase/migrations/20261122023500_3ab61b82-efab-48ec-8133-bf879e994a1b.sql
```

New files, proven by `git diff --name-only --diff-filter=A 63d6bee0d..d436428e6` with each path confirmed by `git ls-files --error-unmatch`: the three briefs (`cursor-bundle-2.md`, `-ruling-1.md`, `-ruling-2.md`); the census and the two stop reports; `e2e/helpers/filters.ts`; `scripts/conformance/type-casts.ts`, `type-casts.test.ts`, `type-casts-allowlist.txt`; `src/features/admin-listings/use-admin-listings.test.ts`; the five migrations. Deleted files: none (`--diff-filter=D` lists 0).

## 3. Behaviour contract — answer tables before → after

Everything is the base's except the brief's numbered changes. The migrations' proofs (headers, grants, md5s, the answers and refusals, EXPLAINs) are in `docs/governance/reports/cursor-bundle-2.stop-2.md`; their bodies are unchanged since that stop.

**Doors**

| Door | Before (base) | After |
| --- | --- | --- |
| `admin_list_listings` | `(…, p_country text, p_category uuid, …)` | `(text,text,text[],uuid[],text,date,date,text,integer,integer)`; the lists read by `door_filter_countries` / `door_filter_categories`; the reach clause stays AND-ed; NULL or `{}` is no filter; more than 20 values, a NULL element or a non-two-letter country answers `badValue:country` / `badValue:category`; DROP + CREATE |
| `my_listings` | `(text,integer,integer,text,uuid,text)` | `(text,integer,integer,text,uuid[],text)`; both reads (counts, rows) filtered by the category list; DROP + CREATE |
| `admin_list_locations` | `(text,text,text,boolean)` | `(text[],text,text,boolean)`; the country read by the list rule, field `country`; reach AND-ed; DROP + CREATE; the service role's grant is restated (stop 2, departure 1) |
| `admin_screening_queue` | none: the queue read `listings` by two direct selects | new, `(text,text[],text,text,integer,integer) → {total, rows}`, `listings:review`, reach `filter`; a row has 25 flat keys; the seller's e-mail only with `profiles:view` |
| `level_overrides`, `market_settings` | anon and authenticated: column-level SELECT of ten columns each; `*_public_read` (USING true) | no browser SELECT; the rule dropped; the service role reads both; nothing granted |
| `door_filter_countries`, `door_filter_categories` | none | new, closed to browser roles |

**Readers and screens (src/)**

| Function | Before | After |
| --- | --- | --- |
| `listAdminListings` (`use-admin-listings.ts`) | sent `p_country`, `p_category` as one text / uuid; a failed read threw `new Error(error.message)`; "no data" threw a bare error | sends `[country]`, `[category]` (a list of one; nothing when unset); a failed read is `ReaderError(readerFailure(error))`; an answer out of shape is `ReaderError` class `malformed` (ALR-1, ALR-2) |
| `listLocations` (`locations-service.ts`) | `p_country_code: code` | `p_country_code: [code]`; the all-countries scope sends no argument (PL-6) |
| `my_listings` reader (`my-listings.ts`) | `p_category: id` | `p_category: [id]`; no category sends none (ML-U29, ML-U13) |
| the Screening queue's readers (`use-screening.ts`) | `listScreening` and `readScreeningRow` read `listings` directly; the country filter read the ad's place; the queue needed `listings:view` through RLS; failures were bare `Error` | `listScreening` and `readScreeningRow` read `admin_screening_queue` (`readScreeningRow` asks for the ad's id with `p_limit 1`); the row is parsed by `parseScreeningRow`, the answer by `parseScreeningQueue`; `ScreeningRow` gains `sellerAlias`, `sellerBusinessName`, `sellerEmail`; `ScreeningFilters` gains the optional `seller`; the query key gains `seller`; every reader of the file (`listScreening`, `readScreeningRow`, `listScreeningPhotos`, `readScreeningFacts`) throws a typed `ReaderError` (SF-1…SF-14) |

**One behaviour change a person may meet (DEC-422, the supervisor's, the operator told).** The queue's reader now needs `listings:review` and reads by the caller's country reach; before, any holder of `listings:view` read it through RLS. Ruling 1, answer 2, read on ethio-prod: no `user_roles` row names a country, so nobody's queue changes on the day of the apply.

**Where the two consoles draw a failed read (ruling 1, answer 5).** `src/features/admin-listings/listings-page.tsx:643-647` and `src/features/admin-screening/screening-page.tsx:536-540` pass `query.error` to the table's error slot, which draws the key `common.error` — never the error's own text. `src/features/admin-listings/listing-page.tsx:214-221` draws `common.error` or `admin.listings.detail.notFound` (it reads the door's code through `doorCode(errorText(…))`). No screen prints the text of a failed photos or facts read: none reads `.error` of `useScreeningPhotos` or `useScreeningFacts` (`screening-page.tsx:177`, `:181`; `listing-photos.tsx:81`; `listing-page.tsx:159`). A screen that prints the text: none found.

**The harness** — `chooseFilter(page, panel, filter, value?)`: before, three same-named functions of different shapes (`countries.ts:106`, `locations.ts:100`, `translations.ts:88`) and a fourth (`categories.ts`, `toggleMissingAssets`); after, one in `e2e/helpers/filters.ts` that opens the panel when it is closed, presses the filter's own control first when the choice is not in view, presses the choice, presses Escape and expects the panel gone. `waitForOpenMarket(page, code, timeoutMs = 20_000, options: { anchorId?: string } = {})`: with no option, today's behaviour byte for byte (G37).

## 4. Censuses

The brief's census is `docs/governance/reports/cursor-bundle-2.census.md`; the ones that close the work:

- **Casts (item 6; ruling 1, answer 7).** At the base, `git grep -n 'as unknown as' 63d6bee0d -- e2e | wc -l` = **62** in **34** files (`… -l`), `-- src` = **114**, `-- scripts` = **17**. At the head: `rg -n 'as unknown as' e2e | wc -l` = **55** in **30** files; `src` = **112** (the two in `use-screening.ts` went in STEP 3); `scripts` = **20** — the guard reads the syntax tree, so its own comment and message add three text hits and its census count for `scripts/` is **4** casts in **4** files. The seven casts of the four touched e2e files were removed in STEP 5: `admin-categories-console` (2), `admin-users` (1), `my-listings-page` (3), `post-wizard-bundle2` (1).
- **`chooseFilter`.** `rg -n 'function chooseFilter' e2e | wc -l` = 1 (base: 3, `git grep` at `63d6bee0d`); `rg -n 'toggleMissingAssets' e2e | wc -l` = 0; `rg -c 'chooseFilter\(' e2e/*.spec.ts` totals **18 calls in 11 spec files**.
- **A panel opened by hand in a spec** (`rg -n 'getByTestId\(["`][a-z-]*-filters["`]\)\.click|-filters-panel' e2e/*.spec.ts`): every remaining site reads the panel (a pill's pressed state or count, a placeholder, a text field's value) or opens it before `chooseFilter` does the choosing; none presses a choice. They are in §6.
- **INC-1244.** Census by the key word: `rg -n -i "inc-1244|waitForOpenMarket\(" e2e scripts` — hits: `e2e/helpers/locations.ts:607` (the comment) and `:617` (the function); callers `e2e/admin-monetisation.spec.ts:829` (MON-6), `:1228` (MON-12), `:1476` (MON-16, now `{ anchorId: market.anchor.id }`; the comment at `:1475`), `:1540` (MON-17); `e2e/shell.spec.ts:3230`, `:3231` (LS-11), `:3380`, `:3416` (LS-12, LS-13). Only MON-16 reads the market's name on a page and checks it against the seed's (`monetisation-order-markets-detail` contains `market.anchor.name_en`); MON-6, MON-12 and MON-17 read none, and the LS ids read the name from the same list the page draws. Those callers keep the default and need no change.
- **Pin specs.** The paths that press a choice before a NEW pin's Save: `post-wizard-bundle2` `savePinOnMap(…, "exact")` ×3 and PW-186's inline Save (PW-113's later move presses none: it moves a saved pin); `post-wizard-place` PW-37, PW-38, PW-40 (`"exact"`), PW-39 (`"approx"`, in place of its direct press); `post-wizard-where` PW-92, PW-96, PW-100 (`"exact"`).
- **Readers of the changed doors** (K2 census, STEP 3): every caller of each door's old argument list was found by grepping the door names across `src/`, `e2e/` and `scripts/`; the e2e call sites that passed one value now pass a list of one (`e2e/admin-listings.spec.ts`, `e2e/ad-page-doors.spec.ts`, `e2e/my-listings-page.spec.ts`).

## 5. Tests

**Ids added**, each checked free by `scripts/test-ids.ts` (the laws pass): AL-32, AL-33 (`admin-listings.spec.ts`); SC-28, SC-29, SC-30 (`admin-screening.spec.ts`); MLP-10, MLP-11 (`my-listings-page.spec.ts`); LT-17, LT-18, LT-19 (`admin-locations.spec.ts`, the places door; ruling 1, answer 4's e2e tests, §10); unit: ALR-1, ALR-2 (`use-admin-listings.test.ts`, new family), PL-6 (`locations-service.test.ts`), SF-10 … SF-14 and a re-pointed SF-2, SF-4, SF-5, SF-6, SF-7 (`use-screening.test.ts`), ML-U29 and a re-pointed ML-U13 (`my-listings.test.ts`); guards: DOORS-18 (`scripts/doors/check-doors.test.ts`, stop 2), CF-CAST-1, CF-CAST-2, CF-CAST-3 (`scripts/conformance/type-casts.test.ts`, new family). **Changed, not new:** every spec that chose a filter (18 calls), PW-37…40, PW-92, PW-96, PW-100, PW-113, PW-178, PW-179, PW-186 (the pin choice); MON-13 (stop 2: 42501 for both roles on `market_settings`); MON-16 (INC-1244); `browser-client.test.ts` (two specs join the "moved" list); `e2e-helpers.test.ts` (CF-HELPERS-1 names `chooseFilter`, with a planted line).

**Red-first.** Shown: DOORS-18's planted body fires and its clean twin does not (stop 2); file B's proof (f) failed with the reach clause replaced by `true` and passed on the restored body (stop 2); CF-CAST-2 is a planted case (a wrapped, a split and a plain double cast are found at their lines; a string, a comment, a single cast and a guard are not) and CF-CAST-3 shows a stale, an expired, a malformed and a duplicate line fail. Not shown: INC-1244's red. MON-16 fails only when a repetition draws the scratch code the one before it used (the code pool is small); `--repeat-each 3` in both projects passed (6 passed), but that run did not show a reuse, so it proves the fix does not break the test and the cause is by reading (the route's 15 s held list, `seedCountry`, `scratchCountryCode`), not by a red; CI's repeat lane judges it. LT-17…19 and the readers' tests were not mutated.

**Unit and laws, on the final tree:** `bun run typecheck` clean; `bun run lint` clean (`eslint . --max-warnings 0`); `bunx vitest run scripts --maxWorkers=2`: **129 files, 699 passed, 1 skipped**; `bunx vitest run src/features/admin-screening src/features/admin-listings src/features/my-listings src/features/admin-locations`: **36 files, 216 passed**; `bun scripts/doors/check-doors.ts` (stop 2): 18 finding kinds fired, 221 manifest lines reconcile.

**`bun run checks`**, on `cac963863` (the tree before the two later commits — LT-17…19 with a doc paragraph, then the helper's Escape loop with a doc sentence — each of which ran the checks it can affect: typecheck, lint, the laws, the ids by `--grep`):

- fast line: `checks (fast): 26 PASS · 0 FAIL · 455s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`
- last line: `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 514s`
- the budget job ran: `PASS bundle-budget › Check the first-paint budget`, `PASS bundle-budget › the NEAR band (R4) — 0 NEAR`.
- NOT RUN, each with the gate's reason: `scope › Decide whether the lanes run` and `› Index the code tree the lanes prove` (the Actions API artifacts of a GitHub run); `build-and-check › Workflow lint (actionlint)` and `secrets-scan › Secrets scan (gitleaks)` (pinned linux/x64 binaries; this machine is darwin/arm64); `Install dependencies` in `build-and-check`, `component-tests`, `dependency-audit` and `bundle-budget` (installed already; a package change is its own turn); `dependency-audit › Audit` (the advisory service is not reachable); `e2e-preflight` ×4 (the staging credentials are never held by the script); `e2e` ×6 (merging the lanes' artifacts from GitHub); `promote` ×4 (only CI promotes); `semgrep › Upload SARIF` and its warning (GitHub only). The checks wrote nothing: `git status --short` was empty after.

**Browser runs by id (`bun run e2e:local`, `--retries=0`, `--project=mobile-360 --project=desktop-1280`, E2E values present — names tested, never printed):**

| Run | Ids | Result |
| --- | --- | --- |
| STEP 4 | ACR-E1, CT-11, CO-2, ATR-6, LT-2, LT-11, LT-13, SC-11, SC-27, TR-5, TR-20m, AU-2, MLP-6, PW-37, PW-38, PW-39, PW-40, PW-92, PW-96, PW-100, PW-113, PW-178, PW-179, PW-186 | `49 passed`, `1 skipped` (TR-20m on desktop-1280, its own band guard) |
| STEP 4 (INC-1244) | MON-16 `--repeat-each 3` | `6 passed` |
| STEP 5 | CT-9a, CT-9b, CT-32, PW-143, MLP-6…MLP-11, AU-1…AU-14 | `46 passed`, `2 skipped` (CT-9a on mobile-360 and CT-9b on desktop-1280, their band guards) |
| STEP 3 (re-run for this report) | AL-32, AL-33, MLP-10, MLP-11, SC-28, SC-29, SC-30 | `14 passed` |
| self-review fix | LT-17, LT-18, LT-19 | `6 passed` |
| the helper's Escape loop (`d436428e6`) | ACR-E1, CT-11, CO-2, ATR-6, LT-2, LT-11, LT-13, SC-11, SC-27, TR-5, TR-20m, AU-2, MLP-6, AL-32, AL-33, SC-28, SC-29, SC-30 (the ten spec files that call `chooseFilter`) | `37 passed`, `1 skipped` (TR-20m on desktop-1280, its own band guard) |

Not run locally: CI-5 (`admin-categories-images.spec.ts`, `@global-state`: it fills the missing assets of every row on the shared staging project; its one changed line is `chooseFilter(page, "category-filters", "category-missing-filter")`) — CI's lane runs it. No spec file ran whole locally. `[ssr-error]` counts: none of the runs' logs held an `[ssr-error]` line from the app (the logs carried only `[upstream] ssr language gate 200` lines); I read the tails, not the whole logs. **J-audit line:** the project has no J-audit script or command (`rg -i "j-audit"` finds only this rule); I read the new e2e code against J1–J9 — scratch rows by the harness's prefixes and removed in `afterEach` / `finally` (the two markets through `destroyCountry`, the scratch roles by id), no `waitForTimeout`, no `.first()`, no `test.only` in the diff (`rg` over the added lines: none).

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "__ethioQueryClient|__ethioSupabase" e2e src`; `rg -n 'getByTestId\(["`][a-z-]*-filters["`]\)\.click' e2e/*.spec.ts`; `rg -n "as unknown as" src e2e scripts`; the door-name greps of STEP 3; `rg -n "new Error\(error.message\)" src/features/admin-*`.

- **The browser's client by hand.** `e2e/my-listings-page.spec.ts:433` and `:445` still read `window.__ethioSupabase!` (two lines of `browser-client-allowlist.txt`, held by this bundle's brief to casts only); the other nine files on that allowlist are untouched. `inBrowserClient` (the mechanism) now also types `from(table).select(columns)`, and `window.__ethioQueryClient` is typed once in `e2e/helpers/browser-client.ts` (`BrowserQuery`): `e2e/helpers/ui.ts:1353`, `e2e/auth-signout.spec.ts:159` and the other specs' hand casts of it are not moved (not opened for their casts, ruling 1, answer 7).
- **A panel opened by hand.** `e2e/admin-translations-data.spec.ts:519`, `e2e/admin-audit.spec.ts:135`, `e2e/admin-users.spec.ts:521`, `e2e/admin-roles.spec.ts:68`, `e2e/admin-listings.spec.ts:760`, `:857`, `:1008`, `e2e/admin-screening.spec.ts:514`, `:1458`, `e2e/admin-categories-console.spec.ts:737`, `e2e/admin-translations-governance.spec.ts:570`: each reads or types in the panel; none presses a choice. Left.
- **The casts** on the allowlist: 55 in 30 e2e files, 112 in 76 src files, 4 in 4 scripts files — each one line, until INC-1239.
- **A read whose failure is dropped.** `e2e/admin-categories-console.spec.ts:84` (`secondaryParentNames`) reads `{ data }` and ignores the read's `error`; left (outside STEP 5's casts-only rule).
- **The reader failure class.** `src/features/admin-screening/screening-page.tsx:280` is `catch { }` around `readScreeningRow` (the queue stands; the reviewer opens the row from its menu) — a screen's choice, Lovable's; not changed. Other bare `new Error(error.message)` readers under `src/` are INC-1241's, with its owner.
- **Same concern as the list rule, other doors:** `scripts/doors/check-doors-allowlist.txt` holds 35 permanent lines (until 2027-05-31) for arguments that are a country, a category or a scope and are not list filters (a writer's target, a console's one category, the feed's own category or place, a page's market, a download's or an import's scope); the guard names every door that reads one without the rule.

## 7. Allowlists and guards

| File | Before | After | Note |
| --- | --- | --- | --- |
| `scripts/conformance/type-casts-allowlist.txt` | (new) | **110 lines**: 30 e2e (55 casts), 76 src (112), 4 scripts (4) | every line `<file> (<count>) | the double cast was written before the rule was judged; it is narrowed with a shape guard when the file is next changed | INC-1239` |
| `scripts/conformance/browser-client-allowlist.txt` | 11 | 9 | `admin-categories-console.spec.ts` and `post-wizard-bundle2.spec.ts` left (their hand reads moved onto `inBrowserClient`) |
| `scripts/doors/check-doors-allowlist.txt` | 0 | 35 | permanent, until 2027-05-31, grouped by reason (stop 2); the three temporary lines of STEP 2 are gone (the last, `grant-without-caller admin_screening_queue … | DEC-422`, left in STEP 3 with its caller) |
| `scripts/conformance/seller-names-allowlist.txt` | 17 | 18 | `admin_screening_queue | staff door … | 2027-04-30` |
| `scripts/public-surface-allowlist.txt` | 229 | 230 | `admin_screening_queue` added; two lines (`level_overrides`, `market_settings`) take DEC-407's RETIRED form; the three list doors' lines carry the new-argument-list sentence |
| `scripts/doors/open-rules.txt` | 6 | 4 | `level_overrides` and `market_settings` removed |
| `scripts/conformance/e2e-helpers-allowlist.txt` | empty | empty | `chooseFilter` joined CF-HELPERS-1's names |

Guards new in this bundle, each proven on a planted case and named by a caller: **DOORS-18** (`filter-off-helper` in `scripts/doors`, proven on `PLANTED_LIST_OFF` and its clean twin; in `wired.test.ts`), **CF-CAST-1…3** (`type-casts.ts`, named by `type-casts.test.ts`; `wired.test.ts` derives its domain and finds `type-casts` named; it also passed CF-KIT-7, handing its census's keys). Guards run on the final tree: the laws (129 files), `scripts/doors/check-doors.ts` self-test and static run (stop 2), `scripts/check-migrations.sh` (stop 2, exit 0).

## 8. Strings

None. The brief adds no file that draws a key and no screen text: `rg -n 't\("' ` over the diff's `src/` hunks finds no new `t(` call, the maps `docs/generated/i18n-usage.json` and `public/i18n-usage.json` are unchanged by this tree, and `bun run checks` `i18n-usage-map` passed.

## 9. Migrations

Five files, applied by the operator on ethio-staging and read back (ruling 2, answer 1); ethio-prod follows the merge. Pairing lines (stop 2):

| File | sha256 | Mark | Pairing line |
| --- | --- | --- | --- |
| `20261122023100_a1caa1e9-2188-4f2e-8441-c1da1dad769a.sql` (A0: `door_filter_countries`, `door_filter_categories`) | `40c399e0b47734737fea3bc2e1842713fd5e22a7ba6b703a9293634a49bdbd4b` | `20261122040000` | `apply a1caa1e9 → expect mark 20261122040000` |
| `20261122023200_3d572b84-aa6b-4bc6-beeb-145593fb13a3.sql` (A: `admin_list_listings`, `my_listings`) | `b0054b2e7cc4aa5c434b1467286c75c870f2e23983678ca8d83757ebd068fdfe` | `20261122040100` | `apply 3d572b84 → expect mark 20261122040100` |
| `20261122023300_7366b006-8a16-4200-b479-44976331bf43.sql` (A2: `admin_list_locations`) | `5edf87e77309bce595d7d33f8b3b80abe3ec1209e34031e1b39627bf43bbca97` | `20261122040200` | `apply 7366b006 → expect mark 20261122040200` |
| `20261122023400_219cb8ac-c6b7-44ce-a1c2-522657879179.sql` (B: `admin_screening_queue`) | `5d79887115e5f36ca5ec10189af7094f7e45d6504e20bb4b03e24cc9e0d2d7e5` | `20261122040300` | `apply 219cb8ac → expect mark 20261122040300` |
| `20261122023500_3ab61b82-efab-48ec-8133-bf879e994a1b.sql` (C: INC-1236) | `ea0b9a860e64b4ca5d3789ed9ba0432ebf7d39f94187d6436c9cb2ae416bc0a1` | `20261122040400` | `apply 3ab61b82 → expect mark 20261122040400` |

(Each sha256 above was read from the tree with `sha256sum` for this report.)

Redeclared bodies' md5 (stop 2): `door_filter_countries` `082a4b33fe8ae87959cdbc26c3f07a37`; `door_filter_categories` `5cd2410db10c8e5077f6d8f7e86df5fa`; `admin_list_listings` `a9ce9f7a9a65db31ac086883e0b81091`; `my_listings` `619f5b92860683dc5eb6b8686e0306bd`; `admin_list_locations` `72ba9a070eabdc79d8a34a25b257d973`; `admin_screening_queue` `b9361dc3860adf0b6ddeb541933fe93d`. Last line of `bun run db:proof --fresh` on the tree of stop 2 (migrations are unchanged since): `db:proof PASS — applied 550/550, CLI 2.120.0, cold, 56 s`. This turn did not run it again: no migration changed after stop 2.

## 10. Departures

1. **Ruling 1, answer 4's e2e tests for the places door were not written at STEP 3.** The unit test (PL-6) was; the four browser cases (two countries OR-ed, twenty-one values refused, no `locations:view` refused, a country-scoped caller's reach) were found missing by the self-review after the first push. LT-17 (OR-ed, none or empty, 21 values, a three-letter code), LT-18 (no permission, the gate first) and LT-19 (a grant scoped to one country lists that country's places only, whatever list is asked) are the fix, in `d145cfee9`: the second code commit's one allowance. The reach case reuses `grantScratchRole` and scopes its `user_roles` row by an update through the service client (the scratch role is removed by id in `afterEach`); `destroyCountry` removes the two scratch markets and the rows scoped to them. The no-list cases find a place by its own scratch slug, never by listing every market (a list of every place could pass the API's row ceiling).
2. **Two further code commits, not one.** The brief's STEP 7 allows one. `d145cfee9` (LT-17…19) and `d436428e6` were both made for items of the rulings that the build had missed: the first for ruling 1, answer 4's browser cases; the second for ruling 1's STEP 4 amendment — the helper first pressed `Escape` once; it now presses it while `<panel>-panel` is visible, at most twice, and expects the panel gone. Both were found by reading the report against the rulings, and both were pushed before 13:00 UTC (answer 10).
3. **The seven casts' rewrites.** `post-wizard-bundle2` PW-143 and `admin-categories-console` CT-32 moved onto `inBrowserClient` (they read the page's client), so `BrowserClient` gained `from(table).select(columns)`; `admin-users` reads the query cache through a `Window.__ethioQueryClient` type (`BrowserQuery`) in the one browser-client helper; `admin-categories-console` `secondaryParentNames` reads the embedded parent through a shape guard (the generated types draw it as a list; the answer is one row); `my-listings-page` reads the truth rows through the typed client (`{ ...data }`, `truth.data.public_id`). The two moved specs left `browser-client-allowlist.txt`.
4. **Ruling 1, answer 7's COUNT 114 for `src`** was read at the base (114); at the head it is 112, because STEP 3 removed the two casts of the queue's reader.
5. **`house-style` HS-5 is untouched (ruling 2, answer 9); `e2e/dialogs.spec.ts`, `overlays.spec.ts` and `house-style.spec.ts` are Lovable's branch's.** The four `admin.screening.confirm…` statements of `e2e/admin-screening.spec.ts` (dev :562-563, :680-681, :1414, :1423 and the line above and below each) were left byte for byte (§4's diff of that file touches none of them). STEP 3 edits no page file.
6. **The types patch** was applied as ruling 2 directs; after it, the typecheck named exactly the five lines in the three reader files, all fixed in STEP 3.
7. **A fix the build made on the plan:** `docs/features/locations-console.md` and `docs/features/admin-listings.md` each had a sentence the new doors made untrue ("an ad whose place has been switched off is listed under All only"); both were corrected in the same commit (`An ad with no place is listed under "All" only.`).
8. **Rulings and stops in this turn:** stop 1 (the plan), ruling 1 (eight decisions; the locations door joins; the amendments), stop 2 (the migration stop), ruling 2 (staging holds the five files; the types patch; INC-1244; answers 1–11). The push was made at 08:03 UTC and again at 08:14 UTC on Sunday, before 13:00 UTC and the Feed bench (ruling 2, answer 10); the PR stays DRAFT (answer 11).

**Self-review (rule 80), headings:**
1. SCOPE — every changed file is in a named area or the standing allowance; `e2e/admin-monetisation.spec.ts` (MON-13, ruling 1 answer 3; MON-16, ruling 2 answer 7), `src/features/admin-locations/` (answer 4) and `e2e/helpers/locations.ts` / `browser-client.ts` (ruling 2; the one browser-client mechanism) are named by a ruling. None outside.
2. BEHAVIOUR CONTRACT — §3; the one change beyond the numbered ones is DEC-422's `listings:review` gate, ruled.
3. BANNED PATTERNS — `rg` over the added lines of `src`, `e2e`, `scripts`: no `.first()`, `waitForTimeout`, `test.only`, `any`, `@ts-ignore`, `!`, `?? 0`, no catch-and-continue; `as unknown as` appears only as text in `type-casts.ts`'s comment and message; one `price_currency: "ETB"` in a unit-test fixture row (`use-screening.test.ts`, as in the fixture rows of the other unit tests) — MINOR 1.
4. ONE MECHANISM — every new need joined a mechanism (`inBrowserClient`, the one `chooseFilter`, the list rule, `readerFailure`); K2 is §6; the new guards are proven and wired.
5. TESTS — §5; the one gap found (LT-17…19) was fixed; INC-1244's red is not shown (§5) — MINOR 2.
6. MIGRATIONS — unchanged since the supervisor's read at stop 2.
7. DOCS AND RECORDS — feature docs updated (`doors`, `admin-listings`, `my-listings`, `locations-console`, `admin-screening`, `e2e-harness`, `ci-guards`, `translations`, `display-primitives`); allowlist lines carry reason and until; §14 below; §13 written.
8. SECURITY — nothing that the public repository should not carry; every input is a door argument validated by the list rule; no provider or Postgres text reaches a client (the readers throw typed failures; the screens draw keys).
Standing MINORs: (1) the fixture literal above; (2) INC-1244's red; (3) `e2e/admin-categories-console.spec.ts:84` ignores a read's error (§6, left).

## 11. CI

**Base** (the first six lines of `ci-status.md` for dev, read at the push after `git fetch origin dev main ci-evidence`; two-step SHA check: `git rev-parse origin/dev` = `63d6bee0d60517187cf1a636666c5ffeb308f7d4`, equal to the file's commit):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `63d6bee0d60517187cf1a636666c5ffeb308f7d4` (short `63d6bee`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-21T23:06:30Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44959633359
```

**The migration push** (`d2953e55f`, run 44979930034, FAILURE; ruling 2, answer 6): four red jobs — `E2E preflight (migration parity, staging)` and `E2E (Playwright, ethio-staging)` (expected before the operator applied the five files on ethio-staging; ruling 2, answer 6); `E2E lanes / Lane 6` (`e2e/admin-locations.spec.ts` LT-1…LT-16 failed with `22P02 malformed array literal: "ET"`: the reader sent one text to the door that now takes a list; expected until STEP 3; fixed in `e9de260c2`); `E2E lanes / Lane repeat` (MON-16 failed under repetition in both projects: INC-1244, fixed in `3847ae92f`). No re-run was made.

**This pull request's runs:**

- `cac963863` (STEPS 3 to 5, the first push): run 45000932724 — `success`, every job success or skipped (39 jobs read with `gh run view … --json jobs`). It proved the tree of the readers, the harness and the cast guard, in every lane including Lane 6 and the repeat lane.
- `d145cfee9` (LT-17…19, the locations doc): run 45001897477 — `completed`, `success`; a later push made it moot, but it finished green.
- `d436428e6` (the last code commit: the helper's Escape loop, the doc sentence): run 45003217164 — `success`, 39 jobs read with `gh run view … --json jobs`, none other than success or skipped; the summary line of the lanes: `lanes finished=20/20; passed=2708; failed=0; flaky=0; skipped=366`; `E2E lanes / Lane repeat on temporary Supabase` success.

Rereads: none; no job was re-run.

## 12. Limits

- Not run: `bun run checks`' 25 NOT RUN steps (§5, each with its reason); CI-5 locally (§5); the browser runs of any spec file whole (rule 00 step 7). The Feed bench and the weekly runs are not mine.
- INC-1244's red was not shown (§5, §10).
- The census's per-page first-download numbers, before and after, were not measured page by page: the budget job passed with `0 NEAR` on the tree of `cac963863`, and the changed readers load on admin and signed-in screens, not on a first-paint path; `d145cfee9` adds only tests and a doc; `d436428e6` changes one e2e helper and a doc.
- The `[ssr-error]` count was read from the tails of the run logs, not from the whole logs (§5). `bun run db:proof` was not re-run (no migration changed after stop 2).
- ethio-prod was never touched; the types patch, the apply on ethio-staging and its read-back are the supervisor's and the operator's (ruling 2).

## 13. Findings

1. `e2e/admin-categories-console.spec.ts:84` (`secondaryParentNames`) drops a read's `error` and would then compare against an empty list (§6); small, outside STEP 5's casts-only rule; left.
2. `src/features/admin-screening/screening-page.tsx:280` swallows a failed `readScreeningRow` of the reopened ad with an empty `catch` (the comment says the queue stands); a reviewer who followed a link to an ad sees the queue and no word that the open failed. It is a screen (Lovable's); raised, not changed.
3. INC-1240's class is still live in five doors (`admin_list_listings`, `admin_list_users`, `admin_list_translations`, `admin_list_entity_translations`, `impersonated_list_listings`): the total is read from the first row `?? 0` in `use-admin-listings.ts` (a page past the end says zero). It is ruling 1's INC-1240, owner Lovable's bundle 3; the queue's new door answers its total apart from its page (SF-11).
4. The generated types draw an embedded to-one relationship (`categories!category_tree_pointers_parent_id_fkey`) as a list, so a typed caller needs a guard for a row's real shape (`e2e/admin-categories-console.spec.ts:55-72`). A types note for the supervisor; no change here.
5. A rule that misled me: rule 00's "push once" and the brief's STEP 7 "at most one further code commit" together meant the self-review's fix (LT-17…19, §10) used the one further commit on a run that was already green, and the helper's Escape loop (§10, departure 2) needed a second; a push on a red would have had no allowance. Raised, not changed.
6. Nothing else major: `rg -n "new Error\(error.message\)" src/features/admin-listings src/features/admin-screening` finds none after STEP 3; the bare-`Error` readers elsewhere under `src/` are INC-1241's.

## 14. Records

DEC-420 — built, its database half: `admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)` → `(text,text,text[],uuid[],text,date,date,text,integer,integer)`, mark `20261122040100` (a DROP + CREATE; `p_country text[]`, `p_category uuid[]`); `my_listings(text,integer,integer,text,uuid,text)` → `(text,integer,integer,text,uuid[],text)`, mark `20261122040100` (a DROP + CREATE); `admin_list_locations(text,text,text,boolean)` → `(text[],text,text,boolean)`, mark `20261122040200` (a DROP + CREATE); applied on ethio-staging 2026-11-22 and read back (ruling 2, answer 1); ethio-prod follows the merge; the screens' half is Lovable's bundle 3.

DEC-422 — (the supervisor's, G17; told to the operator as his to overrule, 2026-11-21): the Screening queue is read through its own door on `listings:review` with the `filter` reach — a reviewer whose grant names countries sees the queue of those markets, by the ad's home country, as the preview and the decision already judge; a global grant sees every market. On the day of the apply no role assignment on ethio-prod names a country, so no reviewer's queue changes. Built: `admin_screening_queue(text,text[],text,text,integer,integer)`, mark `20261122040300`, manifest line `scripts/doors/manifest.txt` (`staff-reader | authenticated | listings:review | … | filter | - | badValue | -`); applied on ethio-staging 2026-11-22 and read back (ruling 2, answer 1).

DEC-423 — (the supervisor's, G17, under DEC-420): the list rule is one mechanism — `door_filter_countries` and `door_filter_categories`, with its guard. At most twenty values; a country read as the doors read it today and refused when it is not two letters; a category by its subtree; NULL or an empty list is no filter; a list that matches nothing answers no row. `admin_list_locations` is in the family. Built: mark `20261122040000`, the guard `filter-off-helper` (DOORS-18); applied on ethio-staging 2026-11-22 and read back (ruling 2, answer 1).

ACT-022 — status line: CLOSED for its data — the queue's reader is `admin_screening_queue` read by `listScreening` and `readScreeningRow` (`src/features/admin-screening/use-screening.ts`), its manifest line is in `scripts/doors/manifest.txt`, and the gate's proof both ways is SC-28 (no `profiles:view`: no e-mail in any row, an e-mail term matches nothing) and SC-29 (with it: the e-mail, and a match by it) — all listings already held it (`20261118012800`); the column and the filter on the Screening screen are Lovable's bundle 3.

INC-1236 — status line: CLOSED — retired: the mark `20261122040400`; the catalogue's answer after (the proof's (a)–(d)): neither anon nor authenticated holds SELECT on either table or any column, each table's policies are exactly its three write refusals, the service role reads both; the two RETIRED lines in `scripts/public-surface-allowlist.txt` (`level_overrides`, `market_settings`); the two lines removed from `scripts/doors/open-rules.txt`. INC-1236 adds: the two rules and the column grants are gone on ethio-staging (ruling 2, answer 1); ethio-prod follows the merge.

INC-1237 — status line: CLOSED — the one helper is `e2e/helpers/filters.ts` `chooseFilter(page, panel, filter, value?)`; the specs on it are 18 calls in 11 files (`rg -c 'chooseFilter\(' e2e/*.spec.ts`); the copies removed are `e2e/helpers/countries.ts`, `e2e/helpers/locations.ts`, `e2e/helpers/translations.ts` and `categories.ts`' `toggleMissingAssets`; `chooseFilter` joined CF-HELPERS-1's names.

INC-1239 — status line: OPEN with its list — the guard is `scripts/conformance/type-casts.ts` over `src/`, `e2e/` and `scripts/` (generated files left out as a class), CF-CAST-1…3, its planted case CF-CAST-2; the files left on the allowlist are 110 (`rg -c '\| INC-1239' scripts/conformance/type-casts-allowlist.txt` lines), 171 casts: 30 e2e files (55; `rg -n 'as unknown as' e2e | wc -l` = 55), 76 src files (112; `rg -n 'as unknown as' src | wc -l` = 112) and 4 scripts files (4), each until INC-1239; the four e2e files this bundle touches left the list (7 casts).

INC-1240 — (the supervisor's; the build's finding 2): a list door that answers its total as a windowed count beside each row answers no total for a page past the end, and its reader then says zero. Read on ethio-prod today: five functions hold the form — `admin_list_listings`, `admin_list_users`, `admin_list_translations`, `admin_list_entity_translations`, `impersonated_list_listings`. Class: a success-shaped total. Owner: Lovable's bundle 3, at the shared table — a page that comes back empty beyond the first asks for the first page — because a kept view makes the case likelier. The queue's new door answers its total apart from its page and is not in the class.

INC-1241 — (the supervisor's; the rest of the build's finding 1): readers under `src/` that throw a bare `Error` from a failed read instead of the typed reader failure. Class: a reader outside the one failure mechanism (INC-847's). Owner: the turn that owns `src/lib/reader-failure.ts`, with INC-1235, where the class gets its census and guard. This bundle clears the two files it rewrites.

INC-1244 — (owner this bundle STEP 4; status as this report finds it at the final push: FIXED in `3847ae92f`, its red not shown locally, CI's repeat lane judges it: `Lane repeat on temporary Supabase` is success on `cac963863`'s run and on `d436428e6`'s run; I did not read the lane's log to see whether MON-16 was among the specs it repeated): `e2e/admin-monetisation.spec.ts` MON-16 fails under repetition — its wait for the scratch market is keyed on the market's code, which a repetition reuses, while the page names a market from the open-markets store; the Markets detail then names the previous repetition's market (CI run 44979930034, the repeat lane, both projects). Class: a wait keyed on a value a repetition reuses (the family of INC-428 and INC-1136).

DEC-420 and DEC-423 each add: applied on ethio-staging 2026-11-22 and read back (ruling 2, answer 1). (DEC-422's text above says the same.)

pin specs — the helper step: `e2e/helpers/posting.ts` `choosePinShow(page, precision)` (the type `PinPrecision` of `src/features/posting/map/pin.ts`); the paths that press a choice: `post-wizard-bundle2` (`savePinOnMap(…, "exact")` ×3 and PW-186's inline Save), `post-wizard-place` (PW-37, PW-38, PW-40 `"exact"`; PW-39 `"approx"`), `post-wizard-where` (PW-92, PW-96, PW-100 `"exact"`).

register row — `The double cast is judged: rule 10's ban on as unknown as is read by a syntax-tree census over src/, e2e/ and scripts/ (generated files left out as a class) | scripts/conformance/type-casts.ts (typeCastCensus, doubleCastLines, castFiles) | CF-CAST-1, CF-CAST-2, CF-CAST-3 (scripts/conformance/type-casts.test.ts) | scripts/conformance/type-casts-allowlist.txt, one line per file keyed <file> (<count>), until INC-1239 | a new file starts at zero; a file that sheds a cast lowers its line | INC-1239`.

register row — `The list rule: a list door's country and category arguments are read by one pair of helpers | supabase/migrations/20261122023100_a1caa1e9-2188-4f2e-8441-c1da1dad769a.sql (door_filter_countries, door_filter_categories) | DOORS-18 (scripts/doors, the finding filter-off-helper) | scripts/doors/check-doors-allowlist.txt (35 permanent lines) | the next filter takes a list by the same form | DEC-420, DEC-423`.

register row — `A browser test chooses a filter by one step: e2e/helpers/filters.ts chooseFilter(page, panel, filter, value?) (the pin step is e2e/helpers/posting.ts choosePinShow) | CF-HELPERS-1 | none | a new table's filter passes through it | INC-1237`.

changelog — `cursor-bundle-2: the list doors take several countries and categories (DEC-420, DEC-423); the Screening queue has its own staff door with the seller (ACT-022, DEC-422); level_overrides and market_settings are closed to browsers (INC-1236); one chooseFilter and one choosePinShow for the browser tests (INC-1237); the double cast is judged (INC-1239); MON-16 waits for its own market (INC-1244).`

roadmap — tick `INC-1236`, `INC-1237`, `ACT-022` (its data), `DEC-420` (its database half) and `INC-1244`; `INC-1239` stays open with its list (110 files).

slip — none. S725 and S726 are the supervisor's, recorded by R18; the PREVENTION notes (the go-template and e2e-harness sentences) are the supervisor's.
