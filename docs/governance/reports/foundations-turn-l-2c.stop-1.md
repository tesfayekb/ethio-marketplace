# Foundations turn L-2c — stop 1 (Part 2 blocked: `git apply` is refused by the platform)

- CI: b4250ca0 SUCCESS (per the ruling); 762d6ac4 changed documents only. No checks run at the start.
- Step 0: `docs/governance/briefs/foundations-turn-l-2c.md` saved; sha256 of the fenced text
  `5d2783cd55c1e8f13fabfdadd46b0a067e1839bdddb3c69ae6846469db2337db` (equals the ruling's). Roadmap line 3 names it.

## Part 1 — INC-1001: DONE

- `scripts/ci/turn-checks.ts`: `LOCAL["component-tests › Component tests (vitest + RTL + jsdom)"]` =
  "the sandbox's shared CPU: the full suite at default workers times out (INC-1001)";
  `localUnitTests(run)` = `${run} -- --maxWorkers=2` (`LOCAL_UNIT_BOUND`), used only for that step;
  a PASS line now prints its LOCAL reason. ci.yml unchanged (`bun run test:unit`). No timeout raised, no test changed.
- Proof the bound reaches vitest: `bun run test:unit -- --maxWorkers=2 --minWorkers=3 …` prints
  `$ vitest run "--maxWorkers=2" "--minWorkers=3" …` and vitest rejects only `--minWorkers`
  (`Unknown option`), so `--maxWorkers=2` is passed through and accepted.
- TCK-6 added in `scripts/ci/turn-checks.test.ts`: `turn-checks.test.ts` 6 passed.

## Part 2 — Part A: NOT DONE (STOP)

The appendix was extracted to a scratch file (743 lines), but the first `git apply --check` was refused by the
platform: `error: 'git apply' is not allowed. Do not attempt to circumvent this.` The ruling prescribes
`git apply`; the platform forbids it and tells me not to work around it, so I have not restored the patch with
`patch(1)` or by hand. No Part A file changed; `intentional-deletions.txt` is untouched.

Choices for the ruling: (a) the appendix is applied by an executor that may run `git apply` (Claude Code),
then Lovable re-lays it; or (b) Lovable re-lays Part A by its own edit tools, file by file, from the
appendix (larger turn; I would read by line range).

Not supplied (Part 2 not built): per-chunk table, per-page growth, FMT-9…11, CF-FMT-1/2.
Machine-order value kinds: as stated in stop 1 (unchanged).

## Checks

One `bun run checks` run on this tree (unit step at 2 workers: PASS, 581s). Last line: `checks: 34 PASS · 0 FAIL · 21 NOT RUN · 887s`.

## K2

None new.

## Files (git diff --name-only 762d6ac4)

docs/governance/briefs/foundations-turn-l-2c.md, docs/governance/reports/foundations-turn-l-2c.stop-1.md,
roadmap.md, scripts/ci/turn-checks.ts, scripts/ci/turn-checks.test.ts
