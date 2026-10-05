Source: supervisor thread, turn 1373, Sun 2026-10-04 19:47 New York.
Status at 2026-10-04: issued; with the operator to send once CI on dev 2b55ed15 has finished; not built at dev 2b55ed15 (brief steps 28 and 29 open, key admin.attributes.link.andNone absent).
Related: bundle 4 Part G, DEC-094, DEC-095, INC-374, INC-381.

BUNDLE 4 — TURN 9b: Part G steps 28 and 29 (the two tokens). Tier A. No migration, no door change. Same rules as the turn 9 prompt; the ones that matter are repeated here.

Scope: only what steps 28 and 29 of docs/governance/briefs/bundle-4.md name for the seller's and the buyer's screens, the importer's screen and the gate, plus their tests, the i18n keys and the usage map, one line in docs/_changelog.md and the ticks in roadmap.md; and item 3 below. Part H is the next turn. Nothing else.

1. Before any edit
   a. Read CI for 2b55ed15 on the ci-evidence branch: ci-status.md, then e2e-last-failure.md and guards-last-failure.md. A red is fixed first and named at the top of your report.
   b. Read steps 28 and 29 of the brief whole (lines 180–190). They are the specification. Today's anchors at 2b55ed15:
      - catalogText — src/i18n/entity.ts:57; drawn at catalog-finder.ts:159, step-specifications.tsx:1418 (help text) and :1527 (unit), attribute-options.ts:175, attribute-display.ts:32 and :134 (units), entity.ts:66
      - firstSentence — step-specifications.tsx:174
      - chooseLeaf — wizard.tsx:357
   c. State the censuses the brief asks for: braces in the importer, the gate (src/server/imports/registry.ts) and the translation route; catalogue labels in the finder's index (catalog_find_sweep, listings_search_tsv_refresh); every caller of optionLabel; the doors that write help text.

2. Build step 28, then step 29, each with every test the brief lists for it.
   - One renderer for both tokens, wrapping catalogText. No second place replaces a token.
   - The admin screens keep showing a token as it is stored. Only the seller's and the buyer's screens draw it.
   - A token the renderer cannot resolve never reaches a screen as raw braces: {country} falls back as the brief says; {category:<slug>} of a category that has gone renders as nothing.
   - If a census finds a door that must change (the finder's index, or a door that writes help text without the M6 check): stop and name it. No migration is written in this turn.
   - Tests use scratch attributes and categories only, removed in finally. No real catalogue row is edited, and no test finds a row by its place on a page.

3. One fix from turn 9: the empty choice of the "And when" key list (data-testid category-attribute-condition-and-key-<key>) reuses admin.attributes.link.none, whose words are "No default". Give it its own key, admin.attributes.link.andNone — en "No second condition", am "ሁለተኛ ሁኔታ የለም" (use these words as written).

4. Runs
   - While building: single tests by id.
   - Before the turn ends: each spec file you touched, alone, both projects, 2 workers, 0 retries. Give the pass count per file. A file that is not fully green is not committed.
   - Then: typecheck, lint, unit tests, the whole-tree format check, and the usage map regenerated.

5. If the turn must end before step 29 is whole: stop at the end of a step with its tests green, and say in three lines what is done and what is left.

6. Report only when the runs of 4 are green. Limitations first; the CI line of 1a; the censuses of 1c; for each step the files changed and the tests added by id; the run counts of 4; "nothing outside scope was touched". No walk list. Then end the turn so CI runs on the final commit, and make no further push.
