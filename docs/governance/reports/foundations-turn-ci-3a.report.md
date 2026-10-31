# Foundations turn CI-3a — report

**CI line: bc2e2ba5, SUCCESS** (run 41166607542, 04:19Z, as the ruling states; main moved up to it). No red to fix first.

## Step 0

`docs/governance/briefs/foundations-turn-ci-3a.md` is saved as one fenced block. The sha256 of the ruling text (BEGIN to END, with its final newline) is `111b7a08281e5dda8b7c4ffe4d492e072bb0daeb6f836e0093d4349608300681`, which equals the value after END. Roadmap line 3 names the brief, and a new open line records CI-3b (DEC-310) and the authenticated comparison (B(d)). `prettier --check roadmap.md` passes.

## A — DEC-309: the backend images once per run

### Census (every job that runs `supabase start`)

| job | before | after |
| --- | --- | --- |
| `.github/workflows/local-backend-proof.yml` `proof`, all 19 matrix lanes (smoke, email, 1–16, repeat); the start is at :475 at febe6922 | one `supabase start` per lane; the CLI pulls every image itself; no pull step, no retry | `needs: backend-images`. The steps "Restore the backend images (DEC-309)" (exact key) and "Load the backend images (DEC-309)" (`docker load`, then `docker image inspect` of every name, and on a miss `pull-images.sh`) run before the one start, which now reads `-x "$BACKEND_EXCLUDES"` |
| `backend-images` (new, the mechanism itself) | — | its start runs on an empty working copy with no migration, so there is nothing to replay. CF-CI-IMG-1 exempts it by definition |

There is no other caller. ci.yml's `e2e-lanes` calls this workflow, and no nightly or other workflow runs `supabase start` (rg over `.github/workflows`).

### The cache key

`backend-images-<SUPABASE_CLI_VERSION>-<first 16 hex of sha256 over scripts/ci/local-backend-config.toml + BACKEND_EXCLUDES + SUPABASE_CLI_VERSION>`.
- The CI-local config used to be a heredoc in the workflow. It is now one file that the lanes copy and the key hashes.
- The excludes are one workflow-level env, `BACKEND_EXCLUDES`, read by the lanes' start and by the key.
- A second, small entry `<key>-list` holds images.txt, size.txt and ghcr.txt, so a cache hit gives the list without downloading the tarball. The cache is the only copy: there is no run artifact.

### Tarball size

Measured by the first run; it is printed in the `backend-images` job's summary and log. If it is over 4 GiB compressed, the job does not save it and raises `::error::`. That case would then be the STOP the ruling names.

### The replay's cause (item 4)

Correction (CI-3b ruling, 2026-10-31): `refused:replay` is job_run_claim's refusal at CL-1's first claim (20261029073342 :49/:212), not a second migration run; pulls and migrations overlap. DEC-309 counts registry refusals at pull/start, but a migration failure with every image local is its own finding, not counted against that rule.

**Not determinable from the evidence I can read.**
- ci-evidence keeps only the latest local-backend-proof.md and local-backend-last-failure.md. The start logs of aed7904b lane 5, d2e9bb36 lane 2, e195034e lane 3 and b3e8dba2 lane 3 are no longer on the evidence branch.
- The rules forbid a git fetch of it, and the Actions job logs need a credential I do not hold.
- What the retained text shows (the supervisor's reading in the plan request): pull refusals are followed, in the same `supabase start`, by an error inside a migration ("refused:replay" in 20261029073342's INC-970 proof; a deadlock on d2e9bb36). The workflow never retries the start (INC-944). So the second run of the migrations came from inside the CLI's own start, not from our steps. This turn did not prove whether that was a retry around a failed pull or something else.
- DEC-309 records it as **unconfirmed**. The records turn can confirm it from the four runs' job logs.
- In the ruling's words: **"impossible by construction" holds only for the path where every image is local before the start.** That is the cache path, or a pull that succeeded through pull-images.sh. With every image local, the CLI has nothing to pull and so nothing to retry. Any other cause of a replay is outside what this turn proves.

### CF-CI-IMG-1 (`scripts/conformance/ci-images.test.ts`)

Definition, over every workflow file: a job that runs `supabase start` (other than `backend-images`) must:
1. need `backend-images`;
2. have, in an earlier step, `docker load` and `docker image inspect`;
3. run `supabase start` exactly once, and never inside `for`/`until`/`while`.

Planted cases:
- CF-CI-IMG-2: no load step → "starts the backend before loading and inspecting its images".
- CF-CI-IMG-3: a start inside `until` and inside `for` → "retries supabase start in a loop".
- CF-CI-IMG-4: no `needs` → named; two starts → named; the kept shape → no finding.

The workflow reader moved from ci-deadlines.test.ts to `scripts/conformance/workflow-reader.ts`, one reader for both guards (K1). wired.test.ts's domain covers `workflow-reader.ts` (named by both tests) and `pull-images.sh` (named in the workflow and its test). Neither needed a new line in wired.test.ts.

Changed under G38: CF-CID-3 (`ci-deadlines.test.ts`). Old: the four ports read from the workflow's config heredoc. New: the same four-port assertion, read from `scripts/ci/local-backend-config.toml`.

### pull-images.sh tests (PIM-1…4, stubbed docker)

- PIM-1: an image already present is not pulled.
- PIM-2: the waits are 5, 15 and 45 s, each within ×[0.7, 1.3].
- PIM-3: the 4th failure gives exit 3 and "registry refusal — infrastructure", with no 5th try.
- PIM-4: a missing list is exit 2.

### The frozen rule (kept as ruled)

- Count over the next 10 completed dev runs, matching `toomanyrequests|rate exceeded|pull access denied`: 0 → keep; 1 or more → the fallback, in its own turn.
- Any "refused:replay" from a start is a DEC-309 defect.
- The fallback's facts: on a miss, the job's summary lists `ghcr=yes|no` per image.
- The cache-hit count is for information only. The lane evidence line `Backend images (DEC-309): cache|pull — <names>` gives it.

### Limit

If the `backend-images` job itself fails, every lane fails "registry refusal — infrastructure (no image list from backend-images)" before its start. The job's own learning start is tried 3 times with a jittered pause, and it runs on an empty copy, so a retry there replays nothing. actionlint is not in the sandbox's toolchain, so it was not run; CI's pinned actionlint step judges the workflow.

## C — DEC-311: the fast line

`fastFirst` puts every step of `bundle-budget` and `semgrep` in the slow set. It does the same for every step from a job's first `bun run build` on, which is build-and-check's Build and Bundle report. Every other step is fast and runs first, in ci.yml's order:
- build-and-check up to Root route names, with Typecheck, Format and Lint;
- component-tests (the unit suite);
- secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight and dependency-audit;
- the jobs the allowlist marks NOT RUN.

The line `checks (fast): N PASS · N FAIL · Ns — <jobs>; slow steps follow (build, budget, semgrep)` is printed before the first slow step. The final `checks: …` line is unchanged and is the only verdict.

Tests:
- TC-E1: no step is dropped, each job's order is unchanged, no build is fast, the unit suite is fast and the budget is slow.
- TC-E2: the fast line never begins `checks:`, and a fast FAIL is counted in the final line.

## Unit count and checks

See the last section, added after `bun run checks`.

## K2

- B (DEC-310) is not built: there are still two lists for the public surface. It comes in CI-3b, which has a roadmap line.
- The authenticated comparison (B(d)) has a roadmap line.
- No other workflow pulls the backend images.
- scripts/check-outbound-calls.ts still reads the workflow and its `.ci-local/supabase/config.toml` copy. It is unaffected, because the copy is made from the one file.

## git diff --name-only febe6922

```
.github/workflows/local-backend-proof.yml
docs/_changelog.md
docs/features/ci-local-backend.md
docs/governance/briefs/foundations-turn-ci-3a.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-ci-3a.report.md
roadmap.md
scripts/ci/local-backend-config.toml
scripts/ci/pull-images.sh
scripts/ci/pull-images.test.ts
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts
scripts/conformance/ci-deadlines.test.ts
scripts/conformance/ci-images.test.ts
scripts/conformance/workflow-reader.ts
```

## Checks

checks: not finished — CI judges (replaced below if the run completes).
