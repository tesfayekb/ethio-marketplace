# Foundations turn L-2c — ruling

```text
RULING — Foundations turn L-2c: Part A only (INC-1001 first). Base: dev 762d6ac4. Tier B. No migration. Lovable. Saved as docs/governance/briefs/foundations-turn-l-2c.md; roadmap line 3 names it. foundations-turn-l-2.md and -l-2b.md stand where this does not change them. Part B is the next turn (L-2d), not this one.

STEP 0: save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-l-2c.md in one fenced block, prove its sha256 equals the value after END, and name it on roadmap line 3.

CI FIRST: CI on b4250ca0 is SUCCESS, and your 762d6ac4 changed only documents. Do NOT run `bun run checks` at the start. A local run on a commit CI has already judged is redundant: my L-2b ruling asked for one, and it cost your turn (my slip).

WORK WITHIN YOUR BUDGET: never open a large file whole.
- Apply the appendix patch with `git apply`, and check the result with `git apply --check` and `git diff --stat`, not by reading the patch.
- Read code by grep and line ranges.

PART 1 — INC-1001: the checks' unit step in the sandbox
- In scripts/ci/turn-checks.ts, the unit step ("component-tests › Component tests (vitest + RTL + jsdom)") runs the same vitest suite with at most 2 workers locally. The exact command is yours: prove the bound applies. It gets a LOCAL reason line: "the sandbox's shared CPU: the full suite at default workers times out (INC-1001)". CI's command is unchanged.
- No timeout is raised and no test is changed.
- Its test (TCK-6, free at 762d6ac4) asserts the local command carries the bound and ci.yml's command does not.

PART 2 — Part A, re-laid as ruled in L-2b
- Restore Part A by `git apply` from the stop-1 appendix, and remove from docs/tracking/intentional-deletions.txt the lines for the files that come back.
- Re-lay it:
  - collatorFor and formatCountryName go in ONE module of your choosing.
  - compareCodes joins that module if doing so saves a chunk.
  - location-data.ts :191 uses compareCodes.
  - name-collator.ts joins the mechanism set: register row 16 lists it, and it takes its locale from FIXED_ORDER_LOCALE.
- Measure the first download per page with your build against b4250ca0's.
  - Up to 0.4 KiB on any page: raise its ceiling to the next whole KiB with the cause "the reader-order and country-name mechanism in one shared module, replacing inline copies".
  - More is a STOP with the per-chunk table.
- Tests:
  - CF-FMT-1 widened, with CF-FMT-2 cases a/b/c;
  - FMT-9…11;
  - the existing order and name tests, unchanged and green.

THEN `bun run checks` once, its last line pasted. Push, and END THE TURN with the report:
- step 0's sha256;
- Part 1 and Part 2, each done or not;
- the per-chunk table and the per-page growth;
- the machine-order value kinds (from stop 1);
- the unit count;
- the checks' last line;
- K2;
- the files from git diff --name-only 762d6ac4.
```
