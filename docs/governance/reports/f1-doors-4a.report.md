# f1-doors-4a: categories and attributes on the door mechanism — report

Base: 1350b00db · Final commit: 680f45ce6 · Brief: docs/governance/briefs/f1-doors-4a.md (sha256 d16ac688a04e4a321f4396f0c8a37fc1cddc3d274a50e2f76a5147fba1c699c4) · Ruling: docs/governance/briefs/f1-doors-4a-ruling-1.md (sha256 d3a4aeb7dc0030922f6d258b094e665cde5a2a820f2486fd8179796aef11e1a1)
Review: READY · 0 BLOCKER · 1 MAJOR · 3 MINOR · on 370ae37 (the one CI fix after it, `680f45ce6`, changes DOORS-4's time limit only; typecheck, lint and the laws re-run green)

CI at the base: dev `1350b00` **SUCCESS**, run 43644320491 (completed 2026-11-14T22:03:22Z); `origin/dev` is still
`1350b00db` at the push, so the lane has no dev drift to report.

## 1. Done / not done, by part and step

- STEP 0, task saved — DONE (`0bcf90ecb`).
- STEP 1, census — DONE (`0bd17bf5c`, `docs/governance/reports/f1-doors-4a.census.md`).
- STEP 2, the migration (19 files) — DONE (`7029d50fc`); migration stop 1 (`807f03719`); ruling 1: the stop is CLEAN,
  the files are on ethio-staging, no further migration file.
- Ruling 1 saved by scripted copy, sha256 equal; the types patch applied (`6bb7ee290`).
- STEP 3, the client — DONE (`1272fa7f6`): the services' answers read by shape (`answeredId`, the accept stamp),
  `DoorArgs` for the doors' optional arguments, the two consoles' mappers replaced by the families
  `CATEGORY_REFUSALS` / `ATTRIBUTE_REFUSALS` read through `readRefusal`, the import dialog given a `refusals` family,
  the relay's coded refusals at the shell's status, the export route's refusal read.
- STEP 4, the tests and the guard — DONE (`5571b8993`): CF-DOOR-ARGS (`scripts/conformance/door-args.ts`), its
  planted proof and its tree scan, its allowlist; the e2e assertions AT-14, CT-14, AT-46; the manifest header
  sentence; the unit ids below.
- Docs — DONE (`4580293dd`).
- STEP 5, the gate — DONE; one ceiling commit (`a80132684`); three review commits (`ff6bfd239`, `ec52c25fc`,
  `370ae376b`).
- STEP 6, one push of the code — DONE (`370ae376b`), PR #45 marked ready; one CI fix (`680f45ce6`, §11).
- STEP 7, this report — written while CI runs.

## 2. Files changed  (`git diff --name-only 1350b00db`)

```
docs/features/attributes.md
docs/features/catalog-finder.md
docs/features/categories.md
docs/features/doors.md
docs/features/forms.md
docs/features/imports.md
docs/generated/i18n-usage.json
docs/governance/briefs/f1-doors-4a-ruling-1.md
docs/governance/briefs/f1-doors-4a.md
docs/governance/reports/f1-doors-4a.census.md
docs/governance/reports/f1-doors-4a.report.md
docs/governance/reports/f1-doors-4a.stop-1.md
docs/tracking/intentional-deletions.txt
e2e/admin-attributes-import.spec.ts
e2e/admin-attributes-library.spec.ts
e2e/admin-categories-lifecycle.spec.ts
e2e/category-image-routes.spec.ts
public/i18n-usage.json
roadmap.md
scripts/acceptance-doors-allowlist.txt
scripts/conformance/door-args-allowlist.txt
scripts/conformance/door-args.test.ts
scripts/conformance/door-args.ts
scripts/conformance/forms-allowlist.txt
scripts/conformance/migration-reader.test.ts
scripts/doors/check-doors-allowlist.txt
scripts/doors/check-doors.test.ts
scripts/doors/manifest.ts
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
scripts/route-budgets.mjs
src/features/admin-attributes/attribute-dialogs.tsx
src/features/admin-attributes/attribute-error.ts
src/features/admin-attributes/attribute-refusals.test.tsx
src/features/admin-attributes/attribute-refusals.ts
src/features/admin-attributes/attributes-service.test.ts
src/features/admin-attributes/attributes-service.ts
src/features/admin-attributes/category-attributes-dialog.tsx
src/features/admin-attributes/import-dialog.tsx
src/features/admin-categories/categories-page.tsx
src/features/admin-categories/categories-service.test.ts
src/features/admin-categories/categories-service.ts
src/features/admin-categories/category-dialogs.test.tsx
src/features/admin-categories/category-dialogs.tsx
src/features/admin-categories/category-image-dialog.tsx
src/features/admin-categories/category-images-service.test.ts
src/features/admin-categories/category-images-service.ts
src/features/admin-categories/category-import-dialog.tsx
src/features/admin-categories/category-refusals.test.tsx
src/features/admin-categories/category-refusals.ts
src/features/admin-categories/category-submit-error.ts
src/features/admin-categories/use-image-failure.test.ts
src/features/admin-categories/use-image-failure.ts
src/features/admin/import-dialog.tsx
src/integrations/supabase/types.ts
src/lib/supabase-door.test.ts
src/lib/supabase-door.ts
src/routes/api/admin/categories/export.ts
src/server/imports/csv.test.ts
src/server/imports/csv.ts
src/server/imports/route.test.ts
src/server/imports/route.ts
supabase/migrations/20261115021400_e6e74b07-1ee3-4c3d-b12f-9ad8684eead4.sql
supabase/migrations/20261115021500_8c759b29-30be-4ed4-abf8-826004a75da2.sql
supabase/migrations/20261115021600_dd8b1b55-77e5-4907-b0e8-75b6119d6365.sql
supabase/migrations/20261115021700_aa24b4c5-0603-4226-83c7-fb1a96b0c510.sql
supabase/migrations/20261115021800_c4b183c2-9633-4e24-a19f-d804ba1c36af.sql
supabase/migrations/20261115021900_be051beb-53e0-4b2e-8626-c8790cbc26f8.sql
supabase/migrations/20261115022000_bb8a2c66-2bb5-49e8-8353-347b878ed0dd.sql
supabase/migrations/20261115022100_b480f0e4-f370-4c90-a544-0f61f77736d5.sql
supabase/migrations/20261115022200_1ca5f456-d269-48ee-a1cc-67a7a4c54bd6.sql
supabase/migrations/20261115022300_ab599ee3-4c8a-43e0-8668-26295356b429.sql
supabase/migrations/20261115022400_e0eb5617-289e-45fe-a6b4-dad44da3ec00.sql
supabase/migrations/20261115022500_4a080afb-9b4a-40b8-b93c-2f6b3f728db3.sql
supabase/migrations/20261115022600_054d63cc-2d4b-4587-9673-d75e035c4238.sql
supabase/migrations/20261115022700_a289cdfa-4dd2-491b-8cad-e17c33fff1a0.sql
supabase/migrations/20261115022800_fba15c8e-8f12-4768-adcf-e2000ae37b67.sql
supabase/migrations/20261115022900_05efbf28-d8b4-444f-a835-65083f5302df.sql
supabase/migrations/20261115023000_29cf246d-c3ea-4a4f-8fa3-3a73c9171814.sql
supabase/migrations/20261115023100_4bce8e61-e960-4725-986f-89a38ccf3c97.sql
supabase/migrations/20261115023200_b65cc53c-ad24-4f38-9b01-b64ec7738b2d.sql
```

81 paths with this report. New files (tracked, `git ls-files` lists each): `scripts/conformance/door-args.ts`, `door-args.test.ts`,
`door-args-allowlist.txt`, `src/features/admin-categories/category-refusals.ts` (+ test),
`src/features/admin-attributes/attribute-refusals.ts` (+ test), `category-images-service.test.ts`,
`attributes-service.test.ts`, `use-image-failure.ts` (+ test), the 19 migrations, the brief, the ruling, the census,
the stop report. Deleted (declared in `1272fa7f6`'s message with `[intentional-delete]` and in
`docs/tracking/intentional-deletions.txt`): `src/features/admin-categories/category-submit-error.ts`,
`src/features/admin-attributes/attribute-error.ts`. `src/integrations/supabase/types.ts` is the types patch ruling 1
handed over, applied as given.

## 3. Behaviour contract — answer tables before → after

The doors (every body in §9's files; the census holds the per-door tables):

| Door | Before | After |
|---|---|---|
| category update, retire, delete, reactivate, reorder, window, move pointer, remove pointer, exclusions, home pointer, set images; attribute update link, delete, unlink, card, fact, order | `void`; a refusal raised as a console key or sentence | `{ok:true}`; a refusal `door_refused` with `code[:detail]`, 4xx |
| `admin_create_category`, `admin_add_category_pointer`, `admin_upsert_attribute`, `admin_link_attribute` | the new `uuid` | `{ok:true, id}` |
| `admin_accept_category_image` | the stamp | `{ok:true, accepted_at}` |
| `catalog_find_rebuild` | `integer` (rows) | `{ok:true, entries}`; one gate (`categories:import`, step-up, `staff_config`) |
| `admin_merge_attributes` | its counts | its counts (kept); refusals as codes |
| the four import doors | their answers | their answers (kept); refusals as codes through the shell, `'am'` → `language_code('pair')` |
| the 14 staff readers | own gate | `door_context` (staff-reader); answers kept |
| `import_is_slug`, `import_norm_bool`, `import_norm_date`, `import_norm_pipe` | EXECUTE for authenticated | service role only (no caller named them) |

The client:

| Surface | Before | After |
|---|---|---|
| category and attribute dialogs, categories page verbs | a console key rendered by `useCategorySubmitError` / `useAttributeError`; any other text shown raw | the family's words through `readRefusal`; a code without words draws the family's generic line |
| delete-attribute dialog | `admin.attributes.error.deleteHasLinks:<n>` → the amber blast line | `deleteHasLinks:<n>` → the same amber blast line (`370ae376b`) |
| create category dialog | `data as string` as the id | `answeredId(data)` (throws on a missing id), then exclusions and the reorder |
| picture dialog | the stamp | `accepted_at` from the answer; the route steps keep their own words |
| category and attribute import dialogs | relay sentences, 409 rows | codes at 400 with a detail; `importRunning` → the busy line; family words where the family names the code |
| `/api/admin/categories/export` | `p_scope` sent as `null` | `p_scope` omitted (its `DEFAULT NULL`); refusal read by `exportRefusal` |
| countries and locations import dialogs | `ADMIN_REFUSALS` | unchanged (`ADMIN_REFUSALS` is the dialog's default) |

## 4. Censuses

The census is `docs/governance/reports/f1-doors-4a.census.md` (its items `definition`, `callers`, `tests`, `cell-meaning`,
the relay rows, the SQL callers). This turn added:
- The family's doors on `door_context`: 42 manifest lines (28 doors, 14 staff readers), checked by a scratch script
  over the final migrations, recorded in `docs/features/doors.md`.
- The old console keys, one by one (decision 5): the scratch script `/tmp/ethio-scratch/f1-doors-4a/words-check.ts`
  reads every console key the 42 previous bodies and the five redeclared cores and helpers raised, and checks it in
  the two families. 33 keys are mapped to the code that replaced them. `already_active`, `notFound` (categories),
  `reassign_required`, `reassign_target_invalid` and `slugTaken` have no words in any locale file
  (`rg "admin.categories.error.<key>" src/i18n/locales/`: no match), so their codes draw the generic line.
  `admin.attributes.error.notFound` stays in two new bodies only as a `CASE` arm that turns a callee's key into
  `unknownAttribute` (`20261115022400_…:70`, `20261115022500_…:94`).
- Parsers of the old keys after STEP 3: `rg -F 'error\.' src/features/admin-categories src/features/admin-attributes
  src/features/admin src/lib` found only `attribute-dialogs.tsx:553` (the delete dialog, fixed in `370ae376b`) and
  `src/lib/refusal.ts:70` (`DOOR_KEY`, the reader's own pattern).

## 5. Tests

- Unit tests of the touched areas: `bunx vitest run src/features/admin-attributes src/features/admin-categories
  src/lib/supabase-door.test.ts src/lib/refusal.test.ts src/server/imports` — 14 files, 105 passed.
- New ids:
  - CSD-1, CSD-2 (`categories-service.test.ts`): the create id, its null arguments, `answeredId`'s refusal of a
    missing id; retire sends NULL; a refusal is thrown as it came.
  - CIS-1 (`category-images-service.test.ts`): the accept stamp, the refusal, the missing stamp.
  - ATS-1, ATS-2 (`attributes-service.test.ts`): the link id and nulls; the update link's nulls and `unknownLink`.
  - CRF, ARF (`category-refusals.test.tsx`, `attribute-refusals.test.tsx`): each family's words, tails and generic.
  - CIG-2 (`use-image-failure.test.ts`): the route steps keep their words; the persist stage and the accept door read
    the family.
  - DARGS-1, DARGS-2 (`door-args.test.ts`).
  - IMR-14 (`route.test.ts`): the category commit's codes at 400 (`importRunning`, `unknownParent:e2e-shoes` →
    `{error, detail}`, `catchallParent`, `deleteHasChildren:2`, `rankInherited` diagnostic → `{error:"rankInherited"}`),
    no refresh; the attribute undo's `required:batch` and `unknownBatch`.
  - CSV-7 (`csv.test.ts`): `exportRefusal`.
  - SBD-21 (`supabase-door.test.ts`) corrected: a fresh `Response` per call.
- Changed e2e assertions (each from the body's own `door_refuse` message):
  - AT-14 `toContain("permission denied")` ×3 → `toContain("permissionDenied")`.
  - CT-14 → `toBe("catchallParent")`.
  - AT-46 → `toBe(\`rankInherited:category=${child.id} rank=2 attribute=${keyDirect} inherited_from=${rootSlug}
    inherited_attribute=${keyInherited}\`)`.
  - CI-4b reads `accepted_at` from `{ok:true, accepted_at}` and compares the reader and the stored row with it
    (`370ae376b`).
- Red-first for CF-DOOR-ARGS: with the base's `attributes-service.ts` written back from `git show`, DARGS-2 failed on
  its seven casts (:300, :303, :436, :463, :464, :465, :468); the file was written back to HEAD afterwards.
- The gate on the final code tree before the review fixes: `bun run typecheck` exit 0, `bun run lint` exit 0,
  `bunx vitest run scripts --maxWorkers=2` 120 files, 619 passed, 1 skipped; `bun run checks`:
  - `checks (fast): 26 PASS · 0 FAIL · 415s`
  - `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 475s`
  - NOT RUN: the GitHub-only steps; actionlint and gitleaks (linux/x64 binaries); the dependency audit (no network);
    the staging preflight; the e2e merge; promote.
- After `370ae376b`: typecheck and lint exit 0, the laws 120 files, 619 passed, 1 skipped; `bun run build && node
  scripts/check-bundle-size.mjs` → `Bundle budget OK.`
- The browser check by id, on `370ae376b`'s tree, against ethio-staging, 0 retries, mobile-360 and desktop-1280,
  through `bun run e2e:local` with the ten family specs and `--grep` over CT-3…CT-45, AT-3…AT-84, CI-4, CI-4b:
  `1 skipped` · `81 passed (9.4m)` · exit 0. The skip is CT-8 on mobile-360 (`bandOnly(page, "desktop")`).
  `[ssr-error]`: 0. `[slow-rpc]`: 0. No spec ran whole. CI's lanes and its repeat lane prove the rest.
- J-audit (e2e/** changed): the four specs change assertions only — no new fixture, no real row, no `.first()`, no
  `waitForTimeout`, no `test.only` (grep over the diff's added lines).

## 6. K2 — siblings that bypass the mechanism

- `rg -n "as unknown as" src` (outside `src/integrations`): door arguments cast through `unknown` that CF-DOOR-ARGS's
  literal-`null` rule does not catch: `src/features/admin-locations/locations-service.ts:97` (a value, F1-4b),
  `src/routes/api/listings/draft.ts:124`, `src/server/supabase/user-client.ts:318`. Left: outside the family.
- `rg -n "doorKeyText\(" src`: no production caller left (`src/lib/refusal-tail.ts:33`). Left: `src/lib` is outside
  scope.
- The paged readers and the merge call stay on the raw client in `attributes-service.ts` / `categories-service.ts`
  (their answers did not change shape). Left: no ruling moved them.
- Pre-existing casts in two touched files: `src/server/imports/route.ts:227` (`supabase as unknown as { rpc }`) and
  `src/features/admin/import-dialog.tsx:174` (`refusal as unknown as Record<…>`). Both were at the base (:226, :170).
  Left: not this turn's concern.

## 7. Allowlists and guards

| List | Base → now |
|---|---|
| `scripts/conformance/door-args-allowlist.txt` (new) | 0 → 2 |
| `scripts/conformance/forms-allowlist.txt` | 85 → 80 (the five CF-FORM-3 lines of the two mappers leave) |
| `scripts/doors/check-doors-allowlist.txt` | 8 → 4 (the four import helpers' `grant-without-caller` lines) |
| `scripts/doors/manifest.txt` | 264 → 260 (the four import helpers) |
| `scripts/public-surface-allowlist.txt` | 206 → 223 (17 `restated grant (not a new surface)` lines) |
| `scripts/acceptance-doors-allowlist.txt` | 119 → 119 (`catalog_find_rebuild()`'s reason: "browser callers must have categories:import with step-up") |
| `docs/tracking/intentional-deletions.txt` | 72 → 74 |

The two new CF-DOOR-ARGS lines:
- `src/features/admin-locations/locations-service.ts:99`: p_level, "moves onto rpc() with DoorArgs in F1-4b", until
  INC-942.
- `src/features/admin-locations/locations-service.ts:100`: p_active, the same reason and until.

DARGS-2 refuses any allowance outside `admin-locations`. Guard self-tests: DARGS-1 (planted lines 2, 3, 4 found);
`check-doors self-test OK: 8 finding kinds`; `check-doors static OK: 260 manifest lines`. CF-DOOR-ARGS's census
`scripts/conformance/door-args.ts` is in `scripts/conformance/wired.test.ts`'s domain, and its caller is
`door-args.test.ts` (it imports `./door-args`); `wired.test.ts` passes in the laws run (120 files). `DOOR_CODES`
(`src/lib/door-codes.ts`) did not grow.

## 8. Strings

None: no key was added or changed; no `src/i18n/locales/` file is touched. The usage maps were regenerated (`bun run
i18n:usage`) because call sites moved. `admin.categories.error.saveFailed` and `admin.attributes.error.saveFailed` left
the map's literal count: they are now named only as a family's `generic:` (§13).

## 9. Migrations

The 19 files, their sha256, marks and proofs are in `docs/governance/reports/f1-doors-4a.stop-1.md`. Ruling 1 says
they are on ethio-staging. No file changed after the stop.

The apply pairing lines, in this order, for ethio-prod after the merge (ethio-staging already holds them, ruling 1):

```
apply e6e74b07 → expect mark 20261115040000
apply 8c759b29 → expect mark 20261115040100
apply dd8b1b55 → expect mark 20261115040200
apply aa24b4c5 → expect mark 20261115040300
apply c4b183c2 → expect mark 20261115040400
apply be051beb → expect mark 20261115040500
apply bb8a2c66 → expect mark 20261115040600
apply b480f0e4 → expect mark 20261115040700
apply 1ca5f456 → expect mark 20261115040800
apply ab599ee3 → expect mark 20261115040900
apply e0eb5617 → expect mark 20261115041000
apply 4a080afb → expect mark 20261115041100
apply 054d63cc → expect mark 20261115041200
apply a289cdfa → expect mark 20261115041300
apply fba15c8e → expect mark 20261115041400
apply 05efbf28 → expect mark 20261115041500
apply 29cf246d → expect mark 20261115041600
apply 4bce8e61 → expect mark 20261115041700
apply b65cc53c → expect mark 20261115041800
```

`bun run db:proof --fresh` on the migration tree (no migration changed since): `db:proof PASS — applied 475/475, CLI
2.120.0, cold, 54 s`.

## 10. Departures

- Ruling 1 (`docs/governance/briefs/f1-doors-4a-ruling-1.md`) is the turn's one ruling; migration stop 1 is the one
  stop.
- Decision 5, checked code by code (§4): every code that replaced a console key reads that key's words; only the
  codes that never had words (`alreadyActive`, `unknownCategory`, `reassignTargetInvalid`, `slugTaken`,
  `parentInactive`, `badValue`, `unknownPointer`, `permissionDenied` in categories; `unknownCategory`,
  `badAllowedOption`, `badDefault`, `badVisibleWhen`, `priceBasisDuplicate`, `badClearCell`, `permissionDenied` in
  attributes) draw the generic line.
- Word changes the reader causes (the review's MAJOR; for the supervisor):
  - `reassignRequired` gains words. The old key `admin.categories.error.reassign_required` had none; the code reads
    the existing `admin.categories.error.reassignRequired`.
  - The update link's not-found now reads `linkNotFound` (it read `notFound`).
  - `permissionDenied`, the step-up sentences and network failures draw the family's generic line where the old
    mappers showed the raw text.
- Decision 14: the `rankInherited` tail is never drawn. In a dialog the family's words carry no `{detail}`. The
  import relay passes a detail only when it matches `^[A-Za-z0-9_.:+ -]{1,64}$`, so the import dialog receives
  `rankInherited` as the bare code and draws the family's words.
- `importRunning` and `unknownParent` now answer 400 (the shell's status):
  - `importRunning`: the import dialog shows its busy line (`error.busy`).
  - `unknownParent:<slug>`: the dialog shows its failed line, with the reason line `unknownParent — <slug>` (the code
    has no family words).
  - The relay rows that stay serve the location imports only, plus the planners' `unknown category scope` sentence
    (decision 4, F1-7).
- CF-FORM-3's name rule renamed two local components: `ErrorLine` → `CategoryDialogAlert`, `AttributeErrorLine` →
  `AttributeDialogAlert`.
- `useImageFailure` moved to its own file, `use-image-failure.ts`, for the react-refresh lint rule; the usage maps
  were regenerated for it (`ec52c25fc`).
- The review narrowed the picture dialog's change to the persist stage and the accept door; the route steps keep
  their words (`ff6bfd239`).
- The export route omits `p_scope` (its `DEFAULT NULL`, read in the body).
- Census miss, fixed before the push (`370ae376b`). STEP 1's `callers` and `tests` items did not catch two consumers
  of the changed answers:
  - `DeleteAttributeDialog.failDelete` parsed `/^admin\.attributes\.error\.deleteHasLinks:(\d+)$/`
    (`attribute-dialogs.tsx:553` at the base), so AT-5's blast line would not have shown.
  - CI-4b compared the accept door's answer as a bare stamp.
  - Both were red on the lane's CI at the migration stop (`807f037`), as were the expected reds in stop 1's list.
- DOORS-4 (`scripts/doors/check-doors.test.ts`) takes `{ timeout: 20_000 }` (`680f45ce6`), its cause written on
  its line. The static census read the tree in 4082 ms on CI's runner at dev's base run 43644320491, and in 6808 ms
  (run 43667309422, `807f037`) and 6076 ms (run 43673418709, `370ae376b`) once this turn's 19 files joined it, over
  vitest's default 5000 ms. Reading the tree once instead (ruling 7 §3's remedy for DOORS-6) would save only
  `staticRows`' share, measured locally at 242 of about 1250 ms, so it would not bring CI under 5 s.
  `staticFindings` does not return its rows, and `scripts/doors/check-doors.ts` is outside this turn's
  `scripts/doors/` scope (the manifest, its allowlist, its tests). The test's body and assertions are unchanged.
- Ceiling: `/admin/countries` 327 → 328 (`a80132684`, DEC-296 NEAR band). Local size 326.7 against the base's
  326.5; the cause by chunk (gzip bytes): `categories-service` +138, `category-dialogs` +109, `import-dialog` +53,
  `refusal` −12, `index` −12. The other admin chunks: `attribute-dialogs` +358. The public pages fell 31 to 72 B
  (`/tmp/ethio-scratch/f1-doors-4a/chunks.log`). On `370ae376b`: `/admin/attributes` 337.6 / 338,
  `/admin/categories` 345.5 / 346, `/admin/countries` 326.8 / 328 — `Bundle budget OK.`

## 11. CI

- The base: dev `1350b00` SUCCESS, run 43644320491, read from `origin/ci-evidence` `docs/tracking/ci-status.md`; the
  sha it names equals `git rev-parse origin/dev`.
- The lane's run on `807f037` (the migration stop), run 43667309422: FAILURE.
  - Lanes 2, 4, 5, 8 and 15 and the staging E2E were red. The e2e failures were AT-5, AT-14, CT-38, CT-40, AT-74,
    CI-4b, AT-46, CT-14 and CT-17, each in mobile-360 and desktop-1280. Class (e), this turn's own code: the old
    client and tests against the new doors, as stop 1 foresaw, except AT-5 and CI-4b (§10). Fixed by `1272fa7f6`,
    `5571b8993` and `370ae376b`.
  - Component tests was red on DOORS-4's timeout (6808 ms), not on an assertion. I read it only on the next run;
    fixed by `680f45ce6`.
- The run on `370ae376b`, run 43673418709: 42 pass, 1 skipping, 1 fail.
  - The fail was Component tests: `scripts/doors/check-doors.test.ts` DOORS-4 "Test timed out in 5000ms" (6076 ms),
    1 of 3167 tests.
  - Class (e): this turn's 19 files lengthened the census; there was no assertion failure. Fixed at its cause by
    `680f45ce6` (§10). No re-run was asked for.
  - Every E2E lane, the repeat lane, the staging preflight and the bundle budget passed on this run.
- The run on `680f45ce6`, the last code commit: run 43680415324, SUCCESS. `gh pr checks 45` shows 43 pass and 1
  skipping ("Promote to main", which runs only on dev). The lane's evidence file
  `branches/cursor/f1-doors-4a/ci-status.md`, first six lines:

  ```
  # CI Status (auto-generated — do not edit by hand)

  - Commit: `680f45ce6eaedd0a1467815c7fda0c0857d6552b` (short `680f45c`)
  - Conclusion: **SUCCESS**
  - Completed (UTC): 2026-11-15T05:30:58Z
  - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43680415324
  ```

  The commit it names equals `git rev-parse HEAD` before the report commit.

## 12. Limits

- Codes the proofs do not drive (each a literal in its body, reconciled by `check-doors`):
  - `deleteHasListings`: needs a live listing.
  - `reassignRequired`: needs a live listing.
  - `reassignTargetInvalid`: needs a live listing.
  - `mergeHasHolders`: needs a listing's answer. AT-74 drives it in the browser.
  - `importRunning`: needs a second session. IMR-14 drives the relay's reading of it.
  - `unknownParent`: needs a parent removed between plan and write. IMR-14 drives the relay's reading of it.
  - `dependsCycle`: needs a dependency chain. AT-33 drives it in the browser.
  - `parentNotInParent`: needs a dependency chain. AT-33 drives it in the browser.
  - `boundsTargetNotNumber`: needs co-linked definitions.
  - `boundsTargetNotColinked`: needs co-linked definitions.
  - `allowedTargetCircular`: needs co-linked definitions.
  - `allowedTargetNotSelect`: needs co-linked definitions.
  - `allowedTargetNotColinked`: needs co-linked definitions.
  - `allowedUnknownValue`: needs co-linked definitions.
  - `priceBasisDuplicate`: needs a price-basis lineage.
  - `rankInherited`: needs an inherited card. AT-46 drives it in the browser.
- `bun run checks` could not run actionlint, gitleaks or the dependency audit on this computer (linux/x64 binaries,
  no network for the audit); CI's jobs judge them.
- webkit projects were not run locally; CI-4's `@webkit` tag runs in CI's webkit lane.
- The first three local browser attempts did not start a test:
  - The sandbox's Playwright cache path had no browser.
  - The usage maps were stale.
  - The shell's `PLAYWRIGHT_BROWSERS_PATH` still named the sandbox cache.
  - The fourth run set `PLAYWRIGHT_BROWSERS_PATH` to the user cache. Logs: `/tmp/ethio-scratch/f1-doors-4a/e2e-1.log`
    … `e2e-4.log`.

## 13. Findings

- INC-1162 (ruling 1): `assert_parent_not_catchall` keeps EXECUTE for authenticated (`scripts/doors/manifest.txt:151`,
  `helper | authenticated`); owner F1-7.
- `doorKeyText` (`src/lib/refusal-tail.ts:33`) has no production caller left; a candidate for removal in the turn
  that owns `src/lib/refusal-tail.ts`.
- The i18n usage map counts only literal `t("…")` calls, so it does not see the keys a `RefusalFamily` names
  (`category-refusals.ts`, `attribute-refusals.ts`); a key used only through a family looks unused to it.
- `answeredId` is exported from `src/features/admin-categories/categories-service.ts` and imported across features by
  `src/features/admin-attributes/attributes-service.ts:10`; its home is the door's client seam
  (`src/lib/supabase-door.ts`), outside scope.
- Door-argument casts outside the family (§6): `src/routes/api/listings/draft.ts:124`,
  `src/server/supabase/user-client.ts:318`, `src/features/admin-locations/locations-service.ts:97`.
- The shell inherits `PLAYWRIGHT_BROWSERS_PATH` from the sandbox even when a command runs outside it, so `bun run
  e2e:local` reports no browser; the browser guard's remedy text does not name the variable.

## 14. Records

DEC — DEC-385 (ruling 1): "DEC-380's exit rule is read narrowly: it binds a door that ends a live state its opener's
dial rations (a session, a hold). A door that deletes, retires or unlinks a catalogue row is an edit and spends its
family's dial; `admin_remove_category_pointer` and `admin_unlink_attribute` spend `staff_config`."

INC — INC-1162 (ruling 1): "`assert_parent_not_catchall` keeps EXECUTE for authenticated although every caller it has
runs as its owner (found at the F1-4a migration stop; it answers only whether a public category is a catch-all, so
nothing is exposed). Class: a helper's grant that outlived its callers. Owner: F1-7, with the remaining readers and
helpers."

DEC — DEC-333 status line: "turn F1-4a BUILT — the doors of categories and attributes on `door_context` and the shell
[the 28 doors and 14 staff readers of `docs/features/doors.md`'s F1-4a entry]; their refusals as codes [the codes cells
of their 42 manifest lines]; [functions whose return type changed: the 17 void doors → `{ok:true}`;
`admin_create_category`, `admin_add_category_pointer`, `admin_upsert_attribute`, `admin_link_attribute` → `{ok:true,
id}`; `admin_accept_category_image` → `{ok:true, accepted_at}`; `catalog_find_rebuild` → `{ok:true, entries}`];
[helpers revoked: `import_is_slug`, `import_norm_bool`, `import_norm_date`, `import_norm_pipe`]; the migration files
[20261115021400_e6e74b07 … 20261115023200_b65cc53c, 19 files] with the marks [20261115040000 … 20261115041800]."

INC — INC-942 status line: "`DoorArgs` [`src/lib/supabase-door.ts`] types a door's optional argument; CF-DOOR-ARGS
[`scripts/conformance/door-args.ts`] refuses the cast; the casts of the attributes and category-images services are
gone; the two locations casts stay on its allowlist until F1-4b."

INC — INC-1158 status line: "the same class in this family — [`admin_commit_category_import` and
`admin_commit_attribute_import` `staff_config` → `import_commit`, `admin_undo_category_import` and
`admin_undo_attribute_import` `staff_config` → `import_undo`: 'import_commit / import_undo (120 an hour each, the
route's twin dial): one file applied or undone. A curator applies a handful of files an hour.';
`admin_remove_category_pointer` `staff_moderation` → `staff_config`: 'staff_config (600 an hour per person): one
category or attribute save … a tree reshaped pointer by pointer; a curator does a few dozen of these an hour, at most
low hundreds — under 600.']; found by the supervisor's read of the live bodies before the GO and by the census."

register row — the doors' row gains "categories and attributes on the shell (F1-4a)".

register row — the form kit's reader row gains "[category-refusals.ts, attribute-refusals.ts, use-image-failure.ts,
the import dialog's `refusals` family] (F1-4a)".

register row — new: "a door's optional argument" → `DoorArgs` (`src/lib/supabase-door.ts`) → CF-DOOR-ARGS
(`scripts/conformance/door-args.ts`) → exceptions: the two locations lines until F1-4b.

changelog — "2026-11-1x turn F1-4a (Opus 5.5): the doors of categories and attributes on the door mechanism — one gate
in one order, refusals as codes, the two catalogue imports on the shell, the client through the one reader, a door's
optional argument typed."

roadmap — the Foundations 1 line gains "F1-4a DONE ([PR #45], [marks 20261115040000 … 20261115041800])"; LEFT: the
locations family and its two casts (F1-4b); the planners' `unknown category scope` sentence and
`assert_parent_not_catchall`'s grant (F1-7).

roadmap — under Foundations 1, F1-7: "The import planners' sentence for an unknown category scope becomes a code
(F1-4a, decision 4)."

roadmap — under Foundations 1, F1-7: "`assert_parent_not_catchall` leaves the browser roles (INC-1162)."

roadmap — under the rules turns: "Migration law — a callee's refusal never changes from raised to returned while a SQL
caller still calls it: cores first, callers second, doors last (F1-4a, ruling 1)."
