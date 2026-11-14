# Foundations 1, turn F1-3 — the doors of translations, languages and the legal texts onto the door mechanism — report

Base: a67a3fbda · Final commit: bfca0065b · Brief: docs/governance/briefs/f1-doors-3.md (sha256 6b859d4e991453a3be6860691fb354835950b85ef4105226c3c9a31313866b7f)
Review: READY · 0 BLOCKER · 0 MAJOR · 2 MINOR · on bfca006

Pull request: [#44](https://github.com/tesfayekb/ethio-marketplace/pull/44). Rulings: `docs/governance/briefs/f1-doors-3-ruling-1.md`,
`docs/governance/briefs/f1-doors-3-ruling-2.md`, and the operator's chat ruling on the three `mfa.*` keys (§10).

## 1. Done / not done, by part and step

| Step | What | Commit |
|---|---|---|
| STEP 0 | task saved, roadmap line 3 | ce9b45f48 |
| STEP 1 | the census (`docs/governance/reports/f1-doors-3.census.md`); stop 1 | 212d6cd87, 1cf30f743 |
| — | ruling 1 saved | 2a983cd6e |
| STEP 2 | the migration, twelve files; migration stop 2 | 900c2149a, 9c82af687 |
| — | ruling 2 saved, the types patch applied by `git apply` | 228bb8253 |
| part 13 | the two status doors spend `staff_translation` (ruling 2 item 5) | b52ac64df |
| STEP 3 | the client reads codes through the one reader; the two route tables; the `mfa.*` move | 119de9213 |
| STEP 4 | the tests; the row-cell guard and `admin_end_package_price`'s cell (ruling 2 item 4) | 9576e80d8 |
| docs | `docs/features/doors.md`, `legal.md`, `translations.md` | 909c7a2ef |
| STEP 5 | the gate; one ceiling moved by its named cause | d993b4910 |
| STEP 6 | one push (9c82af687..d993b4910), `gh pr ready 44`, CI watched; its two reds fixed in the one further code commit the brief allows, pushed | bfca0065b |
| STEP 7 | this report | (this commit) |

Not done: the by-id browser run did not reach a test (STAGING BEHIND, §12). Nothing else is left.

## 2. Files changed

`git diff --name-only a67a3fbda` (with this report staged):

```
docs/features/doors.md
docs/features/legal.md
docs/features/translations.md
docs/governance/briefs/f1-doors-3-ruling-1.md
docs/governance/briefs/f1-doors-3-ruling-2.md
docs/governance/briefs/f1-doors-3.md
docs/governance/reports/f1-doors-3.census.md
docs/governance/reports/f1-doors-3.report.md
docs/governance/reports/f1-doors-3.stop-1.md
docs/governance/reports/f1-doors-3.stop-2.md
e2e/admin-translations-console.spec.ts
e2e/admin-translations-data.spec.ts
e2e/legal-admin.spec.ts
e2e/legal-doors.spec.ts
roadmap.md
scripts/conformance/forms-allowlist.txt
scripts/conformance/migration-reader.test.ts
scripts/doors/check-doors-allowlist.txt
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/columns.ts
scripts/doors/judge.ts
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
scripts/route-budgets.mjs
src/features/admin/legal/legal-editor-form.tsx
src/features/admin/legal/legal-facts-card.tsx
src/features/admin/legal/legal-page.tsx
src/features/admin/legal/legal-publish-dialog.tsx
src/features/admin/legal/legal-service.test.ts
src/features/admin/legal/legal-service.ts
src/features/admin/legal/legal-version-view.tsx
src/features/admin/translations/ai-bulk-bar.tsx
src/features/admin/translations/approve-bar.tsx
src/features/admin/translations/data-scope.tsx
src/features/admin/translations/delete-language-dialog.tsx
src/features/admin/translations/history-drawer.tsx
src/features/admin/translations/languages-page.tsx
src/features/admin/translations/pseudo-bar.tsx
src/features/admin/translations/strings-page.tsx
src/features/admin/translations/transfer-bar.tsx
src/features/admin/translations/translations-service.test.ts
src/features/admin/translations/translations-service.ts
src/features/admin/translations/translator-card.tsx
src/i18n/locales/am-base.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-base.ts
src/i18n/locales/en-member.ts
src/integrations/supabase/types.ts
src/lib/dials.ts
src/routes/api/translate.route.test.ts
src/routes/api/translate.ts
src/server/imports/route.test.ts
src/server/imports/route.ts
supabase/migrations/20261114113500_1dd7586c-5155-4362-9ac6-c0dc51f5f822.sql
supabase/migrations/20261114113600_c0e4a4ff-376e-4a62-ab9a-25d6f2a8a0fb.sql
supabase/migrations/20261114113700_607adce0-991b-45c1-acef-22f458b534dc.sql
supabase/migrations/20261114113800_d7031bb9-7f2e-4fbb-bf54-6f5e5870ba13.sql
supabase/migrations/20261114113900_a501b0a5-9fcf-43c1-a389-d140de5bdf92.sql
supabase/migrations/20261114114000_337ffc64-88cc-4dc7-91a4-bb8c9c004293.sql
supabase/migrations/20261114114100_c2dc755f-2fd5-4da6-acd2-d9bd4ee5193d.sql
supabase/migrations/20261114114200_0165890e-7570-4489-a6ca-c4799a469b3c.sql
supabase/migrations/20261114114300_a0caf727-f58a-419d-9480-1ff877dc1e67.sql
supabase/migrations/20261114114400_6eff6f7d-471f-4392-bb50-ae2dd53fa274.sql
supabase/migrations/20261114114500_fedfce7d-18b0-409e-9ba2-d7f465ce3d2b.sql
supabase/migrations/20261114114600_c82190dd-d206-4a98-91c8-0d4d71d5a953.sql
supabase/migrations/20261114130400_5624a06f-712b-40f7-9ee6-b54df2c85364.sql
```

New files (`git ls-files` lists each): the brief, the two rulings, the census, the two stop reports, this report,
`scripts/doors/columns.ts`, and the thirteen migration files.

## 3. Behaviour contract — answer tables before → after

The doors (thirteen files; every body read back on ethio-staging by the supervisor, ruling 2 item 0):

| Door / reader | Before (a67a3fbda) | After |
|---|---|---|
| the 24 family doors (§14 DEC-333 line) | own gates (`has_permission` → `require_step_up_if_needed` → `translation_scope_ok`), sentences raised as errors | `door_context` (class → deactivation → permission, country where the line says → step-up → dial) and the shell; every refusal `{ok:false, code:'P0D01', message:'code[:detail]', refusals:[…]}` with 401/403/428/429/400 |
| 11 void doors (§14) | `RETURNS void` | `RETURNS jsonb`, `{ok:true}` on success |
| `admin_set_translation_status`, `admin_set_entity_translation_status` | no dial | `staff_translation` (part 13) |
| `admin_import_translations`, `admin_undo_import` | no dial | `import_commit`, `import_undo` |
| `admin_export_legal_acceptances` | dial and audit on the first page (no cursor) only | gate, dial `legal_export` and audit line on every page |
| `admin_upsert_language` | — | `global` (ruling 1 item 1) |
| the 15 staff readers | own permission check, `permission denied` or an empty/`false` answer | `door_context`'s reader form: no caller → `notSignedIn`, no permission → `permissionDenied`; no dial |
| `legal_review_overdue()` | `false` for a person without legal:view | refused `permissionDenied` |
| `user_has_translation_permission(uuid)` | EXECUTE for authenticated, no caller | closed to browser roles (D-8) |
| `language_code(text)` | — | new, service role only |

The client and routes:

| Function / route | Before | After |
|---|---|---|
| `translationErrorKey` → `translationRefusalKey(error, family?)` | regexes over sentences | `readRefusal` with `TRANSLATION_REFUSALS`; `permissionDenied:language` → scope line, `badValue:code` → code line; cancelled step-up → `null` |
| `serverMessage(error)` | the raw text unless a route reason | `null` for anything the reader knows (a code, a reason, a family sentence); the text only for a generic failure |
| the 10 void-door writers | `if (error) throw` | also `requireDone` (exactly `{ok:true}`) |
| approve-all, sync, import, undo, delete counts | `Number(x ?? 0)` sentinels | `requireCount` shape guards (`RpcShapeError`) |
| `legalErrorKey` / `legalErrorName` → `legalRefusalKey` / `legalRefusalName` | regexes | `readRefusal` with `LEGAL_REFUSALS` |
| acceptance export (client) | pages of 1000 | pages of 5000 (`ACCEPTANCE_EXPORT_PAGE`) |
| `POST /api/admin/translations/import` (`relay`) | `IMPORT_REFUSALS` sentence rows | `codedRefusal`: a P0D01 answers its code, the shell's status and its detail (`stepUpRequired` → the step-up answer); four sentence rows removed |
| `POST /api/translate` writer reasons | sentences | codes: `permissionDenied` → permission, `permissionDenied:language` → scope, `baseLocked`, `unknownKey`/`unknownEntity`/`badValue:field` → unknownTarget, `required:value` → emptyValue |
| languages page flags | sentence `catalog empty …` → sync-first line | `catalogEmpty` → sync-first line through `FLAG_REFUSALS` (the page's own layer) |

Nothing else differs: every other gate, answer and side effect is the base's (stop 2's md5 table; the supervisor's
line-by-line read-back, ruling 2 item 0).

## 4. Censuses

The census is `docs/governance/reports/f1-doors-3.census.md` (every item of STEP 1 by key word). Greps run after it:

- Every function that raised the four removed import sentences is redeclared in this turn's files (census `old-file-readers`).
- `rg -n "permission denied|not assigned to this language|not fully approved|catalog empty|unpublish it first|sync-owned|flagged rows cannot" src` — results in §6.
- The pages that reach `src/features/auth/mfa/mfa-service.ts` and the layers each loads (§10), by the strings-layers census's own graph.
- The row-cell guard over every `row:` cell of the manifest: one finding at the base, `admin_end_package_price` (§7).
- The family's manifest lines: 40 (24 `staff`, 16 `staff-reader`); 39 bodies call `door_context`; `translation_scope_ok` does not (F1-7, §10).

## 5. Tests

Unit (added or changed):
- `translations-service.test.ts`: TRS-1 updated; TRS-7 (every code, the envelope, P0009, StepUpCancelled, an extended family), TRS-8 (a generic failure keeps its text), TRS-9 (the import route's detail → scope; `wrongFile` → file shape), TRS-10 (each door's shape guard), TRS-11 (the refusal thrown as it came).
- `legal-service.test.ts`: the codes list extended; the gate codes → generic; "reads the door shell's envelope…"; "says nothing for a step-up the person cancelled"; the export asks `p_limit` 5000.
- `src/server/imports/route.test.ts`: IMR-13 (a coded refusal answers its code, status and detail, never the database's text).
- `src/routes/api/translate.route.test.ts`: TRR-6's table on codes (`rateLimited` and `permission denied` → `writerFailed`); the entity cases `badValue:field`, `required:value`.
- `scripts/doors/check-doors.test.ts`: DOORS-8 (the column census on a planted migration; every `row:` cell of the tree).

Red-first for the row-cell guard (the base's manifest line): `check-doors static FAIL: row-column-unknown
admin_end_package_price(uuid,timestamp with time zone) — row:package_prices.country names a column no migration
declares (manifest.txt:39)`; after the cell: `check-doors static OK: 264 manifest lines`
(`/tmp/ethio-scratch/f1-doors-3/gen/redfirst-rowcell.log`).

E2E assertions changed (each read a sentence this turn folds to a code, or an answer whose shape changed):
- `e2e/legal-doors.spec.ts`: LG-24's audit count 1 → 3, its title "… with one audit row" → "… with one audit row per page" (three pages read, each audited, ruling 1 item 4(a); its refused calls write none; CI's first run read 3, fixed in bfca0065b); LG-2 (:285, :291, :302) and LG-6 (:709, :714, :724) → `permissionDenied`; LG-7 (:814) → `permissionDenied`; LG-9 — the service role passes the readers, so its reads expect `error` null, and :930/:934 → `permissionDenied`; LG-24 — anon keeps `permission denied` (no grant), a plain and an admin caller → `permissionDenied`.
- `e2e/legal-admin.spec.ts`: LGA-16 → `permissionDenied`; LGA-17 — title "… a person without legal:view is refused", `legal_review_overdue` for that person answers status ≥ 400 with `permissionDenied`.
- `e2e/admin-translations-console.spec.ts`: TR-6 → `catalogEmpty`, and `notFullyApproved:<n>` matched as `/^notFullyApproved:[1-9]\d*$/` (the door's detail is the count of keys still to approve, `door_refuse('notFullyApproved', (v_total - v_approved)::text)`; STEP 4 first wrote the bare code, CI's first run read `notFullyApproved:1` and `notFullyApproved:3456`, fixed in bfca0065b).
- `e2e/admin-translations-data.spec.ts`: TR-42 → `unknownEntity`, `badValue:field`.
- Unchanged and named by ruling 2: LGA-13 (the export, one page, one audit line).

Local runs on the final tree:
- `bun run typecheck` exit 0; `bun run lint` exit 0.
- The touched unit tests: `Test Files 5 passed (5)`, `Tests 110 passed (110)`.
- `bunx vitest run scripts --maxWorkers=2`: `Test Files 119 passed (119)`, `Tests 617 passed | 1 skipped (618)`.
- `bun run checks` — fast line `checks (fast): 26 PASS · 0 FAIL · 411s — …`; last line `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 473s`. NOT RUN: actionlint and gitleaks (pinned linux/x64 binaries; this machine darwin/arm64); the four install steps (dependencies already installed); the dependency audit (advisory service unreachable from the sandbox); the scope job's two Actions-API steps; the staging preflight's four steps (staging credentials); the e2e verdict's six steps (GitHub artifacts); promote's four steps (CI only); semgrep's SARIF upload and its warning (GitHub only).
- `bun scripts/brief/check-go.ts docs/governance/briefs/f1-doors-3.md --at a67a3fbda`: `[check-go] no finding`.
- The by-id browser run (`bun run e2e:local -- e2e/legal-doors.spec.ts e2e/legal-admin.spec.ts e2e/admin-translations-console.spec.ts e2e/admin-translations-data.spec.ts --grep "(LG-(2|6|7|9|24)|LGA-(13|16|17)|TR-(6|42)) " --project mobile-360 --project desktop-1280 --retries=0`): stopped in global setup, `STAGING BEHIND: apply 20261114130400_5624a06f-712b-40f7-9ee6-b54df2c85364.sql to ethio-staging before E2E can pass`; no test ran (§12). CI's lanes on temporary backends are the proof, and its repeat lane repeats the changed specs.

J-audit (e2e/** changed): only assertions on the code a refusal now carries; no new fixture, no real row, no `.first()`,
no `waitForTimeout`, no `test.only` (grep over the diff's added lines: none).

## 6. K2 — siblings that bypass the mechanism

`rg -n "permission denied|not assigned to this language|…" src` (§4), outside this family or left by ruling:
- `src/routes/api/translate.ts:115` — the route's own `translation_scope_ok` read, answered `not assigned to this language` (F1-7, the reader SQL calls; the client reads it by its family sentence).
- `src/server/imports/route.ts:61` — `IMPORT_REFUSALS`' `permission denied` row, for the other families' import doors (attributes, categories, locations) still on their old bodies.
- `src/server/imports/csv.ts:62` — `permission denied` → `forbidden` (the same import doors).
- `src/features/admin-ai/ai-service.ts:439`, `src/features/admin-locations/locations-service.ts:403`, `src/features/admin-countries/countries-service.ts:131`, `src/features/admin-monetisation/monetisation-service.ts:254`, `src/features/admin-listings/move-reasons.ts:63`, `src/features/admin-listings/tier-reasons.ts:97` — their families' doors (F1-4 to F1-6).
None is in this turn's scope; none was touched.

## 7. Allowlists and guards

| Allowlist | Before → after | Lines |
|---|---|---|
| `scripts/conformance/forms-allowlist.txt` | 87 → 85 | the CF-FORM-3 lines of `legal-service.ts` and `translations-service.ts` left (their mappers call `readRefusal`) |
| `scripts/doors/check-doors-allowlist.txt` | 9 → 8 | `grant-without-caller user_has_translation_permission(uuid)` left (its grant revoked, file 12) |
| `scripts/public-surface-allowlist.txt` | 196 → 206 | ten `restated grant (not a new surface)` lines (stop 2) |

Guard: `check-doors` gains the eighth finding kind `row-column-unknown` (`scripts/doors/columns.ts`,
`scripts/doors/judge.ts`), planted in the self-test, judged in static and live modes, with no allowance;
`check-doors self-test OK` with eight kinds on every run of the gate. Its caller is the existing `check-doors`
entry, already named in `scripts/conformance/wired.test.ts`. The manifest's `admin_end_package_price` cell is
`row:package_prices.country_code` (ruling 2 item 4).

## 8. Strings

New or changed keys: none. Moved (operator's ruling, values byte for byte, no other locale line changed):

| Key | From → to | English | Amharic |
|---|---|---|---|
| `mfa.errorGeneric` | en-base/am-base → en-member/am-member | We couldn't complete that. Please try again. | ይህን ማጠናቀቅ አልቻልንም። እባክዎ እንደገና ይሞክሩ። |
| `mfa.errorInvalidCode` | same | That code isn't right. Enter the current code from your app. | ኮዱ ትክክል አይደለም። ከመተግበሪያዎ አሁን ያለውን ኮድ ያስገቡ። |
| `mfa.errorNoFactor` | same | No authenticator app is set up on this account. | በዚህ መለያ ላይ የተዋቀረ የማረጋገጫ መተግበሪያ የለም። |

The i18n usage maps match the tree (`[i18n:map-guard] usage maps match the tree.`; CI's `i18n used-on map is fresh`).

## 9. Migrations

The twelve files of STEP 2 are on ethio-staging (ruling 2 item 0); their sha256, marks, md5 table and grants are in
`docs/governance/reports/f1-doors-3.stop-2.md`. Part 13:

| File | sha256 | Mark |
|---|---|---|
| `20261114130400_5624a06f-712b-40f7-9ee6-b54df2c85364.sql` (17339 B) | `a87a0756c940f7daa1791247dfb5572a9d2867f892322f4c8025198351c873dc` | 20261114150000 |

Pairing on ethio-staging (pending):

```
apply 5624a06f → expect mark 20261114150000
```

For ethio-prod after the merge, in this order:

```
apply 1dd7586c → expect mark 20261114130000
apply c0e4a4ff → expect mark 20261114130100
apply 607adce0 → expect mark 20261114130200
apply d7031bb9 → expect mark 20261114130300
apply a501b0a5 → expect mark 20261114130400
apply 337ffc64 → expect mark 20261114130500
apply c2dc755f → expect mark 20261114130600
apply 0165890e → expect mark 20261114130700
apply a0caf727 → expect mark 20261114130800
apply 6eff6f7d → expect mark 20261114130900
apply fedfce7d → expect mark 20261114131000
apply c82190dd → expect mark 20261114131100
apply 5624a06f → expect mark 20261114150000
```

`bun run db:proof --fresh` on the final migration tree (no migration changed after b52ac64df):
`db:proof PASS — applied 456/456, CLI 2.120.0, cold, 52 s`. `bash scripts/check-migrations.sh` after part 13: every
guard OK, last line `Migration guard OK.`

## 10. Departures

Stops and rulings: stop 1 (a scope cell and a file outside SCOPE) → ruling 1; stop 2 (the migration) → ruling 2;
the operator's chat ruling on the `mfa.*` keys. No other stop.

DECIDE-AND-NAME:
- Files: twelve by concern plus part 13 (ruling 2 item 3.1).
- `RETURNS jsonb`: the eleven void doors (§14).
- The code each sentence becomes: stop 2 §"The codes" and the census's `consumers` table.
- Readers on `door_context`'s reader form: all fifteen staff readers; `translation_scope_ok` stays for F1-7, because ten family bodies and `src/routes/api/translate.ts:104` read its boolean.
- Audit stays each door's own `log_audit` call, as F1-2 kept it.
- Manifest cells corrected: `admin_upsert_language` `global`; the three legal `row:legal_documents.country_code`; import and undo `import_commit` / `import_undo`; the status doors `staff_translation` (part 13); `admin_end_package_price` `row:package_prices.country_code` (ruling 2 item 4).
- New English string: none.

What ruling 2 asked §10 to say:
- `legal_review_overdue`: its one caller, `src/features/admin/nav-alerts.ts:24` (`enabled: enabled && permissions.includes("legal:view")`), calls it only for a legal:view holder, and STEP 3 did not change that line, so no signed-in person's page makes a call that is refused.
- The acceptance export asks pages of the door's maximum, 5000. Every page spends `legal_export` (60 an hour, `src/lib/dials.ts`), so one hour allows 60 × 5000 = 300,000 rows; a larger export is refused `rateLimited` and never cut short silently. `docs/features/legal.md` says the same.
- What a console shows a caller a reader refuses: `/admin`'s guard (`src/routes/admin.tsx:71-97`) sends a person without the section's permission (`translations:view`, `legal:view`, `profiles:view` in `sections.ts`) back to `/admin` with its access-denied notice, or a person without the admin permission to the sign-out landing, so the section's readers are never called for them. A refusal mid-session (a permission withdrawn) shows the console's translated load-error state through `translationRefusalKey` / `legalRefusalKey`, with no detail line (`serverMessage` is `null` for a code). `data-scope.tsx:183` puts `errorText` into a `data-error` attribute that is not drawn.
- `DOOR_CODES` did not grow.
- First download (base a67a3fbda built under `/tmp/ethio-scratch/f1-doors-3/base/`, head d993b4910, both local): every page −0.1 KiB or unchanged except three. The named causes, chunk by chunk (gzip):
  - `shared-shell.js` −61 B on every page: the three `mfa.*` keys left the English base catalogue for `en-member` / `am-member` (base: the keys in `shared-shell` and `am-base`; head: in `en-member` and `am-member`, and `mfa-service`).
  - `/admin/translations_/$lang` 306.3 → 307.5 KiB (+1298 B): `refusal.js` +1138 B joins the page through `use-translations.js` (`translations-service.ts` reads through `readRefusal`); `use-translations.js` +219 B (the family's words, the shape guards); `admin.translations_._lang.js` +8, `step-up-gate.js` +6, `data-table.js` +2, others ±1–3 B; less `shared-shell.js` −61. Ceiling 307 → 308 = `ceilingForLocal(307.5)` (d993b4910).
  - `/admin/translations` 304.0 → 304.1 KiB (+157 B): `use-translations.js` +219, `step-up-gate.js` +6, `admin.translations.js` +3, others ±1–3 B, less `shared-shell.js` −61 (`refusal.js` was already on this page). Ceiling 305 unchanged, outside the band.
  - `/admin/users_/$userId` 289.4 → 289.5 KiB (+165 B): `use-translations.js` +219 (the translator card), `use-legal.js` +14, `step-up-gate.js` +6, others ±1–4 B, less `shared-shell.js` −61. Ceiling 290 unchanged, outside the band.
  - After the move: `Bundle budget OK.`, `the NEAR band (R4) — 0 NEAR`.
- The `mfa.*` move: `src/features/admin/translations/translations-service.ts` no longer imports `mfa-service` (`stepUpAbortKey` became `readRefusal`'s step-up branch), so the base layer no longer had to hold the keys and CF-SL-1 placed them in `member`. Every page that reaches `src/features/auth/mfa/mfa-service.ts` (the only file naming the three keys) loads the member layer, so none can show a raw key. The 22 pages:
  - admin and member: `admin.ai`, `admin.attributes`, `admin.categories`, `admin.countries`, `admin.legal`, `admin.legal_.$versionId`, `admin.legal_.edit`, `admin.listings`, `admin.listings_.$listingId`, `admin.listings_.$listingId_.edit`, `admin.monetisation`, `admin.places`, `admin.roles`, `admin.roles_.$roleId`, `admin.screening`, `admin.translations`, `admin.translations_.$lang`, `admin.users_.$userId`;
  - member: `my-listings_.$listingId_.edit`, `post`, `post_.$listingId`, `settings`.
- The e2e assertions changed: §5.

Departures:
- `src/lib/dials.ts` (two doc comments; outside the named areas): `staffTranslation` now names the two status doors (part 13), and `legalExport` says "every page (each one audited)" (ruling 1 item 4(a)). Comment-only, so the comments do not contradict the dials. MINOR.
- The ceiling moved in its own commit (d993b4910), not in STEP 3's, because it was measured at the gate. MINOR.
- `scripts/conformance/migration-reader.test.ts` drops `admin_import_translations` and `admin_undo_import` from its computed-declaration list (ruling 1 item 2).
- The locale files: the six `mfa.*` lines only (the operator's ruling).

## 11. CI

The base (dev), `docs/tracking/ci-status.md` on `ci-evidence`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `a67a3fbdabcd07ebd8771c3ea052c8318c3f03c0` (short `a67a3fb`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-14T10:00:10Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43582770860
```

Two-step check: SUCCESS, and the commit equals the base. `origin/dev` has not moved since STEP 0. No red of an
earlier turn.

The migration stop's push (9c82af687, run 43592099375): FAILURE, the reds stop 2 named (the refusal-reading ids and
the staging preflight), class (c); fixed by STEPS 3 and 4.

This pull request's first full run (d993b4910, run 43607584070): FAILURE. `E2E preflight (migration parity, staging)` and `E2E (Playwright, ethio-staging)`: STAGING BEHIND for part 13, class (a), expected by ruling 2 item 5. `Lane 8` and `Lane repeat`: 8 gating failures, class (e), this turn's own assertions — TR-6 (×6 across shard 8 and the repeat lane: expected `notFullyApproved`, received `notFullyApproved:1` / `notFullyApproved:3456`) and LG-24 (×2: expected one audit row, received 3, the every-page audit of ruling 1 item 4(a)). Cause: STEP 4's assertions read the code without its detail and the audit count from before the every-page audit. Fixed in bfca0065b (§5), with `docs/features/legal.md:210` and `translations.md:93` saying the same. Every other check of that run passed: errors outside a test none, accessibility serious 0 critical 0, server errors 0 off the allowlist. No re-run.

The last code commit (bfca0065b, run 43609766468), `gh pr checks 44`: 42 pass, 1 fail, 1 skipping.

- fail — `E2E preflight (migration parity, staging)`: `STAGING BEHIND: apply 20261114130400_5624a06f-712b-40f7-9ee6-b54df2c85364.sql to ethio-staging before E2E can pass` — class (a), part 13 not yet on ethio-staging; expected by ruling 2 item 5, not a stop and not a reason for a second push.
- skipping — `Promote to main` (runs only on dev).
- pass — every other check, among them the sixteen numbered lanes, smoke, e-mail, webkit, the repeat lane (27 of 65 tests repeated, the changed specs 2 of 4 within its budget), `E2E (Playwright, ethio-staging)` and the bundle budget.

`docs/tracking/branches/cursor/f1-doors-3/ci-status.md`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `bfca0065b5eb0c041bfe9a6a5b6dedb36c8fc74e` (short `bfca006`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-14T15:39:02Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43609766468
```

Two-step check: the commit equals bfca0065b; its one failing job is the preflight above (`guards-last-failure.md` names it, STAGING BEHIND for part 13 on every line). `e2e-last-failure.md`: `last E2E run 43609766468 passed`; one flaky pass, SMN-E3 (§13). Every check but the preflight is green on bfca0065b; the preflight turns green when the supervisor applies part 13 (§9).

## 12. Limits

- The by-id browser check reached no test: ethio-staging lacks part 13 (`STAGING BEHIND: apply 20261114130400_5624a06f-….sql`). Ruling 2 item 5 names this as expected: CI's E2E preflight and the staging E2E job are red with STAGING BEHIND for part 13 until it is applied, which is not a stop and not a reason for a second push. The lanes on temporary backends judge the turn, and they judge bfca0065b's two ids (TR-6, LG-24) too, for the same reason.
- On this machine the sandbox sets `PLAYWRIGHT_BROWSERS_PATH` to a sandbox-only cache, so `e2e:local`'s browser guard found no browser until the variable was unset for the run (§13).
- `catalogEmpty` is not reachable by a proof (the proof's own base and pair rows make no catalogue empty); it is proven present in the body by the manifest's codes cell.
- `labelRequired` on publish is not reachable by a proof (the table's CHECK holds every stored label to 1–60); it is proven present in the body by the manifest's codes cell.
- The whole-table doors (`admin_sync_ui_keys`, `admin_set_language_order`, `admin_set_legal_settings`) are proven on their refusals only (rule 30 forbids a proof to call a whole-table statement's live wrapper).
- `admin_end_package_price`'s cell correction fixes the column's NAME only; whether that row's country is the right scope for the door is F1-6's census.
- Between the production apply and the next Publish, the published staff screens may draw the generic line for a refusal of this family (the brief's TOLERANCES).
- Not run here: gitleaks, actionlint (linux binaries), the dependency audit, the staging preflight (no staging credential in the script); CI runs each.
- Scratch, the operator's to remove: `/tmp/ethio-scratch/f1-doors-3/` (the base build under `base/`, the logs under `gen/`).

## 13. Findings

- Tooling: the sandbox's `PLAYWRIGHT_BROWSERS_PATH` points at `…/cursor-sandbox-cache/…/playwright`, which holds no browser, while the installed browsers are in `~/Library/Caches/ms-playwright`; `scripts/e2e-browser-guard.ts` resolves through it and refuses. The run passed only with the variable unset. Not a code defect; a note for the executor's environment.
- SMN-E3 (`e2e/submenu-touch.spec.ts:63-64`, `desktop-1280`, shard 13) failed and passed on retry in run 43609766468: "a panel row is at most the rail's (D248)", expected ≤ 42.5, received 44.265625. The flake ledger holds three lines for it on 2026-11-14 (runs 43572434121, 43572457160, 43609766468) and `docs/tracking/incidental-findings.md` names no incident for it: rule 40's threshold (three in seven days, no incident). Outside this turn's scope (the submenu; this turn changes no shell, menu or style file); raised here for root-cause work.
- Otherwise none: the self-review's banned-pattern grep over the diff's added lines and the K2 grep (§6) found nothing else.

## 14. Records

- DEC — DEC-383 — "F1-3's census rulings: `admin_upsert_language` is global (languages are configuration; a language row names several countries and the door writes them); a door's body is redeclared written-out at any size, generated by script and guarded by md5, because the static door check reads written-out declarations — rule 30's computed insertion is for functions that are not doors; `admin_export_legal_acceptances` passes the gate and writes its audit line on every call."
- INC — INC-1157 — fixed in part 9; its text is the supervisor's, at the records turn.
- INC — INC-1158 — "Six manifest cells of the translations, languages and legal family did not mean what they said: `admin_upsert_language`'s `row:` cell named a table that does not exist; three legal `row:` cells named the column `country` for `country_code`; the import and undo doors' dial cells named `staff_config` for `import_commit` and `import_undo`. Found by the census item `cell-meaning` before any body was written; fixed in F1-3. Class: a manifest cell grounded by signature (INC-1151, INC-1152) — third family, so `check-doors` gains the finding kind of ruling 1 item 5."
- INC — INC-1159 — "The manifest's line for `admin_end_package_price` named `row:package_prices.country`; the table's column is `country_code` (the F1-1 plan's line, written without reading the table). Found by the row-cell guard built in F1-3, before the door's own family turn; the cell is corrected in F1-3 and the guard lands with no exception. Class: a manifest cell not checked against the schema — third finding of the family, so the guard (a `row:` cell names a column the migrations declare) runs on every push."
- INC — INC-1160 — "The two translation status doors were given the dial `staff_config` (the F1-1 plan's lines) where their old bodies had none: a reviewer's per-row work would have been capped at 600 an hour, shared with every settings door. Found at the F1-3 migration stop, on ethio-staging only; fixed in part 13 (`staff_translation`). Class: a dial cell grounded by family; the task file's `cell-meaning` census item gains the dial question."
- DEC — DEC-333 — status line: turn F1-3 BUILT — the doors of translations, languages and the legal texts on `door_context` and the shell [`admin_save_translation`, `admin_machine_translation`, `admin_save_entity_translation`, `admin_machine_entity_translation`, `admin_set_translation_status`, `admin_set_entity_translation_status`, `admin_approve_all_translations`, `admin_approve_all_entity_translations`, `admin_import_translations`, `admin_undo_import`, `admin_sync_ui_keys`, `admin_set_key_context`, `admin_set_translator_languages`, `admin_set_language_flags`, `admin_upsert_language`, `admin_delete_language`, `admin_set_language_order`, `admin_save_legal_draft`, `admin_discard_legal_draft`, `admin_publish_legal_version`, `admin_add_legal_translation`, `admin_mark_legal_reviewed`, `admin_export_legal_acceptances`, `admin_set_legal_settings`; and on its reader form `admin_list_translations`, `admin_translation_stats`, `admin_list_translation_revisions`, `admin_export_translations`, `admin_list_entity_translations`, `admin_entity_translation_stats`, `admin_list_languages`, `admin_language_delete_preview`, `admin_get_translator_scope`, `admin_legal_documents`, `admin_legal_version`, `admin_legal_settings`, `legal_review_overdue`, `admin_user_legal_history`, `base_languages`]; their refusals as codes [added: badLanguage, baseLanguage, baseLocked, bothLanguages, catalogEmpty, changelogRequired, emptyList, factMissing, labelRequired, labelTaken, languagePublished, notDraft, notFullyApproved, notPublished, nothingToReview, noticeTooShort, pseudoLanguage, tooLong, tooManyRows, translationExists, translationFlagged, unknownBatch, unknownEntity, unknownFact, unknownKey, unknownTranslation, unknownVersion, and the gate-shaped `permissionDenied:language`; reused: badValue, nameRequired, required, unknownUser, and the gate's notSignedIn, accountDeactivated, permissionDenied, permissionDenied:scope, stepUpRequired]; [`RETURNS void` → `jsonb`: `admin_save_translation`, `admin_machine_translation`, `admin_save_entity_translation`, `admin_machine_entity_translation`, `admin_set_translation_status`, `admin_set_entity_translation_status`, `admin_set_key_context`, `admin_set_translator_languages`, `admin_set_language_flags`, `admin_upsert_language`, `admin_set_language_order`]; the migration files [`20261114113500_1dd7586c` … `20261114114600_c82190dd` (twelve) and `20261114130400_5624a06f`] with the marks [20261114130000 → 20261114131100, 20261114150000].
- DEC — INC-834 — status line: this family is scoped as its manifest lines say — [`admin_add_legal_translation`, `admin_mark_legal_reviewed`, `admin_export_legal_acceptances`] by their target row's country, `admin_save_legal_draft` by its country argument, the rest global [the census changed `admin_upsert_language` from a `row:` cell naming a table that does not exist to `global`, and the three legal cells from `country` to `country_code`]; proven by [files 8 and 9's proofs (b): a country holder of the legal permission refused another country's document `permissionDenied:scope` and served on its own; file 10's: a country holder refused the global settings `permissionDenied:scope`].
- register row — the doors' row gains "translations, languages and legal on the shell (F1-3)"; the form kit's reader row gains "the translations and legal mappers left the allowlist (F1-3)".
- register row — the door mechanism's row gains this family and the row-cell guard (`row-column-unknown`, `scripts/doors/columns.ts`); number none.
- changelog — 2026-11-1x turn F1-3 (Opus 5.5): the doors of translations, languages and the legal texts on the door mechanism — one gate in one order, refusals as codes, the client through the one reader; the first doors scoped by their target row's country.
- roadmap — the Foundations 1 line gains "F1-3 DONE ([#44](https://github.com/tesfayekb/ethio-marketplace/pull/44), [marks 20261114130000 → 20261114131100, 20261114150000])"; [`translation_scope_ok` left for F1-7 (the readers SQL calls: ten family bodies and the translate route read its boolean)].
- roadmap — under the Ops phase, joined to DEC-380's: "Country staff for the legal texts — whether a country holder may discard or publish its own country's draft (F1-3, finding F-2)."
- roadmap — under the before-launch list: "The acceptance export beyond one hour's dial — a streamed or background export, when a version's acceptances can exceed it."
- INC — SMN-E3 (`e2e/submenu-touch.spec.ts`, `desktop-1280`) flaky three times on 2026-11-14 (runs 43572434121, 43572457160, 43609766468): a panel row measured 44.27 px against the rail's 42.5 (D248). Found by the F1-3 lane's CI read of the flake ledger; not caused by F1-3 (no shell, menu or style file changed). Class: a layout measurement flaky at desktop width; root cause to be found.
- roadmap — under the tests-and-CI list: "A one-click job that applies a lane's pending migration files on ethio-staging by psql (no retyping, no editor paste), with the specific marks read back."
