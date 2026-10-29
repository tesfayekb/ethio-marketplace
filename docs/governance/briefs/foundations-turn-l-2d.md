````
RULING — Foundations turn L-2d: Part B, every page's title in the reader's language (INC-990). Base: dev a16bbea8. Tier B. No migration. Lovable. Saved as docs/governance/briefs/foundations-turn-l-2d.md; roadmap line 3 names it.

STEP 0: save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-l-2d.md in one fenced block, prove its sha256 equals the value after END, and name it on roadmap line 3.

CI FIRST: read the newest completed run. If it is red, fix it first. Do not run `bun run checks` at the start.

PART A VERIFIED (dev a16bbea8): reader-locale.ts, name-collator on FIXED_ORDER_LOCALE, register row 16, no app bare localeCompare, AGENTS.md unchanged (register row 16 is the record), intentional-deletions consistent, checks 34 PASS · 0 FAIL · 21 NOT RUN, unit 2,237 of 2,237. CLEAN pending CI on a16bbea8.
One correction, first in this turn: "next whole KiB" meant the smallest whole KiB that the NEAR band accepts for the measured size, not the old ceiling + 1. Where your L-2c table set a ceiling above that (for example /admin/listings_/$listingId_/edit: 401.57 measured, 404 set, 402 is enough), lower it by script from your own table, using the band's own rule in scripts/ci/turn-checks.ts and keeping each line's cause. A budget never keeps headroom that no cause asked for.

WHAT TO BUILD: Part B exactly as ruled in docs/governance/briefs/foundations-turn-l-2.md B1–B3 and B5–B7, with B4 replaced by docs/governance/briefs/foundations-turn-l-2b.md (STOP B: the base-first head and the client re-title). Read those two files' Part B sections by line range. The 44 keys are that brief's STRINGS block, extracted by script (its sha256 d41a33d0… proven again), never retyped.

WORK WITHIN YOUR BUDGET
- Never open a large file whole. Read by grep and line ranges.
- The 51 route heads move by a script you write once. It reads each route's head literals and rewrites them to pageHead calls with the keys from B2's list. Review its diff by `git diff --stat` and spot-reads.
- If the platform's time limit nears, stop at a clean point with the builder, CF-HEAD-1, the keys and a first group of routes landed green. Report the three lines; the next turn finishes the rest.

THE REPORT'S PROOFS
- The route table: per route, today's English (from 5d61def7) and the rendered English, equal on every row.
- The 44 keys as committed, en and am read back from the files.
- PGH-1…6 and PGH-E1/E2: both projects, 0 retries.
- The per-page first-download growth with its cause (B5).

THEN `bun run checks` once, its last line pasted. Push, and END THE TURN with the report:
- step 0's sha256;
- B1–B7, each done or not;
- the proofs above;
- the unit count;
- the checks' last line;
- K2;
- the files from git diff --name-only a16bbea8.
````
