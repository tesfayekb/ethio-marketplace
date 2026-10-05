Source: supervisor thread, turn 1366, Sun 2026-10-04 19:05 New York.
Status at 2026-10-04: built in part as dev 2b55ed15 (steps 26 and 27; CI run 37244952955 SUCCESS per the supervisor's notes); steps 28 and 29 moved to turn 9b (file 2026-10-04-bundle-4-turn-9b-prompt.md).
Related: bundle 4 Part G, INC-374, INC-381, DEC-094, DEC-095.

BUNDLE 4 — TURN 9: the screens of Part G (brief steps 26, 27, 28, 29). Tier A. No migration, no door change.

Scope: only what steps 26–29 of docs/governance/briefs/bundle-4.md name for the seller's screens, the importer's screen and the admin link editor, plus their tests, the i18n keys and the usage map, one line in docs/_changelog.md and the ticks in roadmap.md. Part H is the next turn. Nothing else.

1. Before any edit
   a. Read the newest mark on ethio-prod. Expect 20261005100000 (the operator applied M6). If it is not there, stop and say so.
   b. Read Part G of the brief whole (lines 166–191). It is the specification. Its line numbers have moved; today's anchors at fcc9b822 are:
      - conditionMet — src/features/posting/visible-when.ts:26 (callers: build-title.ts:31, price-basis.ts:134, step-specifications.tsx:323, :461, :468, :846)
      - shapeCondition — src/features/posting/posting-service.ts:678 (returns one pair today)
      - the finder's skip of conditional rows — catalog-finder.ts:147
      - pinnedNumber — step-specifications.tsx:703 (used at :1061 and :1425)
      - firstSentence — step-specifications.tsx:174
      - catalogText — src/i18n/entity.ts:57; drawn at catalog-finder.ts:159, step-specifications.tsx:1412 and :1518, attribute-options.ts:175, attribute-display.ts:30
      - chooseLeaf — wizard.tsx:357
      - the admin link editor — src/features/admin-attributes/components/attribute-link-cells.tsx
   c. Before you build steps 28 and 29, state the censuses the brief asks for there: braces in the importer, the gate and the translation route; catalogue labels in the finder's index; every caller of optionLabel.

2. Build in this order, each step with every test the brief lists for it: 26, then 27, then 28, then 29.
   Rules that go beyond the brief:
   - One shape, one reader. The condition's type, with its optional second pair, lives in visible-when.ts. shapeCondition, conditionMet, the admin editor and the links-file cell text all use it. No second parser on the screen side.
   - M6 did not prove the file text. The round trip in step 26 is that proof: import a links row k1=a|b&k2=c|d (preview, commit, undo), export it, import the export unchanged, and the plan shows zero changes.
   - Step 27: the range line "<label>: <min>–<max> <unit>" comes from the one value renderer (attribute-display.ts), so the review, the preview and the detail cannot differ.
   - Steps 28 and 29: the admin screens keep showing a token as it is stored. Only the seller's and the buyer's screens draw it.
   - Tests use scratch attributes, categories and links only, removed in finally. No real catalogue row is edited, and no test finds a row by its place on a page.

3. Runs
   - While building: single tests by id.
   - Before the turn ends: each spec file you touched, alone, both projects, 2 workers, 0 retries. Give the pass count per file. A file that is not fully green is not committed.
   - Then: typecheck, lint, unit tests, the whole-tree format check, and the usage map regenerated.

4. If the turn must end before step 29: stop at the end of a step with its tests green, and say in three lines what is done and what is left. Do not start a step you cannot finish.

5. Report only when the runs of 3 are green. Limitations first; the censuses of 1c; for each step the files changed and the tests added by id; the run counts of 3; "nothing outside scope was touched". No walk list. Then end the turn so CI runs on the final commit, and make no further push.
