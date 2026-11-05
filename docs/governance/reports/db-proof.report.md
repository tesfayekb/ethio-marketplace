# Local database for proofs (DEC-343) — report
Base: c89271ca2 · Final commit: 311533f70 · Brief: docs/governance/briefs/db-proof.md (the task gave no sha256; the saved file's is 7ccdb0fd4fbc5896233083ef3837ed2fc92789f893790cef91782560dbe48ef9) · Rulings: docs/governance/briefs/db-proof-ruling-1.md (1345ddcc3bb9503fddefc9c3b372118561de42d331489450237452e9be45c11c), docs/governance/briefs/db-proof-ruling-2.md (df0510747f7ee57f5d5447fce1faad0303d49137927e329c783a7116c202bbdd), docs/governance/briefs/db-proof-ruling-3.md (cf8c4362d35722d22093a4cfbb0437097dfc251e2a708b27ef9d46e92c7e74cf), docs/governance/briefs/db-proof-ruling-4.md (74fd91a23dd53796785fe33b9d6702aaa511d679e558abab9062fd9f4572d19d)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on 311533f

CI at the start: dev c89271ca2 — SUCCESS (ci.yml run 41979377456). At the report: ci-evidence names 3d80d4b (this branch's step 0) — SUCCESS, run 42016839926; `origin/dev` is still c89271ca2.

## 1. Done / not done, by part and step

- Step 0 — done: the task saved (3d80d4b57), roadmap line 4 "Lane B (build): docs/governance/briefs/db-proof.md", pushed, draft [PR #23](https://github.com/tesfayekb/ethio-marketplace/pull/23). Ruling 1 saved (a895d2e9b).
- Part 1 (BUILD 1 + ruling A) — done (3b5301d3d): the working-copy preparation moved out of `local-backend-proof.yml` into `scripts/ci/prepare-local-backend.sh <root> <notes>`; the database steps (`admin_sql`, `hold_background_work`, `db_error_capture`, `restore_background_work`, `ledger_check`) into the sourced `scripts/ci/local-backend-db.sh`. CI's start step sources it and calls them in today's order; everything CI-only (port reservation, start, the INC-944 sampler, the classifier, the PostgREST/hook proofs) stays inline.
- Part 2 (BUILD 2 + rulings B, C, D) — done (cf90ef042): `bun run db:proof` (`scripts/db-proof.sh`, `package.json`), its census `scripts/conformance/db-proof.test.ts` (CF-DBP-1…4, each proven on a planted bypass).
- Part 3 (BUILD 3, 4 + ruling E) — done (6344488db): rule 50 and rule 30 amended; rule 60 one line; rule 00's computer line corrected; one AGENTS.md line (its budget allowance updated); `docs/features/ci-local-backend.md` §Turn db-proof; register row 109 (failed-apply evidence); changelog line; roadmap lines for findings 8, 9 and 10.
- Ruling sequence — done: build → byte-identity diff (empty) → `--fresh` (PASS, cold, timed) → warm (timed) → planted file (FAIL with the server record) → removed, `git status --short` empty → PASS again → `docker system df` / `docker stats` measured → push once.
- Ruling 2 — saved (71268b2cd). FIRST: `bun run db:proof --stop` → `db:proof stopped — the stack's data is kept; the next run starts it again (--fresh wipes it)`.
- Part 4 (ruling 2, items 1a, 1b, 2, 4) — done (7d185fe48): INC-1063's port check (`scripts/db-proof-ports.sh`, sourced by `scripts/db-proof.sh` after every start kind and before the holds and `migration up`); CF-DBP-5 and CF-DBP-6; rule 00's clause; rule 50 and the header name the check; INC-1063's entry, register row 109, `ci-local-backend.md` one paragraph, the changelog line.
- Part 5 — done (e56e372ea): the two reds of CI on 4b9bb7bb7 (§11).
- Ruling 2 item 1c — stopped twice, then done under ruling 4: stop 1 (`db-proof.stop-1.md`, the Docker Engine setting not applied) and stop 2 (`db-proof.stop-2.md`, ruling 3's network option not applied either; built, measured and reverted). Item 1d: `bun run db:proof --stop` → `db:proof stopped — the stack's data is kept; the next run starts it again (--fresh wipes it)`; no container and no volume of the project remain (the refusal wiped them).
- Ruling 3 — saved (a46e61edf); item 5 done (4b02f74a6): INC-1064's entry and the roadmap line for a no-tests `bun run checks`; items 1–4 replaced by ruling 4.
- Ruling 4 — saved (798591e35); part 7 done (311533f70): the probe through the wrapper first (§5), then `scripts/db-proof-docker.sh` linked as `docker` first on PATH for the CLI's `start` only (the one CLI call that creates containers: `migration up` talks to the database, `stop` only removes — the pinned source's SIDE_EFFECTS.md for each); the port check unchanged in logic, its NOT RUN line naming the wrapper; CF-DBP-7; rule 50, the header, `ci-local-backend.md`, INC-1063, register row 109 and a changelog line naming the wrapper. Proof: `--fresh` PASS, every mapping 127.0.0.1, then `--stop` (§5).
- Not done by ruling: `bun run checks` (ruling 1, Timing), waiting for the pull request's CI (ruling 1, Sequence: "push ONCE → END THE TURN").

## 2. Files changed

`git diff --name-only c89271ca2..HEAD` (at 311533f70):

```
.cursor/rules/00-protocol.mdc
.cursor/rules/30-migrations.mdc
.cursor/rules/50-security.mdc
.cursor/rules/60-report.mdc
.github/workflows/local-backend-proof.yml
AGENTS.md
docs/_changelog.md
docs/features/ci-local-backend.md
docs/governance/briefs/db-proof-ruling-1.md
docs/governance/briefs/db-proof-ruling-2.md
docs/governance/briefs/db-proof-ruling-3.md
docs/governance/briefs/db-proof-ruling-4.md
docs/governance/briefs/db-proof.md
docs/governance/mechanisms.md
docs/governance/reports/db-proof.report.md
docs/governance/reports/db-proof.stop-1.md
docs/governance/reports/db-proof.stop-2.md
docs/tracking/incidental-findings.md
package.json
roadmap.md
scripts/ci/local-backend-db.sh
scripts/ci/prepare-local-backend.sh
scripts/conformance/agents-lines-allowlist.txt
scripts/conformance/db-proof.test.ts
scripts/db-proof-docker.sh
scripts/db-proof-ports.sh
scripts/db-proof.sh
```

New files, `git ls-files` proof: the four rulings and the task under `docs/governance/briefs/`, the two stop reports and this report, `scripts/ci/local-backend-db.sh`, `scripts/ci/prepare-local-backend.sh`, `scripts/conformance/db-proof.test.ts`, `scripts/db-proof-docker.sh` (mode 100755), `scripts/db-proof-ports.sh`, `scripts/db-proof.sh`. 27 files, 1542 insertions, 234 deletions. No deletion. `docs/tracking/incidental-findings.md` is outside the standing allowance; rulings 2 (item 4) and 3 (item 5) name its INC-1063 and INC-1064 entries.

## 3. Behaviour contract

`local-backend-proof.yml`, step "Prepare the working copy":

| | Base | Now |
| --- | --- | --- |
| Body | 135 inline lines (fixtures, skip, four `sed -i` patches, bootstrap substitution) | `bash scripts/ci/prepare-local-backend.sh .ci-local local-backend-working-copy.txt` — the same lines, `.ci-local` → `$root`, the notes file → `$notes`; `sed -i` → `sed -i.orig` + `rm` (GNU and BSD alike); `sha256sum` falls back to `shasum -a 256` only where it is missing |
| Output | `.ci-local/supabase/migrations/*`, `local-backend-working-copy.txt`, `PREPARE_SECONDS` | the same |

Byte identity, measured on this Mac: the base step's text (with a `sed -i`/`sha256sum` shim only) against the new script — `diff -r` empty over 394 files, the working copy's manifest sha256 `8ec2051efaa3a3966382b6104f286b81cd71e6b43eb86e6f0b8941fcf83b6187` on both. The four patches' before → after hashes equal dev's CI "Working copy" lines: 20260830091427 10d1e2493220 → ec49d56298cd; 20260830091455 ad9ad9937fb4 → b84ca0b721a1; 20260924084437 e04f82beab8f → 29f7e1b761d4; 20261029073342 3dd11fa31551 → 4287abad5fa3. CI's own lines on this pull request are admission condition 2 (ruling A).

Step "Start backend and apply all migrations":

| Order | Base | Now |
| --- | --- | --- |
| hold | inline `admin_sql` + pg_cron check + three statements; `exit 1` on no setting | `source scripts/ci/local-backend-db.sh; hold_background_work` — same status line, same STOP line, `return 1` (the step's `-e` exits) |
| apply + sampler | inline | unchanged |
| capture on failure | inline `db_error_capture` reading `$RUNNER_TEMP`, `$apply_began`, `$DATABASE_CONTAINER` | `db_error_capture "$RUNNER_TEMP/db-error-capture" "$apply_began" "$DATABASE_CONTAINER" \|\| echo …` — same body, same files, same `meta.txt` lines |
| restore | inline, 15 tries for "on on 1" | `restore_background_work` — same statements, same "Restored (…)" line, same failure line |
| history + ledger | inline unnamed-rows check, python writing `applied N/N` / `missing: …` and `MIGRATIONS_OK=1` | `ledger_check .ci-local local-backend-migrations.txt` (same check, same python, paths as argv) then `echo "MIGRATIONS_OK=1" >> "$GITHUB_ENV"` |
| PostgREST / hook proofs | inline, call `admin_sql` | unchanged (`admin_sql` from the library) |

db:proof after ruling 2: every start kind (cold, restart, warm) now meets the port check before the holds; a binding beyond 127.0.0.1 or ::1 answers `db:proof NOT RUN — the stack's ports are open beyond this computer: set Docker Desktop → Settings → Docker Engine "ip": "127.0.0.1", then run db:proof again` with the stack stopped `--no-backup` (and its applied record removed, so the next run is fresh); Docker not answering the ports answers NOT RUN too. After ruling 4 the cold and restart starts run the CLI with `PATH="$DOCKER_WRAPPER_BIN:$PATH" DB_PROOF_REAL_DOCKER="$REAL_DOCKER"` (the real docker resolved by `command -v docker` in the preflight; a non-absolute answer is NOT RUN), and the port check's line is `db:proof NOT RUN — the stack's ports are open beyond this computer — the docker wrapper did not reach every mapping (has the pinned CLI's argument form changed?); nothing applied`. Nothing else in db:proof's answers changed. `has_data` captures Docker's volume list, then matches it (part 5). `package.json`: one script, `db:proof`. No route, door, screen or string touched.

## 4. Censuses

- Every reader of the moved names (`rg "db_error_capture|admin_sql|local-backend-working-copy|MIGRATIONS_OK|local-backend-migrations\.txt"`): the workflow (9), the library (13), `scripts/db-proof.sh` (2), `db-proof.test.ts` (5), docs and older briefs only. No other script or test reads the step's text for these names; the laws suite (`bunx vitest run scripts`) reads the workflow through `workflow-reader.ts` and passes.
- The CLI pin: the workflow's `SUPABASE_CLI_VERSION: 2.120.0` is the one db:proof reads (by its line, never a second copy); its four checksums are pinned in `scripts/db-proof.sh` from the release's checksum file.
- Ports: db:proof reads the config's ports and checks each with `lsof` before a start; the config is CI's `scripts/ci/local-backend-config.toml`, unchanged (ruling B).

## 5. Tests

- Added: `scripts/conformance/db-proof.test.ts` — CF-DBP-1 (the prepare step calls the shared script; the fixture text lives only there), CF-DBP-2 (the start step's order: source → hold → `migration up --local` → capture → restore → ledger; the database text lives only in the library), CF-DBP-3 (db:proof pins the workflow's version by checksum for darwin_arm64 and linux_amd64, scrubs the environment, uses the shared prepare, library and excerpt), CF-DBP-4 (no forbidden command; no URL but the CLI's release). Each with a planted bypass that fails. `bunx vitest run scripts/conformance/db-proof.test.ts`: Tests 4 passed (4).
- Added by ruling 2: CF-DBP-5 (the port check at the top level, after the last start and before `hold_background_work` and `migration up`, a refusal stopping `--no-backup` and answering NOT RUN; planted: the check removed, moved after the apply, or indented into the cold/restart block — each fails with its line) and CF-DBP-6 (the parser on `docker inspect` in `stack_ports`' format: the line `/saas-adminer 8080/tcp=0.0.0.0:8080 8080/tcp=:::8080`, captured on this computer from a container published with no host address, answers the refusal word for word; the same line with 127.0.0.1 and ::1 answers nothing). `bunx vitest run scripts/conformance/db-proof.test.ts`: Tests 6 passed (6).
- Added by ruling 4: CF-DBP-7 — (i) the wrapper run with a stand-in for the real docker that prints its arguments: `-p 31322:5432` → `127.0.0.1:31322:5432`, `-p 31321:8443/tcp` → `127.0.0.1:31321:8443/tcp`, `-p=31324:8025`, `--publish 31324:8025` and `--publish=1:2` rewritten, `127.0.0.1:1:2`, `[::1]:1:2` and `-e X=1:2` unchanged, an `exec` passes untouched, no real path → exit 127 with one line and nothing on stdout, the wrapper's own path → 127; (ii) db-proof.sh resolves `REAL_DOCKER=$(command -v docker)` and links the wrapper before the start, the start alone carries the PATH prefix, no line changes PATH by itself, and the wrapper takes the real docker only from `DB_PROOF_REAL_DOCKER` and execs only it; planted: the start without the prefix, the wrapper's `exec docker`, the real docker resolved after the start — each fails with its line. `bunx vitest run scripts/conformance/db-proof.test.ts`: Tests 7 passed (7).
- Changed: CF-DBP-2's version escape (part 5); CF-DBP-6's expected refusal text (ruling 4 item 1c). Re-pointed: none.
- Ruling 4 item 1b, the probe through the wrapper (the throwaway `sleep` container from the stack's postgres image, `-p 31399:9`, removed at once): real docker `/usr/local/bin/docker`; requested `{"9/tcp":[{"HostIp":"127.0.0.1","HostPort":"31399"}]}`, published `{"9/tcp":[{"HostIp":"127.0.0.1","HostPort":"31399"}]}`; lsof `com.docke IPv4 127.0.0.1:31399`; after removal nothing listens on 31399.
- Ruling 4 item 4, the proof on 311533f70's scripts: `db:proof PASS — applied 392/392, CLI 2.120.0, cold, 47 s`; `docker ps --format '{{.Names}} {{.Ports}}'` — `supabase_storage_ethio-ci-local 5000/tcp`, `supabase_rest_ethio-ci-local 3000/tcp`, `supabase_inbucket_ethio-ci-local 127.0.0.1:31324->8025/tcp`, `supabase_auth_ethio-ci-local 9999/tcp`, `supabase_kong_ethio-ci-local 127.0.0.1:31321->8443/tcp`, `supabase_db_ethio-ci-local 127.0.0.1:31322->5432/tcp`; `lsof -nP -iTCP:31322 -sTCP:LISTEN` — `com.docke IPv4 TCP 127.0.0.1:31322`; 31321 — `com.docke IPv4 TCP 127.0.0.1:31321`; 31324 — `com.docke IPv4 TCP 127.0.0.1:31324`. A warm re-run: `db:proof PASS — applied 392/392, CLI 2.120.0, warm, 4 s`. Then `bun run db:proof --stop` → `db:proof stopped — the stack's data is kept; the next run starts it again (--fresh wipes it)`.
- `bun run typecheck`: exit 0. `bun run lint`: exit 0 (0 errors, 46 warnings, none in this turn's files). `bun run format:check`: "All matched files use Prettier code style!".
- Laws, `bunx vitest run scripts --maxWorkers=2` on 311533f70's tree: Test Files 1 failed | 90 passed (91); Tests 1 failed | 463 passed (464) (on 7d185fe48: 462 of 463; on 6344488db: 460 of 461). The one failure is NH-6 (`scripts/ci/nightly-hour.test.ts`, untouched): macOS's libc ignores `TZDIR`, so the "cannot resolve New York" case resolves. A platform limit of this Mac, not a red of this tree (§12).
- `agents-lines.test.ts` + `executor-hooks.test.ts`: Tests 28 passed (28).
- THE CHECKS: NOT RUN — rulings 2 item 3, 3 item 6 and 4 item 5: P-2 is building on this computer and two test runs never share it; CI is the full proof. In their place, on 311533f70's tree (and before on e56e372ea), the build job's cheap guards: shell-pipes (and its self-test) OK; promote-needs OK (16 jobs); acceptance-doors, caller-gates and outbound-calls self-tests OK; e2e-select self-test OK; root routes 61 entries safe; `bun run format:check` clean; `bun run lint` 0 errors; typecheck exit 0. Not run locally: actionlint (Linux binary), the build and its bundle report.
- Browser tests: none — no spec, screen or shared helper changed.

db:proof measurements (this Mac, arm64, 18 GiB, Docker Desktop with 7.654 GiB):

| Run | Last line | Time |
| --- | --- | --- |
| first start (CLI download, image pulls) | stopped before `migration up` (the misnamed stack, §10) | 163 s |
| `--fresh` on dev's migrations, final commit | `db:proof PASS — applied 392/392, CLI 2.120.0, cold, 50 s` | 50 s |
| warm re-run | PASS, warm | 3 s |
| planted `20991231235959_dec343-planted.sql` (sha256 9a97f2a52ed7faac06c8b634a5d4d6500a52d1ccdaea3caffa98830e3ebb771a) | `db:proof FAIL — 20991231235959_dec343-planted.sql failed (server record: stream)` | 3 s |
| removed (`git status --short` empty), again | PASS, warm | 3 s |
| restart after `--stop` (earlier) | PASS, restart | 28 s |
| tampered record → automatic fresh, reason first ("an applied file changed: 20260730015333_…") | PASS, cold | 49 s |
| `--stop` | done | 2 s |

The planted run's server record carried the CONTEXT line "PL/pgSQL function dec343_planted_raise() line 3 at RAISE" through the shared `db_error_capture` and `start-failure-excerpt.mjs` (admission condition 3); per ruling C the excerpt stays in the terminal. Refusal lines proven: Docker down → `NOT RUN — Docker is not running…`; a listener on 31322 → `NOT RUN — port 31322 is in use by Python…`. The status lines match CI's: "pg_cron: available 1.6.4; cron.launch_active_jobs settings: 1" and "Restored (…): on on 1".

Footprint with the stack up: images +3.52 GB (8.47 → 11.97 GB: postgres 17.11.0.004 1.75 GB, storage-api v1.79.36 1.39 GB, kong 212 MB, gotrue 89.3 MB, mailpit 49.2 MB, postgrest 27 MB); database volume 168.4 MB; memory about 500 MiB (storage 174.9, db 123.3, kong 92.89, rest 86.7, inbucket 11.25, auth 11.03 MiB); CLI cache 84 MB; state folder 8 MB. The stack is left running (warm), as the brief asks.

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "SUPABASE_CLI_VERSION|supabase_.*_linux"`, `rg -n "redact"` in `.github/workflows/`, `rg -n "local-backend-config"`. Line numbers are this tree's, as the roadmap lines give them; the three redaction places are the base's :579, :1002 and :1266 (`git show c89271ca2:.github/workflows/local-backend-proof.yml`), moved up by the extraction; :13, :65, :75 and :319 are the same on both.
- Finding 8 — the CLI pin is written four times (`local-backend-proof.yml:13`, `:65`, `:319`, plus the evidence line): a roadmap line, not this turn (ruling E).
- Finding 9 — `redact()` inline three times (`local-backend-proof.yml:447`, `:790`, `:1054`): a roadmap CI turn (ruling C).
- Finding 10 — the backend-images job's derived config (`:75`): a roadmap line (ruling E).
- db:proof itself reads the version, excludes, preparation, database steps and excerpt from CI's one copy; no second copy.

## 7. Allowlists and guards

- CF-DBP-5 and CF-DBP-6 (ruling 2), CF-DBP-7 (ruling 4), each with its planted or fixture proof; `scripts/db-proof-ports.sh` and `scripts/db-proof-docker.sh` are named by their caller `scripts/db-proof.sh` (CF-WIRED-1 passes).
- `scripts/conformance/agents-lines-allowlist.txt`: 4 lines → 4 lines; line 3's key `AGENTS.md (10200)` → `AGENTS.md (10482)`, reason extended "DEC-343 ruling 1 E adds the 282-byte db:proof line (10200 -> 10482)", until unchanged (2026-12-31).
- New guard CF-DBP-1…4 (`db-proof.test.ts`), each self-tested on a planted bypass. `wired.test.ts` needs no line: the census is a test file, and the two `.sh` files are named by their callers (CF-WIRED-1 passes).

## 8. Strings

None (no `t(` key, no locale file touched).

## 9. Migrations

None.

## 10. Departures

- The misnamed first start: `bun run` loads `.env`, whose `SUPABASE_PROJECT_ID` named the first local stack's containers after the hosted project's id. Nothing remote was reached (the CLI started local containers only, and the run stopped before `migration up`). Cleaned with `bun run db:proof --stop` and the two local volumes removed; fixed at its root by the environment scrub (`SUPABASE_*`, `VITE_*`, `E2E_*`, `PG*`, `DATABASE_URL` unset) and `SUPABASE_PROJECT_ID=ethio-ci-local`, which CF-DBP-3 requires.
- A stray `supabase/.temp/cli-latest` written by the CLI's version check in the repository root: removed; the check and `--stop` now run outside the tree.
- The AGENTS.md line was shortened to 282 bytes to keep the constitution's growth small; its allowance moved with its reason (§7).
- MINOR (self-review): rule 00's opening still says "never write to a database except through the browser tests' own scratch rows on ethio-staging", which now differs from rule 50's db:proof exception. Ruling E named only rule 00's computer line, so I left it; I ask for a ruling.
- Ruling 2: rule 00 gains its one clause (the MINOR above is closed by it); `bun run checks` NOT RUN by item 3; INC-1063's entry written from the ruling's own words (defect, evidence, fix, class) — rule 10 admits records only as word-for-word imports, and the ruling dictated the content rather than a text, so the entry's wording is mine and the supervisor checks it.
- MINOR (self-review): `docs/tracking/incidental-findings.md` ends "Numbering: next free INC-1046." while the ruling registered INC-1063; I left the line (other lanes' numbers are not on this branch).
- Rulings 3 and 4: ruling 3's network option was built, measured (both `--fresh` runs refused by the port check; the probes in `db-proof.stop-2.md`) and reverted, never committed. Ruling 4's wrapper rewrites only inside `run` / `create` (`container run` / `container create`) and only the `<hostPort>:<containerPort>[/<protocol>]` form the CLI writes — a bare container port or `-P` is left to the port check, which refuses it; the ruling-2 changelog line naming a Docker Engine setting stays (the changelog is append-only) and the ruling-4 line says it is superseded.
- MINOR (self-review): CF-DBP-6's accepting line is the captured line with its addresses set to 127.0.0.1 and ::1 — authored from a real capture, as ruling 2 item 1c's fed fixture is; no stack of this computer has yet published on 127.0.0.1 to capture.
- MINOR (self-review): `scripts/db-proof.sh` uses `rm -rf` on its own state under `~/.cache/ethio-db-proof` only (the lock, the next working copy, the held migrations, the capture); `set -u` keeps the path from being empty.

## 11. CI

- Base: at the start, ci-status.md's first six lines named P-2's c28c45c (FAILURE, another lane's branch, not dev). The two-step check therefore read dev's own last run with `gh run list --branch dev --workflow ci.yml`: c89271ca2, SUCCESS, run 41979377456.
- Now (`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`): commit 3d80d4b57dbb (this branch's step 0), SUCCESS, completed 2026-11-05T11:34:13Z, run 42016839926.
- Reds fixed from an earlier turn: none.
- This pull request's later runs, read without waiting: 4746c6bd6 — 30 pass, 9 lanes pending, 0 fail (at stop 2); 222853a32 — 23 pass, 16 lanes pending, 0 fail (at ruling 4). The new head's run is the admission judge (ruling 2 item 5).
- This pull request's run on 4b9bb7bb7 (read at ruling 2, without waiting): 39 pass, 2 fail, 1 skipping. Both reds are this turn's own, class code (rule 40), fixed in e56e372ea: (1) "Build, typecheck, lint" — the Shell-pipes guard (INC-832) refused `scripts/db-proof.sh:114`, `has_data`'s `docker volume ls … | grep -qx`; it now captures, then matches; the guard and its self-test pass locally. Its later steps (typecheck, format, lint, build) were skipped by that red, so this tree's run is their first judgment. (2) CodeQL — one high alert, "Incomplete string escaping or encoding" at `scripts/conformance/db-proof.test.ts:118` (CF-DBP-2's `version.replace(/\./g, …)`); every regex metacharacter is now escaped. No re-run. The lanes on 4b9bb7bb7 passed; their "applied N/N", restore and "Working copy" lines are the supervisor's to read for admission. Admission moves to the new head's run (ruling 2 item 5). Admission (ruling A) is CI's lanes green with "applied N/N" and the restore line unchanged, plus the "Working copy" lines equal to §3's hashes. Anything else reverts both steps.

## 12. Limits

- The stack's network posture was proven on this computer only (Docker Desktop, engine 28.5.1): the wrapper's rewrite is what the probe showed this engine honours; the port check refuses any other answer on any computer.

- `bun run checks`: not run, by ruling 1. Its NOT RUN items on this Mac would be actionlint (the cached binary is linux x86-64, "exec format error") and the jobs pinned to Linux. CI judges.
- NH-6 fails on macOS (libc ignores `TZDIR`). It is untouched by this turn and green in CI. It is reported, not fixed, because the test is outside scope.
- The pull request's CI was not awaited (ruling 1).
- Browser tests: not run (none changed; no E2E values were checked).
