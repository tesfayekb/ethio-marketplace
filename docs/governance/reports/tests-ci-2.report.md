# THE TESTS AND CI TURN 2 — report

Base: 96b53abfe · Final commit: c692533e6 · Brief: docs/governance/briefs/tests-ci-2.md (sha256 6783d6a87796c5601a8e0f7c856ef9eb76d62674e1acd3b6e02b1bed99b088f4)
Review: READY · 0 BLOCKER · 0 MAJOR · 1 MINOR · on c692533

CI on the base: `96b53abfecb1ec414f02c24da533b4b8aa0c297d` — **SUCCESS** (run 44869352644,
2026-11-21T05:14:11Z). CI on the final commit `c692533e6`: **SUCCESS** (run 44900066596,
2026-11-21T11:52:17Z; every check on the pull request green, §11).

Rulings in this turn, each saved by scripted copy with its sha256 compared:
- ruling 1 after stop 1 (`docs/governance/briefs/tests-ci-2-ruling-1.md`, sha256
  38f58186d2f8780475488ac6238df7df63e5a2c11918529c8e8501fa3b1264e5);
- ruling 2 after stop 2 (`tests-ci-2-ruling-2.md`, sha256
  56e2ab0db628e7567e24c2d398c3b87a8212718d6067a6dd2dc808966e0ae7c0);
- ruling 3 after stop 3 (`tests-ci-2-ruling-3.md`, sha256
  52efc2615b8f5f6b3efa0d98f0ddb1b6df73da7a71747fe06cc53c04e6023ae1);
- ruling 4 after stop 4 (`tests-ci-2-ruling-4.md`, sha256
  3bfdc903bc762497eabc40dea3a5e4374851e189e24edcec7b4949c86cce6c7b);
- ruling 5 after the bench (`tests-ci-2-ruling-5.md`, sha256
  44a366d12d6aa56c6df66ef8dac937a7a8a4f29121386be3f0858ecc2540d25b).

## 1. Done / not done, by part and step

- STEP 0, the task saved (`38e4e1aa3`), and STEP 1, the census and stop 1 (`14afa4e40`,
  `a9504b98a`): done.
- STEP 2, commit `9f605d2ad` (`tests-ci-2: the bench, the budget and the guard's fixture`):
  - Item 1 (INC-1181, INC-1182), done. 2,048 bench sellers. The seed logs seller creation and the
    listings' insert apart. The cron is `10 13 * * 0` (DEC-412). `timeout-minutes` was set to 60
    here, from run 43872334867's steps plus half again (ruling 1, decision 2). After the bench it
    became 78 (ruling 5, decision 1).
  - Item 3 (INC-1190, INC-1198), done as ruled. The skip is unchanged. 49 of 50 page ceilings and
    the entry's JS and CSS ceilings came down to `ceilingForLocal(size)`. The ratchet message names
    `ceilingFor(size)` (DEC-296). The 8 KiB slack stays.
  - Item 6 (INC-1206), done. CF-LVB-13 and CF-LVB-14 read a ceilings fixture of their own.
- STEP 3, commit `38fb36e78` (`tests-ci-2: the cycle, the migration guards, the width check`):
  - Item 4 (INC-1193), done as ruled (option C): CF-CYCLE, a cycle census over `src/i18n/` and its
    importers, with planted cycles. INC-1193 stays open.
  - Item 5 (INC-1205, INC-1207), done. The three perl proof rules of `check-migrations.sh` moved
    onto the migration reader. Every guard checks its reader's exit, and each check is proven by a
    planted reader failure.
  - Item 8 (ACT-023), done: a `minWidth` that is not exactly one `min-w-*` class is refused, with
    planted cases.
- STEP 4:
  - Item 2 (DEC-413), done in commit `7d795e055` (`tests-ci-2: the Lovable guard judged from the
    base (DEC-413)`).
  - Item 7 (INC-1015), done after stop 2 and ruling 2 (option A), in commit `c0a7d2c3f`
    (`tests-ci-2: SMN-E13 after its own root, the rail's readers serial`).
  - Item 7 (INC-1210, CL-E10): not in this turn (ruling 1, decision 5). It became INC-1226,
    Lovable's. CL-E10's test is unchanged.
  - The brief's single STEP 4 commit title became these two commits (§10).
- STEP 5: done. The commands and results are in §5; the self-review fix is commit `0b811d99f`.
- STEP 6: pushed once (`8ad7149e7..0b811d99f`) and `gh pr ready 87`.
- Stop 3 (`2ece00075`): the repeat lane left `@global-state` tests out
  (`.github/workflows/local-backend-proof.yml`'s run step), so it could not repeat SMN-E13 as ruling
  2 required. Ruling 3 (option A, DEC-415) answered it.
- Stop 4 (`3be465ac3`): two dispatched Feed bench runs yielded (44892283273, 44894899898). Ruling
  4 answered it.
- Ruling 3, decision 1 (DEC-415), done in commit `8623202f1`: the repeat lane's serial pass, the
  planner counting both passes, `repeat-cap.ts --merge`, CF-LANES-5. The same commit sets the
  bench's limit (ruling 3, decision 3) and writes the quiet window (ruling 4, decision 2).
- Ruling 4, decision 3 (INC-1228), done in commit `cdb69a574`: no PASS line, and no number, for
  anything the bench did not measure; FB-10, FB-11.
- Ruling 4, decision 4, done in commit `b10c21af1`: `/account_/saved` 222 → 223 and `/l/$slug`
  249 → 250 (DEC-296, after dev's L22c).
- Ruling 5, decision 1 (INC-1230), done in commit `559d4eb8a`: the bench's limit is the gate's whole
  wait plus the run's allowance, 40 + 38 = 78 minutes; CF-CID-11.
- Ruling 5, decision 2, done in commit `c692533e6`: seven ceilings for Lovable bundle 1 (DEC-296).
- The one push after the bench (ruling 4, decision 6; ruling 5, decision 3): `3be465ac3..c692533e6`,
  then `gh pr ready 87`.
- STEP 7: this report.

## 2. Files changed

`git diff --name-only 96b53abfe` (with this report):

```
.github/workflows/ci.yml
.github/workflows/feed-bench.yml
.github/workflows/local-backend-proof.yml
.github/workflows/lovable-branch-guard.yml
docs/features/attributes.md
docs/features/ci-guards.md
docs/features/display-primitives.md
docs/features/e2e-harness.md
docs/features/feed-engine.md
docs/features/performance-strategy.md
docs/governance/briefs/tests-ci-2-ruling-1.md
docs/governance/briefs/tests-ci-2-ruling-2.md
docs/governance/briefs/tests-ci-2-ruling-3.md
docs/governance/briefs/tests-ci-2-ruling-4.md
docs/governance/briefs/tests-ci-2-ruling-5.md
docs/governance/briefs/tests-ci-2.md
docs/governance/reports/tests-ci-2.census.md
docs/governance/reports/tests-ci-2.report.md
docs/governance/reports/tests-ci-2.stop-1.md
docs/governance/reports/tests-ci-2.stop-2.md
docs/governance/reports/tests-ci-2.stop-3.md
docs/governance/reports/tests-ci-2.stop-4.md
e2e/helpers/posting.ts
e2e/menu-rows.spec.ts
e2e/shell-bands.spec.ts
e2e/submenu-look.spec.ts
e2e/submenu-touch.spec.ts
e2e/submenu.spec.ts
roadmap.md
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/check-datatable-minwidth.sh
scripts/check-migrations.sh
scripts/ci/lovable-branch-guard.sh
scripts/ci/lovable-branch-guard.test.ts
scripts/ci/repeat-cap.test.ts
scripts/ci/repeat-cap.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/ci-deadlines.test.ts
scripts/conformance/import-cycles-allowlist.txt
scripts/conformance/import-cycles.test.ts
scripts/conformance/import-cycles.ts
scripts/conformance/lanes.test.ts
scripts/conformance/migration-guards.test.ts
scripts/conformance/migration-guards.ts
scripts/conformance/migration-reader.ts
scripts/conformance/repeat-lane.test.ts
scripts/conformance/shared-value-tables.txt
scripts/conformance/shared-values.ts
scripts/conformance/wired.test.ts
scripts/conformance/workflow-reader.ts
scripts/datatable-minwidth.ts
scripts/feed-bench-market.ts
scripts/feed-bench.test.ts
scripts/feed-bench.ts
scripts/fixtures/bad-datatable-minwidth-class-example.tsx.txt
scripts/route-budgets.mjs
scripts/shell-guards.test.ts
```

The new files, each listed by `git ls-files`:
- `.github/workflows/lovable-branch-guard.yml`
- `scripts/conformance/import-cycles.ts`, `import-cycles.test.ts`, `import-cycles-allowlist.txt`
- `scripts/conformance/migration-guards.ts`, `migration-guards.test.ts`
- `scripts/datatable-minwidth.ts`
- `scripts/fixtures/bad-datatable-minwidth-class-example.tsx.txt`
- the brief and its five rulings, the census and the four stop reports (this report joins them in
  its own commit)

`roadmap.md` changes line 3 only (STEP 0). Nothing was deleted.

## 3. Behaviour contract — answer tables before → after

No app code, route, door or screen changed: no file under `src/`, `supabase/` or `public/` is in
§2. The CI and guard behaviour that changed:

| Function | At 96b53abfe | Now |
|---|---|---|
| The Lovable branch guard (DEC-394) | A step in `ci.yml`'s `scope` job, on `pull_request`, running the head's checkout of the script; check "Lovable branch guard (DEC-394)" | Its own workflow `lovable-branch-guard.yml`, on `pull_request_target` into dev for `lovable/*` heads. The base commit is checked out (`persist-credentials: false`), the token holds `contents: read` and `pull-requests: read`, and the head is read as data only. Check "Lovable branch guard (DEC-413)". Same input and verdicts |
| `check-migrations.sh` — the proof table rule, the real-row and real-pick rules, the spanning-literal and random-text guards | Three rules in perl, two guards on the reader; the spanning-literal guard did not check its reader's exit | All five go through `migration-reader.ts` (the three via `migration-guards.ts`, modes `--table-creates`, `--real-rows`, `--real-picks`, `--real-row-split`), and each checks its reader's exit. Every verdict, head and allowlist key is byte-equal on every migration (parity: 57 scratch verdicts, 567 heads, 51 allowlisted lines). Measured on this computer: 40 s against the base's 65 s. One change in output order: the real-row lines print rows first, then picks (they were interleaved per file) |
| `check-datatable-minwidth.sh` | Refuses a `minWidth` without a same-line `// C7-dense:` note | The same, and it also refuses a `minWidth` that is not exactly one `min-w-*` class, judged by `scripts/datatable-minwidth.ts` from the syntax tree. Each arm of a conditional is judged, and a name or an expression is refused |
| `check-bundle-size.mjs` and `route-budgets.mjs` | Page ceilings as listed in the base; entry JS 205, CSS 40 KiB | 49 page ceilings lowered to `ceilingForLocal(size)`, then nine raised for dev's L22c and Lovable bundle 1 (both tables below); entry JS 203, CSS 23 KiB |
| The ratchet message (`bundle-closure.mjs`) | `(ratchet: lower the ceiling to ${Math.ceil(kib + 3)})` | `(ratchet, DEC-296: lower it to ceilingFor(size) = N)` |
| The Feed bench | 256 sellers; cron `10 16 * * 0`; `timeout-minutes: 90`; the status line's seed in one number | 2,048 sellers; cron `10 13 * * 0`; `timeout-minutes: 78` = `GATE_WAIT_MINUTES` 40 + `RUN_ALLOWANCE_MINUTES` 38 (INC-1230); the seed as `seed S s (sellers A s, listings B s)` |
| The Feed bench's verdict lines (`verdict()`, `renderStatus`) | `PASS: every target met` whenever no measured shape missed, so a run that measured nothing printed it; an unmeasured page size printed as `0 bytes` | `PASS: every target met` only when all six shapes and the page size were measured and met. Each unmeasured value gets a `NOT MEASURED: "<shape>"` / `NOT MEASURED: page size` line in the log and a `- Not measured: "<shape>"` / `Page size (…): not measured` line in the status file. A run that neither failed nor yielded and measured less than everything is a MISS. The outcome and exit code of a failed, yielded or skipped run are unchanged (INC-1228) |
| The repeat lane (`local-backend-proof.yml`, DEC-283) | One pass: the selected specs' tests outside `@global-state` and `@a11y`, `--repeat-each "$REPEAT_EACH"`, two workers | Two passes under the one deadline (DEC-415). The parallel pass is unchanged. Then a serial pass: the same specs' `@global-state` tests, Chromium pair, `--workers=1`, the lane's `--repeat-each`, `--retries 0`, the deadline's remainder as `--global-timeout`. The planner counts both passes, a pass with no test is skipped, and the lane is red when either pass fails. `repeat-cap.ts --merge` joins the two reports into one `results.json`. `local-backend-repeat.txt` gains a `- Repeat serially (DEC-415):` line, and a `- Not repeated (time cap):` line for a serial pass the cap stopped |
| `scripts/ci/repeat-cap.ts` | Judges one `results.json` | The same, plus `--merge <aside> <results> <evidence>`: suites and errors in pass order, stats summed, both passes' error contexts kept; a serial pass capped before any test loaded is named on the evidence file |
| `scripts/conformance/workflow-reader.ts` (`Job`) | `timeout: boolean` | The same, and `minutes: number \| null`, the job's own `timeout-minutes` (read by CF-CID-11) |
| CF-LANES-4 | Two manifest forms; `category_tree_pointers` "read, not shared" | A third form, "shared with its readers". `category_tree_pointers` names nine readers, and an untagged or stale reader fails |
| The lanes | SMN-E4, SMN-E7, SMN-E9, SMN-E10, SMN-E13, ROWS-E1, ROWS-E3, ROWS-E4 and BND-E3 ran in the numbered lanes | They carry `@global-state` and run in the serial lane. All are desktop-1280 only, 11 runs (SMN-E7 and SMN-E4 run twice each). Their files' desktop weights are 11.3, 17.3, 4.8, 11.2 and 14.2 s whole (`lane-weights.json`) |
| SMN-E13 | Read the rail, predicted whether its own root would fit, then seeded `holds + 1` or `holds + 2` children | Seeds its root with one child, reads the rail with that root on it, then grows to `holds + 1` children (`growScratchBranch`). Its assertions are byte for byte the base's |

The ratchet (every page, from this tree's local build; the ceiling at the base → now):

| Page | Local size (KiB) | Before | After |
|---|---|---|---|
| `/` | 222.8 | 227 | 224 |
| `/$name` | 220.8 | 225 | 222 |
| `/account` | 264.0 | 268 | 265 |
| `/account_/legal` | 204.3 | 208 | 205 |
| `/account_/legal_/$versionId` | 204.9 | 209 | 206 |
| `/account_/saved` | 221.5 | 225 | 222 |
| `/admin` | 206.1 | 210 | 207 |
| `/admin/` | 206.9 | 211 | 208 |
| `/admin/ai` | 300.8 | 303 | 302 |
| `/admin/attributes` | 315.5 | 318 | 316 |
| `/admin/audit` | 291.6 | 295 | 293 |
| `/admin/categories` | 345.2 | 348 | 346 |
| `/admin/countries` | 304.9 | 309 | 306 |
| `/admin/images` | 206.7 | 210 | 208 |
| `/admin/impersonation_/$sessionId` | 289.6 | 293 | 290 |
| `/admin/legal` | 282.2 | 285 | 283 |
| `/admin/legal_/$versionId` | 278.9 | 282 | 280 |
| `/admin/legal_/edit` | 281.7 | 284 | 283 |
| `/admin/listings` | 326.3 | 329 | 327 |
| `/admin/monetisation` | 311.7 | 313 | 313 |
| `/admin/listings_/$listingId` | 326.7 | 330 | 328 |
| `/admin/listings_/$listingId_/edit` | 407.7 | 412 | 409 |
| `/admin/locations` | 267.3 | 271 | 268 |
| `/admin/places` | 305.3 | 310 | 306 |
| `/admin/roles` | 293.3 | 295 | 294 |
| `/admin/roles_/$roleId` | 273.3 | 275 | 274 |
| `/admin/screening` | 342.9 | 348 | 344 |
| `/admin/translations` | 304.7 | 307 | 306 |
| `/admin/translations_/$lang` | 306.3 | 309 | 307 |
| `/admin/users` | 290.0 | 293 | 291 |
| `/admin/users_/$userId` | 289.8 | 293 | 291 |
| `/auth` | 219.1 | 223 | 220 |
| `/auth_/callback` | 205.2 | 209 | 206 |
| `/auth_/reset` | 212.2 | 214 | 213 |
| `/c/$slug` | 222.8 | 227 | 224 |
| `/dev/primitives` | 226.3 | 228 | 227 |
| `/dev/style` | 245.2 | 248 | 246 |
| `/dev/tall` | 202.0 | 206 | 203 |
| `/l/$slug` | 248.4 | 250 | 249 |
| `/legal/$kind` | 206.4 | 210 | 207 |
| `/legal/accept` | 213.6 | 217 | 215 |
| `/legal/publishing` | 207.5 | 211 | 208 |
| `/my-listings` | 309.3 | 315 | 310 |
| `/my-listings_/$listingId` | 319.2 | 323 | 320 |
| `/my-listings_/$listingId_/edit` | 399.9 | 404 | 401 |
| `/post` | 399.9 | 404 | 401 |
| `/post_/$listingId` | 399.9 | 404 | 401 |
| `/privacy` | 206.4 | 210 | 207 |
| `/settings` | 276.2 | 279 | 277 |
| `/terms` | 206.4 | 210 | 207 |

`/admin/monetisation` already sat at `ceilingForLocal(311.7)` = 313. No page's first download
changed in this turn: no file a page carries is in §2.

After the ratchet, rulings 4 and 5 raised nine ceilings for other branches' growth, each in
DEC-296's form, with the measurement and cause written on its line in `scripts/route-budgets.mjs`:

| Page | Measured (KiB) | Where | Ceiling |
|---|---|---|---|
| `/account_/saved` | 221.8 | CI run 44894986213 (this lane merged with dev 37b62562a, L22c) | 222 → 223 = ceilingFor(221.8) |
| `/l/$slug` | 248.8 | the same | 249 → 250 = ceilingFor(248.8) |
| `/admin/listings` | 326.675 | the supervisor's local build: this lane merged with dev 37b62562a and lovable/bundle-1 4e421408d | 327 → 328 = ceilingForLocal(326.675) |
| `/admin/listings_/$listingId_/edit` | 408.726 | the same | 409 → 410 |
| `/legal/publishing` | 207.612 | the same | 208 → 209 |
| `/my-listings_/$listingId` | 319.942 | the same | 320 → 321 |
| `/my-listings_/$listingId_/edit` | 400.844 | the same | 401 → 402 |
| `/post` | 400.823 | the same | 401 → 402 |
| `/post_/$listingId` | 400.791 | the same | 401 → 402 |

Each of the seven local ceilings was recomputed by `ceilingForLocal` from `scripts/budget-band.mjs`
before the edit, and each equals the ruling's (`/tmp/ethio-scratch/tests-ci-2/band-check.mjs`). This
tree holds neither L22c nor bundle 1. Its own build (`bun run build && node
scripts/check-bundle-size.mjs` on the tree that became `c692533e6`; the one later edit is a
comment in `scripts/conformance/workflow-reader.ts`, which no page carries; "Bundle budget OK.")
reads these pages lower:
`/account_/saved` 221.5 / 223, `/l/$slug` 248.4 / 250, `/admin/listings` 326.3 / 328,
`/admin/listings_/$listingId_/edit` 407.7 / 410, `/legal/publishing` 207.5 / 209,
`/my-listings_/$listingId` 319.2 / 321, and 399.9 / 402 for the edit page, `/post` and
`/post_/$listingId`.

## 4. Censuses

STEP 1's census is `docs/governance/reports/tests-ci-2.census.md`, item by item with file:line.
The censuses this turn added after it:

- **Item 7, stop 2.** `category_tree_pointers` read as a shared row through CF-LANES-4's own census
  (`sharedValueFindings`, scratch script `/tmp/ethio-scratch/tests-ci-2/ctp-census.ts`) gave 330
  write sites in 51 spec files. 18 spec files write the table inline
  (`rg -l -U 'from\(\s*"category_tree_pointers"\s*\)[\s\S]{0,200}?\.(insert|update|upsert|delete)\(' e2e`).
  Hence ruling 2's form.
- **Item 7, the rail's readers** (ruling 2, decision 1). The greps:
  - `rg -n "rail-scroll|menu-fit|railGrid|RAIL_ROWS|rail-category-" e2e`
  - `rg -n "seedScratchBranch\(" e2e`
  - `rg -n "menu-row|data-menu-row|rowGap|row height|rows flex" e2e`

  Each hit was read. The criterion is whether a root another worker adds during the test can change
  its verdict. A new root re-flows the rail mid-page: the category tree store revalidates on every
  mount (`src/features/categories/category-tree.ts:86`–`:95`), as SMN-E3's own comment records
  (D322, `e2e/submenu-touch.spec.ts:62`–`:63`). The readers:
  - SMN-E7, SMN-E9 and SMN-E10 (`e2e/submenu-look.spec.ts`) read `railGrid` and the panel in
    separate reads.
  - SMN-E13 read before its own root existed.
  - SMN-E4 (`e2e/submenu.spec.ts:195`, `everyRowOnScreen` at `:175`–`:178`) reads the rail's row
    apart from the panel's.
  - ROWS-E1 (`e2e/submenu-touch.spec.ts:100`) and ROWS-E3 (`e2e/menu-rows.spec.ts:81`) choose their
    branch from a count read before.
  - ROWS-E4 (`e2e/menu-rows.spec.ts:134`) sizes the window from a count read before.
  - BND-E3 (`e2e/shell-bands.spec.ts:102`) multiplies a rail row read before.

  Not readers:
  - SMN-E1 (`e2e/submenu.spec.ts:15`) and SMN-E3 (`e2e/submenu-touch.spec.ts:32`): every count gives
    rows of 32–48 px, and SMN-E3 reads rail and panel together once still.
  - ROWS-E5 (`e2e/submenu-touch.spec.ts:167`): its own seeded list, which no other root enters.
  - ROWS-E2 and SMN-E11/E12: the admin menu, not categories.
  - BND-E1/E2: band rows.
  - SMN-E8: a name's cut.
  - The phone pairs in `e2e/shell.spec.ts` (RM-1 `:1212`, "the menu opens in place" `:1309`, FV-1
    `:4054`): they compare the phone menu with the strip, which both take a new root, and they
    poll until level (`:1240`, `:1334`, `:4099`).
  - The ordering in `e2e/category-nav.spec.ts:159`–`:173`: the relative order of its own two roots.
- **Siblings for §6**:
  - `rg -n '\bperl\b' scripts .github`
  - `rg -ln 'minWidth' scripts`
  - `rg -ln 'madge|import cycle|circular' scripts .github`
  - `rg -n 'lovable-branch-guard.sh' .github scripts`
  - `rg -ln 'supabase/migrations' scripts`, each hit checked for the reader
- **`origin/dev` moved during the turn.** It moved from 96b53abfe to 4bf2293e9, Lovable's L22b
  (pull request #88: `5f15f97ec`, `148ba0aa4`, `977e7e9aa`). `comm -12` of the two file lists is
  empty: it changes no file of this turn's. To prove the merge stays green, `origin/dev`'s tree was
  built with this turn's budget and cycle scripts (`/tmp/ethio-scratch/tests-ci-2/devtree`):
  - "Bundle budget OK".
  - CF-CYCLE-1 and CF-CYCLE-2 passed.
  - 20 pages grew by 0.1–0.3 KiB, and each keeps 0.5 KiB or more under its new ceiling. The least
    is `/l/$slug`, 248.5 of 249.

## 5. Tests

**Added:**
- CF-CYCLE-1 and CF-CYCLE-2 (`scripts/conformance/import-cycles.test.ts`).
- MGR-9 to MGR-13 (`scripts/conformance/migration-guards.test.ts`).
- GW-4 (`scripts/shell-guards.test.ts`).
- After stop 3:
  - CF-LANES-5 (`scripts/conformance/lanes.test.ts`, DEC-415). It reads the workflow: the live
    lane gives no findings, and the planner has two lists. Planted cases: the serial pass removed,
    the planner's serial list removed, `--workers=2`, `--merge` removed, `--repeat-each 1`, and
    changed tags. Each is named.
  - RCAP-10 and RCAP-11 (`scripts/ci/repeat-cap.test.ts`): the two reports joined; the `--merge`
    command on temporary directories; a serial pass capped before load named on the evidence file;
    a missing report exits 1 and keeps the parallel results.
  - FB-10 and FB-11 (`scripts/feed-bench.test.ts`, INC-1228).
  - CF-CID-11 (`scripts/conformance/ci-deadlines.test.ts`, INC-1230). CF-CID-10 is taken
    (`scripts/conformance/repeat-lane.test.ts:298`, INC-1124), so CF-CID-11 is the next free id.

**Changed:**
- After stop 3:
  - RPL-2 (`scripts/conformance/repeat-lane.test.ts`): its anchor now includes the parallel pass's
    `--grep-invert "@global-state|@a11y"`, since `--repeat-each "$REPEAT_EACH" --retries 0` now
    appears in both passes. Its cap case uses `replaceAll`, since the cap reader is called twice.
    The assertions are unchanged.
  - CF-LANES-3 (`workersByLane`): a lane's workers are now the most any of its runs uses. The serial
    pass's `--workers=1` would otherwise hide the parallel pass's two.
  - FB-3, FB-6 and the `six()` helper: the six shape names are the bench's own (`SHAPE_NAMES`), and
    FB-6's unmeasured page size is `null`, not 0.
- GW-2: the planted fixture now has two findings, the class line added.
- BC-10: the ratchet message.
- FB-4 and FB-8: 2,048 sellers, the split seconds.
- CF-LVB-10: now the workflow's shape. The live workflow gives no findings, `ci.yml` is free of
  the guard, and seven planted breaches are each found (the `pull_request` event, a head checkout,
  a kept credential, a write permission, an install step, a secret, every head).
- CF-LVB-13 and CF-LVB-14: their own ceilings fixture; CF-LVB-13 reads the step's env from the new
  workflow. Both carry an explicit 30 s limit: alone they took 4.6 s and 3.7 s against vitest's
  default 5 s (ruling 2, decision 2).
- CF-LANES-4:
  - The live readers give no findings.
  - The manifest's readers list equals `["category_tree_pointers"]`.
  - Planted readers: an untagged test and an untagged looped test are found, a stale id is found,
    and a tagged test, a tagged describe and a tagged looped test are not.
  - Two malformed reader cells throw.
  - A live mutation (SMN-E13's tag removed from the real spec) failed it with
    `e2e/submenu-look.spec.ts:234 SMN-E13 reads category_tree_pointers's shared value (scripts/conformance/shared-value-tables.txt:14) outside @global-state`.
    The file was restored byte for byte (`cmp`).
- `wired.test.ts`:
  - the `MIGRATION_READER` lines and the reader's six modes;
  - no perl;
  - CF-CYCLE-2;
  - the minWidth checker's call;
  - DEC-413's caller in the new workflow, and none in `ci.yml`.

**E2E, changed:** SMN-E4, SMN-E7, SMN-E9, SMN-E10, SMN-E13, ROWS-E1, ROWS-E3, ROWS-E4 and BND-E3
each gained the tag and its `global-state` annotation. SMN-E13's seeding is reordered. No
assertion changed. ROWS-E5 is unchanged.

**Red-first:** not applicable to SMN-E13. Its defect was the test's own reading order, not app
code (rule 20: a test that reproduces a defect is shown red). The cause is the failure body of
run 44607286456 (the census, item 7), and the repeat lane proves it (§11). Each new guard was
proven red on a planted case:
- the six migration-guard mutations (the table, spanning, random, rows, picks and split guards);
- the planted cycles;
- the planted minWidth fixture;
- the seven workflow breaches;
- the planted readers and the live untag above.

After stop 3:
- FB-10, red on the base first, as ruling 4 asks. `scripts/feed-bench.ts` was written from
  `git show 3be465ac3:scripts/feed-bench.ts` into place, with this turn's tests:
  `AssertionError: expected true to be false` (a run with no measured shape was a pass). Output:
  `/tmp/ethio-scratch/tests-ci-2/fb-red-first.txt`.
- FB-11 on the same base fails with `TypeError: Cannot read properties of undefined (reading
  'map')`: the base has no `SHAPE_NAMES`. Ruling 4 asks red-first of FB-10 only; FB-11 carries its
  control, where all six shapes measured and met give exactly `["PASS: every target met"]`.
- CF-CID-11, red with 38 planted, as ruling 5 asks. It ran against the workflow while it still
  said `timeout-minutes: 38`: `AssertionError: expected 38 to be 78`
  (`/tmp/ethio-scratch/tests-ci-2/cid11-red.txt`). The test also plants 38 itself and requires a
  value other than 78.
- CF-LANES-5 and RCAP-10/11: the planted cases above.

**Local runs on the final tree** (`0b811d99f`; the laws, typecheck and lint after the
self-review fix):
- `bun run typecheck`: `tsc --noEmit && tsc --noEmit -p tsconfig.scripts.json`, exit 0.
- `bun run lint`: `eslint . --max-warnings 0`, exit 0.
- `bunx vitest run scripts --maxWorkers=2`: `Test Files  127 passed (127)` ·
  `Tests  681 passed | 1 skipped (682)`.
- `bun run build && node scripts/check-bundle-size.mjs`: `JS: 201.7 KiB / 203 KiB — ok` ·
  `CSS: 22.5 KiB / 23 KiB — ok` · `Bundle budget OK.`
- `bun run checks` (on `c0a7d2c3f`; the review fix after it touched spec formatting only):
  - fast line: `checks (fast): 26 PASS · 0 FAIL · 426s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`
  - last line: `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 488s`

  The 25 NOT RUNs, with the script's reasons:
  - scope › Decide whether the lanes run; scope › Index the code tree the lanes prove — GitHub-only
    artifacts (DEC-375 a).
  - build-and-check › Workflow lint (actionlint, pinned), and secrets-scan › Secrets scan
    (gitleaks, pinned) — pinned linux/x64 binaries on darwin/arm64. CI's `Workflow lint` step runs
    actionlint over `.github/workflows/*.yml`, the new workflow included (`ci.yml:173`).
  - The Install dependencies steps of build-and-check, component-tests and bundle-budget — already
    installed.
  - dependency-audit › Install dependencies; dependency-audit › Audit — the advisory service is not
    reachable.
  - e2e-preflight's four steps — the staging credentials.
  - e2e's six merge steps — GitHub's lane artifacts.
  - promote's four steps — only CI promotes.
  - semgrep › Upload SARIF; semgrep › Warn: the SARIF upload failed — GitHub-only.
- `bun scripts/brief/check-go.ts docs/governance/briefs/tests-ci-2.md --at 96b53abfe`:
  `[check-go] no finding`.
- Browser, by id (`bun run e2e:local -- e2e/submenu-look.spec.ts e2e/submenu.spec.ts e2e/submenu-touch.spec.ts e2e/menu-rows.spec.ts e2e/shell-bands.spec.ts --project=mobile-360 --project=desktop-1280 --retries=0 --grep "SMN-E4 |SMN-E7 |SMN-E9 |SMN-E10 |SMN-E13 |ROWS-E1 |ROWS-E3 |ROWS-E4 |BND-E3 "`,
  on ethio-staging, outside the sandbox, on the final tree): `11 skipped` · `11 passed (21.2s)`.
  - The 11 skipped are the mobile-360 runs, which each test skips by its own `test.skip` (desktop
    only).
  - `[ssr-error]`: 0. The server log is captured (16 `[WebServer]` lines).
  - The same run on `c0a7d2c3f`, before the review fix: `11 skipped` · `11 passed (21.7s)`,
    `[ssr-error]` 0.
- No spec file ran whole locally. CI on the pull request runs every test, and its repeat lane
  repeats the changed specs (DEC-283).

**Local runs after stop 3**, in the order ruling 4, decision 5 and ruling 5, decision 3 set (§10).
No file under `e2e/` changed after `0b811d99f` (`git diff --name-only 0b811d99f..HEAD`), so no
browser run was owed.
- The gate, once, on the tree with ruling 3's decision 1 and ruling 4's decisions 2–4, while the
  bench ran (`/tmp/ethio-scratch/tests-ci-2/checks-r4.log`):
  - fast line: `checks (fast): 26 PASS · 0 FAIL · 427s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`
  - last line: `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 489s`
  - The same 25 NOT RUNs as above, with the same reasons.
- The self-review's fix (a serial pass with no parallel pass before it; §10), then what it can
  affect: prettier on the two changed files, `bun run typecheck` and `bun run lint` exit 0, and
  `bunx vitest run scripts --maxWorkers=2`: `Test Files  127 passed (127)` ·
  `Tests  686 passed | 1 skipped (687)`.
- After the bench's edits (`timeout-minutes`, DEC-412's numbers, the measured length): prettier on
  `.github/workflows/feed-bench.yml` and `docs/features/feed-engine.md`, and the script tests that
  read the workflow (§10): `Test Files  6 passed (6)` · `Tests  37 passed (37)`.
- After ruling 5's two commits:
  - prettier on the six changed files; `bun run typecheck` and `bun run lint` exit 0;
  - the tests that read the touched files (§10): `Test Files  12 passed (12)` ·
    `Tests  107 passed (107)`;
  - `bunx vitest run scripts --maxWorkers=2`: `Test Files  127 passed (127)` ·
    `Tests  687 passed | 1 skipped (688)`. A first run of it inside the tool's sandbox ended with
    `6 failed` test files and `10 failed` tests. Run again outside the sandbox, as every other run
    in this turn was, it passed whole. That log was not kept, so the six files are not named here;
  - `bun run build && node scripts/check-bundle-size.mjs`: `Bundle budget OK.` (the pages in §3).

**J-audit** (e2e/** changed):
- J3: `growScratchBranch` writes scratch rows only (the branch's own `e2e-` slugs). Their slugs
  join `branch.kids` before any write, so `afterEach`'s `destroyCategoryBranch` removes them even
  when a write fails.
- J7: SMN-E13 seeds before it navigates, and waits for its root on the rail before reading.
- J8: the nine readers are `@global-state` with the reason in a `global-state` annotation.
- No `.first()`, no `waitForTimeout`, no `test.only`.

## 6. K2 — siblings that bypass the mechanism

- **The migration reader (register row 125).** `rg -ln 'supabase/migrations' scripts` (tests and
  docs aside): `check-migrations.sh`, `perm-vocabulary.ts`, and `scripts/doors/{catalogue,columns,policies,rows,step-ups}.ts`
  read through the reader. `db-proof.sh`, `scripts/ci/prepare-local-backend.sh` and
  `scripts/ci/local-backend-db.sh` apply migrations and judge no SQL. `scripts/brief/go-laws.ts`
  reads only paths.
  - **One sibling bypasses it:** `triggerFindings` in `scripts/conformance/shared-values.ts:145`
    blanks `--` comments with its own pattern instead of `sqlCodeOf`. A `--` inside a quoted literal
    would be blanked there and kept by the reader. Not changed: item 5 named the three guards and
    the spanning-literal guard. Raised in §13.
- **perl:** `rg -n '\bperl\b' scripts .github` finds only `migration-guards.ts:9`'s comment
  recording the move. None left.
- **The minWidth check:** `rg -ln 'minWidth' scripts` finds `check-datatable-minwidth.sh`,
  `datatable-minwidth.ts` and their tests. No second checker.
- **The cycle guard:** `rg -ln 'madge|import cycle|circular' scripts .github` finds only CF-CYCLE's
  files.
- **The Lovable guard:** its one caller is `lovable-branch-guard.yml:44`.
- **Scratch branches:** `growScratchBranch` extends `seedScratchBranch`'s branch in the same file.
  `rg -n "seedScratchBranch\(" e2e` shows no other spec growing a branch by hand.

- **After stop 3:**
  - **Joining Playwright JSON reports.** `rg -ln 'results\.json' scripts .github`: the nearest
    sibling is `scripts/e2e-failure-report.ts`, which walks every lane's `results.json`
    (`E2E_RESULTS_DIR`, `ci.yml:680`–`:683`) and sums them for the published report through
    `collect(json)` (`:603`). It writes no joined file and exports no join. The repeat lane uploads
    one `test-results/results.json` (`local-backend-proof.yml:1031`, `:1045`), and the lane's own
    reader (`:970`) and the cap read one file. So the two passes are joined at the lane, by
    `mergedReport` in the cap's own module (`scripts/ci/repeat-cap.ts`). `flake-check.yml:145`
    copies one run's file and joins nothing. Not changed.
  - **Reading `timeout-minutes`.** `rg -n 'timeout-minutes' scripts`: the workflow reader (extended,
    not forked) and `scripts/ci/turn-checks.ts:75`–`:121`, which parses `ci.yml` with Bun's YAML
    parser (`parseYaml`, `:96`) to give each local step its deadline. That is a second reader of
    workflow text for a different use, local runs of CI's steps. It predates this turn. Not
    changed, and raised in §13.
  - **The bench's shape list.** `SHAPE_NAMES` (`scripts/feed-bench.ts`) is now the one list. The
    plan is keyed by it and `verdict()` reads it. `rg -n '"all, everywhere"' scripts` finds it only
    in that file: the list (`:88`), and the plan's key (`:666`), which the type
    `Record<ShapeName, …>` holds to the list.

## 7. Allowlists and guards

- `scripts/conformance/briefs-allowlist.txt`: 1 line → 0. The `f1-doors-7d.md` line was removed at
  STEP 0, as the brief says.
- `scripts/conformance/import-cycles-allowlist.txt` (new): 0 lines. Its header says an empty file
  means `src/` holds no cycle through `src/i18n/`.
- `scripts/conformance/shared-values-allowlist.txt`: unchanged (6 lines; not in §2).
- `scripts/conformance/shared-value-tables.txt`, a manifest rather than an allowlist:
  - one header line for the third form;
  - `category_tree_pointers` moved from "read, not shared" to "shared with its readers", with
    nine readers.
- The new guards and their self-tests:
  - CF-CYCLE-1/2, with planted cycles, wired (`wired.test.ts:263`).
  - The migration guards' planted reader failures, in `check-migrations.sh`'s self-test, wired by
    the six `bun "$MIGRATION_READER" <mode>` lines.
  - GW-4 and the planted fixture `bad-datatable-minwidth-class-example.tsx.txt`.
  - CF-LVB-10's seven planted breaches.
  - CF-LANES-4's planted readers.
  - After stop 3: CF-LANES-5's six planted cases; CF-CID-11 red with 38 planted; RCAP-10/11's caps
    and missing report. No allowlist changed after stop 3: none is in
    `git diff --name-only 0b811d99f..HEAD`. `scripts/conformance/non-null-allowlist.txt` is
    unchanged (`scripts/feed-bench.ts (14)`, `scripts/feed-bench.test.ts (2)`), and the non-null
    census in the laws run after ruling 5 passed: no file gained one.

## 8. Strings

none — FLAG no-new-string. `git diff --name-only 96b53abfe` holds no `src/i18n/` file.

## 9. Migrations

none — FLAG no-migration. `git diff --name-only 96b53abfe` holds no `supabase/` file.

## 10. Departures

- **Stops and rulings.**
  - Stop 1 (the census) was answered by ruling 1.
  - Stop 2 was answered by ruling 2. Item 7's planned option B would have marked
    `category_tree_pointers` shared, which meant 330 sites in 51 spec files, not "15 spec files".
    Ruling 2 chose option A, the readers form.
- **STEP 4's one commit became two:** `7d795e055` (item 2) and `c0a7d2c3f` (item 7). Stop 2 fell
  between them, and each title claims only its own item.
- **Item 8 lives in `check-datatable-minwidth.sh`, not `admin-tables.ts`** as the census planned.
  The census missed that this guard already judges every `minWidth`; extending it keeps one
  mechanism (K1).
- **Item 7 tags specs beyond "the two retried specs":** `e2e/submenu.spec.ts`,
  `e2e/submenu-touch.spec.ts`, `e2e/menu-rows.spec.ts` and `e2e/shell-bands.spec.ts`. Ruling 2,
  decision 1 covers them: "If the census finds more readers of the rail's row grid than SMN-E13,
  each joins the list, and the report names them." The readers are named in §4.
- **A helper was added:** `growScratchBranch` (`e2e/helpers/posting.ts`), so SMN-E13 can measure
  before it sizes its branch.
- **Rule 20 says spec files are edited by hand, and I used a script once** (the review's MINOR).
  It replaced a per-file reason constant with the inline literal in four spec files and removed
  that constant. The diff was then read line by line (`git diff -w`). The self-review found the
  script had removed one blank line, restored it, and put the tag objects in one form
  (`0b811d99f`).
- **The real-row output order changed:** rows print first, then picks. Verdicts and keys are
  unchanged (§3).
- **Stops 3 and 4, and rulings 3, 4 and 5.**
  - Stop 3: ruling 2 named the repeat lane as SMN-E13's proof, but the lane's command left
    `@global-state` out. Ruling 3 chose option A (DEC-415).
  - Stop 4: the bench yielded twice. Ruling 4 set the quiet window, INC-1228 and two ceilings.
  - Ruling 5 came after the bench's PASS, on the self-review's finding (INC-1230), and added seven
    ceilings.
- **Where the serial pass's count lives (ruling 3, decision 1):** in the select step's planner in
  `.github/workflows/local-backend-proof.yml`. A second `--list` (`--project=mobile-360 --grep
  "@global-state" --grep-invert "@a11y"`) feeds the same python counter, which adds the serial
  tests to each spec's `n` and writes them as a fifth column, `s`. `REPEAT_EACH`, the per-spec fit
  and the deadline therefore hold both passes. `scripts/ci/lane-plan.ts` and
  `scripts/e2e-select.ts` did not change, and neither did which specs the lane selects.
  `scripts/ci/repeat-cap.ts` gained `--merge`.
- **Both lists take `--pass-with-no-tests`.** Playwright 1.58's `--list` throws "No tests found"
  when nothing matches. A spec whose tests are all `@global-state`, or none of them, would
  otherwise fail the planner.
- **A further file this turn needed:** `scripts/conformance/workflow-reader.ts` gained
  `Job.minutes`, so CF-CID-11 reads the job's number through the one reader (K1) rather than a
  pattern of its own. It is under `scripts/conformance/`, in the brief's SCOPE.
- **How `verdict()` learns the bench's shapes (ruling 4, decision 3):** from `SHAPE_NAMES`, the
  exported list in `scripts/feed-bench.ts`. The measuring plan is a `Record<ShapeName, …>` that the
  bench iterates in the list's order. A shape cannot be added to the plan without joining the list,
  and `verdict()` names every listed shape that has no result. The page size is `number | null`,
  and `null` is "not measured".
- **The commit order (ruling 5):** the three code commits of ruling 4 landed as `cdb69a574`
  (INC-1228), `b10c21af1` (two ceilings), then `8623202f1` (the serial pass and the bench's limit).
  Ruling 4 listed them the other way round. The first two were committed while the bench ran, and
  `8623202f1` waited for the bench's numbers. Ruling 5 let the order stand. Then come `559d4eb8a`
  (INC-1230) and `c692533e6` (seven ceilings).
- **The order of the checks (ruling 4, decision 5; ruling 5, decision 3), this turn's alone:**
  - `bun run checks` once, whole, while the bench ran, on ruling 3's decision 1 with ruling 4's
    decisions 2–4. Then the self-review and its fix, followed by the checks that fix can affect.
  - After the bench, only `timeout-minutes`, DEC-412's numbers and the measured-length lines
    changed. They were followed by prettier and the script tests that read
    `.github/workflows/feed-bench.yml`. No test names the file, and six read it by walking
    `.github/workflows` (`rg -l '\.github/workflows' scripts -g '*.test.ts'`, each hit read):
    `scripts/conformance/ci-deadlines.test.ts`, `ci-images.test.ts`, `repeat-lane.test.ts`,
    `db-proof.test.ts`, `scripts/ci/start-failure-excerpt.test.ts` and `redact.test.ts`.
  - After ruling 5's two commits, the tests that read the files they touch:
    - the six above, for the workflow;
    - `scripts/feed-bench.test.ts` and `ci-deadlines.test.ts`, for `scripts/feed-bench.ts`;
    - `ci-deadlines.test.ts`, `ci-images.test.ts` and `db-proof.test.ts`, for the workflow reader;
    - `scripts/bundle-closure.test.ts`, `scripts/ci/turn-checks.test.ts`,
      `scripts/ci/lovable-branch-guard.test.ts`, `scripts/conformance/wired.test.ts` and
      `card-tiers.test.ts`, for `scripts/route-budgets.mjs`.

    Then the laws whole: their censuses walk every file under `scripts/`. Then prettier, and the
    build with `check-bundle-size.mjs`. The gate was not run a second time; CI judges the final
    tree whole.
- **The self-review's fix:** with no test in the parallel pass, `test-results/` did not exist
  before the serial pass. A serial pass the cap stopped before any test loaded would then have
  stayed silent. Now the workflow sets aside an empty report (`{"suites":[],"errors":[]}`) and
  always runs `--merge`, which names that cap on the evidence file, and `mergedReport` keeps the
  serial pass's stats when only that pass has them (RCAP-10). It was proven by dry runs of the run
  step in `/tmp/ethio-scratch/tests-ci-2/dry/`, with stub `bun` and `bunx` commands: serial green
  exits 0 with the serial stats; serial capped before load exits 0 and writes the cap line.
- **The review line is the self-review of the pushed tree.** Its MINOR is the rule-20 script edit to
  four spec files (above). Ruling 5 let the commit order stand, so that is not a finding. The
  summary gap in §13 was found after the push, reading CI. The self-review missed it: it would
  have been a MAJOR (a proof that does not reach the published evidence).
- **Whether the publish step runs after a job timeout stays unproven** (ruling 5, decision 1). The
  limit now holds the gate's whole wait plus the run's allowance, so every honest end is the
  script's own exit with its status file; only a hang meets the limit.
- **Run 44894986213 (the stop-4 push, `3be465ac3`) ended red** on the first-download budget job
  alone, on `/account_/saved` and `/l/$slug` after dev's L22c, as ruling 4 foresaw. That was the
  red of a report commit, and it was not re-run. Commit `b10c21af1` carries the two lines.
- **Scratch** (the operator's to remove), under `/tmp/ethio-scratch/tests-ci-2/`:
  - `dry/` (the run step's dry runs);
  - `fb-red-first.txt`, `feed-bench.base.ts`, `feed-bench.fixed.ts`, `cid11-red.txt`;
  - `checks-r4.log`, `laws-r5.log`, `build-r5.log`, `bundle-r5.log`;
  - `bench-log.txt`, `bench-run.json`, `feed-bench-status-lane.md`, `feed-bench-status.md`;
  - `band-check.mjs`, `ceil7.mjs`, `section2.mjs`, `checks-watch.txt`.

  `ceil7.mjs` made the seven ceiling edits and `section2.mjs` wrote §2's list; each checks its
  anchors before writing.
- **DECIDE-AND-NAME:**
  - The seed's seller count: 2,048.
  - The ratchet's per-page numbers: the table in §3.
  - Where each fix lives: the §3 rows.
  - The cycle's break: none to make. `src/` holds no cycle at the base (the census, item 4); the
    guard landed, as ruled.

## 11. CI

- The base, `96b53abfe`: the first six lines of ci-status.md at the census read:

  ```
  # CI Status (auto-generated — do not edit by hand)

  - Commit: `96b53abfecb1ec414f02c24da533b4b8aa0c297d` (short `96b53ab`)
  - Conclusion: **SUCCESS**
  - Completed (UTC): 2026-11-21T05:14:11Z
  - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44869352644
  ```

  The two-step check: the conclusion is SUCCESS, and the reported commit equals the base. No red of
  an earlier turn was open.
- The lane's runs before the final push:
  - `a9504b98a`: SUCCESS (run 44881157073; branch ci-status.md, conclusion and commit both checked).
  - `3be465ac3` (the stop-4 push, the pull request merged with dev `37b62562a`): run 44894986213,
    red on one job, "First-paint bundle budget (gzipped ceiling)". `/account_/saved` measured 221.8
    against 222 and `/l/$slug` 248.8 against 249, inside the NEAR band after dev's L22c. Class:
    a ceiling. The cause was dev's growth, ruled on pull request #89. That was the red of a report
    commit (ruling 4, decision 1), not re-run, and fixed by `b10c21af1`.
- **The final code commit `c692533e6`: SUCCESS.** CI run 44900066596 (`pull_request`, the pull
  request's merge with dev, `6fa954a0e`), completed 2026-11-21T11:52:17Z. The lane's
  `ci-status.md` on ci-evidence (`docs/tracking/branches/cursor/tests-ci-2/`) reads:

  ```
  # CI Status (auto-generated — do not edit by hand)

  - Commit: `c692533e6c5ba3343646509e914de9d5a37bd075` (short `c692533`)
  - Conclusion: **SUCCESS**
  - Completed (UTC): 2026-11-21T11:52:17Z
  - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44900066596
  ```

  The two-step check: the conclusion is SUCCESS, and the reported commit equals the pull request's
  head (`gh api …/pulls/87`: `c692533e6c5ba3343646509e914de9d5a37bd075`). `gh pr checks 87`: 43
  pass, 1 skipping ("Promote to main (fast-forward on green)", which promotes only from dev).
- **The budget job of that run** ("First-paint bundle budget (gzipped ceiling)", job 136833933445),
  read before this report as ruling 4, decision 4 and ruling 5, decision 2 require: `Bundle budget
  OK.`, `JS: 201.7 KiB / 203 KiB — ok`, `CSS: 22.5 KiB / 23 KiB — ok`, and:
  `/account_/saved` 221.8 / 223, `/l/$slug` 248.8 / 250, `/admin/listings` 326.5 / 328,
  `/admin/listings_/$listingId_/edit` 408.2 / 410, `/legal/publishing` 207.5 / 209,
  `/my-listings_/$listingId` 319.6 / 321, and 400.3 / 402 for `/my-listings_/$listingId_/edit`,
  `/post` and `/post_/$listingId`. The merge holds L22c, so the two L22c pages read as run
  44894986213 did. It does not hold Lovable bundle 1, so the seven sit below the supervisor's
  merged sizes.
- **The repeat lane's serial pass (DEC-415; ruling 3, decision 2)**, job 136833978303, green:
  - The select step's environment: `REPEAT_PARALLEL_TESTS: 23`, `REPEAT_SERIAL_TESTS: 11`,
    `REPEAT_EACH: 2`, `REPEAT_BUDGET_SECONDS: 643`. The selected specs include the five reader
    specs: `e2e/menu-rows.spec.ts`, `e2e/shell-bands.spec.ts`, `e2e/submenu-look.spec.ts`,
    `e2e/submenu-touch.spec.ts` and `e2e/submenu.spec.ts`.
  - The lane's `local-backend-repeat.txt` (artifact `e2e-log-repeat`): `- Repeat serially (DEC-415):
    11 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker
    after the parallel pass`.
  - The lane log (artifact `local-proof-repeat`): `Running 88 tests using 1 worker` … `34 skipped`,
    `54 passed (2.3m)` for the parallel pass, then `Running 44 tests using 1 worker` …
    `22 skipped`, `22 passed (54.9s)` for the serial pass.
  - The joined `test-results/results.json`, walked by
    `/tmp/ethio-scratch/tests-ci-2/art/readers.ts`: 132 results (76 passed, 56 skipped, 0 failed,
    0 flaky), stats `expected 76, skipped 56, unexpected 0, flaky 0`, and 0 top-level errors. Every
    reader test (SMN-E4 twice, SMN-E7 twice, SMN-E9, SMN-E10, SMN-E13, ROWS-E1, ROWS-E3, ROWS-E4,
    BND-E3: 11 tests) passed both repetitions on desktop-1280: 22 of 22. On mobile-360 the same 22
    are skipped by each test's own `test.skip` (desktop only). No reader failed on a later
    repetition, so ruling 3, decision 2 needs no fix at a test. The planner counted 23 parallel
    tests, and the parallel pass ran 88 results, which is 22 tests × 2 × 2. Which counted test
    did not run is not read here; it changes nothing in the serial proof.
  - The published summary (`local-backend-proof.md` on ci-evidence) does not show the serial line.
    Its aggregator keeps only `- Repeat: `, `- Repeat in WebKit` and `- Not repeated` lines
    (`.github/workflows/local-backend-proof.yml:1222`). Found after the push (§13).
- **The Feed bench**, run 44896403216 (`workflow_dispatch` at `3be465ac3`), read whole:
  - log: `staging gate: staging quiet after 2 s` … `PASS: every target met`; `Feed bench passed.`
  - status file (`docs/tracking/branches/cursor/tests-ci-2/feed-bench-status.md` on ci-evidence):
    Verdict PASS; `Listings seeded: 100500 · seed 1329.9 s (sellers 116.0 s, listings 1183.7 s) ·
    cleanup 157.1 s · leftovers 0 · sellers 2048 · market QM free 50`.
  - p95 per shape: all, everywhere 3.07 ms; top, country 3.50; leaf, city 3.03; top, city,
    widening 3.39; page 50 by cursor 4.51; guest host, country 2.98 (30 runs each, 20 cards each;
    target 50 ms). Page size 15,006 bytes (target 30,720).
  - The job ran 10:52:45 → 11:17:58 UTC, 1,513 s. The bench step ran 1,496.3 s, which leaves 7 s
    for pre-clean and measure after gate, seed and cleanup. The other steps took 17 s.
  - The earlier dispatches 44892283273 and 44894899898 yielded (stop 4, INC-1228).

## 12. Limits

- Actionlint and gitleaks are NOT RUN locally (linux/x64 binaries on darwin/arm64). CI's
  build-and-check and secrets-scan jobs are their proof.
- `pull_request_target` takes the workflow from the base branch. Until DEC-413's workflow is on
  dev, a `lovable/*` pull request runs no Lovable branch guard: the `ci.yml` step is removed in this
  pull request, and the new workflow takes effect only after the merge. No `lovable/*` pull request
  exercised the new workflow in this turn.
- **Tests that timed out under load (ruling 2, decision 3; INC-1227 owns the class).** A
  `bunx vitest run scripts --maxWorkers=2` run on `7d795e055` took 512 s with load averages of
  3.72, 18.00 and 15.80 (`uptime`, right after). CF-LANES-4 and CFRR-3 failed there with
  "Test timed out in 5000ms". Alone they passed in 513 ms and 1,112 ms. The later runs took 94 s
  (load 3.48–5.52) and passed whole.
- The Feed bench was dispatched by the operator (rule 50). Its run is read in §11.
- The repeat lane's proof of SMN-E13 and the other readers is CI's (DEC-283). No local repeat.
- The repeat lane's two-pass run step and its planner ran locally only as dry runs, with stub
  `bun` and `bunx` commands (§10). Their first real run is this pull request's repeat lane (§11).
- Actionlint did not judge `local-backend-proof.yml` or `feed-bench.yml` locally (above). CI's
  Workflow lint did.
- Whether the bench's publish step runs after a job timeout is unproven (ruling 5, decision 1).
- The seven ceilings of ruling 5 rest on the supervisor's build of the merged trees. This tree
  holds neither L22c nor bundle 1, so this lane's own build cannot reproduce those sizes (§3).

## 13. Findings

- **Rule-text finding for the supervisor.** `triggerFindings`
  (`scripts/conformance/shared-values.ts:145`) reads migrations with its own comment blanking
  (`/--[^\n]*/g`), not the migration reader's `sqlCodeOf`. A `--` inside a quoted literal before a
  `CREATE TRIGGER … FOR EACH STATEMENT` would hide that trigger from CF-LANES-4's growth rule. It is
  small, but it is outside item 5's three named guards and was found after the gate. It belongs
  with INC-1205's class.
- **INC-1186:** the guard is judged from the base (DEC-413).
- **The bench's seed cost (ruling 1, decision 2).** Run 44896403216 seeded in 1,329.9 s: sellers
  116.0 s, listings 1,183.7 s. With 2,048 sellers the seed fell from 1,925 s (run 43872334867,
  256 sellers) to 1,329.9 s. The listings' insert is the larger cost by far, 89 % of the seed. The
  status file does not split the insert from the per-row feed-index refresh it triggers, so
  whether the refresh is the larger part is not shown by these numbers. Not fixed here (no
  migration in this turn).
- **A second reader of workflow text.** `scripts/ci/turn-checks.ts` parses `ci.yml` with Bun's YAML
  parser (`parseYaml`, `:96`) to run CI's steps locally with their deadlines (`:121`). The
  conformance tests read workflows through `scripts/conformance/workflow-reader.ts`, by
  indentation. The two uses differ: one runs steps, the other judges text. But both read a job's
  `timeout-minutes`. It predates this turn and is not changed. Whether one reader should serve
  both is a question for the register (K1).
- **The gate's 40 minutes against the job's limit (INC-1230).** Found by this turn's self-review
  and fixed under ruling 5, decision 1 (§1, §3).
- **The serial pass's line does not reach the published summary. This turn's own miss, found
  reading CI after the push.** The lane writes `- Repeat serially (DEC-415): …` to
  `local-backend-repeat.txt`, as ruling 3 asks, and the line is in the lane's artifact
  (`e2e-log-repeat`). But the aggregator that writes `local-backend-proof.md` keeps only lines
  starting with `- Repeat: `, `- Repeat in WebKit` or `- Not repeated`
  (`.github/workflows/local-backend-proof.yml:1222`, the `line.startswith((…))` tuple). So the
  summary on ci-evidence shows the parallel pass and not the serial one. A serial pass the cap
  stopped is still shown, since its line starts with `- Not repeated (time cap):`. The tuple is a
  list the new line had to join, and my plan's census did not grep the aggregator for the repeat
  file's line prefixes. The fix is one entry, `'- Repeat serially'`, in that tuple. It is not
  pushed, because ruling 5 orders one push and this pull request's checks are green on
  `c692533e6`. It is the supervisor's to rule: a follow-up commit on this pull request, or the next
  tests and CI turn. The failure reporter's reader (`scripts/e2e-failure-report.ts:1594`–`:1612`)
  takes the last `- Repeat: ` line (`REPEAT_SUMMARY`), and the serial line's prefix keeps it out of
  that match. But the same reader counts every line starting with `TIME_CAP_LINE`
  (`- Not repeated (time cap): `, `:1584`) as one test run the cap left. The serial pass's cap line
  starts with it, so a serial pass the cap stopped would count as one test run, not its tests'
  runs. That case did not occur in run 44900066596 (no cap line). This is a second reader of the
  repeat file that the census missed; its fix belongs with the first.
- No security hole was found in this turn's reads.

## 14. Records

- DEC — DEC-412 — the Feed bench's Sunday run moves at least two hours before the earlier nightly cron (`cron: "10 13 * * 0"`); its seed spreads over 2,048 scratch sellers; `timeout-minutes` 78 from the dispatched run 44896403216 (gate 2 s, seed 1,330 s, measure 7 s, cleanup 157 s).
- INC — INC-1181, INC-1182 — status line: CLOSED — DEC-412; the dispatched run 44896403216 (3be465ac3): PASS, 100,500 listings seeded over 2,048 sellers in 1,329.9 s (sellers 116.0 s, listings 1,183.7 s), cleanup 157.1 s, leftovers 0; every shape's p95 between 2.98 and 4.51 ms (target 50); one page 15,006 bytes (target 30,720); 1,513 s from start to end.
- DEC — DEC-415 — the repeat lane also repeats the selected specs' `@global-state` tests, in a serial pass at one worker after its parallel pass, inside the same budget (the select step's planner in `.github/workflows/local-backend-proof.yml`: a second `--list` for the serial pass, its tests added to each spec's count and written as the fifth column `s`; CF-LANES-5). Judge (frozen, G22): over the next ten runs whose repeat lane selects a `@global-state` test, the lane ends inside its deadline in every one; a miss sends the serial pass's budget back to the tests and CI turn, never to a lower repeat count by hand. A test that fails only on a later repetition is that test's own defect.
- INC — INC-1228 — the Feed bench's log printed `PASS: every target met` on two runs that yielded before measuring anything (44892283273, 44894899898), and its status file printed a page size of `0 bytes`. `verdict()` called no measured shape a pass, `main()` printed its lines after a yield or a failure, and the unmeasured page size was the number 0. The outcome line and the exit code were right. Class: a line that states a success or a measurement the run did not make (phantom success; a sentinel number). Mechanism: `verdict()` and the status renderer in `scripts/feed-bench.ts`. Fix: a PASS line only when every shape in `SHAPE_NAMES` and the page size were measured and met their targets; each value not measured gets its own `NOT MEASURED: …` line in the log and `- Not measured: …` / `Page size (…): not measured` line in the status file; the page size is `number | null`, never 0 for an absence; a run that neither failed nor yielded and measured less than everything is a MISS; FB-10, FB-11. Status: CLOSED by cdb69a574.
- INC — INC-1230 — the Feed bench's job limit was shorter than its gate's maximum wait plus its run: the gate waits up to `GATE_WAIT_MINUTES` for quiet staging inside the job, and the limit was half as much again of one measured run whose gate wait was short (60 from run 43872334867, then 38 from run 44896403216). A long wait ended in a job timeout with no honest SKIPPED status. Found by the executor's self-review. Class: a limit computed from one measured run where a part has a designed maximum. Mechanism: the job's `timeout-minutes` and the two constants in `scripts/feed-bench.ts`. Fix: the limit is the gate's whole wait plus the run's allowance, held together by CF-CID-11. Status: CLOSED by 559d4eb8a.
- INC — INC-1190 — status line: CLOSED, no defect — the dev push's tree was judged by the earlier
  run 44061994764 ("Bundle budget OK"); the skip stands.
- INC — INC-1198 — status line: CLOSED — 49 of 50 page ceilings and the entry's JS (205 → 203) and
  CSS (40 → 23) at `ceilingForLocal(size)`; the ratchet message names `ceilingFor(size)` (DEC-296;
  BC-10).
- INC — INC-1193 — status line: OPEN — `src/` has no import cycle at the base or at L10 (this
  census); the cycle guard landed; the cause needs the preview's stack.
- INC — INC-1205, INC-1207 — status line: CLOSED — the proof table rule and the real-row and
  real-pick rules on the migration reader (`scripts/conformance/migration-guards.ts`, four modes of
  `migration-reader.ts`), verdicts byte-equal on every migration; every guard checks its reader's
  exit; a planted reader failure proves each (six mutations).
- INC — INC-1206 — status line: CLOSED — CF-LVB-13 and CF-LVB-14 read a ceilings fixture of their
  own (twelve lines of about 4 KB each), never the live `scripts/route-budgets.mjs`.
- INC — INC-1210 — status line: CL-E10's cause is INC-1226 (Lovable's); SMN-E13 fixed here (it reads
  the menu's rows with its own scratch root on the rail and grows its branch after,
  `e2e/submenu-look.spec.ts:231`; `@global-state`; `c0a7d2c3f`).
- INC — INC-1015 — status line: CLOSED — SMN-E13 reads the rail after its own scratch root is in place and runs serially (`@global-state`); `category_tree_pointers` is "shared with its readers" (SMN-E4, SMN-E7, SMN-E9, SMN-E10, SMN-E13, ROWS-E1, ROWS-E3, ROWS-E4, BND-E3), and CF-LANES-4 refuses an untagged reader; the repeat lane's serial pass repeated every reader 2 times in run 44900066596 (DEC-415).
- INC — INC-1226 — a tooltip opens over an open menu when the overlay code arrives after the click,
  so Escape closes the tooltip and leaves the menu open (`src/components/ui/overlay-facade.tsx`;
  this census). Class: two overlays opened by one press. Owner: Lovable's next turn, red first.
- INC — ACT-023 — status line: CLOSED — `check-datatable-minwidth.sh` refuses a `minWidth` that is
  not exactly one `min-w-*` class (`scripts/datatable-minwidth.ts`, from the syntax tree), proven by
  `scripts/fixtures/bad-datatable-minwidth-class-example.tsx.txt` and GW-4.
- DEC — DEC-413 — the Lovable branch guard is judged from the base: its own workflow on
  `pull_request_target` for `lovable/*` heads, the base checked out, the head read as data only.
  INC-1168 (c)'s carry step is not built.
- INC — INC-1186, INC-1168 (c) — named by number only in this report (G51); the supervisor writes
  their records at the records turn after the fix is live.
- roadmap — line 31: "DONE ([pull request](https://github.com/tesfayekb/ethio-marketplace/pull/87))".
- register row — CF-CYCLE: the import-cycle census over `src/i18n/` and its importers
  (`scripts/conformance/import-cycles.ts`, CF-CYCLE-1/2, allowlist `import-cycles-allowlist.txt`).
- register row — the migration guards on the reader: `scripts/conformance/migration-guards.ts`
  under register row 125's reader (`--table-creates`, `--real-rows`, `--real-picks`,
  `--real-row-split`).
- register row — CF-LANES-4's third form, "shared with its readers" (`readerFindings`,
  `scripts/conformance/shared-values.ts`).
- register row — the CI lanes row gains the repeat lane's serial pass (DEC-415): the select step's
  planner counts it, `scripts/ci/repeat-cap.ts --merge` joins its report to the parallel pass's,
  and CF-LANES-5 (`scripts/conformance/lanes.test.ts`) guards it.
- register row — the CI deadlines row gains CF-CID-11: the Feed bench's `timeout-minutes` equals
  `GATE_WAIT_MINUTES` + `RUN_ALLOWANCE_MINUTES` (`scripts/feed-bench.ts`), read through the one
  workflow reader's `Job.minutes` (INC-1230).
- changelog — the tests and CI turn 2: the Feed bench at 2,048 sellers on Sunday 13:10 UTC
  (DEC-412), its limit the gate's whole wait plus half as much again of the measured run (78
  minutes, INC-1230), and no PASS line or number for anything it did not measure (INC-1228); every
  ceiling ratcheted to its page (INC-1198), then nine raised for dev's L22c and Lovable bundle 1
  (DEC-296); the import-cycle guard (CF-CYCLE); the migration guards on the one reader (INC-1205,
  INC-1207); a `minWidth` is one `min-w-*` class (ACT-023); the Lovable branch guard judged from
  the base (DEC-413); the rail's readers serial and SMN-E13 measured after its own root (INC-1015);
  the repeat lane repeats `@global-state` tests in a serial pass (DEC-415).
- operator action — after the merge, make "Lovable branch guard (DEC-413)" a required check (ruling
  2, decision 2).
- slip — CF-LANES-4 and CFRR-3 timed out under load (load averages 3.72, 18.00, 15.80; §12); for
  the supervisor to add to INC-1227 (ruling 2, decision 3).
