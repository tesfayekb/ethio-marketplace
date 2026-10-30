```text
RULING — redesign Part 2, turn SAGE-S2: the band rows in one look (D260) and the location track (spec §4), as your plan's S2 section (.lovable/plan.md at b1bbeebe). Base: dev d0b6a4ad. Tier B (the shell on every page). No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-sage-s2.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-sage-s2.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

S1 VERIFIED (dev d0b6a4ad, fresh clone): both rulings' sha256 match (2b6ceec4…, d2817f2b…); the 38 files equal your list; the five tokens light and dark with their contrast pairs (9.35, 8.03, 8.37, 7.61 : 1); ruling A with PBG-1 and the comment; ITEM_TILE and ITEM_TILE_ON with CF-ROWS-1 planted; CONTROL_LOOK; `--bar-rise` read by every pinned surface of your census, with the page's bottom scroll padding and SGS-7's intersection proof; the probe strips only Tailwind's transparent zero-size layers; the five tests fixed at their causes; the entry ceiling 209 from CI's 208.0 (INC-1021); no secret in the diff; the side branches are the known eleven. CLEAN pending CI on d0b6a4ad.

CI FIRST: read the run on d0b6a4ad; if it has not finished when you start, read it again before your push. Any red on it is fixed first, from its failure body. The run on 4ec6935c (your unchecked edits) also failed two specs outside your local runs: phone-frame.spec.ts "width walk (C2g.4)" and admin-shell.spec.ts "Admin shell (U0)". If either is still red on d0b6a4ad, it is the first fix, at its root (G21, G38).

THE SYSTEM (G0) — part S2
- CONCERN: one band look — every row built on band-row.ts (the panel tabs bar, the panel header, the breadcrumb row, the location row) takes the same surface, edge, shadow and label style, light and dark (D260; P-S7).
- MECHANISM: band-row.ts (D258, CF-BAND-1), extended with one band-look constant read by every band row; the S0 tokens `--band`, `--band-edge`, `--band-label`, `--lift-subband`, `--lift-groove`, `--track`, `--lift-track`, `--lift-segment`, `--radius-track`, `--radius-segment`, and `--nav-ink` (S1).
- CONSUMERS (your plan's census): panel-tabs.tsx :40; panel-header.tsx :33; app-shell.tsx :1047 (the sub-band) and :1054 (the breadcrumb); location-selector.tsx :234 (the row) and :56–:97 (the pickers).
- CONFORMANCE GUARD: CF-BAND-1 extended — a band row that carries its own surface, edge or shadow class, instead of the band-look constant, is refused; proven on a planted bypass.
- FIVE LENSES — security: none new. Performance: class changes and the track markup only; growth named. Failure: none new; the pickers' loading and error texts and the PlaceNotice band are unchanged (§4). Consistency: one band look, light and dark. Growth: a later theme changes the bands by data only.

WHAT IS TRUE AT THE END
- The band rows read the one band-look constant: surface `--band`, the line as `--lift-groove` (§4's groove), and the band's shadow `--lift-subband` on the sub-band. No band row keeps a surface, border or shadow class of its own.
- The panel header (P-S7) is a band row: the band surface, with §2's label style (12 px, bold, uppercase, letter-spacing 1.2 px, `--band-label`); its switch control is unchanged.
- The row labels ("Showing listings in" / "Listings in") are 13 px, 12 px on phones, with their words unchanged.
- The location track: the pickers sit in one track. The track has fill `--track`, `--radius-track`, 3 px padding and `--lift-track` (pressed in), with a decorative map pin at its start (16 px, `primary`, aria-hidden).
- D258's sizes govern §4's: the row stays 40 px (BAND_ROW), the track is 34 px and each segment 28 px.
- Each segment: `--radius-segment`, padding 0 10 px (0 5 px on phones), 13 px text (12 px on phones), weight 500, a 13 px muted chevron.
- The deepest chosen level is raised (`--card`, `--lift-segment`, `--nav-ink`, semibold); an unset level is transparent, foreground, weight 500.
- Nowrap and truncation are kept. The dropdown menus, the PlaceNotice band, and the loading and error texts are unchanged.
- The shadow probe (`withoutEmptyLayers`) moves to one e2e helper read by sage-shell.spec.ts and sage-bands.spec.ts (K1). Run sage-shell.spec.ts again after the move.
- Your S1 K2: src/components/ui/action-message.tsx :60 clears the bar by its own 1rem (`scroll-mb-[calc(var(--bottom-bar)+1rem)]`). It moves onto `--bar-rise`: one clearance, one token. Scope widened to it.

TESTS
- sage-bands.spec.ts (SGB-…, ids grep-checked free), at 360, 390, 834 and 1440 px, light and dark:
  - the four band rows' computed surface, edge and shadow are equal;
  - the track and segment geometry;
  - at 360 px in English and Amharic, with the deepest chain chosen: the row stays 40 px, every segment holds one line, and nothing overflows the row.
- BND-E1 to BND-E4 and CF-BAND-1's existing cases unchanged.
- Every existing test that asserts a band row's look value the spec changes is named under G38, with its old and new value.
- The touched spec files whole, both projects, retries 0; by-id runs of every test that uses the moved helper (G37).
- A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges.
- A page whose JS first download grows by more than 1 KiB, or anything that grows without a named cause, is a STOP. Every ceiling the turn touches follows DEC-296's form from CI's size.

SCOPE (by area): src/components/shell/band-row.ts, panel-tabs.tsx, panel-header.tsx, location-selector.tsx with their tests; src/components/app-shell.tsx (the sub-band and the breadcrumb only); src/components/ui/action-message.tsx (its clearance only); scripts/conformance/shell-bands.test.ts; e2e/sage-bands.spec.ts, e2e/sage-shell.spec.ts (the helper move) and the new e2e helper; e2e/shell-bands.spec.ts and any spec asserting a changed band value; scripts/route-budgets.mjs and scripts/check-bundle-size.mjs for named ceilings; the standing docs allowance (docs/features/design-foundation.md, the register row in docs/governance/mechanisms.md, one docs/_changelog.md line). Never the band heights, the menu's sizes, routes, strings or migrations.

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, run whole, with its last line pasted (no FAIL), and the unit suite's full count. CI is read at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md.

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-sage-s2.report.md:
- step 0's sha256;
- the CI lines for d0b6a4ad, with any red classified and fixed;
- the census as built (each band row before and after);
- the CF-BAND-1 extension and its planted case;
- the 360 px proof in both languages;
- every test changed under G38, with its old and new value;
- the growth table per page (JS) and the stylesheet, with causes and any ceiling raised (old → new, CI's size);
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only d0b6a4ad.
```
