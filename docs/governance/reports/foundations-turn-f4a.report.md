# Turn F4a + F4a-2 — an open list stays in sight (D267, DEC-315) — report

## 1. Step 0

- F4a: docs/governance/briefs/foundations-turn-f4a.md; sha256 8f20dac386262fe7d24da0d19dc86e3ef5df0a2e9156f521df22bb8912b8ff11 (matches).
- F4a-2: docs/governance/briefs/foundations-turn-f4a-2.md; sha256 f153dcc9bb5cae5873eb466fc7ce42735e5842eb72ff415ccf5a590f3bb5f946 (matches). Roadmap line 3 names both, and prettier --check passes on it.

## 2. CI

- f25f6e9e: cancelled at 10:13Z, so no verdict (per ruling).
- b2bbc9f3 (run 41190843148): FAILURE. Two failures: TH-2 and Semgrep ERROR ×2 (e2e/dark-cards.spec.ts :99). Both are fixed in §5.
- 3caa699b (run 41191861394, 10:40:39Z): FAILURE. The failures are the same: Component tests (TH-2, the only FAIL in its failure body) and Semgrep. Both are fixed in this turn. F4a did not re-read this run before its push (S502); this report records it.
- e1dc86f4: the evidence branch showed no completed run when I read it before this push.

## 3. The mechanism as built

- **src/lib/visible-area.ts:**
  - `areaFrom` (pure): finds the lowest edge of the drawn `data-chrome="top"` boxes and the highest edge of the drawn fixed or sticky `data-chrome="bottom"` boxes. With no marker drawn, it falls back to html's scroll-padding, never to zero. It keeps an 8 px margin inside each edge.
  - `visibleArea()` reads the area now.
  - `collisionPaddingNow()` gives the per-side padding.
- **Markers:**
  - top: `shell-band` and `shell-subband` (app-shell.tsx);
  - bottom: `bottom-bar` (bottom-bar.tsx), `form-layout-actions` (form-layout.tsx) and the form section's actions bar (form-section.tsx).
  - The first paint gains only these attributes.
- **searchable-picker.tsx:**
  - `placeList(rect, wanted, area, scrollRoom)`: opens down when it fits (no scroll, ruling 4). When the room below is short and the page can scroll, it scrolls the control up toward the area's top and opens down. Only when the page cannot scroll far enough does it open on the larger side. The height is always bounded by the room.
  - Scroll-then-open waits for `scrollend` or two still frames, and is instant under reduced motion (ruling 3). The list is held at opacity 0 during the scroll; visibility:hidden would drop the phone search box's focus and close the list.
  - The panel is a column bounded by `--picker-max-height`, and its rows scroll in `LIST_SCROLLER` (`min-h-0 flex-1 overflow-y-auto`, menu-row.ts).
- **Facade menus (dropdown-menu-impl.tsx) and, from F4a-2, popover.tsx:** both read `collisionPaddingNow()` when they open. toolbar-panel.tsx's own `collisionPadding={16}` is gone.
- **Imports of visible-area.ts:** dropdown-menu-impl.tsx (on demand), searchable-picker.tsx and popover.tsx. F4a-2 ruling 2 adds the popover.

## 4. Stop 1 and its fix

- **Stop 1** (F4a): CL-E7 had the list bottom at 659 against a visible bottom of 591. CL-E8 had the list top at 62 against a visible top of 91.
- **Root** (ruled): the consumers' own `max-h-64` on step-pricing.tsx :527 and phone-number-field.tsx :300.
- **Fix:** both now take `LIST_SCROLLER`, and the picker owns the panel's height. CF-LIST-1 refuses a height or overflow-y class on a picker panel or scroller (CL-10). Both `test.fixme` holds are removed.

## 5. CI reds fixed

- **TH-2:** themes.test.ts's `block()` now reads values through `cssValue()`, which collapses whitespace and removes any just inside parentheses. A Prettier-wrapped `oklch(\n 0.305 0.032 78\n )` therefore reads as `oklch(0.305 0.032 78)`. Planted case TH-2b.
- **Semgrep:** DCC-2's probe is built with createElement and setAttribute; there is no innerHTML. The widened laws step ran Semgrep 1.179.0 with rules a84ff9cc (CI's removals applied) on the 14 changed files: 0 findings.

## 6. INC-1030 widened (TC-E4)

turn-checks.ts `LAWS_STEPS` puts three steps first:
1. the scripts/ tests;
2. `bun scripts/ci/laws-changed.ts units`: the unit tests in the folders of the files changed since TURN_BASE (default HEAD~1, working tree included);
3. `bun scripts/ci/laws-changed.ts semgrep`: Semgrep at ERROR on those files, with the version and rules SHA read from ci.yml. It uses its own pip venv and fetches the rules commit as a codeload archive, because `git checkout` is refused in the sandbox.

TC-E4 is planted: the order, the pins equal to ci.yml's, the folder choice, the target filter, and a FAIL showing in the fast line.

## 7. Guards

- **CF-AREA-1** (scripts/conformance/visible-area.test.ts) refuses three things:
  - a placement read of the chrome outside visible-area.ts;
  - a DropdownMenuContent or PopoverContent with its own collisionPadding;
  - an import of visible-area.ts outside its three readers.
- The allowlist is empty, and the test asserts it stays empty. Planted cases: VA-1…3 (VA-2 includes the popover).
- **CF-LIST-1:** CL-10 is added, and CL-7's clean case now uses `LIST_SCROLLER`.

## 8. Tests

- **Unit:** VA-U1…4, PL-U1…5, TH-2b, CL-10, TC-E4 and VA-1…3 pass. Focused runs:
  - themes, choice-lists, visible-area, picker, look and test-ids: 45 passed;
  - turn-checks: 10 passed.
- **E2E:** `bun run e2e:local -- e2e/choice-lists.spec.ts e2e/dark-cards.spec.ts`, both projects, retries 0: **38 passed, 0 failed, 54 skipped** (4.6m).
  - The skips are the width/project pairing and D267's 360-only cases.
  - CL-E7 (currency) passes centred, near the top and near the bottom, light and dark. So do CL-E8 (phone code, all three spots) and CL-E9 (language, location, row actions, account).
  - The browser is Nix Chromium 146 (E2E_CHROMIUM_PATH), because the managed browser lacks libglib in this sandbox.
- **Fixture change in CL-E9:** a control drawn inside the top chrome (the header's language and account menus) opens over the bands. Its list's top bound is therefore the control's own bottom edge.

## 9. Growth

Public pages gain the `data-chrome` attributes and the popover's area read. visible-area.ts is about 0.4 KiB raw, and it reaches the first paint only where popover.tsx already does. Page ceilings are judged by `bun run checks` / CI below; no ceiling was raised in this turn.

## 10. Unit count

See §12 (from `bun run checks`, if it finishes).

## 11. K2

- src/features/posting/preview/listing-detail.tsx :524 reads the sticky sub-band itself. Roadmap line for the ad-page turn (S5).
- src/features/admin/translations/language-picker.tsx :74 and src/features/admin-categories/category-dialogs.tsx :615 have `max-h-64` scrolling lists. They are not pickers that open from a control, so they are outside CF-LIST-1's domain. Reported only.

## 12. Checks

(appended after `bun run checks`)

## 13. Files (git diff --name-only 3caa699b)

docs/generated/i18n-usage.json, docs/governance/briefs/foundations-turn-f4a-2.md, docs/governance/briefs/foundations-turn-f4a.md, docs/governance/reports/foundations-turn-f4a.stop-1.md, docs/governance/reports/foundations-turn-f4a.report.md, e2e/choice-lists.spec.ts, e2e/dark-cards.spec.ts, public/i18n-usage.json, roadmap.md, scripts/ci/laws-changed.ts, scripts/ci/turn-checks.test.ts, scripts/ci/turn-checks.ts, scripts/conformance/choice-lists.test.ts, scripts/conformance/visible-area-allowlist.txt, scripts/conformance/visible-area.test.ts, src/components/app-shell.tsx, src/components/layout/form-layout.tsx, src/components/searchable-picker.test.tsx, src/components/searchable-picker.tsx, src/components/shell/bottom-bar.tsx, src/components/shell/form-section.tsx, src/components/shell/menu-row.ts, src/components/shell/toolbar-panel.tsx, src/components/ui/dropdown-menu-impl.tsx, src/components/ui/popover.tsx, src/features/posting/phone-number-field.tsx, src/features/posting/step-pricing.tsx, src/lib/themes.test.ts, src/lib/visible-area.test.ts, src/lib/visible-area.ts.

## 14. Limits

- **Not done:** the docs updates the scope names (design-foundation.md, mechanisms.md, _changelog.md). They are owed to F4b.
- **Departure:** the laws step's Semgrep fetches the rules commit as an archive, not with git checkout.
- **Departure:** its units step defaults to HEAD~1 when TURN_BASE is unset.
- **Not read:** the e1dc86f4 run was not on the evidence branch when read.
