# Foundations turn C — the ruling (saved byte for byte)

```text
RULING — turn C: a press shows at once (the operator's D263). Base: dev 57c72d3c. Tier B (every page's first paint). No migration, no new dependency; two new strings (D272's switch). Lovable. Saved as docs/governance/briefs/foundations-turn-c.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-c.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

B2 VERIFIED (dev 57c72d3c, fresh clone):
- step 0's sha256 f483eb24… matches; AGENTS.md untouched;
- INC-1028: the patch_copy line (3b) changes line 224 only and names INC-1028 and DEC-316; the census of clock-reading proofs is in the report, and allowlist line :5 states the true cause; guard debt recorded (G0.4);
- /dev/style 247;
- dark card C live in `.dark` and themes.ts (#28342E, edge #42504A, tier fills #3A2F1D / #243A2F), equal to /dev/style's candidate C;
- the heading 21/25/30 px, 800, −0.9 px, the place in primary, through OneLineSlot (src/components/ui/one-line-slot.tsx, beside CutText; the brief's "src/components/layout" was the supervisor's wrong path);
- the card body 13/14/14 px, compact 9/8 and 7/6; the price 16 / 13 / 12 px bold; the Negotiable pill on success-soft with the success ink; the place line's rule and the leaf ink, the Featured line on its own ink (4.34 : 1 measured with the leaf ink); the well on photo-empty;
- CLEAN pending CI on 57c72d3c. The laws step and `bun run checks` did not run in B2 (the turn's time ran out), so this turn runs both.
One follow-up from B2, in this turn: OL-1 loops over the literal pair ["en", "am"] (e2e/sage-cards.spec.ts :264). It reads the public languages from the app instead, so a language added later is checked too (G0.6).

CI FIRST: the run on 57c72d3c (B2) may still be running. Fix any red it shows first, from its failure body.
Read the run on 57c72d3c at the start and AGAIN before your push (S502). Any other red that is not infrastructure is fixed first, from its failure body.

THE OPERATOR'S WORDS:
- D263 (2026-10-30 19:03 New York): "So while a link is clicked if we can give a feel it's clicked. On menu items when a menu item is clicked imediately raise it as selected item while it's closing and a submenu or page is loading."
- D270 (2026-10-31 09:26 New York): "The press did back covers not just left side menu which it should by changing clicked or pressed items to raised immediately". Asked which things, he chose: everything tappable — menu items, tabs, location and breadcrumb segments, list rows, buttons, links and cards all lift to the raised look the moment they are pressed; a chosen menu item, tab or segment then stays raised as the current one.
- D271 (2026-10-31 09:30 New York): "But even the bottom buttons in small screens like home etc. for example even if I click home from breadcrumb or top menue item, the bottom home button doesn't show it was selected. Even if I'm in signin page, the bottom button doesn't show it was the active page".
- D272 (09:34 New York): "I see in small screens currently on iPhones on other sites when I click there is a click feeling I get, what was was that and if we can do that on top of the visual changes". Told it is a haptic tick, he chose: menu items, tabs, segments, the bottom bar, list rows and buttons tick; plain text links and cards do not; a Settings switch turns it off.

YOUR C PLAN (written 12:21Z; read it whole with `git show 836d1030:.lovable/plan.md`, since the S6 plan has since replaced that file), RULED in DEC-317:
1. Two layers, as you proposed. The frame (which panel, the bands, the breadcrumbs, the location band) stays on useShownPathname, so INC-581 holds. The chosen mark on a menu item reads useMenuAt(): the pending location while a navigation is in flight, otherwise the shown path. Only the item's look and aria-current move early, and a cancelled or failed navigation brings the old mark back by itself.
2. The pressed look is the raised look (D270), not a darkening overlay: no `--press` token. One PRESSED mechanism beside the row constants in menu-row.ts maps each primitive to its own raised state, from the existing Sage tokens (the lift and pill tokens the current row, the band segment's current pill, the card's lift and the raised button already use), and shows it at pointerdown:
   - a menu row, a list row, a tab and a band segment take their current look (the raised pill), and the chosen one stays raised as the current item through useMenuAt (item 1);
   - a card lifts to its raised card shadow;
   - a button, an icon button and a link take their raised state (a raised button lifts one step higher); a link with no surface of its own takes the raised pill behind its text.
   - Name each primitive's raised state in the report, with the token it reads.
   - It is carried by the primitives only (Button, IconButton, Tabs, the menu and list rows, the card link, the band segments, the plain link). Screens never write a pressed class. sidebar.tsx's own `active:` classes move onto PRESSED.
   - The raised look keeps the element's text at 4.5 : 1 or more in both themes, measured in-page.
   - It comes on at once and leaves in at most 120 ms when the press ends without a choice; under reduced motion it comes and goes with no transition, and nothing moves (the lift is a shadow and a fill, never a change of size or place).
3. src/lib/press.ts, the one delegated listener mounted once in the root: it marks the nearest `[data-pressable]` on pointerdown, and on Enter or Space keydown, and clears it on pointerup, pointercancel, keyup, blur and the start of a scroll. It also clears when a touch moves past a small slop and becomes a scroll, so a scroll never flashes a press. A disabled element (disabled or aria-disabled) is never marked.
4. D271, the current item comes from the page, on every menu. Today bottom-bar.tsx marks it from useShell().activePanel (:96–:102 Home only when signed in and only after its own tap set the panel; :112, :136, :160), and Post (:124–:131) and Sign in (:146–:154) are never marked. So a page reached by a breadcrumb, a top-bar link, the back button or a typed address leaves its item unmarked, and a signed-out person never sees one.
   - Every item of every menu takes its current mark from the one rule (isCurrentAt through useMenuAt), signed in or out, however the page was reached: the bottom bar, the rail, the side panels, the top bar's items and the panel tabs.
   - Each bottom-bar item is current on its own section's pages, the same rule as the rail: Home on the marketplace's pages (home, a category, search, an ad), Post on the posting pages, Sign in on /auth, Account on /account and its pages, My listings and Admin on theirs.
   - The census, by definition: every place that marks a current item, each marked "reads the one rule" or "reads something else", file:line. activePanel stays only for the frame (which panel the rail shows).
5. D272, the haptic tick, in the same press.ts (no new dependency; no npm package):
   - It fires once, on a tap's activation (the click), never at the start of a scroll or on a press that ends without a choice, and only on a coarse pointer.
   - Only these tick: menu rows, list rows, tabs, band segments, the bottom bar and buttons (each primitive opts in, as with PRESSED). Plain text links and cards never tick.
   - Android and other browsers with navigator.vibrate: one short pulse (10 ms). iPhone Safari, which has no vibrate: the known switch-control workaround. One hidden `<label>` with an `<input type="checkbox" switch>`, made once and reused, clicked on activation. It is hidden from assistive technology (aria-hidden, no tab stop, never announced) and never takes focus. Where neither path exists, nothing happens and nothing is reported.
   - A switch turns it off, on by default, kept per device (browser storage, read and written inside try/catch). It sits in Settings and is reachable signed out too. Name the place in the report, from the census of where the device's other per-device choices live (the theme choice among them).
   - If the census shows the switch workaround cannot run from the press listener's activation (for example, a click from script does not tick), STOP before writing this part and say what you found.
   - Two new strings, the switch's label and its one-line help, in every public language through the app's string mechanism. Every Amharic value is listed key by key with its English in the report (G43).
   - The Amharic and the other languages are read by the supervisor before the turn ships.
   - The workaround's limit is named in the code beside it: Apple may stop the switch's tick; then the tick simply does not happen.
6. CF-PRESS-1, rules 1–3, as you proposed, with planted PR-1…3; its allowlist starts empty. Rule 3 also fails a current mark read from activePanel or any panel state. Rule 4 fails a navigator.vibrate call, or a `switch` checkbox, outside press.ts.

TESTS, as in your plan: PR-U1…4 and MA-U1…3; e2e/press.spec.ts PS-1…4 at 360 coarse and 1440 fine, light and dark. PS-1 reads, within one frame of pointerdown, each element's raised state (its shadow layers and fill) on a menu row, a tab, a band segment, a list row, a button, a link and a card, and that its box did not move. Add PR-U5, a touch that becomes a scroll leaves no press, and PR-U6, a disabled button is never marked.
- PR-U7 (D272): a menu row's and a button's activation tick once, by vibrate where it exists and by the hidden switch otherwise; a card, a text link, a scroll and a press that ends without a choice do not; with the switch off nothing ticks. PS-6: the switch at 360 turns the tick off, and the choice survives a reload.
- PS-5 (D271), at 360, signed out and signed in: reach Home from the breadcrumb and from the top bar, /auth from a link, a category by its address and an ad by the back button; each time the matching bottom-bar item is current (raised, aria-current="page") and no other is.
- G38: every e2e reading aria-current after a navigation settles, named old and new; INC-581's frame specs stay untouched.
- The touched specs whole, both projects, retries 0. A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges.
- Growth: your ESTIMATE is 0.4 KiB or less per page. Report each page's measured change with its cause; a ceiling crossed follows DEC-296's form.
- Two turns, split as you proposed. B2, a smaller turn, ran out of time before its checks.
  - THIS TURN is C1: items 2 and 3 (the raised press look and press.ts), CF-PRESS-1 rules 1–2, PR-U1…6, PS-1 and PS-4, and B2's OL-1 follow-up.
  - C2 follows when the supervisor sends "continue with C2": items 1, 4 and 5 (the chosen item, D271 and D272), rules 3 and 4, MA-U1…3, PR-U7, PS-2, PS-3, PS-5 and PS-6.

SCOPE (by area): as your plan's "Technical scope", each file with its tests, plus the bottom bar and every menu file the D271 census names, the Settings page and the per-device choices it reads (D272), src/i18n/locales/ (the two new keys) and the i18n map, e2e/sage-cards.spec.ts (OL-1's languages), docs/features/design-foundation.md, docs/governance/mechanisms.md (a row for each mechanism), docs/_changelog.md, roadmap.md, the brief and the report. AGENTS.md is not in scope.

HOW TO WORK: K1–K6.
- The laws step first.
- Write the report, docs/governance/reports/foundations-turn-c.report.md, BEFORE `bun run checks`. C1 writes it, and C2 adds its own section. It covers:
  - step 0's sha256;
  - the CI lines;
  - the mechanisms as built;
  - CF-PRESS-1 with its planted cases;
  - the tests' results;
  - G38;
  - growth;
  - the unit count;
  - K2;
  - git diff --name-only 57c72d3c.
- Then `bun run checks` once on the final tree, run whole. Add its fast line and, if it finishes, its last line. If a step fails, fix it at its root and say so. If the turn's time runs out first, push with "slow steps: not finished — CI judges". A turn never ends without its report.

Push, and END THE TURN.
```
