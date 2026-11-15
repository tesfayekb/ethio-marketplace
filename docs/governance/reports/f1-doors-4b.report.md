# f1-doors-4b: locations and countries on the door mechanism — report

Base: 51a99915d4e15fe038c57c19676c01e810d80f33 · Final commit: cc15ed4fc369cb5b8b7f0d0eff3fdc1325a545e6 · Brief: docs/governance/briefs/f1-doors-4b.md (the task file; ruling 1 saved bare at docs/governance/briefs/f1-doors-4b-ruling-1.md, sha256 28c5097545ac60fdb005cf22ec72f64ba92a6d3608d5cb61d001558647415005, compared equal before the commit)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on cc15ed4

CI at the start of this chat: the lane's `branches/cursor/f1-doors-4b/ci-status.md` reads commit `20cc752b3`, **SUCCESS**, completed 2026-11-15T13:48:43Z, run 43719626158; the base's root `ci-status.md` reads `51a99915d`, **SUCCESS**, 2026-11-15T11:13:21Z, run 43707417337 (two-step check: each file's commit is the commit it was read for).

This report covers STEPS 3 to 7 (the new chat, ruling 1). STEPS 0 to 2 (the task, the census, the nine migration files) are the migration chat's: `docs/governance/reports/f1-doors-4b.census.md` and `f1-doors-4b.stop-1.md`. No SQL was written here and no migration file was added, edited or removed (`git diff --stat aee3fcca0..HEAD -- supabase` prints nothing).

## 1. Done / not done, by part and step

- Ruling 1 saved and the types patch applied, one commit (`5d902086c`): `git apply` of `f1-doors-4b-types.patch`, eight `Returns` become `Json`; typecheck agreed with the patch (no finding).
- STEP 3, the client (`235c0530e`): the places and markets services call their doors through `rpc()` with `DoorArgs`; `admin_upsert_location`'s `{ok:true,id}` is read through `answeredId`; each console reads every refusal through `readRefusal` with its own words (`location-refusals.ts`, `country-refusals.ts`); the mappers left; the import relay and the export reader lose the sentence rows only this family's doors answered; CF-DOOR-ARGS widened; the forms allowlist's six mapper lines left; 21 place-refusal strings moved to the admin layer (guard-demanded); both i18n usage maps regenerated; the five feature docs updated.
- STEP 4, the tests: the family's unit tests rode in the STEP 3 commit, because a commit is never red (each mapper's tests could not stay green after it left). The STEP 4 commit (`2341d8ac3`) is DOORS-6's fix at its cause (ruling item 5).
- STEP 5, the gate: done (section 5). A ceilings commit (`cc15ed4fc`) names its cause.
- Self-review (below, section 10), ONE push (`cc15ed4fc`), PR #46 marked ready.
- STEP 7: this report. STEP 6's CI wait: section 11.
- Not done: nothing the task asked is left. Items queued for later turns are in section 14.

## 2. Files changed

`git diff --name-only 51a99915d` (59 paths; the nine migrations, the manifest, the public-surface allowlist, `migration-reader.test.ts`, the census and stop report are the migration chat's):

```
docs/features/countries-console.md
docs/features/doors.md
docs/features/geography.md
docs/features/imports.md
docs/features/locations-console.md
docs/generated/i18n-usage.json
docs/governance/briefs/f1-doors-4b-ruling-1.md
docs/governance/briefs/f1-doors-4b.md
docs/governance/reports/f1-doors-4b.census.md
docs/governance/reports/f1-doors-4b.stop-1.md
public/i18n-usage.json
roadmap.md
scripts/conformance/door-args-allowlist.txt
scripts/conformance/door-args.test.ts
scripts/conformance/door-args.ts
scripts/conformance/forms-allowlist.txt
scripts/conformance/migration-reader.test.ts
scripts/doors/check-doors.test.ts
scripts/doors/columns.ts
scripts/doors/manifest.txt
scripts/doors/once.ts
scripts/doors/rows.ts
scripts/public-surface-allowlist.txt
scripts/route-budgets.mjs
src/features/admin-countries/countries-service.test.ts
src/features/admin-countries/countries-service.ts
src/features/admin-countries/country-dialog-state.ts
src/features/admin-countries/country-dialogs.test.tsx
src/features/admin-countries/country-dialogs.tsx
src/features/admin-countries/country-editor.tsx
src/features/admin-countries/country-refusals.test.tsx
src/features/admin-countries/country-refusals.ts
src/features/admin-countries/country-verb-dialogs.tsx
src/features/admin-locations/location-dialog-state.ts
src/features/admin-locations/location-dialogs.tsx
src/features/admin-locations/location-editor.tsx
src/features/admin-locations/location-refusals.test.tsx
src/features/admin-locations/location-refusals.ts
src/features/admin-locations/location-verb-dialogs.tsx
src/features/admin-locations/locations-service.test.ts
src/features/admin-locations/locations-service.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-member.ts
src/integrations/supabase/types.ts
src/server/imports/csv.test.ts
src/server/imports/csv.ts
src/server/imports/route.test.ts
src/server/imports/route.ts
supabase/migrations/20261115122700_e01def73-55a8-46af-8005-8e23cca46cb4.sql
supabase/migrations/20261115122800_89eaa5c9-b607-4e75-b716-63446701b640.sql
supabase/migrations/20261115122900_069b543e-ce16-488e-b552-d0913cdec3c9.sql
supabase/migrations/20261115123000_de287d18-3f2f-4480-967a-25e26911e76f.sql
supabase/migrations/20261115123100_c9452c23-ae90-4b60-9d85-1241b957ed58.sql
supabase/migrations/20261115123200_e0edb9a7-3e2d-4e53-b772-c5380267e940.sql
supabase/migrations/20261115123300_1b7d8f93-1641-4db8-9dff-a6b7ee8f9090.sql
supabase/migrations/20261115123400_33896921-d11c-46f8-95c3-205aa5a3af9c.sql
supabase/migrations/20261115123500_08f47ace-1f62-4009-97ba-6de04cfbdb6e.sql
```

New files of this chat (all in the list above; `git ls-files` proof: `git ls-files --error-unmatch` is satisfied by their commits): `scripts/doors/once.ts`, `src/features/admin-countries/{countries-service.test.ts, country-refusals.ts, country-refusals.test.tsx}`, `src/features/admin-locations/{location-refusals.ts, location-refusals.test.tsx}`, `docs/governance/briefs/f1-doors-4b-ruling-1.md`. No file was deleted. Every path is in the task's SCOPE or the standing allowance, except as named in section 10 (departures 5 and 6).

## 3. Behaviour contract — answer tables before → after

Every screen answer is today's except the numbered CHANGEs (ruling 1 item 4 and the task's STEP 3).

| Surface | Before | After |
|---|---|---|
| Places console, every refusal | the console's own mapper by id (`REFUSAL_IDS`, 18 ids) | `readRefusal` over `LOCATION_REFUSALS`: the same 18 ids, the same `admin.locations.error.<id>` lines; `permissionDenied[:scope]` → `denied`; the step-up sentence → `stepUp`; `rateLimited` → the shared line |
| Places console, an unrecognised message | `admin.locations.error.unknown` with the server's raw message beneath (`location-dialog-error-reason`) | `admin.locations.error.unknown` only; the raw text is never shown (ruling 1 item 4: "the generic fallback") — departure 3 |
| Places console, the ancestry trigger's seven plain sentences | mapper by message | read by the same reader through the error's own `message` (code `P0001`); proven id by id (LRF-2) |
| `retireInstead` | line + one of four detail lines | unchanged (LRF-3, each of the four details and an unknown detail) |
| Markets console, every refusal | `useCountryError` (`{refusal:{key,raw}}`, raw shown on unknown) | `useCountryRefusal` (`{message, clear, fail, render}`); eight ids and `permissionDenied`/step-up keep their lines; unknown → `admin.countries.error.unknown`, no raw text |
| `upsertLocation` | `data as string` | `answeredId("admin_upsert_location", data)`; an answer without `{ok:true, id}` throws |
| Location/country door calls | `supabase.rpc` with `as string` / `as unknown as` casts | `rpc()` with `DoorArgs`; the paged reader keeps one plain assertion (departure 2) |
| `admin_list_locations` arguments | sent `p_search:""`, `p_level:null`, `p_active:null` by cast | `p_search`, `p_level`, `p_active` omitted (their defaults are NULL; the body reads `p_search IS NULL OR p_search = ''` as none, `20261115123200_e0edb9a7…sql:86`) — same rows (LT lists passed) |
| Import relay, location commit/undo | sentences `import already running`, `batchAlreadyUndone`, `planHasRefusals`, `undoBlocked`, `unknown import batch`, `permission denied` rows | the shell's codes (`importRunning`, `planHasRefusals`, `unknownBatch`, `batchAlreadyUndone`, `undoBlocked:hasRows`, `permissionDenied[:scope]`) at 400 / 403 with their detail, read by `codedRefusal` (IMR-15) |
| Import relay, other sentences | `unknownParent: <slug>` key row → 409 | row gone: no function in the closure raises it as a sentence (section 4); a stray one is an incident `500` with no text (IMR-8) |
| `exportRefusal` | `permission denied` sentence → `forbidden` | the sentence is no longer answered (null → the route's own incident); the gate code `permissionDenied[:scope]` → `forbidden` (CSV-7) |
| `IMPORT_REFUSALS` | 9 rows | 3 rows: `step-up required`, `unknown category scope`, `unknown country scope` (the last two stay for F1-7, ruling 1 item 4) |
| Seven doors' return types in `types.ts` | `undefined` / `string` | `Json` (the supervisor's patch) |
| First download | — | named in section 5 (six admin pages +1.2 KiB) |

## 4. Censuses

- The relay and the export reader (ruling 1 item 4, third bullet). Command: `bun /tmp/ethio-scratch/f1-doors-4b/step3/relay-census.ts` (scratch, read only; it takes the last declarations from `scripts/doors/catalogue.ts`, follows every function name a body calls, comments stripped, from the import routes' doors — 11 roots, closure 75 functions — and the export readers — 3 roots, closure 23 — and greps each sentence). Hits, pasted:
  - `permission denied`, `import already running`, `unknown import batch`: no hit in either closure.
  - `batchAlreadyUndone`, `planHasRefusals`, `undoBlocked`: only `PERFORM public.door_refuse('…')` (a code), in `20261115123500_08f47ace…sql:63` and `:130` and `20261115123400_33896921…sql:55`; none as a sentence; the export closure: no hit.
  - `unknownParent`: `loc_import_plan` (`20260917205429…sql:270, 289, 292`) and `cat_import_plan` (`20261015012743…sql:230, 286, 460, 485`) as a plan's `'reason','unknownParent'` JSON; `admin_commit_category_import` (`20261115021800…sql:158`) as `door_refuse('unknownParent', v_sp)`, a code. No `RAISE` of the sentence or of `unknownParent: <slug>`.
  - Left standing, as the ruling says: `unknown category scope` (`attr_import_plan` `20261017092635…sql:192`, `attr_export_payload` `20261017091554…sql:276`, `cat_import_plan` `20261015012743…sql:108`, `admin_export_categories` `20261115023100…sql:227`), `unknown country scope` (`loc_import_plan` `20260917205429…sql:41`, `admin_export_locations` `20261115123300…sql:61`), and the gate's `step-up required` (`require_step_up_if_needed`, `20260817100845…sql:54, 61, 80`).
- The family's words, id by id (ruling 1 item 4, first bullet; "I checked this id by id"). `LRF-1` iterates each of the 18 ids of the old `REFUSAL_IDS` and asserts `branch === "family"` and the key `admin.locations.error.<id>`; `LRF-2` iterates the seven trigger ids (`rootMustBeCountry`, `badSlug`, `missingCoordinates`, `parentMissing`, `levelMismatch`, `crossCountry`, `parentInactive`) fed as `{message, code:"P0001"}`; `LRF-3` each of `retireInstead`'s four details; `KRF-1` each of the eight country ids. The exact key lists are asserted equal to `[...ids, "permissionDenied", "rateLimited"]`.
- Greps run, no leftovers: `rg -n "locationErrorKey|useLocationError|useCountryError|countryErrorKey|REFUSAL_IDS|LocationErrorLine|CountryErrorLine" src e2e scripts docs/features` — only `AI_REFUSAL_IDS` (`ai-service.ts:430,448`) and `COVERAGE_REFUSAL_IDS` (`coverage-console.md:158`), other families. `rg -n '\.rpc\("admin_…(location|country|countries|locations)' src` (non-test) — three direct `supabase.rpc` calls, all readers (section 6). `rg -n "location-dialog-error-reason" e2e src` — none (the testid left with the raw line).
- CF-DOOR-ARGS widened census (`scripts/conformance/door-args.ts`), findings under `src/`: `src/routes/api/listings/draft.ts:124, :133`, `src/routes/api/listings/identity.ts:188`, `src/server/supabase/user-client.ts:318` (section 7); the locations console's two are gone.
- The by-id e2e list: every id of the census's `tests` item (`LT-1…16` incl. `LT-7b`, `LT-9a`, `LT-9b`; `OV-1`; `CO-1…9`; `IG-1…6`) — section 5.

## 5. Tests

Ids added: `IMR-15` (the location import's codes at 400/403 with detail, commit and undo, no raw `details`/`hint`); `LRF-1…5` (`location-refusals.test.tsx`); `KRF-1…3` (`country-refusals.test.tsx`); `KSV-1, KSV-2` (`countries-service.test.ts`); `PL-4, PL-5` (`locations-service.test.ts`: NULLs as given, id from the answer, a write without one throws; each other door's arguments; a refusal thrown as it arrived); `DARGS-3` (a planted door argument cast through `unknown`, in a property and in a whole object, with the clean cases); `DOORS-9` (the tree is read once per root; a fresh read sees a changed root).
Ids changed, with reasons: `IMR-8` (the rows that left now answer a 500 with an incident and no text, for `unknownParent: shoes`, `permission denied`, `import already running`, `planHasRefusals`); `IMR-10` (drives the coded `importRunning`); `CSV-7` (the sentence branch left; the gate code stays `forbidden`); `PL-3` (the hook is `useLocationRefusal`; unknown → the generic line, no raw text); `DARGS-1` (its planted `p_level` cast now sits under a non-door key so DARGS-1 stays about `null`; the `p_` forms are DARGS-3); `DARGS-2` (no allowance of a family already on the shell); `DOORS-6, -7, -8` (a declared limit `TREE_READ_MS` with its cause, ruling item 5); `DOORS-4` (the same constant). One unnamed test, "reads a database refusal object by its own message" in `country-dialogs.test.tsx`, left with `useCountryError`; `KRF-3` replaces it.
Red-first: none owed (no defect fixed). The guard changes were proven on planted fixtures (DARGS-3, DOORS-9).
Unit totals (this tree): `bunx vitest run scripts --maxWorkers=2`: 120 files, 621 passed, 1 skipped; `bunx vitest run src --maxWorkers=3`: 384 files, 2561 passed. `bun run typecheck` and `bun run lint`: exit 0 on the final tree.
Gate (`bun run checks`, final tree `cc15ed4fc`): fast line `PASS laws-first › scripts/ tests first (INC-1030) (89s)`; last line `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 447s`. NOT RUN, each with its reason from the runner: `scope` (2: the Actions artifacts index — GitHub only), `build-and-check › Workflow lint` (the pinned actionlint is linux/x64; this is darwin/arm64) and `Install dependencies`, `component-tests › Install dependencies`, `secrets-scan › Secrets scan` (gitleaks is linux/x64), `dependency-audit` (2: the advisory service is not reachable from the sandbox), `e2e-preflight` (4: it compares migrations with ethio-staging through credentials the script never holds), `e2e` merge steps (6: GitHub artifacts), `promote` (2: only CI promotes), `semgrep › Upload SARIF` and its warning (GitHub only), and the install steps of the remaining jobs.
`bun scripts/brief/check-go.ts docs/governance/briefs/f1-doors-4b.md --at 51a99915d`: `[check-go] no finding`.
`bun run db:proof` and `bash scripts/check-migrations.sh`: not re-run here (no migration changed). The migration chat's line on `aee3fcca0`, whose migration files are byte-identical to `HEAD`'s: `db:proof PASS — applied 484/484, CLI 2.120.0, cold, 54 s`; `Migration guard OK.`
Browser, by id (the E2E values are set, ethio-staging holds the nine marks): `E2E_WORKERS=2 bun run e2e:local -- e2e/admin-locations.spec.ts e2e/admin-countries.spec.ts e2e/import-security.spec.ts --grep "\b(LT-([1-9]|1[0-6])[ab]?|OV-1|CO-[1-9]|IG-[1-6])\b" --project=mobile-360 --project=desktop-1280 --retries=0` → `90 passed (11.5m)`, `2 skipped` (the table twin and the card twin of `LT-` at `admin-locations.spec.ts:904` and `:923`, each skipped by its own `test.skip` in the project it does not apply to). `[e2e:teardown] transport retries this run: 0`. `[ssr-error]` lines: 54, all the import routes' own logged file-law refusals (`wrongFile`, `unknownColumn`, `nulByte`, `emptyFile`, `badHeader`, `tooManyRows`, `file too large`, on `/api/admin/{locations,countries,translations,attributes,categories}/import`); none of another kind. Every flow that chains `admin_upsert_location`'s id ran inside LT-1…16 and passed. J-audit: no file under `e2e/` changed. What CI proves instead: every other test in its lane, the repeat lane, WebKit.
First download (`bun run build && node scripts/check-bundle-size.mjs`; base built under `/tmp/ethio-scratch/f1-doors-4b/base` from `git archive 51a99915d`, lock-exact `bun install --frozen-lockfile`; the operator may remove it): entry JS 203.6 KiB, CSS 22.6 KiB — equal on both. Per page, base → mine (KiB, local, without the 0.1 allowance): the six pages below grew by one named cause; the rest moved by at most ±0.6.

| page | base | mine | ceiling |
|---|---|---|---|
| /admin/audit | 294.0 | 295.1 | 295 → 296 |
| /admin/impersonation_/$sessionId | 291.6 | 292.8 | 293 → 294 |
| /admin/roles | 292.9 | 294.1 | 294 → 295 |
| /admin/translations | 304.1 | 305.3 | 305 → 306 |
| /admin/translations_/$lang | 307.5 | 308.7 | 308 → 310 |
| /admin/users | 291.8 | 293.0 | 293 → 294 |
| /my-listings | 311.0 | 312.2 | 315 (room; unchanged) |

Cause, chunk by chunk (gzip bytes, base → mine, from `/tmp/ethio-scratch/f1-doors-4b/closure.mjs`): `locations-service.js` imports `answeredId` from `categories-service`, so `categories-service.js` 0 → 1567 B joins each of these seven pages that carried `locations-service.js` without it; the same chunk set loses `locations-service.js` 1937 → 1621 B (the mapper left) and `name-collator.js` 94 → 0 (merged); `index.js` +9 B; each other chunk ±1 to ±4 B. Net on those seven: +1.16 to +1.17 KiB. The pages that already carried `categories-service.js` went down (`/admin/locations` −0.56, `/admin/countries` −0.47, `/admin/ai` −0.35, …: `locations-service.js` −316 B, `use-countries.js` −186 B on the two consoles, `en-admin.js` +0.44, `am-admin.js` +0.37, `en-member.js` −0.47, `am-member.js` −0.56 for the 21 moved strings). Five pages crossed their ceilings; `/admin/impersonation_/$sessionId` sat inside the NEAR band. The ceilings follow DEC-296's `ceilingForLocal`, each with its cause written on its line, in the commit that causes them (`cc15ed4fc`); `node scripts/check-bundle-size.mjs` ends `Bundle budget OK.` and `bun run checks` reports `bundle-budget › the NEAR band (R4)  0 NEAR`.

## 6. K2 — siblings that bypass the mechanism

Greps: `rg -n "as unknown as" src --glob '!*.test.*'`; `rg -n '\.rpc\("admin_…(location|country…)' src`; `rg -n "permission denied|import already running|unknown import batch|unknownParent:|batchAlreadyUndone|planHasRefusals" src …`; the CF-DOOR-ARGS census.
- Door arguments cast through `unknown` (left; CF-DOOR-ARGS allowlist, section 7): `src/routes/api/listings/draft.ts:124` (`p_request_country`), `:133` (the submit door's whole argument object), `src/routes/api/listings/identity.ts:188` (the identity door's whole argument object), `src/server/supabase/user-client.ts:318` (`p_batch` of `import_gate_audit`).
- Sentence readers of other families: `src/features/admin-ai/ai-service.ts:439` (`permission denied`), `src/features/admin-monetisation/monetisation-service.ts:254`, `src/features/admin-listings/tier-reasons.ts:97`, `move-reasons.ts:63`; the forms allowlist's remaining CF-FORM-3 lines (their families' turns).
- Direct `supabase.rpc` of this family's readers (they raise, no shell; the typed Result of every door call is F1-7): `src/features/admin-countries/countries-service.ts:46` (`admin_list_countries`), `src/features/admin-locations/locations-service.ts:110` (`admin_list_locations`, the keyset read), `src/routes/api/admin/locations/export.ts:41-42` (`admin_export_locations`).
- The import dialogs' reason-key lists name `planHasRefusals`/`batchAlreadyUndone` (`location-import-dialog.tsx:57-58`, `country-import-dialog.tsx:37-38`): unchanged, they read codes already.

## 7. Allowlists and guards

- `scripts/conformance/forms-allowlist.txt`: 7 lines left (the six CF-FORM-3 mapper lines the ruling names — `countries-service.ts`, `country-dialog-state.ts`, `country-dialogs.tsx`, `location-dialog-state.ts`, `location-dialogs.tsx`, `locations-service.ts`); `CF-FORM-4 …/country-dialog-state.ts (1)` STAYS (`numberOrZero` is a sentinel parse the file still holds; I first removed it and the guard named it). CF-FORM-1 lines unchanged.
- `scripts/conformance/door-args-allowlist.txt`: 2 lines → 4. The locations console's two (`locations-service.ts:99`, `:100`) are gone. Four joined, each `until INC-942`: `draft.ts:124` and `:133`, `identity.ts:188` (reason: the posting doors move in F1-5a), `user-client.ts:318` (no family owns the import gate's audit call; F1-7 types every door call's Result — my assignment, departure 6).
- The CF-DOOR-ARGS rule: besides `null as unknown as T`, a door argument cast through `unknown` — a property the database names `p_…` whose value is cast, or an object literal holding such a property cast whole. `DARGS-1`, `-2`, `-3`.
- `scripts/doors/check-doors-allowlist.txt`: no line of this family, unchanged.
- Guard self-tests run: `check-doors` self-test (8 finding kinds fired on planted fixtures, clean pair none) and static: `check-doors static OK: 260 manifest lines reconcile with the migrations' catalogue` (the same line as before the DOORS-6 change); `forms.test.ts` 6 of 6; `door-args.test.ts` 3 of 3; `strings-layers.test.ts` (it demanded the move, section 8).
- `scripts/doors/once.ts` (new, tooling only): the migration tree's rows, the callers' tree text and the declared columns are read once per process for a root; `{ fresh: true }` asks again; `DOORS-9` proves both. It is not an app mechanism and has no register row.

## 8. Strings

No key was added or edited (the task and ruling 1 item 2: none). 21 keys MOVED from the member layer to the admin layer, in both languages, byte for byte (`en-member.ts` → `en-admin.ts`, `am-member.ts` → `am-admin.ts`), because `strings-layers.test.ts` demanded it once the refusal words reference them statically from `admin.places`; I verified each moved line set equal by `diff` of the removed and the added lines per language. Amharic text unchanged. English of each (Amharic is the moved line, unedited):

| key | English |
|---|---|
| `admin.locations.error.badLevel` | That level is not one of country, region, city or sub-city. |
| `admin.locations.error.badSlug` | That address is not usable. |
| `admin.locations.error.cannotMoveCountry` | A market's anchor cannot be moved. |
| `admin.locations.error.crossCountry` | A place cannot move to another market. |
| `admin.locations.error.denied` | You do not have permission to do that. |
| `admin.locations.error.isoOnRegionsOnly` | Only a region carries an ISO 3166-2 code. |
| `admin.locations.error.levelMismatch` | A place can only sit one level below the one holding it. |
| `admin.locations.error.locationMissing` | That place no longer exists. |
| `admin.locations.error.missingCoordinates` | A city and a sub-city both need a centre latitude and longitude. |
| `admin.locations.error.nameRequired` | A name is required. |
| `admin.locations.error.notAChild` | Those places do not all sit inside the same one. |
| `admin.locations.error.orderCountriesInProfile` | Markets are ordered in their own settings, not here. |
| `admin.locations.error.parentInactive` | Activate the place above it first. |
| `admin.locations.error.parentMissing` | The place it should sit inside no longer exists. |
| `admin.locations.error.retireInstead` | Retire this place instead of deleting it. |
| `admin.locations.error.rootMustBeCountry` | Only a market's anchor sits at the top. |
| `admin.locations.error.slugMismatch` | The address you typed does not match. |
| `admin.locations.error.stepUp` | Verify a code and try again. |
| `admin.locations.error.unknown` | That could not be saved. |
| `admin.locations.error.unknownCountry` | That market is not on record. |
| `admin.locations.error.useMoveDoor` | Use Move to change where a place sits. |

`bun run i18n:usage` run; both maps committed (`docs/generated/i18n-usage.json`, `public/i18n-usage.json`); `bun run e2e:local`'s `i18n:map-guard` printed `usage maps match the tree`. `undoBlocked` and `unknownBatch` still draw as the code on the import dialog's reason line (ruling item 2: their words are queued).

## 9. Migrations

None written here. The nine files and their marks, from the migration chat (sha256 prefixes recomputed here, all equal to the stop report's):

| file | sha256 (first 16) | mark | apply pairing line |
|---|---|---|---|
| `20261115122700_e01def73-…sql` | a56d6d159cca660e | 20261115150000 | apply e01def73 → expect mark 20261115150000 |
| `20261115122800_89eaa5c9-…sql` | b05e5199c87c0b4c | 20261115150100 | apply 89eaa5c9 → expect mark 20261115150100 |
| `20261115122900_069b543e-…sql` | 573c92a5c3756e57 | 20261115150200 | apply 069b543e → expect mark 20261115150200 |
| `20261115123000_de287d18-…sql` | 03e672d46cc176b8 | 20261115150300 | apply de287d18 → expect mark 20261115150300 |
| `20261115123100_c9452c23-…sql` | 648fb7ca7b1a529a | 20261115150400 | apply c9452c23 → expect mark 20261115150400 |
| `20261115123200_e0edb9a7-…sql` | 39d2be24040b973d | 20261115150500 | apply e0edb9a7 → expect mark 20261115150500 |
| `20261115123300_1b7d8f93-…sql` | 4694788417cf63f8 | 20261115150600 | apply 1b7d8f93 → expect mark 20261115150600 |
| `20261115123400_33896921-…sql` | aa838e5fef6efb99 | 20261115150700 | apply 33896921 → expect mark 20261115150700 |
| `20261115123500_08f47ace-…sql` | b6fae49d698716e5 | 20261115150800 | apply 08f47ace → expect mark 20261115150800 |

All nine are on ethio-staging (ruling 1 item 0). For ethio-prod, after the merge, the same nine pairing lines in the same order apply (the operator's; I never connect to production). The staging preflight is green for this push.

## 10. Departures

1. STEP 3 and STEP 4 commits: the family's unit tests (`IMR-8/10/15`, `CSV-7`, `PL-3/4/5`, `LRF-*`, `KRF-*`, `KSV-*`, `DARGS-*`) rode in the STEP 3 commit so that it is never red; the STEP 4 commit holds DOORS-6's fix. The two titles say what each holds. A third commit (`cc15ed4fc`) raises the six ceilings by DEC-296's form in the commit that names the cause.
2. `listLocations` keeps ONE plain assertion, `args as { p_country_code: string }` (not through `unknown`): keyset paging needs the client's query builder, which `rpc()` does not return, and the generated type declares the country non-null while the all-markets scope is NULL. The argument object is built as `DoorArgs<"admin_list_locations">`. Editing `src/lib/supabase-door.ts` to return a builder is outside SCOPE; the typed Result of door calls is F1-7's. The comment at the site says so.
3. The places console no longer shows the server's raw message beneath an unrecognised refusal (`location-dialog-error-reason` is gone; the markets console never had that line after the mapper's `raw`, now also gone). Ruling 1 item 4 names "the generic fallback". No e2e or unit test read the testid (`rg` in section 4).
4. What the import dialog's reason line shows (ruling decision 7) ("say in §10 what its reason line shows"): a commit or undo refused by the translation core's `permissionDenied` answers 403 `{error:"permissionDenied"}`; the dialog draws its denied line (`error.denied`, because `status === 403`), and the reason line below it shows the code as data, `permissionDenied` (`ADMIN_REFUSALS` holds only `rateLimited`, so the code is not translated there); with a tail it reads `permissionDenied — <detail>`. Nothing of the file stays (migration part 8, proof c).
5. `scripts/doors/columns.ts` and the new `scripts/doors/once.ts` are touched beside the `rows.ts` the ruling names: `declaredColumns` reads the whole migration tree too, and DOORS-4, -6 and `liveFindings` call it, so the "read once" rule needed it on the same helper. Named here as a mechanical edit the ruling's own change demands.
6. The CF-DOOR-ARGS widening needed a definition the task left to me ("by its definition"): a `p_…` property (the database's own parameter naming) cast through `unknown`, or an object holding one cast whole. The four sites outside the family and their owners are my assignment: `draft.ts` and `identity.ts` → F1-5a (the posting doors, `docs/governance/reports/f1-doors.stop-1.md` §F1-5a), `user-client.ts:318` → F1-7 (no family owns `import_gate_audit`). The supervisor may rule otherwise.
7. `bunx playwright install chromium` was run once: the resolved browser path was missing (`[e2e:browser-guard]` named it; the allowed remedy 1).
8. `IMPORT_REFUSALS`' type became a union of the two kinds that remain (`exact` 404, `stepUp` 428); `forbidden` joined `IMPORT_WORDS` because the export reader's own word is still answered (IMD-6 reads the declared words).

Self-review (rule 80, whole diff `51a99915d..HEAD`, read heading by heading): (1) SCOPE — every path in section 2 is in SCOPE or the allowance; departures 5 and 6 named. (2) BEHAVIOUR — section 3 lists every difference; the only unnamed-by-the-brief one is departure 3, by the ruling's words. (3) BANNED PATTERNS — `rg` over the diff's added lines for `as unknown as`, `any`, `!`, `@ts-`, `waitForTimeout`, `.only(`, `.first()`, `?? 0`, `?? 'ET'`: the only `as unknown as` are planted fixture text in `door-args.test.ts` (strings), none in code; no secret (`git diff --cached` read before each commit; the word `secret` appears only as a planted value in `route.test.ts` proving no `hint` text reaches an answer). (4) ONE MECHANISM — the one reader, `rpc()`, `answeredId`; no second mapper; siblings in section 6; no new app mechanism (the `once.ts` helper is tooling, covered by DOORS-9). (5) TESTS — each refusal test proves the id's line and the no-raw-text rule; IMR-15 proves no `details`/`hint` reaches an answer and no refresh runs; changed assertions listed in section 5. (6) MIGRATIONS — none written here. (7) DOCS — five feature docs updated; allowlist lines carry reason and until; no deletion; both maps regenerated; section 13 below. (8) SECURITY — no input is newly accepted; every client-visible refusal is a code or a translated key; nothing unfixed is described.
Findings: MINOR 1 — departure 2's one plain assertion. MINOR 2 — departure 3's behaviour change by ruling. MINOR 3 — departure 5's `columns.ts`/`once.ts`.

## 11. CI

- Base (dev `51a99915d`): the first six lines of the root `ci-status.md`: `# CI Status`, ``Commit: `51a99915d4e15fe038c57c19676c01e810d80f33` (short `51a9991`)``, `Conclusion: **SUCCESS**`, `Completed (UTC): 2026-11-15T11:13:21Z`, `Run: …/runs/43707417337`, `Lanes: skipped — the code tree was proven by run 43680415324 (pull_request, cursor/f1-doors-4a, head 680f45c)`; the commit equals the base.
- Earlier reds of this lane (the migration chat's, from its stop report): the first push (`6418cdd`, run 43715579662) had two reds — the staging preflight (`STAGING BEHIND`, expected after a migration stop) and `DOORS-6`'s 5 s timeout (fixed here at its cause in `2341d8ac3`). The lane's newest completed run before this push, `20cc752b3`, run 43719626158: **SUCCESS**.
- This push (`cc15ed4fc`): the pull request's checks are listed under "CI result" below once the run completes.

CI result: run https://github.com/tesfayekb/ethio-marketplace/actions/runs/43725448205 on `cc15ed4fc369cb5b8b7f0d0eff3fdc1325a545e6` (my last code commit): conclusion SUCCESS (ci-evidence `branches/cursor/f1-doors-4b/ci-status.md`, completed 2026-11-15T14:50:49Z); every check on the pull request passed, including all 16 numbered lanes plus smoke, email, webkit and repeat; "Promote to main" skipped, as it does on a pull request. Lanes line: "ran — no proven code tree" (no earlier green run held this tree, so every lane ran).

## 12. Limits

- Not run here: the browser lanes other than the by-id run above (CI proves them), WebKit, the repeat lane, `actionlint`, `gitleaks`, the dependency audit and the staging preflight (the `bun run checks` NOT RUNs in section 5), `bun run db:proof` (no migration changed; the migration chat's line is quoted in section 5, not claimed as run here).
- Codes the migration's proofs do not drive (decision 13, accepted): `retireInstead:hasListings`, `retireInstead:hasCoverage`, `retireInstead:hasProfileDefaults` (they need a listing, coverage or a profile default on a scratch place) and `importRunning` (a second session). The client reads each (LRF-3, IMR-14/15's `importRunning`); no browser run drives them either.
- Between the production apply and the next Publish the published staff screens may draw the generic line for a refusal of this family (the task's TOLERANCES): expected, not a red.
- `undoBlocked` and `unknownBatch` have no words yet (queued, section 14); the import dialog's reason line draws the code.
- The base build under `/tmp/ethio-scratch/f1-doors-4b/base` and the scratch scripts beside it are the operator's to remove (this tool refuses `rm`).
- Logs read: the local run logs of the gate (`checks.log`), the by-id browser run (`e2e-run1.log`), the two bundle checks. Not read: any CI log of this push before it completes.

## 13. Findings

- INC-1163 (the ruling's words): `admin_upsert_country`, `admin_set_country_active` and `admin_set_country_root_order` assign `upper(p_code)` to a `char(2)` variable AFTER the gate; a code longer than two characters raises 22001 there instead of `badCountryCode`, so that check answers only a short or non-letter value. Unchanged from the live bodies (found at the F1-4b migration stop); only a caller who passed the gate reads the raw error. The stop report placed the raise in the DECLARE, before the gate; the bodies assign in the body, after it, and this report states it as the ruling does. Owner: F1-7. The client reads such an error as the generic line (KRF-2).
- The four door-argument casts outside the family (section 6) are now censused and owned.
- The generated types declare every door argument non-null; the typed Result of `rpc()` (F1-7) is what retires the one remaining assertion at `locations-service.ts:110`.
- No security hole found: read — the relay answers only declared codes and a fixed detail shape (`CODE_WORD`, `CODE_DETAIL`), no `message`/`details`/`hint` reaches an answer (IMR-8, IMR-15), and the removed sentence rows had no raiser (section 4).
- A rule that misled me: none. One note: the strings-layers guard demands a key move only when a static reference reaches it; the 21 keys were member-layer strings used dynamically before.

## 14. Records

DEC — DEC-333 status line: turn F1-4b BUILT — the doors of locations and countries on `door_context` and the shell (`admin_upsert_location`, `admin_move_location`, `admin_delete_location`, `admin_reorder_locations`, `admin_set_location_active`, `admin_upsert_country`, `admin_set_country_active`, `admin_set_country_root_order`, `admin_list_locations`, `admin_list_countries`, `admin_preview_location_import`, `admin_export_locations`, `admin_commit_location_import`, `admin_undo_location_import`); their country scope proven (every line whose scope is not global: move, delete, reorder, set active, commit, preview, export, undo and the place editor by `row:locations.country_code` or `arg:scope`; `admin_list_locations` `filter`; `admin_upsert_country`, `admin_list_countries` global); their refusals as codes (the places and markets ids, `permissionDenied[:scope]`, `importRunning`, `planHasRefusals`, `unknownBatch`, `batchAlreadyUndone`, `undoBlocked:hasRows`, `retireInstead:<detail>`; no new `DOOR_CODES`); the functions whose return type changed (the eight: `admin_upsert_location` uuid → jsonb, the seven others void → jsonb); the migration files e01def73, 89eaa5c9, 069b543e, de287d18, c9452c23, e0edb9a7, 1b7d8f93, 33896921, 08f47ace with the marks 20261115150000 to 20261115150800.
DEC — DEC-388: A door's country scope is read from a row's own `char(2)` column, selected by the door's argument (`countries.code`, `locations.country_code`), never from the argument's text. An id or a code no row holds scopes NULL: a country holder reads `permissionDenied:scope` and learns nothing of another market's ids, and only a global holder reaches the door's own code.
INC — INC-942 status line: CLOSED in F1-4b — the casts of the locations service are gone; CF-DOOR-ARGS reads a door argument cast through `unknown` as well as a cast of `null`; its allowlist holds `src/routes/api/listings/draft.ts:124` and `:133` and `src/routes/api/listings/identity.ts:188` (F1-5a), `src/server/supabase/user-client.ts:318` (F1-7), and no line of this family.
INC — INC-1158 status line: the same class in this family — the dial cells `admin_commit_location_import` staff_config → import_commit and `admin_undo_location_import` staff_config → import_undo (cell-meaning: "`import_commit` (120 an hour, the route's `importCommit` twin) rations one committed file…", "`import_undo` (120 an hour, the twin `importUndo`) rations one undone batch…"), and the country cells `admin_delete_location`, `admin_reorder_locations`, `admin_set_location_active` global → `row:locations.country_code`, `admin_commit_location_import` `row:locations.country_code` → `arg:scope`, `admin_preview_location_import` and `admin_export_locations` global → `arg:scope`; found by the supervisor's read of the live bodies and of the manifest before the GO and by the census.
INC — INC-1163: `admin_upsert_country`, `admin_set_country_active` and `admin_set_country_root_order` assign `upper(p_code)` to a `char(2)` variable AFTER the gate; a code longer than two characters raises 22001 there instead of `badCountryCode`, so that check answers only a short or non-letter value. Unchanged from the live bodies (found at the F1-4b migration stop); only a caller who passed the gate reads the raw error. Class: a code's check that a typed variable's own raise shadows. Owner: F1-7.
register row — the doors' row gains "locations and countries on the shell (F1-4b)"; the form kit's reader row gains "the places and markets consoles' mappers (`location-dialog-state.ts`, `country-dialog-state.ts`, `locations-service.ts`, `countries-service.ts`, `location-dialogs.tsx`, `country-dialogs.tsx`) (F1-4b)"; the row "a door's optional argument" reads: exceptions `src/routes/api/listings/draft.ts:124` and `:133`, `src/routes/api/listings/identity.ts:188` (F1-5a), `src/server/supabase/user-client.ts:318` (F1-7); the migration reader's row for the door check gains "the migration tree is read once per process for a root (`scripts/doors/once.ts`, DOORS-6, F1-4b)".
changelog — 2026-11-1x turn F1-4b (Opus 5.5): the doors of locations and countries on the door mechanism — one gate in one order, the country scope proven, refusals as codes, the location import on the shell, the client through the one reader.
roadmap — the Foundations 1 line gains "F1-4b DONE (pull request #46, marks 20261115150000 to 20261115150800)"; LEFT: the readers' typed Result and the trigger's plain sentences (F1-7); the posting doors' argument casts (F1-5a).
roadmap — Foundations 1, F1-7: "The country doors' code check is reached for every value (INC-1163)."
roadmap — Foundations 1, F1-7: "The ancestry trigger's seven plain sentences become codes (F1-4b, decision 8)."
roadmap — Foundations 1, F1-7: "`unknown country scope` in the places export and the places planner becomes a code (F1-4b)."
roadmap — Foundations 1, F1-7: "A commit refused by its translation step names the translation right (F1-4b, decision 7)."
roadmap — Foundations 1, F1-5a: "First part — the migration guard refuses a file that drops and re-creates a function without restating every grant its last declaration gave (F1-4b, ruling 1)."
roadmap — the form kit, wave 3: "The import reasons without words — `undoBlocked`, `unknownBatch` — gain words (F1-4b)."
roadmap — the rules turns: "Rule 30 — the stop report, with its dropped functions' grants, is written before the migration commit is pushed; one push carries both (F1-4b, ruling 1)."
roadmap — the rules turns: "GO template — the census item `callee-codes`: every refusal a called function can answer (F1-4b, ruling 1)."
slip — the migration chat's first push restated `authenticated` alone for eight DROP + CREATE doors whose last declarations also granted the service role (ruling 1 PREVENTION (1)); and the DOORS-6 guard's second timeout on its default limit, fixed here at its cause (ruling 1 PREVENTION (3)).
