# 20 — Tests: authoring, proving, running

Binding text: `docs/features/e2e-harness.md` §Authoring laws (J1–J9) — read it before touching
anything under `e2e/**` (specs OR helpers). This file restates the laws that bind every test and adds
the ones a unit test must obey too.

## The nine laws (J1–J9, DEC-238)

- J1 Every mutable fixture is namespaced run × job (`E2E_SHARD`) × worker × project × test tag; every
  scratch slug/key starts with `e2e-` (letters-only prefix where a door forbids digits).
- J2 Global-sweep tests run in a fence language per project; real catalogue keys are read-only.
- J3 Never edit a real reference row in ANY project (a seeded plan, category, location, language,
  user); per-axes scratch entities, deleted in a hook that survives a timeout (`afterEach`, not only a
  body `finally`) by a destroy that throws on failure; the shard-1 setup alone reaps residue.
- J4 Bulk/count assertions read per-key DB truth via the service client; summaries are asserted for
  visibility only; mismatches throw with the page/query-cache/audit dump.
- J5 Locators via the viewport-aware twin helpers, never bare prefix + `.first()`; fixtures via
  service-client TABLE operations; bulk tests carry a budget and named phases; anchor on structure,
  never English.
- J6 Tests mutating a global list run in ONE project; invariants and public-surface anchors exclude
  other tests' rows; never locate a real row by page position on a shared roster (search or DB truth).
- J7 Seed before navigate; assert seeded rows render before acting; polls shorter than the budget so
  failures assert with values; Playwright's built-in waiting only — never `waitForTimeout`.
- J8 `@global-state` tests run serial-only in the nightly (DEC-028); flaky passes are ledgered
  (DEC-030), 3-in-7-days → INC.
- J9 Identity: the pool (`leaseUser()`) for consumers — at most TWO pooled accounts per test
  (DEC-174); tests mutating their own auth state carry `@private-identity` and take the real door.

## Proof laws (G27, G38)

- Real rows are never fixtures — in tests AND in migration proofs.
- No weakened proof: an assertion is never loosened to pass; a timeout is never raised without a named
  cause; a rate dial is never raised for a test (it gets a `rate_overrides` row for its own user); an
  allowlist or census entry always names the test that provokes it.
- A refusal test proves the refused side effect did NOT happen: no parse, no dial spent, no RPC, no
  provider call, no spend, no try spent, no link signed, no row written, no audit row (PP-6, PP-34
  are the pattern).
- Red-first: a test that reproduces a defect is shown failing against the previous code (a local run
  against the old constant or commit; nothing reverted is ever committed), then green. A test for new
  behaviour needs no red run. A test that cannot be shown red carries a positive control.
- Tests see what a person sees: typed by keyboard, boxes measured, nothing read while an animation
  runs (`settled(page)` after an overlay opens).
- Fixtures are captured from real tool output, never authored. A fixture or text that moves between
  files is copied by script with a sha256 before and after; a binary fixture is pinned by its decoded
  sha256 and structure in a unit test (INC-879: BGR-13, AIG-35 are the pattern).
- Tests set their own environment (INC-880): every test that reaches a provider path sets the key or
  stand-in flag it needs with `vi.stubEnv` and restores it; none relies on the process environment.
  `gateway.test.ts` clears the provider keys in `beforeEach` (AIG-36) — keep it so.
- Spec files are edited by hand, never by search-and-replace; a spec change the brief did not
  enumerate is a STOP naming the test and line. `test.only` never lands.
- New test ids: before you assign one, grep `it(`/`test(` titles in src/, e2e/ and scripts/; a
  collision is renamed. No spec file carries more than ~25 tests — split by area, titles and bodies
  intact, hooks travelling with their tests.
- Behaviour-preserving moves keep assertions byte for byte; a test whose mock must change shape is
  listed in the report with its id and reason.
- Evidence survives a timeout: a full-walk test attaches its per-step ladder from `afterEach` via
  `test.info().attach`; every click inside a retry loop is a bounded attempt.

## Harness helpers you must use (not re-implement)

`awaitDraftSaved(page)` before polling DB truth or navigating after a wizard change (INC-809);
`stopPageBeforePurge(page)` before a hook purges drafts (INC-323); `inOneWindow(windowSeconds, needMs,
tag)` before counted dial calls (INC-617); `withinPreviewBudget` for import previews (only IG-3 drives
the limit); `staleStepUpOnClient` / `afterTotpStep`; `awaitConsole(page)` for the countries console;
`finderStub` (every fixture page stubs `**/api/catalog/find**` 429); `releaseStaleScratchAlias` for
fixed-slot fixtures; `chunkByLength(values, 4000)` on every unbounded `.in(...)`; `retryingFetch` on
every service-role client; the category menu's one reader (`e2e/helpers/category-menu.ts`);
`stripScratchRows` for whole-export comparisons; `anchorRealRow` / `category-search` instead of page
position; `gotoReady` / `findRow` (render invariant: no `[object Object]`, `undefined`, `NaN`).

## Running tests

- Unit: `bun run test:unit` (vitest, the whole suite) after each part and at THE CHECKS; a touched
  file's tests alone while iterating (`bunx vitest run <file>`).
- Browser tests start ONLY with `bun run e2e:local -- <spec files>` or `bun run e2e:changed` (when
  `scripts/e2e-select.ts` prints ≤ 5 files) — never plain `playwright test` or `bun run test:e2e`
  (the committed `.env` points at production and the setup refuses it). Targets: ethio-staging
  (`E2E_SUPABASE_*` in the environment) or CI's temporary backend. Both projects (`mobile-360`,
  `desktop-1280`), 2 workers, fake mode, 0 retries; each touched spec file whole and alone; named ids
  by `--grep "PP-30"`. Paste every count line and the server log's `[ssr-error]` count by path.
- A spec file not fully green is not committed. No `--repeat-each` locally: flake proofs are the
  operator-dispatched Flake check workflow (DEC-184). A partial or killed run is reported as partial
  and never re-run in the background; CI on the final commit runs every test in 18 lanes.
- "STAGING BEHIND: apply <file>" from the preflight is the operator's staging step, never a code fix:
  STOP and report the apply line.
- `bun run e2e:local` needs `E2E_SUPABASE_URL`, `E2E_SUPABASE_PUBLISHABLE_KEY`,
  `E2E_SUPABASE_SERVICE_ROLE_KEY` (staging only) in the environment, a Chromium
  (`bunx playwright install chromium` once per environment, or `E2E_CHROMIUM_PATH`), port 4173 free
  and fresh i18n maps. When any of these is missing, say so; do not improvise a target.
