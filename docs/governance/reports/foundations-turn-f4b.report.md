# Foundations turn F4b — report

## 1. Step 0

- Brief saved byte for byte as `docs/governance/briefs/foundations-turn-f4b.md` (one fenced block).
- `sha256sum` of the text between BEGIN and END (with its final newline): `d892d08c510c68937065026590ddd93bc0f72399017f8e9b7ee7b295e94e5036`, equal to the value given.
- roadmap.md line 3 names the brief; `prettier --check roadmap.md`: "All matched files use Prettier code style!".

## 2. CI lines

- e1dc86f4 (F4a), run 41193131306: FAILURE (Semgrep ×2, component tests, first-paint budget; fixed in F4a-2). E2E passed with one flake: LY-6, mobile-360, shard 6, "Expected: up, Received: down" at :1001.
- e1e736df (F4a-2), run 41196381346, completed 11:38:31Z: FAILURE, only the first-paint budget job. The pages over: /admin/countries 341.3/341, /admin/coverage 334.0/334, /admin/impersonation\_/$sessionId 312.2/312, /admin/roles 309.2/309, /admin/screening 383.1/383, /admin/users 308.2/308; inside the NEAR band: /admin/listings 357.8/358, /admin/listings\_/$listingId\_/edit 405.7/406, /admin/places 342.8/343. Cause: F4a-2's popover reads `collisionPaddingNow`, so src/lib/visible-area.ts joins the admin toolbar's first paint. All nine raised in DEC-296 form, each with this cause. This is a departure from F4a ruling 2 ("visible-area.ts never on a first-paint module"), named in K2 below; popover.tsx is not in this turn's scope.

## 3. CI first

- **LY-6, root.** Its bottom-edge scenario expected the pre-F4a flip "up". Under D267 the picker scrolls the field up and opens down whenever the page can still scroll, so the answer depends on how much the page can scroll. The old `toHaveAttribute("data-placement","up")` passed against the first, pre-scroll placement, and the read at :1001 then found "down". The fix is in the mechanism and the test. The picker sets `data-settled="true"` on its panel only after the scroll has ended and the side is drawn, and clears it on each re-place (searchable-picker.tsx, the settled mark only). LY-6 waits for that mark, then asserts the option is in the viewport and is what the finger hits, with placement either side. The choice-lists judge and `expectInSight` wait for the same mark (`expectSettled`). No longer wait, no retry. CI's repeat lane proves it.
- **Laws step base (TC-E5).** `turnBase(env, roadmap, readBrief)` in laws-changed.ts: TURN_BASE, else the `Base: dev <sha>` of the first brief on roadmap line 3, else null, and the step throws "[laws] no turn base: …". It never falls back to HEAD~1. TC-E5 is planted in turn-checks.test.ts.

## 4. The parts as built (D268)

- menu-row.ts: `LIST_LABEL` = `flex min-h-9 min-w-0 items-center px-3 text-sm font-semibold text-muted-foreground`; `LIST_SEPARATOR` = `-mx-1.5 my-1 h-px bg-hairline` (the existing hairline token, no new colour); `LIST_ICON` = `size-4 shrink-0 text-current`.
- dropdown-menu-impl.tsx: Label reads `LIST_LABEL` and wraps string children in CutText; Separator reads `LIST_SEPARATOR`; new `DropdownMenuIcon` (Radix Slot, aria-hidden, `LIST_ICON`). dropdown-menu.tsx exports it via `inside("DropdownMenuIcon")`.
- app-header.tsx: the account menu uses the facade parts only. "Profile" opens /account (`account-menu-profile`), "Settings" opens /settings (`account-menu-settings`), and sign-out's icon goes through DropdownMenuIcon.
- panel-header.tsx and row-actions.tsx: row icons through DropdownMenuIcon. row-actions' separator was already the bare facade part.
- location-selector.tsx and language-switcher.tsx: their rows carry no icons (their icons are on the triggers), so there was nothing to move. Unchanged.

## 5. Tests

- CF-LIST-1 rule 8 (CL-8) and rule 9 (CL-9), planted: choice-lists.test.ts 14 passed, and the tree is clean.
- CL-U7 (choice-list-look.test.tsx): passed.
- CF-OV-3: the dropdown facade's export count goes from 15 to 16 (DropdownMenuIcon). Name equality with the impl is still asserted.
- CL-E10 (360 and 1440, light and dark). The account menu's row gap and separator equal the row-actions menu's. Its icon is 16×16 in the row's ink with no margin, and at 1440 it equals the panel switch's icon and gap. Its label is on the row's padding at 14 px / 600. Profile lands on /account and Settings on /settings.
- `bun run e2e:local -- e2e/choice-lists.spec.ts` (both projects, retries 0), final tree: **38 passed, 58 skipped, 0 failed (4.9m)**. An earlier whole run had 2 red: CL-E10 at 360 clicked a row before the menu reopened, and CL-E6 measured the phone-code list mid-scroll. Both were fixed by waiting for the menu and for the settled mark.
- `bun run e2e:local -- e2e/post-wizard-pricing.spec.ts` (both projects, retries 0): **50 passed, 2 skipped, 0 failed (6.4m)**.
- scripts/ laws step (`bunx vitest run scripts/`): 379 passed, 1 skipped, 1 failed (CF-OV-3, fixed above and re-run: 3 passed).

## 6. G38 census

- `account-menu`, `account-menu-identity` and `account-menu-sign-out` (shell.spec.ts :1312–1320, smoke-auth-i18n.spec.ts :76–79, auth-signout.spec.ts, admin-users.spec.ts :266, choice-lists.spec.ts): ids unchanged, old = new; no edit.
- `nav.profile` / "Profile" → /settings: no spec asserts it (rg over e2e/). New: CL-E10 asserts /account.
- LY-6 old: `toHaveAttribute("data-placement","up")` and `placement === "up"`. New: `toHaveAttribute("data-settled","true")`, with placement in {up, down}. The in-viewport and finger-hit assertions are unchanged.
- choice-lists judge and expectInSight: they now also wait for `data-settled` on picker panels.

## 7. Growth

- The facade gains one `inside()` export, and the parts' constants live in menu-row.ts (on every page). The nine admin ceilings are raised for F4a-2's cause (section 2). CI judges the rest; see the checks below.

## 8. Unit count

- Not measured whole this turn (see section 10). Focused: src/components/ui + shell + picker + two guards: 200 passed in 35 files.

## 9. K2

- src/components/ui/popover.tsx imports src/lib/visible-area.ts on first paint (F4a-2). This breaks F4a ruling 2 and is the cause of the nine admin raises. A fix is to load it on open (`loadOnce`), in a turn that names popover.tsx.
- listing-detail.tsx :524 reads the sticky sub-band itself (roadmap line, S5).
- language-picker.tsx :74 and category-dialogs.tsx :615: scrolling lists with their own max-h-64 (not pickers; reported only).

## 10. Checks

- `bun run checks` once on the final tree, run whole, with no TURN_BASE set. The laws step read its base from the brief's `Base: dev e1e736df` (TC-E5's path, live).
- **15 PASS · 0 FAIL · 2 NOT RUN** (both Install dependencies: the sandbox's dependencies are already installed). It ran through all three laws steps, then build-and-check through "Root route names". The 590 s limit ended the run at component tests, so it printed no fast line and no last line.
- slow steps: not finished — CI judges.

## 11. git diff --name-only e1e736df

docs/\_changelog.md, docs/features/design-foundation.md, docs/governance/briefs/foundations-turn-f4b.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-f4b.report.md, e2e/choice-lists.spec.ts, e2e/post-wizard-pricing.spec.ts, roadmap.md, scripts/ci/laws-changed.ts, scripts/ci/turn-checks.test.ts, scripts/conformance/choice-lists.test.ts, scripts/conformance/overlays.test.ts, scripts/route-budgets.mjs, src/components/searchable-picker.tsx, src/components/shell/app-header.tsx, src/components/shell/menu-row.ts, src/components/shell/panel-header.tsx, src/components/shell/row-actions.tsx, src/components/ui/choice-list-look.test.tsx, src/components/ui/dropdown-menu-impl.tsx, src/components/ui/dropdown-menu.tsx. AGENTS.md untouched.

## 12. Limits

- LY-6's repeatability is for CI's repeat lane. No local repeats were run.
- No local shell.spec.ts run: its account-menu ids are unchanged.
