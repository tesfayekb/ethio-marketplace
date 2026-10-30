# Foundations turn R1c — build ruling

sha256 of the text inside the fence (with its final newline): `c4f24de65c45b8ada354cc66398591ff5749ebac630c96f34dee0c140de9e321`

````text
RULING — Foundations turn R1c, BUILD: D244–D247 (INC-1008, INC-1009), then the folded rail. Base: dev b2ba8e8e (a4bfd7c7 plus your plan). Tier B. No migration, no new dependency. Lovable. Saved as docs/governance/briefs/foundations-turn-r1c.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-r1c.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it.

CI: run 41006844051 on a4bfd7c7 (R1b-2) is SUCCESS: E2E passed, 0 flaky, main promoted. Read CI again before the push.

THE WORK: your plan, .lovable/plan.md at b2ba8e8e, Parts 0–6, in its order, with the rulings below. Read it by line range first; it governs where this ruling is silent.

RULINGS ON THE PLAN
1. INC-1008, the cause.
   - Your two causes are accepted as the cause:
     - no placement on resize (submenu-impl.tsx :176–:191);
     - a tall panel clamped and scrolling inside itself.
   - The second is what the operator saw. On a Mac the scrollbar is hidden until you scroll, so the panel's last rows look cut off below the screen with no sign of a scroll.
   - Part 0 does not wait for his window size. Show both causes red first: against the base build, or by restoring the old code locally, never by committing it (G38). Then fix them as planned (items 1 and 4).
   - His walk on the preview confirms it after the build. A third cause found in Part 0 is a STOP with the measurement.
2. D245.
   - Accepted as you read it from ethio.com (style.css :5030–:5070; custom.css :268–:288):
     - the surface is bg-popover, a 1 px border-border, rounded-none and no shadow, flush with the menu and overlapping its edge by 1 px;
     - the motion is opacity only, 300 ms ease, in and out. The closing panel stays mounted for 300 ms, non-interactive and aria-hidden;
     - the same at every level. With prefers-reduced-motion there is no animation either way;
     - row separators are 1 px border-border, and the hover tint is hover:bg-muted.
   - Your open point (G17): keep our row padding, with no hover transition. The operator may ask for the old look.
   - Report the tokens' values beside the old literals (#fff, #ccc, #e9ecef).
   - D245 settles the panel's placement and motion. Redesign Part 2 (the Sage look, DEC-289) may restyle surfaces by its own rules later.
3. D246: accepted as planned, including the change to B21SC-1 SC-1 (shell.spec.ts :3746–:3753) named under G38, SC-6, SC-7, and the guard line.
4. D247.
   - Accepted as planned: the 32 px floor on every pointer and width, `data-many` above 16, and CF-ROWS-1.
   - The favourite case at 1280×600 (16 rows × 32 px = 512 px against 488 px) scrolls under the rule's "too short even at the floor" clause. No 30 px floor.
   - ROWS-E3 uses the real tree (15 roots, no favourite). Also prove the favourite case's scroll is visible at 1280×600.
   - ROWS-E2 (more than 16 items): if the admin menu cannot show the rule until R1d moves it onto the mechanism, prove the "more than 16" branch on a planted list in CF-ROWS-1's unit census now. Move ROWS-E2 to R1d with a roadmap line, and say so in the report.
   - Where the C2 exception is written (your ruling point):
     - Not in docs/conventions.md: it does not hold C2. C2 is Knowledge v3.12's text, mirrored in docs/governance/lovable-knowledge.md :8, a record you do not edit.
     - Write it in docs/features/panels.md and in the register rows (79 amended, and CF-ROWS-1's new row), exactly: "C2's exception (D247, 2026-10-30): menu rows in a list of 16 items or fewer shrink to fit the height, down to 32 px, on every pointer; a list of more than 16 items keeps full-size rows and scrolls with a visible scrollbar."
     - The Knowledge's next version carries the same exception through my records.
5. Item 5: accepted as planned (SMN-E6; the folded header takes item 2's surface; category-nav.spec.ts re-read against items 3 and 4, each changed assertion named with why).
6. Growth: up to 0.5 KiB per page with its cause, ceilings raised by DEC-296's rule. More, or growth without a cause, is a STOP with the measurement.
7. The records: docs/features/panels.md, docs/_changelog.md and docs/governance/mechanisms.md (row 79 amended; a new row for CF-ROWS-1).

SPLIT: allowed after Part 2 with the checks green. If the platform's time limit nears earlier, stop at a clean point with the checks green, push, and report three lines (done, left, CI).

TESTS: each touched spec file run whole, both projects, retries 0; by-id runs of every test that uses a changed helper (G37). Ids grep-checked free. A "scrollbar visible" test launches without --hide-scrollbars, as OVS does.

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, with its last line pasted (no FAIL).

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-r1c.report.md:
- step 0's sha256;
- the CI line;
- Part 0's red-first evidence for both causes;
- Parts 1–5, each done or not, with its tests;
- the token values beside ethio.com's literals;
- the per-page growth table;
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only b2ba8e8e.
````
