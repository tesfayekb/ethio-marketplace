# Records turn R10 — ruling 1

````text
RULING — R10, ruling 1 (three corrections to the records; your findings 1–3 are right). Base: cursor/records-r10 at 22a841cb1.
**MODEL — Claude Opus 5.5 (High), unchanged.**

1. Finding 4 is not a defect: those are DECLARED marks (DEC-022), chosen at apply time and rounded up past the file's stamp, so they never match a filename and may run past the block's close; both databases hold them (read back by the supervisor). Nothing changes.
2. Findings 1–3 are the supervisor's slips (S515, recorded on his side). Apply exactly these four replacements, each found once, by a script (never retyped), on the branch at 22a841cb1 — nothing else in the files changes:
   - docs/governance/mechanisms.md: `scripts/conformance/listing-tier.test.ts` CF-TIER-4 → `scripts/conformance/card-tiers.test.ts` CF-TIER-4
   - roadmap.md: "the register rows 93 → 98; no app code" → "the register rows 93 → 99; no app code"
   - roadmap.md: "the register rows 93 → 98 — this turn" → "the register rows 93 → 99 — this turn"
   - roadmap.md: "four spec-local `scratchHolder` helpers" → "five spec-local `scratchHolder` helpers"
   Expected after the edits (sha256sum): 612b0a9969b861286fff94ea9c6fac26a9baff5378b832b718c2efa1f47e6e62 docs/governance/mechanisms.md · d3c1a3b785223512ef1681578e115dde3618d8f4983104040091ab8499c5c020 roadmap.md. A mismatch is a STOP.
3. Save this ruling byte for byte as docs/governance/briefs/records-turn-r10.ruling-1.md (one fenced block) and add one line to the report's §10 Departures: "Ruling 1 (records-turn-r10.ruling-1.md): findings 1–3 corrected by the supervisor's four replacements; finding 4 is DEC-022's declared marks, not a defect." Commit `records turn R10: ruling 1 — row 93's guard path, the row count, the helper count (S515)`; push; `gh pr checks --watch`; the "every check green" comment on the new head. Bring back the head's sha.
````
