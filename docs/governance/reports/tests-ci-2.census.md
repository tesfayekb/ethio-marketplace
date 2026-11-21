# tests-ci-2 — the census (STEP 1)

Base: dev 96b53abfe. `origin/dev` at the census: `96b53abfecb1ec414f02c24da533b4b8aa0c297d` (equal
to the base; `git log 96b53abfe..origin/dev` is empty). CI for the base: run 44869352644,
**SUCCESS** (ci-evidence `docs/tracking/ci-status.md`, completed 2026-11-21T05:14:11Z).

Every number below comes from a command run in this turn. Scratch copies live under
`/tmp/ethio-scratch/tests-ci-2/` (the cycle tool `cycles.ts`, the L10 export `l10/`, the offline lane
plan `plan.ts` with `weights-7a.json` and `specs-7a.txt`, the lane 2 log `lane2.log`); they are the
operator's to remove.

The census answers by item. Every item takes the brief's twelve keys. `callee-codes` is not
applicable to any item: this turn changes no door, so there is no callee code to read.

---

## Item 1 — INC-1181 + INC-1182: the Feed bench's seed and its schedule

- **consumers** — the weekly Feed bench (`.github/workflows/feed-bench.yml`). It seeds 100,000
  listings on ethio-staging, measures the feed and cleans up. The bench's schedule must not
  overlap the Nightly E2E (`.github/workflows/nightly-e2e.yml`). Both are on DEC-168's staging gate
  (`scripts/staging-gate.ts`, `STAGING_WORKFLOWS`: CI, Nightly E2E, Guard Proof, Feed bench).
- **definition** —
  - `.github/workflows/feed-bench.yml:12` cron `"10 16 * * 0"`. The header comment at `:3`–`:9`
    names 16:10 UTC (DEC-171). `:28` sets `timeout-minutes: 90` with the comment "DEC-168 — up to
    40 minutes waiting…". The "Run the bench" step has no step timeout.
  - `.github/workflows/nightly-e2e.yml:18` cron `"30 15 * * *"`, `:19` cron `"30 16 * * *"` (the
    DST pair; the hour gate stands one down). The job timeout is 90.
  - `scripts/feed-bench-market.ts:29` `export const SELLERS = 256;` (its comment: "376–378
    baseline rows each"); `:31` `SELLER_BATCH = 16`; `seedPlan(rows, sellers, tierOf, baseline)`
    returns `{ sellerOf: g => (g - 1) % sellers, baselineRows, free: max + 1 }`.
  - `scripts/feed-bench.ts` (703 lines): `LISTINGS` 100000, `HOT` 500, `BATCH` 250,
    `GATE_WAIT_MINUTES` 40. `seedStart` is taken before `createSellers`, so the seed's seconds
    include seller creation. `benchSellerIds` pages `listUsers` 200 per page, capped at 500 pages.
- **tests** — `scripts/feed-bench.test.ts`, FB-1 … FB-9. FB-8 asserts `expect(SELLERS).toBe(256)`,
  the `[376, 378]` spread and `plan.free).toBe(379)` (`:152`–`:155`); it changes with the seller
  count. Next free id: FB-10.
- **lists** — no conformance allowlist names the bench. `wired.test.ts` does not name
  `feed-bench-market`. Register rows 113 and 114 (the free-slot law) name the guard; no row names
  the seller count.
- **old-file-readers** — `scripts/feed-bench.ts` and `scripts/feed-bench.test.ts` import
  `feed-bench-market`. `docs/features/feed-engine.md` (about :48: 256 sellers, 376–378, free 379;
  :52: "weekly on Sunday at 16:10 UTC") and `docs/features/ci-guards.md:1087` (the schedule's
  history) state the numbers in prose. No test reads `feed-bench.yml` by path.
- **second-readers** — none: no `vi.mock` and no dynamic `import()` of `feed-bench-market` or
  `feed-bench`.
- **chunk-graph** — not applicable: no browser module changes.
- **environments** — the bench runs on GitHub's runner against ethio-staging, on the Sunday cron
  and on `workflow_dispatch`. The nightly runs daily at 15:30 and 16:30 UTC (one stands down by
  the hour gate).
- **mechanisms** — the free-slot guard `listings_free_slot_guard` counts, for each inserted row,
  the seller's other live baseline rows in the market (`seller_regular_live`). The cost per row
  grows with the seller's row count.
- **first-download** — not applicable (no page code).
- **premises** —
  - **INC-1181 attributes the 31-minute seed to the free-slot guard by estimate, not by
    measurement.** Measured on dispatched run 43872334867 (2026-11-16, PASS): seed 1925.1 s,
    cleanup 135.5 s, 256 sellers, market QM free 379. The job ran 13:04:41 → 13:44:17. The "Run
    the bench" step took about 39 m 21 s, so the gate, the pre-clean and the measure took about
    5 minutes together. The pre-guard seed of 2026-11-01 took 384 s with one seller. The previous
    census (`tests-ci.stop-1.md:129`) estimated the guard at 30–90 s; the measured extra is about
    1,541 s.
  - A second per-row cost exists beside the guard. `feed_index_refresh` runs for every inserted
    active row (statement trigger `feed_index_on_listing_insert`). It was redeclared in
    `20261104153313` and `20261108070500`, which added `level_perks_for(v_tier, v_category_id,
    v_country)` and a locations join to every refresh. That cost does not depend on the seller
    count. The only listings index carrying `seller_id` is `listings_seller_idx`
    (`20260804174739:65`).
  - Arithmetic, an ESTIMATE: if the whole 1,541 s extra is the guard and grows linearly with
    baseline rows per seller (377 at 256 sellers), then 2,048 sellers (about 47 rows each) leave
    about 192 s extra. If the dispatched run's seed stays slow, the residual is the per-row index
    refresh, and that is a finding for the feed engine, not this turn.
  - Scheduled runs failed on 11-08 and 11-15 (about 1 m 20 s each). Run 43833961883 failed
    (YIELDED) after 34 minutes.
- **findings** — none beyond the premise above.
- **queued** — roadmap line 31 (INC-1181, INC-1182): built here.

**Proposal (DECIDE-AND-NAME):**
- `SELLERS = 2048` (`SELLER_BATCH` 16 kept, so 128 rounds). FB-8's numbers move with it.
- The seed's log names seller creation's seconds apart from the listings' seconds, so the
  dispatched run attributes the cost.
- The cron moves to `"10 13 * * 0"` (Sunday 13:10 UTC): 2 h 20 min before the earlier nightly
  cron (15:30 UTC), so DEC-412's two hours are kept.
- `timeout-minutes` is set from the dispatched run's gate + seed + measure + cleanup.

## Item 2 — INC-1186 + INC-1168 (c): a security-class finding

- **consumers**, **definition**, **tests**, **lists**, **old-file-readers**, **second-readers**,
  **mechanisms** — not applicable until the supervisor gives INC-1186's substance in the chat
  (G51). The census names INC-1186 by number only.
- **INC-1168 (c), read at the base** — it still asks for a carry step that rebuilds a Lovable pull
  request from `dev` plus exactly the approved files.
- **chunk-graph**, **first-download** — not applicable (no page code known).
- **environments** — the Lovable branches' pull requests into `dev`, and the CI's Lovable guard
  (`ci.yml` scope job `:66`–`:79`, `scripts/ci/lovable-branch-guard.sh`).
- **premises** — none can be checked before the substance arrives.
- **findings** — none.
- **queued** — roadmap line 31: built here, as ruled.

## Item 3 — INC-1190 + INC-1198: the budget on every dev push, and the ratchet

- **consumers** — every page's first-download ceiling, and the per-push CI budget job.
- **definition** —
  - `.github/workflows/ci.yml` (879 lines): the scope job `:51`–`:100` (its decide step runs
    `bun scripts/ci/docs-only.ts`); `bundle-budget` `:408`–`:429`; `e2e-lanes` `:594`–`:604`; the
    promote job `:809`–`:850`. The promote job's condition admits a skipped budget only on a
    proven tree: `needs.bundle-budget.result == 'skipped' && needs.scope.outputs.docs_only ==
    'true'`.
  - `scripts/ci/docs-only.ts` (326 lines; `codeTreeId`, `decide`, `lanesGreen`,
    `MAX_CANDIDATES` 5). The code tree id sets the records aside (`docs/**` except
    `docs/generated`, `.cursor/**`, root `*.md`, the briefs allowlist). It is matched against the
    artifact `code-tree-<id>` of a green CI run whose lanes ran.
  - `scripts/check-promote-needs.sh:17` `DOCS_SKIPPABLE=(e2e-lanes bundle-budget)`; `:92` requires
    the exact `if:` form; fixture `scripts/fixtures/ci-promote-needs-bad.yml`.
  - `scripts/check-bundle-size.mjs` (331 lines): `BUDGET_KIB` js 205, css 40. A page in the NEAR
    band exits 1.
  - `scripts/route-budgets.mjs` (282 lines): one line per page, e.g.
    `  "/my-listings": { ceiling: 315, public: false }, // DEC-296 …`. `RATCHET_SLACK_KIB = 8`
    (`:81`).
  - `scripts/bundle-closure.mjs:170`–`:207` `judgeRouteBudgets`: a page 8 KiB or more under its
    ceiling fails, and the message suggests `Math.ceil(kib + 3)` (`:189`). That suggestion does
    not agree with DEC-296's `ceilingFor`.
  - `scripts/budget-band.mjs`: `NEAR_KIB` 0.3, `LOCAL_ALLOWANCE_KIB` 0.1,
    `ceilingFor(size) = floor(size + 0.3) + 1`, `ceilingForLocal(size) = ceilingFor(size + 0.1)`.
    The NEAR check fails when `ceiling - used < 0.3 - 1e-9`.
- **tests** — `scripts/ci/docs-only.test.ts` CF-DOCS-1 … 11 (next free CF-DOCS-12);
  `scripts/bundle-closure.test.ts` BC-9, BC-10 (`slack: 8` at `:138` and `:209`; BC-10's message
  at `:161`); `scripts/conformance/budget-band.test.ts`; `scripts/ci/turn-checks.test.ts` (its
  ceilings are its own fixtures, `:252`–`:266`, `:383`–`:398`). No test pins a live ceiling.
- **lists** — `check-promote-needs.sh`'s `DOCS_SKIPPABLE`; `wired.test.ts` names
  `budget-band`, `check-bundle-size` and `docs-only`.
- **old-file-readers** — `route-budgets.mjs` is read by `scripts/ci/lovable-branch-guard.sh`,
  `lovable-branch-guard.test.ts` (item 6), `check-bundle-size.mjs`, `chunk-modules-plugin.mjs`,
  `budget-band.mjs`, `bundle-closure.mjs` and its test, `wired.test.ts`,
  `conformance/card-tiers.test.ts` (imports `CARD_PAGES`, `TIER_FLAG_MARKER`,
  `tierFlagViolations` only) and `ci/turn-checks.test.ts`. `docs-only.ts` is read by `ci.yml`,
  `ci-status-report.yml`, `e2e-failure-report.ts`, `wired.test.ts` and the fixture
  `scripts/fixtures/docs-only/jobs-green-43426917119.json`.
- **second-readers** — none.
- **chunk-graph** — not applicable.
- **environments** — `ci.yml` runs on every push to `dev` and every pull request. The budget job
  skips only when the scope job proves the code tree (DEC-375 a).
- **mechanisms** — read whole: `docs-only.ts`, `check-promote-needs.sh`, `check-bundle-size.mjs`,
  `route-budgets.mjs`, `budget-band.mjs`, `bundle-closure.mjs` `judgeRouteBudgets`.
- **first-download** — local lock-exact build at the base, equal to CI run 44865593517's log for
  this tree: entry JS 201.7 / 205 KiB, CSS 22.5 / 40 KiB. Every page and its room is in the
  ratchet table below.
- **premises** —
  - **INC-1190's premise is wrong.** `dev` d7c242641 (run 44067262535) skipped the budget because
    run 44061994764 had proven the same code tree: pull request `lovable/forms-monetisation`, head
    0f892c5. That run's budget job succeeded and logged `290.7 / 291 KiB /admin/users_/$userId` and
    `Bundle budget OK.` for the identical tree. No record file reaches the build (`rg` finds no
    `docs/`, `.md` or `?raw` import in `src/` or `vite.config`). Re-running the budget on `dev`
    would give the same verdict.
  - What remains real: the NEAR edge (a room of exactly 0.3 KiB passes) and the 8 KiB slack, which
    lets a ceiling sit loose for up to 8 KiB.
- **findings** — `bundle-closure.mjs:189`'s suggestion (`Math.ceil(kib + 3)`) does not agree with
  `ceilingFor`, so a page lowered as the message says lands up to 3 KiB loose.
- **queued** — roadmap line 31 (INC-1190, INC-1198): built here.

**The ratchet table (DEC-296, `ceilingForLocal`, `scripts/budget-band.mjs`):** local size, the
ceiling at the base, the room, the proposed ceiling and the change. These are 50 pages: 49
change, one stays, and the total is −120 KiB.

| Page | KiB | Ceiling | Room | New | Δ |
| --- | --- | --- | --- | --- | --- |
| `/` | 222.8 | 227 | 4.2 | 224 | −3 |
| `/$name` | 220.8 | 225 | 4.2 | 222 | −3 |
| `/account` | 264.0 | 268 | 4.0 | 265 | −3 |
| `/account_/legal` | 204.3 | 208 | 3.7 | 205 | −3 |
| `/account_/legal_/$versionId` | 204.9 | 209 | 4.1 | 206 | −3 |
| `/account_/saved` | 221.5 | 225 | 3.5 | 222 | −3 |
| `/admin` | 206.1 | 210 | 3.9 | 207 | −3 |
| `/admin/` | 206.9 | 211 | 4.1 | 208 | −3 |
| `/admin/ai` | 300.8 | 303 | 2.2 | 302 | −1 |
| `/admin/attributes` | 315.5 | 318 | 2.5 | 316 | −2 |
| `/admin/audit` | 291.6 | 295 | 3.4 | 293 | −2 |
| `/admin/categories` | 345.2 | 348 | 2.8 | 346 | −2 |
| `/admin/countries` | 304.9 | 309 | 4.1 | 306 | −3 |
| `/admin/images` | 206.7 | 210 | 3.3 | 208 | −2 |
| `/admin/impersonation_/$sessionId` | 289.6 | 293 | 3.4 | 291 | −2 |
| `/admin/legal` | 282.2 | 285 | 2.8 | 283 | −2 |
| `/admin/legal_/$versionId` | 278.9 | 282 | 3.1 | 280 | −2 |
| `/admin/legal_/edit` | 281.7 | 284 | 2.3 | 283 | −1 |
| `/admin/listings` | 326.3 | 329 | 2.7 | 327 | −2 |
| `/admin/listings_/$listingId` | 326.7 | 330 | 3.3 | 328 | −2 |
| `/admin/listings_/$listingId_/edit` | 407.7 | 412 | 4.3 | 409 | −3 |
| `/admin/locations` | 267.3 | 271 | 3.7 | 268 | −3 |
| `/admin/monetisation` | 311.7 | 313 | 1.3 | 313 | 0 |
| `/admin/places` | 305.3 | 310 | 4.7 | 306 | −4 |
| `/admin/roles` | 293.3 | 295 | 1.7 | 294 | −1 |
| `/admin/roles_/$roleId` | 273.3 | 275 | 1.7 | 274 | −1 |
| `/admin/screening` | 342.9 | 348 | 5.1 | 344 | −4 |
| `/admin/translations` | 304.7 | 307 | 2.3 | 306 | −1 |
| `/admin/translations_/$lang` | 306.3 | 309 | 2.7 | 307 | −2 |
| `/admin/users` | 290.0 | 293 | 3.0 | 291 | −2 |
| `/admin/users_/$userId` | 289.8 | 293 | 3.2 | 291 | −2 |
| `/auth` | 219.1 | 223 | 3.9 | 220 | −3 |
| `/auth_/callback` | 205.2 | 209 | 3.8 | 206 | −3 |
| `/auth_/reset` | 212.2 | 214 | 1.8 | 213 | −1 |
| `/c/$slug` | 222.8 | 227 | 4.2 | 224 | −3 |
| `/dev/primitives` | 226.3 | 228 | 1.7 | 227 | −1 |
| `/dev/style` | 245.2 | 248 | 2.8 | 246 | −2 |
| `/dev/tall` | 202.0 | 206 | 4.0 | 203 | −3 |
| `/l/$slug` | 248.4 | 250 | 1.6 | 249 | −1 |
| `/legal/$kind` | 206.4 | 210 | 3.6 | 207 | −3 |
| `/legal/accept` | 213.6 | 217 | 3.4 | 215 | −2 |
| `/legal/publishing` | 207.5 | 211 | 3.5 | 208 | −3 |
| `/my-listings` | 309.3 | 315 | 5.7 | 310 | −5 |
| `/my-listings_/$listingId` | 319.2 | 323 | 3.8 | 320 | −3 |
| `/my-listings_/$listingId_/edit` | 399.9 | 404 | 4.1 | 401 | −3 |
| `/post` | 399.9 | 404 | 4.1 | 401 | −3 |
| `/post_/$listingId` | 399.9 | 404 | 4.1 | 401 | −3 |
| `/privacy` | 206.4 | 210 | 3.6 | 207 | −3 |
| `/settings` | 276.2 | 279 | 2.8 | 277 | −2 |
| `/terms` | 206.4 | 210 | 3.6 | 207 | −3 |

The table's sizes are one-decimal readings. STEP 2 recomputes each ceiling from the script's
exact size with `ceilingForLocal`, and the report prints the before-and-after table from that
run.

## Item 4 — INC-1193: the preview's import cycle

- **consumers** — every page that draws the language provider (`/` and `/l/*` named by INC-1193;
  in fact every page).
- **definition** — `src/i18n/locales/en-base.ts:1` `export const enBase = {` has no imports. Its
  static importers: `src/i18n/provider.tsx:26` (top level at `:50`:
  `const enFirstPaint = enBase as unknown as Messages;`), `src/i18n/compiled-catalog.ts:4`,
  `src/i18n/locales/en.ts:2` and `src/lib/page-head.ts:1`.
- **tests** — no cycle census exists. The guard would be new: `scripts/conformance/` through
  `kit.ts`, a planted cycle, and its caller in `wired.test.ts`. The id family is new
  (CF-CYCLE-1).
- **lists** — `wired.test.ts` (the new guard joins it); the register (a new row, in Records).
- **old-file-readers** — none: no existing file changes.
- **second-readers** — `src/i18n/` has dynamic imports (the strings layers). The cycle tool counts
  them with `WITH_DYNAMIC=1`.
- **chunk-graph** — the import graph from TypeScript's parser, type-only imports dropped, Tarjan's
  strongly connected components, the shortest cycle in each
  (`/tmp/ethio-scratch/tests-ci-2/cycles.ts`):
  - the base: 743 files, 3,346 static and 65 dynamic edges, **0 cycles** (0 with the dynamic
    edges too);
  - the L10 merge `385003bd1`, exported by `git show` into
    `/tmp/ethio-scratch/tests-ci-2/l10/`: 731 files, **0 cycles**.
- **environments** — the error appears in Lovable's preview, the Vite 8.1.6 dev server (rolldown)
  under `@lovable.dev/vite-tanstack-config` 2.26.5 and `@tanstack/react-start` 1.168.60. CI and
  production builds do not show it.
- **mechanisms** — `bundle-closure.mjs` `staticImportsOf` reads chunks; `wired.test.ts` `importsOf`
  reads one file's imports. Neither finds cycles.
- **first-download** — not applicable until a break moves code.
- **premises** — **INC-1193's premise is wrong at the source level: `src/` has no import cycle,
  at the base or at L10.** "Cannot access enBase before initialization" is a temporal-dead-zone
  read of `enBase` while `en-base.ts` is still evaluating. With no cycle in `src/`, the cause
  lies outside the source graph, for example in the dev server's module runner, the Lovable
  wrapper plugin, or a package that imports back into `src/`. Finding it needs the real stack from
  the dev server. Running `bun run dev` here would reach the Supabase project named in the
  committed `.env` (production), so it was not run.
- **findings** — `src/i18n/provider.tsx:50` `enBase as unknown as Messages`: the TypeScript law
  forbids `as unknown as`. It is outside this item's change unless the break touches that line.
- **queued** — roadmap line 31 (INC-1193): built here, as ruled.

## Item 5 — INC-1205 + INC-1207: the migration guards onto the reader

- **consumers** — every migration file, judged by `scripts/check-migrations.sh` in CI's
  migration-lint job (`ci.yml:287`–`:304`: `SELF_TEST=1 bash scripts/check-migrations.sh`, then
  the real run).
- **definition** — `scripts/check-migrations.sh` (975 lines, `set -uo pipefail`, no `-e`):
  - the scratch-table guard: `strip_proof_scratch_tables`, perl at `:48`–`:60`, used by
    `check_file` `:62`–`:99`. A perl failure gives empty text, which reads as "Scratch table in a
    proof block" and returns 0, so the guard passes;
  - the real-row guard: `real_row_offenders`, perl at `:692`–`:711` (the head normalised, cut at
    120 characters, trailing spaces trimmed; tables `auth.users` and
    `public.user_roles|profiles|user_directory|locations|categories|attributes`; skipped when the
    text holds `e2e-mig-`), and `real_row_split`, perl at `:739`–`:777` (the allowlist
    `scripts/migration-real-row-allowlist.txt`, keyed by the first 16 hex of the head form's
    sha256);
  - the real-pick guard: `real_pick_offenders`, perl at `:720`–`:735`
    (`countries|languages|currencies`, `ORDER BY … LIMIT 1`, skipped on `e2e[-_]mig[-_]`,
    case-insensitive);
  - the callers at `:861`–`:872` ignore each reader's exit. Self-tests at `:779`–`:858` (one
    pins sha `9dacdee4ae630a9d`);
  - the spanning-literal guard `:887`–`:927`: `:918`–`:921`
    `spanning_found="$(spanning_literals …)"` never checks the exit (INC-1205). The random-text
    guard (`:929`–`:973`) has the checked form, `if ! random_text_found="$(random_texts …)"`.
  - The three guards INC-1207 means are the ones `tci-overlay-guards.report.md` §6 and §13 name:
    `:52` (scratch table), `:696` (`real_row_offenders`) and `:722` (`real_pick_offenders`).
- **tests** — `scripts/conformance/migration-reader.test.ts` MGR-1 … MGR-8 (next free MGR-9);
  check-migrations' own `SELF_TEST=1` cases. Fixtures in `scripts/fixtures/`:
  `bad-migration-example.sql`, `bad-random-text-proof-example.sql`,
  `bad-real-pick-proof-example.sql`, `bad-real-row-proof-example.sql`,
  `bad-spanning-literal-example.sql`, `good-random-text-proof-example.sql`,
  `good-spanning-literal-example.sql`. Each guard needs a planted reader failure (a missing file
  and a reader exit 1) that makes the guard FAIL.
- **lists** — `wired.test.ts:222`–`:232` asserts that `check-migrations.sh` contains
  `conformance/migration-reader.ts" --spanning` and `--random-text`; the new modes join that
  list. `scripts/migration-real-row-allowlist.txt` (its keys must stay byte-equal, so the head
  form is ported exactly). Register row 125 (the reader).
- **old-file-readers** — `check-migrations.sh` is read by `ci.yml`, `migration-reader.ts`,
  `e2e-select.test.ts`, `wired.test.ts`, `executor-hooks.test.ts`, two fixtures and the comment of
  migration `20260829060329`. `migration-reader.ts` has 20 importers in `scripts/conformance/`,
  `scripts/doors/` and `scripts/public-surface.ts`. The change adds exports and CLI modes and
  changes no existing export.
- **second-readers** — none.
- **chunk-graph** — not applicable.
- **environments** — CI's migration-lint job and `bun run checks`.
- **mechanisms** — read whole: `migration-reader.ts` (479 lines; its CLI at `:462`–`:478` accepts
  only `--spanning` and `--random-text` and throws otherwise).
- **first-download** — not applicable.
- **premises** — none wrong.
- **findings** — the scratch-table guard fails open: a perl failure reads as an offence and
  returns 0, which is the same class as INC-1205.
- **queued** — roadmap line 31 (INC-1205, INC-1207): built here.
- **size** — about 4 source files (`check-migrations.sh`, `migration-reader.ts` or a sibling, their
  tests, `wired.test.ts`). `migration-reader.ts` is 479 lines, over the 300-line split; the
  three readers would sit in a sibling module over the reader's exports, with the CLI modes in
  `migration-reader.ts`.

## Item 6 — INC-1206: the Lovable guard's test off the live list

- **consumers** — `scripts/ci/lovable-branch-guard.sh` (its ceilings check), run by `ci.yml`.
- **definition** — `scripts/ci/lovable-branch-guard.test.ts` (543 lines) `:398`–`:415`:
  `const BUDGETS = "scripts/route-budgets.mjs"; const budgetsText = readFileSync(BUDGETS, "utf8");
  function grown(count, extra?)` matches
  `/^ {2}"[^"]+": \{ ceiling: \d+, public: (true|false) \}, \/\/ .+$/` and throws below `count`.
  Its users are CF-LVB-13 (`:418`, `grown(9)`), `:449`, and CF-LVB-14 (`:491`, `:493`–`:507`).
- **tests** — the fix is inside CF-LVB-13 and CF-LVB-14; the last id is CF-LVB-14, so CF-LVB-15
  would be next if one were needed (none is).
- **lists** — none.
- **old-file-readers** — the test itself (the change).
- **second-readers** — none.
- **chunk-graph**, **first-download** — not applicable.
- **environments** — `bunx vitest run scripts` and CI.
- **mechanisms** — `lovable-branch-guard.sh`'s ceilings check (read).
- **premises** — none wrong. Order: item 3's ratchet edits `route-budgets.mjs`, so this fixture
  lands first (or in the same commit) to keep the verdicts apart.
- **findings** — none.
- **queued** — roadmap line 31 (INC-1206): built here.

## Item 7 — INC-1210 + INC-1015: CL-E10 and SMN-E13 retried

Both causes come from the failure bodies on ci-evidence.

**SMN-E13** (`e2e/submenu-look.spec.ts:213`–`:262`):
- **failure bodies** — `branches/cursor/f1-doors-7a/e2e-last-failure.md` at ci-evidence commit
  `18aaf24e5` (run 44607286456, desktop-1280, lane 2) says "Error: SMN-E13 the panel scrolls;
  expect(received).toBeGreaterThan(expected); Expected: > 0; Received: 0" at `:260`. The failing
  panel fitted every row it was given.
- **definition** — the spec reads `holds` from the rail at `:218`–`:220` **before** its own
  fixture exists. It predicts whether its scratch root will fit (`:224`–`:227`), seeds
  `holds + 1` or `holds + 2` children (`:228`), reloads and opens (`:230`–`:231`). The rail's rows
  flex between 32 and 48 px (`src/styles.css:789`–`:817`, D247/D248), so every root on the rail
  changes how many rows the menu holds, and the panel snaps to that height
  (`.menu-snap`, `:827`).
- **cause** — another worker's root category joins the rail between the read and the open. Lane 2
  runs two workers (`LANE_WORKERS = 2`, `scripts/ci/lane-plan.ts:41`). With `fullyParallel: false`
  (`playwright.config.ts:31`), the other worker runs another spec file of the lane. The plan,
  recomputed offline with the planner's own `planLanes` from the run's head `9aa72d351` (it
  matches the run's line "lane 2 — 7 files, 641 s"), puts these beside `submenu-look.spec.ts`:
  `admin-attributes-library.spec.ts`, `admin-shell.spec.ts`, `legal-accept.spec.ts`,
  `posting-routes.spec.ts`, `sage-tiers.spec.ts` and `shell-table-law.spec.ts`. Two of them insert
  active root pointers: `posting-routes.spec.ts:663`–`:664` and
  `admin-attributes-library.spec.ts:1088`–`:1089`, `:1358`–`:1361`. One more root shrinks the
  rows, the menu holds one more, and `holds + 1` children fit, so overflow is 0.
- **the rule this meets** — `scripts/ci/lane-plan.ts:37`–`:39`: "The workers of the lanes the plan
  splits (DEC-378 a): two, since no scratch row moves a shared value there (INC-1136,
  CF-LANES-4). A test that fails, or passes only on a retry, for a cause in another test's rows on
  the same backend returns this to one in the next commit, with its INC."
  `scripts/conformance/shared-value-tables.txt:13` classifies `category_tree_pointers` as "read,
  not shared" ("the reindex triggers queue the ads under the moved pointers only"). That holds for
  the feed index, but a root pointer moves the rail's row height for D247's readers.

**CL-E10** (`e2e/choice-lists.spec.ts:389`):
- **failure bodies** — `branches/cursor/f1-doors-6b/e2e-last-failure.md` at ci-evidence commit
  `d1a9eba61` (run 44450591343, desktop-1280, 1440 light, lane 7): the call at `:398`
  `closeMenu(page, rowMenu)` presses Escape (`:172`), and `expect(panel).toBeHidden()` (`:173`)
  sees `style-row-1-menu` still `data-state="open"` 14 times in 10 s. Every ledger line of
  INC-1210 is the same `toBeHidden` failure.
- **definition** — the ⋮ trigger in `src/components/shell/row-actions.tsx:109`–`:122` is both a
  `DropdownMenuTrigger` and a `TooltipTrigger` (`TooltipProvider delayDuration={150}`, `:84`).
  Each is an on-demand facade (`src/components/ui/overlay-facade.tsx`). Its root asks for the
  Radix code on the person's intent (`:141`–`:156`): hover for the tooltip, press for the menu.
  When the code arrives, each trigger replays its intent (`:279`–`:290`; `replay` at `:221`–`:250`).
- **cause, by reading (to be proven red-first)** — when the overlays code has not arrived before
  the click (the idle warm at `:129`–`:131` has not finished on a loaded runner), both roots go
  live in the same commit. React runs the inner trigger's effect first: the menu's replayed
  `pointerdown` opens the menu. Then the tooltip's replayed `pointermove` starts its 150 ms timer,
  and the tooltip opens above the open menu as the newest dismissable layer. Escape closes the
  tooltip and leaves the menu open. When the code arrived earlier (the warm won), Playwright's real
  `pointerdown` reaches the live tooltip trigger and cancels it, and the test passes. That
  accounts for the intermittence.
- **where the fix lives** — `src/components/ui/overlay-facade.tsx` (the replay order, or the
  tooltip's replay standing down when the same element's press opened a menu). That is OUTSIDE
  this brief's scope (`src/i18n/` and INC-1193's modules are the only `src/` areas). It is also a
  behaviour change a keyboard or mouse user can meet on every row's ⋮ menu. `overlay-facade.tsx`
  is on every page's first download, so the change moves every page (rule 10).
- **red-first plan** — hold the overlays chunk's download in the page (a `page.route` on the impl
  chunk, released after the click) so both roots go live together; Escape then leaves the menu
  open on every run.

For both tests:
- **tests** — SMN-E13 and CL-E10 (ids kept); the repeat lane proves each (DEC-283).
- **lists** — `SERIAL_TAGS` in `lane-plan.ts:27`; `scripts/conformance/lanes.test.ts`
  CF-LANES-4 and `shared-value-tables.txt`; `lanes-allowlist.txt`.
- **old-file-readers** — none for the two specs.
- **second-readers** — none.
- **chunk-graph** — not applicable.
- **environments** — CI's numbered lanes (two workers) and the repeat lane (one worker). The E2E
  values are set in this environment (checked by name), so `bun run e2e:local` can run the ids
  after the ruling.
- **mechanisms** — the lane plan (`lane-plan.ts`), the shared-value census (CF-LANES-4), the
  overlay facade.
- **first-download** — SMN-E13 moves none. CL-E10's fix in the facade moves every page.
- **premises** — INC-1136's classification of `category_tree_pointers` (above).
- **findings** — the classification at `shared-value-tables.txt:13`; the tooltip-over-menu
  behaviour in the facade.
- **queued** — roadmap line 31 (INC-1210, INC-1015): built here, as ruled.

## Item 8 — ACT-023: the table check refuses a width the fixed layout ignores

- **consumers** — every `DataTable` (`src/components/shell/data-table.tsx`) under
  `src/features/**` and `src/routes/dev.primitives.tsx`.
- **definition** — `docs/spec/spec-ledger.md:5419` ACT-023: "the shared table's checks refuse a
  column width its fixed layout ignores". L17, L18 and L19 (all in the base: `2048b2515`,
  `69cef0cc2`, `cd2d27874`, `7b2457f30`) built the column side: `COLUMN_SIZE`
  (`data-table.tsx:90`–`:96`); `size: ColumnSize` required (`:110`); the free `width` field
  removed from `DataTableColumn` (L18). Any `minWidth` switches the table to auto layout
  (`:570`–`:575`, `:943` `min-w-max` vs `table-fixed`).
- **what is left to refuse** — the TypeScript type already refuses a free column width.
  `minWidth?: string` (`:118`) is the one free width string left, and only `/dev/primitives` uses
  it (`min-w-56`, `min-w-40`, `dev.primitives.tsx:292`). A `minWidth` holding `w-fit`, `max-w-*`
  or `w-*` would switch the table off fixed layout and still leave the width unhonoured, because a
  table cell's `max-width` is not honoured by table layout: INC-1211's class. The check refuses a
  `minWidth` that is not exactly one `min-w-<token>` class. It is read from the syntax tree, as T2b
  is.
- **tests** — `scripts/admin-tables.test.ts` (the T-rules) takes the planted case: a
  `minWidth: "w-fit max-w-40"` column refused, and a `min-w-40` passing. The next rule id is T11.
  `src/components/shell/data-table.test.tsx` (the C7 min-width cases) is read and not changed;
  it is outside SCOPE.
- **lists** — `wired.test.ts` names `admin-tables`; `non-null-allowlist.txt` holds
  `admin-tables.ts`'s count; no other.
- **old-file-readers** — `admin-tables.test.ts`, `wired.test.ts`, `non-null-allowlist.txt`.
- **second-readers** — none.
- **chunk-graph**, **first-download** — not applicable (scripts only).
- **environments** — `bunx vitest run scripts`, CI.
- **mechanisms** — `scripts/admin-tables.ts` (T1 … T10, `searchSlotBreach` from TypeScript's
  parser).
- **premises** — the column type already holds most of ACT-023 (L18). The check's remaining
  object is `minWidth`'s value, which is narrower than the brief's wording.
- **findings** — none.
- **queued** — roadmap line 31 (ACT-023): built here.

---

## Queued (`rg -n "tests and CI" roadmap.md docs/governance/reports`)

- `roadmap.md:31` — this turn's list: every item is built here (items 2, 4 and 7 as ruled).
- `roadmap.md:93` — the before-launch tests and CI list (INC-1109, INC-1113, INC-1115, INC-1118,
  INC-1123, INC-1132, INC-1133, INC-1139, INC-1149, the job name, C5, C8): left, for its own
  turn.
- `roadmap.md:114`, `:115` and `ci-time.report.md:423`, `:425` — C5 (the image load overlapped)
  and C8 (Component tests split): left, on the before-launch list.
- `roadmap.md:10`, `:18`, `:21`, `:24`, `:41`; `f1-doors-6b.census.md:1823`;
  `tests-ci.stop-1.md:162`; `tests-ci.report.md:266`, `:270` — records of earlier turns, not
  queued work.

## The cut (G37)

No item exceeds about ten source files. By estimate: item 1 has 4 files (the workflow, the market
module, its test, the feature guide); item 3 has up to 6 (`route-budgets.mjs`, `bundle-closure.mjs`
and its test, `ci.yml`/`docs-only.ts` and its test if the skip changes); item 4's guard has 2; item 5
has about 4; item 6 has 1; item 7 has 2–4; item 8 has 2. Item 2 cannot be sized before its
substance.

## Conflicts with the rules

- STEP 6 and LIMITS dispatch the bench "from the lane by `gh workflow run`". Rule 50 (What you may
  never run, GitHub) forbids `gh workflow`. The brief's own fallback, "the operator dispatches it",
  is the one this lane can use.
- Item 7, SMN-E13 meets `lane-plan.ts:37`–`:39`, which requires the lanes back to one worker in
  the next commit.
- Item 7, CL-E10's fix lives outside SCOPE (`src/components/ui/overlay-facade.tsx`).
