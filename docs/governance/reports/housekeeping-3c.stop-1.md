STOP — housekeeping-3c STEP 1: the census (PLAN FIRST; nothing edited beyond STEP 0)
DONE: STEP 0 (commit 59b1cd520 `housekeeping-3c: task saved`), STEP 1 (this census)
LEFT: parts A, B, C, D; STEPS 2 → 8
CI: the lane head's run, read at the ci-evidence branch before STEP 0's commit:
# CI Status (auto-generated — do not edit by hand)

- Commit: `611ade039441bfc45b112bf18fd5ae04689e6bd7` (short `611ade0`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T03:26:19Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43147615979
FILES: this turn's, `git diff --name-only 611ade039` (the lane head this turn began from):
docs/governance/briefs/housekeeping-3c.md
roadmap.md
docs/governance/reports/housekeeping-3c.stop-1.md (this file)

Five questions need a ruling before Part A (end of this file, "QUESTIONS"). Two of them are rule
conflicts: rule 00 forbids writing under `.claude/` (Q1), and `git worktree` is not among rule 00's
git verbs (Q5). Two premises of the brief are wrong in ways that change its records. No CI lane runs
the maintenance pass today (Q2). And `--at` cannot name the `Base: dev` commit on this lane (Q5).
Everything else below is a census answer or a decide-and-name the plan states and continues on.

## STEP 0 — what was run and what it printed

- Lane: already on `cursor/housekeeping`; `git fetch origin dev main ci-evidence
  cursor/housekeeping` (ci-evidence moved 42809498d → 2cac93a62); `git merge --ff-only
  origin/cursor/housekeeping` → "Already up to date"; head 611ade039441bfc45b112bf18fd5ae04689e6bd7;
  `git status --short` empty. `origin/dev` = 2b11a9d2943114859f22ac14cfc9ccf9f589ac54 = the brief's
  base (no drift).
- The brief: the folder's `housekeeping-3c.md` sha256
  d7564eb069f358dae1f023c2ecb405cced5e7cafe744f9f0788aa343a299854c = the stated value. Saved by
  script (`printf` header, `cat` of the folder's file, closing fence) inside one four-backtick fence;
  the fenced text, extracted by `awk`, re-measured to the same sha256.
- Roadmap line 3: written by script (line 3 only) as dictated; `bunx prettier --check roadmap.md` →
  "All matched files use Prettier code style!".
- `scripts/conformance/briefs-allowlist.txt`: three comment lines and no entry line, so nothing was
  removed.
- `bun scripts/brief/check-go.ts docs/governance/briefs/housekeeping-3c.md` → exactly
  `[check-go] no finding` (exit 0).
- `bunx vitest run scripts/conformance/briefs.test.ts` → 12 passed.
- CI read (rule 40): root `ci-status.md` names 611ade039 SUCCESS, run 43147615979 (the lane head, a
  docs-only push). The lane's folder `branches/cursor/housekeeping/`: `e2e-last-failure.md` says
  "last E2E run 43147615979 ran no lanes (docs-only push, DEC-365)", commit c02725d67 (the pull
  request's merge ref), "the code tree equals 188950f05…, whose lanes were green in run
  43144538685"; `local-backend-last-failure.md` says "last E2E run 43144538685 passed" (merge ref
  4937f82d9, 19 of 19 results files and logs read). `guards-last-failure.md` names 611ade039, run
  43147615979. No red of an earlier turn to fix first.

## CENSUS-ITEM consumers

### Concern 1 — the typecheck's reach

- `tsconfig.json` :2 → :9 includes `src/**/*.ts`, `src/**/*.tsx`, `vite.config.ts`,
  `eslint.config.js`, `playwright.config.ts`, `e2e/**/*.ts`; :15 `types: ["vite/client", "node"]`;
  no `allowJs`. `package.json` :18 `"typecheck": "tsc --noEmit"`; `.github/workflows/ci.yml` :168 →
  :169 `bun run typecheck`.
- The `eslint.config.js` entry at :6 is inert: without `allowJs` it never enters the program
  (`tsc --listFilesOnly -p tsconfig.json` lists 2,452 files; `grep -c eslint.config` → 0). So three
  root files are typechecked, not four.
- Files under `scripts/` the root program reaches by import: SIX, not five — four `.ts` and two
  `.d.mts`:
  - `scripts/conformance/kit.ts` (13 importers under `src/`, e.g. `src/look-law.test.ts:5`,
    `src/server/ai/features-census.ts:3`);
  - `scripts/lib/pattern.ts` (`e2e/helpers/scratch.ts:1`, `e2e/helpers/ui.ts:30`);
  - `scripts/e2e-migration-preflight.ts` (`e2e/global-setup.ts:11`);
  - `scripts/en-baseline-heal.ts` (`e2e/global-setup.ts:22`);
  - `scripts/chunk-modules-plugin.d.mts` and `scripts/route-budgets.d.mts` (`vite.config.ts:12`
    → :13).
  Nothing under `.claude/` is reached.
- Tracked TypeScript outside the program: 168 `.ts` under `scripts/` (minus the four above), all 8
  under `.claude/hooks/` (`bash-guard.ts`, `header.ts`, `land.ts`, `lib.ts`, `post-edit.ts`,
  `scope-guard.ts`, `session-setup.ts`, `stop-gate.ts`). A scripts project (`scripts/**/*.ts` and
  `.claude/hooks/**/*.ts`) lists 181 files under those two folders (the six `.d.mts` join by import).
- The errors such a project reports on 611ade039, measured with a temporary `tsconfig` in the
  working tree (removed; three variants), `bunx tsc --noEmit -p <it> --pretty false`:
  - inheriting the root's `types` (`vite/client` + `node`): **44 errors in 5 files**;
  - with `types: ["node"]` as the brief proposes: **51** — the same 44 plus 7 `TS2339` (`Property
    'env' does not exist on type 'ImportMeta'`) in `src/integrations/supabase/client.ts` (36,36),
    (38,17); `src/lib/env-flags.ts` (14,22), (16,19), (16,42); `src/lib/supabase-door.ts` (89,27),
    (91,17). Scripts import them, e.g. `scripts/conformance/session-reads.test.ts` (from
    `@/integrations/supabase/client`, `@/lib/supabase-door`) and
    `scripts/conformance/project-reads.test.ts`. So scripts need `vite/client` (premise below).
  - with `allowJs: true, checkJs: false` (and the root's types): 42 — the two
    `lint-rules.test.ts` errors vanish; the only JavaScript file that enters the program is
    `eslint.config.js` (the `.d.mts` beside every imported `.mjs` still win).

  The 44, whole, by file and code (the first number is the line):

  ```
  .claude/hooks/land.ts (6)
    73,13  TS2868 Cannot find name 'Bun'            Bun.spawnSync(["git", "push", …
   133,15  TS2868 Cannot find name 'Bun'            Bun.spawnSync(["git", "fetch", …
   144,3   TS2868 Cannot find name 'Bun'            Bun.spawnSync(["git", "merge-base", …
   389,17  TS2551 Property 'timedOut' does not exist on type 'Step'. Did you mean 'timeoutMs'?
   403,14  TS2868 Cannot find name 'Bun'            Bun.spawnSync(["git", "push", …
   414,1   TS2868 Cannot find name 'Bun'            Bun.spawnSync(["git", "fetch", …
  .claude/hooks/lib.ts (3)
    28,22  TS2868 Cannot find name 'Bun'            Bun.stdin.text()
  1084,16  TS2868 Cannot find name 'Bun'            Bun.spawn(cmd, { stdout: "pipe", … })
  1111,13  TS2868 Cannot find name 'Bun'            Bun.spawnSync(["git", …])
  scripts/conformance/lint-rules.test.ts (2)
     5,35  TS7016 Could not find a declaration file for module '../../eslint.config.js'
    34,35  TS7006 Parameter 'entry' implicitly has an 'any' type   (the import's consequence)
  scripts/conformance/on-demand-failure.test.ts (1)
   311,69  TS2345 Argument of type 'Node | null' is not assignable to parameter of type 'Node'
  scripts/e2e-failure-report.ts (32)
   TS2868 'Bun' (28): 1927, 1939, 1975, 2040, 2199, 2382, 2449, 2711, 2797, 2798, 2888, 2930,
     2945, 2952, 2953, 2976, 3034, 3069, 3135, 3234, 3261, 3270, 3281, 3289, 3299, 3304, 3322, 3354
   TS7006 Parameter 'line' implicitly has an 'any' type (4): 2891, 2930, 2972, 3028
     (callbacks over a `Bun.file(…).text()` result; they type once the read is typed)
  ```

  Turn 3b's 38 at 188950f05 is these 44 without `land.ts`'s six. The causes, read at each line:
  - `Bun` (36 sites in three files): the scripts and hooks run under Bun, but no Bun types are
    installed (`node_modules/bun-types` and `node_modules/@types/bun` both absent). The uses are
    `Bun.file(p).exists()/.json()/.text()`, `Bun.write`, `Bun.spawnSync` (reporter :2953, every
    `land.ts` site, `lib.ts` :1111), `Bun.spawn` with `new Response(proc.stdout).text()` and a
    kill timer (`lib.ts` :1084 → :1107), and `Bun.stdin.text()` (`lib.ts` :28).
  - `land.ts` :389 is a real defect, not a typing gap: the timed-out flag lives on the run's result
    (`r.timedOut`, `lib.ts` :1083), so a step that timed out reports "exit 124", never "timed out".
  - `on-demand-failure.test.ts` :311: `handlers.some((h) => h !== "lazy" && isSilent(h))` — the
    `null` case is already "unhandled" at :309, but `.some` does not narrow across the two calls.
  - `rg -l "Bun\." scripts --glob '*.ts'` names, besides the reporter,
    `scripts/conformance/briefs.test.ts` (:376, `Bun.write` inside a planted command string) and
    `scripts/ci/turn-checks.ts` (:101, `globalThis.Bun` read through a narrowed type, with a node
    fallback at :105). Neither is an error, so neither changes (premise below).
- Duration: `bun run typecheck` (root) 14.73 s real on this machine; the scripts project 2.53 s.

### Concern 2 — the maintenance owner

- The owner: `e2e/global-setup.ts` :597 → :598 `(process.env["E2E_SHARD"] ?? "1") === "1" ||
  process.env["E2E_MAINTENANCE"] === "1"`; a non-owner logs `maintenance skipped (owner: shard 1)`
  (:600).
- Readers of `E2E_MAINTENANCE`: that line only. No workflow, script or test sets or reads it.
- Writers of `E2E_SHARD` (readers: the namespacing helpers, e.g. `e2e/helpers/users.ts:152`,
  `e2e/global-setup.ts:145`):
  - `.github/workflows/local-backend-proof.yml` :174 → `localproof` (smoke) or `local-<lane>`;
  - `nightly-e2e.yml` :62 `nightly` and :334 `cfsmoke`;
  - `flake-check.yml` :42 `flake`;
  - `package.json` :24 (`e2e:local`) `${E2E_SHARD:-local}`;
  - `ci.yml`: none since cc93140c2 (2026-10-21), the last commit that carried
    `E2E_SHARD: ${{ matrix.shard }}`.
- **So no runner owns the pass today, the CI lanes included** (Q2). Read in lane 1's own log, run
  43144538685, artifact `e2e-log-1`, `1.log` lines 9 and 17:
  `[e2e:setup] PROCESS_ID = 43144538685-local-1` … `[e2e:setup] maintenance skipped (owner: shard
  1)`. The nightly prints the same line in both of its Playwright runs: run 43059972427, job log
  lines 1937 and 2059. An executor's `bun run e2e:local` sets `local`, so it skips too.
- The nightly's two Playwright runs both load `e2e/global-setup.ts`: `playwright.nightly.config.ts`
  :16 `globalSetup: base.globalSetup`. With the variable in the job's env, both would own the pass.
- What the maintenance pass does (:605 → :1296), each step with what it would touch on staging. A
  failure throws (fails the setup) unless the step is marked "evidence only":
  1. Reaper, 3 h cutoff (:609): scratch `ui_translation_revisions` / `ui_translations`
     (`e2e.scratch.`), the fence languages' rows (`zxx`/`zxy`) and their entity translations,
     scratch locations with their translations, scratch countries (`E2E-Scratch-`) with their places,
     root order and role rows, `location_import_revisions`.
  2. Scratch roles `e2e-%` and `e2e_scratch_role_%` (:835 → :874): `role_permissions`, then
     `user_roles`, then `roles`, in `chunkByLength(ids)` batches. The default ceiling is 4,000
     characters (`e2e/helpers/chunk-by-length.ts:10`), about 108 ids of 36 characters, so 645
     roles is 6 batches of 3 deletes.
  3. Scratch listings (:876 → :920): by the title prefix `e2e-cat-listing-`, and by a seller whose
     display name starts `e2e+`.
  4. Photo storage, `listing-photos` (:922 → :1054):
     - first a proof: one object uploaded and purged, which fails the setup if the count is not
       exact;
     - then the reaped listings' folders;
     - then the backlog, up to 5,000 objects a run, by seller folder. A folder whose owner is not a
       user is purged; a live e2e seller loses only folders whose listing is gone; a live non-e2e
       user's folder is kept. `liveUserIds` collects every user, not only e2e ones
       (`listE2EUserIds` :197 → :222), so a real user's folder is never an orphan.
  5. Scratch categories `e2e-%`, 1 h cutoff (:1056 → :1122): their listings, both pointer ends,
     legacy attributes and translations, then the rows. Batches of `chunkByLength(ids, 2000)`.
  6. Scratch attribute definitions (`planAttributeReap`, :1124 → :1173): links, translations,
     definitions.
  7. The prune (:1175 → :1221), 24 h cutoff, through two service-role doors only:
     - `maintenance_prune_audit`, the audit rows of e2e users, 200 ids a call;
     - `maintenance_prune_e2e_audit` with `p_include_orphans: true`, 20,000 rows a call, up to 50
       calls.
  8. The storage sweep (:1223 → :1255): `category-assets` objects older than 3 h under `e2e-cat-`
     categories.
  9. The tripwire (:1257 → :1293), evidence only and never fatal: every active non-scratch category
     without an approved Amharic name is printed.
- The nightly's user sweep (`nightly-e2e.yml` :139 → :140, `global-teardown.ts`
  `sweepStaleUsers` :109) deletes `@ethio-e2e.invalid` users older than 24 h — 138 on 2026-11-11
  (run 43059972427, line 1896). The maintenance pass deletes no user (`rg deleteUser` →
  `global-teardown.ts` :82, :124 only), so the sweep is the one user mechanism, not a second one:
  no departure to name.

### Concern 3 — the repeat lane's selection file

- Writers of `local-backend-repeat.txt`: `local-backend-proof.yml`'s selection step (:233 → :300),
  and `scripts/ci/repeat-cap.ts` (:110 → :113, run at :768). The file takes these shapes:
  - nothing selected → the one line `- Repeat: nothing to repeat` (:247);
  - specs selected but none fits the budget → `- Not repeated: <spec> (<n> tests)` lines, then
    `- Repeat: nothing to repeat` (:284, :289), with no counts;
  - the normal case → the `Not repeated` lines, then the summary (:293): `- Repeat: each <e> on
    both projects; <T> tests selected, <U> repeated; budget <B> s at <r> s a test; directly
    changed: <a> of <b> repeated; importers of a changed helper: <c> of <d>`;
  - when the time cap ends the run, `repeat-cap.ts` appends `- Not repeated (time cap): <title
    path> / <project>` lines after the summary.
- Reader: the lane's proof fragment only (:896 → :899). It copies the whole file into
  `local-backend-proof-repeat.md`, and writes `- Repeat: selection not written` when the file is
  absent; that is how `local-backend-proof.md` carried run 43144538685's line.
- Upload steps of the repeat lane (every lane's, `if: always()`):
  - `local-proof-<lane>` (:919 → :933): results.json, the proof fragment, the lane log, the anon
    TSV;
  - `e2e-results-<lane>` (:934 → :944);
  - `e2e-log-<lane>` (:945 → :957): `<lane>.log`, `local-backend-start-failure.txt`,
    `local-backend-db-error.txt`, `local-backend-step-failure.txt`;
  - the error contexts.

  The selection file is in none of them, so it never reaches the reporter.
- The reporter's head-block writers in `scripts/e2e-failure-report.ts`: `renderLanesSkipped`
  (:1532), `renderSources` (:1609, the red form), `renderGreen` (:1825), `renderCrash` (:1869).
- Its runs over the lanes:
  - `ci.yml` :675 → :711, `E2E_EXPECTED_SOURCES` :682 `…,16,repeat?`, which writes
    `e2e-last-failure.md`;
  - `local-backend-proof.yml` :1029 → :1043, same list at :1035, which writes
    `local-backend-last-failure.md`.

  The other two runs have no repeat source: the nightly (:187 `nightly,full`) and the flake check
  (:136 `flake`).
- The source loop reads `${E2E_LOGS_DIR}/e2e-log-<id>/…` per source (:3164 → :3216), but an
  optional source with no results is skipped before any of its files is read (:3167). The repeat
  lane with nothing repeated uploads no results, so a reader inside the loop would never see its
  selection file. The read belongs outside the loop, keyed on `repeat` being among the expected
  sources.
- Run 43144538685's summary, the case the brief cites: "1393 tests selected, 38 repeated; …
  directly changed: 5 of 53 repeated; importers of a changed helper: 0 of 60". The first pair counts
  TESTS (mobile-360's list), the last two SPEC FILES (premise below).

### Concern 4 — the GO checker's runs

- `scripts/brief/check-go.ts`:
  - `argsOf` :34 → :45 parses `--root` (:37 → :42), default `process.cwd()`;
  - `treeFindings(text, file, root)` :65 runs the seven tree laws, COUNT included (`go-laws.ts`
    :575 → :595);
  - the allowlist (:68 → :76) and the template (:79 → :84) are read from the root too.
- Its runs and the tree each reads:
  - STEP 0 of every GO (`docs/governance/go-template.md` :56) — the working tree as saved, i.e. the
    lane head: correct.
  - STEP n+1 (`go-template.md` :84) — the built tree: wrong for every citation the turn moved.
  - The supervisor's pre-send run (`go-template.md` :14, `--root <the clone>`) — its clone:
    correct.
  - `scripts/conformance/briefs.test.ts` CF-BRIEF-14 (:390 → :414) — spawns the checker with
    `--root` on a planted scratch tree.
- `briefs.test.ts` itself runs no tree law. Its header (:52 → :55): "The TREE laws … judge a GO
  against the tree it was written for … so they run through check-go.ts on a named root, not here
  on a tree the turn itself changes". It runs the text laws, CF-BRIEF-13 (the allowlist) and
  CF-BRIEF-15 (the template's census items) only.
- A tree law reads files under the root (`existsSync`/`readFileSync`, `go-laws.ts` :360 → :369),
  and a COUNT line runs its command with `cwd: root` (:544 → :548). The command may use the git
  reads `show`, `log`, `diff`, `ls-files` (`GIT_READS` :61).
- The checker already accepts "a `git show` snapshot with the repository's markers" as a root
  (`treeRootProblem`, `go-laws.ts` :248 → :254): `AGENTS.md` and `roadmap.md` without `.git`.

## CENSUS-ITEM definition

- Concern 1, by definition "a TypeScript file the repository runs or tests":
  - `src/`, `e2e/`, `vite.config.ts`, `playwright.config.ts`, the scripts and the hooks, as the
    brief lists;
  - PLUS `playwright.nightly.config.ts` (the nightly's config) and `vitest.config.ts` (the unit
    suite's), which neither the root nor the proposed project includes. Both typecheck clean under
    the root's options today (a temporary config including only them → exit 0, removed). They can
    join `tsconfig.scripts.json`'s `include` with no fix (Q1 (c)).

  Difference from the brief: those two files, and `eslint.config.js`, which the root lists but does
  not check.
- Concern 2, "a backend the tests run against":
  - the temporary backends: the brief says they "use" the pass; by the census they BYPASS it too;
  - ethio-staging, reached by the nightly (both runs), the Cloudflare parity smoke (`cfsmoke`), the
    flake check (`flake`) and an executor's `e2e:local` (`local`): none owns the pass.

  Difference: the lanes.
- Concern 3, "a reader of the repeat lane's coverage":
  - the lane's proof fragment (the `local-backend-proof.md` table's line);
  - `e2e-last-failure.md` (the merged reporter);
  - `local-backend-last-failure.md` (the lanes' reporter);
  - the supervisor's reading order (instructions §8, not in the repository).

  The brief names the first two; the third is the same writer run over the same artifacts (`repeat?`
  in both lists), so it gains the line with no extra code.
- Concern 4, "a run of the GO checker": STEP 0, STEP n+1, the supervisor's pre-send run and
  CF-BRIEF-14's spawn, as the brief lists. No difference.

## CENSUS-ITEM tests

Each consumer's own tests, by their real names:
- `scripts/conformance/wired.test.ts`: CF-WIRED-1…4; CF-TSC-1 is new, and the id is free (`rg -n
  "CF-TSC-[0-9]" scripts src e2e` → none).
- `scripts/conformance/ci-deadlines.test.ts`: CF-CID-1…6; CF-CID-7 is free (`rg -n CF-CID-7 scripts
  src e2e` → none). It and `ci-images.test.ts` both read every workflow through
  `scripts/conformance/workflow-reader.ts`, which has no test of its own.
- `scripts/conformance/ci-images.test.ts`: CF-CI-IMG-1…7.
- `scripts/ci/repeat-cap.test.ts`: exists; `scripts/conformance/repeat-cap.test.ts` does not.
- The reporter's self-test (`SELF_TEST=1`, in `scripts/e2e-failure-report.ts` from :1971), run by
  `scripts/e2e-failure-report.test.ts` EFR-1 (and EFR-2).
- `scripts/conformance/briefs.test.ts`: CF-BRIEF-1…4, 11…15 (CF-BRIEF-14 is the self-test).
- `scripts/conformance/lint-rules.test.ts` and `scripts/conformance/on-demand-failure.test.ts`: each
  is its own test (the fixes are inside them).
- `scripts/conformance/e2e-helpers.test.ts`: CF-HELPERS-6, the reaper's prefix census, which reads
  global-setup's sweeps.
- `scripts/ci/turn-checks.test.ts`: TCK-1…9, which hold the runner's R1 typecheck reader.
- `.claude/hooks/`: no test (8 files, `git ls-files .claude`).

## CENSUS-ITEM lists

- `scripts/conformance/wired.test.ts` CF-WIRED-1: the new `it` (CF-TSC-1) lands in this file. Its
  :94 comment ("judged here today, by `tsc` the day scripts/ joins the typecheck") becomes true and
  is reworded in Part A.
- `scripts/ci/turn-checks-allowlist.txt`: no line needed. The checks runner reads the typecheck step
  by its key `build-and-check › Typecheck` (`turn-checks.ts` :225), and the step's text
  (`bun run typecheck`) does not change.
- The reporter's source list (`E2E_EXPECTED_SOURCES`): unchanged.
- The register (`docs/governance/mechanisms.md`): rows go to §14, not edited (DEC-346).
- No answer-key or full-text exact-list assertion covers the reporter's head block: the self-test
  checks it with `includes` (e.g. :2142 → :2143, :2360 → :2366).

## CENSUS-ITEM old-file-readers

Documents that name the typecheck's reach, `E2E_MAINTENANCE` or the owner, the repeat lane's
reporting, or the checker's run:
- `docs/features/ci-guards.md` :12 (the build-and-check row: `bun run typecheck`) and :385 → :387
  ("`ci.yml` sets `E2E_SHARD: ${{ matrix.shard }}` … `nightly-e2e.yml` sets `E2E_SHARD: nightly`";
  the `ci.yml` half is stale since cc93140c2).
- `docs/features/e2e-harness.md`:
  - :351 ("Proof on every shard-1 run");
  - :434 ("before the maintenance gate and whatever `E2E_SHARD` is");
  - :441 (the attribute reaper in "the setup's maintenance block");
  - :580 (the nineteen lanes, DEC-283).
- `docs/features/nightly-e2e.md`: no word on maintenance today; Part B adds one.
- `docs/features/ci-local-backend.md` :535 (the lanes' `E2E_SHARD` values) and :676 → :678 (the
  repeat line's "directly changed … importers …" wording).
- `docs/features/ci-status-reporter.md` :61 (the repeat lane among the nineteen).
- `docs/features/security-scanning.md`: no hit.
- `docs/governance/go-template.md` :14 (the supervisor's `--root` run) and :84 (STEP n+1).
- Not edited, named for §13:
  - `.cursor/rules/20-tests.mdc` :20 and `.claude/rules/20-tests.md` :14 ("the shard-1 setup alone
    reaps residue": no job is shard 1, and the nightly will own staging's pass);
  - `.cursor/rules/00-protocol.mdc` :111 → :112 (the runner's typecheck step reads Lovable's log;
    still true).

  AGENTS.md names none of these.

## CENSUS-ITEM second-readers

`rg -n "import\(…(e2e-failure-report|check-go|go-laws|repeat-cap|global-setup|lint-rules|on-demand-failure|\.claude/hooks)" scripts src e2e .github .claude`
→ hits only `src/lib/on-demand-failure` (a different file) in twelve `src/` tests. One more reader
outside `import(`: `nightly-e2e.yml` :140 runs `bun -e 'await
import("./e2e/global-teardown.ts")'`, which the plan does not move. The plan moves no symbol, so no
second reader.

## CENSUS-ITEM chunk-graph

CENSUS-ITEM chunk-graph: not applicable — no src/ change (the plan's files are listed under
"Decide-and-name"; none is under `src/`).

## CENSUS-ITEM environments

- The typecheck: locally (`bun run typecheck`, rule 00 step 6), in `ci.yml`'s build-and-check job
  (:169), and in the dormant kit's `land.ts` :321 → :323, which also runs `bun run typecheck`.
  `bun run checks` does not run `tsc`: its typecheck step is the platform harness's verdict read
  from `/tmp/observability/build-errors.log` (`scripts/ci/turn-checks.ts` :13 → :15, :240 → :256;
  premise below).
- The nightly: ethio-staging, on `schedule` (two crons, :12 → :13, the `hour` job letting the one at
  11:30 New York go on) and `workflow_dispatch`, from `dev`'s tree.
- The repeat lane: `local-backend-proof.yml`, called from `ci.yml` on every pull request and push
  (skipped on a docs-only push, DEC-365).
- The checker: the executor's machine (STEP 0, STEP 6) and the supervisor's clone.

## CENSUS-ITEM mechanisms

Read before anything is proposed:
- `tsconfig.json` (above).
- The maintenance owner (`global-setup.ts` :589 → :603) and DEC-142, as quoted in
  `docs/spec/spec-ledger.md` :2635 and `docs/governance/briefs/bundle-6.md` :86 ("the owner test at
  :502 also accepts E2E_MAINTENANCE=1 (one condition added; CI never sets it)").
- `repeat-cap.ts` (whole) and the lane's selection step and proof fragment (:233 → :300, :896 →
  :899).
- `check-go.ts`'s `--root` (:34 → :45), `treeRootProblem`'s snapshot form.
- Turn 3's carrier: the lane's step file `local-backend-step-failure.txt`, uploaded inside
  `e2e-log-<lane>` (:952 → :956) and read by the reporter at `${E2E_LOGS_DIR}/e2e-log-<id>/`
  (:3181 → :3184). Part C uses the same carrier.
- The workflow reader (`scripts/conformance/workflow-reader.ts`): jobs and steps by indentation. A
  step's text includes its own `env:` block; a job's `env:` block is NOT kept (a line at four
  spaces of indent ends the step and is dropped, :48 → :51).
- CF-WIRED-3 (`wired.test.ts` :336 → :347): every `.mjs` a script imports has a `.d.mts` beside it.
  It reads `.mjs` imports only, so the `eslint.config.js` import is outside it.

## CENSUS-ITEM first-download

CENSUS-ITEM first-download: not applicable — no src/ change (the budget step's last line pasted
once at the end, unchanged).

## CENSUS-ITEM premises

Premises of this GO the census finds wrong:
- P1 — the error count. On the head: 44 errors in 5 files, not 38 in 4. The missing six are in
  `.claude/hooks/land.ts`: five `Bun` uses and one real defect at :389. The brief's SCOPE (".claude
  hooks the project reports an error in") reaches the file; its COVERED HERE names only `lib.ts`'s
  three (Q1).
- P2 — `vite/client`. Scripts need it: `types: ["node"]` adds 7 `import.meta.env` errors in three
  `src/` files that scripts import (a SCOPE outside the brief's). The plan inherits the root's types.
- P3 — "the other two files `rg -l "Bun\." scripts` names" are not `Bun` uses to replace. The real
  sites are the reporter's 28 and the hooks' 8.
- P4 — the five reached files are six (four `.ts`, two `.d.mts`); the four root files are three in
  effect (`eslint.config.js` inert).
- P5 — `bun run checks` does not run the typecheck. It reads the platform harness's last verdict.
  Whether that harness runs `bun run typecheck` (both projects) or `tsc` over `tsconfig.json` is not
  in the repository: OPEN — what command writes `/tmp/observability/build-errors.log`? This turn's
  proof does not depend on it: rule 00 step 6 has the executor run `bun run typecheck` itself.
- P6 — "CI's lanes … shard 1 owns the pass on each temporary backend" is wrong. No lane is shard
  "1" (`local-1`); lane 1's own log says `maintenance skipped (owner: shard 1)`. The pass has had no
  owner anywhere since `ci.yml` dropped its staging shard matrix in cc93140c2 (2026-10-21). DEC-369's
  words "CI's lanes keep reaping their temporary backends" therefore record something that does not
  happen. Turn 3b's report §12 (`docs/governance/reports/housekeeping-3b.report.md` :792) said the
  same ("CI's lane 1 runs the pass on its temporary backend"): correction to that report.
  The nightly's first run with the variable is the pass's first run anywhere since 2026-10-21, with
  turn 3b's new prefixes never run live (Q2).
- P7 — the nightly's second Playwright run. It loads the same `globalSetup` as the first
  (`playwright.nightly.config.ts` :16), so with the variable in the job's `env` both runs own the
  pass. The second is the serial full run: 17:07 → 21:55 on 2026-11-11, and cancelled at the job's
  360-minute ceiling on 2026-11-10 (run 42856097069), 2026-11-09 and 2026-11-08. The plan scopes the
  variable to the first run's step (Q3).
- P8 — the repeat numbers' units. "38 of 1393 selected specs" is 38 of 1,393 TESTS; "5 of 53" and
  "0 of 60" are spec files. The head line's template must say which (Q4 (a)).
- P9 — `briefs.test.ts` "keeps judging the brief in force against the working tree". It runs no
  tree law (its header :52 → :55), so there is nothing for it to judge at the base, and CF-BRIEF-1's
  parse need not become a base reader. No change to `briefs.test.ts` beyond CF-BRIEF-14's new case.
- P10 — `--at <the base commit>`. On this lane the `Base: dev` commit (2b11a9d29) is not the tree
  the brief cites. The lane carries 77 commits on top of it (`git rev-list --count
  2b11a9d29..611ade039`), and the brief's line numbers were read on 611ade039 (its LIMITS). At
  2b11a9d29 seven paths the brief cites do not exist (`git cat-file -e`):
  - `docs/governance/go-template.md`;
  - `e2e/helpers/scratch.ts`;
  - `scripts/brief/check-go.ts`;
  - `scripts/conformance/briefs-allowlist.txt`;
  - `scripts/conformance/briefs.test.ts`;
  - `scripts/conformance/e2e-helpers.test.ts`;
  - `scripts/e2e-failure-report.test.ts`.

  So `--at 2b11a9d29` would print five CF-BRIEF-5/6 artefacts plus "the root holds no …" for the
  allowlist (CF-BRIEF-13) and the template (CF-BRIEF-15) (Q5).
- P11 — anchors. `check-go.ts`'s `--root` is at :34 → :45; :48 → :50 is `rulingsOf`. The
  nightly's user-sweep step is named at :139 (:138 is its comment). Every other line the brief
  cites holds what it says on 611ade039, read at each:
  - `nightly-e2e.yml` :62, :146, :164;
  - `global-setup.ts` :597;
  - `local-backend-proof.yml` :238, :896 → :899;
  - `e2e-failure-report.ts` :1927, :1939, :1975, :2122;
  - `go-template.md` :84;
  - `tsconfig.json` :2 → :9, :15;
  - `package.json` :18;
  - `ci.yml` :169.

## Decide-and-name (the plan; each continues unless the ruling says otherwise)

The plan's files: `tsconfig.scripts.json` (new), `package.json` (the `typecheck` line),
`scripts/e2e-failure-report.ts`, `scripts/conformance/lint-rules.test.ts` (no edit if `allowJs`),
`scripts/conformance/on-demand-failure.test.ts`, `.claude/hooks/lib.ts` and `.claude/hooks/land.ts`
(Q1), `scripts/conformance/wired.test.ts`, `.github/workflows/nightly-e2e.yml`, `e2e/global-setup.ts`
(comment), `scripts/conformance/ci-deadlines.test.ts`, `.github/workflows/local-backend-proof.yml`
(the upload path), `scripts/fixtures/` (the repeat shapes, captured), `scripts/brief/check-go.ts`,
`scripts/conformance/briefs.test.ts`, `docs/governance/go-template.md`, and the
`docs/features/` pages above.

- The second project's form: a `-p` chain — `"typecheck": "tsc --noEmit && tsc --noEmit -p
  tsconfig.scripts.json"`. `ci.yml` :169, `land.ts` :323 and rule 00's step run `bun run typecheck`
  unchanged. A solution file with `references` needs `composite` and `tsc -b`, which conflicts with
  `noEmit`; `tsconfig.json` stays as it is.
- `tsconfig.scripts.json`: `extends: "./tsconfig.json"`, `include: ["scripts/**/*.ts",
  ".claude/hooks/**/*.ts"]` (plus the two root configs if Q1 (c) rules so). It inherits the root's
  `types` (P2) and adds `allowJs: true, checkJs: false`.
- The `eslint.config.js` typing: `allowJs` (with `checkJs` off) in the scripts project, not a
  hand-written `eslint.config.d.ts`. Measured: only `eslint.config.js` enters, the two errors go,
  and the types come from the real file, so no declaration can drift from it. Every `.mjs` keeps its
  `.d.mts`, which TypeScript prefers, and CF-WIRED-3 keeps holding them.
- The `Bun` global's replacement in the reporter:
  - `existsSync`, `readFileSync(p, "utf8")`, `JSON.parse(…)`;
  - `writeFileSync` with `mkdirSync(dirname(p), { recursive: true })` first. OPEN, to settle from
    Bun's own documentation at Part A: whether `Bun.write` creates a missing parent directory (its
    `createPath` option); the replacement keeps whichever it does.
  - `node:child_process` `spawnSync` for :2953.

  `readJson` and `readLog` stay `async` in signature, so their callers do not change.
- The hooks (if Q1 allows): `node:child_process` `spawnSync` for every `Bun.spawnSync` (stdout and
  stderr as `Buffer`, decoded as today); `spawn` with the same timeout and kill for `run()`; stdin
  read through `process.stdin` (collected to text). `land.ts` :389 → `r.timedOut`.
- `on-demand-failure.test.ts` :311: `handler !== "lazy" && handler !== null && isSilent(handler)`.
  The answer is the same, since `null` already answered "unhandled" at :309.
- CF-TSC-1 (in `wired.test.ts`) reads `package.json`'s `typecheck` and `tsconfig.scripts.json`. The
  test fails when either: the `typecheck` line does not run `-p tsconfig.scripts.json`, or the
  `include` lacks `scripts/**/*.ts` or `.claude/hooks/**/*.ts`. Its planted case: an include without
  `scripts/`.
- The nightly variable's scope: the "Run nightly E2E (real-elapsed-time cases)" step (:141) gets its
  own `env: E2E_MAINTENANCE: "1"`, not the job's `env` (P7). One pass a job keeps the law "at least
  once a night". The serial run near its ceiling is not lengthened. And the existing workflow reader
  sees a step's `env` (a job's it does not, and `workflow-reader.ts` is not in SCOPE) — Q3.
- The workflow rule: CF-CID-7 in `ci-deadlines.test.ts`, read through `readWorkflow`, holds that
  the nightly job's Playwright step sets `E2E_MAINTENANCE: "1"`. Its planted breach: the same
  workflow without the line.
- The repeat file's carrier: `local-backend-repeat.txt` joins the `e2e-log-<lane>` upload's
  `path:` list (:952 → :956), as turn 3's step file did. It holds spec paths and counts only.
- `--at`'s tree: under the OS temp dir (`mkdtempSync(join(tmpdir(), "check-go-"))`), removed in a
  `finally`; its form (a worktree or a snapshot) is Q5 (b).

## CENSUS-ITEM findings

Beyond the task, file:line (rule 60 §13):
- F1 — `.claude/hooks/land.ts:389`: the dormant kit's landing door reports a timed-out step as
  "exit 124", because it reads `step.timedOut`, which `Step` does not have. Fixed in Part A if Q1
  allows.
- F2 — `tsconfig.json:6`: `eslint.config.js` is listed but never checked (no `allowJs`), so the root
  silently checks less than it says. Left as it is (SCOPE: tsconfig.json changes only for the
  solution-file form).
- F3 — `playwright.nightly.config.ts` and `vitest.config.ts` are outside every project (clean today;
  Q1 (c)).
- F4 — the nightly is red or cancelled four days running. 2026-11-11, run 43059972427: the
  Playwright job's "Report test outcome" failed after 5 h 08 min, and the Cloudflare parity smoke
  failed at "Install Chromium's system libraries". 2026-11-10, 11-09 and 11-08 (42856097069,
  42656430324, 42500630833): cancelled. On 11-10 the cancelled step was "Run the full suite serially
  (includes @global-state)", at the 360-minute job ceiling (16:35:57 → 22:36:21). The 15:3x UTC
  "success" runs are the `hour` job's off-hour exits (DEC-277). Not read further: the nightly is the
  supervisor's (DEC-369's judge reads its first green setup).
- F5 — `e2e/global-setup.ts:589` → :595: the owner comment says "Shard 1 owns maintenance" and "An
  unsharded (local/solo) run has no herd and keeps ownership". Neither is true: no job is shard 1,
  and `e2e:local` sets `local`. The brief opens only the "CI never sets it" line (:596). Q2 (c)
  asks for the block.
- F6 — `docs/features/ci-guards.md:386` ("`ci.yml` sets `E2E_SHARD: ${{ matrix.shard }}`") and
  `docs/features/e2e-harness.md:351` ("every shard-1 run") are stale since cc93140c2. Part B
  corrects them under the docs allowance unless the ruling narrows it.
- F7 — `.cursor/rules/20-tests.mdc:20` and `.claude/rules/20-tests.md:14`: "the shard-1 setup alone
  reaps residue". After Part B the owner of staging's pass is the nightly; this is for the rules
  turn, not edited here.
- F8 — `local-backend-proof.yml:284` → :291: when specs are selected but none fits the budget, the
  file says only "nothing to repeat". The counts the summary would carry are not written, so the
  evidence reads as if nothing was selected (Q4 (b)).
- F9 — `scripts/ci/turn-checks.ts:13` → :15: the checks runner's typecheck verdict is the platform
  harness's. If that harness checks only `tsconfig.json`, `bun run checks` can print Typecheck PASS
  over a red scripts project (P5's OPEN). Rule 00 step 6's own `bun run typecheck` is the turn's
  proof meanwhile.
- F10 — Limits of this census: the scratch copies are under `/tmp/ethio-scratch/housekeeping-3c/`
  (the tsc outputs, lane 1's job log and `e2e-log-1` artifact, the nightly's job log). They are the
  operator's to remove. The temporary tsconfig files in the working tree were deleted (`git status
  --short` empty before this file).

## QUESTIONS

1. Concern 1 — the hooks and the rules (a STOP by rule).
   - (a) Rule 00 says "never write under `.claude/`" with no exception, while rule 50 allows
     changing ".claude/** unless SCOPE names the file", and this SCOPE names `.claude/hooks/**/*.ts`
     files with errors by area. Ask: rule that SCOPE's naming governs here, for `.claude/hooks/lib.ts`
     (3 `Bun` uses) and `.claude/hooks/land.ts` (5 `Bun` uses and the :389 defect, which the brief
     did not anticipate — P1).
   - (b) The hooks' `Bun.spawn` (`lib.ts` :1084, a streamed child with a kill timer) and
     `Bun.stdin.text()` become `node:child_process` and `process.stdin`. The kit is dormant and has
     no test, so the change is proven by `tsc` alone. Or rule that the hooks keep `Bun` and the
     scripts project leaves `.claude/hooks/` out — but the brief's EXCEPTIONS say none and "never
     an exclude".
   - (c) Also include `playwright.nightly.config.ts` and `vitest.config.ts` in the scripts
     project's `include` (both clean today; concern 1 by definition)? Proposal: yes, with CF-TSC-1
     naming them.
2. Concern 2 — no CI lane owns the pass (P6).
   - (a) DEC-369's text: replace "CI's lanes keep reaping their temporary backends" with what is
     true. Proposal: "no CI lane owns the pass; each temporary backend starts empty".
   - (b) Should lane 1 of `local-backend-proof.yml` also set `E2E_MAINTENANCE: "1"`, so every pull
     request runs the pass's code on an empty backend before the nightly runs it on staging? That
     needs `local-backend-proof.yml` in SCOPE beyond the carrier, and CF-CID-7 would cover both
     lines. Proposal: yes — the first live run of a reaper unexercised since 2026-10-21 should not be
     staging's.
   - (c) Is the owner comment block `global-setup.ts` :589 → :596 open for correction (comment
     only), not just the "CI never sets it" line (F5)?
3. Concern 2 — the variable's scope (P7). The brief's guard and DEC-369 say "the nightly job's env".
   The plan sets it on the first Playwright step's `env` (one pass a job, the serial run not
   lengthened, the existing reader sufficient). Ask: rule the step form, and DEC-369's wording "the
   nightly's first Playwright run sets `E2E_MAINTENANCE: "1"`". Or rule the job's env, with
   `scripts/conformance/workflow-reader.ts` added to SCOPE to keep a job's `env` lines, and both
   runs owning the pass.
4. Concern 3 — the head line's shape.
   - (a) Units (P8). Proposal: `- Repeat: <U> of <T> tests repeated — specs directly changed <a>/<b>,
     importers of a changed helper <c>/<d>; budget <B> s`, plus `; the time cap left <k> test runs`
     when `repeat-cap.ts` appended lines. Run 43144538685's line would read `- Repeat: 38 of 1393
     tests repeated — specs directly changed 5/53, importers of a changed helper 0/60; budget 720 s`.
   - (b) The "nothing fits" shape (F8): the lane's selection step writes the summary line (with
     `0 repeated`) in that case too, instead of "nothing to repeat" — a change to
     `local-backend-proof.yml` :289 beyond the carrier. Or the reporter counts the `Not repeated`
     lines, which carry no rank and so cannot split direct from importers.
   - (c) Where the line appears: only when `repeat` is among `E2E_EXPECTED_SOURCES` (the merged
     report and the lanes' report), never in the nightly's or the flake check's. In the docs-only
     form (`renderLanesSkipped`) no line at all, since no lane ran. Proposal: as stated; an absent
     file prints `- Repeat: selection not written`, and a line that does not parse is quoted raw.
5. Concern 4 — `--at` (a STOP by rule for (b)).
   - (a) Which commit (P10). Proposal: `--at` takes any commit, and the template's STEP n+1 reads
     `--at <the commit STEP 0 began from>` (this turn: 611ade039, the parent of 59b1cd520), not the
     `Base: dev` sha. Under `--at`, only the tree laws and COUNT lines read the commit's tree; the
     allowlist and the template are read from `--root` (the working tree), because STEP 0 edits the
     allowlist and a lane's template is newer than its dev base.
   - (b) `git worktree add` / `remove` are not among rule 00 §Git's allowed verbs, and the checker
     would run them at STEP 6. Either the rules turn names `git worktree` (for the checker only), or
     `--at` builds a snapshot in the OS temp dir from `git show <commit>:<dir>` tree listings and
     `git cat-file --batch` reads (allowed verbs). The checker already accepts such a root
     (`treeRootProblem`). But in a snapshot, a COUNT line whose command is a git read (`GIT_READS`)
     runs outside any repository and prints no number, so the snapshot form judges those lines
     wrongly, while a worktree judges them right. Ask: which form.
