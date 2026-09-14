# HANDOFF — engineering thread, written 2026-09-14 (attribute system v2 complete; Vehicles, Real Estate, Electronics curated with specs; Fashion opens the eleven)

Supersedes the 2026-09-10 handoff (and the un-imported 2026-09-12 checkpoint). Run the §2 ritual FIRST: clone dev, read system-state → this file → the ledger tail (S36 addenda 1–5 and the lines after) → git log. Chat memory is advisory; the repo is the record. Instructions v1.10 and Knowledge v3.8 govern; the curation handoff §7–§9 (docs/governance/handoffs/2026-09-08-catalog-curation-thread-handoff.md) governs the curation Project.

## State at handoff
- Board green on push and nightly (2026-09-14 nightly: 0 gating, CI-5 quarantined as every night). Newest migration 20260913114828_ceabcf99 (DEC-057b-mig), applied on prod and staging.
- Landed since 2026-09-10: DEC-048/049 ratified; DEC-050 (definition v2: unit/min/max/decimals/format with year tokens, presets, Amharic help text, option active/bounds/aliases, row editor, coverage column); DEC-054 (healed-mark parity, proven); DEC-057 + DEC-057b (option-conditioned `allowed` values; co-linkage = at least one shared category, resolved through inheritance); DEC-059 (teardown never reds a green shard; post-test capture); C3-UX-5/6/7/8/9; INC-174/187/188/189/190/191/192/193/194/195 closed; DEC-055/056/058 ratified, not built (units catalog + per-country unit_system with Locations/posting; display-only FX at U7; catalog inbox after U7).
- Curated and imported with v2 cells and specs: Vehicles (backfill + follow-up: 165 year bounds, 209 allowed sets, ኦባማ on NPR), Real Estate (28 rows; seven allowed records), Electronics (42 rows; 136 Ge'ez product labels, 233 aliases, 94 allowed sets — iPhone storage, OS per series incl. HarmonyOS/watchOS/Wear OS; color bilingual). Amharic approved after each.
- Standing curation rules (all in curation handoff §7–§9 plus these clarifications): labels in the script of their language, Latin originals as aliases, nicknames as aliases only; `active: false` never for discontinued products; brands carry no `allowed`; alias uniqueness is per definition, case-insensitive (brand-qualify a shared alias); charge family: `mAh` canonical.
- Rulings in force: catalog curation is continuous; after the eleven passes, a library sweep (delete unlinked definitions, consolidate cross-root duplicates — fifteen `condition` variants first — remove retired categories that never held a listing, rename the descriptor labels queued in Electronics); Locations era after that; posting after Locations.

## Open (none blocking)
- INC-185 (TR-12 unlabeled waits), INC-186 (a green run never judges the artifact contract — reporter DEC candidate), DEC-049b (checkout@v4 ×3, github-script@v7), ACT-C3-1 (guard-proof.yml currency), C3-UX-3/4 (option-label translation store; other-text capture — solved in DEC-051's shape), C4 tags disposition (REQ-041 spec exists, no landing).

## Laws forged here (do not re-derive)
- The whole definitions surface is doors + planner + export payload + reader; a schema change lands all four in one L1.
- A migration a spec depends on lands first, is applied on staging, then the spec lands with its local run; a rule change that flips an existing probe lands the probe with the migration.
- Migrations above the paste limit split by concern with separate marks; never drop proofs.
- Local runs cover whole spec files, never a grep subset.
- Every editable cell is diffed AND committed AND undone; a console save never drops a field it does not show.
- Code landings carry only their changelog line; ledger and feature-doc records land in a separate docs paste after verification (verbatim blocks die in code-heavy turns); every prompt opens with step 0: write the record blocks to a scratch file.
- A guard nobody can pass is not a guard (the deletion manifest door); a guard not shown to fail on bad input is not trusted.
- Tier A and harness changes route through the prompt path even when a linter nags.

## First moves (this thread or its successor)
1. Ritual; confirm HEAD/phase/last/next.
2. Fashion: fresh export → curator review note → rulings (recommendations here on request) → files → counts line → import → walk → Amharic. Then Home & Garden · Services · Travel & Accommodation · Construction Material · Beauty & Personal Care · Sports & Leisure · Agriculture & Farming · Babies & Kids · Pets & Animals · Commercial Equipment.
3. Riders when the executor is idle: INC-185 labels, INC-186 reporter DEC, DEC-049b, ACT-C3-1.
4. After the eleven: the library sweep; then the Locations era spec (DEC-033) with the posting-prerequisites census (DEC-051/052/053/055 sequencing; C4 tags).
