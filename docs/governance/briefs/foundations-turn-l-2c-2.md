````text
RULING — Foundations turn L-2c, stop 1 answered: Part A by your own edit tools. Base: dev ce7300bf. Tier B. No migration. Lovable. Saved as docs/governance/briefs/foundations-turn-l-2c-2.md; roadmap line 3 names it. foundations-turn-l-2c.md stands where this does not change it.

VERIFIED (dev ce7300bf): step 0's sha256 5d2783cd… matches. Part 1 (INC-1001) is done:
- LOCAL_UNIT_BOUND, localUnitTests and TCK-6 are in place, and ci.yml is unchanged;
- your checks ran 34 PASS · 0 FAIL · 21 NOT RUN · 887 s, with the unit step at 2 workers passing 2,234 of 2,234.
Your stop was right: the platform forbids `git apply`, and my ruling prescribed it without checking (my slip).

STEP 0: save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-l-2c-2.md in one fenced block, prove its sha256 equals the value after END, and name it on roadmap line 3.

CI FIRST: read the newest completed run (762d6ac4 is SUCCESS; ce7300bf's may still be running). Fix any red first. Do not run `bun run checks` at the start.

PART 2 — your option (b): Part A rebuilt with your own edit tools.
- Build directly in the re-laid shape:
  - collatorFor and formatCountryName in ONE module;
  - compareCodes in it if that saves a chunk;
  - location-data.ts :191 on compareCodes;
  - name-collator.ts in the mechanism set (register row 16, FIXED_ORDER_LOCALE).
- The stop-1 appendix is a reference only. Read it per file by line range, and never apply it.
- Remove from docs/tracking/intentional-deletions.txt the lines for files that exist again, and add a line for any of the six that you do not bring back.
- Everything else is as ruled in foundations-turn-l-2c.md Part 2: the measurement against b4250ca0 with its 0.4 KiB tolerance and cause, CF-FMT-1/2 a/b/c, FMT-9…11, and the existing order and name tests green and unchanged.

THEN `bun run checks` once, its last line pasted. Push, and END THE TURN with the report:
- step 0's sha256;
- Part 2 done or not;
- the per-chunk table and the per-page growth;
- the unit count;
- the checks' last line;
- K2;
- the files from git diff --name-only ce7300bf.
````
