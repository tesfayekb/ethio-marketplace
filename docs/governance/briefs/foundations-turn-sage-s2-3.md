```text
RULING — redesign Part 2, turn SAGE-S2, finish: the clean full checks and the report only. Base: dev 398a5859. Tier B. No migration, no new dependency, no new string, no new feature work. Lovable. Saved as docs/governance/briefs/foundations-turn-sage-s2-3.md; roadmap line 3 names it beside foundations-turn-sage-s2.md and foundations-turn-sage-s2-2.md.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-sage-s2-3.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

SEEN AT 398a5859 (fresh clone): step 0's sha256 25506896… matches; AGENTS.md and its allowlist equal their d0b6a4ad text; CURRENT_PILL in band-row.ts read by the panel tabs and the bottom bar; `--nav-active` retired; D261's one IntersectionObserver in app-shell.tsx with SGB-4; SGB-5; the L4b fix (INC-1024: the track keeps its names' own width, so useLabelRoom moves the labels aside first).

This turn is small on purpose: your last two turns ran out of time before the checks and the report.
1. CI FIRST: read the run on 398a5859 (it may still be running; read it again before your push). Any red is fixed first, from its failure body — the only code change this turn may make.
2. `bun run checks` once on the final tree, run whole, with its last line pasted (no FAIL), and the unit suite's full count. Name the two failures of S2's first full run and how each was answered.
3. The report, docs/governance/reports/foundations-turn-sage-s2.report.md, covering S2, S2-2 and this turn:
   - step 0's sha256 for the three rulings;
   - the CI lines for d0b6a4ad, 536dc66d and 398a5859, each red classified and fixed;
   - the census as built (each band row before and after);
   - the CF-BAND-1 extension and its planted case;
   - the 360 px proof in both languages;
   - D261's measurement (SGB-4) and its mechanism;
   - CURRENT_PILL and the `--nav-active` retirement;
   - INC-1024's cause and fix;
   - every test changed under G38, with its old and new value;
   - the growth table per page (JS) and the stylesheet, with causes and any ceiling raised (old → new, CI's size);
   - the unit count;
   - the checks' last line;
   - K2;
   - git diff --name-only d0b6a4ad.

Stop at that point: no other change. Push, and END THE TURN.
```
