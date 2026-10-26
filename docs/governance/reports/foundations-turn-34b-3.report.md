# Foundations turn 34b-3 — STOP before STEP 0

## Status

Not implemented. The brief requires a STOP before saving when its prescribed text conflicts with a project rule.

## Starting commit

`git rev-parse HEAD` returned `a8c025ef6aec24a7702b59bf4a740107c1bb0757`, matching BASE.

## Brief verification

The text between the carrying message's markers was extracted to temporary storage only, with one final newline. It is 77,090 bytes and has SHA-256 `0679c983a97d3f51ab412d15a32886ca92d989d6917995989e3d50cab6125502`, matching the supplied expectation. It was not saved into the repository.

## Conflict

The exact rule in `AGENTS.md:32` and Project Knowledge is:

> A map indexed by an outside key is read through `ownValue`, never `map[key]`.

Part C1, `EDIT scripts/conformance/on-demand-failure.test.ts #7`, prescribes:

```ts
const definer = definerOf(specifier, file);
if (definer === undefined) return;
const loaders = DEFINERS[definer] ?? [];
```

`definer` is derived from the scanned file's import module specifier. Although `definerOf` selects a matching own key, the prescribed read still uses bracket indexing instead of the required `ownValue` mechanism. `DEFINERS` is a record (`scripts/conformance/on-demand-failure.test.ts:27`), not a JavaScript Map.

## Required correction

A corrected brief must import `ownValue` from the existing `src/lib/own-key.ts` mechanism and use `ownValue(DEFINERS, definer) ?? []`, with the affected file hash and brief hash/size updated. No expectation was edited and no substitute implementation was applied.

## Work and checks

Only this STOP report was added. Parts A1, STEP 0, B–D, application tests, browser checks and independent review were not run after finding the conflict. No application, migration, string, package, AGENTS, roadmap or E2E file changed. CI was not read in this turn; no CI success is claimed. Report formatting is checked before ending the turn.