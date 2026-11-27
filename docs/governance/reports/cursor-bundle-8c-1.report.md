# CURSOR BUNDLE 8c-1 — the user-facing list and its guard; three checks that judge a turn's text; the Errors pages' weight, entry guard and browser tests — report

Base: f4775290e · Final commit: 67812bacf · Brief: docs/governance/briefs/cursor-bundle-8c-1.md (sha256 fdb6baaf513fb7f321a6dc952327e7506ebd7e297fa1c67ee812a114194f87df)
Review: Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on 67812ba

CI at the start: f4775290e — SUCCESS (run 46057881592, `ci-status.md` on `ci-evidence`, read by `git show origin/ci-evidence:docs/tracking/ci-status.md` after `git fetch origin dev main ci-evidence`; `origin/dev` was still `f4775290e` at the end of the turn).

## 1. Done / not done, by part and step

- **STEP 0** (`dc212b4ab`): the brief saved byte for byte (sha256 above, compared), the census copy (`docs/governance/census/user-facing-8d64790.md`, sha256 `627133f0…fd0fd8` = the manifest header's), the two data files copied unedited (sha256 `225ba44d…2dbc7` and `6915c990…2d8721`, equal to `expected.txt`), line 3 of `roadmap.md`.
- **Part A** (`a559516da`): CF-BRIEF-25 (S822) and CF-BRIEF-26 (S817) with planted fixtures, run by `check-go.ts`; the `whole-app-calls` census item in `docs/governance/go-template.md` (read by CF-BRIEF-15); INC-1332 in `scripts/ci/lovable-branch-guard.sh`; CF-LVB-23 on pull request #119's patch and CF-LVB-24 on the refused forms; both named in `wired.test.ts`. CF-LVB-23 and CF-LVB-24 red against the base script (below).
- **Part C** (`fcd120cc0`, done before Part B — see §10): INC-1329 (`DEVICES`/`Device` to `src/lib/error-clean.ts`; the two ceilings 268 → 246 and 267 → 245, §3), INC-1330 (`ADMIN_MODULE` widened, BC-18 red first, the address reader moved with its test and the two deletion lines), INC-1331 (`e2e/admin-errors.spec.ts` ERB-1 and ERB-2, FCR-79 and FCR-80, the two `| INC-1331` allowlist lines out, the spec in the `error-reports` e2e area).
- **Part B** (`bdc460ffc`, `67812bacf`): the reader `scripts/conformance/user-facing.ts`, the census `user-facing.test.ts` (CF-UF-1…5 and CF-UF-5b), the caller in `wired.test.ts`, `docs/features/user-facing-list.md`, the two temporary CF-BRIEF-20 lines out of `briefs-allowlist.txt`; STEP 5's docs (`ci-guards.md`, `e2e-harness.md`, `error-reports.md`, `failure-crawl.md`) landed in the same commit.
- **STEP 4a** (`48bbb64e2`): the GHSA-fc5q-39xc-vjpf line keeps its id and reason byte for byte, `until 2026-12-11 | DEC-495`; AGX-9 pins `DEC-495`. `npm view picomatch version` answered 4.0.7 (latest) on this turn, so no fixed release had shipped.
- **STEP 6** the gate, **STEP 8** the self-review, **STEP 9** the push and pull request #120: done. **STEP 7 / 10** CI: §11.
- Not done: nothing the brief asked is left. The census owes rows (§7) are the brief's own debt, not a part.

## 2. Files changed

`git diff --name-only f4775290e..67812bacf` (41 files; the report is the one file after it):

```
docs/features/ci-guards.md
docs/features/e2e-harness.md
docs/features/error-reports.md
docs/features/failure-crawl.md
docs/features/user-facing-list.md
docs/governance/briefs/cursor-bundle-8c-1.md
docs/governance/census/user-facing-8d64790.md
docs/governance/go-template.md
docs/tracking/intentional-deletions.txt
e2e/admin-errors.spec.ts
e2e/helpers/crawl-fixtures.ts
e2e/helpers/crawl-pages.ts
roadmap.md
scripts/audit-exceptions.txt
scripts/audit-gate.test.ts
scripts/brief/check-go.ts
scripts/brief/go-laws.ts
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/ci/lane-weights.json
scripts/ci/lovable-branch-guard.sh
scripts/ci/lovable-branch-guard.test.ts
scripts/conformance/briefs.test.ts
scripts/conformance/failure-crawl-allowlist.txt
scripts/conformance/user-facing-allowlist.txt
scripts/conformance/user-facing-manifest.txt
scripts/conformance/user-facing.test.ts
scripts/conformance/user-facing.ts
scripts/conformance/wired.test.ts
scripts/e2e-select.ts
scripts/fixtures/lovable-branch-guard-pr-119-route-budgets.patch
scripts/route-budgets.mjs
src/features/admin-errors/error-labels.ts
src/features/admin-errors/errors-service.ts
src/lib/error-clean.ts
src/lib/error-report-send.ts
src/lib/errors-search.test.ts
src/lib/errors-search.ts
src/lib/schemas/error-report.ts
src/routes/admin.errors.tsx
src/routes/admin.errors_.$group.tsx
```

New files (`git ls-files --error-unmatch` on each, 11 found): `docs/features/user-facing-list.md`, `docs/governance/briefs/cursor-bundle-8c-1.md`, `docs/governance/census/user-facing-8d64790.md`, `e2e/admin-errors.spec.ts`, `scripts/conformance/user-facing.ts`, `scripts/conformance/user-facing.test.ts`, `scripts/conformance/user-facing-manifest.txt`, `scripts/conformance/user-facing-allowlist.txt`, `scripts/fixtures/lovable-branch-guard-pr-119-route-budgets.patch`, `src/lib/errors-search.ts`, `src/lib/errors-search.test.ts`. Deleted (declared with `[intentional-delete]` and two lines in `docs/tracking/intentional-deletions.txt`): `src/features/admin-errors/errors-search.ts`, `src/features/admin-errors/errors-search.test.ts` (git shows them as renames to `src/lib/`). Two files are outside the brief's SCOPE: `e2e/helpers/crawl-fixtures.ts` and `scripts/ci/lane-weights.json` (§10).

## 3. Behaviour contract — answer tables before → after

No route, door or screen answers differently.

| Piece | Base | Now |
| --- | --- | --- |
| `DEVICES`, `Device` | exported by `src/lib/schemas/error-report.ts:10` (with zod) | exported by `src/lib/error-clean.ts:19`; the schema imports them (`error-report.ts:3`, `:38`); readers: `errors-service.ts:4`, `error-labels.ts:2`, `error-report-send.ts:7` |
| `errorsSearch`, `ERROR_WINDOWS`, `DEFAULT_WINDOW` | `src/features/admin-errors/errors-search.ts` (in the entry) | `src/lib/errors-search.ts`, same code; ERP-9 keeps its id in `src/lib/errors-search.test.ts` |
| `ADMIN_MODULE` | `/^src\/features\/admin\//` | `/^src\/features\/admin(?:-[a-z0-9][a-z0-9-]*)?\//` |
| Lovable branch guard, ceilings file | any added or removed empty line refused | an added empty line admitted only beside a new route line (one per line), a removed one only beside a removed route line; every other line as before |
| `/admin/errors`, `/admin/errors/$group` first download (local build, `check-bundle-size` scratch copy with three digits, §5) | 267.196 and 265.847 KiB, ceilings 268 and 267 | 245.092 and 243.740 KiB (−22.104, −22.107), ceilings 246 and 245 = `ceilingForLocal` |

First download of every other page, base → now (local, KiB): each fell by 0.025 to 0.079 (the address reader left the entry), e.g. `/` 228.455 → 228.415, `/post` 410.804 → 410.727, `/admin/listings/$listingId/edit` 423.258 → 423.179, `/auth` 224.825 → 224.797; no page rose, so none entered a NEAR band (`bundle-budget › the NEAR band (R4)`: `0 NEAR` in `bun run checks`). The full 52-page table is in `/tmp/ethio-scratch/cursor-bundle-8c-1/sizes-base.json` and `sizes-c.json`.

## 4. Censuses

- `rg -n "DEVICES|type Device|errors-search"` over `src/`, `e2e/`, `scripts/` (ceiling-file comments and the patch fixture aside): `src/lib/error-clean.ts:19-20`, `src/lib/schemas/error-report.ts:3,38`, `src/lib/error-report-send.ts:7`, `src/features/admin-errors/error-labels.ts:2-3,5`, `src/features/admin-errors/errors-service.ts:4,103`, `src/routes/admin.errors.tsx:6`, `src/routes/admin.errors_.$group.tsx:6`, `src/lib/errors-search.test.ts:4`, `scripts/e2e-select.ts:262`, `scripts/bundle-closure.test.ts:394,414`. No reader of the old path is left; typecheck is the proof for the rest.
- Every list a new name joins: the e2e area (`scripts/e2e-select.ts:251`, the `error-reports` area now holds `src/features/admin-errors/**`, `src/lib/errors-search.ts`, the two route files and `e2e/admin-errors.spec.ts`; `bun run checks`: `PASS build-and-check › e2e selector self-test`); the lanes' weights (`scripts/ci/lane-weights.json`, CF-LANES-2 failed without the new spec's entry); the crawl's rows (`e2e/helpers/crawl-pages.ts`, FCR-79 and FCR-80, 60 rows now; `docs/features/failure-crawl.md` says so); test-id prefixes `ERB-` and `CF-UF-`: the scripts suite (870 passed) holds the test-id law.
- Whole-app calls (`whole-app-calls`): the crawl gains FCR-79 and FCR-80 (mobile project only, as every row); ERB-1 seeds its own reports with the service client, never through the browser sender; no shared hook, component or helper gained a side effect.
- Callers of the widened guard: `scripts/check-bundle-size.mjs` (BC-16's run on the build's own record; "Admin code in the entry's closure: 0 module(s)") and `scripts/bundle-closure.test.ts` BC-16 and BC-18. On the base build the widened pattern named `src/features/admin-errors/errors-search.ts` in `index-CFEXMQDl.js` (red, `/tmp/ethio-scratch/cursor-bundle-8c-1/bc16-real-red.txt`); on the final build: 0.
- Every `src/features/admin*` folder in the tree is under the pattern (BC-18 plants a module in each).

## 5. Tests

- **Added:** CF-BRIEF-25, CF-BRIEF-26 (+ planted fixtures, `briefs.test.ts`); CF-LVB-23, CF-LVB-24 (`lovable-branch-guard.test.ts`); BC-18 (`bundle-closure.test.ts`); CF-UF-1…5 and CF-UF-5b (`scripts/conformance/user-facing.test.ts`); ERB-1, ERB-2 (`e2e/admin-errors.spec.ts`); FCR-79, FCR-80 (rows in the existing crawl spec `e2e/failure-crawl-admin-content.spec.ts`). **Re-pointed:** ERP-9 (moved with its file, id kept); AGX-9 (pins `DEC-495`, as the brief says, nothing else). **Wired:** `wired.test.ts` names CF-LVB-23/24, CF-BRIEF-25/26, `whole-app-calls` and CF-UF-5.
- **Red-first:**
  - CF-LVB-23 and CF-LVB-24 against the base `scripts/ci/lovable-branch-guard.sh` (written from `git show f4775290e:…`, run, restored): `× CF-LVB-23 …`, `× CF-LVB-24 …`, `Tests 2 failed | 20 skipped (22)`; on the final script `Tests 22 passed (22)`.
  - BC-18 against the base `ADMIN_MODULE`: `AssertionError: expected [] to deeply equal [ { …(2) } ]` at `scripts/bundle-closure.test.ts:405` (`/tmp/ethio-scratch/cursor-bundle-8c-1/bc18-red.txt`); green after the widening, 18 passed.
  - INC-1329's CONTROL: the two pages' sizes before and after (§3).
  - ERB-2's refusals bite: with the second account granted `admin` instead of `moderator` the test failed at `expect(page).toHaveURL(/\/admin$/)` (mobile-360, 0 retries, `erb2-red.txt`); the spec was restored and re-run green.
  - CF-UF-5's planted cases are the red-first of the census; CF-UF-5b proves the reader's grammar (wrapped, skipped, `describe`, a regex's `.test(`, an id's end, a whole `uf:` token).
- **Browser, by test id, on ethio-staging, 0 retries** (`bun run e2e:local -- e2e/admin-errors.spec.ts e2e/failure-crawl-admin-content.spec.ts --grep "ERB-|FCR-79|FCR-80" --retries=0`): `6 passed (1.6m)`, `2 skipped` — ERB-1, ERB-2 in `mobile-360` and `desktop-1280` (4 passed); FCR-79, FCR-80 in `mobile-360` (2 passed; the crawl rows run in a phone's project only, so their `desktop-1280` twins are skipped by design). A first attempt of this run ended in the harness' global setup (`AuthRetryableFetchError 502` reading a just-created user) before any test; the rerun was clean. Both FCR rows pass with no allowlist line.
- **J-audit** (e2e changed: `admin-errors.spec.ts`, `crawl-fixtures.ts`, `crawl-pages.ts`): J1 each seeded row's message starts with the test's own tag (`tagOf(info)`) and its path is `/e2e-erb`; J3 `afterEach` removes the seeded rows by id and throws on failure after `stopPageBeforePurge`; J4 DB truth through `adminClient`; no `.first()`, `waitForTimeout`, `test.only`; twin locators through `isCardTwin`; every read of a Supabase answer takes its `error`.
- **Unit totals** (final tree): `bunx vitest run scripts --maxWorkers=2` → `Test Files 152 passed (152)`, `Tests 870 passed | 1 skipped (871)`; `bunx vitest run src/lib src/features/admin-errors src/routes` → `Test Files 99 passed (99)`, `Tests 615 passed (615)`. `bun run typecheck` → clean (`tsc --noEmit && tsc --noEmit -p tsconfig.scripts.json`); `bun run lint` → clean (`--max-warnings 0`).
- **`bun run checks`** on the tree of `48bbb64e2` (the one commit after it only removes an unused export and was followed by typecheck, lint, `user-facing.test.ts`, `kit.test.ts` and the whole scripts suite):
  - fast line: `checks (fast): 25 PASS · 0 FAIL · 631s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`
  - last line: `checks: 36 PASS · 0 FAIL · 26 NOT RUN · 702s`
  - NOT RUN, each with its stated reason (26): scope's two Actions-API steps (2); actionlint (1) and gitleaks (1), pinned linux/x64 binaries on a darwin/arm64 machine; the "Install dependencies" steps of build-and-check, component-tests, i18n-usage-map and bundle-budget, dependencies already installed (4); dependency-audit's install and audit, the advisory service is not reachable from the sandbox (2 — DEC-495's line is proven here by AGX-1…10, CI's audit judges it); e2e-preflight's four steps, which need the staging credentials the script never holds (4 — the browser run's own preflight printed `migration parity OK … (newest: 20261126233100_…)`); the e2e merge steps (6); promote (4); semgrep's SARIF upload and its warning (2).

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "function isCardTwin|const isCardTwin" e2e`; `rg -n "idsIn" scripts/test-ids.ts`; `rg -n "readAllowlist\(" scripts/conformance/user-facing.ts`; `rg -n "request\.json|new Response|createClient|fetch\(" e2e/admin-errors.spec.ts` (none).

- A card-or-table twin test is decided by a copy in `e2e/admin-listings.spec.ts:713`, `e2e/admin-screening.spec.ts:89`, `e2e/admin-monetisation.spec.ts:56`, `e2e/admin-guides.spec.ts:68`, `e2e/helpers/locations.ts:52`, `e2e/helpers/countries.ts:73`, `e2e/helpers/categories.ts:58` and `e2e/helpers/admin-attributes.ts:14` (the one `admin-errors.spec.ts` reads; its boundary, 1024, is the DataTable's `cardUntil="lg"`). Eight definitions of one concern; left — outside the brief.
- A second reader of test titles: `scripts/test-ids.ts:45` (`idsIn`, roots `src`, `e2e`, `scripts`, ids with `+` joins, `[A-Z]{0,3}\d+` tails) and `scripts/conformance/user-facing.ts:117` (`titlesIn`, roots `e2e` and `src`, the brief's grammar `^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-[A-Z]?\d+[a-z]?`, `uf:` tokens). The brief fixes the second grammar, so the reader does not call the first; a later turn may fold both into one reader with a grammar parameter.
- The failure crawl's `pageRoutes` (`scripts/conformance/failure-crawl.ts:29`) is the one list of page routes; the new census reads it, it does not copy it.

## 7. Allowlists and guards

| Allowlist | Before → after | Lines |
| --- | --- | --- |
| `scripts/conformance/failure-crawl-allowlist.txt` | 78 → 76 | the two `page /admin/errors…` lines `| INC-1331` out |
| `scripts/conformance/briefs-allowlist.txt` | 0 → 0 | two CF-BRIEF-20 lines (`until INC-1278`) added in Part A for the brief in force, removed in Part B |
| `scripts/conformance/entry-admin-allowlist.txt` | 0 → 0 | the widened guard's real allowlist stays empty |
| `scripts/conformance/user-facing-allowlist.txt` | new, 230 | copied unedited: 219 rows and 4 pages `| INC-1278`; 4 rows and 3 development pages `| permanent` |
| `scripts/conformance/user-facing-manifest.txt` | new | 55 screens, 511 rows; 288 rows answered by a test, 223 owed (= 219 + 4) |

CF-UF-3 holds the two sets equal key for key (`[...allowances.keys()].sort()` equals the owed keys): nothing owed lacks a line, no line is stale. No row the supervisor's check answered is unanswered by this reader (the brief's STOP did not occur). Guard self-tests run: the planted cases above, `scripts/e2e-select.ts --self-test` and the laws (`bun run checks`, `laws-first`).

## 8. Strings

none — `no-new-string` flag; no `t(` key was added or changed (the diff's `src/` lines were read: only import paths and the moved constants changed). The i18n usage maps are generated by the build and not committed.

## 9. Migrations

none — `no-migration` flag; `git diff --name-only f4775290e..HEAD -- supabase` is empty.

## 10. Departures

- **Order:** Part C ran before Part B, because CF-UF-2 needs ERB-1 and ERB-2 (rows A28 and A29 name them) to exist. Commits are in that order (`fcd120cc0` C, `bdc460ffc` B); both titles are the brief's.
- **STEP 5's docs** landed in Part B's commit (`ci-guards.md`, `e2e-harness.md`, `error-reports.md`) rather than a separate docs commit; `failure-crawl.md`'s count line landed in Part C's.
- **`e2e/helpers/crawl-fixtures.ts`** (not in SCOPE): FCR-80 needs an address for `$group`; the crawl's `pathOf` throws for an unknown `$` route. One `case` and one constant (`NO_ERROR_GROUP`, a group key no report holds, so nothing is seeded or removed). The guard demanded it (`crawl-fixtures.ts` throws `no address for /admin/errors/$group`).
- **`scripts/ci/lane-weights.json`** (not in SCOPE): CF-LANES-2 fails on any spec the weights do not hold; 8b added `error-reports.spec.ts` the same way. The entry is an estimate from this machine's run (mobile-360 15.7 s, desktop-1280 16.5 s, 2 tests each), not a CI measurement; a green dev run's lane results replace it.
- **ERB-2's second case is a moderator, not a plain member.** The brief says "a pooled member without `errors:view` meets the staff gate's refusal". A plain member has no staff panel and the layout sends them to the landing, like a visitor; a moderator holds the panel and not `errors:view`, so the layout's section refusal (`admin.accessDenied` on `/admin`) is the one that proves the permission (AU-1's pattern). The pooled lease is the same. **Signed out** the address does not lead to a sign-in page: the layout sends the visitor to the shared landing `/` (DEC-279, `SIGN_OUT_LANDING`), which the test pins.
- **PR #119's patch** could not come from `gh api …/pulls/119/files` (the API drops `patch` for a diff this large); CF-LVB-23's fixture is `git diff`'s own output of the two file versions, as the guard's own fallback (`patch_from_git`) reads it.
- **`permanent` in CF-UF-3** is judged by the reason's fixed phrase (`the census names nothing this row must do`) for a row and by the `/dev/` prefix for a page, because the manifest does not carry the census's "what it must do" cell; the four rows and three pages in the allowlist satisfy it.
- No STOP, no ruling in this turn.

## 11. CI

Base: see the head of this report (f4775290e, SUCCESS, run 46057881592). Reds of earlier turns fixed: none (the base was green). This pull request (#120, https://github.com/tesfayekb/ethio-marketplace/pull/120): CI on `67812bacf`, run 46081846257 (head read by `gh pr view 120 --json headRefOid`) — `gh pr checks 120`: 43 pass, 2 skipping, 0 fail. The skipped two are "Promote to main" (runs on `dev` only) and "Lovable branch guard (DEC-413)" (a cursor branch is not its subject). Green includes Build, typecheck, lint; Component tests; Dependency vulnerability audit (so DEC-495's renewed line holds in CI, which `bun run checks` could not run); Semgrep; Gitleaks; the bundle budget; E2E preflight; all 16 numbered lanes plus email, smoke, webkit and repeat. The repeat lane passed in 19m47s. I read the check list, not any lane's log (§12). No infrastructure rerun was needed.

## 12. Limits

- `bun run checks` cannot run the dependency audit, actionlint, gitleaks, the semgrep upload, the Actions artifact steps or the staging parity steps here (§5); CI's verdict is the judge for each.
- The browser runs are the changed ids only (`--grep`), in the projects that run them; CI's lanes and repeat lane are the full proof. The ERB tests ran against ethio-staging only (no temporary local backend: Docker was not running).
- The lane-weights entry is an estimate (§10).
- `error_reports` has no reaper sweep (the harness's setup sweeps take no table): a run that dies before its `afterEach` leaves rows behind; the table's 12-month prune erases them.
- ERB-1 relies on the staff table listing the test's groups among the 200 most recent of its kind and window (`error_groups_core`); the kind `upstream` is one the server alone writes, so staging holds few; a staging project with more than 200 recent `upstream` groups inside three days would hide the older seeded row.
- I read CI's check list (state and duration), not the logs of any run.

## 13. Findings

- `docs/governance/census` header note: `scripts/conformance/user-facing-manifest.txt:3` says the census copy lives at `docs/features/user-facing-census.md`; the brief and this turn put it at `docs/governance/census/user-facing-8d64790.md` (the reader's `CENSUS`). The data file is never edited by the lane; the supervisor may correct the header's `copy:` note.
- `scripts/conformance/user-facing-manifest.txt` rows with answers only by prose: rows whose census cell names a test with no id (the manifest's `-` rows whose reason says "its tests today answer part of it: …") are owed; each such reason is a pointer for the lane that writes the row's test (Cursor 8c-3, Lovable).
- The widened guard (BC-18) and the move leave the entry's JS at 209.1 KiB of 210 (`check-bundle-size`: `JS: 209.1 KiB / 210 KiB — ok`); the next addition to the entry has 0.9 KiB.
- `e2e/helpers/admin-attributes.ts:14`, `countries.ts:73`, `categories.ts:58`, `locations.ts:52` and four specs define `isCardTwin` four different ways at three boundaries (§6): a mechanism for the card/table twin is owed (`e2e/helpers/` one export with its boundary as a parameter).
- `scripts/test-ids.ts` and `user-facing.ts` read test titles with two grammars (§6).
- No security finding.

## 14. Records

DEC — none this turn (the lane applies DEC-493's split, DEC-494's lanes and DEC-495's renewal as given).

INC — INC-1332, INC-1329, INC-1330, INC-1331: fixed (the branch guard admits an empty line beside a new route line, one for each, red-first CF-LVB-23; `DEVICES`/`Device` moved to `src/lib/error-clean.ts`, `/admin/errors` 267.196 → 245.092 KiB and `/admin/errors/$group` 265.847 → 243.740 KiB, ceilings 246 and 245; `ADMIN_MODULE` takes every `admin-` folder, BC-18 red against the base pattern and the real build's `errors-search.ts` found, the reader moved to `src/lib/errors-search.ts`; `e2e/admin-errors.spec.ts` ERB-1, ERB-2, FCR-79, FCR-80 with no crawl allowlist line).

INC — INC-1278: the list, its census and its allowlist built (`scripts/conformance/user-facing.ts`, `user-facing.test.ts` CF-UF-1…5; 511 rows, 288 answered, 223 owed: 219 rows and 4 pages `| INC-1278`, plus 4 rows and 3 development pages `| permanent`); the debt is the 223 lines, which only shrink.

register row — concern "every user-facing control has a test": mechanism `scripts/conformance/user-facing.ts` over `user-facing-manifest.txt` and `user-facing-allowlist.txt` (docs/features/user-facing-list.md); guard `user-facing.test.ts` CF-UF-1…5, named in `wired.test.ts`. Amended rows: the GO checker (CF-BRIEF-25, CF-BRIEF-26, `whole-app-calls`); the Lovable branch guard (CF-LVB-23, CF-LVB-24; DEC-394, DEC-413); the entry guard (BC-16 widened by BC-18); the failure crawl (FCR-79, FCR-80, 60 rows).

changelog — Cursor bundle 8c-1: the user-facing list and its census (CF-UF-1…5); three GO laws (CF-BRIEF-25, CF-BRIEF-26, `whole-app-calls`); the branch guard admits a new page's blank line (CF-LVB-23, CF-LVB-24); the entry guard sees every `admin-` folder (BC-18); the Errors pages lose zod from their first download (−22.1 KiB each) and gain their browser tests (ERB-1, ERB-2) and crawl rows (FCR-79, FCR-80); the picomatch audit exception renewed to 2026-12-11 (DEC-495).

roadmap — tick Cursor 8c-1 (the user-facing list, three text laws with INC-1332, the Errors pages INC-1329, INC-1330, INC-1331, DEC-495's renewal); Cursor 8c-2 and 8c-3 stay open as DEC-494 lists them; the renewal of the picomatch exception falls due again after 2026-12-02 and ends at 2026-12-11 (a new DEC if no fix ships).

slip — Part C ran before Part B (CF-UF-2 needs ERB-1 and ERB-2); two files outside SCOPE were touched by what the guards demanded (`e2e/helpers/crawl-fixtures.ts`, `scripts/ci/lane-weights.json`).
