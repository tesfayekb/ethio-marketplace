# The picomatch advisory: an audit exception list, DEC-405 — report

Base: dev 143027fac (the brief's; `origin/dev` was 385003bd1 when the lane started, see §10) · Final commit: 7751baef7 · Brief: docs/governance/briefs/pkg-picomatch.md (sha256 a4b3ad3d76ecf0c5747d7fbbec3a38fea071b64849caf5e8781b49f045bf0ed0) · Ruling 1: docs/governance/briefs/pkg-picomatch-ruling-1.md (sha256 59630c048bc9f6e0d7657a6f0c5bd93c63a03e1b93fb9315a0a7ff1103712b6c)
Review: READY · 0 BLOCKER · 0 MAJOR · 2 MINOR · on 7751bae

## 1. Done / not done, by part and step

- STEP 0 done: `git status --short` empty on `cursor/f1-doors-6a`; branch `cursor/pkg-picomatch` from `origin/dev` (385003bd1); the brief saved by `cp`, `cmp` identical, sha256 as above; roadmap line 3 written by script; `briefs-allowlist.txt` holds only comments (nothing keyed to another brief to remove); `check-go.ts` "no finding"; commit `1bb1b6057`.
- STEP 1 done, and it STOPPED: no patched picomatch exists (stop report `docs/governance/reports/pkg-picomatch.stop-1.md`, commit `c2dd28604`, draft PR #65).
- Ruling 1 saved (`3ed11e673`, sha256 as above) and built in place of STEP 2's override: items 1, 2, 4, 5 and 6 done; item 3 done as far as the tool allows (§12).
- STEP 3 done: typecheck, lint, build, `lockfile-hosts.test.ts`, `bun run checks`, `check-go.ts --at 143027fac`, the self-review.
- STEP 4 done: one push (`7751baef7`); PR #65 marked ready; its title is the brief's (§10).
- STEP 5: this report. CI result in §11.
- `package.json` and `bun.lock` are unchanged (ruling 1: "stay unchanged").

## 2. Files changed

`git diff --name-only 385003bd1..HEAD` (the lane's own change; the base the lane started from):

```
docs/features/dependency-audit.md
docs/governance/briefs/pkg-picomatch-ruling-1.md
docs/governance/briefs/pkg-picomatch.md
docs/governance/reports/pkg-picomatch.stop-1.md
roadmap.md
scripts/audit-exceptions.ts
scripts/audit-exceptions.txt
scripts/audit-gate.sh
scripts/audit-gate.test.ts
scripts/conformance/wired.test.ts
```

Against the brief's own base, `git diff --name-only 143027fac..HEAD` lists 17 paths: these ten plus seven that the merge of PR #63 changed on dev (`docs/generated/i18n-usage.json`, `e2e/ad-page.spec.ts`, `public/i18n-usage.json`, `scripts/route-budgets.mjs`, `src/features/ad-page/save-intent.test.ts`, `src/features/ad-page/save-intent.ts`, `src/routes/l.$slug.tsx`). None of the seven is this lane's.

New files, proven by `git ls-files`: `scripts/audit-exceptions.ts`, `scripts/audit-exceptions.txt`, `scripts/audit-gate.test.ts`, both briefs and the stop report (the report you are reading joins at its own commit).

This report's own path joins at the `pkg-picomatch: report` commit.

## 3. Behaviour contract

One function changed: `scripts/audit-gate.sh` (CI's `dependency-audit` job runs it; `.github/workflows/ci.yml` is untouched).

| Case | Before (`7751baef7`'s parent) | After |
| --- | --- | --- |
| a high or critical finding, not listed | "::error::High or critical vulnerabilities reported by 'bun audit'.", exit 1, no retry | the same, word for word |
| advisory service unreachable (`audit request failed`) | three attempts, 20 s apart, then "::error::'bun audit' could not reach the advisory service. This gate did NOT run.", exit 1 | the same |
| no finding | "No high or critical advisories.", exit 0 | the same when the list has no valid line; with one or more: "No high or critical advisories beyond the recorded exceptions.", exit 0 |
| a listed advisory (valid line) | failed the job (the advisory is reported) | passed as `--ignore=<GHSA id>` on the `bun audit` call, plus one `::warning::<id> is held out of the audit until <date> (<DEC>): <reason>` |
| an expired, malformed, undecided, duplicate or over-long line, or a missing list | no list existed | exit 1 before any audit, `::error::<file>:<line> <why>: <the line>` and "::error::The audit exception list is not valid; this gate did NOT run. See above." |

Everything else is today's: the audit level (`high`), the retry, the output file `/tmp/audit.txt`, the order (list first, then audit). New: the script finds its repository root from its own path and reads the list from `scripts/audit-exceptions.txt`, or from `$AUDIT_EXCEPTIONS_FILE` when set (the tests' seam).

`scripts/audit-exceptions.ts` (new): `parseExceptions(text, today, file)` returns the valid lines and one problem per failing line; `main(argv)` prints the ids on stdout and the warnings and errors on stderr.

## 4. Censuses

Consumers — `bun audit --audit-level=high` (bun 1.3.14), whole, before the change (ANSI codes removed; the first line is bun's own `.env` note):

```
[0.71ms] ".env"
bun audit v1.3.14 (0d9b296a)
picomatch  <=4.0.7
  vite › tinyglobby › fdir › picomatch
  vitest › tinyglobby › fdir › picomatch
  @lovable.dev/vite-tanstack-config › @tanstack/devtools-vite › picomatch
  @tanstack/react-start › @tanstack/start-plugin-core › picomatch
  @tanstack/router-plugin › @tanstack/router-utils › tinyglobby › fdir › picomatch
  typescript-eslint › @typescript-eslint/utils › @typescript-eslint/typescript-estree › tinyglobby › fdir › picomatch
  high: picomatch vulnerable to ReDoS through single-branch repeated extglobs - https://github.com/advisories/GHSA-fc5q-39xc-vjpf

1 vulnerabilities (1 high)
```

Affected and patched ranges — `bun audit --json`, the picomatch entry: `{"id":1247710,"url":"https://github.com/advisories/GHSA-fc5q-39xc-vjpf","severity":"high","vulnerable_versions":"<=4.0.7","cwe":["CWE-1333"],"cvss":{"score":7.5,…}}`. `gh api /advisories/GHSA-fc5q-39xc-vjpf` (a read): `published_at` 2026-10-19T18:32:12Z, `vulnerable_version_range` "<= 4.0.7", `first_patched_version` null. `bun info picomatch`: dist-tag `latest` 4.0.7; versions 1.0.0 … 2.3.2, 3.0.0 … 3.0.2, 4.0.0 … 4.0.7. The supervisor's `npm view picomatch dist-tags` (ruling 1) gives the same.

`bun audit --json` carries, per advisory, `id`, `url`, `title`, `severity`, `vulnerable_versions`, `cwe` and `cvss`; it carries no patched version.

Requirers of picomatch (`bun.lock` read, line numbers at base): `@tanstack/start-plugin-core` `^4.0.7` (:618), `@tanstack/devtools-vite` `^4.0.3` (:586), `tinyglobby` `^4.0.4` (:1208, and the nested 0.2.16 at :1416), `vite` `^4.0.5` (:1262), `vitest` `^4.0.3` (:1268), `unplugin` `^4.0.7` (:1244), `fdir` optional peer `^3 || ^4` (:906). Copies: top level 4.0.7 (:1088); 4.0.4 nested under `@tanstack/devtools-vite` (:1378), `tinyglobby` (:1442), `vitest` (:1448) and `@typescript-eslint/typescript-estree/tinyglobby` (:1538). `package.json` `overrides` has eleven entries (:119–:131); none for picomatch, none added.

Definition, tests, lists, old-file-readers, second-readers, chunk-graph, environments, first-download, callee-codes — CENSUS-ITEM each: not applicable — a build tool's dependency, no source file imports it (the supervisor's build of dev, `dist/`, contains no picomatch code: ruling 1).

Mechanisms: the audit gate `scripts/audit-gate.sh` (CI line 532 runs it); the overrides (not used: no patched version to point at); CF-LOCK-1 (`scripts/conformance/lockfile-hosts.test.ts`, 2 tests green; `bun.lock` unchanged). Every other place that runs an audit: `rg -n 'bun audit|npm audit|audit-gate|--ignore=' .github scripts package.json docs/features` — only `.github/workflows/ci.yml:532` calls the gate; no other audit call exists.

Queued: `rg -n 'picomatch' docs/governance roadmap.md` finds only this brief, its ruling, its stop report and roadmap line 3.

Premises: the brief's "the first version the advisory names as patched" was wrong (none exists) — stop 1; ruling 1 changed the form.

## 5. Tests

- Added `scripts/audit-gate.test.ts`, AGX-1 … AGX-10 (the prefix was unused: `rg -n '\b(AGX|AGE|AXC)-[0-9]'` found nothing; `scripts/test-ids.test.ts` TI-1 green in the scripts run). The gate runs as CI runs it, with a stand-in `bun audit` first on the PATH (it reports FAKE_ADVISORIES unless `--ignore=<id>` names them; every other `bun` call is the real one):
  - AGX-1 a valid line passes and becomes `--ignore=<id>`, with the warning naming advisory, expiry and DEC.
  - AGX-2 an expired line fails, naming `audit-exceptions.txt:2`, and `bun audit` is never called.
  - AGX-3 five malformed lines fail (three cells, a bad id, `02-12-2026`, no `until`, `2026-02-30`).
  - AGX-4 a line without a DEC fails (empty cell, `decided`, `INC-1194`).
  - AGX-5 an advisory that is not listed still fails (the listed one is not reported, the unlisted one is, and the gate's own error line is printed).
  - AGX-6 an empty list is the plain gate (no `--ignore`).
  - AGX-7 an expiry past the 14-day ceiling fails; the ceiling day and today pass.
  - AGX-8 a duplicate advisory fails by its line; the valid lines stand.
  - AGX-9 the committed list is valid today and holds exactly `GHSA-fc5q-39xc-vjpf`, DEC-405.
  - AGX-10 the gate names `scripts/audit-exceptions.ts` and `--ignore=`; `ci.yml` runs the gate.
- Wired (G55): `scripts/conformance/wired.test.ts` (the existing wiring test) now reads `audit-gate.test.ts` for AGX-10 and `audit-gate.sh` for `scripts/audit-exceptions.ts`; the test is discovered by `test:unit`'s `scripts/**/*.test.ts`. `scripts/audit-gate.sh` was already in the wired domain (every `scripts/*.sh`) and is named in `ci.yml`.
- Red-first on a planted bypass: with the gate's call to the module replaced by an unchecked `awk` of the ids (no validation), `bunx vitest run scripts/audit-gate.test.ts` gave `Tests  4 failed | 6 passed (10)` (AGX-1, AGX-2, AGX-3, AGX-4 red); with the gate restored from `git show HEAD:scripts/audit-gate.sh`, `cmp` equal, `Tests  10 passed (10)`. The mutant was never committed (`git status --short` empty after).
- The real gate against the live advisory service, from this computer: committed list → exit 0, "No high or critical advisories beyond the recorded exceptions."; an empty list → exit 1, the picomatch finding and "::error::High or critical vulnerabilities reported by 'bun audit'."; a list whose line expired on 2026-11-01 → exit 1, "::error::/tmp/exp.txt:1 expired (until 2026-11-01, today 2026-11-18)".
- `bun run typecheck`: pass (root and scripts projects). `bun run lint`: pass (`--max-warnings 0`). `bunx vitest run scripts --maxWorkers=2`: `Test Files  124 passed (124)`, `Tests  658 passed | 1 skipped (659)`. `bun run build`: exit 0. `bunx vitest run scripts/conformance/lockfile-hosts.test.ts`: 2 passed.
- `bun run checks` last line: `checks: 35 PASS · 0 FAIL · 26 NOT RUN · 477s`; fast line: `checks (fast): 26 PASS · 0 FAIL · 416s`. NOT RUN, each with the runner's reason: component-tests › Install dependencies, bundle-budget › Install dependencies (dependencies already installed; a package change is its own turn); secrets-scan (the pinned binary is linux/x64; this machine is darwin/arm64); dependency-audit › Install dependencies and › Audit, e2e-preflight (4 steps), e2e (6 steps), promote (4 steps), semgrep › Upload SARIF and › Warn (the advisory service, staging credentials, the browser lanes and GitHub-only steps are not reachable here). bundle-budget › the NEAR band: 0 NEAR.
- `bun scripts/brief/check-go.ts docs/governance/briefs/pkg-picomatch.md --at 143027fac`: `[check-go] no finding`.
- Browser tests: none added or changed; the E2E values were not used; CI is the proof.
- The J-audit line: not applicable (`e2e/**` unchanged: `git diff --name-only 385003bd1..HEAD` lists no `e2e/` path).
- First download: `scripts/**`, `docs/**` and `roadmap.md` only; no `src/`, `package.json` or `bun.lock` path changed; `bundle-budget › Check the first-paint budget` pass, 0 NEAR. A budget comparison base-to-tree was not run: no file a bundle reads changed.

## 6. K2 — siblings that bypass the mechanism

- The exception list is a second parser of G55's allowlist form: `scripts/conformance/kit.ts:99` (`readAllowlist`) reads three cells (`key | reason | until`, `until` a date or an INC/DEC) and fails stale lines through a census; the exception list has four cells (`id | reason | until YYYY-MM-DD | DEC-n`) because ruling 1 names that line, and is read by `scripts/audit-exceptions.ts`. Left as the ruling's form (not extended into `kit.ts`: out of scope). Raised as MINOR in §13.
- Greps: `rg -n 'bun audit|npm audit|audit-gate|--ignore=' .github scripts package.json docs/features`; `rg -l 'readAllowlist' scripts` (66 files read the three-cell form). No other audit caller exists; no other place ignores an advisory.

## 7. Allowlists and guards

- `scripts/conformance/*-allowlist.txt`: unchanged — no such path in `git diff --name-only 385003bd1..HEAD`; the one the brief names, `briefs-allowlist.txt`, is 6 lines (comments only) at the base (`git show 385003bd1:… | wc -l`) and in the tree (`wc -l`), nothing removed.
- New list: `scripts/audit-exceptions.txt`, one line (before: no file → after: 1 line): `GHSA-fc5q-39xc-vjpf | picomatch <= 4.0.7: ReDoS through single-branch repeated extglobs; no patched version; a build and test tool only, reading patterns the repository writes; not in the built app | until 2026-12-02 | DEC-405` — the ruling's text, character for character.
- Guards self-tested: the gate's list is its own guard; AGX-1 … AGX-10 above, proven on planted lines; the red-first mutation in §5.

## 8. Strings

None — FLAG `no-new-string`; no `src/i18n` file changed (`git diff --name-only 385003bd1..HEAD` lists none).

## 9. Migrations

None — FLAG `no-migration`; `git diff --name-only 385003bd1..HEAD` lists no `supabase/` path.

## 10. Departures

- STOP 1 (the premise): the brief's STEP 2 override needs a patched version; none exists. Stopped as the brief says; ruling 1 followed.
- Ruling 1 replaced STEP 2 (the override) by the exception list; the brief's "`package.json` (one `overrides` entry); `bun.lock`" scope is unused, and the scope was widened by the ruling to the gate, its test, the list, the parsing module, `wired.test.ts` and `docs/features/dependency-audit.md`. Ruling 1's words: "`package.json` and `bun.lock` stay unchanged."
- The brief's PR title ("The picomatch advisory: an override past GHSA-fc5q-39xc-vjpf") was kept for PR #65, as STEP 4 dictates; it no longer describes the change (an exception list, not an override). The PR body says so.
- Decide-and-name (ruling 1 item 2): the parsing is a small TypeScript module with its own tests (`scripts/audit-exceptions.ts`; tests inside `scripts/audit-gate.test.ts`, no separate test file) because the line checks (calendar days, ceiling, duplicates) are clearer there than in shell.
- Decide-and-name (not in the ruling's list of failures, taken from its DEC text "an expiry of at most 14 days"): a line whose date is more than 14 days after the day the gate runs fails (AGX-7); the ceiling day passes. A duplicate advisory also fails (AGX-8).
- The line's third cell is `until YYYY-MM-DD` with the word `until`, as the ruling writes it; `scripts/audit-exceptions.ts` reads that form, not `kit.ts:readAllowlist`'s (§6).
- Test seam: `AUDIT_EXCEPTIONS_FILE` names another list (used by AGX-1 … AGX-6 only; CI never sets it). No seam changes "today": the date is the real UTC date.
- Base: the brief says `dev 143027fac`; `origin/dev` was `385003bd1` at the start (the merge of PR #63). `git diff --name-only 143027fac..385003bd1` named seven files, none in this lane's scope, so the lane went on (rule 00 step 1).
- Rule 00 step 2 says to save a brief inside a fenced block; this brief and the operator's request say byte for byte with the stated sha256, so the plain file was saved (a fence would change the hash). Ruling 1 was saved the same way.
- The roadmap's line 3 names the brief only (`pkg-picomatch.md`), not the ruling; the ruling's tick, the DEC and INC are in §14.
- `git switch -c` in the sandbox printed "could not write config file .git/config: Operation not permitted" (the branch was created; the push with `-u` later set its upstream normally, so the `HEAD:` fallback was not used).

## 11. CI

The base's CI (root `ci-status.md` on `ci-evidence`, read after fetching; two-step check: conclusion, then the commit equals the base I started from, `385003bd1`):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `385003bd17b2806092bcab92b4b589ea308a4156` (short `385003b`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-18T00:23:51Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44204012123
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-9b4d78829ee5… (1 read)
```

The base's only red job is "Dependency vulnerability audit (enforcing on high/critical)" (`guards-last-failure.md`: "High or critical vulnerabilities reported by 'bun audit'."): the advisory this turn holds by DEC-405. Every other job on it is success.

This pull request's runs (PR #65, `gh run list --branch cursor/pkg-picomatch`):

- Run 44280551332 on `c2dd28604` (the stop commit, no package change, pushed at the stop): failure — three jobs. (1) "Dependency vulnerability audit": class (c), expected — the stop's state, no exception existed; fixed by `7751baef7`. (2) "E2E lanes / Lane webkit": class (b), infrastructure — `e2e-last-failure.md` for that run: "1 lane(s) died before any test at install-chromium-s-system-libraries — ci-deadline: bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1"; 2476 tests passed, 0 failed in the other lanes. (3) "E2E (Playwright, ethio-staging)" (the merged verdict): follows from (2). No re-run (rule 40: a newer push superseded it).
- Run 44285456312 on `7751baef7` (my last code commit): **success** — `gh pr checks 65`: 43 pass, 1 skipping (Promote to main, which runs only on `dev`), 0 failing. "Dependency vulnerability audit (enforcing on high/critical)": pass (15 s). Lane evidence `branches/cursor/pkg-picomatch/ci-status.md` (two-step check: **SUCCESS**; its commit is `7751baef7287a98203fcf814a13d2d6385e27ecb`, equal to my last code commit): Completed 2026-11-18T10:46:12Z, run https://github.com/tesfayekb/ethio-marketplace/actions/runs/44285456312.
- That run's flaky test (DEC-030, non-gating, passed on retry): `mobile-360` · one-line-slots.spec.ts › OLS-4 (source shard 8). `flake-ledger.md` has one OLS-4 line (2026-11-18): below the three-in-seven-days bar; named in §13.
- No earlier turn's red was fixed in this turn beyond the one above.

## 12. Limits

- `bun audit` reads the advisory service live; the run that judges is CI's `dependency-audit` job on this lane. The local run (§5) is from this computer on 2026-11-18, not CI's.
- Item 3 of ruling 1 ("A patch ends the exception early, where the tool can tell"): `bun audit --json` reports no patched version (§4) and so the gate cannot end a line when a patch appears; the expiry alone governs. A patched picomatch would not be noticed by the gate before 2026-12-02; the package turn that applies it must remove the line.
- The exception list is judged against the day the gate runs: AGX-9 (the committed list is valid today) will fail on every lane from 2026-12-03 unless the line is removed or renewed by a new DEC — as the gate's own job will.
- Not run here: the browser lanes, e2e-preflight, gitleaks (a linux/x64 binary), the SARIF upload, promote, and `bun install` (dependencies installed; nothing changed); CI judges them.
- CI logs: the lane's `ci-status.md`, `guards-last-failure.md` and the history of `e2e-last-failure.md` on `ci-evidence` were read, and run 44280551332's failed-job summary through `gh run view`; the individual job logs of run 44285456312 were not opened (it is green).
- The `[ssr-error]` count lines: not applicable, no browser run.

## 13. Findings

- MINOR — `scripts/conformance/kit.ts:99` (`readAllowlist`) and `scripts/audit-exceptions.ts:44` (`parseExceptions`) are two parsers of one list form (three cells there, four here). A later turn could give the exception list the kit's `key | reason | until` form with the DEC in the reason, or extend `readAllowlist` by a cell count, so one reader serves both (K1). Not done: the ruling names the line.
- MINOR — `scripts/audit-gate.sh:19` writes the audit output to the fixed path `/tmp/audit.txt` (DEC-035); two gates on one machine at once would share it. Not changed (outside the ruling's list). The gate tests (AGX-1 … AGX-6) run serially in one file, so they do not collide with each other.
- MINOR (a test, not this turn's) — one-line-slots.spec.ts › OLS-4 (`mobile-360`, shard 8) failed once and passed on retry in run 44285456312 ("the switcher lists the public languages": expected "en", received an empty list); one line in `flake-ledger.md`. Not touched (outside scope; below the ledger's bar).
- None other: `rg -n 'bun audit|npm audit|audit-gate' .github scripts package.json` finds one caller (`ci.yml:532`); `rg -n ' as unknown as|: any|@ts-' scripts/audit-exceptions.ts scripts/audit-gate.test.ts` finds nothing.

## 14. Records

DEC — DEC-405 (the operator, 2026-11-18): GHSA-fc5q-39xc-vjpf (picomatch <= 4.0.7, ReDoS through single-branch repeated extglobs; no patched version published) is a recorded audit exception until 2026-12-02 — picomatch is a build and test tool only, reading patterns the repository writes, and is not in the built app; the exception list `scripts/audit-exceptions.txt` is the mechanism: one line per advisory, its reason, an expiry of at most 14 days and its DEC; an expired, malformed or undecided line fails the gate; renewed only by a new DEC; removed in the package turn that applies the patch.

INC — INC-1194: the dependency audit turned red on every branch on 2026-11-17 on GHSA-fc5q-39xc-vjpf, for which no patched picomatch exists; held by DEC-405's exception until 2026-12-02; closed when the patch is applied.

register row — the audit exception list: concern "an advisory the dependency gate does not fail on is a recorded, expiring decision"; mechanism `scripts/audit-exceptions.txt` read by `scripts/audit-exceptions.ts`, called by `scripts/audit-gate.sh`; guard `scripts/audit-gate.test.ts` (AGX-1 … AGX-10), wired in `scripts/conformance/wired.test.ts`; feature doc `docs/features/dependency-audit.md`.

changelog — Dependency audit: the gate reads `scripts/audit-exceptions.txt`, one line per advisory with its reason, expiry (at most 14 days) and DEC; GHSA-fc5q-39xc-vjpf (picomatch, no patch) is held until 2026-12-02 (DEC-405).

roadmap — the brief in force on line 3 names `docs/governance/briefs/pkg-picomatch.md`; a tick for the picomatch advisory's exception (DEC-405), and the package turn that applies the patch and removes the line by 2026-12-02.

slip — none.
