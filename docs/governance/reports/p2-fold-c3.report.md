# GO — P-2 turn (c), build turn c3 (the Promote sheet's Reach section; the housekeeping the plan placed here; the siblings c2a and c2b reported) — report

Base: 588690676 (cursor/p2-fold) · Final commit: 56caaf4ab (the last code commit; ec48d5b9b after it is one guide line) · Brief: docs/governance/briefs/p2-fold.md, with the c3 rulings docs/governance/briefs/p2-fold-c3-ruling-1.md … -3.md (ruling 2 sha256 18c23b238c019c41434963ed6246c9f035884121defbac598078555274941a8f, ruling 3 sha256 e6cd012a08ea606f29df8ec4fe901eecd9c1ba00aad52008000fc8f07b1b0785, the strings file sha256 749d6a48f732ff85c6688be77dc4520990543e759331e4ab719c22191a9b33e1, each checked on save)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on ec48d5b

CI: ec48d5b SUCCESS (run 42600307499, the last code commit's push; §11): 41 checks pass, promote
skipping. This report's own commit is never pushed to be judged again.

## 1. Done / not done, by part and step

| Ruling, part or step | State | Commit(s) |
| --- | --- | --- |
| Step 1: the census (stop 1) | done; ruling 1 | fde97fa9c |
| Part A: the Reach section (PMS-9…11, PMV-7, DRC-7, LVP-5; the scratch reach helper; LDR-7 re-pointed; `onDone(until, doneKey)`) | done | febbd07ba |
| B1: INC-1037, TBS-2's no-op `replace` | done | b9acee224 |
| B2: INC-1040, the reference-pick rule, its fixture and nine lines | done | 83d9d502c |
| B3: #431, the outbound check's two literal RegExps | done | 6b2855982 |
| B4: #432, the jobs core looked up before the claim (NCJ-13) | done | 9da5fd601 |
| B5: PR #11, the vocabulary's literal INSERT openers | done | 7fd1922ba |
| B6: INC-1083, the reader's computed marking (MGR-6, MGR-7); stop 2; ruling 2 (DEC-359): the seller-name law's file and live halves | done | 1fdbe43fe, 5efed5e8c, ebe681727 |
| B7: FE-13, the sweep's exact key set | done | 57093d5b6 |
| C1: the alias helpers at the fourteen waits and eight names | done | 2ba9000cc, 6fe20fc0d |
| C2: `marketName`'s word (MNN-4) | done | 9bb8ed6d4 |
| C3: `ControlOrMeta+A` and SAC-1 (INC-1091) | done | 12cbf9564 |
| D: the usage maps | done | 5f502e319 |
| E: M-3c-c (stop 3) | done; CLEAN on ethio-staging (ruling 3 §1) | 897fdf5b8, d96c341fe |
| Ruling 3 §3.1: the ten specs on ethio-staging | done; all green (§5) | — |
| Ruling 3 §3.2: THE CHECKS whole | done; 4 FAIL, the known Mac limits (§5) | — |
| Ruling 3 §3.3: the budgets | done; one ceiling moved (§10) | 56caaf4ab |
| Ruling 3 §3.4: the self-review and this report | done; one guide line from the review | ec48d5b9b, this commit |
| Ruling 3 §3.5: push, end the turn; PR #30 stays a draft | done at this push | — |

## 2. Files changed

`git diff --name-only 588690676` at ec48d5b9b (55 paths; this report adds the 56th):

```
.github/workflows/local-backend-proof.yml
docs/features/ci-guards.md
docs/features/e2e-harness.md
docs/features/hidden-seller-name.md
docs/features/my-listings.md
docs/generated/i18n-usage.json
docs/governance/briefs/p2-fold-c3-ruling-1.md
docs/governance/briefs/p2-fold-c3-ruling-2.md
docs/governance/briefs/p2-fold-c3-ruling-3.md
docs/governance/briefs/p2-fold-c3-strings.json
docs/governance/reports/p2-fold-c3.stop-1.md
docs/governance/reports/p2-fold-c3.stop-2.md
docs/governance/reports/p2-fold-c3.stop-3.md
e2e/admin-listings.spec.ts
e2e/admin-screening.spec.ts
e2e/feed-index.spec.ts
e2e/helpers/alias-check.ts
e2e/helpers/reach-rows.ts
e2e/my-listings-ad.spec.ts
e2e/my-listings-levels.spec.ts
e2e/my-listings-page.spec.ts
e2e/my-listings-promote.spec.ts
e2e/post-wizard-bundle2.spec.ts
e2e/post-wizard-place.spec.ts
public/i18n-usage.json
scripts/admin-tables.test.ts
scripts/check-migrations.sh
scripts/check-outbound-calls.ts
scripts/conformance/listing-levels-allowlist.txt
scripts/conformance/migration-reader.test.ts
scripts/conformance/migration-reader.ts
scripts/conformance/perm-vocabulary.ts
scripts/conformance/select-all-allowlist.txt
scripts/conformance/select-all.test.ts
scripts/conformance/seller-names.test.ts
scripts/conformance/seller-names.ts
scripts/conformance/wired.test.ts
scripts/fixtures/bad-real-pick-proof-example.sql
scripts/migration-real-row-allowlist.txt
scripts/route-budgets.mjs
src/features/admin-monetisation/use-monetisation-names.test.ts
src/features/admin-monetisation/use-monetisation-names.ts
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/my-listings-page.tsx
src/features/my-listings/promote-service.test.ts
src/features/my-listings/promote-service.ts
src/features/my-listings/promote-sheet.test.tsx
src/features/my-listings/promote-sheet.tsx
src/i18n/locales/am-admin.ts
src/i18n/locales/en-admin.ts
src/lib/door-codes.test.ts
src/lib/door-codes.ts
src/routes/api/public/jobs.test.ts
src/server/jobs/route.ts
supabase/migrations/20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql
```

New files (`git diff --name-only --diff-filter=A 588690676`, each `git ls-files --error-unmatch`
OK): the three rulings and the strings file, the three stop reports, `e2e/helpers/reach-rows.ts`,
`scripts/conformance/select-all.test.ts` and its allowlist, `scripts/conformance/seller-names.ts`,
`scripts/fixtures/bad-real-pick-proof-example.sql`, and the migration. Deleted: none
(`--diff-filter=D` is empty).

Every path is in ruling 1 §2's list, the standing allowance, ruling 2 (`seller-names.ts`,
`local-backend-proof.yml`, `wired.test.ts`) or ruling 3 §3.3 (`scripts/route-budgets.mjs`, §10).
The four `Control+A` specs (`admin-listings`, `admin-screening`, `my-listings-ad`,
`my-listings-page`) are the GO's INC-1091 sites.

## 3. Behaviour contract — before → after

| Surface | At 588690676 | Now |
| --- | --- | --- |
| `promote_options(uuid)` | `reaches` = every enabled **self-serve** reach row | every enabled reach row that is self-serve, or is the market's included reach, or is the ad's current reach (DEC-358); availability, `reach` head, levels loop, header, grants unchanged |
| Promote sheet | the Level section only | the Level section, then a Reach section from the same read: title and hint; one row per `reaches` row (current → "Current reach" with "Until {date}" for a bought one; `includedReach` → "Included"; below → "Not available"; `unknownReach` / `notOffered` → their reasons; the rest → **Choose reach**, `set_listing_reach`); "nothing wider" caption when none is choosable; exactly one current row per section (`LIST_ROW_CURRENT` + `aria-current`) |
| `parsePromoteOptions` | levels only; `reach` / `reaches` ignored | also requires the `reach` head (`included` a string) and every `reaches` row's shape and availability; any mismatch → null (the sheet's load error) |
| `promoteRefusalKey(error)`, `availabilityKey(a)` | the level's words | `(…, kind)`: the reach's own words for `unknownReach`, `sameReach`, `lowerReach`, `includedReach`, `notOffered` (→ `reachNotOffered`); the level's words for every other code |
| `setListingReach` | absent | calls `set_listing_reach(p_listing_id, p_reach_key)` only; `{ok, until}` or the refusal's key |
| `onDone` (the two callers) | `onDone(until)`; the notice "Level set until {date}." | `onDone(until, doneKey)`; the notice in the sheet's chosen words (level or reach) |
| `DOOR_CODES` | 21 codes | 25: the same plus `unknownReach`, `sameReach`, `lowerReach`, `includedReach` |
| `marketName` (`use-monetisation-names.ts`) | a market not in the open markets → its raw code | → "Market not known" (`admin.monetisation.market.unknown`) |
| `jobHandler` (`src/server/jobs/route.ts`) | signature → `job_run_claim` → `JOBS[job]` | signature → `ownValue(JOBS, job)` (a name it does not hold → the same constant 401, `[job-refused] unknown unknown_job`, nothing claimed) → `job_run_claim` → the core. The route's `JobParams` still refuses an unknown name at the boundary, so HTTP callers see no change |
| `check-outbound-calls.ts`, `perm-vocabulary.ts` | RegExps built from a key | the same patterns as literals; same findings (their tests unchanged and green) |
| `check-migrations.sh` | the real-row rule over its six tables | the same, plus the reference-pick rule from 20261102000000 (§7) |
| `migration-reader.ts` `lastDeclarations` | a template-built function kept its previous body | marked `computed`, body `""`; `COMPUTED_BY_HAND` names `attr_import_plan` |
| Seller-name law | `seller-names.test.ts` with its own regex over the files | the file census on the one reader, skipping computed functions with their reasons; the live judge on the smoke lane (DEC-359) |

The other consumers of the reader (door-answers, listing-designation, proof-readers, sql-writes,
status-map) read the twelve computed functions as empty bodies: 22 of 22 of their tests pass, and
the stop-1 simulation's "no finding changes" holds for them (stop 2). Everything else in the
touched files is as at the base, by the censuses of stops 1–3.

## 4. Censuses

Stop 1 (`docs/governance/reports/p2-fold-c3.stop-1.md`) holds the turn's census at 588690676 by
file:line; stop 2 corrects its template count (§13). Done at the end:

- `rg -n "post-who-alias-ok" e2e`: `e2e/helpers/alias-check.ts:24` (the state list) and `:136`
  (the helper's own wait); no bare wait remains (ruling 1 Q9).
- `rg -n '"Control\+(a|A|KeyA)"|`Control\+(a|A|KeyA)`' e2e`: none. `ControlOrMeta+A` by file:
  admin-listings 5, admin-screening 2, my-listings-ad 4 (one the local `typePhone`),
  my-listings-page 1, post-wizard-bundle2 1 and post-wizard-place 1 (the other two `typePhone`).
- The lazy sheet in first downloads (the head build's closures): `/my-listings` and
  `/my-listings_/$listingId` carry only `promote-sheet-lazy.js`, as at the base; `/l/$slug` carries
  none of `promote`, `door-codes` or `reach`. Same chunk counts as the base (99, 102, 92).
- The pages carrying `door-codes.js`: `/auth`, `/auth_/callback`, `/auth_/reset`, `/settings`
  (stop 1, `all-pages.mjs`).

## 5. Tests

Added: PMS-9, PMS-10, PMS-11 (the sheet), PMV-7 (the service), DRC-7 (the door codes), LVP-5 (e2e),
MGR-6, MGR-7 (the reader), MNN-4 (the names hook), NCJ-13 (the jobs route), SAC-1 (the select-all
census), SPA-10d (the live judge). Changed, each named in its stop:

- PMS-7 becomes "exactly one current row per section": its exact `toEqual` over
  `[aria-current="true"]` is now `[level row, reach row]` (ruling 1 Q5).
- PMV-3, PMV-4 and PMV-6 pass a kind. PMV-4's exact list gains the reach's codes, and asserts
  that the level's kind never takes them. PMV-2 also refuses a missing or malformed reach.
- PMS-4's `onDone` assertion gains the done key.
- LDR-7 reads the scratch reach rows from `e2e/helpers/reach-rows.ts`. Its exact list is
  unchanged in meaning (ruling 1 Q7).
- FE-13 is now an exact `Object.keys(…).sort()` `toEqual` over the sweep's nine keys.
- SPA-10a/c read the reader. SPA-10a prints each computed name with its reason, and SPA-10c gains
  the computed-line and stale-line cases.
- TBS-2 loses its no-op `replace` (INC-1037).

Red first:

- MNN-4 against the old `return code;`.
- SAC-1 on a planted file: three presses found, while `ControlOrMeta+A` and `Control+Enter`
  passed. On the tree: 11 presses in 4 files, then green.
- The live judge with `readsName` blinded: two "self-test FAILED" lines, exit 1.
- The reference-pick rule's planted fixture refused, its scratch-keyed pick passed.
- MGR-6 on planted stale lines.

Unit totals on the final code tree (56caaf4ab), inside THE CHECKS:

- `scripts/` first: 503 passed, 1 failed of 504 (99 files); the red is NH-6.
- Component tests: 2861 passed, 1 failed of 2862 (457 files); the red is NH-6.
- `bun run typecheck`: `tsc --noEmit`, exit 0.

THE CHECKS (`bun run checks`, whole, on 56caaf4ab's tree):

```
checks (fast): 17 PASS · 4 FAIL · 272s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)
checks: 24 PASS · 4 FAIL · 30 NOT RUN · 327s
```

- **The four FAILs** are the known Mac limits:
  - `laws-first › scripts/ tests first` and `component-tests` each fail only NH-6 (this machine's
    time-zone database).
  - `Workflow lint (actionlint, pinned)` and `Secrets scan (gitleaks, pinned)` fetch
    `actionlint_1.7.7_linux_amd64` and `gitleaks_8.24.3_linux_x64` (checksums OK), Linux x86-64
    ELF binaries that cannot run here. CI's Workflow lint job judges the edited
    `local-backend-proof.yml` (§11).
- **The NOT RUNs:**
  - the steps after a failed step in their job: laws-first's changed-folder tests and
    changed-file Semgrep; build-and-check's typecheck, format check, lint, e2e selector self-test,
    root route names, build and bundle report;
  - the dependency installs (a package change is its own turn);
  - the dependency audit (the advisory service is not reachable);
  - the e2e preflight (staging credentials);
  - the e2e merge job (GitHub artifacts);
  - promote (CI only);
  - the SARIF upload (GitHub only).
- **The skipped build-and-check steps, run by hand on the same tree:**
  - `bun run format:check`: "All matched files use Prettier code style!".
  - `bun run lint`: 0 errors, 46 warnings in 29 files, none of them in this diff (a `comm` of the
    warned files against §2's list is empty).
  - `e2e-select.ts --self-test`: "e2e-select self-test OK: every spec is reachable; every area glob
    matches."
  - `check-root-routes.ts --self-test`: "12 allowed, 5 refused"; the real run: "61 entries; every
    root segment is safe."
  - `bun run build`: exit 0.
  - Semgrep's own job passed ("Scan (counts only)").
- **The budget inside THE CHECKS:** `PASS bundle-budget › the NEAR band (R4) — 0 NEAR, none grew`.

THE BROWSER CHECK, against ethio-staging after the mark (the three E2E names set, checked by name),
each spec whole and alone, both projects, `E2E_RETRIES=0`, `E2E_WORKERS=1`, through
`bun run e2e:local`:

| Spec | Result |
| --- | --- |
| my-listings-promote (LVP-1…5) | 10 passed |
| my-listings-levels (LDR-7) | 28 passed |
| my-listings-ad (MLA-13 among them) | 38 passed |
| sage-ad-page | 10 passed, 8 skipped (its own `test.skip` by width, `sage-ad-page.spec.ts:91`) |
| post-wizard-place | 40 passed |
| post-wizard-bundle2 | 70 passed |
| admin-listings (`ControlOrMeta+A`) | 76 passed |
| admin-screening (`ControlOrMeta+A`) | 54 passed |
| feed-index (FE-13) | 30 passed |
| my-listings-page | 16 passed |

372 passed, 0 failed, 8 skipped. `[ssr-error]` lines: 0 in each of the ten logs. MLA-13, red in
c2b on this Mac because the bare `Control+A` does not select there, passes now (INC-1091).

J-audit (`e2e/**` changed):

- LVP-5's market, ad and three reach rows are its own scratch rows (`seedScratchReaches` with
  the included row not self-serve, `e2e_lvl_r` keys), removed after the market that names one. No
  real row is read as a fixture; the one real read is the top reach sort, used only to place the
  scratch rows above it (its `listing-levels-allowlist.txt` line).
- The refusals prove nothing was written: the row, its revisions and its audits are traced before
  and after.
- Locators are scoped to the sheet or to a row's test id. The added lines have no `.first()`, no
  `waitForTimeout` and no `test.only` (a grep of the diff's 1556 added lines).

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "new RegExp\(\`" scripts src` (the interpolated RegExps), `rg -n "marketName"
src/features`, `rg -n "typePhone" e2e`, `rg -n "declarationsOf" scripts/doors`, and
`set_listing_reach`'s body at 20261104153959.

- `scripts/doors/rows.ts:137`, `:139`: Semgrep #443 and #445 (detect-non-literal-regexp). The tree
  has 99 interpolated RegExps (stop 1 §8); only #431's and PR #11's sites were this turn's.
- `src/features/admin-screening/screening-page.tsx:184–186` and
  `src/features/admin-listings/listings-page.tsx:202–204`: byte-identical `marketName` copies, each
  still answering a raw code for a missing market.
- The three byte-identical local `typePhone` copies (`my-listings-ad.spec.ts:171`,
  `post-wizard-bundle2.spec.ts:83`, `post-wizard-place.spec.ts:89`), already on `ControlOrMeta+A`.
- `scripts/doors/catalogue.ts` and `judge.ts` read per-file `declarationsOf`, so they read stale
  bodies for the computed doors. `check-doors --live` is the authority (ruling 1 Q6).
- `set_listing_reach` (20261104153959 :59–64) resolves `coalesce(v_row.reach,
  v_market.included_reach)` inline rather than through `listing_effective_reach`.

## 7. Allowlists and guards

Counts are non-comment lines.

| File | Before → after | Change |
| --- | --- | --- |
| `scripts/migration-real-row-allowlist.txt` | 43 → 52 | nine reference-pick lines (eight files), reason "landed before the rule; applied on both databases (INC-1040)", until `INC-1040` (ruling 1 Q8) |
| `scripts/conformance/listing-levels-allowlist.txt` | 2 → 3 | `reader:e2e/helpers/reach-rows.ts` — the one e2e seeder of scratch reach rows (LDR-7, LVP-5) — until `DEC-358` |
| `scripts/conformance/select-all-allowlist.txt` | new → 0 | the header only (SAC-1) |
| `scripts/conformance/seller-names-allowlist.txt` | 17 → 17 | unchanged; `validate_listing_draft`'s line is judged live (ruling 2) |
| `scripts/route-budgets.mjs` | 113 pages | `/admin/screening` 373 → 374 (§10) |

Guards and their self-tests:

- **The reference-pick rule** (`REAL_PICK_FLOOR=20261102000000`) in `check-migrations.sh`: its
  planted fixture is refused and the scratch-keyed pick passes; "Real-row proof guard OK".
- **The reader:** MGR-6 (a stale hand-listed name fails) and MGR-7 (planted templates, and the
  tree's exact twelve computed functions).
- **SAC-1**, a `.test.ts` census on `kit.ts`.
- **The live seller-name judge:** its self-test runs before anything is judged, and
  `wired.test.ts` names `bun scripts/conformance/seller-names.ts --live `. CI's first smoke run:
  "seller-names self-test OK: an unexcused live reader fired, an excused one did not, a line for a
  function not live was stale" and "seller-names live OK: 17 live readers, each excused by
  seller-names-allowlist.txt".
- **THE CHECKS:** `migration-lint` PASS.

## 8. Strings

One key added (a key-by-key comparison of the six layer files at the base and now; no value changed
in place), copied from `p2-fold-c3-strings.json` by script; no Amharic is mine.

| Key | EN | AM |
| --- | --- | --- |
| `admin.monetisation.market.unknown` | Market not known | ገበያው አይታወቅም |

The twelve reach keys the sheet now draws (`myListings.promote.reach.{title,hint,current,included,
choose,done,empty}`, `myListings.promote.error.{sameReach,lowerReach,unknownReach,includedReach,
reachNotOffered}`) landed in c1 and are unchanged. Both usage maps were regenerated
(`bun run i18n:usage`: 1864 keys across 682 files), and THE CHECKS' drift step passed.

## 9. Migrations

| File | sha256 | Mark |
| --- | --- | --- |
| `20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql` (M-3c-c) | `49effe864afcd2e4afdee00f4aeb2c3903bd78a5f1e257de2724d340198a0161` | 20261109110000 |

```
apply a63f48fe → expect mark 20261109110000
```

`promote_options(uuid)` is redeclared whole. The pre-check reads the live md5 `b9ad1f23…` and the
mark 20261109070400, and the new md5 is `a434782e…`. Only the reach filter changed. The proofs (a)
to (e) run on scratch rows under the sentinel; stop 3 describes them. The operator applied it to
ethio-staging, and the supervisor read it back CLEAN (ruling 3 §1): mark present and newest, md5
equal, filter as declared, anon refused, no scratch row left. No types patch: the return stays
`jsonb`. The file has not changed since stop 3. `bun run db:proof --fresh` on the final tree:

```
db:proof PASS — applied 437/437, CLI 2.120.0, cold, 50 s
```

## 10. Departures

Rulings in this turn:

- ruling 1: the census accepted, the eleven answers, and M-3c-c;
- ruling 2: the seller-name law's two halves (DEC-359);
- ruling 3: CLEAN, and the end of the turn.

Stops: stop 1 (QUESTION, the census), stop 2 (QUESTION, `validate_listing_draft`'s template), stop 3
(MIGRATION).

- **`/admin/screening` 373 → 374.** Ruling 3 §3.3 names `/my-listings`, `/my-listings_/$listingId`,
  `/l/$slug` and the four auth pages, and allows a ceiling to move "only by DEC-296's form with its
  cause". The local check failed `/admin/screening` inside the NEAR band:
  - It read 372.61 KiB at the head against 372.59 at the base; with the 0.1 local allowance that
    left 0.29 KiB below 373.
  - No source file in that page's closure changed. The entry's own name moved
    (`index-B2Dgp-Be.js` → `index-jlL15nna.js`) because its dependency map names this turn's
    changed chunks.
  - Every chunk importing the entry carries the new name: +17 B across 30 of the page's 123
    chunks, none above 5 B, with `index.js` itself −5 B.
  - CI measured 372.6 against 373 and passed it (§11), as c2b's `/admin/listings` case was passed.
  - Rule 10 asks that every page a change leaves in the band be raised in the same turn
    (INC-1031), so it moved by `ceilingForLocal(372.6)` = 374, with that cause on its line.

  For the ruling: keep it, or take it back to 373 and let CI judge.
- **The guide line `docs/features/ci-guards.md`** names the reader's computed marking and
  `COMPUTED_BY_HAND` (ec48d5b9b). The self-review found no feature guide naming it, and rule 10
  asks a structural change to update its guide.
- **The jobs refusal's line** reads `[job-refused] unknown unknown_job`: ruling 1 Q10's
  `[job-refused] unknown`, then the reason word the existing `logRefusal` always prints.
- **NCJ-13, not NCJ-10** (§13).
- Made at stops 1–3 and reported there: Q7's helper takes the included reach's self-serve flag;
  B6's self-test reports through FAILED lines instead of throwing; the C1 names follow-up commit.

The self-review's three MINORs (rule 80, over `git diff 588690676..ec48d5b9b`; none BLOCKER or
MAJOR, the one MAJOR found, the missing guide line, fixed in ec48d5b9b), left as they are:

- MINOR (banned-pattern read): `templateDeclarationsOf` in `migration-reader.ts` defaults a regex
  match's index with `match.index ?? 0` at two new sites, beside the five c2b named. A `matchAll`
  match always has an index, and this is no identity, geography or screening path.
- MINOR (behaviour): `jobHandler`'s params type widened from `JobName` to `string`, so the
  handler's own lookup can refuse. The route's `JobParams` still refuses an unknown name first;
  only NCJ-13, calling the handler directly, reaches the new refusal.
- MINOR (tests): LVP-5 proves the included non-self-serve reach is named on ethio-staging and on
  CI's temporary backend; no unit test can, since the filter lives in the door (proofs (c)–(e) of
  M-3c-c prove it in SQL).

### The budgets (ruling 3 §3.3)

The base is `git archive 588690676` in `/tmp/ethio-scratch/p2-fold-c3/sizes/base`, the head
`git archive` of a781e99ba (the code of 897fdf5b8; nothing in `src/` changed after it) in
`…/sizes/head`. Each ran `bun run build` with this tree's `node_modules` (lockfile unchanged, so
lock-exact), then `node scripts/check-bundle-size.mjs` and the per-page closure dump
(`chunks.mjs`, `diff.mjs`).

| Page | Base → head (local, KiB gzipped) | Change by chunk | CI (d96c341fe) / ceiling |
| --- | --- | --- | --- |
| `/my-listings` | 321.82 → 321.82 | `my-listings.js` +0.006 (the `onDone` key) | 321.8 / 323 |
| `/my-listings_/$listingId` | 329.78 → 329.78 | none ≥ 0.005 | 329.8 / 331 |
| `/l/$slug` | 263.69 → 263.69 | none ≥ 0.005 | 263.7 / 265 |
| `/auth` | 229.63 → 229.65 | `door-codes.js` +0.018 (the four reach codes, DEC-355) | 229.6 / 231 |
| `/auth_/callback` | 216.07 → 216.08 | `door-codes.js` +0.018 | 216.1 / 217 |
| `/auth_/reset` | 218.01 → 218.03 | `door-codes.js` +0.018 | 218.0 / 219 |
| `/settings` | 283.22 → 283.23 | `door-codes.js` +0.018 | 283.2 / 284 |
| `/admin/monetisation` | 337.54 → 337.55 | `admin.monetisation.js` +0.011 (MNN-4's key) | 337.5 / 341 |
| `/admin/screening` | 372.59 → 372.61 | the hash-name churn above | 372.6 / 373 → 374 |

- The lazy sheet's own chunk (`promote-sheet-*.js`) grew on demand, 2.33 → 2.83 KiB gzipped, and is
  in no first download (§4).
- No auth page's ceiling moved: each is 0.8 KiB or more clear.
- No page is 8 KiB or more under its ceiling (an awk over the head's page lines found none), so
  nothing ratchets.

## 11. CI

The base's CI (read at the turn's start, two-step SHA check). The raw ci-status.md named
588690676, FAILURE (run 42581039358): GitHub 504s fetching tools on a report-only commit, as the GO
stated. The code was judged on 0f906f25c (run 42578592846, SUCCESS, every job, Flaky 0).

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `588690676bd6a01ba62af361b54ff27cd48384c2` (short `5886906`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-09T08:05:31Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42581039358
```

No red of an earlier turn stood. This pull request's own runs:

- **fde97fa** (run 42584027580, stop 1): SUCCESS.
- **5efed5e** (run 42587592780, stop 2): FAILURE.
  - "i18n used-on map is fresh": the maps were stale before part D, fixed by 5f502e319.
  - Lanes 5 and 13 failed at "Run proof lane failure", one failed test each. The failed-step log
    holds only the lane's verdict ("1 failed"); the test body is not in it and I did not read it.
    Ruling 3 §2 names it: LVP-5, before M-3c-c existed on that push. Both lanes passed on the next
    push, which carried the migration.
- **d96c341** (run 42590473841, stop 3): FAILURE, the preflight alone: "STAGING BEHIND: apply
  20261109085715_a63f48fe-4697-44f3-954c-494f44aacd72.sql to ethio-staging before E2E can pass"
  (class (a), rule 40, the migration stop). Every other job passed:
  - local-backend-proof: the sixteen lanes, smoke, email and repeat each applied 437/437, 2806
    passed, Failed 0, Flaky 0;
  - the smoke lane's live seller-name judge printed "seller-names live OK: 17 live readers, each
    excused by seller-names-allowlist.txt";
  - the bundle budget passed, reading `/admin/screening` at 372.6 / 373.

  No rerun was asked.

The last code commit's push (ec48d5b9b, carrying 56caaf4ab):

Two-step SHA check: the raw ci-status.md names ec48d5b9b, and `gh run view 42600307499 --json
headSha` answers the same with `success`. `gh pr checks 30`: 41 pass, 1 skipping (promote, as on
every pull request).

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `ec48d5b9b623e74b2bc167a64289f6f9773c33af` (short `ec48d5b`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-09T10:44:11Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42600307499
```

Every job is green:

- the staging preflight and the staging E2E job (ethio-staging holds the mark);
- local-backend-proof's nineteen lanes, each applied 437/437: TOTAL 2806 passed, 0 failed, 0
  flaky, 402 skipped (e2e-last-failure: "last E2E run 42600307499 passed");
- the smoke lane's live judge: "seller-names self-test OK: an unexcused live reader fired, an
  excused one did not, a line for a function not live was stale" and "seller-names live OK: 17
  live readers, each excused by seller-names-allowlist.txt";
- the bundle budget: `/admin/screening` 372.6 / 374, "Bundle budget OK.";
- the step "Build, typecheck, lint › Workflow lint (actionlint, pinned)" (success), which judges
  the edited `local-backend-proof.yml`, and the "Gitleaks secrets scan" job.

No rerun was asked in this turn.

## 12. Limits

- NH-6 fails on this machine only (its time-zone database). actionlint and gitleaks are Linux
  binaries that cannot run here, so their CI jobs judge; the edited workflow is linted only by
  CI's Workflow lint job.
- The dependency audit, the staging preflight and the merged e2e verdict run in CI only (§5).
- Lanes 5 and 13's failing test body on 5efed5e (§11) was not read: the failed-step log does not
  carry it.
- The browser runs needed two environment fixes, neither a code change. Playwright cannot read the
  CPU model inside the sandbox ("Failed to get CPU information"), so the runs went outside it. The
  sandbox's `PLAYWRIGHT_BROWSERS_PATH` pointed at an empty cache, so it was set to the installed
  `~/Library/Caches/ms-playwright`.
- The live judge's local proof was a simulation on file bodies (17 readers). Its CI proof is the
  smoke line in §11.
- Scratch kept for the operator to remove: `/tmp/ethio-scratch/p2-fold-c3/`. It holds the base and
  head build copies under `sizes/`, the spec logs under `e2e/`, the CI logs read, and the scripts
  named in the stop reports, plus the stray empty `/tmp/ethio-scratch-sn.ts` (stop 1).

## 13. Findings

- **Census correction: NCJ-13.** My stop-1 census named NCJ-10 as free; it was taken, so the jobs
  test is NCJ-13 (9da5fd601).
- **Census correction: eleven templates.** My stop-1 census counted ten template-built functions.
  It grepped `CREATE OR REPLACE FUNCTION` inside `format(` and missed the plain `CREATE FUNCTION`
  of `validate_listing_draft` (20261107125358:78). The seller-name census then lost a live reader,
  answered by ruling 2's live judge (DEC-359).
- **INC-1092: the included reach was not self-serve.** On the real catalogue the included reach
  (`city`) is enabled and not self-serve, so `promote_options` left it out of `reaches`. Every
  fresh ad's sheet had no current reach to name. The census found it before any screen shipped,
  and M-3c-c fixed it (DEC-358).
- **A local-only band crossing from hashed names.** A change to any chunk renames the entry, and
  every chunk importing it then carries the new name. A page whose source did not change can move
  by tens of bytes and cross the local NEAR band while CI passes it. That happened on
  `/admin/screening` (§10), the second such case after c2b's `/admin/listings`.
- **The sandbox and the browser.** `bun run e2e:local` cannot start inside the sandbox
  (`os.cpus()` is refused), and the sandbox's `PLAYWRIGHT_BROWSERS_PATH` names an empty cache. A
  lane that does not know this reads ten instant reds as test failures (§12).
- **Lint warnings:** 46 in 29 files, none in this diff; the GO assigns them to the housekeeping
  turn.

## 14. Records

Unnumbered here; the numbers in these texts are the supervisor's, from rulings 1–3.

- DEC — DEC-358 — `promote_options` lists the ad's current reach and the market's included reach
  whether or not they are self-serve; the list is the one place the sheet names a reach (amends
  DEC-349/DEC-351's loop).
- DEC — DEC-359 — the seller-name law has two halves:
  - the file census (`scripts/conformance/seller-names.ts` through `seller-names.test.ts`) reads
    the one migration reader and skips a computed function by name with its reason;
  - the live judge (`seller-names.ts --live-query` / `--live <tsv>`, its self-test first) runs on
    the smoke lane after the door guard and judges every live body against the same two helpers
    and the same allowlist.

  A computed function's allowlist line is judged live and is never stale on the file side. First
  smoke run (d96c341fe, run 42590473841): "seller-names live OK: 17 live readers, each excused by
  seller-names-allowlist.txt".
- INC — INC-1091 — `Control+A` as select-all in `e2e/` is not select-all on macOS. A local run
  types in front of the stored value (MLA-13, c2b). The fix: 11 presses in 4 files became
  `ControlOrMeta+A`; SAC-1 refuses the bare chord under `e2e/`; the harness guide states the law.
- INC — INC-1092 — the included reach `city` is not self-serve, so the sheet had no current reach
  to name on every fresh ad (found by the census, before any screen shipped). Fixed by M-3c-c
  (DEC-358).
- INC — INC-1083 gains DEC-359. The reader marks template-built functions computed
  (`COMPUTED_BY_HAND` holds `attr_import_plan`). The seller-name law judges them live.
- register row — the reach surface on the Promote sheet → `src/features/my-listings/promote-sheet.tsx`
  (the Reach section), `promote-service.ts` (`parsePromoteOptions`' `reach` / `reaches`,
  `setListingReach`, `promoteRefusalKey(error, kind)`), `promote_options` as amended (DEC-358) →
  PMS-9…11, PMV-7, DRC-7, LVP-5, LDR-7 → the scratch reach rows from `e2e/helpers/reach-rows.ts`.
- register row — the select-all chord → `ControlOrMeta+A` in every e2e press →
  `scripts/conformance/select-all.test.ts` SAC-1 (allowlist `select-all-allowlist.txt`, empty) →
  `docs/features/e2e-harness.md` (INC-1091).
- register row — the reader's `computed` marking and `COMPUTED_BY_HAND` →
  `scripts/conformance/migration-reader.ts` (`templateDeclarationsOf`, `lastDeclarations`,
  `staleComputedByHand`) → MGR-6, MGR-7 → consumers inherit the empty body; the seller-name law
  skips by name and judges live; `scripts/doors/catalogue.ts` / `judge.ts` stay K2 with
  `check-doors --live` the authority.
- register row — the seller-name law's live half → `scripts/conformance/seller-names.ts --live` on
  the smoke lane of `.github/workflows/local-backend-proof.yml` (step "Seller-name judge, live
  (DEC-359)") → its self-test and SPA-10d → `wired.test.ts` names its caller (DEC-359, INC-1083).
- changelog — "P-2 (c) c3: the Promote sheet's Reach section; INC-1037, INC-1040, INC-1083, FE-13,
  #431, #432, PR #11's regex; the alias helpers everywhere; ControlOrMeta+A (INC-1091); a missing
  market name is a word; promote_options lists the ad's current reach (DEC-358); the seller-name law
  judged live (DEC-359)".
- K2 — the Semgrep sites #443/#445 (`scripts/doors/rows.ts:137`, `:139`) and the 99 interpolated
  RegExps; the `marketName` copies (`screening-page.tsx:184–186`, `listings-page.tsx:202–204`); the
  three `typePhone` copies; `catalogue.ts` / `judge.ts`'s stale bodies for computed doors;
  `set_listing_reach`'s inline `coalesce(v_row.reach, v_market.included_reach)`.
- slip — S565 is the supervisor's (ruling 1 §5), recorded at the records turn; none is mine to
  write.

`origin/dev` is at f2d558467; this lane's base is cursor/p2-fold at 588690676, not merged or
rebased. PR #30 stays a draft until the supervisor says READY.
