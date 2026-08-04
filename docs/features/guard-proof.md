# Guard proof (mutation fixtures)

## Why this exists

§8 requires every guard to be proven: a test that has never failed is decoration.
B-3 (sign-in enumeration indistinguishability) and C-4 (the INC-010a
arbitrary-recipient guard on `/auth/callback`) both pass, but passing proves nothing
until each has been observed FAILING against code that breaks the behaviour it
guards. This harness supplies that observation. The pattern follows the migration
linter's self-test precedent: a fixture that is deliberately wrong, and a job that
fails if the guard tolerates it.

## Mutations are never committed

The broken code lives as inert unified diffs under `e2e/proofs/*.patch`. They are
data, not source. `guard-proof.yml` applies one to the **runner's working tree**,
runs a single test, then runs `git checkout -- src/`. `main` never holds broken code,
and a final `if: always()` step fails the job if `git status --porcelain src/` is
non-empty, so no mutation can survive the run.

- `e2e/proofs/b3-enumeration.patch` — renders the attempted address inside the
  sign-in error, making wrong-password and unknown-email distinguishable.
- `e2e/proofs/c4-arbitrary-recipient.patch` — puts an email text input back on the
  callback surface.

Both files are exempt from prettier (`.prettierignore`): they are diffs, and prettier
cannot infer a parser for `.patch`.

## A/B proof, judged by the JSON reporter (INC-021)

A process exit code cannot distinguish "the test ran and failed for the right reason"
from "the command broke." An empty `--grep` match, a global-setup failure, or a browser
launch failure all exit non-zero, so the original exit-code design would have reported a
GREEN job while proving nothing.

Each guard is therefore proven in both directions:

- **Baseline** — run the test on unmutated source; exactly 1 test must run and PASS.
  This is what closes the empty-grep hole: if no test matched, the baseline fails.
- **Mutated** — apply the patch; exactly 1 test must run and FAIL.

Both assertions are made by `scripts/assert-playwright-result.mjs`, which reads
Playwright's JSON reporter (`stats`, falling back to walking the suite tree) and never
the exit code. A skipped test fails the assertion in both modes.

The two outcomes are different alarms:

- **Baseline failure** → the harness or the environment is broken; nothing is known
  about the guard yet.
- **Mutated pass** (`GUARD DID NOT BITE`) → the guard is worthless and must be fixed
  before the phase gate closes.

## How results are captured

The JSON report is written to a file via `PLAYWRIGHT_JSON_OUTPUT_NAME`, not by
redirecting stdout. The E2E `globalSetup` logs useful diagnostic lines to stdout
(e.g., `[e2e:setup] ...`); a stdout redirect would mix those lines into the JSON
and produce an unreadable report. If the assertion script fails with
"could not read the Playwright JSON report", the **capture mechanism** broke — not
the guard under test. That is a third distinct alarm alongside a baseline failure
and a mutated pass; fix the harness, not the guard.

## How to run it

GitHub → **Actions** → **Guard Proof** → **Run workflow**. It is
`workflow_dispatch` only — never on push, never scheduled — because it deliberately
runs failing tests and burns staging auth calls.

Steps run in this order: B-3 baseline, B-3 mutated, C-4 baseline, C-4 mutated.

## How to read the result

- **Job PASSES** → each guard passed on clean source AND failed on broken code. That is
  the proof.
- **Job FAILS with `NO TEST MATCHED`** → the grep matches nothing; the harness is not
  testing anything.
- **Job FAILS with `baseline FAILED`** → the test does not pass on clean source; fix the
  harness or environment before reading anything into the mutated run.
- **Job FAILS with `GUARD DID NOT BITE`** → the test passed against broken code. The
  guard is decoration and must be fixed before the phase gate closes.
- **Job FAILS at `git apply`** → the patch no longer applies: `src/routes/auth.tsx`
  or `src/routes/auth_.callback.tsx` moved. This is information, not noise. Regenerate
  the fixture against current source and re-run.
- **Job FAILS at the cleanliness step** → a mutation was left in the tree; the job
  itself is broken.

## When to run it

At every phase gate, and after any change to the sign-in error surface or the
callback surface.

## First successful run

PENDING — to be filled in by the operator after the first dispatch.

## Fixture refresh — 2026-08-04

The auth surface moved substantially during P1-g, so both fixtures were re-checked
against current source:

- `c4-arbitrary-recipient.patch` — applies clean, unchanged.
- `b3-enumeration.patch` — REGENERATED. The sign-in error block shifted ~102 lines;
  the mutation intent (leak the attempted address into the error copy) and the
  forbidden-on-main header are unchanged.
