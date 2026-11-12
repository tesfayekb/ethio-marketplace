# The lockfile turn — the lockfile's addresses become the public registry's, one lock-exact install everywhere — report

Base: 2b11a9d29 (dev; the lane `cursor/housekeeping` began this turn at e1f174d76) · Final commit: 7c97c921c · Brief: docs/governance/briefs/lockfile.md (sha256 d347ef51eb4baeb12d02c30d63709d1d2c64774780fe03f64c360e6c302ed3d6) · Ruling 1: docs/governance/briefs/lockfile-ruling-1.md (sha256 109df556b7191e21477ad976da3f324edd01238a12fabd647972d996f1f79091)
Review: READY · 0 BLOCKER · 0 MAJOR · 0 MINOR · on 7c97c92

CI: the lane head the turn found, e1f174d76 — run 42867207229, SUCCESS. Stop 1's push, ce792c92c —
run 42875700760, SUCCESS. The code commit 7c97c921c — run 42947663641, SUCCESS (41 checks green, 1
skipped: "Promote to main", which runs only on dev). `origin/dev` stayed at 2b11a9d29 throughout.

## 1. Done / not done, by part and step

| Step | What | State | Commit |
| --- | --- | --- | --- |
| 0 | lane fast-forwarded (already at e1f174d76), tree clean; brief saved by scripted copy (fenced text sha256 equal); roadmap line 3; CI read | done | afb049f43 |
| 0 (ruling 1, point 2) | housekeeping-1b's two stale brief-law allowance lines removed | done | feb9012ec |
| 1 | census (a)–(g); one premise failed (the install consumers) → stop 1 | done | ce792c92c (stop report) |
| — | ruling 1 saved by scripted copy (sha256 equal to the carrier's) | done | 7c97c921c |
| 2 | rewrite by the brief's `sed`; host-only assertion; empty-cache frozen install | done | 7c97c921c |
| 3 | CF-LOCK-1, CF-LOCK-2 (red-first), the empty allowlist, the wired line; the laws | done | 7c97c921c |
| 4 | typecheck, lint, THE CHECKS, the budget | done | — |
| 5 | one code push; `gh pr checks 34 --watch` → every check green on 7c97c921c | done | — |
| 6 | this report | done | this commit |

Not done: nothing. The pull request stays a draft (the brief).

## 2. Files changed

This turn's own diff, `git diff --name-only e1f174d76..HEAD` (the lane's head when the task was
saved; the pull request's diff against dev also carries housekeeping turns 1 and 1b — `git diff
--name-only 2b11a9d29..HEAD` names 163 paths), 10 paths, and this report:

```
bun.lock
docs/features/ci-guards.md
docs/governance/briefs/lockfile-ruling-1.md
docs/governance/briefs/lockfile.md
docs/governance/reports/lockfile.stop-1.md
roadmap.md
scripts/conformance/briefs-allowlist.txt
scripts/conformance/lockfile-hosts-allowlist.txt
scripts/conformance/lockfile-hosts.test.ts
scripts/conformance/wired.test.ts
```

New files, `git ls-files` proof: `docs/governance/briefs/lockfile-ruling-1.md`,
`docs/governance/briefs/lockfile.md`, `docs/governance/reports/lockfile.stop-1.md`,
`scripts/conformance/lockfile-hosts-allowlist.txt`, `scripts/conformance/lockfile-hosts.test.ts` —
each printed by `git ls-files <path>` at 7c97c921c. Every path is in SCOPE (`bun.lock`,
`scripts/conformance/`, `docs/features/`, the brief, ruling and reports, roadmap line 3) or the
standing allowance (`scripts/conformance/*-allowlist.txt`). Nothing under `.github/`,
`package.json`, `bunfig.toml`, `src/` or `e2e/`.

## 3. Behaviour contract — answer tables before → after

No route, door, screen or app function changes (no file under `src/`). The one changed record is
what `bun install --frozen-lockfile` reads:

| `bun.lock` | before (HEAD:bun.lock at e1f174d76) | after (7c97c921c) |
| --- | --- | --- |
| lines | 1661 | 1661 |
| URL hosts | 652 `europe-west1-npm.pkg.dev`, 123 `europe-west4-npm.pkg.dev` (both `…/lovable-core-prod/sandbox-npm-cache/`) | 775 `registry.npmjs.org` |
| package versions | — | byte-identical (only the host prefix differs on the 775 changed lines) |
| `sha512-` integrity values | 775 | the same 775, byte-identical |
| sha256 of the file | `2e5bdaf2c387938ae22e23d1ebb87f99f051dd312d49ca3a066c913f2748d767` | `a6221d8c64148482e946de59ec9b739181c0cc63a6bddd5a5a1e7dcd72548b2d` |
| CI install | 24 install steps green (run 42867207229) | 24 install steps green (run 42947663641) |

The first-download table is unchanged (§5): the same bytes are installed, so the same build is made.

## 4. Censuses

The census of STEP 1 is stop 1's (`docs/governance/reports/lockfile.stop-1.md`), as ruling 1 point
1 accepted it; in short:

- (a) `grep -o 'https://[^/"]*' bun.lock | sort | uniq -c` → 652 `https://europe-west1-npm.pkg.dev`,
  123 `https://europe-west4-npm.pkg.dev`; 775 lines carry a URL, one each, 775 package entries; URL
  lines without `sha512-`: 0; no `http://`; no other integrity kind; every path after the prefix is
  `<name>/-/<file>.tgz`. The premise held.
- (b) `rg -n "bun install"` over the tree — the premise FAILED and ruling 1 corrected the brief:
  `ci.yml` has FIVE install steps on a pull request (:119 build-and-check, :164 component-tests,
  :349 bundle-budget, :452 dependency-audit, :493 e2e-preflight); `local-backend-proof.yml` has ONE
  (:235, the `proof` matrix job, once per lane — 19 lanes); off a pull request: `feed-bench.yml:47`,
  `flake-check.yml:74`, `guard-proof.yml:36`, `nightly-e2e.yml:94` and `:357`; outside workflows:
  `.cursor/environment.json:2`, `.claude/hooks/session-setup.ts:14`; `scripts/db-proof.sh` runs no
  install.
- (c) one HEAD request per rewritten URL (`/tmp/ethio-scratch/lockfile/head-check.ts`, bun's
  `fetch`): `urls: 775`, `200: 775`. The premise held.
- (d) `bunfig.toml` `[install]`: `saveTextLockfile = true`, `minimumReleaseAge = 86400`,
  `minimumReleaseAgeExcludes` (six `@lovable.dev/*` names); no registry named; no `.npmrc`. The
  premise held.
- (e) `rg -n "bun install|lockfile|bun\.lock" docs/features`: `ci-guards.md:12`, `:343`,
  `executor.md:28`, `dependency-audit.md` history lines; none names a host. The page:
  `docs/features/ci-guards.md` gains a "DEC-363" section (the census guards' sections close the file).
- (f) `rg "CF-LOCK-[0-9]" scripts e2e src` → none before this turn (exit 1).
- (g) findings: §13.

## 5. Tests

New: `scripts/conformance/lockfile-hosts.test.ts`.

- CF-LOCK-1 "every URL in bun.lock is on registry.npmjs.org or an allowlisted host" — reads every
  `<scheme>://<host>` in `bun.lock` (a `git+https://` form included) and fails on a host other than
  `registry.npmjs.org`, or a scheme other than `https`, unless the host has a line in
  `lockfile-hosts-allowlist.txt` (kit grammar: stale or expired lines fail).
  Red-first: with `bun.lock` written from `git show HEAD:bun.lock` (sha256 `2e5bdaf2…d767`, before
  the commit), `[lockfile-hosts] urls: 775, findings: 775` and `× CF-LOCK-1 …` (the first line of
  the failure `bun.lock:1000 https://europe-west4-np…`); with the rewritten file restored (sha256
  `a6221d8c…8b2d`), `Tests  2 passed (2)`.
- CF-LOCK-2 "a planted private-cache URL fails by its line; a registry URL passes" — a planted
  lockfile with a registry URL (line 4), a private-cache URL (line 5) and an `http://` registry URL
  (line 6): findings exactly `[5, europe-west1-npm.pkg.dev]`, `[6, registry.npmjs.org]`; a bare
  registry URL gives none.
- `scripts/conformance/wired.test.ts` CF-WIRED-1 gains the discovery line naming `CF-LOCK-2`.

The empty-cache install (STEP 2). `bun install --frozen-lockfile` with an empty cache, in
`/tmp/ethio-scratch/lockfile/proof-2/` holding `package.json`, `bunfig.toml` and the rewritten
`bun.lock` (sha256 equal to the worktree's), `BUN_INSTALL_CACHE_DIR` a new directory with 0 entries:
exit 0, `537 packages installed [20.76s]`, 620 cache entries after, the lockfile's sha256 unchanged.
In the worktree after the commit: `bun install --frozen-lockfile` → `Checked 607 installs across
700 packages (no changes)`, and `git status --short bun.lock` printed nothing. A plain
`bun install` (not frozen) in the scratch copy also left the file byte-identical (no changes, 775
`registry.npmjs.org` URLs).

The host-only assertion (`/tmp/ethio-scratch/lockfile/host-only-diff.ts`, base against the
committed file):

```
lines: 1661 → 1661
changed lines: 775
changed lines host-only: 775
sha512 values byte-identical on changed lines: 775
private-cache URLs left: 0
```

`git diff --stat` on the commit: `bun.lock | 1550`, `775 insertions(+), 775 deletions(-)`.

Totals: `bunx vitest run scripts --maxWorkers=2` → `Test Files  101 passed (101)`, `Tests  515
passed | 1 skipped (516)`. `bun run typecheck` exit 0; `bun run lint` exit 0. THE CHECKS
(the full unit suite runs in its component-tests step):

```
checks (fast): 25 PASS · 0 FAIL · 371s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)
checks: 34 PASS · 0 FAIL · 24 NOT RUN · 428s
```

NOT RUN (24): build-and-check › Workflow lint (actionlint is pinned linux/x64; this machine is
darwin/arm64) · build-and-check, component-tests and bundle-budget › Install dependencies (already
installed) · build-and-check › Typecheck (the runner reads the platform's harness log; run by hand
above, exit 0) · secrets-scan › gitleaks (pinned linux/x64) · dependency-audit › Install
dependencies and Audit (the advisory service is not reachable here) · e2e-preflight's four steps
(staging credentials) · e2e's six steps (the lanes' artifacts) · promote's four steps (CI only) ·
semgrep › Upload SARIF and its warning (GitHub only). Each of those ran green in CI on 7c97c921c.

The budget, `node scripts/check-bundle-size.mjs` on the checks' build: `JS: 206.0 KiB / 207 KiB —
ok`, `CSS: 23.1 KiB / 40 KiB — ok`, last line `Bundle budget OK.`; the NEAR band step: 0 NEAR. The
50 pages' `size / ceiling` lines compared by script with housekeeping-1b's table (its "after" column
and new ceiling): `diff` empty — identical, page for page, and the entry's JS equals 1b's 206.0 KiB.

No browser test: no spec or screen changed (the brief names none); CI's 19 lanes ran every spec.

## 6. K2 — siblings that bypass the mechanism

`rg -l "sandbox-npm-cache|npm\.pkg\.dev" --hidden` (node_modules and .git aside): only records and
history (`docs/tracking/incidental-findings.md`, two handoffs, this turn's brief and stop report)
and this turn's own planted line in `lockfile-hosts.test.ts`. `rg -n
"registry\s*=|registry\":|NPM_CONFIG_REGISTRY|BUN_CONFIG_REGISTRY"` (bun.lock and docs aside): none.
No `.npmrc`. No code or configuration sibling names a registry or the cache.

## 7. Allowlists and guards

- `scripts/conformance/briefs-allowlist.txt`: 2 → 0 lines (the two housekeeping-1b lines, stale once
  line 3 left that brief; ruling 1 point 2).
- `scripts/conformance/lockfile-hosts-allowlist.txt`: new, 0 lines (header only; empty at birth).
- Guard self-tests run: CF-LOCK-2 (planted lockfile); CF-WIRED-1 names the new test; CF-BRIEF-1…4
  green on the brief and ruling 1.

## 8. Strings

None (FLAGS no-new-string; no file under `src/i18n/`).

## 9. Migrations

None (FLAGS no-migration).

## 10. Departures

- Stop 1 and ruling 1: census (b) found five `ci.yml` install steps and one per lane, not "three"
  and "two"; ruling 1 point 1 amended DEC-363's judge to every install step, and §14 carries the
  amended text.
- Ruling 1 point 2: "The two stale brief-law allowance lines: removing them was right and is the
  standing form — a brief's allowance lines expire when roadmap line 3 leaves that brief" (feb9012ec).
- The code commit's subject is `lockfile: the lockfile's addresses are the public registry's
  (DEC-363)`, not the brief's `…; CF-LOCK-1`: the brief's subject is 81 characters, and rule 00 step
  4 holds a subject to 72; CF-LOCK-1 is named in the commit's body.
- The empty-cache install ran in a scratch copy (`/tmp/ethio-scratch/lockfile/proof-2/`) of
  `package.json`, `bunfig.toml` and the committed `bun.lock` bytes: in the worktree, the installed
  `node_modules` lets bun skip every fetch, so an empty cache there proves nothing; the worktree's own
  frozen install is reported beside it (§5).
- The HEAD requests of census (c) ran from a bun script (`fetch`, method HEAD), because rule 50
  forbids `curl`.
- THE CHECKS ran with `TURN_BASE=2b11a9d29` in the environment — the same base line 3's brief names,
  so nothing read differently; a feature lane needs no such setting.
- Scratch files, the operator's to remove: `/tmp/ethio-scratch/lockfile/` (the two scripts, the
  base and rewritten lockfiles, the two install proofs with their caches, the logs).

## 11. CI

The base's CI (`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`, read at STEP 0):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `e1f174d7635fedd764a52817710b4a9af5200e6f` (short `e1f174d`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-10T18:02:27Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42867207229
```

Two-step check: the commit is the lane head the turn found; SUCCESS. Read again after the code
push: `7c97c921ce3916bce5a139f9f49a101bf9e2e990`, SUCCESS, completed 2026-11-11T03:03:19Z, run
42947663641; `e2e-last-failure.md` "last E2E run 42947663641 passed"; `guards-last-failure.md` "No
failed build/guard jobs in this run". `gh pr checks 34` on 7c97c921c: 41 SUCCESS, 1 SKIPPED
(Promote to main). No red in this turn; no re-run. Flake ledger: 8 lines in the last seven days, no
test at three.

Install seconds (each step's completedAt − startedAt from `gh run view <run> --json jobs`), before
(run 42867207229) → after (run 42947663641), the six steps ruling 1 names:

| Step | before | after |
| --- | --- | --- |
| ci.yml:119 build-and-check › Install dependencies | 11 | 2 |
| ci.yml:164 component-tests › Install dependencies | 10 | 2 |
| ci.yml:349 bundle-budget › Install dependencies | 10 | 2 |
| ci.yml:452 dependency-audit › Install dependencies | 10 | 2 |
| ci.yml:493 e2e-preflight › Install dependencies | 1 | 0 |
| local-backend-proof.yml:235, lane 1 › Install dependencies | 1 | 1 |

The four `ci.yml` jobs without a bun cache fetched every tarball from the lockfile's addresses
(build-and-check's log: `542 packages installed [1.95s]`). e2e-preflight and the lanes cache bun's
install on `bun.lock`'s hash: after the rewrite the exact key missed (`bun cache-hit=false`) and an
older cache was restored by its prefix (`542 packages installed [738.00ms]` in e2e-preflight,
`[744.00ms]` in lane 1). Every lane, before → after: 1–9 1 → 1; 10 0 → 0; 11 1 → 4; 12 1 → 1; 13 3 →
1; 14–16 1 → 1; email 1 → 1; repeat 1 → 1; smoke 1 → 3. All 24 install steps succeeded in both runs.

## 12. Limits

- The other workflows that install from the lockfile (nightly-e2e ×2, flake-check, guard-proof,
  feed-bench) have not run on the new lockfile; ruling 1 judges each the first time it runs after
  the merge. `.cursor/environment.json`'s cloud setup was not run.
- The supervisor's install is not mine to measure; the HEAD census and the empty-cache installs were
  run from this machine (macOS arm64, bun 1.3.14) and CI's Linux runners.
- The lanes and e2e-preflight restored an older bun cache by prefix, so in those jobs not every
  tarball was fetched afresh; the four uncached `ci.yml` jobs and the scratch empty-cache install
  were full fetches.
- A newly added package's lockfile form (a full URL or bun's own default) was not measured — no
  package may be added in this turn; CF-LOCK-1 refuses any host but the registry either way.
- gitleaks, actionlint and the dependency audit did not run locally (§5); CI ran them green.

## 13. Findings

- Two copies of rolldown in the build toolchain (ruling 1 point 3: a finding for a package turn,
  G42; nothing changed): `bun.lock:1150` `rolldown@1.1.0` (hoisted; for `nitro@3.0.260603-beta`'s
  `"rolldown": "^1.0.3"` at :1054 and `unplugin@3.4.0`'s `"rolldown": "*"` at :1244) beside
  `bun.lock:1446` `vite/rolldown@1.1.5` (for `vite@8.1.6`'s `"rolldown": "~1.1.5"` at :1262), each
  with its own set of native bindings (e.g. `@rolldown/binding-darwin-arm64@1.1.0` at :450). Not a
  broken range; a duplicate install and build-time download.
- INC-420 (`docs/tracking/incidental-findings.md:3190`, 2026-10-04: 188 private-cache entries, the
  supervisor's installs not lock-exact) is closed by this turn; its status line is in §14.

## 14. Records

DEC — DEC-363 (the supervisor, 2026-11-10 13:4x New York, under G17 and G42 — a lockfile change in its own turn; the operator's directive of 2026-11-10 that every recurring cause gets a fundamental fix; INC-420's class) — `bun.lock`'s tarball addresses are the public registry's (`https://registry.npmjs.org/<name>/-/<file>`), never a private cache's; the 775 entries that pointed at Lovable's sandbox cache (`europe-west1-npm.pkg.dev`, `europe-west4-npm.pkg.dev`) are rewritten by script with every version and every `sha512-` integrity value byte-identical, so what is installed does not change and bun's integrity check is the proof; `scripts/conformance/lockfile-hosts.test.ts` (CF-LOCK-1) refuses any other host without a reasoned, expiring allowlist line. Why: the supervisor's environment cannot reach the private cache, so its installs were never lock-exact (INC-420) and its GOs were grounded by reading rather than by running — the root cause of the wrong premises of housekeeping turns 1 and 1b (S562, S565, S573); one install everywhere removes the class. Frozen judge: adopted when `bun install --frozen-lockfile` from an empty cache succeeds on the executor's machine and in EVERY install step of this pull request's run — ci.yml's five and local-backend-proof.yml's one in each lane [run 42947663641; the five ci.yml steps' seconds before → after: 11 → 2, 10 → 2, 10 → 2, 10 → 2, 1 → 0 (×5: build-and-check, component-tests, bundle-budget, dependency-audit, e2e-preflight); one lane's: 1 → 1 (lane 1)] — the lockfile diff is host-only on 775 lines, and CF-LOCK-1 is green; the other workflows (nightly, flake-check, guard-proof, feed-bench) are judged the first time each runs after the merge; reverted (the one commit) if any install fails on a tarball or an integrity mismatch.

INC — INC-420 — status line: FIXED in the lockfile turn (DEC-363) — every one of `bun.lock`'s 775
tarball addresses is now `https://registry.npmjs.org/…`, rewritten by script with every version and
`sha512-` value byte-identical; `bun install --frozen-lockfile` from an empty cache succeeded on the
executor's machine and in all 24 install steps of run 42947663641; CF-LOCK-1
(`scripts/conformance/lockfile-hosts.test.ts`) refuses any other host; CLOSED on 7c97c921c once
merged.

register row — "one install everywhere" → bun.lock (public addresses) → CF-LOCK-1 → exceptions:
lockfile-hosts-allowlist.txt (empty).

changelog — 2026-11-10 — the lockfile turn (pull request #34): `bun.lock`'s 775 tarball addresses
move from a platform's private npm cache to the public registry (`https://registry.npmjs.org/`),
host only — every version and integrity value byte-identical — so every `bun install
--frozen-lockfile` (the executor's, CI's, the supervisor's) is the same lock-exact install;
`scripts/conformance/lockfile-hosts.test.ts` CF-LOCK-1 refuses any other host (allowlist
`lockfile-hosts-allowlist.txt`, empty) and CF-LOCK-2 proves it on a planted lockfile (DEC-363,
INC-420).

Knowledge v3.13 — "bun.lock's addresses are the public registry's (DEC-363); do not let the platform's install rewrite them — CF-LOCK-1 fails CI on any other host".

roadmap — line 23 (The housekeeping turn): the lockfile turn done (DEC-363, CF-LOCK-1; INC-420
closed) — one lock-exact install everywhere, the precondition of housekeeping turn 2's GO checker
(R2). Next on the lane: housekeeping turns 2 → 4.

slip — S575 (the supervisor; recorded by ruling 1 itself): "a count in a GO from a truncated read" —
the brief's three install steps of five.
