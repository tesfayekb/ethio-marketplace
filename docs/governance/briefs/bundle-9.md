# Bundle 9 — the house style: brief, version 16 (saved unchanged, 2026-10-09)

```text
BUNDLE 9 — THE HOUSE STYLE, VERSION 16 (2026-10-09). THIS FILE REPLACES VERSION 15. Turn 15 (Part C2m, under the ruling) landed at 946d6e27. It matches version 15 and the ruling. CI on it is RED: 19 gating results. Most of them come from version 15's own design of the cut-name block, which the supervisor specified without trying it in a browser. This version specifies TURN 16 = THE FIX (Part C2n).
Line numbers are as of commit 946d6e27 (dev). This file is public: it is written as build instructions.

ANSWERS TO TURN 15
- Verified by the diff of a2b46f66..946d6e27:
  - the census file;
  - CutText, useLabelRoom and the input marker as version 15 wrote them;
  - the twenty in-scope lines;
  - the CSS rule;
  - PW-171, HS-6, the location-row test and the docs.
  All are accepted as built.
- CI run 37865593933 (completed 01:05:15 UTC): FAILURE, 19 gating results, all classified below. One retried pass (AT-59) is not this turn's.

WHY THE BLOCK CHANGES (read and reproduced by the supervisor in a browser; INC-510)
- (1) The language toggle test fails 6 times, in both projects. The accessible name of the English menu item reads "Engli sh". CutText's head and tail are flex items, which are block-level boxes, and the browser's name computation puts a space between block-level boxes. Every cut name would be read with a break after its fifth character.
- (2) The long-names location test fails 3 times. The place boxes never shrink: a flex wrapper's smallest width is the sum of its parts' smallest widths, and the tail is one unbreakable line as wide as the whole name. The row overflowed by hundreds of pixels. The chips passed only because their `max-w-[45%]` caps them.
- (3) HS-6 fails 4 times. After the mouse choice the ring IS gone, but the box-shadow reads as five transparent layers, not "none". So version 15's "equal to the unfocused value" cannot hold.
- (4) The pill test fails 3 times: shell.spec.ts :881 selects `span.truncate`, and that class is gone.
- (5) The menu test fails 3 times: shell.spec.ts :1015 and :1020 use `row.locator("span")`, which now finds three spans (strict mode).
- The supervisor tried the new block below in Chromium with the app's shapes:
  - accessible names stay whole ("English");
  - textContent is the name once;
  - the five-character floor holds ("Ethio…", "Car", "Cooke…", and Ethiopic);
  - the boxes shrink.
  At 320 px with four place levels the row still did not fit once the label was hidden, so the arrows step aside next (D105: names first).

STEP 0 — keep this brief
- Save this file byte for byte OVER docs/governance/briefs/bundle-9.md (it is already in its saved form). roadmap.md line 3 stays as it is. Tick no roadmap line. On every later turn, read the brief first.

HOW TO WORK
- Order of the turn: step 0; C2n.1 to C2n.5; the report; END THE TURN. Do not stop between steps.
- The turn starts by reading CI for the last commit on dev at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address. Paste the first six lines of ci-status.md.
- Browser tests: try once (`bun run e2e:local e2e/house-style.spec.ts`). If the browser does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506). Nothing runs against ethio-prod or the published site.
- Tests (G38): no assertion is loosened, no timeout raised, no retry added. A test this brief does not name is not edited; if one fails, name it and leave it for a ruling.
- No migration, no database write, no package or dependency change, no new string.
- Scope:
  - src/components/ui/cut-text.tsx and its test;
  - src/components/ui/use-label-room.ts;
  - src/styles.css (two lines in C2n.1);
  - src/components/shell/location-selector.tsx;
  - e2e/helpers/ui.ts (one new helper);
  - e2e/shell.spec.ts, e2e/post-wizard-recent.spec.ts, e2e/house-style.spec.ts;
  - docs/features/design-foundation.md (the "Cut names" lines), docs/_changelog.md;
  - the brief.
  Name any other file in the report's first lines with its reason.
- The commit that is judged by CI ends the turn: END THE TURN and send nothing after it (the platform pushes).

PART C2n — THE CUT-NAME BLOCK, DONE RIGHT

C2n.1 — CutText (src/components/ui/cut-text.tsx), replaced whole
- Keep the props (`text`, `keep = 5`, `className`) and the grapheme split (Intl.Segmenter, fallback Array.from).
- `floor` = the first `keep` graphemes followed by "…" (U+2026) when the name has more than `keep` graphemes; otherwise the whole name.
- Render exactly this structure:
  <span data-cut="" className={cn("inline-grid min-w-0 max-w-full", className)}>
    <span data-cut-text="" className="col-start-1 row-start-1 w-0 min-w-full overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
    <span aria-hidden="true" data-floor={floor} className="cut-floor invisible col-start-1 row-start-1 whitespace-pre" />
    <span aria-hidden="true" data-full={text} className="cut-full invisible col-start-1 row-start-1 h-0 overflow-hidden break-all" />
  </span>
  - The visible element holds the whole name: the accessible name and textContent are the name, once.
  - The two helper elements are not painted and are hidden from screen readers; they carry no text of their own. Their CSS-generated content only sizes the column: the first sets the smallest width (five characters and "…"), the second the widest (the whole name, contributing nothing to the smallest because it may break anywhere).
- src/styles.css, inside `@layer base`, two rules:
  .cut-floor::before { content: attr(data-floor); }
  .cut-full::before { content: attr(data-full); }
- src/components/ui/cut-text.test.tsx, rewritten:
  - "Car": textContent "Car", data-floor "Car";
  - "Cooked food": textContent "Cooked food", data-floor "Cooke…";
  - an Ethiopic name built from am.ts's `location.rowLabel` value (never typed): data-floor is its first five graphemes plus "…";
  - an emoji with a skin-tone modifier counts as one grapheme;
  - both helpers carry aria-hidden="true";
  - the visible element's text equals the input.

C2n.2 — THE ROW'S OPTIONAL PARTS STEP ASIDE IN ORDER (useLabelRoom)
- Add an optional fourth parameter `thenSelector?: string`. The measure:
  - first shows every label and every element matching `thenSelector` inside the row (remove `sr-only` from the labels, `hidden` from the others);
  - if the row's `scrollWidth > clientWidth + 1`, hides the visible labels (`sr-only`);
  - if it still overflows, hides the elements matching `thenSelector` (`hidden`).
  Keep the layout effect and the ResizeObserver on the row only.
- location-selector.tsx:
  - give the arrow (:88) `data-row-arrow=""`;
  - pass `"[data-row-arrow]"` as the fourth argument (:195–206);
  - the row (:218) becomes `gap-x-0.5 md:gap-x-1`;
  - the place box (:78) padding becomes `px-0.5 md:px-2`.
  Nothing else changes. The "Used before" row passes no fourth argument.

C2n.3 — TESTS
- e2e/helpers/ui.ts — a new helper `expectCutFloor(page, cut: Locator)`, where `cut` is a `[data-cut]` element:
  - read its `[data-cut-text]` child's text and the graphemes of that text;
  - if there are 5 or fewer graphemes: the text element's `scrollWidth - clientWidth ≤ 1` (shown whole);
  - otherwise: the text element's `clientWidth` is at least the width of (first five graphemes + "…") − 1, measured with a canvas `measureText` in the text element's computed font.
- e2e/post-wizard-recent.spec.ts PW-171 (:78–121): replace the head checks (:105–116) with `expectCutFloor` on X's and Y's chips (`chip(...).locator("[data-cut]")`), at 360 and at 320. Everything else in the test stays as it is.
- e2e/shell.spec.ts "long location names share one 32px line" (`assertNameHeads`, :2252–2293), for every `location-level-*` box:
  - `expectCutFloor` on its `[data-cut]`;
  - its displayed text is its `[data-cut-text]` text;
  - its `title`, when it has one (a chosen level), equals that text;
  - the box lies inside the row's box (left ≥ row left − 1; right ≤ row right + 1).
  The head-span measurements and the width ≥ head + arrow check go. After the 360 checks, and again at 320 with four levels, the row has no overflow (`scrollWidth - clientWidth ≤ 1`). The rest of the test stays as it is (the label's rule and the accessible name at 320).
- e2e/shell.spec.ts :881: `account.locator("span.truncate")` → `account.locator("[data-cut]")`.
- e2e/shell.spec.ts :1015 and :1020: `row.locator("span")` → `row.locator("[data-cut]")`.
- e2e/house-style.spec.ts HS-6 (:151–167): replace both equality checks with a "drawn ring" reading of the computed box-shadow. Split the layers at commas outside parentheses. A ring is drawn when some layer has a colour whose alpha is above 0 AND a spread above 0. After the mouse choice: focused, no drawn ring. After Tab and Shift+Tab: focused, a drawn ring.
- Census (G29; INC-500's rule now includes class and tag selectors): `grep -rn 'truncate\|locator("span")' e2e` printed exactly those three lines at 946d6e27. Run it again and name any other line that reaches an element now holding CutText.

C2n.4 — docs/features/design-foundation.md: replace the lines of its "Cut names" section (:370) to describe the grid structure (one visible element with the whole name; two invisible size-setters; the accessible name stays whole) and the order in which a row's parts step aside (label, then arrows).

C2n.5 — One changelog line.

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- After this turn's CI is green and the operator has published, a two-line walk: a short and a long "Used before" name on the phone; a place box after a tap, without the ring.
- Then BUNDLE 10 — the feed engine, with a turn for the saved place on the account and the "different place" notice if the operator agrees.

REPORT. First lines:
- done or not done for step 0 and C2n.1 to C2n.5;
- the C2n.3 census;
- whether the browser started;
- any cited line that read differently;
- any file outside this brief's lists.
Then:
- the six ci-status lines;
- unit tests, format:check, lint;
- the file list from `git diff --name-only 946d6e27`;
- "Logs read: … · unavailable: …".
Never "CI green" from a local run.
```
