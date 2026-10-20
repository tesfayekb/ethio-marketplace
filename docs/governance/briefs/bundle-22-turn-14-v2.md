# Bundle 22 — turn 14, version 2 (after the close): FV-1's fix; temporary test backends, phase 1 — the census and the proof run (D228, DEC-209): brief (saved unchanged, 2026-10-20)

```text
BUNDLE 22 — TURN 14, VERSION 2 (2026-10-20; after the close; replaces docs/governance/briefs/bundle-22-turn-14.md, never saved: version 1 forbade the AGENTS.md change your rule asks for — "When you introduce or change a structural decision (a new module or the initial structure counts), record or replace its rule in AGENTS.md before finishing" — and version 2 gives that change as an attached file; version 2 also carries FV-1's fix, the red of run 1059). The E2E harness (a closed surface, G22) opened under DEC-209 with its rule fixed below. NO MIGRATION. No string. No package change (the Supabase CLI comes from its pinned GitHub action, not package.json). AGENTS.md replaced by the attached file (Part F). Base: dev 7bdeb9fe (bundle 22 turn 13). Parts, IN THIS ORDER: A — CI first, the conclusion of turn 12, and FV-1's fix; STEP 0; B — the census, written as docs/features/ci-local-backend.md; C — the guard's narrow exception for the temporary backend, with its unit tests; D — the proof workflow; E — the docs, the roadmap, the changelog; F — AGENTS.md; the checks; THE CI WAIT REPORT.

WHY
- The operator, 2026-10-20 01:25–01:31 local: "need permanent solution, not small fix, long lasting best goldstandard fix" — and, on the plan below, "agree with your plan for turn 14 onwad. proceed please". Measured on 2026-10-20: a CI run takes 53.7 minutes, its six E2E shards 36 to 52 minutes each; ethio-staging's database (t3a.small) peaks at 98% CPU and 91% memory under CI, so more shards do not help (DEC-171/DEC-172: eight shards ran as long as six); the Supabase organisation went over its monthly-active-users quota in the previous cycle from test accounts (INC-782), and its log ingestion is 72.7 GB this cycle.
- D228: each CI test group starts its own temporary Supabase stack inside the CI machine with the Supabase CLI (Postgres, Auth, Storage, the e-mail inbox), built from the repository's migrations, used for that run and thrown away; hosted ethio-staging keeps a nightly full run and the operator's walks. This turn is phase 1: what the tests need from the hosted service (the census), and one proof — the smoke tier on a temporary backend, in a separate workflow that gates nothing. Phase 2 (turn 15, after the rule below says proceed): the reference-data seed and every shard on temporary backends; phase 3 (turn 16): the account pool retired for CI.
- DEC-209 — THE RULE, fixed before any number exists: PROCEED to phase 2 when the proof's evidence file (docs/tracking/local-backend-proof.md on ci-evidence) shows, for two consecutive proof runs on dev commits: (1) every repository migration applied on the temporary backend; (2) every smoke-tier test that passes on staging in the CI run of the same commit passes on the temporary backend, or is named in the census with its cause; (3) the backend's start, migrations included, within 300 seconds. A failure of (1) or (2) with a named cause is fixed in turn 14b inside the proof's own working copy — never by editing a landed migration. ABANDON (staging stays the CI backend; the proof workflow is removed) if (3) still exceeds 300 seconds after those fixes, or if more than one smoke-tier spec file cannot run on a temporary backend at all.

STEP 0 — save this file (the attached bundle-22-turn-14-v2.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-14-v2.md and paste its sha256sum. Tick nothing. No report file in the repository.

HOW TO WORK
- Order of the turn: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B to F; the checks; THE CI WAIT REPORT; END THE TURN. Do not stop between parts — a clean point is not a reason to stop. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- THE END-TO-END CHECK (your rule: "Verify the request's central flow once end-to-end before concluding, in the state a real user would hit it"): this turn's central flow is the proof workflow's first run on your commit — it runs on GitHub, not in your sandbox, and writes its result to ci-evidence. Your sandbox cannot start a browser (INC-506) and need not start the Supabase stack; the next brief's Part A reads the proof's evidence and concludes this turn.
- Run no stateful git command: the platform commits and syncs when the turn ends. Read-only `git status`, `git diff` and `git rev-parse` are fine.
- The workflow is linted with `actionlint -shellcheck= -pyflakes=` as CI does (AGENTS.md). No secret is printed; the temporary backend's keys are the CLI's local ones and are still masked (`::add-mask::`).
- ci.yml, nightly-e2e.yml and the other workflows do not change in this turn. Nothing in this turn changes what any existing CI job does or how it judges; the new workflow gates nothing (main's promote does not depend on it).
- Edit e2e files by hand, never by search-and-replace or line-range scripts (G37). A shared helper never changes its default: the temporary-backend exception is taken only when E2E_LOCAL_BACKEND is "1".
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST, THE CONCLUSION OF TURN 12, AND FV-1'S FIX.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (you cannot git-fetch that branch). Expected: run 1059 on 6d8217ad (turn 12 with its ruling), FAILURE — A2 and A3; or a later run.
A2. Run 1059 on 6d8217ad failed one gating test, FV-1 (A3), which is INC-773 and not turn 12's code; every turn-12 test passed. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md while it names 6d8217ad (or the run ci-status.md names, if it has moved on and carries turn 12's code) and write 'TURN 12 — FINAL REPORT' as the first section of this turn's CI wait report: ci-status.md's six lines; the lines of e2e-last-failure.md that name LAC-1 to LAC-4, LG-11, LG-23, LG-24, LGA-7, LGA-9 or FV-1; your verdict — turn 12's central flows verified end-to-end, the run red only by FV-1. Turn 13's own run (1060 on 7bdeb9fe) is replaced by this turn's (GitHub keeps one waiting run per branch): turns 13 and 14 are concluded together by the next brief. Any other failure: read its body, fix it at its root cause first (G21, G38), and name it with its fix.
A3. FV-1 (e2e/shell.spec.ts :3834-:3843; INC-773, OPEN — five retried passes at 360 on 10-18 and 10-19, then both attempts red in run 1059: "expect(received).toBeLessThanOrEqual(expected) — Expected: <= 1, Received: 34" at :3842). The boxes are read once, while the opened menu or the strip may still be settling (the INC-384 class: nothing is read while it moves) — a HYPOTHESIS until the Flake check below proves it (G3). Read them as polled truth with the same 1-px rule; no tolerance, timeout or retry changes:
  - a local function `gapY(a: Locator, b: Locator): Promise<number>` returning `Math.abs(boxA.y - boxB.y)` from both bounding boxes, or `Number.POSITIVE_INFINITY` when either box is missing, and `gapHeight(a, b)` the same for the heights (beside the file's other box helpers);
  - :3834-:3837 become `await expect.poll(() => gapY(stripRow, row), { message: "FV-1 the strip's favourite row level with the menu's" }).toBeLessThanOrEqual(1);` and the same with `gapHeight` ("FV-1 the strip's favourite row as tall as the menu's");
  - :3838-:3843 become, for each main slug, `await expect.poll(() => gapY(scope.getByTestId(`rail-category-${mainSlug}`), strip.getByTestId(`strip-category-${mainSlug}`)), { message: `FV-1 ${mainSlug} level in the menu and the strip` }).toBeLessThanOrEqual(1);`
  - `favouriteBox` stays for the ordering check above (:3824). Edited by hand (G37).
  Proof: the operator dispatches the Flake check for FV-1 (DEC-184) once this turn has landed; the supervisor reads it.

PART B — THE CENSUS (NEW docs/features/ci-local-backend.md; read-only work; commands and file:line for every row).
B1. One table, a row per thing the E2E suite or the migrations need from hosted ethio-staging, with the columns: what it is; where it lives today (migration file:line, dashboard setting, secret, workflow line); what the local stack (Supabase CLI 2.120.0) provides; the gap and how phase 2 closes it. At least these rows:
  (a) Postgres: the major version (from ethio-prod's read tool, `select version()`), and every extension the migrations create or use (`git grep -i "create extension"` — pg_trgm, pg_cron today) or assume (pg-safeupdate on the API connection, INC-432).
  (b) Auth: the Before User Created hook (public.hook_before_user_created, migration 20261015110000_ed5dcaf6 :~9960), multi-factor (TOTP, used by the step-up and useJobSuperAdmin), e-mail confirmation, password rules, redirect URLs, and anything else the tests rely on — each with how the local config.toml expresses it.
  (c) Storage: every bucket a migration asserts or uses (`git grep -n "storage.buckets\|storage.objects" supabase/migrations`), with its public flag — on hosted they were made by hand (migration 20260903114705_81fd36ba :1-:12 asserts category-assets).
  (d) Scheduled jobs (cron.schedule) and whether any test depends on one running.
  (e) Reference data the tests read that no migration creates (categories, attributes, locations, ui_translations, languages, countries, plans, reserved names, legal_settings, anything else): the table, its row count on staging (service client, read-only), and the tests that read it — the phase 2 seed.
  (f) Outside services the app or the server routes call during E2E (maps, translation, photos, AI screening, e-mail) and the E2E fake each one uses today (E2E_FAKE_TRANSLATE, E2E_FAKE_GEOCODE, …).
  (g) Every place that names ethio-staging (`git grep -n "jatpuhfdjfzctjipklmk"`): e2e/global-setup.ts :22 and :404-:411, e2e/helpers/session.ts, e2e/helpers/app-target.ts, src/test/app-target.test.ts, the workflows — and what each needs for a temporary backend.
  (h) Secrets and variables the E2E jobs read, and which a temporary backend does not need.
  (i) The test-account pool (DEC-097) and the accounts the suite still mints: what changes when every run has its own empty database.
B2. A closing section "Phase 2 plan" listing, from the gaps, what turn 15 builds.

PART C — THE GUARD'S NARROW EXCEPTION (e2e/global-setup.ts :404-:411; e2e/helpers/app-target.ts; src/test/app-target.test.ts).
C1. When `process.env.E2E_LOCAL_BACKEND === "1"`, the staging check in global-setup accepts E2E_SUPABASE_URL equal to exactly "http://127.0.0.1:54321" and logs "[e2e:setup] target is the temporary local backend (D228) = true"; any other URL with the flag is refused with the existing message. Without the flag nothing changes.
C2. assertAppTargetsStaging(env, ref) gains the same narrow exception (env.E2E_LOCAL_BACKEND "1" and VITE_SUPABASE_URL exactly "http://127.0.0.1:54321" passes); its signature and every existing message stay as they are.
C3. src/test/app-target.test.ts gains three tests: the flag with the local URL passes; the flag with the staging-looking or production URL is refused as today; the local URL without the flag is refused. Shown red first against the unchanged helper in your sandbox (not committed red).

PART D — THE PROOF WORKFLOW (NEW .github/workflows/local-backend-proof.yml).
D1. Triggers: a push on dev, and workflow_dispatch. `concurrency: { group: local-backend-proof-${{ github.ref }}, cancel-in-progress: true }`. `permissions: contents: write` only where the evidence is published (as ci-status-report.yml does); read elsewhere. One job, ubuntu-24.04, timeout 30 minutes.
D2. Steps, in order, each timed (seconds into the evidence): checkout; bun 1.3.14 and `bun install --frozen-lockfile` with the bun cache, as ci.yml's smoke job does; `supabase/setup-cli` pinned to a tagged release with `version: 2.120.0`; a working folder `.ci-local/supabase/` that the job fills at run time — its migrations folder receives every repository migration file through the job's own `cp` line, and the file `00000000000000_ci_local_buckets.sql` that the census (c) calls for (INSERT … ON CONFLICT DO NOTHING into storage.buckets, so the migrations that assert a bucket find it); its `config.toml` comes from a heredoc holding the block between "=== CONFIG BEGIN ===" and "=== CONFIG END ===" below (the repository's own supabase/config.toml is NOT touched — the platform owns it); `supabase start --workdir .ci-local -x realtime,studio,imgproxy,vector,logflare,edge-runtime,postgres-meta,supavisor`; on failure, the CLI's last 60 lines go into the evidence and the job ends after publishing; on success `supabase status --workdir .ci-local -o env` gives API_URL, ANON_KEY and SERVICE_ROLE_KEY (masked) for the next steps; `bun run build:e2e` with VITE_SUPABASE_URL, SUPABASE_URL = API_URL, VITE_SUPABASE_PUBLISHABLE_KEY, SUPABASE_PUBLISHABLE_KEY = ANON_KEY, SUPABASE_SERVICE_ROLE_KEY = SERVICE_ROLE_KEY and VITE_E2E "1"; Chromium as ci.yml installs it (cached); then the smoke tier exactly as ci.yml :538 runs it (the same four files, both projects, the same grep-invert), with E2E_LOCAL_BACKEND "1", E2E_SHARD "localproof", E2E_SUPABASE_URL / E2E_SUPABASE_PUBLISHABLE_KEY / E2E_SUPABASE_SERVICE_ROLE_KEY from the local stack, E2E_SERVE_BUILT "1", E2E_FAKE_TRANSLATE "1", E2E_FAKE_GEOCODE "1", and the JSON reporter's file kept.
D3. The evidence: docs/tracking/local-backend-proof.md, written with `if: always()` and published with `bash scripts/publish-evidence.sh "local backend proof <short sha>" docs/tracking/local-backend-proof.md` (the script's own retries; it never reddens the job). Its lines: the commit; the run's URL; the CLI version; seconds for install, start (migrations included), build and tests; the migrations' result (applied, or the failing file and the CLI's error lines); the smoke result (passed, failed, flaky, skipped, and every failing test's title with its first error line); the job's conclusion. The job's own result never touches ci.yml's verdict or main's promote.
D4. The same facts as one `::notice title=local-backend-proof::` line (start seconds, migrations ok or failed, smoke passed/total) so the run page shows them.
=== CONFIG BEGIN ===
# D228 phase 1 — the temporary backend's config (CI only; the repository's supabase/config.toml is the platform's).
project_id = "ethio-ci-local"

[api]
enabled = true
port = 54321
schemas = ["public", "graphql_public"]
extra_search_path = ["public", "extensions"]
max_rows = 1000

[db]
port = 54322
shadow_port = 54320
major_version = 17

[db.seed]
enabled = false

[realtime]
enabled = false

[studio]
enabled = false

[inbucket]
enabled = true
port = 54324

[storage]
enabled = true
file_size_limit = "50MiB"

[auth]
enabled = true
site_url = "http://127.0.0.1:4173"
additional_redirect_urls = ["http://127.0.0.1:4173/**", "http://localhost:4173/**"]
jwt_expiry = 3600
enable_refresh_token_rotation = true
enable_signup = true
minimum_password_length = 8

[auth.email]
enable_signup = true
double_confirm_changes = true
enable_confirmations = false

[auth.mfa]
max_enrolled_factors = 10

[auth.mfa.totp]
enroll_enabled = true
verify_enabled = true

[auth.hook.before_user_created]
enabled = true
uri = "pg-functions://postgres/public/hook_before_user_created"

[edge_runtime]
enabled = false

[analytics]
enabled = false
=== CONFIG END ===
  The block is a starting point: the census may require more (a bucket, an auth setting, the Postgres major version); add what the census names, each with a comment naming its census row, and list every change from the block in the report.

PART E — THE DOCS, THE ROADMAP, THE CHANGELOG.
E1. docs/features/e2e-harness.md: one new section at the end, "## Temporary test backends (D228, DEC-209) — phase 1", saying what the proof workflow does, where its evidence lands, the exception of Part C and DEC-209's rule in full.
E2. roadmap.md: line 3 begins "The brief in force: docs/governance/briefs/bundle-22-turn-14-v2.md (bundle 22 — turn 14, after the close: FV-1's fix; temporary test backends, phase 1 — the census and the proof run; D228, DEC-209). Next: the proof's verdict, then turn 15 (phase 2) or turn 14b; then the no-escape turn (D227);" keeping the rest of the line from "the Publish and the one walk of bundle 22;" on. The line that begins "  - [ ] Turn 14 (owed) — no one escapes the acceptance" becomes "  - [ ] Turn 17 (owed) — no one escapes the acceptance" (the rest of that line unchanged), and before it three new lines:
  - [ ] Turn 14 (docs/governance/briefs/bundle-22-turn-14-v2.md; no migration; no string) — FV-1 measured as polled truth (INC-773, run 1059's red); temporary test backends, phase 1 (D228, DEC-209; the operator 2026-10-20 01:31 local: "agree with your plan for turn 14 onwad. proceed please"): the census (docs/features/ci-local-backend.md); the guard's narrow exception for http://127.0.0.1:54321 under E2E_LOCAL_BACKEND; the proof workflow local-backend-proof.yml (the smoke tier on a temporary backend, non-gating, evidence on ci-evidence)
  - [ ] Turn 15 (owed, after DEC-209 says proceed) — phase 2: the reference-data seed; every E2E shard on its own temporary backend, twelve shards; staging for the nightly run and the walks
  - [ ] Turn 16 (owed) — phase 3: the account pool retired for CI; the staging tidy-up (compact feed_index and listings; the test accounts' audit rows on staging only); the docs
E3. docs/_changelog.md APPEND one line: "- 2026-10-20 — Bundle 22 turn 14, after the close (no migration; no string): FV-1 reads its rows as polled truth (INC-773); temporary test backends, phase 1 (D228, DEC-209) — the census of what the E2E suite needs from hosted staging; the guard's narrow exception for the local backend; the non-gating proof workflow (the smoke tier on a temporary Supabase stack; evidence in docs/tracking/local-backend-proof.md on ci-evidence)."

PART F — AGENTS.md (your rule on structural decisions; the 5,120-byte budget after the LOVABLE block kept).
F1. Replace AGENTS.md with the attached AGENTS.md byte for byte (5,592 bytes; sha256 9822a2f88442f8b88181f8e4e0b15a3612b2eb5865cb77e89248f6f0ecea2f04; 5,110 bytes after the LOVABLE block). It changes seven sentences and nothing else: the browser-tests rule names the temporary backend's exception and where its config lives; six reasons are shortened to keep the budget (CI evidence, the delete door, scanner output, paging, button labels, the QR encoder) — their rules are unchanged. `git diff <START> -- AGENTS.md` in the report.

THE CHECKS (whole; paste the last line of each; when a check fails, paste its whole failure block): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (expected 1266 passed: the base's 1263 plus Part C's three); `actionlint -shellcheck= -pyflakes= .github/workflows/local-backend-proof.yml` clean; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `bash scripts/check-browse-imports.sh` OK; `bash scripts/check-migrations.sh` "Migration guard OK."; the preview harness's "build OK"; at the end, `bun run i18n:map-guard` "usage maps match the tree".

SCOPE — these files only: the brief; AGENTS.md (Part F); e2e/shell.spec.ts (A3 only); docs/features/ci-local-backend.md (NEW); .github/workflows/local-backend-proof.yml (NEW); e2e/global-setup.ts and e2e/helpers/app-target.ts (Part C only); src/test/app-target.test.ts (C3); docs/features/e2e-harness.md (E1); roadmap.md (E2); docs/_changelog.md (E3); the files of an A2 fix (each named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No patch tool. No package change. No migration.
THE CI WAIT REPORT (not a conclusion): "TURN 12 — FINAL REPORT" first; done or not done by part; A1's six lines; <START>; A3's diff of e2e/shell.spec.ts; F's sha256sum; B's table in short (one line a row) and its phase 2 plan; C3's red-then-green lines; every change from the config block; the checks; `git diff --stat <START>`; `git diff --name-only <START>`; anything not foreseen; the line "Waiting for CI and for the proof run on <the commit this turn leaves> — the next brief's Part A concludes this turn." Then END THE TURN; send nothing after the report.
REVERT: git revert of this turn's commits; no database change to undo.
```
