# GO — P-2 turn (c), build turn c2b (the caps block retires; the edit reader's and step 6's caps; the plan seam leaves; the product editor's reach caps; M-3c-b, the retirements) — report

Base: d5d6796c4 (cursor/p2-fold) · Final commit: 51e0f288c · Brief: docs/governance/briefs/p2-fold.md, with the c2b rulings docs/governance/briefs/p2-fold-c2b-ruling-1.md … -4.md (ruling 3 sha256 c6be9060bb808ed2457aa7f0b5e7d671af067cc65e530c67aa8115620e8ae99d, ruling 4 sha256 fa41dec217c50f0a34e710668884f6e8190415357ddeb42d3cc8080919e4664b, each checked on save)
Review: READY · 0 BLOCKER · 0 MAJOR · 2 MINOR · on 51e0f28

CI: 0f906f2 SUCCESS (run 42578592846, the report's own push; §11). The run before it, 7e65d1f
FAILURE (run 42572874016), is answered in §11.

## 1. Done / not done, by part and step

| Ruling, part or step | State | Commit(s) |
| --- | --- | --- |
| Part 1: the caps block retired (three files deleted and declared; page, order, service, tests; MON-1/2/15; the guides list) | done | earlier commits, stop 3 |
| Part 2: the edit reader's and the owner page's `caps` (EW-7, MLA-19) | done | stop 3 |
| Part 3: step 6's caps prop and no-limit state (SWR-2, PW-82, PW-90) | done | stop 3 |
| Part 4: the SQL reader in its own module (`migration-reader.ts`); CF-PLAN-1 retired | done | stop 3 |
| Part 5: the three cap columns, the six Guide keys, the usage maps; the plan seam dropped | done | 29ccceb8b and earlier |
| Part 6: the promote sheet through `levelNameOf` (PMS-8); the names hook (MNN-1…3) | done | stop 3 |
| Part 7: five renames by script; the perm key retired (CF-PERM-1 reads deletes) | done | stop 3 |
| M-3c-b parts (i)–(v), proven on `db:proof` | done; CLEAN on ethio-staging (ruling 4 §1) | stop 3, 49dbb6e89 |
| Ruling 3: proofs carrier-independent; the spanning-literal guard; the drop-aware public-surface judge | done | 49dbb6e89, 72c56c7a2 |
| CI reds of 77014b9 (PW-193, the smoke lane's stale lines) | done | 0f99800a7, 72c56c7a2 |
| Ruling 4 §2: the types patch with the pool-reset-map line | done | 98f405407 |
| Ruling 4 §3.1: the editor's three cap fields; `saveProduct` sends `p_caps` (MNS-3, MON-18) | done | 0faa92cc8 |
| Ruling 4 §3.2: the specs on ethio-staging | done; two reds named in §5 and §12 | — |
| Ruling 4 §3.3: THE CHECKS whole | done; 4 FAIL, all known Mac limits (§5) | — |
| Ruling 4 §3.4: the budgets | done; five ceilings (one beyond the four, §10) | 8b3bb2c62 |
| Ruling 4 §3.5: the self-review and this report | done | 51e0f288c (doc), this commit |
| Ruling 4 §3.6: push, end the turn; PR #30 stays a draft | done at this push | — |

The budgets (step 4) were measured and committed while the specs (step 2) ran, because they share
no file and the specs' build is not the budget's; the checks (step 3) ran after both.

## 2. Files changed

`git diff --name-only d5d6796c4` at 51e0f288c (103 paths; this report adds the 104th):

```
docs/features/admin-guide.md
docs/features/ci-local-backend.md
docs/features/coverage-console.md
docs/features/geography.md
docs/features/listings.md
docs/features/plans.md
docs/features/posting.md
docs/generated/i18n-usage.json
docs/governance/briefs/p2-fold-c2b-ruling-1.md
docs/governance/briefs/p2-fold-c2b-ruling-2.md
docs/governance/briefs/p2-fold-c2b-ruling-3.md
docs/governance/briefs/p2-fold-c2b-ruling-4.md
docs/governance/briefs/p2-fold-c2b-strings-2.json
docs/governance/briefs/p2-fold-c2b-strings.json
docs/governance/reports/p2-fold-c2b.stop-1.md
docs/governance/reports/p2-fold-c2b.stop-2.md
docs/governance/reports/p2-fold-c2b.stop-3.md
docs/governance/reports/p2-fold-c2b.stop-4.md
docs/tracking/intentional-deletions.txt
e2e/admin-guides.spec.ts
e2e/admin-monetisation.spec.ts
e2e/helpers/pool-reset-map.ts
e2e/my-listings-ad.spec.ts
e2e/post-wizard-place.spec.ts
e2e/post-wizard-where.spec.ts
public/i18n-usage.json
scripts/acceptance-doors-allowlist.txt
scripts/check-migrations.sh
scripts/conformance/admin-guides.test.ts
scripts/conformance/door-answers.test.ts
scripts/conformance/door-answers.ts
scripts/conformance/listing-designation.test.ts
scripts/conformance/listing-designation.ts
scripts/conformance/migration-reader.test.ts
scripts/conformance/migration-reader.ts
scripts/conformance/perm-vocabulary.test.ts
scripts/conformance/perm-vocabulary.ts
scripts/conformance/plan-seam-allowlist.txt
scripts/conformance/plan-seam.test.ts
scripts/conformance/plan-seam.ts
scripts/conformance/proof-readers.test.ts
scripts/conformance/proof-readers.ts
scripts/conformance/sql-writes.test.ts
scripts/conformance/sql-writes.ts
scripts/conformance/status-map.test.ts
scripts/conformance/status-map.ts
scripts/conformance/wired.test.ts
scripts/doors/catalogue.ts
scripts/doors/manifest.txt
scripts/doors/rows.ts
scripts/e2e-select.ts
scripts/fixtures/bad-spanning-literal-example.sql
scripts/fixtures/good-spanning-literal-example.sql
scripts/public-surface-allowlist.txt
scripts/public-surface.test.ts
scripts/public-surface.ts
scripts/route-budgets.mjs
src/features/admin-monetisation/caps-editor.tsx
src/features/admin-monetisation/caps-forms.ts
src/features/admin-monetisation/caps-section.tsx
src/features/admin-monetisation/level-overrides-table.tsx
src/features/admin-monetisation/monetisation-columns.tsx
src/features/admin-monetisation/monetisation-dialogs.tsx
src/features/admin-monetisation/monetisation-forms.test.ts
src/features/admin-monetisation/monetisation-forms.ts
src/features/admin-monetisation/monetisation-order.test.ts
src/features/admin-monetisation/monetisation-order.ts
src/features/admin-monetisation/monetisation-page.test.tsx
src/features/admin-monetisation/monetisation-page.tsx
src/features/admin-monetisation/monetisation-rows.ts
src/features/admin-monetisation/monetisation-service.test.ts
src/features/admin-monetisation/monetisation-service.ts
src/features/admin-monetisation/override-dialog.tsx
src/features/admin-monetisation/product-editor.tsx
src/features/admin-monetisation/product-prices-table.tsx
src/features/admin-monetisation/products-section.tsx
src/features/admin-monetisation/use-monetisation-names.test.ts
src/features/admin-monetisation/use-monetisation-names.ts
src/features/admin-monetisation/use-monetisation.ts
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/promote-sheet.test.tsx
src/features/my-listings/promote-sheet.tsx
src/features/posting/posting-service.test.ts
src/features/posting/posting-service.ts
src/features/posting/schema-shape.ts
src/features/posting/step-where.test.tsx
src/features/posting/step-where.tsx
src/features/posting/use-edit-draft.test.ts
src/features/posting/use-edit-draft.ts
src/features/posting/wizard.tsx
src/i18n/locales/am-admin.ts
src/i18n/locales/am-guide.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-guide.ts
src/i18n/locales/en-member.ts
src/integrations/supabase/types.ts
src/routes/admin.monetisation.tsx
supabase/migrations/20261109044933_bddc8991-cde8-4b08-95c4-6cbdc189c52b.sql
supabase/migrations/20261109044934_b2f1fad4-455f-48bd-b1ce-15aa1048a75f.sql
supabase/migrations/20261109044935_68fda306-552d-48f5-9720-35e6a79ff605.sql
supabase/migrations/20261109044936_5c76824a-9cfe-4353-b14f-676443a19c6d.sql
supabase/migrations/20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql
```

New files (`git diff --name-only --diff-filter=A d5d6796c4`, each `git ls-files --error-unmatch`
OK): the four rulings and two strings files, the four stop reports, `migration-reader.ts` and its
test, the two spanning-literal fixtures, `use-monetisation-names.test.ts`, and the five migration
files. Deleted, each declared in `docs/tracking/intentional-deletions.txt` with
`[intentional-delete]` on its commit: `caps-editor.tsx`, `caps-forms.ts`, `caps-section.tsx`,
`plan-seam.ts` (renamed into `migration-reader.ts`), `plan-seam.test.ts`, `plan-seam-allowlist.txt`.

`src/integrations/supabase/types.ts` is the supervisor's generated patch, applied with
`git apply` (ruling 4 §2), never hand-edited.

## 3. Behaviour contract — before → after

| Surface | At d5d6796c4 | Now |
| --- | --- | --- |
| `/admin/monetisation` | Markets, Levels, Reach and the Posting caps block (`coverage:view` / `coverage:update`) | Markets, Levels, Reach; the caps block gone; the Reach table shows cities, regions, countries ("No limit" when NULL) |
| Product editor, kind `reach` | key, names, days, three switches, order | the same, plus three cap fields (`-cities`, `-regions`, `-countries`), blank for no limit, "No limit" as the blank field's word, the hint under them |
| Product editor, kind `level` | unchanged | unchanged; no cap field |
| `saveProduct` | never sent caps | sends `p_caps` `{max_cities, max_regions, max_countries}` (a blank one as JSON null) for a reach row, always; never for a level |
| `admin_save_listing_package` | 12 arguments | 13, the last `p_caps jsonb DEFAULT NULL` (DEC-356): NULL keeps; required at a reach row's birth (`bad caps`); a level refuses it (`caps on level`) |
| `my_listing_private` | eight keys | the same eight plus `caps` from `listing_caps` |
| `listing_caps(uuid, character)` | absent | the one resolver of an ad's caps; service role only |
| `admin_list_listings` | a literal tier set | a level key from the levels dictionary; an unknown or reach key is refused `unknown tier` |
| The edit reader (`readDraft`) and the owner's ad page | the plan's caps through the seam | the ad's own `caps` from the seller's door, read by the one schema-shape parser |
| Step 6 (Where) | the plan's limit | the ad's caps; a NULL city limit reads "no city limit" |
| Promote sheet | a level named outside the one chooser (`promote-sheet.tsx:165`) | `levelNameOf`; no name, no span (INC-1088) |
| Names hook (`use-monetisation-names.ts`) | a product's key, a category's uuid as names | two admin words (INC-1087) |
| `coverage_plans`, `plan_caps`, `plan_photo_cap`, `seller_plan`, `admin_set_coverage_plan`, the `coverage` resource and its two permissions | present | dropped (part (v)); deleted (part (iv)) |

Everything else in the touched files is as at the base, by the censuses of stop 1 and stop 3.

## 4. Censuses

Stop 1 (`docs/governance/reports/p2-fold-c2b.stop-1.md`) holds the turn's census at d5d6796c4 by
file:line: every reader of a seller's cap, every caps-block consumer, every list a retired name
leaves, and every importer of the SQL reader (12, plus the 5 of `sqlCodeOf`). Stop 3 adds the M-3c-b
census (every live body naming a dropped object: none outside the four functions, by part (v)'s
own scan). Done in this last stretch:

- `rg -n "MON-18" e2e src`: no hit before MON-18 was written (the id was owed by ruling 1).
- `rg -ln "ProductEditorDialog|reach-create|NumberField" src e2e`: no unit test renders the
  editor; `e2e/admin-monetisation.spec.ts` is its one driver.
- `rg -n -i "types patch|caps: null until|until the types" src e2e`: none.
- `rg -n "readProduct\(" e2e/admin-monetisation.spec.ts`: every reader of the widened select uses
  `toMatchObject` or a single field, so the three added columns change no assertion.
- The F2 census (ruling 1 Q5): `product-editor.tsx` draws its controls in `FormField` at six sites:
  :99 (the two names), :119 (key), :140 (days), :150 (photos, level), :172 (the three caps,
  reach), :204 (order); its three switches are `Toggle` (:186, :192, :198). For f2-forms wave 4.

## 5. Tests

Added or changed in this last stretch:

- **MNS-3** (`monetisation-service.test.ts`) changed shape: its reach save now carries caps
  `{null, 3, 1}` and the exact `toEqual` over the door's arguments gains
  `p_caps: {max_cities: null, max_regions: 3, max_countries: 1}`; its level save still asserts no
  `p_caps`. **MNS-7** stands unchanged.
- **MON-18** (new, `e2e/admin-monetisation.spec.ts`): a scratch reach product is saved with cities
  blank and regions 3; DB truth `max_cities: null, max_regions: 3, max_countries: null`; the table
  reads "No limit", 3, "No limit"; the editor reopens blank, 3, blank; the blank field's
  placeholder is the "No limit" word. Its scratch key joins `products`, removed in `afterEach`.
- MON's `readProduct` selects the three cap columns too.

Earlier in the turn (stops 1–4, each with its reason there): EW-7, MLA-19, SWR-2, PW-193, PW-82 and
PW-90 corrected, PMS-8, MNN-1…3, MGR-1…5, MNS-7, MNF-11, MNO-1/MNO-2 and MON-1/MON-2 corrected,
MON-15 and MNF-10 removed with the caps block, PV-5…7, SLB-7, AG-1 corrected. Red first: EW-7
against the old reader (INC-1080); part (i)'s CRLF run red as staging was (stop 4).

Unit totals on the final code tree (0faa92cc8 + the budgets; the last commit is docs only):

- `bunx vitest run scripts --maxWorkers=2`: 499 passed, 1 failed of 500 (98 files); the red is
  NH-6.
- Component tests inside THE CHECKS: 2850 passed, 1 failed of 2851 (456 files); the red is NH-6.
- `bunx vitest run src/features/admin-monetisation`: 23 passed (5 files).
- `bun run typecheck`: `tsc --noEmit`, exit 0.

THE CHECKS (`bun run checks`, whole, on 8b3bb2c62's tree):

```
checks (fast): 17 PASS · 4 FAIL · 272s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)
checks: 24 PASS · 4 FAIL · 30 NOT RUN · 327s
```

- The four FAILs are the known Mac limits. `laws-first › scripts/ tests first` and
  `component-tests` each fail only NH-6 (this machine's time-zone database).
  `Workflow lint (actionlint, pinned)` and `Secrets scan (gitleaks, pinned)` fetch Linux
  binaries (`actionlint_1.7.7_linux_amd64`, `gitleaks_8.24.3_linux_x64`, checksums OK), which
  cannot run here.
- The NOT RUNs: the steps after a failed step in their job (laws-first's changed-folder tests and
  changed-file Semgrep; build-and-check's typecheck, format check, lint, e2e selector self-test,
  root route names, build and bundle report); the dependency installs (a package change is its
  own turn); the dependency audit (the advisory service is not reachable); the e2e preflight
  (staging credentials); the e2e merge job (GitHub artifacts); promote (CI only); the SARIF
  upload (GitHub only).
- The skipped build-and-check steps, run by hand on the same tree: `bun run format:check` "All
  matched files use Prettier code style!"; `bun run lint` 0 errors (46 warnings, none in a file of
  this diff); `e2e-select.ts --self-test` OK; `check-root-routes.ts --self-test` and the real run OK
  ("61 entries; every root segment is safe"); `bun run build` exit 0. The changed folders' unit
  tests are inside the component-test run above; Semgrep's own job passed ("Scan (counts only)").
- The budget inside THE CHECKS: `PASS bundle-budget › the NEAR band (R4) — 0 NEAR, none grew`.

THE BROWSER CHECK, against ethio-staging (the E2E values set, checked by name), each spec whole,
alone, both projects, `E2E_RETRIES=0`, through `bun run e2e:local`:

| Spec | Result |
| --- | --- |
| admin-monetisation (MON-5, MON-18) | 34 passed |
| admin-roles | 2 failed, 26 passed (RP-8 on both projects); rerun whole: 28 passed; RP-8 alone: 2 passed |
| my-listings-ad (MLA-19) | 2 failed, 36 passed (MLA-13 on both projects: a Mac key, §12) |
| post-wizard-place (PW-193) | 40 passed |
| post-wizard-where (PW-90) | 32 passed |
| my-listings-promote | 8 passed |
| sage-tiers | 20 passed, 20 skipped (its own `test.skip` by width: :577, :631) |
| admin-guides (AG-1) | 14 passed |

`[ssr-error]` lines: 0 in every one of the ten logs.

J-audit (`e2e/**` changed): MON-18's rows are its own scratch reach product (`scratchKey("caps",
…)`, the door's key shape), destroyed before and after through `destroyProduct`; no real row read
as a fixture; locators scoped to the dialog or through `rowOf` (twin-aware); no `.first()`, no
`waitForTimeout`, no `test.only` in the added lines (grep of the diff's added lines).

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "marketName" src/features/admin-monetisation`, `rg -n "coverage" docs/features`,
the reader's grammar read at `scripts/conformance/migration-reader.ts`, and ruling 4 §3.5's list.

- `marketName` in `src/features/admin-monetisation/use-monetisation-names.ts` still answers a
  market's raw code when its name is missing (the same class as INC-1087, left: ruling 1 named the
  two it fixed).
- `docs/features/coverage-console.md` is a superseded record, kept as history with a note, not
  rewritten.
- The lone-backslash limit (ruling 4 §1): the one-line-literal grammar
  `'(?:[^'\\\n]|''|\\[^\n])*'` reads a backslash pair as one unit, so a standard-conforming literal
  ending in a lone backslash (`'a\'`) is misread as unterminated. No change (ruled).
- c3's items: the remaining P-2 (c) work the plan places in c3 (stop 1 §(c)), untouched here.
- `validate_listing_draft` (20261107125358, fragment f2b) composes the reach row itself through
  `listing_caps`'s same resolution: equal behaviour, not moved (ruling 1 §6's register note).

## 7. Allowlists and guards

| File | Lines before → after | Change |
| --- | --- | --- |
| `scripts/public-surface-allowlist.txt` | 183 → 190 | the nine INC-443 lines added; `coverage_plans` and `admin_set_coverage_plan` removed (DEC-357) |
| `scripts/acceptance-doors-allowlist.txt` | 120 → 119 | `admin_set_coverage_plan` removed; `admin_save_listing_package` re-keyed to its 13-argument signature |
| `scripts/doors/manifest.txt` | 266 → 265 | the same two door lines |
| `scripts/conformance/plan-seam-allowlist.txt` | 1 → deleted | with the plan seam (CF-PLAN-1 retired) |
| `docs/tracking/intentional-deletions.txt` | 62 → 68 | the six deleted paths |

Guards and their self-tests (stop 4, re-run whole by THE CHECKS): the spanning-literal guard
(`SPANNING_LITERAL_FLOOR=20261109000000`, the planted bad and good fixtures, MGR-4); the
drop-aware public-surface file judge (its planted pair in `check-migrations.sh`, MGR-5, SLB-7);
`wired.test.ts` names `conformance/migration-reader.ts" --spanning`. THE CHECKS: `migration-lint`
PASS.

## 8. Strings

Every key added (by a key-by-key comparison of the six layer files at the base and now; no value
changed in place). The texts are the strings files' (`p2-fold-c2b-strings.json`,
`-strings-2.json`), copied by script; no Amharic is mine.

| Key | EN | AM |
| --- | --- | --- |
| `admin.monetisation.category.unknown` | Category not known | ምድቡ አይታወቅም |
| `admin.monetisation.error.badCaps` | A limit is a whole number, 1 or more, or blank for no limit. | ገደብ 1 ወይም ከዚያ በላይ የሆነ ሙሉ ቁጥር ነው፤ ገደብ እንዳይኖር ባዶ ይተዉት። |
| `admin.monetisation.error.capsOnLevel` | A level carries no place limits. | ደረጃ የቦታ ገደቦች የሉትም። |
| `admin.monetisation.error.reason` | Reason: {reason} | ምክንያት፦ {reason} |
| `admin.monetisation.everywhere.no` | No | አይ |
| `admin.monetisation.everywhere.yes` | Yes | አዎ |
| `admin.monetisation.field.photos` | Photos at most | ፎቶዎች ቢበዛ |
| `admin.monetisation.field.photosHint` | 0 to 30 photos per listing. | በአንድ ማስታወቂያ ከ0 እስከ 30 ፎቶዎች። |
| `admin.monetisation.product.unknown` | Product not known | ምርቱ አይታወቅም |
| `post.where.planLineNoLimit` | {used} cities · {regions} region(s) · no city limit | {used} ከተሞች · {regions} ክልል(ሎች) · የከተማ ገደብ የለም |
| `post.where.reachCaptionNoLimit` | This ad's reach: no city limit | የማስታወቂያው ተደራሽነት፦ የከተማ ገደብ የለም |
| `admin.monetisation.level.guide.col.cities` | A level has no city limit; the reach sets it. | ደረጃ የከተማ ገደብ የለውም፤ ተደራሽነቱ ያስቀምጠዋል። |
| `admin.monetisation.level.guide.col.countries` | A level has no country limit; the reach sets it. | ደረጃ የሀገር ገደብ የለውም፤ ተደራሽነቱ ያስቀምጠዋል። |
| `admin.monetisation.level.guide.col.regions` | A level has no region limit; the reach sets it. | ደረጃ የክልል ገደብ የለውም፤ ተደራሽነቱ ያስቀምጠዋል። |
| `admin.monetisation.reach.guide.col.cities` | How many cities an ad with this reach may cover; blank means no limit. | በዚህ ተደራሽነት ያለ ማስታወቂያ ስንት ከተሞች ሊሸፍን እንደሚችል፤ ባዶ ማለት ገደብ የለም። |
| `admin.monetisation.reach.guide.col.countries` | How many countries an ad with this reach may cover; blank means no limit. | በዚህ ተደራሽነት ያለ ማስታወቂያ ስንት ሀገራት ሊሸፍን እንደሚችል፤ ባዶ ማለት ገደብ የለም። |
| `admin.monetisation.reach.guide.col.regions` | How many regions an ad with this reach may cover; blank means no limit. | በዚህ ተደራሽነት ያለ ማስታወቂያ ስንት ክልሎች ሊሸፍን እንደሚችል፤ ባዶ ማለት ገደብ የለም። |

Removed: 54 admin keys (the 50 `admin.coverage.*` keys, `admin.monetisation.caps.edit`, `.title`,
`.untilP2`, `admin.roles.perm.resource.coverage`; five of the `admin.coverage.*` texts live on under
their `admin.monetisation.*` names above) and 12 guide keys (`admin.monetisation.caps.guide.*`).
The editor's fields use keys that already existed at the base:
`admin.monetisation.reach.field.cities|regions|countries|unlimited|capsHint`. Both usage maps were
regenerated after every key change (`bun run i18n:usage`: "1865 keys across 682 files").

## 9. Migrations

| Part | File | sha256 | Mark |
| --- | --- | --- | --- |
| (i) | `20261109044933_bddc8991-cde8-4b08-95c4-6cbdc189c52b.sql` | `a8183416a00cd90d801d63d92829a5521cc1ab57776acea1d4a83af512a13b20` | 20261109070000 |
| (ii) | `20261109044934_b2f1fad4-455f-48bd-b1ce-15aa1048a75f.sql` | `2e2711dd7d1da40a6faa44eba91a3c06dfd0c4cbb96da6ee0a3db62846f901ce` | 20261109070100 |
| (iii) | `20261109044935_68fda306-552d-48f5-9720-35e6a79ff605.sql` | `26206be8df54525ff570f50e44e3dbb04eb98f0f83b857df0987893bfb6b1002` | 20261109070200 |
| (iv) | `20261109044936_5c76824a-9cfe-4353-b14f-676443a19c6d.sql` | `02aa440dbef49af89d4bbbd35fcd9cb778a3ab6143e3a3f4f5c7a24b64d85d1f` | 20261109070300 |
| (v) | `20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql` | `0447d396a156fff77e1522a56fae3901142c859f0e5b28f33716e2ebe639c06a` | 20261109070400 |

```
apply bddc8991 → expect mark 20261109070000
apply b2f1fad4 → expect mark 20261109070100
apply 68fda306 → expect mark 20261109070200
apply 5c76824a → expect mark 20261109070300
apply 96b91fc3 → expect mark 20261109070400
```

Applied by the operator to ethio-staging and read back CLEAN by the supervisor (ruling 4 §1). No
migration file changed after stop 4. `bun run db:proof --fresh` last line on these files:

```
db:proof PASS — applied 436/436, CLI 2.120.0, cold, 50 s
```

## 10. Departures

Rulings in this turn: ruling 1 (the census answered), ruling 2 (the columns, the Guide keys, the
departures accepted), ruling 3 (the carrier law, the spanning guard, DEC-357), ruling 4 (CLEAN,
the types patch, the end of the turn). Stops: stop 1 (QUESTION, the census), stop 2, stop 3
(MIGRATION), stop 4 (MIGRATION again).

Accepted in ruling 2 §2:

1. `product-prices-table.tsx` joined the scope (its Guide's `next` named the retired block).
2. The 60 caps keys left in part 1, not part 7 (CFG-3).
3. The check-doors line was removed in part (v).
4. INC-1080 stays single-instance; the owner page's `plan` read was dead data (§13).
5. The reader's importers were 12, plus the 5 of `sqlCodeOf`.
6. `plan-seam-allowlist.txt` stayed until part (v).
7. MON-15 and MNF-10 were cut by an exact-slice script; a whole block removed by its line range is
   not G37.
8. The editor fields and `p_caps` came after the types patch.
9. MLA-19, PW-193 and MON-18 ran after "continue" (ruling 2 §2's timing), here on ethio-staging.

Made at stop 3 and stop 4, and reported there:

- `listing_caps` is called with `v_row.id`, the live body's own variable.
- CF-PERM-1 reads resource deletes only (PV-5…7).
- The proof's factor secret is the placeholder `'PROOFSECRET'`, as M-a's landed proof.
- AG-1's count was corrected (three Guides; five with a product row open).
- The feature docs mark the dropped objects' passages as superseded records rather than rewrite
  them.
- The reader's one-line-literal grammar reads a backslash pair as one unit (accepted, ruling 4 §1).
- The CRLF carrier proof on `db:proof` (accepted as the pattern, ruling 4 §1).

Made in this last stretch:

- **`/admin/listings` 352 → 353.** Ruling 4 §3.4 names four pages. CI measured `/admin/listings` at
  351.6 against 352, 0.4 clear of the band, so CI passes it; the local check adds its 0.1 KiB
  allowance and fails it inside the band. Rule 10 asks every page a change leaves in the band to
  be raised in the same turn (INC-1031), and DEC-296 gives `ceilingForLocal` for a local size, so
  it moved by the same cause, chunk by chunk (§12's table). For the ruling: keep it, or take it
  back to 352 and let CI judge.
- **`NumberField` gained an optional `placeholderKey`** (the blank field's word, ruling 1 Q5), a
  parameter on the shared console field rather than a second field.
- **The budgets were committed while the specs ran**, before THE CHECKS (no shared file).
- **`docs/features/plans.md`** names the editor's three cap fields (51e0f288c, after THE CHECKS; docs
  only, formatting checked).

The self-review's two MINORs (rule 80, over `git diff d5d6796c4..51e0f288c`; none BLOCKER or MAJOR),
left as they are:

- MINOR (tests): MON-18 drives a reach save only; that a level save sends no `p_caps` is proven at
  the seam (MNS-3's first call, an exact `toEqual`) and by the door's `caps on level` proof in part
  (ii), not in the browser.
- MINOR (banned-pattern read): `scripts/conformance/migration-reader.ts` defaults a regex match's
  index with `match.index ?? 0` (five sites). A `matchAll` match always has an index, and this is
  no identity, geography or screening path, so it is no sentinel default; named so the reader
  need not re-derive it.

### The budgets (ruling 4 §3.4)

Base: `git archive d5d6796c4` in `/tmp/ethio-scratch/p2-fold-c2b/sizes/base`, the head
`git archive 0faa92cc8` in `…/sizes/head`, each `bun run build` with this tree's `node_modules`
(lockfile unchanged since the base, so lock-exact), then `node scripts/check-bundle-size.mjs` and a
per-page closure dump (`…/sizes/chunks.mjs`, `diff.mjs`). Local sizes match CI's to 0.1.

| Page | Base (CI) | Head (CI 0f99800a7) | Change by chunk (KiB, gzipped) | Ceiling |
| --- | --- | --- | --- | --- |
| `/my-listings` | 321.6 | 321.8 | `level-fields.js` +0.35, `use-price-unit-labels.js` −0.14, `index.js` +0.02, `feed-page.js` +0.02, `promote-sheet-lazy.js` +0.02 | 322 → 323 |
| `/my-listings_/$listingId` | 329.5 | 329.8 | the five above, plus `posting-service.js` +0.02, `schema-shape.js` +0.01 | 330 → 331 |
| `/post` | 407.6 | 407.9 | `wizard.js` +0.08, `level-fields.js` +0.35, `use-price-unit-labels.js` −0.14, `index.js` +0.02, `posting-service.js` +0.02, `schema-shape.js` +0.01 | 408 → 409 |
| `/post_/$listingId` | 407.6 | 407.9 | as `/post` | 408 → 409 |
| `/admin/listings` | 351.4 | 351.6 | `level-fields.js` +0.35, `use-price-unit-labels.js` −0.14, `index.js` +0.02, `tier-reasons.js` +0.02, `posting-service.js` +0.02, `schema-shape.js` +0.01 | 352 → 353 (departure above) |

The cause, as the budgets file names it: step 6's no-limit state and the one caps shape; the
sheet's chooser — P-2 (c) c2b, INC-1084, DEC-355. `level-fields.ts` (`levelNameOf` and its
parser) rode inside `use-price-unit-labels.js` at the base. Now the promote sheet's chooser
imports it too, so the bundler gives it a chunk of its own: +0.35 there, −0.14 in the old chunk.
The +0.02 in `index.js`, `feed-page.js`, `promote-sheet-lazy.js` and `tier-reasons.js` is each
chunk's preload list naming the new chunk (`rg 'level-fields-…' ` finds the name once in each at
the head and never at the base). `wizard.js` +0.08 is step 6's caps prop and no-limit state;
`posting-service.js` and `schema-shape.js` are the edit reader's one caps shape. Every growth is
named. No page is 8 KiB or more under its ceiling (an awk over both builds' page lines found
none), so nothing ratchets; `/admin/monetisation` reads 337.5/341 locally (CI 337.3) and stays.
THE CHECKS' budget step on the final tree: `0 NEAR, none grew`.

## 11. CI

The base's CI (read at the turn's start, two-step SHA check: the raw ci-status.md's commit equals
the branch head d5d6796c4, and `gh run view 42552369072 --json headSha` names it):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `d5d6796c409e34d6fee00144e9fd1778d0692858` (short `d5d6796`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-09T03:09:02Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42552369072
```

No red of an earlier turn stood. This pull request's own runs:

- **68b5a8b** (run 42562258710): `format:check` on `en-admin.ts`, fixed in the same turn; AG-1's
  count (7d5caa5c3); MLA-19 and PW-193 waiting for M-3c-b (stop 3).
- **77014b9** (run 42567023039): the smoke lane's two stale public-surface lines (the disagreement
  of INC-1090), fixed by 72c56c7a2; PW-193's scratch reach without `reach_source`, fixed by
  0f99800a7; STAGING BEHIND (the paste was refused, ruling 3); infrastructure 504s (actionlint,
  gitleaks downloads).
- **0f99800** (run 42570464470) and **7e65d1f** (run 42572874016): MON-5 on lanes 2, 10 and repeat,
  both projects (the six gating failures of each run's e2e file: a reach row born without caps is
  refused `bad caps` until the editor sends them), fixed by 0faa92cc8 and passing on ethio-staging
  here; the four NEAR-band pages, fixed by 8b3bb2c62; infrastructure 504s (the Bun, actionlint,
  gitleaks and action downloads: `Unexpected HTTP response: 504`, `curl: (22) … 504`). No rerun
  was asked; each next push was the rerun.

This report's push (0f906f25c) ran whole. Two-step SHA check: the raw ci-status.md names
0f906f25c, and `gh run view 42578592846 --json headSha` answers the same with `success`.
`gh pr checks 30`: 41 pass, 1 skipping (promote, as on every pull request).

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `0f906f25cc652b9234529fda7bf13014621649fc` (short `0f906f2`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-09T07:40:58Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42578592846
```

Every job green: the sixteen lanes, smoke, email and repeat (MON-5 and MON-18 among their specs),
the bundle budget, and the staging E2E job. The lanes retry once, and I did not read the flake
ledger, so whether RP-8 or MLA-13 (§12) passed only on a retry is not stated here.

## 12. Limits

- **RP-8** (`e2e/admin-roles.spec.ts:376`) failed on both projects in the first whole run: after
  the Amharic pick, `<html lang>` stayed `en` for 15 s, while the profile's language was stored as
  `am` (the harness cleared `am → null` before the next test). It did not reproduce: RP-8 alone,
  2 passed; the spec whole again, 28 passed. Its body draws this turn's admin catalogue, but
  admin-monetisation's two Amharic switches and admin-roles' three others passed in the same runs.
  I could not find a cause in this turn's paths; CI judges.
- **MLA-13** (`e2e/my-listings-ad.spec.ts:1008`) failed on both projects: the price read 90100,
  not 90. The test clears the field with `Control+A`, which on macOS moves the caret to the line's
  start instead of selecting. So "90" was typed in front of the seeded 100, and Backspace deleted
  nothing. CI's Linux runners select all with that key. Not this turn's path; CI judges.
- NH-6 fails on this machine only (its time-zone database); actionlint and gitleaks are Linux
  binaries that cannot run here; their CI jobs judge.
- The dependency audit, the staging preflight and the merged e2e verdict run in CI only (§5).
- The live acceptance-doors check needs CI's catalogue; only its self-test ran here.
- Scratch kept for the operator to remove: `/tmp/ethio-scratch/p2-fold-c2b/` (the base and head
  build copies under `sizes/`, the spec logs under `e2e/`, the scripts named in this report).

## 13. Findings

- **The owner page's dead `plan` read.** `my-listing-page.tsx` read the plan through the seam and
  drew nothing from it; removed with the seam (stop 3; INC-1080 stays single-instance by that read).
- **MON-5's window.** Part (ii) refuses a reach row born without caps, and the editor sent none
  until the types patch. Between stop 3 and 0faa92cc8, MON-5 was red in every CI run. The stop-1
  census did not name it: a door's new refusal needs its caller's order in the census (AGENTS.md),
  and the editor's call came after the door.
- **The public-surface halves** (INC-1090, DEC-357). The file judge and the live lint disagreed on a
  dropped object; the file judge now learns drops from the one reader.
- **The grammar's limit.** A literal ending in a lone backslash is misread by the one-line-literal
  grammar (K2, ruled no change).
- **A local-only band crossing.** `/admin/listings` sat inside the band only with the local
  allowance (§10). A page 0.3–0.4 KiB under its ceiling in CI fails `bun run checks` locally,
  so a lane may meet a local FAIL that CI never shows.
- **Mac keyboard in specs.** `Control+A` as select-all (MLA-13) fails on any Mac run; a census of
  `Control+A` in `e2e/` would find its siblings (not run; outside scope).
- **Lint warnings.** `bun run lint` reports 46 warnings, none in this diff (e.g.
  `e2e/i18n-sign-in-language.spec.ts:193` an unused disable directive,
  `src/components/searchable-picker.tsx:34` react-refresh).

## 14. Records

Unnumbered here; the numbers in these texts are the supervisor's, from rulings 1, 3 and 4.

- DEC — DEC-356 — the product door's caps parameter (`p_caps jsonb`: NULL keeps, required at a
  reach row's birth, JSON null = no limit, whole numbers ≥ 1; `caps on level`); `listing_caps(uuid,
  character)` the one resolver of an ad's caps; the schema's plan-block shape the ONE caps shape on
  every door that answers an ad's caps, read by the one parser; the seller's door alone carries
  `caps` (staff lock steps 2 and 6). Amends ruling 1 §3 (shape, one door) and §7 (one parameter).
- DEC — DEC-357 — a grant whose object a later migration drops needs no allowlist line; the live
  lint's stale-line rule is the authority for dropped objects; drop knowledge comes from the one
  migration reader, functions and tables alike.
- INC — INC-1087 — `use-monetisation-names.ts` showed a product's key and a category's uuid to
  staff as names; fixed by two admin words.
- INC — INC-1088 — `promote-sheet.tsx:165` named a level outside the one chooser; fixed.
- INC — INC-1080 gains its second instance (the owner's ad page photo box, fixed in the same turn by
  the same reader).
- INC — INC-1089 — part (i)'s proof (b) compared a fragment spanning a line break against the
  chr(13)-stripped body; refused on the operator's paste, passed on the CLI (INC-1056's class,
  second occurrence; mechanism: the law of ruling 3 §2 and `spanningLiterals` in the migration
  guard).
- INC — INC-1090 — the public-surface guard's file judge and live lint disagree on a dropped object
  (mechanism: `droppedObjects` from the one reader; DEC-357).
- register row — an ad's caps → `listing_caps` → the migration proof + EW-7/MLA-19 → exceptions:
  `validate_listing_draft` (20261107125358 fragment f2b) composes the reach row itself through the
  same resolver — equal behaviour, not moved (a records question for the register, not a change
  now).
- register row — the migration reader → `scripts/conformance/migration-reader.ts` → MGR-1… →
  consumers: the eleven importers + perm-vocabulary; it gains `spanningLiterals`, `droppedObjects`
  and its two new consumers (`scripts/check-migrations.sh`, `scripts/public-surface.ts`).
- register row — the names hook → `src/features/admin-monetisation/use-monetisation-names.ts` →
  MNN-1…3 → a missing name is a word, never a key or an id (`marketName`'s raw code the one K2 left).
- register row — the plan concern (CF-PLAN-1, `plan-seam.ts`, `seller_plan` / `plan_caps` /
  `plan_photo_cap`, `coverage_plans`) retired: an ad's caps come from its level and reach rows
  through `listing_caps`.
- changelog — "2026-11-09 P-2 (c) c2b: the posting caps block and the plan seam retired
  (coverage_plans, plan_caps, plan_photo_cap, seller_plan, admin_set_coverage_plan dropped; the
  coverage permission gone); an ad's caps from the seller's door through listing_caps (INC-1080);
  step 6's no-limit state (INC-1084); the product editor's reach caps (DEC-356); admin_list_listings
  by the levels dictionary; the SQL reader in its own module; two names fixed (INC-1087, INC-1088)".
- changelog — "the migration guard refuses a compared literal that spans a line break (INC-1089);
  the public-surface file judge learns drops (DEC-357)".
- slip — the supervisor's slips of this turn (S560–S562 and any S557-style) are the supervisor's,
  recorded at the records turn; none is mine to write.

`origin/dev` is at f2d558467; this lane's base is cursor/p2-fold at d5d6796c4, not merged or
rebased. PR #30 stays a draft; c3 follows in a new chat.
