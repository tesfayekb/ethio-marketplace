# FOUNDATIONS 1, TURN F1-5a — the seller's posting doors onto the door mechanism — report
Base: bdb2fc555c04ea6a1ad65ba96ccc89e6ad4840ee · Final commit: d50825beb · Brief: docs/governance/briefs/f1-doors-5a.md (sha256 a823e568de14a7df2074c8171ca45579c7c8bf7fe10a303b2a90f3598fd07803; ruling 3 sha256 f6973bb279ad142e3524e4e7770219ba55261aff66e857de61ccaed293cf523e, equal to the operator's value)
Review: READY · 0 BLOCKER · 0 MAJOR · 2 MINOR · on d50825b

This is the SECOND CHAT's report (Claude Sonnet 5.5, DEC-387; rulings 3 and 4). The first chat (Opus 5.5) wrote STEPS 0 to 2 and ended at the migration stop (`f1-doors-5a.stop-3.md`); this chat did STEPS 3 to 7 under ruling 3. I wrote no SQL.

## 1. Done / not done, by part and step

- STEP 0, 1, 2 (the first chat): the task saved, the census (`f1-doors-5a.census.md`), rulings 1 and 2, Part 1 (DEC-392's two grants), Part A (`grant-dropped`), Part B (`src/lib/answered-id.ts`, six ceilings back), the migration (fifteen files), the migration stop. Not repeated here; their commits are on the branch.
- Ruling 3 saved BARE by scripted copy, types patch applied by `git apply`, both usage maps regenerated: `12b354532` (sha256 of the ruling and of the patch equal to the operator's values, checked before the commit).
- STEP 3 — `a1a17e708` "the client and the routes read codes through the reader":
  - `actionErrorKey` (`src/features/my-listings/my-listing.ts`) and `promoteRefusalKey` (`promote-service.ts`) read through `readRefusal` with the family's words (`SELLER_DOOR_REFUSALS`, `LEVEL_REFUSALS`, `REACH_REFUSALS`); the posting schema reader (`posting-service.ts`, `readPostingSchemaAnswer`) reads the dial through `isRateRefusal` (`refusal-text.ts`, on `readRefusal`) — decided: it moves (ruling 3 §5), see §10.
  - `draft.ts`'s `translate` answers `null` for every message it does not map (ruling 3 §4); the census of every `translate` is in §4.
  - The three casts of `draft.ts` (two) and `identity.ts` (one) are gone: the argument objects are typed `DoorArgs<…>`; the three allowlist lines of CF-DOOR-ARGS are gone; two CF-FORM-3 lines (`my-listing.ts`, `promote-service.ts`) are gone with them.
  - `z.unknown()` became `z.json()` for `attributes` and `contactPref` (draft, identity) so a body's JSON is typed `Json`.
- STEP 4 — `c48f32181` "the family's tests": the e2e expectations (§5, §10).
- Ceilings — `9ee24b501`: two pages (§10).
- Ruling 4 — `d50825beb` "a door's code is not logged as a server error": `doorCall` (`src/server/door.ts`) answers a door's machine code as its reason with no log line; a sentence is still logged and answers `doorError`; `door.test.ts` DC-2 gains both cases; `docs/features/routes.md` says so.
- STEP 5 — the gate and the browser check (§5). STEP 6 — the first push (`9ee24b501`, pull request #50 made ready), then, after ruling 4, the one push of the turn's end (`d50825beb` and the report). STEP 7 — this report.
- Not done: nothing of STEPS 3 to 7 is left. LEFT for later turns: F1-6 (the staff doors), F1-7 (`door_context`'s `rateLimited` with its reset time; every door call's `Result` typed; the three assertions of §13).

## 2. Files changed
`git diff --name-only bdb2fc555c04ea6a1ad65ba96ccc89e6ad4840ee` (76 paths; the migration, guard and doors files are the first chat's; the client, routes, tests, e2e, `src/server/door.ts` and `docs/features/routes.md` are this chat's):

```
docs/features/doors.md
docs/features/locations-console.md
docs/features/routes.md
docs/generated/i18n-usage.json
docs/governance/briefs/f1-doors-5a-ruling-1.md
docs/governance/briefs/f1-doors-5a-ruling-2.md
docs/governance/briefs/f1-doors-5a-ruling-3.md
docs/governance/briefs/f1-doors-5a.md
docs/governance/reports/f1-doors-5a.census.md
docs/governance/reports/f1-doors-5a.stop-1.md
docs/governance/reports/f1-doors-5a.stop-2.md
docs/governance/reports/f1-doors-5a.stop-3.md
e2e/admin-listings.spec.ts
e2e/admin-users.spec.ts
e2e/auth-caller-gates.spec.ts
e2e/my-listings-ad.spec.ts
e2e/my-listings-doors.spec.ts
e2e/my-listings-levels.spec.ts
e2e/posting-routes.spec.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/door-args-allowlist.txt
scripts/conformance/forms-allowlist.txt
scripts/conformance/listing-designation.test.ts
scripts/conformance/listing-designation.ts
scripts/conformance/migration-reader.test.ts
scripts/doors/catalogue.ts
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/judge.ts
scripts/doors/manifest.txt
scripts/doors/rows.ts
scripts/route-budgets.mjs
src/features/admin-attributes/attributes-service.ts
src/features/admin-categories/categories-service.test.ts
src/features/admin-categories/categories-service.ts
src/features/admin-locations/locations-service.ts
src/features/my-listings/my-listing-edit.test.ts
src/features/my-listings/my-listing.test.ts
src/features/my-listings/my-listing.ts
src/features/my-listings/promote-service.test.ts
src/features/my-listings/promote-service.ts
src/features/posting/posting-service.test.ts
src/features/posting/posting-service.ts
src/features/posting/refusal-text.test.ts
src/features/posting/refusal-text.ts
src/integrations/supabase/types.ts
src/lib/answered-id.test.ts
src/lib/answered-id.ts
src/routes/api/attributes.options.test.ts
src/routes/api/listings/alias.test.ts
src/routes/api/listings/alias.ts
src/routes/api/listings/draft.test.ts
src/routes/api/listings/draft.ts
src/routes/api/listings/identity.test.ts
src/routes/api/listings/identity.ts
src/routes/api/listings/photos.test.ts
src/routes/api/listings/publish.ts
src/routes/api/publish.test.ts
src/server/door.test.ts
src/server/door.ts
supabase/migrations/20261115203000_986fbe0b-2896-4dc1-8c8f-3673b90130f4.sql
supabase/migrations/20261115203100_7603ae36-8661-444c-ab52-4d57c960ed42.sql
supabase/migrations/20261115203200_097f9087-016b-4872-b29a-9b88fe076acb.sql
supabase/migrations/20261115203300_8ab7c960-9744-4017-a6e9-208155eccc58.sql
supabase/migrations/20261115203400_c0d42dfb-628a-468a-9e0a-5da6d5de30c6.sql
supabase/migrations/20261115203500_61e4e66b-b39b-4644-b25a-179284db7406.sql
supabase/migrations/20261115203600_538bb297-4aee-455b-b147-34a6188e261d.sql
supabase/migrations/20261115203700_3e9620aa-fd11-40d9-9b50-7f766c838db9.sql
supabase/migrations/20261115203800_c57c863c-b032-4ed8-a6a6-fd3e6ebab4c7.sql
supabase/migrations/20261115203900_cf5771ed-622d-47a3-a7b4-cbc76afa1bd6.sql
supabase/migrations/20261115204000_5cf2054f-b6e7-4140-a187-6d0ec7a419dd.sql
supabase/migrations/20261115204100_67fc3a41-23b6-4508-b4f5-5eb41cd35ff9.sql
supabase/migrations/20261115204200_236752a6-ebc4-47b4-9886-6b6e8ac78c26.sql
supabase/migrations/20261115204300_5f6de283-a975-4d85-9318-1b8ae1d7a897.sql
supabase/migrations/20261115204400_8c921ada-9ab3-4ea8-827f-3b2a9e1a485a.sql
```

New files, `git ls-files` proof: `docs/governance/briefs/f1-doors-5a-ruling-3.md`, `src/lib/answered-id.ts`, `src/lib/answered-id.test.ts` and the fifteen migrations of §9 are tracked (`git ls-files --error-unmatch` exit 0 for the first three; the migrations are listed by `git diff --diff-filter=A`). No file is deleted.

## 3. Behaviour contract — answer tables before → after

| Reader / route | At base (`bdb2fc555`, the sentence door) | Now (the shell's code) |
|---|---|---|
| `actionErrorKey(m)` | substring tests on sentences: `rateLimited`, `nothing changed`, `an ad in review is edited`, `account is deactivated`, `removed by enforcement only`, `not your listing`, `listing not found`, `illegal transition`, `only a live listing`, `owner only` … | `readRefusal(m, SELLER_DOOR_REFUSALS)`: `rateLimited`, `accountDeactivated`, `nothingChanged`, `inReview`, `residencyUnknown`, `noFreeSlot`, `renewOff`, `severeRemove`, `notYourListing`, `listingNotFound`, `illegalTransition`, `notLive`, `ownerOnly`, `renewNeedsExpired`, `notPaused` → the SAME keys as before; any other code or a sentence → `myListings.error.failed` (the generic line) |
| `promoteRefusalKey(e, kind)` | `doorCode(e)` then the level's or the reach's words, else `door.refused` | `readRefusal(e, LEVEL_REFUSALS or REACH_REFUSALS)`: the same words plus `notYourListing` → `myListings.error.notYours` (DEC-391); a code's tail (`sameLevel:<until>`) is ignored; else `door.refused` |
| `readPostingSchemaAnswer` | `error.message.includes("rateLimited")` | `isRateRefusal(error)` (the draft family's `rateLimited` word through `readRefusal`); any other error: `{schema:null, rateLimited:false}` and the log line, as before |
| `POST /api/listings/draft` | an unmapped door message → `{field:"door", reason:"doorError", detail:<constraint>}`; a door's `rateLimited` envelope `{field:"rate", reason:"rateLimited", detail:<resets_at>}` | `translate` maps only `listings_price_bp_check` and `listings_price_mode_check`; every other message → `doorCall`'s `doorRefusal`: a door code stays whole as `reason` (`rateLimited`, `notYourListing`, `accountDeactivated`, `badValue:step` …) with `field:"door"`, a sentence → `doorError`; the dial's refusal carries NO `detail` (INC-1170); status 200, envelope unchanged |
| `POST /api/listings/identity`, `/alias`, the photos routes, `/publish`, `GET /api/attributes/:id/options` | the door's own envelopes and sentences | a shell refusal reaches the client as `{field:"door", reason:<code>}` through `doorCall`; the route's OWN dials (identity's imitation judge, the photo routes') keep `field:"rate"` and their `detail` |
| `doorCall` (`src/server/door.ts`, ruling 4) | every error no `translate` mapped: logged (`[ssr-error] <path> <message>`) and answered by `doorRefusal` | a message `doorRefusal` keeps whole as the reason (a door's machine code: `notYourListing`, `rateLimited`, `illegalTransition:closed-reduced`) → the same answer, NOT logged; any other message → logged whole and `doorError` (with the constraint's name as detail), as before; a mapped `translate` answer first and unlogged, as before; the answer's status and body unchanged for every case |
| the doors' argument objects | `as unknown as <Args>` (draft ×1 for submit, identity ×1) and `geoGuess(request).country as unknown as string` | typed `DoorArgs<…>`, one narrowing assertion at each call (§13) |
| the routes' bodies `attributes`, `contactPref` | `z.unknown()` | `z.json()` — a JSON body can carry nothing `z.json()` refuses, so no request that worked fails |

Everything else on these routes is today's (status, body keys, order of side effects): the unit tests DRT-5/6, IDT-5, ALT-4, PHT-5, the publish and options tests (§5) and the e2e of §5 prove the changed rows; the existing tests of the routes pass unchanged.

## 4. Censuses

- Every `translate` handed to `doorCall`: `rg -n "translate" src/routes/api src/server --glob '!*.test.*'` → ONE: `src/routes/api/listings/draft.ts:103` (`export function translate`, passed at `:163`); `src/server/door.ts:35,43` is the option's reader (a `null` falls to `doorRefusal`). Every other hit is the AI/translation provider (`gateway.ts`, `translate.ts`, `tasks.ts`, `google-translate.ts`) or prose. The law of ruling 3 §4 therefore binds one route; DRT-5 proves it.
- Sentence readers of the folded sentences: `rg -n 'includes\("(not your listing|illegal transition|only a live|account is deactivated|nothing changed|an ad in review)' src` → `src/features/posting/posting-service.ts:353` and `src/features/my-listings/my-listing.ts:81` (`not your listing`: `my_listing_private` and `my_listing`, doors of another family, still sentences — they hold), `src/features/auth/deactivated.ts:38` (`isDeactivatedRefusal`: no non-test caller, the census's finding, §13).
- e2e readers of the changed doors' sentences, by sentence: `rg -n "not your listing|only a live|illegal transition|owner only|not editable|nothing to change|nothing changed|is not copied|renewed before|in review is|account is deactivated|enforcement only|owner deleted" e2e` → every hit resolved: changed (§10) or a door outside the migration (`listing_history` ML-2:333/335, `my_listing` MLA, `my_listing_private` PR-21, `listing_counts` APD, `my_listing_certification` LG, `admin_edit_listing` AL-12/AL-21, the routes' own `account is deactivated` PR-51 from `user-client.ts:234`, `unsave_listing`/`accept_legal` CG-1).
- e2e readers of the SHAPE keys (`field`, `reason`, `detail`, `resets_at`, `refusals`) of the changed answers, by door name (ruling 3 PREVENTION (2)): `rg -n 'rateLimited|resets_at|resetsAt|field.*"rate"' e2e` → PR-7 (changed), PR-26 `posting-routes-identity.spec.ts:73,94` (the identity route's own imitation dial: `field:"rate"` holds), PR-49 `posting-routes.spec.ts:1311` (the photo route's own dial: `field:"photos"` with a `detail` holds), PP-9 (the upload route's dial holds), PR-27…31 `posting-routes-dials` (`isRateRefusal` on the message `rateLimited` holds), VP-4 and the ad-page doors' `resets_at` (`set_viewing_place` and the ad-page doors: no file of the fifteen declares them — `rg` over the fifteen finds `resets_at` only in a comment of `20261115204300`).
- The class of the first push's reds (INC-1172, ruling 3): the files added by this chat: none (the maps regenerated stay byte-equal: `bun run i18n:usage` after STEP 3 changed nothing, `docs/generated/i18n-usage.json` unchanged).

## 5. Tests

Unit tests added or changed (ids):
- `my-listing.test.ts` ML-U7 (re-pointed: the code words and the generic fallback for each unmapped code), `my-listing-edit.test.ts` (the edit's and copy's codes through `actionErrorKey`), `promote-service.test.ts` (`notYourListing`, a code's tail).
- `refusal-text.test.ts` PRT-2 (the posting doors' codes have words; `notADraft`, `listingNotFound`, `photosSoonNotEditable:sold`, `toString` draw the fallback), PRT-3 (`isRateRefusal` in each shape).
- `posting-service.test.ts` PSV-9; `draft.test.ts` DRT-5 (translate → null; the door's code reaches the client), DRT-6 (a country the edge cannot name reaches the residency door as null); `identity.test.ts` IDT-5; `alias.test.ts` ALT-4; `photos.test.ts` PHT-5; `publish.test.ts` (the shell's refusals reach the client as codes); `attributes.options.test.ts` ATO-7.
- A refusal test proves its refused side effect did not happen where the route has one (IDT-5: `state.audits` empty; PHT-5: no storage object touched; ALT-4/DRT-6: the door answered first).

E2E changed (each with the line read; the expectation moves from the folded sentence to the code):
- `my-listings-doors.spec.ts`: ML-1 `:275` `notLive`, `:277` `illegalTransition:closed-reduced`; ML-2 `:332–334` `notYourListing` (`:335–337` are `listing_history`, a reader — held), `:340` `illegalTransition:screening-closed`, `:342` `inReview`, `:344` `notLive`, `:357` and `:362` `ownerOnly:closed-active`; ML-3 `:408` `notLive`; ML-6 `:556` `renewFirst`; ML-12 `:871–890` the twelve cases (`nothingChanged` ×2, `notEditable:category_id`, `notEditable:poster_expires_at`, `badShape:coverage`, `badShape:contact_pref`, `draftNotEdited`, `inReview`, `renewFirst`, `listingNotEditable:sold`, `listingNotFound` for the caller's own deleted ad, `notYourListing`); ML-13 `:1021–1024` `notCopied:draft`, `notCopied:removed`, `notCopied:rejected`, `notYourListing`.
- `my-listings-ad.spec.ts`: MLA-8 `:672` `ownerDeleted`; MLA-10 NOT edited — it reads the words the SCREEN draws (`myListings.error.severe`), and `actionErrorKey` now maps `severeRemove` to that key (ML-U7 proves the mapping; the browser run proves the screen).
- `my-listings-levels.spec.ts`: LDR-2 `:415` `{ reason: "notYourListing", id: theirs }` (ruling 1 §2).
- `posting-routes.spec.ts`: PR-7 `:526`: `field === "door"` and `reason === "rateLimited"`; the `detail` assertion ("the refusal names WHEN it lifts") REMOVED with a one-line comment naming INC-1170 (ruling 3 §7 — a ruled change of behaviour recorded as an open incident, not a loosened assertion). PR-21 NOT edited: its `not your listing` is `my_listing_private`'s (ruling 3 §3).
- `admin-listings.spec.ts`: AL-8 `:620` `enforcementOnly:removed-screening`; AL-29 `:1975` `{ error: "notEditable:category_id" }`. `admin-users.spec.ts`: AU-5 `:346` `toContain("accountDeactivated")`. `auth-caller-gates.spec.ts`: CG-1 `:179` the loop splits — `set_cover_photo` → `accountDeactivated`; `unsave_listing` and `accept_legal` keep `account is deactivated` (ruling 1 §1).
- J-audit (e2e/** changed): no scratch row, key, seed, locator or timeout changed; only expected strings and the one PR-7 shape assertion. J1/J3/J4/J7 hold as they were.

Runs (the gate on the final tree `d50825beb`; the first gate on `9ee24b501` was `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 509s`, 28 passed by id):
- `bun run typecheck`: exit 0. `bun run lint`: exit 0.
- `bunx vitest run src/features/posting src/features/my-listings src/routes/api src/server/door.test.ts`: `Test Files 103 passed (103)`, `Tests 714 passed (714)`. `bunx vitest run scripts --maxWorkers=2`: `Test Files 120 passed (120)`, `Tests 622 passed | 1 skipped (623)`.
- `bun run checks`: fast line `checks (fast): 26 PASS · 0 FAIL · 446s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`; last line `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 515s` (final tree; fast line `checks (fast): 26 PASS · 0 FAIL · 446s`). NOT RUN, each with its reason from the output: `dependency-audit` (install, audit: the advisory service is not reachable from the sandbox), `e2e-preflight` (cache, install, parity: compares migrations with ethio-staging through credentials the script never holds), `e2e` (six artifact steps: merge the browser lanes' artifacts from GitHub), `promote` (four steps: only CI promotes), `bundle-budget › Install dependencies`, `semgrep › Upload SARIF` and `› Warn` (GitHub-only). The NEAR band: `0 NEAR`.
- `bun run build && node scripts/check-bundle-size.mjs`: `Bundle budget OK.` after the two ceilings of §10.
- `bun scripts/brief/check-go.ts docs/governance/briefs/f1-doors-5a.md --at bdb2fc555c04ea6a1ad65ba96ccc89e6ad4840ee`: `[check-go] no finding`.
- Browser check by id (on `9ee24b501`), `bun run e2e:local -- <the seven spec files> --grep "(ML-1|ML-2|ML-3|ML-6|ML-12|ML-13|MLA-8|MLA-10|LDR-2|PR-7|AL-8|AL-29|AU-5|CG-1) " --project=mobile-360 --project=desktop-1280 --retries=0` (the E2E values were set: names only tested; ethio-staging holds every mark of this turn through `20261116031300`, per ruling 3): `28 passed (2.7m)` (14 ids × 2 projects). The two `[ssr-error]` lines of the run are both `/api/listings/draft rateLimited` (PR-7, once per project: `doorCall` logs a shelled refusal, §13); no other server error line. No spec file ran whole. After ruling 4: `--grep "(PR-7|PR-15|ML-2) "` in both projects: `6 passed (25.7s)`, and the run printed NO `[ssr-error]` line (PR-7's two lines of the first run are gone).
- `door.test.ts` DC-2 (changed): a code (`notReady:photos`, `rateLimited`, `notYourListing`, `other`) reaches the client as its reason and writes no log line; a sentence (`an unexpected sentence`) is logged whole and answers `doorError`; a constraint's name is carried as detail; `translate` answers first and unlogged; a `null` from `translate` leaves a code to the fallback. Red-first for ruling 4 is the run's census itself: CI's 7 `[ssr-error]` lines on `/api/listings/draft` (§11); the unit case, run against `doorCall` as it stood at `9ee24b501`, FAILS (`AssertionError: notReady:photos: expected [ '/api/x notReady:photos' ] to deeply equal []`) and passes on `d50825beb`.
- Red-first: this turn fixes no defect that needs it; the reds the stop named are the first push's own (§11) and the changed specs failed on 43788920521 for the reasons ruling 3 §3 classifies.

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "as unknown as" src/routes/api/listings src/features/posting src/features/my-listings`; `rg -n "as (SubmitArgs|IdentityArgs|ResidencyArgs)" src`; `rg -n 'includes\("(not your listing|…)' src`; `rg -n "translate" src/routes/api src/server`; `rg -n '"rate"' src`; `rg -n "isDeactivatedRefusal"`.
- `src/routes/api/listings/identity.ts:205`, `draft.ts:132`, `draft.ts:162`: one direct `as <Args>` narrowing each, over a `DoorArgs<…>` object. No server-side helper sends null arguments, and `src/lib/supabase-door.ts` is outside SCOPE: F1-7 ("types every door call's Result") owns the helper.
- `src/features/posting/posting-service.ts:353` and `src/features/my-listings/my-listing.ts:81`: `my_listing_private` / `my_listing` still raise the sentence `not your listing` (doors of another family); left.
- `src/features/auth/deactivated.ts:38`: `isDeactivatedRefusal` reads a sentence and has no non-test caller (the census's finding); left.
- `src/routes/api/media/photo-links.ts:74`, `background.ts:94`, `assist.ts`, `upload/photo.ts`: the routes' own dial refusals (`field:"rate"`) are not a door's: they stay.
- `src/features/my-listings/promote-sheet.tsx`: its CF-FORM-3 line in `scripts/conformance/forms-allowlist.txt` still stands (outside this turn's reading).

## 7. Allowlists and guards

- `scripts/conformance/door-args-allowlist.txt`: 4 → 1 lines (the three posting lines gone; `src/server/supabase/user-client.ts:318 | … | INC-942` remains for F1-7).
- `scripts/conformance/forms-allowlist.txt`: 72 → 70 lines (`CF-FORM-3` for `my-listing.ts` and `promote-service.ts` gone: both mappers now read through `readRefusal`; `forms.test.ts` failed on the stale lines until they were removed).
- `scripts/route-budgets.mjs`: two ceilings (§10). No new allowlist line, no new guard in this half; the first chat's `grant-dropped` finding kind (DOORS-10's planted fixtures) is proven by `check-doors`' self-test: `9 finding kinds fired on their planted fixtures` (stop 3's run); CF-DOOR-ARGS's own planted casts run in `scripts` (green).

## 8. Strings

None — no key is added or changed (the readers map to keys that exist). `bun run i18n:usage` after STEP 3 left both maps byte-equal. No Amharic written.

## 9. Migrations

The fifteen files are the first chat's, applied on ethio-staging by the operator and read back by the supervisor (ruling 3: CLEAN). Not edited here. Their md5 table and proofs are in `f1-doors-5a.stop-3.md`. This chat did NOT run `bun run db:proof` (no SQL changed; Docker not started); the first chat's last line on these files: `db:proof PASS — applied 499/499, CLI 2.120.0, cold, 54 s`.

| File | sha256 | Mark |
|---|---|---|
| `20261115203000_986fbe0b-2896-4dc1-8c8f-3673b90130f4.sql` | `446b6792fd5a95d4946a679c13b3b9607d37d543c90261a6f9e50682180212f6` | `20261115220000` |
| `20261115203100_7603ae36-8661-444c-ab52-4d57c960ed42.sql` | `2f1ff3a6492adcdd2014ab351151303643758b9506f009273be646d4a6252816` | `20261116030000` |
| `20261115203200_097f9087-016b-4872-b29a-9b88fe076acb.sql` | `8839d6ee89cd86a45ded162ffb014b560d5d7113c0da596efef9c15fb4bd3a49` | `20261116030100` |
| `20261115203300_8ab7c960-9744-4017-a6e9-208155eccc58.sql` | `f075733faaf78e854819d901526ec06aa97ef516680286763c1336ffb3258b03` | `20261116030200` |
| `20261115203400_c0d42dfb-628a-468a-9e0a-5da6d5de30c6.sql` | `8b680684407f8f2c70318eb72a65408cc66179d5c78df3d09fdc94b7332a32eb` | `20261116030300` |
| `20261115203500_61e4e66b-b39b-4644-b25a-179284db7406.sql` | `7feabb27503cbfee4ea701b727bd55b328cf14eb24f8339cfcdf43191d9229e1` | `20261116030400` |
| `20261115203600_538bb297-4aee-455b-b147-34a6188e261d.sql` | `51dab6d92aae2c02cd8770e712d7429ded81f40473f995d762ed9ed3a4cbab69` | `20261116030500` |
| `20261115203700_3e9620aa-fd11-40d9-9b50-7f766c838db9.sql` | `10d26765ab2410ce77e4c3fb8b5bc0f94cef1da7e628f61d416d292bc026dd39` | `20261116030600` |
| `20261115203800_c57c863c-b032-4ed8-a6a6-fd3e6ebab4c7.sql` | `3403fb66718eb6dfd82c0b423a5a23b729ce7ef0551b71ffaee43062743ba8bd` | `20261116030700` |
| `20261115203900_cf5771ed-622d-47a3-a7b4-cbc76afa1bd6.sql` | `621f62df4a6103432410ae361e48d3c3045364da81f9d098f670ddb1e5418817` | `20261116030800` |
| `20261115204000_5cf2054f-b6e7-4140-a187-6d0ec7a419dd.sql` | `d1b04c24f1d2b0d8c2ff8f99a7ba911f80abd2e0a5c7f31950b847e684e45f38` | `20261116030900` |
| `20261115204100_67fc3a41-23b6-4508-b4f5-5eb41cd35ff9.sql` | `16926d3bb0393bd1e0ce30df2346e7b687f932eb16505ed9201c9cb49463c73d` | `20261116031000` |
| `20261115204200_236752a6-ebc4-47b4-9886-6b6e8ac78c26.sql` | `7f6e2913cb8a32aca5761aee49e684add04c8b562ac7f163ff8ef2da7ca5ffc0` | `20261116031100` |
| `20261115204300_5f6de283-a975-4d85-9318-1b8ae1d7a897.sql` | `dc142471b98da92e00b10419e8543bf7de0b0f57f208db235a3427d653dc5ef7` | `20261116031200` |
| `20261115204400_8c921ada-9ab3-4ea8-827f-3b2a9e1a485a.sql` | `ee5edf38ace98f9f2a8f76566879a4ff2cba125c98d4fea6b52c908458fec3bf` | `20261116031300` |

For ethio-prod after the merge, in this order:

```
apply 986fbe0b → expect mark 20261115220000
apply 7603ae36 → expect mark 20261116030000
apply 097f9087 → expect mark 20261116030100
apply 8ab7c960 → expect mark 20261116030200
apply c0d42dfb → expect mark 20261116030300
apply 61e4e66b → expect mark 20261116030400
apply 538bb297 → expect mark 20261116030500
apply 3e9620aa → expect mark 20261116030600
apply c57c863c → expect mark 20261116030700
apply cf5771ed → expect mark 20261116030800
apply 5cf2054f → expect mark 20261116030900
apply 67fc3a41 → expect mark 20261116031000
apply 236752a6 → expect mark 20261116031100
apply 5f6de283 → expect mark 20261116031200
apply 8c921ada → expect mark 20261116031300
```

## 10. Departures

- The ceilings: `scripts/route-budgets.mjs` moved in their OWN commit (`9ee24b501`), not in STEP 3's, because the cause appeared at the gate (step 6), after STEP 3 was committed and before any push: rule 00 step 4 names this form ("one ceilings commit before the push"). The cause, chunk by chunk (gzip): `refusal-text.js` (+1.36 KiB, the posting doors' words) joins the first download of `/admin/listings` and `/my-listings_/$listingId` — `posting-service.ts` now imports `isRateRefusal` from it; every other chunk of the two closures moves within ±0.04 KiB (measured by `scripts/bundle-closure.mjs`'s closure over the base build `4d12b471f` copied to `/tmp/ethio-scratch/f1-doors-5a/base/` — the operator's to remove — and over this tree). Pages before → after, local build KiB: `/admin/listings` 348.1 → 349.5 (ceiling 349 → 350 = `ceilingForLocal(349.5)`); `/admin/listings_/$listingId` 352.6 → 352.7 (inside the band of 353; 353 → 354 = `ceilingForLocal(352.7)`); `/my-listings_/$listingId` 319.8 → 321.2 (ceiling 323 holds, 1.8 clear); every other page +0.1 or 0 (e.g. `/` 224.9 → 225.0, `/post` 403.0 → 403.1, `/my-listings` 311.0 → 311.1, `/admin/screening` 369.1 → 369.2); the entry JS 203.7 → 203.7, CSS 22.6 → 22.6. `0 NEAR` after the two moves. Decision named: keeping `isRateRefusal` on `readRefusal` (ruling 3 §5: moves unless the plan finds a reason) costs 1.4 KiB on two pages that never draw the words; the alternative, a one-word family local to `posting-service.ts`, would be a second local vocabulary (K1). The supervisor may rule it back.
- DECIDE-AND-NAME: (1) the posting schema reader moves onto `readRefusal` through `isRateRefusal` (no reason found to leave it; the message `rateLimited` of the shell's error is read in the draft family's words). (2) `pinAnswer` (`posting-service.ts`) left as it is: it reads a returned envelope, not an error. (3) The three argument objects are typed with `DoorArgs` and narrowed with one assertion each, because `supabase-door.ts` is outside SCOPE (§6). (4) `z.json()` for the two JSON body keys. (5) MLA-10 and PR-21 are not edited (§5).
- RULING 4's change (the supervisor's, in scope by that ruling): `src/server/door.ts` and `src/server/door.test.ts` (and `docs/features/routes.md`, the standing allowance). One difference from the ruling's words, named: the ruling says a message that matches `REASON_CODE` (`src/lib/door-error.ts`) answers without the log; that regex is not exported and `door-error.ts` is not in the ruling's files, so `doorCall` asks `doorRefusal` itself — `doorRefusal` keeps a message whole as the reason exactly when it matches `REASON_CODE` — and treats a refusal whose reason equals the trimmed message as a code. The two are the same test; no file outside the ruling changed.
- The rulings of the turn: ruling 1 (the four e2e ids outside SCOPE; DEC-391; `transition_listing`'s class), ruling 2 (grants guard, DEC-392), ruling 3 (this chat's: usage maps first; PR-7 and MLA-10 joined; `translate` never swallows a code; INC-1170 widened), ruling 4 (TR-14 is not this turn's, no re-run; `doorCall` logs no door code). Each is applied as worded, ruling 4 with the one difference above.
- Between the production apply and the next Publish the published seller screens may draw the generic line for a refusal of this family (the published client still reads sentences): expected, §12.

## 11. CI

- The base's CI (`bdb2fc555`), `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`: `Commit: bdb2fc555c04ea6a1ad65ba96ccc89e6ad4840ee` · `Conclusion: **SUCCESS**` · `Completed (UTC): 2026-11-15T19:38:27Z` · `Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43753052995`. Two-step check: success, and the commit equals `origin/dev` (`git rev-parse origin/dev` = `bdb2fc555…`, unmoved, so no file of this lane changed on dev).
- Earlier run of this lane, `4d12b471f`: run 43788920521 FAILURE, classified by ruling 3 §3: (a) `E2E preflight` STAGING BEHIND (the operator applied the marks); (guard) `i18n used-on map is fresh` (INC-1172) — fixed in `12b354532` at its root (both maps regenerated); (lanes) the expected reds (ML-1/2/3/6/12/13, MLA-8, LDR-2, AL-8, AL-29, AU-5, CG-1) plus PR-7 and MLA-10 — fixed by STEPS 3 and 4; the `[client-error] HTTP 400` lines were the harness's capture of the shell's status codes.
- The FIRST push's run, https://github.com/tesfayekb/ethio-marketplace/actions/runs/43797120892 (the pull request's merge commit `88e6f6c7c9512942fa1d82691ef3d163e45eb86f` of `9ee24b501`; `ci-evidence` `branches/cursor/f1-doors-5a/e2e-last-failure.md`): 41 checks pass, 1 skipped (promote), 2 fail — `E2E (Playwright, ethio-staging)` (the verdict of the lanes) and `E2E lanes / Lane 5`. `Passed: 2673 · Skipped: 360 · Failed: 1`. The one failing test is `admin-translations-data.spec.ts › TR-14 the Data scope edits and approves a location name` on `desktop-1280` (shard 5; `Expected: "edited:…" Received: "none:"` at `:211`, the poll of `entity_translations`; both attempts). Class (rule 40): not infrastructure, not a red the task named; it names no path this turn changed (`rg -c "entity_translations|admin_upsert_entity"` over the fifteen migrations: no hit; `git diff --name-only` holds no admin-translations file). The spec has the same shape in the flake ledger (TR-14 on `desktop-1280`, 2026-09-15, `expect(received).toBe(expected)`; TR-26 of the same spec and shard, 2026-11-15, run 43666982893 on `cursor/f1-doors-4a`). No re-run was made: rule 40 allows a re-run for infrastructure (b) and cancelled runs (d) only; ruling 4 confirms it is not this turn's and forbids one. The `[ssr-error]` census of the run lists, off the allowlist (non-gating): `notYourListing` ×5 (shards 2, 3, 12: `/api/listings/draft notYourListing`) and `rateLimited` ×2 (shard 2) — the shelled refusals `doorCall` logs (§13).
- This push's run (the SECOND push of the turn: the code `d50825beb` and this report, `f1-doors-5a: report`, in one push as ruling 4 words it): its completed run is read after the push and stated in the chat and in the pull request's comment, not in this file — a file cannot name the run of the commit that contains it. If TR-14 is red again on it, the turn stops and says so (ruling 4); no re-run.

## 12. Limits

- The browser check ran the 14 ids in both Chromium projects only; no webkit project (the task adds no `@webkit` id); every other spec is CI's proof, and the repeat lane (DEC-283) repeats the changed specs that fit its budget.
- I did not run `bun run db:proof` here (no SQL changed); the migrations' proofs are the first chat's. I did not read production in any way and no staging write other than the browser tests' own scratch rows.
- `dependency-audit` and the staging preflight could not run on this computer (named in §5); CI is their proof. The `[ssr-error]` count of the first gate (2 lines) is from the local E2E run only; CI's census of the first push (7 lines) is the full count and ruling 4 removed their cause.
- Until the next Publish, the published seller screens read sentences from the database that now answer codes: they draw the generic line for a refusal of this family (the brief's tolerance; not a red).
- TR-14 (`admin-translations-data.spec.ts`, `desktop-1280`, shard 5) failed on the first push's run 43797120892 and is NOT this turn's (ruling 4): no path the turn changed names it, it passed on `mobile-360`, and the flake ledger holds it. Ledger lines (`git show origin/ci-evidence:docs/tracking/flake-ledger.md`, lines 310, 314, 611 for TR-14; 1392 for TR-26 of the same console):
  - 2026-09-15 · `desktop-1280` · admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name · source `shard 5` · run https://github.com/tesfayekb/ethio-marketplace/actions/runs/35013925918 · commit `aa75fd56e42b1dd7279964f8f2375bbd2f783583` · Er
  - 2026-09-15 · `desktop-1280` · admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name · source `shard 5` · run https://github.com/tesfayekb/ethio-marketplace/actions/runs/35025336718 · commit `a4f09d3e1a4837f1b273f951b2306b6bd2baec54` · Er
  - 2026-09-27 · `mobile-360` · admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name · source `shard 2` · run https://github.com/tesfayekb/ethio-marketplace/actions/runs/36283321647 · commit `21a430a3557f825d301d4e9004bf785fbe97eb95` · Erro
  - 2026-11-15 · `desktop-1280` · admin-translations-data.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name · source `shard 5` · run https://github.com/tesfayekb/ethio-marketplace/actions/runs/43666982893 · commit `5895500bda368c4493474ca2a97fc0f4a03dc6
  It was not re-run (rule 40, ruling 4); CI judges on this push, and if TR-14 is red again on it the turn stops and says so.
- The first-download numbers are from a LOCAL build (the CI build reads about 0.1 KiB more; the ceilings use `ceilingForLocal`).

## 13. Findings

- `src/server/door.ts` (`doorCall`): the first push's census (DEC-083) listed `[ssr-error] /api/listings/draft` for `notYourListing` ×5 and `rateLimited` ×2, because `doorCall` logged every message no `translate` mapped and ruling 3 §4 made the family's `translate` answer `null` for a door's code. FIXED by ruling 4 (`d50825beb`, §10): a door's code is no server error (INC-368).
- `identity.ts:205`, `draft.ts:132`, `draft.ts:162`: the three `as <Args>` narrowings (§6); F1-7.
- `refusal-text.js` weight on two admin pages for one word (§10); a split of the draft family's one `rateLimited` word from its map would remove it (a K1 decision for the supervisor).
- `src/features/auth/deactivated.ts:38` `isDeactivatedRefusal`: no non-test caller and it reads the sentence the doors no longer raise — dead code with a test; the census named it.
- INC-1172 says `bun run checks` does not run the usage map; on this tree its output listed `i18n-usage-map › Regenerate the map` and `› Assert no drift` as PASS inside the fast line. The supervisor reads `scripts/ci/turn-checks.sh` against the text of INC-1172 before the records turn lands it.
- A security read: none. The routes' bodies stay `.strict()`; no provider or Postgres text reaches a client (`doorRefusal` keeps a code, and a sentence becomes `doorError`); no secret in the diff (`git diff --cached` read before each commit; the one `GEMINI_API_KEY` hit is a test's unchanged `test-key` line in a context line, not added).

## 14. Records

DEC — status line: turn F1-5a BUILT — the seller's posting doors on `door_context` and the shell [`check_seller_alias`, `clear_seller_place`, `copy_my_listing`, `edit_my_listing`, `get_attribute_options`, `get_posting_schema`, `mark_sold`, `move_listing_photo`, `publish_listing`, `remove_listing_photo`, `renew_listing`, `resume_listing`, `save_posting_identity`, `save_seller_place`, `set_cover_photo`, `set_listing_level`, `set_listing_pin`, `set_listing_photos_soon`, `set_listing_reach`, `set_listing_reserved`, `submit_listing`, `suggest_seller_aliases`, `transition_listing` (with its core `transition_listing_core`)]; the owner class proven [each part's gate, ownership and no-trace checks, stop 3 §The proofs]; their refusals as codes [`notYourListing`, `listingNotFound`, `notLive`, `illegalTransition`, `ownerOnly`, `inReview`, `renewFirst`, `nothingChanged`, `notEditable`, `badShape`, `draftNotEdited`, `listingNotEditable`, `notCopied`, `ownerDeleted`, `enforcementOnly`, `severeRestore`, `severeRemove`, `accountDeactivated`, `rateLimited`, … — the census lists each by door]; [`transition_listing`: `void` → `jsonb`]; the migration files [the fifteen of §9] with the marks [`20261115220000`, then `20261116030000` to `20261116031300`]; the grants guard `grant-dropped` [DOORS-10's planted proof; `check-doors` self-test: 9 finding kinds fired on their planted fixtures]; the answer reader in [`src/lib/answered-id.ts`] with the six ceilings [`/admin/audit` 296 → 295, `/admin/impersonation_/$sessionId` 294 → 293, `/admin/roles` 295 → 294, `/admin/translations` 306 → 305, `/admin/translations_/$lang` 310 → 308, `/admin/users` 294 → 293]; the client in the second chat: `actionErrorKey`, `promoteRefusalKey` and the schema reader on `readRefusal`, `draft.ts`'s `translate` answering null for an unmapped message, two ceilings (`/admin/listings` 349 → 350, `/admin/listings_/$listingId` 353 → 354); `doorCall` answers a door's machine code without a log line (ruling 4).
INC — status line: INC-942 CLOSED for the posting routes in F1-5a — the three casts of `draft.ts` and `identity.ts` are gone; CF-DOOR-ARGS's allowlist holds [`user-client.ts:318` (F1-7)] alone.
INC — status line: INC-1158, the same class in this family — [`transition_listing`: class `staff` → `owner` (ruling 1 §3); the dial cells unchanged; four bodies (`move_listing_photo`, `set_cover_photo`, `resume_listing`, `clear_seller_place`) gain or move the dial their line names (ruling 1 §8), each with its `cell-meaning` sentence in `f1-doors-5a.stop-3.md` §The cells]; found by the supervisor's read of the live bodies before the GO and by the census.
register row — the doors' row gains "the seller's posting doors on the shell (F1-5a); the finding kind `grant-dropped`"; a new row: "a door's `{ok:true, id}` answer is read once" → `src/lib/answered-id.ts` → `src/lib/answered-id.test.ts` (AWI-1, AWI-2) → exceptions: none; the row "a door's optional argument" reads: exceptions `src/server/supabase/user-client.ts:318` (F1-7).
changelog — 2026-11-1x turn F1-5a (Opus 5.5 and Sonnet 5.5): the seller's posting doors on the door mechanism — one gate in one order with ownership inside it, refusals as codes, the routes and the wizard through the one reader; a dropped function's grants restated by a guard; the door answer reader in `src/lib`, six staff pages lighter.
roadmap — the Foundations 1 line gains "F1-5a DONE (pull request #50, marks 20261115220000 and 20261116030000 to 20261116031300)"; LEFT: F1-6 (the staff move's and the reviewer's decisions), F1-7 (`door_context`'s `rateLimited` reset time; every door call's `Result` typed; the three argument assertions of §13).

From ruling 1 (word for word):
DEC-391 — status line: BUILT in F1-5a — every owner door answers `notYourListing` for a row the caller does not own, whether or not it exists [the doors that changed from `listingNotFound`, by name]; proven [the proofs' ids].
INC-1170 — status line: open; the identity route's `resets_at` dropped with the gate's detail-less `rateLimited` (F1-5a, ruling 1 §6); owner F1-7.
roadmap — under Foundations 1, F1-6: "The staff move's and the reviewer's decisions spend `staff_moderation`, not the seller's `revise` (F1-5a, ruling 1 §4, §5)."
roadmap — under Foundations 1, F1-7: "`door_context`'s `rateLimited` gains the reset time as its detail, and the words draw it (INC-1170)."
roadmap — under the rules turns: "GO template — a door turn's SCOPE names every spec that reads a folded sentence, wherever it sits (F1-5a, ruling 1 PREVENTION)."

From ruling 2 (word for word):
INC-1171 — the service role's EXECUTE on `admin_list_translations` (lost 2026-09-01, `20260901234603`) and `admin_upsert_language` (lost 2026-11-14, F1-3, `20261114114100`) was dropped by a DROP + CREATE that restated only `authenticated`; found by F1-5a's `grant-dropped` guard on its first run over the tree; no caller used it; restored by F1-5a's first migration file (DEC-392). Class: a dropped function's grants not restated (F1-4b, ruling 1, PREVENTION (1)); the guard now judges the result over the whole history and the file from floor 20261115000000.
DEC-392 — status line: BUILT in F1-5a — the two lost service-role grants restored [the file, its mark]; `grant-dropped` judges the result and the file [DOORS-10's fixtures].
register row — the doors' row (`check-doors`) gains "`grant-dropped`: the result over the whole history; the file from floor 20261115000000 (F1-5a, ruling 2)".

From ruling 4 (the supervisor's, in the chat):
ruling 4: a door code is never logged as a server error — doorCall, F1-5a.

From ruling 3 (word for word):
INC-1172 — the usage-map guard (`i18n used-on map is fresh`) red on F1-5a's push 4d12b471f: `src/lib/answered-id.ts` (Part B) raised `docs/generated/i18n-usage.json`'s `scanned` from 726 to 727 and the maps were not regenerated; `bun run checks` (`scripts/ci/turn-checks.sh`) does not run the map and rule 10 binds the regeneration to a `t(` change only. Fixed in the second chat's first commit (both maps regenerated). Class: a gate that does not run a guard CI runs (mechanism: `scripts/ci/turn-checks.sh`); owner: the tests & CI turn adds the map step to the gate; the rules turn widens rule 10's sentence.
INC-1170 — amended (ruling 3 §7): the posting family's doors that returned `resets_at` on `rateLimited` — `save_posting_identity`, `save_seller_place`, `check_seller_alias`, `suggest_seller_aliases`, `submit_listing`, `publish_listing`, `set_listing_photos_soon` — answer the gate's detail-less `rateLimited` from F1-5a; no string draws the time today; PR-7's `detail` assertion (`e2e/posting-routes.spec.ts`, "the refusal names WHEN it lifts") is removed with this number and restored by F1-7, where `door_context`'s `rateLimited` gains the reset time as its detail.
roadmap — under the tests & CI turn: "`scripts/ci/turn-checks.sh` runs `bun run i18n:usage` and diffs both maps (INC-1172, F1-5a ruling 3)."
roadmap — under the rules turns: "rule 10: the usage maps are regenerated after any source file is added, deleted or moved, not only after a `t(` change (INC-1172)."
roadmap — under the rules turns: "GO template, census item `old-file-readers`: the shape keys of every answer whose shape changes, by door name, each hit a test id (F1-5a ruling 3 PREVENTION (2))."
