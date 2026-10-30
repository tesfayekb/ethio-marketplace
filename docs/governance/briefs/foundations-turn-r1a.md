```text
RULING — Foundations turn R1a, with R1b after it if the turn allows: BUILD your R1 plan (INC-948 and the CI items first, then Part 0 — INC-1005, then Part 1's mechanism), with the rulings below. Base: dev 51cae041. Tier B. No migration, no new dependency. Lovable. Saved as docs/governance/briefs/foundations-turn-r1a.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-r1a.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it.

CI FIRST
- A correction to your plan's reading of run 40974739742 on b2940a61: its one gating failure was PGH-E2 (shard 5, mobile-360), the case INC-1004 fixes. PW-30 passed on retry there (shard 6, mobile-360). Its i18n map and ERRT-6 reds are fixed in f66ca04c.
- The run on f66ca04c had not completed when you read it. Read it again before you push.
  - If PGH-E2 is red there, or in its repeat lane, reshape PGH-E2 by INC-715's rule, one language switch per test: one test picks Amharic from English; one boots in Amharic and picks English.
  - If it is green there, change nothing in PGH-E2; I record INC-715's rule as retired.
  - Any other red in that run is fixed first.
- INC-948 (PW-30, "no place was chosen", e2e/post-wizard-place.spec.ts :781; open since 2026-10-27; ten flake-ledger lines since 2026-09-22) is fixed at its root in this turn, ahead of Part 0.
  - Its entry says how: read PW-30's trace and step 6's DOM (`post-where-chosen`, data-count 0) before any change.
  - No retry and no raised wait (G38).
  - Prove it: the file whole, both projects, retries 0, then PW-30 with --repeat-each 12.

PART 0 — INC-1005: APPROVED, with these rulings.
1. Why the sandbox read a scrollbar width of 0: Playwright adds --hide-scrollbars to headless Chromium (node_modules/playwright-core/lib/server/chromium/chromium.js :284, version 1.58.1).
   - Your measurement and the OVS tests run in a browser launched without that flag, on a page that scrolls.
   - The spec keeps the harness's own launch options (the browser path included) and drops only --hide-scrollbars.
   - Each asserts its precondition on the desktop project: the scrollbar's width is above 0. So it can never pass for lack of a scrollbar.
   - OVS is shown red on the base, by measuring before the rule is in. Never by committing reverted code.
2. The mechanism is `scrollbar-gutter: stable` on the root element (CSS Overflow Module Level 3), in src/styles.css.
   - The lock library may add its own compensation to the locked body (a margin or padding equal to the scrollbar). If your measurement shows that doubling the gutter, it is neutralised in src/styles.css beside the gutter rule, in one rule set at the document.
   - It is never neutralised in the overlay facade or per consumer.
   - CF-SHIFT-1 guards both rules.
3. Modal dialogs, sheets and alert dialogs keep their lock. Dropdown menus keep their modality in this turn. Approved.
4. OVS-1 and OVS-2 as planned: `main`'s box with the language menu and a dialog open and closed. On the mobile project, overlay scrollbars, the box equals its closed value.

PART 1 (R1b) — APPROVED, with these rulings.
5. D98's code. It was replaced by bundle 21 turn 5, `a40e1247` (2026-10-18; docs/_changelog.md :956, spec-ledger :4115). Read its parent, `a40e1247^`, by line range (git show a40e1247^:<path>), name the files in the report, and reuse their timings and logic where they fit. Never restore them wholesale.
6. On-demand code. The side panel, the safe triangle and the phone split arrive through the overlay loader's mechanism (src/components/ui/overlay-loader.ts, DEC-259):
   - it loads on the first hover, focus or press, or on the idle warm-up;
   - a failed download goes to the shell's one notice (INC-911);
   - it lives inside overlays-impl or in a sibling module loaded the same way — never a second on-demand path.
   - The panel positions and flips with what overlays-impl already carries. No new dependency.
   - On a warm module, the first panel opens within the 150 ms intent window.
7. Row heights.
   - At ≥ 768 with a fine pointer: rows spread between 36 and 48 px.
   - With a coarse pointer, at any width, iPads included: rows are at least 44 px (C2).
   - Where the rows cannot fit, the list scrolls with its scrollbar visible.
8. Touch at ≥ 768 is tested in a context with hasTouch and a coarse pointer. Headless Chromium's defaults are a fine pointer with hover (chromium.js :286, the blink-settings line), so a touch test that does not set them proves nothing.
9. The ‹ Main menu row: as planned. It is removed where the panel replaces in-place drilling. If any panel still needs it, STOP for a ruling.
10. First download. Every page is measured against the base.
   - Growth up to 0.5 KiB on a page, with its cause named, is reported, and that page's ceiling is raised by DEC-296's rule: at least the NEAR band above CI's size, floor(size + 0.3) + 1.
   - Larger growth, or growth without a cause, is a STOP with the measurement.
11. Docs: docs/features/panels.md (D213 is superseded by DEC-288), the changelog, and docs/governance/mechanisms.md with one row for the sub-menu mechanism and one for the overlay-shift rule.

ORDER AND SPLIT
- CI first (PGH-E2's verdict and INC-948), then Part 0 (R1a), then Part 1's mechanism (R1b). R1c and R1d follow in later turns.
- If the platform's time limit nears, stop at a clean point after R1a: checks green, push, and report three lines (done, left, CI).

TESTS
- As planned. The ids SMN-*, SMN-E*, OVS-*, CF-SUB-1 and CF-SHIFT-1 are free at 51cae041.
- Each touched spec file runs whole, both projects, retries 0.
- By-id runs of every test that uses a changed helper (G37).
- OVS is shown red on the base.

HOW TO WORK
- K1–K6.
- Never `git apply`: copy files, or use the platform's edit tools.
- `bun run checks` once on the final tree before the push, with its last line pasted (no FAIL).

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-r1a.report.md:
- step 0's sha256;
- the CI line, and PGH-E2's verdict on f66ca04c;
- INC-948: the cause the trace showed, the fix, the proof;
- Part 0: the measurement before, during and after (numbers), the mechanism, the guard, OVS red then green;
- R1b, item by item, done or not;
- the per-page growth table;
- the tests and the unit count;
- the checks' last line;
- K2;
- git diff --name-only 51cae041.
```
