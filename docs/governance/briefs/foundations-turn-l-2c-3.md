````text
RULING — Foundations turn L-2c, stop 2 answered: Part A lands with its measured weight. Base: dev 6039e3f7. Tier B. No migration. Lovable. Saved as docs/governance/briefs/foundations-turn-l-2c-3.md; roadmap line 3 names it. foundations-turn-l-2c.md and -l-2c-2.md stand where this does not change them.

VERIFIED (dev 6039e3f7): step 0's sha256 9f4b9fd4… matches. Your stop was right under my tolerance, and so was the withdrawal. Your per-page table is the measurement this ruling uses.

THE RULING ON WEIGHT (my error, corrected):
- My 0.4 KiB came from your plan's estimate, not from a measurement. The mechanism replaces inline copies that were already on the first paint (legal-kinds' country names on every page, the shell's place order).
- Your measured growth is +0.32 to +0.54 KiB per page, most of it the format-locale and reader-locale chunks. That is the honest cost of one mechanism for every locale-sensitive Intl call, with the server and the browser in the same order.
- New tolerance: a page that grows by up to 0.6 KiB with the cause "the reader-order and country-name mechanism in one shared module, replacing inline copies (L-2c)" has its ceiling raised to its next whole KiB, and its NEAR line in the same turn.
- More than 0.6 KiB on any page, or growth on a page your table does not explain, is a STOP.
- The speed work, later, owns making the shared chunks cheaper.

STEP 0: save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-l-2c-3.md in one fenced block, prove its sha256 equals the value after END, and name it on roadmap line 3.

CI FIRST: read the newest completed run and fix any red first. Do not run `bun run checks` at the start.

PART 2 — land the measured candidate.
- If your preserved candidate files are still in the sandbox, bring them back by copying your own files. Otherwise rebuild with your own edit tools to the same shape. Either way, never `git apply`.
- Then take the six lines out of docs/tracking/intentional-deletions.txt for the files that exist again.
- AGENTS.md: no new line.
  - Its 10,200-byte allowance stays.
  - The pointer joins the existing line 49 (Dates/numbers: `formatLocale` …) as a short clause naming the reader-order and country-name module, fitting the allowance.
  - If it cannot fit, register row 16 alone is the record (G0.9), and AGENTS.md is unchanged.
- The tests are as in your candidate: CF-FMT-1/2 with planted a/b/c and its negative controls; FMT-9…11; the existing order and name tests unchanged.

THEN `bun run checks` once. Its last line, with no FAIL, is pasted. Push, and END THE TURN with the report:
- step 0's sha256;
- Part 2 done or not;
- the per-page growth as landed, with each raised ceiling;
- the unit count;
- the checks' last line;
- K2 (your stop-2 list stands);
- the files from git diff --name-only 6039e3f7.
````
