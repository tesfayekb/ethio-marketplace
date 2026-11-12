QUESTION — housekeeping-1 part B: three guards and the e2e selector are keyed to the files the exports leave; listing-detail reaches `snap` through the map's download
DONE: STEP 0, STEP 1, ruling 1 (6877c3077), parts A + D (b0afddb79), ruling 2 (07b536841), part C (65e49a0ce); part B built in the worktree (not committed — red on the tree, below)
LEFT: part B's commit, `snap`, the `lint` script line with its planted bypass, the first-download table, STEPS 6 → 8
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `5c989b9466b0ea5b2b988582403345b4ff290457` (short `5c989b9`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-10T09:56:40Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42792144721
FILES:
docs/governance/briefs/housekeeping-1-ruling-1.md
docs/governance/briefs/housekeeping-1-ruling-2.md
docs/governance/briefs/housekeeping-1.md
docs/governance/reports/housekeeping-1.stop-1.md
docs/governance/reports/housekeeping-1.stop-2.md
docs/governance/reports/housekeeping-1.stop-3.md
roadmap.md
scripts/ci/laws-changed.ts
scripts/ci/nightly-hour.sh
scripts/ci/nightly-hour.test.ts
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/wired.test.ts

Base: dev 2b11a9d29 (`git fetch origin dev`, then `git rev-parse origin/dev`: 2b11a9d29…, dev did
not move). The FILES list is the committed branch; part B's files are listed below.

## What is done

Part C landed at 65e49a0ce to ruling 2 (a code span is a quotation; CF-BRIEF-4's planted backtick
line passes; the allowlist is empty; the cost is in the test's comment).

Part B is built in the worktree to ruling 1 (Q9 → Q14): 79 tracked files changed, 25 new modules —
every module ruling 1 approved by name except `map-snap.ts` (the question below). The 43 exports of
the census table moved by a scripted byte-exact cut (each block's sha printed and found in its
target); Q10's three lose `export`; Q11's two `overlays.test.ts` lines are in; Q12's directive line
is gone (`e2e/i18n-sign-in-language.spec.ts`, one removed line, comment only); Q13 is a stable
callback ref (deps `view.contact?.focusOnReturn`, `view.contact?.viewer`; once under
`focusOnReturnDone`; the 3-second timer in a ref, cleared by an unmount effect); Q14's
`useSubmitError` is in `category-submit-error.ts` and its disable is gone.

On the tree, now:

- `bun run typecheck`: exit 0.
- `bunx eslint .`: `✖ 1 problem (0 errors, 1 warning)` — `src/features/posting/map/map-preview.tsx
  44:17 react-refresh/only-export-components` (`snap`, held for the question).
- `rg "eslint-disable.*only-export-components" src e2e scripts`: no hit (exit 1).
- `bunx vitest run src --maxWorkers=4`: `Test Files 359 passed (359)`, `Tests 2361 passed (2361)`.
- Q13's timer: a new test, LD-32 (`listing-detail.test.tsx`; LD-25 was taken by
  `listing-detail-tier.test.tsx`, TI-1 said so), counts the pending fake timers before and after
  unmount. Red first: with the unmount effect removed, `Tests 1 failed | 28 skipped`; restored
  (sha256 equal), `Tests 29 passed`. LD-22 (:708 → :747) is unchanged.
- `bunx vitest run scripts --maxWorkers=2`: `Test Files 3 failed | 97 passed (100)` — the three
  guards below, each red because the text it requires moved with its export:

```
scripts/conformance/press.test.ts — src/components/ui/button.tsx:1 the primitive lacks ${PRESSED.button}
scripts/conformance/choice-lists.test.ts — src/components/searchable-picker.tsx:1 owner: does not read menu-row.ts's list constants
scripts/conformance/visible-area.test.ts — src/components/picker-popup.ts:4 imports visible-area.ts outside its on-demand readers
```

Part B stays uncommitted (a commit is never red); a copy is at
/tmp/ethio-scratch/housekeeping-1/part-b.patch (tracked changes) and part-b-new.tar (the 25 new
modules, listed in part-b-new.txt).

## The question

### 1. Three guards name the file an export left (outside SCOPE)

The brief's SCOPE names `scripts/conformance/` as briefs.test.ts, briefs-allowlist.txt and
wired.test.ts; ruling 1 Q11 added overlays.test.ts. These three were not in my census (stop-1 §(e)
looked for lists a NEW name must join, not for guards that read a moved name's OLD file) — my miss.
Proposed, one line each, the guard's law unchanged (the needle follows its export):

- `scripts/conformance/press.test.ts` :40 — the one entry becomes two:
  `{ file: "src/components/ui/button-variants.ts", needs: ["${PRESSED.button}"] },`
  `{ file: "src/components/ui/button.tsx", needs: ['data-pressable=""'] },`
- `scripts/conformance/choice-lists.test.ts` :53–:54 — the picker's owner entry becomes two:
  `"src/components/searchable-picker.tsx": /\bLIST_ROW\b/,`
  `"src/components/picker-popup.ts": /\bLIST_SURFACE\b/,`
- `scripts/conformance/visible-area.test.ts` :26 — AREA_READERS' `"src/components/searchable-picker.tsx"`
  becomes `"src/components/picker-popup.ts"` (the picker still reaches the module the same way:
  searchable-picker.tsx imports picker-popup.ts statically, as it imported visible-area.ts).

Not yet proven on the tree (the files are outside scope, so I have not edited them).

### 2. The e2e selector's named groups (outside SCOPE; a selection gap, not a red)

`scripts/e2e-select.ts` names a moved-from file in three groups; every new module is under a broad
glob (`src/components/**`, `src/features/posting/**`, …) but not in the named group, so a later
change to it would not select that group's spec. Proposed:

- `press` (:337 → :346): add `"src/components/ui/button-variants.ts",` (e2e/press.spec.ts).
- `sage-ad-page` (:316 → :335): add `"src/features/posting/preview/listing-section.ts",`.
- `submenu` (:389 → :402): add `"src/components/shell/favourite-category.ts",` and
  `"src/components/shell/rail-variant.ts",` (app-rail.tsx's two new modules;
  `submenu-levels.ts` is already under `src/components/ui/submenu-*.ts*`).
(`theme-context.ts` is in no group, as `theme-provider.tsx` is in none.)

### 3. `snap` — listing-detail reaches it through the map's own download

Ruling 1 approved `snap` → `src/features/posting/map/map-snap.ts` and the `snap` entry leaving the
mock at `listing-detail-map.test.tsx` :53. The census missed a second reader:
`src/features/posting/preview/listing-detail.tsx` :472 reaches it through the still map's on-demand
module — `MAP_PREVIEW.load().then(({ snap }) => …)` (:86
`const MAP_PREVIEW = loadOnce(() => import("../map/map-preview"));`, its comment :79 "the pin snap
share the one download"). An approximate pin's map links wait for that download today. Moving
`snap` out of map-preview.tsx changes how the ad page gets it:

- (a) Recommended. listing-detail.tsx imports `snap` from `../map/map-snap` statically (as
  map-large.tsx will). The 3-line function joins the ad page's first download (tens of bytes; I
  measure it in the first-download table and name it as this cause); the approximate pin's links
  no longer wait for the map chunk; `MAP_PREVIEW` keeps the component only; :79's comment loses
  "the pin snap share the one download"; the mock's `snap` entry leaves, as ruling 1 said.
- (b) A second `loadOnce(() => import("../map/map-snap"))` for the links: the first download is
  unchanged; an approximate pin's page fetches one more small chunk; :483's failure line stays
  as it is; the on-demand-failure census reads the new loader's caller.
- (c) `snap` stays in map-preview.tsx with an `only-export-components` disable — against Q14's
  census (no disable left) and ruling 1's 0 warnings; named only to be refused.

### Corrections to my stop-1 report, and what moved beyond the table

- The table row "`stepSpecificationsPure` → `firstSentence`, `foldFact` → spec-sentences.ts" was
  wrong: `foldFact` already lives in `src/features/posting/reset-scope.ts` :82, which
  step-specifications.tsx imports. Built: `firstSentence` alone moved to `spec-sentences.ts`, the
  object is gone, and step-specifications.test.ts imports `foldFact` from `./reset-scope`.
- `readDeviceStar` → `i18n-context.ts` took what it reads: `isLanguageCode`, and the device ★'s
  two names `LANGUAGE_STAR_STORAGE_KEY`, `LANGUAGE_STAR_COOKIE` with their U4h comment.
  provider.tsx imports them back; i18n-context.ts imports from provider.tsx only `type I18nValue`,
  `type LayerState` (no runtime cycle). `src/i18n/index.ts` exports the same names as before. The
  writer (`writeDeviceStar`) stays in provider.tsx.
- `sameChannels` → `same-channels.ts` took `CHANNELS`, `Channel` and `channelOf` (step-who.tsx
  reads them at five sites and imports them back); `scaleAmount` → `amount-scale.ts` took its
  `AmountScale` type (step-pricing imports it back).

### Found, not this turn's (the report's §13)

- `.cursor/rules/12-ui.mdc` :79 names "`Field` and `focusFirstRefusal` in
  `src/features/posting/field.tsx`"; `focusFirstRefusal` is now in `field-refusals.ts` (rule files
  are not this lane's).
- Register rows naming a moved export's old file (records turn, §14): row 14 (`focusFirstRefusal`
  in field.tsx), row 85 and row 87 (`placeList`, `usePickerPlacement`, `pickerPopClass` in
  searchable-picker.tsx), row 108 (`useI18n().has` in provider.tsx). `docs/features/posting.md`
  :1152 (`focusFirstRefusal` (`field.tsx`)) is in the standing allowance and is updated with the
  part B commit.

Asked: rule on 1 (the three guard lines — edit them in this lane, or another way), 2 (the selector
lines — in this lane, or a finding), and 3 ((a), (b) or other).
