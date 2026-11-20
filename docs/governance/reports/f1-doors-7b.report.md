# Foundations 1, turn F1-7b — the queued door corrections — report

Base: dev cca37d0cd · Final commit: 86c4022 (the last code commit; this report rides after it) · Brief: docs/governance/briefs/f1-doors-7b.md (sha256 `93cd589ed26cd1881b2db818a9ff2289ff04022b73ba123445d5955e359ab321`; ruling 1 sha256 `b5aaafcd83b69224b778eaa33834c268575695cd040feef3926d41df36b8f202`; ruling 2 `docs/governance/briefs/f1-doors-7b-ruling-2.md` sha256 `b619a7e552e55e0608b3ced8df414fe181126fb8f6d57e827c86180ea6da0028`, checked after the scripted copy; the types patch sha256 `706eecceda6a9645bfb5e423382dd7d98ee0268b2c9ce35456de2c67c911038b`, checked before `git apply`; the Amharic file sha256 `f4c75ea738f8e61569cafe101f6ec06671c64aef8b497c368cedc54223c40228`, checked before the copy)
Review: READY · 0 BLOCKER · 0 MAJOR · 4 MINOR · on 86c4022

This report is written by the NEW chat (DEC-387; STEPS 3 to 7). STEPS 0 to 2 and ruling 1's heal are the first chat's: their census is `docs/governance/reports/f1-doors-7b.census.md`, their migration stop `docs/governance/reports/f1-doors-7b.stop-1.md`.

## 1. Done / not done, by part and step

- STEP 0, 1, 2 (first chat): the brief saved, the census, the eight migration files and ruling 1's heal. Not repeated here.
- Ruling 2 saved byte for byte by scripted copy (`a0f55f5fc f1-doors-7b: ruling 2 saved`); sha256 of the copy and of the attachment both `b619a7e5…0028`. The types patch's sha256 was `706eecce…038b` before `git apply`.
- STEP 3 (`034891e48 f1-doors-7b: the clients read the new codes`): the types patch applied by `git apply` as the first act (one entry, `country_row_right`, 13 lines; `src/integrations/supabase/types.ts` never edited by hand); the exports' `exportRefusal` reads `unknownCategory` / `unknownCountry` and the three export routes answer them 404; `isExpiredSessionError` reads `noActiveSession` first and still reads the old sentence; the places words gain `badCoordinates`, the places import dialog's reasons gain `badCoordinates` and `permissionDenied`, the countries import dialog's gain `permissionDenied`; the import route's two scope-sentence rows leave; the three keys in `en-admin.ts` and `am-admin.ts` (the Amharic copied from the supervisor's file by script). Unit tests with each (CSV-7 changed, CSV-8, the impersonation tests, LRF-1 / LRF-2 changed, LRF-6, LID-1, CID-1).
- STEP 4 (`20cf58880 f1-doors-7b: the family's tests`): EXR-7 and IMR-16. `check-doors` static green (220 manifest lines). No e2e spec reads a sentence, raise or code this turn changed (census §tests; re-grepped, §4), so no e2e id changed.
- Docs (`86c402285 f1-doors-7b: the feature docs follow the clients`): `docs/features/imports.md`, `routes.md`, `locations-console.md`, `admin-audit-security.md`, `doors.md`.
- STEP 5, the gate, once, whole, on the code tree (the docs commit followed it, docs only): typecheck, lint, the laws, the touched files' tests, build and `check-bundle-size`, all inside `bun run checks` (§5). The browser check: not applicable by id (§12).
- STEP 6: pushed once (`d70886598..86c402285`), the draft pull request #79 made ready; CI: §11.
- STEP 7: this report.
- Not done: nothing of F1-7c (the typed `Result`, the one reader, INC-1213, the two server log lines).

## 2. Files changed

`git diff --name-only cca37d0cd` (46 files; the first chat's 24 non-source files and eight migrations included):

```
docs/features/admin-audit-security.md
docs/features/admin-roles.md
docs/features/attributes.md
docs/features/ci-guards.md
docs/features/countries-console.md
docs/features/doors.md
docs/features/imports.md
docs/features/locations-console.md
docs/features/routes.md
docs/governance/briefs/f1-doors-7b-am.json
docs/governance/briefs/f1-doors-7b-ruling-1.md
docs/governance/briefs/f1-doors-7b-ruling-2.md
docs/governance/briefs/f1-doors-7b.md
docs/governance/reports/f1-doors-7b.census.md
docs/governance/reports/f1-doors-7b.stop-1.md
roadmap.md
scripts/conformance/migration-reader.test.ts
scripts/conformance/migration-reader.ts
scripts/doors/manifest.txt
src/features/admin-countries/country-import-dialog.test.tsx
src/features/admin-countries/country-import-dialog.tsx
src/features/admin-locations/location-import-dialog.test.tsx
src/features/admin-locations/location-import-dialog.tsx
src/features/admin-locations/location-refusals.test.tsx
src/features/admin-locations/location-refusals.ts
src/features/admin/impersonation/impersonation-service.test.ts
src/features/admin/impersonation/impersonation-service.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/en-admin.ts
src/integrations/supabase/types.ts
src/routes/api/admin/attributes/export.ts
src/routes/api/admin/categories/export.ts
src/routes/api/admin/exports.test.ts
src/routes/api/admin/locations/export.ts
src/server/imports/csv.test.ts
src/server/imports/csv.ts
src/server/imports/route.test.ts
src/server/imports/route.ts
supabase/migrations/20261120030000_74954b0b-69a8-477c-b386-22a02c7f9e96.sql
supabase/migrations/20261120030100_e6a3d930-2cda-4e6e-a225-f2ed40682e86.sql
supabase/migrations/20261120030200_888c0aec-7982-478b-bafb-cfac71707068.sql
supabase/migrations/20261120030300_6e8a509c-22c6-4ab5-b2a4-eb4fa6bf6f9e.sql
supabase/migrations/20261120030400_b2c15e1f-1190-4407-af35-f3f5b8aef264.sql
supabase/migrations/20261120030500_2c3654f9-40d8-42cb-8755-c5490b52cddf.sql
supabase/migrations/20261120030600_002796c4-63a2-4cd4-bc6f-490a2eae9207.sql
supabase/migrations/20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql
```

New in this chat, by `git ls-files --error-unmatch`: `docs/governance/briefs/f1-doors-7b-ruling-2.md`, `src/features/admin-countries/country-import-dialog.test.tsx`, `src/features/admin-locations/location-import-dialog.test.tsx` (all three tracked). This report is the 47th path when committed.

## 3. Behaviour contract — answer tables before → after

Only what the clients of this turn answer; the SQL side is the migration stop's.

| surface | at the base | now |
|---|---|---|
| `GET /api/admin/categories/export`, `/attributes/export` with an unknown scope | the reader raised the sentence; `message.includes` matched it; 404 `{error:"unknown category scope"}` | the reader raises `unknownCategory`; read by its head; 404 `{error:"unknownCategory"}` (the ruling: "the 404 the sentences had") |
| `GET /api/admin/locations/export` with an unknown scope | 404 `{error:"unknown country scope"}` | 404 `{error:"unknownCountry"}` |
| the same three with the OLD sentence in a message | 404 | `readFailure` 500, an incident, no text (EXR-7, CSV-8). Intended: the sentences are not raised any more |
| an export's gate code `permissionDenied[:scope]` | 403 `forbidden` | unchanged |
| an import route's preview with an unknown scope | the reader's sentence matched the route table row: 404 `{error:"unknown category scope"}` | the planner's code `unknownCategory` / `unknownCountry` answered by `codedRefusal`: 400 `{error:"<code>"}` (the census's row; IMR-16). The sentence: a 500 with an incident |
| an import commit's envelope `unknownCategory` | 400 code (`codedRefusal`) | unchanged |
| `isExpiredSessionError` | true only for the sentence `impersonation session expired` | true for `noActiveSession` (with or without a `:detail`, trimmed) first; still true for the old sentence (ruling 2: it "stays readable as well until the next Publish"); false for every other message, a longer word, the code inside other words, a network error, null, undefined |
| the places console, a `badCoordinates` refusal | the generic line `admin.locations.error.unknown` | its own line `admin.locations.error.badCoordinates`, raised, as the browser client's error or as the shell's envelope (LRF-2, LRF-6) |
| the places import dialog, a row reason `badCoordinates` / `permissionDenied` | `admin.locations.import.reason.unknown` (not in `REASON_KEYS`) | `admin.locations.import.reason.badCoordinates` / `.permissionDenied` (LID-1) |
| the countries import dialog, a row reason `permissionDenied` | `reason.unknown` | `reason.permissionDenied` (CID-1) |
| `IMPORT_REFUSALS` | three rows (step-up, two scope sentences) | one row (step-up) |

Nothing else differs: the order of side effects, the signatures and the body keys of every other answer are as at the base (the diff of `src/` outside the files above is empty).

## 4. Censuses

Greps run in this chat, on the tree at 86c4022 unless a base is named.

- `rg -F -e "unknown category scope" -e "unknown country scope" -e "impersonation session expired" src e2e scripts` (locales aside): `src/server/imports/route.ts:51` (the table's comment), `src/server/imports/csv.test.ts:81-82` (CSV-8), `src/routes/api/admin/exports.test.ts:182-183` (EXR-7), `src/server/imports/route.test.ts:496` (IMR-16), `src/features/admin/impersonation/impersonation-service.ts:144` (the kept old sentence), `impersonation-service.test.ts:21`. `e2e/` and `scripts/`: none found.
- `rg -n "admin/(categories|attributes|locations)/export" e2e` and `rg -n "noActiveSession|unknownUser|badCoordinates|unknownCategory|unknownCountry" e2e`: the export specs read 200 files and refusals by id; the only hits for the codes are other families' row reasons (`e2e/admin-attributes-import.spec.ts:1076`, `admin-attributes-links.spec.ts:1596-1635`, a different token). No spec reads a status or body this turn changed.
- `rg -n "permissionDenied" src` (tests, locales and generated types aside): the parsers listed in §10; every one reads the head, so `permissionDenied:translations` reads as `permissionDenied`.
- second-readers: `src/components/shell/impersonation-notice.tsx:13` loads `impersonation-service` through `loadOnce`; `impersonation-notice.test.tsx:12` mocks it with a whole-module factory. This turn adds no export to that module and the notice does not call the changed function. `location-refusals.ts`, `location-import-dialog.tsx`, `country-import-dialog.tsx`, `csv.ts` and `route.ts` have no dynamic importer (the census's reading; the files' own diffs add no import of them).
- chunk-graph, base against this tree, from two lock-exact builds (the base from `git archive cca37d0cd` under `/tmp/ethio-scratch/f1-doors-7b/base`, `node_modules` linked, built with `bun run build`): below.

### First download, every page (`node scripts/check-bundle-size.mjs`, gzip KiB, local build)

Entry JS 200.8 / 205 KiB → 200.8 / 205 KiB; CSS 22.5 / 40 KiB → 22.5 / 40 KiB; admin code in the entry's closure 0 modules; "the NEAR band (R4)": 0 NEAR.

| page | before KiB | after KiB | ceiling | room after |
|---|---|---|---|---|
| `/` | 221.7 | 221.7 | 227 | 5.3 |
| `/$name` | 219.7 | 219.8 | 225 | 5.2 |
| `/account` | 264.1 | 264.1 | 268 | 3.9 |
| `/account_/legal` | 203.4 | 203.4 | 208 | 4.6 |
| `/account_/legal_/$versionId` | 204.1 | 204.1 | 209 | 4.9 |
| `/account_/saved` | 220.4 | 220.4 | 225 | 4.6 |
| `/admin` | 205.2 | 205.2 | 210 | 4.8 |
| `/admin/` | 206.0 | 206.0 | 211 | 5.0 |
| `/admin/ai` | 299.4 | 299.4 | 303 | 3.6 |
| `/admin/attributes` | 313.6 | 313.6 | 318 | 4.4 |
| `/admin/audit` | 290.7 | 290.7 | 295 | 4.3 |
| `/admin/categories` | 344.2 | 344.3 | 348 | 3.7 |
| `/admin/countries` | 302.9 | 302.9 | 309 | 6.1 |
| `/admin/images` | 205.8 | 205.9 | 210 | 4.1 |
| `/admin/impersonation_/$sessionId` | 288.6 | 288.6 | 293 | 4.4 |
| `/admin/legal` | 281.1 | 281.2 | 285 | 3.8 |
| `/admin/legal_/$versionId` | 277.8 | 277.8 | 282 | 4.2 |
| `/admin/legal_/edit` | 279.9 | 279.9 | 284 | 4.1 |
| `/admin/listings` | 324.9 | 324.9 | 329 | 4.1 |
| `/admin/listings_/$listingId` | 325.3 | 325.4 | 330 | 4.6 |
| `/admin/listings_/$listingId_/edit` | 406.4 | 406.5 | 412 | 5.5 |
| `/admin/locations` | 266.4 | 266.4 | 271 | 4.6 |
| `/admin/monetisation` | 310.1 | 310.1 | 313 | 2.9 |
| `/admin/places` | 303.4 | 303.4 | 310 | 6.6 |
| `/admin/roles` | 291.4 | 291.5 | 295 | 3.5 |
| `/admin/roles_/$roleId` | 271.5 | 271.5 | 275 | 3.5 |
| `/admin/screening` | 341.5 | 341.5 | 348 | 6.5 |
| `/admin/translations` | 302.8 | 302.8 | 307 | 4.2 |
| `/admin/translations_/$lang` | 305.4 | 305.4 | 309 | 3.6 |
| `/admin/users` | 288.8 | 288.8 | 293 | 4.2 |
| `/admin/users_/$userId` | 288.7 | 288.7 | 293 | 4.3 |
| `/auth` | 217.3 | 217.3 | 223 | 5.7 |
| `/auth_/callback` | 204.3 | 204.4 | 209 | 4.6 |
| `/auth_/reset` | 210.4 | 210.4 | 214 | 3.6 |
| `/c/$slug` | 221.7 | 221.7 | 227 | 5.3 |
| `/dev/primitives` | 224.5 | 224.5 | 228 | 3.5 |
| `/dev/style` | 244.0 | 244.0 | 248 | 4.0 |
| `/dev/tall` | 201.1 | 201.1 | 206 | 4.9 |
| `/l/$slug` | 247.1 | 247.1 | 250 | 2.9 |
| `/legal/$kind` | 205.5 | 205.5 | 210 | 4.5 |
| `/legal/accept` | 211.8 | 211.8 | 217 | 5.2 |
| `/legal/publishing` | 207.5 | 207.5 | 211 | 3.5 |
| `/my-listings` | 307.9 | 307.9 | 315 | 7.1 |
| `/my-listings_/$listingId` | 317.8 | 317.9 | 323 | 5.1 |
| `/my-listings_/$listingId_/edit` | 398.6 | 398.7 | 404 | 5.3 |
| `/post` | 398.6 | 398.6 | 404 | 5.4 |
| `/post_/$listingId` | 398.5 | 398.6 | 404 | 5.4 |
| `/privacy` | 205.5 | 205.5 | 210 | 4.5 |
| `/settings` | 275.4 | 275.4 | 279 | 3.6 |
| `/terms` | 205.5 | 205.5 | 210 | 4.5 |

Growth and its named cause, chunk by chunk (`/tmp/ethio-scratch/f1-doors-7b/closure-diff2.mjs`: each chunk gzipped with every `-<8 characters>.js|css` reference normalised, so only a real code change counts; summed per chunk name). The REAL code changes of this turn, in the whole build, are three chunks:

| chunk | gzip B before → after | cause |
|---|---|---|
| `impersonation-service` | 872 → 902 (+30) | `isExpiredSessionError` reads the code and keeps the old sentence. In the closures of `/admin/impersonation_/$sessionId`, `/admin/users_/$userId`, `/admin/listings`, `/admin/listings_/$listingId` |
| `admin.places` | 8153 → 8166 (+13) | the mapper's `badCoordinates` word and two reason names. In `/admin/places` |
| `admin.countries` | 5510 → 5515 (+5) | the dialog's `permissionDenied` reason name. In `/admin/countries` |

Every other page's growth (the local KiB column's +0.1 on ten pages; +13 to +89 bytes in the byte-exact totals) has no code cause: after normalising the hashed chunk names, no other chunk changed by a byte. It is the recompression of the hashed file names inside the entry (`index`: 145,090 → 145,109 raw gzip bytes, +19 in every closure) and inside the chunks that import the three changed chunks (±1 to ±4 bytes each). The ten pages shown at +0.1 are those whose total lay within a few bytes of a 0.05 KiB rounding step. No ceiling moves: the least room on any page after is 2.9 KiB (`/admin/monetisation`, `/l/$slug`), far outside DEC-296's 0.3 KiB band.

## 5. Tests

Added or changed (ids unique: `scripts/test-ids.test.ts` TI-1 passed in the laws run):

- CSV-7 (changed: the scope SENTENCE expectations become the CODES `unknownCategory` / `unknownCountry`; listed because an assertion changed shape); CSV-8 (new: the head read whole — the other family's code, a longer word, the old sentences and a code inside other words are not it).
- EXR-7 (new: an unknown scope is the code at 404 from each of the three exports; the old sentences and an unrelated error are a 500 with no text). The suite's mocked client gained one optional `error` answer (`state.error`).
- IMR-16 (new: a planner's unknown scope — a preview's raise and a commit's envelope — answers its code at 400, no database text, no refresh; the two old sentences are a 500). IMR-8's list is unchanged.
- `impersonation-service.test.ts`: the old test "reads an expired-session database refusal object" now holds `{ message: "noActiveSession", code: "P0D01" }` (changed: its input was the sentence); new `isExpiredSessionError reads the code first (F1-7b)`: the code in a raise, with a detail, trimmed, as an `Error`, as a string; the old sentence still true; seven falses.
- LRF-1 (changed: `IDS` gains `badCoordinates`, so the exact `Object.keys(words)` list gains it), LRF-2 (changed: the title and loop now read the eight codes raised, as the browser client's error and as the shell's envelope), LRF-6 (new: `badCoordinates` through the screen's state, three shapes, never the generic line).
- LID-1 (new, `location-import-dialog.test.tsx`: two reasons drawn in their sentences beside `permissionDenied`'s two details, never `reason.unknown`), CID-1 (new, `country-import-dialog.test.tsx`).

Red-first: not run. No test of this turn was shown red against the code it replaces; the new and changed tests were written with the code and proven green. The brief's red-first duty for a defect fix is the SQL side's (the migration proofs, F1-7b's first chat); the clients here change a reading, and the tests pin it. Named under §12.

Unit totals: the gate's own step `laws-first › changed folders' unit tests` PASS (6 s) and `component-tests` PASS inside `bun run checks`; the laws (`laws-first › scripts/ tests first`) PASS (97 s) inside `bun run checks`; the 124 files / 668 passed / 1 skipped count I hold is from a log of the first chat's run (`laws2.out`, 2026-11-19), so it is not claimed for this tree. `bun run typecheck` and `bun run lint`: green inside `checks`. `i18n-usage-map › Assert no drift` PASS inside `checks`. `bun scripts/doors/check-doors.ts`: `check-doors static OK: 220 manifest lines reconcile with the migrations' catalogue`. A separate `check-go` run is not claimed.

`bun run checks` (on 034891e48 + the tests commit's tree; its fast line and its last line):

```
checks (fast): 26 PASS · 0 FAIL · 427s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)
checks: 35 PASS · 0 FAIL · 26 NOT RUN · 487s
```

The 26 NOT RUN, each with its printed reason (`checks.out`): `scope` ×3 (the Actions API's artifacts exist only in a GitHub run); `build-and-check › Workflow lint (actionlint, pinned)` and `secrets-scan › Secrets scan (gitleaks, pinned)` (pinned binaries are linux/x64; this machine is darwin/arm64); `Install dependencies` ×5 (build-and-check, component-tests, bundle-budget: dependencies already installed, a package change is its own turn; dependency-audit and e2e-preflight: their own reasons below); `dependency-audit` Audit (the advisory service is not reachable from the sandbox; CI's verdict is the judge); `e2e-preflight` ×4 (it compares with ethio-staging through credentials the script never holds); `e2e` ×6 (it merges the browser lanes' artifacts from GitHub); `promote` ×4 (only CI promotes); `semgrep` Upload SARIF and its warning (GitHub only).

E2E: none run and none changed. The census names no e2e id this turn adds or changes, and §4's greps found no spec reading a changed sentence or code, so there is no id for `bun run e2e:local -- … --grep`. CI's lanes are the proof. The J-audit line: `e2e/**` did not change — not applicable.

## 6. K2 — siblings that bypass the mechanism

Greps: `rg -n "permissionDenied" src` (parsers), `rg -n "splitRefusal|doorCode\(" src --glob '!*.test.*'`, `rg -n "includes\(" src/features/admin/impersonation src/server/imports`.

- `src/features/admin/impersonation/impersonation-service.ts:143` reads the code head with its own one-line pattern `^noActiveSession(?::|$)` where `splitRefusal` (`src/lib/refusal.ts:86`) is the shared reader. Left on purpose: `/admin/impersonation_/$sessionId` does not carry the `refusal` chunk (1,157 gzip B in the final build; present in `/admin/users_/$userId` and `/admin/listings`), so the import would add about 1.1 KiB to that page; F1-7c folds the client's refusal readers onto one. In scope for F1-7c.
- `src/lib/reader-failure.ts:54` holds a regex of leading codes for the class `refused`; `src/routes/api/translate.ts:64-76` an exact-message map; `src/server/imports/route.ts:109` (`codedRefusal`) its own code read (`codedRefusal`, SQLSTATE-gated). Each is a separate reader of `code[:detail]`; not touched here (F1-7c).
- `src/server/imports/route.ts:56,134`: the table's `exact` kind has no row now. The kind and its branch stay (no function of this turn needs them removed; a later sentence may use them).
- The import dialogs that draw a scope refusal: `src/features/admin/import-dialog.tsx:244-255` (`reasonOf`) reads family words only; `unknownCategory` / `unknownCountry` at 400 draw as the raw code beneath the generic failure line, where the sentence drew raw before. The scope comes from the console's own list (the places dialog's `scope` prop), so a person does not reach it by hand. Left (outside this turn's strings).

## 7. Allowlists and guards

No allowlist line added, removed or changed in this chat (`git diff d70886598..HEAD --name-only` holds none under `scripts/`). Counts unchanged: `scripts/doors/check-doors-allowlist.txt` 5 lines; `scripts/conformance/briefs-allowlist.txt` as STEP 0 left it. Guards run in this chat: the laws and the migration guards inside `checks` (their steps in `checks.out`), `check-doors` self-test and static (`doors.out`). No new mechanism, so no new guard (K3). `scripts/conformance/migration-reader.ts` and its test are the first chat's (decision 8 of the stop report).

## 8. Strings

Three keys, EN and AM in the same change, the English from the stop report's decision 12 and the Amharic copied by script from `docs/governance/briefs/f1-doors-7b-am.json` (sha256 `f4c75ea7…0228`); both in the admin layer (`en-admin.ts` / `am-admin.ts`: only admin screens use them).

| key | EN | AM |
|---|---|---|
| `admin.locations.error.badCoordinates` | Latitude must lie between -90 and 90, and longitude between -180 and 180. | ኬክሮስ ከ-90 እስከ 90፣ ኬንትሮስ ደግሞ ከ-180 እስከ 180 መሆን አለበት። |
| `admin.locations.import.reason.badCoordinates` | This row's latitude or longitude is out of range. | የዚህ ረድፍ ኬክሮስ ወይም ኬንትሮስ ከሚፈቀደው ወሰን ውጭ ነው። |
| `admin.locations.import.reason.permissionDenied` | You do not have permission to change this market's own record. | የዚህን ገበያ የራሱን መዝገብ ለመቀየር ፈቃድ የለህም። |

No existing key changed. No Amharic was written in this chat.

## 9. Migrations

The eight files are the first chat's, unchanged since `7bd4682ea` (`git diff 7bd4682ea..HEAD -- supabase scripts` is empty). `bun run db:proof --fresh` on the final tree (86c4022), its last line:

```
db:proof PASS — applied 540/540, CLI 2.120.0, cold, 56 s
```

| # | file | sha256 | mark | apply pairing line |
|---|---|---|---|---|
| 1 | `20261120030000_74954b0b-69a8-477c-b386-22a02c7f9e96.sql` | `c8cccd76560c9652b5c2b23abfaaf1061e36fd030b8d870ef9ff5bf633109588` | `20261120050000` | `apply 74954b0b → expect mark 20261120050000` |
| 2 | `20261120030100_e6a3d930-2cda-4e6e-a225-f2ed40682e86.sql` | `532716848ae0c99d35be4a287c2c3fc13af5ad83dfd47283e2261abdd5545154` | `20261120050100` | `apply e6a3d930 → expect mark 20261120050100` |
| 3 | `20261120030200_888c0aec-7982-478b-bafb-cfac71707068.sql` | `4041bcf1caf56221059f7a3ab59470e9095f1faa13d92e19f8980cd6082c2e49` | `20261120050200` | `apply 888c0aec → expect mark 20261120050200` |
| 4 | `20261120030300_6e8a509c-22c6-4ab5-b2a4-eb4fa6bf6f9e.sql` | `27ce2d89cbe35ecacd1b3b6f11d0c69bd21f534f65fb9349e5cff00f6ac94876` | `20261120050300` | `apply 6e8a509c → expect mark 20261120050300` |
| 5 | `20261120030400_b2c15e1f-1190-4407-af35-f3f5b8aef264.sql` | `2e69a00eaf895d33e3cbaec613b8ce7e32cba78c7997ab4119e63e32a13841a3` | `20261120050400` | `apply b2c15e1f → expect mark 20261120050400` |
| 6 | `20261120030500_2c3654f9-40d8-42cb-8755-c5490b52cddf.sql` | `dc8907f1b58fe8a069a56130fbe197bdc6f2760187468723faf809652961f53b` | `20261120050500` | `apply 2c3654f9 → expect mark 20261120050500` |
| 7 | `20261120030600_002796c4-63a2-4cd4-bc6f-490a2eae9207.sql` | `34d9924dbf887d941ec5663e997d946cf90038f0e58f0ef74e6d119d728730b0` | `20261120050600` | `apply 002796c4 → expect mark 20261120050600` |
| 8 | `20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql` | `88994d002bf3b7fe933233e18475adf146c0fbcbf6726a8193bcaefff90e4f29` | `20261120050700` | `apply cbdfbd69 → expect mark 20261120050700` |

ethio-staging: ruling 2 records the supervisor's apply and read-back (its Bodies line gives `attr_import_plan` md5 `b8a140b73f535e16bf7997af3b74c994` and `country_row_right` md5 `12c053c4b87eb6417a6a108fa30ccd5f`); this chat did not read staging.

For ethio-prod, after the merge and before the Publish, the same eight pairing lines in file order. Before the apply the supervisor checks that ethio-prod's `attr_import_plan` is still `7a2cb306…` (ruling 2's words; the repository's body is md5 `7a2cb3062a843c2d16ce1b5be5be90ef`, from the stop report); on production the heal in file 3 does nothing.

Published readers that misread between the apply and the Publish (PREVENTION (5), ruling 2), each from the published code at the base:

- The three export routes (`categories`, `attributes`, `locations`): the published `exportRefusal` matches the SENTENCE with `includes`, so an unknown scope, now `unknownCategory` / `unknownCountry`, answers `readFailure` 500 with an incident instead of 404. Only a hand-typed scope reaches it (the consoles pick the scope from a list).
- The expired impersonation: the published `isExpiredSessionError` does not read `noActiveSession`; the reader's refusal also arrives at HTTP 500 until F1-7c (INC-1213). The expired screen still draws once the active-session read finishes, by `impersonation-view.tsx:66-68` (`active.isFetched && active.data?.id !== sessionId`); until then the page's error state shows. After the Publish, the code is read first.
- The places console and import dialog: the published words have no `badCoordinates`, so an out-of-range coordinate draws the console's generic line `admin.locations.error.unknown` and a `badCoordinates` or `permissionDenied` row draws `reason.unknown`; the published countries dialog draws `permissionDenied` rows as `reason.unknown` as well. Generic, never raw.
- The import routes: none. The published `codedRefusal` already answers a P0D01 code at 400 (F1-3), and the published table's two sentence rows simply never match.
- `assign_role`'s `unknownUser` and `badCountryCode` and the country doors' `badCountryCode`: the published consoles draw their generic lines for the first (`user-detail.tsx`, one line for any role refusal) and their own words for the second (`country-refusals.ts:19`), unchanged by the Publish.

## 10. Departures

1. Ruling 2 against the census: the census's table says `isExpiredSessionError` is false for the old sentence after the turn; the ruling says the old sentence "stays readable as well until the next Publish". Built as the ruling says; the test pins it. The old-sentence branch is for the first Publish after this turn to remove (F1-7c, when the retired bodies and sentences leave).
2. `permissionDenied` was added to the COUNTRIES import dialog's `REASON_KEYS` (the census named the places dialog). The countries file is the file the planner's new `permissionDenied` row (INC-1164) refuses, and it shares the places namespace's key, so the dialog needed the name (CID-1). Inside SCOPE (`src/features/admin-countries/`, a file that parses a refusal this turn changes).
3. `exportRefusal`'s second argument type is now `"unknownCategory" | "unknownCountry"` (it was the two sentences), and the three routes pass the codes: the change the ruling's first bullet asks for. The return values `"forbidden"` and the code feed the unchanged `clientError(refused, … 403 : 404)` lines.
4. STEP 3's commit carries the unit tests tied to each client file; STEP 4's carries the two route-level tests (EXR-7, IMR-16) and the e2e step found nothing to change. The split follows "a commit is never red".
5. The docs commit touches `docs/features/routes.md`, `imports.md`, `locations-console.md`, `admin-audit-security.md` and `doors.md` for statements the clients made stale (`unknown category scope` 404 rows, "the rows that stay"). Standing allowance.
6. The route table's `kind: "exact"` stays with no row (§6).
7. No ceiling moved (§4).

Every parser of PREVENTION (1), what changed or why nothing did:

- `readRefusal` / `splitRefusal` (`src/lib/refusal.ts`): nothing. It reads the head of a message whatever the SQLSTATE; `badCoordinates` is now a word of the places family, `permissionDenied:translations` reads the family's `permissionDenied` words with its tail.
- `doorRefusal` (`src/lib/door-error.ts`): nothing. No route or screen of this turn's families calls it (the census's `rg`, unchanged).
- `readerFailure` (`src/lib/reader-failure.ts`): nothing. The impersonation readers' `noActiveSession` arrives as P0D01 at HTTP 500, class `server`, until F1-7c (INC-1213); the view asks `isExpiredSessionError` first, which is what changed.
- `IMPORT_REFUSALS` + `relay` (`src/server/imports/route.ts`): the two scope-sentence rows left; `codedRefusal` answers `unknownCategory` / `unknownCountry` at 400, `permissionDenied:translations` at 403 with detail `translations` (IMR-16; IMR-13 and IMR-15 unchanged and green).
- `exportRefusal` (`src/server/imports/csv.ts`): changed — reads the scope code by its head through `splitRefusal`.
- `isExpiredSessionError`: changed (above).
- `LOCATION_REFUSALS` + `useLocationRefusal`: changed — `badCoordinates`.
- `REASON_KEYS` of the places dialog: changed — `badCoordinates`, `permissionDenied`; of the countries dialog: changed — `permissionDenied`; of the categories dialog (`category-import-dialog.tsx:21`) and the attributes dialog (`admin-attributes/import-dialog.tsx:21`): nothing — they hold `unknownCountry` / `unknownCategory` as ROW reasons already, and the scope raise is the server's; their commits' `permissionDenied:translations` arrives at 403, which `failed()` (`admin/import-dialog.tsx:261`) draws as the dialog's denied line before any reason is read.
- `country-refusals.ts` (`badCountryCode`, `unknownCountry` words): nothing — the doors answer the same codes, for every value now.
- `user-detail.tsx` and `admin-users-service.ts` (a role refusal): nothing — one generic line for any refusal; `unknownUser` and `badCountryCode` draw it (not re-read in this chat beyond the grep).
- `src/routes/api/translate.ts:64-76` (`WRITER_REASONS`, exact messages): nothing — `permissionDenied:translations` is raised only through the translation core's callers (the commits, the undo and `admin_save_entity_translation`, census §consumers #2); the machine-translation writers this map reads do not call it.
- `translations-service.ts` (`TRANSLATION_REFUSALS`, `TRANSLATION_DETAIL_WORDS`): nothing — `permissionDenied` words with a tail that has no detail words read the plain permission line.

## 11. CI

Base (dev), `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`, read at the start of this chat after `git fetch origin dev main ci-evidence`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `cea51009a7363a7d00443abcd6b63afb0b11f085` (short `cea5100`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-20T03:31:25Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44667679585
```

The commit equals `origin/dev` (`cea51009a`, checked again before the push): the two-step check holds. The lane's earlier run (`branches/cursor/f1-doors-7b/ci-status.md`, commit `d708865987`, run 44693235025): FAILURE, with `E2E preflight (migration parity, staging)` the only red and every lane and the merged `E2E` green: class (a) rule 40 — "STAGING BEHIND", the staging apply pending after the migration stop; ruling 2 records the supervisor's staging apply, so this push's preflight is the first to read it. Not predicted here: its result is §11's line below.

CI on this push, last code commit `86c402285` (`git show origin/ci-evidence:docs/tracking/branches/cursor/f1-doors-7b/ci-status.md | head -8`):

```
- Commit: `86c402285289efd15e73ae0b2643c28ab5376ac5` (short `86c4022`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-20T08:50:48Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44703584986
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-ee2236758dc1… (0 read)
```

`gh pr checks 79`: 43 pass, 1 skipping (`Promote to main`, which only dev's run does), 0 fail, 0 pending. The migration-parity preflight, the earlier red of `d708865`, passes on this run (`E2E preflight (migration parity, staging)`, 25 s), with all 16 E2E lanes, the repeat lane, the email and webkit lanes, the bundle budget and the guards. Nothing was re-run and no code commit followed the push. `origin/dev` is still `cea51009a`.

## 12. Limits

- No browser run: no e2e id was added or changed (§5), so no `--grep` run exists to make; CI's lanes are the proof of every spec. Local browsers were not started.
- `bun run checks` NOT RUN lines are listed in §5 with their printed reasons; gitleaks, actionlint and the dependency audit therefore ran only in CI.
- `bun run checks` ran on the code tree (through `20cf58880`); the docs commit `86c402285` followed (docs only). The self-review (rule 00 step 8) read this chat's diff (`d70886598..HEAD`) whole against rule 80; the first chat's migrations, census and manifest changes were not read again (the supervisor read them for rulings 1 and 2).
- The base build for the first-download comparison is a copy under `/tmp/ethio-scratch/f1-doors-7b/base` (a `git archive` of `cca37d0cd` with `node_modules` linked), with the scripts `closure-diff.mjs`, `closure-diff2.mjs` and their outputs beside it; the operator's to remove.
- Two slips of mine, disclosed: (1) one edit of `src/server/imports/route.ts` (the table's two rows and its comment) was made through a short Python script run from a heredoc, not the edit tool; the resulting diff is the one committed and was read. (2) a `rm -rf` of the base-build directory ran once before it existed (nothing removed). Neither touched anything outside the workspace and `/tmp/ethio-scratch/f1-doors-7b/`.
- A first background run of `bun run checks` died with its shell (its log stopped at the first line); the run reported in §5 is the second, complete one.
- Red-first runs were not made (§5).
- The facts in this report come from files and logs of this chat's commands (`/tmp/ethio-scratch/f1-doors-7b/*.out`) and from the commits; a line with no log behind it is not claimed.

## 13. Findings

None security. Beyond the task:

- `src/features/admin/import-dialog.tsx:178` (`reasonLabel`): a reason with a detail that has no words of its own draws the sentence and then the detail in parentheses, so the places and countries dialogs show `…own record. (update)` / `(activate)` for `permissionDenied` — the right's action name, not another person's fact, but not a sentence. Words for the two details would need two more keys and their Amharic; for the supervisor's decision (MINOR).
- `src/server/imports/route.ts:56,134`: the table's `exact` kind is now unused (MINOR; §6).
- `src/features/admin/impersonation/impersonation-service.ts:143`, `src/lib/reader-failure.ts:54`, `src/routes/api/translate.ts:64-76`: three readers of `code[:detail]` beside `splitRefusal` (F1-7c; MINOR; §6).
- `src/features/admin/import-dialog.tsx:244-255`: a scope code (`unknownCategory`, `unknownCountry`) at 400 draws as the raw code beneath the generic failure line (as the sentence did before); no screen reaches it by hand (MINOR; §6).
- Carried from the stop report, still true: `assign_role` stores `p_scope_country` without a case fold (INC-1217); `has_permission_scoped` casts its country argument to `character(2)`; `admin_set_location_active`'s comment still says `parentInactive` "passes unchanged" (restated at its next redeclaration); `admin_export_categories` holds no service-role grant; about 60 deny-all rules stay for INC-1166's census guard.
- The first-download table is local; CI's byte counts are the ceilings' judge ("about 0.1 KiB under CI").

## 14. Records

DEC — F1-7b clients (STEP 3): the exports' `exportRefusal` reads the scope code by its head (`splitRefusal`) because the family's codes are not on `DOOR_CODES`; `isExpiredSessionError` reads `noActiveSession` first and keeps the old sentence until the next Publish; the import route's table keeps one row (the step-up sentence); the places words and both import dialogs name `badCoordinates` and `permissionDenied`.
DEC — INC-1164 and INC-1179's screens: the places import dialog and the countries import dialog draw `permissionDenied` rows (detail `activate` or `update`, shown in parentheses) and the places dialog draws `badCoordinates` rows, each in its own sentence.
register row — the doors' row gains "a refusal a door can foresee answers by its code before Postgres raises; the places table's rules refuse by codes for every writer (F1-7b)" (the brief's sentence, unchanged), and the clients' line: "a family code that is not on `DOOR_CODES` is read by its head through `splitRefusal` (exports' `exportRefusal`, `isExpiredSessionError`) until F1-7c's one reader".
register row — `country_row_right(text, boolean, boolean, boolean)` (STABLE DEFINER, service role only; the country doors' own rule over `has_permission_scoped`) is the one place the places planner and the undo read the right a `countries` row's change needs (the stop report's decision 3).
INC — status lines (the brief's, the executor's bracketed parts filled): INC-1156 CLOSED — `assign_role` refuses `unknownUser` before its insert; proven by migration file 6's proof (b) (`assign_role`: `unknownUser` and `badCountryCode` at 400, no role and no audit line written). INC-1163 CLOSED — the three country doors check the text before any `char(2)` assignment; a long code answers `badCountryCode`; proven by file 6's proof (c). INC-1164 CLOSED in F1-7b — a scope's own `countries` row is written by the places planner, its commit and the undo only for a caller holding the right the country doors require for that change (`country_row_right`); proven by file 4's proof (c) and file 7's proof (c) on scratch scoped holders, and drawn by CID-1 and LID-1. INC-1166 — the three read rules `attributes_public_read`, `cal_public_read`, `category_attributes_public_read` dropped and `category_attributes`' browser SELECT grants revoked (no browser reader: census §premises); the census guard over every `USING (true)` rule stays on the before-launch list. INC-1179 CLOSED — the places trigger refuses `badCoordinates` for a coordinate out of range, for every writer; the import preview flags the row with the reason `badCoordinates` (`admin.locations.import.reason.badCoordinates`).
INC — INC-1216 and INC-1217 as ruling 1 gave them (ruling 1's text, word for word, enters at the records turn); INC-1216 CLOSED with the staging apply.
changelog — 2026-11-2x turn F1-7b (Opus 5.5 and Sonnet 5.5): the staff consoles' last raw database errors become their own refusals; every way of writing a place follows one set of rules, coordinates in range included; a country's own settings change only under the country rights.
roadmap — the Foundations 1 line gains "F1-7b DONE ([pull request #79], marks 20261120050000 → 20261120050700)"; LEFT: F1-7c; and (ruling 1) under F1-7c: "`admin_set_location_active`'s comment still says the ancestry trigger's `parentInactive` passes unchanged; since F1-7b it is a metered refusal — the comment is restated at the next redeclaration (F1-7b finding)."; and (this report) under F1-7c: "the old sentence `impersonation session expired` leaves `isExpiredSessionError` at the first Publish after F1-7b; the three code readers beside `splitRefusal` fold onto one".
slip — executor: one edit made through a Python heredoc instead of the edit tool, and one `rm -rf` of a not-yet-existing scratch path (§12); neither changed anything outside the workspace and the scratch folder.
