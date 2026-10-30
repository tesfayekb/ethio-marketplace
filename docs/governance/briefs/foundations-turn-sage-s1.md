```text
RULING — redesign Part 2, turn SAGE-S1: your plan approved with rulings on its seven premises, then S1 built — the shell in the Sage look (spec §1, §2, §3, §10, §11), rulings A and C of S0. Base: dev b1bbeebe. Tier B (the shell on every page). No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-sage-s1.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-sage-s1.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

THE PLAN (.lovable/plan.md at b1bbeebe) IS APPROVED: two turns, S1 now and S2 next (ruling 5); its census (§2), what does not move (§3), the CF-LOOK-1 lines it retires (§5), rulings A and C as planned (§6), its tests (§7) and its S1 files (Technical details), with these rulings (the supervisor, under G17; overridable):
- P-S1 `--nav-ink`: a new token, light #17503A (§2), dark #7FC9A6 (§13, "Current row / tab … text #7FC9A6"). It is the selected row's text in the rail, the strip, the phone menu and the side panels, and the bottom bar's current label (§11). Never `--tier-featured-ink`: a tier colour that shares a value today is a different concern.
- P-S2 `--logo-gold`: a new token, light #E0B05A (§1), dark #E0A94A (§13's dark gold, "unchanged"). The wordmark's dot stays `text-gold`.
- P-S3 `--nav-pill`: light #E3F1EA (§11), dark #1C2B24 (§13's current row); `--lift-pill`: light `inset 0 1px 2px` in the green tint at .12 (§11), dark in the black family. Never `--success-soft`, which is the Negotiable badge's.
- P-S4 `--lift-disc`: §11's values. Its 4 px ring takes the bar's surface (`--card`) in both modes, so the disc reads as cut out of the bar: never a white ring on a dark bar.
- P-S5: the chosen filter pill reuses `shadow-tile-on` — one "chosen" lift (K1); its allowlist line goes.
- P-S6: `rounded-e-bar` (18 px) for the phone menu's end corner — one radius for the outer edge of the phone's sliding surfaces; any test asserting 16 px there is named under G38.
- P-S7: every row built on band-row.ts takes the one band look, the panel header included (by definition, G0.3). It moves in S2 with the band-look constant, not in S1; its label takes §2's label style.
- Every new token: in src/styles.css's :root and .dark with its oklch and a hex comment, registered where the file registers tokens, in src/lib/themes.ts (TH-2 holds), and in the contrast run wherever it is text or a fill under text (`--nav-ink` on `--card` and on `--nav-pill`, light and dark; 4.5 : 1).
- Entry ceiling 208 → 209 KiB in DEC-296's form, with its named cause (the Sage shell's classes); a trim found in the shell's own code is taken first. Any other page raised by its own named cause.
- The raised Post disc (R6): measured at 390 px as planned; covering a tappable control is a STOP.

THE SYSTEM (G0) — part S1
- CONCERN: one look — the shell's surfaces read the Sage tokens; one tile, one chosen lift, one control look.
- MECHANISM: src/styles.css's tokens and src/lib/themes.ts (S0); menu-row.ts's ITEM_TILE and ITEM_TILE_ON (new, the plan's §2), read by the rail, the strip, the phone menu, the side panels, D259's "Home" row and D255's back item; ICON_BUTTON (app-header.tsx) for the controls; CF-LOOK-1, CF-ROWS-1 (its census extended to the tile constants, no second guard).
- FIVE LENSES — security: none new. Performance: class and token changes only; growth per page and the stylesheet named (ruling B). Failure: none new. Consistency: one tile and one chosen lift across every menu, light and dark. Growth: a later theme changes these surfaces by data only.

TESTS: sage-shell.spec.ts (SGS-…) as planned, its values read from the theme data, never retyped; the G38 changes as planned (LB-1 16 → 18 px, SMN-E7's row classes, PBG-1), each reported with its old and new value; the touched spec files whole, both projects, retries 0; by-id runs of every test that uses a changed helper (G37). A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges. A page whose JS first download grows by more than 1 KiB, or anything that grows without a named cause, is a STOP.

SCOPE (by area): the plan's S1 files (Technical details) with their own tests; the new tokens in src/styles.css, src/lib/themes.ts and their tests; e2e/sage-shell.spec.ts, e2e/shell.spec.ts, e2e/submenu-look.spec.ts; scripts/conformance/look-values-allowlist.txt and the CF-ROWS-1 census; scripts/route-budgets.mjs and the bundle check for the named ceilings; the standing docs allowance (docs/features/design-foundation.md with ruling C, the register row in docs/governance/mechanisms.md, one docs/_changelog.md line). Not band-row.ts, panel-tabs, panel-header or the location row (S2).

CI FIRST: read the last completed run (raw addresses in HOW TO WORK). The run on 2a953151 may still be in progress, and b1bbeebe (your plan file) follows it. A red on either is fixed first, from its failure body.

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, run whole, with its last line pasted (no FAIL), and the unit suite's full count. CI is read at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md.

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-sage-s1.report.md:
- step 0's sha256;
- the CI line you read first, with any red classified;
- the census as built (files and tests per surface; the CF-LOOK-1 lines retired);
- the new tokens, light and dark, with their contrast results;
- every test changed under G38, with its old and new value;
- the Post disc measurement at 390 px;
- the growth table per page (JS) and the stylesheet, with causes and any ceiling raised (old → new);
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only b1bbeebe.
```
