```text
RULING — redesign Part 2, turn SAGE-S2, continue: finish S2, the operator's band gap (D261), one current-item pill, and a scope correction. Base: dev 536dc66d. Tier B. No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-sage-s2-2.md; roadmap line 3 names it beside foundations-turn-sage-s2.md.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-sage-s2-2.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it beside foundations-turn-sage-s2.md. Check roadmap.md with prettier before you commit (INC-1019).

SEEN AT 536dc66d (fresh clone): step 0's sha256 15d18276… matches; BAND_LOOK in band-row.ts read by the panel tabs, the panel header, the breadcrumb and the location row, with the sub-band's `stack`; the track and the raised deepest segment; ActionMessage on `--bar-rise`; the probe in e2e/helpers/shadows.ts; CF-BAND-1's planted cases; SGB-1 to SGB-3. INC-1022's fix is accepted as built: A-5 and A-6 read ITEM_ACTIVE from the mechanism, no literal. Not yet done: a clean full checks run, the report.

CI FIRST: read the run on 536dc66d (it may still be running; read it again before your push). Any red on it is fixed first, from its failure body.

1. Scope (DRIFT, corrected here): AGENTS.md was outside S2's scope, and its byte budget was raised (10200 → 10401) without a ruling. Revert the added AGENTS.md line and the allowlist line to their d0b6a4ad text. The register row in docs/governance/mechanisms.md is where BAND_LOOK and the shadow helper are recorded (G0.9).

2. D261, the operator's words (2026-10-30 18:40 New York): "Note there is a small tiny space between location bar and breadcrumb and that needs to close, only a 3d shadow separating each bar, no separate space".
   - At 536dc66d the breadcrumb row is inside the sticky sub-band (`BAND_LOOK.stack`, `shadow-subband`). The location row is a sibling below it, outside that container. So at their boundary three things draw: the breadcrumb's groove, the sub-band's hairline, and its drop shadow, which falls across the location row. That reads as a seam with space in it.
   - The rule:
     - adjacent band rows meet edge to edge, with 0 px between them;
     - each boundary between two bars is drawn once, by the groove (`--lift-groove`), never a groove plus a hairline or a shadow;
     - the band's drop shadow (`--lift-subband`) sits under the band's last visible row: under the location row while it shows, and under the sticky rows once the location row has scrolled under them.
   - What stays: the sticky behaviour and every row's place and height (D258).
   - The means is your call: the location row inside the band's one surface, or a stuck state read once, never per row.
   - Proof: an SGB test at 360, 390, 834 and 1440 px, light and dark, at the top of the page and scrolled. For every adjacent pair of visible band rows, the bottom of the upper box equals the top of the lower box. The boundary carries exactly one separator, and the drop shadow sits only under the last visible row.

3. One current-item pill. The current panel tab (panel-tabs.tsx :61, `rounded-full bg-nav-active font-medium text-primary`) takes the bottom bar's current pill (P-S3: `--nav-pill`, `--lift-pill`, `--nav-ink`), through one shared class, as the tile constants are shared.
   - Then nothing reads `--nav-active`: retire it from src/styles.css, src/lib/themes.ts and src/lib/schemas/theme.ts.
   - Update bottom-bar.tsx :32's comment.
   - Every test that asserts the old tab look is named under G38, with its old and new value.

4. Finish S2: `bun run checks` once on the final tree, run whole, with its last line pasted (no FAIL). Name the two failures of your last run and their fixes. Then write the report, docs/governance/reports/foundations-turn-sage-s2.report.md, covering both turns:
   - step 0's sha256 for both rulings;
   - the CI lines for d0b6a4ad and 536dc66d, with any red classified and fixed;
   - the census as built (each band row before and after);
   - the CF-BAND-1 extension and its planted case;
   - the 360 px proof in both languages;
   - D261's measurement;
   - the pill;
   - every test changed under G38, with its old and new value;
   - the growth table per page (JS) and the stylesheet, with causes and any ceiling raised (old → new, CI's size);
   - the unit count;
   - the checks' last line;
   - K2;
   - git diff --name-only d0b6a4ad.

TESTS: e2e/sage-bands.spec.ts, e2e/sage-shell.spec.ts, e2e/shell-bands.spec.ts, e2e/admin-shell.spec.ts and every spec holding a changed tab or band assertion, whole, both projects, retries 0. A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges. A page whose JS first download grows by more than 1 KiB, or anything that grows without a named cause, is a STOP.

SCOPE (by area): S2's scope, plus src/components/shell/bottom-bar.tsx (the comment and the shared pill class), the `--nav-active` retirement in src/styles.css, src/lib/themes.ts and src/lib/schemas/theme.ts with their tests, and AGENTS.md with its allowlist (the revert only).

Push, and END THE TURN.
```
