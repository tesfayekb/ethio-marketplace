````text
RULING — Foundations turn L-2d, stop 1 answered: page heads with nothing new on the first paint. Base: dev e639f0b4. Tier B. No migration. Lovable. Saved as docs/governance/briefs/foundations-turn-l-2d-2.md; roadmap line 3 names it. foundations-turn-l-2.md, -l-2b.md and -l-2d.md stand where this does not change them.

VERIFIED (dev e639f0b4): step 0's sha256 c3811124… matches, and the STRINGS sha256 d41a33d0… is proven again. The ceiling correction landed (34 lowered, 16 already minimal). Your candidate's 44 keys, read back, equal my strings file. Your stop was right: +1.39 KiB on every page is far over B5.

WHERE THE WEIGHT GOES (the design law that replaces the candidate's shape):
- The base text a head shows today is already on the first paint, as literals in the route tree. Moving it into the base catalogue as keys must cost about nothing: the literals leave the route code as the keys arrive.
- Nothing else of this concern is on the first paint:
  - no re-title effect and no builder beyond a few lines that resolve keys and fill one {name};
  - no non-base text.
- The client re-title (on a pick, and after the catalogue is applied when the applied language is not the base) is loaded on demand, the way INC-864 keeps reader-failure lazy. A visitor reading in the base language never downloads it.
- Hydration does not change the server's head text (law (b) of L-2b, unchanged).
- How you meet this is your plan. Your candidate is a reference, read by line range.

TOLERANCE: the per-page growth, measured, with its cause.
- Up to 0.5 KiB: raise the ceiling to the smallest whole KiB the NEAR band accepts.
- More than 0.5 KiB on any page: STOP with the per-chunk table.
- If the checker stops early because the entry exceeds its ceiling, raise that ceiling locally only (never committed) to get the per-page table.

TESTS (your stop's two findings):
- PGH-E1 decodes HTML entities before it compares the raw HTML's title, because the server encodes ' as &#x27;. That is how the comparison should have been written; the expected text is unchanged.
- The language state is set through the existing approved seam that CF-LANG-1 allows, never by writing storage directly.
- A test file is never deleted while the unit runner is running.

STEP 0: save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-l-2d-2.md in one fenced block, prove its sha256 equals the value after END, and name it on roadmap line 3.

CI FIRST: read the newest completed run and fix any red first. Do not run `bun run checks` at the start.

THEN `bun run checks` once, on the final tree, its last line with no FAIL pasted. Push, and END THE TURN with the report:
- step 0's sha256;
- B1–B7, each done or not;
- the per-chunk table and the per-page growth;
- the route table (before and after English);
- the 44 keys as committed;
- PGH-1…6 and PGH-E1/E2 (both projects, 0 retries);
- the unit count;
- the checks' last line;
- K2;
- the files from git diff --name-only e639f0b4.
````
