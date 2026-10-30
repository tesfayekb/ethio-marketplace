```text
RULING — redesign Part 2, turn SAGE-S1, continue: the Post disc stop, the red browser tests, and CI's red on 2a953151. Base: dev 4ec6935c. Tier B. No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-sage-s1-2.md; roadmap line 3 names it beside foundations-turn-sage-s1.md.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-sage-s1-2.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it beside foundations-turn-sage-s1.md. Check roadmap.md with prettier before you commit (INC-1019).

YOUR STOP IS ANSWERED. Continue S1 under foundations-turn-sage-s1.md with these rulings (the supervisor, under G17; overridable). CI on 4ec6935c will be red, because your unchecked edits landed; it judges nothing until this continuation pushes.

1. The Post disc (R6). Content that scrolls under the bar and its raised disc is a fixed bar's normal behaviour, not a STOP. The rule protects controls pinned to the bar: no control that stays on screen may sit under the disc.
   - My grep at 2a953151 finds one such surface on every page that uses it: src/components/shell/form-section.tsx :95, the phone action bar (`sticky bottom-[var(--bottom-bar)]`, buttons in a wrapping row), used by the admin forms and others.
   - Census every element pinned to the bar's top edge or to the screen's bottom on phones: `bottom-[var(--bottom-bar)]`, fixed or sticky bottom, the notice outlet. The phone strip and phone menu (app-rail.tsx) sit above the bar in z-order, so they cover the disc rather than sit under it; say so in the census.
   - The rise is one token (`--bar-rise`, 14 px) in src/styles.css, read by the disc and by everything that must clear it — never a per-site offset. The scope widens to the pinned surfaces the census finds.
   - A pinned bar that holds controls keeps its surface meeting the bar, and its controls clear the rise; which means is your call (padding by the token, or the controls placed clear of the disc's span).
   - The page's bottom scroll padding on phones is the bar plus the rise, so a focused control is never hidden under them (WCAG 2.2 SC 2.4.11).
   - Proof: an SGS test at 390 px, light and dark, finds the disc's box and asserts it does not intersect any pinned control's box, on a page with the action bar and on the feed. The end-of-page measurement stays as you made it.
2. The new test's shadow probe. Tailwind's composition adds transparent zero-size layers (`rgba(0, 0, 0, 0) 0px 0px 0px 0px`) ahead of the token's shadow. The probe removes exactly those layers, named in a comment, and compares the rest with the token resolved by the browser. Nothing else is stripped, and no comparison is loosened. This holds for every shadow the spec checks, the language control's included.
3. The five existing tests (RM-4, TB-1, "the menu opens in place", "touch targets at least 44 px", B21SC-1): read each failure body first (G21) and fix at the root.
   - A test changes only where the spec changes the value it asserts, under G38 with its old and new value.
   - A touch target is never made smaller to pass: where a Sage tile or control draws smaller than its target, the hit area keeps the size the test protects.
   - A layout test (TB-1's logo corner, "the menu opens in place") is fixed in the code, not by moving its expectation.
   - Each cause is named in the report.
4. CI's red on 2a953151 (INC-1021): its only failing job was the first-paint bundle budget, "JS: 208.0 KiB / 208 KiB — OVER BUDGET" (run 41121234139). Every E2E lane passed with 0 flaky. S0 set the entry ceiling 0.1 KiB over its local size, inside DEC-296's NEAR band. The entry ceiling now follows DEC-296's form from CI's size: at least floor(CI's size + 0.3) + 1. Take CI's 208.0 KiB plus this turn's own measured growth, and name its causes. This applies to every ceiling the turn touches.
5. The K2 you found: photo-background.ts's comment still says its colour is the `--background` token, which ruling A made false. Correct that comment (scope widened to it). The value and the code stay.
6. Record the exact contrast ratios of the new pairs in the report.

Then finish S1 as its ruling asks: the growth measurement, ruling C and the docs (design-foundation.md, the register row, one changelog line), `bun run checks` once on the final tree, run whole, with its last line, and the report (docs/governance/reports/foundations-turn-sage-s1.report.md). The report covers both turns and adds:
- the disc census;
- each of the five tests with its cause and fix;
- the ceilings old → new with CI's size;
- git diff --name-only b1bbeebe.

TESTS: e2e/sage-shell.spec.ts, e2e/shell.spec.ts, e2e/submenu-look.spec.ts and every spec file holding one of the five, whole, both projects, retries 0; by-id runs of every test that uses a changed helper (G37). A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges.

Push, and END THE TURN.
```
