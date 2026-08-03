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

## How to run it

GitHub → **Actions** → **Guard Proof** → **Run workflow**. It is
`workflow_dispatch` only — never on push, never scheduled — because it deliberately
runs failing tests and burns staging auth calls.

## How to read the result

- **Job PASSES** → both guards correctly FAILED against broken code. That is the
  proof. The log contains `B-3 correctly FAILED against the mutation` and the C-4
  equivalent.
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
