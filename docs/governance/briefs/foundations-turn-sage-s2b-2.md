```text
RULING — turn S2b, finish: one revert, the report, then the checks. Base: dev 3d94bd6b. Tier B. No new feature work, no migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-sage-s2b-2.md; roadmap line 3 names it beside foundations-turn-sage-s2b.md.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-sage-s2b-2.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

SEEN AT 3d94bd6b (fresh clone):
- step 0's sha256 c2f1d64d… matches;
- the lint baseline is 20 with its reason;
- band-row.ts holds BAND_TRACK, BAND_SEGMENT, BAND_SEGMENT_IDLE, BAND_SEGMENT_CURRENT, the crumb constants and RAIL_HEADER;
- the panel header reads RAIL_HEADER with BAND_ROW;
- the location row, the panel tabs and the crumb trails read the shared segment constants;
- CURRENT_PILL is the bottom bar's only;
- your browser run was 50 of 50.

1. Scope (DRIFT, second time): AGENTS.md is outside this turn's scope, as it was in S2. Its Shell line was rewritten and shortened, and the shortening dropped words ("state borders on top"). Revert AGENTS.md to its 0a16eed0 text exactly. From now on AGENTS.md changes only when a brief names it in its scope; a new mechanism is recorded in its register row in docs/governance/mechanisms.md (G0.9).
2. The report, docs/governance/reports/foundations-turn-sage-s2b.report.md, written BEFORE the checks, covering S2b and this turn:
   - step 0's sha256 for both rulings;
   - the CI lines for 0a16eed0 and, if published, 3d94bd6b, with any red classified;
   - item 1 of S2b (the baseline);
   - the census as built (each consumer before and after, crumb files included);
   - RAIL_HEADER and CF-BAND-1's definition;
   - every test changed under G38, with its old and new value;
   - the growth table (JS per page and the stylesheet) with causes;
   - the unit count;
   - K2;
   - git diff --name-only 0a16eed0.
3. Then `bun run checks` once on the final tree, run whole. Add its last line to the report.
   - If any step fails, fix it at its root and say so in the report.
   - If the turn's time runs out first, push with the report saying "checks: not finished — CI judges". A turn never ends without its report.
4. CI FIRST still holds: read the run on 3d94bd6b if it has completed. Any red that is not infrastructure is fixed first, from its failure body.

Push, and END THE TURN.
```
