# Bundle 9 — the house style: brief, version 12 (saved unchanged, 2026-10-08)

```text
BUNDLE 9 — THE HOUSE STYLE, VERSION 12 (2026-10-08). THIS FILE REPLACES VERSION 11. Turn 11 landed at 43307e70 and is verified by diff; CI on it is green and main = 43307e70. The operator published and walked the site on his phone and computer on 2026-10-08: everything checked passed, with three changes asked. This version specifies TURN 12 = PART C2j — THE WALK'S THREE CHANGES.
Line numbers are as of commit 43307e70 (dev). This file is public: it is written as build instructions.

ANSWERS TO TURN 11
- C2i.0 and C2i.1 verified at 43307e70: the walk split exactly as written. CI run 37774427456 (completed 12:31:53 UTC): green, no retried pass, promoted. PW-58 is green on it, so no further work on PW-58.
- The browser still cannot start in your sandbox. Version 11's rule continues, and you do not need to try `install-deps` again: CI on the turn's final commit is the proof for the files the turn changes. Say "local browser runs unavailable" in the report's first lines.

THE OPERATOR'S WALK (2026-10-08, his words)
- (W1) The posting form, category step: "INSIDE WIZARD THE USED BEFORE SHOULD REMAIN IN ONE ROW, CURRENTLY IN GOES TO 2 IN MOBILE".
- (W2) Account: "THAT IS NOT THE APPROPRIATE PLACE- REMOVE. ITS ALSO THERE IN BIGGER SCREENS. SO REMOVE ... OR KEEP IT AT TOP RIGHT WHERE SIGNIN USED TO BE." He means the Sign out button at the end of the Account page. The supervisor chose his second option: the same account menu as on computers, at the top right on every width.
- (W3) The caption under the breadcrumbs: "SHOWING LISTINGS NEAR ....., RATHER SHOULD SAY SHOWING LISTINGS IN XYX. OR SILMPLY LISTINGS IN XYZ. SAME LANGUIAGE UPDATE IN OTHER LANGUAGES." Then: "MAY BE TEXT BEFORE THE LOCATION SAYING "LISTINGS SHOWING IN" THEN THE COUNTRY, STATE, CITY BOXES?" — chosen: a label before the boxes, "Showing listings in" from 768 px and "Listings in" on phones; in Amharic "ማስታወቂያዎች በ" for both (his words, 2026-10-08: "2. ማስታወቂያዎች በ{country}, etc. no need separate mention of country just before the box. 1) ማስታወቂያዎች በ its same for both").

STEP 0 — keep this brief
- Before anything else, save this file byte for byte OVER docs/governance/briefs/bundle-9.md (it is already in its saved form: the header line and one fenced text block). On every later turn, read that file first. roadmap.md line 3 stays as it is; tick no roadmap line in this turn.

HOW TO WORK
- Order of the turn: step 0; C2j.0 THE CENSUS (STOP rule there); C2j.1 to C2j.4; the report; END THE TURN. Do not stop between steps: a clean point is not a reason to stop. Stop only for a question this brief cannot answer, for the one STOP this brief names, or the end.
- The turn starts by reading CI for the last commit on dev: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address (you cannot git-fetch that branch). Paste the first six lines of ci-status.md. A red that is not a cancelled run is named in your report's first lines and fixed first.
- Browser tests are started only with `bun run e2e:local <files>` or `bun run e2e:changed` (AGENTS.md; DEC-146). Nothing signs in to, or runs a test against, ethio-prod or the published site.
- Census first: before the first edit, read whole src/components/shell/app-header.tsx, src/features/account/account-overview.tsx, src/features/posting/step-category.tsx, src/components/shell/location-selector.tsx and e2e/helpers/ui.ts, and say in the report's first lines if any line this brief cites reads differently.
- Tests (G38): a red is fixed at its root. No assertion is loosened, no timeout raised, no retry added, no test skipped or moved to make a run pass. A test line that finds an element this turn removes or moves is changed to find the element that now plays that part, keeping what it asserts, and listed in the report (file, line, old → new). A census searches test ids AND accessible names. ANY OTHER test that fails is not edited: name it with its line and what it asserts.
- Test ids: `account-sign-out` is removed; no new id.
- No migration, no database write, no package or dependency change. TWO new string keys, `location.rowLabel` and `location.rowLabelShort`, and ONE removed key, `location.guessAreaCaption` (C2j.3). The Amharic is copied exactly as given below, never retyped from memory.
- Scope: only the files a step names, the spec files the census lists, the two locale files, and the generated files the scripts regenerate (the i18n usage maps). Name any other file in the report's first lines with its reason.
- Closed surfaces (G22): the workflow files, the failure reporter, the migration check and e2e/global-setup.ts are not touched. e2e/helpers/ui.ts is opened for C2j.2 ONLY.
- Records: you write the changelog line; the decision and incident ledgers are the supervisor's.
- The commit that is judged by CI ends the turn: when the work is done, END THE TURN and send nothing after it (the platform pushes).

PART C2j — THE WALK'S THREE CHANGES

C2j.0 — THE CENSUS (read-only), and the one STOP
- List every e2e line (specs and helpers) that uses:
  - `account-sign-out`;
  - "Sign out" on the Account page;
  - `account-menu` being hidden or absent below 768 px, or the drawer identity as the phone's signed-in proof (`expectDrawerIdentity`);
  - `location.guessAreaCaption` or `location-guess-caption`;
  - `post-category-recent-row` or `post-category-recent` geometry.
- Known lines:
  - e2e/shell.spec.ts :955–965 ("Sign out is at the end of Account");
  - e2e/shell.spec.ts :2169–2495 (`location-guess-caption`, 9 lines) and :2291 (the caption's English);
  - e2e/helpers/ui.ts :170–200 (openAccountMenu and expectSignedIn, mobile branches), :321–329 (expectDrawerIdentity), :348–357 (signOutViaUi's mobile branch).
- STOP after the census, before any edit, if it lists more than 30 lines to change: report the list; the supervisor splits the turn.

C2j.1 — W1: "USED BEFORE" ON ONE LINE (src/features/posting/step-category.tsx :221–249)
- The row `post-category-recent-row` becomes one line at every width: `flex flex-nowrap items-center gap-2 min-w-0` (no wrap).
- The label "Used before:" is `shrink-0`.
- Each chip is `min-w-0 shrink` with a `max-w-` so two chips share the rest of the line. Its name sits in a `truncate` span, so a long name ends in "…". The chip's `title` and its accessible name carry the full category name.
- The chip stays at least 44 px tall (`min-h-11`), and its selected and unselected styles are unchanged.
- Test (in e2e/post-wizard-recent.spec.ts, beside the existing recent-chip tests, with the scratch categories those tests already create — J3; give them long scratch names): at 360 × 740 with two chips, the row is one line — every chip's top equals the label's top ± 2. The row does not scroll sideways. The full names are each chip's `title`.
- G29 census: list every other row of choice chips in the posting wizard's steps (a `flex-wrap` row of buttons) with its file and line, and say whether it wraps at 360 with real-length names. Change none of them; the supervisor rules on them.

C2j.2 — W2: SIGN OUT IN THE ACCOUNT MENU AT THE TOP RIGHT, AT EVERY WIDTH
- src/features/account/account-overview.tsx :247–255: the Sign out button (`account-sign-out`) is removed at every width. Remove its import if it becomes unused. `requestSignOut` stays where other code uses it.
- src/components/shell/app-header.tsx :241–286: the account menu's trigger (`account-menu`) shows at every width, signed in. Its class `hidden … md:inline-flex` becomes `inline-flex`. The name span (:255–257) stays `hidden md:inline`, so a phone shows the picture only, at the top right, where the Sign in link used to be.
- The menu itself is unchanged: the name (`account-menu-identity`), Profile, Settings, and Sign out last (`account-menu-sign-out`).
- Signed out on phones: unchanged (the bottom bar's Sign in; the top bar's Sign in link stays `hidden md:inline-flex`).
- The top bar must still fit at 320 px with no sideways scroll; the width walk proves it.
- Helpers (e2e/helpers/ui.ts):
  - openAccountMenu and expectSignedIn: the phone branch (expectDrawerIdentity) is removed, so the computer path runs at every width — open `account-menu`, then `account-menu-identity` and `account-menu-sign-out`.
  - signOutViaUi below 768: openAccountMenu, then `account-menu-sign-out`. From 768 it stays as version 11 made it.
  - expectDrawerIdentity is removed if nothing else calls it.
  - `signedInMarker` stays `bottom-bar-account` below 768.
- Tests:
  - e2e/shell.spec.ts :955–965 becomes "Sign out is in the account menu at the top right @private-identity": at 360, `account-menu` is visible inside `shell-topbar`. Open it: its identity line and Sign out are visible. Sign out: the bottom bar's Sign in shows and `account-menu` is gone. `/account` has no `account-sign-out`.
  - Every census line that asserts `account-menu` hidden below 768 when signed in now asserts it visible.
  - "the menu says who is signed in" (the opened menu's `drawer-identity`) stays.

C2j.3 — W3: "LISTINGS IN" BEFORE THE PLACE BOXES (src/components/shell/location-selector.tsx :198–266)
- The operator's choice (2026-10-08): a text label at the start of the location row, then the country, region and city boxes. The caption after the boxes goes away.
- The visible label replaces the pin icon and its hidden "Area" text (:203–206). Two new keys, chosen by the window's width only:
  - `location.rowLabel`, shown from 768 px (`hidden md:inline`):
    - English: `Showing listings in`
    - Amharic, these exact characters (U+121B U+1235 U+1273 U+12C8 U+1242 U+12EB U+12CE U+127D, a space, U+1260): `ማስታወቂያዎች በ`
  - `location.rowLabelShort`, shown below 768 px (`md:hidden`):
    - English: `Listings in`
    - Amharic: the same characters as above, `ማስታወቂያዎች በ`
  - The operator wrote both Amharic labels himself (2026-10-08). In Amharic the boxes name the place directly after "በ", so there is no separate word for the country before the box.
- Each label is `shrink-0 text-sm text-muted-foreground` on the row's one 32 px line. The one shown is the row's accessible label: `aria-labelledby` on the row's group of boxes, pointing at both spans (only the displayed one is read).
- The caption span `location-guess-caption` (:250–266) is removed.
- Whether the area was guessed or chosen stays readable by tests as an attribute on the row: `data-area-source="guess"` or `"chosen"`, from the same `guessInUse` value.
- `location.guessAreaCaption` is removed from both locale files.
- Tests (e2e/shell.spec.ts):
  - every line that asserts `location-guess-caption` visible or absent (9 lines, :2169–2495) asserts the row's `data-area-source` instead — "guess" where the caption was visible, "chosen" where it was absent;
  - the lines that compared the caption's text (:2291 and its four callers) compare the selected box's name instead (`location-level-*`), which still names the guessed place;
  - the one-line rule holds at 360 with the short label: the row is 32 ± 1 px with long scratch names, and each box keeps at least about 6 characters before "…" (report the boxes' widths); from 768 the long label shows, below 768 the short one.
- Run the i18n scripts so the usage maps and the coverage checks are current. The report lists both new keys with both values and the Amharic's code points as printed by a script.
- Census only: every other user-visible string with "near" (known: `feed.heading` "Listings near {location}", en.ts :251). Change none: the feed engine turns the feed's heading into place labels.

C2j.4 — DOCS:
- docs/features/design-foundation.md: the account menu at the top right at every width; Sign out in it; "Used before" on one line.
- docs/features/panels.md if it names Sign out on the Account page.
- The location doc that names the caption.
- One changelog line.

LOCAL RUNS: only if the browser starts (it did not in turns 10 and 11). Each file whole, alone, both projects, 2 workers, 0 retries, fake mode: e2e/shell.spec.ts, e2e/post-wizard-recent.spec.ts, e2e/phone-frame.spec.ts, e2e/smoke-auth-i18n.spec.ts, e2e/auth-signout.spec.ts, e2e/i18n-coverage.spec.ts, and every spec file the census changed. Otherwise "local browser runs unavailable", and CI on the final commit is the proof.

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- The records turn for bundle 9 (documents only) — the supervisor's compile, imported word for word.
- Then BUNDLE 10 — the feed engine (the operator approved its spec on 2026-10-08).
- After it: subcategories in the menus (with the short bottom-bar labels), the scroll area, PART D1.

REPORT. First lines:
- done or not done for step 0 and C2j.0 to C2j.4;
- the C2j.0 census and, for each line changed, old → new;
- the C2j.1 chip-row census;
- the "near" census;
- any cited line that read differently;
- any file outside this brief's lists;
- every test left red that you did not edit.
Then:
- the six ci-status lines;
- `location.rowLabel` and `location.rowLabelShort` in both languages, with the Amharic code points;
- local runs, or "local browser runs unavailable";
- format:check, lint, the i18n checks;
- the file list from `git diff --name-only 43307e70`;
- "Logs read: … · unavailable: …";
- limitations.
Never "CI green" from a local run.
```
