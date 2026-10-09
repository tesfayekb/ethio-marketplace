# Bundle 9 — the house style: brief, version 15 (saved unchanged, 2026-10-08)

```text
BUNDLE 9 — THE HOUSE STYLE, VERSION 15 (2026-10-08). THIS FILE REPLACES VERSION 14. Bundle 9's first half is built (turns 1–14), published and walked; the records turn for it landed at f26f891e. The operator's re-check of the walk's changes found one thing to fix and asked one question. This version specifies TURN 15 = ONE SHORT TURN (Part C2m): cut names keep their first five characters, and the focus ring shows after keyboard use only.
Line numbers are as of commit f26f891e (dev). This file is public: it is written as build instructions.

ANSWERS TO THE RECORDS TURN
- The ten files on dev at f26f891e equal the supervisor's build byte for byte. Accepted.
- Your restart after the partial first split, the `git add -N` used for the four new files and "the platform commits" are accepted as reported.
- CI on f26f891e (a documents-only commit) is judged by its own run, or by this turn's run if your push cancels it.

WHAT THE OPERATOR SAID (2026-10-08)
- His words: "car is cut to c..., cooked food to cooked food.... a user cant see what c.. stands for, so its best to preserve at least the first 5 characters of each instead" (D104).
- On a crowded row: names come first. On phones the place boxes' arrows and padding get slimmer; when a row still cannot hold its label and five characters of every name, the label steps out of sight until there is room again, and screen readers keep it (D105).
- His question about the "blue bracket" around a place box after choosing: it is the focus ring. It is kept for keyboard users and no longer shown after a tap or click (decided under G17).

STEP 0 — keep this brief
- Before anything else, save this file byte for byte OVER docs/governance/briefs/bundle-9.md (it is already in its saved form: the header line and one fenced text block).
- Then replace line 3 of the root roadmap.md (it names no brief in force since the records turn) with exactly: Bundle 9 brief: docs/governance/briefs/bundle-9.md (read first every turn).
- On every later turn, read the brief first. Tick no roadmap line in this turn.

HOW TO WORK
- Order of the turn: step 0; C2m.0 (census, read only); C2m.1 to C2m.6; the report; END THE TURN. Do not stop between steps: a clean point is not a reason to stop. Stop only for the census's STOP, a question this brief cannot answer, or the end.
- The turn starts by reading CI for the last commit on dev: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address (you cannot git-fetch that branch). Paste the first six lines of ci-status.md.
- Browser tests: try once at the start to see whether the browser starts (`bun run e2e:local e2e/house-style.spec.ts`). If it does not start, write "local browser runs unavailable" in the report's first lines; CI on the turn's final commit is the proof (INC-506). Nothing runs against ethio-prod or the published site.
- Tests (G38): no assertion is loosened, no timeout raised, no retry added. A test this brief does not name is not edited; if one fails because of this turn, name it and leave it for a ruling.
- No migration, no database write, no package or dependency change, no new string.
- Scope:
  - src/components/ui/cut-text.tsx (new) and its test src/components/ui/cut-text.test.tsx (new);
  - src/components/ui/use-label-room.ts (new);
  - src/lib/input-modality.ts (new) and its test src/lib/input-modality.test.ts (new);
  - src/routes/__root.tsx (one effect line);
  - src/styles.css (one rule);
  - src/features/posting/step-category.tsx;
  - src/components/shell/location-selector.tsx;
  - the other files of the C2m.0 census's class A (each named in the report with its line);
  - e2e/post-wizard-recent.spec.ts, e2e/shell.spec.ts, e2e/house-style.spec.ts;
  - docs/features/design-foundation.md, docs/features/location-scoping.md, docs/_changelog.md;
  - the brief and roadmap.md line 3.
  Name any other file in the report's first lines with its reason.
- Closed surfaces (G22): the workflow files, the failure reporter, the migration check and e2e/global-setup.ts are not touched.
- The commit that is judged by CI ends the turn: END THE TURN and send nothing after it (the platform pushes).

PART C2m — CUT NAMES AND THE FOCUS RING

C2m.0 — CENSUS (read only, before any edit)
- (a) Every `truncate` in src/**/*.tsx. At `2d5c4d85`, `grep -rn '\btruncate\b' src --include=*.tsx` printed 67 lines in 31 files (one is a comment, data-table.tsx :30).
  - For each line give: file:line; what it cuts (a name, a label, a value, an id); and its class.
  - Class A: the cut text can show fewer than five characters, because nothing holds its width (a flex item with `min-w-0` or `shrink`, or a table cell with no width floor). Class A gets C2m.2.
  - Class B: the cut text cannot show fewer than five characters (say why: a fixed or minimum width that holds at least five characters, a desktop-only column with its width, or hidden text such as `sr-only`). Class B is listed and left.
  - STOP and report the table if class A has more than 30 lines.
- (b) Every test that reads the text or the box of a class-A element. Search by its test id, its accessible name AND its string key (INC-500's rule). List them with their lines.
- (c) Every caller around the two rows of C2m.3, with its surrounding lines, not only the call sites (S131's rule).

C2m.1 — THE SHARED BLOCK: src/components/ui/cut-text.tsx
- `CutText({ text, keep = 5, className })` renders a cut name that always shows its first `keep` characters.
- Split `text` into graphemes with `Intl.Segmenter(undefined, { granularity: "grapheme" })`, falling back to `Array.from(text)` where it is missing. `head` = the first `keep` graphemes; `tail` = the rest, joined.
- Render, with nothing added to the text:
  <span className={cn("inline-flex min-w-0 max-w-full", className)}><span className="shrink-0 whitespace-pre">{head}</span>{tail !== "" && <span className="min-w-0 overflow-hidden text-ellipsis whitespace-pre">{tail}</span>}</span>
  - `whitespace-pre` on both parts keeps a space at the split.
  - The head never shrinks, so the element's smallest width is its first five characters in whatever font and script it renders.
  - `textContent` equals `text`.
  - The caller keeps the full name as `title` and as the accessible name where it has them today.
- src/components/ui/cut-text.test.tsx:
  - "Car" renders one part and no tail;
  - "Cooked food" renders head "Cooke" and tail "d food";
  - a five-syllable Ethiopic prefix splits after the fifth syllable (build the test string from am.ts's `location.rowLabel` value — never type Ethiopic in the test);
  - an emoji with a skin-tone modifier counts as one grapheme;
  - textContent equals the input in every case.

C2m.2 — APPLY TO CLASS A (D104)
- In every class-A line, replace the cut span with `CutText` (its classes move to `className` where they still apply). An element that must not shrink below its head loses `min-w-0` — the flex default min-width then holds the head.
- The two known lines:
  - src/features/posting/step-category.tsx — the "Used before" chip (:234–254): the chip loses `min-w-0` and keeps `max-w-[45%] shrink`; its padding is `px-3 md:px-4`; the `<span className="block truncate">` becomes `<CutText text={chipLabel} />`; `title` and `aria-label` unchanged.
  - src/components/shell/location-selector.tsx — the place box (:69–86):
    - `min-w-[6ch]` is removed (it held the padding and the arrow, not the name — INC-509);
    - padding `px-1 md:px-2`, gap `gap-0.5 md:gap-1`;
    - the arrow `h-3 w-3 md:h-4 md:w-4`;
    - the name `<CutText text={selectedName ?? t(labelKey)} />`;
    - `title`, the accessible name and the test id unchanged.
- Nothing else in those rows changes in C2m.2.

C2m.3 — THE LABEL STEPS ASIDE WHEN THE ROW IS FULL (D105): src/components/ui/use-label-room.ts
- `useLabelRoom(rowRef, labelRefs, deps)` decides, after layout, whether the row's label is shown:
  - First show the label(s). Then, if the row's `scrollWidth > clientWidth + 1`, hide them by adding the `sr-only` class (the text stays for screen readers and for `aria-labelledby`).
  - Run it in a `useLayoutEffect` keyed on `deps` (the names on screen and the language), and from a ResizeObserver on the ROW only — observing the children would loop.
  - It writes classes on the label elements directly, so a check never paints a frame with the label wrongly shown.
- Use it in:
  - the location row (location-selector.tsx :193–211), for its two label spans, keyed on the selected names and the language. The width rule stays: from 768 px the long label, below 768 the short one. Only the visible one is checked and hidden; the hidden-by-width one keeps its `hidden md:inline` / `md:hidden` classes;
  - the "Used before" row (step-category.tsx :222–228), for its label span, keyed on the chips' names and the language.
- The row's accessible name (`role="group"` with `aria-labelledby`) is unchanged in both rows.

C2m.4 — THE FOCUS RING AFTER KEYBOARD USE ONLY
- src/lib/input-modality.ts: `installInputModality()` adds two capture-phase listeners on `document` and returns a function that removes them. Calling it twice installs nothing more.
  - `pointerdown` sets `document.documentElement.dataset.input = "pointer"`;
  - `keydown` sets it to "keyboard".
  - Nothing is set before the first input, so the ring shows as today.
- src/routes/__root.tsx: in RootComponent's existing effect (:322–326), install it after `appReady` is set, and return its remover. No other change in the file.
- src/styles.css, inside `@layer base` (:274), one rule:
  html[data-input="pointer"] :is(button, a, [role="button"], [role="combobox"], [role="tab"], [role="menuitem"], [role="option"], [role="checkbox"], [role="switch"]):focus-visible { --tw-ring-shadow: 0 0 #0000 !important; --tw-ring-offset-shadow: 0 0 #0000 !important; outline: none !important; }
  - Text inputs, text areas and native selects are not in the list: they keep their ring after a tap, because it shows where the typing goes.
  - Focus still returns to the control after a menu or a dialog closes. Only the ring is not drawn.
- src/lib/input-modality.test.ts: a pointerdown sets "pointer"; a keydown sets "keyboard"; the remover stops both; a second install adds no second listener.

C2m.5 — TESTS (CI is the proof while the browser does not start)
- e2e/post-wizard-recent.spec.ts PW-171 (from :50; its mobile-360 measurement block :78–97):
  - X is renamed to a THREE-character name made from its slug's last three characters, and Y keeps a long name. Seeding, order, tap and back stay as they are. The `title` expectation follows the new names.
  - Measure at 360 × 800, and again after `page.setViewportSize({ width: 320, height: 800 })`:
    - X's chip shows its whole name (the chip's `scrollWidth - clientWidth ≤ 1`);
    - Y's chip's first child part has the text of Y's first five characters and lies inside the chip's content box (its right edge ≤ the chip's right edge minus its right padding, + 1);
    - the row has no sideways overflow;
    - the centre and tops checks as they are.
- e2e/shell.spec.ts "long location names share one 32px line" (:2209–2258):
  - every chosen level's first part has its first five characters and lies inside its box;
  - every box's width is at least its first part plus its arrow (replaces `Math.min(...widths) >= 40` at :2252–2255);
  - the document has no sideways overflow;
  - the row stays one 32 px line.
  - The label lines at :2256–2257 become the rule: if `#location-row-label-short` is visible, the row has no overflow. And with four levels at 320 × 800 (set after the 360 checks), the short label is NOT visible, the row's accessible name still contains `en["location.rowLabelShort"]`, and every box's first part lies inside the row's visible box (the row clips no name's first five characters).
- e2e/shell.spec.ts "the location row uses the width-specific label" (:2260–2270) stays as it is. On the plain home page the label shows: that is the case with room.
- e2e/house-style.spec.ts — add HS-6 "the focus ring shows after keyboard use only" on /dev/style, using the row 1 three-dots (`style-row-1-more`):
  - read its computed `box-shadow` unfocused (U);
  - click it, click `style-row-1-more-copy`, call `settled(page)`, then expect it focused with box-shadow equal to U;
  - then `page.keyboard.press("Tab")` and `page.keyboard.press("Shift+Tab")`, call `settled(page)`, then expect it focused with box-shadow different from U.
- PW-52's ring check (post-wizard-category.spec.ts :255–261) is a keyboard path and stays as it is; it must still pass.

C2m.6 — DOCS AND CHANGELOG
- docs/features/design-foundation.md: "Cut names" (D104 and D105 in two sentences, CutText and useLabelRoom named) and "Focus ring" (keyboard only; the input marker; what is excluded and why).
- docs/features/location-scoping.md: one line on the row's label stepping aside.
- One changelog line.

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- After this turn's CI is green and the operator has published: a walk of two lines (a short and a long "Used before" name on the phone; a place box after a tap, without the ring).
- Then BUNDLE 10 — the feed engine (docs/governance/feed-engine-spec.md), in its own brief. Then bundle 9's second half: the subcategory menus with the bar's short labels, the scroll area, Part D1 and Part E.

REPORT. First lines:
- done or not done for step 0 and C2m.0 to C2m.6;
- the C2m.0 tables (a), (b) and (c);
- whether the browser started;
- any cited line that read differently;
- any file outside this brief's lists.
Then:
- the six ci-status lines;
- the local runs if the browser started, or "local browser runs unavailable";
- unit tests, format:check, lint;
- the file list from `git diff --name-only f26f891e`;
- "Logs read: … · unavailable: …";
- limitations.
Never "CI green" from a local run.
```
