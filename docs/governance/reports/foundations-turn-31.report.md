# Foundations turn 31 — STOP before STEP 0

## Starting commit

`git rev-parse HEAD`:

```text
1990ac5d13da117959ca0085f75a949db0f82628
```

## A1 — readable CI evidence

First six lines of the CI evidence branch's `ci-status.md`:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `1990ac5d13da117959ca0085f75a949db0f82628` (short `1990ac5`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-10-25T23:07:31Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40241386426
```

Only `Build, typecheck, lint` failed. Its evidence:

```text
##[error]Unexplained deletions in a018721a4a74bfabcb5be65c19fe5d5c55a69108..HEAD (INC-076).
src/i18n/compiled-admin-loader.test.ts
src/i18n/locales/admin-layer.test.ts
##[error]Process completed with exit code 1.
```

All E2E lanes, staging E2E and component tests succeeded. The E2E evidence states `last E2E run 40241386426 passed`. This is the ruled INC-905 declaration omission; no correction or re-run was attempted.

## Conflicting rule — exact words

AGENTS.md:

> A map indexed by an outside key is read through `ownValue`, never `map[key]`.

## Conflicting exact block

Part D4, `scripts/conformance/overlays.test.ts`, derives `key` from the scanned import's specifier and reads `MAY_REACH[key]` twice:

```ts
const key = text.startsWith("@radix-ui/") ? text : `./${text.split("/").pop()}`;
if (MAY_REACH[key] === name) return;
```

```ts
what: `reaches ${text} by value; only ${MAY_REACH[key]} may (DEC-259)`,
```

These are outside-key map reads. The exact-block requirement prevents substituting the shared own-key reader or a Map without a corrected brief and corresponding hashes.

## Done, left and changes

- Done: Part A evidence read and classified; conflict recorded.
- Not done: STEP 0, Parts B–G, implementation checks, browser checks and completion report.
- No brief saved, source changed, deletion declaration appended, migration applied, dependency changed or test run.
- Sole modified file: `docs/governance/reports/foundations-turn-31.report.md` (this STOP report).
- Final CI judgment remains with the supervisor; the only readable run is reported above.